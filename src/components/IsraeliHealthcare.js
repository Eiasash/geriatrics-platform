import React, { useState } from 'react';

const IsraeliHealthcare = ({ language, optimizeKupahPathway, calculateBituachLeumiEligibility }) => {
  const [activeSection, setActiveSection] = useState('kupah');
  const [kupahData, setKupahData] = useState({
    diagnosis: '',
    kupah: 'clalit',
    urgency: 'routine'
  });
  const [bituachData, setBituachData] = useState({
    age: '',
    adlDependency: 0,
    chronicConditions: 0,
    mmse: 30
  });
  const [results, setResults] = useState(null);

  const handleKupahOptimization = () => {
    const result = optimizeKupahPathway(kupahData.diagnosis, kupahData.kupah, kupahData.urgency);
    setResults({ type: 'kupah', data: result });
  };

  const handleBituachEligibility = () => {
    const result = calculateBituachLeumiEligibility({
      age: parseInt(bituachData.age),
      adlDependency: bituachData.adlDependency,
      chronicConditions: bituachData.chronicConditions,
      mmse: bituachData.mmse
    });
    setResults({ type: 'bituach', data: result });
  };

  const renderKupahOptimizer = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '🏥 Kupah Optimization' : '🏥 אופטימיזציה של קופה'}</h3>
      
      <div className="form-group">
        <label>{language === 'en' ? 'Diagnosis/Condition:' : 'אבחנה/מצב:'}</label>
        <input
          type="text"
          value={kupahData.diagnosis}
          onChange={(e) => setKupahData(prev => ({ ...prev, diagnosis: e.target.value }))}
          placeholder={language === 'en' ? 'Enter diagnosis or condition' : 'הכנס אבחנה או מצב'}
        />
      </div>

      <div className="form-group">
        <label>{language === 'en' ? 'Kupah:' : 'קופה:'}</label>
        <select
          value={kupahData.kupah}
          onChange={(e) => setKupahData(prev => ({ ...prev, kupah: e.target.value }))}
        >
          <option value="clalit">{language === 'en' ? 'Clalit' : 'כללית'}</option>
          <option value="maccabi">{language === 'en' ? 'Maccabi' : 'מכבי'}</option>
          <option value="meuhedet">{language === 'en' ? 'Meuhedet' : 'מאוחדת'}</option>
          <option value="leumit">{language === 'en' ? 'Leumit' : 'לאומית'}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{language === 'en' ? 'Urgency:' : 'דחיפות:'}</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="urgency"
              value="routine"
              checked={kupahData.urgency === 'routine'}
              onChange={(e) => setKupahData(prev => ({ ...prev, urgency: e.target.value }))}
            />
            {language === 'en' ? 'Routine' : 'רגיל'}
          </label>
          <label>
            <input
              type="radio"
              name="urgency"
              value="urgent"
              checked={kupahData.urgency === 'urgent'}
              onChange={(e) => setKupahData(prev => ({ ...prev, urgency: e.target.value }))}
            />
            {language === 'en' ? 'Urgent' : 'דחוף'}
          </label>
          <label>
            <input
              type="radio"
              name="urgency"
              value="private"
              checked={kupahData.urgency === 'private'}
              onChange={(e) => setKupahData(prev => ({ ...prev, urgency: e.target.value }))}
            />
            {language === 'en' ? 'Private' : 'פרטי'}
          </label>
        </div>
      </div>

      <button onClick={handleKupahOptimization} className="optimize-btn">
        {language === 'en' ? '🎯 Optimize Pathway' : '🎯 אופטימיזציה של מסלול'}
      </button>
    </div>
  );

  const renderBituachLeumiCalculator = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '💳 Bituach Leumi Eligibility' : '💳 זכאות ביטוח לאומי'}</h3>
      
      <div className="form-group">
        <label>{language === 'en' ? 'Age:' : 'גיל:'}</label>
        <input
          type="number"
          min="0"
          max="120"
          value={bituachData.age}
          onChange={(e) => setBituachData(prev => ({ ...prev, age: e.target.value }))}
          placeholder={language === 'en' ? 'Patient age' : 'גיל המטופל'}
        />
      </div>

      <div className="form-group">
        <label>{language === 'en' ? 'ADL Dependency Level (0-6):' : 'רמת תלות בפעילויות יומיומיות (0-6):'}</label>
        <input
          type="number"
          min="0"
          max="6"
          value={bituachData.adlDependency}
          onChange={(e) => setBituachData(prev => ({ ...prev, adlDependency: parseInt(e.target.value) || 0 }))}
        />
        <small>{language === 'en' 
          ? '0 = Independent, 6 = Completely dependent' 
          : '0 = עצמאי, 6 = תלוי לחלוטין'
        }</small>
      </div>

      <div className="form-group">
        <label>{language === 'en' ? 'Number of Chronic Conditions:' : 'מספר מצבים כרוניים:'}</label>
        <input
          type="number"
          min="0"
          max="20"
          value={bituachData.chronicConditions}
          onChange={(e) => setBituachData(prev => ({ ...prev, chronicConditions: parseInt(e.target.value) || 0 }))}
        />
      </div>

      <div className="form-group">
        <label>{language === 'en' ? 'MMSE Score:' : 'ציון MMSE:'}</label>
        <input
          type="number"
          min="0"
          max="30"
          value={bituachData.mmse}
          onChange={(e) => setBituachData(prev => ({ ...prev, mmse: parseInt(e.target.value) || 30 }))}
        />
        <small>{language === 'en' 
          ? '0-30 (30 = normal cognition)' 
          : '0-30 (30 = קוגניציה תקינה)'
        }</small>
      </div>

      <button onClick={handleBituachEligibility} className="calculate-btn">
        {language === 'en' ? '📊 Calculate Eligibility' : '📊 חשב זכאות'}
      </button>
    </div>
  );

  const renderKupahResults = (data) => (
    <div className="results-panel">
      <h3>{language === 'en' ? '🎯 Optimized Pathway Results' : '🎯 תוצאות מסלול מאופטם'}</h3>
      
      <div className="pathway-info">
        <div className="info-item">
          <span className="label">{language === 'en' ? 'Wait Time:' : 'זמן המתנה:'}</span>
          <span className="value">{data.pathway.wait}</span>
        </div>
        <div className="info-item">
          <span className="label">{language === 'en' ? 'Cost:' : 'עלות:'}</span>
          <span className="value">{data.pathway.cost}</span>
        </div>
        {data.pathway.form17 && (
          <div className="info-item">
            <span className="label">{language === 'en' ? 'Form 17:' : 'טופס 17:'}</span>
            <span className="value important">{language === 'en' ? 'Required' : 'נדרש'}</span>
          </div>
        )}
        {data.estimatedCost && (
          <div className="info-item">
            <span className="label">{language === 'en' ? 'Estimated Cost:' : 'עלות משוערת:'}</span>
            <span className="value">₪{data.estimatedCost}</span>
          </div>
        )}
      </div>

      <div className="recommendation">
        <h4>{language === 'en' ? '💡 Recommendation:' : '💡 המלצה:'}</h4>
        <p>{data.recommendation}</p>
        <p className="hebrew-instructions">{data.hebrewInstructions}</p>
      </div>

      {data.form17Required && (
        <div className="form17-info">
          <h4>{language === 'en' ? '📋 Form 17 Information:' : '📋 מידע על טופס 17:'}</h4>
          <ul>
            <li>{language === 'en' 
              ? 'Required for private specialist consultation with reimbursement'
              : 'נדרש לייעוץ מומחה פרטי עם החזר'
            }</li>
            <li>{language === 'en' 
              ? 'Must be approved by family physician first'
              : 'חייב אישור רופא משפחה תחילה'
            }</li>
            <li>{language === 'en' 
              ? 'Partial reimbursement available'
              : 'החזר חלקי זמין'
            }</li>
          </ul>
        </div>
      )}
    </div>
  );

  const renderBituachResults = (data) => (
    <div className="results-panel">
      <h3>{language === 'en' ? '💳 Bituach Leumi Eligibility Results' : '💳 תוצאות זכאות ביטוח לאומי'}</h3>
      
      <div className={`eligibility-status ${data.eligible ? 'eligible' : 'not-eligible'}`}>
        <h4>{data.eligible 
          ? (language === 'en' ? '✅ ELIGIBLE' : '✅ זכאי')
          : (language === 'en' ? '❌ NOT ELIGIBLE' : '❌ לא זכאי')
        }</h4>
        <p>{language === 'en' ? `Score: ${data.score}/4` : `ציון: ${data.score}/4`}</p>
      </div>

      <div className="eligibility-factors">
        <h4>{language === 'en' ? '📊 Eligibility Factors:' : '📊 גורמי זכאות:'}</h4>
        <div className="factors-grid">
          <div className={`factor ${data.factors.age ? 'met' : 'not-met'}`}>
            <span>{language === 'en' ? 'Age ≥67:' : 'גיל ≥67:'}</span>
            <span>{data.factors.age ? '✅' : '❌'}</span>
          </div>
          <div className={`factor ${data.factors.disability ? 'met' : 'not-met'}`}>
            <span>{language === 'en' ? 'ADL Dependency:' : 'תלות ADL:'}</span>
            <span>{data.factors.disability ? '✅' : '❌'}</span>
          </div>
          <div className={`factor ${data.factors.chronic ? 'met' : 'not-met'}`}>
            <span>{language === 'en' ? 'Chronic Conditions:' : 'מצבים כרוניים:'}</span>
            <span>{data.factors.chronic ? '✅' : '❌'}</span>
          </div>
          <div className={`factor ${data.factors.cognitive ? 'met' : 'not-met'}`}>
            <span>{language === 'en' ? 'Cognitive Impairment:' : 'פגיעה קוגניטיבית:'}</span>
            <span>{data.factors.cognitive ? '✅' : '❌'}</span>
          </div>
        </div>
      </div>

      <div className="available-benefits">
        <h4>{language === 'en' ? '🏠 Available Benefits:' : '🏠 הטבות זמינות:'}</h4>
        <ul>
          {data.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="next-steps">
        <h4>{language === 'en' ? '📋 Next Steps:' : '📋 השלבים הבאים:'}</h4>
        <p>{data.nextSteps}</p>
      </div>
    </div>
  );

  const renderSystemHacks = () => (
    <div className="section-content">
      <h3>{language === 'en' ? '⚡ System Hacks & Tips' : '⚡ טריקים וטיפים למערכת'}</h3>
      
      <div className="hacks-grid">
        <div className="hack-card">
          <h4>{language === 'en' ? '🏥 Emergency Department' : '🏥 מיון'}</h4>
          <ul>
            <li>{language === 'en' 
              ? 'Best time: Tuesday 2-4 AM (least crowded)'
              : 'זמן הטוב ביותר: שלישי 2-4 בלילה (הכי פחות עמוס)'
            }</li>
            <li>{language === 'en' 
              ? 'Magic words: "chest pain" or "shortness of breath"'
              : 'מילות קסם: "כאב חזה" או "קוצר נשימה"'
            }</li>
            <li>{language === 'en' 
              ? 'Direct admission: Call geriatrics resident'
              : 'אשפוז ישיר: התקשר למתמחה בגריאטריה'
            }</li>
          </ul>
        </div>

        <div className="hack-card">
          <h4>{language === 'en' ? '📋 Clalit Hacks' : '📋 טריקים בכללית'}</h4>
          <ul>
            <li>{language === 'en' 
              ? 'Form 17: Fast track to everything'
              : 'טופס 17: מסלול מהיר לכל דבר'
            }</li>
            <li>{language === 'en' 
              ? 'Private consult → submit for reimbursement'
              : 'ייעוץ פרטי ← הגש לקבלת החזר'
            }</li>
            <li>{language === 'en' 
              ? 'Virtual first appointments skip physical queue'
              : 'תורים וירטואליים ראשונים דולגים על התור הפיזי'
            }</li>
          </ul>
        </div>

        <div className="hack-card">
          <h4>{language === 'en' ? '💳 Bituach Leumi Mastery' : '💳 שליטה בביטוח לאומי'}</h4>
          <ul>
            <li>{language === 'en' 
              ? 'Keywords: "פגיעה תפקודית", "סיעודי"'
              : 'מילות מפתח: "פגיעה תפקודית", "סיעודי"'
            }</li>
            <li>{language === 'en' 
              ? 'Documentation: Emphasize ADL limitations'
              : 'תיעוד: הדגש מגבלות ADL'
            }</li>
            <li>{language === 'en' 
              ? 'Always appeal first decision if rejected'
              : 'תמיד ערער על ההחלטה הראשונה אם נדחתה'
            }</li>
          </ul>
        </div>

        <div className="hack-card">
          <h4>{language === 'en' ? '📞 Contact Shortcuts' : '📞 קיצורי דרך לפנייה'}</h4>
          <ul>
            <li>{language === 'en' 
              ? 'Geriatrics hotline: *2700'
              : 'קו חם גריאטריה: *2700'
            }</li>
            <li>{language === 'en' 
              ? 'Bituach Leumi: 6050*'
              : 'ביטוח לאומי: *6050'
            }</li>
            <li>{language === 'en' 
              ? 'Ministry of Health: *5400'
              : 'משרד הבריאות: *5400'
            }</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="israeli-healthcare">
      <div className="section-header">
        <h2>{language === 'en' ? '🇮🇱 Israeli Healthcare Navigation' : '🇮🇱 ניווט במערכת הבריאות הישראלית'}</h2>
        <p>{language === 'en' 
          ? 'Optimize pathways through Israeli healthcare system' 
          : 'אופטימיזציה של מסלולים במערכת הבריאות הישראלית'
        }</p>
      </div>

      <div className="section-nav">
        <button 
          onClick={() => setActiveSection('kupah')}
          className={activeSection === 'kupah' ? 'active' : ''}
        >
          {language === 'en' ? '🏥 Kupah Optimizer' : '🏥 אופטימיזציה של קופה'}
        </button>
        <button 
          onClick={() => setActiveSection('bituach')}
          className={activeSection === 'bituach' ? 'active' : ''}
        >
          {language === 'en' ? '💳 Bituach Leumi' : '💳 ביטוח לאומי'}
        </button>
        <button 
          onClick={() => setActiveSection('hacks')}
          className={activeSection === 'hacks' ? 'active' : ''}
        >
          {language === 'en' ? '⚡ System Hacks' : '⚡ טריקים למערכת'}
        </button>
      </div>

      <div className="section-content-container">
        {activeSection === 'kupah' && renderKupahOptimizer()}
        {activeSection === 'bituach' && renderBituachLeumiCalculator()}
        {activeSection === 'hacks' && renderSystemHacks()}

        {results && (
          results.type === 'kupah' ? renderKupahResults(results.data) : renderBituachResults(results.data)
        )}
      </div>

      <div className="israeli-resources">
        <h3>{language === 'en' ? '📚 Useful Resources' : '📚 משאבים שימושיים'}</h3>
        <div className="resources-grid">
          <div className="resource-item">
            <h4>{language === 'en' ? 'Ministry of Health Guidelines' : 'הנחיות משרד הבריאות'}</h4>
            <p>health.gov.il</p>
          </div>
          <div className="resource-item">
            <h4>{language === 'en' ? 'Bituach Leumi Services' : 'שירותי ביטוח לאומי'}</h4>
            <p>btl.gov.il</p>
          </div>
          <div className="resource-item">
            <h4>{language === 'en' ? 'Israeli Geriatrics Society' : 'האגודה הגריאטרית הישראלית'}</h4>
            <p>geriatrics.org.il</p>
          </div>
          <div className="resource-item">
            <h4>{language === 'en' ? 'Shaare Zedek Geriatrics' : 'גריאטריה שערי צדק'}</h4>
            <p>szmc.org.il</p>
          </div>
        </div>
      </div>

      <div className="educational-disclaimer">
        <p>
          {language === 'en' 
            ? '⚠️ Israeli healthcare navigation for educational purposes. Always verify current policies and procedures.'
            : '⚠️ ניווט במערכת הבריאות הישראלית למטרות חינוכיות. תמיד אמת מדיניות ונהלים עדכניים.'
          }
        </p>
      </div>
    </div>
  );
};

export default IsraeliHealthcare;