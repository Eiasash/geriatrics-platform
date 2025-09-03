// Platform Integration Module
// Integrates AI-enhanced educational features with existing geriatrics platform

import { environmentConfig } from '../config/environment.js';

class MedicalPlatformIntegration {
  constructor() {
    this.config = environmentConfig;
    this.modules = {};
    this.initialized = false;
    
    this.init();
  }

  async init() {
    console.log('🔧 Initializing Medical Platform Integration...');
    
    try {
      // Load core modules based on configuration
      await this.loadCoreModules();
      
      // Initialize AI systems if available
      if (this.config.isAIEnabled()) {
        await this.initializeAISystems();
      }
      
      // Setup Israeli healthcare integration
      await this.initializeIsraeliSystems();
      
      // Initialize educational components
      await this.initializeEducationalSystems();
      
      // Setup monitoring and analytics
      await this.initializeMonitoring();
      
      this.initialized = true;
      console.log('✅ Medical Platform Integration complete');
      
    } catch (error) {
      console.error('❌ Platform integration failed:', error);
      await this.initializeFallbackMode();
    }
  }

  async loadCoreModules() {
    try {
      // Dynamically import modules based on availability
      if (typeof window !== 'undefined') {
        // Browser environment
        this.modules.education = window.GeriatricsEducation;
        this.modules.israeliHealthcare = window.IsraeliHealthcareEducation;
        this.modules.fellowship = window.GeriatricsFellowship;
        this.modules.safeAI = window.SafeMedicalAI;
        this.modules.calculators = window.clinicalCalc;
      } else {
        // Node.js environment
        const { GeriatricsEducationalEngine } = await import('../core/EducationalEngine.js');
        const { IsraeliHealthcareEducation } = await import('../israeli/HealthcareEducation.js');
        const GeriatricsFellowshipProgram = await import('../fellowship/GeriatricsFellowshipTraining.js');
        const SafeMedicalAISystem = await import('../ai/SafeMedicalAI.js');
        
        this.modules.education = new GeriatricsEducationalEngine();
        this.modules.israeliHealthcare = new IsraeliHealthcareEducation();
        this.modules.fellowship = new GeriatricsFellowshipProgram();
        this.modules.safeAI = new SafeMedicalAISystem();
      }
      
      console.log('📚 Core modules loaded successfully');
    } catch (error) {
      console.warn('⚠️ Some modules failed to load:', error.message);
    }
  }

  async initializeAISystems() {
    if (!this.modules.safeAI) {
      console.warn('⚠️ Safe AI module not available');
      return;
    }

    const aiConfig = this.config.getAIConfig();
    const availableModels = this.config.getAvailableAIModels();
    
    console.log(`🤖 Initializing AI systems: ${availableModels.join(', ')}`);
    
    // Configure AI with educational constraints
    this.modules.safeAI.configure({
      educationalMode: aiConfig.settings.educationalMode,
      medicalDisclaimers: aiConfig.settings.medicalDisclaimers,
      israeliContext: true,
      maxTokens: aiConfig.settings.maxTokens,
      temperature: aiConfig.settings.temperature
    });
    
    // Test AI connectivity
    try {
      const testResult = await this.modules.safeAI.testConnectivity();
      console.log(`✅ AI systems ready: ${testResult.workingModels.join(', ')}`);
    } catch (error) {
      console.warn('⚠️ AI connectivity issues:', error.message);
    }
  }

  async initializeIsraeliSystems() {
    if (!this.modules.israeliHealthcare) {
      console.warn('⚠️ Israeli healthcare module not available');
      return;
    }

    const israeliConfig = this.config.getIsraeliConfig();
    
    console.log('🇮🇱 Initializing Israeli healthcare integration...');
    
    // Configure Israeli-specific settings
    this.modules.israeliHealthcare.configure({
      kupahIntegration: israeliConfig.healthcare.kupahIntegration,
      bituachLeumiIntegration: israeliConfig.healthcare.bituachLeumiIntegration,
      mohGuidelines: israeliConfig.healthcare.mohGuidelines,
      defaultLanguage: israeliConfig.localization.defaultLanguage,
      supportedLanguages: israeliConfig.localization.supportedLanguages
    });
    
    console.log('✅ Israeli healthcare systems ready');
  }

  async initializeEducationalSystems() {
    if (!this.modules.education || !this.modules.fellowship) {
      console.warn('⚠️ Educational modules not fully available');
      return;
    }

    const platformConfig = this.config.getPlatformConfig();
    
    console.log('🎓 Initializing educational systems...');
    
    // Configure educational engine
    this.modules.education.configure({
      educationalMode: platformConfig.education.mode,
      fellowshipTracking: platformConfig.education.fellowshipTracking,
      competencyAssessment: platformConfig.education.competencyAssessment,
      progressAnalytics: platformConfig.education.progressAnalytics,
      israeliContext: true
    });
    
    console.log('✅ Educational systems ready');
  }

  async initializeMonitoring() {
    const platformConfig = this.config.getPlatformConfig();
    
    if (platformConfig.performance.redisEnabled) {
      console.log('📊 Redis caching enabled');
    }
    
    if (this.config.israeliConfig.compliance.auditLogging) {
      console.log('📝 Audit logging enabled');
    }
    
    console.log('✅ Monitoring systems ready');
  }

  async initializeFallbackMode() {
    console.log('🔄 Initializing fallback mode...');
    
    // Provide basic functionality without AI enhancement
    this.modules.fallback = {
      generateCase: this.generateBasicCase,
      assessProgress: this.basicProgressAssessment,
      israeliGuidance: this.basicIsraeliGuidance
    };
    
    this.initialized = true;
    console.log('✅ Fallback mode active');
  }

  // API Methods for integration with existing platform

  async enhancePatientCase(caseData, userId) {
    if (!this.initialized) {
      throw new Error('Platform not initialized');
    }

    try {
      let enhancedCase = { ...caseData };
      
      // Add AI-generated educational content if available
      if (this.modules.safeAI && this.config.platformConfig.features.aiEnhancedLearning) {
        const aiEnhancement = await this.modules.safeAI.generateEducationalCase(
          caseData.category || 'general',
          caseData.difficulty || 'intermediate',
          true // Israeli context
        );
        
        if (aiEnhancement) {
          enhancedCase.aiGeneratedContent = aiEnhancement.case;
          enhancedCase.learningObjectives = aiEnhancement.metadata;
        }
      }
      
      // Add Israeli healthcare context
      if (this.modules.israeliHealthcare) {
        const israeliContext = await this.modules.israeliHealthcare.generateContextualGuidance(caseData);
        enhancedCase.israeliGuidance = israeliContext;
      }
      
      // Track educational progress if fellowship tracking enabled
      if (this.modules.fellowship && this.config.platformConfig.features.fellowshipTracking) {
        const progressUpdate = await this.modules.fellowship.trackCaseCompletion(userId, caseData.id);
        enhancedCase.progressImpact = progressUpdate;
      }
      
      return enhancedCase;
      
    } catch (error) {
      console.error('Case enhancement failed:', error);
      return caseData; // Return original case if enhancement fails
    }
  }

  async generatePersonalizedQuiz(userId, preferences = {}) {
    if (!this.initialized) {
      throw new Error('Platform not initialized');
    }

    try {
      let quiz = {};
      
      // Use educational engine for personalized content
      if (this.modules.education) {
        const userProgress = await this.getUserProgress(userId);
        quiz = await this.modules.education.generateSpacedRepetitionQuiz(userProgress);
      }
      
      // Enhance with AI if available
      if (this.modules.safeAI && quiz.questions) {
        const enhancedQuestions = await Promise.all(
          quiz.questions.map(q => this.modules.safeAI.enhanceQuestion(q))
        );
        quiz.questions = enhancedQuestions;
      }
      
      // Add Israeli healthcare context questions
      if (this.modules.israeliHealthcare) {
        const israeliQuestions = await this.modules.israeliHealthcare.generateSystemNavigationQuiz();
        quiz.israeliContext = israeliQuestions;
      }
      
      return quiz;
      
    } catch (error) {
      console.error('Quiz generation failed:', error);
      return this.generateBasicQuiz(preferences);
    }
  }

  async assessUserProgress(userId, assessmentData) {
    if (!this.initialized) {
      throw new Error('Platform not initialized');
    }

    try {
      let progressReport = {};
      
      // Educational progress tracking
      if (this.modules.education) {
        progressReport.educational = await this.modules.education.assessLearningProgress(
          userId, 
          assessmentData
        );
      }
      
      // Fellowship competency tracking
      if (this.modules.fellowship && this.config.platformConfig.features.fellowshipTracking) {
        progressReport.fellowship = await this.modules.fellowship.trackFellowProgress(
          userId, 
          assessmentData
        );
      }
      
      // Israeli healthcare competency
      if (this.modules.israeliHealthcare) {
        progressReport.israeliCompetency = await this.modules.israeliHealthcare.assessCompetency(
          userId, 
          assessmentData
        );
      }
      
      // AI-enhanced recommendations if available
      if (this.modules.safeAI) {
        const recommendations = await this.modules.safeAI.generateEducationalRecommendations(
          progressReport,
          assessmentData.focusAreas || []
        );
        progressReport.aiRecommendations = recommendations;
      }
      
      return progressReport;
      
    } catch (error) {
      console.error('Progress assessment failed:', error);
      return this.basicProgressAssessment(userId, assessmentData);
    }
  }

  async calculateWithIsraeliContext(calculatorType, data) {
    if (!this.initialized) {
      throw new Error('Platform not initialized');
    }

    try {
      let result = {};
      
      // Use existing clinical calculators
      if (this.modules.calculators) {
        switch (calculatorType) {
          case 'cha2ds2vasc':
            result = this.modules.calculators.calculateCHA2DS2VASc(data);
            break;
          case 'morse':
            result = this.modules.calculators.calculateMorseFallScale(data);
            break;
          case 'cfs':
            result = this.modules.calculators.calculateClinicalFrailtyScale(data);
            break;
          default:
            throw new Error(`Unknown calculator type: ${calculatorType}`);
        }
      }
      
      // Add Israeli healthcare context
      if (this.modules.israeliHealthcare) {
        const israeliContext = await this.modules.israeliHealthcare.addCalculatorContext(
          calculatorType, 
          result, 
          data
        );
        result.israeliGuidance = israeliContext;
      }
      
      // Educational framing
      result.educationalNote = 'This calculation is for educational purposes only and should not replace clinical judgment.';
      
      return result;
      
    } catch (error) {
      console.error('Calculator enhancement failed:', error);
      throw error;
    }
  }

  // Utility methods for integration

  async getUserProgress(userId) {
    // Placeholder for user progress retrieval
    // In real implementation, this would query the database
    return {
      completedCases: 0,
      correctAnswers: new Map(),
      incorrectAnswers: new Map(),
      knowledgeGaps: [],
      fellowshipMonth: 1
    };
  }

  generateBasicCase(category) {
    return {
      title: `Basic ${category} Case`,
      scenario: 'Educational case scenario for learning purposes',
      questions: ['What is the differential diagnosis?'],
      learningPoints: ['Apply systematic assessment', 'Consider geriatric factors'],
      disclaimer: 'Educational purposes only'
    };
  }

  generateBasicQuiz(preferences) {
    return {
      questions: [
        {
          question: 'What are the 4 Ms of geriatric care?',
          options: ['Mind, Mobility, Medication, What Matters'],
          correct: 0,
          explanation: 'The 4 Ms framework guides comprehensive geriatric assessment.'
        }
      ],
      disclaimer: 'Educational assessment only'
    };
  }

  basicProgressAssessment(userId, data) {
    return {
      overallScore: '75%',
      recommendations: ['Continue systematic learning', 'Practice case-based scenarios'],
      nextSteps: ['Review geriatric syndromes']
    };
  }

  basicIsraeliGuidance(context) {
    return {
      kupahGuidance: 'Consult your Kupah for specific coverage policies',
      bituachLeumiInfo: 'Consider eligibility for relevant benefits',
      mohProtocols: 'Follow current Ministry of Health guidelines'
    };
  }

  // Health check method
  getSystemStatus() {
    return {
      initialized: this.initialized,
      modules: {
        education: !!this.modules.education,
        israeliHealthcare: !!this.modules.israeliHealthcare,
        fellowship: !!this.modules.fellowship,
        safeAI: !!this.modules.safeAI,
        calculators: !!this.modules.calculators
      },
      aiEnabled: this.config.isAIEnabled(),
      availableAIModels: this.config.getAvailableAIModels(),
      educationalMode: this.config.isEducationalMode(),
      features: this.config.platformConfig.features
    };
  }
}

// Initialize platform integration
export const platformIntegration = new MedicalPlatformIntegration();

// Make available globally for browser use
if (typeof window !== 'undefined') {
  window.MedicalPlatform = platformIntegration;
}

export default platformIntegration;