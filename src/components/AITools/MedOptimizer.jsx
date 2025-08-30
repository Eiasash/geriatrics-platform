// Medication Optimizer Component - AI-powered deprescribing assistant
import React, { useState } from 'react';

const MedOptimizer = () => {
  const [meds, setMeds] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    conditions: '',
    renal: 'normal'
  });
  const [results, setResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Beers Criteria and STOPP/START database
  const beersCriteria = {
    // Anticholinergics
    'diphenhydramine': {
      category: 'Anticholinergic',
      risk: 'HIGH',
      reason: 'Highly anticholinergic; increased risk of confusion, dry mouth, constipation, urinary retention',
      alternatives: 'Loratadine, cetirizine for allergies; melatonin for sleep'
    },
    'hydroxyzine': {
      category: 'Anticholinergic',
      risk: 'HIGH',
      reason: 'Anticholinergic effects; confusion and fall risk',
      alternatives: 'Non-sedating antihistamines, SSRIs for anxiety'
    },
    'amitriptyline': {
      category: 'TCA',
      risk: 'HIGH',
      reason: 'Highly anticholinergic, sedating, orthostatic hypotension',
      alternatives: 'Duloxetine, gabapentin for neuropathic pain'
    },
    
    // Benzodiazepines
    'lorazepam': {
      category: 'Benzodiazepine',
      risk: 'HIGH',
      reason: 'Increased risk of cognitive impairment, delirium, falls, fractures',
      alternatives: 'Melatonin, trazodone for sleep; SSRIs for anxiety'
    },
    'alprazolam': {
      category: 'Benzodiazepine',
      risk: 'HIGH',
      reason: 'Increased risk of cognitive impairment, delirium, falls, fractures',
      alternatives: 'SSRIs, buspirone for anxiety'
    },
    'diazepam': {
      category: 'Benzodiazepine',
      risk: 'HIGH',
      reason: 'Long half-life increases accumulation risk',
      alternatives: 'If benzo needed, use lorazepam (shorter acting)'
    },
    'clonazepam': {
      category: 'Benzodiazepine',
      risk: 'HIGH',
      reason: 'Long half-life, increased fall and cognitive risk',
      alternatives: 'Non-benzo anxiolytics, CBT for anxiety'
    },
    
    // Z-drugs
    'zolpidem': {
      category: 'Z-drug',
      risk: 'MODERATE-HIGH',
      reason: 'Similar risks to benzos: falls, fractures, cognitive effects',
      alternatives: 'Sleep hygiene, melatonin, trazodone'
    },
    'eszopiclone': {
      category: 'Z-drug',
      risk: 'MODERATE-HIGH',
      reason: 'Falls, cognitive impairment, dependency',
      alternatives: 'CBT for insomnia, melatonin'
    },
    
    // NSAIDs
    'ibuprofen': {
      category: 'NSAID',
      risk: 'MODERATE',
      reason: 'GI bleeding, renal injury, hypertension, heart failure',
      alternatives: 'Acetaminophen, topical NSAIDs, non-pharm approaches'
    },
    'naproxen': {
      category: 'NSAID',
      risk: 'MODERATE',
      reason: 'GI bleeding, renal injury, cardiovascular risk',
      alternatives: 'Acetaminophen, topical agents, physical therapy'
    },
    'indomethacin': {
      category: 'NSAID',
      risk: 'HIGH',
      reason: 'Most CNS adverse effects of all NSAIDs',
      alternatives: 'Other NSAIDs if needed, acetaminophen preferred'
    },
    
    // Antipsychotics
    'quetiapine': {
      category: 'Antipsychotic',
      risk: 'MODERATE-HIGH',
      reason: 'Increased mortality in dementia, metabolic effects, falls',
      alternatives: 'Non-pharmacological behavioral interventions first'
    },
    'risperidone': {
      category: 'Antipsychotic',
      risk: 'MODERATE-HIGH',
      reason: 'Stroke risk, increased mortality in dementia',
      alternatives: 'Behavioral interventions, environmental modifications'
    },
    'haloperidol': {
      category: 'Antipsychotic',
      risk: 'HIGH',
      reason: 'High EPS risk, increased mortality in dementia',
      alternatives: 'If needed, use quetiapine or risperidone at lowest dose'
    },
    
    // Muscle Relaxants
    'cyclobenzaprine': {
      category: 'Muscle Relaxant',
      risk: 'HIGH',
      reason: 'Anticholinergic effects, sedation, increased fracture risk',
      alternatives: 'Non-drug therapies, physical therapy, heat/cold'
    },
    'methocarbamol': {
      category: 'Muscle Relaxant',
      risk: 'MODERATE',
      reason: 'Sedation, confusion, fall risk',
      alternatives: 'Physical therapy, stretching, acetaminophen'
    },
    
    // Other high-risk medications
    'digoxin': {
      category: 'Cardiac',
      risk: 'MODERATE',
      reason: 'Avoid doses >0.125mg/day; narrow therapeutic window',
      alternatives: 'Beta-blockers or CCBs for rate control in AFib'
    },
    'doxazosin': {
      category: 'Alpha-blocker',
      risk: 'MODERATE',
      reason: 'Orthostatic hypotension, falls',
      alternatives: 'Other antihypertensives (ACE-I, ARBs, thiazides)'
    },
    'nitrofurantoin': {
      category: 'Antibiotic',
      risk: 'MODERATE',
      reason: 'Avoid if CrCl <30; pulmonary toxicity with long-term use',
      alternatives: 'Other antibiotics based on culture/sensitivity'
    }
  };

  const analyzeMedications = () => {
    setAnalyzing(true);
    
    setTimeout(() => {
      const medications = meds.split('\n').filter(m => m.trim());
      const warnings = [];
      const recommendations = [];
      
      medications.forEach(medLine => {
        const drug = medLine.toLowerCase().trim();
        
        // Check Beers Criteria
        Object.keys(beersCriteria).forEach(key => {
          if (drug.includes(key)) {
            const criteria = beersCriteria[key];
            warnings.push({
              drug: medLine,
              category: criteria.category,
              issue: `Beers Criteria: ${criteria.risk} RISK`,
              reason: criteria.reason,
              alternative: criteria.alternatives,
              priority: criteria.risk === 'HIGH' ? 1 : 2
            });
          }
        });
        
        // Check for polypharmacy patterns
        if (drug.includes('ppi') || drug.includes('omeprazole') || drug.includes('pantoprazole')) {
          recommendations.push({
            type: 'Duration Check',
            medication: medLine,
            recommendation: 'PPIs should be used at lowest dose for shortest duration. Consider H2 blocker or deprescribing if used >8 weeks without clear indication.'
          });
        }
        
        if (drug.includes('statin')) {
          const age = parseInt(patientInfo.age);
          if (age > 75) {
            recommendations.push({
              type: 'Age Consideration',
              medication: medLine,
              recommendation: 'Consider risk/benefit of statins in patients >75, especially for primary prevention.'
            });
          }
        }
      });
      
      // Check for duplicate therapy
      const drugClasses = {};
      medications.forEach(med => {
        const drug = med.toLowerCase();
        if (drug.includes('pril') || drug.includes('sartan')) {
          drugClasses['ace-arb'] = (drugClasses['ace-arb'] || 0) + 1;
        }
        if (drug.includes('pam') || drug.includes('zolam')) {
          drugClasses['benzo'] = (drugClasses['benzo'] || 0) + 1;
        }
        if (drug.includes('prazole')) {
          drugClasses['ppi'] = (drugClasses['ppi'] || 0) + 1;
        }
      });
      
      Object.keys(drugClasses).forEach(cls => {
        if (drugClasses[cls] > 1) {
          recommendations.push({
            type: 'Duplicate Therapy',
            medication: cls.toUpperCase(),
            recommendation: `Multiple ${cls} medications detected. Consider consolidating to single agent.`
          });
        }
      });
      
      // Sort warnings by priority
      warnings.sort((a, b) => a.priority - b.priority);
      
      setResults({
        warnings,
        recommendations,
        totalMeds: medications.length,
        highRisk: warnings.filter(w => w.priority === 1).length
      });
      
      setAnalyzing(false);
    }, 1000);
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#667eea', marginBottom: '20px' }}>
        💊 AI Medication Optimizer - Deprescribing Assistant
      </h2>
      
      <div style={{ 
        backgroundColor: '#e7f3ff',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          <strong>Evidence-based deprescribing tool</strong> using AGS Beers Criteria and STOPP/START guidelines.
          Identifies potentially inappropriate medications in older adults.
        </p>
      </div>
      
      {/* Patient Information */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            Patient Age
          </label>
          <input
            type="number"
            value={patientInfo.age}
            onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
            placeholder="e.g., 75"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            Key Conditions
          </label>
          <input
            type="text"
            value={patientInfo.conditions}
            onChange={(e) => setPatientInfo({...patientInfo, conditions: e.target.value})}
            placeholder="e.g., HTN, DM2, CKD"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            Renal Function
          </label>
          <select
            value={patientInfo.renal}
            onChange={(e) => setPatientInfo({...patientInfo, renal: e.target.value})}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="normal">Normal (eGFR >60)</option>
            <option value="mild">Mild CKD (eGFR 30-60)</option>
            <option value="moderate">Moderate CKD (eGFR 15-30)</option>
            <option value="severe">Severe CKD (eGFR <15)</option>
          </select>
        </div>
      </div>
      
      {/* Medication Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
          Current Medications (one per line)
        </label>
        <textarea 
          value={meds}
          onChange={(e) => setMeds(e.target.value)}
          placeholder="Enter medications, one per line...&#10;Example:&#10;Lorazepam 1mg QHS&#10;Omeprazole 20mg daily&#10;Ibuprofen 400mg PRN"
          style={{ 
            width: '100%', 
            height: '200px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}
        />
      </div>
      
      <button 
        onClick={analyzeMedications}
        disabled={!meds.trim() || analyzing}
        style={{
          background: analyzing ? '#6c757d' : '#28a745',
          color: 'white',
          padding: '12px 30px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: analyzing || !meds.trim() ? 'not-allowed' : 'pointer',
          width: '100%',
          marginBottom: '20px'
        }}
      >
        {analyzing ? '🔄 Analyzing...' : '🔍 Analyze for Deprescribing Opportunities'}
      </button>
      
      {/* Results */}
      {results && (
        <div>
          {/* Summary */}
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
                {results.totalMeds}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Total Medications</div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: results.highRisk > 0 ? '#ffe4e1' : '#d4edda',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: results.highRisk > 0 ? '#dc3545' : '#28a745' }}>
                {results.highRisk}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>High Risk Meds</div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: '#fff3cd',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                {results.recommendations.length}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Recommendations</div>
            </div>
          </div>
          
          {/* High Risk Medications */}
          {results.warnings.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>
                ⚠️ Potentially Inappropriate Medications
              </h3>
              {results.warnings.map((warning, idx) => (
                <div key={idx} style={{
                  background: warning.priority === 1 ? '#ffe4e1' : '#fff3cd',
                  padding: '15px',
                  margin: '10px 0',
                  borderLeft: `5px solid ${warning.priority === 1 ? '#dc3545' : '#ffc107'}`,
                  borderRadius: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '16px', color: '#2c3e50' }}>
                        {warning.drug}
                      </strong>
                      <span style={{
                        marginLeft: '10px',
                        padding: '2px 8px',
                        backgroundColor: warning.priority === 1 ? '#dc3545' : '#ffc107',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {warning.category}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '14px' }}>
                      {warning.issue}
                    </div>
                    <div style={{ color: '#666', fontSize: '13px', marginTop: '5px' }}>
                      <strong>Reason:</strong> {warning.reason}
                    </div>
                    <div style={{ 
                      color: '#155724', 
                      fontSize: '13px', 
                      marginTop: '8px',
                      padding: '8px',
                      backgroundColor: 'rgba(212, 237, 218, 0.3)',
                      borderRadius: '4px'
                    }}>
                      <strong>✓ Safer Alternatives:</strong> {warning.alternative}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Additional Recommendations */}
          {results.recommendations.length > 0 && (
            <div>
              <h3 style={{ color: '#ffc107', marginBottom: '15px' }}>
                💡 Additional Recommendations
              </h3>
              {results.recommendations.map((rec, idx) => (
                <div key={idx} style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  margin: '8px 0',
                  borderLeft: '3px solid #17a2b8',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '12px', color: '#17a2b8', fontWeight: 'bold' }}>
                    {rec.type}: {rec.medication}
                  </div>
                  <div style={{ fontSize: '13px', color: '#495057', marginTop: '5px' }}>
                    {rec.recommendation}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Deprescribing Action Plan */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            border: '1px solid #c3e6cb'
          }}>
            <h4 style={{ color: '#155724', marginBottom: '10px' }}>
              📋 Suggested Deprescribing Action Plan
            </h4>
            <ol style={{ color: '#155724', fontSize: '13px', paddingLeft: '20px' }}>
              <li>Review all HIGH RISK medications with prescriber</li>
              <li>Prioritize tapering benzodiazepines and Z-drugs (gradual taper required)</li>
              <li>Consider non-pharmacological alternatives first</li>
              <li>Monitor for withdrawal symptoms during tapering</li>
              <li>Reassess need for all medications every 3-6 months</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedOptimizer;