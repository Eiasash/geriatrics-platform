// AI Assistant Fix - Adds missing analyzeDemographics method
export class ClinicalAI {
    constructor() {
        this.models = {
            riskPrediction: this.initRiskModel(),
            clinicalDecision: this.initDecisionModel(),
            drugOptimization: this.initDrugModel()
        };
    }

    initRiskModel() {
        return { type: 'risk', ready: true };
    }

    initDecisionModel() {
        return { type: 'decision', ready: true };
    }

    initDrugModel() {
        return { type: 'drug', ready: true };
    }

    async analyzeDemographics(patient) {
        try {
            // First, provide basic analysis while AI processes
            const basicAnalysis = {
                ageGroup: this.categorizeAge(patient.age),
                riskFactors: [],
                recommendations: [],
                isAIEnhanced: false
            };

            // Age-based initial assessment
            if (patient.age >= 85) {
                basicAnalysis.riskFactors.push('Very elderly (≥85 years)');
                basicAnalysis.recommendations.push('Consider frailty assessment');
            } else if (patient.age >= 75) {
                basicAnalysis.riskFactors.push('Elderly (75-84 years)');
                basicAnalysis.recommendations.push('Annual comprehensive geriatric assessment');
            }

            // Call AI backend for enhanced analysis
            const response = await fetch('/.netlify/functions/ask-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini',
                    question: `Analyze this geriatric patient demographics and provide clinical insights including risk factors and evidence-based recommendations. Patient data: Age: ${patient.age}, Gender: ${patient.gender || 'Not specified'}, Living Status: ${patient.livingStatus || 'Not specified'}, Functional Status: ${patient.functionalStatus || 'Not specified'}, Cognitive Status: ${patient.cognitiveStatus || 'Not specified'}. Please provide a detailed clinical assessment with specific recommendations.`,
                    patientInfo: JSON.stringify(patient)
                })
            });

            if (response.ok) {
                const aiData = await response.json();
                
                // Parse AI response and enhance our analysis
                return {
                    ...basicAnalysis,
                    aiInsights: aiData.answer,
                    isAIEnhanced: true,
                    aiModel: aiData.model,
                    timestamp: new Date().toISOString()
                };
            } else {
                // Fallback to basic analysis if AI fails
                console.warn('AI analysis failed, using basic analysis');
                return this.getBasicAnalysis(patient);
            }
        } catch (error) {
            console.error('Error in AI demographics analysis:', error);
            // Fallback to basic analysis
            return this.getBasicAnalysis(patient);
        }
    }

    getBasicAnalysis(patient) {
        const analysis = {
            ageGroup: this.categorizeAge(patient.age),
            riskFactors: [],
            recommendations: [],
            isAIEnhanced: false
        };

        // Age-based risk assessment
        if (patient.age >= 85) {
            analysis.riskFactors.push('Very elderly (≥85 years)');
            analysis.recommendations.push('Consider frailty assessment');
            analysis.recommendations.push('Screen for cognitive impairment');
            analysis.recommendations.push('Review polypharmacy');
        } else if (patient.age >= 75) {
            analysis.riskFactors.push('Elderly (75-84 years)');
            analysis.recommendations.push('Annual comprehensive geriatric assessment');
            analysis.recommendations.push('Fall risk evaluation');
        } else if (patient.age >= 65) {
            analysis.riskFactors.push('Older adult (65-74 years)');
            analysis.recommendations.push('Preventive care screening');
            analysis.recommendations.push('Vaccination update');
        }

        // Gender-specific considerations
        if (patient.gender === 'female') {
            analysis.recommendations.push('Osteoporosis screening');
            if (patient.age >= 65) {
                analysis.recommendations.push('Bone density test (DEXA)');
                analysis.recommendations.push('Calcium and Vitamin D supplementation');
            }
        } else if (patient.gender === 'male') {
            if (patient.age >= 65 && patient.age <= 75) {
                analysis.recommendations.push('Abdominal aortic aneurysm screening');
            }
            if (patient.age >= 70) {
                analysis.recommendations.push('Consider prostate cancer screening discussion');
            }
        }

        // Living situation
        if (patient.livingStatus === 'alone') {
            analysis.riskFactors.push('Lives alone');
            analysis.recommendations.push('Social support assessment');
            analysis.recommendations.push('Emergency response system consideration');
            analysis.recommendations.push('Meal delivery services evaluation');
        } else if (patient.livingStatus === 'assisted') {
            analysis.riskFactors.push('Requires assistance');
            analysis.recommendations.push('Caregiver support assessment');
            analysis.recommendations.push('Respite care options');
        }

        // Functional status
        if (patient.functionalStatus) {
            switch (patient.functionalStatus) {
                case 'independent':
                    analysis.recommendations.push('Promote continued independence');
                    analysis.recommendations.push('Preventive interventions');
                    break;
                case 'partially_dependent':
                    analysis.riskFactors.push('Partial functional dependence');
                    analysis.recommendations.push('Occupational therapy evaluation');
                    analysis.recommendations.push('Adaptive equipment assessment');
                    break;
                case 'dependent':
                    analysis.riskFactors.push('Functional dependence');
                    analysis.recommendations.push('Home safety evaluation');
                    analysis.recommendations.push('24-hour care needs assessment');
                    analysis.recommendations.push('Advanced directive discussion');
                    break;
            }
        }

        // Cognitive status
        if (patient.cognitiveStatus) {
            if (patient.cognitiveStatus === 'impaired') {
                analysis.riskFactors.push('Cognitive impairment');
                analysis.recommendations.push('Formal cognitive assessment (MMSE/MoCA)');
                analysis.recommendations.push('Medication review for cognitive effects');
                analysis.recommendations.push('Safety assessment');
            }
        }

        return analysis;
    }

    // General AI assistant method for any clinical question
    async askAI(question, context = '', model = 'gemini') {
        try {
            const response = await fetch('/.netlify/functions/ask-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    question: context ? `${context}\n\nQuestion: ${question}` : question,
                    patientInfo: context
                })
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    success: true,
                    answer: data.answer,
                    model: data.model,
                    timestamp: new Date().toISOString()
                };
            } else {
                throw new Error(`AI request failed: ${response.status}`);
            }
        } catch (error) {
            console.error('AI assistant error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    categorizeAge(age) {
        if (age >= 90) return 'Nonagenarian';
        if (age >= 85) return 'Very Elderly';
        if (age >= 75) return 'Elderly';
        if (age >= 65) return 'Older Adult';
        if (age >= 50) return 'Middle Age';
        return 'Adult';
    }

    analyzePatient(patientData) {
        try {
            const demographics = this.analyzeDemographics(patientData);
            const riskScore = this.calculateRiskScore(patientData);
            const recommendations = this.generateRecommendations(patientData);
            const alerts = this.generateClinicalAlerts(patientData);

            return {
                success: true,
                demographics,
                riskScore,
                recommendations,
                alerts,
                timestamp: new Date().toISOString(),
                summary: this.generateSummary(demographics, riskScore, recommendations)
            };
        } catch (error) {
            console.error('Analysis error:', error);
            return {
                success: false,
                error: error.message,
                demographics: { ageGroup: 'Unknown', riskFactors: [], recommendations: [] },
                riskScore: { overall: 0, category: 'Unknown' },
                recommendations: [],
                alerts: []
            };
        }
    }

    calculateRiskScore(patient) {
        let score = 0;
        const factors = [];
        
        // Age factor (0-3 points)
        if (patient.age >= 85) {
            score += 3;
            factors.push('Age ≥85 (+3)');
        } else if (patient.age >= 75) {
            score += 2;
            factors.push('Age 75-84 (+2)');
        } else if (patient.age >= 65) {
            score += 1;
            factors.push('Age 65-74 (+1)');
        }

        // Comorbidities (1-2 points each)
        if (patient.conditions) {
            const conditionScores = {
                'diabetes': 1,
                'hypertension': 1,
                'heart_failure': 2,
                'ckd': 2,
                'dementia': 2,
                'cancer': 2,
                'copd': 1,
                'stroke': 2
            };

            patient.conditions.forEach(condition => {
                const points = conditionScores[condition.toLowerCase()] || 0;
                if (points > 0) {
                    score += points;
                    factors.push(`${condition} (+${points})`);
                }
            });
        }

        // Medications (polypharmacy)
        if (patient.medications) {
            if (patient.medications.length >= 10) {
                score += 3;
                factors.push(`Severe polypharmacy (+3)`);
            } else if (patient.medications.length >= 5) {
                score += 2;
                factors.push(`Polypharmacy (+2)`);
            }
        }

        // Functional status
        if (patient.functionalStatus === 'dependent') {
            score += 3;
            factors.push('Functional dependence (+3)');
        } else if (patient.functionalStatus === 'partially_dependent') {
            score += 2;
            factors.push('Partial dependence (+2)');
        }

        // Fall history
        if (patient.fallHistory) {
            score += 2;
            factors.push('Fall history (+2)');
        }

        // Social factors
        if (patient.livingStatus === 'alone') {
            score += 1;
            factors.push('Lives alone (+1)');
        }

        return {
            overall: score,
            category: this.categorizeRisk(score),
            factors: factors,
            breakdown: {
                age: patient.age,
                conditions: patient.conditions?.length || 0,
                medications: patient.medications?.length || 0,
                functional: patient.functionalStatus || 'unknown',
                social: patient.livingStatus || 'unknown'
            }
        };
    }

    categorizeRisk(score) {
        if (score >= 10) return 'Very High';
        if (score >= 7) return 'High';
        if (score >= 4) return 'Moderate';
        if (score >= 2) return 'Low';
        return 'Minimal';
    }

    generateRecommendations(patient) {
        const recommendations = [];
        const riskScore = this.calculateRiskScore(patient);

        // High-priority recommendations based on risk
        if (riskScore.category === 'Very High' || riskScore.category === 'High') {
            recommendations.push({
                type: 'urgent',
                priority: 'high',
                text: 'Comprehensive geriatric assessment needed',
                rationale: 'Multiple risk factors identified'
            });
        }

        // Age-based screening
        if (patient.age >= 65) {
            recommendations.push({
                type: 'screening',
                priority: 'high',
                text: 'Annual cognitive screening (MMSE or MoCA)',
                rationale: 'Early detection of cognitive decline'
            });

            recommendations.push({
                type: 'screening',
                priority: 'moderate',
                text: 'Annual depression screening (PHQ-9 or GDS)',
                rationale: 'High prevalence in elderly'
            });
        }

        // Polypharmacy
        if (patient.medications && patient.medications.length >= 5) {
            recommendations.push({
                type: 'medication',
                priority: 'high',
                text: 'Comprehensive medication review - polypharmacy detected',
                rationale: `${patient.medications.length} medications - risk of interactions and adverse effects`
            });

            recommendations.push({
                type: 'medication',
                priority: 'moderate',
                text: 'Consider deprescribing using STOPP/START criteria',
                rationale: 'Reduce pill burden and adverse effects'
            });
        }

        // Fall risk
        if (patient.age >= 75 || patient.fallHistory) {
            recommendations.push({
                type: 'assessment',
                priority: 'high',
                text: 'Fall risk assessment (Timed Up and Go test)',
                rationale: patient.fallHistory ? 'Previous fall history' : 'Age-related fall risk'
            });

            recommendations.push({
                type: 'intervention',
                priority: 'moderate',
                text: 'Home safety evaluation and modification',
                rationale: 'Environmental hazard reduction'
            });

            recommendations.push({
                type: 'intervention',
                priority: 'moderate',
                text: 'Physical therapy for balance and strength training',
                rationale: 'Evidence-based fall prevention'
            });
        }

        // Nutrition
        if (patient.bmi) {
            if (patient.bmi < 22) {
                recommendations.push({
                    type: 'nutrition',
                    priority: 'high',
                    text: 'Nutritional assessment - underweight',
                    rationale: 'Risk of malnutrition and sarcopenia'
                });
            } else if (patient.bmi > 30) {
                recommendations.push({
                    type: 'nutrition',
                    priority: 'moderate',
                    text: 'Weight management consultation',
                    rationale: 'Obesity management in elderly'
                });
            }
        }

        // Vaccination
        if (patient.age >= 65) {
            recommendations.push({
                type: 'preventive',
                priority: 'moderate',
                text: 'Update vaccinations (influenza, pneumococcal, shingles, COVID-19)',
                rationale: 'Increased infection risk in elderly'
            });
        }

        // Social support
        if (patient.livingStatus === 'alone') {
            recommendations.push({
                type: 'social',
                priority: 'moderate',
                text: 'Social support assessment and community resources',
                rationale: 'Social isolation risk'
            });
        }

        return recommendations;
    }

    generateClinicalAlerts(patient) {
        const alerts = [];

        // Critical medication alerts
        if (patient.medications) {
            // Check for high-risk combinations
            const meds = patient.medications.map(m => m.toLowerCase());
            
            if (meds.includes('warfarin') && meds.includes('aspirin')) {
                alerts.push({
                    severity: 'high',
                    type: 'drug_interaction',
                    message: 'Warfarin + Aspirin: Major bleeding risk',
                    action: 'Review anticoagulation strategy'
                });
            }

            if (meds.filter(m => m.includes('benzo') || m.includes('zolpidem')).length > 0) {
                alerts.push({
                    severity: 'moderate',
                    type: 'medication',
                    message: 'Benzodiazepine/Z-drug use in elderly',
                    action: 'Consider tapering - fall and cognitive risk'
                });
            }
        }

        // Vital sign alerts
        if (patient.vitals) {
            if (patient.vitals.sbp && patient.vitals.sbp < 110) {
                alerts.push({
                    severity: 'moderate',
                    type: 'vital_sign',
                    message: 'Low systolic BP in elderly',
                    action: 'Review antihypertensives - fall risk'
                });
            }
        }

        // Lab value alerts
        if (patient.labs) {
            if (patient.labs.egfr && patient.labs.egfr < 30) {
                alerts.push({
                    severity: 'high',
                    type: 'lab',
                    message: 'Severe renal impairment',
                    action: 'Adjust medication dosing'
                });
            }

            if (patient.labs.sodium && (patient.labs.sodium < 135 || patient.labs.sodium > 145)) {
                alerts.push({
                    severity: 'moderate',
                    type: 'lab',
                    message: 'Abnormal sodium level',
                    action: 'Evaluate for causes and symptoms'
                });
            }
        }

        return alerts;
    }

    generateSummary(demographics, riskScore, recommendations) {
        const highPriorityRecs = recommendations.filter(r => r.priority === 'high').length;
        
        return {
            overview: `${demographics.ageGroup} patient with ${riskScore.category} risk profile`,
            keyRisks: demographics.riskFactors.slice(0, 3).join(', '),
            actionItems: highPriorityRecs,
            riskLevel: riskScore.category,
            totalRecommendations: recommendations.length
        };
    }
}

// Export for use in other modules
export default ClinicalAI;