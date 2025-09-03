// Articles Component - Fixed with proper state management to prevent infinite loops
import React, { useState, useEffect } from 'react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load articles once on mount
    const loadArticles = async () => {
      try {
        setLoading(true);
        
        // High-impact geriatrics articles
        const articleData = [
          {
            id: 1,
            title: "AGS Beers Criteria 2023 Update: Potentially Inappropriate Medications in Older Adults",
            journal: "J Am Geriatr Soc",
            year: 2023,
            impact: 6.4,
            doi: "10.1111/jgs.18372",
            citations: 247,
            category: "pharmacology",
            abstract: "Updated guidance on medications to avoid or use with caution in older adults.",
            tags: ["Beers Criteria", "Polypharmacy", "Medication Safety"],
            fullTextAvailable: true
          },
          {
            id: 2,
            title: "Frailty Consensus: A Call to Action",
            journal: "J Am Med Dir Assoc",
            year: 2023,
            impact: 7.8,
            doi: "10.1016/j.jamda.2023.03.022",
            citations: 189,
            category: "assessment",
            abstract: "International consensus on frailty screening and management in clinical practice.",
            tags: ["Frailty", "Assessment", "Guidelines"],
            fullTextAvailable: true
          },
          {
            id: 3,
            title: "SPRINT-MIND: Effects of Intensive Blood Pressure Control on Dementia",
            journal: "JAMA",
            year: 2023,
            impact: 157.3,
            doi: "10.1001/jama.2023.7295",
            citations: 432,
            category: "cardiovascular",
            abstract: "Impact of intensive blood pressure control on cognitive outcomes in older adults.",
            tags: ["Hypertension", "Dementia", "Prevention"],
            fullTextAvailable: false
          },
          {
            id: 4,
            title: "Deprescribing in Older Adults: Evidence-Based Strategies",
            journal: "BMJ",
            year: 2023,
            impact: 93.6,
            doi: "10.1136/bmj-2022-074520",
            citations: 156,
            category: "pharmacology",
            abstract: "Systematic approach to reducing inappropriate polypharmacy in elderly patients.",
            tags: ["Deprescribing", "Polypharmacy", "Patient Safety"],
            fullTextAvailable: true
          },
          {
            id: 5,
            title: "Management of Delirium in Hospitalized Older Adults: 2023 Guidelines",
            journal: "Ann Intern Med",
            year: 2023,
            impact: 39.2,
            doi: "10.7326/M23-0458",
            citations: 98,
            category: "hospital",
            abstract: "Updated clinical practice guidelines for prevention and management of delirium.",
            tags: ["Delirium", "Hospital Care", "Guidelines"],
            fullTextAvailable: true
          },
          {
            id: 6,
            title: "Exercise Interventions for Fall Prevention: Updated Meta-Analysis",
            journal: "Age Ageing",
            year: 2023,
            impact: 12.8,
            doi: "10.1093/ageing/afad089",
            citations: 67,
            category: "prevention",
            abstract: "Comprehensive analysis of exercise programs for reducing fall risk in community-dwelling elderly.",
            tags: ["Falls", "Exercise", "Prevention"],
            fullTextAvailable: false
          },
          {
            id: 7,
            title: "Lecanemab in Early Alzheimer's Disease: Phase 3 Trial Results",
            journal: "N Engl J Med",
            year: 2023,
            impact: 176.1,
            doi: "10.1056/NEJMoa2212948",
            citations: 523,
            category: "neurology",
            abstract: "Efficacy and safety of lecanemab in patients with early Alzheimer's disease.",
            tags: ["Alzheimer's", "Anti-amyloid", "Clinical Trial"],
            fullTextAvailable: false
          },
          {
            id: 8,
            title: "Comprehensive Geriatric Assessment: 2023 International Guidelines",
            journal: "Lancet Healthy Longev",
            year: 2023,
            impact: 15.4,
            doi: "10.1016/S2666-7568(23)00045-7",
            citations: 134,
            category: "assessment",
            abstract: "International consensus on implementing CGA in various healthcare settings.",
            tags: ["CGA", "Assessment", "Guidelines"],
            fullTextAvailable: true
          }
        ];
        
        setArticles(articleData);
        setError(null);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError(err.message || 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []); // Empty dependency array - only run once on mount

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', margin: '20px' }}>
        <h3 style={{ color: '#856404' }}>⚠️ Error Loading Articles</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner" style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading articles...</p>
      </div>
    );
  }
  
  return (
    <div className="articles-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📚 High-Impact Geriatrics Literature</h2>
      
      {/* Search and Filter Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="all">All Categories</option>
          <option value="pharmacology">Pharmacology</option>
          <option value="assessment">Assessment</option>
          <option value="cardiovascular">Cardiovascular</option>
          <option value="neurology">Neurology</option>
          <option value="hospital">Hospital Care</option>
          <option value="prevention">Prevention</option>
        </select>
      </div>

      {/* Article Cards */}
      <div style={{ display: 'grid', gap: '15px' }}>
        {filteredArticles.map((article) => (
          <div 
            key={article.id} 
            className="article-card"
            style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '16px',
                  color: '#2c3e50'
                }}>
                  {article.title}
                </h3>
                
                <p style={{ 
                  margin: '5px 0',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <strong>{article.journal}</strong> • {article.year} • Impact Factor: {article.impact}
                </p>
                
                <p style={{
                  margin: '10px 0',
                  fontSize: '13px',
                  color: '#555',
                  lineHeight: '1.4'
                }}>
                  {article.abstract}
                </p>
                
                <div style={{ display: 'flex', gap: '5px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {article.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      style={{
                        padding: '3px 8px',
                        backgroundColor: '#e7f3ff',
                        color: '#0056b3',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ 
                marginLeft: '20px',
                textAlign: 'center',
                minWidth: '80px'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: article.citations > 200 ? '#28a745' : '#667eea'
                }}>
                  {article.citations}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>citations</div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://doi.org/${article.doi}`, '_blank');
                  }}
                  style={{
                    marginTop: '10px',
                    padding: '6px 12px',
                    backgroundColor: article.fullTextAvailable ? '#28a745' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {article.fullTextAvailable ? '📄 Full Text' : '📝 Abstract'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          color: '#666'
        }}>
          No articles found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default Articles;