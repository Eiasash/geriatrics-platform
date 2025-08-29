import React from 'react';

const App = () => {
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('meds');
  const [selectedTool, setSelectedTool] = React.useState(null);

  const medications = [
    { id: 1, name: 'Apixaban (Eliquis)', dose: '5mg BID', class: 'DOAC', beers: 'Preferred over warfarin in most elderly', renal: 'Reduce to 2.5mg BID if 2 of: age ≥80, weight ≤60kg, Cr ≥1.5' },
    { id: 2, name: 'Amlodipine', dose: '2.5-10mg daily', class: 'CCB', beers: 'Safe in elderly', renal: 'No adjustment needed' },
    { id: 3, name: 'Donepezil (Aricept)', dose: '5mg QHS x4wk then 10mg', class: 'ChEI', beers: 'Appropriate for dementia', renal: 'No adjustment' },
    { id: 4, name: 'Metformin', dose: '500mg BID', class: 'Biguanide', beers: 'Avoid if eGFR <30', renal: 'Contraindicated if eGFR <30' },
    { id: 5, name: 'Lisinopril', dose: '2.5-40mg daily', class: 'ACE-I', beers: 'Monitor K+ and creatinine', renal: 'Adjust dose based on CrCl' },
    { id: 6, name: 'Atorvastatin', dose: '10-80mg QHS', class: 'Statin', beers: 'Consider deprescribing in limited life expectancy', renal: 'No adjustment' },
    { id: 7, name: 'Furosemide', dose: '20-80mg daily/BID', class: 'Loop diuretic', beers: 'Monitor electrolytes', renal: 'Higher doses may be needed' },
    { id: 8, name: 'Sertraline', dose: '25-200mg daily', class: 'SSRI', beers: 'Preferred antidepressant', renal: 'No adjustment' },
    { id: 9, name: 'Memantine', dose: '5mg daily, titrate to 10mg BID', class: 'NMDA antagonist', beers: 'For moderate-severe dementia', renal: 'Reduce if CrCl <30' },
    { id: 10, name: 'Omeprazole', dose: '20-40mg daily', class: 'PPI', beers: 'Avoid >8 weeks unless high risk', renal: 'No adjustment' }
  ];

  const boardQuestions = [
    {
      id: 1,
      question: '82-year-old woman with confusion for 2 days. T 37.2°C, BP 105/60, HR 110. UA: LE+, nitrites+. Most likely diagnosis?',
      options: ['A) UTI with delirium', 'B) Stroke', 'C) Dementia', 'D) Subdural hematoma'],
      answer: 0,
      explanation: 'UTI is a common cause of delirium in elderly. Positive UA with confusion suggests UTI-induced delirium.'
    },
    {
      id: 2,
      question: '75-year-old man on warfarin for AF presents with INR 8.5, no bleeding. Management?',
      options: ['A) Vitamin K 10mg IV', 'B) Hold warfarin only', 'C) Vitamin K 2.5mg PO', 'D) Fresh frozen plasma'],
      answer: 2,
      explanation: 'For INR >10 without bleeding, give low-dose oral vitamin K (1-2.5mg) and hold warfarin.'
    },
    {
      id: 3,
      question: 'Which medication should be AVOIDED in elderly with cognitive impairment?',
      options: ['A) Sertraline', 'B) Diphenhydramine', 'C) Acetaminophen', 'D) Metoprolol'],
      answer: 1,
      explanation: 'Anticholinergics like diphenhydramine worsen cognition and are on Beers Criteria.'
    },
    {
      id: 4,
      question: '88-year-old with CrCl 25 mL/min needs anticoagulation for new AF. Best choice?',
      options: ['A) Warfarin', 'B) Dabigatran', 'C) Apixaban', 'D) Aspirin only'],
      answer: 2,
      explanation: 'Apixaban has best renal safety profile and can be used with dose adjustment in CKD.'
    },
    {
      id: 5,
      question: 'Frail 90-year-old with BMI 18, albumin 2.8. Priority intervention?',
      options: ['A) Statin therapy', 'B) Nutritional supplementation', 'C) Exercise program', 'D) Vitamin D only'],
      answer: 1,
      explanation: 'Malnutrition (low BMI + albumin) requires urgent nutritional intervention in frail elderly.'
    }
  ];

  const clinicalTools = {
    crcl: {
      name: 'Cockcroft-Gault (CrCl)',
      calculate: (age, weight, cr, isFemale) => {
        let crcl = ((140 - age) * weight) / (72 * cr);
        if (isFemale) crcl *= 0.85;
        return crcl.toFixed(1);
      }
    },
    bmi: {
      name: 'BMI Calculator',
      calculate: (weight, height) => {
        const bmi = weight / ((height/100) ** 2);
        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';
        return `${bmi.toFixed(1)} - ${category}`;
      }
    }
  };

  if (showAdmin && password !== 'geriatrics2024') {
    return (
      <div style={{padding:'20px', textAlign:'center', fontFamily:'Arial'}}>
        <h2>Admin Login</h2>
        <input 
          type="password" 
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          style={{padding:'10px', margin:'10px', fontSize:'16px'}}
        />
        <br />
        <button onClick={() => setShowAdmin(false)} style={{padding:'10px 20px', fontSize:'16px'}}>
          Back
        </button>
      </div>
    );
  }

  if (showAdmin && password === 'geriatrics2024') {
    return (
      <div style={{padding:'20px', fontFamily:'Arial'}}>
        <h1>Admin Panel</h1>
        <p>Database: {medications.length} medications loaded</p>
        <p>Questions: {boardQuestions.length} board review questions</p>
        <p>Tools: 2 clinical calculators active</p>
        <button onClick={() => {setShowAdmin(false); setPassword('');}} style={{padding:'10px 20px', marginTop:'20px'}}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{fontFamily:'Arial, sans-serif', minHeight:'100vh', backgroundColor:'#f5f5f5'}}>
      <header style={{backgroundColor:'#2563eb', color:'white', padding:'20px', boxShadow:'0 2px 4px rgba(0,0,0,0.1)'}}>
        <h1 style={{margin:0, fontSize:'28px'}}>Geriatrics Platform - Shaare Zedek</h1>
        <nav style={{marginTop:'15px'}}>
          <button 
            onClick={() => setActiveTab('meds')} 
            style={{
              marginRight:'10px', 
              padding:'8px 16px', 
              backgroundColor: activeTab === 'meds' ? 'white' : 'transparent',
              color: activeTab === 'meds' ? '#2563eb' : 'white',
              border: '1px solid white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
            Medications
          </button>
          <button 
            onClick={() => setActiveTab('board')} 
            style={{
              marginRight:'10px', 
              padding:'8px 16px',
              backgroundColor: activeTab === 'board' ? 'white' : 'transparent',
              color: activeTab === 'board' ? '#2563eb' : 'white',
              border: '1px solid white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
            Board Review
          </button>
          <button 
            onClick={() => setActiveTab('tools')} 
            style={{
              marginRight:'10px', 
              padding:'8px 16px',
              backgroundColor: activeTab === 'tools' ? 'white' : 'transparent',
              color: activeTab === 'tools' ? '#2563eb' : 'white',
              border: '1px solid white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
            Clinical Tools
          </button>
          <button 
            onClick={() => setShowAdmin(true)} 
            style={{
              padding:'8px 16px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
            Admin
          </button>
        </nav>
      </header>
      
      <main style={{padding:'20px', maxWidth:'1200px', margin:'0 auto'}}>
        {activeTab === 'meds' && (
          <div>
            <h2 style={{color:'#1f2937', marginBottom:'20px'}}>Geriatric Medication Guide</h2>
            <div style={{display:'grid', gap:'15px'}}>
              {medications.map(med => (
                <div key={med.id} style={{
                  padding:'15px', 
                  backgroundColor:'white', 
                  borderRadius:'8px',
                  boxShadow:'0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft:'4px solid #2563eb'
                }}>
                  <h3 style={{margin:'0 0 10px 0', color:'#1f2937'}}>{med.name}</h3>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', fontSize:'14px'}}>
                    <div><strong>Class:</strong> {med.class}</div>
                    <div><strong>Dose:</strong> {med.dose}</div>
                    <div style={{gridColumn:'1/3'}}><strong>Beers Criteria:</strong> {med.beers}</div>
                    <div style={{gridColumn:'1/3'}}><strong>Renal Dosing:</strong> {med.renal}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'board' && (
          <div>
            <h2 style={{color:'#1f2937', marginBottom:'20px'}}>Board Review Questions</h2>
            {boardQuestions.map((q, idx) => (
              <div key={q.id} style={{
                padding:'20px',
                marginBottom:'20px',
                backgroundColor:'white',
                borderRadius:'8px',
                boxShadow:'0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{color:'#1f2937'}}>Question {idx + 1}</h3>
                <p style={{fontSize:'16px', marginBottom:'15px'}}>{q.question}</p>
                {q.options.map((opt, i) => (
                  <div key={i} style={{padding:'8px 0', fontSize:'15px'}}>
                    {opt}
                  </div>
                ))}
                <details style={{marginTop:'15px'}}>
                  <summary style={{cursor:'pointer', color:'#2563eb', fontWeight:'bold'}}>Show Answer</summary>
                  <div style={{marginTop:'10px', padding:'10px', backgroundColor:'#e0f2fe', borderRadius:'4px'}}>
                    <strong>Answer:</strong> {q.options[q.answer]}<br/>
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'tools' && (
          <div>
            <h2 style={{color:'#1f2937', marginBottom:'20px'}}>Clinical Calculators</h2>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
              <div style={{padding:'20px', backgroundColor:'white', borderRadius:'8px', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3>Cockcroft-Gault (CrCl)</h3>
                <p>Calculate creatinine clearance for renal dosing</p>
                <button style={{padding:'10px 20px', backgroundColor:'#2563eb', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>
                  Open Calculator
                </button>
              </div>
              <div style={{padding:'20px', backgroundColor:'white', borderRadius:'8px', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3>BMI Calculator</h3>
                <p>Assess nutritional status in elderly</p>
                <button style={{padding:'10px 20px', backgroundColor:'#2563eb', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>
                  Open Calculator
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
