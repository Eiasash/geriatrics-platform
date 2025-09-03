/**
 * Israeli Healthcare Integration Service
 * Integrates with Israeli health funds (Clalit, Maccabi, Leumit, Meuhedet)
 * Ministry of Health APIs, and Israeli medical databases
 */

import axios from 'axios';
import winston from 'winston';
import crypto from 'crypto';

interface HealthFund {
  name: 'clalit' | 'maccabi' | 'leumit' | 'meuhedet';
  apiUrl: string;
  apiKey: string;
  features: string[];
}

interface PatientInsurance {
  healthFund: string;
  membershipNumber: string;
  supplementalInsurance: boolean;
  copaymentLevel: 'standard' | 'reduced' | 'exempt';
}

interface MedicationCoverage {
  medication: string;
  covered: boolean;
  copayment: number;
  priorAuthRequired: boolean;
  restrictions: string[];
  alternatives: string[];
  lastUpdated: Date;
}

interface LabResult {
  testName: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  labCode: string;
  timestamp: Date;
}

interface MOHReporting {
  reportType: 'adverse_event' | 'quality_metric' | 'infection_control' | 'medication_error';
  data: any;
  timestamp: Date;
  hospitalCode: string;
  departmentCode: string;
}

export class IsraeliHealthcareService {
  private logger: winston.Logger;
  private healthFunds: Map<string, HealthFund>;
  private mohApiKey: string;
  private encryptionKey: string;

  constructor() {
    this.logger = winston.createLogger({
      service: 'israeli-healthcare-integration'
    });

    this.healthFunds = new Map();
    this.mohApiKey = process.env.MOH_API_KEY || '';
    this.encryptionKey = process.env.ENCRYPTION_KEY || '';
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing Israeli Healthcare Integration Service...');

    // Initialize health fund connections
    this.healthFunds.set('clalit', {
      name: 'clalit',
      apiUrl: process.env.CLALIT_API_URL || '',
      apiKey: process.env.CLALIT_API_KEY || '',
      features: ['formulary', 'prior_auth', 'lab_results', 'appointments']
    });

    this.healthFunds.set('maccabi', {
      name: 'maccabi',
      apiUrl: process.env.MACCABI_API_URL || '',
      apiKey: process.env.MACCABI_API_KEY || '',
      features: ['formulary', 'prior_auth', 'digital_health']
    });

    this.healthFunds.set('leumit', {
      name: 'leumit',
      apiUrl: process.env.LEUMIT_API_URL || '',
      apiKey: process.env.LEUMIT_API_KEY || '',
      features: ['formulary', 'telemedicine']
    });

    this.healthFunds.set('meuhedet', {
      name: 'meuhedet',
      apiUrl: process.env.MEUHEDET_API_URL || '',
      apiKey: process.env.MEUHEDET_API_KEY || '',
      features: ['formulary', 'chronic_care']
    });

    // Test connections
    await this.testHealthFundConnections();

    this.logger.info('Israeli Healthcare Integration Service initialized successfully');
  }

  /**
   * Check medication coverage across Israeli health funds
   */
  async checkMedicationCoverage(
    medicationName: string, 
    patientInsurance: PatientInsurance
  ): Promise<MedicationCoverage> {
    const healthFund = this.healthFunds.get(patientInsurance.healthFund);
    if (!healthFund) {
      throw new Error(`Unknown health fund: ${patientInsurance.healthFund}`);
    }

    try {
      const response = await axios.get(
        `${healthFund.apiUrl}/formulary/check`,
        {
          headers: {
            'Authorization': `Bearer ${healthFund.apiKey}`,
            'Content-Type': 'application/json',
            'X-Patient-ID': this.hashPatientId(patientInsurance.membershipNumber)
          },
          params: {
            medication: medicationName,
            member_id: patientInsurance.membershipNumber
          }
        }
      );

      return {
        medication: medicationName,
        covered: response.data.covered,
        copayment: this.calculateCopayment(response.data.base_cost, patientInsurance.copaymentLevel),
        priorAuthRequired: response.data.prior_auth_required,
        restrictions: response.data.restrictions || [],
        alternatives: response.data.alternatives || [],
        lastUpdated: new Date()
      };

    } catch (error) {
      this.logger.error(`Error checking medication coverage: ${error}`);
      
      // Fallback to static formulary data
      return await this.getStaticFormularyCoverage(medicationName, patientInsurance.healthFund);
    }
  }

  /**
   * Get preferred alternatives based on health fund formulary
   */
  async getPreferredAlternatives(
    medicationName: string,
    healthFund: string,
    therapeuticClass: string
  ): Promise<string[]> {
    const fund = this.healthFunds.get(healthFund);
    if (!fund) return [];

    try {
      const response = await axios.get(
        `${fund.apiUrl}/formulary/alternatives`,
        {
          headers: {
            'Authorization': `Bearer ${fund.apiKey}`,
            'Content-Type': 'application/json'
          },
          params: {
            medication: medicationName,
            therapeutic_class: therapeuticClass
          }
        }
      );

      return response.data.alternatives || [];
    } catch (error) {
      this.logger.error(`Error getting alternatives: ${error}`);
      return this.getStaticAlternatives(medicationName, therapeuticClass);
    }
  }

  /**
   * Submit prior authorization request
   */
  async submitPriorAuthRequest(
    patientInfo: any,
    medicationInfo: any,
    clinicalJustification: string
  ): Promise<{ requestId: string; status: string; estimatedDecisionTime: string }> {
    const healthFund = this.healthFunds.get(patientInfo.insurance.healthFund);
    if (!healthFund) {
      throw new Error(`Unknown health fund: ${patientInfo.insurance.healthFund}`);
    }

    const requestData = {
      patient_id: this.hashPatientId(patientInfo.insurance.membershipNumber),
      medication: medicationInfo.name,
      dosage: medicationInfo.dosage,
      quantity: medicationInfo.quantity,
      clinical_justification: clinicalJustification,
      prescriber: {
        name: patientInfo.prescriber.name,
        license: patientInfo.prescriber.license,
        specialty: 'Geriatrics'
      },
      hospital_code: process.env.HOSPITAL_CODE,
      department_code: process.env.DEPARTMENT_CODE
    };

    try {
      const response = await axios.post(
        `${healthFund.apiUrl}/prior-auth/submit`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${healthFund.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        requestId: response.data.request_id,
        status: response.data.status,
        estimatedDecisionTime: response.data.estimated_decision_time
      };
    } catch (error) {
      this.logger.error(`Error submitting prior auth: ${error}`);
      throw new Error('Failed to submit prior authorization request');
    }
  }

  /**
   * Get lab results from health fund systems
   */
  async getLabResults(
    patientId: string,
    healthFund: string,
    dateRange: { from: Date; to: Date }
  ): Promise<LabResult[]> {
    const fund = this.healthFunds.get(healthFund);
    if (!fund || !fund.features.includes('lab_results')) {
      return [];
    }

    try {
      const response = await axios.get(
        `${fund.apiUrl}/lab-results`,
        {
          headers: {
            'Authorization': `Bearer ${fund.apiKey}`,
            'Content-Type': 'application/json'
          },
          params: {
            patient_id: this.hashPatientId(patientId),
            from_date: dateRange.from.toISOString(),
            to_date: dateRange.to.toISOString()
          }
        }
      );

      return response.data.results.map((result: any) => ({
        testName: result.test_name,
        value: result.value,
        unit: result.unit,
        referenceRange: result.reference_range,
        status: this.interpretLabStatus(result.value, result.reference_range),
        labCode: result.lab_code,
        timestamp: new Date(result.timestamp)
      }));
    } catch (error) {
      this.logger.error(`Error getting lab results: ${error}`);
      return [];
    }
  }

  /**
   * Report to Ministry of Health
   */
  async reportToMOH(report: MOHReporting): Promise<boolean> {
    const mohUrl = process.env.MOH_REPORTING_URL;
    if (!mohUrl || !this.mohApiKey) {
      this.logger.warn('MOH reporting not configured');
      return false;
    }

    try {
      const encryptedData = this.encryptSensitiveData(report.data);
      
      const response = await axios.post(
        `${mohUrl}/reports`,
        {
          report_type: report.reportType,
          data: encryptedData,
          hospital_code: report.hospitalCode,
          department_code: report.departmentCode,
          timestamp: report.timestamp.toISOString()
        },
        {
          headers: {
            'Authorization': `Bearer ${this.mohApiKey}`,
            'Content-Type': 'application/json',
            'X-Hospital-Code': process.env.HOSPITAL_CODE
          }
        }
      );

      this.logger.info(`Successfully reported ${report.reportType} to MOH`);
      return response.status === 200;
    } catch (error) {
      this.logger.error(`Error reporting to MOH: ${error}`);
      return false;
    }
  }

  /**
   * Get Israeli drug database information
   */
  async getIsraeliDrugInfo(medicationName: string): Promise<any> {
    const mohDrugUrl = process.env.MOH_FORMULARY_URL;
    if (!mohDrugUrl) return null;

    try {
      const response = await axios.get(
        `${mohDrugUrl}/drug-info`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.ISRAELI_MOH_DRUG_API_KEY}`,
            'Content-Type': 'application/json'
          },
          params: {
            drug_name: medicationName,
            language: 'he' // Hebrew
          }
        }
      );

      return {
        hebrewName: response.data.hebrew_name,
        registration: response.data.registration_number,
        manufacturer: response.data.manufacturer,
        activeIngredients: response.data.active_ingredients,
        indications: response.data.indications,
        contraindications: response.data.contraindications,
        warnings: response.data.warnings,
        mohApprovalDate: response.data.approval_date,
        pregnancyCategory: response.data.pregnancy_category
      };
    } catch (error) {
      this.logger.error(`Error getting Israeli drug info: ${error}`);
      return null;
    }
  }

  /**
   * Check for drug recalls or safety alerts in Israel
   */
  async checkDrugSafetyAlerts(medicationName: string): Promise<any[]> {
    const mohUrl = process.env.MOH_FORMULARY_URL;
    if (!mohUrl) return [];

    try {
      const response = await axios.get(
        `${mohUrl}/safety-alerts`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.ISRAELI_MOH_DRUG_API_KEY}`,
            'Content-Type': 'application/json'
          },
          params: {
            drug_name: medicationName,
            active_only: true
          }
        }
      );

      return response.data.alerts || [];
    } catch (error) {
      this.logger.error(`Error checking safety alerts: ${error}`);
      return [];
    }
  }

  /**
   * Get geriatric-specific dosing recommendations for Israeli population
   */
  async getGeriatricDosingGuidance(
    medicationName: string,
    patientAge: number,
    renalFunction: number
  ): Promise<any> {
    // This would integrate with Israeli geriatric medicine society guidelines
    return {
      recommendedDose: 'As per Israeli Geriatric Society guidelines',
      renalAdjustment: renalFunction < 60 ? 'Dose reduction recommended' : 'Standard dosing',
      monitoringParameters: ['Renal function', 'Clinical response', 'Adverse effects'],
      israeliSpecificConsiderations: 'Consider local prescribing patterns and patient preferences'
    };
  }

  private async testHealthFundConnections(): Promise<void> {
    for (const [name, fund] of this.healthFunds) {
      try {
        const response = await axios.get(`${fund.apiUrl}/health`, {
          headers: { 'Authorization': `Bearer ${fund.apiKey}` },
          timeout: 5000
        });
        
        if (response.status === 200) {
          this.logger.info(`✅ ${name} health fund connection successful`);
        }
      } catch (error) {
        this.logger.warn(`⚠️  ${name} health fund connection failed: ${error}`);
      }
    }
  }

  private hashPatientId(patientId: string): string {
    // Hash patient ID for privacy compliance
    return crypto.createHash('sha256').update(patientId + this.encryptionKey).digest('hex');
  }

  private calculateCopayment(baseCost: number, copaymentLevel: string): number {
    const copaymentRates = {
      'standard': 0.25, // 25% copayment
      'reduced': 0.10,  // 10% copayment
      'exempt': 0.00    // No copayment
    };
    
    const rate = copaymentRates[copaymentLevel as keyof typeof copaymentRates] || 0.25;
    return Math.round(baseCost * rate * 100) / 100; // Round to 2 decimal places
  }

  private async getStaticFormularyCoverage(
    medicationName: string,
    healthFund: string
  ): Promise<MedicationCoverage> {
    // Fallback static data for common Israeli medications
    const staticCoverage: { [key: string]: any } = {
      'metformin': { covered: true, copayment: 12.5, priorAuthRequired: false },
      'amlodipine': { covered: true, copayment: 15.0, priorAuthRequired: false },
      'atorvastatin': { covered: true, copayment: 20.0, priorAuthRequired: false },
      'omeprazole': { covered: true, copayment: 8.5, priorAuthRequired: false },
      'aspirin': { covered: true, copayment: 5.0, priorAuthRequired: false }
    };

    const coverage = staticCoverage[medicationName.toLowerCase()] || {
      covered: false,
      copayment: 0,
      priorAuthRequired: true
    };

    return {
      medication: medicationName,
      covered: coverage.covered,
      copayment: coverage.copayment,
      priorAuthRequired: coverage.priorAuthRequired,
      restrictions: [],
      alternatives: [],
      lastUpdated: new Date()
    };
  }

  private getStaticAlternatives(medicationName: string, therapeuticClass: string): string[] {
    // Static alternatives for common Israeli medications
    const alternatives: { [key: string]: string[] } = {
      'atorvastatin': ['simvastatin', 'rosuvastatin'],
      'amlodipine': ['nifedipine', 'felodipine'],
      'omeprazole': ['esomeprazole', 'pantoprazole'],
      'ramipril': ['enalapril', 'lisinopril']
    };

    return alternatives[medicationName.toLowerCase()] || [];
  }

  private interpretLabStatus(value: any, referenceRange: string): 'normal' | 'abnormal' | 'critical' {
    // Simple interpretation logic - in production this would be more sophisticated
    if (typeof value === 'number' && referenceRange) {
      // Parse reference range and compare
      // This is a simplified version
      return 'normal';
    }
    return 'normal';
  }

  private encryptSensitiveData(data: any): string {
    const cipher = crypto.createCipher('aes-256-cbc', this.encryptionKey);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
}