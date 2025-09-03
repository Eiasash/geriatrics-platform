// Spaced Repetition Learning System
// SM-2 Algorithm implementation for optimal learning intervals

export class SpacedRepetitionSystem {
  constructor() {
    this.cards = new Map();
    this.settings = {
      newCardInterval: 1, // days
      maxInterval: 365, // 1 year max
      minEaseFactor: 1.3,
      defaultEaseFactor: 2.5
    };
    this.loadFromStorage();
  }

  // SM-2 Algorithm core functions
  calculateNextInterval(card, performance) {
    // performance: 0 (total blackout) to 5 (perfect response)
    let { repetitions, easeFactor, interval } = card;

    if (performance < 3) {
      // Failed - reset repetitions
      repetitions = 0;
      interval = 1;
    } else {
      // Passed - update using SM-2
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    }

    // Update ease factor based on performance
    easeFactor = easeFactor + (0.1 - (5 - performance) * (0.08 + (5 - performance) * 0.02));
    easeFactor = Math.max(this.settings.minEaseFactor, easeFactor);
    
    // Cap the interval
    interval = Math.min(interval, this.settings.maxInterval);

    return {
      repetitions,
      easeFactor,
      interval,
      nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000)
    };
  }

  // Add or update a flashcard
  addCard(id, front, back, category = 'general', difficulty = 'medium') {
    const now = new Date();
    const card = {
      id,
      front,
      back,
      category,
      difficulty,
      repetitions: 0,
      easeFactor: this.settings.defaultEaseFactor,
      interval: this.settings.newCardInterval,
      nextReview: now,
      created: now,
      lastReviewed: null,
      totalReviews: 0,
      correctStreak: 0,
      lastPerformance: null,
      averagePerformance: 0,
      timeSpent: 0
    };

    this.cards.set(id, card);
    this.saveToStorage();
    return card;
  }

  // Get cards due for review
  getDueCards(limit = 20) {
    const now = new Date();
    const dueCards = Array.from(this.cards.values())
      .filter(card => card.nextReview <= now)
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
      .slice(0, limit);

    return dueCards;
  }

  // Get new cards to learn
  getNewCards(limit = 10) {
    return Array.from(this.cards.values())
      .filter(card => card.totalReviews === 0)
      .sort((a, b) => a.created.getTime() - b.created.getTime())
      .slice(0, limit);
  }

  // Review a card
  reviewCard(cardId, performance, timeSpent = 0) {
    const card = this.cards.get(cardId);
    if (!card) return null;

    const now = new Date();
    const updatedCard = {
      ...card,
      ...this.calculateNextInterval(card, performance),
      lastReviewed: now,
      totalReviews: card.totalReviews + 1,
      lastPerformance: performance,
      averagePerformance: (card.averagePerformance * card.totalReviews + performance) / (card.totalReviews + 1),
      timeSpent: card.timeSpent + timeSpent
    };

    // Update streak
    if (performance >= 3) {
      updatedCard.correctStreak = card.correctStreak + 1;
    } else {
      updatedCard.correctStreak = 0;
    }

    this.cards.set(cardId, updatedCard);
    this.saveToStorage();

    return updatedCard;
  }

  // Get learning statistics
  getStats() {
    const cards = Array.from(this.cards.values());
    const now = new Date();

    const stats = {
      totalCards: cards.length,
      newCards: cards.filter(c => c.totalReviews === 0).length,
      learningCards: cards.filter(c => c.totalReviews > 0 && c.totalReviews < 3).length,
      reviewCards: cards.filter(c => c.totalReviews >= 3).length,
      dueCards: cards.filter(c => c.nextReview <= now).length,
      overdueCards: cards.filter(c => c.nextReview < new Date(now.getTime() - 24 * 60 * 60 * 1000)).length,
      masteredCards: cards.filter(c => c.correctStreak >= 5).length,
      averageEaseFactor: cards.length > 0 ? cards.reduce((sum, c) => sum + c.easeFactor, 0) / cards.length : 0,
      totalReviews: cards.reduce((sum, c) => sum + c.totalReviews, 0),
      totalTimeSpent: cards.reduce((sum, c) => sum + c.timeSpent, 0),
      categories: this.getCategoryStats(cards),
      retention: this.getRetentionStats(cards)
    };

    return stats;
  }

  getCategoryStats(cards) {
    const categories = {};
    cards.forEach(card => {
      if (!categories[card.category]) {
        categories[card.category] = {
          total: 0,
          due: 0,
          mastered: 0,
          averagePerformance: 0
        };
      }
      categories[card.category].total++;
      if (card.nextReview <= new Date()) categories[card.category].due++;
      if (card.correctStreak >= 5) categories[card.category].mastered++;
      categories[card.category].averagePerformance += card.averagePerformance;
    });

    // Calculate averages
    Object.keys(categories).forEach(cat => {
      categories[cat].averagePerformance /= categories[cat].total;
    });

    return categories;
  }

  getRetentionStats(cards) {
    const reviewedCards = cards.filter(c => c.totalReviews > 0);
    if (reviewedCards.length === 0) return { overall: 0, byDifficulty: {} };

    const overall = reviewedCards.reduce((sum, c) => sum + c.averagePerformance, 0) / reviewedCards.length;
    
    const byDifficulty = {};
    ['easy', 'medium', 'hard'].forEach(difficulty => {
      const diffCards = reviewedCards.filter(c => c.difficulty === difficulty);
      if (diffCards.length > 0) {
        byDifficulty[difficulty] = diffCards.reduce((sum, c) => sum + c.averagePerformance, 0) / diffCards.length;
      }
    });

    return { overall, byDifficulty };
  }

  // Get weak areas that need more focus
  getWeakAreas() {
    const cards = Array.from(this.cards.values());
    const categories = this.getCategoryStats(cards);
    
    return Object.entries(categories)
      .filter(([_, stats]) => stats.averagePerformance < 3.5)
      .sort((a, b) => a[1].averagePerformance - b[1].averagePerformance)
      .map(([category, stats]) => ({
        category,
        averagePerformance: stats.averagePerformance,
        cardsCount: stats.total,
        recommendation: this.getRecommendation(stats.averagePerformance)
      }));
  }

  getRecommendation(performance) {
    if (performance < 2.5) return "High priority - schedule daily review";
    if (performance < 3.5) return "Medium priority - review every 2-3 days";
    return "Good progress - continue current schedule";
  }

  // Search cards
  searchCards(query) {
    const searchTerm = query.toLowerCase();
    return Array.from(this.cards.values()).filter(card =>
      card.front.toLowerCase().includes(searchTerm) ||
      card.back.toLowerCase().includes(searchTerm) ||
      card.category.toLowerCase().includes(searchTerm)
    );
  }

  // Delete a card
  deleteCard(cardId) {
    const deleted = this.cards.delete(cardId);
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  // Reset card progress
  resetCard(cardId) {
    const card = this.cards.get(cardId);
    if (!card) return null;

    const resetCard = {
      ...card,
      repetitions: 0,
      easeFactor: this.settings.defaultEaseFactor,
      interval: this.settings.newCardInterval,
      nextReview: new Date(),
      lastReviewed: null,
      totalReviews: 0,
      correctStreak: 0,
      lastPerformance: null,
      averagePerformance: 0
    };

    this.cards.set(cardId, resetCard);
    this.saveToStorage();
    return resetCard;
  }

  // Export/Import functions
  exportData() {
    return {
      cards: Array.from(this.cards.entries()),
      settings: this.settings,
      exportDate: new Date().toISOString()
    };
  }

  importData(data) {
    if (data.cards) {
      this.cards = new Map(data.cards);
    }
    if (data.settings) {
      this.settings = { ...this.settings, ...data.settings };
    }
    this.saveToStorage();
  }

  // Persistence
  saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        const data = {
          cards: Array.from(this.cards.entries()),
          settings: this.settings
        };
        localStorage.setItem('spacedRepetitionData', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save spaced repetition data:', error);
      }
    }
  }

  loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        const data = localStorage.getItem('spacedRepetitionData');
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed.cards) {
            this.cards = new Map(parsed.cards.map(([id, card]) => [
              id, 
              {
                ...card,
                created: new Date(card.created),
                nextReview: new Date(card.nextReview),
                lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : null
              }
            ]));
          }
          if (parsed.settings) {
            this.settings = { ...this.settings, ...parsed.settings };
          }
        }
      } catch (error) {
        console.error('Failed to load spaced repetition data:', error);
      }
    }
  }
}

// Predefined flashcard sets for geriatrics
export const geriatricsCardSets = {
  delirium: [
    {
      id: 'del_001',
      front: 'What are the 4 features of CAM (Confusion Assessment Method)?',
      back: '1. Acute onset or fluctuating course\n2. Inattention\n3. Disorganized thinking\n4. Altered level of consciousness\n\nDelirium = (1 AND 2) AND (3 OR 4)',
      category: 'delirium',
      difficulty: 'medium'
    },
    {
      id: 'del_002',
      front: 'What medications should be avoided in delirium?',
      back: '• Benzodiazepines (except alcohol withdrawal)\n• Anticholinergics (diphenhydramine, etc.)\n• Meperidine\n• High-dose opioids\n• Multiple psychoactive medications',
      category: 'delirium',
      difficulty: 'easy'
    },
    {
      id: 'del_003',
      front: 'First-line medication for severe delirium with agitation?',
      back: 'Haloperidol 0.25-0.5mg PO/IV q6h PRN\n\nAlternatives:\n• Risperidone 0.25mg PO BID\n• Quetiapine 12.5-25mg BID\n\nAlways try non-pharmacological interventions first!',
      category: 'delirium',
      difficulty: 'medium'
    }
  ],

  falls: [
    {
      id: 'fall_001',
      front: 'Morse Fall Scale score interpretation',
      back: '• 0-24: Low risk\n• 25-44: Moderate risk\n• ≥45: High risk\n\nHigh risk requires immediate fall prevention interventions',
      category: 'falls',
      difficulty: 'easy'
    },
    {
      id: 'fall_002',
      front: 'Post-fall assessment priorities (first 4 steps)',
      back: '1. Assess for injury (head, hip, spine)\n2. Vital signs including orthostatics\n3. Medication review (especially last 2 weeks)\n4. Morse Fall Scale assessment',
      category: 'falls',
      difficulty: 'medium'
    }
  ],

  medications: [
    {
      id: 'med_001',
      front: 'Beers Criteria: Which benzodiazepines to avoid in elderly?',
      back: 'ALL benzodiazepines should be avoided due to:\n• Increased fall risk\n• Cognitive impairment\n• Sedation\n• Potential for dependence\n\nException: Alcohol withdrawal only',
      category: 'medications',
      difficulty: 'medium'
    },
    {
      id: 'med_002',
      front: 'STOPP criteria: When to stop PPIs?',
      back: 'Stop PPIs if:\n• >8 weeks for peptic ulcer disease\n• Full-dose >1 year without indication\n• For stress ulcer prophylaxis in non-ICU patients\n• With clopidogrel (reduces efficacy)',
      category: 'medications',
      difficulty: 'hard'
    }
  ],

  cardiovascular: [
    {
      id: 'cv_001',
      front: 'CHA₂DS₂-VASc score components',
      back: 'C - CHF (1)\nH - Hypertension (1)\nA₂ - Age ≥75 (2)\nD - Diabetes (1)\nS₂ - Stroke/TIA (2)\nV - Vascular disease (1)\nA - Age 65-74 (1)\nSc - Sex (female) (1)\n\nTotal: 0-9 points',
      category: 'cardiovascular',
      difficulty: 'hard'
    },
    {
      id: 'cv_002',
      front: 'When to anticoagulate based on CHA₂DS₂-VASc?',
      back: '• Score 0: No anticoagulation\n• Score 1: Consider anticoagulation\n• Score ≥2: Anticoagulation recommended\n\nAlways assess bleeding risk with HAS-BLED',
      category: 'cardiovascular',
      difficulty: 'medium'
    }
  ]
};

// Initialize cards from predefined sets
export const initializeGeriatricsCards = (srs) => {
  Object.values(geriatricsCardSets).forEach(cardSet => {
    cardSet.forEach(card => {
      srs.addCard(card.id, card.front, card.back, card.category, card.difficulty);
    });
  });
  console.log('✅ Initialized geriatrics flashcard sets');
};

export default SpacedRepetitionSystem;