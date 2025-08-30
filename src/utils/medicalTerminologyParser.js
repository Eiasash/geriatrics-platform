// Medical Terminology Parser
// Handles medical abbreviations, acronyms, and standardizes clinical input

export class MedicalTerminologyParser {
  constructor() {
    this.medicalAbbreviations = this.initializeAbbreviations();
    this.medicationAbbreviations = this.initializeMedicationAbbreviations();
    this.dosagePatterns = this.initializeDosagePatterns();
  }

  initializeAbbreviations() {
    return {
      // Cardiovascular
      'htn': 'hypertension',
      'chf': 'congestive heart failure',
      'cad': 'coronary artery disease',
      'mi': 'myocardial infarction',
      'afib': 'atrial fibrillation',
      'af': 'atrial fibrillation',
      'dvt': 'deep vein thrombosis',
      'pe': 'pulmonary embolism',
      'pvd': 'peripheral vascular disease',
      'aortic stenosis': 'aortic stenosis',
      'as': 'aortic stenosis',
      'mr': 'mitral regurgitation',
      'ms': 'mitral stenosis',
      'tr': 'tricuspid regurgitation',
      'hfref': 'heart failure with reduced ejection fraction',
      'hfpef': 'heart failure with preserved ejection fraction',

      // Endocrine/Metabolic
      'dm': 'diabetes mellitus',
      'dm2': 'diabetes mellitus type 2',
      't2dm': 'diabetes mellitus type 2',
      'dm1': 'diabetes mellitus type 1',
      't1dm': 'diabetes mellitus type 1',
      'dka': 'diabetic ketoacidosis',
      'hhs': 'hyperosmolar hyperglycemic state',
      'hypothyroid': 'hypothyroidism',
      'hyperthyroid': 'hyperthyroidism',
      'graves': 'graves disease',
      'hashimotos': 'hashimoto thyroiditis',

      // Renal/Urological
      'ckd': 'chronic kidney disease',
      'esrd': 'end-stage renal disease',
      'arf': 'acute renal failure',
      'aki': 'acute kidney injury',
      'uti': 'urinary tract infection',
      'bph': 'benign prostatic hyperplasia',
      'kidney stones': 'nephrolithiasis',
      'proteinuria': 'proteinuria',

      // Respiratory
      'copd': 'chronic obstructive pulmonary disease',
      'asthma': 'asthma',
      'pneumonia': 'pneumonia',
      'cap': 'community acquired pneumonia',
      'hap': 'hospital acquired pneumonia',
      'osa': 'obstructive sleep apnea',
      'ipf': 'idiopathic pulmonary fibrosis',
      'pe': 'pulmonary embolism',

      // Gastrointestinal  
      'gerd': 'gastroesophageal reflux disease',
      'pud': 'peptic ulcer disease',
      'ibd': 'inflammatory bowel disease',
      'uc': 'ulcerative colitis',
      'crohns': 'crohn disease',
      'cirrhosis': 'cirrhosis',
      'hepatitis': 'hepatitis',
      'pancreatitis': 'pancreatitis',

      // Neurological
      'stroke': 'cerebrovascular accident',
      'cva': 'cerebrovascular accident',
      'tia': 'transient ischemic attack',
      'dementia': 'dementia',
      'alzheimers': 'alzheimer disease',
      'ad': 'alzheimer disease',
      'parkinsons': 'parkinson disease',
      'pd': 'parkinson disease',
      'ms': 'multiple sclerosis',
      'seizure': 'seizure disorder',
      'epilepsy': 'epilepsy',

      // Psychiatric/Behavioral
      'depression': 'depression',
      'mdd': 'major depressive disorder',
      'anxiety': 'anxiety disorder',
      'gad': 'generalized anxiety disorder',
      'ptsd': 'post-traumatic stress disorder',
      'ocd': 'obsessive compulsive disorder',
      'bipolar': 'bipolar disorder',
      'schizophrenia': 'schizophrenia',

      // Musculoskeletal
      'osteoporosis': 'osteoporosis',
      'osteoarthritis': 'osteoarthritis',
      'oa': 'osteoarthritis',
      'ra': 'rheumatoid arthritis',
      'gout': 'gout',
      'fibromyalgia': 'fibromyalgia',
      'lupus': 'systemic lupus erythematosus',
      'sle': 'systemic lupus erythematosus',

      // Hematological/Oncological
      'anemia': 'anemia',
      'ckd anemia': 'chronic kidney disease related anemia',
      'iron deficiency': 'iron deficiency anemia',
      'b12 deficiency': 'vitamin b12 deficiency',
      'folate deficiency': 'folate deficiency',
      'cancer': 'cancer',
      'lymphoma': 'lymphoma',
      'leukemia': 'leukemia',

      // Geriatric Syndromes
      'frailty': 'frailty syndrome',
      'sarcopenia': 'sarcopenia',
      'falls': 'fall risk',
      'delirium': 'delirium',
      'polypharmacy': 'polypharmacy',
      'incontinence': 'urinary incontinence',
      'pressure ulcer': 'pressure ulcer',
      'failure to thrive': 'failure to thrive',

      // Other Common Conditions
      'obesity': 'obesity',
      'malnutrition': 'malnutrition',
      'insomnia': 'insomnia',
      'hearing loss': 'hearing loss',
      'vision impairment': 'vision impairment',
      'cataracts': 'cataracts',
      'glaucoma': 'glaucoma',
      'macular degeneration': 'macular degeneration'
    };
  }

  initializeMedicationAbbreviations() {
    return {
      // ACE Inhibitors
      'lisinopril': 'lisinopril',
      'enalapril': 'enalapril',
      'captopril': 'captopril',
      'ace inhibitor': 'ACE inhibitor',
      'acei': 'ACE inhibitor',

      // ARBs
      'losartan': 'losartan',
      'valsartan': 'valsartan',
      'telmisartan': 'telmisartan',
      'arb': 'ARB (angiotensin receptor blocker)',

      // Beta Blockers
      'metoprolol': 'metoprolol',
      'atenolol': 'atenolol',
      'carvedilol': 'carvedilol',
      'propranolol': 'propranolol',
      'beta blocker': 'beta blocker',
      'bb': 'beta blocker',

      // Calcium Channel Blockers
      'amlodipine': 'amlodipine',
      'nifedipine': 'nifedipine',
      'diltiazem': 'diltiazem',
      'verapamil': 'verapamil',
      'ccb': 'calcium channel blocker',

      // Diuretics
      'furosemide': 'furosemide',
      'lasix': 'furosemide',
      'hctz': 'hydrochlorothiazide',
      'hydrochlorothiazide': 'hydrochlorothiazide',
      'spironolactone': 'spironolactone',
      'diuretic': 'diuretic',

      // Diabetes Medications
      'metformin': 'metformin',
      'insulin': 'insulin',
      'glipizide': 'glipizide',
      'glyburide': 'glyburide',
      'pioglitazone': 'pioglitazone',
      'sitagliptin': 'sitagliptin',

      // Statins
      'atorvastatin': 'atorvastatin',
      'simvastatin': 'simvastatin',
      'rosuvastatin': 'rosuvastatin',
      'pravastatin': 'pravastatin',
      'statin': 'statin',

      // Anticoagulants
      'warfarin': 'warfarin',
      'coumadin': 'warfarin',
      'apixaban': 'apixaban',
      'rivaroxaban': 'rivaroxaban',
      'dabigatran': 'dabigatran',
      'doac': 'direct oral anticoagulant',
      'noac': 'novel oral anticoagulant',

      // Antiplatelets
      'aspirin': 'aspirin',
      'asa': 'aspirin',
      'clopidogrel': 'clopidogrel',
      'plavix': 'clopidogrel',

      // PPIs
      'omeprazole': 'omeprazole',
      'pantoprazole': 'pantoprazole',
      'esomeprazole': 'esomeprazole',
      'ppi': 'proton pump inhibitor',

      // Common Geriatric Medications
      'donepezil': 'donepezil',
      'memantine': 'memantine',
      'levothyroxine': 'levothyroxine',
      'synthroid': 'levothyroxine',
      'prednisone': 'prednisone',
      'steroid': 'corticosteroid'
    };
  }

  initializeDosagePatterns() {
    return {
      frequency: {
        'qd': 'once daily',
        'bid': 'twice daily', 
        'tid': 'three times daily',
        'qid': 'four times daily',
        'q4h': 'every 4 hours',
        'q6h': 'every 6 hours',
        'q8h': 'every 8 hours',
        'q12h': 'every 12 hours',
        'prn': 'as needed',
        'ac': 'before meals',
        'pc': 'after meals',
        'hs': 'at bedtime',
        'am': 'morning',
        'pm': 'evening'
      }
    };
  }

  parseConditions(input) {
    if (!input || typeof input !== 'string') return [];

    const conditions = input.toLowerCase()
      .split(/[,;]/)
      .map(condition => condition.trim())
      .filter(condition => condition.length > 0);

    return conditions.map(condition => {
      // Handle numbered conditions (e.g., "ckd stage 3", "dm2")
      const numberedMatch = condition.match(/^(\w+)\s*(stage\s*)?(\d+)$/);
      if (numberedMatch) {
        const baseCondition = numberedMatch[1];
        const stage = numberedMatch[3];
        const expanded = this.medicalAbbreviations[baseCondition] || baseCondition;
        return stage ? `${expanded} stage ${stage}` : expanded;
      }

      // Direct abbreviation lookup
      if (this.medicalAbbreviations[condition]) {
        return this.medicalAbbreviations[condition];
      }

      // Partial matching for common variations
      for (const [abbr, full] of Object.entries(this.medicalAbbreviations)) {
        if (condition.includes(abbr) || abbr.includes(condition)) {
          return full;
        }
      }

      // Return original if no match found
      return condition;
    });
  }

  parseMedications(input) {
    if (!input || typeof input !== 'string') return [];

    const medications = input.toLowerCase()
      .split(/[,;]/)
      .map(med => med.trim())
      .filter(med => med.length > 0);

    return medications.map(medication => {
      // Handle medication with dosage (e.g., "metformin 500mg bid")
      const dosageMatch = medication.match(/^([a-zA-Z\s]+)\s+(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?\s+([a-zA-Z]+)?$/);
      if (dosageMatch) {
        const medName = dosageMatch[1].trim();
        const dose = dosageMatch[2];
        const unit = dosageMatch[3] || 'mg';
        const frequency = dosageMatch[4] || '';

        const expandedMed = this.medicationAbbreviations[medName] || medName;
        const expandedFreq = frequency ? (this.dosagePatterns.frequency[frequency] || frequency) : '';

        return `${expandedMed} ${dose}${unit}${expandedFreq ? ' ' + expandedFreq : ''}`;
      }

      // Simple medication lookup
      if (this.medicationAbbreviations[medication]) {
        return this.medicationAbbreviations[medication];
      }

      // Partial matching
      for (const [abbr, full] of Object.entries(this.medicationAbbreviations)) {
        if (medication.includes(abbr) || abbr.includes(medication)) {
          return full;
        }
      }

      return medication;
    });
  }

  // Advanced parsing for complex medical input
  parseComplexMedicalInput(input) {
    const result = {
      conditions: [],
      medications: [],
      procedures: [],
      symptoms: [],
      originalText: input
    };

    if (!input || typeof input !== 'string') return result;

    // Split into sentences or major sections
    const sections = input.split(/[.!?]/).filter(s => s.trim());

    sections.forEach(section => {
      const cleaned = section.toLowerCase().trim();

      // Look for condition indicators
      if (cleaned.includes('history of') || cleaned.includes('h/o') || cleaned.includes('dx:')) {
        const conditions = this.parseConditions(cleaned.replace(/history of|h\/o|dx:/g, ''));
        result.conditions.push(...conditions);
      }

      // Look for medication indicators
      if (cleaned.includes('medications:') || cleaned.includes('meds:') || cleaned.includes('taking')) {
        const medications = this.parseMedications(cleaned.replace(/medications:|meds:|taking/g, ''));
        result.medications.push(...medications);
      }

      // Look for symptoms
      if (cleaned.includes('complains of') || cleaned.includes('c/o') || cleaned.includes('symptoms:')) {
        const symptoms = cleaned.replace(/complains of|c\/o|symptoms:/g, '').split(',').map(s => s.trim());
        result.symptoms.push(...symptoms);
      }
    });

    // If no specific sections found, try to parse the entire input
    if (result.conditions.length === 0 && result.medications.length === 0) {
      // Attempt to identify if input is primarily conditions or medications
      const conditionKeywords = Object.keys(this.medicalAbbreviations);
      const medicationKeywords = Object.keys(this.medicationAbbreviations);

      const words = input.toLowerCase().split(/[\s,;]+/);
      let conditionScore = 0;
      let medicationScore = 0;

      words.forEach(word => {
        if (conditionKeywords.includes(word)) conditionScore++;
        if (medicationKeywords.includes(word)) medicationScore++;
      });

      if (conditionScore >= medicationScore) {
        result.conditions = this.parseConditions(input);
      } else {
        result.medications = this.parseMedications(input);
      }
    }

    return result;
  }

  // Generate clinical summary from parsed data
  generateClinicalSummary(parsedData) {
    let summary = '';

    if (parsedData.conditions.length > 0) {
      summary += `Medical History: ${parsedData.conditions.join(', ')}. `;
    }

    if (parsedData.medications.length > 0) {
      summary += `Current Medications: ${parsedData.medications.join(', ')}. `;
    }

    if (parsedData.symptoms.length > 0) {
      summary += `Presenting Symptoms: ${parsedData.symptoms.join(', ')}. `;
    }

    return summary.trim();
  }

  // Validate medical input
  validateMedicalInput(input) {
    const validation = {
      isValid: true,
      warnings: [],
      suggestions: []
    };

    if (!input || input.trim().length < 2) {
      validation.isValid = false;
      validation.warnings.push('Input is too short or empty');
      return validation;
    }

    const parsed = this.parseComplexMedicalInput(input);

    // Check for potentially dangerous medication combinations
    const medications = parsed.medications.map(m => m.toLowerCase());
    
    // ACE inhibitor + ARB warning
    const hasACE = medications.some(m => m.includes('ace inhibitor') || m.includes('lisinopril') || m.includes('enalapril'));
    const hasARB = medications.some(m => m.includes('arb') || m.includes('losartan') || m.includes('valsartan'));
    if (hasACE && hasARB) {
      validation.warnings.push('Potential dual RAAS blockade detected (ACE inhibitor + ARB)');
    }

    // Anticoagulant + Antiplatelet warning
    const hasAnticoagulant = medications.some(m => m.includes('warfarin') || m.includes('apixaban') || m.includes('rivaroxaban'));
    const hasAntiplatelet = medications.some(m => m.includes('aspirin') || m.includes('clopidogrel'));
    if (hasAnticoagulant && hasAntiplatelet) {
      validation.warnings.push('Increased bleeding risk: anticoagulant + antiplatelet therapy');
    }

    // Suggest missing information
    if (parsed.conditions.length > 0 && parsed.medications.length === 0) {
      validation.suggestions.push('Consider adding current medications');
    }
    if (parsed.medications.length > 0 && parsed.conditions.length === 0) {
      validation.suggestions.push('Consider adding medical conditions/indications');
    }

    return validation;
  }

  // Get medication recommendations based on conditions
  getMedicationRecommendations(conditions) {
    const recommendations = [];

    conditions.forEach(condition => {
      const lower = condition.toLowerCase();
      
      if (lower.includes('hypertension')) {
        recommendations.push('Consider ACE inhibitor or ARB as first-line antihypertensive');
      }
      if (lower.includes('diabetes')) {
        recommendations.push('Metformin typically first-line for diabetes management');
      }
      if (lower.includes('heart failure')) {
        recommendations.push('ACE inhibitor + beta-blocker + diuretic for heart failure');
      }
      if (lower.includes('atrial fibrillation')) {
        recommendations.push('Consider anticoagulation for stroke prevention in atrial fibrillation');
      }
      if (lower.includes('coronary artery disease')) {
        recommendations.push('Dual antiplatelet therapy + statin for secondary prevention');
      }
    });

    return recommendations;
  }

  // Export functions for use in other components
  static create() {
    return new MedicalTerminologyParser();
  }
}

export default MedicalTerminologyParser;