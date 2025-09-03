import React, { useState, useEffect } from 'react';

const FellowshipTracker = ({ language, trackFellowshipMilestones }) => {
  const [fellowshipData, setFellowshipData] = useState({
    month: 1,
    evaluations: {
      patientCare: [],
      medicalKnowledge: [],
      practiceBasedLearning: [],
      interpersonalSkills: [],
      professionalism: [],
      systemsBasedPractice: []
    }
  });
  const [milestoneResults, setMilestoneResults] = useState(null);
  const [activeSection, setActiveSection] = useState('milestones');

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('fellowshipData');
    if (savedData) {
      setFellowshipData(JSON.parse(savedData));
    }
  }, []);

  const saveData = (data) => {
    localStorage.setItem('fellowshipData', JSON.stringify(data));
  };

  const addEvaluation = (competency, score) => {
    const newData = {
      ...fellowshipData,
      evaluations: {
        ...fellowshipData.evaluations,
        [competency]: [...fellowshipData.evaluations[competency], score]
      }
    };
    setFellowshipData(newData);
    saveData(newData);
  };

  const calculateMilestones = () => {
    const results = trackFellowshipMilestones(fellowshipData.evaluations, fellowshipData.month);
    setMilestoneResults(results);
  };

  const competencies = [
    { key: 'patientCare', en: 'Patient Care', he: 'טיפול במטופל' },
    { key: 'medicalKnowledge', en: 'Medical Knowledge', he: 'ידע רפואי' },
    { key: 'practiceBasedLearning', en: 'Practice-Based Learning', he: 'למידה מבוססת תרגול' },
    { key: 'interpersonalSkills', en: 'Interpersonal & Communication', he: 'כישורים בינאישיים ותקשורת' },
    { key: 'professionalism', en: 'Professionalism', he: 'מקצועיות' },
    { key: 'systemsBasedPractice', en: 'Systems-Based Practice', he: 'תרגול מבוסס מערכות' }
  ];

  const renderMilestoneTracker = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '🎯 Milestone Tracking' : '🎯 מעקב אבני דרך'}</h3>
      
      <div className="fellowship-month">
        <label>{language === 'en' ? 'Fellowship Month:' : 'חודש התמחות:'}</label>
        <select
          value={fellowshipData.month}
          onChange={(e) => setFellowshipData(prev => ({ ...prev, month: parseInt(e.target.value) }))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {language === 'en' ? `Month ${i + 1}` : `חודש ${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      <div className="competencies-grid">
        {competencies.map(comp => (
          <div key={comp.key} className="competency-card">
            <h4>{language === 'en' ? comp.en : comp.he}</h4>
            
            <div className="current-scores">
              {fellowshipData.evaluations[comp.key].length > 0 ? (
                <div className="scores-list">
                  {fellowshipData.evaluations[comp.key].map((score, index) => (
                    <span key={index} className={`score score-${score}`}>
                      {score}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="no-scores">
                  {language === 'en' ? 'No evaluations yet' : 'עדיין אין הערכות'}
                </p>
              )}
            </div>

            <div className="add-evaluation">
              <label>{language === 'en' ? 'Add Evaluation (1-5):' : 'הוסף הערכה (1-5):'}</label>
              <div className="score-buttons">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    onClick={() => addEvaluation(comp.key, score)}
                    className={`score-btn score-${score}`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            {milestoneResults && (
              <div className="current-level">
                <span className="level-label">
                  {language === 'en' ? 'Current Level:' : 'רמה נוכחית:'}
                </span>
                <span className={`level-value level-${Math.floor(milestoneResults.current[comp.key])}`}>
                  {milestoneResults.current[comp.key].toFixed(1)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={calculateMilestones} className="calculate-btn">
        {language === 'en' ? '📊 Calculate Milestones' : '📊 חשב אבני דרך'}
      </button>
    </div>
  );

  const renderMilestoneResults = () => {
    if (!milestoneResults) return null;

    return (
      <div className="results-panel">
        <h3>{language === 'en' ? '📈 Milestone Results' : '📈 תוצאות אבני דרך'}</h3>
        
        <div className="overall-status">
          <div className="status-grid">
            <div className="status-item">
              <span className="label">{language === 'en' ? 'Average Level:' : 'רמה ממוצעת:'}</span>
              <span className={`value level-${Math.floor(milestoneResults.average)}`}>
                {milestoneResults.average.toFixed(1)}
              </span>
            </div>
            <div className="status-item">
              <span className="label">{language === 'en' ? 'Expected Level:' : 'רמה צפויה:'}</span>
              <span className="value">{milestoneResults.expected.toFixed(1)}</span>
            </div>
            <div className="status-item">
              <span className="label">{language === 'en' ? 'On Track:' : 'על המסלול:'}</span>
              <span className={`value ${milestoneResults.onTrack ? 'on-track' : 'behind'}`}>
                {milestoneResults.onTrack 
                  ? (language === 'en' ? '✅ Yes' : '✅ כן')
                  : (language === 'en' ? '⚠️ Behind' : '⚠️ מאחור')
                }
              </span>
            </div>
            <div className="status-item">
              <span className="label">{language === 'en' ? 'Graduation Ready:' : 'מוכן לסיום:'}</span>
              <span className={`value ${milestoneResults.graduationReady ? 'ready' : 'not-ready'}`}>
                {milestoneResults.graduationReady 
                  ? (language === 'en' ? '🎓 Ready' : '🎓 מוכן')
                  : (language === 'en' ? '📚 Not Yet' : '📚 עדיין לא')
                }
              </span>
            </div>
          </div>
        </div>

        {milestoneResults.weakAreas.length > 0 && (
          <div className="weak-areas">
            <h4>{language === 'en' ? '🎯 Areas Needing Attention:' : '🎯 תחומים הזקוקים לתשומת לב:'}</h4>
            <ul>
              {milestoneResults.weakAreas.map(([competency, level]) => {
                const comp = competencies.find(c => c.key === competency);
                return (
                  <li key={competency} className="weak-area-item">
                    <span className="competency-name">
                      {language === 'en' ? comp.en : comp.he}
                    </span>
                    <span className={`level level-${Math.floor(level)}`}>
                      {level.toFixed(1)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {milestoneResults.recommendations.length > 0 && (
          <div className="recommendations">
            <h4>{language === 'en' ? '💡 Recommendations:' : '💡 המלצות:'}</h4>
            <ul>
              {milestoneResults.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderCaseGenerator = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '📚 AI Case Generator' : '📚 מחולל מקרים AI'}</h3>
      
      <div className="case-options">
        <div className="difficulty-selector">
          <label>{language === 'en' ? 'Difficulty Level:' : 'רמת קושי:'}</label>
          <select>
            <option value="beginner">{language === 'en' ? 'Beginner' : 'מתחיל'}</option>
            <option value="intermediate">{language === 'en' ? 'Intermediate' : 'בינוני'}</option>
            <option value="advanced">{language === 'en' ? 'Advanced' : 'מתקדם'}</option>
            <option value="fellowship">{language === 'en' ? 'Fellowship' : 'התמחות'}</option>
          </select>
        </div>

        <div className="topic-selector">
          <label>{language === 'en' ? 'Focus Topic:' : 'נושא מיקוד:'}</label>
          <select>
            <option value="delirium">{language === 'en' ? 'Delirium' : 'דליריום'}</option>
            <option value="dementia">{language === 'en' ? 'Dementia' : 'דמנציה'}</option>
            <option value="falls">{language === 'en' ? 'Falls' : 'נפילות'}</option>
            <option value="frailty">{language === 'en' ? 'Frailty' : 'שבירות'}</option>
            <option value="polypharmacy">{language === 'en' ? 'Polypharmacy' : 'פוליפרמציה'}</option>
            <option value="pain">{language === 'en' ? 'Pain Management' : 'טיפול בכאב'}</option>
          </select>
        </div>
      </div>

      <button className="generate-case-btn">
        {language === 'en' ? '🤖 Generate AI Case' : '🤖 צור מקרה AI'}
      </button>

      <div className="sample-cases">
        <h4>{language === 'en' ? '📖 Recent Cases:' : '📖 מקרים אחרונים:'}</h4>
        <div className="cases-list">
          <div className="case-item">
            <h5>87-year-old with acute confusion</h5>
            <p>Post-operative delirium case with multiple risk factors...</p>
            <div className="case-tags">
              <span className="tag">Delirium</span>
              <span className="tag">Post-op</span>
              <span className="tag">Fellowship</span>
            </div>
          </div>
          <div className="case-item">
            <h5>75-year-old with recurrent falls</h5>
            <p>Multifactorial falls assessment case...</p>
            <div className="case-tags">
              <span className="tag">Falls</span>
              <span className="tag">Polypharmacy</span>
              <span className="tag">Intermediate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBoardPrep = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '📜 Board Preparation' : '📜 הכנה לבחינת הבורד'}</h3>
      
      <div className="prep-sections">
        <div className="prep-card">
          <h4>{language === 'en' ? '🧠 Core Knowledge' : '🧠 ידע ליבה'}</h4>
          <ul>
            <li>{language === 'en' ? 'Geriatric syndromes' : 'תסמונות גריאטריות'}</li>
            <li>{language === 'en' ? 'Pharmacology in elderly' : 'פרמקולוגיה בקשישים'}</li>
            <li>{language === 'en' ? 'Comprehensive assessment' : 'הערכה מקיפה'}</li>
            <li>{language === 'en' ? 'End-of-life care' : 'טיפול בסוף החיים'}</li>
          </ul>
          <button className="study-btn">
            {language === 'en' ? '📚 Study Materials' : '📚 חומרי לימוד'}
          </button>
        </div>

        <div className="prep-card">
          <h4>{language === 'en' ? '💊 Pharmacology' : '💊 פרמקולוגיה'}</h4>
          <ul>
            <li>{language === 'en' ? 'Age-related changes' : 'שינויים הקשורים לגיל'}</li>
            <li>{language === 'en' ? 'Drug interactions' : 'אינטראקציות תרופתיות'}</li>
            <li>{language === 'en' ? 'Beers criteria' : 'קריטריוני Beers'}</li>
            <li>{language === 'en' ? 'Deprescribing' : 'הפסקת תרופות'}</li>
          </ul>
          <button className="study-btn">
            {language === 'en' ? '🧪 Practice Questions' : '🧪 שאלות תרגול'}
          </button>
        </div>

        <div className="prep-card">
          <h4>{language === 'en' ? '🏥 Clinical Skills' : '🏥 כישורים קליניים'}</h4>
          <ul>
            <li>{language === 'en' ? 'Physical examination' : 'בדיקה גופנית'}</li>
            <li>{language === 'en' ? 'Cognitive assessment' : 'הערכה קוגניטיבית'}</li>
            <li>{language === 'en' ? 'Functional assessment' : 'הערכה תפקודית'}</li>
            <li>{language === 'en' ? 'Care planning' : 'תכנון טיפול'}</li>
          </ul>
          <button className="study-btn">
            {language === 'en' ? '🎯 OSCE Prep' : '🎯 הכנה ל-OSCE'}
          </button>
        </div>
      </div>

      <div className="progress-tracker">
        <h4>{language === 'en' ? '📊 Study Progress' : '📊 התקדמות לימודים'}</h4>
        <div className="progress-bars">
          <div className="progress-item">
            <span>{language === 'en' ? 'Core Knowledge:' : 'ידע ליבה:'}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
            <span>75%</span>
          </div>
          <div className="progress-item">
            <span>{language === 'en' ? 'Practice Questions:' : 'שאלות תרגול:'}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
            <span>60%</span>
          </div>
          <div className="progress-item">
            <span>{language === 'en' ? 'Clinical Skills:' : 'כישורים קליניים:'}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '85%' }}></div>
            </div>
            <span>85%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fellowship-tracker">
      <div className="section-header">
        <h2>{language === 'en' ? '📚 Fellowship Tracker' : '📚 מעקב התמחות'}</h2>
        <p>{language === 'en' 
          ? 'Track your geriatrics fellowship progress and milestones' 
          : 'עקוב אחר התקדמות התמחותך הגריאטרית ואבני הדרך'
        }</p>
      </div>

      <div className="section-nav">
        <button 
          onClick={() => setActiveSection('milestones')}
          className={activeSection === 'milestones' ? 'active' : ''}
        >
          {language === 'en' ? '🎯 Milestones' : '🎯 אבני דרך'}
        </button>
        <button 
          onClick={() => setActiveSection('cases')}
          className={activeSection === 'cases' ? 'active' : ''}
        >
          {language === 'en' ? '📚 AI Cases' : '📚 מקרים AI'}
        </button>
        <button 
          onClick={() => setActiveSection('board')}
          className={activeSection === 'board' ? 'active' : ''}
        >
          {language === 'en' ? '📜 Board Prep' : '📜 הכנה לבורד'}
        </button>
      </div>

      <div className="section-content-container">
        {activeSection === 'milestones' && renderMilestoneTracker()}
        {activeSection === 'cases' && renderCaseGenerator()}
        {activeSection === 'board' && renderBoardPrep()}

        {activeSection === 'milestones' && renderMilestoneResults()}
      </div>

      <div className="milestone-legend">
        <h4>{language === 'en' ? '📋 Milestone Levels:' : '📋 רמות אבני דרך:'}</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="level-indicator level-1">1</span>
            <span>{language === 'en' ? 'Novice' : 'מתחיל'}</span>
          </div>
          <div className="legend-item">
            <span className="level-indicator level-2">2</span>
            <span>{language === 'en' ? 'Advanced Beginner' : 'מתחיל מתקדם'}</span>
          </div>
          <div className="legend-item">
            <span className="level-indicator level-3">3</span>
            <span>{language === 'en' ? 'Competent' : 'מוסמך'}</span>
          </div>
          <div className="legend-item">
            <span className="level-indicator level-4">4</span>
            <span>{language === 'en' ? 'Proficient' : 'מיומן'}</span>
          </div>
          <div className="legend-item">
            <span className="level-indicator level-5">5</span>
            <span>{language === 'en' ? 'Expert' : 'מומחה'}</span>
          </div>
        </div>
      </div>

      <div className="educational-disclaimer">
        <p>
          {language === 'en' 
            ? '⚠️ Fellowship tracking for educational purposes. Consult with program director for official evaluations.'
            : '⚠️ מעקב התמחות למטרות חינוכיות. התייעץ עם מנהל התוכנית להערכות רשמיות.'
          }
        </p>
      </div>
    </div>
  );
};

export default FellowshipTracker;