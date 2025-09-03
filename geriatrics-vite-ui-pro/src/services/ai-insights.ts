// src/services/ai-insights.ts
import { supabase } from '../lib/supabase';

export interface InsightResult {
  fall_risk?: {
    score: number;
    band: 'low' | 'moderate' | 'high';
    recommendations: string[];
  };
  mmse_trend?: {
    slope: number;
    band: 'declining' | 'stable' | 'improving' | 'insufficient';
    interpretation: string;
    currentScore?: number;
  };
  med_interaction?: Array<{
    severity: string;
    message: string;
  }>;
  readmission?: {
    score: number;
    risk: 'low' | 'moderate' | 'high';
    probability: string;
  };
  care_plan?: {
    plan: string;
  };
}

export interface NoteAnalysis {
  abbreviations: Array<{ abbr: string; full: string }>;
  medications: string[];
  values: Record<string, any>;
  concerns: string[];
  wordCount: number;
  language: string;
}

// Fetch AI insights for a patient
export async function fetchInsights(
  patientId: string,
  types: string[] = ['fall_risk', 'mmse_trend', 'med_interaction', 'care_plan']
): Promise<InsightResult> {
  try {
    const response = await fetch('/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, types })
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.error || 'Failed to fetch insights');
    }
    
    return data.results;
  } catch (error) {
    console.error('Error fetching insights:', error);
    
    // Try to get cached insights from Supabase
    const { data: cached } = await supabase
      .from('insights_cache')
      .select('type, payload')
      .eq('patient_id', patientId)
      .gte('expires_at', new Date().toISOString());
    
    if (cached && cached.length > 0) {
      const results: InsightResult = {};
      cached.forEach(item => {
        results[item.type as keyof InsightResult] = item.payload;
      });
      return results;
    }
    
    throw error;
  }
}

// Analyze clinical note with NLP
export async function analyzeNote(
  text: string,
  patientId?: string
): Promise<{ analysis: NoteAnalysis; ai: any }> {
  try {
    const response = await fetch('/api/notes-nlp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: text, patientId })
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.error || 'Failed to analyze note');
    }
    
    return data;
  } catch (error) {
    console.error('Error analyzing note:', error);
    throw error;
  }
}

// Get patient risk summary
export async function getPatientRiskSummary(patientId: string) {
  try {
    // Fetch multiple data points in parallel
    const [patient, assessments, medications, insights] = await Promise.all([
      supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single(),
      
      supabase
        .from('assessments')
        .select('*')
        .eq('patient_id', patientId)
        .order('assessed_at', { ascending: false })
        .limit(5),
      
      supabase
        .from('patient_meds')
        .select('*, meds(*)')
        .eq('patient_id', patientId)
        .eq('active', true),
      
      fetchInsights(patientId, ['fall_risk', 'readmission', 'med_interaction'])
    ]);
    
    return {
      patient: patient.data,
      assessments: assessments.data,
      medications: medications.data,
      insights,
      summary: generateRiskSummary(insights)
    };
  } catch (error) {
    console.error('Error getting patient risk summary:', error);
    throw error;
  }
}

// Generate a text summary of risks
function generateRiskSummary(insights: InsightResult): string {
  const risks = [];
  
  if (insights.fall_risk?.band === 'high') {
    risks.push('High fall risk - implement safety protocols');
  }
  
  if (insights.readmission?.risk === 'high') {
    risks.push(`High readmission risk (${insights.readmission.probability})`);
  }
  
  if (insights.med_interaction && insights.med_interaction.length > 0) {
    const highSeverity = insights.med_interaction.filter(i => i.severity === 'high');
    if (highSeverity.length > 0) {
      risks.push(`${highSeverity.length} high-severity drug interactions`);
    }
  }
  
  if (insights.mmse_trend?.band === 'declining') {
    risks.push('Cognitive decline detected');
  }
  
  return risks.length > 0 
    ? risks.join('; ')
    : 'No significant risks identified';
}

// Save insights to cache
export async function cacheInsights(
  patientId: string,
  type: string,
  payload: any
) {
  try {
    const { error } = await supabase
      .from('insights_cache')
      .insert({
        patient_id: patientId,
        type,
        payload,
        computed_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error caching insights:', error);
  }
}

// Create alert for high-risk findings
export async function createRiskAlert(
  patientId: string,
  alertType: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  message: string,
  details?: any
) {
  try {
    const { error } = await supabase
      .from('alerts')
      .insert({
        patient_id: patientId,
        alert_type: alertType,
        severity,
        message,
        details,
        auto_generated: true
      });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error creating alert:', error);
  }
}

// Monitor patient for changes
export async function monitorPatientChanges(patientId: string) {
  // Subscribe to real-time changes
  const subscription = supabase
    .channel(`patient-${patientId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vital_signs',
        filter: `patient_id=eq.${patientId}`
      },
      async (payload) => {
        // Check for critical values
        if (payload.new && payload.eventType === 'INSERT') {
          const vitals = payload.new as any;
          
          // Check for critical vital signs
          if (vitals.bp_systolic && (vitals.bp_systolic > 180 || vitals.bp_systolic < 90)) {
            await createRiskAlert(
              patientId,
              'vital_critical',
              'critical',
              `Critical BP: ${vitals.bp_systolic}/${vitals.bp_diastolic}`,
              vitals
            );
          }
          
          if (vitals.heart_rate && (vitals.heart_rate > 120 || vitals.heart_rate < 50)) {
            await createRiskAlert(
              patientId,
              'vital_critical',
              'high',
              `Abnormal HR: ${vitals.heart_rate}`,
              vitals
            );
          }
          
          if (vitals.o2_sat && vitals.o2_sat < 90) {
            await createRiskAlert(
              patientId,
              'vital_critical',
              'critical',
              `Low O2: ${vitals.o2_sat}%`,
              vitals
            );
          }
        }
      }
    )
    .subscribe();
  
  return subscription;
}