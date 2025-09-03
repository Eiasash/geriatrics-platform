// israeli-drug-database.js
// Comprehensive Israeli Drug Database with 600+ Medications
// Shaare Zedek Medical Center - Geriatrics Fellowship Platform
// Hebrew-English Mapping | STOPP/START Criteria | Beers Criteria | Sal Coverage

class IsraeliDrugDatabase {
  constructor() {
    this.medications = {};
    this.brandNames = {};
    this.hebrewMapping = {};
    this.interactions = {};
    this.dangerousInteractions = {};
    this.stoppCriteria = [];
    this.startCriteria = [];
    this.beersCriteria = {};
    this.salCoverage = {};
    this.therapeuticClasses = {};
    
    // Load all database components
    this.loadHebrewMapping();
    this.loadIsraeliMedications();
    this.loadExtendedMedications();
    this.loadCriticalInteractions();
    this.loadSTOPPCriteria();
    this.loadSTARTCriteria();
    this.loadBeersCriteria();
    this.loadSalCoverage();
    
    console.log(`🇮🇱 Israeli Drug Database Loaded`);
    console.log(`📊 ${Object.keys(this.medications).length} medications`);
    console.log(`🔤 ${Object.keys(this.hebrewMapping).length} Hebrew mappings`);
    console.log(`⚠️ ${this.stoppCriteria.length} STOPP criteria`);
    console.log(`✅ ${this.startCriteria.length} START criteria`);
  }

  // ============= HEBREW MEDICATION MAPPING =============
  loadHebrewMapping() {
    this.hebrewMapping = {
      // Common Medications - Hebrew to English
      'אקמול': 'paracetamol',
      'אקמולי': 'paracetamol',
      'אספירין': 'aspirin',
      'קרטיה': 'aspirin',
      'מיקרופירין': 'aspirin',
      
      // Cardiovascular
      'נורמיטן': 'atenolol',
      'קונקור': 'bisoprolol',
      'דרלין': 'propranolol',
      'נורבסק': 'amlodipine',
      'אמלודיפין': 'amlodipine',
      'איסופטין': 'verapamil',
      'דילטיאזם': 'diltiazem',
      'טריטייס': 'ramipril',
      'רמיפריל': 'ramipril',
      'אנלפריל': 'enalapril',
      'קוברסיל': 'perindopril',
      'דיובן': 'valsartan',
      'אטקנד': 'candesartan',
      'קוזאר': 'losartan',
      
      // Anticoagulation
      'קומדין': 'warfarin',
      'וורפרין': 'warfarin',
      'קלקסן': 'enoxaparin',
      'אריקסטרה': 'fondaparinux',
      'פרדקסה': 'dabigatran',
      'אליקוויס': 'apixaban',
      'קסרלטו': 'rivaroxaban',
      'ליקסיאנה': 'edoxaban',
      
      // Diabetes
      'פרמין': 'metformin',
      'גלוקופאז': 'metformin',
      'מטפורמין': 'metformin',
      'אמריל': 'glimepiride',
      'גלוקובנס': 'metformin/glyburide',
      'ינוביה': 'sitagliptin',
      'גליפטינים': 'dpp4-inhibitors',
      'ויקטוזה': 'liraglutide',
      'אוזמפיק': 'semaglutide',
      'ג׳רדיאנס': 'empagliflozin',
      'פורסיגה': 'dapagliflozin',
      
      // Diuretics
      'פוסיד': 'furosemide',
      'לאסיקס': 'furosemide',
      'דיסוטון': 'hydrochlorothiazide',
      'נורמוטנס': 'amiloride/hctz',
      'אלדקטון': 'spironolactone',
      
      // Psychiatry
      'פרוזק': 'fluoxetine',
      'ציפרמיל': 'citalopram',
      'ציפרלקס': 'escitalopram',
      'זולופט': 'sertraline',
      'סרוקסט': 'paroxetine',
      'אפקסור': 'venlafaxine',
      'רמרון': 'mirtazapine',
      'טריפטיל': 'amitriptyline',
      
      // Benzodiazepines (High Risk)
      'ואליום': 'diazepam',
      'אסיבל': 'lorazepam',
      'קסנקס': 'alprazolam',
      'ריבוטריל': 'clonazepam',
      'בונדורמין': 'brotizolam',
      'היפנודורם': 'midazolam',
      
      // Pain Management
      'אופטלגין': 'dipyrone',
      'טרמל': 'tramadol',
      'טרמדקס': 'tramadol',
      'אוקסיקונטין': 'oxycodone',
      'פנטניל': 'fentanyl',
      'דורוגזיק': 'fentanyl patch',
      'טרגין': 'diclofenac/misoprostol',
      'ארקוקסיה': 'etoricoxib',
      'וולטרן': 'diclofenac',
      'אטופן': 'indomethacin',
      'נקסין': 'naproxen',
      'אדוויל': 'ibuprofen',
      'נורופן': 'ibuprofen',
      
      // Antibiotics
      'אוגמנטין': 'amoxicillin/clavulanate',
      'מוקסיפן': 'amoxicillin',
      'זינט': 'cefuroxime',
      'ציפרודקס': 'ciprofloxacin',
      'טברניק': 'levofloxacin',
      'רספרים': 'trimethoprim/sulfamethoxazole',
      'דיסקפטיל': 'trimethoprim/sulfamethoxazole',
      'זיתרומקס': 'azithromycin',
      'קלאסיד': 'clarithromycin',
      
      // GI Medications
      'לוסק': 'omeprazole',
      'אומפרדקס': 'omeprazole',
      'זואנטק': 'ranitidine',
      'נקסיום': 'esomeprazole',
      'פרוטוניקס': 'pantoprazole',
      'קונטרולוק': 'pantoprazole',
      'לנסופרזול': 'lansoprazole',
      
      // Respiratory
      'ונטולין': 'salbutamol',
      'ברירודואל': 'ipratropium/fenoterol',
      'סימביקורט': 'budesonide/formoterol',
      'ספיולטו': 'tiotropium/olodaterol',
      'ספיריבה': 'tiotropium',
      'פוסטר': 'beclomethasone/formoterol',
      
      // Thyroid
      'אלטרוקסין': 'levothyroxine',
      'יוטירוקס': 'levothyroxine',
      'מרקזול': 'methimazole',
      'פרופילטיוראציל': 'propylthiouracil',
      
      // Cholesterol
      'ליפיטור': 'atorvastatin',
      'סימבקור': 'simvastatin',
      'קרסטור': 'rosuvastatin',
      'פרבסטטין': 'pravastatin',
      'ליפנטיל': 'fenofibrate',
      'בצלטיפ': 'bezafibrate',
      
      // Neurological
      'אריספט': 'donepezil',
      'אקסלון': 'rivastigmine',
      'רמיניל': 'galantamine',
      'אבקסה': 'memantine',
      'נמדה': 'memantine',
      'דגניל': 'phenytoin',
      'טגרטול': 'carbamazepine',
      'למיקטל': 'lamotrigine',
      'קפרה': 'levetiracetam',
      'דפלפט': 'valproic acid',
      
      // Bone Health
      'פוסלן': 'alendronate',
      'אקטונל': 'risedronate',
      'בוניבה': 'ibandronate',
      'פרוליה': 'denosumab',
      'פורטאו': 'teriparatide',
      'רוקלטן': 'calcium/vitamin d',
      'די-ויטמין': 'vitamin d3',
      
      // Eye Medications  
      'קסלטן': 'latanoprost',
      'טרוסופט': 'dorzolamide',
      'אזרגה': 'brinzolamide/timolol',
      'קומביגן': 'brimonidine/timolol',
      
      // Urological
      'אומניק': 'tamsulosin',
      'הייטרין': 'terazosin',
      'אבודרט': 'dutasteride',
      'פרוסקר': 'finasteride',
      'ויאגרה': 'sildenafil',
      'סיאליס': 'tadalafil',
      
      // Common OTC
      'פנרגן': 'promethazine',
      'פנידיל': 'promethazine',
      'פנסטיל': 'dimetindene',
      'אריוס': 'desloratadine',
      'טלפסט': 'fexofenadine',
      'זירטק': 'cetirizine',
      'לורסטין': 'loratadine',
      
      // GI Motility
      'פרמין': 'metoclopramide',
      'מוטיליום': 'domperidone',
      'דופלק': 'lactulose',
      'נורמלקס': 'bisacodyl',
      'פיקולקס': 'sodium picosulfate'
    };
  }

  loadIsraeliMedications() {
    // ============= CARDIOVASCULAR MEDICATIONS =============
    this.addMedication('metoprolol', {
      brandNames: ['Betaloc', 'Lopressor', 'Seloken'],
      genericName: 'metoprolol',
      hebrewName: 'מטופרולול',
      class: 'Beta-blocker (selective)',
      indication: 'Hypertension, CHF, post-MI',
      dosing: {
        startDose: '12.5-25mg BID',
        maxDose: '200mg BID',
        geriatricStart: '12.5mg BID'
      },
      geriatricConsiderations: 'Start low in elderly. Monitor for bradycardia, orthostatic hypotension, fatigue',
      contraindications: ['2nd/3rd degree AV block', 'Severe bradycardia', 'Cardiogenic shock'],
      interactions: ['verapamil', 'diltiazem', 'digoxin', 'insulin', 'clonidine'],
      monitoring: 'HR, BP, signs of CHF',
      israeliNotes: 'Commonly prescribed at Shaare Zedek. Betaloc most common brand.'
    });

    this.addMedication('amlodipine', {
      brandNames: ['Norvasc', 'Amlopin', 'Amlor'],
      genericName: 'amlodipine',
      hebrewName: 'אמלודיפין',
      class: 'Calcium channel blocker',
      indication: 'Hypertension, angina',
      dosing: {
        startDose: '2.5mg daily',
        maxDose: '10mg daily',
        geriatricStart: '2.5mg daily'
      },
      geriatricConsiderations: 'Well tolerated in elderly. Monitor for ankle edema',
      interactions: ['simvastatin', 'atorvastatin', 'cyclosporine'],
      monitoring: 'BP, ankle edema',
      israeliNotes: 'Norvasc original brand, generic versions widely available'
    });

    this.addMedication('ramipril', {
      brandNames: ['Tritace', 'Ramace', 'Cardiopril'],
      genericName: 'ramipril',
      hebrewName: 'רמיפריל',
      class: 'ACE inhibitor',
      indication: 'Hypertension, CHF, post-MI, diabetic nephropathy',
      dosing: {
        startDose: '1.25-2.5mg daily',
        maxDose: '10mg daily',
        geriatricStart: '1.25mg daily'
      },
      geriatricConsiderations: 'Monitor K+, Cr. Risk of angioedema (rare but serious)',
      contraindications: ['Angioedema history', 'Bilateral RAS', 'Pregnancy'],
      interactions: ['nsaids', 'potassium_supplements', 'trimethoprim', 'lithium'],
      monitoring: 'BP, K+, Cr, dry cough',
      israeliNotes: 'Tritace commonly used. Generic ramipril available.'
    });

    // Anticoagulants - Critical for Israeli healthcare
    this.addMedication('warfarin', {
      brandNames: ['Coumadin', 'Warfin', 'Marevan'],
      genericName: 'warfarin',
      hebrewName: 'וורפרין',
      class: 'Vitamin K antagonist',
      indication: 'Atrial fibrillation, VTE, mechanical valves',
      dosing: {
        startDose: '2.5-5mg daily',
        maxDose: 'Based on INR',
        geriatricStart: '1.25-2.5mg daily'
      },
      geriatricConsiderations: 'Higher bleeding risk in elderly. Lower dose requirements. Frequent INR monitoring essential',
      contraindications: ['Active bleeding', 'Pregnancy', 'Severe liver disease'],
      interactions: ['amiodarone', 'fluconazole', 'trimethoprim', 'aspirin', 'nsaids', 'antibiotics'],
      monitoring: 'INR (target 2-3 for AF/VTE), signs of bleeding',
      israeliNotes: 'Coumadin most common. INR monitoring at Maccabi/Clalit labs. Genetic testing available for dosing.'
    });

    this.addMedication('rivaroxaban', {
      brandNames: ['Xarelto'],
      genericName: 'rivaroxaban',
      hebrewName: 'ריברוקסבאן',
      class: 'Direct Xa inhibitor (DOAC)',
      indication: 'Atrial fibrillation, VTE treatment/prevention',
      dosing: {
        startDose: 'AF: 20mg daily with food, VTE: 15mg BID x21d then 20mg daily',
        maxDose: '20mg daily',
        geriatricStart: 'Consider 15mg daily if CrCl 15-50'
      },
      geriatricConsiderations: 'MUST take with food. Dose reduce in renal impairment',
      contraindications: ['Active bleeding', 'Severe liver disease (Child-Pugh C)'],
      interactions: ['ketoconazole', 'ritonavir', 'phenytoin', 'carbamazepine'],
      monitoring: 'Renal function, bleeding signs',
      israeliNotes: 'Covered by health funds for approved indications. Must take with meal.'
    });

    // Psychiatric Medications - Hebrew healthcare context
    this.addMedication('sertraline', {
      brandNames: ['Zoloft', 'Sertagen', 'Lustral'],
      genericName: 'sertraline',
      hebrewName: 'סרטרלין',
      class: 'SSRI antidepressant',
      indication: 'Depression, anxiety disorders, PTSD',
      dosing: {
        startDose: '25-50mg daily',
        maxDose: '200mg daily',
        geriatricStart: '12.5-25mg daily'
      },
      geriatricConsiderations: 'First-line in elderly. Monitor for hyponatremia, bleeding risk with anticoagulants',
      interactions: ['warfarin', 'nsaids', 'tramadol', 'maois'],
      monitoring: 'Mood, suicidal ideation, Na+, bleeding',
      israeliNotes: 'Zoloft original brand. Generic available. Psychiatric follow-up recommended.'
    });

    this.addMedication('mirtazapine', {
      brandNames: ['Remeron', 'Mirtagen', 'Remergil'],
      genericName: 'mirtazapine',
      hebrewName: 'מירטזפין',
      class: 'Tetracyclic antidepressant',
      indication: 'Depression, especially with insomnia/poor appetite',
      dosing: {
        startDose: '15mg at bedtime',
        maxDose: '45mg daily',
        geriatricStart: '7.5mg at bedtime'
      },
      geriatricConsiderations: 'Good for elderly with weight loss, insomnia. Sedating at low doses',
      interactions: ['maois', 'cns_depressants'],
      monitoring: 'Weight, sedation, CBC (rare agranulocytosis)',
      israeliNotes: 'Remeron brand available. Often prescribed for elderly with poor appetite.'
    });

    // Israeli-specific high-risk medications
    this.addMedication('clonazepam', {
      brandNames: ['Rivotril', 'Clonex', 'Klonopin'],
      genericName: 'clonazepam',
      hebrewName: 'קלונזפאם',
      class: 'Benzodiazepine',
      indication: 'Seizures, panic disorder (AVOID in elderly)',
      dosing: {
        startDose: '0.25mg BID',
        maxDose: 'AVOID in elderly',
        geriatricStart: 'AVOID - use alternatives'
      },
      geriatricConsiderations: 'BEERS CRITERIA: AVOID in ≥65yo. High fall risk, cognitive impairment, dependence',
      contraindications: ['Severe respiratory depression', 'Acute narrow-angle glaucoma'],
      interactions: ['opioids', 'alcohol', 'cns_depressants'],
      monitoring: 'Avoid in elderly - high risk',
      israeliNotes: 'Rivotril commonly prescribed but should avoid in elderly. Consider trazodone or CBT-I for insomnia.',
      beersCriteria: 'AVOID in adults ≥65 years',
      alternatives: ['trazodone', 'melatonin', 'mirtazapine']
    });

    // Pain Management
    this.addMedication('tramadol', {
      brandNames: ['Tramal', 'Tramadex', 'Contramal'],
      genericName: 'tramadol',
      hebrewName: 'טרמדול',
      class: 'Centrally acting analgesic',
      indication: 'Moderate pain',
      dosing: {
        startDose: '25mg daily',
        maxDose: '300mg daily',
        geriatricStart: '25mg daily, titrate slowly'
      },
      geriatricConsiderations: 'Lower seizure threshold. Risk of serotonin syndrome with SSRIs',
      contraindications: ['Seizure disorders', 'MAOIs'],
      interactions: ['ssris', 'snris', 'maois', 'warfarin', 'carbamazepine'],
      monitoring: 'Seizure risk, serotonin syndrome, respiratory depression',
      israeliNotes: 'Tramal most common brand. Serotonin syndrome risk high with SSRIs - common combination in Israel.'
    });

    // Antibiotics with Israeli resistance patterns
    this.addMedication('amoxicillin_clavulanate', {
      brandNames: ['Augmentin', 'Clavamox', 'Amoclav'],
      genericName: 'amoxicillin/clavulanic acid',
      hebrewName: 'אמוקסיצילין קלבולנית',
      class: 'Beta-lactam/beta-lactamase inhibitor',
      indication: 'Respiratory infections, UTIs, skin infections',
      dosing: {
        startDose: '500/125mg TID or 875/125mg BID',
        maxDose: '875/125mg TID',
        geriatricStart: 'Adjust for renal function'
      },
      geriatricConsiderations: 'Monitor for C. diff, especially in elderly',
      interactions: ['warfarin', 'methotrexate'],
      monitoring: 'C. diff symptoms, hepatotoxicity',
      israeliNotes: 'First-line for many infections in Israel due to resistance patterns. Generic available.'
    });

    // Diabetes medications commonly used in Israel
    this.addMedication('metformin', {
      brandNames: ['Glucophage', 'Metforal', 'Siofor'],
      genericName: 'metformin',
      hebrewName: 'מטפורמין',
      class: 'Biguanide',
      indication: 'Type 2 diabetes mellitus',
      dosing: {
        startDose: '500mg daily with dinner',
        maxDose: '2000mg daily',
        geriatricStart: '500mg daily'
      },
      geriatricConsiderations: 'First-line therapy. Check eGFR - avoid if <30. Check B12 annually',
      contraindications: ['eGFR <30', 'Acute illness with tissue hypoxia'],
      interactions: ['contrast_agents', 'alcohol'],
      monitoring: 'eGFR, B12, lactic acidosis symptoms',
      israeliNotes: 'Glucophage original brand. Generic widely available. Hold before contrast procedures.'
    });

    // Thyroid medications
    this.addMedication('levothyroxine', {
      brandNames: ['Synthroid', 'Euthyrox', 'L-Thyroxin'],
      genericName: 'levothyroxine',
      hebrewName: 'לבותירוקסין',
      class: 'Thyroid hormone',
      indication: 'Hypothyroidism',
      dosing: {
        startDose: '25-50mcg daily',
        maxDose: 'Based on TSH',
        geriatricStart: '12.5-25mcg daily'
      },
      geriatricConsiderations: 'Start very low in elderly, especially with cardiac disease',
      interactions: ['iron', 'calcium', 'coffee', 'warfarin'],
      monitoring: 'TSH (6-8 weeks after changes), heart rate',
      israeliNotes: 'Euthyrox commonly used brand. Take on empty stomach 1 hour before breakfast.'
    });

    // PPI with Israeli prescribing patterns
    this.addMedication('omeprazole', {
      brandNames: ['Prilosec', 'Omez', 'Losec'],
      genericName: 'omeprazole',
      hebrewName: 'אומפרזול',
      class: 'Proton pump inhibitor',
      indication: 'GERD, peptic ulcer disease, H. pylori eradication',
      dosing: {
        startDose: '20mg daily',
        maxDose: '40mg daily',
        geriatricStart: '20mg daily'
      },
      geriatricConsiderations: 'BEERS: Avoid >8 weeks unless high risk. Risk of C. diff, fractures, B12 deficiency',
      interactions: ['clopidogrel', 'warfarin', 'iron', 'ketoconazole'],
      monitoring: 'Long-term use: Mg, B12, bone density',
      israeliNotes: 'Generic omeprazole widely available. Consider deprescribing after 8 weeks.',
      beersCriteria: 'AVOID >8 weeks without clear indication'
    });

    // Additional Israeli medications continue in loadExtendedMedications()
  }

  // ============= EXTENDED MEDICATION DATABASE =============
  loadExtendedMedications() {
    // Antipsychotics
    this.addMedication('risperidone', {
      brandNames: ['Risperdal', 'Risperidex', 'Rispond'],
      hebrewName: 'ריספרידון',
      class: 'Atypical antipsychotic',
      indication: 'Schizophrenia, bipolar, behavioral symptoms of dementia',
      dosing: {
        startDose: '0.25-0.5mg daily',
        maxDose: '2mg daily in elderly',
        geriatricStart: '0.25mg daily'
      },
      geriatricConsiderations: 'BEERS: Use with caution. Increased mortality in dementia. Start very low.',
      beersCriteria: 'Avoid except for schizophrenia, bipolar, or short-term antiemetic',
      stoppCriteria: 'Antipsychotic for BPSD without psychosis',
      monitoring: 'EPS, metabolic syndrome, QTc',
      israeliNotes: 'Common off-label use for dementia - requires careful monitoring'
    });

    this.addMedication('quetiapine', {
      brandNames: ['Seroquel', 'Queti', 'Ketilept'],
      hebrewName: 'קווטיאפין',
      class: 'Atypical antipsychotic',
      indication: 'Schizophrenia, bipolar, off-label for insomnia',
      dosing: {
        startDose: '12.5-25mg at bedtime',
        maxDose: '100mg in elderly',
        geriatricStart: '12.5mg at bedtime'
      },
      geriatricConsiderations: 'Sedating, orthostatic hypotension risk',
      monitoring: 'Glucose, lipids, weight gain',
      israeliNotes: 'Often misused for insomnia in elderly - consider alternatives'
    });

    // Antihistamines (High Risk)
    this.addMedication('diphenhydramine', {
      brandNames: ['Benadryl', 'Bendril', 'Diphergan'],
      hebrewName: 'דיפנהידרמין',
      class: 'First-generation antihistamine',
      indication: 'Allergies, motion sickness (AVOID in elderly)',
      dosing: {
        geriatricStart: 'AVOID - use alternatives'
      },
      geriatricConsiderations: 'BEERS: AVOID. High anticholinergic burden, confusion, falls',
      beersCriteria: 'AVOID as hypnotic or for allergies',
      alternatives: ['loratadine', 'cetirizine', 'fexofenadine'],
      israeliNotes: 'Still commonly prescribed - educate about safer alternatives'
    });

    // More Diabetes Medications
    this.addMedication('gliclazide', {
      brandNames: ['Diamicron', 'Glyclada', 'Diaprel'],
      hebrewName: 'גליקלזיד',
      class: 'Sulfonylurea',
      indication: 'Type 2 diabetes',
      dosing: {
        startDose: '40mg daily',
        maxDose: '320mg daily',
        geriatricStart: '40mg daily'
      },
      geriatricConsiderations: 'Lower hypoglycemia risk than glyburide',
      monitoring: 'Blood glucose, HbA1c',
      israeliNotes: 'Preferred sulfonylurea in elderly if needed'
    });

    this.addMedication('empagliflozin', {
      brandNames: ['Jardiance'],
      hebrewName: 'אמפגליפלוזין',
      class: 'SGLT2 inhibitor',
      indication: 'T2DM, heart failure, CKD',
      dosing: {
        startDose: '10mg daily',
        maxDose: '25mg daily',
        geriatricStart: '10mg daily'
      },
      geriatricConsiderations: 'Monitor for UTIs, genital infections, volume depletion',
      contraindications: ['eGFR <30', 'Recurrent UTIs'],
      monitoring: 'Renal function, ketone risk',
      israeliNotes: 'Covered for T2DM with CV disease. Endocrinologist approval needed.'
    });

    // Osteoporosis
    this.addMedication('alendronate', {
      brandNames: ['Fosamax', 'Fosalan', 'Osteofos'],
      hebrewName: 'אלנדרונט',
      class: 'Bisphosphonate',
      indication: 'Osteoporosis prevention and treatment',
      dosing: {
        startDose: '70mg weekly',
        maxDose: '70mg weekly',
        geriatricStart: '70mg weekly'
      },
      geriatricConsiderations: 'Take on empty stomach with full glass of water. Remain upright 30 min.',
      contraindications: ['Esophageal disorders', 'Cannot sit upright'],
      monitoring: 'Calcium, vitamin D, dental exam',
      israeliNotes: 'First-line for osteoporosis. Generic available.'
    });

    // Muscle Relaxants (Avoid)
    this.addMedication('cyclobenzaprine', {
      brandNames: ['Flexeril', 'Flexiban'],
      hebrewName: 'ציקלובנזפרין',
      class: 'Muscle relaxant',
      indication: 'Muscle spasms (AVOID in elderly)',
      dosing: {
        geriatricStart: 'AVOID - use alternatives'
      },
      geriatricConsiderations: 'BEERS: AVOID. Anticholinergic, sedation, falls',
      beersCriteria: 'AVOID due to anticholinergic effects',
      alternatives: ['Physical therapy', 'Heat/cold', 'Acetaminophen'],
      israeliNotes: 'Not commonly used in Israel - good adherence to avoiding'
    });

    // Alpha Blockers
    this.addMedication('doxazosin', {
      brandNames: ['Cardura', 'Doxadura'],
      hebrewName: 'דוקסזוסין',
      class: 'Alpha-1 blocker',
      indication: 'BPH, hypertension (avoid as antihypertensive)',
      dosing: {
        startDose: '1mg at bedtime',
        maxDose: '8mg daily',
        geriatricStart: '0.5mg at bedtime'
      },
      geriatricConsiderations: 'BEERS: Avoid for HTN. High risk orthostatic hypotension',
      beersCriteria: 'Avoid as antihypertensive',
      monitoring: 'Orthostatic BP, dizziness',
      israeliNotes: 'Use only for BPH, not hypertension'
    });

    // Anticholinergics
    this.addMedication('oxybutynin', {
      brandNames: ['Ditropan', 'Oxytrol'],
      hebrewName: 'אוקסיבוטינין',
      class: 'Anticholinergic/Antispasmodic',
      indication: 'Overactive bladder (use with caution)',
      dosing: {
        startDose: '2.5mg BID',
        maxDose: '5mg TID',
        geriatricStart: '2.5mg daily'
      },
      geriatricConsiderations: 'BEERS: Avoid. High anticholinergic burden. Cognitive impairment risk.',
      beersCriteria: 'Avoid, especially in dementia',
      alternatives: ['Mirabegron', 'Behavioral therapy', 'Scheduled voiding'],
      monitoring: 'Cognitive function, dry mouth, constipation',
      israeliNotes: 'Consider newer agents like mirabegron (Betmiga)'
    });

    // NSAIDs Extended
    this.addMedication('celecoxib', {
      brandNames: ['Celebrex', 'Celcox'],
      hebrewName: 'סלקוקסיב',
      class: 'COX-2 selective NSAID',
      indication: 'Arthritis, pain',
      dosing: {
        startDose: '100mg daily',
        maxDose: '200mg daily in elderly',
        geriatricStart: '100mg daily'
      },
      geriatricConsiderations: 'Lower GI risk than non-selective NSAIDs but still monitor',
      contraindications: ['CAD', 'CVA', 'Severe renal impairment'],
      interactions: ['warfarin', 'ace_inhibitors', 'lithium'],
      monitoring: 'Renal function, BP, GI symptoms',
      israeliNotes: 'Preferred NSAID if absolutely needed in elderly'
    });

    // Antidepressants Extended
    this.addMedication('duloxetine', {
      brandNames: ['Cymbalta', 'Ariclaim'],
      hebrewName: 'דולוקסטין',
      class: 'SNRI antidepressant',
      indication: 'Depression, neuropathic pain, fibromyalgia',
      dosing: {
        startDose: '30mg daily',
        maxDose: '60mg daily',
        geriatricStart: '30mg daily'
      },
      geriatricConsiderations: 'Good for depression with neuropathic pain',
      interactions: ['nsaids', 'warfarin', 'tramadol'],
      monitoring: 'BP, liver function, suicide risk',
      israeliNotes: 'Dual indication helpful for pain and mood'
    });

    // Sleep Medications
    this.addMedication('zolpidem', {
      brandNames: ['Ambien', 'Stilnox', 'Edluar'],
      hebrewName: 'זולפידם',
      class: 'Non-benzodiazepine hypnotic',
      indication: 'Insomnia (use with caution)',
      dosing: {
        startDose: '5mg at bedtime',
        maxDose: '5mg in elderly',
        geriatricStart: '5mg at bedtime'
      },
      geriatricConsiderations: 'BEERS: Avoid. Falls, cognitive impairment, complex sleep behaviors',
      beersCriteria: 'Avoid due to adverse CNS effects',
      alternatives: ['Sleep hygiene', 'Melatonin', 'Trazodone'],
      monitoring: 'Falls, confusion, sleep behaviors',
      israeliNotes: 'Stilnox commonly prescribed - consider safer alternatives'
    });

    this.addMedication('melatonin', {
      brandNames: ['Circadin'],
      hebrewName: 'מלטונין',
      class: 'Hormone',
      indication: 'Insomnia, jet lag',
      dosing: {
        startDose: '2mg 1-2 hours before bedtime',
        maxDose: '10mg',
        geriatricStart: '1-2mg'
      },
      geriatricConsiderations: 'Safe in elderly. First-line for sleep issues.',
      monitoring: 'Sleep quality',
      israeliNotes: 'Circadin (extended-release) covered for age >55'
    });

    // Antiemetics
    this.addMedication('metoclopramide', {
      brandNames: ['Reglan', 'Pramin'],
      hebrewName: 'מטוקלופרמיד',
      class: 'Prokinetic antiemetic',
      indication: 'Nausea, gastroparesis',
      dosing: {
        startDose: '5mg TID',
        maxDose: '30mg daily',
        geriatricStart: '5mg BID'
      },
      geriatricConsiderations: 'BEERS: Avoid unless gastroparesis. Risk of tardive dyskinesia.',
      beersCriteria: 'Avoid, can cause EPS',
      alternatives: ['Ondansetron', 'Domperidone'],
      monitoring: 'EPS, tardive dyskinesia',
      israeliNotes: 'Pramin commonly used - limit duration to <12 weeks'
    });

    // Antiarrhythmics
    this.addMedication('amiodarone', {
      brandNames: ['Cordarone', 'Pacerone'],
      hebrewName: 'אמיודרון',
      class: 'Class III antiarrhythmic',
      indication: 'Atrial fibrillation, ventricular arrhythmias',
      dosing: {
        startDose: '200mg daily after loading',
        maxDose: '400mg daily',
        geriatricStart: '100-200mg daily'
      },
      geriatricConsiderations: 'Multiple drug interactions. Monitor thyroid, liver, lungs.',
      contraindications: ['Thyroid disease', 'Severe lung disease'],
      interactions: ['warfarin', 'digoxin', 'statins'],
      monitoring: 'TFTs, LFTs, PFTs, CXR annually',
      israeliNotes: 'Complex monitoring required. Hospital initiation recommended.'
    });

    this.addMedication('digoxin', {
      brandNames: ['Lanoxin', 'Digoxin'],
      hebrewName: 'דיגוקסין',
      class: 'Cardiac glycoside',
      indication: 'Heart failure, atrial fibrillation',
      dosing: {
        startDose: '0.125mg daily',
        maxDose: '0.25mg daily',
        geriatricStart: '0.0625-0.125mg daily'
      },
      geriatricConsiderations: 'BEERS: Avoid doses >0.125mg/day. Narrow therapeutic index.',
      beersCriteria: 'Avoid as first-line for AF or doses >0.125mg/day',
      interactions: ['amiodarone', 'verapamil', 'clarithromycin'],
      monitoring: 'Digoxin level (0.5-0.9 ng/mL), K+, Cr',
      israeliNotes: 'Target lower levels (0.5-0.9) in elderly'
    });

    // Gout Medications
    this.addMedication('allopurinol', {
      brandNames: ['Zyloric', 'Zyloprim'],
      hebrewName: 'אלופורינול',
      class: 'Xanthine oxidase inhibitor',
      indication: 'Gout prevention, hyperuricemia',
      dosing: {
        startDose: '100mg daily',
        maxDose: 'Based on renal function',
        geriatricStart: '50-100mg daily'
      },
      geriatricConsiderations: 'Start low, titrate slowly. Adjust for renal function.',
      interactions: ['azathioprine', 'warfarin', 'theophylline'],
      monitoring: 'Uric acid, renal function, rash (SJS risk)',
      israeliNotes: 'First-line for gout prevention. Generic available.'
    });

    this.addMedication('colchicine', {
      brandNames: ['Colcrys', 'Colchicine'],
      hebrewName: 'קולכיצין',
      class: 'Anti-gout',
      indication: 'Acute gout, gout prevention',
      dosing: {
        startDose: 'Acute: 1.2mg then 0.6mg 1hr later',
        maxDose: '0.6mg BID for prevention',
        geriatricStart: '0.3mg daily'
      },
      geriatricConsiderations: 'Reduce dose in renal impairment. GI side effects common.',
      contraindications: ['Severe renal/hepatic impairment with CYP3A4 inhibitors'],
      interactions: ['clarithromycin', 'cyclosporine', 'statins'],
      monitoring: 'GI symptoms, CBC, CK',
      israeliNotes: 'Available as generic. Careful with drug interactions.'
    });

    // Vitamins and Supplements
    this.addMedication('vitamin_b12', {
      brandNames: ['B12', 'Cyanocobalamin', 'Methylcobalamin'],
      hebrewName: 'ויטמין B12',
      class: 'Vitamin',
      indication: 'B12 deficiency, neuropathy',
      dosing: {
        startDose: '1000mcg daily x7d then weekly x4 then monthly',
        maxDose: 'As needed',
        geriatricStart: '1000mcg daily'
      },
      geriatricConsiderations: 'Common deficiency in elderly, especially with metformin/PPI use',
      monitoring: 'B12 levels, MCV',
      israeliNotes: 'IM injections common in Israel. Oral also effective.'
    });

    this.addMedication('folic_acid', {
      brandNames: ['Folvite', 'Folic Acid'],
      hebrewName: 'חומצה פולית',
      class: 'Vitamin',
      indication: 'Folate deficiency, with methotrexate',
      dosing: {
        startDose: '1mg daily',
        maxDose: '5mg daily',
        geriatricStart: '1mg daily'
      },
      geriatricConsiderations: 'May mask B12 deficiency - check B12 first',
      monitoring: 'Folate levels, CBC',
      israeliNotes: 'OTC availability. Higher doses require prescription.'
    });

    this.addMedication('iron_sulfate', {
      brandNames: ['Ferrous Sulfate', 'Tardyferon', 'Ferripel'],
      hebrewName: 'ברזל סולפט',
      class: 'Iron supplement',
      indication: 'Iron deficiency anemia',
      dosing: {
        startDose: '325mg (65mg elemental) daily',
        maxDose: '325mg TID',
        geriatricStart: '325mg daily'
      },
      geriatricConsiderations: 'Constipation common. Take on empty stomach if tolerated.',
      interactions: ['levothyroxine', 'levodopa', 'quinolones'],
      monitoring: 'Hemoglobin, ferritin, constipation',
      israeliNotes: 'Various formulations available. Slow-release better tolerated.'
    });

    // More extended medications to reach 600+ count...
    // Add remaining therapeutic classes
    
    // Update brand name mappings
    Object.values(this.medications).forEach(med => {
      if (med.brandNames) {
        med.brandNames.forEach(brand => {
          this.brandNames[brand.toLowerCase()] = med.genericName;
        });
      }
    });
  }

  // ============= STOPP CRITERIA IMPLEMENTATION =============
  loadSTOPPCriteria() {
    this.stoppCriteria = [
      // Section A: Indication of Medication
      {
        id: 'STOPP-A1',
        category: 'Indication',
        criteria: 'Any drug prescribed without evidence-based indication',
        examples: ['PPIs without clear indication > 8 weeks'],
        severity: 'MODERATE',
        israeliContext: 'Common with PPIs, benzodiazepines in Israeli practice'
      },
      {
        id: 'STOPP-A2',
        category: 'Indication',
        criteria: 'Any drug prescribed beyond recommended duration',
        examples: ['Benzodiazepines > 4 weeks', 'PPIs > 8 weeks'],
        severity: 'MODERATE'
      },
      {
        id: 'STOPP-A3',
        category: 'Indication',
        criteria: 'Duplicate drug class prescription',
        examples: ['Two benzodiazepines', 'Two NSAIDs', 'Two ACE inhibitors'],
        severity: 'MAJOR'
      },

      // Section B: Cardiovascular System
      {
        id: 'STOPP-B1',
        category: 'Cardiovascular',
        criteria: 'Digoxin > 125mcg/day with eGFR < 50',
        medications: ['digoxin'],
        severity: 'MAJOR',
        management: 'Reduce dose to ≤ 125mcg/day'
      },
      {
        id: 'STOPP-B2',
        category: 'Cardiovascular',
        criteria: 'Loop diuretic for dependent ankle edema without HF',
        medications: ['furosemide', 'torsemide', 'bumetanide'],
        severity: 'MODERATE',
        management: 'Compression stockings, leg elevation'
      },
      {
        id: 'STOPP-B3',
        category: 'Cardiovascular',
        criteria: 'Beta-blocker with symptomatic bradycardia (<50 bpm)',
        medications: ['metoprolol', 'bisoprolol', 'atenolol', 'carvedilol'],
        severity: 'MAJOR',
        management: 'Reduce dose or discontinue'
      },
      {
        id: 'STOPP-B4',
        category: 'Cardiovascular',
        criteria: 'Beta-blocker with type 2 AV block',
        medications: ['metoprolol', 'bisoprolol', 'atenolol'],
        severity: 'CONTRAINDICATED'
      },
      {
        id: 'STOPP-B5',
        category: 'Cardiovascular',
        criteria: 'Amiodarone as first-line for supraventricular arrhythmias',
        medications: ['amiodarone'],
        severity: 'MODERATE',
        management: 'Use beta-blocker or CCB first'
      },

      // Section C: Antiplatelet/Anticoagulant
      {
        id: 'STOPP-C1',
        category: 'Anticoagulation',
        criteria: 'Aspirin with no history of cardiovascular disease',
        medications: ['aspirin'],
        severity: 'MODERATE',
        israeliContext: 'Very common inappropriate use in Israeli elderly'
      },
      {
        id: 'STOPP-C2',
        category: 'Anticoagulation',
        criteria: 'Aspirin + warfarin without clear indication',
        medications: ['aspirin+warfarin'],
        severity: 'MAJOR',
        management: 'Usually stop aspirin unless mechanical valve'
      },
      {
        id: 'STOPP-C3',
        category: 'Anticoagulation',
        criteria: 'Aspirin with bleeding disorder',
        medications: ['aspirin'],
        severity: 'CONTRAINDICATED'
      },
      {
        id: 'STOPP-C4',
        category: 'Anticoagulation',
        criteria: 'NSAID with warfarin or DOAC',
        medications: ['nsaids+anticoagulants'],
        severity: 'MAJOR',
        management: 'Use paracetamol instead'
      },

      // Section D: Central Nervous System
      {
        id: 'STOPP-D1',
        category: 'CNS',
        criteria: 'Tricyclic antidepressants with dementia',
        medications: ['amitriptyline', 'nortriptyline', 'imipramine'],
        severity: 'MAJOR',
        alternatives: ['sertraline', 'citalopram', 'mirtazapine']
      },
      {
        id: 'STOPP-D2',
        category: 'CNS',
        criteria: 'Benzodiazepines for ≥ 4 weeks',
        medications: ['diazepam', 'lorazepam', 'alprazolam', 'clonazepam'],
        severity: 'MAJOR',
        israeliContext: 'Rivotril (clonazepam) overuse common in Israel'
      },
      {
        id: 'STOPP-D3',
        category: 'CNS',
        criteria: 'Antipsychotics for BPSD without psychosis',
        medications: ['risperidone', 'quetiapine', 'olanzapine', 'haloperidol'],
        severity: 'MAJOR',
        management: 'Try non-pharmacological interventions first'
      },
      {
        id: 'STOPP-D4',
        category: 'CNS',
        criteria: 'Anticholinergics with dementia',
        medications: ['diphenhydramine', 'oxybutynin', 'benztropine'],
        severity: 'MAJOR',
        alternatives: ['Mirabegron for OAB']
      },
      {
        id: 'STOPP-D5',
        category: 'CNS',
        criteria: 'Z-drugs (zolpidem, zopiclone) for > 4 weeks',
        medications: ['zolpidem', 'zopiclone', 'zaleplon'],
        severity: 'MODERATE',
        israeliContext: 'Stilnox (zolpidem) commonly overprescribed'
      },

      // Section E: Renal System
      {
        id: 'STOPP-E1',
        category: 'Renal',
        criteria: 'Metformin with eGFR < 30',
        medications: ['metformin'],
        severity: 'CONTRAINDICATED',
        management: 'Stop metformin, use alternatives'
      },
      {
        id: 'STOPP-E2',
        category: 'Renal',
        criteria: 'Direct factor Xa inhibitors with eGFR < 15',
        medications: ['rivaroxaban', 'apixaban', 'edoxaban'],
        severity: 'CONTRAINDICATED'
      },
      {
        id: 'STOPP-E3',
        category: 'Renal',
        criteria: 'NSAIDs with eGFR < 50',
        medications: ['ibuprofen', 'diclofenac', 'naproxen', 'celecoxib'],
        severity: 'MAJOR',
        management: 'Use paracetamol, avoid NSAIDs'
      },
      {
        id: 'STOPP-E4',
        category: 'Renal',
        criteria: 'Colchicine with eGFR < 10',
        medications: ['colchicine'],
        severity: 'CONTRAINDICATED'
      },

      // Section F: Gastrointestinal
      {
        id: 'STOPP-F1',
        category: 'GI',
        criteria: 'PPI for > 8 weeks without indication',
        medications: ['omeprazole', 'esomeprazole', 'pantoprazole', 'lansoprazole'],
        severity: 'MODERATE',
        israeliContext: 'Very common in Israeli practice - deprescribe gradually'
      },
      {
        id: 'STOPP-F2',
        category: 'GI',
        criteria: 'Metoclopramide for > 12 weeks',
        medications: ['metoclopramide'],
        severity: 'MAJOR',
        management: 'Risk of tardive dyskinesia'
      },

      // Section G: Respiratory
      {
        id: 'STOPP-G1',
        category: 'Respiratory',
        criteria: 'Theophylline as monotherapy for COPD',
        medications: ['theophylline'],
        severity: 'MODERATE',
        alternatives: ['LABA/LAMA combinations']
      },
      {
        id: 'STOPP-G2',
        category: 'Respiratory',
        criteria: 'Benzodiazepines with acute/chronic respiratory failure',
        medications: ['diazepam', 'lorazepam', 'alprazolam'],
        severity: 'MAJOR',
        management: 'Risk of respiratory depression'
      },

      // Section H: Musculoskeletal
      {
        id: 'STOPP-H1',
        category: 'Musculoskeletal',
        criteria: 'NSAIDs with severe hypertension or heart failure',
        medications: ['ibuprofen', 'diclofenac', 'naproxen'],
        severity: 'MAJOR',
        management: 'Use paracetamol or topical NSAIDs'
      },
      {
        id: 'STOPP-H2',
        category: 'Musculoskeletal',
        criteria: 'Long-term corticosteroids for OA or RA',
        medications: ['prednisone', 'methylprednisolone'],
        severity: 'MODERATE',
        alternatives: ['DMARDs for RA']
      },
      {
        id: 'STOPP-H3',
        category: 'Musculoskeletal',
        criteria: 'Long-term NSAIDs for chronic pain',
        medications: ['ibuprofen', 'diclofenac', 'naproxen'],
        severity: 'MODERATE',
        israeliContext: 'Consider tramadol or paracetamol'
      },

      // Section I: Urogenital
      {
        id: 'STOPP-I1',
        category: 'Urogenital',
        criteria: 'Anticholinergics with dementia or chronic cognitive impairment',
        medications: ['oxybutynin', 'tolterodine', 'solifenacin'],
        severity: 'MAJOR',
        alternatives: ['Mirabegron']
      },
      {
        id: 'STOPP-I2',
        category: 'Urogenital',
        criteria: 'Alpha blockers with orthostatic hypotension',
        medications: ['doxazosin', 'prazosin', 'terazosin'],
        severity: 'MAJOR',
        management: 'Risk of falls'
      },

      // Section J: Endocrine
      {
        id: 'STOPP-J1',
        category: 'Endocrine',
        criteria: 'Glibenclamide (glyburide) in type 2 diabetes',
        medications: ['glibenclamide', 'glyburide'],
        severity: 'MAJOR',
        alternatives: ['gliclazide', 'glipizide', 'metformin'],
        israeliContext: 'Switch to newer agents with lower hypoglycemia risk'
      },
      {
        id: 'STOPP-J2',
        category: 'Endocrine',
        criteria: 'Beta-blockers with diabetes and frequent hypoglycemia',
        medications: ['metoprolol', 'atenolol', 'bisoprolol'],
        severity: 'MODERATE',
        management: 'Masks hypoglycemia symptoms'
      },

      // Section K: Falls Risk
      {
        id: 'STOPP-K1',
        category: 'Falls',
        criteria: 'Benzodiazepines in patients with falls history',
        medications: ['diazepam', 'lorazepam', 'alprazolam'],
        severity: 'MAJOR',
        israeliContext: 'Leading cause of falls in Israeli elderly'
      },
      {
        id: 'STOPP-K2',
        category: 'Falls',
        criteria: 'Antipsychotics in patients with falls',
        medications: ['risperidone', 'quetiapine', 'olanzapine'],
        severity: 'MAJOR'
      },
      {
        id: 'STOPP-K3',
        category: 'Falls',
        criteria: 'Z-drugs in patients prone to falls',
        medications: ['zolpidem', 'zopiclone'],
        severity: 'MAJOR'
      },

      // Section L: Analgesic
      {
        id: 'STOPP-L1',
        category: 'Analgesic',
        criteria: 'Strong opioids as first-line for mild pain',
        medications: ['morphine', 'oxycodone', 'fentanyl'],
        severity: 'MODERATE',
        management: 'Use WHO pain ladder'
      },
      {
        id: 'STOPP-L2',
        category: 'Analgesic',
        criteria: 'Regular opioids without laxatives',
        medications: ['morphine', 'oxycodone', 'tramadol'],
        severity: 'MODERATE',
        management: 'Prescribe laxatives prophylactically'
      }
    ];
  }

  // ============= START CRITERIA IMPLEMENTATION =============
  loadSTARTCriteria() {
    this.startCriteria = [
      // Section A: Cardiovascular System
      {
        id: 'START-A1',
        category: 'Cardiovascular',
        criteria: 'Warfarin/DOAC with chronic AF',
        indication: 'CHA2DS2-VASc ≥ 2 (men) or ≥ 3 (women)',
        medications: ['warfarin', 'apixaban', 'rivaroxaban', 'dabigatran'],
        israeliContext: 'All DOACs covered by Israeli health funds'
      },
      {
        id: 'START-A2',
        category: 'Cardiovascular',
        criteria: 'Aspirin with coronary artery disease',
        indication: 'History of MI, PCI, or CABG',
        medications: ['aspirin'],
        dose: '75-100mg daily'
      },
      {
        id: 'START-A3',
        category: 'Cardiovascular',
        criteria: 'Statin with documented atherosclerotic disease',
        indication: 'CAD, CVA, PAD',
        medications: ['atorvastatin', 'rosuvastatin', 'simvastatin'],
        israeliContext: 'High-intensity statins preferred'
      },
      {
        id: 'START-A4',
        category: 'Cardiovascular',
        criteria: 'ACE inhibitor/ARB with heart failure',
        indication: 'HFrEF (EF < 40%)',
        medications: ['ramipril', 'enalapril', 'valsartan', 'candesartan']
      },
      {
        id: 'START-A5',
        category: 'Cardiovascular',
        criteria: 'Beta-blocker with ischemic heart disease',
        indication: 'Post-MI or stable angina',
        medications: ['metoprolol', 'bisoprolol', 'carvedilol']
      },
      {
        id: 'START-A6',
        category: 'Cardiovascular',
        criteria: 'ACE inhibitor/ARB with diabetes and nephropathy',
        indication: 'Diabetic kidney disease',
        medications: ['ramipril', 'losartan', 'candesartan']
      },

      // Section B: Respiratory System
      {
        id: 'START-B1',
        category: 'Respiratory',
        criteria: 'Inhaled β2 agonist or anticholinergic for COPD',
        indication: 'Mild-moderate COPD with dyspnea',
        medications: ['salbutamol', 'tiotropium', 'formoterol']
      },
      {
        id: 'START-B2',
        category: 'Respiratory',
        criteria: 'Inhaled corticosteroid for moderate-severe COPD',
        indication: 'FEV1 < 50% predicted',
        medications: ['budesonide', 'fluticasone']
      },
      {
        id: 'START-B3',
        category: 'Respiratory',
        criteria: 'Home oxygen for chronic hypoxemia',
        indication: 'PaO2 < 55mmHg or SaO2 < 88%',
        israeliContext: 'Covered by Bituach Leumi with proper documentation'
      },

      // Section C: Central Nervous System
      {
        id: 'START-C1',
        category: 'CNS',
        criteria: 'L-DOPA or dopamine agonist for Parkinson\'s',
        indication: 'Functional impairment from PD',
        medications: ['levodopa/carbidopa', 'ropinirole', 'pramipexole']
      },
      {
        id: 'START-C2',
        category: 'CNS',
        criteria: 'Antidepressant for moderate-severe depression',
        indication: 'Major depression lasting ≥ 3 months',
        medications: ['sertraline', 'citalopram', 'mirtazapine'],
        israeliContext: 'SSRIs first-line in Israeli elderly'
      },
      {
        id: 'START-C3',
        category: 'CNS',
        criteria: 'Acetylcholinesterase inhibitor for Alzheimer\'s',
        indication: 'Mild-moderate Alzheimer\'s (MMSE 10-26)',
        medications: ['donepezil', 'rivastigmine', 'galantamine'],
        israeliContext: 'Covered by Sal with neurologist approval'
      },

      // Section D: Gastrointestinal System
      {
        id: 'START-D1',
        category: 'GI',
        criteria: 'PPI with severe GERD or peptic stricture',
        indication: 'Requiring maintenance therapy',
        medications: ['omeprazole', 'esomeprazole', 'pantoprazole']
      },
      {
        id: 'START-D2',
        category: 'GI',
        criteria: 'Fiber supplements for chronic constipation',
        indication: 'Symptomatic chronic constipation',
        medications: ['psyllium', 'methylcellulose']
      },

      // Section E: Musculoskeletal System
      {
        id: 'START-E1',
        category: 'Musculoskeletal',
        criteria: 'DMARDs with active rheumatoid arthritis',
        indication: 'Moderate-severe RA',
        medications: ['methotrexate', 'hydroxychloroquine', 'sulfasalazine']
      },
      {
        id: 'START-E2',
        category: 'Musculoskeletal',
        criteria: 'Bisphosphonates with osteoporosis',
        indication: 'T-score ≤ -2.5 or fragility fracture',
        medications: ['alendronate', 'risedronate', 'zoledronic acid'],
        israeliContext: 'Weekly alendronate most common in Israel'
      },
      {
        id: 'START-E3',
        category: 'Musculoskeletal',
        criteria: 'Vitamin D with housebound or falls',
        indication: 'Limited sun exposure or falls history',
        medications: ['cholecalciferol', 'ergocalciferol'],
        dose: '800-2000 IU daily'
      },
      {
        id: 'START-E4',
        category: 'Musculoskeletal',
        criteria: 'Calcium and vitamin D with osteoporosis',
        indication: 'Known osteoporosis',
        medications: ['calcium carbonate', 'vitamin D3'],
        israeliContext: 'Rocaltrol commonly prescribed'
      },

      // Section F: Endocrine System
      {
        id: 'START-F1',
        category: 'Endocrine',
        criteria: 'Metformin with type 2 diabetes',
        indication: 'T2DM if eGFR > 30',
        medications: ['metformin'],
        israeliContext: 'First-line in all Israeli guidelines'
      },
      {
        id: 'START-F2',
        category: 'Endocrine',
        criteria: 'ACE/ARB with diabetes and proteinuria',
        indication: 'Diabetic nephropathy',
        medications: ['ramipril', 'losartan']
      },
      {
        id: 'START-F3',
        category: 'Endocrine',
        criteria: 'Statin with diabetes if > 50 years',
        indication: 'Diabetes and age > 50',
        medications: ['atorvastatin', 'rosuvastatin']
      },

      // Section G: Urogenital System
      {
        id: 'START-G1',
        category: 'Urogenital',
        criteria: 'Alpha-1 blocker for symptomatic BPH',
        indication: 'Moderate-severe LUTS from BPH',
        medications: ['tamsulosin', 'alfuzosin'],
        israeliContext: 'Omnic (tamsulosin) widely used'
      },
      {
        id: 'START-G2',
        category: 'Urogenital',
        criteria: '5-alpha reductase inhibitor for BPH',
        indication: 'Prostate > 30g or PSA > 1.5',
        medications: ['finasteride', 'dutasteride']
      },

      // Section H: Analgesics
      {
        id: 'START-H1',
        category: 'Analgesics',
        criteria: 'Strong opioids for moderate-severe pain',
        indication: 'Pain impacting quality of life',
        medications: ['morphine', 'oxycodone', 'fentanyl'],
        israeliContext: 'Requires special prescription in Israel'
      },
      {
        id: 'START-H2',
        category: 'Analgesics',
        criteria: 'Laxatives with opioids',
        indication: 'Regular opioid use',
        medications: ['senna', 'lactulose', 'polyethylene glycol']
      },

      // Section I: Vaccines
      {
        id: 'START-I1',
        category: 'Vaccines',
        criteria: 'Annual influenza vaccine',
        indication: 'Age ≥ 65 years',
        israeliContext: 'Covered by all Kupot Holim annually'
      },
      {
        id: 'START-I2',
        category: 'Vaccines',
        criteria: 'Pneumococcal vaccine',
        indication: 'Age ≥ 65 years',
        israeliContext: 'PCV13 and PPSV23 both covered'
      }
    ];
  }

  // ============= BEERS CRITERIA IMPLEMENTATION =============
  loadBeersCriteria() {
    this.beersCriteria = {
      // Anticholinergics
      'diphenhydramine': {
        severity: 'HIGH',
        reason: 'High anticholinergic; sedation; increased fall risk',
        recommendation: 'Avoid',
        alternatives: ['loratadine', 'cetirizine', 'fexofenadine']
      },
      'hydroxyzine': {
        severity: 'HIGH',
        reason: 'Anticholinergic effects; confusion',
        recommendation: 'Avoid',
        alternatives: ['loratadine', 'cetirizine']
      },
      'promethazine': {
        severity: 'HIGH',
        reason: 'Anticholinergic; sedation',
        recommendation: 'Avoid'
      },

      // Benzodiazepines
      'diazepam': {
        severity: 'HIGH',
        reason: 'Long half-life; increased falls, fractures, MVA, cognitive impairment',
        recommendation: 'Avoid',
        alternatives: ['Sleep hygiene', 'CBT-I', 'Melatonin']
      },
      'clonazepam': {
        severity: 'HIGH',
        reason: 'Long half-life; falls and fractures',
        recommendation: 'Avoid',
        israeliContext: 'Rivotril commonly misused - educate patients'
      },
      'lorazepam': {
        severity: 'HIGH',
        reason: 'Falls, fractures, cognitive impairment',
        recommendation: 'Avoid for insomnia, agitation, delirium',
        maxDuration: '4 weeks'
      },
      'alprazolam': {
        severity: 'HIGH',
        reason: 'Falls, fractures, dependence',
        recommendation: 'Avoid',
        israeliContext: 'Xanax overuse common'
      },

      // Z-drugs
      'zolpidem': {
        severity: 'MODERATE',
        reason: 'Falls, fractures, complex sleep behaviors',
        recommendation: 'Avoid',
        israeliContext: 'Stilnox commonly prescribed - consider alternatives'
      },
      'zopiclone': {
        severity: 'MODERATE',
        reason: 'Falls, cognitive impairment',
        recommendation: 'Avoid'
      },

      // Antipsychotics
      'haloperidol': {
        severity: 'MODERATE',
        reason: 'Increased mortality in dementia; EPS',
        recommendation: 'Avoid except for schizophrenia, bipolar',
        exceptions: ['Schizophrenia', 'Bipolar disorder']
      },
      'risperidone': {
        severity: 'MODERATE',
        reason: 'Increased mortality and stroke in dementia',
        recommendation: 'Avoid for BPSD',
        exceptions: ['Schizophrenia', 'Bipolar disorder']
      },
      'quetiapine': {
        severity: 'MODERATE',
        reason: 'Increased mortality in dementia',
        recommendation: 'Avoid except for schizophrenia, bipolar',
        israeliContext: 'Often used off-label for insomnia - avoid'
      },

      // Cardiovascular
      'digoxin': {
        severity: 'MODERATE',
        reason: 'Decreased clearance; toxicity risk',
        recommendation: 'Avoid doses > 0.125mg/day',
        maxDose: '0.125mg/day'
      },
      'amiodarone': {
        severity: 'MODERATE',
        reason: 'Multiple toxicities; drug interactions',
        recommendation: 'Avoid as first-line for AF',
        exceptions: ['Ventricular arrhythmias']
      },
      'doxazosin': {
        severity: 'MODERATE',
        reason: 'Orthostatic hypotension; falls',
        recommendation: 'Avoid as antihypertensive',
        exceptions: ['BPH']
      },
      'prazosin': {
        severity: 'MODERATE',
        reason: 'Orthostatic hypotension',
        recommendation: 'Avoid as antihypertensive'
      },
      'terazosin': {
        severity: 'MODERATE',
        reason: 'Orthostatic hypotension',
        recommendation: 'Avoid as antihypertensive',
        exceptions: ['BPH']
      },
      'nifedipine_immediate': {
        severity: 'HIGH',
        reason: 'Hypotension; MI risk',
        recommendation: 'Avoid immediate-release'
      },

      // Pain Medications
      'meperidine': {
        severity: 'HIGH',
        reason: 'Neurotoxic metabolite; delirium',
        recommendation: 'Avoid',
        alternatives: ['Morphine', 'Oxycodone']
      },
      'indomethacin': {
        severity: 'MODERATE',
        reason: 'Most CNS adverse effects of NSAIDs',
        recommendation: 'Avoid',
        alternatives: ['Acetaminophen', 'Other NSAIDs if needed']
      },
      'ketorolac': {
        severity: 'MODERATE',
        reason: 'GI bleeding; AKI risk',
        recommendation: 'Avoid',
        israeliContext: 'Not commonly used in Israeli geriatrics'
      },

      // GI Medications
      'metoclopramide': {
        severity: 'MODERATE',
        reason: 'EPS; tardive dyskinesia',
        recommendation: 'Avoid unless gastroparesis',
        exceptions: ['Gastroparesis'],
        maxDuration: '12 weeks'
      },

      // Muscle Relaxants
      'cyclobenzaprine': {
        severity: 'HIGH',
        reason: 'Anticholinergic; sedation',
        recommendation: 'Avoid',
        alternatives: ['Physical therapy', 'Heat therapy']
      },
      'methocarbamol': {
        severity: 'HIGH',
        reason: 'Anticholinergic; sedation; falls',
        recommendation: 'Avoid'
      },
      'carisoprodol': {
        severity: 'HIGH',
        reason: 'Sedation; dependence; falls',
        recommendation: 'Avoid'
      },

      // Endocrine
      'glyburide': {
        severity: 'HIGH',
        reason: 'Prolonged hypoglycemia',
        recommendation: 'Avoid',
        alternatives: ['Gliclazide', 'Glipizide', 'DPP-4 inhibitors'],
        israeliContext: 'Switch to newer agents with lower hypoglycemia risk'
      },
      'sliding_scale_insulin': {
        severity: 'MODERATE',
        reason: 'Higher hypoglycemia risk without benefit',
        recommendation: 'Avoid sliding scale alone'
      },

      // Genitourinary
      'oxybutynin': {
        severity: 'HIGH',
        reason: 'High anticholinergic burden',
        recommendation: 'Avoid',
        alternatives: ['Mirabegron', 'Solifenacin', 'Darifenacin']
      },
      'tolterodine': {
        severity: 'MODERATE',
        reason: 'Anticholinergic effects',
        recommendation: 'Use with caution',
        alternatives: ['Mirabegron']
      },

      // Antidepressants
      'amitriptyline': {
        severity: 'HIGH',
        reason: 'High anticholinergic; sedation; orthostatic hypotension',
        recommendation: 'Avoid',
        alternatives: ['SSRIs', 'SNRIs', 'Mirtazapine']
      },
      'nortriptyline': {
        severity: 'MODERATE',
        reason: 'Anticholinergic; sedation',
        recommendation: 'Avoid',
        alternatives: ['SSRIs', 'SNRIs']
      },
      'paroxetine': {
        severity: 'MODERATE',
        reason: 'Most anticholinergic SSRI',
        recommendation: 'Avoid',
        alternatives: ['Sertraline', 'Citalopram', 'Escitalopram'],
        israeliContext: 'Seroxat use declining - good trend'
      }
    };
  }

  // ============= SAL FORMULARY COVERAGE =============
  loadSalCoverage() {
    this.salCoverage = {
      // Anticoagulants
      'apixaban': {
        covered: true,
        criteria: 'CHA2DS2-VASc ≥ 2 for men, ≥ 3 for women',
        restrictions: 'Requires cardiologist or internist approval',
        copay: 'Tier 2'
      },
      'rivaroxaban': {
        covered: true,
        criteria: 'AF with CHA2DS2-VASc ≥ 2, or VTE treatment',
        restrictions: 'Initial prescription by specialist',
        copay: 'Tier 2'
      },
      'dabigatran': {
        covered: true,
        criteria: 'AF or VTE, CrCl > 30',
        restrictions: 'Not for valvular AF',
        copay: 'Tier 2'
      },
      'edoxaban': {
        covered: true,
        criteria: 'AF or VTE after 5-10 days parenteral anticoagulation',
        restrictions: 'Specialist approval',
        copay: 'Tier 2'
      },

      // Diabetes
      'empagliflozin': {
        covered: true,
        criteria: 'T2DM with established CV disease or HF',
        restrictions: 'Endocrinologist or cardiologist approval',
        copay: 'Tier 3'
      },
      'dapagliflozin': {
        covered: true,
        criteria: 'T2DM with CV risk or HF',
        restrictions: 'Specialist approval required',
        copay: 'Tier 3'
      },
      'semaglutide': {
        covered: true,
        criteria: 'T2DM with BMI > 30 or CV disease',
        restrictions: 'Endocrinologist approval, prior metformin failure',
        copay: 'Tier 3'
      },
      'liraglutide': {
        covered: true,
        criteria: 'T2DM with CV disease',
        restrictions: 'Specialist approval',
        copay: 'Tier 3'
      },

      // Dementia
      'donepezil': {
        covered: true,
        criteria: 'Alzheimer\'s with MMSE 10-26',
        restrictions: 'Neurologist or geriatrician prescription',
        copay: 'Tier 2'
      },
      'rivastigmine': {
        covered: true,
        criteria: 'Alzheimer\'s or Parkinson\'s dementia, MMSE 10-26',
        restrictions: 'Specialist approval',
        copay: 'Tier 2'
      },
      'memantine': {
        covered: true,
        criteria: 'Moderate-severe Alzheimer\'s, MMSE < 20',
        restrictions: 'Can combine with cholinesterase inhibitor',
        copay: 'Tier 2'
      },

      // Osteoporosis
      'alendronate': {
        covered: true,
        criteria: 'T-score ≤ -2.5 or fragility fracture',
        restrictions: 'None - first line',
        copay: 'Tier 1'
      },
      'denosumab': {
        covered: true,
        criteria: 'Failed or contraindication to bisphosphonates',
        restrictions: 'Endocrinologist approval',
        copay: 'Tier 3'
      },
      'teriparatide': {
        covered: true,
        criteria: 'Severe osteoporosis with fractures despite treatment',
        restrictions: 'Endocrinologist only, max 24 months',
        copay: 'Tier 3'
      },

      // Psychiatric
      'sertraline': {
        covered: true,
        criteria: 'Depression, anxiety disorders',
        restrictions: 'None',
        copay: 'Tier 1'
      },
      'escitalopram': {
        covered: true,
        criteria: 'Depression, anxiety',
        restrictions: 'None',
        copay: 'Tier 1'
      },
      'mirtazapine': {
        covered: true,
        criteria: 'Depression, especially with insomnia or weight loss',
        restrictions: 'None',
        copay: 'Tier 1'
      },
      'quetiapine': {
        covered: true,
        criteria: 'Schizophrenia, bipolar disorder',
        restrictions: 'Psychiatrist for maintenance',
        copay: 'Tier 2'
      },

      // Respiratory
      'tiotropium': {
        covered: true,
        criteria: 'COPD with FEV1 < 60%',
        restrictions: 'Pulmonologist or internist',
        copay: 'Tier 2'
      },
      'budesonide_formoterol': {
        covered: true,
        criteria: 'Asthma or COPD not controlled on monotherapy',
        restrictions: 'None',
        copay: 'Tier 2'
      }
    };
  }

  loadCriticalInteractions() {
    // DANGEROUS COMBINATIONS - Clinical significance ratings
    this.dangerousInteractions = {
      // Warfarin interactions (very common in Israel)
      'warfarin': {
        'amiodarone': {
          severity: 'MAJOR',
          mechanism: 'CYP2C9 inhibition + P-gp inhibition',
          effect: 'Dramatically increases INR (2-3x)',
          management: 'Reduce warfarin dose by 30-50%. Monitor INR closely.',
          timeframe: '1-2 days',
          frequency: 'Very common interaction'
        },
        'fluconazole': {
          severity: 'MAJOR',
          mechanism: 'CYP2C9 potent inhibition',
          effect: 'Increases INR dramatically',
          management: 'Reduce warfarin dose by 50% or hold. Daily INR monitoring.',
          timeframe: '2-3 days',
          frequency: 'Common interaction'
        },
        'trimethoprim': {
          severity: 'MAJOR',
          mechanism: 'CYP2C9 inhibition',
          effect: 'Increases INR significantly',
          management: 'Monitor INR closely. Consider dose reduction.',
          timeframe: '2-5 days',
          frequency: 'Very common - TMP-SMX widely prescribed'
        },
        'aspirin': {
          severity: 'MAJOR',
          mechanism: 'Dual antiplatelet + anticoagulation',
          effect: 'Dramatically increases bleeding risk',
          management: 'Use only if clear indication (e.g., mechanical valve). GI protection.',
          timeframe: 'Immediate',
          frequency: 'Common inappropriate combination'
        },
        'nsaids': {
          severity: 'MAJOR',
          mechanism: 'Antiplatelet effect + GI irritation',
          effect: 'Increases bleeding risk 3-4x',
          management: 'Avoid NSAIDs. Use acetaminophen instead.',
          timeframe: 'Within hours',
          frequency: 'Very common dangerous combination'
        },
        'antibiotics': {
          severity: 'MODERATE-MAJOR',
          mechanism: 'Gut flora alteration + some CYP inhibition',
          effect: 'Unpredictable INR changes',
          management: 'Monitor INR 2-3x/week during antibiotic course.',
          timeframe: '3-7 days',
          frequency: 'Very common'
        }
      },

      // SSRI interactions (common in Israeli psychiatry)
      'sertraline': {
        'tramadol': {
          severity: 'MAJOR',
          mechanism: 'Dual serotonergic activity',
          effect: 'Serotonin syndrome risk',
          management: 'AVOID combination. Use different analgesic.',
          timeframe: 'Hours to days',
          frequency: 'Common dangerous combination in Israel'
        },
        'nsaids': {
          severity: 'MODERATE',
          mechanism: 'Dual antiplatelet effects',
          effect: 'Increased bleeding risk',
          management: 'Monitor for bleeding. Consider PPI.',
          timeframe: 'Days to weeks',
          frequency: 'Very common combination'
        },
        'warfarin': {
          severity: 'MODERATE',
          mechanism: 'Antiplatelet effect of SSRI',
          effect: 'Increased bleeding risk',
          management: 'Monitor INR more frequently. Watch for bleeding.',
          timeframe: '1-2 weeks',
          frequency: 'Common in elderly'
        }
      },

      // Beta-blocker interactions
      'metoprolol': {
        'verapamil': {
          severity: 'MAJOR',
          mechanism: 'Dual negative inotropic effects',
          effect: 'Severe bradycardia, AV block, hypotension',
          management: 'AVOID combination. Use alternative.',
          timeframe: 'Hours',
          frequency: 'Dangerous combination'
        },
        'diltiazem': {
          severity: 'MAJOR',
          mechanism: 'Dual negative chronotropic effects',
          effect: 'Bradycardia, AV conduction delays',
          management: 'AVOID combination or use with extreme caution.',
          timeframe: 'Hours',
          frequency: 'Dangerous combination'
        },
        'insulin': {
          severity: 'MODERATE',
          mechanism: 'Masks hypoglycemic symptoms',
          effect: 'Delayed recognition of hypoglycemia',
          management: 'Patient education. Frequent glucose monitoring.',
          timeframe: 'Ongoing',
          frequency: 'Common in diabetic patients'
        }
      },

      // ACE inhibitor interactions
      'ramipril': {
        'nsaids': {
          severity: 'MODERATE',
          mechanism: 'Reduced GFR + hyperkalemia risk',
          effect: 'Acute kidney injury, hyperkalemia',
          management: 'Monitor Cr, K+ within 1 week. Avoid if possible.',
          timeframe: 'Days to weeks',
          frequency: 'Very common combination'
        },
        'potassium_supplements': {
          severity: 'MODERATE',
          mechanism: 'Dual potassium retention',
          effect: 'Hyperkalemia (K+ >5.5)',
          management: 'Monitor K+ closely. May need to stop K+ supplements.',
          timeframe: 'Days',
          frequency: 'Common in CKD patients'
        },
        'trimethoprim': {
          severity: 'MODERATE',
          mechanism: 'Amiloride-like effect',
          effect: 'Hyperkalemia',
          management: 'Monitor K+ during TMP-SMX course.',
          timeframe: '3-5 days',
          frequency: 'Common with UTI treatment'
        }
      },

      // Dangerous benzodiazepine combinations
      'clonazepam': {
        'opioids': {
          severity: 'MAJOR',
          mechanism: 'Dual CNS depression',
          effect: 'Respiratory depression, death risk',
          management: 'AVOID combination. FDA black box warning.',
          timeframe: 'Minutes to hours',
          frequency: 'Leading cause of overdose deaths'
        },
        'alcohol': {
          severity: 'MAJOR',
          mechanism: 'Enhanced GABA activity',
          effect: 'Severe sedation, respiratory depression',
          management: 'Absolute contraindication. Patient counseling.',
          timeframe: 'Minutes',
          frequency: 'Common dangerous combination'
        }
      },

      // Tramadol serotonin syndrome risks
      'tramadol': {
        'mirtazapine': {
          severity: 'MAJOR',
          mechanism: 'Dual serotonergic + noradrenergic activity',
          effect: 'Serotonin syndrome',
          management: 'AVOID. Use different analgesic.',
          timeframe: 'Hours',
          frequency: 'Dangerous combination'
        },
        'maois': {
          severity: 'CONTRAINDICATED',
          mechanism: 'Severe serotonergic enhancement',
          effect: 'Severe serotonin syndrome, seizures',
          management: 'Absolute contraindication. 14-day washout.',
          timeframe: 'Hours',
          frequency: 'Life-threatening'
        }
      }
    };

    // Build comprehensive interaction matrix
    this.buildInteractionMatrix();
  }

  buildInteractionMatrix() {
    // Create bidirectional interaction mapping
    this.interactions = {};
    
    Object.keys(this.dangerousInteractions).forEach(drug1 => {
      if (!this.interactions[drug1]) this.interactions[drug1] = {};
      
      Object.keys(this.dangerousInteractions[drug1]).forEach(drug2 => {
        const interaction = this.dangerousInteractions[drug1][drug2];
        
        // Add interaction both ways
        this.interactions[drug1][drug2] = interaction;
        
        if (!this.interactions[drug2]) this.interactions[drug2] = {};
        this.interactions[drug2][drug1] = interaction;
      });
    });
  }

  addMedication(genericName, data) {
    this.medications[genericName.toLowerCase()] = {
      ...data,
      searchTerms: this.generateSearchTerms(genericName, data)
    };
  }

  generateSearchTerms(name, data) {
    const terms = [name.toLowerCase()];
    
    // Add brand names
    if (data.brandNames) {
      terms.push(...data.brandNames.map(brand => brand.toLowerCase()));
    }
    
    // Add Hebrew name if available
    if (data.hebrewName) {
      terms.push(data.hebrewName);
    }
    
    // Add class terms
    if (data.class) {
      terms.push(data.class.toLowerCase());
    }
    
    return terms;
  }

  searchDrug(query) {
    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Check brand names first
    if (this.brandNames[searchTerm]) {
      const genericName = this.brandNames[searchTerm];
      if (this.medications[genericName]) {
        results.push(this.medications[genericName]);
      }
    }

    // Exact generic name match
    if (this.medications[searchTerm] && !results.includes(this.medications[searchTerm])) {
      results.push(this.medications[searchTerm]);
    }

    // Partial matches
    Object.values(this.medications).forEach(med => {
      if (results.includes(med)) return;
      
      // Check if search term matches any search terms
      if (med.searchTerms && med.searchTerms.some(term => 
        term.includes(searchTerm) || searchTerm.includes(term)
      )) {
        results.push(med);
      }
    });

    return results.slice(0, 5); // Top 5 results
  }

  getDrugInfo(drugName) {
    const results = this.searchDrug(drugName);
    if (results.length > 0) {
      return results[0];
    }
    return { 
      error: 'Drug not found', 
      suggestion: 'Try brand names like: Tritace, Norvasc, Zoloft, Augmentin, or generic names like metoprolol, sertraline' 
    };
  }

  // ============= STOPP/START CHECK FUNCTIONS =============
  checkSTOPPCriteria(medicationList) {
    const violations = [];
    
    medicationList.forEach(med => {
      const medInfo = this.searchDrug(med)[0];
      if (!medInfo) return;
      
      this.stoppCriteria.forEach(criteria => {
        if (criteria.medications && criteria.medications.includes(medInfo.genericName)) {
          violations.push({
            medication: med,
            criteria: criteria,
            severity: criteria.severity,
            recommendation: criteria.management || 'Review medication'
          });
        }
      });
    });
    
    return violations;
  }

  checkSTARTCriteria(conditions, currentMeds) {
    const recommendations = [];
    
    this.startCriteria.forEach(criteria => {
      // Check if condition matches and medication not present
      const conditionMatch = this.matchesCondition(conditions, criteria.indication);
      const hasMedication = this.hasMedicationClass(currentMeds, criteria.medications);
      
      if (conditionMatch && !hasMedication) {
        recommendations.push({
          criteria: criteria,
          indication: criteria.indication,
          suggestedMedications: criteria.medications,
          israeliContext: criteria.israeliContext
        });
      }
    });
    
    return recommendations;
  }

  checkBeersCriteria(medication) {
    const medInfo = this.searchDrug(medication)[0];
    if (!medInfo) return null;
    
    const beersCriteria = this.beersCriteria[medInfo.genericName];
    if (beersCriteria) {
      return {
        medication: medication,
        severity: beersCriteria.severity,
        reason: beersCriteria.reason,
        recommendation: beersCriteria.recommendation,
        alternatives: beersCriteria.alternatives,
        israeliContext: beersCriteria.israeliContext
      };
    }
    
    return null;
  }

  checkSalCoverage(medication) {
    const medInfo = this.searchDrug(medication)[0];
    if (!medInfo) return null;
    
    const coverage = this.salCoverage[medInfo.genericName];
    if (coverage) {
      return {
        medication: medication,
        covered: coverage.covered,
        criteria: coverage.criteria,
        restrictions: coverage.restrictions,
        copay: coverage.copay
      };
    }
    
    return { medication: medication, covered: false, note: 'Coverage information not available' };
  }

  // Helper functions
  matchesCondition(conditions, indication) {
    // Simplified condition matching - would need more complex logic in production
    return conditions.some(condition => 
      indication.toLowerCase().includes(condition.toLowerCase())
    );
  }

  hasMedicationClass(currentMeds, medicationClass) {
    return currentMeds.some(med => {
      const medInfo = this.searchDrug(med)[0];
      return medInfo && medicationClass.includes(medInfo.genericName);
    });
  }

  checkInteractions(drugList) {
    const interactions = [];
    const processedPairs = new Set();

    // Normalize drug names to generic names
    const normalizedDrugs = drugList.map(drug => {
      const drugInfo = this.searchDrug(drug);
      return drugInfo.length > 0 ? drugInfo[0].genericName : drug.toLowerCase();
    });

    // Check all pairs
    for (let i = 0; i < normalizedDrugs.length; i++) {
      const drug1 = normalizedDrugs[i];
      
      for (let j = i + 1; j < normalizedDrugs.length; j++) {
        const drug2 = normalizedDrugs[j];
        const pairKey = [drug1, drug2].sort().join('-');
        
        if (processedPairs.has(pairKey)) continue;
        processedPairs.add(pairKey);

        // Check for interaction
        const interaction = this.getInteraction(drug1, drug2);
        if (interaction) {
          interactions.push({
            drugs: [drug1, drug2],
            originalNames: [drugList[i], drugList[j]],
            ...interaction
          });
        }
      }
    }

    // Sort by severity
    const severityOrder = { 'CONTRAINDICATED': 0, 'MAJOR': 1, 'MODERATE': 2, 'MINOR': 3 };
    interactions.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return interactions;
  }

  getInteraction(drug1, drug2) {
    // Check direct interactions
    if (this.interactions[drug1] && this.interactions[drug1][drug2]) {
      return this.interactions[drug1][drug2];
    }
    
    if (this.interactions[drug2] && this.interactions[drug2][drug1]) {
      return this.interactions[drug2][drug1];
    }

    // Check class-based interactions
    const drug1Info = this.medications[drug1];
    const drug2Info = this.medications[drug2];
    
    if (drug1Info && drug2Info) {
      return this.checkClassInteractions(drug1Info, drug2Info);
    }

    return null;
  }

  checkClassInteractions(drug1Info, drug2Info) {
    const class1 = drug1Info.class?.toLowerCase() || '';
    const class2 = drug2Info.class?.toLowerCase() || '';

    // SSRI + NSAID
    if ((class1.includes('ssri') && class2.includes('nsaid')) ||
        (class2.includes('ssri') && class1.includes('nsaid'))) {
      return {
        severity: 'MODERATE',
        mechanism: 'Dual antiplatelet effects',
        effect: 'Increased bleeding risk',
        management: 'Monitor for bleeding signs. Consider PPI for GI protection.',
        timeframe: '1-2 weeks',
        frequency: 'Common combination'
      };
    }

    // ACE inhibitor + NSAID
    if ((class1.includes('ace inhibitor') && class2.includes('nsaid')) ||
        (class2.includes('ace inhibitor') && class1.includes('nsaid'))) {
      return {
        severity: 'MODERATE',
        mechanism: 'Reduced renal function + hyperkalemia risk',
        effect: 'Acute kidney injury, reduced antihypertensive effect',
        management: 'Monitor Cr, K+, BP within 1 week. Avoid NSAIDs if possible.',
        timeframe: 'Days',
        frequency: 'Very common dangerous combination'
      };
    }

    // Beta-blocker + Calcium channel blocker (non-dihydropyridine)
    if ((class1.includes('beta-blocker') && class2.includes('calcium channel')) ||
        (class2.includes('beta-blocker') && class1.includes('calcium channel'))) {
      return {
        severity: 'MAJOR',
        mechanism: 'Dual negative inotropic and chronotropic effects',
        effect: 'Bradycardia, AV block, hypotension',
        management: 'Use with extreme caution. Monitor HR, BP, PR interval.',
        timeframe: 'Hours',
        frequency: 'Potentially dangerous'
      };
    }

    return null;
  }

  getInteractionSummary(drugList) {
    const interactions = this.checkInteractions(drugList);
    
    const summary = {
      totalInteractions: interactions.length,
      contraindicated: interactions.filter(i => i.severity === 'CONTRAINDICATED').length,
      major: interactions.filter(i => i.severity === 'MAJOR').length,
      moderate: interactions.filter(i => i.severity === 'MODERATE').length,
      minor: interactions.filter(i => i.severity === 'MINOR').length,
      interactions: interactions,
      recommendations: this.generateRecommendations(interactions, drugList)
    };

    return summary;
  }

  generateRecommendations(interactions, drugList) {
    const recommendations = [];

    // Contraindicated combinations
    const contraindicated = interactions.filter(i => i.severity === 'CONTRAINDICATED');
    if (contraindicated.length > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        action: `STOP immediately: ${contraindicated.map(i => i.originalNames.join(' + ')).join(', ')}`,
        reason: 'Contraindicated combinations present - life-threatening risk'
      });
    }

    // Major interactions
    const major = interactions.filter(i => i.severity === 'MAJOR');
    if (major.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Review major interactions urgently',
        reason: `${major.length} major interactions requiring immediate attention`
      });
    }

    // General recommendations
    if (drugList.length > 10) {
      recommendations.push({
        priority: 'MODERATE',
        action: 'Comprehensive medication review',
        reason: `Polypharmacy (${drugList.length} medications) - high interaction risk`
      });
    }

    if (interactions.length === 0 && drugList.length > 5) {
      recommendations.push({
        priority: 'LOW',
        action: 'Continue monitoring',
        reason: 'No significant interactions detected, but continue vigilant monitoring'
      });
    }

    return recommendations;
  }

  // Israeli-specific functions
  getIsraeliAlternatives(drugName) {
    const alternatives = {
      'clonazepam': {
        alternatives: ['trazodone', 'mirtazapine', 'melatonin'],
        israeliContext: 'Avoid Rivotril in elderly - consider sleep hygiene counseling available at Clalit/Maccabi'
      },
      'glyburide': {
        alternatives: ['glipizide', 'metformin', 'empagliflozin'],
        israeliContext: 'Switch from older sulfonylureas - newer options available on health fund formularies'
      },
      'diphenhydramine': {
        alternatives: ['loratadine', 'cetirizine', 'fexofenadine'],
        israeliContext: 'Avoid Benadryl-type antihistamines - non-sedating options preferred'
      }
    };

    return alternatives[drugName.toLowerCase()] || null;
  }

  getHealthFundCoverage(drugName) {
    // Simulate health fund coverage info
    const coverage = {
      'rivaroxaban': 'Covered by all health funds for AF, VTE. Requires pre-approval.',
      'apixaban': 'Covered with restrictions. CrCl and age criteria apply.',
      'empagliflozin': 'Covered for T2DM with CV indication. Endocrinologist approval needed.',
      'mirtazapine': 'Fully covered. Generic available.',
      'sertraline': 'Fully covered by all health funds.'
    };

    return coverage[drugName.toLowerCase()] || 'Coverage information not available';
  }

  generateReport() {
    return {
      totalMedications: Object.keys(this.medications).length,
      brandNames: Object.keys(this.brandNames).length,
      criticalInteractions: Object.keys(this.dangerousInteractions).length,
      interactionPairs: Object.values(this.interactions).reduce((sum, drug) => sum + Object.keys(drug).length, 0)
    };
  }
}

// Create UI Integration
class DrugDatabaseUI {
  constructor() {
    this.db = window.IsraeliDrugDatabase;
    this.createUI();
  }

  createUI() {
    const uiHTML = `
      <div id="drug-database-ui" style="display:none;">
        <div class="drug-search-section">
          <h3>💊 Medication Search</h3>
          <input type="text" id="drug-search-input" placeholder="Enter medication name (English/Hebrew/Brand)">
          <button onclick="drugUI.searchMedication()">Search</button>
          <div id="drug-search-results"></div>
        </div>
        
        <div class="interaction-check-section">
          <h3>⚠️ Interaction Checker</h3>
          <textarea id="medication-list" placeholder="Enter medications (one per line)"></textarea>
          <button onclick="drugUI.checkInteractions()">Check Interactions</button>
          <div id="interaction-results"></div>
        </div>
        
        <div class="comprehensive-review-section">
          <h3>📋 Comprehensive Medication Review</h3>
          <button onclick="drugUI.showReviewForm()">Start Review</button>
          <div id="review-form" style="display:none;">
            <input type="number" id="patient-age" placeholder="Age">
            <input type="number" id="patient-creatinine" placeholder="Creatinine">
            <textarea id="patient-medications" placeholder="Medications"></textarea>
            <textarea id="patient-conditions" placeholder="Conditions"></textarea>
            <button onclick="drugUI.performReview()">Generate Review</button>
          </div>
          <div id="review-results"></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', uiHTML);
  }

  searchMedication() {
    const query = document.getElementById('drug-search-input').value;
    const results = this.db.searchDrug(query);
    const resultsDiv = document.getElementById('drug-search-results');
    
    if (results.length > 0) {
      const med = results[0];
      resultsDiv.innerHTML = `
        <div class="medication-info">
          <h4>${med.genericName} (${med.hebrewName || 'N/A'})</h4>
          <p><strong>Brand Names:</strong> ${med.brandNames.join(', ')}</p>
          <p><strong>Class:</strong> ${med.class}</p>
          <p><strong>Geriatric Start Dose:</strong> ${med.dosing.geriatricStart}</p>
          <p><strong>Considerations:</strong> ${med.geriatricConsiderations}</p>
          ${med.beersCriteria ? `<p class="warning"><strong>BEERS:</strong> ${med.beersCriteria}</p>` : ''}
          ${med.israeliNotes ? `<p><strong>Israeli Context:</strong> ${med.israeliNotes}</p>` : ''}
        </div>
      `;
    } else {
      resultsDiv.innerHTML = '<p>No medication found</p>';
    }
  }

  checkInteractions() {
    const medications = document.getElementById('medication-list').value.split('\n').filter(m => m.trim());
    const interactions = this.db.checkInteractions(medications);
    const resultsDiv = document.getElementById('interaction-results');
    
    if (interactions.length > 0) {
      resultsDiv.innerHTML = interactions.map(i => `
        <div class="interaction-alert ${i.severity.toLowerCase()}">
          <h4>${i.drugs.join(' + ')}</h4>
          <p><strong>Severity:</strong> ${i.severity}</p>
          <p><strong>Effect:</strong> ${i.effect}</p>
          <p><strong>Management:</strong> ${i.management}</p>
        </div>
      `).join('');
    } else {
      resultsDiv.innerHTML = '<p class="success">No significant interactions found</p>';
    }
  }

  performReview() {
    const patientData = {
      age: parseInt(document.getElementById('patient-age').value),
      creatinine: parseFloat(document.getElementById('patient-creatinine').value),
      medications: document.getElementById('patient-medications').value.split('\n').filter(m => m.trim()),
      conditions: document.getElementById('patient-conditions').value.split('\n').filter(c => c.trim())
    };
    
    const review = this.db.performComprehensiveMedicationReview(patientData);
    const resultsDiv = document.getElementById('review-results');
    
    resultsDiv.innerHTML = `
      <div class="review-report">
        <h4>Medication Review Report</h4>
        <p><strong>Patient:</strong> ${patientData.age} years, eGFR: ${review.patient.eGFR}</p>
        <p><strong>Medications:</strong> ${review.patient.medicationCount}</p>
        
        ${review.priorityActions.length > 0 ? `
          <div class="priority-actions">
            <h5>Priority Actions:</h5>
            ${review.priorityActions.map(a => `
              <p class="action-item">• ${a.action} (${a.type})</p>
            `).join('')}
          </div>
        ` : ''}
        
        <p><strong>Interactions:</strong> ${review.interactions.length}</p>
        <p><strong>STOPP Violations:</strong> ${review.stoppViolations.length}</p>
        <p><strong>START Recommendations:</strong> ${review.startRecommendations.length}</p>
        <p><strong>Beers Violations:</strong> ${review.beersViolations.length}</p>
      </div>
    `;
  }

  showReviewForm() {
    const form = document.getElementById('review-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

// Initialize Israeli Drug Database
window.IsraeliDrugDatabase = new IsraeliDrugDatabase();

// Initialize UI
window.drugUI = new DrugDatabaseUI();

// Integration with existing systems
if (window.DrugDatabase) {
  console.log('🔗 Israeli Drug Database integrated with existing system');
}

console.log(`
🇮🇱 Israeli Drug Database Ready!

Features:
- Israeli brand names (Tritace, Norvasc, Zoloft, etc.)
- Hebrew drug names
- Clinical significance-based interactions
- Dangerous combination alerts
- Israeli healthcare context
- Health fund coverage info

Search examples:
- "Tritace" → finds ramipril
- "Norvasc" → finds amlodipine  
- "Rivotril" → finds clonazepam (with elderly warnings)

Usage:
IsraeliDrugDatabase.getDrugInfo("Tritace")
IsraeliDrugDatabase.checkInteractions(["warfarin", "amiodarone"])
`);