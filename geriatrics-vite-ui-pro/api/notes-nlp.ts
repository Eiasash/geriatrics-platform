// api/notes-nlp.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openaiKey = process.env.OPENAI_API_KEY;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE!;
const supabase = createClient(supabaseUrl, serviceKey);

// Comprehensive medical abbreviations dictionary
const MEDICAL_DICT: Record<string, string> = {
  // English abbreviations
  "htn": "Hypertension",
  "dm": "Diabetes Mellitus",
  "af": "Atrial Fibrillation",
  "afib": "Atrial Fibrillation",
  "cad": "Coronary Artery Disease",
  "chf": "Congestive Heart Failure",
  "copd": "Chronic Obstructive Pulmonary Disease",
  "ckd": "Chronic Kidney Disease",
  "esrd": "End-Stage Renal Disease",
  "aki": "Acute Kidney Injury",
  "uti": "Urinary Tract Infection",
  "cva": "Cerebrovascular Accident (Stroke)",
  "tia": "Transient Ischemic Attack",
  "mi": "Myocardial Infarction",
  "cabg": "Coronary Artery Bypass Graft",
  "pci": "Percutaneous Coronary Intervention",
  "bph": "Benign Prostatic Hyperplasia",
  "gerd": "Gastroesophageal Reflux Disease",
  "gi": "Gastrointestinal",
  "sob": "Shortness of Breath",
  "doe": "Dyspnea on Exertion",
  "cp": "Chest Pain",
  "bp": "Blood Pressure",
  "hr": "Heart Rate",
  "rr": "Respiratory Rate",
  "o2": "Oxygen",
  "sat": "Saturation",
  "bun": "Blood Urea Nitrogen",
  "cr": "Creatinine",
  "hgb": "Hemoglobin",
  "hct": "Hematocrit",
  "wbc": "White Blood Cell",
  "plt": "Platelet",
  "inr": "International Normalized Ratio",
  "ptt": "Partial Thromboplastin Time",
  "abx": "Antibiotics",
  "prn": "As Needed",
  "bid": "Twice Daily",
  "tid": "Three Times Daily",
  "qid": "Four Times Daily",
  "qhs": "At Bedtime",
  "po": "By Mouth",
  "iv": "Intravenous",
  "im": "Intramuscular",
  "sq": "Subcutaneous",
  "npo": "Nothing by Mouth",
  "dnr": "Do Not Resuscitate",
  "dni": "Do Not Intubate",
  "pt": "Physical Therapy",
  "ot": "Occupational Therapy",
  "st": "Speech Therapy",
  "snf": "Skilled Nursing Facility",
  "alf": "Assisted Living Facility",
  "ltc": "Long-Term Care",
  "ed": "Emergency Department",
  "icu": "Intensive Care Unit",
  "ccu": "Cardiac Care Unit",
  
  // Hebrew abbreviations
  "ש\"ס": "שבר צוואר הירך",
  "א\"ש": "אי ספיקת לב",
  "ס\"כ": "סוכרת",
  "י\"ד": "יתר לחץ דם",
  "ח\"כ": "חסר כליות",
  "ד\"צ": "דום צפק",
  "ש\"ד": "שבץ דם",
  "ד\"ק": "דום קרדיאלי",
  "ח\"ע": "חסימת עורקים",
  "ב\"ד": "בדיקת דם",
  "ק\"א": "קצב אטריאלי",
  "ל\"ד": "לחץ דם",
  "ח\"ח": "חדר חירום",
  "ט\"נ": "טיפול נמרץ",
  "ש\"ר": "שיקום רפואי"
};

// Extract medications mentioned in text
function extractMedications(text: string): string[] {
  const commonMeds = [
    'warfarin', 'coumadin', 'aspirin', 'plavix', 'clopidogrel',
    'metformin', 'insulin', 'lantus', 'glipizide',
    'lisinopril', 'enalapril', 'losartan', 'amlodipine',
    'atorvastatin', 'simvastatin', 'pravastatin',
    'furosemide', 'lasix', 'hydrochlorothiazide', 'hctz',
    'metoprolol', 'carvedilol', 'bisoprolol', 'atenolol',
    'levothyroxine', 'synthroid',
    'omeprazole', 'pantoprazole', 'famotidine',
    'gabapentin', 'pregabalin',
    'sertraline', 'escitalopram', 'citalopram', 'fluoxetine',
    'trazodone', 'mirtazapine',
    'donepezil', 'memantine', 'rivastigmine',
    'tamsulosin', 'finasteride',
    'albuterol', 'ipratropium', 'tiotropium',
    'prednisone', 'methylprednisolone',
    'acetaminophen', 'tylenol', 'ibuprofen', 'tramadol'
  ];
  
  const found: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const med of commonMeds) {
    if (lowerText.includes(med)) {
      found.push(med);
    }
  }
  
  return [...new Set(found)]; // Remove duplicates
}

// Extract vital signs and lab values
function extractValues(text: string): any {
  const values: any = {};
  
  // Blood pressure pattern
  const bpMatch = text.match(/(?:bp|blood pressure)[:\s]*(\d{2,3})\/(\d{2,3})/i);
  if (bpMatch) {
    values.bp = `${bpMatch[1]}/${bpMatch[2]}`;
  }
  
  // Heart rate pattern
  const hrMatch = text.match(/(?:hr|heart rate|pulse)[:\s]*(\d{2,3})/i);
  if (hrMatch) {
    values.hr = parseInt(hrMatch[1]);
  }
  
  // Temperature pattern
  const tempMatch = text.match(/(?:temp|temperature)[:\s]*(\d{2,3}(?:\.\d)?)/i);
  if (tempMatch) {
    values.temp = parseFloat(tempMatch[1]);
  }
  
  // O2 saturation pattern
  const o2Match = text.match(/(?:o2|sat|saturation|spo2)[:\s]*(\d{2,3})%?/i);
  if (o2Match) {
    values.o2sat = parseInt(o2Match[1]);
  }
  
  // Glucose pattern
  const glucoseMatch = text.match(/(?:glucose|blood sugar|bs)[:\s]*(\d{2,3})/i);
  if (glucoseMatch) {
    values.glucose = parseInt(glucoseMatch[1]);
  }
  
  // Creatinine pattern
  const crMatch = text.match(/(?:cr|creatinine)[:\s]*(\d+(?:\.\d+)?)/i);
  if (crMatch) {
    values.creatinine = parseFloat(crMatch[1]);
  }
  
  return values;
}

// Identify clinical concerns
function identifyConcerns(text: string): string[] {
  const concerns: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Fall risk indicators
  if (lowerText.includes('fall') || lowerText.includes('unsteady') || lowerText.includes('dizzy')) {
    concerns.push('Fall risk');
  }
  
  // Cognitive indicators
  if (lowerText.includes('confused') || lowerText.includes('delirium') || 
      lowerText.includes('dementia') || lowerText.includes('cognitive')) {
    concerns.push('Cognitive impairment');
  }
  
  // Medication concerns
  if (lowerText.includes('polypharmacy') || lowerText.includes('drug interaction') ||
      lowerText.includes('adverse')) {
    concerns.push('Medication safety');
  }
  
  // Nutritional concerns
  if (lowerText.includes('weight loss') || lowerText.includes('poor appetite') ||
      lowerText.includes('malnutrition')) {
    concerns.push('Nutritional risk');
  }
  
  // Social concerns
  if (lowerText.includes('isolated') || lowerText.includes('alone') ||
      lowerText.includes('no family') || lowerText.includes('placement')) {
    concerns.push('Social/placement issues');
  }
  
  // Pain
  if (lowerText.includes('pain') || lowerText.includes('discomfort') ||
      lowerText.includes('ache')) {
    concerns.push('Pain management');
  }
  
  return concerns;
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
    const { note, patientId } = req.body ?? {};
    
    if (!note) {
      return res.status(400).json({ ok: false, error: 'Note text required' });
    }
    
    // Local analysis
    const abbreviations = Object.entries(MEDICAL_DICT)
      .filter(([abbr]) => {
        const pattern = new RegExp(`\\b${abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        return pattern.test(note);
      })
      .map(([abbr, full]) => ({ abbr, full }));
    
    const medications = extractMedications(note);
    const values = extractValues(note);
    const concerns = identifyConcerns(note);
    
    // LLM analysis (optional)
    let aiSummary = null;
    let aiRecommendations = [];
    
    if (openai) {
      try {
        const prompt = `You are a geriatric medicine specialist analyzing clinical notes.
Extract and summarize the following from this note:
1. Chief complaint/reason for visit
2. Key assessment findings
3. Current problems list
4. Plan of care
5. Follow-up needs

Also identify:
- Red flags requiring immediate attention
- Geriatric syndromes present
- Medication optimization opportunities

Note:
${note}

Respond in structured JSON format with sections: summary, problems, plan, redFlags, recommendations`;

        const resp = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 800,
          response_format: { type: "json_object" }
        });
        
        const aiResponse = JSON.parse(resp.choices[0].message?.content ?? '{}');
        aiSummary = aiResponse.summary;
        aiRecommendations = aiResponse.recommendations || [];
        
      } catch (aiError) {
        console.error('AI analysis error:', aiError);
        aiSummary = 'AI analysis unavailable';
      }
    } else {
      aiSummary = 'AI analysis disabled - set OPENAI_API_KEY';
    }
    
    // Save to database if patientId provided
    if (patientId) {
      await supabase.from('clinical_notes').insert({
        patient_id: patientId,
        note_type: 'analyzed',
        note_text: note,
        author: 'NLP Analysis'
      });
      
      // Log the analysis
      await supabase.from('audit_logs').insert({
        actor: 'system-api',
        category: 'ai',
        severity: 'info',
        action: 'analyze_note',
        details: { 
          patientId,
          noteLength: note.length,
          abbreviationsFound: abbreviations.length,
          medicationsFound: medications.length
        }
      });
    }
    
    res.status(200).json({
      ok: true,
      analysis: {
        abbreviations,
        medications,
        values,
        concerns,
        wordCount: note.split(/\s+/).length,
        language: /[\u0590-\u05FF]/.test(note) ? 'hebrew_detected' : 'english'
      },
      ai: {
        summary: aiSummary,
        recommendations: aiRecommendations
      }
    });
    
  } catch (error: any) {
    console.error('Notes NLP error:', error);
    
    // Log error
    try {
      await supabase.from('audit_logs').insert({
        actor: 'system-api',
        category: 'ai',
        severity: 'error',
        action: 'analyze_note',
        details: { error: error.message || String(error) }
      });
    } catch (logErr) {
      console.error('Failed to log error:', logErr);
    }
    
    res.status(500).json({ 
      ok: false, 
      error: 'NLP analysis failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}