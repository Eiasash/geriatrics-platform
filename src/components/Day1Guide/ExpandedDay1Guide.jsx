// MASSIVE Day 1 Fellowship Survival Guide
import React, { useState } from 'react';

const ExpandedDay1Guide = () => {
  const [activeSection, setActiveSection] = useState('survival');

  const survivalGuide = {
    // ULTIMATE TIMELINE
    timeline: {
      "5:30": "⏰ Wake up - Coffee, review patient list",
      "5:45": "📋 Check overnight events on EMR",
      "6:00": "🚗 Leave home (traffic to Shaare Zedek)",
      "6:15": "☕ Aroma Espresso Bar - get coffee + pastry",
      "6:30": "🏥 Arrive hospital - park in staff lot",
      "6:45": "💻 Log into EMR, print patient list",
      "7:00": "👥 Meet fellow residents, get updates",
      "7:15": "📝 Pre-round: Check labs, vitals, nursing notes",
      "7:30": "🏢 Seminar room - 6th floor Feldman corridor",
      "7:45": "☕ Quick coffee with attendings",
      "8:00": "📊 Morning meeting with Dr. Feldman",
      "8:15": "📋 Present overnight events, new admissions",
      "8:30": "👩‍⚕️ Nursing report on each patient",
      "9:00": "🚶‍♂️ Rounds start - YOU'RE PRESENTING FIRST",
      "9:15": "🗣️ Present Patient #1 - be ready!",
      "9:30": "👂 Listen to plan, write everything down",
      "10:00": "📝 Continue rounds, take detailed notes",
      "10:30": "🏃‍♂️ Check on urgent patient issues",
      "11:00": "📞 Call consults, order studies",
      "11:30": "👨‍👩‍👧‍👦 Update families on patient status",
      "12:00": "🍽️ Lunch break (if you're lucky)",
      "12:30": "📱 Check messages, return calls",
      "13:00": "🚨 Usually admission from ER arrives",
      "13:30": "📋 Complete admission H&P, orders",
      "14:00": "📚 Interesting cases meeting",
      "14:30": "🎯 Discuss complex patients",
      "15:00": "📝 Finish admission workup",
      "15:30": "📊 Review afternoon labs",
      "16:00": "🚶‍♂️ Afternoon rounds begin",
      "16:30": "📞 Call families with updates",
      "17:00": "📋 Update patient notes",
      "17:30": "👩‍⚕️ Sign out to night team",
      "18:00": "🏠 Home (hopefully)",
      "18:30": "📚 Read for tomorrow's cases",
      "19:00": "🍽️ Dinner (finally)"
    },

    // WHAT TO KNOW COLD
    mustKnowCold: {
      "CAM Criteria (MEMORIZE!)": [
        "1. ACUTE onset + FLUCTUATING course",
        "2. INATTENTION (serial 7s: 100,93,86,79,72...)",
        "3. DISORGANIZED thinking (rambling speech)",
        "4. ALTERED consciousness (hypervigilant/stuporous)",
        "POSITIVE = 1 AND 2 AND (3 OR 4)",
        "CRITICAL: Test attention with months backward!"
      ],
      
      "Fried Frailty (BOARD FAVORITE)": [
        "Need ≥3 criteria for FRAIL:",
        "1. Unintentional weight loss >4.5kg/year",
        "2. Self-reported exhaustion (≥3 days/week)",
        "3. Weakness: grip <20kg women, <30kg men",
        "4. Slow walking: >6-7 seconds for 4.5 meters",
        "5. Low activity: <383 kcal/week men, <270 women",
        "PEARLS: 25% of >85y are frail, predicts mortality"
      ],
      
      "Falls Protocol (ALWAYS ASKED)": [
        "Timed Up & Go >12 seconds = HIGH FALL RISK",
        "Orthostatics: WAIT 3 FULL MINUTES standing",
        "Positive = SBP drop >20 OR DBP drop >10",
        "Check: Vision + Hearing + Feet + Home",
        "Interventions: PT, med review, Vitamin D, safety",
        "PEARL: Previous fall = strongest predictor"
      ],
      
      "Geriatric Dosing (DON'T MESS UP!)": [
        "Haloperidol: 0.25-0.5mg (NOT 5mg!)",
        "Lorazepam: 0.25-0.5mg (AVOID if possible)",
        "Morphine: Start 1-2mg IV (NOT 4mg)",
        "Ramipril: Start 1.25mg daily",
        "Furosemide: IV:PO ratio 1:2",
        "RULE: Start low, go slow - but GO!"
      ],
      
      "Beers Criteria (HIGH YIELD)": [
        "ALWAYS AVOID in elderly:",
        "• Long-acting benzos (diazepam)",
        "• Tricyclics (amitriptyline)",
        "• Anticholinergics (diphenhydramine)",
        "• Muscle relaxants (cyclobenzaprine)",
        "• Sliding scale insulin ALONE",
        "• NSAIDs in CKD/CHF"
      ],
      
      "CHA₂DS₂-VASc (MEMORIZE SCORING)": [
        "C - CHF (1 point)",
        "H - HTN (1 point)",
        "A₂ - Age ≥75 (2 points)",
        "D - DM (1 point)",
        "S₂ - Stroke/TIA (2 points)",
        "V - Vascular disease (1 point)",
        "A - Age 65-74 (1 point)",
        "Sc - Sex female (1 point)",
        "MANAGEMENT: 0=no AC, 1=consider, ≥2=anticoagulate"
      ]
    },

    // ROUNDS PRESENTATION MASTERY
    roundsMastery: {
      template: "[AGE]yo [M/F], Day [#], admitted for [DIAGNOSIS], overnight [STATUS], plan [ACTION]",
      
      perfectExample: "87-year-old female, Day 3, admitted for UTI with delirium, stable overnight with clearing confusion, plan: complete antibiotics course, PT evaluation for discharge",
      
      systemsReview: {
        neuro: "A&Ox3, no focal deficits, improving confusion",
        cardio: "Regular rate and rhythm, no murmur, no edema",
        pulm: "Clear to auscultation bilaterally, O2 sat 96% RA",
        gi: "Positive bowel sounds, tolerating regular diet",
        gu: "Foley discontinued yesterday, voiding independently",
        id: "Afebrile x24 hours, WBC trending down",
        endo: "Blood glucose well controlled on sliding scale",
        heme: "Hemoglobin stable at 11.2, no bleeding",
        skin: "No pressure areas, Braden score 16",
        function: "Ambulating with walker, PT following",
        social: "Lives with daughter, good support system"
      },
      
      keyPhrases: {
        stable: "Hemodynamically stable, clinically improving",
        unstable: "Hemodynamically unstable, may need higher level of care",
        ready: "Medically stable for discharge pending PT clearance",
        complex: "Multiple active issues requiring ongoing inpatient management",
        comfort: "Transitioning to comfort care measures",
        family: "Family meeting planned to discuss goals of care"
      },
      
      survivalTips: [
        "ALWAYS have patient list printed and updated",
        "Know overnight events BEFORE rounds start",
        "Have vital signs and latest labs memorized",
        "Start with chief complaint, not entire medical history",
        "Be specific with plans: 'PT eval for discharge' not 'continue care'",
        "If you don't know something, say 'I'll check and report back'",
        "Write down EVERY instruction - you won't remember",
        "Never guess medication doses - always look up",
        "Anticipate questions: 'Why is creatinine up?'"
      ]
    },

    // HEBREW SURVIVAL PHRASES
    hebrewSurvival: {
      emergency: {
        "Call a doctor": "תקראו לרופא!",
        "Emergency": "חירום!",
        "I need help": "אני צריך עזרה",
        "What happened?": "מה קרה?",
        "Are you okay?": "אתה בסדר?",
        "Don't move": "אל תזוז",
        "Call family": "תתקשר למשפחה"
      },
      
      assessment: {
        "How do you feel?": "איך אתה מרגיש?",
        "Does this hurt?": "זה כואב?",
        "Show me where": "תראה לי איפה",
        "When did it start?": "מתי זה התחיל?",
        "Is it getting worse?": "זה מחמיר?",
        "Any allergies?": "יש אלרגיות?",
        "What medications?": "אילו תרופות?",
        "Take deep breath": "נשום עמוק",
        "Follow my finger": "עקוב אחרי האצבע",
        "Squeeze my hands": "לחץ את הידיים"
      },
      
      procedures: {
        "I need to examine you": "אני צריך לבדוק אותך",
        "This won't hurt": "זה לא יכאב",
        "Almost finished": "כמעט סיימנו",
        "Blood test": "בדיקת דם",
        "X-ray": "צילום רנטגן",
        "Injection": "זריקה",
        "Medicine": "תרופה",
        "Operation": "ניתוח"
      },
      
      family: {
        "Are you family?": "אתם המשפחה?",
        "I'm the doctor": "אני הרופא",
        "Your father/mother": "אבא שלך/אמא שלך",
        "Condition is stable": "המצב יציב",
        "Getting better": "משתפר",
        "Need more tests": "צריך עוד בדיקות",
        "Can go home": "יכול ללכת הביתה",
        "Must stay": "חייב להישאר"
      },
      
      rounds: {
        "Good morning": "בוקר טוב",
        "How was the night?": "איך היה הלילה?",
        "Any problems?": "היו בעיות?",
        "Take this medicine": "קח את התרופה הזאת",
        "Three times daily": "שלוש פעמים ביום",
        "With food": "עם אוכל",
        "Before sleep": "לפני השינה",
        "I'll be back": "אני אחזור",
        "Call if problems": "תתקשר אם יש בעיות"
      }
    },

    // SHAARE ZEDEK SPECIFIC
    shaareZedekTips: {
      navigation: [
        "Main entrance: Herzog building",
        "Geriatrics: 6th floor, Feldman corridor",
        "Parking: Staff lot behind hospital",
        "Coffee: Level 1 near main entrance",
        "Pharmacy: Ground floor",
        "Lab: Ground floor, near radiology",
        "EMR: Use hospital computers, VPN from home",
        "Cafeteria: Level 2, kosher food"
      ],
      
      people: [
        "Dr. Feldman: Department head, knows everything",
        "Head nurse: Your best friend - learn her name!",
        "Social worker: Call early for discharge planning",
        "Pharmacist: For drug interactions",
        "PT/OT: Essential for discharge",
        "Security: For difficult patients",
        "IT: For computer/EMR problems"
      ],
      
      culture: [
        "Hebrew + English environment",
        "Religious considerations important",
        "Shabbat preparations Friday",
        "Family involvement high",
        "Respect for elderly paramount",
        "Kosher dietary laws observed",
        "Prayer times accommodated"
      ]
    },

    // PANIC PROTOCOLS
    panicProtocols: {
      "Acute Confusion": {
        immediate: [
          "1. Check vitals including O2 sat and glucose",
          "2. CAM assessment (acute + inattention + (disorganized OR altered))",
          "3. Medication review - STOP anticholinergics/benzos",
          "4. Order STAT: UA, CBC, BMP, ECG",
          "5. Call senior if CAM positive",
          "6. Non-pharm: reorient, family, glasses/hearing aids"
        ],
        remember: "UTI is #1 cause, medications #2 cause",
        dosing: "Haldol 0.25-0.5mg if severe agitation ONLY"
      },
      
      "Fall with Injury": {
        immediate: [
          "1. Don't move patient until assessed",
          "2. Check consciousness, orientation",
          "3. Neurologic exam if head involved",
          "4. Check anticoagulation status",
          "5. Orthostatic vitals when safe",
          "6. Order: CT head if anticoag + any head trauma",
          "7. Hip X-ray if pain/deformity"
        ],
        remember: "Even minor head trauma needs CT if on anticoagulation",
        workup: "Always get ECG to rule out arrhythmia as cause"
      },
      
      "Chest Pain": {
        immediate: [
          "1. O2 if sat <94%",
          "2. ECG within 10 minutes",
          "3. IV access, cardiac monitor",
          "4. Troponin, CBC, BMP, PT/INR",
          "5. CXR portable",
          "6. Aspirin 325mg unless contraindicated",
          "7. Call cardiology if STEMI"
        ],
        remember: "Elderly often have atypical presentation",
        differentials: "PE, aortic dissection, pneumonia"
      },
      
      "Severe Hypotension": {
        immediate: [
          "1. Large bore IV x2",
          "2. Normal saline 250-500cc bolus (CAREFUL in elderly)",
          "3. Cardiac monitor, O2",
          "4. Blood cultures x2, lactate",
          "5. CBC, BMP, ABG",
          "6. Consider pressors if no response",
          "7. Look for source of bleeding"
        ],
        remember: "Elderly don't tolerate large fluid boluses well",
        sepsis: "qSOFA: AMS + SBP<100 + RR≥22"
      },
      
      "Acute Dyspnea": {
        immediate: [
          "1. ABC assessment, O2 if needed",
          "2. Position upright",
          "3. CXR portable STAT",
          "4. BNP, troponin, ABG if severe",
          "5. ECG for arrhythmia/ischemia",
          "6. Consider furosemide 40mg IV if CHF",
          "7. CTPA if PE suspected"
        ],
        remember: "CHF exacerbation most common in elderly",
        criteria: "Wells score for PE probability"
      }
    },

    // COMMON MISTAKES TO AVOID
    avoidMistakes: [
      "Never guess drug doses - always look up geriatric dosing",
      "Don't order tests without clear indication or plan",
      "Always check allergies before prescribing ANYTHING",
      "Never ignore nursing concerns - they know patients best",
      "Don't start multiple new medications simultaneously",
      "Always check baseline function before declaring improvement",
      "Never assume confusion = dementia (rule out delirium first)",
      "Don't give normal adult doses to frail elderly",
      "Always consider polypharmacy as cause of any symptom",
      "Never discharge without clear follow-up plan"
    ],

    // EFFICIENCY TIPS
    efficiencyHacks: [
      "Pre-round starting 7:00 AM - check everything",
      "Use EMR shortcuts: Ctrl+C for copy, F3 for search",
      "Template your admission notes the night before",
      "Keep protein bars in your pocket (you won't have time to eat)",
      "Make friends with nurses - they'll teach you everything",
      "Learn pharmacy extension by heart for drug questions",
      "Use voice recorder for dictation when walking",
      "Set phone reminders for time-sensitive tasks",
      "Keep patient stickers on clipboard for quick access",
      "Use abbreviations but spell out critical information"
    ],

    // SHAARE ZEDEK INSIDER KNOWLEDGE
    insiderTips: [
      "Best coffee: Aroma on level 1 near main entrance",
      "Quiet call room: 7th floor east wing if you need to think",
      "Printer near nursing station on 6 - always has paper",
      "EMR tips: F2 for patient search, F5 for refresh",
      "Parking secret: Arrive before 7 AM for close spots",
      "Lunch secret: Cafeteria has best food 12:30-13:30",
      "Wi-Fi password: Ask IT, changes monthly",
      "After hours: Use main entrance, security will let you in",
      "Equipment room: Key from head nurse",
      "Emergency contact: Extension 2222 for any crisis"
    ],

    // KUPOT CHOLIM CHEAT SHEET
    kupotCholim: {
      "Clalit": {
        coverage: "52% of population",
        programs: {
          basic: "כללית רגילה - Basic coverage",
          plus: "כללית מושלם - Enhanced ambulatory",
          gold: "כללית זהב - Premium with private"
        },
        geriatrics: [
          "Comprehensive geriatric assessments",
          "Memory clinics in major cities",
          "Home visits for housebound",
          "Chronic disease management programs"
        ],
        tips: [
          "Largest network, longest waits",
          "Good chronic disease management",
          "Home visits available",
          "Strong preventive care"
        ]
      },
      
      "Maccabi": {
        coverage: "26% of population",
        programs: {
          basic: "מכבי רגילה - Basic",
          plus: "מכבי שלי - Enhanced",
          gold: "מכבי זהב - Premium"
        },
        advantages: [
          "Shorter wait times",
          "Good digital services",
          "Excellent specialists",
          "Modern facilities"
        ]
      },
      
      "Meuhedet": {
        coverage: "14% of population",
        reputation: "Premium service, shorter waits",
        advantages: [
          "Excellent customer service",
          "Modern technology",
          "Good specialist access",
          "Personalized care"
        ]
      },
      
      "Leumit": {
        coverage: "8% of population",
        advantages: [
          "Shortest wait times",
          "Excellent service",
          "Good for specialists",
          "Small but efficient"
        ]
      }
    },

    // BITUACH LEUMI BENEFITS
    bituachLeumiGuide: {
      longTermCare: {
        name: "גמלת סיעוד - Long-term Care Benefit",
        eligibility: [
          "Age 67+ OR",
          "Younger with 40%+ disability",
          "Must be Israeli resident",
          "ADL assessment by nurse"
        ],
        services: [
          "Up to 18 hours/week home care",
          "Day care center attendance",
          "Laundry service",
          "Personal alarm system",
          "Adult diapers/absorbent products",
          "Transportation to medical appointments"
        ],
        application: "Apply at Bituach Leumi office with medical reports"
      },
      
      disability: {
        medical: "נכות רפואית - based on medical condition",
        general: "נכות כללית - affects work capacity",
        levels: [
          "25-39%: Partial benefits",
          "40-67%: Significant benefits",
          "68-100%: Full benefits including mobility"
        ],
        process: [
          "Apply with extensive medical documentation",
          "Medical committee review",
          "Functional assessment",
          "Appeal process available"
        ]
      },
      
      mobility: {
        name: "נכות ניידות - Mobility Allowance",
        benefits: [
          "Standing loan up to 180,000₪ for car",
          "Monthly allowance 1,000-3,000₪",
          "Fuel vouchers",
          "Tax exemptions",
          "Free parking permit (תג נכה)",
          "Vehicle modifications covered"
        ],
        eligibility: "40%+ mobility limitation"
      }
    }
  };

  // Additional survival content
  const additionalContent = {
    // COMMON CONSULTS
    consults: {
      cardiology: {
        when: "Chest pain, new murmur, arrhythmia, CHF",
        prepare: "ECG, echo if available, medications list",
        questions: "Specific question, timeline needed"
      },
      psychiatry: {
        when: "Capacity questions, severe depression, psychosis",
        prepare: "Mental status exam, medication history",
        urgent: "Suicidal ideation, severe agitation"
      },
      PT_OT: {
        when: "Functional decline, discharge planning",
        prepare: "Baseline function, current mobility, home situation",
        key: "Essential for safe discharge"
      },
      social: {
        when: "Discharge planning, abuse concerns, placement",
        prepare: "Social history, support system, insurance",
        early: "Call on admission if complex social situation"
      }
    },

    // COMMON ORDERS
    commonOrders: {
      admission: [
        "Admit to Geriatrics service, Dr. [Attending]",
        "Vital signs q4h",
        "I&O if CHF or AKI",
        "Daily weights if CHF",
        "Fall precautions",
        "Activity: Up with assistance",
        "Diet: Regular, assist with setup",
        "DVT prophylaxis: Enoxaparin 40mg SC daily",
        "GI prophylaxis: Only if high risk"
      ],
      
      labs: [
        "CBC, BMP, LFTs tomorrow AM",
        "UA if altered mental status",
        "PT/INR if on warfarin",
        "TSH if not checked in 6 months",
        "B12 if cognitive concerns",
        "Fasting lipids if indicated"
      ],
      
      imaging: [
        "CXR if respiratory symptoms",
        "CT head if: trauma + anticoag, focal neuro",
        "Echo if new murmur or CHF",
        "Ultrasound if leg swelling"
      ]
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px' }}>
      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {[
          { id: 'survival', label: '🆘 SURVIVAL', color: '#dc3545' },
          { id: 'timeline', label: '⏰ TIMELINE', color: '#007bff' },
          { id: 'protocols', label: '🚨 PANIC', color: '#dc3545' },
          { id: 'rounds', label: '🗣️ ROUNDS', color: '#28a745' },
          { id: 'hebrew', label: '🇮🇱 HEBREW', color: '#17a2b8' },
          { id: 'hospital', label: '🏥 HOSPITAL', color: '#6f42c1' },
          { id: 'benefits', label: '💰 BENEFITS', color: '#fd7e14' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: activeSection === tab.id ? tab.color : '#f8f9fa',
              color: activeSection === tab.id ? 'white' : '#333',
              transition: 'all 0.3s',
              fontSize: '14px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        {activeSection === 'survival' && (
          <div>
            <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>🆘 ULTIMATE SURVIVAL GUIDE</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#667eea' }}>🧠 Must Know COLD (Will Be Asked)</h3>
              {Object.entries(survivalGuide.mustKnowCold).map(([title, items]) => (
                <div key={title} style={{ 
                  marginBottom: '20px',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <h4 style={{ color: '#333', marginBottom: '10px' }}>{title}</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '5px', lineHeight: '1.5' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#dc3545' }}>❌ CRITICAL MISTAKES TO AVOID</h3>
              <div style={{ background: '#fff5f5', padding: '20px', borderRadius: '8px', border: '2px solid #fecaca' }}>
                {survivalGuide.avoidMistakes.map((mistake, idx) => (
                  <div key={idx} style={{ marginBottom: '10px', padding: '5px 0', borderBottom: '1px solid #fecaca' }}>
                    <strong style={{ color: '#dc3545' }}>• {mistake}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ color: '#28a745' }}>⚡ EFFICIENCY HACKS</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                {survivalGuide.efficiencyHacks.map((tip, idx) => (
                  <div key={idx} style={{
                    padding: '15px',
                    background: '#f0f8ff',
                    borderRadius: '8px',
                    borderLeft: '4px solid #28a745'
                  }}>
                    💡 {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'timeline' && (
          <div>
            <h2 style={{ color: '#007bff', marginBottom: '20px' }}>⏰ FELLOWSHIP DAY TIMELINE</h2>
            <div style={{ position: 'relative', paddingLeft: '30px' }}>
              <div style={{
                position: 'absolute',
                left: '10px',
                top: '10px',
                bottom: '10px',
                width: '3px',
                background: 'linear-gradient(to bottom, #007bff, #667eea)'
              }}></div>
              
              {Object.entries(survivalGuide.timeline).map(([time, task], idx) => (
                <div key={time} style={{
                  position: 'relative',
                  marginBottom: '20px',
                  padding: '15px',
                  background: idx % 2 === 0 ? '#f8f9fa' : '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-24px',
                    width: '16px',
                    height: '16px',
                    background: '#007bff',
                    borderRadius: '50%',
                    border: '3px solid white',
                    boxShadow: '0 0 0 3px #cce5ff'
                  }}></div>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: '#007bff',
                    fontSize: '18px',
                    marginBottom: '5px'
                  }}>
                    {time}
                  </div>
                  <div style={{ fontSize: '16px' }}>{task}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'protocols' && (
          <div>
            <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>🚨 PANIC PROTOCOLS</h2>
            {Object.entries(survivalGuide.panicProtocols).map(([situation, protocol]) => (
              <div key={situation} style={{
                marginBottom: '30px',
                padding: '20px',
                background: '#fff5f5',
                borderRadius: '12px',
                border: '2px solid #dc3545'
              }}>
                <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>{situation}</h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#333', marginBottom: '10px' }}>🔥 IMMEDIATE ACTIONS:</h4>
                  <ol style={{ margin: 0, paddingLeft: '20px' }}>
                    {protocol.immediate.map((action, idx) => (
                      <li key={idx} style={{ 
                        marginBottom: '8px',
                        fontWeight: idx === 0 ? 'bold' : 'normal',
                        color: idx === 0 ? '#dc3545' : '#333'
                      }}>
                        {action}
                      </li>
                    ))}
                  </ol>
                </div>

                <div style={{
                  padding: '15px',
                  background: '#fff3cd',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}>
                  <strong style={{ color: '#856404' }}>🧠 REMEMBER: </strong>
                  {protocol.remember}
                </div>

                {protocol.dosing && (
                  <div style={{
                    padding: '15px',
                    background: '#d1ecf1',
                    borderRadius: '8px'
                  }}>
                    <strong style={{ color: '#0c5460' }}>💊 DOSING: </strong>
                    {protocol.dosing}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeSection === 'rounds' && (
          <div>
            <h2 style={{ color: '#28a745', marginBottom: '20px' }}>🗣️ ROUNDS PRESENTATION MASTERY</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#667eea' }}>📝 Perfect Template</h3>
              <div style={{
                padding: '20px',
                background: '#e8f5e8',
                borderRadius: '8px',
                borderLeft: '4px solid #28a745',
                fontFamily: 'monospace',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                {survivalGuide.roundsMastery.template}
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#667eea' }}>💎 Perfect Example</h3>
              <div style={{
                padding: '20px',
                background: '#f0f8ff',
                borderRadius: '8px',
                borderLeft: '4px solid #007bff',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                "{survivalGuide.roundsMastery.perfectExample}"
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#667eea' }}>🏥 Systems Review Template</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                {Object.entries(survivalGuide.roundsMastery.systemsReview).map(([system, description]) => (
                  <div key={system} style={{
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    borderLeft: '3px solid #667eea'
                  }}>
                    <strong style={{ color: '#667eea', textTransform: 'uppercase' }}>{system}: </strong>
                    {description}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ color: '#dc3545' }}>⚡ SURVIVAL TIPS FOR ROUNDS</h3>
              <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px' }}>
                {survivalGuide.roundsMastery.survivalTips.map((tip, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: '10px',
                    padding: '8px',
                    background: idx % 2 === 0 ? 'rgba(255,255,255,0.5)' : 'transparent',
                    borderRadius: '4px'
                  }}>
                    <strong style={{ color: '#856404' }}>#{idx + 1}:</strong> {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hebrew Section with comprehensive phrases */}
        {activeSection === 'hebrew' && (
          <div>
            <h2 style={{ color: '#17a2b8', marginBottom: '20px' }}>🇮🇱 HEBREW MEDICAL PHRASES</h2>
            
            {Object.entries(survivalGuide.hebrewSurvival).map(([category, phrases]) => (
              <div key={category} style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#667eea',
                  marginBottom: '15px',
                  textTransform: 'capitalize',
                  fontSize: '20px'
                }}>
                  {category === 'emergency' ? '🚨' : 
                   category === 'assessment' ? '🩺' : 
                   category === 'procedures' ? '💉' : 
                   category === 'family' ? '👨‍👩‍👧‍👦' : '🏥'} {category.toUpperCase()}
                </h3>
                
                <div style={{ display: 'grid', gap: '10px' }}>
                  {Object.entries(phrases).map(([english, hebrew]) => (
                    <div key={english} style={{
                      padding: '15px',
                      background: category === 'emergency' ? '#fff5f5' : '#f8f9fa',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: category === 'emergency' ? '1px solid #fecaca' : '1px solid #e0e0e0'
                    }}>
                      <span style={{ fontWeight: '600', flex: 1 }}>{english}</span>
                      <span style={{ 
                        color: '#667eea',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        flex: 1,
                        textAlign: 'right',
                        direction: 'rtl'
                      }}>
                        {hebrew}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'benefits' && (
          <div>
            <h2 style={{ color: '#fd7e14', marginBottom: '20px' }}>💰 ISRAELI HEALTHCARE BENEFITS</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#667eea' }}>🏥 Kupot Cholim Comparison</h3>
              {Object.entries(survivalGuide.kupotCholim).map(([kupah, info]) => (
                <div key={kupah} style={{
                  marginBottom: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0'
                }}>
                  <h4 style={{ color: '#333', marginBottom: '15px' }}>
                    {kupah} - {info.coverage}
                  </h4>
                  
                  {info.programs && (
                    <div style={{ marginBottom: '15px' }}>
                      <strong>Programs:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {Object.entries(info.programs).map(([type, desc]) => (
                          <li key={type}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {info.advantages && (
                    <div>
                      <strong>Advantages:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {info.advantages.map((advantage, idx) => (
                          <li key={idx}>{advantage}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ color: '#667eea' }}>🏛️ Bituach Leumi Benefits Guide</h3>
              {Object.entries(survivalGuide.bituachLeumiGuide).map(([benefit, info]) => (
                <div key={benefit} style={{
                  marginBottom: '25px',
                  padding: '20px',
                  background: '#fff8e1',
                  borderRadius: '12px',
                  border: '2px solid #ffecb3'
                }}>
                  <h4 style={{ color: '#e65100', marginBottom: '15px' }}>
                    {info.name}
                  </h4>
                  
                  {info.eligibility && (
                    <div style={{ marginBottom: '15px' }}>
                      <strong>Eligibility:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {info.eligibility.map((criteria, idx) => (
                          <li key={idx}>{criteria}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {info.services && (
                    <div>
                      <strong>Services:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {info.services.map((service, idx) => (
                          <li key={idx}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {info.benefits && (
                    <div>
                      <strong>Benefits:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {info.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedDay1Guide;