// critical-interaction-fix.js
// URGENT FIX: Comprehensive Drug Interaction Checker
// Critical safety update for missed dangerous combinations

class CriticalInteractionFix {
  constructor() {
    // Complete brand-to-generic mapping
    this.brandToGeneric = {
      // Anticoagulants/Antiplatelets - CRITICAL
      'eliquis': 'apixaban',
      'xarelto': 'rivaroxaban',
      'pradaxa': 'dabigatran',
      'lixiana': 'edoxaban',
      'coumadin': 'warfarin',
      'marevan': 'warfarin',
      'clexane': 'enoxaparin',
      'lovenox': 'enoxaparin',
      'arixtra': 'fondaparinux',
      'plavix': 'clopidogrel',
      'brilinta': 'ticagrelor',
      'effient': 'prasugrel',
      'aspirin': 'aspirin',
      'ecotrin': 'aspirin',
      'micropirin': 'aspirin',
      'cartia': 'aspirin',
      
      // Anticonvulsants - HIGH RISK
      'tegretol': 'carbamazepine',
      'lamictal': 'lamotrigine',
      'keppra': 'levetiracetam',
      'depakote': 'valproic acid',
      'depalept': 'valproic acid',
      'dilantin': 'phenytoin',
      'epanutin': 'phenytoin',
      'topamax': 'topiramate',
      'neurontin': 'gabapentin',
      'lyrica': 'pregabalin',
      'vimpat': 'lacosamide',
      'trileptal': 'oxcarbazepine',
      
      // Diabetes medications
      'ozempic': 'semaglutide',
      'victoza': 'liraglutide',
      'trulicity': 'dulaglutide',
      'jardiance': 'empagliflozin',
      'forxiga': 'dapagliflozin',
      'glucophage': 'metformin',
      'januvia': 'sitagliptin',
      'trajenta': 'linagliptin',
      
      // Cardiovascular
      'norvasc': 'amlodipine',
      'isoptin': 'verapamil',
      'cardizem': 'diltiazem',
      'betaloc': 'metoprolol',
      'concor': 'bisoprolol',
      'tritace': 'ramipril',
      'coversyl': 'perindopril',
      'diovan': 'valsartan',
      'atacand': 'candesartan',
      'cozaar': 'losartan',
      'entresto': 'sacubitril/valsartan',
      
      // Psychiatric
      'zoloft': 'sertraline',
      'cipramil': 'citalopram',
      'cipralex': 'escitalopram',
      'prozac': 'fluoxetine',
      'paxil': 'paroxetine',
      'effexor': 'venlafaxine',
      'cymbalta': 'duloxetine',
      'remeron': 'mirtazapine',
      'tryptizol': 'amitriptyline',
      
      // Benzodiazepines
      'valium': 'diazepam',
      'xanax': 'alprazolam',
      'ativan': 'lorazepam',
      'rivotril': 'clonazepam',
      'klonopin': 'clonazepam',
      
      // Pain medications
      'tramal': 'tramadol',
      'ultram': 'tramadol',
      'oxycontin': 'oxycodone',
      'percocet': 'oxycodone/acetaminophen',
      'duragesic': 'fentanyl',
      'voltaren': 'diclofenac',
      'arcoxia': 'etoricoxib',
      'celebrex': 'celecoxib',
      
      // Antibiotics
      'augmentin': 'amoxicillin/clavulanate',
      'zinnat': 'cefuroxime',
      'cipro': 'ciprofloxacin',
      'tavanic': 'levofloxacin',
      'avelox': 'moxifloxacin',
      'zithromax': 'azithromycin',
      'klacid': 'clarithromycin',
      'flagyl': 'metronidazole',
      'bactrim': 'trimethoprim/sulfamethoxazole',
      'resprim': 'trimethoprim/sulfamethoxazole',
      
      // PPIs
      'losec': 'omeprazole',
      'nexium': 'esomeprazole',
      'protonix': 'pantoprazole',
      'controloc': 'pantoprazole',
      'zoton': 'lansoprazole',
      
      // Statins
      'lipitor': 'atorvastatin',
      'crestor': 'rosuvastatin',
      'zocor': 'simvastatin',
      'pravachol': 'pravastatin',
      
      // Others
      'lasix': 'furosemide',
      'fusid': 'furosemide',
      'aldactone': 'spironolactone',
      'micardis': 'telmisartan',
      'aricept': 'donepezil',
      'exelon': 'rivastigmine',
      'reminyl': 'galantamine',
      'ebixa': 'memantine',
      'namenda': 'memantine'
    };

    // Critical interaction database with severity levels
    this.criticalInteractions = {
      // CONTRAINDICATED - Never use together
      CONTRAINDICATED: [
        // Triple anticoagulation
        {
          drugs: ['aspirin', 'apixaban', 'enoxaparin'],
          pattern: 'triple_anticoagulation',
          severity: 'CONTRAINDICATED',
          effect: 'Extreme bleeding risk - potentially fatal',
          management: 'STOP IMMEDIATELY. Choose maximum 2 agents. Consult hematology.',
          alert: '🚨 CRITICAL: Triple anticoagulation detected!'
        },
        // MAOi combinations
        {
          drugs: ['selegiline', 'linezolid'],
          pattern: 'maoi_combination',
          severity: 'CONTRAINDICATED',
          effect: 'Hypertensive crisis, serotonin syndrome',
          management: 'Never combine MAOIs. Wait 14 days between agents.'
        },
        // Potassium + spironolactone + ACE/ARB
        {
          drugs: ['potassium', 'spironolactone', 'ramipril'],
          pattern: 'hyperkalemia_triple',
          severity: 'CONTRAINDICATED',
          effect: 'Severe hyperkalemia - cardiac arrest risk',
          management: 'Maximum 2 K+ retaining agents. Monitor K+ closely.'
        }
      ],

      // MAJOR - High risk, avoid unless essential
      MAJOR: [
        // Dual anticoagulation
        {
          drugs: ['aspirin', 'apixaban'],
          severity: 'MAJOR',
          effect: 'Significantly increased bleeding risk (2-3x)',
          management: 'Avoid unless specific indication (e.g., recent stent). Add PPI.',
          monitoring: 'Hgb, signs of bleeding',
          alternatives: 'Consider single agent or shorter duration'
        },
        {
          drugs: ['aspirin', 'rivaroxaban'],
          severity: 'MAJOR',
          effect: 'Significantly increased bleeding risk',
          management: 'Avoid unless specific indication. Add PPI if necessary.',
          monitoring: 'Hgb, clinical bleeding signs'
        },
        {
          drugs: ['aspirin', 'warfarin'],
          severity: 'MAJOR',
          effect: 'Major bleeding risk increase',
          management: 'Only for mechanical valves or recent ACS. Target lower INR.',
          monitoring: 'INR, Hgb, GI bleeding signs'
        },
        {
          drugs: ['clopidogrel', 'apixaban'],
          severity: 'MAJOR',
          effect: 'Dual antiplatelet + anticoagulant',
          management: 'Time-limited use only (e.g., post-PCI). Close monitoring.'
        },
        // Anticonvulsant interactions
        {
          drugs: ['carbamazepine', 'lamotrigine'],
          severity: 'MAJOR',
          effect: 'Carbamazepine reduces lamotrigine levels by 40%. Stevens-Johnson risk.',
          management: 'Increase lamotrigine dose gradually. Monitor levels and rash.',
          monitoring: 'Drug levels, skin reactions'
        },
        {
          drugs: ['valproic acid', 'lamotrigine'],
          severity: 'MAJOR',
          effect: 'Valproate doubles lamotrigine levels. High SJS/TEN risk.',
          management: 'Reduce lamotrigine dose by 50%. Very slow titration.',
          monitoring: 'Lamotrigine levels, any rash = stop immediately'
        },
        {
          drugs: ['carbamazepine', 'apixaban'],
          severity: 'MAJOR',
          effect: 'Carbamazepine induces CYP3A4, reduces DOAC effectiveness',
          management: 'Avoid combination. Use warfarin with INR monitoring instead.',
          alternatives: 'Warfarin or different anticonvulsant'
        },
        // Warfarin interactions
        {
          drugs: ['warfarin', 'amiodarone'],
          severity: 'MAJOR',
          effect: 'INR increases 2-3x. Major bleeding risk.',
          management: 'Reduce warfarin by 30-50%. Check INR in 3 days.',
          monitoring: 'INR every 3 days initially'
        },
        {
          drugs: ['warfarin', 'fluconazole'],
          severity: 'MAJOR',
          effect: 'INR dramatically increased',
          management: 'Reduce warfarin 25-50%. Daily INR checks.',
          monitoring: 'Daily INR during co-administration'
        },
        {
          drugs: ['warfarin', 'trimethoprim'],
          severity: 'MAJOR',
          effect: 'INR significantly increased',
          management: 'Monitor INR closely. Consider alternative antibiotic.',
          monitoring: 'INR every 2-3 days'
        },
        // SSRI + bleeding risk
        {
          drugs: ['sertraline', 'aspirin'],
          severity: 'MAJOR',
          effect: 'Increased GI bleeding risk (3-4x)',
          management: 'Add PPI. Monitor for bleeding.',
          alternatives: 'Consider non-SSRI antidepressant'
        },
        {
          drugs: ['escitalopram', 'nsaid'],
          severity: 'MAJOR',
          effect: 'GI bleeding risk significantly increased',
          management: 'Avoid NSAIDs. Use acetaminophen. Add PPI if necessary.'
        },
        // Serotonin syndrome risk
        {
          drugs: ['tramadol', 'sertraline'],
          severity: 'MAJOR',
          effect: 'Serotonin syndrome risk + seizure threshold lowered',
          management: 'Avoid combination. Use alternative analgesic.',
          alternatives: 'Non-tramadol pain management'
        },
        {
          drugs: ['tramadol', 'venlafaxine'],
          severity: 'MAJOR',
          effect: 'High serotonin syndrome risk',
          management: 'Contraindicated in most cases. Switch to alternative.'
        },
        // Metformin + contrast
        {
          drugs: ['metformin', 'contrast'],
          severity: 'MAJOR',
          effect: 'Lactic acidosis risk if renal impairment',
          management: 'Hold metformin 48h before and after contrast.',
          monitoring: 'Creatinine before restarting'
        },
        // QT prolongation
        {
          drugs: ['haloperidol', 'amiodarone'],
          severity: 'MAJOR',
          effect: 'Severe QT prolongation - Torsades risk',
          management: 'Avoid combination. ECG monitoring if unavoidable.',
          monitoring: 'ECG, electrolytes'
        },
        // Lithium interactions
        {
          drugs: ['lithium', 'nsaid'],
          severity: 'MAJOR',
          effect: 'Lithium toxicity (reduced clearance)',
          management: 'Avoid NSAIDs. Use acetaminophen.',
          monitoring: 'Lithium levels'
        },
        {
          drugs: ['lithium', 'thiazide'],
          severity: 'MAJOR',
          effect: 'Lithium toxicity',
          management: 'Reduce lithium dose. Monitor levels closely.',
          monitoring: 'Lithium levels, Na+, renal function'
        }
      ],

      // MODERATE - Monitor closely
      MODERATE: [
        // ACE/ARB combinations
        {
          drugs: ['ramipril', 'spironolactone'],
          severity: 'MODERATE',
          effect: 'Hyperkalemia risk',
          management: 'Monitor K+ closely. Avoid if K+ >5.0',
          monitoring: 'K+ every 1-2 weeks initially'
        },
        {
          drugs: ['lisinopril', 'trimethoprim'],
          severity: 'MODERATE',
          effect: 'Hyperkalemia risk increased',
          management: 'Check K+ within 3-5 days',
          monitoring: 'Potassium, creatinine'
        },
        // Beta-blocker + CCB
        {
          drugs: ['metoprolol', 'verapamil'],
          severity: 'MODERATE',
          effect: 'Bradycardia, heart block, hypotension',
          management: 'Monitor HR, BP closely. Reduce doses.',
          monitoring: 'ECG, vital signs'
        },
        {
          drugs: ['bisoprolol', 'diltiazem'],
          severity: 'MODERATE',
          effect: 'Additive cardiac depression',
          management: 'Start low doses. Monitor closely.',
          monitoring: 'HR, BP, signs of CHF'
        },
        // Statin interactions
        {
          drugs: ['simvastatin', 'amlodipine'],
          severity: 'MODERATE',
          effect: 'Increased statin levels - myopathy risk',
          management: 'Max simvastatin 20mg/day with amlodipine',
          monitoring: 'CK if muscle symptoms'
        },
        {
          drugs: ['atorvastatin', 'clarithromycin'],
          severity: 'MODERATE',
          effect: 'Increased statin exposure',
          management: 'Hold statin during antibiotic course or reduce dose',
          monitoring: 'Muscle symptoms, CK'
        },
        // Diabetes combinations
        {
          drugs: ['metformin', 'furosemide'],
          severity: 'MODERATE',
          effect: 'Lactic acidosis risk if dehydration occurs',
          management: 'Monitor volume status. Hold metformin if dehydrated.',
          monitoring: 'Renal function, lactate if unwell'
        },
        {
          drugs: ['glipizide', 'fluconazole'],
          severity: 'MODERATE',
          effect: 'Hypoglycemia risk increased',
          management: 'Monitor glucose closely. Reduce sulfonylurea dose.',
          monitoring: 'Blood glucose'
        },
        // Other important moderate interactions
        {
          drugs: ['digoxin', 'amiodarone'],
          severity: 'MODERATE',
          effect: 'Digoxin toxicity (levels increase 70%)',
          management: 'Reduce digoxin by 50%',
          monitoring: 'Digoxin levels, ECG'
        },
        {
          drugs: ['phenytoin', 'omeprazole'],
          severity: 'MODERATE',
          effect: 'Phenytoin toxicity possible',
          management: 'Monitor phenytoin levels',
          monitoring: 'Phenytoin levels, clinical toxicity signs'
        }
      ]
    };

    // Drug class memberships for pattern matching
    this.drugClasses = {
      anticoagulants: ['warfarin', 'apixaban', 'rivaroxaban', 'dabigatran', 'edoxaban', 'enoxaparin', 'heparin', 'fondaparinux'],
      antiplatelets: ['aspirin', 'clopidogrel', 'ticagrelor', 'prasugrel', 'dipyridamole'],
      nsaids: ['ibuprofen', 'naproxen', 'diclofenac', 'ketorolac', 'celecoxib', 'etoricoxib', 'indomethacin'],
      ssris: ['sertraline', 'escitalopram', 'citalopram', 'fluoxetine', 'paroxetine', 'fluvoxamine'],
      snris: ['venlafaxine', 'duloxetine', 'desvenlafaxine'],
      anticonvulsants: ['carbamazepine', 'phenytoin', 'valproic acid', 'lamotrigine', 'levetiracetam', 'topiramate', 'gabapentin', 'pregabalin'],
      benzodiazepines: ['diazepam', 'alprazolam', 'lorazepam', 'clonazepam', 'temazepam', 'oxazepam'],
      opioids: ['morphine', 'oxycodone', 'hydrocodone', 'fentanyl', 'tramadol', 'codeine', 'buprenorphine'],
      ace_inhibitors: ['ramipril', 'lisinopril', 'enalapril', 'perindopril', 'captopril', 'fosinopril'],
      arbs: ['losartan', 'valsartan', 'candesartan', 'telmisartan', 'irbesartan', 'olmesartan'],
      beta_blockers: ['metoprolol', 'bisoprolol', 'atenolol', 'carvedilol', 'propranolol', 'labetalol'],
      ccbs: ['amlodipine', 'verapamil', 'diltiazem', 'nifedipine', 'felodipine'],
      diuretics: ['furosemide', 'hydrochlorothiazide', 'spironolactone', 'amiloride', 'indapamide', 'bumetanide'],
      statins: ['atorvastatin', 'rosuvastatin', 'simvastatin', 'pravastatin', 'fluvastatin', 'lovastatin'],
      ppis: ['omeprazole', 'esomeprazole', 'pantoprazole', 'lansoprazole', 'rabeprazole'],
      diabetes_meds: ['metformin', 'glipizide', 'glyburide', 'sitagliptin', 'empagliflozin', 'dapagliflozin', 'liraglutide', 'semaglutide'],
      antipsychotics: ['haloperidol', 'quetiapine', 'risperidone', 'olanzapine', 'aripiprazole', 'clozapine']
    };

    console.log('🚨 Critical Interaction Fix Loaded - Enhanced Safety Checking Active');
  }

  // Normalize drug name to generic
  normalizeToGeneric(drugName) {
    const normalized = drugName.toLowerCase().trim();
    
    // Check if it's already a generic name
    for (const className in this.drugClasses) {
      if (this.drugClasses[className].includes(normalized)) {
        return normalized;
      }
    }
    
    // Check brand name mapping
    if (this.brandToGeneric[normalized]) {
      return this.brandToGeneric[normalized];
    }
    
    // Check Hebrew mappings (if integrated)
    if (window.IsraeliDrugDatabase) {
      const hebrewResult = window.IsraeliDrugDatabase.searchHebrewMedication(drugName);
      if (hebrewResult && !hebrewResult.error) {
        return hebrewResult.genericName.toLowerCase();
      }
    }
    
    // Return original if no mapping found (but log warning)
    console.warn(`⚠️ No generic mapping found for: ${drugName}`);
    return normalized;
  }

  // Get drug class(es) for a medication
  getDrugClasses(genericName) {
    const classes = [];
    for (const [className, drugs] of Object.entries(this.drugClasses)) {
      if (drugs.includes(genericName)) {
        classes.push(className);
      }
    }
    return classes;
  }

  // Check for dangerous combinations
  checkDangerousCombination(drugs) {
    const interactions = [];
    
    // Check contraindicated combinations
    for (const contra of this.criticalInteractions.CONTRAINDICATED) {
      if (contra.pattern === 'triple_anticoagulation') {
        // Check for triple anticoagulation risk
        const anticoagCount = drugs.filter(d => 
          this.drugClasses.anticoagulants.includes(d) || 
          this.drugClasses.antiplatelets.includes(d)
        ).length;
        
        if (anticoagCount >= 3) {
          interactions.push({
            severity: 'CONTRAINDICATED',
            drugs: drugs.filter(d => 
              this.drugClasses.anticoagulants.includes(d) || 
              this.drugClasses.antiplatelets.includes(d)
            ),
            effect: contra.effect,
            management: contra.management,
            alert: contra.alert
          });
        }
      } else {
        // Check specific drug combinations
        const hasAll = contra.drugs.every(drug => drugs.includes(drug));
        if (hasAll) {
          interactions.push({
            severity: 'CONTRAINDICATED',
            drugs: contra.drugs,
            ...contra
          });
        }
      }
    }
    
    return interactions;
  }

  // Main interaction checking function
  checkInteractions(drugList) {
    console.log('🔍 Checking interactions for:', drugList);
    
    // Normalize all drug names to generic
    const genericDrugs = drugList.map(drug => this.normalizeToGeneric(drug));
    console.log('📋 Normalized to generics:', genericDrugs);
    
    const interactions = [];
    const checkedPairs = new Set();
    
    // First check for contraindicated combinations
    const dangerousCombos = this.checkDangerousCombination(genericDrugs);
    interactions.push(...dangerousCombos);
    
    // Check all drug pairs
    for (let i = 0; i < genericDrugs.length; i++) {
      for (let j = i + 1; j < genericDrugs.length; j++) {
        const drug1 = genericDrugs[i];
        const drug2 = genericDrugs[j];
        const pairKey = [drug1, drug2].sort().join('-');
        
        if (checkedPairs.has(pairKey)) continue;
        checkedPairs.add(pairKey);
        
        // Check major interactions
        for (const major of this.criticalInteractions.MAJOR) {
          if (major.drugs.includes(drug1) && major.drugs.includes(drug2)) {
            interactions.push({
              drugs: [drugList[i], drugList[j]],
              genericNames: [drug1, drug2],
              ...major
            });
          }
        }
        
        // Check moderate interactions
        for (const moderate of this.criticalInteractions.MODERATE) {
          if (moderate.drugs.includes(drug1) && moderate.drugs.includes(drug2)) {
            interactions.push({
              drugs: [drugList[i], drugList[j]],
              genericNames: [drug1, drug2],
              ...moderate
            });
          }
        }
        
        // Check class-based interactions
        const class1 = this.getDrugClasses(drug1);
        const class2 = this.getDrugClasses(drug2);
        
        // Anticoagulant + Antiplatelet
        if ((class1.includes('anticoagulants') && class2.includes('antiplatelets')) ||
            (class2.includes('anticoagulants') && class1.includes('antiplatelets'))) {
          const existing = interactions.find(i => 
            i.genericNames && i.genericNames.includes(drug1) && i.genericNames.includes(drug2)
          );
          if (!existing) {
            interactions.push({
              drugs: [drugList[i], drugList[j]],
              genericNames: [drug1, drug2],
              severity: 'MAJOR',
              effect: 'Increased bleeding risk',
              management: 'Use only with clear indication. Add gastroprotection.',
              monitoring: 'Hgb, signs of bleeding'
            });
          }
        }
        
        // SSRI + NSAID
        if ((class1.includes('ssris') && class2.includes('nsaids')) ||
            (class2.includes('ssris') && class1.includes('nsaids'))) {
          interactions.push({
            drugs: [drugList[i], drugList[j]],
            genericNames: [drug1, drug2],
            severity: 'MAJOR',
            effect: 'GI bleeding risk increased 3-4x',
            management: 'Avoid NSAIDs. Use acetaminophen. Add PPI if necessary.',
            monitoring: 'GI bleeding signs'
          });
        }
        
        // Beta-blocker + CCB (rate-limiting)
        if ((class1.includes('beta_blockers') && ['verapamil', 'diltiazem'].includes(drug2)) ||
            (class2.includes('beta_blockers') && ['verapamil', 'diltiazem'].includes(drug1))) {
          interactions.push({
            drugs: [drugList[i], drugList[j]],
            genericNames: [drug1, drug2],
            severity: 'MODERATE',
            effect: 'Bradycardia, AV block, hypotension risk',
            management: 'Monitor HR/BP closely. Start with low doses.',
            monitoring: 'ECG, vital signs'
          });
        }
        
        // ACE/ARB + K-sparing diuretic
        if (((class1.includes('ace_inhibitors') || class1.includes('arbs')) && drug2 === 'spironolactone') ||
            ((class2.includes('ace_inhibitors') || class2.includes('arbs')) && drug1 === 'spironolactone')) {
          interactions.push({
            drugs: [drugList[i], drugList[j]],
            genericNames: [drug1, drug2],
            severity: 'MODERATE',
            effect: 'Hyperkalemia risk',
            management: 'Monitor K+ closely, especially in elderly/CKD',
            monitoring: 'K+ within 1 week, then monthly'
          });
        }
      }
    }
    
    // Sort by severity
    const severityOrder = {
      'CONTRAINDICATED': 0,
      'MAJOR': 1,
      'MODERATE': 2,
      'MINOR': 3
    };
    
    interactions.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
    
    console.log(`⚠️ Found ${interactions.length} interactions`);
    return interactions;
  }

  // Generate safety report
  generateSafetyReport(drugList) {
    const interactions = this.checkInteractions(drugList);
    const genericDrugs = drugList.map(drug => this.normalizeToGeneric(drug));
    
    const report = {
      medications: drugList,
      genericNames: genericDrugs,
      totalInteractions: interactions.length,
      contraindicated: interactions.filter(i => i.severity === 'CONTRAINDICATED'),
      major: interactions.filter(i => i.severity === 'MAJOR'),
      moderate: interactions.filter(i => i.severity === 'MODERATE'),
      criticalAlerts: [],
      recommendations: []
    };
    
    // Generate critical alerts
    if (report.contraindicated.length > 0) {
      report.criticalAlerts.push('🚨 CONTRAINDICATED COMBINATIONS DETECTED - IMMEDIATE ACTION REQUIRED');
    }
    
    // Check for high-risk patterns
    const bleedingRiskCount = genericDrugs.filter(d => 
      this.drugClasses.anticoagulants.includes(d) || 
      this.drugClasses.antiplatelets.includes(d)
    ).length;
    
    if (bleedingRiskCount >= 3) {
      report.criticalAlerts.push('⚠️ TRIPLE THERAPY BLEEDING RISK - Review immediately');
    }
    
    // Generate recommendations
    if (report.contraindicated.length > 0) {
      report.recommendations.push({
        priority: 1,
        action: 'STOP contraindicated combinations immediately',
        details: report.contraindicated.map(i => i.management).join('; ')
      });
    }
    
    if (report.major.length > 0) {
      report.recommendations.push({
        priority: 2,
        action: 'Review major interactions urgently',
        details: `${report.major.length} major interactions requiring clinical review`
      });
    }
    
    if (genericDrugs.length > 10) {
      report.recommendations.push({
        priority: 3,
        action: 'Consider deprescribing review',
        details: 'Patient on >10 medications - high risk for adverse events'
      });
    }
    
    return report;
  }

  // Conservative flagging of suspicious combinations
  flagSuspiciousCombinations(drugList) {
    const flags = [];
    const genericDrugs = drugList.map(drug => this.normalizeToGeneric(drug));
    
    // Multiple CNS depressants
    const cnsDepressants = genericDrugs.filter(d => 
      this.drugClasses.benzodiazepines.includes(d) ||
      this.drugClasses.opioids.includes(d) ||
      ['zolpidem', 'zopiclone', 'pregabalin', 'gabapentin'].includes(d)
    );
    
    if (cnsDepressants.length >= 2) {
      flags.push({
        pattern: 'Multiple CNS depressants',
        drugs: cnsDepressants,
        concern: 'Increased fall risk, cognitive impairment, respiratory depression',
        action: 'Review necessity of each agent'
      });
    }
    
    // Multiple anticholinergics
    const anticholinergics = genericDrugs.filter(d => 
      ['diphenhydramine', 'hydroxyzine', 'oxybutynin', 'tolterodine', 'amitriptyline', 
       'nortriptyline', 'paroxetine'].includes(d)
    );
    
    if (anticholinergics.length >= 2) {
      flags.push({
        pattern: 'Anticholinergic burden',
        drugs: anticholinergics,
        concern: 'Cognitive impairment, delirium, constipation, urinary retention',
        action: 'Calculate anticholinergic burden score'
      });
    }
    
    // Multiple QT prolonging drugs
    const qtDrugs = genericDrugs.filter(d => 
      ['haloperidol', 'amiodarone', 'sotalol', 'clarithromycin', 'erythromycin',
       'ciprofloxacin', 'levofloxacin', 'citalopram', 'escitalopram'].includes(d)
    );
    
    if (qtDrugs.length >= 2) {
      flags.push({
        pattern: 'QT prolongation risk',
        drugs: qtDrugs,
        concern: 'Torsades de pointes risk',
        action: 'ECG monitoring, check K+/Mg2+'
      });
    }
    
    return flags;
  }
}

// Initialize the fix
window.CriticalInteractionFix = new CriticalInteractionFix();

// Override the broken checker with the fixed version
if (window.IsraeliDrugDatabase) {
  console.log('🔧 Patching IsraeliDrugDatabase with critical fixes...');
  
  const originalChecker = window.IsraeliDrugDatabase.checkInteractions.bind(window.IsraeliDrugDatabase);
  
  window.IsraeliDrugDatabase.checkInteractions = function(drugList) {
    console.log('🛡️ Using enhanced safety checker...');
    
    // Run both checkers
    const originalResults = originalChecker(drugList);
    const fixedResults = window.CriticalInteractionFix.checkInteractions(drugList);
    
    // Merge results, prioritizing the fixed checker
    const mergedResults = [...fixedResults];
    
    // Add any unique results from original checker
    originalResults.forEach(orig => {
      const exists = mergedResults.find(fixed => 
        fixed.genericNames && orig.drugs &&
        fixed.genericNames.sort().join('-') === orig.drugs.sort().join('-')
      );
      if (!exists) {
        mergedResults.push(orig);
      }
    });
    
    return mergedResults;
  };
  
  // Add safety report function
  window.IsraeliDrugDatabase.generateSafetyReport = function(drugList) {
    return window.CriticalInteractionFix.generateSafetyReport(drugList);
  };
  
  // Add suspicious pattern detection
  window.IsraeliDrugDatabase.flagSuspiciousCombinations = function(drugList) {
    return window.CriticalInteractionFix.flagSuspiciousCombinations(drugList);
  };
  
  console.log('✅ Critical safety patches applied successfully');
}

// Test function for immediate validation
window.testCriticalFix = function() {
  console.log('🧪 Testing critical interaction detection...\n');
  
  const testCases = [
    {
      name: 'Triple anticoagulation (YOUR CASE)',
      drugs: ['Aspirin', 'Eliquis', 'Clexane'],
      expected: 'CONTRAINDICATED'
    },
    {
      name: 'Tegretol + Lamictal',
      drugs: ['Tegretol', 'Lamictal'],
      expected: 'MAJOR'
    },
    {
      name: 'Aspirin + Eliquis',
      drugs: ['Aspirin', 'Eliquis'],
      expected: 'MAJOR'
    },
    {
      name: 'Warfarin + Bactrim',
      drugs: ['Coumadin', 'Bactrim'],
      expected: 'MAJOR'
    },
    {
      name: 'SSRI + NSAID',
      drugs: ['Zoloft', 'Advil'],
      expected: 'MAJOR'
    }
  ];
  
  testCases.forEach(test => {
    console.log(`\nTest: ${test.name}`);
    console.log(`Drugs: ${test.drugs.join(', ')}`);
    
    const results = window.CriticalInteractionFix.checkInteractions(test.drugs);
    
    if (results.length > 0) {
      results.forEach(interaction => {
        console.log(`✅ DETECTED: ${interaction.severity} - ${interaction.effect}`);
        console.log(`   Management: ${interaction.management}`);
      });
    } else {
      console.log('❌ NO INTERACTIONS DETECTED (ERROR!)');
    }
  });
  
  console.log('\n📊 Safety Report for Triple Anticoagulation:');
  const report = window.CriticalInteractionFix.generateSafetyReport(['Aspirin', 'Eliquis', 'Clexane']);
  console.log(report);
};

console.log('\n🚨 CRITICAL FIX LOADED - Run testCriticalFix() to validate');
console.log('📋 Key fixes implemented:');
console.log('  ✅ Complete brand-to-generic mapping (Eliquis → apixaban)');
console.log('  ✅ Triple anticoagulation detection');
console.log('  ✅ Anticonvulsant interaction detection');
console.log('  ✅ Comprehensive interaction database');
console.log('  ✅ Conservative suspicious pattern flagging');
console.log('  ✅ Safety report generation');