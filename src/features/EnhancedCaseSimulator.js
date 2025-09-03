// Enhanced Case Simulator with Complex Clinical Scenarios
// Real-time decision making with scoring and feedback

export const EnhancedCaseSimulator = {
  scenarios: {
    nightShift: {
      '2AM Delirium': {
        id: 'ns_delirium_001',
        time: '02:00',
        setting: 'Medical ward',
        presentation: {
          initial: 'Nurse calls: 85-year-old man with dementia is pulling at his IV lines, shouting "Let me out!" and trying to climb out of bed.',
          vitals: 'BP 160/90, HR 110, RR 22, O2 sat 92% on RA, Temp 37.8°C',
          background: 'Admitted 2 days ago for CHF exacerbation. Baseline mild dementia, lives with daughter.',
          medications: ['Furosemide 40mg BID', 'Lisinopril 10mg daily', 'Metoprolol 25mg BID', 'Donepezil 10mg QHS'],
          familyPresent: true,
          culturalFactors: 'Orthodox Jewish, Shabbat restrictions in effect',
          nurseObservations: 'Was calm at 10 PM rounds, no signs of distress then'
        },
        decisionPoints: [
          {
            id: 1,
            prompt: 'What is your immediate first action?',
            timeLimit: 30,
            options: [
              { text: 'Order haloperidol 0.5mg IM STAT', score: 0, feedback: 'Too early for medications - assess first' },
              { text: 'Go see the patient immediately', score: 10, feedback: 'Correct - always assess personally first' },
              { text: 'Order physical restraints', score: -5, feedback: 'Restraints worsen delirium and agitation' },
              { text: 'Call security', score: -3, feedback: 'Escalation inappropriate without assessment' }
            ]
          },
          {
            id: 2,
            prompt: 'At bedside, patient is agitated but redirectable. Family member (daughter) is anxious. Next step?',
            timeLimit: 60,
            options: [
              { text: 'Perform CAM assessment', score: 10, feedback: 'Excellent - confirm delirium diagnosis' },
              { text: 'Order STAT labs and cultures', score: 7, feedback: 'Good - look for precipitants' },
              { text: 'Reassure family and use reorientation', score: 8, feedback: 'Good non-pharmacologic approach' },
              { text: 'Give lorazepam 0.5mg PO', score: -3, feedback: 'Benzos worsen delirium in elderly' }
            ]
          },
          {
            id: 3,
            prompt: 'CAM positive. Labs pending. Patient trying to stand. Family asks "Can you give him something to calm down?"',
            timeLimit: 45,
            options: [
              { text: 'Explain delirium, involve family in reorientation', score: 10, feedback: 'Best approach - family involvement crucial' },
              { text: 'Quetiapine 12.5mg PO now', score: 6, feedback: 'Reasonable if non-pharm fails' },
              { text: 'Haloperidol 0.25mg IM', score: 4, feedback: 'OK but try PO first if possible' },
              { text: 'Diphenhydramine 25mg', score: -5, feedback: 'Anticholinergics worsen delirium' }
            ]
          },
          {
            id: 4,
            prompt: 'Family helps calm patient. Labs back: Na 128, WBC 12.5, UA positive for bacteria. What now?',
            timeLimit: 90,
            options: [
              { text: 'Treat UTI and correct hyponatremia slowly', score: 10, feedback: 'Address both precipitants' },
              { text: 'Bolus 3% saline for hyponatremia', score: -3, feedback: 'Too aggressive - risk osmotic demyelination' },
              { text: 'Hold furosemide, give NS slowly', score: 8, feedback: 'Good initial approach' },
              { text: 'Start broad spectrum antibiotics', score: 6, feedback: 'Reasonable but get cultures first' }
            ]
          },
          {
            id: 5,
            prompt: 'Morning update: Patient calmer, Na 132, family stayed overnight. Disposition?',
            timeLimit: 120,
            options: [
              { text: 'Continue current management, family education', score: 10, feedback: 'Excellent comprehensive care' },
              { text: 'Psychiatry consult', score: 3, feedback: 'Not needed for simple delirium' },
              { text: 'Transfer to ICU', score: -2, feedback: 'Unnecessary escalation' },
              { text: 'Increase donepezil dose', score: -1, feedback: "Won't help acute delirium" }
            ]
          }
        ],
        scoring: {
          perfect: 50,
          passing: 35,
          feedback: {
            excellent: 'Outstanding delirium management!',
            good: 'Good clinical judgment shown',
            poor: 'Review delirium protocols'
          }
        },
        teachingPoints: [
          'Always assess delirium patients personally before medicating',
          'Family involvement is crucial for reorientation',
          'Address underlying precipitants (infection, metabolic)',
          'Avoid benzodiazepines except for alcohol withdrawal',
          'Cultural sensitivity matters even in emergencies'
        ]
      },

      'Midnight Fall': {
        id: 'ns_fall_001',
        time: '00:30',
        setting: 'Geriatrics unit',
        presentation: {
          initial: 'CNA found 78-year-old woman on floor beside bed, confused, small forehead laceration bleeding.',
          vitals: 'BP 140/85 lying, 110/70 standing, HR 88, RR 16, O2 sat 96%',
          background: 'Day 3 post-op hip replacement, on warfarin for AFib',
          medications: ['Warfarin 3mg daily', 'Oxycodone 5mg q6h PRN', 'Zolpidem 5mg QHS', 'Amlodipine 5mg daily'],
          lastINR: '2.8 (yesterday)',
          neuroExam: 'Confused to place, moves all extremities, pupils equal and reactive'
        },
        decisionPoints: [
          {
            id: 1,
            prompt: 'Immediate priority?',
            timeLimit: 20,
            options: [
              { text: 'STAT head CT', score: 10, feedback: 'Correct - anticoagulated + head trauma = urgent imaging' },
              { text: 'Suture laceration', score: 2, feedback: 'Important but not first priority' },
              { text: 'Check blood glucose', score: 5, feedback: 'Good thought but CT more urgent' },
              { text: 'X-ray hip', score: 3, feedback: 'Consider after ruling out head bleed' }
            ]
          },
          {
            id: 2,
            prompt: 'CT shows no acute bleed, small chronic microvascular changes. Next?',
            timeLimit: 60,
            options: [
              { text: 'Neuro checks q2h, hold warfarin tonight', score: 10, feedback: 'Appropriate monitoring' },
              { text: 'Reverse warfarin with vitamin K', score: -2, feedback: 'Unnecessary without bleeding' },
              { text: 'Transfer to ICU', score: -1, feedback: 'Not indicated' },
              { text: 'Continue warfarin as scheduled', score: 4, feedback: 'Reasonable but cautious hold better' }
            ]
          },
          {
            id: 3,
            prompt: 'Review shows patient got zolpidem 2 hours before fall. Action?',
            timeLimit: 45,
            options: [
              { text: 'Discontinue zolpidem, document as adverse event', score: 10, feedback: 'Correct - major fall risk' },
              { text: 'Reduce zolpidem to 2.5mg', score: 2, feedback: 'Still risky in elderly' },
              { text: 'Switch to trazodone 25mg', score: 8, feedback: 'Better option for elderly' },
              { text: 'Add bed alarm', score: 6, feedback: 'Good but address root cause too' }
            ]
          }
        ],
        scoring: {
          perfect: 30,
          passing: 20
        },
        teachingPoints: [
          'Anticoagulated patients need urgent CT for head trauma',
          'Z-drugs (zolpidem) are high fall risk in elderly',
          'Orthostatic hypotension contributes to falls',
          'Post-fall huddle should address modifiable factors'
        ]
      }
    },

    ethicalDilemmas: {
      'Capacity vs Family': {
        id: 'eth_capacity_001',
        title: 'Placement Refusal',
        scenario: {
          patient: '82-year-old widow with mild dementia, recurrent falls, lives alone',
          presentation: 'Admitted after fall with hip fracture, now post-op day 5',
          cognitiveStatus: 'MMSE 22/30, knows person and place, inconsistent with time',
          situation: 'PT/OT recommend skilled nursing placement. Patient insists on going home alone.',
          family: 'Son from Tel Aviv demands nursing home placement, threatens legal action',
          socialFactors: 'Owns apartment, receives modest Bituach Leumi, proud of independence'
        },
        legalContext: {
          israeliLaw: 'Legal Capacity and Guardianship Law (1962)',
          requirements: 'Must prove inability to manage affairs',
          process: 'Family court petition, medical opinions required',
          alternatives: 'Supportive decision-making, limited guardianship'
        },
        decisionTree: [
          {
            id: 1,
            prompt: 'How do you assess capacity for discharge planning?',
            options: [
              { 
                text: 'Use formal capacity assessment tool', 
                score: 10, 
                leads: 2,
                feedback: 'Correct - document thoroughly' 
              },
              { 
                text: 'Defer to family wishes', 
                score: -5, 
                leads: 'bad_ending_1',
                feedback: 'Violates patient autonomy' 
              },
              { 
                text: 'Consult psychiatry', 
                score: 7, 
                leads: 2,
                feedback: 'Helpful for complex cases' 
              },
              { 
                text: 'Assume lacks capacity due to dementia', 
                score: -3, 
                leads: 'bad_ending_2',
                feedback: 'Dementia doesn\'t automatically mean incapacity' 
              }
            ]
          },
          {
            id: 2,
            prompt: 'Patient demonstrates understanding of risks but still refuses. Now what?',
            options: [
              { 
                text: 'Explore compromise - home with services', 
                score: 10, 
                leads: 3,
                feedback: 'Excellent - respect autonomy with safety measures' 
              },
              { 
                text: 'Document capacity and discharge home', 
                score: 6, 
                leads: 'neutral_ending',
                feedback: 'Legal but consider safety' 
              },
              { 
                text: 'Ask son to petition for guardianship', 
                score: 2, 
                leads: 'legal_battle',
                feedback: 'Last resort only' 
              },
              { 
                text: 'Refuse to discharge', 
                score: -2, 
                leads: 'conflict',
                feedback: 'Cannot hold capacitated patient' 
              }
            ]
          },
          {
            id: 3,
            prompt: 'Patient agrees to home care 4 hours daily. Son still objects. Final approach?',
            options: [
              { 
                text: 'Family meeting with social work mediation', 
                score: 10, 
                leads: 'good_ending',
                feedback: 'Best approach - facilitate communication' 
              },
              { 
                text: 'Proceed with patient\'s plan', 
                score: 7, 
                leads: 'adequate_ending',
                feedback: 'Respect autonomy but maintain family dialogue' 
              },
              { 
                text: 'Consult ethics committee', 
                score: 8, 
                leads: 'good_ending',
                feedback: 'Helpful for complex situations' 
              },
              { 
                text: 'Delay discharge for more discussion', 
                score: 4, 
                leads: 'prolonged_stay',
                feedback: 'May be appropriate short-term' 
              }
            ]
          }
        ],
        endings: {
          good_ending: {
            outcome: 'Successful mediation leads to agreed plan with home care and family supervision',
            learning: 'Patient autonomy preserved with safety measures'
          },
          adequate_ending: {
            outcome: 'Patient goes home with services, family remains concerned but involved',
            learning: 'Sometimes perfect agreement isn\'t possible'
          },
          bad_ending_1: {
            outcome: 'Patient rights violated, potential legal action against hospital',
            learning: 'Never override capacitated patient wishes'
          },
          bad_ending_2: {
            outcome: 'Incorrect capacity assessment leads to inappropriate placement',
            learning: 'Proper capacity assessment is crucial'
          },
          legal_battle: {
            outcome: 'Prolonged legal proceedings, patient deteriorates in hospital',
            learning: 'Legal battles rarely benefit patient'
          },
          conflict: {
            outcome: 'Escalating conflict, therapeutic relationship damaged',
            learning: 'Authoritarian approach backfires'
          },
          neutral_ending: {
            outcome: 'Patient discharged, readmitted 2 weeks later after fall',
            learning: 'Consider creative compromises'
          },
          prolonged_stay: {
            outcome: 'Extended stay leads to hospital-acquired complications',
            learning: 'Timely discharge planning important'
          }
        },
        documentation: [
          'Capacity assessment form',
          'Social work consultation',
          'Family meeting notes',
          'Risk-benefit discussion',
          'Discharge safety checklist'
        ]
      },

      'End of Life': {
        id: 'eth_eol_001',
        title: 'Comfort Care Transition',
        scenario: {
          patient: '88-year-old rabbi with end-stage dementia, aspiration pneumonia',
          presentation: 'Third admission in 2 months, not responding to antibiotics',
          family: 'Large family, divided opinions, some quote religious law',
          medicalFutility: 'Medical team agrees further aggressive care unlikely to help',
          culturalContext: 'Jewish law perspectives on end-of-life care vary'
        },
        decisions: [
          {
            id: 1,
            prompt: 'How to approach goals of care discussion?',
            options: [
              { text: 'Family meeting with rabbi present', score: 10, feedback: 'Culturally sensitive approach' },
              { text: 'Speak only with healthcare proxy', score: 4, feedback: 'Legal but misses family dynamics' },
              { text: 'Present medical facts, let family decide', score: 6, feedback: 'Good but provide guidance too' },
              { text: 'Recommend comfort care strongly', score: 3, feedback: 'Too directive initially' }
            ]
          }
        ]
      }
    },

    emergencies: {
      'Status Epilepticus in Dementia': {
        id: 'em_seizure_001',
        title: 'Refractory Status Epilepticus',
        timeline: 'real-time',
        scenario: {
          initial: '79-year-old with Alzheimer\'s, witnessed tonic-clonic seizure ongoing 3 minutes',
          weight: '70kg',
          allergies: 'Phenytoin (rash)',
          medications: ['Donepezil', 'Sertraline', 'Amlodipine'],
          vitalTrends: {
            0: { BP: '180/100', HR: 120, O2: 88 },
            5: { BP: '160/90', HR: 110, O2: 90 },
            10: { BP: '140/80', HR: 100, O2: 92 }
          }
        },
        timelinedDecisions: [
          {
            timepoint: '0-2 minutes',
            prompt: 'Immediate action?',
            critical: true,
            options: [
              { text: 'Lorazepam 2mg IV', score: 10, feedback: 'Correct first-line' },
              { text: 'Diazepam 10mg IV', score: 8, feedback: 'Acceptable alternative' },
              { text: 'Midazolam 10mg IM', score: 9, feedback: 'Good if no IV access' },
              { text: 'Load phenytoin', score: -5, feedback: 'Patient allergic!' }
            ]
          },
          {
            timepoint: '5 minutes',
            prompt: 'Seizure continues after lorazepam. Next?',
            critical: true,
            options: [
              { text: 'Repeat lorazepam 2mg IV', score: 10, feedback: 'Correct - can repeat once' },
              { text: 'Start levetiracetam 20mg/kg IV', score: 8, feedback: 'Reasonable second-line' },
              { text: 'Intubate now', score: 2, feedback: 'Premature unless respiratory failure' },
              { text: 'Valproate 20mg/kg IV', score: 7, feedback: 'Alternative second-line' }
            ]
          },
          {
            timepoint: '10 minutes',
            prompt: 'Still seizing after 2 doses lorazepam. Now?',
            critical: true,
            options: [
              { text: 'Levetiracetam 30mg/kg IV + prepare for intubation', score: 10, feedback: 'Appropriate escalation' },
              { text: 'Propofol infusion', score: 6, feedback: 'Requires intubation first' },
              { text: 'More benzodiazepines', score: 2, feedback: 'Risk respiratory depression' },
              { text: 'Call neurology', score: 4, feedback: 'Do it but don\'t delay treatment' }
            ]
          }
        ],
        complications: {
          respiratory: 'Aspiration risk high in elderly',
          metabolic: 'Rhabdomyolysis, lactic acidosis',
          cognitive: 'Prolonged post-ictal state in dementia'
        },
        outcomes: {
          success: 'Seizure controlled, avoided intubation, transferred to ward',
          partial: 'Required intubation but weaned next day',
          poor: 'Delayed treatment led to prolonged ICU stay'
        }
      },

      'Acute MI Atypical': {
        id: 'em_mi_001',
        title: 'Silent MI in Diabetic',
        presentation: {
          chief: '84-year-old diabetic woman "just doesn\'t feel right"',
          symptoms: 'Fatigue x 2 days, mild nausea, no chest pain',
          vitals: 'BP 100/60, HR 95, RR 20, O2 94%',
          exam: 'Mild crackles bases, no JVD, cool extremities',
          ecg: 'ST depressions V4-V6, T wave inversions',
          troponin: 'First: 0.8, Second (3h): 2.4'
        },
        decisions: [
          {
            prompt: 'Initial management?',
            options: [
              { text: 'ASA 325mg, heparin, cardiology consult', score: 10 },
              { text: 'Observe, repeat troponin', score: 2 },
              { text: 'Thrombolytics', score: -3 },
              { text: 'Immediate cath lab', score: 7 }
            ]
          }
        ]
      }
    }
  },

  // Scoring system
  scoreCase(caseId, responses, timeData) {
    let totalScore = 0;
    let maxScore = 0;
    const feedback = [];
    
    responses.forEach((response, index) => {
      totalScore += response.score;
      maxScore += 10; // Assuming max 10 per question
      
      feedback.push({
        question: index + 1,
        score: response.score,
        feedback: response.feedback,
        timeToAnswer: timeData[index]
      });
    });
    
    const percentage = (totalScore / maxScore * 100).toFixed(1);
    
    return {
      totalScore,
      maxScore,
      percentage,
      grade: this.calculateGrade(percentage),
      feedback,
      averageResponseTime: timeData.reduce((a, b) => a + b, 0) / timeData.length,
      recommendations: this.generateRecommendations(percentage, feedback)
    };
  },

  calculateGrade(percentage) {
    if (percentage >= 90) return 'A - Excellent';
    if (percentage >= 80) return 'B - Good';
    if (percentage >= 70) return 'C - Satisfactory';
    if (percentage >= 60) return 'D - Needs Improvement';
    return 'F - Requires Remediation';
  },

  generateRecommendations(percentage, feedback) {
    const recs = [];
    
    if (percentage < 70) {
      recs.push('Review clinical guidelines for scenario topics');
      recs.push('Practice more emergency scenarios');
    }
    
    // Analyze patterns in wrong answers
    const lowScores = feedback.filter(f => f.score < 5);
    if (lowScores.length > 0) {
      recs.push('Focus on: ' + [...new Set(lowScores.map(f => f.category))].join(', '));
    }
    
    // Time-based recommendations
    const slowResponses = feedback.filter(f => f.timeToAnswer > 60);
    if (slowResponses.length > feedback.length / 2) {
      recs.push('Practice rapid decision-making for emergencies');
    }
    
    return recs;
  },

  // Save and track performance
  savePerformance(userId, caseId, score) {
    const performance = JSON.parse(localStorage.getItem('casePerformance') || '{}');
    
    if (!performance[userId]) {
      performance[userId] = {};
    }
    
    if (!performance[userId][caseId]) {
      performance[userId][caseId] = [];
    }
    
    performance[userId][caseId].push({
      score,
      date: Date.now(),
      attempts: performance[userId][caseId].length + 1
    });
    
    localStorage.setItem('casePerformance', JSON.stringify(performance));
    
    return performance[userId][caseId];
  },

  // Get recommended cases based on weaknesses
  getRecommendedCases(userId) {
    const performance = JSON.parse(localStorage.getItem('casePerformance') || '{}');
    const userPerf = performance[userId] || {};
    
    const recommendations = [];
    
    // Find weak areas
    Object.entries(userPerf).forEach(([caseId, attempts]) => {
      const lastAttempt = attempts[attempts.length - 1];
      if (lastAttempt.score.percentage < 70) {
        const scenario = this.findScenarioById(caseId);
        if (scenario) {
          recommendations.push({
            caseId,
            reason: 'Low score on previous attempt',
            lastScore: lastAttempt.score.percentage,
            category: scenario.category
          });
        }
      }
    });
    
    // Add untried cases
    const allCases = this.getAllCaseIds();
    const triedCases = Object.keys(userPerf);
    const untriedCases = allCases.filter(id => !triedCases.includes(id));
    
    untriedCases.slice(0, 3).forEach(caseId => {
      recommendations.push({
        caseId,
        reason: 'Not yet attempted',
        category: this.findScenarioById(caseId)?.category
      });
    });
    
    return recommendations;
  },

  findScenarioById(id) {
    // Search through all scenarios
    for (const category of Object.values(this.scenarios)) {
      for (const scenario of Object.values(category)) {
        if (scenario.id === id) {
          return scenario;
        }
      }
    }
    return null;
  },

  getAllCaseIds() {
    const ids = [];
    for (const category of Object.values(this.scenarios)) {
      for (const scenario of Object.values(category)) {
        if (scenario.id) {
          ids.push(scenario.id);
        }
      }
    }
    return ids;
  }
};

export default EnhancedCaseSimulator;