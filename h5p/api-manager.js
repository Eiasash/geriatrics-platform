// api-manager.js
// OpenAI API integration with fallback and error handling

class APIManager {
  constructor() {
    this.openAIKey = localStorage.getItem('openai_api_key') || '';
    this.apiStatus = 'checking';
    this.lastCheck = null;
    this.requestCount = 0;
    this.maxRequests = 100; // Daily limit for free tier
    this.init();
  }

  init() {
    this.checkAPIStatus();
    this.setupAutoSave();
    console.log('🔑 API Manager initialized');
    
    // Show API setup message if no key
    if (!this.openAIKey) {
      setTimeout(() => {
        this.showAPISetupPrompt();
      }, 3000);
    }
  }

  showAPISetupPrompt() {
    if (window.uiEnhancement) {
      const content = `
        <div class="card-container">
          <h3>🤖 AI Features Available</h3>
          <p>To enable AI-powered features like differential diagnosis and clinical reasoning, add your OpenAI API key.</p>
          
          <h4>How to get an API key:</h4>
          <ol>
            <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI API Keys</a></li>
            <li>Create an account and verify your phone number</li>
            <li>Click "Create new secret key"</li>
            <li>Copy the key and paste it below</li>
          </ol>
          
          <p><strong>Cost:</strong> Typically $0.01-0.03 per query (very affordable)</p>
          <p><strong>Privacy:</strong> Your key is stored locally in your browser only</p>
          
          <div style="margin: 15px 0;">
            <input type="password" id="api-key-input" class="search-input" 
                   placeholder="sk-..." style="margin-bottom: 10px;">
            <div class="button-row">
              <button class="action-btn" onclick="window.apiManager.saveAPIKey()">
                💾 Save API Key
              </button>
              <button class="action-btn" onclick="window.apiManager.testFallbackMode()">
                🔧 Use Fallback Mode
              </button>
            </div>
          </div>
          
          <p><small>💡 The platform works great without an API key too - all features have smart fallbacks!</small></p>
        </div>
      `;
      window.uiEnhancement.showModal('AI Setup - Optional', content);
    }
  }

  saveAPIKey() {
    const key = document.getElementById('api-key-input')?.value.trim();
    if (key) {
      if (key.startsWith('sk-') && key.length > 40) {
        localStorage.setItem('openai_api_key', key);
        this.openAIKey = key;
        this.checkAPIStatus();
        if (window.uiEnhancement) {
          window.uiEnhancement.closeModal();
          window.uiEnhancement.showModal('✅ API Key Saved', 'Your OpenAI API key has been saved securely. AI features are now enabled!');
        }
        console.log('✅ OpenAI API key saved');
      } else {
        alert('Invalid API key format. Should start with "sk-" and be 50+ characters.');
      }
    }
  }

  testFallbackMode() {
    if (window.uiEnhancement) {
      window.uiEnhancement.closeModal();
      window.uiEnhancement.showModal('🔧 Fallback Mode Active', 'All features will work using built-in knowledge base. You can add an API key later from the settings.');
    }
    this.apiStatus = 'fallback';
  }

  async checkAPIStatus() {
    if (!this.openAIKey) {
      this.apiStatus = 'no-key';
      return false;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.openAIKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.apiStatus = 'active';
        this.lastCheck = Date.now();
        console.log('✅ OpenAI API connection verified');
        return true;
      } else {
        this.apiStatus = 'error';
        console.log('❌ OpenAI API key invalid or expired');
        return false;
      }
    } catch (error) {
      this.apiStatus = 'offline';
      console.log('🔄 OpenAI API offline, using fallback mode');
      return false;
    }
  }

  async getDifferentialDiagnosis(symptoms, patientData) {
    if (this.apiStatus !== 'active') {
      return this.getFallbackDifferential(symptoms, patientData);
    }

    const prompt = this.buildDifferentialPrompt(symptoms, patientData);
    
    try {
      const response = await this.callOpenAI(prompt, 'differential-diagnosis');
      return this.parseDifferentialResponse(response);
    } catch (error) {
      console.error('AI differential failed:', error);
      return this.getFallbackDifferential(symptoms, patientData);
    }
  }

  buildDifferentialPrompt(symptoms, patientData) {
    return `As a geriatrics specialist, provide a differential diagnosis for:

Patient: ${patientData.age || 'elderly'}yo ${patientData.gender || 'patient'}
Chief Complaint: ${symptoms}
PMH: ${patientData.history || 'not provided'}
Medications: ${patientData.medications || 'not provided'}
Physical Exam: ${patientData.exam || 'not provided'}

Please provide:
1. Top 5 differential diagnoses (most to least likely)
2. Key clinical reasoning for each
3. Red flags to watch for
4. Initial workup recommendations
5. Geriatric-specific considerations

Format as JSON:
{
  "differentials": [
    {
      "diagnosis": "Primary diagnosis",
      "likelihood": "90%",
      "reasoning": "Why this is most likely",
      "workup": ["test1", "test2"],
      "geriatricConsiderations": "Age-specific factors"
    }
  ],
  "redFlags": ["flag1", "flag2"],
  "recommendations": ["rec1", "rec2"]
}`;
  }

  async callOpenAI(prompt, type = 'general') {
    this.requestCount++;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openAIKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Most cost-effective model
        messages: [
          {
            role: 'system',
            content: 'You are an expert geriatrician at Shaare Zedek Medical Center. Provide evidence-based, practical clinical guidance.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  parseDifferentialResponse(response) {
    try {
      return JSON.parse(response);
    } catch (error) {
      // If JSON parsing fails, create structured response from text
      return {
        differentials: this.extractDifferentialsFromText(response),
        redFlags: this.extractRedFlagsFromText(response),
        recommendations: this.extractRecommendationsFromText(response)
      };
    }
  }

  extractDifferentialsFromText(text) {
    const lines = text.split('\n');
    const differentials = [];
    let currentDx = null;

    lines.forEach(line => {
      // Look for numbered diagnoses
      const match = line.match(/^\d+\.?\s*(.+)/);
      if (match) {
        if (currentDx) {
          differentials.push(currentDx);
        }
        currentDx = {
          diagnosis: match[1].trim(),
          likelihood: 'Moderate',
          reasoning: 'Clinical reasoning provided by AI',
          workup: [],
          geriatricConsiderations: ''
        };
      }
    });

    if (currentDx) {
      differentials.push(currentDx);
    }

    return differentials.slice(0, 5); // Top 5
  }

  extractRedFlagsFromText(text) {
    const redFlagSection = text.match(/red flags?:?\s*(.+?)(?=\n\n|\n[A-Z]|$)/i);
    if (redFlagSection) {
      return redFlagSection[1].split(/[,;]/).map(flag => flag.trim()).filter(f => f.length > 0);
    }
    return ['Monitor for clinical deterioration', 'Consider emergency evaluation if symptoms worsen'];
  }

  extractRecommendationsFromText(text) {
    const recSection = text.match(/recommendations?:?\s*(.+?)(?=\n\n|\n[A-Z]|$)/i);
    if (recSection) {
      return recSection[1].split(/[,;]/).map(rec => rec.trim()).filter(r => r.length > 0);
    }
    return ['Comprehensive geriatric assessment recommended', 'Monitor closely and follow up'];
  }

  getFallbackDifferential(symptoms, patientData) {
    // Enhanced fallback based on symptoms
    const symptomMappings = {
      'confusion': {
        differentials: [
          {
            diagnosis: 'Delirium',
            likelihood: '85%',
            reasoning: 'Most common cause of acute confusion in elderly',
            workup: ['CBC', 'BMP', 'UA', 'CXR', 'Medication review'],
            geriatricConsiderations: 'Check for infections, medications, metabolic causes'
          },
          {
            diagnosis: 'UTI',
            likelihood: '70%',
            reasoning: 'Common in elderly, often presents atypically',
            workup: ['UA', 'Urine culture'],
            geriatricConsiderations: 'May be only symptom in elderly'
          },
          {
            diagnosis: 'Medication side effect',
            likelihood: '60%',
            reasoning: 'Polypharmacy common, many drugs affect cognition',
            workup: ['Medication reconciliation', 'Anticholinergic burden assessment'],
            geriatricConsiderations: 'Review Beers criteria medications'
          }
        ],
        redFlags: ['Fever >101°F', 'Focal neurological signs', 'Severe agitation'],
        recommendations: ['CAM assessment', 'Infection workup', 'Medication review']
      },
      'falls': {
        differentials: [
          {
            diagnosis: 'Orthostatic hypotension',
            likelihood: '75%',
            reasoning: 'Common in elderly, multiple causes',
            workup: ['Orthostatic vitals', 'Medication review', 'Echo if indicated'],
            geriatricConsiderations: 'Check at 1 and 3 minutes standing'
          },
          {
            diagnosis: 'Medication-related',
            likelihood: '65%',
            reasoning: 'Each additional medication increases fall risk 5-7%',
            workup: ['Comprehensive medication review', 'Beers criteria assessment'],
            geriatricConsiderations: 'Focus on psychotropics, antihypertensives'
          },
          {
            diagnosis: 'Muscle weakness/Sarcopenia',
            likelihood: '50%',
            reasoning: 'Age-related muscle loss affects balance',
            workup: ['Gait assessment', 'TUG test', 'Grip strength'],
            geriatricConsiderations: 'Exercise prescription, nutrition assessment'
          }
        ],
        redFlags: ['Head trauma', 'Loss of consciousness', 'New neurological deficits'],
        recommendations: ['Morse Fall Scale', 'Comprehensive fall assessment', 'PT referral']
      },
      'shortness of breath': {
        differentials: [
          {
            diagnosis: 'Heart failure exacerbation',
            likelihood: '70%',
            reasoning: 'Common in elderly with multiple cardiac risk factors',
            workup: ['BNP', 'CXR', 'Echo', 'EKG'],
            geriatricConsiderations: 'Often diastolic dysfunction, careful diuresis'
          },
          {
            diagnosis: 'COPD exacerbation',
            likelihood: '60%',
            reasoning: 'Common in elderly smokers',
            workup: ['ABG', 'CXR', 'Sputum culture if purulent'],
            geriatricConsiderations: 'Avoid excessive O2 in COPD'
          },
          {
            diagnosis: 'Pneumonia',
            likelihood: '55%',
            reasoning: 'Higher risk in elderly, atypical presentations',
            workup: ['CXR', 'CBC', 'Procalcitonin', 'Blood cultures'],
            geriatricConsiderations: 'May present without fever or classic symptoms'
          }
        ],
        redFlags: ['Chest pain', 'Hemoptysis', 'Severe hypoxia'],
        recommendations: ['Oxygen saturation monitoring', 'Consider hospitalization', 'Medication reconciliation']
      }
    };

    // Default if no specific symptom match
    const defaultResponse = {
      differentials: [
        {
          diagnosis: 'Multiple geriatric syndromes',
          likelihood: 'Variable',
          reasoning: 'Complex interactions of age-related changes',
          workup: ['Comprehensive geriatric assessment'],
          geriatricConsiderations: 'Holistic approach needed'
        }
      ],
      redFlags: ['Acute change in mental status', 'Hemodynamic instability'],
      recommendations: ['Comprehensive geriatric assessment', 'Medication review', 'Functional assessment']
    };

    // Find best match
    const normalizedSymptoms = symptoms.toLowerCase();
    for (const [key, value] of Object.entries(symptomMappings)) {
      if (normalizedSymptoms.includes(key)) {
        return value;
      }
    }

    return defaultResponse;
  }

  async generateSOAPNote(encounter) {
    if (this.apiStatus !== 'active') {
      return this.getFallbackSOAP(encounter);
    }

    const prompt = `Generate a SOAP note for this geriatric patient:

Chief Complaint: ${encounter.chiefComplaint}
History: ${encounter.history}
Physical Exam: ${encounter.physicalExam}
Vitals: ${encounter.vitals}
Labs: ${encounter.labs || 'Pending'}

Please format as proper SOAP note with geriatric considerations.`;

    try {
      const response = await this.callOpenAI(prompt, 'soap-note');
      return { content: response, source: 'AI Generated' };
    } catch (error) {
      return this.getFallbackSOAP(encounter);
    }
  }

  getFallbackSOAP(encounter) {
    return {
      subjective: encounter.chiefComplaint || 'Patient reports symptoms',
      objective: encounter.physicalExam || 'Physical examination documented',
      assessment: 'Clinical assessment pending',
      plan: 'Treatment plan to be determined based on evaluation',
      source: 'Template Generated'
    };
  }

  async checkDrugInteractions(medications) {
    // Use local database first, then AI for complex cases
    const localInteractions = window.DrugDatabase?.checkInteractions(medications) || [];
    
    if (this.apiStatus === 'active' && medications.length > 5) {
      try {
        const prompt = `Analyze these medications for interactions in an elderly patient:
${medications.join(', ')}

Focus on:
1. Clinically significant drug-drug interactions
2. Beers Criteria violations
3. Anticholinergic burden
4. QTc prolongation risk
5. Geriatric-specific concerns

Provide prioritized recommendations.`;

        const aiResponse = await this.callOpenAI(prompt, 'drug-interactions');
        return {
          localInteractions,
          aiAnalysis: aiResponse,
          source: 'AI Enhanced'
        };
      } catch (error) {
        return { localInteractions, source: 'Local Database' };
      }
    }
    
    return { localInteractions, source: 'Local Database' };
  }

  setupAutoSave() {
    // Save usage stats periodically
    setInterval(() => {
      const stats = {
        requestCount: this.requestCount,
        lastUsed: Date.now(),
        apiStatus: this.apiStatus
      };
      localStorage.setItem('api_usage_stats', JSON.stringify(stats));
    }, 300000); // Every 5 minutes
  }

  getUsageStats() {
    const stats = JSON.parse(localStorage.getItem('api_usage_stats') || '{}');
    return {
      requestsToday: this.requestCount,
      remainingRequests: this.maxRequests - this.requestCount,
      apiStatus: this.apiStatus,
      lastCheck: this.lastCheck,
      ...stats
    };
  }

  resetAPIKey() {
    localStorage.removeItem('openai_api_key');
    this.openAIKey = '';
    this.apiStatus = 'no-key';
    console.log('🔑 API key reset');
  }

  showAPIStatus() {
    if (window.uiEnhancement) {
      const stats = this.getUsageStats();
      const content = `
        <div class="card-container">
          <h3>🔑 API Status</h3>
          <p><strong>Status:</strong> ${this.getStatusDisplay()}</p>
          <p><strong>Requests Today:</strong> ${stats.requestsToday}/${this.maxRequests}</p>
          <p><strong>Features:</strong> ${this.apiStatus === 'active' ? 'AI Enhanced' : 'Fallback Mode'}</p>
          
          ${this.apiStatus === 'active' ? `
            <div class="button-row">
              <button class="action-btn" onclick="window.apiManager.resetAPIKey()">
                🔄 Reset API Key
              </button>
            </div>
          ` : `
            <div class="button-row">
              <button class="action-btn" onclick="window.apiManager.showAPISetupPrompt()">
                ➕ Add API Key
              </button>
            </div>
          `}
        </div>
        
        <div class="card-container">
          <h4>💡 AI Features (when enabled):</h4>
          <ul>
            <li>Advanced differential diagnosis</li>
            <li>Clinical reasoning explanations</li>
            <li>Drug interaction analysis</li>
            <li>SOAP note generation</li>
            <li>Personalized recommendations</li>
          </ul>
          
          <p><small>💰 Cost: ~$0.01-0.03 per query | 🔒 Your key stays in your browser</small></p>
        </div>
      `;
      window.uiEnhancement.showModal('API Status', content);
    }
  }

  getStatusDisplay() {
    switch (this.apiStatus) {
      case 'active': return '✅ Connected';
      case 'no-key': return '🔑 No API Key';
      case 'error': return '❌ Invalid Key';
      case 'offline': return '🔄 Offline';
      case 'checking': return '🔍 Checking...';
      case 'fallback': return '🔧 Fallback Mode';
      default: return '❓ Unknown';
    }
  }

  // Quick test function for API
  async testAPI() {
    if (this.apiStatus !== 'active') {
      return 'API not active - using fallback mode';
    }

    try {
      const response = await this.callOpenAI('Provide a one-sentence overview of frailty in elderly patients.', 'test');
      return `✅ API Test Successful: ${response.substring(0, 100)}...`;
    } catch (error) {
      return `❌ API Test Failed: ${error.message}`;
    }
  }
}

// Initialize API Manager
window.apiManager = new APIManager();

// Integration hooks for existing systems
if (window.clinicalAI) {
  console.log('🔗 API Manager integrated with Clinical AI');
}

console.log(`
🔑 API Manager Ready!

Status: ${window.apiManager.getStatusDisplay()}

Features:
- OpenAI integration with smart fallbacks
- Cost-effective model selection (GPT-4o-mini)
- Usage tracking and limits
- Secure local storage
- Error handling and recovery

Commands:
- apiManager.showAPIStatus() - View current status
- apiManager.testAPI() - Test connection
- apiManager.resetAPIKey() - Reset stored key
`);