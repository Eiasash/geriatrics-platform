import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, Info, Pill, Filter, X } from 'lucide-react';
import medicationsData from '../../data/medications-he.json';

interface MedicationDatabaseProps {
  language: 'en' | 'he';
}

export default function MedicationDatabase({ language }: MedicationDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [showBeersOnly, setShowBeersOnly] = useState(false);
  const [filteredMedications, setFilteredMedications] = useState(medicationsData.medications);

  useEffect(() => {
    let filtered = medicationsData.medications;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(med => med.category === selectedCategory);
    }

    // Beers list filter
    if (showBeersOnly) {
      filtered = filtered.filter(med => med.beersListWarning);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(med => 
        med.nameHe.includes(searchTerm) ||
        med.nameEn.toLowerCase().includes(term) ||
        med.brand.includes(searchTerm) ||
        med.commonUse.includes(searchTerm)
      );
    }

    setFilteredMedications(filtered);
  }, [searchTerm, selectedCategory, showBeersOnly]);

  const getCategoryName = (category: string) => {
    return language === 'he' 
      ? medicationsData.categories[category as keyof typeof medicationsData.categories]
      : category;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Medication Database' : 'מאגר תרופות'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Geriatric medication reference with Beers Criteria warnings'
            : 'מדריך תרופות גריאטרי עם התראות Beers Criteria'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'en' ? 'Search medications...' : 'חפש תרופה...'}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir={language === 'he' ? 'rtl' : 'ltr'}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">
              {language === 'en' ? 'All Categories' : 'כל הקטגוריות'}
            </option>
            {Object.entries(medicationsData.categories).map(([key, value]) => (
              <option key={key} value={key}>
                {language === 'he' ? value : key}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowBeersOnly(!showBeersOnly)}
            className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
              showBeersOnly
                ? 'bg-orange-100 text-orange-700 border border-orange-300'
                : 'bg-white text-gray-700 border'
            }`}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Beers List Only' : 'רק Beers List'}
          </button>
        </div>

        <div className="text-sm text-gray-500">
          {language === 'en' 
            ? `Showing ${filteredMedications.length} of ${medicationsData.medications.length} medications`
            : `מציג ${filteredMedications.length} מתוך ${medicationsData.medications.length} תרופות`}
        </div>
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedications.map(med => (
          <div
            key={med.id}
            onClick={() => setSelectedMedication(med)}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'he' ? med.nameHe : med.nameEn}
                </h3>
                <p className="text-sm text-gray-600">
                  {med.brand}
                </p>
              </div>
              {med.beersListWarning && (
                <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-gray-500">
                {getCategoryName(med.category)}
              </p>
              <p className="text-sm text-gray-700 line-clamp-2">
                {med.commonUse}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {med.dosages.slice(0, 3).map(dose => (
                  <span key={dose} className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                    {dose}
                  </span>
                ))}
                {med.dosages.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                    +{med.dosages.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Medication Details Modal */}
      {selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {language === 'he' ? selectedMedication.nameHe : selectedMedication.nameEn}
              </h2>
              <button
                onClick={() => setSelectedMedication(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    {language === 'en' ? 'Brand Name' : 'שם מסחרי'}
                  </label>
                  <p className="text-gray-900">{selectedMedication.brand}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    {language === 'en' ? 'Category' : 'קטגוריה'}
                  </label>
                  <p className="text-gray-900">{getCategoryName(selectedMedication.category)}</p>
                </div>
              </div>

              {/* Dosages */}
              <div>
                <label className="text-sm font-medium text-gray-500">
                  {language === 'en' ? 'Available Dosages' : 'מינונים זמינים'}
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedMedication.dosages.map((dose: string) => (
                    <span key={dose} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {dose}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Use */}
              <div>
                <label className="text-sm font-medium text-gray-500">
                  {language === 'en' ? 'Common Use' : 'שימוש נפוץ'}
                </label>
                <p className="text-gray-900 mt-1">{selectedMedication.commonUse}</p>
              </div>

              {/* Geriatric Considerations */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-blue-900">
                    {language === 'en' ? 'Geriatric Considerations' : 'שיקולים גריאטריים'}
                  </h3>
                </div>
                <p className="text-blue-800">{selectedMedication.geriatricConsiderations}</p>
              </div>

              {/* Beers Warning */}
              {selectedMedication.beersListWarning && (
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <h3 className="font-medium text-orange-900">
                      {language === 'en' ? 'Beers Criteria Warning' : 'אזהרת Beers Criteria'}
                    </h3>
                  </div>
                  <p className="text-orange-800">{selectedMedication.beersReason}</p>
                </div>
              )}

              {/* Interactions */}
              <div>
                <label className="text-sm font-medium text-gray-500">
                  {language === 'en' ? 'Known Interactions' : 'אינטראקציות ידועות'}
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedMedication.interactions.map((interaction: string) => (
                    <span key={interaction} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {interaction}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}