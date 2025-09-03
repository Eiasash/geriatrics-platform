// ========== ADVANCED AI SYSTEM WITH COMPREHENSIVE MEDICAL KNOWLEDGE ==========

// Medical Knowledge Base
const MedicalKnowledgeBase = {
    // Comprehensive Drug Database
    drugs: {
        'lorazepam': {
            class: 'Benzodiazepine',
            halfLife: '12 hours',
            elderlyDose: '0.5-1mg',
            beers2023: 'AVOID',
            fallRisk: '+48%',
            alternatives: ['Melatonin 3-6mg', 'Trazodone 25-50mg', 'Ramelteon 8mg'],
            taperSchedule: 'Reduce 25% q2weeks',
            interactions: ['Opioids', 'Alcohol', 'Other CNS depressants'],
            renalAdjustment: 'No adjustment needed',
            hepaticAdjustment: 'Reduce dose 50%',
            monitoring: ['Sedation', 'Falls', 'Confusion'],
            contraindications: ['Sleep apnea', 'Severe respiratory insufficiency']
        },
        'metformin': {
            class: 'Biguanide',
            halfLife: '6.2 hours',
            elderlyDose: 'Start 500mg daily, max 2000mg',
            beers2023: 'OK with CrCl >30',
            fallRisk: 'None',
            alternatives: ['DPP-4i', 'GLP-1', 'SGLT2i'],
            contraindications: ['CrCl <30', 'Acute illness', 'Contrast within 48h'],
            monitoring: ['B12 annually', 'Renal function q3-6mo'],
            sideEffects: ['GI upset 30%', 'B12 deficiency', 'Lactic acidosis (rare)']
        },
        'amlodipine': {
            class: 'Calcium channel blocker',
            halfLife: '30-50 hours',
            elderlyDose: 'Start 2.5mg daily',
            beers2023: 'Acceptable',
            fallRisk: 'Orthostatic hypotension',
            interactions: ['Simvastatin (limit 20mg)', 'CYP3A4 inhibitors'],
            sideEffects: ['Ankle edema 10-15%', 'Flushing', 'Headache'],
            monitoring: ['BP', 'Edema', 'Heart rate']
        }
        // ... extensive drug database
    },
    
    // Disease Management Protocols
    conditions: {
        'frailty': {
            diagnostic: {
                fried: {
                    criteria: ['Weight loss ≥4.5kg/year', 'Exhaustion', 'Low activity', 'Slow gait <0.8m/s', 'Weak grip'],
                    interpretation: '≥3 = Frail, 1-2 = Pre-frail'
                },
                cfs: {
                    scale: 1-9,
                    mild: 5,
                    moderate: 6,
                    severe: 7
                }
            },
            management: {
                nutrition: 'Protein 1.2-1.5g/kg/day, Vitamin D 1000-2000 IU',
                exercise: 'Resistance training 2-3x/week, balance exercises',
                medications: 'Comprehensive review, deprescribe PIMs',
                social: 'Address isolation, caregiver support'
            },
            monitoring: 'Every 3-6 months',
            prognosis: {
                mild: '2-year mortality 10%',
                moderate: '2-year mortality 25%',
                severe: '2-year mortality 45%'
            }
        },
        'delirium': {
            diagnostic: {
                cam: {
                    required: ['Acute onset + fluctuation', 'Inattention'],
                    additional: ['Disorganized thinking', 'Altered consciousness'],
                    formula: '(1 AND 2) AND (3 OR 4)'
                },
                '4at': {
                    alertness: 0-4,
                    amt4: 0-2,
                    attention: 0-2,
                    acuteChange: 0-4,
                    interpretation: '≥4 = Delirium likely'
                }
            },
            causes: {
                drugs: ['Benzodiazepines', 'Anticholinergics', 'Opioids', 'Steroids'],
                infections: ['UTI', 'Pneumonia', 'Cellulitis'],
                metabolic: ['Hyponatremia', 'Hypoglycemia', 'Hypercalcemia', 'Uremia'],
                neurologic: ['Stroke', 'Seizure', 'Subdural'],
                other: ['Pain', 'Constipation', 'Urinary retention', 'Sleep deprivation']
            },
            prevention: {
                help: ['Orient q4h', 'Mobilize TID', 'Sleep hygiene', 'Glasses/hearing aids', 'Hydration'],
                medications: 'Daily review, avoid high-risk drugs',
                environment: 'Quiet, well-lit, familiar objects'
            },
            treatment: {
                nonPharm: 'First-line always',
                pharm: {
                    mild: 'Usually not needed',
                    severe: 'Haloperidol 0.25-0.5mg PO/IM q6h PRN',
                    max: '2mg/24h in elderly',
                    avoid: 'Benzodiazepines (except ETOH withdrawal)'
                }
            }
        },
        'dementia': {
            types: {
                alzheimer: {
                    prevalence: '60-70%',
                    features: 'Memory loss, aphasia, apraxia, agnosia',
                    treatment: 'Cholinesterase inhibitors, memantine'
                },
                vascular: {
                    prevalence: '15-20%',
                    features: 'Stepwise decline, focal neuro signs',
                    treatment: 'Risk factor modification, antiplatelets'
                },
                lewy: {
                    prevalence: '10-15%',
                    features: 'Fluctuations, hallucinations, parkinsonism',
                    treatment: 'Rivastigmine, avoid antipsychotics'
                },
                frontotemporal: {
                    prevalence: '5-10%',
                    features: 'Behavior changes, language problems',
                    treatment: 'SSRIs for behaviors, no ChEIs'
                }
            },
            assessment: {
                screening: ['Mini-Cog', 'MMSE', 'MoCA', 'SLUMS'],
                functional: ['ADLs', 'IADLs', 'FAQ'],
                behavioral: ['NPI', 'BEHAVE-AD'],
                staging: ['CDR', 'GDS', 'FAST']
            },
            management: {
                cognitive: {
                    mild: 'Cholinesterase inhibitors',
                    moderate: 'Add memantine',
                    severe: 'Consider discontinuation'
                },
                behavioral: {
                    firstLine: 'Non-pharmacological',
                    secondLine: 'SSRIs',
                    lastResort: 'Antipsychotics (black box warning)'
                }
            }
        }
    },
    
    // Clinical Calculators with Interpretations
    calculators: {
        cha2ds2vasc: {
            calculate: (age, sex, chf, htn, stroke, vascular, diabetes) => {
                let score = 0;
                if (age >= 75) score += 2;
                else if (age >= 65) score += 1;
                if (sex === 'female') score += 1;
                if (chf) score += 1;
                if (htn) score += 1;
                if (stroke) score += 2;
                if (vascular) score += 1;
                if (diabetes) score += 1;
                return score;
            },
            interpret: (score) => {
                const risk = [0, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 15.2];
                return {
                    annualStrokeRisk: risk[score] || 15.2,
                    recommendation: score === 0 ? 'No anticoagulation' :
                                   score === 1 ? 'Consider anticoagulation' :
                                   'Anticoagulation recommended',
                    preferredAgent: 'DOAC over warfarin in elderly'
                };
            }
        },
        hasbled: {
            calculate: (htn, renal, liver, stroke, bleeding, labile, elderly, drugs, alcohol) => {
                let score = 0;
                if (htn) score += 1;
                if (renal) score += 1;
                if (liver) score += 1;
                if (stroke) score += 1;
                if (bleeding) score += 1;
                if (labile) score += 1;
                if (elderly) score += 1;
                if (drugs) score += 1;
                if (alcohol) score += 1;
                return score;
            },
            interpret: (score) => {
                const risk = [0.9, 3.4, 4.1, 5.8, 8.9, 9.1, 10.0];
                return {
                    annualBleedingRisk: risk[score] || 10.0,
                    recommendation: score >= 3 ? 'High risk - closer monitoring' : 'Standard monitoring'
                };
            }
        },
        creatinineClearance: {
            cockcroftGault: (age, weight, creatinine, sex) => {
                let crcl = ((140 - age) * weight) / (72 * creatinine);
                if (sex === 'female') crcl *= 0.85;
                return Math.round(crcl);
            },
            interpret: (crcl) => {
                if (crcl >= 60) return 'Normal - no dose adjustment';
                if (crcl >= 30) return 'Mild-moderate impairment - adjust some medications';
                if (crcl >= 15) return 'Severe impairment - many drugs contraindicated';
                return 'Kidney failure - consider dialysis';
            }
        }
    }
};

// Advanced AI Clinical Decision Engine
class ClinicalAI {
    constructor() {
        this.kb = MedicalKnowledgeBase;
        this.learningData = this.loadLearningData();
    }
    
    // Comprehensive Patient Analysis
    analyzePatient(patient) {
        const analysis = {
            timestamp: new Date().toISOString(),
            demographics: this.analyzeDemographics(patient),
            frailtyAssessment: this.assessFrailty(patient),
            fallRisk: this.calculateFallRisk(patient),
            medicationReview: this.reviewMedications(patient),
            cognitiveStatus: this.assessCognition(patient),
            nutritionalStatus: this.assessNutrition(patient),
            functionalStatus: this.assessFunction(patient),
            socialAssessment: this.assessSocial(patient),
            predictions: this.predictOutcomes(patient),
            recommendations: this.generateRecommendations(patient),
            alerts: this.identifyAlerts(patient)
        };
        
        // Calculate overall risk score
        analysis.overallRisk = this.calculateOverallRisk(analysis);
        
        // Generate priority action list
        analysis.priorities = this.prioritizeInterventions(analysis);
        
        return analysis;
    }
    
    // Intelligent Medication Optimization
    optimizeMedications(patient) {
        const optimization = {
            currentRegimen: patient.medications,
            problems: [],
            recommendations: [],
            alternatives: {},
            timeline: []
        };
        
        // Check each medication
        patient.medications.forEach(med => {
            // Beers Criteria 2023
            const beersViolation = this.checkBeers2023(med, patient);
            if (beersViolation) {
                optimization.problems.push(beersViolation);
            }
            
            // Drug-drug interactions
            const interactions = this.checkAllInteractions(med, patient.medications);
            optimization.problems.push(...interactions);
            
            // Renal dosing
            if (patient.crcl < 60) {
                const renalAdjustment = this.checkRenalDosing(med, patient.crcl);
                if (renalAdjustment) {
                    optimization.recommendations.push(renalAdjustment);
                }
            }
            
            // Duplicate therapy
            const duplicates = this.checkDuplicateTherapy(med, patient.medications);
            if (duplicates.length > 0) {
                optimization.problems.push({
                    type: 'DUPLICATE_THERAPY',
                    medications: duplicates,
                    recommendation: 'Discontinue one agent'
                });
            }
            
            // Indication check
            if (!this.hasValidIndication(med, patient)) {
                optimization.recommendations.push({
                    medication: med.name,
                    action: 'DISCONTINUE',
                    reason: 'No clear indication',
                    priority: 'MEDIUM'
                });
            }
        });
        
        // Generate optimized regimen
        optimization.optimizedRegimen = this.generateOptimizedRegimen(
            patient.medications,
            optimization.problems,
            patient
        );
        
        // Create implementation timeline
        optimization.timeline = this.createDeprescribingTimeline(optimization.recommendations);
        
        // Calculate risk reduction
        optimization.riskReduction = this.calculateRiskReduction(
            patient.medications,
            optimization.optimizedRegimen
        );
        
        return optimization;
    }
    
    // Predictive Analytics
    predictOutcomes(patient) {
        const predictions = {};
        
        // 30-day readmission risk
        predictions.readmission30Day = this.predictReadmission(patient);
        
        // 6-month mortality risk
        predictions.mortality6Month = this.predictMortality(patient);
        
        // 1-year frailty progression
        predictions.frailtyProgression = this.predictFrailtyProgression(patient);
        
        // Fall risk in next 6 months
        predictions.fallRisk6Month = this.predictFalls(patient);
        
        // Delirium risk if hospitalized
        predictions.deliriumRisk = this.predictDelirium(patient);
        
        // Functional decline trajectory
        predictions.functionalTrajectory = this.predictFunctionalDecline(patient);
        
        return predictions;
    }
    
    // Machine Learning Models (Simulated)
    predictReadmission(patient) {
        // Simplified HOSPITAL score
        let score = 0;
        
        // Hemoglobin <12
        if (patient.labs?.hemoglobin < 12) score += 1;
        
        // Oncology service
        if (patient.conditions?.includes('cancer')) score += 2;
        
        // Sodium <135
        if (patient.labs?.sodium < 135) score += 1;
        
        // Procedure during admission
        if (patient.recentProcedure) score += 1;
        
        // Index admission urgent
        if (patient.admissionType === 'urgent') score += 1;
        
        // Number of admissions in past year
        if (patient.admissionsLastYear >= 1) score += 2;
        
        // Length of stay ≥5 days
        if (patient.lengthOfStay >= 5) score += 2;
        
        const riskMap = {
            0: 5.8, 1: 8.4, 2: 11.9, 3: 16.3, 4: 21.6,
            5: 27.8, 6: 34.8, 7: 42.3, 8: 50, 9: 57.4, 10: 64.4
        };
        
        return {
            score: score,
            probability: riskMap[score] || 64.4,
            risk: score >= 7 ? 'HIGH' : score >= 5 ? 'MODERATE' : 'LOW',
            interventions: this.getReadmissionInterventions(score)
        };
    }
    
    // Natural Language Processing for Clinical Notes
    analyzeClinicaNote(noteText) {
        const analysis = {
            symptoms: [],
            medications: [],
            diagnoses: [],
            socialFactors: [],
            redFlags: [],
            sentiment: 'neutral'
        };
        
        // Extract symptoms
        const symptomKeywords = ['pain', 'fatigue', 'confusion', 'fall', 'dizzy', 'weak', 'sob', 'chest'];
        symptomKeywords.forEach(symptom => {
            if (noteText.toLowerCase().includes(symptom)) {
                analysis.symptoms.push(symptom);
            }
        });
        
        // Extract medication mentions
        const medRegex = /\b(?:mg|mcg|units?|tablets?|caps?)\b/gi;
        const sentences = noteText.split('.');
        sentences.forEach(sentence => {
            if (medRegex.test(sentence)) {
                analysis.medications.push(sentence.trim());
            }
        });
        
        // Identify red flags
        const redFlags = ['suicidal', 'chest pain', 'sob', 'altered mental', 'fever', 'unresponsive'];
        redFlags.forEach(flag => {
            if (noteText.toLowerCase().includes(flag)) {
                analysis.redFlags.push(flag);
            }
        });
        
        // Simple sentiment analysis
        const positiveWords = ['improved', 'better', 'stable', 'good', 'well'];
        const negativeWords = ['worse', 'declined', 'poor', 'deteriorated', 'concern'];
        
        let sentiment = 0;
        positiveWords.forEach(word => {
            if (noteText.toLowerCase().includes(word)) sentiment++;
        });
        negativeWords.forEach(word => {
            if (noteText.toLowerCase().includes(word)) sentiment--;
        });
        
        analysis.sentiment = sentiment > 0 ? 'positive' : sentiment < 0 ? 'negative' : 'neutral';
        
        return analysis;
    }
    
    // Evidence-Based Recommendations Generator
    generateRecommendations(patient) {
        const recommendations = [];
        
        // Frailty-based recommendations
        if (patient.frailtyScore >= 3) {
            recommendations.push({
                category: 'FRAILTY',
                priority: 'HIGH',
                interventions: [
                    'Comprehensive Geriatric Assessment within 1 week',
                    'Physical therapy evaluation for strength and balance',
                    'Nutritional assessment and supplementation',
                    'Medication review for deprescribing opportunities',
                    'Home safety evaluation'
                ],
                evidence: 'Level A - Multiple RCTs showing benefit'
            });
        }
        
        // Polypharmacy recommendations
        if (patient.medications?.length > 5) {
            recommendations.push({
                category: 'POLYPHARMACY',
                priority: 'HIGH',
                interventions: [
                    'Systematic deprescribing review using STOPP/START',
                    'Check for drug-drug interactions',
                    'Verify indication for each medication',
                    'Consider non-pharmacological alternatives',
                    'Patient education on medication adherence'
                ],
                evidence: 'Level A - BMJ 2024 systematic review'
            });
        }
        
        // Fall prevention
        if (patient.fallRisk === 'HIGH') {
            recommendations.push({
                category: 'FALLS',
                priority: 'HIGH',
                interventions: [
                    'Vitamin D 1000-2000 IU daily',
                    'Home hazard assessment',
                    'Vision and hearing check',
                    'Footwear assessment',
                    'Consider hip protectors'
                ],
                evidence: 'Level B - Cochrane review 2023'
            });
        }
        
        // Cognitive recommendations
        if (patient.mmse < 24) {
            recommendations.push({
                category: 'COGNITION',
                priority: 'MEDIUM',
                interventions: [
                    'Formal neuropsychological testing',
                    'MRI brain if not done in past year',
                    'B12, folate, TSH levels',
                    'Depression screening',
                    'Caregiver support and education'
                ],
                evidence: 'Level B - AAN guidelines'
            });
        }
        
        return recommendations;
    }
    
    // Clinical Decision Trees
    getDecisionTree(condition) {
        const trees = {
            'delirium': {
                start: 'Is patient acutely confused?',
                yes: {
                    next: 'Apply CAM criteria',
                    positive: {
                        next: 'Identify precipitants',
                        actions: [
                            'Review medications',
                            'Check for infection',
                            'Assess pain',
                            'Check electrolytes',
                            'Review sleep pattern'
                        ],
                        treatment: {
                            nonPharm: 'Always first-line',
                            pharm: 'Only if severe agitation'
                        }
                    },
                    negative: {
                        next: 'Consider other causes',
                        differential: ['Dementia', 'Depression', 'Psychosis']
                    }
                }
            },
            'falls': {
                start: 'Has patient fallen in past year?',
                yes: {
                    next: 'How many falls?',
                    multiple: {
                        risk: 'HIGH',
                        actions: [
                            'Comprehensive fall assessment',
                            'Gait and balance evaluation',
                            'Medication review',
                            'Vision check',
                            'Home safety assessment'
                        ]
                    },
                    single: {
                        next: 'Assess gait and balance',
                        abnormal: {
                            risk: 'MODERATE',
                            actions: ['PT referral', 'Vitamin D', 'Exercise program']
                        }
                    }
                }
            }
        };
        
        return trees[condition];
    }
    
    // Continuous Learning System
    learn(outcome) {
        // Store outcome data
        this.learningData.push({
            timestamp: new Date(),
            patient: outcome.patient,
            prediction: outcome.prediction,
            actual: outcome.actual,
            accuracy: outcome.prediction === outcome.actual
        });
        
        // Update model weights (simplified)
        this.updateModelWeights();
        
        // Save learning data
        this.saveLearningData();
    }
    
    // Helper Methods
    checkBeers2023(medication, patient) {
        const beersData = this.kb.drugs[medication.name.toLowerCase()];
        if (beersData?.beers2023 === 'AVOID') {
            return {
                type: 'BEERS_VIOLATION',
                medication: medication.name,
                reason: beersData.fallRisk || 'Potentially inappropriate',
                alternatives: beersData.alternatives,
                priority: 'HIGH',
                action: 'DISCONTINUE_OR_REPLACE'
            };
        }
        return null;
    }
    
    checkAllInteractions(medication, allMedications) {
        const interactions = [];
        const severeInteractions = {
            'warfarin-nsaid': { severity: 'MAJOR', effect: 'Bleeding risk' },
            'acei-spironolactone': { severity: 'MAJOR', effect: 'Hyperkalemia' },
            'ssri-nsaid': { severity: 'MODERATE', effect: 'GI bleeding' },
            'benzo-opioid': { severity: 'MAJOR', effect: 'Respiratory depression' }
        };
        
        allMedications.forEach(otherMed => {
            if (medication.name !== otherMed.name) {
                const key = `${medication.name.toLowerCase()}-${otherMed.name.toLowerCase()}`;
                if (severeInteractions[key]) {
                    interactions.push({
                        type: 'DRUG_INTERACTION',
                        drugs: [medication.name, otherMed.name],
                        severity: severeInteractions[key].severity,
                        effect: severeInteractions[key].effect,
                        action: 'MONITOR_OR_AVOID'
                    });
                }
            }
        });
        
        return interactions;
    }
    
    calculateOverallRisk(analysis) {
        let riskScore = 0;
        
        // Frailty component
        if (analysis.frailtyAssessment.category === 'FRAIL') riskScore += 30;
        else if (analysis.frailtyAssessment.category === 'PRE_FRAIL') riskScore += 15;
        
        // Fall risk component
        if (analysis.fallRisk.risk === 'HIGH') riskScore += 25;
        else if (analysis.fallRisk.risk === 'MODERATE') riskScore += 15;
        
        // Medication risk
        const medProblems = analysis.medicationReview.problems.length;
        riskScore += Math.min(medProblems * 5, 25);
        
        // Cognitive component
        if (analysis.cognitiveStatus.impairment) riskScore += 20;
        
        // Nutritional risk
        if (analysis.nutritionalStatus.risk === 'HIGH') riskScore += 15;
        
        return {
            score: riskScore,
            category: riskScore > 60 ? 'HIGH' : riskScore > 30 ? 'MODERATE' : 'LOW',
            percentile: this.calculatePercentile(riskScore)
        };
    }
    
    loadLearningData() {
        // In real implementation, would load from database
        return [];
    }
    
    saveLearningData() {
        // In real implementation, would save to database
        localStorage.setItem('aiLearningData', JSON.stringify(this.learningData));
    }
}

// Interactive Clinical Tutor
class ClinicalTutor {
    constructor() {
        this.ai = new ClinicalAI();
        this.currentCase = null;
        this.score = 0;
    }
    
    generateCase() {
        const cases = [
            {
                id: 'case_001',
                patient: {
                    age: 82,
                    sex: 'female',
                    chief: 'Confusion x 2 days',
                    pmh: ['HTN', 'DM', 'Mild dementia'],
                    medications: [
                        'Metformin 1000mg BID',
                        'Lisinopril 10mg daily',
                        'Lorazepam 1mg QHS',
                        'Oxybutynin 5mg BID'
                    ],
                    vitals: { bp: '145/85', hr: 88, rr: 18, temp: 37.8, o2: 95 },
                    labs: {
                        na: 132, k: 4.2, cr: 1.4, glucose: 180,
                        wbc: 11.2, hb: 10.8, plt: 189,
                        ua: 'Positive for leukocytes and nitrites'
                    },
                    exam: 'Oriented x1, no focal neuro deficits'
                },
                questions: [
                    {
                        q: 'What is the most likely diagnosis?',
                        options: ['Delirium', 'Dementia progression', 'Stroke', 'Hypoglycemia'],
                        correct: 0,
                        explanation: 'Acute confusion + UTI + anticholinergics = Delirium'
                    },
                    {
                        q: 'Which medication should be stopped immediately?',
                        options: ['Metformin', 'Lisinopril', 'Lorazepam', 'All anticholinergics'],
                        correct: 3,
                        explanation: 'Both lorazepam and oxybutynin worsen delirium'
                    }
                ]
            }
        ];
        
        this.currentCase = cases[Math.floor(Math.random() * cases.length)];
        return this.currentCase;
    }
    
    presentCase(caseData) {
        return `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Clinical Case</h3>
                <p><strong>Patient:</strong> ${caseData.patient.age}yo ${caseData.patient.sex}</p>
                <p><strong>Chief Complaint:</strong> ${caseData.patient.chief}</p>
                <p><strong>PMH:</strong> ${caseData.patient.pmh.join(', ')}</p>
                <p><strong>Medications:</strong></p>
                <ul>${caseData.patient.medications.map(m => `<li>${m}</li>`).join('')}</ul>
                <p><strong>Vitals:</strong> BP ${caseData.patient.vitals.bp}, HR ${caseData.patient.vitals.hr}</p>
                <p><strong>Labs:</strong></p>
                <ul>
                    <li>Na ${caseData.patient.labs.na}, K ${caseData.patient.labs.k}, Cr ${caseData.patient.labs.cr}</li>
                    <li>WBC ${caseData.patient.labs.wbc}, Hb ${caseData.patient.labs.hb}</li>
                    <li>UA: ${caseData.patient.labs.ua}</li>
                </ul>
            </div>
        `;
    }
    
    checkAnswer(questionIndex, selectedAnswer) {
        const question = this.currentCase.questions[questionIndex];
        const correct = selectedAnswer === question.correct;
        
        if (correct) {
            this.score += 10;
        }
        
        return {
            correct: correct,
            explanation: question.explanation,
            aiAnalysis: this.ai.analyzePatient(this.currentCase.patient)
        };
    }
}

// Export for use in main application
window.ClinicalAI = ClinicalAI;
window.ClinicalTutor = ClinicalTutor;
window.MedicalKnowledgeBase = MedicalKnowledgeBase;