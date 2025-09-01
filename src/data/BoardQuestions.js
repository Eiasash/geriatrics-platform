// HARDCORE SHLAV ALEF BOARD QUESTIONS - GERIATRICS
// Based on actual Israeli board exam patterns

const BoardQuestions = {
  questions: [
    // QUESTION 1
    {
      id: 1,
      difficulty: "HARD",
      topic: "Delirium",
      stem: `An 82-year-old woman is admitted with pneumonia. On day 3 of hospitalization, she becomes confused and agitated. She is pulling at her IV lines and trying to climb out of bed. Her daughter states she was completely normal at baseline. 
      
      Medications: Levofloxacin, Omeprazole, Lorazepam 0.5mg PRN (received 2 doses), Acetaminophen
      Vitals: BP 145/85, HR 92, RR 20, Temp 37.2°C, O2 sat 94% on 2L
      
      Labs:
      - Na: 128 mmol/L
      - K: 3.9 mmol/L  
      - Cr: 1.4 mg/dL (baseline 1.0)
      - WBC: 11,000
      - Hgb: 10.2 g/dL
      
      What is the MOST appropriate next step?`,
      options: {
        A: "Increase lorazepam to 1mg q6h scheduled",
        B: "Start haloperidol 0.25mg PO q6h PRN",
        C: "Order head CT immediately",
        D: "Discontinue levofloxacin and lorazepam",
        E: "Start quetiapine 25mg BID"
      },
      correct: "D",
      explanation: `The correct answer is D - Discontinue levofloxacin and lorazepam.

      This patient has hyperactive delirium with multiple precipitating factors:
      1. Hyponatremia (128 - needs correction)
      2. Medication-induced (levofloxacin causes confusion, lorazepam worsens delirium)
      3. Acute kidney injury (Cr 1.4 from 1.0)
      
      Management priorities:
      - STOP deliriogenic medications immediately
      - Correct hyponatremia slowly (risk of osmotic demyelination)
      - Non-pharmacologic interventions first
      - Haloperidol only if severe agitation after above measures
      
      Why other options are wrong:
      A: Benzos worsen delirium (except alcohol withdrawal)
      C: Head CT only if focal findings or trauma
      B & E: Try non-pharm first, remove precipitants`,
      pearls: [
        "Fluoroquinolones are major cause of delirium in elderly",
        "Benzos increase delirium duration and mortality",
        "Hyponatremia <130 significantly increases confusion risk"
      ]
    },

    // QUESTION 2
    {
      id: 2,
      difficulty: "HARD",
      topic: "Polypharmacy",
      stem: `An 88-year-old man with HTN, DM2, CHF (EF 35%), CKD (eGFR 28), and mild dementia presents for routine follow-up. He lives alone and has fallen twice in the past month.
      
      Current medications:
      - Metformin 1000mg BID
      - Glyburide 10mg daily
      - Lisinopril 20mg daily
      - Carvedilol 12.5mg BID
      - Furosemide 40mg daily
      - Spironolactone 25mg daily
      - Amlodipine 10mg daily
      - Atorvastatin 40mg daily
      - Aspirin 81mg daily
      - Omeprazole 20mg daily
      - Temazepam 15mg qHS
      - Oxybutynin 5mg BID
      
      BP: 108/62 standing (118/70 sitting), HR 58
      
      Which medication change is MOST urgent?`,
      options: {
        A: "Discontinue metformin",
        B: "Discontinue temazepam",
        C: "Discontinue oxybutynin",
        D: "Discontinue glyburide",
        E: "Reduce furosemide dose"
      },
      correct: "A",
      explanation: `The correct answer is A - Discontinue metformin.

      URGENT issues in order:
      1. Metformin is CONTRAINDICATED with eGFR 28 (<30)
         - Risk of lactic acidosis
         - Must stop immediately
      
      2. Falls + orthostatic hypotension + HR 58
         - Multiple antihypertensives
         - Beta blocker causing bradycardia
         - Temazepam increasing fall risk
      
      3. Anticholinergic burden
         - Oxybutynin worst offender in elderly
         - Worsens cognition in dementia
      
      Medication issues:
      - Metformin: Contraindicated (eGFR <30)
      - Glyburide: High hypoglycemia risk in elderly
      - Temazepam: Falls, cognitive impairment
      - Oxybutynin: Anticholinergic, worsens dementia
      - Triple whammy: ACE + diuretic + spironolactone with CKD
      
      While B, C, D are all important, metformin with eGFR 28 poses immediate life-threatening risk.`,
      pearls: [
        "Metformin contraindicated if eGFR <30",
        "Glyburide has highest hypoglycemia risk of sulfonylureas",
        "Oxybutynin is worst anticholinergic for cognition"
      ]
    },

    // QUESTION 3
    {
      id: 3,
      difficulty: "EXTREME",
      topic: "Capacity",
      stem: `A 79-year-old woman with moderate Alzheimer's dementia (MMSE 18/30) is admitted with pneumonia. She requires IV antibiotics for 7 days. She consistently refuses IV placement, stating "I don't need it, I'm fine." She pulls out the IV whenever placed.
      
      When asked about her illness:
      - "What's wrong?": "Nothing, I want to go home"
      - "Why are you here?": "I don't know, they brought me"
      - "What happens without treatment?": "I'll be fine"
      - "What do you want?": "To go home"
      
      Her son (HCP) insists on treatment. Her advance directive from 5 years ago states "full treatment except CPR."
      
      What is the MOST appropriate action?`,
      options: {
        A: "Treat based on son's consent as HCP",
        B: "Discharge home on oral antibiotics",
        C: "Use physical restraints to maintain IV",
        D: "Obtain ethics committee consultation",
        E: "Sedate patient to place IV"
      },
      correct: "A",
      explanation: `The correct answer is A - Treat based on son's consent as HCP.

      Capacity Assessment (FAILED all 4 components):
      1. Understanding: Doesn't know she's sick ✗
      2. Appreciation: Doesn't apply to her situation ✗
      3. Reasoning: Cannot weigh risks/benefits ✗
      4. Expression: Consistent but based on lack of understanding ✗
      
      Key Points:
      - Patient LACKS capacity for this decision
      - Son is designated healthcare proxy (HCP)
      - Advance directive supports treatment
      - Pneumonia is reversible condition
      
      Management:
      - Son can consent as surrogate
      - Use least restrictive means (mittens, 1:1 sitter)
      - Try disguising IV, distraction techniques
      - Reassess capacity as delirium clears
      
      Why others wrong:
      B: Oral antibiotics inadequate for her pneumonia
      C: Physical restraints last resort, try alternatives first
      D: Clear lack of capacity, HCP available - ethics not needed
      E: Sedation not appropriate for IV maintenance`,
      pearls: [
        "Consistency of choice ≠ capacity",
        "Moderate dementia usually lacks capacity for complex decisions",
        "Use least restrictive means to provide necessary care"
      ]
    },

    // QUESTION 4
    {
      id: 4,
      difficulty: "HARD",
      topic: "Falls",
      stem: `An 84-year-old man presents after a fall at home. He was reaching for something on a high shelf when he "lost balance." No LOC, no head trauma. This is his 3rd fall in 6 months.
      
      PMH: HTN, BPH, Osteoarthritis
      Medications: Tamsulosin 0.4mg qHS, Hydrochlorothiazide 25mg daily, Gabapentin 300mg TID
      
      Exam:
      - BP: 142/78 lying → 118/70 standing (after 3 minutes)
      - HR: 72 → 78
      - Timed Up & Go: 18 seconds
      - Vision: Cataracts bilaterally
      - Feet: Thick toenails, decreased proprioception
      
      Which intervention will MOST reduce his fall risk?`,
      options: {
        A: "Stop tamsulosin",
        B: "Start vitamin D supplementation",
        C: "Refer for cataract surgery",
        D: "Physical therapy for balance training",
        E: "Reduce gabapentin dose"
      },
      correct: "D",
      explanation: `The correct answer is D - Physical therapy for balance training.

      Fall Risk Assessment:
      1. TUG 18 seconds (>12 = high fall risk) - MOST PREDICTIVE
      2. Orthostatic hypotension (SBP drop 24mmHg)
      3. Polypharmacy with fall-risk meds
      4. Visual impairment
      5. Peripheral neuropathy
      
      Evidence for interventions:
      - PT/Balance training: 30-40% reduction in falls (STRONGEST EVIDENCE)
      - Especially effective with TUG >12 seconds
      - Tai Chi particularly beneficial
      
      Other interventions needed but less impact:
      A: Tamsulosin contributes to orthostasis but needed for BPH
      B: Vitamin D helps but smaller effect (10-15% reduction)
      C: Cataract surgery helps but takes time
      E: Gabapentin may contribute but may be needed for pain
      
      Multifactorial intervention ideal, but PT has strongest single effect.`,
      pearls: [
        "TUG >12 seconds strongest predictor of falls",
        "Exercise/PT most effective single intervention",
        "Tai Chi reduces falls by 30-40% in elderly"
      ]
    },

    // QUESTION 5
    {
      id: 5,
      difficulty: "EXTREME",
      topic: "Heart Failure",
      stem: `A 91-year-old woman with HFpEF (EF 55%), AFib on warfarin, CKD stage 3b, and frailty is admitted with acute decompensated heart failure. She lives in assisted living and uses a walker.
      
      Day 1: Weight 72kg, Cr 1.8
      Started IV furosemide 40mg BID
      Day 3: Weight 68kg, Cr 2.4, K 3.2
      She feels dizzy when standing
      
      BP: 102/58, HR 88 irregular
      JVP: 6cm
      Lungs: Few basilar crackles
      Legs: Trace edema
      
      What is the BEST next step?`,
      options: {
        A: "Increase furosemide to 60mg IV BID",
        B: "Stop diuresis and give IV fluids",
        C: "Reduce furosemide to 20mg IV daily",
        D: "Switch to torsemide 20mg PO daily",
        E: "Add metolazone 2.5mg daily"
      },
      correct: "C",
      explanation: `The correct answer is C - Reduce furosemide to 20mg IV daily.

      Assessment:
      - Lost 4kg (8.8 lbs) in 2 days = RAPID diuresis
      - Cr 1.8 → 2.4 (33% increase) = AKI
      - K 3.2 = Hypokalemia
      - Orthostatic symptoms
      - JVP only 6cm, trace edema = Near euvolemia
      
      Key Points in Frail Elderly:
      1. Achieved adequate diuresis (4kg loss)
      2. Now near euvolemic (low JVP, minimal edema)
      3. Worsening renal function from overdiuresis
      4. Need gentle continued diuresis to prevent reaccumulation
      
      Management:
      - Reduce diuretic intensity
      - Replete potassium
      - Monitor daily weights
      - Transition to PO when stable
      
      Why others wrong:
      A: Would worsen AKI
      B: Too extreme, she still needs some diuresis
      D: PO absorption uncertain in acute setting
      E: Metolazone too potent, would worsen AKI`,
      pearls: [
        "In elderly, Cr rise >0.3 during diuresis suggests overdiuresis",
        "Target weight loss 0.5-1kg/day in frail elderly",
        "JVP <8cm suggests adequate decongestion"
      ]
    },

    // QUESTION 6
    {
      id: 6,
      difficulty: "HARD",
      topic: "Dementia",
      stem: `An 86-year-old man with moderate Alzheimer's dementia lives with his daughter. She reports he's been increasingly agitated in the evenings, wandering the house, and accusing her of stealing his things. He sleeps most of the day. No acute medical issues found.
      
      Current medications:
      - Donepezil 10mg qAM
      - Memantine 10mg BID
      - Melatonin 3mg qHS
      
      What is the MOST appropriate initial intervention?`,
      options: {
        A: "Start risperidone 0.25mg qHS",
        B: "Increase melatonin to 6mg",
        C: "Switch donepezil to qHS dosing",
        D: "Implement structured daily activities",
        E: "Add trazodone 25mg qHS"
      },
      correct: "D",
      explanation: `The correct answer is D - Implement structured daily activities.

      This is classic SUNDOWNING with:
      - Evening agitation
      - Day-night reversal
      - Paranoid delusions
      
      Evidence-based approach (DICE):
      1. Describe: Sundowning with sleep-wake reversal
      2. Investigate: No medical cause, environmental triggers
      3. Create: Non-pharmacologic interventions FIRST
      4. Evaluate: Reassess before medications
      
      Structured activities:
      - Morning light exposure
      - Regular daily routine
      - Physical activity during day
      - Limit daytime napping
      - Calm evening routine
      
      Why others wrong:
      A: Antipsychotics increase mortality, last resort only
      B: Melatonin dose adequate, timing more important
      C: Donepezil can cause vivid dreams if given at night
      E: Medication should be last resort after behavioral interventions
      
      Non-pharmacologic interventions are first-line for behavioral symptoms in dementia.`,
      pearls: [
        "Sundowning affects 20-45% of Alzheimer's patients",
        "Non-pharmacologic interventions first for all BPSD",
        "Antipsychotics increase mortality by 1.6-1.7x in dementia"
      ]
    },

    // QUESTION 7
    {
      id: 7,
      difficulty: "EXTREME",
      topic: "Frailty",
      stem: `A 78-year-old woman is evaluated for increasing fatigue. She lives alone, shops independently, but stopped driving last year. She's lost 6kg unintentionally over the past year.
      
      Evaluation:
      - Grip strength: 14kg (normal >18kg for women)
      - Gait speed: 0.6 m/s over 4 meters
      - Exhaustion: "I feel tired most of the time"
      - Physical activity: Walks to mailbox daily only
      - Weight loss: 6kg/year unintentional
      
      Labs: Normal CBC, BMP, TSH, albumin 3.2
      
      According to Fried Frailty Phenotype, what is her status?`,
      options: {
        A: "Robust",
        B: "Pre-frail",
        C: "Frail",
        D: "Severely frail",
        E: "Cannot determine"
      },
      correct: "C",
      explanation: `The correct answer is C - Frail.

      Fried Frailty Phenotype (≥3 criteria = FRAIL):
      
      1. ✓ Weight loss (>4.5kg/year unintentional)
      2. ✓ Exhaustion (self-reported fatigue)
      3. ✓ Weakness (grip <18kg for women)
      4. ✓ Slow walking (0.6 m/s, normal >0.8)
      5. ✓ Low activity (minimal physical activity)
      
      Score: 5/5 criteria = FRAIL
      
      Classification:
      - 0 = Robust
      - 1-2 = Pre-frail
      - ≥3 = Frail
      
      Implications:
      - 3x risk of falls
      - 6x risk of death
      - 4x risk of hospitalization
      - Needs comprehensive geriatric assessment
      - Consider resistance exercise program
      - Protein supplementation (1.2-1.5g/kg/day)
      
      Note: "Severely frail" is not part of Fried criteria (that's Clinical Frailty Scale).`,
      pearls: [
        "Gait speed <0.8 m/s predicts disability",
        "Grip strength cutoffs: <30kg men, <18kg women",
        "25% of >85 years old are frail"
      ]
    },

    // QUESTION 8
    {
      id: 8,
      difficulty: "HARD",
      topic: "Anticoagulation",
      stem: `An 82-year-old woman with AFib, HTN, and diabetes has a CHA₂DS₂-VASc score of 6. She weighs 58kg, Cr 1.3mg/dL.
      
      You start apixaban. What is the CORRECT dose?`,
      options: {
        A: "2.5mg PO daily",
        B: "2.5mg PO BID",
        C: "5mg PO daily",
        D: "5mg PO BID",
        E: "10mg PO BID"
      },
      correct: "B",
      explanation: `The correct answer is B - 2.5mg PO BID.

      Apixaban dose reduction criteria (need ≥2):
      1. ✓ Age ≥80 years (she's 82)
      2. ✓ Weight ≤60kg (she's 58kg)
      3. ✗ Cr ≥1.5mg/dL (she's 1.3)
      
      She meets 2/3 criteria → Reduce dose to 2.5mg BID
      
      Important DOAC dosing:
      
      Apixaban:
      - Standard: 5mg BID
      - Reduced: 2.5mg BID if ≥2 criteria above
      
      Rivaroxaban:
      - Standard: 20mg daily WITH FOOD
      - CrCl 15-50: 15mg daily with food
      
      Dabigatran:
      - Standard: 150mg BID
      - Consider 110mg BID if >80y or bleeding risk
      
      Common errors:
      - Forgetting apixaban is BID (not daily)
      - Not checking all 3 criteria
      - Using CrCl instead of Cr for apixaban`,
      pearls: [
        "Apixaban only DOAC using serum Cr (not CrCl) for dosing",
        "Apixaban has lowest bleeding risk of DOACs",
        "Must take rivaroxaban with largest meal of day"
      ]
    },

    // QUESTION 9
    {
      id: 9,
      difficulty: "EXTREME",
      topic: "Orthostatic Hypotension",
      stem: `An 80-year-old man complains of dizziness when standing. He has Parkinson's disease, BPH, and diabetes.
      
      Medications:
      - Carbidopa-levodopa 25/100 TID
      - Tamsulosin 0.4mg qHS
      - Metformin 1000mg BID
      - Lisinopril 10mg daily
      
      BP lying: 150/85
      BP standing 1 min: 125/75
      BP standing 3 min: 110/65
      HR lying: 72
      HR standing: 74
      
      What is the BEST initial management?`,
      options: {
        A: "Stop tamsulosin",
        B: "Stop lisinopril",
        C: "Add fludrocortisone 0.1mg daily",
        D: "Add midodrine 5mg TID",
        E: "Compression stockings and salt tablets"
      },
      correct: "E",
      explanation: `The correct answer is E - Compression stockings and salt tablets.

      Orthostatic Hypotension Assessment:
      - SBP drop: 40mmHg (>20 = significant)
      - DBP drop: 20mmHg (>10 = significant)
      - No HR increase = Neurogenic (not hypovolemic)
      
      Neurogenic OH (Parkinson's + diabetes autonomic neuropathy)
      
      Stepwise Management:
      1. Non-pharmacologic FIRST:
         - Compression stockings (30-40mmHg)
         - Salt tablets (2-3g/day)
         - Head of bed elevation 10-20°
         - Avoid sudden standing
         - Adequate hydration
      
      2. Medication adjustment:
         - Consider reducing but not stopping tamsulosin (needed for BPH)
         - Keep lisinopril (supine HTN 150/85)
      
      3. Add medications only if above fails:
         - Fludrocortisone (watch for supine HTN)
         - Midodrine (last resort)
      
      Key: Supine HTN + orthostatic hypotension = difficult balance
      Need to treat both without worsening either.`,
      pearls: [
        "Neurogenic OH: No compensatory tachycardia",
        "Supine HTN + OH common in Parkinson's",
        "Salt/compression stockings first line for neurogenic OH"
      ]
    },

    // QUESTION 10
    {
      id: 10,
      difficulty: "HARD",
      topic: "Pressure Ulcers",
      stem: `An 89-year-old bedbound woman with advanced dementia develops a sacral pressure ulcer. On exam: 4x5cm area with exposed bone, no signs of infection.
      
      Braden Scale score: 11
      Albumin: 2.8 g/dL
      Prealbumin: 14 mg/dL
      
      What stage is this pressure injury?`,
      options: {
        A: "Stage 2",
        B: "Stage 3",
        C: "Stage 4",
        D: "Unstageable",
        E: "Deep tissue injury"
      },
      correct: "C",
      explanation: `The correct answer is C - Stage 4.

      Pressure Injury Staging:
      - Stage 1: Intact skin, non-blanchable erythema
      - Stage 2: Partial thickness, epidermis ± dermis
      - Stage 3: Full thickness, fat visible, no bone/tendon/muscle
      - Stage 4: Full thickness with exposed bone/tendon/muscle ← THIS PATIENT
      - Unstageable: Base obscured by slough/eschar
      - DTI: Purple/maroon intact skin or blood blister
      
      Key: EXPOSED BONE = Stage 4
      
      Management priorities:
      1. Pressure relief (air mattress, turn q2h)
      2. Nutrition (protein 1.5g/kg, calories 30-35kcal/kg)
      3. Wound care (debridement, moisture balance)
      4. Treat infection if present
      5. Pain management
      
      Poor prognostic factors:
      - Braden 11 (high risk)
      - Albumin 2.8 (malnutrition)
      - Stage 4 with bone exposure
      - Advanced dementia (immobility)
      
      Note: Can NEVER reverse stage (4→3) even if healing.`,
      pearls: [
        "Visible bone/tendon/muscle = Stage 4",
        "Braden ≤12 = high risk for pressure injury",
        "Stage 4 ulcers have 50% 1-year mortality"
      ]
    },

    // QUESTION 11
    {
      id: 11,
      difficulty: "EXTREME",
      topic: "Diabetes Management",
      stem: `An 85-year-old man with diabetes, mild cognitive impairment, and recurrent falls is brought by his daughter. He lives alone, forgets meals sometimes. A1C is 6.2%. Yesterday he was found confused with glucose of 42mg/dL.
      
      Current regimen:
      - Insulin glargine 20 units qHS
      - Insulin lispro sliding scale AC meals
      - Metformin 1000mg BID
      
      What is the MOST appropriate change?`,
      options: {
        A: "Stop all insulin, continue metformin",
        B: "Reduce glargine to 10 units",
        C: "Stop sliding scale, continue glargine",
        D: "Stop metformin, continue current insulin",
        E: "Change to premixed insulin 70/30"
      },
      correct: "A",
      explanation: `The correct answer is A - Stop all insulin, continue metformin.

      Key Issues:
      1. Hypoglycemia (glucose 42) = SERIOUS EVENT in elderly
      2. A1C 6.2% = OVER-TREATED for his risk profile
      3. Lives alone + cognitive impairment + falls = high risk
      4. Forgets meals = dangerous with insulin
      
      ADA Goals for Complex/Frail Elderly:
      - A1C: 8-8.5% (not 6.2%!)
      - Avoid hypoglycemia > tight control
      - Simplify regimen
      
      Why stop ALL insulin:
      - A1C 6.2% suggests doesn't need insulin
      - Hypoglycemia risk too high
      - Metformin alone likely sufficient
      - No hypoglycemia with metformin monotherapy
      
      Why others wrong:
      B: Still risk with any insulin
      C: Glargine alone still causes hypoglycemia
      D: Metformin safer than insulin
      E: Premixed even more dangerous (fixed ratios)
      
      Severe hypoglycemia in elderly → reassess entire regimen.`,
      pearls: [
        "A1C goal 8-8.5% in frail elderly with cognitive impairment",
        "Hypoglycemia more dangerous than hyperglycemia in elderly",
        "Sliding scale insulin particularly dangerous in irregular eaters"
      ]
    },

    // QUESTION 12
    {
      id: 12,
      difficulty: "HARD",
      topic: "Urinary Incontinence",
      stem: `A 76-year-old woman complains of urinary leakage when she coughs or laughs. She also has urgency and frequency, going to the bathroom 10 times daily. She's tried "Kegel exercises" without improvement.
      
      Exam: Urine leakage with cough, mild cystocele
      Urinalysis: Normal
      Post-void residual: 30mL
      
      What is the BEST initial pharmacologic treatment?`,
      options: {
        A: "Oxybutynin 5mg BID",
        B: "Mirabegron 25mg daily",
        C: "Duloxetine 40mg daily",
        D: "Vaginal estrogen cream",
        E: "Tamsulosin 0.4mg daily"
      },
      correct: "B",
      explanation: `The correct answer is B - Mirabegron 25mg daily.

      This patient has MIXED incontinence:
      - Stress: Leakage with cough/laugh
      - Urge: Urgency and frequency
      
      Treatment approach for mixed:
      1. Treat predominant symptom (urgency/frequency suggests urge predominant)
      2. Avoid anticholinergics in elderly
      3. Choose safest option
      
      Mirabegron (Beta-3 agonist):
      - Effective for urge symptoms
      - No anticholinergic effects
      - No cognitive impairment
      - Safe in elderly
      
      Why others wrong:
      A: Oxybutynin worst anticholinergic for cognition
      C: Duloxetine for pure stress incontinence, not first-line
      D: Vaginal estrogen helps but not primary treatment
      E: Tamsulosin for men with BPH, not female incontinence
      
      After mirabegron, can add vaginal estrogen or pelvic floor PT.`,
      pearls: [
        "Mixed incontinence most common type in elderly women",
        "Avoid anticholinergics (especially oxybutynin) in elderly",
        "Mirabegron safer than anticholinergics for cognition"
      ]
    },

    // Additional hardcore questions continuing...
    {
      id: 13,
      difficulty: "EXTREME",
      topic: "Acute Kidney Injury",
      stem: `An 83-year-old man with CHF is admitted with dyspnea. Started on IV furosemide 80mg BID. 
      
      Day 1: Cr 1.2, Weight 85kg
      Day 2: Cr 1.6, Weight 83kg, urine output 1.2L
      Day 3: Cr 2.1, Weight 81kg, urine output 800mL
      
      Urinalysis: 
      - Specific gravity 1.025
      - No protein, no cells
      - Muddy brown casts
      
      FeNa: 2.8%
      
      What is the MOST likely diagnosis?`,
      options: {
        A: "Pre-renal azotemia",
        B: "Acute tubular necrosis",
        C: "Acute interstitial nephritis",
        D: "Post-renal obstruction",
        E: "Cardiorenal syndrome"
      },
      correct: "B",
      explanation: `The correct answer is B - Acute tubular necrosis.

      Key findings pointing to ATN:
      1. Muddy brown casts = PATHOGNOMONIC for ATN
      2. FeNa 2.8% (>2% suggests intrinsic renal)
      3. Progressive Cr rise despite diuresis
      4. High specific gravity but no response
      
      Timeline suggests ATN from:
      - Overdiuresis → volume depletion
      - Hypoperfusion → ischemic ATN
      - Common in elderly with aggressive diuresis
      
      Differentiating:
      - Pre-renal: FeNa <1%, hyaline casts, responds to volume
      - ATN: FeNa >2%, muddy brown casts, no response to volume
      - AIN: WBC casts, eosinophils, rash/fever
      - Obstruction: Hydronephrosis on ultrasound
      - Cardiorenal: Improves with decongestion, not worsens
      
      Management:
      - Reduce/hold diuretics
      - Avoid nephrotoxins
      - Support with time (recovery 7-21 days)`,
      pearls: [
        "Muddy brown casts = ATN until proven otherwise",
        "FeNa unreliable if on diuretics, use FeUrea instead",
        "Elderly at high risk for ATN with aggressive diuresis"
      ]
    },

    {
      id: 14,
      difficulty: "HARD",
      topic: "Cognitive Assessment",
      stem: `You're evaluating an 81-year-old woman brought by family for memory concerns. She scores 22/30 on MMSE with the following errors:
      
      - Orientation: Missed date and floor (−2)
      - Registration: Got all 3 words (0)
      - Attention: Serial 7s: 93, 86, 79, 65, 58 (−3)
      - Recall: 0/3 words (−3)
      - Language/Construction: All correct (0)
      
      Clock draw: Numbers bunched on right side, hands incorrect
      
      What type of dementia is MOST likely?`,
      options: {
        A: "Alzheimer's disease",
        B: "Vascular dementia",
        C: "Lewy body dementia",
        D: "Frontotemporal dementia",
        E: "Normal pressure hydrocephalus"
      },
      correct: "A",
      explanation: `The correct answer is A - Alzheimer's disease.

      Classic Alzheimer's pattern:
      1. Memory loss (0/3 recall) - HALLMARK
      2. Preserved language (initially)
      3. Visuospatial problems (clock draw)
      4. Calculation difficulty (serial 7s)
      
      MMSE patterns by dementia type:
      
      Alzheimer's:
      - Memory loss prominent early
      - Language preserved until later
      - Visuospatial deficits
      
      Vascular:
      - Stepwise decline
      - Executive dysfunction
      - Focal findings
      
      Lewy Body:
      - Fluctuating attention
      - Visual hallucinations
      - Visuospatial prominent
      
      Frontotemporal:
      - Behavior/personality first
      - Language variants
      - Memory relatively preserved
      
      NPH:
      - Gait first
      - Urinary incontinence
      - "Magnetic" gait
      
      The profound memory loss with preserved language strongly suggests Alzheimer's.`,
      pearls: [
        "0/3 delayed recall highly predictive of Alzheimer's",
        "Clock draw sensitive for executive and visuospatial function",
        "Serial 7s can be affected by education level"
      ]
    },

    {
      id: 15,
      difficulty: "EXTREME",
      topic: "Syncope",
      stem: `An 87-year-old man had syncope while urinating at night. No prodrome, immediate recovery. This happened once before after a large meal.
      
      PMH: HTN, BPH
      Meds: Amlodipine 5mg, Tamsulosin 0.4mg
      
      Exam: Normal
      ECG: NSR, no blocks
      Echo: Normal EF, mild LVH
      Orthostatics: Negative
      
      What is the MOST likely diagnosis?`,
      options: {
        A: "Orthostatic hypotension",
        B: "Vasovagal syncope",
        C: "Situational syncope",
        D: "Cardiac arrhythmia",
        E: "Carotid sinus hypersensitivity"
      },
      correct: "C",
      explanation: `The correct answer is C - Situational syncope.

      Classic features of situational syncope:
      1. During/immediately after urination (micturition syncope)
      2. Previous episode after large meal (postprandial)
      3. No prodrome (unlike vasovagal)
      4. Immediate recovery
      5. Normal cardiac evaluation
      
      Mechanisms:
      - Micturition: Valsalva + sudden bladder decompression
      - Postprandial: Blood shunting to GI tract
      - Both trigger vagal response → bradycardia + vasodilation
      
      Risk factors in this patient:
      - Elderly male
      - BPH (straining to urinate)
      - Tamsulosin (alpha blockade)
      - Nighttime (moving from supine to standing)
      
      Why others wrong:
      A: Orthostatics negative
      B: Vasovagal has prodrome (nausea, diaphoresis)
      D: Normal ECG and echo
      E: No neck turning/shaving trigger
      
      Management:
      - Sit to urinate
      - Avoid straining
      - Rise slowly at night`,
      pearls: [
        "Micturition syncope classic in elderly men with BPH",
        "Situational syncope has no prodrome unlike vasovagal",
        "Alpha blockers increase risk of micturition syncope"
      ]
    }
  ],

  // Study tips for Israeli boards
  studyTips: {
    highYield: [
      "Know Beers Criteria and STOPP/START cold",
      "Master CHA₂DS₂-VASc and HAS-BLED scores",
      "Memorize frailty criteria (Fried phenotype)",
      "Understand capacity assessment (4 components)",
      "Know medication adjustments for renal function",
      "Master delirium vs dementia differentiation"
    ],
    
    israeliSpecific: [
      "Know Kupat Cholim coverage differences",
      "Understand Bituach Leumi benefits for elderly",
      "Know Israeli vaccination schedule for elderly",
      "Understand sal techologia (technology basket) criteria",
      "Know nursing home admission criteria in Israel"
    ],
    
    commonMistakes: [
      "Forgetting to check orthostatic vitals (wait full 3 minutes!)",
      "Using normal adult drug doses in elderly",
      "Missing medication as cause of delirium",
      "Treating asymptomatic bacteriuria",
      "Over-treating diabetes in frail elderly",
      "Using Beers medications without thinking"
    ],
    
    examStrategy: [
      "Always consider polypharmacy as answer",
      "Non-pharmacologic interventions usually correct for behavioral symptoms",
      "If elderly + confusion, think delirium first",
      "Frailty changes all management goals",
      "Quality of life > longevity in very elderly",
      "When in doubt, 'reduce medications' often correct"
    ]
  },

  // Quick review sheets
  quickReview: {
    mustKnowDoses: {
      "Haloperidol (delirium)": "0.25-0.5mg, not 5mg!",
      "Morphine (elderly)": "Start 1-2mg IV, not 4mg",
      "Lorazepam (if must use)": "0.25-0.5mg, not 1mg",
      "Insulin (elderly)": "Start 0.1 units/kg, not 0.5",
      "Furosemide IV:PO": "1:2 ratio (40 IV = 80 PO)"
    },
    
    criticalCutoffs: {
      "Fall risk": "TUG >12 seconds",
      "Frailty": "≥3 Fried criteria",
      "Delirium": "CAM positive (1+2+(3 or 4))",
      "Orthostatic": "SBP drop >20 or DBP >10",
      "Polypharmacy": "≥5 medications",
      "Malnutrition": "Albumin <3.5, BMI <22"
    }
  }
};

export default BoardQuestions;