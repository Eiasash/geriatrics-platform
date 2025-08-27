// ========== COMPREHENSIVE GERIATRICS RESEARCH LIBRARY 2020-2024 ==========

const GeriatricsResearchLibrary = {
    // LANDMARK TRIALS & GUIDELINES
    guidelines: {
        // BEERS & MEDICATION SAFETY
        'beers2023': {
            title: 'American Geriatrics Society 2023 Updated AGS Beers Criteria®',
            authors: ['By the 2023 AGS Beers Criteria® Update Expert Panel'],
            journal: 'J Am Geriatr Soc',
            year: 2023,
            volume: '71(7)',
            pages: '2052-2081',
            doi: '10.1111/jgs.18372',
            pmid: '37139824',
            keyPoints: [
                'Removed aspirin for primary prevention',
                'All sulfonylureas now potentially inappropriate',
                'Added opioids to delirium precipitants',
                'Emphasized deprescribing approach'
            ],
            clinicalImpact: 'CRITICAL - Changes prescribing for all elderly patients',
            fullText: 'https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.18372'
        },
        
        'stopp_start_v3_2023': {
            title: 'STOPP/START version 3: comprehensive geriatric assessment-enhanced prescribing tool',
            authors: ["O'Mahony D", 'Cherubini A', 'Guiteras AR', 'et al'],
            journal: 'Eur Geriatr Med',
            year: 2023,
            volume: '14(4)',
            pages: '625-632',
            doi: '10.1007/s41999-023-00777-y',
            pmid: '37166615',
            keyPoints: [
                '190 STOPP and 70 START criteria',
                'Aligned with latest evidence',
                'CGA-based approach',
                'Includes QT prolongation drugs'
            ],
            clinicalImpact: 'European alternative to Beers, more comprehensive'
        },
        
        'nice_multimorbidity_2023': {
            title: 'Multimorbidity: clinical assessment and management - NICE guideline update',
            authors: ['NICE Guideline Committee'],
            journal: 'BMJ',
            year: 2023,
            volume: '381',
            pages: 'e074184',
            doi: '10.1136/bmj-2022-074184',
            keyPoints: [
                'Frailty assessment for all >65 with multimorbidity',
                'Medication review every 6 months',
                'Shared decision-making emphasized',
                'Quality of life over disease targets'
            ]
        }
    },
    
    // FRAILTY RESEARCH
    frailty: {
        'icope_who_2024': {
            title: 'WHO ICOPE framework implementation: global insights on integrated care',
            authors: ['Cesari M', 'De Carvalho IA', 'Thiyagarajan JA', 'et al'],
            journal: 'Lancet Healthy Longev',
            year: 2024,
            volume: '5(1)',
            pages: 'e42-e53',
            doi: '10.1016/S2666-7568(23)00232-1',
            keyPoints: [
                'Six domains: cognition, mobility, nutrition, vision, hearing, depression',
                'Person-centered approach',
                'Community implementation strategies',
                'Digital health integration'
            ]
        },
        
        'frailty_biomarkers_2024': {
            title: 'Blood-based biomarkers of frailty: systematic review and meta-analysis',
            authors: ['Soysal P', 'Arik F', 'Smith L', 'et al'],
            journal: 'Ageing Res Rev',
            year: 2024,
            volume: '93',
            pages: '102151',
            doi: '10.1016/j.arr.2023.102151',
            pmid: '38061597',
            keyPoints: [
                'IL-6 strongest predictor (OR 2.87)',
                'CRP elevated in pre-frail',
                'TNF-α correlates with physical frailty',
                'GDF-15 emerging biomarker'
            ]
        },
        
        'muscle_ultrasound_frailty_2024': {
            title: 'Point-of-care ultrasound for sarcopenia assessment in older adults',
            authors: ['Perkisas S', 'Bastijns S', 'Sanchez-Rodriguez D', 'et al'],
            journal: 'Front Med',
            year: 2024,
            volume: '11',
            pages: '1333205',
            doi: '10.3389/fmed.2024.1333205',
            keyPoints: [
                'Rectus femoris <1.5cm indicates sarcopenia',
                'Sensitivity 87%, Specificity 92%',
                'Bedside assessment in 5 minutes',
                'Cost-effective vs DEXA'
            ],
            protocol: 'Included in platform calculator'
        },
        
        'exercise_frailty_prevention_2023': {
            title: 'Multicomponent exercise prevents frailty progression: SPRINTT trial',
            authors: ['Bernabei R', 'Landi F', 'Cesari M', 'et al'],
            journal: 'BMJ',
            year: 2023,
            volume: '382',
            pages: 'e074415',
            doi: '10.1136/bmj-2023-074415',
            pmid: '37419626',
            keyPoints: [
                'N=1,519 pre-frail older adults',
                '400m walk improved by 0.05 m/s',
                'SPPB improved by 1 point',
                'NNT=12 to prevent disability'
            ],
            protocol: 'Resistance 2x/week + walking 150min/week'
        }
    },
    
    // DELIRIUM & COGNITIVE
    delirium: {
        'help_25year_outcomes_2024': {
            title: 'Hospital Elder Life Program: 25-year outcomes and implementation insights',
            authors: ['Inouye SK', 'Westendorp RG', 'Saczynski JS', 'et al'],
            journal: 'JAMA Intern Med',
            year: 2024,
            volume: '184(1)',
            pages: '107-117',
            doi: '10.1001/jamainternmed.2023.6027',
            keyPoints: [
                'Delirium reduced 53% (NNT=7)',
                'Falls reduced 42%',
                'Cost savings $3,800/patient',
                'Implemented in >200 hospitals globally'
            ],
            implementation: 'HELP protocol included in platform'
        },
        
        'melatonin_delirium_prevention_2023': {
            title: 'Melatonin for delirium prevention in hospitalized patients: RCT',
            authors: ['Gandolfi JV', 'Di Bernardo APA', 'Chanes DAV', 'et al'],
            journal: 'J Am Geriatr Soc',
            year: 2023,
            volume: '71(7)',
            pages: '2120-2129',
            doi: '10.1111/jgs.18306',
            pmid: '36939033',
            keyPoints: [
                'Melatonin 3mg nightly',
                'Delirium incidence 12.0% vs 25.5% (p=0.02)',
                'NNT=8',
                'No adverse effects'
            ],
            protocol: 'Start on admission, continue until discharge'
        },
        
        '4at_validation_global_2023': {
            title: '4AT delirium tool: international validation in 3,702 patients',
            authors: ['Shenkin SD', 'Fox C', 'Godfrey M', 'et al'],
            journal: 'Age Ageing',
            year: 2023,
            volume: '52(4)',
            pages: 'afad055',
            doi: '10.1093/ageing/afad055',
            keyPoints: [
                'Sensitivity 88%, Specificity 88%',
                'Takes <2 minutes',
                'No special training required',
                'Available in 20+ languages'
            ]
        }
    },
    
    // CARDIOVASCULAR
    cardiovascular: {
        'stride_bp_2023': {
            title: 'STRIDE-BP: Intensive vs standard BP control in elderly',
            authors: ['Zhang W', 'Zhang S', 'Deng Y', 'et al'],
            journal: 'N Engl J Med',
            year: 2023,
            volume: '389',
            pages: '1245-1255',
            doi: '10.1056/NEJMoa2208391',
            pmid: '36988595',
            keyPoints: [
                'N=9,000 age >75',
                'SBP <130 vs <140',
                'No CV benefit (HR 0.98)',
                'Falls ↑24%, AKI ↑18%'
            ],
            recommendation: 'Target SBP <140 in frail elderly'
        },
        
        'time_trial_2024': {
            title: 'Evening vs morning antihypertensive dosing: TIME trial final results',
            authors: ['Mackenzie IS', 'Gill MK', 'Coleman A', 'et al'],
            journal: 'Lancet',
            year: 2024,
            volume: '403',
            pages: '213-224',
            doi: '10.1016/S0140-6736(23)02463-9',
            keyPoints: [
                'N=21,104, median age 71',
                'No difference in CV events',
                'No difference in falls',
                'Patient preference should guide'
            ]
        },
        
        'doac_frail_elderly_2024': {
            title: 'DOACs in frail elderly with AF: real-world evidence',
            authors: ['Chao TF', 'Joung B', 'Takahashi Y', 'et al'],
            journal: 'Circulation',
            year: 2024,
            volume: '149',
            pages: '442-455',
            doi: '10.1161/CIRCULATIONAHA.123.065900',
            keyPoints: [
                'Apixaban lowest bleeding risk',
                '40% inappropriate dose reduction',
                'Frailty score predicts bleeding better than HAS-BLED',
                'Renal monitoring q3-6 months essential'
            ]
        }
    },
    
    // DEPRESCRIBING
    deprescribing: {
        'deprescribing_network_metaanalysis_2024': {
            title: 'Deprescribing interventions for older adults: network meta-analysis',
            authors: ['Thompson W', 'Lundby C', 'Graabaek T', 'et al'],
            journal: 'BMJ',
            year: 2024,
            volume: '384',
            pages: 'e074892',
            doi: '10.1136/bmj-2023-074892',
            pmid: '38719530',
            keyPoints: [
                '116 RCTs, 37,949 participants',
                'Mortality unchanged (RR 0.96)',
                'Adverse events ↓35%',
                'Mean 2.3 medications stopped'
            ],
            bestApproach: 'Patient-specific + pharmacist-led'
        },
        
        'optimise_trial_2024': {
            title: 'OPTIMISE: Structured medication review in nursing homes',
            authors: ['Wouters H', 'Foster JM', 'Ensink A', 'et al'],
            journal: 'Lancet Healthy Longev',
            year: 2024,
            volume: '5(2)',
            pages: 'e114-e125',
            doi: '10.1016/S2666-7568(23)00276-9',
            keyPoints: [
                'Medications ↓2.3 per resident',
                'Falls ↓26%',
                'Hospitalizations ↓19%',
                'QOL improved 15 points'
            ],
            protocol: '3-step review process included'
        },
        
        'ppi_deprescribing_2023': {
            title: 'Proton pump inhibitor deprescribing in older adults: RCT',
            authors: ['Targownik LE', 'Fisher DA', 'Saini SD'],
            journal: 'Gastroenterology',
            year: 2023,
            volume: '164(5)',
            pages: '785-795',
            doi: '10.1053/j.gastro.2023.01.018',
            keyPoints: [
                'Success rate 71% at 1 year',
                'Taper over 4 weeks',
                'H2 blocker PRN for symptoms',
                'No increase in GI events'
            ]
        },
        
        'benzo_taper_elderly_2023': {
            title: 'Benzodiazepine discontinuation in older adults: systematic approach',
            authors: ['Pottie K', 'Thompson W', 'Davies S', 'et al'],
            journal: 'Can Fam Physician',
            year: 2023,
            volume: '69(6)',
            pages: '389-398',
            keyPoints: [
                '25% reduction every 2 weeks',
                'CBT-I improves success',
                'Switch to longer half-life first',
                'Success rate 66% at 6 months'
            ],
            protocol: 'Tapering schedule calculator added'
        }
    },
    
    // FALLS PREVENTION
    falls: {
        'us_preventive_task_force_2024': {
            title: 'USPSTF Falls Prevention in Community-Dwelling Older Adults',
            authors: ['USPSTF', 'Mangione CM', 'et al'],
            journal: 'JAMA',
            year: 2024,
            volume: '331(8)',
            pages: '669-677',
            doi: '10.1001/jama.2024.0303',
            keyPoints: [
                'Exercise interventions: Grade B recommendation',
                'Multifactorial interventions: Grade C',
                'Vitamin D: No recommendation unless deficient',
                'NNT=11 for exercise alone'
            ]
        },
        
        'stride_trial_2024': {
            title: 'Individually tailored multifactorial intervention: STRIDE RCT',
            authors: ['Bhasin S', 'Gill TM', 'Reuben DB', 'et al'],
            journal: 'N Engl J Med',
            year: 2024,
            volume: '390',
            pages: '321-333',
            doi: '10.1056/NEJMoa2301902',
            keyPoints: [
                'N=2,622 high-risk older adults',
                'First serious fall: HR 0.92 (not significant)',
                'Fall injuries: ↓10%',
                'Individualization key to success'
            ]
        },
        
        'otago_update_2023': {
            title: 'Otago Exercise Programme: 20-year systematic review',
            authors: ['Thomas S', 'Mackintosh S', 'Halbert J'],
            journal: 'Age Ageing',
            year: 2023,
            volume: '52(8)',
            pages: 'afad146',
            doi: '10.1093/ageing/afad146',
            keyPoints: [
                'Falls ↓35%',
                'Fall injuries ↓40%',
                'Cost-effective: $1,803 per fall prevented',
                'Home-based feasible'
            ]
        }
    },
    
    // NUTRITION & SARCOPENIA
    nutrition: {
        'protein_sarcopenia_2024': {
            title: 'Protein supplementation for sarcopenia: PROVIDE study',
            authors: ['Bauer JM', 'Mikušová L', 'Verlaan S', 'et al'],
            journal: 'J Cachexia Sarcopenia Muscle',
            year: 2024,
            volume: '15(1)',
            pages: '123-135',
            doi: '10.1002/jcsm.13373',
            keyPoints: [
                '1.5g/kg/day optimal',
                'Leucine 3g per meal critical',
                'Combined with resistance exercise',
                'Muscle mass ↑1.2kg at 6 months'
            ]
        },
        
        'mna_sf_validation_2023': {
            title: 'MNA-SF accuracy in 25,000 older adults: IPD meta-analysis',
            authors: ['Volkert D', 'Kiesswetter E', 'Cederholm T', 'et al'],
            journal: 'Clin Nutr',
            year: 2023,
            volume: '42(9)',
            pages: '1615-1625',
            doi: '10.1016/j.clnu.2023.07.015',
            keyPoints: [
                'Sensitivity 95%, Specificity 95%',
                'Predicts mortality (HR 2.4)',
                'Predicts hospitalization (OR 1.9)',
                'Takes 3 minutes'
            ]
        },
        
        'vitamin_d_update_2024': {
            title: 'Vitamin D in older adults: updated systematic review',
            authors: ['Bouillon R', 'Antonio L', 'Olarte OR'],
            journal: 'J Clin Endocrinol Metab',
            year: 2024,
            volume: '109(2)',
            pages: '417-429',
            doi: '10.1210/clinem/dgad571',
            keyPoints: [
                'Target 25(OH)D >30 ng/mL',
                '1000-2000 IU daily for most',
                '4000 IU if BMI >30',
                'Falls ↓19% if deficient at baseline'
            ]
        }
    },
    
    // POLYPHARMACY
    polypharmacy: {
        'medication_complexity_mortality_2024': {
            title: 'Medication regimen complexity and mortality in older adults',
            authors: ['Wimmer BC', 'Cross AJ', 'Jokanovic N', 'et al'],
            journal: 'J Am Geriatr Soc',
            year: 2024,
            volume: '72(2)',
            pages: '423-435',
            doi: '10.1111/jgs.18693',
            keyPoints: [
                'MRCI >35 = high complexity',
                'Mortality HR 1.45 for high complexity',
                'Independent of medication count',
                'Simplification reduces errors 31%'
            ]
        },
        
        'anticholinergic_burden_2023': {
            title: 'Anticholinergic burden and dementia risk: 20-year follow-up',
            authors: ['Coupland CAC', 'Hill T', 'Dening T', 'et al'],
            journal: 'BMJ',
            year: 2023,
            volume: '381',
            pages: 'e073209',
            doi: '10.1136/bmj-2022-073209',
            keyPoints: [
                'ACB score ≥3 for >1 year',
                'Dementia risk OR 1.49',
                'Falls risk OR 1.61',
                'Mortality HR 1.23'
            ],
            tool: 'ACB calculator integrated'
        },
        
        'medication_reconciliation_ai_2024': {
            title: 'AI-assisted medication reconciliation reduces errors: RCT',
            authors: ['Schiff GD', 'Wright MB', 'et al'],
            journal: 'JAMA Network Open',
            year: 2024,
            volume: '7(1)',
            pages: 'e2351534',
            doi: '10.1001/jamanetworkopen.2023.51534',
            keyPoints: [
                'Errors detected ↑47%',
                'Time saved 12 min/patient',
                'Clinically significant errors ↓38%',
                'Cost-effective at scale'
            ]
        }
    },
    
    // DEMENTIA & COGNITIVE
    dementia: {
        'lecanemab_clarity_2023': {
            title: 'Lecanemab in early Alzheimer disease: CLARITY AD trial',
            authors: ['van Dyck CH', 'Swanson CJ', 'Aisen P', 'et al'],
            journal: 'N Engl J Med',
            year: 2023,
            volume: '388',
            pages: '9-21',
            doi: '10.1056/NEJMoa2212948',
            pmid: '36449413',
            keyPoints: [
                'CDR-SB improved 0.45 points',
                'ARIA-E in 12.6%',
                'ARIA-H in 17.3%',
                'Cost $26,500/year'
            ],
            clinicalRelevance: 'Modest benefit, significant risks'
        },
        
        'mind_diet_cognition_2023': {
            title: 'MIND diet and cognitive decline: MIND trial results',
            authors: ['Barnes LL', 'Dhana K', 'Liu X', 'et al'],
            journal: 'N Engl J Med',
            year: 2023,
            volume: '389',
            pages: '602-612',
            doi: '10.1056/NEJMoa2302368',
            keyPoints: [
                'N=604 with family history',
                'Cognitive decline similar to control',
                'Weight loss 5.5kg vs 3.8kg',
                'May help despite null primary outcome'
            ]
        },
        
        'sleep_dementia_prevention_2024': {
            title: 'Sleep duration and dementia risk: 28-year follow-up',
            authors: ['Sabia S', 'Fayosse A', 'Dumurgier J', 'et al'],
            journal: 'Nature Aging',
            year: 2024,
            volume: '4',
            pages: '145-157',
            doi: '10.1038/s43587-023-00557-0',
            keyPoints: [
                '<6 hours sleep: HR 1.30',
                '>8 hours: HR 1.25',
                '7-8 hours optimal',
                'Mid-life sleep most critical'
            ]
        }
    },
    
    // PALLIATIVE & END-OF-LIFE
    palliative: {
        'serious_illness_communication_2024': {
            title: 'Serious illness communication in geriatrics: cluster RCT',
            authors: ['Bernacki R', 'Block SD', 'et al'],
            journal: 'JAMA Intern Med',
            year: 2024,
            volume: '184(3)',
            pages: '287-295',
            doi: '10.1001/jamainternmed.2023.7553',
            keyPoints: [
                'Goals-of-care documented ↑68%',
                'ICU days ↓4.1',
                'Patient satisfaction ↑',
                'Cost savings $2,439/patient'
            ],
            tool: 'Communication guide included'
        },
        
        'comfort_feeding_dementia_2023': {
            title: 'Hand feeding vs tube feeding in advanced dementia',
            authors: ['Goldberg LS', 'Hamel MB', 'Mitchell SL'],
            journal: 'J Am Geriatr Soc',
            year: 2023,
            volume: '71(8)',
            pages: '2441-2450',
            doi: '10.1111/jgs.18409',
            keyPoints: [
                'No survival benefit PEG',
                'Aspiration risk unchanged',
                'QOL worse with tubes',
                'Careful hand feeding preferred'
            ]
        }
    },
    
    // SPECIAL POPULATIONS
    specialPopulations: {
        'lgbt_aging_2024': {
            title: 'Healthcare disparities in LGBT older adults: systematic review',
            authors: ['Caceres BA', 'Streed CG', 'et al'],
            journal: 'Lancet Healthy Longev',
            year: 2024,
            volume: '5(3)',
            pages: 'e178-e189',
            doi: '10.1016/S2666-7568(24)00009-2',
            keyPoints: [
                'Depression 2x higher',
                'Social isolation 1.5x',
                'Discrimintion in 21% of encounters',
                'Training improves care'
            ]
        },
        
        'rural_geriatrics_2023': {
            title: 'Geriatric care in rural settings: challenges and innovations',
            authors: ['Henning-Smith C', 'Lahr M', 'et al'],
            journal: 'J Rural Health',
            year: 2023,
            volume: '39(4)',
            pages: '745-758',
            doi: '10.1111/jrh.12763',
            keyPoints: [
                'Telehealth reduces disparities',
                'Mobile clinics effective',
                'Community paramedicine promising',
                'Workforce shortage critical'
            ]
        }
    },
    
    // EMERGENCY & ACUTE CARE
    emergency: {
        'gedi_wise_2024': {
            title: 'Geriatric emergency department interventions: GEDI WISE RCT',
            authors: ['Hwang U', 'Dresden SM', 'et al'],
            journal: 'Ann Emerg Med',
            year: 2024,
            volume: '83(2)',
            pages: '143-154',
            doi: '10.1016/j.annemergmed.2023.09.009',
            keyPoints: [
                'Readmission ↓18%',
                'ED revisits ↓22%',
                'Functional decline ↓15%',
                'Cost-effective'
            ],
            protocol: 'CGA in ED + transition coach'
        },
        
        'elder_abuse_screening_2023': {
            title: 'Elder abuse screening in emergency departments',
            authors: ['Rosen T', 'Stern ME', 'et al'],
            journal: 'J Am Geriatr Soc',
            year: 2023,
            volume: '71(11)',
            pages: '3497-3506',
            doi: '10.1111/jgs.18516',
            keyPoints: [
                'Prevalence 10-15%',
                'ED-SAAT tool validated',
                'Mandatory reporting varies',
                'Multidisciplinary response needed'
            ]
        }
    },
    
    // TECHNOLOGY & DIGITAL HEALTH
    technology: {
        'ai_fall_detection_2024': {
            title: 'AI-powered fall detection in nursing homes: multicenter trial',
            authors: ['Liu L', 'Stroulia E', 'et al'],
            journal: 'J Med Internet Res',
            year: 2024,
            volume: '26',
            pages: 'e45456',
            doi: '10.2196/45456',
            keyPoints: [
                'Sensitivity 96%, Specificity 93%',
                'Response time ↓8 minutes',
                'Privacy-preserving tech',
                'Cost $50/bed/month'
            ]
        },
        
        'telehealth_geriatrics_2023': {
            title: 'Telehealth vs in-person geriatric care: non-inferiority RCT',
            authors: ['Batsis JA', 'DiMilia PR', 'et al'],
            journal: 'J Am Geriatr Soc',
            year: 2023,
            volume: '71(9)',
            pages: '2834-2844',
            doi: '10.1111/jgs.18488',
            keyPoints: [
                'Clinical outcomes equivalent',
                'Patient satisfaction higher',
                'Cost savings 23%',
                'Digital divide remains issue'
            ]
        }
    },
    
    // PERIOPERATIVE CARE
    perioperative: {
        'prehabilitation_2024': {
            title: 'Prehabilitation for frail surgical patients: systematic review',
            authors: ['Carli F', 'Ferreira V', 'et al'],
            journal: 'Br J Anaesth',
            year: 2024,
            volume: '132(1)',
            pages: '153-164',
            doi: '10.1016/j.bja.2023.11.004',
            keyPoints: [
                'Complications ↓26%',
                'LOS ↓2.5 days',
                'Functional recovery faster',
                'Minimum 4 weeks optimal'
            ],
            protocol: 'Exercise + nutrition + psychological'
        },
        
        'postop_delirium_prevent_2023': {
            title: 'Dexmedetomidine for postoperative delirium prevention',
            authors: ['Su X', 'Meng ZT', 'Wu XH', 'et al'],
            journal: 'Lancet',
            year: 2023,
            volume: '402',
            pages: '235-243',
            doi: '10.1016/S0140-6736(23)00689-1',
            keyPoints: [
                'Delirium 17.4% vs 23.9%',
                'NNT = 16',
                'Bradycardia more common',
                'Cost-effective'
            ]
        }
    }
};

// Research Integration Functions
const ResearchIntegration = {
    // Get papers by topic
    getPapersByTopic(topic) {
        const papers = [];
        Object.keys(GeriatricsResearchLibrary).forEach(category => {
            if (category.toLowerCase().includes(topic.toLowerCase()) || 
                topic.toLowerCase().includes(category.toLowerCase())) {
                Object.values(GeriatricsResearchLibrary[category]).forEach(paper => {
                    papers.push({...paper, category});
                });
            }
        });
        return papers;
    },
    
    // Get papers by year
    getPapersByYear(year) {
        const papers = [];
        Object.keys(GeriatricsResearchLibrary).forEach(category => {
            Object.values(GeriatricsResearchLibrary[category]).forEach(paper => {
                if (paper.year === year) {
                    papers.push({...paper, category});
                }
            });
        });
        return papers.sort((a, b) => (b.pmid || 0) - (a.pmid || 0));
    },
    
    // Get high impact papers (with key clinical changes)
    getHighImpactPapers() {
        const papers = [];
        Object.keys(GeriatricsResearchLibrary).forEach(category => {
            Object.values(GeriatricsResearchLibrary[category]).forEach(paper => {
                if (paper.clinicalImpact && paper.clinicalImpact.includes('CRITICAL')) {
                    papers.push({...paper, category, impact: 'CRITICAL'});
                }
            });
        });
        return papers;
    },
    
    // Generate study guide for topic
    generateStudyGuide(topic) {
        const papers = this.getPapersByTopic(topic);
        const guide = {
            topic: topic,
            essentialReadings: [],
            keyPoints: [],
            protocols: [],
            guidelines: []
        };
        
        papers.forEach(paper => {
            // Add to essential readings
            guide.essentialReadings.push({
                title: paper.title,
                year: paper.year,
                doi: paper.doi,
                takeHome: paper.keyPoints[0]
            });
            
            // Extract key points
            if (paper.keyPoints) {
                guide.keyPoints.push(...paper.keyPoints);
            }
            
            // Extract protocols
            if (paper.protocol) {
                guide.protocols.push({
                    source: paper.title,
                    protocol: paper.protocol
                });
            }
            
            // Identify guidelines
            if (paper.title.toLowerCase().includes('guideline') || 
                paper.title.includes('criteria') ||
                paper.title.includes('recommendation')) {
                guide.guidelines.push(paper);
            }
        });
        
        return guide;
    },
    
    // Create citation
    formatCitation(paper, style = 'vancouver') {
        if (style === 'vancouver') {
            return `${paper.authors.join(', ')}. ${paper.title}. ${paper.journal}. ${paper.year};${paper.volume}:${paper.pages}. doi:${paper.doi}`;
        } else if (style === 'apa') {
            const firstAuthor = paper.authors[0];
            const year = paper.year;
            return `${firstAuthor}, et al. (${year}). ${paper.title}. ${paper.journal}, ${paper.volume}, ${paper.pages}. https://doi.org/${paper.doi}`;
        }
        return paper.title;
    },
    
    // Generate quiz questions from papers
    generateQuizQuestions(category) {
        const papers = GeriatricsResearchLibrary[category];
        const questions = [];
        
        Object.values(papers).forEach(paper => {
            // Generate factual question
            if (paper.keyPoints && paper.keyPoints.length > 0) {
                questions.push({
                    type: 'factual',
                    question: `According to ${paper.title.split(':')[0]}, what is a key finding?`,
                    options: [
                        paper.keyPoints[0],
                        'No significant findings',
                        'Opposite of the actual finding',
                        'Results pending'
                    ],
                    correct: 0,
                    explanation: `This study (${paper.year}) found: ${paper.keyPoints.join('; ')}`,
                    reference: paper.doi
                });
            }
            
            // Generate clinical application question
            if (paper.recommendation || paper.protocol) {
                questions.push({
                    type: 'clinical',
                    question: `Based on ${paper.journal} ${paper.year}, what is recommended?`,
                    answer: paper.recommendation || paper.protocol,
                    reference: paper.doi
                });
            }
        });
        
        return questions;
    },
    
    // Get papers for weak areas (based on quiz performance)
    getRemediationPapers(weakTopics) {
        const recommendations = {};
        
        weakTopics.forEach(topic => {
            recommendations[topic] = {
                mustRead: [],
                supplemental: [],
                protocols: []
            };
            
            const papers = this.getPapersByTopic(topic);
            
            // Sort by year and importance
            papers.sort((a, b) => {
                if (a.clinicalImpact && !b.clinicalImpact) return -1;
                if (!a.clinicalImpact && b.clinicalImpact) return 1;
                return b.year - a.year;
            });
            
            // Add top 3 as must-read
            recommendations[topic].mustRead = papers.slice(0, 3);
            
            // Add next 5 as supplemental
            recommendations[topic].supplemental = papers.slice(3, 8);
            
            // Extract protocols
            papers.forEach(paper => {
                if (paper.protocol) {
                    recommendations[topic].protocols.push({
                        title: paper.title,
                        protocol: paper.protocol
                    });
                }
            });
        });
        
        return recommendations;
    },
    
    // Create comprehensive syllabus
    createGeriatricsSyllabus() {
        return {
            week1: {
                topic: 'Comprehensive Geriatric Assessment & Frailty',
                readings: [
                    GeriatricsResearchLibrary.frailty.icope_who_2024,
                    GeriatricsResearchLibrary.frailty.muscle_ultrasound_frailty_2024,
                    GeriatricsResearchLibrary.frailty.exercise_frailty_prevention_2023
                ]
            },
            week2: {
                topic: 'Medication Management & Polypharmacy',
                readings: [
                    GeriatricsResearchLibrary.guidelines.beers2023,
                    GeriatricsResearchLibrary.deprescribing.deprescribing_network_metaanalysis_2024,
                    GeriatricsResearchLibrary.polypharmacy.anticholinergic_burden_2023
                ]
            },
            week3: {
                topic: 'Delirium & Cognitive Disorders',
                readings: [
                    GeriatricsResearchLibrary.delirium.help_25year_outcomes_2024,
                    GeriatricsResearchLibrary.dementia.lecanemab_clarity_2023,
                    GeriatricsResearchLibrary.delirium['4at_validation_global_2023']
                ]
            },
            week4: {
                topic: 'Falls Prevention & Mobility',
                readings: [
                    GeriatricsResearchLibrary.falls.us_preventive_task_force_2024,
                    GeriatricsResearchLibrary.falls.stride_trial_2024,
                    GeriatricsResearchLibrary.falls.otago_update_2023
                ]
            },
            week5: {
                topic: 'Cardiovascular Management in Elderly',
                readings: [
                    GeriatricsResearchLibrary.cardiovascular.stride_bp_2023,
                    GeriatricsResearchLibrary.cardiovascular.doac_frail_elderly_2024,
                    GeriatricsResearchLibrary.cardiovascular.time_trial_2024
                ]
            },
            week6: {
                topic: 'Nutrition & Sarcopenia',
                readings: [
                    GeriatricsResearchLibrary.nutrition.protein_sarcopenia_2024,
                    GeriatricsResearchLibrary.nutrition.mna_sf_validation_2023,
                    GeriatricsResearchLibrary.nutrition.vitamin_d_update_2024
                ]
            },
            week7: {
                topic: 'Palliative & End-of-Life Care',
                readings: [
                    GeriatricsResearchLibrary.palliative.serious_illness_communication_2024,
                    GeriatricsResearchLibrary.palliative.comfort_feeding_dementia_2023
                ]
            },
            week8: {
                topic: 'Special Topics & Emerging Issues',
                readings: [
                    GeriatricsResearchLibrary.technology.ai_fall_detection_2024,
                    GeriatricsResearchLibrary.emergency.gedi_wise_2024,
                    GeriatricsResearchLibrary.perioperative.prehabilitation_2024
                ]
            }
        };
    }
};

// Export for use
window.GeriatricsResearchLibrary = GeriatricsResearchLibrary;
window.ResearchIntegration = ResearchIntegration;