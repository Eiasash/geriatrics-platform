import React, { useState } from 'react';
import Day1Guide from '../../data/Day1Guide';
import GeriatricMedications from '../../data/GeriatricMedications';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="dashboard-grid">
      {/* Hero Section */}
      <div className="hero-card">
        <h1>Geriatrics Excellence Platform</h1>
        <p>Shaare Zedek Medical Center</p>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-number">150</span>
            <span className="stat-label">Board Questions</span>
          </div>
          <div className="stat">
            <span className="stat-number">51</span>
            <span className="stat-label">Medications</span>
          </div>
          <div className="stat">
            <span className="stat-number">10</span>
            <span className="stat-label">Protocols</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button 
          className="action-card emergency"
          onClick={() => window.location.href = '#protocols/delirium'}
        >
          <span className="icon">🚨</span>
          <span className="label">PANIC Protocol</span>
        </button>
        <button 
          className="action-card"
          onClick={() => setActiveSection('drugs')}
        >
          <span className="icon">💊</span>
          <span className="label">Drug Lookup</span>
        </button>
        <button 
          className="action-card"
          onClick={() => window.location.href = '#calculator'}
        >
          <span className="icon">📊</span>
          <span className="label">Risk Calculator</span>
        </button>
        <button 
          className="action-card"
          onClick={() => window.location.href = '#assistant'}
        >
          <span className="icon">🤖</span>
          <span className="label">AI Assistant</span>
        </button>
      </div>

      {/* Day 1 Guide */}
      <div className="guide-card">
        <h2>📅 Day 1 Timeline</h2>
        <div className="timeline">
          {Object.entries(Day1Guide.timeline).map(([time, task]) => (
            <div 
              className={`timeline-item ${selectedTime === time ? 'active' : ''}`} 
              key={time}
              onClick={() => setSelectedTime(time)}
            >
              <span className="time">{time}</span>
              <span className="task">{task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Must Know Section */}
      <div className="must-know-card">
        <h2>🧠 Must Know Cold</h2>
        <div className="must-know-tabs">
          {Object.entries(Day1Guide.mustKnowCold).map(([title, content]) => (
            <div key={title} className="knowledge-section">
              <h3>{title}</h3>
              <ul>
                {content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Rounds Presentation Template */}
      <div className="rounds-card">
        <h2>🏥 Rounds Presentation</h2>
        <div className="template-box">
          <p><strong>Template:</strong> {Day1Guide.roundsPresentation.template}</p>
          <p><strong>Example:</strong> {Day1Guide.roundsPresentation.example}</p>
        </div>
        <div className="systems-review">
          <h3>Systems Review</h3>
          <ul>
            {Day1Guide.roundsPresentation.systems.map((system, idx) => (
              <li key={idx}>{system}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hebrew Phrases */}
      <div className="hebrew-card">
        <h2>🇮🇱 Hebrew Phrases</h2>
        <div className="phrases-grid">
          {Object.entries(Day1Guide.hebrewPhrases).map(([english, hebrew]) => (
            <div key={english} className="phrase-item">
              <span className="english">{english}</span>
              <span className="hebrew">{hebrew}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;