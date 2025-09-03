// On-Call Survival Kit for Geriatrics
// Essential protocols, quick references, and emergency guidance for call shifts

import React, { useState, useEffect } from 'react';

export const OnCallSurvivalKit = () => {
  const [activeSection, setActiveSection] = useState('quick-reference');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  useEffect(() => {
    // Load bookmarks and recent items from localStorage
    const savedBookmarks = localStorage.getItem('onCallBookmarks');
    const savedRecent = localStorage.getItem('onCallRecent');
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    if (savedRecent) {
      setRecentlyUsed(JSON.parse(savedRecent));
    }
  }, []);

  const addBookmark = (item) => {
    const newBookmarks = [...bookmarks, { ...item, id: Date.now() }];
    setBookmarks(newBookmarks);
    localStorage.setItem('onCallBookmarks', JSON.stringify(newBookmarks));
  };

  const addToRecent = (item) => {
    const newRecent = [item, ...recentlyUsed.filter(r => r.title !== item.title)].slice(0, 10);
    setRecentlyUsed(newRecent);
    localStorage.setItem('onCallRecent', JSON.stringify(newRecent));
  };

  const sections = [
    { key: 'quick-reference', label: '🚨 Quick Reference', description: 'Most common on-call issues' },
    { key: 'emergency-protocols', label: '⚡ Emergency Protocols', description: 'Life-threatening situations' },
    { key: 'medications', label: '💊 Medication Guide', description: 'Dosing and interactions' },
    { key: 'procedures', label: '🏥 Common Procedures', description: 'Step-by-step guides' },
    { key: 'lab-values', label: '📊 Lab Interpretation', description: 'Normal ranges and alerts' },
    { key: 'contacts', label: '📞 Important Contacts', description: 'Phone numbers and escalation' },
    { key: 'documentation', label: '📝 Documentation Templates', description: 'Quick note templates' },
    { key: 'pearls', label: '💎 Clinical Pearls', description: 'Geriatric-specific tips' }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#dc3545', color: 'white', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center' }}>
          🚨 On-Call Survival Kit
        </h2>
        <p style={{ margin: '0', opacity: 0.9 }}>
          Essential protocols and quick references for geriatric call shifts
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <input
          type="text"
          placeholder="🔍 Search protocols, medications, procedures..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #dc3545',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Quick Access */}
      {!searchQuery && (
        <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {recentlyUsed.length > 0 && (
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>🕒 Recently Used</h4>
              {recentlyUsed.slice(0, 5).map((item, index) => (
                <div key={index} style={{ marginBottom: '5px', fontSize: '14px', color: '#667eea', cursor: 'pointer' }}
                     onClick={() => setActiveSection(item.section)}>
                  {item.title}
                </div>
              ))}
            </div>
          )}
          
          {bookmarks.length > 0 && (
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>⭐ Bookmarks</h4>
              {bookmarks.slice(0, 5).map((item, index) => (
                <div key={index} style={{ marginBottom: '5px', fontSize: '14px', color: '#667eea', cursor: 'pointer' }}
                     onClick={() => setActiveSection(item.section)}>
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {sections.map(section => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeSection === section.key ? '#dc3545' : '#f8f9fa',
              color: activeSection === section.key ? 'white' : '#dc3545',
              border: `2px solid ${activeSection === section.key ? '#dc3545' : '#e9ecef'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeSection === section.key ? 'bold' : 'normal'
            }}
            title={section.description}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeSection === 'quick-reference' && (
        <QuickReferenceSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
      {activeSection === 'emergency-protocols' && (
        <EmergencyProtocolsSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
      {activeSection === 'medications' && (
        <MedicationGuideSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
      {activeSection === 'procedures' && (
        <ProceduresSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
      {activeSection === 'lab-values' && (
        <LabValuesSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
      {activeSection === 'contacts' && (
        <ContactsSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
      {activeSection === 'documentation' && (
        <DocumentationSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
      {activeSection === 'pearls' && (
        <ClinicalPearlsSection onBookmark={addBookmark} onRecent={addToRecent} />
      )}
    </div>
  );
};

// Quick Reference Section
const QuickReferenceSection = ({ onBookmark, onRecent }) => {
  const quickProtocols = [
    {
      title: "Acute Confusion/Delirium",
      urgency: "high",
      steps: [
        "1. SAFETY: Check for fall risk, consider 1:1 sitter",
        "2. VITALS: Check O2 sat, BP, temp, glucose",
        "3. CAUSES: Infection (UTI, pneumonia), constipation, medications, pain",
        "4. WORKUP: CBC, BMP, UA, consider CXR",
        "5. AVOID: Restraints, sedatives unless absolutely necessary",
        "6. TREAT: Address underlying cause, optimize environment"
      ],
      notes: "Most common on-call issue in geriatrics. Always rule out UTI and medication toxicity."
    },
    {
      title: "Fall with Possible Injury",
      urgency: "high",
      steps: [
        "1. IMMEDIATE: Don't move patient, assess consciousness",
        "2. VITALS: Full set including orthostatics if stable",
        "3. EXAM: Neuro, head/neck, extremities, pelvis",
        "4. IMAGING: Consider CT head, C-spine, hip/pelvis X-ray",
        "5. LABS: If anticoagulated - CBC, PT/PTT",
        "6. PREVENT: Review fall risk, meds, environment"
      ],
      notes: "High risk for serious injury. Consider occult hip fracture even with normal exam."
    },
    {
      title: "Chest Pain in Elderly",
      urgency: "high",
      steps: [
        "1. ABC: Airway, breathing, circulation",
        "2. EKG: STAT 12-lead, compare to prior",
        "3. VITALS: Including pain scale, repeat frequently",
        "4. MEDS: ASA 325mg unless contraindicated",
        "5. LABS: Troponin, BNP, CBC, BMP",
        "6. CONSIDER: Atypical presentation (SOB, confusion, weakness)"
      ],
      notes: "Elderly often have atypical presentations. Silent MIs are common."
    },
    {
      title: "Shortness of Breath",
      urgency: "high",
      steps: [
        "1. POSITION: Sit upright, O2 if needed",
        "2. VITALS: Including O2 sat, repeat BP",
        "3. EXAM: Heart, lungs, extremities for edema",
        "4. EKG: Look for arrhythmia, ischemia",
        "5. LABS: BNP, troponin, ABG if severe",
        "6. CXR: Look for CHF, pneumonia, effusion"
      ],
      notes: "Consider CHF, pneumonia, PE, and COPD exacerbation."
    },
    {
      title: "Agitation/Behavioral Issues",
      urgency: "medium",
      steps: [
        "1. ASSESS: Delirium screen (CAM), pain scale",
        "2. ENVIRONMENT: Quiet, well-lit, familiar faces",
        "3. NON-PHARM: Reorientation, music, family presence",
        "4. INVESTIGATE: Infection, constipation, urinary retention",
        "5. MEDS: Last resort - low-dose haloperidol 0.25-0.5mg",
        "6. AVOID: Benzodiazepines (increase fall risk, confusion)"
      ],
      notes: "Always try non-pharmacological approaches first. Avoid restraints."
    },
    {
      title: "Hypotension",
      urgency: "medium",
      steps: [
        "1. POSITION: Trendelenburg if tolerated",
        "2. ACCESS: Large bore IV, fluid bolus 500mL NS",
        "3. CAUSES: Dehydration, sepsis, bleeding, medications",
        "4. LABS: CBC, BMP, lactate, blood cultures",
        "5. MEDS: Hold antihypertensives, consider vasopressors",
        "6. MONITOR: Urine output, mental status, repeat vitals"
      ],
      notes: "Be cautious with fluids in elderly - risk of CHF. Consider sepsis early."
    }
  ];

  const handleItemClick = (item) => {
    onRecent({
      title: item.title,
      section: 'quick-reference',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#dc3545', marginBottom: '10px' }}>🚨 Quick Reference Protocols</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Most common on-call scenarios with step-by-step management
        </p>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {quickProtocols.map((protocol, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: `3px solid ${protocol.urgency === 'high' ? '#dc3545' : '#ffc107'}`,
              cursor: 'pointer'
            }}
            onClick={() => handleItemClick(protocol)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h4 style={{ margin: '0', color: '#333', fontSize: '18px' }}>
                {protocol.title}
              </h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: protocol.urgency === 'high' ? '#dc3545' : '#ffc107',
                  color: 'white',
                  fontSize: '12px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}>
                  {protocol.urgency} PRIORITY
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark({
                      title: protocol.title,
                      section: 'quick-reference',
                      urgency: protocol.urgency
                    });
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ⭐ Bookmark
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#667eea' }}>Management Steps:</strong>
              <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
                {protocol.steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '5px', fontSize: '14px', lineHeight: '1.4' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '4px', border: '1px solid #b3d4fc' }}>
              <strong style={{ color: '#0056b3' }}>💡 Clinical Pearl:</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#0056b3' }}>
                {protocol.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Emergency Protocols Section
const EmergencyProtocolsSection = ({ onBookmark, onRecent }) => {
  const emergencies = [
    {
      title: "Cardiac Arrest",
      code: "CODE BLUE",
      steps: [
        "1. CALL CODE BLUE immediately",
        "2. START CPR: 30:2 compression to ventilation",
        "3. DEFIBRILLATOR: Attach pads, analyze rhythm",
        "4. MEDICATIONS: Epi 1mg IV q3-5min, consider amiodarone",
        "5. ADVANCED: Consider intubation, central access",
        "6. FAMILY: Notify and provide support"
      ],
      considerations: "Elderly have poor outcomes from CPR. Consider goals of care and code status."
    },
    {
      title: "Stroke/CVA",
      code: "STROKE ALERT",
      steps: [
        "1. CALL STROKE ALERT immediately",
        "2. TIME: Last known well time - critical for treatment",
        "3. VITALS: BP, glucose, O2 sat, temp",
        "4. EXAM: NIH Stroke Scale, pupils, speech",
        "5. CT HEAD: STAT without contrast",
        "6. LABS: CBC, BMP, PT/PTT, troponin"
      ],
      considerations: "Time is brain. tPA window is 4.5 hours from symptom onset."
    },
    {
      title: "GI Bleeding",
      code: "URGENT",
      steps: [
        "1. IV ACCESS: 2 large bore IVs",
        "2. FLUIDS: NS bolus, crossmatch 4 units",
        "3. LABS: CBC, BMP, PT/PTT, type & crossmatch",
        "4. NGT: Consider for upper GI bleeding",
        "5. MEDS: PPI drip, hold anticoagulants",
        "6. CONSULT: GI emergently, consider ICU"
      ],
      considerations: "Elderly tolerate blood loss poorly. Early aggressive management."
    },
    {
      title: "Sepsis/Septic Shock",
      code: "SEPSIS ALERT",
      steps: [
        "1. CULTURES: Blood x2, urine, sputum before antibiotics",
        "2. ANTIBIOTICS: Broad spectrum within 1 hour",
        "3. FLUIDS: 30mL/kg bolus (caution in CHF)",
        "4. VITALS: q15min, consider arterial line",
        "5. LACTATE: Serial levels, goal <2",
        "6. VASOPRESSORS: If hypotensive despite fluids"
      ],
      considerations: "Elderly may not mount fever. Confusion often first sign."
    },
    {
      title: "Respiratory Failure",
      code: "URGENT",
      steps: [
        "1. O2: High-flow, consider BiPAP/CPAP",
        "2. POSITION: Upright, consider intubation",
        "3. ABG: Assess oxygenation and ventilation",
        "4. CXR: Look for cause (CHF, pneumonia, PE)",
        "5. MEDS: Bronchodilators, steroids if COPD",
        "6. CONSULT: Pulmonology, consider ICU"
      ],
      considerations: "Non-invasive ventilation often preferred in elderly."
    },
    {
      title: "Hip Fracture",
      code: "ORTHOPEDIC URGENT",
      steps: [
        "1. IMMOBILIZE: Don't move, stabilize position",
        "2. PAIN: Adequate analgesia, consider nerve block",
        "3. IMAGING: Hip/pelvis X-ray, consider CT",
        "4. LABS: CBC, BMP, PT/PTT, type & screen",
        "5. CONSULT: Orthopedics urgently",
        "6. OPTIMIZE: Cardiac clearance, DVT prophylaxis"
      ],
      considerations: "Surgery within 24-48 hours improves outcomes. High mortality risk."
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#dc3545', marginBottom: '10px' }}>⚡ Emergency Protocols</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Life-threatening conditions requiring immediate intervention
        </p>
      </div>

      <div style={{ display: 'grid', gap: '25px' }}>
        {emergencies.map((emergency, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff5f5',
              padding: '25px',
              borderRadius: '8px',
              border: '3px solid #dc3545',
              boxShadow: '0 4px 8px rgba(220,53,69,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#dc3545', fontSize: '20px' }}>
                  🚨 {emergency.title}
                </h4>
                <span style={{
                  padding: '6px 12px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  fontSize: '14px',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>
                  {emergency.code}
                </span>
              </div>
              <button
                onClick={() => onBookmark({
                  title: emergency.title,
                  section: 'emergency-protocols',
                  code: emergency.code
                })}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ⭐ Bookmark
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong style={{ color: '#dc3545', fontSize: '16px' }}>⚡ IMMEDIATE ACTIONS:</strong>
              <ol style={{ margin: '10px 0', paddingLeft: '20px', fontSize: '15px', lineHeight: '1.6' }}>
                {emergency.steps.map((step, idx) => (
                  <li key={idx} style={{ 
                    marginBottom: '8px', 
                    padding: '5px',
                    backgroundColor: idx === 0 ? '#ffe6e6' : 'transparent',
                    borderRadius: '4px',
                    fontWeight: idx === 0 ? 'bold' : 'normal'
                  }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px', border: '1px solid #ffc107' }}>
              <strong style={{ color: '#856404' }}>⚠️ Geriatric Considerations:</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#856404' }}>
                {emergency.considerations}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Medication Guide Section
const MedicationGuideSection = ({ onBookmark, onRecent }) => {
  const [activeCategory, setActiveCategory] = useState('pain');

  const medicationCategories = {
    pain: {
      title: "💊 Pain Management",
      medications: [
        {
          name: "Acetaminophen",
          dose: "325-650mg PO q6h",
          maxDose: "3g/day in elderly",
          considerations: "Safest option. Reduce dose in hepatic impairment.",
          contraindications: "Severe hepatic disease, alcohol use disorder"
        },
        {
          name: "Ibuprofen",
          dose: "200-400mg PO q6-8h",
          maxDose: "1200mg/day in elderly",
          considerations: "Use lowest effective dose. Monitor renal function.",
          contraindications: "CKD, CHF, active GI bleeding, anticoagulants"
        },
        {
          name: "Tramadol",
          dose: "25-50mg PO q6h initially",
          maxDose: "300mg/day in >75 years",
          considerations: "Lower seizure threshold. Many drug interactions.",
          contraindications: "Seizure disorder, MAOIs, severe renal/hepatic disease"
        },
        {
          name: "Morphine",
          dose: "2.5-5mg PO q4h PRN",
          maxDose: "Start low, titrate slowly",
          considerations: "Reduce dose 50% in elderly. Monitor for delirium.",
          contraindications: "Severe respiratory depression, paralytic ileus"
        }
      ]
    },
    cardiac: {
      title: "❤️ Cardiac Medications",
      medications: [
        {
          name: "Metoprolol",
          dose: "12.5-25mg PO BID initially",
          maxDose: "Titrate by 25mg BID q3-7 days",
          considerations: "Monitor HR, BP. Can worsen depression.",
          contraindications: "Severe bradycardia, heart block, severe COPD"
        },
        {
          name: "Lisinopril",
          dose: "2.5-5mg PO daily initially",
          maxDose: "Titrate up to 20-40mg daily",
          considerations: "Monitor renal function, potassium. Cough common.",
          contraindications: "Pregnancy, bilateral renal artery stenosis, hyperkalemia"
        },
        {
          name: "Furosemide",
          dose: "20-40mg PO/IV daily",
          maxDose: "Titrate based on response",
          considerations: "Monitor electrolytes, renal function. Ototoxicity.",
          contraindications: "Severe hyponatremia, hypovolemia, allergy"
        },
        {
          name: "Digoxin",
          dose: "0.125mg PO daily",
          maxDose: "Rarely >0.25mg in elderly",
          considerations: "Very narrow therapeutic window. Monitor levels.",
          contraindications: "Heart block, hypokalemia, hypomagnesemia"
        }
      ]
    },
    psychiatric: {
      title: "🧠 Psychiatric Medications",
      medications: [
        {
          name: "Haloperidol",
          dose: "0.25-0.5mg PO/IV BID",
          maxDose: "2mg/day in elderly",
          considerations: "Risk of EPS, QT prolongation. Use sparingly.",
          contraindications: "Parkinson's disease, Lewy body dementia, QT prolongation"
        },
        {
          name: "Quetiapine",
          dose: "12.5-25mg PO BID",
          maxDose: "Start low, titrate slowly",
          considerations: "Less EPS than haloperidol. Sedating.",
          contraindications: "Severe cardiac disease, dementia (black box warning)"
        },
        {
          name: "Trazodone",
          dose: "25-50mg PO HS",
          maxDose: "100mg for sleep",
          considerations: "Good for sleep, depression. Orthostatic hypotension.",
          contraindications: "Recent MI, MAOIs, priapism history"
        },
        {
          name: "Lorazepam",
          dose: "0.25-0.5mg PO/IV q6h PRN",
          maxDose: "Avoid if possible",
          considerations: "Beers criteria - avoid in elderly. Fall risk.",
          contraindications: "Severe respiratory depression, sleep apnea"
        }
      ]
    },
    antibiotics: {
      title: "🦠 Antibiotics",
      medications: [
        {
          name: "Ceftriaxone",
          dose: "1-2g IV daily",
          maxDose: "2g daily",
          considerations: "Good CNS penetration. Adjust in severe renal disease.",
          contraindications: "Severe penicillin allergy, neonates with hyperbilirubinemia"
        },
        {
          name: "Levofloxacin",
          dose: "500mg PO/IV daily",
          maxDose: "Reduce to 250mg if CrCl <50",
          considerations: "QT prolongation, tendon rupture, C. diff risk.",
          contraindications: "Myasthenia gravis, tendon disorders"
        },
        {
          name: "Vancomycin",
          dose: "15-20mg/kg IV q8-12h",
          maxDose: "Dose by levels, not weight",
          considerations: "Nephrotoxic, ototoxic. Monitor levels.",
          contraindications: "Previous severe reaction"
        },
        {
          name: "Nitrofurantoin",
          dose: "50-100mg PO QID x 7 days",
          maxDose: "Avoid if CrCl <30",
          considerations: "UTI only. Pulmonary toxicity with long-term use.",
          contraindications: "CKD, pregnancy at term, G6PD deficiency"
        }
      ]
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#dc3545', marginBottom: '10px' }}>💊 Medication Quick Reference</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Dosing, considerations, and contraindications for elderly patients
        </p>
      </div>

      {/* Category Buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {Object.entries(medicationCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            style={{
              padding: '10px 16px',
              backgroundColor: activeCategory === key ? '#667eea' : '#f8f9fa',
              color: activeCategory === key ? 'white' : '#667eea',
              border: `2px solid ${activeCategory === key ? '#667eea' : '#e9ecef'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Medications Display */}
      <div style={{ display: 'grid', gap: '20px' }}>
        <h4 style={{ color: '#667eea', margin: '0', fontSize: '18px' }}>
          {medicationCategories[activeCategory].title}
        </h4>
        
        {medicationCategories[activeCategory].medications.map((med, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h5 style={{ margin: '0', color: '#333', fontSize: '18px' }}>
                {med.name}
              </h5>
              <button
                onClick={() => onBookmark({
                  title: med.name,
                  section: 'medications',
                  category: activeCategory
                })}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ⭐ Bookmark
              </button>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <strong style={{ color: '#28a745' }}>💊 Typical Dose:</strong>
                <span style={{ marginLeft: '10px', fontSize: '14px' }}>{med.dose}</span>
              </div>
              
              <div>
                <strong style={{ color: '#ffc107' }}>⚠️ Maximum/Elderly:</strong>
                <span style={{ marginLeft: '10px', fontSize: '14px' }}>{med.maxDose}</span>
              </div>
              
              <div>
                <strong style={{ color: '#17a2b8' }}>📝 Considerations:</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', lineHeight: '1.4' }}>
                  {med.considerations}
                </p>
              </div>
              
              <div style={{ padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px', border: '1px solid #f5c6cb' }}>
                <strong style={{ color: '#721c24' }}>🚫 Contraindications:</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#721c24' }}>
                  {med.contraindications}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Placeholder sections for other components
const ProceduresSection = () => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h3>🏥 Common Procedures</h3>
    <p>Procedure guides - coming soon</p>
  </div>
);

const LabValuesSection = () => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h3>📊 Lab Values</h3>
    <p>Lab interpretation - coming soon</p>
  </div>
);

const ContactsSection = () => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h3>📞 Important Contacts</h3>
    <p>Contact directory - coming soon</p>
  </div>
);

const DocumentationSection = () => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h3>📝 Documentation</h3>
    <p>Note templates - coming soon</p>
  </div>
);

const ClinicalPearlsSection = () => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h3>💎 Clinical Pearls</h3>
    <p>Geriatric pearls - coming soon</p>
  </div>
);

export default OnCallSurvivalKit;