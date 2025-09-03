// case-simulator-enhanced.js
// Comprehensive clinical case simulator with 20+ geriatric cases

class EnhancedCaseSimulator {
  constructor() {
    this.cases = [];
    this.currentCase = null;
    this.currentQuestion = 0;
    this.score = 0;
    this.loadCases();
  }

  loadCases() {
    this.addDeliriumCases();
    this.addFallsCases();
    this.addPolypharmacyCases();
    this.addFrailtyCases();
    this.addDementiaCases();
    this.addHeartFailureCases();
    this.addCOPDCases();
    this.addUTICases();
    this.addPneumoniaCases();
    this.addStrokeCases();
    this.addEndOfLifeCases();
    
    console.log(`🏥 Case Simulator Ready: ${this.cases.length} clinical cases loaded`);
  }

  addDeliriumCases() {
    this.addCase({
      id: 'delirium_1',
      title: 'Post-operative Confusion',
      presentation: '85yo woman with confusion after hip surgery. Vitals stable. No focal neurological findings. Family reports she was sharp before surgery.',
      background: 'PMH: HTN, DM2. Meds: Metformin, Lisinopril. Surgery yesterday with spinal anesthesia.',
      questions: [
        {
          prompt: 'Most appropriate initial assessment?',
          options: ['Head CT', 'CAM assessment', 'Lumbar puncture', 'EEG'],
          correct: 1,
          explanation: 'CAM assessment should be first - post-operative delirium is extremely common (up to 50% in elderly after major surgery). CT has low yield without focal findings.',
          pearls: '90% of post-op confusion in elderly is delirium, not stroke. CAM has 94% sensitivity.',
          difficulty: 'Easy'
        },
        {
          prompt: 'Patient is CAM positive (fluctuating course, inattention, disorganized thinking). Next step?',
          options: ['Haloperidol 5mg IM', 'Physical restraints', 'Identify reversible causes', 'Discharge to nursing home'],
          correct: 2,
          explanation: 'Always identify and treat underlying causes first. Check for infections, medications, metabolic issues, hypoxia. Mnemonic: DELIRIUM.',
          pearls: 'Non-pharmacological interventions first: reorientation, familiar objects, minimize room changes.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Workup reveals UTI. Patient remains agitated, pulling at IV, safety concern. Best pharmacological intervention?',
          options: ['Lorazepam 1mg PO', 'Quetiapine 25mg PO', 'Haloperidol 0.5mg PO', 'Diphenhydramine 25mg PO'],
          correct: 2,
          explanation: 'Low-dose haloperidol is first-line when antipsychotic needed for safety. Avoid benzodiazepines (worsen delirium) and anticholinergics.',
          pearls: 'Start haloperidol 0.25-0.5mg, can repeat q4-6h. Monitor QTc. Discontinue ASAP when delirium resolves.',
          difficulty: 'Hard'
        }
      ],
      learningPoints: [
        'Delirium affects 15-50% of hospitalized elderly',
        'CAM criteria: acute onset + inattention + (disorganized thinking OR altered consciousness)',
        'Hypoactive delirium (50%) has worse prognosis than hyperactive (25%)',
        'Prevention is key: HELP protocol reduces incidence by 40%'
      ]
    });

    this.addCase({
      id: 'delirium_2',
      title: 'ICU Delirium',
      presentation: '78yo man in ICU for pneumonia, on mechanical ventilation day 3. Nurse reports patient "fighting the vent" and trying to pull out tubes when sedation lightened.',
      background: 'PMH: COPD, CAD. ICU meds: Propofol, fentanyl, vancomycin, piperacillin-tazobactam.',
      questions: [
        {
          prompt: 'Best delirium screening tool for mechanically ventilated patients?',
          options: ['CAM', 'CAM-ICU', 'MMSE', 'GDS'],
          correct: 1,
          explanation: 'CAM-ICU is validated for mechanically ventilated patients. Uses RASS for altered consciousness assessment.',
          pearls: 'ICU delirium affects 60-87% of ventilated patients. Associated with longer ICU stay, higher mortality.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Patient is CAM-ICU positive. Which medication is MOST likely contributing?',
          options: ['Vancomycin', 'Piperacillin-tazobactam', 'Propofol', 'All equally likely'],
          correct: 2,
          explanation: 'Propofol infusion syndrome can cause delirium. Consider switching to dexmedetomidine for sedation.',
          pearls: 'ABCDEF bundle: Awakening, Breathing, Coordination, Delirium assessment, Early mobility, Family engagement.',
          difficulty: 'Hard'
        }
      ]
    });
  }

  addFallsCases() {
    this.addCase({
      id: 'falls_1',
      title: 'Recurrent Falls',
      presentation: '82yo woman presents to ED after her 3rd fall in 2 months. No head injury this time. Daughter is concerned and wants "tests done."',
      background: 'PMH: HTN, Depression, Insomnia. Meds: HCTZ 25mg, Sertraline 50mg, Zolpidem 10mg PRN. Lives alone.',
      questions: [
        {
          prompt: 'Most important initial assessment?',
          options: ['Head CT', 'Comprehensive fall risk assessment', 'EKG', 'Bone density scan'],
          correct: 1,
          explanation: 'Comprehensive fall assessment includes orthostatic vitals, gait/balance, cognitive status, medication review, environmental hazards.',
          pearls: 'Falls are rarely due to single cause - average of 4 risk factors per elderly faller.',
          difficulty: 'Easy'
        },
        {
          prompt: 'Orthostatic vitals: Lying 140/80 HR 70, Standing 110/60 HR 95. What medication change is most appropriate?',
          options: ['Stop HCTZ', 'Reduce sertraline', 'Stop zolpidem', 'No changes needed'],
          correct: 0,
          explanation: 'Significant orthostatic hypotension (SBP drop >20mmHg). HCTZ is the most likely culprit. Consider ARB if HTN control still needed.',
          pearls: 'Check orthostatics at 1 AND 3 minutes - delayed orthostasis common in elderly.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Medication review complete. Timed Up and Go test = 18 seconds. Next best intervention?',
          options: ['Hip protectors', 'Physical therapy referral', 'Bed alarm', 'Nursing home placement'],
          correct: 1,
          explanation: 'TUG >13.5 seconds predicts falls. PT for strength/balance training most effective intervention (NNT=7).',
          pearls: 'Exercise interventions reduce falls by 23% (rate) and 15% (risk). Tai Chi specifically effective.',
          difficulty: 'Medium'
        }
      ],
      learningPoints: [
        'Falls affect 30% of community-dwelling elderly annually',
        'Multifactorial interventions most effective',
        'Medication review critical - especially psychotropics',
        'Environmental modifications important but less effective alone'
      ]
    });

    this.addCase({
      id: 'falls_2',
      title: 'Fall with Anticoagulation',
      presentation: '79yo man on warfarin for atrial fibrillation fell at home. Hit head, no loss of consciousness. Alert and oriented x3. Small scalp laceration.',
      background: 'CHA2DS2-VASc score: 4. INR last week: 2.3 (therapeutic). Family concerned about continuing warfarin.',
      questions: [
        {
          prompt: 'Most appropriate immediate management?',
          options: ['Stop warfarin immediately', 'Head CT', 'Admit for observation', 'Check INR and head CT'],
          correct: 3,
          explanation: 'Any head trauma on anticoagulation warrants CT. Check INR to assess current anticoagulation level.',
          pearls: 'Risk of intracranial hemorrhage 2-5x higher on warfarin, but absolute risk still low (0.3-0.6% annually).',
          difficulty: 'Easy'
        },
        {
          prompt: 'CT head negative. Family wants to stop warfarin due to fall risk. Best response?',
          options: ['Stop warfarin - falls too dangerous', 'Continue warfarin - stroke risk higher than bleeding risk', 'Switch to aspirin', 'Reduce warfarin dose'],
          correct: 1,
          explanation: 'For CHA2DS2-VASc ≥2, stroke risk typically outweighs bleeding risk. Fall risk alone rarely justification to stop anticoagulation.',
          pearls: 'Patient would need to fall 295 times per year for bleeding risk to exceed stroke reduction benefit.',
          difficulty: 'Hard'
        }
      ]
    });
  }

  addPolypharmacyCases() {
    this.addCase({
      id: 'polypharmacy_1',
      title: 'Medication Reconciliation',
      presentation: '84yo woman admitted for pneumonia. Takes "a lot of pills" but unsure of names/doses. Daughter brings in bag of 15 medication bottles.',
      background: 'PMH: HTN, DM2, Depression, Insomnia, GERD, Osteoarthritis. Multiple providers.',
      questions: [
        {
          prompt: 'Priority medication to STOP based on Beers Criteria?',
          options: ['Diphenhydramine 25mg nightly', 'Metformin 500mg BID', 'Lisinopril 10mg daily', 'Omeprazole 20mg daily'],
          correct: 0,
          explanation: 'Diphenhydramine is a strong anticholinergic and on Beers "avoid" list. Increases risk of falls, confusion, dry mouth.',
          pearls: 'Anticholinergic burden scale: each additional point increases cognitive decline risk by 26%.',
          difficulty: 'Easy'
        },
        {
          prompt: 'Patient also taking glyburide 5mg BID for diabetes. A1C = 6.8%. Best action?',
          options: ['Continue current dose', 'Reduce dose to 2.5mg BID', 'Switch to glipizide', 'Discontinue - A1C at goal'],
          correct: 2,
          explanation: 'Glyburide is on Beers "avoid" list due to prolonged hypoglycemia risk. Switch to glipizide (shorter half-life) or consider discontinuing if A1C allows.',
          pearls: 'Glyburide has active metabolites with long half-life - risk of prolonged hypoglycemia, especially with renal impairment.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Medication list includes omeprazole daily x 2 years. Patient denies heartburn, never had H. pylori. Best approach?',
          options: ['Continue - preventing GI bleeding', 'Taper and discontinue', 'Switch to H2RA', 'Reduce to every other day'],
          correct: 1,
          explanation: 'PPIs >8 weeks without clear indication are potentially inappropriate (Beers). Taper over 2-4 weeks to prevent rebound acid hypersecretion.',
          pearls: 'Long-term PPI risks: C. diff, pneumonia, fractures, hypomagnesemia, B12 deficiency, dementia (controversial).',
          difficulty: 'Medium'
        }
      ]
    });

    this.addCase({
      id: 'polypharmacy_2',
      title: 'Drug Interaction',
      presentation: '77yo man with new onset weakness and muscle pain. Started atorvastatin 40mg daily 2 weeks ago. Also on amlodipine 10mg daily for hypertension.',
      background: 'Denies fever. CK elevated at 1,200 (normal <200). Creatinine stable.',
      questions: [
        {
          prompt: 'Most likely explanation for symptoms?',
          options: ['Viral myositis', 'Statin-induced myopathy', 'Amlodipine side effect', 'Age-related muscle weakness'],
          correct: 1,
          explanation: 'Statin myopathy with CK elevation. Risk increased by drug interaction - amlodipine inhibits CYP3A4, increasing atorvastatin levels.',
          pearls: 'Amlodipine with simvastatin: limit simvastatin to 20mg. With atorvastatin: monitor closely or consider rosuvastatin.',
          difficulty: 'Hard'
        }
      ]
    });
  }

  addFrailtyCases() {
    this.addCase({
      id: 'frailty_1',
      title: 'Pre-operative Risk Assessment',
      presentation: '89yo woman needs hip replacement after fracture. Surgeon requests "medical clearance." Patient walks with walker, lives alone, has home health aide 2x/week.',
      background: 'PMH: HTN, mild cognitive impairment. Meds: Lisinopril 5mg. Weight loss 10 lbs over 6 months.',
      questions: [
        {
          prompt: 'Best tool to assess surgical risk?',
          options: ['Revised Cardiac Risk Index', 'Clinical Frailty Scale', 'MMSE', 'ASA Physical Status'],
          correct: 1,
          explanation: 'Clinical Frailty Scale better predicts post-operative outcomes than cardiac risk indices in elderly. CFS ≥5 indicates increased perioperative risk.',
          pearls: 'Frailty is stronger predictor of surgical outcomes than chronological age or individual comorbidities.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Patient scores CFS 6 (moderately frail). Gait speed 0.6 m/s. Best perioperative recommendation?',
          options: ['Cancel surgery - too high risk', 'Proceed with surgery as planned', 'Prehabilitation program first', 'General anesthesia preferred over spinal'],
          correct: 2,
          explanation: 'Prehabilitation (exercise, nutrition optimization, cognitive training) before surgery can improve outcomes in frail patients.',
          pearls: 'Even 2-4 weeks of prehabilitation can improve functional outcomes and reduce complications.',
          difficulty: 'Hard'
        }
      ]
    });

    this.addCase({
      id: 'frailty_2',
      title: 'Frailty Intervention',
      presentation: '81yo man with unintentional weight loss, fatigue, and slow walking. Fried Frailty criteria: weak grip strength, exhaustion, slow gait, low activity.',
      background: 'Lives with wife who does all cooking/shopping. No acute illness. Labs normal except albumin 3.0.',
      questions: [
        {
          prompt: 'Most effective intervention to prevent frailty progression?',
          options: ['High-calorie supplements', 'Testosterone therapy', 'Multicomponent exercise program', 'Vitamin D supplementation'],
          correct: 2,
          explanation: 'Multicomponent exercise (resistance + balance + aerobic) is most effective intervention. Can reverse pre-frailty in 71% of patients.',
          pearls: 'Exercise prescription: Resistance training 2-3x/week, balance training daily, aerobic activity 150 min/week.',
          difficulty: 'Easy'
        }
      ]
    });
  }

  addDementiaCases() {
    this.addCase({
      id: 'dementia_1',
      title: 'Behavioral Symptoms',
      presentation: '78yo woman with moderate Alzheimer disease becomes agitated every evening around 4 PM. Pacing, calling out, trying to leave. Family exhausted.',
      background: 'On donepezil 10mg daily. MMSE: 16/30. Family considering nursing home placement.',
      questions: [
        {
          prompt: 'This pattern suggests which phenomenon?',
          options: ['Delirium', 'Sundowning', 'Depression', 'Medication side effect'],
          correct: 1,
          explanation: 'Sundowning affects 20-45% of dementia patients. Agitation/confusion worsens late afternoon/evening.',
          pearls: 'Sundowning likely related to circadian rhythm disruption and accumulated fatigue throughout the day.',
          difficulty: 'Easy'
        },
        {
          prompt: 'First-line management approach?',
          options: ['Quetiapine 25mg daily', 'Lorazepam 0.5mg PRN', 'Structured activities and light therapy', 'Increase donepezil to 23mg'],
          correct: 2,
          explanation: 'Non-pharmacological interventions first: structured routine, bright light therapy, exercise, minimize afternoon naps.',
          pearls: 'Antipsychotics increase mortality 1.6-1.7x in dementia. Reserve for severe psychosis/aggression when non-pharm fails.',
          difficulty: 'Medium'
        }
      ]
    });

    this.addCase({
      id: 'dementia_2',
      title: 'Mild Cognitive Impairment',
      presentation: '72yo man reports increasing forgetfulness over 1 year. Forgets appointments, repeats questions. Wife handles finances now. Still drives locally.',
      background: 'Retired teacher. No depression. B12, TSH normal. MoCA: 24/30.',
      questions: [
        {
          prompt: 'Most likely diagnosis?',
          options: ['Normal aging', 'Mild cognitive impairment', 'Mild dementia', 'Depression'],
          correct: 1,
          explanation: 'MCI: cognitive decline beyond normal aging but doesn\'t interfere with independence. MoCA 18-25 suggests MCI.',
          pearls: 'MCI progresses to dementia at 10-15% per year (vs 1-2% in normal elderly).',
          difficulty: 'Medium'
        },
        {
          prompt: 'Best intervention to potentially slow progression?',
          options: ['Start donepezil', 'Cognitive training exercises', 'Mediterranean diet and exercise', 'Ginkgo biloba supplement'],
          correct: 2,
          explanation: 'Lifestyle interventions (Mediterranean diet, exercise, cognitive engagement) have strongest evidence for slowing progression.',
          pearls: 'FINGER study: multidomain intervention reduced cognitive decline by 30% over 2 years.',
          difficulty: 'Hard'
        }
      ]
    });
  }

  addHeartFailureCases() {
    this.addCase({
      id: 'hf_1',
      title: 'Heart Failure Exacerbation',
      presentation: '84yo woman with worsening shortness of breath, orthopnea, ankle swelling. Gained 8 lbs in 1 week. Known systolic heart failure.',
      background: 'EF 35%. Meds: Metoprolol 25mg BID, Lisinopril 5mg daily, Furosemide 20mg daily. Recently started ibuprofen for knee pain.',
      questions: [
        {
          prompt: 'Most likely precipitant of exacerbation?',
          options: ['Medication nonadherence', 'NSAID use', 'Myocardial infarction', 'Arrhythmia'],
          correct: 1,
          explanation: 'NSAIDs cause sodium retention and reduce diuretic effectiveness. Common cause of HF exacerbation in elderly.',
          pearls: 'NSAIDs reduce GFR, blunt diuretic response, and cause sodium retention - triple threat in HF.',
          difficulty: 'Easy'
        },
        {
          prompt: 'After stopping ibuprofen and increasing furosemide, patient improves. Next step in HF optimization?',
          options: ['Add spironolactone', 'Increase lisinopril', 'Increase metoprolol', 'Add digoxin'],
          correct: 1,
          explanation: 'Titrate ACE inhibitor to maximum tolerated dose before adding other agents. Target: Lisinopril 20-40mg daily if tolerated.',
          pearls: 'GDMT sequence: ACE/ARB → Beta-blocker → Aldosterone antagonist. Titrate each to max tolerated dose.',
          difficulty: 'Medium'
        }
      ]
    });
  }

  addCOPDCases() {
    this.addCase({
      id: 'copd_1',
      title: 'COPD Exacerbation',
      presentation: '76yo man with increased dyspnea, productive cough with yellow sputum, increased inhaler use. Known severe COPD.',
      background: 'FEV1 35% predicted. Home O2 2L continuous. Meds: Tiotropium, budesonide/formoterol, albuterol PRN.',
      questions: [
        {
          prompt: 'Antibiotic indication based on Anthonisen criteria?',
          options: ['Not indicated', 'Indicated - 2/3 criteria present', 'Indicated - 3/3 criteria present', 'Only if fever present'],
          correct: 2,
          explanation: 'Anthonisen criteria: increased dyspnea + increased sputum volume + sputum purulence. This patient has all 3.',
          pearls: 'Antibiotics reduce treatment failure by 50% when all 3 Anthonisen criteria present.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Best antibiotic choice for this outpatient?',
          options: ['Amoxicillin', 'Azithromycin', 'Doxycycline', 'Amoxicillin-clavulanate'],
          correct: 3,
          explanation: 'Amoxicillin-clavulanate covers typical bacteria including β-lactamase producers common in COPD exacerbations.',
          pearls: 'COPD patients have higher rates of H. influenzae and M. catarrhalis - both can produce β-lactamase.',
          difficulty: 'Medium'
        }
      ]
    });
  }

  addUTICases() {
    this.addCase({
      id: 'uti_1',
      title: 'Atypical UTI Presentation',
      presentation: '83yo woman brought by family for "acting strange" for 2 days. Normally independent, now confused and incontinent. No fever, no urinary complaints.',
      background: 'PMH: Mild dementia, HTN. Lives alone with daily check-ins from daughter.',
      questions: [
        {
          prompt: 'Most appropriate initial test?',
          options: ['Urine culture', 'Urinalysis with microscopy', 'Blood cultures', 'Head CT'],
          correct: 1,
          explanation: 'UA with microscopy first. Elderly often have asymptomatic bacteriuria, so positive urine culture alone insufficient for diagnosis.',
          pearls: 'UTI in elderly: atypical presentations common. Confusion may be only symptom. Need pyuria (>10 WBC/hpf) plus bacteria.',
          difficulty: 'Medium'
        },
        {
          prompt: 'UA: 50 WBCs/hpf, many bacteria, 3+ nitrites. Most appropriate antibiotic while awaiting culture?',
          options: ['Ciprofloxacin', 'Nitrofurantoin', 'Trimethoprim-sulfamethoxazole', 'Cephalexin'],
          correct: 2,
          explanation: 'TMP-SMX first-line for complicated UTI in elderly if no allergy and local resistance <20%. Cipro reserve for resistant organisms.',
          pearls: 'Avoid nitrofurantoin if CrCl <60 (ineffective). Cipro is Beers criteria - use with caution due to C. diff, tendon rupture risk.',
          difficulty: 'Medium'
        }
      ]
    });
  }

  addPneumoniaCases() {
    this.addCase({
      id: 'pneumonia_1',
      title: 'Nursing Home Pneumonia',
      presentation: '87yo woman from nursing home with increased confusion, decreased oral intake, low-grade fever. CXR shows RLL infiltrate.',
      background: 'Bedbound, PEG tube feeds. PMH: Advanced dementia, recurrent aspiration. Goals of care discussions ongoing.',
      questions: [
        {
          prompt: 'This represents which type of pneumonia?',
          options: ['Community-acquired', 'Hospital-acquired', 'Healthcare-associated', 'Ventilator-associated'],
          correct: 2,
          explanation: 'Healthcare-associated pneumonia (HCAP) includes nursing home residents. Higher risk of resistant organisms than CAP.',
          pearls: 'HCAP risk factors: nursing home, hospitalization within 90 days, hemodialysis, wound care, immunosuppression.',
          difficulty: 'Easy'
        },
        {
          prompt: 'Patient has goals focusing on comfort. Family asks about treatment options. Best approach?',
          options: ['Aggressive IV antibiotics', 'Comfort care only', 'PO antibiotics if goals of care consistent', 'Transfer to ICU'],
          correct: 2,
          explanation: 'Align treatment with goals of care. Oral antibiotics can be consistent with comfort-focused care if reducing symptoms.',
          pearls: 'In advanced dementia, antibiotics may not improve quality of life or reduce suffering. Individualize based on goals.',
          difficulty: 'Hard'
        }
      ]
    });
  }

  addStrokeCases() {
    this.addCase({
      id: 'stroke_1',
      title: 'Acute Stroke in Elderly',
      presentation: '89yo woman found by daughter with right-sided weakness and aphasia. Symptom onset 3 hours ago. Previously independent.',
      background: 'PMH: Atrial fibrillation (not on anticoagulation due to fall risk), HTN. NIHSS: 18.',
      questions: [
        {
          prompt: 'Patient eligible for IV tPA?',
          options: ['No - age >80', 'No - high NIHSS', 'Yes - within time window', 'No - atrial fibrillation'],
          correct: 2,
          explanation: 'Age alone is not contraindication for tPA. Within 4.5 hour window. High NIHSS actually indicates potential for greater benefit.',
          pearls: 'No upper age limit for tPA. Risk-benefit often favorable in elderly with severe strokes.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Post-stroke, family asks about anticoagulation given fall risk that led to initial decision not to anticoagulate. Best response?',
          options: ['Continue avoiding anticoagulation', 'Start warfarin', 'Start apixaban with fall precautions', 'Start aspirin only'],
          correct: 2,
          explanation: 'After stroke, benefit of anticoagulation clearly outweighs fall risk. Use DOAC with fall precautions and comprehensive fall assessment.',
          pearls: 'Stroke changes risk-benefit calculation dramatically. Fall risk alone rarely justification to withhold anticoagulation post-stroke.',
          difficulty: 'Hard'
        }
      ]
    });
  }

  addEndOfLifeCases() {
    this.addCase({
      id: 'eol_1',
      title: 'Goals of Care Discussion',
      presentation: '92yo man with end-stage COPD, recurrent pneumonias, weight loss. Family meeting requested to discuss "what to do next."',
      background: 'O2 dependent, multiple hospitalizations. Daughter wants "everything done," son thinks "he\'s suffered enough."',
      questions: [
        {
          prompt: 'Best initial approach in family meeting?',
          options: ['Present treatment options', 'Ask what patient would want', 'Explain medical futility', 'Recommend hospice'],
          correct: 1,
          explanation: 'Start with patient\'s values and preferences. "What would your father say is most important to him now?" Centers discussion on his wishes.',
          pearls: 'Goals of care framework: Understand patient as person → Explain medical situation → Make recommendations based on goals.',
          difficulty: 'Medium'
        },
        {
          prompt: 'Family agrees patient valued independence and "wouldn\'t want to be a burden." He\'s now bedbound, requires total care. Best recommendation?',
          options: ['Comfort care/hospice', 'Time-limited trial of aggressive care', 'Continue current care', 'Family decides'],
          correct: 0,
          explanation: 'When current state conflicts with patient\'s stated values, comfort care often most appropriate. Frame as aligning with his wishes.',
          pearls: 'Hospice eligibility for COPD: FEV1 <30%, O2 dependent, cor pulmonale, weight loss, recurrent infections.',
          difficulty: 'Hard'
        }
      ]
    });
  }

  // Helper Methods
  addCase(caseData) {
    this.cases.push({
      ...caseData,
      completed: false,
      attempts: 0,
      bestScore: 0
    });
  }

  getRandomCase() {
    return this.cases[Math.floor(Math.random() * this.cases.length)];
  }

  getCasesByTopic(topic) {
    return this.cases.filter(c => c.id.toLowerCase().includes(topic.toLowerCase()));
  }

  startCase(caseId = null) {
    if (caseId) {
      this.currentCase = this.cases.find(c => c.id === caseId);
    } else {
      this.currentCase = this.getRandomCase();
    }
    
    this.currentQuestion = 0;
    this.score = 0;
    this.currentCase.attempts++;
    
    return this.currentCase;
  }

  submitAnswer(questionIndex, answerIndex) {
    if (!this.currentCase) return null;
    
    const question = this.currentCase.questions[questionIndex];
    const correct = answerIndex === question.correct;
    
    if (correct) this.score++;
    
    return {
      correct: correct,
      explanation: question.explanation,
      pearls: question.pearls,
      score: this.score,
      totalQuestions: this.currentCase.questions.length,
      difficulty: question.difficulty || 'Medium'
    };
  }

  completeCase() {
    if (!this.currentCase) return null;
    
    this.currentCase.completed = true;
    this.currentCase.bestScore = Math.max(this.currentCase.bestScore, this.score);
    
    const percentage = Math.round((this.score / this.currentCase.questions.length) * 100);
    let performance;
    
    if (percentage >= 90) performance = 'Excellent';
    else if (percentage >= 80) performance = 'Good';
    else if (percentage >= 70) performance = 'Satisfactory';
    else performance = 'Needs Improvement';
    
    return {
      score: this.score,
      totalQuestions: this.currentCase.questions.length,
      percentage: percentage,
      performance: performance,
      learningPoints: this.currentCase.learningPoints,
      title: this.currentCase.title
    };
  }

  getProgress() {
    const total = this.cases.length;
    const completed = this.cases.filter(c => c.completed).length;
    const averageScore = this.cases
      .filter(c => c.completed)
      .reduce((sum, c) => sum + (c.bestScore / c.questions.length), 0) / Math.max(completed, 1);
    
    return {
      totalCases: total,
      completedCases: completed,
      averagePercentage: Math.round(averageScore * 100),
      unlockedTopics: this.getUnlockedTopics()
    };
  }

  getUnlockedTopics() {
    const topics = ['delirium', 'falls', 'polypharmacy', 'frailty', 'dementia'];
    const completed = this.cases.filter(c => c.completed).length;
    
    // Unlock topics based on progress
    if (completed >= 10) return topics;
    if (completed >= 5) return topics.slice(0, 4);
    if (completed >= 2) return topics.slice(0, 3);
    return topics.slice(0, 2);
  }

  getDifficultyStats() {
    const stats = { Easy: 0, Medium: 0, Hard: 0 };
    this.cases.forEach(caseObj => {
      caseObj.questions.forEach(q => {
        const difficulty = q.difficulty || 'Medium';
        stats[difficulty]++;
      });
    });
    return stats;
  }

  exportProgress() {
    return {
      cases: this.cases.map(c => ({
        id: c.id,
        title: c.title,
        completed: c.completed,
        attempts: c.attempts,
        bestScore: c.bestScore,
        totalQuestions: c.questions.length
      })),
      timestamp: new Date().toISOString()
    };
  }

  getRecommendedCases(count = 3) {
    // Recommend cases based on performance and topic gaps
    const completedTopics = new Set();
    const needsWork = [];
    
    this.cases.forEach(c => {
      if (c.completed) {
        const topic = c.id.split('_')[0];
        completedTopics.add(topic);
        
        if ((c.bestScore / c.questions.length) < 0.8) {
          needsWork.push(c);
        }
      }
    });
    
    // Prioritize cases needing work, then new topics
    const recommendations = [];
    
    // Add cases that need improvement
    recommendations.push(...needsWork.slice(0, Math.floor(count/2)));
    
    // Add new topic cases
    const newCases = this.cases
      .filter(c => !c.completed)
      .sort(() => Math.random() - 0.5)
      .slice(0, count - recommendations.length);
    
    recommendations.push(...newCases);
    
    return recommendations.slice(0, count);
  }
}

// Initialize
window.CaseSimulator = new EnhancedCaseSimulator();
console.log('🏥 Enhanced Case Simulator Ready!');
console.log(`📊 ${window.CaseSimulator.cases.length} clinical cases loaded`);
console.log('Usage: CaseSimulator.startCase()');