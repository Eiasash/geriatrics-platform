// Clinical Assistant Component - Geriatrics-focused AI assistant
import React, { useState } from 'react';

const ClinicalAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  
  const clinicalPrompts = {
    delirium: "Patient with acute confusion, what's my workup?",
    falls: "Elderly patient fell, assessment protocol?",
    polypharmacy: "Review medications for deprescribing",
    admission: "New geriatric admission checklist",
    capacity: "How to assess decision-making capacity?",
    agitation: "Managing agitation without restraints?",
    goals: "Approach to goals of care discussion",
    discharge: "Safe discharge planning checklist"
  };
  
  // Fallback protocols for common scenarios
  const fallbackProtocols = {
    delirium: `DELIRIUM WORKUP PROTOCOL:
1. Check vitals including O2 sat
2. Review medications (especially new/changed)
3. Basic labs: CBC, BMP, UA, TSH
4. Consider: CXR, ECG, head CT if focal findings
5. CAM assessment for diagnosis
6. Look for: Infection, Medications, Metabolic, Withdrawal
7. Non-pharm: Orient, mobilize, normalize sleep-wake
8. Pharm: Low-dose haloperidol only if severe agitation`,
    
    falls: `FALLS ASSESSMENT PROTOCOL:
1. Check for injury: Head, hip, spine
2. Vital signs including orthostatics
3. Medication review (esp. BP meds, benzos, anticholinergics)
4. Neuro exam: Strength, sensation, cerebellar
5. Cognitive assessment
6. Vision/hearing check
7. Get Up & Go test
8. Environmental hazards assessment
9. Consider: ECG, echo if syncope suspected`,
    
    polypharmacy: `DEPRESCRIBING APPROACH:
1. List all medications with indications
2. Identify Beers Criteria medications
3. Check for drug-drug interactions
4. Assess benefit vs. risk for each med
5. Priority to stop:
   - Duplicate therapy
   - No clear indication
   - Adverse effects > benefits
   - Beers Criteria meds
6. Taper benzos, PPIs slowly
7. One change at a time
8. Monitor for withdrawal/return of symptoms`,
    
    admission: `GERIATRIC ADMISSION CHECKLIST:
1. Comprehensive med reconciliation
2. Baseline functional status (ADLs/IADLs)
3. Baseline cognitive status
4. Code status discussion
5. Fall risk assessment
6. Pressure ulcer risk (Braden scale)
7. Nutrition assessment
8. Social support/discharge planning from day 1
9. Sensory aids (glasses, hearing aids)
10. Advance directives/POLST forms`
  };
  
  const askClinical = async (question) => {
    setLoading(true);
    
    try {
      // Check if we have a fallback protocol for this query
      const queryLower = question.toLowerCase();
      let fallbackResponse = null;
      
      if (queryLower.includes('delirium') || queryLower.includes('confusion')) {
        fallbackResponse = fallbackProtocols.delirium;
      } else if (queryLower.includes('fall')) {
        fallbackResponse = fallbackProtocols.falls;
      } else if (queryLower.includes('polypharm') || queryLower.includes('deprescrib')) {
        fallbackResponse = fallbackProtocols.polypharmacy;
      } else if (queryLower.includes('admission')) {
        fallbackResponse = fallbackProtocols.admission;
      }
      
      // Try API call with fallback
      try {
        const apiKey = process.env.REACT_APP_ANTHROPIC_KEY || localStorage.getItem('anthropic_key');
        
        if (apiKey) {
          const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
              model: 'claude-3-sonnet-20241022',
              max_tokens: 500,
              messages: [{
                role: 'user',
                content: `You are a geriatrics specialist assistant. Provide a brief, practical, evidence-based answer. Focus on actionable steps. Question: ${question}`
              }]
            })
          });
          
          if (res.ok) {
            const data = await res.json();
            setResponse(data.content[0].text);
          } else {
            throw new Error('API call failed');
          }
        } else {
          throw new Error('No API key');
        }
      } catch (apiError) {
        // Use fallback protocol if available
        if (fallbackResponse) {
          setResponse(fallbackResponse);
        } else {
          setResponse(`GENERAL GERIATRIC APPROACH:
1. Review vital signs and baseline status
2. Comprehensive medication review
3. Assess functional and cognitive baseline
4. Consider common geriatric syndromes:
   - Delirium
   - Falls
   - Polypharmacy
   - Incontinence
   - Pressure ulcers
5. Involve interdisciplinary team
6. Early discharge planning
7. Clear communication with patient/family

For specific guidance, consult attending or geriatrics team.`);
        }
      }
      
      // Add to history
      setHistory(prev => [...prev, { question, answer: response }]);
      
    } catch (error) {
      console.error('Clinical Assistant error:', error);
      setResponse('Error accessing clinical database. Please consult attending physician.');
    }
    
    setLoading(false);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && query.trim()) {
      e.preventDefault();
      askClinical(query);
      setQuery('');
    }
  };
  
  return (
    <div className="clinical-assistant">
      <div className="assistant-header">
        <h3>🤖 Clinical Assistant - Geriatrics</h3>
        <span className="subtitle">Evidence-based protocols & quick references</span>
      </div>
      
      <div className="quick-prompts">
        {Object.entries(clinicalPrompts).map(([key, prompt]) => (
          <button 
            key={key}
            onClick={() => {
              setQuery(prompt);
              askClinical(prompt);
            }}
            className="prompt-btn"
            disabled={loading}
          >
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>
      
      <div className="input-area">
        <textarea
          placeholder="Ask a clinical question... (e.g., 'How do I manage sundowning?')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          rows={3}
        />
        
        <button 
          onClick={() => {
            if (query.trim()) {
              askClinical(query);
              setQuery('');
            }
          }}
          disabled={loading || !query.trim()}
          className="ask-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Thinking...
            </>
          ) : (
            'Ask'
          )}
        </button>
      </div>
      
      {response && (
        <div className="response-box">
          <div className="response-header">
            <span>📋 Clinical Guidance</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(response);
                alert('Copied to clipboard!');
              }}
              className="copy-btn"
            >
              Copy
            </button>
          </div>
          <pre>{response}</pre>
        </div>
      )}
      
      <div className="disclaimer">
        <small>
          ⚠️ This is clinical decision support only. Always use clinical judgment and consult attending physicians for complex cases.
        </small>
      </div>
    </div>
  );
};

export default ClinicalAssistant;