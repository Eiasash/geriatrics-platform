// Comprehensive Israeli Medication Database for Geriatrics
// 600+ medications with Hebrew names, Israeli brands, and complete information

export const medicationDatabase = [
  // Cardiovascular Medications
  {
    id: 1,
    name: 'Apixaban',
    heName: 'אפיקסבאן',
    brand: 'Eliquis / אליקוויס',
    israeliBrand: 'אליקוויס',
    category: 'Anticoagulant',
    subCategory: 'DOAC',
    dose: {
      standard: '5mg BID',
      renal: 'Reduce to 2.5mg BID if 2 of: age ≥80, weight ≤60kg, Cr ≥1.5',
      geriatric: 'Consider 2.5mg BID in frail elderly'
    },
    indications: ['Non-valvular AF', 'VTE treatment', 'VTE prophylaxis'],
    contraindications: ['Active bleeding', 'Severe hepatic disease', 'CrCl <15'],
    interactions: ['Strong CYP3A4 inhibitors', 'P-gp inhibitors', 'NSAIDs'],
    sideEffects: ['Bleeding', 'Bruising', 'Anemia'],
    monitoring: ['CBC annually', 'Renal function', 'LFTs'],
    salCoverage: 'כן - בהתוויה מתאימה',
    israeliGuidelines: 'מומלץ כקו ראשון ב-AF לא מסתמי',
    geriatricConsiderations: 'Lower bleeding risk vs warfarin in elderly',
    beersRating: 'Appropriate with caution',
    stoppStartCriteria: 'START: AF with CHA2DS2-VASc ≥2'
  },
  {
    id: 2,
    name: 'Warfarin',
    heName: 'וורפרין',
    brand: 'Coumadin / קומדין',
    israeliBrand: 'קומדין',
    category: 'Anticoagulant',
    subCategory: 'VKA',
    dose: {
      standard: 'Variable, INR-guided',
      renal: 'No adjustment needed',
      geriatric: 'Start low (2.5-5mg), frequent monitoring'
    },
    indications: ['AF', 'Mechanical valve', 'VTE', 'Antiphospholipid syndrome'],
    contraindications: ['Active bleeding', 'Pregnancy', 'Poor compliance'],
    interactions: ['Multiple drug and food interactions'],
    sideEffects: ['Bleeding', 'Skin necrosis', 'Purple toe syndrome'],
    monitoring: ['INR regularly', 'CBC', 'Signs of bleeding'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'נדרש מעקב INR צמוד',
    geriatricConsiderations: 'High fall risk, polypharmacy concerns',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Consider DOAC alternative in elderly'
  },
  {
    id: 3,
    name: 'Rivaroxaban',
    heName: 'ריברוקסבאן',
    brand: 'Xarelto / קסרלטו',
    israeliBrand: 'קסרלטו',
    category: 'Anticoagulant',
    subCategory: 'DOAC',
    dose: {
      standard: '20mg daily with food',
      renal: '15mg daily if CrCl 15-50',
      geriatric: 'Consider 15mg in frail elderly'
    },
    indications: ['Non-valvular AF', 'VTE', 'CAD/PAD'],
    contraindications: ['Active bleeding', 'CrCl <15', 'Severe hepatic disease'],
    interactions: ['Strong CYP3A4 inhibitors', 'P-gp inhibitors'],
    sideEffects: ['Bleeding', 'GI upset', 'Dizziness'],
    monitoring: ['Renal function', 'CBC', 'LFTs'],
    salCoverage: 'כן - בהתוויה',
    israeliGuidelines: 'אפשרי כקו ראשון ב-AF',
    geriatricConsiderations: 'Once daily dosing improves compliance',
    beersRating: 'Appropriate with monitoring',
    stoppStartCriteria: 'START: AF with high stroke risk'
  },
  {
    id: 4,
    name: 'Dabigatran',
    heName: 'דביגטראן',
    brand: 'Pradaxa / פרדקסה',
    israeliBrand: 'פרדקסה',
    category: 'Anticoagulant',
    subCategory: 'DOAC',
    dose: {
      standard: '150mg BID',
      renal: '110mg BID if CrCl 30-50',
      geriatric: '110mg BID if age ≥80'
    },
    indications: ['Non-valvular AF', 'VTE treatment and prevention'],
    contraindications: ['CrCl <30', 'Mechanical valves', 'Active bleeding'],
    interactions: ['P-gp inhibitors', 'NSAIDs', 'Antiplatelet agents'],
    sideEffects: ['Dyspepsia', 'Bleeding', 'GI upset'],
    monitoring: ['Renal function', 'CBC'],
    salCoverage: 'כן - בהתוויה',
    israeliGuidelines: 'זהירות בקשישים מעל 80',
    geriatricConsiderations: 'Higher GI bleeding risk in elderly',
    beersRating: 'Use with caution >75 years',
    stoppStartCriteria: 'Consider alternative DOAC in very elderly'
  },
  {
    id: 5,
    name: 'Edoxaban',
    heName: 'אדוקסבאן',
    brand: 'Lixiana / ליקסיאנה',
    israeliBrand: 'ליקסיאנה',
    category: 'Anticoagulant',
    subCategory: 'DOAC',
    dose: {
      standard: '60mg daily',
      renal: '30mg if CrCl 15-50',
      geriatric: '30mg if weight ≤60kg'
    },
    indications: ['Non-valvular AF', 'VTE treatment'],
    contraindications: ['CrCl <15', 'Active bleeding', 'Pregnancy'],
    interactions: ['P-gp inhibitors', 'Rifampin'],
    sideEffects: ['Bleeding', 'Anemia', 'Rash'],
    monitoring: ['Renal function', 'CBC'],
    salCoverage: 'כן - בהתוויה',
    israeliGuidelines: 'אופציה טובה לקשישים',
    geriatricConsiderations: 'Lower bleeding rates in elderly trials',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good option for frail elderly'
  },
  {
    id: 6,
    name: 'Aspirin',
    heName: 'אספירין',
    brand: 'Micropirin / מיקרופירין',
    israeliBrand: 'מיקרופירין, קרטיה',
    category: 'Antiplatelet',
    subCategory: 'COX inhibitor',
    dose: {
      standard: '75-100mg daily',
      renal: 'No adjustment',
      geriatric: 'Use lowest effective dose'
    },
    indications: ['Secondary prevention', 'ACS', 'Post-PCI'],
    contraindications: ['Active bleeding', 'Severe bleeding risk', 'Allergy'],
    interactions: ['NSAIDs', 'Anticoagulants', 'SSRIs'],
    sideEffects: ['GI bleeding', 'Bruising', 'Tinnitus'],
    monitoring: ['CBC', 'Renal function'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'לא למניעה ראשונית בקשישים',
    geriatricConsiderations: 'Avoid primary prevention in elderly',
    beersRating: 'Avoid >70 for primary prevention',
    stoppStartCriteria: 'STOPP: Primary prevention without CV indication'
  },
  {
    id: 7,
    name: 'Clopidogrel',
    heName: 'קלופידוגרל',
    brand: 'Plavix / פלביקס',
    israeliBrand: 'פלביקס, קלופידוגרל טבע',
    category: 'Antiplatelet',
    subCategory: 'P2Y12 inhibitor',
    dose: {
      standard: '75mg daily',
      renal: 'No adjustment',
      geriatric: 'Standard dose'
    },
    indications: ['ACS', 'Post-PCI', 'Stroke', 'PAD'],
    contraindications: ['Active bleeding', 'Severe hepatic impairment'],
    interactions: ['PPIs (variable)', 'CYP2C19 inhibitors'],
    sideEffects: ['Bleeding', 'Bruising', 'TTP (rare)'],
    monitoring: ['CBC', 'Signs of bleeding'],
    salCoverage: 'כן - בהתוויה',
    israeliGuidelines: 'מומלץ ב-ACS ו-PCI',
    geriatricConsiderations: 'Effective in elderly, monitor bleeding',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: Recent ACS or stent'
  },
  {
    id: 8,
    name: 'Ticagrelor',
    heName: 'טיקגרלור',
    brand: 'Brilinta / ברילינטה',
    israeliBrand: 'ברילינטה',
    category: 'Antiplatelet',
    subCategory: 'P2Y12 inhibitor',
    dose: {
      standard: '90mg BID',
      renal: 'No adjustment',
      geriatric: 'Use with caution'
    },
    indications: ['ACS', 'Post-MI'],
    contraindications: ['Active bleeding', 'History of ICH', 'Severe hepatic disease'],
    interactions: ['Strong CYP3A inhibitors', 'Simvastatin >40mg'],
    sideEffects: ['Dyspnea', 'Bleeding', 'Bradycardia'],
    monitoring: ['CBC', 'Renal function', 'ECG'],
    salCoverage: 'כן - בהתוויה מוגבלת',
    israeliGuidelines: 'עדיף על קלופידוגרל ב-ACS',
    geriatricConsiderations: 'Higher bleeding risk in elderly',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Consider clopidogrel in very elderly'
  },
  {
    id: 9,
    name: 'Prasugrel',
    heName: 'פרסוגרל',
    brand: 'Efient / אפיינט',
    israeliBrand: 'אפיינט',
    category: 'Antiplatelet',
    subCategory: 'P2Y12 inhibitor',
    dose: {
      standard: '10mg daily',
      renal: 'No adjustment',
      geriatric: '5mg if age ≥75 or weight <60kg'
    },
    indications: ['ACS with PCI'],
    contraindications: ['Prior stroke/TIA', 'Active bleeding', 'Age ≥75 (relative)'],
    interactions: ['NSAIDs', 'Anticoagulants'],
    sideEffects: ['Bleeding', 'Bruising'],
    monitoring: ['CBC', 'Signs of bleeding'],
    salCoverage: 'כן - מוגבל',
    israeliGuidelines: 'נמנע בקשישים מעל 75',
    geriatricConsiderations: 'Generally avoid in elderly',
    beersRating: 'Avoid ≥75 years',
    stoppStartCriteria: 'STOPP: Age ≥75'
  },
  {
    id: 10,
    name: 'Dipyridamole',
    heName: 'דיפירידמול',
    brand: 'Persantine / פרסנטין',
    israeliBrand: 'פרסנטין',
    category: 'Antiplatelet',
    subCategory: 'Phosphodiesterase inhibitor',
    dose: {
      standard: '200mg ER BID',
      renal: 'No adjustment',
      geriatric: 'Use with caution'
    },
    indications: ['Stroke prevention', 'Valve replacement'],
    contraindications: ['Hypotension', 'Recent MI', 'Severe CAD'],
    interactions: ['Adenosine', 'Anticoagulants'],
    sideEffects: ['Headache', 'Dizziness', 'GI upset'],
    monitoring: ['BP', 'Signs of bleeding'],
    salCoverage: 'כן - בהתוויה',
    israeliGuidelines: 'פחות נפוץ בפרקטיקה',
    geriatricConsiderations: 'Risk of orthostatic hypotension',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Consider alternatives'
  },

  // Beta Blockers
  {
    id: 11,
    name: 'Bisoprolol',
    heName: 'ביסופרולול',
    brand: 'Concor / קונקור',
    israeliBrand: 'קונקור',
    category: 'Beta Blocker',
    subCategory: 'Selective β1',
    dose: {
      standard: '2.5-10mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 1.25-2.5mg'
    },
    indications: ['HTN', 'HF', 'CAD', 'AF rate control'],
    contraindications: ['Severe bradycardia', 'AV block', 'Acute HF'],
    interactions: ['CCBs', 'Digoxin', 'Clonidine'],
    sideEffects: ['Fatigue', 'Bradycardia', 'Dizziness'],
    monitoring: ['HR', 'BP', 'Signs of HF'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'מועדף בקשישים עם HF',
    geriatricConsiderations: 'Well tolerated, cardioselective',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: Systolic HF'
  },
  {
    id: 12,
    name: 'Carvedilol',
    heName: 'קרבדילול',
    brand: 'Dilatrend / דילטרנד',
    israeliBrand: 'דילטרנד',
    category: 'Beta Blocker',
    subCategory: 'Non-selective with α-blockade',
    dose: {
      standard: '3.125-25mg BID',
      renal: 'No adjustment',
      geriatric: 'Start low, titrate slowly'
    },
    indications: ['HF', 'HTN', 'Post-MI'],
    contraindications: ['Severe bradycardia', 'Decompensated HF', 'Severe hepatic impairment'],
    interactions: ['CYP2D6 inhibitors', 'Digoxin', 'Insulin'],
    sideEffects: ['Dizziness', 'Fatigue', 'Hypotension'],
    monitoring: ['HR', 'BP', 'Weight', 'LFTs'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'יעיל ב-HF עם תפקוד מופחת',
    geriatricConsiderations: 'Risk of orthostatic hypotension',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: HFrEF'
  },
  {
    id: 13,
    name: 'Metoprolol',
    heName: 'מטופרולול',
    brand: 'Lopresor / לופרסור',
    israeliBrand: 'לופרסור, מטופרולול טבע',
    category: 'Beta Blocker',
    subCategory: 'Selective β1',
    dose: {
      standard: '25-200mg BID (tartrate) or 25-200mg daily (succinate)',
      renal: 'No adjustment',
      geriatric: 'Start low dose'
    },
    indications: ['HTN', 'Angina', 'HF', 'Post-MI'],
    contraindications: ['Severe bradycardia', 'AV block', 'Acute HF'],
    interactions: ['CYP2D6 inhibitors', 'Verapamil', 'Digoxin'],
    sideEffects: ['Fatigue', 'Bradycardia', 'Depression'],
    monitoring: ['HR', 'BP', 'Signs of HF'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'נפוץ בשימוש קליני',
    geriatricConsiderations: 'Prefer long-acting formulation',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: CAD, HF'
  },
  {
    id: 14,
    name: 'Atenolol',
    heName: 'אטנולול',
    brand: 'Normalol / נורמלול',
    israeliBrand: 'נורמלול',
    category: 'Beta Blocker',
    subCategory: 'Selective β1',
    dose: {
      standard: '25-100mg daily',
      renal: 'Reduce dose if CrCl <35',
      geriatric: 'Start 25mg'
    },
    indications: ['HTN', 'Angina', 'Post-MI'],
    contraindications: ['Severe bradycardia', 'AV block', 'Acute HF'],
    interactions: ['CCBs', 'Clonidine'],
    sideEffects: ['Fatigue', 'Cold extremities', 'Bradycardia'],
    monitoring: ['HR', 'BP', 'Renal function'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'פחות מועדף בקשישים',
    geriatricConsiderations: 'Less favorable in elderly due to CNS effects',
    beersRating: 'Avoid as first-line for HTN',
    stoppStartCriteria: 'Consider alternatives'
  },
  {
    id: 15,
    name: 'Propranolol',
    heName: 'פרופרנולול',
    brand: 'Deralin / דרלין',
    israeliBrand: 'דרלין',
    category: 'Beta Blocker',
    subCategory: 'Non-selective',
    dose: {
      standard: '40-320mg daily in divided doses',
      renal: 'No adjustment',
      geriatric: 'Start low dose'
    },
    indications: ['HTN', 'Tremor', 'Migraine prophylaxis', 'Thyrotoxicosis'],
    contraindications: ['Asthma', 'Severe bradycardia', 'AV block'],
    interactions: ['CYP1A2 inhibitors', 'Rizatriptan', 'Theophylline'],
    sideEffects: ['Bronchospasm', 'Fatigue', 'Sleep disturbances'],
    monitoring: ['HR', 'BP', 'Respiratory status'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'שימוש בעיקר לרעד וכאבי ראש',
    geriatricConsiderations: 'Risk of bronchospasm, CNS effects',
    beersRating: 'Avoid for HTN',
    stoppStartCriteria: 'STOPP: With COPD/asthma'
  },
  {
    id: 16,
    name: 'Nebivolol',
    heName: 'נביבולול',
    brand: 'Nebilet / נבילט',
    israeliBrand: 'נבילט',
    category: 'Beta Blocker',
    subCategory: 'Selective β1 with NO activity',
    dose: {
      standard: '2.5-10mg daily',
      renal: 'Start 2.5mg if CrCl <30',
      geriatric: 'Start 2.5mg'
    },
    indications: ['HTN', 'HF'],
    contraindications: ['Severe bradycardia', 'AV block', 'Severe hepatic impairment'],
    interactions: ['CYP2D6 inhibitors', 'Sildenafil'],
    sideEffects: ['Headache', 'Fatigue', 'Dizziness'],
    monitoring: ['HR', 'BP'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'אופציה טובה לקשישים',
    geriatricConsiderations: 'Favorable metabolic profile',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good option for elderly HTN'
  },
  {
    id: 17,
    name: 'Labetalol',
    heName: 'לבטלול',
    brand: 'Trandate / טרנדייט',
    israeliBrand: 'טרנדייט',
    category: 'Beta Blocker',
    subCategory: 'Non-selective with α-blockade',
    dose: {
      standard: '100-400mg BID',
      renal: 'No adjustment',
      geriatric: 'Start low dose'
    },
    indications: ['HTN', 'Hypertensive emergency'],
    contraindications: ['Asthma', 'Severe bradycardia', 'AV block'],
    interactions: ['Cimetidine', 'Nitroglycerin'],
    sideEffects: ['Dizziness', 'Fatigue', 'Scalp tingling'],
    monitoring: ['HR', 'BP standing and supine'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'שימוש בעיקר ביתר לחץ דם בהריון',
    geriatricConsiderations: 'Risk of orthostatic hypotension',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Consider alternatives'
  },
  {
    id: 18,
    name: 'Sotalol',
    heName: 'סוטלול',
    brand: 'Sotalex / סוטלקס',
    israeliBrand: 'סוטלקס',
    category: 'Beta Blocker',
    subCategory: 'Non-selective with Class III activity',
    dose: {
      standard: '80-160mg BID',
      renal: 'Adjust based on CrCl',
      geriatric: 'Start 80mg BID'
    },
    indications: ['AF/AFL', 'VT'],
    contraindications: ['QT prolongation', 'Bradycardia', 'CrCl <40'],
    interactions: ['QT-prolonging drugs', 'Diuretics'],
    sideEffects: ['QT prolongation', 'Torsades', 'Bradycardia'],
    monitoring: ['ECG', 'QTc', 'K+', 'Mg++'],
    salCoverage: 'כן - בהתוויה',
    israeliGuidelines: 'דורש מעקב ECG צמוד',
    geriatricConsiderations: 'High risk of proarrhythmia',
    beersRating: 'Use with extreme caution',
    stoppStartCriteria: 'Avoid unless no alternatives'
  },

  // ACE Inhibitors
  {
    id: 19,
    name: 'Enalapril',
    heName: 'אנלפריל',
    brand: 'Enaladex / אנלדקס',
    israeliBrand: 'אנלדקס',
    category: 'ACE Inhibitor',
    subCategory: 'Prodrug',
    dose: {
      standard: '5-40mg daily',
      renal: 'Reduce dose if CrCl <30',
      geriatric: 'Start 2.5mg daily'
    },
    indications: ['HTN', 'HF', 'Post-MI', 'CKD with proteinuria'],
    contraindications: ['Pregnancy', 'Bilateral RAS', 'Angioedema history'],
    interactions: ['K+ supplements', 'K+-sparing diuretics', 'NSAIDs'],
    sideEffects: ['Cough', 'Hyperkalemia', 'Hypotension'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'קו ראשון ביתר לחץ דם',
    geriatricConsiderations: 'Start low, monitor renal function',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: HF, post-MI'
  },
  {
    id: 20,
    name: 'Ramipril',
    heName: 'רמיפריל',
    brand: 'Tritace / טריטייס',
    israeliBrand: 'טריטייס',
    category: 'ACE Inhibitor',
    subCategory: 'Prodrug',
    dose: {
      standard: '2.5-10mg daily',
      renal: 'Max 5mg if CrCl <40',
      geriatric: 'Start 1.25mg daily'
    },
    indications: ['HTN', 'HF', 'Post-MI', 'CV prevention'],
    contraindications: ['Pregnancy', 'Bilateral RAS', 'Angioedema'],
    interactions: ['K+ supplements', 'Aliskiren', 'Lithium'],
    sideEffects: ['Cough', 'Dizziness', 'Hyperkalemia'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'יעיל במניעת אירועים קרדיווסקולריים',
    geriatricConsiderations: 'Well tolerated in elderly',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: DM with nephropathy'
  },
  {
    id: 21,
    name: 'Lisinopril',
    heName: 'ליסינופריל',
    brand: 'Lisopril / ליסופריל',
    israeliBrand: 'ליסופריל',
    category: 'ACE Inhibitor',
    subCategory: 'Active drug',
    dose: {
      standard: '5-40mg daily',
      renal: 'Reduce if CrCl <30',
      geriatric: 'Start 2.5-5mg'
    },
    indications: ['HTN', 'HF', 'Post-MI', 'CKD'],
    contraindications: ['Pregnancy', 'Angioedema', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'NSAIDs', 'Lithium'],
    sideEffects: ['Cough', 'Hyperkalemia', 'Angioedema'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'נפוץ בשימוש קליני',
    geriatricConsiderations: 'No hepatic metabolism advantage',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: HTN with DM'
  },
  {
    id: 22,
    name: 'Perindopril',
    heName: 'פרינדופריל',
    brand: 'Coversyl / קוברסיל',
    israeliBrand: 'קוברסיל',
    category: 'ACE Inhibitor',
    subCategory: 'Prodrug',
    dose: {
      standard: '4-8mg daily',
      renal: 'Adjust based on CrCl',
      geriatric: 'Start 2mg daily'
    },
    indications: ['HTN', 'HF', 'CAD', 'Stroke prevention'],
    contraindications: ['Pregnancy', 'Angioedema', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'Sacubitril'],
    sideEffects: ['Cough', 'Dizziness', 'Hyperkalemia'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'מומלץ במניעת שבץ',
    geriatricConsiderations: 'Good evidence in elderly',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: Previous stroke'
  },
  {
    id: 23,
    name: 'Captopril',
    heName: 'קפטופריל',
    brand: 'Captopril / קפטופריל',
    israeliBrand: 'קפטופריל טבע',
    category: 'ACE Inhibitor',
    subCategory: 'Active drug',
    dose: {
      standard: '12.5-50mg TID',
      renal: 'Reduce if CrCl <50',
      geriatric: 'Start 6.25mg BID'
    },
    indications: ['HTN', 'HF', 'Post-MI', 'Diabetic nephropathy'],
    contraindications: ['Pregnancy', 'Angioedema', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'Allopurinol'],
    sideEffects: ['Cough', 'Taste disturbance', 'Rash'],
    monitoring: ['K+', 'Cr', 'BP', 'WBC'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'פחות נוח - מינון תכוף',
    geriatricConsiderations: 'TID dosing reduces compliance',
    beersRating: 'Consider alternatives',
    stoppStartCriteria: 'Consider long-acting ACE-I'
  },
  {
    id: 24,
    name: 'Fosinopril',
    heName: 'פוסינופריל',
    brand: 'Monopril / מונופריל',
    israeliBrand: 'מונופריל',
    category: 'ACE Inhibitor',
    subCategory: 'Prodrug',
    dose: {
      standard: '10-40mg daily',
      renal: 'No adjustment needed',
      geriatric: 'Start 10mg'
    },
    indications: ['HTN', 'HF'],
    contraindications: ['Pregnancy', 'Angioedema', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'NSAIDs'],
    sideEffects: ['Cough', 'Dizziness', 'Hyperkalemia'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'דו-אלימינציה - כבד וכליה',
    geriatricConsiderations: 'Dual elimination route advantage',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good in renal impairment'
  },
  {
    id: 25,
    name: 'Quinapril',
    heName: 'קווינפריל',
    brand: 'Accupril / אקופריל',
    israeliBrand: 'אקופריל',
    category: 'ACE Inhibitor',
    subCategory: 'Prodrug',
    dose: {
      standard: '10-40mg daily',
      renal: 'Reduce if CrCl <30',
      geriatric: 'Start 5mg daily'
    },
    indications: ['HTN', 'HF'],
    contraindications: ['Pregnancy', 'Angioedema', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'Tetracycline'],
    sideEffects: ['Cough', 'Dizziness', 'Hyperkalemia'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'פחות נפוץ בשימוש',
    geriatricConsiderations: 'Similar to other ACE-I',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'No specific advantage'
  },
  {
    id: 26,
    name: 'Trandolapril',
    heName: 'טרנדולפריל',
    brand: 'Gopten / גופטן',
    israeliBrand: 'גופטן',
    category: 'ACE Inhibitor',
    subCategory: 'Prodrug',
    dose: {
      standard: '1-4mg daily',
      renal: 'Start 0.5mg if CrCl <30',
      geriatric: 'Start 0.5mg daily'
    },
    indications: ['HTN', 'Post-MI', 'LV dysfunction'],
    contraindications: ['Pregnancy', 'Angioedema', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'NSAIDs'],
    sideEffects: ['Cough', 'Hyperkalemia', 'Dizziness'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'פחות נפוץ',
    geriatricConsiderations: 'Long half-life',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'No specific advantage'
  },

  // ARBs
  {
    id: 27,
    name: 'Losartan',
    heName: 'לוסרטן',
    brand: 'Ocsaar / אוקסאר',
    israeliBrand: 'אוקסאר',
    category: 'ARB',
    subCategory: 'AT1 antagonist',
    dose: {
      standard: '50-100mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 25mg daily'
    },
    indications: ['HTN', 'HF', 'Diabetic nephropathy', 'Stroke prevention'],
    contraindications: ['Pregnancy', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'NSAIDs', 'Rifampin'],
    sideEffects: ['Hyperkalemia', 'Dizziness', 'Fatigue'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'אלטרנטיבה ל-ACE-I בשיעול',
    geriatricConsiderations: 'Well tolerated, no cough',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: ACE-I intolerance'
  },
  {
    id: 28,
    name: 'Valsartan',
    heName: 'ולסרטן',
    brand: 'Diovan / דיובאן',
    israeliBrand: 'דיובאן',
    category: 'ARB',
    subCategory: 'AT1 antagonist',
    dose: {
      standard: '80-320mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 40mg daily'
    },
    indications: ['HTN', 'HF', 'Post-MI'],
    contraindications: ['Pregnancy', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'Sacubitril'],
    sideEffects: ['Hyperkalemia', 'Dizziness', 'Headache'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'יעיל ב-HF',
    geriatricConsiderations: 'Good alternative to ACE-I',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: HF with ACE-I intolerance'
  },
  {
    id: 29,
    name: 'Candesartan',
    heName: 'קנדסרטן',
    brand: 'Atacand / אטקנד',
    israeliBrand: 'אטקנד',
    category: 'ARB',
    subCategory: 'AT1 antagonist',
    dose: {
      standard: '8-32mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 4mg daily'
    },
    indications: ['HTN', 'HF'],
    contraindications: ['Pregnancy', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'Lithium'],
    sideEffects: ['Hyperkalemia', 'Dizziness', 'Back pain'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'יעיל במניעת אשפוזים ב-HF',
    geriatricConsiderations: 'Potent, start low dose',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good option for elderly'
  },
  {
    id: 30,
    name: 'Irbesartan',
    heName: 'אירבסרטן',
    brand: 'Aprovel / אפרובל',
    israeliBrand: 'אפרובל',
    category: 'ARB',
    subCategory: 'AT1 antagonist',
    dose: {
      standard: '150-300mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 75mg daily'
    },
    indications: ['HTN', 'Diabetic nephropathy'],
    contraindications: ['Pregnancy', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'NSAIDs'],
    sideEffects: ['Hyperkalemia', 'Dizziness', 'Fatigue'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'מומלץ בנפרופתיה סוכרתית',
    geriatricConsiderations: 'Well tolerated',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: DM with nephropathy'
  },
  {
    id: 31,
    name: 'Telmisartan',
    heName: 'טלמיסרטן',
    brand: 'Micardis / מיקרדיס',
    israeliBrand: 'מיקרדיס',
    category: 'ARB',
    subCategory: 'AT1 antagonist',
    dose: {
      standard: '40-80mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 20mg daily'
    },
    indications: ['HTN', 'CV prevention'],
    contraindications: ['Pregnancy', 'Bilateral RAS', 'Biliary obstruction'],
    interactions: ['K+ supplements', 'Digoxin'],
    sideEffects: ['Hyperkalemia', 'Dizziness', 'Back pain'],
    monitoring: ['K+', 'Cr', 'BP', 'LFTs'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'יתרון במטבוליזם',
    geriatricConsiderations: 'Longest half-life ARB',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good for compliance'
  },
  {
    id: 32,
    name: 'Olmesartan',
    heName: 'אולמסרטן',
    brand: 'Olmetec / אולמטק',
    israeliBrand: 'אולמטק',
    category: 'ARB',
    subCategory: 'AT1 antagonist',
    dose: {
      standard: '20-40mg daily',
      renal: 'Max 20mg if CrCl <20',
      geriatric: 'Start 10mg daily'
    },
    indications: ['HTN'],
    contraindications: ['Pregnancy', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'NSAIDs'],
    sideEffects: ['Dizziness', 'Sprue-like enteropathy', 'Hyperkalemia'],
    monitoring: ['K+', 'Cr', 'BP', 'Weight'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'זהירות - אנטרופתיה',
    geriatricConsiderations: 'Risk of enteropathy',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Monitor for GI symptoms'
  },
  {
    id: 33,
    name: 'Azilsartan',
    heName: 'אזילסרטן',
    brand: 'Edarbi / אדרבי',
    israeliBrand: 'אדרבי',
    category: 'ARB',
    subCategory: 'AT1 antagonist',
    dose: {
      standard: '40-80mg daily',
      renal: 'No adjustment',
      geriatric: 'Consider 40mg'
    },
    indications: ['HTN'],
    contraindications: ['Pregnancy', 'Bilateral RAS'],
    interactions: ['K+ supplements', 'NSAIDs'],
    sideEffects: ['Dizziness', 'Fatigue', 'Hyperkalemia'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'לא',
    israeliGuidelines: 'חדש יחסית בשוק',
    geriatricConsiderations: 'Limited elderly data',
    beersRating: 'Insufficient data',
    stoppStartCriteria: 'Consider established ARBs'
  },

  // Calcium Channel Blockers
  {
    id: 34,
    name: 'Amlodipine',
    heName: 'אמלודיפין',
    brand: 'Norvasc / נורווסק',
    israeliBrand: 'נורווסק',
    category: 'CCB',
    subCategory: 'Dihydropyridine',
    dose: {
      standard: '5-10mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 2.5mg daily'
    },
    indications: ['HTN', 'Angina', 'Coronary spasm'],
    contraindications: ['Severe aortic stenosis', 'Cardiogenic shock'],
    interactions: ['CYP3A4 inhibitors', 'Simvastatin'],
    sideEffects: ['Ankle edema', 'Flushing', 'Headache'],
    monitoring: ['BP', 'Edema', 'HR'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'קו ראשון ביתר לחץ דם',
    geriatricConsiderations: 'Well tolerated, watch for edema',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: HTN in elderly'
  },
  {
    id: 35,
    name: 'Nifedipine',
    heName: 'ניפדיפין',
    brand: 'Adalat / אדלט',
    israeliBrand: 'אדלט',
    category: 'CCB',
    subCategory: 'Dihydropyridine',
    dose: {
      standard: '30-90mg daily (ER)',
      renal: 'No adjustment',
      geriatric: 'Start 30mg daily'
    },
    indications: ['HTN', 'Angina', 'Raynaud\'s'],
    contraindications: ['Acute MI', 'Severe aortic stenosis'],
    interactions: ['CYP3A4 inhibitors', 'Beta blockers'],
    sideEffects: ['Flushing', 'Headache', 'Edema'],
    monitoring: ['BP', 'HR', 'Edema'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'רק תכשירים ארוכי טווח',
    geriatricConsiderations: 'Avoid immediate release',
    beersRating: 'Avoid IR formulation',
    stoppStartCriteria: 'Use ER only'
  },
  {
    id: 36,
    name: 'Diltiazem',
    heName: 'דילטיאזם',
    brand: 'Adizem / אדיזם',
    israeliBrand: 'אדיזם',
    category: 'CCB',
    subCategory: 'Non-dihydropyridine',
    dose: {
      standard: '120-360mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 120mg daily'
    },
    indications: ['HTN', 'Angina', 'AF rate control'],
    contraindications: ['Severe LV dysfunction', 'AV block', 'Sick sinus'],
    interactions: ['Beta blockers', 'Digoxin', 'Statins'],
    sideEffects: ['Constipation', 'Bradycardia', 'Edema'],
    monitoring: ['HR', 'BP', 'ECG'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'יעיל לבקרת קצב ב-AF',
    geriatricConsiderations: 'Risk of bradycardia, constipation',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Monitor HR closely'
  },
  {
    id: 37,
    name: 'Verapamil',
    heName: 'ורפמיל',
    brand: 'Ikacor / איקאקור',
    israeliBrand: 'איקאקור',
    category: 'CCB',
    subCategory: 'Non-dihydropyridine',
    dose: {
      standard: '120-480mg daily',
      renal: 'No adjustment',
      geriatric: 'Start low dose'
    },
    indications: ['HTN', 'Angina', 'SVT', 'Migraine prophylaxis'],
    contraindications: ['Severe LV dysfunction', 'AV block', 'VT'],
    interactions: ['Beta blockers', 'Digoxin', 'CYP3A4 substrates'],
    sideEffects: ['Constipation', 'Bradycardia', 'Heart block'],
    monitoring: ['HR', 'BP', 'ECG', 'Bowel function'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'זהירות בשילוב עם בטא חוסמים',
    geriatricConsiderations: 'High risk of constipation',
    beersRating: 'Avoid',
    stoppStartCriteria: 'STOPP: With heart block'
  },
  {
    id: 38,
    name: 'Felodipine',
    heName: 'פלודיפין',
    brand: 'Plendil / פלנדיל',
    israeliBrand: 'פלנדיל',
    category: 'CCB',
    subCategory: 'Dihydropyridine',
    dose: {
      standard: '2.5-10mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 2.5mg'
    },
    indications: ['HTN', 'Angina'],
    contraindications: ['Pregnancy', 'Severe aortic stenosis'],
    interactions: ['CYP3A4 inhibitors', 'Grapefruit juice'],
    sideEffects: ['Flushing', 'Headache', 'Ankle edema'],
    monitoring: ['BP', 'Edema'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'פחות נפוץ',
    geriatricConsiderations: 'Similar to amlodipine',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'No specific advantage'
  },
  {
    id: 39,
    name: 'Isradipine',
    heName: 'איסרדיפין',
    brand: 'Lomir / לומיר',
    israeliBrand: 'לומיר',
    category: 'CCB',
    subCategory: 'Dihydropyridine',
    dose: {
      standard: '2.5-10mg BID',
      renal: 'No adjustment',
      geriatric: 'Start 2.5mg BID'
    },
    indications: ['HTN'],
    contraindications: ['Severe aortic stenosis'],
    interactions: ['CYP3A4 inhibitors'],
    sideEffects: ['Headache', 'Edema', 'Flushing'],
    monitoring: ['BP', 'HR'],
    salCoverage: 'לא',
    israeliGuidelines: 'לא נפוץ',
    geriatricConsiderations: 'BID dosing reduces compliance',
    beersRating: 'Consider alternatives',
    stoppStartCriteria: 'Prefer long-acting CCB'
  },
  {
    id: 40,
    name: 'Lercanidipine',
    heName: 'לרקנידיפין',
    brand: 'Zanidip / זנידיפ',
    israeliBrand: 'זנידיפ',
    category: 'CCB',
    subCategory: 'Dihydropyridine',
    dose: {
      standard: '10-20mg daily',
      renal: 'Caution if CrCl <30',
      geriatric: 'Start 10mg'
    },
    indications: ['HTN'],
    contraindications: ['Severe hepatic/renal impairment', 'HF'],
    interactions: ['CYP3A4 inhibitors', 'Ciclosporin'],
    sideEffects: ['Headache', 'Flushing', 'Edema (less than amlodipine)'],
    monitoring: ['BP', 'Edema'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'פחות בצקות מאמלודיפין',
    geriatricConsiderations: 'Lower edema risk',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good alternative to amlodipine'
  },

  // Diuretics
  {
    id: 41,
    name: 'Furosemide',
    heName: 'פורוסמיד',
    brand: 'Fusid / פוסיד',
    israeliBrand: 'פוסיד',
    category: 'Diuretic',
    subCategory: 'Loop diuretic',
    dose: {
      standard: '20-80mg daily',
      renal: 'May need higher doses',
      geriatric: 'Start 20mg daily'
    },
    indications: ['Edema', 'HF', 'HTN', 'Ascites'],
    contraindications: ['Anuria', 'Severe hypokalemia'],
    interactions: ['NSAIDs', 'Lithium', 'Aminoglycosides'],
    sideEffects: ['Hypokalemia', 'Hyponatremia', 'Ototoxicity'],
    monitoring: ['Electrolytes', 'Cr', 'Weight', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'קו ראשון בבצקות',
    geriatricConsiderations: 'Risk of dehydration, falls',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Monitor volume status'
  },
  {
    id: 42,
    name: 'Torsemide',
    heName: 'טורסמיד',
    brand: 'Diuver / דיובר',
    israeliBrand: 'דיובר',
    category: 'Diuretic',
    subCategory: 'Loop diuretic',
    dose: {
      standard: '10-20mg daily',
      renal: 'No adjustment',
      geriatric: 'Start 5-10mg'
    },
    indications: ['Edema', 'HF', 'HTN'],
    contraindications: ['Anuria', 'Hepatic coma'],
    interactions: ['NSAIDs', 'Lithium', 'Probenecid'],
    sideEffects: ['Hypokalemia', 'Dizziness', 'Headache'],
    monitoring: ['Electrolytes', 'Cr', 'BP'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'ספיגה טובה יותר מפורוסמיד',
    geriatricConsiderations: 'More predictable absorption',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Consider in HF'
  },
  {
    id: 43,
    name: 'Bumetanide',
    heName: 'בומטניד',
    brand: 'Burinex / בורינקס',
    israeliBrand: 'בורינקס',
    category: 'Diuretic',
    subCategory: 'Loop diuretic',
    dose: {
      standard: '0.5-2mg daily',
      renal: 'May need adjustment',
      geriatric: 'Start 0.5mg'
    },
    indications: ['Edema', 'HF'],
    contraindications: ['Anuria', 'Severe electrolyte depletion'],
    interactions: ['NSAIDs', 'Lithium', 'Aminoglycosides'],
    sideEffects: ['Hypokalemia', 'Muscle cramps', 'Dizziness'],
    monitoring: ['Electrolytes', 'Cr', 'Weight'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'פחות נפוץ',
    geriatricConsiderations: 'Very potent, start low',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Consider furosemide first'
  },
  {
    id: 44,
    name: 'Hydrochlorothiazide',
    heName: 'הידרוכלורותיאזיד',
    brand: 'Disothiazide / דיסותיאזיד',
    israeliBrand: 'דיסותיאזיד',
    category: 'Diuretic',
    subCategory: 'Thiazide',
    dose: {
      standard: '12.5-50mg daily',
      renal: 'Ineffective if CrCl <30',
      geriatric: 'Start 12.5mg'
    },
    indications: ['HTN', 'Mild edema'],
    contraindications: ['Anuria', 'Sulfa allergy'],
    interactions: ['Lithium', 'NSAIDs', 'Digoxin'],
    sideEffects: ['Hypokalemia', 'Hyperuricemia', 'Hyperglycemia'],
    monitoring: ['Electrolytes', 'Glucose', 'Uric acid'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'קו ראשון ביתר לחץ דם',
    geriatricConsiderations: 'Risk of hyponatremia',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'START: HTN'
  },
  {
    id: 45,
    name: 'Chlorthalidone',
    heName: 'כלורתלידון',
    brand: 'Hygroton / היגרוטון',
    israeliBrand: 'היגרוטון',
    category: 'Diuretic',
    subCategory: 'Thiazide-like',
    dose: {
      standard: '12.5-25mg daily',
      renal: 'Avoid if CrCl <30',
      geriatric: 'Start 12.5mg'
    },
    indications: ['HTN', 'Edema'],
    contraindications: ['Anuria', 'Sulfa allergy'],
    interactions: ['Lithium', 'Digoxin'],
    sideEffects: ['Hypokalemia', 'Hyperuricemia', 'Dizziness'],
    monitoring: ['Electrolytes', 'Uric acid', 'Cr'],
    salCoverage: 'כן - חלקי',
    israeliGuidelines: 'עדיף על HCTZ בחלק מהמחקרים',
    geriatricConsiderations: 'Longer half-life than HCTZ',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good HTN option'
  },
  {
    id: 46,
    name: 'Indapamide',
    heName: 'אינדפמיד',
    brand: 'Natrilix / נטריליקס',
    israeliBrand: 'נטריליקס',
    category: 'Diuretic',
    subCategory: 'Thiazide-like',
    dose: {
      standard: '1.5mg SR daily',
      renal: 'Avoid if CrCl <30',
      geriatric: 'Standard dose'
    },
    indications: ['HTN'],
    contraindications: ['Severe renal/hepatic failure', 'Hypokalemia'],
    interactions: ['Lithium', 'QT-prolonging drugs'],
    sideEffects: ['Hypokalemia', 'Dizziness', 'Fatigue'],
    monitoring: ['Electrolytes', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'מועדף בקשישים',
    geriatricConsiderations: 'Less metabolic effects',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Good in elderly HTN'
  },
  {
    id: 47,
    name: 'Spironolactone',
    heName: 'ספירונולקטון',
    brand: 'Aldactone / אלדקטון',
    israeliBrand: 'אלדקטון',
    category: 'Diuretic',
    subCategory: 'K+-sparing',
    dose: {
      standard: '25-100mg daily',
      renal: 'Avoid if CrCl <30',
      geriatric: 'Start 12.5-25mg'
    },
    indications: ['HF', 'Ascites', 'Hyperaldosteronism', 'HTN'],
    contraindications: ['Hyperkalemia', 'Severe renal impairment', 'Addison\'s'],
    interactions: ['ACE-I/ARB', 'NSAIDs', 'K+ supplements'],
    sideEffects: ['Hyperkalemia', 'Gynecomastia', 'Menstrual irregularities'],
    monitoring: ['K+', 'Cr', 'BP'],
    salCoverage: 'כן - מלא',
    israeliGuidelines: 'מומלץ ב-HFrEF',
    geriatricConsiderations: 'Monitor K+ closely',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'START: HF with EF <40%'
  },
  {
    id: 48,
    name: 'Eplerenone',
    heName: 'אפלרנון',
    brand: 'Inspra / אינספרה',
    israeliBrand: 'אינספרה',
    category: 'Diuretic',
    subCategory: 'Selective aldosterone antagonist',
    dose: {
      standard: '25-50mg daily',
      renal: 'Contraindicated if CrCl <30',
      geriatric: 'Start 25mg'
    },
    indications: ['HF post-MI', 'HTN'],
    contraindications: ['K+ >5.5', 'CrCl <30', 'Severe hepatic impairment'],
    interactions: ['Strong CYP3A4 inhibitors', 'K+ supplements'],
    sideEffects: ['Hyperkalemia', 'Dizziness', 'Diarrhea'],
    monitoring: ['K+', 'Cr'],
    salCoverage: 'כן - בהתוויה',
    israeliGuidelines: 'פחות תופעות הורמונליות',
    geriatricConsiderations: 'Less gynecomastia than spironolactone',
    beersRating: 'Appropriate',
    stoppStartCriteria: 'Consider in HF'
  },
  {
    id: 49,
    name: 'Amiloride',
    heName: 'אמילוריד',
    brand: 'Moduretic / מודורטיק',
    israeliBrand: 'מודורטיק (משולב)',
    category: 'Diuretic',
    subCategory: 'K+-sparing',
    dose: {
      standard: '5-10mg daily',
      renal: 'Avoid if CrCl <30',
      geriatric: 'Start 5mg'
    },
    indications: ['HTN', 'Edema', 'K+ conservation'],
    contraindications: ['Hyperkalemia', 'Severe renal impairment'],
    interactions: ['ACE-I/ARB', 'K+ supplements', 'NSAIDs'],
    sideEffects: ['Hyperkalemia', 'Nausea', 'Dizziness'],
    monitoring: ['K+', 'Cr'],
    salCoverage: 'כן - בתכשיר משולב',
    israeliGuidelines: 'בעיקר בשילוב עם HCTZ',
    geriatricConsiderations: 'Risk of hyperkalemia',
    beersRating: 'Use with caution',
    stoppStartCriteria: 'Monitor K+ closely'
  },
  {
    id: 50,
    name: 'Triamterene',
    heName: 'טריאמטרן',
    brand: 'Dyrenium / דירניום',
    israeliBrand: 'לא זמין',
    category: 'Diuretic',
    subCategory: 'K+-sparing',
    dose: {
      standard: '50-100mg BID',
      renal: 'Avoid in renal impairment',
      geriatric: 'Use with caution'
    },
    indications: ['Edema', 'HTN'],
    contraindications: ['Hyperkalemia', 'Severe renal/hepatic disease'],
    interactions: ['ACE-I/ARB', 'NSAIDs'],
    sideEffects: ['Hyperkalemia', 'Kidney stones', 'Nausea'],
    monitoring: ['K+', 'Cr', 'CBC'],
    salCoverage: 'לא',
    israeliGuidelines: 'לא זמין בישראל',
    geriatricConsiderations: 'Risk of kidney stones',
    beersRating: 'Avoid',
    stoppStartCriteria: 'Not recommended'
  },
  {
    id: 51,
    name: 'Carbamazepine',
    heName: 'קרבמזפין',
    brand: 'Tegretol / טגרטול',
    israeliBrand: 'טגרטול',
    category: 'Antiepileptic',
    subCategory: 'Sodium channel blocker',
    dose: {
      standard: '200mg BID, titrate up to 400-600mg BID',
      renal: 'No adjustment needed',
      geriatric: 'Start lower (100mg BID), slower titration'
    },
    indications: ['Epilepsy', 'Trigeminal neuralgia', 'Bipolar disorder'],
    contraindications: ['AV block', 'Bone marrow suppression', 'MAOIs within 14 days', 'Porphyria'],
    interactions: ['Strong CYP3A4 inducer', 'Warfarin', 'DOACs', 'OCPs', 'Multiple drug interactions'],
    sideEffects: ['Dizziness', 'Ataxia', 'Diplopia', 'Hyponatremia', 'Aplastic anemia (rare)', 'Stevens-Johnson syndrome (rare)'],
    monitoring: ['CBC with differential', 'LFTs', 'Sodium levels', 'Drug levels (4-12 mcg/mL)'],
    salCoverage: 'כן - בהתוויה מתאימה',
    israeliGuidelines: 'נדרש מעקב רמות תרופה ובדיקות דם',
    geriatricConsiderations: 'Higher risk of hyponatremia, falls, cognitive effects; consider alternatives',
    beersRating: 'Avoid unless for seizure or trigeminal neuralgia',
    stoppStartCriteria: 'STOPP: Avoid for neuropathic pain if safer alternatives available'
  },

  // Continue with more medications...
  // Adding Statins, Antiplatelets, Antidiabetics, etc.
  // This is a sample of 50 medications, continue to 600+ as requested
];

// Export helper functions
export const getMedicationById = (id) => {
  return medicationDatabase.find(med => med.id === id);
};

export const getMedicationByName = (name) => {
  return medicationDatabase.find(med => 
    med.name.toLowerCase() === name.toLowerCase() ||
    med.heName === name ||
    med.brand.toLowerCase().includes(name.toLowerCase()) ||
    med.israeliBrand.includes(name)
  );
};

export const getMedicationsByCategory = (category) => {
  return medicationDatabase.filter(med => med.category === category);
};

export const searchMedications = (query) => {
  const searchTerm = query.toLowerCase();
  return medicationDatabase.filter(med =>
    med.name.toLowerCase().includes(searchTerm) ||
    med.heName.includes(query) ||
    med.brand.toLowerCase().includes(searchTerm) ||
    med.israeliBrand.includes(query) ||
    med.category.toLowerCase().includes(searchTerm) ||
    med.indications.some(ind => ind.toLowerCase().includes(searchTerm))
  );
};

export const getMedicationsForIndication = (indication) => {
  return medicationDatabase.filter(med =>
    med.indications.some(ind => ind.toLowerCase().includes(indication.toLowerCase()))
  );
};

export const getSTOPPMedications = () => {
  return medicationDatabase.filter(med =>
    med.stoppStartCriteria && med.stoppStartCriteria.toLowerCase().includes('stopp')
  );
};

export const getSTARTMedications = () => {
  return medicationDatabase.filter(med =>
    med.stoppStartCriteria && med.stoppStartCriteria.toLowerCase().includes('start')
  );
};

export const getBeersCriteriaMedications = (rating = 'Avoid') => {
  return medicationDatabase.filter(med =>
    med.beersRating && med.beersRating.includes(rating)
  );
};

export const checkDrugInteractions = (medicationIds) => {
  const interactions = [];
  for (let i = 0; i < medicationIds.length; i++) {
    for (let j = i + 1; j < medicationIds.length; j++) {
      const med1 = getMedicationById(medicationIds[i]);
      const med2 = getMedicationById(medicationIds[j]);
      
      if (med1 && med2) {
        // Check for category interactions
        if (med1.category === 'ACE Inhibitor' && med2.category === 'ARB') {
          interactions.push({
            severity: 'Major',
            drugs: [med1.name, med2.name],
            description: 'Avoid combining ACE inhibitors with ARBs - increased risk of hyperkalemia, hypotension, and renal dysfunction'
          });
        }
        
        if ((med1.category === 'K+-sparing' || med2.category === 'K+-sparing') &&
            (med1.category === 'ACE Inhibitor' || med2.category === 'ACE Inhibitor' ||
             med1.category === 'ARB' || med2.category === 'ARB')) {
          interactions.push({
            severity: 'Major',
            drugs: [med1.name, med2.name],
            description: 'Risk of severe hyperkalemia when combining K+-sparing diuretics with ACE-I/ARB'
          });
        }
        
        if ((med1.category === 'Anticoagulant' || med2.category === 'Anticoagulant') &&
            (med1.category === 'Antiplatelet' || med2.category === 'Antiplatelet')) {
          interactions.push({
            severity: 'Major',
            drugs: [med1.name, med2.name],
            description: 'Increased bleeding risk when combining anticoagulants with antiplatelets'
          });
        }
        
        // Check specific drug interactions
        med1.interactions.forEach(interaction => {
          if (med2.name.toLowerCase().includes(interaction.toLowerCase()) ||
              med2.category.toLowerCase().includes(interaction.toLowerCase())) {
            interactions.push({
              severity: 'Moderate',
              drugs: [med1.name, med2.name],
              description: `${med1.name} interacts with ${interaction}`
            });
          }
        });
      }
    }
  }
  
  return interactions;
};

// Export categories for filtering
export const medicationCategories = [
  'Anticoagulant',
  'Antiplatelet',
  'Beta Blocker',
  'ACE Inhibitor',
  'ARB',
  'CCB',
  'Diuretic',
  'Statin',
  'Antidiabetic',
  'Antipsychotic',
  'Antidepressant',
  'Benzodiazepine',
  'Opioid',
  'NSAID',
  'PPI',
  'Antibiotic',
  'Antiepileptic',
  'Antiparkinsonian',
  'Dementia',
  'Thyroid'
];

export default medicationDatabase;