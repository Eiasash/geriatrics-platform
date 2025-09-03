// src/components/Day1Guide/Day1Guide.jsx
import React, { useState } from 'react';
import '../styles/modern-design.css';

const Day1Guide = () => {
  const [activeSection, setActiveSection] = useState('timeline');
  
  const timeline = {
    "6:00": "Wake up - Review PANIC protocols",
    "6:30": "Leave home - Traffic to Shaare Zedek", 
    "7:00": "Arrive - Park in staff lot, grab coffee",
    "7:30": "Seminar room - 6th floor Feldman corridor",
    "8:00": "Morning meeting with Dr. Feldman",
    "9:00": "Rounds start - You're presenting first",
    "10:30": "Continue rounds - Take notes!",
    "12:00": "Lunch break (if you're lucky)",
    "13:00": "Admission from ER usually",
    "14:00": "Interesting cases meeting",
    "15:00": "Complete admission workup",
    "16:00": "Afternoon rounds",
    "17:00": "Update families",
    "18:00": "Sign out (hopefully)",
    "19:00": "Home (optimistically)"
  };

  const mustKnowCold = {
    "CAM Criteria": [
      "1. Acute onset + fluctuating course",
      "2. Inattention (serial 7s, count backward from 20)",
      "3. Disorganized thinking OR",
      "4. Altered level of consciousness",
      "Positive = 1 AND 2 AND (3 OR 4)"
    ],
    "Fried Frailty": [
      "≥3 criteria = Frail:",
      "1. Unintentional weight loss >4.5kg/year",
      "2. Self-reported exhaustion",
      "3. Weakness (grip strength <20kg women, <30kg men)",
      "4. Slow walking speed (>6-7 sec for 4.5m)",
      "5. Low physical activity"
    ],
    "Falls Protocol": [
      "Timed Up & Go >12 seconds = HIGH RISK",
      "Orthostatics: Check BP/HR supine → 1min → 3min standing",
      "Positive = SBP drop >20 OR DBP drop >10 OR HR increase >30",
      "Always check: Vision + Hearing + Feet + Medications",
      "Home safety evaluation before discharge"
    ],
    "Geriatric Dosing": [
      "Haloperidol: 0.25-0.5mg (NOT 5mg!)",
      "Lorazepam: 0.25-0.5mg (avoid if possible)",
      "Morphine: Start 1-2mg IV (not 4mg)",
      "Ramipril: Start 1.25mg daily",
      "Bisoprolol: Start 1.25mg daily"
    ]
  };

  const roundsPresentation = {
    template: "[Age][Gender], Day [#], admitted for [diagnosis], overnight [status], plan: [action]",
    example: "85-year-old female, Day 3, admitted for UTI with delirium, stable overnight with improving confusion, plan: continue antibiotics, PT evaluation, discuss discharge planning",
    
    systemsReview: [
      "Neuro: Alert and oriented x3, no focal deficits",
      "CV: Regular rate and rhythm, no edema, BP stable",
      "Resp: Clear to auscultation bilaterally, O2 sat 95% on room air",
      "GI: Positive bowel sounds, tolerating PO diet",
      "GU: Foley discontinued, voiding independently",
      "ID: Afebrile x48 hours, WBC normalizing",
      "Endo: Blood glucose controlled on sliding scale",
      "Heme: Hemoglobin stable at 11.2, no signs of bleeding",
      "Skin: No pressure injuries, Braden score 16",
      "Functional: Ambulating with walker, PT following"
    ],
    
    keyPhrases: {
      stable: "Hemodynamically stable, afebrile, improving",
      unstable: "Clinically deteriorating, may need higher level of care",
      ready: "Medically stable for discharge, awaiting PT clearance",
      complex: "Multiple active issues, requiring ongoing workup"
    }
  };

  const hebrewPhrases = {
    essential: {
      "Good morning": "בוקר טוב (Boker tov)",
      "How are you feeling?": "איך אתה מרגיש? (Eich ata margish?)",
      "Any pain?": "יש כאבים? (Yesh ke'evim?)",
      "I'm the doctor": "אני הרופא (Ani harofe)",
      "Take a deep breath": "נשום עמוק (Neshom amok)",
      "We'll take care of you": "אנחנו נטפל בך (Anachnu netapel becha)"
    },
    medical: {
      "Emergency": "חירום (Cherum)",
      "Medicine": "תרופה (Trufa)",
      "Hospital": "בית חולים (Beit cholim)",
      "Examination": "בדיקה (Bdika)",
      "Blood test": "בדיקת דם (Bdikat dam)",
      "X-ray": "צילום רנטגן (Tzilum)",
      "Family": "משפחה (Mishpacha)"
    },
    rounds: {
      "I'll circle back": "אני אחזור לזה אחרי הביקור (Ani achzor leze)",
      "What's baseline?": "מה היה הבייסליין? (Ma haya baseline?)",
      "Continue current management": "להמשיך טיפול נוכחי (Lehamshich tipul nochchi)",
      "Hold medications": "לעצור תרופות (La'atzor trufot)",
      "Family meeting": "ישיבה עם המשפחה (Yeshiva im hamishpacha)",
      "Discharge planning": "תכנון שחרור (Tichnun shichrur)",
      "Social work consult": "ייעוץ עו״ס (Ye'utz ovdei sotzialli)"
    }
  };

  const survivalTips = {
    rounds: [
      "Always have patient list printed and updated",
      "Know latest vitals, labs, and overnight events",
      "Start with one-liner, then systems if asked",
      "Have plan ready - be specific with actions",
      "If you don't know, say 'I'll find out and get back to you'",
      "Write everything down - you won't remember"
    ],
    efficiency: [
      "Pre-round starting at 7:00 AM",
      "Check labs on computer before rounds",
      "Template your notes the night before",
      "Keep snacks in your pocket",
      "Make friends with nurses - they'll save you",
      "Learn the EMR shortcuts immediately"
    ],
    mistakes: [
      "Never guess medication doses - look them up",
      "Don't order tests without clear indication",
      "Always check allergies before prescribing",
      "Document everything contemporaneously",
      "Call consults early in the day",
      "Never ignore nurse concerns"
    ]
  };

  const panicProtocol = {
    title: "PANIC - Quick Reference Protocol",
    situations: {
      "Acute Confusion": {
        action: "CAM assessment → Check vitals → Review meds → Order UA, CBC, BMP → Call senior",
        remember: "It's usually UTI, meds, or metabolic"
      },
      "Fall": {
        action: "Check for injury → Orthostatics → Review meds → Neuro exam → Document thoroughly",
        remember: "Always check anticoagulation status"
      },
      "Chest Pain": {
        action: "EKG within 10 min → Troponin → CXR → Aspirin if not contraindicated → Call senior",
        remember: "Atypical presentation common in elderly"
      },
      "Shortness of Breath": {
        action: "O2 sat → ABG if severe → CXR → BNP → Consider PE if risk factors",
        remember: "CHF exacerbation most common"
      },
      "Hypotension": {
        action: "Fluid bolus 250-500cc → Check for bleeding → Review meds → Consider sepsis",
        remember: "Elderly need less fluid, monitor closely"
      }
    }
  };

  return (
    <div className="glass-container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📚 Fellowship Day 1 Survival Guide</h2>
        </div>
        
        {/* Navigation Tabs */}
        <div className="quick-actions" style={{ marginBottom: '20px' }}>
          <button 
            className={`action-card ${activeSection === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveSection('timeline')}
          >
            <span className="icon">⏰</span>
            <span className="label">Timeline</span>
          </button>
          <button 
            className={`action-card ${activeSection === 'protocols' ? 'active' : ''}`}
            onClick={() => setActiveSection('protocols')}
          >
            <span className="icon">📋</span>
            <span className="label">Must Know</span>
          </button>
          <button 
            className={`action-card ${activeSection === 'rounds' ? 'active' : ''}`}
            onClick={() => setActiveSection('rounds')}
          >
            <span className="icon">🏥</span>
            <span className="label">Rounds</span>
          </button>
          <button 
            className={`action-card ${activeSection === 'hebrew' ? 'active' : ''}`}
            onClick={() => setActiveSection('hebrew')}
          >
            <span className="icon">🇮🇱</span>
            <span className="label">Hebrew</span>
          </button>
          <button 
            className={`action-card emergency ${activeSection === 'panic' ? 'active' : ''}`}
            onClick={() => setActiveSection('panic')}
          >
            <span className="icon">🚨</span>
            <span className="label">PANIC</span>
          </button>
        </div>

        {/* Timeline Section */}
        {activeSection === 'timeline' && (
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>📅 Your First Day Timeline</h3>
            <div className="timeline">
              {Object.entries(timeline).map(([time, task]) => (
                <div className="timeline-item" key={time}>
                  <span className="time">{time}</span>
                  <span className="task">{task}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Must Know Protocols */}
        {activeSection === 'protocols' && (
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>🧠 Must Know Cold</h3>
            {Object.entries(mustKnowCold).map(([protocol, items]) => (
              <div key={protocol} style={{ marginBottom: '25px' }}>
                <h4 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>{protocol}</h4>
                <ul style={{ paddingLeft: '20px' }}>
                  {items.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '8px', lineHeight: '1.6' }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Rounds Presentation */}
        {activeSection === 'rounds' && (
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>🏥 Rounds Presentation Format</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--primary-dark)' }}>Template:</h4>
              <div style={{ 
                padding: '15px', 
                background: 'rgba(99, 102, 241, 0.1)', 
                borderRadius: '8px',
                fontFamily: 'monospace',
                marginTop: '10px'
              }}>
                {roundsPresentation.template}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--primary-dark)' }}>Example:</h4>
              <div style={{ 
                padding: '15px', 
                background: 'rgba(16, 185, 129, 0.1)', 
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                {roundsPresentation.example}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--primary-dark)' }}>Systems Review:</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {roundsPresentation.systemsReview.map((system, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>{system}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--primary-dark)' }}>Survival Tips:</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {survivalTips.rounds.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Hebrew Phrases */}
        {activeSection === 'hebrew' && (
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>🇮🇱 Hebrew Phrases</h3>
            
            {Object.entries(hebrewPhrases).map(([category, phrases]) => (
              <div key={category} style={{ marginBottom: '25px' }}>
                <h4 style={{ color: 'var(--primary-dark)', marginBottom: '15px', textTransform: 'capitalize' }}>
                  {category} Phrases
                </h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {Object.entries(phrases).map(([english, hebrew]) => (
                    <div key={english} style={{
                      padding: '12px',
                      background: 'rgba(99, 102, 241, 0.05)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: '600' }}>{english}</span>
                      <span style={{ color: 'var(--primary)', fontSize: '14px' }}>{hebrew}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PANIC Protocol */}
        {activeSection === 'panic' && (
          <div className="card" style={{ border: '2px solid var(--danger)' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--danger)' }}>
              🚨 {panicProtocol.title}
            </h3>
            
            {Object.entries(panicProtocol.situations).map(([situation, details]) => (
              <div key={situation} style={{ 
                marginBottom: '20px',
                padding: '15px',
                background: 'rgba(239, 68, 68, 0.05)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--danger)'
              }}>
                <h4 style={{ color: 'var(--danger)', marginBottom: '10px' }}>{situation}</h4>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Action:</strong> {details.action}
                </div>
                <div style={{ 
                  padding: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <strong>Remember:</strong> {details.remember}
                </div>
              </div>
            ))}
            
            <div style={{ 
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <strong>Golden Rule:</strong> When in doubt, call your senior. 
              It's better to ask than to guess!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Day1Guide;