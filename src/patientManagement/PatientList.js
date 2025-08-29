// Patient Management System for Geriatrics
// Active patient tracking with room numbers, problems, medications, and care planning

export class PatientManager {
  constructor() {
    this.patients = new Map();
    this.loadFromStorage();
  }

  // Add a new patient
  addPatient(patientData) {
    const patient = {
      id: patientData.id || this.generatePatientId(),
      mrn: patientData.mrn || '',
      name: patientData.name || '',
      age: patientData.age || '',
      gender: patientData.gender || '',
      room: patientData.room || '',
      bed: patientData.bed || '',
      admissionDate: patientData.admissionDate || new Date().toISOString(),
      attending: patientData.attending || '',
      
      // Medical Information
      primaryDiagnosis: patientData.primaryDiagnosis || '',
      secondaryDiagnoses: patientData.secondaryDiagnoses || [],
      problemList: patientData.problemList || [],
      
      // Medications
      medications: patientData.medications || [],
      allergies: patientData.allergies || [],
      
      // Functional Status
      functionalStatus: patientData.functionalStatus || {
        adl: '', // Activities of Daily Living
        mobility: '',
        cognitive: '',
        socialSupport: ''
      },
      
      // Care Planning
      codeStatus: patientData.codeStatus || '',
      goalsOfCare: patientData.goalsOfCare || '',
      dischargePlan: patientData.dischargePlan || {
        targetDate: '',
        disposition: '',
        requirements: [],
        barriers: []
      },
      
      // Family/Contacts
      emergencyContact: patientData.emergencyContact || {
        name: '',
        relationship: '',
        phone: '',
        language: ''
      },
      familyContacts: patientData.familyContacts || [],
      
      // Clinical Notes
      dailyProgress: patientData.dailyProgress || [],
      roundingNotes: patientData.roundingNotes || [],
      
      // Geriatric Assessments
      fallRisk: patientData.fallRisk || { score: '', level: '', interventions: [] },
      deliriumRisk: patientData.deliriumRisk || { cam: '', risk: '', interventions: [] },
      pressureUlcerRisk: patientData.pressureUlcerRisk || { braden: '', risk: '', interventions: [] },
      nutritionRisk: patientData.nutritionRisk || { mna: '', status: '', plan: '' },
      
      // System fields
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: 'active' // active, discharged, transferred
    };

    this.patients.set(patient.id, patient);
    this.saveToStorage();
    return patient;
  }

  // Update patient information
  updatePatient(patientId, updates) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    const updatedPatient = {
      ...patient,
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    this.patients.set(patientId, updatedPatient);
    this.saveToStorage();
    return updatedPatient;
  }

  // Get all active patients
  getActivePatients() {
    return Array.from(this.patients.values())
      .filter(patient => patient.status === 'active')
      .sort((a, b) => {
        // Sort by room number
        const roomA = parseInt(a.room) || 9999;
        const roomB = parseInt(b.room) || 9999;
        return roomA - roomB;
      });
  }

  // Get patient by ID
  getPatient(patientId) {
    return this.patients.get(patientId);
  }

  // Add problem to problem list
  addProblem(patientId, problem) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    const newProblem = {
      id: this.generateId(),
      description: problem.description,
      status: problem.status || 'active', // active, resolved, chronic
      priority: problem.priority || 'medium', // high, medium, low
      onsetDate: problem.onsetDate || new Date().toISOString(),
      notes: problem.notes || '',
      createdBy: problem.createdBy || '',
      createdDate: new Date().toISOString()
    };

    patient.problemList.push(newProblem);
    patient.lastUpdated = new Date().toISOString();
    this.saveToStorage();
    return newProblem;
  }

  // Update problem status
  updateProblem(patientId, problemId, updates) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    const problemIndex = patient.problemList.findIndex(p => p.id === problemId);
    if (problemIndex === -1) return null;

    patient.problemList[problemIndex] = {
      ...patient.problemList[problemIndex],
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    patient.lastUpdated = new Date().toISOString();
    this.saveToStorage();
    return patient.problemList[problemIndex];
  }

  // Add medication
  addMedication(patientId, medication) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    const newMedication = {
      id: this.generateId(),
      name: medication.name,
      dose: medication.dose || '',
      route: medication.route || '',
      frequency: medication.frequency || '',
      indication: medication.indication || '',
      startDate: medication.startDate || new Date().toISOString(),
      endDate: medication.endDate || '',
      prescriber: medication.prescriber || '',
      notes: medication.notes || '',
      status: medication.status || 'active' // active, discontinued, held
    };

    patient.medications.push(newMedication);
    patient.lastUpdated = new Date().toISOString();
    this.saveToStorage();
    return newMedication;
  }

  // Medication reconciliation
  reconcileMedications(patientId, homemedications, hospitalMedications) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    const reconciliation = {
      id: this.generateId(),
      date: new Date().toISOString(),
      homemedications: homemedications || [],
      hospitalMedications: hospitalMedications || [],
      discrepancies: [],
      recommendations: [],
      completedBy: '',
      status: 'pending' // pending, completed, reviewed
    };

    // Identify discrepancies
    homemedications.forEach(homeMed => {
      const hospitalMatch = hospitalMedications.find(hospMed => 
        hospMed.name.toLowerCase().includes(homeMed.name.toLowerCase()) ||
        homeMed.name.toLowerCase().includes(hospMed.name.toLowerCase())
      );

      if (!hospitalMatch) {
        reconciliation.discrepancies.push({
          type: 'missing_in_hospital',
          medication: homeMed,
          recommendation: `Consider continuing ${homeMed.name} ${homeMed.dose} ${homeMed.frequency}`
        });
      } else if (hospitalMatch.dose !== homeMed.dose || hospitalMatch.frequency !== homeMed.frequency) {
        reconciliation.discrepancies.push({
          type: 'dose_frequency_change',
          homeMedication: homeMed,
          hospitalMedication: hospitalMatch,
          recommendation: `Verify if dose/frequency change is intentional`
        });
      }
    });

    // Store reconciliation
    if (!patient.medicationReconciliations) {
      patient.medicationReconciliations = [];
    }
    patient.medicationReconciliations.push(reconciliation);
    
    patient.lastUpdated = new Date().toISOString();
    this.saveToStorage();
    return reconciliation;
  }

  // Add daily progress note
  addProgressNote(patientId, note) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    const progressNote = {
      id: this.generateId(),
      date: new Date().toISOString(),
      subjective: note.subjective || '',
      objective: note.objective || '',
      assessment: note.assessment || '',
      plan: note.plan || '',
      author: note.author || '',
      service: note.service || 'Geriatrics'
    };

    patient.dailyProgress.push(progressNote);
    patient.lastUpdated = new Date().toISOString();
    this.saveToStorage();
    return progressNote;
  }

  // Generate rounding checklist
  generateRoundingChecklist(patientId) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    const checklist = {
      patientInfo: {
        name: patient.name,
        age: patient.age,
        room: patient.room,
        dayOfStay: this.calculateDayOfStay(patient.admissionDate)
      },
      vitals: {
        checked: false,
        stable: false,
        concerns: ''
      },
      symptoms: {
        pain: { checked: false, score: '', location: '', management: '' },
        nausea: { checked: false, present: false, management: '' },
        shortness_of_breath: { checked: false, present: false, oxygen: '' },
        confusion: { checked: false, present: false, cam_done: false }
      },
      geriatric_assessments: {
        fall_risk: { checked: false, score: '', interventions: '' },
        delirium: { checked: false, cam: '', interventions: '' },
        pressure_ulcers: { checked: false, braden: '', prevention: '' },
        nutrition: { checked: false, intake: '', weight: '' }
      },
      medications: {
        reconciled: false,
        interactions_checked: false,
        beers_criteria_reviewed: false,
        pain_management: false
      },
      social_discharge: {
        family_updated: false,
        discharge_planning: false,
        services_needed: '',
        barriers: ''
      },
      tasks: [],
      completed_by: '',
      completion_date: ''
    };

    return checklist;
  }

  // Census summary
  getCensusSummary() {
    const activePatients = this.getActivePatients();
    
    return {
      totalPatients: activePatients.length,
      byAttending: this.groupPatientsByAttending(activePatients),
      highPriorityPatients: this.getHighPriorityPatients(activePatients),
      dischargesPlanned: this.getPlannedDischarges(activePatients),
      newAdmissions: this.getRecentAdmissions(activePatients),
      longStay: this.getLongStayPatients(activePatients)
    };
  }

  // Helper methods
  generatePatientId() {
    return 'pt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateId() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  calculateDayOfStay(admissionDate) {
    const admission = new Date(admissionDate);
    const today = new Date();
    const diffTime = Math.abs(today - admission);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  groupPatientsByAttending(patients) {
    const groups = {};
    patients.forEach(patient => {
      const attending = patient.attending || 'Unassigned';
      if (!groups[attending]) groups[attending] = [];
      groups[attending].push(patient);
    });
    return groups;
  }

  getHighPriorityPatients(patients) {
    return patients.filter(patient => 
      patient.codeStatus.includes('DNR') ||
      patient.problemList.some(p => p.priority === 'high') ||
      this.calculateDayOfStay(patient.admissionDate) > 14
    );
  }

  getPlannedDischarges(patients) {
    const today = new Date().toISOString().split('T')[0];
    return patients.filter(patient => 
      patient.dischargePlan.targetDate === today ||
      (patient.dischargePlan.targetDate && new Date(patient.dischargePlan.targetDate) <= new Date())
    );
  }

  getRecentAdmissions(patients) {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    return patients.filter(patient => 
      new Date(patient.admissionDate) >= threeDaysAgo
    );
  }

  getLongStayPatients(patients) {
    return patients.filter(patient => 
      this.calculateDayOfStay(patient.admissionDate) > 14
    );
  }

  // Export patient data
  exportPatientData(patientId) {
    const patient = this.patients.get(patientId);
    if (!patient) return null;

    return {
      ...patient,
      exportDate: new Date().toISOString()
    };
  }

  // Import patient data
  importPatientData(patientData) {
    if (patientData.id && this.patients.has(patientData.id)) {
      return this.updatePatient(patientData.id, patientData);
    } else {
      return this.addPatient(patientData);
    }
  }

  // Search patients
  searchPatients(query) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.patients.values()).filter(patient =>
      patient.name.toLowerCase().includes(lowerQuery) ||
      patient.mrn.includes(query) ||
      patient.room.includes(query) ||
      patient.primaryDiagnosis.toLowerCase().includes(lowerQuery)
    );
  }

  // Persistence
  saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('patientManagerData', JSON.stringify(Array.from(this.patients.entries())));
      } catch (error) {
        console.error('Failed to save patient data:', error);
      }
    }
  }

  loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        const data = localStorage.getItem('patientManagerData');
        if (data) {
          const entries = JSON.parse(data);
          this.patients = new Map(entries);
        }
      } catch (error) {
        console.error('Failed to load patient data:', error);
      }
    }
  }
}

export default PatientManager;