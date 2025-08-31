// Geriatric Risk Calculators - Evidence-based scoring systems

// HOSPITAL Score for 30-Day Readmission Risk
// Based on Donzé et al. studies
export function calculateHospitalScore(data) {
  let score = 0;
  
  // H - Hemoglobin at discharge < 12 g/dL
  if (data.hemoglobin < 12) score += 1;
  
  // O - Discharge from Oncology service
  if (data.dischargedFromOncology) score += 2;
  
  // S - Sodium level at discharge < 135 mmol/L
  if (data.sodium < 135) score += 1;
  
  // P - Procedure during hospital stay
  if (data.procedureDuringStay) score += 1;
  
  // I - Index admission type: non-elective
  if (data.admissionType === 'emergent' || data.admissionType === 'urgent') score += 1;
  
  // T - Number of hospital admissions during the previous year
  if (data.priorAdmissions >= 2 && data.priorAdmissions <= 5) score += 2;
  if (data.priorAdmissions > 5) score += 5;
  
  // A - Length of stay ≥ 5 days
  if (data.lengthOfStay >= 5) score += 2;
  
  // L - Low health literacy (not in original, sometimes added)
  
  // Determine risk category
  let risk = 'Low';
  let readmissionRate = '5.8%';
  
  if (score >= 5 && score <= 6) {
    risk = 'Intermediate';
    readmissionRate = '11.9%';
  } else if (score >= 7) {
    risk = 'High';
    readmissionRate = '22.8%';
  }
  
  return {
    score,
    risk,
    readmissionRate,
    interpretation: `${risk} risk of 30-day readmission (${readmissionRate} probability)`
  };
}

// Walter Index for 1-Year Mortality Risk
// Based on Walter et al. prognostic index
export function calculateWalterIndex(data) {
  let score = 0;
  
  // Gender: Male
  if (data.sex === 'male') score += 1;
  
  // ADL dependencies at discharge
  if (data.adlDependencies >= 1 && data.adlDependencies <= 4) score += 2;
  if (data.adlDependencies === 5 || data.adlDependencies === 6) score += 5;
  
  // Congestive heart failure
  if (data.hasCongestiveHeartFailure) score += 2;
  
  // Cancer
  if (data.cancer === 'solitary') score += 3;
  if (data.cancer === 'metastatic') score += 8;
  
  // Creatinine > 3.0 mg/dL
  if (data.creatinine > 3.0) score += 2;
  
  // Albumin levels
  if (data.albumin < 3.0) score += 2;
  else if (data.albumin >= 3.0 && data.albumin <= 3.4) score += 1;
  
  // Determine risk and mortality rate
  let risk = 'Low';
  let mortalityRate = '4%';
  
  if (score === 1) mortalityRate = '7%';
  else if (score === 2 || score === 3) {
    risk = 'Low-Intermediate';
    mortalityRate = score === 2 ? '11%' : '19%';
  } else if (score === 4 || score === 5 || score === 6) {
    risk = 'High-Intermediate';
    if (score === 4) mortalityRate = '27%';
    else if (score === 5) mortalityRate = '39%';
    else mortalityRate = '50%';
  } else if (score > 6) {
    risk = 'High';
    mortalityRate = '64%';
  }
  
  return {
    score,
    risk,
    mortalityRate,
    interpretation: `${risk} risk with ${mortalityRate} 1-year mortality`
  };
}

// Confusion Assessment Method (CAM) for Delirium
// Based on Inouye et al.
export function assessCAM(data) {
  // Feature 1: Acute onset and fluctuating course
  const feature1 = data.acuteOnsetOrFluctuating;
  
  // Feature 2: Inattention
  const feature2 = data.inattention;
  
  // Feature 3: Disorganized thinking
  const feature3 = data.disorganizedThinking;
  
  // Feature 4: Altered level of consciousness
  const feature4 = data.alteredLevelOfConsciousness;
  
  // CAM positive if: Feature 1 AND Feature 2 AND (Feature 3 OR Feature 4)
  const isDeliriumPresent = feature1 && feature2 && (feature3 || feature4);
  
  return {
    isDelirium: isDeliriumPresent,
    status: isDeliriumPresent ? 'Positive' : 'Negative',
    features: {
      'Acute onset/Fluctuating': feature1,
      'Inattention': feature2,
      'Disorganized thinking': feature3,
      'Altered consciousness': feature4
    },
    interpretation: isDeliriumPresent 
      ? 'Delirium present - initiate delirium protocol'
      : 'No delirium detected by CAM criteria'
  };
}

// FRAIL Scale for Frailty Assessment
export function calculateFRAILScale(data) {
  let score = 0;
  
  // F - Fatigue
  if (data.fatigue) score += 1;
  
  // R - Resistance (Can't walk up 1 flight of stairs)
  if (data.cannotClimbStairs) score += 1;
  
  // A - Ambulation (Can't walk 1 block)
  if (data.cannotWalkBlock) score += 1;
  
  // I - Illness (>5 illnesses)
  if (data.numberOfIllnesses > 5) score += 1;
  
  // L - Loss of weight (>5% in last year)
  if (data.weightLoss > 5) score += 1;
  
  let status = 'Robust';
  if (score >= 1 && score <= 2) status = 'Pre-frail';
  else if (score >= 3) status = 'Frail';
  
  return {
    score,
    status,
    interpretation: `${status} - ${score >= 3 ? 'High risk for adverse outcomes' : score >= 1 ? 'At risk, consider interventions' : 'Low risk'}`
  };
}

// Clinical Frailty Scale
export function clinicalFrailtyScale(level) {
  const scales = {
    1: { label: 'Very Fit', description: 'Robust, active, energetic, motivated' },
    2: { label: 'Well', description: 'No active disease, less fit than category 1' },
    3: { label: 'Managing Well', description: 'Medical problems well controlled' },
    4: { label: 'Vulnerable', description: 'Not dependent but symptoms limit activities' },
    5: { label: 'Mildly Frail', description: 'Need help with IADLs' },
    6: { label: 'Moderately Frail', description: 'Need help with all outside activities and housekeeping' },
    7: { label: 'Severely Frail', description: 'Completely dependent for personal care' },
    8: { label: 'Very Severely Frail', description: 'Completely dependent, approaching end of life' },
    9: { label: 'Terminally Ill', description: 'Life expectancy < 6 months' }
  };
  
  return scales[level] || { label: 'Unknown', description: 'Invalid level' };
}

// Morse Fall Scale
export function calculateMorseFallScale(data) {
  let score = 0;
  
  // History of falling
  if (data.historyOfFalling) score += 25;
  
  // Secondary diagnosis
  if (data.secondaryDiagnosis) score += 15;
  
  // Ambulatory aid
  if (data.ambulatoryAid === 'furniture') score += 30;
  else if (data.ambulatoryAid === 'crutches' || data.ambulatoryAid === 'walker') score += 15;
  
  // IV/Heparin lock
  if (data.hasIV) score += 20;
  
  // Gait/Transferring
  if (data.gait === 'impaired') score += 20;
  else if (data.gait === 'weak') score += 10;
  
  // Mental status
  if (data.mentalStatus === 'forgets_limitations') score += 15;
  
  let risk = 'Low';
  if (score >= 25 && score <= 44) risk = 'Medium';
  else if (score >= 45) risk = 'High';
  
  return {
    score,
    risk,
    interpretation: `${risk} fall risk - ${risk === 'High' ? 'Implement high fall risk interventions' : risk === 'Medium' ? 'Implement standard fall precautions' : 'Basic safety measures'}`
  };
}

// CHADS2-VASc Score for Stroke Risk in AFib
export function calculateCHADS2VASc(data) {
  let score = 0;
  
  // C - Congestive heart failure
  if (data.congestiveHeartFailure) score += 1;
  
  // H - Hypertension
  if (data.hypertension) score += 1;
  
  // A2 - Age ≥75 years
  if (data.age >= 75) score += 2;
  else if (data.age >= 65) score += 1; // Age 65-74
  
  // D - Diabetes mellitus
  if (data.diabetes) score += 1;
  
  // S2 - Stroke/TIA/thromboembolism
  if (data.priorStroke) score += 2;
  
  // V - Vascular disease
  if (data.vascularDisease) score += 1;
  
  // Sc - Sex category (female)
  if (data.sex === 'female') score += 1;
  
  // Annual stroke risk
  const strokeRisk = {
    0: '0%',
    1: '1.3%',
    2: '2.2%',
    3: '3.2%',
    4: '4.0%',
    5: '6.7%',
    6: '9.8%',
    7: '9.6%',
    8: '12.5%',
    9: '15.2%'
  };
  
  const recommendation = score === 0 ? 'No anticoagulation needed' :
                         score === 1 ? 'Consider anticoagulation' :
                         'Anticoagulation recommended';
  
  return {
    score,
    annualStrokeRisk: strokeRisk[score] || '15.2%',
    recommendation,
    interpretation: `Annual stroke risk: ${strokeRisk[score] || '15.2%'} - ${recommendation}`
  };
}

// HAS-BLED Score for Bleeding Risk
export function calculateHASBLED(data) {
  let score = 0;
  
  // H - Hypertension (uncontrolled, >160 systolic)
  if (data.uncontrolledHypertension) score += 1;
  
  // A - Abnormal renal/liver function (1 point each, max 2)
  if (data.abnormalRenal) score += 1;
  if (data.abnormalLiver) score += 1;
  
  // S - Stroke history
  if (data.priorStroke) score += 1;
  
  // B - Bleeding history or predisposition
  if (data.bleedingHistory) score += 1;
  
  // L - Labile INR (if on warfarin)
  if (data.labileINR) score += 1;
  
  // E - Elderly (age >65)
  if (data.age > 65) score += 1;
  
  // D - Drugs/alcohol (1 point each, max 2)
  if (data.antiplateletOrNSAID) score += 1;
  if (data.alcoholUse) score += 1;
  
  const bleedingRisk = {
    0: '0.9%',
    1: '3.4%',
    2: '4.1%',
    3: '5.8%',
    4: '8.9%',
    5: '9.1%',
    6: '10.0%',
    7: '10.0%',
    8: '10.0%',
    9: '10.0%'
  };
  
  const risk = score <= 2 ? 'Low' : 'High';
  
  return {
    score,
    risk,
    annualBleedingRisk: bleedingRisk[score] || '10.0%',
    interpretation: `${risk} bleeding risk (${bleedingRisk[score] || '10.0%'} annual major bleeding risk)`
  };
}

// Comprehensive Geriatric Risk Calculator
export function calculateGeriatricRisk(patient) {
  // Initialize all risks as CRITICAL for elderly with multiple conditions
  let risks = {
    fall: 'LOW',
    frailty: 'LOW',
    delirium: 'LOW',
    bleeding: 'LOW',
    readmission: 'LOW'
  };

  // Age alone changes everything
  if (patient.age >= 85) {
    risks.fall = 'HIGH';
    risks.frailty = 'HIGH';
    risks.readmission = 'MODERATE';
  } else if (patient.age >= 75) {
    risks.fall = 'MODERATE';
    risks.frailty = 'MODERATE';
  }

  // Hip fracture = automatic critical
  if (patient.conditions?.toLowerCase().includes('hip') || 
      patient.conditions?.toLowerCase().includes('fracture')) {
    risks.fall = 'CRITICAL';
    risks.frailty = 'CRITICAL';
    risks.readmission = 'CRITICAL';
  }

  // CKD with age
  if (patient.conditions?.toLowerCase().includes('ckd') || 
      patient.conditions?.toLowerCase().includes('kidney')) {
    if (patient.age >= 80) {
      risks.frailty = 'CRITICAL';
      risks.readmission = 'HIGH';
    }
  }

  // Cognitive impairment changes EVERYTHING
  if (patient.cognitiveStatus === 'moderate' || patient.cognitiveStatus === 'severe') {
    risks.fall = risks.fall === 'CRITICAL' ? 'CRITICAL' : 'HIGH';
    risks.delirium = 'HIGH';
    risks.readmission = 'CRITICAL';
    
    if (patient.cognitiveStatus === 'severe') {
      risks.fall = 'CRITICAL';
      risks.delirium = 'CRITICAL';
    }
  }

  // Social isolation multiplies risk
  if (patient.socialSupport === 'isolated') {
    risks.readmission = 'CRITICAL';
    if (patient.cognitiveStatus !== 'intact') {
      risks.fall = 'CRITICAL';
      risks.frailty = 'CRITICAL';
    }
  }

  // Medication analysis
  const meds = patient.medications?.toLowerCase() || '';
  const hasAnticoag = /eliquis|warfarin|xarelto|apixaban|rivaroxaban/.test(meds);
  const hasAntiplatelet = /plavix|aspirin|clopidogrel/.test(meds);
  const hasInsulin = /insulin/.test(meds);
  const medCount = (meds.match(/\n/g) || []).length + 1;

  // Polypharmacy
  if (medCount > 10) {
    risks.fall = 'HIGH';
    risks.delirium = 'HIGH';
  } else if (medCount > 5) {
    risks.fall = risks.fall === 'LOW' ? 'MODERATE' : risks.fall;
    risks.delirium = risks.delirium === 'LOW' ? 'MODERATE' : risks.delirium;
  }

  // Anticoagulation + antiplatelet = disaster
  if (hasAnticoag && hasAntiplatelet) {
    risks.bleeding = 'CRITICAL';
    risks.fall = 'CRITICAL'; // Because falls on anticoag = death
  } else if (hasAnticoag || hasAntiplatelet) {
    risks.bleeding = 'HIGH';
    if (patient.age >= 80) {
      risks.bleeding = 'CRITICAL';
    }
  }

  // Insulin + cognitive impairment = hypoglycemia waiting
  if (hasInsulin && patient.cognitiveStatus !== 'intact') {
    risks.fall = 'CRITICAL';
    risks.readmission = 'CRITICAL';
  }

  // Calculate overall risk - take the WORST score
  const riskLevels = { 'LOW': 1, 'MODERATE': 2, 'HIGH': 3, 'CRITICAL': 4 };
  const maxRisk = Math.max(...Object.values(risks).map(r => riskLevels[r]));
  const overallRisk = Object.keys(riskLevels).find(key => riskLevels[key] === maxRisk);

  return {
    fallRisk: risks.fall,
    frailtyRisk: risks.frailty,
    deliriumRisk: risks.delirium,
    bleedingRisk: risks.bleeding,
    readmissionRisk: risks.readmission,
    overallRisk: overallRisk
  };
}

// Export all calculators
export default {
  calculateHospitalScore,
  calculateWalterIndex,
  assessCAM,
  calculateFRAILScale,
  clinicalFrailtyScale,
  calculateMorseFallScale,
  calculateCHADS2VASc,
  calculateHASBLED,
  calculateGeriatricRisk
};