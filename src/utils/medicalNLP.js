// Medical Natural Language Processing Engine
// Handles abbreviation expansion, typo-tolerant drug search, and clinical note analysis

// Medical abbreviation dictionary
export const medicalAbbreviations = {
  'dm2': 'Diabetes Mellitus Type 2',
  'dm': 'Diabetes Mellitus',
  'htn': 'Hypertension',
  'chf': 'Congestive Heart Failure',
  'ckd': 'Chronic Kidney Disease',
  'esrd': 'End-Stage Renal Disease',
  'afib': 'Atrial Fibrillation',
  'af': 'Atrial Fibrillation',
  'pe': 'Pulmonary Embolism',
  'dvt': 'Deep Vein Thrombosis',
  'vte': 'Venous Thromboembolism',
  'mi': 'Myocardial Infarction',
  'nstemi': 'Non-ST Elevation Myocardial Infarction',
  'stemi': 'ST Elevation Myocardial Infarction',
  'cad': 'Coronary Artery Disease',
  'pad': 'Peripheral Artery Disease',
  'copd': 'Chronic Obstructive Pulmonary Disease',
  'osa': 'Obstructive Sleep Apnea',
  'gerd': 'Gastroesophageal Reflux Disease',
  'ibs': 'Irritable Bowel Syndrome',
  'ibd': 'Inflammatory Bowel Disease',
  'uti': 'Urinary Tract Infection',
  'aki': 'Acute Kidney Injury',
  'bph': 'Benign Prostatic Hyperplasia',
  'cva': 'Cerebrovascular Accident',
  'tia': 'Transient Ischemic Attack',
  'hx': 'history',
  'rx': 'prescription',
  'tx': 'treatment',
  'dx': 'diagnosis',
  'sx': 'symptoms',
  'fx': 'fracture',
  'bx': 'biopsy',
  'prn': 'as needed',
  'bid': 'twice daily',
  'tid': 'three times daily',
  'qid': 'four times daily',
  'qhs': 'at bedtime',
  'po': 'by mouth',
  'iv': 'intravenous',
  'im': 'intramuscular',
  'sq': 'subcutaneous',
  'inr': 'International Normalized Ratio',
  'egfr': 'estimated Glomerular Filtration Rate',
  'bun': 'Blood Urea Nitrogen',
  'cr': 'Creatinine',
  'hgb': 'Hemoglobin',
  'hct': 'Hematocrit',
  'plt': 'Platelets',
  'wbc': 'White Blood Cells',
  'na': 'Sodium',
  'k': 'Potassium',
  'cl': 'Chloride',
  'co2': 'Carbon Dioxide',
  'alt': 'Alanine Aminotransferase',
  'ast': 'Aspartate Aminotransferase',
  'alp': 'Alkaline Phosphatase',
  'tsh': 'Thyroid Stimulating Hormone',
  'a1c': 'Hemoglobin A1c',
  'ldl': 'Low-Density Lipoprotein',
  'hdl': 'High-Density Lipoprotein',
  'tg': 'Triglycerides',
  'ef': 'Ejection Fraction',
  'nyha': 'New York Heart Association',
  'mmse': 'Mini-Mental State Examination',
  'moca': 'Montreal Cognitive Assessment',
  'gds': 'Geriatric Depression Scale',
  'adl': 'Activities of Daily Living',
  'iadl': 'Instrumental Activities of Daily Living',
  'snf': 'Skilled Nursing Facility',
  'ltc': 'Long-Term Care',
  'alf': 'Assisted Living Facility'
};

// Israeli/Common drug database
export const drugDatabase = [
  // Cardiovascular
  'aspirin', 'clopidogrel', 'prasugrel', 'ticagrelor', 'warfarin', 'apixaban', 'rivaroxaban', 
  'dabigatran', 'edoxaban', 'enoxaparin', 'heparin', 'fondaparinux',
  
  // Diabetes
  'metformin', 'glibenclamide', 'gliclazide', 'glimepiride', 'sitagliptin', 'vildagliptin',
  'linagliptin', 'empagliflozin', 'dapagliflozin', 'liraglutide', 'dulaglutide', 'semaglutide',
  'insulin glargine', 'insulin aspart', 'insulin lispro', 'insulin detemir',
  
  // Hypertension
  'lisinopril', 'enalapril', 'ramipril', 'perindopril', 'captopril', 'valsartan', 'losartan',
  'candesartan', 'irbesartan', 'telmisartan', 'amlodipine', 'nifedipine', 'diltiazem', 'verapamil',
  'metoprolol', 'bisoprolol', 'carvedilol', 'atenolol', 'propranolol', 'nebivolol',
  'furosemide', 'hydrochlorothiazide', 'chlorthalidone', 'indapamide', 'spironolactone', 'eplerenone',
  
  // Lipids
  'atorvastatin', 'simvastatin', 'rosuvastatin', 'pravastatin', 'fluvastatin', 'pitavastatin',
  'ezetimibe', 'fenofibrate', 'gemfibrozil', 'evolocumab', 'alirocumab',
  
  // Cardiac
  'amiodarone', 'digoxin', 'sotalol', 'flecainide', 'propafenone', 'ivabradine', 'ranolazine',
  'isosorbide mononitrate', 'isosorbide dinitrate', 'nitroglycerin',
  
  // Psychiatric
  'sertraline', 'citalopram', 'escitalopram', 'fluoxetine', 'paroxetine', 'fluvoxamine',
  'venlafaxine', 'duloxetine', 'mirtazapine', 'bupropion', 'trazodone', 'vortioxetine',
  'quetiapine', 'olanzapine', 'risperidone', 'aripiprazole', 'haloperidol', 'clozapine',
  'lorazepam', 'diazepam', 'clonazepam', 'alprazolam', 'oxazepam', 'temazepam',
  'zolpidem', 'eszopiclone', 'zaleplon', 'melatonin', 'ramelteon',
  
  // Neurological
  'donepezil', 'rivastigmine', 'galantamine', 'memantine', 'levodopa', 'carbidopa',
  'pramipexole', 'ropinirole', 'rasagiline', 'selegiline', 'entacapone', 'amantadine',
  'gabapentin', 'pregabalin', 'carbamazepine', 'valproate', 'levetiracetam', 'lamotrigine',
  
  // Urological
  'oxybutynin', 'tolterodine', 'solifenacin', 'darifenacin', 'mirabegron', 'tamsulosin',
  'alfuzosin', 'doxazosin', 'terazosin', 'finasteride', 'dutasteride', 'sildenafil', 'tadalafil',
  
  // Pain/Inflammation
  'paracetamol', 'acetaminophen', 'ibuprofen', 'naproxen', 'diclofenac', 'celecoxib',
  'indomethacin', 'ketorolac', 'tramadol', 'codeine', 'morphine', 'oxycodone', 'fentanyl',
  'hydrocodone', 'buprenorphine', 'tapentadol',
  
  // GI
  'omeprazole', 'pantoprazole', 'lansoprazole', 'esomeprazole', 'rabeprazole', 'ranitidine',
  'famotidine', 'sucralfate', 'misoprostol', 'metoclopramide', 'domperidone', 'ondansetron',
  
  // Bone/Mineral
  'alendronate', 'risedronate', 'ibandronate', 'zoledronic acid', 'denosumab', 'teriparatide',
  'raloxifene', 'calcitonin', 'calcium', 'vitamin d', 'cholecalciferol', 'ergocalciferol',
  
  // Antibiotics
  'amoxicillin', 'augmentin', 'azithromycin', 'clarithromycin', 'ciprofloxacin', 'levofloxacin',
  'moxifloxacin', 'doxycycline', 'minocycline', 'cephalexin', 'cefuroxime', 'ceftriaxone',
  'nitrofurantoin', 'trimethoprim', 'sulfamethoxazole', 'metronidazole', 'vancomycin',
  
  // Other
  'levothyroxine', 'methimazole', 'propylthiouracil', 'prednisone', 'prednisolone',
  'methylprednisolone', 'dexamethasone', 'hydrocortisone', 'colchicine', 'allopurinol',
  'febuxostat', 'probenecid', 'cyclobenzaprine', 'methocarbamol', 'baclofen', 'tizanidine'
];

// Jaro-Winkler string similarity algorithm for typo tolerance
export function jaroWinklerSimilarity(s1, s2) {
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1;
  
  const len1 = s1.length;
  const len2 = s2.length;
  const matchWindow = Math.floor(Math.max(len1, len2) / 2) - 1;
  const s1Matches = new Array(len1).fill(false);
  const s2Matches = new Array(len2).fill(false);
  
  let matches = 0;
  let transpositions = 0;
  
  // Find matches
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, len2);
    
    for (let j = start; j < end; j++) {
      if (s2Matches[j] || s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }
  
  if (matches === 0) return 0;
  
  // Count transpositions
  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }
  
  // Calculate Jaro similarity
  const jaro = (matches / len1 + matches / len2 + (matches - transpositions / 2) / matches) / 3;
  
  // Calculate Jaro-Winkler similarity
  const prefixLen = Math.min(4, ...[...Array(Math.min(len1, len2))].map((_, i) => s1[i] === s2[i] ? i + 1 : 0));
  const jaroWinkler = jaro + prefixLen * 0.1 * (1 - jaro);
  
  return jaroWinkler;
}

// Expand medical abbreviations in text
export function expandAbbreviations(text) {
  let expanded = text;
  const regex = new RegExp(`\\b(${Object.keys(medicalAbbreviations).join('|')})\\b`, 'gi');
  
  expanded = expanded.replace(regex, (match) => {
    const lower = match.toLowerCase();
    const expansion = medicalAbbreviations[lower];
    // Preserve original case style
    if (match === match.toUpperCase()) {
      return `${match} (${expansion})`;
    }
    return `${match} (${expansion})`;
  });
  
  return expanded;
}

// Find similar drugs with typo tolerance
export function findSimilarDrugs(query, threshold = 0.75, maxResults = 5) {
  if (!query || query.length < 2) return [];
  
  const queryLower = query.toLowerCase();
  const results = drugDatabase
    .map(drug => ({
      drug,
      score: jaroWinklerSimilarity(queryLower, drug)
    }))
    .filter(item => item.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
  
  return results;
}

// Extract medications from clinical text
export function extractMedications(text, threshold = 0.85) {
  const words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
  const medications = new Set();
  
  words.forEach(word => {
    if (word.length < 3) return;
    
    const matches = findSimilarDrugs(word, threshold, 1);
    if (matches.length > 0) {
      medications.add(matches[0].drug);
    }
  });
  
  return Array.from(medications);
}

// Analyze clinical note for abbreviations and medications
export function analyzeClinicalNote(text) {
  const expandedText = expandAbbreviations(text);
  const medications = extractMedications(text);
  
  return {
    originalText: text,
    expandedText,
    medications,
    abbreviationsFound: Object.keys(medicalAbbreviations).filter(abbr => 
      new RegExp(`\\b${abbr}\\b`, 'i').test(text)
    )
  };
}

// Check for drug interactions (basic database)
export const drugInteractionDatabase = {
  'warfarin-aspirin': {
    severity: 'Major',
    description: 'Increased bleeding risk with combination anticoagulation',
    recommendation: 'Monitor INR closely, consider PPI for GI protection'
  },
  'warfarin-amiodarone': {
    severity: 'Major',
    description: 'Amiodarone inhibits warfarin metabolism',
    recommendation: 'Reduce warfarin dose by 30-50%, monitor INR'
  },
  'apixaban-amiodarone': {
    severity: 'Moderate',
    description: 'Increased apixaban concentration',
    recommendation: 'Consider dose reduction, monitor for bleeding'
  },
  'lisinopril-spironolactone': {
    severity: 'Moderate',
    description: 'Risk of hyperkalemia',
    recommendation: 'Monitor potassium levels, especially in CKD'
  },
  'digoxin-amiodarone': {
    severity: 'Major',
    description: 'Increased digoxin levels',
    recommendation: 'Reduce digoxin dose by 50%'
  },
  'ssri-nsaid': {
    severity: 'Moderate',
    description: 'Increased GI bleeding risk',
    recommendation: 'Consider PPI, monitor for bleeding'
  },
  'metformin-contrast': {
    severity: 'Major',
    description: 'Risk of lactic acidosis with contrast',
    recommendation: 'Hold metformin 48h before and after contrast'
  }
};

export function checkDrugInteractions(medications) {
  const interactions = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const drug1 = medications[i].toLowerCase();
      const drug2 = medications[j].toLowerCase();
      
      // Check direct interactions
      Object.keys(drugInteractionDatabase).forEach(key => {
        const [d1, d2] = key.split('-');
        if ((drug1.includes(d1) && drug2.includes(d2)) || 
            (drug1.includes(d2) && drug2.includes(d1))) {
          interactions.push({
            drugs: [medications[i], medications[j]],
            ...drugInteractionDatabase[key]
          });
        }
      });
      
      // Check class interactions
      // ACE/ARB combination
      if ((drug1.includes('pril') && drug2.includes('sartan')) ||
          (drug1.includes('sartan') && drug2.includes('pril'))) {
        interactions.push({
          drugs: [medications[i], medications[j]],
          severity: 'Major',
          description: 'Dual RAAS blockade',
          recommendation: 'Avoid combination, use single agent'
        });
      }
      
      // Multiple NSAIDs
      const nsaids = ['ibuprofen', 'naproxen', 'diclofenac', 'celecoxib', 'indomethacin'];
      if (nsaids.some(n => drug1.includes(n)) && nsaids.some(n => drug2.includes(n))) {
        interactions.push({
          drugs: [medications[i], medications[j]],
          severity: 'Major',
          description: 'Multiple NSAIDs increase GI and renal toxicity',
          recommendation: 'Use single NSAID at lowest effective dose'
        });
      }
    }
  }
  
  return interactions;
}

export default {
  medicalAbbreviations,
  drugDatabase,
  expandAbbreviations,
  findSimilarDrugs,
  extractMedications,
  analyzeClinicalNote,
  checkDrugInteractions,
  jaroWinklerSimilarity
};