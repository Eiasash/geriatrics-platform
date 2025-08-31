// Global Search Component - Everything searchable
import React, { useState, useEffect } from 'react';
import CompleteDrugDatabase from '../../data/CompleteDrugDatabase';
import BoardQuestions from '../../data/BoardQuestions';
import GeriatricTextbook from '../../data/GeriatricTextbook';
import ClinicalGuidelines from '../../data/ClinicalGuidelines';
import HebrewIntegration from '../../data/HebrewIntegration';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Search function
  const performSearch = (searchTerm) => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const allResults = [];

    // Search drugs
    if (filter === 'all' || filter === 'drugs') {
      Object.keys(CompleteDrugDatabase).forEach(category => {
        if (typeof CompleteDrugDatabase[category] === 'object') {
          Object.entries(CompleteDrugDatabase[category]).forEach(([drug, data]) => {
            if (drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.israeli?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.generic?.toLowerCase().includes(searchTerm.toLowerCase())) {
              allResults.push({
                type: 'Drug',
                category: category,
                title: `${drug} (${data.israeli})`,
                content: `Start: ${data.elderlyStart || data.dose} | Max: ${data.elderlyMax || 'See details'}`,
                data: data,
                relevance: 'high'
              });
            }
          });
        }
      });
    }

    // Search board questions
    if (filter === 'all' || filter === 'questions') {
      BoardQuestions.questions.forEach(question => {
        if (question.stem.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.explanation.toLowerCase().includes(searchTerm.toLowerCase())) {
          allResults.push({
            type: 'Board Question',
            category: question.difficulty,
            title: `Question ${question.id}: ${question.topic}`,
            content: question.stem.substring(0, 200) + '...',
            data: question,
            relevance: 'medium'
          });
        }
      });
    }

    // Search textbook
    if (filter === 'all' || filter === 'textbook') {
      Object.entries(GeriatricTextbook.chapters).forEach(([chapterNum, chapter]) => {
        if (chapter.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          allResults.push({
            type: 'Textbook Chapter',
            category: `Chapter ${chapterNum}`,
            title: chapter.title,
            content: chapter.content.introduction || 'Comprehensive geriatric medicine content',
            data: chapter,
            relevance: 'high'
          });
        }

        // Search within chapter content
        const searchInContent = (obj, path = '') => {
          Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
              allResults.push({
                type: 'Textbook Content',
                category: `${chapter.title} - ${path}`,
                title: key.replace(/([A-Z])/g, ' $1').trim(),
                content: value.substring(0, 200) + '...',
                data: { content: value, chapter: chapter.title },
                relevance: 'medium'
              });
            } else if (typeof value === 'object' && value !== null) {
              searchInContent(value, path ? `${path} > ${key}` : key);
            }
          });
        };

        searchInContent(chapter.content);
      });
    }

    // Search clinical guidelines
    if (filter === 'all' || filter === 'guidelines') {
      Object.entries(ClinicalGuidelines).forEach(([guideline, data]) => {
        if (guideline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
          allResults.push({
            type: 'Clinical Guideline',
            category: 'Evidence-Based',
            title: data.title || guideline,
            content: `Latest evidence-based guidelines for ${guideline}`,
            data: data,
            relevance: 'high'
          });
        }
      });
    }

    // Search Hebrew translations
    if (filter === 'all' || filter === 'hebrew') {
      Object.entries(HebrewIntegration.medicalTerms).forEach(([english, hebrew]) => {
        if (english.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hebrew.includes(searchTerm)) {
          allResults.push({
            type: 'Hebrew Translation',
            category: 'Medical Terms',
            title: english,
            content: hebrew,
            data: { english, hebrew },
            relevance: 'low'
          });
        }
      });
    }

    // Sort by relevance and type
    allResults.sort((a, b) => {
      const relevanceOrder = { high: 3, medium: 2, low: 1 };
      return relevanceOrder[b.relevance] - relevanceOrder[a.relevance];
    });

    setResults(allResults.slice(0, 50)); // Limit to 50 results
    setLoading(false);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, filter]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'Drug': return '#e74c3c';
      case 'Board Question': return '#f39c12';
      case 'Textbook Chapter': return '#3498db';
      case 'Textbook Content': return '#2980b9';
      case 'Clinical Guideline': return '#27ae60';
      case 'Hebrew Translation': return '#9b59b6';
      default: return '#7f8c8d';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '28px',
            margin: 0
          }}>
            🔍 Global Medical Search
          </h2>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Search drugs, protocols, board questions, guidelines, and more
          </p>
        </div>

        {/* Search Input */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search anything... (e.g., 'haloperidol', 'delirium protocol', 'CHA2DS2VASc')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 20px',
              fontSize: '16px',
              border: '2px solid #e0e0e0',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { id: 'all', label: '🌐 All', count: 'Everything' },
            { id: 'drugs', label: '💊 Drugs', count: '200+' },
            { id: 'questions', label: '❓ Board Questions', count: '15+' },
            { id: 'textbook', label: '📚 Textbook', count: '7 Chapters' },
            { id: 'guidelines', label: '📋 Guidelines', count: 'Evidence-Based' },
            { id: 'hebrew', label: '🇮🇱 Hebrew', count: 'Translations' }
          ].map(filterOption => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              style={{
                padding: '10px 15px',
                border: 'none',
                borderRadius: '20px',
                background: filter === filterOption.id ? '#667eea' : '#f8f9fa',
                color: filter === filterOption.id ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '12px',
                transition: 'all 0.3s'
              }}
            >
              {filterOption.label}
              <br />
              <span style={{ fontSize: '10px', opacity: 0.8 }}>
                {filterOption.count}
              </span>
            </button>
          ))}
        </div>

        {/* Quick Searches */}
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ color: '#667eea', marginBottom: '15px' }}>⚡ Quick Searches</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              'haloperidol', 'delirium', 'frailty', 'falls protocol', 
              'CHA2DS2VASc', 'Beers criteria', 'capacity assessment',
              'apixaban dosing', 'Hebrew phrases', 'board questions'
            ].map(quickSearch => (
              <button
                key={quickSearch}
                onClick={() => setQuery(quickSearch)}
                style={{
                  padding: '8px 12px',
                  background: '#f0f8ff',
                  border: '1px solid #667eea',
                  borderRadius: '15px',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f0f8ff';
                  e.target.style.color = '#667eea';
                }}
              >
                {quickSearch}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && !loading && (
          <div>
            <h4 style={{ color: '#667eea', marginBottom: '20px' }}>
              📊 Results ({results.length}) for "{query}"
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {results.map((result, idx) => (
                <div key={idx} style={{
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={() => {
                  if (result.type === 'Drug') {
                    alert(`${result.title}\n\nCategory: ${result.category}\nDosing: ${result.content}\n\nClick the Drugs tab for full details.`);
                  } else if (result.type === 'Board Question') {
                    alert(`${result.title}\n\n${result.data.stem.substring(0, 300)}...\n\nAnswer: ${result.data.correct}\n\nClick Board Questions section for full question.`);
                  } else {
                    alert(`${result.title}\n\n${result.content}\n\nCheck the ${result.type} section for full details.`);
                  }
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <span style={{
                        background: getTypeColor(result.type),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        marginRight: '10px'
                      }}>
                        {result.type}
                      </span>
                      <span style={{
                        background: '#f0f0f0',
                        color: '#666',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }}>
                        {result.category}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: '#999',
                      fontWeight: 'bold'
                    }}>
                      {result.relevance.toUpperCase()}
                    </span>
                  </div>
                  
                  <h4 style={{ 
                    color: '#333',
                    margin: '0 0 8px 0',
                    fontSize: '16px'
                  }}>
                    {result.title}
                  </h4>
                  
                  <p style={{ 
                    color: '#666',
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}>
                    {result.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {query.length >= 2 && results.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <h3>No results found for "{query}"</h3>
            <p>Try searching for:</p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Drug names (generic or Israeli brands)</li>
              <li>Medical conditions (delirium, frailty, falls)</li>
              <li>Clinical protocols</li>
              <li>Board exam topics</li>
              <li>Hebrew medical terms</li>
            </ul>
          </div>
        )}

        {/* Search Tips */}
        {query.length === 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>💡 Search Tips</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', textAlign: 'left' }}>
              <div>
                <h4 style={{ color: '#e74c3c' }}>💊 Drug Examples:</h4>
                <ul style={{ fontSize: '14px', color: '#666' }}>
                  <li>"haloperidol" → Dosing, Israeli name</li>
                  <li>"Eliquis" → Find apixaban info</li>
                  <li>"elderly morphine" → Geriatric dosing</li>
                  <li>"renal adjustment" → CKD dosing</li>
                </ul>
              </div>
              
              <div>
                <h4 style={{ color: '#f39c12' }}>❓ Clinical Examples:</h4>
                <ul style={{ fontSize: '14px', color: '#666' }}>
                  <li>"delirium protocol" → Complete workup</li>
                  <li>"capacity assessment" → 4 components</li>
                  <li>"falls prevention" → Evidence-based</li>
                  <li>"CHA2DS2VASc" → Scoring system</li>
                </ul>
              </div>
              
              <div>
                <h4 style={{ color: '#3498db' }}>📚 Knowledge Examples:</h4>
                <ul style={{ fontSize: '14px', color: '#666' }}>
                  <li>"Alzheimer" → Pathophysiology</li>
                  <li>"frailty criteria" → Fried phenotype</li>
                  <li>"heart failure" → Guidelines</li>
                  <li>"polypharmacy" → Beers criteria</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;