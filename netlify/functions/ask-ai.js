// Enhanced AI Backend with Medical NLP, Clinical Reasoning, and Knowledge Graph
// Provides human-like medical intelligence with typo tolerance and context awareness

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Medical NLP for typo tolerance and context understanding
class MedicalNLP {
  constructor() {
    // Core drug variations with comprehensive typo support
    this.drugVariations = {
      'warfarin': ['coumadin', 'coumadine', 'kumadin', 'cumudan', 'warfarine', 'coumudin', 'קומדין', 'كومادين'],
      'metformin': ['metformine', 'glucophage', 'metfornin', 'metaformin', 'glucomet', 'מטפורמין', 'ميتفورمين'],
      'furosemide': ['lasix', 'frusemide', 'furosemida', 'furosemine', 'לאזיקס', 'فروسيماید'],
      'acetaminophen': ['paracetamol', 'tylenol', 'acamol', 'panadol', 'פרצטמול', 'אקמול', 'باراسیتامول'],
      'amlodipine': ['norvasc', 'amlodipin', 'amlodipina', 'אמלודיפין', 'املودیپین'],
      'atorvastatin': ['lipitor', 'atorvastatine', 'ליפיטור', 'آتورواستاتین'],
      'omeprazole': ['prilosec', 'losec', 'omeprazol', 'אומפרזול', 'أوميبرازول'],
      'insulin': ['insuline', 'humalog', 'novolog', 'lantus', 'אינסולין', 'انسولین'],
      'digoxin': ['lanoxin', 'digitek', 'דיגוקסין', 'ديجوكسين'],
      'lisinopril': ['prinivil', 'zestril', 'ליזינופריל', 'لیزینوپریل']
    };

    this.conditionVariations = {
      'atrial fibrillation': ['AFib', 'AF', 'a-fib', 'atrial fib', 'רפרוף פרוזדורים'],
      'heart failure': ['CHF', 'HF', 'cardiac failure', 'אי ספיקת לב'],
      'diabetes': ['DM', 'diabetes mellitus', 'T1DM', 'T2DM', 'סוכרת'],
      'hypertension': ['HTN', 'high blood pressure', 'HBP', 'לחץ דם גבוה'],
      'dementia': ['dimensia', 'alzheimer', 'alzheimers', 'דמנציה'],
      'delirium': ['confusion', 'altered mental status', 'AMS', 'דליריום'],
      'kidney disease': ['CKD', 'renal failure', 'CRF', 'מחלת כליות'],
      'urinary tract infection': ['UTI', 'bladder infection', 'זיהום בדרכי שתן']
    };
  }

  async processInput(question, patientInfo) {
    const corrected = this.correctTypos(question);
    const context = this.extractContext(question, patientInfo);
    const intent = this.determineIntent(corrected, context);
    
    return {
      original: question,
      corrected: corrected !== question ? corrected : null,
      context,
      intent,
      enhancement: this.generateEnhancement(corrected, context, intent)
    };
  }

  correctTypos(text) {
    let corrected = text;
    
    // Correct drug names
    for (const [standard, variants] of Object.entries(this.drugVariations)) {
      for (const variant of variants) {
        const regex = new RegExp(`\\b${this.escapeRegex(variant)}\\b`, 'gi');
        if (regex.test(corrected)) {
          corrected = corrected.replace(regex, standard);
        }
      }
    }
    
    // Correct condition names
    for (const [standard, variants] of Object.entries(this.conditionVariations)) {
      for (const variant of variants) {
        const regex = new RegExp(`\\b${this.escapeRegex(variant)}\\b`, 'gi');
        if (regex.test(corrected)) {
          corrected = corrected.replace(regex, standard);
        }
      }
    }
    
    return corrected;
  }

  extractContext(question, patientInfo) {
    const context = {
      medications: [],
      conditions: [],
      ageGroup: null,
      urgency: 'routine',
      specialty: 'geriatrics'
    };

    const combinedText = `${question} ${patientInfo}`.toLowerCase();

    // Extract medications
    for (const [drug, variants] of Object.entries(this.drugVariations)) {
      if ([drug, ...variants].some(variant => combinedText.includes(variant.toLowerCase()))) {
        context.medications.push(drug);
      }
    }

    // Extract conditions
    for (const [condition, variants] of Object.entries(this.conditionVariations)) {
      if ([condition, ...variants].some(variant => combinedText.includes(variant.toLowerCase()))) {
        context.conditions.push(condition);
      }
    }

    // Extract age information
    const ageMatch = combinedText.match(/(\d{1,3})\s*(?:years?|yo|y\.o\.|yr)/);
    if (ageMatch) {
      const age = parseInt(ageMatch[1]);
      if (age >= 85) context.ageGroup = 'very elderly';
      else if (age >= 75) context.ageGroup = 'elderly';
      else if (age >= 65) context.ageGroup = 'older adult';
    }

    // Determine urgency
    const urgentTerms = ['emergency', 'urgent', 'acute', 'stat', 'immediately', 'critical'];
    if (urgentTerms.some(term => combinedText.includes(term))) {
      context.urgency = 'urgent';
    }

    return context;
  }

  determineIntent(question, context) {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('dose') || lowerQ.includes('dosing') || lowerQ.includes('how much')) {
      return { type: 'dosing', confidence: 0.9 };
    } else if (lowerQ.includes('interaction') || lowerQ.includes('drug interaction')) {
      return { type: 'drug_interaction', confidence: 0.95 };
    } else if (lowerQ.includes('side effect') || lowerQ.includes('adverse')) {
      return { type: 'adverse_effects', confidence: 0.9 };
    } else if (lowerQ.includes('contraindication') || lowerQ.includes('avoid')) {
      return { type: 'contraindications', confidence: 0.85 };
    } else if (lowerQ.includes('monitor') || lowerQ.includes('follow up')) {
      return { type: 'monitoring', confidence: 0.8 };
    } else if (lowerQ.includes('diagnos') || lowerQ.includes('assess')) {
      return { type: 'diagnosis', confidence: 0.85 };
    } else if (lowerQ.includes('treatment') || lowerQ.includes('management')) {
      return { type: 'treatment', confidence: 0.9 };
    } else {
      return { type: 'general_medical', confidence: 0.6 };
    }
  }

  generateEnhancement(question, context, intent) {
    let enhancement = question;

    // Add context to the question
    if (context.medications.length > 0) {
      enhancement += `\n\nMedications mentioned: ${context.medications.join(', ')}`;
    }
    if (context.conditions.length > 0) {
      enhancement += `\nConditions mentioned: ${context.conditions.join(', ')}`;
    }
    if (context.ageGroup) {
      enhancement += `\nPatient age category: ${context.ageGroup}`;
    }

    // Add intent-specific enhancements
    switch (intent.type) {
      case 'dosing':
        enhancement += '\n\nPlease provide specific dosing recommendations for elderly patients, including renal adjustments if applicable.';
        break;
      case 'drug_interaction':
        enhancement += '\n\nPlease assess for drug interactions and provide management recommendations.';
        break;
      case 'adverse_effects':
        enhancement += '\n\nPlease focus on adverse effects particularly relevant to elderly patients.';
        break;
      case 'monitoring':
        enhancement += '\n\nPlease provide specific monitoring parameters and frequencies for geriatric patients.';
        break;
    }

    return enhancement;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Clinical Reasoning for context-aware responses
class ClinicalProcessor {
  constructor() {
    this.geriatricConsiderations = {
      pharmacokinetics: 'Elderly patients have altered drug metabolism and excretion',
      polypharmacy: 'High risk of drug interactions with multiple medications',
      frailty: 'Consider functional status and goals of care',
      cognitiveStatus: 'Assess for delirium, dementia, and decision-making capacity'
    };
  }

  processContext(nlpResult, patientInfo) {
    const considerations = [];
    
    // Age-specific considerations
    if (nlpResult.context.ageGroup === 'very elderly') {
      considerations.push('Very elderly patient - consider frailty assessment and goals of care');
    } else if (nlpResult.context.ageGroup === 'elderly') {
      considerations.push('Elderly patient - use geriatric-specific dosing and monitoring');
    }

    // Medication considerations
    if (nlpResult.context.medications.length >= 5) {
      considerations.push('Polypharmacy present - review for drug interactions and deprescribing opportunities');
    }

    // High-risk medications
    const highRiskMeds = ['warfarin', 'digoxin', 'insulin', 'opioids'];
    const patientHighRisk = nlpResult.context.medications.filter(med => 
      highRiskMeds.some(risk => risk.includes(med.toLowerCase()))
    );
    if (patientHighRisk.length > 0) {
      considerations.push(`High-risk medications identified: ${patientHighRisk.join(', ')} - enhanced monitoring required`);
    }

    return {
      considerations,
      riskLevel: this.assessRiskLevel(nlpResult.context),
      recommendations: this.generateRecommendations(nlpResult.context)
    };
  }

  assessRiskLevel(context) {
    let score = 0;
    if (context.ageGroup === 'very elderly') score += 2;
    else if (context.ageGroup === 'elderly') score += 1;
    
    if (context.medications.length >= 10) score += 3;
    else if (context.medications.length >= 5) score += 2;
    
    if (context.urgency === 'urgent') score += 1;
    
    if (score >= 5) return 'high';
    if (score >= 3) return 'moderate';
    return 'low';
  }

  generateRecommendations(context) {
    const recommendations = [];
    
    if (context.ageGroup && context.medications.length > 0) {
      recommendations.push('Consider comprehensive geriatric assessment');
    }
    
    if (context.medications.length >= 5) {
      recommendations.push('Perform medication reconciliation and review for STOPP/START criteria');
    }
    
    return recommendations;
  }
}

// Build enhanced medical prompt
function buildEnhancedPrompt(nlpResult, clinicalContext, patientInfo) {
  let prompt = `You are an experienced geriatrics specialist with expertise in polypharmacy management, frailty assessment, and evidence-based geriatric medicine. You are consulting in an Israeli healthcare setting where patients may be multilingual and cultural considerations matter.

CLINICAL CONTEXT:
- Patient Information: ${patientInfo}
- Question Intent: ${nlpResult.intent.type}
- Risk Level: ${clinicalContext.riskLevel}
- Age Group: ${nlpResult.context.ageGroup || 'not specified'}`;

  if (nlpResult.corrected) {
    prompt += `\n- Note: Input was corrected from common medical typos/variations`;
  }

  if (nlpResult.context.medications.length > 0) {
    prompt += `\n- Medications mentioned: ${nlpResult.context.medications.join(', ')}`;
  }

  if (nlpResult.context.conditions.length > 0) {
    prompt += `\n- Conditions mentioned: ${nlpResult.context.conditions.join(', ')}`;
  }

  if (clinicalContext.considerations.length > 0) {
    prompt += `\n- Clinical Considerations: ${clinicalContext.considerations.join('; ')}`;
  }

  prompt += `\n\nCLINICAL QUESTION: ${nlpResult.enhancement}

Please provide a comprehensive response that includes:

1. IMMEDIATE CLINICAL GUIDANCE
   - Direct answer to the question
   - Key clinical considerations
   - Urgency level and next steps

2. GERIATRIC-SPECIFIC CONSIDERATIONS
   - Age-related factors
   - Polypharmacy implications
   - Functional status considerations

3. EVIDENCE-BASED RECOMMENDATIONS
   - Current guidelines and best practices
   - Israeli healthcare context when relevant
   - Alternative approaches if applicable

4. MONITORING AND FOLLOW-UP
   - What to monitor
   - When to reassess
   - Red flags or concerning signs

5. PRACTICAL IMPLEMENTATION
   - How to apply recommendations bedside
   - Communication with patient/family
   - Documentation considerations

Provide specific, actionable guidance while acknowledging when additional clinical assessment is needed. If the question involves high-risk situations, emphasize safety and the need for senior physician consultation.`;

  return prompt;
}

// Call AI service with enhanced error handling
async function callAIService(model, enhancedPrompt) {
  let response, data;
  
  try {
    switch(model) {
      case 'gemini':
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: enhancedPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
              candidateCount: 1
            }
          })
        });
        data = await response.json();
        
        if (!data.candidates || !data.candidates[0]) {
          throw new Error('Invalid Gemini response structure');
        }
        
        return {
          answer: data.candidates[0].content.parts[0].text,
          model: 'Gemini Pro (Enhanced)'
        };

      case 'claude':
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            temperature: 0.7,
            messages: [{ role: 'user', content: enhancedPrompt }]
          })
        });
        data = await response.json();
        
        if (!data.content || !data.content[0]) {
          throw new Error('Invalid Claude response structure');
        }
        
        return {
          answer: data.content[0].text,
          model: 'Claude 3.5 Sonnet (Enhanced)'
        };

      case 'openai':
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            temperature: 0.7,
            max_tokens: 2048,
            messages: [{ role: 'user', content: enhancedPrompt }]
          })
        });
        data = await response.json();
        
        if (!data.choices || !data.choices[0]) {
          throw new Error('Invalid OpenAI response structure');
        }
        
        return {
          answer: data.choices[0].message.content,
          model: 'GPT-4o (Enhanced)'
        };

      default:
        throw new Error('Invalid model specified');
    }
  } catch (aiError) {
    console.error(`${model} API Error:`, aiError);
    
    // Fallback response with clinical safety
    return {
      answer: `I encountered an issue processing your medical query. For clinical safety, please:

1. Consult with a senior physician or specialist
2. Refer to current clinical guidelines
3. Consider patient safety as the top priority

Your question requires professional medical evaluation.

If this is an urgent clinical situation, please seek immediate medical consultation.`,
      model: `${model} (Fallback Mode)`,
      error: true
    };
  }
}

// Main handler with enhanced AI processing
exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { question, patientInfo = '', model = 'gemini' } = JSON.parse(event.body);

    if (!question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Question is required' })
      };
    }

    // Initialize AI processing systems
    const nlp = new MedicalNLP();
    const processor = new ClinicalProcessor();

    // Process input with advanced NLP
    const nlpResult = await nlp.processInput(question, patientInfo);
    const clinicalContext = processor.processContext(nlpResult, patientInfo);

    // Build enhanced prompt with medical intelligence
    const enhancedPrompt = buildEnhancedPrompt(nlpResult, clinicalContext, patientInfo);

    // Get AI response with enhanced context
    const aiResponse = await callAIService(model, enhancedPrompt);

    // Return enhanced response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        answer: aiResponse.answer,
        model: aiResponse.model,
        correctedInput: nlpResult.corrected,
        clinicalContext: {
          intent: nlpResult.intent,
          riskLevel: clinicalContext.riskLevel,
          considerations: clinicalContext.considerations,
          recommendations: clinicalContext.recommendations
        },
        confidence: nlpResult.intent.confidence,
        processingTime: Date.now()
      })
    };

  } catch (error) {
    console.error('Enhanced AI Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to process medical query',
        details: error.message,
        fallbackAdvice: 'Please consult with a senior physician for clinical guidance'
      })
    };
  }
};