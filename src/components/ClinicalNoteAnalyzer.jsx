// Clinical Note Analyzer - NLP-powered note analysis with drug interaction checking
import React, { useState } from 'react';
import { 
  expandAbbreviations, 
  extractMedications, 
  checkDrugInteractions,
  analyzeClinicalNote 
} from '../utils/medicalNLP';

const ClinicalNoteAnalyzer = () => {
  const [noteText, setNoteText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('processed');
  
  // Sample notes for testing
  const sampleNotes = [
    {
      title: 'Admission Note',
      text: `88 y/o male with PMH of DM2, HTN, CHF (EF 35%), CKD stage 3, and recent DVT on warfarin presents with acute SOB and leg edema. 
      
Current medications: Metformin 1000mg BID, Lisinopril 20mg daily, Furosemide 40mg daily, Warfarin 5mg daily, Aspirin 81mg daily.

New prescription: Amiodarone 200mg daily for new-onset AFib.

Labs: Cr 1.8, K 4.2, INR 2.3, HgbA1c 8.2%`
    },
    {
      title: 'Geriatric Consult',
      text: `91 y/o female nursing home resident with advanced dementia, recurrent UTIs, and falls. Currently on Donepezil, Quetiapine 25mg QHS for agitation, Oxybutynin for urinary incontinence, and Lorazepam 0.5mg PRN.
      
Family requesting "something for sleep" as patient is up at night. Also has new diagnosis of osteoporosis, considering bisphosphonate therapy.

Assessment: High anticholinergic burden, polypharmacy, inappropriate medications per Beers criteria.`
    }
  ];
  
  const analyzeNote = () => {
    if (!noteText.trim()) return;
    
    setAnalyzing(true);
    
    setTimeout(() => {
      // Analyze the clinical note
      const result = analyzeClinicalNote(noteText);
      
      // Check for drug interactions
      const interactions = checkDrugInteractions(result.medications);
      
      // Calculate anticholinergic burden
      const acbScore = calculateACB(result.medications);
      
      // Identify Beers Criteria violations
      const beersViolations = checkBeersCriteria(result.medications);
      
      setAnalysis({
        ...result,
        interactions,
        acbScore,
        beersViolations,
        statistics: {
          abbreviationsFound: result.abbreviationsFound.length,
          medicationsExtracted: result.medications.length,
          interactionsFound: interactions.length,
          beersViolations: beersViolations.length
        }
      });
      
      setAnalyzing(false);
    }, 1000);
  };
  
  const calculateACB = (medications) => {
    const acbScores = {
      'oxybutynin': 3,
      'quetiapine': 3,
      'paroxetine': 3,
      'diphenhydramine': 3,
      'amitriptyline': 3,
      'lorazepam': 1,
      'diazepam': 1,
      'furosemide': 1,
      'warfarin': 1,
      'codeine': 1,
      'digoxin': 1,
      'ranitidine': 1
    };
    
    let totalScore = 0;
    const drugsWithScores = [];
    
    medications.forEach(med => {
      const medLower = med.toLowerCase();
      Object.keys(acbScores).forEach(drug => {
        if (medLower.includes(drug)) {
          totalScore += acbScores[drug];
          drugsWithScores.push({ drug: med, score: acbScores[drug] });
        }
      });
    });
    
    return { totalScore, drugs: drugsWithScores };
  };
  
  const checkBeersCriteria = (medications) => {
    const beersDrugs = {
      'lorazepam': 'Benzodiazepines increase risk of cognitive impairment, delirium, falls',
      'diazepam': 'Long-acting benzodiazepine with increased fall risk',
      'quetiapine': 'Antipsychotic - increased mortality in dementia',
      'oxybutynin': 'Highly anticholinergic - avoid in dementia/cognitive impairment',
      'diphenhydramine': 'First-generation antihistamine - highly anticholinergic',
      'amitriptyline': 'Tertiary TCA - highly anticholinergic and sedating',
      'cyclobenzaprine': 'Muscle relaxant - anticholinergic effects, sedation',
      'nitrofurantoin': 'Avoid if CrCl <30, pulmonary toxicity with long-term use',
      'indomethacin': 'Most CNS adverse effects of all NSAIDs',
      'digoxin': 'Avoid doses >0.125mg/day in heart failure'
    };
    
    const violations = [];
    medications.forEach(med => {
      const medLower = med.toLowerCase();
      Object.keys(beersDrugs).forEach(drug => {
        if (medLower.includes(drug)) {
          violations.push({
            medication: med,
            reason: beersDrugs[drug]
          });
        }
      });
    });
    
    return violations;
  };
  
  const highlightText = (text, items, className) => {
    let highlighted = text;
    items.forEach(item => {
      const regex = new RegExp(`\\b${item}\\b`, 'gi');
      highlighted = highlighted.replace(regex, match => 
        `<span class="${className}" title="${item}">${match}</span>`
      );
    });
    return highlighted;
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#667eea', marginBottom: '20px' }}>
        📝 Clinical Note Analyzer - NLP & Drug Safety
      </h2>
      
      {/* Instructions */}
      <div style={{
        backgroundColor: '#e7f3ff',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          <strong>Intelligent note analysis:</strong> Paste or type a clinical note below. 
          The system will automatically expand abbreviations, extract medications (even with typos), 
          check for drug interactions, calculate anticholinergic burden, and flag Beers Criteria violations.
        </p>
      </div>
      
      {/* Sample Notes */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '10px', color: '#495057' }}>Quick Examples:</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {sampleNotes.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setNoteText(sample.text)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e9ecef';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
              }}
            >
              📋 {sample.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Note Input */}
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Paste or type clinical note here... 

Example: Patient with DM2, HTN on metformin, lisinopril. New Rx for amiodarone for AFib. Also on warfarin INR 2.3..."
          style={{
            width: '100%',
            height: '200px',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
            resize: 'vertical'
          }}
        />
        
        <button
          onClick={analyzeNote}
          disabled={!noteText.trim() || analyzing}
          style={{
            marginTop: '10px',
            padding: '12px 30px',
            backgroundColor: analyzing ? '#6c757d' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: analyzing || !noteText.trim() ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {analyzing ? '🔄 Analyzing...' : '🔍 Analyze Clinical Note'}
        </button>
      </div>
      
      {/* Analysis Results */}
      {analysis && (
        <div>
          {/* Statistics Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#495057' }}>
                {analysis.statistics.abbreviationsFound}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Abbreviations</div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: '#e8f5e8',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                {analysis.statistics.medicationsExtracted}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Medications</div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: analysis.statistics.interactionsFound > 0 ? '#ffe4e1' : '#d4edda',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: analysis.statistics.interactionsFound > 0 ? '#dc3545' : '#28a745' 
              }}>
                {analysis.statistics.interactionsFound}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Interactions</div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: analysis.statistics.beersViolations > 0 ? '#fff3cd' : '#d4edda',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: analysis.statistics.beersViolations > 0 ? '#ffc107' : '#28a745' 
              }}>
                {analysis.statistics.beersViolations}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Beers Violations</div>
            </div>
          </div>
          
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #dee2e6',
            marginBottom: '20px'
          }}>
            {['processed', 'medications', 'interactions', 'safety'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #667eea' : '2px solid transparent',
                  color: activeTab === tab ? '#667eea' : '#6c757d',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'processed' ? '📄 Processed Note' :
                 tab === 'medications' ? '💊 Medications' :
                 tab === 'interactions' ? '⚠️ Interactions' :
                 '🛡️ Safety Alerts'}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {/* Processed Note Tab */}
            {activeTab === 'processed' && (
              <div>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>
                  Processed Note with Expanded Abbreviations
                </h3>
                <div 
                  style={{
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}
                  dangerouslySetInnerHTML={{ __html: analysis.expandedText }}
                />
                
                {analysis.abbreviationsFound.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <strong>Abbreviations found:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                      {analysis.abbreviationsFound.map((abbr, idx) => (
                        <span 
                          key={idx}
                          style={{
                            padding: '3px 8px',
                            backgroundColor: '#fff3cd',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}
                        >
                          {abbr.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Medications Tab */}
            {activeTab === 'medications' && (
              <div>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>
                  Extracted Medications
                </h3>
                {analysis.medications.length > 0 ? (
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {analysis.medications.map((med, idx) => (
                      <div 
                        key={idx}
                        style={{
                          padding: '10px',
                          backgroundColor: '#e7f3ff',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                          💊 {med}
                        </span>
                        {analysis.acbScore.drugs.find(d => d.drug.toLowerCase() === med.toLowerCase()) && (
                          <span style={{
                            padding: '2px 8px',
                            backgroundColor: '#fff3cd',
                            borderRadius: '12px',
                            fontSize: '11px'
                          }}>
                            ACB: {analysis.acbScore.drugs.find(d => d.drug.toLowerCase() === med.toLowerCase()).score}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#6c757d' }}>No medications detected in the note.</p>
                )}
                
                {/* Anticholinergic Burden */}
                {analysis.acbScore.totalScore > 0 && (
                  <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: analysis.acbScore.totalScore >= 3 ? '#ffe4e1' : '#fff3cd',
                    borderRadius: '8px',
                    border: `2px solid ${analysis.acbScore.totalScore >= 3 ? '#dc3545' : '#ffc107'}`
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', color: analysis.acbScore.totalScore >= 3 ? '#dc3545' : '#ffc107' }}>
                      Anticholinergic Burden Score: {analysis.acbScore.totalScore}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px' }}>
                      {analysis.acbScore.totalScore >= 3 
                        ? '⚠️ HIGH RISK: Increased risk of confusion, falls, and cognitive decline'
                        : '⚡ MODERATE: Monitor for anticholinergic side effects'}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Interactions Tab */}
            {activeTab === 'interactions' && (
              <div>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>
                  Drug-Drug Interactions
                </h3>
                {analysis.interactions.length > 0 ? (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {analysis.interactions.map((interaction, idx) => (
                      <div 
                        key={idx}
                        style={{
                          padding: '15px',
                          backgroundColor: interaction.severity === 'Major' ? '#ffe4e1' : '#fff3cd',
                          borderRadius: '8px',
                          borderLeft: `4px solid ${interaction.severity === 'Major' ? '#dc3545' : '#ffc107'}`
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{
                            padding: '4px 10px',
                            backgroundColor: interaction.severity === 'Major' ? '#dc3545' : '#ffc107',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginRight: '10px'
                          }}>
                            {interaction.severity}
                          </span>
                          <strong style={{ textTransform: 'capitalize' }}>
                            {interaction.drugs.join(' + ')}
                          </strong>
                        </div>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#495057' }}>
                          {interaction.description}
                        </p>
                        <div style={{
                          marginTop: '10px',
                          padding: '8px',
                          backgroundColor: 'rgba(40, 167, 69, 0.1)',
                          borderRadius: '4px'
                        }}>
                          <strong style={{ fontSize: '12px', color: '#28a745' }}>
                            ✓ Recommendation:
                          </strong>
                          <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#155724' }}>
                            {interaction.recommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#d4edda',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ margin: 0, color: '#155724' }}>
                      ✓ No significant drug interactions detected
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Safety Alerts Tab */}
            {activeTab === 'safety' && (
              <div>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>
                  Beers Criteria & Safety Alerts
                </h3>
                {analysis.beersViolations.length > 0 ? (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {analysis.beersViolations.map((violation, idx) => (
                      <div 
                        key={idx}
                        style={{
                          padding: '15px',
                          backgroundColor: '#fff3cd',
                          borderRadius: '8px',
                          borderLeft: '4px solid #ffc107'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{
                            padding: '4px 10px',
                            backgroundColor: '#ffc107',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginRight: '10px'
                          }}>
                            BEERS
                          </span>
                          <strong style={{ textTransform: 'capitalize' }}>
                            {violation.medication}
                          </strong>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#856404' }}>
                          {violation.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#d4edda',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ margin: 0, color: '#155724' }}>
                      ✓ No Beers Criteria violations detected
                    </p>
                  </div>
                )}
                
                {/* Overall Safety Score */}
                <div style={{
                  marginTop: '20px',
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                    📊 Medication Safety Summary
                  </h4>
                  <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                    <div>
                      <strong>Total Medications:</strong> {analysis.medications.length}
                    </div>
                    <div>
                      <strong>Drug Interactions:</strong> {analysis.interactions.length} 
                      {analysis.interactions.filter(i => i.severity === 'Major').length > 0 && 
                        ` (${analysis.interactions.filter(i => i.severity === 'Major').length} major)`
                      }
                    </div>
                    <div>
                      <strong>Anticholinergic Burden:</strong> {analysis.acbScore.totalScore}
                      {analysis.acbScore.totalScore >= 3 && ' ⚠️ HIGH'}
                    </div>
                    <div>
                      <strong>Beers Violations:</strong> {analysis.beersViolations.length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalNoteAnalyzer;