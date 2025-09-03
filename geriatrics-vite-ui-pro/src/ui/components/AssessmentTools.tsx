import React, { useState } from 'react';
import { Brain, AlertTriangle, Activity, Scale, Heart, CheckCircle, Save } from 'lucide-react';
import { db } from '../../lib/supabase';

interface AssessmentToolsProps {
  language: 'en' | 'he';
  patientId?: string;
  onAssessmentComplete?: (assessment: any) => void;
}

export default function AssessmentTools({ language, patientId, onAssessmentComplete }: AssessmentToolsProps) {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  const assessmentTypes = [
    {
      id: 'mmse',
      name: language === 'en' ? 'MMSE - Mini Mental State Examination' : 'MMSE - בדיקת מצב נפשי מיני',
      icon: Brain,
      description: language === 'en' ? 'Cognitive assessment tool (0-30 points)' : 'כלי הערכה קוגניטיבית (0-30 נקודות)',
      color: 'bg-blue-500'
    },
    {
      id: 'morse_fall',
      name: language === 'en' ? 'Morse Fall Scale' : 'סולם מורס לנפילות',
      icon: AlertTriangle,
      description: language === 'en' ? 'Fall risk assessment (0-125 points)' : 'הערכת סיכון נפילה (0-125 נקודות)',
      color: 'bg-red-500'
    },
    {
      id: 'tug',
      name: language === 'en' ? 'TUG Test - Timed Up and Go' : 'מבחן TUG - קום ולך מתוזמן',
      icon: Activity,
      description: language === 'en' ? 'Mobility and fall risk assessment' : 'הערכת ניידות וסיכון נפילה',
      color: 'bg-green-500'
    },
    {
      id: 'braden',
      name: language === 'en' ? 'Braden Scale' : 'סולם ברדן',
      icon: Scale,
      description: language === 'en' ? 'Pressure ulcer risk assessment' : 'הערכת סיכון לפצעי לחץ',
      color: 'bg-purple-500'
    }
  ];

  const saveAssessment = async (assessmentType: string, scoreData: any) => {
    if (!patientId) {
      alert(language === 'en' ? 'Please select a patient first' : 'אנא בחר מטופל תחילה');
      return;
    }

    setSaving(true);
    try {
      const assessment = await db.createAssessment({
        patient_id: patientId,
        assessment_type: assessmentType as any,
        score: scoreData,
        performed_by: 'Current User', // Replace with actual user
      });

      onAssessmentComplete?.(assessment);
      
      alert(language === 'en' ? 'Assessment saved successfully!' : 'ההערכה נשמרה בהצלחה!');
      setActiveAssessment(null);
      setScores({});
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert(language === 'en' ? 'Error saving assessment' : 'שגיאה בשמירת ההערכה');
    } finally {
      setSaving(false);
    }
  };

  const MMSEAssessment = () => {
    const [mmseScores, setMmseScores] = useState({
      orientation: 0,
      registration: 0,
      attention: 0,
      recall: 0,
      language: 0
    });

    const total = Object.values(mmseScores).reduce((sum, score) => sum + score, 0);

    const getRiskLevel = (score: number) => {
      if (score >= 24) return { level: 'Normal', color: 'text-green-600', bg: 'bg-green-50' };
      if (score >= 18) return { level: 'Mild Impairment', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      return { level: 'Severe Impairment', color: 'text-red-600', bg: 'bg-red-50' };
    };

    const risk = getRiskLevel(total);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Orientation (0-10)' : 'התמצאות (0-10)'}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={mmseScores.orientation}
                onChange={(e) => setMmseScores(prev => ({ ...prev, orientation: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-center text-lg font-semibold">{mmseScores.orientation}/10</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Registration (0-3)' : 'רישום (0-3)'}
              </label>
              <input
                type="range"
                min="0"
                max="3"
                value={mmseScores.registration}
                onChange={(e) => setMmseScores(prev => ({ ...prev, registration: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-center text-lg font-semibold">{mmseScores.registration}/3</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Attention & Calculation (0-5)' : 'קשב וחישוב (0-5)'}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                value={mmseScores.attention}
                onChange={(e) => setMmseScores(prev => ({ ...prev, attention: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-center text-lg font-semibold">{mmseScores.attention}/5</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Recall (0-3)' : 'היזכרות (0-3)'}
              </label>
              <input
                type="range"
                min="0"
                max="3"
                value={mmseScores.recall}
                onChange={(e) => setMmseScores(prev => ({ ...prev, recall: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-center text-lg font-semibold">{mmseScores.recall}/3</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Language (0-9)' : 'שפה (0-9)'}
              </label>
              <input
                type="range"
                min="0"
                max="9"
                value={mmseScores.language}
                onChange={(e) => setMmseScores(prev => ({ ...prev, language: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-center text-lg font-semibold">{mmseScores.language}/9</div>
            </div>

            <div className={`p-4 rounded-lg ${risk.bg}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{total}/30</div>
                <div className={`text-lg font-semibold ${risk.color}`}>{risk.level}</div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => saveAssessment('mmse', { total, ...mmseScores, risk_category: risk.level })}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="h-5 w-5" />
          {saving ? (language === 'en' ? 'Saving...' : 'שומר...') : (language === 'en' ? 'Save Assessment' : 'שמור הערכה')}
        </button>
      </div>
    );
  };

  const MorseFallAssessment = () => {
    const [morseScores, setMorseScores] = useState({
      history: 0,
      diagnosis: 0,
      ambulation: 0,
      iv: 0,
      gait: 0,
      mental_status: 0
    });

    const total = Object.values(morseScores).reduce((sum, score) => sum + score, 0);

    const getRiskLevel = (score: number) => {
      if (score >= 45) return { level: 'High Risk', color: 'text-red-600', bg: 'bg-red-50' };
      if (score >= 25) return { level: 'Moderate Risk', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      return { level: 'Low Risk', color: 'text-green-600', bg: 'bg-green-50' };
    };

    const risk = getRiskLevel(total);

    const morseItems = [
      {
        key: 'history',
        label: language === 'en' ? 'History of Falls' : 'היסטוריה של נפילות',
        options: [
          { value: 0, label: language === 'en' ? 'No' : 'לא' },
          { value: 25, label: language === 'en' ? 'Yes' : 'כן' }
        ]
      },
      {
        key: 'diagnosis',
        label: language === 'en' ? 'Secondary Diagnosis' : 'אבחנה משנית',
        options: [
          { value: 0, label: language === 'en' ? 'No' : 'לא' },
          { value: 15, label: language === 'en' ? 'Yes' : 'כן' }
        ]
      },
      {
        key: 'ambulation',
        label: language === 'en' ? 'Ambulatory Aid' : 'עזר להליכה',
        options: [
          { value: 0, label: language === 'en' ? 'None/Bedrest' : 'ללא/מנוחת מיטה' },
          { value: 15, label: language === 'en' ? 'Crutches/Cane' : 'קביים/מקל' },
          { value: 30, label: language === 'en' ? 'Furniture' : 'רהיטים' }
        ]
      },
      {
        key: 'iv',
        label: language === 'en' ? 'IV/Heparin Lock' : 'עירוי תוך ורידי',
        options: [
          { value: 0, label: language === 'en' ? 'No' : 'לא' },
          { value: 20, label: language === 'en' ? 'Yes' : 'כן' }
        ]
      },
      {
        key: 'gait',
        label: language === 'en' ? 'Gait' : 'הליכה',
        options: [
          { value: 0, label: language === 'en' ? 'Normal' : 'תקינה' },
          { value: 10, label: language === 'en' ? 'Weak' : 'חלשה' },
          { value: 20, label: language === 'en' ? 'Impaired' : 'לקויה' }
        ]
      },
      {
        key: 'mental_status',
        label: language === 'en' ? 'Mental Status' : 'מצב נפשי',
        options: [
          { value: 0, label: language === 'en' ? 'Oriented' : 'מכוון' },
          { value: 15, label: language === 'en' ? 'Overestimates ability' : 'מעריך יתר על המידה' }
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {morseItems.map((item) => (
              <div key={item.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item.label}
                </label>
                <div className="space-y-2">
                  {item.options.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name={item.key}
                        value={option.value}
                        checked={morseScores[item.key as keyof typeof morseScores] === option.value}
                        onChange={(e) => setMorseScores(prev => ({ 
                          ...prev, 
                          [item.key]: parseInt(e.target.value) 
                        }))}
                        className="mr-2"
                      />
                      <span className="text-sm">{option.label} ({option.value})</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${risk.bg} text-center`}>
              <div className="text-4xl font-bold text-gray-900 mb-2">{total}</div>
              <div className={`text-xl font-semibold ${risk.color} mb-4`}>{risk.level}</div>
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Fall Risk Score' : 'ציון סיכון נפילה'}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Risk Categories:' : 'קטגוריות סיכון:'}
              </h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Low Risk:' : 'סיכון נמוך:'}</span>
                  <span>0-24</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Moderate Risk:' : 'סיכון בינוני:'}</span>
                  <span>25-44</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'High Risk:' : 'סיכון גבוה:'}</span>
                  <span>≥45</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => saveAssessment('morse_fall', { total, ...morseScores, risk_category: risk.level })}
          disabled={saving}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="h-5 w-5" />
          {saving ? (language === 'en' ? 'Saving...' : 'שומר...') : (language === 'en' ? 'Save Assessment' : 'שמור הערכה')}
        </button>
      </div>
    );
  };

  const TUGAssessment = () => {
    const [tugTime, setTugTime] = useState<number>(0);
    const [notes, setNotes] = useState('');

    const getRiskLevel = (time: number) => {
      if (time >= 20) return { level: 'High Fall Risk', color: 'text-red-600', bg: 'bg-red-50' };
      if (time >= 12) return { level: 'Moderate Fall Risk', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      if (time >= 10) return { level: 'Low Fall Risk', color: 'text-green-600', bg: 'bg-green-50' };
      return { level: 'Normal', color: 'text-blue-600', bg: 'bg-blue-50' };
    };

    const risk = getRiskLevel(tugTime);

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">
            {language === 'en' ? 'TUG Test Instructions:' : 'הוראות מבחן TUG:'}
          </h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>{language === 'en' ? 'Patient sits in chair with armrests' : 'המטופל יושב בכיסא עם משענות זרועות'}</li>
            <li>{language === 'en' ? 'On "Go", patient stands up' : 'בפקודה "התחל", המטופל קם'}</li>
            <li>{language === 'en' ? 'Walks 3 meters (10 feet)' : 'הולך 3 מטר (10 רגל)'}</li>
            <li>{language === 'en' ? 'Turns around' : 'מסתובב'}</li>
            <li>{language === 'en' ? 'Walks back to chair' : 'הולך חזרה לכיסא'}</li>
            <li>{language === 'en' ? 'Sits down' : 'יושב'}</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Time (seconds)' : 'זמן (שניות)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={tugTime}
                onChange={(e) => setTugTime(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'en' ? 'Enter time in seconds' : 'הכנס זמן בשניות'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Notes' : 'הערות'}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'en' ? 'Observations, assistive devices used, etc.' : 'תצפיות, עזרים שנעשה בהם שימוש, וכו\''}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${risk.bg} text-center`}>
              <div className="text-4xl font-bold text-gray-900 mb-2">{tugTime}s</div>
              <div className={`text-lg font-semibold ${risk.color} mb-4`}>{risk.level}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Risk Categories:' : 'קטגוריות סיכון:'}
              </h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Normal:' : 'תקין:'}</span>
                  <span>&lt;10s</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Low Risk:' : 'סיכון נמוך:'}</span>
                  <span>10-11s</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Moderate Risk:' : 'סיכון בינוני:'}</span>
                  <span>12-19s</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'High Risk:' : 'סיכון גבוה:'}</span>
                  <span>≥20s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => saveAssessment('tug', { 
            time: tugTime, 
            risk_category: risk.level, 
            notes 
          })}
          disabled={saving || tugTime === 0}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="h-5 w-5" />
          {saving ? (language === 'en' ? 'Saving...' : 'שומר...') : (language === 'en' ? 'Save Assessment' : 'שמור הערכה')}
        </button>
      </div>
    );
  };

  const renderActiveAssessment = () => {
    switch (activeAssessment) {
      case 'mmse':
        return <MMSEAssessment />;
      case 'morse_fall':
        return <MorseFallAssessment />;
      case 'tug':
        return <TUGAssessment />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Assessment Tools' : 'כלי הערכה'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Interactive geriatric assessment instruments' : 'כלי הערכה גריאטרית אינטראקטיביים'}
        </p>
      </div>

      {!activeAssessment ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assessmentTypes.map((assessment) => (
            <div
              key={assessment.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveAssessment(assessment.id)}
            >
              <div className={`${assessment.color} rounded-lg p-3 inline-flex mb-4`}>
                <assessment.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{assessment.name}</h3>
              <p className="text-sm text-gray-600">{assessment.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {assessmentTypes.find(a => a.id === activeAssessment)?.name}
            </h2>
            <button
              onClick={() => setActiveAssessment(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          {renderActiveAssessment()}
        </div>
      )}
    </div>
  );
}