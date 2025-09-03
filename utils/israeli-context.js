// Israeli Healthcare Context Utilities
// Provides Hebrew translations, local protocols, and Israeli-specific medical context

class IsraeliHealthcareContext {
    constructor() {
        this.hebrewTerms = this.initializeHebrewTerms();
        this.israeliProtocols = this.initializeIsraeliProtocols();
        this.healthFunds = this.initializeHealthFunds();
        this.mohGuidelines = this.initializeMOHGuidelines();
    }

    initializeHebrewTerms() {
        return {
            // Medical specialties
            'רפואת זקנה': 'Geriatrics',
            'רפואה פנימית': 'Internal Medicine',
            'קרדיולוגיה': 'Cardiology',
            'נוירולוגיה': 'Neurology',
            'אורתופדיה': 'Orthopedics',
            'פסיכיאטריה': 'Psychiatry',
            'רפואת משפחה': 'Family Medicine',
            
            // Hospital departments
            'מחלקה פנימית': 'Internal Medicine Ward',
            'טיפול נמרץ': 'Intensive Care Unit',
            'מיון': 'Emergency Department',
            'בית מרקחת': 'Pharmacy',
            'מעבדה': 'Laboratory',
            'רנטגן': 'Radiology',
            'פיזיותרפיה': 'Physiotherapy',
            
            // Common conditions in Hebrew
            'סוכרת': 'Diabetes Mellitus',
            'לחץ דם גבוה': 'Hypertension',
            'אי ספיקת לב': 'Heart Failure',
            'אי ספיקת כליות': 'Kidney Failure',
            'דמנציה': 'Dementia',
            'אלצהיימר': 'Alzheimer Disease',
            'דיכאון': 'Depression',
            'חרדה': 'Anxiety',
            'נפילות': 'Falls',
            'כאבים': 'Pain',
            'דלקת פרקים': 'Arthritis',
            'אוסטאופורוזיס': 'Osteoporosis',
            'פרפור עליות': 'Atrial Fibrillation',
            'התקף לב': 'Myocardial Infarction',
            'שבץ': 'Stroke',
            'דלירה': 'Delirium',
            'בלבול': 'Confusion',
            
            // Medications in Hebrew
            'תרופות': 'Medications',
            'כדורים': 'Pills/Tablets',
            'זריקה': 'Injection',
            'משכך כאבים': 'Pain Reliever',
            'לב': 'Heart Medication',
            'לחץ דם': 'Blood Pressure Medication',
            'סוכרת': 'Diabetes Medication',
            'כדורי שינה': 'Sleep Medication',
            'נגד דיכאון': 'Antidepressant',
            
            // Dosing and administration
            'פעם ביום': 'Once Daily',
            'פעמיים ביום': 'Twice Daily',
            'שלוש פעמים ביום': 'Three Times Daily',
            'לפי הצורך': 'As Needed',
            'לפני האוכל': 'Before Meals',
            'עם האוכל': 'With Food',
            'אחרי האוכל': 'After Meals',
            'לפני השינה': 'At Bedtime',
            'בבוקר': 'In the Morning',
            'בערב': 'In the Evening',
            'ריק קיבה': 'On Empty Stomach',
            
            // Clinical assessments
            'בדיקה קלינית': 'Clinical Examination',
            'סטטוס': 'Physical Examination',
            'מדדי חיים': 'Vital Signs',
            'דופק': 'Pulse',
            'לחץ דם': 'Blood Pressure',
            'טמפרטורה': 'Temperature',
            'רוויה': 'Oxygen Saturation',
            'נשימות': 'Respiratory Rate',
            
            // Laboratory tests
            'בדיקות דם': 'Blood Tests',
            'ספירת דם': 'Complete Blood Count',
            'ביוכימיה': 'Chemistry Panel',
            'כליות': 'Kidney Function',
            'כבד': 'Liver Function',
            'סוכר': 'Glucose',
            'המוגלובין': 'Hemoglobin',
            'קריאטינין': 'Creatinine',
            'אלבומין': 'Albumin',
            'כולסטרול': 'Cholesterol',
            
            // Common phrases for documentation
            'המטופל מגיע': 'The patient presents with',
            'בעבר חלה': 'Past medical history of',
            'טיפול נוכחי': 'Current treatment',
            'הערכה ותכנון': 'Assessment and Plan',
            'המלצות': 'Recommendations',
            'מעקב': 'Follow-up',
            'שחרור': 'Discharge',
            'החמרה': 'Exacerbation',
            'יציב': 'Stable',
            'חמור': 'Severe',
            'קל': 'Mild',
            'בינוני': 'Moderate'
        };
    }

    initializeIsraeliProtocols() {
        return {
            'fall-prevention': {
                title: 'Fall Prevention Protocol - Israeli MOH Guidelines',
                hebrewTitle: 'פרוטוקול מניעת נפילות',
                guidelines: [
                    'Conduct comprehensive fall risk assessment using Hebrew Morse Fall Scale',
                    'Review medications for fall-risk drugs (common in Israeli elderly)',
                    'Environmental safety assessment adapted for Israeli homes',
                    'Referral to community physiotherapy through health funds',
                    'Vitamin D supplementation (especially important due to cultural dress)',
                    'Family education in Hebrew/Arabic as appropriate'
                ],
                israeliContext: 'Consider cultural factors: modest dress affecting vitamin D, multi-generational living, Hebrew/Arabic language barriers'
            },
            
            'delirium-management': {
                title: 'Delirium Management - Shaare Zedek Protocol',
                hebrewTitle: 'פרוטוקול טיפול בדלירה',
                guidelines: [
                    'Use CAM-ICU with Hebrew translations available',
                    'Family involvement crucial (strong family support in Israeli culture)',
                    'Consider religious/cultural needs (kosher food, Shabbat observance)',
                    'Medication review focusing on drugs common in Israeli elderly',
                    'Early mobilization with PT/OT familiar with Hebrew speakers',
                    'Sleep-wake cycle maintenance considering prayer times'
                ],
                israeliContext: 'Religious observance, family dynamics, and language preferences are key considerations'
            },

            'medication-reconciliation': {
                title: 'Medication Reconciliation - Multi-Health Fund Protocol',
                hebrewTitle: 'פרוטוקול תיאום תרופות',
                guidelines: [
                    'Check prescriptions from multiple health funds (Clalit, Maccabi, Meuhedet, Leumit)',
                    'Verify OTC medications (Optalgin very common)',
                    'Check for duplicate therapies across providers',
                    'Review complementary medicine use (high in Israeli population)',
                    'Ensure generic substitution appropriateness',
                    'Document in both Hebrew and English for continuity'
                ],
                israeliContext: 'Multiple health fund system creates coordination challenges'
            },

            'discharge-planning': {
                title: 'Geriatric Discharge Planning - Israeli Community Resources',
                hebrewTitle: 'תכנון שחרור לזקנים',
                guidelines: [
                    'Coordinate with health fund case managers',
                    'Arrange home care services through Bituach Leumi',
                    'Ensure medication availability at local pharmacy',
                    'Schedule follow-up with geriatrician or family physician',
                    'Connect with community day centers if appropriate',
                    'Provide discharge summary in Hebrew for patient/family'
                ],
                israeliContext: 'Strong social support system and government benefits available'
            }
        };
    }

    initializeHealthFunds() {
        return {
            'clalit': {
                name: 'Clalit Health Services',
                hebrewName: 'כללית',
                arabicName: 'كلاليت',
                coverage: '52% of Israeli population',
                geriatricServices: [
                    'Geriatric clinics in major cities',
                    'Home care services',
                    'Day care centers',
                    'Specialized clinics (memory, falls, etc.)'
                ],
                formulary: 'Most comprehensive, includes many innovative drugs',
                contact: '2700'
            },
            
            'maccabi': {
                name: 'Maccabi Healthcare Services',
                hebrewName: 'מכבי',
                arabicName: 'مكابي',
                coverage: '25% of Israeli population',
                geriatricServices: [
                    'Geriatric assessment units',
                    'Telehealth services for elderly',
                    'Medication management programs',
                    'Comprehensive geriatric assessment'
                ],
                formulary: 'Good coverage, strong on technology solutions',
                contact: '3555'
            },
            
            'meuhedet': {
                name: 'Meuhedet Health Services',
                hebrewName: 'מאוחדת',
                arabicName: 'موحيدت',
                coverage: '14% of Israeli population',
                geriatricServices: [
                    'Specialized geriatric clinics',
                    'Home hospitalization programs',
                    'Memory clinics',
                    'Fall prevention programs'
                ],
                formulary: 'Standard basket plus additional services',
                contact: '3833'
            },
            
            'leumit': {
                name: 'Leumit Health Services',
                hebrewName: 'לאומית',
                arabicName: 'ليئوميت',
                coverage: '9% of Israeli population',
                geriatricServices: [
                    'Community geriatric services',
                    'Home care coordination',
                    'Chronic disease management',
                    'Preventive care programs'
                ],
                formulary: 'Basic basket with supplementary insurance options',
                contact: '507'
            }
        };
    }

    initializeMOHGuidelines() {
        return {
            'anticoagulation': {
                title: 'Anticoagulation in Elderly - MOH Guidelines 2024',
                hebrewTitle: 'הנחיות משרד הבריאות - נוגדי קרישה בגיל המבוגר',
                keyPoints: [
                    'CHA₂DS₂-VASc score ≥2 for men, ≥3 for women warrants anticoagulation',
                    'DOACs preferred over warfarin in most elderly patients',
                    'Renal function crucial - adjust doses accordingly',
                    'Fall risk assessment mandatory but should not preclude treatment',
                    'Regular monitoring in anticoagulation clinics available nationwide'
                ],
                dosing: {
                    rivaroxaban: '20mg daily with food (15mg if CrCl 15-50)',
                    apixaban: '5mg BID (2.5mg BID if ≥2 criteria: age≥80, weight≤60kg, SCr≥1.5)',
                    dabigatran: '150mg BID (110mg BID if age≥80 or high bleeding risk)',
                    warfarin: 'Target INR 2.0-3.0, consider lower targets in frail elderly'
                }
            },

            'diabetes-elderly': {
                title: 'Diabetes Management in Geriatric Patients - Israeli Guidelines',
                hebrewTitle: 'ניהול סוכרת בקשישים',
                targets: {
                    healthy: 'HbA1c <7.5%',
                    complex: 'HbA1c <8.0%',
                    'end-of-life': 'HbA1c <8.5%, avoid hypoglycemia'
                },
                medications: [
                    'Metformin first-line if tolerated and eGFR >30',
                    'Avoid sulfonylureas if possible due to hypoglycemia risk',
                    'DPP-4 inhibitors safe in elderly',
                    'SGLT2 inhibitors with caution (UTI, dehydration risk)',
                    'Insulin with structured education program'
                ]
            },

            'hypertension-elderly': {
                title: 'Hypertension in Elderly - Israeli Consensus',
                hebrewTitle: 'לחץ דם גבוה בקשישים',
                targets: {
                    'age-65-79': 'SBP <130 mmHg if tolerated',
                    'age-80+': 'SBP 130-140 mmHg',
                    frail: 'Individualized, avoid hypotension'
                },
                medications: [
                    'ACE inhibitors/ARBs first-line',
                    'Calcium channel blockers for isolated systolic HTN',
                    'Thiazide diuretics effective in elderly',
                    'Avoid alpha-blockers due to falls risk',
                    'Beta-blockers only if specific indication'
                ]
            }
        };
    }

    // Translation functions
    translateToHebrew(englishTerm) {
        const term = englishTerm.toLowerCase();
        for (const [hebrew, english] of Object.entries(this.hebrewTerms)) {
            if (english.toLowerCase() === term) {
                return hebrew;
            }
        }
        return englishTerm; // Return original if no translation found
    }

    translateFromHebrew(hebrewTerm) {
        return this.hebrewTerms[hebrewTerm] || hebrewTerm;
    }

    // Protocol retrieval
    getProtocol(protocolName) {
        return this.israeliProtocols[protocolName] || null;
    }

    getAllProtocols() {
        return Object.keys(this.israeliProtocols).map(key => ({
            id: key,
            ...this.israeliProtocols[key]
        }));
    }

    // Health fund information
    getHealthFundInfo(fundName) {
        const fundKey = fundName.toLowerCase();
        return this.healthFunds[fundKey] || null;
    }

    getAllHealthFunds() {
        return Object.values(this.healthFunds);
    }

    // MOH guidelines
    getMOHGuideline(guidelineName) {
        return this.mohGuidelines[guidelineName] || null;
    }

    // Utility functions for Israeli context
    formatIsraeliDate(date) {
        return new Date(date).toLocaleDateString('he-IL');
    }

    formatIsraeliPhoneNumber(number) {
        // Format Israeli phone numbers (e.g., 052-123-4567)
        const cleaned = number.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        return number;
    }

    getKosherMedications(medicationList) {
        // Simple kosher medication checker (in practice would use detailed database)
        const nonKosherIngredients = ['gelatin', 'stearic acid from non-kosher sources'];
        const flaggedMeds = [];
        
        medicationList.forEach(med => {
            // This is simplified - real implementation would check detailed databases
            if (med.toLowerCase().includes('capsule') && !med.includes('vegetarian')) {
                flaggedMeds.push({
                    medication: med,
                    concern: 'May contain gelatin - check kosher certification',
                    alternatives: 'Request tablet formulation or kosher-certified version'
                });
            }
        });
        
        return flaggedMeds;
    }

    // Clinical decision support adapted for Israeli context
    adaptDosingForClimate(medication, season) {
        const israeliClimate = {
            summer: 'Hot and humid (30-40°C)',
            winter: 'Mild and rainy (10-20°C)'
        };
        
        const adaptations = {
            'diuretics': {
                summer: 'Monitor for dehydration more frequently, consider dose reduction',
                winter: 'Standard dosing, monitor sodium'
            },
            'antihypertensives': {
                summer: 'Risk of hypotension due to dehydration',
                winter: 'Standard monitoring'
            },
            'lithium': {
                summer: 'Increased risk of toxicity due to dehydration',
                winter: 'Standard monitoring'
            }
        };
        
        return adaptations[medication]?.[season] || 'Standard monitoring appropriate';
    }

    // Export functions for integration
    exportTranslations() {
        return {
            hebrewTerms: this.hebrewTerms,
            lastUpdated: new Date().toISOString()
        };
    }

    exportProtocols() {
        return {
            protocols: this.israeliProtocols,
            guidelines: this.mohGuidelines,
            healthFunds: this.healthFunds,
            lastUpdated: new Date().toISOString()
        };
    }
}

// Initialize global instance
if (typeof window !== 'undefined') {
    window.israeliContext = new IsraeliHealthcareContext();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IsraeliHealthcareContext;
}