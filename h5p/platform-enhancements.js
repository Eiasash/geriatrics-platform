// platform-enhancements.js
// Combined AI-powered enhancements for geriatrics platform

// ============= SMART STUDY SYSTEM =============
class SM2Algorithm {
  calculate(quality, repetitions, easeFactor, interval) {
    if (quality >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions++;
      easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
      repetitions = 0;
      interval = 1;
    }
    
    easeFactor = Math.max(1.3, easeFactor);
    
    return { interval, repetitions, easeFactor };
  }
}

class WeaknessAnalyzer {
  analyze() {
    const performance = JSON.parse(localStorage.getItem('quiz_performance') || '{}');
    const weakAreas = { critical: [], moderate: [], minor: [] };
    
    Object.entries(performance).forEach(([topic, data]) => {
      const accuracy = data.correct / data.total;
      if (accuracy < 0.5) {
        weakAreas.critical.push(topic);
      } else if (accuracy < 0.7) {
        weakAreas.moderate.push(topic);
      } else if (accuracy < 0.85) {
        weakAreas.minor.push(topic);
      }
    });
    
    return weakAreas;
  }
}

class SmartStudySystem {
  constructor() {
    this.algorithm = new SM2Algorithm();
    this.weaknessDetector = new WeaknessAnalyzer();
    this.cards = JSON.parse(localStorage.getItem('study_cards') || '[]');
    this.reviewStartTime = null;
  }

  generatePersonalizedPlan(targetDate = '2025-09-01') {
    const daysUntilTarget = Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
    const weakAreas = this.weaknessDetector.analyze();
    
    const plan = {
      phases: [
        {
          name: 'Foundation',
          duration: Math.floor(daysUntilTarget * 0.4),
          focus: weakAreas.critical,
          dailyGoals: { newCards: 20, reviews: 50, cases: 2 }
        },
        {
          name: 'Consolidation',
          duration: Math.floor(daysUntilTarget * 0.4),
          focus: weakAreas.moderate,
          dailyGoals: { newCards: 10, reviews: 80, cases: 3 }
        },
        {
          name: 'Polish',
          duration: Math.floor(daysUntilTarget * 0.2),
          focus: 'comprehensive',
          dailyGoals: { newCards: 5, reviews: 100, cases: 5 }
        }
      ],
      milestones: this.generateMilestones(daysUntilTarget),
      predictedReadiness: this.predictReadiness(weakAreas, daysUntilTarget),
      startDate: new Date().toISOString(),
      targetDate: targetDate
    };
    
    localStorage.setItem('study_plan', JSON.stringify(plan));
    this.scheduleDailyReminders(plan);
    return plan;
  }

  generateMilestones(days) {
    const milestones = [];
    const topics = ['Frailty', 'Falls', 'Polypharmacy', 'Delirium', 'Dementia', 'End-of-life'];
    
    topics.forEach((topic, index) => {
      milestones.push({
        day: Math.floor((days / topics.length) * (index + 1)),
        topic: topic,
        target: `Master ${topic} assessment and management`
      });
    });
    
    return milestones;
  }

  predictReadiness(weakAreas, days) {
    const criticalCount = weakAreas.critical.length;
    const studyHoursNeeded = criticalCount * 20 + weakAreas.moderate.length * 10;
    const availableHours = days * 2; // Assuming 2 hours/day
    
    if (availableHours >= studyHoursNeeded * 1.5) {
      return { level: 'High', confidence: 85, message: 'On track for excellence' };
    } else if (availableHours >= studyHoursNeeded) {
      return { level: 'Good', confidence: 70, message: 'Solid preparation possible' };
    } else {
      return { level: 'Challenging', confidence: 50, message: 'Increase study time' };
    }
  }

  createSmartCard(question, answer, topic) {
    const card = {
      id: crypto.randomUUID(),
      question,
      answer,
      topic,
      created: Date.now(),
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      nextReview: Date.now(),
      lapses: 0,
      totalTime: 0
    };
    
    this.cards.push(card);
    this.saveCards();
    return card;
  }

  processReview(cardId, quality) {
    const card = this.cards.find(c => c.id === cardId);
    if (!card) return null;
    
    const timeSpent = Date.now() - this.reviewStartTime;
    
    const result = this.algorithm.calculate(
      quality,
      card.repetitions,
      card.easeFactor,
      card.interval
    );
    
    card.interval = result.interval;
    card.repetitions = result.repetitions;
    card.easeFactor = result.easeFactor;
    card.nextReview = Date.now() + (card.interval * 24 * 60 * 60 * 1000);
    card.totalTime += timeSpent;
    
    if (quality < 3) {
      card.lapses++;
    }
    
    this.saveCards();
    this.updatePerformance(card.topic, quality >= 3);
    
    return {
      nextCard: this.getNextDueCard(),
      performance: quality >= 3 ? 'Good' : 'Needs review'
    };
  }

  getNextDueCard() {
    const now = Date.now();
    return this.cards
      .filter(c => c.nextReview <= now)
      .sort((a, b) => a.nextReview - b.nextReview)[0] || null;
  }

  updatePerformance(topic, correct) {
    const performance = JSON.parse(localStorage.getItem('quiz_performance') || '{}');
    if (!performance[topic]) {
      performance[topic] = { correct: 0, total: 0 };
    }
    performance[topic].total++;
    if (correct) performance[topic].correct++;
    localStorage.setItem('quiz_performance', JSON.stringify(performance));
  }

  saveCards() {
    localStorage.setItem('study_cards', JSON.stringify(this.cards));
  }

  scheduleDailyReminders(plan) {
    // Schedule browser notifications for daily study
    if ('Notification' in window && Notification.permission === 'granted') {
      // This would ideally use a service worker for persistent reminders
      console.log('Study reminders scheduled:', plan.phases[0].dailyGoals);
    }
  }

  getDailyProgress() {
    const today = new Date().toDateString();
    const progress = JSON.parse(localStorage.getItem('daily_progress') || '{}');
    
    if (!progress[today]) {
      progress[today] = {
        newCards: 0,
        reviews: 0,
        cases: 0,
        timeSpent: 0
      };
    }
    
    return progress[today];
  }

  updateDailyProgress(type, value = 1) {
    const today = new Date().toDateString();
    const progress = JSON.parse(localStorage.getItem('daily_progress') || '{}');
    
    if (!progress[today]) {
      progress[today] = { newCards: 0, reviews: 0, cases: 0, timeSpent: 0 };
    }
    
    progress[today][type] += value;
    localStorage.setItem('daily_progress', JSON.stringify(progress));
    
    return progress[today];
  }
}

// ============= COLLABORATION HUB =============
class CollaborationHub {
  constructor() {
    this.socket = null;
    this.room = null;
    this.peers = [];
    this.offline = true; // Start in offline mode
  }

  createStudyRoom(name, password = null) {
    this.room = {
      id: crypto.randomUUID(),
      name,
      password,
      created: Date.now(),
      participants: [this.getCurrentUser()],
      shared: { cases: [], questions: [], notes: [] }
    };
    
    localStorage.setItem('study_room', JSON.stringify(this.room));
    return this.room.id;
  }

  shareCase(caseData) {
    const sanitizedCase = this.removeIdentifiers(caseData);
    const sharedCase = {
      ...sanitizedCase,
      author: this.getCurrentUser().id,
      timestamp: Date.now(),
      discussion: []
    };
    
    if (this.room) {
      this.room.shared.cases.push(sharedCase);
      localStorage.setItem('study_room', JSON.stringify(this.room));
    }
    
    return sharedCase;
  }

  removeIdentifiers(data) {
    // Remove any PHI from shared cases
    const sanitized = { ...data };
    delete sanitized.name;
    delete sanitized.mrn;
    delete sanitized.room;
    sanitized.age = Math.round(sanitized.age / 5) * 5; // Round age to nearest 5
    return sanitized;
  }

  getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('current_user') || 'null');
    if (!user) {
      user = {
        id: crypto.randomUUID(),
        name: 'Fellow',
        created: Date.now()
      };
      localStorage.setItem('current_user', JSON.stringify(user));
    }
    return user;
  }

  startQuizBattle(topic, difficulty = 'medium') {
    const questions = this.generateBattleQuestions(topic, 10, difficulty);
    const battle = {
      id: crypto.randomUUID(),
      topic,
      difficulty,
      questions,
      userScore: 0,
      aiScore: 0,
      currentQuestion: 0,
      startTime: Date.now()
    };
    
    localStorage.setItem('current_battle', JSON.stringify(battle));
    return battle;
  }

  generateBattleQuestions(topic, count, difficulty) {
    // Generate questions based on topic and difficulty
    const questions = [];
    const questionBank = this.getQuestionBank()[topic] || this.getQuestionBank()['general'];
    
    for (let i = 0; i < count && i < questionBank.length; i++) {
      questions.push(questionBank[i]);
    }
    
    return questions;
  }

  getQuestionBank() {
    return {
      frailty: [
        {
          question: 'What is the most validated frailty assessment tool?',
          options: ['CFS', 'Fried Phenotype', 'FRAIL Scale', 'All equally valid'],
          correct: 0
        }
      ],
      falls: [
        {
          question: 'Most common cause of falls in elderly?',
          options: ['Muscle weakness', 'Environmental hazards', 'Medications', 'All equally common'],
          correct: 0
        }
      ],
      general: [
        {
          question: 'Beers Criteria primarily addresses?',
          options: ['Inappropriate medications', 'Fall risk', 'Cognition', 'Nutrition'],
          correct: 0
        }
      ]
    };
  }

  createFlashcardDeck(name, cards) {
    const deck = {
      id: crypto.randomUUID(),
      name,
      cards,
      author: this.getCurrentUser().id,
      created: Date.now(),
      downloads: 0,
      rating: null,
      tags: this.extractTags(cards)
    };
    
    const decks = JSON.parse(localStorage.getItem('flashcard_decks') || '[]');
    decks.push(deck);
    localStorage.setItem('flashcard_decks', JSON.stringify(decks));
    
    return deck;
  }

  extractTags(cards) {
    const tags = new Set();
    cards.forEach(card => {
      if (card.topic) tags.add(card.topic);
      // Extract keywords from questions
      const keywords = ['frailty', 'falls', 'delirium', 'dementia', 'medications'];
      keywords.forEach(keyword => {
        if (card.question.toLowerCase().includes(keyword)) {
          tags.add(keyword);
        }
      });
    });
    return Array.from(tags);
  }
}

// ============= DEBUG MONITOR =============
class DebugMonitor {
  constructor() {
    this.metrics = {
      performance: [],
      errors: [],
      userActions: [],
      memorySnapshots: []
    };
    this.initMonitoring();
  }

  initMonitoring() {
    // Performance monitoring
    if (window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.performance.push({
              name: entry.name,
              duration: entry.duration,
              timestamp: Date.now()
            });
            
            if (entry.duration > 1000) {
              console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
            }
          }
        });
        observer.observe({ entryTypes: ['measure', 'navigation'] });
      } catch (e) {
        console.log('Performance observer not supported');
      }
    }
    
    // Error tracking
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now(),
        severity: 'error'
      });
    });
    
    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'unhandledPromise',
        reason: event.reason,
        timestamp: Date.now(),
        severity: 'warning'
      });
    });
    
    // User action tracking
    document.addEventListener('click', (e) => {
      this.trackAction('click', e.target);
    });
    
    // Memory monitoring
    if (performance.memory) {
      setInterval(() => {
        this.metrics.memorySnapshots.push({
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit,
          timestamp: Date.now()
        });
        
        // Keep only last 100 snapshots
        if (this.metrics.memorySnapshots.length > 100) {
          this.metrics.memorySnapshots.shift();
        }
      }, 60000); // Every minute
    }
  }

  logError(error) {
    this.metrics.errors.push(error);
    console.error('Error logged:', error);
    
    // Keep only last 50 errors
    if (this.metrics.errors.length > 50) {
      this.metrics.errors.shift();
    }
    
    // Save critical errors
    if (error.severity === 'critical') {
      const criticalErrors = JSON.parse(localStorage.getItem('critical_errors') || '[]');
      criticalErrors.push(error);
      localStorage.setItem('critical_errors', JSON.stringify(criticalErrors.slice(-10)));
    }
  }

  trackAction(type, target) {
    const action = {
      type,
      target: target.tagName,
      id: target.id,
      class: target.className,
      timestamp: Date.now()
    };
    
    this.metrics.userActions.push(action);
    
    // Keep only last 200 actions
    if (this.metrics.userActions.length > 200) {
      this.metrics.userActions.shift();
    }
  }

  generateHealthReport() {
    const report = {
      timestamp: Date.now(),
      metrics: {
        avgLoadTime: this.calculateAverage('performance'),
        errorRate: this.metrics.errors.length / Math.max(this.metrics.userActions.length, 1),
        errorCount: this.metrics.errors.length,
        recentErrors: this.metrics.errors.slice(-5),
        slowQueries: this.metrics.performance.filter(p => p.duration > 500).length,
        memoryUsage: performance.memory ? {
          current: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + 'MB',
          percentage: Math.round((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100) + '%'
        } : 'Not available',
        userActivity: {
          totalActions: this.metrics.userActions.length,
          lastAction: this.metrics.userActions[this.metrics.userActions.length - 1]
        }
      },
      recommendations: this.generateOptimizations(),
      status: this.getSystemStatus()
    };
    
    console.log('🏥 System Health Report:', report);
    return report;
  }

  calculateAverage(metric) {
    if (metric === 'performance' && this.metrics.performance.length > 0) {
      const total = this.metrics.performance.reduce((sum, p) => sum + p.duration, 0);
      return Math.round(total / this.metrics.performance.length) + 'ms';
    }
    return 'No data';
  }

  generateOptimizations() {
    const recommendations = [];
    
    // Check for memory issues
    if (performance.memory) {
      const usagePercent = (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100;
      if (usagePercent > 80) {
        recommendations.push('High memory usage detected - consider clearing cache');
      }
    }
    
    // Check for errors
    if (this.metrics.errors.length > 10) {
      recommendations.push('Multiple errors detected - check console for details');
    }
    
    // Check for slow operations
    const slowOps = this.metrics.performance.filter(p => p.duration > 1000);
    if (slowOps.length > 0) {
      recommendations.push(`${slowOps.length} slow operations detected - optimize performance`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('System running optimally');
    }
    
    return recommendations;
  }

  getSystemStatus() {
    const errorCount = this.metrics.errors.length;
    const criticalErrors = this.metrics.errors.filter(e => e.severity === 'critical').length;
    
    if (criticalErrors > 0) {
      return 'Critical - Immediate attention required';
    } else if (errorCount > 10) {
      return 'Warning - Multiple errors detected';
    } else if (errorCount > 5) {
      return 'Caution - Some errors present';
    } else {
      return 'Healthy - System operating normally';
    }
  }

  autoFix() {
    const fixes = {
      memoryLeaks: () => {
        // Clear old data from localStorage
        const keysToCheck = ['quiz_attempts', 'old_study_data', 'temp_data'];
        keysToCheck.forEach(key => {
          const data = localStorage.getItem(key);
          if (data && data.length > 100000) { // If over 100KB
            localStorage.removeItem(key);
            console.log(`Cleared large data: ${key}`);
          }
        });
      },
      clearCache: () => {
        // Clear old cached data
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('old-version')) {
                caches.delete(name);
                console.log(`Cleared cache: ${name}`);
              }
            });
          });
        }
      },
      resetMetrics: () => {
        // Reset metrics if they're too large
        if (this.metrics.performance.length > 1000) {
          this.metrics.performance = this.metrics.performance.slice(-100);
        }
        if (this.metrics.userActions.length > 1000) {
          this.metrics.userActions = this.metrics.userActions.slice(-100);
        }
      }
    };
    
    Object.entries(fixes).forEach(([issue, fix]) => {
      try {
        fix();
        console.log(`✅ Auto-fixed: ${issue}`);
      } catch (error) {
        console.error(`❌ Failed to fix ${issue}:`, error);
      }
    });
    
    return 'Auto-fix completed';
  }

  exportDiagnostics() {
    const diagnostics = {
      report: this.generateHealthReport(),
      errors: this.metrics.errors,
      performance: this.metrics.performance.slice(-50),
      userActions: this.metrics.userActions.slice(-50),
      localStorage: Object.keys(localStorage).map(key => ({
        key,
        size: localStorage.getItem(key).length
      })),
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(diagnostics, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `diagnostics-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('Diagnostics exported');
  }
}

// ============= INITIALIZATION =============
window.addEventListener('DOMContentLoaded', () => {
  // Initialize all enhancement systems
  window.clinicalAI = new ClinicalAI();
  window.patientTracker = new PatientTracker();
  window.smartStudy = new SmartStudySystem();
  window.collab = new CollaborationHub();
  window.debug = new DebugMonitor();
  
  // Auto-configure based on saved preferences
  const fellowshipStart = localStorage.getItem('fellowshipStart');
  if (fellowshipStart) {
    window.smartStudy.generatePersonalizedPlan(fellowshipStart);
  }
  
  // Set up keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + D for debug report
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      window.debug.generateHealthReport();
    }
    
    // Ctrl/Cmd + S for save progress
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      console.log('Progress saved');
    }
  });
  
  console.log('🚀 Enhanced Geriatrics Platform Loaded');
  console.log('📊 Run debug.generateHealthReport() for system status');
  console.log('🧠 AI Assistant ready (fallback mode if no API key)');
  console.log('📚 Smart study system initialized');
  console.log('👥 Collaboration hub ready');
  
  // Show initial setup prompt if first time
  if (!localStorage.getItem('platform_setup_complete')) {
    setTimeout(() => {
      if (confirm('Welcome to Enhanced Geriatrics Platform! Would you like to set up your fellowship timeline?')) {
        const date = prompt('Enter your fellowship start date (YYYY-MM-DD):', '2025-09-01');
        if (date) {
          localStorage.setItem('fellowshipStart', date);
          window.smartStudy.generatePersonalizedPlan(date);
          console.log('✅ Study plan generated!');
        }
      }
      localStorage.setItem('platform_setup_complete', 'true');
    }, 2000);
  }
});