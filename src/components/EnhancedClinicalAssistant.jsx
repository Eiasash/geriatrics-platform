// Enhanced Clinical Assistant with Multi-AI Support
import React, { useState, useEffect, useRef } from 'react';
import aiService from '../services/AIService';
import { debounce } from '../utils/performance';

const EnhancedClinicalAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeProvider, setActiveProvider] = useState('auto');
  const [consensusMode, setConsensusMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    claude: '',
    openai: '',
    gemini: ''
  });
  const [stats, setStats] = useState(null);
  
  const responseRef = useRef(null);
  
  // Clinical quick prompts
  const clinicalPrompts = {
    delirium: {
      title: "Delirium",
      prompt: "Patient with acute confusion. Provide CAM assessment steps and management protocol.",
      icon: "🧠"
    },
    falls: {
      title: "Falls",
      prompt: "Elderly patient fell. What's the comprehensive assessment and prevention protocol?",
      icon: "🚶"
    },
    polypharmacy: {
      title: "Deprescribing",
      prompt: "Review approach for deprescribing in elderly with polypharmacy. Include Beers criteria.",
      icon: "💊"
    },
    admission: {
      title: "Admission",
      prompt: "Comprehensive geriatric admission checklist and initial orders.",
      icon: "🏥"
    },
    capacity: {
      title: "Capacity",
      prompt: "How to assess decision-making capacity in elderly patient?",
      icon: "⚖️"
    },
    agitation: {
      title: "Agitation",
      prompt: "Non-pharmacological and pharmacological management of agitation in dementia.",
      icon: "😰"
    },
    goals: {
      title: "Goals of Care",
      prompt: "Framework for goals of care discussion with elderly patient and family.",
      icon: "🎯"
    },
    pain: {
      title: "Pain",
      prompt: "Pain assessment and management in non-verbal elderly patients.",
      icon: "😣"
    }
  };
  
  // Load saved API keys
  useEffect(() => {
    const savedKeys = {
      claude: localStorage.getItem('claude_api_key') || '',
      openai: localStorage.getItem('openai_api_key') || '',
      gemini: localStorage.getItem('gemini_api_key') || ''
    };
    setApiKeys(savedKeys);
    
    // Load history
    const savedHistory = localStorage.getItem('clinical_assistant_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);
  
  // Save history
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('clinical_assistant_history', JSON.stringify(history.slice(-50)));
    }
  }, [history]);
  
  // Main query function
  const askClinical = async (questionText, options = {}) => {
    const question = questionText || query;
    if (!question.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      // Add medical context to the prompt
      const medicalPrompt = `You are a geriatrics specialist assistant at an academic medical center.
      
Context: Israeli healthcare system, Shaare Zedek Medical Center.
Focus: Evidence-based, practical guidance for geriatric medicine.
Style: Concise, actionable, with specific drug names and dosages when relevant.

Question: ${question}

Provide a structured response with:
1. Immediate actions
2. Assessment points
3. Treatment considerations
4. Monitoring requirements
5. Red flags to watch for`;
      
      let result;
      
      if (consensusMode) {
        // Get responses from multiple AIs
        result = await aiService.consensusQuery(medicalPrompt, {
          providers: ['claude', 'openai', 'gemini'],
          returnAll: true,
          maxTokens: 1500,
          temperature: 0.1
        });
        
        // Format consensus response
        const consensusResponse = formatConsensusResponse(result);
        setResponse(consensusResponse);
        
      } else if (activeProvider === 'auto') {
        // Use automatic fallback chain
        result = await aiService.query(medicalPrompt, {
          maxTokens: 2000,
          temperature: 0.1
        });
        setResponse(result);
        
      } else {
        // Use specific provider
        result = await aiService.queryProvider(activeProvider, medicalPrompt, {
          maxTokens: 2000,
          temperature: 0.1
        });
        setResponse(result);
      }
      
      // Add to history
      const historyEntry = {
        id: Date.now(),
        question,
        response: typeof result === 'string' ? result : result.responses?.[0]?.response || '',
        timestamp: new Date().toISOString(),
        provider: activeProvider
      };
      
      setHistory(prev => [...prev, historyEntry]);
      
      // Update stats
      const newStats = aiService.getStats();
      setStats(newStats);
      
    } catch (error) {
      console.error('Query failed:', error);
      
      // Use fallback response
      const fallback = aiService.getFallbackResponse(question);
      setResponse(fallback);
      
      // Show error message
      if (error.message.includes('API key')) {
        setResponse(`⚠️ API Key Error

Please configure your API keys in Settings.

In the meantime, here's a standard protocol:

${fallback}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Format consensus response
  const formatConsensusResponse = (result) => {
    if (!result.responses || result.responses.length === 0) {
      return 'No responses available';
    }
    
    let formatted = `🤖 MULTI-AI CONSENSUS RESPONSE
═══════════════════════════════

Confidence: ${(result.confidence * 100).toFixed(0)}%
Providers: ${result.responses.map(r => r.provider).join(', ')}

`;
    
    // If all agree, show single response
    if (result.consensus?.confidence === 'high') {
      formatted += result.responses[0].response;
    } else {
      // Show each AI's response
      result.responses.forEach(({ provider, response }) => {
        formatted += `
━━━ ${provider.toUpperCase()} RESPONSE ━━━
${response}

`;
      });
      
      // Add consensus summary
      if (result.consensus?.agreedTerms?.length > 0) {
        formatted += `
━━━ CONSENSUS POINTS ━━━
Common recommendations across all AIs:
${result.consensus.agreedTerms.map(term => `• ${term}`).join('\n')}
`;
      }
    }
    
    return formatted;
  };
  
  // Save API key
  const saveApiKey = async (provider, key) => {
    if (!key) return;
    
    try {
      // Test the key
      await aiService.testApiKey(provider, key);
      
      // Save if valid
      aiService.setApiKey(provider, key);
      setApiKeys(prev => ({ ...prev, [provider]: key }));
      
      alert(`✅ ${provider} API key saved and validated!`);
    } catch (error) {
      alert(`❌ Invalid ${provider} API key: ${error.message}`);
    }
  };
  
  // Debounced typing indicator
  const handleTyping = debounce((value) => {
    // Could add typing indicator here
  }, 300);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        askClinical();
      }
      
      // Escape to clear
      if (e.key === 'Escape') {
        setQuery('');
        setResponse('');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [query]);
  
  return (
    <div className="enhanced-clinical-assistant">
      {/* Header */}
      <div className="assistant-header">
        <div className="header-main">
          <h2>🤖 Enhanced Clinical Assistant</h2>
          <span className="subtitle">Multi-AI Consensus • Evidence-Based Protocols</span>
        </div>
        
        <div className="header-controls">
          <select 
            value={activeProvider}
            onChange={(e) => setActiveProvider(e.target.value)}
            className="provider-selector"
          >
            <option value="auto">Auto (with fallback)</option>
            <option value="claude">Claude (Anthropic)</option>
            <option value="openai">GPT-4 (OpenAI)</option>
            <option value="gemini">Gemini (Google)</option>
          </select>
          
          <label className="consensus-toggle">
            <input
              type="checkbox"
              checked={consensusMode}
              onChange={(e) => setConsensusMode(e.target.checked)}
            />
            <span>Consensus Mode</span>
          </label>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="settings-btn"
          >
            ⚙️
          </button>
        </div>
      </div>
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <h3>API Configuration</h3>
          <div className="api-keys-form">
            {Object.entries(apiKeys).map(([provider, key]) => (
              <div key={provider} className="api-key-input">
                <label>{provider.charAt(0).toUpperCase() + provider.slice(1)} API Key:</label>
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, [provider]: e.target.value }))}
                  placeholder={`Enter ${provider} API key...`}
                />
                <button onClick={() => saveApiKey(provider, key)}>Save</button>
              </div>
            ))}
          </div>
          
          {stats && (
            <div className="stats-panel">
              <h4>Usage Statistics</h4>
              <div className="stats-grid">
                <div>Total Requests: {stats.totalRequests}</div>
                <div>Success Rate: {stats.successRate}</div>
                <div>Cache Hits: {stats.cacheHitRate}</div>
                <div>Cache Size: {stats.cacheSize}</div>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => {
              aiService.clearCache();
              alert('Cache cleared!');
            }}
            className="clear-cache-btn"
          >
            Clear Cache
          </button>
        </div>
      )}
      
      {/* Quick Prompts */}
      <div className="quick-prompts-grid">
        {Object.entries(clinicalPrompts).map(([key, { title, prompt, icon }]) => (
          <button
            key={key}
            onClick={() => {
              setQuery(prompt);
              askClinical(prompt);
            }}
            className="prompt-card"
            disabled={loading}
          >
            <span className="prompt-icon">{icon}</span>
            <span className="prompt-title">{title}</span>
          </button>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="input-section">
        <textarea
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleTyping(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              askClinical();
            }
          }}
          placeholder="Ask a clinical question... (Ctrl+Enter to submit, Esc to clear)"
          disabled={loading}
          rows={4}
          className="query-input"
        />
        
        <div className="input-controls">
          <button
            onClick={() => askClinical()}
            disabled={loading || !query.trim()}
            className="submit-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                <span>🔍</span>
                Ask
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              setQuery('');
              setResponse('');
            }}
            className="clear-btn"
          >
            Clear
          </button>
        </div>
      </div>
      
      {/* Response Area */}
      {response && (
        <div className="response-section" ref={responseRef}>
          <div className="response-header">
            <span>📋 Clinical Guidance</span>
            <div className="response-actions">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(response);
                  alert('Copied to clipboard!');
                }}
                className="copy-btn"
              >
                📋 Copy
              </button>
              
              <button
                onClick={() => {
                  const blob = new Blob([response], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `clinical-guidance-${Date.now()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="download-btn"
              >
                💾 Save
              </button>
            </div>
          </div>
          
          <pre className="response-content">{response}</pre>
        </div>
      )}
      
      {/* History */}
      {history.length > 0 && (
        <details className="history-section">
          <summary>📜 Recent Queries ({history.length})</summary>
          <div className="history-list">
            {history.slice(-10).reverse().map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-question">{item.question}</div>
                <div className="history-meta">
                  {new Date(item.timestamp).toLocaleString()} • {item.provider}
                </div>
                <button
                  onClick={() => {
                    setQuery(item.question);
                    setResponse(item.response);
                  }}
                  className="reuse-btn"
                >
                  Reuse
                </button>
              </div>
            ))}
          </div>
        </details>
      )}
      
      {/* Disclaimer */}
      <div className="disclaimer">
        <small>
          ⚠️ Educational tool only. Always use clinical judgment and verify recommendations.
          Responses are AI-generated and should be validated against current guidelines.
        </small>
      </div>
    </div>
  );
};

export default EnhancedClinicalAssistant;