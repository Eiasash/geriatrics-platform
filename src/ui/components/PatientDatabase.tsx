import React, { useState, useEffect } from 'react';
import { Search, User, Calendar, AlertTriangle, Pill, Brain, FileText, ChevronRight } from 'lucide-react';
import comprehensivePatients from '../../data/comprehensive-patients.json';
import extendedPatients from '../../data/extended-patients.json';

interface PatientDatabaseProps {
  language: 'en' | 'he';
}

export default function PatientDatabase({ language }: PatientDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [filterAcuity, setFilterAcuity] = useState<string>('all');
  const [filterWard, setFilterWard] = useState<string>('all');
  
  // Combine all patient data
  const allPatients = [...comprehensivePatients.patients, ...extendedPatients.patients];
  
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.diagnoses.some((d: string) => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAcuity = filterAcuity === 'all' || patient.acuity === filterAcuity;
    const matchesWard = filterWard === 'all' || patient.ward === filterWard;
    
    return matchesSearch && matchesAcuity && matchesWard;
  });

  const getAcuityColor = (acuity: string) => {
    switch(acuity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getFallRiskColor = (risk: number) => {
    if (risk >= 70) return 'text-red-600';
    if (risk >= 45) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getLatestMMSE = (mmseArray: any[]) => {
    if (!mmseArray || mmseArray.length === 0) return null;
    return mmseArray[mmseArray.length - 1];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Patient Database' : 'מאגר מטופלים'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? `${allPatients.length} patients in system` : `${allPatients.length} מטופלים במערכת`}
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
                placeholder={language === 'en' ? 'Search patients, ID, or diagnosis...' : 'חיפוש מטופלים, מזהה או אבחנה...'}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filterAcuity}
            onChange={(e) => setFilterAcuity(e.target.value)}
          >
            <option value="all">{language === 'en' ? 'All Acuity Levels' : 'כל רמות החומרה'}</option>
            <option value="critical">{language === 'en' ? 'Critical' : 'קריטי'}</option>
            <option value="moderate">{language === 'en' ? 'Moderate' : 'בינוני'}</option>
            <option value="low">{language === 'en' ? 'Low' : 'נמוך'}</option>
          </select>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filterWard}
            onChange={(e) => setFilterWard(e.target.value)}
          >
            <option value="all">{language === 'en' ? 'All Wards' : 'כל המחלקות'}</option>
            <option value="Geriatrics A">{language === 'en' ? 'Geriatrics A' : 'גריאטריה א'}</option>
            <option value="Geriatrics B">{language === 'en' ? 'Geriatrics B' : 'גריאטריה ב'}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'Patients' : 'מטופלים'} ({filteredPatients.length})
              </h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filteredPatients.map((patient) => {
                const latestMMSE = getLatestMMSE(patient.mmse);
                return (
                  <div
                    key={patient.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedPatient?.id === patient.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{patient.name}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {patient.age} {language === 'en' ? 'years' : 'שנים'} • {patient.ward} • {language === 'en' ? 'Bed' : 'מיטה'} {patient.bed}
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAcuityColor(patient.acuity)}`}>
                            {patient.acuity || 'stable'}
                          </span>
                          {patient.fallRisk && (
                            <span className={`text-xs ${getFallRiskColor(patient.fallRisk)}`}>
                              <AlertTriangle className="inline h-3 w-3 mr-1" />
                              {language === 'en' ? 'Fall' : 'נפילה'}: {patient.fallRisk}%
                            </span>
                          )}
                          {latestMMSE && (
                            <span className="text-xs text-gray-600">
                              <Brain className="inline h-3 w-3 mr-1" />
                              MMSE: {latestMMSE.score}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                    <p className="mt-1 text-gray-600">
                      ID: {selectedPatient.id} • {selectedPatient.age} {language === 'en' ? 'years old' : 'בן/בת'} • {selectedPatient.gender}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {language === 'en' ? 'Admitted' : 'התקבל'}: {new Date(selectedPatient.admissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAcuityColor(selectedPatient.acuity)}`}>
                    {selectedPatient.acuity || 'stable'}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Location' : 'מיקום'}</p>
                    <p className="font-medium">{selectedPatient.ward} - {language === 'en' ? 'Room' : 'חדר'} {selectedPatient.room}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Physician' : 'רופא מטפל'}</p>
                    <p className="font-medium">{selectedPatient.primaryPhysician}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Code Status' : 'סטטוס החייאה'}</p>
                    <p className="font-medium">{selectedPatient.codeStatus}</p>
                  </div>
                </div>
              </div>

              {/* Diagnoses */}
              <div className="p-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-3">
                  <FileText className="inline h-4 w-4 mr-2 text-gray-400" />
                  {language === 'en' ? 'Diagnoses' : 'אבחנות'}
                </h3>
                <div className="space-y-2">
                  {selectedPatient.diagnoses.map((diagnosis: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">{diagnosis}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div className="p-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-3">
                  <Pill className="inline h-4 w-4 mr-2 text-gray-400" />
                  {language === 'en' ? 'Medications' : 'תרופות'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedPatient.medications.map((med: string, index: number) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{med}</span>
                    </div>
                  ))}
                </div>
                {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">
                      {language === 'en' ? 'Allergies' : 'אלרגיות'}: {selectedPatient.allergies.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* MMSE Scores */}
              {selectedPatient.mmse && selectedPatient.mmse.length > 0 && (
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    <Brain className="inline h-4 w-4 mr-2 text-gray-400" />
                    {language === 'en' ? 'MMSE History' : 'היסטוריית MMSE'}
                  </h3>
                  <div className="space-y-2">
                    {selectedPatient.mmse.map((score: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {new Date(score.date).toLocaleDateString()}
                        </span>
                        <span className={`font-medium ${
                          score.score >= 24 ? 'text-green-600' : 
                          score.score >= 18 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {score.score}/30
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPatient.fallRisk && (
                    <div>
                      <p className="text-sm text-gray-600">{language === 'en' ? 'Fall Risk' : 'סיכון נפילה'}</p>
                      <p className={`font-medium ${getFallRiskColor(selectedPatient.fallRisk)}`}>
                        {selectedPatient.fallRisk}%
                      </p>
                    </div>
                  )}
                  {selectedPatient.socialHistory && (
                    <div>
                      <p className="text-sm text-gray-600">{language === 'en' ? 'Social History' : 'היסטוריה חברתית'}</p>
                      <p className="text-gray-700">{selectedPatient.socialHistory}</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  {language === 'en' ? 'Last Updated' : 'עודכן לאחרונה'}: {new Date(selectedPatient.lastUpdated).toLocaleString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'en' ? 'Select a patient to view details' : 'בחר מטופל לצפייה בפרטים'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}