// COMPLETE DRUG DATABASE - ALL GERIATRIC MEDICATIONS
// Including Israeli brand names and geriatric-specific dosing

const CompleteDrugDatabase = {
  // CARDIOVASCULAR - COMPLETE
  cardiovascular: {
    // ACE Inhibitors
    "Ramipril": { generic: "Ramipril", israeli: "Tritace", elderlyStart: "1.25mg daily", elderlyMax: "10mg daily", renalAdjust: "CrCl <40: 50% dose" },
    "Lisinopril": { generic: "Lisinopril", israeli: "Lisopress", elderlyStart: "2.5mg daily", elderlyMax: "40mg daily", renalAdjust: "CrCl <30: reduce dose" },
    "Enalapril": { generic: "Enalapril", israeli: "Enaladex", elderlyStart: "2.5mg daily", elderlyMax: "40mg daily", renalAdjust: "CrCl <30: 75% dose" },
    "Perindopril": { generic: "Perindopril", israeli: "Coversyl", elderlyStart: "2mg daily", elderlyMax: "8mg daily", renalAdjust: "CrCl <30: 2mg max" },
    "Captopril": { generic: "Captopril", israeli: "Capoten", elderlyStart: "6.25mg TID", elderlyMax: "150mg daily", renalAdjust: "Reduce dose" },
    "Fosinopril": { generic: "Fosinopril", israeli: "Monopril", elderlyStart: "5mg daily", elderlyMax: "40mg daily", renalAdjust: "No adjustment needed" },
    "Quinapril": { generic: "Quinapril", israeli: "Accupril", elderlyStart: "5mg daily", elderlyMax: "40mg daily", renalAdjust: "CrCl <30: reduce dose" },
    
    // ARBs
    "Losartan": { generic: "Losartan", israeli: "Ocsaar", elderlyStart: "25mg daily", elderlyMax: "100mg daily", renalAdjust: "No adjustment" },
    "Valsartan": { generic: "Valsartan", israeli: "Diovan", elderlyStart: "40mg daily", elderlyMax: "320mg daily", renalAdjust: "No adjustment" },
    "Telmisartan": { generic: "Telmisartan", israeli: "Micardis", elderlyStart: "20mg daily", elderlyMax: "80mg daily", renalAdjust: "No adjustment" },
    "Candesartan": { generic: "Candesartan", israeli: "Atacand", elderlyStart: "4mg daily", elderlyMax: "32mg daily", renalAdjust: "Start 4mg if CrCl <30" },
    "Irbesartan": { generic: "Irbesartan", israeli: "Aprovel", elderlyStart: "75mg daily", elderlyMax: "300mg daily", renalAdjust: "No adjustment" },
    "Olmesartan": { generic: "Olmesartan", israeli: "Olmetec", elderlyStart: "10mg daily", elderlyMax: "40mg daily", renalAdjust: "Max 20mg if CrCl <20" },
    
    // Beta Blockers
    "Bisoprolol": { generic: "Bisoprolol", israeli: "Concor", elderlyStart: "1.25mg daily", elderlyMax: "10mg daily", caution: "Bradycardia, bronchospasm" },
    "Carvedilol": { generic: "Carvedilol", israeli: "Dilatrend", elderlyStart: "3.125mg BID", elderlyMax: "25mg BID", heartFailure: "Preferred in HF" },
    "Metoprolol": { generic: "Metoprolol", israeli: "Lopresor/Beloc", elderlyStart: "12.5mg BID", elderlyMax: "200mg daily", forms: "Tartrate BID, Succinate daily" },
    "Atenolol": { generic: "Atenolol", israeli: "Normalol", elderlyStart: "25mg daily", elderlyMax: "100mg daily", renalAdjust: "CrCl <35: 50% dose" },
    "Propranolol": { generic: "Propranolol", israeli: "Deralin", elderlyStart: "10mg TID", elderlyMax: "320mg daily", caution: "Non-selective, avoid in asthma" },
    "Nebivolol": { generic: "Nebivolol", israeli: "Nebilet", elderlyStart: "2.5mg daily", elderlyMax: "10mg daily", renalAdjust: "CrCl <30: caution" },
    "Labetalol": { generic: "Labetalol", israeli: "Trandate", elderlyStart: "100mg BID", elderlyMax: "2400mg daily", use: "Hypertensive emergency" },
    
    // Calcium Channel Blockers
    "Amlodipine": { generic: "Amlodipine", israeli: "Norvasc", elderlyStart: "2.5mg daily", elderlyMax: "10mg daily", sideEffects: "Ankle edema" },
    "Diltiazem": { generic: "Diltiazem", israeli: "Dilzem", elderlyStart: "30mg QID or 120mg SR daily", elderlyMax: "360mg daily", caution: "Avoid in HFrEF" },
    "Verapamil": { generic: "Verapamil", israeli: "Ikacor", elderlyStart: "40mg TID or 180mg SR daily", elderlyMax: "480mg daily", caution: "Constipation, avoid in HF" },
    "Nifedipine": { generic: "Nifedipine", israeli: "Adalat", elderlyStart: "30mg XL daily", elderlyMax: "90mg daily", avoid: "Immediate release" },
    "Felodipine": { generic: "Felodipine", israeli: "Plendil", elderlyStart: "2.5mg daily", elderlyMax: "10mg daily", timing: "Morning dosing" },
    "Lercanidipine": { generic: "Lercanidipine", israeli: "Zanidip", elderlyStart: "10mg daily", elderlyMax: "20mg daily", advantage: "Less edema" },
    
    // Diuretics
    "Furosemide": { generic: "Furosemide", israeli: "Lasix/Fusid", elderlyStart: "20mg daily", elderlyMax: "80mg BID", ivPO: "1:2 ratio" },
    "Torsemide": { generic: "Torsemide", israeli: "Torem", elderlyStart: "5mg daily", elderlyMax: "200mg daily", advantage: "Better bioavailability" },
    "Bumetanide": { generic: "Bumetanide", israeli: "Burinex", elderlyStart: "0.5mg daily", elderlyMax: "10mg daily", potency: "40x furosemide" },
    "Hydrochlorothiazide": { generic: "HCTZ", israeli: "Esidrex", elderlyStart: "12.5mg daily", elderlyMax: "50mg daily", caution: "Hyponatremia" },
    "Chlorthalidone": { generic: "Chlorthalidone", israeli: "Hygroton", elderlyStart: "12.5mg daily", elderlyMax: "25mg daily", advantage: "Better than HCTZ" },
    "Indapamide": { generic: "Indapamide", israeli: "Natrilix", elderlyStart: "1.25mg daily", elderlyMax: "2.5mg daily", advantage: "Less metabolic effects" },
    "Spironolactone": { generic: "Spironolactone", israeli: "Aldactone", elderlyStart: "12.5mg daily", elderlyMax: "50mg daily", monitor: "K+ closely" },
    "Eplerenone": { generic: "Eplerenone", israeli: "Inspra", elderlyStart: "25mg daily", elderlyMax: "50mg daily", advantage: "Less gynecomastia" },
    "Amiloride": { generic: "Amiloride", israeli: "Modamide", elderlyStart: "5mg daily", elderlyMax: "20mg daily", use: "K+ sparing" },
    
    // Antiarrhythmics
    "Amiodarone": { generic: "Amiodarone", israeli: "Cordarone", elderlyStart: "200mg daily", elderlyMax: "200mg daily", monitoring: "TFT, LFT, CXR yearly" },
    "Digoxin": { generic: "Digoxin", israeli: "Lanoxin", elderlyStart: "0.125mg daily", elderlyMax: "0.25mg daily", level: "0.5-0.9 ng/mL in HF" },
    "Sotalol": { generic: "Sotalol", israeli: "Sotalex", elderlyStart: "40mg BID", elderlyMax: "160mg BID", monitoring: "QTc, K+" },
    "Flecainide": { generic: "Flecainide", israeli: "Tambocor", elderlyStart: "50mg BID", elderlyMax: "150mg BID", caution: "Avoid if structural heart disease" },
    "Propafenone": { generic: "Propafenone", israeli: "Rytmonorm", elderlyStart: "150mg TID", elderlyMax: "300mg TID", caution: "Avoid in HF" },
    
    // Nitrates
    "Isosorbide Mononitrate": { generic: "ISMN", israeli: "Monoket", elderlyStart: "10mg BID", elderlyMax: "120mg daily", use: "Angina prophylaxis" },
    "Isosorbide Dinitrate": { generic: "ISDN", israeli: "Isoket", elderlyStart: "10mg TID", elderlyMax: "40mg TID", combination: "With hydralazine in HF" },
    "Nitroglycerin": { generic: "NTG", israeli: "Nitrocine", elderlyStart: "0.4mg SL PRN", use: "Acute angina", caution: "Hypotension" },
    
    // Others
    "Hydralazine": { generic: "Hydralazine", israeli: "Apresoline", elderlyStart: "10mg TID", elderlyMax: "200mg daily", sideEffect: "Lupus-like syndrome" },
    "Methyldopa": { generic: "Methyldopa", israeli: "Aldomet", elderlyStart: "250mg BID", elderlyMax: "3g daily", use: "Pregnancy, avoid in elderly" },
    "Clonidine": { generic: "Clonidine", israeli: "Catapres", elderlyStart: "0.1mg BID", elderlyMax: "0.6mg daily", caution: "Rebound HTN if stopped" },
    "Doxazosin": { generic: "Doxazosin", israeli: "Cardura", elderlyStart: "1mg daily", elderlyMax: "16mg daily", caution: "Orthostatic hypotension" },
    "Ranolazine": { generic: "Ranolazine", israeli: "Ranexa", elderlyStart: "500mg BID", elderlyMax: "1000mg BID", use: "Chronic angina" },
    "Ivabradine": { generic: "Ivabradine", israeli: "Procoralan", elderlyStart: "2.5mg BID", elderlyMax: "7.5mg BID", indication: "HFrEF with HR >70" }
  },

  // ANTICOAGULATION & ANTIPLATELET - COMPLETE
  anticoagulation: {
    // DOACs
    "Apixaban": { generic: "Apixaban", israeli: "Eliquis", standard: "5mg BID", reduced: "2.5mg BID if ≥2: age≥80, weight≤60kg, Cr≥1.5", reversal: "Andexanet alfa" },
    "Rivaroxaban": { generic: "Rivaroxaban", israeli: "Xarelto", afib: "20mg daily with dinner", vte: "15mg BID x21d then 20mg", renalAdjust: "CrCl 15-50: 15mg" },
    "Dabigatran": { generic: "Dabigatran", israeli: "Pradaxa", standard: "150mg BID", reduced: "110mg BID if >80y", reversal: "Idarucizumab" },
    "Edoxaban": { generic: "Edoxaban", israeli: "Lixiana", standard: "60mg daily", reduced: "30mg if CrCl 15-50 or weight≤60kg", caution: "Not if CrCl >95" },
    
    // Vitamin K Antagonists
    "Warfarin": { generic: "Warfarin", israeli: "Coumadin", target: "INR 2-3 (AFib), 2.5-3.5 (mechanical valve)", reversal: "Vitamin K, PCC" },
    
    // Heparins
    "Enoxaparin": { generic: "Enoxaparin", israeli: "Clexane", prophylaxis: "40mg SC daily", treatment: "1mg/kg BID", renalAdjust: "CrCl <30: 50% dose" },
    "Dalteparin": { generic: "Dalteparin", israeli: "Fragmin", prophylaxis: "5000 units SC daily", treatment: "200 units/kg daily", use: "Cancer patients" },
    "Nadroparin": { generic: "Nadroparin", israeli: "Fraxiparine", prophylaxis: "0.3mL SC daily", treatment: "Weight-based", monitoring: "Anti-Xa if needed" },
    "Tinzaparin": { generic: "Tinzaparin", israeli: "Innohep", treatment: "175 units/kg SC daily", advantage: "Once daily" },
    "Fondaparinux": { generic: "Fondaparinux", israeli: "Arixtra", prophylaxis: "2.5mg SC daily", treatment: "Weight-based", caution: "No reversal" },
    
    // Antiplatelet
    "Aspirin": { generic: "ASA", israeli: "Aspirin/Micropirin", primary: "Not recommended", secondary: "75-100mg daily", gi: "Add PPI if high risk" },
    "Clopidogrel": { generic: "Clopidogrel", israeli: "Plavix", dose: "75mg daily", loading: "300-600mg", interaction: "Variable with PPIs" },
    "Prasugrel": { generic: "Prasugrel", israeli: "Efient", dose: "10mg daily (5mg if <60kg or >75y)", caution: "Higher bleeding risk" },
    "Ticagrelor": { generic: "Ticagrelor", israeli: "Brilinta", dose: "90mg BID", sideEffect: "Dyspnea, bradycardia", advantage: "Reversible" },
    "Dipyridamole": { generic: "Dipyridamole", israeli: "Persantine", dose: "200mg ER BID", combination: "With ASA for stroke", sideEffect: "Headache" },
    "Cilostazol": { generic: "Cilostazol", israeli: "Pletal", dose: "100mg BID", use: "PAD, claudication", caution: "Avoid in HF" }
  },

  // PSYCHIATRIC - COMPLETE
  psychiatric: {
    // Antipsychotics
    "Haloperidol": { generic: "Haloperidol", israeli: "Haldol", elderlyDelirium: "0.25-0.5mg", max: "2mg/day", blackBox: "Increased mortality in dementia" },
    "Quetiapine": { generic: "Quetiapine", israeli: "Seroquel", elderlyStart: "12.5-25mg HS", behavioral: "For dementia agitation", advantage: "Less EPS" },
    "Risperidone": { generic: "Risperidone", israeli: "Risperdal", elderlyStart: "0.25mg daily", max: "2mg daily", monitoring: "Prolactin, metabolic" },
    "Olanzapine": { generic: "Olanzapine", israeli: "Zyprexa", elderlyStart: "2.5mg HS", max: "10mg daily", caution: "Weight gain, diabetes" },
    "Aripiprazole": { generic: "Aripiprazole", israeli: "Abilify", elderlyStart: "2mg daily", max: "15mg daily", advantage: "Less metabolic effects" },
    "Ziprasidone": { generic: "Ziprasidone", israeli: "Geodon", elderlyStart: "20mg BID", max: "80mg BID", caution: "QTc prolongation" },
    "Paliperidone": { generic: "Paliperidone", israeli: "Invega", elderlyStart: "3mg daily", max: "6mg daily", advantage: "Once daily" },
    "Clozapine": { generic: "Clozapine", israeli: "Leponex", use: "Treatment-resistant", monitoring: "Weekly CBC initially", sideEffect: "Agranulocytosis" },
    
    // Antidepressants - SSRIs
    "Sertraline": { generic: "Sertraline", israeli: "Lustral", elderlyStart: "25mg daily", max: "200mg daily", advantage: "Fewer interactions" },
    "Escitalopram": { generic: "Escitalopram", israeli: "Cipralex", elderlyStart: "5mg daily", max: "20mg daily", advantage: "Well tolerated" },
    "Citalopram": { generic: "Citalopram", israeli: "Cipramil", elderlyStart: "10mg daily", max: "20mg in >60y", caution: "QTc prolongation" },
    "Fluoxetine": { generic: "Fluoxetine", israeli: "Prozac", elderlyStart: "10mg daily", max: "60mg daily", halfLife: "Long (4-6 days)" },
    "Paroxetine": { generic: "Paroxetine", israeli: "Seroxat", elderlyStart: "10mg daily", max: "40mg daily", caution: "Most anticholinergic SSRI" },
    "Fluvoxamine": { generic: "Fluvoxamine", israeli: "Favoxil", elderlyStart: "25mg HS", max: "300mg daily", interaction: "Many drug interactions" },
    
    // SNRIs
    "Venlafaxine": { generic: "Venlafaxine", israeli: "Effexor", elderlyStart: "37.5mg daily", max: "225mg daily", caution: "HTN at high doses" },
    "Duloxetine": { generic: "Duloxetine", israeli: "Cymbalta", elderlyStart: "30mg daily", max: "120mg daily", use: "Also for neuropathic pain" },
    "Desvenlafaxine": { generic: "Desvenlafaxine", israeli: "Pristiq", dose: "50mg daily", advantage: "No titration needed", renalAdjust: "If CrCl <30" },
    
    // Other Antidepressants
    "Mirtazapine": { generic: "Mirtazapine", israeli: "Remeron", elderlyStart: "7.5mg HS", use: "Appetite stimulation", sideEffect: "Weight gain" },
    "Bupropion": { generic: "Bupropion", israeli: "Wellbutrin", elderlyStart: "100mg daily", max: "450mg daily", caution: "Seizure risk" },
    "Trazodone": { generic: "Trazodone", israeli: "Trittico", sleep: "25-50mg HS", depression: "150-300mg", caution: "Orthostatic hypotension" },
    "Vortioxetine": { generic: "Vortioxetine", israeli: "Brintellix", elderlyStart: "5mg daily", max: "20mg daily", advantage: "Cognitive improvement" },
    "Agomelatine": { generic: "Agomelatine", israeli: "Valdoxan", dose: "25mg HS", max: "50mg HS", monitoring: "LFTs required" },
    
    // Anxiolytics
    "Lorazepam": { generic: "Lorazepam", israeli: "Lorivan", elderlyAnxiety: "0.25-0.5mg", caution: "AVOID - falls, delirium", taper: "25% weekly" },
    "Alprazolam": { generic: "Alprazolam", israeli: "Xanax", elderlyDose: "0.25mg TID", caution: "High addiction potential", avoid: "In elderly" },
    "Diazepam": { generic: "Diazepam", israeli: "Valium", avoid: "Long half-life in elderly", accumulation: "Active metabolites", use: "Alcohol withdrawal only" },
    "Clonazepam": { generic: "Clonazepam", israeli: "Rivotril", elderlyDose: "0.25mg HS", halfLife: "Long (30-40h)", use: "REM sleep disorder" },
    "Oxazepam": { generic: "Oxazepam", israeli: "Vaben", elderlyDose: "10mg TID", advantage: "Shorter half-life", metabolism: "No active metabolites" },
    "Buspirone": { generic: "Buspirone", israeli: "Buspar", elderlyStart: "5mg BID", max: "60mg daily", advantage: "Non-benzo, no dependence" },
    
    // Mood Stabilizers
    "Lithium": { generic: "Lithium", israeli: "Lithium", elderlyLevel: "0.4-0.8 mEq/L", monitoring: "TFT, Cr, level", caution: "Narrow therapeutic index" },
    "Valproic Acid": { generic: "Valproate", israeli: "Depalept", elderlyStart: "250mg BID", level: "50-100 mcg/mL", monitoring: "LFTs, CBC" },
    "Carbamazepine": { generic: "Carbamazepine", israeli: "Tegretol", elderlyStart: "100mg BID", interactions: "Many CYP3A4", monitoring: "CBC, Na+" },
    "Lamotrigine": { generic: "Lamotrigine", israeli: "Lamictal", elderlyStart: "25mg daily", titration: "Slow to avoid SJS", use: "Bipolar depression" }
  },

  // DIABETES - COMPLETE
  diabetes: {
    // Biguanides
    "Metformin": { generic: "Metformin", israeli: "Glucophage", elderlyStart: "500mg daily", max: "2000mg daily", contraindication: "eGFR <30" },
    
    // Sulfonylureas
    "Gliclazide": { generic: "Gliclazide", israeli: "Diamicron", elderlyStart: "30mg MR daily", max: "120mg daily", advantage: "Lower hypoglycemia risk" },
    "Glimepiride": { generic: "Glimepiride", israeli: "Amaryl", elderlyStart: "1mg daily", max: "4mg daily", caution: "Hypoglycemia risk" },
    "Glipizide": { generic: "Glipizide", israeli: "Glucotrol", elderlyStart: "2.5mg daily", max: "20mg daily", timing: "30min before meals" },
    "Glyburide": { generic: "Glyburide", israeli: "Daonil", avoid: "Highest hypoglycemia risk", alternative: "Use gliclazide instead" },
    
    // DPP-4 Inhibitors
    "Sitagliptin": { generic: "Sitagliptin", israeli: "Januvia", dose: "100mg daily", renalAdjust: "50mg if CrCl 30-50", advantage: "Weight neutral" },
    "Vildagliptin": { generic: "Vildagliptin", israeli: "Galvus", dose: "50mg BID", hepatic: "Check LFTs", combination: "Often with metformin" },
    "Saxagliptin": { generic: "Saxagliptin", israeli: "Onglyza", dose: "5mg daily", renalAdjust: "2.5mg if CrCl <50", caution: "HF risk" },
    "Linagliptin": { generic: "Linagliptin", israeli: "Trajenta", dose: "5mg daily", advantage: "No renal adjustment", metabolism: "Hepatic" },
    "Alogliptin": { generic: "Alogliptin", israeli: "Vipidia", dose: "25mg daily", renalAdjust: "Reduce if CrCl <60", combination: "With metformin" },
    
    // SGLT2 Inhibitors
    "Empagliflozin": { generic: "Empagliflozin", israeli: "Jardiance", dose: "10mg daily", benefits: "CV and renal protection", caution: "UTI, euglycemic DKA" },
    "Dapagliflozin": { generic: "Dapagliflozin", israeli: "Forxiga", dose: "10mg daily", heartFailure: "Benefit in HFrEF and HFpEF", renalAdjust: "Avoid if eGFR <25" },
    "Canagliflozin": { generic: "Canagliflozin", israeli: "Invokana", dose: "100mg daily", caution: "Amputation risk", renalAdjust: "If eGFR 30-60" },
    "Ertugliflozin": { generic: "Ertugliflozin", israeli: "Steglatro", dose: "5mg daily", max: "15mg daily", combination: "With metformin or sitagliptin" },
    
    // GLP-1 Agonists
    "Liraglutide": { generic: "Liraglutide", israeli: "Victoza", start: "0.6mg SC daily", max: "1.8mg daily", benefit: "CV protection, weight loss" },
    "Semaglutide": { generic: "Semaglutide", israeli: "Ozempic", dose: "0.25mg SC weekly", max: "1mg weekly", oral: "Rybelsus 7-14mg daily" },
    "Dulaglutide": { generic: "Dulaglutide", israeli: "Trulicity", dose: "0.75mg SC weekly", max: "4.5mg weekly", advantage: "Weekly dosing" },
    "Exenatide": { generic: "Exenatide", israeli: "Byetta/Bydureon", immediate: "5mcg BID", extended: "2mg weekly", timing: "Within 60min of meals" },
    "Lixisenatide": { generic: "Lixisenatide", israeli: "Lyxumia", start: "10mcg daily", max: "20mcg daily", timing: "Within 1hr before meal" },
    
    // Meglitinides
    "Repaglinide": { generic: "Repaglinide", israeli: "NovoNorm", elderlyStart: "0.5mg before meals", max: "16mg daily", use: "Irregular eating patterns" },
    "Nateglinide": { generic: "Nateglinide", israeli: "Starlix", dose: "120mg TID before meals", caution: "Hypoglycemia if meal skipped" },
    
    // Alpha-glucosidase Inhibitors
    "Acarbose": { generic: "Acarbose", israeli: "Glucobay", start: "25mg TID with meals", max: "100mg TID", sideEffect: "GI upset, flatulence" },
    
    // Thiazolidinediones
    "Pioglitazone": { generic: "Pioglitazone", israeli: "Actos", elderlyStart: "15mg daily", max: "45mg daily", caution: "HF, fractures, bladder cancer" },
    "Rosiglitazone": { generic: "Rosiglitazone", israeli: "Avandia", restricted: "CV risk", use: "Limited due to MI risk" },
    
    // Insulins
    "Insulin Glargine": { generic: "Glargine", israeli: "Lantus/Toujeo", start: "10 units or 0.1-0.2 u/kg", duration: "24 hours", peak: "No peak" },
    "Insulin Detemir": { generic: "Detemir", israeli: "Levemir", start: "10 units or 0.1-0.2 u/kg", duration: "12-24 hours", dosing: "Often BID" },
    "Insulin Degludec": { generic: "Degludec", israeli: "Tresiba", start: "10 units daily", duration: "42 hours", advantage: "Flexible timing" },
    "NPH Insulin": { generic: "NPH", israeli: "Insulatard", start: "10 units HS", duration: "12-18 hours", peak: "4-10 hours" },
    "Regular Insulin": { generic: "Regular", israeli: "Actrapid", onset: "30-60 min", duration: "8 hours", use: "Sliding scale (avoid)" },
    "Insulin Aspart": { generic: "Aspart", israeli: "NovoRapid", onset: "10-20 min", duration: "3-5 hours", timing: "With meals" },
    "Insulin Lispro": { generic: "Lispro", israeli: "Humalog", onset: "15-30 min", duration: "3-5 hours", timing: "With meals" },
    "Insulin Glulisine": { generic: "Glulisine", israeli: "Apidra", onset: "10-15 min", duration: "3-5 hours", timing: "With meals" }
  },

  // ANALGESICS - COMPLETE
  analgesics: {
    // Non-opioid
    "Acetaminophen": { generic: "Paracetamol", israeli: "Acamol/Dexamol", elderlyDose: "500-1000mg q6h", max: "3g/day (2g if liver disease)" },
    "Metamizole": { generic: "Dipyrone", israeli: "Optalgin", dose: "500mg TID-QID", max: "4g daily", caution: "Agranulocytosis risk" },
    
    // NSAIDs
    "Ibuprofen": { generic: "Ibuprofen", israeli: "Nurofen/Advil", elderlyDose: "200-400mg TID", max: "1200mg daily", caution: "GI, renal, CV risk" },
    "Naproxen": { generic: "Naproxen", israeli: "Narocin", elderlyDose: "250mg BID", max: "500mg BID", advantage: "Longer half-life" },
    "Diclofenac": { generic: "Diclofenac", israeli: "Voltaren", elderlyDose: "25mg TID", max: "150mg daily", forms: "PO, topical, IM" },
    "Celecoxib": { generic: "Celecoxib", israeli: "Celebrex", elderlyDose: "100mg BID", max: "200mg BID", advantage: "Less GI risk" },
    "Etoricoxib": { generic: "Etoricoxib", israeli: "Arcoxia", elderlyDose: "30mg daily", max: "60mg daily", use: "Once daily dosing" },
    "Meloxicam": { generic: "Meloxicam", israeli: "Mobic", elderlyDose: "7.5mg daily", max: "15mg daily", advantage: "Once daily" },
    "Etodolac": { generic: "Etodolac", israeli: "Etopan", elderlyDose: "200mg BID", max: "1000mg daily", use: "Less GI risk" },
    "Indomethacin": { generic: "Indomethacin", israeli: "Indocid", avoid: "CNS effects in elderly", use: "Only for specific indications" },
    "Ketorolac": { generic: "Ketorolac", israeli: "Toradol", max: "5 days total", use: "Severe acute pain only", route: "IM/IV preferred" },
    
    // Weak Opioids
    "Tramadol": { generic: "Tramadol", israeli: "Tramal/Tramadex", elderlyStart: "25mg BID", max: "200mg daily", caution: "Seizures, serotonin syndrome" },
    "Codeine": { generic: "Codeine", israeli: "Codeine", elderlyDose: "15-30mg q4-6h", max: "240mg daily", metabolism: "Variable CYP2D6" },
    
    // Strong Opioids
    "Morphine": { generic: "Morphine", israeli: "MST Continus/Oramorph", elderlyStart: "2.5mg q4h", conversion: "PO:IV 3:1", caution: "Accumulation in renal failure" },
    "Oxycodone": { generic: "Oxycodone", israeli: "Oxynorm/OxyContin/Targin", elderlyStart: "2.5mg q6h", combination: "Targin has naloxone", conversion: "1.5x morphine" },
    "Hydromorphone": { generic: "Hydromorphone", israeli: "Palladone", elderlyStart: "0.5mg q4h", potency: "5x morphine", use: "Renal failure" },
    "Fentanyl": { generic: "Fentanyl", israeli: "Durogesic/Actiq/Abstral", patch: "12mcg/hr start", conversion: "100:1 morphine", caution: "Not for opioid-naive" },
    "Buprenorphine": { generic: "Buprenorphine", israeli: "Transtec/Subutex", patch: "5mcg/hr start", advantage: "Ceiling effect for respiratory depression" },
    "Tapentadol": { generic: "Tapentadol", israeli: "Palexia", elderlyStart: "25mg BID", max: "500mg daily", advantage: "Dual mechanism" },
    "Methadone": { generic: "Methadone", israeli: "Methadone", complex: "Variable half-life", use: "Specialist only", monitoring: "QTc prolongation" },
    
    // Neuropathic Pain
    "Gabapentin": { generic: "Gabapentin", israeli: "Neurontin", elderlyStart: "100mg HS", titration: "Slow increase", max: "1200mg daily in elderly" },
    "Pregabalin": { generic: "Pregabalin", israeli: "Lyrica", elderlyStart: "25mg BID", max: "300mg daily", advantage: "More predictable than gabapentin" },
    "Duloxetine": { generic: "Duloxetine", israeli: "Cymbalta", neuropathic: "30mg daily", max: "60mg daily", use: "Diabetic neuropathy" },
    "Amitriptyline": { generic: "Amitriptyline", israeli: "Elatrol", avoid: "Anticholinergic", alternative: "Use nortriptyline", neuropathic: "10-25mg HS if must use" },
    "Nortriptyline": { generic: "Nortriptyline", israeli: "Nortylin", elderlyStart: "10mg HS", max: "75mg daily", advantage: "Less anticholinergic than amitriptyline" },
    "Carbamazepine": { generic: "Carbamazepine", israeli: "Tegretol", trigeminal: "100mg BID start", max: "1200mg daily", monitoring: "CBC, Na+, levels" },
    "Lidocaine": { generic: "Lidocaine", israeli: "Lidoderm/Versatis", patch: "5% patch 12h on/off", max: "3 patches", use: "Postherpetic neuralgia" },
    "Capsaicin": { generic: "Capsaicin", israeli: "Capsaicin", concentration: "0.025-0.075%", application: "TID-QID", caution: "Initial burning" }
  },

  // GASTROINTESTINAL - COMPLETE
  gastrointestinal: {
    // PPIs
    "Omeprazole": { generic: "Omeprazole", israeli: "Losec/Omepradex", dose: "20mg daily", max: "40mg daily", duration: "Limit to 8 weeks" },
    "Esomeprazole": { generic: "Esomeprazole", israeli: "Nexium", dose: "20mg daily", max: "40mg daily", advantage: "S-isomer of omeprazole" },
    "Pantoprazole": { generic: "Pantoprazole", israeli: "Controloc", dose: "40mg daily", advantage: "Fewer drug interactions", iv: "Available" },
    "Lansoprazole": { generic: "Lansoprazole", israeli: "Lanton/Zoton", dose: "30mg daily", forms: "Capsules, orodispersible" },
    "Rabeprazole": { generic: "Rabeprazole", israeli: "Pariet", dose: "20mg daily", metabolism: "Less CYP-dependent" },
    "Dexlansoprazole": { generic: "Dexlansoprazole", israeli: "Dexilant", dose: "30mg daily", advantage: "Dual release" },
    
    // H2 Blockers
    "Famotidine": { generic: "Famotidine", israeli: "Famotidine", dose: "20mg BID", max: "40mg BID", renalAdjust: "If CrCl <50" },
    "Ranitidine": { generic: "Ranitidine", israeli: "Zantac", discontinued: "NDMA contamination 2020", alternative: "Use famotidine" },
    
    // Antacids
    "Aluminum Hydroxide": { generic: "Aluminum Hydroxide", israeli: "Alugel", dose: "5-10mL QID", caution: "Constipation, aluminum toxicity" },
    "Magnesium Hydroxide": { generic: "Magnesium Hydroxide", israeli: "Milk of Magnesia", dose: "5-15mL PRN", caution: "Diarrhea, hypermagnesemia" },
    "Calcium Carbonate": { generic: "Calcium Carbonate", israeli: "Tums/Rennie", dose: "500-1000mg PRN", max: "7000mg daily", caution: "Hypercalcemia" },
    "Sucralfate": { generic: "Sucralfate", israeli: "Ulcogant", dose: "1g QID", timing: "1hr before meals", mechanism: "Mucosal protection" },
    
    // Prokinetics
    "Metoclopramide": { generic: "Metoclopramide", israeli: "Pramin", elderlyDose: "5mg TID", max: "30mg daily", duration: "Max 5 days", caution: "EPS, tardive dyskinesia" },
    "Domperidone": { generic: "Domperidone", israeli: "Motilium", dose: "10mg TID", advantage: "Less CNS effects", caution: "QTc prolongation" },
    "Erythromycin": { generic: "Erythromycin", israeli: "Erythromycin", prokinetic: "50-100mg QID", use: "Gastroparesis", mechanism: "Motilin agonist" },
    
    // Antiemetics
    "Ondansetron": { generic: "Ondansetron", israeli: "Zofran", dose: "4-8mg TID", max: "24mg daily", caution: "QTc, constipation" },
    "Promethazine": { generic: "Promethazine", israeli: "Phenergan", elderlyDose: "12.5mg q6h", avoid: "Anticholinergic, sedation" },
    "Prochlorperazine": { generic: "Prochlorperazine", israeli: "Stemetil", elderlyDose: "5mg TID", caution: "EPS in elderly" },
    
    // Laxatives
    "Polyethylene Glycol": { generic: "PEG 3350", israeli: "Laxadin/Normalax", dose: "17g daily", safe: "Long-term use OK", mixing: "In 250mL fluid" },
    "Lactulose": { generic: "Lactulose", israeli: "Laevolac/Avilac", dose: "15-30mL daily", hepatic: "30mL QID for encephalopathy", caution: "Bloating" },
    "Senna": { generic: "Senna", israeli: "Pursennid", dose: "2 tabs HS", max: "4 tabs daily", combination: "With docusate" },
    "Bisacodyl": { generic: "Bisacodyl", israeli: "Dulcolax", oral: "5-10mg HS", suppository: "10mg PR", onset: "6-12h PO, 15-60min PR" },
    "Docusate": { generic: "Docusate", israeli: "Normalax", dose: "100mg BID", use: "Stool softener", efficacy: "Limited evidence" },
    "Psyllium": { generic: "Psyllium", israeli: "Metamucil", dose: "1 tbsp daily", caution: "Take with adequate water", benefit: "Bulk-forming" },
    "Methylnaltrexone": { generic: "Methylnaltrexone", israeli: "Relistor", dose: "12mg SC QOD", use: "Opioid-induced constipation", cost: "Expensive" },
    
    // Antidiarrheals
    "Loperamide": { generic: "Loperamide", israeli: "Imodium", dose: "2mg after each loose stool", max: "16mg daily", caution: "Avoid in C.diff" },
    "Diphenoxylate": { generic: "Diphenoxylate/Atropine", israeli: "Lomotil", dose: "2.5mg QID", caution: "Anticholinergic effects", controlled: "Low abuse potential" },
    
    // IBD Medications
    "Mesalamine": { generic: "Mesalamine", israeli: "Pentasa/Asacol", dose: "800mg TID", forms: "PO, PR", use: "Ulcerative colitis" },
    "Sulfasalazine": { generic: "Sulfasalazine", israeli: "Salazopyrin", dose: "500mg QID", monitoring: "CBC, LFTs", sideEffects: "Many" },
    "Budesonide": { generic: "Budesonide", israeli: "Budenofalk/Entocort", dose: "9mg daily", advantage: "Less systemic effects", use: "Crohn's disease" }
  },

  // RESPIRATORY - COMPLETE
  respiratory: {
    // Bronchodilators - SABA
    "Salbutamol": { generic: "Albuterol", israeli: "Ventolin", dose: "100mcg 2 puffs PRN", max: "8 puffs daily", nebulizer: "2.5mg PRN" },
    "Terbutaline": { generic: "Terbutaline", israeli: "Bricanyl", dose: "250-500mcg PRN", forms: "MDI, turbuhaler", caution: "Tremor, tachycardia" },
    
    // LABA
    "Salmeterol": { generic: "Salmeterol", israeli: "Serevent", dose: "50mcg BID", caution: "Never as monotherapy in asthma", combination: "With ICS" },
    "Formoterol": { generic: "Formoterol", israeli: "Oxis/Foradil", dose: "12mcg BID", onset: "Faster than salmeterol", use: "COPD, asthma" },
    "Indacaterol": { generic: "Indacaterol", israeli: "Onbrez", dose: "150-300mcg daily", advantage: "Once daily", use: "COPD only" },
    "Olodaterol": { generic: "Olodaterol", israeli: "Striverdi", dose: "5mcg daily", device: "Respimat", combination: "With tiotropium" },
    "Vilanterol": { generic: "Vilanterol", israeli: "In combinations", dose: "25mcg daily", combination: "With ICS or LAMA", device: "Ellipta" },
    
    // SAMA
    "Ipratropium": { generic: "Ipratropium", israeli: "Atrovent", dose: "20mcg QID", nebulizer: "500mcg QID", use: "COPD, asthma exacerbation" },
    
    // LAMA
    "Tiotropium": { generic: "Tiotropium", israeli: "Spiriva", dose: "18mcg daily (Handihaler) or 5mcg daily (Respimat)", use: "COPD, severe asthma" },
    "Glycopyrronium": { generic: "Glycopyrronium", israeli: "Seebri", dose: "50mcg daily", device: "Breezhaler", use: "COPD" },
    "Aclidinium": { generic: "Aclidinium", israeli: "Eklira", dose: "400mcg BID", device: "Genuair", advantage: "BID dosing" },
    "Umeclidinium": { generic: "Umeclidinium", israeli: "In combinations", dose: "62.5mcg daily", combination: "With vilanterol", device: "Ellipta" },
    
    // ICS
    "Beclomethasone": { generic: "Beclomethasone", israeli: "Becotide/Qvar", dose: "100-400mcg BID", potency: "Low", forms: "MDI, AeroBec" },
    "Budesonide": { generic: "Budesonide", israeli: "Pulmicort", dose: "200-400mcg BID", nebulizer: "0.5-1mg BID", potency: "Medium" },
    "Fluticasone Propionate": { generic: "Fluticasone", israeli: "Flixotide", dose: "100-500mcg BID", potency: "High", device: "MDI, Diskus" },
    "Fluticasone Furoate": { generic: "Fluticasone Furoate", israeli: "In Relvar", dose: "100-200mcg daily", advantage: "Once daily", potency: "High" },
    "Mometasone": { generic: "Mometasone", israeli: "Asmanex", dose: "200-400mcg daily", advantage: "Once daily", device: "Twisthaler" },
    "Ciclesonide": { generic: "Ciclesonide", israeli: "Alvesco", dose: "80-160mcg daily", advantage: "Prodrug, less oral thrush", potency: "Medium" },
    
    // Combination Inhalers
    "Budesonide/Formoterol": { generic: "Symbicort", israeli: "Symbicort", dose: "160/4.5mcg BID", use: "Asthma, COPD", SMART: "Can use as reliever" },
    "Fluticasone/Salmeterol": { generic: "Seretide", israeli: "Seretide", dose: "250/50mcg BID", devices: "MDI, Diskus", use: "Asthma, COPD" },
    "Fluticasone/Vilanterol": { generic: "Relvar", israeli: "Relvar", dose: "100/25mcg daily", advantage: "Once daily", device: "Ellipta" },
    "Beclomethasone/Formoterol": { generic: "Foster", israeli: "Foster", dose: "100/6mcg BID", particle: "Extra-fine", use: "Asthma, COPD" },
    
    // Other Respiratory
    "Montelukast": { generic: "Montelukast", israeli: "Singulair", dose: "10mg daily HS", use: "Asthma, allergic rhinitis", caution: "Neuropsychiatric" },
    "Theophylline": { generic: "Theophylline", israeli: "Theotard", elderlyDose: "200mg BID", level: "5-15 mcg/mL", interactions: "Many" },
    "Roflumilast": { generic: "Roflumilast", israeli: "Daxas", dose: "500mcg daily", use: "Severe COPD", sideEffects: "GI, weight loss" },
    "Carbocysteine": { generic: "Carbocysteine", israeli: "Mucolit", dose: "750mg TID", use: "Mucolytic", evidence: "Limited" },
    "Acetylcysteine": { generic: "N-Acetylcysteine", israeli: "ACC/Mucomyst", dose: "600mg daily", use: "Mucolytic, antioxidant", forms: "PO, nebulizer" }
  },

  // ANTIBIOTICS - COMPLETE
  antibiotics: {
    // Penicillins
    "Amoxicillin": { generic: "Amoxicillin", israeli: "Moxypen", dose: "500mg TID", max: "1g TID", use: "CAP, UTI, H.pylori" },
    "Amoxicillin-Clavulanate": { generic: "Augmentin", israeli: "Augmentin", dose: "875mg BID", renalAdjust: "CrCl <30: daily", use: "COPD exacerbation, bites" },
    "Penicillin V": { generic: "Phenoxymethylpenicillin", israeli: "Rafapen", dose: "500mg QID", use: "Strep throat", duration: "10 days" },
    "Penicillin G": { generic: "Benzylpenicillin", israeli: "Penicillin G", dose: "1-4 million units q4-6h", use: "Serious infections", route: "IV only" },
    "Ampicillin": { generic: "Ampicillin", israeli: "Pentrexyl", dose: "500mg QID", use: "Listeria, enterococcus", route: "PO, IV" },
    "Piperacillin-Tazobactam": { generic: "Tazocin", israeli: "Tazocin", dose: "4.5g q8h", renalAdjust: "Required", use: "Nosocomial infections" },
    
    // Cephalosporins
    "Cephalexin": { generic: "Cephalexin", israeli: "Ceflex/Keflex", dose: "500mg QID", use: "Skin infections, UTI", generation: "1st" },
    "Cefuroxime": { generic: "Cefuroxime", israeli: "Zinnat", dose: "500mg BID", use: "CAP, UTI", generation: "2nd" },
    "Cefixime": { generic: "Cefixime", israeli: "Suprax", dose: "400mg daily", use: "UTI, gonorrhea", generation: "3rd" },
    "Ceftriaxone": { generic: "Ceftriaxone", israeli: "Rocephin", dose: "1-2g daily", advantage: "Once daily, no renal adjustment", generation: "3rd" },
    "Cefazolin": { generic: "Cefazolin", israeli: "Cefamezin", dose: "1-2g q8h", use: "Surgical prophylaxis", generation: "1st" },
    "Cefotaxime": { generic: "Cefotaxime", israeli: "Claforan", dose: "1-2g q8h", use: "Meningitis", generation: "3rd" },
    "Ceftazidime": { generic: "Ceftazidime", israeli: "Fortum", dose: "1-2g q8h", coverage: "Pseudomonas", generation: "3rd" },
    "Cefepime": { generic: "Cefepime", israeli: "Maxipime", dose: "1-2g q12h", coverage: "Broad spectrum", generation: "4th" },
    
    // Fluoroquinolones
    "Ciprofloxacin": { generic: "Ciprofloxacin", israeli: "Ciprodex/Ciproxin", uti: "250mg BID", pyelonephritis: "500mg BID", caution: "Tendon rupture, QTc" },
    "Levofloxacin": { generic: "Levofloxacin", israeli: "Tavanic", dose: "500-750mg daily", use: "CAP, complicated UTI", caution: "Elderly confusion" },
    "Moxifloxacin": { generic: "Moxifloxacin", israeli: "Avelox", dose: "400mg daily", advantage: "No renal adjustment", caution: "QTc prolongation" },
    "Ofloxacin": { generic: "Ofloxacin", israeli: "Ofloxin", dose: "200-400mg BID", forms: "PO, otic, ophthalmic", use: "UTI, traveler's diarrhea" },
    "Norfloxacin": { generic: "Norfloxacin", israeli: "Noroxin", dose: "400mg BID", use: "UTI only", duration: "3-7 days" },
    
    // Macrolides
    "Azithromycin": { generic: "Azithromycin", israeli: "Zithromax", cap: "500mg x1, then 250mg x4", zpack: "500mg daily x3", caution: "QTc" },
    "Clarithromycin": { generic: "Clarithromycin", israeli: "Klacid", dose: "500mg BID", use: "H.pylori, MAC", interactions: "CYP3A4" },
    "Erythromycin": { generic: "Erythromycin", israeli: "Erythromycin", dose: "500mg QID", use: "Gastroparesis, pertussis", interactions: "Many" },
    "Roxithromycin": { generic: "Roxithromycin", israeli: "Rulid", dose: "150mg BID", advantage: "Fewer GI effects", use: "RTI, skin" },
    
    // Tetracyclines
    "Doxycycline": { generic: "Doxycycline", israeli: "Doxylin", dose: "100mg BID", use: "CAP, Lyme, malaria prophylaxis", caution: "Photosensitivity" },
    "Minocycline": { generic: "Minocycline", israeli: "Minocin", dose: "100mg BID", use: "Acne, MRSA", sideEffect: "Vertigo, pigmentation" },
    "Tetracycline": { generic: "Tetracycline", israeli: "Tetracycline", dose: "500mg QID", timing: "Empty stomach", use: "H.pylori, acne" },
    
    // Others
    "Nitrofurantoin": { generic: "Nitrofurantoin", israeli: "Macrodantin", dose: "100mg BID x5 days", contraindication: "CrCl <60", use: "Uncomplicated UTI" },
    "TMP-SMX": { generic: "Trimethoprim-Sulfamethoxazole", israeli: "Resprim/Diseptyl", uti: "160/800mg BID x3 days", pcp: "High dose", caution: "Hyperkalemia" },
    "Metronidazole": { generic: "Metronidazole", israeli: "Flagyl", dose: "500mg TID", use: "C.diff, anaerobes", caution: "No alcohol" },
    "Vancomycin": { generic: "Vancomycin", israeli: "Vancomycin", iv: "15-20mg/kg q12h", oral: "125mg QID for C.diff", monitoring: "Trough levels" },
    "Linezolid": { generic: "Linezolid", israeli: "Zyvoxid", dose: "600mg BID", use: "MRSA, VRE", caution: "Serotonin syndrome, thrombocytopenia" },
    "Clindamycin": { generic: "Clindamycin", israeli: "Dalacin", dose: "300-450mg QID", use: "Anaerobes, MRSA", caution: "C.diff risk high" },
    "Fosfomycin": { generic: "Fosfomycin", israeli: "Monurol", dose: "3g single dose", use: "Uncomplicated UTI", advantage: "Single dose" },
    "Rifaximin": { generic: "Rifaximin", israeli: "Xifaxan", dose: "550mg BID", use: "Hepatic encephalopathy, IBS", absorption: "Minimal" }
  },

  // MISCELLANEOUS - COMPLETE
  other: {
    // Vitamins & Minerals
    "Vitamin D": { generic: "Cholecalciferol", israeli: "Vitamin D3", prevention: "800-1000 IU daily", deficiency: "50,000 IU weekly x8" },
    "Vitamin B12": { generic: "Cyanocobalamin", israeli: "B12", deficiency: "1000mcg IM weekly x4, then monthly", oral: "1000mcg daily" },
    "Folic Acid": { generic: "Folic Acid", israeli: "Folic Acid", dose: "1mg daily", max: "5mg daily", use: "Deficiency, methotrexate" },
    "Calcium": { generic: "Calcium Carbonate/Citrate", israeli: "Calcium", dose: "500-600mg BID", total: "1200mg daily from diet+supplement" },
    "Iron": { generic: "Ferrous Sulfate", israeli: "Ferrocal", dose: "325mg daily-TID", elemental: "65mg per 325mg", caution: "Constipation" },
    "Magnesium": { generic: "Magnesium Oxide", israeli: "Magnox", dose: "400mg daily", use: "Deficiency, constipation", caution: "Diarrhea" },
    "Potassium": { generic: "Potassium Chloride", israeli: "Slow-K", dose: "20-40mEq daily", forms: "Slow release preferred", monitoring: "K+ levels" },
    "Zinc": { generic: "Zinc Sulfate", israeli: "Zinc", dose: "15-30mg daily", use: "Wound healing, deficiency", caution: "Copper deficiency" },
    
    // Thyroid
    "Levothyroxine": { generic: "Levothyroxine", israeli: "Eltroxin", elderlyStart: "25mcg daily", cardiac: "12.5mcg", goal: "TSH 4-6 in >70y" },
    "Liothyronine": { generic: "T3", israeli: "Cytomel", dose: "5-25mcg daily", use: "Myxedema coma", halfLife: "Short" },
    "Propylthiouracil": { generic: "PTU", israeli: "Propycil", dose: "50-150mg TID", use: "Hyperthyroidism", monitoring: "LFTs, CBC" },
    "Methimazole": { generic: "Methimazole", israeli: "Mercazole", dose: "5-15mg daily", preferred: "Over PTU except pregnancy", monitoring: "CBC" },
    
    // Osteoporosis
    "Alendronate": { generic: "Alendronate", israeli: "Fosamax", dose: "70mg weekly", instructions: "Fasting, upright 30min", duration: "5 years then holiday" },
    "Risedronate": { generic: "Risedronate", israeli: "Actonel", dose: "35mg weekly or 150mg monthly", advantage: "Monthly option", caution: "Same as alendronate" },
    "Ibandronate": { generic: "Ibandronate", israeli: "Bonviva", dose: "150mg monthly", forms: "PO or IV quarterly", use: "Postmenopausal osteoporosis" },
    "Zoledronic Acid": { generic: "Zoledronate", israeli: "Aclasta", dose: "5mg IV yearly", advantage: "Annual dosing", caution: "Acute phase reaction" },
    "Denosumab": { generic: "Denosumab", israeli: "Prolia", dose: "60mg SC q6 months", mechanism: "RANK-L inhibitor", caution: "Rebound if stopped" },
    "Teriparatide": { generic: "Teriparatide", israeli: "Forteo", dose: "20mcg SC daily", duration: "Max 2 years", use: "Severe osteoporosis" },
    "Raloxifene": { generic: "Raloxifene", israeli: "Evista", dose: "60mg daily", use: "Postmenopausal women", benefit: "Breast cancer prevention" },
    "Calcitonin": { generic: "Calcitonin", israeli: "Miacalcic", dose: "200 IU intranasal daily", use: "Vertebral fracture pain", efficacy: "Limited" },
    
    // BPH/Urological
    "Tamsulosin": { generic: "Tamsulosin", israeli: "Omnic", dose: "0.4mg daily", timing: "After same meal", caution: "IFIS, orthostatic hypotension" },
    "Alfuzosin": { generic: "Alfuzosin", israeli: "Xatral", dose: "10mg daily", advantage: "Less orthostatic hypotension", timing: "After evening meal" },
    "Doxazosin": { generic: "Doxazosin", israeli: "Cardura", elderlyStart: "1mg HS", titration: "Double q1-2 weeks", dual: "HTN + BPH" },
    "Finasteride": { generic: "Finasteride", israeli: "Proscar", dose: "5mg daily", mechanism: "5-alpha reductase", onset: "3-6 months" },
    "Dutasteride": { generic: "Dutasteride", israeli: "Avodart", dose: "0.5mg daily", advantage: "Dual 5-AR inhibition", combination: "With tamsulosin" },
    "Silodosin": { generic: "Silodosin", israeli: "Rapaflo", dose: "8mg daily", selectivity: "Most selective alpha-1A", sideEffect: "Retrograde ejaculation" },
    
    // Overactive Bladder
    "Oxybutynin": { generic: "Oxybutynin", israeli: "Ditropan", avoid: "In elderly - confusion", dose: "2.5mg BID if must use", alternative: "Mirabegron" },
    "Tolterodine": { generic: "Tolterodine", israeli: "Detrusitol", dose: "2mg BID or 4mg LA daily", advantage: "Less dry mouth than oxybutynin" },
    "Solifenacin": { generic: "Solifenacin", israeli: "Vesicare", dose: "5-10mg daily", advantage: "Once daily", selectivity: "Bladder selective" },
    "Darifenacin": { generic: "Darifenacin", israeli: "Enablex", dose: "7.5-15mg daily", advantage: "M3 selective", CNS: "Less penetration" },
    "Fesoterodine": { generic: "Fesoterodine", israeli: "Toviaz", dose: "4-8mg daily", metabolism: "Active metabolite of tolterodine" },
    "Trospium": { generic: "Trospium", israeli: "Spasmex", dose: "20mg BID", advantage: "Doesn't cross BBB", renalAdjust: "If CrCl <30" },
    "Mirabegron": { generic: "Mirabegron", israeli: "Betmiga", dose: "25-50mg daily", mechanism: "Beta-3 agonist", advantage: "No anticholinergic" },
    
    // Dementia
    "Donepezil": { generic: "Donepezil", israeli: "Aricept", start: "5mg HS", increase: "10mg after 4-6 weeks", sideEffects: "GI, bradycardia" },
    "Rivastigmine": { generic: "Rivastigmine", israeli: "Exelon", oral: "1.5mg BID, titrate to 6mg BID", patch: "4.6-13.3mg/24h", advantage: "Patch available" },
    "Galantamine": { generic: "Galantamine", israeli: "Reminyl", start: "4mg BID", target: "12mg BID", titration: "q4 weeks", mechanism: "Dual action" },
    "Memantine": { generic: "Memantine", israeli: "Ebixa", start: "5mg daily", titration: "5mg weekly to 10mg BID", indication: "Moderate-severe" },
    
    // Gout
    "Allopurinol": { generic: "Allopurinol", israeli: "Zyloric", start: "100mg daily", max: "800mg daily", renalAdjust: "Based on CrCl", caution: "SJS risk" },
    "Febuxostat": { generic: "Febuxostat", israeli: "Adenuric", dose: "40-80mg daily", advantage: "No renal adjustment", caution: "CV risk" },
    "Colchicine": { generic: "Colchicine", israeli: "Colchicine", acute: "1.2mg then 0.6mg in 1hr", prophylaxis: "0.6mg daily", renalAdjust: "Required" },
    "Probenecid": { generic: "Probenecid", israeli: "Probenecid", dose: "500mg BID", contraindication: "CrCl <30", use: "Uricosuric" },
    
    // Parkinson's
    "Levodopa-Carbidopa": { generic: "Sinemet", israeli: "Dopicar", start: "25/100 TID", titration: "Based on response", timing: "Away from protein" },
    "Levodopa-Benserazide": { generic: "Madopar", israeli: "Madopar", start: "62.5mg TID", forms: "Regular, HBS (slow release)", equivalent: "To Sinemet" },
    "Pramipexole": { generic: "Pramipexole", israeli: "Sifrol", start: "0.125mg TID", max: "1.5mg TID", renalAdjust: "Required", use: "Early PD" },
    "Ropinirole": { generic: "Ropinirole", israeli: "Requip", start: "0.25mg TID", max: "24mg daily", forms: "IR, XL", sideEffect: "Impulse control" },
    "Rasagiline": { generic: "Rasagiline", israeli: "Azilect", dose: "1mg daily", interaction: "Avoid with SSRIs", mechanism: "MAO-B inhibitor" },
    "Selegiline": { generic: "Selegiline", israeli: "Jumex", dose: "5mg BID", timing: "Morning and noon", avoid: "Evening dose", mechanism: "MAO-B" },
    "Entacapone": { generic: "Entacapone", israeli: "Comtan", dose: "200mg with each L-dopa dose", combination: "Stalevo", mechanism: "COMT inhibitor" },
    "Amantadine": { generic: "Amantadine", israeli: "PK-Merz", dose: "100mg BID", use: "Dyskinesias", renalAdjust: "Required", sideEffect: "Livedo reticularis" }
  }
};

// Export complete database
export default CompleteDrugDatabase;