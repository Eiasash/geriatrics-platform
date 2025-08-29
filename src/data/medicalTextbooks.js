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
      description: "The definitive textbook of geriatric medicine, covering all aspects of aging and age-related diseases with evidence-based approaches.",
      
      chapters: [
        {
          number: 1,
          title: "Demography and Epidemiology of Aging",
          sections: [
            {
              title: "Population Aging Trends",
              content: "The world's population is aging at an unprecedented rate. By 2050, the number of people aged 60+ will increase from 841 million to more than 2 billion globally. The fastest growing segment is those 85+, the 'oldest old.' This demographic transition has profound implications for healthcare systems, particularly in developed countries where 20-25% of the population will be over 65.",
              keyPoints: [
                "Population aging is accelerating globally",
                "The 85+ age group is fastest growing",
                "Healthcare demand will increase exponentially", 
                "Chronic disease prevalence rises with age"
              ]
            },
            {
              title: "Compression of Morbidity Hypothesis",
              content: "James Fries proposed that the onset of chronic illness could be delayed more than life expectancy is extended, compressing the period of morbidity into a shorter time before death. Evidence suggests that healthy life expectancy has indeed increased, with disability rates declining in many countries. However, the absolute number of disabled elderly continues to rise due to population growth.",
              keyPoints: [
                "Healthy life expectancy can be extended",
                "Disability rates have declined per capita",
                "Prevention strategies are cost-effective",
                "Quality of life improvements are achievable"
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
          number: 45,
          title: "Geriatric Emergency Medicine",
          sections: [
            {
              title: "Atypical Presentations in Elderly",
              content: "Elderly patients often present with atypical symptoms for common conditions. Myocardial infarction may present without chest pain (silent MI) in 25% of elderly patients. Infections may present without fever, with altered mental status being the primary symptom. Appendicitis may lack classic signs, leading to delayed diagnosis and higher perforation rates.",
              keyPoints: [
                "Atypical presentations are common in elderly",
                "High index of suspicion needed",
                "Altered mental status may be only sign of illness",
                "Delays in diagnosis increase morbidity"
              ]
            },
            {
              title: "Functional Assessment in ED",
              content: "Baseline functional status is crucial for disposition decisions. Patients with functional decline are at higher risk for adverse outcomes. Brief assessment tools include Activities of Daily Living (ADL), Instrumental ADL, and mobility assessment. Cognitive assessment using brief tools like Six-Item Screener helps identify those at risk for delirium.",
              keyPoints: [
                "Functional status predicts outcomes",
                "Brief assessment tools available for ED use",
                "Cognitive impairment increases complications",
                "Baseline function guides disposition decisions"
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