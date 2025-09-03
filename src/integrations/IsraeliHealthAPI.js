// Israeli Ministry of Health Integration
// Hebrew drug names, Sal Briut coverage, and local guidelines

export class IsraeliHealthAPI {
  constructor() {
    this.drugRegistry = new Map();
    this.salBriutDatabase = new Map();
    this.antibiogramData = new Map();
    this.initializeHebrewDrugs();
    this.initializeSalBriut();
    this.initializeAntibiogram();
  }

  /**
   * Initialize Hebrew drug names and transliterations
   */
  initializeHebrewDrugs() {
    // Common medications with Hebrew names
    const drugs = [
      // Anticoagulants
      { english: 'warfarin', hebrew: 'קומדין', transliteration: 'coumadin', category: 'anticoagulant' },
      { english: 'apixaban', hebrew: 'אליקוויס', transliteration: 'eliquis', category: 'anticoagulant' },
      { english: 'rivaroxaban', hebrew: 'קסרלטו', transliteration: 'xarelto', category: 'anticoagulant' },
      { english: 'dabigatran', hebrew: 'פראדקסה', transliteration: 'pradaxa', category: 'anticoagulant' },
      
      // Diabetes medications
      { english: 'metformin', hebrew: 'גלוקופאז׳', transliteration: 'glucophage', category: 'diabetes' },
      { english: 'insulin glargine', hebrew: 'לנטוס', transliteration: 'lantus', category: 'diabetes' },
      { english: 'insulin lispro', hebrew: 'הומלוג', transliteration: 'humalog', category: 'diabetes' },
      { english: 'sitagliptin', hebrew: 'ג׳נוביה', transliteration: 'januvia', category: 'diabetes' },
      { english: 'empagliflozin', hebrew: 'ג׳רדיאנס', transliteration: 'jardiance', category: 'diabetes' },
      { english: 'semaglutide', hebrew: 'אוזמפיק', transliteration: 'ozempic', category: 'diabetes' },
      { english: 'liraglutide', hebrew: 'ויקטוזה', transliteration: 'victoza', category: 'diabetes' },
      
      // Cardiovascular
      { english: 'atorvastatin', hebrew: 'ליפיטור', transliteration: 'lipitor', category: 'statin' },
      { english: 'rosuvastatin', hebrew: 'קרסטור', transliteration: 'crestor', category: 'statin' },
      { english: 'simvastatin', hebrew: 'סימבקור', transliteration: 'simvacor', category: 'statin' },
      { english: 'lisinopril', hebrew: 'ליסינופריל', transliteration: 'lisinopril', category: 'ace-inhibitor' },
      { english: 'amlodipine', hebrew: 'נורבסק', transliteration: 'norvasc', category: 'calcium-blocker' },
      { english: 'bisoprolol', hebrew: 'קונקור', transliteration: 'concor', category: 'beta-blocker' },
      { english: 'furosemide', hebrew: 'פורוסמיד', transliteration: 'furosemide', category: 'diuretic' },
      { english: 'spironolactone', hebrew: 'אלדקטון', transliteration: 'aldactone', category: 'diuretic' },
      
      // Pain/Inflammation
      { english: 'acetaminophen', hebrew: 'אקמול', transliteration: 'acamol', category: 'analgesic' },
      { english: 'ibuprofen', hebrew: 'נורופן', transliteration: 'nurofen', category: 'nsaid' },
      { english: 'naproxen', hebrew: 'נקסין', transliteration: 'naxyn', category: 'nsaid' },
      { english: 'tramadol', hebrew: 'טרמדקס', transliteration: 'tramdex', category: 'opioid' },
      
      // GI medications
      { english: 'omeprazole', hebrew: 'אומפרדקס', transliteration: 'omepradex', category: 'ppi' },
      { english: 'esomeprazole', hebrew: 'נקסיום', transliteration: 'nexium', category: 'ppi' },
      { english: 'pantoprazole', hebrew: 'קונטרולוק', transliteration: 'controloc', category: 'ppi' },
      
      // Psychiatric
      { english: 'escitalopram', hebrew: 'ציפרלקס', transliteration: 'cipralex', category: 'ssri' },
      { english: 'sertraline', hebrew: 'סרטרלין', transliteration: 'sertraline', category: 'ssri' },
      { english: 'quetiapine', hebrew: 'סרוקוול', transliteration: 'seroquel', category: 'antipsychotic' },
      { english: 'alprazolam', hebrew: 'קסנקס', transliteration: 'xanax', category: 'benzodiazepine' },
      { english: 'lorazepam', hebrew: 'לורזפם', transliteration: 'lorazepam', category: 'benzodiazepine' },
      
      // Dementia medications
      { english: 'donepezil', hebrew: 'אריספט', transliteration: 'aricept', category: 'dementia' },
      { english: 'memantine', hebrew: 'אביקסה', transliteration: 'ebixa', category: 'dementia' },
      { english: 'rivastigmine', hebrew: 'אקסלון', transliteration: 'exelon', category: 'dementia' },
      
      // Thyroid
      { english: 'levothyroxine', hebrew: 'אלטרוקסין', transliteration: 'eltroxin', category: 'thyroid' },
      
      // Antibiotics
      { english: 'amoxicillin', hebrew: 'מוקסיפן', transliteration: 'moxypen', category: 'antibiotic' },
      { english: 'augmentin', hebrew: 'אוגמנטין', transliteration: 'augmentin', category: 'antibiotic' },
      { english: 'ciprofloxacin', hebrew: 'ציפרודקס', transliteration: 'ciprodex', category: 'antibiotic' },
      { english: 'azithromycin', hebrew: 'אזניל', transliteration: 'azenil', category: 'antibiotic' },
      { english: 'ceftriaxone', hebrew: 'רוספין', transliteration: 'rocephin', category: 'antibiotic' }
    ];
    
    // Populate drug registry
    drugs.forEach(drug => {
      this.drugRegistry.set(drug.english.toLowerCase(), drug);
      this.drugRegistry.set(drug.hebrew, drug);
      this.drugRegistry.set(drug.transliteration.toLowerCase(), drug);
    });
  }

  /**
   * Initialize Sal Briut (National Drug Formulary) coverage
   */
  initializeSalBriut() {
    const coverage = [
      // Full coverage (סל מלא)
      { drug: 'metformin', covered: true, copay: 0, restriction: null },
      { drug: 'warfarin', covered: true, copay: 0, restriction: null },
      { drug: 'lisinopril', covered: true, copay: 0, restriction: null },
      { drug: 'atorvastatin', covered: true, copay: 0, restriction: null },
      { drug: 'furosemide', covered: true, copay: 0, restriction: null },
      { drug: 'amlodipine', covered: true, copay: 0, restriction: null },
      { drug: 'bisoprolol', covered: true, copay: 0, restriction: null },
      { drug: 'omeprazole', covered: true, copay: 0, restriction: null },
      { drug: 'levothyroxine', covered: true, copay: 0, restriction: null },
      
      // Partial coverage with copay
      { drug: 'apixaban', covered: true, copay: 28, restriction: 'Requires prior authorization for non-valvular AF' },
      { drug: 'rivaroxaban', covered: true, copay: 28, restriction: 'Requires prior authorization' },
      { drug: 'sitagliptin', covered: true, copay: 28, restriction: 'Second-line after metformin' },
      { drug: 'empagliflozin', covered: true, copay: 35, restriction: 'HbA1c > 7.5% on metformin' },
      { drug: 'donepezil', covered: true, copay: 31, restriction: 'MMSE 10-26 for Alzheimer' },
      { drug: 'memantine', covered: true, copay: 44, restriction: 'Moderate to severe Alzheimer' },
      
      // Conditional coverage
      { drug: 'semaglutide', covered: 'conditional', copay: 52, restriction: 'BMI > 30 or BMI > 27 with comorbidities' },
      { drug: 'insulin glargine', covered: true, copay: 15, restriction: 'Diabetes with inadequate control' },
      { drug: 'quetiapine', covered: true, copay: 21, restriction: 'Psychiatrist prescription required' },
      
      // Not covered
      { drug: 'esomeprazole', covered: false, copay: null, restriction: 'Use omeprazole instead' },
      { drug: 'rosuvastatin', covered: false, copay: null, restriction: 'Use atorvastatin or simvastatin' }
    ];
    
    coverage.forEach(item => {
      this.salBriutDatabase.set(item.drug.toLowerCase(), item);
    });
  }

  /**
   * Initialize local antibiogram data (Israeli resistance patterns)
   */
  initializeAntibiogram() {
    // Based on typical Israeli hospital antibiogram data
    this.antibiogramData.set('e.coli', {
      'nitrofurantoin': 95,
      'fosfomycin': 97,
      'ciprofloxacin': 72,
      'levofloxacin': 73,
      'augmentin': 68,
      'ceftriaxone': 85,
      'ceftazidime': 87,
      'piperacillin-tazobactam': 92,
      'gentamicin': 88,
      'amikacin': 98,
      'meropenem': 99,
      'ertapenem': 99
    });
    
    this.antibiogramData.set('klebsiella', {
      'nitrofurantoin': 45,
      'ciprofloxacin': 78,
      'levofloxacin': 79,
      'augmentin': 65,
      'ceftriaxone': 82,
      'ceftazidime': 83,
      'piperacillin-tazobactam': 85,
      'gentamicin': 90,
      'amikacin': 96,
      'meropenem': 98,
      'ertapenem': 97
    });
    
    this.antibiogramData.set('pseudomonas', {
      'ciprofloxacin': 75,
      'levofloxacin': 73,
      'ceftazidime': 82,
      'cefepime': 85,
      'piperacillin-tazobactam': 88,
      'gentamicin': 86,
      'amikacin': 92,
      'meropenem': 89,
      'imipenem': 88,
      'colistin': 99
    });
    
    this.antibiogramData.set('mrsa', {
      'vancomycin': 100,
      'linezolid': 100,
      'daptomycin': 99,
      'tigecycline': 98,
      'rifampin': 95,
      'trimethoprim-sulfamethoxazole': 93,
      'clindamycin': 65,
      'doxycycline': 88
    });
    
    this.antibiogramData.set('enterococcus', {
      'ampicillin': 85,
      'vancomycin': 88,
      'linezolid': 99,
      'daptomycin': 99,
      'tigecycline': 99,
      'nitrofurantoin': 98
    });
  }

  /**
   * Check Sal Briut coverage for a medication
   * @param {string} drugName - Medication name
   * @returns {Object} - Coverage information
   */
  checkSalBriutCoverage(drugName) {
    if (!drugName) return { covered: false, message: 'No drug specified' };
    
    const lower = drugName.toLowerCase().trim();
    
    // Check if it's in Hebrew and get English equivalent
    const drugInfo = this.drugRegistry.get(lower);
    const searchName = drugInfo ? drugInfo.english.toLowerCase() : lower;
    
    const coverage = this.salBriutDatabase.get(searchName);
    
    if (!coverage) {
      return {
        covered: 'unknown',
        drug: drugName,
        message: 'Coverage information not available',
        suggestion: 'Check with your health fund (קופת חולים)'
      };
    }
    
    return {
      ...coverage,
      drug: drugName,
      hebrewName: drugInfo?.hebrew,
      englishName: drugInfo?.english,
      category: drugInfo?.category
    };
  }

  /**
   * Get Hebrew drug information
   * @param {string} drugName - Drug name in any language
   * @returns {Object} - Drug information with Hebrew translation
   */
  getHebrewDrugInfo(drugName) {
    if (!drugName) return null;
    
    const lower = drugName.toLowerCase().trim();
    const drugInfo = this.drugRegistry.get(lower);
    
    if (!drugInfo) {
      return {
        original: drugName,
        hebrew: null,
        english: drugName,
        transliteration: null,
        category: 'unknown',
        message: 'Translation not found'
      };
    }
    
    return {
      original: drugName,
      ...drugInfo,
      salBriut: this.checkSalBriutCoverage(drugInfo.english)
    };
  }

  /**
   * Get local antibiogram data
   * @param {string} bacteria - Bacteria name
   * @param {string} antibiotic - Antibiotic name (optional)
   * @returns {Object} - Susceptibility data
   */
  getLocalAntibiogram(bacteria, antibiotic = null) {
    const bacteriaLower = bacteria.toLowerCase().replace(/\s+/g, '');
    const data = this.antibiogramData.get(bacteriaLower);
    
    if (!data) {
      return {
        bacteria,
        message: 'No local antibiogram data available',
        suggestion: 'Consult hospital-specific antibiogram'
      };
    }
    
    if (antibiotic) {
      const antibioticLower = antibiotic.toLowerCase();
      const susceptibility = data[antibioticLower];
      
      return {
        bacteria,
        antibiotic,
        susceptibility: susceptibility || 'No data',
        interpretation: this.interpretSusceptibility(susceptibility)
      };
    }
    
    // Return all antibiotics for this bacteria
    const sorted = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .map(([drug, susceptibility]) => ({
        antibiotic: drug,
        susceptibility,
        interpretation: this.interpretSusceptibility(susceptibility)
      }));
    
    return {
      bacteria,
      antibiotics: sorted,
      recommendation: this.getEmpiricalRecommendation(bacteria, sorted)
    };
  }

  /**
   * Interpret susceptibility percentage
   * @private
   */
  interpretSusceptibility(percentage) {
    if (percentage >= 90) return 'Excellent coverage';
    if (percentage >= 80) return 'Good coverage';
    if (percentage >= 70) return 'Moderate coverage';
    if (percentage >= 60) return 'Limited coverage';
    return 'Poor coverage - avoid empirically';
  }

  /**
   * Get empirical therapy recommendation
   * @private
   */
  getEmpiricalRecommendation(bacteria, susceptibilityData) {
    const excellent = susceptibilityData.filter(d => d.susceptibility >= 90);
    const good = susceptibilityData.filter(d => d.susceptibility >= 80 && d.susceptibility < 90);
    
    const recommendations = [];
    
    if (bacteria === 'e.coli') {
      recommendations.push('For uncomplicated UTI: Nitrofurantoin or Fosfomycin');
      recommendations.push('For pyelonephritis: Ceftriaxone or Aminoglycoside');
    } else if (bacteria === 'mrsa') {
      recommendations.push('Vancomycin remains first-line for serious infections');
      recommendations.push('Consider oral TMP-SMX or Doxycycline for mild infections');
    } else if (bacteria === 'pseudomonas') {
      recommendations.push('Double coverage recommended for serious infections');
      recommendations.push('Consider Piperacillin-Tazobactam + Aminoglycoside');
    }
    
    return {
      firstLine: excellent.slice(0, 3).map(d => d.antibiotic),
      alternative: good.slice(0, 3).map(d => d.antibiotic),
      specificRecommendations: recommendations
    };
  }

  /**
   * Get Ministry of Health guidelines URL
   * @param {string} condition - Medical condition
   * @returns {string} - MOH guideline URL
   */
  getMOHGuidelineUrl(condition) {
    const guidelines = {
      'diabetes': 'https://www.health.gov.il/Subjects/diseases/Diabetes',
      'hypertension': 'https://www.health.gov.il/Subjects/diseases/heart/High_Blood_Pressure',
      'heart failure': 'https://www.health.gov.il/Subjects/diseases/heart/heart_failure',
      'dementia': 'https://www.health.gov.il/Subjects/Geriatrics/dementia',
      'falls': 'https://www.health.gov.il/Subjects/Geriatrics/Falls_Prevention',
      'covid-19': 'https://www.health.gov.il/Subjects/corona',
      'influenza': 'https://www.health.gov.il/Subjects/vaccines/flu',
      'pneumonia': 'https://www.health.gov.il/Subjects/vaccines/pneumococcal',
      'osteoporosis': 'https://www.health.gov.il/Subjects/Geriatrics/Osteoporosis'
    };
    
    const lower = condition.toLowerCase();
    return guidelines[lower] || 'https://www.health.gov.il/Subjects/Geriatrics';
  }

  /**
   * Get local clinical guidelines
   * @param {string} topic - Clinical topic
   * @returns {Object} - Guidelines and recommendations
   */
  getIsraeliGuidelines(topic) {
    const guidelines = {
      'anticoagulation': {
        title: 'Israeli Anticoagulation Guidelines',
        recommendations: [
          'CHA2DS2-VASc ≥2 in men or ≥3 in women: anticoagulate',
          'Prefer DOACs over warfarin for non-valvular AF',
          'Annual renal function monitoring for DOAC patients',
          'Consider dose reduction in elderly >80 years'
        ],
        salBriutNotes: 'DOACs require prior authorization form 3020'
      },
      'diabetes': {
        title: 'Israeli Diabetes Guidelines',
        recommendations: [
          'Target HbA1c <7% for most patients',
          'Target HbA1c <8% for elderly with comorbidities',
          'Metformin first-line unless contraindicated',
          'SGLT2i or GLP-1 agonists for cardiovascular benefit'
        ],
        salBriutNotes: 'SGLT2i covered after metformin failure'
      },
      'vaccination': {
        title: 'Israeli Elderly Vaccination Schedule',
        recommendations: [
          'Annual influenza vaccine (September-December)',
          'Pneumococcal: PCV13 followed by PPSV23',
          'Shingles vaccine age ≥50',
          'COVID-19 boosters per MOH guidelines'
        ],
        salBriutNotes: 'All routine vaccines covered in Sal'
      }
    };
    
    const lower = topic.toLowerCase();
    return guidelines[lower] || {
      title: 'General Israeli Guidelines',
      message: 'Specific guidelines not found',
      url: this.getMOHGuidelineUrl(topic)
    };
  }

  /**
   * Translate medical terms to Hebrew
   * @param {string} term - Medical term in English
   * @returns {string} - Hebrew translation
   */
  translateToHebrew(term) {
    const translations = {
      // Conditions
      'diabetes': 'סוכרת',
      'hypertension': 'יתר לחץ דם',
      'heart failure': 'אי ספיקת לב',
      'dementia': 'דמנציה',
      'depression': 'דיכאון',
      'anxiety': 'חרדה',
      'falls': 'נפילות',
      'pain': 'כאב',
      'infection': 'זיהום',
      'pneumonia': 'דלקת ריאות',
      
      // Symptoms
      'fever': 'חום',
      'cough': 'שיעול',
      'shortness of breath': 'קוצר נשימה',
      'chest pain': 'כאב בחזה',
      'confusion': 'בלבול',
      'weakness': 'חולשה',
      'dizziness': 'סחרחורת',
      'nausea': 'בחילה',
      'vomiting': 'הקאה',
      'diarrhea': 'שלשול',
      
      // Healthcare terms
      'doctor': 'רופא',
      'nurse': 'אחות',
      'hospital': 'בית חולים',
      'emergency room': 'חדר מיון',
      'clinic': 'מרפאה',
      'prescription': 'מרשם',
      'blood test': 'בדיקת דם',
      'x-ray': 'צילום רנטגן',
      'medication': 'תרופה',
      'treatment': 'טיפול'
    };
    
    const lower = term.toLowerCase();
    return translations[lower] || term;
  }
}

export default IsraeliHealthAPI;