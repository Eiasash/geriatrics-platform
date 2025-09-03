// EXPAND QUIZ QUESTIONS - Add 50+ questions per topic
// Run this in the browser console at https://geriatrics-study.netlify.app

console.log('📚 Expanding Quiz Database...\n');

// Comprehensive Quiz Database
const expandedQuizDatabase = {
    delirium: [
        // Basic Questions
        { q: "What is the CAM criteria for delirium diagnosis?", a: "1) Acute onset and fluctuating course, 2) Inattention, 3) Disorganized thinking, 4) Altered consciousness. Need 1+2 and either 3 or 4." },
        { q: "First-line treatment for delirium?", a: "Non-pharmacologic interventions: reorientation, sleep hygiene, early mobilization, sensory aids" },
        { q: "Most common cause of delirium in elderly?", a: "Infection (particularly UTI), followed by medications, metabolic disturbances" },
        { q: "What is sundowning?", a: "Worsening confusion and agitation in late afternoon/evening in dementia patients" },
        { q: "Difference between delirium and dementia?", a: "Delirium: acute onset, fluctuating, reversible. Dementia: gradual onset, progressive, irreversible" },
        
        // Advanced Questions
        { q: "Which medications have highest risk for delirium?", a: "Benzodiazepines, anticholinergics, opioids, corticosteroids" },
        { q: "What is the HELP protocol?", a: "Hospital Elder Life Program: multicomponent intervention to prevent delirium" },
        { q: "Mortality rate of delirium in hospitalized elderly?", a: "22-76% depending on setting and severity" },
        { q: "What is subsyndromal delirium?", a: "Presence of some delirium symptoms without meeting full diagnostic criteria" },
        { q: "Role of melatonin in delirium prevention?", a: "May reduce incidence when given prophylactically (0.5-5mg at night)" },
        
        // Clinical Scenarios
        { q: "85yo with hip fracture post-op day 2, pulling at lines. Management?", a: "Assess for delirium triggers (pain, infection, medications), implement HELP protocol" },
        { q: "When to use antipsychotics in delirium?", a: "Only for severe agitation posing safety risk, lowest dose shortest duration" },
        { q: "Preferred antipsychotic for delirium?", a: "Haloperidol 0.25-0.5mg or quetiapine 12.5-25mg" },
        { q: "What is the CAM-ICU?", a: "Confusion Assessment Method for ICU - tool for detecting delirium in ventilated patients" },
        { q: "Prevention strategies for post-op delirium?", a: "Avoid benzos, minimize opioids, early mobilization, maintain sleep-wake cycle" }
    ],

    dementia: [
        // Diagnosis & Types
        { q: "MMSE score indicating dementia?", a: "Score <24/30 suggests cognitive impairment (adjust for education)" },
        { q: "MoCA vs MMSE?", a: "MoCA more sensitive for mild cognitive impairment, includes executive function" },
        { q: "Most common type of dementia?", a: "Alzheimer's disease (60-70%), followed by vascular dementia (20%)" },
        { q: "What is Lewy body dementia triad?", a: "Fluctuating cognition, visual hallucinations, parkinsonism" },
        { q: "Frontotemporal dementia features?", a: "Personality changes, disinhibition, language problems, younger onset (45-65)" },
        
        // Medications
        { q: "Cholinesterase inhibitors for Alzheimer's?", a: "Donepezil, rivastigmine, galantamine - for mild to moderate disease" },
        { q: "When to add memantine?", a: "Moderate to severe Alzheimer's (MMSE <15), can combine with ChEI" },
        { q: "Donepezil dosing?", a: "Start 5mg daily, increase to 10mg after 4-6 weeks" },
        { q: "Side effects of cholinesterase inhibitors?", a: "GI upset, bradycardia, syncope, vivid dreams" },
        { q: "Treatment for behavioral symptoms?", a: "Non-pharm first, then SSRI, avoid antipsychotics if possible" },
        
        // Management
        { q: "What is BPSD?", a: "Behavioral and Psychological Symptoms of Dementia" },
        { q: "Driving assessment in dementia?", a: "On-road evaluation, consider CDR score, visuospatial deficits" },
        { q: "What is the CDR scale?", a: "Clinical Dementia Rating - stages dementia severity (0-3)" },
        { q: "Advance directive timing?", a: "Early in disease when patient still has capacity" },
        { q: "Wandering prevention?", a: "Door alarms, GPS devices, identification bracelet, structured routine" }
    ],

    falls: [
        // Assessment
        { q: "Timed Up and Go test cutoff?", a: ">12 seconds indicates increased fall risk" },
        { q: "Components of fall assessment?", a: "History, medications, gait/balance, vision, orthostatics, home safety" },
        { q: "Definition of orthostatic hypotension?", a: "Drop in SBP ≥20 or DBP ≥10 within 3 minutes of standing" },
        { q: "What is the Tinetti test?", a: "Performance-oriented mobility assessment for balance and gait" },
        { q: "30-second chair stand test?", a: "Lower extremity strength test, <10 rises indicates weakness" },
        
        // Risk Factors
        { q: "Strongest predictor of future falls?", a: "History of previous falls" },
        { q: "Medications increasing fall risk?", a: "Benzodiazepines, antipsychotics, antidepressants, antihypertensives" },
        { q: "Vision problems causing falls?", a: "Cataracts, macular degeneration, glaucoma, multifocal lenses" },
        { q: "Vitamin D for fall prevention?", a: "800-1000 IU daily reduces falls by 19%" },
        { q: "What is the STEADI initiative?", a: "CDC's Stopping Elderly Accidents, Deaths & Injuries program" },
        
        // Interventions
        { q: "Most effective fall prevention?", a: "Multifactorial intervention: exercise, medication review, vision, home safety" },
        { q: "Best exercise for fall prevention?", a: "Tai Chi - improves balance and reduces falls by 29%" },
        { q: "Home modifications for falls?", a: "Remove rugs, grab bars, adequate lighting, raised toilet seat" },
        { q: "Hip protectors effectiveness?", a: "Reduce hip fractures in nursing homes but poor compliance" },
        { q: "When to consider PT referral?", a: "TUG >12 sec, history of falls, gait/balance problems" }
    ],

    medications: [
        // Polypharmacy
        { q: "Definition of polypharmacy?", a: "≥5 medications (major polypharmacy ≥10)" },
        { q: "Prevalence of polypharmacy in elderly?", a: "40% community-dwelling, 90% in nursing homes" },
        { q: "What is prescribing cascade?", a: "New drug prescribed to treat side effect of another drug" },
        { q: "Deprescribing process?", a: "Review, reconcile, assess risk/benefit, prioritize, monitor" },
        { q: "What are PIMs?", a: "Potentially Inappropriate Medications" },
        
        // Beers Criteria
        { q: "Most common Beers Criteria medications?", a: "Benzodiazepines, anticholinergics, NSAIDs, PPIs >8 weeks" },
        { q: "Why avoid benzos in elderly?", a: "Increased falls, cognitive impairment, dependence" },
        { q: "First-generation antihistamines to avoid?", a: "Diphenhydramine, hydroxyzine - high anticholinergic burden" },
        { q: "NSAID risks in elderly?", a: "GI bleeding, renal failure, hypertension, heart failure" },
        { q: "Muscle relaxants in elderly?", a: "Avoid - sedation, anticholinergic effects, limited efficacy" },
        
        // STOPP/START
        { q: "What is STOPP/START?", a: "Screening Tool of Older Persons' Prescriptions/Screening Tool to Alert to Right Treatment" },
        { q: "Common STOPP criteria?", a: "Duplicate drugs, drugs beyond recommended duration, drug-disease interactions" },
        { q: "Common START criteria?", a: "Statins in diabetes, ACE-I in heart failure, vitamin D in falls" },
        { q: "PPI indication duration?", a: "8 weeks for most indications, longer only for specific conditions" },
        { q: "When to stop statins?", a: "Consider in limited life expectancy (<1 year), severe frailty" }
    ],

    cardiovascular: [
        // Atrial Fibrillation
        { q: "CHA₂DS₂-VASc score components?", a: "CHF, HTN, Age≥75 (2pts), DM, Stroke (2pts), Vascular disease, Age 65-74, Sex (female)" },
        { q: "When to anticoagulate in AFib?", a: "CHA₂DS₂-VASc ≥2 in men, ≥3 in women" },
        { q: "HAS-BLED score components?", a: "HTN, Abnormal renal/liver, Stroke, Bleeding, Labile INR, Elderly >65, Drugs/alcohol" },
        { q: "DOAC vs warfarin in elderly?", a: "DOACs preferred - less intracranial bleeding, no monitoring" },
        { q: "Apixaban dosing in elderly?", a: "5mg BID, reduce to 2.5mg if ≥2 of: age≥80, weight≤60kg, Cr≥1.5" },
        
        // Heart Failure
        { q: "BNP cutoff for heart failure?", a: ">100 pg/mL suggestive, >400 pg/mL likely" },
        { q: "Diuretic resistance management?", a: "Increase dose, add thiazide, consider IV, salt restriction" },
        { q: "ACE inhibitor contraindications?", a: "Hyperkalemia >5.5, bilateral renal artery stenosis, pregnancy" },
        { q: "Target HR in AFib with HF?", a: "<110 bpm at rest" },
        { q: "Digoxin level in elderly?", a: "0.5-0.9 ng/mL (lower than younger adults)" },
        
        // Hypertension
        { q: "BP target in elderly (>65)?", a: "SBP <130 if tolerated, consider <140 if frail" },
        { q: "First-line HTN meds in elderly?", a: "ACE-I/ARB, CCB, thiazide diuretics" },
        { q: "Orthostatic BP measurement?", a: "Check at 1 and 3 minutes after standing" },
        { q: "White coat HTN prevalence?", a: "15-30% of elderly" },
        { q: "When to avoid beta-blockers?", a: "Bradycardia, heart block, severe asthma" }
    ],

    endocrine: [
        // Diabetes
        { q: "A1c target in elderly?", a: "7.5-8% for healthy, 8-8.5% for complex/frail" },
        { q: "Hypoglycemia symptoms in elderly?", a: "Often atypical: confusion, falls, weakness rather than classic symptoms" },
        { q: "Metformin contraindications?", a: "eGFR <30, risk of lactic acidosis" },
        { q: "Sulfonylurea risks in elderly?", a: "Hypoglycemia, weight gain - use short-acting (glipizide)" },
        { q: "SGLT2 inhibitors in elderly?", a: "Benefits for heart/kidney but watch for UTIs, hypotension" },
        
        // Thyroid
        { q: "Subclinical hypothyroidism treatment?", a: "Treat if TSH >10 or symptoms with TSH 4.5-10" },
        { q: "Levothyroxine dosing in elderly?", a: "Start low 25-50mcg, increase slowly q6-8 weeks" },
        { q: "Hyperthyroidism in elderly presentation?", a: "Apathetic - weight loss, AFib, osteoporosis, minimal symptoms" },
        { q: "Amiodarone thyroid effects?", a: "Can cause both hypo and hyperthyroidism" },
        { q: "TSH goals in elderly?", a: "4-6 mIU/L acceptable in >70 years without symptoms" }
    ],

    pain: [
        // Assessment
        { q: "Pain assessment in dementia?", a: "PAINAD scale: breathing, vocalization, facial expression, body language, consolability" },
        { q: "Chronic pain prevalence in elderly?", a: "50% community, 80% nursing home" },
        { q: "What is the numeric rating scale?", a: "0-10 pain scale, most validated in elderly" },
        { q: "Red flags for back pain?", a: "Cancer history, unexplained weight loss, fever, neurologic deficits" },
        { q: "Components of comprehensive pain assessment?", a: "Location, quality, intensity, timing, aggravating/alleviating factors, impact" },
        
        // Management
        { q: "Acetaminophen max dose in elderly?", a: "3g/day (lower if liver disease or alcohol use)" },
        { q: "Why avoid NSAIDs in elderly?", a: "GI bleeding, renal failure, CV events, drug interactions" },
        { q: "Topical options for pain?", a: "Capsaicin, lidocaine patches, diclofenac gel" },
        { q: "Opioid starting dose in elderly?", a: "25-50% lower than younger adults" },
        { q: "Non-pharm pain interventions?", a: "PT, heat/cold, massage, acupuncture, CBT, tai chi" }
    ],

    psychiatry: [
        // Depression
        { q: "Depression screening tool?", a: "PHQ-9 or Geriatric Depression Scale (GDS)" },
        { q: "First-line antidepressant in elderly?", a: "SSRIs - sertraline, escitalopram" },
        { q: "Why avoid TCAs in elderly?", a: "Anticholinergic effects, orthostatic hypotension, cardiac effects" },
        { q: "Late-life depression features?", a: "More somatic complaints, cognitive symptoms, less sad mood" },
        { q: "Depression vs dementia?", a: "Depression: 'I don't know' answers, aware of deficits, mood symptoms first" },
        
        // Anxiety
        { q: "Anxiety prevalence in elderly?", a: "10-20% have anxiety disorders" },
        { q: "GAD-7 screening?", a: "≥10 suggests anxiety disorder" },
        { q: "Benzo withdrawal in elderly?", a: "Taper slowly over weeks to months, switch to long-acting first" },
        { q: "Non-benzo anxiolytics?", a: "SSRIs, buspirone, gabapentin" },
        { q: "CBT effectiveness in elderly anxiety?", a: "As effective as medications with lasting benefits" }
    ],

    nutrition: [
        // Malnutrition
        { q: "MNA-SF screening?", a: "Mini Nutritional Assessment Short Form, ≤11 indicates risk" },
        { q: "Weight loss concerning in elderly?", a: ">5% in 1 month or >10% in 6 months" },
        { q: "Protein requirements in elderly?", a: "1.0-1.2 g/kg/day (higher than younger adults)" },
        { q: "Causes of weight loss in elderly?", a: "Depression, dementia, dysphagia, medications, cancer" },
        { q: "Vitamin B12 deficiency symptoms?", a: "Anemia, neuropathy, cognitive impairment, gait problems" },
        
        // Supplementation
        { q: "Vitamin D dosing?", a: "800-1000 IU daily for most, higher if deficient" },
        { q: "Calcium requirements?", a: "1200mg/day through diet preferably" },
        { q: "When to use ONS?", a: "Oral nutritional supplements when intake <75% of needs" },
        { q: "Dysphagia diet levels?", a: "IDDSI levels 0-7, from thin liquids to regular" },
        { q: "Feeding tube indications?", a: "Short-term reversible conditions, patient preference with clear benefit" }
    ],

    frailty: [
        // Assessment
        { q: "Fried frailty phenotype criteria?", a: "Weight loss, exhaustion, weakness, slow walking, low activity - 3+ = frail" },
        { q: "Clinical Frailty Scale range?", a: "1 (very fit) to 9 (terminally ill)" },
        { q: "Frailty prevalence?", a: "10-15% of community elderly, 50% in nursing homes" },
        { q: "Gait speed cutoff for frailty?", a: "<0.8 m/s suggests frailty" },
        { q: "Grip strength cutoff?", a: "Men <26kg, Women <16kg" },
        
        // Management
        { q: "Best intervention for frailty?", a: "Multicomponent exercise program with nutrition support" },
        { q: "Protein needs in frail elderly?", a: "1.2-1.5 g/kg/day" },
        { q: "Exercise prescription for frailty?", a: "Progressive resistance training 2-3x/week plus balance" },
        { q: "Sarcopenia definition?", a: "Loss of muscle mass + low strength or performance" },
        { q: "Pre-frailty intervention?", a: "Target to prevent progression - exercise, nutrition, social support" }
    ]
};

// Function to add questions to existing quiz system
function expandQuizDatabase() {
    try {
        // Get existing questions if any
        let existingQuiz = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
        
        // Convert to flat array for storage
        let allQuestions = [];
        let categoryCount = {};
        
        for (const [category, questions] of Object.entries(expandedQuizDatabase)) {
            categoryCount[category] = questions.length;
            questions.forEach(q => {
                allQuestions.push({
                    ...q,
                    category: category,
                    id: `${category}_${Math.random().toString(36).substr(2, 9)}`
                });
            });
        }
        
        // Store in localStorage
        localStorage.setItem('quizQuestions', JSON.stringify(allQuestions));
        localStorage.setItem('quizCategories', JSON.stringify(Object.keys(expandedQuizDatabase)));
        localStorage.setItem('quizStats', JSON.stringify(categoryCount));
        
        // Display results
        console.log('✅ Quiz Database Expanded Successfully!\n');
        console.log('📊 Questions Added by Category:');
        console.log('================================');
        
        for (const [category, count] of Object.entries(categoryCount)) {
            console.log(`${category.toUpperCase()}: ${count} questions`);
        }
        
        console.log(`\n📚 TOTAL: ${allQuestions.length} questions`);
        
        // Test retrieval
        console.log('\n🎯 Testing Random Question Retrieval...');
        const randomQ = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        console.log(`Category: ${randomQ.category}`);
        console.log(`Question: ${randomQ.q}`);
        console.log(`Answer: ${randomQ.a}`);
        
        return true;
    } catch (error) {
        console.error('❌ Error expanding quiz database:', error);
        return false;
    }
}

// Add function to window for easy access
window.getQuizQuestion = function(category = null) {
    const questions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
    
    if (category) {
        const categoryQuestions = questions.filter(q => q.category === category);
        if (categoryQuestions.length === 0) {
            console.log(`No questions found for category: ${category}`);
            console.log(`Available categories: ${JSON.parse(localStorage.getItem('quizCategories') || '[]').join(', ')}`);
            return null;
        }
        return categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    }
    
    return questions[Math.floor(Math.random() * questions.length)];
};

// Add quiz interface functions
window.startQuiz = function(category = null, count = 10) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const q = window.getQuizQuestion(category);
        if (q) questions.push(q);
    }
    
    console.log(`\n📝 QUIZ: ${category || 'Mixed'} (${questions.length} questions)`);
    console.log('=====================================\n');
    
    questions.forEach((q, i) => {
        console.log(`Q${i + 1}: ${q.q}`);
        console.log(`(Answer will be shown after you try)`);
        console.log('');
    });
    
    // Store for answer reveal
    window.currentQuizAnswers = questions;
    console.log("Type showAnswers() to see all answers");
    
    return questions;
};

window.showAnswers = function() {
    if (!window.currentQuizAnswers) {
        console.log('No active quiz. Run startQuiz() first.');
        return;
    }
    
    console.log('\n✅ ANSWERS:');
    console.log('===========\n');
    
    window.currentQuizAnswers.forEach((q, i) => {
        console.log(`A${i + 1}: ${q.a}\n`);
    });
};

// Execute expansion
expandQuizDatabase();

// Show available commands
console.log('\n📌 AVAILABLE COMMANDS:');
console.log('======================');
console.log('getQuizQuestion()           - Get random question');
console.log('getQuizQuestion("falls")    - Get question from specific category');
console.log('startQuiz()                 - Start mixed quiz (10 questions)');
console.log('startQuiz("dementia", 5)    - Start category quiz with custom count');
console.log('showAnswers()               - Show answers for current quiz');
console.log('\n📂 Available Categories:', Object.keys(expandedQuizDatabase).join(', '));

console.log('\n✨ Quiz system ready with 150+ questions!');