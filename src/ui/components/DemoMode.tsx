import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RefreshCw, Monitor, Eye, Info } from 'lucide-react';
import { auditLogger } from '../../services/auditLog';

interface DemoModeProps {
  onNavigate: (path: string) => void;
  language: 'en' | 'he';
}

interface DemoStep {
  id: string;
  title: string;
  description: string;
  path: string;
  action?: () => void;
  duration: number;
  highlight?: string;
}

export default function DemoMode({ onNavigate, language }: DemoModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [progress, setProgress] = useState(0);

  const demoSteps: DemoStep[] = [
    {
      id: 'intro',
      title: language === 'en' ? 'Welcome to Geriatrics Platform Pro' : 'ברוכים הבאים לפלטפורמת גריאטריה פרו',
      description: language === 'en' 
        ? 'A comprehensive solution for geriatric care management with real-time analytics and clinical tools'
        : 'פתרון מקיף לניהול טיפול גריאטרי עם ניתוחים בזמן אמת וכלים קליניים',
      path: '/',
      duration: 5000
    },
    {
      id: 'dashboard',
      title: language === 'en' ? 'Patient Dashboard' : 'לוח בקרת מטופלים',
      description: language === 'en'
        ? 'Real-time view of patient roster with MMSE trends and priority tasks'
        : 'תצוגה בזמן אמת של רשימת מטופלים עם מגמות MMSE ומשימות עדיפות',
      path: '/',
      duration: 7000,
      action: () => {
        // Simulate activity
        auditLogger.logDataAccess('demo', 'Demo User', 'Patient Roster');
      }
    },
    {
      id: 'analytics',
      title: language === 'en' ? 'Analytics Dashboard' : 'לוח ניתוחים',
      description: language === 'en'
        ? 'KPIs and metrics for data-driven decision making. Track admissions, fall risk, and medication burden'
        : 'מדדי KPI ומטריקות לקבלת החלטות מבוססת נתונים',
      path: '/analytics',
      duration: 8000,
      highlight: 'kpi-cards'
    },
    {
      id: 'calculators',
      title: language === 'en' ? 'Clinical Calculators' : 'מחשבונים קליניים',
      description: language === 'en'
        ? 'Evidence-based assessment tools including FRAIL, CHA2DS2-VASc, and Morse Fall Scale'
        : 'כלי הערכה מבוססי ראיות כולל FRAIL, CHA2DS2-VASc, וסולם נפילות Morse',
      path: '/calculators',
      duration: 6000,
      action: () => {
        auditLogger.logClinicalAction('demo', 'Demo User', 'CALCULATOR_USE', 'demo-patient');
      }
    },
    {
      id: 'medications',
      title: language === 'en' ? 'Medication Database' : 'מאגר תרופות',
      description: language === 'en'
        ? 'Comprehensive Hebrew/English medication reference with Beers Criteria warnings'
        : 'מאגר תרופות מקיף בעברית/אנגלית עם אזהרות Beers Criteria',
      path: '/medications',
      duration: 7000,
      highlight: 'beers-warning'
    },
    {
      id: 'handoff',
      title: language === 'en' ? 'Shift Handoff System' : 'מערכת העברת משמרת',
      description: language === 'en'
        ? 'Streamlined nursing shift changes with critical patient alerts and printable reports'
        : 'העברות משמרת יעילות עם התראות מטופלים קריטיים ודוחות להדפסה',
      path: '/handoff',
      duration: 8000,
      action: () => {
        // Generate sample handoff
        const mockHandoff = {
          criticalPatients: 3,
          fallRisk: 5,
          medicationChanges: 2
        };
        console.log('Demo Handoff:', mockHandoff);
      }
    },
    {
      id: 'audit',
      title: language === 'en' ? 'Audit & Compliance' : 'ביקורת וציות',
      description: language === 'en'
        ? 'Complete audit trail for regulatory compliance and security monitoring'
        : 'מעקב ביקורת מלא לציות רגולטורי וניטור אבטחה',
      path: '/audit',
      duration: 6000
    },
    {
      id: 'pwa',
      title: language === 'en' ? 'Mobile & Offline Ready' : 'מוכן למובייל ועבודה לא מקוונת',
      description: language === 'en'
        ? 'Install as a mobile app and work offline. All data syncs when connection returns'
        : 'התקן כאפליקציית מובייל ועבוד במצב לא מקוון. כל הנתונים מסתנכרנים בחזרה לאינטרנט',
      path: '/',
      duration: 5000,
      highlight: 'pwa-install'
    },
    {
      id: 'conclusion',
      title: language === 'en' ? 'Thank You' : 'תודה',
      description: language === 'en'
        ? 'Geriatrics Platform Pro - Improving patient care through technology'
        : 'פלטפורמת גריאטריה פרו - שיפור הטיפול במטופלים באמצעות טכנולוגיה',
      path: '/',
      duration: 5000
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && currentStep < demoSteps.length) {
      const step = demoSteps[currentStep];
      
      // Navigate to the step's path
      onNavigate(step.path);
      
      // Execute any custom action
      if (step.action) {
        step.action();
      }
      
      // Progress animation
      const interval = 100;
      let elapsed = 0;
      
      timer = setInterval(() => {
        elapsed += interval;
        setProgress((elapsed / step.duration) * 100);
        
        if (elapsed >= step.duration) {
          clearInterval(timer);
          if (currentStep < demoSteps.length - 1) {
            setCurrentStep(currentStep + 1);
            setProgress(0);
          } else {
            setIsPlaying(false);
            setCurrentStep(0);
            setProgress(0);
          }
        }
      }, interval);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentStep, demoSteps, onNavigate]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentStep === demoSteps.length - 1) {
      setCurrentStep(0);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  if (!showOverlay) {
    return (
      <button
        onClick={() => setShowOverlay(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
      >
        <Monitor className="h-4 w-4 mr-2" />
        {language === 'en' ? 'Demo Mode' : 'מצב הדגמה'}
      </button>
    );
  }

  const currentStepData = demoSteps[currentStep] || demoSteps[0];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Demo Controller */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-2xl">
        <div className="px-6 py-4">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>{language === 'en' ? 'Step' : 'שלב'} {currentStep + 1}/{demoSteps.length}</span>
              <span>{currentStepData.title}</span>
            </div>
            <div className="w-full bg-purple-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Current Step Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              {currentStepData.title}
            </h3>
            <p className="text-sm text-purple-100">
              {currentStepData.description}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlayPause}
                className="flex items-center px-4 py-2 bg-white text-purple-900 rounded-lg hover:bg-purple-50 transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Pause' : 'השהה'}
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Play' : 'הפעל'}
                  </>
                )}
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentStep >= demoSteps.length - 1}
                className="flex items-center px-3 py-2 bg-purple-700 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SkipForward className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleRestart}
                className="flex items-center px-3 py-2 bg-purple-700 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-purple-200">
                {language === 'en' ? 'Demo Mode Active' : 'מצב הדגמה פעיל'}
              </span>
              <button
                onClick={() => setShowOverlay(false)}
                className="px-3 py-1 text-sm bg-purple-700 rounded hover:bg-purple-600 transition-colors"
              >
                {language === 'en' ? 'Minimize' : 'מזער'}
              </button>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="px-6 pb-3">
          <div className="flex space-x-1">
            {demoSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStep(index);
                  setProgress(0);
                }}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-white' 
                    : index < currentStep 
                    ? 'bg-green-400' 
                    : 'bg-purple-700'
                }`}
                title={step.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Highlight Overlay */}
      {currentStepData.highlight && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div 
            className="absolute border-4 border-yellow-400 rounded-lg animate-pulse"
            style={{
              // These would be dynamically positioned based on the highlight target
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '200px'
            }}
          />
        </div>
      )}
    </div>
  );
}