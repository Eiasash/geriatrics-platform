// PubMed Research Integration System
// Provides access to NCBI PubMed database for medical literature research

export class PubMedIntegration {
  constructor() {
    this.baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
    this.apiKey = null; // Users can add their own API key for higher limits
    this.searchHistory = this.loadSearchHistory();
    this.savedArticles = this.loadSavedArticles();
    this.citations = this.loadCitations();
  }

  // Search PubMed with advanced filters
  async searchArticles(query, options = {}) {
    const {
      maxResults = 20,
      dateRange = 'all',
      articleTypes = [],
      languages = ['eng'],
      subjects = ['aged', 'geriatrics'],
      fullTextOnly = false,
      sort = 'relevance'
    } = options;

    // Build search query with MeSH terms
    let searchQuery = this.buildSearchQuery(query, subjects, articleTypes, languages);
    
    try {
      // Step 1: Search for article IDs
      const searchUrl = `${this.baseUrl}esearch.fcgi`;
      const searchParams = new URLSearchParams({
        db: 'pubmed',
        term: searchQuery,
        retmax: maxResults,
        retmode: 'json',
        sort: sort,
        ...(this.apiKey && { api_key: this.apiKey })
      });

      const searchResponse = await fetch(`${searchUrl}?${searchParams}`);
      const searchData = await searchResponse.json();
      
      if (!searchData.esearchresult?.idlist?.length) {
        return { articles: [], totalCount: 0, query: searchQuery };
      }

      // Step 2: Fetch detailed article information
      const articles = await this.fetchArticleDetails(searchData.esearchresult.idlist);
      
      // Save search to history
      this.saveSearchToHistory(query, searchQuery, articles.length);
      
      return {
        articles,
        totalCount: parseInt(searchData.esearchresult.count),
        query: searchQuery,
        searchId: searchData.esearchresult.webenv
      };
    } catch (error) {
      console.error('PubMed search error:', error);
      return { 
        articles: [], 
        totalCount: 0, 
        error: 'Failed to search PubMed. Please try again.' 
      };
    }
  }

  buildSearchQuery(query, subjects, articleTypes, languages) {
    let searchTerms = [query];
    
    // Add geriatrics/aging MeSH terms
    if (subjects.includes('geriatrics')) {
      searchTerms.push('("geriatrics"[MeSH Terms] OR "aged"[MeSH Terms] OR "aging"[MeSH Terms] OR "frail elderly"[MeSH Terms])');
    }
    
    // Add article type filters
    if (articleTypes.length > 0) {
      const typeFilters = articleTypes.map(type => `"${type}"[Publication Type]`);
      searchTerms.push(`(${typeFilters.join(' OR ')})`);
    }
    
    // Add language filters
    if (languages.length > 0 && !languages.includes('all')) {
      const langFilters = languages.map(lang => `"${lang}"[Language]`);
      searchTerms.push(`(${langFilters.join(' OR ')})`);
    }
    
    return searchTerms.join(' AND ');
  }

  async fetchArticleDetails(idList) {
    try {
      const summaryUrl = `${this.baseUrl}esummary.fcgi`;
      const summaryParams = new URLSearchParams({
        db: 'pubmed',
        id: idList.join(','),
        retmode: 'json',
        ...(this.apiKey && { api_key: this.apiKey })
      });

      const summaryResponse = await fetch(`${summaryUrl}?${summaryParams}`);
      const summaryData = await summaryResponse.json();
      
      const articles = [];
      
      for (const id of idList) {
        const articleData = summaryData.result[id];
        if (!articleData || articleData.error) continue;
        
        const article = this.parseArticleData(articleData);
        articles.push(article);
      }
      
      return articles;
    } catch (error) {
      console.error('Error fetching article details:', error);
      return [];
    }
  }

  parseArticleData(data) {
    const authors = data.authors?.map(author => ({
      name: author.name,
      authtype: author.authtype
    })) || [];
    
    return {
      pmid: data.uid,
      title: data.title || 'No title available',
      authors: authors.slice(0, 6), // Limit to first 6 authors
      authorCount: authors.length,
      journal: data.fulljournalname || data.source || 'Unknown journal',
      journalAbbrev: data.source,
      pubdate: data.pubdate,
      pubYear: data.pubdate ? parseInt(data.pubdate.split(' ')[0]) : null,
      volume: data.volume,
      issue: data.issue,
      pages: data.pages,
      doi: data.articleids?.find(id => id.idtype === 'doi')?.value,
      pmc: data.articleids?.find(id => id.idtype === 'pmc')?.value,
      abstract: null, // Will be fetched separately if needed
      keywords: data.keywords || [],
      meshTerms: data.meshheadings || [],
      publicationType: data.pubtype || [],
      isOpenAccess: data.pmc ? true : false,
      citationCount: null, // Would need separate API call
      savedAt: null,
      notes: '',
      tags: []
    };
  }

  // Fetch abstract for a specific article
  async fetchAbstract(pmid) {
    try {
      const abstractUrl = `${this.baseUrl}efetch.fcgi`;
      const abstractParams = new URLSearchParams({
        db: 'pubmed',
        id: pmid,
        rettype: 'abstract',
        retmode: 'text',
        ...(this.apiKey && { api_key: this.apiKey })
      });

      const response = await fetch(`${abstractUrl}?${abstractParams}`);
      const abstractText = await response.text();
      
      // Parse abstract from the response
      const abstractMatch = abstractText.match(/\n\n(.+?)(?:\n\n|\nDOI:|\nPMID:)/s);
      return abstractMatch ? abstractMatch[1].trim() : 'Abstract not available';
    } catch (error) {
      console.error('Error fetching abstract:', error);
      return 'Failed to fetch abstract';
    }
  }

  // Save article to personal library
  saveArticle(article, tags = [], notes = '') {
    const savedArticle = {
      ...article,
      savedAt: new Date().toISOString(),
      tags,
      notes
    };
    
    this.savedArticles.set(article.pmid, savedArticle);
    this.saveSavedArticles();
    return savedArticle;
  }

  // Remove article from personal library
  removeArticle(pmid) {
    const removed = this.savedArticles.delete(pmid);
    if (removed) {
      this.saveSavedArticles();
    }
    return removed;
  }

  // Get saved articles with filtering
  getSavedArticles(filters = {}) {
    const articles = Array.from(this.savedArticles.values());
    
    if (filters.tag) {
      return articles.filter(article => 
        article.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase()))
      );
    }
    
    if (filters.journal) {
      return articles.filter(article => 
        article.journal.toLowerCase().includes(filters.journal.toLowerCase())
      );
    }
    
    if (filters.year) {
      return articles.filter(article => article.pubYear === filters.year);
    }
    
    return articles.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  }

  // Create citation in various formats
  generateCitation(article, format = 'ama') {
    const authors = article.authors.slice(0, 6);
    const authorNames = authors.map(author => author.name).join(', ');
    const etAl = article.authorCount > 6 ? ', et al' : '';
    
    switch (format) {
      case 'ama':
        return `${authorNames}${etAl}. ${article.title}. ${article.journal}. ${article.pubYear};${article.volume}${article.issue ? `(${article.issue})` : ''}${article.pages ? `:${article.pages}` : ''}. ${article.doi ? `doi:${article.doi}` : `PMID: ${article.pmid}`}`;
      
      case 'vancouver':
        return `${authorNames}${etAl}. ${article.title} ${article.journal}. ${article.pubYear}${article.volume ? `;${article.volume}` : ''}${article.issue ? `(${article.issue})` : ''}${article.pages ? `:${article.pages}` : ''}. ${article.doi ? `Available from: https://doi.org/${article.doi}` : `PMID: ${article.pmid}`}`;
      
      case 'apa':
        const apaAuthors = authors.map(author => {
          const parts = author.name.split(' ');
          return `${parts[parts.length - 1]}, ${parts.slice(0, -1).map(p => p[0]).join('. ')}.`;
        }).join(' ');
        return `${apaAuthors}${etAl} (${article.pubYear}). ${article.title} ${article.journal}, ${article.volume}${article.issue ? `(${article.issue})` : ''}${article.pages ? `, ${article.pages}` : ''}. ${article.doi ? `https://doi.org/${article.doi}` : `PMID: ${article.pmid}`}`;
      
      default:
        return this.generateCitation(article, 'ama');
    }
  }

  // Export saved articles in various formats
  exportArticles(articles, format = 'bibtex') {
    switch (format) {
      case 'bibtex':
        return articles.map(article => this.generateBibTeX(article)).join('\n\n');
      case 'ris':
        return articles.map(article => this.generateRIS(article)).join('\n\n');
      case 'csv':
        return this.generateCSV(articles);
      default:
        return articles.map(article => this.generateCitation(article, 'ama')).join('\n\n');
    }
  }

  generateBibTeX(article) {
    const authors = article.authors.map(author => author.name).join(' and ');
    return `@article{${article.pmid},
  title={${article.title}},
  author={${authors}},
  journal={${article.journal}},
  year={${article.pubYear}},
  volume={${article.volume || ''}},
  number={${article.issue || ''}},
  pages={${article.pages || ''}},
  ${article.doi ? `doi={${article.doi}},` : ''}
  pmid={${article.pmid}}
}`;
  }

  // Search suggestions based on geriatrics topics
  getSearchSuggestions(partialQuery) {
    const geriatricTopics = [
      'dementia alzheimer disease',
      'falls elderly prevention',
      'polypharmacy aged',
      'delirium hospitalized elderly',
      'frailty syndrome',
      'sarcopenia muscle mass',
      'osteoporosis fracture elderly',
      'hypertension aged management',
      'diabetes elderly complications',
      'depression late life',
      'urinary incontinence aged',
      'pressure ulcer prevention',
      'medication adherence elderly',
      'cognitive impairment mild',
      'elder abuse neglect',
      'palliative care geriatrics',
      'advance directives',
      'geriatric assessment comprehensive',
      'nursing home quality',
      'caregiver burden stress'
    ];
    
    return geriatricTopics
      .filter(topic => topic.toLowerCase().includes(partialQuery.toLowerCase()))
      .slice(0, 5);
  }

  // Load/save data from localStorage
  loadSearchHistory() {
    try {
      const history = localStorage.getItem('pubmedSearchHistory');
      return history ? new Map(JSON.parse(history)) : new Map();
    } catch {
      return new Map();
    }
  }

  saveSearchToHistory(originalQuery, builtQuery, resultCount) {
    const searchEntry = {
      originalQuery,
      builtQuery,
      resultCount,
      timestamp: new Date().toISOString()
    };
    
    this.searchHistory.set(Date.now().toString(), searchEntry);
    
    // Keep only last 50 searches
    if (this.searchHistory.size > 50) {
      const entries = Array.from(this.searchHistory.entries());
      entries.sort((a, b) => new Date(b[1].timestamp) - new Date(a[1].timestamp));
      this.searchHistory.clear();
      entries.slice(0, 50).forEach(([key, value]) => {
        this.searchHistory.set(key, value);
      });
    }
    
    localStorage.setItem('pubmedSearchHistory', JSON.stringify([...this.searchHistory]));
  }

  loadSavedArticles() {
    try {
      const articles = localStorage.getItem('pubmedSavedArticles');
      return articles ? new Map(JSON.parse(articles)) : new Map();
    } catch {
      return new Map();
    }
  }

  saveSavedArticles() {
    localStorage.setItem('pubmedSavedArticles', JSON.stringify([...this.savedArticles]));
  }

  loadCitations() {
    try {
      const citations = localStorage.getItem('pubmedCitations');
      return citations ? new Map(JSON.parse(citations)) : new Map();
    } catch {
      return new Map();
    }
  }

  // Get recent searches
  getRecentSearches(limit = 10) {
    const searches = Array.from(this.searchHistory.values());
    return searches
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  // Clear search history
  clearSearchHistory() {
    this.searchHistory.clear();
    localStorage.removeItem('pubmedSearchHistory');
  }

  // Get article URL
  getArticleUrl(pmid) {
    return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
  }

  // Get PMC URL if available
  getPMCUrl(pmc) {
    return pmc ? `https://www.ncbi.nlm.nih.gov/pmc/articles/${pmc}/` : null;
  }
}

export default PubMedIntegration;