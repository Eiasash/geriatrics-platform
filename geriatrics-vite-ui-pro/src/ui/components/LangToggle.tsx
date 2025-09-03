import React from 'react';

interface LangToggleProps {
  language: 'en' | 'he';
  onToggle: (lang: 'en' | 'he') => void;
}

export default function LangToggle({ language, onToggle }: LangToggleProps) {
  return (
    <button
      onClick={() => onToggle(language === 'en' ? 'he' : 'en')}
      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <span className="mr-2">🌐</span>
      {language === 'en' ? 'EN' : 'עב'}
    </button>
  );
}