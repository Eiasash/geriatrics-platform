// src/data/GeriatricMedications.js

const GeriatricMedications = {
  cardiovascular: {
    "Ramipril": {
      generic: "Ramipril",
      israeli: "Tritace",
      elderlyStart: "1.25mg daily",
      elderlyMax: "10mg daily",
      renalAdjust: "CrCl <40: 50% dose",
      monitoring: "K+, Cr q3-6mo",
      caution: "First dose hypotension, cough",
      interactions: "K+ sparing diuretics, NSAIDs"
    },
    "Bisoprolol": {
      generic: "Bisoprolol",
      israeli: "Concor",
      elderlyStart: "1.25mg daily",
      elderlyMax: "10mg daily",
      heartFailure: "Start 1.25mg, titrate q2weeks",
      caution: "Bradycardia, don't stop abruptly",
      contraindications: "Asthma, AV block, sick sinus"
    },
    "Furosemide": {
      generic: "Furosemide",
      israeli: "Lasix/Fusid",
      elderlyStart: "20mg daily",
      elderlyMax: "80mg BID usually",
      ivToPo: "IV:PO ratio 1:2",
      monitoring: "K+, Mg++, Cr, uric acid",
      caution: "Orthostatic hypotension, ototoxicity"
    },
    "Amlodipine": {
      generic: "Amlodipine",
      israeli: "Norvasc",
      elderlyStart: "2.5mg daily",
      elderlyMax: "10mg daily",
      advantages: "No dose adjustment in renal/hepatic",
      caution: "Ankle edema common, gingival hyperplasia"
    },
    "Carvedilol": {
      generic: "Carvedilol",
      israeli: "Dilatrend",
      elderlyStart: "3.125mg BID",
      elderlyMax: "25mg BID",
      heartFailure: "Preferred over metoprolol",
      caution: "Take with food, monitor BP"
    },
    "Spironolactone": {
      generic: "Spironolactone",
      israeli: "Aldactone",
      elderlyStart: "12.5mg daily",
      elderlyMax: "50mg daily",
      heartFailure: "Mortality benefit if EF <35%",
      monitoring: "K+ within 1 week, then monthly",
      caution: "Hyperkalemia risk with ACE/ARB"
    },
    "Hydralazine": {
      generic: "Hydralazine",
      israeli: "Apresoline",
      elderlyStart: "10mg TID",
      elderlyMax: "50mg QID",
      indication: "When ACE/ARB contraindicated",
      caution: "Lupus-like syndrome, reflex tachycardia"
    },
    "Isosorbide Dinitrate": {
      generic: "Isosorbide Dinitrate",
      israeli: "Isoket",
      elderlyStart: "10mg TID",
      elderlyMax: "40mg TID",
      combination: "With hydralazine in HF",
      caution: "Headache, tolerance with continuous use"
    }
  },

  anticoagulation: {
    "Apixaban": {
      generic: "Apixaban",
      israeli: "Eliquis",
      standard: "5mg BID",
      reduced: "2.5mg BID if ≥2: age≥80, weight≤60kg, Cr≥1.5mg/dL",
      renalAdjust: "CrCl 15-29: 2.5mg BID",
      afib: "Preferred in elderly",
      vte: "10mg BID x7 days, then 5mg BID",
      reversal: "Andexanet alfa (expensive)",
      periop: "Hold 48h before surgery"
    },
    "Rivaroxaban": {
      generic: "Rivaroxaban",
      israeli: "Xarelto",
      afib: "20mg daily with dinner",
      renalAdjust: "CrCl 15-50: 15mg daily",
      vte: "15mg BID x21d, then 20mg daily",
      caution: "MUST take with food for absorption",
      periop: "Hold 24-48h before surgery"
    },
    "Warfarin": {
      generic: "Warfarin",
      israeli: "Coumadin",
      target: "INR 2-3 (AFib), 2.5-3.5 (mechanical valve)",
      starting: "5mg daily x2 days, then per INR",
      elderly: "Start 2.5mg in >75yo or frail",
      interactions: "Everything! Antibiotics, amiodarone",
      reversal: "Vitamin K 10mg IV, PCC if bleeding",
      monitoring: "INR q2-3 days until stable, then monthly"
    },
    "Enoxaparin": {
      generic: "Enoxaparin",
      israeli: "Clexane",
      prophylaxis: "40mg SC daily",
      treatment: "1mg/kg BID or 1.5mg/kg daily",
      renalAdjust: "CrCl <30: 50% dose reduction",
      monitoring: "Anti-Xa if renal impairment",
      bridging: "For periop warfarin management"
    },
    "Dabigatran": {
      generic: "Dabigatran",
      israeli: "Pradaxa",
      standard: "150mg BID",
      reduced: "110mg BID if >80yo or high bleeding risk",
      renalAdjust: "Avoid if CrCl <30",
      reversal: "Idarucizumab (Praxbind)",
      caution: "GI side effects common"
    }
  },

  psychiatric: {
    "Haloperidol": {
      generic: "Haloperidol",
      israeli: "Haldol",
      elderlyDelirium: "0.25-0.5mg PO/IM",
      max: "2mg/day in elderly",
      acute: "0.5mg IM, may repeat q30min",
      blackBox: "Increased mortality in dementia",
      monitoring: "QTc, EPS, NMS",
      avoid: "Parkinson's, Lewy body"
    },
    "Quetiapine": {
      generic: "Quetiapine",
      israeli: "Seroquel",
      elderlyStart: "12.5-25mg HS",
      delirium: "12.5mg BID, increase by 25mg/day",
      max: "100mg in elderly usually",
      advantages: "Less EPS than haloperidol",
      caution: "Orthostatic hypotension, sedation"
    },
    "Lorazepam": {
      generic: "Lorazepam",
      israeli: "Lorivan",
      elderlyAnxiety: "0.25-0.5mg",
      alcohol: "Only benzo for alcohol withdrawal",
      caution: "AVOID - falls, delirium, dependence",
      taper: "25% weekly reduction",
      halfLife: "Shorter than diazepam"
    },
    "Risperidone": {
      generic: "Risperidone",
      israeli: "Risperdal",
      elderlyStart: "0.25mg daily",
      max: "2mg daily in elderly",
      behavioral: "For severe agitation in dementia",
      monitoring: "Prolactin, metabolic syndrome",
      caution: "Stroke risk in dementia"
    },
    "Olanzapine": {
      generic: "Olanzapine",
      israeli: "Zyprexa",
      elderlyStart: "2.5mg HS",
      max: "10mg daily in elderly",
      im: "2.5-5mg IM for acute agitation",
      caution: "Weight gain, diabetes risk",
      avoid: "With benzodiazepines (respiratory depression)"
    },
    "Sertraline": {
      generic: "Sertraline",
      israeli: "Lustral",
      elderlyStart: "25mg daily",
      depression: "Target 50-100mg",
      max: "200mg but rarely needed",
      advantages: "Fewer drug interactions",
      caution: "Hyponatremia, GI upset initially"
    },
    "Citalopram": {
      generic: "Citalopram",
      israeli: "Cipramil",
      elderlyStart: "10mg daily",
      max: "20mg in >60yo (QTc prolongation)",
      monitoring: "ECG if >20mg or cardiac disease",
      caution: "SIADH, falls risk initially"
    },
    "Mirtazapine": {
      generic: "Mirtazapine",
      israeli: "Remeron",
      elderlyStart: "7.5mg HS",
      advantages: "Appetite stimulation, sleep aid",
      max: "45mg but 15mg often sufficient",
      caution: "Weight gain, sedation"
    }
  },

  diabetes: {
    "Metformin": {
      generic: "Metformin",
      israeli: "Glucophage",
      elderlyStart: "500mg daily with food",
      elderlyMax: "2000mg daily",
      contraindication: "eGFR <30, hold if <45 and acute illness",
      caution: "Hold for contrast, surgery, acute illness",
      sideEffects: "GI upset, B12 deficiency",
      advantages: "No hypoglycemia, weight neutral"
    },
    "Insulin Glargine": {
      generic: "Insulin Glargine",
      israeli: "Lantus/Toujeo",
      starting: "0.1-0.2 units/kg or 10 units HS",
      adjustment: "Increase 2 units q3days if FBG >140",
      elderlyTarget: "FBG 100-140, A1C 7.5-8.5%",
      conversion: "From NPH: 80% of total daily dose",
      timing: "Same time daily, Toujeo more flexible"
    },
    "Insulin Aspart": {
      generic: "Insulin Aspart",
      israeli: "NovoRapid",
      starting: "4 units before largest meal",
      sliding: "Start when BG >150-180",
      elderlyScale: "Conservative: 1 unit per 50 above 150",
      caution: "Risk of hypoglycemia if not eating"
    },
    "Gliclazide": {
      generic: "Gliclazide",
      israeli: "Diamicron",
      elderlyStart: "30mg daily",
      max: "120mg daily (MR formulation)",
      advantages: "Lower hypoglycemia vs glibenclamide",
      renalAdjust: "Safe in mild-moderate CKD"
    },
    "Sitagliptin": {
      generic: "Sitagliptin",
      israeli: "Januvia",
      dose: "100mg daily",
      renalAdjust: "50mg if CrCl 30-50, 25mg if <30",
      advantages: "Weight neutral, no hypoglycemia",
      caution: "Pancreatitis (rare), joint pain"
    },
    "Empagliflozin": {
      generic: "Empagliflozin",
      israeli: "Jardiance",
      dose: "10mg daily",
      benefits: "CV and renal protection",
      contraindication: "eGFR <30, recurrent UTIs",
      caution: "Euglycemic DKA, genital infections",
      holdFor: "Acute illness, surgery, dehydration"
    }
  },

  analgesics: {
    "Acetaminophen": {
      generic: "Acetaminophen/Paracetamol",
      israeli: "Acamol/Dexamol",
      elderlyDose: "500-1000mg q6h",
      max: "3g/day (2g if liver disease or EtOH)",
      scheduled: "Better than PRN for chronic pain",
      firstLine: "Always start here for pain",
      formulations: "Tabs, liquid, suppository",
      caution: "Hidden in combination products"
    },
    "Tramadol": {
      generic: "Tramadol",
      israeli: "Tramal/Tramadex",
      elderlyStart: "25mg q12h",
      max: "200mg/day in elderly (300mg if younger)",
      extendedRelease: "Start 50mg daily",
      caution: "Seizure risk, serotonin syndrome",
      interactions: "SSRIs, SNRIs, MAOIs",
      renalAdjust: "Increase interval if CrCl <30"
    },
    "Oxycodone": {
      generic: "Oxycodone",
      israeli: "Oxynorm/Targin",
      elderlyStart: "2.5mg q6h PRN",
      conversion: "Morphine 10mg = Oxycodone 7.5mg",
      combinationTargin: "With naloxone for constipation",
      caution: "High fall risk, constipation, delirium",
      taper: "Reduce by 25% q3-5 days"
    },
    "Morphine": {
      generic: "Morphine",
      israeli: "MST Continus (SR), Oramorph (IR)",
      elderlyStart: "2.5mg PO q4h or 1-2mg IV q2h",
      conversion: "PO:IV ratio 3:1",
      renalAdjust: "Avoid if CrCl <30 (metabolite accumulation)",
      endOfLife: "0.5-2mg SC q2h PRN",
      caution: "Respiratory depression, accumulation"
    },
    "Fentanyl": {
      generic: "Fentanyl",
      israeli: "Durogesic (patch), Actiq (lozenge)",
      patch: "Start 12mcg/hr only if on opioids",
      conversion: "Morphine 60mg/day = 25mcg/hr patch",
      onset: "12-24h to steady state",
      caution: "Not for acute pain, fever increases absorption",
      elderlyNote: "Often too potent for elderly"
    },
    "Gabapentin": {
      generic: "Gabapentin",
      israeli: "Neurontin",
      elderlyStart: "100mg HS",
      neuropathic: "Titrate to 300mg TID",
      max: "1200mg/day in elderly usually",
      renalAdjust: "Reduce dose based on CrCl",
      caution: "Sedation, dizziness, edema"
    },
    "Pregabalin": {
      generic: "Pregabalin",
      israeli: "Lyrica",
      elderlyStart: "25mg BID",
      neuropathic: "Target 75-150mg BID",
      advantages: "More predictable than gabapentin",
      renalAdjust: "Reduce if CrCl <60",
      caution: "Expensive, similar SE to gabapentin"
    }
  },

  gastrointestinal: {
    "Omeprazole": {
      generic: "Omeprazole",
      israeli: "Losec/Omepradex",
      dose: "20mg daily",
      duration: "Limit to 8 weeks unless clear indication",
      risks: "C.diff, fractures, B12 deficiency, hypoMg",
      interactions: "Clopidogrel (controversial)",
      deprescribing: "Taper over 2-4 weeks"
    },
    "Ranitidine": {
      generic: "Ranitidine",
      israeli: "Zantac (discontinued)",
      note: "Removed from market 2020 (NDMA)",
      alternative: "Use famotidine 20mg BID"
    },
    "Metoclopramide": {
      generic: "Metoclopramide",
      israeli: "Pramin",
      elderlyDose: "5mg TID (not 10mg)",
      max: "30mg/day",
      duration: "Limit to 5 days",
      caution: "EPS, tardive dyskinesia",
      contraindication: "Parkinson's, obstruction"
    },
    "Lactulose": {
      generic: "Lactulose",
      israeli: "Laevolac",
      constipation: "15-30mL daily",
      hepaticEncephalopathy: "30mL TID-QID",
      titrate: "To 2-3 soft BMs daily",
      caution: "Bloating, electrolyte disturbances"
    },
    "Polyethylene Glycol": {
      generic: "PEG 3350",
      israeli: "Laxadin/Normalax",
      dose: "17g (1 sachet) daily",
      advantages: "Safe for long-term use",
      titrate: "Can increase to BID",
      mixing: "In 250mL water or juice"
    },
    "Senna": {
      generic: "Senna",
      israeli: "Pursennid",
      dose: "2 tabs (17.2mg) HS",
      max: "4 tabs daily",
      combination: "Often with PEG for opioid constipation",
      caution: "Cramping, melanosis coli with chronic use"
    },
    "Bisacodyl": {
      generic: "Bisacodyl",
      israeli: "Dulcolax",
      oral: "5-10mg HS",
      suppository: "10mg PR for acute constipation",
      onset: "Oral 6-12h, PR 15-60min",
      caution: "Cramping, electrolyte loss"
    }
  },

  antibiotics: {
    "Amoxicillin-Clavulanate": {
      generic: "Amoxicillin-Clavulanate",
      israeli: "Augmentin",
      dose: "875mg BID or 500mg TID",
      renalAdjust: "CrCl <30: 875mg daily",
      indications: "COPD exacerbation, bite wounds",
      caution: "Diarrhea common, hepatotoxicity"
    },
    "Ceftriaxone": {
      generic: "Ceftriaxone",
      israeli: "Rocephin",
      dose: "1-2g IV daily",
      advantages: "Once daily, no renal adjustment",
      caution: "Biliary sludge, C.diff risk",
      meningitis: "2g q12h"
    },
    "Ciprofloxacin": {
      generic: "Ciprofloxacin",
      israeli: "Ciprodex/Ciproxin",
      uti: "250mg BID x3 days",
      pyelonephritis: "500mg BID x7 days",
      renalAdjust: "Reduce dose if CrCl <30",
      caution: "QTc, tendon rupture, confusion",
      interactions: "Antacids, iron, calcium"
    },
    "Nitrofurantoin": {
      generic: "Nitrofurantoin",
      israeli: "Macrodantin",
      dose: "100mg BID x5 days",
      contraindication: "CrCl <60 (ineffective)",
      advantages: "Low resistance rates",
      caution: "Pulmonary toxicity with long-term",
      take: "With food to reduce GI upset"
    },
    "TMP-SMX": {
      generic: "Trimethoprim-Sulfamethoxazole",
      israeli: "Resprim/Septrin",
      uti: "160/800mg (DS) BID x3 days",
      renalAdjust: "50% dose if CrCl 15-30",
      caution: "Hyperkalemia with ACE/ARB",
      pcp: "High dose for Pneumocystis"
    },
    "Azithromycin": {
      generic: "Azithromycin",
      israeli: "Zithromax",
      cap: "500mg day 1, then 250mg x4 days",
      copd: "500mg daily x3 days",
      advantages: "Once daily, short course",
      caution: "QTc prolongation, drug interactions"
    }
  },

  other: {
    "Vitamin D": {
      generic: "Cholecalciferol",
      israeli: "Vitamin D3",
      prevention: "800-1000 IU daily",
      deficiency: "50,000 IU weekly x8 weeks",
      maintenance: "1000-2000 IU daily",
      withCalcium: "Often combined for osteoporosis",
      monitoring: "25-OH vitamin D level"
    },
    "Ferrous Sulfate": {
      generic: "Ferrous Sulfate",
      israeli: "Ferrocal",
      dose: "325mg (65mg elemental) daily-TID",
      absorption: "Take with vitamin C, empty stomach",
      caution: "Constipation, dark stools",
      interactions: "Separate from levothyroxine, PPI",
      monitoring: "Ferritin, TIBC after 3 months"
    },
    "Levothyroxine": {
      generic: "Levothyroxine",
      israeli: "Eltroxin",
      elderlyStart: "25mcg daily",
      cardiac: "12.5mcg if CAD",
      adjustment: "Increase by 12.5-25mcg q6weeks",
      goal: "TSH 4-6 in >70yo (not 0.5-4)",
      timing: "30min before breakfast or HS"
    },
    "Alendronate": {
      generic: "Alendronate",
      israeli: "Fosamax",
      dose: "70mg weekly",
      instructions: "Fasting, upright 30min, with water only",
      duration: "Reassess after 5 years",
      contraindication: "CrCl <35, esophageal disorders",
      monitoring: "Dental exam before starting"
    },
    "Tamsulosin": {
      generic: "Tamsulosin",
      israeli: "Omnic",
      dose: "0.4mg daily",
      timing: "30min after same meal daily",
      caution: "Orthostatic hypotension, IFIS",
      combination: "Can add finasteride if large prostate"
    },
    "Oxybutynin": {
      generic: "Oxybutynin",
      israeli: "Ditropan",
      dose: "2.5mg BID-TID",
      caution: "AVOID in elderly - confusion, falls",
      alternatives: "Mirabegron, solifenacin (less CNS)",
      contraindication: "Glaucoma, urinary retention"
    },
    "Memantine": {
      generic: "Memantine",
      israeli: "Ebixa",
      start: "5mg daily x1 week",
      titration: "Increase by 5mg weekly",
      target: "10mg BID",
      indication: "Moderate-severe dementia",
      renalAdjust: "Max 10mg daily if CrCl <30"
    },
    "Donepezil": {
      generic: "Donepezil",
      israeli: "Aricept",
      start: "5mg HS",
      increase: "To 10mg after 4-6 weeks",
      sideEffects: "GI upset, bradycardia, vivid dreams",
      indication: "Mild-moderate Alzheimer's",
      note: "Modest benefit, consider stopping if severe"
    }
  }
};

// Quick lookup function
GeriatricMedications.quickLookup = function(drugName) {
  const searchTerm = drugName.toLowerCase();
  let results = [];
  
  Object.keys(this).forEach(category => {
    if (typeof this[category] === 'object') {
      Object.keys(this[category]).forEach(drug => {
        if (drug.toLowerCase().includes(searchTerm) || 
            this[category][drug].israeli?.toLowerCase().includes(searchTerm)) {
          results.push({
            name: drug,
            category: category,
            data: this[category][drug]
          });
        }
      });
    }
  });
  
  return results;
};

// Renal dosing calculator
GeriatricMedications.renalDosing = function(drug, creatinineClearance) {
  // Returns adjusted dose based on CrCl
  const adjustments = {
    "Metformin": creatinineClearance < 30 ? "Contraindicated" : 
                 creatinineClearance < 45 ? "Max 1000mg/day" : "No adjustment",
    "Enoxaparin": creatinineClearance < 30 ? "50% dose reduction" : "No adjustment",
    "Apixaban": creatinineClearance < 30 ? "2.5mg BID" : "Standard dosing",
    "Gabapentin": creatinineClearance < 60 ? "Reduce dose by 50%" : "No adjustment"
  };
  
  return adjustments[drug] || "Check prescribing information";
};

export default GeriatricMedications;