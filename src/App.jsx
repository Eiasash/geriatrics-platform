import React, { useState, useEffect } from 'react';
// Import from the correct files
import { boardQuestions } from './Questions.js';
import { medications as medicationDatabase } from './data/medications.js';
import { protocols } from './data/protocols.js';
// Import our enhanced quiz system
import { expandedQuizDatabase, EnhancedQuizSystem } from './data/expandedQuizDatabase.js';
import ClinicalAI from './utils/aiAssistantFix.js';

const App = () => {
  // Initialize enhanced systems
  const [clinicalAI] = useState(() => new ClinicalAI());
  const [quizSystem] = useState(() => new EnhancedQuizSystem());
  
  // Use expanded quiz database (150+ questions) instead of old 3-question system
  const allQuestions = Object.entries(expandedQuizDatabase).flatMap(([category, questions]) => 
    questions.map(q => ({...q, category, id: q.id}))
  );
  
  // Flatten all medications
  const allMedications = Object.entries(medicationDatabase).flatMap(([category, meds]) => {
    if (Array.isArray(meds)) return meds;
    return Object.values(meds).flat();
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [language, setLanguage] = useState('en');

  const submitAnswer = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(userAnswers).forEach(([qId, answer]) => {
      const question = allQuestions.find(q => q.id === qId);
      if (question && question.answer === answer) correct++;
    });
    return { correct, total: Object.keys(userAnswers).length };
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '28px' }}>
            Geriatrics Excellence Platform
            <span style={{ fontSize: '14px', marginLeft: '10px', opacity: 0.9 }}>
              Shaare Zedek Medical Center
            </span>
          </h1>
          <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
            {allQuestions.length} Board Questions | {allMedications.length} Medications | {Object.keys(protocols).length} Protocols
          </p>
          
          <nav style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['dashboard', 'quiz', 'ai-assistant', 'medications', 'protocols', 'resources'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: activeTab === tab ? 'white' : 'rgba(255,255,255,0.2)',
                  color: activeTab === tab ? '#667eea' : 'white',
                  border: 'none',
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 'bold' : 'normal'
                }}>
                {tab === 'ai-assistant' ? 'AI Assistant' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0 }}>Content Statistics</h3>
              <p>📚 {allQuestions.length} Board Review Questions</p>
              <p>💊 {allMedications.length} Medications with Israeli Guidelines</p>
              <p>📋 {Object.keys(protocols.admission || {}).length} Admission Protocols</p>
              <p>🚨 {Object.keys(protocols.emergency || {}).length} Emergency Protocols</p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0 }}>Quick Actions</h3>
              <button 
                onClick={() => setActiveTab('quiz')}
                style={{ width: '100%', padding: '12px', marginBottom: '10px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Start Board Review Quiz
              </button>
              <button 
                onClick={() => setActiveTab('protocols')}
                style={{ width: '100%', padding: '12px', backgroundColor: '#764ba2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                View Clinical Protocols
              </button>
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0 }}>Question Categories (Expanded Database)</h3>
              {Object.entries(expandedQuizDatabase).map(([category, questions]) => (
                <p key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}: {questions.length} questions
                </p>
              ))}
              <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
                <strong>Total: {allQuestions.length} Questions</strong>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {!showResults && currentQuestionIndex < allQuestions.length && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3>Question {currentQuestionIndex + 1} of {allQuestions.length}</h3>
                  <span style={{ backgroundColor: '#e7f3ff', padding: '5px 10px', borderRadius: '4px' }}>
                    {allQuestions[currentQuestionIndex].category}
                  </span>
                </div>
                
                <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <p style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 'bold' }}>
                    {allQuestions[currentQuestionIndex].q || allQuestions[currentQuestionIndex].question}
                  </p>
                  
                  {/* Handle both old format (options array) and new format (text input) */}
                  {allQuestions[currentQuestionIndex].options ? (
                    // Old format with multiple choice
                    allQuestions[currentQuestionIndex].options.map((option, idx) => (
                      <label key={idx} style={{ display: 'block', marginBottom: '10px', cursor: 'pointer', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={idx}
                          checked={userAnswers[allQuestions[currentQuestionIndex].id] === idx}
                          onChange={() => submitAnswer(allQuestions[currentQuestionIndex].id, idx)}
                          style={{ marginRight: '10px' }}
                        />
                        {String.fromCharCode(65 + idx)}. {option}
                      </label>
                    ))
                  ) : (
                    // New format with text input for open-ended questions
                    <div>
                      <textarea
                        placeholder="Type your answer here..."
                        style={{ width: '100%', height: '80px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '2px solid #ddd' }}
                        value={userAnswers[allQuestions[currentQuestionIndex].id] || ''}
                        onChange={(e) => submitAnswer(allQuestions[currentQuestionIndex].id, e.target.value)}
                      />
                      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                        This is an open-ended question. Type your answer and click Next to see the correct answer.
                      </div>
                    </div>
                  )}
                </div>
                
                {userAnswers[allQuestions[currentQuestionIndex].id] !== undefined && (
                  <div style={{ 
                    padding: '15px', 
                    backgroundColor: '#e7f3ff',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ marginBottom: '10px', color: '#28a745', fontWeight: 'bold' }}>
                      ✓ Answer recorded
                    </div>
                    <p style={{ marginTop: '10px' }}>
                      <strong>Correct Answer:</strong> {allQuestions[currentQuestionIndex].a || allQuestions[currentQuestionIndex].explanation}
                    </p>
                    {allQuestions[currentQuestionIndex].difficulty && (
                      <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                        Difficulty: {allQuestions[currentQuestionIndex].difficulty}
                      </p>
                    )}
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Previous
                  </button>
                  <button
                    onClick={() => currentQuestionIndex === allQuestions.length - 1 ? setShowResults(true) : setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    style={{ padding: '10px 20px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {currentQuestionIndex === allQuestions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            )}
            
            {showResults && (
              <div style={{ textAlign: 'center' }}>
                <h2>Quiz Complete!</h2>
                <div style={{ fontSize: '48px', margin: '20px 0' }}>
                  {calculateScore().correct} / {calculateScore().total}
                </div>
                <p style={{ fontSize: '24px', color: calculateScore().correct/calculateScore().total >= 0.8 ? '#28a745' : '#dc3545' }}>
                  {(calculateScore().correct/calculateScore().total * 100).toFixed(1)}%
                </p>
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setShowResults(false);
                  }}
                  style={{ padding: '15px 30px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Start New Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <div>
            <input
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '20px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {allMedications.filter(med => 
                JSON.stringify(med).toLowerCase().includes(searchTerm.toLowerCase())
              ).slice(0, 50).map((med, idx) => (
                <div key={idx} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <h4 style={{ marginTop: 0, color: '#667eea' }}>
                    {med.generic || med.name} {med.hebrew && `(${med.hebrew})`}
                  </h4>
                  {med.brands && <p><strong>Brands:</strong> {Array.isArray(med.brands) ? med.brands.join(', ') : med.brands}</p>}
                  {med.elderlyStart && <p><strong>Elderly Starting Dose:</strong> {med.elderlyStart}</p>}
                  {med.renal && <p><strong>Renal Adjustment:</strong> {typeof med.renal === 'object' ? JSON.stringify(med.renal) : med.renal}</p>}
                  {med.israeliGuideline && (
                    <p style={{ backgroundColor: '#e7f3ff', padding: '8px', borderRadius: '4px' }}>
                      <strong>🇮🇱 Israeli Guideline:</strong> {med.israeliGuideline}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Protocols Tab */}
        {activeTab === 'protocols' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {Object.entries(protocols).map(([category, items]) => (
                <div key={category} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                  <h3 style={{ color: '#667eea', marginTop: 0 }}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} Protocols
                  </h3>
                  {Object.keys(items).map(protocol => (
                    <button
                      key={protocol}
                      onClick={() => setSelectedProtocol(items[protocol])}
                      style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'left', backgroundColor: '#f0f2f5', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      {protocol}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            
            {selectedProtocol && (
              <div style={{ position: 'fixed', top: '10%', left: '10%', right: '10%', bottom: '10%', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', overflow: 'auto' }}>
                <button
                  onClick={() => setSelectedProtocol(null)}
                  style={{ float: 'right', padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Close
                </button>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(selectedProtocol, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai-assistant' && <AIAssistantTab clinicalAI={clinicalAI} />}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>Quick Links</h3>
            <p>📚 UpToDate: uptodate.com</p>
            <p>🔬 PubMed: pubmed.ncbi.nlm.nih.gov</p>
            <p>🏥 Israeli Geriatrics Society: geriatrics.org.il</p>
            <p>📊 AGS Beers Criteria 2023</p>
            <p>📖 Hazzard's Geriatric Medicine</p>
          </div>
        )}
      </main>
    </div>
  );
};

// AI Assistant Component
const AIAssistantTab = ({ clinicalAI }) => {
  const [patientData, setPatientData] = useState({
    age: '',
    gender: '',
    conditions: [],
    medications: [],
    livingStatus: '',
    functionalStatus: ''
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const analyzePatient = async () => {
    setLoading(true);
    try {
      // Convert string inputs to appropriate types
      const processedData = {
        ...patientData,
        age: parseInt(patientData.age) || 0,
        conditions: patientData.conditions.filter(c => c.trim()),
        medications: patientData.medications.filter(m => m.trim())
      };

      const result = clinicalAI.analyzePatient(processedData);
      setAnalysisResult(result);
    } catch (error) {
      setAnalysisResult({
        success: false,
        error: error.message,
        demographics: { ageGroup: 'Error', riskFactors: [], recommendations: [] }
      });
    }
    setLoading(false);
  };

  const addCondition = () => {
    setPatientData({
      ...patientData,
      conditions: [...patientData.conditions, '']
    });
  };

  const updateCondition = (index, value) => {
    const newConditions = [...patientData.conditions];
    newConditions[index] = value;
    setPatientData({
      ...patientData,
      conditions: newConditions
    });
  };

  const addMedication = () => {
    setPatientData({
      ...patientData,
      medications: [...patientData.medications, '']
    });
  };

  const updateMedication = (index, value) => {
    const newMedications = [...patientData.medications];
    newMedications[index] = value;
    setPatientData({
      ...patientData,
      medications: newMedications
    });
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🤖 Clinical AI Assistant</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Input Form */}
        <div>
          <h3>Patient Information</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
            <input
              type="number"
              value={patientData.age}
              onChange={(e) => setPatientData({...patientData, age: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Gender:</label>
            <select
              value={patientData.gender}
              onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Living Status:</label>
            <select
              value={patientData.livingStatus}
              onChange={(e) => setPatientData({...patientData, livingStatus: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">Select status</option>
              <option value="alone">Lives alone</option>
              <option value="family">Lives with family</option>
              <option value="assisted">Assisted living</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Functional Status:</label>
            <select
              value={patientData.functionalStatus}
              onChange={(e) => setPatientData({...patientData, functionalStatus: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">Select status</option>
              <option value="independent">Independent</option>
              <option value="partially_dependent">Partially dependent</option>
              <option value="dependent">Dependent</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Conditions:</label>
            {patientData.conditions.map((condition, index) => (
              <input
                key={index}
                type="text"
                value={condition}
                onChange={(e) => updateCondition(index, e.target.value)}
                placeholder="e.g., diabetes, hypertension"
                style={{ width: '100%', padding: '8px', marginBottom: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            ))}
            <button
              onClick={addCondition}
              style={{ padding: '5px 10px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add Condition
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Medications:</label>
            {patientData.medications.map((medication, index) => (
              <input
                key={index}
                type="text"
                value={medication}
                onChange={(e) => updateMedication(index, e.target.value)}
                placeholder="e.g., metformin, lisinopril"
                style={{ width: '100%', padding: '8px', marginBottom: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            ))}
            <button
              onClick={addMedication}
              style={{ padding: '5px 10px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add Medication
            </button>
          </div>

          <button
            onClick={analyzePatient}
            disabled={loading || !patientData.age}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Analyzing...' : '🔍 Analyze Patient'}
          </button>
        </div>

        {/* Results */}
        <div>
          <h3>AI Analysis Results</h3>
          
          {!analysisResult && (
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', textAlign: 'center', color: '#666' }}>
              Enter patient information and click "Analyze Patient" to get AI-powered clinical insights.
            </div>
          )}

          {analysisResult && analysisResult.success && (
            <div>
              {/* Demographics */}
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>👤 Demographics</h4>
                <p><strong>Age Group:</strong> {analysisResult.demographics.ageGroup}</p>
                <p><strong>Risk Factors:</strong> {analysisResult.demographics.riskFactors.join(', ') || 'None identified'}</p>
              </div>

              {/* Risk Score */}
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>⚠️ Risk Assessment</h4>
                <p><strong>Overall Risk:</strong> {analysisResult.riskScore.category} (Score: {analysisResult.riskScore.overall})</p>
                <p><strong>Risk Factors:</strong></p>
                <ul>
                  {analysisResult.riskScore.factors?.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>💡 Clinical Recommendations</h4>
                {analysisResult.recommendations.map((rec, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <span style={{
                      backgroundColor: rec.priority === 'high' ? '#dc3545' : rec.priority === 'moderate' ? '#ffc107' : '#28a745',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginRight: '10px'
                    }}>
                      {rec.priority?.toUpperCase()}
                    </span>
                    <strong>{rec.text}</strong>
                    {rec.rationale && <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>{rec.rationale}</p>}
                  </div>
                ))}
              </div>

              {/* Clinical Alerts */}
              {analysisResult.alerts && analysisResult.alerts.length > 0 && (
                <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#721c24' }}>🚨 Clinical Alerts</h4>
                  {analysisResult.alerts.map((alert, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <strong>{alert.message}</strong>
                      <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>Action: {alert.action}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              {analysisResult.summary && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>📋 Summary</h4>
                  <p>{analysisResult.summary.overview}</p>
                  <p><strong>Action Items:</strong> {analysisResult.summary.actionItems}</p>
                </div>
              )}
            </div>
          )}

          {analysisResult && !analysisResult.success && (
            <div style={{ padding: '15px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
              <h4 style={{ color: '#721c24' }}>❌ Analysis Error</h4>
              <p>{analysisResult.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App; 
