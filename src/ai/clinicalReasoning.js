// Clinical Reasoning Engine - Human-like Medical Decision Making
// Synthesizes medical knowledge with patient context for intelligent recommendations

export class ClinicalReasoningEngine {
  constructor() {
    // Evidence-based clinical rules and guidelines
    this.clinicalRules = {
      anticoagulation: {
        indications: ['atrial fibrillation', 'venous thromboembolism', 'mechanical valve'],
        contraindications: ['active bleeding', 'severe bleeding risk', 'HAS-BLED ≥3'],
        monitoring: ['INR for warfarin', 'renal function for DOACs', 'bleeding signs'],
        geriatricConsiderations: ['fall risk', 'cognitive impairment', 'polypharmacy interactions']
      },
      diabetes: {
        targets: { A1C: '<7% (or <8% if frail elderly)', glucose: '80-180 mg/dL' },
        medications: ['metformin first-line', 'avoid glyburide in elderly', 'insulin as needed'],
        complications: ['hypoglycemia risk', 'kidney disease', 'cardiovascular disease'],
        geriatricConsiderations: ['relaxed targets for frail patients', 'hypoglycemia awareness']
      },
      delirium: {
        causes: ['infection', 'medications', 'metabolic', 'hypoxia', 'pain'],
        assessment: ['CAM criteria', 'vital signs', 'medication review', 'infection workup'],
        treatment: ['treat underlying cause', 'avoid sedatives', 'environmental modifications'],
        medications: ['haloperidol 0.25-0.5mg PRN', 'avoid benzodiazepines']
      },
      falls: {
        riskFactors: ['age >65', 'previous falls', 'medications', 'cognitive impairment', 'vision problems'],
        assessment: ['Morse Fall Scale', 'Timed Up and Go', 'medication review'],
        interventions: ['environmental modifications', 'exercise programs', 'vitamin D', 'medication adjustment'],
        medications: ['review sedatives', 'orthostatic medications', 'polypharmacy']
      }
    };

    // Drug interaction database (critical combinations)
    this.drugInteractions = {
      warfarin: {
        major: ['aspirin', 'NSAIDs', 'antibiotics', 'antifungals'],
        monitoring: ['INR more frequently', 'bleeding signs'],
        management: ['dose adjustment', 'alternative medications']
      },
      metformin: {
        contraindications: ['GFR <30', 'contrast procedures', 'severe illness'],
        monitoring: ['kidney function', 'B12 levels'],
        management: ['dose reduction for GFR 30-60', 'hold for procedures']
      },
      digoxin: {
        toxicity: ['low K+', 'low Mg++', 'kidney disease', 'elderly'],
        symptoms: ['nausea', 'confusion', 'arrhythmias', 'vision changes'],
        monitoring: ['digoxin levels', 'electrolytes', 'kidney function']
      }
    };

    // Geriatric-specific considerations
    this.geriatricFactors = {
      pharmacokinetics: {
        absorption: 'may be reduced with aging',
        distribution: 'increased fat, decreased water and lean mass',
        metabolism: 'reduced liver function',
        elimination: 'reduced kidney function'
      },
      polypharmacy: {
        definition: '>5 medications',
        risks: ['interactions', 'adherence', 'adverse effects', 'falls'],
        management: ['medication review', 'deprescribing', 'STOPP/START criteria']
      },
      frailty: {
        assessment: ['weakness', 'weight loss', 'exhaustion', 'low activity', 'slow gait'],
        implications: ['increased vulnerability', 'different treatment goals', 'conservative approach'],
        considerations: ['quality vs quantity of life', 'functional outcomes']
      }
    };

    // Israeli healthcare specific considerations
    this.israeliContext = {
      healthcare: {
        system: 'Universal healthcare through Kupat Cholim',
        formulary: 'Sal Briut (health basket) medications',
        approval: 'Special approval needed for some drugs'
      },
      cultural: {
        languages: ['Hebrew', 'Arabic', 'Russian', 'English'],
        considerations: ['Sabbath observance', 'dietary laws', 'family involvement'],
        communication: 'Family-centered decision making common'
      }
    };
  }

  // Main clinical reasoning function
  async analyze(patientData, question) {
    try {
      const scenario = await this.parseScenario(patientData);
      const relevantGuidelines = this.fetchGuidelines(scenario);
      const geriatricFactors = this.assessGeriatricComplexity(scenario);
      const differentials = this.generateDifferentials(scenario);
      const risks = this.assessRisks(scenario);
      const interactions = this.checkInteractions(scenario);

      return this.synthesizeRecommendation({
        scenario,
        guidelines: relevantGuidelines,
        geriatricFactors,
        differentials,
        risks,
        interactions,
        confidence: this.assessConfidence(scenario)
      });
    } catch (error) {
      console.error('Clinical reasoning error:', error);
      return this.generateErrorResponse(error, patientData);
    }
  }

  // Parse clinical scenario from patient data
  async parseScenario(patientData) {
    const scenario = {
      demographics: this.extractDemographics(patientData),
      conditions: this.extractConditions(patientData),
      medications: this.extractMedications(patientData),
      vitals: this.extractVitals(patientData),
      labs: this.extractLabs(patientData),
      socialFactors: this.extractSocialFactors(patientData),
      acuity: this.assessAcuity(patientData)
    };

    return scenario;
  }

  // Extract demographics with special attention to age
  extractDemographics(data) {
    const demographics = {
      age: this.extractAge(data),
      gender: this.extractGender(data),
      weight: this.extractWeight(data),
      ethnicity: this.extractEthnicity(data)
    };

    // Age-based categorization
    if (demographics.age) {
      if (demographics.age >= 85) {
        demographics.ageCategory = 'very elderly';
        demographics.frailtyRisk = 'high';
      } else if (demographics.age >= 75) {
        demographics.ageCategory = 'elderly';
        demographics.frailtyRisk = 'moderate';
      } else if (demographics.age >= 65) {
        demographics.ageCategory = 'older adult';
        demographics.frailtyRisk = 'low-moderate';
      } else {
        demographics.ageCategory = 'adult';
        demographics.frailtyRisk = 'low';
      }
    }

    return demographics;
  }

  // Generate relevant clinical guidelines
  fetchGuidelines(scenario) {
    const guidelines = [];

    // Check for relevant clinical rules
    for (const [condition, rules] of Object.entries(this.clinicalRules)) {
      if (this.isConditionRelevant(condition, scenario)) {
        guidelines.push({
          condition,
          rules,
          relevance: this.calculateRelevance(condition, scenario)
        });
      }
    }

    return guidelines.sort((a, b) => b.relevance - a.relevance);
  }

  // Assess geriatric complexity
  assessGeriatricComplexity(scenario) {
    const complexity = {
      score: 0,
      factors: [],
      implications: []
    };

    // Age factor
    if (scenario.demographics.age >= 85) {
      complexity.score += 3;
      complexity.factors.push('Very advanced age (≥85)');
    } else if (scenario.demographics.age >= 75) {
      complexity.score += 2;
      complexity.factors.push('Advanced age (75-84)');
    }

    // Polypharmacy
    if (scenario.medications && scenario.medications.length >= 10) {
      complexity.score += 3;
      complexity.factors.push('Severe polypharmacy (≥10 medications)');
    } else if (scenario.medications && scenario.medications.length >= 5) {
      complexity.score += 2;
      complexity.factors.push('Polypharmacy (5-9 medications)');
    }

    // Multiple conditions
    if (scenario.conditions && scenario.conditions.length >= 5) {
      complexity.score += 2;
      complexity.factors.push('Multiple comorbidities');
    }

    // High-risk medications
    const highRiskMeds = this.identifyHighRiskMedications(scenario.medications || []);
    if (highRiskMeds.length > 0) {
      complexity.score += highRiskMeds.length;
      complexity.factors.push(`High-risk medications: ${highRiskMeds.join(', ')}`);
    }

    // Generate implications
    if (complexity.score >= 7) {
      complexity.level = 'high';
      complexity.implications = [
        'Comprehensive geriatric assessment recommended',
        'Multidisciplinary team approach needed',
        'Conservative treatment approach',
        'Frequent monitoring required'
      ];
    } else if (complexity.score >= 4) {
      complexity.level = 'moderate';
      complexity.implications = [
        'Enhanced monitoring needed',
        'Consider geriatric consultation',
        'Regular medication review'
      ];
    } else {
      complexity.level = 'low';
      complexity.implications = [
        'Standard geriatric precautions',
        'Regular screening appropriate'
      ];
    }

    return complexity;
  }

  // Generate differential diagnosis considerations
  generateDifferentials(scenario) {
    const differentials = [];

    // Based on presenting symptoms/conditions
    if (scenario.conditions) {
      for (const condition of scenario.conditions) {
        const related = this.getRelatedConditions(condition);
        differentials.push(...related);
      }
    }

    // Age-related considerations
    if (scenario.demographics.age >= 65) {
      differentials.push({
        category: 'geriatric syndromes',
        conditions: ['delirium', 'falls', 'incontinence', 'polypharmacy effects'],
        rationale: 'Common in elderly patients'
      });
    }

    return this.removeDuplicateDifferentials(differentials);
  }

  // Assess clinical risks
  assessRisks(scenario) {
    const risks = {
      bleeding: this.assessBleedingRisk(scenario),
      falls: this.assessFallsRisk(scenario),
      drugInteractions: this.assessDrugInteractionRisk(scenario),
      delirium: this.assessDeliriumRisk(scenario)
    };

    return risks;
  }

  // Check for drug interactions
  checkInteractions(scenario) {
    const interactions = [];
    const medications = scenario.medications || [];

    for (const med of medications) {
      if (this.drugInteractions[med.toLowerCase()]) {
        const drugInfo = this.drugInteractions[med.toLowerCase()];
        
        // Check for interacting drugs in patient's med list
        for (const otherMed of medications) {
          if (drugInfo.major.includes(otherMed.toLowerCase())) {
            interactions.push({
              drug1: med,
              drug2: otherMed,
              severity: 'major',
              management: drugInfo.management,
              monitoring: drugInfo.monitoring
            });
          }
        }
      }
    }

    return interactions;
  }

  // Synthesize final recommendation
  synthesizeRecommendation(analysis) {
    const {
      scenario,
      guidelines,
      geriatricFactors,
      differentials,
      risks,
      interactions,
      confidence
    } = analysis;

    let recommendation = {
      summary: this.generateSummary(scenario, geriatricFactors),
      assessment: this.generateAssessment(scenario, guidelines),
      recommendations: this.generateRecommendations(analysis),
      monitoring: this.generateMonitoring(analysis),
      risks: this.formatRisks(risks),
      interactions: this.formatInteractions(interactions),
      geriatricConsiderations: this.formatGeriatricConsiderations(geriatricFactors),
      confidence: confidence,
      urgency: this.assessUrgency(scenario),
      followUp: this.generateFollowUp(analysis)
    };

    return recommendation;
  }

  // Handle ambiguous inputs
  async handleAmbiguity(input) {
    const ambiguityIndicators = [
      'unclear', 'maybe', 'possibly', 'might be', 'could be',
      'not sure', 'unsure', 'uncertain'
    ];

    const isAmbiguous = ambiguityIndicators.some(indicator => 
      input.toLowerCase().includes(indicator)
    );

    if (isAmbiguous) {
      return {
        clarificationNeeded: true,
        possibleInterpretations: this.generateInterpretations(input),
        suggestedQuestions: this.generateClarifyingQuestions(input),
        recommendation: 'Please provide more specific information for accurate guidance'
      };
    }

    return null;
  }

  // Generate clarifying questions
  generateClarifyingQuestions(input) {
    const questions = [
      'What are the patient\'s current symptoms?',
      'What medications is the patient currently taking?',
      'What is the patient\'s age and medical history?',
      'Are there any specific concerns or goals of care?',
      'Is this an urgent or routine clinical question?'
    ];

    return questions;
  }

  // Utility functions for extraction
  extractAge(data) {
    if (typeof data === 'object' && data.age) return data.age;
    if (typeof data === 'string') {
      const ageMatch = data.match(/(\d{1,3})\s*(?:years?|yo|y\.o\.|yr)/i);
      return ageMatch ? parseInt(ageMatch[1]) : null;
    }
    return null;
  }

  extractGender(data) {
    if (typeof data === 'object' && data.gender) return data.gender;
    if (typeof data === 'string') {
      if (/\b(?:male|man|m)\b/i.test(data)) return 'male';
      if (/\b(?:female|woman|f)\b/i.test(data)) return 'female';
    }
    return null;
  }

  extractMedications(data) {
    // This would be enhanced with the MedicalNLP system
    if (typeof data === 'object' && data.medications) return data.medications;
    if (typeof data === 'string') {
      // Simple extraction - would be enhanced with NLP
      const commonMeds = Object.keys(this.drugInteractions);
      return commonMeds.filter(med => 
        data.toLowerCase().includes(med.toLowerCase())
      );
    }
    return [];
  }

  extractConditions(data) {
    if (typeof data === 'object' && data.conditions) return data.conditions;
    if (typeof data === 'string') {
      const conditions = [];
      const commonConditions = Object.keys(this.clinicalRules);
      for (const condition of commonConditions) {
        if (data.toLowerCase().includes(condition.replace('_', ' '))) {
          conditions.push(condition);
        }
      }
      return conditions;
    }
    return [];
  }

  // Assessment functions
  assessBleedingRisk(scenario) {
    let risk = 0;
    const factors = [];

    if (scenario.demographics.age >= 75) {
      risk += 1;
      factors.push('Age ≥75');
    }

    if (scenario.medications?.includes('warfarin') || 
        scenario.medications?.includes('rivaroxaban') ||
        scenario.medications?.includes('apixaban')) {
      risk += 2;
      factors.push('Anticoagulation');
    }

    return {
      score: risk,
      level: risk >= 3 ? 'high' : risk >= 1 ? 'moderate' : 'low',
      factors
    };
  }

  assessFallsRisk(scenario) {
    let risk = 0;
    const factors = [];

    if (scenario.demographics.age >= 75) {
      risk += 2;
      factors.push('Age ≥75');
    }

    if (scenario.medications && scenario.medications.length >= 5) {
      risk += 1;
      factors.push('Polypharmacy');
    }

    return {
      score: risk,
      level: risk >= 3 ? 'high' : risk >= 1 ? 'moderate' : 'low',
      factors
    };
  }

  identifyHighRiskMedications(medications) {
    const highRiskMeds = [
      'warfarin', 'digoxin', 'lithium', 'phenytoin', 'insulin',
      'benzodiazepines', 'opioids', 'antipsychotics'
    ];

    return medications.filter(med => 
      highRiskMeds.some(highRisk => 
        med.toLowerCase().includes(highRisk)
      )
    );
  }

  // Helper functions
  isConditionRelevant(condition, scenario) {
    return scenario.conditions?.includes(condition) ||
           scenario.medications?.some(med => 
             this.clinicalRules[condition]?.medications?.some(ruleMed =>
               med.toLowerCase().includes(ruleMed.toLowerCase())
             )
           );
  }

  calculateRelevance(condition, scenario) {
    // Simple relevance scoring
    let relevance = 0;
    if (scenario.conditions?.includes(condition)) relevance += 3;
    if (scenario.medications?.some(med => 
      this.clinicalRules[condition]?.medications?.some(ruleMed =>
        med.toLowerCase().includes(ruleMed.toLowerCase())
      )
    )) relevance += 2;
    return relevance;
  }

  assessConfidence(scenario) {
    let confidence = 0.7; // baseline

    // Boost confidence with more data
    if (scenario.demographics.age) confidence += 0.1;
    if (scenario.conditions?.length > 0) confidence += 0.1;
    if (scenario.medications?.length > 0) confidence += 0.1;

    return Math.min(0.95, confidence);
  }

  generateErrorResponse(error, patientData) {
    return {
      error: true,
      message: 'Clinical reasoning analysis encountered an error',
      suggestion: 'Please provide more structured patient information',
      confidence: 0.1,
      recommendations: [
        'Consult with senior physician',
        'Review patient case manually',
        'Consider additional clinical assessment'
      ]
    };
  }

  // Additional helper methods would be implemented here...
  generateSummary(scenario, geriatricFactors) {
    const age = scenario.demographics.age;
    const ageDesc = scenario.demographics.ageCategory || 'adult';
    const complexity = geriatricFactors.level;
    
    return `${age}-year-old ${ageDesc} patient with ${complexity} geriatric complexity`;
  }

  generateAssessment(scenario, guidelines) {
    return guidelines.map(g => `${g.condition}: ${g.rules.assessment || 'Standard assessment'}`);
  }

  generateRecommendations(analysis) {
    const recommendations = [];
    
    // Add guideline-based recommendations
    for (const guideline of analysis.guidelines) {
      if (guideline.rules.treatment) {
        recommendations.push(`For ${guideline.condition}: ${guideline.rules.treatment}`);
      }
    }
    
    // Add geriatric-specific recommendations
    if (analysis.geriatricFactors.level === 'high') {
      recommendations.push('Consider comprehensive geriatric assessment');
    }
    
    return recommendations;
  }

  generateMonitoring(analysis) {
    const monitoring = [];
    
    for (const guideline of analysis.guidelines) {
      if (guideline.rules.monitoring) {
        monitoring.push(...guideline.rules.monitoring);
      }
    }
    
    return [...new Set(monitoring)]; // Remove duplicates
  }

  formatRisks(risks) {
    return Object.entries(risks).map(([risk, assessment]) => ({
      type: risk,
      level: assessment.level,
      factors: assessment.factors
    }));
  }

  formatInteractions(interactions) {
    return interactions.map(interaction => ({
      combination: `${interaction.drug1} + ${interaction.drug2}`,
      severity: interaction.severity,
      action: interaction.management?.join(', ') || 'Monitor closely'
    }));
  }

  formatGeriatricConsiderations(geriatricFactors) {
    return {
      complexity: geriatricFactors.level,
      factors: geriatricFactors.factors,
      implications: geriatricFactors.implications
    };
  }

  assessUrgency(scenario) {
    // Simple urgency assessment
    if (scenario.acuity === 'emergency') return 'immediate';
    if (scenario.demographics.age >= 85) return 'urgent';
    return 'routine';
  }

  generateFollowUp(analysis) {
    const followUp = [];
    
    if (analysis.geriatricFactors.level === 'high') {
      followUp.push('Follow up within 1-2 weeks');
      followUp.push('Consider geriatric consultation');
    } else {
      followUp.push('Routine follow-up as clinically indicated');
    }
    
    return followUp;
  }
}

export default ClinicalReasoningEngine;