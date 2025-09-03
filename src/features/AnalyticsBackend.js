// Analytics Backend Connection to Vercel
// Track performance, identify gaps, predict success

export const AnalyticsBackend = {
  // Vercel Analytics Endpoint
  ANALYTICS_URL: 'https://geriatrics-analytics-lf6gtky13-eias-projects.vercel.app',
  
  // Local storage keys
  STORAGE_KEYS: {
    userId: 'analytics_user_id',
    sessionId: 'analytics_session_id',
    performanceData: 'analytics_performance',
    lastSync: 'analytics_last_sync'
  },

  // Initialize analytics
  init() {
    // Generate or retrieve user ID
    if (!localStorage.getItem(this.STORAGE_KEYS.userId)) {
      const userId = this.generateUserId();
      localStorage.setItem(this.STORAGE_KEYS.userId, userId);
    }
    
    // Start new session
    this.startSession();
    
    // Sync data if online
    if (navigator.onLine) {
      this.syncData();
    }
    
    // Set up periodic sync
    setInterval(() => {
      if (navigator.onLine) {
        this.syncData();
      }
    }, 5 * 60 * 1000); // Every 5 minutes
    
    console.log('📊 Analytics Backend initialized');
  },

  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  startSession() {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(this.STORAGE_KEYS.sessionId, sessionId);
    
    this.trackEvent('session_start', {
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform
    });
    
    return sessionId;
  },

  // Track quiz performance
  trackQuizPerformance(questionId, data) {
    const performance = {
      questionId,
      category: data.category,
      difficulty: data.difficulty,
      correct: data.correct,
      timeToAnswer: data.timeToAnswer,
      confidence: data.confidence,
      timestamp: Date.now(),
      userId: localStorage.getItem(this.STORAGE_KEYS.userId),
      sessionId: localStorage.getItem(this.STORAGE_KEYS.sessionId)
    };
    
    // Store locally
    const stored = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.performanceData) || '[]');
    stored.push(performance);
    localStorage.setItem(this.STORAGE_KEYS.performanceData, JSON.stringify(stored));
    
    // Send to backend if online
    if (navigator.onLine) {
      this.sendToBackend('/api/quiz-performance', performance);
    }
    
    return performance;
  },

  // Track calculator usage
  trackCalculatorUsage(calculatorName, inputs, result) {
    const usage = {
      calculator: calculatorName,
      inputs,
      result,
      timestamp: Date.now(),
      userId: localStorage.getItem(this.STORAGE_KEYS.userId)
    };
    
    this.trackEvent('calculator_usage', usage);
  },

  // Track medication lookups
  trackMedicationLookup(drugName, context) {
    const lookup = {
      drug: drugName,
      context,
      timestamp: Date.now(),
      userId: localStorage.getItem(this.STORAGE_KEYS.userId)
    };
    
    this.trackEvent('medication_lookup', lookup);
  },

  // General event tracking
  trackEvent(eventName, eventData) {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: Date.now(),
      userId: localStorage.getItem(this.STORAGE_KEYS.userId),
      sessionId: localStorage.getItem(this.STORAGE_KEYS.sessionId)
    };
    
    // Store locally
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push(event);
    localStorage.setItem('analytics_events', JSON.stringify(events));
    
    // Send if online
    if (navigator.onLine) {
      this.sendToBackend('/api/events', event);
    }
  },

  // Send data to backend
  async sendToBackend(endpoint, data) {
    try {
      const response = await fetch(this.ANALYTICS_URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Analytics send failed:', error);
    }
  },

  // Sync all stored data
  async syncData() {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const performance = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.performanceData) || '[]');
    
    if (events.length > 0 || performance.length > 0) {
      try {
        const response = await this.sendToBackend('/api/sync', {
          events,
          performance,
          userId: localStorage.getItem(this.STORAGE_KEYS.userId)
        });
        
        if (response && response.success) {
          // Clear synced data
          localStorage.setItem('analytics_events', '[]');
          localStorage.setItem(this.STORAGE_KEYS.performanceData, '[]');
          localStorage.setItem(this.STORAGE_KEYS.lastSync, Date.now().toString());
          
          console.log('✅ Analytics synced successfully');
        }
      } catch (error) {
        console.error('Sync failed:', error);
      }
    }
  },

  // Get performance statistics
  getStatistics() {
    const performance = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.performanceData) || '[]');
    
    if (performance.length === 0) {
      return null;
    }
    
    const stats = {
      totalQuestions: performance.length,
      correctAnswers: performance.filter(p => p.correct).length,
      accuracy: 0,
      averageTime: 0,
      categoryBreakdown: {},
      difficultyBreakdown: {},
      weakAreas: [],
      strongAreas: [],
      recentTrend: []
    };
    
    // Calculate accuracy
    stats.accuracy = (stats.correctAnswers / stats.totalQuestions * 100).toFixed(1);
    
    // Calculate average time
    const times = performance.filter(p => p.timeToAnswer).map(p => p.timeToAnswer);
    stats.averageTime = times.length > 0 ? 
      (times.reduce((a, b) => a + b, 0) / times.length / 1000).toFixed(1) : 0;
    
    // Category breakdown
    const categories = {};
    performance.forEach(p => {
      if (!categories[p.category]) {
        categories[p.category] = { total: 0, correct: 0 };
      }
      categories[p.category].total++;
      if (p.correct) categories[p.category].correct++;
    });
    
    Object.entries(categories).forEach(([cat, data]) => {
      const accuracy = (data.correct / data.total * 100).toFixed(1);
      stats.categoryBreakdown[cat] = {
        total: data.total,
        correct: data.correct,
        accuracy: parseFloat(accuracy)
      };
      
      // Identify weak/strong areas
      if (data.total >= 5) {
        if (accuracy < 60) {
          stats.weakAreas.push({ category: cat, accuracy });
        } else if (accuracy >= 80) {
          stats.strongAreas.push({ category: cat, accuracy });
        }
      }
    });
    
    // Difficulty breakdown
    const difficulties = {};
    performance.forEach(p => {
      if (!difficulties[p.difficulty]) {
        difficulties[p.difficulty] = { total: 0, correct: 0 };
      }
      difficulties[p.difficulty].total++;
      if (p.correct) difficulties[p.difficulty].correct++;
    });
    
    Object.entries(difficulties).forEach(([diff, data]) => {
      stats.difficultyBreakdown[diff] = {
        total: data.total,
        correct: data.correct,
        accuracy: (data.correct / data.total * 100).toFixed(1)
      };
    });
    
    // Recent trend (last 20 questions)
    const recent = performance.slice(-20);
    const recentByDay = {};
    recent.forEach(p => {
      const day = new Date(p.timestamp).toLocaleDateString();
      if (!recentByDay[day]) {
        recentByDay[day] = { total: 0, correct: 0 };
      }
      recentByDay[day].total++;
      if (p.correct) recentByDay[day].correct++;
    });
    
    stats.recentTrend = Object.entries(recentByDay).map(([day, data]) => ({
      day,
      accuracy: (data.correct / data.total * 100).toFixed(1)
    }));
    
    return stats;
  },

  // Generate performance heat map data
  generateHeatmap() {
    const performance = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.performanceData) || '[]');
    
    // Group by date and hour
    const heatmapData = {};
    performance.forEach(p => {
      const date = new Date(p.timestamp);
      const dateKey = date.toLocaleDateString();
      const hour = date.getHours();
      
      if (!heatmapData[dateKey]) {
        heatmapData[dateKey] = {};
      }
      
      if (!heatmapData[dateKey][hour]) {
        heatmapData[dateKey][hour] = { total: 0, correct: 0 };
      }
      
      heatmapData[dateKey][hour].total++;
      if (p.correct) heatmapData[dateKey][hour].correct++;
    });
    
    // Convert to array format for visualization
    const heatmapArray = [];
    Object.entries(heatmapData).forEach(([date, hours]) => {
      Object.entries(hours).forEach(([hour, data]) => {
        heatmapArray.push({
          date,
          hour: parseInt(hour),
          accuracy: (data.correct / data.total * 100).toFixed(0),
          count: data.total
        });
      });
    });
    
    return heatmapArray;
  },

  // Predict exam readiness
  predictExamReadiness() {
    const stats = this.getStatistics();
    if (!stats || stats.totalQuestions < 50) {
      return {
        ready: false,
        confidence: 0,
        message: 'Need at least 50 practice questions for prediction'
      };
    }
    
    // Factors for prediction
    const factors = {
      accuracy: parseFloat(stats.accuracy),
      questionsCompleted: stats.totalQuestions,
      weakAreasCount: stats.weakAreas.length,
      strongAreasCount: stats.strongAreas.length,
      practiceConsistency: this.calculateConsistency(),
      difficultyProgression: this.calculateDifficultyProgression()
    };
    
    // Calculate readiness score (0-100)
    let readinessScore = 0;
    
    // Accuracy component (40%)
    if (factors.accuracy >= 80) readinessScore += 40;
    else if (factors.accuracy >= 70) readinessScore += 30;
    else if (factors.accuracy >= 60) readinessScore += 20;
    else readinessScore += 10;
    
    // Practice volume component (20%)
    if (factors.questionsCompleted >= 500) readinessScore += 20;
    else if (factors.questionsCompleted >= 300) readinessScore += 15;
    else if (factors.questionsCompleted >= 100) readinessScore += 10;
    else readinessScore += 5;
    
    // Knowledge coverage component (20%)
    const coverageScore = (factors.strongAreasCount - factors.weakAreasCount) * 2;
    readinessScore += Math.max(0, Math.min(20, coverageScore + 10));
    
    // Consistency component (10%)
    readinessScore += factors.practiceConsistency * 10;
    
    // Difficulty progression component (10%)
    readinessScore += factors.difficultyProgression * 10;
    
    return {
      ready: readinessScore >= 70,
      confidence: readinessScore,
      factors,
      recommendations: this.generateRecommendations(factors),
      predictedScore: this.predictScore(factors),
      daysToReady: this.estimateDaysToReady(readinessScore, factors)
    };
  },

  calculateConsistency() {
    const performance = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.performanceData) || '[]');
    if (performance.length < 7) return 0;
    
    // Check practice over last 7 days
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    
    const dailyPractice = {};
    performance.filter(p => p.timestamp > sevenDaysAgo).forEach(p => {
      const day = new Date(p.timestamp).toLocaleDateString();
      dailyPractice[day] = true;
    });
    
    return Object.keys(dailyPractice).length / 7;
  },

  calculateDifficultyProgression() {
    const performance = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.performanceData) || '[]');
    if (performance.length < 20) return 0.5;
    
    // Compare accuracy on hard questions: early vs recent
    const midpoint = Math.floor(performance.length / 2);
    const early = performance.slice(0, midpoint).filter(p => p.difficulty === 'Hard');
    const recent = performance.slice(midpoint).filter(p => p.difficulty === 'Hard');
    
    if (early.length === 0 || recent.length === 0) return 0.5;
    
    const earlyAccuracy = early.filter(p => p.correct).length / early.length;
    const recentAccuracy = recent.filter(p => p.correct).length / recent.length;
    
    return Math.min(1, Math.max(0, (recentAccuracy - earlyAccuracy + 0.5)));
  },

  generateRecommendations(factors) {
    const recommendations = [];
    
    if (factors.accuracy < 70) {
      recommendations.push({
        priority: 'High',
        action: 'Focus on fundamental concepts - review basic material'
      });
    }
    
    if (factors.weakAreasCount > 3) {
      recommendations.push({
        priority: 'High',
        action: `Target weak areas: ${factors.weakAreasCount} categories need improvement`
      });
    }
    
    if (factors.questionsCompleted < 300) {
      recommendations.push({
        priority: 'Medium',
        action: `Complete ${300 - factors.questionsCompleted} more practice questions`
      });
    }
    
    if (factors.practiceConsistency < 0.7) {
      recommendations.push({
        priority: 'Medium',
        action: 'Practice more consistently - aim for daily sessions'
      });
    }
    
    if (factors.difficultyProgression < 0.3) {
      recommendations.push({
        priority: 'Low',
        action: 'Challenge yourself with harder questions'
      });
    }
    
    return recommendations;
  },

  predictScore(factors) {
    // Simple linear model for score prediction
    const baseScore = 50;
    const accuracyContribution = factors.accuracy * 0.4;
    const practiceContribution = Math.min(10, factors.questionsCompleted / 50);
    const consistencyContribution = factors.practiceConsistency * 5;
    
    const predicted = baseScore + accuracyContribution + practiceContribution + consistencyContribution;
    
    return {
      predicted: Math.min(100, Math.round(predicted)),
      confidence: factors.questionsCompleted >= 100 ? 'High' : 'Low',
      range: [Math.max(0, predicted - 10), Math.min(100, predicted + 10)]
    };
  },

  estimateDaysToReady(currentScore, factors) {
    if (currentScore >= 70) return 0;
    
    const gap = 70 - currentScore;
    const dailyImprovement = factors.practiceConsistency * 2; // Assume 2% improvement per consistent day
    
    if (dailyImprovement === 0) return -1; // Cannot estimate without practice
    
    return Math.ceil(gap / dailyImprovement);
  },

  // Export analytics data
  exportData() {
    const data = {
      userId: localStorage.getItem(this.STORAGE_KEYS.userId),
      performance: JSON.parse(localStorage.getItem(this.STORAGE_KEYS.performanceData) || '[]'),
      events: JSON.parse(localStorage.getItem('analytics_events') || '[]'),
      statistics: this.getStatistics(),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    return data;
  },

  // Clear all analytics data
  clearData() {
    localStorage.removeItem(this.STORAGE_KEYS.performanceData);
    localStorage.removeItem('analytics_events');
    localStorage.removeItem(this.STORAGE_KEYS.lastSync);
    console.log('Analytics data cleared');
  }
};

export default AnalyticsBackend;