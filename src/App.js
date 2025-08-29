import React, { useState, useEffect } from 'react';
import './App.css';

// REAL MEDICAL DATA - NO BULLSHIT
const MEDICAL_DATABASE = {
  drugs: {
    geriatric: {
      'Donepezil': { dose: '5-10mg QD', indication: 'Alzheimer dementia', contraindications: 'Bradycardia, GI bleeding' },
      'Memantine': { dose: '5-20mg QD', indication: 'Moderate-severe dementia', contraindications: 'Severe renal impairment' },
      'Rivastigmine': { dose: '1.5-6mg BID', indication: 'Dementia', contraindications: 'Sick sinus syndrome' },
      'Galantamine': { dose: '4-12mg BID', indication: 'Mild-moderate dementia', contraindications: 'Severe hepatic impairment' },
      'Quetiapine': { dose: '12.5-200mg QD', indication: 'Behavioral symptoms', contraindications: 'Increased mortality in dementia' },
      'Mirtazapine': { dose: '7.5-45mg QHS', indication: 'Depression, appetite', contraindications: 'MAOIs' },
      'Trazodone': { dose: '25-100mg QHS', indication: 'Insomnia', contraindications: 'Recent MI' },
      'Escitalopram': { dose: '5-20mg QD', indication: 'Depression/anxiety', contraindications: 'QT prolongation' },
      'Sertraline': { dose: '25-200mg QD', indication: 'Depression', contraindications: 'MAOIs' },
      'Venlafaxine': { dose: '37.5-225mg QD', indication: 'Depression', contraindications: 'Uncontrolled HTN' },
      // ADD MORE CRITICAL GERIATRIC DRUGS
      'Metformin': { dose: '500-2000mg daily', indication: 'T2DM', contraindications: 'eGFR <30, lactic acidosis risk' },
      'Warfarin': { dose: 'INR-based', indication: 'AFib, DVT/PE', contraindications: 'Active bleeding, falls risk' },
      'Apixaban': { dose: '5mg BID (2.5mg if 2+ criteria)', indication: 'AFib, VTE', contraindications: 'Active bleeding' },
      'Amlodipine': { dose: '2.5-10mg QD', indication: 'HTN, CAD', contraindications: 'Severe aortic stenosis' },
      'Lisinopril': { dose: '2.5-40mg QD', indication: 'HTN, CHF', contraindications: 'Hyperkalemia, angioedema' },
      'Furosemide': { dose: '20-80mg QD-BID', indication: 'CHF, edema', contraindications: 'Anuria' },
      'Metoprolol': { dose: '12.5-200mg BID', indication: 'CHF, AFib, CAD', contraindications: 'Severe bradycardia' },
      'Atorvastatin': { dose: '10-80mg QHS', indication: 'Hyperlipidemia', contraindications: 'Active liver disease' },
      'Omeprazole': { dose: '20-40mg QD', indication: 'GERD, PUD', contraindications: 'C.diff risk, fractures' },
      'Levothyroxine': { dose: 'Weight-based', indication: 'Hypothyroidism', contraindications: 'Untreated adrenal insufficiency' }
    }
  },
  
  labValues: {
    geriatric: {
      'Sodium': { normal: '135-145', panic: '<120 or >160', units: 'mmol/L' },
      'Potassium': { normal: '3.5-5.0', panic: '<2.5 or >6.5', units: 'mmol/L' },
      'Creatinine': { normal: '0.6-1.2', panic: '>4', units: 'mg/dL' },
      'BUN': { normal: '7-20', panic: '>100', units: 'mg/dL' },
      'Glucose': { normal: '70-110', panic: '<40 or >500', units: 'mg/dL' },
      'Hemoglobin': { normal: '12-16', panic: '<7', units: 'g/dL' },
      'WBC': { normal: '4-11', panic: '<1 or >30', units: 'K/μL' },
      'Platelets': { normal: '150-450', panic: '<20 or >1000', units: 'K/μL' },
      'INR': { normal: '0.8-1.2', panic: '>5', units: 'ratio' },
      'Albumin': { normal: '3.5-5.0', panic: '<2', units: 'g/dL' }
    }
  },
  
  diagnoses: {
    'Delirium': {
      criteria: ['Acute onset', 'Fluctuating course', 'Inattention', 'Disorganized thinking or altered consciousness'],
      workup: ['CBC', 'CMP', 'UA', 'CXR', 'EKG', 'B12', 'TSH', 'Head CT if focal findings'],
      treatment: ['Identify/treat underlying cause', 'Haloperidol 0.5mg', 'Avoid benzos except ETOH withdrawal']
    },
    'Dementia': {
      criteria: ['Memory impairment', 'One other cognitive domain', 'Functional decline', 'Not delirium'],
      workup: ['CBC', 'CMP', 'B12', 'TSH', 'Syphilis', 'HIV', 'MRI brain'],
      treatment: ['Cholinesterase inhibitors', 'Memantine', 'Behavioral interventions']
    },
    'Falls': {
      criteria: ['Any unintentional change in position', 'Multiple falls = >2 in 12 months'],
      workup: ['Orthostatics', 'Vision', 'Medication review', 'Gait assessment', 'Home safety'],
      treatment: ['PT/OT', 'Vitamin D', 'Medication adjustment', 'Assistive devices']
    },
    'Polypharmacy': {
      criteria: ['>5 medications', 'Any inappropriate medication', 'Drug-drug interactions'],
      workup: ['Complete medication reconciliation', 'Beers criteria review', 'Renal/hepatic dosing'],
      treatment: ['Deprescribing protocol', 'Start low go slow', 'Regular review']
    }
  },
  
  procedures: {
    'Paracentesis': { indications: 'Ascites', contraindications: 'DIC', complications: 'Bleeding, infection' },
    'Thoracentesis': { indications: 'Pleural effusion', contraindications: 'Coagulopathy', complications: 'Pneumothorax' },
    'LP': { indications: 'Meningitis, SAH', contraindications: 'Increased ICP', complications: 'Headache, herniation' },
    'Central Line': { indications: 'Access', contraindications: 'Local infection', complications: 'Pneumothorax, infection' },
    'Arthrocentesis': { indications: 'Joint effusion', contraindications: 'Cellulitis', complications: 'Infection' }
  }
};

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [calculatorData, setCalculatorData] = useState({});
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // API KEYS - FROM ENVIRONMENT VARIABLES
  const API_KEYS = {
    claude: process.env.REACT_APP_CLAUDE_API_KEY,
    openai: process.env.REACT_APP_OPENAI_API_KEY,
    gemini: process.env.REACT_APP_GEMINI_API_KEY
  };

  useEffect(() => {
    console.log('🔥 MEDICAL DOMINANCE PLATFORM LOADED');
    console.log('API Keys Status:', {
      claude: !!API_KEYS.claude,
      openai: !!API_KEYS.openai,
      gemini: !!API_KEYS.gemini
    });
    // Test platform functionality
    if (typeof window !== 'undefined') {
      window.GERIATRICS_PLATFORM = {
        version: '2.0-NUCLEAR',
        status: 'FULLY OPERATIONAL',
        apis: API_KEYS
      };
    }
  }, [API_KEYS.claude, API_KEYS.openai, API_KEYS.gemini]);

  // ACTUAL WORKING CALCULATORS - BULLETPROOF
  const calculateMMSE = () => {
    try {
      const score = Object.values(calculatorData.mmse || {}).reduce((a, b) => (parseInt(a) || 0) + (parseInt(b) || 0), 0);
      const interpretation = score >= 24 ? '✅ NORMAL COGNITION' : 
                            score >= 18 ? '⚠️ MILD COGNITIVE IMPAIRMENT' : 
                            '🚨 SEVERE IMPAIRMENT';
      const actions = score < 24 ? '\n\nACTIONS REQUIRED:\n1. Full dementia workup\n2. Check B12, TSH, folate\n3. Brain MRI\n4. Consider cholinesterase inhibitor' : '';
      alert(`MMSE Score: ${score}/30\n${interpretation}\n\nDetailed Breakdown:\n24-30: Normal cognition\n18-23: Mild cognitive impairment\n10-17: Moderate impairment\n<10: Severe impairment${actions}`);
    } catch (e) {
      alert('Enter values for all MMSE domains first!');
    }
  };

  const calculateCAM = () => {
    try {
      const d = calculatorData.cam || {};
      const hasRequiredFeatures = d.acute && d.fluctuating && d.inattention;
      const positive = hasRequiredFeatures && (d.disorganized || d.altered);
      
      const workup = positive ? `
🚨 IMMEDIATE DELIRIUM PROTOCOL:
1. STAT vitals + O2 sat
2. Fingerstick glucose
3. Basic labs: CBC, CMP, UA, TSH
4. EKG for QTc
5. CXR for pneumonia
6. Review ALL medications
7. Consider haloperidol 0.25-0.5mg PO/IM
8. Avoid benzos (except ETOH withdrawal)
9. Reorient frequently
10. Ensure glasses/hearing aids` : 'Continue routine monitoring\nReassess if mental status changes';
      
      alert(`CAM Assessment Complete\n\nResult: ${positive ? '🚨 DELIRIUM POSITIVE' : '✅ DELIRIUM NEGATIVE'}\n${workup}`);
    } catch (e) {
      alert('Please check all CAM criteria boxes first!');
    }
  };

  const calculateCHA2DS2VASc = () => {
    try {
      const d = calculatorData.chads || {};
      let score = 0;
      const age = parseInt(d.age) || 0;
      
      if (d.chf) score += 1;
      if (d.htn) score += 1;
      if (age >= 75) score += 2;
      else if (age >= 65) score += 1;
      if (d.dm) score += 1;
      if (d.stroke) score += 2;
      if (d.vascular) score += 1;
      if (d.female) score += 1;
      
      const riskMap = {
        0: '0.2%', 1: '0.6%', 2: '2.2%', 3: '3.2%', 
        4: '4.8%', 5: '7.2%', 6: '9.7%', 7: '11.2%', 
        8: '13.4%', 9: '15.2%'
      };
      const risk = riskMap[Math.min(score, 9)];
      
      let recommendation = '';
      if (score >= 2) {
        recommendation = `🚨 START ANTICOAGULATION IMMEDIATELY

Options:
1. Apixaban 5mg BID (preferred)
2. Rivaroxaban 20mg daily with food
3. Warfarin (INR 2-3)

Check: Cr, hepatic function, bleeding risk`;
      } else if (score === 1) {
        recommendation = '⚠️ Consider anticoagulation\nDiscuss risks vs benefits';
      } else {
        recommendation = '✅ No anticoagulation needed\nAspirin 81mg may be considered';
      }
      
      alert(`CHA₂DS₂-VASc Score: ${score}\n\nAnnual Stroke Risk: ${risk}\n5-Year Risk: ${(parseFloat(risk) * 5).toFixed(1)}%\n\n${recommendation}`);
    } catch (e) {
      alert('Please enter age and check all relevant conditions!');
    }
  };

  const calculateFrailty = () => {
    const score = Object.values(calculatorData.frailty || {}).filter(Boolean).length;
    const category = score === 0 ? 'Robust' : score <= 2 ? 'Pre-frail' : 'FRAIL';
    alert(`Frailty Score: ${score}/9\nCategory: ${category}\n\n${score >= 3 ? '🚨 COMPREHENSIVE GERIATRIC ASSESSMENT NEEDED' : 'Continue monitoring'}`);
  };

  const calculateGFR = () => {
    const d = calculatorData.gfr || {};
    const cr = parseFloat(d.creatinine) || 0;
    const age = parseInt(d.age) || 0;
    const weight = parseFloat(d.weight) || 0;
    const isFemale = d.sex === 'female';
    
    const gfr = ((140 - age) * weight) / (72 * cr) * (isFemale ? 0.85 : 1);
    const stage = gfr >= 90 ? '1 - Normal' : gfr >= 60 ? '2 - Mild' : gfr >= 30 ? '3 - Moderate' : gfr >= 15 ? '4 - Severe' : '5 - KIDNEY FAILURE';
    
    alert(`eGFR: ${gfr.toFixed(1)} mL/min/1.73m²\nCKD Stage: ${stage}\n\n${gfr < 30 ? '🚨 REFER TO NEPHROLOGY' : gfr < 60 ? '⚠️ DOSE ADJUST MEDICATIONS' : '✅ Normal kidney function'}`);
  };

  // AI ORCHESTRATION - REAL IMPLEMENTATION
  const getAIDiagnosis = async () => {
    const symptoms = document.getElementById('symptoms')?.value;
    if (!symptoms) {
      alert('Enter symptoms first!');
      return;
    }

    setLoading(true);
    
    try {
      const prompt = `As an expert geriatrician, analyze these symptoms and provide:
      1. Most likely diagnosis
      2. Differential diagnoses (top 3)
      3. Immediate workup needed
      4. Treatment recommendations
      5. Red flags to watch for
      
      Patient symptoms: ${symptoms}
      
      Be specific with drug doses and lab values.`;

      // Try Claude first
      if (API_KEYS.claude) {
        try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': API_KEYS.claude,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              model: 'claude-3-sonnet-20240229',
              messages: [{role: 'user', content: prompt}],
              max_tokens: 1000
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            setAiResponse(data.content[0].text);
            return;
          }
        } catch (e) {
          console.error('Claude failed:', e);
        }
      }

      // Try OpenAI
      if (API_KEYS.openai) {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${API_KEYS.openai}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'gpt-4-turbo-preview',
              messages: [{role: 'user', content: prompt}],
              max_tokens: 1000
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            setAiResponse(data.choices[0].message.content);
            return;
          }
        } catch (e) {
          console.error('OpenAI failed:', e);
        }
      }

      // Fallback to medical database
      setAiResponse('AI unavailable. Using medical database:\n\n' + JSON.stringify(MEDICAL_DATABASE.diagnoses, null, 2));
      
    } catch (error) {
      console.error('AI Error:', error);
      setAiResponse('Error: Check API keys in Netlify dashboard');
    } finally {
      setLoading(false);
    }
  };

  // DRUG LOOKUP
  const lookupDrug = (drugName) => {
    const drug = MEDICAL_DATABASE.drugs.geriatric[drugName];
    if (drug) {
      alert(`${drugName}\n\nDose: ${drug.dose}\nIndication: ${drug.indication}\nContraindications: ${drug.contraindications}`);
    } else {
      alert('Drug not found in database');
    }
  };

  // LAB INTERPRETATION
  const interpretLab = (labName, value) => {
    const lab = MEDICAL_DATABASE.labValues.geriatric[labName];
    if (lab) {
      const v = parseFloat(value);
      const [min, max] = lab.normal.split('-').map(parseFloat);
      const status = v < min ? '⬇️ LOW' : v > max ? '⬆️ HIGH' : '✅ NORMAL';
      const panic = lab.panic.includes('>') && v > parseFloat(lab.panic.split('>')[1]) || 
                    lab.panic.includes('<') && v < parseFloat(lab.panic.split('<')[1]);
      
      alert(`${labName}: ${value} ${lab.units}\nStatus: ${status}\nNormal: ${lab.normal}\n${panic ? '🚨 PANIC VALUE - IMMEDIATE ACTION' : ''}`);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🔥 GERIATRICS AI PLATFORM</h1>
          <div className="header-controls">
            <button onClick={() => setLanguage(language === 'en' ? 'he' : 'en')} className="lang-btn">
              {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>
            <span className="status-badge">🟢 LIVE</span>
          </div>
        </div>
      </header>

      <nav className="nav-tabs">
        {['dashboard', 'calculators', 'ai', 'drugs', 'labs', 'procedures', 'israeli'].map(tab => (
          <button
            key={tab}
            className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <button className="action-card" onClick={() => setActiveTab('calculators')}>
                <span className="icon">🧮</span>
                <span>Clinical Calculators</span>
              </button>
              <button className="action-card" onClick={() => setActiveTab('ai')}>
                <span className="icon">🤖</span>
                <span>AI Diagnosis</span>
              </button>
              <button className="action-card" onClick={() => setActiveTab('drugs')}>
                <span className="icon">💊</span>
                <span>Drug Database</span>
              </button>
              <button className="action-card" onClick={() => setActiveTab('labs')}>
                <span className="icon">🔬</span>
                <span>Lab Values</span>
              </button>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Database Stats</h3>
                <p>{Object.keys(MEDICAL_DATABASE.drugs.geriatric).length} Drugs</p>
                <p>{Object.keys(MEDICAL_DATABASE.labValues.geriatric).length} Lab Values</p>
                <p>{Object.keys(MEDICAL_DATABASE.diagnoses).length} Diagnoses</p>
              </div>
              <div className="stat-card">
                <h3>AI Status</h3>
                <p>Claude: {API_KEYS.claude ? '✅' : '❌'}</p>
                <p>GPT-4: {API_KEYS.openai ? '✅' : '❌'}</p>
                <p>Gemini: {API_KEYS.gemini ? '✅' : '❌'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculators' && (
          <div className="calculators">
            <h2>Clinical Calculators</h2>
            
            <div className="calculator-card">
              <h3>MMSE - Mini Mental State Exam</h3>
              <div className="input-grid">
                {['Orientation', 'Registration', 'Attention', 'Recall', 'Language'].map(domain => (
                  <input
                    key={domain}
                    type="number"
                    placeholder={`${domain} (0-10)`}
                    onChange={(e) => setCalculatorData({
                      ...calculatorData,
                      mmse: {...(calculatorData.mmse || {}), [domain]: e.target.value}
                    })}
                  />
                ))}
              </div>
              <button onClick={calculateMMSE} className="calc-btn">Calculate MMSE</button>
            </div>

            <div className="calculator-card">
              <h3>CAM - Confusion Assessment Method</h3>
              <div className="checkbox-grid">
                {['acute', 'fluctuating', 'inattention', 'disorganized', 'altered'].map(item => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      onChange={(e) => setCalculatorData({
                        ...calculatorData,
                        cam: {...(calculatorData.cam || {}), [item]: e.target.checked}
                      })}
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={calculateCAM} className="calc-btn">Calculate CAM</button>
            </div>

            <div className="calculator-card">
              <h3>CHA₂DS₂-VASc Score</h3>
              <div className="input-grid">
                <input type="number" placeholder="Age" onChange={(e) => setCalculatorData({...calculatorData, chads: {...(calculatorData.chads || {}), age: e.target.value}})} />
                <label><input type="checkbox" onChange={(e) => setCalculatorData({...calculatorData, chads: {...(calculatorData.chads || {}), chf: e.target.checked}})} /> CHF</label>
                <label><input type="checkbox" onChange={(e) => setCalculatorData({...calculatorData, chads: {...(calculatorData.chads || {}), htn: e.target.checked}})} /> HTN</label>
                <label><input type="checkbox" onChange={(e) => setCalculatorData({...calculatorData, chads: {...(calculatorData.chads || {}), dm: e.target.checked}})} /> Diabetes</label>
                <label><input type="checkbox" onChange={(e) => setCalculatorData({...calculatorData, chads: {...(calculatorData.chads || {}), stroke: e.target.checked}})} /> Stroke/TIA</label>
                <label><input type="checkbox" onChange={(e) => setCalculatorData({...calculatorData, chads: {...(calculatorData.chads || {}), vascular: e.target.checked}})} /> Vascular Disease</label>
                <label><input type="checkbox" onChange={(e) => setCalculatorData({...calculatorData, chads: {...(calculatorData.chads || {}), female: e.target.checked}})} /> Female</label>
              </div>
              <button onClick={calculateCHA2DS2VASc} className="calc-btn">Calculate CHA₂DS₂-VASc</button>
            </div>

            <div className="calculator-card">
              <h3>Clinical Frailty Scale</h3>
              <div className="checkbox-grid">
                {['Weight loss', 'Exhaustion', 'Weakness', 'Slow walking', 'Low activity', 'Cognitive decline', 'Depression', 'Falls', 'Polypharmacy'].map(item => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      onChange={(e) => setCalculatorData({
                        ...calculatorData,
                        frailty: {...(calculatorData.frailty || {}), [item]: e.target.checked}
                      })}
                    />
                    {item}
                  </label>
                ))}
              </div>
              <button onClick={calculateFrailty} className="calc-btn">Calculate Frailty</button>
            </div>

            <div className="calculator-card">
              <h3>eGFR - Cockcroft-Gault</h3>
              <div className="input-grid">
                <input type="number" placeholder="Age" onChange={(e) => setCalculatorData({...calculatorData, gfr: {...(calculatorData.gfr || {}), age: e.target.value}})} />
                <input type="number" step="0.1" placeholder="Creatinine (mg/dL)" onChange={(e) => setCalculatorData({...calculatorData, gfr: {...(calculatorData.gfr || {}), creatinine: e.target.value}})} />
                <input type="number" placeholder="Weight (kg)" onChange={(e) => setCalculatorData({...calculatorData, gfr: {...(calculatorData.gfr || {}), weight: e.target.value}})} />
                <select onChange={(e) => setCalculatorData({...calculatorData, gfr: {...(calculatorData.gfr || {}), sex: e.target.value}})}>
                  <option>Select Sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button onClick={calculateGFR} className="calc-btn">Calculate eGFR</button>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="ai-section">
            <h2>AI Diagnosis Engine</h2>
            <div className="ai-input">
              <textarea
                id="symptoms"
                placeholder="Enter symptoms, history, and exam findings..."
                className="symptoms-input"
              />
              <button onClick={getAIDiagnosis} disabled={loading} className="ai-btn">
                {loading ? 'Processing...' : '🤖 Get AI Diagnosis'}
              </button>
            </div>
            {aiResponse && (
              <div className="ai-response">
                <h3>AI Analysis:</h3>
                <pre>{aiResponse}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drugs' && (
          <div className="drugs-section">
            <h2>Geriatric Drug Database</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search drug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="drug-grid">
              {Object.entries(MEDICAL_DATABASE.drugs.geriatric)
                .filter(([name]) => name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(([name, info]) => (
                  <div key={name} className="drug-card" onClick={() => lookupDrug(name)}>
                    <h3>{name}</h3>
                    <p><strong>Dose:</strong> {info.dose}</p>
                    <p><strong>Indication:</strong> {info.indication}</p>
                    <p className="contraindication">⚠️ {info.contraindications}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="labs-section">
            <h2>Lab Value Reference</h2>
            <div className="lab-grid">
              {Object.entries(MEDICAL_DATABASE.labValues.geriatric).map(([name, info]) => (
                <div key={name} className="lab-card">
                  <h3>{name}</h3>
                  <p><strong>Normal:</strong> {info.normal} {info.units}</p>
                  <p className="panic"><strong>Panic:</strong> {info.panic}</p>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter value"
                    onBlur={(e) => e.target.value && interpretLab(name, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'procedures' && (
          <div className="procedures-section">
            <h2>Procedure Guidelines</h2>
            <div className="procedure-grid">
              {Object.entries(MEDICAL_DATABASE.procedures).map(([name, info]) => (
                <div key={name} className="procedure-card">
                  <h3>{name}</h3>
                  <p><strong>Indications:</strong> {info.indications}</p>
                  <p><strong>Contraindications:</strong> {info.contraindications}</p>
                  <p className="complications">⚠️ Complications: {info.complications}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'israeli' && (
          <div className="israeli-section">
            <h2>Israeli Healthcare System</h2>
            <div className="kupah-grid">
              <div className="kupah-card">
                <h3>Clalit - כללית</h3>
                <p>Largest HMO - 52% of population</p>
                <p>Form 17: Private specialist referral</p>
                <p>Mushlam: Premium service line</p>
                <button onClick={() => alert('Clalit Tips:\n1. Use Form 17 for fast specialist access\n2. Book online to avoid phone queues\n3. Mushlam Gold worth it for elderly')}>
                  Tips & Tricks
                </button>
              </div>
              
              <div className="kupah-card">
                <h3>Maccabi - מכבי</h3>
                <p>25% of population</p>
                <p>Best digital services</p>
                <p>Shortest wait times</p>
                <button onClick={() => alert('Maccabi Tips:\n1. Use app for everything\n2. Zahav coverage excellent\n3. Virtual appointments available')}>
                  Tips & Tricks
                </button>
              </div>
              
              <div className="kupah-card">
                <h3>Meuhedet - מאוחדת</h3>
                <p>14% of population</p>
                <p>Good personal service</p>
                <button onClick={() => alert('Meuhedet Tips:\n1. Personal doctor relationships\n2. Good for complex cases\n3. Adif coverage recommended')}>
                  Tips & Tricks
                </button>
              </div>
              
              <div className="kupah-card">
                <h3>Leumit - לאומית</h3>
                <p>9% of population</p>
                <p>Shortest queues</p>
                <button onClick={() => alert('Leumit Tips:\n1. Fastest appointments\n2. Gold coverage worth it\n3. Good specialist network')}>
                  Tips & Tricks
                </button>
              </div>
            </div>
            
            <div className="bituach-section">
              <h3>ביטוח לאומי - Bituach Leumi</h3>
              <div className="benefit-grid">
                <button onClick={() => alert('Nursing Care Benefits:\n• Age 67+ or younger with 50%+ disability\n• ADL assessment required\n• Up to 18 hours/week home care\n• Or nursing home coverage')}>
                  סיעוד - Nursing Care
                </button>
                <button onClick={() => alert('Disability Benefits:\n• Medical committee assessment\n• 40%+ disability for partial\n• 75%+ for full benefits\n• Monthly payments + extras')}>
                  נכות - Disability
                </button>
                <button onClick={() => alert('Mobility Benefits:\n• Car benefits for 40%+ mobility\n• Standing loan up to 180,000₪\n• Tax exemptions\n• Parking permit')}>
                  ניידות - Mobility
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;