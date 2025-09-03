// Comprehensive Drug Database with Synonyms and Hebrew Translations
export const drugDatabase = {
  // Anticoagulants
  'warfarin': {
    brandNames: ['Coumadin', 'Jantoven'],
    hebrew: 'וורפרין',
    hebrewBrand: 'קומדין',
    class: 'anticoagulant',
    synonyms: ['warfarin sodium'],
    interactions: ['aspirin', 'nsaids', 'amiodarone', 'antibiotics', 'antifungals']
  },
  'apixaban': {
    brandNames: ['Eliquis'],
    hebrew: 'אפיקסבן',
    hebrewBrand: 'אליקוויס',
    class: 'anticoagulant',
    synonyms: ['eliquis'],
    interactions: ['aspirin', 'nsaids', 'ketoconazole', 'rifampin']
  },
  'rivaroxaban': {
    brandNames: ['Xarelto'],
    hebrew: 'ריברוקסבן',
    hebrewBrand: 'קסרלטו',
    class: 'anticoagulant',
    synonyms: ['xarelto'],
    interactions: ['aspirin', 'nsaids', 'ketoconazole', 'rifampin']
  },
  'dabigatran': {
    brandNames: ['Pradaxa'],
    hebrew: 'דביגטרן',
    hebrewBrand: 'פרדקסה',
    class: 'anticoagulant',
    synonyms: ['pradaxa'],
    interactions: ['aspirin', 'nsaids', 'dronedarone', 'rifampin']
  },
  'enoxaparin': {
    brandNames: ['Lovenox'],
    hebrew: 'אנוקספרין',
    hebrewBrand: 'קלקסן',
    class: 'anticoagulant',
    synonyms: ['lovenox', 'clexane'],
    interactions: ['aspirin', 'nsaids', 'clopidogrel']
  },

  // Antiplatelets
  'aspirin': {
    brandNames: ['Bayer', 'Ecotrin', 'Bufferin'],
    hebrew: 'אספירין',
    hebrewBrand: 'אספירין',
    class: 'antiplatelet',
    synonyms: ['asa', 'acetylsalicylic acid', 'micropirin'],
    interactions: ['warfarin', 'nsaids', 'ssris', 'corticosteroids']
  },
  'clopidogrel': {
    brandNames: ['Plavix'],
    hebrew: 'קלופידוגרל',
    hebrewBrand: 'פלביקס',
    class: 'antiplatelet',
    synonyms: ['plavix'],
    interactions: ['warfarin', 'aspirin', 'omeprazole', 'nsaids']
  },
  'ticagrelor': {
    brandNames: ['Brilinta', 'Brilique'],
    hebrew: 'טיקגרלור',
    hebrewBrand: 'ברילינטה',
    class: 'antiplatelet',
    synonyms: ['brilinta'],
    interactions: ['aspirin', 'simvastatin', 'digoxin']
  },

  // Beta Blockers
  'metoprolol': {
    brandNames: ['Lopressor', 'Toprol XL'],
    hebrew: 'מטופרולול',
    hebrewBrand: 'לופרסור',
    class: 'beta-blocker',
    synonyms: ['metoprolol tartrate', 'metoprolol succinate'],
    interactions: ['calcium channel blockers', 'digoxin', 'clonidine']
  },
  'bisoprolol': {
    brandNames: ['Zebeta', 'Concor'],
    hebrew: 'ביסופרולול',
    hebrewBrand: 'קונקור',
    class: 'beta-blocker',
    synonyms: ['concor'],
    interactions: ['calcium channel blockers', 'digoxin', 'clonidine']
  },
  'carvedilol': {
    brandNames: ['Coreg'],
    hebrew: 'קרבדילול',
    hebrewBrand: 'דילטרנד',
    class: 'beta-blocker',
    synonyms: ['coreg', 'dilatrend'],
    interactions: ['digoxin', 'insulin', 'rifampin']
  },
  'atenolol': {
    brandNames: ['Tenormin'],
    hebrew: 'אטנולול',
    hebrewBrand: 'נורמיטן',
    class: 'beta-blocker',
    synonyms: ['normalol', 'normiten'],
    interactions: ['calcium channel blockers', 'nsaids']
  },

  // ACE Inhibitors
  'lisinopril': {
    brandNames: ['Prinivil', 'Zestril'],
    hebrew: 'ליזינופריל',
    hebrewBrand: 'פריניביל',
    class: 'ace-inhibitor',
    synonyms: ['zestril'],
    interactions: ['potassium', 'nsaids', 'lithium', 'aliskiren']
  },
  'enalapril': {
    brandNames: ['Vasotec'],
    hebrew: 'אנלפריל',
    hebrewBrand: 'אנלפריל',
    class: 'ace-inhibitor',
    synonyms: ['vasotec', 'enaladex'],
    interactions: ['potassium', 'nsaids', 'lithium']
  },
  'ramipril': {
    brandNames: ['Altace'],
    hebrew: 'רמיפריל',
    hebrewBrand: 'טריטייס',
    class: 'ace-inhibitor',
    synonyms: ['tritace'],
    interactions: ['potassium', 'nsaids', 'lithium']
  },

  // ARBs
  'losartan': {
    brandNames: ['Cozaar'],
    hebrew: 'לוסרטן',
    hebrewBrand: 'אורבסטן',
    class: 'arb',
    synonyms: ['cozaar', 'ocsaar'],
    interactions: ['potassium', 'nsaids', 'lithium']
  },
  'valsartan': {
    brandNames: ['Diovan'],
    hebrew: 'ולסרטן',
    hebrewBrand: 'דיובן',
    class: 'arb',
    synonyms: ['diovan'],
    interactions: ['potassium', 'nsaids', 'lithium']
  },
  'candesartan': {
    brandNames: ['Atacand'],
    hebrew: 'קנדסרטן',
    hebrewBrand: 'אטקנד',
    class: 'arb',
    synonyms: ['atacand'],
    interactions: ['potassium', 'nsaids', 'lithium']
  },

  // Diuretics
  'furosemide': {
    brandNames: ['Lasix'],
    hebrew: 'פורוסמיד',
    hebrewBrand: 'פוסיד',
    class: 'diuretic',
    synonyms: ['lasix', 'fusid'],
    interactions: ['digoxin', 'lithium', 'nsaids', 'aminoglycosides']
  },
  'hydrochlorothiazide': {
    brandNames: ['Microzide'],
    hebrew: 'הידרוכלורותיאזיד',
    hebrewBrand: 'דיסותיאזיד',
    class: 'diuretic',
    synonyms: ['hctz', 'disothiazide'],
    interactions: ['lithium', 'nsaids', 'digoxin']
  },
  'spironolactone': {
    brandNames: ['Aldactone'],
    hebrew: 'ספירונולקטון',
    hebrewBrand: 'אלדקטון',
    class: 'diuretic',
    synonyms: ['aldactone'],
    interactions: ['ace-inhibitors', 'arbs', 'potassium', 'nsaids']
  },

  // Statins
  'atorvastatin': {
    brandNames: ['Lipitor'],
    hebrew: 'אטורבסטטין',
    hebrewBrand: 'ליפיטור',
    class: 'statin',
    synonyms: ['lipitor'],
    interactions: ['fibrates', 'niacin', 'cyclosporine', 'clarithromycin']
  },
  'simvastatin': {
    brandNames: ['Zocor'],
    hebrew: 'סימבסטטין',
    hebrewBrand: 'סימבקור',
    class: 'statin',
    synonyms: ['zocor', 'simvacor'],
    interactions: ['amiodarone', 'diltiazem', 'verapamil', 'grapefruit']
  },
  'rosuvastatin': {
    brandNames: ['Crestor'],
    hebrew: 'רוסובסטטין',
    hebrewBrand: 'קרסטור',
    class: 'statin',
    synonyms: ['crestor'],
    interactions: ['warfarin', 'cyclosporine', 'fibrates']
  },
  'pravastatin': {
    brandNames: ['Pravachol'],
    hebrew: 'פרבסטטין',
    hebrewBrand: 'פרבלול',
    class: 'statin',
    synonyms: ['pravachol', 'pravalol'],
    interactions: ['cyclosporine', 'clarithromycin']
  },

  // Diabetes Medications
  'metformin': {
    brandNames: ['Glucophage'],
    hebrew: 'מטפורמין',
    hebrewBrand: 'גלוקופאז',
    class: 'antidiabetic',
    synonyms: ['glucophage', 'glucomin'],
    interactions: ['contrast dye', 'alcohol', 'cimetidine']
  },
  'insulin-glargine': {
    brandNames: ['Lantus', 'Basaglar'],
    hebrew: 'אינסולין גלרגין',
    hebrewBrand: 'לנטוס',
    class: 'insulin',
    synonyms: ['lantus', 'basaglar', 'toujeo'],
    interactions: ['beta-blockers', 'ace-inhibitors', 'alcohol']
  },
  'insulin-lispro': {
    brandNames: ['Humalog'],
    hebrew: 'אינסולין ליספרו',
    hebrewBrand: 'הומלוג',
    class: 'insulin',
    synonyms: ['humalog'],
    interactions: ['beta-blockers', 'ace-inhibitors', 'alcohol']
  },
  'insulin-aspart': {
    brandNames: ['Novolog', 'NovoRapid'],
    hebrew: 'אינסולין אספרט',
    hebrewBrand: 'נובורפיד',
    class: 'insulin',
    synonyms: ['novolog', 'novorapid'],
    interactions: ['beta-blockers', 'ace-inhibitors', 'alcohol']
  },
  'glipizide': {
    brandNames: ['Glucotrol'],
    hebrew: 'גליפיזיד',
    hebrewBrand: 'גלוקוטרול',
    class: 'sulfonylurea',
    synonyms: ['glucotrol'],
    interactions: ['nsaids', 'beta-blockers', 'fluconazole']
  },
  'glyburide': {
    brandNames: ['Diabeta', 'Glynase'],
    hebrew: 'גליבוריד',
    hebrewBrand: 'דאוניל',
    class: 'sulfonylurea',
    synonyms: ['glibenclamide', 'daonil'],
    interactions: ['nsaids', 'beta-blockers', 'fluconazole']
  },

  // PPIs
  'omeprazole': {
    brandNames: ['Prilosec', 'Losec'],
    hebrew: 'אומפרזול',
    hebrewBrand: 'לוסק',
    class: 'ppi',
    synonyms: ['prilosec', 'losec', 'omepradex'],
    interactions: ['clopidogrel', 'methotrexate', 'digoxin']
  },
  'pantoprazole': {
    brandNames: ['Protonix'],
    hebrew: 'פנטופרזול',
    hebrewBrand: 'קונטרולוק',
    class: 'ppi',
    synonyms: ['protonix', 'controloc'],
    interactions: ['warfarin', 'methotrexate']
  },
  'esomeprazole': {
    brandNames: ['Nexium'],
    hebrew: 'אזומפרזול',
    hebrewBrand: 'נקסיום',
    class: 'ppi',
    synonyms: ['nexium'],
    interactions: ['clopidogrel', 'digoxin']
  },

  // Benzodiazepines
  'lorazepam': {
    brandNames: ['Ativan'],
    hebrew: 'לורזפאם',
    hebrewBrand: 'לוריבן',
    class: 'benzodiazepine',
    synonyms: ['ativan', 'lorivan'],
    interactions: ['opioids', 'alcohol', 'cns-depressants']
  },
  'alprazolam': {
    brandNames: ['Xanax'],
    hebrew: 'אלפרזולם',
    hebrewBrand: 'קסנקס',
    class: 'benzodiazepine',
    synonyms: ['xanax'],
    interactions: ['opioids', 'alcohol', 'ketoconazole']
  },
  'diazepam': {
    brandNames: ['Valium'],
    hebrew: 'דיאזפאם',
    hebrewBrand: 'אסיבל',
    class: 'benzodiazepine',
    synonyms: ['valium', 'assival'],
    interactions: ['opioids', 'alcohol', 'cimetidine']
  },
  'clonazepam': {
    brandNames: ['Klonopin', 'Rivotril'],
    hebrew: 'קלונזפאם',
    hebrewBrand: 'ריבוטריל',
    class: 'benzodiazepine',
    synonyms: ['klonopin', 'rivotril', 'clonex'],
    interactions: ['opioids', 'alcohol', 'cns-depressants']
  },

  // Antidepressants
  'sertraline': {
    brandNames: ['Zoloft'],
    hebrew: 'סרטרלין',
    hebrewBrand: 'זולופט',
    class: 'ssri',
    synonyms: ['zoloft', 'lustral'],
    interactions: ['maois', 'warfarin', 'nsaids', 'tramadol']
  },
  'escitalopram': {
    brandNames: ['Lexapro', 'Cipralex'],
    hebrew: 'אסציטלופרם',
    hebrewBrand: 'ציפרלקס',
    class: 'ssri',
    synonyms: ['lexapro', 'cipralex'],
    interactions: ['maois', 'warfarin', 'nsaids']
  },
  'fluoxetine': {
    brandNames: ['Prozac'],
    hebrew: 'פלואוקסטין',
    hebrewBrand: 'פרוזק',
    class: 'ssri',
    synonyms: ['prozac', 'prizma'],
    interactions: ['maois', 'warfarin', 'nsaids', 'tamoxifen']
  },
  'duloxetine': {
    brandNames: ['Cymbalta'],
    hebrew: 'דולוקסטין',
    hebrewBrand: 'סימבלטה',
    class: 'snri',
    synonyms: ['cymbalta'],
    interactions: ['maois', 'warfarin', 'nsaids', 'ciprofloxacin']
  },

  // Pain Medications
  'tramadol': {
    brandNames: ['Ultram', 'ConZip'],
    hebrew: 'טרמדול',
    hebrewBrand: 'טרמדקס',
    class: 'opioid',
    synonyms: ['ultram', 'tramal', 'tramadex'],
    interactions: ['ssris', 'maois', 'warfarin', 'carbamazepine']
  },
  'oxycodone': {
    brandNames: ['OxyContin', 'Percocet'],
    hebrew: 'אוקסיקודון',
    hebrewBrand: 'אוקסיקונטין',
    class: 'opioid',
    synonyms: ['oxycontin', 'percocet', 'targin'],
    interactions: ['benzodiazepines', 'alcohol', 'cyp3a4-inhibitors']
  },
  'morphine': {
    brandNames: ['MS Contin'],
    hebrew: 'מורפין',
    hebrewBrand: 'מורפין',
    class: 'opioid',
    synonyms: ['ms contin', 'oramorph'],
    interactions: ['benzodiazepines', 'alcohol', 'maois']
  },
  'gabapentin': {
    brandNames: ['Neurontin'],
    hebrew: 'גבפנטין',
    hebrewBrand: 'נוירונטין',
    class: 'anticonvulsant',
    synonyms: ['neurontin'],
    interactions: ['opioids', 'cns-depressants', 'antacids']
  },
  'pregabalin': {
    brandNames: ['Lyrica'],
    hebrew: 'פרגבלין',
    hebrewBrand: 'ליריקה',
    class: 'anticonvulsant',
    synonyms: ['lyrica'],
    interactions: ['opioids', 'lorazepam', 'alcohol']
  },

  // Thyroid
  'levothyroxine': {
    brandNames: ['Synthroid', 'Levoxyl'],
    hebrew: 'לבותירוקסין',
    hebrewBrand: 'אלטרוקסין',
    class: 'thyroid',
    synonyms: ['synthroid', 'eltroxin', 'euthyrox'],
    interactions: ['warfarin', 'iron', 'calcium', 'ppi']
  },

  // Osteoporosis
  'alendronate': {
    brandNames: ['Fosamax'],
    hebrew: 'אלנדרונט',
    hebrewBrand: 'פוסלן',
    class: 'bisphosphonate',
    synonyms: ['fosamax', 'fosalan'],
    interactions: ['calcium', 'nsaids', 'aspirin']
  },
  'risedronate': {
    brandNames: ['Actonel'],
    hebrew: 'ריסדרונט',
    hebrewBrand: 'אקטונל',
    class: 'bisphosphonate',
    synonyms: ['actonel'],
    interactions: ['calcium', 'nsaids', 'aspirin']
  },

  // Alzheimer's
  'donepezil': {
    brandNames: ['Aricept'],
    hebrew: 'דונפזיל',
    hebrewBrand: 'אריספט',
    class: 'cholinesterase-inhibitor',
    synonyms: ['aricept'],
    interactions: ['anticholinergics', 'beta-blockers', 'nsaids']
  },
  'rivastigmine': {
    brandNames: ['Exelon'],
    hebrew: 'ריבסטיגמין',
    hebrewBrand: 'אקסלון',
    class: 'cholinesterase-inhibitor',
    synonyms: ['exelon'],
    interactions: ['anticholinergics', 'beta-blockers', 'metoclopramide']
  },
  'memantine': {
    brandNames: ['Namenda'],
    hebrew: 'ממנטין',
    hebrewBrand: 'אביקסה',
    class: 'nmda-antagonist',
    synonyms: ['namenda', 'ebixa'],
    interactions: ['amantadine', 'dextromethorphan', 'ketamine']
  }
};

// Drug interaction checker
export function checkDrugInteractions(drugList) {
  const interactions = [];
  const normalizedDrugs = drugList.map(d => normalizeDrugName(d));
  
  for (let i = 0; i < normalizedDrugs.length; i++) {
    for (let j = i + 1; j < normalizedDrugs.length; j++) {
      const drug1 = normalizedDrugs[i];
      const drug2 = normalizedDrugs[j];
      
      if (hasInteraction(drug1, drug2)) {
        interactions.push({
          drugs: [drug1, drug2],
          severity: getInteractionSeverity(drug1, drug2),
          description: getInteractionDescription(drug1, drug2)
        });
      }
    }
  }
  
  return interactions;
}

// Normalize drug names (handle brand names, Hebrew names, etc.)
export function normalizeDrugName(drugName) {
  const lower = drugName.toLowerCase().trim();
  
  // Check if it's already a generic name
  if (drugDatabase[lower]) {
    return lower;
  }
  
  // Check brand names and Hebrew names
  for (const [generic, data] of Object.entries(drugDatabase)) {
    if (data.brandNames?.some(brand => brand.toLowerCase() === lower) ||
        data.hebrew === drugName ||
        data.hebrewBrand === drugName ||
        data.synonyms?.some(syn => syn.toLowerCase() === lower)) {
      return generic;
    }
  }
  
  return lower; // Return as-is if not found
}

// Check if two drugs interact
function hasInteraction(drug1, drug2) {
  const data1 = drugDatabase[drug1];
  const data2 = drugDatabase[drug2];
  
  if (!data1 || !data2) return false;
  
  // Check direct interactions
  if (data1.interactions?.includes(drug2) || 
      data1.interactions?.includes(data2.class)) {
    return true;
  }
  
  if (data2.interactions?.includes(drug1) || 
      data2.interactions?.includes(data1.class)) {
    return true;
  }
  
  // Check class-based interactions
  return checkClassInteractions(data1.class, data2.class);
}

// Check for known class interactions
function checkClassInteractions(class1, class2) {
  const criticalPairs = [
    ['anticoagulant', 'antiplatelet'],
    ['anticoagulant', 'nsaid'],
    ['ace-inhibitor', 'arb'],
    ['ace-inhibitor', 'potassium-sparing'],
    ['beta-blocker', 'calcium-channel-blocker'],
    ['ssri', 'maoi'],
    ['ssri', 'antiplatelet'],
    ['benzodiazepine', 'opioid'],
    ['statin', 'fibrate']
  ];
  
  return criticalPairs.some(pair => 
    (pair.includes(class1) && pair.includes(class2))
  );
}

// Get interaction severity
function getInteractionSeverity(drug1, drug2) {
  const data1 = drugDatabase[drug1];
  const data2 = drugDatabase[drug2];
  
  // Critical interactions
  if ((data1?.class === 'anticoagulant' && data2?.class === 'antiplatelet') ||
      (data1?.class === 'benzodiazepine' && data2?.class === 'opioid') ||
      (data1?.class === 'maoi' && data2?.class === 'ssri')) {
    return 'CRITICAL';
  }
  
  // Major interactions
  if ((data1?.class === 'anticoagulant' && drug2 === 'aspirin') ||
      (data1?.class === 'ace-inhibitor' && data2?.class === 'arb')) {
    return 'MAJOR';
  }
  
  return 'MODERATE';
}

// Get interaction description
function getInteractionDescription(drug1, drug2) {
  const data1 = drugDatabase[drug1];
  const data2 = drugDatabase[drug2];
  
  if (data1?.class === 'anticoagulant' && data2?.class === 'antiplatelet') {
    return 'Significantly increased bleeding risk';
  }
  
  if (data1?.class === 'benzodiazepine' && data2?.class === 'opioid') {
    return 'Increased risk of respiratory depression and death';
  }
  
  if (data1?.class === 'ace-inhibitor' && data2?.class === 'arb') {
    return 'Increased risk of hyperkalemia and renal dysfunction';
  }
  
  return 'Potential drug interaction - monitor closely';
}

// Get Hebrew drug name
export function getHebrewName(drugName) {
  const normalized = normalizeDrugName(drugName);
  return drugDatabase[normalized]?.hebrew || drugName;
}

// Get all brand names for a drug
export function getBrandNames(drugName) {
  const normalized = normalizeDrugName(drugName);
  return drugDatabase[normalized]?.brandNames || [];
}

export default drugDatabase;