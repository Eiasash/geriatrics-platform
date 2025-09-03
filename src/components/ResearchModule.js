import React, { useState } from 'react';

const ResearchModule = ({ language, searchPubMed, generateStatistics }) => {
  const [activeSection, setActiveSection] = useState('pubmed');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [statisticsData, setStatisticsData] = useState('');
  const [statisticsResults, setStatisticsResults] = useState(null);

  const handlePubMedSearch = async () => {
    if (!searchQuery.trim()) {
      alert(language === 'en' ? 'Please enter a search query' : 'אנא הכנס שאילתת חיפוש');
      return;
    }

    setIsSearching(true);
    
    try {
      const results = await searchPubMed(searchQuery, { maxResults: 20 });
      setSearchResults(results);
    } catch (error) {
      console.error('PubMed search failed:', error);
      setSearchResults({
        error: 'Search failed',
        query: searchQuery,
        message: 'Unable to search PubMed at this time'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleStatisticalAnalysis = () => {
    if (!statisticsData.trim()) {
      alert(language === 'en' ? 'Please enter data for analysis' : 'אנא הכנס נתונים לניתוח');
      return;
    }

    try {
      // Parse data (assuming comma-separated numbers)
      const numbers = statisticsData.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
      
      if (numbers.length === 0) {
        alert(language === 'en' ? 'Please enter valid numerical data' : 'אנא הכנס נתונים נומריים תקפים');
        return;
      }

      const results = generateStatistics(numbers);
      setStatisticsResults(results);
    } catch (error) {
      console.error('Statistical analysis failed:', error);
      setStatisticsResults({
        error: 'Analysis failed',
        message: 'Unable to analyze the provided data'
      });
    }
  };

  const renderPubMedSearch = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '📖 PubMed Research' : '📖 מחקר PubMed'}</h3>
      
      <div className="search-interface">
        <div className="search-input-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' 
              ? 'Enter search terms (e.g., "geriatric delirium prevention")'
              : 'הכנס מונחי חיפוש (למשל, "מניעת דליריום גריאטרי")'
            }
            onKeyPress={(e) => e.key === 'Enter' && handlePubMedSearch()}
            disabled={isSearching}
          />
          <button 
            onClick={handlePubMedSearch} 
            disabled={isSearching || !searchQuery.trim()}
            className="search-btn"
          >
            {isSearching 
              ? (language === 'en' ? '🔄 Searching...' : '🔄 מחפש...')
              : (language === 'en' ? '🔍 Search' : '🔍 חפש')
            }
          </button>
        </div>

        <div className="search-suggestions">
          <h4>{language === 'en' ? '💡 Suggested Searches:' : '💡 חיפושים מוצעים:'}</h4>
          <div className="suggestion-buttons">
            {[
              { en: 'geriatric delirium', he: 'דליריום גריאטרי' },
              { en: 'frailty prevention', he: 'מניעת שבירות' },
              { en: 'polypharmacy elderly', he: 'פוליפרמציה קשישים' },
              { en: 'dementia care', he: 'טיפול בדמנציה' },
              { en: 'falls prevention', he: 'מניעת נפילות' }
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(language === 'en' ? suggestion.en : suggestion.he)}
                className="suggestion-btn"
              >
                {language === 'en' ? suggestion.en : suggestion.he}
              </button>
            ))}
          </div>
        </div>
      </div>

      {renderSearchResults()}
    </div>
  );

  const renderSearchResults = () => {
    if (!searchResults) return null;

    if (searchResults.error) {
      return (
        <div className="search-results error">
          <h4>{language === 'en' ? '❌ Search Failed' : '❌ החיפוש נכשל'}</h4>
          <p>{searchResults.message}</p>
        </div>
      );
    }

    return (
      <div className="search-results">
        <h4>
          {language === 'en' 
            ? `📊 Found ${searchResults.count} results for "${searchResults.query}"`
            : `📊 נמצאו ${searchResults.count} תוצאות עבור "${searchResults.query}"`
          }
        </h4>
        
        <div className="results-list">
          {searchResults.papers?.map((paper, index) => (
            <div key={paper.pmid} className="paper-item">
              <div className="paper-header">
                <h5 className="paper-title">{paper.title}</h5>
                <span className="paper-pmid">PMID: {paper.pmid}</span>
              </div>
              
              <div className="paper-details">
                <p className="paper-authors"><strong>Authors:</strong> {paper.authors}</p>
                <p className="paper-journal"><strong>Journal:</strong> {paper.journal}</p>
                <p className="paper-date"><strong>Date:</strong> {paper.pubdate}</p>
                {paper.doi && <p className="paper-doi"><strong>DOI:</strong> {paper.doi}</p>}
              </div>

              <div className="paper-actions">
                <button 
                  className="abstract-btn"
                  onClick={() => window.open(`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}`, '_blank')}
                >
                  {language === 'en' ? '📄 View Abstract' : '📄 צפה בתקציר'}
                </button>
                {paper.doi && (
                  <button 
                    className="fulltext-btn"
                    onClick={() => window.open(`https://doi.org/${paper.doi}`, '_blank')}
                  >
                    {language === 'en' ? '📖 Full Text' : '📖 טקסט מלא'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStatisticalAnalysis = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '📊 Statistical Analysis' : '📊 ניתוח סטטיסטי'}</h3>
      
      <div className="stats-interface">
        <div className="data-input">
          <label>{language === 'en' ? 'Enter data (comma-separated numbers):' : 'הכנס נתונים (מספרים מופרדים בפסיק):'}</label>
          <textarea
            value={statisticsData}
            onChange={(e) => setStatisticsData(e.target.value)}
            placeholder={language === 'en' 
              ? 'Example: 12.5, 13.2, 11.8, 14.1, 12.9, 13.5, 12.3'
              : 'דוגמה: 12.5, 13.2, 11.8, 14.1, 12.9, 13.5, 12.3'
            }
            rows={4}
          />
        </div>

        <div className="sample-datasets">
          <h4>{language === 'en' ? '📋 Sample Datasets:' : '📋 מערכי נתונים לדוגמה:'}</h4>
          <div className="sample-buttons">
            <button 
              onClick={() => setStatisticsData('75, 80, 72, 85, 78, 83, 76, 79, 81, 77')}
              className="sample-btn"
            >
              {language === 'en' ? 'Age at Admission' : 'גיל בקבלה'}
            </button>
            <button 
              onClick={() => setStatisticsData('24, 26, 22, 28, 25, 27, 23, 26, 24, 25')}
              className="sample-btn"
            >
              {language === 'en' ? 'MMSE Scores' : 'ציוני MMSE'}
            </button>
            <button 
              onClick={() => setStatisticsData('5.2, 7.8, 4.6, 6.3, 5.9, 8.1, 6.7, 5.4, 7.2, 6.0')}
              className="sample-btn"
            >
              {language === 'en' ? 'Length of Stay' : 'משך האשפוז'}
            </button>
          </div>
        </div>

        <button onClick={handleStatisticalAnalysis} className="analyze-btn">
          {language === 'en' ? '📈 Analyze Data' : '📈 נתח נתונים'}
        </button>
      </div>

      {renderStatisticalResults()}
    </div>
  );

  const renderStatisticalResults = () => {
    if (!statisticsResults) return null;

    if (statisticsResults.error) {
      return (
        <div className="stats-results error">
          <h4>{language === 'en' ? '❌ Analysis Failed' : '❌ הניתוח נכשל'}</h4>
          <p>{statisticsResults.message}</p>
        </div>
      );
    }

    return (
      <div className="stats-results">
        <h4>{language === 'en' ? '📊 Statistical Results' : '📊 תוצאות סטטיסטיות'}</h4>
        
        <div className="results-grid">
          <div className="result-item">
            <span className="label">{language === 'en' ? 'Sample Size (n):' : 'גודל המדגם (n):'}</span>
            <span className="value">{statisticsResults.count}</span>
          </div>
          
          <div className="result-item">
            <span className="label">{language === 'en' ? 'Mean:' : 'ממוצע:'}</span>
            <span className="value">{statisticsResults.mean}</span>
          </div>
          
          <div className="result-item">
            <span className="label">{language === 'en' ? 'Median:' : 'חציון:'}</span>
            <span className="value">{statisticsResults.median}</span>
          </div>
          
          <div className="result-item">
            <span className="label">{language === 'en' ? 'Standard Deviation:' : 'סטיית תקן:'}</span>
            <span className="value">{statisticsResults.stdDev}</span>
          </div>
          
          <div className="result-item">
            <span className="label">{language === 'en' ? 'Minimum:' : 'מינימום:'}</span>
            <span className="value">{statisticsResults.range.min}</span>
          </div>
          
          <div className="result-item">
            <span className="label">{language === 'en' ? 'Maximum:' : 'מקסימום:'}</span>
            <span className="value">{statisticsResults.range.max}</span>
          </div>
        </div>

        <div className="interpretation">
          <h5>{language === 'en' ? '🔍 Interpretation:' : '🔍 פרשנות:'}</h5>
          <ul>
            <li>
              {language === 'en' 
                ? `The data shows a mean of ${statisticsResults.mean} with a standard deviation of ${statisticsResults.stdDev}`
                : `הנתונים מציגים ממוצע של ${statisticsResults.mean} עם סטיית תקן של ${statisticsResults.stdDev}`
              }
            </li>
            <li>
              {language === 'en' 
                ? `Values range from ${statisticsResults.range.min} to ${statisticsResults.range.max}`
                : `הערכים נעים בין ${statisticsResults.range.min} ל-${statisticsResults.range.max}`
              }
            </li>
            <li>
              {language === 'en' 
                ? `The median value is ${statisticsResults.median}`
                : `הערך החציון הוא ${statisticsResults.median}`
              }
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderManuscriptGenerator = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '📝 Manuscript Generator' : '📝 מחולל כתב יד'}</h3>
      
      <div className="manuscript-form">
        <div className="form-group">
          <label>{language === 'en' ? 'Research Topic:' : 'נושא המחקר:'}</label>
          <input
            type="text"
            placeholder={language === 'en' 
              ? 'e.g., "Delirium prevention in elderly patients"'
              : 'למשל, "מניעת דליריום במטופלים קשישים"'
            }
          />
        </div>

        <div className="form-group">
          <label>{language === 'en' ? 'Study Type:' : 'סוג המחקר:'}</label>
          <select>
            <option value="observational">{language === 'en' ? 'Observational' : 'תצפיתי'}</option>
            <option value="rct">{language === 'en' ? 'Randomized Controlled Trial' : 'ניסוי קליני אקראי'}</option>
            <option value="systematic-review">{language === 'en' ? 'Systematic Review' : 'סקירה שיטתית'}</option>
            <option value="case-control">{language === 'en' ? 'Case-Control' : 'מקרה-ביקורת'}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{language === 'en' ? 'Target Journal:' : 'כתב עת יעד:'}</label>
          <select>
            <option value="jags">Journal of the American Geriatrics Society</option>
            <option value="geriatrics">Geriatrics</option>
            <option value="age-ageing">Age and Ageing</option>
            <option value="jamda">JAMDA</option>
          </select>
        </div>

        <button className="generate-manuscript-btn">
          {language === 'en' ? '🤖 Generate Manuscript Draft' : '🤖 צור טיוטת כתב יד'}
        </button>
      </div>

      <div className="manuscript-templates">
        <h4>{language === 'en' ? '📋 Common Sections:' : '📋 חלקים נפוצים:'}</h4>
        <div className="template-buttons">
          <button className="template-btn">
            {language === 'en' ? '📖 Abstract Template' : '📖 תבנית תקציר'}
          </button>
          <button className="template-btn">
            {language === 'en' ? '🎯 Methods Section' : '🎯 פרק שיטות'}
          </button>
          <button className="template-btn">
            {language === 'en' ? '📊 Results Framework' : '📊 מסגרת תוצאות'}
          </button>
          <button className="template-btn">
            {language === 'en' ? '💭 Discussion Points' : '💭 נקודות דיון'}
          </button>
        </div>
      </div>

      <div className="writing-tips">
        <h4>{language === 'en' ? '✍️ Writing Tips:' : '✍️ טיפים לכתיבה:'}</h4>
        <ul>
          <li>{language === 'en' 
            ? 'Start with a clear research question'
            : 'התחל בשאלת מחקר ברורה'
          }</li>
          <li>{language === 'en' 
            ? 'Follow journal-specific formatting guidelines'
            : 'עקוב אחר הנחיות העיצוב הספציפיות לכתב העת'
          }</li>
          <li>{language === 'en' 
            ? 'Use active voice and concise language'
            : 'השתמש בקול פעיל ובשפה תמציתית'
          }</li>
          <li>{language === 'en' 
            ? 'Ensure statistical accuracy'
            : 'הבטח דיוק סטטיסטי'
          }</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="research-module">
      <div className="section-header">
        <h2>{language === 'en' ? '📊 Research Module' : '📊 מודול מחקר'}</h2>
        <p>{language === 'en' 
          ? 'Research tools for geriatrics fellowship and academic work' 
          : 'כלי מחקר להתמחות גריאטריה ועבודה אקדמית'
        }</p>
      </div>

      <div className="section-nav">
        <button 
          onClick={() => setActiveSection('pubmed')}
          className={activeSection === 'pubmed' ? 'active' : ''}
        >
          {language === 'en' ? '📖 PubMed Search' : '📖 חיפוש PubMed'}
        </button>
        <button 
          onClick={() => setActiveSection('statistics')}
          className={activeSection === 'statistics' ? 'active' : ''}
        >
          {language === 'en' ? '📊 Statistics' : '📊 סטטיסטיקה'}
        </button>
        <button 
          onClick={() => setActiveSection('manuscript')}
          className={activeSection === 'manuscript' ? 'active' : ''}
        >
          {language === 'en' ? '📝 Manuscript' : '📝 כתב יד'}
        </button>
      </div>

      <div className="section-content-container">
        {activeSection === 'pubmed' && renderPubMedSearch()}
        {activeSection === 'statistics' && renderStatisticalAnalysis()}
        {activeSection === 'manuscript' && renderManuscriptGenerator()}
      </div>

      <div className="research-resources">
        <h3>{language === 'en' ? '🔗 Research Resources' : '🔗 משאבי מחקר'}</h3>
        <div className="resources-grid">
          <div className="resource-card">
            <h4>{language === 'en' ? '📚 Databases' : '📚 בסיסי נתונים'}</h4>
            <ul>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer">PubMed</a></li>
              <li><a href="https://www.cochranelibrary.com" target="_blank" rel="noopener noreferrer">Cochrane Library</a></li>
              <li><a href="https://embase.com" target="_blank" rel="noopener noreferrer">Embase</a></li>
              <li><a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
            </ul>
          </div>

          <div className="resource-card">
            <h4>{language === 'en' ? '📊 Statistical Tools' : '📊 כלי סטטיסטיים'}</h4>
            <ul>
              <li><a href="https://www.r-project.org" target="_blank" rel="noopener noreferrer">R Statistical Software</a></li>
              <li><a href="https://www.ibm.com/spss" target="_blank" rel="noopener noreferrer">SPSS</a></li>
              <li><a href="https://www.stata.com" target="_blank" rel="noopener noreferrer">Stata</a></li>
              <li><a href="https://jamovi.org" target="_blank" rel="noopener noreferrer">Jamovi (Free)</a></li>
            </ul>
          </div>

          <div className="resource-card">
            <h4>{language === 'en' ? '✍️ Writing Tools' : '✍️ כלי כתיבה'}</h4>
            <ul>
              <li><a href="https://www.mendeley.com" target="_blank" rel="noopener noreferrer">Mendeley</a></li>
              <li><a href="https://www.zotero.org" target="_blank" rel="noopener noreferrer">Zotero</a></li>
              <li><a href="https://www.grammarly.com" target="_blank" rel="noopener noreferrer">Grammarly</a></li>
              <li><a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer">Overleaf (LaTeX)</a></li>
            </ul>
          </div>

          <div className="resource-card">
            <h4>{language === 'en' ? '📋 Guidelines' : '📋 הנחיות'}</h4>
            <ul>
              <li><a href="https://www.equator-network.org" target="_blank" rel="noopener noreferrer">EQUATOR Network</a></li>
              <li><a href="https://www.consort-statement.org" target="_blank" rel="noopener noreferrer">CONSORT</a></li>
              <li><a href="https://www.strobe-statement.org" target="_blank" rel="noopener noreferrer">STROBE</a></li>
              <li><a href="https://www.prisma-statement.org" target="_blank" rel="noopener noreferrer">PRISMA</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="educational-disclaimer">
        <p>
          {language === 'en' 
            ? '⚠️ Research tools for educational purposes. Verify all data and follow institutional research guidelines.'
            : '⚠️ כלי מחקר למטרות חינוכיות. אמת את כל הנתונים ועקוב אחר הנחיות המחקר המוסדיות.'
          }
        </p>
      </div>
    </div>
  );
};

export default ResearchModule;