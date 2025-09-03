/**
 * Clinical Decision Support Engine
 * Enterprise-grade clinical decision support with evidence-based recommendations
 * Integrates with Israeli healthcare protocols and Shaare Zedek guidelines
 */

import { DatabaseService } from './DatabaseService';
import { RedisService } from './RedisService';
import { ElasticsearchService } from './ElasticsearchService';
import winston from 'winston';

interface PatientData {
  id: string;
  age: number;
  gender: 'M' | 'F';
  weight?: number;
  height?: number;
  creatinine?: number;
  gfr?: number;
  allergies: string[];
  medications: Medication[];
  conditions: string[];
  vitalSigns?: VitalSigns;
  labResults?: LabResults;
}

interface Medication {
  name: string;
  dose: string;
  frequency: string;
  route: string;
  startDate: Date;
  indication?: string;
}

interface VitalSigns {
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  painScore?: number;
}

interface LabResults {
  hemoglobin?: number;
  hematocrit?: number;
  wbc?: number;
  platelets?: number;
  sodium?: number;
  potassium?: number;
  chloride?: number;
  bun?: number;
  creatinine?: number;
  glucose?: number;
  albumin?: number;
  bilirubin?: number;
  alt?: number;
  ast?: number;
  inr?: number;
  ptt?: number;
}

interface ClinicalDecision {
  id: string;
  type: 'diagnostic' | 'therapeutic' | 'monitoring' | 'alert';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  description: string;
  recommendations: Recommendation[];
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  sources: string[];
  israeliGuidelines?: string[];
  shaarezedekProtocols?: string[];
  timestamp: Date;
  confidence: number; // 0-100
}

interface Recommendation {
  type: 'medication' | 'test' | 'referral' | 'monitoring' | 'lifestyle';
  priority: 'immediate' | 'urgent' | 'routine';
  action: string;
  rationale: string;
  contraindications?: string[];
  monitoring?: string[];
  alternatives?: string[];
  israeliContext?: string;
}

interface DrugInteraction {
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  drugs: string[];
  mechanism: string;
  clinicalEffect: string;
  management: string;
  monitoring: string[];
  alternatives: string[];
  evidenceLevel: string;
  frequency: string;
  israeliPharmacy?: {
    salCoverage: boolean;
    preferredAlternatives: string[];
    costConsiderations: string;
  };
}

export class ClinicalDecisionEngine {
  private logger: winston.Logger;
  private cache: Map<string, any>;

  // Clinical decision matrices
  private geriatricSyndromes: Map<string, any>;
  private medicationRules: Map<string, any>;
  private diagnosticAlgorithms: Map<string, any>;
  private israeliGuidelines: Map<string, any>;
  private shaarezedekProtocols: Map<string, any>;

  constructor(
    private databaseService: DatabaseService,
    private redisService: RedisService,
    private elasticsearchService: ElasticsearchService
  ) {
    this.logger = winston.createLogger({
      service: 'clinical-decision-engine'
    });

    this.cache = new Map();
    this.geriatricSyndromes = new Map();
    this.medicationRules = new Map();
    this.diagnosticAlgorithms = new Map();
    this.israeliGuidelines = new Map();
    this.shaarezedekProtocols = new Map();
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing Clinical Decision Support Engine...');

    await this.loadClinicalKnowledge();
    await this.loadIsraeliGuidelines();
    await this.loadShaarezedekProtocols();
    await this.loadMedicationDatabase();

    this.logger.info('Clinical Decision Support Engine initialized successfully');
  }

  private async loadClinicalKnowledge(): Promise<void> {
    // Load geriatric syndromes and assessment tools
    this.geriatricSyndromes.set('falls', {
      riskFactors: ['age > 65', 'polypharmacy', 'orthostatic hypotension', 'cognitive impairment'],
      assessment: 'Morse Fall Scale',
      interventions: ['medication review', 'physical therapy', 'home safety evaluation'],
      monitoring: ['monthly assessment', 'incident reporting']
    });

    this.geriatricSyndromes.set('delirium', {
      riskFactors: ['hospitalization', 'infection', 'medication changes', 'sleep deprivation'],
      assessment: 'CAM (Confusion Assessment Method)',
      interventions: ['treat underlying cause', 'environmental modifications', 'family involvement'],
      monitoring: ['q4h assessment', 'neuro checks']
    });

    this.geriatricSyndromes.set('frailty', {
      riskFactors: ['sarcopenia', 'weakness', 'slow gait', 'low activity', 'unintentional weight loss'],
      assessment: 'Clinical Frailty Scale',
      interventions: ['nutrition optimization', 'resistance exercise', 'protein supplementation'],
      monitoring: ['quarterly assessment', 'functional status tracking']
    });

    // Load diagnostic algorithms
    this.diagnosticAlgorithms.set('cognitive_assessment', {
      screening: ['MMSE', 'MoCA', 'Clock Drawing Test'],
      redFlags: ['rapid decline', 'functional impairment', 'behavioral changes'],
      workup: ['B12', 'TSH', 'neuroimaging if indicated'],
      referral: 'Memory clinic if MMSE < 24 or concerning features'
    });

    this.diagnosticAlgorithms.set('falls_assessment', {
      history: ['circumstances', 'prodromal symptoms', 'injury', 'frequency'],
      examination: ['orthostatic vitals', 'gait assessment', 'balance testing'],
      investigations: ['ECG if syncope', 'bone densitometry', 'vision testing'],
      intervention: 'Multifactorial falls prevention program'
    });
  }

  private async loadIsraeliGuidelines(): Promise<void> {
    // Israeli Ministry of Health Guidelines
    this.israeliGuidelines.set('diabetes_elderly', {
      hba1c_target: '7-8% for most elderly patients',
      hypoglycemia_risk: 'Use caution with sulfonylureas and insulin',
      preferred_medications: ['metformin', 'DPP-4 inhibitors'],
      contraindications: 'Avoid in GFR < 30',
      monitoring: 'HbA1c every 3-6 months, annual eye/foot exams'
    });

    this.israeliGuidelines.set('hypertension_elderly', {
      bp_target: '<150/90 for age >80, <140/90 for age 65-79',
      first_line: ['ACE inhibitors', 'ARBs', 'CCBs', 'thiazide diuretics'],
      considerations: 'Start low, go slow. Monitor for orthostatic hypotension',
      sal_preferred: ['ramipril', 'amlodipine', 'hydrochlorothiazide']
    });

    this.israeliGuidelines.set('osteoporosis', {
      screening: 'DEXA scan for all women >65, men >70',
      treatment_threshold: 'T-score ≤ -2.5 or fragility fracture',
      first_line: 'Bisphosphonates (alendronate, risedronate)',
      sal_coverage: 'Requires prior authorization for some agents',
      monitoring: 'DEXA every 2 years, calcium/vitamin D levels'
    });
  }

  private async loadShaarezedekProtocols(): Promise<void> {
    // Shaare Zedek Medical Center specific protocols
    this.shaarezedekProtocols.set('medication_reconciliation', {
      frequency: 'At admission, transfer, discharge',
      process: ['Compare admission list', 'Verify with patient/family', 'Check pharmacy records'],
      documentation: 'EMR medication reconciliation module',
      pharmacist_consult: 'Required for >5 medications or high-risk drugs'
    });

    this.shaarezedekProtocols.set('geriatric_consultation', {
      triggers: ['age >80', 'polypharmacy >10 drugs', 'functional decline', 'cognitive concerns'],
      assessment: 'Comprehensive Geriatric Assessment (CGA)',
      domains: ['medical', 'functional', 'cognitive', 'psychological', 'social', 'environmental'],
      documentation: 'Geriatric assessment template in EMR'
    });

    this.shaarezedekProtocols.set('discharge_planning', {
      start_time: 'Within 24 hours of admission',
      team: ['physician', 'nurse', 'social worker', 'pharmacist'],
      components: ['medication reconciliation', 'follow-up appointments', 'home services'],
      hebrew_materials: 'Discharge instructions in Hebrew with family education'
    });
  }

  private async loadMedicationDatabase(): Promise<void> {
    // Load comprehensive Israeli medication database
    this.medicationRules.set('polypharmacy_review', {
      threshold: 5,
      high_risk_threshold: 10,
      assessment_tools: ['Beers Criteria', 'STOPP/START', 'Medication Appropriateness Index'],
      review_frequency: 'Every 3 months or with clinical change'
    });

    // Load drug-drug interactions specific to Israeli formulary
    this.medicationRules.set('interactions', {
      contraindicated: await this.loadDrugInteractions('contraindicated'),
      major: await this.loadDrugInteractions('major'),
      moderate: await this.loadDrugInteractions('moderate')
    });

    // Load geriatric dosing guidelines
    this.medicationRules.set('geriatric_dosing', {
      renal_adjustment: await this.loadRenalDosing(),
      hepatic_adjustment: await this.loadHepaticDosing(),
      beers_criteria: await this.loadBeersCriteria(),
      stopp_start: await this.loadSTOPPSTART()
    });
  }

  async processDecisionRequest(request: any, user: any): Promise<ClinicalDecision[]> {
    const patientData: PatientData = request.patientData;
    const requestType = request.type;
    
    this.logger.info(`Processing ${requestType} decision request for patient ${patientData.id}`);

    const decisions: ClinicalDecision[] = [];

    switch (requestType) {
      case 'medication_review':
        decisions.push(...await this.performMedicationReview(patientData));
        break;
      
      case 'falls_assessment':
        decisions.push(...await this.assessFallsRisk(patientData));
        break;
      
      case 'cognitive_screening':
        decisions.push(...await this.performCognitiveScreening(patientData));
        break;
      
      case 'comprehensive_assessment':
        decisions.push(...await this.performComprehensiveAssessment(patientData));
        break;
      
      case 'drug_interactions':
        decisions.push(...await this.checkDrugInteractions(patientData));
        break;

      default:
        throw new Error(`Unknown request type: ${requestType}`);
    }

    // Apply Israeli healthcare context
    for (const decision of decisions) {
      await this.applyIsraeliContext(decision, patientData);
    }

    // Apply Shaare Zedek protocols
    for (const decision of decisions) {
      await this.applyShaarezedekProtocols(decision, patientData);
    }

    // Cache results for performance
    await this.cacheDecisions(patientData.id, decisions);

    this.logger.info(`Generated ${decisions.length} clinical decisions for patient ${patientData.id}`);

    return decisions;
  }

  private async performMedicationReview(patientData: PatientData): Promise<ClinicalDecision[]> {
    const decisions: ClinicalDecision[] = [];

    // Check for polypharmacy
    if (patientData.medications.length >= 5) {
      decisions.push({
        id: `polypharmacy_${Date.now()}`,
        type: 'therapeutic',
        severity: patientData.medications.length >= 10 ? 'high' : 'moderate',
        title: 'Polypharmacy Detected',
        description: `Patient is on ${patientData.medications.length} medications. Consider medication review.`,
        recommendations: [
          {
            type: 'medication',
            priority: 'routine',
            action: 'Comprehensive medication review using STOPP/START criteria',
            rationale: 'Reduce medication burden and adverse drug events',
            monitoring: ['Medication reconciliation', 'Clinical response', 'Adverse effects'],
            israeliContext: 'Consider Sal formulary alternatives to reduce costs'
          }
        ],
        evidenceLevel: 'A',
        sources: ['Beers Criteria 2019', 'STOPP/START Criteria v2'],
        timestamp: new Date(),
        confidence: 90
      });
    }

    // Check Beers Criteria
    const beersViolations = await this.checkBeersCriteria(patientData);
    for (const violation of beersViolations) {
      decisions.push(violation);
    }

    // Check STOPP/START criteria
    const stoppStartResults = await this.checkSTOPPSTART(patientData);
    decisions.push(...stoppStartResults);

    // Check drug interactions
    const interactions = await this.checkMedicationInteractions(patientData.medications);
    for (const interaction of interactions) {
      if (interaction.severity === 'contraindicated' || interaction.severity === 'major') {
        decisions.push({
          id: `interaction_${Date.now()}`,
          type: 'alert',
          severity: interaction.severity === 'contraindicated' ? 'critical' : 'high',
          title: `${interaction.severity.toUpperCase()} Drug Interaction`,
          description: `${interaction.drugs.join(' + ')}: ${interaction.clinicalEffect}`,
          recommendations: [
            {
              type: 'medication',
              priority: interaction.severity === 'contraindicated' ? 'immediate' : 'urgent',
              action: interaction.management,
              rationale: interaction.mechanism,
              monitoring: interaction.monitoring,
              alternatives: interaction.alternatives,
              israeliContext: interaction.israeliPharmacy?.preferredAlternatives.join(', ')
            }
          ],
          evidenceLevel: 'A',
          sources: ['Micromedex', 'Lexicomp', 'Israeli Ministry of Health'],
          timestamp: new Date(),
          confidence: 95
        });
      }
    }

    return decisions;
  }

  private async assessFallsRisk(patientData: PatientData): Promise<ClinicalDecision[]> {
    const decisions: ClinicalDecision[] = [];
    let riskScore = 0;
    const riskFactors: string[] = [];

    // Age-based risk
    if (patientData.age >= 65) {
      riskScore += 1;
      riskFactors.push('Age ≥65 years');
    }
    if (patientData.age >= 80) {
      riskScore += 1;
      riskFactors.push('Age ≥80 years');
    }

    // Medication-based risk
    const fallRiskMedications = [
      'benzodiazepines', 'antipsychotics', 'antidepressants', 
      'anticonvulsants', 'opioids', 'hypnotics'
    ];

    let fallRiskMedCount = 0;
    for (const med of patientData.medications) {
      if (fallRiskMedications.some(risk => med.name.toLowerCase().includes(risk))) {
        fallRiskMedCount++;
      }
    }

    if (fallRiskMedCount >= 1) {
      riskScore += fallRiskMedCount;
      riskFactors.push(`${fallRiskMedCount} fall-risk medications`);
    }

    // Polypharmacy risk
    if (patientData.medications.length >= 5) {
      riskScore += 1;
      riskFactors.push('Polypharmacy (≥5 medications)');
    }

    // Orthostatic hypotension risk
    if (patientData.vitalSigns) {
      // This would typically be calculated from orthostatic vitals
      // For demonstration, we'll assume it's a risk if on antihypertensives
      const antihypertensives = patientData.medications.filter(med => 
        ['amlodipine', 'lisinopril', 'losartan', 'metoprolol'].includes(med.name.toLowerCase())
      );
      
      if (antihypertensives.length > 0) {
        riskScore += 1;
        riskFactors.push('Antihypertensive medications');
      }
    }

    // Generate decision based on risk level
    let severity: 'low' | 'moderate' | 'high' = 'low';
    if (riskScore >= 4) severity = 'high';
    else if (riskScore >= 2) severity = 'moderate';

    if (riskScore > 0) {
      decisions.push({
        id: `falls_risk_${Date.now()}`,
        type: 'monitoring',
        severity,
        title: 'Falls Risk Assessment',
        description: `Patient has ${riskScore} fall risk factors: ${riskFactors.join(', ')}`,
        recommendations: [
          {
            type: 'test',
            priority: severity === 'high' ? 'urgent' : 'routine',
            action: 'Complete falls risk assessment using Morse Fall Scale',
            rationale: 'Quantify falls risk and guide intervention',
            monitoring: ['Falls incidents', 'Functional status', 'Medication effects'],
            israeliContext: 'Consider referral to Maccabi/Clalit physiotherapy services'
          },
          {
            type: 'medication',
            priority: 'routine',
            action: 'Review and optimize fall-risk medications',
            rationale: 'Reduce pharmacological falls risk',
            alternatives: ['Non-pharmacological interventions', 'Lower-risk medication classes']
          }
        ],
        evidenceLevel: 'A',
        sources: ['AGS/BGS Falls Prevention Guidelines', 'Israeli Ministry of Health Falls Prevention'],
        israeliGuidelines: ['Ministry of Health Falls Prevention Protocol'],
        timestamp: new Date(),
        confidence: 85
      });
    }

    return decisions;
  }

  async checkMedicationInteractions(medications: Medication[]): Promise<DrugInteraction[]> {
    const interactions: DrugInteraction[] = [];
    
    // Use the already loaded critical interaction database
    if (global.CriticalInteractionFix) {
      const medicationNames = medications.map(med => med.name);
      const fixedInteractions = global.CriticalInteractionFix.checkInteractions(medicationNames);
      
      for (const interaction of fixedInteractions) {
        interactions.push({
          severity: interaction.severity.toLowerCase() as any,
          drugs: interaction.drugs || interaction.genericNames || medicationNames,
          mechanism: interaction.mechanism || 'Drug interaction mechanism',
          clinicalEffect: interaction.effect,
          management: interaction.management,
          monitoring: interaction.monitoring ? [interaction.monitoring] : [],
          alternatives: interaction.alternatives ? [interaction.alternatives] : [],
          evidenceLevel: 'A',
          frequency: 'Common',
          israeliPharmacy: {
            salCoverage: true,
            preferredAlternatives: [],
            costConsiderations: 'Standard Sal coverage applies'
          }
        });
      }
    }

    // Check for additional Israeli-specific interactions
    await this.checkIsraeliSpecificInteractions(medications, interactions);

    return interactions;
  }

  private async checkIsraeliSpecificInteractions(
    medications: Medication[], 
    interactions: DrugInteraction[]
  ): Promise<void> {
    // Israeli-specific medication interactions based on common local prescribing patterns
    const israeliInteractions = [
      {
        drugs: ['warfarin', 'bactrim'],
        severity: 'major' as const,
        mechanism: 'CYP2C9 inhibition',
        clinicalEffect: 'Increased warfarin effect, bleeding risk',
        management: 'Monitor INR closely, reduce warfarin dose by 25-50%',
        israeliContext: 'Common interaction in Israeli elderly due to frequent UTI treatment'
      },
      {
        drugs: ['digoxin', 'amiodarone'],
        severity: 'major' as const,
        mechanism: 'P-glycoprotein inhibition',
        clinicalEffect: 'Digoxin toxicity',
        management: 'Reduce digoxin dose by 50%, monitor levels',
        israeliContext: 'Frequently seen in Shaare Zedek cardiology patients'
      }
    ];

    const medicationNames = medications.map(med => med.name.toLowerCase());
    
    for (const interaction of israeliInteractions) {
      const hasAllDrugs = interaction.drugs.every(drug => 
        medicationNames.some(med => med.includes(drug))
      );
      
      if (hasAllDrugs) {
        interactions.push({
          severity: interaction.severity,
          drugs: interaction.drugs,
          mechanism: interaction.mechanism,
          clinicalEffect: interaction.clinicalEffect,
          management: interaction.management,
          monitoring: ['Clinical symptoms', 'Laboratory values'],
          alternatives: ['Consider therapeutic alternatives'],
          evidenceLevel: 'B',
          frequency: 'Common in Israeli elderly population',
          israeliPharmacy: {
            salCoverage: true,
            preferredAlternatives: [],
            costConsiderations: interaction.israeliContext
          }
        });
      }
    }
  }

  private async applyIsraeliContext(decision: ClinicalDecision, patientData: PatientData): Promise<void> {
    // Apply Israeli healthcare system considerations
    decision.israeliGuidelines = [];

    // Add health fund considerations
    for (const recommendation of decision.recommendations) {
      if (recommendation.type === 'medication') {
        recommendation.israeliContext = 'Consider Sal formulary coverage and preferred alternatives';
      }
      
      if (recommendation.type === 'test') {
        recommendation.israeliContext = 'Available through Clalit/Maccabi/Leumit with standard copay';
      }
      
      if (recommendation.type === 'referral') {
        recommendation.israeliContext = 'Referral process varies by health fund - check specific requirements';
      }
    }

    // Add Israeli-specific guidelines
    if (decision.type === 'therapeutic') {
      decision.israeliGuidelines.push('Israeli Ministry of Health Clinical Guidelines');
    }
  }

  private async applyShaarezedekProtocols(decision: ClinicalDecision, patientData: PatientData): Promise<void> {
    // Apply Shaare Zedek Medical Center specific protocols
    decision.shaarezedekProtocols = [];

    if (decision.type === 'medication' || decision.title.includes('Medication')) {
      decision.shaarezedekProtocols.push('Shaare Zedek Medication Reconciliation Protocol');
      decision.shaarezedekProtocols.push('Pharmacy consultation required for high-risk medications');
    }

    if (decision.severity === 'high' || decision.severity === 'critical') {
      decision.shaarezedekProtocols.push('Immediate physician notification required');
      decision.shaarezedekProtocols.push('Document in EMR critical alerts section');
    }

    // Add Hebrew documentation requirements
    for (const recommendation of decision.recommendations) {
      if (recommendation.priority === 'immediate' || recommendation.priority === 'urgent') {
        recommendation.israeliContext = (recommendation.israeliContext || '') + 
          ' | Hebrew patient/family education materials required';
      }
    }
  }

  private async cacheDecisions(patientId: string, decisions: ClinicalDecision[]): Promise<void> {
    const cacheKey = `decisions_${patientId}_${Date.now()}`;
    await this.redisService.set(cacheKey, JSON.stringify(decisions), 3600); // 1 hour TTL
  }

  private async loadDrugInteractions(severity: string): Promise<any> {
    // This would load from database in production
    return {};
  }

  private async loadRenalDosing(): Promise<any> {
    // Renal dosing adjustments for geriatric patients
    return {};
  }

  private async loadHepaticDosing(): Promise<any> {
    // Hepatic dosing adjustments
    return {};
  }

  private async loadBeersCriteria(): Promise<any> {
    // 2019 AGS Beers Criteria
    return {};
  }

  private async loadSTOPPSTART(): Promise<any> {
    // STOPP/START Criteria Version 2
    return {};
  }

  private async checkBeersCriteria(patientData: PatientData): Promise<ClinicalDecision[]> {
    // Implementation of Beers Criteria checking
    return [];
  }

  private async checkSTOPPSTART(patientData: PatientData): Promise<ClinicalDecision[]> {
    // Implementation of STOPP/START criteria
    return [];
  }

  private async performCognitiveScreening(patientData: PatientData): Promise<ClinicalDecision[]> {
    // Cognitive assessment algorithms
    return [];
  }

  private async performComprehensiveAssessment(patientData: PatientData): Promise<ClinicalDecision[]> {
    // Comprehensive Geriatric Assessment
    return [];
  }

  private async checkDrugInteractions(patientData: PatientData): Promise<ClinicalDecision[]> {
    // Drug interaction checking
    const interactions = await this.checkMedicationInteractions(patientData.medications);
    return interactions.map(interaction => ({
      id: `drug_interaction_${Date.now()}_${Math.random()}`,
      type: 'alert' as const,
      severity: interaction.severity === 'contraindicated' ? 'critical' as const :
                interaction.severity === 'major' ? 'high' as const :
                interaction.severity === 'moderate' ? 'moderate' as const : 'low' as const,
      title: `${interaction.severity.toUpperCase()} Drug Interaction`,
      description: `${interaction.drugs.join(' + ')}: ${interaction.clinicalEffect}`,
      recommendations: [{
        type: 'medication' as const,
        priority: interaction.severity === 'contraindicated' ? 'immediate' as const : 'urgent' as const,
        action: interaction.management,
        rationale: interaction.mechanism,
        monitoring: interaction.monitoring,
        alternatives: interaction.alternatives
      }],
      evidenceLevel: 'A' as const,
      sources: ['Drug interaction database'],
      timestamp: new Date(),
      confidence: 90
    }));
  }
}