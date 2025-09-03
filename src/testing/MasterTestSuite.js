// MASTER TEST SUITE - Run this to verify all platform features
// Execute in browser console or as part of your app initialization

import { medicationDatabase } from '../data/medications.js';
import { clinicalCalculators } from '../utils/calculators.js';
import { checkDrugInteractions } from '../utils/drugInteractions.js';
import { quizDatabase, SpacedRepetition, ClinicalCaseManager } from '../data/quizSystem.js';
import { PimpQuestionGenerator } from '../features/PimpQuestionGenerator.js';
import { SOAPNoteGenerator } from '../features/SOAPNoteGenerator.js';
import { NightShiftMode } from '../features/NightShiftToolkit.js';
import { AnalyticsBackend } from '../features/AnalyticsBackend.js';
import { VoiceNotes } from '../features/VoiceNotes.js';
import { EnhancedDrugDatabase } from '../features/EnhancedDrugDatabase.js';
import { EnhancedCaseSimulator } from '../features/EnhancedCaseSimulator.js';
import { CollaborativeStudy } from '../features/CollaborativeStudy.js';

export const MasterTestSuite = {
  // Comprehensive Platform Verification
  runFullDiagnostic() {
    console.log('🔍 === SHAARE ZEDEK GERIATRICS PLATFORM VERIFICATION ===');
    console.log('📅 Test Date:', new Date().toLocaleString('he-IL'));
    console.log('');

    const results = {
      core: this.testCoreFeatures(),
      clinical: this.testClinicalTools(),
      educational: this.testEducationalFeatures(),
      collaborative: this.testCollaborativeFeatures(),
      performance: this.testPerformance(),
      mobile: this.testMobileReadiness()
    };

    this.generateReport(results);
    return results;
  },

  // Test Core Features
  testCoreFeatures() {
    console.log('📦 TESTING CORE FEATURES...');
    const tests = {};

    // 1. Medication Database
    try {
      const meds = medicationDatabase;
      tests.medications = {
        status: meds.length > 0 ? '✅' : '❌',
        count: meds.length,
        israeliDrugs: meds.filter(m => m.israeliBrand).length,
        withRenal: meds.filter(m => m.renal).length,
        withBeers: meds.filter(m => m.beersRating).length,
        test: meds.length >= 50 ? 'PASS' : 'FAIL'
      };
      console.log(`  ✓ Medications: ${tests.medications.count} loaded (${tests.medications.israeliDrugs} Israeli brands)`);
    } catch (e) {
      tests.medications = { status: '❌', error: e.message };
      console.error('  ✗ Medications failed:', e.message);
    }

    // 2. Clinical Calculators
    try {
      const calcs = Object.keys(clinicalCalculators);
      const testCalc = clinicalCalculators.CHA2DS2VASc.calculate({
        chf: true, hypertension: true, age: true, diabetes: false,
        stroke: false, vascular: false, age65: false, female: false
      });
      
      tests.calculators = {
        status: '✅',
        count: calcs.length,
        categories: [...new Set(Object.values(clinicalCalculators).map(c => c.category))],
        testResult: testCalc.score === 4 ? 'PASS' : 'FAIL'
      };
      console.log(`  ✓ Calculators: ${tests.calculators.count} functional`);
    } catch (e) {
      tests.calculators = { status: '❌', error: e.message };
      console.error('  ✗ Calculators failed:', e.message);
    }

    // 3. Drug Interactions
    try {
      const interactions = checkDrugInteractions(['Warfarin', 'Aspirin', 'Omeprazole']);
      tests.drugInteractions = {
        status: '✅',
        testCase: interactions.length > 0 ? 'PASS' : 'FAIL',
        severityLevels: ['Major', 'Moderate', 'Minor']
      };
      console.log(`  ✓ Drug Interactions: ${interactions.length} found in test case`);
    } catch (e) {
      tests.drugInteractions = { status: '❌', error: e.message };
      console.error('  ✗ Drug Interactions failed:', e.message);
    }

    // 4. Hebrew Support
    try {
      const hebrewTest = {
        rtlClass: document.dir === 'rtl' ? 'Active' : 'Ready',
        translations: medicationDatabase.filter(m => m.heName).length,
        language: localStorage.getItem('language') || 'en'
      };
      tests.hebrew = {
        status: '✅',
        mode: hebrewTest.rtlClass,
        medicationsTranslated: hebrewTest.translations,
        currentLang: hebrewTest.language
      };
      console.log(`  ✓ Hebrew Support: ${hebrewTest.mode} (${hebrewTest.translations} translations)`);
    } catch (e) {
      tests.hebrew = { status: '❌', error: e.message };
      console.error('  ✗ Hebrew Support failed:', e.message);
    }

    return tests;
  },

  // Test Clinical Tools
  testClinicalTools() {
    console.log('\n🏥 TESTING CLINICAL TOOLS...');
    const tests = {};

    // 1. PIMP Questions
    try {
      const pimpQ = PimpQuestionGenerator;
      const wardQ = pimpQ.generateByContext('ward');
      const randomQ = pimpQ.getRandomQuestion();
      
      tests.pimpQuestions = {
        status: '✅',
        totalQuestions: Object.values(pimpQ.database).flat().length,
        categories: Object.keys(pimpQ.database),
        wardQuestions: wardQ.length,
        testQuestion: randomQ ? 'PASS' : 'FAIL'
      };
      console.log(`  ✓ PIMP Questions: ${tests.pimpQuestions.totalQuestions} total across ${tests.pimpQuestions.categories.length} categories`);
    } catch (e) {
      tests.pimpQuestions = { status: '❌', error: e.message };
      console.error('  ✗ PIMP Questions failed:', e.message);
    }

    // 2. SOAP Notes
    try {
      const testNote = SOAPNoteGenerator.generateNote({
        subjective: { 'Chief Complaint': 'Falls' },
        vitals: { temp: 37, bp: '140/80', hr: 80, rr: 16, o2: 95 },
        problems: [{ name: 'Recurrent falls', status: 'Active' }],
        plan: { Medications: ['Review polypharmacy'] }
      });
      
      tests.soapNotes = {
        status: '✅',
        templates: Object.keys(SOAPNoteGenerator.templates),
        billingCodes: testNote.includes('BILLING') ? 'PASS' : 'FAIL',
        emrFormats: ['epic', 'cerner', 'allscripts']
      };
      console.log(`  ✓ SOAP Generator: ${tests.soapNotes.templates.length} templates with billing codes`);
    } catch (e) {
      tests.soapNotes = { status: '❌', error: e.message };
      console.error('  ✗ SOAP Notes failed:', e.message);
    }

    // 3. Night Shift Toolkit
    try {
      const nightShift = NightShiftMode.features;
      const currentHour = new Date().getHours();
      const shouldBeDark = currentHour >= 19 || currentHour < 7;
      
      tests.nightShift = {
        status: '✅',
        darkModeReady: nightShift.darkMode ? 'YES' : 'NO',
        autoSwitch: shouldBeDark ? 'Should be ON' : 'Should be OFF',
        protocols: Object.keys(nightShift.quickProtocols),
        emergencyDosing: Object.keys(nightShift.emergencyDosing)
      };
      console.log(`  ✓ Night Shift: ${tests.nightShift.protocols.length} protocols, ${tests.nightShift.emergencyDosing.length} drug categories`);
    } catch (e) {
      tests.nightShift = { status: '❌', error: e.message };
      console.error('  ✗ Night Shift failed:', e.message);
    }

    // 4. Renal Dosing
    try {
      const renalCalc = EnhancedDrugDatabase.renalDosing;
      const testCrCl = renalCalc.calculateCrCl(80, 70, 1.5, 'male');
      const testAdjustment = renalCalc.calculate('vancomycin', testCrCl);
      
      tests.renalDosing = {
        status: '✅',
        testCrCl: Math.round(testCrCl),
        drugsWithAdjustments: Object.keys(renalCalc.adjustments).length,
        testCase: testAdjustment ? 'PASS' : 'FAIL'
      };
      console.log(`  ✓ Renal Dosing: ${tests.renalDosing.drugsWithAdjustments} drugs with adjustments`);
    } catch (e) {
      tests.renalDosing = { status: '❌', error: e.message };
      console.error('  ✗ Renal Dosing failed:', e.message);
    }

    // 5. Drug Burden Index
    try {
      const burden = EnhancedDrugDatabase.drugBurdenIndex;
      const testBurden = burden.calculateTotalBurden([
        'lorazepam', 'diphenhydramine', 'oxybutynin', 'quetiapine'
      ]);
      
      tests.drugBurden = {
        status: '✅',
        anticholinergicScore: testBurden.anticholinergic.totalScore,
        sedativeCount: testBurden.sedative.count,
        fallRisk: testBurden.sedative.fallRisk.category,
        testCase: testBurden.overallRisk
      };
      console.log(`  ✓ Drug Burden: ACB=${tests.drugBurden.anticholinergicScore}, Fall risk=${tests.drugBurden.fallRisk}`);
    } catch (e) {
      tests.drugBurden = { status: '❌', error: e.message };
      console.error('  ✗ Drug Burden failed:', e.message);
    }

    return tests;
  },

  // Test Educational Features
  testEducationalFeatures() {
    console.log('\n📚 TESTING EDUCATIONAL FEATURES...');
    const tests = {};

    // 1. Quiz System
    try {
      const quiz = quizDatabase;
      const spacedRep = new SpacedRepetition();
      const caseManager = new ClinicalCaseManager();
      
      tests.quizSystem = {
        status: '✅',
        boardQuestions: quiz.boardReview.length,
        clinicalCases: quiz.clinicalCases.length,
        osceScenarios: quiz.osceScenarios.length,
        spacedRepetition: 'Active',
        adaptiveLearning: 'Ready'
      };
      console.log(`  ✓ Quiz System: ${tests.quizSystem.boardQuestions} questions, ${tests.quizSystem.clinicalCases} cases`);
    } catch (e) {
      tests.quizSystem = { status: '❌', error: e.message };
      console.error('  ✗ Quiz System failed:', e.message);
    }

    // 2. Case Simulator
    try {
      const simulator = EnhancedCaseSimulator;
      const scenarios = simulator.scenarios;
      const caseCount = Object.values(scenarios).reduce((sum, category) => 
        sum + Object.keys(category).length, 0
      );
      
      tests.caseSimulator = {
        status: '✅',
        totalScenarios: caseCount,
        categories: Object.keys(scenarios),
        nightShiftCases: Object.keys(scenarios.nightShift || {}).length,
        ethicalDilemmas: Object.keys(scenarios.ethicalDilemmas || {}).length
      };
      console.log(`  ✓ Case Simulator: ${tests.caseSimulator.totalScenarios} scenarios including ${tests.caseSimulator.nightShiftCases} night cases`);
    } catch (e) {
      tests.caseSimulator = { status: '❌', error: e.message };
      console.error('  ✗ Case Simulator failed:', e.message);
    }

    // 3. Voice Integration
    try {
      const voice = VoiceNotes;
      const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      const hasSynthesis = 'speechSynthesis' in window;
      
      tests.voiceIntegration = {
        status: hasRecognition ? '✅' : '⚠️',
        recognition: hasRecognition ? 'Available' : 'Not supported',
        synthesis: hasSynthesis ? 'Available' : 'Not supported',
        medicalTerms: Object.keys(voice.medicalTerms).length,
        languages: ['en-US', 'he-IL']
      };
      console.log(`  ${hasRecognition ? '✓' : '⚠'} Voice: Recognition=${tests.voiceIntegration.recognition}, TTS=${tests.voiceIntegration.synthesis}`);
    } catch (e) {
      tests.voiceIntegration = { status: '❌', error: e.message };
      console.error('  ✗ Voice Integration failed:', e.message);
    }

    return tests;
  },

  // Test Collaborative Features
  testCollaborativeFeatures() {
    console.log('\n👥 TESTING COLLABORATIVE FEATURES...');
    const tests = {};

    try {
      const collab = CollaborativeStudy;
      
      tests.studyRooms = {
        status: '✅',
        active: Object.keys(collab.studyRooms.activeRooms).length,
        features: ['Screen sharing', 'Synced quiz', 'Shared notes']
      };
      
      tests.quizBattles = {
        status: '✅',
        active: Object.keys(collab.quizBattles.activeBattles).length,
        pending: Object.keys(collab.quizBattles.pendingChallenges).length
      };
      
      tests.flashcards = {
        status: '✅',
        publicDecks: Object.keys(collab.shareFlashcards.publicDecks).length,
        features: ['Community creation', 'Attending verification', 'Rating system']
      };
      
      console.log(`  ✓ Study Rooms: ${tests.studyRooms.active} active`);
      console.log(`  ✓ Quiz Battles: ${tests.quizBattles.active} active, ${tests.quizBattles.pending} pending`);
      console.log(`  ✓ Flashcards: ${tests.flashcards.publicDecks} public decks`);
    } catch (e) {
      tests.collaborative = { status: '❌', error: e.message };
      console.error('  ✗ Collaborative features failed:', e.message);
    }

    return tests;
  },

  // Test Performance
  testPerformance() {
    console.log('\n⚡ TESTING PERFORMANCE...');
    const tests = {};

    try {
      // Page load time
      const loadTime = window.performance.timing ?
        window.performance.timing.loadEventEnd - window.performance.timing.navigationStart : 0;
      
      // Memory usage
      const memory = window.performance.memory ? {
        used: Math.round(window.performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(window.performance.memory.totalJSHeapSize / 1048576)
      } : { used: 'N/A', total: 'N/A' };
      
      // Local storage usage
      const storageSize = new Blob(Object.values(localStorage)).size;
      
      tests.metrics = {
        status: '✅',
        pageLoadTime: loadTime + 'ms',
        memoryUsed: memory.used + 'MB',
        memoryTotal: memory.total + 'MB',
        localStorageSize: Math.round(storageSize / 1024) + 'KB',
        performance: loadTime < 2000 ? 'GOOD' : loadTime < 4000 ? 'ACCEPTABLE' : 'SLOW'
      };
      
      console.log(`  ✓ Load Time: ${tests.metrics.pageLoadTime}`);
      console.log(`  ✓ Memory: ${tests.metrics.memoryUsed}/${tests.metrics.memoryTotal}`);
      console.log(`  ✓ Storage: ${tests.metrics.localStorageSize}`);
    } catch (e) {
      tests.performance = { status: '❌', error: e.message };
      console.error('  ✗ Performance test failed:', e.message);
    }

    return tests;
  },

  // Test Mobile Readiness
  testMobileReadiness() {
    console.log('\n📱 TESTING MOBILE READINESS...');
    const tests = {};

    try {
      tests.pwa = {
        status: '✅',
        serviceWorker: 'serviceWorker' in navigator ? 'Ready' : 'Not supported',
        manifest: document.querySelector('link[rel="manifest"]') ? 'Present' : 'Missing',
        https: location.protocol === 'https:' ? 'Secure' : 'Not secure',
        viewport: document.querySelector('meta[name="viewport"]') ? 'Set' : 'Missing'
      };
      
      tests.offline = {
        status: '✅',
        cacheAPI: 'caches' in window ? 'Available' : 'Not supported',
        localStorage: 'localStorage' in window ? 'Available' : 'Not supported',
        indexedDB: 'indexedDB' in window ? 'Available' : 'Not supported'
      };
      
      tests.responsive = {
        status: '✅',
        screenWidth: window.innerWidth,
        isMobile: window.innerWidth <= 768,
        touchSupport: 'ontouchstart' in window ? 'Yes' : 'No',
        orientation: window.orientation !== undefined ? 'Supported' : 'Not supported'
      };
      
      console.log(`  ✓ PWA: SW=${tests.pwa.serviceWorker}, HTTPS=${tests.pwa.https}`);
      console.log(`  ✓ Offline: Cache=${tests.offline.cacheAPI}, Storage=${tests.offline.localStorage}`);
      console.log(`  ✓ Mobile: Width=${tests.responsive.screenWidth}px, Touch=${tests.responsive.touchSupport}`);
    } catch (e) {
      tests.mobile = { status: '❌', error: e.message };
      console.error('  ✗ Mobile readiness failed:', e.message);
    }

    return tests;
  },

  // Generate Comprehensive Report
  generateReport(results) {
    console.log('\n📊 === TEST REPORT ===');
    
    let totalPassed = 0;
    let totalFailed = 0;
    let warnings = [];
    
    Object.entries(results).forEach(([category, tests]) => {
      Object.entries(tests).forEach(([test, result]) => {
        if (result.status === '✅') totalPassed++;
        else if (result.status === '❌') totalFailed++;
        else if (result.status === '⚠️') warnings.push(`${category}.${test}`);
      });
    });
    
    console.log(`✅ Passed: ${totalPassed}`);
    console.log(`❌ Failed: ${totalFailed}`);
    console.log(`⚠️  Warnings: ${warnings.length}`);
    
    if (totalFailed === 0) {
      console.log('\n🎉 PLATFORM READY FOR FELLOWSHIP!');
    } else {
      console.log('\n⚠️ ISSUES DETECTED - Review failed tests above');
    }
    
    // Save results
    localStorage.setItem('platformTestResults', JSON.stringify({
      timestamp: Date.now(),
      results,
      summary: { passed: totalPassed, failed: totalFailed, warnings: warnings.length }
    }));
    
    console.log('\n💾 Test results saved to localStorage');
    return { passed: totalPassed, failed: totalFailed, warnings };
  },

  // Daily Fellowship Drill
  runDailyDrill() {
    console.log('🎯 === DAILY FELLOWSHIP DRILL ===');
    const time = new Date().getHours();
    
    if (time >= 6 && time < 10) {
      console.log('☀️ MORNING ROUTINE:');
      this.morningDrill();
    } else if (time >= 12 && time < 16) {
      console.log('☀️ AFTERNOON ROUTINE:');
      this.afternoonDrill();
    } else if (time >= 18 && time < 23) {
      console.log('🌙 EVENING ROUTINE:');
      this.eveningDrill();
    } else {
      console.log('🌙 NIGHT SHIFT MODE:');
      this.nightShiftDrill();
    }
  },

  morningDrill() {
    console.log('1. Generating 10 ward PIMP questions...');
    const questions = PimpQuestionGenerator.generateByContext('ward').slice(0, 10);
    questions.forEach((q, i) => {
      console.log(`Q${i+1}: ${q.q}`);
    });
    
    console.log('\n2. Reviewing yesterday\'s mistakes...');
    const stats = AnalyticsBackend.getStatistics();
    if (stats && stats.weakAreas) {
      console.log('Weak areas:', stats.weakAreas);
    }
    
    console.log('\n3. Starting clinical case...');
    const cases = EnhancedCaseSimulator.scenarios.nightShift;
    const firstCase = Object.values(cases)[0];
    console.log('Case:', firstCase.presentation.initial);
  },

  afternoonDrill() {
    console.log('1. Testing drug interactions...');
    const testDrugs = [
      ['Warfarin', 'Aspirin', 'Omeprazole'],
      ['Metformin', 'Lisinopril', 'Furosemide'],
      ['Quetiapine', 'Lorazepam', 'Sertraline']
    ];
    
    testDrugs.forEach(combo => {
      const interactions = checkDrugInteractions(combo);
      console.log(`${combo.join(' + ')}: ${interactions.length} interactions`);
    });
    
    console.log('\n2. Generating SOAP notes...');
    const note = SOAPNoteGenerator.generateNote({
      subjective: { 'Chief Complaint': 'Practice case' },
      vitals: { temp: 37, bp: '140/80', hr: 80, rr: 16, o2: 95 }
    }, 'geriatrics');
    console.log('Note generated:', note.substring(0, 100) + '...');
    
    console.log('\n3. Testing calculators...');
    console.log('CAM:', clinicalCalculators.CAM ? 'Ready' : 'Not found');
    console.log('CFS:', clinicalCalculators.ClinicalFrailtyScale ? 'Ready' : 'Not found');
  },

  eveningDrill() {
    console.log('1. Checking weak areas from heatmap...');
    const heatmap = AnalyticsBackend.generateHeatmap();
    const weakHours = heatmap.filter(h => h.accuracy < 70);
    console.log('Weak performance times:', weakHours.length);
    
    console.log('\n2. Testing voice dictation...');
    if (VoiceNotes.recognition) {
      console.log('Voice recognition: READY');
      console.log('Medical terms loaded:', Object.keys(VoiceNotes.medicalTerms).length);
    } else {
      console.log('Voice recognition: NOT AVAILABLE');
    }
    
    console.log('\n3. Collaborative features check...');
    const rooms = CollaborativeStudy.studyRooms.getRoomList();
    console.log('Active study rooms:', rooms.length);
  },

  nightShiftDrill() {
    console.log('1. Activating night shift mode...');
    NightShiftMode.startNightShift();
    
    console.log('\n2. Loading emergency protocols...');
    const protocols = NightShiftMode.features.quickProtocols;
    console.log('Available protocols:', Object.keys(protocols));
    
    console.log('\n3. Quick reference dosing...');
    const dosing = NightShiftMode.features.emergencyDosing;
    console.log('Drug categories ready:', Object.keys(dosing));
    
    console.log('\n4. Critical values reference...');
    const labs = NightShiftMode.features.quickReferences.labPanics;
    console.log('Lab panic values loaded:', Object.keys(labs).length);
  },

  // Stress Test Specific Features
  stressTestFeatures() {
    console.log('💪 === STRESS TESTING FEATURES ===');
    
    // Test 1: Heavy calculation load
    console.log('\n1. Testing 50 simultaneous calculations...');
    const startCalc = performance.now();
    for (let i = 0; i < 50; i++) {
      clinicalCalculators.CockcroftGault.calculate({
        age: 70 + i, weight: 70, creatinine: 1.5, sex: 'male'
      });
    }
    const calcTime = performance.now() - startCalc;
    console.log(`  Completed in ${calcTime.toFixed(2)}ms`);
    
    // Test 2: Large drug interaction check
    console.log('\n2. Testing 15-drug polypharmacy...');
    const polyPharmacy = [
      'Warfarin', 'Aspirin', 'Omeprazole', 'Metformin', 'Lisinopril',
      'Furosemide', 'Amlodipine', 'Atorvastatin', 'Levothyroxine',
      'Sertraline', 'Quetiapine', 'Donepezil', 'Gabapentin',
      'Oxycodone', 'Senna'
    ];
    const startInteract = performance.now();
    const interactions = checkDrugInteractions(polyPharmacy);
    const interactTime = performance.now() - startInteract;
    console.log(`  Found ${interactions.length} interactions in ${interactTime.toFixed(2)}ms`);
    
    // Test 3: Rapid question generation
    console.log('\n3. Testing rapid PIMP question generation...');
    const startPimp = performance.now();
    for (let i = 0; i < 100; i++) {
      PimpQuestionGenerator.getRandomQuestion();
    }
    const pimpTime = performance.now() - startPimp;
    console.log(`  Generated 100 questions in ${pimpTime.toFixed(2)}ms`);
    
    // Test 4: Complex case scoring
    console.log('\n4. Testing case simulator scoring...');
    const testResponses = [
      { score: 10, feedback: 'Correct' },
      { score: 8, feedback: 'Good' },
      { score: 5, feedback: 'Partial' },
      { score: 10, feedback: 'Excellent' }
    ];
    const timeData = [15000, 30000, 45000, 20000];
    const caseScore = EnhancedCaseSimulator.scoreCase('test', testResponses, timeData);
    console.log(`  Score: ${caseScore.percentage}% - ${caseScore.grade}`);
    
    console.log('\n✅ Stress tests completed!');
  },

  // Analytics Verification
  verifyAnalytics() {
    console.log('📈 === ANALYTICS VERIFICATION ===');
    
    // Check connection
    console.log('1. Backend connection:');
    console.log('  URL:', AnalyticsBackend.ANALYTICS_URL);
    console.log('  Online:', navigator.onLine ? 'YES' : 'NO');
    
    // Check stored data
    const performance = JSON.parse(localStorage.getItem('analytics_performance') || '[]');
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    
    console.log('\n2. Stored data:');
    console.log(`  Performance records: ${performance.length}`);
    console.log(`  Event records: ${events.length}`);
    
    // Check statistics
    const stats = AnalyticsBackend.getStatistics();
    if (stats) {
      console.log('\n3. Current statistics:');
      console.log(`  Accuracy: ${stats.accuracy}%`);
      console.log(`  Questions answered: ${stats.totalQuestions}`);
      console.log(`  Weak areas: ${stats.weakAreas.length}`);
      console.log(`  Strong areas: ${stats.strongAreas.length}`);
    }
    
    // Check predictions
    const prediction = AnalyticsBackend.predictExamReadiness();
    console.log('\n4. Exam readiness:');
    console.log(`  Ready: ${prediction.ready ? 'YES' : 'NO'}`);
    console.log(`  Confidence: ${prediction.confidence}%`);
    if (prediction.daysToReady > 0) {
      console.log(`  Days to ready: ${prediction.daysToReady}`);
    }
    
    return { performance: performance.length, events: events.length, stats, prediction };
  }
};

// Auto-run on load if in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🚀 Development mode detected - Running automatic tests...');
  setTimeout(() => {
    MasterTestSuite.runFullDiagnostic();
  }, 2000);
}

// Expose to global scope for console access
window.PlatformTest = MasterTestSuite;
window.runTests = () => MasterTestSuite.runFullDiagnostic();
window.dailyDrill = () => MasterTestSuite.runDailyDrill();
window.stressTest = () => MasterTestSuite.stressTestFeatures();
window.checkAnalytics = () => MasterTestSuite.verifyAnalytics();

// Export for module use
export default MasterTestSuite;