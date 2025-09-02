import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertTriangle, Users, ChevronRight, Download, Bookmark } from 'lucide-react';
import protocolsData from '../../data/clinical-protocols.json';

interface ProtocolsProps {
  language: 'en' | 'he';
}

export default function Protocols({ language }: ProtocolsProps) {
  const [selectedProtocol, setSelectedProtocol] = useState(protocolsData.protocols[0]);
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const toggleBookmark = (protocolId: string) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(protocolId)) {
        newSet.delete(protocolId);
      } else {
        newSet.add(protocolId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Safety': 'bg-red-100 text-red-800',
      'Cognitive': 'bg-purple-100 text-purple-800',
      'Skin Integrity': 'bg-green-100 text-green-800',
      'Medication Safety': 'bg-blue-100 text-blue-800',
      'Nutrition/Safety': 'bg-yellow-100 text-yellow-800',
      'Safety/Rights': 'bg-orange-100 text-orange-800',
      'Pain Management': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Clinical Protocols' : 'פרוטוקולים קליניים'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Evidence-based protocols for geriatric care' : 'פרוטוקולים מבוססי ראיות לטיפול גריאטרי'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Total Protocols' : 'סך הפרוטוקולים'}</p>
              <p className="text-2xl font-bold text-gray-900">{protocolsData.protocols.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Categories' : 'קטגוריות'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(protocolsData.protocols.map(p => p.category)).size}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Bookmarked' : 'במועדפים'}</p>
              <p className="text-2xl font-bold text-gray-900">{bookmarked.size}</p>
            </div>
            <Bookmark className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Recently Updated' : 'עודכנו לאחרונה'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {protocolsData.protocols.filter(p => 
                  new Date(p.lastUpdated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ).length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Protocol List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'Protocols' : 'פרוטוקולים'}
              </h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {protocolsData.protocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedProtocol.id === protocol.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => {
                    setSelectedProtocol(protocol);
                    setSelectedStep(null);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(protocol.category)}`}>
                          {protocol.category}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(protocol.id);
                          }}
                          className={`p-1 rounded ${
                            bookmarked.has(protocol.id) 
                              ? 'text-purple-600' 
                              : 'text-gray-400 hover:text-purple-600'
                          }`}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{protocol.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>v{protocol.version}</span>
                        <span>{new Date(protocol.lastUpdated).toLocaleDateString()}</span>
                        <span>{protocol.steps.length} {language === 'en' ? 'steps' : 'צעדים'}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Protocol Steps */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProtocol.title}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedProtocol.category)}`}>
                      {selectedProtocol.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      Version {selectedProtocol.version} • {new Date(selectedProtocol.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(selectedProtocol.id)}
                    className={`p-2 rounded ${
                      bookmarked.has(selectedProtocol.id) 
                        ? 'text-purple-600' 
                        : 'text-gray-400 hover:text-purple-600'
                    }`}
                  >
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {selectedStep ? (
                <div>
                  <button
                    onClick={() => setSelectedStep(null)}
                    className="text-blue-600 hover:text-blue-800 text-sm mb-4"
                  >
                    ← {language === 'en' ? 'Back to steps' : 'חזרה לצעדים'}
                  </button>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900">
                      {language === 'en' ? 'Step' : 'צעד'} {selectedStep.step}: {selectedStep.title}
                    </h3>
                    <p className="text-blue-800 mt-2">{selectedStep.description}</p>
                  </div>

                  {selectedStep.actions && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {language === 'en' ? 'Actions' : 'פעולות'}
                      </h4>
                      <ul className="space-y-2">
                        {selectedStep.actions.map((action: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedStep.tools && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {language === 'en' ? 'Tools' : 'כלים'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStep.tools.map((tool: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedStep.timeframe && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-800">
                          {language === 'en' ? 'Timeframe' : 'זמן ביצוע'}: {selectedStep.timeframe}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Protocol Steps' : 'צעדי הפרוטוקול'}
                  </h3>
                  <div className="space-y-3">
                    {selectedProtocol.steps.map((step: any, index: number) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedStep(step)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {step.step}
                              </span>
                              <h4 className="font-medium text-gray-900">{step.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 ml-11">{step.description}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Protocol Info */}
                  <div className="mt-8 space-y-6">
                    {selectedProtocol.reassessment && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          {language === 'en' ? 'Reassessment' : 'הערכה חוזרת'}
                        </h4>
                        <p className="text-blue-800">{selectedProtocol.reassessment}</p>
                      </div>
                    )}

                    {selectedProtocol.outcomes && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {language === 'en' ? 'Quality Indicators' : 'מדדי איכות'}
                        </h4>
                        <ul className="space-y-2">
                          {selectedProtocol.outcomes.map((outcome: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></span>
                              <span className="text-gray-700">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProtocol.qualityIndicators && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {language === 'en' ? 'Quality Metrics' : 'מדדי איכות'}
                        </h4>
                        <ul className="space-y-2">
                          {selectedProtocol.qualityIndicators.map((indicator: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-3"></span>
                              <span className="text-gray-700">{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProtocol.familyEducation && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {language === 'en' ? 'Family Education' : 'חינוך המשפחה'}
                        </h4>
                        <ul className="space-y-2">
                          {selectedProtocol.familyEducation.map((item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-3"></span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Implementation Guidelines' : 'הנחיות יישום'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">
              {language === 'en' ? 'Training' : 'הכשרה'}
            </h3>
            <p className="text-blue-800 text-sm">{protocolsData.implementation.training}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">
              {language === 'en' ? 'Compliance' : 'ציות'}
            </h3>
            <p className="text-green-800 text-sm">{protocolsData.implementation.compliance}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-medium text-purple-900 mb-2">
              {language === 'en' ? 'Updates' : 'עדכונים'}
            </h3>
            <p className="text-purple-800 text-sm">{protocolsData.implementation.updates}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">
              {language === 'en' ? 'Documentation' : 'תיעוד'}
            </h3>
            <p className="text-yellow-800 text-sm">{protocolsData.implementation.documentation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}