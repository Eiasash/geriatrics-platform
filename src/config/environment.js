// Environment Configuration and AI Integration
// Secure initialization of the enhanced geriatrics platform

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class EnvironmentConfig {
  constructor() {
    this.validateEnvironment();
    this.aiConfig = this.initializeAI();
    this.israeliConfig = this.initializeIsraeliSettings();
    this.securityConfig = this.initializeSecurity();
    this.platformConfig = this.initializePlatform();
  }

  validateEnvironment() {
    const required = [
      'NODE_ENV',
      'DEFAULT_LANGUAGE',
      'EDUCATIONAL_MODE'
    ];

    const missing = required.filter(key => !process.env[key]);
    if (missing.length > 0) {
      console.warn(`Missing environment variables: ${missing.join(', ')}`);
    }

    // Check AI keys availability
    const aiKeys = ['CLAUDE_API_KEY', 'OPENAI_API_KEY', 'GEMINI_API_KEY'];
    const availableAI = aiKeys.filter(key => process.env[key] && process.env[key] !== 'your_key');
    
    console.log(`🤖 Available AI models: ${availableAI.length}/3`);
    
    if (availableAI.length === 0) {
      console.warn('⚠️ No AI models configured - platform will run in fallback mode');
    }
  }

  initializeAI() {
    return {
      models: {
        claude: {
          enabled: !!(process.env.CLAUDE_API_KEY && process.env.CLAUDE_API_KEY !== 'your_key'),
          apiKey: process.env.CLAUDE_API_KEY,
          endpoint: 'https://api.anthropic.com/v1/messages',
          model: 'claude-3-sonnet-20240229'
        },
        openai: {
          enabled: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_key'),
          apiKey: process.env.OPENAI_API_KEY,
          endpoint: 'https://api.openai.com/v1/chat/completions',
          model: 'gpt-4'
        },
        gemini: {
          enabled: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_key'),
          apiKey: process.env.GEMINI_API_KEY,
          endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          model: 'gemini-pro'
        }
      },
      settings: {
        primaryModel: process.env.AI_PRIMARY_MODEL || 'claude',
        fallbackModel: process.env.AI_FALLBACK_MODEL || 'openai',
        consensusThreshold: parseFloat(process.env.AI_CONSENSUS_THRESHOLD) || 0.75,
        maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
        temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.1,
        educationalMode: process.env.AI_EDUCATIONAL_MODE === 'true',
        medicalDisclaimers: process.env.AI_MEDICAL_DISCLAIMERS === 'required'
      }
    };
  }

  initializeIsraeliSettings() {
    return {
      healthcare: {
        kupahIntegration: process.env.KUPAH_INTEGRATION === 'true',
        bituachLeumiIntegration: process.env.BITUACH_LEUMI_INTEGRATION === 'true',
        mohGuidelines: process.env.MOH_GUIDELINES || 'israeli_2024',
        salCoverageCalculator: process.env.SAL_COVERAGE_CALCULATOR === 'enabled'
      },
      localization: {
        defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
        supportedLanguages: (process.env.SUPPORTED_LANGUAGES || 'en,he').split(','),
        timezone: process.env.TIMEZONE || 'Asia/Jerusalem',
        currency: process.env.CURRENCY || 'ILS'
      },
      compliance: {
        hipaaCompliance: process.env.HIPAA_COMPLIANCE === 'true',
        israeliPrivacyAct: process.env.ISRAELI_PRIVACY_ACT === 'true',
        dataResidency: process.env.DATA_RESIDENCY || 'israel',
        auditLogging: process.env.AUDIT_LOGGING === 'enabled'
      }
    };
  }

  initializeSecurity() {
    return {
      jwt: {
        secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      },
      session: {
        secret: process.env.SESSION_SECRET || 'fallback-session-secret',
        algorithm: process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm'
      },
      rateLimiting: {
        requests: parseInt(process.env.RATE_LIMIT_REQUESTS) || 100,
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000
      },
      securityLevel: process.env.SECURITY_LEVEL || 'israeli_medical_standards'
    };
  }

  initializePlatform() {
    return {
      application: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT) || 8080,
        clientPort: parseInt(process.env.CLIENT_PORT) || 3000,
        apiVersion: process.env.API_VERSION || 'v2'
      },
      features: {
        aiEnhancedLearning: process.env.FEATURE_AI_ENHANCED_LEARNING === 'true',
        israeliHealthcareNav: process.env.FEATURE_ISRAELI_HEALTHCARE_NAV === 'true',
        fellowshipTracking: process.env.FEATURE_FELLOWSHIP_TRACKING === 'true',
        multiAiConsensus: process.env.FEATURE_MULTI_AI_CONSENSUS === 'true',
        hebrewVoice: process.env.FEATURE_HEBREW_VOICE === 'true',
        clinicalDecisionSupport: process.env.FEATURE_CLINICAL_DECISION_SUPPORT || 'educational_only'
      },
      education: {
        mode: process.env.EDUCATIONAL_MODE === 'true',
        fellowshipTracking: process.env.FELLOWSHIP_TRACKING === 'enabled',
        competencyAssessment: process.env.COMPETENCY_ASSESSMENT === 'enabled',
        progressAnalytics: process.env.PROGRESS_ANALYTICS === 'true'
      },
      performance: {
        parallelProcessing: process.env.PARALLEL_PROCESSING === 'true',
        cacheEverything: process.env.CACHE_EVERYTHING === 'true',
        cacheTTL: parseInt(process.env.CACHE_TTL) || 3600,
        redisEnabled: process.env.REDIS_ENABLED === 'true'
      }
    };
  }

  // Get configuration for specific components
  getAIConfig() {
    return this.aiConfig;
  }

  getIsraeliConfig() {
    return this.israeliConfig;
  }

  getSecurityConfig() {
    return this.securityConfig;
  }

  getPlatformConfig() {
    return this.platformConfig;
  }

  // Validation methods
  isAIEnabled() {
    return Object.values(this.aiConfig.models).some(model => model.enabled);
  }

  isEducationalMode() {
    return this.platformConfig.education.mode;
  }

  isProductionEnvironment() {
    return this.platformConfig.application.nodeEnv === 'production';
  }

  // Get available AI models
  getAvailableAIModels() {
    return Object.entries(this.aiConfig.models)
      .filter(([_, config]) => config.enabled)
      .map(([name, _]) => name);
  }

  // Security validations
  validateSecuritySettings() {
    const issues = [];
    
    if (this.isProductionEnvironment()) {
      if (this.securityConfig.jwt.secret.includes('fallback')) {
        issues.push('Production environment using default JWT secret');
      }
      
      if (!this.israeliConfig.compliance.auditLogging) {
        issues.push('Audit logging disabled in production');
      }
      
      if (!this.israeliConfig.compliance.israeliPrivacyAct) {
        issues.push('Israeli Privacy Act compliance not enabled');
      }
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  // Generate runtime configuration summary
  getConfigSummary() {
    const availableAI = this.getAvailableAIModels();
    const securityValidation = this.validateSecuritySettings();
    
    return {
      environment: this.platformConfig.application.nodeEnv,
      aiModels: availableAI,
      primaryLanguage: this.israeliConfig.localization.defaultLanguage,
      educationalMode: this.isEducationalMode(),
      israeliCompliance: this.israeliConfig.compliance.israeliPrivacyAct,
      securityValid: securityValidation.valid,
      featuresEnabled: Object.entries(this.platformConfig.features)
        .filter(([_, enabled]) => enabled)
        .map(([feature, _]) => feature),
      securityIssues: securityValidation.issues
    };
  }
}

// Create global configuration instance
export const environmentConfig = new EnvironmentConfig();

// Log initialization summary
if (typeof console !== 'undefined') {
  const summary = environmentConfig.getConfigSummary();
  
  console.log('🏥 Shaare Zedek Geriatrics Platform - Configuration Loaded');
  console.log(`📊 Environment: ${summary.environment}`);
  console.log(`🤖 AI Models: ${summary.aiModels.join(', ') || 'None (fallback mode)'}`);
  console.log(`🌐 Language: ${summary.primaryLanguage}`);
  console.log(`🎓 Educational Mode: ${summary.educationalMode ? 'Enabled' : 'Disabled'}`);
  console.log(`🇮🇱 Israeli Compliance: ${summary.israeliCompliance ? 'Enabled' : 'Disabled'}`);
  console.log(`🔒 Security: ${summary.securityValid ? 'Valid' : 'Issues detected'}`);
  
  if (summary.securityIssues.length > 0) {
    console.warn('⚠️ Security Issues:');
    summary.securityIssues.forEach(issue => console.warn(`   - ${issue}`));
  }
  
  console.log(`✨ Active Features: ${summary.featuresEnabled.join(', ')}`);
  console.log('🚀 Platform ready for medical education use');
}

export default environmentConfig;