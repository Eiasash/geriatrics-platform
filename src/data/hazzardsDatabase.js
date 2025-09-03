// Hazzard's Geriatrics - Rapid Review Database
// Evidence-based quick reference for geriatric care

export const hazzardsDatabase = {
  emergencyProtocols: {
    delirium: {
      title: "Delirium (EMERGENCY)",
      cam: {
        criteria: "Acute + Inattention + (Disorganized thinking OR Altered LOC)",
        components: [
          "1. Acute onset & fluctuating course",
          "2. Inattention (can't count backwards from 20)",
          "3. Disorganized thinking (confused speech)",
          "4. Altered level of consciousness"
        ]
      },
      orders: [
        "UA (UTI #1 cause)",
        "CBC with diff",
        "BMP (Na, glucose)",
        "Medication review",
        "Hold benzos/anticholinergics",
        "Consider head CT if fall/anticoag"
      ],
      mnemonic: {
        title: "DELIRIUM",
        items: [
          "D - Drugs (benzos, anticholinergics)",
          "E - Electrolytes (Na, Ca)",
          "L - Low O2 (check pulse ox)",
          "I - Infection (UTI, pneumonia)",
          "R - Retention (bladder/stool)",
          "I - Intracranial (stroke, subdural)",
          "U - Uremia",
          "M - Myocardial (MI, CHF)"
        ]
      }
    },
    
    falls: {
      title: "Falls Protocol",
      assessment: {
        timedUpAndGo: ">12 seconds = high risk",
        checks: [
          "Orthostatics (>20/10 drop)",
          "Vision screening",
          "Foot exam (sensation, deformity)",
          "Medication count (>4 = risk)",
          "Home safety eval"
        ]
      },
      highRiskMeds: [
        "Benzos (2.7x risk)",
        "Antipsychotics (2x risk)",
        "Antidepressants (1.7x risk)",
        "Anticonvulsants"
      ],
      interventions: [
        "Vitamin D 800 IU daily",
        "Exercise program (Tai Chi)",
        "Home modifications",
        "Med reduction"
      ],
      redFlag: "Never attribute to 'just old age'"
    },
    
    polypharmacy: {
      title: "Polypharmacy Hit List",
      dangerousCombos: [
        {
          drugs: "Benzos",
          effect: "Falls/delirium",
          alternative: "Melatonin, trazodone"
        },
        {
          drugs: "Anticholinergics",
          effect: "Confusion/retention",
          alternative: "Avoid if possible"
        },
        {
          drugs: "NSAIDs",
          effect: "Renal failure/GI bleed",
          alternative: "Acetaminophen, topical"
        },
        {
          drugs: "PPIs >8 weeks",
          effect: "C.diff, fractures, B12 def",
          alternative: "H2 blockers PRN"
        }
      ],
      beersTop5: [
        "Benzos (any)",
        "Z-drugs (zolpidem)",
        "First-gen antihistamines",
        "Muscle relaxants",
        "Sliding scale insulin alone"
      ]
    }
  },

  coreTopics: {
    dementia: {
      title: "Dementia",
      workup: [
        "CBC, CMP, TSH, B12",
        "RPR/VDRL if indicated",
        "MRI > CT (see hippocampal atrophy)",
        "No routine ApoE testing"
      ],
      medications: {
        cholinesteraseInhibitors: {
          drugs: ["Donepezil", "Rivastigmine", "Galantamine"],
          benefit: "3-point MMSE improvement",
          sideEffects: "Bradycardia, GI upset, vivid dreams"
        },
        memantine: {
          indication: "Moderate-severe (add to ChEI)",
          dose: "5mg daily → 10mg BID over 4 weeks"
        }
      },
      behavioral: {
        firstLine: "Non-pharm (redirect, routine, calm)",
        avoid: "Benzos (paradoxical agitation)",
        emergency: "Haloperidol 0.5mg (black box warning)"
      }
    },

    incontinence: {
      title: "Incontinence",
      types: {
        stress: {
          cause: "Weak pelvic floor",
          symptoms: "Leak with cough/sneeze",
          treatment: "Kegels, pessary, surgery"
        },
        urge: {
          cause: "Detrusor overactivity",
          symptoms: "Sudden urge, frequency",
          treatment: "Bladder training, antimuscarinics"
        },
        overflow: {
          cause: "Outlet obstruction/atonic bladder",
          symptoms: "Dribbling, high PVR >200mL",
          treatment: "Catheter, alpha-blockers (men)"
        },
        functional: {
          cause: "Cognitive/mobility issues",
          symptoms: "Can't get to bathroom",
          treatment: "Scheduled toileting, bedside commode"
        }
      },
      redFlag: "New incontinence = r/o cord compression"
    },

    osteoporosis: {
      title: "Osteoporosis",
      screening: {
        who: "Women 65+, Men 70+",
        test: "DEXA scan",
        tScore: {
          normal: "> -1.0",
          osteopenia: "-1.0 to -2.5",
          osteoporosis: "< -2.5"
        }
      },
      frax: {
        treatIf: {
          hipFracture: ">3%",
          majorFracture: ">20%"
        }
      },
      treatment: {
        firstLine: "Bisphosphonates (alendronate weekly)",
        duration: "5 years then holiday",
        monitoring: "DEXA q2 years",
        calcium: "1200mg daily (diet + supplement)",
        vitaminD: "800-1000 IU daily"
      }
    },

    pressure: {
      title: "Pressure Injuries",
      stages: [
        "1: Non-blanchable erythema",
        "2: Partial thickness (blisters)",
        "3: Full thickness (fat visible)",
        "4: Muscle/bone visible",
        "Unstageable: Covered by eschar",
        "DTI: Purple/maroon intact skin"
      ],
      prevention: {
        turn: "Q2h (set timer!)",
        skin: "Moisturize, protect",
        nutrition: "Protein 1.2-1.5 g/kg",
        surfaces: "Pressure-relieving mattress"
      },
      treatment: {
        clean: "Saline (not hydrogen peroxide)",
        moist: "Hydrocolloid/foam dressings",
        debride: "If necrotic (not stable heel eschar)",
        offload: "Critical - no pressure"
      }
    },

    endOfLife: {
      title: "End of Life",
      prognosticTools: {
        surprise: "Would you be surprised if died in 12 months?",
        palliativePerformance: "PPS <50% = weeks-months"
      },
      symptomManagement: {
        pain: {
          mild: "Acetaminophen 650mg q6h",
          moderate: "Tramadol 25mg q6h",
          severe: "Morphine 2.5mg q4h"
        },
        dyspnea: {
          nonPharm: "Fan, positioning, oxygen",
          pharm: "Morphine 2.5mg SL/SC"
        },
        secretions: {
          drug: "Glycopyrrolate 0.2mg SC",
          alternative: "Scopolamine patch"
        },
        agitation: {
          drug: "Haloperidol 0.5-1mg",
          alternative: "Lorazepam 0.5mg"
        }
      },
      activelyDying: [
        "Cheyne-Stokes breathing",
        "Death rattle",
        "Mottling",
        "Decreased urine",
        "Altered consciousness"
      ]
    }
  },

  quickDosing: {
    title: "Geriatric Dosing Adjustments",
    principles: [
      "Start low, go slow",
      "But don't stop (treat to target)",
      "Creatinine misleading (use CrCl)",
      "Check drug levels when available"
    ],
    commonAdjustments: {
      metformin: {
        normal: "500mg BID",
        elderly: "Start 500mg daily",
        renal: "Avoid if eGFR <30"
      },
      lisinopril: {
        normal: "10mg daily",
        elderly: "Start 2.5mg daily",
        max: "40mg (rarely need more)"
      },
      amlodipine: {
        normal: "5mg daily",
        elderly: "Start 2.5mg daily",
        sideEffect: "Watch for edema"
      },
      haloperidol: {
        normal: "2-5mg",
        elderly: "0.25-0.5mg",
        warning: "Black box - increase mortality"
      },
      lorazepam: {
        normal: "1-2mg",
        elderly: "0.25-0.5mg",
        note: "If must use benzo, shortest acting"
      }
    }
  },

  assessmentTools: {
    cognitiveScreens: {
      miniCog: {
        components: ["3-word recall", "Clock draw"],
        scoring: "0-2 recall + abnormal clock = positive",
        time: "3 minutes"
      },
      moca: {
        cutoff: "<26 suggests impairment",
        adjustment: "+1 point if ≤12 years education",
        time: "10 minutes"
      },
      slums: {
        cutoff: {
          highSchool: "<27",
          lessHighSchool: "<25"
        },
        time: "7 minutes"
      }
    },
    
    functionalScreens: {
      adls: {
        basic: ["Bathing", "Dressing", "Toileting", "Transferring", "Continence", "Feeding"],
        scoring: "Loss of 1+ = need help"
      },
      iadls: {
        instrumental: ["Shopping", "Cooking", "Medications", "Finances", "Transportation", "Phone", "Housework", "Laundry"],
        significance: "Loss = can't live alone"
      }
    },
    
    frailty: {
      friedCriteria: [
        "Weight loss (>10 lbs/year)",
        "Exhaustion (self-reported)",
        "Weakness (grip strength)",
        "Slow walking (>6-7 sec for 15 ft)",
        "Low activity"
      ],
      interpretation: {
        "0": "Robust",
        "1-2": "Pre-frail",
        "3+": "Frail (poor outcomes)"
      }
    },
    
    depression: {
      phq2: {
        questions: [
          "Little interest or pleasure?",
          "Feeling down or hopeless?"
        ],
        positive: "Yes to either → do PHQ-9"
      },
      gds15: {
        cutoff: ">5 suggests depression",
        advantage: "Yes/no format easier for elderly"
      }
    }
  },

  redFlags: {
    title: "Never Miss These",
    critical: [
      {
        presentation: "New confusion",
        consider: "Delirium until proven otherwise",
        action: "Full delirium workup NOW"
      },
      {
        presentation: "New incontinence",
        consider: "Cord compression",
        action: "Rectal tone, emergent MRI"
      },
      {
        presentation: "Failure to thrive",
        consider: "Depression vs cancer",
        action: "PHQ-9, CBC, CMP, CT C/A/P"
      },
      {
        presentation: "Repeated falls",
        consider: "Parkinson's, NPH, subdural",
        action: "Neuro exam, head CT, gait assessment"
      },
      {
        presentation: "Weight loss >5%",
        consider: "Cancer, depression, dementia",
        action: "Full review, depression screen, consider CT"
      },
      {
        presentation: "New back pain + neuro",
        consider: "Compression fracture, mets",
        action: "X-ray, consider MRI"
      }
    ]
  },

  pearls: {
    title: "Clinical Pearls from Hazzard's",
    highYield: [
      "Creatinine 1.0 in 80yo = GFR ~50",
      "No 'sundowning' diagnosis - it's delirium",
      "Depression is NOT normal aging",
      "Sexual dysfunction matters - ask about it",
      "Thyroid disease presents atypically",
      "UTI overdiagnosed - asymptomatic bacteriuria common",
      "Appetite loss = medical problem, not aging",
      "Hearing aids reduce dementia risk 25%",
      "Exercise = best intervention for everything",
      "Goals of care before procedures"
    ]
  },

  quickProtocols: {
    admissionOrders: {
      title: "Geriatric Admission Orders",
      orders: [
        "Fall precautions",
        "DVT prophylaxis (unless contraindicated)",
        "Bowel protocol (senna + docusate)",
        "Hold home benzos/sleep aids",
        "Nutrition consult if BMI <22",
        "PT/OT eval",
        "Code status discussion",
        "Delirium precautions",
        "Pressure ulcer prevention"
      ]
    },
    
    dischargeChecklist: {
      title: "Safe Discharge Checklist",
      items: [
        "Med rec (≤5 meds ideal)",
        "Follow-up within 7 days",
        "PT/OT recommendations done",
        "Home safety eval",
        "Caregiver education",
        "Clear written instructions",
        "Equipment ordered",
        "Transport arranged",
        "PCP notified"
      ]
    }
  }
};

// Quick lookup functions
export const getEmergencyProtocol = (condition) => {
  return hazzardsDatabase.emergencyProtocols[condition.toLowerCase()] || null;
};

export const getDrugDosing = (drug) => {
  const dosing = hazzardsDatabase.quickDosing.commonAdjustments;
  return dosing[drug.toLowerCase()] || null;
};

export const getAssessmentTool = (tool) => {
  const tools = hazzardsDatabase.assessmentTools;
  for (const category of Object.values(tools)) {
    if (category[tool]) return category[tool];
  }
  return null;
};

export const getRedFlags = () => {
  return hazzardsDatabase.redFlags.critical;
};

export const searchHazzards = (query) => {
  const results = [];
  const searchTerm = query.toLowerCase();
  
  // Search through all sections
  const searchObject = (obj, path = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        if (value.toLowerCase().includes(searchTerm)) {
          results.push({
            path: path + key,
            value: value,
            relevance: value.toLowerCase().indexOf(searchTerm) === 0 ? 'high' : 'medium'
          });
        }
      } else if (typeof value === 'object' && value !== null) {
        searchObject(value, path + key + ' > ');
      }
    }
  };
  
  searchObject(hazzardsDatabase);
  return results.slice(0, 10); // Return top 10 results
};

export default hazzardsDatabase;