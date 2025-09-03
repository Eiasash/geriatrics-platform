// src/components/ClinicalAssistant/ClinicalAssistant.jsx

import React, { useState, useEffect } from 'react';
import './ClinicalAssistant.css';

const ClinicalAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  
  // Quick prompts for common geriatric scenarios
  const quickPrompts = [
    { 
      label: '🚨 Delirium', 
      prompt: '85yo with acute confusion, vitals stable. What\'s my immediate workup and management?' 
    },
    { 
      label: '🏥 Falls', 
      prompt: 'Elderly patient fell at home, no LOC, on warfarin. Assessment protocol?' 
    },
    { 
      label: '💊 Polypharmacy', 
      prompt: 'Review these meds for deprescribing: metformin, insulin, plavix, eliquis, cardiloc, omeprazole, haldol PRN' 
    },
    { 
      label: '📋 Admission', 
      prompt: 'New geriatric admission from ER with UTI and delirium. Checklist?' 
    },
    { 
      label: '🧠 Capacity', 
      prompt: 'Patient refusing treatment, family wants full care. How to assess capacity?' 
    },
    { 
      label: '💉 Code Status', 
      prompt: 'How to discuss code status with family of advanced dementia patient?' 
    }
  ];

  const askAssistant = async (question) => {
    setLoading(true);
    
    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY || 
                     process.env.REACT_APP_CLAUDE_API_KEY ||
                     localStorage.getItem('anthropic_api_key');
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const systemPrompt = `You are a geriatrics specialist assistant at Shaare Zedek Medical Center. 
        Provide brief, practical, evidence-based answers for geriatric care. 
        Focus on Israeli/MOH guidelines when relevant.
        Include medication doses in both generic and Israeli brand names.
        Keep responses under 200 words unless complex protocol needed.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307', // Faster, cheaper for quick queries
          max_tokens: 500,
          messages: [
            { role: 'user', content: systemPrompt + '\n\n' + question }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantResponse = data.content[0].text;
      
      setResponse(assistantResponse);
      setHistory([...history, { q: question, a: assistantResponse }]);
      
    } catch (error) {
      console.error('Assistant error:', error);
      
      // Fallback protocols for offline/error scenarios
      const fallbacks = {
        delirium: `DELIRIUM PROTOCOL:
1. CAM Assessment (confusion assessment method)
2. Orders: CBC, BMP, UA, B12, TSH, medication review
3. Stop benzos/anticholinergics
4. Treat underlying cause (UTI most common)
5. Haldol 0.25mg PO/IM if agitated
6. Reorient, ensure glasses/hearing aids`,
        
        falls: `FALLS ASSESSMENT:
1. Check orthostatics
2. Timed Up & Go test (>12 sec = high risk)  
3. Review medications (>4 = risk)
4. Vision/feet examination
5. If on anticoag: CT head if any head trauma
6. Home safety evaluation`,
        
        polypharmacy: `DEPRESCRIBING CHECKLIST:
1. Stop PPIs if no clear indication
2. Taper benzos (25% weekly)
3. D/C statins if limited life expectancy
4. Reduce BP meds if orthostatic
5. Stop anticholinergics
6. Review diabetic control targets`,

        admission: `ADMISSION CHECKLIST:
1. Med reconciliation
2. Code status discussion
3. Baseline functional status (ADLs/IADLs)
4. Cognitive screen (MOCA/MMSE)
5. Fall risk assessment
6. Social work if placement concerns
7. Nutrition assessment`,

        capacity: `CAPACITY ASSESSMENT:
Four components (ALL needed):
1. UNDERSTAND the medical condition
2. APPRECIATE how it applies to them
3. REASON through risks/benefits
4. EXPRESS a consistent choice

If lacks capacity:
- Document assessment thoroughly
- Identify legal surrogate
- Consider ethics consult`,

        code: `CODE STATUS DISCUSSION:
1. "Hope for best, prepare for worst"
2. Focus on patient's values/goals
3. Explain what CPR really means
4. "What would your loved one want?"
5. Document clearly in chart
6. Revisit if condition changes`
      };
      
      // Try to match fallback
      const key = Object.keys(fallbacks).find(k => 
        question.toLowerCase().includes(k)
      );
      
      setResponse(fallbacks[key] || 
        'Unable to connect to AI. Please check connection or use clinical judgment.');
    }
    
    setLoading(false);
  };

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('clinical_assistant_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('clinical_assistant_history', JSON.stringify(history.slice(-20)));
    }
  }, [history]);

  return (
    <div className="clinical-assistant">
      <div className="assistant-header">
        <h2>🤖 Clinical Assistant - Geriatrics</h2>
        <span className="status">
          {loading ? '🔄 Thinking...' : '✅ Ready'}
        </span>
      </div>

      <div className="quick-prompts">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            className="prompt-btn"
            onClick={() => {
              setQuery(prompt.prompt);
              askAssistant(prompt.prompt);
            }}
            disabled={loading}
          >
            {prompt.label}
          </button>
        ))}
      </div>

      <div className="query-input">
        <textarea
          placeholder="Ask a clinical question... (e.g., 'Geriatric dosing for ramipril?')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !loading) {
              e.preventDefault();
              askAssistant(query);
            }
          }}
          disabled={loading}
        />
        <button 
          className="ask-btn"
          onClick={() => askAssistant(query)}
          disabled={loading || !query.trim()}
        >
          {loading ? '⏳ Processing...' : '🚀 Ask'}
        </button>
      </div>

      {response && (
        <div className="response-container">
          <div className="response-header">
            <span>📋 Clinical Guidance</span>
            <button 
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(response);
                alert('Copied to clipboard!');
              }}
            >
              📋 Copy
            </button>
          </div>
          <div className="response-content">
            {response.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {history.length > 1 && (
        <details className="history">
          <summary>Previous Queries ({history.length})</summary>
          {history.slice().reverse().map((item, idx) => (
            <div key={idx} className="history-item">
              <strong>Q:</strong> {item.q.substring(0, 100)}...
              <br />
              <strong>A:</strong> {item.a.substring(0, 200)}...
              <button 
                className="reuse-btn"
                onClick={() => {
                  setQuery(item.q);
                  setResponse(item.a);
                }}
              >
                Reuse
              </button>
            </div>
          ))}
        </details>
      )}

      <div className="offline-notice">
        💡 Tip: Common protocols work offline with fallback content
      </div>
    </div>
  );
};

export default ClinicalAssistant;