// RxNorm Drug Database Integration
// Normalizes drug names and medical abbreviations

export class RxNormAPI {
  constructor() {
    this.baseUrl = 'https://rxnav.nlm.nih.gov/REST/';
    this.cache = new Map();
    
    // Medical abbreviations dictionary
    this.medicalAbbreviations = {
      // Conditions
      'dm': 'diabetes mellitus',
      'dm2': 'diabetes mellitus type 2',
      't2dm': 'diabetes mellitus type 2',
      'dm1': 'diabetes mellitus type 1',
      't1dm': 'diabetes mellitus type 1',
      'htn': 'hypertension',
      'chf': 'congestive heart failure',
      'hfref': 'heart failure reduced ejection fraction',
      'hfpef': 'heart failure preserved ejection fraction',
      'ckd': 'chronic kidney disease',
      'ckd3': 'chronic kidney disease stage 3',
      'ckd4': 'chronic kidney disease stage 4',
      'ckd5': 'chronic kidney disease stage 5',
      'esrd': 'end stage renal disease',
      'copd': 'chronic obstructive pulmonary disease',
      'cad': 'coronary artery disease',
      'afib': 'atrial fibrillation',
      'aflutter': 'atrial flutter',
      'mi': 'myocardial infarction',
      'stemi': 'st elevation myocardial infarction',
      'nstemi': 'non st elevation myocardial infarction',
      'cva': 'cerebrovascular accident',
      'tia': 'transient ischemic attack',
      'dvt': 'deep vein thrombosis',
      'pe': 'pulmonary embolism',
      'vte': 'venous thromboembolism',
      'uti': 'urinary tract infection',
      'pna': 'pneumonia',
      'cap': 'community acquired pneumonia',
      'hap': 'hospital acquired pneumonia',
      'vap': 'ventilator associated pneumonia',
      'osa': 'obstructive sleep apnea',
      'gerd': 'gastroesophageal reflux disease',
      'ibs': 'irritable bowel syndrome',
      'ibd': 'inflammatory bowel disease',
      'uc': 'ulcerative colitis',
      'cd': 'crohn disease',
      'ra': 'rheumatoid arthritis',
      'oa': 'osteoarthritis',
      'sle': 'systemic lupus erythematosus',
      'ms': 'multiple sclerosis',
      'pd': 'parkinson disease',
      'ad': 'alzheimer disease',
      'mci': 'mild cognitive impairment',
      'bph': 'benign prostatic hyperplasia',
      'luts': 'lower urinary tract symptoms',
      'gout': 'gout',
      'pvd': 'peripheral vascular disease',
      'pad': 'peripheral artery disease',
      'dka': 'diabetic ketoacidosis',
      'hhs': 'hyperosmolar hyperglycemic state',
      'aki': 'acute kidney injury',
      'arf': 'acute renal failure',
      'gi': 'gastrointestinal',
      'sob': 'shortness of breath',
      'doe': 'dyspnea on exertion',
      'pnd': 'paroxysmal nocturnal dyspnea',
      'bppv': 'benign paroxysmal positional vertigo',
      'oab': 'overactive bladder'
    };
    
    // Common drug misspellings and variations
    this.drugCorrections = {
      'coumadine': 'coumadin',
      'coumadin': 'warfarin',
      'warfarine': 'warfarin',
      'metformine': 'metformin',
      'glucophage': 'metformin',
      'insuline': 'insulin',
      'aspirine': 'aspirin',
      'asa': 'aspirin',
      'furosemida': 'furosemide',
      'lasix': 'furosemide',
      'lisinoprile': 'lisinopril',
      'atenolole': 'atenolol',
      'simvastatine': 'simvastatin',
      'atorvastatine': 'atorvastatin',
      'lipitor': 'atorvastatin',
      'crestor': 'rosuvastatin',
      'plavix': 'clopidogrel',
      'clopidogrele': 'clopidogrel',
      'eliquis': 'apixaban',
      'eliqis': 'apixaban',
      'xarelto': 'rivaroxaban',
      'pradaxa': 'dabigatran',
      'januvia': 'sitagliptin',
      'jardiance': 'empagliflozin',
      'ozempic': 'semaglutide',
      'victoza': 'liraglutide',
      'lantus': 'insulin glargine',
      'humalog': 'insulin lispro',
      'novolog': 'insulin aspart',
      'synthroid': 'levothyroxine',
      'eltroxin': 'levothyroxine',
      'nexium': 'esomeprazole',
      'prilosec': 'omeprazole',
      'protonix': 'pantoprazole',
      'hctz': 'hydrochlorothiazide',
      'bactrim': 'sulfamethoxazole-trimethoprim',
      'septra': 'sulfamethoxazole-trimethoprim',
      'augmentin': 'amoxicillin-clavulanate',
      'zithromax': 'azithromycin',
      'cipro': 'ciprofloxacin',
      'levaquin': 'levofloxacin',
      'keflex': 'cephalexin',
      'valium': 'diazepam',
      'ativan': 'lorazepam',
      'xanax': 'alprazolam',
      'ambien': 'zolpidem',
      'tylenol': 'acetaminophen',
      'paracetamol': 'acetaminophen',
      'advil': 'ibuprofen',
      'motrin': 'ibuprofen',
      'aleve': 'naproxen'
    };
  }

  /**
   * Normalize multiple drugs/conditions from a string
   * @param {string} drugString - Comma-separated list of drugs/conditions
   * @returns {Promise<Array>} - Normalized terms
   */
  async normalizeMultipleDrugs(drugString) {
    if (!drugString || typeof drugString !== 'string') {
      return [];
    }
    
    // Parse input string
    const terms = drugString
      .split(/[,;]+/)
      .map(t => t.trim())
      .filter(t => t.length > 0);
    
    const normalized = [];
    
    for (const term of terms) {
      const result = await this.normalizeTerm(term);
      normalized.push(result);
    }
    
    return normalized;
  }

  /**
   * Normalize a single term (drug or condition)
   * @param {string} term - Term to normalize
   * @returns {Promise<Object>} - Normalized term with metadata
   */
  async normalizeTerm(term) {
    if (!term) return null;
    
    const lower = term.toLowerCase().trim();
    
    // Check medical abbreviations first
    if (this.medicalAbbreviations[lower]) {
      return {
        original: term,
        normalized: this.medicalAbbreviations[lower],
        type: 'condition',
        confidence: 'high'
      };
    }
    
    // Check drug corrections/common names
    const corrected = this.drugCorrections[lower] || lower;
    
    // Try to get RxNorm data
    try {
      const rxData = await this.getRxNormData(corrected);
      
      if (rxData) {
        return {
          original: term,
          normalized: rxData.name,
          type: 'medication',
          rxcui: rxData.rxcui,
          brandNames: rxData.brandNames,
          genericName: rxData.genericName,
          drugClass: rxData.drugClass,
          confidence: 'high'
        };
      }
    } catch (error) {
      console.warn('RxNorm lookup failed:', error);
    }
    
    // Check if it might be a medication pattern (e.g., "metformin 1000mg")
    const medicationPattern = /^([a-zA-Z]+)\s+(\d+)\s*(mg|g|ml|mcg|units?)/i;
    const match = term.match(medicationPattern);
    
    if (match) {
      const drugName = match[1];
      const dose = match[2];
      const unit = match[3];
      
      const correctedDrug = this.drugCorrections[drugName.toLowerCase()] || drugName;
      
      return {
        original: term,
        normalized: `${correctedDrug} ${dose}${unit}`,
        type: 'medication_with_dose',
        drugName: correctedDrug,
        dose: dose,
        unit: unit,
        confidence: 'medium'
      };
    }
    
    // Default: return as-is, likely a condition
    return {
      original: term,
      normalized: term,
      type: 'unknown',
      confidence: 'low'
    };
  }

  /**
   * Get RxNorm data for a drug
   * @param {string} drugName - Drug name
   * @returns {Promise<Object>} - RxNorm data
   */
  async getRxNormData(drugName) {
    const cacheKey = `rxnorm_${drugName}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;
    
    try {
      // Get RxCUI
      const rxUrl = `${this.baseUrl}rxcui.json?name=${encodeURIComponent(drugName)}`;
      const rxResponse = await fetch(rxUrl);
      const rxData = await rxResponse.json();
      
      if (!rxData.idGroup?.rxnormId?.[0]) {
        return null;
      }
      
      const rxcui = rxData.idGroup.rxnormId[0];
      
      // Get drug properties
      const propUrl = `${this.baseUrl}rxcui/${rxcui}/properties.json`;
      const propResponse = await fetch(propUrl);
      const propData = await propResponse.json();
      
      // Get related drugs (brand/generic)
      const relatedUrl = `${this.baseUrl}rxcui/${rxcui}/related.json?tty=SBD+SCD+GPCK+BPCK`;
      const relatedResponse = await fetch(relatedUrl);
      const relatedData = await relatedResponse.json();
      
      const result = {
        rxcui: rxcui,
        name: propData.properties?.name,
        synonym: propData.properties?.synonym,
        tty: propData.properties?.tty,
        brandNames: this.extractBrandNames(relatedData),
        genericName: this.extractGenericName(relatedData),
        drugClass: await this.getDrugClass(rxcui)
      };
      
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('RxNorm API error:', error);
      return null;
    }
  }

  /**
   * Get drug interactions
   * @param {Array} drugList - List of drug names
   * @returns {Promise<Array>} - Drug interactions
   */
  async getDrugInteractions(drugList) {
    if (!drugList || drugList.length < 2) {
      return [];
    }
    
    const interactions = [];
    
    // Get RxCUIs for all drugs
    const rxcuis = await Promise.all(
      drugList.map(async drug => {
        const data = await this.getRxNormData(drug);
        return data?.rxcui;
      })
    );
    
    const validRxcuis = rxcuis.filter(Boolean);
    
    if (validRxcuis.length < 2) {
      return [];
    }
    
    try {
      // Get interactions from RxNorm
      const interactionUrl = `${this.baseUrl}interaction/list.json?rxcuis=${validRxcuis.join('+')}`;
      const response = await fetch(interactionUrl);
      const data = await response.json();
      
      if (data.fullInteractionTypeGroup) {
        data.fullInteractionTypeGroup.forEach(group => {
          group.fullInteractionType?.forEach(interaction => {
            interactions.push({
              drug1: interaction.minConcept[0]?.name,
              drug2: interaction.minConcept[1]?.name,
              description: interaction.interactionPair[0]?.description,
              severity: interaction.interactionPair[0]?.severity || 'Unknown'
            });
          });
        });
      }
      
      return interactions;
    } catch (error) {
      console.error('Drug interaction check error:', error);
      return [];
    }
  }

  /**
   * Get drug class
   * @param {string} rxcui - RxNorm CUI
   * @returns {Promise<string>} - Drug class
   */
  async getDrugClass(rxcui) {
    try {
      const url = `${this.baseUrl}rxclass/class/byRxcui.json?rxcui=${rxcui}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const classes = data.rxclassDrugInfoList?.rxclassDrugInfo?.map(
        info => info.rxclassMinConceptItem?.className
      ) || [];
      
      return classes[0] || 'Unknown';
    } catch (error) {
      return 'Unknown';
    }
  }

  /**
   * Extract brand names from related drugs
   * @private
   */
  extractBrandNames(relatedData) {
    const brandGroups = relatedData.relatedGroup?.conceptGroup?.filter(
      group => group.tty === 'SBD'
    ) || [];
    
    const brandNames = [];
    brandGroups.forEach(group => {
      group.conceptProperties?.forEach(prop => {
        const name = prop.name.split(' ')[0]; // Get first word (brand name)
        if (!brandNames.includes(name)) {
          brandNames.push(name);
        }
      });
    });
    
    return brandNames;
  }

  /**
   * Extract generic name from related drugs
   * @private
   */
  extractGenericName(relatedData) {
    const genericGroups = relatedData.relatedGroup?.conceptGroup?.filter(
      group => group.tty === 'SCD' || group.tty === 'GPCK'
    ) || [];
    
    if (genericGroups.length > 0 && genericGroups[0].conceptProperties?.length > 0) {
      return genericGroups[0].conceptProperties[0].name.split(' ')[0];
    }
    
    return null;
  }

  /**
   * Parse medication with dosage
   * @param {string} medicationString - e.g., "metformin 1000mg BID"
   * @returns {Object} - Parsed medication
   */
  parseMedicationWithDosage(medicationString) {
    const patterns = {
      withFrequency: /^(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg|units?)\s+(QD|BID|TID|QID|PRN|HS|AC|PC|daily|twice|three|four)/i,
      withDose: /^(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg|units?)/i,
      drugOnly: /^([a-zA-Z\-]+)$/
    };
    
    // Check pattern with frequency
    let match = medicationString.match(patterns.withFrequency);
    if (match) {
      return {
        drug: this.drugCorrections[match[1].toLowerCase()] || match[1],
        dose: match[2],
        unit: match[3],
        frequency: this.normalizeFrequency(match[4]),
        original: medicationString
      };
    }
    
    // Check pattern with dose only
    match = medicationString.match(patterns.withDose);
    if (match) {
      return {
        drug: this.drugCorrections[match[1].toLowerCase()] || match[1],
        dose: match[2],
        unit: match[3],
        frequency: null,
        original: medicationString
      };
    }
    
    // Drug name only
    match = medicationString.match(patterns.drugOnly);
    if (match) {
      return {
        drug: this.drugCorrections[match[1].toLowerCase()] || match[1],
        dose: null,
        unit: null,
        frequency: null,
        original: medicationString
      };
    }
    
    return {
      drug: medicationString,
      dose: null,
      unit: null,
      frequency: null,
      original: medicationString
    };
  }

  /**
   * Normalize frequency abbreviations
   * @private
   */
  normalizeFrequency(freq) {
    const frequencies = {
      'qd': 'once daily',
      'bid': 'twice daily',
      'tid': 'three times daily',
      'qid': 'four times daily',
      'prn': 'as needed',
      'hs': 'at bedtime',
      'ac': 'before meals',
      'pc': 'after meals',
      'daily': 'once daily',
      'twice': 'twice daily',
      'three': 'three times daily',
      'four': 'four times daily'
    };
    
    return frequencies[freq.toLowerCase()] || freq;
  }

  /**
   * Cache management
   * @private
   */
  getFromCache(key) {
    return this.cache.get(key);
  }

  setCache(key, data) {
    this.cache.set(key, data);
  }

  clearCache() {
    this.cache.clear();
  }
}

export default RxNormAPI;