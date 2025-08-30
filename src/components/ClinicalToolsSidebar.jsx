// Clinical Tools Sidebar - Right Side Panel
// Provides quick access to clinical tools, calculators, and decision support

import React, { useState, useEffect } from 'react';
import { MedicalTerminologyParser } from '../utils/medicalTerminologyParser.js';

export const ClinicalToolsSidebar = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('quick-tools');
  const [medParser] = useState(() => new MedicalTerminologyParser());
  const [pimpQuestion, setPimpQuestion] = useState(null);
  const [currentCase, setCurrentCase] = useState(null);
  const [drugSearchQuery, setDrugSearchQuery] = useState('');
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [interactionCheck, setInteractionCheck] = useState({ drugs: '', results: [] });
  const [renalDosing, setRenalDosing] = useState({ drug: '', gfr: '', dose: null });

  useEffect(() => {
    generatePimpQuestion();
    loadCaseSimulator();
  }, []);

  // Pimp Question Generator
  const pimpQuestions = [
    {
      category: 'Geriatric Syndromes',
      question: 'What are the 4 key features of the CAM (Confusion Assessment Method) for delirium diagnosis?',
      answer: '1) Acute onset and fluctuating course, 2) Inattention, 3) Disorganized thinking, 4) Altered level of consciousness. Features 1+2 plus either 3 or 4 = delirium.',
      difficulty: 'Intermediate'
    },
    {
      category: 'Pharmacology',
      question: 'Why are benzodiazepines potentially inappropriate in elderly according to Beers Criteria?',
      answer: 'Increased risk of cognitive impairment, delirium, falls, fractures, and motor vehicle crashes. Elderly have increased sensitivity due to age-related changes in pharmacokinetics.',
      difficulty: 'Basic'
    },
    {
      category: 'Cardiovascular',
      question: 'What is the target blood pressure for a healthy 75-year-old per SPRINT trial findings?',
      answer: 'Systolic <120 mmHg showed reduced CV events and mortality, but increased hypotension and AKI. Individualize based on frailty, comorbidities, and patient preferences.',
      difficulty: 'Advanced'
    },
    {
      category: 'Cognitive Assessment',
      question: 'What MoCA score suggests mild cognitive impairment?',
      answer: 'MoCA score 18-25 suggests mild cognitive impairment (adjust +1 for ≤12 years education). Normal is ≥26. MMSE cutoff is 24.',
      difficulty: 'Basic'
    },
    {
      category: 'Falls Prevention',
      question: 'Name 3 evidence-based fall prevention interventions with proven efficacy.',
      answer: '1) Exercise programs (balance/strength training, tai chi), 2) Medication review and modification, 3) Vitamin D supplementation if deficient, 4) Multifactorial risk assessment and intervention.',
      difficulty: 'Intermediate'
    },
    {
      category: 'Polypharmacy',
      question: 'What is the STOPP/START criteria used for?',
      answer: 'STOPP identifies potentially inappropriate prescribing, START identifies prescribing omissions. European tool complementing Beers Criteria for medication optimization in elderly.',
      difficulty: 'Intermediate'
    }
  ];

  const clinicalCases = [
    {
      id: 1,
      title: 'Delirium in ED',
      scenario: '82-year-old woman brought by daughter for confusion x 2 days. Usually independent, now unable to recognize daughter. Vitals: BP 140/90, HR 110, T 38.2°C, O2sat 94%.',
      questions: [
        'What is your differential diagnosis?',
        'What immediate workup would you order?',
        'How would you assess for delirium?'
      ],
      keyPoints: [
        'Acute change in mental status = delirium until proven otherwise',
        'Look for underlying precipitants (infection, medications, metabolic)',
        'Use CAM assessment tool',
        'Avoid antipsychotics unless severe agitation'
      ]
    },
    {
      id: 2,
      title: 'Recurrent Falls',
      scenario: '78-year-old man with 3 falls in past month. Lives alone, uses walker. PMH: HTN, DM2, neuropathy. Meds: Lisinopril, metformin, gabapentin, zolpidem PRN.',
      questions: [
        'What are the major fall risk factors?',
        'Which medication is concerning?',
        'What interventions would you recommend?'
      ],
      keyPoints: [
        'Zolpidem (Ambien) is high-risk medication in elderly',
        'Diabetic neuropathy increases fall risk',
        'Comprehensive fall assessment needed',
        'Consider PT/OT evaluation'
      ]
    }
  ];

  const generatePimpQuestion = () => {
    const randomQuestion = pimpQuestions[Math.floor(Math.random() * pimpQuestions.length)];
    setPimpQuestion(randomQuestion);
  };

  const loadCaseSimulator = () => {
    const randomCase = clinicalCases[Math.floor(Math.random() * clinicalCases.length)];
    setCurrentCase(randomCase);
  };

  const searchDrugs = (query) => {
    if (!query) return [];

    const drugDatabase = [
      { name: 'Metformin', class: 'Biguanide', indication: 'Diabetes Type 2', elderlyDose: 'Start 500mg daily, max 2g/day', renalAdjust: 'Avoid if eGFR <30' },
      { name: 'Lisinopril', class: 'ACE Inhibitor', indication: 'Hypertension, Heart Failure', elderlyDose: 'Start 2.5-5mg daily', renalAdjust: 'Monitor K+ and Cr' },
      { name: 'Atorvastatin', class: 'Statin', indication: 'Hyperlipidemia', elderlyDose: 'Start 10-20mg daily', renalAdjust: 'No adjustment needed' },
      { name: 'Furosemide', class: 'Loop Diuretic', indication: 'Heart Failure, Edema', elderlyDose: 'Start 20-40mg daily', renalAdjust: 'Monitor renal function' },
      { name: 'Donepezil', class: 'Cholinesterase Inhibitor', indication: 'Alzheimer Disease', elderlyDose: 'Start 5mg daily x 4-6 weeks, then 10mg', renalAdjust: 'No adjustment' }
    ];

    return drugDatabase.filter(drug => 
      drug.name.toLowerCase().includes(query.toLowerCase()) ||
      drug.class.toLowerCase().includes(query.toLowerCase()) ||
      drug.indication.toLowerCase().includes(query.toLowerCase())
    );
  };

  const checkDrugInteractions = (drugString) => {
    const drugs = drugString.split(',').map(d => d.trim().toLowerCase());
    const interactions = [];

    // Simplified interaction checking
    if (drugs.includes('warfarin') && drugs.includes('aspirin')) {
      interactions.push({ severity: 'Major', description: 'Increased bleeding risk with warfarin + aspirin' });
    }
    if (drugs.includes('lisinopril') && drugs.includes('losartan')) {
      interactions.push({ severity: 'Major', description: 'Dual RAAS blockade - increased hyperkalemia risk' });
    }
    if (drugs.includes('metformin') && drugs.includes('furosemide')) {
      interactions.push({ severity: 'Moderate', description: 'Monitor renal function - increased lactic acidosis risk' });
    }

    return interactions;
  };

  const calculateRenalDosing = (drug, gfr) => {
    const renalDosing = {
      'metformin': {
        normal: '500-2000mg daily',
        mild: '500-1000mg daily (eGFR 45-60)',
        moderate: '500mg daily (eGFR 30-45)',
        severe: 'Contraindicated (eGFR <30)'
      },
      'gabapentin': {
        normal: '300-1800mg TID',
        mild: 'Reduce by 25%',
        moderate: 'Reduce by 50%',
        severe: 'Reduce by 75%'
      }
    };

    const drugLower = drug.toLowerCase();
    if (!renalDosing[drugLower]) return null;

    if (gfr >= 60) return renalDosing[drugLower].normal;
    if (gfr >= 45) return renalDosing[drugLower].mild;
    if (gfr >= 30) return renalDosing[drugLower].moderate;
    return renalDosing[drugLower].severe;
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
          { id: 'quick-tools', label: '⚡ Quick', title: 'Quick Tools' },
          { id: 'pimp', label: '🎯 Pimp', title: 'Pimp Questions' },
          { id: 'cases', label: '📋 Cases', title: 'Case Simulator' },
          { id: 'drugs', label: '💊 Drugs', title: 'Drug Tools' }
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
        {/* Quick Tools */}
        {activeSection === 'quick-tools' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Quick Access Tools
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: '#e8f5e8',
                borderRadius: '8px',
                border: '1px solid #c3e6cb',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Pimp Question Generator card clicked');
                setActiveSection('pimp');
              }}>
                <div style={{ fontWeight: 'bold', color: '#155724', fontSize: '14px' }}>
                  🎯 Pimp Question Generator
                </div>
                <div style={{ fontSize: '12px', color: '#155724', marginTop: '4px' }}>
                  Random clinical questions for learning
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f8d7da',
                borderRadius: '8px',
                border: '1px solid #f5c6cb',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Case Simulator card clicked');
                setActiveSection('cases');
              }}>
                <div style={{ fontWeight: 'bold', color: '#721c24', fontSize: '14px' }}>
                  📋 Case Simulator
                </div>
                <div style={{ fontSize: '12px', color: '#721c24', marginTop: '4px' }}>
                  Interactive clinical cases
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#e2e3f1',
                borderRadius: '8px',
                border: '1px solid #c8c9e4',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Drug Lookup card clicked');
                setActiveSection('drugs');
              }}>
                <div style={{ fontWeight: 'bold', color: '#383d47', fontSize: '14px' }}>
                  💊 Drug Lookup
                </div>
                <div style={{ fontSize: '12px', color: '#383d47', marginTop: '4px' }}>
                  Dosing, interactions, renal adjustment
                </div>
              </div>

              {/* Quick Calculators */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '14px' }}>
                  🧮 Quick Calculators
                </h4>
                <div style={{ display: 'grid', gap: '8px', fontSize: '12px' }}>
                  <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                    <strong>Creatinine Clearance:</strong> Cockcroft-Gault Formula
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                    <strong>CHADS2-VASc:</strong> Stroke Risk in AF
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                    <strong>Fall Risk:</strong> Timed Up & Go Test
                  </div>
                </div>
              </div>

              {/* Assessment Tools */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '14px' }}>
                  📊 Assessment Tools
                </h4>
                <div style={{ fontSize: '12px', color: '#6c757d', lineHeight: '1.4' }}>
                  • CAM (Confusion Assessment Method)<br/>
                  • GDS (Geriatric Depression Scale)<br/>
                  • MoCA (Montreal Cognitive Assessment)<br/>
                  • Barthel Index (Functional Status)<br/>
                  • FRAX (Fracture Risk Assessment)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pimp Questions */}
        {activeSection === 'pimp' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Pimp Question Generator
            </h3>
            
            {pimpQuestion && (
              <div style={{
                padding: '16px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#e7f3ff',
                    color: '#0056b3',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {pimpQuestion.category}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: pimpQuestion.difficulty === 'Advanced' ? '#f8d7da' : 
                                   pimpQuestion.difficulty === 'Intermediate' ? '#fff3cd' : '#d4edda',
                    color: pimpQuestion.difficulty === 'Advanced' ? '#721c24' :
                           pimpQuestion.difficulty === 'Intermediate' ? '#856404' : '#155724',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {pimpQuestion.difficulty}
                  </span>
                </div>
                
                <div style={{ 
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  color: '#2c3e50',
                  marginBottom: '12px',
                  lineHeight: '1.3'
                }}>
                  Q: {pimpQuestion.question}
                </div>
                
                <details>
                  <summary style={{ 
                    cursor: 'pointer', 
                    padding: '8px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#495057'
                  }}>
                    Show Answer
                  </summary>
                  <div style={{ 
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '4px',
                    border: '1px solid #c3e6cb',
                    fontSize: '13px',
                    lineHeight: '1.4',
                    color: '#155724'
                  }}>
                    <strong>Answer:</strong> {pimpQuestion.answer}
                  </div>
                </details>
              </div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Generate New Question clicked');
                generatePimpQuestion();
              }}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🎲 Generate New Question
            </button>

            {/* Question Categories */}
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '14px' }}>
                📚 Available Categories
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Geriatric Syndromes', 'Pharmacology', 'Cardiovascular', 'Cognitive Assessment', 'Falls Prevention', 'Polypharmacy'].map(category => (
                  <span
                    key={category}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '10px',
                      color: '#495057'
                    }}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Case Simulator */}
        {activeSection === 'cases' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px' }}>
              Case Simulator
            </h3>
            
            {currentCase && (
              <div style={{
                padding: '16px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#721c24', fontSize: '15px' }}>
                  Case {currentCase.id}: {currentCase.title}
                </h4>
                
                <div style={{ 
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '13px',
                  lineHeight: '1.4',
                  border: '1px solid #e9ecef'
                }}>
                  <strong>Scenario:</strong> {currentCase.scenario}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ fontSize: '14px', color: '#2c3e50' }}>Think about:</strong>
                  <ul style={{ 
                    marginTop: '8px', 
                    paddingLeft: '20px', 
                    fontSize: '13px',
                    lineHeight: '1.4'
                  }}>
                    {currentCase.questions.map((q, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{q}</li>
                    ))}
                  </ul>
                </div>

                <details>
                  <summary style={{ 
                    cursor: 'pointer', 
                    padding: '8px',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#155724'
                  }}>
                    Show Key Teaching Points
                  </summary>
                  <div style={{ 
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '4px',
                    border: '1px solid #c3e6cb'
                  }}>
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: '20px', 
                      fontSize: '13px',
                      lineHeight: '1.4',
                      color: '#155724'
                    }}>
                      {currentCase.keyPoints.map((point, idx) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Load New Case clicked');
                loadCaseSimulator();
              }}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🎲 Load New Case
            </button>
          </div>
        )}

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
                onChange={(e) => {
                  setDrugSearchQuery(e.target.value);
                  setDrugSearchResults(searchDrugs(e.target.value));
                }}
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
                      <div style={{ fontSize: '11px', color: '#6c757d' }}>Class: {drug.class}</div>
                      <div style={{ fontSize: '11px', color: '#6c757d' }}>Elderly Dose: {drug.elderlyDose}</div>
                      <div style={{ fontSize: '11px', color: drug.renalAdjust.includes('Avoid') || drug.renalAdjust.includes('Monitor') ? '#dc3545' : '#28a745' }}>
                        Renal: {drug.renalAdjust}
                      </div>
                    </div>
                  ))}
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
                        {interaction.severity} Interaction
                      </div>
                      <div style={{ fontSize: '11px', color: interaction.severity === 'Major' ? '#721c24' : '#856404' }}>
                        {interaction.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Renal Dosing */}
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#495057' }}>
                🔄 Renal Dosing
              </h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                <input
                  type="text"
                  value={renalDosing.drug}
                  onChange={(e) => setRenalDosing({...renalDosing, drug: e.target.value})}
                  placeholder="Drug name..."
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <input
                  type="number"
                  value={renalDosing.gfr}
                  onChange={(e) => {
                    const gfr = parseInt(e.target.value);
                    const dose = calculateRenalDosing(renalDosing.drug, gfr);
                    setRenalDosing({...renalDosing, gfr: e.target.value, dose});
                  }}
                  placeholder="eGFR (mL/min/1.73m²)"
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
              
              {renalDosing.dose && (
                <div style={{
                  marginTop: '8px',
                  padding: '10px',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '4px',
                  border: '1px solid #c3e6cb',
                  fontSize: '12px'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#155724' }}>Recommended Dose:</div>
                  <div style={{ color: '#155724' }}>{renalDosing.dose}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        padding: '12px 16px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        fontSize: '10px',
        color: '#6c757d',
        textAlign: 'center'
      }}>
        <div>🛠️ Clinical Decision Support</div>
        <div>Evidence-Based Tools</div>
      </div>
    </div>
  );
};

export default ClinicalToolsSidebar;