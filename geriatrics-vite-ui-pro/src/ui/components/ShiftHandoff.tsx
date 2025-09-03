import React, { useState, useEffect } from 'react';
import { Clock, User, AlertTriangle, CheckCircle, FileText, Printer, Send, Activity, Pill, Heart } from 'lucide-react';
import { DataSource } from '../../data';

interface ShiftHandoffProps {
  dataSource: DataSource;
  language: 'en' | 'he';
}

interface HandoffReport {
  id: string;
  shiftType: 'morning' | 'evening' | 'night';
  date: string;
  nurseOut: string;
  nurseIn: string;
  criticalPatients: any[];
  newAdmissions: any[];
  discharges: any[];
  medicationChanges: any[];
  fallRisk: any[];
  behavioralConcerns: any[];
  pendingTests: any[];
  generalNotes: string;
  createdAt: string;
}

export default function ShiftHandoff({ dataSource, language }: ShiftHandoffProps) {
  const [patients, setPatients] = useState<any[]>([]);
  const [currentReport, setCurrentReport] = useState<Partial<HandoffReport>>({
    shiftType: 'morning',
    date: new Date().toISOString().split('T')[0],
    criticalPatients: [],
    newAdmissions: [],
    discharges: [],
    medicationChanges: [],
    fallRisk: [],
    behavioralConcerns: [],
    pendingTests: [],
    generalNotes: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [savedReports, setSavedReports] = useState<HandoffReport[]>([]);

  useEffect(() => {
    loadPatients();
    loadSavedReports();
  }, [dataSource]);

  const loadPatients = async () => {
    const roster = await dataSource.getRoster();
    setPatients(roster);
    
    // Auto-populate high-risk patients
    const critical = roster.filter(p => p.acuity === 'critical');
    const falls = roster.filter(p => p.fallRisk && p.fallRisk > 45);
    
    setCurrentReport(prev => ({
      ...prev,
      criticalPatients: critical,
      fallRisk: falls
    }));
  };

  const loadSavedReports = () => {
    const saved = localStorage.getItem('handoff_reports');
    if (saved) {
      setSavedReports(JSON.parse(saved));
    }
  };

  const saveReport = () => {
    const report: HandoffReport = {
      ...currentReport as HandoffReport,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedReports = [report, ...savedReports].slice(0, 30); // Keep last 30 reports
    setSavedReports(updatedReports);
    localStorage.setItem('handoff_reports', JSON.stringify(updatedReports));
    
    alert(language === 'en' ? 'Report saved successfully!' : 'הדוח נשמר בהצלחה!');
  };

  const generateReport = () => {
    setShowPreview(true);
  };

  const printReport = () => {
    window.print();
  };

  const addPatientToSection = (section: keyof HandoffReport, patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setCurrentReport(prev => ({
        ...prev,
        [section]: [...(prev[section] as any[] || []), patient]
      }));
    }
  };

  const removePatientFromSection = (section: keyof HandoffReport, patientId: string) => {
    setCurrentReport(prev => ({
      ...prev,
      [section]: (prev[section] as any[] || []).filter(p => p.id !== patientId)
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Shift Handoff Report' : 'דוח העברת משמרת'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Comprehensive shift change documentation'
            : 'תיעוד מקיף להעברת משמרת'}
        </p>
      </div>

      {/* Report Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Shift Type' : 'סוג משמרת'}
            </label>
            <select
              value={currentReport.shiftType}
              onChange={(e) => setCurrentReport({...currentReport, shiftType: e.target.value as any})}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="morning">{language === 'en' ? 'Morning (7:00-15:00)' : 'בוקר (7:00-15:00)'}</option>
              <option value="evening">{language === 'en' ? 'Evening (15:00-23:00)' : 'ערב (15:00-23:00)'}</option>
              <option value="night">{language === 'en' ? 'Night (23:00-7:00)' : 'לילה (23:00-7:00)'}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Date' : 'תאריך'}
            </label>
            <input
              type="date"
              value={currentReport.date}
              onChange={(e) => setCurrentReport({...currentReport, date: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Outgoing Nurse' : 'אחות יוצאת'}
            </label>
            <input
              type="text"
              value={currentReport.nurseOut || ''}
              onChange={(e) => setCurrentReport({...currentReport, nurseOut: e.target.value})}
              placeholder={language === 'en' ? 'Enter name' : 'הכנס שם'}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Critical Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Patients */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'Critical Patients' : 'חולים קריטיים'}
              </h2>
            </div>
            <span className="text-sm text-gray-500">
              {currentReport.criticalPatients?.length || 0}
            </span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {currentReport.criticalPatients?.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-gray-600">Room {patient.room || patient.bed}</p>
                </div>
                <button
                  onClick={() => removePatientFromSection('criticalPatients', patient.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <select
            onChange={(e) => {
              if (e.target.value) {
                addPatientToSection('criticalPatients', e.target.value);
                e.target.value = '';
              }
            }}
            className="mt-2 w-full px-2 py-1 border rounded text-sm"
          >
            <option value="">{language === 'en' ? 'Add patient...' : 'הוסף חולה...'}</option>
            {patients.filter(p => !currentReport.criticalPatients?.find(cp => cp.id === p.id))
              .map(p => (
                <option key={p.id} value={p.id}>{p.name} - Room {p.room || p.bed}</option>
              ))}
          </select>
        </div>

        {/* Fall Risk */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-orange-500 mr-2" />
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'High Fall Risk' : 'סיכון נפילה גבוה'}
              </h2>
            </div>
            <span className="text-sm text-gray-500">
              {currentReport.fallRisk?.length || 0}
            </span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {currentReport.fallRisk?.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-gray-600">Score: {patient.fallRisk || 'N/A'}</p>
                </div>
                <button
                  onClick={() => removePatientFromSection('fallRisk', patient.id)}
                  className="text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <select
            onChange={(e) => {
              if (e.target.value) {
                addPatientToSection('fallRisk', e.target.value);
                e.target.value = '';
              }
            }}
            className="mt-2 w-full px-2 py-1 border rounded text-sm"
          >
            <option value="">{language === 'en' ? 'Add patient...' : 'הוסף חולה...'}</option>
            {patients.filter(p => !currentReport.fallRisk?.find(fr => fr.id === p.id))
              .map(p => (
                <option key={p.id} value={p.id}>{p.name} - Room {p.room || p.bed}</option>
              ))}
          </select>
        </div>

        {/* Medication Changes */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Pill className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'Medication Changes' : 'שינויי תרופות'}
              </h2>
            </div>
            <span className="text-sm text-gray-500">
              {currentReport.medicationChanges?.length || 0}
            </span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {currentReport.medicationChanges?.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-gray-600">Room {patient.room || patient.bed}</p>
                </div>
                <button
                  onClick={() => removePatientFromSection('medicationChanges', patient.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <select
            onChange={(e) => {
              if (e.target.value) {
                addPatientToSection('medicationChanges', e.target.value);
                e.target.value = '';
              }
            }}
            className="mt-2 w-full px-2 py-1 border rounded text-sm"
          >
            <option value="">{language === 'en' ? 'Add patient...' : 'הוסף חולה...'}</option>
            {patients.filter(p => !currentReport.medicationChanges?.find(mc => mc.id === p.id))
              .map(p => (
                <option key={p.id} value={p.id}>{p.name} - Room {p.room || p.bed}</option>
              ))}
          </select>
        </div>

        {/* New Admissions */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'New Admissions' : 'קבלות חדשות'}
              </h2>
            </div>
            <span className="text-sm text-gray-500">
              {currentReport.newAdmissions?.length || 0}
            </span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {currentReport.newAdmissions?.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-gray-600">Room {patient.room || patient.bed}</p>
                </div>
                <button
                  onClick={() => removePatientFromSection('newAdmissions', patient.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <select
            onChange={(e) => {
              if (e.target.value) {
                addPatientToSection('newAdmissions', e.target.value);
                e.target.value = '';
              }
            }}
            className="mt-2 w-full px-2 py-1 border rounded text-sm"
          >
            <option value="">{language === 'en' ? 'Add patient...' : 'הוסף חולה...'}</option>
            {patients.filter(p => !currentReport.newAdmissions?.find(na => na.id === p.id))
              .map(p => (
                <option key={p.id} value={p.id}>{p.name} - Room {p.room || p.bed}</option>
              ))}
          </select>
        </div>
      </div>

      {/* General Notes */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-gray-900 mb-2">
          {language === 'en' ? 'General Notes' : 'הערות כלליות'}
        </h2>
        <textarea
          value={currentReport.generalNotes}
          onChange={(e) => setCurrentReport({...currentReport, generalNotes: e.target.value})}
          placeholder={language === 'en' 
            ? 'Add any additional notes for the incoming shift...'
            : 'הוסף הערות נוספות למשמרת הנכנסת...'}
          className="w-full px-3 py-2 border rounded-lg"
          rows={4}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={generateReport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FileText className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Preview Report' : 'תצוגה מקדימה'}
        </button>
        
        <button
          onClick={saveReport}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Save Report' : 'שמור דוח'}
        </button>
        
        <button
          onClick={printReport}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <Printer className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Print' : 'הדפס'}
        </button>
      </div>

      {/* Report Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto print:max-h-none">
            <div className="p-6 print:p-0">
              <div className="flex justify-between items-center mb-4 print:hidden">
                <h2 className="text-xl font-bold">
                  {language === 'en' ? 'Handoff Report Preview' : 'תצוגת דוח העברת משמרת'}
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>

              {/* Printable Report Content */}
              <div className="space-y-6 print:text-black">
                <div className="text-center border-b pb-4">
                  <h1 className="text-2xl font-bold">
                    {language === 'en' ? 'Shift Handoff Report' : 'דוח העברת משמרת'}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {currentReport.date} - {currentReport.shiftType} Shift
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {language === 'en' ? 'Nurse' : 'אחות'}: {currentReport.nurseOut || 'N/A'}
                  </p>
                </div>

                {/* Report Sections */}
                {currentReport.criticalPatients && currentReport.criticalPatients.length > 0 && (
                  <div>
                    <h3 className="font-bold text-red-600 mb-2">
                      Critical Patients ({currentReport.criticalPatients.length})
                    </h3>
                    <ul className="space-y-1">
                      {currentReport.criticalPatients.map(p => (
                        <li key={p.id}>• {p.name} - Room {p.room || p.bed}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentReport.fallRisk && currentReport.fallRisk.length > 0 && (
                  <div>
                    <h3 className="font-bold text-orange-600 mb-2">
                      High Fall Risk ({currentReport.fallRisk.length})
                    </h3>
                    <ul className="space-y-1">
                      {currentReport.fallRisk.map(p => (
                        <li key={p.id}>• {p.name} - Room {p.room} (Score: {p.fallRisk})</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentReport.medicationChanges && currentReport.medicationChanges.length > 0 && (
                  <div>
                    <h3 className="font-bold text-blue-600 mb-2">
                      Medication Changes ({currentReport.medicationChanges.length})
                    </h3>
                    <ul className="space-y-1">
                      {currentReport.medicationChanges.map(p => (
                        <li key={p.id}>• {p.name} - Room {p.room || p.bed}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentReport.newAdmissions && currentReport.newAdmissions.length > 0 && (
                  <div>
                    <h3 className="font-bold text-green-600 mb-2">
                      New Admissions ({currentReport.newAdmissions.length})
                    </h3>
                    <ul className="space-y-1">
                      {currentReport.newAdmissions.map(p => (
                        <li key={p.id}>• {p.name} - Room {p.room || p.bed}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentReport.generalNotes && (
                  <div>
                    <h3 className="font-bold mb-2">General Notes</h3>
                    <p className="whitespace-pre-wrap">{currentReport.generalNotes}</p>
                  </div>
                )}

                <div className="border-t pt-4 text-sm text-gray-500">
                  <p>Generated: {new Date().toLocaleString()}</p>
                  <p>Geriatrics Platform Pro - Shaare Zedek Medical Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Previous Reports */}
      {savedReports.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Previous Reports' : 'דוחות קודמים'}
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedReports.slice(0, 10).map(report => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
                <div>
                  <p className="font-medium">
                    {report.date} - {report.shiftType} Shift
                  </p>
                  <p className="text-sm text-gray-600">
                    By: {report.nurseOut || 'Unknown'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentReport(report);
                    setShowPreview(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {language === 'en' ? 'View' : 'צפה'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}