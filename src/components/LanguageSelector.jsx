// Language Selector Component
// Allows users to switch between supported languages

import React, { useState } from 'react';
import { useLanguage } from '../localization/LanguageProvider.jsx';

export const LanguageSelector = ({ compact = false }) => {
  const { currentLanguage, supportedLanguages, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (compact) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px'
          }}
        >
          <span>{supportedLanguages[currentLanguage].flag}</span>
          <span>{supportedLanguages[currentLanguage].nativeName}</span>
          <span style={{ fontSize: '12px' }}>▼</span>
        </button>

        {isOpen && (
          <>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999
              }}
              onClick={() => setIsOpen(false)}
            />
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '2px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '150px'
              }}
            >
              {Object.entries(supportedLanguages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => {
                    changeLanguage(code);
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: 'none',
                    backgroundColor: currentLanguage === code ? '#e7f3ff' : 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    borderBottom: '1px solid #eee'
                  }}
                  onMouseEnter={(e) => {
                    if (currentLanguage !== code) {
                      e.target.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentLanguage !== code) {
                      e.target.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{lang.flag}</span>
                  <div>
                    <div style={{ fontWeight: currentLanguage === code ? 'bold' : 'normal' }}>
                      {lang.nativeName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {lang.name}
                    </div>
                  </div>
                  {currentLanguage === code && (
                    <span style={{ marginLeft: 'auto', color: '#007bff' }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Full language selector for settings page
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>
        🌍 {t('settings.language', 'Language / اللغة / שפה / Язык')}
      </h3>
      <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
        {t('settings.languageDescription', 'Choose your preferred language for the medical platform')}
      </p>

      <div style={{ display: 'grid', gap: '10px' }}>
        {Object.entries(supportedLanguages).map(([code, lang]) => (
          <label
            key={code}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              border: `2px solid ${currentLanguage === code ? '#667eea' : '#e9ecef'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: currentLanguage === code ? '#f0f4ff' : '#f8f9fa',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (currentLanguage !== code) {
                e.target.style.borderColor = '#b3d4fc';
                e.target.style.backgroundColor = '#f8f9ff';
              }
            }}
            onMouseLeave={(e) => {
              if (currentLanguage !== code) {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.backgroundColor = '#f8f9fa';
              }
            }}
          >
            <input
              type="radio"
              name="language"
              value={code}
              checked={currentLanguage === code}
              onChange={() => changeLanguage(code)}
              style={{ 
                width: '18px', 
                height: '18px',
                accentColor: '#667eea'
              }}
            />
            <span style={{ fontSize: '24px' }}>{lang.flag}</span>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: currentLanguage === code ? 'bold' : 'normal',
                color: currentLanguage === code ? '#667eea' : '#333'
              }}>
                {lang.nativeName}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {lang.name} {lang.direction === 'rtl' && '(RTL)'}
              </div>
            </div>
            {currentLanguage === code && (
              <div style={{
                padding: '4px 8px',
                backgroundColor: '#667eea',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {t('settings.active', 'ACTIVE')}
              </div>
            )}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px', border: '1px solid #b3d4fc' }}>
        <strong style={{ color: '#0056b3' }}>💡 {t('settings.languageNote', 'Language Support:')}</strong>
        <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', fontSize: '14px', color: '#0056b3' }}>
          <li>{t('settings.englishNote', 'English: Full interface and medical terminology')}</li>
          <li>{t('settings.hebrewNote', 'Hebrew: Interface translation with medical terms')}</li>
          <li>{t('settings.arabicNote', 'Arabic: Complete medical terminology and RTL support')}</li>
          <li>{t('settings.russianNote', 'Russian: Interface translation for medical professionals')}</li>
        </ul>
      </div>

      {currentLanguage !== 'en' && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px', border: '1px solid #ffc107' }}>
          <strong style={{ color: '#856404' }}>⚠️ {t('settings.translationNote', 'Translation Note:')}</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#856404' }}>
            {t('settings.translationDisclaimer', 'Medical translations are provided for convenience. Always verify critical medical information with qualified professionals.')}
          </p>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;