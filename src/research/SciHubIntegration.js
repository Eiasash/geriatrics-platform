// SciHub Integration for Accessing Paywalled Research Articles
// Provides alternative access to scientific literature for educational purposes

export class SciHubIntegration {
  constructor() {
    this.scihubDomains = [
      'sci-hub.se',
      'sci-hub.st',
      'sci-hub.ru',
      'sci-hub.hkvisa.net'
    ];
    this.currentDomainIndex = 0;
  }

  /**
   * Get current working SciHub domain
   */
  getCurrentDomain() {
    return this.scihubDomains[this.currentDomainIndex];
  }

  /**
   * Rotate to next domain if current one fails
   */
  rotateDomain() {
    this.currentDomainIndex = (this.currentDomainIndex + 1) % this.scihubDomains.length;
    return this.getCurrentDomain();
  }

  /**
   * Generate SciHub URL for a given DOI or PMID
   * @param {string} identifier - DOI, PMID, or article URL
   * @returns {string} - SciHub URL
   */
  generateSciHubUrl(identifier) {
    const domain = this.getCurrentDomain();
    
    // Clean identifier
    const cleanId = identifier.trim();
    
    // Handle different identifier types
    if (cleanId.startsWith('10.')) {
      // DOI
      return `https://${domain}/${cleanId}`;
    } else if (/^\d+$/.test(cleanId)) {
      // PMID (numeric only)
      return `https://${domain}/${cleanId}`;
    } else if (cleanId.includes('pubmed.ncbi.nlm.nih.gov')) {
      // PubMed URL - extract PMID
      const pmidMatch = cleanId.match(/\/(\d+)\/?$/);
      if (pmidMatch) {
        return `https://${domain}/${pmidMatch[1]}`;
      }
    } else if (cleanId.startsWith('http')) {
      // Full URL
      return `https://${domain}/${cleanId}`;
    }
    
    // Default: pass through as-is
    return `https://${domain}/${cleanId}`;
  }

  /**
   * Check if SciHub access is available for a given article
   * @param {string} identifier - DOI, PMID, or URL
   * @returns {Promise<boolean>} - Whether article is available
   */
  async checkAvailability(identifier) {
    try {
      const scihubUrl = this.generateSciHubUrl(identifier);
      
      // Note: In a real implementation, you would make a HEAD request
      // For demo purposes, we'll return true for DOIs and PMIDs
      return identifier.includes('10.') || /^\d+$/.test(identifier.trim());
    } catch (error) {
      console.warn('SciHub availability check failed:', error);
      return false;
    }
  }

  /**
   * Get article metadata with SciHub access information
   * @param {Object} article - Article object with DOI/PMID
   * @returns {Object} - Enhanced article object with SciHub info
   */
  enhanceArticleWithSciHub(article) {
    const enhanced = { ...article };
    
    // Add SciHub URL if DOI or PMID available
    if (article.doi) {
      enhanced.scihubUrl = this.generateSciHubUrl(article.doi);
      enhanced.scihubAvailable = true;
    } else if (article.pmid) {
      enhanced.scihubUrl = this.generateSciHubUrl(article.pmid);
      enhanced.scihubAvailable = true;
    } else {
      enhanced.scihubAvailable = false;
    }
    
    return enhanced;
  }

  /**
   * Search for articles with SciHub access information
   * @param {Array} articles - Array of article objects
   * @returns {Array} - Enhanced articles with SciHub information
   */
  enhanceArticlesWithSciHub(articles) {
    return articles.map(article => this.enhanceArticleWithSciHub(article));
  }

  /**
   * Generate access options for an article
   * @param {Object} article - Article object
   * @returns {Array} - Array of access options
   */
  getAccessOptions(article) {
    const options = [];
    
    // Official publisher link
    if (article.journalUrl || article.publisherUrl) {
      options.push({
        type: 'publisher',
        label: 'Publisher (may require subscription)',
        url: article.journalUrl || article.publisherUrl,
        free: false
      });
    }
    
    // PubMed link
    if (article.pmid) {
      options.push({
        type: 'pubmed',
        label: 'PubMed (abstract only)',
        url: `https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`,
        free: true
      });
    }
    
    // PMC (if available)
    if (article.pmc) {
      options.push({
        type: 'pmc',
        label: 'PubMed Central (full text)',
        url: `https://www.ncbi.nlm.nih.gov/pmc/articles/${article.pmc}/`,
        free: true
      });
    }
    
    // SciHub option
    if (article.doi || article.pmid) {
      const identifier = article.doi || article.pmid;
      options.push({
        type: 'scihub',
        label: 'SciHub (alternative access)',
        url: this.generateSciHubUrl(identifier),
        free: true,
        note: 'For educational and research purposes'
      });
    }
    
    return options;
  }

  /**
   * Get alternative SciHub domains if primary fails
   * @param {string} identifier - DOI, PMID, or URL
   * @returns {Array} - Array of alternative URLs
   */
  getAlternativeUrls(identifier) {
    return this.scihubDomains.map(domain => 
      `https://${domain}/${identifier.replace(/^https?:\/\/[^\/]+\//, '')}`
    );
  }

  /**
   * Format citation information for an article
   * @param {Object} article - Article object
   * @returns {string} - Formatted citation
   */
  formatCitation(article) {
    const authors = article.authors ? 
      (article.authors.length > 3 ? 
        `${article.authors[0].name}, et al.` : 
        article.authors.map(a => a.name).join(', ')
      ) : 'Unknown authors';
    
    const year = article.pubdate ? new Date(article.pubdate).getFullYear() : 'Unknown year';
    const journal = article.journal || 'Unknown journal';
    
    return `${authors}. ${article.title}. ${journal}. ${year}.`;
  }

  /**
   * Check if article is likely open access
   * @param {Object} article - Article object
   * @returns {boolean} - Whether article appears to be open access
   */
  isLikelyOpenAccess(article) {
    const openAccessIndicators = [
      'plos',
      'frontiers',
      'bmj open',
      'nature communications',
      'scientific reports',
      'elife',
      'peerj',
      'open access'
    ];
    
    const journal = (article.journal || '').toLowerCase();
    return openAccessIndicators.some(indicator => journal.includes(indicator));
  }

  /**
   * Get recommended access method for an article
   * @param {Object} article - Article object  
   * @returns {Object} - Recommended access option
   */
  getRecommendedAccess(article) {
    const options = this.getAccessOptions(article);
    
    // Prefer PMC (free full text) if available
    const pmcOption = options.find(opt => opt.type === 'pmc');
    if (pmcOption) return pmcOption;
    
    // If likely open access, try publisher first
    if (this.isLikelyOpenAccess(article)) {
      const publisherOption = options.find(opt => opt.type === 'publisher');
      if (publisherOption) return publisherOption;
    }
    
    // Otherwise, suggest SciHub for paywalled content
    const scihubOption = options.find(opt => opt.type === 'scihub');
    if (scihubOption) return scihubOption;
    
    // Fallback to PubMed
    const pubmedOption = options.find(opt => opt.type === 'pubmed');
    return pubmedOption || options[0];
  }

  /**
   * Generate usage disclaimer
   * @returns {string} - Usage disclaimer text
   */
  getUsageDisclaimer() {
    return `
EDUCATIONAL USE DISCLAIMER:
This tool provides alternative access to scientific literature for educational and research purposes only. 
Users are responsible for complying with their institution's policies and applicable copyright laws.
Consider supporting authors and publishers when possible by accessing content through official channels.
    `.trim();
  }
}

export default SciHubIntegration;