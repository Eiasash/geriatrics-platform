// Comprehensive Israeli Drug Database for Geriatrics Platform
// Includes Hebrew names, interactions, and Israeli healthcare context

class IsraeliDrugDatabase {
    constructor() {
        this.drugs = this.initializeDrugDatabase();
        this.interactions = this.initializeInteractionDatabase();
        this.hebrewMappings = this.initializeHebrewMappings();
    }

    initializeDrugDatabase() {
        return [
            // Cardiovascular Medications
            {
                genericName: 'lisinopril',
                brandNames: ['Zestril', 'Prinivil', 'Coversyl'],
                hebrewNames: ['לִיסִינוֹפְּרִיל', 'זֶסטְרִיל'],
                category: 'ACE Inhibitor',
                elderlyDosing: 'Start 2.5-5mg daily, max 40mg',
                renalAdjustment: 'Reduce dose if CrCl <60',
                israeliNotes: 'Available in Kupat Holim basket, common first-line',
                beersRisk: 'low',
                interactions: ['nsaids', 'potassium', 'arbs'],
                commonSideEffects: ['dry cough', 'hyperkalemia', 'angioedema']
            },
            {
                genericName: 'amlodipine',
                brandNames: ['Norvasc', 'Amlopress'],
                hebrewNames: ['אַמְלוֹדִיפִּין', 'נוֹרְוַסק'],
                category: 'Calcium Channel Blocker',
                elderlyDosing: 'Start 2.5mg daily, max 10mg',
                renalAdjustment: 'No adjustment needed',
                israeliNotes: 'Very common in Israeli geriatric population',
                beersRisk: 'low',
                interactions: ['simvastatin'],
                commonSideEffects: ['ankle edema', 'flushing', 'dizziness']
            },
            {
                genericName: 'furosemide',
                brandNames: ['Lasix', 'Furix'],
                hebrewNames: ['פוּרוֹסֶמִיד', 'לָזִיקס'],
                category: 'Loop Diuretic',
                elderlyDosing: 'Start 20-40mg daily, titrate carefully',
                renalAdjustment: 'May need higher doses in CKD',
                israeliNotes: 'Monitor for dehydration in hot Israeli climate',
                beersRisk: 'moderate',
                interactions: ['digoxin', 'lithium', 'aminoglycosides'],
                commonSideEffects: ['hypokalemia', 'hyponatremia', 'ototoxicity']
            },

            // Diabetes Medications
            {
                genericName: 'metformin',
                brandNames: ['Glucophage', 'Metformin Teva'],
                hebrewNames: ['מֶטפוֹרְמִין', 'גְלוּקוֹפָג׳'],
                category: 'Biguanide',
                elderlyDosing: 'Start 500mg daily with meals, max 2g/day',
                renalAdjustment: 'Contraindicated if eGFR <30',
                israeliNotes: 'First-line for DM2 in Israeli guidelines',
                beersRisk: 'low',
                interactions: ['contrast media', 'alcohol'],
                commonSideEffects: ['GI upset', 'lactic acidosis (rare)', 'B12 deficiency']
            },
            {
                genericName: 'glipizide',
                brandNames: ['Glucotrol', 'Glipizide Teva'],
                hebrewNames: ['גְלִיפִּיזַיד'],
                category: 'Sulfonylurea',
                elderlyDosing: 'Start 2.5mg daily, max 20mg',
                renalAdjustment: 'Reduce dose if CrCl <50',
                israeliNotes: 'High hypoglycemia risk in elderly',
                beersRisk: 'high',
                interactions: ['beta-blockers', 'alcohol', 'warfarin'],
                commonSideEffects: ['hypoglycemia', 'weight gain', 'sun sensitivity']
            },

            // Psychiatric Medications
            {
                genericName: 'lorazepam',
                brandNames: ['Ativan', 'Loraz'],
                hebrewNames: ['לוֹרָזֶפָּאם', 'אָטִיבָן'],
                category: 'Benzodiazepine',
                elderlyDosing: 'Start 0.25-0.5mg, max 2mg/day',
                renalAdjustment: 'No adjustment needed',
                israeliNotes: 'High prescribing rates in Israeli elderly',
                beersRisk: 'high',
                interactions: ['opioids', 'alcohol', 'antihistamines'],
                commonSideEffects: ['sedation', 'confusion', 'falls', 'dependence']
            },
            {
                genericName: 'quetiapine',
                brandNames: ['Seroquel', 'Quetapex'],
                hebrewNames: ['קְוֶטִיאָפִּין', 'סֶרוֹקְוֶל'],
                category: 'Atypical Antipsychotic',
                elderlyDosing: 'Start 12.5mg BID, titrate slowly',
                renalAdjustment: 'No adjustment needed',
                israeliNotes: 'Black box warning for dementia patients',
                beersRisk: 'high',
                interactions: ['antihypertensives', 'cns depressants'],
                commonSideEffects: ['sedation', 'orthostatic hypotension', 'metabolic effects']
            },

            // Pain Medications
            {
                genericName: 'tramadol',
                brandNames: ['Ultram', 'Tramal'],
                hebrewNames: ['טְרָמָדוֹל', 'טְרָמָל'],
                category: 'Atypical Opioid',
                elderlyDosing: 'Start 25mg TID, max 300mg/day',
                renalAdjustment: 'Reduce dose if CrCl <30',
                israeliNotes: 'Common for osteoarthritis in Israeli elderly',
                beersRisk: 'moderate',
                interactions: ['ssris', 'maois', 'warfarin'],
                commonSideEffects: ['nausea', 'dizziness', 'constipation', 'serotonin syndrome']
            },
            {
                genericName: 'ibuprofen',
                brandNames: ['Advil', 'Nurofen', 'Ibuprofen Teva'],
                hebrewNames: ['אִיבּוּפְרוֹפֶן', 'אַדְוִיל', 'נוּרוֹפֶן'],
                category: 'NSAID',
                elderlyDosing: 'Avoid if possible, max 1200mg/day if needed',
                renalAdjustment: 'Avoid if CrCl <30',
                israeliNotes: 'Very common OTC use, education needed',
                beersRisk: 'high',
                interactions: ['warfarin', 'ace-inhibitors', 'diuretics'],
                commonSideEffects: ['GI bleeding', 'renal impairment', 'hypertension']
            },

            // GI Medications
            {
                genericName: 'omeprazole',
                brandNames: ['Prilosec', 'Omepex', 'Losec'],
                hebrewNames: ['אוֹמֶפְּרָזוֹל', 'פְּרִילוֹזֶק'],
                category: 'Proton Pump Inhibitor',
                elderlyDosing: '20mg daily, use lowest effective dose',
                renalAdjustment: 'No adjustment needed',
                israeliNotes: 'Long-term use concerns, deprescribing opportunities',
                beersRisk: 'moderate',
                interactions: ['clopidogrel', 'warfarin', 'iron'],
                commonSideEffects: ['C. diff risk', 'fractures', 'B12/Mg deficiency']
            },

            // Anticoagulants
            {
                genericName: 'warfarin',
                brandNames: ['Coumadin', 'Warfarin Teva'],
                hebrewNames: ['וַרְפָרִין', 'קוּמָדִין'],
                category: 'Vitamin K Antagonist',
                elderlyDosing: 'Start 2.5-5mg daily, INR monitoring',
                renalAdjustment: 'Careful monitoring needed',
                israeliNotes: 'Maccabi/Clalit anticoagulation clinics available',
                beersRisk: 'high',
                interactions: ['nsaids', 'antibiotics', 'amiodarone'],
                commonSideEffects: ['bleeding', 'skin necrosis', 'drug interactions']
            },
            {
                genericName: 'rivaroxaban',
                brandNames: ['Xarelto'],
                hebrewNames: ['רִיוַרוֹקְסָבָן', 'קְסָרֶלְטוֹ'],
                category: 'Direct Oral Anticoagulant',
                elderlyDosing: '15-20mg daily with food',
                renalAdjustment: 'Contraindicated if CrCl <15',
                israeliNotes: 'Newer in Israeli formulary, expensive',
                beersRisk: 'moderate',
                interactions: ['antiplatelets', 'nsaids'],
                commonSideEffects: ['bleeding', 'no specific reversal agent']
            },

            // Israeli-Specific Medications
            {
                genericName: 'dipyrone',
                brandNames: ['Optalgin', 'Metamizole'],
                hebrewNames: ['אוֹפְּטַלְגִין', 'דִיפִּירוֹן'],
                category: 'Pyrazolone Analgesic',
                elderlyDosing: '500mg PRN, max 3g/day',
                renalAdjustment: 'Reduce dose in severe renal impairment',
                israeliNotes: 'Very common in Israel, banned in many countries',
                beersRisk: 'moderate',
                interactions: ['warfarin', 'antihypertensives'],
                commonSideEffects: ['agranulocytosis (rare)', 'hypotension', 'rash']
            }
        ];
    }

    initializeInteractionDatabase() {
        return [
            {
                drug1: 'warfarin',
                drug2: 'nsaid',
                severity: 'major',
                mechanism: 'Increased bleeding risk due to dual anticoagulation',
                clinicalEffect: 'Major bleeding, especially GI and CNS',
                management: 'Avoid combination. Use acetaminophen instead.',
                israeliGuideline: 'Ministry of Health recommends PPI if combination unavoidable',
                evidence: 'RR 2.07 for major bleeding (BMJ 2011)'
            },
            {
                drug1: 'ace-inhibitor',
                drug2: 'nsaid', 
                severity: 'moderate',
                mechanism: 'Reduced renal prostaglandin synthesis',
                clinicalEffect: 'Acute kidney injury, reduced BP control',
                management: 'Monitor renal function and BP closely',
                israeliGuideline: 'Check creatinine within 1-2 weeks',
                evidence: 'AKI risk increased 3-fold (Kidney Int 2017)'
            },
            {
                drug1: 'metformin',
                drug2: 'contrast',
                severity: 'major',
                mechanism: 'Reduced renal clearance in AKI',
                clinicalEffect: 'Lactic acidosis',
                management: 'Hold metformin 48h before and after contrast',
                israeliGuideline: 'Standard protocol in Israeli hospitals',
                evidence: 'Cochrane review shows preventable deaths'
            },
            {
                drug1: 'digoxin',
                drug2: 'furosemide',
                severity: 'major',
                mechanism: 'Hypokalemia increases digoxin binding',
                clinicalEffect: 'Digoxin toxicity',
                management: 'Monitor potassium and digoxin levels',
                israeliGuideline: 'Check levels every 2-4 weeks',
                evidence: 'Toxicity risk doubled with hypokalemia'
            },
            {
                drug1: 'warfarin',
                drug2: 'omeprazole',
                severity: 'moderate',
                mechanism: 'CYP2C19 inhibition',
                clinicalEffect: 'Increased warfarin effect',
                management: 'Consider pantoprazole as alternative',
                israeliGuideline: 'Monitor INR more frequently',
                evidence: 'Meta-analysis shows 12% INR increase'
            }
        ];
    }

    initializeHebrewMappings() {
        return {
            // Common medical terms
            'תרופה': 'medication',
            'מרשם': 'prescription', 
            'רופא': 'doctor',
            'בית מרקחת': 'pharmacy',
            'קופת חולים': 'health fund',
            'כללית': 'Clalit',
            'מכבי': 'Maccabi',
            'מאוחדת': 'Meuhedet',
            'לאומית': 'Leumit',
            
            // Dosing terms
            'פעמיים ביום': 'twice daily',
            'שלוש פעמים ביום': 'three times daily',
            'לפני אוכל': 'before meals',
            'אחרי אוכל': 'after meals',
            'לפני שינה': 'at bedtime',
            'לפי הצורך': 'as needed',
            'בבוקר': 'in the morning',
            'בערב': 'in the evening',
            
            // Medical conditions
            'לחץ דם גבוה': 'hypertension',
            'סוכרת': 'diabetes',
            'אי ספיקת לב': 'heart failure',
            'מחלת כליות': 'kidney disease',
            'דמנציה': 'dementia',
            'דיכאון': 'depression',
            'חרדה': 'anxiety',
            'כאב': 'pain',
            'דלקת פרקים': 'arthritis',
            'אוסטאופורוזיס': 'osteoporosis'
        };
    }

    // Drug search functions
    findDrug(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        return this.drugs.filter(drug => {
            return drug.genericName.toLowerCase().includes(term) ||
                   drug.brandNames.some(brand => brand.toLowerCase().includes(term)) ||
                   drug.hebrewNames.some(hebrew => hebrew.includes(searchTerm)) ||
                   drug.category.toLowerCase().includes(term);
        });
    }

    // Interaction checking
    checkInteractions(drugList) {
        const interactions = [];
        
        for (let i = 0; i < drugList.length; i++) {
            for (let j = i + 1; j < drugList.length; j++) {
                const drug1 = drugList[i].toLowerCase();
                const drug2 = drugList[j].toLowerCase();
                
                const interaction = this.interactions.find(int => {
                    return (int.drug1 === drug1 && int.drug2 === drug2) ||
                           (int.drug1 === drug2 && int.drug2 === drug1) ||
                           this.matchesDrugCategory(drug1, int.drug1) && 
                           this.matchesDrugCategory(drug2, int.drug2);
                });
                
                if (interaction) {
                    interactions.push({
                        ...interaction,
                        involvedDrugs: [drug1, drug2]
                    });
                }
            }
        }
        
        return interactions;
    }

    matchesDrugCategory(drugName, category) {
        const drug = this.drugs.find(d => 
            d.genericName.toLowerCase() === drugName ||
            d.brandNames.some(brand => brand.toLowerCase() === drugName)
        );
        
        return drug && drug.category.toLowerCase().includes(category.toLowerCase());
    }

    // Beers Criteria assessment
    assessBeersRisk(drugList) {
        const riskyMedications = [];
        
        drugList.forEach(drugName => {
            const drug = this.findDrug(drugName)[0];
            if (drug && ['high', 'moderate'].includes(drug.beersRisk)) {
                riskyMedications.push({
                    drug: drug.genericName,
                    riskLevel: drug.beersRisk,
                    reason: this.getBeersReason(drug.category),
                    alternatives: this.getAlternatives(drug.category)
                });
            }
        });
        
        return riskyMedications;
    }

    getBeersReason(category) {
        const reasons = {
            'Benzodiazepine': 'Increased risk of cognitive impairment, delirium, falls, fractures, and motor vehicle crashes',
            'NSAID': 'Increased risk of GI bleeding and peptic ulcer disease in high-risk groups',
            'Sulfonylurea': 'Higher risk of severe prolonged hypoglycemia in older adults',
            'Atypical Antipsychotic': 'Increased risk of cerebrovascular accident and mortality in dementia'
        };
        
        return reasons[category] || 'Potentially inappropriate for use in older adults';
    }

    getAlternatives(category) {
        const alternatives = {
            'Benzodiazepine': 'Non-pharmacological interventions, SSRIs for anxiety, melatonin for sleep',
            'NSAID': 'Acetaminophen, topical preparations, non-pharmacological pain management',
            'Sulfonylurea': 'Metformin, DPP-4 inhibitors, lifestyle modifications',
            'Atypical Antipsychotic': 'Non-pharmacological behavioral interventions, address underlying causes'
        };
        
        return alternatives[category] || 'Consult with prescriber for safer alternatives';
    }

    // Israeli healthcare context
    getIsraeliDrugInfo(drugName) {
        const drug = this.findDrug(drugName)[0];
        if (!drug) return null;
        
        return {
            drug: drug.genericName,
            hebrewNames: drug.hebrewNames,
            israeliNotes: drug.israeliNotes,
            availability: this.checkFormularyStatus(drug.genericName),
            monitoring: this.getMonitoringGuidelines(drug.category)
        };
    }

    checkFormularyStatus(drugName) {
        // Simplified formulary check - in reality would query Israeli health fund databases
        const restrictedDrugs = ['rivaroxaban', 'quetiapine'];
        const genericAvailable = ['omeprazole', 'metformin', 'lisinopril'];
        
        if (restrictedDrugs.includes(drugName)) return 'Requires pre-authorization';
        if (genericAvailable.includes(drugName)) return 'Generic available in basket';
        return 'Check with specific health fund';
    }

    getMonitoringGuidelines(category) {
        const guidelines = {
            'ACE Inhibitor': 'Monitor renal function and potassium within 1-2 weeks',
            'Loop Diuretic': 'Monitor electrolytes, renal function, and fluid status',
            'Vitamin K Antagonist': 'INR monitoring per Israeli anticoagulation guidelines',
            'Benzodiazepine': 'Regular assessment for dependence and cognitive effects',
            'Proton Pump Inhibitor': 'Consider deprescribing after 8 weeks if no clear indication'
        };
        
        return guidelines[category] || 'Follow standard monitoring protocols';
    }

    // Export functions for integration
    exportToJSON() {
        return {
            drugs: this.drugs,
            interactions: this.interactions,
            hebrewMappings: this.hebrewMappings,
            lastUpdated: new Date().toISOString()
        };
    }
}

// Initialize global instance
if (typeof window !== 'undefined') {
    window.israeliDrugDB = new IsraeliDrugDatabase();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IsraeliDrugDatabase;
}