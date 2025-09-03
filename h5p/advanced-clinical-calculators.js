// advanced-clinical-calculators.js
// Comprehensive Clinical Calculator System for Geriatrics
// Based on comprehensive API wrapper - JavaScript compatible version

class AdvancedClinicalCalculators {
  constructor() {
    this.israeliDrugMapping = this.initializeHebrewDrugMappings();
    this.clinicalScores = new Map();
    this.init();
  }

  init() {
    this.createCalculatorUI();
    console.log('🧮 Advanced Clinical Calculators initialized');
  }

  // ============= CLINICAL SCORES IMPLEMENTATION =============

  /**
   * Calculate CHA2DS2-VASc Score for stroke risk
   */
  calculateCHA2DS2VASc(patient) {
    let score = 0;
    const factors = [];

    // Age scoring
    if (patient.age >= 75) {
      score += 2;
      factors.push('Age ≥75 (2 points)');
    } else if (patient.age >= 65) {
      score += 1;
      factors.push('Age 65-74 (1 point)');
    }

    // Sex
    if (patient.gender === 'F' || patient.gender === 'female') {
      score += 1;
      factors.push('Female (1 point)');
    }

    // Conditions
    if (patient.conditions) {
      const conditions = patient.conditions.map(c => c.toLowerCase());
      
      if (conditions.some(c => c.includes('heart failure') || c.includes('chf'))) {
        score += 1;
        factors.push('Heart Failure (1 point)');
      }
      if (conditions.some(c => c.includes('hypertension'))) {
        score += 1;
        factors.push('Hypertension (1 point)');
      }
      if (conditions.some(c => c.includes('diabetes'))) {
        score += 1;
        factors.push('Diabetes (1 point)');
      }
      if (conditions.some(c => c.includes('stroke') || c.includes('tia'))) {
        score += 2;
        factors.push('Stroke/TIA (2 points)');
      }
      if (conditions.some(c => c.includes('vascular') || c.includes('pad') || c.includes('mi'))) {
        score += 1;
        factors.push('Vascular Disease (1 point)');
      }
    }

    const strokeRisk = this.getStrokeRisk(score);
    const recommendation = this.getAnticoagulationRecommendation(score, patient.gender);

    return {
      name: 'CHA2DS2-VASc Score',
      value: score,
      factors: factors,
      interpretation: `Annual stroke risk: ${strokeRisk}`,
      recommendations: [
        recommendation,
        'Consider DOAC over warfarin in elderly',
        'Check HAS-BLED for bleeding risk',
        '🇮🇱 In Israel: Eliquis/Xarelto covered by Sal for appropriate scores'
      ],
      reference: 'Lip GY et al. Chest. 2010;137(2):263-72',
      israeliContext: 'Israeli guidelines follow ESC recommendations - covered by all Kupot'
    };
  }

  /**
   * Calculate HAS-BLED Score for bleeding risk
   */
  calculateHASBLED(patient) {
    let score = 0;
    const factors = [];

    // Hypertension
    if (patient.conditions?.some(c => c.toLowerCase().includes('hypertension'))) {
      score += 1;
      factors.push('Hypertension (1 point)');
    }

    // Abnormal renal function
    if (patient.labResults?.creatinine && patient.labResults.creatinine > 2.0) {
      score += 1;
      factors.push('Abnormal renal function (1 point)');
    }

    // Abnormal liver function  
    if (patient.conditions?.some(c => c.toLowerCase().includes('cirrhosis') || c.toLowerCase().includes('liver'))) {
      score += 1;
      factors.push('Abnormal liver function (1 point)');
    }

    // Stroke
    if (patient.conditions?.some(c => c.toLowerCase().includes('stroke'))) {
      score += 1;
      factors.push('Prior stroke (1 point)');
    }

    // Bleeding history
    if (patient.conditions?.some(c => c.toLowerCase().includes('bleed'))) {
      score += 1;
      factors.push('Bleeding history (1 point)');
    }

    // Labile INR (if on warfarin)
    if (patient.medications?.some(m => m.toLowerCase().includes('warfarin') || m.toLowerCase().includes('coumadin'))) {
      score += 1;
      factors.push('Labile INR (warfarin therapy, 1 point)');
    }

    // Elderly (>65)
    if (patient.age > 65) {
      score += 1;
      factors.push('Age >65 (1 point)');
    }

    // Drugs affecting bleeding
    if (patient.medications?.some(m => {
      const med = m.toLowerCase();
      return ['aspirin', 'clopidogrel', 'ibuprofen', 'naproxen', 'diclofenac'].some(drug => med.includes(drug));
    })) {
      score += 1;
      factors.push('Drugs affecting bleeding (1 point)');
    }

    const bleedingRisk = this.getBleedingRisk(score);

    return {
      name: 'HAS-BLED Score',
      value: score,
      factors: factors,
      interpretation: `Annual major bleeding risk: ${bleedingRisk}`,
      recommendations: [
        score >= 3 ? '⚠️ High bleeding risk - use caution with anticoagulation' : '✅ Reasonable bleeding risk',
        'Address modifiable risk factors (hypertension, alcohol, labile INR)',
        'Consider DOAC over warfarin for better control',
        'Regular monitoring required'
      ].filter(Boolean),
      reference: 'Pisters R et al. Chest. 2010;138(5):1093-100',
      israeliContext: 'Standard use in Israeli cardiology units'
    };
  }

  /**
   * Calculate FRAIL Scale
   */
  calculateFRAIL(patient) {
    let score = 0;
    const criteria = [];

    // Fatigue (simplified - based on ADL impairment)
    if (patient.functionalStatus?.adl && patient.functionalStatus.adl < 6) {
      score++;
      criteria.push('Fatigue');
    }

    // Resistance (climbing stairs difficulty)
    if (patient.functionalStatus?.mobilityScore && patient.functionalStatus.mobilityScore < 3) {
      score++;
      criteria.push('Resistance impaired');
    }

    // Ambulation (walking difficulty)
    if (patient.functionalStatus?.mobilityScore && patient.functionalStatus.mobilityScore < 4) {
      score++;
      criteria.push('Ambulation difficulty');
    }

    // Illness (>5 comorbidities)
    if (patient.conditions && patient.conditions.length > 5) {
      score++;
      criteria.push('Multiple illnesses (>5)');
    }

    // Loss of weight (BMI <18.5 or recent weight loss)
    if (patient.weight && patient.height) {
      const bmi = patient.weight / Math.pow(patient.height / 100, 2);
      if (bmi < 18.5) {
        score++;
        criteria.push('Weight loss/low BMI');
      }
    }

    const interpretation = 
      score === 0 ? '💪 Robust' :
      score <= 2 ? '⚠️ Pre-frail' : '🚨 Frail';

    return {
      name: 'FRAIL Scale',
      value: score,
      criteria: criteria,
      interpretation: interpretation,
      recommendations: this.getFRAILRecommendations(score),
      reference: 'Morley JE et al. J Nutr Health Aging. 2012;16(7):601-8',
      israeliContext: 'Validated in Israeli population - see Jacobs JM et al. 2017'
    };
  }

  /**
   * Calculate Charlson Comorbidity Index
   */
  calculateCharlson(patient) {
    let score = 0;
    const scoredConditions = [];

    // Age points
    if (patient.age >= 80) {
      score += 4;
      scoredConditions.push('Age 80+ (4 points)');
    } else if (patient.age >= 70) {
      score += 3;
      scoredConditions.push('Age 70-79 (3 points)');
    } else if (patient.age >= 60) {
      score += 2;
      scoredConditions.push('Age 60-69 (2 points)');
    } else if (patient.age >= 50) {
      score += 1;
      scoredConditions.push('Age 50-59 (1 point)');
    }

    // Condition scoring
    const conditionScores = {
      'myocardial infarction': 1, 'mi': 1, 'heart attack': 1,
      'congestive heart failure': 1, 'chf': 1, 'heart failure': 1,
      'peripheral vascular disease': 1, 'pvd': 1, 'pad': 1,
      'cerebrovascular disease': 1, 'stroke': 1, 'cva': 1,
      'dementia': 1, 'alzheimer': 1,
      'chronic pulmonary disease': 1, 'copd': 1, 'asthma': 1,
      'connective tissue disease': 1, 'rheumatoid arthritis': 1,
      'peptic ulcer disease': 1, 'ulcer': 1,
      'mild liver disease': 1, 'hepatitis': 1,
      'diabetes': 1,
      'diabetes with complications': 2, 'diabetic nephropathy': 2,
      'hemiplegia': 2, 'paraplegia': 2,
      'renal disease': 2, 'chronic kidney disease': 2, 'ckd': 2,
      'solid tumor': 2, 'cancer': 2,
      'leukemia': 2, 'lymphoma': 2,
      'moderate liver disease': 3, 'severe liver disease': 3, 'cirrhosis': 3,
      'metastatic solid tumor': 6, 'metastatic cancer': 6,
      'aids': 6, 'hiv': 6
    };

    if (patient.conditions) {
      patient.conditions.forEach(condition => {
        const condLower = condition.toLowerCase();
        Object.entries(conditionScores).forEach(([key, points]) => {
          if (condLower.includes(key) && !scoredConditions.find(sc => sc.includes(condition))) {
            score += points;
            scoredConditions.push(`${condition} (${points} points)`);
          }
        });
      });
    }

    const tenYearSurvival = this.getCharlsonSurvival(score);

    return {
      name: 'Charlson Comorbidity Index',
      value: score,
      scoredConditions: scoredConditions,
      interpretation: `10-year survival: ${tenYearSurvival}`,
      recommendations: [
        score >= 3 ? '🔄 Consider palliative care consultation' : '',
        score >= 5 ? '📋 Discuss advance directives' : '',
        '🏥 Use for risk stratification in surgical planning',
        '🇮🇱 Israeli geriatric units use for care planning'
      ].filter(Boolean),
      reference: 'Charlson ME et al. J Chronic Dis. 1987;40(5):373-83',
      israeliContext: 'Validated in Clalit Health Services population'
    };
  }

  /**
   * Calculate Morse Fall Scale
   */
  calculateMorseFallScale(patient) {
    let score = 0;
    const factors = [];

    // History of falls (25 points)
    if (patient.conditions?.some(c => c.toLowerCase().includes('falls') || c.toLowerCase().includes('fall'))) {
      score += 25;
      factors.push('History of falls (25 points)');
    }

    // Secondary diagnosis (15 points)
    if (patient.conditions && patient.conditions.length > 1) {
      score += 15;
      factors.push('Secondary diagnosis (15 points)');
    }

    // Ambulatory aid (0-30 points)
    if (patient.functionalStatus?.mobilityScore) {
      if (patient.functionalStatus.mobilityScore <= 2) {
        score += 30;
        factors.push('Bedrest/nurse assist (30 points)');
      } else if (patient.functionalStatus.mobilityScore <= 3) {
        score += 15;
        factors.push('Crutches/cane/walker (15 points)');
      } else if (patient.functionalStatus.mobilityScore <= 4) {
        score += 15;
        factors.push('Furniture walking (15 points)');
      }
    }

    // IV/Heparin lock (20 points)
    if (patient.medications?.some(m => m.toLowerCase().includes('heparin') || m.toLowerCase().includes('iv'))) {
      score += 20;
      factors.push('IV/Heparin lock (20 points)');
    }

    // Gait (0-20 points)
    if (patient.functionalStatus?.mobilityScore && patient.functionalStatus.mobilityScore < 4) {
      score += 20;
      factors.push('Impaired gait (20 points)');
    }

    // Mental status (15 points) 
    if (patient.cognitiveStatus?.mmse && patient.cognitiveStatus.mmse < 24) {
      score += 15;
      factors.push('Cognitive impairment (15 points)');
    } else if (patient.conditions?.some(c => c.toLowerCase().includes('dementia') || c.toLowerCase().includes('delirium'))) {
      score += 15;
      factors.push('Mental status impaired (15 points)');
    }

    const risk = score < 25 ? '✅ Low risk' : score < 45 ? '⚠️ Medium risk' : '🚨 High risk';

    const interventions = 
      score < 25 ? ['Standard fall precautions', 'Call light within reach'] :
      score < 45 ? ['Implement standard interventions', 'Bed alarm consideration', 'Supervised toileting'] :
      ['High risk interventions', 'Bed/chair alarm', 'Frequent rounding q15min', 'Consider sitter'];

    return {
      name: 'Morse Fall Scale',
      value: score,
      factors: factors,
      interpretation: `${risk} (Score: ${score})`,
      recommendations: interventions,
      reference: 'Morse JM et al. Can J Aging. 1989;8:366-77',
      israeliContext: 'Mandatory in Israeli hospitals per MOH regulations'
    };
  }

  // ============= STOPP/START CRITERIA IMPLEMENTATION =============

  /**
   * Apply comprehensive STOPP/START criteria
   */
  applySTOPPSTART(medications, patient) {
    const recommendations = [];
    const medsLower = medications.map(m => m.toLowerCase());

    // STOPP Criteria (Screening Tool of Older Persons' Prescriptions)
    if (patient.age >= 65) {
      // A. Indication
      const ppis = medsLower.filter(m => 
        ['omeprazole', 'pantoprazole', 'esomeprazole', 'lansoprazole', 'rabeprazole'].some(ppi => m.includes(ppi))
      );
      if (ppis.length > 0) {
        recommendations.push({
          type: 'STOPP',
          category: 'A1',
          issue: 'PPI without clear indication',
          action: 'Review PPI indication - stop if no GERD, PUD, or high GI bleed risk (>8 weeks)',
          severity: 'medium'
        });
      }

      // B. Cardiovascular System
      const betaBlockers = medsLower.filter(m => 
        ['atenolol', 'metoprolol', 'bisoprolol', 'carvedilol', 'propranolol'].some(bb => m.includes(bb))
      );
      if (betaBlockers.length > 1) {
        recommendations.push({
          type: 'STOPP',
          category: 'B2',
          issue: 'Multiple beta-blockers',
          action: 'Consolidate to single beta-blocker',
          severity: 'high'
        });
      }

      // D. Central Nervous System
      const longActingBenzos = medsLower.filter(m => 
        ['diazepam', 'flurazepam', 'chlordiazepoxide', 'clonazepam'].some(benzo => m.includes(benzo))
      );
      if (longActingBenzos.length > 0) {
        recommendations.push({
          type: 'STOPP',
          category: 'D1',
          issue: 'Long-acting benzodiazepines in elderly',
          action: 'Switch to shorter-acting alternative (lorazepam, oxazepam) or gradually discontinue',
          severity: 'high'
        });
      }

      // F. Analgesic Drugs
      const nsaids = medsLower.filter(m => 
        ['ibuprofen', 'naproxen', 'diclofenac', 'indomethacin', 'piroxicam'].some(nsaid => m.includes(nsaid))
      );
      if (nsaids.length > 0 && patient.conditions?.some(c => c.toLowerCase().includes('kidney') || c.toLowerCase().includes('renal'))) {
        recommendations.push({
          type: 'STOPP',
          category: 'F2',
          issue: 'NSAIDs with moderate-severe kidney disease',
          action: 'Discontinue NSAIDs - use paracetamol or topical preparations',
          severity: 'high'
        });
      }
    }

    // START Criteria (Screening Tool to Alert doctors to Right Treatment)
    if (patient.conditions) {
      const conditions = patient.conditions.map(c => c.toLowerCase());
      
      // A. Cardiovascular System
      if (conditions.some(c => c.includes('atrial fibrillation')) &&
          !medsLower.some(m => ['warfarin', 'apixaban', 'rivaroxaban', 'dabigatran', 'edoxaban'].some(ac => m.includes(ac)))) {
        recommendations.push({
          type: 'START',
          category: 'A1',
          issue: 'Atrial fibrillation without anticoagulation',
          action: 'Consider anticoagulation (calculate CHA2DS2-VASc score)',
          severity: 'high'
        });
      }

      // B. Respiratory System  
      if (conditions.some(c => c.includes('copd') || c.includes('chronic obstructive')) &&
          !medsLower.some(m => ['salbutamol', 'formoterol', 'salmeterol', 'tiotropium'].some(broncho => m.includes(broncho)))) {
        recommendations.push({
          type: 'START',
          category: 'B1',
          issue: 'COPD without bronchodilator',
          action: 'Initiate short-acting beta-2 agonist or anticholinergic',
          severity: 'medium'
        });
      }

      // E. Endocrine System
      if (conditions.some(c => c.includes('diabetes')) &&
          !medsLower.some(m => ['lisinopril', 'enalapril', 'ramipril', 'telmisartan', 'valsartan', 'losartan'].some(acei => m.includes(acei)))) {
        recommendations.push({
          type: 'START',
          category: 'E2',
          issue: 'Diabetes without ACE-I/ARB',
          action: 'Consider ACE inhibitor or ARB for cardiovascular protection',
          severity: 'medium'
        });
      }

      // G. Musculoskeletal System
      if (conditions.some(c => c.includes('osteoporosis')) && 
          !medsLower.some(m => ['alendronate', 'risedronate', 'ibandronate', 'denosumab', 'teriparatide'].some(bp => m.includes(bp)))) {
        recommendations.push({
          type: 'START',
          category: 'G1',
          issue: 'Osteoporosis without bisphosphonate',
          action: 'Consider bisphosphonate therapy with calcium and vitamin D',
          severity: 'medium'
        });
      }
    }

    return recommendations;
  }

  // ============= HEBREW-ENGLISH DRUG MAPPING =============

  /**
   * Initialize Hebrew-English medication mappings
   */
  initializeHebrewDrugMappings() {
    return new Map([
      // Common medications in Hebrew -> English
      ['אקמול', 'paracetamol'],
      ['אספירין', 'aspirin'],
      ['פרמין', 'metformin'],
      ['נורמיטן', 'atenolol'],
      ['פוסיד', 'furosemide'],
      ['קומדין', 'warfarin'],
      ['אליקוויס', 'apixaban'],
      ['זאראלטו', 'rivaroxaban'],
      ['פרדקסה', 'dabigatran'],
      ['ליפיטור', 'atorvastatin'],
      ['קרסטור', 'rosuvastatin'],
      ['פלביקס', 'clopidogrel'],
      ['לוסק', 'omeprazole'],
      ['נקסיום', 'esomeprazole'],
      ['קונטרולוק', 'pantoprazole'],
      ['אריספט', 'donepezil'],
      ['אקסלון', 'rivastigmine'],
      ['אבקסה', 'memantine'],
      ['ציפרלקס', 'escitalopram'],
      ['רסיטל', 'sertraline'],
      ['ונלפקסין', 'venlafaxine'],
      ['קסנקס', 'alprazolam'],
      ['ואליום', 'diazepam'],
      ['אטיבן', 'lorazepam'],
      ['סטילנוקס', 'zolpidem'],
      ['אימוביין', 'zopiclone'],
      ['טראמדול', 'tramadol'],
      ['נורופן', 'ibuprofen'],
      ['ואלטן', 'diclofenac'],
      ['אקוטן', 'isotretinoin'],
      ['פרדניזון', 'prednisolone'],
      ['מתוטרקסט', 'methotrexate']
    ]);
  }

  /**
   * Normalize medication names (Hebrew to English)
   */
  normalizeMedications(medications) {
    return medications.map(med => {
      // Check if Hebrew
      if (/[\u0590-\u05FF]/.test(med)) {
        return this.israeliDrugMapping.get(med) || med;
      }
      
      // Clean up English names
      return med.toLowerCase()
        .replace(/[®™]/g, '')
        .replace(/\s+\d+\s?mg/i, '')
        .replace(/\s+\d+\s?mcg/i, '')
        .trim();
    });
  }

  // ============= HELPER FUNCTIONS =============

  getStrokeRisk(score) {
    const risks = {
      0: '0.2%', 1: '0.6%', 2: '2.2%', 3: '3.2%', 4: '4.8%',
      5: '7.2%', 6: '9.7%', 7: '11.2%', 8: '10.8%', 9: '12.2%'
    };
    return risks[score] || '12.2%';
  }

  getAnticoagulationRecommendation(score, gender) {
    if (score === 0) return 'No anticoagulation needed';
    if (score === 1 && gender === 'M') return 'Consider anticoagulation';
    if (score === 1 && (gender === 'F' || gender === 'female')) return 'Anticoagulation recommended (CHA2DS2-VASc ≥2)';
    return 'Anticoagulation recommended';
  }

  getBleedingRisk(score) {
    const risks = {
      0: '1.0%', 1: '1.3%', 2: '1.9%', 3: '3.7%', 4: '8.7%'
    };
    return risks[score] || '>12%';
  }

  getFRAILRecommendations(score) {
    if (score === 0) {
      return ['✅ Continue health maintenance', '📅 Annual reassessment', '🏃‍♂️ Maintain physical activity'];
    } else if (score <= 2) {
      return [
        '🏃‍♂️ Initiate structured exercise program',
        '🥗 Nutritional assessment and optimization',
        '💊 Comprehensive medication review',
        '🚫 Fall risk assessment and prevention',
        '🇮🇱 Consider Maccabi/Clalit wellness programs'
      ];
    } else {
      return [
        '🏥 Comprehensive geriatric assessment (CGA)',
        '🔄 Physical therapy referral',
        '🏠 Home safety evaluation',
        '💪 Assess for sarcopenia',
        '👨‍👩‍👧‍👦 Evaluate social support systems',
        '📋 Advanced care planning discussion',
        '🇮🇱 Consider Bituach Leumi attendance allowance'
      ];
    }
  }

  getCharlsonSurvival(score) {
    const survival = {
      0: '98%', 1: '96%', 2: '90%', 3: '77%', 4: '53%', 5: '21%'
    };
    return survival[score] || '<21%';
  }

  // ============= UI CREATION =============

  createCalculatorUI() {
    const uiHTML = `
      <div class="clinical-calculators-container" style="display:none;">
        <div class="calculators-header">
          <h2>🧮 Advanced Clinical Calculators</h2>
          <p>Comprehensive geriatric assessment tools with Israeli healthcare context</p>
        </div>

        <div class="calculator-sections">
          <div class="calculator-section">
            <h3>🫀 Cardiovascular Risk</h3>
            <div class="calculator-buttons">
              <button class="calc-btn" onclick="window.clinicalCalc.showCHA2DS2VASc()">
                CHA2DS2-VASc Score
                <small>Stroke risk in AF</small>
              </button>
              <button class="calc-btn" onclick="window.clinicalCalc.showHASBLED()">
                HAS-BLED Score
                <small>Bleeding risk on anticoagulation</small>
              </button>
            </div>
          </div>

          <div class="calculator-section">
            <h3>👴 Frailty Assessment</h3>
            <div class="calculator-buttons">
              <button class="calc-btn" onclick="window.clinicalCalc.showFRAIL()">
                FRAIL Scale
                <small>5-component frailty assessment</small>
              </button>
              <button class="calc-btn" onclick="window.clinicalCalc.showCharlson()">
                Charlson Index
                <small>10-year survival prediction</small>
              </button>
            </div>
          </div>

          <div class="calculator-section">
            <h3>🚫 Falls & Safety</h3>
            <div class="calculator-buttons">
              <button class="calc-btn" onclick="window.clinicalCalc.showMorseFalls()">
                Morse Fall Scale
                <small>Fall risk assessment</small>
              </button>
            </div>
          </div>

          <div class="calculator-section">
            <h3>💊 Medication Analysis</h3>
            <div class="calculator-buttons">
              <button class="calc-btn" onclick="window.clinicalCalc.showSTOPPSTART()">
                STOPP/START Criteria
                <small>Medication appropriateness</small>
              </button>
              <button class="calc-btn" onclick="window.clinicalCalc.showHebrewDrugLookup()">
                🇮🇱 Hebrew Drug Translator
                <small>Hebrew ↔ English medication names</small>
              </button>
            </div>
          </div>
        </div>

        <div class="calculator-workspace" id="calc-workspace">
          <!-- Calculator forms will appear here -->
        </div>

        <style>
          .clinical-calculators-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .calculators-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
          }

          .calculator-sections {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }

          .calculator-section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .calculator-section h3 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
          }

          .calculator-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .calc-btn {
            padding: 15px 20px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            transition: all 0.3s;
            font-size: 16px;
            font-weight: bold;
          }

          .calc-btn:hover {
            border-color: #667eea;
            background: #f8f9ff;
            transform: translateY(-2px);
          }

          .calc-btn small {
            display: block;
            font-weight: normal;
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          }

          .calculator-workspace {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            min-height: 200px;
          }

          .calc-form {
            display: grid;
            gap: 15px;
            max-width: 600px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .form-group label {
            font-weight: bold;
            color: #333;
          }

          .form-group input, .form-group select, .form-group textarea {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
          }

          .calc-result {
            background: #f8f9fa;
            border-left: 4px solid #28a745;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
          }

          .calc-result.high-risk {
            border-left-color: #dc3545;
            background: #fff5f5;
          }

          .calc-result.medium-risk {
            border-left-color: #ffc107;
            background: #fffbf0;
          }

          .calc-result h4 {
            margin: 0 0 10px 0;
            color: #333;
          }

          .calc-result .score {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
          }

          .recommendations {
            list-style: none;
            padding: 0;
          }

          .recommendations li {
            padding: 5px 0;
            border-bottom: 1px solid #eee;
          }

          .recommendations li:last-child {
            border-bottom: none;
          }

          @media (max-width: 768px) {
            .calculator-sections {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', uiHTML);
  }

  /**
   * Show calculator interface
   */
  showCalculators() {
    const container = document.querySelector('.clinical-calculators-container');
    if (container) {
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
    }
  }

  // ============= UI METHODS FOR CALCULATORS =============

  showCHA2DS2VASc() {
    const workspace = document.getElementById('calc-workspace');
    workspace.innerHTML = `
      <h3>🫀 CHA2DS2-VASc Score Calculator</h3>
      <div class="calc-form">
        <div class="form-group">
          <label>Age:</label>
          <input type="number" id="cha2ds2-age" placeholder="Enter age" min="0" max="120">
        </div>
        <div class="form-group">
          <label>Gender:</label>
          <select id="cha2ds2-gender">
            <option value="">Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label>Medical History (check all that apply):</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 5px;">
            <label><input type="checkbox" id="cha2ds2-chf"> Heart Failure</label>
            <label><input type="checkbox" id="cha2ds2-htn"> Hypertension</label>
            <label><input type="checkbox" id="cha2ds2-diabetes"> Diabetes</label>
            <label><input type="checkbox" id="cha2ds2-stroke"> Stroke/TIA</label>
            <label><input type="checkbox" id="cha2ds2-vascular"> Vascular Disease</label>
          </div>
        </div>
        <button class="action-btn primary" onclick="window.clinicalCalc.calculateCHA2DS2VASc()">
          Calculate Score
        </button>
      </div>
      <div id="cha2ds2-result"></div>
    `;
  }

  calculateCHA2DS2VASc() {
    const patient = {
      age: parseInt(document.getElementById('cha2ds2-age').value) || 0,
      gender: document.getElementById('cha2ds2-gender').value,
      conditions: []
    };

    // Collect conditions
    if (document.getElementById('cha2ds2-chf').checked) patient.conditions.push('heart failure');
    if (document.getElementById('cha2ds2-htn').checked) patient.conditions.push('hypertension');
    if (document.getElementById('cha2ds2-diabetes').checked) patient.conditions.push('diabetes');
    if (document.getElementById('cha2ds2-stroke').checked) patient.conditions.push('stroke');
    if (document.getElementById('cha2ds2-vascular').checked) patient.conditions.push('vascular');

    const result = this.calculateCHA2DS2VASc(patient);
    const riskClass = result.value >= 3 ? 'high-risk' : result.value >= 2 ? 'medium-risk' : '';

    document.getElementById('cha2ds2-result').innerHTML = `
      <div class="calc-result ${riskClass}">
        <h4>CHA2DS2-VASc Result</h4>
        <div class="score">Score: ${result.value}</div>
        <p><strong>Interpretation:</strong> ${result.interpretation}</p>
        <p><strong>Factors:</strong> ${result.factors.join(', ') || 'None'}</p>
        <h5>Recommendations:</h5>
        <ul class="recommendations">
          ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <p><small><strong>Israeli Context:</strong> ${result.israeliContext}</small></p>
        <p><small><strong>Reference:</strong> ${result.reference}</small></p>
      </div>
    `;
  }

  showFRAIL() {
    const workspace = document.getElementById('calc-workspace');
    workspace.innerHTML = `
      <h3>👴 FRAIL Scale Calculator</h3>
      <div class="calc-form">
        <div class="form-group">
          <label>Age:</label>
          <input type="number" id="frail-age" placeholder="Enter age" min="0" max="120">
        </div>
        <div class="form-group">
          <label>Weight (kg):</label>
          <input type="number" id="frail-weight" placeholder="Enter weight" min="20" max="200" step="0.1">
        </div>
        <div class="form-group">
          <label>Height (cm):</label>
          <input type="number" id="frail-height" placeholder="Enter height" min="100" max="250">
        </div>
        <div class="form-group">
          <label>Activities of Daily Living (ADL) Score (0-6):</label>
          <input type="number" id="frail-adl" placeholder="6 = fully independent" min="0" max="6">
        </div>
        <div class="form-group">
          <label>Mobility Score (1-5):</label>
          <select id="frail-mobility">
            <option value="">Select mobility level</option>
            <option value="1">Bedbound</option>
            <option value="2">Chair/wheelchair bound</option>
            <option value="3">Walks with assistance</option>
            <option value="4">Walks independently with aid</option>
            <option value="5">Walks independently</option>
          </select>
        </div>
        <div class="form-group">
          <label>Medical Conditions:</label>
          <textarea id="frail-conditions" placeholder="List medical conditions (one per line)" rows="4"></textarea>
        </div>
        <button class="action-btn primary" onclick="window.clinicalCalc.calculateFRAILScore()">
          Calculate FRAIL Score
        </button>
      </div>
      <div id="frail-result"></div>
    `;
  }

  calculateFRAILScore() {
    const patient = {
      age: parseInt(document.getElementById('frail-age').value) || 0,
      weight: parseFloat(document.getElementById('frail-weight').value) || 0,
      height: parseFloat(document.getElementById('frail-height').value) || 0,
      functionalStatus: {
        adl: parseInt(document.getElementById('frail-adl').value) || 6,
        mobilityScore: parseInt(document.getElementById('frail-mobility').value) || 5
      },
      conditions: document.getElementById('frail-conditions').value.split('\n').filter(c => c.trim())
    };

    const result = this.calculateFRAIL(patient);
    const riskClass = result.value >= 3 ? 'high-risk' : result.value >= 1 ? 'medium-risk' : '';

    document.getElementById('frail-result').innerHTML = `
      <div class="calc-result ${riskClass}">
        <h4>FRAIL Scale Result</h4>
        <div class="score">Score: ${result.value}/5</div>
        <p><strong>Interpretation:</strong> ${result.interpretation}</p>
        <p><strong>Criteria Met:</strong> ${result.criteria.join(', ') || 'None'}</p>
        <h5>Recommendations:</h5>
        <ul class="recommendations">
          ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <p><small><strong>Israeli Context:</strong> ${result.israeliContext}</small></p>
        <p><small><strong>Reference:</strong> ${result.reference}</small></p>
      </div>
    `;
  }

  showSTOPPSTART() {
    const workspace = document.getElementById('calc-workspace');
    workspace.innerHTML = `
      <h3>💊 STOPP/START Criteria Analyzer</h3>
      <div class="calc-form">
        <div class="form-group">
          <label>Patient Age:</label>
          <input type="number" id="stopp-age" placeholder="Enter age" min="0" max="120">
        </div>
        <div class="form-group">
          <label>Current Medications (one per line):</label>
          <textarea id="stopp-medications" placeholder="List all medications including Hebrew names" rows="6"></textarea>
        </div>
        <div class="form-group">
          <label>Medical Conditions (one per line):</label>
          <textarea id="stopp-conditions" placeholder="List all medical conditions" rows="4"></textarea>
        </div>
        <button class="action-btn primary" onclick="window.clinicalCalc.analyzeSTOPPSTART()">
          Analyze Medications
        </button>
      </div>
      <div id="stopp-result"></div>
    `;
  }

  analyzeSTOPPSTART() {
    const age = parseInt(document.getElementById('stopp-age').value) || 0;
    const medications = document.getElementById('stopp-medications').value.split('\n').filter(m => m.trim());
    const conditions = document.getElementById('stopp-conditions').value.split('\n').filter(c => c.trim());
    
    const normalizedMeds = this.normalizeMedications(medications);
    const patient = { age, medications: normalizedMeds, conditions };
    
    const results = this.applySTOPPSTART(normalizedMeds, patient);

    let resultHTML = `<div class="calc-result">
      <h4>STOPP/START Analysis Results</h4>`;

    if (results.length === 0) {
      resultHTML += `<p>✅ No STOPP/START criteria violations detected.</p>`;
    } else {
      const stoppIssues = results.filter(r => r.type === 'STOPP');
      const startIssues = results.filter(r => r.type === 'START');

      if (stoppIssues.length > 0) {
        resultHTML += `
          <h5>🛑 STOPP Criteria (Medications to Stop/Modify)</h5>
          <ul class="recommendations">
            ${stoppIssues.map(issue => `
              <li style="border-left: 3px solid ${issue.severity === 'high' ? '#dc3545' : '#ffc107'}; padding-left: 10px;">
                <strong>${issue.category}:</strong> ${issue.issue}<br>
                <strong>Action:</strong> ${issue.action}
              </li>
            `).join('')}
          </ul>
        `;
      }

      if (startIssues.length > 0) {
        resultHTML += `
          <h5>▶️ START Criteria (Medications to Consider Adding)</h5>
          <ul class="recommendations">
            ${startIssues.map(issue => `
              <li style="border-left: 3px solid #28a745; padding-left: 10px;">
                <strong>${issue.category}:</strong> ${issue.issue}<br>
                <strong>Action:</strong> ${issue.action}
              </li>
            `).join('')}
          </ul>
        `;
      }
    }

    resultHTML += `
      <p><small><strong>Note:</strong> These are screening tools. Clinical judgment should always override algorithmic recommendations.</small></p>
      <p><small><strong>Reference:</strong> STOPP/START Criteria v2 (O'Mahony et al. 2015)</small></p>
    </div>`;

    document.getElementById('stopp-result').innerHTML = resultHTML;
  }

  showHebrewDrugLookup() {
    const workspace = document.getElementById('calc-workspace');
    workspace.innerHTML = `
      <h3>🇮🇱 Hebrew Drug Name Translator</h3>
      <div class="calc-form">
        <div class="form-group">
          <label>Enter Medication Names (Hebrew or English):</label>
          <textarea id="drug-lookup" placeholder="Enter medication names (one per line)" rows="6"></textarea>
        </div>
        <button class="action-btn primary" onclick="window.clinicalCalc.translateDrugNames()">
          Translate Names
        </button>
      </div>
      <div id="drug-translation-result"></div>
    `;
  }

  translateDrugNames() {
    const input = document.getElementById('drug-lookup').value.split('\n').filter(m => m.trim());
    
    let resultHTML = `<div class="calc-result">
      <h4>Drug Name Translations</h4>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Input</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Translation/Normalization</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Language</th>
          </tr>
        </thead>
        <tbody>`;

    input.forEach(med => {
      const normalized = this.normalizeMedications([med])[0];
      const isHebrew = /[\u0590-\u05FF]/.test(med);
      const wasTranslated = normalized !== med.toLowerCase().trim();

      resultHTML += `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${med}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${normalized}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            ${isHebrew ? '🇮🇱 Hebrew' : '🇺🇸 English'} 
            ${wasTranslated ? '✅' : '❓'}
          </td>
        </tr>`;
    });

    resultHTML += `
        </tbody>
      </table>
      <p><small>✅ = Successfully translated/normalized | ❓ = No translation found (may need manual verification)</small></p>
    </div>`;

    document.getElementById('drug-translation-result').innerHTML = resultHTML;
  }
}

// Initialize Advanced Clinical Calculators
window.clinicalCalc = new AdvancedClinicalCalculators();

console.log(`
🧮 Advanced Clinical Calculators Ready!

Features:
- CHA2DS2-VASc stroke risk calculator
- HAS-BLED bleeding risk assessment  
- FRAIL scale frailty evaluation
- Charlson Comorbidity Index
- Morse Fall Scale
- STOPP/START medication criteria
- Hebrew-English drug name translation
- Israeli healthcare context integration

Usage:
- clinicalCalc.showCalculators() - Show calculator interface
- All calculators include Israeli clinical context
- Hebrew medication names automatically translated
- STOPP/START criteria for medication optimization
`);