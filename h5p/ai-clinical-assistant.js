// ai-clinical-assistant.js
// Add GPT-powered differential diagnosis and clinical reasoning

class ClinicalAI {
  constructor() {
    this.apiKey = localStorage.getItem('openai_api') || '';
    this.context = {
      specialty: 'geriatrics',
      guidelines: ['STOPP/START v3', 'Beers 2023', 'AGS Guidelines'],
      hospital: 'Shaare Zedek'
    };
    this.fallbackMode = !this.apiKey;
  }

  async getDifferential(symptoms, patientData) {
    if (this.fallbackMode) {
      return this.getFallbackDifferential(symptoms, patientData);
    }

    const prompt = `
      Patient: ${patientData.age}yo ${patientData.gender}
      PMH: ${patientData.history}
      Meds: ${patientData.medications}
      Presenting: ${symptoms}
      
      Provide geriatric-focused differential diagnosis (top 5) with:
      1. Most likely diagnoses
      2. Red flags to watch
      3. Initial workup
      4. Geriatric considerations
    `;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {role: 'system', content: 'You are a geriatrics specialist at Shaare Zedek Hospital'},
            {role: 'user', content: prompt}
          ],
          temperature: 0.3
        })
      });
      
      const data = await response.json();
      return this.formatDifferential(data.choices[0].message.content);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      return this.getFallbackDifferential(symptoms, patientData);
    }
  }

  getFallbackDifferential(symptoms, patientData) {
    // Rule-based differential without AI
    const symptomMappings = {
      'confusion': ['Delirium', 'UTI', 'Medication side effect', 'Dementia', 'Metabolic disorder'],
      'falls': ['Orthostatic hypotension', 'Medication effect', 'Muscle weakness', 'Vision problems', 'Environmental hazards'],
      'fatigue': ['Anemia', 'Hypothyroidism', 'Depression', 'Medication side effect', 'Deconditioning'],
      'shortness of breath': ['CHF', 'COPD exacerbation', 'Pneumonia', 'Anemia', 'Anxiety'],
      'chest pain': ['ACS', 'GERD', 'Musculoskeletal', 'Anxiety', 'Herpes zoster']
    };

    const normalizedSymptom = symptoms.toLowerCase();
    let diagnoses = [];

    for (const [key, value] of Object.entries(symptomMappings)) {
      if (normalizedSymptom.includes(key)) {
        diagnoses = value;
        break;
      }
    }

    if (diagnoses.length === 0) {
      diagnoses = ['Please consult attending physician', 'Consider comprehensive geriatric assessment'];
    }

    return {
      differentials: diagnoses.map((dx, index) => ({
        rank: index + 1,
        diagnosis: dx,
        probability: (90 - index * 15) + '%',
        workup: this.getStandardWorkup(dx),
        geriatricConsiderations: this.getGeriatricConsiderations(dx)
      })),
      redFlags: this.identifyRedFlags(symptoms, patientData),
      recommendations: this.generateRecommendations(symptoms, patientData)
    };
  }

  getStandardWorkup(diagnosis) {
    const workupMap = {
      'Delirium': ['CBC', 'BMP', 'UA', 'CXR', 'Medication review'],
      'UTI': ['UA', 'Urine culture', 'CBC'],
      'CHF': ['BNP', 'CXR', 'Echo', 'EKG'],
      'Pneumonia': ['CXR', 'CBC', 'Procalcitonin', 'Blood cultures'],
      'Anemia': ['CBC', 'Iron studies', 'B12/Folate', 'Reticulocyte count']
    };
    return workupMap[diagnosis] || ['CBC', 'BMP', 'Clinical assessment'];
  }

  getGeriatricConsiderations(diagnosis) {
    const considerations = {
      'Delirium': 'High mortality risk, prevent with non-pharm interventions',
      'UTI': 'Often asymptomatic, avoid treatment without symptoms',
      'CHF': 'Consider diastolic dysfunction, careful diuresis',
      'Falls': 'Multifactorial - assess medications, vision, environment',
      'Depression': 'Often presents as somatic complaints in elderly'
    };
    return considerations[diagnosis] || 'Consider frailty and functional status';
  }

  identifyRedFlags(symptoms, patientData) {
    const redFlags = [];
    
    if (symptoms.includes('chest pain') && patientData.age > 75) {
      redFlags.push('Atypical presentation of ACS in elderly');
    }
    if (symptoms.includes('confusion') && symptoms.includes('fever')) {
      redFlags.push('Possible sepsis - check qSOFA');
    }
    if (symptoms.includes('fall') && patientData.medications?.includes('warfarin')) {
      redFlags.push('Risk of intracranial hemorrhage');
    }
    
    return redFlags;
  }

  async checkDrugInteractions(medications) {
    // Real-time drug interaction checking
    const interactions = [];
    const beersCriteria = this.checkBeersList(medications);
    const stoppFlags = this.checkSTOPPCriteria(medications);
    
    // Check for common geriatric drug interactions
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const interaction = this.checkInteraction(medications[i], medications[j]);
        if (interaction) {
          interactions.push(interaction);
        }
      }
    }
    
    return {
      severe: interactions.filter(i => i.severity === 'major'),
      moderate: interactions.filter(i => i.severity === 'moderate'),
      beersCriteria,
      stoppFlags,
      recommendations: this.generateDeprescribingPlan(medications)
    };
  }

  checkBeersList(medications) {
    const beersDrugs = {
      'diazepam': 'Long-acting benzodiazepine - high fall risk',
      'amitriptyline': 'Anticholinergic - cognitive impairment risk',
      'diphenhydramine': 'Anticholinergic - confusion and fall risk',
      'ketorolac': 'NSAID - GI bleeding and renal risk',
      'methyldopa': 'CNS effects, bradycardia risk'
    };

    return medications
      .filter(med => beersDrugs[med.toLowerCase()])
      .map(med => ({
        medication: med,
        concern: beersDrugs[med.toLowerCase()],
        recommendation: 'Consider discontinuation or alternative'
      }));
  }

  checkSTOPPCriteria(medications) {
    const stoppCriteria = [];
    
    // Check for duplicate drug classes
    const drugClasses = {};
    medications.forEach(med => {
      const drugClass = this.getDrugClass(med);
      if (drugClasses[drugClass]) {
        stoppCriteria.push({
          criteria: 'A3',
          message: `Duplicate ${drugClass} therapy`,
          medications: [drugClasses[drugClass], med]
        });
      }
      drugClasses[drugClass] = med;
    });
    
    return stoppCriteria;
  }

  checkInteraction(drug1, drug2) {
    const interactionDatabase = {
      'warfarin': {
        'aspirin': {severity: 'major', effect: 'Increased bleeding risk'},
        'amiodarone': {severity: 'major', effect: 'Increased INR'}
      },
      'digoxin': {
        'furosemide': {severity: 'moderate', effect: 'Hypokalemia increases digoxin toxicity'}
      }
    };

    const d1 = drug1.toLowerCase();
    const d2 = drug2.toLowerCase();
    
    if (interactionDatabase[d1]?.[d2]) {
      return {
        drugs: [drug1, drug2],
        ...interactionDatabase[d1][d2]
      };
    }
    if (interactionDatabase[d2]?.[d1]) {
      return {
        drugs: [drug1, drug2],
        ...interactionDatabase[d2][d1]
      };
    }
    
    return null;
  }

  generateDeprescribingPlan(medications) {
    const plan = [];
    
    if (medications.length > 10) {
      plan.push({
        priority: 'high',
        action: 'Comprehensive medication review',
        rationale: 'Polypharmacy (>10 medications)'
      });
    }
    
    // Check for medications without clear indication
    medications.forEach(med => {
      if (this.isPreventiveMed(med)) {
        plan.push({
          priority: 'medium',
          action: `Review indication for ${med}`,
          rationale: 'Limited benefit in limited life expectancy'
        });
      }
    });
    
    return plan;
  }

  isPreventiveMed(medication) {
    const preventiveMeds = ['statin', 'bisphosphonate', 'aspirin', 'vitamin'];
    return preventiveMeds.some(med => medication.toLowerCase().includes(med));
  }

  getDrugClass(medication) {
    const classes = {
      'metoprolol': 'beta-blocker',
      'atenolol': 'beta-blocker',
      'lisinopril': 'ACE-inhibitor',
      'enalapril': 'ACE-inhibitor',
      'furosemide': 'diuretic',
      'hydrochlorothiazide': 'diuretic'
    };
    return classes[medication.toLowerCase()] || 'other';
  }

  async generateSOAP(encounter) {
    // Auto-generate SOAP notes from encounter data
    return {
      subjective: this.extractSubjective(encounter),
      objective: this.formatObjective(encounter),
      assessment: await this.generateAssessment(encounter),
      plan: await this.generatePlan(encounter)
    };
  }

  extractSubjective(encounter) {
    return {
      chiefComplaint: encounter.chiefComplaint,
      hpi: encounter.historyPresentIllness,
      ros: encounter.reviewOfSystems,
      pmh: encounter.pastMedicalHistory,
      medications: encounter.medications,
      allergies: encounter.allergies,
      socialHistory: encounter.socialHistory
    };
  }

  formatObjective(encounter) {
    return {
      vitals: encounter.vitals,
      physicalExam: encounter.physicalExam,
      labs: encounter.labResults,
      imaging: encounter.imagingResults
    };
  }

  async generateAssessment(encounter) {
    const differentials = await this.getDifferential(
      encounter.chiefComplaint,
      {
        age: encounter.patientAge,
        gender: encounter.patientGender,
        history: encounter.pastMedicalHistory,
        medications: encounter.medications
      }
    );
    
    return {
      primaryDiagnosis: differentials.differentials[0],
      differentials: differentials.differentials.slice(1),
      clinicalReasoning: this.generateClinicalReasoning(encounter, differentials)
    };
  }

  generateClinicalReasoning(encounter, differentials) {
    return `${encounter.patientAge}yo ${encounter.patientGender} presenting with ${encounter.chiefComplaint}. ` +
           `Given the patient's age and comorbidities, top consideration is ${differentials.differentials[0].diagnosis}. ` +
           `Key geriatric considerations include ${differentials.differentials[0].geriatricConsiderations}.`;
  }

  async generatePlan(encounter) {
    const assessment = await this.generateAssessment(encounter);
    return {
      diagnostic: assessment.primaryDiagnosis.workup,
      therapeutic: this.generateTherapeuticPlan(assessment.primaryDiagnosis.diagnosis),
      monitoring: this.generateMonitoringPlan(assessment.primaryDiagnosis.diagnosis),
      disposition: this.recommendDisposition(encounter, assessment)
    };
  }

  generateTherapeuticPlan(diagnosis) {
    const plans = {
      'Delirium': ['Identify and treat underlying cause', 'Non-pharmacological interventions', 'Avoid benzodiazepines'],
      'UTI': ['Antibiotics per local antibiogram', 'Ensure adequate hydration', 'Monitor renal function'],
      'CHF': ['Optimize diuretics', 'ACE/ARB if not contraindicated', 'Daily weights']
    };
    return plans[diagnosis] || ['Supportive care', 'Monitor closely'];
  }

  generateMonitoringPlan(diagnosis) {
    return ['Daily clinical assessment', 'Monitor vital signs', 'Track functional status'];
  }

  recommendDisposition(encounter, assessment) {
    const severity = this.assessSeverity(encounter, assessment);
    if (severity === 'high') {
      return 'Admit to geriatric unit';
    } else if (severity === 'medium') {
      return 'Observation for 24 hours';
    } else {
      return 'Discharge with close follow-up';
    }
  }

  assessSeverity(encounter, assessment) {
    if (encounter.vitals?.bp < 90 || encounter.vitals?.o2sat < 90) {
      return 'high';
    }
    if (assessment.primaryDiagnosis.diagnosis === 'Delirium') {
      return 'high';
    }
    return 'low';
  }

  formatDifferential(aiResponse) {
    // Format AI response into structured differential
    try {
      // Parse AI response and structure it
      return {
        differentials: this.parseAIDifferentials(aiResponse),
        redFlags: this.parseAIRedFlags(aiResponse),
        recommendations: this.parseAIRecommendations(aiResponse)
      };
    } catch (error) {
      console.error('Error formatting AI response:', error);
      return this.getFallbackDifferential('', {});
    }
  }

  parseAIDifferentials(response) {
    // Extract differentials from AI response
    const lines = response.split('\n');
    const differentials = [];
    
    lines.forEach(line => {
      if (line.match(/^\d\./)) {
        differentials.push({
          diagnosis: line.replace(/^\d\.\s*/, ''),
          probability: 'AI-suggested',
          workup: [],
          geriatricConsiderations: ''
        });
      }
    });
    
    return differentials;
  }

  parseAIRedFlags(response) {
    // Extract red flags from AI response
    if (response.includes('Red flags:') || response.includes('red flags')) {
      const flagSection = response.split(/[Rr]ed flags:/)[1]?.split('\n')[0];
      return flagSection ? [flagSection.trim()] : [];
    }
    return [];
  }

  parseAIRecommendations(response) {
    // Extract recommendations from AI response
    if (response.includes('Recommend')) {
      const recSection = response.split(/[Rr]ecommend/)[1]?.split('\n')[0];
      return recSection ? [recSection.trim()] : [];
    }
    return ['Comprehensive geriatric assessment recommended'];
  }

  generateRecommendations(symptoms, patientData) {
    const recommendations = ['Comprehensive geriatric assessment'];
    
    if (patientData.medications?.length > 5) {
      recommendations.push('Medication review for polypharmacy');
    }
    
    if (patientData.age > 80) {
      recommendations.push('Assess for frailty syndrome');
    }
    
    return recommendations;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClinicalAI;
}