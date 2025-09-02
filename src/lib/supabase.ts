import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types
export interface Patient {
  id: string;
  name: string;
  age: number;
  bed_number: string;
  admission_date: string;
  diagnoses: string[];
  medications: string[];
  risk_level: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at?: string;
}

export interface Assessment {
  id: string;
  patient_id: string;
  assessment_type: 'mmse' | 'morse_fall' | 'tug' | 'moca' | 'mna';
  score: {
    total: number;
    subscores?: Record<string, number>;
    risk_category?: string;
    notes?: string;
  };
  performed_by: string;
  created_at: string;
}

export interface Alert {
  id: string;
  patient_id: string;
  alert_type: 'cognitive_decline' | 'fall_risk' | 'medication_change' | 'vital_signs';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  resolved: boolean;
  created_at: string;
  resolved_at?: string;
}

// Database operations
export const db = {
  // Patients
  async getPatients(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('admission_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getPatient(id: string): Promise<Patient | null> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async createPatient(patient: Omit<Patient, 'id' | 'created_at'>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .insert(patient)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePatient(id: string): Promise<void> {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Assessments
  async getAssessments(patientId: string): Promise<Assessment[]> {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createAssessment(assessment: Omit<Assessment, 'id' | 'created_at'>): Promise<Assessment> {
    const { data, error } = await supabase
      .from('assessments')
      .insert(assessment)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Alerts
  async getAlerts(patientId?: string): Promise<Alert[]> {
    let query = supabase
      .from('alerts')
      .select('*')
      .eq('resolved', false)
      .order('created_at', { ascending: false });
    
    if (patientId) {
      query = query.eq('patient_id', patientId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  },

  async createAlert(alert: Omit<Alert, 'id' | 'created_at'>): Promise<Alert> {
    const { data, error } = await supabase
      .from('alerts')
      .insert(alert)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async resolveAlert(id: string): Promise<void> {
    const { error } = await supabase
      .from('alerts')
      .update({ 
        resolved: true, 
        resolved_at: new Date().toISOString() 
      })
      .eq('id', id);
    
    if (error) throw error;
  },

  // Real-time subscriptions
  subscribeToPatients(callback: (payload: any) => void) {
    return supabase
      .channel('patients_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'patients' 
      }, callback)
      .subscribe();
  },

  subscribeToAlerts(callback: (payload: any) => void) {
    return supabase
      .channel('alerts_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'alerts' 
      }, callback)
      .subscribe();
  },

  subscribeToAssessments(patientId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`assessments_${patientId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'assessments',
        filter: `patient_id=eq.${patientId}`
      }, callback)
      .subscribe();
  }
};

// Auth helpers
export const auth = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};