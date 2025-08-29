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
import { SpacedRepetitionSystem, initializeGeriatricsCards } from './utils/spacedRepetition.js';
import { ArticleManager, sampleGeriatricsArticles } from './utils/articleManager.js';
import emergencyProtocols from './data/emergencyProtocols.js';
// Import Patient Management System
import { PatientManagementTab } from './patientManagement/PatientManagementUI.jsx';
// Import On-Call Survival Kit
import { OnCallSurvivalKit } from './onCallSurvival/OnCallSurvivalKit.jsx';
// Import Language Support
import { LanguageProvider, useLanguage } from './localization/LanguageProvider.js';
import { LanguageSelector } from './components/LanguageSelector.jsx';

const AppContent = () => {
  // Initialize enhanced systems
  const [clinicalAI] = useState(() => new ClinicalAI());
  const { t, isRTL, getRTLStyles } = useLanguage();
  const [quizSystem] = useState(() => new EnhancedQuizSystem());
  const [srs] = useState(() => {
    const spacedRepetition = new SpacedRepetitionSystem();
    // Initialize with geriatrics cards if empty
    if (spacedRepetition.cards.size === 0) {
      initializeGeriatricsCards(spacedRepetition);
    }
    return spacedRepetition;
  });
  const [articleManager] = useState(() => {
    const manager = new ArticleManager();
    // Initialize with sample articles if empty
    if (manager.articles.size === 0) {
      sampleGeriatricsArticles.forEach(article => manager.addArticle(article));
    }
    return manager;
  });
  
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
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState('review'); // review, new, weak
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');

  // AI Assistant state
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Quiz explanation state
  const [quizExplanations, setQuizExplanations] = useState({});
  const [loadingExplanation, setLoadingExplanation] = useState(null);

  // Emergency protocol AI guidance state
  const [protocolGuidance, setProtocolGuidance] = useState({});
  const [loadingProtocolGuidance, setLoadingProtocolGuidance] = useState(null);

  // AI Assistant functions
  const handleAIQuestion = async () => {
    if (!aiQuestion.trim()) return;
    
    setAiLoading(true);
    const contextInfo = `Current tab: ${activeTab}. User is studying geriatrics medicine.`;
    
    try {
      const response = await clinicalAI.askAI(aiQuestion, contextInfo);
      setAiResponse(response);
    } catch (error) {
      setAiResponse({
        success: false,
        error: 'Failed to get AI response. Please try again.',
        timestamp: new Date().toISOString()
      });
    }
    
    setAiLoading(false);
  };

  const closeAIChat = () => {
    setShowAIChat(false);
    setAiQuestion('');
    setAiResponse(null);
  };

  // Quiz explanation function
  const getQuizExplanation = async (question, userAnswer, correctAnswer) => {
    const questionKey = `${question.id || question.q}`;
    
    if (quizExplanations[questionKey]) {
      return; // Already have explanation
    }
    
    setLoadingExplanation(questionKey);
    
    try {
      const explanationPrompt = `
Question: ${question.q || question.question}
User answered: ${userAnswer}
Correct answer: ${correctAnswer}
Explanation: ${question.explanation || 'Not provided'}

Please provide a clear, educational explanation of why the correct answer is right and why the user's answer (if different) is incorrect. Focus on the clinical reasoning and educational value for geriatrics medicine. Keep it concise but informative.
`;

      const response = await clinicalAI.askAI(explanationPrompt, 'Geriatrics quiz explanation');
      
      if (response.success) {
        setQuizExplanations(prev => ({
          ...prev,
          [questionKey]: response.answer
        }));
      }
    } catch (error) {
      console.error('Failed to get quiz explanation:', error);
    }
    
    setLoadingExplanation(null);
  };

  // Protocol AI guidance function
  const getProtocolGuidance = async (protocol, question, patientContext = '') => {
    const guidanceKey = `${protocol.title}_${question}`;
    
    if (protocolGuidance[guidanceKey]) {
      return; // Already have guidance
    }
    
    setLoadingProtocolGuidance(guidanceKey);
    
    try {
      const guidancePrompt = `
Protocol: ${protocol.title}
Clinical Question: ${question}
Patient Context: ${patientContext || 'General geriatric patient'}

Based on this emergency protocol for geriatric patients, provide specific clinical guidance. Include:
1. Key assessment points
2. Immediate actions to take
3. Red flags to watch for
4. Special considerations for elderly patients
5. Next steps in management

Keep the response practical and actionable for emergency/urgent care settings.
`;

      const response = await clinicalAI.askAI(guidancePrompt, `Emergency protocol guidance: ${protocol.title}`);
      
      if (response.success) {
        setProtocolGuidance(prev => ({
          ...prev,
          [guidanceKey]: response.answer
        }));
      }
    } catch (error) {
      console.error('Failed to get protocol guidance:', error);
    }
    
    setLoadingProtocolGuidance(null);
  };

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
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh', ...getRTLStyles() }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        ...getRTLStyles()
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
            {['dashboard', 'quiz', 'flashcards', 'ai-assistant', 'medications', 'protocols', 'calculators', 'emergency', 'articles', 'resources', 'patients', 'on-call', 'settings'].map(tab => (
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
                {tab === 'ai-assistant' ? t('navigation.aiAssistant', 'AI Assistant') : 
                 tab === 'calculators' ? t('navigation.calculators', 'Calculators') :
                 tab === 'patients' ? t('navigation.patients', 'Patients') :
                 tab === 'on-call' ? t('navigation.onCall', 'On-Call Kit') :
                 tab === 'settings' ? t('navigation.settings', 'Settings') :
                 t(`navigation.${tab}`, tab.charAt(0).toUpperCase() + tab.slice(1))}
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
              <div>
                {/* Summary */}
                <div style={{ textAlign: 'center', marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
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
                      setQuizExplanations({});
                    }}
                    style={{ padding: '15px 30px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Start New Quiz
                  </button>
                </div>

                {/* Detailed Review */}
                <div>
                  <h3 style={{ marginBottom: '20px' }}>📊 Detailed Review</h3>
                  {allQuestions.slice(0, currentQuestionIndex).map((question, idx) => {
                    const questionKey = question.id || question.q;
                    const userAnswer = userAnswers[questionKey] || userAnswers[question.id];
                    const correctAnswer = question.a || question.correct;
                    const isCorrect = userAnswer === correctAnswer;
                    
                    return (
                      <div key={idx} style={{ 
                        marginBottom: '25px', 
                        padding: '20px', 
                        border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
                        borderRadius: '8px',
                        backgroundColor: isCorrect ? '#f8fff8' : '#fff5f5'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                          <span style={{ 
                            fontSize: '20px', 
                            marginRight: '10px',
                            color: isCorrect ? '#28a745' : '#dc3545'
                          }}>
                            {isCorrect ? '✅' : '❌'}
                          </span>
                          <h4 style={{ margin: 0, flex: 1 }}>Question {idx + 1}</h4>
                          <span style={{ 
                            padding: '4px 8px',
                            backgroundColor: '#e7f3ff',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#0056b3'
                          }}>
                            {question.category}
                          </span>
                        </div>
                        
                        <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                          {question.q || question.question}
                        </p>
                        
                        <div style={{ marginBottom: '15px' }}>
                          <p><strong>Your Answer:</strong> <span style={{ color: isCorrect ? '#28a745' : '#dc3545' }}>{userAnswer}</span></p>
                          <p><strong>Correct Answer:</strong> <span style={{ color: '#28a745' }}>{correctAnswer}</span></p>
                        </div>
                        
                        {/* AI Explanation */}
                        {!isCorrect && (
                          <div style={{ marginTop: '15px' }}>
                            {!quizExplanations[questionKey] ? (
                              <button
                                onClick={() => getQuizExplanation(question, userAnswer, correctAnswer)}
                                disabled={loadingExplanation === questionKey}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: loadingExplanation === questionKey ? '#ccc' : '#667eea',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: loadingExplanation === questionKey ? 'not-allowed' : 'pointer',
                                  fontSize: '14px'
                                }}
                              >
                                {loadingExplanation === questionKey ? '🤔 Getting explanation...' : '🤖 Why is this correct?'}
                              </button>
                            ) : (
                              <div style={{
                                backgroundColor: '#e7f3ff',
                                padding: '15px',
                                borderRadius: '6px',
                                marginTop: '10px',
                                border: '1px solid #b3d4fc'
                              }}>
                                <h5 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>🤖 AI Explanation:</h5>
                                <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                  {quizExplanations[questionKey]}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Show basic explanation if available */}
                        {question.explanation && (
                          <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '12px',
                            borderRadius: '4px',
                            marginTop: '10px',
                            fontSize: '14px',
                            color: '#666'
                          }}>
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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

        {/* Flashcards Tab */}
        {activeTab === 'flashcards' && (
          <FlashcardsTab 
            srs={srs} 
            currentFlashcard={currentFlashcard}
            setCurrentFlashcard={setCurrentFlashcard}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            studyMode={studyMode}
            setStudyMode={setStudyMode}
          />
        )}

        {/* Emergency Protocols Tab */}
        {activeTab === 'emergency' && (
          <EmergencyProtocolsTab 
            protocols={emergencyProtocols}
            selectedProtocol={selectedProtocol}
            setSelectedProtocol={setSelectedProtocol}
            getProtocolGuidance={getProtocolGuidance}
            protocolGuidance={protocolGuidance}
            loadingProtocolGuidance={loadingProtocolGuidance}
          />
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <ArticlesTab 
            articleManager={articleManager}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
            searchQuery={articleSearchQuery}
            setSearchQuery={setArticleSearchQuery}
          />
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

        {activeTab === 'patients' && <PatientManagementTab />}

        {activeTab === 'on-call' && <OnCallSurvivalKit />}

        {activeTab === 'settings' && (
          <div>
            <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#667eea' }}>
                ⚙️ {t('settings.title', 'Settings')}
              </h2>
              <p style={{ margin: 0, color: '#666' }}>
                {t('settings.description', 'Customize your medical platform experience')}
              </p>
            </div>
            <LanguageSelector />
          </div>
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
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

      case 'CHADS2VASc':
        return (
          <div>
            <p><strong>Assess each risk factor:</strong></p>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.heartFailure || false}
                  onChange={(e) => updateInput('heartFailure', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Congestive heart failure/LV dysfunction (1 pt)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.hypertension || false}
                  onChange={(e) => updateInput('hypertension', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Hypertension (1 pt)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
              <input
                type="number"
                min="0"
                max="120"
                value={input[calculatorName]?.age || ''}
                onChange={(e) => updateInput('age', parseInt(e.target.value) || 0)}
                style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <small style={{ marginLeft: '10px', color: '#666' }}>
                (65-74: 1 pt, ≥75: 2 pts)
              </small>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.diabetes || false}
                  onChange={(e) => updateInput('diabetes', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Diabetes mellitus (1 pt)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.strokeHistory || false}
                  onChange={(e) => updateInput('strokeHistory', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Stroke/TIA/thromboembolism history (2 pts)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.vascularDisease || false}
                  onChange={(e) => updateInput('vascularDisease', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Vascular disease (MI, PAD, aortic plaque) (1 pt)
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={input[calculatorName]?.female || false}
                  onChange={(e) => updateInput('female', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Female sex (1 pt)
              </label>
            </div>
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

// Flashcards Component
const FlashcardsTab = ({ srs, currentFlashcard, setCurrentFlashcard, showAnswer, setShowAnswer, studyMode, setStudyMode }) => {
  const [stats, setStats] = useState(srs.getStats());
  
  const startStudy = (mode) => {
    setStudyMode(mode);
    let cards;
    switch(mode) {
      case 'new':
        cards = srs.getNewCards(1);
        break;
      case 'review':
        cards = srs.getDueCards(1);
        break;
      case 'weak':
        const weakAreas = srs.getWeakAreas();
        if (weakAreas.length > 0) {
          cards = srs.searchCards('').filter(card => card.category === weakAreas[0].category).slice(0, 1);
        } else {
          cards = srs.getDueCards(1);
        }
        break;
      default:
        cards = srs.getDueCards(1);
    }
    
    if (cards.length > 0) {
      setCurrentFlashcard(cards[0]);
      setShowAnswer(false);
    } else {
      setCurrentFlashcard(null);
    }
  };

  const reviewCard = (performance) => {
    if (!currentFlashcard) return;
    
    srs.reviewCard(currentFlashcard.id, performance);
    setStats(srs.getStats());
    
    // Load next card
    setTimeout(() => {
      startStudy(studyMode);
    }, 1000);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#667eea' }}>🎓 Spaced Repetition Flashcards</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#0056b3' }}>📚 Total Cards</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#0056b3' }}>{stats.totalCards}</p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#856404' }}>📖 Due Today</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#856404' }}>{stats.dueCards}</p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#0c5460' }}>🆕 New Cards</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#0c5460' }}>{stats.newCards}</p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#d4edda', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#155724' }}>✅ Mastered</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#155724' }}>{stats.masteredCards}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => startStudy('review')}
            style={{ padding: '10px 20px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            📖 Review Due Cards ({stats.dueCards})
          </button>
          <button
            onClick={() => startStudy('new')}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            🆕 Learn New Cards ({stats.newCards})
          </button>
          <button
            onClick={() => startStudy('weak')}
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            🎯 Focus Weak Areas
          </button>
        </div>
      </div>

      {currentFlashcard && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <span style={{ padding: '5px 15px', backgroundColor: '#f8f9fa', borderRadius: '20px', fontSize: '14px', color: '#666' }}>
              {currentFlashcard.category.toUpperCase()}
            </span>
          </div>

          <div style={{ minHeight: '200px', marginBottom: '30px' }}>
            <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Question:</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.5', margin: 0 }}>{currentFlashcard.front}</p>
            </div>

            {showAnswer && (
              <div style={{ padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#0056b3' }}>Answer:</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-line' }}>
                  {currentFlashcard.back}
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                style={{ padding: '12px 30px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                Show Answer
              </button>
            ) : (
              <>
                <button
                  onClick={() => reviewCard(1)}
                  style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  😰 Hard (Again)
                </button>
                <button
                  onClick={() => reviewCard(3)}
                  style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  😐 Good
                </button>
                <button
                  onClick={() => reviewCard(5)}
                  style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  😊 Easy
                </button>
              </>
            )}
          </div>

          {showAnswer && (
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
              <p>Rate how well you knew this answer:</p>
              <p><strong>Hard:</strong> Show again soon | <strong>Good:</strong> Normal interval | <strong>Easy:</strong> Longer interval</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Emergency Protocols Component
const EmergencyProtocolsTab = ({ protocols, selectedProtocol, setSelectedProtocol, getProtocolGuidance, protocolGuidance, loadingProtocolGuidance }) => {
  const criticalProtocols = Object.entries(protocols).filter(([_, protocol]) => protocol.urgency === 'CRITICAL');
  const highProtocols = Object.entries(protocols).filter(([_, protocol]) => protocol.urgency === 'HIGH');

  return (
    <div>
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '8px', borderLeft: '4px solid #dc3545' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>🚨 Emergency Protocols</h2>
        <p>Time-sensitive clinical protocols for emergency management in geriatric patients.</p>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>🔴 CRITICAL - Immediate Action Required</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '15px' }}>
          {criticalProtocols.map(([key, protocol]) => (
            <div key={key} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc3545' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>{protocol.title}</h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{protocol.description}</p>
              <div style={{ fontSize: '12px', marginBottom: '15px' }}>
                <span style={{ padding: '2px 8px', backgroundColor: '#dc3545', color: 'white', borderRadius: '4px', marginRight: '10px' }}>
                  {protocol.urgency}
                </span>
                <span style={{ color: '#666' }}>{protocol.timeFrame}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedProtocol(protocol)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  View Protocol
                </button>
                <button
                  onClick={() => getProtocolGuidance(protocol, 'What are the key assessment priorities for this emergency protocol?')}
                  disabled={loadingProtocolGuidance === `${protocol.title}_What are the key assessment priorities for this emergency protocol?`}
                  style={{
                    padding: '8px 12px', 
                    backgroundColor: loadingProtocolGuidance === `${protocol.title}_What are the key assessment priorities for this emergency protocol?` ? '#ccc' : '#667eea', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: loadingProtocolGuidance === `${protocol.title}_What are the key assessment priorities for this emergency protocol?` ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}>
                  🤖 AI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ color: '#fd7e14', marginBottom: '15px' }}>🟠 HIGH PRIORITY</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '15px' }}>
          {highProtocols.map(([key, protocol]) => (
            <div key={key} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #fd7e14' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#fd7e14' }}>{protocol.title}</h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{protocol.description}</p>
              <div style={{ fontSize: '12px', marginBottom: '15px' }}>
                <span style={{ padding: '2px 8px', backgroundColor: '#fd7e14', color: 'white', borderRadius: '4px', marginRight: '10px' }}>
                  {protocol.urgency}
                </span>
                <span style={{ color: '#666' }}>{protocol.timeFrame}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedProtocol(protocol)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  View Protocol
                </button>
                <button
                  onClick={() => getProtocolGuidance(protocol, 'What are the key assessment priorities for this emergency protocol?')}
                  disabled={loadingProtocolGuidance === `${protocol.title}_What are the key assessment priorities for this emergency protocol?`}
                  style={{
                    padding: '8px 12px', 
                    backgroundColor: loadingProtocolGuidance === `${protocol.title}_What are the key assessment priorities for this emergency protocol?` ? '#ccc' : '#667eea', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: loadingProtocolGuidance === `${protocol.title}_What are the key assessment priorities for this emergency protocol?` ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}>
                  🤖 AI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProtocol && (
        <div style={{ position: 'fixed', top: '5%', left: '5%', right: '5%', bottom: '5%', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', overflow: 'auto', zIndex: 1000 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #dc3545', paddingBottom: '10px' }}>
            <div>
              <h2 style={{ margin: 0, color: '#dc3545' }}>{selectedProtocol.title}</h2>
              <span style={{ padding: '4px 12px', backgroundColor: '#dc3545', color: 'white', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                {selectedProtocol.urgency} - {selectedProtocol.timeFrame}
              </span>
            </div>
            <button
              onClick={() => setSelectedProtocol(null)}
              style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
              ✕ Close
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#666' }}>{selectedProtocol.description}</p>
            
            {/* AI Guidance Section */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#667eea', display: 'flex', alignItems: 'center' }}>
                🤖 AI Clinical Guidance
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {[
                  'What are the key assessment priorities?',
                  'What are the red flags to watch for?',
                  'Special considerations for elderly patients?',
                  'Next steps in management?'
                ].map((question, idx) => {
                  const guidanceKey = `${selectedProtocol.title}_${question}`;
                  const isLoading = loadingProtocolGuidance === guidanceKey;
                  const hasResponse = protocolGuidance[guidanceKey];
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => getProtocolGuidance(selectedProtocol, question)}
                      disabled={isLoading}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: isLoading ? '#ccc' : (hasResponse ? '#28a745' : '#667eea'),
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                        textAlign: 'left'
                      }}
                    >
                      {isLoading ? '🤔 Loading...' : (hasResponse ? '✅' : '🤖')} {question}
                    </button>
                  );
                })}
              </div>
              
              {/* Display AI Guidance Responses */}
              {Object.entries(protocolGuidance).filter(([key]) => key.startsWith(selectedProtocol.title)).map(([key, response]) => {
                const question = key.replace(`${selectedProtocol.title}_`, '');
                return (
                  <div key={key} style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#e7f3ff',
                    border: '1px solid #b3d4fc',
                    borderRadius: '6px'
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>
                      🤖 {question}
                    </h5>
                    <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap', fontSize: '14px' }}>
                      {response}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedProtocol.assessment && (
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#dc3545' }}>🔍 Assessment:</h3>
              <ol style={{ lineHeight: '1.6' }}>
                {selectedProtocol.assessment.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {selectedProtocol.interventions && (
            <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>⚡ Immediate Interventions:</h3>
              <ul>
                {selectedProtocol.interventions.map((intervention, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>{intervention}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedProtocol.medications && (
            <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>💊 Medications:</h3>
              {typeof selectedProtocol.medications === 'object' ? (
                Object.entries(selectedProtocol.medications).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong>
                    {Array.isArray(value) ? (
                      <ul style={{ marginTop: '5px' }}>
                        {value.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    ) : (
                      <p style={{ margin: '5px 0' }}>{value}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>{selectedProtocol.medications}</p>
              )}
            </div>
          )}

          {selectedProtocol.redFlags && (
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#721c24' }}>🚩 Red Flags:</h3>
              <ul>
                {selectedProtocol.redFlags.map((flag, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>{flag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Articles Component
const ArticlesTab = ({ articleManager, selectedArticle, setSelectedArticle, searchQuery, setSearchQuery }) => {
  const [articles, setArticles] = useState(Array.from(articleManager.articles.values()));
  const [filters, setFilters] = useState({ sortBy: 'relevance' });
  const [stats, setStats] = useState(articleManager.getStatistics());

  const searchArticles = () => {
    const results = articleManager.searchArticles(searchQuery, filters);
    setArticles(results);
  };

  useEffect(() => {
    searchArticles();
  }, [searchQuery, filters]);

  return (
    <div>
      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#667eea' }}>📚 Medical Literature Library</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
            <strong>{stats.totalArticles}</strong><br/>
            <small>Total Articles</small>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
            <strong>{stats.byStatus.unread}</strong><br/>
            <small>Unread</small>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
            <strong>{stats.byStatus.read}</strong><br/>
            <small>Read</small>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
            <strong>{stats.favorites}</strong><br/>
            <small>Favorites</small>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="year">Sort by Year</option>
            <option value="title">Sort by Title</option>
            <option value="addedDate">Sort by Date Added</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {articles.map(article => (
          <div key={article.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{ 
                padding: '2px 8px', 
                backgroundColor: article.priority === 'high' ? '#dc3545' : article.priority === 'medium' ? '#ffc107' : '#28a745',
                color: 'white',
                fontSize: '12px',
                borderRadius: '4px'
              }}>
                {article.priority?.toUpperCase()}
              </span>
              <span style={{ fontSize: '14px', color: '#666' }}>{article.year}</span>
            </div>
            
            <h4 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px', lineHeight: '1.3' }}>
              {article.title}
            </h4>
            
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              {article.authors.join(', ')}
            </p>
            
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#666', marginBottom: '15px' }}>
              {article.journal}
            </p>
            
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: '1.4' }}>
              {article.abstract.substring(0, 200)}...
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
              {Array.from(article.tags).slice(0, 3).map(tag => (
                <span key={tag} style={{ padding: '2px 6px', backgroundColor: '#f8f9fa', fontSize: '12px', borderRadius: '3px' }}>
                  {tag}
                </span>
              ))}
            </div>
            
            <button
              onClick={() => setSelectedArticle(article)}
              style={{ width: '100%', padding: '8px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Read Article
            </button>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div style={{ position: 'fixed', top: '5%', left: '5%', right: '5%', bottom: '5%', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', overflow: 'auto', zIndex: 1000 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '2px solid #667eea', paddingBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#667eea' }}>{selectedArticle.title}</h2>
              <p style={{ margin: '0', color: '#666' }}>{selectedArticle.authors.join(', ')} ({selectedArticle.year})</p>
              <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', color: '#666' }}>{selectedArticle.journal}</p>
            </div>
            <button
              onClick={() => setSelectedArticle(null)}
              style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
              ✕ Close
            </button>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Abstract</h3>
            <p style={{ lineHeight: '1.6', textAlign: 'justify' }}>{selectedArticle.abstract}</p>
          </div>

          {selectedArticle.doi && (
            <div style={{ marginBottom: '15px' }}>
              <strong>DOI:</strong> <a href={`https://doi.org/${selectedArticle.doi}`} target="_blank" rel="noopener noreferrer">{selectedArticle.doi}</a>
            </div>
          )}

          {selectedArticle.pmid && (
            <div style={{ marginBottom: '15px' }}>
              <strong>PubMed ID:</strong> <a href={`https://pubmed.ncbi.nlm.nih.gov/${selectedArticle.pmid}`} target="_blank" rel="noopener noreferrer">{selectedArticle.pmid}</a>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '20px' }}>
            {Array.from(selectedArticle.tags).map(tag => (
              <span key={tag} style={{ padding: '4px 8px', backgroundColor: '#e7f3ff', color: '#0056b3', fontSize: '12px', borderRadius: '4px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setShowAIChat(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        title="AI Clinical Assistant"
      >
        🤖
      </button>

      {/* AI Chat Modal */}
      {showAIChat && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            {/* Header */}
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px' }}>🤖 AI Clinical Assistant</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
                  Ask me anything about geriatrics and clinical medicine
                </p>
              </div>
              <button
                onClick={closeAIChat}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '20px' }}>
              {/* Current Context */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '10px 15px',
                borderRadius: '8px',
                marginBottom: '15px',
                fontSize: '14px',
                color: '#666'
              }}>
                <strong>Context:</strong> Currently on {activeTab} tab - Geriatrics Study Platform
              </div>

              {/* Question Input */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Your Question:
                </label>
                <textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask about clinical guidelines, drug interactions, assessment tools, or any geriatrics topic..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    resize: 'vertical',
                    fontSize: '14px'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAIQuestion();
                    }
                  }}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleAIQuestion}
                disabled={!aiQuestion.trim() || aiLoading}
                style={{
                  backgroundColor: aiLoading ? '#ccc' : '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: aiLoading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}
              >
                {aiLoading ? '🤔 Thinking...' : '🚀 Ask AI'}
              </button>

              {/* AI Response */}
              {aiResponse && (
                <div style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: aiResponse.success ? '#f8fff8' : '#fff5f5'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    color: aiResponse.success ? '#28a745' : '#dc3545'
                  }}>
                    <strong>
                      {aiResponse.success ? '✅ AI Response' : '❌ Error'}
                      {aiResponse.model && ` (${aiResponse.model})`}
                    </strong>
                    <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
                      {new Date(aiResponse.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div style={{
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    color: '#333'
                  }}>
                    {aiResponse.success ? aiResponse.answer : aiResponse.error}
                  </div>
                </div>
              )}

              {/* Quick Suggestions */}
              {!aiResponse && !aiLoading && (
                <div style={{ marginTop: '15px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                    💡 Quick Questions:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {[
                      "What are the contraindications for tPA in elderly stroke patients?",
                      "How do I calculate CHA₂DS₂-VASc score for anticoagulation decisions?",
                      "What are the key components of delirium assessment using CAM?",
                      "Which medications should be avoided in elderly per Beers criteria?"
                    ].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAiQuestion(suggestion)}
                        style={{
                          textAlign: 'left',
                          padding: '8px 12px',
                          backgroundColor: '#f0f2f5',
                          border: '1px solid #e0e0e0',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: '#667eea'
                        }}
                      >
                        "{suggestion}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App; 
