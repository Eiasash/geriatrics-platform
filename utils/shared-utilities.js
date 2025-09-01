// Shared Utilities for Geriatrics Excellence Platform
// Provides consistent data structures and functions across all modules

class SharedUtilities {
    constructor() {
        this.version = '1.0.0';
        this.initializeStorage();
    }

    // Initialize localStorage with default structures
    initializeStorage() {
        const defaults = {
            geriatricPatients: [],
            researchSearchHistory: [],
            researchSavedSearches: [],
            protocolUsage: {},
            noteAnalyzerStats: { analyzed: 0 },
            quizStatistics: { completed: 0, correct: 0, total: 0 },
            savedPapers: [],
            userPreferences: {
                theme: 'light',
                language: 'en',
                notifications: true
            }
        };

        Object.keys(defaults).forEach(key => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify(defaults[key]));
            }
        });
    }

    // Patient data management
    savePatient(patient) {
        const patients = this.getPatients();
        patient.id = patient.id || Date.now();
        patient.lastModified = new Date().toISOString();
        
        const existingIndex = patients.findIndex(p => p.id === patient.id);
        if (existingIndex >= 0) {
            patients[existingIndex] = patient;
        } else {
            patients.push(patient);
        }
        
        localStorage.setItem('geriatricPatients', JSON.stringify(patients));
        this.syncAcrossModules('patientUpdate', patient);
    }

    getPatients() {
        return JSON.parse(localStorage.getItem('geriatricPatients') || '[]');
    }

    deletePatient(patientId) {
        const patients = this.getPatients().filter(p => p.id !== patientId);
        localStorage.setItem('geriatricPatients', JSON.stringify(patients));
        this.syncAcrossModules('patientDelete', patientId);
    }

    // Research and literature management
    saveResearchQuery(query, results = []) {
        const history = this.getSearchHistory();
        const searchEntry = {
            id: Date.now(),
            query: query,
            timestamp: new Date().toISOString(),
            resultCount: results.length,
            results: results.slice(0, 10) // Store first 10 results only
        };
        
        history.unshift(searchEntry);
        if (history.length > 50) history.pop();
        
        localStorage.setItem('researchSearchHistory', JSON.stringify(history));
    }

    getSearchHistory() {
        return JSON.parse(localStorage.getItem('researchSearchHistory') || '[]');
    }

    savePaper(paper) {
        const saved = this.getSavedPapers();
        if (!saved.find(p => p.id === paper.id)) {
            paper.savedAt = new Date().toISOString();
            saved.push(paper);
            localStorage.setItem('savedPapers', JSON.stringify(saved));
        }
    }

    getSavedPapers() {
        return JSON.parse(localStorage.getItem('savedPapers') || '[]');
    }

    // Protocol and clinical tools usage tracking
    trackProtocolUsage(protocolId) {
        const usage = JSON.parse(localStorage.getItem('protocolUsage') || '{}');
        usage[protocolId] = (usage[protocolId] || 0) + 1;
        usage[`${protocolId}_lastUsed`] = new Date().toISOString();
        localStorage.setItem('protocolUsage', JSON.stringify(usage));
    }

    getProtocolUsage() {
        return JSON.parse(localStorage.getItem('protocolUsage') || '{}');
    }

    // Note analyzer statistics
    updateNoteAnalyzerStats() {
        const stats = JSON.parse(localStorage.getItem('noteAnalyzerStats') || '{"analyzed": 0}');
        stats.analyzed = (stats.analyzed || 0) + 1;
        stats.lastUsed = new Date().toISOString();
        localStorage.setItem('noteAnalyzerStats', JSON.stringify(stats));
    }

    getNoteAnalyzerStats() {
        return JSON.parse(localStorage.getItem('noteAnalyzerStats') || '{"analyzed": 0}');
    }

    // Quiz and education tracking
    updateQuizStats(correct, total) {
        const stats = JSON.parse(localStorage.getItem('quizStatistics') || '{"completed": 0, "correct": 0, "total": 0}');
        stats.completed = (stats.completed || 0) + 1;
        stats.correct = (stats.correct || 0) + correct;
        stats.total = (stats.total || 0) + total;
        stats.lastQuiz = new Date().toISOString();
        localStorage.setItem('quizStatistics', JSON.stringify(stats));
    }

    getQuizStats() {
        return JSON.parse(localStorage.getItem('quizStatistics') || '{"completed": 0, "correct": 0, "total": 0}');
    }

    // Cross-module synchronization
    syncAcrossModules(eventType, data) {
        // Dispatch custom event for cross-module communication
        window.dispatchEvent(new CustomEvent('platformSync', {
            detail: { type: eventType, data: data, timestamp: new Date().toISOString() }
        }));
    }

    // User preferences
    setPreference(key, value) {
        const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        prefs[key] = value;
        localStorage.setItem('userPreferences', JSON.stringify(prefs));
        this.syncAcrossModules('preferenceUpdate', { key, value });
    }

    getPreference(key, defaultValue = null) {
        const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        return prefs[key] || defaultValue;
    }

    // Data export utilities
    exportAllData() {
        const allData = {
            version: this.version,
            exportDate: new Date().toISOString(),
            patients: this.getPatients(),
            searchHistory: this.getSearchHistory(),
            savedPapers: this.getSavedPapers(),
            protocolUsage: this.getProtocolUsage(),
            noteAnalyzerStats: this.getNoteAnalyzerStats(),
            quizStats: this.getQuizStats(),
            preferences: JSON.parse(localStorage.getItem('userPreferences') || '{}')
        };

        return JSON.stringify(allData, null, 2);
    }

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            // Validate data structure
            if (!data.version || !data.exportDate) {
                throw new Error('Invalid data format');
            }

            // Import each data type
            if (data.patients) localStorage.setItem('geriatricPatients', JSON.stringify(data.patients));
            if (data.searchHistory) localStorage.setItem('researchSearchHistory', JSON.stringify(data.searchHistory));
            if (data.savedPapers) localStorage.setItem('savedPapers', JSON.stringify(data.savedPapers));
            if (data.protocolUsage) localStorage.setItem('protocolUsage', JSON.stringify(data.protocolUsage));
            if (data.noteAnalyzerStats) localStorage.setItem('noteAnalyzerStats', JSON.stringify(data.noteAnalyzerStats));
            if (data.quizStats) localStorage.setItem('quizStatistics', JSON.stringify(data.quizStats));
            if (data.preferences) localStorage.setItem('userPreferences', JSON.stringify(data.preferences));

            this.syncAcrossModules('dataImported', { timestamp: data.exportDate });
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }

    // Platform statistics
    getPlatformStats() {
        return {
            totalPatients: this.getPatients().length,
            totalSearches: this.getSearchHistory().length,
            savedPapers: this.getSavedPapers().length,
            notesAnalyzed: this.getNoteAnalyzerStats().analyzed || 0,
            quizzesCompleted: this.getQuizStats().completed || 0,
            lastActivity: this.getLastActivity()
        };
    }

    getLastActivity() {
        const stats = [
            this.getNoteAnalyzerStats().lastUsed,
            this.getQuizStats().lastQuiz,
            this.getSearchHistory()[0]?.timestamp
        ].filter(Boolean);

        return stats.length > 0 ? Math.max(...stats.map(d => new Date(d).getTime())) : null;
    }

    // Utility functions
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Medical calculation utilities
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    calculateBMI(weight, height) {
        // weight in kg, height in cm
        const heightInM = height / 100;
        return Math.round((weight / (heightInM * heightInM)) * 10) / 10;
    }

    calculateCrCl(age, weight, creatinine, isFemale = false) {
        // Cockcroft-Gault formula
        let crCl = ((140 - age) * weight) / (72 * creatinine);
        if (isFemale) crCl *= 0.85;
        return Math.round(crCl);
    }

    // Text processing utilities
    extractMedications(text) {
        // Simple medication extraction pattern
        const medPatterns = [
            /(\w+)\s+\d+\s*mg/gi,
            /(\w+)\s+\d+\.\d+\s*mg/gi,
            /(\w+)\s+\d+\s*mcg/gi,
            /(\w+)\s+\d+\s*units?/gi
        ];
        
        const medications = new Set();
        medPatterns.forEach(pattern => {
            const matches = text.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    const medName = match.split(/\s+/)[0].toLowerCase();
                    medications.add(medName);
                });
            }
        });
        
        return Array.from(medications);
    }

    // Israeli healthcare system utilities
    israeliMedicalTerms = {
        'קופת חולים': 'Health Maintenance Organization',
        'מכבי': 'Maccabi Healthcare',
        'כללית': 'Clalit Health Services',
        'לאומית': 'Leumit Health Services',
        'מאוחדת': 'Meuhedet Health Services',
        'בית חולים': 'Hospital',
        'מרפאה': 'Clinic',
        'רופא': 'Doctor',
        'אחות': 'Nurse',
        'תרופה': 'Medication',
        'מרשם': 'Prescription'
    };

    translateHebrewTerm(hebrewTerm) {
        return this.israeliMedicalTerms[hebrewTerm] || hebrewTerm;
    }

    // Error handling and logging
    logError(error, context = '') {
        const errorLog = {
            timestamp: new Date().toISOString(),
            error: error.message || error,
            context: context,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.error('Platform Error:', errorLog);
        
        // Store in localStorage for debugging (keep last 10 errors)
        const errors = JSON.parse(localStorage.getItem('errorLog') || '[]');
        errors.unshift(errorLog);
        if (errors.length > 10) errors.pop();
        localStorage.setItem('errorLog', JSON.stringify(errors));
    }

    getErrorLog() {
        return JSON.parse(localStorage.getItem('errorLog') || '[]');
    }

    // Performance monitoring
    startTimer(label) {
        performance.mark(`${label}-start`);
    }

    endTimer(label) {
        performance.mark(`${label}-end`);
        performance.measure(label, `${label}-start`, `${label}-end`);
        const measure = performance.getEntriesByName(label)[0];
        return Math.round(measure.duration);
    }
}

// Initialize global shared utilities instance
if (typeof window !== 'undefined') {
    window.sharedUtils = new SharedUtilities();
    
    // Set up global error handler
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        window.sharedUtils.logError(error || msg, `${url}:${lineNo}:${columnNo}`);
        return false;
    };
    
    // Set up unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        window.sharedUtils.logError(event.reason, 'Unhandled Promise Rejection');
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SharedUtilities;
}