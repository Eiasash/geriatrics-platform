// Research Library Component - Left Sidebar
// Provides access to medical knowledge hub, literature, and research tools

import React, { useState, useEffect } from 'react';
import { mockPapers, mockGuidelines } from '../data/mockData.js';

export const ResearchLibrary = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('knowledge-hub');
  const [latestPapers, setLatestPapers] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickSearchResults, setQuickSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // Load mock data instead of API calls
    setLatestPapers(mockPapers);
    setGuidelines(mockGuidelines);
  }, []);

  const handleQuickSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Filter mock papers based on search query
      const results = mockPapers.filter(paper => 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.journal.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setQuickSearchResults(results);
    } catch (error) {
      console.error('Quick search failed:', error);
      setQuickSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).getFullYear() || dateString;
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
                setSearchQuery('evidence-based geriatrics');
                handleQuickSearch();
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
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveSection('search');
                setSearchQuery('drug interactions elderly');
                handleQuickSearch();
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
                border: '1px solid #c3e6cb',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert(`Clinical Pearls for Geriatrics:

• Start LOW, go SLOW with medications
• Delirium often presents as hypoactive
• UTIs rarely cause confusion without fever
• Falls risk increases with >4 medications
• Polypharmacy = >5 chronic medications
• Check vision, hearing in all assessments`);
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
                    {paper.journal} • {paper.year}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      borderRadius: '12px', 
                      fontSize: '9px',
                      fontWeight: 'bold'
                    }}>
                      📄 Abstract Available
                    </span>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '12px' }}>
                  Loading latest papers...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Guidelines */}
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
                  <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#2c3e50', lineHeight: '1.3' }}>
                    {guideline.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6c757d', marginTop: '4px' }}>
                    {guideline.organization} • {guideline.year}
                  </div>
                  <div style={{ fontSize: '11px', color: '#495057', marginTop: '4px', lineHeight: '1.3' }}>
                    {guideline.description}
                  </div>
                  <div style={{ marginTop: '8px' }}>
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
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
                  onClick={handleQuickSearch}
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
                    {result.journal} • {result.year}
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

        {/* Article Details */}
        {activeSection === 'article-details' && selectedArticle && (
          <div>
            <button
              onClick={() => setActiveSection('literature')}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              ← Back to Papers
            </button>
            
            <div style={{
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: '13px', lineHeight: '1.3' }}>
                {selectedArticle.title}
              </h4>
              <div style={{ fontSize: '11px', color: '#6c757d', marginBottom: '8px' }}>
                <div><strong>Journal:</strong> {selectedArticle.journal}</div>
                <div><strong>Year:</strong> {selectedArticle.year}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchLibrary;