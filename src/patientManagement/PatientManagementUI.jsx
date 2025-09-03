// Patient Management UI Component
// Comprehensive patient tracking interface for geriatrics ward

import React, { useState, useEffect } from 'react';
import PatientManager from './PatientList.js';

export const PatientManagementTab = () => {
  const [patientManager] = useState(() => new PatientManager());
  const [activePatients, setActivePatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [activeView, setActiveView] = useState('census'); // census, patient-detail, add-patient
  const [censusSummary, setCensusSummary] = useState(null);

  useEffect(() => {
    refreshPatientList();
  }, [patientManager]);

  const refreshPatientList = () => {
    setActivePatients(patientManager.getActivePatients());
    setCensusSummary(patientManager.getCensusSummary());
  };

  const handleAddPatient = (patientData) => {
    patientManager.addPatient(patientData);
    refreshPatientList();
    setShowAddPatient(false);
  };

  const handleUpdatePatient = (patientId, updates) => {
    patientManager.updatePatient(patientId, updates);
    refreshPatientList();
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient(patientManager.getPatient(patientId));
    }
  };

  return (
    <div>
      {/* Header with navigation */}
      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#667eea', display: 'flex', alignItems: 'center' }}>
          🏥 Patient Management System
        </h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveView('census')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeView === 'census' ? '#667eea' : '#f8f9fa',
              color: activeView === 'census' ? 'white' : '#667eea',
              border: `1px solid ${activeView === 'census' ? '#667eea' : '#e9ecef'}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📋 Census View
          </button>
          <button
            onClick={() => setShowAddPatient(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + Add Patient
          </button>
        </div>
      </div>

      {/* Census View */}
      {activeView === 'census' && (
        <CensusView 
          patients={activePatients}
          summary={censusSummary}
          onPatientSelect={(patient) => {
            setSelectedPatient(patient);
            setActiveView('patient-detail');
          }}
          patientManager={patientManager}
          onRefresh={refreshPatientList}
        />
      )}

      {/* Patient Detail View */}
      {activeView === 'patient-detail' && selectedPatient && (
        <PatientDetailView
          patient={selectedPatient}
          patientManager={patientManager}
          onUpdate={handleUpdatePatient}
          onBack={() => setActiveView('census')}
        />
      )}

      {/* Add Patient Modal */}
      {showAddPatient && (
        <AddPatientModal
          onAdd={handleAddPatient}
          onCancel={() => setShowAddPatient(false)}
        />
      )}
    </div>
  );
};

// Census View Component
const CensusView = ({ patients, summary, onPatientSelect, patientManager, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = !searchQuery || 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.room.includes(searchQuery) ||
      patient.mrn.includes(searchQuery);

    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'high-priority' && (
        patient.problemList.some(p => p.priority === 'high') ||
        patient.codeStatus.includes('DNR')
      )) ||
      (filterBy === 'discharge-today' && patient.dischargePlan.targetDate === new Date().toISOString().split('T')[0]);

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Census Summary */}
      {summary && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d4fc' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>📊 Census Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <div style={{ textAlign: 'center', padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
              <strong>{summary.totalPatients}</strong><br/>
              <small>Total Patients</small>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
              <strong>{summary.highPriorityPatients.length}</strong><br/>
              <small>High Priority</small>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
              <strong>{summary.dischargesPlanned.length}</strong><br/>
              <small>Discharges Today</small>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
              <strong>{summary.newAdmissions.length}</strong><br/>
              <small>New Admits (3d)</small>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search patients (name, room, MRN)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="all">All Patients</option>
          <option value="high-priority">High Priority</option>
          <option value="discharge-today">Discharge Today</option>
        </select>
      </div>

      {/* Patient List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '15px' }}>
        {filteredPatients.map(patient => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => onPatientSelect(patient)}
            patientManager={patientManager}
          />
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No patients found matching your criteria.
        </div>
      )}
    </div>
  );
};

// Patient Card Component
const PatientCard = ({ patient, onClick, patientManager }) => {
  const dayOfStay = patientManager.calculateDayOfStay(patient.admissionDate);
  const isHighPriority = patient.problemList.some(p => p.priority === 'high') || patient.codeStatus.includes('DNR');
  const hasDischargeToday = patient.dischargePlan.targetDate === new Date().toISOString().split('T')[0];

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        border: `2px solid ${isHighPriority ? '#dc3545' : hasDischargeToday ? '#28a745' : '#e9ecef'}`,
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <h4 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '16px' }}>
            {patient.name} ({patient.age}{patient.gender ? `, ${patient.gender}` : ''})
          </h4>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            Room {patient.room}{patient.bed ? `, Bed ${patient.bed}` : ''} • MRN: {patient.mrn}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ 
            padding: '2px 8px', 
            backgroundColor: dayOfStay > 14 ? '#dc3545' : dayOfStay > 7 ? '#ffc107' : '#28a745',
            color: 'white', 
            fontSize: '12px', 
            borderRadius: '4px' 
          }}>
            Day {dayOfStay}
          </span>
        </div>
      </div>

      {/* Primary Diagnosis */}
      <div style={{ marginBottom: '10px' }}>
        <strong style={{ fontSize: '14px', color: '#667eea' }}>Primary Dx:</strong>
        <span style={{ fontSize: '14px', marginLeft: '5px' }}>{patient.primaryDiagnosis || 'Not specified'}</span>
      </div>

      {/* Key Information */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
        <div>
          <strong>Attending:</strong><br/>
          <span style={{ color: '#666' }}>{patient.attending || 'TBD'}</span>
        </div>
        <div>
          <strong>Code Status:</strong><br/>
          <span style={{ color: patient.codeStatus.includes('DNR') ? '#dc3545' : '#666' }}>
            {patient.codeStatus || 'Not documented'}
          </span>
        </div>
      </div>

      {/* Active Problems Count */}
      <div style={{ marginTop: '10px', fontSize: '13px' }}>
        <strong>Active Problems:</strong> {patient.problemList.filter(p => p.status === 'active').length}
        {patient.problemList.some(p => p.priority === 'high') && (
          <span style={{ marginLeft: '10px', padding: '1px 6px', backgroundColor: '#dc3545', color: 'white', fontSize: '11px', borderRadius: '3px' }}>
            HIGH PRIORITY
          </span>
        )}
      </div>

      {/* Discharge Plan */}
      {patient.dischargePlan.targetDate && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#28a745' }}>
          📅 Discharge planned: {new Date(patient.dischargePlan.targetDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

// Patient Detail View Component
const PatientDetailView = ({ patient, patientManager, onUpdate, onBack }) => {
  const [activeDetailTab, setActiveDetailTab] = useState('overview');
  const [editingField, setEditingField] = useState(null);

  return (
    <div>
      {/* Patient Header */}
      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
          <div>
            <h2 style={{ margin: '0 0 5px 0', color: '#667eea' }}>
              {patient.name} ({patient.age}, {patient.gender})
            </h2>
            <p style={{ margin: '0', color: '#666' }}>
              Room {patient.room} • MRN: {patient.mrn} • Day {patientManager.calculateDayOfStay(patient.admissionDate)}
            </p>
          </div>
          <button
            onClick={onBack}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Back to Census
          </button>
        </div>

        {/* Detail Navigation */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { key: 'overview', label: '📊 Overview' },
            { key: 'problems', label: '🔍 Problems' },
            { key: 'medications', label: '💊 Medications' },
            { key: 'assessments', label: '📋 Assessments' },
            { key: 'discharge', label: '🏠 Discharge' },
            { key: 'notes', label: '📝 Notes' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveDetailTab(tab.key)}
              style={{
                padding: '6px 12px',
                backgroundColor: activeDetailTab === tab.key ? '#667eea' : '#f8f9fa',
                color: activeDetailTab === tab.key ? 'white' : '#667eea',
                border: `1px solid ${activeDetailTab === tab.key ? '#667eea' : '#e9ecef'}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeDetailTab === 'overview' && (
        <PatientOverview patient={patient} onUpdate={onUpdate} />
      )}
      {activeDetailTab === 'problems' && (
        <ProblemListView patient={patient} patientManager={patientManager} onUpdate={onUpdate} />
      )}
      {activeDetailTab === 'medications' && (
        <MedicationView patient={patient} patientManager={patientManager} onUpdate={onUpdate} />
      )}
      {activeDetailTab === 'assessments' && (
        <AssessmentsView patient={patient} onUpdate={onUpdate} />
      )}
      {activeDetailTab === 'discharge' && (
        <DischargePlanView patient={patient} onUpdate={onUpdate} />
      )}
      {activeDetailTab === 'notes' && (
        <NotesView patient={patient} patientManager={patientManager} onUpdate={onUpdate} />
      )}
    </div>
  );
};

// Patient Overview Component
const PatientOverview = ({ patient, onUpdate }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {/* Basic Information */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>👤 Demographics</h3>
        <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
          <div><strong>Name:</strong> {patient.name}</div>
          <div><strong>Age:</strong> {patient.age}</div>
          <div><strong>Gender:</strong> {patient.gender}</div>
          <div><strong>MRN:</strong> {patient.mrn}</div>
          <div><strong>Room:</strong> {patient.room} {patient.bed && `Bed ${patient.bed}`}</div>
          <div><strong>Admission Date:</strong> {new Date(patient.admissionDate).toLocaleDateString()}</div>
          <div><strong>Attending:</strong> {patient.attending}</div>
        </div>
      </div>

      {/* Diagnoses */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>🔬 Diagnoses</h3>
        <div style={{ fontSize: '14px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Primary:</strong><br/>
            {patient.primaryDiagnosis || 'Not documented'}
          </div>
          {patient.secondaryDiagnoses.length > 0 && (
            <div>
              <strong>Secondary:</strong><br/>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {patient.secondaryDiagnoses.map((dx, idx) => (
                  <li key={idx}>{dx}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Code Status & Goals */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>🎯 Goals of Care</h3>
        <div style={{ fontSize: '14px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Code Status:</strong><br/>
            <span style={{ color: patient.codeStatus.includes('DNR') ? '#dc3545' : '#333' }}>
              {patient.codeStatus || 'Not documented'}
            </span>
          </div>
          <div>
            <strong>Goals:</strong><br/>
            {patient.goalsOfCare || 'Not documented'}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>📞 Emergency Contact</h3>
        {patient.emergencyContact.name ? (
          <div style={{ fontSize: '14px' }}>
            <div><strong>Name:</strong> {patient.emergencyContact.name}</div>
            <div><strong>Relationship:</strong> {patient.emergencyContact.relationship}</div>
            <div><strong>Phone:</strong> {patient.emergencyContact.phone}</div>
            <div><strong>Language:</strong> {patient.emergencyContact.language}</div>
          </div>
        ) : (
          <div style={{ color: '#666', fontStyle: 'italic' }}>No emergency contact documented</div>
        )}
      </div>
    </div>
  );
};

// Problem List View Component
const ProblemListView = ({ patient, patientManager, onUpdate }) => {
  const [showAddProblem, setShowAddProblem] = useState(false);
  const [newProblem, setNewProblem] = useState({
    description: '',
    status: 'active',
    priority: 'medium',
    notes: ''
  });

  const handleAddProblem = () => {
    if (newProblem.description.trim()) {
      patientManager.addProblem(patient.id, newProblem);
      onUpdate(patient.id, {});
      setNewProblem({ description: '', status: 'active', priority: 'medium', notes: '' });
      setShowAddProblem(false);
    }
  };

  const activeProblems = patient.problemList.filter(p => p.status === 'active');
  const resolvedProblems = patient.problemList.filter(p => p.status === 'resolved');

  return (
    <div>
      {/* Add Problem Button */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#667eea' }}>🔍 Problem List</h3>
        <button
          onClick={() => setShowAddProblem(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Add Problem
        </button>
      </div>

      {/* Active Problems */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#dc3545' }}>Active Problems ({activeProblems.length})</h4>
        {activeProblems.length === 0 ? (
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px', color: '#666', fontStyle: 'italic' }}>
            No active problems documented
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {activeProblems.map(problem => (
              <div key={problem.id} style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: `2px solid ${problem.priority === 'high' ? '#dc3545' : problem.priority === 'medium' ? '#ffc107' : '#28a745'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h5 style={{ margin: '0', color: '#333' }}>{problem.description}</h5>
                  <span style={{ 
                    padding: '2px 8px', 
                    backgroundColor: problem.priority === 'high' ? '#dc3545' : problem.priority === 'medium' ? '#ffc107' : '#28a745',
                    color: 'white', 
                    fontSize: '12px', 
                    borderRadius: '4px' 
                  }}>
                    {problem.priority.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <div>Onset: {new Date(problem.onsetDate).toLocaleDateString()}</div>
                  {problem.notes && <div style={{ marginTop: '5px' }}>Notes: {problem.notes}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Problems */}
      {resolvedProblems.length > 0 && (
        <div>
          <h4 style={{ color: '#28a745' }}>Resolved Problems ({resolvedProblems.length})</h4>
          <div style={{ display: 'grid', gap: '10px' }}>
            {resolvedProblems.map(problem => (
              <div key={problem.id} style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', opacity: 0.7 }}>
                <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>{problem.description}</h5>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Resolved on: {problem.lastUpdated ? new Date(problem.lastUpdated).toLocaleDateString() : 'Unknown'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Problem Modal */}
      {showAddProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Add New Problem</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
              <input
                type="text"
                value={newProblem.description}
                onChange={(e) => setNewProblem({...newProblem, description: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter problem description..."
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Priority:</label>
                <select
                  value={newProblem.priority}
                  onChange={(e) => setNewProblem({...newProblem, priority: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
                <select
                  value={newProblem.status}
                  onChange={(e) => setNewProblem({...newProblem, status: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="active">Active</option>
                  <option value="chronic">Chronic</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Notes:</label>
              <textarea
                value={newProblem.notes}
                onChange={(e) => setNewProblem({...newProblem, notes: e.target.value})}
                style={{ width: '100%', minHeight: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Additional notes..."
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddProblem(false)}
                style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddProblem}
                style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add Problem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Patient Modal Component
const AddPatientModal = ({ onAdd, onCancel }) => {
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    mrn: '',
    room: '',
    attending: '',
    primaryDiagnosis: '',
    codeStatus: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      language: 'Hebrew'
    }
  });

  const handleAdd = () => {
    if (newPatient.name && newPatient.room) {
      onAdd(newPatient);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Add New Patient</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name *</label>
            <input
              type="text"
              value={newPatient.name}
              onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>MRN</label>
            <input
              type="text"
              value={newPatient.mrn}
              onChange={(e) => setNewPatient({...newPatient, mrn: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Age</label>
            <input
              type="number"
              value={newPatient.age}
              onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender</label>
            <select
              value={newPatient.gender}
              onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Room *</label>
            <input
              type="text"
              value={newPatient.room}
              onChange={(e) => setNewPatient({...newPatient, room: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Attending</label>
            <input
              type="text"
              value={newPatient.attending}
              onChange={(e) => setNewPatient({...newPatient, attending: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Primary Diagnosis</label>
          <input
            type="text"
            value={newPatient.primaryDiagnosis}
            onChange={(e) => setNewPatient({...newPatient, primaryDiagnosis: e.target.value})}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Code Status</label>
          <select
            value={newPatient.codeStatus}
            onChange={(e) => setNewPatient({...newPatient, codeStatus: e.target.value})}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Select Code Status</option>
            <option value="Full Code">Full Code</option>
            <option value="DNR">DNR</option>
            <option value="DNI">DNI</option>
            <option value="DNR/DNI">DNR/DNI</option>
            <option value="Comfort Care">Comfort Care</option>
          </select>
        </div>

        <h4 style={{ marginBottom: '10px' }}>Emergency Contact</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
            <input
              type="text"
              value={newPatient.emergencyContact.name}
              onChange={(e) => setNewPatient({
                ...newPatient,
                emergencyContact: {...newPatient.emergencyContact, name: e.target.value}
              })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
            <input
              type="text"
              value={newPatient.emergencyContact.phone}
              onChange={(e) => setNewPatient({
                ...newPatient,
                emergencyContact: {...newPatient.emergencyContact, phone: e.target.value}
              })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Relationship</label>
            <input
              type="text"
              value={newPatient.emergencyContact.relationship}
              onChange={(e) => setNewPatient({
                ...newPatient,
                emergencyContact: {...newPatient.emergencyContact, relationship: e.target.value}
              })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Language</label>
            <select
              value={newPatient.emergencyContact.language}
              onChange={(e) => setNewPatient({
                ...newPatient,
                emergencyContact: {...newPatient.emergencyContact, language: e.target.value}
              })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="Hebrew">Hebrew</option>
              <option value="Arabic">Arabic</option>
              <option value="English">English</option>
              <option value="Russian">Russian</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!newPatient.name || !newPatient.room}
            style={{
              padding: '10px 20px',
              backgroundColor: !newPatient.name || !newPatient.room ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !newPatient.name || !newPatient.room ? 'not-allowed' : 'pointer'
            }}
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

// Medication Management Component
const MedicationView = ({ patient, patientManager, onUpdate }) => {
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showReconciliation, setShowReconciliation] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dose: '',
    route: 'PO',
    frequency: '',
    indication: '',
    prescriber: '',
    notes: ''
  });

  const handleAddMedication = () => {
    if (newMedication.name.trim()) {
      patientManager.addMedication(patient.id, newMedication);
      onUpdate(patient.id, {});
      setNewMedication({
        name: '',
        dose: '',
        route: 'PO',
        frequency: '',
        indication: '',
        prescriber: '',
        notes: ''
      });
      setShowAddMedication(false);
    }
  };

  const activeMedications = patient.medications.filter(med => med.status === 'active');
  const discontinuedMedications = patient.medications.filter(med => med.status === 'discontinued');

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#667eea' }}>💊 Medication Management</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowReconciliation(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffc107',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📋 Reconcile
          </button>
          <button
            onClick={() => setShowAddMedication(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + Add Medication
          </button>
        </div>
      </div>

      {/* Allergies */}
      {patient.allergies.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px', border: '1px solid #f5c6cb' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#721c24' }}>⚠️ Allergies</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {patient.allergies.map((allergy, idx) => (
              <span key={idx} style={{ padding: '4px 8px', backgroundColor: '#721c24', color: 'white', fontSize: '12px', borderRadius: '4px' }}>
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Active Medications */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#28a745', marginBottom: '15px' }}>Active Medications ({activeMedications.length})</h4>
        {activeMedications.length === 0 ? (
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px', color: '#666', fontStyle: 'italic' }}>
            No active medications documented
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {activeMedications.map(medication => (
              <div key={medication.id} style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e9ecef' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h5 style={{ margin: '0', color: '#333', fontSize: '16px' }}>{medication.name}</h5>
                  <span style={{ 
                    padding: '2px 8px', 
                    backgroundColor: '#28a745',
                    color: 'white', 
                    fontSize: '12px', 
                    borderRadius: '4px' 
                  }}>
                    ACTIVE
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', fontSize: '14px' }}>
                  <div><strong>Dose:</strong> {medication.dose || 'Not specified'}</div>
                  <div><strong>Route:</strong> {medication.route || 'Not specified'}</div>
                  <div><strong>Frequency:</strong> {medication.frequency || 'Not specified'}</div>
                  <div><strong>Indication:</strong> {medication.indication || 'Not specified'}</div>
                </div>
                {medication.notes && (
                  <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '13px' }}>
                    <strong>Notes:</strong> {medication.notes}
                  </div>
                )}
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                  Started: {new Date(medication.startDate).toLocaleDateString()} | Prescriber: {medication.prescriber || 'Unknown'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discontinued Medications */}
      {discontinuedMedications.length > 0 && (
        <div>
          <h4 style={{ color: '#6c757d', marginBottom: '15px' }}>Discontinued Medications ({discontinuedMedications.length})</h4>
          <div style={{ display: 'grid', gap: '10px' }}>
            {discontinuedMedications.map(medication => (
              <div key={medication.id} style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', opacity: 0.7, border: '1px solid #e9ecef' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <h5 style={{ margin: '0', color: '#333' }}>{medication.name} {medication.dose}</h5>
                  <span style={{ fontSize: '12px', color: '#dc3545' }}>DISCONTINUED</span>
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  Duration: {new Date(medication.startDate).toLocaleDateString()} - {medication.endDate ? new Date(medication.endDate).toLocaleDateString() : 'Unknown'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddMedication && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '600px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Add New Medication</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Medication Name *</label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="e.g., Metformin"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Dose</label>
                <input
                  type="text"
                  value={newMedication.dose}
                  onChange={(e) => setNewMedication({...newMedication, dose: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="e.g., 500mg"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Route</label>
                <select
                  value={newMedication.route}
                  onChange={(e) => setNewMedication({...newMedication, route: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="PO">PO (Oral)</option>
                  <option value="IV">IV (Intravenous)</option>
                  <option value="IM">IM (Intramuscular)</option>
                  <option value="SC">SC (Subcutaneous)</option>
                  <option value="SL">SL (Sublingual)</option>
                  <option value="PR">PR (Rectal)</option>
                  <option value="Topical">Topical</option>
                  <option value="Inhaled">Inhaled</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Frequency</label>
                <input
                  type="text"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="e.g., BID, TID, Q6H"
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Indication</label>
              <input
                type="text"
                value={newMedication.indication}
                onChange={(e) => setNewMedication({...newMedication, indication: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="e.g., Diabetes mellitus type 2"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Prescriber</label>
              <input
                type="text"
                value={newMedication.prescriber}
                onChange={(e) => setNewMedication({...newMedication, prescriber: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Prescribing physician"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Notes</label>
              <textarea
                value={newMedication.notes}
                onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                style={{ width: '100%', minHeight: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Additional notes or instructions..."
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddMedication(false)}
                style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedication}
                disabled={!newMedication.name.trim()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: !newMedication.name.trim() ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: !newMedication.name.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                Add Medication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AssessmentsView = ({ patient, onUpdate }) => {
  const [assessmentScores, setAssessmentScores] = useState({
    mmse: '',
    moca: '',
    gds: '',
    iadl: '',
    adl: '',
    tug: '',
    morse: '',
    braden: '',
    mna: ''
  });

  const handleScoreUpdate = (assessment, score) => {
    const updatedScores = { ...assessmentScores, [assessment]: score };
    setAssessmentScores(updatedScores);
    // Update patient record
    onUpdate(patient.id, {
      geriatricAssessments: {
        ...patient.geriatricAssessments,
        [assessment]: { score, date: new Date().toISOString(), assessor: 'Current User' }
      }
    });
  };

  const assessmentTools = [
    {
      id: 'mmse',
      name: 'MMSE (Mini-Mental State Exam)',
      description: 'Cognitive screening tool',
      range: '0-30',
      interpretation: '≥24: Normal, 18-23: Mild CI, <18: Severe CI',
      icon: '🧠'
    },
    {
      id: 'moca',
      name: 'MoCA (Montreal Cognitive Assessment)',
      description: 'Detailed cognitive assessment',
      range: '0-30',
      interpretation: '≥26: Normal, <26: Cognitive impairment',
      icon: '🧩'
    },
    {
      id: 'gds',
      name: 'GDS-15 (Geriatric Depression Scale)',
      description: 'Depression screening',
      range: '0-15',
      interpretation: '0-4: Normal, 5-8: Mild, 9-11: Moderate, 12-15: Severe',
      icon: '😔'
    },
    {
      id: 'adl',
      name: 'Katz ADL Scale',
      description: 'Activities of Daily Living',
      range: '0-6',
      interpretation: '6: Independent, 4-5: Moderate dependency, 0-3: High dependency',
      icon: '🏠'
    },
    {
      id: 'iadl',
      name: 'Lawton IADL Scale',
      description: 'Instrumental Activities of Daily Living',
      range: '0-8',
      interpretation: '8: Independent, <8: Some degree of dependency',
      icon: '🛒'
    },
    {
      id: 'tug',
      name: 'Timed Up & Go Test',
      description: 'Mobility and fall risk assessment',
      range: 'Seconds',
      interpretation: '<10s: Normal, 10-20s: Frail, >20s: High fall risk',
      icon: '⏱️'
    },
    {
      id: 'morse',
      name: 'Morse Fall Scale',
      description: 'Fall risk assessment',
      range: '0-125',
      interpretation: '0-24: Low risk, 25-50: Moderate risk, >51: High risk',
      icon: '⚠️'
    },
    {
      id: 'braden',
      name: 'Braden Scale',
      description: 'Pressure ulcer risk',
      range: '6-23',
      interpretation: '19-23: Low risk, 15-18: Moderate, 13-14: High, ≤12: Very high',
      icon: '🩹'
    },
    {
      id: 'mna',
      name: 'MNA (Mini Nutritional Assessment)',
      description: 'Nutritional screening',
      range: '0-14',
      interpretation: '12-14: Normal, 8-11: At risk, 0-7: Malnourished',
      icon: '🥗'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#667eea' }}>📋 Geriatric Assessments</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Comprehensive geriatric assessment tools for functional, cognitive, and social evaluation
        </p>
      </div>

      {/* Assessment Summary */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d4fc' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>Assessment Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {patient.fallRisk.score && (
            <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', textAlign: 'center' }}>
              <strong>Fall Risk</strong><br/>
              <span style={{ color: patient.fallRisk.level === 'high' ? '#dc3545' : patient.fallRisk.level === 'moderate' ? '#ffc107' : '#28a745' }}>
                {patient.fallRisk.level.toUpperCase()}
              </span>
            </div>
          )}
          {patient.deliriumRisk.risk && (
            <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', textAlign: 'center' }}>
              <strong>Delirium Risk</strong><br/>
              <span style={{ color: patient.deliriumRisk.risk === 'high' ? '#dc3545' : '#28a745' }}>
                {patient.deliriumRisk.risk.toUpperCase()}
              </span>
            </div>
          )}
          {patient.nutritionRisk.status && (
            <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', textAlign: 'center' }}>
              <strong>Nutrition</strong><br/>
              <span style={{ color: patient.nutritionRisk.status === 'malnourished' ? '#dc3545' : patient.nutritionRisk.status === 'at risk' ? '#ffc107' : '#28a745' }}>
                {patient.nutritionRisk.status.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Assessment Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {assessmentTools.map(tool => {
          const currentScore = patient.geriatricAssessments?.[tool.id]?.score || '';
          const lastAssessed = patient.geriatricAssessments?.[tool.id]?.date;

          return (
            <div key={tool.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e9ecef' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '24px', marginRight: '10px' }}>{tool.icon}</span>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{tool.name}</h4>
                  <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>{tool.description}</p>
                </div>
              </div>

              <div style={{ marginBottom: '15px', fontSize: '13px' }}>
                <div style={{ marginBottom: '5px' }}><strong>Range:</strong> {tool.range}</div>
                <div style={{ color: '#666' }}><strong>Interpretation:</strong> {tool.interpretation}</div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  Current Score:
                </label>
                <input
                  type="text"
                  value={currentScore}
                  onChange={(e) => handleScoreUpdate(tool.id, e.target.value)}
                  placeholder={`Enter score (${tool.range})`}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>

              {lastAssessed && (
                <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                  Last assessed: {new Date(lastAssessed).toLocaleDateString()}
                </div>
              )}

              {currentScore && (
                <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '13px' }}>
                  <strong>Score:</strong> {currentScore} 
                  {tool.id === 'tug' ? ' seconds' : ` / ${tool.range.split('-')[1] || tool.range}`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Functional Status Summary */}
      <div style={{ marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#667eea' }}>🏃‍♂️ Functional Status Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mobility:</label>
            <select
              value={patient.functionalStatus.mobility}
              onChange={(e) => onUpdate(patient.id, {
                functionalStatus: {
                  ...patient.functionalStatus,
                  mobility: e.target.value
                }
              })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Select mobility level</option>
              <option value="Independent">Independent</option>
              <option value="Walker">Walker</option>
              <option value="Wheelchair">Wheelchair</option>
              <option value="Bedbound">Bedbound</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cognitive Status:</label>
            <select
              value={patient.functionalStatus.cognitive}
              onChange={(e) => onUpdate(patient.id, {
                functionalStatus: {
                  ...patient.functionalStatus,
                  cognitive: e.target.value
                }
              })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Select cognitive status</option>
              <option value="Intact">Intact</option>
              <option value="Mild Impairment">Mild Impairment</option>
              <option value="Moderate Impairment">Moderate Impairment</option>
              <option value="Severe Impairment">Severe Impairment</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Social Support:</label>
            <select
              value={patient.functionalStatus.socialSupport}
              onChange={(e) => onUpdate(patient.id, {
                functionalStatus: {
                  ...patient.functionalStatus,
                  socialSupport: e.target.value
                }
              })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Select support level</option>
              <option value="Strong">Strong</option>
              <option value="Moderate">Moderate</option>
              <option value="Limited">Limited</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const DischargePlanView = ({ patient, onUpdate }) => {
  const [editingDischarge, setEditingDischarge] = useState(false);
  const [dischargeUpdates, setDischargeUpdates] = useState({
    targetDate: patient.dischargePlan.targetDate || '',
    disposition: patient.dischargePlan.disposition || '',
    requirements: patient.dischargePlan.requirements || [],
    barriers: patient.dischargePlan.barriers || []
  });
  const [newRequirement, setNewRequirement] = useState('');
  const [newBarrier, setNewBarrier] = useState('');

  const handleSaveDischarge = () => {
    onUpdate(patient.id, {
      dischargePlan: dischargeUpdates
    });
    setEditingDischarge(false);
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setDischargeUpdates({
        ...dischargeUpdates,
        requirements: [...dischargeUpdates.requirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setDischargeUpdates({
      ...dischargeUpdates,
      requirements: dischargeUpdates.requirements.filter((_, i) => i !== index)
    });
  };

  const addBarrier = () => {
    if (newBarrier.trim()) {
      setDischargeUpdates({
        ...dischargeUpdates,
        barriers: [...dischargeUpdates.barriers, newBarrier.trim()]
      });
      setNewBarrier('');
    }
  };

  const removeBarrier = (index) => {
    setDischargeUpdates({
      ...dischargeUpdates,
      barriers: dischargeUpdates.barriers.filter((_, i) => i !== index)
    });
  };

  const dispositionOptions = [
    { value: 'home', label: '🏠 Home', description: 'Patient returns to previous living situation' },
    { value: 'home-services', label: '🏠🔧 Home with Services', description: 'Home with home care, PT, or other services' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Family Care', description: 'Stay with family member' },
    { value: 'assisted-living', label: '🏢 Assisted Living', description: 'Assisted living facility' },
    { value: 'skilled-nursing', label: '🏥 Skilled Nursing', description: 'Long-term care facility' },
    { value: 'rehabilitation', label: '🏥💪 Rehabilitation', description: 'Inpatient rehabilitation facility' },
    { value: 'ltac', label: '🏥⏰ LTAC', description: 'Long-term acute care hospital' },
    { value: 'hospice', label: '🕊️ Hospice', description: 'Hospice care (home or facility)' },
    { value: 'other', label: '📋 Other', description: 'Other disposition' }
  ];

  const commonRequirements = [
    'Physical therapy evaluation',
    'Occupational therapy evaluation',
    'Home safety assessment',
    'Medication reconciliation',
    'Follow-up appointment scheduled',
    'Durable medical equipment',
    'Home health services',
    'Family education completed',
    'Transportation arranged'
  ];

  const commonBarriers = [
    'No family support',
    'Financial constraints',
    'Insurance authorization needed',
    'No suitable placement available',
    'Transportation issues',
    'Language barrier',
    'Patient refusing discharge plan',
    'Unstable housing situation',
    'Cognitive impairment affecting safety'
  ];

  const isDischargeReady = dischargeUpdates.targetDate && 
                          dischargeUpdates.disposition && 
                          dischargeUpdates.requirements.length > 0;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#667eea' }}>🏠 Discharge Planning</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {!editingDischarge ? (
            <button
              onClick={() => setEditingDischarge(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ✏️ Edit Plan
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditingDischarge(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDischarge}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                💾 Save Plan
              </button>
            </>
          )}
        </div>
      </div>

      {/* Discharge Status */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: isDischargeReady ? '#d4edda' : '#fff3cd', borderRadius: '8px', border: `1px solid ${isDischargeReady ? '#c3e6cb' : '#ffeeba'}` }}>
        <h4 style={{ margin: '0 0 10px 0', color: isDischargeReady ? '#155724' : '#856404' }}>
          {isDischargeReady ? '✅ Discharge Plan Complete' : '⏳ Discharge Plan In Progress'}
        </h4>
        <p style={{ margin: 0, fontSize: '14px', color: isDischargeReady ? '#155724' : '#856404' }}>
          {isDischargeReady 
            ? `Patient ready for discharge to ${dischargeUpdates.disposition} on ${new Date(dischargeUpdates.targetDate).toLocaleDateString()}`
            : 'Discharge plan requires completion of target date, disposition, and discharge requirements'
          }
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Discharge Plan Details */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#667eea' }}>📅 Discharge Plan</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Target Discharge Date:</label>
            {editingDischarge ? (
              <input
                type="date"
                value={dischargeUpdates.targetDate}
                onChange={(e) => setDischargeUpdates({...dischargeUpdates, targetDate: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            ) : (
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                {patient.dischargePlan.targetDate 
                  ? new Date(patient.dischargePlan.targetDate).toLocaleDateString()
                  : 'Not set'
                }
              </div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Disposition:</label>
            {editingDischarge ? (
              <select
                value={dischargeUpdates.disposition}
                onChange={(e) => setDischargeUpdates({...dischargeUpdates, disposition: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="">Select disposition</option>
                {dispositionOptions.map(option => (
                  <option key={option.value} value={option.label}>{option.label}</option>
                ))}
              </select>
            ) : (
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                {patient.dischargePlan.disposition || 'Not determined'}
              </div>
            )}
          </div>

          {/* Disposition Descriptions */}
          {editingDischarge && (
            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '4px', fontSize: '13px' }}>
              <strong>Disposition Options:</strong>
              {dispositionOptions.map(option => (
                <div key={option.value} style={{ margin: '5px 0' }}>
                  <strong>{option.label}:</strong> {option.description}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Family Contacts */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#667eea' }}>👨‍👩‍👧‍👦 Family Contacts</h4>
          
          {patient.emergencyContact.name && (
            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <strong>Primary Contact:</strong><br/>
              {patient.emergencyContact.name} ({patient.emergencyContact.relationship})<br/>
              📞 {patient.emergencyContact.phone}<br/>
              🗣️ {patient.emergencyContact.language}
            </div>
          )}

          {patient.familyContacts.length > 0 && (
            <div>
              <strong>Additional Contacts:</strong>
              {patient.familyContacts.map((contact, index) => (
                <div key={index} style={{ margin: '5px 0', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '13px' }}>
                  {contact.name} - {contact.relationship} - {contact.phone}
                </div>
              ))}
            </div>
          )}

          {!patient.emergencyContact.name && patient.familyContacts.length === 0 && (
            <div style={{ color: '#666', fontStyle: 'italic' }}>No family contacts documented</div>
          )}
        </div>
      </div>

      {/* Discharge Requirements */}
      <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: 0, color: '#667eea' }}>✅ Discharge Requirements</h4>
          {editingDischarge && (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add requirement..."
                style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
              />
              <button
                onClick={addRequirement}
                style={{ padding: '6px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                +
              </button>
            </div>
          )}
        </div>

        {editingDischarge && (
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ fontSize: '13px' }}>Common Requirements:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
              {commonRequirements.map(req => (
                <button
                  key={req}
                  onClick={() => setDischargeUpdates({
                    ...dischargeUpdates,
                    requirements: [...dischargeUpdates.requirements, req]
                  })}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#e7f3ff',
                    border: '1px solid #b3d4fc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  + {req}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '8px' }}>
          {(editingDischarge ? dischargeUpdates.requirements : patient.dischargePlan.requirements).map((requirement, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#d4edda', borderRadius: '4px', border: '1px solid #c3e6cb' }}>
              <span style={{ color: '#155724' }}>✅ {requirement}</span>
              {editingDischarge && (
                <button
                  onClick={() => removeRequirement(index)}
                  style={{ padding: '2px 6px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {(editingDischarge ? dischargeUpdates.requirements : patient.dischargePlan.requirements).length === 0 && (
          <div style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
            No discharge requirements documented
          </div>
        )}
      </div>

      {/* Discharge Barriers */}
      <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: 0, color: '#667eea' }}>🚧 Discharge Barriers</h4>
          {editingDischarge && (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <input
                type="text"
                value={newBarrier}
                onChange={(e) => setNewBarrier(e.target.value)}
                placeholder="Add barrier..."
                style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                onKeyPress={(e) => e.key === 'Enter' && addBarrier()}
              />
              <button
                onClick={addBarrier}
                style={{ padding: '6px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                +
              </button>
            </div>
          )}
        </div>

        {editingDischarge && (
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ fontSize: '13px' }}>Common Barriers:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
              {commonBarriers.map(barrier => (
                <button
                  key={barrier}
                  onClick={() => setDischargeUpdates({
                    ...dischargeUpdates,
                    barriers: [...dischargeUpdates.barriers, barrier]
                  })}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#f8d7da',
                    border: '1px solid #f5c6cb',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  + {barrier}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '8px' }}>
          {(editingDischarge ? dischargeUpdates.barriers : patient.dischargePlan.barriers).map((barrier, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px', border: '1px solid #f5c6cb' }}>
              <span style={{ color: '#721c24' }}>🚧 {barrier}</span>
              {editingDischarge && (
                <button
                  onClick={() => removeBarrier(index)}
                  style={{ padding: '2px 6px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {(editingDischarge ? dischargeUpdates.barriers : patient.dischargePlan.barriers).length === 0 && (
          <div style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
            No discharge barriers identified
          </div>
        )}
      </div>
    </div>
  );
};

const NotesView = ({ patient, patientManager, onUpdate }) => {
  const [activeNoteType, setActiveNoteType] = useState('daily');
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    author: '',
    service: 'Geriatrics'
  });
  const [showRoundingChecklist, setShowRoundingChecklist] = useState(false);
  const [roundingChecklist, setRoundingChecklist] = useState(null);

  const handleAddNote = () => {
    if (newNote.subjective || newNote.objective || newNote.assessment || newNote.plan) {
      patientManager.addProgressNote(patient.id, newNote);
      onUpdate(patient.id, {});
      setNewNote({
        subjective: '',
        objective: '',
        assessment: '',
        plan: '',
        author: '',
        service: 'Geriatrics'
      });
      setShowAddNote(false);
    }
  };

  const generateRoundingChecklist = () => {
    const checklist = patientManager.generateRoundingChecklist(patient.id);
    setRoundingChecklist(checklist);
    setShowRoundingChecklist(true);
  };

  const noteTypes = [
    { key: 'daily', label: '📝 Daily Progress', description: 'Daily progress notes and SOAP documentation' },
    { key: 'rounding', label: '🏥 Rounding Notes', description: 'Bedside rounding and teaching notes' },
    { key: 'discharge', label: '🏠 Discharge Summary', description: 'Discharge summaries and planning notes' }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#667eea' }}>📝 Clinical Notes & Documentation</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={generateRoundingChecklist}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📋 Generate Checklist
          </button>
          <button
            onClick={() => setShowAddNote(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + Add Progress Note
          </button>
        </div>
      </div>

      {/* Note Type Navigation */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {noteTypes.map(type => (
          <button
            key={type.key}
            onClick={() => setActiveNoteType(type.key)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeNoteType === type.key ? '#667eea' : '#f8f9fa',
              color: activeNoteType === type.key ? 'white' : '#667eea',
              border: `1px solid ${activeNoteType === type.key ? '#667eea' : '#e9ecef'}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            title={type.description}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Daily Progress Notes */}
      {activeNoteType === 'daily' && (
        <div>
          <h4 style={{ marginBottom: '15px', color: '#667eea' }}>📝 Daily Progress Notes</h4>
          {patient.dailyProgress.length === 0 ? (
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
              No daily progress notes documented
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {patient.dailyProgress
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((note, index) => (
                  <div key={note.id || index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e9ecef' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #e9ecef' }}>
                      <h5 style={{ margin: 0, color: '#333' }}>
                        SOAP Note - {new Date(note.date).toLocaleDateString()}
                      </h5>
                      <div style={{ fontSize: '13px', color: '#666' }}>
                        {note.author && `${note.author} • `}{note.service}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: '15px' }}>
                      {note.subjective && (
                        <div>
                          <strong style={{ color: '#667eea' }}>S (Subjective):</strong>
                          <p style={{ margin: '5px 0', fontSize: '14px', lineHeight: '1.5' }}>{note.subjective}</p>
                        </div>
                      )}
                      {note.objective && (
                        <div>
                          <strong style={{ color: '#667eea' }}>O (Objective):</strong>
                          <p style={{ margin: '5px 0', fontSize: '14px', lineHeight: '1.5' }}>{note.objective}</p>
                        </div>
                      )}
                      {note.assessment && (
                        <div>
                          <strong style={{ color: '#667eea' }}>A (Assessment):</strong>
                          <p style={{ margin: '5px 0', fontSize: '14px', lineHeight: '1.5' }}>{note.assessment}</p>
                        </div>
                      )}
                      {note.plan && (
                        <div>
                          <strong style={{ color: '#667eea' }}>P (Plan):</strong>
                          <p style={{ margin: '5px 0', fontSize: '14px', lineHeight: '1.5' }}>{note.plan}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      )}

      {/* Rounding Notes */}
      {activeNoteType === 'rounding' && (
        <div>
          <h4 style={{ marginBottom: '15px', color: '#667eea' }}>🏥 Rounding Notes</h4>
          {patient.roundingNotes.length === 0 ? (
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
              No rounding notes documented
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {patient.roundingNotes
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((note, index) => (
                  <div key={note.id || index} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e9ecef' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <strong style={{ color: '#333' }}>Rounding Note - {new Date(note.date).toLocaleDateString()}</strong>
                      <span style={{ fontSize: '13px', color: '#666' }}>{note.author}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{note.content}</p>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      )}

      {/* Discharge Summary */}
      {activeNoteType === 'discharge' && (
        <div>
          <h4 style={{ marginBottom: '15px', color: '#667eea' }}>🏠 Discharge Summary</h4>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Patient Summary</h5>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p><strong>{patient.name}</strong> is a {patient.age}-year-old {patient.gender} admitted on {new Date(patient.admissionDate).toLocaleDateString()} with primary diagnosis of {patient.primaryDiagnosis || 'not specified'}.</p>
                <p><strong>Length of Stay:</strong> {patientManager.calculateDayOfStay(patient.admissionDate)} days</p>
                <p><strong>Attending:</strong> {patient.attending || 'Not specified'}</p>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Active Problems</h5>
              {patient.problemList.filter(p => p.status === 'active').length === 0 ? (
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#666' }}>No active problems documented</p>
              ) : (
                <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '14px' }}>
                  {patient.problemList.filter(p => p.status === 'active').map((problem, idx) => (
                    <li key={idx} style={{ marginBottom: '5px' }}>
                      {problem.description} 
                      {problem.priority === 'high' && <span style={{ marginLeft: '10px', padding: '2px 6px', backgroundColor: '#dc3545', color: 'white', fontSize: '11px', borderRadius: '3px' }}>HIGH</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Discharge Plan</h5>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p><strong>Disposition:</strong> {patient.dischargePlan.disposition || 'Not determined'}</p>
                <p><strong>Target Date:</strong> {patient.dischargePlan.targetDate ? new Date(patient.dischargePlan.targetDate).toLocaleDateString() : 'Not set'}</p>
                {patient.dischargePlan.requirements.length > 0 && (
                  <div>
                    <strong>Requirements:</strong>
                    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                      {patient.dischargePlan.requirements.map((req, idx) => (
                        <li key={idx} style={{ marginBottom: '3px' }}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Medications at Discharge</h5>
              {patient.medications.filter(med => med.status === 'active').length === 0 ? (
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#666' }}>No active medications</p>
              ) : (
                <div style={{ fontSize: '14px' }}>
                  {patient.medications.filter(med => med.status === 'active').map((med, idx) => (
                    <div key={idx} style={{ marginBottom: '8px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                      <strong>{med.name}</strong> {med.dose} {med.route} {med.frequency}
                      {med.indication && <div style={{ fontSize: '13px', color: '#666' }}>Indication: {med.indication}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Follow-up Care</h5>
              <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                Follow-up recommendations and instructions to be added by attending physician.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Progress Note Modal */}
      {showAddNote && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Add Progress Note (SOAP Format)</h3>
            
            <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#667eea' }}>S - Subjective:</label>
                <textarea
                  value={newNote.subjective}
                  onChange={(e) => setNewNote({...newNote, subjective: e.target.value})}
                  style={{ width: '100%', minHeight: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="Patient's symptoms, complaints, concerns in their own words..."
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#667eea' }}>O - Objective:</label>
                <textarea
                  value={newNote.objective}
                  onChange={(e) => setNewNote({...newNote, objective: e.target.value})}
                  style={{ width: '100%', minHeight: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="Vital signs, physical exam findings, lab results, diagnostic findings..."
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#667eea' }}>A - Assessment:</label>
                <textarea
                  value={newNote.assessment}
                  onChange={(e) => setNewNote({...newNote, assessment: e.target.value})}
                  style={{ width: '100%', minHeight: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="Clinical impression, diagnosis, problem analysis, patient status..."
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#667eea' }}>P - Plan:</label>
                <textarea
                  value={newNote.plan}
                  onChange={(e) => setNewNote({...newNote, plan: e.target.value})}
                  style={{ width: '100%', minHeight: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="Treatment plan, medications, procedures, follow-up, monitoring..."
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Author:</label>
                  <input
                    type="text"
                    value={newNote.author}
                    onChange={(e) => setNewNote({...newNote, author: e.target.value})}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Service:</label>
                  <select
                    value={newNote.service}
                    onChange={(e) => setNewNote({...newNote, service: e.target.value})}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="Geriatrics">Geriatrics</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Family Medicine">Family Medicine</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddNote(false)}
                style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rounding Checklist Modal */}
      {showRoundingChecklist && roundingChecklist && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Daily Rounding Checklist</h3>
              <button
                onClick={() => setShowRoundingChecklist(false)}
                style={{ padding: '6px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
            
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Patient: {roundingChecklist.patientInfo.name}</h4>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Age: {roundingChecklist.patientInfo.age} | Room: {roundingChecklist.patientInfo.room} | Day of Stay: {roundingChecklist.patientInfo.dayOfStay}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Vitals & Symptoms */}
              <div>
                <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>📊 Vitals & Symptoms</h5>
                <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Vitals stable and reviewed
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Pain assessment completed
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Mental status/confusion assessment
                  </label>
                </div>
              </div>

              {/* Geriatric Assessments */}
              <div>
                <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>🎯 Geriatric Assessments</h5>
                <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Fall risk assessment updated
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Delirium screening (CAM if indicated)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Pressure ulcer risk assessment
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Nutrition assessment
                  </label>
                </div>
              </div>

              {/* Medications */}
              <div>
                <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>💊 Medications</h5>
                <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Medication reconciliation reviewed
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Drug interactions checked
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Beers criteria reviewed
                  </label>
                </div>
              </div>

              {/* Discharge Planning */}
              <div>
                <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>🏠 Discharge Planning</h5>
                <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Family communication updated
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Discharge planning reviewed
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Services and barriers assessed
                  </label>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
              <strong style={{ color: '#0056b3' }}>Notes:</strong>
              <textarea
                style={{ width: '100%', minHeight: '60px', marginTop: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Additional notes or observations..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagementTab;