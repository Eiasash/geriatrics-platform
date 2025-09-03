// Unified AI Service with Multiple Providers and Fallback
import { memoize } from '../utils/performance';

class AIService {
  constructor() {
    this.providers = {
      claude: {
        name: 'Claude (Anthropic)',
        endpoint: 'https://api.anthropic.com/v1/messages',
        model: 'claude-3-sonnet-20241022',
        apiKey: process.env.REACT_APP_CLAUDE_API_KEY || localStorage.getItem('claude_api_key'),
        headers: (apiKey) => ({
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }),
        formatRequest: (prompt, options = {}) => ({
          model: options.model || 'claude-3-sonnet-20241022',
          max_tokens: options.maxTokens || 2000,
          temperature: options.temperature || 0.1,
          messages: [{
            role: 'user',
            content: prompt
          }]
        }),
        extractResponse: (data) => data.content[0].text
      },
      
      openai: {
        name: 'GPT-4 (OpenAI)',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-4-turbo-preview',
        apiKey: process.env.REACT_APP_OPENAI_API_KEY || localStorage.getItem('openai_api_key'),
        headers: (apiKey) => ({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }),
        formatRequest: (prompt, options = {}) => ({
          model: options.model || 'gpt-4-turbo-preview',
          messages: [{
            role: 'system',
            content: 'You are a geriatrics medical assistant. Provide evidence-based, practical medical guidance.'
          }, {
            role: 'user',
            content: prompt
          }],
          max_tokens: options.maxTokens || 2000,
          temperature: options.temperature || 0.1
        }),
        extractResponse: (data) => data.choices[0].message.content
      },
      
      gemini: {
        name: 'Gemini (Google)',
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        model: 'gemini-pro',
        apiKey: process.env.REACT_APP_GEMINI_API_KEY || localStorage.getItem('gemini_api_key'),
        headers: () => ({
          'Content-Type': 'application/json'
        }),
        formatRequest: (prompt, options = {}) => ({
          contents: [{
            parts: [{
              text: `Medical Context: You are a geriatrics specialist assistant.\n\n${prompt}`
            }]
          }],
          generationConfig: {
            temperature: options.temperature || 0.1,
            maxOutputTokens: options.maxTokens || 2000,
            topP: 0.8,
            topK: 10
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_MEDICAL',
              threshold: 'BLOCK_NONE'
            }
          ]
        }),
        extractResponse: (data) => data.candidates[0].content.parts[0].text,
        buildUrl: (apiKey) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`
      }
    };
    
    // Response cache
    this.cache = new Map();
    this.cacheTimeout = 3600000; // 1 hour
    
    // Statistics
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      cacheHits: 0,
      providerUsage: {}
    };
  }
  
  // Main query method with automatic fallback
  async query(prompt, options = {}) {
    const cacheKey = this.getCacheKey(prompt, options);
    
    // Check cache first
    if (!options.noCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        this.stats.cacheHits++;
        return cached.response;
      }
    }
    
    this.stats.totalRequests++;
    
    // Try providers in order
    const providers = options.providers || ['claude', 'openai', 'gemini'];
    const errors = [];
    
    for (const providerName of providers) {
      try {
        const response = await this.queryProvider(providerName, prompt, options);
        
        // Cache successful response
        this.cache.set(cacheKey, {
          response,
          timestamp: Date.now()
        });
        
        // Update stats
        this.stats.successfulRequests++;
        this.stats.providerUsage[providerName] = (this.stats.providerUsage[providerName] || 0) + 1;
        
        return response;
        
      } catch (error) {
        console.error(`${providerName} failed:`, error);
        errors.push({ provider: providerName, error: error.message });
        
        // Continue to next provider
        continue;
      }
    }
    
    // All providers failed
    this.stats.failedRequests++;
    
    // Return fallback response
    return this.getFallbackResponse(prompt, errors);
  }
  
  // Query specific provider
  async queryProvider(providerName, prompt, options = {}) {
    const provider = this.providers[providerName];
    
    if (!provider) {
      throw new Error(`Unknown provider: ${providerName}`);
    }
    
    const apiKey = options.apiKey || provider.apiKey;
    
    if (!apiKey) {
      throw new Error(`No API key for ${providerName}`);
    }
    
    // Build request
    const url = provider.buildUrl ? provider.buildUrl(apiKey) : provider.endpoint;
    const headers = provider.headers(apiKey);
    const body = provider.formatRequest(prompt, options);
    
    // Make request with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeout || 30000);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error (${response.status}): ${error}`);
      }
      
      const data = await response.json();
      return provider.extractResponse(data);
      
    } catch (error) {
      clearTimeout(timeout);
      
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout for ${providerName}`);
      }
      
      throw error;
    }
  }
  
  // Multi-provider consensus query
  async consensusQuery(prompt, options = {}) {
    const providers = options.providers || ['claude', 'openai', 'gemini'];
    const threshold = options.threshold || 0.75; // 75% agreement needed
    
    // Query all providers in parallel
    const promises = providers.map(provider => 
      this.queryProvider(provider, prompt, options)
        .then(response => ({ provider, response, success: true }))
        .catch(error => ({ provider, error: error.message, success: false }))
    );
    
    const results = await Promise.all(promises);
    const successfulResponses = results.filter(r => r.success);
    
    if (successfulResponses.length === 0) {
      throw new Error('All providers failed');
    }
    
    // For medical queries, return all responses for comparison
    if (options.returnAll) {
      return {
        responses: successfulResponses,
        consensus: this.findConsensus(successfulResponses),
        confidence: successfulResponses.length / providers.length
      };
    }
    
    // Return best response (first successful)
    return successfulResponses[0].response;
  }
  
  // Find consensus among responses
  findConsensus(responses) {
    // Simple consensus: look for common themes
    const allText = responses.map(r => r.response).join(' ');
    
    // Extract common medical terms
    const medicalTerms = allText.match(/\b(medication|diagnosis|treatment|assessment|risk|dosage|monitor|contraindicated)\b/gi) || [];
    const termFrequency = {};
    
    medicalTerms.forEach(term => {
      const lower = term.toLowerCase();
      termFrequency[lower] = (termFrequency[lower] || 0) + 1;
    });
    
    // Find most agreed upon points
    const consensus = Object.entries(termFrequency)
      .filter(([term, count]) => count >= responses.length * 0.5)
      .map(([term]) => term);
    
    return {
      agreedTerms: consensus,
      confidence: consensus.length > 0 ? 'high' : 'low'
    };
  }
  
  // Fallback response for common medical queries
  getFallbackResponse(prompt, errors = []) {
    const promptLower = prompt.toLowerCase();
    
    // Check for common medical queries
    if (promptLower.includes('delirium')) {
      return this.fallbackProtocols.delirium;
    }
    if (promptLower.includes('fall')) {
      return this.fallbackProtocols.falls;
    }
    if (promptLower.includes('medication') || promptLower.includes('polypharmacy')) {
      return this.fallbackProtocols.medications;
    }
    if (promptLower.includes('admission')) {
      return this.fallbackProtocols.admission;
    }
    
    // Generic fallback
    return `AI services are temporarily unavailable. 

Standard Geriatric Assessment Protocol:
1. Review vital signs and baseline status
2. Comprehensive medication reconciliation
3. Assess functional status (ADLs/IADLs)
4. Cognitive assessment (CAM, MMSE)
5. Review social support and discharge planning
6. Fall risk assessment
7. Nutritional assessment
8. Advance directives discussion

For specific guidance, consult attending physician or geriatrics team.

Error details: ${errors.map(e => `${e.provider}: ${e.error}`).join(', ')}`;
  }
  
  // Fallback protocols
  fallbackProtocols = {
    delirium: `DELIRIUM ASSESSMENT & MANAGEMENT:
1. CAM Assessment (Confusion Assessment Method)
2. Review medications - stop anticholinergics, benzos
3. Check for infection (UA, CXR, blood cultures if febrile)
4. Metabolic panel (BMP, LFTs, TSH, B12)
5. Ensure glasses/hearing aids in place
6. Reorient frequently, normalize sleep-wake cycle
7. Early mobilization
8. Avoid restraints
9. Low-dose haloperidol only if severe agitation endangers patient`,
    
    falls: `FALL ASSESSMENT PROTOCOL:
1. Check for injuries (head, hip, spine)
2. Orthostatic vital signs
3. Medication review (antihypertensives, sedatives, anticholinergics)
4. Vision and hearing assessment
5. Neurological exam including gait assessment
6. Timed Up and Go test
7. Environmental hazard assessment
8. Consider PT/OT evaluation
9. Vitamin D supplementation if deficient`,
    
    medications: `MEDICATION OPTIMIZATION:
1. Complete medication reconciliation
2. Identify Beers Criteria medications
3. Check for drug-drug interactions
4. Assess indication for each medication
5. Consider deprescribing if:
   - No clear indication
   - Adverse effects > benefits
   - Limited life expectancy
   - Patient/family preference
6. Start low, go slow with new medications
7. Monitor for adverse effects`,
    
    admission: `GERIATRIC ADMISSION CHECKLIST:
1. Code status and goals of care
2. Baseline functional/cognitive status
3. Medication reconciliation
4. Fall risk assessment (Morse scale)
5. Pressure ulcer risk (Braden scale)
6. Delirium prevention protocol
7. DVT prophylaxis if indicated
8. Nutrition assessment
9. Discharge planning from admission
10. Family meeting within 48-72 hours`
  };
  
  // Cache management
  getCacheKey(prompt, options) {
    return `${prompt}_${JSON.stringify(options)}`.substring(0, 100);
  }
  
  clearCache() {
    this.cache.clear();
  }
  
  // Statistics
  getStats() {
    return {
      ...this.stats,
      cacheSize: this.cache.size,
      successRate: this.stats.totalRequests > 0 
        ? (this.stats.successfulRequests / this.stats.totalRequests * 100).toFixed(2) + '%'
        : '0%',
      cacheHitRate: this.stats.totalRequests > 0
        ? (this.stats.cacheHits / this.stats.totalRequests * 100).toFixed(2) + '%'
        : '0%'
    };
  }
  
  // API key management
  setApiKey(provider, apiKey) {
    if (this.providers[provider]) {
      this.providers[provider].apiKey = apiKey;
      localStorage.setItem(`${provider}_api_key`, apiKey);
      return true;
    }
    return false;
  }
  
  testApiKey(provider, apiKey) {
    return this.queryProvider(provider, 'Test connection. Respond with "OK"', {
      apiKey,
      maxTokens: 10
    });
  }
}

// Export singleton instance
export const aiService = new AIService();

// Export for use in components
export default aiService;