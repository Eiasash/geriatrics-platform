// src/data/GeriatricMedications.js

const GeriatricMedications = {
  painManagement: {
    acetaminophen: {
      generic: "Acetaminophen",
      israeli: "Acamol, Dexamol",
      typical: "325-650mg PO q6h",
      maxElderly: "3g/day (2g if liver disease)",
      considerations: "Safest option. Reduce dose in hepatic impairment",
      contraindications: "Severe hepatic disease, alcohol use disorder"
    },
    tramadol: {
      generic: "Tramadol",
      israeli: "Tramal, Tramadex",
      elderlyStart: "25mg q12h",
      maxElderly: "200mg/day",
      considerations: "Seizure risk, serotonin syndrome with SSRIs",
      contraindications: "Seizure disorder, MAOIs"
    },
    oxycodone: {
      generic: "Oxycodone",
      israeli: "Oxynorm, Targin",
      elderlyStart: "2.5mg q6h PRN",
      considerations: "High fall risk, constipation guaranteed",
      monitoring: "Sedation scale, bowel function"
    }
  },

  cardiovascular: {
    ramipril: {
      generic: "Ramipril",
      israeli: "Tritace",
      elderlyStart: "1.25mg daily",
      target: "5-10mg daily",
      renalAdjust: "CrCl <40: 50% dose",
      monitoring: "K+, Cr at 1 week, then q3-6mo"
    },
    bisoprolol: {
      generic: "Bisoprolol",
      israeli: "Concor",
      elderlyStart: "1.25mg daily",
      maxElderly: "10mg daily",
      caution: "Bradycardia <50, bronchospasm",
      contraindications: "Severe asthma, heart block"
    },
    furosemide: {
      generic: "Furosemide",
      israeli: "Lasix, Fusid",
      elderlyStart: "20mg daily",
      titration: "Increase by 20mg q3days",
      monitoring: "K+, Mg++, Cr, orthostatics"
    },
    amlodipine: {
      generic: "Amlodipine",
      israeli: "Norvasc",
      elderlyStart: "2.5mg daily",
      maxElderly: "10mg daily",
      sideEffects: "Ankle edema 10-30%"
    },
    digoxin: {
      generic: "Digoxin",
      israeli: "Lanoxin",
      elderlyDose: "0.125mg daily",
      targetLevel: "0.5-0.9 ng/mL",
      toxicity: "Confusion, vision changes, bradycardia"
    }
  },

  psychiatric: {
    haloperidol: {
      generic: "Haloperidol",
      israeli: "Haldol",
      delirium: "0.25-0.5mg PO/IM q4h PRN",
      maxElderly: "2mg/day",
      blackBox: "Increased mortality in dementia",
      monitoring: "QTc, EPS"
    },
    quetiapine: {
      generic: "Quetiapine",
      israeli: "Seroquel",
      elderlyStart: "12.5-25mg HS",
      sundowning: "25-50mg evening",
      maxElderly: "100mg usually",
      caution: "Orthostatic hypotension"
    },
    risperidone: {
      generic: "Risperidone",
      israeli: "Risperdal",
      elderlyStart: "0.25mg BID",
      maxElderly: "1mg/day",
      monitoring: "Metabolic syndrome, EPS"
    },
    mirtazapine: {
      generic: "Mirtazapine",
      israeli: "Remeron",
      elderlyStart: "7.5mg HS",
      benefits: "Appetite stimulation, sleep",
      sideEffects: "Weight gain, sedation"
    },
    escitalopram: {
      generic: "Escitalopram",
      israeli: "Cipralex",
      elderlyStart: "5mg daily",
      maxElderly: "10mg daily",
      safest: "SSRI of choice in elderly"
    }
  },

  anticoagulation: {
    apixaban: {
      generic: "Apixaban",
      israeli: "Eliquis",
      standard: "5mg BID",
      reducedDose: "2.5mg BID if ≥2 criteria:",
      criteria: ["Age ≥80", "Weight ≤60kg", "Cr ≥1.5"],
      renalAdjust: "CrCl 15-29: use with caution",
      reversal: "Andexanet alfa"
    },
    rivaroxaban: {
      generic: "Rivaroxaban",
      israeli: "Xarelto",
      afib: "20mg daily with food",
      renalAdjust: "CrCl 15-50: 15mg daily",
      important: "MUST take with food"
    },
    warfarin: {
      generic: "Warfarin",
      israeli: "Coumadin",
      target: "INR 2-3 (AFib), 2.5-3.5 (mechanical valve)",
      interactions: "Everything - check all changes",
      reversal: "Vitamin K 10mg IV, PCC if bleeding"
    },
    enoxaparin: {
      generic: "Enoxaparin",
      israeli: "Clexane",
      prophylaxis: "40mg SC daily",
      treatment: "1mg/kg BID",
      renalAdjust: "CrCl <30: 50% dose"
    }
  },

  antibiotics: {
    nitrofurantoin: {
      generic: "Nitrofurantoin",
      israeli: "Macrodantin",
      uti: "100mg BID x5 days",
      contraindication: "CrCl <60",
      caution: "Pulmonary toxicity with long use"
    },
    tmpSmx: {
      generic: "Trimethoprim-Sulfamethoxazole",
      israeli: "Resprim",
      uti: "DS tab BID x3 days",
      caution: "Hyperkalemia with ACE-i",
      renalAdjust: "CrCl <30: 50% dose"
    },
    amoxicillinClav: {
      generic: "Amoxicillin-Clavulanate",
      israeli: "Augmentin",
      dose: "875mg BID",
      caution: "Diarrhea common",
      renalAdjust: "CrCl <30: 875mg daily"
    },
    ceftriaxone: {
      generic: "Ceftriaxone",
      israeli: "Rocephin",
      dose: "1-2g IV/IM daily",
      complicated: "UTI, pneumonia, cellulitis",
      noAdjust: "No renal adjustment needed"
    },
    ciprofloxacin: {
      generic: "Ciprofloxacin",
      israeli: "Ciprodex",
      dose: "250-500mg BID",
      caution: "QT prolongation, tendon rupture",
      renalAdjust: "CrCl <30: 50% dose"
    }
  },

  diabetes: {
    metformin: {
      generic: "Metformin",
      israeli: "Glucophage",
      maxElderly: "2000mg/day",
      contraindication: "eGFR <30",
      hold: "Contrast, surgery, acute illness"
    },
    glargine: {
      generic: "Insulin Glargine",
      israeli: "Lantus, Toujeo",
      starting: "0.1-0.2 units/kg",
      adjustment: "2 units q3days",
      target: "FBG 100-140 in elderly"
    },
    sitagliptin: {
      generic: "Sitagliptin",
      israeli: "Januvia",
      dose: "100mg daily",
      renalAdjust: "CrCl <50: 50mg",
      safest: "Low hypoglycemia risk"
    }
  },

  gastrointestinal: {
    omeprazole: {
      generic: "Omeprazole",
      israeli: "Omepradex, Losec",
      dose: "20mg daily",
      duration: "Limit to 8 weeks",
      risks: "C.diff, fractures, B12 deficiency"
    },
    lactulose: {
      generic: "Lactulose",
      israeli: "Laevolac",
      dose: "15-30mL daily",
      titrate: "To 2-3 soft BMs/day",
      caution: "Bloating, cramping"
    },
    senna: {
      generic: "Senna",
      israeli: "Pericolase",
      dose: "2 tabs HS",
      use: "With opioids prophylactically",
      maxDuration: "Short-term use"
    },
    polyethyleneGlycol: {
      generic: "PEG 3350",
      israeli: "Laxadin",
      dose: "17g daily in water",
      safe: "Long-term use acceptable",
      titrate: "Every 3 days"
    }
  },

  supplements: {
    vitaminD: {
      generic: "Vitamin D3",
      israeli: "Vitamidyne D",
      dose: "1000-2000 IU daily",
      deficiency: "50,000 IU weekly x8",
      target: "Level >30 ng/mL"
    },
    vitaminB12: {
      generic: "Cyanocobalamin",
      israeli: "Bevitex",
      oral: "1000mcg daily",
      injection: "1000mcg IM monthly",
      indication: "Level <200, cognitive issues"
    },
    calcium: {
      generic: "Calcium Carbonate",
      israeli: "Calcimagon",
      dose: "500-600mg BID with meals",
      max: "1200mg/day from all sources",
      caution: "Constipation, kidney stones"
    }
  }
};

// Search function with Hebrew support
function searchMedication(query) {
  const searchTerm = query.toLowerCase();
  const results = [];
  
  Object.keys(GeriatricMedications).forEach(category => {
    Object.keys(GeriatricMedications[category]).forEach(med => {
      const medication = GeriatricMedications[category][med];
      if (
        medication.generic?.toLowerCase().includes(searchTerm) ||
        medication.israeli?.toLowerCase().includes(searchTerm) ||
        med.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          ...medication,
          category,
          key: med
        });
      }
    });
  });
  
  return results;
}

export { GeriatricMedications, searchMedication };
export default GeriatricMedications;