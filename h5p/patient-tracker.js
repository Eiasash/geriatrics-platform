// patient-tracker.js
// Automated patient list with smart reminders

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (item.priority > this.items[i].priority) {
        this.items.splice(i, 0, item);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(item);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

class PatientTracker {
  constructor() {
    this.patients = JSON.parse(localStorage.getItem('geriatrics_patients') || '[]');
    this.tasks = new PriorityQueue();
    this.initNotifications();
    this.loadTasks();
  }

  initNotifications() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  generateId() {
    return 'pt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  addPatient(patient) {
    const enrichedPatient = {
      ...patient,
      id: this.generateId(),
      added: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      scores: {
        cfs: null,
        morse: null,
        chads2vasc: null,
        moca: null,
        mmse: null,
        adl: null,
        iadl: null
      },
      medications: patient.medications || [],
      problems: patient.problems || [],
      tasks: [],
      alerts: [],
      notes: [],
      admissionDate: patient.admissionDate || new Date().toISOString(),
      room: patient.room || '',
      attendingPhysician: patient.attendingPhysician || ''
    };
    
    // Generate initial alerts
    enrichedPatient.alerts = this.generateAlerts(enrichedPatient);
    
    // Add to patients list
    this.patients.push(enrichedPatient);
    
    // Schedule assessments
    this.scheduleAssessments(enrichedPatient);
    
    // Save to localStorage
    this.save();
    
    // Show notification
    this.showNotification('New Patient Added', `${patient.name} has been added to your list`);
    
    return enrichedPatient;
  }

  updatePatient(patientId, updates) {
    const patientIndex = this.patients.findIndex(p => p.id === patientId);
    if (patientIndex !== -1) {
      this.patients[patientIndex] = {
        ...this.patients[patientIndex],
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      
      // Regenerate alerts based on new data
      this.patients[patientIndex].alerts = this.generateAlerts(this.patients[patientIndex]);
      
      this.save();
      return this.patients[patientIndex];
    }
    return null;
  }

  scheduleAssessments(patient) {
    const assessments = [
      {
        name: 'Falls Risk Assessment',
        tool: 'Morse Fall Scale',
        frequency: 'daily',
        priority: patient.age > 75 ? 8 : 5
      },
      {
        name: 'Delirium Screen',
        tool: 'CAM',
        frequency: 'shift',
        priority: patient.problems?.includes('confusion') ? 10 : 6
      },
      {
        name: 'Medication Review',
        tool: 'STOPP/START',
        frequency: 'weekly',
        priority: patient.medications?.length > 10 ? 9 : 4
      },
      {
        name: 'Functional Status',
        tool: 'ADL/IADL',
        frequency: 'admission',
        priority: 7
      },
      {
        name: 'Cognitive Assessment',
        tool: 'MMSE/MoCA',
        frequency: 'admission',
        priority: patient.age > 80 ? 8 : 5
      },
      {
        name: 'Frailty Assessment',
        tool: 'Clinical Frailty Scale',
        frequency: 'admission',
        priority: patient.age > 75 ? 9 : 6
      }
    ];
    
    assessments.forEach(assessment => {
      const task = {
        id: this.generateId(),
        patientId: patient.id,
        patientName: patient.name,
        type: assessment.name,
        tool: assessment.tool,
        due: this.calculateDueTime(assessment.frequency),
        priority: this.calculatePriority(patient, assessment),
        status: 'pending',
        created: new Date().toISOString()
      };
      
      this.tasks.enqueue(task);
    });
    
    this.saveTasks();
  }

  calculateDueTime(frequency) {
    const now = new Date();
    switch(frequency) {
      case 'shift':
        return new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString();
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
      case 'admission':
        return new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    }
  }

  calculatePriority(patient, assessment) {
    let priority = assessment.priority || 5;
    
    // Increase priority for older patients
    if (patient.age > 85) priority += 2;
    else if (patient.age > 75) priority += 1;
    
    // Increase priority for patients with multiple comorbidities
    if (patient.problems?.length > 5) priority += 2;
    
    // Increase priority for polypharmacy
    if (patient.medications?.length > 10) priority += 2;
    else if (patient.medications?.length > 5) priority += 1;
    
    // Cap at 10
    return Math.min(priority, 10);
  }

  generateAlerts(patient) {
    const alerts = [];
    
    // Age-based alerts
    if (patient.age > 85) {
      alerts.push({
        type: 'frailty',
        severity: 'medium',
        message: 'Age > 85: Screen for frailty syndrome',
        action: () => this.startFrailtyAssessment(patient.id),
        timestamp: new Date().toISOString()
      });
    }
    
    // Polypharmacy alert
    if (patient.medications?.length > 10) {
      alerts.push({
        type: 'polypharmacy',
        severity: 'high',
        message: `${patient.medications.length} medications - HIGH risk for adverse events`,
        action: () => this.startMedicationReview(patient.id),
        timestamp: new Date().toISOString()
      });
    } else if (patient.medications?.length > 5) {
      alerts.push({
        type: 'polypharmacy',
        severity: 'medium',
        message: `${patient.medications.length} medications - Review for deprescribing`,
        action: () => this.startMedicationReview(patient.id),
        timestamp: new Date().toISOString()
      });
    }
    
    // High-risk medication alerts
    patient.medications?.forEach(med => {
      if (this.isHighRiskMedication(med)) {
        alerts.push({
          type: 'medication',
          severity: 'high',
          message: `High-risk medication: ${med} - Consider alternatives`,
          action: () => this.suggestAlternatives(med),
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Fall risk alerts
    if (patient.scores?.morse > 45) {
      alerts.push({
        type: 'fall_risk',
        severity: 'high',
        message: 'HIGH fall risk (Morse > 45) - Implement fall precautions',
        action: () => this.implementFallPrecautions(patient.id),
        timestamp: new Date().toISOString()
      });
    }
    
    // Cognitive impairment alerts
    if (patient.scores?.mmse && patient.scores.mmse < 24) {
      alerts.push({
        type: 'cognitive',
        severity: 'medium',
        message: 'Cognitive impairment detected - Consider delirium prevention',
        action: () => this.startDeliriumPrevention(patient.id),
        timestamp: new Date().toISOString()
      });
    }
    
    // Recent admission alerts
    const daysSinceAdmission = this.daysSince(patient.admissionDate);
    if (daysSinceAdmission === 0) {
      alerts.push({
        type: 'new_admission',
        severity: 'high',
        message: 'New admission - Complete comprehensive geriatric assessment',
        action: () => this.startCGA(patient.id),
        timestamp: new Date().toISOString()
      });
    }
    
    // Length of stay alert
    if (daysSinceAdmission > 7) {
      alerts.push({
        type: 'los',
        severity: 'medium',
        message: `LOS ${daysSinceAdmission} days - Review discharge planning`,
        action: () => this.reviewDischargePlan(patient.id),
        timestamp: new Date().toISOString()
      });
    }
    
    return alerts;
  }

  isHighRiskMedication(med) {
    const highRiskMeds = [
      'warfarin', 'insulin', 'heparin', 'digoxin', 'morphine',
      'diazepam', 'lorazepam', 'amitriptyline', 'diphenhydramine',
      'ketorolac', 'indomethacin', 'methyldopa', 'clonidine'
    ];
    
    const medLower = med.toLowerCase();
    return highRiskMeds.some(hrm => medLower.includes(hrm));
  }

  daysSince(dateString) {
    if (!dateString) return 0;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Action methods for alerts
  startFrailtyAssessment(patientId) {
    console.log(`Starting frailty assessment for patient ${patientId}`);
    // Navigate to CFS tool with patient preloaded
    window.location.hash = `#cfs?patient=${patientId}`;
  }

  startMedicationReview(patientId) {
    console.log(`Starting medication review for patient ${patientId}`);
    const patient = this.patients.find(p => p.id === patientId);
    if (patient && window.clinicalAI) {
      window.clinicalAI.checkDrugInteractions(patient.medications)
        .then(results => {
          console.log('Drug interaction check results:', results);
          this.displayMedicationReviewResults(results, patientId);
        });
    }
  }

  suggestAlternatives(medication) {
    const alternatives = {
      'diazepam': ['Lorazepam (shorter half-life)', 'Non-pharmacological sleep hygiene'],
      'amitriptyline': ['Sertraline', 'Duloxetine', 'Mirtazapine'],
      'diphenhydramine': ['Loratadine', 'Cetirizine', 'Fexofenadine'],
      'ketorolac': ['Acetaminophen', 'Topical NSAIDs', 'Tramadol if needed']
    };
    
    const medLower = medication.toLowerCase();
    const suggestions = alternatives[medLower] || ['Consult pharmacist for alternatives'];
    
    console.log(`Alternatives for ${medication}:`, suggestions);
    alert(`Consider these alternatives to ${medication}:\n${suggestions.join('\n')}`);
  }

  implementFallPrecautions(patientId) {
    const precautions = [
      'Bed in lowest position',
      'Call bell within reach',
      'Non-slip footwear',
      'Clear path to bathroom',
      'Night light on',
      'Assistance with ambulation',
      'Consider bed/chair alarm',
      'Hourly rounding'
    ];
    
    console.log(`Fall precautions for patient ${patientId}:`, precautions);
    this.addNote(patientId, 'Fall precautions implemented: ' + precautions.join(', '));
  }

  startDeliriumPrevention(patientId) {
    const interventions = [
      'Orient frequently',
      'Promote sleep hygiene',
      'Early mobilization',
      'Ensure glasses/hearing aids',
      'Avoid restraints',
      'Minimize room changes',
      'Family involvement',
      'Review medications daily'
    ];
    
    console.log(`Delirium prevention for patient ${patientId}:`, interventions);
    this.addNote(patientId, 'Delirium prevention protocol initiated');
  }

  startCGA(patientId) {
    console.log(`Starting comprehensive geriatric assessment for patient ${patientId}`);
    window.location.hash = `#cga?patient=${patientId}`;
  }

  reviewDischargePlan(patientId) {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      const plan = {
        medicalStability: this.assessMedicalStability(patient),
        functionalStatus: patient.scores?.adl || 'Not assessed',
        socialSupport: 'To be evaluated',
        followUp: 'Schedule within 7 days',
        medications: `Review ${patient.medications.length} medications before discharge`
      };
      
      console.log(`Discharge plan for ${patient.name}:`, plan);
      this.addNote(patientId, `Discharge planning review: ${JSON.stringify(plan)}`);
    }
  }

  assessMedicalStability(patient) {
    // Simple assessment based on available data
    if (patient.alerts?.some(a => a.severity === 'high')) {
      return 'Unstable - address high-priority alerts';
    }
    return 'Stable for discharge consideration';
  }

  addNote(patientId, note) {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      patient.notes.push({
        text: note,
        timestamp: new Date().toISOString(),
        author: 'System'
      });
      this.save();
    }
  }

  displayMedicationReviewResults(results, patientId) {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      const summary = `
        Medication Review Results for ${patient.name}:
        - Severe Interactions: ${results.severe.length}
        - Moderate Interactions: ${results.moderate.length}
        - Beers Criteria Violations: ${results.beersCriteria.length}
        - STOPP Flags: ${results.stoppFlags.length}
        
        Recommendations: ${results.recommendations.map(r => r.action).join(', ')}
      `;
      
      console.log(summary);
      alert(summary);
      
      // Add to patient notes
      this.addNote(patientId, summary);
    }
  }

  getNextTask() {
    if (this.tasks.isEmpty()) {
      return null;
    }
    return this.tasks.dequeue();
  }

  completeTask(taskId) {
    // Mark task as completed and remove from queue
    const task = this.tasks.items.find(t => t.id === taskId);
    if (task) {
      task.status = 'completed';
      task.completedAt = new Date().toISOString();
      
      // Add to patient's completed tasks
      const patient = this.patients.find(p => p.id === task.patientId);
      if (patient) {
        patient.tasks.push(task);
        this.save();
      }
      
      // Remove from active queue
      this.tasks.items = this.tasks.items.filter(t => t.id !== taskId);
      this.saveTasks();
    }
  }

  showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/icon-192.png',
        badge: '/icon-192.png'
      });
    }
  }

  save() {
    localStorage.setItem('geriatrics_patients', JSON.stringify(this.patients));
  }

  saveTasks() {
    localStorage.setItem('geriatrics_tasks', JSON.stringify(this.tasks.items));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('geriatrics_tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach(task => this.tasks.enqueue(task));
    }
  }

  async syncWithEMR(emrSystem = 'shaareZedek') {
    // Placeholder for EMR integration
    try {
      // In production, this would connect to actual EMR API
      console.log(`Syncing with ${emrSystem} EMR...`);
      
      // Simulate sync
      return {
        success: true,
        synced: this.patients.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('EMR sync failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  exportPatientList() {
    const exportData = {
      patients: this.patients,
      tasks: this.tasks.items,
      exported: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `patient-list-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  importPatientList(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        this.patients = data.patients || [];
        data.tasks?.forEach(task => this.tasks.enqueue(task));
        this.save();
        this.saveTasks();
        this.showNotification('Import Successful', `Imported ${this.patients.length} patients`);
      } catch (error) {
        console.error('Import failed:', error);
        alert('Failed to import patient list');
      }
    };
    reader.readAsText(file);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PatientTracker;
}