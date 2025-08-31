// Clinical Assistant Component - Enhanced Geriatric Protocols with AI
import React, { useState, useEffect } from 'react';
import { AlertCircle, Brain, Pill, Heart, User } from 'lucide-react';

const ClinicalAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState(null);
  
  // Geriatric-specific quick protocols
  const protocols = {
    delirium: {
      icon: <Brain />,
      title: 'Delirium Workup',
      prompt: 'Elderly patient with acute confusion - full workup protocol',
      fallback: `DELIRIUM PROTOCOL:
1. CAM Assessment (Acute + Inattention + Disorganized/Altered)
2. IMMEDIATE ORDERS:
   - UA (UTI #1 cause)
   - CBC with diff
   - BMP (Na, glucose)
   - TSH, B12 if chronic
   - Medication review
3. STOP: Benzos, anticholinergics, opioids
4. Environmental: Glasses, hearing aids, orient
5. If agitated: Haldol 0.25mg PO/IM (NOT 5mg!)`,
    },
    falls: {
      icon: <AlertCircle />,
      title: 'Fall Assessment',
      prompt: '85yo fell at home - complete assessment',
      fallback: `FALL ASSESSMENT:
1. Injury assessment (head CT if anticoag)
2. Orthostatic vitals (3 positions)
3. Timed Up & Go (>12 sec = high risk)
4. Vision/hearing check
5. Medication review (>4 meds, psychotropics)
6. Environmental assessment
7. PT/OT consult
8. Consider admission if recurrent`,
    },
    polypharmacy: {
      icon: <Pill />,
      title: 'Deprescribing',
      prompt: 'Review meds for 85yo with 12 medications',
      fallback: `DEPRESCRIBING TARGETS:
1. PPIs >8 weeks without indication
2. Benzos (taper 25% weekly)
3. Antipsychotics without psychosis
4. Statins if life expectancy <2 years
5. Tight glucose control if frail
6. Multiple BP meds if orthostatic
7. Supplements without clear benefit
ALWAYS: Start low, go slow, one change at a time`,
    },
    admission: {
      icon: <Heart />,
      title: 'Admission Orders',
      prompt: 'Standard geriatric admission orders',
      fallback: `GERIATRIC ADMISSION:
1. Code status discussion
2. Baseline: ADLs, IADLs, cognition
3. Labs: CBC, BMP, UA, TSH if indicated
4. Fall precautions
5. DVT prophylaxis (if appropriate)
6. Bowel regimen
7. Sleep: No benzos, try melatonin 3mg
8. Diet: Regular, assist as needed
9. PT/OT/SW consults
10. Family meeting within 48h`,
    },
    capacity: {
      icon: <User />,
      title: 'Capacity Assessment',
      prompt: 'Patient refusing treatment - capacity evaluation',
      fallback: `CAPACITY ASSESSMENT:
Four criteria (ALL required):
1. UNDERSTAND: Can explain condition/treatment
2. APPRECIATE: Applies to their situation
3. REASON: Weighs risks/benefits logically
4. EXPRESS: Consistent choice

If lacks capacity:
- Document thoroughly
- Identify surrogate
- Consider ethics consult
- Psychiatry if unclear`,
    }
  };
  
  // API call with fallback
  const askAssistant = async (question, useFallback = null) => {
    setLoading(true);
    
    try {
      const systemPrompt = `You are a geriatrics specialist at Shaare Zedek Medical Center.
      Provide brief, practical, evidence-based answers for geriatric medicine.
      Include specific drug doses for elderly patients.
      Format: Brief answer with bullet points. Maximum 200 words.`;
      
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY || localStorage.getItem('anthropic_api_key');
      
      if (apiKey) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307', // Faster, cheaper for quick queries
            max_tokens: 300,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: question }
            ]
          })
        });

        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        setResponse(data.content[0].text);
      } else {
        throw new Error('No API key');
      }
    } catch (error) {
      console.error('API Error:', error);
      // Use fallback protocol if provided
      if (useFallback) {
        setResponse(useFallback);
      } else {
        setResponse('Connection error. Check protocols tab for offline guidance.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Quick protocol buttons
  const handleProtocolClick = (key) => {
    const protocol = protocols[key];
    setActiveProtocol(key);
    askAssistant(protocol.prompt, protocol.fallback);
  };

  // Custom question handler
  const handleCustomQuestion = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && query.trim()) {
      e.preventDefault();
      setActiveProtocol(null);
      askAssistant(query);
      setQuery('');
    }
  };

  // Remove old fallback protocols
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
        <h2>🤖 Clinical Assistant - Geriatrics</h2>
        <span className="status">
          {loading ? '🔄 Thinking...' : '✅ Ready'}
        </span>
      </div>
      {/* Quick Protocol Buttons */}
      <div className="protocol-grid">
        {Object.entries(protocols).map(([key, protocol]) => (
          <button
            key={key}
            onClick={() => handleProtocolClick(key)}
            className={`protocol-btn ${activeProtocol === key ? 'active' : ''}`}
            disabled={loading}
          >
            {protocol.icon}
            <span>{protocol.title}</span>
          </button>
        ))}
      </div>
      {/* Custom Question Input */}
      <div className="custom-query">
        <textarea
          placeholder="Ask anything: 'Starting dose of ramipril in 85yo?' or 'Confusion after hip surgery?'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleCustomQuestion}
          disabled={loading}
          rows={2}
        />
        <div className="input-hint">Press Enter to ask • Shift+Enter for new line</div>
      </div>
      {/* Response Display */}
      {response && (
        <div className="response-container">
          <div className="response-header">
            {activeProtocol && (
              <span className="protocol-label">
                {protocols[activeProtocol].title}
              </span>
            )}
          </div>
          <div className="response-content">
            <pre>{response}</pre>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(response)}
            className="copy-btn"
          >
            📋 Copy
          </button>
        </div>
      )}

      {/* Offline Notice */}
      <div className="offline-notice">
        💡 Protocols work offline - fallback content included for rounds
      </div>
    </div>
  );
};

export default ClinicalAssistant;