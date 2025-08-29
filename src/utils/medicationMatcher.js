// Medication Fuzzy Matching System for Typo Tolerance
// Handles common typos and variations in medication names

export const MedicationMatcher = {
  // Common typos and variations for Israeli medications
  variations: {
    'coumadin': ['coumadine', 'cumadin', 'koumadin', 'קומדין', 'קומאדין', 'warfarin'],
    'cardiloc': ['cardioloc', 'kardiloc', 'cardilok', 'קרדילוק'],
    'eliquis': ['eliqis', 'elikuis', 'eliqwis', 'אליקוויס', 'אליקויס', 'apixaban'],
    'plavix': ['plaviks', 'plavics', 'פלביקס', 'פלאביקס', 'clopidogrel'],
    'aspirin': ['asprin', 'aspirine', 'אספירין', 'אספרין', 'micropirin'],
    'lipitor': ['lipitur', 'liptor', 'ליפיטור', 'ליפטור', 'atorvastatin'],
    'norvasc': ['norvasx', 'נורווסק', 'נורבסק', 'amlodipine'],
    'lasix': ['lazix', 'lasiks', 'לזיקס', 'לסיקס', 'furosemide'],
    'fusid': ['fuzid', 'fosid', 'פוסיד', 'פוזיד', 'furosemide'],
    'acamol': ['akamol', 'acamole', 'אקמול', 'אקאמול', 'paracetamol'],
    'metformin': ['metaformin', 'glucophage', 'גלוקופאז', 'מטפורמין'],
    'amlodipine': ['amlodipin', 'norvasc', 'אמלודיפין', 'נורווסק'],
    'omeprazole': ['omeprazol', 'losec', 'לוסק', 'אומפרזול'],
    'simvastatin': ['sinvastatin', 'zocor', 'סימבסטטין'],
    'crestor': ['krestor', 'rosuvastatin', 'קרסטור'],
    'januvia': ['janubia', 'sitagliptin', 'ג׳נוביה'],
    'jardiance': ['jardians', 'empagliflozin', 'ג׳ארדיאנס'],
    'xarelto': ['xarelto', 'rivaroxaban', 'קסרלטו'],
    'pradaxa': ['pradaksa', 'dabigatran', 'פרדקסה'],
    'concor': ['conkor', 'bisoprolol', 'קונקור'],
    'diovan': ['diavan', 'valsartan', 'דיובאן'],
    'tritace': ['tritaise', 'ramipril', 'טריטייס'],
    'adalat': ['adlat', 'nifedipine', 'אדלט'],
    'inspra': ['inspera', 'eplerenone', 'אינספרה'],
    'aldactone': ['aldaktone', 'spironolactone', 'אלדקטון'],
    'lixiana': ['lixana', 'edoxaban', 'ליקסיאנה'],
    'brilinta': ['brillinta', 'ticagrelor', 'ברילינטה'],
    'atacand': ['atkand', 'candesartan', 'אטקנד'],
    'aprovel': ['aproval', 'irbesartan', 'אפרובל'],
    'micardis': ['mikardis', 'telmisartan', 'מיקרדיס'],
    'ocsaar': ['oksar', 'losartan', 'אוקסאר'],
    'coversyl': ['koversyl', 'perindopril', 'קוברסיל'],
    'nebilet': ['nebilat', 'nebivolol', 'נבילט'],
    'dilatrend': ['diltrend', 'carvedilol', 'דילטרנד'],
    'lopresor': ['lopressor', 'metoprolol', 'לופרסור'],
    'natrilix': ['natrilik', 'indapamide', 'נטריליקס'],
    'zanidip': ['zanidep', 'lercanidipine', 'זנידיפ'],
    'adizem': ['adizim', 'diltiazem', 'אדיזם'],
    'ikacor': ['ikkor', 'verapamil', 'איקאקור'],
    'diuver': ['diubar', 'torsemide', 'דיובר'],
    'normalol': ['normallol', 'atenolol', 'נורמלול'],
    'efient': ['efyent', 'prasugrel', 'אפיינט'],
    'persantine': ['persantin', 'dipyridamole', 'פרסנטין']
  },
  
  // Hebrew to English mapping for reverse lookup
  hebrewToEnglish: {
    'קומדין': 'coumadin',
    'אליקויס': 'eliquis', 
    'פלביקס': 'plavix',
    'נורווסק': 'norvasc',
    'פוסיד': 'fusid',
    'אקמול': 'acamol',
    'גלוקופאז': 'metformin',
    'לוסק': 'omeprazole',
    'קרסטור': 'crestor',
    'ג׳נוביה': 'januvia',
    'קסרלטו': 'xarelto',
    'פרדקסה': 'pradaxa',
    'קונקור': 'concor',
    'דיובאן': 'diovan',
    'טריטייס': 'tritace',
    'אדלט': 'adalat',
    'אינספרה': 'inspra',
    'אלדקטון': 'aldactone',
    'ליקסיאנה': 'lixiana',
    'ברילינטה': 'brilinta',
    'אטקנד': 'atacand',
    'אפרובל': 'aprovel',
    'מיקרדיס': 'micardis',
    'אוקסאר': 'ocsaar',
    'קוברסיל': 'coversyl',
    'נבילט': 'nebilet',
    'דילטרנד': 'dilatrend',
    'לופרסור': 'lopresor',
    'נטריליקס': 'natrilix',
    'זנידיפ': 'zanidip',
    'אדיזם': 'adizem',
    'איקאקור': 'ikacor',
    'דיובר': 'diuver',
    'נורמלול': 'normalol',
    'אפיינט': 'efient',
    'פרסנטין': 'persantine'
  },
  
  // Levenshtein distance algorithm for fuzzy string matching
  levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix = [];
    
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  },
  
  // Calculate similarity score (0-1, where 1 is identical)
  similarity(a, b) {
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    const editDistance = this.levenshtein(longer, shorter);
    if (longer.length === 0) return 1.0;
    return (longer.length - editDistance) / longer.length;
  },
  
  // Main matching function
  findMedication(input, medications) {
    if (!input || !medications) return null;
    
    const normalized = input.toLowerCase().trim();
    
    // Step 1: Check exact match first
    for (const med of medications) {
      if (med.name && med.name.toLowerCase() === normalized) return med;
      if (med.heName && med.heName === input.trim()) return med;
      if (med.israeliBrand && med.israeliBrand.includes(input.trim())) return med;
      if (med.brand && med.brand.toLowerCase().includes(normalized)) return med;
    }
    
    // Step 2: Check known variations
    for (const [correct, typos] of Object.entries(this.variations)) {
      if (typos.includes(normalized) || typos.includes(input.trim())) {
        // Find medication with this correct name
        for (const med of medications) {
          if (med.name && med.name.toLowerCase() === correct) return med;
          if (med.brand && med.brand.toLowerCase().includes(correct)) return med;
          if (med.israeliBrand && med.israeliBrand.includes(correct)) return med;
        }
      }
    }
    
    // Step 3: Check Hebrew to English mapping
    if (this.hebrewToEnglish[input.trim()]) {
      const englishName = this.hebrewToEnglish[input.trim()];
      for (const med of medications) {
        if (med.name && med.name.toLowerCase() === englishName) return med;
        if (med.brand && med.brand.toLowerCase().includes(englishName)) return med;
      }
    }
    
    // Step 4: Fuzzy matching with similarity threshold
    let bestMatch = null;
    let bestScore = 0.6; // Minimum 60% similarity
    
    for (const med of medications) {
      // Check medication name
      if (med.name) {
        const score = this.similarity(normalized, med.name.toLowerCase());
        if (score > bestScore) {
          bestScore = score;
          bestMatch = med;
        }
      }
      
      // Check brand name
      if (med.brand) {
        const brandParts = med.brand.toLowerCase().split(' / ');
        for (const brand of brandParts) {
          const score = this.similarity(normalized, brand);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = med;
          }
        }
      }
      
      // Check Israeli brand
      if (med.israeliBrand) {
        const score = this.similarity(input.trim(), med.israeliBrand);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = med;
        }
      }
      
      // Check Hebrew name
      if (med.heName) {
        const score = this.similarity(input.trim(), med.heName);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = med;
        }
      }
    }
    
    return bestMatch;
  },
  
  // Search with multiple results and confidence scores
  searchMedications(input, medications, maxResults = 5) {
    if (!input || !medications) return [];
    
    const results = [];
    const normalized = input.toLowerCase().trim();
    
    for (const med of medications) {
      let bestScore = 0;
      let matchType = '';
      
      // Exact matches get highest score
      if (med.name && med.name.toLowerCase() === normalized) {
        bestScore = 1.0;
        matchType = 'name_exact';
      } else if (med.heName && med.heName === input.trim()) {
        bestScore = 1.0;
        matchType = 'hebrew_exact';
      } else if (med.israeliBrand && med.israeliBrand === input.trim()) {
        bestScore = 1.0;
        matchType = 'brand_exact';
      } else {
        // Fuzzy matches
        if (med.name) {
          const score = this.similarity(normalized, med.name.toLowerCase());
          if (score > bestScore) {
            bestScore = score;
            matchType = 'name_fuzzy';
          }
        }
        
        if (med.brand) {
          const brandParts = med.brand.toLowerCase().split(' / ');
          for (const brand of brandParts) {
            const score = this.similarity(normalized, brand);
            if (score > bestScore) {
              bestScore = score;
              matchType = 'brand_fuzzy';
            }
          }
        }
        
        if (med.israeliBrand) {
          const score = this.similarity(input.trim(), med.israeliBrand);
          if (score > bestScore) {
            bestScore = score;
            matchType = 'israeli_brand_fuzzy';
          }
        }
        
        if (med.heName) {
          const score = this.similarity(input.trim(), med.heName);
          if (score > bestScore) {
            bestScore = score;
            matchType = 'hebrew_fuzzy';
          }
        }
      }
      
      // Check variations
      for (const [correct, typos] of Object.entries(this.variations)) {
        if (typos.includes(normalized) || typos.includes(input.trim())) {
          if (med.name && med.name.toLowerCase().includes(correct)) {
            bestScore = Math.max(bestScore, 0.95);
            matchType = 'variation_match';
          }
        }
      }
      
      if (bestScore >= 0.5) { // Minimum 50% similarity for inclusion
        results.push({
          medication: med,
          score: bestScore,
          matchType: matchType,
          confidence: bestScore >= 0.9 ? 'high' : bestScore >= 0.7 ? 'medium' : 'low'
        });
      }
    }
    
    // Sort by score descending and return top results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  },
  
  // Get suggestions for partial input
  getSuggestions(input, medications, maxSuggestions = 10) {
    if (!input || input.length < 2) return [];
    
    const suggestions = [];
    const normalized = input.toLowerCase().trim();
    
    for (const med of medications) {
      let suggestionScore = 0;
      
      // Starts with matching gets high score
      if (med.name && med.name.toLowerCase().startsWith(normalized)) {
        suggestionScore = 0.9;
      } else if (med.brand && med.brand.toLowerCase().includes(normalized)) {
        suggestionScore = 0.8;
      } else if (med.israeliBrand && med.israeliBrand.includes(input.trim())) {
        suggestionScore = 0.8;
      } else if (med.heName && med.heName.includes(input.trim())) {
        suggestionScore = 0.8;
      } else if (med.name && med.name.toLowerCase().includes(normalized)) {
        suggestionScore = 0.7;
      }
      
      if (suggestionScore > 0) {
        suggestions.push({
          medication: med,
          score: suggestionScore,
          displayName: `${med.name} (${med.israeliBrand || med.brand})`
        });
      }
    }
    
    return suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSuggestions);
  }
};

export default MedicationMatcher;