// Advanced Medical NLP with Human-like Reasoning
// Handles typos, variations, context, and medical intelligence

export class MedicalNLP {
  constructor() {
    // Comprehensive medical variations database
    this.drugVariations = {
      'warfarin': ['coumadin', 'coumadine', 'kumadin', 'cumudan', 'วาร์ฟาริน', 'варфарин', 'קומדין', 'كومادين'],
      'metformin': ['metformine', 'glucophage', 'metfornin', 'metaformin', 'glucomet', 'dianben', 'מטפורמין', 'ميتفورمين'],
      'furosemide': ['lasix', 'frusemide', 'furosemida', 'furosemine', 'לאזיקס', 'فروسيماید'],
      'acetaminophen': ['paracetamol', 'tylenol', 'acamol', 'panadol', 'פרצטמול', 'אקמול', 'باراسیتامول', 'تایلنول'],
      'aspirin': ['acetylsalicylic', 'asa', 'asparine', 'asprin', 'אספירין', 'اسپرین'],
      'amlodipine': ['norvasc', 'amlodipin', 'amlodipina', 'אמלודיפין', 'املودیپین'],
      'atorvastatin': ['lipitor', 'atorvastatine', 'atorvastaina', 'ליפיטור', 'آتورواستاتین'],
      'omeprazole': ['prilosec', 'losec', 'omeprazol', 'אומפרזול', 'أوميبرازول'],
      'levothyroxine': ['synthroid', 'eltroxin', 'euthyrox', 'levothroid', 'לבותירוקסין', 'لووتیروکسین'],
      'simvastatin': ['zocor', 'simvastatine', 'simvastatina', 'זוקור', 'سیمواستاتین'],
      'lisinopril': ['prinivil', 'zestril', 'lisinoprill', 'ליזינופריל', 'لیزینوپریل'],
      'hydrochlorothiazide': ['hctz', 'microzide', 'hydrodiuril', 'הידרוכלורותיאזיד'],
      'tramadol': ['ultram', 'tramal', 'tramadoll', 'טרמדול', 'ترامادول'],
      'morphine': ['morphone', 'morphin', 'morphina', 'מורפין', 'مورفین'],
      'fentanyl': ['fentanil', 'sublimaze', 'פנטניל', 'فنتانیل'],
      'lorazepam': ['ativan', 'lorazapam', 'לורזפם', 'لورازپام'],
      'diazepam': ['valium', 'diazapam', 'דיאזפם', 'دیازپام'],
      'alprazolam': ['xanax', 'alprazolam', 'אלפרזולם', 'آلپرازولام'],
      'insulin': ['insuline', 'humalog', 'novolog', 'lantus', 'אינסולין', 'انسولین']
    };

    this.conditionVariations = {
      'myocardial infarction': ['MI', 'heart attack', 'STEMI', 'NSTEMI', 'אוטם', 'احتشاء عضلة القلب', 'stemi', 'nstemi'],
      'congestive heart failure': ['CHF', 'HF', 'heart failure', 'cardiac failure', 'אי ספיקת לב', 'قصور القلب'],
      'chronic kidney disease': ['CKD', 'chronic renal failure', 'CRF', 'kidney failure', 'מחלת כליות כרונית'],
      'diabetes mellitus': ['DM', 'diabetes', 'T1DM', 'T2DM', 'סוכרת', 'داء السكري'],
      'hypertension': ['HTN', 'high blood pressure', 'HBP', 'לחץ דם גבוה', 'ارتفاع ضغط الدم'],
      'atrial fibrillation': ['AFib', 'AF', 'a-fib', 'רפרוף פרוזדורים', 'الرجفان الأذيني'],
      'chronic obstructive pulmonary disease': ['COPD', 'emphysema', 'chronic bronchitis', 'ח.ר.ח', 'مرض الانسداد الرئوي المزمن'],
      'dementia': ['dimensia', 'alzheimer', 'alzheimers', 'cognitive impairment', 'דמנציה', 'الخرف'],
      'delirium': ['confusion', 'altered mental status', 'AMS', 'דליריום', 'الهذيان'],
      'osteoporosis': ['bone loss', 'osteopenia', 'אוסטיאופורוזיס', 'هشاشة العظام'],
      'urinary tract infection': ['UTI', 'bladder infection', 'cystitis', 'זיהום בדרכי שתן', 'التهاب المسالك البولية']
    };

    this.labValueVariations = {
      'hemoglobin': ['hgb', 'hb', 'haemoglobin', 'המוגלובין', 'الهيموجلوبين'],
      'creatinine': ['cr', 'creat', 'creatinin', 'קריאטינין', 'الكرياتينين'],
      'glucose': ['blood sugar', 'bg', 'blood glucose', 'גלוקוז', 'الجلوكوز'],
      'cholesterol': ['chol', 'total cholesterol', 'כולסטרול', 'الكولسترول'],
      'triglycerides': ['tg', 'trigs', 'טריגליצרידים', 'الدهون الثلاثية'],
      'sodium': ['na', 'natrium', 'נתרן', 'الصوديوم'],
      'potassium': ['k', 'kalium', 'אשלגן', 'البوتاسيوم'],
      'chloride': ['cl', 'כלור', 'الكلوريد'],
      'blood urea nitrogen': ['BUN', 'urea', 'אוריאה', 'نيتروجين اليوريا'],
      'international normalized ratio': ['INR', 'inr', 'יחס INR', 'النسبة المعيارية الدولية']
    };

    // Medical context clues for better understanding
    this.contextClues = {
      'anticoagulation': ['INR', 'warfarin', 'DOAC', 'bleeding', 'stroke prevention', 'atrial fibrillation', 'DVT', 'PE'],
      'diabetes': ['glucose', 'A1C', 'insulin', 'hypoglycemia', 'metformin', 'diabetic', 'blood sugar'],
      'hypertension': ['blood pressure', 'BP', 'systolic', 'diastolic', 'ACE inhibitor', 'ARB', 'diuretic'],
      'cardiology': ['heart', 'cardiac', 'ECG', 'EKG', 'chest pain', 'shortness of breath', 'edema'],
      'nephrology': ['kidney', 'renal', 'creatinine', 'GFR', 'dialysis', 'proteinuria'],
      'geriatrics': ['elderly', 'geriatric', 'frail', 'polypharmacy', 'falls', 'dementia', 'confusion'],
      'emergency': ['acute', 'emergency', 'urgent', 'stat', 'immediately', 'critical', 'life-threatening']
    };

    // Common medical abbreviations
    this.abbreviations = {
      'q.d.': 'once daily',
      'b.i.d.': 'twice daily', 
      'bid': 'twice daily',
      't.i.d.': 'three times daily',
      'tid': 'three times daily',
      'q.i.d.': 'four times daily',
      'qid': 'four times daily',
      'prn': 'as needed',
      'p.r.n.': 'as needed',
      'po': 'by mouth',
      'p.o.': 'by mouth',
      'iv': 'intravenous',
      'i.v.': 'intravenous',
      'im': 'intramuscular',
      'sc': 'subcutaneous',
      'sublingual': 'under tongue'
    };
  }

  // Main interpretation function
  async interpretQuery(input) {
    if (!input || typeof input !== 'string') {
      return this.createEmptyInterpretation(input);
    }

    const normalized = this.normalizeText(input);
    const corrections = this.findTypos(normalized);
    const context = this.extractContext(corrections.corrected || normalized);
    const intent = this.determineIntent(context);
    const entities = this.extractMedicalEntities(corrections.corrected || normalized);
    const expandedAbbreviations = this.expandAbbreviations(corrections.corrected || normalized);

    return {
      original: input,
      normalized: normalized,
      corrected: corrections.corrected,
      typosFound: corrections.typos,
      context: context,
      intent: intent,
      entities: entities,
      expandedAbbreviations: expandedAbbreviations,
      confidence: this.calculateConfidence(context, entities, corrections.typos),
      suggestions: this.generateSuggestions(context, intent)
    };
  }

  // Advanced typo detection and correction
  findTypos(text) {
    const words = text.toLowerCase().split(/\s+/);
    const corrections = [];
    const typos = [];
    let correctedText = text;

    for (const word of words) {
      const cleaned = word.replace(/[^\w\u0590-\u05FF\u0600-\u06FF]/g, '');
      if (cleaned.length < 2) continue;

      // Check all variation databases
      const drugMatch = this.findBestMatch(cleaned, this.drugVariations);
      const conditionMatch = this.findBestMatch(cleaned, this.conditionVariations);
      const labMatch = this.findBestMatch(cleaned, this.labValueVariations);

      let bestMatch = null;
      if (drugMatch.score > 0.7) bestMatch = { ...drugMatch, type: 'drug' };
      else if (conditionMatch.score > 0.7) bestMatch = { ...conditionMatch, type: 'condition' };
      else if (labMatch.score > 0.7) bestMatch = { ...labMatch, type: 'lab' };

      if (bestMatch && bestMatch.match !== cleaned) {
        corrections.push({
          original: word,
          corrected: bestMatch.match,
          type: bestMatch.type,
          confidence: bestMatch.score
        });
        typos.push(word);
        correctedText = correctedText.replace(new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi'), bestMatch.match);
      }
    }

    return {
      corrected: correctedText !== text ? correctedText : null,
      corrections: corrections,
      typos: typos
    };
  }

  // Find best match using fuzzy matching
  findBestMatch(input, variations) {
    let bestMatch = '';
    let bestScore = 0;

    for (const [standard, variants] of Object.entries(variations)) {
      // Check exact match first
      if (variants.includes(input.toLowerCase()) || standard.toLowerCase() === input.toLowerCase()) {
        return { match: standard, score: 1.0 };
      }

      // Check fuzzy matches
      for (const variant of [standard, ...variants]) {
        const score = this.calculateSimilarity(input.toLowerCase(), variant.toLowerCase());
        if (score > bestScore && score > 0.6) {
          bestScore = score;
          bestMatch = standard;
        }
      }
    }

    return { match: bestMatch, score: bestScore };
  }

  // Calculate string similarity (Jaro-Winkler algorithm)
  calculateSimilarity(str1, str2) {
    if (str1 === str2) return 1.0;
    if (str1.length === 0 || str2.length === 0) return 0.0;

    const matchWindow = Math.floor(Math.max(str1.length, str2.length) / 2) - 1;
    const str1Matches = new Array(str1.length).fill(false);
    const str2Matches = new Array(str2.length).fill(false);

    let matches = 0;
    let transpositions = 0;

    // Find matches
    for (let i = 0; i < str1.length; i++) {
      const start = Math.max(0, i - matchWindow);
      const end = Math.min(i + matchWindow + 1, str2.length);

      for (let j = start; j < end; j++) {
        if (str2Matches[j] || str1[i] !== str2[j]) continue;
        str1Matches[i] = true;
        str2Matches[j] = true;
        matches++;
        break;
      }
    }

    if (matches === 0) return 0.0;

    // Find transpositions
    let k = 0;
    for (let i = 0; i < str1.length; i++) {
      if (!str1Matches[i]) continue;
      while (!str2Matches[k]) k++;
      if (str1[i] !== str2[k]) transpositions++;
      k++;
    }

    const jaro = (matches / str1.length + matches / str2.length + (matches - transpositions / 2) / matches) / 3;

    // Add Winkler prefix bonus
    let prefix = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length, 4); i++) {
      if (str1[i] === str2[i]) prefix++;
      else break;
    }

    return jaro + (0.1 * prefix * (1 - jaro));
  }

  // Extract medical context from text
  extractContext(text) {
    const contexts = [];
    const lowerText = text.toLowerCase();

    for (const [context, clues] of Object.entries(this.contextClues)) {
      let score = 0;
      for (const clue of clues) {
        if (lowerText.includes(clue.toLowerCase())) {
          score++;
        }
      }
      if (score > 0) {
        contexts.push({
          context: context,
          strength: score / clues.length,
          matchedClues: clues.filter(clue => lowerText.includes(clue.toLowerCase()))
        });
      }
    }

    return contexts.sort((a, b) => b.strength - a.strength);
  }

  // Determine intent from context
  determineIntent(contexts) {
    if (contexts.length === 0) {
      return { type: 'general_medical', confidence: 0.5 };
    }

    const topContext = contexts[0];
    let intent = { type: 'general_medical', confidence: 0.5 };

    // Map contexts to intents
    const contextToIntent = {
      'anticoagulation': 'medication_management',
      'diabetes': 'chronic_disease_management',
      'hypertension': 'chronic_disease_management',
      'cardiology': 'cardiovascular_assessment',
      'nephrology': 'renal_function_assessment',
      'geriatrics': 'geriatric_assessment',
      'emergency': 'emergency_management'
    };

    if (contextToIntent[topContext.context]) {
      intent = {
        type: contextToIntent[topContext.context],
        confidence: Math.min(0.95, 0.6 + (topContext.strength * 0.35)),
        primaryContext: topContext.context
      };
    }

    return intent;
  }

  // Extract medical entities (drugs, conditions, labs)
  extractMedicalEntities(text) {
    const entities = {
      drugs: [],
      conditions: [],
      labValues: [],
      dosages: [],
      frequencies: []
    };

    const lowerText = text.toLowerCase();

    // Extract drugs
    for (const [drug, variants] of Object.entries(this.drugVariations)) {
      if ([drug, ...variants].some(variant => lowerText.includes(variant.toLowerCase()))) {
        entities.drugs.push({
          name: drug,
          found: variants.find(v => lowerText.includes(v.toLowerCase())) || drug
        });
      }
    }

    // Extract conditions
    for (const [condition, variants] of Object.entries(this.conditionVariations)) {
      if ([condition, ...variants].some(variant => lowerText.includes(variant.toLowerCase()))) {
        entities.conditions.push({
          name: condition,
          found: variants.find(v => lowerText.includes(v.toLowerCase())) || condition
        });
      }
    }

    // Extract lab values
    for (const [lab, variants] of Object.entries(this.labValueVariations)) {
      if ([lab, ...variants].some(variant => lowerText.includes(variant.toLowerCase()))) {
        entities.labValues.push({
          name: lab,
          found: variants.find(v => lowerText.includes(v.toLowerCase())) || lab
        });
      }
    }

    // Extract dosages (simple regex)
    const dosagePattern = /(\d+(?:\.\d+)?)\s*(mg|g|mcg|μg|units?|ml|cc|tablets?|caps?)/gi;
    const dosages = [...text.matchAll(dosagePattern)];
    entities.dosages = dosages.map(match => ({
      amount: parseFloat(match[1]),
      unit: match[2],
      full: match[0]
    }));

    // Extract frequencies
    const frequencyPattern = /(once|twice|three times|four times|every \d+ hours?|q\d+h|bid|tid|qid|prn|as needed)/gi;
    const frequencies = [...text.matchAll(frequencyPattern)];
    entities.frequencies = frequencies.map(match => match[0]);

    return entities;
  }

  // Expand medical abbreviations
  expandAbbreviations(text) {
    let expanded = text;
    const expansions = [];

    for (const [abbrev, expansion] of Object.entries(this.abbreviations)) {
      const regex = new RegExp(`\\b${this.escapeRegex(abbrev)}\\b`, 'gi');
      if (regex.test(text)) {
        expanded = expanded.replace(regex, `${abbrev} (${expansion})`);
        expansions.push({ abbreviation: abbrev, expansion: expansion });
      }
    }

    return {
      expanded: expanded !== text ? expanded : null,
      expansions: expansions
    };
  }

  // Calculate confidence score
  calculateConfidence(contexts, entities, typos) {
    let confidence = 0.5; // baseline

    // Boost confidence for strong contexts
    if (contexts.length > 0) {
      confidence += contexts[0].strength * 0.3;
    }

    // Boost for recognized medical entities
    const totalEntities = entities.drugs.length + entities.conditions.length + entities.labValues.length;
    if (totalEntities > 0) {
      confidence += Math.min(0.3, totalEntities * 0.1);
    }

    // Reduce confidence for typos
    confidence -= typos.length * 0.05;

    return Math.max(0.1, Math.min(0.98, confidence));
  }

  // Generate helpful suggestions
  generateSuggestions(contexts, intent) {
    const suggestions = [];

    if (contexts.length > 0) {
      const primaryContext = contexts[0].context;
      
      switch (primaryContext) {
        case 'anticoagulation':
          suggestions.push(
            'Consider INR target range for indication',
            'Check bleeding risk (HAS-BLED score)',
            'Review drug interactions'
          );
          break;
        case 'diabetes':
          suggestions.push(
            'Check recent A1C level',
            'Assess for hypoglycemia risk',
            'Review kidney function for metformin'
          );
          break;
        case 'geriatrics':
          suggestions.push(
            'Consider polypharmacy interactions',
            'Assess fall risk factors',
            'Screen for cognitive impairment'
          );
          break;
      }
    }

    return suggestions;
  }

  // Utility functions
  normalizeText(text) {
    return text.trim().replace(/\s+/g, ' ');
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  createEmptyInterpretation(input) {
    return {
      original: input,
      normalized: '',
      corrected: null,
      typosFound: [],
      context: [],
      intent: { type: 'unknown', confidence: 0 },
      entities: { drugs: [], conditions: [], labValues: [], dosages: [], frequencies: [] },
      expandedAbbreviations: { expanded: null, expansions: [] },
      confidence: 0,
      suggestions: []
    };
  }
}

export default MedicalNLP;