// Medical Textbook Library Component
// Provides access to comprehensive medical textbook content

import React, { useState, useEffect } from 'react';
import { TextbookManager } from '../data/medicalTextbooks.js';

export const TextbookLibrary = () => {
  const [textbookManager] = useState(() => new TextbookManager());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [recentBooks, setRecentBooks] = useState([]);
  const [quickLookupTopic, setQuickLookupTopic] = useState('');

  useEffect(() => {
    setRecentBooks(textbookManager.getRecentlyAdded(5));
  }, [textbookManager]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = textbookManager.searchTextbooks(searchQuery, {
        category: selectedCategory === 'all' ? null : selectedCategory,
        maxResults: 15,
        includeContent: true
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleQuickLookup = () => {
    if (quickLookupTopic.trim()) {
      const lookup = textbookManager.quickLookup(quickLookupTopic);
      if (lookup) {
        setSearchResults([
          {
            id: 'quick-lookup',
            title: `Quick Reference: ${quickLookupTopic}`,
            category: 'quick-reference',
            quickFacts: lookup.quickFacts,
            recommendedBooks: lookup.books,
            relevanceScore: 100
          }
        ]);
      }
    }
  };

  const categories = textbookManager.getAllCategories();

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
          📚 Medical Textbook Library
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Comprehensive medical textbook database for geriatrics and internal medicine
        </p>
      </div>

      {/* Search Interface */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'grid', gap: '15px' }}>
          {/* Main Search */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#34495e'
            }}>
              🔍 Search Medical Literature
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, conditions, treatments, authors..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '16px',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, ' $1')}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick Lookup */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#34495e'
            }}>
              ⚡ Quick Clinical Lookup
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={quickLookupTopic}
                onChange={(e) => setQuickLookupTopic(e.target.value)}
                placeholder="delirium, falls, polypharmacy..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickLookup()}
              />
              <button
                onClick={handleQuickLookup}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                Quick Lookup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Display */}
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Main Content */}
        <div style={{ flex: 2 }}>
          {selectedBook && selectedChapter ? (
            // Chapter View
            <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <button
                onClick={() => setSelectedChapter(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                ← Back to Book
              </button>
              
              <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                Chapter {selectedChapter.number}: {selectedChapter.title}
              </h2>
              
              {selectedChapter.sections?.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
                    {section.title}
                  </h3>
                  <p style={{ 
                    lineHeight: '1.6', 
                    marginBottom: '15px',
                    fontSize: '16px'
                  }}>
                    {section.content}
                  </p>
                  {section.keyPoints && (
                    <div style={{ 
                      backgroundColor: '#ecf0f1', 
                      padding: '15px', 
                      borderRadius: '8px',
                      borderLeft: '4px solid #3498db'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                        🔑 Key Points:
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {section.keyPoints.map((point, pidx) => (
                          <li key={pidx} style={{ marginBottom: '5px' }}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : selectedBook ? (
            // Book Overview
            <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <button
                onClick={() => setSelectedBook(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                ← Back to Results
              </button>
              
              <h1 style={{ color: '#2c3e50', marginBottom: '15px' }}>
                {selectedBook.title}
              </h1>
              
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '8px',
                marginBottom: '25px'
              }}>
                {selectedBook.authors && (
                  <p><strong>Authors:</strong> {selectedBook.authors.join(', ')}</p>
                )}
                {selectedBook.edition && (
                  <p><strong>Edition:</strong> {selectedBook.edition}</p>
                )}
                {selectedBook.publisher && (
                  <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
                )}
                {selectedBook.year && (
                  <p><strong>Year:</strong> {selectedBook.year}</p>
                )}
                {selectedBook.isbn && (
                  <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                )}
              </div>
              
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                marginBottom: '25px',
                color: '#555'
              }}>
                {selectedBook.description}
              </p>

              {selectedBook.chapters && (
                <div>
                  <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
                    📖 Table of Contents
                  </h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {selectedBook.chapters.map((chapter, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedChapter(chapter)}
                        style={{
                          padding: '15px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          border: '2px solid transparent',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#e9ecef';
                          e.target.style.borderColor = '#3498db';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#f8f9fa';
                          e.target.style.borderColor = 'transparent';
                        }}
                      >
                        <strong>Chapter {chapter.number}:</strong> {chapter.title}
                        {chapter.sections && (
                          <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                            {chapter.sections.length} section{chapter.sections.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedBook.guidelines && (
                <div style={{ marginTop: '25px' }}>
                  <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
                    📋 Clinical Guidelines
                  </h3>
                  {selectedBook.guidelines.map((guideline, idx) => (
                    <div key={idx} style={{ 
                      marginBottom: '20px',
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      borderLeft: '4px solid #27ae60'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                        {guideline.title}
                      </h4>
                      <p style={{ marginBottom: '15px' }}>
                        {guideline.summary}
                      </p>
                      {guideline.keyRecommendations && (
                        <div>
                          <strong>Key Recommendations:</strong>
                          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            {guideline.keyRecommendations.map((rec, ridx) => (
                              <li key={ridx} style={{ marginBottom: '5px' }}>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : searchResults.length > 0 ? (
            // Search Results
            <div>
              <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
                Search Results ({searchResults.length})
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {searchResults.map((result, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'white',
                      padding: '25px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      cursor: result.id !== 'quick-lookup' ? 'pointer' : 'default',
                      border: '2px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => result.id !== 'quick-lookup' && setSelectedBook(result)}
                    onMouseEnter={(e) => {
                      if (result.id !== 'quick-lookup') {
                        e.target.style.borderColor = '#3498db';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (result.id !== 'quick-lookup') {
                        e.target.style.borderColor = 'transparent';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div style={{ marginBottom: '15px' }}>
                      <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>
                        {result.title}
                      </h3>
                      {result.authors && (
                        <p style={{ margin: '0 0 5px 0', color: '#7f8c8d' }}>
                          By: {result.authors.join(', ')}
                        </p>
                      )}
                      <span style={{
                        padding: '4px 10px',
                        backgroundColor: '#ecf0f1',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: '#2c3e50',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                      }}>
                        {result.category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>

                    {result.quickFacts && (
                      <div style={{
                        backgroundColor: '#e8f6f3',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        borderLeft: '4px solid #27ae60'
                      }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>
                          ⚡ Quick Facts:
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {result.quickFacts.map((fact, fidx) => (
                            <li key={fidx} style={{ marginBottom: '5px' }}>
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.matchingContent && result.matchingContent.length > 0 && (
                      <div style={{ marginTop: '15px' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#34495e' }}>
                          📄 Relevant Content:
                        </h4>
                        {result.matchingContent.map((content, cidx) => (
                          <div key={cidx} style={{ 
                            marginBottom: '10px',
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}>
                            <strong>{content.chapterTitle} → {content.sectionTitle}</strong>
                            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                              {content.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ 
                      marginTop: '15px',
                      fontSize: '12px',
                      color: '#95a5a6'
                    }}>
                      Relevance Score: {result.relevanceScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Welcome Screen
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
              <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>
                Welcome to the Medical Textbook Library
              </h2>
              <p style={{ color: '#7f8c8d', fontSize: '16px', marginBottom: '30px' }}>
                Search through comprehensive medical textbooks, clinical guidelines, and quick reference materials. 
                Start by searching for a topic or condition above.
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                marginTop: '30px'
              }}>
                {['delirium', 'falls', 'polypharmacy', 'dementia', 'hypertension'].map(topic => (
                  <button
                    key={topic}
                    onClick={() => {
                      setQuickLookupTopic(topic);
                      handleQuickLookup();
                    }}
                    style={{
                      padding: '15px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontWeight: 'bold'
                    }}
                  >
                    Quick: {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {/* Recently Added Books */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
              🆕 Recently Added
            </h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {recentBooks.map((book, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBook(book)}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    border: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e9ecef';
                    e.target.style.borderColor = '#3498db';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {book.title}
                  </div>
                  <div style={{ color: '#666', fontSize: '12px' }}>
                    {book.year} • {book.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
              📂 Categories
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {categories.map(category => {
                const categoryBooks = textbookManager.getBooksByCategory(category);
                return (
                  <div
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      // Auto-search with empty query to show all books in category
                      const results = textbookManager.searchTextbooks('', {
                        category,
                        maxResults: 20
                      });
                      if (results.length === 0) {
                        // If no search results, show category books directly
                        setSearchResults(categoryBooks.map(book => ({ ...book, relevanceScore: 1 })));
                      } else {
                        setSearchResults(results);
                      }
                    }}
                    style={{
                      padding: '10px',
                      backgroundColor: selectedCategory === category ? '#e3f2fd' : '#f8f9fa',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      border: selectedCategory === category ? '2px solid #2196f3' : '1px solid transparent',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category) {
                        e.target.style.backgroundColor = '#e9ecef';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category) {
                        e.target.style.backgroundColor = '#f8f9fa';
                      }
                    }}
                  >
                    <span style={{ textTransform: 'capitalize' }}>
                      {category.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span style={{ 
                      backgroundColor: '#34495e',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {categoryBooks.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextbookLibrary;