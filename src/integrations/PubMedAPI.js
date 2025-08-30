// PubMed/PMC Integration for Medical Literature Search
// Provides comprehensive access to medical research with geriatric focus

export class PubMedAPI {
  constructor() {
    this.baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
    this.cache = new Map(); // Cache results for 1 hour
    this.cacheExpiry = 60 * 60 * 1000; // 1 hour in milliseconds
  }

  /**
   * Search PubMed with geriatric-focused filters
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise<Object>} - Search results with summaries and abstracts
   */
  async search(query, filters = {}) {
    // Check cache first
    const cacheKey = `search_${query}_${JSON.stringify(filters)}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Add geriatric focus to query
      const geriatricQuery = `${query}+AND+(geriatrics[MeSH]+OR+elderly[MeSH]+OR+aged[MeSH]+OR+"older adults"[Title/Abstract])`;
      
      // Build search URL with parameters
      const searchParams = new URLSearchParams({
        db: 'pubmed',
        term: geriatricQuery,
        retmode: 'json',
        retmax: filters.maxResults || 20,
        sort: filters.sort || 'relevance',
        ...(filters.dateRange && { datetype: 'pdat', mindate: filters.dateRange.start, maxdate: filters.dateRange.end })
      });

      const searchUrl = `${this.baseUrl}esearch.fcgi?${searchParams}`;
      
      // Get search results (IDs)
      const searchResponse = await fetch(searchUrl);
      const searchResults = await searchResponse.json();
      
      if (!searchResults.esearchresult?.idlist?.length) {
        return { articles: [], count: 0, searchTerm: query };
      }

      const ids = searchResults.esearchresult.idlist;
      
      // Get article summaries
      const summaryUrl = `${this.baseUrl}esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
      const summaryResponse = await fetch(summaryUrl);
      const summaries = await summaryResponse.json();
      
      // Get abstracts
      const abstractUrl = `${this.baseUrl}efetch.fcgi?db=pubmed&id=${ids.join(',')}&retmode=abstract&rettype=text`;
      const abstractResponse = await fetch(abstractUrl);
      const abstracts = await abstractResponse.text();
      
      // Format results
      const formattedResults = this.formatResults(summaries, abstracts, ids);
      
      // Cache results
      this.setCache(cacheKey, formattedResults);
      
      return formattedResults;
    } catch (error) {
      console.error('PubMed search error:', error);
      return { 
        articles: [], 
        count: 0, 
        searchTerm: query, 
        error: error.message 
      };
    }
  }

  /**
   * Get full text from PubMed Central
   * @param {string} pmcid - PMC ID
   * @returns {Promise<string>} - Full text XML
   */
  async getFullText(pmcid) {
    const cacheKey = `fulltext_${pmcid}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}efetch.fcgi?db=pmc&id=${pmcid}&rettype=full&retmode=xml`;
      const response = await fetch(url);
      const text = await response.text();
      
      this.setCache(cacheKey, text);
      return text;
    } catch (error) {
      console.error('PMC full text fetch error:', error);
      return null;
    }
  }

  /**
   * Get related articles
   * @param {string} pmid - PubMed ID
   * @returns {Promise<Array>} - Related articles
   */
  async getRelatedArticles(pmid) {
    const cacheKey = `related_${pmid}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Get related article IDs
      const linkUrl = `${this.baseUrl}elink.fcgi?dbfrom=pubmed&db=pubmed&id=${pmid}&retmode=json`;
      const linkResponse = await fetch(linkUrl);
      const linkData = await linkResponse.json();
      
      const relatedIds = linkData.linksets?.[0]?.linksetdbs?.[0]?.links?.slice(0, 10) || [];
      
      if (relatedIds.length === 0) return [];
      
      // Get summaries for related articles
      const summaryUrl = `${this.baseUrl}esummary.fcgi?db=pubmed&id=${relatedIds.join(',')}&retmode=json`;
      const summaryResponse = await fetch(summaryUrl);
      const summaries = await summaryResponse.json();
      
      const formatted = this.formatSummaries(summaries, relatedIds);
      this.setCache(cacheKey, formatted);
      
      return formatted;
    } catch (error) {
      console.error('Related articles fetch error:', error);
      return [];
    }
  }

  /**
   * Search for clinical trials related to a condition
   * @param {string} condition - Medical condition
   * @returns {Promise<Array>} - Clinical trials
   */
  async searchClinicalTrials(condition) {
    const cacheKey = `trials_${condition}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const query = `${condition}+AND+(clinical+trial[Publication+Type]+OR+randomized+controlled+trial[Publication+Type])+AND+aged[MeSH]`;
      const results = await this.search(query, { maxResults: 10, sort: 'date' });
      
      this.setCache(cacheKey, results);
      return results;
    } catch (error) {
      console.error('Clinical trials search error:', error);
      return { articles: [], error: error.message };
    }
  }

  /**
   * Format search results
   * @private
   */
  formatResults(summaries, abstractsText, ids) {
    const articles = [];
    const abstractParts = abstractsText.split(/\n\n\d+\.\s/);
    
    ids.forEach((id, index) => {
      const summary = summaries.result?.[id];
      if (!summary) return;
      
      const article = {
        pmid: id,
        title: summary.title,
        authors: this.formatAuthors(summary.authors),
        journal: summary.source,
        pubdate: summary.pubdate,
        doi: summary.articleids?.find(aid => aid.idtype === 'doi')?.value,
        pmc: summary.articleids?.find(aid => aid.idtype === 'pmc')?.value,
        abstract: abstractParts[index + 1] || 'No abstract available',
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        // Check if full text is available
        fullTextAvailable: !!summary.articleids?.find(aid => aid.idtype === 'pmc')
      };
      
      articles.push(article);
    });
    
    return {
      articles,
      count: articles.length,
      totalFound: summaries.result?.uids?.length || 0,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Format article summaries
   * @private
   */
  formatSummaries(summaries, ids) {
    return ids.map(id => {
      const summary = summaries.result?.[id];
      if (!summary) return null;
      
      return {
        pmid: id,
        title: summary.title,
        authors: this.formatAuthors(summary.authors),
        journal: summary.source,
        pubdate: summary.pubdate,
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
      };
    }).filter(Boolean);
  }

  /**
   * Format authors list
   * @private
   */
  formatAuthors(authors) {
    if (!authors || authors.length === 0) return [];
    
    return authors.slice(0, 3).map(author => ({
      name: author.name,
      affiliation: author.affiliation
    }));
  }

  /**
   * Get article URL
   */
  getArticleUrl(pmid) {
    return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
  }

  /**
   * Cache management
   * @private
   */
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get geriatrics-specific guidelines
   */
  async getGeriatricGuidelines() {
    const guidelineQueries = [
      'AGS Beers Criteria',
      'falls prevention elderly guidelines',
      'dementia management guidelines',
      'polypharmacy elderly',
      'comprehensive geriatric assessment'
    ];
    
    const results = await Promise.all(
      guidelineQueries.map(q => this.search(q, { maxResults: 3 }))
    );
    
    return {
      beersCriteria: results[0].articles,
      fallsPrevention: results[1].articles,
      dementiaManagement: results[2].articles,
      polypharmacy: results[3].articles,
      cga: results[4].articles
    };
  }
}

export default PubMedAPI;