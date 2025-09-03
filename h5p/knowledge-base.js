// knowledge-base.js
// Comprehensive Geriatrics Knowledge Base for Study Platform

class GeriatricsKnowledge {
  constructor() {
    this.studyCards = [];
    this.drugDatabase = {};
    this.guidelines = {};
    this.researchPapers = [];
    this.clinicalPearls = [];
    this.initializeKnowledge();
  }

  initializeKnowledge() {
    // Initialize all knowledge modules
    this.loadCoreStudyCards();
    this.loadDrugDatabase();
    this.loadGuidelines();
    this.loadResearchPapers();
    this.loadClinicalPearls();
    
    console.log(`📚 Geriatrics Knowledge Base Loaded:
      - ${this.studyCards.length} Study Cards
      - ${Object.keys(this.drugDatabase).length} Drugs in Database
      - ${Object.keys(this.guidelines).length} Clinical Guidelines
      - ${this.researchPapers.length} Research Papers
      - ${this.clinicalPearls.length} Clinical Pearls`);
  }

  loadCoreStudyCards() {
    // Frailty Assessment Cards
    this.addCard('frailty', 'What are the 9 Clinical Frailty Scale categories?', 
      '1-Very Fit, 2-Well, 3-Managing Well, 4-Vulnerable, 5-Mildly Frail, 6-Moderately Frail, 7-Severely Frail, 8-Very Severely Frail, 9-Terminally Ill');
    
    this.addCard('frailty', 'What defines CFS Level 5 (Mildly Frail)?',
      'More evident slowing, need help with high order IADLs (finances, transportation, heavy housework). Typically, mild frailty progressively impairs shopping and walking outside alone, meal preparation and housework.');
    
    this.addCard('frailty', 'What are the 5 Fried Frailty Phenotype criteria?',
      '1. Unintentional weight loss (≥10 lbs in past year), 2. Self-reported exhaustion, 3. Weakness (grip strength), 4. Slow walking speed, 5. Low physical activity. Frail=3+, Pre-frail=1-2');
    
    this.addCard('frailty', 'What is the FRAIL scale scoring?',
      'F-Fatigue, R-Resistance (climb stairs), A-Ambulation (walk 1 block), I-Illness (>5), L-Loss of weight (>5%). Score 3+ = Frail, 1-2 = Pre-frail');
    
    this.addCard('frailty', 'What is the prevalence of frailty by age?',
      '65-69 years: 4%, 70-74 years: 7%, 75-79 years: 9%, 80-84 years: 16%, 85+ years: 26%. Overall community-dwelling elderly: 10.7%');
    
    this.addCard('frailty', 'What are key interventions for frailty?',
      '1. Multicomponent exercise program (resistance + balance), 2. Protein supplementation (1.2-1.5g/kg/day), 3. Vitamin D if deficient, 4. Comprehensive geriatric assessment, 5. Medication review');

    // Delirium Cards
    this.addCard('delirium', 'What are the CAM criteria for delirium diagnosis?',
      'Requires features 1 AND 2 AND either 3 OR 4: 1. Acute onset and fluctuating course, 2. Inattention, 3. Disorganized thinking, 4. Altered level of consciousness');
    
    this.addCard('delirium', 'What are the 3 subtypes of delirium?',
      '1. Hyperactive (25%) - agitated, hallucinations, 2. Hypoactive (50%) - withdrawn, somnolent, worse prognosis, 3. Mixed (25%) - alternating features');
    
    this.addCard('delirium', 'What is the HELP protocol for delirium prevention?',
      'Hospital Elder Life Program: 1. Orient regularly, 2. Promote sleep (warm milk, massage, quiet), 3. Early mobilization, 4. Vision/hearing aids, 5. Avoid dehydration, 6. Avoid unnecessary medications');
    
    this.addCard('delirium', 'What are high-risk medications for delirium?',
      'Anticholinergics, Benzodiazepines, Opioids (especially meperidine), Corticosteroids, H2-blockers, Fluoroquinolones, Dopamine agonists');
    
    this.addCard('delirium', 'What is the RASS scale?',
      'Richmond Agitation-Sedation Scale: +4 Combative, +3 Very agitated, +2 Agitated, +1 Restless, 0 Alert and calm, -1 Drowsy, -2 Light sedation, -3 Moderate sedation, -4 Deep sedation, -5 Unarousable');

    // Falls Prevention Cards
    this.addCard('falls', 'What are the components of Morse Fall Scale?',
      '1. History of falling (25 pts), 2. Secondary diagnosis (15 pts), 3. Ambulatory aid (0-30 pts), 4. IV/Heparin lock (20 pts), 5. Gait/Transferring (0-20 pts), 6. Mental status (0-15 pts). High risk ≥45');
    
    this.addCard('falls', 'What is the Timed Up and Go test?',
      'Rise from chair, walk 3 meters, turn, walk back, sit down. Normal <10 sec, Borderline 10-20 sec, Abnormal >20 sec. >13.5 sec predicts falls');
    
    this.addCard('falls', 'What are AGS/BGS fall prevention interventions?',
      '1. Strength and balance exercise (Tai Chi), 2. Medication review (reduce psychotropics), 3. Vitamin D supplementation, 4. Vision assessment, 5. Home safety evaluation, 6. Postural hypotension management');
    
    this.addCard('falls', 'What medications increase fall risk?',
      'Benzodiazepines (OR 1.6), Antipsychotics (OR 1.7), Antidepressants (OR 1.7), Sedatives/hypnotics (OR 1.5), Antihypertensives with orthostasis');
    
    this.addCard('falls', 'What is the STEADI algorithm?',
      'CDC Stopping Elderly Accidents, Deaths & Injuries: Screen (3 questions), Assess (TUG, orthostatics, vision, feet, meds), Intervene (evidence-based interventions)');

    // Polypharmacy Cards
    this.addCard('polypharmacy', 'What defines polypharmacy?',
      'Standard: ≥5 medications, Excessive: ≥10 medications. Prevalence: 40% of elderly take 5+, 20% take 10+. Associated with increased mortality, falls, cognitive decline, hospitalization');
    
    this.addCard('polypharmacy', 'What are the STOPP criteria categories?',
      'A-Indication, B-Cardiovascular, C-Antiplatelet/Anticoagulant, D-CNS/Psychotropics, E-Renal, F-GI, G-Respiratory, H-Musculoskeletal, I-Urogenital, J-Endocrine, K-Drugs increasing fall risk, L-Analgesics, M-Antimuscarinic burden, N-Duplicate therapy');
    
    this.addCard('polypharmacy', 'What are key Beers Criteria 2023 updates?',
      'Avoid: First-gen antihistamines, Benzodiazepines >60yo, Antipsychotics for behavioral issues, Sliding scale insulin alone, Muscle relaxants, NSAIDs chronic use');
    
    this.addCard('polypharmacy', 'What is the anticholinergic burden scale?',
      'Score 1: Low activity (ranitidine, furosemide), Score 2: Moderate (carbamazepine), Score 3: High (amitriptyline, oxybutynin). Total score ≥3 associated with cognitive decline');
    
    this.addCard('polypharmacy', 'What is the deprescribing process?',
      '1. Comprehensive medication review, 2. Identify PIMs, 3. Determine if drug can be stopped, 4. Prioritize (highest risk first), 5. Create tapering plan, 6. Monitor and document');

    // Dementia Cards
    this.addCard('dementia', 'What is the MMSE scoring interpretation?',
      '24-30: No cognitive impairment, 18-23: Mild cognitive impairment, 10-17: Moderate cognitive impairment, <10: Severe cognitive impairment. Adjust for education level');
    
    this.addCard('dementia', 'What are MoCA advantages over MMSE?',
      'Better sensitivity for MCI (90% vs 18%), Tests executive function, Includes clock drawing, Free for clinical use, Available in multiple languages, Takes 10 minutes');
    
    this.addCard('dementia', 'What are DSM-5 criteria for Major Neurocognitive Disorder?',
      'A. Significant cognitive decline in 1+ domains, B. Interferes with independence, C. Not exclusively during delirium, D. Not better explained by another mental disorder');
    
    this.addCard('dementia', 'What is the AD8 screening tool?',
      '8 questions for informant about changes in: Judgment, Interest, Repeating, Learning, Orientation, Finances, Appointments, Memory. Score ≥2 suggests cognitive impairment');
    
    this.addCard('dementia', 'What are BPSD management strategies?',
      'Non-pharm first: Identify triggers, Structured routine, Music therapy, Pet therapy, Validation therapy. Pharm if severe: Risperidone (only FDA approved), avoid benzos');

    // Comprehensive Geriatric Assessment Cards
    this.addCard('cga', 'What are the domains of CGA?',
      '1. Medical (diagnoses, medications), 2. Functional (ADLs, IADLs), 3. Cognitive (MMSE/MoCA), 4. Psychological (GDS), 5. Social (support, finances), 6. Environmental (home safety), 7. Spiritual');
    
    this.addCard('cga', 'What are the 6 basic ADLs (Katz)?',
      'Bathing, Dressing, Toileting, Transferring, Continence, Feeding. Remember: DEATH-B (reversed). Independent in all = 6/6');
    
    this.addCard('cga', 'What are the 8 IADLs (Lawton)?',
      'Shopping, Housekeeping, Accounting (finances), Food prep, Transportation, Medications, Phone use, Laundry. Remember: SHAFT-MPL');
    
    this.addCard('cga', 'What is the GDS-15 scoring?',
      'Geriatric Depression Scale: 0-4 normal, 5-8 mild depression, 9-11 moderate depression, 12-15 severe depression. Sensitivity 92%, Specificity 89%');
    
    this.addCard('cga', 'What is the Mini-Cog test?',
      '1. Remember 3 words, 2. Draw clock (2 points if normal), 3. Recall 3 words (1 point each). Score <3 suggests cognitive impairment. Takes 3 minutes');

    // Geriatric Syndromes Cards
    this.addCard('syndromes', 'What are the 5 Is of geriatric syndromes?',
      'Intellectual impairment (dementia), Immobility, Instability (falls), Incontinence, Iatrogenesis. Also: Impaired vision/hearing, Isolation, Impoverishment, Immunodeficiency');
    
    this.addCard('syndromes', 'What is sarcopenia diagnostic criteria?',
      'EWGSOP2: Low muscle strength (grip <27kg men, <16kg women) + Low muscle mass (DXA/BIA) or Low performance (gait speed <0.8m/s). Prevalence: 10% at 70yo, 50% at 80yo');
    
    this.addCard('syndromes', 'What are types of urinary incontinence?',
      'Stress (cough/sneeze), Urge (OAB), Mixed (both), Overflow (retention), Functional (mobility). Remember DIAPERS: Delirium, Infection, Atrophic, Pharmaceuticals, Excess output, Restricted mobility, Stool impaction');
    
    this.addCard('syndromes', 'What is orthostatic hypotension criteria?',
      'Drop in SBP ≥20 mmHg OR DBP ≥10 mmHg within 3 minutes of standing. Check at 1 and 3 minutes. Prevalence: 20% of elderly, 50% in nursing homes');
    
    this.addCard('syndromes', 'What is the SPICES assessment tool?',
      'Sleep disorders, Problems with eating/feeding, Incontinence, Confusion, Evidence of falls, Skin breakdown. Used for identifying geriatric syndromes on admission');

    // End-of-Life Care Cards
    this.addCard('eol', 'What are the PPS (Palliative Performance Scale) levels?',
      '100%: Full ambulation, normal activity. 70%: Reduced ambulation, unable to work. 40%: Mainly bed-bound, requires assistance. 10%: Totally bed-bound, minimal intake');
    
    this.addCard('eol', 'What is the SPICT tool?',
      'Supportive & Palliative Care Indicators Tool: General indicators (performance status, weight loss, persistent symptoms) + Disease-specific indicators. Identifies patients for palliative care');
    
    this.addCard('eol', 'What are components of a good death?',
      '1. Pain/symptom management, 2. Clear decision-making, 3. Preparation for death, 4. Completion (life review), 5. Contributing to others, 6. Affirmation of whole person');
    
    this.addCard('eol', 'What is the Edmonton Symptom Assessment Scale?',
      'ESAS rates 10 symptoms (0-10): Pain, Tiredness, Nausea, Depression, Anxiety, Drowsiness, Appetite, Wellbeing, Shortness of breath, Other. Used for symptom monitoring');
    
    this.addCard('eol', 'What are opioid conversion ratios?',
      'Morphine PO:IV = 3:1, Morphine:Oxycodone = 1.5:1, Morphine:Hydromorphone = 5:1, Morphine:Fentanyl patch = 100:1 (mg/day:mcg/hr). Always reduce dose 25-50% when switching');

    // Nutrition Cards
    this.addCard('nutrition', 'What is the MNA-SF scoring?',
      'Mini Nutritional Assessment Short Form: 12-14 normal, 8-11 at risk, 0-7 malnourished. Includes: BMI, weight loss, mobility, psychological stress, neuropsychological problems, appetite');
    
    this.addCard('nutrition', 'What are GLIM criteria for malnutrition?',
      'Requires 1 phenotypic + 1 etiologic criterion. Phenotypic: Weight loss, Low BMI, Reduced muscle mass. Etiologic: Reduced intake, Disease burden/inflammation');
    
    this.addCard('nutrition', 'What are protein requirements in elderly?',
      'Healthy elderly: 1.0-1.2 g/kg/day. Acute/chronic illness: 1.2-1.5 g/kg/day. Severe illness/malnutrition: 1.5-2.0 g/kg/day. Higher than young adults (0.8 g/kg/day)');
    
    this.addCard('nutrition', 'What is refeeding syndrome?',
      'Potentially fatal shifts in fluids/electrolytes upon refeeding after malnutrition. Monitor phosphate, potassium, magnesium. Start 10 kcal/kg/day, increase gradually. Give thiamine first');
    
    this.addCard('nutrition', 'What are indicators of dysphagia?',
      'Coughing/choking with meals, Wet/gurgly voice, Frequent pneumonia, Weight loss, Prolonged meals (>30 min), Food pocketing, Drooling. Screen with water swallow test');
  }

  addCard(topic, question, answer) {
    this.studyCards.push({
      id: `card_${this.studyCards.length + 1}`,
      topic: topic,
      question: question,
      answer: answer,
      difficulty: this.calculateDifficulty(answer),
      created: Date.now(),
      reviews: 0,
      lastReviewed: null
    });
  }

  calculateDifficulty(answer) {
    const length = answer.length;
    if (length < 100) return 'easy';
    if (length < 200) return 'medium';
    return 'hard';
  }

  loadDrugDatabase() {
    // Common geriatric medications with key information
    this.drugDatabase = {
      // Cardiovascular
      'metoprolol': {
        class: 'Beta-blocker',
        geriatricConsiderations: 'Start low 12.5-25mg BID. Risk of bradycardia, fatigue. Avoid in severe COPD',
        beersCriteria: false,
        stoppFlag: 'With bradycardia <50 bpm, 2nd/3rd degree heart block',
        interactions: ['Verapamil', 'Diltiazem', 'Digoxin'],
        renalDosing: 'No adjustment needed',
        startDose: '12.5-25mg BID',
        maxDose: '200mg BID'
      },
      'lisinopril': {
        class: 'ACE inhibitor',
        geriatricConsiderations: 'Monitor K+, Cr. Risk of orthostatic hypotension. Start 2.5-5mg daily',
        beersCriteria: false,
        stoppFlag: 'With hyperkalemia, bilateral renal artery stenosis',
        interactions: ['NSAIDs', 'Potassium supplements', 'Trimethoprim'],
        renalDosing: 'CrCl <30: reduce dose 50%',
        startDose: '2.5-5mg daily',
        maxDose: '40mg daily'
      },
      'furosemide': {
        class: 'Loop diuretic',
        geriatricConsiderations: 'Risk of dehydration, orthostasis, hypokalemia. Monitor electrolytes',
        beersCriteria: false,
        stoppFlag: 'For dependent ankle edema without clinical signs of heart failure',
        interactions: ['NSAIDs', 'Lithium', 'Digoxin'],
        renalDosing: 'May need higher doses in CKD',
        startDose: '20mg daily',
        maxDose: '600mg daily'
      },
      'amlodipine': {
        class: 'Calcium channel blocker',
        geriatricConsiderations: 'Well tolerated. Watch for peripheral edema. Start 2.5mg daily',
        beersCriteria: false,
        stoppFlag: false,
        interactions: ['Simvastatin (limit to 20mg)', 'Cyclosporine'],
        renalDosing: 'No adjustment needed',
        startDose: '2.5mg daily',
        maxDose: '10mg daily'
      },
      
      // Anticoagulants
      'warfarin': {
        class: 'Vitamin K antagonist',
        geriatricConsiderations: 'Higher bleeding risk. Lower dose requirements. Target INR 2-3 for most indications',
        beersCriteria: false,
        stoppFlag: 'With concurrent antiplatelet without clear indication',
        interactions: ['Multiple - antibiotics, amiodarone, NSAIDs, herbals'],
        renalDosing: 'No adjustment but monitor closely',
        startDose: '2-5mg daily',
        monitoring: 'INR - initially daily, then weekly, then monthly when stable'
      },
      'apixaban': {
        class: 'Direct oral anticoagulant',
        geriatricConsiderations: 'Preferred DOAC in elderly. Less intracranial bleeding than warfarin',
        beersCriteria: false,
        stoppFlag: false,
        interactions: ['Strong CYP3A4 inhibitors/inducers'],
        renalDosing: 'Reduce to 2.5mg BID if 2 of: age ≥80, weight ≤60kg, Cr ≥1.5',
        startDose: '5mg BID (or 2.5mg BID if dose reduction criteria met)',
        maxDose: '10mg BID'
      },
      
      // CNS/Psychiatric
      'sertraline': {
        class: 'SSRI',
        geriatricConsiderations: 'First-line for depression. Start 25mg. Risk of hyponatremia, falls',
        beersCriteria: false,
        stoppFlag: 'With hyponatremia <130 mEq/L',
        interactions: ['Warfarin', 'NSAIDs', 'Other serotonergic drugs'],
        renalDosing: 'No adjustment needed',
        startDose: '25mg daily',
        maxDose: '200mg daily'
      },
      'mirtazapine': {
        class: 'Atypical antidepressant',
        geriatricConsiderations: 'Good for depression with insomnia, poor appetite. Sedating at low doses',
        beersCriteria: false,
        stoppFlag: false,
        interactions: ['MAOIs', 'CNS depressants'],
        renalDosing: 'Use with caution in severe renal impairment',
        startDose: '7.5mg at bedtime',
        maxDose: '45mg daily'
      },
      'quetiapine': {
        class: 'Atypical antipsychotic',
        geriatricConsiderations: 'Avoid for behavioral symptoms of dementia. Increased mortality risk',
        beersCriteria: 'Avoid except for schizophrenia, bipolar',
        stoppFlag: 'As hypnotic, for BPSD',
        interactions: ['CYP3A4 inhibitors', 'Anticholinergics'],
        renalDosing: 'No adjustment needed',
        startDose: '12.5-25mg',
        maxDose: 'Varies by indication'
      },
      'lorazepam': {
        class: 'Benzodiazepine',
        geriatricConsiderations: 'Avoid if possible. If needed, use lowest dose briefly. Fall/cognitive risk',
        beersCriteria: 'Avoid in adults ≥65',
        stoppFlag: 'All benzodiazepines for >4 weeks',
        interactions: ['Opioids', 'CNS depressants', 'Alcohol'],
        renalDosing: 'Use with caution',
        startDose: '0.25-0.5mg',
        maxDose: 'Minimize use'
      },
      
      // Pain Management
      'acetaminophen': {
        class: 'Analgesic',
        geriatricConsiderations: 'First-line for pain. Max 3g/day (2g if liver disease)',
        beersCriteria: false,
        stoppFlag: false,
        interactions: ['Warfarin (with regular use)', 'Alcohol'],
        renalDosing: 'CrCl <10: increase interval to q8h',
        startDose: '325-650mg q4-6h',
        maxDose: '3g daily (2g if liver disease)'
      },
      'tramadol': {
        class: 'Opioid analgesic',
        geriatricConsiderations: 'Lower seizure threshold. Risk of serotonin syndrome with SSRIs',
        beersCriteria: false,
        stoppFlag: false,
        interactions: ['SSRIs', 'SNRIs', 'MAOIs', 'Warfarin'],
        renalDosing: 'CrCl <30: 50mg q12h max',
        startDose: '25mg daily',
        maxDose: '300mg daily (elderly: 200mg)'
      },
      
      // Gastrointestinal
      'omeprazole': {
        class: 'Proton pump inhibitor',
        geriatricConsiderations: 'Limit to 8 weeks unless clear indication. Risk of C.diff, fractures, B12 deficiency',
        beersCriteria: 'Avoid >8 weeks unless high-risk',
        stoppFlag: 'For >8 weeks without clear indication',
        interactions: ['Clopidogrel', 'Methotrexate', 'Digoxin'],
        renalDosing: 'No adjustment needed',
        startDose: '20mg daily',
        maxDose: '40mg daily'
      },
      'docusate': {
        class: 'Stool softener',
        geriatricConsiderations: 'Limited efficacy. Consider senna or PEG instead',
        beersCriteria: false,
        stoppFlag: 'Chronic use without constipation',
        interactions: 'Minimal',
        renalDosing: 'No adjustment needed',
        startDose: '100mg BID',
        maxDose: '200mg BID'
      },
      
      // Diabetes
      'metformin': {
        class: 'Biguanide',
        geriatricConsiderations: 'First-line if tolerated. Check B12 annually. Avoid if GFR <30',
        beersCriteria: false,
        stoppFlag: false,
        interactions: ['Contrast dye (hold 48h)', 'Alcohol'],
        renalDosing: 'GFR 30-45: max 1000mg/day. GFR <30: contraindicated',
        startDose: '500mg daily',
        maxDose: '2000mg daily'
      },
      'glipizide': {
        class: 'Sulfonylurea',
        geriatricConsiderations: 'Preferred sulfonylurea (shorter half-life). Risk of hypoglycemia',
        beersCriteria: 'Glyburide should be avoided',
        stoppFlag: 'With recurrent hypoglycemia',
        interactions: ['Beta-blockers', 'Fluconazole'],
        renalDosing: 'Start conservatively',
        startDose: '2.5mg daily',
        maxDose: '20mg daily'
      }
    };
  }

  loadGuidelines() {
    this.guidelines = {
      'Falls Prevention': {
        source: 'AGS/BGS 2022',
        keyPoints: [
          'Annual screening: 2+ falls, fall with injury, or gait/balance problem',
          'Multifactorial assessment if screen positive',
          'Exercise interventions most effective (NNT=7)',
          'Vitamin D if deficient (<30 ng/mL)',
          'Medication review focusing on psychotropics',
          'Home safety assessment'
        ],
        link: 'https://www.guideline.gov/falls-prevention'
      },
      'Beers Criteria': {
        source: 'AGS 2023',
        keyPoints: [
          'Avoid benzodiazepines in adults ≥65',
          'Avoid antipsychotics for BPSD',
          'Avoid NSAIDs for chronic use',
          'Limit PPIs to minimum duration',
          'Avoid anticholinergics',
          'Use with caution: Aspirin >80yo, SSRIs (fall risk)'
        ],
        link: 'https://www.americangeriatrics.org/beers-criteria'
      },
      'STOPP/START v3': {
        source: 'European Geriatric Medicine 2023',
        keyPoints: [
          '190 criteria total (133 STOPP, 57 START)',
          'STOPP: Medications to stop/avoid',
          'START: Medications to consider starting',
          'Organized by physiological system',
          'Evidence-based deprescribing tool',
          'Reduces ADRs by 24%, falls by 18%'
        ],
        link: 'https://www.eugms.org/stopp-start'
      },
      'Delirium Prevention': {
        source: 'NICE Guidelines 2023',
        keyPoints: [
          'Identify at-risk patients on admission',
          'Multicomponent intervention (HELP protocol)',
          'Avoid benzodiazepines except alcohol withdrawal',
          'Daily medication review',
          'Ensure sensory aids available',
          'Promote normal sleep-wake cycle'
        ],
        link: 'https://www.nice.org.uk/guidance/cg103'
      },
      'Dementia Management': {
        source: 'Alzheimer Association 2023',
        keyPoints: [
          'Early diagnosis improves outcomes',
          'Cholinesterase inhibitors for mild-moderate AD',
          'Memantine for moderate-severe AD',
          'Non-pharmacological interventions first for BPSD',
          'Support for caregivers essential',
          'Advanced directive discussions early'
        ],
        link: 'https://www.alz.org/professional-guidelines'
      },
      'Polypharmacy': {
        source: 'WHO ICOPE 2019',
        keyPoints: [
          'Regular medication reconciliation',
          'Start low, go slow principle',
          'Consider drug-drug and drug-disease interactions',
          'Assess adherence at each visit',
          'Deprescribe one medication at a time',
          'Monitor for withdrawal effects'
        ],
        link: 'https://www.who.int/icope'
      }
    };
  }

  loadResearchPapers() {
    this.researchPapers = [
      {
        title: 'Frailty in Elderly People',
        authors: 'Clegg A, Young J, Iliffe S, et al.',
        journal: 'Lancet 2013;381:752-62',
        keyFindings: 'Frailty prevalence 10.7% in community-dwelling elderly. Exercise interventions reduce frailty progression.',
        impact: 'Defined modern understanding of frailty syndrome'
      },
      {
        title: 'The Hospital Elder Life Program (HELP)',
        authors: 'Inouye SK, Bogardus ST, et al.',
        journal: 'NEJM 1999;340:669-76',
        keyFindings: 'Multicomponent intervention reduced delirium incidence by 40% (15% to 9.9%)',
        impact: 'Gold standard for delirium prevention programs'
      },
      {
        title: 'HYVET Study',
        authors: 'Beckett NS, Peters R, et al.',
        journal: 'NEJM 2008;358:1887-98',
        keyFindings: 'BP treatment in >80yo reduced stroke by 30%, mortality by 21%',
        impact: 'Changed approach to hypertension in very elderly'
      },
      {
        title: 'SPRINT-Senior',
        authors: 'Williamson JD, Supiano MA, et al.',
        journal: 'JAMA 2016;315:2673-82',
        keyFindings: 'Intensive BP control (<120) in ≥75yo reduced CV events without increasing falls',
        impact: 'Supports lower BP targets in robust elderly'
      },
      {
        title: 'Deprescribing Review',
        authors: 'Reeve E, Gnjidic D, et al.',
        journal: 'JAMA Intern Med 2015;175:827-34',
        keyFindings: '91% of patients open to deprescribing. No adverse outcomes in trials',
        impact: 'Validated safety of systematic deprescribing'
      },
      {
        title: 'OPTIMISE Trial',
        authors: 'Ibrahim K, Cox N, et al.',
        journal: 'Age Ageing 2022;51:afac064',
        keyFindings: 'Structured medication review reduced PIMs by 31%',
        impact: 'Demonstrates effectiveness of pharmacist-led reviews'
      },
      {
        title: 'Anticholinergic Burden and Dementia',
        authors: 'Coupland CAC, Hill T, et al.',
        journal: 'JAMA Intern Med 2019;179:1084-93',
        keyFindings: 'Anticholinergic exposure associated with 50% increased dementia risk',
        impact: 'Quantified cognitive risks of anticholinergics'
      },
      {
        title: 'Exercise for Preventing Falls',
        authors: 'Sherrington C, Fairhall N, et al.',
        journal: 'Cochrane Database 2019',
        keyFindings: 'Exercise reduces falls by 23% (rate) and 15% (risk)',
        impact: 'Most comprehensive meta-analysis on fall prevention'
      },
      {
        title: 'CGA Meta-analysis',
        authors: 'Ellis G, Whitehead MA, et al.',
        journal: 'BMJ 2011;343:d5153',
        keyFindings: 'CGA increases likelihood of living at home at 12 months (OR 1.16)',
        impact: 'Validated comprehensive geriatric assessment'
      },
      {
        title: 'STRIDE Study',
        authors: 'Bhasin S, Gill TM, et al.',
        journal: 'NEJM 2020;383:129-40',
        keyFindings: 'Multifactorial fall intervention did not reduce serious falls vs usual care',
        impact: 'Questions one-size-fits-all fall prevention'
      }
    ];
  }

  loadClinicalPearls() {
    this.clinicalPearls = [
      {
        category: 'Assessment',
        pearl: 'Always check orthostatic vitals at 1 AND 3 minutes - delayed orthostasis common in elderly',
        evidence: 'Up to 50% of orthostatic hypotension occurs after 1 minute'
      },
      {
        category: 'Medications',
        pearl: 'The 5th vital sign in geriatrics is the medication list',
        evidence: 'Medication review at every visit reduces adverse events by 20%'
      },
      {
        category: 'Delirium',
        pearl: 'Family noticing "not quite right" has 94% sensitivity for delirium',
        evidence: 'Sands MB, Age Ageing 2010'
      },
      {
        category: 'Falls',
        pearl: 'Inability to rise from chair without using arms = 2x fall risk',
        evidence: 'Simple screening tool with high predictive value'
      },
      {
        category: 'Cognition',
        pearl: 'Losing ability to manage finances is often first IADL affected in dementia',
        evidence: 'More sensitive than basic ADL changes'
      },
      {
        category: 'Pain',
        pearl: 'Observe for pain behaviors in advanced dementia: grimacing, guarding, vocalizations',
        evidence: 'PAINAD scale validated for non-verbal patients'
      },
      {
        category: 'Nutrition',
        pearl: 'Unintentional weight loss >5% in 30 days or >10% in 180 days = malnutrition',
        evidence: 'GLIM criteria for diagnosis'
      },
      {
        category: 'Frailty',
        pearl: 'Gait speed <0.8 m/s predicts poor outcomes as well as complex assessments',
        evidence: 'Single best predictor of adverse outcomes'
      },
      {
        category: 'Polypharmacy',
        pearl: 'For every medication added, consider stopping two',
        evidence: 'Net reduction principle for medication optimization'
      },
      {
        category: 'Hospital Care',
        pearl: 'Bed rest orders are almost never appropriate for elderly - mobilize early',
        evidence: '10 days bed rest = 10 years muscle aging'
      },
      {
        category: 'Communication',
        pearl: 'Hearing loss mimics cognitive impairment - always check hearing before cognitive testing',
        evidence: 'Improves MMSE scores by average 3 points'
      },
      {
        category: 'Transitions',
        pearl: 'The highest risk time for elderly is 30 days post-discharge',
        evidence: '20% readmission rate within 30 days'
      },
      {
        category: 'Sleep',
        pearl: 'Avoid "prn" sleep medications - scheduled sleep hygiene more effective',
        evidence: 'PRN use associated with increased falls and delirium'
      },
      {
        category: 'Goals of Care',
        pearl: 'Ask "What matters most to you?" not just "What is the matter?"',
        evidence: 'Patient-centered care improves satisfaction and outcomes'
      },
      {
        category: 'Screening',
        pearl: 'Stop cancer screening when life expectancy <10 years or if wouldn not change management',
        evidence: 'Reduces burden without affecting mortality'
      }
    ];
  }

  // Search and retrieval methods
  searchCards(query) {
    const lowQuery = query.toLowerCase();
    return this.studyCards.filter(card => 
      card.question.toLowerCase().includes(lowQuery) ||
      card.answer.toLowerCase().includes(lowQuery) ||
      card.topic.toLowerCase().includes(lowQuery)
    );
  }

  getCardsByTopic(topic) {
    return this.studyCards.filter(card => card.topic === topic);
  }

  getDrugInfo(drugName) {
    const drug = this.drugDatabase[drugName.toLowerCase()];
    if (!drug) {
      return { error: 'Drug not found in database' };
    }
    return drug;
  }

  checkDrugInteractions(drugList) {
    const interactions = [];
    for (let i = 0; i < drugList.length; i++) {
      const drug1 = this.drugDatabase[drugList[i].toLowerCase()];
      if (drug1 && drug1.interactions) {
        for (let j = i + 1; j < drugList.length; j++) {
          if (drug1.interactions.some(int => 
            int.toLowerCase() === drugList[j].toLowerCase())) {
            interactions.push({
              drugs: [drugList[i], drugList[j]],
              severity: 'Check interaction database',
              action: 'Review combination with pharmacist'
            });
          }
        }
      }
    }
    return interactions;
  }

  getRandomCard() {
    if (this.studyCards.length === 0) return null;
    const index = Math.floor(Math.random() * this.studyCards.length);
    return this.studyCards[index];
  }

  getStatistics() {
    const topics = {};
    this.studyCards.forEach(card => {
      if (!topics[card.topic]) {
        topics[card.topic] = 0;
      }
      topics[card.topic]++;
    });
    
    return {
      totalCards: this.studyCards.length,
      totalDrugs: Object.keys(this.drugDatabase).length,
      totalGuidelines: Object.keys(this.guidelines).length,
      totalPapers: this.researchPapers.length,
      totalPearls: this.clinicalPearls.length,
      topicBreakdown: topics
    };
  }

  // Export data for backup
  exportData() {
    return {
      studyCards: this.studyCards,
      drugDatabase: this.drugDatabase,
      guidelines: this.guidelines,
      researchPapers: this.researchPapers,
      clinicalPearls: this.clinicalPearls,
      exportDate: new Date().toISOString()
    };
  }

  // Import data from backup
  importData(data) {
    if (data.studyCards) this.studyCards = data.studyCards;
    if (data.drugDatabase) this.drugDatabase = data.drugDatabase;
    if (data.guidelines) this.guidelines = data.guidelines;
    if (data.researchPapers) this.researchPapers = data.researchPapers;
    if (data.clinicalPearls) this.clinicalPearls = data.clinicalPearls;
    
    console.log('Knowledge base imported successfully');
  }
}

// Initialize and make globally available
window.GeriatricsKnowledge = new GeriatricsKnowledge();

// Integrate with existing SmartStudySystem if available
if (window.smartStudy) {
  // Add all cards to the smart study system
  window.GeriatricsKnowledge.studyCards.forEach(card => {
    window.smartStudy.createSmartCard(card.question, card.answer, card.topic);
  });
  console.log('✅ Knowledge base integrated with Smart Study System');
}

console.log('📚 Geriatrics Knowledge Base Ready!');
console.log('Access via: window.GeriatricsKnowledge');
console.log('Example: GeriatricsKnowledge.getRandomCard()');
console.log('Drug lookup: GeriatricsKnowledge.getDrugInfo("metoprolol")');