import React, { useState } from 'react';
import './Day1Survival.css';

const Day1Survival = () => {
  const [showDelirium, setShowDelirium] = useState(false);
  const [activeTab, setActiveTab] = useState('mustknow');
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  const Text = ({ en, he }) => {
    return <span>{language === 'en' ? en : he}</span>;
  };

  return (
    <div className={`day1-survival ${language === 'he' ? 'rtl' : ''}`}>
      {/* Language Toggle */}
      <button className="lang-toggle" onClick={toggleLanguage}>
        {language === 'en' ? 'עב/EN' : 'HE/עב'}
      </button>

      {/* PANIC BUTTON */}
      <button className="panic-button" onClick={() => setShowDelirium(true)}>
        <Text 
          en="🚨 PANIC! DELIRIUM PROTOCOL 🚨" 
          he="🚨 חירום! פרוטוקול דליריום 🚨"
        />
      </button>

      {/* Delirium Popup */}
      {showDelirium && (
        <div className="delirium-popup">
          <div className="delirium-content">
            <span className="close-btn" onClick={() => setShowDelirium(false)}>&times;</span>
            <h2>
              <Text 
                en="🚨 DELIRIUM EMERGENCY PROTOCOL" 
                he="🚨 פרוטוקול חירום דליריום"
              />
            </h2>
            
            <div className="critical">
              <strong>
                <Text 
                  en="CAM CRITERIA (need 1+2 AND 3 or 4):" 
                  he="קריטריוני CAM (צריך 1+2 וגם 3 או 4):"
                />
              </strong>
              <ol>
                <li>✅ <Text en="ACUTE onset + fluctuating" he="התחלה חדה + תנודות"/></li>
                <li>✅ <Text en="INATTENTION (can't count backward from 20)" he="חוסר קשב (לא יכול לספור אחורה מ-20)"/></li>
                <li>✅ <Text en="DISORGANIZED thinking OR" he="חשיבה לא מאורגנת או"/></li>
                <li>✅ <Text en="ALTERED consciousness" he="שינוי ברמת ההכרה"/></li>
              </ol>
            </div>
            
            <div className="critical">
              <strong><Text en="IMMEDIATE ORDERS:" he="הוראות מיידיות:"/></strong>
              <ul>
                <li>📋 <Text en="UA (UTI is #1 cause!)" he="בדיקת שתן (UTI הסיבה מס' 1!)"/></li>
                <li>📋 <Text en="CBC with diff" he="ספירת דם עם נוסחה"/></li>
                <li>📋 <Text en="BMP (check Na, glucose)" he="כימיה (בדוק Na, גלוקוז)"/></li>
                <li>📋 <Text en="Med review - STOP benzos/anticholinergics" he="סקירת תרופות - הפסק בנזו/אנטיכולינרגיות"/></li>
                <li>📋 <Text en="Consider head CT if fall/anticoag" he="שקול CT ראש אם נפילה/נוגדי קרישה"/></li>
              </ul>
            </div>
            
            <div className="mnemonic">
              <strong><Text en="DELIRIUM Mnemonic:" he="DELIRIUM ראשי תיבות:"/></strong><br/>
              <strong>D</strong> - <Text en="Drugs (benzos, anticholinergics)" he="תרופות (בנזו, אנטיכולינרגיות)"/><br/>
              <strong>E</strong> - <Text en="Electrolytes (Na, Ca)" he="אלקטרוליטים (Na, Ca)"/><br/>
              <strong>L</strong> - <Text en="Low O2 (check pulse ox)" he="חמצן נמוך (בדוק סטורציה)"/><br/>
              <strong>I</strong> - <Text en="Infection (UTI, pneumonia)" he="זיהום (UTI, דלקת ריאות)"/><br/>
              <strong>R</strong> - <Text en="Retention (bladder/stool)" he="אצירה (שתן/צואה)"/><br/>
              <strong>I</strong> - <Text en="Intracranial (stroke, subdural)" he="תוך גולגולתי (שבץ, תת-דורלי)"/><br/>
              <strong>U</strong> - <Text en="Uremia" he="אורמיה"/><br/>
              <strong>M</strong> - <Text en="Myocardial (MI, CHF)" he="לבבי (MI, אי ספיקת לב)"/>
            </div>
          </div>
        </div>
      )}

      {/* Pinned Drugs */}
      <div className="pinned-drugs">
        <h3>
          <Text 
            en="⭐ MOST-USED DRUGS (PINNED)" 
            he="⭐ תרופות נפוצות (מוצמדות)"
          />
        </h3>
        
        <div className="drug-card">
          <div className="drug-name">
            <Text en="HALOPERIDOL (Haldol)" he="הלופרידול (הלדול)"/>
          </div>
          <div className="drug-dose">
            <strong><Text en="Elderly:" he="קשישים:"/></strong> 0.25-0.5mg PO/IM<br/>
            <strong><Text en="Regular:" he="רגיל:"/></strong> 2-5mg<br/>
            ⚠️ <Text 
              en="BLACK BOX: Increases mortality in dementia" 
              he="אזהרת קופסה שחורה: מעלה תמותה בדמנציה"
            />
          </div>
        </div>
        
        <div className="drug-card">
          <div className="drug-name">
            <Text en="RAMIPRIL" he="רמיפריל (טריטייס)"/>
          </div>
          <div className="drug-dose">
            <strong><Text en="Elderly Start:" he="התחלה קשישים:"/></strong> 1.25mg <Text en="daily" he="יומי"/><br/>
            <strong><Text en="Target:" he="מטרה:"/></strong> 5-10mg <Text en="daily" he="יומי"/><br/>
            ✅ <Text en="Monitor K+ and Cr" he="עקוב K+ ו-Cr"/>
          </div>
        </div>
        
        <div className="drug-card">
          <div className="drug-name">
            <Text en="FUROSEMIDE (Lasix)" he="פורוסמיד (פוסיד)"/>
          </div>
          <div className="drug-dose">
            <strong><Text en="Elderly Start:" he="התחלה קשישים:"/></strong> 20mg <Text en="daily" he="יומי"/><br/>
            <strong><Text en="Max:" he="מקסימום:"/></strong> <Text en="Usually 80mg BID" he="בד״כ 80mg פעמיים ביום"/><br/>
            ⚠️ <Text en="Watch K+, Mg++, increases digoxin toxicity" he="עקוב K+, Mg++, מעלה רעילות דיגוקסין"/>
          </div>
        </div>
        
        <div className="drug-card">
          <div className="drug-name">
            <Text en="BISOPROLOL" he="ביסופרולול (קונקור)"/>
          </div>
          <div className="drug-dose">
            <strong><Text en="Elderly Start:" he="התחלה קשישים:"/></strong> 1.25mg <Text en="daily" he="יומי"/><br/>
            <strong><Text en="Target HR:" he="דופק מטרה:"/></strong> 60-70 <Text en="in HF" he="באי-ספיקת לב"/><br/>
            ✅ <Text en="Better than atenolol in elderly" he="עדיף על אטנולול בקשישים"/>
          </div>
        </div>
        
        <div className="drug-card">
          <div className="drug-name">
            <Text en="AMLODIPINE" he="אמלודיפין (נורווסק)"/>
          </div>
          <div className="drug-dose">
            <strong><Text en="Elderly Start:" he="התחלה קשישים:"/></strong> 2.5mg <Text en="daily" he="יומי"/><br/>
            <strong><Text en="Max:" he="מקסימום:"/></strong> 10mg <Text en="daily" he="יומי"/><br/>
            ⚠️ <Text en="Edema common, not heart failure!" he="בצקת שכיחה, לא אי-ספיקת לב!"/>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'mustknow' ? 'active' : ''}`}
          onClick={() => setActiveTab('mustknow')}
        >
          <Text en="MUST KNOW" he="חובה לדעת"/>
        </button>
        <button 
          className={`tab ${activeTab === 'assess' ? 'active' : ''}`}
          onClick={() => setActiveTab('assess')}
        >
          <Text en="ASSESSMENTS" he="הערכות"/>
        </button>
        <button 
          className={`tab ${activeTab === 'redflag' ? 'active' : ''}`}
          onClick={() => setActiveTab('redflag')}
        >
          <Text en="RED FLAGS" he="דגלים אדומים"/>
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {activeTab === 'mustknow' && (
          <div>
            <h2>
              <Text en="DAY 1: MUST KNOW COLD" he="יום 1: חובה לדעת בעל פה"/>
            </h2>
            
            <h3>
              <Text en="FRIED FRAILTY (≥3 = frail)" he="שבריריות FRIED (≥3 = שבריר)"/>
            </h3>
            <ol>
              <li><Text en="Weight loss >4.5 kg/year" he="ירידה במשקל >4.5 ק״ג/שנה"/></li>
              <li><Text en="Exhaustion (self-reported)" he="תשישות (דיווח עצמי)"/></li>
              <li><Text en="Weakness (grip strength)" he="חולשה (כוח אחיזה)"/></li>
              <li><Text en="Slow walking (>6-7 sec for 4.5 meters)" he="הליכה איטית (>6-7 שניות ל-4.5 מטר)"/></li>
              <li><Text en="Low activity" he="פעילות נמוכה"/></li>
            </ol>
            
            <h3>
              <Text en="DELIRIUM vs DEMENTIA" he="דליריום מול דמנציה"/>
            </h3>
            <table style={{width: '100%', margin: '10px 0'}}>
              <tr>
                <td><strong><Text en="DELIRIUM" he="דליריום"/></strong></td>
                <td><strong><Text en="DEMENTIA" he="דמנציה"/></strong></td>
              </tr>
              <tr>
                <td>✅ <Text en="HOURS to days" he="שעות עד ימים"/></td>
                <td>❌ <Text en="MONTHS to years" he="חודשים עד שנים"/></td>
              </tr>
              <tr>
                <td>✅ <Text en="FLUCTUATES" he="משתנה"/></td>
                <td>❌ <Text en="STABLE decline" he="ירידה יציבה"/></td>
              </tr>
              <tr>
                <td>✅ <Text en="INATTENTION" he="חוסר קשב"/></td>
                <td>❌ <Text en="MEMORY loss first" he="אובדן זיכרון קודם"/></td>
              </tr>
            </table>
            
            <h3>
              <Text en="FALLS: Timed Up & Go" he="נפילות: Timed Up & Go"/>
            </h3>
            <div className="critical">
              <strong><Text en=">12 seconds = HIGH RISK" he=">12 שניות = סיכון גבוה"/></strong><br/>
              <Text 
                en="Check: Orthostatics | Vision | Feet | Meds (>4)" 
                he="בדוק: אורתוסטטיות | ראייה | כפות רגליים | תרופות (>4)"
              />
            </div>
            
            <h3>
              <Text en="POLYPHARMACY KILLERS" he="רב-תרופתיות קטלנית"/>
            </h3>
            <ul>
              <li><span className="highlight">Benzos</span> → <Text en="Falls (2.7x risk)" he="נפילות (סיכון פי 2.7)"/></li>
              <li><span className="highlight">Anticholinergics</span> → <Text en="Confusion" he="בלבול"/></li>
              <li><span className="highlight">NSAIDs</span> → <Text en="Renal failure" he="אי ספיקת כליות"/></li>
              <li><span className="highlight">PPIs >8 weeks</span> → <Text en="C.diff, fractures" he="C.diff, שברים"/></li>
            </ul>
          </div>
        )}

        {activeTab === 'assess' && (
          <div>
            <h2><Text en="QUICK ASSESSMENTS" he="הערכות מהירות"/></h2>
            
            <h3>MINI-COG (3 min)</h3>
            <ol>
              <li><Text en="Remember 3 words" he="זכור 3 מילים"/></li>
              <li><Text en="Draw clock (11:10)" he="צייר שעון (11:10)"/></li>
              <li><Text en="Recall 3 words" he="זכור את 3 המילים"/></li>
            </ol>
            <p><strong><Text en="Score:" he="ניקוד:"/></strong> <Text en="0-2 recall + abnormal clock = POSITIVE" he="0-2 זכירה + שעון לא תקין = חיובי"/></p>
            
            <h3><Text en="CAM (Confusion Assessment)" he="CAM (הערכת בלבול)"/></h3>
            <div className="critical">
              <Text en="Need: (1) Acute + (2) Inattention" he="צריך: (1) חד + (2) חוסר קשב"/><br/>
              <Text en="AND: (3) Disorganized OR (4) Altered LOC" he="וגם: (3) לא מאורגן או (4) שינוי הכרה"/>
            </div>
            
            <h3><Text en="ADLs (Can't do = needs help)" he="ADLs (לא יכול = צריך עזרה)"/></h3>
            <ul>
              <li><strong>B</strong>athing - <Text en="Bathing" he="רחצה"/></li>
              <li><strong>D</strong>ressing - <Text en="Dressing" he="הלבשה"/></li>
              <li><strong>T</strong>oileting - <Text en="Toileting" he="שירותים"/></li>
              <li><strong>T</strong>ransferring - <Text en="Transferring" he="העברה"/></li>
              <li><strong>C</strong>ontinence - <Text en="Continence" he="שליטה"/></li>
              <li><strong>F</strong>eeding - <Text en="Feeding" he="האכלה"/></li>
            </ul>
            
            <h3>MORSE Fall Scale</h3>
            <ul>
              <li><Text en="History of falls: 25 points" he="היסטוריית נפילות: 25 נקודות"/></li>
              <li><Text en="Secondary diagnosis: 15 points" he="אבחנה משנית: 15 נקודות"/></li>
              <li><Text en="Ambulatory aid: 15-30 points" he="עזרי הליכה: 15-30 נקודות"/></li>
              <li>IV/Heparin lock: 20 <Text en="points" he="נקודות"/></li>
              <li><Text en="Gait impaired: 10-20 points" he="הליכה לקויה: 10-20 נקודות"/></li>
              <li><Text en="Mental status: 15 points" he="מצב מנטלי: 15 נקודות"/></li>
            </ul>
            <p><strong><Text en=">45 = HIGH RISK" he=">45 = סיכון גבוה"/></strong></p>
          </div>
        )}

        {activeTab === 'redflag' && (
          <div>
            <h2>🚩 <Text en="NEVER MISS THESE" he="לעולם אל תפספס"/></h2>
            
            <div className="critical">
              <strong><Text en="NEW CONFUSION" he="בלבול חדש"/></strong><br/>
              = <Text en="DELIRIUM until proven otherwise" he="דליריום עד שמוכח אחרת"/><br/>
              → <Text en="Full workup NOW" he="בירור מלא עכשיו"/>
            </div>
            
            <div className="critical">
              <strong><Text en="NEW INCONTINENCE" he="אי שליטה חדשה"/></strong><br/>
              = <Text en="Cord compression until proven otherwise" he="לחץ על חוט השדרה עד שמוכח אחרת"/><br/>
              → <Text en="Check rectal tone, urgent MRI" he="בדוק טונוס רקטלי, MRI דחוף"/>
            </div>
            
            <div className="critical">
              <strong><Text en="FAILURE TO THRIVE" he="כשלון בשגשוג"/></strong><br/>
              = <Text en="Depression vs Cancer" he="דיכאון מול סרטן"/><br/>
              → PHQ-9, CBC, CMP, <Text en="consider CT" he="שקול CT"/>
            </div>
            
            <div className="critical">
              <strong><Text en="REPEATED FALLS" he="נפילות חוזרות"/></strong><br/>
              = <Text en="Parkinson's, NPH, subdural" he="פרקינסון, NPH, תת-דורלי"/><br/>
              → <Text en="Neuro exam, head CT, gait assessment" he="בדיקה נוירולוגית, CT ראש, הערכת הליכה"/>
            </div>
            
            <div className="critical">
              <strong><Text en="WEIGHT LOSS >5%" he="ירידה במשקל >5%"/></strong><br/>
              = <Text en="Cancer, depression, dementia" he="סרטן, דיכאון, דמנציה"/><br/>
              → <Text en="Full review, depression screen, CT" he="סקירה מלאה, סקר דיכאון, CT"/>
            </div>
            
            <h3><Text en="ATTENDING WILL ASK:" he="המנהל ישאל:"/></h3>
            <ul>
              <li><Text en='"Did you check orthostatics?" (>20/10 drop)' he='"בדקת אורתוסטטיות?" (ירידה >20/10)'/></li>
              <li><Text en='"What\'s the med count?" (>4 = problem)' he='"כמה תרופות?" (>4 = בעיה)'/></li>
              <li><Text en='"Did you do a CAM?" (know it cold!)' he='"עשית CAM?" (דע בעל פה!)'/></li>
              <li><Text en='"What\'s the eGFR?" (Cr 1.0 in 80yo = ~50)' he='"מה ה-eGFR?" (Cr 1.0 בגיל 80 = ~50)'/></li>
              <li><Text en='"Is this delirium or dementia?" (know difference!)' he='"זה דליריום או דמנציה?" (דע את ההבדל!)'/></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Day1Survival;