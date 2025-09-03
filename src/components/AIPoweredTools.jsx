// AI-Powered Clinical Tools Component
// Advanced AI tools for clinical decision support and patient analysis

import React, { useState, useEffect } from 'react';
import { MedicalTerminologyParser } from '../utils/medicalTerminologyParser.js';
import MedOptimizer from './AITools/MedOptimizer.jsx';
import { calculateGeriatricRisk } from './ClinicalTools/RiskCalculators';

export const AIPoweredTools = () => {
  const [activeTab, setActiveTab] = useState('patient-analyzer');
  const [medParser] = useState(() => new MedicalTerminologyParser());
  
  // Patient Analysis State
  const [patientData, setPatientData] = useState({
    age: '',
    gender: '',
    conditions: '',
    medications: '',
    functionalStatus: '',
    cognitiveStatus: '',
    socialSupport: ''
  });
  
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Med Optimizer State
  const [medOptimizer, setMedOptimizer] = useState({
    currentMeds: '',
    allergies: '',
    renalFunction: '',
    recommendations: []
  });

  // Risk Predictor State
  const [riskPredictor, setRiskPredictor] = useState({
    fallRisk: null,
    frailtyRisk: null,
    readmissionRisk: null,
    deliriumRisk: null
  });

  const analyzePatient = async () => {
    setAnalyzing(true);
    
    try {
      // Parse medical terminology
      const parsedConditions = medParser.parseConditions(patientData.conditions);
      const parsedMedications = medParser.parseMedications(patientData.medications);
      const medicalInput = medParser.parseComplexMedicalInput(`${patientData.conditions} ${patientData.medications}`);
      const validation = medParser.validateMedicalInput(patientData.conditions);

      // Simulate comprehensive AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Use the comprehensive geriatric risk calculator
      const geriatricRisks = calculateGeriatricRisk(patientData);

      const mockAnalysis = {
        demographics: {
          ageCategory: categorizeAge(parseInt(patientData.age)),
          genderSpecificRisks: getGenderSpecificRisks(patientData.gender),
          overallRiskLevel: geriatricRisks.overallRisk
        },
        conditions: {
          parsed: parsedConditions,
          riskFactors: identifyRiskFactors(parsedConditions),
          interactions: identifyConditionInteractions(parsedConditions)
        },
        medications: {
          parsed: parsedMedications,
          beersWarnings: checkBeersWarnings(parsedMedications),
          interactions: checkMedicationInteractions(parsedMedications),
          recommendations: medParser.getMedicationRecommendations(parsedConditions)
        },
        riskAssessment: {
          fall: { level: geriatricRisks.fallRisk },
          frailty: { level: geriatricRisks.frailtyRisk },
          delirium: { level: geriatricRisks.deliriumRisk },
          bleeding: { level: geriatricRisks.bleedingRisk },
          readmission: { level: geriatricRisks.readmissionRisk }
        },
        recommendations: {
          immediate: generateImmediateRecommendations(parsedConditions, parsedMedications),
          monitoring: generateMonitoringRecommendations(parsedConditions, parsedMedications),
          preventive: generatePreventiveRecommendations(patientData, parsedConditions)
        },
        alerts: {
          critical: validation.warnings,
          suggestions: validation.suggestions
        }
      };

      setAnalysisResults(mockAnalysis);
      
      // Update risk predictor
      setRiskPredictor({
        fallRisk: mockAnalysis.riskAssessment.fall,
        frailtyRisk: mockAnalysis.riskAssessment.frailty,
        readmissionRisk: mockAnalysis.riskAssessment.readmission,
        deliriumRisk: mockAnalysis.riskAssessment.delirium
      });
      
      // Store in sessionStorage for other tabs/tools
      sessionStorage.setItem('currentPatient', JSON.stringify({
        ...patientData,
        risks: geriatricRisks,
        timestamp: Date.now()
      }));

      // Auto-populate deprescribing if on same page
      if (window.populateDeprescribing) {
        window.populateDeprescribing(patientData);
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResults({
        error: 'Failed to analyze patient. Please check your input and try again.'
      });
    } finally {
      setAnalyzing(false);
    }
  };

  // Helper functions for analysis
  const categorizeAge = (age) => {
    if (age < 65) return 'Pre-elderly';
    if (age < 75) return 'Young-old (65-74)';
    if (age < 85) return 'Old-old (75-84)';
    return 'Oldest-old (85+)';
  };

  const getGenderSpecificRisks = (gender) => {
    const risks = {
      'female': ['Higher osteoporosis risk', 'Increased fall risk post-menopause', 'Higher depression rates'],
      'male': ['Higher cardiovascular risk', 'Increased suicide risk', 'Lower life expectancy']
    };
    return risks[gender?.toLowerCase()] || [];
  };

  const calculateOverallRisk = (conditions, medications) => {
    let riskScore = 0;
    
    // High-risk conditions
    const highRiskConditions = ['dementia', 'heart failure', 'chronic kidney disease', 'diabetes'];
    conditions.forEach(condition => {
      if (highRiskConditions.some(risk => condition.toLowerCase().includes(risk))) {
        riskScore += 2;
      }
    });
    
    // High-risk medications
    const highRiskMeds = ['warfarin', 'insulin', 'digoxin'];
    medications.forEach(med => {
      if (highRiskMeds.some(risk => med.toLowerCase().includes(risk))) {
        riskScore += 1;
      }
    });
    
    if (riskScore >= 4) return 'High';
    if (riskScore >= 2) return 'Moderate';
    return 'Low';
  };

  const identifyRiskFactors = (conditions) => {
    const riskFactors = [];
    conditions.forEach(condition => {
      const lower = condition.toLowerCase();
      if (lower.includes('diabetes')) riskFactors.push('Increased infection risk, delayed wound healing');
      if (lower.includes('heart failure')) riskFactors.push('Increased hospitalization risk, medication complexity');
      if (lower.includes('dementia')) riskFactors.push('Increased fall risk, medication non-adherence');
      if (lower.includes('kidney disease')) riskFactors.push('Drug accumulation risk, electrolyte imbalances');
    });
    return riskFactors;
  };

  const identifyConditionInteractions = (conditions) => {
    const interactions = [];
    const hasCardiac = conditions.some(c => c.toLowerCase().includes('heart'));
    const hasRenal = conditions.some(c => c.toLowerCase().includes('kidney'));
    const hasDiabetes = conditions.some(c => c.toLowerCase().includes('diabetes'));
    
    if (hasCardiac && hasRenal) {
      interactions.push('Cardiorenal syndrome risk - careful fluid and medication management');
    }
    if (hasDiabetes && hasRenal) {
      interactions.push('Diabetic nephropathy progression - ACE inhibitor indicated');
    }
    
    return interactions;
  };

  const checkBeersWarnings = (medications) => {
    const warnings = [];
    medications.forEach(med => {
      const lower = med.toLowerCase();
      if (lower.includes('benzodiazepine') || lower.includes('lorazepam') || lower.includes('diazepam')) {
        warnings.push(`${med}: Avoid benzodiazepines in elderly - increased fall and cognitive impairment risk`);
      }
      if (lower.includes('diphenhydramine') || lower.includes('benadryl')) {
        warnings.push(`${med}: Avoid anticholinergics - delirium and cognitive impairment risk`);
      }
      if (lower.includes('nsaid') || lower.includes('ibuprofen') || lower.includes('naproxen')) {
        warnings.push(`${med}: Avoid NSAIDs in elderly - GI bleeding and renal toxicity risk`);
      }
    });
    return warnings;
  };

  const checkMedicationInteractions = (medications) => {
    const interactions = [];
    const medLower = medications.map(m => m.toLowerCase());
    
    if (medLower.some(m => m.includes('warfarin')) && medLower.some(m => m.includes('aspirin'))) {
      interactions.push('Major: Warfarin + Aspirin - significantly increased bleeding risk');
    }
    if (medLower.some(m => m.includes('ace inhibitor')) && medLower.some(m => m.includes('potassium'))) {
      interactions.push('Moderate: ACE inhibitor + Potassium - hyperkalemia risk');
    }
    
    return interactions;
  };

  const calculateFallRisk = (patient, conditions, medications) => {
    // Input validation
    if (!patient || !conditions || !medications) {
      return {
        score: 0,
        level: 'Unknown',
        recommendations: ['Unable to calculate risk - missing patient data']
      };
    }
    
    let score = 0;
    
    // Age factor with validation
    const age = parseInt(patient.age) || 0;
    if (age >= 85) score += 3;
    else if (age >= 75) score += 2;
    else if (age >= 65) score += 1;
    
    // Condition factors - ensure conditions is an array
    const conditionsArray = Array.isArray(conditions) ? conditions : [];
    conditionsArray.forEach(condition => {
      if (typeof condition === 'string') {
        const lower = condition.toLowerCase();
        if (lower.includes('dementia') || lower.includes('cognitive')) score += 2;
        if (lower.includes('parkinson') || lower.includes('movement')) score += 2;
        if (lower.includes('vision') || lower.includes('hearing')) score += 1;
      }
    });
    
    // Medication factors - ensure medications is an array
    const medicationsArray = Array.isArray(medications) ? medications : [];
    medicationsArray.forEach(med => {
      if (typeof med === 'string') {
        const lower = med.toLowerCase();
        if (lower.includes('benzodiazepine') || lower.includes('sedative')) score += 2;
        if (lower.includes('antipsychotic')) score += 2;
        if (lower.includes('antidepressant')) score += 1;
      }
    });
    
    return {
      score,
      level: score >= 6 ? 'High' : score >= 3 ? 'Moderate' : 'Low',
      recommendations: generateFallRecommendations(score)
    };
  };

  const calculateFrailtyRisk = (patient, conditions) => {
    // Input validation
    if (!patient || !conditions) {
      return {
        indicators: 0,
        level: 'Unknown',
        recommendations: ['Unable to calculate risk - missing patient data']
      };
    }
    
    let indicators = 0;
    
    // Age with validation
    const age = parseInt(patient.age) || 0;
    if (age >= 80) indicators++;
    
    // Functional status with validation
    if (patient.functionalStatus && typeof patient.functionalStatus === 'string') {
      const functionalLower = patient.functionalStatus.toLowerCase();
      if (functionalLower.includes('dependent') || functionalLower.includes('assistance')) {
        indicators += 2;
      }
    }
    
    // Weight loss / malnutrition - ensure conditions is an array
    const conditionsArray = Array.isArray(conditions) ? conditions : [];
    if (conditionsArray.some(c => typeof c === 'string' && (c.toLowerCase().includes('malnutrition') || c.toLowerCase().includes('weight loss')))) {
      indicators++;
    }
    
    // Multiple conditions
    if (conditionsArray.length >= 3) indicators++;
    
    return {
      indicators,
      level: indicators >= 3 ? 'High' : indicators >= 2 ? 'Moderate' : 'Low',
      recommendations: generateFrailtyRecommendations(indicators)
    };
  };

  const calculateDeliriumRisk = (patient, conditions, medications) => {
    // Input validation
    if (!patient || !conditions || !medications) {
      return {
        riskFactors: 0,
        level: 'Unknown',
        recommendations: ['Unable to calculate risk - missing patient data']
      };
    }
    
    let riskFactors = 0;
    
    // Age with validation
    const age = parseInt(patient.age) || 0;
    if (age >= 70) riskFactors++;
    
    // Cognitive impairment with validation
    const conditionsArray = Array.isArray(conditions) ? conditions : [];
    const hasCognitiveImpairment = (patient.cognitiveStatus && typeof patient.cognitiveStatus === 'string' && 
                                   patient.cognitiveStatus.toLowerCase().includes('impair')) || 
                                   conditionsArray.some(c => typeof c === 'string' && c.toLowerCase().includes('dementia'));
    if (hasCognitiveImpairment) {
      riskFactors += 2;
    }
    
    // High-risk medications - ensure medications is an array
    const medicationsArray = Array.isArray(medications) ? medications : [];
    medicationsArray.forEach(med => {
      if (typeof med === 'string') {
        const lower = med.toLowerCase();
        if (lower.includes('benzodiazepine') || lower.includes('anticholinergic') || 
            lower.includes('opioid') || lower.includes('steroid')) {
          riskFactors++;
        }
      }
    });
    
    return {
      riskFactors,
      level: riskFactors >= 4 ? 'High' : riskFactors >= 2 ? 'Moderate' : 'Low',
      recommendations: generateDeliriumRecommendations(riskFactors)
    };
  };

  const calculateReadmissionRisk = (patient, conditions, medications) => {
    // Input validation
    if (!patient || !conditions || !medications) {
      return {
        score: 0,
        level: 'Unknown',
        recommendations: ['Unable to calculate risk - missing patient data']
      };
    }
    
    let score = 0;
    
    // Age with validation
    const age = parseInt(patient.age) || 0;
    if (age >= 85) score += 2;
    else if (age >= 75) score += 1;
    
    // High-risk conditions - ensure conditions is an array
    const highRiskConditions = ['heart failure', 'copd', 'diabetes', 'kidney disease'];
    const conditionsArray = Array.isArray(conditions) ? conditions : [];
    conditionsArray.forEach(condition => {
      if (typeof condition === 'string' && highRiskConditions.some(risk => condition.toLowerCase().includes(risk))) {
        score += 2;
      }
    });
    
    // Social factors with validation
    if (patient.socialSupport && typeof patient.socialSupport === 'string') {
      const socialLower = patient.socialSupport.toLowerCase();
      if (socialLower.includes('limited') || socialLower.includes('alone')) {
        score += 1;
      }
    }
    
    // Polypharmacy - ensure medications is an array
    const medicationsArray = Array.isArray(medications) ? medications : [];
    if (medicationsArray.length >= 5) score += 1;
    
    return {
      score,
      level: score >= 5 ? 'High' : score >= 3 ? 'Moderate' : 'Low',
      recommendations: generateReadmissionRecommendations(score)
    };
  };

  const generateImmediateRecommendations = (conditions, medications) => {
    const recommendations = [];
    
    // High-priority medication warnings
    medications.forEach(med => {
      if (med.toLowerCase().includes('warfarin')) {
        recommendations.push('⚠️ Monitor INR closely - warfarin requires frequent monitoring');
      }
      if (med.toLowerCase().includes('insulin')) {
        recommendations.push('📊 Monitor blood glucose - adjust insulin based on patterns');
      }
    });
    
    // Condition-specific urgent items
    conditions.forEach(condition => {
      if (condition.toLowerCase().includes('heart failure')) {
        recommendations.push('⚖️ Daily weights and fluid restriction counseling');
      }
      if (condition.toLowerCase().includes('diabetes')) {
        recommendations.push('🎯 HbA1c goal individualized based on life expectancy and frailty');
      }
    });
    
    return recommendations;
  };

  const generateMonitoringRecommendations = (conditions, medications) => {
    const monitoring = [];
    
    // Medication monitoring
    medications.forEach(med => {
      const lower = med.toLowerCase();
      if (lower.includes('ace inhibitor') || lower.includes('arb')) {
        monitoring.push('Monitor renal function and potassium within 1-2 weeks of initiation');
      }
      if (lower.includes('diuretic')) {
        monitoring.push('Monitor electrolytes, renal function, and volume status');
      }
      if (lower.includes('statin')) {
        monitoring.push('Monitor liver function tests and assess for muscle symptoms');
      }
    });
    
    return monitoring;
  };

  const generatePreventiveRecommendations = (patient, conditions) => {
    const recommendations = [];
    
    // Age-based screening
    const age = parseInt(patient.age);
    if (age >= 65) {
      recommendations.push('Annual comprehensive geriatric assessment');
      recommendations.push('Bone density screening (DEXA) if not done recently');
      recommendations.push('Cognitive screening (MoCA or MMSE)');
    }
    
    // Condition-specific prevention
    conditions.forEach(condition => {
      if (condition.toLowerCase().includes('diabetes')) {
        recommendations.push('Annual ophthalmology exam for diabetic retinopathy screening');
        recommendations.push('Foot exam and podiatry referral as needed');
      }
      if (condition.toLowerCase().includes('hypertension')) {
        recommendations.push('Home blood pressure monitoring');
      }
    });
    
    return recommendations;
  };

  const generateFallRecommendations = (score) => {
    const recommendations = [];
    if (score >= 6) {
      recommendations.push('High priority: Comprehensive fall risk assessment');
      recommendations.push('Physical therapy evaluation for balance and strength');
      recommendations.push('Home safety evaluation by occupational therapy');
      recommendations.push('Consider hip protectors');
    } else if (score >= 3) {
      recommendations.push('Exercise program focusing on balance and strength');
      recommendations.push('Medication review to reduce fall-risk medications');
      recommendations.push('Vision and hearing assessment');
    } else {
      recommendations.push('Continue routine fall prevention measures');
      recommendations.push('Maintain regular physical activity');
    }
    return recommendations;
  };

  const generateFrailtyRecommendations = (indicators) => {
    const recommendations = [];
    if (indicators >= 3) {
      recommendations.push('Comprehensive geriatric assessment');
      recommendations.push('Nutritional evaluation and intervention');
      recommendations.push('Physical therapy for strength and mobility');
      recommendations.push('Consider goals of care discussion');
    } else if (indicators >= 2) {
      recommendations.push('Monitor for progression of frailty');
      recommendations.push('Encourage physical activity and protein intake');
      recommendations.push('Regular nutritional screening');
    } else {
      recommendations.push('Continue healthy aging practices');
      recommendations.push('Maintain regular exercise and good nutrition');
    }
    return recommendations;
  };

  const generateDeliriumRecommendations = (riskFactors) => {
    const recommendations = [];
    if (riskFactors >= 4) {
      recommendations.push('High risk: Implement delirium prevention protocol');
      recommendations.push('Minimize high-risk medications');
      recommendations.push('Ensure adequate sleep, nutrition, and hydration');
      recommendations.push('Cognitive stimulation and early mobilization');
    } else if (riskFactors >= 2) {
      recommendations.push('Monitor for delirium symptoms closely');
      recommendations.push('Review and reduce potentially inappropriate medications');
      recommendations.push('Maintain normal sleep-wake cycle');
    } else {
      recommendations.push('Continue standard delirium prevention measures');
    }
    return recommendations;
  };

  const generateReadmissionRecommendations = (score) => {
    const recommendations = [];
    if (score >= 5) {
      recommendations.push('High risk: Enhanced discharge planning');
      recommendations.push('Home health or visiting nurse services');
      recommendations.push('Early post-discharge follow-up (within 72 hours)');
      recommendations.push('Medication reconciliation and education');
      recommendations.push('Consider transitional care management');
    } else if (score >= 3) {
      recommendations.push('Standard discharge planning with medication review');
      recommendations.push('Follow-up within 7-14 days');
      recommendations.push('Clear discharge instructions and emergency contacts');
    } else {
      recommendations.push('Routine discharge planning');
      recommendations.push('Standard follow-up scheduling');
    }
    return recommendations;
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          🤖 AI-Powered Clinical Tools
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Advanced AI analysis for geriatric patient care and clinical decision support
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        marginBottom: '30px', 
        display: 'flex', 
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'patient-analyzer', label: '🧠 Patient Analyzer', desc: 'Comprehensive Analysis' },
          { id: 'risk-predictor', label: '⚠️ Risk Predictor', desc: 'Multi-Domain Risk Assessment' },
          { id: 'med-optimizer', label: '💊 Med Optimizer', desc: 'Medication Optimization' },
          { id: 'clinical-assistant', label: '🩺 Clinical Assistant', desc: 'Decision Support' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '15px 20px',
              backgroundColor: activeTab === tab.id ? '#667eea' : 'white',
              color: activeTab === tab.id ? 'white' : '#667eea',
              border: `2px solid #667eea`,
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              fontSize: '14px',
              textAlign: 'center',
              minWidth: '150px',
              transition: 'all 0.2s ease'
            }}
            title={tab.desc}
          >
            <div>{tab.label}</div>
            <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
              {tab.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Patient Analyzer Tab */}
      {activeTab === 'patient-analyzer' && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 25px 0', color: '#2c3e50' }}>
            🧠 Comprehensive Patient Analyzer
          </h2>

          {/* Patient Input Form */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e' }}>
                👤 Patient Demographics
              </label>
              <div style={{ display: 'grid', gap: '10px' }}>
                <input
                  type="number"
                  value={patientData.age}
                  onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                  placeholder="Age (years)"
                  style={{
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <select
                  value={patientData.gender}
                  onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                  style={{
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e' }}>
                🏥 Medical Conditions
              </label>
              <textarea
                value={patientData.conditions}
                onChange={(e) => setPatientData({...patientData, conditions: e.target.value})}
                placeholder="Enter conditions (supports abbreviations: DM2, HTN, CHF, CKD, COPD, etc.)&#10;Examples: DM2, HTN, CHF, CKD stage 3"
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                💡 Tip: Use common abbreviations like DM2 (diabetes), HTN (hypertension), CHF (heart failure)
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e' }}>
                💊 Current Medications
              </label>
              <textarea
                value={patientData.medications}
                onChange={(e) => setPatientData({...patientData, medications: e.target.value})}
                placeholder="Enter medications with doses (supports abbreviations)&#10;Examples: Metformin 500mg BID, Lisinopril 10mg daily, ASA 81mg"
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e' }}>
                🚶 Functional Status
              </label>
              <select
                value={patientData.functionalStatus}
                onChange={(e) => setPatientData({...patientData, functionalStatus: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select Functional Status</option>
                <option value="independent">Independent</option>
                <option value="minimal-assistance">Minimal Assistance</option>
                <option value="moderate-assistance">Moderate Assistance</option>
                <option value="dependent">Dependent</option>
              </select>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e' }}>
                🧠 Cognitive Status
              </label>
              <select
                value={patientData.cognitiveStatus}
                onChange={(e) => setPatientData({...patientData, cognitiveStatus: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select Cognitive Status</option>
                <option value="normal">Normal</option>
                <option value="mild-impairment">Mild Cognitive Impairment</option>
                <option value="moderate-impairment">Moderate Impairment</option>
                <option value="severe-impairment">Severe Impairment</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e' }}>
                👥 Social Support
              </label>
              <select
                value={patientData.socialSupport}
                onChange={(e) => setPatientData({...patientData, socialSupport: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select Social Support</option>
                <option value="strong">Strong Support Network</option>
                <option value="moderate">Moderate Support</option>
                <option value="limited">Limited Support</option>
                <option value="isolated">Socially Isolated</option>
              </select>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzePatient}
            disabled={analyzing || !patientData.age || !patientData.conditions}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: analyzing ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {analyzing ? '🔄 Analyzing Patient...' : '🚀 Analyze Patient'}
          </button>

          {/* Analysis Results */}
          {analysisResults && (
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '25px',
              borderRadius: '10px',
              border: '1px solid #e9ecef'
            }}>
              {analysisResults.error ? (
                <div style={{ color: '#dc3545', textAlign: 'center', fontSize: '16px' }}>
                  ❌ {analysisResults.error}
                </div>
              ) : (
                <div>
                  <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>
                    📊 Comprehensive Analysis Results
                  </h3>

                  {/* Demographics Analysis */}
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '10px' }}>👤 Demographics Analysis</h4>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '15px'
                    }}>
                      <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', color: '#495057' }}>Age Category</div>
                        <div style={{ color: '#28a745' }}>{analysisResults.demographics.ageCategory}</div>
                      </div>
                      <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', color: '#495057' }}>Overall Risk</div>
                        <div style={{ 
                          color: analysisResults.demographics.overallRiskLevel === 'High' ? '#dc3545' :
                                 analysisResults.demographics.overallRiskLevel === 'Moderate' ? '#ffc107' : '#28a745'
                        }}>
                          {analysisResults.demographics.overallRiskLevel}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment Grid */}
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '15px' }}>⚠️ Multi-Domain Risk Assessment</h4>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '15px'
                    }}>
                      {Object.entries(analysisResults.riskAssessment).map(([riskType, riskData]) => (
                        <div key={riskType} style={{
                          padding: '15px',
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: `2px solid ${
                            riskData.level === 'High' ? '#dc3545' :
                            riskData.level === 'Moderate' ? '#ffc107' : '#28a745'
                          }`
                        }}>
                          <div style={{ fontWeight: 'bold', color: '#495057', marginBottom: '8px' }}>
                            {riskType.charAt(0).toUpperCase() + riskType.slice(1)} Risk
                          </div>
                          <div style={{ 
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: riskData.level === 'High' ? '#dc3545' :
                                   riskData.level === 'Moderate' ? '#856404' : '#155724',
                            marginBottom: '8px'
                          }}>
                            {riskData.level}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6c757d' }}>
                            Score: {riskData.score || riskData.indicators || riskData.riskFactors}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Alerts */}
                  {(analysisResults.alerts.critical.length > 0 || analysisResults.medications.beersWarnings.length > 0) && (
                    <div style={{ marginBottom: '25px' }}>
                      <h4 style={{ color: '#dc3545', marginBottom: '15px' }}>🚨 Critical Alerts</h4>
                      <div style={{ display: 'grid', gap: '10px' }}>
                        {analysisResults.alerts.critical.map((alert, idx) => (
                          <div key={idx} style={{
                            padding: '12px',
                            backgroundColor: '#f8d7da',
                            borderRadius: '6px',
                            border: '1px solid #f5c6cb',
                            color: '#721c24',
                            fontSize: '14px'
                          }}>
                            ⚠️ {alert}
                          </div>
                        ))}
                        {analysisResults.medications.beersWarnings.map((warning, idx) => (
                          <div key={idx} style={{
                            padding: '12px',
                            backgroundColor: '#fff3cd',
                            borderRadius: '6px',
                            border: '1px solid #ffeaa7',
                            color: '#856404',
                            fontSize: '14px'
                          }}>
                            💊 {warning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div>
                      <h4 style={{ color: '#28a745', marginBottom: '15px' }}>🎯 Immediate Actions</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {analysisResults.recommendations.immediate.map((rec, idx) => (
                          <li key={idx} style={{ marginBottom: '8px', fontSize: '14px' }}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 style={{ color: '#17a2b8', marginBottom: '15px' }}>📊 Monitoring Plan</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {analysisResults.recommendations.monitoring.map((rec, idx) => (
                          <li key={idx} style={{ marginBottom: '8px', fontSize: '14px' }}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 style={{ color: '#6f42c1', marginBottom: '15px' }}>🛡️ Prevention</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {analysisResults.recommendations.preventive.map((rec, idx) => (
                          <li key={idx} style={{ marginBottom: '8px', fontSize: '14px' }}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Risk Predictor Tab */}
      {activeTab === 'risk-predictor' && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 25px 0', color: '#2c3e50' }}>
            ⚠️ Multi-Domain Risk Predictor
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {Object.entries(riskPredictor).map(([riskType, riskData]) => (
              riskData && (
                <div key={riskType} style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px',
                  border: `3px solid ${
                    riskData.level === 'High' ? '#dc3545' :
                    riskData.level === 'Moderate' ? '#ffc107' : '#28a745'
                  }`
                }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
                    {riskType.charAt(0).toUpperCase() + riskType.slice(1).replace(/([A-Z])/g, ' $1')}
                  </h3>
                  
                  <div style={{ 
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: riskData.level === 'High' ? '#dc3545' :
                           riskData.level === 'Moderate' ? '#856404' : '#155724',
                    marginBottom: '10px'
                  }}>
                    {riskData.level} Risk
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '15px' }}>
                    Risk Score: {riskData.score || riskData.indicators || riskData.riskFactors}
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '14px', color: '#495057', marginBottom: '10px' }}>
                      Recommendations:
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                      {riskData.recommendations.map((rec, idx) => (
                        <li key={idx} style={{ marginBottom: '5px' }}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            ))}
          </div>
          
          {!Object.values(riskPredictor).some(risk => risk !== null) && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#6c757d',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📊</div>
              <p>No risk assessment data available yet.</p>
              <p>Complete the Patient Analyzer to generate multi-domain risk predictions.</p>
            </div>
          )}
        </div>
      )}

      {/* Med Optimizer Tab */}
      {activeTab === 'med-optimizer' && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <MedOptimizer />
        </div>
      )}

      {/* Clinical Assistant Tab */}
      {activeTab === 'clinical-assistant' && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 25px 0', color: '#2c3e50' }}>
            🩺 Clinical Assistant
          </h2>
          <div style={{ textAlign: 'center', color: '#6c757d', padding: '40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
            <p>AI-powered clinical decision support system</p>
            <p>Coming soon: Real-time clinical guidance, differential diagnosis assistance, and evidence-based recommendations.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPoweredTools;