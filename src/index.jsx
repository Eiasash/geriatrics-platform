import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import fixes for AI Assistant and Quiz System
import ClinicalAI from './utils/aiAssistantFix.js';
import { expandedQuizDatabase, EnhancedQuizSystem } from './data/expandedQuizDatabase.js';

// Make fixes available globally
window.ClinicalAI = ClinicalAI;
window.clinicalAI = new ClinicalAI();
window.expandedQuizDatabase = expandedQuizDatabase;
window.EnhancedQuizSystem = EnhancedQuizSystem;
window.quizSystem = new EnhancedQuizSystem();

// Initialize expanded quiz database in localStorage
try {
    const allQuestions = [];
    let categoryCount = {};
    
    for (const [category, questions] of Object.entries(expandedQuizDatabase)) {
        categoryCount[category] = questions.length;
        questions.forEach(q => {
            allQuestions.push({
                ...q,
                category: category,
                id: q.id || `${category}_${Math.random().toString(36).substr(2, 9)}`
            });
        });
    }
    
    // Store in localStorage for compatibility
    localStorage.setItem('quizQuestions', JSON.stringify(allQuestions));
    localStorage.setItem('quizCategories', JSON.stringify(Object.keys(expandedQuizDatabase)));
    localStorage.setItem('quizStats', JSON.stringify(categoryCount));
    
    console.log('✅ Expanded Quiz Database loaded:', Object.keys(categoryCount).length, 'categories,', allQuestions.length, 'total questions');
} catch (error) {
    console.error('❌ Error loading quiz database:', error);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);