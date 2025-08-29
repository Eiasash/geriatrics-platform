// Clinical Protocols for Geriatric Medicine
// Comprehensive evidence-based protocols for common geriatric conditions

export const protocols = {
  delirium: {
    title: "Delirium Assessment & Management Protocol",
    description: "Evidence-based approach to delirium prevention, assessment, and treatment",
    steps: [
      "1. Risk factor assessment on admission",
      "2. CAM screening every shift for high-risk patients",
      "3. If positive CAM:",
      "   a. Identify and treat underlying causes",
      "   b. Review medications (especially anticholinergics)",
      "   c. Environmental modifications",
      "   d. Reorientation strategies",
      "4. Non-pharmacological interventions first:",
      "   - Optimize sleep-wake cycle",
      "   - Early mobilization",
      "   - Cognitive stimulation",
      "   - Family involvement",
      "5. If severe agitation threatening safety:",
      "   - Haloperidol 0.25-0.5mg or",
      "   - Risperidone 0.25mg",
      "   - Avoid benzodiazepines (unless alcohol withdrawal)"
    ],
    assessment: "CAM (Confusion Assessment Method)",
    prevention: [
      "Sleep protocols (quiet environment, minimize interruptions)",
      "Early mobilization and PT/OT",
      "Adequate nutrition and hydration",
      "Pain management",
      "Avoid unnecessary catheters/restraints",
      "Maintain orientation (clock, calendar, family photos)"
    ],
    medications: {
      avoid: ["Benzodiazepines", "Anticholinergics", "Meperidine", "Diphenhydramine"],
      firstLine: "Environmental and behavioral interventions",
      pharmacological: "Haloperidol 0.25-0.5mg PO/IV q6h PRN severe agitation"
    },
    references: "AGS Clinical Practice Guidelines 2023, Cochrane Review 2018"
  },

  falls: {
    title: "Post-Fall Assessment Protocol",
    description: "Comprehensive evaluation and intervention after a fall in older adults",
    steps: [
      "1. Immediate assessment for injury:",
      "   - Vital signs including orthostatics",
      "   - Head-to-toe examination",
      "   - Focus on head, hip, spine, and extremities",
      "   - Neurological assessment",
      "2. Medication review within 24 hours:",
      "   - Identify fall-risk medications",
      "   - Recent medication changes (past 2 weeks)",
      "   - Consider deprescribing when appropriate",
      "3. Morse Fall Scale assessment",
      "4. Document circumstances:",
      "   - Time, location, activity at time of fall",
      "   - Witnesses, environmental factors",
      "   - Associated symptoms (dizziness, chest pain)",
      "5. Diagnostic considerations:",
      "   - ECG if syncope suspected",
      "   - CT head if anticoagulated or head trauma",
      "   - Basic metabolic panel",
      "6. PT/OT evaluation within 24-48 hours",
      "7. Implement fall prevention strategies",
      "8. Family education and discharge planning"
    ],
    riskFactors: [
      "History of falls",
      "Polypharmacy (≥4 medications)",
      "Psychoactive medications",
      "Gait/balance impairment",
      "Visual impairment",
      "Cognitive impairment",
      "Environmental hazards",
      "Orthostatic hypotension",
      "Muscle weakness",
      "Fear of falling"
    ],
    interventions: [
      "Exercise programs (balance, strength, flexibility)",
      "Medication review and optimization",
      "Vision assessment and correction",
      "Environmental modification",
      "Assistive devices as appropriate",
      "Vitamin D supplementation",
      "Fall risk education"
    ],
    orders: [
      "Fall precautions",
      "Bed alarm",
      "Non-skid socks",
      "PT/OT consult",
      "Orthostatic vitals QID × 2 days",
      "Vitamin D level",
      "Basic metabolic panel",
      "Medication reconciliation"
    ],
    morseScoring: {
      fallHistory: "25 points if fall in past 3 months",
      secondaryDx: "15 points if >1 medical diagnosis",
      ambulatoryAid: "0=none, 15=crutches/walker, 30=furniture",
      ivTherapy: "20 points if IV/saline lock",
      gait: "0=normal, 10=weak, 20=impaired",
      mentalStatus: "15 points if overestimates ability"
    },
    riskCategories: "≥45 High Risk, 25-44 Moderate Risk, <25 Low Risk"
  },

  polypharmacy: {
    title: "Medication Reconciliation Protocol",
    description: "Systematic approach to optimize medication regimens in older adults",
    steps: [
      "1. Comprehensive medication history:",
      "   - Prescription medications",
      "   - Over-the-counter medications",
      "   - Herbal supplements",
      "   - Vitamins and minerals",
      "   - PRN medications usage patterns",
      "2. Apply clinical decision support tools:",
      "   - Beers Criteria 2023",
      "   - STOPP/START criteria v2",
      "   - Drug Burden Index",
      "   - Anticholinergic Cognitive Burden Scale",
      "3. Assess medication appropriateness:",
      "   - Clear indication for each medication",
      "   - Appropriate dose and frequency",
      "   - Duration of therapy",
      "   - Monitoring requirements met",
      "4. Identify prescribing cascades",
      "5. Check for drug-drug interactions",
      "6. Adjust for renal/hepatic function",
      "7. Prioritize deprescribing targets:",
      "   - Inappropriate medications (Beers/STOPP)",
      "   - Medications with no clear indication",
      "   - Duplicate therapy",
      "   - Medications with poor risk/benefit ratio",
      "8. Create structured tapering plan",
      "9. Patient/family education",
      "10. Follow-up and monitoring plan"
    ],
    tools: [
      "2023 AGS Beers Criteria",
      "STOPP/START criteria version 2",
      "Drug Burden Index calculator",
      "Anticholinergic Risk Scale (ARS)",
      "Medication Appropriateness Index (MAI)",
      "ARMOR (polypharmacy screening tool)"
    ],
    highRiskMedications: {
      anticholinergics: ["Diphenhydramine", "Hydroxyzine", "Oxybutynin", "Tolterodine"],
      benzodiazepines: ["Lorazepam", "Alprazolam", "Diazepam", "Clonazepam"],
      opioids: ["Meperidine", "Pentazocine", "Tramadol (>75 years)"],
      cardiovascular: ["Digoxin >0.125mg", "Nifedipine immediate-release", "Spironolactone >25mg"],
      cns: ["Antipsychotics without psychosis", "Tricyclic antidepressants", "Anticonvulsants for pain"]
    },
    deprescribingPrinciples: [
      "Start with one medication at a time",
      "Gradual tapering to avoid withdrawal",
      "Monitor for withdrawal symptoms",
      "Consider patient preferences and goals",
      "Involve patient/caregiver in decision-making",
      "Document rationale for changes"
    ]
  },

  agitation: {
    title: "Dementia Behavioral Management Protocol",
    description: "Non-pharmacological and pharmacological approaches to managing BPSD",
    steps: [
      "1. Exclude delirium (CAM assessment)",
      "2. Assess for pain using appropriate scale:",
      "   - PAINAD for patients unable to communicate",
      "   - Numeric rating scale if able",
      "3. Rule out medical causes:",
      "   - Urinary tract infection",
      "   - Pneumonia or other infections",
      "   - Constipation or urinary retention",
      "   - Medication-induced (recent changes)",
      "4. Environmental assessment:",
      "   - Overstimulation or understimulation",
      "   - Unmet needs (hunger, thirst, toileting)",
      "   - Disrupted routine or sleep patterns",
      "5. Implement non-pharmacological strategies first:",
      "   - Structured daily routine",
      "   - Person-centered activities",
      "   - Music therapy or aromatherapy",
      "   - Validation therapy",
      "   - Minimize environmental triggers",
      "6. If behavioral interventions fail after 2-4 weeks:",
      "   - Consider time-limited medication trial",
      "   - Start with lowest dose",
      "   - Regular reassessment for discontinuation",
      "7. Family education and support"
    ],
    nonPharmacological: [
      "Identify and address triggers",
      "Maintain consistent routines",
      "Provide meaningful activities",
      "Ensure adequate lighting",
      "Minimize noise and overstimulation",
      "Validate emotions and redirect",
      "Use familiar objects and photos",
      "Ensure comfort needs are met"
    ],
    medications: {
      depression: {
        firstLine: "Citalopram 10mg daily (max 20mg >60 years)",
        alternatives: "Sertraline 25mg daily, Mirtazapine 7.5-15mg HS"
      },
      anxiety: {
        firstLine: "Non-pharmacological interventions",
        ifNeeded: "Lorazepam 0.25-0.5mg PRN (short-term only)"
      },
      agitation: {
        firstLine: "Risperidone 0.25mg BID",
        alternatives: "Quetiapine 12.5-25mg BID, Olanzapine 2.5mg daily",
        caution: "Black box warning for dementia-related psychosis"
      },
      sleep: {
        firstLine: "Melatonin 3-6mg HS",
        alternatives: "Trazodone 25-50mg HS",
        avoid: "Diphenhydramine, Zolpidem"
      }
    },
    monitoring: [
      "Effectiveness of interventions",
      "Side effects (sedation, falls, parkinsonism)",
      "Functional status changes",
      "Regular attempts at dose reduction",
      "Plan for discontinuation"
    ],
    contraindications: [
      "Avoid antipsychotics if possible in Lewy body dementia",
      "Avoid benzodiazepines (fall risk, cognitive worsening)",
      "Avoid anticholinergics",
      "Monitor QTc with antipsychotics"
    ]
  },

  pressureUlcer: {
    title: "Pressure Injury Prevention Protocol",
    description: "Evidence-based prevention and management of pressure injuries",
    steps: [
      "1. Risk assessment on admission and daily:",
      "   - Braden Scale assessment",
      "   - Document score and risk level",
      "2. Skin inspection every shift:",
      "   - Focus on bony prominences",
      "   - Document any changes",
      "   - Stage any pressure injuries found",
      "3. Implement prevention strategies based on risk level:",
      "   - All patients: repositioning q2h, skin care",
      "   - Moderate risk (Braden ≤18): pressure-relieving mattress",
      "   - High risk (Braden ≤12): advanced support surface",
      "4. Nutritional assessment and optimization:",
      "   - Protein intake 1.2-1.5g/kg/day",
      "   - Adequate calories and hydration",
      "   - Consider nutrition consultation",
      "5. Moisture management:",
      "   - Incontinence care protocols",
      "   - Barrier creams as appropriate",
      "   - Keep skin clean and dry",
      "6. Heel protection for all bed-bound patients",
      "7. Chair repositioning q1h for sitting patients",
      "8. Patient/family education"
    ],
    bradenScale: {
      sensoryPerception: "1=completely limited, 4=no impairment",
      moisture: "1=constantly moist, 4=rarely moist",
      activity: "1=bedfast, 4=walks frequently",
      mobility: "1=completely immobile, 4=no limitations",
      nutrition: "1=very poor, 4=excellent",
      frictionShear: "1=problem, 3=no apparent problem"
    },
    riskLevels: {
      severe: "≤9 points - Very high risk",
      high: "10-12 points - High risk",
      moderate: "13-14 points - Moderate risk",
      mild: "15-18 points - Mild risk",
      minimal: "19-23 points - No risk"
    },
    staging: {
      stage1: "Non-blanchable erythema of intact skin",
      stage2: "Partial-thickness skin loss with exposed dermis",
      stage3: "Full-thickness skin loss with visible fat",
      stage4: "Full-thickness skin and tissue loss with exposed bone/tendon/muscle",
      unstageable: "Obscured full-thickness skin loss",
      deepTissue: "Persistent non-blanchable deep red/maroon/purple discoloration"
    },
    interventions: {
      all: ["Turn q2h", "Heel protection", "Skin inspection", "Keep skin clean/dry"],
      bradenLow: ["Pressure-redistributing mattress", "Nutrition consult", "Consider air fluidized bed"],
      nutrition: ["High-protein diet", "Adequate hydration", "Vitamin C and Zinc if deficient"]
    }
  },

  dysphagia: {
    title: "Dysphagia Screening & Management Protocol",
    description: "Safe swallowing assessment and aspiration prevention",
    steps: [
      "1. Initial screening for all stroke patients:",
      "   - 3-ounce water swallow test",
      "   - Must pass before any PO intake",
      "2. If screening test fails:",
      "   - NPO status",
      "   - Speech-language pathology consult within 24h",
      "   - Consider alternative nutrition/hydration",
      "3. Comprehensive swallow evaluation by SLP:",
      "   - Clinical assessment",
      "   - Consider FEES or videofluoroscopy",
      "4. Diet modifications as per SLP recommendations:",
      "   - Texture modifications (pureed, minced, soft)",
      "   - Thickened liquids (nectar, honey, pudding thick)",
      "5. Implement swallowing precautions:",
      "   - Upright positioning 90° during meals",
      "   - Remain upright 30 minutes after eating",
      "   - Small bites, slow pace",
      "   - No straws unless recommended by SLP",
      "6. Oral care protocol:",
      "   - Oral hygiene TID and PRN",
      "   - Suction equipment readily available",
      "7. Daily reassessment of swallow function",
      "8. Consider PEG tube if dysphagia persists >2-3 weeks"
    ],
    riskFactors: [
      "Stroke (acute or history)",
      "Dementia",
      "Parkinson's disease",
      "Head and neck cancer",
      "COPD",
      "Multiple medications affecting cognition",
      "Poor dentition",
      "Dry mouth"
    ],
    warningSigns: [
      "Coughing during or after meals",
      "Wet or gurgly voice after swallowing",
      "Difficulty chewing",
      "Food pocketing in cheeks",
      "Drooling",
      "Weight loss",
      "Recurrent pneumonia",
      "Refusal to eat certain textures"
    ],
    textureModifications: {
      iddsi7: "Regular - Normal foods",
      iddsi6: "Soft & Bite-Sized - Tender, moist, no sharp edges",
      iddsi5: "Minced & Moist - No lumps >4mm",
      iddsi4: "Pureed - Smooth, pudding-like consistency"
    },
    liquidConsistencies: {
      iddsi0: "Thin - Water, coffee, juice",
      iddsi1: "Slightly Thick - Nectar-like",
      iddsi2: "Mildly Thick - Honey-like",
      iddsi3: "Moderately Thick - Pudding-like"
    },
    monitoring: [
      "Weight weekly",
      "Hydration status",
      "Signs of aspiration",
      "Tolerance of modified textures",
      "Regular SLP reassessment"
    ]
  },

  constipation: {
    title: "Constipation Management Protocol",
    description: "Systematic approach to preventing and treating constipation in older adults",
    steps: [
      "1. Assessment:",
      "   - Document last bowel movement",
      "   - Review usual bowel pattern",
      "   - Perform abdominal examination",
      "   - Consider rectal examination if indicated",
      "2. Review contributing factors:",
      "   - Medications (opioids, anticholinergics, iron)",
      "   - Fluid intake and dietary fiber",
      "   - Mobility level",
      "   - Privacy/toileting access",
      "3. Implement prevention strategies:",
      "   - Adequate fluid intake (30ml/kg/day if no restrictions)",
      "   - Dietary fiber 25-30g/day",
      "   - Regular toileting schedule",
      "   - Physical activity as tolerated",
      "4. Stepwise pharmacological treatment:",
      "   Day 1-2: Sennosides 8.6mg 2 tablets HS",
      "   Day 3: Add PEG 3350 17g daily",
      "   Day 4: Bisacodyl suppository 10mg",
      "   Day 5: Fleet phosphate enema",
      "   Day 6: Consider manual disimpaction if trained",
      "5. Prophylactic bowel regimen for opioid patients:",
      "   - Sennosides + docusate from day 1",
      "   - Do not wait for constipation to develop",
      "6. Reassess daily and adjust as needed"
    ],
    riskFactors: [
      "Advanced age",
      "Polypharmacy",
      "Immobility",
      "Dehydration",
      "Low fiber diet",
      "Cognitive impairment",
      "Depression",
      "Hypothyroidism",
      "Diabetes mellitus"
    ],
    medications: {
      firstLine: "Senna 8.6mg 1-4 tabs daily",
      bulkForming: "Psyllium 3.4g BID (ensure adequate fluids)",
      osmotic: "PEG 3350 17g daily in 8oz fluid",
      stimulant: "Bisacodyl 5-15mg daily",
      stoolSoftener: "Docusate 100-300mg daily",
      suppository: "Bisacodyl 10mg PR or Glycerin PR",
      enema: "Fleet phosphate 118ml PR PRN"
    },
    opioidConstipation: {
      prophylaxis: "Start bowel regimen with first opioid dose",
      regimen: "Senna 8.6mg 2 tabs BID + Docusate 100mg BID",
      refractory: "Consider methylnaltrexone or naloxegol"
    },
    avoidance: [
      "Mineral oil (aspiration risk)",
      "Magnesium-based laxatives (renal impairment)",
      "Phosphate enemas (electrolyte disturbances) in CKD",
      "Chronic stimulant laxative use without osmotic agents"
    ],
    redFlags: [
      "Acute onset with abdominal pain",
      "Blood in stool",
      "Unintended weight loss",
      "Family history of colorectal cancer",
      "Iron deficiency anemia",
      "New onset >50 years without obvious cause"
    ]
  },

  orthostatic: {
    title: "Orthostatic Hypotension Management Protocol",
    description: "Assessment and management of orthostatic hypotension in older adults",
    steps: [
      "1. Proper orthostatic vital signs measurement:",
      "   - Supine BP after 5 minutes rest",
      "   - Standing BP at 1 and 3 minutes",
      "   - Document HR and BP at each time point",
      "   - Note symptoms during position changes",
      "2. Definition: SBP drop ≥20mmHg or DBP drop ≥10mmHg",
      "3. Identify and address reversible causes:",
      "   - Dehydration",
      "   - Medication-induced",
      "   - Blood loss/anemia",
      "   - Infection",
      "   - Adrenal insufficiency",
      "4. Medication review and adjustment:",
      "   - Diuretics: reduce dose or hold if possible",
      "   - Alpha-blockers: consider discontinuation",
      "   - Antihypertensives: adjust timing and dosing",
      "   - Tricyclic antidepressants: switch if possible",
      "5. Non-pharmacological interventions:",
      "   - Patient education on gradual position changes",
      "   - Compression stockings 20-30 mmHg",
      "   - Increased salt intake (if no heart failure)",
      "   - Adequate hydration 2-2.5L/day",
      "   - Small frequent meals",
      "   - Avoid prolonged standing",
      "   - Head-of-bed elevation 10-20 degrees",
      "6. Consider pharmacological treatment if symptomatic:",
      "   - Fludrocortisone 0.1mg daily (start low, monitor K+)",
      "   - Midodrine 2.5-10mg TID (avoid evening dose)",
      "7. Monitor response and adjust treatment"
    ],
    causes: {
      neurogenic: ["Parkinson's", "Multiple system atrophy", "Pure autonomic failure", "Diabetic neuropathy"],
      medication: ["Diuretics", "Vasodilators", "Alpha-blockers", "TCAs", "Antipsychotics"],
      volume: ["Dehydration", "Blood loss", "Adrenal insufficiency"],
      cardiac: ["Aortic stenosis", "Heart failure", "Arrhythmias"],
      other: ["Prolonged bed rest", "Heat exposure", "Large meals", "Valsalva maneuver"]
    },
    symptoms: [
      "Dizziness or lightheadedness",
      "Falls or near-falls",
      "Weakness or fatigue",
      "Blurred vision",
      "Neck or shoulder pain ('coat hanger' pain)",
      "Syncope or near-syncope"
    ],
    nonPharmacological: [
      "Graduated compression stockings",
      "Counter-maneuvers (leg crossing, hand gripping)",
      "Slow position changes",
      "Adequate hydration",
      "Increased salt intake (2-3g/day if tolerated)",
      "Small, frequent meals",
      "Avoid hot environments",
      "Physical conditioning programs"
    ],
    pharmacological: {
      fludrocortisone: {
        dose: "0.1mg daily, may increase to 0.3mg daily",
        monitoring: "K+, edema, supine hypertension",
        contraindications: "Heart failure, severe hypertension"
      },
      midodrine: {
        dose: "2.5mg TID, may increase to 10mg TID",
        timing: "Give q4h during waking hours, not within 4h of bedtime",
        monitoring: "Supine hypertension, urinary retention",
        contraindications: "Severe heart disease, urinary retention"
      }
    },
    monitoring: [
      "Symptom improvement",
      "Blood pressure (supine and standing)",
      "Electrolytes (if on fludrocortisone)",
      "Weight and edema",
      "Falls assessment",
      "Quality of life measures"
    ]
  }
};

export const getProtocolByName = (name) => {
  return protocols[name.toLowerCase()];
};

export const getAllProtocolNames = () => {
  return Object.keys(protocols);
};

export const getProtocolsByCategory = (category) => {
  // Future enhancement: categorize protocols
  return protocols;
};

export default protocols;