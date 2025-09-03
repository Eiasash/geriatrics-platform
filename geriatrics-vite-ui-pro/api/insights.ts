// api/insights.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE!;
const openaiKey = process.env.OPENAI_API_KEY;

const supabase = createClient(supabaseUrl, serviceKey);
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

type InsightType = 'fall_risk' | 'med_interaction' | 'mmse_trend' | 'care_plan' | 'readmission';

// --- Deterministic baselines ---
function fallRiskBaseline(input: {
  morseScore?: number;
  frailScore?: number;
  recentFalls?: number;
  age?: number;
  medications?: number;
}) {
  const score = 
    (input.morseScore ?? 0) +
    (input.frailScore ?? 0) * 10 +
    (input.recentFalls ?? 0) * 15 +
    (input.age && input.age > 85 ? 10 : 0) +
    (input.medications && input.medications > 10 ? 5 : 0);
  
  const band = score >= 60 ? 'high' : score >= 30 ? 'moderate' : 'low';
  
  const recommendations = [];
  if (band === 'high') {
    recommendations.push('Implement hourly rounding');
    recommendations.push('Bed alarm activation');
    recommendations.push('PT consult for gait training');
    recommendations.push('Review medications for fall risk');
  } else if (band === 'moderate') {
    recommendations.push('Fall risk signage');
    recommendations.push('Non-slip footwear');
    recommendations.push('Ensure call bell within reach');
  }
  
  return { score, band, recommendations };
}

function mmseTrendBaseline(points: Array<{ date: string; score: number }>) {
  if (!points?.length) return { slope: 0, band: 'insufficient', interpretation: 'Need more data points' };
  
  if (points.length === 1) {
    const score = points[0].score;
    return {
      slope: 0,
      band: score < 24 ? 'impaired' : 'normal',
      interpretation: `Single assessment: ${score}/30`,
      currentScore: score
    };
  }
  
  // Simple linear regression
  const xs = points.map((p, i) => i);
  const ys = points.map(p => p.score);
  const n = xs.length;
  const sx = xs.reduce((a, b) => a + b, 0);
  const sy = ys.reduce((a, b) => a + b, 0);
  const sxx = xs.reduce((a, b) => a + b * b, 0);
  const sxy = xs.reduce((a, b, i) => a + b * ys[i], 0);
  const slope = (n * sxy - sx * sy) / Math.max(1, (n * sxx - sx * sx));
  
  const band = slope <= -1 ? 'declining' : slope >= 1 ? 'improving' : 'stable';
  const currentScore = ys[ys.length - 1];
  
  let interpretation = `Current: ${currentScore}/30, `;
  if (band === 'declining') {
    interpretation += `declining ${Math.abs(slope).toFixed(1)} points per assessment`;
  } else if (band === 'improving') {
    interpretation += `improving ${slope.toFixed(1)} points per assessment`;
  } else {
    interpretation += 'stable';
  }
  
  return { slope, band, interpretation, currentScore };
}

function medInteractionBaseline(meds: Array<{ generic_name: string; acb_score?: number }>) {
  const set = new Set(meds.map(m => m.generic_name.toLowerCase()));
  const flags: Array<{ severity: string; message: string }> = [];
  
  // ACB burden calculation
  const totalACB = meds.reduce((sum, m) => sum + (m.acb_score || 0), 0);
  if (totalACB >= 3) {
    flags.push({
      severity: 'high',
      message: `High anticholinergic burden (ACB total: ${totalACB}) - increased risk of cognitive decline, falls, mortality`
    });
  }
  
  // Specific interactions
  if (set.has('warfarin') && set.has('amiodarone')) {
    flags.push({
      severity: 'high',
      message: 'Warfarin × Amiodarone: ↑INR/bleeding risk - reduce warfarin dose by 30-50%'
    });
  }
  
  if (set.has('diazepam') || set.has('lorazepam') || set.has('alprazolam')) {
    flags.push({
      severity: 'medium',
      message: 'Benzodiazepine use: ↑falls, delirium, cognitive impairment - consider taper'
    });
  }
  
  if (set.has('amitriptyline') || set.has('nortriptyline')) {
    flags.push({
      severity: 'high',
      message: 'Tricyclic antidepressant: high anticholinergic burden (ACB 3) - avoid in elderly'
    });
  }
  
  // Check for multiple CNS-active drugs
  const cnsActive = ['diazepam', 'lorazepam', 'zolpidem', 'trazodone', 'quetiapine', 'gabapentin'];
  const cnsCount = cnsActive.filter(drug => set.has(drug)).length;
  if (cnsCount >= 3) {
    flags.push({
      severity: 'high',
      message: `Multiple CNS-active drugs (${cnsCount}) - high risk of falls and sedation`
    });
  }
  
  return flags;
}

function readmissionRiskBaseline(input: {
  age?: number;
  admissionsLastYear?: number;
  numberOfMeds?: number;
  hasChf?: boolean;
  hasCopd?: boolean;
  albumin?: number;
}) {
  let score = 0;
  
  // HOSPITAL score components
  if (input.albumin && input.albumin < 3) score += 2;
  if (input.admissionsLastYear && input.admissionsLastYear >= 2) score += 2;
  if (input.numberOfMeds && input.numberOfMeds > 10) score += 1;
  if (input.hasChf) score += 2;
  if (input.hasCopd) score += 1;
  if (input.age && input.age > 85) score += 1;
  
  const risk = score >= 5 ? 'high' : score >= 3 ? 'moderate' : 'low';
  const probability = score >= 5 ? '20-30%' : score >= 3 ? '10-20%' : '<10%';
  
  return { score, risk, probability };
}

// --- LLM prompt helpers (optional) ---
async function carePlanLLM(payload: any) {
  if (!openai) return { plan: 'AI care planning disabled - set OPENAI_API_KEY in environment' };
  
  try {
    const sys = `You are a geriatric medicine specialist. Create concise, evidence-based care plans. 
Focus on actionable items with specific interventions. Use bullet points.`;
    
    const user = `Patient summary:
Age: ${payload.patient?.age || 'Unknown'}
Diagnoses: ${payload.patient?.primary_diagnosis || 'Unknown'}
MMSE: ${payload.mmse_trend?.currentScore || 'Not assessed'} (${payload.mmse_trend?.band || 'Unknown'})
Fall Risk: ${payload.fall_risk?.band || 'Unknown'}
Medications: ${payload.medications?.length || 0} active
Key Concerns: ${payload.med_interaction?.length || 0} drug interactions flagged

Create a prioritized care plan with:
1. Immediate safety concerns
2. Medication optimization (Beers/ACB)
3. Cognitive/functional interventions
4. Preventive measures
5. Family/caregiver education needs`;

    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user }
      ],
      temperature: 0.2,
      max_tokens: 500
    });
    
    return { plan: resp.choices[0].message?.content ?? 'No plan generated' };
  } catch (error) {
    console.error('LLM error:', error);
    return { plan: 'Error generating care plan' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { patientId, types } = req.body ?? {};
    
    if (!patientId) {
      return res.status(400).json({ ok: false, error: 'patientId required' });
    }
    
    const want: InsightType[] = types ?? ['fall_risk', 'med_interaction', 'mmse_trend', 'care_plan'];
    
    // Load patient data
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();
    
    if (patientError || !patient) {
      return res.status(404).json({ ok: false, error: 'Patient not found' });
    }
    
    // Calculate age
    const age = patient.dob ? 
      Math.floor((Date.now() - new Date(patient.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;
    
    // Load MMSE scores
    const { data: mmse } = await supabase
      .from('mmse_scores')
      .select('assessed_at, score')
      .eq('patient_id', patientId)
      .order('assessed_at', { ascending: true });
    
    // Load medications
    const { data: ptMeds } = await supabase
      .from('patient_meds')
      .select('*, meds:med_id (generic_name, hebrew_name, acb_score, beers_warning)')
      .eq('patient_id', patientId)
      .eq('active', true);
    
    // Load recent assessments
    const { data: assessments } = await supabase
      .from('assessments')
      .select('type, score, risk_level')
      .eq('patient_id', patientId)
      .order('assessed_at', { ascending: false })
      .limit(10);
    
    // Build results
    const results: Record<string, any> = {};
    
    if (want.includes('fall_risk')) {
      const morseAssessment = assessments?.find(a => a.type === 'morse_fall');
      const frailAssessment = assessments?.find(a => a.type === 'frail');
      
      results.fall_risk = fallRiskBaseline({
        morseScore: morseAssessment?.score || 0,
        frailScore: frailAssessment?.score || 0,
        recentFalls: 0, // Would need to query from notes or tasks
        age: age || 0,
        medications: ptMeds?.length || 0
      });
    }
    
    if (want.includes('mmse_trend')) {
      const points = (mmse ?? []).map(m => ({ 
        date: m.assessed_at, 
        score: m.score 
      }));
      results.mmse_trend = mmseTrendBaseline(points);
    }
    
    if (want.includes('med_interaction')) {
      const meds = (ptMeds ?? []).map((r: any) => ({
        generic_name: r.meds?.generic_name || '',
        acb_score: r.meds?.acb_score || 0
      }));
      results.med_interaction = medInteractionBaseline(meds);
    }
    
    if (want.includes('readmission')) {
      results.readmission = readmissionRiskBaseline({
        age: age || 0,
        admissionsLastYear: 0, // Would need historical data
        numberOfMeds: ptMeds?.length || 0,
        hasChf: patient.primary_diagnosis?.toLowerCase().includes('chf') || false,
        hasCopd: patient.primary_diagnosis?.toLowerCase().includes('copd') || false,
        albumin: 3.5 // Would need from lab_results
      });
    }
    
    if (want.includes('care_plan')) {
      results.care_plan = await carePlanLLM({
        patient: { ...patient, age },
        mmse_trend: results.mmse_trend,
        fall_risk: results.fall_risk,
        med_interaction: results.med_interaction,
        medications: ptMeds
      });
    }
    
    // Cache results
    for (const [type, payload] of Object.entries(results)) {
      await supabase.from('insights_cache').insert({
        patient_id: patientId,
        type,
        payload,
        score: payload.score,
        risk_band: payload.band || payload.risk
      });
    }
    
    // Audit log
    await supabase.from('audit_logs').insert({
      actor: 'system-api',
      category: 'ai',
      severity: 'info',
      action: 'compute_insights',
      details: { patientId, types: want }
    });
    
    res.status(200).json({ 
      ok: true, 
      patientId, 
      patient: {
        name: `${patient.first_name} ${patient.last_name}`,
        mrn: patient.mrn,
        age
      },
      results 
    });
    
  } catch (err: any) {
    console.error('Insights API error:', err);
    
    // Log error
    try {
      await supabase.from('audit_logs').insert({
        actor: 'system-api',
        category: 'ai',
        severity: 'error',
        action: 'compute_insights',
        details: { error: err.message || String(err) }
      });
    } catch (logErr) {
      console.error('Failed to log error:', logErr);
    }
    
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to compute insights',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}