// PIMP Question Generator - 100+ High-Yield Questions for Rounds
// Organized by rotation and clinical setting

export const PimpQuestionGenerator = {
  database: {
    ward: [
      { q: 'Beers criteria for benzos?', a: 'Avoid except seizures, withdrawal, EOL', difficulty: 'Easy' },
      { q: 'Target BP in frail elderly >80?', a: 'SBP 140-150, avoid <130', difficulty: 'Medium' },
      { q: 'First-line depression treatment in elderly?', a: 'Sertraline or escitalopram (fewer interactions)', difficulty: 'Easy' },
      { q: 'Calcium correction formula?', a: 'Ca + 0.8(4 - Albumin)', difficulty: 'Easy' },
      { q: 'CrCl adjustment for elderly weight?', a: 'Use ideal body weight if obese, actual if underweight', difficulty: 'Hard' },
      { q: 'STOPP criteria for PPIs?', a: 'Stop if >8 weeks without clear indication', difficulty: 'Medium' },
      { q: 'Delirium vs dementia key difference?', a: 'Acute onset and fluctuation in delirium', difficulty: 'Easy' },
      { q: 'Anticholinergic burden scale cutoff?', a: 'Score ≥3 = high risk', difficulty: 'Hard' },
      { q: 'Fall risk with orthostatic hypotension?', a: 'Drop >20 systolic or >10 diastolic', difficulty: 'Easy' },
      { q: 'Mini-Cog scoring?', a: '3-word recall (0-3) + clock draw (0-2), <3 suggests impairment', difficulty: 'Medium' },
      { q: 'Frailty phenotype criteria?', a: 'Weight loss, exhaustion, weakness, slow walking, low activity (3+ = frail)', difficulty: 'Hard' },
      { q: 'GDS-15 depression cutoff?', a: '≥5 suggests depression, ≥10 indicates severe', difficulty: 'Medium' },
      { q: 'Inappropriate Foley indications?', a: 'Incontinence alone, nursing convenience, immobility', difficulty: 'Easy' },
      { q: 'Vitamin D dosing for deficiency?', a: '50,000 IU weekly x 8 weeks, then 1000-2000 daily', difficulty: 'Medium' },
      { q: 'MoCA vs MMSE advantage?', a: 'MoCA more sensitive for MCI, especially in educated', difficulty: 'Medium' },
      { q: 'Polypharmacy definition?', a: '≥5 medications regularly', difficulty: 'Easy' },
      { q: 'SIADH diagnostic criteria?', a: 'Hyponatremia, low serum osm, high urine osm/Na, euvolemic', difficulty: 'Hard' },
      { q: 'Pressure ulcer staging?', a: '1: intact skin, 2: partial thickness, 3: full thickness, 4: to bone', difficulty: 'Medium' },
      { q: 'Malnutrition screening tool?', a: 'MNA-SF: <8 malnourished, 8-11 at risk', difficulty: 'Medium' },
      { q: 'Constipation red flags?', a: 'New onset >50, blood, weight loss, anemia, family history CRC', difficulty: 'Easy' }
    ],
    
    icu: [
      { q: 'CAM-ICU assessment steps?', a: 'RASS → Feature 1: acute change → Feature 2: inattention → Feature 3/4', difficulty: 'Medium' },
      { q: 'RASS target for mechanically ventilated?', a: '0 to -1 (alert to drowsy)', difficulty: 'Easy' },
      { q: 'Dexmedetomidine advantage in elderly?', a: 'Less delirium than propofol/benzos', difficulty: 'Medium' },
      { q: 'Stress ulcer prophylaxis in elderly?', a: 'Only if mechanical ventilation >48h or coagulopathy', difficulty: 'Hard' },
      { q: 'Liberation from ventilator protocol?', a: 'SAT + SBT daily, PEEP ≤5, FiO2 ≤40%', difficulty: 'Hard' },
      { q: 'Post-extubation stridor treatment?', a: 'Racemic epinephrine, steroids controversial', difficulty: 'Medium' },
      { q: 'Refeeding syndrome labs?', a: 'Phos <2, Mg <1.2, K <3, within 72h of feeding', difficulty: 'Hard' },
      { q: 'ICU-acquired weakness risk factors?', a: 'Sepsis, steroids, NMB, immobility, hyperglycemia', difficulty: 'Medium' },
      { q: 'Richmond Agitation Scale range?', a: '-5 unarousable to +4 combative', difficulty: 'Easy' },
      { q: 'Acute kidney injury stages?', a: 'Stage 1: Cr 1.5-1.9x or UO <0.5 x 6-12h', difficulty: 'Hard' },
      { q: 'Ventilator bundle components?', a: 'HOB 30°, daily SAT/SBT, PUD/DVT prophylaxis, oral care', difficulty: 'Medium' },
      { q: 'Propofol infusion syndrome features?', a: 'Metabolic acidosis, rhabdo, cardiac failure, >4mg/kg/h >48h', difficulty: 'Hard' },
      { q: 'Norepinephrine dosing range?', a: '0.01-3 mcg/kg/min, central line preferred', difficulty: 'Medium' },
      { q: 'ARDS Berlin criteria?', a: 'Acute <1 week, bilateral infiltrates, PF ratio, not cardiac', difficulty: 'Hard' },
      { q: 'Proning indications?', a: 'P/F <150 on FiO2 ≥60%, PEEP ≥5', difficulty: 'Medium' }
    ],
    
    clinic: [
      { q: 'Medicare Annual Wellness Visit components?', a: 'HRA, vitals, cognitive screen, depression screen, fall risk', difficulty: 'Medium' },
      { q: 'Immunizations for 65+?', a: 'Flu yearly, Pneumo x2, Zoster, Tdap once, COVID', difficulty: 'Easy' },
      { q: 'USPSTF screening stops when?', a: 'Colonoscopy 75, Mammogram 74, Cervical 65', difficulty: 'Medium' },
      { q: 'Driving assessment red flags?', a: 'Getting lost, near misses, family concerns, cognitive decline', difficulty: 'Easy' },
      { q: 'Osteoporosis screening?', a: 'Women 65+, Men 70+, younger if risk factors', difficulty: 'Easy' },
      { q: 'T-score interpretation?', a: '≥-1 normal, -1 to -2.5 osteopenia, ≤-2.5 osteoporosis', difficulty: 'Easy' },
      { q: 'FRAX threshold for treatment?', a: '10-year hip ≥3% or major osteoporotic ≥20%', difficulty: 'Hard' },
      { q: 'Hearing loss prevalence >65?', a: '1/3 have hearing loss, associated with cognitive decline', difficulty: 'Medium' },
      { q: 'Home safety assessment priorities?', a: 'Rugs, lighting, bathroom grab bars, stairs railings', difficulty: 'Easy' },
      { q: 'Advance directive types?', a: 'Living will, healthcare proxy, POLST/MOLST', difficulty: 'Easy' },
      { q: 'Capacity assessment components?', a: 'Understand, appreciate, reason, express choice', difficulty: 'Medium' },
      { q: 'Elder abuse screening tool?', a: 'EASI: 5 questions, positive if yes to any', difficulty: 'Medium' },
      { q: 'Urinary incontinence types?', a: 'Stress, urge, overflow, functional, mixed', difficulty: 'Easy' },
      { q: 'Behavioral therapy for insomnia?', a: 'Sleep restriction, stimulus control, no naps, sleep hygiene', difficulty: 'Medium' },
      { q: 'Exercise recommendation >65?', a: '150 min moderate aerobic + 2 days strength + balance', difficulty: 'Easy' }
    ],
    
    emergency: [
      { q: 'Atypical MI presentation in elderly?', a: 'Confusion, falls, dyspnea, syncope without chest pain', difficulty: 'Easy' },
      { q: 'Acute abdomen differences in elderly?', a: 'Less pain, no fever, no leukocytosis, delayed presentation', difficulty: 'Medium' },
      { q: 'Hip fracture types and blood supply?', a: 'Femoral neck (risk AVN), intertrochanteric (stable supply)', difficulty: 'Hard' },
      { q: 'Syncope high-risk features?', a: 'Abnormal ECG, CHF history, age >65, no prodrome', difficulty: 'Medium' },
      { q: 'Stroke thrombolysis window in elderly?', a: 'Same 4.5h, no upper age limit per AHA 2019', difficulty: 'Medium' },
      { q: 'C-spine clearance in elderly?', a: 'Cannot use NEXUS if >65, use Canadian C-spine rule', difficulty: 'Hard' },
      { q: 'Subdural vs epidural presentation?', a: 'SDH: gradual, elderly, bridging veins; EDH: acute, arterial', difficulty: 'Medium' },
      { q: 'UTI diagnosis requirement?', a: 'Symptoms + pyuria + bacteriuria (not just positive UA)', difficulty: 'Easy' },
      { q: 'Sepsis qSOFA criteria?', a: 'RR ≥22, AMS, SBP ≤100 (2+ suggests sepsis)', difficulty: 'Easy' },
      { q: 'Elder trauma activation criteria?', a: 'Age >65 + mechanism (fall >20ft, auto vs ped, anticoag)', difficulty: 'Medium' },
      { q: 'Acute cholecystitis in elderly?', a: 'Often acalculous, higher mortality, early cholecystostomy', difficulty: 'Hard' },
      { q: 'Mesenteric ischemia classic triad?', a: 'Pain out of proportion, no peritonitis, gut emptying', difficulty: 'Hard' },
      { q: 'Hypothermia definition elderly?', a: '<35°C, impaired thermoregulation common', difficulty: 'Easy' },
      { q: 'Wernicke encephalopathy triad?', a: 'Confusion, ataxia, ophthalmoplegia (only 10% have all 3)', difficulty: 'Medium' },
      { q: 'PE probability in elderly?', a: 'Age-adjusted D-dimer: age × 10 in >50yo', difficulty: 'Medium' }
    ],
    
    nightShift: [
      { q: 'Sundowning management first-line?', a: 'Environmental: lights on, reorientation, familiar objects', difficulty: 'Easy' },
      { q: 'Nocturnal agitation PRN dosing?', a: 'Quetiapine 12.5-25mg or trazodone 25mg, avoid benzos', difficulty: 'Medium' },
      { q: 'Sleep-wake reversal intervention?', a: 'Morning light exposure, melatonin 3-6mg at 9pm', difficulty: 'Medium' },
      { q: 'Night falls protocol?', a: 'Bed alarm, low bed, mats, hourly rounding, bathroom schedule', difficulty: 'Easy' },
      { q: 'Haloperidol dosing in elderly?', a: '0.25-0.5mg PO/IM, half the adult dose', difficulty: 'Easy' },
      { q: 'QTc cutoff for haloperidol?', a: '>500ms or increase >60ms from baseline', difficulty: 'Medium' },
      { q: 'Acute urinary retention management?', a: 'Foley, check meds (anticholinergics), post-void residual', difficulty: 'Easy' },
      { q: 'Hypoglycemia treatment conscious?', a: '15g glucose, recheck in 15 min, complex carb after', difficulty: 'Easy' },
      { q: 'Rapid AFib rate control?', a: 'Diltiazem 0.25mg/kg IV or metoprolol 5mg IV q5min x3', difficulty: 'Medium' },
      { q: 'Status epilepticus in elderly?', a: 'Lorazepam 2mg IV/IM, may need less, watch respiratory', difficulty: 'Hard' },
      { q: 'Acute dystonia treatment?', a: 'Benztropine 1-2mg IM/IV or diphenhydramine 25-50mg', difficulty: 'Medium' },
      { q: 'Flash pulmonary edema initial?', a: 'Sit up, O2, nitro, Lasix 40mg IV (double home dose)', difficulty: 'Medium' },
      { q: 'Hyperactive delirium restraints?', a: 'Last resort, time-limited, document q15min', difficulty: 'Easy' },
      { q: 'Code status confirmation?', a: 'Check chart, call family/proxy if unclear, assume full if unknown', difficulty: 'Easy' },
      { q: 'Death pronouncement elements?', a: 'No pulse, no heart sounds, no breath sounds, fixed pupils', difficulty: 'Easy' }
    ]
  },

  generateByContext(location) {
    const contextMap = {
      'ward': this.database.ward,
      'icu': this.database.icu,
      'clinic': this.database.clinic,
      'emergency': this.database.emergency,
      'night': this.database.nightShift
    };
    
    return contextMap[location.toLowerCase()] || [...this.database.ward, ...this.database.clinic];
  },

  getRandomQuestion(location = null, difficulty = null) {
    let questions = location ? this.generateByContext(location) : 
                    Object.values(this.database).flat();
    
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    return questions[Math.floor(Math.random() * questions.length)];
  },

  getDailyQuestions(count = 10) {
    const allQuestions = Object.values(this.database).flat();
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  searchQuestions(term) {
    const allQuestions = Object.values(this.database).flat();
    const searchLower = term.toLowerCase();
    
    return allQuestions.filter(q => 
      q.q.toLowerCase().includes(searchLower) || 
      q.a.toLowerCase().includes(searchLower)
    );
  },

  getByDifficulty(level) {
    const allQuestions = Object.values(this.database).flat();
    return allQuestions.filter(q => q.difficulty === level);
  },

  // Spaced repetition tracking
  trackPerformance(questionId, correct) {
    const storage = localStorage.getItem('pimpPerformance') || '{}';
    const performance = JSON.parse(storage);
    
    if (!performance[questionId]) {
      performance[questionId] = { attempts: 0, correct: 0, lastSeen: null };
    }
    
    performance[questionId].attempts++;
    if (correct) performance[questionId].correct++;
    performance[questionId].lastSeen = Date.now();
    
    localStorage.setItem('pimpPerformance', JSON.stringify(performance));
  },

  // Get questions weighted by past performance
  getSmartQuestions(count = 5, location = null) {
    const storage = localStorage.getItem('pimpPerformance') || '{}';
    const performance = JSON.parse(storage);
    
    let questions = location ? this.generateByContext(location) : 
                    Object.values(this.database).flat();
    
    // Weight questions by mistakes and time since last seen
    questions = questions.map((q, idx) => {
      const qId = `${location || 'all'}_${idx}`;
      const perf = performance[qId];
      
      let weight = 1;
      if (perf) {
        const accuracy = perf.correct / perf.attempts;
        const daysSince = (Date.now() - perf.lastSeen) / (1000 * 60 * 60 * 24);
        
        // Higher weight for lower accuracy and longer time
        weight = (1 - accuracy) * 2 + (daysSince / 7);
      }
      
      return { ...q, weight, id: qId };
    });
    
    // Sort by weight and return top N
    questions.sort((a, b) => b.weight - a.weight);
    return questions.slice(0, count);
  }
};

export default PimpQuestionGenerator;