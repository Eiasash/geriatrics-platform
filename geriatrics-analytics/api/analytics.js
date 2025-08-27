// api/analytics.js - Deploy to Vercel
// Handles analytics sync and provides aggregated insights

const crypto = require('crypto');

// Simple in-memory store (use Redis/MongoDB in production)
const analyticsStore = new Map();

// CORS headers for your Netlify frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://geriatrics-study.netlify.app',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Main handler
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  // Apply CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

    // Route requests based on URL path
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    switch (req.method) {
        case 'POST':
            // For Vercel, pathname is just /api/analytics (not the full path)
            return handleAnalyticsSubmit(req, res);

        case 'GET':
            if (pathname === '/api/analytics/report') {
                return handleAnalyticsReport(req, res);
            }
            if (pathname === '/api/analytics/aggregate') {
                return handleAggregateStats(req, res);
            }
            break;
    }

    res.status(404).json({ error: 'Not found' });
};

// Handle analytics submission
async function handleAnalyticsSubmit(req, res) {
  try {
    const { body } = req;
    
    if (!Array.isArray(body)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    // Generate user hash (in production, use actual user ID)
    const userHash = crypto
      .createHash('sha256')
      .update(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
      .digest('hex')
      .substring(0, 8);

    // Process each analytics event
    const processed = body.map(event => ({
      ...event,
      userHash,
      serverTimestamp: new Date().toISOString(),
      processed: true
    }));

    // Store in memory (use database in production)
    if (!analyticsStore.has(userHash)) {
      analyticsStore.set(userHash, []);
    }
    
    const userEvents = analyticsStore.get(userHash);
    userEvents.push(...processed);
    
    // Keep only last 5000 events per user
    if (userEvents.length > 5000) {
      analyticsStore.set(userHash, userEvents.slice(-5000));
    }

    // Calculate real-time insights
    const insights = calculateInsights(userEvents);

    res.status(200).json({
      success: true,
      processed: processed.length,
      insights
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to process analytics' });
  }
}

// Handle quiz results sync
async function handleQuizResults(req, res) {
  try {
    const results = req.body;
    
    if (!Array.isArray(results)) {
      return res.status(400).json({ error: 'Invalid results format' });
    }

    // Process and store results
    // In production, save to database
    
    res.status(200).json({
      success: true,
      synced: results.length
    });
  } catch (error) {
    console.error('Quiz results error:', error);
    res.status(500).json({ error: 'Failed to sync results' });
  }
}

// Generate analytics report
async function handleAnalyticsReport(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userHash = url.searchParams.get('user');
    const startDate = url.searchParams.get('start');
    const endDate = url.searchParams.get('end');

    let events = [];
    
    if (userHash && analyticsStore.has(userHash)) {
      events = analyticsStore.get(userHash);
    } else {
      // Get all events
      analyticsStore.forEach(userEvents => {
        events.push(...userEvents);
      });
    }

    // Filter by date range if provided
    if (startDate || endDate) {
      events = events.filter(event => {
        const eventDate = new Date(event.timestamp);
        if (startDate && eventDate < new Date(startDate)) return false;
        if (endDate && eventDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Generate report
    const report = {
      totalEvents: events.length,
      uniqueUsers: new Set(events.map(e => e.userHash)).size,
      eventTypes: {},
      topicPerformance: {},
      commonMistakes: [],
      studyPatterns: {},
      generated: new Date().toISOString()
    };

    // Analyze event types
    events.forEach(event => {
      report.eventTypes[event.event] = (report.eventTypes[event.event] || 0) + 1;
      
      // Analyze topic performance
      if (event.data && event.data.topic) {
        if (!report.topicPerformance[event.data.topic]) {
          report.topicPerformance[event.data.topic] = {
            attempts: 0,
            correct: 0,
            incorrect: 0,
            totalTime: 0
          };
        }
        
        const topicStats = report.topicPerformance[event.data.topic];
        
        if (event.event === 'answer_submitted') {
          topicStats.attempts++;
          if (event.data.isCorrect) {
            topicStats.correct++;
          } else {
            topicStats.incorrect++;
          }
          topicStats.totalTime += event.data.timeSpent || 0;
        }
      }
    });

    // Calculate success rates
    Object.keys(report.topicPerformance).forEach(topic => {
      const stats = report.topicPerformance[topic];
      stats.successRate = stats.attempts > 0 
        ? Math.round((stats.correct / stats.attempts) * 100)
        : 0;
      stats.averageTime = stats.attempts > 0
        ? Math.round(stats.totalTime / stats.attempts / 1000)
        : 0;
    });

    // Identify common mistakes
    const mistakes = events
      .filter(e => e.event === 'answer_submitted' && !e.data.isCorrect)
      .map(e => e.data.questionId);
    
    const mistakeCount = {};
    mistakes.forEach(id => {
      mistakeCount[id] = (mistakeCount[id] || 0) + 1;
    });
    
    report.commonMistakes = Object.entries(mistakeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([questionId, count]) => ({ questionId, count }));

    // Analyze study patterns
    const hourlyActivity = new Array(24).fill(0);
    const dailyActivity = new Array(7).fill(0);
    
    events.forEach(event => {
      const date = new Date(event.timestamp);
      hourlyActivity[date.getHours()]++;
      dailyActivity[date.getDay()]++;
    });
    
    report.studyPatterns = {
      peakHour: hourlyActivity.indexOf(Math.max(...hourlyActivity)),
      peakDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        dailyActivity.indexOf(Math.max(...dailyActivity))
      ],
      hourlyActivity,
      dailyActivity
    };

    res.status(200).json(report);
  } catch (error) {
    console.error('Report error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
}

// Get aggregate statistics across all users
async function handleAggregateStats(req, res) {
  try {
    const allEvents = [];
    analyticsStore.forEach(events => allEvents.push(...events));

    const stats = {
      totalUsers: analyticsStore.size,
      totalEvents: allEvents.length,
      totalQuizzes: allEvents.filter(e => e.event === 'quiz_completed').length,
      averageScore: 0,
      topTopics: [],
      strugglingTopics: [],
      timestamp: new Date().toISOString()
    };

    // Calculate average score
    const quizResults = allEvents
      .filter(e => e.event === 'quiz_completed')
      .map(e => e.data.percentage);
    
    if (quizResults.length > 0) {
      stats.averageScore = Math.round(
        quizResults.reduce((sum, score) => sum + score, 0) / quizResults.length
      );
    }

    // Find top and struggling topics
    const topicScores = {};
    allEvents
      .filter(e => e.event === 'quiz_completed' && e.data.topic)
      .forEach(event => {
        if (!topicScores[event.data.topic]) {
          topicScores[event.data.topic] = [];
        }
        topicScores[event.data.topic].push(event.data.percentage);
      });

    const topicAverages = Object.entries(topicScores)
      .map(([topic, scores]) => ({
        topic,
        average: scores.reduce((sum, s) => sum + s, 0) / scores.length,
        attempts: scores.length
      }))
      .sort((a, b) => b.average - a.average);

    stats.topTopics = topicAverages.slice(0, 3);
    stats.strugglingTopics = topicAverages.slice(-3).reverse();

    res.status(200).json(stats);
  } catch (error) {
    console.error('Aggregate stats error:', error);
    res.status(500).json({ error: 'Failed to calculate statistics' });
  }
}

// Calculate real-time insights
function calculateInsights(events) {
  const recentEvents = events.slice(-100);
  
  const insights = {
    recentActivity: recentEvents.length,
    lastActive: recentEvents[recentEvents.length - 1]?.timestamp,
    focusArea: null,
    improvement: null
  };

  // Identify focus area
  const topicCounts = {};
  recentEvents
    .filter(e => e.data && e.data.topic)
    .forEach(event => {
      topicCounts[event.data.topic] = (topicCounts[event.data.topic] || 0) + 1;
    });
  
  const sortedTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1]);
  
  if (sortedTopics.length > 0) {
    insights.focusArea = sortedTopics[0][0];
  }

  // Calculate improvement trend
  const recentScores = recentEvents
    .filter(e => e.event === 'quiz_completed')
    .map(e => e.data.percentage);
  
  if (recentScores.length >= 2) {
    const firstHalf = recentScores.slice(0, Math.floor(recentScores.length / 2));
    const secondHalf = recentScores.slice(Math.floor(recentScores.length / 2));
    
    const avgFirst = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length;
    
    insights.improvement = Math.round(avgSecond - avgFirst);
  }

  return insights;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const http = require('http');
  const server = http.createServer(module.exports);
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`Analytics server running on port ${port}`);
  });
}