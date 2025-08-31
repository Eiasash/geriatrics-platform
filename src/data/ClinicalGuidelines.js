// Clinical Guidelines - Evidence-Based Protocols
// Based on AGS, ACP, ESC, Israeli MOH Guidelines

const ClinicalGuidelines = {
  // HYPERTENSION GUIDELINES
  hypertension: {
    title: "Hypertension in Elderly - 2023 Guidelines",
    
    targets: {
      general: {
        ACC_AHA: "Target <130/80 mmHg for most elderly",
        ESC_ESH: "Target <130/80 if tolerated, <140/90 minimum",
        note: "Lower targets if tolerated without orthostatic symptoms"
      },
      frail: {
        target: "140-150/<90 mmHg",
        consideration: "Balance benefits vs risks",
        monitor: "Orthostatic symptoms, falls"
      },
      CKD: {
        target: "<130/80 mmHg",
        proteinuria: "ACE/ARB first line",
        monitoring: "eGFR, potassium"
      }
    },
    
    treatment: {
      firstLine: {
        thiazides: {
          preferred: "Chlorthalidone 12.5-25mg daily",
          alternative: "Indapamide 1.25-2.5mg daily",
          avoid: "HCTZ (inferior outcomes)"
        },
        ACEI_ARB: {
          ACE: "Ramipril 1.25-10mg daily",
          ARB: "Losartan 25-100mg daily",
          combination: "OK with CCB or thiazide"
        },
        CCB: {
          DHP: "Amlodipine 2.5-10mg daily",
          nonDHP: "Diltiazem ER 120-360mg daily"
        }
      },
      
      combinations: {
        dual: "ACE/ARB + CCB or thiazide",
        triple: "ACE/ARB + CCB + thiazide",
        resistant: "Add spironolactone 25mg"
      },
      
      special: {
        CHF: "ACE/ARB + beta blocker + diuretic",
        CAD: "Beta blocker + ACE/ARB",
        DM: "ACE/ARB first line",
        stroke: "ACE/ARB + thiazide"
      }
    },
    
    monitoring: {
      frequency: "Q4 weeks until goal, then Q3-6 months",
      parameters: "BP, electrolytes, creatinine",
      orthostatic: "Check at each visit",
      home: "Encourage home BP monitoring"
    }
  },

  // DIABETES GUIDELINES
  diabetes: {
    title: "Diabetes in Elderly - 2023 ADA/AGS Guidelines",
    
    glycemicTargets: {
      healthy: {
        A1C: "<7.5%",
        description: "Healthy, few comorbidities, >10 year life expectancy",
        hypoglycemia: "Minimize risk"
      },
      complex: {
        A1C: "<8.0%",
        description: "Multiple comorbidities, >5 year life expectancy",
        considerations: "Balance benefits and risks"
      },
      veryComplex: {
        A1C: "8.0-8.5%",
        description: "Poor health, <5 year life expectancy",
        focus: "Avoid symptoms, maintain QOL"
      },
      endStage: {
        A1C: "8.5-9.0%",
        description: "End-stage disease, comfort care",
        focus: "Avoid hypoglycemia and hyperglycemic symptoms"
      }
    },
    
    treatment: {
      metformin: {
        first: "Metformin 500mg daily with food",
        titration: "Increase weekly to 2000mg",
        contraindications: "eGFR <30, acute illness",
        hold: "Before contrast, surgery, acute illness"
      },
      
      secondLine: {
        SGLT2i: {
          prefer: "If CVD, CKD, or HF",
          drugs: "Empagliflozin 10mg daily",
          benefits: "CV and renal protection"
        },
        GLP1: {
          prefer: "If obesity, CVD",
          drugs: "Semaglutide 0.25mg weekly",
          benefits: "Weight loss, CV protection"
        },
        DPP4i: {
          prefer: "If hypoglycemia risk",
          drugs: "Sitagliptin 100mg daily",
          advantages: "Weight neutral, low hypoglycemia"
        },
        sulfonylurea: {
          prefer: "If cost concern",
          drugs: "Gliclazide MR 30mg daily",
          caution: "Hypoglycemia risk"
        }
      },
      
      insulin: {
        indication: "Marked hyperglycemia, beta cell failure",
        starting: "Glargine 10 units HS or 0.1-0.2 units/kg",
        titration: "Increase 2 units q3 days if FBG >130",
        simplification: "Basal only often sufficient in elderly"
      }
    },
    
    cardiovascular: {
      ASCVD: {
        primary: "Statin if 40-75y with risk factors",
        secondary: "High-intensity statin unless contraindicated",
        elderly: ">75y - moderate intensity unless high risk"
      },
      HTN: "Target <130/80 in diabetes",
      antiplatelet: "ASA 75-100mg if CVD risk"
    },
    
    complications: {
      retinopathy: "Annual dilated eye exam",
      nephropathy: "Annual ACR and eGFR",
      neuropathy: "Annual foot exam, monofilament",
      autonomic: "Gastroparesis, orthostatic hypotension"
    }
  },

  // HEART FAILURE GUIDELINES
  heartFailure: {
    title: "Heart Failure in Elderly - 2022 AHA/ACC/HFSA",
    
    classification: {
      HFrEF: {
        definition: "LVEF ≤40%",
        GDMT: [
          "ACE/ARB/ARNI",
          "Beta blocker",
          "MRA",
          "SGLT2i"
        ],
        devices: "ICD if EF ≤35%, CRT if QRS ≥130ms"
      },
      HFmrEF: {
        definition: "LVEF 41-49%",
        treatment: "Similar to HFrEF",
        evidence: "Limited but emerging"
      },
      HFpEF: {
        definition: "LVEF ≥50%",
        treatment: [
          "Diuretics for volume",
          "SGLT2i (dapagliflozin)",
          "MRA for some",
          "Treat comorbidities"
        ]
      }
    },
    
    stages: {
      A: {
        description: "At risk",
        management: "Risk factor modification"
      },
      B: {
        description: "Structural heart disease",
        management: "ACE/ARB, beta blocker"
      },
      C: {
        description: "Symptomatic",
        management: "GDMT, consider devices"
      },
      D: {
        description: "Refractory symptoms",
        management: "Advanced therapies, palliative care"
      }
    },
    
    medications: {
      ACE_ARB: {
        examples: "Enalapril 2.5mg BID → 10-20mg BID",
        ARBs: "If ACE intolerant (cough)",
        ARNI: "Sacubitril/valsartan if symptomatic on ACE/ARB"
      },
      betaBlockers: {
        evidenceBased: [
          "Carvedilol 3.125mg BID → 25mg BID",
          "Metoprolol succinate 12.5mg daily → 200mg daily",
          "Bisoprolol 1.25mg daily → 10mg daily"
        ],
        contraindications: "Asthma, severe bradycardia, hypotension"
      },
      MRA: {
        spironolactone: "12.5-25mg daily",
        eplerenone: "25mg daily → 50mg daily",
        indication: "Class II-IV symptoms, EF ≤35%",
        monitoring: "K+ and Cr within 1 week, then monthly"
      },
      SGLT2i: {
        empagliflozin: "10mg daily",
        dapagliflozin: "10mg daily",
        benefits: "Mortality and hospitalization reduction",
        caution: "eGFR >20, no T1DM history"
      },
      diuretics: {
        loop: "Furosemide 20-80mg daily/BID",
        thiazide: "Add if not responding to loop",
        monitoring: "Daily weights, electrolytes"
      }
    },
    
    elderlyConsiderations: {
      dosing: "Start lower, titrate slower",
      monitoring: "More frequent lab checks",
      goals: "Quality of life primary",
      comorbidities: "Often multiple medications",
      frailty: "Consider life expectancy in decisions"
    }
  },

  // ATRIAL FIBRILLATION GUIDELINES
  atrialFibrillation: {
    title: "Atrial Fibrillation - 2023 AHA/ACC/ACCP",
    
    anticoagulation: {
      riskScores: {
        CHA2DS2VASc: {
          C: "CHF (1 point)",
          H: "HTN (1 point)",
          A2: "Age ≥75 (2 points)",
          D: "DM (1 point)",
          S2: "Stroke/TIA (2 points)",
          V: "Vascular disease (1 point)",
          A: "Age 65-74 (1 point)",
          Sc: "Sex category - female (1 point)"
        },
        HAS_BLED: {
          H: "HTN (1 point)",
          A: "Abnormal renal/liver (1-2 points)",
          S: "Stroke (1 point)",
          B: "Bleeding (1 point)",
          L: "Labile INR (1 point)",
          E: "Elderly >65 (1 point)",
          D: "Drugs/alcohol (1-2 points)"
        }
      },
      
      recommendations: {
        score0: "No anticoagulation",
        score1: "Consider anticoagulation",
        score2plus: "Anticoagulation recommended"
      },
      
      DOACs: {
        advantages: [
          "Fixed dosing",
          "No INR monitoring",
          "Fewer interactions",
          "Lower ICH risk"
        ],
        considerations: {
          cost: "More expensive than warfarin",
          reversal: "Limited availability",
          adherence: "No monitoring = missed doses"
        }
      }
    },
    
    rateControl: {
      targets: {
        lenient: "<110 bpm at rest",
        strict: "60-100 bpm",
        recommendation: "Lenient unless symptomatic"
      },
      
      agents: {
        betaBlockers: "First line - metoprolol, carvedilol",
        CCB: "Diltiazem, verapamil if beta blocker contraindicated",
        digoxin: "Adjunct only, narrow therapeutic window"
      }
    },
    
    rhythmControl: {
      indications: [
        "Young patients",
        "First episode",
        "Symptomatic despite rate control",
        "Heart failure"
      ],
      
      cardioversion: {
        anticoagulation: "3 weeks before + 4 weeks after",
        TEE: "If <48h or on anticoagulation",
        success: "Higher if <48h duration"
      },
      
      ablation: {
        indication: "Symptomatic despite medical therapy",
        types: "Pulmonary vein isolation",
        success: "60-80% AF free at 1 year"
      }
    }
  },

  // DEMENTIA GUIDELINES
  dementia: {
    title: "Dementia Care - 2023 AAN/AGS Guidelines",
    
    evaluation: {
      required: [
        "CBC, BMP, TSH, B12",
        "Syphilis serology",
        "Brain imaging (MRI preferred)",
        "Cognitive assessment (MOCA, MMSE)",
        "Functional assessment"
      ],
      
      optional: [
        "HIV if risk factors",
        "LP if rapid progression",
        "Genetic testing if early onset",
        "PET scan if unclear diagnosis"
      ]
    },
    
    pharmacologic: {
      cholinesteraseInhibitors: {
        indication: "Mild to moderate Alzheimer's",
        evidence: "Modest benefit, 6-12 month delay",
        monitoring: "Bradycardia, GI symptoms",
        duration: "Continue if benefit, d/c if severe stage"
      },
      
      memantine: {
        indication: "Moderate to severe",
        combination: "Can add to cholinesterase inhibitor",
        titration: "Start 5mg daily, increase weekly"
      },
      
      antipsychotics: {
        blackBox: "Increased mortality 1.6-1.7x",
        lastResort: "Only if severe behavioral symptoms",
        preferred: "Quetiapine or risperidone",
        avoid: "Haloperidol in Lewy body"
      }
    },
    
    nonPharmacologic: {
      firstLine: [
        "Structured daily routine",
        "Cognitive stimulation",
        "Physical exercise",
        "Music therapy",
        "Validation therapy"
      ],
      
      environmental: [
        "Reduce noise and clutter",
        "Consistent caregivers",
        "Clear signage",
        "Safe wandering areas",
        "Appropriate lighting"
      ]
    },
    
    drivingSafety: {
      assessment: "Regular evaluation needed",
      redFlags: [
        "MMSE <24",
        "CDR ≥1",
        "Family concerns",
        "Accidents/violations",
        "Getting lost"
      ],
      resources: "DMV medical review, driving evaluation"
    },
    
    caregiverSupport: {
      education: "Disease progression, behavior management",
      respite: "Day programs, in-home care",
      support: "Support groups, counseling",
      stress: "Zarit scale >24 suggests high burden"
    }
  },

  // DELIRIUM PREVENTION & MANAGEMENT
  delirium: {
    title: "Delirium Prevention and Management - 2023 AGS",
    
    prevention: {
      HELP: {
        orientation: "Orientation board, calendar, clock",
        sleep: "Minimize nighttime disruptions",
        mobilization: "Out of bed TID, walk daily",
        vision: "Glasses and adequate lighting",
        hearing: "Hearing aids, remove cerumen",
        hydration: "1500mL daily minimum",
        cognitive: "Cognitive activities TID"
      },
      
      medication: {
        review: "All medications daily",
        avoid: [
          "Benzodiazepines",
          "Anticholinergics",
          "Meperidine",
          "H2 blockers",
          "Tricyclic antidepressants"
        ],
        consider: "Melatonin 3mg HS for sleep"
      }
    },
    
    management: {
      nonPharmacologic: {
        first: "Always try before medications",
        interventions: [
          "Frequent reorientation",
          "Family presence",
          "Remove restraints",
          "Address pain",
          "Treat constipation",
          "Maintain day-night cycle"
        ]
      },
      
      pharmacologic: {
        indication: "Severe agitation threatening safety",
        firstLine: "Haloperidol 0.25-0.5mg PO/IM/IV",
        alternative: "Quetiapine 12.5-25mg PO",
        avoid: "Benzodiazepines except alcohol withdrawal",
        duration: "Shortest possible"
      }
    },
    
    specialSituations: {
      ICU: "ABCDEF bundle",
      surgery: "Regional > general anesthesia",
      alcohol: "Benzodiazepines appropriate",
      Parkinson: "Quetiapine preferred over haloperidol"
    }
  },

  // FALLS PREVENTION
  falls: {
    title: "Falls Prevention - 2023 USPSTF/AGS Guidelines",
    
    screening: {
      annual: "All adults ≥65 years",
      questions: [
        "Any falls in past year?",
        "Fear of falling?",
        "Unsteadiness when walking?"
      ],
      tests: {
        TUG: ">12 seconds = high risk",
        gaitSpeed: "<0.8 m/s predicts disability",
        balance: "Single leg stand <5 seconds"
      }
    },
    
    multifactorialInterventions: {
      exercise: {
        types: "Balance, gait, strength training",
        frequency: "3x per week, progressive",
        programs: "Tai Chi, Otago Exercise Program",
        evidence: "25-30% reduction in falls"
      },
      
      medication: {
        review: "Especially psychotropics",
        targets: "Polypharmacy, benzos, hypnotics",
        vitamins: "Vitamin D 800-1000 IU daily"
      },
      
      environmental: {
        home: "Remove hazards, improve lighting",
        assistive: "Appropriate devices",
        footwear: "Non-slip, low heel"
      },
      
      vision: {
        assessment: "Annual eye exam",
        cataracts: "Surgery if affecting function",
        glasses: "Single vision for mobility"
      }
    },
    
    specificInterventions: {
      proven: [
        "Vitamin D supplementation",
        "Medication review and modification",
        "Home hazard assessment and modification",
        "Exercise programs (especially Tai Chi)"
      ],
      
      uncertain: [
        "Cognitive training",
        "Cardiac pacing for vasovagal",
        "Hip protectors"
      ]
    }
  },

  // POLYPHARMACY MANAGEMENT
  polypharmacy: {
    title: "Medication Management - 2023 AGS Beers Criteria",
    
    inappropriateMedications: {
      alwaysAvoid: {
        antihistamines: [
          "Diphenhydramine",
          "Chlorpheniramine",
          "Promethazine"
        ],
        benzos: [
          "Diazepam",
          "Chlordiazepoxide",
          "Flurazepam"
        ],
        TCAs: [
          "Amitriptyline",
          "Imipramine",
          "Doxepin >6mg"
        ],
        analgesics: [
          "Meperidine",
          "Pentazocine",
          "Indomethacin"
        ],
        others: [
          "Muscle relaxants",
          "Sliding scale insulin alone",
          "Desmopressin"
        ]
      },
      
      diseaseSpecific: {
        dementia: [
          "All anticholinergics",
          "Benzodiazepines",
          "H2 receptor blockers",
          "Zolpidem"
        ],
        falls: [
          "Benzodiazepines",
          "Antipsychotics",
          "Tricyclic antidepressants"
        ],
        CKD: [
          "NSAIDs",
          "Metformin if eGFR <30",
          "Triamterene"
        ]
      }
    },
    
    deprescribing: {
      candidates: [
        "Medications without clear indication",
        "Duplicate therapy",
        "Inappropriate duration",
        "Adverse effects > benefits",
        "Drug interactions"
      ],
      
      process: {
        review: "Complete medication list",
        prioritize: "Highest risk first",
        plan: "Gradual tapering schedule",
        monitor: "Withdrawal symptoms",
        document: "Rationale and monitoring plan"
      },
      
      barriers: {
        prescriber: "Knowledge, time, confidence",
        patient: "Fear, beliefs about medications",
        system: "Fragmented care"
      }
    },
    
    START_criteria: {
      cardiovascular: [
        "Statin in diabetes with major CV risk factors",
        "ACE inhibitor in CHF",
        "Beta blocker in stable CHF",
        "Antiplatelet in established CVD"
      ],
      
      respiratory: [
        "Inhaled beta-2 agonist in COPD",
        "Inhaled corticosteroid in severe COPD"
      ],
      
      CNS: [
        "L-DOPA in idiopathic Parkinson's",
        "Antidepressant in persistent major depression"
      ],
      
      musculoskeletal: [
        "Vitamin D in patients with history of falls",
        "Bisphosphonate in T-score <-2.5"
      ]
    }
  },

  // DEPRESSION GUIDELINES
  depression: {
    title: "Late-Life Depression - 2023 APA Guidelines",
    
    screening: {
      tools: [
        "GDS-15 (≥5 suggests depression)",
        "PHQ-9 (≥10 moderate depression)",
        "PHQ-2 for screening"
      ],
      frequency: "Annual, more if risk factors"
    },
    
    treatment: {
      psychotherapy: {
        firstLine: "CBT, IPT, PST",
        evidence: "Equal to medication",
        maintenance: "Monthly sessions"
      },
      
      pharmacotherapy: {
        firstLine: [
          "Sertraline 25-50mg daily",
          "Escitalopram 5-10mg daily",
          "Citalopram 10-20mg daily (max 20mg >60y)"
        ],
        
        secondLine: [
          "Mirtazapine 7.5-30mg HS",
          "Venlafaxine ER 37.5mg daily",
          "Duloxetine 30mg daily"
        ],
        
        avoid: [
          "Paroxetine (anticholinergic)",
          "Tricyclics (unless neuropathic pain)",
          "St. John's Wort (interactions)"
        ]
      },
      
      combination: "Therapy + medication most effective",
      duration: "Continue 6-12 months after remission"
    },
    
    specialConsiderations: {
      medicalIllness: "Depression worsens medical outcomes",
      polypharmacy: "Careful drug interactions",
      suicidality: "Higher risk in elderly men",
      psychotic: "Consider antipsychotic addition"
    }
  },

  // OSTEOPOROSIS GUIDELINES
  osteoporosis: {
    title: "Osteoporosis - 2022 Endocrine Society",
    
    screening: {
      DEXA: {
        women: "Age 65",
        men: "Age 70",
        earlier: "If risk factors"
      },
      
      FRAX: {
        use: "10-year fracture risk",
        treat: "≥20% major fracture or ≥3% hip fracture"
      }
    },
    
    treatment: {
      lifestyle: [
        "Calcium 1200mg daily (diet + supplement)",
        "Vitamin D 800-1000 IU daily",
        "Weight-bearing exercise",
        "Fall prevention"
      ],
      
      firstLine: {
        postmenopausal: "Alendronate 70mg weekly",
        men: "Alendronate or zoledronic acid",
        alternative: "Risedronate if GI intolerance"
      },
      
      secondLine: [
        "Denosumab 60mg SC q6 months",
        "Zoledronic acid 5mg IV yearly",
        "Teriparatide if severe"
      ],
      
      duration: {
        bisphosphonates: "5-10 years, then reassess",
        drugHoliday: "Consider after 5 years low risk",
        denosumab: "No holiday due to rebound"
      }
    },
    
    monitoring: {
      DEXA: "Every 2 years",
      biomarkers: "CTX, P1NP for monitoring",
      AEs: "Osteonecrosis jaw, atypical fractures"
    }
  }
};

export default ClinicalGuidelines;