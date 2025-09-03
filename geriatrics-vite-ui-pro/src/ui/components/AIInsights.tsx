import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, TrendingDown, TrendingUp, Minus, 
  Brain, Pill, Activity, Calendar, Sparkles,
  ChevronRight, RefreshCw, Loader2, Info
} from 'lucide-react';
import { fetchInsights, type InsightResult } from '../../services/ai-insights';

interface AIInsightsProps {
  patientId: string;
  patientName?: string;
  language: 'en' | 'he';
}

export default function AIInsights({ patientId, patientName, language }: AIInsightsProps) {
  const [insights, setInsights] = useState<InsightResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const loadInsights = async () => {
    if (!patientId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchInsights(patientId);
      setInsights(data);
    } catch (err) {
      console.error('Failed to load insights:', err);
      setError(language === 'en' ? 'Failed to load AI insights' : 'נכשל בטעינת תובנות AI');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [patientId]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate':
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'declining':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case 'improving':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'stable':
        return <Minus className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">
          {language === 'en' ? 'Analyzing patient data...' : 'מנתח נתוני מטופל...'}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'en' ? 'No insights available' : 'אין תובנות זמינות'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">
            {language === 'en' ? 'AI-Powered Insights' : 'תובנות מבוססות AI'}
          </h2>
        </div>
        <button
          onClick={loadInsights}
          className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          {language === 'en' ? 'Refresh' : 'רענן'}
        </button>
      </div>

      {/* Fall Risk Assessment */}
      {insights.fall_risk && (
        <div className={`border rounded-lg p-4 ${getRiskColor(insights.fall_risk.band)}`}>
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'fall' ? null : 'fall')}
          >
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-3" />
              <div>
                <h3 className="font-semibold">
                  {language === 'en' ? 'Fall Risk' : 'סיכון נפילה'}
                </h3>
                <p className="text-sm opacity-90">
                  {language === 'en' ? `Risk Level: ${insights.fall_risk.band.toUpperCase()}` : `רמת סיכון: ${insights.fall_risk.band}`}
                  {' • '}
                  {language === 'en' ? `Score: ${insights.fall_risk.score}` : `ציון: ${insights.fall_risk.score}`}
                </p>
              </div>
            </div>
            <ChevronRight className={`h-5 w-5 transition-transform ${expandedSection === 'fall' ? 'rotate-90' : ''}`} />
          </div>
          
          {expandedSection === 'fall' && insights.fall_risk.recommendations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-current opacity-50">
              <p className="text-sm font-medium mb-2">
                {language === 'en' ? 'Recommendations:' : 'המלצות:'}
              </p>
              <ul className="space-y-1">
                {insights.fall_risk.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Cognitive Trend */}
      {insights.mmse_trend && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'cognitive' ? null : 'cognitive')}
          >
            <div className="flex items-center">
              <Brain className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Cognitive Trend' : 'מגמה קוגניטיבית'}
                </h3>
                <p className="text-sm text-gray-600">
                  {insights.mmse_trend.interpretation}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {getTrendIcon(insights.mmse_trend.band)}
              <ChevronRight className={`h-5 w-5 ml-2 transition-transform ${expandedSection === 'cognitive' ? 'rotate-90' : ''}`} />
            </div>
          </div>
          
          {expandedSection === 'cognitive' && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">
                    {language === 'en' ? 'Current MMSE:' : 'MMSE נוכחי:'}
                  </span>
                  <span className="ml-2 font-medium">
                    {insights.mmse_trend.currentScore || 'N/A'}/30
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">
                    {language === 'en' ? 'Trend:' : 'מגמה:'}
                  </span>
                  <span className="ml-2 font-medium capitalize">
                    {insights.mmse_trend.band}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Medication Interactions */}
      {insights.med_interaction && insights.med_interaction.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'meds' ? null : 'meds')}
          >
            <div className="flex items-center">
              <Pill className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Medication Alerts' : 'התרעות תרופות'}
                </h3>
                <p className="text-sm text-gray-600">
                  {insights.med_interaction.length} {language === 'en' ? 'interactions found' : 'אינטראקציות נמצאו'}
                </p>
              </div>
            </div>
            <ChevronRight className={`h-5 w-5 transition-transform ${expandedSection === 'meds' ? 'rotate-90' : ''}`} />
          </div>
          
          {expandedSection === 'meds' && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
              {insights.med_interaction.map((interaction, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg text-sm ${
                    interaction.severity === 'high' 
                      ? 'bg-red-50 text-red-800' 
                      : 'bg-yellow-50 text-yellow-800'
                  }`}
                >
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{interaction.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Readmission Risk */}
      {insights.readmission && (
        <div className={`border rounded-lg p-4 ${getRiskColor(insights.readmission.risk)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3" />
              <div>
                <h3 className="font-semibold">
                  {language === 'en' ? '30-Day Readmission Risk' : 'סיכון אשפוז חוזר ב-30 יום'}
                </h3>
                <p className="text-sm opacity-90">
                  {language === 'en' ? `Risk: ${insights.readmission.risk.toUpperCase()}` : `סיכון: ${insights.readmission.risk}`}
                  {' • '}
                  {language === 'en' ? `Probability: ${insights.readmission.probability}` : `הסתברות: ${insights.readmission.probability}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Care Plan */}
      {insights.care_plan && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <div 
            className="cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'plan' ? null : 'plan')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-purple-600 mr-3" />
                <h3 className="font-semibold text-gray-900">
                  {language === 'en' ? 'AI-Generated Care Plan' : 'תוכנית טיפול מבוססת AI'}
                </h3>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expandedSection === 'plan' ? 'rotate-90' : ''}`} />
            </div>
          </div>
          
          {expandedSection === 'plan' && (
            <div className="mt-3 pt-3 border-t border-purple-200">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-normal">
                  {insights.care_plan.plan}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-500 text-center pt-2">
        {language === 'en' 
          ? 'AI insights are suggestions only. Clinical judgment should always be applied.'
          : 'תובנות AI הן המלצות בלבד. יש להפעיל שיקול דעת קליני תמיד.'}
      </div>
    </div>
  );
}