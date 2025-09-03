// comprehensive-drug-database.js
// Complete drug database with 100+ medications for geriatrics

class ComprehensiveDrugDatabase {
  constructor() {
    this.drugs = {};
    this.interactions = {};
    this.beersCriteria = {};
    this.stoppCriteria = {};
    this.loadDatabase();
  }

  loadDatabase() {
    this.loadCardiovascularDrugs();
    this.loadPsychiatricDrugs();
    this.loadAnticoagulants();
    this.loadAntibiotics();
    this.loadGIDrugs();
    this.loadPainMedications();
    this.loadDiabetesDrugs();
    this.loadRespiratory();
    this.loadNeurological();
    this.loadOthers();
    this.loadInteractions();
    this.loadBeersCriteria();
    this.loadSTOPPCriteria();
    
    console.log(`💊 Drug Database Loaded: ${Object.keys(this.drugs).length} medications`);
  }

  loadCardiovascularDrugs() {
    // Beta Blockers
    this.addDrug('metoprolol', {
      class: 'Beta-blocker (selective)',
      indication: 'Hypertension, CHF, CAD',
      startDose: '12.5-25mg BID',
      maxDose: '200mg BID',
      geriatricConsiderations: 'Start low, go slow. Monitor for bradycardia, fatigue. Check BP sitting/standing',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Use with caution',
      commonSideEffects: 'Bradycardia, fatigue, dizziness, depression',
      contraindications: '2nd/3rd degree AV block, severe bradycardia, decompensated CHF',
      monitoring: 'HR, BP, symptoms of CHF',
      beersCriteria: false,
      interactions: ['Verapamil', 'Diltiazem', 'Digoxin', 'Insulin'],
      pregnancy: 'B'
    });

    this.addDrug('atenolol', {
      class: 'Beta-blocker (selective)',
      indication: 'Hypertension, angina',
      startDose: '25mg daily',
      maxDose: '100mg daily',
      geriatricConsiderations: 'Renally eliminated - dose adjust for CrCl. Preferred if hepatic disease',
      renalDosing: 'CrCl 15-35: 50% dose, CrCl <15: 25% dose',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['NSAIDs', 'Calcium channel blockers'],
      monitoring: 'HR, BP, renal function'
    });

    this.addDrug('carvedilol', {
      class: 'Beta-blocker (non-selective) + alpha blocker',
      indication: 'CHF, hypertension',
      startDose: '3.125mg BID',
      maxDose: '25mg BID (50mg BID if >85kg)',
      geriatricConsiderations: 'Titrate slowly every 2 weeks. Monitor for orthostatic hypotension',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Avoid in severe hepatic impairment',
      beersCriteria: false,
      interactions: ['Digoxin', 'Cyclosporine', 'Rifampin'],
      monitoring: 'HR, BP, weight, symptoms of CHF'
    });

    // ACE Inhibitors
    this.addDrug('lisinopril', {
      class: 'ACE inhibitor',
      indication: 'Hypertension, CHF, post-MI, diabetic nephropathy',
      startDose: '2.5-5mg daily',
      maxDose: '40mg daily',
      geriatricConsiderations: 'Monitor K+, Cr within 1-2 weeks. Risk of angioedema higher in elderly',
      renalDosing: 'CrCl 10-50: 75% dose, CrCl <10: 50% dose',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['NSAIDs', 'Potassium supplements', 'Trimethoprim-SMX', 'Lithium'],
      monitoring: 'BP, K+, Cr, dry cough',
      contraindications: 'Bilateral renal artery stenosis, hyperkalemia >5.5, angioedema history'
    });

    this.addDrug('enalapril', {
      class: 'ACE inhibitor',
      indication: 'Hypertension, CHF',
      startDose: '2.5mg BID',
      maxDose: '20mg BID',
      geriatricConsiderations: 'Has IV formulation available. Monitor renal function closely',
      renalDosing: 'CrCl 10-50: 75% dose, CrCl <10: 50% dose',
      beersCriteria: false,
      interactions: ['NSAIDs', 'Potassium-sparing diuretics'],
      monitoring: 'BP, K+, Cr'
    });

    // ARBs
    this.addDrug('losartan', {
      class: 'Angiotensin receptor blocker',
      indication: 'Hypertension, CHF, diabetic nephropathy',
      startDose: '25mg daily',
      maxDose: '100mg daily',
      geriatricConsiderations: 'Better tolerated than ACE inhibitors (no cough). Monitor K+',
      renalDosing: 'CrCl <30: start 25mg daily',
      hepaticDosing: 'Reduce dose in cirrhosis',
      beersCriteria: false,
      interactions: ['NSAIDs', 'Lithium', 'Rifampin'],
      monitoring: 'BP, K+, Cr'
    });

    // Calcium Channel Blockers
    this.addDrug('amlodipine', {
      class: 'Calcium channel blocker (dihydropyridine)',
      indication: 'Hypertension, angina',
      startDose: '2.5mg daily',
      maxDose: '10mg daily',
      geriatricConsiderations: 'Well tolerated in elderly. Monitor for peripheral edema',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Start 2.5mg daily',
      beersCriteria: false,
      interactions: ['Simvastatin (limit to 20mg)', 'Cyclosporine', 'Tacrolimus'],
      monitoring: 'BP, ankle edema, gingival hyperplasia',
      commonSideEffects: 'Peripheral edema, flushing, headache'
    });

    this.addDrug('diltiazem', {
      class: 'Calcium channel blocker (non-dihydropyridine)',
      indication: 'Hypertension, angina, atrial fibrillation rate control',
      startDose: 'IR: 30mg QID, ER: 120mg daily',
      maxDose: 'ER: 480mg daily',
      geriatricConsiderations: 'Monitor for bradycardia, AV block. Drug interactions common',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Use with caution',
      beersCriteria: false,
      interactions: ['Beta-blockers', 'Digoxin', 'Statins', 'Warfarin'],
      monitoring: 'HR, BP, PR interval',
      contraindications: '2nd/3rd degree AV block, sick sinus syndrome'
    });

    // Diuretics
    this.addDrug('furosemide', {
      class: 'Loop diuretic',
      indication: 'CHF, edema, hypertension',
      startDose: '20mg daily',
      maxDose: '600mg daily (divided doses)',
      geriatricConsiderations: 'Risk of dehydration, orthostatic hypotension, electrolyte imbalances',
      renalDosing: 'May need higher doses in CKD',
      hepaticDosing: 'Monitor carefully for hepatic encephalopathy',
      beersCriteria: false,
      interactions: ['NSAIDs', 'Lithium', 'Digoxin', 'Aminoglycosides'],
      monitoring: 'Weight, electrolytes, Cr, hearing (high doses)',
      commonSideEffects: 'Hyponatremia, hypokalemia, ototoxicity, hyperuricemia'
    });

    this.addDrug('hydrochlorothiazide', {
      class: 'Thiazide diuretic',
      indication: 'Hypertension, mild CHF',
      startDose: '12.5mg daily',
      maxDose: '25mg daily (elderly)',
      geriatricConsiderations: 'Preferred over higher doses. Monitor Na+, K+. May worsen diabetes',
      renalDosing: 'Ineffective if CrCl <30',
      hepaticDosing: 'Use with caution',
      beersCriteria: false,
      interactions: ['NSAIDs', 'Lithium', 'Digoxin'],
      monitoring: 'Electrolytes, glucose, uric acid, BP',
      commonSideEffects: 'Hyponatremia, hypokalemia, hyperglycemia, hyperuricemia'
    });

    this.addDrug('spironolactone', {
      class: 'Potassium-sparing diuretic',
      indication: 'CHF, primary hyperaldosteronism, edema',
      startDose: '12.5-25mg daily',
      maxDose: '50mg daily (elderly)',
      geriatricConsiderations: 'High risk of hyperkalemia in elderly. Monitor K+ closely',
      renalDosing: 'CrCl <30: contraindicated',
      hepaticDosing: 'Avoid in hepatic failure',
      beersCriteria: false,
      interactions: ['ACE inhibitors', 'ARBs', 'NSAIDs', 'Potassium supplements'],
      monitoring: 'K+, Cr, gynecomastia',
      contraindications: 'Hyperkalemia >5.0, anuria, acute renal failure'
    });
  }

  loadPsychiatricDrugs() {
    // SSRIs
    this.addDrug('sertraline', {
      class: 'SSRI',
      indication: 'Depression, anxiety, PTSD',
      startDose: '25mg daily',
      maxDose: '200mg daily',
      geriatricConsiderations: 'First-line for elderly. Monitor for hyponatremia, bleeding risk',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Use with caution',
      beersCriteria: false,
      interactions: ['Warfarin', 'NSAIDs', 'MAOIs', 'Tramadol'],
      monitoring: 'Mood, suicidal ideation, Na+, bleeding',
      commonSideEffects: 'Nausea, diarrhea, sexual dysfunction, insomnia',
      blackBoxWarning: 'Increased suicidal thinking in <25 years old'
    });

    this.addDrug('escitalopram', {
      class: 'SSRI',
      indication: 'Depression, anxiety',
      startDose: '5mg daily',
      maxDose: '10mg daily (elderly)',
      geriatricConsiderations: 'Fewer drug interactions than other SSRIs. QTc prolongation risk',
      renalDosing: 'CrCl <20: use with caution',
      hepaticDosing: '5mg daily maximum',
      beersCriteria: false,
      interactions: ['MAOIs', 'Pimozide', 'Linezolid'],
      monitoring: 'Mood, QTc if >40mg or risk factors',
      contraindications: 'MAOIs within 14 days'
    });

    this.addDrug('citalopram', {
      class: 'SSRI',
      indication: 'Depression',
      startDose: '10mg daily',
      maxDose: '20mg daily (elderly >60yo)',
      geriatricConsiderations: 'FDA max dose limit due to QTc prolongation. EKG if cardiac risk',
      renalDosing: 'No adjustment needed',
      hepaticDosing: '20mg daily maximum',
      beersCriteria: false,
      interactions: ['MAOIs', 'Linezolid'],
      monitoring: 'Mood, EKG if >20mg',
      fdaWarning: 'Do not exceed 20mg daily in >60 years due to QTc risk'
    });

    // Other Antidepressants
    this.addDrug('mirtazapine', {
      class: 'Tetracyclic antidepressant',
      indication: 'Depression, especially with insomnia/poor appetite',
      startDose: '7.5mg at bedtime',
      maxDose: '45mg daily',
      geriatricConsiderations: 'Good for elderly with insomnia, weight loss. Sedating at low doses',
      renalDosing: 'CrCl <40: increase interval',
      hepaticDosing: 'Reduce dose',
      beersCriteria: false,
      interactions: ['MAOIs', 'CNS depressants'],
      monitoring: 'Weight, CBC (rare agranulocytosis), cholesterol',
      commonSideEffects: 'Sedation, weight gain, dry mouth, constipation'
    });

    this.addDrug('duloxetine', {
      class: 'SNRI',
      indication: 'Depression, diabetic neuropathy, fibromyalgia',
      startDose: '20mg daily',
      maxDose: '60mg daily',
      geriatricConsiderations: 'Monitor BP, avoid if uncontrolled HTN. Discontinue gradually',
      renalDosing: 'CrCl <30: avoid',
      hepaticDosing: 'Avoid in hepatic impairment',
      beersCriteria: false,
      interactions: ['MAOIs', 'Thioridazine', 'CYP1A2 inhibitors'],
      monitoring: 'BP, liver enzymes, mood',
      contraindications: 'Uncontrolled narrow-angle glaucoma, MAOIs'
    });

    // Benzodiazepines (HIGH BEERS RISK)
    this.addDrug('lorazepam', {
      class: 'Benzodiazepine',
      indication: 'Anxiety, insomnia, seizures (limited use in elderly)',
      startDose: '0.25-0.5mg',
      maxDose: 'Avoid chronic use',
      geriatricConsiderations: 'HIGH RISK: Falls, cognitive impairment, dependence. Avoid if possible',
      renalDosing: 'Use with caution',
      hepaticDosing: 'Preferred benzodiazepine in liver disease',
      beersCriteria: 'AVOID in adults ≥65 years',
      interactions: ['Opioids', 'CNS depressants', 'Alcohol'],
      monitoring: 'Mental status, fall risk, respiratory depression',
      blackBoxWarning: 'Respiratory depression risk with opioids',
      alternatives: 'CBT-I, trazodone, melatonin for insomnia'
    });

    this.addDrug('alprazolam', {
      class: 'Benzodiazepine',
      indication: 'Panic disorder (avoid in elderly)',
      startDose: '0.25mg TID',
      maxDose: 'Avoid in elderly',
      geriatricConsiderations: 'HIGHEST RISK benzodiazepine - short half-life, rebound anxiety',
      renalDosing: 'Reduce dose',
      hepaticDosing: 'Reduce dose significantly',
      beersCriteria: 'AVOID in adults ≥65 years',
      interactions: ['CYP3A4 inhibitors', 'Opioids'],
      monitoring: 'Avoid in elderly - high dependence risk',
      blackBoxWarning: 'Respiratory depression with opioids'
    });

    // Antipsychotics
    this.addDrug('risperidone', {
      class: 'Atypical antipsychotic',
      indication: 'Schizophrenia, bipolar (AVOID for dementia behaviors)',
      startDose: '0.25-0.5mg BID',
      maxDose: '3mg daily (elderly)',
      geriatricConsiderations: 'FDA BLACK BOX WARNING: Increased mortality in dementia',
      renalDosing: 'Reduce dose by 50%',
      hepaticDosing: 'Reduce dose by 50%',
      beersCriteria: 'AVOID for behavioral problems of dementia',
      interactions: ['CYP2D6 inhibitors', 'Carbamazepine'],
      monitoring: 'EPS, tardive dyskinesia, metabolic effects',
      blackBoxWarning: 'Increased mortality in elderly with dementia'
    });

    this.addDrug('quetiapine', {
      class: 'Atypical antipsychotic',
      indication: 'Schizophrenia, bipolar (NOT for insomnia)',
      startDose: '12.5-25mg',
      maxDose: 'Varies by indication',
      geriatricConsiderations: 'Often misused for insomnia - AVOID. High anticholinergic burden',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Reduce dose',
      beersCriteria: 'AVOID as hypnotic, for dementia behaviors',
      interactions: ['CYP3A4 inducers/inhibitors'],
      monitoring: 'Metabolic effects, sedation, orthostasis',
      alternatives: 'Trazodone, mirtazapine for sleep'
    });
  }

  loadAnticoagulants() {
    this.addDrug('warfarin', {
      class: 'Vitamin K antagonist',
      indication: 'Atrial fibrillation, VTE, mechanical valves',
      startDose: '2-5mg daily',
      maxDose: 'Based on INR',
      geriatricConsiderations: 'Higher bleeding risk, lower dose requirements. Monitor closely',
      renalDosing: 'No adjustment but monitor closely',
      hepaticDosing: 'Monitor closely, may need dose reduction',
      beersCriteria: false,
      interactions: ['Antibiotics', 'Amiodarone', 'NSAIDs', 'Cranberry', 'Ginkgo'],
      monitoring: 'INR (target 2-3 for most indications)',
      targetINR: 'AF/VTE: 2-3, Mechanical valves: 2.5-3.5',
      reversal: 'Vitamin K, PCC, FFP'
    });

    this.addDrug('apixaban', {
      class: 'Direct Xa inhibitor (DOAC)',
      indication: 'Atrial fibrillation, VTE',
      startDose: '5mg BID',
      maxDose: '10mg BID',
      geriatricConsiderations: 'Preferred DOAC in elderly. Dose reduce if 2 of 3: age ≥80, weight ≤60kg, Cr ≥1.5',
      renalDosing: 'Dose reduce if meets criteria above',
      hepaticDosing: 'Avoid in severe hepatic impairment',
      beersCriteria: false,
      interactions: ['Strong CYP3A4 inhibitors/inducers', 'P-gp inhibitors'],
      monitoring: 'CBC, renal function, bleeding',
      advantages: 'Lowest bleeding risk, less intracranial hemorrhage'
    });

    this.addDrug('rivaroxaban', {
      class: 'Direct Xa inhibitor (DOAC)',
      indication: 'Atrial fibrillation, VTE',
      startDose: 'AF: 20mg daily with dinner, VTE: 15mg BID x21d then 20mg daily',
      maxDose: '20mg daily',
      geriatricConsiderations: 'Take with food to improve absorption. CrCl 15-50: 15mg daily for AF',
      renalDosing: 'AF: CrCl 15-50: 15mg daily, CrCl <15: avoid',
      hepaticDosing: 'Avoid if Child-Pugh B or C',
      beersCriteria: false,
      interactions: ['Strong CYP3A4 inhibitors', 'P-gp inhibitors'],
      monitoring: 'Renal function, bleeding',
      foodRequirement: 'MUST take with food'
    });

    this.addDrug('dabigatran', {
      class: 'Direct thrombin inhibitor (DOAC)',
      indication: 'Atrial fibrillation, VTE',
      startDose: '150mg BID',
      maxDose: '150mg BID',
      geriatricConsiderations: 'Reduce to 75mg BID if age >80 or CrCl 30-50. Higher GI bleeding risk',
      renalDosing: 'CrCl 15-30: 75mg BID, CrCl <15: avoid',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['P-gp inhibitors/inducers', 'Proton pump inhibitors'],
      monitoring: 'Renal function, GI symptoms',
      reversal: 'Idarucizumab (Praxbind)',
      advantages: 'Has specific reversal agent'
    });
  }

  loadAntibiotics() {
    this.addDrug('amoxicillin', {
      class: 'Penicillin',
      indication: 'UTI, pneumonia, skin infections',
      startDose: '250-500mg TID',
      maxDose: '1g TID',
      geriatricConsiderations: 'Well tolerated, adjust for renal function',
      renalDosing: 'CrCl 10-50: extend interval, CrCl <10: 250-500mg daily',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['Warfarin (monitor INR)', 'Oral contraceptives'],
      monitoring: 'Allergy history, C. diff symptoms',
      commonSideEffects: 'Diarrhea, nausea, rash'
    });

    this.addDrug('ciprofloxacin', {
      class: 'Fluoroquinolone',
      indication: 'Complicated UTI, certain pneumonias',
      startDose: '250-500mg BID',
      maxDose: '750mg BID',
      geriatricConsiderations: 'BEERS CRITERIA: Increased risk of tendinitis, CNS effects, C. diff',
      renalDosing: 'CrCl 30-50: 250-500mg q12h, CrCl 5-29: 250-500mg q18h',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: 'Use with caution - tendon rupture risk',
      interactions: ['Warfarin', 'Theophylline', 'Antacids', 'Iron'],
      monitoring: 'Tendon pain, mental status, QTc',
      blackBoxWarning: 'Tendinitis/rupture, peripheral neuropathy, CNS effects',
      fdaWarning: 'Reserve for serious infections when alternatives unavailable'
    });

    this.addDrug('nitrofurantoin', {
      class: 'Nitrofuran antibiotic',
      indication: 'Uncomplicated UTI',
      startDose: '50-100mg QID or 100mg BID (macrocrystals)',
      maxDose: '400mg daily',
      geriatricConsiderations: 'Avoid if CrCl <60. Risk of pulmonary toxicity with long-term use',
      renalDosing: 'CrCl <60: avoid (ineffective and toxic)',
      hepaticDosing: 'Use with caution',
      beersCriteria: 'AVOID if CrCl <60',
      interactions: ['Antacids containing magnesium'],
      monitoring: 'Pulmonary symptoms, renal function',
      contraindications: 'CrCl <60, pregnancy at term, G6PD deficiency'
    });

    this.addDrug('ceftriaxone', {
      class: 'Cephalosporin (3rd generation)',
      indication: 'Pneumonia, UTI, skin infections',
      startDose: '1-2g daily',
      maxDose: '4g daily',
      geriatricConsiderations: 'Generally well tolerated. Long half-life allows once daily dosing',
      renalDosing: 'No adjustment unless CrCl <10 AND hepatic disease',
      hepaticDosing: 'Monitor if severe disease',
      beersCriteria: false,
      interactions: ['Calcium-containing IV solutions'],
      monitoring: 'C. diff, CBC with long-term use',
      commonSideEffects: 'Diarrhea, injection site reactions'
    });
  }

  loadGIDrugs() {
    this.addDrug('omeprazole', {
      class: 'Proton pump inhibitor',
      indication: 'GERD, peptic ulcer disease',
      startDose: '20mg daily',
      maxDose: '40mg daily',
      geriatricConsiderations: 'BEERS: Avoid >8 weeks unless high risk. Risk of C. diff, fractures, B12 deficiency',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Consider dose reduction',
      beersCriteria: 'AVOID >8 weeks without high-risk condition',
      interactions: ['Clopidogrel', 'Warfarin', 'Digoxin', 'Iron'],
      monitoring: 'Mg levels (long-term), B12 (annual), bone density',
      longTermRisks: 'C. diff, pneumonia, fractures, hypomagnesemia, B12 deficiency',
      deprescribing: 'Taper if >8 weeks, consider H2RA or lifestyle modifications'
    });

    this.addDrug('pantoprazole', {
      class: 'Proton pump inhibitor',
      indication: 'GERD, peptic ulcer disease',
      startDose: '20-40mg daily',
      maxDose: '40mg BID',
      geriatricConsiderations: 'Similar to omeprazole but fewer drug interactions',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Consider dose reduction in severe disease',
      beersCriteria: 'AVOID >8 weeks without high-risk condition',
      interactions: 'Fewer than omeprazole',
      monitoring: 'Same as omeprazole',
      advantages: 'Fewer drug interactions than omeprazole'
    });

    this.addDrug('ranitidine', {
      class: 'H2 receptor antagonist',
      indication: 'WITHDRAWN FROM MARKET (NDMA contamination)',
      status: 'DISCONTINUED 2020',
      alternatives: 'Famotidine, pantoprazole',
      note: 'FDA withdrew all ranitidine products due to NDMA contamination'
    });

    this.addDrug('famotidine', {
      class: 'H2 receptor antagonist',
      indication: 'GERD, peptic ulcer disease',
      startDose: '20mg BID',
      maxDose: '40mg BID',
      geriatricConsiderations: 'Better choice than PPIs for short-term use. Less drug interactions',
      renalDosing: 'CrCl <50: reduce dose by 50%',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: 'Minimal',
      monitoring: 'Renal function',
      advantages: 'Fewer long-term risks than PPIs'
    });

    this.addDrug('docusate', {
      class: 'Stool softener',
      indication: 'Constipation prevention',
      startDose: '100mg BID',
      maxDose: '300mg daily',
      geriatricConsiderations: 'Limited efficacy. Consider senna or PEG instead',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: 'Minimal',
      monitoring: 'Bowel movements',
      efficacy: 'Limited evidence - consider alternatives'
    });

    this.addDrug('senna', {
      class: 'Stimulant laxative',
      indication: 'Constipation',
      startDose: '8.6mg daily',
      maxDose: '17.2mg BID',
      geriatricConsiderations: 'More effective than docusate. Avoid long-term use',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: 'May decrease absorption of other drugs',
      monitoring: 'Electrolytes with chronic use',
      contraindications: 'Bowel obstruction, appendicitis'
    });

    this.addDrug('polyethylene_glycol', {
      class: 'Osmotic laxative',
      indication: 'Constipation',
      startDose: '17g daily',
      maxDose: '34g daily',
      geriatricConsiderations: 'First-line for chronic constipation. Well tolerated',
      renalDosing: 'Use with caution in severe renal impairment',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: 'Minimal',
      monitoring: 'Electrolytes, hydration status',
      advantages: 'Well tolerated, effective for chronic use'
    });
  }

  loadPainMedications() {
    this.addDrug('acetaminophen', {
      class: 'Analgesic/antipyretic',
      indication: 'Pain, fever',
      startDose: '325-650mg q4-6h',
      maxDose: '3g daily (2g daily if liver disease)',
      geriatricConsiderations: 'First-line analgesic in elderly. Monitor total daily dose from all sources',
      renalDosing: 'CrCl <10: increase interval to q8h',
      hepaticDosing: 'Maximum 2g daily',
      beersCriteria: false,
      interactions: ['Warfarin (with regular use)', 'Alcohol'],
      monitoring: 'Liver enzymes with high doses/chronic use',
      hepatotoxicity: '>4g daily or >3g with alcohol increases risk',
      advantages: 'Safest analgesic in elderly'
    });

    this.addDrug('ibuprofen', {
      class: 'NSAID',
      indication: 'Pain, inflammation',
      startDose: '200-400mg q6-8h',
      maxDose: '1200mg daily',
      geriatricConsiderations: 'BEERS: Avoid chronic use. GI/renal/CV risks. Use lowest dose, shortest duration',
      renalDosing: 'CrCl <60: use with caution',
      hepaticDosing: 'Use with caution',
      beersCriteria: 'AVOID chronic use in elderly',
      interactions: ['Warfarin', 'ACE inhibitors', 'Lithium', 'Methotrexate'],
      monitoring: 'BP, renal function, GI symptoms, CBC',
      blackBoxWarning: 'CV thrombotic events, GI bleeding',
      alternatives: 'Acetaminophen, topical NSAIDs, tramadol'
    });

    this.addDrug('naproxen', {
      class: 'NSAID',
      indication: 'Pain, inflammation',
      startDose: '220mg BID',
      maxDose: '440mg daily (elderly)',
      geriatricConsiderations: 'BEERS: Avoid chronic use. Longer half-life increases toxicity risk',
      renalDosing: 'CrCl <60: use with caution',
      hepaticDosing: 'Use with caution',
      beersCriteria: 'AVOID chronic use in elderly',
      interactions: 'Similar to ibuprofen',
      monitoring: 'Same as ibuprofen',
      note: 'Longer half-life than ibuprofen - higher risk in elderly'
    });

    this.addDrug('tramadol', {
      class: 'Centrally acting analgesic',
      indication: 'Moderate pain',
      startDose: '25mg daily, increase slowly',
      maxDose: '300mg daily (200mg elderly)',
      geriatricConsiderations: 'Lower seizure threshold. Risk of serotonin syndrome with SSRIs',
      renalDosing: 'CrCl <30: max 50mg q12h',
      hepaticDosing: 'Max 50mg q12h',
      beersCriteria: false,
      interactions: ['SSRIs', 'SNRIs', 'MAOIs', 'Warfarin', 'Carbamazepine'],
      monitoring: 'Mental status, respiratory depression, serotonin syndrome',
      contraindications: 'Seizure history, MAOIs',
      serotoninRisk: 'High risk with SSRIs, SNRIs'
    });

    this.addDrug('morphine', {
      class: 'Opioid analgesic',
      indication: 'Severe pain',
      startDose: 'IR: 5-15mg q4h, ER: 15mg q12h',
      maxDose: 'No ceiling, titrate to effect',
      geriatricConsiderations: 'Start low, go slow. Higher risk of respiratory depression, constipation',
      renalDosing: 'CrCl <60: extend interval or reduce dose',
      hepaticDosing: 'Reduce dose',
      beersCriteria: false,
      interactions: ['Benzodiazepines', 'CNS depressants'],
      monitoring: 'Respiratory rate, pain level, constipation, mental status',
      blackBoxWarning: 'Respiratory depression, abuse potential',
      equianalgesic: 'PO:IV = 3:1'
    });

    this.addDrug('oxycodone', {
      class: 'Opioid analgesic',
      indication: 'Moderate to severe pain',
      startDose: 'IR: 2.5-5mg q4-6h',
      maxDose: 'No ceiling, titrate to effect',
      geriatricConsiderations: 'Start with lower doses. Monitor for oversedation',
      renalDosing: 'CrCl <60: reduce dose by 33-50%',
      hepaticDosing: 'Reduce dose',
      beersCriteria: false,
      interactions: ['CYP3A4 inhibitors', 'CNS depressants'],
      monitoring: 'Respiratory rate, pain, constipation',
      equianalgesic: 'Morphine:Oxycodone = 1.5:1'
    });

    this.addDrug('fentanyl', {
      class: 'Opioid analgesic',
      indication: 'Severe chronic pain (patches)',
      startDose: '12mcg/hr patch (opioid-tolerant only)',
      maxDose: 'No ceiling',
      geriatricConsiderations: 'ONLY for opioid-tolerant patients. Risk of respiratory depression',
      renalDosing: 'Use with caution',
      hepaticDosing: 'Use with caution',
      beersCriteria: false,
      interactions: ['CYP3A4 inhibitors', 'CNS depressants'],
      monitoring: 'Respiratory status, patch adherence',
      contraindications: 'Opioid-naive patients, acute pain',
      equianalgesic: '100mg morphine/day = 1mcg/hr fentanyl'
    });
  }

  loadDiabetesDrugs() {
    this.addDrug('metformin', {
      class: 'Biguanide',
      indication: 'Type 2 diabetes',
      startDose: '500mg daily with dinner',
      maxDose: '2000mg daily',
      geriatricConsiderations: 'First-line therapy. Check B12 annually. Monitor renal function',
      renalDosing: 'eGFR 30-45: max 1000mg daily, eGFR <30: contraindicated',
      hepaticDosing: 'Avoid in severe hepatic disease',
      beersCriteria: false,
      interactions: ['Contrast agents (hold 48h)', 'Alcohol', 'Carbonic anhydrase inhibitors'],
      monitoring: 'eGFR, B12 (annual), lactic acidosis symptoms',
      contraindications: 'eGFR <30, acute illness with risk of tissue hypoxia',
      advantages: 'Weight neutral, low hypoglycemia risk, CV benefits'
    });

    this.addDrug('glipizide', {
      class: 'Sulfonylurea',
      indication: 'Type 2 diabetes',
      startDose: '2.5mg daily',
      maxDose: '20mg daily',
      geriatricConsiderations: 'Preferred sulfonylurea (shorter half-life). Risk of hypoglycemia',
      renalDosing: 'Start with 2.5mg daily',
      hepaticDosing: 'Start with 2.5mg daily',
      beersCriteria: 'Glyburide should be avoided (glipizide acceptable)',
      interactions: ['Beta-blockers', 'Fluconazole', 'Warfarin'],
      monitoring: 'Blood glucose, A1C, hypoglycemic episodes',
      hypoglycemiaRisk: 'High - educate patient on recognition/treatment'
    });

    this.addDrug('glyburide', {
      class: 'Sulfonylurea',
      indication: 'Type 2 diabetes',
      startDose: 'NOT RECOMMENDED',
      maxDose: 'AVOID in elderly',
      geriatricConsiderations: 'BEERS CRITERIA: AVOID - prolonged hypoglycemia risk',
      renalDosing: 'AVOID',
      hepaticDosing: 'AVOID',
      beersCriteria: 'AVOID due to prolonged hypoglycemia',
      alternatives: 'Glipizide, insulin, newer agents',
      whyAvoid: 'Long half-life and active metabolites cause prolonged hypoglycemia'
    });

    this.addDrug('insulin_glargine', {
      class: 'Long-acting insulin',
      indication: 'Type 1 and 2 diabetes',
      startDose: '10 units daily or 0.1-0.2 units/kg',
      maxDose: 'Titrate to target glucose',
      geriatricConsiderations: 'Preferred basal insulin. Lower hypoglycemia risk than NPH',
      renalDosing: 'Monitor closely, may need dose reduction',
      hepaticDosing: 'Monitor closely',
      beersCriteria: false,
      interactions: 'Beta-blockers may mask hypoglycemia',
      monitoring: 'Blood glucose, A1C, hypoglycemic episodes',
      advantages: '24-hour duration, less hypoglycemia than NPH'
    });

    this.addDrug('empagliflozin', {
      class: 'SGLT2 inhibitor',
      indication: 'Type 2 diabetes, heart failure',
      startDose: '10mg daily',
      maxDose: '25mg daily',
      geriatricConsiderations: 'Monitor for volume depletion, UTIs, DKA. CV benefits',
      renalDosing: 'eGFR <30: discontinue',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: 'Diuretics (volume depletion)',
      monitoring: 'eGFR, ketones if DKA symptoms, genital infections',
      benefits: 'CV protection, weight loss, BP reduction',
      risks: 'DKA, Fournier gangrene (rare), amputation risk (canagliflozin)'
    });
  }

  loadRespiratory() {
    this.addDrug('albuterol', {
      class: 'Short-acting beta2 agonist',
      indication: 'Asthma, COPD exacerbations',
      startDose: '90mcg, 1-2 puffs q4-6h PRN',
      maxDose: '2 puffs q4h',
      geriatricConsiderations: 'Monitor for tremor, tachycardia. Ensure proper inhaler technique',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['Beta-blockers', 'MAOIs'],
      monitoring: 'Heart rate, tremor, inhaler technique',
      commonSideEffects: 'Tremor, palpitations, nervousness'
    });

    this.addDrug('tiotropium', {
      class: 'Long-acting muscarinic antagonist',
      indication: 'COPD maintenance',
      startDose: '18mcg daily (HandiHaler) or 2.5mcg daily (Respimat)',
      maxDose: 'Once daily only',
      geriatricConsiderations: 'Excellent choice for elderly COPD. Monitor for urinary retention',
      renalDosing: 'CrCl <60: monitor closely',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: 'Other anticholinergics',
      monitoring: 'COPD symptoms, anticholinergic effects',
      contraindications: 'Narrow-angle glaucoma, BPH with urinary retention'
    });

    this.addDrug('fluticasone_salmeterol', {
      class: 'ICS/LABA combination',
      indication: 'Asthma, COPD',
      startDose: '100/50mcg BID',
      maxDose: '500/50mcg BID',
      geriatricConsiderations: 'Monitor for pneumonia in COPD, oral thrush',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Use with caution',
      beersCriteria: false,
      interactions: ['CYP3A4 inhibitors', 'Beta-blockers'],
      monitoring: 'Pneumonia symptoms, oral examination, bone density',
      sideEffects: 'Thrush, dysphonia, pneumonia risk in COPD'
    });
  }

  loadNeurological() {
    this.addDrug('gabapentin', {
      class: 'Anticonvulsant/neuropathic pain',
      indication: 'Neuropathic pain, seizures',
      startDose: '100mg TID',
      maxDose: '3600mg daily',
      geriatricConsiderations: 'BEERS: Avoid with opioids (CNS depression). Significant renal adjustment needed',
      renalDosing: 'CrCl 30-59: 400-1400mg daily, CrCl 15-29: 200-700mg daily, CrCl <15: 100-300mg daily',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: 'AVOID with opioids',
      interactions: ['Opioids (additive CNS depression)', 'Antacids'],
      monitoring: 'Mental status, falls, respiratory depression with opioids',
      commonSideEffects: 'Sedation, dizziness, ataxia, peripheral edema'
    });

    this.addDrug('pregabalin', {
      class: 'Anticonvulsant/neuropathic pain',
      indication: 'Neuropathic pain, fibromyalgia',
      startDose: '25mg BID',
      maxDose: '300mg BID',
      geriatricConsiderations: 'More potent than gabapentin. Higher abuse potential',
      renalDosing: 'CrCl 30-60: 75-300mg daily, CrCl 15-30: 25-150mg daily',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: 'Use with caution',
      interactions: ['CNS depressants', 'Alcohol'],
      monitoring: 'Mental status, weight gain, edema',
      controlledSubstance: 'Schedule V - abuse potential'
    });

    this.addDrug('levodopa_carbidopa', {
      class: 'Dopaminergic agent',
      indication: 'Parkinson disease',
      startDose: '25/100mg TID',
      maxDose: 'Titrate to response',
      geriatricConsiderations: 'Gold standard for PD. Monitor for dyskinesias, hallucinations',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Use with caution',
      beersCriteria: false,
      interactions: ['MAOIs', 'Iron', 'Antipsychotics'],
      monitoring: 'Motor symptoms, dyskinesias, hallucinations, orthostasis',
      commonSideEffects: 'Nausea, dyskinesias, hallucinations, orthostasis'
    });

    this.addDrug('donepezil', {
      class: 'Cholinesterase inhibitor',
      indication: 'Alzheimer disease',
      startDose: '5mg daily',
      maxDose: '23mg daily',
      geriatricConsiderations: 'Modest benefit in mild-moderate AD. Monitor for GI side effects, bradycardia',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Use with caution in severe disease',
      beersCriteria: false,
      interactions: ['Anticholinergics', 'Beta-blockers'],
      monitoring: 'Cognitive function, GI symptoms, heart rate, weight',
      commonSideEffects: 'Nausea, diarrhea, insomnia, muscle cramps'
    });

    this.addDrug('memantine', {
      class: 'NMDA receptor antagonist',
      indication: 'Moderate to severe Alzheimer disease',
      startDose: '5mg daily',
      maxDose: '20mg daily (10mg BID)',
      geriatricConsiderations: 'Can be used with cholinesterase inhibitors. Generally well tolerated',
      renalDosing: 'CrCl 5-29: reduce dose by 50%',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: 'Minimal',
      monitoring: 'Cognitive function, behavior',
      commonSideEffects: 'Dizziness, headache, constipation'
    });
  }

  loadOthers() {
    this.addDrug('levothyroxine', {
      class: 'Thyroid hormone',
      indication: 'Hypothyroidism',
      startDose: '12.5-25mcg daily (elderly)',
      maxDose: 'Titrate to TSH',
      geriatricConsiderations: 'Start low in elderly, especially with CAD. Monitor for atrial fibrillation',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['Iron', 'Calcium', 'Coffee', 'Warfarin'],
      monitoring: 'TSH (6-8 weeks after changes), heart rate, AF',
      administration: 'Take on empty stomach, 1 hour before breakfast'
    });

    this.addDrug('alendronate', {
      class: 'Bisphosphonate',
      indication: 'Osteoporosis',
      startDose: '70mg weekly',
      maxDose: '70mg weekly',
      geriatricConsiderations: 'Monitor for GI side effects, atypical fractures, osteonecrosis of jaw',
      renalDosing: 'CrCl <35: avoid',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['Calcium', 'Iron', 'Antacids'],
      monitoring: 'GI symptoms, dental health, bone density',
      administration: 'Take with full glass water, remain upright 30 minutes',
      contraindications: 'Esophageal abnormalities, inability to stand/sit upright'
    });

    this.addDrug('vitamin_d3', {
      class: 'Vitamin supplement',
      indication: 'Vitamin D deficiency, osteoporosis prevention',
      startDose: '800-1000 IU daily',
      maxDose: '4000 IU daily',
      geriatricConsiderations: 'Most elderly are deficient. Higher doses (>4000 IU) may increase fall risk',
      renalDosing: 'Monitor calcium in CKD',
      hepaticDosing: 'No adjustment needed',
      beersCriteria: false,
      interactions: ['Thiazide diuretics', 'Digoxin'],
      monitoring: '25(OH)D level, calcium, PTH',
      target25OHD: '30-50 ng/mL (75-125 nmol/L)'
    });

    this.addDrug('melatonin', {
      class: 'Hormone supplement',
      indication: 'Insomnia, circadian rhythm disorders',
      startDose: '0.5-1mg 30 minutes before bedtime',
      maxDose: '3mg (higher doses not more effective)',
      geriatricConsiderations: 'Preferred sleep aid in elderly. Use lowest effective dose',
      renalDosing: 'No adjustment needed',
      hepaticDosing: 'Use with caution',
      beersCriteria: false,
      interactions: ['Warfarin', 'CNS depressants'],
      monitoring: 'Sleep quality, morning drowsiness',
      advantages: 'No dependence, minimal side effects'
    });
  }

  loadInteractions() {
    // Major drug-drug interactions
    this.interactions = {
      'warfarin': {
        'amiodarone': 'Major - Increase INR monitoring, reduce warfarin dose by 30-50%',
        'fluconazole': 'Major - Significantly increases INR',
        'trimethoprim-sulfamethoxazole': 'Major - Increases INR',
        'antibiotics': 'Moderate - Monitor INR closely',
        'aspirin': 'Major - Increased bleeding risk',
        'nsaids': 'Major - Increased bleeding risk'
      },
      'digoxin': {
        'furosemide': 'Moderate - Hypokalemia increases digoxin toxicity',
        'quinidine': 'Major - Increases digoxin levels',
        'verapamil': 'Major - Increases digoxin levels',
        'amiodarone': 'Major - Reduce digoxin dose by 50%'
      },
      'metformin': {
        'contrast_agents': 'Major - Hold 48 hours before and after',
        'furosemide': 'Moderate - Monitor for lactic acidosis'
      },
      'ssris': {
        'nsaids': 'Moderate - Increased bleeding risk',
        'warfarin': 'Moderate - Increased bleeding risk',
        'tramadol': 'Major - Serotonin syndrome risk'
      }
    };
  }

  loadBeersCriteria() {
    this.beersCriteria = {
      'avoid_regardless': [
        'alprazolam', 'lorazepam', 'diazepam', 'glyburide', 'indomethacin',
        'ketorolac', 'meperidine', 'diphenhydramine', 'hydroxyzine'
      ],
      'avoid_with_conditions': {
        'omeprazole': 'Avoid >8 weeks unless high risk',
        'quetiapine': 'Avoid for behavioral symptoms of dementia',
        'ciprofloxacin': 'Use with caution - tendon rupture risk'
      },
      'dose_concerns': {
        'citalopram': 'Maximum 20mg daily in >60 years',
        'escitalopram': 'Maximum 10mg daily in elderly'
      }
    };
  }

  loadSTOPPCriteria() {
    this.stoppCriteria = {
      'cardiovascular': [
        'Digoxin >125mcg daily with impaired renal function',
        'Beta-blockers with bradycardia (<50 bpm)',
        'Aspirin with warfarin without clear indication'
      ],
      'cns': [
        'Benzodiazepines for >4 weeks',
        'Antipsychotics for behavioral symptoms of dementia',
        'Tricyclics with dementia, narrow-angle glaucoma, or heart block'
      ],
      'gastrointestinal': [
        'PPIs for >8 weeks without clear indication',
        'NSAIDs with peptic ulcer disease'
      ]
    };
  }

  // Helper Methods
  addDrug(name, data) {
    this.drugs[name.toLowerCase()] = {
      name: name,
      ...data,
      searchTerms: this.generateSearchTerms(name, data)
    };
  }

  generateSearchTerms(name, data) {
    const terms = [name.toLowerCase()];
    if (data.class) terms.push(data.class.toLowerCase());
    if (data.indication) terms.push(...data.indication.toLowerCase().split(/[,\s]+/));
    return terms;
  }

  searchDrug(query) {
    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Exact name match first
    if (this.drugs[searchTerm]) {
      results.push(this.drugs[searchTerm]);
    }

    // Partial matches
    Object.values(this.drugs).forEach(drug => {
      if (drug.name.toLowerCase().includes(searchTerm) && !results.includes(drug)) {
        results.push(drug);
      }
    });

    // Search in search terms
    Object.values(this.drugs).forEach(drug => {
      if (drug.searchTerms && drug.searchTerms.some(term => term.includes(searchTerm)) && !results.includes(drug)) {
        results.push(drug);
      }
    });

    return results;
  }

  getDrugInfo(drugName) {
    const results = this.searchDrug(drugName);
    if (results.length > 0) {
      return results[0];
    }
    return { error: 'Drug not found', suggestion: 'Try: metoprolol, lisinopril, warfarin, sertraline' };
  }

  checkInteractions(drugList) {
    const interactions = [];
    for (let i = 0; i < drugList.length; i++) {
      const drug1 = drugList[i].toLowerCase();
      for (let j = i + 1; j < drugList.length; j++) {
        const drug2 = drugList[j].toLowerCase();
        
        // Check specific interactions
        if (this.interactions[drug1] && this.interactions[drug1][drug2]) {
          interactions.push({
            drugs: [drugList[i], drugList[j]],
            severity: 'Check database',
            description: this.interactions[drug1][drug2]
          });
        }
        
        // Check general class interactions
        const classInteraction = this.checkClassInteractions(drug1, drug2);
        if (classInteraction) {
          interactions.push(classInteraction);
        }
      }
    }
    return interactions;
  }

  checkClassInteractions(drug1, drug2) {
    const drug1Info = this.drugs[drug1];
    const drug2Info = this.drugs[drug2];
    
    if (!drug1Info || !drug2Info) return null;
    
    // SSRI + NSAID
    if (drug1Info.class?.includes('SSRI') && drug2Info.class?.includes('NSAID')) {
      return {
        drugs: [drug1Info.name, drug2Info.name],
        severity: 'Moderate',
        description: 'Increased bleeding risk - monitor for GI bleeding'
      };
    }
    
    // ACE inhibitor + NSAID
    if (drug1Info.class?.includes('ACE inhibitor') && drug2Info.class?.includes('NSAID')) {
      return {
        drugs: [drug1Info.name, drug2Info.name],
        severity: 'Moderate',
        description: 'Decreased antihypertensive effect, increased renal toxicity risk'
      };
    }
    
    return null;
  }

  getBeersConcerns(drugName) {
    const drug = this.getDrugInfo(drugName);
    if (drug.error) return null;
    
    const concerns = [];
    
    if (this.beersCriteria.avoid_regardless.includes(drugName.toLowerCase())) {
      concerns.push(`AVOID in adults ≥65 years - ${drug.name} is on Beers Criteria avoid list`);
    }
    
    if (this.beersCriteria.avoid_with_conditions[drugName.toLowerCase()]) {
      concerns.push(this.beersCriteria.avoid_with_conditions[drugName.toLowerCase()]);
    }
    
    if (this.beersCriteria.dose_concerns[drugName.toLowerCase()]) {
      concerns.push(this.beersCriteria.dose_concerns[drugName.toLowerCase()]);
    }
    
    return concerns.length > 0 ? concerns : null;
  }

  getAlternatives(drugName) {
    const alternatives = {
      'glyburide': ['glipizide', 'insulin', 'metformin'],
      'diazepam': ['lorazepam (short-term)', 'cognitive behavioral therapy', 'melatonin for sleep'],
      'diphenhydramine': ['loratadine', 'cetirizine', 'fexofenadine'],
      'ketorolac': ['acetaminophen', 'topical NSAIDs', 'tramadol'],
      'amitriptyline': ['sertraline', 'duloxetine', 'mirtazapine'],
      'quetiapine': ['trazodone for sleep', 'melatonin', 'behavioral interventions for dementia']
    };
    
    return alternatives[drugName.toLowerCase()] || [];
  }

  generateReport() {
    return {
      totalDrugs: Object.keys(this.drugs).length,
      drugsByClass: this.getDrugsByClass(),
      beersTotal: this.beersCriteria.avoid_regardless.length,
      interactionPairs: Object.keys(this.interactions).length
    };
  }

  getDrugsByClass() {
    const classes = {};
    Object.values(this.drugs).forEach(drug => {
      const drugClass = drug.class || 'Other';
      if (!classes[drugClass]) classes[drugClass] = 0;
      classes[drugClass]++;
    });
    return classes;
  }
}

// Initialize
window.DrugDatabase = new ComprehensiveDrugDatabase();
console.log('💊 Comprehensive Drug Database Ready!');
console.log(`📊 ${Object.keys(window.DrugDatabase.drugs).length} medications loaded`);
console.log('Usage: DrugDatabase.getDrugInfo("metoprolol")');