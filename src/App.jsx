import React, { useState, useEffect } from 'react';
import { boardQuestions } from './data/questions.js';
import { medications as medicationDatabase } from './data/medications.js';
import { protocols } from './data/protocols.js';

const App = () => {
  // Flatten all questions from categories
  const allQuestions = Object.entries(boardQuestions).flatMap(([category, questions]) => 
    questions.map(q => ({...q, category}))
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
            {['dashboard', 'quiz', 'medications', 'protocols', 'resources'].map(tab => (
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
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              <h3 style={{ color: '#667eea', marginTop: 0 }}>Question Categories</h3>
              {Object.entries(boardQuestions).map(([category, questions]) => (
                <p key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}: {questions.length} questions
                </p>
              ))}
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
                  <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                    {allQuestions[currentQuestionIndex].question}
                  </p>
                  
                  {allQuestions[currentQuestionIndex].options.map((option, idx) => (
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
                  ))}
                </div>
                
                {userAnswers[allQuestions[currentQuestionIndex].id] !== undefined && (
                  <div style={{ 
                    padding: '15px', 
                    backgroundColor: userAnswers[allQuestions[currentQuestionIndex].id] === allQuestions[currentQuestionIndex].answer ? '#d4edda' : '#f8d7da',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}>
                    {userAnswers[allQuestions[currentQuestionIndex].id] === allQuestions[currentQuestionIndex].answer ? '✓ Correct!' : '✗ Incorrect'}
                    <p style={{ marginTop: '10px' }}>
                      <strong>Explanation:</strong> {allQuestions[currentQuestionIndex].explanation}
                    </p>
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

export default App; 
