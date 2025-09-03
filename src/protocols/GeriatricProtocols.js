// protocols/GeriatricProtocols.js

const GeriatricProtocols = {
  // 1. DELIRIUM PROTOCOL
  delirium: {
    title: "Delirium Assessment & Management",
    urgent: true,
    
    assessment: {
      CAM: {
        criteria: [
          "1. Acute onset AND fluctuating course",
          "2. Inattention (serial 7s, months backward)",
          "3. Disorganized thinking",
          "4. Altered consciousness"
        ],
        positive: "1 AND 2 AND (3 OR 4)"
      }
    },
    
    immediateOrders: [
      "UA with culture (UTI #1 cause)",
      "CBC with differential",
      "BMP (Na, glucose, BUN/Cr)",
      "TSH, B12 if not recent",
      "Medication review - STOP anticholinergics/benzos",
      "EKG if cardiac history",
      "CXR if respiratory symptoms",
      "Head CT if: fall, anticoag, focal findings"
    ],
    
    management: {
      nonPharm: [
        "Reorient frequently",
        "Glasses/hearing aids",
        "Natural light during day",
        "Family at bedside",
        "Avoid restraints",
        "Early mobilization"
      ],
      pharmacologic: {
        firstLine: "Haloperidol 0.25-0.5mg PO/IM q4h PRN",
        alternative: "Quetiapine 12.5-25mg PO",
        avoid: "Benzos (except alcohol withdrawal)"
      }
    }
  },

  // 2. FALLS PROTOCOL
  falls: {
    title: "Falls Assessment Protocol",
    
    immediate: [
      "Trauma survey - head to toe",
      "Vital signs including orthostatics",
      "Glucose check",
      "Neuro exam if head involvement",
      "EKG if syncope suspected"
    ],
    
    assessment: {
      timedUpGo: {
        instructions: "Rise from chair, walk 3m, turn, walk back, sit",
        interpretation: {
          "<10 seconds": "Normal",
          "10-12 seconds": "Borderline",
          ">12 seconds": "High fall risk"
        }
      },
      
      orthostatics: {
        protocol: "Check BP/HR supine → 1min → 3min standing",
        positive: "SBP drop >20 or DBP drop >10 or HR increase >30"
      }
    },
    
    riskFactors: [
      "Previous falls",
      "Medications (>4, psychotropics)",
      "Gait/balance problems",
      "Visual impairment",
      "Cognitive impairment",
      "Environmental hazards",
      "Muscle weakness",
      "Arthritis"
    ],
    
    interventions: [
      "PT/OT evaluation",
      "Medication review/reduction",
      "Vitamin D 800-1000 IU daily",
      "Vision assessment",
      "Home safety evaluation",
      "Hip protectors if recurrent",
      "Cardiac workup if syncope"
    ]
  },

  // 3. POLYPHARMACY PROTOCOL
  polypharmacy: {
    title: "Medication Reconciliation & Deprescribing",
    
    redFlags: {
      count: ">5 medications",
      highRisk: [
        "Benzodiazepines",
        "Anticholinergics",
        "Antipsychotics",
        "NSAIDs in CKD/CHF",
        "Sliding scale insulin alone",
        "Muscle relaxants"
      ]
    },
    
    beersCriteria: {
      alwaysAvoid: [
        "Long-acting benzos (diazepam, chlordiazepoxide)",
        "Tertiary TCAs (amitriptyline)",
        "First-gen antihistamines (diphenhydramine)",
        "Muscle relaxants (cyclobenzaprine)",
        "Meperidine"
      ],
      
      avoidInConditions: {
        "Falls/Fractures": ["Benzos", "Hypnotics", "Antipsychotics"],
        "Dementia": ["Anticholinergics", "Benzos", "H2 blockers"],
        "CKD": ["NSAIDs", "Metformin if eGFR<30"],
        "Heart Failure": ["NSAIDs", "Diltiazem", "Verapamil"]
      }
    },
    
    deprescribingSteps: [
      "1. Review all meds including OTC",
      "2. Identify potentially inappropriate",
      "3. Assess risk vs benefit",
      "4. Prioritize (worst first)",
      "5. Create tapering plan",
      "6. Monitor for withdrawal",
      "7. Document rationale"
    ]
  },

  // 4. ADMISSION PROTOCOL
  admission: {
    title: "Geriatric Admission Checklist",
    
    within1Hour: [
      "Vital signs + orthostatics",
      "Medication reconciliation",
      "Code status discussion",
      "Fall risk assessment",
      "Pressure ulcer risk (Braden)",
      "VTE prophylaxis orders"
    ],
    
    within24Hours: [
      "Comprehensive Geriatric Assessment",
      "Cognitive screen (MOCA/MMSE)",
      "Functional status (ADLs/IADLs)",
      "Social work if discharge concerns",
      "PT/OT if functional decline",
      "Nutrition assessment",
      "Advance directive discussion"
    ],
    
    standardOrders: {
      labs: [
        "CBC, BMP, LFTs",
        "TSH if not in 6 months",
        "B12 if cognitive issues",
        "UA if altered mental status",
        "PT/INR if on warfarin"
      ],
      
      imaging: "CXR if respiratory symptoms",
      
      prophylaxis: {
        DVT: "Enoxaparin 40mg daily or SCDs",
        GI: "Only if high risk (ventilated, coagulopathy)",
        falls: "Bed alarm, frequent rounding"
      }
    }
  },

  // 5. CAPACITY ASSESSMENT
  capacity: {
    title: "Decision-Making Capacity Assessment",
    
    fourComponents: {
      understanding: {
        test: "Can patient explain the medical situation?",
        questions: [
          "What is your medical problem?",
          "What treatment is being recommended?",
          "What are the risks?"
        ]
      },
      
      appreciation: {
        test: "Does patient believe it applies to them?",
        questions: [
          "Why do doctors think you need this?",
          "What could happen without treatment?",
          "How might this affect you?"
        ]
      },
      
      reasoning: {
        test: "Can patient weigh options rationally?",
        questions: [
          "Why are you choosing this option?",
          "What are the alternatives?",
          "How did you decide?"
        ]
      },
      
      expression: {
        test: "Can patient communicate a clear choice?",
        questions: [
          "What is your decision?",
          "Have you changed your mind?"
        ]
      }
    },
    
    documentation: [
      "Specific questions asked",
      "Patient's exact responses",
      "Which criteria met/not met",
      "Reversible factors addressed",
      "Psychiatry consulted if unclear"
    ],
    
    importantNotes: [
      "Capacity is decision-specific",
      "Can fluctuate with delirium",
      "≠ Competency (legal term)",
      "Disagreement ≠ Incapacity",
      "Document thoroughly"
    ]
  },

  // 6. CODE STATUS DISCUSSION
  codeStatus: {
    title: "Goals of Care Conversation Guide",
    
    setup: [
      "Private, quiet space",
      "Adequate time (30+ minutes)",
      "Key decision makers present",
      "Interpreter if needed"
    ],
    
    framework: {
      step1: {
        title: "Assess Understanding",
        phrases: [
          "What is your understanding of your condition?",
          "What have the doctors told you?"
        ]
      },
      
      step2: {
        title: "Share Information",
        phrases: [
          "Would it be okay if I share what I'm seeing?",
          "I'm worried that...",
          "Time may be shorter than we hoped"
        ]
      },
      
      step3: {
        title: "Explore Goals",
        phrases: [
          "What's most important to you?",
          "What gives your life meaning?",
          "What are you hoping for?"
        ]
      },
      
      step4: {
        title: "Make Recommendations",
        phrases: [
          "Based on what you've told me...",
          "I recommend we focus on comfort",
          "CPR would not help achieve your goals"
        ]
      }
    },
    
    documentation: [
      "Who was present",
      "Patient's stated goals",
      "Specific interventions discussed",
      "Decision reached",
      "Plan for re-evaluation"
    ]
  },

  // 7. PRESSURE ULCER PROTOCOL
  pressureUlcer: {
    title: "Pressure Injury Prevention & Management",
    
    bradenScale: {
      components: [
        "Sensory perception (1-4)",
        "Moisture (1-4)",
        "Activity (1-4)",
        "Mobility (1-4)",
        "Nutrition (1-4)",
        "Friction/Shear (1-3)"
      ],
      risk: {
        "≤12": "High risk",
        "13-14": "Moderate risk",
        "15-18": "Mild risk",
        ">18": "Low risk"
      }
    },
    
    staging: {
      stage1: "Intact skin, non-blanchable erythema",
      stage2: "Partial thickness, epidermis/dermis",
      stage3: "Full thickness, fat visible",
      stage4: "Full thickness, muscle/bone visible",
      unstageable: "Full thickness, base obscured",
      DTI: "Purple/maroon, intact or blood blister"
    },
    
    prevention: [
      "Turn q2h (document)",
      "Pressure redistribution mattress",
      "Heel elevation",
      "Optimize nutrition (protein 1.2-1.5g/kg)",
      "Manage incontinence",
      "Mobilize early"
    ]
  },

  // 8. CONSTIPATION PROTOCOL
  constipation: {
    title: "Constipation Assessment & Management",
    
    assessment: [
      "Last BM and consistency",
      "Straining, incomplete evacuation",
      "Medication review (opioids, anticholinergics)",
      "Fluid intake assessment",
      "Mobility level",
      "Abdominal exam",
      "Consider DRE if impaction suspected"
    ],
    
    management: {
      firstLine: [
        "Increase fluids to 1500-2000mL/day",
        "Fiber if adequate fluids",
        "Mobilization",
        "Scheduled toileting"
      ],
      
      medications: {
        mild: "PEG 3350 17g daily",
        moderate: "Add senna 2 tabs HS",
        severe: "Bisacodyl suppository",
        impaction: "Manual disimpaction, then enema"
      },
      
      preventionInOpioidUse: [
        "Start bowel regimen with opioids",
        "Senna + PEG prophylactically",
        "Daily monitoring"
      ]
    }
  },

  // 9. ACUTE PAIN PROTOCOL
  acutePain: {
    title: "Geriatric Pain Management",
    
    assessment: {
      verbal: "0-10 scale if cognitively intact",
      nonverbal: {
        tool: "PAINAD Scale",
        components: [
          "Breathing",
          "Vocalization",
          "Facial expression",
          "Body language",
          "Consolability"
        ]
      }
    },
    
    management: {
      stepwise: [
        "1. Acetaminophen 500-1000mg q6h scheduled",
        "2. Add tramadol 25-50mg q12h",
        "3. Add oxycodone 2.5mg q6h PRN",
        "4. Consider nerve block/regional"
      ],
      
      avoid: [
        "NSAIDs if CKD, CHF, or GI risk",
        "Meperidine (neurotoxic metabolite)",
        "Long-acting opioids initially"
      ],
      
      monitoring: [
        "Pain scores q shift",
        "Sedation level",
        "Respiratory rate",
        "Bowel function"
      ]
    }
  },

  // 10. UTI PROTOCOL
  uti: {
    title: "UTI Diagnosis & Management",
    
    diagnosis: {
      required: "Symptoms + Positive culture",
      symptoms: [
        "Dysuria, frequency, urgency",
        "Suprapubic pain",
        "New incontinence",
        "Gross hematuria"
      ],
      
      notSufficient: [
        "Positive UA alone",
        "Bacteria without symptoms",
        "Chronic catheter with bacteria",
        "Foul-smelling urine alone"
      ]
    },
    
    treatment: {
      uncomplicated: {
        firstLine: "Nitrofurantoin 100mg BID x5 days",
        alternative: "TMP-SMX DS BID x3 days",
        ifResistant: "Fosfomycin 3g once"
      },
      
      complicated: {
        empiric: "Ceftriaxone 1g daily",
        adjust: "Based on culture results",
        duration: "7-14 days"
      },
      
      asymptomatic: "DO NOT TREAT (except pre-procedure)"
    }
  }
};

// Export for use in components
export default GeriatricProtocols;