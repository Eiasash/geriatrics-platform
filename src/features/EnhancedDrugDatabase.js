// Enhanced Drug Database with Renal Dosing and Drug Burden Calculations
// Comprehensive drug management for geriatric patients

export const EnhancedDrugDatabase = {
  // Renal dosing calculator
  renalDosing: {
    // Calculate creatinine clearance
    calculateCrCl(age, weight, creatinine, sex) {
      // Cockcroft-Gault formula
      let crCl = ((140 - age) * weight) / (72 * creatinine);
      if (sex === 'female') {
        crCl *= 0.85;
      }
      return Math.round(crCl);
    },

    // Get CKD stage
    getCKDStage(gfr) {
      if (gfr >= 90) return { stage: '1', description: 'Normal or high' };
      if (gfr >= 60) return { stage: '2', description: 'Mildly decreased' };
      if (gfr >= 45) return { stage: '3a', description: 'Mild to moderately decreased' };
      if (gfr >= 30) return { stage: '3b', description: 'Moderately to severely decreased' };
      if (gfr >= 15) return { stage: '4', description: 'Severely decreased' };
      return { stage: '5', description: 'Kidney failure' };
    },

    // Drug-specific renal adjustments
    adjustments: {
      // Antibiotics
      'amoxicillin': {
        normal: '500mg TID',
        mild: '500mg TID',
        moderate: '500mg BID',
        severe: '500mg daily',
        dialysis: '500mg daily, dose after HD'
      },
      'ciprofloxacin': {
        normal: '500mg BID',
        mild: '500mg BID',
        moderate: '250-500mg BID',
        severe: '250-500mg daily',
        dialysis: '250-500mg daily, dose after HD'
      },
      'levofloxacin': {
        normal: '500mg daily',
        mild: '500mg daily',
        moderate: '500mg q48h',
        severe: '250mg q48h',
        dialysis: '250mg q48h, dose after HD'
      },
      'cefepime': {
        normal: '2g q8h',
        mild: '2g q12h',
        moderate: '2g q24h',
        severe: '1g q24h',
        dialysis: '1g daily, dose after HD'
      },
      'vancomycin': {
        normal: '15-20mg/kg q8-12h',
        mild: '15-20mg/kg q12h',
        moderate: '15-20mg/kg q24h',
        severe: '15-20mg/kg q48h',
        dialysis: 'Load 15-20mg/kg, redose by levels'
      },
      'piperacillin-tazobactam': {
        normal: '4.5g q6h',
        mild: '4.5g q6h',
        moderate: '3.375g q6h',
        severe: '2.25g q6h',
        dialysis: '2.25g q8h, dose after HD'
      },

      // Antivirals
      'acyclovir': {
        normal: '400mg TID',
        mild: '400mg TID',
        moderate: '400mg BID',
        severe: '400mg daily',
        dialysis: '400mg daily, dose after HD'
      },
      'valacyclovir': {
        normal: '1g BID',
        mild: '1g BID',
        moderate: '1g daily',
        severe: '500mg daily',
        dialysis: '500mg daily, dose after HD'
      },
      'oseltamivir': {
        normal: '75mg BID',
        mild: '75mg BID',
        moderate: '75mg daily',
        severe: '75mg q48h',
        dialysis: '30mg after each HD'
      },

      // Cardiovascular
      'atenolol': {
        normal: '50-100mg daily',
        mild: '50-100mg daily',
        moderate: '50mg daily',
        severe: '25mg daily',
        dialysis: '25-50mg after HD'
      },
      'sotalol': {
        normal: '80mg BID',
        mild: '80mg BID',
        moderate: '80mg daily',
        severe: 'Avoid',
        dialysis: 'Avoid'
      },
      'digoxin': {
        normal: '0.125-0.25mg daily',
        mild: '0.125mg daily',
        moderate: '0.125mg daily or QOD',
        severe: '0.0625mg daily',
        dialysis: '0.0625mg daily, not removed by HD'
      },

      // Diabetes medications
      'metformin': {
        normal: '500-2000mg daily',
        mild: '500-2000mg daily',
        moderate: 'Max 1000mg daily',
        severe: 'Contraindicated',
        dialysis: 'Contraindicated'
      },
      'glipizide': {
        normal: '5-20mg daily',
        mild: '5-20mg daily',
        moderate: 'Start 2.5mg daily',
        severe: 'Start 2.5mg daily',
        dialysis: 'Start 2.5mg daily'
      },
      'sitagliptin': {
        normal: '100mg daily',
        mild: '100mg daily',
        moderate: '50mg daily',
        severe: '25mg daily',
        dialysis: '25mg daily'
      },

      // Pain medications
      'gabapentin': {
        normal: '300-1200mg TID',
        mild: '300-1200mg TID',
        moderate: '200-700mg BID',
        severe: '100-300mg daily',
        dialysis: '100-300mg after HD'
      },
      'pregabalin': {
        normal: '75-300mg BID',
        mild: '75-300mg BID',
        moderate: '50-150mg BID',
        severe: '25-75mg daily',
        dialysis: '25-75mg daily, supplement after HD'
      },
      'tramadol': {
        normal: '50-100mg q6h',
        mild: '50-100mg q6h',
        moderate: '50mg q8h',
        severe: '50mg q12h',
        dialysis: '50mg q12h, not removed by HD'
      },

      // H2 blockers and PPIs
      'famotidine': {
        normal: '20mg BID',
        mild: '20mg BID',
        moderate: '20mg daily',
        severe: '20mg q48h',
        dialysis: '20mg q48h'
      },
      'ranitidine': {
        normal: '150mg BID',
        mild: '150mg BID',
        moderate: '150mg daily',
        severe: '150mg q48h',
        dialysis: '150mg q48h'
      },

      // Anticoagulants
      'enoxaparin': {
        normal: '1mg/kg BID or 1.5mg/kg daily',
        mild: '1mg/kg BID or 1.5mg/kg daily',
        moderate: '1mg/kg daily',
        severe: '1mg/kg daily',
        dialysis: '1mg/kg daily, monitor anti-Xa'
      },
      'dabigatran': {
        normal: '150mg BID',
        mild: '150mg BID',
        moderate: '110mg BID',
        severe: 'Contraindicated',
        dialysis: 'Contraindicated'
      },
      'rivaroxaban': {
        normal: '20mg daily',
        mild: '20mg daily',
        moderate: '15mg daily',
        severe: 'Avoid',
        dialysis: 'Avoid'
      },
      'apixaban': {
        normal: '5mg BID',
        mild: '5mg BID',
        moderate: '5mg BID (or 2.5mg if criteria met)',
        severe: '2.5mg BID',
        dialysis: '2.5mg BID'
      }
    },

    // Calculate adjusted dose
    calculate(drug, gfr) {
      const adjustments = this.adjustments[drug.toLowerCase()];
      if (!adjustments) return null;

      let renalCategory;
      if (gfr >= 50) renalCategory = 'normal';
      else if (gfr >= 30) renalCategory = 'mild';
      else if (gfr >= 15) renalCategory = 'moderate';
      else if (gfr > 0) renalCategory = 'severe';
      else renalCategory = 'dialysis';

      return {
        drug,
        gfr,
        ckdStage: this.getCKDStage(gfr),
        standardDose: adjustments.normal,
        adjustedDose: adjustments[renalCategory],
        category: renalCategory,
        needsAdjustment: renalCategory !== 'normal',
        monitoring: this.getMonitoring(drug, renalCategory)
      };
    },

    // Get monitoring requirements
    getMonitoring(drug, renalCategory) {
      const monitoring = {
        'vancomycin': 'Trough levels, renal function',
        'digoxin': 'Digoxin levels, K+, renal function',
        'aminoglycosides': 'Peak and trough levels, renal function, hearing',
        'lithium': 'Lithium levels q3-6 months, renal function, thyroid'
      };

      // Check drug class
      if (drug.includes('mycin') || drug.includes('micin')) {
        return monitoring.aminoglycosides;
      }

      return monitoring[drug] || 'Renal function periodically';
    }
  },

  // Drug Burden Index Calculator
  drugBurdenIndex: {
    // Anticholinergic Burden Scale
    anticholinergicBurden: {
      score1: [
        'alprazolam', 'aripiprazole', 'atenolol', 'captopril', 'cimetidine',
        'clorazepate', 'codeine', 'colchicine', 'diazepam', 'digoxin',
        'dipyridamole', 'fentanyl', 'furosemide', 'haloperidol', 'hydralazine',
        'hydrocortisone', 'isosorbide', 'loperamide', 'metoprolol', 'morphine',
        'nifedipine', 'prednisone', 'quinidine', 'ranitidine', 'risperidone',
        'theophylline', 'trazodone', 'triamterene', 'warfarin'
      ],
      score2: [
        'amantadine', 'belladonna', 'carbamazepine', 'cyclobenzaprine', 'cyproheptadine',
        'loxapine', 'meperidine', 'methotrimeprazine', 'molindone', 'nortriptyline',
        'oxcarbazepine', 'pimozide'
      ],
      score3: [
        'amitriptyline', 'atropine', 'benztropine', 'brompheniramine', 'carbinoxamine',
        'chlorpheniramine', 'chlorpromazine', 'clemastine', 'clomipramine', 'clozapine',
        'darifenacin', 'desipramine', 'dicyclomine', 'dimenhydrinate', 'diphenhydramine',
        'doxepin', 'doxylamine', 'fesoterodine', 'flavoxate', 'hydroxyzine',
        'hyoscyamine', 'imipramine', 'meclizine', 'methocarbamol', 'olanzapine',
        'orphenadrine', 'oxybutynin', 'paroxetine', 'perphenazine', 'promethazine',
        'propantheline', 'quetiapine', 'scopolamine', 'solifenacin', 'thioridazine',
        'tolterodine', 'trifluoperazine', 'trihexyphenidyl', 'trimipramine', 'trospium'
      ]
    },

    // Sedative Burden
    sedativeBurden: {
      sedatives: [
        'alprazolam', 'clonazepam', 'diazepam', 'lorazepam', 'temazepam', 'triazolam',
        'zolpidem', 'zopiclone', 'eszopiclone', 'zaleplon',
        'amitriptyline', 'doxepin', 'imipramine', 'nortriptyline', 'trazodone',
        'mirtazapine', 'quetiapine', 'olanzapine', 'risperidone', 'haloperidol',
        'chlorpromazine', 'gabapentin', 'pregabalin',
        'diphenhydramine', 'hydroxyzine', 'promethazine',
        'codeine', 'morphine', 'oxycodone', 'hydrocodone', 'fentanyl', 'tramadol'
      ]
    },

    // Calculate total anticholinergic burden
    calculateACB(medications) {
      let totalScore = 0;
      const details = [];

      medications.forEach(med => {
        const medLower = med.toLowerCase();
        let score = 0;

        if (this.anticholinergicBurden.score3.includes(medLower)) {
          score = 3;
        } else if (this.anticholinergicBurden.score2.includes(medLower)) {
          score = 2;
        } else if (this.anticholinergicBurden.score1.includes(medLower)) {
          score = 1;
        }

        if (score > 0) {
          totalScore += score;
          details.push({ medication: med, score });
        }
      });

      return {
        totalScore,
        risk: this.interpretACBScore(totalScore),
        details,
        recommendations: this.getACBRecommendations(totalScore)
      };
    },

    interpretACBScore(score) {
      if (score === 0) return 'No anticholinergic burden';
      if (score <= 2) return 'Low anticholinergic burden';
      if (score <= 4) return 'Moderate anticholinergic burden';
      return 'High anticholinergic burden';
    },

    getACBRecommendations(score) {
      const recs = [];
      
      if (score >= 3) {
        recs.push('Consider deprescribing anticholinergic medications');
        recs.push('Monitor for cognitive decline, falls, constipation');
        recs.push('Assess for delirium regularly');
      } else if (score >= 2) {
        recs.push('Review necessity of anticholinergic medications');
        recs.push('Monitor cognitive function');
      }
      
      if (score > 0) {
        recs.push('Educate about anticholinergic side effects');
        recs.push('Consider non-pharmacologic alternatives');
      }
      
      return recs;
    },

    // Calculate sedative burden
    calculateSedativeBurden(medications) {
      let count = 0;
      const sedativeList = [];

      medications.forEach(med => {
        const medLower = med.toLowerCase();
        if (this.sedativeBurden.sedatives.includes(medLower)) {
          count++;
          sedativeList.push(med);
        }
      });

      return {
        count,
        medications: sedativeList,
        risk: this.interpretSedativeBurden(count),
        fallRisk: this.calculateFallRisk(count),
        recommendations: this.getSedativeRecommendations(count)
      };
    },

    interpretSedativeBurden(count) {
      if (count === 0) return 'No sedative burden';
      if (count === 1) return 'Low sedative burden';
      if (count === 2) return 'Moderate sedative burden';
      return 'High sedative burden';
    },

    calculateFallRisk(sedativeCount) {
      // Each sedative increases fall risk by approximately 30%
      const baseRisk = 0.2; // 20% baseline fall risk in elderly
      const increasedRisk = baseRisk * Math.pow(1.3, sedativeCount);
      return {
        percentage: (increasedRisk * 100).toFixed(1),
        category: increasedRisk < 0.3 ? 'Low' : increasedRisk < 0.5 ? 'Moderate' : 'High'
      };
    },

    getSedativeRecommendations(count) {
      const recs = [];
      
      if (count >= 2) {
        recs.push('High fall risk - implement fall prevention measures');
        recs.push('Consider tapering sedatives sequentially');
        recs.push('Avoid adding new sedatives');
      } else if (count === 1) {
        recs.push('Monitor for sedation and falls');
        recs.push('Use lowest effective dose');
      }
      
      if (count > 0) {
        recs.push('Educate about fall prevention');
        recs.push('Consider non-pharmacologic sleep aids');
        recs.push('Regular medication review');
      }
      
      return recs;
    },

    // Calculate total drug burden
    calculateTotalBurden(medications) {
      const acb = this.calculateACB(medications);
      const sedative = this.calculateSedativeBurden(medications);
      
      // Combined risk score
      const combinedScore = acb.totalScore + (sedative.count * 2);
      
      return {
        anticholinergic: acb,
        sedative,
        combinedScore,
        overallRisk: this.interpretCombinedRisk(combinedScore),
        polypharmacy: medications.length >= 5,
        totalMedications: medications.length,
        priorityInterventions: this.getPriorityInterventions(acb, sedative, medications.length)
      };
    },

    interpretCombinedRisk(score) {
      if (score === 0) return 'Minimal drug burden';
      if (score <= 3) return 'Low drug burden';
      if (score <= 6) return 'Moderate drug burden';
      return 'High drug burden - intervention needed';
    },

    getPriorityInterventions(acb, sedative, medCount) {
      const interventions = [];
      
      // Priority 1: High-risk combinations
      if (acb.totalScore >= 3 && sedative.count >= 2) {
        interventions.push({
          priority: 'URGENT',
          action: 'Review all medications immediately - high risk of adverse events'
        });
      }
      
      // Priority 2: Polypharmacy
      if (medCount >= 10) {
        interventions.push({
          priority: 'HIGH',
          action: 'Comprehensive medication review with deprescribing'
        });
      }
      
      // Priority 3: Specific risks
      if (acb.totalScore >= 3) {
        interventions.push({
          priority: 'MEDIUM',
          action: 'Reduce anticholinergic burden - risk of cognitive decline'
        });
      }
      
      if (sedative.count >= 2) {
        interventions.push({
          priority: 'MEDIUM',
          action: 'Reduce sedative burden - high fall risk'
        });
      }
      
      return interventions;
    }
  },

  // Cost Optimizer
  costOptimizer: {
    // Generic alternatives database
    brandToGeneric: {
      'Eliquis': { generic: 'apixaban', available: false },
      'Xarelto': { generic: 'rivaroxaban', available: false },
      'Pradaxa': { generic: 'dabigatran', available: false },
      'Lipitor': { generic: 'atorvastatin', available: true },
      'Crestor': { generic: 'rosuvastatin', available: true },
      'Nexium': { generic: 'esomeprazole', available: true },
      'Plavix': { generic: 'clopidogrel', available: true },
      'Singulair': { generic: 'montelukast', available: true },
      'Synthroid': { generic: 'levothyroxine', available: true },
      'Norvasc': { generic: 'amlodipine', available: true },
      'Glucophage': { generic: 'metformin', available: true },
      'Zestril': { generic: 'lisinopril', available: true },
      'Toprol XL': { generic: 'metoprolol succinate', available: true },
      'Ambien': { generic: 'zolpidem', available: true },
      'Xanax': { generic: 'alprazolam', available: true },
      'Ativan': { generic: 'lorazepam', available: true },
      'Aricept': { generic: 'donepezil', available: true },
      'Namenda': { generic: 'memantine', available: true },
      'Seroquel': { generic: 'quetiapine', available: true },
      'Risperdal': { generic: 'risperidone', available: true }
    },

    // Israeli Sal (basket) coverage
    salCoverage: {
      // Full coverage
      full: [
        'metformin', 'glipizide', 'insulin',
        'lisinopril', 'enalapril', 'ramipril',
        'amlodipine', 'bisoprolol', 'carvedilol',
        'atorvastatin', 'simvastatin', 'rosuvastatin',
        'furosemide', 'hydrochlorothiazide', 'spironolactone',
        'warfarin', 'clopidogrel', 'aspirin',
        'omeprazole', 'pantoprazole', 'ranitidine',
        'levothyroxine', 'metoprolol', 'propranolol'
      ],
      // Partial coverage with criteria
      partial: [
        'apixaban', 'rivaroxaban', 'dabigatran',
        'donepezil', 'memantine', 'rivastigmine',
        'quetiapine', 'risperidone', 'olanzapine',
        'pregabalin', 'duloxetine', 'venlafaxine',
        'sacubitril-valsartan', 'empagliflozin', 'dapagliflozin'
      ],
      // Not covered
      notCovered: [
        'eszopiclone', 'zolpidem', 'supplements',
        'branded when generic available'
      ]
    },

    // Find cheaper alternatives
    findCheaper(medication) {
      const alternatives = [];
      const medLower = medication.toLowerCase();

      // Check for generic
      const brandInfo = this.brandToGeneric[medication];
      if (brandInfo && brandInfo.available) {
        alternatives.push({
          type: 'Generic available',
          medication: brandInfo.generic,
          savings: '60-80% cost reduction',
          covered: this.checkSalCoverage(brandInfo.generic)
        });
      }

      // Check Sal coverage
      const coverage = this.checkSalCoverage(medLower);
      if (coverage === 'Not covered') {
        // Suggest therapeutic alternatives
        const therapeuticAlts = this.getTherapeuticAlternatives(medLower);
        therapeuticAlts.forEach(alt => {
          if (this.checkSalCoverage(alt) !== 'Not covered') {
            alternatives.push({
              type: 'Therapeutic alternative',
              medication: alt,
              savings: 'Covered by Sal',
              covered: this.checkSalCoverage(alt)
            });
          }
        });
      }

      // Kupat Cholim specific formularies
      const kupahAlternatives = this.getKupahAlternatives(medLower);
      if (kupahAlternatives.length > 0) {
        alternatives.push(...kupahAlternatives);
      }

      return {
        currentMedication: medication,
        currentCoverage: coverage,
        alternatives,
        recommendations: this.getCostRecommendations(medication, alternatives)
      };
    },

    checkSalCoverage(medication) {
      const medLower = medication.toLowerCase();
      
      if (this.salCoverage.full.includes(medLower)) {
        return 'Full coverage';
      } else if (this.salCoverage.partial.includes(medLower)) {
        return 'Partial coverage with criteria';
      } else {
        return 'Not covered';
      }
    },

    getTherapeuticAlternatives(medication) {
      const alternatives = {
        // PPIs
        'esomeprazole': ['omeprazole', 'pantoprazole', 'lansoprazole'],
        'rabeprazole': ['omeprazole', 'pantoprazole'],
        
        // Statins
        'pitavastatin': ['atorvastatin', 'rosuvastatin', 'simvastatin'],
        'pravastatin': ['atorvastatin', 'simvastatin'],
        
        // ACE/ARB
        'perindopril': ['enalapril', 'lisinopril', 'ramipril'],
        'telmisartan': ['losartan', 'valsartan', 'candesartan'],
        
        // Beta blockers
        'nebivolol': ['bisoprolol', 'carvedilol', 'metoprolol'],
        'labetalol': ['carvedilol', 'bisoprolol'],
        
        // CCBs
        'felodipine': ['amlodipine', 'nifedipine'],
        'diltiazem': ['amlodipine', 'verapamil'],
        
        // Sleep aids
        'zolpidem': ['trazodone', 'melatonin', 'mirtazapine'],
        'eszopiclone': ['trazodone', 'melatonin'],
        
        // Antidepressants
        'duloxetine': ['sertraline', 'escitalopram', 'venlafaxine'],
        'vortioxetine': ['sertraline', 'escitalopram']
      };
      
      return alternatives[medication] || [];
    },

    getKupahAlternatives(medication) {
      // Kupat Cholim specific formularies
      const kupahFormularies = {
        'Clalit': {
          preferred: ['generic first', 'local manufacturers'],
          discounts: ['Teva products', 'Dexcel products']
        },
        'Maccabi': {
          preferred: ['cost-effective options'],
          discounts: ['pharmacy chain discounts']
        },
        'Meuhedet': {
          preferred: ['generic when available'],
          discounts: ['bulk purchasing agreements']
        },
        'Leumit': {
          preferred: ['formulary drugs'],
          discounts: ['member pricing']
        }
      };
      
      // Return kupah-specific alternatives
      return [];
    },

    getCostRecommendations(medication, alternatives) {
      const recs = [];
      
      if (alternatives.length > 0) {
        recs.push('Cost-saving alternatives available');
        
        if (alternatives.some(alt => alt.type === 'Generic available')) {
          recs.push('Switch to generic for significant savings');
        }
        
        if (alternatives.some(alt => alt.covered === 'Full coverage')) {
          recs.push('Consider Sal-covered alternative');
        }
      }
      
      recs.push('Check with your Kupat Cholim for specific coverage');
      recs.push('Ask about patient assistance programs if needed');
      
      return recs;
    },

    // Calculate potential savings
    calculateSavings(currentMeds) {
      let totalSavings = 0;
      const savingsBreakdown = [];
      
      currentMeds.forEach(med => {
        const alternatives = this.findCheaper(med);
        if (alternatives.alternatives.length > 0) {
          const bestAlternative = alternatives.alternatives[0];
          
          // Estimate savings (simplified)
          let estimatedSavings = 0;
          if (bestAlternative.type === 'Generic available') {
            estimatedSavings = 100; // Estimated monthly savings in NIS
          } else if (bestAlternative.covered === 'Full coverage') {
            estimatedSavings = 150; // If switching from non-covered to covered
          }
          
          if (estimatedSavings > 0) {
            totalSavings += estimatedSavings;
            savingsBreakdown.push({
              current: med,
              alternative: bestAlternative.medication,
              monthlySavings: estimatedSavings
            });
          }
        }
      });
      
      return {
        monthlyTotal: totalSavings,
        yearlyTotal: totalSavings * 12,
        breakdown: savingsBreakdown,
        currency: 'NIS'
      };
    }
  }
};

export default EnhancedDrugDatabase;