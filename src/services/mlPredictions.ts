import { Patient } from '../data';

export interface PredictionResult {
  type: string;
  score: number;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
  factors: string[];
  recommendations: string[];
}

class MLPredictionService {
  private modelLoaded = false;

  // Fall Risk Prediction Model
  predictFallRisk(patient: Patient): PredictionResult {
    // Simulate ML model prediction based on patient data
    const factors: string[] = [];
    let riskScore = 0;

    // Age factor
    if (patient.age > 85) {
      riskScore += 30;
      factors.push('Age > 85');
    } else if (patient.age > 75) {
      riskScore += 20;
      factors.push('Age 75-85');
    } else if (patient.age > 65) {
      riskScore += 10;
      factors.push('Age 65-75');
    }

    // Medication factors
    const highRiskMeds = ['lorazepam', 'diazepam', 'zolpidem', 'alprazolam'];
    const patientMeds = patient.medications.map(m => m.toLowerCase());
    const riskyMeds = patientMeds.filter(m => 
      highRiskMeds.some(hrm => m.includes(hrm))
    );
    
    if (riskyMeds.length > 0) {
      riskScore += riskyMeds.length * 15;
      factors.push(`High-risk medications (${riskyMeds.length})`);
    }

    if (patient.medications.length > 8) {
      riskScore += 20;
      factors.push('Polypharmacy (>8 medications)');
    }

    // Cognitive factors
    if (patient.mmse && patient.mmse.length > 0) {
      const latestMMSE = patient.mmse[patient.mmse.length - 1].score;
      if (latestMMSE < 20) {
        riskScore += 25;
        factors.push('Cognitive impairment (MMSE < 20)');
      } else if (latestMMSE < 24) {
        riskScore += 15;
        factors.push('Mild cognitive impairment');
      }
    }

    // Diagnosis factors
    const fallRiskDiagnoses = ['parkinson', 'dementia', 'stroke', 'neuropathy', 'vertigo'];
    const hasFallRiskDiagnosis = patient.diagnoses.some(d => 
      fallRiskDiagnoses.some(frd => d.toLowerCase().includes(frd))
    );
    
    if (hasFallRiskDiagnosis) {
      riskScore += 20;
      factors.push('Fall-risk diagnosis present');
    }

    // Add some randomness to simulate ML model variance
    riskScore += Math.random() * 10 - 5;
    riskScore = Math.max(0, Math.min(100, riskScore));

    // Determine risk level
    let risk: 'low' | 'medium' | 'high';
    if (riskScore >= 45) {
      risk = 'high';
    } else if (riskScore >= 25) {
      risk = 'medium';
    } else {
      risk = 'low';
    }

    // Generate recommendations
    const recommendations: string[] = [];
    if (risk === 'high') {
      recommendations.push('Immediate fall prevention assessment required');
      recommendations.push('Consider physical therapy consultation');
      recommendations.push('Review and optimize medications');
      recommendations.push('Implement hourly rounding');
      recommendations.push('Ensure call bell within reach');
    } else if (risk === 'medium') {
      recommendations.push('Standard fall precautions');
      recommendations.push('Medication review recommended');
      recommendations.push('Consider mobility aids');
    } else {
      recommendations.push('Continue standard monitoring');
      recommendations.push('Encourage regular exercise');
    }

    return {
      type: 'fall_risk',
      score: Math.round(riskScore),
      confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
      risk,
      factors,
      recommendations
    };
  }

  // Readmission Risk Prediction
  predictReadmissionRisk(patient: Patient): PredictionResult {
    const factors: string[] = [];
    let riskScore = 0;

    // Previous admissions (simulated)
    if (Math.random() > 0.5) {
      riskScore += 25;
      factors.push('Previous admission in last 30 days');
    }

    // Chronic conditions
    const chronicConditions = ['diabetes', 'copd', 'chf', 'ckd', 'cirrhosis'];
    const chronicCount = patient.diagnoses.filter(d => 
      chronicConditions.some(cc => d.toLowerCase().includes(cc))
    ).length;
    
    if (chronicCount > 0) {
      riskScore += chronicCount * 15;
      factors.push(`${chronicCount} chronic condition(s)`);
    }

    // Polypharmacy
    if (patient.medications.length > 10) {
      riskScore += 20;
      factors.push('Severe polypharmacy (>10 medications)');
    }

    // Age
    if (patient.age > 80) {
      riskScore += 15;
      factors.push('Advanced age (>80)');
    }

    // Social factors (simulated)
    if (Math.random() > 0.7) {
      riskScore += 20;
      factors.push('Lives alone');
    }

    // Normalize score
    riskScore = Math.max(0, Math.min(100, riskScore));

    let risk: 'low' | 'medium' | 'high';
    if (riskScore >= 60) {
      risk = 'high';
    } else if (riskScore >= 30) {
      risk = 'medium';
    } else {
      risk = 'low';
    }

    const recommendations: string[] = [];
    if (risk === 'high') {
      recommendations.push('Intensive discharge planning required');
      recommendations.push('Schedule follow-up within 48-72 hours');
      recommendations.push('Consider home health referral');
      recommendations.push('Medication reconciliation critical');
      recommendations.push('Patient education reinforcement');
    } else if (risk === 'medium') {
      recommendations.push('Standard discharge planning');
      recommendations.push('Follow-up within 7 days');
      recommendations.push('Ensure medication compliance');
    } else {
      recommendations.push('Routine discharge process');
      recommendations.push('Standard follow-up care');
    }

    return {
      type: 'readmission_risk',
      score: Math.round(riskScore),
      confidence: 0.82 + Math.random() * 0.1,
      risk,
      factors,
      recommendations
    };
  }

  // MMSE Score Prediction (next assessment)
  predictMMSETrajectory(patient: Patient): PredictionResult {
    if (!patient.mmse || patient.mmse.length < 2) {
      return {
        type: 'mmse_trajectory',
        score: 0,
        confidence: 0.5,
        risk: 'low',
        factors: ['Insufficient historical data'],
        recommendations: ['Continue regular MMSE assessments']
      };
    }

    const scores = patient.mmse.map(m => m.score);
    const trend = this.calculateTrend(scores);
    const lastScore = scores[scores.length - 1];
    
    // Predict next score based on trend
    let predictedScore = lastScore + trend;
    predictedScore = Math.max(0, Math.min(30, predictedScore));

    const factors: string[] = [];
    let risk: 'low' | 'medium' | 'high';

    if (trend < -2) {
      factors.push('Rapid cognitive decline detected');
      risk = 'high';
    } else if (trend < -1) {
      factors.push('Moderate cognitive decline');
      risk = 'medium';
    } else if (trend < 0) {
      factors.push('Mild cognitive decline');
      risk = 'medium';
    } else {
      factors.push('Stable or improving cognition');
      risk = 'low';
    }

    // Consider current score
    if (lastScore < 20) {
      factors.push('Current severe impairment');
      risk = 'high';
    } else if (lastScore < 24) {
      factors.push('Current mild impairment');
    }

    const recommendations: string[] = [];
    if (risk === 'high') {
      recommendations.push('Urgent neurological consultation');
      recommendations.push('Review medications for cognitive effects');
      recommendations.push('Assess for reversible causes');
      recommendations.push('Consider neuroimaging');
    } else if (risk === 'medium') {
      recommendations.push('Continue monitoring closely');
      recommendations.push('Cognitive stimulation therapy');
      recommendations.push('Medication optimization');
    } else {
      recommendations.push('Continue current management');
      recommendations.push('Regular reassessment');
    }

    return {
      type: 'mmse_trajectory',
      score: Math.round(predictedScore),
      confidence: 0.75 + Math.random() * 0.15,
      risk,
      factors,
      recommendations
    };
  }

  // Medication Interaction Risk
  predictMedicationRisk(patient: Patient): PredictionResult {
    const factors: string[] = [];
    let riskScore = 0;

    // Beers Criteria medications
    const beersMeds = ['lorazepam', 'diazepam', 'digoxin', 'amitriptyline'];
    const hasBeers = patient.medications.some(m => 
      beersMeds.some(bm => m.toLowerCase().includes(bm))
    );
    
    if (hasBeers) {
      riskScore += 30;
      factors.push('Beers Criteria medications present');
    }

    // Polypharmacy
    if (patient.medications.length > 10) {
      riskScore += 30;
      factors.push('Severe polypharmacy');
    } else if (patient.medications.length > 5) {
      riskScore += 15;
      factors.push('Polypharmacy');
    }

    // Age-related risk
    if (patient.age > 75) {
      riskScore += 20;
      factors.push('Age-related increased sensitivity');
    }

    // Kidney function (simulated)
    if (Math.random() > 0.6) {
      riskScore += 25;
      factors.push('Reduced kidney function');
    }

    riskScore = Math.max(0, Math.min(100, riskScore));

    let risk: 'low' | 'medium' | 'high';
    if (riskScore >= 50) {
      risk = 'high';
    } else if (riskScore >= 25) {
      risk = 'medium';
    } else {
      risk = 'low';
    }

    const recommendations: string[] = [];
    if (risk === 'high') {
      recommendations.push('Urgent medication review required');
      recommendations.push('Consider clinical pharmacist consultation');
      recommendations.push('Monitor for adverse effects closely');
      recommendations.push('Consider deprescribing opportunities');
    } else if (risk === 'medium') {
      recommendations.push('Medication review recommended');
      recommendations.push('Monitor for interactions');
    } else {
      recommendations.push('Continue current regimen');
      recommendations.push('Regular medication reconciliation');
    }

    return {
      type: 'medication_risk',
      score: Math.round(riskScore),
      confidence: 0.88 + Math.random() * 0.08,
      risk,
      factors,
      recommendations
    };
  }

  // Calculate trend from array of scores
  private calculateTrend(scores: number[]): number {
    if (scores.length < 2) return 0;
    
    const n = scores.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += scores[i];
      sumXY += i * scores[i];
      sumX2 += i * i;
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  // Get all predictions for a patient
  getAllPredictions(patient: Patient): PredictionResult[] {
    return [
      this.predictFallRisk(patient),
      this.predictReadmissionRisk(patient),
      this.predictMMSETrajectory(patient),
      this.predictMedicationRisk(patient)
    ];
  }

  // Get high-risk patients from roster
  identifyHighRiskPatients(patients: Patient[]): Array<{
    patient: Patient;
    risks: PredictionResult[];
  }> {
    return patients
      .map(patient => ({
        patient,
        risks: this.getAllPredictions(patient).filter(p => p.risk === 'high')
      }))
      .filter(result => result.risks.length > 0)
      .sort((a, b) => b.risks.length - a.risks.length);
  }
}

// Singleton instance
export const mlPredictionService = new MLPredictionService();

// React hook
export function useMLPredictions() {
  return mlPredictionService;
}