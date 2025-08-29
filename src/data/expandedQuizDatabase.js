// Expanded Quiz Database - 150+ Questions for Fellowship Training
export const expandedQuizDatabase = {
    delirium: [
        // Basic Questions (1-5)
        { id: 'del_001', q: "What is the CAM criteria for delirium diagnosis?", a: "1) Acute onset and fluctuating course, 2) Inattention, 3) Disorganized thinking, 4) Altered consciousness. Need 1+2 and either 3 or 4.", difficulty: 'basic', references: ['DSM-5', 'AGS Guidelines'] },
        { id: 'del_002', q: "First-line treatment for delirium?", a: "Non-pharmacologic interventions: reorientation, sleep hygiene, early mobilization, sensory aids", difficulty: 'basic', references: ['Cochrane Review 2020'] },
        { id: 'del_003', q: "Most common cause of delirium in elderly?", a: "Infection (particularly UTI), followed by medications, metabolic disturbances", difficulty: 'basic', references: ['JAGS 2019'] },
        { id: 'del_004', q: "What is sundowning?", a: "Worsening confusion and agitation in late afternoon/evening in dementia patients", difficulty: 'basic', references: ['Alzheimer\'s Association'] },
        { id: 'del_005', q: "Difference between delirium and dementia?", a: "Delirium: acute onset, fluctuating, reversible. Dementia: gradual onset, progressive, irreversible", difficulty: 'basic', references: ['NEJM 2017'] },

        // Intermediate Questions (6-10)
        { id: 'del_006', q: "Which medications have highest risk for delirium?", a: "Benzodiazepines, anticholinergics, opioids, corticosteroids", difficulty: 'intermediate', references: ['Beers Criteria 2023'] },
        { id: 'del_007', q: "What is the HELP protocol?", a: "Hospital Elder Life Program: multicomponent intervention to prevent delirium", difficulty: 'intermediate', references: ['NEJM 1999'] },
        { id: 'del_008', q: "Mortality rate of delirium in hospitalized elderly?", a: "22-76% depending on setting and severity", difficulty: 'intermediate', references: ['BMJ 2010'] },
        { id: 'del_009', q: "What is subsyndromal delirium?", a: "Presence of some delirium symptoms without meeting full diagnostic criteria", difficulty: 'intermediate', references: ['Critical Care Med 2013'] },
        { id: 'del_010', q: "Role of melatonin in delirium prevention?", a: "May reduce incidence when given prophylactically (0.5-5mg at night)", difficulty: 'intermediate', references: ['JAGS 2020'] },

        // Advanced Questions (11-15)
        { id: 'del_011', q: "85yo with hip fracture post-op day 2, pulling at lines. Management?", a: "Assess for delirium triggers (pain, infection, medications), implement HELP protocol", difficulty: 'advanced', references: ['Anesthesiology 2019'] },
        { id: 'del_012', q: "When to use antipsychotics in delirium?", a: "Only for severe agitation posing safety risk, lowest dose shortest duration", difficulty: 'advanced', references: ['APA Guidelines 2020'] },
        { id: 'del_013', q: "Preferred antipsychotic for delirium?", a: "Haloperidol 0.25-0.5mg or quetiapine 12.5-25mg", difficulty: 'advanced', references: ['ICU Delirium Guidelines'] },
        { id: 'del_014', q: "What is the CAM-ICU?", a: "Confusion Assessment Method for ICU - tool for detecting delirium in ventilated patients", difficulty: 'advanced', references: ['JAMA 2001'] },
        { id: 'del_015', q: "Prevention strategies for post-op delirium?", a: "Avoid benzos, minimize opioids, early mobilization, maintain sleep-wake cycle", difficulty: 'advanced', references: ['Anesthesia & Analgesia 2020'] }
    ],

    dementia: [
        // Basic Questions (1-5)
        { id: 'dem_001', q: "MMSE score indicating dementia?", a: "Score <24/30 suggests cognitive impairment (adjust for education)", difficulty: 'basic', references: ['J Psychiatr Res 1975'] },
        { id: 'dem_002', q: "MoCA vs MMSE?", a: "MoCA more sensitive for mild cognitive impairment, includes executive function", difficulty: 'basic', references: ['JAGS 2005'] },
        { id: 'dem_003', q: "Most common type of dementia?", a: "Alzheimer's disease (60-70%), followed by vascular dementia (20%)", difficulty: 'basic', references: ['Lancet 2020'] },
        { id: 'dem_004', q: "What is Lewy body dementia triad?", a: "Fluctuating cognition, visual hallucinations, parkinsonism", difficulty: 'basic', references: ['Neurology 2005'] },
        { id: 'dem_005', q: "Frontotemporal dementia features?", a: "Personality changes, disinhibition, language problems, younger onset (45-65)", difficulty: 'basic', references: ['Brain 2011'] },

        // Intermediate Questions (6-10)
        { id: 'dem_006', q: "Cholinesterase inhibitors for Alzheimer's?", a: "Donepezil, rivastigmine, galantamine - for mild to moderate disease", difficulty: 'intermediate', references: ['Cochrane 2018'] },
        { id: 'dem_007', q: "When to add memantine?", a: "Moderate to severe Alzheimer's (MMSE <15), can combine with ChEI", difficulty: 'intermediate', references: ['NEJM 2003'] },
        { id: 'dem_008', q: "Donepezil dosing?", a: "Start 5mg daily, increase to 10mg after 4-6 weeks", difficulty: 'intermediate', references: ['FDA Label'] },
        { id: 'dem_009', q: "Side effects of cholinesterase inhibitors?", a: "GI upset, bradycardia, syncope, vivid dreams", difficulty: 'intermediate', references: ['Drug Safety 2019'] },
        { id: 'dem_010', q: "Treatment for behavioral symptoms?", a: "Non-pharm first, then SSRI, avoid antipsychotics if possible", difficulty: 'intermediate', references: ['JAMA 2018'] },

        // Advanced Questions (11-15)
        { id: 'dem_011', q: "What is BPSD?", a: "Behavioral and Psychological Symptoms of Dementia", difficulty: 'advanced', references: ['Int Psychogeriatr 1996'] },
        { id: 'dem_012', q: "Driving assessment in dementia?", a: "On-road evaluation, consider CDR score, visuospatial deficits", difficulty: 'advanced', references: ['Neurology 2010'] },
        { id: 'dem_013', q: "What is the CDR scale?", a: "Clinical Dementia Rating - stages dementia severity (0-3)", difficulty: 'advanced', references: ['Br J Psychiatry 1982'] },
        { id: 'dem_014', q: "Advance directive timing?", a: "Early in disease when patient still has capacity", difficulty: 'advanced', references: ['JAGS Ethics 2018'] },
        { id: 'dem_015', q: "Wandering prevention?", a: "Door alarms, GPS devices, identification bracelet, structured routine", difficulty: 'advanced', references: ['Am J Alzheimers Dis 2012'] }
    ],

    falls: [
        // Basic Questions (1-5)
        { id: 'fall_001', q: "Timed Up and Go test cutoff?", a: ">12 seconds indicates increased fall risk", difficulty: 'basic', references: ['JAGS 1991'] },
        { id: 'fall_002', q: "Components of fall assessment?", a: "History, medications, gait/balance, vision, orthostatics, home safety", difficulty: 'basic', references: ['AGS Falls Guidelines'] },
        { id: 'fall_003', q: "Definition of orthostatic hypotension?", a: "Drop in SBP ≥20 or DBP ≥10 within 3 minutes of standing", difficulty: 'basic', references: ['Circulation 2011'] },
        { id: 'fall_004', q: "What is the Tinetti test?", a: "Performance-oriented mobility assessment for balance and gait", difficulty: 'basic', references: ['JAGS 1986'] },
        { id: 'fall_005', q: "30-second chair stand test?", a: "Lower extremity strength test, <10 rises indicates weakness", difficulty: 'basic', references: ['J Gerontol 1999'] },

        // Intermediate Questions (6-10)
        { id: 'fall_006', q: "Strongest predictor of future falls?", a: "History of previous falls", difficulty: 'intermediate', references: ['NEJM 1988'] },
        { id: 'fall_007', q: "Medications increasing fall risk?", a: "Benzodiazepines, antipsychotics, antidepressants, antihypertensives", difficulty: 'intermediate', references: ['BMJ 2018'] },
        { id: 'fall_008', q: "Vision problems causing falls?", a: "Cataracts, macular degeneration, glaucoma, multifocal lenses", difficulty: 'intermediate', references: ['Ophthalmology 2010'] },
        { id: 'fall_009', q: "Vitamin D for fall prevention?", a: "800-1000 IU daily reduces falls by 19%", difficulty: 'intermediate', references: ['NEJM 2016'] },
        { id: 'fall_010', q: "What is the STEADI initiative?", a: "CDC's Stopping Elderly Accidents, Deaths & Injuries program", difficulty: 'intermediate', references: ['CDC 2017'] },

        // Advanced Questions (11-15)
        { id: 'fall_011', q: "Most effective fall prevention?", a: "Multifactorial intervention: exercise, medication review, vision, home safety", difficulty: 'advanced', references: ['Cochrane 2012'] },
        { id: 'fall_012', q: "Best exercise for fall prevention?", a: "Tai Chi - improves balance and reduces falls by 29%", difficulty: 'advanced', references: ['JAGS 2004'] },
        { id: 'fall_013', q: "Home modifications for falls?", a: "Remove rugs, grab bars, adequate lighting, raised toilet seat", difficulty: 'advanced', references: ['Am J Prev Med 2005'] },
        { id: 'fall_014', q: "Hip protectors effectiveness?", a: "Reduce hip fractures in nursing homes but poor compliance", difficulty: 'advanced', references: ['Cochrane 2014'] },
        { id: 'fall_015', q: "When to consider PT referral?", a: "TUG >12 sec, history of falls, gait/balance problems", difficulty: 'advanced', references: ['Phys Ther 2016'] }
    ],

    medications: [
        // Basic Questions (1-5)
        { id: 'med_001', q: "Definition of polypharmacy?", a: "≥5 medications (major polypharmacy ≥10)", difficulty: 'basic', references: ['Eur J Clin Pharmacol 2014'] },
        { id: 'med_002', q: "Prevalence of polypharmacy in elderly?", a: "40% community-dwelling, 90% in nursing homes", difficulty: 'basic', references: ['JAGS 2017'] },
        { id: 'med_003', q: "What is prescribing cascade?", a: "New drug prescribed to treat side effect of another drug", difficulty: 'basic', references: ['Arch Intern Med 1997'] },
        { id: 'med_004', q: "Deprescribing process?", a: "Review, reconcile, assess risk/benefit, prioritize, monitor", difficulty: 'basic', references: ['JAMA Intern Med 2015'] },
        { id: 'med_005', q: "What are PIMs?", a: "Potentially Inappropriate Medications", difficulty: 'basic', references: ['Beers Criteria'] },

        // Intermediate Questions (6-10)
        { id: 'med_006', q: "Most common Beers Criteria medications?", a: "Benzodiazepines, anticholinergics, NSAIDs, PPIs >8 weeks", difficulty: 'intermediate', references: ['Beers Criteria 2023'] },
        { id: 'med_007', q: "Why avoid benzos in elderly?", a: "Increased falls, cognitive impairment, dependence", difficulty: 'intermediate', references: ['BMJ 2012'] },
        { id: 'med_008', q: "First-generation antihistamines to avoid?", a: "Diphenhydramine, hydroxyzine - high anticholinergic burden", difficulty: 'intermediate', references: ['Drugs Aging 2015'] },
        { id: 'med_009', q: "NSAID risks in elderly?", a: "GI bleeding, renal failure, hypertension, heart failure", difficulty: 'intermediate', references: ['Lancet 2013'] },
        { id: 'med_010', q: "Muscle relaxants in elderly?", a: "Avoid - sedation, anticholinergic effects, limited efficacy", difficulty: 'intermediate', references: ['Beers Criteria'] },

        // Advanced Questions (11-15)
        { id: 'med_011', q: "What is STOPP/START?", a: "Screening Tool of Older Persons' Prescriptions/Screening Tool to Alert to Right Treatment", difficulty: 'advanced', references: ['Int J Clin Pharm 2015'] },
        { id: 'med_012', q: "Common STOPP criteria?", a: "Duplicate drugs, drugs beyond recommended duration, drug-disease interactions", difficulty: 'advanced', references: ['Drugs Aging 2018'] },
        { id: 'med_013', q: "Common START criteria?", a: "Statins in diabetes, ACE-I in heart failure, vitamin D in falls", difficulty: 'advanced', references: ['Expert Rev Clin Pharmacol 2016'] },
        { id: 'med_014', q: "PPI indication duration?", a: "8 weeks for most indications, longer only for specific conditions", difficulty: 'advanced', references: ['Gastroenterology 2017'] },
        { id: 'med_015', q: "When to stop statins?", a: "Consider in limited life expectancy (<1 year), severe frailty", difficulty: 'advanced', references: ['JAGS 2019'] }
    ],

    cardiovascular: [
        // Basic Questions (1-5)
        { id: 'cv_001', q: "CHA₂DS₂-VASc score components?", a: "CHF, HTN, Age≥75 (2pts), DM, Stroke (2pts), Vascular disease, Age 65-74, Sex (female)", difficulty: 'basic', references: ['Chest 2010'] },
        { id: 'cv_002', q: "When to anticoagulate in AFib?", a: "CHA₂DS₂-VASc ≥2 in men, ≥3 in women", difficulty: 'basic', references: ['ESC Guidelines 2020'] },
        { id: 'cv_003', q: "HAS-BLED score components?", a: "HTN, Abnormal renal/liver, Stroke, Bleeding, Labile INR, Elderly >65, Drugs/alcohol", difficulty: 'basic', references: ['Chest 2010'] },
        { id: 'cv_004', q: "DOAC vs warfarin in elderly?", a: "DOACs preferred - less intracranial bleeding, no monitoring", difficulty: 'basic', references: ['NEJM 2013'] },
        { id: 'cv_005', q: "Apixaban dosing in elderly?", a: "5mg BID, reduce to 2.5mg if ≥2 of: age≥80, weight≤60kg, Cr≥1.5", difficulty: 'basic', references: ['FDA Label'] },

        // Intermediate Questions (6-10)
        { id: 'cv_006', q: "BNP cutoff for heart failure?", a: ">100 pg/mL suggestive, >400 pg/mL likely", difficulty: 'intermediate', references: ['NEJM 2002'] },
        { id: 'cv_007', q: "Diuretic resistance management?", a: "Increase dose, add thiazide, consider IV, salt restriction", difficulty: 'intermediate', references: ['Heart Failure Guidelines'] },
        { id: 'cv_008', q: "ACE inhibitor contraindications?", a: "Hyperkalemia >5.5, bilateral renal artery stenosis, pregnancy", difficulty: 'intermediate', references: ['AHA Guidelines'] },
        { id: 'cv_009', q: "Target HR in AFib with HF?", a: "<110 bpm at rest", difficulty: 'intermediate', references: ['NEJM 2008'] },
        { id: 'cv_010', q: "Digoxin level in elderly?", a: "0.5-0.9 ng/mL (lower than younger adults)", difficulty: 'intermediate', references: ['NEJM 1997'] },

        // Advanced Questions (11-15)
        { id: 'cv_011', q: "BP target in elderly (>65)?", a: "SBP <130 if tolerated, consider <140 if frail", difficulty: 'advanced', references: ['AHA/ACC 2017'] },
        { id: 'cv_012', q: "First-line HTN meds in elderly?", a: "ACE-I/ARB, CCB, thiazide diuretics", difficulty: 'advanced', references: ['JNC 8'] },
        { id: 'cv_013', q: "Orthostatic BP measurement?", a: "Check at 1 and 3 minutes after standing", difficulty: 'advanced', references: ['AHA Statement 2011'] },
        { id: 'cv_014', q: "White coat HTN prevalence?", a: "15-30% of elderly", difficulty: 'advanced', references: ['Hypertension 2019'] },
        { id: 'cv_015', q: "When to avoid beta-blockers?", a: "Bradycardia, heart block, severe asthma", difficulty: 'advanced', references: ['ESC Guidelines'] }
    ],

    frailty: [
        // Basic Questions (1-5)
        { id: 'frail_001', q: "Fried frailty phenotype criteria?", a: "Weight loss, exhaustion, weakness, slow walking, low activity - 3+ = frail", difficulty: 'basic', references: ['J Gerontol 2001'] },
        { id: 'frail_002', q: "Clinical Frailty Scale range?", a: "1 (very fit) to 9 (terminally ill)", difficulty: 'basic', references: ['CMAJ 2005'] },
        { id: 'frail_003', q: "Frailty prevalence?", a: "10-15% of community elderly, 50% in nursing homes", difficulty: 'basic', references: ['JAGS 2004'] },
        { id: 'frail_004', q: "Gait speed cutoff for frailty?", a: "<0.8 m/s suggests frailty", difficulty: 'basic', references: ['JAMA 2011'] },
        { id: 'frail_005', q: "Grip strength cutoff?", a: "Men <26kg, Women <16kg", difficulty: 'basic', references: ['Am J Med 2006'] },

        // Intermediate Questions (6-10)
        { id: 'frail_006', q: "Best intervention for frailty?", a: "Multicomponent exercise program with nutrition support", difficulty: 'intermediate', references: ['Cochrane 2017'] },
        { id: 'frail_007', q: "Protein needs in frail elderly?", a: "1.2-1.5 g/kg/day", difficulty: 'intermediate', references: ['PROT-AGE Study'] },
        { id: 'frail_008', q: "Exercise prescription for frailty?", a: "Progressive resistance training 2-3x/week plus balance", difficulty: 'intermediate', references: ['JAGS 2019'] },
        { id: 'frail_009', q: "Sarcopenia definition?", a: "Loss of muscle mass + low strength or performance", difficulty: 'intermediate', references: ['EWGSOP2 2019'] },
        { id: 'frail_010', q: "Pre-frailty intervention?", a: "Target to prevent progression - exercise, nutrition, social support", difficulty: 'intermediate', references: ['Lancet 2013'] },

        // Advanced Questions (11-15)
        { id: 'frail_011', q: "Frailty index vs phenotype?", a: "Index: deficit accumulation model (0-1 scale), Phenotype: 5 criteria model", difficulty: 'advanced', references: ['Age Ageing 2013'] },
        { id: 'frail_012', q: "Surgery outcomes in frail patients?", a: "Higher mortality, complications, readmissions - use for risk stratification", difficulty: 'advanced', references: ['Ann Surg 2018'] },
        { id: 'frail_013', q: "Frailty and hospitalization?", a: "5x higher risk of adverse outcomes, longer LOS, increased mortality", difficulty: 'advanced', references: ['J Am Coll Surg 2010'] },
        { id: 'frail_014', q: "Cognitive frailty?", a: "Physical frailty + cognitive impairment without dementia", difficulty: 'advanced', references: ['J Nutr Health Aging 2013'] },
        { id: 'frail_015', q: "Frailty reversibility?", a: "Pre-frail and mild frailty potentially reversible with intervention", difficulty: 'advanced', references: ['JAGS 2020'] }
    ],

    pain: [
        // Basic Questions (1-5)
        { id: 'pain_001', q: "Pain assessment in dementia?", a: "PAINAD scale: breathing, vocalization, facial expression, body language, consolability", difficulty: 'basic', references: ['Am J Nurs 2003'] },
        { id: 'pain_002', q: "Chronic pain prevalence in elderly?", a: "50% community, 80% nursing home", difficulty: 'basic', references: ['Pain Med 2016'] },
        { id: 'pain_003', q: "What is the numeric rating scale?", a: "0-10 pain scale, most validated in elderly", difficulty: 'basic', references: ['Pain 1976'] },
        { id: 'pain_004', q: "Red flags for back pain?", a: "Cancer history, unexplained weight loss, fever, neurologic deficits", difficulty: 'basic', references: ['Spine 2012'] },
        { id: 'pain_005', q: "Components of comprehensive pain assessment?", a: "Location, quality, intensity, timing, aggravating/alleviating factors, impact", difficulty: 'basic', references: ['Clin Geriatr Med 2001'] },

        // Intermediate Questions (6-10)
        { id: 'pain_006', q: "Acetaminophen max dose in elderly?", a: "3g/day (lower if liver disease or alcohol use)", difficulty: 'intermediate', references: ['AGS Pain Guidelines'] },
        { id: 'pain_007', q: "Why avoid NSAIDs in elderly?", a: "GI bleeding, renal failure, CV events, drug interactions", difficulty: 'intermediate', references: ['Beers Criteria'] },
        { id: 'pain_008', q: "Topical options for pain?", a: "Capsaicin, lidocaine patches, diclofenac gel", difficulty: 'intermediate', references: ['Cochrane 2017'] },
        { id: 'pain_009', q: "Opioid starting dose in elderly?", a: "25-50% lower than younger adults", difficulty: 'intermediate', references: ['AGS Guidelines'] },
        { id: 'pain_010', q: "Non-pharm pain interventions?", a: "PT, heat/cold, massage, acupuncture, CBT, tai chi", difficulty: 'intermediate', references: ['Pain Med 2018'] },

        // Advanced Questions (11-15)
        { id: 'pain_011', q: "Persistent pain vs chronic pain?", a: "Persistent preferred term - less stigma, acknowledges ongoing nature", difficulty: 'advanced', references: ['Pain Med 2017'] },
        { id: 'pain_012', q: "Tramadol risks in elderly?", a: "Serotonin syndrome, seizures, hyponatremia, CYP2D6 interactions", difficulty: 'advanced', references: ['Drugs Aging 2015'] },
        { id: 'pain_013', q: "Gabapentin for neuropathic pain?", a: "Start 100mg daily, titrate slowly, renally adjust", difficulty: 'advanced', references: ['Neurology 2014'] },
        { id: 'pain_014', q: "Pain catastrophizing in elderly?", a: "Exaggerated negative thoughts about pain - affects outcomes", difficulty: 'advanced', references: ['J Pain 2015'] },
        { id: 'pain_015', q: "WHO pain ladder modification?", a: "Consider topicals as step 1, careful opioid selection in step 3", difficulty: 'advanced', references: ['WHO 2018'] }
    ],

    endocrine: [
        // Basic Questions (1-5)
        { id: 'endo_001', q: "A1c target in elderly?", a: "7.5-8% for healthy, 8-8.5% for complex/frail", difficulty: 'basic', references: ['ADA Standards 2023'] },
        { id: 'endo_002', q: "Hypoglycemia symptoms in elderly?", a: "Often atypical: confusion, falls, weakness rather than classic symptoms", difficulty: 'basic', references: ['Diabetes Care 2015'] },
        { id: 'endo_003', q: "Metformin contraindications?", a: "eGFR <30, risk of lactic acidosis", difficulty: 'basic', references: ['FDA Label'] },
        { id: 'endo_004', q: "Sulfonylurea risks in elderly?", a: "Hypoglycemia, weight gain - use short-acting (glipizide)", difficulty: 'basic', references: ['JAGS 2018'] },
        { id: 'endo_005', q: "SGLT2 inhibitors in elderly?", a: "Benefits for heart/kidney but watch for UTIs, hypotension", difficulty: 'basic', references: ['NEJM 2019'] },

        // Intermediate Questions (6-10)
        { id: 'endo_006', q: "Subclinical hypothyroidism treatment?", a: "Treat if TSH >10 or symptoms with TSH 4.5-10", difficulty: 'intermediate', references: ['NEJM 2017'] },
        { id: 'endo_007', q: "Levothyroxine dosing in elderly?", a: "Start low 25-50mcg, increase slowly q6-8 weeks", difficulty: 'intermediate', references: ['Thyroid 2014'] },
        { id: 'endo_008', q: "Hyperthyroidism in elderly presentation?", a: "Apathetic - weight loss, AFib, osteoporosis, minimal symptoms", difficulty: 'intermediate', references: ['NEJM 2007'] },
        { id: 'endo_009', q: "Amiodarone thyroid effects?", a: "Can cause both hypo and hyperthyroidism", difficulty: 'intermediate', references: ['Circulation 2010'] },
        { id: 'endo_010', q: "TSH goals in elderly?", a: "4-6 mIU/L acceptable in >70 years without symptoms", difficulty: 'intermediate', references: ['JAMA 2008'] },

        // Advanced Questions (11-15)
        { id: 'endo_011', q: "Diabetes technology in elderly?", a: "CGM useful but consider dexterity, vision, cost", difficulty: 'advanced', references: ['Diabetes Care 2020'] },
        { id: 'endo_012', q: "Insulin degludec vs glargine?", a: "Lower hypoglycemia risk, more flexible timing", difficulty: 'advanced', references: ['NEJM 2017'] },
        { id: 'endo_013', q: "GLP-1 agonists cardiovascular benefits?", a: "MACE reduction in established CVD, weight loss", difficulty: 'advanced', references: ['NEJM 2016'] },
        { id: 'endo_014', q: "Osteoporosis screening age?", a: "All women ≥65, men ≥70, or younger with risk factors", difficulty: 'advanced', references: ['USPSTF 2018'] },
        { id: 'endo_015', q: "Vitamin D deficiency definition?", a: "25(OH)D <20 ng/mL (50 nmol/L)", difficulty: 'advanced', references: ['Endocrine Society'] }
    ],

    nutrition: [
        // Basic Questions (1-5)
        { id: 'nutr_001', q: "MNA-SF screening?", a: "Mini Nutritional Assessment Short Form, ≤11 indicates risk", difficulty: 'basic', references: ['J Nutr 2009'] },
        { id: 'nutr_002', q: "Weight loss concerning in elderly?", a: ">5% in 1 month or >10% in 6 months", difficulty: 'basic', references: ['JPEN 2016'] },
        { id: 'nutr_003', q: "Protein requirements in elderly?", a: "1.0-1.2 g/kg/day (higher than younger adults)", difficulty: 'basic', references: ['PROT-AGE Study'] },
        { id: 'nutr_004', q: "Causes of weight loss in elderly?", a: "Depression, dementia, dysphagia, medications, cancer", difficulty: 'basic', references: ['Am Fam Physician 2002'] },
        { id: 'nutr_005', q: "Vitamin B12 deficiency symptoms?", a: "Anemia, neuropathy, cognitive impairment, gait problems", difficulty: 'basic', references: ['NEJM 2013'] },

        // Intermediate Questions (6-10)
        { id: 'nutr_006', q: "Vitamin D dosing?", a: "800-1000 IU daily for most, higher if deficient", difficulty: 'intermediate', references: ['Endocrine Society'] },
        { id: 'nutr_007', q: "Calcium requirements?", a: "1200mg/day through diet preferably", difficulty: 'intermediate', references: ['NIH 2016'] },
        { id: 'nutr_008', q: "When to use ONS?", a: "Oral nutritional supplements when intake <75% of needs", difficulty: 'intermediate', references: ['Clin Nutr 2017'] },
        { id: 'nutr_009', q: "Dysphagia diet levels?", a: "IDDSI levels 0-7, from thin liquids to regular", difficulty: 'intermediate', references: ['IDDSI 2017'] },
        { id: 'nutr_010', q: "Feeding tube indications?", a: "Short-term reversible conditions, patient preference with clear benefit", difficulty: 'intermediate', references: ['JAGS 2014'] },

        // Advanced Questions (11-15)
        { id: 'nutr_011', q: "Cachexia vs sarcopenia?", a: "Cachexia: weight loss + inflammation, Sarcopenia: muscle loss", difficulty: 'advanced', references: ['J Cachexia 2011'] },
        { id: 'nutr_012', q: "Albumin as nutrition marker?", a: "Poor marker - affected by inflammation, hydration", difficulty: 'advanced', references: ['Clin Nutr 2016'] },
        { id: 'nutr_013', q: "Refeeding syndrome prevention?", a: "Start slowly, monitor electrolytes, thiamine supplementation", difficulty: 'advanced', references: ['Nutrition 2008'] },
        { id: 'nutr_014', q: "Texture-modified diet risks?", a: "Reduced intake, poor quality of life, aspiration not always prevented", difficulty: 'advanced', references: ['JAGS 2018'] },
        { id: 'nutr_015', q: "Mediterranean diet in elderly?", a: "Cognitive benefits, cardiovascular protection, mortality reduction", difficulty: 'advanced', references: ['NEJM 2013'] }
    ],

    psychiatry: [
        // Basic Questions (1-5)
        { id: 'psych_001', q: "Depression screening tool?", a: "PHQ-9 or Geriatric Depression Scale (GDS)", difficulty: 'basic', references: ['JAGS 2005'] },
        { id: 'psych_002', q: "First-line antidepressant in elderly?", a: "SSRIs - sertraline, escitalopram", difficulty: 'basic', references: ['AGS Guidelines'] },
        { id: 'psych_003', q: "Why avoid TCAs in elderly?", a: "Anticholinergic effects, orthostatic hypotension, cardiac effects", difficulty: 'basic', references: ['Beers Criteria'] },
        { id: 'psych_004', q: "Late-life depression features?", a: "More somatic complaints, cognitive symptoms, less sad mood", difficulty: 'basic', references: ['Am J Psychiatry 2004'] },
        { id: 'psych_005', q: "Depression vs dementia?", a: "Depression: 'I don't know' answers, aware of deficits, mood symptoms first", difficulty: 'basic', references: ['Int J Geriatr Psychiatry 2002'] },

        // Intermediate Questions (6-10)
        { id: 'psych_006', q: "Anxiety prevalence in elderly?", a: "10-20% have anxiety disorders", difficulty: 'intermediate', references: ['Int J Geriatr Psychiatry 2011'] },
        { id: 'psych_007', q: "GAD-7 screening?", a: "≥10 suggests anxiety disorder", difficulty: 'intermediate', references: ['Arch Intern Med 2006'] },
        { id: 'psych_008', q: "Benzo withdrawal in elderly?", a: "Taper slowly over weeks to months, switch to long-acting first", difficulty: 'intermediate', references: ['Am J Geriatr Psychiatry 2018'] },
        { id: 'psych_009', q: "Non-benzo anxiolytics?", a: "SSRIs, buspirone, gabapentin", difficulty: 'intermediate', references: ['Cochrane 2012'] },
        { id: 'psych_010', q: "CBT effectiveness in elderly anxiety?", a: "As effective as medications with lasting benefits", difficulty: 'intermediate', references: ['Psychol Aging 2009'] },

        // Advanced Questions (11-15)
        { id: 'psych_011', q: "Pseudodementia features?", a: "Depression with cognitive symptoms, responds to antidepressants", difficulty: 'advanced', references: ['Am J Psychiatry 1983'] },
        { id: 'psych_012', q: "Suicide risk in elderly?", a: "Highest rate of any age group, especially white males >85", difficulty: 'advanced', references: ['JAMA Psychiatry 2016'] },
        { id: 'psych_013', q: "Psychosis in elderly?", a: "Rule out delirium, dementia, medications before primary psychotic disorder", difficulty: 'advanced', references: ['Int J Geriatr Psychiatry 2015'] },
        { id: 'psych_014', q: "Sleep disorders in dementia?", a: "Fragmented sleep, reversed day-night cycle, sundowning", difficulty: 'advanced', references: ['Sleep Med Rev 2007'] },
        { id: 'psych_015', q: "Alcohol use disorder screening?", a: "AUDIT-C, lower thresholds in elderly, drug interactions", difficulty: 'advanced', references: ['JAGS 2017'] }
    ]
};

// Quiz Statistics and Metadata
export const quizMetadata = {
    totalQuestions: Object.values(expandedQuizDatabase).reduce((sum, category) => sum + category.length, 0),
    categories: Object.keys(expandedQuizDatabase),
    difficultyDistribution: {
        basic: 5 * Object.keys(expandedQuizDatabase).length,
        intermediate: 5 * Object.keys(expandedQuizDatabase).length,
        advanced: 5 * Object.keys(expandedQuizDatabase).length
    },
    lastUpdated: new Date().toISOString(),
    version: '2.0'
};

// Quiz Helper Functions
export class EnhancedQuizSystem {
    constructor() {
        this.database = expandedQuizDatabase;
        this.userProgress = this.loadProgress();
        this.currentSession = null;
    }

    // Get questions by category and difficulty
    getQuestions(category = null, difficulty = null, count = 10) {
        let questions = [];
        
        if (category) {
            questions = this.database[category] || [];
        } else {
            questions = Object.values(this.database).flat();
        }

        if (difficulty) {
            questions = questions.filter(q => q.difficulty === difficulty);
        }

        // Shuffle and limit
        const shuffled = this.shuffle(questions);
        return shuffled.slice(0, count);
    }

    // Start a quiz session
    startQuiz(config = {}) {
        const {
            category = null,
            difficulty = null,
            count = 10,
            timeLimit = null
        } = config;

        const questions = this.getQuestions(category, difficulty, count);
        
        this.currentSession = {
            id: this.generateSessionId(),
            questions,
            currentIndex: 0,
            answers: [],
            startTime: Date.now(),
            timeLimit,
            config
        };

        return {
            sessionId: this.currentSession.id,
            totalQuestions: questions.length,
            firstQuestion: questions[0],
            timeLimit
        };
    }

    // Submit answer
    submitAnswer(sessionId, answer, timeToAnswer = null) {
        if (!this.currentSession || this.currentSession.id !== sessionId) {
            throw new Error('Invalid session');
        }

        const currentQ = this.currentSession.questions[this.currentSession.currentIndex];
        const isCorrect = this.checkAnswer(currentQ, answer);
        
        const answerData = {
            questionId: currentQ.id,
            question: currentQ.q,
            userAnswer: answer,
            correctAnswer: currentQ.a,
            isCorrect,
            timeToAnswer: timeToAnswer || 0,
            timestamp: Date.now()
        };

        this.currentSession.answers.push(answerData);
        this.currentSession.currentIndex++;

        // Update progress tracking
        this.updateProgress(currentQ, isCorrect);

        // Check if quiz is complete
        const isComplete = this.currentSession.currentIndex >= this.currentSession.questions.length;
        
        if (isComplete) {
            return this.completeQuiz();
        }

        return {
            correct: isCorrect,
            explanation: currentQ.a,
            nextQuestion: this.currentSession.questions[this.currentSession.currentIndex],
            progress: {
                current: this.currentSession.currentIndex,
                total: this.currentSession.questions.length,
                score: this.currentSession.answers.filter(a => a.isCorrect).length
            }
        };
    }

    // Complete quiz
    completeQuiz() {
        if (!this.currentSession) return null;

        const results = this.calculateResults();
        this.saveSession(results);
        
        const session = this.currentSession;
        this.currentSession = null;

        return results;
    }

    // Calculate quiz results
    calculateResults() {
        const answers = this.currentSession.answers;
        const correct = answers.filter(a => a.isCorrect).length;
        const total = answers.length;
        const percentage = Math.round((correct / total) * 100);
        
        return {
            sessionId: this.currentSession.id,
            score: correct,
            total,
            percentage,
            grade: this.calculateGrade(percentage),
            timeSpent: Date.now() - this.currentSession.startTime,
            category: this.currentSession.config.category,
            difficulty: this.currentSession.config.difficulty,
            answers,
            recommendations: this.generateRecommendations(answers),
            timestamp: Date.now()
        };
    }

    // Calculate grade
    calculateGrade(percentage) {
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        return 'F';
    }

    // Generate study recommendations
    generateRecommendations(answers) {
        const incorrectByCategory = {};
        const incorrectByDifficulty = {};

        answers.filter(a => !a.isCorrect).forEach(answer => {
            const question = this.findQuestionById(answer.questionId);
            if (question) {
                const category = this.getCategoryForQuestion(question);
                incorrectByCategory[category] = (incorrectByCategory[category] || 0) + 1;
                incorrectByDifficulty[question.difficulty] = (incorrectByDifficulty[question.difficulty] || 0) + 1;
            }
        });

        const recommendations = [];
        
        // Category recommendations
        Object.entries(incorrectByCategory).forEach(([category, count]) => {
            if (count >= 2) {
                recommendations.push({
                    type: 'category',
                    message: `Review ${category} topics - ${count} questions missed`,
                    action: `Study more ${category} questions`
                });
            }
        });

        // Difficulty recommendations
        if (incorrectByDifficulty.basic >= 2) {
            recommendations.push({
                type: 'difficulty',
                message: 'Review fundamental concepts',
                action: 'Focus on basic level questions first'
            });
        }

        return recommendations;
    }

    // Utility functions
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    generateSessionId() {
        return 'quiz_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    checkAnswer(question, userAnswer) {
        // Simple string matching - could be enhanced
        return userAnswer.toLowerCase().includes(question.a.toLowerCase().split(' ')[0]);
    }

    findQuestionById(id) {
        for (const category of Object.values(this.database)) {
            const question = category.find(q => q.id === id);
            if (question) return question;
        }
        return null;
    }

    getCategoryForQuestion(question) {
        for (const [category, questions] of Object.entries(this.database)) {
            if (questions.includes(question)) return category;
        }
        return 'unknown';
    }

    // Progress tracking
    loadProgress() {
        try {
            return JSON.parse(localStorage.getItem('quizProgress') || '{}');
        } catch {
            return {};
        }
    }

    updateProgress(question, isCorrect) {
        const category = this.getCategoryForQuestion(question);
        if (!this.userProgress[category]) {
            this.userProgress[category] = { correct: 0, total: 0, lastStudied: Date.now() };
        }
        
        this.userProgress[category].total++;
        if (isCorrect) this.userProgress[category].correct++;
        this.userProgress[category].lastStudied = Date.now();
        
        localStorage.setItem('quizProgress', JSON.stringify(this.userProgress));
    }

    saveSession(results) {
        const sessions = JSON.parse(localStorage.getItem('quizSessions') || '[]');
        sessions.push(results);
        // Keep only last 50 sessions
        if (sessions.length > 50) {
            sessions.splice(0, sessions.length - 50);
        }
        localStorage.setItem('quizSessions', JSON.stringify(sessions));
    }

    // Get user statistics
    getStatistics() {
        return {
            progress: this.userProgress,
            metadata: quizMetadata,
            recentSessions: JSON.parse(localStorage.getItem('quizSessions') || '[]').slice(-10)
        };
    }
}

export default { expandedQuizDatabase, quizMetadata, EnhancedQuizSystem };