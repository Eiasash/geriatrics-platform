// Educational Engine for Geriatrics Fellowship Training
// Comprehensive learning system with case-based scenarios

class GeriatricsEducationalEngine {
  constructor() {
    this.knowledgeAreas = {
      cognitive: 'Dementia, delirium, mild cognitive impairment',
      functional: 'ADLs, IADLs, mobility, falls',
      medication: 'Polypharmacy, adverse effects, deprescribing',
      psychosocial: 'Depression, anxiety, social isolation',
      nutrition: 'Malnutrition, sarcopenia, dysphagia',
      endOfLife: 'Palliative care, advance directives'
    };
    
    this.difficultyLevels = ['beginner', 'intermediate', 'advanced'];
    this.caseBank = this.initializeCaseBank();
    this.quizBank = this.initializeQuizBank();
    this.progressTracking = new Map();
  }

  initializeCaseBank() {
    return {
      cognitive: [
        {
          id: 'cog001',
          title: 'Distinguishing Delirium from Dementia',
          difficulty: 'intermediate',
          scenario: 'An 82-year-old woman with known mild dementia is brought to the ED by her daughter for confusion that started 2 days ago...',
          learningObjectives: [
            'Apply CAM criteria for delirium diagnosis',
            'Identify precipitating factors for delirium',
            'Develop appropriate management plan'
          ],
          questions: [
            {
              question: 'What is the most important distinguishing feature between delirium and dementia?',
              options: [
                'Level of consciousness',
                'Acute onset and fluctuating course',
                'Memory impairment',
                'Disorientation'
              ],
              correct: 1,
              explanation: 'Delirium has an acute onset (hours to days) and fluctuating course, while dementia typically has gradual onset and steady progression.'
            }
          ]
        },
        {
          id: 'cog002',
          title: 'Medication-Induced Cognitive Impairment',
          difficulty: 'advanced',
          scenario: 'A 78-year-old man with multiple medical conditions presents with progressive cognitive decline over 6 months...',
          learningObjectives: [
            'Identify potentially cognitive-impairing medications',
            'Calculate anticholinergic burden',
            'Develop deprescribing strategy'
          ]
        }
      ],
      functional: [
        {
          id: 'func001',
          title: 'Comprehensive Fall Risk Assessment',
          difficulty: 'beginner',
          scenario: 'An 85-year-old independent woman has had 2 falls in the past month without serious injury...',
          learningObjectives: [
            'Perform systematic fall risk assessment',
            'Apply Morse Fall Scale',
            'Recommend evidence-based interventions'
          ]
        }
      ]
    };
  }

  initializeQuizBank() {
    return {
      geriatricSyndromes: [
        {
          question: 'Which of the following is NOT one of the "4 Ms" of geriatric care?',
          options: ['Mind', 'Mobility', 'Medication', 'Metabolism', 'What Matters'],
          correct: 3,
          category: 'foundations',
          explanation: 'The 4 Ms are: Mind (cognitive health), Mobility (physical function), Medication (polypharmacy), and What Matters (patient priorities).'
        },
        {
          question: 'What CHA2DS2-VASc score threshold typically warrants anticoagulation in Israeli healthcare?',
          options: ['≥1', '≥2', '≥3', '≥4'],
          correct: 1,
          category: 'israeli-context',
          explanation: 'In Israel, anticoagulation is typically covered by Kupot Holim for CHA2DS2-VASc ≥2.'
        }
      ],
      pharmacology: [
        {
          question: 'Which medication class has the highest anticholinergic burden in elderly patients?',
          options: ['Beta-blockers', 'Tricyclic antidepressants', 'ACE inhibitors', 'Statins'],
          correct: 1,
          category: 'medication-safety',
          explanation: 'Tricyclic antidepressants have high anticholinergic properties and should be avoided in elderly patients per Beers Criteria.'
        }
      ]
    };
  }

  generatePersonalizedCase(learnerProfile) {
    const { weakAreas, experienceLevel, preferredLanguage = 'en' } = learnerProfile;
    
    // Select case based on weak areas
    const targetArea = weakAreas[0] || 'cognitive';
    const availableCases = this.caseBank[targetArea] || [];
    
    // Filter by difficulty
    const appropriateCases = availableCases.filter(c => 
      c.difficulty === experienceLevel || 
      (experienceLevel === 'advanced' && c.difficulty === 'intermediate')
    );
    
    if (appropriateCases.length === 0) return null;
    
    const selectedCase = appropriateCases[Math.floor(Math.random() * appropriateCases.length)];
    
    return this.formatCaseForPresentation(selectedCase, preferredLanguage);
  }

  formatCaseForPresentation(caseData, language = 'en') {
    if (language === 'he') {
      return this.translateCase(caseData);
    }
    return caseData;
  }

  translateCase(caseData) {
    // Hebrew translations for common medical terms
    const translations = {
      'Distinguishing Delirium from Dementia': 'הבחנה בין דליריום לדמנציה',
      'Comprehensive Fall Risk Assessment': 'הערכה מקיפה של סיכון נפילות',
      'confusion': 'בלבול',
      'falls': 'נפילות',
      'medication': 'תרופות'
    };
    
    // Simple translation logic - in practice, use professional translation service
    const translated = { ...caseData };
    Object.keys(translations).forEach(key => {
      if (translated.title && translated.title.includes(key)) {
        translated.title = translated.title.replace(key, translations[key]);
      }
    });
    
    return translated;
  }

  generateSpacedRepetitionQuiz(learnerProgress) {
    const { correctAnswers = new Map(), incorrectAnswers = new Map() } = learnerProgress;
    
    // Prioritize previously incorrect answers
    const reviewQuestions = [];
    const newQuestions = [];
    
    Object.values(this.quizBank).flat().forEach(question => {
      if (incorrectAnswers.has(question.question)) {
        reviewQuestions.push({ ...question, priority: 'review' });
      } else if (!correctAnswers.has(question.question)) {
        newQuestions.push({ ...question, priority: 'new' });
      }
    });
    
    // Create mixed quiz: 70% review, 30% new
    const quiz = [];
    const reviewCount = Math.min(7, reviewQuestions.length);
    const newCount = Math.min(3, newQuestions.length);
    
    quiz.push(...reviewQuestions.slice(0, reviewCount));
    quiz.push(...newQuestions.slice(0, newCount));
    
    return this.shuffleArray(quiz);
  }

  assessLearningProgress(userId, quizResults) {
    const progress = this.progressTracking.get(userId) || {
      correctAnswers: new Map(),
      incorrectAnswers: new Map(),
      knowledgeGaps: [],
      strengths: [],
      completedCases: []
    };
    
    quizResults.forEach(result => {
      const { question, selectedAnswer, correctAnswer, category } = result;
      
      if (selectedAnswer === correctAnswer) {
        progress.correctAnswers.set(question, Date.now());
        // Remove from incorrect if previously wrong
        progress.incorrectAnswers.delete(question);
      } else {
        progress.incorrectAnswers.set(question, {
          timestamp: Date.now(),
          selectedAnswer,
          correctAnswer,
          category
        });
      }
    });
    
    // Analyze knowledge gaps
    const categoryPerformance = new Map();
    progress.incorrectAnswers.forEach(error => {
      const count = categoryPerformance.get(error.category) || 0;
      categoryPerformance.set(error.category, count + 1);
    });
    
    progress.knowledgeGaps = Array.from(categoryPerformance.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);
    
    this.progressTracking.set(userId, progress);
    return progress;
  }

  generateProgressReport(userId) {
    const progress = this.progressTracking.get(userId);
    if (!progress) return null;
    
    const totalAnswered = progress.correctAnswers.size + progress.incorrectAnswers.size;
    const accuracy = totalAnswered > 0 ? 
      (progress.correctAnswers.size / totalAnswered * 100).toFixed(1) : 0;
    
    return {
      overallAccuracy: `${accuracy}%`,
      questionsAnswered: totalAnswered,
      knowledgeGaps: progress.knowledgeGaps,
      casesCompleted: progress.completedCases.length,
      recommendations: this.generateRecommendations(progress)
    };
  }

  generateRecommendations(progress) {
    const recommendations = [];
    
    if (progress.knowledgeGaps.includes('medication-safety')) {
      recommendations.push('Review STOPP/START criteria and Israeli drug formulary');
    }
    
    if (progress.knowledgeGaps.includes('israeli-context')) {
      recommendations.push('Focus on Bituach Leumi benefits and Kupah coverage policies');
    }
    
    if (progress.correctAnswers.size < 50) {
      recommendations.push('Continue with foundational geriatric syndromes cases');
    }
    
    if (progress.completedCases.length < 10) {
      recommendations.push('Work through more case-based scenarios for clinical reasoning');
    }
    
    return recommendations;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // API methods for integration
  createLearningSession(userId, preferences = {}) {
    const profile = {
      weakAreas: preferences.focusAreas || ['cognitive', 'functional'],
      experienceLevel: preferences.level || 'intermediate',
      preferredLanguage: preferences.language || 'en'
    };
    
    const personalizedCase = this.generatePersonalizedCase(profile);
    const progress = this.progressTracking.get(userId);
    const quiz = this.generateSpacedRepetitionQuiz(progress || {});
    
    return {
      case: personalizedCase,
      quiz: quiz.slice(0, 5), // Limit to 5 questions per session
      sessionId: `session_${Date.now()}_${userId}`
    };
  }

  submitSession(userId, sessionData) {
    const { caseId, quizResults } = sessionData;
    
    // Update progress
    const progress = this.assessLearningProgress(userId, quizResults);
    
    // Mark case as completed
    if (caseId && !progress.completedCases.includes(caseId)) {
      progress.completedCases.push(caseId);
      this.progressTracking.set(userId, progress);
    }
    
    return {
      progressUpdate: this.generateProgressReport(userId),
      nextRecommendations: progress.knowledgeGaps,
      congratulations: quizResults.filter(r => r.selectedAnswer === r.correctAnswer).length >= 4
    };
  }
}

// Medical Knowledge Integration
class MedicalKnowledgeValidator {
  constructor() {
    this.evidenceLevels = {
      A: 'Systematic review/meta-analysis',
      B: 'Well-designed controlled trial',
      C: 'Expert consensus/case series',
      D: 'Expert opinion'
    };
  }

  validateClinicalContent(content) {
    // Ensure educational content meets medical standards
    const validation = {
      isEvidenceBased: this.checkEvidenceBase(content),
      hasAppropriateDisclaimers: this.checkDisclaimers(content),
      followsGuidelines: this.checkGuidelines(content),
      isEducationalOnly: this.ensureEducationalContext(content)
    };
    
    return validation;
  }

  checkEvidenceBase(content) {
    // Check if content references appropriate medical literature
    const evidenceKeywords = ['study', 'trial', 'meta-analysis', 'guideline', 'evidence'];
    return evidenceKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
  }

  checkDisclaimers(content) {
    const requiredDisclaimers = [
      'educational purposes only',
      'not medical advice',
      'consult healthcare provider'
    ];
    
    return requiredDisclaimers.some(disclaimer => 
      content.toLowerCase().includes(disclaimer)
    );
  }

  checkGuidelines(content) {
    // Verify adherence to geriatric medicine guidelines
    return true; // Placeholder for guideline checking logic
  }

  ensureEducationalContext(content) {
    // Ensure content is framed as educational, not prescriptive
    const educationalFraming = [
      'learning objective',
      'case study',
      'educational scenario',
      'knowledge assessment'
    ];
    
    return educationalFraming.some(frame => 
      content.toLowerCase().includes(frame)
    );
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GeriatricsEducationalEngine, MedicalKnowledgeValidator };
}

// Initialize for browser use
if (typeof window !== 'undefined') {
  window.GeriatricsEducation = new GeriatricsEducationalEngine();
  window.MedicalValidator = new MedicalKnowledgeValidator();
  
  console.log('📚 Geriatrics Educational Engine initialized');
  console.log('✅ Medical Knowledge Validator ready');
}
