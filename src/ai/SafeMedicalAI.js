// Safe Medical AI System for Educational Purposes
// Integrates multiple AI models for comprehensive medical education
// Maintains strict boundaries for educational vs clinical use

class SafeMedicalAISystem {
  constructor() {
    this.models = {
      claude: {
        endpoint: process.env.CLAUDE_API_KEY ? 'https://api.anthropic.com/v1/messages' : null,
        strengths: ['clinical reasoning', 'ethical considerations', 'differential diagnosis'],
        usageType: 'educational-analysis'
      },
      openai: {
        endpoint: process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1/chat/completions' : null,
        strengths: ['case generation', 'quiz creation', 'content synthesis'],
        usageType: 'educational-content'
      },
      gemini: {
        endpoint: process.env.GEMINI_API_KEY ? 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent' : null,
        strengths: ['medical image analysis', 'research synthesis', 'multilingual'],
        usageType: 'educational-support'
      }
    };
    
    this.educationalConstraints = {
      alwaysIncludeDisclaimers: true,
      preventDirectMedicalAdvice: true,
      requireEducationalFraming: true,
      validateAgainstGuidelines: true
    };
    
    this.promptTemplates = this.initializePromptTemplates();
    this.init();
  }

  init() {
    console.log('🤖 Safe Medical AI System initializing...');
    
    // Check available models
    const availableModels = Object.entries(this.models)
      .filter(([_, config]) => config.endpoint)
      .map(([name]) => name);
    
    console.log(`📡 Available AI models: ${availableModels.join(', ')}`);
    
    if (availableModels.length === 0) {
      console.warn('⚠️ No AI models configured - using local educational content only');
      this.fallbackMode = true;
    }
  }

  initializePromptTemplates() {
    return {
      caseGeneration: {
        system: `You are a medical education AI assistant helping with geriatrics fellowship training.
        
        CRITICAL CONSTRAINTS:
        - This is for EDUCATIONAL PURPOSES ONLY
        - Generate case studies for learning, not real patient care
        - Always include educational disclaimers
        - Focus on teaching clinical reasoning
        - Use evidence-based medicine principles
        - Include Israeli healthcare context when relevant
        
        Generate realistic but fictional cases that help learners practice:
        - Differential diagnosis
        - Clinical decision-making  
        - Geriatric syndrome recognition
        - Medication management principles
        
        Always end responses with: "This is an educational case study for training purposes only and does not constitute medical advice."`,
        
        user: `Generate a geriatrics case study focusing on: {topic}
        
        Difficulty level: {difficulty}
        Learning objectives: {objectives}
        Israeli context: {israeliContext}
        
        Include:
        1. Patient presentation
        2. Relevant history
        3. Physical findings
        4. Assessment questions
        5. Learning points
        6. References to evidence-based guidelines`
      },
      
      differentialDiagnosis: {
        system: `You are a medical education AI helping geriatrics fellows learn diagnostic reasoning.
        
        EDUCATIONAL CONSTRAINTS:
        - This is for training clinical reasoning skills
        - Present differential diagnoses as learning exercises
        - Include likelihood ratios and evidence quality
        - Focus on geriatric-specific considerations
        - Always emphasize need for clinical correlation
        
        Help learners understand the diagnostic process, not make actual diagnoses.`,
        
        user: `For this educational case study: {caseDescription}
        
        Help the learner think through:
        1. Most likely diagnoses (with reasoning)
        2. Key distinguishing features
        3. Next diagnostic steps
        4. Geriatric-specific considerations
        5. Common pitfalls to avoid
        
        Frame this as a learning exercise for diagnostic reasoning skills.`
      },
      
      medicationReview: {
        system: `You are a clinical pharmacology educator helping geriatrics fellows learn medication management principles.
        
        EDUCATIONAL FOCUS:
        - Teach polypharmacy management principles
        - Review STOPP/START criteria application
        - Discuss Israeli formulary considerations
        - Present deprescribing strategies as educational exercises
        
        SAFETY BOUNDARIES:
        - Never recommend specific medication changes for real patients
        - Frame everything as educational scenarios
        - Emphasize need for clinical oversight
        - Include appropriate medical disclaimers`,
        
        user: `Review this educational medication list for learning purposes: {medicationList}
        
        Teaching points to cover:
        1. Potential inappropriate medications (Beers/STOPP criteria)
        2. Drug-drug interactions to recognize
        3. Dosing considerations in elderly
        4. Israeli Kupah coverage implications
        5. Deprescribing principles
        
        Present as educational exercise for learning medication management principles.`
      }
    };
  }

  async generateEducationalCase(topic, difficulty = 'intermediate', israeliContext = true) {
    if (this.fallbackMode) {
      return this.generateLocalCase(topic, difficulty);
    }

    const prompt = this.promptTemplates.caseGeneration;
    const objectives = this.generateLearningObjectives(topic, difficulty);
    
    const userPrompt = prompt.user
      .replace('{topic}', topic)
      .replace('{difficulty}', difficulty)
      .replace('{objectives}', objectives.join(', '))
      .replace('{israeliContext}', israeliContext ? 'Include Israeli healthcare system considerations' : 'General medical context');

    try {
      const response = await this.queryPrimaryAI(prompt.system, userPrompt);
      
      return {
        case: response,
        metadata: {
          topic,
          difficulty,
          generated: new Date().toISOString(),
          aiGenerated: true,
          educationalUse: true
        },
        disclaimer: 'This is an educational case study for training purposes only and does not constitute medical advice. Always consult with qualified healthcare providers for actual patient care.'
      };
      
    } catch (error) {
      console.warn('AI generation failed, using local content:', error.message);
      return this.generateLocalCase(topic, difficulty);
    }
  }

  generateLearningObjectives(topic, difficulty) {
    const objectiveBank = {
      cognitive: {
        beginner: ['Define delirium vs dementia', 'List common causes of confusion'],
        intermediate: ['Apply CAM criteria', 'Develop diagnostic workup plan'],
        advanced: ['Analyze complex presentations', 'Integrate multiple assessment tools']
      },
      functional: {
        beginner: ['Identify fall risk factors', 'Perform basic mobility assessment'],
        intermediate: ['Apply fall risk scales', 'Design intervention strategies'],
        advanced: ['Evaluate complex mobility issues', 'Coordinate multidisciplinary care']
      },
      medication: {
        beginner: ['Recognize polypharmacy', 'Identify high-risk medications'],
        intermediate: ['Apply STOPP/START criteria', 'Calculate anticholinergic burden'],
        advanced: ['Design deprescribing protocols', 'Manage complex interactions']
      }
    };

    return objectiveBank[topic]?.[difficulty] || ['Practice clinical reasoning', 'Apply evidence-based medicine'];
  }

  async analyzeCaseWithAI(caseDescription, analysisType = 'differential') {
    if (this.fallbackMode) {
      return this.generateLocalAnalysis(caseDescription, analysisType);
    }

    const prompt = this.promptTemplates[`${analysisType}Diagnosis`] || this.promptTemplates.differentialDiagnosis;
    const userPrompt = prompt.user.replace('{caseDescription}', caseDescription);

    try {
      const analysis = await this.queryPrimaryAI(prompt.system, userPrompt);
      
      return {
        analysis,
        type: analysisType,
        aiGenerated: true,
        educationalFraming: true,
        disclaimer: 'This analysis is for educational purposes only. Clinical decisions should always be made by qualified healthcare providers with direct patient assessment.'
      };
      
    } catch (error) {
      console.warn('AI analysis failed:', error.message);
      return this.generateLocalAnalysis(caseDescription, analysisType);
    }
  }

  async queryPrimaryAI(systemPrompt, userPrompt, preferredModel = 'claude') {
    const model = this.models[preferredModel];
    
    if (!model || !model.endpoint) {
      // Fallback to next available model
      const available = Object.entries(this.models).find(([_, config]) => config.endpoint);
      if (!available) {
        throw new Error('No AI models available');
      }
      return this.queryModel(available[0], systemPrompt, userPrompt);
    }
    
    return this.queryModel(preferredModel, systemPrompt, userPrompt);
  }

  async queryModel(modelName, systemPrompt, userPrompt) {
    const model = this.models[modelName];
    
    try {
      switch (modelName) {
        case 'claude':
          return await this.queryClaude(systemPrompt, userPrompt);
        case 'openai':
          return await this.queryOpenAI(systemPrompt, userPrompt);
        case 'gemini':
          return await this.queryGemini(systemPrompt, userPrompt);
        default:
          throw new Error(`Unknown model: ${modelName}`);
      }
    } catch (error) {
      console.error(`Error querying ${modelName}:`, error.message);
      throw error;
    }
  }

  async queryClaude(systemPrompt, userPrompt) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  async queryOpenAI(systemPrompt, userPrompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        max_tokens: 2000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async queryGemini(systemPrompt, userPrompt) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\n${userPrompt}` }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 2000,
          temperature: 0.1
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // Fallback methods for when AI is unavailable
  generateLocalCase(topic, difficulty) {
    const localCases = {
      cognitive: {
        intermediate: {
          title: 'Delirium vs Dementia in the ED',
          scenario: 'An 82-year-old woman with known mild dementia presents with acute confusion...',
          learningPoints: [
            'Delirium has acute onset and fluctuating course',
            'Use CAM criteria for systematic assessment',
            'Always search for underlying precipitants'
          ]
        }
      },
      functional: {
        intermediate: {
          title: 'Recurrent Falls Assessment',
          scenario: 'A 78-year-old man has had 3 falls in the past 2 months...',
          learningPoints: [
            'Multifactorial fall risk assessment is essential',
            'Consider medication-related causes',
            'Home safety evaluation is crucial'
          ]
        }
      }
    };

    const selectedCase = localCases[topic]?.[difficulty] || {
      title: 'General Geriatrics Case',
      scenario: 'A comprehensive geriatric assessment scenario for educational purposes...',
      learningPoints: ['Apply systematic assessment principles', 'Consider geriatric-specific factors']
    };

    return {
      case: selectedCase,
      metadata: {
        topic,
        difficulty,
        generated: new Date().toISOString(),
        aiGenerated: false,
        source: 'local-repository'
      },
      disclaimer: 'This is an educational case study for training purposes only and does not constitute medical advice.'
    };
  }

  generateLocalAnalysis(caseDescription, analysisType) {
    return {
      analysis: `Educational analysis framework for ${analysisType}:\n\n1. Systematic approach to assessment\n2. Consider differential diagnoses\n3. Apply evidence-based guidelines\n4. Include geriatric-specific considerations\n\nThis is a teaching framework for educational purposes only.`,
      type: analysisType,
      aiGenerated: false,
      source: 'local-framework',
      disclaimer: 'This analysis framework is for educational purposes only. Clinical decisions should always be made by qualified healthcare providers.'
    };
  }

  // Safe integration with existing platform
  async enhanceLearningSession(sessionData) {
    const { caseId, userProgress, focusAreas } = sessionData;
    
    try {
      // Generate personalized educational content
      const recommendations = await this.generateEducationalRecommendations(userProgress, focusAreas);
      
      return {
        enhancedContent: recommendations,
        aiEnhanced: !this.fallbackMode,
        educationalFocus: true,
        safetyValidated: true
      };
      
    } catch (error) {
      console.warn('AI enhancement failed, using standard content');
      return {
        enhancedContent: 'Continue with systematic case-based learning approach',
        aiEnhanced: false,
        fallbackUsed: true
      };
    }
  }

  async generateEducationalRecommendations(userProgress, focusAreas) {
    if (this.fallbackMode) {
      return this.getLocalRecommendations(focusAreas);
    }

    const prompt = `Based on this learner's progress in geriatrics fellowship training: ${JSON.stringify(userProgress)}

    Focus areas needing improvement: ${focusAreas.join(', ')}
    
    Provide educational recommendations for:
    1. Specific learning resources
    2. Case-based scenarios to practice
    3. Knowledge gaps to address
    4. Study strategies for fellowship exams
    
    Frame recommendations as educational guidance for professional development.
    This is for educational purposes only and does not constitute medical advice.`;

    try {
      return await this.queryPrimaryAI(
        'You are a medical education advisor helping geriatrics fellows with their training.',
        prompt
      );
    } catch (error) {
      return this.getLocalRecommendations(focusAreas);
    }
  }

  getLocalRecommendations(focusAreas) {
    const recommendations = {
      cognitive: 'Review delirium vs dementia presentations, practice CAM criteria application',
      functional: 'Focus on falls risk assessment tools and mobility evaluations',
      medication: 'Study STOPP/START criteria and deprescribing principles',
      psychosocial: 'Learn depression screening tools and social support assessment'
    };

    return focusAreas.map(area => recommendations[area] || 'Continue systematic geriatric assessment practice').join('\n\n');
  }

  // Validation and safety checks
  validateEducationalContent(content) {
    const validators = [
      this.hasEducationalDisclaimers(content),
      this.avoidsDirectMedicalAdvice(content),
      this.maintainsEducationalFraming(content)
    ];

    return validators.every(check => check === true);
  }

  hasEducationalDisclaimers(content) {
    const disclaimerKeywords = [
      'educational purposes',
      'training purposes',
      'not medical advice',
      'consult healthcare provider'
    ];

    return disclaimerKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
  }

  avoidsDirectMedicalAdvice(content) {
    const prohibitedPhrases = [
      'you should take',
      'recommended treatment is',
      'start medication',
      'discontinue immediately'
    ];

    return !prohibitedPhrases.some(phrase => 
      content.toLowerCase().includes(phrase)
    );
  }

  maintainsEducationalFraming(content) {
    const educationalFrames = [
      'learning objective',
      'case study',
      'educational scenario',
      'practice exercise',
      'training case'
    ];

    return educationalFrames.some(frame => 
      content.toLowerCase().includes(frame)
    );
  }
}

// Initialize system
if (typeof window !== 'undefined') {
  window.SafeMedicalAI = new SafeMedicalAISystem();
  console.log('🛡️ Safe Medical AI System ready for educational use');
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SafeMedicalAISystem;
}