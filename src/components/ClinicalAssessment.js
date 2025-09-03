import React, { useState } from 'react';

const ClinicalAssessment = ({ 
  language, 
  calculateMMSE, 
  calculateCAM, 
  calculateClinicalFrailtyScale, 
  calculateCHA2DS2VASc 
}) => {
  const [activeAssessment, setActiveAssessment] = useState('mmse');
  const [assessmentData, setAssessmentData] = useState({});
  const [results, setResults] = useState(null);

  const handleInputChange = (field, value) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const runAssessment = () => {
    let result;
    
    switch (activeAssessment) {
      case 'mmse':
        result = calculateMMSE(assessmentData);
        break;
      case 'cam':
        result = calculateCAM(assessmentData);
        break;
      case 'cfs':
        result = calculateClinicalFrailtyScale(assessmentData);
        break;
      case 'cha2ds2vasc':
        result = calculateCHA2DS2VASc(assessmentData);
        break;
      default:
        result = null;
    }
    
    setResults(result);
  };

  const resetAssessment = () => {
    setAssessmentData({});
    setResults(null);
  };

  const renderMMSEForm = () => (
    <div className="assessment-form">
      <h3>{language === 'en' ? 'Mini-Mental State Examination (MMSE)' : 'בדיקת מצב נפשי מיני (MMSE)'}</h3>
      
      <div className="form-section">
        <h4>{language === 'en' ? 'Orientation (10 points)' : 'התמצאות (10 נקודות)'}</h4>
        <div className="checkbox-group">
          {['year', 'season', 'date', 'day', 'month', 'country', 'state', 'city', 'floor', 'building'].map(item => (
            <label key={item}>
              <input
                type="checkbox"
                checked={assessmentData[item] === 1}
                onChange={(e) => handleInputChange(item, e.target.checked ? 1 : 0)}
              />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h4>{language === 'en' ? 'Registration (3 points)' : 'רישום (3 נקודות)'}</h4>
        <div className="checkbox-group">
          {['apple', 'table', 'penny'].map(item => (
            <label key={item}>
              <input
                type="checkbox"
                checked={assessmentData[item] === 1}
                onChange={(e) => handleInputChange(item, e.target.checked ? 1 : 0)}
              />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h4>{language === 'en' ? 'Attention (5 points)' : 'קשב (5 נקודות)'}</h4>
        <div className="input-group">
          <label>
            <span>{language === 'en' ? 'Serial 7s or WORLD backward:' : 'חסר 7 או WORLD אחורה:'}</span>
            <input
              type="number"
              min="0"
              max="5"
              value={assessmentData.serial7 || 0}
              onChange={(e) => handleInputChange('serial7', parseInt(e.target.value) || 0)}
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <h4>{language === 'en' ? 'Recall (3 points)' : 'היזכרות (3 נקודות)'}</h4>
        <div className="checkbox-group">
          {['recall_apple', 'recall_table', 'recall_penny'].map(item => (
            <label key={item}>
              <input
                type="checkbox"
                checked={assessmentData[item] === 1}
                onChange={(e) => handleInputChange(item, e.target.checked ? 1 : 0)}
              />
              {item.replace('recall_', '').charAt(0).toUpperCase() + item.replace('recall_', '').slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h4>{language === 'en' ? 'Language (9 points)' : 'שפה (9 נקודות)'}</h4>
        <div className="input-group">
          {['naming', 'repetition', 'command', 'reading', 'writing', 'drawing'].map(item => (
            <label key={item}>
              <span>{item.charAt(0).toUpperCase() + item.slice(1)} (0-2):</span>
              <input
                type="number"
                min="0"
                max="2"
                value={assessmentData[item] || 0}
                onChange={(e) => handleInputChange(item, parseInt(e.target.value) || 0)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCAMForm = () => (
    <div className="assessment-form">
      <h3>{language === 'en' ? 'Confusion Assessment Method (CAM)' : 'שיטת הערכת בלבול (CAM)'}</h3>
      
      <div className="form-section">
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={assessmentData.acuteOnset}
              onChange={(e) => handleInputChange('acuteOnset', e.target.checked)}
            />
            {language === 'en' ? 'Acute onset of symptoms' : 'הופעה חדה של תסמינים'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.fluctuating}
              onChange={(e) => handleInputChange('fluctuating', e.target.checked)}
            />
            {language === 'en' ? 'Fluctuating course during the day' : 'מהלך משתנה במהלך היום'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.inattention}
              onChange={(e) => handleInputChange('inattention', e.target.checked)}
            />
            {language === 'en' ? 'Inattention/distractibility' : 'חוסר קשב/הסחת דעת'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.disorganizedThinking}
              onChange={(e) => handleInputChange('disorganizedThinking', e.target.checked)}
            />
            {language === 'en' ? 'Disorganized thinking' : 'חשיבה לא מאורגנת'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.alteredConsciousness}
              onChange={(e) => handleInputChange('alteredConsciousness', e.target.checked)}
            />
            {language === 'en' ? 'Altered level of consciousness' : 'רמת הכרה שונה'}
          </label>
        </div>
      </div>
    </div>
  );

  const renderCFSForm = () => (
    <div className="assessment-form">
      <h3>{language === 'en' ? 'Clinical Frailty Scale' : 'סולם שבירות קלינית'}</h3>
      
      <div className="form-section">
        <div className="radio-group">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (
            <label key={score}>
              <input
                type="radio"
                name="cfsScore"
                value={score}
                checked={assessmentData.cfsScore === score}
                onChange={(e) => handleInputChange('cfsScore', parseInt(e.target.value))}
              />
              <span>{score} - {getCFSDescription(score, language)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCHA2DS2VAScForm = () => (
    <div className="assessment-form">
      <h3>{language === 'en' ? 'CHA₂DS₂-VASc Score' : 'ציון CHA₂DS₂-VASc'}</h3>
      
      <div className="form-section">
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={assessmentData.heartFailure}
              onChange={(e) => handleInputChange('heartFailure', e.target.checked)}
            />
            {language === 'en' ? 'Congestive Heart Failure (+1)' : 'אי ספיקת לב (+1)'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.hypertension}
              onChange={(e) => handleInputChange('hypertension', e.target.checked)}
            />
            {language === 'en' ? 'Hypertension (+1)' : 'יתר לחץ דם (+1)'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.diabetes}
              onChange={(e) => handleInputChange('diabetes', e.target.checked)}
            />
            {language === 'en' ? 'Diabetes (+1)' : 'סוכרת (+1)'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.stroke}
              onChange={(e) => handleInputChange('stroke', e.target.checked)}
            />
            {language === 'en' ? 'Previous Stroke/TIA (+2)' : 'שבץ/TIA קודם (+2)'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.vascularDisease}
              onChange={(e) => handleInputChange('vascularDisease', e.target.checked)}
            />
            {language === 'en' ? 'Vascular Disease (+1)' : 'מחלת כלי דם (+1)'}
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={assessmentData.female}
              onChange={(e) => handleInputChange('female', e.target.checked)}
            />
            {language === 'en' ? 'Female (+1 if age ≥65)' : 'נקבה (+1 אם גיל ≥65)'}
          </label>
        </div>
        
        <div className="input-group">
          <label>
            <span>{language === 'en' ? 'Age:' : 'גיל:'}</span>
            <input
              type="number"
              min="0"
              max="120"
              value={assessmentData.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            />
          </label>
        </div>
      </div>
    </div>
  );

  const getCFSDescription = (score, lang) => {
    const descriptions = {
      en: {
        1: 'Very Fit',
        2: 'Well',
        3: 'Managing Well',
        4: 'Vulnerable',
        5: 'Mildly Frail',
        6: 'Moderately Frail',
        7: 'Severely Frail',
        8: 'Very Severely Frail',
        9: 'Terminally Ill'
      },
      he: {
        1: 'כשיר מאוד',
        2: 'בריא',
        3: 'מתמודד היטב',
        4: 'פגיע',
        5: 'שביר קלות',
        6: 'שביר בינונית',
        7: 'שביר מאוד',
        8: 'שביר במאוד מאוד',
        9: 'חולה סופני'
      }
    };
    
    return descriptions[lang][score] || descriptions.en[score];
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="results-panel">
        <h3>{language === 'en' ? 'Assessment Results' : 'תוצאות הערכה'}</h3>
        
        {activeAssessment === 'mmse' && (
          <div className="result-content">
            <div className="score-display">
              <span className="score">{results.score}/{results.maxScore}</span>
              <span className="interpretation">{results.interpretation}</span>
            </div>
            <div className="breakdown">
              <h4>{language === 'en' ? 'Score Breakdown:' : 'פירוט ציונים:'}</h4>
              {Object.entries(results.breakdown).map(([domain, score]) => (
                <div key={domain} className="domain-score">
                  <span>{domain}:</span>
                  <span>{score}</span>
                </div>
              ))}
            </div>
            <div className="recommendations">
              <h4>{language === 'en' ? 'Recommendations:' : 'המלצות:'}</h4>
              <p>{results.recommendations}</p>
            </div>
          </div>
        )}
        
        {activeAssessment === 'cam' && (
          <div className="result-content">
            <div className="score-display">
              <span className={`result ${results.result.includes('PRESENT') ? 'positive' : 'negative'}`}>
                {results.result}
              </span>
              <span className="severity">{results.severity}</span>
            </div>
            <div className="action-plan">
              <h4>{language === 'en' ? 'Action Required:' : 'פעולה נדרשת:'}</h4>
              <p>{results.action}</p>
              <p className="hebrew-protocol">{results.israeliProtocol}</p>
            </div>
          </div>
        )}
        
        {activeAssessment === 'cfs' && (
          <div className="result-content">
            <div className="score-display">
              <span className="score">{results.score}/9</span>
              <span className="category">{results.category}</span>
              <span className={`risk ${results.risk.toLowerCase()}`}>{results.risk} RISK</span>
            </div>
            <div className="interventions">
              <h4>{language === 'en' ? 'Interventions:' : 'התערבויות:'}</h4>
              <p>{results.interventions}</p>
              <p className="israeli-guidance">{results.israeliGuidance}</p>
            </div>
          </div>
        )}
        
        {activeAssessment === 'cha2ds2vasc' && (
          <div className="result-content">
            <div className="score-display">
              <span className="score">{results.score}</span>
              <span className="risk-level">{results.riskLevel} RISK</span>
              <span className="stroke-risk">{results.annualStrokeRisk} annual stroke risk</span>
            </div>
            <div className="anticoagulation">
              <h4>{language === 'en' ? 'Anticoagulation:' : 'נוגד קרישה:'}</h4>
              <p className={`recommendation ${results.anticoagulation.toLowerCase().replace(' ', '-')}`}>
                {results.anticoagulation}
              </p>
              <p className="israeli-guideline">{results.israeliGuideline}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="clinical-assessment">
      <div className="assessment-header">
        <h2>{language === 'en' ? '🔬 Clinical Assessment Tools' : '🔬 כלי הערכה קלינית'}</h2>
        <p>{language === 'en' 
          ? 'Comprehensive geriatric assessment tools for fellowship training' 
          : 'כלי הערכה גריאטרית מקיפה להתמחות'
        }</p>
      </div>

      <div className="assessment-nav">
        <button 
          onClick={() => setActiveAssessment('mmse')}
          className={activeAssessment === 'mmse' ? 'active' : ''}
        >
          MMSE
        </button>
        <button 
          onClick={() => setActiveAssessment('cam')}
          className={activeAssessment === 'cam' ? 'active' : ''}
        >
          CAM
        </button>
        <button 
          onClick={() => setActiveAssessment('cfs')}
          className={activeAssessment === 'cfs' ? 'active' : ''}
        >
          Frailty Scale
        </button>
        <button 
          onClick={() => setActiveAssessment('cha2ds2vasc')}
          className={activeAssessment === 'cha2ds2vasc' ? 'active' : ''}
        >
          CHA₂DS₂-VASc
        </button>
      </div>

      <div className="assessment-content">
        <div className="assessment-form-container">
          {activeAssessment === 'mmse' && renderMMSEForm()}
          {activeAssessment === 'cam' && renderCAMForm()}
          {activeAssessment === 'cfs' && renderCFSForm()}
          {activeAssessment === 'cha2ds2vasc' && renderCHA2DS2VAScForm()}
          
          <div className="form-actions">
            <button onClick={runAssessment} className="calculate-btn">
              {language === 'en' ? '🧮 Calculate' : '🧮 חשב'}
            </button>
            <button onClick={resetAssessment} className="reset-btn">
              {language === 'en' ? '🔄 Reset' : '🔄 איפוס'}
            </button>
          </div>
        </div>

        {renderResults()}
      </div>

      <div className="educational-disclaimer">
        <p>
          {language === 'en' 
            ? '⚠️ For educational purposes only. Clinical decisions must be made by qualified healthcare providers.'
            : '⚠️ למטרות חינוכיות בלבד. החלטות קליניות חייבות להתקבל על ידי ספקי בריאות מוסמכים.'
          }
        </p>
      </div>
    </div>
  );
};

export default ClinicalAssessment;