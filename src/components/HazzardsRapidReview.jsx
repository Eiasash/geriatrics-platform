import React, { useState, useEffect } from 'react';
import { hazzardsDatabase, searchHazzards, getEmergencyProtocol, getDrugDosing } from '../data/hazzardsDatabase';
import './HazzardsRapidReview.css';

const HazzardsRapidReview = ({ defaultSection = 'emergency' }) => {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Load bookmarks from localStorage
    const saved = localStorage.getItem('hazzardsBookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = searchHazzards(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const toggleExpanded = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleBookmark = (item) => {
    const newBookmarks = bookmarks.find(b => b.id === item.id)
      ? bookmarks.filter(b => b.id !== item.id)
      : [...bookmarks, item];
    
    setBookmarks(newBookmarks);
    localStorage.setItem('hazzardsBookmarks', JSON.stringify(newBookmarks));
  };

  const renderEmergencyProtocols = () => {
    const protocols = hazzardsDatabase.emergencyProtocols;
    
    return (
      <div className="hazzards-section">
        <h3 className="section-title">🚨 Emergency Protocols</h3>
        
        {/* Delirium */}
        <div className="protocol-card emergency">
          <h4 className="protocol-title">{protocols.delirium.title}</h4>
          
          <div className="cam-criteria">
            <strong>CAM Criteria:</strong>
            <div className="criteria-box">{protocols.delirium.cam.criteria}</div>
          </div>
          
          <div className="orders-section">
            <strong>Immediate Orders:</strong>
            <ul className="orders-list">
              {protocols.delirium.orders.map((order, idx) => (
                <li key={idx} className="order-item">{order}</li>
              ))}
            </ul>
          </div>
          
          <div className="mnemonic-section">
            <strong>{protocols.delirium.mnemonic.title}:</strong>
            <div className="mnemonic-list">
              {protocols.delirium.mnemonic.items.map((item, idx) => (
                <div key={idx} className="mnemonic-item">{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Falls */}
        <div className="protocol-card">
          <h4 className="protocol-title">{protocols.falls.title}</h4>
          
          <div className="assessment-box">
            <div className="timed-up-go">
              <strong>Timed Up & Go:</strong> {protocols.falls.assessment.timedUpAndGo}
            </div>
            
            <strong>Assessment Checklist:</strong>
            <ul className="checklist">
              {protocols.falls.assessment.checks.map((check, idx) => (
                <li key={idx}>{check}</li>
              ))}
            </ul>
          </div>
          
          <div className="risk-meds">
            <strong>High-Risk Medications:</strong>
            <div className="med-list">
              {protocols.falls.highRiskMeds.map((med, idx) => (
                <span key={idx} className="risk-med">{med}</span>
              ))}
            </div>
          </div>
          
          <div className="red-flag-box">
            ⚠️ {protocols.falls.redFlag}
          </div>
        </div>

        {/* Polypharmacy */}
        <div className="protocol-card">
          <h4 className="protocol-title">{protocols.polypharmacy.title}</h4>
          
          <div className="dangerous-combos">
            {protocols.polypharmacy.dangerousCombos.map((combo, idx) => (
              <div key={idx} className="combo-item">
                <div className="combo-drug">{combo.drugs}</div>
                <div className="combo-effect">→ {combo.effect}</div>
                <div className="combo-alternative">Alt: {combo.alternative}</div>
              </div>
            ))}
          </div>
          
          <div className="beers-list">
            <strong>Beers Criteria Top 5:</strong>
            <ol className="beers-items">
              {protocols.polypharmacy.beersTop5.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  };

  const renderCoreTopics = () => {
    const topics = hazzardsDatabase.coreTopics;
    
    return (
      <div className="hazzards-section">
        <h3 className="section-title">📚 Core Topics</h3>
        
        {Object.entries(topics).map(([key, topic]) => (
          <div key={key} className="topic-card">
            <h4 
              className="topic-title expandable"
              onClick={() => toggleExpanded(key)}
            >
              {topic.title}
              <span className="expand-icon">
                {expandedItems[key] ? '▼' : '▶'}
              </span>
            </h4>
            
            {expandedItems[key] && (
              <div className="topic-content">
                {renderTopicContent(topic)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTopicContent = (topic) => {
    return Object.entries(topic).map(([key, value]) => {
      if (key === 'title') return null;
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div key={key} className="topic-subsection">
            <strong className="subsection-title">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
            </strong>
            {renderValue(value)}
          </div>
        );
      }
      
      return (
        <div key={key} className="topic-item">
          <strong>{key}:</strong> {renderValue(value)}
        </div>
      );
    });
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <ul className="value-list">
          {value.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    
    if (typeof value === 'object') {
      return (
        <div className="value-object">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="object-item">
              <span className="object-key">{k}:</span>
              <span className="object-value">{typeof v === 'object' ? renderValue(v) : v}</span>
            </div>
          ))}
        </div>
      );
    }
    
    return value;
  };

  const renderQuickDosing = () => {
    const dosing = hazzardsDatabase.quickDosing;
    
    return (
      <div className="hazzards-section">
        <h3 className="section-title">💊 Geriatric Dosing</h3>
        
        <div className="dosing-principles">
          <h4>Key Principles:</h4>
          <ul className="principles-list">
            {dosing.principles.map((principle, idx) => (
              <li key={idx} className="principle-item">{principle}</li>
            ))}
          </ul>
        </div>
        
        <div className="dosing-table">
          <h4>Common Adjustments:</h4>
          {Object.entries(dosing.commonAdjustments).map(([drug, info]) => (
            <div key={drug} className="drug-dosing-card">
              <div className="drug-name">{drug.charAt(0).toUpperCase() + drug.slice(1)}</div>
              <div className="dosing-info">
                {Object.entries(info).map(([key, value]) => (
                  <div key={key} className="dosing-row">
                    <span className="dosing-label">{key}:</span>
                    <span className="dosing-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAssessmentTools = () => {
    const tools = hazzardsDatabase.assessmentTools;
    
    return (
      <div className="hazzards-section">
        <h3 className="section-title">📋 Assessment Tools</h3>
        
        {Object.entries(tools).map(([category, categoryTools]) => (
          <div key={category} className="assessment-category">
            <h4 className="category-title">
              {category.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + 
               category.replace(/([A-Z])/g, ' $1').slice(1)}
            </h4>
            
            <div className="tools-grid">
              {Object.entries(categoryTools).map(([toolName, tool]) => (
                <div key={toolName} className="tool-card">
                  <div className="tool-name">{toolName.toUpperCase()}</div>
                  {renderValue(tool)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRedFlags = () => {
    const redFlags = hazzardsDatabase.redFlags;
    
    return (
      <div className="hazzards-section">
        <h3 className="section-title">🚩 {redFlags.title}</h3>
        
        <div className="red-flags-grid">
          {redFlags.critical.map((flag, idx) => (
            <div key={idx} className="red-flag-card">
              <div className="flag-presentation">{flag.presentation}</div>
              <div className="flag-consider">
                <strong>Consider:</strong> {flag.consider}
              </div>
              <div className="flag-action">
                <strong>Action:</strong> {flag.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPearls = () => {
    const pearls = hazzardsDatabase.pearls;
    
    return (
      <div className="hazzards-section">
        <h3 className="section-title">💎 {pearls.title}</h3>
        
        <div className="pearls-list">
          {pearls.highYield.map((pearl, idx) => (
            <div key={idx} className="pearl-item">
              <span className="pearl-number">{idx + 1}.</span>
              <span className="pearl-text">{pearl}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuickProtocols = () => {
    const protocols = hazzardsDatabase.quickProtocols;
    
    return (
      <div className="hazzards-section">
        <h3 className="section-title">📝 Quick Protocols</h3>
        
        {Object.entries(protocols).map(([key, protocol]) => (
          <div key={key} className="quick-protocol">
            <h4 className="protocol-header">{protocol.title}</h4>
            <div className="protocol-items">
              {(protocol.orders || protocol.items).map((item, idx) => (
                <div key={idx} className="protocol-item">
                  <input type="checkbox" id={`${key}-${idx}`} />
                  <label htmlFor={`${key}-${idx}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const sections = {
    emergency: { label: '🚨 Emergency', render: renderEmergencyProtocols },
    core: { label: '📚 Core Topics', render: renderCoreTopics },
    dosing: { label: '💊 Dosing', render: renderQuickDosing },
    assessment: { label: '📋 Assessment', render: renderAssessmentTools },
    redflags: { label: '🚩 Red Flags', render: renderRedFlags },
    pearls: { label: '💎 Pearls', render: renderPearls },
    protocols: { label: '📝 Protocols', render: renderQuickProtocols }
  };

  return (
    <div className="hazzards-rapid-review">
      <div className="hazzards-header">
        <h2 className="hazzards-title">Hazzard's Geriatrics - Rapid Review</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Quick search (e.g., delirium, dosing, CAM)..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="hazzards-search"
          />
        </div>
      </div>

      <div className="hazzards-nav">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            className={`nav-button ${activeSection === key ? 'active' : ''}`}
            onClick={() => setActiveSection(key)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {searchQuery && searchResults.length > 0 ? (
        <div className="search-results">
          <h3>Search Results:</h3>
          {searchResults.map((result, idx) => (
            <div key={idx} className="search-result">
              <div className="result-path">{result.path}</div>
              <div className="result-value">{result.value}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="hazzards-content">
          {sections[activeSection].render()}
        </div>
      )}

      {bookmarks.length > 0 && (
        <div className="bookmarks-section">
          <h4>📌 Bookmarked Items</h4>
          <div className="bookmarks-list">
            {bookmarks.map((bookmark, idx) => (
              <div key={idx} className="bookmark-item">
                {bookmark.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HazzardsRapidReview;