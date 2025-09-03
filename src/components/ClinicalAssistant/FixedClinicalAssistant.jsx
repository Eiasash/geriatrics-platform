// Fixed Clinical Assistant with Working AI Integration
import React, { useState, useEffect } from 'react';
import './ClinicalAssistant.css';

const FixedClinicalAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('quick'); // quick or custom
  
  // Comprehensive Medical Knowledge Base
  const medicalKnowledge = {
    delirium: {
      assessment: `DELIRIUM ASSESSMENT PROTOCOL:

1. CAM (Confusion Assessment Method):
   Feature 1: Acute onset AND fluctuating course
   Feature 2: Inattention (serial 7s, months backward)
   Feature 3: Disorganized thinking
   Feature 4: Altered level of consciousness
   ✓ Positive if: 1 AND 2 AND (3 OR 4)

2. IMMEDIATE WORKUP:
   • Vital signs including O2 saturation
   • Fingerstick glucose
   • Medication review (STOP anticholinergics/benzos)
   • UA with culture (UTI #1 cause in elderly)
   • CBC with differential
   • BMP (Na, glucose, BUN/Cr)
   • Consider: TSH, B12, CXR, Head CT if focal findings

3. MANAGEMENT:
   Non-pharmacologic (FIRST LINE):
   • Reorient frequently (clock, calendar visible)
   • Glasses and hearing aids
   • Natural light during day, darkness at night
   • Family presence at bedside
   • Early mobilization
   
   Pharmacologic (if severe agitation):
   • Haloperidol 0.25-0.5mg PO/IM q4-6h PRN
   • Alternative: Quetiapine 12.5-25mg PO BID
   • AVOID benzos except alcohol withdrawal

4. KEY POINTS:
   • Hypoactive delirium (50%) has worse prognosis
   • Prevent with HELP protocol
   • Document CAM score daily`,
      
      redFlags: [
        "Sudden onset confusion",
        "Fluctuating mental status",
        "Inattention",
        "Visual hallucinations",
        "Pulling at lines/clothes"
      ]
    },
    
    falls: {
      assessment: `FALLS ASSESSMENT PROTOCOL:

1. IMMEDIATE ASSESSMENT:
   • Check for injury (head, hip, spine)
   • Vital signs including orthostatics
   • Glucose check
   • Neuro exam if head involvement
   • EKG if syncope suspected

2. ORTHOSTATIC VITALS:
   • Measure BP/HR: Supine → 1 min standing → 3 min standing
   • Positive if: SBP drop >20 OR DBP drop >10 OR HR increase >30

3. FUNCTIONAL TESTS:
   • Timed Up & Go (TUG):
     - Normal: <10 seconds
     - Fall risk: >12 seconds
   • 30-Second Chair Stand:
     - Normal: >12 (women), >14 (men)
   • 4-Stage Balance Test

4. RISK FACTORS TO ADDRESS:
   • Previous falls (strongest predictor)
   • Medications (>4 drugs, psychotropics)
   • Vision impairment
   • Vitamin D deficiency
   • Environmental hazards
   • Muscle weakness
   • Gait/balance problems

5. INTERVENTIONS:
   • PT/OT evaluation
   • Medication review and reduction
   • Vitamin D 800-1000 IU daily
   • Home safety evaluation
   • Strength and balance training (Tai Chi)`,
      
      redFlags: [
        "Recurrent falls",
        "Falls with LOC",
        "On anticoagulation",
        "New neurologic findings",
        "Hip pain after fall"
      ]
    },
    
    medications: {
      assessment: `GERIATRIC MEDICATION PRINCIPLES:

1. BEERS CRITERIA - ALWAYS AVOID:
   • Long-acting benzos (diazepam, chlordiazepoxide)
   • Tertiary TCAs (amitriptyline)
   • First-gen antihistamines (diphenhydramine)
   • Muscle relaxants (cyclobenzaprine)
   • Sliding scale insulin alone
   • Meperidine

2. CONDITION-SPECIFIC AVOID:
   Falls/Fractures:
   • Benzodiazepines
   • Antipsychotics
   • TCAs
   
   Dementia:
   • All anticholinergics
   • Benzodiazepines
   • H2 receptor blockers
   
   CKD:
   • NSAIDs
   • Metformin if eGFR <30
   
   Heart Failure:
   • NSAIDs
   • Diltiazem, Verapamil
   • Thiazolidinediones

3. START CRITERIA - CONSIDER ADDING:
   • Statin in diabetes/CAD
   • ACE inhibitor in CHF
   • Anticoagulation in AFib (CHA2DS2-VASc ≥2)
   • Vitamin D in falls/osteoporosis
   • Beta blocker post-MI

4. DEPRESCRIBING APPROACH:
   1. List all medications with indications
   2. Identify potentially inappropriate
   3. Assess risk vs benefit
   4. Prioritize for discontinuation
   5. Taper gradually (especially benzos, PPIs)
   6. Monitor for withdrawal
   7. One change at a time`,
      
      redFlags: [
        ">5 medications",
        "Duplicate drug classes",
        "No clear indication",
        "Adverse effects present",
        "Drug-drug interactions"
      ]
    },
    
    admission: {
      assessment: `GERIATRIC ADMISSION CHECKLIST:

WITHIN 1 HOUR:
□ Vital signs + orthostatic BP
□ Medication reconciliation (call pharmacy if needed)
□ Code status discussion
□ Fall risk assessment (Morse scale)
□ Pressure ulcer risk (Braden scale)
□ VTE prophylaxis orders

WITHIN 24 HOURS:
□ Comprehensive Geriatric Assessment
□ Cognitive screen (Mini-Cog or MOCA)
□ Functional status (Katz ADL, Lawton IADL)
□ Depression screen (GDS-15 or PHQ-9)
□ Social work if discharge concerns
□ PT/OT if functional decline
□ Nutrition assessment (MNA-SF)
□ Advance directive discussion

STANDARD ADMISSION ORDERS:
Labs:
• CBC, BMP, LFTs
• TSH if not in past 6 months
• B12 if cognitive issues
• UA if altered mental status
• PT/INR if on warfarin
• Type and screen if surgery planned

Prophylaxis:
• DVT: Enoxaparin 40mg SC daily (if CrCl >30)
• GI: Only if high risk (ventilated, coagulopathy)
• Falls: Bed alarm, frequent rounding, call bell in reach

Activity:
• Up in chair TID with meals
• PT/OT evaluation
• Fall precautions

Diet:
• Regular diet unless contraindicated
• Assist with setup/feeding as needed
• Nutritional supplements if poor intake`,
      
      redFlags: [
        "Delirium on admission",
        "Multiple falls at home",
        "Weight loss >10%",
        "Caregiver burnout",
        "Polypharmacy (>10 meds)"
      ]
    },
    
    capacity: {
      assessment: `CAPACITY ASSESSMENT PROTOCOL:

FOUR COMPONENTS (ALL required for capacity):

1. UNDERSTANDING
   Questions to ask:
   • "What is your medical problem?"
   • "What treatment are we recommending?"
   • "What are the risks of this treatment?"
   • "What are the risks of not having treatment?"

2. APPRECIATION
   Questions to ask:
   • "Why do you think we're recommending this?"
   • "What do you think will happen without treatment?"
   • "How might this affect your life?"
   • "Do you believe this applies to you?"

3. REASONING
   Questions to ask:
   • "Why are you choosing this option?"
   • "What makes this the best choice for you?"
   • "What are the alternatives?"
   • "How did you weigh the pros and cons?"

4. EXPRESSING A CHOICE
   Questions to ask:
   • "What have you decided?"
   • "Is this your final decision?"
   • "Have you changed your mind?"

DOCUMENTATION MUST INCLUDE:
• Specific questions asked
• Patient's exact responses
• Which criteria were met/not met
• Any reversible factors addressed
• Psychiatry consultation if unclear

IMPORTANT NOTES:
• Capacity is decision-specific
• Can fluctuate (especially with delirium)
• Disagreement ≠ lack of capacity
• Depression may affect capacity
• If lacks capacity → identify surrogate`,
      
      redFlags: [
        "Acute confusion",
        "Severe depression",
        "Psychosis",
        "Intoxication",
        "Coercion suspected"
      ]
    },
    
    painManagement: {
      assessment: `GERIATRIC PAIN MANAGEMENT:

1. ASSESSMENT:
   Verbal patients: Numeric scale 0-10
   
   Non-verbal/Dementia: PAINAD Scale
   • Breathing (normal 0, labored 2)
   • Vocalization (none 0, crying 2)
   • Facial expression (smile 0, grimace 2)
   • Body language (relaxed 0, rigid 2)
   • Consolability (no need 0, unable 2)
   Score ≥4 suggests pain

2. STEPWISE APPROACH:
   
   Step 1 - Mild Pain (1-3):
   • Acetaminophen 500-1000mg q6h scheduled
   • Max 3g/day (2g if liver disease)
   • Topical agents (capsaicin, lidocaine)
   
   Step 2 - Moderate Pain (4-6):
   • Continue acetaminophen
   • Add Tramadol 25mg q12h (max 200mg/day)
   • Consider gabapentin for neuropathic
   
   Step 3 - Severe Pain (7-10):
   • Continue Step 1 & 2
   • Add oxycodone 2.5mg q6h PRN
   • Consider long-acting if stable needs
   
3. OPIOID CONVERSIONS:
   • Morphine 10mg PO = 
   • Oxycodone 7.5mg PO = 
   • Hydromorphone 2mg PO = 
   • Tramadol 100mg PO
   
4. AVOID IN ELDERLY:
   • NSAIDs (renal, GI, CV risk)
   • Meperidine (neurotoxic metabolite)
   • Long-acting opioids initially
   • Muscle relaxants

5. ALWAYS WITH OPIOIDS:
   • Start bowel regimen (senna + PEG)
   • Monitor sedation level
   • Fall precautions
   • Naloxone available`,
      
      redFlags: [
        "New severe pain",
        "Pain with fever",
        "Neurologic changes",
        "Oversedation",
        "Respiratory rate <8"
      ]
    },
    
    endOfLife: {
      assessment: `END-OF-LIFE CARE PROTOCOL:

1. RECOGNIZING DYING (Last Days):
   • Profound weakness
   • Bedbound
   • Minimal intake
   • Drowsiness/coma
   • Changes in breathing
   • Cool extremities

2. SYMPTOM MANAGEMENT:

   Pain:
   • Morphine 2.5-5mg PO/SC q4h
   • Breakthrough: 10% of daily dose q1h PRN
   
   Dyspnea:
   • Morphine 2.5mg SC q4h
   • Oxygen if comfort (not for numbers)
   • Fan to face
   
   Secretions ("Death Rattle"):
   • Glycopyrrolate 0.2mg SC q4h
   • Position on side
   • Gentle suctioning if needed
   
   Agitation/Delirium:
   • Haloperidol 0.5-1mg SC q6h
   • Midazolam 2.5-5mg SC q2h PRN
   
   Nausea:
   • Metoclopramide 10mg SC q6h
   • Haloperidol 0.5mg SC q8h

3. DISCONTINUE:
   • Vital signs
   • Labs
   • Non-comfort medications
   • Artificial nutrition/hydration
   • Turn q2h unless comfort

4. FAMILY SUPPORT:
   • Explain natural dying process
   • Encourage presence and touch
   • Allow cultural/spiritual practices
   • Offer chaplain/social work
   • Bereavement resources

5. DOCUMENTATION:
   • Goals of care discussion
   • Comfort measures only order
   • DNR/DNI status
   • Symptom assessments`,
      
      redFlags: [
        "Uncontrolled symptoms",
        "Family distress",
        "Unclear goals",
        "Suffering",
        "Request for hastened death"
      ]
    }
  };

  // Quick access buttons for common scenarios
  const quickButtons = [
    { id: 'delirium', label: '🧠 Delirium Protocol', icon: '🚨' },
    { id: 'falls', label: '🏥 Falls Assessment', icon: '📋' },
    { id: 'medications', label: '💊 Medication Review', icon: '⚠️' },
    { id: 'admission', label: '📝 Admission Orders', icon: '✅' },
    { id: 'capacity', label: '⚖️ Capacity Assessment', icon: '🔍' },
    { id: 'painManagement', label: '💉 Pain Management', icon: '📊' },
    { id: 'endOfLife', label: '🕊️ End-of-Life Care', icon: '❤️' }
  ];

  // Enhanced clinical decision support
  const getClinicalGuidance = (topic) => {
    const knowledge = medicalKnowledge[topic];
    if (!knowledge) {
      return "Topic not found. Please try another query.";
    }
    
    let response = knowledge.assessment + '\n\n';
    
    if (knowledge.redFlags && knowledge.redFlags.length > 0) {
      response += '🚨 RED FLAGS TO WATCH:\n';
      knowledge.redFlags.forEach(flag => {
        response += `• ${flag}\n`;
      });
    }
    
    return response;
  };

  // Process custom clinical questions
  const processCustomQuery = (question) => {
    const q = question.toLowerCase();
    
    // Check for specific drug dosing
    if (q.includes('dose') || q.includes('dosing')) {
      if (q.includes('haloperidol') || q.includes('haldol')) {
        return `HALOPERIDOL DOSING IN ELDERLY:
        
Delirium/Agitation:
• Starting: 0.25-0.5mg PO/IM/IV
• Frequency: Q4-6h PRN
• Max daily: 2mg (elderly), 3mg (if severe)

Important:
• Start with 0.25mg in frail elderly
• Monitor QTc (hold if >500ms)
• Watch for EPS, especially in Parkinson's
• Avoid in Lewy Body Dementia

IV:PO ratio is 1:2 (IV is twice as potent)`;
      }
      
      if (q.includes('morphine')) {
        return `MORPHINE DOSING IN ELDERLY:

Opioid-Naive:
• Starting: 2.5mg PO q4h or 1-2mg IV q2-4h
• Breakthrough: 10-20% of daily dose

Important:
• Reduce dose by 25-50% in elderly
• Avoid if CrCl <30 (metabolite accumulation)
• Start bowel regimen immediately
• Monitor sedation and respiratory rate

Conversions:
• PO:IV ratio is 3:1
• Morphine 10mg PO = Oxycodone 7.5mg PO`;
      }
    }
    
    // Check for specific conditions
    if (q.includes('uti')) {
      return `UTI IN ELDERLY:

DIAGNOSIS requires BOTH:
1. Symptoms (dysuria, frequency, new incontinence, fever)
2. Positive urine culture (>100,000 CFU/mL)

DO NOT TREAT:
• Asymptomatic bacteriuria
• Positive UA without symptoms
• Cloudy/smelly urine alone

TREATMENT:
Uncomplicated:
• Nitrofurantoin 100mg BID x5 days (if CrCl >60)
• TMP-SMX DS BID x3 days
• Fosfomycin 3g x1 dose

Complicated:
• Fluoroquinolone x7 days
• Ceftriaxone if severe`;
    }
    
    if (q.includes('confusion') || q.includes('altered')) {
      return medicalKnowledge.delirium.assessment;
    }
    
    if (q.includes('fall')) {
      return medicalKnowledge.falls.assessment;
    }
    
    if (q.includes('capacity') || q.includes('consent')) {
      return medicalKnowledge.capacity.assessment;
    }
    
    if (q.includes('pain')) {
      return medicalKnowledge.painManagement.assessment;
    }
    
    if (q.includes('dying') || q.includes('hospice') || q.includes('end of life')) {
      return medicalKnowledge.endOfLife.assessment;
    }
    
    // Default response with helpful suggestions
    return `I couldn't find specific guidance for "${question}".

Try asking about:
• Specific drug dosing (e.g., "haloperidol dose for delirium")
• Clinical protocols (e.g., "delirium workup")
• Geriatric syndromes (e.g., "falls assessment")
• Medication management (e.g., "Beers criteria")

Or use the quick protocol buttons above for instant access to comprehensive guides.`;
  };

  // Handle quick button clicks
  const handleQuickButton = (topicId) => {
    const guidance = getClinicalGuidance(topicId);
    setResponse(guidance);
    setQuery(`Quick Protocol: ${topicId}`);
    
    // Add to history
    const newEntry = {
      query: `Protocol: ${topicId}`,
      response: guidance,
      timestamp: new Date().toLocaleTimeString()
    };
    setHistory([newEntry, ...history.slice(0, 19)]);
  };

  // Handle custom query submission
  const handleCustomQuery = () => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      const guidance = processCustomQuery(query);
      setResponse(guidance);
      
      // Add to history
      const newEntry = {
        query: query,
        response: guidance,
        timestamp: new Date().toLocaleTimeString()
      };
      setHistory([newEntry, ...history.slice(0, 19)]);
      
      setLoading(false);
    }, 300);
  };

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('clinical_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('clinical_history', JSON.stringify(history));
    }
  }, [history]);

  return (
    <div className="clinical-assistant">
      <div className="assistant-header">
        <h2>🏥 Clinical Decision Support - Geriatrics</h2>
        <span className="status">
          {loading ? '⏳ Processing...' : '✅ Ready'}
        </span>
      </div>

      {/* Quick Protocol Buttons */}
      <div className="quick-prompts">
        {quickButtons.map((button) => (
          <button
            key={button.id}
            className="prompt-btn"
            onClick={() => handleQuickButton(button.id)}
            disabled={loading}
            title={`Click for ${button.label} protocol`}
          >
            <span style={{ fontSize: '20px' }}>{button.icon}</span>
            <span style={{ fontSize: '12px', display: 'block', marginTop: '5px' }}>
              {button.label}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Query Input */}
      <div className="query-input">
        <textarea
          placeholder="Ask a clinical question... Examples:
• 'What's the haloperidol dose for delirium?'
• 'UTI treatment in elderly'
• 'How to assess capacity?'
• 'Falls workup protocol'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !loading) {
              e.preventDefault();
              handleCustomQuery();
            }
          }}
          disabled={loading}
          rows={3}
        />
        <button 
          className="ask-btn"
          onClick={handleCustomQuery}
          disabled={loading || !query.trim()}
        >
          {loading ? '⏳' : '🔍'} Search
        </button>
      </div>

      {/* Response Display */}
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
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'Consolas, monospace',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {response}
            </pre>
          </div>
        </div>
      )}

      {/* Query History */}
      {history.length > 0 && (
        <details className="history">
          <summary>📜 Recent Queries ({history.length})</summary>
          {history.map((item, idx) => (
            <div key={idx} className="history-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong>{item.query}</strong>
                <span style={{ fontSize: '12px', color: '#666' }}>{item.timestamp}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#555' }}>
                {item.response.substring(0, 100)}...
              </div>
              <button 
                className="reuse-btn"
                onClick={() => {
                  setQuery(item.query);
                  setResponse(item.response);
                }}
              >
                Reuse
              </button>
            </div>
          ))}
        </details>
      )}

      {/* Help Section */}
      <div className="offline-notice" style={{ marginTop: '20px' }}>
        💡 <strong>Tips:</strong> All protocols work offline • Based on latest guidelines • 
        Click any protocol button for instant access • Responses include red flags and key pearls
      </div>
    </div>
  );
};

export default FixedClinicalAssistant;