import React, { useState } from 'react';

export default function EnhancedAnalyzer() {
  const [note, setNote] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyze = () => {
    // Extract medications
    const meds = note.match(/\b(warfarin|metformin|haloperidol|furosemide|ramipril|bisoprolol|amlodipine|apixaban|donepezil|memantine|quetiapine|lorazepam|gabapentin|omeprazole|levothyroxine|atorvastatin|lisinopril|spironolactone|digoxin|clopidogrel|aspirin|insulin|sertraline|escitalopram|mirtazapine|risperidone|olanzapine|prednisone|albuterol|ciprofloxacin|azithromycin|amoxicillin|acetaminophen|ibuprofen)\b/gi) || [];
    const hebrewMeds = note.match(/(הלדול|פוסיד|קומדין|טריטייס|קונקור|נורבסק|אליקוויס|אריספט|נמנדה|סרוקוול|אטיוון|ניורונטין|לוסק|אלטרוקסין|סורטיס|רמיפריל|אלדקטון|לנוקסין|פלביקס|אספירין|לנטוס|זולופט|ציפרלקס|רמרון|ריספרדל|זיפרקסה|פרדניזון|ונטולין|ציפרו|אוגמנטין|אקמול|אדוויל)/g) || [];
    
    // Check interactions
    const interactions = [];
    const allMeds = [...meds, ...hebrewMeds].map(m => m.toLowerCase());
    
    if (allMeds.some(m => m.includes('warfarin') || m === 'קומדין')) {
      interactions.push('⚠️ Warfarin detected - Monitor INR weekly');
      if (allMeds.some(m => m.includes('aspirin') || m === 'אספירין')) {
        interactions.push('🔴 CRITICAL: Warfarin + Aspirin = Major bleeding risk');
      }
      if (allMeds.some(m => m.includes('amiodarone'))) {
        interactions.push('🔴 CRITICAL: Warfarin + Amiodarone = INR increase 2-3x');
      }
    }
    
    if (allMeds.some(m => m.includes('furosemide') || m === 'פוסיד')) {
      interactions.push('Monitor K+ and Cr in 1 week');
    }
    
    if (allMeds.some(m => m.includes('haloperidol') || m === 'הלדול')) {
      interactions.push('⚠️ Haloperidol - Monitor QTc and EPS');
    }
    
    // Check for polypharmacy
    if (allMeds.length > 10) {
      interactions.push('⚠️ Polypharmacy detected - Consider medication review');
    }
    
    // Extract vitals if present
    const bp = note.match(/\b\d{2,3}\/\d{2,3}\b/g);
    const hr = note.match(/(?:HR|Pulse|דופק)[:\s]*(\d{2,3})/i)?.[1];
    const creatinine = note.match(/(?:Cr|Creatinine|קריאטינין)[:\s]*([\d.]+)/i)?.[1];
    
    setAnalysis({
      medications: [...meds, ...hebrewMeds],
      interactions,
      count: meds.length + hebrewMeds.length,
      vitals: {
        bp: bp ? bp[0] : null,
        hr: hr || null,
        creatinine: creatinine || null
      }
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>Clinical Note Analyzer</h2>
        <p style={{ margin: '10px 0 0', opacity: 0.9 }}>Hebrew & English Support</p>
      </div>
      
      <textarea 
        value={note} 
        onChange={(e) => setNote(e.target.value)}
        style={{
          width: '100%', 
          height: '200px',
          padding: '12px',
          fontSize: '14px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          fontFamily: 'monospace'
        }}
        placeholder={`Paste clinical note here (Hebrew/English)

Example:
85 y/o male with HTN, DM, AF
Meds: Warfarin 5mg, Furosemide 40mg, Ramipril 10mg
BP: 130/80, HR: 72, Cr: 1.5

או בעברית:
בן 85 עם יתר לחץ דם וסוכרת
תרופות: קומדין 5 מ"ג, פוסיד 40 מ"ג, טריטייס 10 מ"ג`}
      />
      
      <button 
        onClick={analyze}
        style={{
          background: '#667eea',
          color: 'white',
          padding: '12px 30px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Analyze Note
      </button>
      
      {analysis && (
        <div style={{
          background: 'white',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <h3 style={{ color: '#667eea', marginTop: 0 }}>Analysis Report</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <strong>Medications found: {analysis.count}</strong>
            <div style={{ marginTop: '8px' }}>
              {analysis.medications.map((med, idx) => (
                <span key={idx} style={{
                  display: 'inline-block',
                  background: '#e0e7ff',
                  color: '#3730a3',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  margin: '4px'
                }}>
                  {med}
                </span>
              ))}
            </div>
          </div>
          
          {analysis.interactions.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <strong>Clinical Alerts:</strong>
              {analysis.interactions.map((alert, idx) => (
                <div key={idx} style={{
                  background: alert.includes('CRITICAL') ? '#fee2e2' : '#fef3c7',
                  padding: '10px',
                  borderRadius: '8px',
                  margin: '8px 0',
                  borderLeft: `4px solid ${alert.includes('CRITICAL') ? '#dc2626' : '#f59e0b'}`
                }}>
                  {alert}
                </div>
              ))}
            </div>
          )}
          
          {(analysis.vitals.bp || analysis.vitals.hr || analysis.vitals.creatinine) && (
            <div>
              <strong>Extracted Values:</strong>
              <div style={{ marginTop: '8px' }}>
                {analysis.vitals.bp && <div>BP: {analysis.vitals.bp}</div>}
                {analysis.vitals.hr && <div>HR: {analysis.vitals.hr} bpm</div>}
                {analysis.vitals.creatinine && <div>Creatinine: {analysis.vitals.creatinine} mg/dL</div>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}