// Research Library Component - Left Sidebar
// Provides access to medical knowledge hub, literature, and research tools

import React, { useState, useEffect } from 'react';
import { PubMedIntegration } from '../research/PubMedIntegration.js';
import { SciHubIntegration } from '../research/SciHubIntegration.js';

export const ResearchLibrary = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('knowledge-hub');
  const [pubmedAPI] = useState(() => new PubMedIntegration());
  const [scihubAPI] = useState(() => new SciHubIntegration());
  const [latestPapers, setLatestPapers] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickSearchResults, setQuickSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    loadLatestPapers();
    loadGuidelines();
  }, []);

  const loadLatestPapers = async () => {
    try {
      const results = await pubmedAPI.searchArticles('geriatrics elderly aging', {
        maxResults: 10,
        sort: 'pub_date',
        articleTypes: ['Review', 'Meta-Analysis']
      });
      
      // Enhance with SciHub access information
      const enhancedPapers = scihubAPI.enhanceArticlesWithSciHub(results.articles || []);
      setLatestPapers(enhancedPapers);
    } catch (error) {
      console.error('Failed to load latest papers:', error);
    }
  };

  const loadGuidelines = () => {
    const highImpactGuidelines = [
      {
        title: '2019 AGS Beers Criteria Update',
        organization: 'American Geriatrics Society',
        year: 2019,
        category: 'Medication Safety',
        url: 'https://geriatricscareonline.org/beers',
        impact: 'High',
        description: 'Evidence-based recommendations for potentially inappropriate medications in older adults'
      },
      {
        title: 'WHO Guidelines on Integrated Care for Older People',
        organization: 'World Health Organization',
        year: 2017,
        category: 'Care Management',
        impact: 'High',
        description: 'Guidelines for person-centered assessment and care coordination'
      },
      {
        title: 'Falls Prevention Guidelines',
        organization: 'USPSTF',
        year: 2018,
        category: 'Prevention',
        impact: 'High',
        description: 'Evidence-based recommendations for fall prevention interventions'
      },
      {
        title: 'Dementia Care Guidelines',
        organization: 'AAN/APA',
        year: 2020,
        category: 'Neurology',
        impact: 'High',
        description: 'Guidelines for diagnosis and management of dementia'
      },
      {
        title: 'Delirium Prevention Guidelines',
        organization: 'NICE',
        year: 2019,
        category: 'Acute Care',
        impact: 'High',
        description: 'Evidence-based strategies for delirium prevention and management'
      }
    ];
    setGuidelines(highImpactGuidelines);
  };

  const handleQuickSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await pubmedAPI.searchArticles(searchQuery + ' geriatrics elderly', {
        maxResults: 5,
        sort: 'relevance'
      });
      
      // Enhance articles with SciHub access information
      const enhancedArticles = scihubAPI.enhanceArticlesWithSciHub(results.articles || []);
      setQuickSearchResults(enhancedArticles);
    } catch (error) {
      console.error('Quick search failed:', error);
      setQuickSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).getFullYear();
    } catch {
      return dateString;
    }
  };

  const truncateTitle = (title, maxLength = 60) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const showArticleDetails = (article) => {
    setSelectedArticle(article);
    setActiveSection('article-details');
  };

  const getAccessButtonStyle = (option) => {
    const baseStyle = {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '11px',
      cursor: 'pointer',
      marginRight: '8px',
      marginBottom: '4px'
    };

    switch (option.type) {
      case 'scihub':
        return { ...baseStyle, backgroundColor: '#dc3545', color: 'white' };
      case 'pmc':
        return { ...baseStyle, backgroundColor: '#28a745', color: 'white' };
      case 'pubmed':
        return { ...baseStyle, backgroundColor: '#007bff', color: 'white' };
      default:
        return { ...baseStyle, backgroundColor: '#6c757d', color: 'white' };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '320px',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderRight: '1px solid #e9ecef',
      boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      overflowY: 'auto',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: '#667eea',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1001
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
            📚 Research Library
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa'
      }}>
        {[
          { id: 'knowledge-hub', label: '🧠 Hub', title: 'Knowledge Hub' },
          { id: 'literature', label: '📄 Papers', title: 'Literature' },
          { id: 'guidelines', label: '📋 Guidelines', title: 'Guidelines' },
          { id: 'search', label: '🔍 Search', title: 'Quick Search' },
          ...(selectedArticle ? [{ id: 'article-details', label: '📖 Article', title: 'Article Details' }] : [])
        ].map(tab => (
          <button
            key={tab.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Tab clicked:', tab.id);
              setActiveSection(tab.id);
            }}
            style={{
              flex: 1,
              padding: '10px 4px',
              border: 'none',
              backgroundColor: activeSection === tab.id ? 'white' : 'transparent',
              borderBottom: activeSection === tab.id ? '2px solid #667eea' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: activeSection === tab.id ? 'bold' : 'normal',
              color: activeSection === tab.id ? '#667eea' : '#666'
            }}
            title={tab.title}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Knowledge Hub */}
        {activeSection === 'knowledge-hub' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Medical Knowledge Hub
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {/* Quick Access Cards */}
              <div style={{
                padding: '12px',
                backgroundColor: '#e8f4fd',
                borderRadius: '8px',
                border: '1px solid #bee5eb',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Evidence Search card clicked');
                setActiveSection('search');
              }}>
                <div style={{ fontWeight: 'bold', color: '#0c5460', fontSize: '14px' }}>
                  🔬 Evidence Search
                </div>
                <div style={{ fontSize: '12px', color: '#0c5460', marginTop: '4px' }}>
                  Search PubMed + Guidelines
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f8d7da',
                borderRadius: '8px',
                border: '1px solid #f5c6cb',
                cursor: 'pointer'
              }}>
                <div style={{ fontWeight: 'bold', color: '#721c24', fontSize: '14px' }}>
                  💊 Drug Search
                </div>
                <div style={{ fontSize: '12px', color: '#721c24', marginTop: '4px' }}>
                  Interactions & Dosing
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#d4edda',
                borderRadius: '8px',
                border: '1px solid #c3e6cb'
              }}>
                <div style={{ fontWeight: 'bold', color: '#155724', fontSize: '14px' }}>
                  🎯 Clinical Pearls
                </div>
                <div style={{ fontSize: '12px', color: '#155724', marginTop: '4px' }}>
                  Quick Reference Facts
                </div>
              </div>

              {/* Bookmarked Resources */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '14px' }}>
                  📖 Bookmarked Resources
                </h4>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  • Geriatrics Textbooks<br/>
                  • Clinical Guidelines<br/>
                  • Assessment Tools<br/>
                  • Drug References
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '14px' }}>
                  ⏱️ Recent Activity
                </h4>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  • Searched: "falls prevention"<br/>
                  • Viewed: Hazzard's Ch. 25<br/>
                  • Bookmarked: AGS Guidelines<br/>
                  • Updated: Patient notes
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Literature */}
        {activeSection === 'literature' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Latest Papers
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {latestPapers.length > 0 ? latestPapers.map((paper, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Paper clicked:', paper.title);
                    showArticleDetails(paper);
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#2c3e50', lineHeight: '1.3' }}>
                    {truncateTitle(paper.title)}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6c757d', marginTop: '4px' }}>
                    {paper.journal} • {formatDate(paper.pubdate)}
                  </div>
                  {paper.authors && paper.authors.length > 0 && (
                    <div style={{ fontSize: '11px', color: '#6c757d', marginTop: '2px' }}>
                      {paper.authors[0].name}{paper.authors.length > 1 && ', et al.'}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      backgroundColor: paper.scihubAvailable ? '#d4edda' : '#f8d7da',
                      color: paper.scihubAvailable ? '#155724' : '#721c24',
                      borderRadius: '12px', 
                      fontSize: '9px',
                      fontWeight: 'bold'
                    }}>
                      {paper.scihubAvailable ? '🔓 Full Text Available' : '🔒 Abstract Only'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showArticleDetails(paper);
                      }}
                      style={{
                        marginLeft: 'auto',
                        padding: '2px 8px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '9px',
                        cursor: 'pointer'
                      }}
                    >
                      View Access Options
                    </button>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '12px' }}>
                  Loading latest papers...
                </div>
              )}

              {/* Open Access Section */}
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#0056b3' }}>
                  🔓 Open Access Literature
                </div>
                <div style={{ fontSize: '11px', color: '#0056b3', marginTop: '4px' }}>
                  Free full-text articles available
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Browse Open Access clicked');
                    setSearchQuery('geriatrics open access');
                    setActiveSection('search');
                    handleQuickSearch();
                  }}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#0056b3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Browse Open Access
                </button>
              </div>
            </div>
          </div>
        )}

        {/* High Impact Guidelines */}
        {activeSection === 'guidelines' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              High Impact Guidelines
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {guidelines.map((guideline, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#2c3e50', lineHeight: '1.3' }}>
                        {guideline.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6c757d', marginTop: '4px' }}>
                        {guideline.organization} • {guideline.year}
                      </div>
                      <div style={{ fontSize: '11px', color: '#495057', marginTop: '4px', lineHeight: '1.3' }}>
                        {guideline.description}
                      </div>
                    </div>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: guideline.impact === 'High' ? '#d4edda' : '#fff3cd',
                      color: guideline.impact === 'High' ? '#155724' : '#856404',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      marginLeft: '8px'
                    }}>
                      {guideline.impact}
                    </span>
                  </div>
                  
                  <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: '#f8f9fa',
                      color: '#495057',
                      borderRadius: '12px',
                      fontSize: '10px',
                      border: '1px solid #e9ecef'
                    }}>
                      {guideline.category}
                    </span>
                  </div>

                  {guideline.url && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('View Guideline clicked:', guideline.title);
                        window.open(guideline.url, '_blank');
                      }}
                      style={{
                        marginTop: '8px',
                        padding: '4px 8px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      View Guideline
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Search */}
        {activeSection === 'search' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Quick Search
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medical literature..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Search button clicked');
                    handleQuickSearch();
                  }}
                  disabled={loading}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: loading ? '#6c757d' : '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? '...' : 'Search'}
                </button>
              </div>

              {/* Quick Search Buttons */}
              <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['delirium', 'falls prevention', 'polypharmacy', 'dementia', 'frailty'].map(term => (
                  <button
                    key={term}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Quick search term clicked:', term);
                      setSearchQuery(term);
                      handleQuickSearch();
                    }}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '10px',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results */}
            <div style={{ display: 'grid', gap: '8px' }}>
              {quickSearchResults.map((result, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    border: '1px solid #e9ecef',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Search result clicked:', result.title);
                    showArticleDetails(result);
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#2c3e50', lineHeight: '1.2' }}>
                    {truncateTitle(result.title, 50)}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6c757d', marginTop: '4px' }}>
                    {result.journal} • {formatDate(result.pubdate)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      backgroundColor: result.scihubAvailable ? '#d4edda' : '#f8d7da',
                      color: result.scihubAvailable ? '#155724' : '#721c24',
                      borderRadius: '12px', 
                      fontSize: '9px',
                      fontWeight: 'bold'
                    }}>
                      {result.scihubAvailable ? '🔓 Full Text Access' : '🔒 Abstract Only'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showArticleDetails(result);
                      }}
                      style={{
                        marginLeft: 'auto',
                        padding: '2px 8px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '9px',
                        cursor: 'pointer'
                      }}
                    >
                      Access Options
                    </button>
                  </div>
                </div>
              ))}

              {quickSearchResults.length === 0 && searchQuery && !loading && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '12px' }}>
                  No results found. Try different search terms.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Article Details with Access Options */}
        {activeSection === 'article-details' && selectedArticle && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Back to Search clicked');
                  setActiveSection('search');
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginRight: '12px'
                }}
              >
                ← Back to Search
              </button>
              <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '14px', flex: 1 }}>
                Article Access Options
              </h3>
            </div>
            
            {/* Article Information */}
            <div style={{
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              marginBottom: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: '13px', lineHeight: '1.3' }}>
                {selectedArticle.title}
              </h4>
              <div style={{ fontSize: '11px', color: '#6c757d', marginBottom: '8px' }}>
                {selectedArticle.authors && selectedArticle.authors.length > 0 && (
                  <div>
                    <strong>Authors:</strong> {selectedArticle.authors.slice(0, 3).map(a => a.name).join(', ')}
                    {selectedArticle.authors.length > 3 && ', et al.'}
                  </div>
                )}
                <div><strong>Journal:</strong> {selectedArticle.journal}</div>
                <div><strong>Year:</strong> {formatDate(selectedArticle.pubdate)}</div>
                {selectedArticle.doi && (
                  <div><strong>DOI:</strong> {selectedArticle.doi}</div>
                )}
                {selectedArticle.pmid && (
                  <div><strong>PMID:</strong> {selectedArticle.pmid}</div>
                )}
              </div>
              
              {/* Citation */}
              <div style={{ 
                padding: '8px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px',
                fontSize: '10px',
                color: '#495057',
                fontStyle: 'italic'
              }}>
                <strong>Citation:</strong> {scihubAPI.formatCitation(selectedArticle)}
              </div>
            </div>

            {/* Access Options */}
            <div style={{
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              marginBottom: '16px'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#2c3e50', fontSize: '14px' }}>
                📖 Access Options
              </h4>
              
              {/* Recommended Option */}
              {(() => {
                const recommended = scihubAPI.getRecommendedAccess(selectedArticle);
                return (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#28a745', marginBottom: '8px' }}>
                      ⭐ Recommended:
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Recommended access clicked:', recommended.label);
                        window.open(recommended.url, '_blank');
                      }}
                      style={{
                        ...getAccessButtonStyle(recommended),
                        fontWeight: 'bold',
                        border: '2px solid #28a745'
                      }}
                    >
                      {recommended.label}
                    </button>
                    {recommended.note && (
                      <div style={{ fontSize: '10px', color: '#6c757d', marginTop: '4px' }}>
                        {recommended.note}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* All Access Options */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#495057', marginBottom: '8px' }}>
                  All Options:
                </div>
                <div>
                  {scihubAPI.getAccessOptions(selectedArticle).map((option, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Access option clicked:', option.label);
                          window.open(option.url, '_blank');
                        }}
                        style={getAccessButtonStyle(option)}
                      >
                        {option.label}
                        {option.free && ' (Free)'}
                      </button>
                      {option.note && (
                        <div style={{ fontSize: '9px', color: '#6c757d', marginTop: '2px' }}>
                          {option.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Disclaimer */}
              <div style={{
                padding: '12px',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '4px',
                fontSize: '9px',
                color: '#856404',
                lineHeight: '1.3'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>⚠️ Educational Use Notice:</div>
                {scihubAPI.getUsageDisclaimer()}
              </div>
            </div>

            {/* Alternative SciHub Mirrors (if applicable) */}
            {selectedArticle.scihubAvailable && (
              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#495057', marginBottom: '8px' }}>
                  🌐 Alternative Mirrors:
                </div>
                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                  If primary SciHub link doesn't work, alternative domains are available.
                  Current domains: {scihubAPI.scihubDomains.join(', ')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        padding: '12px 16px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        fontSize: '10px',
        color: '#6c757d',
        textAlign: 'center'
      }}>
        <div>📚 Medical Literature Hub</div>
        <div>Real-time PubMed Integration</div>
      </div>
    </div>
  );
};

export default ResearchLibrary;