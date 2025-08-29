// Clinical Calculators for Geriatric Medicine
// Evidence-based assessment tools and scoring systems

export const ClinicalCalculators = {
  MMSE: {
    name: "Mini-Mental State Exam",
    description: "Cognitive screening tool for dementia assessment",
    domains: [
      "Orientation (10 points)",
      "Registration (3 points)", 
      "Attention/Calculation (5 points)",
      "Recall (3 points)",
      "Language (9 points)"
    ],
    calculate: function(scores) {
      if (!scores || !Array.isArray(scores)) {
        return { error: "Invalid scores array" };
      }
      
      const total = scores.reduce((sum, score) => sum + (parseInt(score) || 0), 0);
      
      let interpretation, recommendation;
      
      if (total >= 24) {
        interpretation = "Normal cognition";
        recommendation = "No immediate concerns. Consider annual screening.";
      } else if (total >= 19) {
        interpretation = "Mild cognitive impairment";
        recommendation = "Consider further evaluation, B12/folate/TSH, neuropsychological testing.";
      } else if (total >= 10) {
        interpretation = "Moderate cognitive impairment";
        recommendation = "Neurological evaluation indicated. Consider brain imaging.";
      } else {
        interpretation = "Severe cognitive impairment";
        recommendation = "Comprehensive dementia workup. Consider safety assessment.";
      }
      
      return {
        score: total,
        maxScore: 30,
        interpretation: interpretation,
        recommendation: recommendation,
        severity: total >= 24 ? "Normal" : total >= 19 ? "Mild" : total >= 10 ? "Moderate" : "Severe"
      };
    },
    scoring: {
      orientation: "Year, season, month, date, day, country, state, city, hospital, floor (1 point each)",
      registration: "Name 3 objects, patient repeats immediately (1 point each)",
      attention: "Serial 7s or spell WORLD backwards (1 point per correct step, max 5)",
      recall: "Recall the 3 objects from registration (1 point each)",
      language: "Name pencil and watch (2), repeat phrase (1), follow 3-step command (3), read and obey (1), write sentence (1), copy intersecting pentagons (1)"
    }
  },

  CAM: {
    name: "Confusion Assessment Method",
    description: "Diagnostic algorithm for delirium detection",
    features: [
      "1. Acute onset or fluctuating course",
      "2. Inattention", 
      "3. Disorganized thinking",
      "4. Altered level of consciousness"
    ],
    calculate: function(features) {
      if (!features || !Array.isArray(features) || features.length !== 4) {
        return { error: "Must provide 4 boolean features" };
      }
      
      const [acuteOnset, inattention, disorganizedThinking, alteredConsciousness] = features;
      
      // CAM algorithm: (1 AND 2) AND (3 OR 4)
      const hasDelirium = acuteOnset && inattention && (disorganizedThinking || alteredConsciousness);
      
      return {
        result: hasDelirium ? "POSITIVE for delirium" : "NEGATIVE for delirium",
        features: {
          acuteOnset: acuteOnset ? "Present" : "Absent",
          inattention: inattention ? "Present" : "Absent",
          disorganizedThinking: disorganizedThinking ? "Present" : "Absent",
          alteredConsciousness: alteredConsciousness ? "Present" : "Absent"
        },
        algorithm: "Requires: (Acute onset AND Inattention) AND (Disorganized thinking OR Altered consciousness)",
        recommendation: hasDelirium ? 
          "Delirium present. Identify and treat underlying causes. Consider medication review." :
          "Delirium not detected. Continue monitoring if clinically indicated."
      };
    },
    descriptions: {
      acuteOnset: "Is there evidence of an acute change in mental status from baseline, or did the abnormal behavior fluctuate during the day?",
      inattention: "Did the patient have difficulty focusing attention (e.g., being easily distractible, difficulty keeping track of conversation)?",
      disorganizedThinking: "Was the patient's thinking disorganized or incoherent (rambling, unclear flow of ideas, switching between subjects)?",
      alteredConsciousness: "Overall, how would you rate this patient's level of consciousness? (alert, vigilant, lethargic, stupor, coma)"
    }
  },

  MorseFallScale: {
    name: "Morse Fall Scale",
    description: "Fall risk assessment tool",
    domains: [
      "History of falling",
      "Secondary diagnosis",
      "Ambulatory aid",
      "IV therapy",
      "Gait/transferring",
      "Mental status"
    ],
    calculate: function(items) {
      if (!items || typeof items !== 'object') {
        return { error: "Invalid items object" };
      }
      
      const scores = {
        fallHistory: items.history ? 25 : 0,
        secondaryDx: items.secondary ? 15 : 0,
        ambulatoryAid: this.getAidScore(items.aid),
        iv: items.iv ? 20 : 0,
        gait: this.getGaitScore(items.gait),
        mentalStatus: items.overestimatesAbility ? 15 : 0
      };
      
      const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
      
      let risk, interventions;
      if (total >= 45) {
        risk = "High Risk";
        interventions = [
          "High-risk fall prevention protocol",
          "Bed alarm",
          "1:1 supervision if indicated",
          "Frequent toileting rounds",
          "Physical therapy evaluation"
        ];
      } else if (total >= 25) {
        risk = "Moderate Risk";
        interventions = [
          "Standard fall precautions",
          "Call light within reach",
          "Non-skid socks",
          "Evaluate need for assistive devices"
        ];
      } else {
        risk = "Low Risk";
        interventions = [
          "Basic safety measures",
          "Patient education on fall prevention"
        ];
      }
      
      return {
        score: total,
        breakdown: scores,
        risk: risk,
        interventions: interventions,
        recommendation: `Patient scores ${total} points indicating ${risk.toLowerCase()} for falls. Implement appropriate interventions.`
      };
    },
    
    getAidScore: function(aid) {
      switch(aid?.toLowerCase()) {
        case 'none': return 0;
        case 'crutches':
        case 'walker':
        case 'cane': return 15;
        case 'furniture': return 30;
        default: return 0;
      }
    },
    
    getGaitScore: function(gait) {
      switch(gait?.toLowerCase()) {
        case 'normal': return 0;
        case 'weak': return 10;
        case 'impaired': return 20;
        default: return 0;
      }
    },
    
    scoring: {
      fallHistory: "25 points if fall within 3 months",
      secondaryDx: "15 points if more than one medical diagnosis",
      ambulatoryAid: "0=none/bedrest, 15=crutches/walker/cane, 30=furniture",
      iv: "20 points if IV/heparin lock present",
      gait: "0=normal/wheelchair, 10=weak, 20=impaired",
      mentalStatus: "15 points if patient overestimates ability or forgets limitations"
    }
  },

  BradenScale: {
    name: "Braden Scale for Pressure Injury Risk",
    description: "Assessment tool for pressure injury risk",
    domains: [
      "Sensory Perception",
      "Moisture", 
      "Activity",
      "Mobility",
      "Nutrition",
      "Friction and Shear"
    ],
    calculate: function(items) {
      if (!items || typeof items !== 'object') {
        return { error: "Invalid items object" };
      }
      
      const total = (items.sensory || 0) + (items.moisture || 0) + (items.activity || 0) + 
                   (items.mobility || 0) + (items.nutrition || 0) + (items.friction || 0);
      
      let risk, interventions;
      if (total <= 9) {
        risk = "Very High Risk";
        interventions = [
          "Advanced pressure redistribution surface",
          "Turn q1-2h with positioning devices",
          "Maximize nutritional input",
          "Manage moisture, friction and shear",
          "Consider specialty bed"
        ];
      } else if (total <= 12) {
        risk = "High Risk";
        interventions = [
          "Pressure-redistributing surface",
          "Turn q2h with positioning schedule",
          "Nutritional consultation",
          "Manage moisture and friction"
        ];
      } else if (total <= 14) {
        risk = "Moderate Risk";
        interventions = [
          "Foam mattress or equivalent",
          "Turn q3h and PRN",
          "Encourage activity as tolerated",
          "Monitor nutrition and hydration"
        ];
      } else if (total <= 18) {
        risk = "Mild Risk";
        interventions = [
          "Standard mattress adequate",
          "Turn q4h and PRN",
          "Encourage independence with mobility"
        ];
      } else {
        risk = "No Risk";
        interventions = ["Standard care appropriate"];
      }
      
      return {
        score: total,
        maxScore: 23,
        risk: risk,
        interventions: interventions,
        recommendation: total <= 18 ? "Pressure injury prevention protocol required" : "Standard care appropriate"
      };
    },
    
    scoring: {
      sensoryPerception: "1=completely limited, 2=very limited, 3=slightly limited, 4=no impairment",
      moisture: "1=constantly moist, 2=moist, 3=occasionally moist, 4=rarely moist",
      activity: "1=bedfast, 2=chairfast, 3=walks occasionally, 4=walks frequently",
      mobility: "1=completely immobile, 2=very limited, 3=slightly limited, 4=no limitations",
      nutrition: "1=very poor, 2=probably inadequate, 3=adequate, 4=excellent",
      frictionShear: "1=problem, 2=potential problem, 3=no apparent problem"
    }
  },

  GDS15: {
    name: "Geriatric Depression Scale-15",
    description: "Depression screening tool for older adults",
    questions: [
      "Are you basically satisfied with your life?",
      "Have you dropped many of your activities and interests?",
      "Do you feel that your life is empty?",
      "Do you often get bored?",
      "Are you in good spirits most of the time?",
      "Are you afraid that something bad is going to happen to you?",
      "Do you feel happy most of the time?",
      "Do you often feel helpless?",
      "Do you prefer to stay at home, rather than going out and doing new things?",
      "Do you feel you have more problems with memory than most?",
      "Do you think it is wonderful to be alive now?",
      "Do you feel pretty worthless the way you are now?",
      "Do you feel full of energy?",
      "Do you feel that your situation is hopeless?",
      "Do you think that most people are better off than you are?"
    ],
    calculate: function(answers) {
      if (!answers || !Array.isArray(answers) || answers.length !== 15) {
        return { error: "Must provide 15 yes/no answers" };
      }
      
      // Questions where "yes" indicates depression: 1,2,3,5,7,8,11,12,14
      // Questions where "no" indicates depression: 0,4,6,9,10,13
      const depressionIndicators = [1,2,3,5,7,8,11,12,14];
      let score = 0;
      
      answers.forEach((answer, index) => {
        const isYes = answer === true || answer === 'yes' || answer === 1;
        if (depressionIndicators.includes(index)) {
          if (isYes) score++;
        } else {
          if (!isYes) score++;
        }
      });
      
      let interpretation, recommendation;
      if (score >= 10) {
        interpretation = "Severe depression likely";
        recommendation = "Immediate psychiatric evaluation recommended. Consider antidepressant therapy and counseling.";
      } else if (score >= 5) {
        interpretation = "Depression likely";
        recommendation = "Further evaluation recommended. Consider antidepressant therapy, counseling, or psychiatric consultation.";
      } else {
        interpretation = "Depression unlikely";
        recommendation = "No immediate intervention indicated. Continue monitoring as appropriate.";
      }
      
      return {
        score: score,
        maxScore: 15,
        interpretation: interpretation,
        recommendation: recommendation,
        severity: score >= 10 ? "Severe" : score >= 5 ? "Moderate" : "Minimal"
      };
    },
    
    scoring: "1 point for each answer suggesting depression. Score ≥5 suggests depression, ≥10 suggests severe depression."
  },

  HASBLED: {
    name: "HAS-BLED Score",
    description: "Bleeding risk assessment for anticoagulation",
    factors: [
      "Hypertension (uncontrolled, >160 mmHg systolic)",
      "Abnormal renal function (dialysis, transplant, Cr >2.3)",
      "Abnormal liver function (cirrhosis, bilirubin >2x normal, AST/ALT >3x normal)",
      "Stroke history",
      "Bleeding history or predisposition",
      "Labile INR (TTR <60% if on warfarin)",
      "Elderly (>65 years)",
      "Drugs (antiplatelet agents, NSAIDs) or alcohol (≥8 drinks/week)"
    ],
    calculate: function(factors) {
      if (!factors || !Array.isArray(factors) || factors.length !== 8) {
        return { error: "Must provide 8 yes/no factors" };
      }
      
      const score = factors.filter(factor => factor === true || factor === 1).length;
      
      let risk, recommendation;
      if (score >= 3) {
        risk = "High bleeding risk";
        recommendation = "Consider alternatives to anticoagulation, more frequent monitoring, or address modifiable bleeding risk factors. Use with caution.";
      } else if (score === 2) {
        risk = "Moderate bleeding risk";
        recommendation = "Anticoagulation generally acceptable with careful monitoring and addressing modifiable risk factors.";
      } else {
        risk = "Low bleeding risk";
        recommendation = "Anticoagulation appropriate if indicated. Standard monitoring recommended.";
      }
      
      return {
        score: score,
        maxScore: 8,
        risk: risk,
        recommendation: recommendation,
        interpretation: `Annual bleeding risk approximately ${this.getBleedingRate(score)}% with anticoagulation`
      };
    },
    
    getBleedingRate: function(score) {
      // Approximate annual major bleeding rates based on HAS-BLED score
      const rates = {0: 1.13, 1: 1.02, 2: 1.88, 3: 3.74, 4: 8.7, 5: 12.5};
      return rates[score] || (score >= 6 ? ">15" : "Unknown");
    },
    
    scoring: "1 point for each factor present. Score ≥3 indicates high bleeding risk."
  },

  FRAIL: {
    name: "FRAIL Scale",
    description: "Frailty screening tool",
    components: [
      "Fatigue: Are you fatigued?",
      "Resistance: Cannot walk up 1 flight of stairs?", 
      "Ambulation: Cannot walk 1 block?",
      "Illnesses: >5 illnesses?",
      "Loss of weight: >5% weight loss in past year?"
    ],
    calculate: function(items) {
      if (!items || !Array.isArray(items) || items.length !== 5) {
        return { error: "Must provide 5 yes/no responses" };
      }
      
      const score = items.filter(item => item === true || item === 1).length;
      
      let status, interventions, prognosis;
      if (score >= 3) {
        status = "Frail";
        interventions = [
          "Comprehensive geriatric assessment",
          "Multidisciplinary care team",
          "Exercise program (if appropriate)",
          "Nutrition optimization",
          "Medication review and deprescribing",
          "Falls prevention"
        ];
        prognosis = "Higher risk of adverse outcomes, hospitalization, and mortality";
      } else if (score >= 1) {
        status = "Pre-frail";
        interventions = [
          "Physical activity program",
          "Nutritional counseling", 
          "Preventive care optimization",
          "Regular monitoring for progression"
        ];
        prognosis = "At risk for developing frailty";
      } else {
        status = "Robust";
        interventions = [
          "Maintain healthy lifestyle",
          "Regular preventive care",
          "Annual screening"
        ];
        prognosis = "Low risk of frailty-related adverse outcomes";
      }
      
      return {
        score: score,
        maxScore: 5,
        status: status,
        interventions: interventions,
        prognosis: prognosis,
        recommendation: score >= 1 ? "Consider interventions to prevent or manage frailty" : "Continue health maintenance"
      };
    },
    
    scoring: "1 point for each positive response. 0=robust, 1-2=pre-frail, 3+=frail"
  },

  KatzADL: {
    name: "Katz Activities of Daily Living Index",
    description: "Assessment of independence in basic activities of daily living",
    activities: [
      "Bathing",
      "Dressing", 
      "Toileting",
      "Transferring",
      "Continence",
      "Feeding"
    ],
    calculate: function(activities) {
      if (!activities || !Array.isArray(activities) || activities.length !== 6) {
        return { error: "Must provide 6 independence ratings" };
      }
      
      const score = activities.filter(activity => activity === true || activity === 1).length;
      
      let interpretation, services, prognosis;
      if (score === 6) {
        interpretation = "Independent in all ADLs";
        services = "No assistance needed";
        prognosis = "Good functional prognosis";
      } else if (score >= 4) {
        interpretation = "Moderate impairment";
        services = "May need assistance with some activities, consider home health aide";
        prognosis = "May benefit from rehabilitation services";
      } else if (score >= 2) {
        interpretation = "Severe impairment";
        services = "Significant assistance needed, consider skilled nursing or extensive home health";
        prognosis = "High care needs, rehabilitation potential to assess";
      } else {
        interpretation = "Total dependence";
        services = "24-hour care likely needed, consider nursing home placement";
        prognosis = "Very high care needs";
      }
      
      return {
        score: `${score}/6`,
        interpretation: interpretation,
        services: services,
        prognosis: prognosis,
        percentage: Math.round((score/6) * 100),
        recommendation: score < 4 ? "Consider comprehensive geriatric assessment and care planning" : "Monitor functional status"
      };
    },
    
    scoring: "1 point for independence in each ADL. 6=fully independent, 0=fully dependent"
  },

  TimedUpAndGo: {
    name: "Timed Up and Go Test",
    description: "Assessment of mobility and fall risk",
    instructions: "Time how long it takes patient to rise from chair, walk 3 meters, turn, walk back, and sit down",
    calculate: function(seconds) {
      if (!seconds || seconds < 0) {
        return { error: "Must provide valid time in seconds" };
      }
      
      let interpretation, recommendation, fallRisk;
      if (seconds < 10) {
        interpretation = "Normal mobility";
        fallRisk = "Low";
        recommendation = "No intervention needed. Encourage continued activity.";
      } else if (seconds < 14) {
        interpretation = "Normal for frail elderly";
        fallRisk = "Low-Moderate";
        recommendation = "Continue current activity level. Monitor for changes.";
      } else if (seconds < 20) {
        interpretation = "Increased fall risk";
        fallRisk = "Moderate";
        recommendation = "Physical therapy evaluation. Fall prevention strategies. Consider assistive device.";
      } else if (seconds < 30) {
        interpretation = "High fall risk";
        fallRisk = "High";
        recommendation = "Physical therapy consultation. Comprehensive fall assessment. Safety evaluation.";
      } else {
        interpretation = "Severe mobility impairment";
        fallRisk = "Very High";
        recommendation = "Urgent PT/OT evaluation. Consider wheelchair or walker. Home safety assessment.";
      }
      
      return {
        time: `${seconds} seconds`,
        interpretation: interpretation,
        fallRisk: fallRisk,
        recommendation: recommendation,
        needsIntervention: seconds >= 14
      };
    },
    
    norms: {
      "60-69 years": "8.1 ± 1.7 seconds",
      "70-79 years": "9.2 ± 2.3 seconds", 
      "80-89 years": "11.3 ± 3.1 seconds",
      "90+ years": "14.2 ± 6.2 seconds"
    }
  },

  MNA_SF: {
    name: "Mini Nutritional Assessment-Short Form",
    description: "Nutritional screening tool for older adults",
    questions: [
      "Food intake decline (0-2 points)",
      "Weight loss (0-3 points)",
      "Mobility (0-2 points)",
      "Psychological stress/acute disease (0-2 points)",
      "Neuropsychological problems (0-2 points)",
      "BMI or calf circumference (0-3 points)"
    ],
    calculate: function(items) {
      if (!items || !Array.isArray(items) || items.length !== 6) {
        return { error: "Must provide 6 item scores" };
      }
      
      const score = items.reduce((sum, item) => sum + (parseInt(item) || 0), 0);
      
      let status, intervention, risk;
      if (score >= 12) {
        status = "Normal nutritional status";
        risk = "Low";
        intervention = "Continue current diet and monitor annually";
      } else if (score >= 8) {
        status = "At risk of malnutrition";
        risk = "Moderate";
        intervention = "Nutritional counseling. Complete full MNA. Monitor weight monthly.";
      } else {
        status = "Malnourished";
        risk = "High";
        intervention = "Immediate nutrition consultation. Complete nutrition assessment. Consider supplements.";
      }
      
      return {
        score: score,
        maxScore: 14,
        status: status,
        risk: risk,
        intervention: intervention,
        recommendation: score < 12 ? "Nutrition intervention recommended" : "Continue current nutrition plan"
      };
    },
    
    scoring: {
      foodIntake: "0=severe decrease, 1=moderate decrease, 2=no decrease",
      weightLoss: "0=>3kg, 1=1-3kg, 2=no loss, 3=weight gain",
      mobility: "0=bed/chair bound, 1=walks, 2=goes out",
      stress: "0=yes, 2=no psychological stress or acute disease",
      neuropsych: "0=severe dementia/depression, 1=mild, 2=none",
      bmi: "0=<19, 1=19-21, 2=21-23, 3=>23 kg/m² (or calf circumference)"
    }
  }
};

export const getCalculatorByName = (name) => {
  return ClinicalCalculators[name.toUpperCase()];
};

export const getAllCalculatorNames = () => {
  return Object.keys(ClinicalCalculators);
};

export const calculateScore = (calculatorName, input) => {
  const calculator = getCalculatorByName(calculatorName);
  if (!calculator || typeof calculator.calculate !== 'function') {
    return { error: `Calculator ${calculatorName} not found or invalid` };
  }
  
  try {
    return calculator.calculate(input);
  } catch (error) {
    return { error: `Calculation error: ${error.message}` };
  }
};

// Make calculators available globally for console access
if (typeof window !== 'undefined') {
  window.ClinicalCalculators = ClinicalCalculators;
}

export default ClinicalCalculators;