// Comprehensive Drug Interaction Checker
// Evidence-based interaction database with severity levels

export const drugInteractionDatabase = {
  // Major Interactions (Contraindicated)
  major: [
    {
      drugs: ['Warfarin', 'Apixaban'],
      severity: 'Contraindicated',
      mechanism: 'Additive anticoagulation',
      effect: 'Severe bleeding risk',
      management: 'Do not use together',
      evidence: 'High'
    },
    {
      drugs: ['Warfarin', 'Rivaroxaban'],
      severity: 'Contraindicated',
      mechanism: 'Additive anticoagulation',
      effect: 'Severe bleeding risk',
      management: 'Do not use together',
      evidence: 'High'
    },
    {
      drugs: ['Warfarin', 'Dabigatran'],
      severity: 'Contraindicated',
      mechanism: 'Additive anticoagulation',
      effect: 'Severe bleeding risk',
      management: 'Do not use together',
      evidence: 'High'
    },
    {
      drugs: ['ACE Inhibitor', 'ARB'],
      severity: 'Major',
      mechanism: 'Dual RAAS blockade',
      effect: 'Hyperkalemia, hypotension, renal failure',
      management: 'Avoid combination',
      evidence: 'High'
    },
    {
      drugs: ['ACE Inhibitor', 'Aliskiren'],
      severity: 'Contraindicated',
      mechanism: 'Dual RAAS blockade',
      effect: 'Hyperkalemia, hypotension, renal failure',
      management: 'Do not use together in DM or CKD',
      evidence: 'High'
    },
    {
      drugs: ['Spironolactone', 'Eplerenone'],
      severity: 'Major',
      mechanism: 'Additive hyperkalemia',
      effect: 'Severe hyperkalemia',
      management: 'Avoid combination',
      evidence: 'High'
    },
    {
      drugs: ['Verapamil', 'Beta Blocker'],
      severity: 'Major',
      mechanism: 'Additive cardiac depression',
      effect: 'Bradycardia, heart block, hypotension',
      management: 'Use with extreme caution',
      evidence: 'High'
    },
    {
      drugs: ['Diltiazem', 'Beta Blocker'],
      severity: 'Major',
      mechanism: 'Additive cardiac depression',
      effect: 'Bradycardia, AV block',
      management: 'Monitor closely if used',
      evidence: 'High'
    },
    {
      drugs: ['Clarithromycin', 'Simvastatin'],
      severity: 'Contraindicated',
      mechanism: 'CYP3A4 inhibition',
      effect: 'Rhabdomyolysis',
      management: 'Do not use together',
      evidence: 'High'
    },
    {
      drugs: ['Itraconazole', 'Simvastatin'],
      severity: 'Contraindicated',
      mechanism: 'CYP3A4 inhibition',
      effect: 'Rhabdomyolysis',
      management: 'Do not use together',
      evidence: 'High'
    },
    {
      drugs: ['Gemfibrozil', 'Simvastatin'],
      severity: 'Contraindicated',
      mechanism: 'Inhibition of statin metabolism',
      effect: 'Rhabdomyolysis',
      management: 'Do not use together',
      evidence: 'High'
    },
    {
      drugs: ['MAO Inhibitor', 'SSRI'],
      severity: 'Contraindicated',
      mechanism: 'Serotonin syndrome',
      effect: 'Life-threatening serotonin syndrome',
      management: 'Wait 14 days between drugs',
      evidence: 'High'
    },
    {
      drugs: ['MAO Inhibitor', 'Tramadol'],
      severity: 'Contraindicated',
      mechanism: 'Serotonin syndrome',
      effect: 'Seizures, serotonin syndrome',
      management: 'Do not use together',
      evidence: 'High'
    },
    {
      drugs: ['Methotrexate', 'Trimethoprim'],
      severity: 'Contraindicated',
      mechanism: 'Additive antifolate effect',
      effect: 'Bone marrow suppression',
      management: 'Avoid combination',
      evidence: 'High'
    },
    {
      drugs: ['Lithium', 'Thiazide'],
      severity: 'Major',
      mechanism: 'Decreased lithium clearance',
      effect: 'Lithium toxicity',
      management: 'Monitor lithium levels closely',
      evidence: 'High'
    },
    {
      drugs: ['Digoxin', 'Quinidine'],
      severity: 'Major',
      mechanism: 'Reduced digoxin clearance',
      effect: 'Digoxin toxicity',
      management: 'Reduce digoxin dose by 50%',
      evidence: 'High'
    },
    {
      drugs: ['Warfarin', 'NSAIDs'],
      severity: 'Major',
      mechanism: 'Platelet inhibition + anticoagulation',
      effect: 'GI bleeding',
      management: 'Avoid if possible',
      evidence: 'High'
    },
    {
      drugs: ['Clopidogrel', 'Omeprazole'],
      severity: 'Major',
      mechanism: 'CYP2C19 inhibition',
      effect: 'Reduced clopidogrel efficacy',
      management: 'Use pantoprazole instead',
      evidence: 'Moderate'
    },
    {
      drugs: ['Metformin', 'Contrast dye'],
      severity: 'Major',
      mechanism: 'Renal impairment',
      effect: 'Lactic acidosis',
      management: 'Hold metformin 48h',
      evidence: 'High'
    },
    {
      drugs: ['Sildenafil', 'Nitrates'],
      severity: 'Contraindicated',
      mechanism: 'Additive vasodilation',
      effect: 'Severe hypotension',
      management: 'Do not use within 24-48h',
      evidence: 'High'
    }
  ],

  // Moderate Interactions
  moderate: [
    {
      drugs: ['ACE Inhibitor', 'Spironolactone'],
      severity: 'Moderate',
      mechanism: 'Additive hyperkalemia',
      effect: 'Hyperkalemia',
      management: 'Monitor K+ closely',
      evidence: 'High'
    },
    {
      drugs: ['ARB', 'Spironolactone'],
      severity: 'Moderate',
      mechanism: 'Additive hyperkalemia',
      effect: 'Hyperkalemia',
      management: 'Monitor K+ closely',
      evidence: 'High'
    },
    {
      drugs: ['ACE Inhibitor', 'NSAIDs'],
      severity: 'Moderate',
      mechanism: 'Reduced prostaglandin synthesis',
      effect: 'Decreased ACE-I efficacy, renal impairment',
      management: 'Monitor BP and renal function',
      evidence: 'High'
    },
    {
      drugs: ['ARB', 'NSAIDs'],
      severity: 'Moderate',
      mechanism: 'Reduced prostaglandin synthesis',
      effect: 'Decreased ARB efficacy, renal impairment',
      management: 'Monitor BP and renal function',
      evidence: 'High'
    },
    {
      drugs: ['Beta Blocker', 'NSAIDs'],
      severity: 'Moderate',
      mechanism: 'Reduced prostaglandin synthesis',
      effect: 'Decreased antihypertensive effect',
      management: 'Monitor BP',
      evidence: 'Moderate'
    },
    {
      drugs: ['Diuretic', 'NSAIDs'],
      severity: 'Moderate',
      mechanism: 'Reduced prostaglandin synthesis',
      effect: 'Decreased diuretic efficacy',
      management: 'Monitor fluid status',
      evidence: 'High'
    },
    {
      drugs: ['Warfarin', 'Amiodarone'],
      severity: 'Moderate',
      mechanism: 'CYP2C9 inhibition',
      effect: 'Increased INR',
      management: 'Reduce warfarin dose 30-50%',
      evidence: 'High'
    },
    {
      drugs: ['Warfarin', 'Antibiotics'],
      severity: 'Moderate',
      mechanism: 'Gut flora alteration',
      effect: 'Increased INR',
      management: 'Monitor INR closely',
      evidence: 'Moderate'
    },
    {
      drugs: ['Digoxin', 'Amiodarone'],
      severity: 'Moderate',
      mechanism: 'P-gp inhibition',
      effect: 'Digoxin toxicity',
      management: 'Reduce digoxin dose 50%',
      evidence: 'High'
    },
    {
      drugs: ['Digoxin', 'Verapamil'],
      severity: 'Moderate',
      mechanism: 'P-gp inhibition',
      effect: 'Digoxin toxicity',
      management: 'Reduce digoxin dose',
      evidence: 'High'
    },
    {
      drugs: ['Statin', 'Fibrate'],
      severity: 'Moderate',
      mechanism: 'Additive myopathy risk',
      effect: 'Myopathy, rhabdomyolysis',
      management: 'Use fenofibrate, monitor CK',
      evidence: 'High'
    },
    {
      drugs: ['Statin', 'Niacin'],
      severity: 'Moderate',
      mechanism: 'Additive myopathy risk',
      effect: 'Myopathy',
      management: 'Monitor for muscle symptoms',
      evidence: 'Moderate'
    },
    {
      drugs: ['SSRI', 'NSAIDs'],
      severity: 'Moderate',
      mechanism: 'Additive bleeding risk',
      effect: 'GI bleeding',
      management: 'Add PPI if needed',
      evidence: 'Moderate'
    },
    {
      drugs: ['SSRI', 'Tramadol'],
      severity: 'Moderate',
      mechanism: 'Serotonin syndrome',
      effect: 'Serotonin syndrome',
      management: 'Monitor closely',
      evidence: 'Moderate'
    },
    {
      drugs: ['Benzodiazepine', 'Opioid'],
      severity: 'Moderate',
      mechanism: 'Additive CNS depression',
      effect: 'Respiratory depression',
      management: 'Avoid if possible',
      evidence: 'High'
    },
    {
      drugs: ['Antipsychotic', 'Antipsychotic'],
      severity: 'Moderate',
      mechanism: 'QT prolongation',
      effect: 'Torsades de pointes',
      management: 'Monitor ECG',
      evidence: 'High'
    },
    {
      drugs: ['Metformin', 'ACE Inhibitor'],
      severity: 'Moderate',
      mechanism: 'Unclear',
      effect: 'Lactic acidosis (rare)',
      management: 'Monitor in renal impairment',
      evidence: 'Low'
    },
    {
      drugs: ['Sulfonylurea', 'Fluoroquinolone'],
      severity: 'Moderate',
      mechanism: 'Unclear',
      effect: 'Hypoglycemia or hyperglycemia',
      management: 'Monitor glucose',
      evidence: 'Moderate'
    },
    {
      drugs: ['Levothyroxine', 'PPI'],
      severity: 'Moderate',
      mechanism: 'Decreased absorption',
      effect: 'Hypothyroidism',
      management: 'Separate administration',
      evidence: 'Moderate'
    },
    {
      drugs: ['Calcium', 'Levothyroxine'],
      severity: 'Moderate',
      mechanism: 'Decreased absorption',
      effect: 'Reduced levothyroxine effect',
      management: 'Separate by 4 hours',
      evidence: 'High'
    }
  ],

  // Minor Interactions
  minor: [
    {
      drugs: ['Calcium', 'Iron'],
      severity: 'Minor',
      mechanism: 'Competitive absorption',
      effect: 'Reduced iron absorption',
      management: 'Separate administration',
      evidence: 'Moderate'
    },
    {
      drugs: ['Antacid', 'Antibiotics'],
      severity: 'Minor',
      mechanism: 'Chelation',
      effect: 'Reduced antibiotic absorption',
      management: 'Separate by 2 hours',
      evidence: 'High'
    },
    {
      drugs: ['PPI', 'Vitamin B12'],
      severity: 'Minor',
      mechanism: 'Reduced acid',
      effect: 'B12 deficiency with long-term use',
      management: 'Monitor B12 levels',
      evidence: 'Moderate'
    },
    {
      drugs: ['Metformin', 'Vitamin B12'],
      severity: 'Minor',
      mechanism: 'Reduced absorption',
      effect: 'B12 deficiency',
      management: 'Monitor B12 annually',
      evidence: 'High'
    },
    {
      drugs: ['Loop diuretic', 'Thiazide'],
      severity: 'Minor',
      mechanism: 'Additive effect',
      effect: 'Hypokalemia',
      management: 'Monitor electrolytes',
      evidence: 'High'
    },
    {
      drugs: ['Beta Blocker', 'Melatonin'],
      severity: 'Minor',
      mechanism: 'Reduced melatonin metabolism',
      effect: 'Increased drowsiness',
      management: 'Monitor for sedation',
      evidence: 'Low'
    },
    {
      drugs: ['Statin', 'Grapefruit'],
      severity: 'Minor',
      mechanism: 'CYP3A4 inhibition',
      effect: 'Increased statin levels',
      management: 'Limit grapefruit intake',
      evidence: 'Moderate'
    },
    {
      drugs: ['Warfarin', 'Vitamin K foods'],
      severity: 'Minor',
      mechanism: 'Antagonism',
      effect: 'Reduced warfarin effect',
      management: 'Consistent vitamin K intake',
      evidence: 'High'
    },
    {
      drugs: ['MAO Inhibitor', 'Tyramine foods'],
      severity: 'Minor',
      mechanism: 'Tyramine accumulation',
      effect: 'Hypertensive crisis',
      management: 'Avoid aged foods',
      evidence: 'High'
    },
    {
      drugs: ['Bisphosphonate', 'Calcium'],
      severity: 'Minor',
      mechanism: 'Chelation',
      effect: 'Reduced bisphosphonate absorption',
      management: 'Separate by 2 hours',
      evidence: 'High'
    }
  ]
};

// Function to check interactions between multiple drugs
export const checkDrugInteractions = (drugList) => {
  const interactions = [];
  
  // Normalize drug names
  const normalizedDrugs = drugList.map(drug => {
    // Convert to lowercase and remove common suffixes
    const normalized = drug.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/-er|-xr|-sr|-cr|-la/g, '');
    
    // Map to drug classes if needed
    const drugClassMap = {
      'enalapril': 'ACE Inhibitor',
      'lisinopril': 'ACE Inhibitor',
      'ramipril': 'ACE Inhibitor',
      'perindopril': 'ACE Inhibitor',
      'captopril': 'ACE Inhibitor',
      'fosinopril': 'ACE Inhibitor',
      'quinapril': 'ACE Inhibitor',
      'trandolapril': 'ACE Inhibitor',
      'losartan': 'ARB',
      'valsartan': 'ARB',
      'candesartan': 'ARB',
      'irbesartan': 'ARB',
      'telmisartan': 'ARB',
      'olmesartan': 'ARB',
      'azilsartan': 'ARB',
      'bisoprolol': 'Beta Blocker',
      'carvedilol': 'Beta Blocker',
      'metoprolol': 'Beta Blocker',
      'atenolol': 'Beta Blocker',
      'propranolol': 'Beta Blocker',
      'nebivolol': 'Beta Blocker',
      'labetalol': 'Beta Blocker',
      'sotalol': 'Beta Blocker',
      'ibuprofen': 'NSAIDs',
      'naproxen': 'NSAIDs',
      'diclofenac': 'NSAIDs',
      'celecoxib': 'NSAIDs',
      'meloxicam': 'NSAIDs',
      'indomethacin': 'NSAIDs',
      'ketorolac': 'NSAIDs',
      'sertraline': 'SSRI',
      'fluoxetine': 'SSRI',
      'paroxetine': 'SSRI',
      'citalopram': 'SSRI',
      'escitalopram': 'SSRI',
      'fluvoxamine': 'SSRI',
      'simvastatin': 'Statin',
      'atorvastatin': 'Statin',
      'rosuvastatin': 'Statin',
      'pravastatin': 'Statin',
      'lovastatin': 'Statin',
      'fluvastatin': 'Statin',
      'pitavastatin': 'Statin',
      'hydrochlorothiazide': 'Thiazide',
      'chlorthalidone': 'Thiazide',
      'indapamide': 'Thiazide',
      'metolazone': 'Thiazide',
      'furosemide': 'Loop diuretic',
      'torsemide': 'Loop diuretic',
      'bumetanide': 'Loop diuretic',
      'ethacrynic acid': 'Loop diuretic',
      'lorazepam': 'Benzodiazepine',
      'alprazolam': 'Benzodiazepine',
      'diazepam': 'Benzodiazepine',
      'clonazepam': 'Benzodiazepine',
      'temazepam': 'Benzodiazepine',
      'morphine': 'Opioid',
      'oxycodone': 'Opioid',
      'hydrocodone': 'Opioid',
      'fentanyl': 'Opioid',
      'tramadol': 'Opioid',
      'codeine': 'Opioid',
      'haloperidol': 'Antipsychotic',
      'risperidone': 'Antipsychotic',
      'quetiapine': 'Antipsychotic',
      'olanzapine': 'Antipsychotic',
      'aripiprazole': 'Antipsychotic',
      'ziprasidone': 'Antipsychotic',
      'omeprazole': 'PPI',
      'esomeprazole': 'PPI',
      'lansoprazole': 'PPI',
      'pantoprazole': 'PPI',
      'rabeprazole': 'PPI',
      'amoxicillin': 'Antibiotics',
      'azithromycin': 'Antibiotics',
      'ciprofloxacin': 'Antibiotics',
      'levofloxacin': 'Antibiotics',
      'doxycycline': 'Antibiotics',
      'cephalexin': 'Antibiotics',
      'gemfibrozil': 'Fibrate',
      'fenofibrate': 'Fibrate',
      'selegiline': 'MAO Inhibitor',
      'phenelzine': 'MAO Inhibitor',
      'tranylcypromine': 'MAO Inhibitor',
      'isocarboxazid': 'MAO Inhibitor',
      'nitroglycerin': 'Nitrates',
      'isosorbide mononitrate': 'Nitrates',
      'isosorbide dinitrate': 'Nitrates',
      'glipizide': 'Sulfonylurea',
      'glyburide': 'Sulfonylurea',
      'glimepiride': 'Sulfonylurea',
      'gliclazide': 'Sulfonylurea'
    };
    
    return drugClassMap[normalized] || drug;
  });
  
  // Check all severity levels
  ['major', 'moderate', 'minor'].forEach(severity => {
    drugInteractionDatabase[severity].forEach(interaction => {
      const drug1 = interaction.drugs[0].toLowerCase();
      const drug2 = interaction.drugs[1].toLowerCase();
      
      for (let i = 0; i < normalizedDrugs.length; i++) {
        for (let j = i + 1; j < normalizedDrugs.length; j++) {
          const checkDrug1 = normalizedDrugs[i].toLowerCase();
          const checkDrug2 = normalizedDrugs[j].toLowerCase();
          
          if ((checkDrug1.includes(drug1) || drug1.includes(checkDrug1) || checkDrug1 === drug1) &&
              (checkDrug2.includes(drug2) || drug2.includes(checkDrug2) || checkDrug2 === drug2)) {
            interactions.push({
              ...interaction,
              drugs: [drugList[i], drugList[j]],
              originalInteraction: interaction.drugs
            });
          } else if ((checkDrug1.includes(drug2) || drug2.includes(checkDrug1) || checkDrug1 === drug2) &&
                     (checkDrug2.includes(drug1) || drug1.includes(checkDrug2) || checkDrug2 === drug1)) {
            interactions.push({
              ...interaction,
              drugs: [drugList[i], drugList[j]],
              originalInteraction: interaction.drugs
            });
          }
        }
      }
    });
  });
  
  // Sort by severity
  const severityOrder = { 'Contraindicated': 0, 'Major': 1, 'Moderate': 2, 'Minor': 3 };
  interactions.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  
  return interactions;
};

// Function to get interaction details
export const getInteractionDetails = (drug1, drug2) => {
  const allInteractions = [
    ...drugInteractionDatabase.major,
    ...drugInteractionDatabase.moderate,
    ...drugInteractionDatabase.minor
  ];
  
  const normalizedDrug1 = drug1.toLowerCase();
  const normalizedDrug2 = drug2.toLowerCase();
  
  return allInteractions.find(interaction => {
    const intDrug1 = interaction.drugs[0].toLowerCase();
    const intDrug2 = interaction.drugs[1].toLowerCase();
    
    return (
      (normalizedDrug1.includes(intDrug1) && normalizedDrug2.includes(intDrug2)) ||
      (normalizedDrug1.includes(intDrug2) && normalizedDrug2.includes(intDrug1))
    );
  });
};

// Function to get all interactions for a single drug
export const getDrugInteractions = (drug) => {
  const interactions = [];
  const normalizedDrug = drug.toLowerCase();
  
  ['major', 'moderate', 'minor'].forEach(severity => {
    drugInteractionDatabase[severity].forEach(interaction => {
      if (interaction.drugs.some(d => d.toLowerCase().includes(normalizedDrug))) {
        interactions.push({
          ...interaction,
          otherDrug: interaction.drugs.find(d => !d.toLowerCase().includes(normalizedDrug))
        });
      }
    });
  });
  
  return interactions;
};

// Function to check food interactions
export const checkFoodInteractions = (drugList) => {
  const foodInteractions = [];
  
  const foodInteractionMap = {
    'warfarin': {
      food: 'Vitamin K rich foods',
      effect: 'Reduced anticoagulation',
      management: 'Maintain consistent intake'
    },
    'mao inhibitor': {
      food: 'Tyramine-rich foods',
      effect: 'Hypertensive crisis',
      management: 'Avoid aged cheese, wine, cured meats'
    },
    'statin': {
      food: 'Grapefruit juice',
      effect: 'Increased statin levels',
      management: 'Limit to <1 cup/day'
    },
    'bisphosphonate': {
      food: 'Any food',
      effect: 'Reduced absorption',
      management: 'Take on empty stomach'
    },
    'levothyroxine': {
      food: 'Soy, coffee, fiber',
      effect: 'Reduced absorption',
      management: 'Take on empty stomach'
    },
    'tetracycline': {
      food: 'Dairy products',
      effect: 'Reduced absorption',
      management: 'Separate by 2 hours'
    },
    'fluoroquinolone': {
      food: 'Dairy, calcium-fortified foods',
      effect: 'Reduced absorption',
      management: 'Separate by 2 hours'
    },
    'iron': {
      food: 'Tea, coffee, dairy',
      effect: 'Reduced absorption',
      management: 'Take with vitamin C'
    }
  };
  
  drugList.forEach(drug => {
    const normalizedDrug = drug.toLowerCase();
    Object.entries(foodInteractionMap).forEach(([key, interaction]) => {
      if (normalizedDrug.includes(key)) {
        foodInteractions.push({
          drug,
          ...interaction
        });
      }
    });
  });
  
  return foodInteractions;
};

// Function to check supplement interactions
export const checkSupplementInteractions = (drugList) => {
  const supplementInteractions = [];
  
  const supplementMap = {
    'warfarin': [
      { supplement: 'Vitamin E', effect: 'Increased bleeding risk' },
      { supplement: 'Ginkgo', effect: 'Increased bleeding risk' },
      { supplement: 'Garlic', effect: 'Increased bleeding risk' },
      { supplement: 'Ginseng', effect: 'Decreased INR' },
      { supplement: 'St. John\'s Wort', effect: 'Decreased INR' }
    ],
    'ssri': [
      { supplement: 'St. John\'s Wort', effect: 'Serotonin syndrome' },
      { supplement: '5-HTP', effect: 'Serotonin syndrome' },
      { supplement: 'SAMe', effect: 'Serotonin syndrome' }
    ],
    'statin': [
      { supplement: 'Red yeast rice', effect: 'Additive statin effect' },
      { supplement: 'Niacin', effect: 'Myopathy risk' }
    ],
    'digoxin': [
      { supplement: 'Hawthorn', effect: 'Additive cardiac effects' },
      { supplement: 'Licorice', effect: 'Hypokalemia, toxicity' }
    ],
    'immunosuppressant': [
      { supplement: 'Echinacea', effect: 'Reduced efficacy' },
      { supplement: 'Cat\'s claw', effect: 'Immune stimulation' }
    ]
  };
  
  drugList.forEach(drug => {
    const normalizedDrug = drug.toLowerCase();
    Object.entries(supplementMap).forEach(([key, supplements]) => {
      if (normalizedDrug.includes(key)) {
        supplements.forEach(supp => {
          supplementInteractions.push({
            drug,
            ...supp
          });
        });
      }
    });
  });
  
  return supplementInteractions;
};

// Function to generate interaction report
export const generateInteractionReport = (drugList) => {
  const drugInteractions = checkDrugInteractions(drugList);
  const foodInteractions = checkFoodInteractions(drugList);
  const supplementInteractions = checkSupplementInteractions(drugList);
  
  return {
    summary: {
      totalDrugs: drugList.length,
      totalInteractions: drugInteractions.length,
      contraindicated: drugInteractions.filter(i => i.severity === 'Contraindicated').length,
      major: drugInteractions.filter(i => i.severity === 'Major').length,
      moderate: drugInteractions.filter(i => i.severity === 'Moderate').length,
      minor: drugInteractions.filter(i => i.severity === 'Minor').length
    },
    drugInteractions,
    foodInteractions,
    supplementInteractions,
    recommendations: generateRecommendations(drugInteractions)
  };
};

// Helper function to generate recommendations
const generateRecommendations = (interactions) => {
  const recommendations = [];
  
  if (interactions.some(i => i.severity === 'Contraindicated')) {
    recommendations.push({
      priority: 'Urgent',
      action: 'Contact prescriber immediately about contraindicated combinations'
    });
  }
  
  if (interactions.some(i => i.severity === 'Major')) {
    recommendations.push({
      priority: 'High',
      action: 'Review major interactions with healthcare provider'
    });
  }
  
  if (interactions.filter(i => i.mechanism === 'QT prolongation').length >= 2) {
    recommendations.push({
      priority: 'High',
      action: 'Obtain baseline ECG and monitor QTc interval'
    });
  }
  
  if (interactions.some(i => i.effect.includes('hyperkalemia'))) {
    recommendations.push({
      priority: 'Moderate',
      action: 'Monitor potassium levels regularly'
    });
  }
  
  if (interactions.some(i => i.effect.includes('bleeding'))) {
    recommendations.push({
      priority: 'Moderate',
      action: 'Monitor for signs of bleeding, consider PPI prophylaxis'
    });
  }
  
  if (interactions.some(i => i.mechanism.includes('CYP'))) {
    recommendations.push({
      priority: 'Moderate',
      action: 'Consider dose adjustments for CYP-mediated interactions'
    });
  }
  
  return recommendations;
};

export default {
  checkDrugInteractions,
  getInteractionDetails,
  getDrugInteractions,
  checkFoodInteractions,
  checkSupplementInteractions,
  generateInteractionReport
};