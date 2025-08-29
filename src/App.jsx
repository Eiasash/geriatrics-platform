import React, { useState, useEffect } from 'react';
// Import from the correct files
import { boardQuestions } from './Questions.js';
import { medicationDatabase } from './data/medications.js';
import protocols from './data/protocols.js';
// Import our enhanced quiz system
import { expandedQuizDatabase, EnhancedQuizSystem } from './data/expandedQuizDatabase.js';
import ClinicalAI from './utils/aiAssistantFix.js';
// Import new features
import MedicationMatcher from './utils/medicationMatcher.js';
import ClinicalCalculators from './utils/clinicalCalculators.js';

const App = () => {
  // Initialize enhanced systems
  const [clinicalAI] = useState(() => new ClinicalAI());
  const [quizSystem] = useState(() => new EnhancedQuizSystem());
  
  // Use expanded quiz database (150+ questions) instead of old 3-question system
  const allQuestions = Object.entries(expandedQuizDatabase).flatMap(([category, questions]) => 
    questions.map(q => ({...q, category, id: q.id}))
  );
  
  // Use medication database array directly
  const allMedications = medicationDatabase || [];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [language, setLanguage] = useState('en');
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [calculatorInput, setCalculatorInput] = useState({});
  const [calculatorResult, setCalculatorResult] = useState(null);

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
            {['dashboard', 'quiz', 'ai-assistant', 'medications', 'protocols', 'calculators', 'resources'].map(tab => (
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
                {tab === 'ai-assistant' ? 'AI Assistant' : 
                 tab === 'calculators' ? 'Calculators' :
                 tab.charAt(0).toUpperCase() + tab.slice(1)}
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

        {/* Medications Tab with Fuzzy Matching */}
        {activeTab === 'medications' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search medications (supports typos: coumadine, eliqis, plaviks...)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              {searchTerm && (
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                  💡 Tip: Try "coumadine" → "coumadin", "eliqis" → "eliquis", or Hebrew names like "קומדין"
                </div>
              )}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {(() => {
                if (!searchTerm) {
                  return allMedications.slice(0, 50).map((med, idx) => renderMedicationCard(med, idx));
                }
                
                // Use fuzzy matching for search
                const searchResults = MedicationMatcher.searchMedications(searchTerm, allMedications, 50);
                
                if (searchResults.length === 0) {
                  return [(
                    <div key="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
                      <h3>No medications found for "{searchTerm}"</h3>
                      <p>Try a different spelling or Hebrew name</p>
                    </div>
                  )];
                }
                
                return searchResults.map((result, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    {renderMedicationCard(result.medication, idx)}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: result.confidence === 'high' ? '#28a745' : result.confidence === 'medium' ? '#ffc107' : '#17a2b8',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {Math.round(result.score * 100)}% match
                    </div>
                  </div>
                ));
              })()
              }
            </div>
          </div>
        )}

        {/* Protocols Tab */}
        {activeTab === 'protocols' && (
          <div>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Clinical Protocols</h2>
              <p>Evidence-based protocols for common geriatric conditions. Click any protocol to view detailed steps.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {Object.entries(protocols).map(([protocolName, protocolData]) => (
                <div key={protocolName} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ color: '#667eea', marginTop: 0, marginBottom: '10px' }}>
                    {protocolData.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                    {protocolData.description}
                  </p>
                  <button
                    onClick={() => setSelectedProtocol(protocolData)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                    View Protocol Details
                  </button>
                </div>
              ))}
            </div>
            
            {selectedProtocol && (
              <div style={{ position: 'fixed', top: '5%', left: '5%', right: '5%', bottom: '5%', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', overflow: 'auto', zIndex: 1000 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
                  <h2 style={{ margin: 0, color: '#667eea' }}>{selectedProtocol.title}</h2>
                  <button
                    onClick={() => setSelectedProtocol(null)}
                    style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                    ✕ Close
                  </button>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#666' }}>{selectedProtocol.description}</p>
                </div>
                
                {selectedProtocol.steps && (
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ color: '#667eea' }}>Protocol Steps:</h3>
                    <ol style={{ lineHeight: '1.6' }}>
                      {selectedProtocol.steps.map((step, idx) => (
                        <li key={idx} style={{ marginBottom: '10px' }}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {selectedProtocol.riskFactors && (
                  <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>⚠️ Risk Factors:</h4>
                    <ul>
                      {selectedProtocol.riskFactors.map((factor, idx) => (
                        <li key={idx}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProtocol.medications && (
                  <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '4px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>💊 Medications:</h4>
                    {typeof selectedProtocol.medications === 'object' ? (
                      <div>
                        {Object.entries(selectedProtocol.medications).map(([key, value]) => (
                          <p key={key}><strong>{key}:</strong> {value}</p>
                        ))}
                      </div>
                    ) : (
                      <p>{selectedProtocol.medications}</p>
                    )}
                  </div>
                )}
                
                {selectedProtocol.interventions && (
                  <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>🎯 Interventions:</h4>
                    <ul>
                      {selectedProtocol.interventions.map((intervention, idx) => (
                        <li key={idx}>{intervention}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProtocol.references && (
                  <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '14px' }}>
                    <strong>References:</strong> {selectedProtocol.references}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Calculators Tab */}
        {activeTab === 'calculators' && (
          <div>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Clinical Calculators</h2>
              <p>Evidence-based assessment tools and scoring systems for geriatric medicine.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              {Object.entries(ClinicalCalculators).map(([calcName, calcData]) => (
                <div key={calcName} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ color: '#667eea', marginTop: 0, marginBottom: '10px' }}>
                    {calcData.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                    {calcData.description}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCalculator(calcName);
                      setCalculatorInput({});
                      setCalculatorResult(null);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                    Use Calculator
                  </button>
                </div>
              ))}
            </div>
            
            {selectedCalculator && (
              <CalculatorInterface 
                calculator={ClinicalCalculators[selectedCalculator]}
                calculatorName={selectedCalculator}
                input={calculatorInput}
                setInput={setCalculatorInput}
                result={calculatorResult}
                setResult={setCalculatorResult}
                onClose={() => setSelectedCalculator(null)}
              />
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

// Medication Card Renderer Function
const renderMedicationCard = (med, idx) => (
  <div key={idx} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <h4 style={{ marginTop: 0, color: '#667eea' }}>
      {med.name} {med.heName && `(${med.heName})`}
    </h4>
    {med.brand && <p><strong>Brand:</strong> {med.brand}</p>}
    {med.israeliBrand && <p><strong>🇮🇱 Israeli Brand:</strong> {med.israeliBrand}</p>}
    {med.category && <p><strong>Category:</strong> {med.category}</p>}
    {med.dose && (
      <div style={{ marginBottom: '10px' }}>
        <strong>Dosing:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li><strong>Standard:</strong> {med.dose.standard}</li>
          {med.dose.geriatric && <li><strong>Geriatric:</strong> {med.dose.geriatric}</li>}
          {med.dose.renal && <li><strong>Renal:</strong> {med.dose.renal}</li>}
        </ul>
      </div>
    )}
    {med.israeliGuidelines && (
      <p style={{ backgroundColor: '#e7f3ff', padding: '8px', borderRadius: '4px' }}>
        <strong>🇮🇱 Israeli Guideline:</strong> {med.israeliGuidelines}
      </p>
    )}
    {med.beersRating && (
      <p style={{ 
        backgroundColor: med.beersRating.includes('Avoid') ? '#f8d7da' : '#d4edda', 
        padding: '8px', 
        borderRadius: '4px' 
      }}>
        <strong>Beers Criteria:</strong> {med.beersRating}
      </p>
    )}
    {med.geriatricConsiderations && (
      <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
        <strong>Geriatric Notes:</strong> {med.geriatricConsiderations}
      </p>
    )}
  </div>
);

// Calculator Interface Component
const CalculatorInterface = ({ calculator, calculatorName, input, setInput, result, setResult, onClose }) => {
  const handleCalculate = () => {
    try {
      const calcResult = calculator.calculate(input[calculatorName] || {});
      setResult(calcResult);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  const updateInput = (field, value) => {
    setInput({
      ...input,
      [calculatorName]: {
        ...input[calculatorName],
        [field]: value
      }
    });
  };

  const renderInputFields = () => {
    switch (calculatorName) {
      case 'MMSE':
        return (
          <div>
            <p><strong>Enter scores for each domain:</strong></p>
            {['Orientation (0-10)', 'Registration (0-3)', 'Attention (0-5)', 'Recall (0-3)', 'Language (0-9)'].map((domain, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>{domain}:</label>
                <input
                  type="number"
                  min="0"
                  max={domain.includes('10') ? 10 : domain.includes('3') ? 3 : domain.includes('5') ? 5 : 9}
                  value={input[calculatorName]?.scores?.[idx] || ''}
                  onChange={(e) => {
                    const scores = [...(input[calculatorName]?.scores || new Array(5).fill(''))];
                    scores[idx] = parseInt(e.target.value) || 0;
                    updateInput('scores', scores);
                  }}
                  style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
            ))}
          </div>
        );

      case 'CAM':
        return (
          <div>
            <p><strong>Assess each feature:</strong></p>
            {calculator.features.map((feature, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  <input
                    type="checkbox"
                    checked={input[calculatorName]?.features?.[idx] || false}
                    onChange={(e) => {
                      const features = [...(input[calculatorName]?.features || new Array(4).fill(false))];
                      features[idx] = e.target.checked;
                      updateInput('features', features);
                    }}
                    style={{ marginRight: '10px' }}
                  />
                  {feature}
                </label>
              </div>
            ))}
          </div>
        );

      case 'MorseFallScale':
        return (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.history || false}
                  onChange={(e) => updateInput('history', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Fall in past 3 months (25 points)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.secondary || false}
                  onChange={(e) => updateInput('secondary', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                More than one medical diagnosis (15 points)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Ambulatory aid:</label>
              <select
                value={input[calculatorName]?.aid || 'none'}
                onChange={(e) => updateInput('aid', e.target.value)}
                style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="none">None/Bedrest (0)</option>
                <option value="crutch">Crutches/Walker/Cane (15)</option>
                <option value="furniture">Furniture (30)</option>
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.iv || false}
                  onChange={(e) => updateInput('iv', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                IV/Heparin lock (20 points)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Gait:</label>
              <select
                value={input[calculatorName]?.gait || 'normal'}
                onChange={(e) => updateInput('gait', e.target.value)}
                style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="normal">Normal/Wheelchair (0)</option>
                <option value="weak">Weak (10)</option>
                <option value="impaired">Impaired (20)</option>
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.overestimatesAbility || false}
                  onChange={(e) => updateInput('overestimatesAbility', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Overestimates ability/forgets limitations (15 points)
              </label>
            </div>
          </div>
        );

      case 'TimedUpAndGo':
        return (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Time in seconds:</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={input[calculatorName]?.seconds || ''}
                onChange={(e) => updateInput('seconds', parseFloat(e.target.value) || 0)}
                style={{ width: '100px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            <p style={{ fontSize: '14px', color: '#666' }}>
              <strong>Instructions:</strong> Time how long it takes patient to rise from chair, 
              walk 3 meters, turn around, walk back, and sit down.
            </p>
          </div>
        );

      default:
        return <p>Calculator interface not implemented yet.</p>;
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#667eea' }}>{calculator.name}</h3>
        <button
          onClick={onClose}
          style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Close
        </button>
      </div>

      <p style={{ marginBottom: '20px', color: '#666' }}>{calculator.description}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h4>Input:</h4>
          {renderInputFields()}
          <button
            onClick={handleCalculate}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '20px'
            }}>
            Calculate
          </button>
        </div>

        <div>
          <h4>Result:</h4>
          {result ? (
            <div style={{ padding: '15px', backgroundColor: result.error ? '#f8d7da' : '#d4edda', borderRadius: '4px' }}>
              {result.error ? (
                <p style={{ color: '#721c24', margin: 0 }}><strong>Error:</strong> {result.error}</p>
              ) : (
                <div>
                  {result.score !== undefined && (
                    <p><strong>Score:</strong> {result.score}{result.maxScore ? `/${result.maxScore}` : ''}</p>
                  )}
                  {result.interpretation && <p><strong>Interpretation:</strong> {result.interpretation}</p>}
                  {result.recommendation && <p><strong>Recommendation:</strong> {result.recommendation}</p>}
                  {result.risk && <p><strong>Risk Level:</strong> {result.risk}</p>}
                  {result.interventions && result.interventions.length > 0 && (
                    <div>
                      <strong>Interventions:</strong>
                      <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                        {result.interventions.map((intervention, idx) => (
                          <li key={idx}>{intervention}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>Enter values and click Calculate to see results.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App; 
