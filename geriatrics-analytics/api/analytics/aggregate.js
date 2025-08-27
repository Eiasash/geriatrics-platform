// api/analytics/aggregate.js - Aggregate statistics endpoint

// Simple in-memory store (shared with main analytics)
// In production, use a database
const analyticsStore = global.analyticsStore || new Map();
global.analyticsStore = analyticsStore;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://geriatrics-study.netlify.app',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.status(200).json({});
    return;
  }

  // Apply CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Only allow GET
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

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
      .map(e => e.data?.percentage || 0);
    
    if (quizResults.length > 0) {
      stats.averageScore = Math.round(
        quizResults.reduce((sum, score) => sum + score, 0) / quizResults.length
      );
    }

    // Find top and struggling topics
    const topicScores = {};
    allEvents
      .filter(e => e.event === 'quiz_completed' && e.data?.topic)
      .forEach(event => {
        if (!topicScores[event.data.topic]) {
          topicScores[event.data.topic] = [];
        }
        topicScores[event.data.topic].push(event.data.percentage || 0);
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
};