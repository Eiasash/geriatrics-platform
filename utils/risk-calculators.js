// Comprehensive Risk Calculators for Geriatric Medicine
// Evidence-based scoring systems and assessment tools

class GeriatricRiskCalculators {
    constructor() {
        this.calculators = this.initializeCalculators();
    }

    initializeCalculators() {
        return {
            // HOSPITAL Score for 30-Day Readmission Risk
            hospital: {
                name: 'HOSPITAL Score',
                description: '30-day readmission risk prediction',
                reference: 'Donzé et al. JAMA 2013',
                calculate: (data) => this.calculateHospitalScore(data),
                interpretation: this.getHospitalInterpretation,
                hebrewName: 'ניקוד סיכון לאשפוז חוזר'
            },

            // Walter Index for 1-Year Mortality
            walter: {
                name: 'Walter Index',
                description: '1-year mortality prediction in older adults',
                reference: 'Walter et al. JAMA 2001',
                calculate: (data) => this.calculateWalterIndex(data),
                interpretation: this.getWalterInterpretation,
                hebrewName: 'אינדקס וולטר לתמותה'
            },

            // CAM for Delirium Assessment
            cam: {
                name: 'Confusion Assessment Method (CAM)',
                description: 'Delirium screening tool',
                reference: 'Inouye et al. Ann Intern Med 1990',
                calculate: (data) => this.assessCAM(data),
                interpretation: this.getCAMInterpretation,
                hebrewName: 'שיטת הערכת בלבול'
            },

            // FRAIL Scale
            frail: {
                name: 'FRAIL Scale',
                description: 'Simple frailty screening',
                reference: 'Morley et al. J Nutr Health Aging 2012',
                calculate: (data) => this.calculateFRAILScale(data),
                interpretation: this.getFRAILInterpretation,
                hebrewName: 'סולם שבריריות'
            },

            // Clinical Frailty Scale
            cfs: {
                name: 'Clinical Frailty Scale',
                description: 'Visual frailty assessment',
                reference: 'Rockwood et al. CMAJ 2005',
                calculate: (data) => this.assessClinicalFrailtyScale(data),
                interpretation: this.getCFSInterpretation,
                hebrewName: 'סולם שבריריות קלינית'
            },

            // Morse Fall Scale
            morse: {
                name: 'Morse Fall Scale',
                description: 'Fall risk assessment',
                reference: 'Morse et al. Applied Nursing Research 1989',
                calculate: (data) => this.calculateMorseFallScale(data),
                interpretation: this.getMorseInterpretation,
                hebrewName: 'סולם סיכון נפילות מורס'
            },

            // CHADS2-VASc
            chads2vasc: {
                name: 'CHA₂DS₂-VASc Score',
                description: 'Stroke risk in atrial fibrillation',
                reference: 'Lip et al. Chest 2010',
                calculate: (data) => this.calculateCHADS2VASc(data),
                interpretation: this.getCHADS2VAScInterpretation,
                hebrewName: 'ניקוד סיכון לשבץ בפרפור עליות'
            },

            // HAS-BLED
            hasbled: {
                name: 'HAS-BLED Score',
                description: 'Bleeding risk on anticoagulation',
                reference: 'Pisters et al. Chest 2010',
                calculate: (data) => this.calculateHASBLED(data),
                interpretation: this.getHASBLEDInterpretation,
                hebrewName: 'ניקוד סיכון דימום'
            },

            // Beers Criteria Assessment
            beers: {
                name: 'AGS Beers Criteria',
                description: 'Potentially inappropriate medications',
                reference: 'AGS 2023 Update',
                calculate: (data) => this.assessBeersCriteria(data),
                interpretation: this.getBeersInterpretation,
                hebrewName: 'קריטריונים בירס'
            },

            // Anticholinergic Burden Score
            acb: {
                name: 'Anticholinergic Burden Score',
                description: 'Cognitive impact of medications',
                reference: 'Boustani et al. Arch Intern Med 2008',
                calculate: (data) => this.calculateACB(data),
                interpretation: this.getACBInterpretation,
                hebrewName: 'ניקוד עומס אנטיכולינרגי'
            }
        };
    }

    // HOSPITAL Score Implementation
    calculateHospitalScore(data) {
        let score = 0;
        
        // H - Hemoglobin at discharge < 12 g/dL
        if (data.hemoglobin < 12) score += 1;
        
        // O - Discharge from Oncology service
        if (data.oncologyService) score += 2;
        
        // S - Sodium level at discharge < 135 mmol/L
        if (data.sodium < 135) score += 1;
        
        // P - Procedure during hospital stay
        if (data.procedure) score += 1;
        
        // I - Index admission type: non-elective
        if (data.admissionType === 'emergency' || data.admissionType === 'urgent') score += 1;
        
        // T - Number of hospital admissions during previous year
        if (data.priorAdmissions >= 2 && data.priorAdmissions <= 5) score += 2;
        if (data.priorAdmissions > 5) score += 5;
        
        // A - Length of stay ≥ 5 days
        if (data.lengthOfStay >= 5) score += 2;
        
        // L - (Not in original but sometimes added) Low health literacy
        if (data.lowHealthLiteracy) score += 1;
        
        return {
            score: score,
            riskCategory: this.getHospitalRiskCategory(score),
            readmissionRate: this.getHospitalReadmissionRate(score)
        };
    }

    getHospitalRiskCategory(score) {
        if (score <= 4) return 'Low';
        if (score <= 6) return 'Intermediate';
        return 'High';
    }

    getHospitalReadmissionRate(score) {
        const rates = {
            0: '5.8%', 1: '5.8%', 2: '5.8%', 3: '5.8%', 4: '5.8%',
            5: '11.9%', 6: '11.9%',
            7: '22.8%', 8: '22.8%', 9: '22.8%', 10: '22.8%'
        };
        return rates[Math.min(score, 10)] || '22.8%';
    }

    getHospitalInterpretation(result) {
        return {
            english: `${result.riskCategory} risk of 30-day readmission (${result.readmissionRate} probability)`,
            hebrew: `סיכון ${result.riskCategory === 'Low' ? 'נמוך' : result.riskCategory === 'Intermediate' ? 'בינוני' : 'גבוה'} לאשפוז חוזר תוך 30 יום`
        };
    }

    // Walter Index Implementation
    calculateWalterIndex(data) {
        let score = 0;
        
        // Gender: Male
        if (data.gender === 'male') score += 1;
        
        // ADL dependencies
        const adlScore = data.adlDependencies || 0;
        if (adlScore >= 1 && adlScore <= 4) score += 2;
        if (adlScore >= 5) score += 5;
        
        // Congestive heart failure
        if (data.chf) score += 2;
        
        // Cancer
        if (data.cancer === 'localized') score += 3;
        if (data.cancer === 'metastatic') score += 8;
        
        // Creatinine > 3.0 mg/dL
        if (data.creatinine > 3.0) score += 2;
        
        // Albumin levels
        if (data.albumin < 3.0) score += 2;
        else if (data.albumin >= 3.0 && data.albumin < 3.5) score += 1;
        
        return {
            score: score,
            mortalityRisk: this.getWalterMortalityRisk(score)
        };
    }

    getWalterMortalityRisk(score) {
        const risks = {
            0: '4%', 1: '7%', 2: '11%', 3: '19%', 4: '27%',
            5: '39%', 6: '50%', 7: '64%', 8: '64%', 9: '64%', 10: '64%'
        };
        return risks[Math.min(score, 10)] || '64%';
    }

    getWalterInterpretation(result) {
        const riskLevel = result.score <= 2 ? 'Low' : result.score <= 4 ? 'Intermediate' : 'High';
        return {
            english: `${riskLevel} risk: ${result.mortalityRisk} 1-year mortality`,
            hebrew: `סיכון ${riskLevel === 'Low' ? 'נמוך' : riskLevel === 'Intermediate' ? 'בינוני' : 'גבוה'}: ${result.mortalityRisk} תמותה בשנה`
        };
    }

    // CAM Assessment
    assessCAM(data) {
        // Feature 1: Acute onset and fluctuating course
        const feature1 = data.acuteOnset || false;
        
        // Feature 2: Inattention
        const feature2 = data.inattention || false;
        
        // Feature 3: Disorganized thinking
        const feature3 = data.disorganizedThinking || false;
        
        // Feature 4: Altered level of consciousness
        const feature4 = data.alteredConsciousness || false;
        
        // CAM positive: Feature 1 AND Feature 2 AND (Feature 3 OR Feature 4)
        const isPositive = feature1 && feature2 && (feature3 || feature4);
        
        return {
            isPositive: isPositive,
            features: { feature1, feature2, feature3, feature4},
            diagnosis: isPositive ? 'Delirium Present' : 'No Delirium'
        };
    }

    getCAMInterpretation(result) {
        return {
            english: result.isPositive ? 'Delirium present - initiate delirium protocol' : 'No delirium detected',
            hebrew: result.isPositive ? 'דלירה קיימת - יש להפעיל פרוטוקול' : 'לא זוהתה דלירה'
        };
    }

    // FRAIL Scale
    calculateFRAILScale(data) {
        let score = 0;
        
        // F - Fatigue
        if (data.fatigue) score += 1;
        
        // R - Resistance (Can't walk up 1 flight of stairs)
        if (data.cannotClimbStairs) score += 1;
        
        // A - Ambulation (Can't walk 1 block)
        if (data.cannotWalkBlock) score += 1;
        
        // I - Illness (>5 illnesses)
        if (data.illnessCount > 5) score += 1;
        
        // L - Loss of weight (>5% in past year)
        if (data.weightLoss > 5) score += 1;
        
        return {
            score: score,
            category: this.getFRAILCategory(score)
        };
    }

    getFRAILCategory(score) {
        if (score === 0) return 'Robust';
        if (score >= 1 && score <= 2) return 'Pre-frail';
        return 'Frail';
    }

    getFRAILInterpretation(result) {
        const advice = {
            'Robust': 'Continue current activities, maintain fitness',
            'Pre-frail': 'At risk - consider exercise program and nutrition counseling',
            'Frail': 'High risk - comprehensive geriatric assessment recommended'
        };
        
        return {
            english: `${result.category}: ${advice[result.category]}`,
            hebrew: `${result.category === 'Robust' ? 'חזק' : result.category === 'Pre-frail' ? 'טרום שברירי' : 'שברירי'}`
        };
    }

    // CHA₂DS₂-VASc Score
    calculateCHADS2VASc(data) {
        let score = 0;
        
        // C - Congestive heart failure
        if (data.chf) score += 1;
        
        // H - Hypertension
        if (data.hypertension) score += 1;
        
        // A2 - Age ≥75 years (2 points), 65-74 years (1 point)
        if (data.age >= 75) score += 2;
        else if (data.age >= 65) score += 1;
        
        // D - Diabetes mellitus
        if (data.diabetes) score += 1;
        
        // S2 - Stroke/TIA/thromboembolism (2 points)
        if (data.priorStroke) score += 2;
        
        // V - Vascular disease
        if (data.vascularDisease) score += 1;
        
        // S - Sex category (female)
        if (data.gender === 'female') score += 1;
        
        return {
            score: score,
            strokeRisk: this.getCHADS2VAScStrokeRisk(score),
            recommendation: this.getCHADS2VAScRecommendation(score)
        };
    }

    getCHADS2VAScStrokeRisk(score) {
        const risks = {
            0: '0%', 1: '1.3%', 2: '2.2%', 3: '3.2%', 4: '4.0%',
            5: '6.7%', 6: '9.8%', 7: '9.6%', 8: '12.5%', 9: '15.2%'
        };
        return risks[Math.min(score, 9)] || '15.2%';
    }

    getCHADS2VAScRecommendation(score) {
        if (score === 0) return 'No anticoagulation';
        if (score === 1) return 'Consider anticoagulation';
        return 'Anticoagulation recommended';
    }

    getCHADS2VAScInterpretation(result) {
        return {
            english: `Annual stroke risk: ${result.strokeRisk}. ${result.recommendation}`,
            hebrew: `סיכון שנתי לשבץ: ${result.strokeRisk}. ${result.recommendation === 'No anticoagulation' ? 'ללא נוגד קרישה' : result.recommendation === 'Consider anticoagulation' ? 'לשקול נוגד קרישה' : 'מומלץ נוגד קרישה'}`
        };
    }

    // HAS-BLED Score
    calculateHASBLED(data) {
        let score = 0;
        
        // H - Hypertension (uncontrolled, >160 systolic)
        if (data.uncontrolledHypertension) score += 1;
        
        // A - Abnormal renal/liver function (1 point each)
        if (data.abnormalRenal) score += 1;
        if (data.abnormalLiver) score += 1;
        
        // S - Stroke history
        if (data.priorStroke) score += 1;
        
        // B - Bleeding history or predisposition
        if (data.bleedingHistory) score += 1;
        
        // L - Labile INR (if on warfarin)
        if (data.labileINR) score += 1;
        
        // E - Elderly (age >65)
        if (data.age > 65) score += 1;
        
        // D - Drugs/alcohol (1 point each)
        if (data.antiplateletNSAID) score += 1;
        if (data.alcoholUse) score += 1;
        
        return {
            score: score,
            bleedingRisk: this.getHASBLEDBleedingRisk(score),
            riskCategory: score >= 3 ? 'High' : 'Low-Moderate'
        };
    }

    getHASBLEDBleedingRisk(score) {
        const risks = {
            0: '1.13%', 1: '1.02%', 2: '1.88%', 3: '3.72%', 4: '8.70%',
            5: '12.50%', 6: '12.50%', 7: '12.50%', 8: '12.50%', 9: '12.50%'
        };
        return risks[Math.min(score, 9)] || '12.50%';
    }

    getHASBLEDInterpretation(result) {
        return {
            english: `${result.riskCategory} bleeding risk: ${result.bleedingRisk} annual major bleeding`,
            hebrew: `סיכון דימום ${result.riskCategory === 'High' ? 'גבוה' : 'נמוך-בינוני'}: ${result.bleedingRisk} דימום משמעותי בשנה`
        };
    }

    // Beers Criteria Assessment
    assessBeersCriteria(medications) {
        const beersMedications = {
            'lorazepam': { risk: 'high', reason: 'Benzodiazepine - falls, cognitive impairment' },
            'diazepam': { risk: 'high', reason: 'Long-acting benzodiazepine' },
            'diphenhydramine': { risk: 'high', reason: 'Highly anticholinergic antihistamine' },
            'ibuprofen': { risk: 'moderate', reason: 'NSAID - GI bleeding, renal toxicity' },
            'indomethacin': { risk: 'high', reason: 'NSAID with highest CNS adverse effects' },
            'glipizide': { risk: 'high', reason: 'Sulfonylurea - hypoglycemia risk' },
            'amitriptyline': { risk: 'high', reason: 'Tricyclic antidepressant - anticholinergic' },
            'quetiapine': { risk: 'moderate', reason: 'Antipsychotic - mortality in dementia' }
        };
        
        const violations = [];
        let totalRiskScore = 0;
        
        medications.forEach(med => {
            const medLower = med.toLowerCase();
            Object.keys(beersMedications).forEach(beersMed => {
                if (medLower.includes(beersMed)) {
                    const info = beersMedications[beersMed];
                    violations.push({
                        medication: med,
                        risk: info.risk,
                        reason: info.reason
                    });
                    totalRiskScore += info.risk === 'high' ? 3 : 1;
                }
            });
        });
        
        return {
            violations: violations,
            totalRiskScore: totalRiskScore,
            riskLevel: this.getBeersRiskLevel(totalRiskScore)
        };
    }

    getBeersRiskLevel(score) {
        if (score === 0) return 'Low';
        if (score <= 3) return 'Moderate';
        return 'High';
    }

    getBeersInterpretation(result) {
        const violationCount = result.violations.length;
        return {
            english: `${violationCount} potentially inappropriate medications identified. Risk level: ${result.riskLevel}`,
            hebrew: `זוהו ${violationCount} תרופות פוטנציאליות לא מתאימות. רמת סיכון: ${result.riskLevel === 'Low' ? 'נמוכה' : result.riskLevel === 'Moderate' ? 'בינונית' : 'גבוהה'}`
        };
    }

    // Public interface
    calculate(calculatorName, data) {
        const calculator = this.calculators[calculatorName];
        if (!calculator) {
            throw new Error(`Calculator '${calculatorName}' not found`);
        }
        
        const result = calculator.calculate(data);
        const interpretation = calculator.interpretation(result);
        
        return {
            name: calculator.name,
            hebrewName: calculator.hebrewName,
            result: result,
            interpretation: interpretation,
            reference: calculator.reference
        };
    }

    getAllCalculators() {
        return Object.keys(this.calculators).map(key => ({
            id: key,
            name: this.calculators[key].name,
            hebrewName: this.calculators[key].hebrewName,
            description: this.calculators[key].description,
            reference: this.calculators[key].reference
        }));
    }

    // Batch calculation for multiple assessments
    batchCalculate(patientData) {
        const results = {};
        
        // Automatically calculate relevant scores based on available data
        if (patientData.admissionData) {
            results.hospital = this.calculate('hospital', patientData.admissionData);
        }
        
        if (patientData.demographicData) {
            results.walter = this.calculate('walter', patientData.demographicData);
        }
        
        if (patientData.medications) {
            results.beers = this.calculate('beers', patientData.medications);
        }
        
        if (patientData.atrialFibrillation) {
            results.chads2vasc = this.calculate('chads2vasc', patientData);
            results.hasbled = this.calculate('hasbled', patientData);
        }
        
        return results;
    }
}

// Initialize global instance
if (typeof window !== 'undefined') {
    window.riskCalculators = new GeriatricRiskCalculators();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeriatricRiskCalculators;
}