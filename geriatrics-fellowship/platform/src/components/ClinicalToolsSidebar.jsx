// Clinical Tools Sidebar - Right Side Panel
// Provides quick access to clinical tools, calculators, and decision support

import React, { useState, useEffect } from 'react';
import { mockDrugs } from '../data/mockData.js';

export const ClinicalToolsSidebar = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('drugs');
  const [drugSearchQuery, setDrugSearchQuery] = useState('');
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [interactionCheck, setInteractionCheck] = useState({ drugs: '', results: [] });

  const searchDrugs = (query) => {
    if (!query) {
      setDrugSearchResults([]);
      return;
    }

    // Filter from our mock drug database
    const results = mockDrugs.filter(drug => 
      drug.name.toLowerCase().includes(query.toLowerCase()) ||
      drug.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setDrugSearchResults(results);
  };

  const handleDrugSearch = (query) => {
    setDrugSearchQuery(query);
    searchDrugs(query);
  };

  const checkDrugInteractions = (drugString) => {
    if (!drugString) return [];
    
    const drugs = drugString.split(',').map(d => d.trim().toLowerCase());
    const interactions = [];

    // Simple interaction checker using mock data
    if (drugs.includes('warfarin') && drugs.includes('aspirin')) {
      interactions.push({
        severity: 'Major',
        description: 'Increased bleeding risk with anticoagulant + antiplatelet',
        recommendation: 'Monitor for bleeding, consider PPI protection'
      });
    }

    if (drugs.includes('digoxin') && drugs.includes('furosemide')) {
      interactions.push({
        severity: 'Major',
        description: 'Hypokalemia from furosemide increases digoxin toxicity risk',
        recommendation: 'Monitor potassium and digoxin levels closely'
      });
    }

    if (drugs.includes('metformin') && (drugs.includes('furosemide') || drugs.includes('contrast'))) {
      interactions.push({
        severity: 'Moderate',
        description: 'Increased risk of lactic acidosis with renal impairment',
        recommendation: 'Monitor renal function, hold metformin if contrast used'
      });
    }

    return interactions;
  };

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: '320px',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderLeft: '1px solid #e9ecef',
      boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
      overflowY: 'auto',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: '#28a745',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1001
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
            🛠️ Clinical Tools
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
          { id: 'drugs', label: '💊 Drugs', title: 'Drug Tools' },
          { id: 'calc', label: '🧮 Calc', title: 'Calculators' },
          { id: 'assess', label: '📊 Assess', title: 'Assessment Tools' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Clinical tab clicked:', tab.id);
              setActiveSection(tab.id);
            }}
            style={{
              flex: 1,
              padding: '10px 4px',
              border: 'none',
              backgroundColor: activeSection === tab.id ? 'white' : 'transparent',
              borderBottom: activeSection === tab.id ? '2px solid #28a745' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: activeSection === tab.id ? 'bold' : 'normal',
              color: activeSection === tab.id ? '#28a745' : '#666'
            }}
            title={tab.title}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Drug Tools */}
        {activeSection === 'drugs' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Drug Information Tools
            </h3>
            
            {/* Drug Search */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#495057' }}>
                💊 Drug Lookup
              </h4>
              <input
                type="text"
                value={drugSearchQuery}
                onChange={(e) => handleDrugSearch(e.target.value)}
                placeholder="Search medications..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px',
                  boxSizing: 'border-box'
                }}
              />
              
              {drugSearchResults.length > 0 && (
                <div style={{ marginTop: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                  {drugSearchResults.map((drug, idx) => (
                    <div key={idx} style={{
                      padding: '10px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      border: '1px solid #e9ecef',
                      marginBottom: '6px',
                      fontSize: '12px'
                    }}>
                      <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{drug.name}</div>
                      <div style={{ fontSize: '11px', color: '#6c757d' }}>Category: {drug.category}</div>
                      <div style={{ fontSize: '11px', color: '#6c757d' }}>Elderly: {drug.elderlyConsiderations}</div>
                      <div style={{ fontSize: '11px', color: drug.renalAdjustment?.includes('Contraindicated') ? '#dc3545' : '#28a745' }}>
                        Renal: {drug.renalAdjustment}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {drugSearchQuery && drugSearchResults.length === 0 && (
                <div style={{
                  marginTop: '8px',
                  padding: '10px',
                  backgroundColor: '#f8d7da',
                  borderRadius: '4px',
                  border: '1px solid #f5c6cb',
                  fontSize: '12px',
                  color: '#721c24'
                }}>
                  No drugs found. Try "warfarin", "digoxin", "metformin", etc.
                </div>
              )}
            </div>

            {/* Drug Interactions */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#495057' }}>
                ⚠️ Interaction Checker
              </h4>
              <input
                type="text"
                value={interactionCheck.drugs}
                onChange={(e) => {
                  const value = e.target.value;
                  setInteractionCheck({
                    drugs: value,
                    results: checkDrugInteractions(value)
                  });
                }}
                placeholder="Enter drugs separated by commas..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px',
                  boxSizing: 'border-box'
                }}
              />
              
              {interactionCheck.results.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  {interactionCheck.results.map((interaction, idx) => (
                    <div key={idx} style={{
                      padding: '10px',
                      backgroundColor: interaction.severity === 'Major' ? '#f8d7da' : '#fff3cd',
                      borderRadius: '4px',
                      border: `1px solid ${interaction.severity === 'Major' ? '#f5c6cb' : '#ffeaa7'}`,
                      marginBottom: '6px',
                      fontSize: '12px'
                    }}>
                      <div style={{ fontWeight: 'bold', color: interaction.severity === 'Major' ? '#721c24' : '#856404' }}>
                        ⚠️ {interaction.severity} Interaction
                      </div>
                      <div style={{ fontSize: '11px', color: interaction.severity === 'Major' ? '#721c24' : '#856404', marginTop: '4px' }}>
                        {interaction.description}
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#155724', 
                        marginTop: '4px',
                        padding: '4px',
                        backgroundColor: 'rgba(212, 237, 218, 0.3)',
                        borderRadius: '2px'
                      }}>
                        <strong>Recommendation:</strong> {interaction.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {interactionCheck.drugs && interactionCheck.results.length === 0 && (
                <div style={{ 
                  marginTop: '8px',
                  padding: '10px',
                  backgroundColor: '#d4edda',
                  borderRadius: '4px',
                  border: '1px solid #c3e6cb',
                  fontSize: '12px',
                  color: '#155724'
                }}>
                  ✓ No significant interactions found
                </div>
              )}

              <div style={{ marginTop: '12px', fontSize: '11px', color: '#6c757d' }}>
                Try: "warfarin, aspirin" or "digoxin, furosemide"
              </div>
            </div>
          </div>
        )}

        {/* Calculators */}
        {activeSection === 'calc' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Clinical Calculators
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#2c3e50' }}>
                  🧮 Creatinine Clearance
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                  Cockcroft-Gault Formula
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#2c3e50' }}>
                  💓 CHA₂DS₂-VASc
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                  Stroke Risk in Atrial Fibrillation
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#2c3e50' }}>
                  🚶 Timed Up & Go
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                  Fall Risk Assessment
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Tools */}
        {activeSection === 'assess' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Assessment Tools
            </h3>
            
            <div style={{ display: 'grid', gap: '8px', fontSize: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                <strong>CAM:</strong> Confusion Assessment Method
              </div>
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                <strong>GDS:</strong> Geriatric Depression Scale
              </div>
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                <strong>MoCA:</strong> Montreal Cognitive Assessment
              </div>
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                <strong>Barthel:</strong> Functional Status Index
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalToolsSidebar;