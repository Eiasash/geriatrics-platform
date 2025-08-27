// israeli-drug-database.js
// Israeli medication formulary with brand names and enhanced drug interactions

class IsraeliDrugDatabase {
  constructor() {
    this.medications = {};
    this.brandNames = {};
    this.interactions = {};
    this.dangerousInteractions = {};
    this.loadIsraeliMedications();
    this.loadCriticalInteractions();
    console.log(`🇮🇱 Israeli Drug Database Loaded: ${Object.keys(this.medications).length} medications`);
  }

  loadIsraeliMedications() {
    // Cardiovascular Medications
    this.addMedication('metoprolol', {
      brandNames: ['Betaloc', 'Lopressor', 'Seloken'],
      genericName: 'metoprolol',
      hebrewName: 'מטופרולול',
      class: 'Beta-blocker (selective)',
      indication: 'Hypertension, CHF, post-MI',
      dosing: {
        startDose: '12.5-25mg BID',
        maxDose: '200mg BID',
        geriatricStart: '12.5mg BID'
      },
      geriatricConsiderations: 'Start low in elderly. Monitor for bradycardia, orthostatic hypotension, fatigue',
      contraindications: ['2nd/3rd degree AV block', 'Severe bradycardia', 'Cardiogenic shock'],
      interactions: ['verapamil', 'diltiazem', 'digoxin', 'insulin', 'clonidine'],
      monitoring: 'HR, BP, signs of CHF',
      israeliNotes: 'Commonly prescribed at Shaare Zedek. Betaloc most common brand.'
    });

    this.addMedication('amlodipine', {
      brandNames: ['Norvasc', 'Amlopin', 'Amlor'],
      genericName: 'amlodipine',
      hebrewName: 'אמלודיפין',
      class: 'Calcium channel blocker',
      indication: 'Hypertension, angina',
      dosing: {
        startDose: '2.5mg daily',
        maxDose: '10mg daily',
        geriatricStart: '2.5mg daily'
      },
      geriatricConsiderations: 'Well tolerated in elderly. Monitor for ankle edema',
      interactions: ['simvastatin', 'atorvastatin', 'cyclosporine'],
      monitoring: 'BP, ankle edema',
      israeliNotes: 'Norvasc original brand, generic versions widely available'
    });

    this.addMedication('ramipril', {
      brandNames: ['Tritace', 'Ramace', 'Cardiopril'],
      genericName: 'ramipril',
      hebrewName: 'רמיפריל',
      class: 'ACE inhibitor',
      indication: 'Hypertension, CHF, post-MI, diabetic nephropathy',
      dosing: {
        startDose: '1.25-2.5mg daily',
        maxDose: '10mg daily',
        geriatricStart: '1.25mg daily'
      },
      geriatricConsiderations: 'Monitor K+, Cr. Risk of angioedema (rare but serious)',
      contraindications: ['Angioedema history', 'Bilateral RAS', 'Pregnancy'],
      interactions: ['nsaids', 'potassium_supplements', 'trimethoprim', 'lithium'],
      monitoring: 'BP, K+, Cr, dry cough',
      israeliNotes: 'Tritace commonly used. Generic ramipril available.'
    });

    // Anticoagulants - Critical for Israeli healthcare
    this.addMedication('warfarin', {
      brandNames: ['Coumadin', 'Warfin', 'Marevan'],
      genericName: 'warfarin',
      hebrewName: 'וורפרין',
      class: 'Vitamin K antagonist',
      indication: 'Atrial fibrillation, VTE, mechanical valves',
      dosing: {
        startDose: '2.5-5mg daily',
        maxDose: 'Based on INR',
        geriatricStart: '1.25-2.5mg daily'
      },
      geriatricConsiderations: 'Higher bleeding risk in elderly. Lower dose requirements. Frequent INR monitoring essential',
      contraindications: ['Active bleeding', 'Pregnancy', 'Severe liver disease'],
      interactions: ['amiodarone', 'fluconazole', 'trimethoprim', 'aspirin', 'nsaids', 'antibiotics'],
      monitoring: 'INR (target 2-3 for AF/VTE), signs of bleeding',
      israeliNotes: 'Coumadin most common. INR monitoring at Maccabi/Clalit labs. Genetic testing available for dosing.'
    });

    this.addMedication('rivaroxaban', {
      brandNames: ['Xarelto'],
      genericName: 'rivaroxaban',
      hebrewName: 'ריברוקסבאן',
      class: 'Direct Xa inhibitor (DOAC)',
      indication: 'Atrial fibrillation, VTE treatment/prevention',
      dosing: {
        startDose: 'AF: 20mg daily with food, VTE: 15mg BID x21d then 20mg daily',
        maxDose: '20mg daily',
        geriatricStart: 'Consider 15mg daily if CrCl 15-50'
      },
      geriatricConsiderations: 'MUST take with food. Dose reduce in renal impairment',
      contraindications: ['Active bleeding', 'Severe liver disease (Child-Pugh C)'],
      interactions: ['ketoconazole', 'ritonavir', 'phenytoin', 'carbamazepine'],
      monitoring: 'Renal function, bleeding signs',
      israeliNotes: 'Covered by health funds for approved indications. Must take with meal.'
    });

    // Psychiatric Medications - Hebrew healthcare context
    this.addMedication('sertraline', {
      brandNames: ['Zoloft', 'Sertagen', 'Lustral'],
      genericName: 'sertraline',
      hebrewName: 'סרטרלין',
      class: 'SSRI antidepressant',
      indication: 'Depression, anxiety disorders, PTSD',
      dosing: {
        startDose: '25-50mg daily',
        maxDose: '200mg daily',
        geriatricStart: '12.5-25mg daily'
      },
      geriatricConsiderations: 'First-line in elderly. Monitor for hyponatremia, bleeding risk with anticoagulants',
      interactions: ['warfarin', 'nsaids', 'tramadol', 'maois'],
      monitoring: 'Mood, suicidal ideation, Na+, bleeding',
      israeliNotes: 'Zoloft original brand. Generic available. Psychiatric follow-up recommended.'
    });

    this.addMedication('mirtazapine', {
      brandNames: ['Remeron', 'Mirtagen', 'Remergil'],
      genericName: 'mirtazapine',
      hebrewName: 'מירטזפין',
      class: 'Tetracyclic antidepressant',
      indication: 'Depression, especially with insomnia/poor appetite',
      dosing: {
        startDose: '15mg at bedtime',
        maxDose: '45mg daily',
        geriatricStart: '7.5mg at bedtime'
      },
      geriatricConsiderations: 'Good for elderly with weight loss, insomnia. Sedating at low doses',
      interactions: ['maois', 'cns_depressants'],
      monitoring: 'Weight, sedation, CBC (rare agranulocytosis)',
      israeliNotes: 'Remeron brand available. Often prescribed for elderly with poor appetite.'
    });

    // Israeli-specific high-risk medications
    this.addMedication('clonazepam', {
      brandNames: ['Rivotril', 'Clonex', 'Klonopin'],
      genericName: 'clonazepam',
      hebrewName: 'קלונזפאם',
      class: 'Benzodiazepine',
      indication: 'Seizures, panic disorder (AVOID in elderly)',
      dosing: {
        startDose: '0.25mg BID',
        maxDose: 'AVOID in elderly',
        geriatricStart: 'AVOID - use alternatives'
      },
      geriatricConsiderations: 'BEERS CRITERIA: AVOID in ≥65yo. High fall risk, cognitive impairment, dependence',
      contraindications: ['Severe respiratory depression', 'Acute narrow-angle glaucoma'],
      interactions: ['opioids', 'alcohol', 'cns_depressants'],
      monitoring: 'Avoid in elderly - high risk',
      israeliNotes: 'Rivotril commonly prescribed but should avoid in elderly. Consider trazodone or CBT-I for insomnia.',
      beersCriteria: 'AVOID in adults ≥65 years',
      alternatives: ['trazodone', 'melatonin', 'mirtazapine']
    });

    // Pain Management
    this.addMedication('tramadol', {
      brandNames: ['Tramal', 'Tramadex', 'Contramal'],
      genericName: 'tramadol',
      hebrewName: 'טרמדול',
      class: 'Centrally acting analgesic',
      indication: 'Moderate pain',
      dosing: {
        startDose: '25mg daily',
        maxDose: '300mg daily',
        geriatricStart: '25mg daily, titrate slowly'
      },
      geriatricConsiderations: 'Lower seizure threshold. Risk of serotonin syndrome with SSRIs',
      contraindications: ['Seizure disorders', 'MAOIs'],
      interactions: ['ssris', 'snris', 'maois', 'warfarin', 'carbamazepine'],
      monitoring: 'Seizure risk, serotonin syndrome, respiratory depression',
      israeliNotes: 'Tramal most common brand. Serotonin syndrome risk high with SSRIs - common combination in Israel.'
    });

    // Antibiotics with Israeli resistance patterns
    this.addMedication('amoxicillin_clavulanate', {
      brandNames: ['Augmentin', 'Clavamox', 'Amoclav'],
      genericName: 'amoxicillin/clavulanic acid',
      hebrewName: 'אמוקסיצילין קלבולנית',
      class: 'Beta-lactam/beta-lactamase inhibitor',
      indication: 'Respiratory infections, UTIs, skin infections',
      dosing: {
        startDose: '500/125mg TID or 875/125mg BID',
        maxDose: '875/125mg TID',
        geriatricStart: 'Adjust for renal function'
      },
      geriatricConsiderations: 'Monitor for C. diff, especially in elderly',
      interactions: ['warfarin', 'methotrexate'],
      monitoring: 'C. diff symptoms, hepatotoxicity',
      israeliNotes: 'First-line for many infections in Israel due to resistance patterns. Generic available.'
    });

    // Diabetes medications commonly used in Israel
    this.addMedication('metformin', {
      brandNames: ['Glucophage', 'Metforal', 'Siofor'],
      genericName: 'metformin',
      hebrewName: 'מטפורמין',
      class: 'Biguanide',
      indication: 'Type 2 diabetes mellitus',
      dosing: {
        startDose: '500mg daily with dinner',
        maxDose: '2000mg daily',
        geriatricStart: '500mg daily'
      },
      geriatricConsiderations: 'First-line therapy. Check eGFR - avoid if <30. Check B12 annually',
      contraindications: ['eGFR <30', 'Acute illness with tissue hypoxia'],
      interactions: ['contrast_agents', 'alcohol'],
      monitoring: 'eGFR, B12, lactic acidosis symptoms',
      israeliNotes: 'Glucophage original brand. Generic widely available. Hold before contrast procedures.'
    });

    // Thyroid medications
    this.addMedication('levothyroxine', {
      brandNames: ['Synthroid', 'Euthyrox', 'L-Thyroxin'],
      genericName: 'levothyroxine',
      hebrewName: 'לבותירוקסין',
      class: 'Thyroid hormone',
      indication: 'Hypothyroidism',
      dosing: {
        startDose: '25-50mcg daily',
        maxDose: 'Based on TSH',
        geriatricStart: '12.5-25mcg daily'
      },
      geriatricConsiderations: 'Start very low in elderly, especially with cardiac disease',
      interactions: ['iron', 'calcium', 'coffee', 'warfarin'],
      monitoring: 'TSH (6-8 weeks after changes), heart rate',
      israeliNotes: 'Euthyrox commonly used brand. Take on empty stomach 1 hour before breakfast.'
    });

    // PPI with Israeli prescribing patterns
    this.addMedication('omeprazole', {
      brandNames: ['Prilosec', 'Omez', 'Losec'],
      genericName: 'omeprazole',
      hebrewName: 'אומפרזול',
      class: 'Proton pump inhibitor',
      indication: 'GERD, peptic ulcer disease, H. pylori eradication',
      dosing: {
        startDose: '20mg daily',
        maxDose: '40mg daily',
        geriatricStart: '20mg daily'
      },
      geriatricConsiderations: 'BEERS: Avoid >8 weeks unless high risk. Risk of C. diff, fractures, B12 deficiency',
      interactions: ['clopidogrel', 'warfarin', 'iron', 'ketoconazole'],
      monitoring: 'Long-term use: Mg, B12, bone density',
      israeliNotes: 'Generic omeprazole widely available. Consider deprescribing after 8 weeks.',
      beersCriteria: 'AVOID >8 weeks without clear indication'
    });

    // Add brand name mappings
    Object.values(this.medications).forEach(med => {
      med.brandNames.forEach(brand => {
        this.brandNames[brand.toLowerCase()] = med.genericName;
      });
    });
  }

  loadCriticalInteractions() {
    // DANGEROUS COMBINATIONS - Clinical significance ratings
    this.dangerousInteractions = {
      // Warfarin interactions (very common in Israel)
      'warfarin': {
        'amiodarone': {
          severity: 'MAJOR',
          mechanism: 'CYP2C9 inhibition + P-gp inhibition',
          effect: 'Dramatically increases INR (2-3x)',
          management: 'Reduce warfarin dose by 30-50%. Monitor INR closely.',
          timeframe: '1-2 days',
          frequency: 'Very common interaction'
        },
        'fluconazole': {
          severity: 'MAJOR',
          mechanism: 'CYP2C9 potent inhibition',
          effect: 'Increases INR dramatically',
          management: 'Reduce warfarin dose by 50% or hold. Daily INR monitoring.',
          timeframe: '2-3 days',
          frequency: 'Common interaction'
        },
        'trimethoprim': {
          severity: 'MAJOR',
          mechanism: 'CYP2C9 inhibition',
          effect: 'Increases INR significantly',
          management: 'Monitor INR closely. Consider dose reduction.',
          timeframe: '2-5 days',
          frequency: 'Very common - TMP-SMX widely prescribed'
        },
        'aspirin': {
          severity: 'MAJOR',
          mechanism: 'Dual antiplatelet + anticoagulation',
          effect: 'Dramatically increases bleeding risk',
          management: 'Use only if clear indication (e.g., mechanical valve). GI protection.',
          timeframe: 'Immediate',
          frequency: 'Common inappropriate combination'
        },
        'nsaids': {
          severity: 'MAJOR',
          mechanism: 'Antiplatelet effect + GI irritation',
          effect: 'Increases bleeding risk 3-4x',
          management: 'Avoid NSAIDs. Use acetaminophen instead.',
          timeframe: 'Within hours',
          frequency: 'Very common dangerous combination'
        },
        'antibiotics': {
          severity: 'MODERATE-MAJOR',
          mechanism: 'Gut flora alteration + some CYP inhibition',
          effect: 'Unpredictable INR changes',
          management: 'Monitor INR 2-3x/week during antibiotic course.',
          timeframe: '3-7 days',
          frequency: 'Very common'
        }
      },

      // SSRI interactions (common in Israeli psychiatry)
      'sertraline': {
        'tramadol': {
          severity: 'MAJOR',
          mechanism: 'Dual serotonergic activity',
          effect: 'Serotonin syndrome risk',
          management: 'AVOID combination. Use different analgesic.',
          timeframe: 'Hours to days',
          frequency: 'Common dangerous combination in Israel'
        },
        'nsaids': {
          severity: 'MODERATE',
          mechanism: 'Dual antiplatelet effects',
          effect: 'Increased bleeding risk',
          management: 'Monitor for bleeding. Consider PPI.',
          timeframe: 'Days to weeks',
          frequency: 'Very common combination'
        },
        'warfarin': {
          severity: 'MODERATE',
          mechanism: 'Antiplatelet effect of SSRI',
          effect: 'Increased bleeding risk',
          management: 'Monitor INR more frequently. Watch for bleeding.',
          timeframe: '1-2 weeks',
          frequency: 'Common in elderly'
        }
      },

      // Beta-blocker interactions
      'metoprolol': {
        'verapamil': {
          severity: 'MAJOR',
          mechanism: 'Dual negative inotropic effects',
          effect: 'Severe bradycardia, AV block, hypotension',
          management: 'AVOID combination. Use alternative.',
          timeframe: 'Hours',
          frequency: 'Dangerous combination'
        },
        'diltiazem': {
          severity: 'MAJOR',
          mechanism: 'Dual negative chronotropic effects',
          effect: 'Bradycardia, AV conduction delays',
          management: 'AVOID combination or use with extreme caution.',
          timeframe: 'Hours',
          frequency: 'Dangerous combination'
        },
        'insulin': {
          severity: 'MODERATE',
          mechanism: 'Masks hypoglycemic symptoms',
          effect: 'Delayed recognition of hypoglycemia',
          management: 'Patient education. Frequent glucose monitoring.',
          timeframe: 'Ongoing',
          frequency: 'Common in diabetic patients'
        }
      },

      // ACE inhibitor interactions
      'ramipril': {
        'nsaids': {
          severity: 'MODERATE',
          mechanism: 'Reduced GFR + hyperkalemia risk',
          effect: 'Acute kidney injury, hyperkalemia',
          management: 'Monitor Cr, K+ within 1 week. Avoid if possible.',
          timeframe: 'Days to weeks',
          frequency: 'Very common combination'
        },
        'potassium_supplements': {
          severity: 'MODERATE',
          mechanism: 'Dual potassium retention',
          effect: 'Hyperkalemia (K+ >5.5)',
          management: 'Monitor K+ closely. May need to stop K+ supplements.',
          timeframe: 'Days',
          frequency: 'Common in CKD patients'
        },
        'trimethoprim': {
          severity: 'MODERATE',
          mechanism: 'Amiloride-like effect',
          effect: 'Hyperkalemia',
          management: 'Monitor K+ during TMP-SMX course.',
          timeframe: '3-5 days',
          frequency: 'Common with UTI treatment'
        }
      },

      // Dangerous benzodiazepine combinations
      'clonazepam': {
        'opioids': {
          severity: 'MAJOR',
          mechanism: 'Dual CNS depression',
          effect: 'Respiratory depression, death risk',
          management: 'AVOID combination. FDA black box warning.',
          timeframe: 'Minutes to hours',
          frequency: 'Leading cause of overdose deaths'
        },
        'alcohol': {
          severity: 'MAJOR',
          mechanism: 'Enhanced GABA activity',
          effect: 'Severe sedation, respiratory depression',
          management: 'Absolute contraindication. Patient counseling.',
          timeframe: 'Minutes',
          frequency: 'Common dangerous combination'
        }
      },

      // Tramadol serotonin syndrome risks
      'tramadol': {
        'mirtazapine': {
          severity: 'MAJOR',
          mechanism: 'Dual serotonergic + noradrenergic activity',
          effect: 'Serotonin syndrome',
          management: 'AVOID. Use different analgesic.',
          timeframe: 'Hours',
          frequency: 'Dangerous combination'
        },
        'maois': {
          severity: 'CONTRAINDICATED',
          mechanism: 'Severe serotonergic enhancement',
          effect: 'Severe serotonin syndrome, seizures',
          management: 'Absolute contraindication. 14-day washout.',
          timeframe: 'Hours',
          frequency: 'Life-threatening'
        }
      }
    };

    // Build comprehensive interaction matrix
    this.buildInteractionMatrix();
  }

  buildInteractionMatrix() {
    // Create bidirectional interaction mapping
    this.interactions = {};
    
    Object.keys(this.dangerousInteractions).forEach(drug1 => {
      if (!this.interactions[drug1]) this.interactions[drug1] = {};
      
      Object.keys(this.dangerousInteractions[drug1]).forEach(drug2 => {
        const interaction = this.dangerousInteractions[drug1][drug2];
        
        // Add interaction both ways
        this.interactions[drug1][drug2] = interaction;
        
        if (!this.interactions[drug2]) this.interactions[drug2] = {};
        this.interactions[drug2][drug1] = interaction;
      });
    });
  }

  addMedication(genericName, data) {
    this.medications[genericName.toLowerCase()] = {
      ...data,
      searchTerms: this.generateSearchTerms(genericName, data)
    };
  }

  generateSearchTerms(name, data) {
    const terms = [name.toLowerCase()];
    
    // Add brand names
    if (data.brandNames) {
      terms.push(...data.brandNames.map(brand => brand.toLowerCase()));
    }
    
    // Add Hebrew name if available
    if (data.hebrewName) {
      terms.push(data.hebrewName);
    }
    
    // Add class terms
    if (data.class) {
      terms.push(data.class.toLowerCase());
    }
    
    return terms;
  }

  searchDrug(query) {
    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Check brand names first
    if (this.brandNames[searchTerm]) {
      const genericName = this.brandNames[searchTerm];
      if (this.medications[genericName]) {
        results.push(this.medications[genericName]);
      }
    }

    // Exact generic name match
    if (this.medications[searchTerm] && !results.includes(this.medications[searchTerm])) {
      results.push(this.medications[searchTerm]);
    }

    // Partial matches
    Object.values(this.medications).forEach(med => {
      if (results.includes(med)) return;
      
      // Check if search term matches any search terms
      if (med.searchTerms && med.searchTerms.some(term => 
        term.includes(searchTerm) || searchTerm.includes(term)
      )) {
        results.push(med);
      }
    });

    return results.slice(0, 5); // Top 5 results
  }

  getDrugInfo(drugName) {
    const results = this.searchDrug(drugName);
    if (results.length > 0) {
      return results[0];
    }
    return { 
      error: 'Drug not found', 
      suggestion: 'Try brand names like: Tritace, Norvasc, Zoloft, Augmentin, or generic names like metoprolol, sertraline' 
    };
  }

  checkInteractions(drugList) {
    const interactions = [];
    const processedPairs = new Set();

    // Normalize drug names to generic names
    const normalizedDrugs = drugList.map(drug => {
      const drugInfo = this.searchDrug(drug);
      return drugInfo.length > 0 ? drugInfo[0].genericName : drug.toLowerCase();
    });

    // Check all pairs
    for (let i = 0; i < normalizedDrugs.length; i++) {
      const drug1 = normalizedDrugs[i];
      
      for (let j = i + 1; j < normalizedDrugs.length; j++) {
        const drug2 = normalizedDrugs[j];
        const pairKey = [drug1, drug2].sort().join('-');
        
        if (processedPairs.has(pairKey)) continue;
        processedPairs.add(pairKey);

        // Check for interaction
        const interaction = this.getInteraction(drug1, drug2);
        if (interaction) {
          interactions.push({
            drugs: [drug1, drug2],
            originalNames: [drugList[i], drugList[j]],
            ...interaction
          });
        }
      }
    }

    // Sort by severity
    const severityOrder = { 'CONTRAINDICATED': 0, 'MAJOR': 1, 'MODERATE': 2, 'MINOR': 3 };
    interactions.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return interactions;
  }

  getInteraction(drug1, drug2) {
    // Check direct interactions
    if (this.interactions[drug1] && this.interactions[drug1][drug2]) {
      return this.interactions[drug1][drug2];
    }
    
    if (this.interactions[drug2] && this.interactions[drug2][drug1]) {
      return this.interactions[drug2][drug1];
    }

    // Check class-based interactions
    const drug1Info = this.medications[drug1];
    const drug2Info = this.medications[drug2];
    
    if (drug1Info && drug2Info) {
      return this.checkClassInteractions(drug1Info, drug2Info);
    }

    return null;
  }

  checkClassInteractions(drug1Info, drug2Info) {
    const class1 = drug1Info.class?.toLowerCase() || '';
    const class2 = drug2Info.class?.toLowerCase() || '';

    // SSRI + NSAID
    if ((class1.includes('ssri') && class2.includes('nsaid')) ||
        (class2.includes('ssri') && class1.includes('nsaid'))) {
      return {
        severity: 'MODERATE',
        mechanism: 'Dual antiplatelet effects',
        effect: 'Increased bleeding risk',
        management: 'Monitor for bleeding signs. Consider PPI for GI protection.',
        timeframe: '1-2 weeks',
        frequency: 'Common combination'
      };
    }

    // ACE inhibitor + NSAID
    if ((class1.includes('ace inhibitor') && class2.includes('nsaid')) ||
        (class2.includes('ace inhibitor') && class1.includes('nsaid'))) {
      return {
        severity: 'MODERATE',
        mechanism: 'Reduced renal function + hyperkalemia risk',
        effect: 'Acute kidney injury, reduced antihypertensive effect',
        management: 'Monitor Cr, K+, BP within 1 week. Avoid NSAIDs if possible.',
        timeframe: 'Days',
        frequency: 'Very common dangerous combination'
      };
    }

    // Beta-blocker + Calcium channel blocker (non-dihydropyridine)
    if ((class1.includes('beta-blocker') && class2.includes('calcium channel')) ||
        (class2.includes('beta-blocker') && class1.includes('calcium channel'))) {
      return {
        severity: 'MAJOR',
        mechanism: 'Dual negative inotropic and chronotropic effects',
        effect: 'Bradycardia, AV block, hypotension',
        management: 'Use with extreme caution. Monitor HR, BP, PR interval.',
        timeframe: 'Hours',
        frequency: 'Potentially dangerous'
      };
    }

    return null;
  }

  getInteractionSummary(drugList) {
    const interactions = this.checkInteractions(drugList);
    
    const summary = {
      totalInteractions: interactions.length,
      contraindicated: interactions.filter(i => i.severity === 'CONTRAINDICATED').length,
      major: interactions.filter(i => i.severity === 'MAJOR').length,
      moderate: interactions.filter(i => i.severity === 'MODERATE').length,
      minor: interactions.filter(i => i.severity === 'MINOR').length,
      interactions: interactions,
      recommendations: this.generateRecommendations(interactions, drugList)
    };

    return summary;
  }

  generateRecommendations(interactions, drugList) {
    const recommendations = [];

    // Contraindicated combinations
    const contraindicated = interactions.filter(i => i.severity === 'CONTRAINDICATED');
    if (contraindicated.length > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        action: `STOP immediately: ${contraindicated.map(i => i.originalNames.join(' + ')).join(', ')}`,
        reason: 'Contraindicated combinations present - life-threatening risk'
      });
    }

    // Major interactions
    const major = interactions.filter(i => i.severity === 'MAJOR');
    if (major.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Review major interactions urgently',
        reason: `${major.length} major interactions requiring immediate attention`
      });
    }

    // General recommendations
    if (drugList.length > 10) {
      recommendations.push({
        priority: 'MODERATE',
        action: 'Comprehensive medication review',
        reason: `Polypharmacy (${drugList.length} medications) - high interaction risk`
      });
    }

    if (interactions.length === 0 && drugList.length > 5) {
      recommendations.push({
        priority: 'LOW',
        action: 'Continue monitoring',
        reason: 'No significant interactions detected, but continue vigilant monitoring'
      });
    }

    return recommendations;
  }

  // Israeli-specific functions
  getIsraeliAlternatives(drugName) {
    const alternatives = {
      'clonazepam': {
        alternatives: ['trazodone', 'mirtazapine', 'melatonin'],
        israeliContext: 'Avoid Rivotril in elderly - consider sleep hygiene counseling available at Clalit/Maccabi'
      },
      'glyburide': {
        alternatives: ['glipizide', 'metformin', 'empagliflozin'],
        israeliContext: 'Switch from older sulfonylureas - newer options available on health fund formularies'
      },
      'diphenhydramine': {
        alternatives: ['loratadine', 'cetirizine', 'fexofenadine'],
        israeliContext: 'Avoid Benadryl-type antihistamines - non-sedating options preferred'
      }
    };

    return alternatives[drugName.toLowerCase()] || null;
  }

  getHealthFundCoverage(drugName) {
    // Simulate health fund coverage info
    const coverage = {
      'rivaroxaban': 'Covered by all health funds for AF, VTE. Requires pre-approval.',
      'apixaban': 'Covered with restrictions. CrCl and age criteria apply.',
      'empagliflozin': 'Covered for T2DM with CV indication. Endocrinologist approval needed.',
      'mirtazapine': 'Fully covered. Generic available.',
      'sertraline': 'Fully covered by all health funds.'
    };

    return coverage[drugName.toLowerCase()] || 'Coverage information not available';
  }

  generateReport() {
    return {
      totalMedications: Object.keys(this.medications).length,
      brandNames: Object.keys(this.brandNames).length,
      criticalInteractions: Object.keys(this.dangerousInteractions).length,
      interactionPairs: Object.values(this.interactions).reduce((sum, drug) => sum + Object.keys(drug).length, 0)
    };
  }
}

// Initialize Israeli Drug Database
window.IsraeliDrugDatabase = new IsraeliDrugDatabase();

// Integration with existing systems
if (window.DrugDatabase) {
  console.log('🔗 Israeli Drug Database integrated with existing system');
}

console.log(`
🇮🇱 Israeli Drug Database Ready!

Features:
- Israeli brand names (Tritace, Norvasc, Zoloft, etc.)
- Hebrew drug names
- Clinical significance-based interactions
- Dangerous combination alerts
- Israeli healthcare context
- Health fund coverage info

Search examples:
- "Tritace" → finds ramipril
- "Norvasc" → finds amlodipine  
- "Rivotril" → finds clonazepam (with elderly warnings)

Usage:
IsraeliDrugDatabase.getDrugInfo("Tritace")
IsraeliDrugDatabase.checkInteractions(["warfarin", "amiodarone"])
`);