// Comprehensive Geriatric Medicine Textbook
// Based on Hazzard's Geriatric Medicine 8e, Harrison's, and GRS

const GeriatricTextbook = {
  chapters: {
    1: {
      title: "Comprehensive Geriatric Assessment",
      content: {
        introduction: `The Comprehensive Geriatric Assessment (CGA) is a multidimensional, interdisciplinary diagnostic process to determine the medical, psychological, and functional capabilities of older persons. It develops a coordinated plan to maximize overall health with aging.`,
        
        components: {
          medical: {
            title: "Medical Assessment",
            elements: [
              "Problem list review",
              "Medication reconciliation (Beers Criteria)",
              "Nutritional status (MNA-SF)",
              "Urinary continence",
              "Sexual function",
              "Vision/hearing",
              "Dentition",
              "Mood and cognition"
            ],
            detail: `Medical assessment begins with thorough history taking. In elderly patients, collateral history from caregivers is essential. Review all medications including OTC and supplements. Apply START/STOPP criteria for appropriate prescribing. Assess for geriatric syndromes: falls, incontinence, cognitive impairment, polypharmacy, weight loss.`
          },
          
          functional: {
            title: "Functional Status",
            ADL: {
              basic: ["Bathing", "Dressing", "Toileting", "Transferring", "Continence", "Feeding"],
              scoring: "Katz Index: 6 = independent, 4 = moderate impairment, ≤2 = severe impairment"
            },
            IADL: {
              instrumental: ["Telephone", "Shopping", "Food prep", "Housekeeping", "Laundry", "Transport", "Medications", "Finances"],
              scoring: "Lawton Scale: 8 = high function, <8 indicates need for support"
            },
            mobility: {
              tests: {
                "Timed Up and Go": ">12 seconds = fall risk",
                "Gait Speed": "<0.8 m/s predicts disability",
                "Chair Stand": "<3 in 30 seconds = weakness",
                "Tandem Stand": "<10 seconds = balance impairment"
              }
            }
          },
          
          cognitive: {
            title: "Cognitive Assessment",
            screening: {
              "Mini-Cog": {
                components: ["3-word recall", "Clock drawing"],
                scoring: "≤2 suggests impairment",
                time: "3 minutes"
              },
              "MOCA": {
                domains: ["Visuospatial", "Naming", "Memory", "Attention", "Language", "Abstraction", "Delayed recall", "Orientation"],
                scoring: "<26 abnormal (adjust for education)",
                time: "10 minutes"
              },
              "MMSE": {
                domains: ["Orientation", "Registration", "Attention", "Recall", "Language", "Construction"],
                scoring: "24-30 normal, 18-23 mild, 10-17 moderate, <10 severe",
                time: "7 minutes"
              }
            }
          },
          
          psychological: {
            title: "Mood and Affect",
            depression: {
              "GDS-15": {
                cutoff: "≥5 suggests depression",
                questions: "Yes/No format, self-administered"
              },
              "PHQ-9": {
                cutoff: "≥10 moderate depression",
                monitoring: "Useful for tracking treatment response"
              }
            },
            anxiety: {
              "GAD-7": {
                cutoff: "≥10 moderate anxiety",
                domains: "Worry, restlessness, fatigue, concentration"
              }
            }
          },
          
          social: {
            title: "Social Assessment",
            domains: [
              "Living situation and safety",
              "Caregiver availability and stress",
              "Elder abuse screening",
              "Financial resources",
              "Advance directives",
              "Social isolation (UCLA-3)"
            ],
            redFlags: [
              "Lives alone with cognitive impairment",
              "Caregiver burnout (Zarit scale >24)",
              "Financial exploitation",
              "Social isolation",
              "Unsafe home environment"
            ]
          }
        },
        
        outcomes: {
          benefits: [
            "Reduced mortality (NNT = 33)",
            "Decreased nursing home admissions (NNT = 20)",
            "Improved function",
            "Better medication management",
            "Enhanced quality of life"
          ],
          implementation: {
            inpatient: "ACE units (Acute Care for Elders)",
            outpatient: "Geriatric evaluation and management clinics",
            home: "Home-based primary care programs"
          }
        }
      }
    },
    
    2: {
      title: "Major Geriatric Syndromes",
      content: {
        delirium: {
          title: "Delirium",
          definition: "Acute confusional state with fluctuating consciousness and inattention",
          
          epidemiology: {
            incidence: "11-42% of hospitalized elderly",
            mortality: "22-76% one-year mortality",
            outcomes: "2.5x increased risk of death, 12x risk of dementia"
          },
          
          pathophysiology: {
            mechanisms: [
              "Cholinergic deficiency",
              "Dopamine excess",
              "Inflammatory cytokines (IL-1, IL-6, TNF-α)",
              "Cortisol dysregulation",
              "Neurotransmitter imbalance"
            ],
            precipitants: {
              infections: "UTI (25%), pneumonia (15%)",
              medications: "Anticholinergics, benzos, opioids, steroids",
              metabolic: "Hyponatremia, hypoglycemia, uremia",
              cardiovascular: "MI, CHF, arrhythmia",
              neurologic: "Stroke, seizure, head trauma"
            }
          },
          
          diagnosis: {
            CAM: {
              feature1: "Acute onset and fluctuating course",
              feature2: "Inattention (digit span, months backward)",
              feature3: "Disorganized thinking",
              feature4: "Altered consciousness",
              positive: "Feature 1 AND 2 AND (3 OR 4)"
            },
            subtypes: {
              hyperactive: "25% - agitation, hallucinations",
              hypoactive: "50% - withdrawal, lethargy (worse prognosis)",
              mixed: "25% - fluctuates between types"
            }
          },
          
          workup: {
            immediate: [
              "Vital signs including O2 sat",
              "Fingerstick glucose",
              "Medication review"
            ],
            laboratory: [
              "CBC with differential",
              "BMP (Na, glucose, BUN/Cr)",
              "LFTs if hepatic encephalopathy suspected",
              "TSH if not checked in 6 months",
              "B12 if nutritional concerns",
              "Urinalysis with culture",
              "Blood cultures if fever",
              "ABG if hypoxia",
              "Ammonia if cirrhosis",
              "Drug levels (digoxin, lithium)"
            ],
            imaging: [
              "CXR if respiratory symptoms",
              "Head CT if: focal findings, trauma, anticoagulation",
              "EEG if seizure suspected",
              "LP if meningitis/encephalitis suspected"
            ]
          },
          
          management: {
            nonPharmacologic: {
              HELP: [
                "Orientation protocols TID",
                "Sleep enhancement (warm milk, massage, music)",
                "Early mobilization",
                "Vision/hearing aids",
                "Hydration (1500mL/day minimum)",
                "Family presence"
              ],
              environment: [
                "Natural lighting",
                "Clocks and calendars visible",
                "Minimize room changes",
                "Consistent caregivers",
                "Reduce noise at night"
              ]
            },
            pharmacologic: {
              firstLine: {
                drug: "Haloperidol",
                dose: "0.25-0.5mg PO/IM/IV",
                frequency: "Q4-6h PRN, max 3mg/day",
                monitoring: "QTc, EPS"
              },
              alternative: {
                drug: "Quetiapine",
                dose: "12.5-25mg PO",
                frequency: "BID, max 100mg/day",
                advantage: "Less EPS, useful in Parkinson's"
              },
              avoid: [
                "Benzodiazepines (except alcohol withdrawal)",
                "Diphenhydramine",
                "Meperidine"
              ]
            }
          },
          
          prevention: {
            multicomponent: [
              "Avoid polypharmacy",
              "Maintain hydration",
              "Prevent constipation",
              "Early mobilization",
              "Optimize sensory input",
              "Promote sleep hygiene"
            ],
            riskStratification: {
              high: "Age >80, dementia, severity of illness, vision impairment",
              moderate: "Age 70-80, mild cognitive impairment, multiple medications",
              interventions: "Target high-risk with proactive HELP protocol"
            }
          }
        },
        
        dementia: {
          title: "Dementia",
          definition: "Progressive cognitive decline interfering with independence",
          
          epidemiology: {
            prevalence: "5% at 71-79y, 24% at 80-89y, 37% >90y",
            types: {
              alzheimer: "60-80% of cases",
              vascular: "15-20%",
              lewy: "10-15%",
              frontotemporal: "5-10%",
              mixed: "Common in very old"
            }
          },
          
          diagnosis: {
            DSM5: {
              majorNeurocognitive: [
                "Significant cognitive decline",
                "Interferes with independence",
                "Not due to delirium",
                "Not better explained by other disorder"
              ]
            },
            workup: {
              required: [
                "CBC, BMP, LFTs",
                "TSH, B12",
                "Syphilis serology",
                "HIV if risk factors",
                "Brain imaging (MRI preferred)"
              ],
              optional: [
                "LP if rapid progression",
                "EEG if seizures",
                "PET scan if unclear diagnosis",
                "Genetic testing (APP, PSEN1, PSEN2)"
              ]
            }
          },
          
          alzheimerDisease: {
            stages: {
              mild: {
                MMSE: "20-24",
                features: "Memory loss, word finding, getting lost",
                function: "IADL impaired, ADL intact",
                duration: "2-4 years"
              },
              moderate: {
                MMSE: "10-19",
                features: "Behavioral changes, delusions, agitation",
                function: "ADL impairment, needs supervision",
                duration: "2-10 years"
              },
              severe: {
                MMSE: "<10",
                features: "Minimal speech, incontinence, dysphagia",
                function: "Total dependence",
                duration: "1-3 years"
              }
            },
            treatment: {
              cholinesterase: {
                drugs: ["Donepezil 5-10mg QD", "Rivastigmine 1.5-6mg BID or patch", "Galantamine 4-12mg BID"],
                indication: "Mild to moderate",
                benefit: "Modest, 6-12 month delay in progression",
                sideEffects: "GI upset, bradycardia, syncope"
              },
              memantine: {
                dose: "5mg daily, titrate to 10mg BID",
                indication: "Moderate to severe",
                benefit: "Modest functional improvement",
                combination: "Can combine with cholinesterase inhibitor"
              }
            }
          },
          
          vascularDementia: {
            criteria: [
              "Cognitive impairment",
              "Cerebrovascular disease on imaging",
              "Temporal relationship or stepwise progression"
            ],
            prevention: [
              "BP control (target <130/80)",
              "Antiplatelet therapy",
              "Statin therapy",
              "Diabetes management"
            ]
          },
          
          lewyBody: {
            core: [
              "Fluctuating cognition",
              "Visual hallucinations",
              "REM sleep behavior disorder",
              "Parkinsonism"
            ],
            management: {
              avoid: "Antipsychotics (severe sensitivity)",
              use: "Rivastigmine, quetiapine if needed"
            }
          },
          
          behavioral: {
            nonPharmacologic: {
              DICE: [
                "Describe the behavior",
                "Investigate causes",
                "Create a plan",
                "Evaluate effectiveness"
              ],
              interventions: [
                "Structured routine",
                "Music therapy",
                "Pet therapy",
                "Aromatherapy",
                "Validation therapy"
              ]
            },
            pharmacologic: {
              agitation: "SSRI first line, avoid antipsychotics",
              sleep: "Melatonin 3-6mg, trazodone 25-50mg",
              depression: "Sertraline, citalopram (max 20mg)"
            }
          }
        },
        
        falls: {
          title: "Falls and Gait Disorders",
          
          epidemiology: {
            incidence: "30% >65y fall annually, 50% >80y",
            consequences: {
              injury: "10% major injury, 1% hip fracture",
              mortality: "Leading cause of injury death >65y",
              fear: "50% develop fear of falling",
              cost: "$50 billion annually in US"
            }
          },
          
          riskFactors: {
            intrinsic: [
              "Previous falls (RR 2.8)",
              "Gait/balance impairment (RR 2.4)",
              "Muscle weakness (RR 2.1)",
              "Visual impairment (RR 2.0)",
              "Arthritis (RR 1.9)",
              "Cognitive impairment (RR 1.8)",
              "Depression (RR 1.7)",
              "Orthostatic hypotension (RR 1.5)"
            ],
            extrinsic: [
              "Medications (>4 drugs, psychotropics)",
              "Environmental hazards (rugs, poor lighting)",
              "Footwear (slippers, high heels)",
              "Assistive device misuse"
            ]
          },
          
          assessment: {
            history: {
              circumstances: "When, where, what doing, symptoms",
              frequency: "Single vs recurrent",
              consequences: "Injury, fear, activity restriction"
            },
            examination: {
              cardiovascular: [
                "Orthostatic vitals (3 positions)",
                "Cardiac auscultation",
                "Carotid bruits"
              ],
              neurologic: [
                "Strength testing",
                "Sensation (proprioception, vibration)",
                "Reflexes",
                "Cerebellar testing",
                "Parkinson signs"
              ],
              musculoskeletal: [
                "Joint range of motion",
                "Foot examination",
                "Spine assessment"
              ],
              functional: {
                "Timed Up and Go": {
                  procedure: "Rise from chair, walk 3m, turn, return, sit",
                  normal: "<10 seconds",
                  fallRisk: ">12 seconds"
                },
                "30-Second Chair Stand": {
                  procedure: "Stand from chair repeatedly",
                  normal: ">12 for women, >14 for men"
                },
                "4-Stage Balance": {
                  stages: ["Feet together", "Semi-tandem", "Tandem", "One leg"],
                  abnormal: "Unable to hold 10 seconds"
                }
              }
            }
          },
          
          interventions: {
            exercise: {
              types: [
                "Tai Chi (30% reduction)",
                "Balance training",
                "Strength training",
                "Gait training"
              ],
              prescription: "3x/week, progressive intensity"
            },
            medication: {
              review: [
                "Reduce polypharmacy",
                "Taper psychotropics",
                "Adjust antihypertensives",
                "Vitamin D 800-1000 IU daily"
              ]
            },
            environmental: {
              home: [
                "Remove throw rugs",
                "Install grab bars",
                "Improve lighting",
                "Fix uneven surfaces",
                "Organize commonly used items"
              ]
            },
            multifactorial: {
              components: "Exercise + medication review + environmental modification",
              effectiveness: "25-30% reduction in falls"
            }
          }
        },
        
        frailty: {
          title: "Frailty",
          
          definition: "Vulnerability to stressors due to decreased physiologic reserve",
          
          models: {
            phenotype: {
              criteria: [
                "Unintentional weight loss (>10 lbs/year)",
                "Self-reported exhaustion",
                "Weakness (grip <26kg men, <18kg women)",
                "Slow walking (>6-7 sec for 4.6m)",
                "Low physical activity"
              ],
              classification: {
                robust: "0 criteria",
                prefrail: "1-2 criteria",
                frail: "≥3 criteria"
              }
            },
            deficitAccumulation: {
              tool: "Frailty Index",
              calculation: "Deficits present / Total deficits assessed",
              threshold: ">0.25 = frail"
            },
            clinicalScale: {
              CFS: [
                "1 - Very fit",
                "2 - Well",
                "3 - Managing well",
                "4 - Vulnerable",
                "5 - Mildly frail",
                "6 - Moderately frail",
                "7 - Severely frail",
                "8 - Very severely frail",
                "9 - Terminally ill"
              ]
            }
          },
          
          pathophysiology: {
            mechanisms: [
              "Chronic inflammation (IL-6, CRP)",
              "Hormonal dysregulation (testosterone, GH, IGF-1)",
              "Mitochondrial dysfunction",
              "Cellular senescence",
              "Protein-energy malnutrition"
            ]
          },
          
          interventions: {
            exercise: {
              resistance: "2-3x/week, progressive",
              aerobic: "150 min/week moderate intensity",
              balance: "Tai Chi, yoga",
              multicomponent: "Most effective"
            },
            nutrition: {
              protein: "1.2-1.5 g/kg/day",
              calories: "25-30 kcal/kg/day",
              supplementation: "ONS if intake inadequate",
              mediterranean: "May prevent frailty"
            },
            comprehensive: {
              CGA: "Identify and address deficits",
              care: "Geriatrician-led teams",
              goals: "Patient-centered care planning"
            }
          },
          
          outcomes: {
            mortality: "1.5-3x increased risk",
            hospitalization: "2x increased risk",
            disability: "2.5x increased risk",
            institutionalization: "3x increased risk"
          }
        },
        
        incontinence: {
          title: "Urinary Incontinence",
          
          prevalence: "15-35% community dwelling, 50% nursing home",
          
          types: {
            stress: {
              mechanism: "Urethral hypermobility, sphincter deficiency",
              symptoms: "Leakage with cough, sneeze, exercise",
              treatment: [
                "Pelvic floor exercises (Kegels)",
                "Pessary",
                "Duloxetine 40mg BID",
                "Surgery (sling procedures)"
              ]
            },
            urge: {
              mechanism: "Detrusor overactivity",
              symptoms: "Urgency, frequency, nocturia",
              treatment: [
                "Bladder training",
                "Anticholinergics (avoid in cognitive impairment)",
                "Mirabegron 25-50mg daily",
                "OnabotulinumtoxinA injection"
              ]
            },
            overflow: {
              mechanism: "Outlet obstruction, detrusor underactivity",
              symptoms: "Dribbling, incomplete emptying",
              treatment: [
                "Treat obstruction (BPH)",
                "Alpha blockers",
                "Intermittent catheterization",
                "Indwelling catheter if severe"
              ]
            },
            functional: {
              mechanism: "Physical/cognitive impairment",
              symptoms: "Unable to reach toilet",
              treatment: [
                "Scheduled toileting",
                "Bedside commode",
                "Absorbent products",
                "Environmental modifications"
              ]
            }
          },
          
          evaluation: {
            history: {
              characterize: "Type, frequency, volume, triggers",
              impact: "QOL, social isolation, skin breakdown",
              review: "Medications, medical conditions"
            },
            examination: {
              abdominal: "Masses, distension",
              pelvic: "Prolapse, atrophy, masses",
              rectal: "Tone, prostate, stool impaction",
              neurologic: "Sensation, reflexes"
            },
            testing: {
              urinalysis: "R/O infection, hematuria",
              PVR: ">200mL suggests retention",
              urodynamics: "Complex cases",
              cystoscopy: "If hematuria or obstruction"
            }
          },
          
          management: {
            behavioral: [
              "Bladder diary",
              "Timed voiding q2-3h",
              "Double voiding",
              "Fluid management",
              "Caffeine reduction"
            ],
            medications: {
              anticholinergics: {
                avoid: ["Oxybutynin (cognitive impairment)"],
                prefer: ["Fesoterodine", "Solifenacin", "Trospium (doesn't cross BBB)"]
              },
              beta3: "Mirabegron - no anticholinergic effects"
            }
          }
        },
        
        polypharmacy: {
          title: "Polypharmacy",
          
          definition: "≥5 medications (some say ≥10)",
          prevalence: "40% >65y take ≥5 meds, 20% take ≥10",
          
          consequences: {
            adverse: "Risk increases exponentially with number",
            interactions: "50% risk with 5 drugs, 100% with 8+",
            adherence: "Complexity reduces compliance",
            cost: "Financial burden",
            outcomes: "Falls, hospitalization, mortality"
          },
          
          inappropriate: {
            beers: {
              alwaysAvoid: [
                "First-gen antihistamines",
                "Tertiary TCAs",
                "Long-acting benzos",
                "Meperidine",
                "Sliding scale insulin alone"
              ],
              conditionallyAvoid: {
                heartFailure: ["NSAIDs", "Diltiazem", "Verapamil"],
                falls: ["Benzos", "Antipsychotics", "TCAs"],
                dementia: ["Anticholinergics", "Benzos", "H2 blockers"],
                CKD: ["NSAIDs", "Metformin if eGFR<30"]
              }
            },
            STOPP: {
              examples: [
                "Duplicate drug class",
                "Drug without indication",
                "Drug beyond recommended duration",
                "Drug-drug interactions"
              ]
            },
            START: {
              examples: [
                "Statin in diabetes",
                "ACE inhibitor in CHF",
                "Antiplatelet in CAD",
                "Vitamin D in falls",
                "Bisphosphonate in osteoporosis"
              ]
            }
          },
          
          deprescribing: {
            process: [
              "Review all medications",
              "Identify potentially inappropriate",
              "Assess risk vs benefit",
              "Prioritize for discontinuation",
              "Plan tapering schedule",
              "Monitor for withdrawal/recurrence",
              "Document rationale"
            ],
            targets: {
              priority: [
                "No clear indication",
                "Duplicate therapy",
                "Adverse effects",
                "Minimal benefit",
                "Patient preference"
              ]
            },
            barriers: {
              provider: "Time, uncertainty, inertia",
              patient: "Beliefs, fear, attachment",
              system: "Fragmented care, poor communication"
            }
          }
        }
      }
    },
    
    3: {
      title: "Cardiovascular Disease in Elderly",
      content: {
        hypertension: {
          title: "Hypertension",
          
          epidemiology: "70% prevalence >65y, 90% lifetime risk",
          
          targets: {
            SPRINT: {
              intensive: "<120 mmHg SBP",
              standard: "<140 mmHg SBP",
              benefit: "25% reduction in CV events",
              caution: "More AKI, electrolyte abnormalities"
            },
            guidelines: {
              ACC_AHA: "<130/80 for most",
              frail: "Consider 140-150 SBP",
              orthostatic: "Standing SBP >110"
            }
          },
          
          treatment: {
            firstLine: {
              thiazides: "Chlorthalidone 12.5-25mg (preferred over HCTZ)",
              ACE: "Lisinopril 5-40mg daily",
              ARB: "Losartan 25-100mg daily",
              CCB: "Amlodipine 2.5-10mg daily"
            },
            combinations: {
              preferred: "ACE/ARB + CCB or thiazide",
              avoid: "ACE + ARB (hyperkalemia)",
              resistant: "Add spironolactone 25mg"
            },
            considerations: {
              startLow: "Half usual dose",
              titrateSlow: "Q4-6 weeks",
              monitor: "Orthostatics, electrolytes, creatinine"
            }
          }
        },
        
        heartFailure: {
          title: "Heart Failure",
          
          types: {
            HFrEF: {
              definition: "EF ≤40%",
              treatment: {
                GDMT: [
                  "Beta blocker (carvedilol, metoprolol succinate, bisoprolol)",
                  "ACE/ARB/ARNI",
                  "MRA (spironolactone)",
                  "SGLT2i (empagliflozin, dapagliflozin)"
                ],
                devices: "ICD if EF≤35%, CRT if QRS>130ms"
              }
            },
            HFpEF: {
              definition: "EF ≥50%",
              treatment: {
                diuretics: "For volume overload",
                SGLT2i: "Emerging evidence",
                comorbidities: "Treat HTN, AFib, CAD"
              }
            }
          },
          
          management: {
            acute: {
              assessment: "Volume status, perfusion",
              diuresis: "IV furosemide (2.5x oral dose)",
              monitoring: "Daily weights, I/O, electrolytes"
            },
            chronic: {
              monitoring: "Daily weights, sodium restriction",
              exercise: "Cardiac rehabilitation",
              palliative: "Consider early for symptom management"
            }
          }
        },
        
        atrialFibrillation: {
          title: "Atrial Fibrillation",
          
          prevalence: "10% >80 years",
          
          anticoagulation: {
            CHA2DS2VASc: {
              scoring: [
                "CHF - 1 point",
                "HTN - 1 point",
                "Age ≥75 - 2 points",
                "DM - 1 point",
                "Stroke/TIA - 2 points",
                "Vascular disease - 1 point",
                "Age 65-74 - 1 point",
                "Sex (female) - 1 point"
              ],
              management: {
                "0": "No anticoagulation",
                "1": "Consider anticoagulation",
                "≥2": "Anticoagulation recommended"
              }
            },
            
            DOACs: {
              apixaban: {
                standard: "5mg BID",
                reduced: "2.5mg BID if ≥2: age≥80, weight≤60kg, Cr≥1.5",
                advantages: "Lowest bleeding risk"
              },
              rivaroxaban: {
                standard: "20mg daily with food",
                reduced: "15mg if CrCl 15-50",
                caution: "Must take with largest meal"
              },
              dabigatran: {
                standard: "150mg BID",
                reduced: "110mg BID if >80y or bleeding risk",
                reversal: "Idarucizumab available"
              },
              edoxaban: {
                standard: "60mg daily",
                reduced: "30mg if CrCl 15-50, weight≤60kg",
                note: "Not for CrCl>95"
              }
            }
          },
          
          rateControl: {
            target: "<110 bpm (lenient)",
            agents: [
              "Beta blockers (first line)",
              "Non-DHP CCB (diltiazem, verapamil)",
              "Digoxin (adjunct only)",
              "Combination often needed"
            ]
          }
        }
      }
    },
    
    4: {
      title: "Neurocognitive Disorders",
      content: {
        mildCognitiveImpairment: {
          definition: "Cognitive decline without functional impairment",
          prevalence: "10-20% >65y",
          progression: "10-15% per year to dementia",
          
          evaluation: [
            "Detailed cognitive testing",
            "Functional assessment",
            "Rule out reversible causes",
            "Consider biomarkers"
          ],
          
          management: [
            "Cognitive training",
            "Physical exercise",
            "Mediterranean diet",
            "Social engagement",
            "Vascular risk factor control"
          ]
        },
        
        alzheimer: {
          pathology: {
            hallmarks: ["Amyloid plaques", "Neurofibrillary tangles"],
            stages: "Braak stages I-VI",
            genetics: "APOE4 increases risk 3-15x"
          },
          
          biomarkers: {
            CSF: "Low Aβ42, high tau",
            PET: "Amyloid and tau PET",
            blood: "Emerging (p-tau, Aβ42/40)"
          },
          
          treatment: {
            symptomatic: {
              cholinesterase: {
                donepezil: "5mg x4 weeks, then 10mg",
                rivastigmine: "1.5mg BID, increase q4 weeks to 6mg BID",
                galantamine: "4mg BID, increase q4 weeks to 12mg BID"
              },
              memantine: {
                titration: "5mg x1 week, 5mg BID x1 week, 5mg AM/10mg PM x1 week, then 10mg BID",
                combination: "Can add to cholinesterase inhibitor"
              }
            },
            diseaseModifying: {
              aducanumab: "Controversial approval, modest benefit",
              lecanemab: "27% slowing at 18 months",
              considerations: "Cost, ARIA risk, patient selection"
            }
          }
        },
        
        vascular: {
          types: [
            "Multi-infarct",
            "Strategic infarct",
            "Small vessel disease",
            "Hypoperfusion",
            "Hemorrhagic"
          ],
          
          prevention: {
            primary: [
              "BP control",
              "Lipid management",
              "Antiplatelet therapy",
              "Lifestyle modification"
            ],
            secondary: [
              "Aggressive risk factor control",
              "Antiplatelet or anticoagulation",
              "Carotid revascularization if indicated"
            ]
          }
        },
        
        lewyBody: {
          clinical: {
            core: [
              "Fluctuating cognition",
              "Visual hallucinations",
              "REM sleep behavior disorder",
              "Parkinsonism"
            ],
            supportive: [
              "Sensitivity to antipsychotics",
              "Autonomic dysfunction",
              "Falls",
              "Syncope",
              "Delusions"
            ]
          },
          
          management: {
            cognitive: "Rivastigmine preferred",
            psychotic: "Quetiapine if necessary",
            motor: "Levodopa cautiously",
            avoid: "All typical antipsychotics"
          }
        },
        
        frontotemporal: {
          variants: {
            behavioral: "Personality change, disinhibition",
            semantic: "Loss of word meaning",
            nonfluent: "Effortful speech, agrammatism"
          },
          
          genetics: "40% familial (C9orf72, MAPT, GRN)",
          
          management: {
            behavioral: "SSRIs for compulsions",
            speech: "Speech therapy",
            support: "Caregiver education crucial"
          }
        }
      }
    },
    
    5: {
      title: "Endocrine and Metabolic Disorders",
      content: {
        diabetes: {
          targets: {
            healthy: "A1C <7.5%",
            complex: "A1C <8%",
            frail: "A1C 8-8.5%",
            endOfLife: "Avoid symptomatic hyper/hypoglycemia"
          },
          
          management: {
            metformin: {
              starting: "500mg daily with food",
              titration: "Increase weekly to 2000mg",
              contraindications: "eGFR <30, acute illness",
              benefits: "No hypoglycemia, CV benefit"
            },
            
            newer: {
              SGLT2i: {
                drugs: ["Empagliflozin", "Dapagliflozin", "Canagliflozin"],
                benefits: "CV/renal protection, weight loss",
                risks: "UTI, euglycemic DKA, fractures"
              },
              GLP1: {
                drugs: ["Liraglutide", "Semaglutide", "Dulaglutide"],
                benefits: "Weight loss, CV benefit",
                caution: "GI side effects, cost"
              }
            },
            
            insulin: {
              basal: {
                starting: "0.1-0.2 units/kg or 10 units",
                titration: "Increase 2 units q3 days if FBG>130",
                types: ["Glargine", "Detemir", "Degludec"]
              },
              simplification: "Once daily basal often sufficient"
            }
          }
        },
        
        thyroid: {
          hypothyroidism: {
            prevalence: "20% >65y",
            subclinical: "TSH 4.5-10, normal T4",
            
            treatment: {
              starting: "25mcg daily (12.5mcg if CAD)",
              titration: "Increase q6-8 weeks",
              goal: "TSH 4-6 in >70y without symptoms",
              caution: "Can precipitate AFib, angina"
            }
          },
          
          hyperthyroidism: {
            causes: "Toxic nodule, Graves, amiodarone",
            presentation: "Often atypical - apathetic",
            
            treatment: {
              options: ["Methimazole", "RAI", "Surgery"],
              elderly: "RAI often preferred",
              betaBlockers: "For symptom control"
            }
          }
        },
        
        osteoporosis: {
          screening: "DEXA at 65 (women), 70 (men)",
          
          diagnosis: {
            Tscore: "≤-2.5 or fragility fracture",
            FRAX: "10-year fracture risk calculation"
          },
          
          treatment: {
            nonPharmacologic: [
              "Calcium 1200mg daily (diet + supplement)",
              "Vitamin D 800-1000 IU",
              "Weight bearing exercise",
              "Fall prevention"
            ],
            
            bisphosphonates: {
              alendronate: "70mg weekly",
              risedronate: "35mg weekly",
              zoledronic: "5mg IV yearly",
              duration: "5 years, then drug holiday"
            },
            
            alternatives: {
              denosumab: "60mg SC q6 months",
              teriparatide: "For severe osteoporosis",
              raloxifene: "Post-menopausal women"
            }
          }
        }
      }
    },
    
    6: {
      title: "Infections in Elderly",
      content: {
        UTI: {
          diagnosis: {
            criteria: "Symptoms + bacteriuria",
            symptoms: [
              "Dysuria, frequency, urgency",
              "Suprapubic pain",
              "New incontinence",
              "Gross hematuria"
            ],
            notSufficient: [
              "Bacteria without symptoms",
              "Pyuria alone",
              "Odor or cloudy urine",
              "Confusion alone (unless no other source)"
            ]
          },
          
          treatment: {
            uncomplicated: {
              firstLine: "Nitrofurantoin 100mg BID x5d",
              alternative: "TMP-SMX DS BID x3d",
              ifResistant: "Fosfomycin 3g once"
            },
            complicated: {
              oral: "Fluoroquinolone x7d",
              IV: "Ceftriaxone, then oral based on culture",
              duration: "7-14 days"
            },
            asymptomatic: "DO NOT TREAT (except pre-procedure)"
          }
        },
        
        pneumonia: {
          presentation: {
            typical: "Fever, cough, dyspnea",
            atypical: "Confusion, falls, functional decline"
          },
          
          severity: {
            CURB65: [
              "Confusion",
              "Urea >7 mmol/L",
              "RR ≥30",
              "BP <90/60",
              "Age ≥65"
            ],
            management: {
              "0-1": "Outpatient",
              "2": "Hospital admission",
              "≥3": "Consider ICU"
            }
          },
          
          treatment: {
            CAP: {
              outpatient: "Amoxicillin 1g TID or doxycycline",
              inpatient: "Ceftriaxone + azithromycin",
              severe: "Ceftriaxone + azithromycin + consider coverage for resistant organisms"
            },
            aspirationRisk: "Add metronidazole or use Augmentin"
          }
        },
        
        skinSoftTissue: {
          cellulitis: {
            organisms: "Strep, Staph",
            treatment: "Cephalexin 500mg QID or dicloxacillin",
            MRSA: "Add TMP-SMX or doxycycline"
          },
          
          pressureUlcers: {
            infected: "Deep tissue culture, not swab",
            treatment: "Based on culture, consider osteomyelitis"
          }
        },
        
        CDiff: {
          riskFactors: [
            "Recent antibiotics",
            "PPI use",
            "Hospitalization",
            "Age >65"
          ],
          
          diagnosis: "Diarrhea + positive stool test",
          
          treatment: {
            initial: "Fidaxomicin 200mg BID or vancomycin 125mg QID x10d",
            recurrent: "Vancomycin taper or fidaxomicin",
            multiple: "Consider FMT"
          }
        }
      }
    },
    
    7: {
      title: "Palliative and End-of-Life Care",
      content: {
        principles: {
          definition: "Specialized care focused on QOL for serious illness",
          timing: "Appropriate at any stage, alongside curative treatment",
          
          components: [
            "Symptom management",
            "Psychosocial support",
            "Spiritual care",
            "Care coordination",
            "Goals of care discussions"
          ]
        },
        
        prognosis: {
          tools: {
            "Surprise Question": "Would you be surprised if patient died in 12 months?",
            "FAST": "For dementia prognosis",
            "PPS": "Palliative Performance Scale",
            "Clinical Frailty Scale": "Predictor of mortality"
          }
        },
        
        symptoms: {
          pain: {
            assessment: "Use validated scales (numeric, PAINAD)",
            
            management: {
              WHO_ladder: [
                "Step 1: Acetaminophen ± adjuvants",
                "Step 2: Add weak opioid",
                "Step 3: Strong opioid"
              ],
              
              opioids: {
                starting: "Morphine 2.5-5mg q4h",
                conversion: "Calculate total daily dose, convert",
                breakthrough: "10-20% of total daily dose"
              }
            }
          },
          
          dyspnea: {
            management: [
              "Oxygen if hypoxic",
              "Opioids (morphine 2.5-5mg q4h)",
              "Anxiolytics if anxiety component",
              "Fan to face"
            ]
          },
          
          delirium: {
            terminal: "Common in last days",
            management: [
              "Treat reversible causes if appropriate",
              "Haloperidol 0.5-1mg",
              "Family education"
            ]
          },
          
          secretions: {
            "Death rattle": "Glycopyrrolate 0.2mg SC q4h",
            positioning: "Turn q2h",
            suctioning: "Usually not helpful"
          }
        },
        
        communication: {
          SPIKES: [
            "Setting - private, sitting",
            "Perception - assess understanding",
            "Invitation - ask permission",
            "Knowledge - share information",
            "Emotions - respond with empathy",
            "Strategy - plan next steps"
          ],
          
          phrases: {
            hope: "Hope for the best, prepare for the worst",
            prognosis: "Time may be shorter than we hoped",
            goals: "What's most important to you now?",
            recommendation: "Based on what you've told me..."
          }
        },
        
        hospice: {
          eligibility: "Prognosis ≤6 months if disease follows expected course",
          
          services: [
            "Interdisciplinary team",
            "24/7 on-call",
            "Medications related to terminal diagnosis",
            "DME",
            "Respite care",
            "Bereavement support"
          ],
          
          diseaseSpecific: {
            dementia: "FAST 7c, plus comorbidity",
            CHF: "NYHA IV, optimal medical management",
            COPD: "FEV1<30%, cor pulmonale",
            cancer: "Metastatic or declining performance"
          }
        }
      }
    }
  },
  
  clinicalPearls: {
    assessment: [
      "Always get collateral history in cognitive impairment",
      "Orthostatic vitals: wait full 3 minutes",
      "Depression screens positive in 30% of elderly",
      "Function predicts outcomes better than diagnoses",
      "Social isolation is equivalent to smoking as health risk"
    ],
    
    prescribing: [
      "Start low, go slow - but GO (don't under-treat)",
      "Creatinine can be normal despite low GFR in elderly",
      "Always calculate CrCl for drug dosing",
      "Review medications at every visit",
      "Consider deprescribing proactively"
    ],
    
    syndromes: [
      "Delirium is a medical emergency",
      "UTI is #1 cause of delirium in elderly",
      "Hypoactive delirium has worse prognosis",
      "Depression and dementia often coexist",
      "Weight loss often multifactorial"
    ],
    
    prevention: [
      "Exercise is the closest thing to a fountain of youth",
      "Vitamin D prevents falls and fractures",
      "Social engagement protects against cognitive decline",
      "Mediterranean diet associated with healthy aging",
      "Vaccines: flu, pneumococcal, zoster, COVID"
    ]
  }
};

export default GeriatricTextbook;