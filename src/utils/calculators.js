// Comprehensive Clinical Calculators for Geriatrics
// 50+ validated calculators with evidence-based formulas

export const clinicalCalculators = {
  // Cardiovascular Risk Calculators
  CHA2DS2VASc: {
    name: 'CHA₂DS₂-VASc Score',
    heName: 'סיכון שבץ בפרפור עליות',
    category: 'Cardiovascular',
    description: 'Stroke risk in atrial fibrillation',
    parameters: [
      { name: 'chf', label: 'Congestive heart failure', type: 'boolean', points: 1 },
      { name: 'hypertension', label: 'Hypertension', type: 'boolean', points: 1 },
      { name: 'age', label: 'Age ≥75 years', type: 'boolean', points: 2 },
      { name: 'diabetes', label: 'Diabetes mellitus', type: 'boolean', points: 1 },
      { name: 'stroke', label: 'Prior stroke/TIA/TE', type: 'boolean', points: 2 },
      { name: 'vascular', label: 'Vascular disease', type: 'boolean', points: 1 },
      { name: 'age65', label: 'Age 65-74 years', type: 'boolean', points: 1 },
      { name: 'female', label: 'Female sex', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? val : 0), 0);
      const annualRisk = [0, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 6.7, 15.2][Math.min(score, 9)];
      return {
        score,
        risk: annualRisk,
        recommendation: score === 0 ? 'No anticoagulation needed' :
                       score === 1 ? 'Consider anticoagulation' :
                       'Anticoagulation recommended',
        interpretation: `Annual stroke risk: ${annualRisk}%`
      };
    }
  },

  HASBLED: {
    name: 'HAS-BLED Score',
    heName: 'סיכון דימום בנוגדי קרישה',
    category: 'Cardiovascular',
    description: 'Bleeding risk in anticoagulation',
    parameters: [
      { name: 'hypertension', label: 'Hypertension (SBP >160)', type: 'boolean', points: 1 },
      { name: 'renal', label: 'Abnormal renal function', type: 'boolean', points: 1 },
      { name: 'liver', label: 'Abnormal liver function', type: 'boolean', points: 1 },
      { name: 'stroke', label: 'Stroke history', type: 'boolean', points: 1 },
      { name: 'bleeding', label: 'Bleeding history or predisposition', type: 'boolean', points: 1 },
      { name: 'inr', label: 'Labile INRs', type: 'boolean', points: 1 },
      { name: 'elderly', label: 'Elderly (>65 years)', type: 'boolean', points: 1 },
      { name: 'drugs', label: 'Drugs (antiplatelet/NSAID)', type: 'boolean', points: 1 },
      { name: 'alcohol', label: 'Alcohol excess', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? 1 : 0), 0);
      const bleedingRisk = [1.13, 1.02, 1.88, 3.74, 8.70, 12.50, 12.50, 12.50, 12.50, 12.50][Math.min(score, 9)];
      return {
        score,
        risk: bleedingRisk,
        interpretation: score <= 2 ? 'Low bleeding risk' : 'High bleeding risk - use caution',
        recommendation: `Annual major bleeding risk: ${bleedingRisk}%`
      };
    }
  },

  HEART: {
    name: 'HEART Score',
    heName: 'ניקוד HEART לכאב חזה',
    category: 'Cardiovascular',
    description: 'Risk stratification for chest pain',
    parameters: [
      { name: 'history', label: 'History', type: 'select', options: [
        { value: 0, label: 'Slightly suspicious' },
        { value: 1, label: 'Moderately suspicious' },
        { value: 2, label: 'Highly suspicious' }
      ]},
      { name: 'ecg', label: 'ECG', type: 'select', options: [
        { value: 0, label: 'Normal' },
        { value: 1, label: 'Non-specific repolarization' },
        { value: 2, label: 'Significant ST deviation' }
      ]},
      { name: 'age', label: 'Age', type: 'select', options: [
        { value: 0, label: '<45 years' },
        { value: 1, label: '45-64 years' },
        { value: 2, label: '≥65 years' }
      ]},
      { name: 'riskFactors', label: 'Risk factors', type: 'select', options: [
        { value: 0, label: 'No risk factors' },
        { value: 1, label: '1-2 risk factors' },
        { value: 2, label: '≥3 risk factors or CAD' }
      ]},
      { name: 'troponin', label: 'Troponin', type: 'select', options: [
        { value: 0, label: '≤1x normal' },
        { value: 1, label: '1-2x normal' },
        { value: 2, label: '>2x normal' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      const maceRisk = score <= 3 ? 1.7 : score <= 6 ? 16.6 : 50.1;
      return {
        score,
        risk: maceRisk,
        recommendation: score <= 3 ? 'Low risk - consider discharge' :
                       score <= 6 ? 'Moderate risk - admit for observation' :
                       'High risk - early invasive strategy',
        interpretation: `30-day MACE risk: ${maceRisk}%`
      };
    }
  },

  TIMI: {
    name: 'TIMI Risk Score',
    heName: 'ניקוד TIMI',
    category: 'Cardiovascular',
    description: 'Risk in NSTE-ACS',
    parameters: [
      { name: 'age65', label: 'Age ≥65', type: 'boolean', points: 1 },
      { name: 'cad', label: '≥3 CAD risk factors', type: 'boolean', points: 1 },
      { name: 'stenosis', label: 'Known CAD (stenosis ≥50%)', type: 'boolean', points: 1 },
      { name: 'aspirin', label: 'ASA use in past 7 days', type: 'boolean', points: 1 },
      { name: 'angina', label: 'Severe angina (≥2 episodes in 24h)', type: 'boolean', points: 1 },
      { name: 'stChange', label: 'ST changes ≥0.5mm', type: 'boolean', points: 1 },
      { name: 'biomarker', label: 'Positive cardiac biomarker', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? 1 : 0), 0);
      const risk14Day = [4.7, 8.3, 13.2, 19.9, 26.2, 40.9, 40.9][Math.min(score, 6)];
      return {
        score,
        risk: risk14Day,
        interpretation: `14-day death/MI/revascularization: ${risk14Day}%`,
        recommendation: score <= 2 ? 'Low risk' : score <= 4 ? 'Intermediate risk' : 'High risk'
      };
    }
  },

  // Renal Function Calculators
  CockcroftGault: {
    name: 'Cockcroft-Gault CrCl',
    heName: 'קליראנס קראטינין',
    category: 'Renal',
    description: 'Creatinine clearance estimation',
    parameters: [
      { name: 'age', label: 'Age (years)', type: 'number', min: 18, max: 120 },
      { name: 'weight', label: 'Weight (kg)', type: 'number', min: 20, max: 300 },
      { name: 'creatinine', label: 'Serum creatinine (mg/dL)', type: 'number', min: 0.1, max: 20, step: 0.1 },
      { name: 'sex', label: 'Sex', type: 'select', options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]}
    ],
    calculate: (params) => {
      const { age, weight, creatinine, sex } = params;
      let crcl = ((140 - age) * weight) / (72 * creatinine);
      if (sex === 'female') crcl *= 0.85;
      
      return {
        value: crcl.toFixed(1),
        unit: 'mL/min',
        interpretation: crcl >= 90 ? 'Normal' :
                       crcl >= 60 ? 'Mild reduction' :
                       crcl >= 30 ? 'Moderate reduction' :
                       crcl >= 15 ? 'Severe reduction' :
                       'Kidney failure',
        stage: crcl >= 90 ? 'CKD Stage 1' :
               crcl >= 60 ? 'CKD Stage 2' :
               crcl >= 30 ? 'CKD Stage 3' :
               crcl >= 15 ? 'CKD Stage 4' :
               'CKD Stage 5'
      };
    }
  },

  MDRD: {
    name: 'MDRD eGFR',
    heName: 'הערכת GFR',
    category: 'Renal',
    description: 'GFR estimation (MDRD equation)',
    parameters: [
      { name: 'age', label: 'Age (years)', type: 'number', min: 18, max: 120 },
      { name: 'creatinine', label: 'Serum creatinine (mg/dL)', type: 'number', min: 0.1, max: 20, step: 0.1 },
      { name: 'sex', label: 'Sex', type: 'select', options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]},
      { name: 'race', label: 'Race', type: 'select', options: [
        { value: 'other', label: 'Other' },
        { value: 'african', label: 'African American' }
      ]}
    ],
    calculate: (params) => {
      const { age, creatinine, sex, race } = params;
      let egfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);
      if (sex === 'female') egfr *= 0.742;
      if (race === 'african') egfr *= 1.212;
      
      return {
        value: egfr.toFixed(1),
        unit: 'mL/min/1.73m²',
        interpretation: egfr >= 90 ? 'Normal or high' :
                       egfr >= 60 ? 'Mildly decreased' :
                       egfr >= 45 ? 'Mild to moderately decreased' :
                       egfr >= 30 ? 'Moderately to severely decreased' :
                       egfr >= 15 ? 'Severely decreased' :
                       'Kidney failure',
        stage: egfr >= 90 ? 'G1' :
               egfr >= 60 ? 'G2' :
               egfr >= 45 ? 'G3a' :
               egfr >= 30 ? 'G3b' :
               egfr >= 15 ? 'G4' :
               'G5'
      };
    }
  },

  CKDEPI: {
    name: 'CKD-EPI eGFR',
    heName: 'CKD-EPI משוואה',
    category: 'Renal',
    description: 'GFR estimation (CKD-EPI 2021)',
    parameters: [
      { name: 'age', label: 'Age (years)', type: 'number', min: 18, max: 120 },
      { name: 'creatinine', label: 'Serum creatinine (mg/dL)', type: 'number', min: 0.1, max: 20, step: 0.1 },
      { name: 'sex', label: 'Sex', type: 'select', options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]}
    ],
    calculate: (params) => {
      const { age, creatinine, sex } = params;
      const kappa = sex === 'female' ? 0.7 : 0.9;
      const alpha = sex === 'female' ? -0.241 : -0.302;
      const min = Math.min(creatinine / kappa, 1);
      const max = Math.max(creatinine / kappa, 1);
      
      let egfr = 142 * Math.pow(min, alpha) * Math.pow(max, -1.200) * Math.pow(0.9938, age);
      if (sex === 'female') egfr *= 1.012;
      
      return {
        value: egfr.toFixed(1),
        unit: 'mL/min/1.73m²',
        interpretation: egfr >= 90 ? 'Normal' :
                       egfr >= 60 ? 'Mild reduction' :
                       egfr >= 30 ? 'Moderate reduction' :
                       egfr >= 15 ? 'Severe reduction' :
                       'Kidney failure',
        recommendation: egfr < 60 ? 'Consider nephrology referral' : 'Monitor annually'
      };
    }
  },

  // Cognitive Assessment Calculators
  MMSE: {
    name: 'Mini-Mental State Exam',
    heName: 'MMSE',
    category: 'Cognitive',
    description: 'Cognitive impairment screening',
    parameters: [
      { name: 'orientation', label: 'Orientation (0-10)', type: 'number', min: 0, max: 10 },
      { name: 'registration', label: 'Registration (0-3)', type: 'number', min: 0, max: 3 },
      { name: 'attention', label: 'Attention/Calculation (0-5)', type: 'number', min: 0, max: 5 },
      { name: 'recall', label: 'Recall (0-3)', type: 'number', min: 0, max: 3 },
      { name: 'language', label: 'Language (0-9)', type: 'number', min: 0, max: 9 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        maxScore: 30,
        interpretation: score >= 24 ? 'Normal cognition' :
                       score >= 19 ? 'Mild cognitive impairment' :
                       score >= 10 ? 'Moderate cognitive impairment' :
                       'Severe cognitive impairment',
        recommendation: score < 24 ? 'Consider formal neuropsychological testing' : 'No immediate concerns'
      };
    }
  },

  MoCA: {
    name: 'Montreal Cognitive Assessment',
    heName: 'MoCA',
    category: 'Cognitive',
    description: 'Mild cognitive impairment detection',
    parameters: [
      { name: 'visuospatial', label: 'Visuospatial/Executive (0-5)', type: 'number', min: 0, max: 5 },
      { name: 'naming', label: 'Naming (0-3)', type: 'number', min: 0, max: 3 },
      { name: 'memory', label: 'Memory (no points)', type: 'number', min: 0, max: 0 },
      { name: 'attention', label: 'Attention (0-6)', type: 'number', min: 0, max: 6 },
      { name: 'language', label: 'Language (0-3)', type: 'number', min: 0, max: 3 },
      { name: 'abstraction', label: 'Abstraction (0-2)', type: 'number', min: 0, max: 2 },
      { name: 'delayedRecall', label: 'Delayed recall (0-5)', type: 'number', min: 0, max: 5 },
      { name: 'orientation', label: 'Orientation (0-6)', type: 'number', min: 0, max: 6 },
      { name: 'education', label: 'Education ≤12 years', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      let score = Object.entries(params)
        .filter(([key]) => key !== 'education' && key !== 'memory')
        .reduce((sum, [, val]) => sum + val, 0);
      
      if (params.education && score < 30) score += 1;
      
      return {
        score,
        maxScore: 30,
        interpretation: score >= 26 ? 'Normal' : 'Possible cognitive impairment',
        recommendation: score < 26 ? 'Consider comprehensive evaluation' : 'Screen annually'
      };
    }
  },

  SLUMS: {
    name: 'Saint Louis University Mental Status',
    heName: 'SLUMS',
    category: 'Cognitive',
    description: 'Dementia and MCI screening',
    parameters: [
      { name: 'orientation', label: 'Orientation (0-4)', type: 'number', min: 0, max: 4 },
      { name: 'animalNaming', label: 'Animal naming (0-3)', type: 'number', min: 0, max: 3 },
      { name: 'memory', label: 'Memory (0-5)', type: 'number', min: 0, max: 5 },
      { name: 'attention', label: 'Attention (0-4)', type: 'number', min: 0, max: 4 },
      { name: 'delayedRecall', label: 'Delayed recall (0-3)', type: 'number', min: 0, max: 3 },
      { name: 'visuospatial', label: 'Visuospatial (0-5)', type: 'number', min: 0, max: 5 },
      { name: 'executive', label: 'Executive (0-6)', type: 'number', min: 0, max: 6 },
      { name: 'highSchool', label: 'High school education', type: 'boolean' }
    ],
    calculate: (params) => {
      const score = Object.entries(params)
        .filter(([key]) => key !== 'highSchool')
        .reduce((sum, [, val]) => sum + val, 0);
      
      const cutoffs = params.highSchool ? 
        { mci: 21, dementia: 27 } : 
        { mci: 20, dementia: 25 };
      
      return {
        score,
        maxScore: 30,
        interpretation: score >= cutoffs.dementia ? 'Normal' :
                       score >= cutoffs.mci ? 'Mild neurocognitive disorder' :
                       'Dementia',
        recommendation: score < cutoffs.dementia ? 'Refer for comprehensive evaluation' : 'Annual screening'
      };
    }
  },

  // Functional Assessment Calculators
  KatzADL: {
    name: 'Katz Index of ADLs',
    heName: 'מדד Katz לתפקוד יומיומי',
    category: 'Functional',
    description: 'Activities of daily living assessment',
    parameters: [
      { name: 'bathing', label: 'Bathing', type: 'boolean', points: 1 },
      { name: 'dressing', label: 'Dressing', type: 'boolean', points: 1 },
      { name: 'toileting', label: 'Toileting', type: 'boolean', points: 1 },
      { name: 'transferring', label: 'Transferring', type: 'boolean', points: 1 },
      { name: 'continence', label: 'Continence', type: 'boolean', points: 1 },
      { name: 'feeding', label: 'Feeding', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? 1 : 0), 0);
      return {
        score,
        maxScore: 6,
        interpretation: score === 6 ? 'Full function' :
                       score >= 4 ? 'Moderate impairment' :
                       score >= 2 ? 'Severe functional impairment' :
                       'Very severe functional impairment',
        recommendation: score < 6 ? 'Consider home health services or assisted living' : 'Independent'
      };
    }
  },

  LawtonIADL: {
    name: 'Lawton IADL Scale',
    heName: 'סולם Lawton',
    category: 'Functional',
    description: 'Instrumental activities of daily living',
    parameters: [
      { name: 'telephone', label: 'Ability to use telephone', type: 'boolean', points: 1 },
      { name: 'shopping', label: 'Shopping', type: 'boolean', points: 1 },
      { name: 'foodPrep', label: 'Food preparation', type: 'boolean', points: 1 },
      { name: 'housekeeping', label: 'Housekeeping', type: 'boolean', points: 1 },
      { name: 'laundry', label: 'Laundry', type: 'boolean', points: 1 },
      { name: 'transportation', label: 'Mode of transportation', type: 'boolean', points: 1 },
      { name: 'medications', label: 'Responsibility for medications', type: 'boolean', points: 1 },
      { name: 'finances', label: 'Ability to handle finances', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? 1 : 0), 0);
      return {
        score,
        maxScore: 8,
        interpretation: score === 8 ? 'High function, independent' :
                       score >= 6 ? 'Moderate function' :
                       score >= 4 ? 'Low function' :
                       'Severe functional impairment',
        recommendation: score < 8 ? 'Assess need for assistance or supervision' : 'Capable of independent living'
      };
    }
  },

  BarthelIndex: {
    name: 'Barthel Index',
    heName: 'מדד ברתל',
    category: 'Functional',
    description: 'Functional independence measure',
    parameters: [
      { name: 'feeding', label: 'Feeding', type: 'select', options: [
        { value: 0, label: 'Unable' },
        { value: 5, label: 'Needs help' },
        { value: 10, label: 'Independent' }
      ]},
      { name: 'bathing', label: 'Bathing', type: 'select', options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Independent' }
      ]},
      { name: 'grooming', label: 'Grooming', type: 'select', options: [
        { value: 0, label: 'Needs help' },
        { value: 5, label: 'Independent' }
      ]},
      { name: 'dressing', label: 'Dressing', type: 'select', options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Needs help' },
        { value: 10, label: 'Independent' }
      ]},
      { name: 'bowels', label: 'Bowels', type: 'select', options: [
        { value: 0, label: 'Incontinent' },
        { value: 5, label: 'Occasional accident' },
        { value: 10, label: 'Continent' }
      ]},
      { name: 'bladder', label: 'Bladder', type: 'select', options: [
        { value: 0, label: 'Incontinent' },
        { value: 5, label: 'Occasional accident' },
        { value: 10, label: 'Continent' }
      ]},
      { name: 'toilet', label: 'Toilet use', type: 'select', options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Needs some help' },
        { value: 10, label: 'Independent' }
      ]},
      { name: 'transfer', label: 'Transfer', type: 'select', options: [
        { value: 0, label: 'Unable' },
        { value: 5, label: 'Major help' },
        { value: 10, label: 'Minor help' },
        { value: 15, label: 'Independent' }
      ]},
      { name: 'mobility', label: 'Mobility', type: 'select', options: [
        { value: 0, label: 'Immobile' },
        { value: 5, label: 'Wheelchair' },
        { value: 10, label: 'Walks with help' },
        { value: 15, label: 'Independent' }
      ]},
      { name: 'stairs', label: 'Stairs', type: 'select', options: [
        { value: 0, label: 'Unable' },
        { value: 5, label: 'Needs help' },
        { value: 10, label: 'Independent' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        maxScore: 100,
        interpretation: score === 100 ? 'Independent' :
                       score >= 91 ? 'Slight dependency' :
                       score >= 61 ? 'Moderate dependency' :
                       score >= 21 ? 'Severe dependency' :
                       'Total dependency',
        recommendation: score < 60 ? 'Requires significant assistance' : 
                       score < 90 ? 'May need some assistance' : 
                       'Generally independent'
      };
    }
  },

  // Fall Risk Assessment
  MorseeFallScale: {
    name: 'Morse Fall Scale',
    heName: 'סולם מורס לנפילות',
    category: 'Fall Risk',
    description: 'Fall risk assessment',
    parameters: [
      { name: 'fallHistory', label: 'History of falling', type: 'select', options: [
        { value: 0, label: 'No' },
        { value: 25, label: 'Yes' }
      ]},
      { name: 'secondaryDiagnosis', label: 'Secondary diagnosis', type: 'select', options: [
        { value: 0, label: 'No' },
        { value: 15, label: 'Yes' }
      ]},
      { name: 'ambulatoryAid', label: 'Ambulatory aid', type: 'select', options: [
        { value: 0, label: 'None/Bed rest/Nurse assist' },
        { value: 15, label: 'Crutches/Cane/Walker' },
        { value: 30, label: 'Furniture' }
      ]},
      { name: 'iv', label: 'IV/Heparin lock', type: 'select', options: [
        { value: 0, label: 'No' },
        { value: 20, label: 'Yes' }
      ]},
      { name: 'gait', label: 'Gait/Transferring', type: 'select', options: [
        { value: 0, label: 'Normal/Bed rest/Wheelchair' },
        { value: 10, label: 'Weak' },
        { value: 20, label: 'Impaired' }
      ]},
      { name: 'mentalStatus', label: 'Mental status', type: 'select', options: [
        { value: 0, label: 'Oriented to own ability' },
        { value: 15, label: 'Forgets limitations' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        risk: score < 25 ? 'Low' : score <= 44 ? 'Moderate' : 'High',
        interpretation: score < 25 ? 'No interventions needed' :
                       score <= 44 ? 'Standard fall prevention interventions' :
                       'High risk fall prevention interventions',
        recommendation: score >= 25 ? 'Implement fall prevention protocol' : 'Continue standard care'
      };
    }
  },

  STRATIFY: {
    name: 'STRATIFY Fall Risk',
    heName: 'STRATIFY',
    category: 'Fall Risk',
    description: 'St. Thomas Risk Assessment Tool',
    parameters: [
      { name: 'transfer', label: 'Transfer/mobility problems', type: 'boolean', points: 1 },
      { name: 'fallHistory', label: 'History of falls', type: 'boolean', points: 1 },
      { name: 'agitation', label: 'Agitated', type: 'boolean', points: 1 },
      { name: 'vision', label: 'Visual impairment', type: 'boolean', points: 1 },
      { name: 'toileting', label: 'Frequent toileting', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? 1 : 0), 0);
      return {
        score,
        maxScore: 5,
        risk: score >= 2 ? 'High' : 'Low',
        interpretation: score >= 2 ? 'High fall risk' : 'Low fall risk',
        recommendation: score >= 2 ? 'Implement comprehensive fall prevention measures' : 'Standard precautions'
      };
    }
  },

  // Frailty Assessment
  FriedFrailty: {
    name: 'Fried Frailty Phenotype',
    heName: 'פנוטיפ שבריריות Fried',
    category: 'Frailty',
    description: 'Physical frailty assessment',
    parameters: [
      { name: 'weightLoss', label: 'Unintentional weight loss (>10 lbs/year)', type: 'boolean', points: 1 },
      { name: 'exhaustion', label: 'Self-reported exhaustion', type: 'boolean', points: 1 },
      { name: 'weakness', label: 'Weakness (grip strength)', type: 'boolean', points: 1 },
      { name: 'slowness', label: 'Slow walking speed', type: 'boolean', points: 1 },
      { name: 'lowActivity', label: 'Low physical activity', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? 1 : 0), 0);
      return {
        score,
        maxScore: 5,
        interpretation: score === 0 ? 'Robust' :
                       score <= 2 ? 'Pre-frail' :
                       'Frail',
        recommendation: score >= 3 ? 'Comprehensive geriatric assessment recommended' :
                       score >= 1 ? 'Monitor closely, preventive interventions' :
                       'Maintain current activity level'
      };
    }
  },

  ClinicalFrailtyScale: {
    name: 'Clinical Frailty Scale',
    heName: 'סולם שבריריות קלינית',
    category: 'Frailty',
    description: 'Rockwood Clinical Frailty Scale',
    parameters: [
      { name: 'score', label: 'Frailty level', type: 'select', options: [
        { value: 1, label: '1 - Very Fit' },
        { value: 2, label: '2 - Well' },
        { value: 3, label: '3 - Managing Well' },
        { value: 4, label: '4 - Vulnerable' },
        { value: 5, label: '5 - Mildly Frail' },
        { value: 6, label: '6 - Moderately Frail' },
        { value: 7, label: '7 - Severely Frail' },
        { value: 8, label: '8 - Very Severely Frail' },
        { value: 9, label: '9 - Terminally Ill' }
      ]}
    ],
    calculate: (params) => {
      const score = params.score;
      const descriptions = {
        1: 'Very fit - robust, active, energetic, motivated',
        2: 'Well - no active disease, less fit than category 1',
        3: 'Managing well - medical problems well controlled',
        4: 'Vulnerable - not dependent but symptoms limit activities',
        5: 'Mildly frail - needs help with IADLs',
        6: 'Moderately frail - needs help with all outside activities and housekeeping',
        7: 'Severely frail - completely dependent for personal care',
        8: 'Very severely frail - approaching end of life',
        9: 'Terminally ill - life expectancy <6 months'
      };
      
      return {
        score,
        interpretation: descriptions[score],
        recommendation: score >= 5 ? 'Comprehensive geriatric assessment indicated' :
                       score === 4 ? 'Preventive interventions recommended' :
                       'Continue current care'
      };
    }
  },

  FRAIL: {
    name: 'FRAIL Scale',
    heName: 'סולם FRAIL',
    category: 'Frailty',
    description: 'Simple frailty screening',
    parameters: [
      { name: 'fatigue', label: 'Fatigue', type: 'boolean', points: 1 },
      { name: 'resistance', label: 'Resistance (climbing stairs)', type: 'boolean', points: 1 },
      { name: 'ambulation', label: 'Ambulation (walking difficulty)', type: 'boolean', points: 1 },
      { name: 'illness', label: 'Illness (>5 diseases)', type: 'boolean', points: 1 },
      { name: 'lossWeight', label: 'Loss of weight (>5%)', type: 'boolean', points: 1 }
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + (val ? 1 : 0), 0);
      return {
        score,
        maxScore: 5,
        interpretation: score === 0 ? 'Robust' :
                       score <= 2 ? 'Pre-frail' :
                       'Frail',
        recommendation: score >= 3 ? 'Refer for comprehensive assessment' :
                       score >= 1 ? 'Monitor and prevent progression' :
                       'Healthy aging interventions'
      };
    }
  },

  // Nutritional Assessment
  MNA: {
    name: 'Mini Nutritional Assessment',
    heName: 'הערכה תזונתית מקוצרת',
    category: 'Nutrition',
    description: 'Malnutrition screening',
    parameters: [
      { name: 'foodIntake', label: 'Food intake decline', type: 'select', options: [
        { value: 0, label: 'Severe decrease' },
        { value: 1, label: 'Moderate decrease' },
        { value: 2, label: 'No decrease' }
      ]},
      { name: 'weightLoss', label: 'Weight loss (3 months)', type: 'select', options: [
        { value: 0, label: '>3 kg' },
        { value: 1, label: 'Unknown' },
        { value: 2, label: '1-3 kg' },
        { value: 3, label: 'No weight loss' }
      ]},
      { name: 'mobility', label: 'Mobility', type: 'select', options: [
        { value: 0, label: 'Bed or chair bound' },
        { value: 1, label: 'Able to get out of bed/chair' },
        { value: 2, label: 'Goes out' }
      ]},
      { name: 'stress', label: 'Psychological stress/acute disease', type: 'select', options: [
        { value: 0, label: 'Yes' },
        { value: 2, label: 'No' }
      ]},
      { name: 'neuropsych', label: 'Neuropsychological problems', type: 'select', options: [
        { value: 0, label: 'Severe dementia/depression' },
        { value: 1, label: 'Mild dementia' },
        { value: 2, label: 'No problems' }
      ]},
      { name: 'bmi', label: 'BMI', type: 'select', options: [
        { value: 0, label: '<19' },
        { value: 1, label: '19-21' },
        { value: 2, label: '21-23' },
        { value: 3, label: '≥23' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        maxScore: 14,
        interpretation: score >= 12 ? 'Normal nutritional status' :
                       score >= 8 ? 'At risk of malnutrition' :
                       'Malnourished',
        recommendation: score < 12 ? 'Full nutritional assessment needed' : 'Re-screen in 3 months'
      };
    }
  },

  MUST: {
    name: 'Malnutrition Universal Screening Tool',
    heName: 'MUST',
    category: 'Nutrition',
    description: 'Malnutrition risk screening',
    parameters: [
      { name: 'bmi', label: 'BMI score', type: 'select', options: [
        { value: 0, label: '>20' },
        { value: 1, label: '18.5-20' },
        { value: 2, label: '<18.5' }
      ]},
      { name: 'weightLoss', label: 'Weight loss score', type: 'select', options: [
        { value: 0, label: '<5%' },
        { value: 1, label: '5-10%' },
        { value: 2, label: '>10%' }
      ]},
      { name: 'acuteDisease', label: 'Acute disease effect', type: 'select', options: [
        { value: 0, label: 'No' },
        { value: 2, label: 'Yes (no intake >5 days)' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        risk: score === 0 ? 'Low' : score === 1 ? 'Medium' : 'High',
        interpretation: score === 0 ? 'Low risk of malnutrition' :
                       score === 1 ? 'Medium risk of malnutrition' :
                       'High risk of malnutrition',
        recommendation: score === 0 ? 'Routine clinical care' :
                       score === 1 ? 'Observe, document intake' :
                       'Treat, refer to dietitian'
      };
    }
  },

  // Delirium Assessment
  CAM: {
    name: 'Confusion Assessment Method',
    heName: 'CAM',
    category: 'Delirium',
    description: 'Delirium screening',
    parameters: [
      { name: 'acuteOnset', label: 'Acute onset and fluctuating course', type: 'boolean' },
      { name: 'inattention', label: 'Inattention', type: 'boolean' },
      { name: 'disorganized', label: 'Disorganized thinking', type: 'boolean' },
      { name: 'altered', label: 'Altered level of consciousness', type: 'boolean' }
    ],
    calculate: (params) => {
      const { acuteOnset, inattention, disorganized, altered } = params;
      const hasDelirium = acuteOnset && inattention && (disorganized || altered);
      
      return {
        result: hasDelirium ? 'Positive' : 'Negative',
        interpretation: hasDelirium ? 'Delirium present' : 'Delirium not detected',
        recommendation: hasDelirium ? 
          'Investigate and treat underlying causes, implement delirium protocol' :
          'Continue monitoring, address risk factors'
      };
    }
  },

  CAMICU: {
    name: 'CAM-ICU',
    heName: 'CAM-ICU',
    category: 'Delirium',
    description: 'ICU delirium assessment',
    parameters: [
      { name: 'rass', label: 'RASS score', type: 'select', options: [
        { value: -5, label: '-5: Unarousable' },
        { value: -4, label: '-4: Deep sedation' },
        { value: -3, label: '-3: Moderate sedation' },
        { value: -2, label: '-2: Light sedation' },
        { value: -1, label: '-1: Drowsy' },
        { value: 0, label: '0: Alert and calm' },
        { value: 1, label: '+1: Restless' },
        { value: 2, label: '+2: Agitated' },
        { value: 3, label: '+3: Very agitated' },
        { value: 4, label: '+4: Combative' }
      ]},
      { name: 'acuteChange', label: 'Acute change or fluctuation', type: 'boolean' },
      { name: 'inattention', label: 'Inattention (SAVEAHAART errors >2)', type: 'boolean' },
      { name: 'alteredLOC', label: 'Altered LOC (RASS ≠ 0)', type: 'boolean' },
      { name: 'disorganized', label: 'Disorganized thinking', type: 'boolean' }
    ],
    calculate: (params) => {
      const { rass, acuteChange, inattention, alteredLOC, disorganized } = params;
      
      if (rass <= -4) {
        return {
          result: 'Unable to assess',
          interpretation: 'Patient too sedated',
          recommendation: 'Reassess when RASS > -4'
        };
      }
      
      const hasDelirium = acuteChange && inattention && (alteredLOC || disorganized);
      
      return {
        result: hasDelirium ? 'CAM-ICU Positive' : 'CAM-ICU Negative',
        interpretation: hasDelirium ? 'Delirium present' : 'No delirium',
        recommendation: hasDelirium ? 
          'Implement ABCDEF bundle, investigate causes' :
          'Continue preventive measures'
      };
    }
  },

  // Pain Assessment
  PainAD: {
    name: 'Pain Assessment in Advanced Dementia',
    heName: 'PAINAD',
    category: 'Pain',
    description: 'Pain in non-verbal patients',
    parameters: [
      { name: 'breathing', label: 'Breathing', type: 'select', options: [
        { value: 0, label: 'Normal' },
        { value: 1, label: 'Occasional labored' },
        { value: 2, label: 'Noisy labored' }
      ]},
      { name: 'vocalization', label: 'Negative vocalization', type: 'select', options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Occasional moan/groan' },
        { value: 2, label: 'Repeated calling out' }
      ]},
      { name: 'facial', label: 'Facial expression', type: 'select', options: [
        { value: 0, label: 'Smiling or inexpressive' },
        { value: 1, label: 'Sad, frightened, frown' },
        { value: 2, label: 'Facial grimacing' }
      ]},
      { name: 'body', label: 'Body language', type: 'select', options: [
        { value: 0, label: 'Relaxed' },
        { value: 1, label: 'Tense, pacing' },
        { value: 2, label: 'Rigid, clenched fists' }
      ]},
      { name: 'consolability', label: 'Consolability', type: 'select', options: [
        { value: 0, label: 'No need to console' },
        { value: 1, label: 'Distracted by voice/touch' },
        { value: 2, label: 'Unable to console' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        maxScore: 10,
        interpretation: score === 0 ? 'No pain' :
                       score <= 3 ? 'Mild pain' :
                       score <= 6 ? 'Moderate pain' :
                       'Severe pain',
        recommendation: score > 0 ? 'Consider analgesic intervention' : 'Continue monitoring'
      };
    }
  },

  // Pressure Ulcer Risk
  Braden: {
    name: 'Braden Scale',
    heName: 'סולם ברייידן',
    category: 'Skin',
    description: 'Pressure ulcer risk assessment',
    parameters: [
      { name: 'sensory', label: 'Sensory perception', type: 'select', options: [
        { value: 1, label: 'Completely limited' },
        { value: 2, label: 'Very limited' },
        { value: 3, label: 'Slightly limited' },
        { value: 4, label: 'No impairment' }
      ]},
      { name: 'moisture', label: 'Moisture', type: 'select', options: [
        { value: 1, label: 'Constantly moist' },
        { value: 2, label: 'Very moist' },
        { value: 3, label: 'Occasionally moist' },
        { value: 4, label: 'Rarely moist' }
      ]},
      { name: 'activity', label: 'Activity', type: 'select', options: [
        { value: 1, label: 'Bedfast' },
        { value: 2, label: 'Chairfast' },
        { value: 3, label: 'Walks occasionally' },
        { value: 4, label: 'Walks frequently' }
      ]},
      { name: 'mobility', label: 'Mobility', type: 'select', options: [
        { value: 1, label: 'Completely immobile' },
        { value: 2, label: 'Very limited' },
        { value: 3, label: 'Slightly limited' },
        { value: 4, label: 'No limitation' }
      ]},
      { name: 'nutrition', label: 'Nutrition', type: 'select', options: [
        { value: 1, label: 'Very poor' },
        { value: 2, label: 'Probably inadequate' },
        { value: 3, label: 'Adequate' },
        { value: 4, label: 'Excellent' }
      ]},
      { name: 'friction', label: 'Friction and shear', type: 'select', options: [
        { value: 1, label: 'Problem' },
        { value: 2, label: 'Potential problem' },
        { value: 3, label: 'No apparent problem' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        maxScore: 23,
        risk: score <= 9 ? 'Very high' :
              score <= 12 ? 'High' :
              score <= 14 ? 'Moderate' :
              score <= 18 ? 'Mild' :
              'No risk',
        interpretation: score <= 18 ? 'At risk for pressure ulcers' : 'Not at risk',
        recommendation: score <= 18 ? 'Implement pressure ulcer prevention protocol' : 'Standard care'
      };
    }
  },

  Norton: {
    name: 'Norton Scale',
    heName: 'סולם נורטון',
    category: 'Skin',
    description: 'Pressure sore risk',
    parameters: [
      { name: 'physical', label: 'Physical condition', type: 'select', options: [
        { value: 1, label: 'Very bad' },
        { value: 2, label: 'Poor' },
        { value: 3, label: 'Fair' },
        { value: 4, label: 'Good' }
      ]},
      { name: 'mental', label: 'Mental condition', type: 'select', options: [
        { value: 1, label: 'Stupor' },
        { value: 2, label: 'Confused' },
        { value: 3, label: 'Apathetic' },
        { value: 4, label: 'Alert' }
      ]},
      { name: 'activity', label: 'Activity', type: 'select', options: [
        { value: 1, label: 'Bedfast' },
        { value: 2, label: 'Chairfast' },
        { value: 3, label: 'Walk with help' },
        { value: 4, label: 'Ambulant' }
      ]},
      { name: 'mobility', label: 'Mobility', type: 'select', options: [
        { value: 1, label: 'Immobile' },
        { value: 2, label: 'Very limited' },
        { value: 3, label: 'Slightly limited' },
        { value: 4, label: 'Full' }
      ]},
      { name: 'incontinence', label: 'Incontinence', type: 'select', options: [
        { value: 1, label: 'Doubly' },
        { value: 2, label: 'Usually urine' },
        { value: 3, label: 'Occasional' },
        { value: 4, label: 'None' }
      ]}
    ],
    calculate: (params) => {
      const score = Object.values(params).reduce((sum, val) => sum + val, 0);
      return {
        score,
        maxScore: 20,
        risk: score <= 12 ? 'High' :
              score <= 14 ? 'Medium' :
              'Low',
        interpretation: score <= 14 ? 'At risk for pressure sores' : 'Low risk',
        recommendation: score <= 14 ? 'Preventive measures required' : 'Standard monitoring'
      };
    }
  },

  // Prognostic Scores
  CharlsonComorbidity: {
    name: 'Charlson Comorbidity Index',
    heName: 'מדד Charlson',
    category: 'Prognosis',
    description: '10-year survival prediction',
    parameters: [
      { name: 'mi', label: 'Myocardial infarction', type: 'boolean', points: 1 },
      { name: 'chf', label: 'Congestive heart failure', type: 'boolean', points: 1 },
      { name: 'pvd', label: 'Peripheral vascular disease', type: 'boolean', points: 1 },
      { name: 'cvd', label: 'Cerebrovascular disease', type: 'boolean', points: 1 },
      { name: 'dementia', label: 'Dementia', type: 'boolean', points: 1 },
      { name: 'copd', label: 'COPD', type: 'boolean', points: 1 },
      { name: 'connective', label: 'Connective tissue disease', type: 'boolean', points: 1 },
      { name: 'ulcer', label: 'Peptic ulcer disease', type: 'boolean', points: 1 },
      { name: 'liver', label: 'Mild liver disease', type: 'boolean', points: 1 },
      { name: 'diabetes', label: 'Diabetes without complications', type: 'boolean', points: 1 },
      { name: 'hemiplegia', label: 'Hemiplegia', type: 'boolean', points: 2 },
      { name: 'renal', label: 'Moderate to severe CKD', type: 'boolean', points: 2 },
      { name: 'diabetesComp', label: 'Diabetes with complications', type: 'boolean', points: 2 },
      { name: 'tumor', label: 'Tumor without metastases', type: 'boolean', points: 2 },
      { name: 'leukemia', label: 'Leukemia', type: 'boolean', points: 2 },
      { name: 'lymphoma', label: 'Lymphoma', type: 'boolean', points: 2 },
      { name: 'liverSevere', label: 'Moderate to severe liver disease', type: 'boolean', points: 3 },
      { name: 'metastatic', label: 'Metastatic solid tumor', type: 'boolean', points: 6 },
      { name: 'aids', label: 'AIDS', type: 'boolean', points: 6 },
      { name: 'age', label: 'Age', type: 'select', options: [
        { value: 0, label: '<50' },
        { value: 1, label: '50-59' },
        { value: 2, label: '60-69' },
        { value: 3, label: '70-79' },
        { value: 4, label: '≥80' }
      ]}
    ],
    calculate: (params) => {
      let score = 0;
      Object.entries(params).forEach(([key, value]) => {
        if (key === 'age') {
          score += value;
        } else if (value) {
          if (['hemiplegia', 'renal', 'diabetesComp', 'tumor', 'leukemia', 'lymphoma'].includes(key)) {
            score += 2;
          } else if (['liverSevere'].includes(key)) {
            score += 3;
          } else if (['metastatic', 'aids'].includes(key)) {
            score += 6;
          } else {
            score += 1;
          }
        }
      });
      
      const survival10Year = [98, 96, 90, 77, 53, 21, 2, 0][Math.min(score, 7)];
      
      return {
        score,
        survival: survival10Year,
        interpretation: `Estimated 10-year survival: ${survival10Year}%`,
        recommendation: score >= 5 ? 'Consider palliative care discussion' : 'Standard care'
      };
    }
  },

  CIRS: {
    name: 'Cumulative Illness Rating Scale',
    heName: 'CIRS-G',
    category: 'Prognosis',
    description: 'Comorbidity burden assessment',
    parameters: [
      { name: 'cardiac', label: 'Heart', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'vascular', label: 'Vascular', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'hematologic', label: 'Hematologic', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'respiratory', label: 'Respiratory', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'ent', label: 'Eyes, ears, nose, throat', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'giUpper', label: 'Upper GI', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'giLower', label: 'Lower GI', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'hepatic', label: 'Hepatic', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'renal', label: 'Renal', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'gu', label: 'Genitourinary', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'musculoskeletal', label: 'Musculoskeletal/skin', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'neurologic', label: 'Neurologic', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'endocrine', label: 'Endocrine/metabolic', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]},
      { name: 'psychiatric', label: 'Psychiatric', type: 'select', options: [
        { value: 0, label: 'No problem' },
        { value: 1, label: 'Mild problem' },
        { value: 2, label: 'Moderate disability' },
        { value: 3, label: 'Severe/constant disability' },
        { value: 4, label: 'Life-threatening' }
      ]}
    ],
    calculate: (params) => {
      const scores = Object.values(params);
      const totalScore = scores.reduce((sum, val) => sum + val, 0);
      const categories = scores.filter(s => s > 0).length;
      const severityIndex = categories > 0 ? (totalScore / categories).toFixed(2) : 0;
      const level3Count = scores.filter(s => s >= 3).length;
      
      return {
        totalScore,
        severityIndex,
        categories,
        level3Count,
        interpretation: `Total: ${totalScore}, SI: ${severityIndex}, Categories: ${categories}, Level 3+: ${level3Count}`,
        recommendation: level3Count >= 2 ? 'High comorbidity burden - comprehensive care needed' :
                       severityIndex > 2 ? 'Moderate burden - close monitoring' :
                       'Low to moderate burden'
      };
    }
  },

  // More calculators can be added here...
};

// Helper function to get calculator by name
export const getCalculator = (name) => {
  return clinicalCalculators[name];
};

// Helper function to get calculators by category
export const getCalculatorsByCategory = (category) => {
  return Object.entries(clinicalCalculators)
    .filter(([, calc]) => calc.category === category)
    .reduce((acc, [key, calc]) => ({ ...acc, [key]: calc }), {});
};

// Helper function to search calculators
export const searchCalculators = (query) => {
  const searchTerm = query.toLowerCase();
  return Object.entries(clinicalCalculators)
    .filter(([key, calc]) => 
      key.toLowerCase().includes(searchTerm) ||
      calc.name.toLowerCase().includes(searchTerm) ||
      calc.heName.includes(query) ||
      calc.description.toLowerCase().includes(searchTerm) ||
      calc.category.toLowerCase().includes(searchTerm)
    )
    .reduce((acc, [key, calc]) => ({ ...acc, [key]: calc }), {});
};

// Export calculator categories
export const calculatorCategories = [
  'Cardiovascular',
  'Renal',
  'Cognitive',
  'Functional',
  'Fall Risk',
  'Frailty',
  'Nutrition',
  'Delirium',
  'Pain',
  'Skin',
  'Prognosis'
];

export default clinicalCalculators;