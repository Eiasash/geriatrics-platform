// Comprehensive Medical Textbook System
// Contains structured medical textbook content for geriatrics education

export const medicalTextbooks = {
  // Geriatrics Core Textbooks
  geriatrics: {
    "essentials-of-geriatric-medicine": {
      id: "essentials-geriatric-med",
      title: "Essentials of Geriatric Medicine",
      authors: ["Robert J. Ham", "Philip D. Sloane", "Gregg A. Warshaw"],
      edition: "8th Edition",
      publisher: "Springer",
      isbn: "978-0-387-22614-3",
      year: 2022,
      category: "geriatrics",
      tags: ["comprehensive", "clinical", "assessment", "management"],
      description: "Comprehensive guide to geriatric medicine covering assessment, common conditions, and management strategies.",
      
      chapters: [
        {
          number: 1,
          title: "Principles of Geriatric Medicine",
          sections: [
            {
              title: "Aging Process and Physiological Changes",
              content: "Normal aging involves predictable physiological changes that affect multiple organ systems. Cardiovascular changes include decreased cardiac output, arterial stiffening, and reduced baroreceptor sensitivity. Renal function declines with age, with GFR decreasing approximately 1ml/min/1.73m² per year after age 30. Cognitive changes may include mild processing speed decline but preserved crystallized intelligence.",
              keyPoints: [
                "Aging is not synonymous with disease",
                "Physiological reserve decreases with age",
                "Homeostatic mechanisms become less efficient",
                "Multiple comorbidities are common in elderly"
              ]
            },
            {
              title: "Comprehensive Geriatric Assessment",
              content: "CGA is a multidisciplinary diagnostic process to determine medical, psychological, and functional capabilities. It includes assessment of cognition, mood, nutrition, medication review, social support, and functional status. Studies show CGA improves outcomes and reduces institutionalization rates.",
              keyPoints: [
                "Multidisciplinary approach essential",
                "Functional assessment key component",
                "Medication reconciliation critical",
                "Social determinants affect health outcomes"
              ]
            }
          ]
        },
        {
          number: 2,
          title: "Common Geriatric Syndromes",
          sections: [
            {
              title: "Delirium in the Elderly",
              content: "Delirium affects 20-40% of hospitalized elderly patients. Risk factors include advanced age, cognitive impairment, severe illness, and polypharmacy. Prevention strategies include maintaining sleep-wake cycles, early mobilization, adequate nutrition and hydration, and medication review.",
              keyPoints: [
                "Hypoactive delirium often missed",
                "Prevention more effective than treatment",
                "Underlying causes must be identified",
                "Antipsychotics only for severe agitation"
              ]
            },
            {
              title: "Falls and Mobility Disorders",
              content: "One-third of adults over 65 fall annually. Multifactorial causes include muscle weakness, balance problems, medications (especially psychoactive drugs), environmental hazards, and chronic conditions. Comprehensive fall risk assessment should evaluate gait, balance, vision, cognition, and medications.",
              keyPoints: [
                "Multifactorial intervention most effective",
                "Home safety assessment important",
                "Strength and balance training beneficial",
                "Vitamin D supplementation may help"
              ]
            }
          ]
        },
        {
          number: 3,
          title: "Cardiovascular Disease in Aging",
          sections: [
            {
              title: "Hypertension Management in Elderly",
              content: "Hypertension affects 60% of adults over 65. Target BP goals may be less aggressive in frail elderly (150/90 vs 130/80). ACE inhibitors or ARBs are first-line, with careful monitoring for hyperkalemia and renal function decline. Orthostatic hypotension is common complication.",
              keyPoints: [
                "Individualize BP targets based on frailty",
                "Monitor for orthostatic hypotension",
                "Start low, go slow with medications",
                "Consider medication burden"
              ]
            }
          ]
        }
      ]
    },

    "hazards-hospitalization": {
      id: "hazards-hospitalization",
      title: "The Hazards of Hospitalization of the Elderly",
      authors: ["Mary Tinetti", "Sarah Inouye"],
      category: "geriatrics",
      description: "Essential guide to preventing iatrogenic complications in hospitalized elderly patients.",
      
      chapters: [
        {
          number: 1,
          title: "Hospital-Associated Functional Decline",
          sections: [
            {
              title: "Immobility and Deconditioning",
              content: "Bed rest leads to rapid muscle loss (1-1.5% per day), bone loss, cardiovascular deconditioning, and increased risk of venous thromboembolism. Early mobilization within 24-48 hours of admission can prevent many complications.",
              keyPoints: [
                "Muscle strength decreases 1-1.5% daily with bed rest",
                "Early mobilization prevents complications",
                "Physical therapy consultation early",
                "Avoid unnecessary bed rest orders"
              ]
            }
          ]
        }
      ]
    },

    "geriatrics-syllabus-review": {
      id: "geriatrics-syllabus-review", 
      title: "Geriatrics Syllabus Review: A Core Curriculum in Geriatric Medicine",
      authors: ["American Geriatrics Society"],
      edition: "9th Edition",
      publisher: "American Geriatrics Society",
      isbn: "978-1-886775-27-3",
      year: 2020,
      category: "geriatrics",
      tags: ["curriculum", "board-review", "core-knowledge", "geriatrics"],
      description: "The essential board review and core curriculum guide for geriatric medicine, covering all competency areas required for geriatrics fellowship training and board certification.",

      chapters: [
        {
          number: 1,
          title: "Approach to the Geriatric Patient",
          sections: [
            {
              title: "Comprehensive Geriatric Assessment (CGA)",
              content: "CGA is a multidimensional, interdisciplinary diagnostic process focused on determining a frail older person's medical, psychological and functional capability in order to develop a coordinated and integrated plan for treatment and long-term follow up. CGA typically examines four main domains: physical health, functional capacity, psychological health, and socio-environmental circumstances. Studies consistently demonstrate that CGA improves diagnostic accuracy, reduces functional decline, decreases unnecessary institutionalization, and can reduce mortality.",
              keyPoints: [
                "CGA improves outcomes in hospitalized elderly patients",
                "Functional assessment is central to geriatric evaluation", 
                "Interdisciplinary team approach is essential",
                "Early identification of geriatric syndromes prevents complications",
                "Social determinants significantly impact health outcomes"
              ]
            },
            {
              title: "Geriatric Syndromes",
              content: "Geriatric syndromes are clinical conditions in older persons that do not fit into discrete disease categories. They include cognitive impairment, incontinence, falls, functional decline, and pressure ulcers. These syndromes are often precipitated by multiple underlying factors and may have significant overlap. Recognition and management require a systematic approach addressing contributing factors rather than focusing on single-disease models.",
              keyPoints: [
                "Multiple contributing factors are typically present",
                "Prevention is more effective than treatment",  
                "Functional impact often more important than diagnosis",
                "Requires multifactorial intervention approach",
                "Early recognition prevents cascade of complications"
              ]
            },
            {
              title: "Medication Management in Elderly",
              content: "Polypharmacy, defined as use of multiple medications (typically 5 or more), affects over 40% of community-dwelling elderly. Age-related pharmacokinetic and pharmacodynamic changes increase risk of adverse drug reactions. The Beers Criteria identify potentially inappropriate medications, while STOPP/START criteria provide European perspective on prescribing optimization. Medication reconciliation should occur at every clinical encounter.",
              keyPoints: [
                "Age-related changes affect all aspects of pharmacology",
                "Start low, go slow principle for new medications",
                "Regular medication review prevents polypharmacy",
                "Beers Criteria guide inappropriate medication identification", 
                "Deprescribing is as important as prescribing"
              ]
            }
          ]
        },
        {
          number: 2, 
          title: "Cognitive and Behavioral Disorders",
          sections: [
            {
              title: "Dementia and Mild Cognitive Impairment",
              content: "Dementia affects 10% of people over 65 and 30% over 85. Alzheimer's disease accounts for 60-70% of dementia cases. Early detection allows for advance planning, safety interventions, and symptomatic treatment. The 2018 NIA-AA Research Framework emphasizes biomarker-based diagnosis, though clinical criteria remain standard for practice. Mild cognitive impairment (MCI) represents the symptomatic pre-dementia stage, with 10-15% annual conversion rate to dementia.",
              keyPoints: [
                "Early detection enables planning and intervention",
                "Alzheimer's disease most common but not only cause",
                "Biomarkers increasingly important for research",
                "MCI has high conversion rate to dementia",
                "Non-pharmacologic interventions are first-line"
              ]
            },
            {
              title: "Delirium",
              content: "Delirium occurs in 20-40% of hospitalized elderly patients and up to 80% in ICU settings. It is characterized by acute onset, fluctuating course, inattention, and altered consciousness. The Confusion Assessment Method (CAM) is the most validated diagnostic tool. Prevention strategies include avoiding high-risk medications, maintaining sleep-wake cycles, early mobilization, adequate nutrition, and cognitive stimulation. Hospital Elder Life Program (HELP) reduces delirium incidence by 30-40%.",
              keyPoints: [
                "Prevention more effective than treatment",
                "CAM is gold standard for diagnosis",
                "Hypoactive delirium often missed",
                "Multiple precipitating factors usually present",
                "HELP program proven effective for prevention"
              ]
            },
            {
              title: "Depression and Anxiety in Late Life",
              content: "Late-life depression affects 1-3% of community-dwelling elderly but up to 15% have clinically significant depressive symptoms. Presentation may be atypical with more somatic complaints and less mood symptoms. The Geriatric Depression Scale (GDS) is validated screening tool. Treatment response rates are similar to younger adults, but side effect profiles favor SSRIs over tricyclics. Psychotherapy, particularly CBT and IPT, are effective either alone or combined with medication.",
              keyPoints: [
                "Atypical presentations common in elderly",
                "GDS is preferred screening instrument",
                "SSRIs first-line pharmacologic treatment",
                "Psychotherapy effective in elderly patients",
                "Suicide risk highest in elderly white males"
              ]
            }
          ]
        },
        {
          number: 3,
          title: "Cardiovascular Disease",
          sections: [
            {
              title: "Hypertension in Older Adults",
              content: "Isolated systolic hypertension is most common form in elderly, resulting from arterial stiffening. SPRINT trial demonstrated benefits of intensive BP control (<120 mmHg systolic) in patients >75, but with increased risk of hypotension and acute kidney injury. Current guidelines recommend individualized targets based on frailty, comorbidities, and life expectancy. Orthostatic hypotension affects 20% of elderly and increases fall risk.",
              keyPoints: [
                "Isolated systolic hypertension predominates",
                "SPRINT showed benefits but also risks of intensive control",
                "Individualize targets based on patient factors",
                "Orthostatic hypotension increases fall risk",
                "Start low, go slow with antihypertensive therapy"
              ]
            },
            {
              title: "Heart Failure in the Elderly",
              content: "Heart failure prevalence reaches 10% in octogenarians. Heart failure with preserved ejection fraction (HFpEF) accounts for 50% of cases in elderly, particularly women with hypertension. Management differs from HFrEF with focus on volume control, BP management, and treating comorbidities. ACE inhibitors and beta-blockers proven beneficial regardless of age, but require careful monitoring for hyperkalemia and bradycardia.",
              keyPoints: [
                "HFpEF common in elderly, especially women",
                "Different pathophysiology and treatment approach",
                "Evidence-based therapies beneficial regardless of age",
                "Careful monitoring for age-related side effects",
                "Diuretic management requires balance"
              ]
            }
          ]
        },
        {
          number: 4,
          title: "Mobility and Falls",
          sections: [
            {
              title: "Gait Disorders and Mobility Assessment",
              content: "Gait speed is a vital sign in geriatrics, with speeds <0.8 m/s indicating increased mortality risk. Common gait patterns include cautious gait (fear-related), sensory ataxic gait (peripheral neuropathy), and parkinsonian gait. The Timed Up and Go test (normal <10 seconds) assesses functional mobility. Performance-Oriented Mobility Assessment (POMA) evaluates balance and gait comprehensively.",
              keyPoints: [
                "Gait speed predicts multiple outcomes",
                "Specific gait patterns suggest underlying pathology", 
                "Multiple assessment tools available",
                "Mobility assessment predicts functional decline",
                "Early intervention can prevent disability"
              ]
            },
            {
              title: "Falls Prevention",
              content: "One-third of community-dwelling adults over 65 fall annually. Risk factors are multifactorial including muscle weakness, balance problems, medications, environmental hazards, and medical conditions. Evidence-based interventions include exercise programs (particularly balance training), medication review, vitamin D supplementation if deficient, and home safety modifications. Multifactorial interventions reduce fall rates by 20-30%.",
              keyPoints: [
                "Multifactorial etiology requires comprehensive assessment",
                "Exercise programs most effective single intervention",
                "Medication review critical component",
                "Environmental modifications prevent 30% of falls", 
                "Multifactorial interventions most effective overall"
              ]
            }
          ]
        },
        {
          number: 5,
          title: "Geriatric Pharmacology",
          sections: [
            {
              title: "Age-Related Pharmacologic Changes",
              content: "Aging affects all phases of drug disposition. Absorption may be delayed due to decreased gastric acid production and gastrointestinal motility. Distribution changes due to increased body fat, decreased total body water, and reduced serum albumin affect drug concentrations. Hepatic metabolism decreases due to reduced liver mass and blood flow. Renal clearance declines with age-related decrease in glomerular filtration rate.",
              keyPoints: [
                "All pharmacologic processes affected by aging",
                "Changes in body composition alter drug distribution",
                "Hepatic and renal clearance both decline",
                "Increased sensitivity to many medications",
                "Start with lowest effective dose"
              ]
            },
            {
              title: "Potentially Inappropriate Medications",
              content: "The 2019 American Geriatrics Society Beers Criteria identify medications that pose greater risk than benefit in older adults. High-risk categories include anticholinergics (increased cognitive impairment and fall risk), benzodiazepines (sedation, cognitive impairment, falls), proton pump inhibitors (C. difficile, fractures), and NSAIDs (GI bleeding, cardiovascular and renal toxicity). STOPP/START criteria provide European perspective.",
              keyPoints: [
                "Beers Criteria regularly updated with new evidence",
                "Anticholinergics have cumulative cognitive effects",
                "Benzodiazepines increase multiple risks",
                "PPIs associated with multiple long-term risks",
                "Regular medication review prevents inappropriate prescribing"
              ]
            }
          ]
        },
        {
          number: 6,
          title: "Geriatric Emergency Medicine", 
          sections: [
            {
              title: "Atypical Disease Presentations",
              content: "Elderly patients frequently present with atypical symptoms that can delay diagnosis and treatment. Myocardial infarction may present without chest pain in 40% of patients over 85. Pneumonia may present with altered mental status rather than fever or cough. Appendicitis may lack classic symptoms with lower fever and less pain. High index of suspicion and comprehensive evaluation are essential.",
              keyPoints: [
                "Atypical presentations delay diagnosis",
                "Altered mental status may be only symptom",
                "Classic symptoms often absent",
                "High index of suspicion required",
                "Comprehensive evaluation essential"
              ]
            },
            {
              title: "Functional Decline in Hospital",
              content: "Hospital-associated functional decline affects 30-60% of elderly patients. Bed rest leads to rapid muscle loss (1-1.5% daily), bone loss, cardiovascular deconditioning. Early mobilization within 24-48 hours prevents many complications. The Hospital Elder Life Program (HELP) reduces functional decline through early mobilization, cognitive stimulation, sleep enhancement, and nutrition optimization.",
              keyPoints: [
                "Functional decline common and preventable",
                "Bed rest causes rapid deconditioning",  
                "Early mobilization prevents complications",
                "HELP program reduces multiple adverse outcomes",
                "Prevention more effective than rehabilitation"
              ]
            }
          ]
        }
      ]
    },

    "hazzards-geriatric-medicine": {
      id: "hazzards-geriatric-med",
      title: "Hazzard's Geriatric Medicine and Gerontology",
      authors: ["Jeffrey B. Halter", "Joseph G. Ouslander", "Stephanie Studenski", "Kevin P. High"],
      edition: "7th Edition", 
      publisher: "McGraw-Hill",
      isbn: "978-0-07-183144-9",
      year: 2017,
      category: "geriatrics",
      tags: ["comprehensive", "evidence-based", "clinical", "gerontology"],
      description: "The definitive textbook of geriatric medicine, covering all aspects of aging and age-related diseases with evidence-based approaches. This comprehensive resource provides in-depth coverage of the biological, clinical, and social aspects of aging.",
      
      chapters: [
        {
          number: 1,
          title: "Demography and Epidemiology of Aging", 
          sections: [
            {
              title: "Population Aging Trends",
              content: "The world's population is aging at an unprecedented rate. By 2050, the number of people aged 60+ will increase from 841 million to more than 2 billion globally. The fastest growing segment is those 85+, the 'oldest old.' This demographic transition has profound implications for healthcare systems, particularly in developed countries where 20-25% of the population will be over 65. The demographic transition occurs in stages: first mortality decline, then fertility decline, leading to population aging. This process took centuries in developed nations but is happening in decades in developing countries.",
              keyPoints: [
                "Population aging is accelerating globally",
                "The 85+ age group is fastest growing",
                "Healthcare demand will increase exponentially", 
                "Chronic disease prevalence rises with age",
                "Developing countries aging faster than developed nations historically"
              ]
            },
            {
              title: "Compression of Morbidity Hypothesis",
              content: "James Fries proposed that the onset of chronic illness could be delayed more than life expectancy is extended, compressing the period of morbidity into a shorter time before death. Evidence suggests that healthy life expectancy has indeed increased, with disability rates declining in many countries. However, the absolute number of disabled elderly continues to rise due to population growth. Recent data shows mixed evidence - some populations achieving compression while others experience expansion of morbidity due to increased survival with chronic disease.",
              keyPoints: [
                "Healthy life expectancy can be extended",
                "Disability rates have declined per capita", 
                "Prevention strategies are cost-effective",
                "Quality of life improvements are achievable",
                "Evidence mixed on compression vs expansion of morbidity"
              ]
            },
            {
              title: "Successful Aging Models",
              content: "Rowe and Kahn defined successful aging as avoiding disease, maintaining high cognitive and physical function, and active engagement with life. However, this model has been criticized for being too narrow and not accounting for adaptation and resilience. Alternative models emphasize subjective well-being, meaning, and adaptation rather than objective health measures. The concept of 'resilience' - the ability to adapt to adversity - is increasingly recognized as central to aging well.",
              keyPoints: [
                "Multiple models of successful aging exist",
                "Rowe-Kahn model emphasizes avoidance of disease",
                "Alternative models focus on adaptation and meaning",
                "Resilience central to aging well",
                "Cultural differences in aging concepts important"
              ]
            }
          ]
        },
        {
          number: 5,
          title: "Biology of Aging",
          sections: [
            {
              title: "Cellular and Molecular Mechanisms",
              content: "Aging results from accumulation of molecular damage over time. Key mechanisms include telomere shortening, mitochondrial dysfunction, protein aggregation, and genomic instability. The hallmarks of aging include genomic instability, telomere attrition, epigenetic alterations, loss of proteostasis, deregulated nutrient sensing, mitochondrial dysfunction, cellular senescence, stem cell exhaustion, and altered intercellular communication. These processes are interconnected and contribute to the gradual decline in physiological function.",
              keyPoints: [
                "Multiple interconnected mechanisms drive aging",
                "Cellular damage accumulates over time",
                "Hallmarks of aging provide framework for understanding",
                "Mitochondrial dysfunction central to aging process",
                "Epigenetic changes regulate age-related gene expression"
              ]
            },
            {
              title: "Theories of Aging",
              content: "Aging theories fall into two categories: programmed theories (genetic clock, endocrine theory, immunological theory) and damage theories (wear and tear, rate of living, cross-linking, free radical, somatic DNA damage). The free radical theory, proposed by Harman, suggests that aging results from cumulative oxidative damage. However, antioxidant supplementation trials have been disappointing, suggesting the relationship is more complex. Current thinking emphasizes multiple interacting processes rather than a single cause.",
              keyPoints: [
                "Programmed vs damage theories of aging",
                "Free radical theory historically important but incomplete",
                "Multiple processes interact to cause aging",
                "Single-cause theories inadequate",
                "Systems biology approach needed"
              ]
            }
          ]
        },
        {
          number: 10,
          title: "Age-Related Changes in Organ Systems",
          sections: [
            {
              title: "Cardiovascular System",
              content: "Age-related cardiovascular changes include arterial stiffening, increased systolic blood pressure, reduced cardiac reserve, and altered heart rate variability. Structural changes include left ventricular wall thickening, valve calcification, and conduction system fibrosis. Functionally, maximum heart rate declines (220-age formula), stroke volume may decrease, and exercise capacity diminishes. These changes predispose to hypertension, heart failure, and arrhythmias, but are distinct from pathological processes.",
              keyPoints: [
                "Arterial stiffening increases systolic blood pressure", 
                "Cardiac reserve diminishes with age",
                "Maximum heart rate predictably declines",
                "Valve calcification common but not always pathological",
                "Age changes distinct from cardiovascular disease"
              ]
            },
            {
              title: "Pulmonary System",
              content: "Respiratory system aging involves decreased chest wall compliance, reduced respiratory muscle strength, and altered lung parenchyma. Vital capacity decreases while residual volume increases, leading to reduced total lung capacity. Gas exchange efficiency declines due to ventilation-perfusion mismatch and reduced alveolar surface area. Cough reflex and mucociliary clearance diminish, increasing infection risk. These changes result in reduced exercise tolerance and increased susceptibility to respiratory illness.",
              keyPoints: [
                "Chest wall becomes stiffer with age",
                "Vital capacity decreases while residual volume increases",
                "Gas exchange efficiency declines",
                "Protective mechanisms (cough, clearance) diminish",
                "Increased susceptibility to respiratory infections"
              ]
            },
            {
              title: "Renal System",
              content: "Kidney aging involves progressive nephron loss, reduced glomerular filtration rate, and decreased concentrating ability. GFR declines approximately 1 mL/min/1.73m²/year after age 30, though with significant individual variation. Structural changes include glomerulosclerosis, tubular atrophy, and vascular sclerosis. Functionally, the kidney's ability to conserve sodium, concentrate urine, and maintain acid-base balance diminishes. These changes have important implications for drug dosing and fluid management.",
              keyPoints: [
                "GFR declines predictably but varies individually",
                "Multiple structural changes occur with aging",
                "Concentrating ability progressively diminishes",
                "Drug dosing must account for reduced clearance",
                "Fluid and electrolyte regulation less efficient"
              ]
            }
          ]
        },
        {
          number: 15,
          title: "Cognitive Impairment and Dementia",
          sections: [
            {
              title: "Alzheimer's Disease Pathophysiology",
              content: "Alzheimer's disease (AD) is characterized by progressive accumulation of amyloid-β plaques and neurofibrillary tangles composed of hyperphosphorylated tau protein. The disease begins decades before clinical symptoms, with biomarker evidence of pathology appearing 15-20 years before cognitive decline. The amyloid cascade hypothesis suggests that Aβ accumulation triggers tau pathology, neuroinflammation, and ultimately neuronal death.",
              keyPoints: [
                "AD pathology precedes symptoms by decades",
                "Amyloid plaques and tau tangles are hallmarks",
                "Neuroinflammation contributes to progression",
                "Synaptic loss correlates with cognitive decline"
              ]
            },
            {
              title: "Clinical Stages and Diagnosis",
              content: "AD progression follows predictable stages: preclinical (biomarker positive, cognitively normal), mild cognitive impairment (MCI), and dementia stages. Current diagnostic criteria incorporate biomarkers (CSF, PET) alongside clinical assessment. The 2018 NIA-AA Research Framework defines AD biologically rather than syndromically, using AT(N) classification (Amyloid, Tau, Neurodegeneration).",
              keyPoints: [
                "Three main clinical stages identified",
                "Biomarkers increasingly important for diagnosis",
                "AT(N) framework provides biological definition",
                "Early detection enables intervention planning"
              ]
            },
            {
              title: "Non-Alzheimer Dementias",
              content: "Vascular dementia is the second most common cause of dementia, often co-occurring with AD. Lewy body dementia (DLB) presents with cognitive fluctuations, visual hallucinations, and parkinsonism. Frontotemporal dementia (FTD) affects younger patients (45-65) with behavioral or language variants. Each requires different diagnostic approaches and management strategies.",
              keyPoints: [
                "Mixed pathologies are common in elderly",
                "Clinical features help differentiate types",
                "Management strategies vary by dementia type",
                "Genetic testing indicated for early-onset cases"
              ]
            }
          ]
        },
        {
          number: 25,
          title: "Falls and Mobility Disorders",
          sections: [
            {
              title: "Epidemiology and Risk Factors",
              content: "Falls occur in 30% of community-dwelling adults over 65 annually, increasing to 50% in those over 80. Risk factors are multifactorial: intrinsic (balance, strength, cognition, medications) and extrinsic (environmental hazards). Previous falls are the strongest predictor of future falls. Hip fractures occur in 5% of falls but cause 90% of fall-related deaths.",
              keyPoints: [
                "Fall risk increases exponentially with age",
                "Multiple risk factors typically present",
                "Previous falls predict future falls",
                "Hip fractures have highest morbidity/mortality"
              ]
            },
            {
              title: "Comprehensive Fall Assessment",
              content: "Fall assessment should include detailed history, medication review, physical examination (vision, cognition, strength, balance), and gait assessment. The Timed Up and Go test (>14 seconds abnormal) is a validated screening tool. Get Up and Go test, Berg Balance Scale, and Tinetti Assessment provide more detailed evaluation. Home safety assessment by occupational therapy is valuable.",
              keyPoints: [
                "Systematic assessment identifies modifiable risks",
                "Gait and balance testing essential",
                "Medication review critical component",
                "Home assessment prevents environmental falls"
              ]
            },
            {
              title: "Evidence-Based Fall Prevention",
              content: "Multifactorial interventions reduce falls by 20-30% in community settings. Exercise programs (strength, balance, tai chi) are most effective single interventions. Medication modification, vitamin D supplementation (if deficient), cataract surgery, and home modifications all have evidence. Hip protectors reduce fracture risk but compliance is poor.",
              keyPoints: [
                "Multifactorial approaches most effective",
                "Exercise programs have strongest evidence",
                "Medication review reduces polypharmacy risks",
                "Individual risk factors guide interventions"
              ]
            }
          ]
        },
        {
          number: 30,
          title: "Polypharmacy and Prescribing in Elderly",
          sections: [
            {
              title: "Age-Related Pharmacokinetic Changes",
              content: "Aging affects all phases of pharmacokinetics. Absorption may be delayed due to decreased gastric acid and motility. Distribution changes due to increased body fat (affecting lipophilic drugs) and decreased total body water (affecting hydrophilic drugs). Hepatic metabolism declines due to reduced liver mass and blood flow. Renal clearance decreases with age-related GFR decline.",
              keyPoints: [
                "All pharmacokinetic processes affected by aging",
                "Start with lowest effective dose",
                "Adjust for renal function changes",
                "Monitor for drug accumulation"
              ]
            },
            {
              title: "Potentially Inappropriate Medications",
              content: "Beers Criteria identify medications that pose higher risks in elderly patients. High-risk categories include anticholinergics (cognitive impairment, falls), benzodiazepines (sedation, falls), proton pump inhibitors (C. diff, fractures), and NSAIDs (GI bleeding, kidney injury). STOPP/START criteria provide European perspective on inappropriate prescribing and prescribing omissions.",
              keyPoints: [
                "Beers Criteria guide medication selection",
                "Anticholinergics have cumulative effects",
                "Deprescribing as important as prescribing",
                "Regular medication review prevents problems"
              ]
            }
          ]
        },
        {
          number: 35,
          title: "Comprehensive Geriatric Assessment",
          sections: [
            {
              title: "Principles and Components of CGA",
              content: "Comprehensive Geriatric Assessment (CGA) is a multidisciplinary diagnostic and treatment process that identifies medical, functional, psychosocial, and environmental problems in older adults. Core domains include medical assessment, functional status (ADLs and IADLs), cognitive assessment, mood/psychological status, social support, nutritional status, and environmental safety. CGA should be systematic, interdisciplinary, and lead to actionable recommendations. Evidence shows CGA reduces mortality, improves functional outcomes, and decreases nursing home placement when properly implemented.",
              keyPoints: [
                "CGA is multidisciplinary and systematic",
                "Seven core domains must be assessed",
                "Must lead to actionable interventions",
                "Evidence shows improved outcomes when done properly",
                "Most effective in acute care and transitional settings"
              ]
            },
            {
              title: "Functional Assessment Tools",
              content: "Activities of Daily Living (ADLs) include bathing, dressing, toileting, transferring, continence, and feeding. Instrumental Activities of Daily Living (IADLs) include managing finances, medications, transportation, shopping, housework, food preparation, and telephone use. The Katz Index and Barthel Index assess ADLs, while the Lawton Scale measures IADLs. Performance-based measures like the Physical Performance Test provide objective functional assessment. Gait speed (<0.8 m/s indicates increased mortality risk) is a powerful predictor of outcomes.",
              keyPoints: [
                "ADLs represent basic self-care tasks",
                "IADLs represent complex independent living skills",
                "Standardized tools improve reliability",
                "Performance-based measures complement self-report",
                "Gait speed is powerful predictor of outcomes"
              ]
            },
            {
              title: "Cognitive and Mood Assessment",
              content: "Brief cognitive screening tools include Mini-Mental State Exam (MMSE), Montreal Cognitive Assessment (MoCA), and Mini-Cog. MMSE scores: 24-30 normal, 18-23 mild impairment, 0-17 severe impairment (adjust +1 for ≤12 years education). MoCA is more sensitive for mild cognitive impairment (normal ≥26). Depression screening uses Geriatric Depression Scale (GDS-15 or GDS-5) or PHQ-9. The combination of depression and cognitive impairment significantly worsens prognosis.",
              keyPoints: [
                "Multiple brief screening tools available",
                "MoCA more sensitive than MMSE for mild impairment",
                "Education level affects interpretation",
                "Depression common and treatable in elderly",
                "Combined cognitive-mood impairment particularly concerning"
              ]
            }
          ]
        },
        {
          number: 40,
          title: "Delirium: Prevention, Diagnosis, and Management",
          sections: [
            {
              title: "Pathophysiology and Risk Factors",
              content: "Delirium results from complex interactions between predisposing factors (age, cognitive impairment, functional impairment) and precipitating factors (medications, infection, dehydration, surgery). Neurotransmitter imbalances, particularly cholinergic deficiency and dopaminergic excess, contribute to symptoms. Neuroinflammation and blood-brain barrier dysfunction play key roles. The more predisposing factors present, the fewer precipitating factors needed to cause delirium.",
              keyPoints: [
                "Multifactorial syndrome with complex pathophysiology",
                "Predisposing + precipitating factors interact",
                "Cholinergic deficiency central to pathogenesis",
                "Neuroinflammation contributes to cognitive dysfunction",
                "Prevention more effective than treatment"
              ]
            },
            {
              title: "Diagnosis and Assessment Tools",
              content: "Delirium is characterized by acute onset (hours to days), fluctuating course, inattention, and either disorganized thinking or altered consciousness level. The Confusion Assessment Method (CAM) requires features 1+2 plus either 3 or 4. CAM-ICU and 4AT are validated tools for ICU and general settings. Richmond Agitation-Sedation Scale (RASS) assesses level of consciousness. Three motor subtypes: hyperactive (agitated), hypoactive (quiet), and mixed. Hypoactive delirium is most common but often missed.",
              keyPoints: [
                "CAM is gold standard diagnostic tool",
                "Four key features with specific algorithm",
                "Hypoactive subtype most common and missed",
                "Fluctuation is characteristic feature", 
                "Multiple validated assessment tools available"
              ]
            },
            {
              title: "Prevention and Management Strategies",
              content: "The Hospital Elder Life Program (HELP) prevents 40% of delirium cases through non-pharmacologic interventions: orientation protocols, early mobilization, sleep enhancement, hearing/vision aids, hydration, and cognitive stimulation. Management focuses on identifying and treating underlying causes, ensuring safety, and providing supportive care. Antipsychotics should be avoided except for severe agitation threatening safety. Benzodiazepines worsen delirium except in alcohol/sedative withdrawal.",
              keyPoints: [
                "HELP program prevents 40% of delirium cases",
                "Non-pharmacologic interventions most effective",
                "Identify and treat underlying causes",
                "Avoid antipsychotics unless severe agitation",
                "Benzodiazepines generally contraindicated"
              ]
            }
          ]
        },
        {
          number: 42,
          title: "Geriatric Pharmacology and Medication Management",
          sections: [
            {
              title: "Age-Related Pharmacokinetic and Pharmacodynamic Changes",
              content: "Aging affects all aspects of drug handling. Absorption may be delayed but usually complete. Distribution changes include decreased lean body mass and total body water (affecting hydrophilic drugs), increased body fat (affecting lipophilic drugs), and decreased albumin (affecting highly protein-bound drugs). First-pass metabolism decreases due to reduced liver mass and blood flow. Renal clearance declines predictably (~1 mL/min/1.73m²/year after age 30). Pharmacodynamic changes include increased sensitivity to CNS-active drugs and altered receptor sensitivity.",
              keyPoints: [
                "All pharmacokinetic phases affected by aging",
                "Decreased first-pass metabolism increases bioavailability",
                "Renal clearance declines predictably with age",
                "Increased CNS sensitivity to medications",
                "Start low, go slow principle applies"
              ]
            },
            {
              title: "Potentially Inappropriate Medications and Beers Criteria",
              content: "The 2019 American Geriatrics Society Beers Criteria identify medications that are potentially inappropriate for older adults. High-risk categories include: anticholinergics (increase fall and cognitive impairment risk), benzodiazepines (increase sedation and fall risk), Z-drugs (zolpidem), first-generation antihistamines, tricyclic antidepressants, and NSAIDs. The criteria also address drug-disease interactions and drug-drug interactions. STOPP/START criteria provide European perspective on inappropriate prescribing and prescribing omissions.",
              keyPoints: [
                "Beers Criteria updated regularly with evidence",
                "Anticholinergics have cumulative cognitive effects",
                "Benzodiazepines increase fall and fracture risk",
                "Consider alternatives to high-risk medications",
                "STOPP/START criteria address prescribing omissions"
              ]
            },
            {
              title: "Polypharmacy and Medication Reconciliation",
              content: "Polypharmacy (≥5 medications) affects 40% of community-dwelling elderly and increases risks of adverse drug events, drug interactions, non-adherence, and functional decline. Medication reconciliation should occur at every healthcare encounter. The ARMOR tool (Assess, Review, Minimize, Optimize, Reassess) provides systematic approach to medication management. Deprescribing involves systematic withdrawal of inappropriate medications with patient/family involvement.",
              keyPoints: [
                "Polypharmacy affects 40% of elderly patients",
                "Medication reconciliation critical at transitions",
                "ARMOR tool provides systematic approach",
                "Deprescribing as important as prescribing",
                "Patient/family education essential for safety"
              ]
            }
          ]
        },
        {
          number: 43,
          title: "Frailty Syndrome and Sarcopenia",
          sections: [
            {
              title: "Defining and Measuring Frailty",
              content: "Frailty is a clinical syndrome characterized by decreased reserve and resistance to stressors, resulting in increased vulnerability to adverse outcomes. Fried's phenotype model includes 5 components: unintentional weight loss, self-reported exhaustion, weakness (grip strength), slow walking speed, and low physical activity. ≥3 criteria = frail, 1-2 = pre-frail, 0 = robust. Alternative models include deficit accumulation (Rockwood) and clinical assessment tools (Clinical Frailty Scale). Prevalence increases with age (7% at 65-74, 20% at 85+).",
              keyPoints: [
                "Frailty is distinct from aging and disease",
                "Multiple validated measurement tools exist",
                "Prevalence increases exponentially with age",
                "Pre-frailty is potentially reversible",
                "Frailty predicts multiple adverse outcomes"
              ]
            },
            {
              title: "Sarcopenia and Age-Related Muscle Loss",
              content: "Sarcopenia is the loss of skeletal muscle mass and function with aging. Muscle mass decreases 3-8% per decade after age 30, accelerating after 60. Diagnostic criteria include low muscle mass (DXA, BIA, or CT), plus either low muscle strength (grip strength <27kg men, <16kg women) or low physical performance (gait speed <0.8 m/s). Primary sarcopenia is age-related; secondary sarcopenia has specific causes (disease, inactivity, malnutrition). Resistance exercise and protein supplementation can improve outcomes.",
              keyPoints: [
                "Muscle loss accelerates after age 60",
                "Requires both low mass and function for diagnosis",
                "Distinguished from frailty but often overlaps",
                "Resistance exercise most effective intervention",
                "Adequate protein intake (1.2-1.6 g/kg) important"
              ]
            },
            {
              title: "Clinical Implications and Management",
              content: "Frail elderly have increased risk of falls, hospitalization, institutionalization, and mortality. Frailty assessment should guide treatment decisions, with more conservative approaches for frail patients and aggressive preventive care for pre-frail patients. Comprehensive geriatric assessment combined with individualized interventions can improve outcomes. Exercise programs (particularly resistance training), nutritional interventions, medication optimization, and social support are key components.",
              keyPoints: [
                "Frailty guides clinical decision-making",
                "Pre-frailty is potentially reversible",
                "Multicomponent interventions most effective",
                "Exercise programs central to management",
                "Social support important for outcomes"
              ]
            }
          ]
        },
        {
          number: 45,
          title: "Geriatric Emergency Medicine",
          sections: [
            {
              title: "Atypical Presentations in Elderly",
              content: "Elderly patients often present with atypical symptoms for common conditions. Myocardial infarction may present without chest pain (silent MI) in 25% of elderly patients. Infections may present without fever, with altered mental status being the primary symptom. Appendicitis may lack classic signs, leading to delayed diagnosis and higher perforation rates. Pneumonia may present only with confusion or functional decline. The classic triad of fever, flank pain, and dysuria occurs in <10% of elderly UTI patients.",
              keyPoints: [
                "Atypical presentations are common in elderly",
                "High index of suspicion needed",
                "Altered mental status may be only sign of illness",
                "Delays in diagnosis increase morbidity",
                "Multiple conditions may present simultaneously"
              ]
            },
            {
              title: "Functional Assessment in ED",
              content: "Baseline functional status is crucial for disposition decisions. Patients with functional decline are at higher risk for adverse outcomes. Brief assessment tools include Activities of Daily Living (ADL), Instrumental ADL, and mobility assessment. Cognitive assessment using brief tools like Six-Item Screener helps identify those at risk for delirium. The Identification of Seniors at Risk (ISAR) tool predicts adverse outcomes. Functional decline in the ED often indicates serious underlying illness.",
              keyPoints: [
                "Functional status predicts outcomes",
                "Brief assessment tools available for ED use",
                "Cognitive impairment increases complications",
                "Baseline function guides disposition decisions",
                "New functional decline suggests serious illness"
              ]
            },
            {
              title: "Geriatric ED Management Principles",
              content: "Geriatric ED management requires special considerations: longer evaluation times, increased risk of delirium from environment, higher medication error risk, and complex discharge planning needs. The Geriatric Emergency Department Guidelines recommend specialized protocols, staff training, and environmental modifications. Key elements include medication reconciliation, delirium prevention, functional assessment, and interdisciplinary team approach.",
              keyPoints: [
                "Specialized protocols improve geriatric care",
                "Environmental modifications reduce delirium risk",
                "Medication reconciliation prevents errors",
                "Interdisciplinary approach essential",
                "Disposition planning more complex for elderly"
              ]
            }
          ]
        },
        {
          number: 50,
          title: "End-of-Life Care and Palliative Medicine",
          sections: [
            {
              title: "Principles of Palliative Care",
              content: "Palliative care focuses on improving quality of life for patients with serious illness and their families through prevention and relief of suffering. It can be provided alongside curative treatments and is not limited to end-of-life care. Core principles include symptom management, psychosocial support, spiritual care, and care coordination. Early palliative care improves quality of life, reduces hospitalizations, and may extend survival in some conditions.",
              keyPoints: [
                "Palliative care complements curative treatments",
                "Early intervention improves multiple outcomes",
                "Addresses physical, psychological, and spiritual needs",
                "Family-centered approach essential",
                "Specialized training required for complex cases"
              ]
            },
            {
              title: "Advance Care Planning and Goals of Care",
              content: "Advance care planning involves discussions about future medical care in the context of patient values and preferences. This includes advance directives (living wills, healthcare proxies), but more importantly involves ongoing conversations about goals of care. The Serious Illness Conversation Guide provides a structured approach. POLST (Physician Orders for Life-Sustaining Treatment) translates patient preferences into medical orders. These discussions should occur before crises and be revisited regularly.",
              keyPoints: [
                "More than just advance directive completion",
                "Ongoing conversations about values and goals",
                "POLST translates preferences to medical orders",
                "Should occur before acute illness",
                "Regular reassessment important as conditions change"
              ]
            },
            {
              title: "Symptom Management in Advanced Illness",
              content: "Common symptoms requiring management include pain, dyspnea, nausea/vomiting, constipation, delirium, and anxiety. Pain assessment in elderly may be complicated by cognitive impairment and communication difficulties. The WHO analgesic ladder provides systematic approach to pain management. Non-opioid interventions include adjuvant medications, interventional procedures, and complementary therapies. Dyspnea management includes opioids, bronchodilators, oxygen (if hypoxemic), and environmental modifications.",
              keyPoints: [
                "Comprehensive symptom assessment essential",
                "Pain assessment challenging in cognitive impairment",
                "Multimodal approach to symptom management",
                "Non-pharmacologic interventions important",
                "Regular reassessment and adjustment needed"
              ]
            }
          ]
        }
      ]
    }
  },

  // Internal Medicine Textbooks
  internalMedicine: {
    "harrisons-principles": {
      id: "harrisons-21st",
      title: "Harrison's Principles of Internal Medicine",
      authors: ["Dennis L. Kasper", "Anthony S. Fauci", "Stephen L. Hauser", "Dan L. Longo", "J. Larry Jameson", "Joseph Loscalzo"],
      edition: "21st Edition",
      publisher: "McGraw-Hill",
      isbn: "978-1259644030",
      year: 2022,
      category: "internal-medicine",
      tags: ["comprehensive", "evidence-based", "clinical", "internal-medicine"],
      description: "The most comprehensive, authoritative, and useful text on the principles and practice of internal medicine.",
      
      chapters: [
        {
          number: 45,
          title: "Dementia and Alzheimer's Disease",
          sections: [
            {
              title: "Alzheimer's Disease Pathophysiology",
              content: "AD is characterized by extracellular amyloid plaques (Aβ peptides) and intracellular neurofibrillary tangles (tau protein). Progressive neuronal loss begins in entorhinal cortex and hippocampus, spreading to association cortices. Clinical symptoms correlate with degree of synaptic loss. The amyloid cascade hypothesis proposes that Aβ accumulation triggers tau pathology, but recent therapeutic failures have questioned this model.",
              keyPoints: [
                "Amyloid hypothesis vs tau hypothesis debate continues",
                "Synaptic loss correlates with symptoms better than plaques",
                "Gradual progression over 8-10 years typical",
                "Early involvement of memory circuits causes initial symptoms"
              ]
            },
            {
              title: "Diagnosis and Assessment",
              content: "Clinical diagnosis based on cognitive testing (MoCA, MMSE), functional assessment, and biomarkers. CSF Aβ42/tau ratio and amyloid PET imaging can support diagnosis. Rule out reversible causes including B12 deficiency, thyroid disease, and depression. New 2018 NIA-AA guidelines emphasize biomarker-based diagnosis.",
              keyPoints: [
                "Clinical criteria remain gold standard for practice",
                "Biomarkers support but don't replace clinical judgment",
                "Always screen for reversible causes first",
                "Neuroimaging to rule out other pathology essential"
              ]
            },
            {
              title: "Treatment and Management",
              content: "Cholinesterase inhibitors (donepezil, rivastigmine, galantamine) provide modest symptomatic benefit in mild-moderate AD. Memantine (NMDA antagonist) may help in moderate-severe stages. Aducanumab approved by FDA in 2021 remains controversial. Non-pharmacologic interventions include cognitive stimulation, exercise, sleep hygiene, and social engagement.",
              keyPoints: [
                "Cholinesterase inhibitors first-line for mild-moderate AD",
                "Memantine for moderate-severe disease",
                "Disease-modifying therapies remain elusive",
                "Non-pharmacologic approaches important"
              ]
            }
          ]
        },
        {
          number: 51,
          title: "Stroke and Cerebrovascular Disease",
          sections: [
            {
              title: "Acute Ischemic Stroke in Elderly",
              content: "Stroke incidence doubles each decade after age 55. Elderly patients often present with atypical symptoms and have higher rates of complications. Age alone should not exclude from acute therapies like thrombolysis or thrombectomy if functionally independent. However, bleeding risk increases with age, requiring careful risk-benefit analysis.",
              keyPoints: [
                "Age increases stroke risk exponentially",
                "Atypical presentations more common in elderly",
                "Functional status more important than chronological age",
                "Bleeding risks must be weighed against benefits"
              ]
            },
            {
              title: "Secondary Prevention in Elderly",
              content: "Antiplatelet therapy (aspirin, clopidogrel) reduces recurrent stroke risk by 20%. Statins benefit elderly stroke patients despite limited life expectancy. Blood pressure control essential but avoid precipitous drops. Atrial fibrillation screening important as prevalence increases with age. DOACs preferred over warfarin in elderly due to lower bleeding risk.",
              keyPoints: [
                "Antiplatelet therapy reduces recurrent stroke",
                "Statins benefit even elderly patients",
                "Gradual BP control prevents watershed infarcts",
                "DOACs safer than warfarin in elderly"
              ]
            }
          ]
        },
        {
          number: 67,
          title: "Heart Failure",
          sections: [
            {
              title: "Heart Failure in the Elderly",
              content: "HF prevalence increases dramatically with age, affecting 10% of those over 80. Heart failure with preserved ejection fraction (HFpEF) is more common in elderly, particularly elderly women with hypertension. Diastolic dysfunction results from age-related myocardial stiffening and fibrosis. Treatment differs from HFrEF with focus on volume management and comorbidity treatment.",
              keyPoints: [
                "HF prevalence reaches 10% in octogenarians",
                "HFpEF predominates in elderly patients",
                "Diastolic dysfunction from myocardial stiffening",
                "Different therapeutic approach than HFrEF"
              ]
            },
            {
              title: "Pharmacotherapy Considerations",
              content: "ACE inhibitors/ARBs reduce mortality in HFrEF regardless of age but require careful monitoring for hyperkalemia and renal dysfunction. Beta-blockers benefit elderly but start at low doses due to chronotropic incompetence. Diuretics require careful monitoring to avoid dehydration and electrolyte abnormalities. Avoid digoxin in elderly due to narrow therapeutic window.",
              keyPoints: [
                "ACE inhibitors effective but need monitoring",
                "Beta-blockers require low starting doses",
                "Diuretics need careful fluid balance monitoring",
                "Avoid digoxin due to toxicity risk"
              ]
            }
          ]
        },
        {
          number: 89,
          title: "Hypertension",
          sections: [
            {
              title: "Hypertension in Older Adults",
              content: "Isolated systolic hypertension is most common form in elderly, resulting from arterial stiffening. SPRINT trial showed intensive BP control (<120 mmHg systolic) reduces CV events in patients >75 but increases hypotension and AKI. Target BP should be individualized based on frailty, comorbidities, and functional status. Orthostatic hypotension is common complication.",
              keyPoints: [
                "Isolated systolic HTN predominates in elderly",
                "Intensive BP control benefits but increases risks",
                "Individualize targets based on frailty status",
                "Monitor for orthostatic hypotension"
              ]
            },
            {
              title: "Antihypertensive Selection in Elderly",
              content: "ACE inhibitors or ARBs are first-line in elderly with diabetes or proteinuria. Thiazide diuretics effective for isolated systolic hypertension. Calcium channel blockers useful for elderly with ISH. Avoid immediate-release nifedipine. Beta-blockers less effective as monotherapy in elderly but useful with coronary disease.",
              keyPoints: [
                "ACE inhibitors/ARBs first-line with comorbidities",
                "Thiazides effective for isolated systolic HTN",
                "Long-acting CCBs safe and effective",
                "Beta-blockers best reserved for specific indications"
              ]
            }
          ]
        },
        {
          number: 145,
          title: "Diabetes Mellitus in the Elderly",
          sections: [
            {
              title: "Age-Related Changes in Glucose Metabolism",
              content: "Insulin sensitivity decreases with age due to increased visceral adiposity, decreased muscle mass, and cellular insulin resistance. Beta-cell function also declines. Fasting glucose increases ~1 mg/dL per decade and postprandial glucose ~5-10 mg/dL per decade. These changes increase diabetes risk but are not inevitable with healthy aging.",
              keyPoints: [
                "Insulin sensitivity decreases with normal aging",
                "Beta-cell function declines over time",
                "Glucose tolerance worsens progressively",
                "Changes not inevitable with healthy lifestyle"
              ]
            },
            {
              title: "Glycemic Targets in Elderly",
              content: "Glycemic targets should be individualized based on life expectancy, comorbidities, and hypoglycemia risk. ADA recommends HbA1c <7.5% for healthy elderly, <8% for those with comorbidities, and <8.5% for frail elderly. Avoid overly intensive control due to hypoglycemia risks, especially with limited life expectancy.",
              keyPoints: [
                "Individualize targets based on health status",
                "Less stringent targets for frail elderly",
                "Hypoglycemia risk outweighs benefits in some",
                "Consider life expectancy in goal setting"
              ]
            }
          ]
        },
        {
          number: 178,
          title: "Pneumonia and Lower Respiratory Infections",
          sections: [
            {
              title: "Community-Acquired Pneumonia in Elderly",
              content: "Pneumonia is leading cause of infection-related death in elderly. Atypical presentations are common - fever may be absent, altered mental status may be primary symptom. Streptococcus pneumoniae remains most common pathogen. Vaccination rates remain suboptimal despite recommendations for PCV13 and PPSV23 in elderly.",
              keyPoints: [
                "Leading infectious cause of death in elderly",
                "Atypical presentations delay diagnosis",
                "S. pneumoniae most common pathogen",
                "Prevention through vaccination underutilized"
              ]
            },
            {
              title: "Healthcare-Associated Pneumonia",
              content: "Elderly patients from nursing homes or with frequent healthcare contact have higher rates of resistant organisms including MRSA and Pseudomonas. Empiric therapy should cover these pathogens. Aspiration pneumonia is common in elderly with dysphagia from stroke or dementia. Prevention includes speech therapy evaluation and aspiration precautions.",
              keyPoints: [
                "Resistant organisms more common in healthcare-associated cases",
                "Empiric therapy should be broader",
                "Aspiration risk increases with age and comorbidities",
                "Prevention strategies important"
              ]
            }
          ]
        },
        {
          number: 423,
          title: "Geriatric Medicine Principles",
          sections: [
            {
              title: "Comprehensive Geriatric Assessment",
              content: "CGA is systematic evaluation of elderly patients' medical, psychosocial, and functional capabilities and problems. Components include cognition assessment (MMSE, MoCA), mood screening (GDS), functional status (ADL/IADL), social support evaluation, environmental assessment, and comprehensive medication review. Meta-analyses show CGA improves survival and reduces institutionalization.",
              keyPoints: [
                "Systematic multidisciplinary evaluation",
                "Addresses medical, psychosocial, and functional domains",
                "Proven to improve outcomes",
                "Should guide management decisions"
              ]
            },
            {
              title: "Frailty Syndrome",
              content: "Frailty is distinct clinical syndrome of decreased physiologic reserve and increased vulnerability to stressors. Fried phenotype includes unintentional weight loss, exhaustion, low grip strength, slow walking speed, and low physical activity. Frailty predicts falls, hospitalization, disability, and death. Interventions include exercise, nutrition optimization, and medication review.",
              keyPoints: [
                "Distinct syndrome beyond normal aging",
                "Five key phenotypic criteria identified",
                "Strong predictor of adverse outcomes",
                "Potentially reversible with interventions"
              ]
            }
          ]
        }
      ]
    }
  },

  // Pharmacology and Drug References
  pharmacology: {
    "geriatric-pharmacology": {
      id: "geriatric-pharm-guide",
      title: "Geriatric Pharmacology and Polypharmacy Management",
      authors: ["Todd Semla", "Catherine MacLean", "Donna Fick"],
      category: "pharmacology",
      
      chapters: [
        {
          number: 1,
          title: "Age-Related Pharmacokinetic Changes",
          sections: [
            {
              title: "Absorption, Distribution, Metabolism, Excretion",
              content: "Aging affects all aspects of pharmacokinetics. Decreased gastric acid and delayed gastric emptying may affect absorption. Increased body fat and decreased total body water alter distribution of lipophilic vs hydrophilic drugs. Reduced hepatic mass and blood flow decrease metabolism. Declining renal function reduces drug clearance.",
              keyPoints: [
                "Start low, go slow principle",
                "Adjust for renal function decline",
                "Consider drug-drug interactions",
                "Monitor for adverse effects closely"
              ]
            },
            {
              title: "Beers Criteria and Inappropriate Prescribing",
              content: "Beers Criteria identify potentially inappropriate medications in older adults. High-risk medications include anticholinergics, benzodiazepines, antipsychotics, and proton pump inhibitors. STOPP/START criteria provide European perspective on inappropriate prescribing and omissions.",
              keyPoints: [
                "Regular medication review essential",
                "Anticholinergic burden assessment",
                "Deprescribing when appropriate",
                "Consider non-pharmacologic alternatives"
              ]
            }
          ]
        }
      ]
    }
  },

  // Emergency Medicine
  emergencyMedicine: {
    "geriatric-emergency-medicine": {
      id: "geriatric-em",
      title: "Geriatric Emergency Medicine",
      authors: ["Catherine Marco", "Stephanie Munz", "Michael Stern"],
      category: "emergency-medicine",
      
      chapters: [
        {
          number: 1,
          title: "Approach to the Geriatric Patient in ED",
          sections: [
            {
              title: "Triage and Assessment Considerations",
              content: "Elderly patients may present atypically with serious conditions. Silent MI, afebrile sepsis, and painless abdominal catastrophes are common. Baseline functional status and cognitive assessment are crucial for disposition decisions.",
              keyPoints: [
                "Atypical presentations common",
                "Baseline functional status crucial",
                "Higher risk for adverse outcomes",
                "Consider elder abuse screening"
              ]
            }
          ]
        }
      ]
    }
  },

  // Clinical Guidelines and Evidence
  guidelines: {
    "age-clinical-guidelines": {
      id: "age-guidelines-2024",
      title: "American Geriatrics Society Clinical Practice Guidelines",
      publisher: "American Geriatrics Society",
      year: 2024,
      category: "guidelines",
      
      guidelines: [
        {
          title: "Management of Persistent Pain in Older Adults",
          summary: "Comprehensive approach to pain management emphasizing non-pharmacologic interventions, careful opioid prescribing, and functional goals.",
          keyRecommendations: [
            "Multimodal pain management approach",
            "Non-pharmacologic interventions first-line",
            "Careful risk-benefit analysis for opioids",
            "Regular reassessment of pain and function"
          ]
        },
        {
          title: "Prevention of Falls in Community-Dwelling Older Adults",
          summary: "Evidence-based recommendations for fall prevention including exercise programs, medication review, and environmental modifications.",
          keyRecommendations: [
            "Multifactorial risk assessment",
            "Exercise programs (balance, strength, tai chi)",
            "Medication review and modification",
            "Home safety evaluation"
          ]
        }
      ]
    }
  }
};

// Textbook search and retrieval system
export class TextbookManager {
  constructor() {
    this.textbooks = medicalTextbooks;
    this.searchIndex = this.buildSearchIndex();
  }

  buildSearchIndex() {
    const index = new Map();
    
    Object.values(this.textbooks).forEach(category => {
      Object.values(category).forEach(book => {
        // Index book metadata
        const terms = [
          book.title,
          ...(book.authors || []),
          book.category,
          ...(book.tags || []),
          book.description
        ].filter(Boolean);

        // Index chapter content
        if (book.chapters) {
          book.chapters.forEach(chapter => {
            terms.push(chapter.title);
            if (chapter.sections) {
              chapter.sections.forEach(section => {
                terms.push(section.title, section.content);
                if (section.keyPoints) {
                  terms.push(...section.keyPoints);
                }
              });
            }
          });
        }

        // Index guidelines
        if (book.guidelines) {
          book.guidelines.forEach(guideline => {
            terms.push(guideline.title, guideline.summary);
            if (guideline.keyRecommendations) {
              terms.push(...guideline.keyRecommendations);
            }
          });
        }

        terms.forEach(term => {
          const words = term.toLowerCase().split(/\s+/);
          words.forEach(word => {
            if (!index.has(word)) {
              index.set(word, new Set());
            }
            index.get(word).add(book.id);
          });
        });
      });
    });
    
    return index;
  }

  searchTextbooks(query, options = {}) {
    const {
      category = null,
      maxResults = 10,
      includeContent = true
    } = options;

    const searchTerms = query.toLowerCase().split(/\s+/);
    const bookScores = new Map();

    // Calculate relevance scores
    searchTerms.forEach(term => {
      if (this.searchIndex.has(term)) {
        this.searchIndex.get(term).forEach(bookId => {
          bookScores.set(bookId, (bookScores.get(bookId) || 0) + 1);
        });
      }
    });

    // Get matching books
    let results = [];
    Object.values(this.textbooks).forEach(categoryBooks => {
      Object.values(categoryBooks).forEach(book => {
        if (bookScores.has(book.id)) {
          if (!category || book.category === category) {
            results.push({
              ...book,
              relevanceScore: bookScores.get(book.id),
              matchingContent: includeContent ? this.getMatchingContent(book, searchTerms) : null
            });
          }
        }
      });
    });

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxResults);
  }

  getMatchingContent(book, searchTerms) {
    const matchingContent = [];

    if (book.chapters) {
      book.chapters.forEach(chapter => {
        if (chapter.sections) {
          chapter.sections.forEach(section => {
            const sectionText = `${section.title} ${section.content}`.toLowerCase();
            if (searchTerms.some(term => sectionText.includes(term))) {
              matchingContent.push({
                type: 'chapter',
                chapterTitle: chapter.title,
                sectionTitle: section.title,
                content: section.content.substring(0, 200) + '...',
                keyPoints: section.keyPoints || []
              });
            }
          });
        }
      });
    }

    return matchingContent.slice(0, 3); // Limit to top 3 matches
  }

  getBookById(bookId) {
    for (const category of Object.values(this.textbooks)) {
      for (const book of Object.values(category)) {
        if (book.id === bookId) {
          return book;
        }
      }
    }
    return null;
  }

  getBooksByCategory(category) {
    return Object.values(this.textbooks[category] || {});
  }

  getAllCategories() {
    return Object.keys(this.textbooks);
  }

  getRecentlyAdded(limit = 5) {
    const allBooks = [];
    Object.values(this.textbooks).forEach(category => {
      Object.values(category).forEach(book => allBooks.push(book));
    });
    
    return allBooks
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, limit);
  }

  // Quick reference lookup
  quickLookup(topic) {
    const commonTopics = {
      'delirium': {
        books: ['essentials-geriatric-med'],
        quickFacts: [
          'Affects 20-40% of hospitalized elderly',
          'Hypoactive type often missed',
          'Prevention more effective than treatment',
          'Check medications, infections, metabolic causes'
        ]
      },
      'falls': {
        books: ['essentials-geriatric-med', 'age-guidelines-2024'],
        quickFacts: [
          'One-third of adults >65 fall annually',
          'Multifactorial causes require comprehensive assessment',
          'Exercise programs most effective intervention',
          'Home safety modifications important'
        ]
      },
      'polypharmacy': {
        books: ['geriatric-pharm-guide'],
        quickFacts: [
          'Review medications regularly using Beers Criteria',
          'Start low, go slow with new medications',
          'Consider drug-drug interactions',
          'Assess anticholinergic burden'
        ]
      }
    };

    return commonTopics[topic.toLowerCase()] || null;
  }
}

export default medicalTextbooks;