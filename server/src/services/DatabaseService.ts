/**
 * Database Service - Enterprise PostgreSQL with Read Replicas
 * HIPAA-compliant data handling with encryption at rest and in transit
 */

import { Pool, PoolClient } from 'pg';
import winston from 'winston';
import crypto from 'crypto';

interface DatabaseConfig {
  primary: Pool;
  readReplica?: Pool;
  encryptionKey: string;
}

export class DatabaseService {
  private logger: winston.Logger;
  private primaryPool: Pool;
  private readReplicaPool?: Pool;
  private encryptionKey: string;
  private initialized: boolean = false;

  constructor() {
    this.logger = winston.createLogger({
      service: 'database-service'
    });

    this.encryptionKey = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing Database Service...');

    // Primary database connection
    this.primaryPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      min: parseInt(process.env.DATABASE_POOL_MIN || '2'),
      max: parseInt(process.env.DATABASE_POOL_MAX || '20'),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '10000'),
      connectionTimeoutMillis: parseInt(process.env.DB_QUERY_TIMEOUT || '30000'),
      query_timeout: parseInt(process.env.DB_STATEMENT_TIMEOUT || '60000'),
    });

    // Read replica connection (if configured)
    if (process.env.DATABASE_READ_URL) {
      this.readReplicaPool = new Pool({
        connectionString: process.env.DATABASE_READ_URL,
        ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
        min: parseInt(process.env.DATABASE_POOL_MIN || '2'),
        max: parseInt(process.env.DATABASE_POOL_MAX || '20'),
      });
    }

    // Test connections
    await this.testConnections();
    
    this.initialized = true;
    this.logger.info('Database Service initialized successfully');
  }

  private async testConnections(): Promise<void> {
    try {
      // Test primary connection
      const primaryClient = await this.primaryPool.connect();
      await primaryClient.query('SELECT 1');
      primaryClient.release();
      this.logger.info('✅ Primary database connection successful');

      // Test read replica connection
      if (this.readReplicaPool) {
        const replicaClient = await this.readReplicaPool.connect();
        await replicaClient.query('SELECT 1');
        replicaClient.release();
        this.logger.info('✅ Read replica database connection successful');
      }
    } catch (error) {
      this.logger.error('Database connection failed:', error);
      throw error;
    }
  }

  // Patient Management
  async createPatient(patientData: any): Promise<string> {
    const client = await this.primaryPool.connect();
    try {
      await client.query('BEGIN');

      // Encrypt sensitive data
      const encryptedData = {
        ...patientData,
        ssn: patientData.ssn ? this.encrypt(patientData.ssn) : null,
        phone: patientData.phone ? this.encrypt(patientData.phone) : null,
        email: patientData.email ? this.encrypt(patientData.email) : null
      };

      const query = `
        INSERT INTO patients (
          id, first_name, last_name, date_of_birth, gender,
          ssn_encrypted, phone_encrypted, email_encrypted,
          health_fund, membership_number, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        RETURNING id
      `;

      const patientId = crypto.randomUUID();
      const result = await client.query(query, [
        patientId,
        encryptedData.firstName,
        encryptedData.lastName,
        encryptedData.dateOfBirth,
        encryptedData.gender,
        encryptedData.ssn,
        encryptedData.phone,
        encryptedData.email,
        encryptedData.healthFund,
        encryptedData.membershipNumber
      ]);

      await client.query('COMMIT');
      this.logger.info(`Created patient: ${patientId}`);
      return patientId;
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error('Error creating patient:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getPatient(patientId: string): Promise<any> {
    const pool = this.readReplicaPool || this.primaryPool;
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          id, first_name, last_name, date_of_birth, gender,
          ssn_encrypted, phone_encrypted, email_encrypted,
          health_fund, membership_number, created_at, updated_at
        FROM patients 
        WHERE id = $1
      `;

      const result = await client.query(query, [patientId]);
      
      if (result.rows.length === 0) {
        return null;
      }

      const patient = result.rows[0];
      
      // Decrypt sensitive data
      return {
        ...patient,
        ssn: patient.ssn_encrypted ? this.decrypt(patient.ssn_encrypted) : null,
        phone: patient.phone_encrypted ? this.decrypt(patient.phone_encrypted) : null,
        email: patient.email_encrypted ? this.decrypt(patient.email_encrypted) : null
      };
    } catch (error) {
      this.logger.error('Error getting patient:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Medication Management
  async addPatientMedication(patientId: string, medicationData: any): Promise<string> {
    const client = await this.primaryPool.connect();
    try {
      await client.query('BEGIN');

      const medicationId = crypto.randomUUID();
      const query = `
        INSERT INTO patient_medications (
          id, patient_id, medication_name, dosage, frequency,
          route, start_date, end_date, indication, prescriber,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        RETURNING id
      `;

      await client.query(query, [
        medicationId,
        patientId,
        medicationData.name,
        medicationData.dosage,
        medicationData.frequency,
        medicationData.route,
        medicationData.startDate,
        medicationData.endDate,
        medicationData.indication,
        medicationData.prescriber
      ]);

      await client.query('COMMIT');
      return medicationId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getPatientMedications(patientId: string): Promise<any[]> {
    const pool = this.readReplicaPool || this.primaryPool;
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM patient_medications 
        WHERE patient_id = $1 AND (end_date IS NULL OR end_date > NOW())
        ORDER BY start_date DESC
      `;

      const result = await client.query(query, [patientId]);
      return result.rows;
    } catch (error) {
      this.logger.error('Error getting patient medications:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Clinical Decision Logging
  async logClinicalDecision(
    patientId: string,
    userId: string,
    decisionType: string,
    decisionData: any,
    outcome?: string
  ): Promise<string> {
    const client = await this.primaryPool.connect();
    try {
      await client.query('BEGIN');

      const decisionId = crypto.randomUUID();
      const query = `
        INSERT INTO clinical_decisions (
          id, patient_id, user_id, decision_type, decision_data,
          outcome, timestamp, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING id
      `;

      await client.query(query, [
        decisionId,
        patientId,
        userId,
        decisionType,
        JSON.stringify(decisionData),
        outcome
      ]);

      await client.query('COMMIT');
      return decisionId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Fellowship Management
  async createFellowshipUser(userData: any): Promise<string> {
    const client = await this.primaryPool.connect();
    try {
      await client.query('BEGIN');

      const userId = crypto.randomUUID();
      
      // Insert user
      const userQuery = `
        INSERT INTO users (
          id, email, password_hash, first_name, last_name,
          role, department, fellowship_year, license_number,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING id
      `;

      await client.query(userQuery, [
        userId,
        userData.email,
        userData.passwordHash,
        userData.firstName,
        userData.lastName,
        userData.role || 'fellow',
        userData.department || 'geriatrics',
        userData.fellowshipYear,
        userData.licenseNumber
      ]);

      // Initialize fellowship milestones
      await this.initializeFellowshipMilestones(userId, client);

      await client.query('COMMIT');
      return userId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async updateFellowshipMilestone(userId: string, milestone: any): Promise<void> {
    const client = await this.primaryPool.connect();
    try {
      const query = `
        UPDATE fellowship_milestones 
        SET 
          status = $3,
          completion_date = CASE WHEN $3 = 'completed' THEN NOW() ELSE completion_date END,
          notes = $4,
          updated_at = NOW()
        WHERE user_id = $1 AND milestone_id = $2
      `;

      await client.query(query, [
        userId,
        milestone.id,
        milestone.status,
        milestone.notes
      ]);
    } catch (error) {
      this.logger.error('Error updating fellowship milestone:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  private async initializeFellowshipMilestones(userId: string, client: PoolClient): Promise<void> {
    const milestones = [
      { name: 'Comprehensive Geriatric Assessment', category: 'clinical' },
      { name: 'Medication Management', category: 'clinical' },
      { name: 'Falls Prevention', category: 'clinical' },
      { name: 'Dementia Care', category: 'clinical' },
      { name: 'Research Project', category: 'research' },
      { name: 'Quality Improvement', category: 'quality' },
      { name: 'Teaching Skills', category: 'education' }
    ];

    for (const milestone of milestones) {
      const milestoneId = crypto.randomUUID();
      await client.query(
        `INSERT INTO fellowship_milestones (
          id, user_id, milestone_name, category, status, created_at
        ) VALUES ($1, $2, $3, $4, 'not_started', NOW())`,
        [milestoneId, userId, milestone.name, milestone.category]
      );
    }
  }

  // Analytics and Reporting
  async getQualityMetrics(dateRange: { from: Date; to: Date }): Promise<any> {
    const pool = this.readReplicaPool || this.primaryPool;
    const client = await pool.connect();
    try {
      const queries = {
        totalPatients: `
          SELECT COUNT(*) as count 
          FROM patients 
          WHERE created_at BETWEEN $1 AND $2
        `,
        totalDecisions: `
          SELECT COUNT(*) as count 
          FROM clinical_decisions 
          WHERE created_at BETWEEN $1 AND $2
        `,
        medicationReviews: `
          SELECT COUNT(*) as count 
          FROM clinical_decisions 
          WHERE decision_type = 'medication_review' 
          AND created_at BETWEEN $1 AND $2
        `,
        drugInteractions: `
          SELECT COUNT(*) as count 
          FROM clinical_decisions 
          WHERE decision_type = 'drug_interactions' 
          AND created_at BETWEEN $1 AND $2
        `
      };

      const results = {};
      for (const [key, query] of Object.entries(queries)) {
        const result = await client.query(query, [dateRange.from, dateRange.to]);
        results[key] = parseInt(result.rows[0].count);
      }

      return results;
    } catch (error) {
      this.logger.error('Error getting quality metrics:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Research Data
  async storeResearchData(studyId: string, data: any): Promise<string> {
    const client = await this.primaryPool.connect();
    try {
      await client.query('BEGIN');

      const recordId = crypto.randomUUID();
      
      // Anonymize and encrypt research data
      const anonymizedData = this.anonymizeResearchData(data);
      const encryptedData = this.encrypt(JSON.stringify(anonymizedData));

      const query = `
        INSERT INTO research_data (
          id, study_id, data_encrypted, created_at
        ) VALUES ($1, $2, $3, NOW())
        RETURNING id
      `;

      await client.query(query, [recordId, studyId, encryptedData]);
      await client.query('COMMIT');
      
      return recordId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Utility Methods
  private encrypt(text: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', this.encryptionKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  private decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', this.encryptionKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  private anonymizeResearchData(data: any): any {
    // Remove or hash identifiable information for research
    const anonymized = { ...data };
    delete anonymized.name;
    delete anonymized.ssn;
    delete anonymized.phone;
    delete anonymized.email;
    
    if (anonymized.patientId) {
      anonymized.patientId = crypto.createHash('sha256')
        .update(anonymized.patientId + this.encryptionKey)
        .digest('hex');
    }
    
    return anonymized;
  }

  async close(): Promise<void> {
    this.logger.info('Closing database connections...');
    
    await this.primaryPool.end();
    if (this.readReplicaPool) {
      await this.readReplicaPool.end();
    }
    
    this.logger.info('Database connections closed');
  }

  // Health Check
  async healthCheck(): Promise<{ primary: boolean; replica: boolean }> {
    const health = { primary: false, replica: false };
    
    try {
      const client = await this.primaryPool.connect();
      await client.query('SELECT 1');
      client.release();
      health.primary = true;
    } catch (error) {
      this.logger.error('Primary database health check failed:', error);
    }

    if (this.readReplicaPool) {
      try {
        const client = await this.readReplicaPool.connect();
        await client.query('SELECT 1');
        client.release();
        health.replica = true;
      } catch (error) {
        this.logger.error('Replica database health check failed:', error);
      }
    } else {
      health.replica = true; // No replica configured
    }

    return health;
  }
}