import React, { useState } from 'react';
import EnhancedAnalyzer from './components/ClinicalTools/EnhancedAnalyzer';
import MCQQuiz from './components/Quiz/MCQQuiz';

function SimpleApp() {
  const [activeTab, setActiveTab] = useState('analyzer');

  // Protocols data
  const protocols = {
    'Delirium': {
      assessment: 'CAM criteria: Acute onset + Fluctuation + Inattention + (Disorganized thinking OR Altered consciousness)',
      treatment: 'Haloperidol 0.25-0.5mg PO/IM q4h PRN (max 2mg/day)',
      prevention: 'Early mobilization, orientation, sleep hygiene, avoid restraints',
      monitoring: 'Monitor QTc, EPS, NMS'
    },
    'Falls Prevention': {
      assessment: 'TUG test, orthostatic vitals, medication review, vision/hearing',
      intervention: 'PT/OT, Vitamin D 800-1000 IU, home safety, medication adjustment',
      prevention: 'Exercise program, hip protectors, address orthostatic hypotension',
      monitoring: 'Fall diary, gait reassessment q3 months'
    },
    'Heart Failure': {
      acute: 'Furosemide IV (2x PO dose), daily weights, strict I/O',
      chronic: 'ACE-I/ARB + BB + MRA + SGLT2i, sodium restriction <2g/day',
      monitoring: 'Daily weight, K+, Cr, BNP trend',
      targets: 'Euvolemia, SBP >90, HR 60-100'
    },
    'Atrial Fibrillation': {
      rate: 'Beta-blocker first line (target HR <110 if asymptomatic)',
      anticoagulation: 'CHA2DS2-VASc ≥2: Apixaban 5mg BID (or 2.5mg if criteria met)',
      rhythm: 'Consider if new onset, symptomatic, or HF',
      monitoring: 'HR, BP, symptoms, annual echo'
    },
    'Diabetes in Elderly': {
      targets: 'Healthy: A1c <7.5%, Frail: A1c <8.5%, End-of-life: Avoid symptoms',
      medications: 'Metformin if eGFR >30, avoid sulfonylureas, prefer DPP-4i',
      monitoring: 'A1c q3-6 months, annual eye/foot exam',
      hypoglycemia: 'Avoid tight control, reduce meds if frequent lows'
    },
    'Hypertension': {
      targets: 'Age <80: <140/90, Age ≥80: <150/90',
      firstLine: 'ACE-I/ARB, CCB, or thiazide',
      avoid: 'Alpha-blockers as monotherapy',
      monitoring: 'Orthostatic BP, K+, Cr'
    },
    'Dementia': {
      diagnosis: 'MOCA/MMSE, B12, TSH, RPR, Head CT/MRI',
      medications: 'Mild-moderate: Donepezil 5-10mg, Severe: Consider memantine',
      behavioral: 'Non-pharm first, avoid antipsychotics if possible',
      support: 'Caregiver education, respite care, advance directives'
    },
    'UTI': {
      diagnosis: 'Symptoms + UA + culture (not asymptomatic bacteriuria)',
      empiric: 'Nitrofurantoin 100mg BID x5d or TMP-SMX DS BID x3d',
      complicated: 'Fluoroquinolone or ceftriaxone x7-14d',
      prevention: 'Hydration, void after intercourse, avoid catheters'
    },
    'Pneumonia': {
      assessment: 'CURB-65 score, CXR, CBC, BMP',
      empiric: 'CAP: Azithromycin + Ceftriaxone, HAP: Anti-pseudomonal',
      duration: 'CAP: 5-7 days, HAP: 7-8 days',
      prevention: 'Pneumovax, flu vaccine, aspiration precautions'
    },
    'Pressure Ulcers': {
      prevention: 'Turn q2h, pressure redistribution, nutrition',
      staging: 'Stage 1-4, unstageable, DTI',
      treatment: 'Offload, debride if needed, moist wound healing',
      nutrition: 'Protein 1.2-1.5 g/kg/day, vitamin C, zinc'
    }
  };

  // Medications data
  const medications = [
    {
      name: 'Haloperidol',
      israeli: 'הלדול',
      indication: 'Delirium, agitation',
      elderlyDose: '0.25-0.5mg PO/IM q4-6h',
      maxDose: '2mg/day',
      caution: 'QT prolongation, EPS, NMS',
      beers: 'Avoid in dementia (increased mortality)',
      monitoring: 'EKG, AIMS scale'
    },
    {
      name: 'Furosemide',
      israeli: 'פוסיד',
      indication: 'CHF, edema',
      elderlyDose: 'Start 20mg daily',
      maxDose: '160mg/day',
      caution: 'Monitor K+, Cr, orthostatic BP',
      beers: 'Use with caution',
      monitoring: 'Electrolytes, renal function weekly initially'
    },
    {
      name: 'Ramipril',
      israeli: 'טריטייס',
      indication: 'HTN, CHF, post-MI',
      elderlyDose: 'Start 1.25mg daily',
      maxDose: '10mg daily',
      caution: 'Hyperkalemia, AKI, angioedema',
      beers: 'Preferred ACE-I in elderly',
      monitoring: 'K+, Cr at 1-2 weeks'
    },
    {
      name: 'Warfarin',
      israeli: 'קומדין',
      indication: 'AF, DVT/PE, mechanical valve',
      elderlyDose: 'Start 2.5-5mg daily',
      target: 'INR 2-3 (2.5-3.5 for mechanical valve)',
      caution: 'Falls risk, drug interactions',
      beers: 'DOACs preferred if appropriate',
      monitoring: 'INR weekly initially, then monthly'
    },
    {
      name: 'Apixaban',
      israeli: 'אליקוויס',
      indication: 'AF, DVT/PE',
      elderlyDose: '5mg BID',
      reducedDose: '2.5mg BID if ≥2: age ≥80, weight ≤60kg, Cr ≥1.5',
      caution: 'Bleeding, no reversal agent widely available',
      beers: 'Preferred over warfarin',
      monitoring: 'Annual Cr, Hgb'
    },
    {
      name: 'Donepezil',
      israeli: 'אריספט',
      indication: 'Alzheimer dementia',
      elderlyDose: '5mg qHS x4 weeks, then 10mg',
      maxDose: '23mg (severe dementia only)',
      caution: 'GI upset, bradycardia, syncope',
      beers: 'Appropriate for dementia',
      monitoring: 'HR, GI tolerance'
    },
    {
      name: 'Metformin',
      israeli: 'גלוקופאז',
      indication: 'Type 2 diabetes',
      elderlyDose: 'Start 500mg daily with food',
      maxDose: '2000mg/day',
      caution: 'Contraindicated if eGFR <30',
      beers: 'First-line if eGFR adequate',
      monitoring: 'B12 annually, Cr'
    },
    {
      name: 'Amlodipine',
      israeli: 'נורבסק',
      indication: 'HTN, angina',
      elderlyDose: 'Start 2.5mg daily',
      maxDose: '10mg daily',
      caution: 'Peripheral edema, constipation',
      beers: 'Safe in elderly',
      monitoring: 'BP, ankle edema'
    },
    {
      name: 'Bisoprolol',
      israeli: 'קונקור',
      indication: 'HTN, CHF, AF',
      elderlyDose: 'Start 1.25-2.5mg daily',
      maxDose: '10mg daily',
      caution: 'Bradycardia, bronchospasm, fatigue',
      beers: 'Preferred beta-blocker',
      monitoring: 'HR, BP, signs of CHF'
    },
    {
      name: 'Omeprazole',
      israeli: 'לוסק',
      indication: 'GERD, PUD',
      elderlyDose: '20mg daily',
      maxDose: '40mg daily',
      caution: 'C.diff, fractures, B12 deficiency',
      beers: 'Avoid >8 weeks unless clear indication',
      monitoring: 'B12, Mg if long-term'
    }
  ];

  // Calculators component
  const Calculators = () => {
    const [calcType, setCalcType] = useState('cha2ds2vasc');
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);

    const calculateCHA2DS2VASc = () => {
      let score = 0;
      if (inputs.chf) score += 1;
      if (inputs.htn) score += 1;
      if (inputs.age >= 75) score += 2;
      else if (inputs.age >= 65) score += 1;
      if (inputs.diabetes) score += 1;
      if (inputs.stroke) score += 2;
      if (inputs.vascular) score += 1;
      if (inputs.female) score += 1;
      
      const strokeRisk = {
        0: '0.2%', 1: '0.6%', 2: '2.2%', 3: '3.2%',
        4: '4.8%', 5: '7.2%', 6: '9.7%', 7: '11.2%',
        8: '10.8%', 9: '12.2%'
      };
      
      setResult({
        score,
        risk: strokeRisk[score] || '>12%',
        recommendation: score >= 2 ? 'Anticoagulate (prefer DOAC)' : 
                       score === 1 ? 'Consider anticoagulation' : 
                       'No anticoagulation'
      });
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3>Clinical Calculators</h3>
        <select value={calcType} onChange={(e) => setCalcType(e.target.value)} style={{ marginBottom: '20px', padding: '8px' }}>
          <option value="cha2ds2vasc">CHA2DS2-VASc Score</option>
          <option value="hasbled">HAS-BLED Score</option>
          <option value="curb65">CURB-65</option>
        </select>
        
        {calcType === 'cha2ds2vasc' && (
          <div>
            <h4>CHA2DS2-VASc Calculator</h4>
            <div style={{ marginBottom: '10px' }}>
              <label><input type="checkbox" onChange={(e) => setInputs({...inputs, chf: e.target.checked})} /> CHF</label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label><input type="checkbox" onChange={(e) => setInputs({...inputs, htn: e.target.checked})} /> Hypertension</label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Age: <input type="number" onChange={(e) => setInputs({...inputs, age: parseInt(e.target.value)})} /></label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label><input type="checkbox" onChange={(e) => setInputs({...inputs, diabetes: e.target.checked})} /> Diabetes</label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label><input type="checkbox" onChange={(e) => setInputs({...inputs, stroke: e.target.checked})} /> Prior Stroke/TIA</label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label><input type="checkbox" onChange={(e) => setInputs({...inputs, vascular: e.target.checked})} /> Vascular Disease</label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label><input type="checkbox" onChange={(e) => setInputs({...inputs, female: e.target.checked})} /> Female</label>
            </div>
            <button onClick={calculateCHA2DS2VASc} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px' }}>
              Calculate
            </button>
            
            {result && (
              <div style={{ marginTop: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
                <h4>Result:</h4>
                <p>Score: {result.score}</p>
                <p>Annual Stroke Risk: {result.risk}</p>
                <p>Recommendation: {result.recommendation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Geriatrics Fellowship Platform</h1>
        <p style={{ margin: '10px 0 0', opacity: 0.9 }}>Complete Clinical Toolkit with Hebrew Support</p>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        background: '#f3f4f6',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        borderBottom: '2px solid #e5e7eb',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('analyzer')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'analyzer' ? '#667eea' : 'white',
            color: activeTab === 'analyzer' ? 'white' : '#667eea',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Clinical Analyzer
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'quiz' ? '#667eea' : 'white',
            color: activeTab === 'quiz' ? 'white' : '#667eea',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          MCQ Quiz
        </button>
        <button
          onClick={() => setActiveTab('protocols')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'protocols' ? '#667eea' : 'white',
            color: activeTab === 'protocols' ? 'white' : '#667eea',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Protocols
        </button>
        <button
          onClick={() => setActiveTab('medications')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'medications' ? '#667eea' : 'white',
            color: activeTab === 'medications' ? 'white' : '#667eea',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Medications
        </button>
        <button
          onClick={() => setActiveTab('calculators')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'calculators' ? '#667eea' : 'white',
            color: activeTab === 'calculators' ? 'white' : '#667eea',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Calculators
        </button>
      </nav>

      {/* Main Content */}
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {activeTab === 'analyzer' && <EnhancedAnalyzer />}
        {activeTab === 'quiz' && <MCQQuiz />}
        
        {activeTab === 'protocols' && (
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#667eea', marginBottom: '20px' }}>Clinical Protocols</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {Object.entries(protocols).map(([name, protocol]) => (
                <div key={name} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ color: '#764ba2', marginBottom: '15px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                    {name}
                  </h3>
                  {Object.entries(protocol).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#667eea', textTransform: 'capitalize' }}>
                        {key}:
                      </strong>
                      <p style={{ margin: '5px 0', fontSize: '14px', lineHeight: '1.5' }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'medications' && (
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#667eea', marginBottom: '20px' }}>Geriatric Medications Reference</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                background: 'white', 
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Medication</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Hebrew</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Indication</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Elderly Dose</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Max Dose</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Caution</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Beers Criteria</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Monitoring</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{med.name}</td>
                      <td style={{ padding: '12px' }}>{med.israeli}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{med.indication}</td>
                      <td style={{ padding: '12px', color: '#667eea', fontSize: '14px' }}>{med.elderlyDose}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{med.maxDose || med.reducedDose || med.target || '-'}</td>
                      <td style={{ padding: '12px', color: '#f59e0b', fontSize: '13px' }}>{med.caution}</td>
                      <td style={{ 
                        padding: '12px', 
                        color: med.beers.includes('Avoid') ? '#ef4444' : '#10b981',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        {med.beers}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>{med.monitoring}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'calculators' && <Calculators />}
      </main>
    </div>
  );
}

export default SimpleApp;