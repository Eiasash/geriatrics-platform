// Renal Function Calculator Component with eGFR Auto-Calculation
import React, { useState, useEffect } from 'react';

const RenalFunctionCalculator = ({ age, gender, weight, onEGFRCalculated }) => {
  const [creatinine, setCreatinine] = useState('');
  const [eGFR, setEGFR] = useState(null);
  const [ckdStage, setCkdStage] = useState('');
  
  const calculateEGFR = (cr) => {
    if (!cr || !age || !weight) return null;
    
    // Cockcroft-Gault formula (for drug dosing)
    // eGFR = ((140 - age) * weight in kg) / (72 * serum creatinine) * 0.85 if female
    let result = ((140 - parseInt(age)) * parseFloat(weight)) / (72 * parseFloat(cr));
    if (gender === 'female') result *= 0.85;
    
    const rounded = Math.round(result);
    setEGFR(rounded);
    
    // Determine CKD stage
    let stage = '';
    if (rounded >= 90) {
      stage = 'Normal kidney function';
    } else if (rounded >= 60) {
      stage = 'Stage 2: Mild CKD';
    } else if (rounded >= 30) {
      stage = 'Stage 3: Moderate CKD';
    } else if (rounded >= 15) {
      stage = 'Stage 4: Severe CKD';
    } else {
      stage = 'Stage 5: Kidney Failure';
    }
    setCkdStage(stage);
    
    // Callback to parent component
    if (onEGFRCalculated) {
      onEGFRCalculated(rounded, stage);
    }
    
    return rounded;
  };
  
  useEffect(() => {
    if (creatinine) {
      calculateEGFR(creatinine);
    }
  }, [age, gender, weight]); // Recalculate when patient demographics change
  
  const getDrugDosingAlert = () => {
    if (!eGFR) return null;
    
    if (eGFR < 30) {
      return (
        <div className="alert alert-critical">
          ⚠️ CRITICAL: Many drugs require dose adjustment or are contraindicated
          <ul>
            <li>Avoid: NSAIDs, Metformin, Nitrofurantoin</li>
            <li>Adjust: Most antibiotics, anticoagulants, gabapentin</li>
            <li>Monitor: Digoxin, lithium levels closely</li>
          </ul>
        </div>
      );
    } else if (eGFR < 60) {
      return (
        <div className="alert alert-warning">
          ⚠️ CAUTION: Some drugs require dose adjustment
          <ul>
            <li>Reduce dose: Gabapentin, pregabalin, most antibiotics</li>
            <li>Monitor: Metformin (stop if eGFR {'<'} 30)</li>
            <li>Avoid NSAIDs if possible</li>
          </ul>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="renal-function-calc">
      <h4>📊 Renal Function Calculator</h4>
      
      <div className="input-group">
        <label htmlFor="creatinine">Serum Creatinine (mg/dL)</label>
        <input
          id="creatinine"
          type="number"
          step="0.1"
          min="0.1"
          max="20"
          placeholder="e.g., 1.2"
          value={creatinine}
          onChange={(e) => {
            setCreatinine(e.target.value);
            calculateEGFR(e.target.value);
          }}
          className="creatinine-input"
        />
      </div>
      
      {eGFR !== null && (
        <>
          <div className={`egfr-result ${
            eGFR < 30 ? 'critical' : 
            eGFR < 60 ? 'warning' : 
            'normal'
          }`}>
            <div className="egfr-value">
              eGFR: <strong>{eGFR}</strong> mL/min/1.73m²
            </div>
            <div className="ckd-stage">
              {ckdStage}
            </div>
          </div>
          
          {getDrugDosingAlert()}
          
          <div className="interpretation">
            <h5>Clinical Implications:</h5>
            <ul>
              {eGFR < 60 && (
                <li>📋 Refer to nephrology if new or progressive</li>
              )}
              {eGFR < 30 && (
                <li>🚨 Urgent nephrology referral needed</li>
              )}
              <li>💊 Review all medications for renal dosing</li>
              <li>🩸 Monitor potassium and phosphate levels</li>
              {eGFR < 45 && (
                <li>💉 Avoid gadolinium contrast (NSF risk)</li>
              )}
            </ul>
          </div>
        </>
      )}
      
      {!age && (
        <div className="warning-message">
          ⚠️ Patient age required for eGFR calculation
        </div>
      )}
      
      {!weight && (
        <div className="warning-message">
          ⚠️ Patient weight required for accurate eGFR (Cockcroft-Gault)
        </div>
      )}
    </div>
  );
};

export default RenalFunctionCalculator;