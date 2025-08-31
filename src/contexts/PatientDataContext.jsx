// Shared Patient Data Context Provider
import React, { createContext, useContext, useState, useEffect } from 'react';

const PatientDataContext = createContext();

export const usePatientData = () => {
  const context = useContext(PatientDataContext);
  if (!context) {
    throw new Error('usePatientData must be used within PatientDataProvider');
  }
  return context;
};

export const PatientDataProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(null);
  const [sharedData, setSharedData] = useState({});
  const [dataExports, setDataExports] = useState([]);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('currentPatient');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPatientData(parsed);
      }

      const exports = sessionStorage.getItem('dataExports');
      if (exports) {
        setDataExports(JSON.parse(exports));
      }
    } catch (error) {
      console.error('Error loading patient data from storage:', error);
    }
  }, []);

  // Save to sessionStorage when data changes
  useEffect(() => {
    if (patientData) {
      try {
        sessionStorage.setItem('currentPatient', JSON.stringify(patientData));
        
        // Also broadcast to other tabs
        const channel = new BroadcastChannel('patient-data');
        channel.postMessage({ type: 'update', data: patientData });
        channel.close();
      } catch (error) {
        console.error('Error saving patient data:', error);
      }
    }
  }, [patientData]);

  // Listen for updates from other tabs
  useEffect(() => {
    const channel = new BroadcastChannel('patient-data');
    
    channel.onmessage = (event) => {
      if (event.data.type === 'update') {
        setPatientData(event.data.data);
      }
    };

    return () => channel.close();
  }, []);

  const updatePatientData = (data) => {
    setPatientData(prev => ({
      ...prev,
      ...data,
      lastUpdated: Date.now()
    }));
  };

  const clearPatientData = () => {
    setPatientData(null);
    sessionStorage.removeItem('currentPatient');
    
    const channel = new BroadcastChannel('patient-data');
    channel.postMessage({ type: 'clear' });
    channel.close();
  };

  const exportData = (format = 'json') => {
    if (!patientData) return null;

    const timestamp = new Date().toISOString();
    const exportData = {
      ...patientData,
      exportedAt: timestamp,
      version: '1.0'
    };

    let result;
    
    switch (format) {
      case 'json':
        result = JSON.stringify(exportData, null, 2);
        break;
      
      case 'csv':
        // Convert to CSV format
        const csvRows = [];
        csvRows.push('Field,Value');
        Object.entries(exportData).forEach(([key, value]) => {
          if (typeof value === 'object') {
            csvRows.push(`"${key}","${JSON.stringify(value).replace(/"/g, '""')}"`);
          } else {
            csvRows.push(`"${key}","${value}"`);
          }
        });
        result = csvRows.join('\n');
        break;
      
      case 'text':
        // Human-readable text format
        result = `Patient Data Export - ${timestamp}\n`;
        result += '=' .repeat(50) + '\n\n';
        
        Object.entries(exportData).forEach(([key, value]) => {
          const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          if (typeof value === 'object') {
            result += `${label}:\n`;
            Object.entries(value).forEach(([subKey, subValue]) => {
              result += `  - ${subKey}: ${subValue}\n`;
            });
          } else {
            result += `${label}: ${value}\n`;
          }
        });
        break;
      
      default:
        result = exportData;
    }

    // Save to export history
    const exportRecord = {
      timestamp,
      format,
      data: result
    };
    
    const newExports = [...dataExports, exportRecord].slice(-10); // Keep last 10 exports
    setDataExports(newExports);
    sessionStorage.setItem('dataExports', JSON.stringify(newExports));

    return result;
  };

  const downloadExport = (format = 'json') => {
    const data = exportData(format);
    if (!data) return;

    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 
            format === 'csv' ? 'text/csv' : 'text/plain' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-data-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const value = {
    patientData,
    updatePatientData,
    clearPatientData,
    exportData,
    downloadExport,
    dataExports,
    sharedData,
    setSharedData
  };

  return (
    <PatientDataContext.Provider value={value}>
      {children}
    </PatientDataContext.Provider>
  );
};