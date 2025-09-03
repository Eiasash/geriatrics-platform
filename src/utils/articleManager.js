// Article Management System for Medical Literature
// Research article library with search, filter, and tracking capabilities

export class ArticleManager {
  constructor() {
    this.articles = new Map();
    this.favorites = new Set();
    this.readingProgress = new Map();
    this.tags = new Set();
    this.loadFromStorage();
  }

  // Add a new article
  addArticle(article) {
    const id = article.id || this.generateId();
    const now = new Date();
    
    const articleData = {
      id,
      title: article.title,
      authors: article.authors || [],
      journal: article.journal || '',
      year: article.year || new Date().getFullYear(),
      doi: article.doi || '',
      pmid: article.pmid || '',
      abstract: article.abstract || '',
      fullText: article.fullText || '',
      url: article.url || '',
      pdfUrl: article.pdfUrl || '',
      tags: new Set(article.tags || []),
      category: article.category || 'general',
      priority: article.priority || 'medium', // low, medium, high, critical
      readingStatus: 'unread', // unread, reading, read, archived
      addedDate: now,
      lastAccessed: null,
      readingTime: 0, // in minutes
      notes: '',
      highlights: [],
      rating: null, // 1-5 stars
      relevanceScore: article.relevanceScore || 0
    };

    // Add tags to global tag set
    articleData.tags.forEach(tag => this.tags.add(tag));
    
    this.articles.set(id, articleData);
    this.saveToStorage();
    return articleData;
  }

  // Get article by ID
  getArticle(id) {
    const article = this.articles.get(id);
    if (article) {
      // Update last accessed
      article.lastAccessed = new Date();
      this.saveToStorage();
    }
    return article;
  }

  // Search articles
  searchArticles(query, filters = {}) {
    const searchTerm = query.toLowerCase();
    let results = Array.from(this.articles.values());

    // Text search
    if (query) {
      results = results.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
        article.abstract.toLowerCase().includes(searchTerm) ||
        article.journal.toLowerCase().includes(searchTerm) ||
        Array.from(article.tags).some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply filters
    if (filters.category) {
      results = results.filter(article => article.category === filters.category);
    }
    
    if (filters.status) {
      results = results.filter(article => article.readingStatus === filters.status);
    }
    
    if (filters.priority) {
      results = results.filter(article => article.priority === filters.priority);
    }
    
    if (filters.year) {
      results = results.filter(article => article.year === parseInt(filters.year));
    }
    
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(article => 
        filters.tags.some(tag => article.tags.has(tag))
      );
    }
    
    if (filters.favorites) {
      results = results.filter(article => this.favorites.has(article.id));
    }

    // Sort results
    const sortBy = filters.sortBy || 'relevance';
    results = this.sortArticles(results, sortBy);

    return results;
  }

  // Sort articles
  sortArticles(articles, sortBy) {
    switch (sortBy) {
      case 'title':
        return articles.sort((a, b) => a.title.localeCompare(b.title));
      case 'year':
        return articles.sort((a, b) => b.year - a.year);
      case 'addedDate':
        return articles.sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime());
      case 'lastAccessed':
        return articles.sort((a, b) => {
          if (!a.lastAccessed) return 1;
          if (!b.lastAccessed) return -1;
          return b.lastAccessed.getTime() - a.lastAccessed.getTime();
        });
      case 'priority':
        const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return articles.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'rating':
        return articles.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'relevance':
      default:
        return articles.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
  }

  // Update article
  updateArticle(id, updates) {
    const article = this.articles.get(id);
    if (!article) return null;

    const updatedArticle = { ...article, ...updates };
    
    // Handle tags update
    if (updates.tags) {
      updatedArticle.tags = new Set(updates.tags);
      updates.tags.forEach(tag => this.tags.add(tag));
    }

    this.articles.set(id, updatedArticle);
    this.saveToStorage();
    return updatedArticle;
  }

  // Toggle favorite
  toggleFavorite(id) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
    this.saveToStorage();
    return this.favorites.has(id);
  }

  // Add reading progress
  addReadingProgress(articleId, progressData) {
    const progress = {
      articleId,
      timestamp: new Date(),
      percentage: progressData.percentage || 0,
      timeSpent: progressData.timeSpent || 0,
      section: progressData.section || '',
      notes: progressData.notes || ''
    };

    if (!this.readingProgress.has(articleId)) {
      this.readingProgress.set(articleId, []);
    }
    
    this.readingProgress.get(articleId).push(progress);
    
    // Update article reading time
    const article = this.articles.get(articleId);
    if (article) {
      article.readingTime += progressData.timeSpent || 0;
      if (progressData.percentage >= 100) {
        article.readingStatus = 'read';
      } else if (progressData.percentage > 0) {
        article.readingStatus = 'reading';
      }
    }

    this.saveToStorage();
    return progress;
  }

  // Add note or highlight
  addNote(articleId, note) {
    const article = this.articles.get(articleId);
    if (!article) return null;

    const noteData = {
      id: this.generateId(),
      text: note.text,
      type: note.type || 'note', // note, highlight, bookmark
      section: note.section || '',
      timestamp: new Date(),
      page: note.page || null,
      position: note.position || null
    };

    if (noteData.type === 'highlight') {
      article.highlights.push(noteData);
    } else {
      if (!article.notes) article.notes = [];
      article.notes.push(noteData);
    }

    this.saveToStorage();
    return noteData;
  }

  // Rate article
  rateArticle(id, rating) {
    const article = this.articles.get(id);
    if (!article) return null;

    article.rating = Math.max(1, Math.min(5, rating));
    this.saveToStorage();
    return article;
  }

  // Get statistics
  getStatistics() {
    const articles = Array.from(this.articles.values());
    
    return {
      totalArticles: articles.length,
      byStatus: {
        unread: articles.filter(a => a.readingStatus === 'unread').length,
        reading: articles.filter(a => a.readingStatus === 'reading').length,
        read: articles.filter(a => a.readingStatus === 'read').length,
        archived: articles.filter(a => a.readingStatus === 'archived').length
      },
      byPriority: {
        critical: articles.filter(a => a.priority === 'critical').length,
        high: articles.filter(a => a.priority === 'high').length,
        medium: articles.filter(a => a.priority === 'medium').length,
        low: articles.filter(a => a.priority === 'low').length
      },
      byCategory: this.getCategoryStats(articles),
      favorites: this.favorites.size,
      totalReadingTime: articles.reduce((sum, a) => sum + a.readingTime, 0),
      averageRating: this.getAverageRating(articles),
      recentActivity: this.getRecentActivity()
    };
  }

  getCategoryStats(articles) {
    const categories = {};
    articles.forEach(article => {
      categories[article.category] = (categories[article.category] || 0) + 1;
    });
    return categories;
  }

  getAverageRating(articles) {
    const ratedArticles = articles.filter(a => a.rating !== null);
    if (ratedArticles.length === 0) return 0;
    return ratedArticles.reduce((sum, a) => sum + a.rating, 0) / ratedArticles.length;
  }

  getRecentActivity(days = 7) {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const articles = Array.from(this.articles.values());
    
    return {
      added: articles.filter(a => a.addedDate >= cutoff).length,
      accessed: articles.filter(a => a.lastAccessed && a.lastAccessed >= cutoff).length,
      completed: articles.filter(a => a.readingStatus === 'read' && a.lastAccessed >= cutoff).length
    };
  }

  // Get recommendations
  getRecommendations() {
    const articles = Array.from(this.articles.values());
    const favorites = articles.filter(a => this.favorites.has(a.id));
    
    // Get tags from favorite articles
    const favoriteTags = new Set();
    favorites.forEach(article => {
      article.tags.forEach(tag => favoriteTags.add(tag));
    });

    // Find unread articles with similar tags
    const recommendations = articles
      .filter(article => 
        article.readingStatus === 'unread' && 
        Array.from(article.tags).some(tag => favoriteTags.has(tag))
      )
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);

    return recommendations;
  }

  // Export/Import
  exportData() {
    return {
      articles: Array.from(this.articles.entries()),
      favorites: Array.from(this.favorites),
      readingProgress: Array.from(this.readingProgress.entries()),
      tags: Array.from(this.tags),
      exportDate: new Date().toISOString()
    };
  }

  importData(data) {
    if (data.articles) {
      this.articles = new Map(data.articles);
    }
    if (data.favorites) {
      this.favorites = new Set(data.favorites);
    }
    if (data.readingProgress) {
      this.readingProgress = new Map(data.readingProgress);
    }
    if (data.tags) {
      this.tags = new Set(data.tags);
    }
    this.saveToStorage();
  }

  // Delete article
  deleteArticle(id) {
    const deleted = this.articles.delete(id);
    this.favorites.delete(id);
    this.readingProgress.delete(id);
    
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  // Utility functions
  generateId() {
    return 'article_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Persistence
  saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        const data = {
          articles: Array.from(this.articles.entries()),
          favorites: Array.from(this.favorites),
          readingProgress: Array.from(this.readingProgress.entries()),
          tags: Array.from(this.tags)
        };
        localStorage.setItem('articleManagerData', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save article data:', error);
      }
    }
  }

  loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        const data = localStorage.getItem('articleManagerData');
        if (data) {
          const parsed = JSON.parse(data);
          
          if (parsed.articles) {
            this.articles = new Map(parsed.articles.map(([id, article]) => [
              id,
              {
                ...article,
                tags: new Set(article.tags || []),
                addedDate: new Date(article.addedDate),
                lastAccessed: article.lastAccessed ? new Date(article.lastAccessed) : null
              }
            ]));
          }
          
          if (parsed.favorites) {
            this.favorites = new Set(parsed.favorites);
          }
          
          if (parsed.readingProgress) {
            this.readingProgress = new Map(parsed.readingProgress);
          }
          
          if (parsed.tags) {
            this.tags = new Set(parsed.tags);
          }
        }
      } catch (error) {
        console.error('Failed to load article data:', error);
      }
    }
  }
}

// Predefined geriatrics articles
export const sampleGeriatricsArticles = [
  {
    id: 'ger_001',
    title: 'Comprehensive Geriatric Assessment: A Meta-Analysis of Controlled Trials',
    authors: ['Ellis G', 'Whitehead MA', 'Robinson D', 'O\'Neill D', 'Langhorne P'],
    journal: 'The Lancet',
    year: 2011,
    doi: '10.1016/S0140-6736(10)62301-X',
    pmid: '21067804',
    abstract: 'Background: Comprehensive geriatric assessment is a multidisciplinary diagnostic and treatment process that identifies medical, psychosocial, and functional limitations of a frail older person in order to develop a coordinated plan to maximise overall health with ageing.',
    category: 'assessment',
    tags: ['geriatric-assessment', 'multidisciplinary', 'frailty', 'outcomes'],
    priority: 'high',
    relevanceScore: 95
  },
  {
    id: 'ger_002', 
    title: 'Delirium in Elderly Patients and the Risk of Postdischarge Mortality, Institutionalization, and Dementia',
    authors: ['Witlox J', 'Eurelings LSM', 'de Jonghe JFM', 'Kalisvaart KJ', 'Eikelenboom P', 'van Gool WA'],
    journal: 'JAMA',
    year: 2010,
    doi: '10.1001/jama.2010.1013',
    pmid: '20664044',
    abstract: 'Context: Delirium is common in hospitalized elderly patients and has been associated with poor outcomes, but the magnitude and persistence of these associations remain unclear.',
    category: 'delirium',
    tags: ['delirium', 'mortality', 'dementia', 'outcomes', 'institutionalization'],
    priority: 'high',
    relevanceScore: 90
  },
  {
    id: 'ger_003',
    title: 'Polypharmacy and Potentially Inappropriate Medication Use in Older Adults: A Cross-Sectional Study',
    authors: ['Maher RL', 'Hanlon J', 'Hajjar ER'],
    journal: 'BMC Geriatrics',
    year: 2014,
    doi: '10.1186/1471-2318-14-107',
    pmid: '25240459',
    abstract: 'Background: Polypharmacy and potentially inappropriate medications (PIMs) are common in older adults and associated with adverse outcomes.',
    category: 'polypharmacy',
    tags: ['polypharmacy', 'inappropriate-medications', 'beers-criteria', 'safety'],
    priority: 'medium',
    relevanceScore: 85
  }
];

export default ArticleManager;