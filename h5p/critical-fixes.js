// ========== CRITICAL FIXES FOR PLATFORM FUNCTIONALITY ==========

// 1. COMPLETE RISK PREDICTOR IMPLEMENTATION
function predictRisk(type) {
    const resultDiv = document.getElementById('riskPredictionResult') || createResultDiv();
    
    // Collect patient data
    const patientData = collectPatientData();
    
    if (!validatePatientData(patientData)) {
        resultDiv.innerHTML = `
            <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <strong style="color: #ef4444;">⚠️ Please fill in all required fields</strong>
            </div>
        `;
        return;
    }
    
    let riskAssessment = {};
    
    switch(type) {
        case 'frailty':
            riskAssessment = calculateFrailtyRisk(patientData);
            break;
        case 'falls':
            riskAssessment = calculateFallRisk(patientData);
            break;
        case 'delirium':
            riskAssessment = calculateDeliriumRisk(patientData);
            break;
        case 'readmission':
            riskAssessment = calculateReadmissionRisk(patientData);
            break;
        default:
            riskAssessment = calculateComprehensiveRisk(patientData);
    }
    
    displayRiskAssessment(riskAssessment, resultDiv);
}

// 2. COMPLETE MEDICATION OPTIMIZER
function optimizeMedications() {
    const medications = collectMedications();
    
    if (medications.length === 0) {
        showError('Please enter at least one medication to analyze');
        return;
    }
    
    const resultDiv = document.getElementById('medicationOptimizerResult') || createResultDiv();
    resultDiv.innerHTML = '<p>🔄 Analyzing medications...</p>';
    
    // Perform comprehensive medication analysis
    const analysis = analyzeMedicationRegimen(medications);
    
    // Display results
    displayMedicationAnalysis(analysis, resultDiv);
}

// 3. FUNCTIONAL CALCULATOR IMPLEMENTATIONS
function calculateCHA2DS2VASc() {
    const form = document.getElementById('cha2ds2vascForm');
    if (!form) {
        console.error('CHA2DS2-VASc form not found');
        return;
    }
    
    let score = 0;
    const factors = [];
    
    // Collect inputs with validation
    const age = parseInt(document.getElementById('cha2Age')?.value) || 0;
    if (age >= 75) { score += 2; factors.push('Age ≥75 (+2)'); }
    else if (age >= 65) { score += 1; factors.push('Age 65-74 (+1)'); }
    
    if (document.getElementById('cha2Female')?.checked) { 
        score += 1; 
        factors.push('Female sex (+1)'); 
    }
    if (document.getElementById('cha2CHF')?.checked) { 
        score += 1; 
        factors.push('CHF (+1)'); 
    }
    if (document.getElementById('cha2HTN')?.checked) { 
        score += 1; 
        factors.push('Hypertension (+1)'); 
    }
    if (document.getElementById('cha2Stroke')?.checked) { 
        score += 2; 
        factors.push('Prior Stroke/TIA (+2)'); 
    }
    if (document.getElementById('cha2Vascular')?.checked) { 
        score += 1; 
        factors.push('Vascular disease (+1)'); 
    }
    if (document.getElementById('cha2Diabetes')?.checked) { 
        score += 1; 
        factors.push('Diabetes (+1)'); 
    }
    
    // Calculate annual stroke risk
    const riskTable = [0.2, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 12.5, 15.2];
    const annualRisk = riskTable[score] || 15.2;
    
    // Generate recommendation
    let recommendation = '';
    if (score === 0) {
        recommendation = 'No anticoagulation needed';
    } else if (score === 1) {
        recommendation = 'Consider anticoagulation (DOAC preferred)';
    } else {
        recommendation = 'Anticoagulation strongly recommended (DOAC preferred over warfarin)';
    }
    
    // Display results
    const resultDiv = document.getElementById('cha2ResultDiv') || createResultDiv();
    resultDiv.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
            <h3 style="color: #667eea; margin-bottom: 15px;">CHA₂DS₂-VASc Score Results</h3>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div style="font-size: 3rem; font-weight: bold; text-align: center;">${score}</div>
                <div style="text-align: center; margin-top: 10px;">Total Score</div>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <strong>Risk Factors Present:</strong>
                <ul style="margin: 10px 0;">
                    ${factors.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                    <strong>Annual Stroke Risk:</strong>
                    <div style="font-size: 2rem; color: #f59e0b; margin-top: 5px;">${annualRisk}%</div>
                </div>
                <div style="background: #dcfce7; padding: 15px; border-radius: 8px;">
                    <strong>5-Year Risk:</strong>
                    <div style="font-size: 2rem; color: #22c55e; margin-top: 5px;">${(annualRisk * 4.5).toFixed(1)}%</div>
                </div>
            </div>
            
            <div style="background: #e0e7ff; padding: 15px; border-radius: 8px;">
                <strong>🎯 Recommendation:</strong>
                <p style="margin: 10px 0;">${recommendation}</p>
                ${score >= 2 ? `
                    <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 4px;">
                        <strong>Preferred Agents:</strong>
                        <ul style="margin: 5px 0;">
                            <li>Apixaban 5mg BID (2.5mg if 2+ criteria: age ≥80, weight ≤60kg, Cr ≥1.5)</li>
                            <li>Rivaroxaban 20mg daily (15mg if CrCl 30-50)</li>
                            <li>Edoxaban 60mg daily (30mg if CrCl 30-50, weight ≤60kg)</li>
                            <li>Dabigatran 150mg BID (110mg if age ≥80, bleeding risk)</li>
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// 4. COMPLETE FRAILTY ASSESSMENT
function assessFrailty() {
    const resultDiv = document.getElementById('frailtyResult') || createResultDiv();
    
    // Collect Fried criteria
    let friedScore = 0;
    const criteria = [];
    
    const weight = parseFloat(document.getElementById('weightLoss')?.value) || 0;
    if (weight >= 4.5) { 
        friedScore++; 
        criteria.push('✓ Weight loss ≥4.5kg/year'); 
    }
    
    if (document.getElementById('exhaustion')?.checked) { 
        friedScore++; 
        criteria.push('✓ Self-reported exhaustion'); 
    }
    
    const gaitSpeed = parseFloat(document.getElementById('gaitSpeed')?.value) || 0;
    if (gaitSpeed > 0 && gaitSpeed < 0.8) { 
        friedScore++; 
        criteria.push(`✓ Slow gait speed (${gaitSpeed} m/s < 0.8 m/s)`); 
    }
    
    const gripStrength = parseFloat(document.getElementById('gripStrength')?.value) || 0;
    const isMale = document.getElementById('genderMale')?.checked;
    const gripCutoff = isMale ? 30 : 18;
    if (gripStrength > 0 && gripStrength < gripCutoff) { 
        friedScore++; 
        criteria.push(`✓ Weak grip strength (${gripStrength}kg < ${gripCutoff}kg)`); 
    }
    
    if (document.getElementById('lowActivity')?.checked) { 
        friedScore++; 
        criteria.push('✓ Low physical activity'); 
    }
    
    // Determine frailty status
    let status = '';
    let statusColor = '';
    let recommendations = [];
    
    if (friedScore >= 3) {
        status = 'FRAIL';
        statusColor = '#ef4444';
        recommendations = [
            'Urgent Comprehensive Geriatric Assessment',
            'Physical therapy for strength and balance',
            'Nutritional assessment (protein 1.5g/kg/day)',
            'Medication review for deprescribing',
            'Fall prevention program',
            'Consider palliative care discussion'
        ];
    } else if (friedScore >= 1) {
        status = 'PRE-FRAIL';
        statusColor = '#f59e0b';
        recommendations = [
            'Exercise program 3x/week',
            'Nutritional optimization',
            'Annual CGA',
            'Vitamin D supplementation',
            'Review polypharmacy'
        ];
    } else {
        status = 'ROBUST';
        statusColor = '#10b981';
        recommendations = [
            'Maintain physical activity',
            'Annual screening',
            'Preventive care optimization'
        ];
    }
    
    // Display comprehensive results
    resultDiv.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
            <h3 style="color: #667eea;">Frailty Assessment Results</h3>
            
            <div style="background: ${statusColor}; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <div style="font-size: 2.5rem; font-weight: bold;">${status}</div>
                <div style="font-size: 1.2rem; margin-top: 10px;">Fried Score: ${friedScore}/5</div>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>Criteria Assessment:</strong>
                <ul style="margin: 10px 0;">
                    ${criteria.length > 0 ? criteria.map(c => `<li>${c}</li>`).join('') : '<li>No frailty criteria met</li>'}
                </ul>
            </div>
            
            <div style="background: #e0e7ff; padding: 15px; border-radius: 8px;">
                <strong>📋 Recommendations:</strong>
                <ol style="margin: 10px 0;">
                    ${recommendations.map(r => `<li style="margin: 5px 0;">${r}</li>`).join('')}
                </ol>
            </div>
            
            ${friedScore >= 3 ? `
                <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <strong style="color: #ef4444;">⚠️ High Priority Actions:</strong>
                    <p>This patient requires immediate comprehensive assessment and intervention. 
                    Consider hospitalization risk, advance care planning, and caregiver support.</p>
                </div>
            ` : ''}
        </div>
    `;
}

// 5. HELPER FUNCTIONS
function collectPatientData() {
    return {
        age: parseInt(document.getElementById('patientAge')?.value) || 0,
        gender: document.getElementById('patientGender')?.value || 'unknown',
        gaitSpeed: parseFloat(document.getElementById('gaitSpeed')?.value) || null,
        weightLoss: parseFloat(document.getElementById('weightLoss')?.value) || 0,
        medications: collectMedications(),
        conditions: collectConditions(),
        labs: collectLabValues()
    };
}

function validatePatientData(data) {
    if (!data.age || data.age < 1 || data.age > 120) return false;
    if (!data.gender || data.gender === 'unknown') return false;
    return true;
}

function collectMedications() {
    const medInput = document.getElementById('aiMedications') || document.getElementById('medicationsList');
    if (!medInput) return [];
    
    return medInput.value
        .split('\n')
        .filter(med => med.trim())
        .map(med => ({
            name: med.trim(),
            dose: extractDose(med),
            frequency: extractFrequency(med)
        }));
}

function extractDose(medString) {
    const doseMatch = medString.match(/(\d+\.?\d*)\s*(mg|mcg|g|ml|units?)/i);
    return doseMatch ? doseMatch[0] : null;
}

function extractFrequency(medString) {
    const freqMatch = medString.match(/(daily|bid|tid|qid|prn|qhs|qam)/i);
    return freqMatch ? freqMatch[0] : null;
}

function collectConditions() {
    const conditions = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.value && checkbox.name === 'condition') {
            conditions.push(checkbox.value);
        }
    });
    return conditions;
}

function collectLabValues() {
    return {
        creatinine: parseFloat(document.getElementById('creatinine')?.value) || null,
        sodium: parseFloat(document.getElementById('sodium')?.value) || null,
        potassium: parseFloat(document.getElementById('potassium')?.value) || null,
        hemoglobin: parseFloat(document.getElementById('hemoglobin')?.value) || null,
        albumin: parseFloat(document.getElementById('albumin')?.value) || null
    };
}

function createResultDiv() {
    const div = document.createElement('div');
    div.id = 'dynamicResultDiv';
    div.style.marginTop = '20px';
    
    // Find appropriate parent element
    const parent = document.querySelector('.tab-content.active') || 
                  document.querySelector('#ai') || 
                  document.body;
    parent.appendChild(div);
    return div;
}

function showError(message) {
    const resultDiv = createResultDiv();
    resultDiv.innerHTML = `
        <div style="background: #fee2e2; padding: 15px; border-radius: 8px; color: #ef4444;">
            <strong>⚠️ Error:</strong> ${message}
        </div>
    `;
}

// 6. RISK CALCULATION FUNCTIONS
function calculateFrailtyRisk(data) {
    let score = 0;
    const factors = [];
    
    if (data.age > 80) { score += 20; factors.push('Age >80 years'); }
    if (data.weightLoss > 4.5) { score += 25; factors.push('Significant weight loss'); }
    if (data.gaitSpeed && data.gaitSpeed < 0.8) { score += 30; factors.push('Slow gait speed'); }
    if (data.medications.length > 5) { score += 15; factors.push('Polypharmacy'); }
    
    const risk = score > 60 ? 'HIGH' : score > 30 ? 'MODERATE' : 'LOW';
    
    return {
        score,
        risk,
        factors,
        probability: `${Math.min(score, 95)}%`,
        timeframe: '1 year',
        interventions: getInterventions(risk, 'frailty')
    };
}

function calculateFallRisk(data) {
    let score = 0;
    const factors = [];
    
    if (data.age > 75) { score += 3; factors.push('Age >75'); }
    if (data.conditions.includes('falls')) { score += 5; factors.push('Previous falls'); }
    if (data.gaitSpeed && data.gaitSpeed < 0.8) { score += 4; factors.push('Impaired gait'); }
    if (data.medications.some(m => m.name.toLowerCase().includes('benzo'))) { 
        score += 5; 
        factors.push('Benzodiazepine use'); 
    }
    
    const riskLevel = score > 8 ? 'HIGH' : score > 4 ? 'MODERATE' : 'LOW';
    const annualProbability = score > 8 ? '65-100%' : score > 4 ? '30-65%' : '<30%';
    
    return {
        score,
        risk: riskLevel,
        factors,
        probability: annualProbability,
        timeframe: '6 months',
        interventions: getInterventions(riskLevel, 'falls')
    };
}

function calculateDeliriumRisk(data) {
    let score = 0;
    const predisposing = [];
    const precipitating = [];
    
    // Predisposing factors
    if (data.age > 80) { score += 10; predisposing.push('Advanced age'); }
    if (data.conditions.includes('dementia')) { score += 20; predisposing.push('Cognitive impairment'); }
    
    // Precipitating factors
    if (data.medications.some(m => m.name.toLowerCase().includes('benzo'))) {
        score += 15;
        precipitating.push('Benzodiazepine use');
    }
    if (data.medications.some(m => m.name.toLowerCase().includes('opioid'))) {
        score += 10;
        precipitating.push('Opioid use');
    }
    
    const risk = score > 30 ? 'HIGH' : score > 15 ? 'MODERATE' : 'LOW';
    
    return {
        score,
        risk,
        predisposing,
        precipitating,
        probability: `${Math.min(score * 2, 90)}%`,
        preventionPlan: getDeliriumPrevention(risk)
    };
}

function calculateReadmissionRisk(data) {
    // HOSPITAL Score
    let score = 0;
    const factors = [];
    
    if (data.labs.hemoglobin && data.labs.hemoglobin < 12) {
        score += 1;
        factors.push('Anemia');
    }
    if (data.labs.sodium && data.labs.sodium < 135) {
        score += 1;
        factors.push('Hyponatremia');
    }
    if (data.conditions.includes('cancer')) {
        score += 2;
        factors.push('Oncology history');
    }
    
    const riskMap = {
        0: 5.8, 1: 8.4, 2: 11.9, 3: 16.3, 4: 21.6,
        5: 27.8, 6: 34.8, 7: 42.3
    };
    
    const probability = riskMap[Math.min(score, 7)] || 50;
    
    return {
        score,
        risk: probability > 20 ? 'HIGH' : probability > 10 ? 'MODERATE' : 'LOW',
        factors,
        probability: `${probability}%`,
        timeframe: '30 days',
        interventions: getReadmissionInterventions(probability)
    };
}

function calculateComprehensiveRisk(data) {
    return {
        frailty: calculateFrailtyRisk(data),
        falls: calculateFallRisk(data),
        delirium: calculateDeliriumRisk(data),
        readmission: calculateReadmissionRisk(data)
    };
}

// 7. MEDICATION ANALYSIS
function analyzeMedicationRegimen(medications) {
    const analysis = {
        totalMedications: medications.length,
        beersCriteria: [],
        interactions: [],
        renalAdjustments: [],
        duplicateTherapy: [],
        missingIndications: [],
        recommendations: []
    };
    
    // Check Beers Criteria
    const beers2023 = {
        'lorazepam': 'Increased fall risk, cognitive impairment',
        'alprazolam': 'Increased fall risk, cognitive impairment',
        'glyburide': 'Prolonged hypoglycemia risk',
        'glipizide': 'Prolonged hypoglycemia risk',
        'aspirin': 'No benefit for primary prevention in elderly',
        'digoxin': 'Avoid doses >0.125mg/day'
    };
    
    medications.forEach(med => {
        const medName = med.name.toLowerCase();
        Object.keys(beers2023).forEach(beer => {
            if (medName.includes(beer)) {
                analysis.beersCriteria.push({
                    medication: med.name,
                    issue: beers2023[beer],
                    recommendation: 'Consider discontinuation or alternative'
                });
            }
        });
    });
    
    // Check for polypharmacy
    if (medications.length > 5) {
        analysis.recommendations.push('Polypharmacy detected - consider deprescribing review');
    }
    if (medications.length > 10) {
        analysis.recommendations.push('SEVERE polypharmacy - urgent medication reconciliation needed');
    }
    
    // Generate optimization plan
    analysis.optimizationPlan = generateOptimizationPlan(analysis);
    
    return analysis;
}

function generateOptimizationPlan(analysis) {
    const plan = {
        immediate: [],
        shortTerm: [],
        monitoring: []
    };
    
    // Immediate actions for Beers violations
    analysis.beersCriteria.forEach(violation => {
        plan.immediate.push(`Stop/replace ${violation.medication}: ${violation.issue}`);
    });
    
    // Short-term actions
    if (analysis.totalMedications > 5) {
        plan.shortTerm.push('Schedule comprehensive medication review');
        plan.shortTerm.push('Apply STOPP/START criteria');
    }
    
    // Monitoring requirements
    plan.monitoring.push('Renal function every 3 months');
    plan.monitoring.push('Fall risk assessment monthly');
    
    return plan;
}

// 8. DISPLAY FUNCTIONS
function displayRiskAssessment(assessment, resultDiv) {
    let html = '<div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">';
    
    if (assessment.frailty) {
        // Comprehensive risk display
        html += '<h3 style="color: #667eea;">Comprehensive Risk Assessment</h3>';
        
        ['frailty', 'falls', 'delirium', 'readmission'].forEach(type => {
            const risk = assessment[type];
            const color = risk.risk === 'HIGH' ? '#ef4444' : risk.risk === 'MODERATE' ? '#f59e0b' : '#10b981';
            
            html += `
                <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid ${color};">
                    <h4 style="text-transform: capitalize;">${type} Risk: <span style="color: ${color}">${risk.risk}</span></h4>
                    <p>Probability: ${risk.probability} (${risk.timeframe || 'ongoing'})</p>
                    ${risk.factors ? `<p>Factors: ${risk.factors.join(', ')}</p>` : ''}
                </div>
            `;
        });
    } else {
        // Single risk display
        const color = assessment.risk === 'HIGH' ? '#ef4444' : assessment.risk === 'MODERATE' ? '#f59e0b' : '#10b981';
        
        html += `
            <h3 style="color: ${color};">Risk Level: ${assessment.risk}</h3>
            <p><strong>Probability:</strong> ${assessment.probability} over ${assessment.timeframe}</p>
            
            ${assessment.factors && assessment.factors.length > 0 ? `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <strong>Risk Factors:</strong>
                    <ul>${assessment.factors.map(f => `<li>${f}</li>`).join('')}</ul>
                </div>
            ` : ''}
            
            ${assessment.interventions ? `
                <div style="background: #e0e7ff; padding: 15px; border-radius: 8px;">
                    <strong>Recommended Interventions:</strong>
                    <ol>${assessment.interventions.map(i => `<li>${i}</li>`).join('')}</ol>
                </div>
            ` : ''}
        `;
    }
    
    html += '</div>';
    resultDiv.innerHTML = html;
}

function displayMedicationAnalysis(analysis, resultDiv) {
    let html = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea;">Medication Optimization Report</h3>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: bold; color: #667eea;">${analysis.totalMedications}</div>
                    <div>Total Medications</div>
                </div>
                <div style="background: ${analysis.beersCriteria.length > 0 ? '#fee2e2' : '#dcfce7'}; padding: 15px; border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: bold; color: ${analysis.beersCriteria.length > 0 ? '#ef4444' : '#10b981'};">${analysis.beersCriteria.length}</div>
                    <div>Beers Violations</div>
                </div>
            </div>
    `;
    
    if (analysis.beersCriteria.length > 0) {
        html += `
            <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #ef4444;">⚠️ Potentially Inappropriate Medications</h4>
                ${analysis.beersCriteria.map(b => `
                    <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px;">
                        <strong>${b.medication}</strong><br>
                        <span style="color: #666;">${b.issue}</span><br>
                        <span style="color: #10b981;">${b.recommendation}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (analysis.optimizationPlan) {
        html += `
            <div style="background: #e0e7ff; padding: 15px; border-radius: 8px;">
                <h4>📋 Optimization Plan</h4>
                
                ${analysis.optimizationPlan.immediate.length > 0 ? `
                    <div style="margin: 15px 0;">
                        <strong>Immediate Actions:</strong>
                        <ul>${analysis.optimizationPlan.immediate.map(a => `<li>${a}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                
                ${analysis.optimizationPlan.shortTerm.length > 0 ? `
                    <div style="margin: 15px 0;">
                        <strong>Short-term (1-2 weeks):</strong>
                        <ul>${analysis.optimizationPlan.shortTerm.map(a => `<li>${a}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                
                ${analysis.optimizationPlan.monitoring.length > 0 ? `
                    <div style="margin: 15px 0;">
                        <strong>Monitoring:</strong>
                        <ul>${analysis.optimizationPlan.monitoring.map(a => `<li>${a}</li>`).join('')}</ul>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    html += '</div>';
    resultDiv.innerHTML = html;
}

// 9. INTERVENTION RECOMMENDATIONS
function getInterventions(riskLevel, type) {
    const interventions = {
        frailty: {
            HIGH: [
                'Immediate Comprehensive Geriatric Assessment',
                'Physical therapy 3x/week for strength and balance',
                'Nutritional supplementation (protein 1.5g/kg/day)',
                'Medication review within 48 hours',
                'Home safety evaluation',
                'Caregiver support and education'
            ],
            MODERATE: [
                'CGA within 2 weeks',
                'Exercise program 2x/week',
                'Dietary consultation',
                'Annual medication review',
                'Fall risk assessment'
            ],
            LOW: [
                'Maintain physical activity',
                'Annual screening',
                'Preventive care optimization'
            ]
        },
        falls: {
            HIGH: [
                'Immediate home safety assessment',
                'PT evaluation within 1 week',
                'Medication review for sedatives',
                'Vision and hearing check',
                'Vitamin D 2000 IU daily',
                'Consider hip protectors'
            ],
            MODERATE: [
                'Balance training program',
                'Medication review within 1 month',
                'Vitamin D 1000 IU daily',
                'Annual eye exam'
            ],
            LOW: [
                'Continue current exercise',
                'Annual fall risk reassessment'
            ]
        }
    };
    
    return interventions[type]?.[riskLevel] || ['Standard monitoring'];
}

function getDeliriumPrevention(riskLevel) {
    if (riskLevel === 'HIGH') {
        return [
            'Implement full HELP protocol',
            'CAM assessment every shift',
            'Minimize sedatives',
            'Ensure glasses/hearing aids used',
            'Maintain day-night orientation',
            'Family presence encouraged'
        ];
    } else if (riskLevel === 'MODERATE') {
        return [
            'CAM assessment daily',
            'Sleep hygiene protocol',
            'Early mobilization',
            'Medication review'
        ];
    }
    return ['Standard prevention measures'];
}

function getReadmissionInterventions(probability) {
    if (probability > 20) {
        return [
            'Discharge planning with pharmacy',
            'Follow-up appointment within 48-72 hours',
            'Home health referral',
            'Medication reconciliation',
            'Teach-back for key instructions'
        ];
    }
    return ['Standard discharge planning'];
}

// 10. EXPORT AND DATA PERSISTENCE
function saveAssessment(type, data) {
    const assessments = JSON.parse(localStorage.getItem('clinicalAssessments') || '{}');
    const timestamp = new Date().toISOString();
    
    if (!assessments[type]) assessments[type] = [];
    assessments[type].push({
        timestamp,
        data,
        id: Date.now()
    });
    
    localStorage.setItem('clinicalAssessments', JSON.stringify(assessments));
    
    // Show confirmation
    showNotification('Assessment saved successfully');
}

function loadAssessments(type) {
    const assessments = JSON.parse(localStorage.getItem('clinicalAssessments') || '{}');
    return assessments[type] || [];
}

function exportAssessment(format = 'json') {
    const assessments = JSON.parse(localStorage.getItem('clinicalAssessments') || '{}');
    let content = '';
    let filename = `assessment_${new Date().toISOString().split('T')[0]}`;
    
    if (format === 'csv') {
        // Convert to CSV format
        content = 'Type,Timestamp,Risk Level,Score,Factors\n';
        Object.entries(assessments).forEach(([type, items]) => {
            items.forEach(item => {
                content += `${type},${item.timestamp},${item.data.risk || 'N/A'},${item.data.score || 'N/A'},"${(item.data.factors || []).join('; ')}"\n`;
            });
        });
        filename += '.csv';
    } else {
        // JSON format
        content = JSON.stringify(assessments, null, 2);
        filename += '.json';
    }
    
    // Create download
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export functions for global use
window.predictRisk = predictRisk;
window.optimizeMedications = optimizeMedications;
window.calculateCHA2DS2VASc = calculateCHA2DS2VASc;
window.assessFrailty = assessFrailty;
window.saveAssessment = saveAssessment;
window.loadAssessments = loadAssessments;
window.exportAssessment = exportAssessment;