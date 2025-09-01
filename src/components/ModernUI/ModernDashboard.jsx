import React, { useState } from 'react';
import GeriatricProtocols from '../../protocols/GeriatricProtocols';
import './ModernDashboard.css';

const ModernDashboard = () => {
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [expandedMed, setExpandedMed] = useState(null);

  const protocolButtons = [
    { key: 'delirium', icon: '🚨', label: 'Delirium', urgent: true },
    { key: 'falls', icon: '🏥', label: 'Falls' },
    { key: 'polypharmacy', icon: '💊', label: 'Polypharmacy' },
    { key: 'admission', icon: '📋', label: 'Admission' },
    { key: 'capacity', icon: '🧠', label: 'Capacity' },
    { key: 'codeStatus', icon: '💬', label: 'Code Status' },
    { key: 'uti', icon: '🔬', label: 'UTI' },
    { key: 'pressureUlcer', icon: '🩹', label: 'Pressure Ulcer' },
    { key: 'constipation', icon: '💩', label: 'Constipation' },
    { key: 'acutePain', icon: '⚡', label: 'Pain' }
  ];

  return (
    <div className="modern-dashboard">
      {/* Quick Protocol Access */}
      <div className="protocol-grid">
        {protocolButtons.map(btn => (
          <button
            key={btn.key}
            className={`protocol-btn ${btn.urgent ? 'urgent' : ''} ${activeProtocol?.key === btn.key ? 'active' : ''}`}
            onClick={() => setActiveProtocol({ ...GeriatricProtocols[btn.key], key: btn.key })}
          >
            <span className="icon">{btn.icon}</span>
            <span className="label">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Active Protocol Display */}
      {activeProtocol && (
        <div className="protocol-display">
          <h2>{activeProtocol.title}</h2>
          
          {/* Render protocol sections dynamically */}
          {Object.entries(activeProtocol).map(([key, value]) => {
            if (key === 'title' || key === 'key') return null;
            
            return (
              <div key={key} className="protocol-section">
                <h3>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                {renderProtocolContent(value)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  function renderProtocolContent(content) {
    if (Array.isArray(content)) {
      return (
        <ul>
          {content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    
    if (typeof content === 'object') {
      return (
        <div className="nested-content">
          {Object.entries(content).map(([k, v]) => (
            <div key={k} className="content-item">
              <strong>{k}:</strong>
              {typeof v === 'string' ? <span> {v}</span> : renderProtocolContent(v)}
            </div>
          ))}
        </div>
      );
    }
    
    return <p>{content}</p>;
  }
};

export default ModernDashboard;