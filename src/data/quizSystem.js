// Advanced Quiz System with Clinical Case Progressions
// Adaptive learning with spaced repetition and performance tracking

export const quizDatabase = {
  // Board Review Questions with Israeli Context
  boardReview: [
    {
      id: 'br001',
      category: 'Cardiovascular',
      difficulty: 'Medium',
      points: 2,
      question: 'An 82-year-old woman presents to Shaare Zedek ED with new-onset atrial fibrillation. Her CHA₂DS₂-VASc score is 5. Which anticoagulant is most appropriate?',
      questionHe: 'אישה בת 82 מגיעה למיון שערי צדק עם פרפור עליות חדש. ציון CHA₂DS₂-VASc שלה הוא 5. איזה נוגד קרישה הכי מתאים?',
      options: [
        'Warfarin with INR target 2.5-3.5',
        'Apixaban 5mg BID',
        'Aspirin 325mg daily',
        'Dabigatran 150mg BID'
      ],
      correctAnswer: 1,
      explanation: 'Apixaban is preferred in elderly patients with high stroke risk. Lower bleeding risk compared to warfarin, once-daily dosing improves compliance.',
      explanationHe: 'אפיקסבאן מועדף בקשישים עם סיכון גבוה לשבץ. סיכון דימום נמוך יותר מוורפרין.',
      clinicalPearl: 'In patients ≥80 years with AF, DOACs (especially apixaban) have better safety profiles than warfarin',
      references: ['ARISTOTLE trial', 'ESC Guidelines 2020'],
      relatedCalculators: ['CHA2DS2VASc', 'HASBLED']
    },
    {
      id: 'br002',
      category: 'Cognitive',
      difficulty: 'Hard',
      points: 3,
      question: 'A 78-year-old man with mild cognitive impairment scores 22/30 on MMSE. His wife reports he gets lost driving to familiar places. What is the most likely diagnosis?',
      questionHe: 'גבר בן 78 עם ירידה קוגניטיבית קלה מקבל 22/30 ב-MMSE. אשתו מדווחת שהוא מתבלבל בנהיגה למקומות מוכרים. מה האבחנה הסבירה?',
      options: [
        'Normal aging',
        'Mild cognitive impairment',
        'Alzheimer\'s disease - mild stage',
        'Vascular dementia'
      ],
      correctAnswer: 2,
      explanation: 'Getting lost in familiar places indicates topographical disorientation, a hallmark of early Alzheimer\'s disease beyond MCI.',
      explanationHe: 'התבלבלות במקומות מוכרים מעידה על דיסאוריינטציה טופוגרפית, סימן לאלצהיימר מוקדם.',
      clinicalPearl: 'Visuospatial deficits and getting lost are early signs of AD, often preceding memory complaints',
      references: ['NIA-AA criteria 2018', 'Lancet Neurology 2021']
    },
    {
      id: 'br003',
      category: 'Polypharmacy',
      difficulty: 'Medium',
      points: 2,
      question: 'According to STOPP criteria, which medication should be discontinued in an 85-year-old with recurrent falls?',
      questionHe: 'לפי קריטריוני STOPP, איזו תרופה יש להפסיק בבן 85 עם נפילות חוזרות?',
      options: [
        'Metformin 500mg BID',
        'Lorazepam 1mg QHS',
        'Lisinopril 10mg daily',
        'Simvastatin 20mg daily'
      ],
      correctAnswer: 1,
      explanation: 'Benzodiazepines significantly increase fall risk in elderly and should be avoided per STOPP criteria.',
      explanationHe: 'בנזודיאזפינים מעלים משמעותית סיכון לנפילות בקשישים ויש להימנע מהם לפי STOPP.',
      clinicalPearl: 'Benzodiazepines increase fall risk by 50% and hip fracture risk by 30% in elderly',
      references: ['STOPP/START v2', 'BMJ 2021']
    },
    {
      id: 'br004',
      category: 'Geriatric Syndromes',
      difficulty: 'Easy',
      points: 1,
      question: 'Which assessment tool is most appropriate for evaluating functional status in community-dwelling elderly?',
      questionHe: 'איזה כלי הערכה מתאים ביותר להערכת תפקוד בקשישים בקהילה?',
      options: [
        'Katz ADL',
        'Lawton IADL',
        'Barthel Index',
        'FIM scale'
      ],
      correctAnswer: 1,
      explanation: 'Lawton IADL assesses complex activities needed for independent community living (shopping, finances, medications).',
      explanationHe: 'Lawton IADL מעריך פעילויות מורכבות הנדרשות לחיים עצמאיים בקהילה.',
      clinicalPearl: 'IADL impairment often precedes ADL decline and predicts cognitive impairment',
      references: ['J Am Geriatr Soc 2019']
    },
    {
      id: 'br005',
      category: 'Pharmacology',
      difficulty: 'Hard',
      points: 3,
      question: 'A patient on warfarin for AF starts amiodarone. What INR adjustment is needed?',
      questionHe: 'מטופל על וורפרין לAF מתחיל אמיודרון. איזו התאמת INR נדרשת?',
      options: [
        'No change needed',
        'Increase warfarin by 25%',
        'Decrease warfarin by 30-50%',
        'Decrease warfarin by 10%'
      ],
      correctAnswer: 2,
      explanation: 'Amiodarone inhibits CYP2C9, requiring 30-50% warfarin dose reduction to prevent supratherapeutic INR.',
      explanationHe: 'אמיודרון מעכב CYP2C9, דורש הפחתת וורפרין ב-30-50% למניעת INR גבוה.',
      clinicalPearl: 'Start reducing warfarin dose when initiating amiodarone - don\'t wait for INR to rise',
      references: ['Circulation 2018']
    }
  ],

  // Clinical Case Progressions
  clinicalCases: [
    {
      id: 'case001',
      title: 'Progressive Cognitive Decline',
      titleHe: 'ירידה קוגניטיבית מתקדמת',
      category: 'Dementia',
      difficulty: 'Complex',
      totalPoints: 10,
      stages: [
        {
          stage: 1,
          scenario: 'A 72-year-old retired professor presents with 6-month history of memory complaints. His wife notes he repeats questions. MMSE 26/30.',
          scenarioHe: 'פרופסור בדימוס בן 72 עם תלונות זיכרון במשך 6 חודשים. אשתו מציינת שהוא חוזר על שאלות. MMSE 26/30.',
          question: 'What is the most appropriate next step?',
          questionHe: 'מה הצעד הבא המתאים?',
          options: [
            'Reassure - normal aging',
            'MoCA testing',
            'Start donepezil',
            'Brain MRI'
          ],
          correctAnswer: 1,
          explanation: 'MoCA is more sensitive than MMSE for mild cognitive impairment, especially in educated individuals.',
          points: 2,
          nextStage: 2
        },
        {
          stage: 2,
          scenario: 'MoCA score is 20/30 with deficits in delayed recall and visuospatial. Lab work including B12, TSH, RPR are normal.',
          scenarioHe: 'ציון MoCA 20/30 עם ליקויים בזיכרון מושהה וויזואו-מרחבי. בדיקות מעבדה תקינות.',
          question: 'What imaging study would be most helpful?',
          questionHe: 'איזו בדיקת דימות תהיה הכי מועילה?',
          options: [
            'CT head without contrast',
            'MRI brain with volumetrics',
            'PET amyloid scan',
            'SPECT scan'
          ],
          correctAnswer: 1,
          explanation: 'MRI with hippocampal volumetrics can show atrophy patterns consistent with Alzheimer\'s.',
          points: 2,
          nextStage: 3
        },
        {
          stage: 3,
          scenario: 'MRI shows bilateral hippocampal atrophy. Patient and family want to discuss treatment options.',
          scenarioHe: 'MRI מראה ניוון היפוקמפלי דו-צדדי. המטופל והמשפחה רוצים לדון באפשרויות טיפול.',
          question: 'Which medication would you recommend starting?',
          questionHe: 'איזו תרופה תמליץ להתחיל?',
          options: [
            'Donepezil 5mg daily',
            'Memantine 5mg BID',
            'Rivastigmine patch 4.6mg',
            'Galantamine 8mg BID'
          ],
          correctAnswer: 0,
          explanation: 'Donepezil is first-line for mild-moderate Alzheimer\'s. Start 5mg x 4 weeks, then increase to 10mg.',
          points: 3,
          nextStage: 4
        },
        {
          stage: 4,
          scenario: '6 months later, patient has declined further. Now getting lost driving, MMSE 20/30. Family asks about safety.',
          scenarioHe: 'אחרי 6 חודשים, המטופל הידרדר. מתבלבל בנהיגה, MMSE 20/30. המשפחה שואלת על בטיחות.',
          question: 'What is the most important safety intervention?',
          questionHe: 'מהי התערבות הבטיחות החשובה ביותר?',
          options: [
            'Home safety evaluation',
            'Driving assessment and likely cessation',
            'Medication review',
            'Adult day program'
          ],
          correctAnswer: 1,
          explanation: 'Driving cessation is critical when spatial disorientation develops. Involves DMV reporting in many jurisdictions.',
          points: 3,
          nextStage: null
        }
      ],
      summary: 'This case demonstrates typical progression of Alzheimer\'s disease from MCI to mild dementia, highlighting diagnostic approach and management milestones.'
    },
    {
      id: 'case002',
      title: 'Acute Confusion in Hospitalized Elder',
      titleHe: 'בלבול חריף בקשיש מאושפז',
      category: 'Delirium',
      difficulty: 'Complex',
      totalPoints: 12,
      stages: [
        {
          stage: 1,
          scenario: '85-year-old man admitted for CHF exacerbation. Hospital day 2, nurse reports acute confusion, pulling at IV lines. Baseline cognitively intact.',
          scenarioHe: 'גבר בן 85 אושפז עם החמרת אי ספיקת לב. ביום השני, האחות מדווחת על בלבול חריף. בבסיס - תקין קוגניטיבית.',
          question: 'What is your first assessment?',
          questionHe: 'מהי ההערכה הראשונה שלך?',
          options: [
            'Order haloperidol 2mg IM',
            'Apply CAM criteria',
            'Order head CT',
            'Psychiatric consultation'
          ],
          correctAnswer: 1,
          explanation: 'CAM (Confusion Assessment Method) should be used to diagnose delirium before treatment.',
          points: 2,
          nextStage: 2
        },
        {
          stage: 2,
          scenario: 'CAM positive: acute onset, inattention, disorganized thinking. Vitals: BP 100/60, HR 110, O2 sat 88% on 2L.',
          scenarioHe: 'CAM חיובי: התחלה חריפה, חוסר קשב, חשיבה לא מאורגנת. סימנים: BP 100/60, HR 110, O2 88%.',
          question: 'What is the most likely precipitating factor?',
          questionHe: 'מה הגורם המשקע הסביר ביותר?',
          options: [
            'Medication effect',
            'Hypoxia',
            'Dehydration',
            'Infection'
          ],
          correctAnswer: 1,
          explanation: 'Hypoxia (O2 sat 88%) is a common precipitant of delirium and needs immediate correction.',
          points: 3,
          nextStage: 3
        },
        {
          stage: 3,
          scenario: 'O2 increased to 4L with improvement to 94%. Review shows furosemide 80mg IV BID, new start of levofloxacin for possible pneumonia.',
          scenarioHe: 'חמצן הועלה ל-4L עם שיפור ל-94%. סקירה: פורוסמיד 80mg IV BID, התחלת לבופלוקסצין לדלקת ריאות אפשרית.',
          question: 'Which medication is most likely contributing to delirium?',
          questionHe: 'איזו תרופה כנראה תורמת לדליריום?',
          options: [
            'Furosemide',
            'Levofloxacin',
            'Both equally',
            'Neither'
          ],
          correctAnswer: 1,
          explanation: 'Fluoroquinolones like levofloxacin are high-risk medications for delirium in elderly.',
          points: 3,
          nextStage: 4
        },
        {
          stage: 4,
          scenario: 'Levofloxacin changed to ceftriaxone. Patient remains agitated at night, not sleeping. Family at bedside helps during day.',
          scenarioHe: 'לבופלוקסצין הוחלף לצפטריאקסון. המטופל נותר נסער בלילה, לא ישן. משפחה לצד המיטה עוזרת ביום.',
          question: 'Best intervention for nighttime agitation?',
          questionHe: 'ההתערבות הטובה ביותר לאי-שקט לילי?',
          options: [
            'Quetiapine 25mg QHS',
            'Melatonin 3mg + sleep hygiene',
            'Restraints for safety',
            'Lorazepam 0.5mg PRN'
          ],
          correctAnswer: 1,
          explanation: 'Non-pharmacologic interventions are first-line. Melatonin can help restore sleep-wake cycle.',
          points: 4,
          nextStage: null
        }
      ],
      summary: 'Delirium management requires identifying precipitants, avoiding high-risk medications, and prioritizing non-pharmacologic interventions.'
    },
    {
      id: 'case003',
      title: 'Polypharmacy and Falls',
      titleHe: 'פוליפרמציה ונפילות',
      category: 'Medication Management',
      difficulty: 'Medium',
      totalPoints: 8,
      stages: [
        {
          stage: 1,
          scenario: '79-year-old woman with HTN, DM2, OA, and insomnia presents after fall at home. Takes 12 medications including amlodipine, metformin, glyburide, gabapentin, zolpidem.',
          scenarioHe: 'אישה בת 79 עם יתר לחץ דם, סוכרת, דלקת פרקים ונדודי שינה לאחר נפילה בבית. נוטלת 12 תרופות.',
          question: 'Which medication poses highest fall risk?',
          questionHe: 'איזו תרופה מהווה הסיכון הגבוה ביותר לנפילה?',
          options: [
            'Amlodipine',
            'Metformin',
            'Zolpidem',
            'Gabapentin'
          ],
          correctAnswer: 2,
          explanation: 'Zolpidem (Z-drug) significantly increases fall risk, especially in elderly. Should be discontinued.',
          points: 2,
          nextStage: 2
        },
        {
          stage: 2,
          scenario: 'Zolpidem discontinued. Patient also takes tamsulosin, omeprazole, sertraline 100mg, hydrochlorothiazide. BP 110/70 sitting, 95/60 standing.',
          scenarioHe: 'זולפידם הופסק. המטופלת גם נוטלת טמסולוסין, אומפרזול, סרטרלין, הידרוכלורותיאזיד. BP 110/70 בישיבה, 95/60 בעמידה.',
          question: 'What explains the orthostatic hypotension?',
          questionHe: 'מה מסביר את התת-לחץ האורתוסטטי?',
          options: [
            'Tamsulosin alone',
            'Amlodipine + HCTZ',
            'Multiple contributing drugs',
            'Age-related autonomic dysfunction'
          ],
          correctAnswer: 2,
          explanation: 'Tamsulosin (alpha-blocker), amlodipine (CCB), and HCTZ (diuretic) all contribute to orthostatic hypotension.',
          points: 3,
          nextStage: 3
        },
        {
          stage: 3,
          scenario: 'You decide to deprescribe. Patient\'s A1c is 6.8%, BP averages 125/75, eGFR 45.',
          scenarioHe: 'החלטת להפחית תרופות. A1c 6.8%, BP ממוצע 125/75, eGFR 45.',
          question: 'Which medication should be stopped first?',
          questionHe: 'איזו תרופה להפסיק ראשונה?',
          options: [
            'Glyburide',
            'Hydrochlorothiazide',
            'Tamsulosin',
            'Omeprazole'
          ],
          correctAnswer: 0,
          explanation: 'Glyburide causes hypoglycemia in elderly. With A1c 6.8%, can safely stop. Target A1c 7.5-8% in frail elderly.',
          points: 3,
          nextStage: null
        }
      ],
      summary: 'Systematic deprescribing focusing on high-risk medications can reduce falls while maintaining clinical targets appropriate for elderly.'
    }
  ],

  // Quick Review Questions
  quickReview: [
    {
      id: 'qr001',
      question: 'Preferred anticoagulant for elderly with AF?',
      answer: 'Apixaban - lowest bleeding risk',
      category: 'Pharmacology'
    },
    {
      id: 'qr002',
      question: 'First-line depression treatment in elderly?',
      answer: 'Sertraline or escitalopram (fewer interactions)',
      category: 'Psychiatry'
    },
    {
      id: 'qr003',
      question: 'Target BP in elderly >80 years?',
      answer: '<150/90 (or <140/90 if tolerated)',
      category: 'Cardiovascular'
    },
    {
      id: 'qr004',
      question: 'Screening tool for malnutrition?',
      answer: 'MNA-SF (Mini Nutritional Assessment)',
      category: 'Nutrition'
    },
    {
      id: 'qr005',
      question: 'Best exercise for fall prevention?',
      answer: 'Tai Chi (balance + strength)',
      category: 'Prevention'
    }
  ],

  // OSCE Scenarios
  osceScenarios: [
    {
      id: 'osce001',
      title: 'Breaking Bad News - Dementia Diagnosis',
      titleHe: 'מסירת בשורה קשה - אבחנת דמנציה',
      setting: 'Outpatient clinic',
      timeLimit: '10 minutes',
      actors: 'Patient + daughter',
      scenario: 'You need to explain new diagnosis of Alzheimer\'s disease to patient and family.',
      objectives: [
        'Use SPIKES protocol',
        'Assess understanding',
        'Provide information in chunks',
        'Address emotions',
        'Discuss next steps'
      ],
      checklist: [
        { item: 'Introduces self and role', points: 1 },
        { item: 'Ensures private setting', points: 1 },
        { item: 'Assesses what they know', points: 2 },
        { item: 'Gives warning shot', points: 2 },
        { item: 'Delivers news clearly', points: 2 },
        { item: 'Allows silence/reaction', points: 2 },
        { item: 'Responds to emotions', points: 3 },
        { item: 'Explains in simple terms', points: 2 },
        { item: 'Discusses treatment options', points: 2 },
        { item: 'Offers support resources', points: 2 },
        { item: 'Plans follow-up', points: 1 }
      ],
      maxPoints: 20
    }
  ]
};

// Spaced Repetition Algorithm
export class SpacedRepetition {
  constructor() {
    this.userProgress = JSON.parse(localStorage.getItem('quizProgress') || '{}');
  }

  getNextQuestion(category) {
    const questions = quizDatabase.boardReview.filter(q => 
      !category || q.category === category
    );
    
    // Sort by priority (mistakes, time since last seen, difficulty)
    questions.sort((a, b) => {
      const progressA = this.userProgress[a.id] || { correct: 0, attempts: 0, lastSeen: 0 };
      const progressB = this.userProgress[b.id] || { correct: 0, attempts: 0, lastSeen: 0 };
      
      // Priority score calculation
      const scoreA = this.calculatePriority(progressA, a.difficulty);
      const scoreB = this.calculatePriority(progressB, b.difficulty);
      
      return scoreB - scoreA;
    });
    
    return questions[0];
  }

  calculatePriority(progress, difficulty) {
    const daysSinceLastSeen = (Date.now() - progress.lastSeen) / (1000 * 60 * 60 * 24);
    const accuracy = progress.attempts > 0 ? progress.correct / progress.attempts : 0;
    const difficultyScore = difficulty === 'Hard' ? 3 : difficulty === 'Medium' ? 2 : 1;
    
    // Higher priority for: incorrect answers, not seen recently, higher difficulty
    return (1 - accuracy) * 10 + daysSinceLastSeen * 0.5 + difficultyScore;
  }

  recordAnswer(questionId, correct) {
    if (!this.userProgress[questionId]) {
      this.userProgress[questionId] = { correct: 0, attempts: 0, lastSeen: 0 };
    }
    
    this.userProgress[questionId].attempts++;
    if (correct) this.userProgress[questionId].correct++;
    this.userProgress[questionId].lastSeen = Date.now();
    
    localStorage.setItem('quizProgress', JSON.stringify(this.userProgress));
  }

  getStatistics() {
    const stats = {
      totalQuestions: Object.keys(this.userProgress).length,
      totalAttempts: 0,
      totalCorrect: 0,
      categoryBreakdown: {},
      weakAreas: []
    };
    
    Object.entries(this.userProgress).forEach(([questionId, progress]) => {
      stats.totalAttempts += progress.attempts;
      stats.totalCorrect += progress.correct;
      
      const question = quizDatabase.boardReview.find(q => q.id === questionId);
      if (question) {
        if (!stats.categoryBreakdown[question.category]) {
          stats.categoryBreakdown[question.category] = { attempts: 0, correct: 0 };
        }
        stats.categoryBreakdown[question.category].attempts += progress.attempts;
        stats.categoryBreakdown[question.category].correct += progress.correct;
      }
    });
    
    // Identify weak areas
    Object.entries(stats.categoryBreakdown).forEach(([category, data]) => {
      const accuracy = data.attempts > 0 ? data.correct / data.attempts : 0;
      if (accuracy < 0.7 && data.attempts >= 5) {
        stats.weakAreas.push({ category, accuracy });
      }
    });
    
    stats.overallAccuracy = stats.totalAttempts > 0 ? 
      (stats.totalCorrect / stats.totalAttempts * 100).toFixed(1) : 0;
    
    return stats;
  }
}

// Clinical Case Manager
export class ClinicalCaseManager {
  constructor() {
    this.currentCase = null;
    this.currentStage = 1;
    this.caseScore = 0;
    this.caseHistory = [];
  }

  startCase(caseId) {
    this.currentCase = quizDatabase.clinicalCases.find(c => c.id === caseId);
    this.currentStage = 1;
    this.caseScore = 0;
    this.caseHistory = [];
    return this.getCurrentStage();
  }

  getCurrentStage() {
    if (!this.currentCase) return null;
    return this.currentCase.stages.find(s => s.stage === this.currentStage);
  }

  submitAnswer(answerIndex) {
    const stage = this.getCurrentStage();
    if (!stage) return null;
    
    const correct = answerIndex === stage.correctAnswer;
    if (correct) {
      this.caseScore += stage.points;
    }
    
    this.caseHistory.push({
      stage: this.currentStage,
      answer: answerIndex,
      correct,
      points: correct ? stage.points : 0
    });
    
    const result = {
      correct,
      explanation: stage.explanation,
      points: stage.points,
      totalScore: this.caseScore,
      maxScore: this.currentCase.totalPoints
    };
    
    if (stage.nextStage) {
      this.currentStage = stage.nextStage;
      result.nextStage = this.getCurrentStage();
    } else {
      result.caseComplete = true;
      result.summary = this.currentCase.summary;
      result.performance = this.calculatePerformance();
    }
    
    return result;
  }

  calculatePerformance() {
    const percentage = (this.caseScore / this.currentCase.totalPoints * 100).toFixed(0);
    let rating;
    
    if (percentage >= 90) rating = 'Excellent';
    else if (percentage >= 75) rating = 'Good';
    else if (percentage >= 60) rating = 'Satisfactory';
    else rating = 'Needs Improvement';
    
    return {
      score: this.caseScore,
      maxScore: this.currentCase.totalPoints,
      percentage,
      rating,
      stagesCompleted: this.caseHistory.length,
      correctAnswers: this.caseHistory.filter(h => h.correct).length
    };
  }
}

// Export helper functions
export const getQuestionsByCategory = (category) => {
  return quizDatabase.boardReview.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty) => {
  return quizDatabase.boardReview.filter(q => q.difficulty === difficulty);
};

export const searchQuestions = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return quizDatabase.boardReview.filter(q => 
    q.question.toLowerCase().includes(term) ||
    q.explanation.toLowerCase().includes(term) ||
    q.category.toLowerCase().includes(term)
  );
};

export const getRandomQuestion = (excludeIds = []) => {
  const available = quizDatabase.boardReview.filter(q => !excludeIds.includes(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};

export const getClinicalCases = () => {
  return quizDatabase.clinicalCases;
};

export const getOSCEScenarios = () => {
  return quizDatabase.osceScenarios;
};

export const getQuickReviewByCategory = (category) => {
  return quizDatabase.quickReview.filter(q => q.category === category);
};

// Categories for filtering
export const quizCategories = [
  'Cardiovascular',
  'Cognitive',
  'Polypharmacy',
  'Geriatric Syndromes',
  'Pharmacology',
  'Dementia',
  'Delirium',
  'Medication Management',
  'Falls',
  'Nutrition',
  'Functional Assessment',
  'Palliative Care',
  'Prevention',
  'Psychiatry'
];

export default {
  quizDatabase,
  SpacedRepetition,
  ClinicalCaseManager,
  getQuestionsByCategory,
  getQuestionsByDifficulty,
  searchQuestions,
  getRandomQuestion,
  getClinicalCases,
  getOSCEScenarios,
  getQuickReviewByCategory,
  quizCategories
};