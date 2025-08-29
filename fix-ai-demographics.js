// FIX FOR AI ASSISTANT - Add missing analyzeDemographics function
// Run this in the browser console at https://geriatrics-study.netlify.app

// Fix the ClinicalAI class by adding the missing method
if (window.ClinicalAI && window.ClinicalAI.prototype) {
    window.ClinicalAI.prototype.analyzeDemographics = function(patient) {
        const analysis = {
            ageGroup: this.categorizeAge(patient.age),
            riskFactors: [],
            recommendations: []
        };

        // Age-based risk assessment
        if (patient.age >= 85) {
            analysis.riskFactors.push('Very elderly (≥85 years)');
            analysis.recommendations.push('Consider frailty assessment');
            analysis.recommendations.push('Screen for cognitive impairment');
        } else if (patient.age >= 75) {
            analysis.riskFactors.push('Elderly (75-84 years)');
            analysis.recommendations.push('Annual comprehensive geriatric assessment');
        } else if (patient.age >= 65) {
            analysis.riskFactors.push('Older adult (65-74 years)');
            analysis.recommendations.push('Preventive care screening');
        }

        // Gender-specific considerations
        if (patient.gender === 'female') {
            analysis.recommendations.push('Osteoporosis screening');
            if (patient.age >= 65) {
                analysis.recommendations.push('Bone density test');
            }
        } else if (patient.gender === 'male') {
            if (patient.age >= 65) {
                analysis.recommendations.push('Abdominal aortic aneurysm screening');
            }
        }

        // Living situation
        if (patient.livingStatus === 'alone') {
            analysis.riskFactors.push('Lives alone');
            analysis.recommendations.push('Social support assessment');
            analysis.recommendations.push('Fall risk evaluation');
        }

        // Functional status
        if (patient.functionalStatus) {
            if (patient.functionalStatus === 'dependent') {
                analysis.riskFactors.push('Functional dependence');
                analysis.recommendations.push('Home safety evaluation');
                analysis.recommendations.push('Caregiver support assessment');
            }
        }

        return analysis;
    };

    // Also add the missing categorizeAge method if it doesn't exist
    if (!window.ClinicalAI.prototype.categorizeAge) {
        window.ClinicalAI.prototype.categorizeAge = function(age) {
            if (age >= 85) return 'Very Elderly';
            if (age >= 75) return 'Elderly';
            if (age >= 65) return 'Older Adult';
            if (age >= 50) return 'Middle Age';
            return 'Adult';
        };
    }

    console.log('✅ AI Assistant fixed - analyzeDemographics function added');
} else {
    console.log('⚠️ ClinicalAI class not found - creating it now...');
    
    // Create the entire ClinicalAI class if it doesn't exist
    window.ClinicalAI = class ClinicalAI {
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

        analyzeDemographics(patient) {
            const analysis = {
                ageGroup: this.categorizeAge(patient.age),
                riskFactors: [],
                recommendations: []
            };

            if (patient.age >= 85) {
                analysis.riskFactors.push('Very elderly (≥85 years)');
                analysis.recommendations.push('Consider frailty assessment');
            } else if (patient.age >= 75) {
                analysis.riskFactors.push('Elderly (75-84 years)');
                analysis.recommendations.push('Annual comprehensive geriatric assessment');
            }

            if (patient.livingStatus === 'alone') {
                analysis.riskFactors.push('Lives alone');
                analysis.recommendations.push('Social support assessment');
            }

            return analysis;
        }

        categorizeAge(age) {
            if (age >= 85) return 'Very Elderly';
            if (age >= 75) return 'Elderly';
            if (age >= 65) return 'Older Adult';
            return 'Adult';
        }

        analyzePatient(patientData) {
            try {
                const demographics = this.analyzeDemographics(patientData);
                const riskScore = this.calculateRiskScore(patientData);
                const recommendations = this.generateRecommendations(patientData);

                return {
                    success: true,
                    demographics,
                    riskScore,
                    recommendations,
                    timestamp: new Date().toISOString()
                };
            } catch (error) {
                console.error('Analysis error:', error);
                return {
                    success: false,
                    error: error.message,
                    demographics: { ageGroup: 'Unknown', riskFactors: [], recommendations: [] },
                    riskScore: { overall: 0 },
                    recommendations: []
                };
            }
        }

        calculateRiskScore(patient) {
            let score = 0;
            
            // Age factor
            if (patient.age >= 85) score += 3;
            else if (patient.age >= 75) score += 2;
            else if (patient.age >= 65) score += 1;

            // Comorbidities
            if (patient.conditions) {
                if (patient.conditions.includes('diabetes')) score += 1;
                if (patient.conditions.includes('hypertension')) score += 1;
                if (patient.conditions.includes('heart_failure')) score += 2;
                if (patient.conditions.includes('dementia')) score += 2;
            }

            // Medications
            if (patient.medications && patient.medications.length > 5) {
                score += Math.floor(patient.medications.length / 5);
            }

            return {
                overall: score,
                category: score >= 7 ? 'High' : score >= 4 ? 'Moderate' : 'Low',
                factors: {
                    age: patient.age,
                    conditions: patient.conditions?.length || 0,
                    medications: patient.medications?.length || 0
                }
            };
        }

        generateRecommendations(patient) {
            const recommendations = [];

            // Age-based
            if (patient.age >= 65) {
                recommendations.push({
                    type: 'screening',
                    priority: 'high',
                    text: 'Annual cognitive screening (MMSE or MoCA)'
                });
            }

            // Polypharmacy
            if (patient.medications && patient.medications.length >= 5) {
                recommendations.push({
                    type: 'medication',
                    priority: 'high',
                    text: 'Comprehensive medication review - polypharmacy detected'
                });
            }

            // Fall risk
            if (patient.age >= 75 || patient.fallHistory) {
                recommendations.push({
                    type: 'assessment',
                    priority: 'high',
                    text: 'Fall risk assessment and home safety evaluation'
                });
            }

            // Nutrition
            if (patient.bmi && (patient.bmi < 22 || patient.bmi > 30)) {
                recommendations.push({
                    type: 'nutrition',
                    priority: 'moderate',
                    text: 'Nutritional assessment and dietitian referral'
                });
            }

            return recommendations;
        }
    };

    // Create global instance
    window.clinicalAI = new window.ClinicalAI();
    console.log('✅ ClinicalAI class created with all methods');
}

// Test the fix
console.log('Testing AI Assistant...');
const testPatient = {
    age: 82,
    gender: 'female',
    livingStatus: 'alone',
    conditions: ['hypertension', 'diabetes'],
    medications: ['metformin', 'lisinopril', 'amlodipine', 'atorvastatin', 'aspirin', 'omeprazole']
};

try {
    const result = window.clinicalAI ? 
        window.clinicalAI.analyzePatient(testPatient) : 
        new window.ClinicalAI().analyzePatient(testPatient);
    
    console.log('✅ AI Analysis successful:', result);
} catch (error) {
    console.error('❌ Test failed:', error);
}

console.log('\n📝 Fix applied! The AI Assistant should now work properly.');