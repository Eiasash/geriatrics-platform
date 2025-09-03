// Emergency Protocols for Geriatric Medicine
// Critical care protocols and emergency management

export const emergencyProtocols = {
  acutedelirium: {
    title: "Acute Delirium Emergency Protocol",
    urgency: "HIGH",
    timeFrame: "Immediate assessment required",
    description: "Rapid assessment and management of acute altered mental status in elderly patients",
    triage: {
      immediate: [
        "Altered level of consciousness",
        "Acute agitation with safety concerns", 
        "Signs of severe infection/sepsis",
        "Hypoxia or respiratory distress"
      ],
      urgent: [
        "New onset confusion",
        "Fluctuating mental status",
        "Medication-related changes",
        "Electrolyte abnormalities"
      ]
    },
    assessment: [
      "1. IMMEDIATE: Vital signs, oxygen saturation, glucose",
      "2. CAM assessment (if cooperative)",
      "3. Focused physical exam:",
      "   • Neurological signs",
      "   • Signs of infection",
      "   • Hydration status",
      "   • Medication list review",
      "4. STAT labs: CBC, BMP, UA, blood cultures if febrile",
      "5. Consider: EKG, chest X-ray, CT head if trauma"
    ],
    interventions: [
      "• Ensure safety - fall precautions, 1:1 if needed",
      "• Treat underlying causes immediately",
      "• Environmental modifications (quiet, well-lit room)",
      "• Family presence if possible",
      "• Avoid restraints unless absolutely necessary",
      "• Consider medications only for severe agitation:"
    ],
    medications: {
      firstLine: "Haloperidol 0.25-0.5mg IV/PO q2-4h PRN",
      alternatives: [
        "Risperidone 0.25mg PO BID",
        "Quetiapine 12.5-25mg PO q6-8h"
      ],
      avoid: [
        "Benzodiazepines (except ETOH withdrawal)",
        "Anticholinergics",
        "High-dose antipsychotics"
      ]
    },
    redFlags: [
      "Hemodynamic instability",
      "Fever >38.5°C",
      "New focal neurological signs",
      "Severe agitation requiring restraints",
      "Signs of withdrawal syndrome"
    ]
  },

  fallstrauma: {
    title: "Post-Fall Emergency Assessment",
    urgency: "HIGH",
    timeFrame: "Assessment within 30 minutes",
    description: "Systematic evaluation of elderly patients after falls with trauma assessment",
    triage: {
      immediate: [
        "Loss of consciousness",
        "Head trauma with confusion",
        "Suspected hip fracture",
        "Anticoagulated patient with head strike"
      ],
      urgent: [
        "Any fall with injury",
        "Multiple falls in 24h",
        "Fall with inability to get up independently"
      ]
    },
    assessment: [
      "1. IMMEDIATE: C-spine precautions if indicated",
      "2. Primary survey: ABCDE approach",
      "3. Vital signs including orthostatics",
      "4. Detailed injury assessment:",
      "   • Head-to-toe examination",
      "   • Focus on: head, cervical spine, ribs, pelvis, hips, wrists",
      "   • Neurovascular checks of extremities",
      "5. Medication review - especially anticoagulants",
      "6. Circumstances of fall assessment"
    ],
    imaging: {
      immediate: [
        "CT head: If LOC, anticoagulated, neurologic changes",
        "Pelvic X-ray: If hip/groin pain or inability to bear weight",
        "C-spine: If neck pain or neurologic symptoms"
      ],
      consider: [
        "Chest X-ray: If rib tenderness",
        "Extremity X-rays: Based on clinical findings",
        "CT abdomen/pelvis: If abdominal pain or hematuria"
      ]
    },
    interventions: [
      "• Pain management (avoid NSAIDs if possible)",
      "• Wound care and tetanus prophylaxis",
      "• DVT prophylaxis if prolonged immobility expected",
      "• Early mobilization when safe",
      "• PT/OT consultation",
      "• Fall risk assessment and prevention plan"
    ],
    discharge: {
      criteria: [
        "Stable vital signs",
        "No evidence of serious injury",
        "Able to ambulate at baseline or with assistance",
        "Adequate support system at home"
      ],
      followUp: [
        "Primary care within 48-72 hours",
        "PT/OT evaluation within 1 week",
        "Medication review",
        "Home safety assessment"
      ]
    }
  },

  sepsis: {
    title: "Sepsis in Elderly - Early Recognition",
    urgency: "CRITICAL",
    timeFrame: "Golden hour - Treatment within 60 minutes",
    description: "Sepsis recognition and management in geriatric patients with atypical presentations",
    recognition: {
      typical: [
        "Fever >38°C or hypothermia <36°C",
        "Tachycardia >90 bpm",
        "Tachypnea >20/min",
        "Altered mental status"
      ],
      atypical: [
        "New or worsening confusion WITHOUT fever",
        "Unexplained falls",
        "Decreased oral intake",
        "New incontinence",
        "Increased frailty or weakness"
      ]
    },
    qsofa: {
      criteria: [
        "Altered mentation (GCS <15)",
        "Systolic BP ≤100 mmHg", 
        "Respiratory rate ≥22/min"
      ],
      interpretation: "≥2 criteria = High risk for poor outcomes"
    },
    interventions: [
      "1. IMMEDIATE: IV access, blood cultures × 2",
      "2. STAT labs: CBC, BMP, lactate, procalcitonin",
      "3. Broad-spectrum antibiotics within 1 hour:",
      "   • Empiric: Piperacillin-tazobactam 3.375g IV q6h",
      "   • Adjust for renal function",
      "4. Fluid resuscitation: 30ml/kg crystalloid",
      "5. Source control if indicated",
      "6. Vasopressors if hypotensive after fluids"
    ],
    antibiotics: {
      urinary: "Ceftriaxone 1g IV daily",
      pneumonia: "Ceftriaxone + azithromycin OR levofloxacin",
      abdominal: "Piperacillin-tazobactam OR meropenem",
      skinSoft: "Vancomycin + piperacillin-tazobactam",
      unknown: "Vancomycin + piperacillin-tazobactam"
    },
    monitoring: [
      "Vital signs q15min until stable",
      "Urine output (goal >0.5ml/kg/hr)",
      "Mental status changes",
      "Serial lactate levels",
      "Blood pressure response to fluids"
    ]
  },

  stroke: {
    title: "Acute Stroke Protocol - Elderly",
    urgency: "CRITICAL",
    timeFrame: "Door-to-needle: <60 minutes, Door-to-groin: <90 minutes",
    description: "Time-sensitive stroke management in geriatric patients",
    fastAssessment: {
      face: "Facial droop - ask patient to smile",
      arms: "Arm weakness - raise both arms for 10 seconds",
      speech: "Speech problems - repeat simple phrase",
      time: "Time of symptom onset (critical for thrombolysis)"
    },
    nihssRapid: [
      "Level of consciousness",
      "Horizontal eye movements", 
      "Visual fields",
      "Facial palsy",
      "Motor arm/leg",
      "Limb ataxia",
      "Sensory",
      "Language/aphasia",
      "Dysarthria",
      "Extinction/inattention"
    ],
    imaging: [
      "1. STAT non-contrast head CT",
      "2. If CT negative and within window:",
      "   • CTA head/neck (if endovascular candidate)",
      "   • Consider MRI if CT unclear",
      "3. Check for contraindications to tPA"
    ],
    tpaEligibility: {
      inclusion: [
        "Ischemic stroke with measurable deficit",
        "Onset <4.5 hours (selected patients)",
        "Age: No absolute upper limit if functionally independent"
      ],
      exclusion: [
        "ICH on CT",
        "Recent major surgery <14 days",
        "GI bleeding <21 days",
        "Platelets <100,000",
        "INR >1.7 or PT >15 seconds"
      ]
    },
    treatment: {
      thrombolysis: "Alteplase 0.9 mg/kg IV (max 90mg), 10% bolus, 90% over 60 min",
      bloodPressure: "Goal <185/110 pre-tPA, <180/105 post-tPA",
      monitoring: "Neuro checks q15min × 2h, then q30min × 6h, then q1h × 16h"
    },
    complications: [
      "Hemorrhagic transformation (6-8%)",
      "Angioedema (rare but serious)",
      "Symptomatic ICH (6.4% overall)"
    ]
  },

  mi: {
    title: "Acute MI in Elderly - Atypical Presentations",
    urgency: "CRITICAL", 
    timeFrame: "Door-to-balloon: <90 minutes",
    description: "Recognition and management of myocardial infarction in geriatric patients",
    atypicalPresentations: [
      "Dyspnea without chest pain (most common)",
      "Acute confusion or altered mental status",
      "Syncope or near-syncope",
      "Nausea/vomiting without pain",
      "New onset heart failure",
      "Weakness or fatigue",
      "Abdominal pain"
    ],
    assessment: [
      "1. 12-lead EKG within 10 minutes",
      "2. STAT troponin, BNP",
      "3. Chest X-ray",
      "4. Point-of-care echo if available",
      "5. Complete H&P focusing on functional status"
    ],
    stemi: {
      criteria: [
        "ST elevation ≥1mm in 2 contiguous leads",
        "New LBBB with clinical presentation",
        "Posterior MI changes"
      ],
      treatment: "Primary PCI preferred over thrombolytics in elderly"
    },
    nstemi: {
      riskStratification: "TIMI or GRACE score",
      treatment: [
        "Dual antiplatelet therapy",
        "Anticoagulation (heparin)",
        "Beta-blocker (if no CHF)",
        "ACE inhibitor",
        "Statin"
      ]
    },
    complications: [
      "Cardiogenic shock (higher risk in elderly)",
      "Mechanical complications",
      "Arrhythmias",
      "Stroke",
      "Bleeding (increased risk with anticoagulation)"
    ]
  },

  hypoglycemia: {
    title: "Severe Hypoglycemia Protocol",
    urgency: "CRITICAL",
    timeFrame: "Immediate treatment required",
    description: "Emergency management of severe hypoglycemia in elderly diabetic patients",
    recognition: [
      "Altered mental status",
      "Diaphoresis (may be absent in elderly)",
      "Tachycardia",
      "Neurologic symptoms",
      "Coma or seizures"
    ],
    treatment: {
      conscious: [
        "15-20g fast-acting carbs (glucose tabs, juice)",
        "Recheck glucose in 15 minutes",
        "Repeat if still <70 mg/dL",
        "Follow with complex carb once normalized"
      ],
      unconscious: [
        "D50W 25-50ml IV push (if IV access)",
        "Glucagon 1mg IM/SQ (if no IV access)", 
        "Recheck glucose q15min",
        "Consider continuous D10W infusion if recurrent"
      ]
    },
    causes: [
      "Medication errors or overdose",
      "Missed meals",
      "Increased exercise",
      "Alcohol consumption",
      "Renal failure",
      "Drug interactions"
    ],
    prevention: [
      "Medication reconciliation",
      "Regular meal schedule",
      "Glucose monitoring education",
      "Recognition of symptoms",
      "Emergency action plan"
    ]
  }
};

export const getEmergencyProtocol = (condition) => {
  return emergencyProtocols[condition.toLowerCase()];
};

export const getProtocolsByUrgency = (urgency) => {
  return Object.entries(emergencyProtocols)
    .filter(([_, protocol]) => protocol.urgency === urgency.toUpperCase())
    .map(([key, protocol]) => ({ key, ...protocol }));
};

export const getCriticalProtocols = () => {
  return getProtocolsByUrgency('CRITICAL');
};

export const getHighPriorityProtocols = () => {
  return getProtocolsByUrgency('HIGH');
};

export default emergencyProtocols;