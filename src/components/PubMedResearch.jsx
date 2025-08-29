// PubMed Research Component
// Provides integrated access to PubMed database for medical literature research

import React, { useState, useEffect } from 'react';
import { PubMedIntegration } from '../research/PubMedIntegration.js';

export const PubMedResearch = () => {
  const [pubmedAPI] = useState(() => new PubMedIntegration());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [abstract, setAbstract] = useState(null);
  const [abstractLoading, setAbstractLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('search');
  const [searchFilters, setSearchFilters] = useState({
    maxResults: 20,
    dateRange: 'all',
    articleTypes: [],
    languages: ['eng'],
    sort: 'relevance'
  });
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    setRecentSearches(pubmedAPI.getRecentSearches(5));
    setSavedArticles(pubmedAPI.getSavedArticles());
  }, [pubmedAPI]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await pubmedAPI.searchArticles(searchQuery, searchFilters);
      setSearchResults(results.articles || []);
      
      if (results.error) {
        alert(results.error);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search PubMed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAbstract = async (pmid) => {
    setAbstractLoading(true);
    try {
      const abstractText = await pubmedAPI.fetchAbstract(pmid);
      setAbstract(abstractText);
    } catch (error) {
      console.error('Abstract fetch error:', error);
      setAbstract('Failed to fetch abstract');
    } finally {
      setAbstractLoading(false);
    }
  };

  const handleSaveArticle = (article) => {
    const tags = prompt('Enter tags for this article (comma-separated):');
    const notes = prompt('Enter notes for this article:');
    
    if (tags !== null) {
      const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
      const savedArticle = pubmedAPI.saveArticle(article, tagArray, notes || '');
      setSavedArticles(pubmedAPI.getSavedArticles());
      alert('Article saved to your library!');
    }
  };

  const handleRemoveArticle = (pmid) => {
    if (confirm('Remove this article from your library?')) {
      pubmedAPI.removeArticle(pmid);
      setSavedArticles(pubmedAPI.getSavedArticles());
    }
  };

  const handleQueryChange = (value) => {
    setSearchQuery(value);
    
    // Generate search suggestions
    if (value.length > 2) {
      const suggestions = pubmedAPI.getSearchSuggestions(value);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  };

  const formatAuthors = (authors, maxAuthors = 3) => {
    if (!authors || authors.length === 0) return 'No authors listed';
    
    const displayAuthors = authors.slice(0, maxAuthors);
    const authorNames = displayAuthors.map(author => author.name).join(', ');
    
    if (authors.length > maxAuthors) {
      return `${authorNames}, et al. (${authors.length} authors)`;
    }
    
    return authorNames;
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          🔬 PubMed Research Hub
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Access 35+ million medical literature citations and abstracts
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
        {['search', 'saved', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              margin: '0 5px',
              backgroundColor: activeTab === tab ? '#3498db' : '#ecf0f1',
              color: activeTab === tab ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              textTransform: 'capitalize',
              fontSize: '16px'
            }}
          >
            {tab === 'search' ? '🔍 Search' : 
             tab === 'saved' ? '📚 Library' : 
             '📜 History'}
          </button>
        ))}
      </div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div>
          {/* Search Interface */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Main Search Bar */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: 'bold',
                  color: '#34495e'
                }}>
                  Search Medical Literature
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder="e.g., dementia alzheimer elderly, polypharmacy geriatrics, falls prevention..."
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  
                  {/* Search Suggestions */}
                  {searchSuggestions.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      zIndex: 100,
                      marginTop: '5px'
                    }}>
                      {searchSuggestions.map((suggestion, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setSearchSuggestions([]);
                          }}
                          style={{
                            padding: '10px 15px',
                            cursor: 'pointer',
                            borderBottom: idx < searchSuggestions.length - 1 ? '1px solid #eee' : 'none'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          💡 {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Search Filters */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                    Max Results
                  </label>
                  <select
                    value={searchFilters.maxResults}
                    onChange={(e) => setSearchFilters({...searchFilters, maxResults: parseInt(e.target.value)})}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                    Sort By
                  </label>
                  <select
                    value={searchFilters.sort}
                    onChange={(e) => setSearchFilters({...searchFilters, sort: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="pub_date">Publication Date</option>
                    <option value="first_author">First Author</option>
                    <option value="journal">Journal</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                    Language
                  </label>
                  <select
                    value={searchFilters.languages[0]}
                    onChange={(e) => setSearchFilters({...searchFilters, languages: [e.target.value]})}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  >
                    <option value="eng">English</option>
                    <option value="all">All Languages</option>
                    <option value="fre">French</option>
                    <option value="ger">German</option>
                    <option value="spa">Spanish</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'end' }}>
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: loading ? '#95a5a6' : '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}
                  >
                    {loading ? 'Searching...' : '🔍 Search PubMed'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
                📜 Recent Searches
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {recentSearches.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(search.originalQuery);
                      handleSearch();
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ecf0f1',
                      border: '1px solid #bdc3c7',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#d5dbdb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ecf0f1'}
                  >
                    {search.originalQuery} ({search.resultCount} results)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>
                Search Results ({searchResults.length})
              </h2>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                {searchResults.map((article, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '25px',
                      border: '1px solid #e9ecef',
                      borderRadius: '10px',
                      backgroundColor: selectedArticle?.pmid === article.pmid ? '#f8f9ff' : '#fafafa'
                    }}
                  >
                    <div style={{ marginBottom: '15px' }}>
                      <h3 
                        style={{ 
                          margin: '0 0 10px 0', 
                          color: '#2c3e50',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setSelectedArticle(article);
                          setAbstract(null);
                        }}
                      >
                        {article.title}
                      </h3>
                      
                      <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                        <strong>Authors:</strong> {formatAuthors(article.authors)}
                      </p>
                      
                      <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                        <strong>Journal:</strong> {article.journal} ({article.pubYear})
                        {article.volume && ` • Vol ${article.volume}`}
                        {article.issue && ` • Issue ${article.issue}`}
                      </p>
                      
                      {article.doi && (
                        <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                          <strong>DOI:</strong> {article.doi}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleGetAbstract(article.pmid)}
                        disabled={abstractLoading}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        {abstractLoading ? 'Loading...' : '📄 Abstract'}
                      </button>
                      
                      <button
                        onClick={() => handleSaveArticle(article)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#27ae60',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        💾 Save
                      </button>
                      
                      <a
                        href={pubmedAPI.getArticleUrl(article.pmid)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#e67e22',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          display: 'inline-block'
                        }}
                      >
                        🔗 PubMed
                      </a>
                      
                      {article.pmc && (
                        <a
                          href={pubmedAPI.getPMCUrl(article.pmc)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#9b59b6',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            display: 'inline-block'
                          }}
                        >
                          📖 Full Text
                        </a>
                      )}
                    </div>

                    {selectedArticle?.pmid === article.pmid && abstract && (
                      <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}>
                        <h4 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Abstract</h4>
                        <p style={{ 
                          lineHeight: '1.6',
                          color: '#444',
                          fontSize: '15px',
                          margin: 0
                        }}>
                          {abstract}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Saved Articles Tab */}
      {activeTab === 'saved' && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>
            📚 Your Research Library ({savedArticles.length})
          </h2>
          
          {savedArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
              <p>No saved articles yet. Start by searching and saving articles to build your research library!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {savedArticles.map((article, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '25px',
                    border: '1px solid #e9ecef',
                    borderRadius: '10px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '18px' }}>
                      {article.title}
                    </h3>
                    
                    <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                      <strong>Authors:</strong> {formatAuthors(article.authors)}
                    </p>
                    
                    <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                      <strong>Journal:</strong> {article.journal} ({article.pubYear})
                    </p>
                    
                    <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                      <strong>Saved:</strong> {new Date(article.savedAt).toLocaleDateString()}
                    </p>
                    
                    {article.tags.length > 0 && (
                      <div style={{ margin: '10px 0' }}>
                        <strong style={{ fontSize: '14px', color: '#2c3e50' }}>Tags: </strong>
                        {article.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            style={{
                              display: 'inline-block',
                              padding: '4px 8px',
                              margin: '2px',
                              backgroundColor: '#3498db',
                              color: 'white',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {article.notes && (
                      <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                        <strong style={{ fontSize: '14px', color: '#2c3e50' }}>Notes: </strong>
                        <span style={{ fontSize: '14px' }}>{article.notes}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={pubmedAPI.getArticleUrl(article.pmid)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        display: 'inline-block'
                      }}
                    >
                      🔗 View on PubMed
                    </a>
                    
                    <button
                      onClick={() => {
                        const citation = pubmedAPI.generateCitation(article, 'ama');
                        navigator.clipboard.writeText(citation);
                        alert('Citation copied to clipboard!');
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      📋 Copy Citation
                    </button>
                    
                    <button
                      onClick={() => handleRemoveArticle(article.pmid)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>
            📜 Search History
          </h2>
          
          {recentSearches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📜</div>
              <p>No search history yet. Start searching to build your history!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {recentSearches.map((search, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '20px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSearchQuery(search.originalQuery);
                    setActiveTab('search');
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#fafafa'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
                        "{search.originalQuery}"
                      </h4>
                      <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px' }}>
                        {search.resultCount} results • {new Date(search.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery(search.originalQuery);
                        setActiveTab('search');
                        handleSearch();
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      🔍 Search Again
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => {
                  if (confirm('Clear all search history?')) {
                    pubmedAPI.clearSearchHistory();
                    setRecentSearches([]);
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginTop: '20px'
                }}
              >
                🗑️ Clear History
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PubMedResearch;