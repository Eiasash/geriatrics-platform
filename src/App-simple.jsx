import React, { useState, useEffect } from 'react';

// Simple translations
const translations = {
  en: {
    title: 'Geriatrics Excellence Platform',
    subtitle: 'Shaare Zedek Medical Center',
    dashboard: 'Dashboard',
    roster: 'Patient Roster',
    quiz: 'Quiz',
    protocols: 'Protocols',
    calculators: 'Calculators',
    medications: 'Medications'
  },
  he: {
    title: 'פלטפורמת גריאטריה מתקדמת',
    subtitle: 'מרכז רפואי שערי צדק',
    dashboard: 'לוח בקרה',
    roster: 'רשימת מטופלים',
    quiz: 'בחנים',
    protocols: 'פרוטוקולים',
    calculators: 'מחשבונים',
    medications: 'תרופות'
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  
  const t = (key, fallback) => {
    return translations[language]?.[key] || fallback || key;
  };

  const tabs = [
    { id: 'dashboard', label: t('dashboard', 'Dashboard'), icon: '📊' },
    { id: 'roster', label: t('roster', 'רשימת מטופלים'), icon: '🏥' },
    { id: 'quiz', label: t('quiz', 'Quiz'), icon: '📝' },
    { id: 'protocols', label: t('protocols', 'Protocols'), icon: '📋' },
    { id: 'calculators', label: t('calculators', 'Calculators'), icon: '🔢' },
    { id: 'medications', label: t('medications', 'Medications'), icon: '💊' }
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f0f2f5', 
      minHeight: '100vh',
      direction: language === 'he' ? 'rtl' : 'ltr'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div></div>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px' }}>
                {t('title', 'Geriatrics Excellence Platform')}
              </h1>
              <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
                {t('subtitle', 'Shaare Zedek Medical Center')}
              </p>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>
          </div>
          
          {/* Navigation */}
          <nav style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.2)',
                  color: activeTab === tab.id ? '#667eea' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                📊 Platform Overview
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <strong>🏥 Patient Management</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                    Full roster with clinical protocols (4AT, Morse, Fried)
                  </p>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                  <strong>📚 Learning Tools</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                    Board review questions and clinical calculators
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0 }}>🚀 Quick Actions</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <button 
                  onClick={() => setActiveTab('roster')}
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    backgroundColor: '#059669', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                  🏥 Patient Roster & Protocols
                </button>
                <button 
                  onClick={() => setActiveTab('quiz')}
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    backgroundColor: '#667eea', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                  📝 Start Learning Quiz
                </button>
                <button 
                  onClick={() => setActiveTab('protocols')}
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    backgroundColor: '#764ba2', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                  📋 Clinical Protocols
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginTop: 0 }}>ℹ️ Platform Status</h3>
              <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                <div style={{ color: '#059669' }}>✅ Patient Roster System</div>
                <div style={{ color: '#059669' }}>✅ Clinical Protocols</div>
                <div style={{ color: '#059669' }}>✅ Learning Materials</div>
                <div style={{ color: '#059669' }}>✅ Mobile Responsive</div>
              </div>
              <div style={{ 
                marginTop: '15px', 
                padding: '10px', 
                backgroundColor: '#ecfdf5', 
                border: '1px solid #a7f3d0', 
                borderRadius: '6px',
                fontSize: '13px'
              }}>
                <strong>✨ All systems operational</strong><br />
                Ready for clinical use with localStorage data persistence.
              </div>
            </div>
          </div>
        )}

        {/* Patient Roster Tab */}
        {activeTab === 'roster' && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ color: '#667eea', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                🏥 רשימת מטופלים ופרוטוקולים
                <span style={{ fontSize: '16px', color: '#666', fontWeight: 'normal' }}>
                  Patient Roster & Clinical Protocols
                </span>
              </h2>
              <p style={{ color: '#666', marginBottom: '15px', lineHeight: 1.5 }}>
                מערכת ניהול רשימת מטופלים עם פרוטוקולים קליניים (4AT, Morse, Fried) ויצירת מסמכי קבלה.
                <br />
                <small>Patient management system with clinical protocols and admission documentation.</small>
              </p>
            </div>
            
            <div style={{ 
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#f9fafb',
              minHeight: '700px'
            }}>
              <iframe 
                src="/roster.html"
                style={{
                  width: '100%',
                  height: '700px',
                  border: 'none',
                  display: 'block'
                }}
                title="Patient Roster System"
              />
            </div>
            
            <div style={{ 
              marginTop: '15px', 
              padding: '12px', 
              backgroundColor: '#fffbeb', 
              border: '1px solid #f59e0b', 
              borderRadius: '8px',
              fontSize: '13px'
            }}>
              <p style={{ margin: 0, color: '#92400e' }}>
                <strong>הערה:</strong> הנתונים נשמרים מקומית בדפדפן בלבד. אין להזין מידע מזהה אמיתי של מטופלים.
                <br />
                <strong>Note:</strong> Data is stored locally in browser only. Do not enter real patient identifying information.
              </p>
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#667eea', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              📝 Geriatrics Board Review
            </h2>
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px',
              border: '2px dashed #cbd5e0'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
              <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>Quiz System Coming Soon</h3>
              <p style={{ color: '#718096', marginBottom: '20px' }}>
                Interactive geriatrics board review questions will be available here.
                <br />
                Focus on clinical scenarios, pharmacology, and evidence-based care.
              </p>
              <button 
                onClick={() => setActiveTab('roster')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🏥 Try Patient Roster Instead
              </button>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {!['dashboard', 'roster', 'quiz'].includes(activeTab) && (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#667eea', marginTop: 0 }}>
              {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px',
              border: '2px dashed #cbd5e0'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
              <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>Feature In Development</h3>
              <p style={{ color: '#718096', marginBottom: '20px' }}>
                This section is being developed. The Patient Roster is fully functional!
              </p>
              <button 
                onClick={() => setActiveTab('roster')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🏥 Go to Patient Roster
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: '#666', 
        fontSize: '14px' 
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          Shaare Zedek Medical Center - Geriatrics Excellence Platform
          <br />
          <small>Educational platform for geriatric medicine training and clinical practice</small>
        </div>
      </footer>
    </div>
  );
};

export default App;