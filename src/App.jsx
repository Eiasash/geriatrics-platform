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

export default App;      id: 'dem2',
      category: 'Dementia',
      question: 'Which cognitive screening tool is recommended for Medicare Annual Wellness Visit?',
      options: ['MMSE', 'Mini-Cog', 'Full neuropsychological battery', 'CT scan'],
      answer: 1,
      explanation: 'Mini-Cog, GPCOG, or MIS are recommended - take <5 minutes and have good psychometric properties.',
      hebrewQuestion: 'איזה כלי סקר קוגניטיבי מומלץ לבדיקה שנתית?'
    },
    {
      id: 'dem3',
      category: 'Dementia',
      question: 'Patient with dementia has visual hallucinations and parkinsonism. Most likely diagnosis?',
      options: ['Alzheimer disease', 'Vascular dementia', 'Lewy body dementia', 'Normal pressure hydrocephalus'],
      answer: 2,
      explanation: 'Visual hallucinations + parkinsonism + cognitive decline = classic triad for Lewy body dementia.',
      hebrewQuestion: 'חולה עם דמנציה, הזיות ראייה ופרקינסוניזם. האבחנה?'
    },

    // Delirium (Based on Chapter 58)
    {
      id: 'del1',
      category: 'Delirium',
      question: 'Most important diagnostic feature distinguishing delirium from dementia?',
      options: ['Acute onset', 'Memory impairment', 'Disorientation', 'Behavioral changes'],
      answer: 0,
      explanation: 'Acute onset and fluctuating course are hallmarks of delirium vs gradual progression in dementia.',
      hebrewQuestion: 'מה מבדיל דליריום מדמנציה?'
    },
    {
      id: 'del2',
      category: 'Delirium',
      question: 'Best validated tool for delirium screening in hospitalized elderly?',
      options: ['MMSE', 'CAM', 'GDS', 'Clock drawing test'],
      answer: 1,
      explanation: 'CAM (Confusion Assessment Method) has 94-100% sensitivity and 90-95% specificity for delirium.',
      hebrewQuestion: 'הכלי הטוב ביותר לאבחון דליריום בקשישים מאושפזים?'
    },
    {
      id: 'del3',
      category: 'Delirium',
      question: '75yo post-op day 2, confused, pulling at IV lines. First-line management?',
      options: ['Haloperidol', 'Physical restraints', 'Non-pharmacologic interventions', 'Benzodiazepines'],
      answer: 2,
      explanation: 'Non-pharmacologic interventions (orientation, mobilization, sleep hygiene) are first-line for delirium.',
      hebrewQuestion: 'קשיש לאחר ניתוח, מבולבל. הטיפול הראשוני?'
    },

    // Depression (Based on Chapter 65)
    {
      id: 'dep1',
      category: 'Depression',
      question: 'First-line antidepressant for elderly patient with depression?',
      options: ['Amitriptyline', 'Sertraline', 'Paroxetine', 'Imipramine'],
      answer: 1,
      explanation: 'SSRIs like sertraline are first-line due to better tolerability and safety profile in elderly.',
      hebrewQuestion: 'התרופה הראשונה לדיכאון בקשישים?'
    },
    {
      id: 'dep2',
      category: 'Depression',
      question: 'Elderly patient on sertraline develops hyponatremia. Next step?',
      options: ['Increase dose', 'Add second antidepressant', 'Check sodium and consider switching', 'Continue same dose'],
      answer: 2,
      explanation: 'SSRI-induced hyponatremia is common in elderly. Check Na+ and consider alternative if significant.',
      hebrewQuestion: 'קשיש על סרטרלין מפתח היפונתרמיה. מה הצעד הבא?'
    },

    // Falls & Fractures
    {
      id: 'fall1',
      category: 'Falls',
      question: 'Most effective single intervention to prevent falls in community-dwelling elderly?',
      options: ['Vitamin D supplementation', 'Exercise programs', 'Medication review', 'Vision correction'],
      answer: 1,
      explanation: 'Exercise programs, especially balance and strength training, reduce falls by 23-29%.',
      hebrewQuestion: 'ההתערבות היעילה ביותר למניעת נפילות?'
    },
    {
      id: 'fall2',
      category: 'Falls',
      question: '85yo with 3 falls in 6 months. Which assessment tool to use?',
      options: ['Timed Up and Go', 'MMSE', 'PHQ-9', 'Barthel Index'],
      answer: 0,
      explanation: 'Timed Up and Go test assesses functional mobility and fall risk. >12 seconds indicates increased risk.',
      hebrewQuestion: 'קשיש עם 3 נפילות. איזה כלי הערכה להשתמש?'
    },
    {
      id: 'fall3',
      category: 'Falls',
      question: 'Hip fracture patient, post-op day 1. When to start weight bearing?',
      options: ['Immediately', 'After 1 week', 'After 2 weeks', 'After 6 weeks'],
      answer: 0,
      explanation: 'Early mobilization and immediate weight bearing (as tolerated) improves outcomes after hip fracture surgery.',
      hebrewQuestion: 'מתי להתחיל עומס לאחר שבר בצוואר הירך?'
    },

    // Polypharmacy & Medication Management
    {
      id: 'poly1',
      category: 'Polypharmacy',
      question: 'According to Beers Criteria, which should be avoided in elderly?',
      options: ['Metformin', 'Lisinopril', 'Diphenhydramine', 'Atorvastatin'],
      answer: 2,
      explanation: 'Diphenhydramine (anticholinergic) increases risk of confusion, falls, and cognitive impairment.',
      hebrewQuestion: 'לפי קריטריוני Beers, מה להימנע בקשישים?'
    },
    {
      id: 'poly2',
      category: 'Polypharmacy',
      question: '80yo with CrCl 28 mL/min needs anticoagulation for AF. Best choice?',
      options: ['Warfarin', 'Dabigatran', 'Apixaban 2.5mg BID', 'Aspirin only'],
      answer: 2,
      explanation: 'Apixaban with dose reduction (2.5mg BID) is safest in severe renal impairment.',
      hebrewQuestion: 'קשיש עם CrCl 28 וAF. מה האנטיקואגולנט המומלץ?'
    },
    {
      id: 'poly3',
      category: 'Polypharmacy',
      question: 'Elderly patient on 8 medications. Best deprescribing approach?',
      options: ['Stop all at once', 'Taper one at a time', 'Continue all', 'Stop half randomly'],
      answer: 1,
      explanation: 'Systematic deprescribing: taper one medication at a time, monitoring for effects.',
      hebrewQuestion: 'קשיש על 8 תרופות. איך להפחית?'
    },

    // Frailty
    {
      id: 'frail1',
      category: 'Frailty',
      question: 'Which is NOT a Fried frailty criterion?',
      options: ['Weight loss >10 lbs/year', 'Exhaustion', 'Polypharmacy', 'Slow walking speed'],
      answer: 2,
      explanation: 'Fried criteria: weight loss, exhaustion, weakness, slow walking, low activity. Not polypharmacy.',
      hebrewQuestion: 'מה לא נכלל בקריטריוני Fried לשבריריות?'
    },
    {
      id: 'frail2',
      category: 'Frailty',
      question: '88yo with BMI 17, albumin 2.8, weight loss 8kg/6mo. Priority intervention?',
      options: ['Start statin', 'Nutritional support', 'Increase exercise', 'Add vitamin D only'],
      answer: 1,
      explanation: 'Severe malnutrition requires urgent nutritional intervention as priority.',
      hebrewQuestion: 'קשיש עם BMI 17, אלבומין 2.8. מה הטיפול הדחוף?'
    },

    // Comprehensive Geriatric Assessment
    {
      id: 'cga1',
      category: 'Assessment',
      question: 'Components of comprehensive geriatric assessment include all EXCEPT?',
      options: ['Functional status', 'Cognitive assessment', 'Chest X-ray', 'Social support'],
      answer: 2,
      explanation: 'CGA includes functional, cognitive, social, but not routine imaging without indication.',
      hebrewQuestion: 'מה לא כלול בהערכה גריאטרית מקיפה?'
    },
    {
      id: 'cga2',
      category: 'Assessment',
      question: 'Best tool to assess activities of daily living (ADL)?',
      options: ['Katz Index', 'MMSE', 'GDS', 'Timed Up and Go'],
      answer: 0,
      explanation: 'Katz Index specifically assesses basic ADLs: bathing, dressing, toileting, transferring, continence, feeding.',
      hebrewQuestion: 'הכלי הטוב להערכת ADL?'
    },

    // Urinary Incontinence
    {
      id: 'ui1',
      category: 'Incontinence',
      question: '75yo woman with urgency and frequency. First-line treatment?',
      options: ['Oxybutynin', 'Surgery', 'Bladder training', 'Indwelling catheter'],
      answer: 2,
      explanation: 'Behavioral interventions (bladder training, scheduled voiding) are first-line for urge incontinence.',
      hebrewQuestion: 'אישה עם דחיפות ותכיפות. הטיפול הראשוני?'
    },
    {
      id: 'ui2',
      category: 'Incontinence',
      question: 'Stress incontinence in elderly woman. Best initial management?',
      options: ['Anticholinergics', 'Pelvic floor exercises', 'Immediate surgery', 'Permanent catheter'],
      answer: 1,
      explanation: 'Pelvic floor muscle training (Kegel exercises) is first-line for stress incontinence.',
      hebrewQuestion: 'אי-נקיטת שתן במאמץ. הטיפול הראשוני?'
    },

    // Osteoporosis & Bone Health
    {
      id: 'bone1',
      category: 'Osteoporosis',
      question: '72yo woman, T-score -2.8, previous vertebral fracture. Treatment?',
      options: ['Calcium only', 'Bisphosphonate', 'Observation', 'Vitamin D only'],
      answer: 1,
      explanation: 'T-score ≤-2.5 or fragility fracture = osteoporosis requiring treatment, typically bisphosphonate.',
      hebrewQuestion: 'אישה עם T-score -2.8 ושבר חולייתי. הטיפול?'
    },
    {
      id: 'bone2',
      category: 'Osteoporosis',
      question: 'Bisphosphonate contraindication?',
      options: ['Diabetes', 'CrCl <30', 'Hypertension', 'Hypothyroidism'],
      answer: 1,
      explanation: 'Bisphosphonates contraindicated if CrCl <30-35 mL/min due to renal accumulation.',
      hebrewQuestion: 'מתי אסור לתת ביספוספונטים?'
    },

    // Diabetes in Elderly
    {
      id: 'dm1',
      category: 'Diabetes',
      question: 'HbA1c goal for frail elderly with limited life expectancy?',
      options: ['<7%', '<7.5%', '<8.5%', '<10%'],
      answer: 2,
      explanation: 'Relaxed glycemic goals (HbA1c <8.5%) for frail elderly to avoid hypoglycemia.',
      hebrewQuestion: 'יעד HbA1c לקשיש שברירי?'
    },
    {
      id: 'dm2',
      category: 'Diabetes',
      question: 'Best oral diabetes medication for elderly with CKD?',
      options: ['Metformin', 'Glyburide', 'Linagliptin', 'Pioglitazone'],
      answer: 2,
      explanation: 'DPP-4 inhibitors like linagliptin dont need renal adjustment and have low hypoglycemia risk.',
      hebrewQuestion: 'התרופה הטובה לסוכרת עם אי-ספיקת כליות?'
    },

    // Hypertension
    {
      id: 'htn1',
      category: 'Hypertension',
      question: 'BP goal for 82yo with diabetes per SPRINT trial?',
      options: ['<120/80', '<130/80', '<140/90', '<150/90'],
      answer: 1,
      explanation: 'SPRINT showed benefit of SBP <120 but most guidelines recommend <130/80 for elderly with comorbidities.',
      hebrewQuestion: 'יעד לחץ דם לקשיש עם סוכרת?'
    },
    {
      id: 'htn2',
      category: 'Hypertension',
      question: 'First-line antihypertensive for elderly?',
      options: ['Beta-blocker', 'Thiazide', 'Alpha-blocker', 'Central agonist'],
      answer: 1,
      explanation: 'Thiazides, ACE-I/ARBs, and CCBs are first-line. Avoid beta-blockers unless other indication.',
      hebrewQuestion: 'תרופה ראשונה ליתר לחץ דם בקשישים?'
    },

    // Heart Failure
    {
      id: 'hf1',
      category: 'Heart Failure',
      question: 'Elderly with HFrEF on max medical therapy, still symptomatic. Next step?',
      options: ['Increase diuretic', 'Add digoxin', 'Consider device therapy', 'Add nitrates'],
      answer: 2,
      explanation: 'Consider CRT/ICD for symptomatic HFrEF despite optimal medical therapy.',
      hebrewQuestion: 'קשיש עם HFrEF סימפטומטי למרות טיפול. מה הצעד הבא?'
    },
    {
      id: 'hf2',
      category: 'Heart Failure',
      question: 'BNP level suggesting HF in 85yo?',
      options: ['>100 pg/mL', '>170 pg/mL', '>300 pg/mL', '>500 pg/mL'],
      answer: 1,
      explanation: 'Age-adjusted BNP: age × 2. For 85yo, BNP >170 suggests HF.',
      hebrewQuestion: 'רמת BNP המעידה על אי-ספיקת לב בגיל 85?'
    },

    // Atrial Fibrillation
    {
      id: 'af1',
      category: 'Arrhythmia',
      question: 'CHA2DS2-VASc score 5 in 80yo woman with AF. Management?',
      options: ['Aspirin only', 'Anticoagulation', 'No treatment', 'Dual antiplatelet'],
      answer: 1,
      explanation: 'CHA2DS2-VASc ≥2 in women requires anticoagulation unless contraindicated.',
      hebrewQuestion: 'ניקוד CHA2DS2-VASc 5 באישה עם AF. הטיפול?'
    },
    {
      id: 'af2',
      category: 'Arrhythmia',
      question: 'Preferred rate control for elderly with AF and HF?',
      options: ['Diltiazem', 'Metoprolol', 'Amiodarone', 'Digoxin monotherapy'],
      answer: 1,
      explanation: 'Beta-blockers preferred for rate control in AF with HF. Avoid non-DHP CCBs.',
      hebrewQuestion: 'בקרת קצב מועדפת ב-AF עם אי-ספיקת לב?'
    },

    // Pneumonia & Infections
    {
      id: 'inf1',
      category: 'Infections',
      question: 'CAP in nursing home resident. Empiric treatment?',
      options: ['Amoxicillin', 'Levofloxacin + amoxicillin/clavulanate', 'Azithromycin alone', 'Ceftriaxone alone'],
      answer: 1,
      explanation: 'Healthcare-associated pneumonia needs broader coverage for resistant organisms.',
      hebrewQuestion: 'דלקת ריאות בדייר מוסד. הטיפול האמפירי?'
    },
    {
      id: 'inf2',
      category: 'Infections',
      question: 'Asymptomatic bacteriuria in 85yo woman. Treatment?',
      options: ['Ciprofloxacin', 'Nitrofurantoin', 'No treatment', 'Cephalexin'],
      answer: 2,
      explanation: 'Dont treat asymptomatic bacteriuria in elderly unless pregnant or pre-urologic procedure.',
      hebrewQuestion: 'בקטריוריה אסימפטומטית בקשישה. הטיפול?'
    },

    // Parkinson Disease
    {
      id: 'pd1',
      category: 'Parkinson',
      question: 'Initial treatment for 72yo with mild Parkinson symptoms?',
      options: ['Levodopa', 'Dopamine agonist', 'MAO-B inhibitor', 'Amantadine'],
      answer: 0,
      explanation: 'Levodopa most effective and better tolerated in elderly than dopamine agonists.',
      hebrewQuestion: 'הטיפול הראשוני לפרקינסון קל בקשיש?'
    },
    {
      id: 'pd2',
      category: 'Parkinson',
      question: 'Parkinson patient with visual hallucinations. Management?',
      options: ['Increase levodopa', 'Add haloperidol', 'Reduce dopaminergic meds', 'Add benzodiazepine'],
      answer: 2,
      explanation: 'First step: reduce dopaminergic medications. If needed, add quetiapine or pimavanserin.',
      hebrewQuestion: 'חולה פרקינסון עם הזיות. הטיפול?'
    },

    // Sleep Disorders
    {
      id: 'sleep1',
      category: 'Sleep',
      question: 'First-line treatment for insomnia in elderly?',
      options: ['Zolpidem', 'Diphenhydramine', 'CBT-I', 'Benzodiazepines'],
      answer: 2,
      explanation: 'Cognitive Behavioral Therapy for Insomnia (CBT-I) is first-line, avoiding sedative risks.',
      hebrewQuestion: 'הטיפול הראשון לנדודי שינה בקשישים?'
    },
    {
      id: 'sleep2',
      category: 'Sleep',
      question: 'REM sleep behavior disorder. Associated with?',
      options: ['Alzheimer disease', 'Vascular dementia', 'Lewy body/Parkinson', 'Normal aging'],
      answer: 2,
      explanation: 'RBD strongly associated with synucleinopathies (Parkinson, Lewy body dementia).',
      hebrewQuestion: 'הפרעת התנהגות בשנת REM קשורה ל?'
    },

    // Nutrition
    {
      id: 'nut1',
      category: 'Nutrition',
      question: 'MNA-SF score 8 in 80yo. Indicates?',
      options: ['Normal nutrition', 'At risk', 'Malnourished', 'Obese'],
      answer: 1,
      explanation: 'MNA-SF: 12-14 normal, 8-11 at risk, 0-7 malnourished.',
      hebrewQuestion: 'ניקוד MNA-SF 8 מעיד על?'
    },
    {
      id: 'nut2',
      category: 'Nutrition',
      question: 'Best marker for nutritional status in acute illness?',
      options: ['Albumin', 'Prealbumin', 'Total protein', 'Weight'],
      answer: 1,
      explanation: 'Prealbumin (half-life 2-3 days) better than albumin (half-life 20 days) for acute changes.',
      hebrewQuestion: 'הסמן הטוב לתזונה במחלה חריפה?'
    },

    // Pressure Ulcers
    {
      id: 'pu1',
      category: 'Skin',
      question: 'Stage 3 pressure ulcer. Description?',
      options: ['Non-blanchable erythema', 'Partial thickness', 'Full thickness to fascia', 'Exposed bone'],
      answer: 2,
      explanation: 'Stage 3: full thickness tissue loss, subcutaneous fat visible, no bone/tendon/muscle exposed.',
      hebrewQuestion: 'פצע לחץ דרגה 3. התיאור?'
    },
    {
      id: 'pu2',
      category: 'Skin',
      question: 'Best prevention for pressure ulcers?',
      options: ['Massage bony prominences', 'Reposition q2h', 'Keep HOB >45°', 'Donut cushions'],
      answer: 1,
      explanation: 'Repositioning every 2 hours most effective. Avoid massage of bony prominences.',
      hebrewQuestion: 'המניעה הטובה ביותר לפצעי לחץ?'
    },

    // Hearing & Vision
    {
      id: 'sens1',
      category: 'Sensory',
      question: 'Most common cause of vision loss in elderly?',
      options: ['Cataracts', 'Glaucoma', 'Diabetic retinopathy', 'Macular degeneration'],
      answer: 3,
      explanation: 'Age-related macular degeneration is leading cause of irreversible vision loss in elderly.',
      hebrewQuestion: 'הגורם השכיח לאובדן ראייה בקשישים?'
    },
    {
      id: 'sens2',
      category: 'Sensory',
      question: 'Hearing aid use associated with?',
      options: ['No cognitive benefit', '19% reduction in cognitive decline', '50% reduction', 'Increased confusion'],
      answer: 1,
      explanation: 'Lancet Commission 2020: hearing aid use associated with 19% reduction in cognitive decline.',
      hebrewQuestion: 'מכשירי שמיעה קשורים ל?'
    },

    // Pain Management
    {
      id: 'pain1',
      category: 'Pain',
      question: 'First-line analgesic for osteoarthritis in elderly?',
      options: ['NSAIDs', 'Acetaminophen', 'Opioids', 'Gabapentin'],
      answer: 1,
      explanation: 'Acetaminophen first-line due to safety. NSAIDs have GI/renal/CV risks in elderly.',
      hebrewQuestion: 'משכך כאבים ראשון לדלקת פרקים?'
    },
    {
      id: 'pain2',
      category: 'Pain',
      question: 'Neuropathic pain in elderly. Best choice?',
      options: ['Amitriptyline', 'Gabapentin', 'Morphine', 'Aspirin'],
      answer: 1,
      explanation: 'Gabapentin or pregabalin preferred. Avoid TCAs like amitriptyline (anticholinergic).',
      hebrewQuestion: 'הטיפול הטוב לכאב נוירופתי?'
    },

    // End of Life
    {
      id: 'eol1',
      category: 'Palliative',
      question: 'Delirium at end of life. First-line medication?',
      options: ['Benzodiazepines', 'Haloperidol', 'Physical restraints', 'Meperidine'],
      answer: 1,
      explanation: 'Haloperidol first-line for terminal delirium. Low dose 0.5-1mg.',
      hebrewQuestion: 'דליריום בסוף החיים. התרופה המועדפת?'
    },
    {
      id: 'eol2',
      category: 'Palliative',
      question: 'Dyspnea in dying patient. Best treatment?',
      options: ['Oxygen only', 'Morphine', 'Anxiolytics only', 'Antibiotics'],
      answer: 1,
      explanation: 'Opioids (morphine) most effective for dyspnea at end of life.',
      hebrewQuestion: 'קוצר נשימה בחולה גוסס. הטיפול?'
    },

    // Ethics
    {
      id: 'eth1',
      category: 'Ethics',
      question: 'Capacity assessment requires all EXCEPT?',
      options: ['Understanding information', 'MMSE >24', 'Appreciating consequences', 'Expressing choice'],
      answer: 1,
      explanation: 'Capacity requires understanding, appreciation, reasoning, and choice. MMSE score alone insufficient.',
      hebrewQuestion: 'הערכת כשירות דורשת הכל חוץ מ?'
    },
    {
      id: 'eth2',
      category: 'Ethics',
      question: 'Advanced directive becomes active when?',
      options: ['Immediately upon signing', 'When patient lacks capacity', 'At family request', 'After court approval'],
      answer: 1,
      explanation: 'Advanced directives activate when patient lacks decision-making capacity.',
      hebrewQuestion: 'מתי הנחיות מקדימות נכנסות לתוקף?'
    },

    // Transitions of Care
    {
      id: 'trans1',
      category: 'Transitions',
      question: 'Most effective intervention to prevent readmission?',
      options: ['Medication list', 'Follow-up call', 'Comprehensive discharge planning', 'Written instructions'],
      answer: 2,
      explanation: 'Comprehensive discharge planning with follow-up reduces 30-day readmissions by 25%.',
      hebrewQuestion: 'ההתערבות הטובה למניעת אשפוז חוזר?'
    },
    {
      id: 'trans2',
      category: 'Transitions',
      question: 'Medication reconciliation should occur?',
      options: ['At discharge only', 'At admission only', 'Every transition', 'Weekly'],
      answer: 2,
      explanation: 'Medication reconciliation required at every transition to prevent errors.',
      hebrewQuestion: 'מתי לבצע התאמת תרופות?'
    },

    // Technology & Aging
    {
      id: 'tech1',
      category: 'Technology',
      question: 'Telemedicine for elderly. Main barrier?',
      options: ['Cost', 'Digital literacy', 'Availability', 'Regulations'],
      answer: 1,
      explanation: 'Digital literacy and technology access main barriers for elderly telemedicine adoption.',
      hebrewQuestion: 'המחסום העיקרי לטלרפואה בקשישים?'
    },

    // Israeli Healthcare Context
    {
      id: 'isr1',
      category: 'Israeli System',
      question: 'Sal Habriut (סל הבריאות) covers which DOAC for elderly?',
      options: ['All DOACs equally', 'Apixaban/Rivaroxaban with criteria', 'None', 'Only warfarin'],
      answer: 1,
      explanation: 'Israeli health basket covers DOACs with specific criteria (CHA2DS2-VASc score, contraindications).',
      hebrewQuestion: 'איזה DOAC מכוסה בסל לקשישים?'
    },
    {
      id: 'isr2',
      category: 'Israeli System',
      question: 'Law for rights of elderly in Israel enacted?',
      options: ['1989', '1995', '2000', '2005'],
      answer: 0,
      explanation: 'חוק האזרחים הוותיקים (Senior Citizens Law) enacted 1989.',
      hebrewQuestion: 'מתי נחקק חוק האזרחים הוותיקים?'
    }
  ];

  // Comprehensive Medication Database
  const medications = [
    {
      id: 1,
      name: 'Apixaban',
      heName: 'אליקוויס',
      brand: 'Eliquis',
      class: 'DOAC',
      dose: '5mg BID',
      indication: 'AF, VTE prophylaxis/treatment',
      beers: 'Preferred over warfarin. Use with caution if CrCl 15-30',
      renal: 'If 2 of: age ≥80, weight ≤60kg, Cr ≥1.5 → reduce to 2.5mg BID',
      hepatic: 'Avoid in severe hepatic impairment',
      interactions: 'Strong CYP3A4 and P-gp inhibitors/inducers',
      sideEffects: 'Bleeding (3-4%), anemia',
      monitoring: 'Annual CBC, renal function',
      israeliGuidelines: 'Covered by Sal with CHA2DS2-VASc ≥2'
    },
    {
      id: 2,
      name: 'Rivaroxaban',
      heName: 'קסרלטו',
      brand: 'Xarelto',
      class: 'DOAC',
      dose: '20mg daily with food',
      indication: 'AF, VTE',
      beers: 'Acceptable alternative to warfarin',
      renal: 'CrCl 15-50: reduce to 15mg daily',
      hepatic: 'Avoid in cirrhosis',
      interactions: 'CYP3A4/P-gp inhibitors',
      sideEffects: 'GI bleeding higher than other DOACs',
      monitoring: 'Renal function, CBC',
      israeliGuidelines: 'Covered with criteria'
    },
    {
      id: 3,
      name: 'Warfarin',
      heName: 'קומדין',
      brand: 'Coumadin',
      class: 'VKA',
      dose: 'Variable, INR-guided',
      indication: 'AF, VTE, mechanical valves',
      beers: 'High drug-drug interaction risk',
      renal: 'No adjustment',
      hepatic: 'Use with caution',
      interactions: 'Multiple - antibiotics, NSAIDs, etc',
      sideEffects: 'Bleeding, skin necrosis (rare)',
      monitoring: 'INR monitoring',
      israeliGuidelines: 'First-line if DOACs contraindicated'
    },
    {
      id: 4,
      name: 'Donepezil',
      heName: 'אריספט',
      brand: 'Aricept',
      class: 'Cholinesterase Inhibitor',
      dose: '5mg QHS × 4-6 weeks, then 10mg',
      indication: 'Alzheimer dementia',
      beers: 'Appropriate for dementia',
      renal: 'No adjustment',
      hepatic: 'Use with caution',
      interactions: 'Anticholinergics reduce effect',
      sideEffects: 'Nausea, diarrhea, bradycardia, vivid dreams',
      monitoring: 'Heart rate, GI tolerance',
      israeliGuidelines: 'Covered for moderate-severe dementia'
    },
    {
      id: 5,
      name: 'Memantine',
      heName: 'אביקסה',
      brand: 'Namenda',
      class: 'NMDA Antagonist',
      dose: '5mg daily, titrate to 10mg BID',
      indication: 'Moderate-severe Alzheimer',
      beers: 'Can combine with ChEI',
      renal: 'CrCl <30: max 10mg daily',
      hepatic: 'No adjustment',
      interactions: 'Carbonic anhydrase inhibitors',
      sideEffects: 'Dizziness, confusion, constipation',
      monitoring: 'Cognitive function q6mo',
      israeliGuidelines: 'Covered for moderate-severe dementia'
    }
    // ... Continue with all medications from previous list
  ];

  // Clinical Calculators
  const calculators = {
    crcl: {
      name: 'Cockcroft-Gault (CrCl)',
      inputs: ['age', 'weight', 'creatinine', 'sex'],
      calculate: (inputs) => {
        const { age, weight, creatinine, sex } = inputs;
        if (!age || !weight || !creatinine) return null;
        let crcl = ((140 - parseFloat(age)) * parseFloat(weight)) / (72 * parseFloat(creatinine));
        if (sex === 'female') crcl *= 0.85;
        const interpretation = 
          crcl < 15 ? 'Kidney failure - consider dialysis' :
          crcl < 30 ? 'Severe impairment - adjust all meds' :
          crcl < 60 ? 'Moderate impairment - adjust most meds' :
          crcl < 90 ? 'Mild impairment - monitor' : 'Normal';
        return { result: crcl.toFixed(1) + ' mL/min', interpretation };
      }
    },
    bmi: {
      name: 'BMI Calculator',
      inputs: ['weight', 'height'],
      calculate: (inputs) => {
        const { weight, height } = inputs;
        if (!weight || !height) return null;
        const bmi = parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2);
        const category = 
          bmi < 18.5 ? 'Underweight - High malnutrition risk' :
          bmi < 22 ? 'Low normal - Monitor in elderly' :
          bmi < 27 ? 'Normal for elderly' :
          bmi < 30 ? 'Overweight' : 'Obese';
        return { result: bmi.toFixed(1) + ' kg/m²', interpretation: category };
      }
    },
    cha2ds2vasc: {
      name: 'CHA2DS2-VASc Score',
      inputs: ['chf', 'htn', 'age', 'dm', 'stroke', 'vascular', 'sex'],
      calculate: (inputs) => {
        let score = 0;
        if (inputs.chf === 'yes') score += 1;
        if (inputs.htn === 'yes') score += 1;
        const age = parseFloat(inputs.age) || 0;
        if (age >= 65 && age < 75) score += 1;
        else if (age >= 75) score += 2;
        if (inputs.dm === 'yes') score += 1;
        if (inputs.stroke === 'yes') score += 2;
        if (inputs.vascular === 'yes') score += 1;
        if (inputs.sex === 'female') score += 1;
        
        const risk = 
          score === 0 ? '0% - Consider no anticoagulation' :
          score === 1 ? '1.3% - Consider anticoagulation' :
          score === 2 ? '2.2% - Anticoagulation recommended' :
          score === 3 ? '3.2% - Anticoagulation recommended' :
          score === 4 ? '4.0% - Anticoagulation strongly recommended' :
          score === 5 ? '6.7% - Anticoagulation strongly recommended' :
          score === 6 ? '9.8% - High risk, anticoagulation essential' :
          score === 7 ? '9.6% - High risk, anticoagulation essential' :
          score === 8 ? '12.5% - Very high risk' :
          '15.2% - Very high risk';
        
        return { 
          result: `Score: ${score}`, 
          interpretation: `Annual stroke risk: ${risk}` 
        };
      }
    },
    hasbled: {
      name: 'HAS-BLED Score',
      inputs: ['htn', 'renal', 'liver', 'stroke', 'bleeding', 'labile', 'age', 'drugs', 'alcohol'],
      calculate: (inputs) => {
        let score = 0;
        if (inputs.htn === 'yes') score += 1;
        if (inputs.renal === 'yes') score += 1;
        if (inputs.liver === 'yes') score += 1;
        if (inputs.stroke === 'yes') score += 1;
        if (inputs.bleeding === 'yes') score += 1;
        if (inputs.labile === 'yes') score += 1;
        if (parseFloat(inputs.age) > 65) score += 1;
        if (inputs.drugs === 'yes') score += 1;
        if (inputs.alcohol === 'yes') score += 1;
        
        const risk = 
          score === 0 ? '0.9%' :
          score === 1 ? '3.4%' :
          score === 2 ? '4.1%' :
          score === 3 ? '5.8%' :
          score === 4 ? '8.9%' :
          score === 5 ? '9.1%' :
          '12.5%';
        
        return { 
          result: `Score: ${score}`, 
          interpretation: `Major bleeding risk/year: ${risk}. Score ≥3 = high risk` 
        };
      }
    },
    mmse: {
      name: 'MMSE Calculator',
      inputs: ['orientation', 'registration', 'attention', 'recall', 'language', 'construction'],
      calculate: (inputs) => {
        const total = Object.values(inputs).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
        const interpretation = 
          total >= 24 ? 'Normal cognition' :
          total >= 18 ? 'Mild cognitive impairment' :
          total >= 10 ? 'Moderate impairment' :
          'Severe impairment';
        return { 
          result: `${total}/30`, 
          interpretation: `${interpretation}. Consider formal neuropsych testing if <24` 
        };
      }
    },
    gds: {
      name: 'Geriatric Depression Scale',
      inputs: Array.from({length: 15}, (_, i) => `q${i+1}`),
      calculate: (inputs) => {
        const score = Object.values(inputs).filter(v => v === 'yes').length;
        const interpretation = 
          score <= 4 ? 'Normal' :
          score <= 8 ? 'Mild depression' :
          score <= 11 ? 'Moderate depression' :
          'Severe depression';
        return { 
          result: `${score}/15`, 
          interpretation: `${interpretation}. Consider treatment if ≥5` 
        };
      }
    },
    morse: {
      name: 'Morse Fall Scale',
      inputs: ['history', 'secondary', 'ambulatory', 'iv', 'gait', 'mental'],
      calculate: (inputs) => {
        let score = 0;
        if (inputs.history === 'yes') score += 25;
        if (inputs.secondary === 'yes') score += 15;
        if (inputs.ambulatory === 'furniture') score += 30;
        else if (inputs.ambulatory === 'crutches') score += 15;
        if (inputs.iv === 'yes') score += 20;
        if (inputs.gait === 'impaired') score += 10;
        else if (inputs.gait === 'weak') score += 20;
        if (inputs.mental === 'forgets') score += 15;
        
        const risk = 
          score < 25 ? 'Low risk' :
          score < 45 ? 'Moderate risk' :
          'High risk';
        
        return { 
          result: `${score}`, 
          interpretation: `${risk}. Implement fall prevention protocols if ≥25` 
        };
      }
    },
    frax: {
      name: 'FRAX Score (Simplified)',
      inputs: ['age', 'sex', 'weight', 'height', 'fracture', 'parent', 'smoking', 'steroids', 'ra', 'alcohol'],
      calculate: (inputs) => {
        // Simplified FRAX calculation
        let risk = 0;
        const age = parseFloat(inputs.age) || 0;
        risk += (age - 50) * 0.5;
        if (inputs.sex === 'female') risk += 5;
        const bmi = parseFloat(inputs.weight) / Math.pow(parseFloat(inputs.height) / 100, 2);
        if (bmi < 20) risk += 3;
        if (inputs.fracture === 'yes') risk += 10;
        if (inputs.parent === 'yes') risk += 5;
        if (inputs.smoking === 'yes') risk += 3;
        if (inputs.steroids === 'yes') risk += 5;
        if (inputs.ra === 'yes') risk += 3;
        if (inputs.alcohol === 'yes') risk += 3;
        
        return { 
          result: `~${risk.toFixed(1)}% 10-year risk`, 
          interpretation: risk > 20 ? 'High risk - consider treatment' : 
                         risk > 10 ? 'Moderate risk - consider BMD testing' : 
                         'Low risk - lifestyle modifications' 
        };
      }
    },
    cam: {
      name: 'CAM (Confusion Assessment)',
      inputs: ['acute', 'inattention', 'disorganized', 'altered'],
      calculate: (inputs) => {
        const hasDelirium = inputs.acute === 'yes' && 
                           inputs.inattention === 'yes' && 
                           (inputs.disorganized === 'yes' || inputs.altered === 'yes');
        return { 
          result: hasDelirium ? 'Positive' : 'Negative', 
          interpretation: hasDelirium ? 
            'Delirium present. Search for underlying cause' : 
            'Delirium unlikely. Consider other diagnoses' 
        };
      }
    },
    katz: {
      name: 'Katz ADL Index',
      inputs: ['bathing', 'dressing', 'toileting', 'transferring', 'continence', 'feeding'],
      calculate: (inputs) => {
        const score = Object.values(inputs).filter(v => v === 'independent').length;
        const interpretation = 
          score === 6 ? 'Fully independent' :
          score >= 4 ? 'Moderate impairment' :
          score >= 2 ? 'Severe impairment' :
          'Very severe impairment';
        return { 
          result: `${score}/6`, 
          interpretation: `${interpretation}. Consider support services if <6` 
        };
      }
    }
  };

  // Clinical Pearls & Guidelines
  const clinicalPearls = [
    { 
      category: 'Falls', 
      pearl: 'Vitamin D 800-1000 IU daily reduces falls by 19% (meta-analysis of 26 RCTs)',
      evidence: 'Level A',
      source: 'AGS/BGS Guidelines 2023'
    },
    {
      category: 'Polypharmacy',
      pearl: 'Each additional medication increases fall risk by 7% and ADR risk by 10%',
      evidence: 'Level A',
      source: 'Leipzig et al, JAGS 1999'
    },
    {
      category: 'Nutrition',
      pearl: 'Weight loss >5% in 30 days or >10% in 180 days = severe malnutrition',
      evidence: 'Level A',
      source: 'GLIM Criteria 2019'
    },
    {
      category: 'Delirium',
      pearl: 'Delirium increases mortality 2-fold, institutionalization 3-fold, dementia risk 12-fold',
      evidence: 'Level A',
      source: 'Witlox et al, JAMA 2010'
    },
    {
      category: 'Hearing',
      pearl: 'Hearing aid use associated with 19% reduction in cognitive decline',
      evidence: 'Level B',
      source: 'Lancet Commission 2020'
    },
    {
      category: 'Exercise',
      pearl: 'Resistance training 2x/week increases muscle mass 1-2kg in 12 weeks even in 90+ year olds',
      evidence: 'Level A',
      source: 'Fiatarone et al, NEJM 1994'
    },
    {
      category: 'Vaccination',
      pearl: 'High-dose flu vaccine reduces flu by additional 24% vs standard dose in elderly',
      evidence: 'Level A',
      source: 'DiazGranados et al, NEJM 2014'
    },
    {
      category: 'Osteoporosis',
      pearl: 'Hip protectors reduce hip fracture by 60% in nursing homes if worn',
      evidence: 'Level B',
      source: 'Cochrane Review 2014'
    }
  ];

  // Spaced Repetition Algorithm
  const spacedRepetition = {
    getNextReview: (difficulty, consecutiveCorrect) => {
      const intervals = [1, 3, 7, 14, 30, 90]; // days
      const index = Math.min(consecutiveCorrect, intervals.length - 1);
      const baseInterval = intervals[index];
      const modifier = difficulty === 'easy' ? 1.3 : difficulty === 'hard' ? 0.6 : 1;
      return Math.round(baseInterval * modifier);
    },
    
    updateStats: (questionId, correct) => {
      const stats = JSON.parse(localStorage.getItem('questionStats') || '{}');
      if (!stats[questionId]) {
        stats[questionId] = { attempts: 0, correct: 0, streak: 0, lastSeen: null };
      }
      stats[questionId].attempts++;
      if (correct) {
        stats[questionId].correct++;
        stats[questionId].streak++;
      } else {
        stats[questionId].streak = 0;
      }
      stats[questionId].lastSeen = new Date().toISOString();
      localStorage.setItem('questionStats', JSON.stringify(stats));
      return stats[questionId];
    }
  };

  // Quiz Functions
  const startQuiz = (mode) => {
    setQuizMode(mode);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    
    // Adaptive question selection based on weak areas
    if (mode === 'adaptive') {
      const stats = JSON.parse(localStorage.getItem('questionStats') || '{}');
      const weakQuestions = boardQuestions.filter(q => {
        const qStats = stats[q.id];
        return !qStats || (qStats.correct / qStats.attempts) < 0.6;
      });
      // Mix weak questions with random ones
      const selectedQuestions = [...weakQuestions.slice(0, 10), 
                                ...boardQuestions.sort(() => 0.5 - Math.random()).slice(0, 10)];
      return selectedQuestions.slice(0, 20);
    }
    
    return boardQuestions;
  };

  const submitAnswer = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
    const correct = boardQuestions.find(q => q.id === questionId).answer === answer;
    spacedRepetition.updateStats(questionId, correct);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(userAnswers).forEach(([qId, answer]) => {
      const question = boardQuestions.find(q => q.id === qId);
      if (question && question.answer === answer) correct++;
    });
    return { correct, total: Object.keys(userAnswers).length };
  };

  // Medical Knowledge Hub Integration
  const medicalResources = {
    databases: [
      { name: 'UpToDate', url: 'https://www.uptodate.com', access: 'Institutional' },
      { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', access: 'Free' },
      { name: 'Cochrane', url: 'https://www.cochranelibrary.com', access: 'Mixed' },
      { name: 'DynaMed', url: 'https://www.dynamed.com', access: 'Institutional' },
      { name: 'ClinicalKey', url: 'https://www.clinicalkey.com', access: 'Institutional' }
    ],
    guidelines: [
      { name: 'AGS Beers Criteria 2023', category: 'Medications' },
      { name: 'NICE Dementia Guidelines', category: 'Dementia' },
      { name: 'AHA/ACC Heart Failure Guidelines', category: 'Cardiology' },
      { name: 'GOLD COPD Guidelines', category: 'Pulmonology' }
    ],
    journals: [
      'Journal of American Geriatrics Society',
      'Age and Ageing',
      'Lancet Healthy Longevity',
      'Journal of Gerontology'
    ]
  };

  // Admin Panel
  if (showAdmin && password === 'geriatrics2024') {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <h1>Admin Dashboard - Geriatrics Platform</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>Content Statistics</h3>
            <p>Board Questions: {boardQuestions.length}</p>
            <p>Medications: {medications.length}</p>
            <p>Calculators: {Object.keys(calculators).length}</p>
            <p>Clinical Pearls: {clinicalPearls.length}</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>User Activity</h3>
            <p>Questions Answered: {studyStats.questionsAnswered}</p>
            <p>Correct Rate: {studyStats.correctAnswers && (studyStats.correctAnswers/studyStats.questionsAnswered*100).toFixed(1)}%</p>
            <p>Current Streak: {studyStats.streak} days</p>
            <p>Last Study: {new Date(studyStats.lastStudy).toLocaleDateString()}</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>System Info</h3>
            <p>Version: 3.0.0</p>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p>Environment: Production</p>
            <p>Database: Firebase Connected</p>
          </div>
        </div>
        <button 
          onClick={() => {setShowAdmin(false); setPassword('');}} 
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    );
  }

  // Main Application UI
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '32px' }}>
              {language === 'en' ? 'Geriatrics Excellence Platform' : 'פלטפורמת מצוינות בגריאטריה'}
              <span style={{ fontSize: '14px', marginLeft: '10px', opacity: 0.9 }}>Shaare Zedek Medical Center</span>
            </h1>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>
                {studyStats.streak > 0 && `🔥 ${studyStats.streak} day streak`}
              </span>
              <button
                onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}>
                {language === 'en' ? 'עברית' : 'English'}
              </button>
              <button
                onClick={() => setShowAdmin(true)}
                style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}>
                Admin
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['dashboard', 'quiz', 'medications', 'calculators', 'pearls', 'resources'].map(tab => (
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
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  transition: 'all 0.3s'
                }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0 }}>Quick Study</h3>
              <button 
                onClick={() => {setActiveTab('quiz'); setQuizMode('rapid');}}
                style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Start Rapid Quiz (10 questions)
              </button>
              <button 
                onClick={() => {setActiveTab('quiz'); setQuizMode('adaptive');}}
                style={{ width: '100%', padding: '15px', backgroundColor: '#764ba2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Adaptive Learning (Focus on weak areas)
              </button>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0 }}>Your Progress</h3>
              <div style={{ marginBottom: '10px' }}>
                <strong>Total Questions:</strong> {studyStats.questionsAnswered}
                // Add these sections to the existing code

// Additional Geriatric Assessment Tools
const geriatricAssessments = {
  moca: {
    name: 'MoCA (Montreal Cognitive Assessment)',
    sections: [
      { name: 'Visuospatial/Executive', maxScore: 5 },
      { name: 'Naming', maxScore: 3 },
      { name: 'Memory', maxScore: 0 }, // No points for registration
      { name: 'Attention', maxScore: 6 },
      { name: 'Language', maxScore: 3 },
      { name: 'Abstraction', maxScore: 2 },
      { name: 'Delayed Recall', maxScore: 5 },
      { name: 'Orientation', maxScore: 6 }
    ],
    interpretation: (score) => {
      if (score >= 26) return 'Normal cognition';
      if (score >= 18) return 'Mild cognitive impairment';
      return 'Moderate-severe impairment';
    }
  },
  gds: {
    name: 'Geriatric Depression Scale (Short Form)',
    questions: [
      'Are you basically satisfied with your life?',
      'Have you dropped many of your activities and interests?',
      'Do you feel that your life is empty?',
      'Do you often get bored?',
      'Are you in good spirits most of the time?',
      'Are you afraid that something bad is going to happen to you?',
      'Do you feel happy most of the time?',
      'Do you often feel helpless?',
      'Do you prefer to stay at home rather than going out?',
      'Do you feel you have more problems with memory than most?',
      'Do you think it is wonderful to be alive now?',
      'Do you feel pretty worthless the way you are now?',
      'Do you feel full of energy?',
      'Do you feel that your situation is hopeless?',
      'Do you think that most people are better off than you are?'
    ],
    scoring: [0,1,1,1,0,1,0,1,1,1,0,1,0,1,1], // 1 for depression-indicating answers
    interpretation: (score) => {
      if (score <= 4) return 'Normal';
      if (score <= 8) return 'Mild depression';
      if (score <= 11) return 'Moderate depression';
      return 'Severe depression';
    }
  }
};

// Beers Criteria - High Risk Medications to Avoid
const beersCriteria = {
  anticholinergics: [
    'Diphenhydramine', 'Hydroxyzine', 'Promethazine', 'Dicyclomine', 
    'Hyoscyamine', 'Oxybutynin', 'Tolterodine', 'Benztropine'
  ],
  benzodiazepines: [
    'Alprazolam', 'Clonazepam', 'Diazepam', 'Lorazepam', 
    'Temazepam', 'Triazolam'
  ],
  antipsychotics: [
    'Haloperidol', 'Risperidone', 'Quetiapine', 'Olanzapine'
  ],
  other: [
    'Sliding scale insulin', 'Meperidine', 'Ketorolac >5 days',
    'Indomethacin', 'Muscle relaxants', 'Megestrol', 'Glyburide'
  ]
};

// Drug-Drug Interactions Database
const drugInteractions = {
  major: [
    { drugs: ['Warfarin', 'NSAIDs'], risk: 'Major bleeding risk' },
    { drugs: ['ACE-I/ARB', 'Potassium'], risk: 'Hyperkalemia' },
    { drugs: ['Digoxin', 'Amiodarone'], risk: 'Digoxin toxicity' },
    { drugs: ['SSRIs', 'NSAIDs'], risk: 'GI bleeding' },
    { drugs: ['Statins', 'Clarithromycin'], risk: 'Rhabdomyolysis' }
  ],
  moderate: [
    { drugs: ['Beta-blockers', 'Calcium channel blockers'], risk: 'Bradycardia, AV block' },
    { drugs: ['Metformin', 'Contrast dye'], risk: 'Lactic acidosis' },
    { drugs: ['PPIs', 'Clopidogrel'], risk: 'Reduced antiplatelet effect' }
  ]
};

// Geriatric Syndromes Reference
const geriatricSyndromes = [
  {
    name: 'Falls',
    assessment: 'Timed Up and Go, Berg Balance Scale',
    interventions: 'Vitamin D, PT/OT, home safety, medication review',
    redFlags: '>2 falls/year, injury from fall, fear of falling'
  },
  {
    name: 'Delirium',
    assessment: 'CAM (Confusion Assessment Method)',
    interventions: 'Address triggers, orientation, avoid restraints/benzos',
    redFlags: 'Acute onset, fluctuating course, inattention'
  },
  {
    name: 'Frailty',
    assessment: 'Fried Criteria, Clinical Frailty Scale',
    interventions: 'Nutrition, resistance exercise, comprehensive geriatric assessment',
    redFlags: 'Weight loss >5%, exhaustion, weakness, slow gait, low activity'
  },
  {
    name: 'Polypharmacy',
    assessment: 'Medication count, STOPP/START criteria',
    interventions: 'Deprescribing, medication reconciliation',
    redFlags: '>5 medications, recent hospitalization, multiple prescribers'
  },
  {
    name: 'Incontinence',
    assessment: 'Bladder diary, post-void residual',
    interventions: 'Behavioral therapy, pelvic floor exercises, scheduled voiding',
    redFlags: 'New onset, hematuria, retention'
  }
];

// Lab Reference Values for Elderly
const labReferences = {
  renal: [
    { test: 'Creatinine', elderly: '0.9-1.3 mg/dL (may be falsely low)', note: 'Use CrCl or eGFR' },
    { test: 'BUN', elderly: '10-30 mg/dL', note: 'May be elevated with dehydration' }
  ],
  cardiac: [
    { test: 'BNP', elderly: '<100 pg/mL', note: 'Age-adjusted: age × 2' },
    { test: 'Troponin', elderly: 'Same as younger', note: 'Mild elevation common in CKD' }
  ],
  endocrine: [
    { test: 'TSH', elderly: '0.5-5.0 (up to 7.0 if >80yo)', note: 'Subclinical hypothyroid common' },
    { test: 'HbA1c goal', elderly: '7.5-8.5% if frail', note: 'Avoid hypoglycemia' }
  ],
  nutrition: [
    { test: 'Albumin', elderly: '>3.5 g/dL', note: 'Poor marker in acute illness' },
    { test: 'Vitamin D', elderly: '>30 ng/mL', note: 'Deficiency very common' },
    { test: 'B12', elderly: '>300 pg/mL', note: 'Check MMA if 200-300' }
  ]
};

// Quick Reference Protocols
const protocols = {
  'UTI Management': {
    diagnosis: 'Symptoms + UA + culture. Avoid treating asymptomatic bacteriuria',
    firstLine: 'Nitrofurantoin 100mg BID × 5d (avoid if CrCl <30)',
    alternative: 'TMP-SMX DS BID × 3d, Cephalexin 500mg QID × 5-7d',
    complicated: 'Fluoroquinolone × 7-14d (avoid if possible)'
  },
  'Heart Failure': {
    diuretics: 'Furosemide 20-40mg, monitor K+, Cr',
    betaBlocker: 'Carvedilol 3.125mg BID or Metoprolol succinate 25mg daily',
    aceARB: 'Start low, titrate slowly, monitor K+ and Cr',
    monitoring: 'Daily weights, fluid restriction 1.5-2L'
  },
  'COPD Exacerbation': {
    bronchodilators: 'Albuterol + Ipratropium nebs q4h',
    steroids: 'Prednisone 40mg × 5 days',
    antibiotics: 'If increased sputum + purulence: Azithromycin or Doxycycline',
    oxygen: 'Target SpO2 88-92%'
  }
};

// Add this to the return statement, in a new tab section:
{activeTab === 'references' && (
  <div>
    <h2 style={{color:'#1f2937', marginBottom:'20px'}}>Quick References</h2>
    
    {/* Beers Criteria */}
    <div style={{marginBottom:'30px', padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
      <h3>Beers Criteria - Medications to Avoid</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'15px', marginTop:'15px'}}>
        <div>
          <h4 style={{color:'#dc2626'}}>Anticholinergics</h4>
          <ul style={{fontSize:'14px'}}>
            {beersCriteria.anticholinergics.map(drug => <li key={drug}>{drug}</li>)}
          </ul>
        </div>
        <div>
          <h4 style={{color:'#dc2626'}}>Benzodiazepines</h4>
          <ul style={{fontSize:'14px'}}>
            {beersCriteria.benzodiazepines.map(drug => <li key={drug}>{drug}</li>)}
          </ul>
        </div>
        <div>
          <h4 style={{color:'#dc2626'}}>Other High Risk</h4>
          <ul style={{fontSize:'14px'}}>
            {beersCriteria.other.map(drug => <li key={drug}>{drug}</li>)}
          </ul>
        </div>
      </div>
    </div>

    {/* Geriatric Syndromes */}
    <div style={{marginBottom:'30px', padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
      <h3>Geriatric Syndromes</h3>
      <div style={{display:'grid', gap:'15px', marginTop:'15px'}}>
        {geriatricSyndromes.map(syndrome => (
          <div key={syndrome.name} style={{padding:'15px', backgroundColor:'#f9fafb', borderRadius:'4px'}}>
            <h4 style={{margin:'0 0 10px 0', color:'#1f2937'}}>{syndrome.name}</h4>
            <p><strong>Assessment:</strong> {syndrome.assessment}</p>
            <p><strong>Interventions:</strong> {syndrome.interventions}</p>
            <p style={{color:'#dc2626'}}><strong>Red Flags:</strong> {syndrome.redFlags}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Lab References */}
    <div style={{marginBottom:'30px', padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
      <h3>Lab Values in Elderly</h3>
      {Object.entries(labReferences).map(([category, tests]) => (
        <div key={category} style={{marginBottom:'20px'}}>
          <h4 style={{textTransform:'capitalize', color:'#2563eb'}}>{category}</h4>
          <table style={{width:'100%', fontSize:'14px'}}>
            <tbody>
              {tests.map(test => (
                <tr key={test.test}>
                  <td style={{padding:'8px', fontWeight:'bold'}}>{test.test}</td>
                  <td style={{padding:'8px'}}>{test.elderly}</td>
                  <td style={{padding:'8px', color:'#6b7280'}}>{test.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>

    {/* Treatment Protocols */}
    <div style={{padding:'20px', backgroundColor:'white', borderRadius:'8px'}}>
      <h3>Treatment Protocols</h3>
      {Object.entries(protocols).map(([condition, protocol]) => (
        <div key={condition} style={{marginBottom:'20px', padding:'15px', backgroundColor:'#f9fafb', borderRadius:'4px'}}>
          <h4 style={{margin:'0 0 10px 0', color:'#1f2937'}}>{condition}</h4>
          {Object.entries(protocol).map(([key, value]) => (
            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
          ))}
        </div>
      ))}
    </div>
  </div>
)}

// Add this button to the navigation
<button
  onClick={() => setActiveTab('references')}
  style={{
    padding: '8px 16px',
    backgroundColor: activeTab === 'references' ? 'white' : 'transparent',
    color: activeTab === 'references' ? '#2563eb' : 'white',
    border: '1px solid white',
    borderRadius: '4px',
    cursor: 'pointer'
  }}>
  {language === 'en' ? 'References' : 'מקורות'}
</button>
