import React, { useState } from 'react';
import { Search, AlertTriangle, Info, Heart, Brain, Pill, Shield, Clock, DollarSign, ChevronRight } from 'lucide-react';
import medicationsData from '../../data/enhanced-medications.json';

interface EnhancedMedicationsProps {
  language: 'en' | 'he';
}

export default function EnhancedMedications({ language }: EnhancedMedicationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterBeers, setFilterBeers] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const categories = [
    { id: 'all', name: language === 'en' ? 'All Categories' : 'כל הקטגוריות' },
    ...Array.from(new Set(medicationsData.medications.map(m => m.category))).map(cat => ({
      id: cat.toLowerCase().replace(' ', '-'),
      name: cat
    }))
  ];

  const filteredMeds = medicationsData.medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          med.indication.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || 
                           med.category.toLowerCase().replace(' ', '-') === filterCategory;
    
    const matchesBeers = filterBeers === 'all' ||
                        (filterBeers === 'avoid' && med.beersCategory.includes('AVOID')) ||
                        (filterBeers === 'caution' && med.beersCategory.includes('CAUTION'));
    
    return matchesSearch && matchesCategory && matchesBeers;
  });

  const getSeverityColor = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'major': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'minor': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getBeersColor = (category: string) => {
    if (category.includes('AVOID')) return 'text-red-600 bg-red-50';
    if (category.includes('CAUTION')) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getCostDisplay = (cost: string) => {
    const costMap = {
      '$': { symbol: '$', label: language === 'en' ? 'Low cost' : 'עלות נמוכה', color: 'text-green-600' },
      '$$': { symbol: '$$', label: language === 'en' ? 'Moderate cost' : 'עלות בינונית', color: 'text-yellow-600' },
      '$$$': { symbol: '$$$', label: language === 'en' ? 'High cost' : 'עלות גבוהה', color: 'text-red-600' }
    };
    
    const costKey = cost.split(' ')[0] as keyof typeof costMap;
    return costMap[costKey] || costMap['$'];
  };

  const renderMedicationOverview = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          {language === 'en' ? 'Basic Information' : 'מידע בסיסי'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>{language === 'en' ? 'Generic Name' : 'שם גנרי'}:</strong> {selectedMed.genericName}</p>
            <p><strong>{language === 'en' ? 'Brand Names' : 'שמות מותג'}:</strong> {selectedMed.brandNames.join(', ')}</p>
            <p><strong>{language === 'en' ? 'Class' : 'סיווג'}:</strong> {selectedMed.class}</p>
          </div>
          <div>
            <p><strong>{language === 'en' ? 'Category' : 'קטגוריה'}:</strong> {selectedMed.category}</p>
            <p><strong>{language === 'en' ? 'Indication' : 'אינדיקציה'}:</strong> {selectedMed.indication}</p>
            <div className="flex items-center mt-2">
              <strong className="mr-2">{language === 'en' ? 'Cost' : 'עלות'}:</strong>
              <span className={`font-medium ${getCostDisplay(selectedMed.cost).color}`}>
                {getCostDisplay(selectedMed.cost).symbol} {getCostDisplay(selectedMed.cost).label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Beers Criteria Alert */}
      {selectedMed.beersCategory !== 'Not listed' && (
        <div className={`rounded-lg p-4 ${getBeersColor(selectedMed.beersCategory)}`}>
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Beers Criteria Alert' : 'התרעת קריטריוני בירס'}
              </h4>
              <p className="text-sm">{selectedMed.beersCategory}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dosing */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Dosing Information' : 'מידע על מינון'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-800">
                {language === 'en' ? 'Starting Dose' : 'מינון התחלתי'}
              </h4>
              <p className="text-gray-700">{selectedMed.dosing.starting}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                {language === 'en' ? 'Maintenance' : 'מינון קיום'}
              </h4>
              <p className="text-gray-700">{selectedMed.dosing.maintenance}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                {language === 'en' ? 'Maximum' : 'מינון מקסימלי'}
              </h4>
              <p className="text-gray-700">{selectedMed.dosing.maximum}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-800">
                {language === 'en' ? 'Renal Adjustment' : 'התאמה כלייתית'}
              </h4>
              <p className="text-gray-700">{selectedMed.dosing.renalAdjustment}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                {language === 'en' ? 'Hepatic Adjustment' : 'התאמה כבדית'}
              </h4>
              <p className="text-gray-700">{selectedMed.dosing.hepaticAdjustment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Geriatric Considerations */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">
          {language === 'en' ? 'Geriatric Considerations' : 'שיקולים גריאטריים'}
        </h3>
        <ul className="space-y-2">
          {selectedMed.geriatricConsiderations.map((consideration: string, index: number) => (
            <li key={index} className="flex items-start">
              <Info className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-purple-800">{consideration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderSideEffectsWarnings = () => (
    <div className="space-y-6">
      {/* Contraindications */}
      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">
          {language === 'en' ? 'Contraindications' : 'התוויות נגד'}
        </h3>
        <ul className="space-y-2">
          {selectedMed.contraindications.map((contraindication: string, index: number) => (
            <li key={index} className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-red-800">{contraindication}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Warnings */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          {language === 'en' ? 'Warnings & Precautions' : 'אזהרות וזהירות'}
        </h3>
        <ul className="space-y-2">
          {selectedMed.warnings.map((warning: string, index: number) => (
            <li key={index} className="flex items-start">
              <Shield className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-yellow-800">{warning}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Side Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Common Side Effects' : 'תופעות לוואי שכיחות'}
          </h3>
          <ul className="space-y-2">
            {selectedMed.sideEffects.common.map((effect: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{effect}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Serious Side Effects' : 'תופעות לוואי חמורות'}
          </h3>
          <ul className="space-y-2">
            {selectedMed.sideEffects.serious.map((effect: string, index: number) => (
              <li key={index} className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{effect}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderInteractionsMonitoring = () => (
    <div className="space-y-6">
      {/* Drug Interactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Drug Interactions' : 'אינטראקציות תרופתיות'}
        </h3>
        <div className="space-y-4">
          {selectedMed.interactions.map((interaction: any, index: number) => (
            <div key={index} className={`p-4 rounded-lg ${getSeverityColor(interaction.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{interaction.drug}</h4>
                  <p className="text-sm mt-1">{interaction.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  interaction.severity.toLowerCase() === 'major' ? 'bg-red-100 text-red-800' :
                  interaction.severity.toLowerCase() === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {interaction.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring Parameters */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          {language === 'en' ? 'Monitoring Parameters' : 'פרמטרי ניטור'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedMed.monitoring.map((parameter: string, index: number) => (
            <div key={index} className="flex items-center">
              <Heart className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-green-800">{parameter}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (selectedMed) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <button
              onClick={() => setSelectedMed(null)}
              className="text-blue-600 hover:text-blue-800 mb-2"
            >
              ← {language === 'en' ? 'Back to Medications' : 'חזרה לתרופות'}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{selectedMed.name}</h1>
            <p className="text-gray-600">{selectedMed.genericName}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBeersColor(selectedMed.beersCategory)}`}>
              {selectedMed.beersCategory !== 'Not listed' ? 'Beers Criteria' : 'Safe for Elderly'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: language === 'en' ? 'Overview' : 'סקירה' },
              { id: 'safety', name: language === 'en' ? 'Safety' : 'בטיחות' },
              { id: 'interactions', name: language === 'en' ? 'Interactions' : 'אינטראקציות' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'overview' && renderMedicationOverview()}
          {activeTab === 'safety' && renderSideEffectsWarnings()}
          {activeTab === 'interactions' && renderInteractionsMonitoring()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Enhanced Medication Database' : 'מאגר תרופות משופר'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Comprehensive geriatric medication information with safety alerts' : 'מידע מקיף על תרופות גריאטריות עם התרעות בטיחות'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search medications...' : 'חיפוש תרופות...'}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filterBeers}
            onChange={(e) => setFilterBeers(e.target.value)}
          >
            <option value="all">{language === 'en' ? 'All Safety Levels' : 'כל רמות הבטיחות'}</option>
            <option value="avoid">{language === 'en' ? 'Avoid in Elderly' : 'להימנע בקשישים'}</option>
            <option value="caution">{language === 'en' ? 'Use with Caution' : 'השתמש בזהירות'}</option>
          </select>
        </div>
      </div>

      {/* Beers Criteria Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          {language === 'en' ? 'Beers Criteria Information' : 'מידע על קריטריוני בירס'}
        </h3>
        <p className="text-blue-800 text-sm">
          {language === 'en' 
            ? 'The Beers Criteria identify potentially inappropriate medications for adults ≥65 years. Medications are categorized by risk level.'
            : 'קריטריוני בירס מזהים תרופות שעלולות להיות לא מתאימות למבוגרים ≥65 שנים. התרופות מסווגות לפי רמת סיכון.'}
        </p>
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMeds.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedMed(med)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {med.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{med.genericName}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {med.category}
                    </span>
                    {med.beersCategory !== 'Not listed' && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBeersColor(med.beersCategory)}`}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Beers
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </div>
              
              <p className="text-gray-700 text-sm mb-4">
                {med.indication}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Pill className="h-4 w-4 mr-1" />
                  {med.class}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {getCostDisplay(med.cost).symbol}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMeds.length === 0 && (
        <div className="text-center py-12">
          <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {language === 'en' ? 'No medications found matching your criteria' : 'לא נמצאו תרופות התואמות לקריטריונים'}
          </p>
        </div>
      )}
    </div>
  );
}