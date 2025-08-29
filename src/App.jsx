import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('meds');
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [calculatorInputs, setCalculatorInputs] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [showClinicalPearl, setShowClinicalPearl] = useState(false);
  const [currentPearlIndex, setCurrentPearlIndex] = useState(0);

  // Comprehensive medication database
  const medications = [
    { 
      id: 1, 
      name: 'Apixaban', 
      heName: 'אליקוויס', 
      brand: 'Eliquis',
      dose: '5mg BID', 
      class: 'DOAC',
      indication: 'AF, VTE prophylaxis',
      beers: 'Preferred over warfarin in elderly. Use with caution if CrCl 15-30',
      renal: 'If 2 of: age ≥80, weight ≤60kg, Cr ≥1.5mg/dL → reduce to 2.5mg BID',
      interactions: 'Strong CYP3A4 inhibitors (ketoconazole), P-gp inhibitors',
      sideEffects: 'Bleeding, anemia',
      monitoring: 'Annual CBC, renal function'
    },
    {
      id: 2,
      name: 'Rivaroxaban',
      heName: 'קסרלטו',
      brand: 'Xarelto',
      dose: '20mg daily with food',
      class: 'DOAC',
      indication: 'AF, VTE treatment',
      beers: 'Avoid if CrCl <15',
      renal: 'CrCl 15-50: reduce to 15mg daily',
      interactions: 'CYP3A4 inhibitors, P-gp inhibitors',
      sideEffects: 'GI bleeding higher than other DOACs',
      monitoring: 'Renal function, CBC'
    },
    {
      id: 3,
      name: 'Donepezil',
      heName: 'אריספט',
      brand: 'Aricept',
      dose: '5mg QHS x 4-6 weeks, then 10mg QHS',
      class: 'Cholinesterase Inhibitor',
      indication: 'Mild to severe Alzheimer dementia',
      beers: 'Appropriate for dementia. Caution with bradycardia',
      renal: 'No adjustment needed',
      interactions: 'Anticholinergics reduce effect, beta-blockers',
      sideEffects: 'Nausea, diarrhea, bradycardia, vivid dreams',
      monitoring: 'Heart rate, GI symptoms'
    },
    {
      id: 4,
      name: 'Memantine',
      heName: 'אביקסה',
      brand: 'Namenda',
      dose: '5mg daily, titrate weekly by 5mg to 10mg BID',
      class: 'NMDA Antagonist',
      indication: 'Moderate to severe Alzheimer',
      beers: 'Can combine with ChEI for moderate-severe dementia',
      renal: 'CrCl 5-29: max 10mg daily',
      interactions: 'Carbonic anhydrase inhibitors, sodium bicarbonate',
      sideEffects: 'Dizziness, confusion, constipation',
      monitoring: 'Cognitive function q6 months'
    },
    {
      id: 5,
      name: 'Metformin',
      heName: 'גלוקופאז',
      brand: 'Glucophage',
      dose: '500mg BID, max 2000mg/day in elderly',
      class: 'Biguanide',
      indication: 'Type 2 DM',
      beers: 'Avoid if eGFR <30. Caution 30-45',
      renal: 'eGFR 30-45: max 1000mg/day. <30: contraindicated',
      interactions: 'Contrast dye (hold 48h), alcohol',
      sideEffects: 'GI upset, B12 deficiency, lactic acidosis (rare)',
      monitoring: 'B12 annually, renal function'
    },
    {
      id: 6,
      name: 'Lisinopril',
      heName: 'ליסינופריל',
      brand: 'Prinivil, Zestril',
      dose: '2.5-40mg daily',
      class: 'ACE Inhibitor',
      indication: 'HTN, HF, post-MI',
      beers: 'Monitor K+ and Cr. Avoid combining with ARB/aliskiren',
      renal: 'CrCl <30: start 2.5mg, titrate carefully',
      interactions: 'K+ supplements, K-sparing diuretics, NSAIDs',
      sideEffects: 'Cough (10-20%), hyperkalemia, AKI, angioedema',
      monitoring: 'K+ and Cr within 1-2 weeks of initiation'
    },
    {
      id: 7,
      name: 'Amlodipine',
      heName: 'נורווסק',
      brand: 'Norvasc',
      dose: '2.5-10mg daily',
      class: 'Calcium Channel Blocker',
      indication: 'HTN, angina',
      beers: 'Generally safe in elderly',
      renal: 'No adjustment needed',
      interactions: 'CYP3A4 inhibitors increase levels',
      sideEffects: 'Peripheral edema, flushing',
      monitoring: 'BP, edema'
    },
    {
      id: 8,
      name: 'Furosemide',
      heName: 'פורוסמיד',
      brand: 'Lasix',
      dose: '20-80mg daily/BID',
      class: 'Loop Diuretic',
      indication: 'HF, edema, HTN',
      beers: 'Monitor electrolytes closely',
      renal: 'May need higher doses in CKD',
      interactions: 'NSAIDs, lithium, digoxin',
      sideEffects: 'Hypokalemia, hyponatremia, orthostatic hypotension, hyperuricemia',
      monitoring: 'Electrolytes, renal function, volume status'
    },
    {
      id: 9,
      name: 'Sertraline',
      heName: 'סרטרלין',
      brand: 'Zoloft',
      dose: '25-200mg daily',
      class: 'SSRI',
      indication: 'Depression, anxiety',
      beers: 'Preferred antidepressant in elderly. Monitor hyponatremia',
      renal: 'No adjustment',
      interactions: 'MAOIs, anticoagulants (increased bleeding)',
      sideEffects: 'Hyponatremia, falls, GI upset',
      monitoring: 'Na+ at baseline and 1 month'
    },
    {
      id: 10,
      name: 'Atorvastatin',
      heName: 'ליפיטור',
      brand: 'Lipitor',
      dose: '10-80mg QHS',
      class: 'Statin',
      indication: 'Hyperlipidemia, ASCVD',
      beers: 'Consider deprescribing if life expectancy <1 year',
      renal: 'No adjustment',
      interactions: 'CYP3A4 inhibitors, fibrates',
      sideEffects: 'Myalgias, elevated LFTs, rhabdomyolysis (rare)',
      monitoring: 'LFTs at baseline, symptoms of myopathy'
    },
    {
      id: 11,
      name: 'Omeprazole',
      heName: 'אומפרדקס',
      brand: 'Prilosec',
      dose: '20-40mg daily',
      class: 'PPI',
      indication: 'GERD, PUD',
      beers: 'Avoid >8 weeks unless high risk. Risk of C.diff, fractures, B12 deficiency',
      renal: 'No adjustment',
      interactions: 'Clopidogrel (reduced efficacy), iron, B12 absorption',
      sideEffects: 'Headache, C.diff, osteoporosis with long-term use',
      monitoring: 'B12, Mg++ with long-term use'
    },
    {
      id: 12,
      name: 'Gabapentin',
      heName: 'נוירונטין',
      brand: 'Neurontin',
      dose: '100mg TID, titrate slowly',
      class: 'Anticonvulsant',
      indication: 'Neuropathic pain',
      beers: 'Reduce dose in elderly, fall risk',
      renal: 'CrCl 30-59: 200-700mg BID; CrCl 15-29: 200-700mg daily',
      interactions: 'Antacids reduce absorption',
      sideEffects: 'Sedation, dizziness, peripheral edema',
      monitoring: 'Fall risk, sedation'
    }
  ];

  // Board review questions
  const boardQuestions = [
    {
      id: 1,
      question: '82-year-old woman presents with acute confusion. T 37.2°C, BP 105/60, HR 110. UA shows LE+, nitrites+. Most likely diagnosis?',
      options: ['UTI with delirium', 'Stroke', 'Alzheimer dementia', 'Subdural hematoma'],
      answer: 0,
      explanation: 'UTI is the most common cause of delirium in elderly. Positive UA with confusion strongly suggests UTI-induced delirium.'
    },
    {
      id: 2,
      question: '75-year-old on warfarin for AF presents with INR 8.5, no bleeding. Best management?',
      options: ['Vitamin K 10mg IV', 'Hold warfarin only', 'Vitamin K 1-2.5mg PO', 'FFP transfusion'],
      answer: 2,
      explanation: 'For INR >10 without bleeding, give low-dose oral vitamin K (1-2.5mg) and hold warfarin. High doses can make re-anticoagulation difficult.'
    },
    {
      id: 3,
      question: 'Which medication should be AVOIDED in elderly with cognitive impairment?',
      options: ['Sertraline', 'Diphenhydramine', 'Acetaminophen', 'Metoprolol'],
      answer: 1,
      explanation: 'Anticholinergics like diphenhydramine are on Beers Criteria - worsen cognition and increase fall risk.'
    },
    {
      id: 4,
      question: '88-year-old with CrCl 25 mL/min needs anticoagulation for new AF. Best choice?',
      options: ['Warfarin', 'Dabigatran 150mg BID', 'Apixaban 5mg BID', 'Aspirin 325mg'],
      answer: 2,
      explanation: 'Apixaban has best renal safety profile. Would need dose reduction to 2.5mg BID if has 2 of: age ≥80, weight ≤60kg, Cr ≥1.5.'
    },
    {
      id: 5,
      question: 'Frail 90-year-old with unintentional weight loss 10% over 6 months, BMI 18, albumin 2.8. Priority?',
      options: ['Start statin', 'Nutritional supplementation', 'Resistance exercise', 'Vitamin D only'],
      answer: 1,
      explanation: 'Severe malnutrition (weight loss + low BMI + hypoalbuminemia) requires urgent nutritional intervention.'
    },
    {
      id: 6,
      question: 'Best screening tool for delirium in hospitalized elderly?',
      options: ['MMSE', 'CAM', 'GDS', 'MoCA'],
      answer: 1,
      explanation: 'CAM (Confusion Assessment Method) is the validated tool for delirium screening. 4 features: acute onset, inattention, disorganized thinking, altered consciousness.'
    },
    {
      id: 7,
      question: 'Elderly patient with Parkinson disease develops visual hallucinations. Best treatment?',
      options: ['Haloperidol', 'Quetiapine', 'Reduce dopaminergic meds', 'Donepezil'],
      answer: 2,
      explanation: 'First step is always to reduce dopaminergic medications. If needed, quetiapine or pimavanserin are options. Avoid typical antipsychotics.'
    },
    {
      id: 8,
      question: 'Which is NOT a criterion for frailty (Fried criteria)?',
      options: ['Weight loss >10 lbs/year', 'Exhaustion', 'Polypharmacy', 'Slow walking speed'],
      answer: 2,
      explanation: 'Fried criteria: weight loss, exhaustion, weakness (grip), slow walking, low activity. Polypharmacy is associated but not a criterion.'
    }
  ];

  // Clinical pearls
  const clinicalPearls = [
    { category: 'Falls', pearl: 'Vitamin D supplementation reduces falls by 19% in elderly', evidence: 'Meta-analysis of 26 RCTs' },
    { category: 'Nutrition', pearl: 'Unintentional weight loss >5% in 30 days or >10% in 180 days = malnutrition', evidence: 'GLIM criteria' },
    { category: 'Polypharmacy', pearl: 'Each additional medication increases fall risk by 7%', evidence: 'Leipzig et al, 1999' },
    { category: 'Delirium', pearl: 'Delirium increases mortality 2-fold and institutionalization 3-fold', evidence: 'Witlox meta-analysis 2010' },
    { category: 'Dementia', pearl: 'Hearing aid use associated with 19% reduction in cognitive decline', evidence: 'Lancet Commission 2020' }
  ];

  // Additional Geriatric Assessment Tools
  const geriatricAssessments = {
    moca: {
      name: 'MoCA (Montreal Cognitive Assessment)',
      sections: [
        { name: 'Visuospatial/Executive', maxScore: 5 },
        { name: 'Naming', maxScore: 3 },
        { name: 'Memory', maxScore: 0 }, // No points for registration
        { name: 'Attention', maxScore: 6 },
        { name: 'Language', maxScore: 3 },
        { name: 'Abstraction', maxScore: 2 },
        { name: 'Delayed Recall', maxScore: 5 },
        { name: 'Orientation', maxScore: 6 }
      ],
      interpretation: (score) => {
        if (score >= 26) return 'Normal cognition';
        if (score >= 18) return 'Mild cognitive impairment';
        return 'Moderate-severe impairment';
      }
    },
    gds: {
      name: 'Geriatric Depression Scale (Short Form)',
      questions: [
        'Are you basically satisfied with your life?',
        'Have you dropped many of your activities and interests?',
        'Do you feel that your life is empty?',
        'Do you often get bored?',
        'Are you in good spirits most of the time?',
        'Are you afraid that something bad is going to happen to you?',
        'Do you feel happy most of the time?',
        'Do you often feel helpless?',
        'Do you prefer to stay at home rather than going out?',
        'Do you feel you have more problems with memory than most?',
        'Do you think it is wonderful to be alive now?',
        'Do you feel pretty worthless the way you are now?',
        'Do you feel full of energy?',
        'Do you feel that your situation is hopeless?',
        'Do you think that most people are better off than you are?'
      ],
      scoring: [0,1,1,1,0,1,0,1,1,1,0,1,0,1,1], // 1 for depression-indicating answers
      interpretation: (score) => {
        if (score <= 4) return 'Normal';
        if (score <= 8) return 'Mild depression';
        if (score <= 11) return 'Moderate depression';
        return 'Severe depression';
      }
    }
  };

  // Beers Criteria - High Risk Medications to Avoid
  const beersCriteria = {
    anticholinergics: [
      'Diphenhydramine', 'Hydroxyzine', 'Promethazine', 'Dicyclomine', 
      'Hyoscyamine', 'Oxybutynin', 'Tolterodine', 'Benztropine'
    ],
    benzodiazepines: [
      'Alprazolam', 'Clonazepam', 'Diazepam', 'Lorazepam', 
      'Temazepam', 'Triazolam'
    ],
    antipsychotics: [
      'Haloperidol', 'Risperidone', 'Quetiapine', 'Olanzapine'
    ],
    other: [
      'Sliding scale insulin', 'Meperidine', 'Ketorolac >5 days',
      'Indomethacin', 'Muscle relaxants', 'Megestrol', 'Glyburide'
    ]
  };

  // Drug-Drug Interactions Database
  const drugInteractions = {
    major: [
      { drugs: ['Warfarin', 'NSAIDs'], risk: 'Major bleeding risk' },
      { drugs: ['ACE-I/ARB', 'Potassium'], risk: 'Hyperkalemia' },
      { drugs: ['Digoxin', 'Amiodarone'], risk: 'Digoxin toxicity' },
      { drugs: ['SSRIs', 'NSAIDs'], risk: 'GI bleeding' },
      { drugs: ['Statins', 'Clarithromycin'], risk: 'Rhabdomyolysis' }
    ],
    moderate: [
      { drugs: ['Beta-blockers', 'Calcium channel blockers'], risk: 'Bradycardia, AV block' },
      { drugs: ['Metformin', 'Contrast dye'], risk: 'Lactic acidosis' },
      { drugs: ['PPIs', 'Clopidogrel'], risk: 'Reduced antiplatelet effect' }
    ]
  };

  // Geriatric Syndromes Reference
  const geriatricSyndromes = [
    {
      name: 'Falls',
      assessment: 'Timed Up and Go, Berg Balance Scale',
      interventions: 'Vitamin D, PT/OT, home safety, medication review',
      redFlags: '>2 falls/year, injury from fall, fear of falling'
    },
    {
      name: 'Delirium',
      assessment: 'CAM (Confusion Assessment Method)',
      interventions: 'Address triggers, orientation, avoid restraints/benzos',
      redFlags: 'Acute onset, fluctuating course, inattention'
    },
    {
      name: 'Frailty',
      assessment: 'Fried Criteria, Clinical Frailty Scale',
      interventions: 'Nutrition, resistance exercise, comprehensive geriatric assessment',
      redFlags: 'Weight loss >5%, exhaustion, weakness, slow gait, low activity'
    },
    {
      name: 'Polypharmacy',
      assessment: 'Medication count, STOPP/START criteria',
      interventions: 'Deprescribing, medication reconciliation',
      redFlags: '>5 medications, recent hospitalization, multiple prescribers'
    },
    {
      name: 'Incontinence',
      assessment: 'Bladder diary, post-void residual',
      interventions: 'Behavioral therapy, pelvic floor exercises, scheduled voiding',
      redFlags: 'New onset, hematuria, retention'
    }
  ];

  // Lab Reference Values for Elderly
  const labReferences = {
    renal: [
      { test: 'Creatinine', elderly: '0.9-1.3 mg/dL (may be falsely low)', note: 'Use CrCl or eGFR' },
      { test: 'BUN', elderly: '10-30 mg/dL', note: 'May be elevated with dehydration' }
    ],
    cardiac: [
      { test: 'BNP', elderly: '<100 pg/mL', note: 'Age-adjusted: age × 2' },
      { test: 'Troponin', elderly: 'Same as younger', note: 'Mild elevation common in CKD' }
    ],
    endocrine: [
      { test: 'TSH', elderly: '0.5-5.0 (up to 7.0 if >80yo)', note: 'Subclinical hypothyroid common' },
      { test: 'HbA1c goal', elderly: '7.5-8.5% if frail', note: 'Avoid hypoglycemia' }
    ],
    nutrition: [
      { test: 'Albumin', elderly: '>3.5 g/dL', note: 'Poor marker in acute illness' },
      { test: 'Vitamin D', elderly: '>30 ng/mL', note: 'Deficiency very common' },
      { test: 'B12', elderly: '>300 pg/mL', note: 'Check MMA if 200-300' }
    ]
  };

  // Quick Reference Protocols
  const protocols = {
    'UTI Management': {
      diagnosis: 'Symptoms + UA + culture. Avoid treating asymptomatic bacteriuria',
      firstLine: 'Nitrofurantoin 100mg BID × 5d (avoid if CrCl <30)',
      alternative: 'TMP-SMX DS BID × 3d, Cephalexin 500mg QID × 5-7d',
      complicated: 'Fluoroquinolone × 7-14d (avoid if possible)'
    },
    'Heart Failure': {
      diuretics: 'Furosemide 20-40mg, monitor K+, Cr',
      betaBlocker: 'Carvedilol 3.125mg BID or Metoprolol succinate 25mg daily',
      aceARB: 'Start low, titrate slowly, monitor K+ and Cr',
      monitoring: 'Daily weights, fluid restriction 1.5-2L'
    },
    'COPD Exacerbation': {
      bronchodilators: 'Albuterol + Ipratropium nebs q4h',
      steroids: 'Prednisone 40mg × 5 days',
      antibiotics: 'If increased sputum + purulence: Azithromycin or Doxycycline',
      oxygen: 'Target SpO2 88-92%'
    }
  };

  // Calculator functions
  const calculators = {
    crcl: {
      name: 'Cockcroft-Gault (CrCl)',
      inputs: ['age', 'weight', 'creatinine', 'sex'],
      calculate: (inputs) => {
        const { age, weight, creatinine, sex } = inputs;
        if (!age || !weight || !creatinine) return null;
        let crcl = ((140 - parseFloat(age)) * parseFloat(weight)) / (72 * parseFloat(creatinine));
        if (sex === 'female') crcl *= 0.85;
        return {
          result: crcl.toFixed(1),
          interpretation: crcl < 30 ? 'Severe renal impairment' : crcl < 60 ? 'Moderate renal impairment' : 'Mild/Normal'
        };
      }
    },
    bmi: {
      name: 'BMI Calculator',
      inputs: ['weight', 'height'],
      calculate: (inputs) => {
        const { weight, height } = inputs;
        if (!weight || !height) return null;
        const bmi = parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2);
        let category = '';
        if (bmi < 18.5) category = 'Underweight - High malnutrition risk';
        else if (bmi < 22) category = 'Low normal - Monitor closely in elderly';
        else if (bmi < 27) category = 'Normal for elderly';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';
        return { result: bmi.toFixed(1), interpretation: category };
      }
    },
    charlson: {
      name: 'Charlson Comorbidity Index',
      inputs: ['age', 'mi', 'chf', 'pvd', 'cvd', 'dementia', 'copd', 'tissue', 'ulcer', 'liver', 'diabetes', 'hemiplegia', 'renal', 'cancer', 'metastatic', 'aids'],
      calculate: (inputs) => {
        let score = 0;
        const age = parseFloat(inputs.age) || 0;
        if (age >= 50 && age < 60) score += 1;
        else if (age >= 60 && age < 70) score += 2;
        else if (age >= 70 && age < 80) score += 3;
        else if (age >= 80) score += 4;
        
        if (inputs.mi === 'yes') score += 1;
        if (inputs.chf === 'yes') score += 1;
        if (inputs.pvd === 'yes') score += 1;
        if (inputs.cvd === 'yes') score += 1;
        if (inputs.dementia === 'yes') score += 1;
        if (inputs.copd === 'yes') score += 1;
        if (inputs.tissue === 'yes') score += 1;
        if (inputs.ulcer === 'yes') score += 1;
        if (inputs.liver === 'mild') score += 1;
        else if (inputs.liver === 'severe') score += 3;
        if (inputs.diabetes === 'uncomplicated') score += 1;
        else if (inputs.diabetes === 'complicated') score += 2;
        if (inputs.hemiplegia === 'yes') score += 2;
        if (inputs.renal === 'yes') score += 2;
        if (inputs.cancer === 'yes') score += 2;
        if (inputs.metastatic === 'yes') score += 6;
        if (inputs.aids === 'yes') score += 6;
        
        const mortality = score === 0 ? '12% 1-year mortality' :
                         score <= 2 ? '26% 1-year mortality' :
                         score <= 4 ? '52% 1-year mortality' :
                         '85% 1-year mortality';
        
        return { result: score, interpretation: mortality };
      }
    }
  };

  // Filter medications based on search
  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate quiz score
  const calculateQuizScore = () => {
    let correct = 0;
    boardQuestions.forEach(q => {
      if (answeredQuestions[q.id] === q.answer) correct++;
    });
    setQuizScore(correct);
  };

  // Handle calculator input
  const handleCalculatorInput = (field, value) => {
    setCalculatorInputs({ ...calculatorInputs, [field]: value });
  };

  // Admin login check
  if (showAdmin && password !== 'geriatrics2024') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setPassword(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button onClick={() => setShowAdmin(false)} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (showAdmin && password === 'geriatrics2024') {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1>Admin Dashboard</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>Database Status</h3>
              <p>Medications: {medications.length} entries</p>
              <p>Board Questions: {boardQuestions.length} questions</p>
              <p>Clinical Pearls: {clinicalPearls.length} pearls</p>
              <p>Calculators: {Object.keys(calculators).length} tools</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>Usage Statistics</h3>
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
              <p>Version: 2.0</p>
              <p>Environment: Production</p>
            </div>
          </div>
          <button 
            onClick={() => { setShowAdmin(false); setPassword(''); }} 
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              {language === 'en' ? 'Geriatrics Platform - Shaare Zedek' : 'פלטפורמת גריאטריה - שערי צדק'}
            </h1>
            <button
              onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
              style={{ padding: '8px 16px', backgroundColor: 'white', color: '#2563eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {language === 'en' ? 'עברית' : 'English'}
            </button>
          </div>
          <nav style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('meds')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'meds' ? 'white' : 'transparent',
                color: activeTab === 'meds' ? '#2563eb' : 'white',
                border: '1px solid white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
              {language === 'en' ? 'Medications' : 'תרופות'}
            </button>
            <button
              onClick={() => setActiveTab('board')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'board' ? 'white' : 'transparent',
                color: activeTab === 'board' ? '#2563eb' : 'white',
                border: '1px solid white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
              {language === 'en' ? 'Board Review' : 'מבחני התמחות'}
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'tools' ? 'white' : 'transparent',
                color: activeTab === 'tools' ? '#2563eb' : 'white',
                border: '1px solid white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
              {language === 'en' ? 'Clinical Tools' : 'כלים קליניים'}
            </button>
            <button
              onClick={() => setActiveTab('pearls')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'pearls' ? 'white' : 'transparent',
                color: activeTab === 'pearls' ? '#2563eb' : 'white',
                border: '1px solid white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
              {language === 'en' ? 'Clinical Pearls' : 'פנינים קליניות'}
            </button>
            <button
              onClick={() => setActiveTab('references')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'references' ? 'white' : 'transparent',
                color: activeTab === 'references' ? '#2563eb' : 'white',
                border: '1px solid white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
              {language === 'en' ? 'References' : 'מקורות'}
            </button>
            <button
              onClick={() => setShowAdmin(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
              Admin
            </button>
          </nav>
        </div>
      </header>

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Medications Tab */}
        {activeTab === 'meds' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder={language === 'en' ? 'Search medications...' : 'חיפוש תרופות...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>
              {language === 'en' ? 'Geriatric Medication Guide' : 'מדריך תרופות גריאטרי'}
            </h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {filteredMedications.map(med => (
                <div key={med.id} style={{
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: '4px solid #2563eb'
                }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>
                    {med.name} ({med.heName}) - {med.brand}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', fontSize: '14px' }}>
                    <div><strong>Class:</strong> {med.class}</div>
                    <div><strong>Dose:</strong> {med.dose}</div>
                    <div><strong>Indication:</strong> {med.indication}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Beers Criteria:</strong> {med.beers}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Renal Dosing:</strong> {med.renal}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Drug Interactions:</strong> {med.interactions}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Side Effects:</strong> {med.sideEffects}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Monitoring:</strong> {med.monitoring}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Board Review Tab */}
        {activeTab === 'board' && (
          <div>
            <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>
              {language === 'en' ? 'Board Review Questions' : 'שאלות למבחן התמחות'}
            </h2>
            {boardQuestions.map((q, idx) => (
              <div key={q.id} style={{
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: answeredQuestions[q.id] !== undefined ? '2px solid #10b981' : '2px solid transparent'
              }}>
                <h3 style={{ color: '#1f2937' }}>Question {idx + 1}</h3>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>{q.question}</p>
                {q.options.map((opt, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={i}
                        checked={answeredQuestions[q.id] === i}
                        onChange={() => setAnsweredQuestions({ ...answeredQuestions, [q.id]: i })}
                        style={{ marginRight: '10px' }}
                      />
                      <span>{String.fromCharCode(65 + i)}) {opt}</span>
                    </label>
                  </div>
                ))}
                {answeredQuestions[q.id] !== undefined && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: answeredQuestions[q.id] === q.answer ? '#d1fae5' : '#fee2e2',
                    borderRadius: '4px'
                  }}>
                    <strong>{answeredQuestions[q.id] === q.answer ? '✓ Correct!' : '✗ Incorrect'}</strong>
                    <p style={{ marginTop: '5px' }}><strong>Answer:</strong> {String.fromCharCode(65 + q.answer)}) {q.options[q.answer]}</p>
                    <p><strong>Explanation:</strong> {q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <button
                onClick={calculateQuizScore}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>
                Calculate Score
              </button>
              {quizScore > 0 && (
                <p style={{ marginTop: '15px', fontSize: '20px', fontWeight: 'bold' }}>
                  Score: {quizScore}/{boardQuestions.length} ({Math.round((quizScore / boardQuestions.length) * 100)}%)
                </p>
              )}
            </div>
          </div>
        )}

        {/* Clinical Tools Tab */}
        {activeTab === 'tools' && (
          <div>
            <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>
              {language === 'en' ? 'Clinical Calculators' : 'מחשבונים קליניים'}
            </h2>
            {!selectedCalculator ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {Object.entries(calculators).map(([key, calc]) => (
                  <div key={key} style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                    onClick={() => { setSelectedCalculator(key); setCalculatorInputs({}); }}>
                    <h3>{calc.name}</h3>
                    <p style={{ color: '#6b7280' }}>Click to calculate</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                <h3>{calculators[selectedCalculator].name}</h3>
                <div style={{ marginTop: '20px' }}>
                  {selectedCalculator === 'crcl' && (
                    <>
                      <input
                        type="number"
                        placeholder="Age (years)"
                        onChange={(e) => handleCalculatorInput('age', e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <input
                        type="number"
                        placeholder="Weight (kg)"
                        onChange={(e) => handleCalculatorInput('weight', e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Creatinine (mg/dL)"
                        onChange={(e) => handleCalculatorInput('creatinine', e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <select
                        onChange={(e) => handleCalculatorInput('sex', e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <option value="">Select Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </>
                  )}
                  {selectedCalculator === 'bmi' && (
                    <>
                      <input
                        type="number"
                        placeholder="Weight (kg)"
                        onChange={(e) => handleCalculatorInput('weight', e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <input
                        type="number"
                        placeholder="Height (cm)"
                        onChange={(e) => handleCalculatorInput('height', e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </>
                  )}
                  {selectedCalculator === 'charlson' && (
                    <>
                      <input
                        type="number"
                        placeholder="Age (years)"
                        onChange={(e) => handleCalculatorInput('age', e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <div style={{ marginBottom: '10px' }}>
                        <label><input type="checkbox" onChange={(e) => handleCalculatorInput('mi', e.target.checked ? 'yes' : 'no')} /> Myocardial Infarction</label>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label><input type="checkbox" onChange={(e) => handleCalculatorInput('chf', e.target.checked ? 'yes' : 'no')} /> Congestive Heart Failure</label>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label><input type="checkbox" onChange={(e) => handleCalculatorInput('pvd', e.target.checked ? 'yes' : 'no')} /> Peripheral Vascular Disease</label>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label><input type="checkbox" onChange={(e) => handleCalculatorInput('dementia', e.target.checked ? 'yes' : 'no')} /> Dementia</label>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label><input type="checkbox" onChange={(e) => handleCalculatorInput('copd', e.target.checked ? 'yes' : 'no')} /> COPD</label>
                      </div>
                      <select onChange={(e) => handleCalculatorInput('diabetes', e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <option value="">Diabetes</option>
                        <option value="none">None</option>
                        <option value="uncomplicated">Uncomplicated</option>
                        <option value="complicated">End-organ damage</option>
                      </select>
                    </>
                  )}
                  <button
                    onClick={() => {
                      const result = calculators[selectedCalculator].calculate(calculatorInputs);
                      if (result) {
                        alert(`Result: ${result.result}\n${result.interpretation}`);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}>
                    Calculate
                  </button>
                  <button
                    onClick={() => setSelectedCalculator(null)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '10px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                    Back to Tools
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Clinical Pearls Tab */}
        {activeTab === 'pearls' && (
          <div>
            <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>
              {language === 'en' ? 'Clinical Pearls' : 'פנינים קליניות'}
            </h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {clinicalPearls.map((pearl, idx) => (
                <div key={idx} style={{
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: '4px solid #10b981'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      {pearl.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '16px', marginBottom: '10px' }}>{pearl.pearl}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}><strong>Evidence:</strong> {pearl.evidence}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References Tab */}
        {activeTab === 'references' && (
          <div>
            <h2 style={{color:'#1f2937', marginBottom:'20px'}}>Quick References</h2>
            
            {/* Beers Criteria */}
            <div style={{marginBottom:'30px', padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
              <h3>Beers Criteria - Medications to Avoid</h3>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'15px', marginTop:'15px'}}>
                <div>
                  <h4 style={{color:'#dc2626'}}>Anticholinergics</h4>
                  <ul style={{fontSize:'14px'}}>
                    {beersCriteria.anticholinergics.map(drug => <li key={drug}>{drug}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{color:'#dc2626'}}>Benzodiazepines</h4>
                  <ul style={{fontSize:'14px'}}>
                    {beersCriteria.benzodiazepines.map(drug => <li key={drug}>{drug}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{color:'#dc2626'}}>Other High Risk</h4>
                  <ul style={{fontSize:'14px'}}>
                    {beersCriteria.other.map(drug => <li key={drug}>{drug}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Geriatric Syndromes */}
            <div style={{marginBottom:'30px', padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
              <h3>Geriatric Syndromes</h3>
              <div style={{display:'grid', gap:'15px', marginTop:'15px'}}>
                {geriatricSyndromes.map(syndrome => (
                  <div key={syndrome.name} style={{padding:'15px', backgroundColor:'#f9fafb', borderRadius:'4px'}}>
                    <h4 style={{margin:'0 0 10px 0', color:'#1f2937'}}>{syndrome.name}</h4>
                    <p><strong>Assessment:</strong> {syndrome.assessment}</p>
                    <p><strong>Interventions:</strong> {syndrome.interventions}</p>
                    <p style={{color:'#dc2626'}}><strong>Red Flags:</strong> {syndrome.redFlags}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab References */}
            <div style={{marginBottom:'30px', padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
              <h3>Lab Values in Elderly</h3>
              {Object.entries(labReferences).map(([category, tests]) => (
                <div key={category} style={{marginBottom:'20px'}}>
                  <h4 style={{textTransform:'capitalize', color:'#2563eb'}}>{category}</h4>
                  <table style={{width:'100%', fontSize:'14px'}}>
                    <tbody>
                      {tests.map(test => (
                        <tr key={test.test}>
                          <td style={{padding:'8px', fontWeight:'bold'}}>{test.test}</td>
                          <td style={{padding:'8px'}}>{test.elderly}</td>
                          <td style={{padding:'8px', color:'#6b7280'}}>{test.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Treatment Protocols */}
            <div style={{padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
              <h3>Treatment Protocols</h3>
              {Object.entries(protocols).map(([condition, protocol]) => (
                <div key={condition} style={{marginBottom:'20px', padding:'15px', backgroundColor:'#f9fafb', borderRadius:'4px'}}>
                  <h4 style={{margin:'0 0 10px 0', color:'#1f2937'}}>{condition}</h4>
                  {Object.entries(protocol).map(([key, value]) => (
                    <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '20px', marginTop: '40px', textAlign: 'center' }}>
        <p>Geriatrics Platform © 2024 - Shaare Zedek Medical Center</p>
        <p style={{ fontSize: '14px', marginTop: '10px', color: '#9ca3af' }}>
          For medical professionals only. Not for patient use.
        </p>
      </footer>
    </div>
  );
};

export default App;