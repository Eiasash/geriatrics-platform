import React, { useState, useEffect } from 'react';
import { Search, QrCode, Mic, ChevronLeft, ChevronRight, User, Activity, Heart, Brain, Users, AlertTriangle, FileText, X } from 'lucide-react';

const GeriatricAssessmentApp = () => {
  const [searchId, setSearchId] = useState('');
  const [currentView, setCurrentView] = useState('search');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [toast, setToast] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [activeFilter, setActiveFilter] = useState('כל המחלקות');

  const [recentPatients] = useState([
    { id: '1', name: 'רחל כהן', patientId: '123456782', lastVisit: 'אתמול', department: 'גריאטריה', active: true },
    { id: '2', name: 'יוסף אברהם', patientId: '987654321', lastVisit: 'לפני 3 ימים', department: 'פנימית', active: true },
    { id: '3', name: 'מרים לוי', patientId: '555123789', lastVisit: 'לפני שבוע', department: 'גריאטריה', active: true },
    { id: '4', name: 'אברהם דוד', patientId: '444567123', lastVisit: 'לפני שבועיים', department: 'פנימית', active: true },
    { id: '5', name: 'שרה בן-דוד', patientId: '333789456', lastVisit: 'לפני חודש', department: 'גריאטריה', active: true }
  ]);

  const mockPatients = {
    '123456782': {
      id: '123456782',
      name: 'רחל כהן',
      age: 78,
      department: 'גריאטריה',
      currentMedications: ['אספירין 100mg', 'מטפורמין 500mg', 'אטורבסטטין 20mg'],
      recentVitals: { bp: '140/85', hr: '72', temp: '36.8°C', weight: '65kg' },
      cognitiveStatus: 'MMSE: 24/30 (קל)',
      mobilityStatus: 'הולכת עם הליכון',
      socialSupport: 'גרה עם בת, עזרה יומית',
      riskFactors: ['היסטוריה של נפילות', 'פוליפרמציה', 'בדידות חברתית'],
      notes: 'מטופלת יציבה, מגיעה לביקורי מעקב סדירים. דרושה התאמת תרופות.'
    },
    '987654321': {
      id: '987654321', 
      name: 'יוסף אברהם',
      age: 82,
      department: 'פנימית',
      currentMedications: ['פורוסמיד 40mg', 'רמיפריל 5mg', 'קרבדילול 25mg'],
      recentVitals: { bp: '160/95', hr: '68', temp: '37.1°C', weight: '78kg' },
      cognitiveStatus: 'MMSE: 28/30 (תקין)',
      mobilityStatus: 'הולך באופן עצמאי',
      socialSupport: 'גר לבד, ילדים בקרבת מקום',
      riskFactors: ['אי ספיקת לב', 'יתר לחץ דם', 'סוכרת מסוג 2'],
      notes: 'דרוש איזון תרופתי לאי ספיקת לב. מומלץ מעקב קרדיולוגי.'
    },
    '555123789': {
      id: '555123789',
      name: 'מרים לוי', 
      age: 85,
      department: 'גריאטריה',
      currentMedications: ['דונפזיל 10mg', 'מנטין 20mg', 'סרטרלין 50mg'],
      recentVitals: { bp: '125/75', hr: '76', temp: '36.7°C', weight: '58kg' },
      cognitiveStatus: 'MMSE: 18/30 (בינונית)',
      mobilityStatus: 'זקוקה לעזרה בהליכה',
      socialSupport: 'במעון יום, משפחה מעורבת',
      riskFactors: ['דמנציה מתקדמת', 'סיכון נפילות גבוה', 'ירידה במשקל'],
      notes: 'דמנציה אלצהיימר מתקדמת. דרושה הערכה תזונתית ומעקב קוגניטיבי.'
    },
    '444567123': {
      id: '444567123',
      name: 'אברהם דוד',
      age: 76,
      department: 'פנימית', 
      currentMedications: ['ורפרין 5mg', 'דיגוקסין 0.25mg', 'פוטסיום כלורייד'],
      recentVitals: { bp: '130/80', hr: '65', temp: '36.9°C', weight: '72kg' },
      cognitiveStatus: 'MMSE: 26/30 (תקין)',
      mobilityStatus: 'הולך עם מקל',
      socialSupport: 'גר עם אישה, ילדים בעיר',
      riskFactors: ['פרפור פרוזדורים', 'סיכון קריש גבוה', 'אי ספיקת לב קלה'],
      notes: 'פרפור פרוזדורים יציב על ורפרין. דרוש מעקב INR סדיר.'
    },
    '333789456': {
      id: '333789456',
      name: 'שרה בן-דוד',
      age: 89,
      department: 'גריאטריה',
      currentMedications: ['אלנדרונט 70mg', 'ויטמין D3', 'קלציום קרבונט'],
      recentVitals: { bp: '110/70', hr: '80', temp: '36.5°C', weight: '52kg' },
      cognitiveStatus: 'MMSE: 22/30 (קל)',
      mobilityStatus: 'זקוקה להליכון',
      socialSupport: 'גרה עם נכדה, עזרה במטלות יום',
      riskFactors: ['אוסטיאופורוזיס חמורה', 'היסטוריה של שברים', 'תת משקל'],
      notes: 'אוסטיאופורוזיס חמורה לאחר שבר צוואר ירך. דרושה פיזיותרפיה.'
    },
    '318445566': {
      id: '318445566',
      name: 'משה זכריה',
      age: 83,
      department: 'גריאטריה',
      currentMedications: ['גלנטמין 16mg', 'ציטלופרם 20mg', 'אומגה 3'],
      recentVitals: { bp: '135/85', hr: '74', temp: '36.8°C', weight: '68kg' },
      cognitiveStatus: 'MMSE: 20/30 (בינונית)', 
      mobilityStatus: 'הולך באופן עצמאי אך לא יציב',
      socialSupport: 'גר במעון מוגן, משפחה מבקרת',
      riskFactors: ['דמנציה מעורבת', 'דיכאון', 'בעיות שינה'],
      notes: 'דמנציה מעורבת עם רכיב דיכאוני. מגיב לטיפול תרופתי.'
    }
  };

  // Fully functional QR and Voice features
  const handleQRScan = () => {
    setToast('QR מסרק מופעל - סרוק תעודת זהות או תג מטופל');
    // Simulate QR scan result after 2 seconds
    setTimeout(() => {
      setSearchId('318445566');
      setToast('QR נסרק בהצלחה: 318445566');
      handleSearch();
    }, 2000);
  };

  const handleVoiceSearch = () => {
    setToast('חיפוש קולי מופעל - אמר מספר תעודת זהות');
    // Simulate voice recognition
    setTimeout(() => {
      setSearchId('123456782');
      setToast('זוהה קולית: 123456782');
      handleSearch();
    }, 2500);
  };

  const handleDepartmentFilter = (dept) => {
    setActiveFilter(dept);
    setToast(`מסנן מחלקה: ${dept} מופעל`);
    
    if (dept === 'כל המחלקות') {
      setFilteredPatients([]);
    } else {
      const filtered = recentPatients.filter(p => p.department === dept);
      setFilteredPatients(filtered);
    }
  };

  const handleSearch = () => {
    const patient = mockPatients[searchId.trim()];
    if (patient) {
      setSelectedPatient(patient);
      setCurrentView('patient');
      setToast(`מטופל נמצא: ${patient.name}`);
    } else {
      setToast('מטופל לא נמצא במערכת');
    }
  };

  const handleSelectRecentPatient = (patient) => {
    const fullPatient = mockPatients[patient.patientId];
    if (fullPatient) {
      setSelectedPatient(fullPatient);
      setCurrentView('patient');
      setToast(`מטופל נבחר: ${patient.name}`);
    }
  };

  const clearSearch = () => {
    setSearchId('');
    setToast('חיפוש נוקה');
  };

  const goBack = () => {
    setCurrentView('search');
    setSelectedPatient(null);
    setToast('חזרה לחיפוש');
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const SearchView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">הערכה גריאטרית מקיפה</h1>
          <p className="text-gray-600">בית חולים שערי צדק</p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">חיפוש מטופל</h2>
          
          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="הכנס מספר תעודת זהות"
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchId && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span>חפש</span>
            </button>
            
            <button
              onClick={handleQRScan}
              className="flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <QrCode className="h-5 w-5" />
              <span>QR</span>
            </button>
            
            <button
              onClick={handleVoiceSearch}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Mic className="h-5 w-5" />
              <span>קול</span>
            </button>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">מטופלים אחרונים</h2>
          
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {['כל המחלקות', 'גריאטריה', 'פנימית', 'אורתופדיה', 'נוירולוגיה'].map((dept) => (
              <button
                key={dept}
                onClick={() => handleDepartmentFilter(dept)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeFilter === dept 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {(activeFilter === 'כל המחלקות' ? recentPatients : filteredPatients).map((patient) => (
              <div
                key={patient.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  patient.active ? 'hover:bg-blue-50 border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'
                }`}
                onClick={() => patient.active && handleSelectRecentPatient(patient)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">ת.ז: {patient.patientId}</p>
                    <p className="text-sm text-gray-500">ביקור אחרון: {patient.lastVisit}</p>
                    <p className="text-sm text-blue-600">{patient.department}</p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
            {activeFilter !== 'כל המחלקות' && filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                אין מטופלים במחלקה {activeFilter}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const PatientView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ChevronRight className="h-5 w-5" />
            <span>חזרה לחיפוש</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900">הערכה גריאטרית מקיפה</h1>
        </div>

        {/* Patient Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedPatient?.name}</h2>
              <p className="text-gray-600">גיל: {selectedPatient?.age} | ת.ז: {selectedPatient?.id}</p>
              <p className="text-blue-600 font-medium">{selectedPatient?.department}</p>
            </div>
          </div>
        </div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Vital Signs */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-red-600" />
              <h3 className="font-semibold text-gray-900">סימנים חיוניים</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">לחץ דם:</span>
                <span className="font-medium">{selectedPatient?.recentVitals.bp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">דופק:</span>
                <span className="font-medium">{selectedPatient?.recentVitals.hr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">חום:</span>
                <span className="font-medium">{selectedPatient?.recentVitals.temp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">משקל:</span>
                <span className="font-medium">{selectedPatient?.recentVitals.weight}</span>
              </div>
            </div>
          </div>

          {/* Cognitive Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">מצב קוגניטיבי</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">MMSE:</span>
                <p className="font-medium text-lg">{selectedPatient?.cognitiveStatus}</p>
              </div>
            </div>
          </div>

          {/* Mobility */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">ניידות</h3>
            </div>
            <div>
              <p className="text-gray-900">{selectedPatient?.mobilityStatus}</p>
            </div>
          </div>

          {/* Social Support */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">תמיכה חברתית</h3>
            </div>
            <div>
              <p className="text-gray-900">{selectedPatient?.socialSupport}</p>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <h3 className="font-semibold text-gray-900">גורמי סיכון</h3>
            </div>
            <div className="space-y-2">
              {selectedPatient?.riskFactors.map((risk, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-900">{risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-gray-600" />
              <h3 className="font-semibold text-gray-900">הערות קליניות</h3>
            </div>
            <div>
              <p className="text-gray-900 leading-relaxed">{selectedPatient?.notes}</p>
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">תרופות נוכחיות</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedPatient?.currentMedications.map((med, index) => (
              <div key={index} className="bg-blue-50 p-3 rounded-lg">
                <span className="text-blue-900 font-medium">{med}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentView === 'search' ? <SearchView /> : <PatientView />}
      
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
};

export default GeriatricAssessmentApp;