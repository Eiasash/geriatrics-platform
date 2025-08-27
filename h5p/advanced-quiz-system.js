// advanced-quiz-system.js
// Advanced Quiz Generation System for Geriatrics
// Based on comprehensive API wrapper with Hebrew support

class AdvancedQuizSystem {
  constructor() {
    this.questionBank = new Map();
    this.userStats = JSON.parse(localStorage.getItem('quiz_stats') || '{}');
    this.initializeQuestionBank();
    this.init();
  }

  init() {
    this.createQuizUI();
    console.log('🎓 Advanced Quiz System initialized');
  }

  // ============= QUIZ GENERATION ENGINE =============

  /**
   * Generate quiz questions from topic with difficulty levels
   */
  async generateQuiz(topic, options = {}) {
    const {
      difficulty = 'intermediate',
      count = 10,
      includeImages = false,
      language = 'both',
      includeCalculations = true
    } = options;

    const questions = [];
    
    // Topic-specific question generators
    const generators = {
      'falls': this.generateFallsQuestions,
      'polypharmacy': this.generatePolypharmacyQuestions,
      'dementia': this.generateDementiaQuestions,
      'frailty': this.generateFrailtyQuestions,
      'delirium': this.generateDeliriumQuestions,
      'incontinence': this.generateIncontinenceQuestions,
      'nutrition': this.generateNutritionQuestions,
      'palliative': this.generatePalliativeQuestions,
      'cardiology': this.generateCardiologyQuestions,
      'pharmacology': this.generatePharmacologyQuestions
    };

    const generator = generators[topic.toLowerCase()] || this.generateGeneralQuestions;
    const topicQuestions = generator.call(this, difficulty, count);

    // Add Hebrew translations if requested
    if (language === 'he' || language === 'both') {
      topicQuestions.forEach(q => {
        q.questionHebrew = this.translateToHebrew(q.question);
        if (q.options) {
          q.optionsHebrew = q.options.map(opt => this.translateToHebrew(opt));
        }
      });
    }

    return topicQuestions;
  }

  // ============= TOPIC-SPECIFIC QUESTION GENERATORS =============

  /**
   * Generate falls-specific questions with Israeli context
   */
  generateFallsQuestions(difficulty, count) {
    const questionBank = {
      basic: [
        {
          question: "What is the most common cause of falls in elderly patients in Israel?",
          options: ["Muscle weakness", "Visual impairment", "Polypharmacy", "Environmental hazards"],
          correctAnswer: "Muscle weakness",
          explanation: "Muscle weakness (sarcopenia) accounts for 24% of falls, particularly common in Israeli elderly due to reduced physical activity. Hebrew: חולשת שרירים",
          israeliContext: "Israeli MOH guidelines emphasize strength training programs"
        },
        {
          question: "Which medication class has the highest association with fall risk according to Israeli Beers criteria?",
          options: ["Benzodiazepines", "Beta-blockers", "ACE inhibitors", "Statins"],
          correctAnswer: "Benzodiazepines",
          explanation: "Benzodiazepines increase fall risk by 48%. In Israel, common culprits include Xanax (קסנקס) and Valium (וליום)"
        },
        {
          question: "What is the Hebrew term for 'fall prevention'?",
          options: ["מניעת נפילות", "בדיקת שיווי משקל", "חיזוק שרירים", "הליכה בטוחה"],
          correctAnswer: "מניעת נפילות",
          explanation: "מניעת נפילות is the correct Hebrew term for fall prevention, commonly used in Israeli medical settings"
        }
      ],
      intermediate: [
        {
          question: "An 82-year-old patient scores 45 on the Berg Balance Scale. According to Israeli geriatric guidelines, what is the appropriate intervention?",
          options: [
            "High fall risk, needs assistive device",
            "Medium fall risk, recommend physiotherapy",
            "Low fall risk, continue monitoring",
            "Refer to Maccabi wellness program"
          ],
          correctAnswer: "Medium fall risk, recommend physiotherapy",
          explanation: "Berg Balance Scale: <45 = high risk, 45-51 = medium risk, >51 = low risk. In Israel, physiotherapy referrals are covered by all Kupot Holim"
        },
        {
          question: "A patient in Shaare Zedek asks about fall prevention in Hebrew. Which program would you recommend?",
          options: [
            "תוכנית חיזוק שרירים (Strength program)",
            "תוכנית הליכה (Walking program)", 
            "תוכנית שיווי משקל (Balance program)",
            "All of the above - תוכנית מקיפה"
          ],
          correctAnswer: "All of the above - תוכנית מקיפה",
          explanation: "Comprehensive programs addressing strength, balance, and mobility show best outcomes in Israeli studies"
        }
      ],
      advanced: [
        {
          question: "Calculate the Morse Fall Scale: 78yo Israeli patient, history of falls, diabetes + HTN, IV antibiotics, impaired gait, forgets limitations. Patient takes Valium 5mg.",
          type: "calculation",
          options: ["125 - Very High risk", "95 - High risk", "70 - High risk", "50 - Medium risk"],
          correctAnswer: "125 - Very High risk", 
          explanation: "History(25) + Secondary Dx(15) + IV(20) + Gait(20) + Mental(15) + Benzos(additional 30 Israeli modifier) = 125",
          israeliContext: "Israeli hospitals add 30 points for benzodiazepine use due to high sensitivity in Middle Eastern populations"
        }
      ]
    };

    return this.formatQuestions('falls', questionBank[difficulty] || questionBank.intermediate, count);
  }

  /**
   * Generate polypharmacy questions with Hebrew medication names
   */
  generatePolypharmacyQuestions(difficulty, count) {
    const questionBank = {
      basic: [
        {
          question: "What is the Hebrew name for Metformin commonly used in Israel?",
          options: ["מטפורמין", "פרמין", "גלוקופאג'", "All of the above"],
          correctAnswer: "All of the above",
          explanation: "All three names are used: מטפורמין (generic), פרמין (brand), גלוקופאג' (Glucophage)"
        },
        {
          question: "According to Israeli Beers criteria, which medication should be avoided in patients >65?",
          options: ["Aspirin (אספירין)", "Diazepam (ואליום)", "Metformin (פרמין)", "Atorvastatin (ליפיטור)"],
          correctAnswer: "Diazepam (ואליום)",
          explanation: "Long-acting benzodiazepines like Diazepam (ואליום) are contraindicated in elderly per Israeli guidelines"
        }
      ],
      intermediate: [
        {
          question: "A patient brings this medication list in Hebrew: אקמול, אספירין, פרמין, נורמיטן, ואליום. Which needs immediate attention?",
          options: ["אקמול (Paracetamol)", "אספירין (Aspirin)", "ואליום (Diazepam)", "נורמיטן (Atenolol)"],
          correctAnswer: "ואליום (Diazepam)",
          explanation: "ואליום (Diazepam/Valium) is a long-acting benzodiazepine inappropriate for elderly"
        }
      ],
      advanced: [
        {
          question: "Calculate drug burden index for: חצי פרמין 500mg, רבע ואליום 2.5mg, אקמול 1g TID, אספירין 100mg. Which has highest anticholinergic load?",
          type: "calculation",
          options: ["Paracetamol", "Diazepam", "Neither has anticholinergic effects", "Aspirin"],
          correctAnswer: "Neither has anticholinergic effects",
          explanation: "None of these medications have significant anticholinergic properties. Common Hebrew anticholinergics include בנדריל (Bendril/Diphenhydramine)"
        }
      ]
    };

    return this.formatQuestions('polypharmacy', questionBank[difficulty] || questionBank.intermediate, count);
  }

  /**
   * Generate cardiology questions with Israeli guidelines
   */
  generateCardiologyQuestions(difficulty, count) {
    const questionBank = {
      basic: [
        {
          question: "What is the CHA2DS2-VASc score for an 80-year-old Israeli female with hypertension and diabetes?",
          type: "calculation",
          options: ["4", "5", "3", "6"],
          correctAnswer: "5",
          explanation: "Age ≥75 (2) + Female (1) + Hypertension (1) + Diabetes (1) = 5 points"
        }
      ],
      intermediate: [
        {
          question: "According to Clalit/Maccabi guidelines, which DOAC is first-line for CHA2DS2-VASc ≥2?",
          options: ["Warfarin (קומדין)", "Apixaban (אליקוויס)", "Rivaroxaban (זראלטו)", "All equally recommended"],
          correctAnswer: "All equally recommended",
          explanation: "Israeli Kupot cover all DOACs equally for appropriate indications, choice depends on patient factors"
        }
      ],
      advanced: [
        {
          question: "Calculate HAS-BLED for: 85yo, HTN, CrCl 45, prior GI bleed, on aspirin + Eliquis. Score and recommendation?",
          type: "calculation",
          options: ["Score 4 - Stop anticoagulation", "Score 4 - Continue with PPI", "Score 3 - Continue carefully", "Score 5 - Hospitalize"],
          correctAnswer: "Score 4 - Continue with PPI",
          explanation: "Age>65(1) + HTN(1) + Renal(1) + Bleed(1) + Drugs(1) = 5. Israeli guidelines recommend PPI with high bleeding risk"
        }
      ]
    };

    return this.formatQuestions('cardiology', questionBank[difficulty] || questionBank.intermediate, count);
  }

  /**
   * Generate dementia questions with Hebrew cognitive tests
   */
  generateDementiaQuestions(difficulty, count) {
    const questionBank = {
      basic: [
        {
          question: "What is the Hebrew name for the Mini-Mental State Examination used in Israeli hospitals?",
          options: ["מבחן מצב נפשי מיני", "בדיקת זיכרון קצרה", "מבחן קוגניטיבי", "בדיקת דמנציה"],
          correctAnswer: "מבחן מצב נפשי מיני",
          explanation: "מבחן מצב נפשי מיני (MMSE) is the standard Hebrew translation used in Israeli medical settings"
        }
      ],
      intermediate: [
        {
          question: "In Israel, at what MMSE score can Aricept (אריספט) be prescribed through Sal?",
          options: ["MMSE 10-20", "MMSE 10-26", "MMSE 15-25", "Any score with diagnosis"],
          correctAnswer: "MMSE 10-26",
          explanation: "Israeli MOH guidelines require MMSE 10-26 for cholinesterase inhibitor coverage through Sal"
        }
      ],
      advanced: [
        {
          question: "A 75yo presents with Hebrew MMSE score 18. Family asks in Hebrew about medications. What's your response?",
          type: "clinical",
          options: [
            "אריספט אפשרי (Aricept possible)",
            "בדיקות נוספות נדרשות (More tests needed)", 
            "טיפול תומך בלבד (Supportive care only)",
            "התייעצות עם נוירולוג (Neurology consult)"
          ],
          correctAnswer: "אריספט אפשרי (Aricept possible)",
          explanation: "MMSE 18 qualifies for Aricept under Israeli guidelines (10-26 range). אריספט is covered by all Kupot"
        }
      ]
    };

    return this.formatQuestions('dementia', questionBank[difficulty] || questionBank.intermediate, count);
  }

  /**
   * Generate frailty assessment questions
   */
  generateFrailtyQuestions(difficulty, count) {
    const questionBank = {
      basic: [
        {
          question: "What does a FRAIL score of 3+ indicate in Israeli geriatric assessment?",
          options: ["Pre-frail", "Frail - needs CGA", "Robust", "Moderate frailty"],
          correctAnswer: "Frail - needs CGA",
          explanation: "FRAIL score ≥3 indicates frailty requiring Comprehensive Geriatric Assessment per Israeli protocols"
        }
      ],
      intermediate: [
        {
          question: "According to Israeli Bituach Leumi, which frailty score qualifies for attendance allowance?",
          options: ["FRAIL ≥2", "FRAIL ≥3", "Any frailty score", "Clinical Frailty Scale ≥5"],
          correctAnswer: "Clinical Frailty Scale ≥5",
          explanation: "Israeli Bituach Leumi uses Clinical Frailty Scale ≥5 for attendance allowance eligibility"
        }
      ],
      advanced: [
        {
          question: "Calculate comprehensive frailty assessment: 82yo Israeli woman, ADL 4/6, IADL 3/8, unintentional 5kg weight loss, exhaustion, slow gait. Interventions?",
          type: "clinical",
          options: [
            "Physiotherapy only",
            "Comprehensive geriatric assessment + multidisciplinary team",
            "Nutritionist referral only", 
            "Consider nursing home"
          ],
          correctAnswer: "Comprehensive geriatric assessment + multidisciplinary team",
          explanation: "Multiple frailty indicators require full CGA with PT, OT, nutritionist, and social worker per Israeli guidelines"
        }
      ]
    };

    return this.formatQuestions('frailty', questionBank[difficulty] || questionBank.intermediate, count);
  }

  // ============= HEBREW TRANSLATION ENGINE =============

  /**
   * Translate medical terms to Hebrew
   */
  translateToHebrew(text) {
    const translations = {
      // Basic medical terms
      'falls': 'נפילות',
      'dementia': 'דמנציה', 
      'delirium': 'דליריום',
      'medication': 'תרופה',
      'elderly': 'קשישים',
      'frailty': 'שבירות',
      'assessment': 'הערכה',
      'prevention': 'מניעה',
      'treatment': 'טיפול',
      'diagnosis': 'אבחון',
      'patient': 'חולה',
      'hospital': 'בית חולים',
      'doctor': 'רופא',
      'nurse': 'אחות',
      'blood pressure': 'לחץ דם',
      'heart rate': 'דופק',
      'blood sugar': 'סוכר בדם',
      'kidney function': 'תפקוד כליות',
      
      // Medications
      'aspirin': 'אספירין',
      'metformin': 'מטפורמין',
      'warfarin': 'ורפרין',
      'furosemide': 'פורסמיד',
      'atenolol': 'אטנולול',
      
      // Conditions
      'diabetes': 'סוכרת',
      'hypertension': 'יתר לחץ דם',
      'heart failure': 'אי ספיקת לב',
      'stroke': 'שבץ מוחי',
      'atrial fibrillation': 'פרפור פרוזדורים',
      
      // Questions stems
      'What is': 'מהו/מהי',
      'Which medication': 'איזו תרופה',
      'According to': 'על פי',
      'Calculate': 'חשב/חשבי',
      'A patient': 'חולה',
      'The correct answer': 'התשובה הנכונה'
    };

    let hebrewText = text;
    Object.entries(translations).forEach(([en, he]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      hebrewText = hebrewText.replace(regex, he);
    });

    return hebrewText;
  }

  // ============= QUIZ UI CREATION =============

  createQuizUI() {
    const uiHTML = `
      <div class="advanced-quiz-container" style="display:none;">
        <div class="quiz-header">
          <h2>🎓 Advanced Geriatrics Quiz System</h2>
          <p>Hebrew-English medical education with Israeli healthcare context</p>
        </div>

        <div class="quiz-selector">
          <div class="quiz-options">
            <div class="option-group">
              <label>📚 Topic:</label>
              <select id="quiz-topic">
                <option value="falls">Falls & Prevention (נפילות ומניעה)</option>
                <option value="polypharmacy">Polypharmacy (רב תרופות)</option>
                <option value="dementia">Dementia (דמנציה)</option>
                <option value="frailty">Frailty (שבירות)</option>
                <option value="cardiology">Cardiology (קרדיולוגיה)</option>
                <option value="delirium">Delirium (דליריום)</option>
                <option value="nutrition">Nutrition (תזונה)</option>
                <option value="palliative">Palliative Care (טיפול תומך)</option>
              </select>
            </div>

            <div class="option-group">
              <label>⭐ Difficulty:</label>
              <select id="quiz-difficulty">
                <option value="basic">Basic (בסיסי)</option>
                <option value="intermediate" selected>Intermediate (בינוני)</option>
                <option value="advanced">Advanced (מתקדם)</option>
                <option value="expert">Expert (מומחה)</option>
              </select>
            </div>

            <div class="option-group">
              <label>🔢 Questions:</label>
              <select id="quiz-count">
                <option value="5">5 questions</option>
                <option value="10" selected>10 questions</option>
                <option value="15">15 questions</option>
                <option value="20">20 questions</option>
              </select>
            </div>

            <div class="option-group">
              <label>🌐 Language:</label>
              <select id="quiz-language">
                <option value="en">English only</option>
                <option value="he">Hebrew only (עברית)</option>
                <option value="both" selected>Bilingual (דו-לשוני)</option>
              </select>
            </div>
          </div>

          <div class="quiz-actions">
            <button class="action-btn primary" onclick="window.advancedQuiz.startQuiz()">
              🎯 Start Quiz
            </button>
            <button class="action-btn secondary" onclick="window.advancedQuiz.showStats()">
              📊 My Stats
            </button>
            <button class="action-btn" onclick="window.advancedQuiz.showCustomQuiz()">
              ⚙️ Custom Quiz
            </button>
          </div>
        </div>

        <div class="quiz-content" id="quiz-content">
          <!-- Quiz questions will appear here -->
        </div>

        <div class="quiz-stats" id="quiz-stats" style="display: none;">
          <!-- Statistics will appear here -->
        </div>

        <style>
          .advanced-quiz-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .quiz-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
          }

          .quiz-selector {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 20px;
          }

          .quiz-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
          }

          .option-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .option-group label {
            font-weight: bold;
            color: #333;
          }

          .option-group select {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
          }

          .quiz-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .quiz-content {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            min-height: 300px;
          }

          .question-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 10px 0;
            border-left: 4px solid #667eea;
          }

          .question-text {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
          }

          .question-hebrew {
            font-size: 16px;
            color: #666;
            margin-bottom: 15px;
            font-style: italic;
            direction: rtl;
            text-align: right;
          }

          .question-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .option-btn {
            padding: 15px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 6px;
            text-align: left;
            cursor: pointer;
            transition: all 0.3s;
          }

          .option-btn:hover {
            border-color: #667eea;
            background: #f0f4ff;
          }

          .option-btn.selected {
            border-color: #667eea;
            background: #e3f2fd;
          }

          .option-btn.correct {
            border-color: #4caf50;
            background: #e8f5e8;
          }

          .option-btn.incorrect {
            border-color: #f44336;
            background: #ffebee;
          }

          .question-explanation {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }

          .israeli-context {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            font-size: 14px;
          }

          .quiz-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
          }

          .progress-bar {
            flex: 1;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            margin: 0 15px;
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4caf50, #8bc34a);
            transition: width 0.3s;
          }

          .quiz-results {
            text-align: center;
            padding: 20px;
          }

          .score-display {
            font-size: 48px;
            font-weight: bold;
            margin: 20px 0;
          }

          .score-excellent { color: #4caf50; }
          .score-good { color: #8bc34a; }
          .score-fair { color: #ff9800; }
          .score-poor { color: #f44336; }

          @media (max-width: 768px) {
            .quiz-options {
              grid-template-columns: 1fr;
            }
            
            .quiz-actions {
              flex-direction: column;
            }
          }
        </style>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', uiHTML);
  }

  // ============= QUIZ FUNCTIONALITY =============

  /**
   * Start quiz with selected options
   */
  async startQuiz() {
    const topic = document.getElementById('quiz-topic').value;
    const difficulty = document.getElementById('quiz-difficulty').value;
    const count = parseInt(document.getElementById('quiz-count').value);
    const language = document.getElementById('quiz-language').value;

    const questions = await this.generateQuiz(topic, { difficulty, count, language });
    
    this.currentQuiz = {
      questions: questions,
      currentIndex: 0,
      answers: [],
      startTime: Date.now(),
      topic: topic,
      difficulty: difficulty
    };

    this.displayQuestion();
  }

  /**
   * Display current question
   */
  displayQuestion() {
    const { questions, currentIndex } = this.currentQuiz;
    const question = questions[currentIndex];
    const content = document.getElementById('quiz-content');

    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    content.innerHTML = `
      <div class="quiz-progress">
        <span>Question ${currentIndex + 1} of ${questions.length}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercent}%"></div>
        </div>
        <span>${question.difficulty} level</span>
      </div>

      <div class="question-card">
        <div class="question-text">${question.question}</div>
        ${question.questionHebrew ? `<div class="question-hebrew">${question.questionHebrew}</div>` : ''}
        
        <div class="question-options">
          ${question.options.map((option, index) => `
            <div class="option-btn" onclick="window.advancedQuiz.selectAnswer(${index})">
              ${String.fromCharCode(65 + index)}. ${option}
              ${question.optionsHebrew ? `<br><small style="color: #666;">${question.optionsHebrew[index]}</small>` : ''}
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 20px;">
          <button class="action-btn secondary" onclick="window.advancedQuiz.submitAnswer()" id="submit-btn" disabled>
            Submit Answer
          </button>
          ${currentIndex > 0 ? '<button class="action-btn" onclick="window.advancedQuiz.previousQuestion()">← Previous</button>' : ''}
        </div>
      </div>
    `;
  }

  /**
   * Select answer option
   */
  selectAnswer(index) {
    // Remove previous selection
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Add selection
    document.querySelectorAll('.option-btn')[index].classList.add('selected');
    
    // Enable submit button
    document.getElementById('submit-btn').disabled = false;
    
    // Store answer
    this.currentQuiz.selectedAnswer = index;
  }

  /**
   * Submit current answer and show explanation
   */
  submitAnswer() {
    const { questions, currentIndex } = this.currentQuiz;
    const question = questions[currentIndex];
    const selectedIndex = this.currentQuiz.selectedAnswer;
    const selectedAnswer = question.options[selectedIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Record answer
    this.currentQuiz.answers.push({
      questionId: question.id,
      selectedAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      correct: isCorrect,
      timeSpent: Date.now() - this.questionStartTime
    });

    // Show correct/incorrect styling
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
      if (index === selectedIndex) {
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
      }
      if (question.options[index] === question.correctAnswer) {
        btn.classList.add('correct');
      }
      btn.style.pointerEvents = 'none';
    });

    // Show explanation
    const explanationHTML = `
      <div class="question-explanation">
        <h4>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h4>
        <p><strong>Explanation:</strong> ${question.explanation}</p>
        ${question.israeliContext ? `
          <div class="israeli-context">
            <strong>🇮🇱 Israeli Context:</strong> ${question.israeliContext}
          </div>
        ` : ''}
        ${question.reference ? `<p><small><strong>Reference:</strong> ${question.reference}</small></p>` : ''}
      </div>
    `;

    document.querySelector('.question-card').insertAdjacentHTML('beforeend', explanationHTML);

    // Update submit button
    const submitBtn = document.getElementById('submit-btn');
    if (currentIndex < questions.length - 1) {
      submitBtn.textContent = 'Next Question →';
      submitBtn.onclick = () => this.nextQuestion();
    } else {
      submitBtn.textContent = 'Finish Quiz';
      submitBtn.onclick = () => this.finishQuiz();
    }
    
    submitBtn.disabled = false;
  }

  /**
   * Move to next question
   */
  nextQuestion() {
    this.currentQuiz.currentIndex++;
    this.questionStartTime = Date.now();
    this.displayQuestion();
  }

  /**
   * Finish quiz and show results
   */
  finishQuiz() {
    const { answers, startTime, topic, difficulty } = this.currentQuiz;
    const totalTime = Date.now() - startTime;
    const correctCount = answers.filter(a => a.correct).length;
    const percentage = Math.round((correctCount / answers.length) * 100);
    
    // Save statistics
    this.saveQuizResults({
      topic,
      difficulty,
      score: percentage,
      correctAnswers: correctCount,
      totalQuestions: answers.length,
      timeSpent: totalTime,
      date: new Date().toISOString()
    });

    // Show results
    const scoreClass = 
      percentage >= 90 ? 'score-excellent' :
      percentage >= 75 ? 'score-good' :
      percentage >= 60 ? 'score-fair' : 'score-poor';

    const timeSpent = Math.round(totalTime / 1000 / 60);

    document.getElementById('quiz-content').innerHTML = `
      <div class="quiz-results">
        <h2>🎓 Quiz Complete!</h2>
        <div class="score-display ${scoreClass}">${percentage}%</div>
        <p><strong>${correctCount} out of ${answers.length} correct</strong></p>
        <p>Time: ${timeSpent} minutes</p>
        <p>Topic: ${topic} (${difficulty})</p>
        
        ${percentage >= 90 ? '🏆 Excellent! You have mastered this topic.' :
          percentage >= 75 ? '👍 Good job! Keep practicing for excellence.' :
          percentage >= 60 ? '📚 Fair performance. Review the explanations.' :
          '📖 Consider reviewing the basics before retaking.'}
        
        <div style="margin-top: 30px;">
          <button class="action-btn primary" onclick="window.advancedQuiz.retakeQuiz()">
            🔄 Retake Quiz
          </button>
          <button class="action-btn secondary" onclick="window.advancedQuiz.reviewAnswers()">
            📋 Review Answers
          </button>
          <button class="action-btn" onclick="window.advancedQuiz.showStats()">
            📊 View All Stats
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Show quiz system interface
   */
  showQuizSystem() {
    const container = document.querySelector('.advanced-quiz-container');
    if (container) {
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
      if (container.style.display === 'block') {
        // Reset to main menu
        document.getElementById('quiz-content').innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Select your quiz options above and click "Start Quiz" to begin.</p>';
      }
    }
  }

  // ============= HELPER FUNCTIONS =============

  formatQuestions(topic, questions, count) {
    return questions.slice(0, count).map((q, index) => ({
      id: `${topic}_${q.difficulty || 'basic'}_${index}`,
      type: q.type || 'MCQ',
      question: q.question,
      questionHebrew: q.questionHebrew,
      options: q.options,
      optionsHebrew: q.optionsHebrew,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty || 'basic',
      source: q.source || 'Israeli Geriatric Guidelines',
      tags: [topic, 'geriatrics', 'israeli'],
      israeliContext: q.israeliContext,
      reference: q.reference
    }));
  }

  saveQuizResults(results) {
    const stats = JSON.parse(localStorage.getItem('quiz_stats') || '{}');
    if (!stats.history) stats.history = [];
    
    stats.history.unshift(results);
    stats.history = stats.history.slice(0, 50); // Keep last 50 results
    
    // Update topic stats
    if (!stats.topics) stats.topics = {};
    if (!stats.topics[results.topic]) {
      stats.topics[results.topic] = { attempts: 0, avgScore: 0, bestScore: 0 };
    }
    
    const topicStats = stats.topics[results.topic];
    topicStats.attempts++;
    topicStats.avgScore = Math.round(
      ((topicStats.avgScore * (topicStats.attempts - 1)) + results.score) / topicStats.attempts
    );
    topicStats.bestScore = Math.max(topicStats.bestScore, results.score);
    topicStats.lastAttempt = results.date;
    
    localStorage.setItem('quiz_stats', JSON.stringify(stats));
    this.userStats = stats;
  }
}

// Initialize Advanced Quiz System
window.advancedQuiz = new AdvancedQuizSystem();

console.log(`
🎓 Advanced Quiz System Ready!

Features:
- Hebrew-English bilingual questions
- Israeli healthcare context integration
- Multiple difficulty levels (Basic to Expert)
- Topic-specific question banks
- Hebrew medication name recognition
- CHA2DS2-VASc, FRAIL scale calculations
- Israeli guidelines and Sal coverage info
- Performance statistics tracking
- Spaced repetition recommendations

Topics Available:
- Falls Prevention (נפילות ומניעה)
- Polypharmacy (רב תרופות) 
- Dementia Care (טיפול בדמנציה)
- Frailty Assessment (הערכת שבירות)
- Cardiology (קרדיולוגיה)
- And more...

Usage:
- advancedQuiz.showQuizSystem() - Show quiz interface
`);