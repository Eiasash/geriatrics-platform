import React, { useState } from 'react';

const AIDiagnosis = ({ language, aiDiagnosis, aiResults, setAiResults }) => {
  const [symptoms, setSymptoms] = useState('');
  const [patientHistory, setPatientHistory] = useState({
    age: '',
    medications: '',
    conditions: '',
    allergies: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDiagnosis = async () => {
    if (!symptoms.trim()) {
      alert(language === 'en' ? 'Please enter symptoms' : 'אנא הכנס תסמינים');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await aiDiagnosis(symptoms, patientHistory);
      setAiResults(result);
    } catch (error) {
      console.error('AI diagnosis failed:', error);
      setAiResults({
        error: 'AI analysis failed',
        fallback: 'Manual clinical assessment recommended',
        symptoms,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleHistoryChange = (field, value) => {
    setPatientHistory(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearAll = () => {
    setSymptoms('');
    setPatientHistory({
      age: '',
      medications: '',
      conditions: '',
      allergies: ''
    });
    setAiResults(null);
  };

  const renderAnalysisResults = () => {
    if (!aiResults) return null;

    if (aiResults.error) {
      return (
        <div className="ai-results error">
          <h3>{language === 'en' ? '❌ Analysis Failed' : '❌ הניתוח נכשל'}</h3>
          <p>{aiResults.error}</p>
          <p>{aiResults.fallback}</p>
          <div className="fallback-guidance">
            <h4>{language === 'en' ? 'Manual Assessment Guidance:' : 'הדרכה להערכה ידנית:'}</h4>
            <ul>
              <li>{language === 'en' ? 'Complete comprehensive history and physical exam' : 'השלם היסטוריה ובדיקה גופנית מקיפה'}</li>
              <li>{language === 'en' ? 'Consider differential diagnosis systematically' : 'שקול אבחנה מבדלת באופן שיטתי'}</li>
              <li>{language === 'en' ? 'Consult senior physician if needed' : 'התייעץ עם רופא בכיר במידת הצורך'}</li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="ai-results success">
        <div className="results-header">
          <h3>{language === 'en' ? '🤖 AI Analysis Results' : '🤖 תוצאות ניתוח AI'}</h3>
          <div className="confidence-badge">
            <span className={`confidence ${aiResults.consensus?.toLowerCase().replace(' ', '-')}`}>
              {aiResults.consensus} - {aiResults.confidence}% confidence
            </span>
            <span className="models-used">
              {aiResults.models} AI model{aiResults.models !== 1 ? 's' : ''} consulted
            </span>
          </div>
        </div>

        <div className="diagnosis-content">
          <div className="primary-diagnosis">
            <h4>{language === 'en' ? '🎯 Primary Diagnosis' : '🎯 אבחנה עיקרית'}</h4>
            <div className="diagnosis-item">
              <span className="diagnosis-name">{aiResults.primaryDiagnosis}</span>
            </div>
          </div>

          <div className="differential-diagnoses">
            <h4>{language === 'en' ? '🔍 Differential Diagnoses' : '🔍 אבחנות מבדלות'}</h4>
            <ul className="diagnosis-list">
              {aiResults.differentials?.map((diagnosis, index) => (
                <li key={index} className="differential-item">
                  {diagnosis}
                </li>
              ))}
            </ul>
          </div>

          <div className="investigations">
            <h4>{language === 'en' ? '🧪 Recommended Investigations' : '🧪 בדיקות מומלצות'}</h4>
            <ul className="investigation-list">
              {aiResults.investigations?.map((test, index) => (
                <li key={index} className="investigation-item">
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <div className="israeli-pathway">
            <h4>{language === 'en' ? '🇮🇱 Israeli Healthcare Pathway' : '🇮🇱 מסלול בריאות ישראלי'}</h4>
            <div className="pathway-content">
              <p>{aiResults.israeliPathway}</p>
            </div>
          </div>

          <div className="timestamp">
            <small>
              {language === 'en' ? 'Analysis completed:' : 'הניתוח הושלם:'} 
              {new Date(aiResults.timestamp).toLocaleString()}
            </small>
          </div>
        </div>

        <div className="ai-disclaimer">
          <p>
            {language === 'en' 
              ? '⚠️ AI-generated analysis for educational purposes only. Always confirm with clinical assessment.'
              : '⚠️ ניתוח שנוצר על ידי AI למטרות חינוכיות בלבד. תמיד אמת עם הערכה קלינית.'
            }
          </p>
        </div>
      </div>
    );
  };

  const quickSymptomButtons = [
    { en: 'Confusion + Agitation', he: 'בלבול + תסיסה' },
    { en: 'Falls + Weakness', he: 'נפילות + חולשה' },
    { en: 'Chest pain + SOB', he: 'כאב חזה + קוצר נשימה' },
    { en: 'Weight loss + Fatigue', he: 'ירידת משקל + עייפות' },
    { en: 'Memory problems', he: 'בעיות זיכרון' },
    { en: 'Medication side effects', he: 'תופעות לוואי של תרופות' }
  ];

  const addQuickSymptom = (symptom) => {
    const symptomText = language === 'en' ? symptom.en : symptom.he;
    setSymptoms(prev => prev ? `${prev}, ${symptomText}` : symptomText);
  };

  return (
    <div className="ai-diagnosis">
      <div className="diagnosis-header">
        <h2>{language === 'en' ? '🤖 AI-Powered Diagnosis' : '🤖 אבחון מונע AI'}</h2>
        <p>{language === 'en' 
          ? 'Multi-AI consensus diagnosis using Claude, GPT-4, and Gemini' 
          : 'אבחון קונצנזוס רב-AI באמצעות Claude, GPT-4 ו-Gemini'
        }</p>
      </div>

      <div className="diagnosis-input">
        <div className="symptoms-section">
          <h3>{language === 'en' ? '📝 Patient Symptoms' : '📝 תסמיני המטופל'}</h3>
          
          <div className="quick-symptoms">
            <h4>{language === 'en' ? 'Quick Add:' : 'הוספה מהירה:'}</h4>
            <div className="quick-buttons">
              {quickSymptomButtons.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => addQuickSymptom(symptom)}
                  className="quick-symptom-btn"
                >
                  {language === 'en' ? symptom.en : symptom.he}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={language === 'en' 
              ? 'Describe patient symptoms, duration, severity, associated factors...'
              : 'תאר תסמיני המטופל, משך, חומרה, גורמים נלווים...'
            }
            rows={4}
            className="symptoms-input"
          />
        </div>

        <div className="patient-history">
          <h3>{language === 'en' ? '👤 Patient History' : '👤 היסטוריית המטופל'}</h3>
          
          <div className="history-grid">
            <div className="history-field">
              <label>{language === 'en' ? 'Age:' : 'גיל:'}</label>
              <input
                type="number"
                min="0"
                max="120"
                value={patientHistory.age}
                onChange={(e) => handleHistoryChange('age', e.target.value)}
                placeholder={language === 'en' ? 'Patient age' : 'גיל המטופל'}
              />
            </div>

            <div className="history-field">
              <label>{language === 'en' ? 'Current Medications:' : 'תרופות נוכחיות:'}</label>
              <textarea
                value={patientHistory.medications}
                onChange={(e) => handleHistoryChange('medications', e.target.value)}
                placeholder={language === 'en' 
                  ? 'List current medications and doses...'
                  : 'רשום תרופות נוכחיות ומינונים...'
                }
                rows={2}
              />
            </div>

            <div className="history-field">
              <label>{language === 'en' ? 'Medical Conditions:' : 'מצבים רפואיים:'}</label>
              <textarea
                value={patientHistory.conditions}
                onChange={(e) => handleHistoryChange('conditions', e.target.value)}
                placeholder={language === 'en' 
                  ? 'Known medical conditions, surgeries...'
                  : 'מצבים רפואיים ידועים, ניתוחים...'
                }
                rows={2}
              />
            </div>

            <div className="history-field">
              <label>{language === 'en' ? 'Allergies:' : 'אלרגיות:'}</label>
              <input
                type="text"
                value={patientHistory.allergies}
                onChange={(e) => handleHistoryChange('allergies', e.target.value)}
                placeholder={language === 'en' ? 'Drug allergies, reactions...' : 'אלרגיות לתרופות, תגובות...'}
              />
            </div>
          </div>
        </div>

        <div className="diagnosis-actions">
          <button 
            onClick={handleDiagnosis} 
            disabled={isAnalyzing || !symptoms.trim()}
            className="analyze-btn"
          >
            {isAnalyzing 
              ? (language === 'en' ? '🔄 Analyzing...' : '🔄 מנתח...') 
              : (language === 'en' ? '🧠 Analyze with AI' : '🧠 נתח עם AI')
            }
          </button>
          
          <button onClick={clearAll} className="clear-btn">
            {language === 'en' ? '🗑️ Clear All' : '🗑️ נקה הכל'}
          </button>
        </div>

        {isAnalyzing && (
          <div className="analyzing-status">
            <div className="spinner"></div>
            <p>{language === 'en' 
              ? '🤖 Consulting AI models... This may take 30-60 seconds'
              : '🤖 מתייעץ עם מודלים של AI... זה עשוי לקחת 30-60 שניות'
            }</p>
            <div className="ai-models-status">
              <span>Claude: 🔄</span>
              <span>GPT-4: 🔄</span>
              <span>Gemini: 🔄</span>
            </div>
          </div>
        )}
      </div>

      {renderAnalysisResults()}

      <div className="ai-info">
        <h3>{language === 'en' ? '🔬 AI Analysis Features' : '🔬 תכונות ניתוח AI'}</h3>
        <div className="features-grid">
          <div className="feature-item">
            <h4>{language === 'en' ? 'Multi-AI Consensus' : 'קונצנזוס רב-AI'}</h4>
            <p>{language === 'en' 
              ? 'Combines insights from Claude, GPT-4, and Gemini for robust analysis'
              : 'משלב תובנות מ-Claude, GPT-4 ו-Gemini לניתוח חזק'
            }</p>
          </div>
          
          <div className="feature-item">
            <h4>{language === 'en' ? 'Israeli Healthcare Context' : 'הקשר בריאות ישראלי'}</h4>
            <p>{language === 'en' 
              ? 'Provides guidance specific to Israeli healthcare system and Kupot Holim'
              : 'מספק הדרכה ספציפית למערכת הבריאות הישראלית וקופות החולים'
            }</p>
          </div>
          
          <div className="feature-item">
            <h4>{language === 'en' ? 'Geriatric Focus' : 'מיקוד גריאטרי'}</h4>
            <p>{language === 'en' 
              ? 'Specialized for elderly patient presentations and geriatric syndromes'
              : 'מתמחה במצגי מטופלים קשישים וסינדרומים גריאטריים'
            }</p>
          </div>
        </div>
      </div>

      <div className="educational-disclaimer">
        <p>
          {language === 'en' 
            ? '⚠️ AI analysis for educational and training purposes only. Clinical decisions must be made by qualified healthcare providers with direct patient assessment.'
            : '⚠️ ניתוח AI למטרות חינוכיות והכשרה בלבד. החלטות קליניות חייבות להתקבל על ידי ספקי בריאות מוסמכים עם הערכת מטופל ישירה.'
          }
        </p>
      </div>
    </div>
  );
};

export default AIDiagnosis;