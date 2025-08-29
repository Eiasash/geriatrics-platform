// Language Provider for multi-language support
// Supports English, Hebrew, Arabic, and Russian for Israeli healthcare context

import React, { createContext, useContext, useState, useEffect } from 'react';
import arabicTranslations from './arabicTranslations.js';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  // Supported languages
  const supportedLanguages = {
    en: {
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      flag: '🇺🇸'
    },
    he: {
      name: 'Hebrew',
      nativeName: 'עברית',
      direction: 'rtl',
      flag: '🇮🇱'
    },
    ar: {
      name: 'Arabic',
      nativeName: 'العربية',
      direction: 'rtl',
      flag: '🇸🇦'
    },
    ru: {
      name: 'Russian',
      nativeName: 'Русский',
      direction: 'ltr',
      flag: '🇷🇺'
    }
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && supportedLanguages[savedLanguage]) {
      changeLanguage(savedLanguage);
    }
  }, []);

  // Change language and update direction
  const changeLanguage = (languageCode) => {
    if (supportedLanguages[languageCode]) {
      setCurrentLanguage(languageCode);
      setDirection(supportedLanguages[languageCode].direction);
      localStorage.setItem('preferredLanguage', languageCode);
      
      // Update document direction
      document.documentElement.dir = supportedLanguages[languageCode].direction;
      document.documentElement.lang = languageCode;
    }
  };

  // Translation function
  const t = (key, fallback = key) => {
    if (currentLanguage === 'en') {
      return fallback;
    }

    // Get translation based on current language
    let translations = {};
    
    switch (currentLanguage) {
      case 'ar':
        translations = arabicTranslations;
        break;
      case 'he':
        translations = hebrewTranslations;
        break;
      case 'ru':
        translations = russianTranslations;
        break;
      default:
        return fallback;
    }

    // Navigate nested translation keys (e.g., 'navigation.dashboard')
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return fallback;
      }
    }
    
    return typeof result === 'string' ? result : fallback;
  };

  // Format numbers based on language
  const formatNumber = (number) => {
    if (currentLanguage === 'ar') {
      return arabicTranslations.convertToArabicNumbers(number.toString());
    }
    return number.toString();
  };

  // Get RTL styles when needed
  const getRTLStyles = (baseStyles = {}) => {
    if (direction === 'rtl') {
      return {
        ...baseStyles,
        direction: 'rtl',
        textAlign: 'right'
      };
    }
    return baseStyles;
  };

  const contextValue = {
    currentLanguage,
    direction,
    supportedLanguages,
    changeLanguage,
    t,
    formatNumber,
    getRTLStyles,
    isRTL: direction === 'rtl'
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hebrew translations (basic set)
const hebrewTranslations = {
  navigation: {
    dashboard: 'לוח בקרה',
    quiz: 'בחנים',
    flashcards: 'כרטיסי לימוד',
    aiAssistant: 'עוזר חכם',
    medications: 'תרופות',
    protocols: 'פרוטוקולים',
    calculators: 'מחשבונים רפואיים',
    emergency: 'חירום',
    articles: 'מאמרים',
    resources: 'משאבים',
    patients: 'חולים',
    onCall: 'כונן'
  },
  medical: {
    patient: 'חולה',
    patients: 'חולים',
    diagnosis: 'אבחנה',
    treatment: 'טיפול',
    medication: 'תרופה',
    medications: 'תרופות',
    symptoms: 'תסמינים',
    examination: 'בדיקה',
    history: 'היסטוריה רפואית',
    assessment: 'הערכה',
    plan: 'תכנית טיפול',
    followUp: 'מעקב',
    consultation: 'התייעצות',
    referral: 'הפניה'
  }
};

// Russian translations (basic set)
const russianTranslations = {
  navigation: {
    dashboard: 'Панель управления',
    quiz: 'Тесты',
    flashcards: 'Карточки',
    aiAssistant: 'ИИ Помощник',
    medications: 'Лекарства',
    protocols: 'Протоколы',
    calculators: 'Калькуляторы',
    emergency: 'Экстренная помощь',
    articles: 'Статьи',
    resources: 'Ресурсы',
    patients: 'Пациенты',
    onCall: 'Дежурство'
  },
  medical: {
    patient: 'пациент',
    patients: 'пациенты',
    diagnosis: 'диагноз',
    treatment: 'лечение',
    medication: 'лекарство',
    medications: 'лекарства',
    symptoms: 'симптомы',
    examination: 'обследование',
    history: 'история болезни',
    assessment: 'оценка',
    plan: 'план лечения',
    followUp: 'наблюдение',
    consultation: 'консультация',
    referral: 'направление'
  }
};

export default LanguageProvider;