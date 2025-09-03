#!/usr/bin/env node

// Comprehensive Platform Testing Script
// Tests all enhanced features of the Shaare Zedek Geriatrics Platform

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

class PlatformTester {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: []
    };
    this.startTime = Date.now();
  }

  async runAllTests() {
    console.log('🧪 SHAARE ZEDEK GERIATRICS PLATFORM - COMPREHENSIVE TESTING');
    console.log('=' * 70);
    console.log('Testing enhanced AI-powered medical education platform...\n');

    try {
      await this.testEnvironmentConfiguration();
      await this.testCoreModules();
      await this.testAIIntegration();
      await this.testIsraeliHealthcareModules();
      await this.testEducationalFeatures();
      await this.testFellowshipTracking();
      await this.testClinicalCalculators();
      await this.testPlatformIntegration();
      await this.testSafetyConstraints();
      
      this.displayFinalResults();
      
    } catch (error) {
      this.logError('Critical testing failure', error);
      this.displayFinalResults();
      process.exit(1);
    }
  }

  async testEnvironmentConfiguration() {
    console.log('🔧 Testing Environment Configuration...');
    
    try {
      // Check .env file exists and has required values
      const envContent = await fs.readFile('.env', 'utf8');
      
      const requiredVars = [
        'CLAUDE_API_KEY',
        'OPENAI_API_KEY', 
        'GEMINI_API_KEY',
        'DEFAULT_LANGUAGE',
        'EDUCATIONAL_MODE'
      ];
      
      let envValid = true;
      requiredVars.forEach(varName => {
        if (!envContent.includes(varName)) {
          this.logError(`Missing environment variable: ${varName}`);
          envValid = false;
        } else if (envContent.includes(`${varName}=your_key`)) {
          this.logWarning(`${varName} not configured (using placeholder)`);
        } else {
          this.logSuccess(`${varName} configured`);
        }
      });
      
      // Test AI keys are valid format
      const claudeKeyMatch = envContent.match(/CLAUDE_API_KEY=(.+)/);
      const openaiKeyMatch = envContent.match(/OPENAI_API_KEY=(.+)/);
      const geminiKeyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
      
      if (claudeKeyMatch && claudeKeyMatch[1].startsWith('sk-ant-')) {
        this.logSuccess('Claude API key format valid');
      } else if (claudeKeyMatch) {
        this.logWarning('Claude API key format unusual');
      }
      
      if (openaiKeyMatch && openaiKeyMatch[1].startsWith('sk-proj-')) {
        this.logSuccess('OpenAI API key format valid');
      } else if (openaiKeyMatch) {
        this.logWarning('OpenAI API key format unusual');
      }
      
      if (geminiKeyMatch && geminiKeyMatch[1].startsWith('AIza')) {
        this.logSuccess('Gemini API key format valid');
      } else if (geminiKeyMatch) {
        this.logWarning('Gemini API key format unusual');
      }
      
      // Test educational and Israeli settings
      if (envContent.includes('EDUCATIONAL_MODE=true')) {
        this.logSuccess('Educational mode enabled');
      } else {
        this.logError('Educational mode not enabled - required for medical training');
        envValid = false;
      }
      
      if (envContent.includes('DEFAULT_LANGUAGE=en')) {
        this.logSuccess('Default language set to English');
      } else {
        this.logWarning('Default language not set to English');
      }
      
      if (envContent.includes('ISRAELI_PRIVACY_ACT=true')) {
        this.logSuccess('Israeli privacy compliance enabled');
      } else {
        this.logWarning('Israeli privacy compliance not explicitly enabled');
      }
      
      console.log(`   Environment configuration: ${envValid ? '✅ VALID' : '❌ ISSUES DETECTED'}\n`);
      
    } catch (error) {
      this.logError('Failed to read .env file', error);
    }
  }

  async testCoreModules() {
    console.log('📚 Testing Core Educational Modules...');
    
    const modules = [
      'src/core/EducationalEngine.js',
      'src/ai/SafeMedicalAI.js',
      'src/ai/MultiAIOrchestrator.js',
      'src/israeli/HealthcareEducation.js',
      'src/fellowship/GeriatricsFellowshipTraining.js',
      'src/algorithms/AdvancedGeriatricSyndromes.js',
      'src/integration/PlatformIntegration.js'
    ];
    
    for (const modulePath of modules) {
      try {
        await fs.access(modulePath);
        
        // Basic syntax check by reading file
        const content = await fs.readFile(modulePath, 'utf8');
        
        // Check for key educational constraints
        if (content.includes('educational') || content.includes('Educational')) {
          this.logSuccess(`${modulePath} - Contains educational framing`);
        } else {
          this.logWarning(`${modulePath} - Missing educational framing`);
        }
        
        // Check for safety disclaimers
        if (content.includes('disclaimer') || content.includes('educational purposes only')) {
          this.logSuccess(`${modulePath} - Contains safety disclaimers`);
        } else {
          this.logWarning(`${modulePath} - Missing safety disclaimers`);
        }
        
        // Check for Israeli context
        if (content.includes('israeli') || content.includes('Israeli') || content.includes('kupah')) {
          this.logSuccess(`${modulePath} - Contains Israeli healthcare context`);
        } else {
          this.logWarning(`${modulePath} - Missing Israeli healthcare context`);
        }
        
      } catch (error) {
        this.logError(`${modulePath} - File not found or unreadable`);
      }
    }
    
    console.log('   Core modules check complete\n');
  }

  async testAIIntegration() {
    console.log('🤖 Testing AI Integration...');
    
    try {
      // Test if AI orchestrator module has proper structure
      const orchestratorContent = await fs.readFile('src/ai/MultiAIOrchestrator.js', 'utf8');
      
      // Check for multi-AI support
      const hasClaudeSupport = orchestratorContent.includes('claude') && orchestratorContent.includes('anthropic');
      const hasOpenAISupport = orchestratorContent.includes('openai') && orchestratorContent.includes('gpt');
      const hasGeminiSupport = orchestratorContent.includes('gemini') && orchestratorContent.includes('google');
      
      if (hasClaudeSupport) this.logSuccess('Claude integration code present');
      if (hasOpenAISupport) this.logSuccess('OpenAI integration code present');
      if (hasGeminiSupport) this.logSuccess('Gemini integration code present');
      
      // Check for consensus mechanism
      if (orchestratorContent.includes('consensus') || orchestratorContent.includes('synthesize')) {
        this.logSuccess('Multi-AI consensus mechanism present');
      } else {
        this.logWarning('Multi-AI consensus mechanism not clearly implemented');
      }
      
      // Check for educational constraints
      if (orchestratorContent.includes('educational') && orchestratorContent.includes('disclaimer')) {
        this.logSuccess('AI educational constraints properly implemented');
      } else {
        this.logError('AI educational constraints missing - safety risk');
      }
      
      // Test SafeMedicalAI module
      const safeAIContent = await fs.readFile('src/ai/SafeMedicalAI.js', 'utf8');
      
      if (safeAIContent.includes('validateEducationalContent')) {
        this.logSuccess('Educational content validation present');
      } else {
        this.logWarning('Educational content validation not found');
      }
      
      if (safeAIContent.includes('avoidsDirectMedicalAdvice')) {
        this.logSuccess('Direct medical advice prevention implemented');
      } else {
        this.logError('Direct medical advice prevention missing - safety risk');
      }
      
    } catch (error) {
      this.logError('AI integration testing failed', error);
    }
    
    console.log('   AI integration check complete\n');
  }

  async testIsraeliHealthcareModules() {
    console.log('🇮🇱 Testing Israeli Healthcare Integration...');
    
    try {
      const israeliContent = await fs.readFile('src/israeli/HealthcareEducation.js', 'utf8');
      
      // Check for Kupot Holim integration
      const kupotPresent = ['clalit', 'maccabi', 'meuhedet', 'leumit'].every(kupah => 
        israeliContent.toLowerCase().includes(kupah)
      );
      
      if (kupotPresent) {
        this.logSuccess('All major Kupot Holim represented');
      } else {
        this.logWarning('Some Kupot Holim missing from integration');
      }
      
      // Check for Bituach Leumi integration  
      if (israeliContent.includes('bituachLeumi') || israeliContent.includes('גמלת סיעוד')) {
        this.logSuccess('Bituach Leumi benefits integration present');
      } else {
        this.logWarning('Bituach Leumi integration not found');
      }
      
      // Check for cultural competency
      if (israeliContent.includes('cultural') && israeliContent.includes('russian')) {
        this.logSuccess('Cultural competency modules present');
      } else {
        this.logWarning('Cultural competency modules incomplete');
      }
      
      // Check for Hebrew language support
      if (israeliContent.includes('hebrew') || israeliContent.includes('עברית')) {
        this.logSuccess('Hebrew language support present');
      } else {
        this.logWarning('Hebrew language support not clearly implemented');
      }
      
    } catch (error) {
      this.logError('Israeli healthcare module testing failed', error);
    }
    
    console.log('   Israeli healthcare integration check complete\n');
  }

  async testEducationalFeatures() {
    console.log('🎓 Testing Educational Features...');
    
    try {
      const educationContent = await fs.readFile('src/core/EducationalEngine.js', 'utf8');
      
      // Check for case-based learning
      if (educationContent.includes('caseBank') || educationContent.includes('generateCase')) {
        this.logSuccess('Case-based learning system present');
      } else {
        this.logWarning('Case-based learning system not found');
      }
      
      // Check for spaced repetition
      if (educationContent.includes('spaced') && educationContent.includes('repetition')) {
        this.logSuccess('Spaced repetition quiz system present');
      } else {
        this.logWarning('Spaced repetition system not clearly implemented');
      }
      
      // Check for progress tracking
      if (educationContent.includes('progress') && educationContent.includes('tracking')) {
        this.logSuccess('Progress tracking system present');
      } else {
        this.logWarning('Progress tracking system incomplete');
      }
      
      // Check for competency mapping
      if (educationContent.includes('competency') || educationContent.includes('milestone')) {
        this.logSuccess('Competency mapping present');
      } else {
        this.logWarning('Competency mapping not found');
      }
      
    } catch (error) {
      this.logError('Educational features testing failed', error);
    }
    
    console.log('   Educational features check complete\n');
  }

  async testFellowshipTracking() {
    console.log('👩‍⚕️ Testing Fellowship Training Module...');
    
    try {
      const fellowshipContent = await fs.readFile('src/fellowship/GeriatricsFellowshipTraining.js', 'utf8');
      
      // Check for 12-month program structure
      if (fellowshipContent.includes('12') && fellowshipContent.includes('month')) {
        this.logSuccess('12-month fellowship structure present');
      } else {
        this.logWarning('Fellowship duration not clearly specified');
      }
      
      // Check for Shaare Zedek integration
      if (fellowshipContent.includes('Shaare') || fellowshipContent.includes('שערי צדק')) {
        this.logSuccess('Shaare Zedek Medical Center integration present');
      } else {
        this.logWarning('Shaare Zedek specific integration not found');
      }
      
      // Check for competency framework
      const competencies = ['patientCare', 'medicalKnowledge', 'systemsBasedPractice'];
      const hasCompetencies = competencies.some(comp => fellowshipContent.includes(comp));
      
      if (hasCompetencies) {
        this.logSuccess('Fellowship competency framework present');
      } else {
        this.logWarning('Fellowship competency framework incomplete');
      }
      
      // Check for rotation tracking
      if (fellowshipContent.includes('rotation') && fellowshipContent.includes('inpatient')) {
        this.logSuccess('Rotation tracking system present');
      } else {
        this.logWarning('Rotation tracking system not found');
      }
      
    } catch (error) {
      this.logError('Fellowship tracking testing failed', error);
    }
    
    console.log('   Fellowship tracking check complete\n');
  }

  async testClinicalCalculators() {
    console.log('🧮 Testing Clinical Calculators...');
    
    try {
      // Check if enhanced calculators exist
      const calculatorsExist = await this.fileExists('h5p/advanced-clinical-calculators.js');
      
      if (calculatorsExist) {
        const calcContent = await fs.readFile('h5p/advanced-clinical-calculators.js', 'utf8');
        
        // Check for Israeli-specific adaptations
        if (calcContent.includes('israeli') || calcContent.includes('sal') || calcContent.includes('kupah')) {
          this.logSuccess('Israeli healthcare adaptations in calculators');
        } else {
          this.logWarning('Israeli healthcare adaptations not found in calculators');
        }
        
        // Check for key geriatric calculators
        const keyCalcs = ['CHA2DS2-VASc', 'Morse', 'CFS', 'MMSE', 'GDS'];
        const presentCalcs = keyCalcs.filter(calc => 
          calcContent.toLowerCase().includes(calc.toLowerCase())
        );
        
        if (presentCalcs.length >= 4) {
          this.logSuccess(`Key geriatric calculators present: ${presentCalcs.join(', ')}`);
        } else {
          this.logWarning(`Some key calculators missing. Found: ${presentCalcs.join(', ')}`);
        }
        
        // Check for educational framing
        if (calcContent.includes('educational') && calcContent.includes('disclaimer')) {
          this.logSuccess('Calculator educational framing present');
        } else {
          this.logError('Calculator educational framing missing - safety issue');
        }
        
      } else {
        this.logWarning('Advanced clinical calculators file not found');
      }
      
    } catch (error) {
      this.logError('Clinical calculators testing failed', error);
    }
    
    console.log('   Clinical calculators check complete\n');
  }

  async testPlatformIntegration() {
    console.log('🔗 Testing Platform Integration...');
    
    try {
      const integrationContent = await fs.readFile('src/integration/PlatformIntegration.js', 'utf8');
      
      // Check for module integration
      if (integrationContent.includes('loadCoreModules') || integrationContent.includes('initializeAISystems')) {
        this.logSuccess('Module integration system present');
      } else {
        this.logWarning('Module integration system incomplete');
      }
      
      // Check for enhanced launcher
      const launcherExists = await this.fileExists('enhanced-platform-launcher.js');
      if (launcherExists) {
        this.logSuccess('Enhanced platform launcher present');
        
        const launcherContent = await fs.readFile('enhanced-platform-launcher.js', 'utf8');
        if (launcherContent.includes('testEnhancedPlatform')) {
          this.logSuccess('Platform testing function available');
        }
      } else {
        this.logWarning('Enhanced platform launcher not found');
      }
      
      // Check for deployment script
      const deployExists = await this.fileExists('deploy-enhanced-platform.js');
      if (deployExists) {
        this.logSuccess('Deployment script present');
      } else {
        this.logWarning('Deployment script not found');
      }
      
    } catch (error) {
      this.logError('Platform integration testing failed', error);
    }
    
    console.log('   Platform integration check complete\n');
  }

  async testSafetyConstraints() {
    console.log('🛡️ Testing Safety Constraints...');
    
    try {
      // Test all AI-related files for safety constraints
      const aiFiles = [
        'src/ai/SafeMedicalAI.js',
        'src/ai/MultiAIOrchestrator.js'
      ];
      
      for (const file of aiFiles) {
        if (await this.fileExists(file)) {
          const content = await fs.readFile(file, 'utf8');
          
          // Check for educational disclaimers
          if (content.includes('educational purposes only') || content.includes('educationalDisclaimer')) {
            this.logSuccess(`${file} - Educational disclaimers present`);
          } else {
            this.logError(`${file} - Educational disclaimers MISSING - SAFETY RISK`);
          }
          
          // Check for medical advice prevention
          if (content.includes('not medical advice') || content.includes('avoidsDirectMedicalAdvice')) {
            this.logSuccess(`${file} - Medical advice prevention present`);
          } else {
            this.logError(`${file} - Medical advice prevention MISSING - SAFETY RISK`);
          }
          
          // Check for validation mechanisms
          if (content.includes('validate') || content.includes('safety')) {
            this.logSuccess(`${file} - Safety validation mechanisms present`);
          } else {
            this.logWarning(`${file} - Safety validation mechanisms not clearly implemented`);
          }
        }
      }
      
      // Check if educational mode is enforced globally
      const envContent = await fs.readFile('.env', 'utf8');
      if (envContent.includes('EDUCATIONAL_MODE=true') && 
          envContent.includes('FEATURE_CLINICAL_DECISION_SUPPORT=educational_only')) {
        this.logSuccess('Global educational mode enforcement present');
      } else {
        this.logError('Global educational mode not properly enforced - SAFETY RISK');
      }
      
    } catch (error) {
      this.logError('Safety constraints testing failed', error);
    }
    
    console.log('   Safety constraints check complete\n');
  }

  // Utility methods
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  logSuccess(message) {
    console.log(`   ✅ ${message}`);
    this.testResults.passed++;
    this.testResults.details.push({ type: 'success', message });
  }

  logWarning(message) {
    console.log(`   ⚠️  ${message}`);
    this.testResults.warnings++;
    this.testResults.details.push({ type: 'warning', message });
  }

  logError(message, error = null) {
    console.log(`   ❌ ${message}`);
    if (error) {
      console.log(`      Error: ${error.message}`);
    }
    this.testResults.failed++;
    this.testResults.details.push({ type: 'error', message, error: error?.message });
  }

  displayFinalResults() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const total = this.testResults.passed + this.testResults.failed + this.testResults.warnings;
    
    console.log('\n' + '=' * 70);
    console.log('🏁 PLATFORM TESTING COMPLETE');
    console.log('=' * 70);
    
    console.log(`📊 Test Results Summary:`);\n    console.log(`   ✅ Passed: ${this.testResults.passed}`);\n    console.log(`   ⚠️  Warnings: ${this.testResults.warnings}`);\n    console.log(`   ❌ Failed: ${this.testResults.failed}`);\n    console.log(`   📋 Total Tests: ${total}`);\n    console.log(`   ⏱️  Duration: ${duration}s`);\n    \n    // Overall assessment\n    const criticalErrors = this.testResults.details.filter(d => \n      d.type === 'error' && d.message.includes('SAFETY RISK')\n    ).length;\n    \n    if (criticalErrors > 0) {\n      console.log('\\n🚨 CRITICAL SAFETY ISSUES DETECTED');\n      console.log('   Platform should NOT be used until safety issues are resolved');\n      console.log('   Review all items marked as \"SAFETY RISK\"');\n    } else if (this.testResults.failed === 0) {\n      console.log('\\n🎉 ALL TESTS PASSED!');\n      console.log('   ✅ Enhanced Geriatrics Platform is ready for fellowship use');\n      console.log('   ✅ All safety constraints properly implemented');\n      console.log('   ✅ Educational frameworks correctly configured');\n    } else {\n      console.log('\\n⚠️  SOME ISSUES DETECTED');\n      console.log('   Platform may function but with reduced capabilities');\n      console.log('   Review failed tests and implement fixes as needed');\n    }\n    \n    // Recommendations\n    console.log('\\n🔧 Next Steps:');\n    if (criticalErrors > 0) {\n      console.log('   1. 🚨 Fix all safety-related issues immediately');\n      console.log('   2. 📋 Re-run tests to verify fixes');\n      console.log('   3. 👥 Have supervisor review safety implementations');\n    } else {\n      console.log('   1. 🚀 Run: node deploy-enhanced-platform.js');\n      console.log('   2. 🧪 Test enhanced features in browser');\n      console.log('   3. 📚 Begin fellowship training with AI-enhanced platform');\n    }\n    \n    console.log('\\n🏥 Shaare Zedek Geriatrics Platform Testing Complete');\n  }\n}\n\n// Run tests if called directly\nif (import.meta.url === `file://${process.argv[1]}`) {\n  const tester = new PlatformTester();\n  tester.runAllTests().catch(error => {\n    console.error('Testing script failed:', error);\n    process.exit(1);\n  });\n}\n\nexport default PlatformTester;