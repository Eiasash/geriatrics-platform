// src/components/Dashboard/ModernDashboard.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/modern-design.css';
import GeriatricMedications from '../../data/GeriatricMedications';
import Day1Guide from '../Day1Guide/Day1Guide';
import ClinicalAssistant from '../ClinicalAssistant/ClinicalAssistant';

const ModernDashboard = () => {
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  
  // Stats for the dashboard
  const stats = {
    questions: 150,
    medications: Object.keys(GeriatricMedications.cardiovascular).length + 
                Object.keys(GeriatricMedications.anticoagulation).length +
                Object.keys(GeriatricMedications.psychiatric).length +
                Object.keys(GeriatricMedications.diabetes).length +
                Object.keys(GeriatricMedications.analgesics).length +
                Object.keys(GeriatricMedications.gastrointestinal).length +
                Object.keys(GeriatricMedications.antibiotics).length +
                Object.keys(GeriatricMedications.other).length,
    protocols: 10,
    calculators: 6
  };

  // Drug search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = GeriatricMedications.quickLookup(searchQuery);
      setDrugSearchResults(results);
    } else {
      setDrugSearchResults([]);
    }
  }, [searchQuery]);

  // Emergency protocols
  const emergencyProtocols = {
    delirium: {
      title: "Acute Delirium",
      immediate: [
        "CAM assessment",
        "Check vitals, O2 sat",
        "Review medications",
        "Order: UA, CBC, BMP",
        "Stop anticholinergics/benzos",
        "If agitated: Haldol 0.25mg"
      ]
    },
    fall: {
      title: "Fall with Injury",
      immediate: [
        "Trauma assessment",
        "Check anticoagulation status",
        "Neuro exam if head trauma",
        "Orthostatic vitals",
        "CT head if on anticoag",
        "Document thoroughly"
      ]
    },
    chestPain: {
      title: "Chest Pain",
      immediate: [
        "EKG within 10 minutes",
        "Troponin, CBC, BMP",
        "CXR",
        "Aspirin 325mg if not contraindicated",
        "Oxygen if <94%",
        "Call cardiology if STEMI"
      ]
    },
    dyspnea: {
      title: "Acute Dyspnea",
      immediate: [
        "Check O2 sat, ABG if <90%",
        "CXR stat",
        "BNP, troponin",
        "EKG",
        "Consider PE if risk factors",
        "Lasix 40mg IV if CHF suspected"
      ]
    }
  };

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <div className="hero-card">
        <h1>Geriatrics Excellence Platform</h1>
        <p>Shaare Zedek Medical Center - Fellowship Program</p>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-number">{stats.questions}</span>
            <span className="stat-label">Board Questions</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.medications}</span>
            <span className="stat-label">Medications</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.protocols}</span>
            <span className="stat-label">Protocols</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.calculators}</span>
            <span className="stat-label">Calculators</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="quick-actions">
        <button 
          className="action-card emergency"
          onClick={() => setShowEmergency(true)}
        >
          <span className="icon">🚨</span>
          <span className="label">PANIC Protocol</span>
          <div className="notification-badge">!</div>
        </button>
        <button 
          className="action-card"
          onClick={() => setActiveView('drugs')}
        >
          <span className="icon">💊</span>
          <span className="label">Drug Lookup</span>
        </button>
        <button 
          className="action-card"
          onClick={() => setActiveView('calculator')}
        >
          <span className="icon">📊</span>
          <span className="label">Risk Calculator</span>
        </button>
        <button 
          className="action-card"
          onClick={() => setActiveView('assistant')}
        >
          <span className="icon">🤖</span>
          <span className="label">AI Assistant</span>
        </button>
        <button 
          className="action-card"
          onClick={() => setActiveView('day1')}
        >
          <span className="icon">📚</span>
          <span className="label">Day 1 Guide</span>
        </button>
        <button 
          className="action-card"
          onClick={() => setActiveView('protocols')}
        >
          <span className="icon">📋</span>
          <span className="label">Protocols</span>
        </button>
      </div>

      {/* Recent Updates */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📢 Recent Updates</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="timeline-item">
            <span className="time">Today</span>
            <span className="task">New: Complete medication database with Israeli names</span>
          </div>
          <div className="timeline-item">
            <span className="time">Yesterday</span>
            <span className="task">Updated: Delirium protocol with latest guidelines</span>
          </div>
          <div className="timeline-item">
            <span className="time">This Week</span>
            <span className="task">Added: Day 1 survival guide with Hebrew phrases</span>
          </div>
        </div>
      </div>
    </>
  );

  const renderDrugLookup = () => (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">💊 Geriatric Drug Lookup</h2>
        <button 
          className="button-secondary"
          onClick={() => setActiveView('home')}
        >
          Back to Home
        </button>
      </div>
      
      <div className="input-group">
        <input
          type="text"
          className="input-field"
          placeholder="Search medication (generic or Israeli brand)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Search Results */}
      {drugSearchResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>
            Search Results ({drugSearchResults.length})
          </h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {drugSearchResults.map((result, idx) => (
              <div 
                key={idx}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDrug(result)}
              >
                <h4 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>
                  {result.name} ({result.data.israeli})
                </h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="risk-badge risk-moderate">
                    {result.category}
                  </span>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    Start: {result.data.elderlyStart}
                  </span>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    Max: {result.data.elderlyMax}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Drug Details */}
      {selectedDrug && (
        <div className="card" style={{ marginTop: '20px', border: '2px solid var(--primary)' }}>
          <div className="card-header">
            <h3 className="card-title">
              {selectedDrug.name} - {selectedDrug.data.israeli}
            </h3>
            <button 
              className="button-secondary"
              onClick={() => setSelectedDrug(null)}
              style={{ padding: '8px 16px' }}
            >
              Close
            </button>
          </div>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {Object.entries(selectedDrug.data).map(([key, value]) => (
              <div key={key} style={{ 
                padding: '10px',
                background: 'rgba(99, 102, 241, 0.05)',
                borderRadius: '8px'
              }}>
                <strong style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </strong>
                <span style={{ marginLeft: '10px' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Reference Categories */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>
          Browse by Category
        </h3>
        <div className="quick-actions">
          {Object.keys(GeriatricMedications).filter(key => typeof GeriatricMedications[key] === 'object').map(category => (
            <button
              key={category}
              className="action-card"
              onClick={() => {
                setSearchQuery('');
                setDrugSearchResults(
                  Object.keys(GeriatricMedications[category]).map(drug => ({
                    name: drug,
                    category: category,
                    data: GeriatricMedications[category][drug]
                  }))
                );
              }}
            >
              <span className="label" style={{ textTransform: 'capitalize' }}>
                {category}
              </span>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>
                {Object.keys(GeriatricMedications[category]).length} drugs
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmergencyModal = () => (
    showEmergency && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}>
        <div className="card" style={{ 
          maxWidth: '800px',
          maxHeight: '90vh',
          overflow: 'auto',
          border: '3px solid var(--danger)'
        }}>
          <div className="card-header" style={{ background: 'var(--danger)', color: 'white' }}>
            <h2 style={{ color: 'white' }}>🚨 EMERGENCY PROTOCOLS</h2>
            <button 
              onClick={() => setShowEmergency(false)}
              style={{
                background: 'white',
                color: 'var(--danger)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
          
          <div style={{ padding: '20px' }}>
            {Object.entries(emergencyProtocols).map(([key, protocol]) => (
              <div key={key} style={{
                marginBottom: '25px',
                padding: '20px',
                background: 'rgba(239, 68, 68, 0.05)',
                borderRadius: '12px',
                borderLeft: '4px solid var(--danger)'
              }}>
                <h3 style={{ color: 'var(--danger)', marginBottom: '15px' }}>
                  {protocol.title}
                </h3>
                <ol style={{ paddingLeft: '20px' }}>
                  {protocol.immediate.map((step, idx) => (
                    <li key={idx} style={{ 
                      marginBottom: '8px',
                      fontWeight: idx === 0 ? 'bold' : 'normal'
                    }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
            
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '12px',
              textAlign: 'center',
              borderLeft: '4px solid var(--warning)'
            }}>
              <strong style={{ fontSize: '18px', color: 'var(--warning)' }}>
                ⚠️ Remember: When in doubt, CALL YOUR SENIOR!
              </strong>
              <br />
              <span style={{ fontSize: '14px', marginTop: '10px', display: 'block' }}>
                Better to ask for help than to make a mistake
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="container">
      {activeView === 'home' && renderHome()}
      {activeView === 'drugs' && renderDrugLookup()}
      {activeView === 'day1' && <Day1Guide />}
      {activeView === 'assistant' && <ClinicalAssistant />}
      
      {activeView === 'calculator' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">📊 Risk Calculators</h2>
            <button 
              className="button-secondary"
              onClick={() => setActiveView('home')}
            >
              Back to Home
            </button>
          </div>
          <p style={{ padding: '20px', textAlign: 'center' }}>
            Risk calculator components are available in the platform.
            Access through the Clinical Tools section.
          </p>
        </div>
      )}
      
      {activeView === 'protocols' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">📋 Clinical Protocols</h2>
            <button 
              className="button-secondary"
              onClick={() => setActiveView('home')}
            >
              Back to Home
            </button>
          </div>
          <p style={{ padding: '20px', textAlign: 'center' }}>
            All 10 geriatric protocols are integrated into the Clinical Assistant.
            Access them through the AI Assistant quick buttons.
          </p>
        </div>
      )}
      
      {renderEmergencyModal()}
    </div>
  );
};

export default ModernDashboard;