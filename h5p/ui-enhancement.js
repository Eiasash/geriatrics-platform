// ui-enhancement.js
// User Interface Enhancement - Makes all features accessible via buttons/clicks
// No console commands needed!

class UIEnhancement {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    // Wait for DOM and other scripts to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createUI());
    } else {
      setTimeout(() => this.createUI(), 2000); // Give more time for scripts to load
    }
  }

  createUI() {
    // Create floating action button (FAB) for mobile and desktop
    this.createFloatingMenu();
    
    // Add quick access toolbar
    this.createQuickAccessBar();
    
    // Create modal for displaying content
    this.createModal();
    
    // Add keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    this.initialized = true;
    console.log('✅ UI Enhancement loaded - all features now accessible via buttons!');
  }

  createFloatingMenu() {
    // Create the main FAB button
    const fab = document.createElement('div');
    fab.id = 'enhanced-fab';
    fab.innerHTML = `
      <style>
        #enhanced-fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 10000;
          font-family: Arial, sans-serif;
        }
        
        .fab-main {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.3s;
          color: white;
          font-size: 28px;
        }
        
        .fab-main:hover {
          transform: scale(1.1);
        }
        
        .fab-menu {
          position: absolute;
          bottom: 70px;
          right: 0;
          display: none;
          flex-direction: column;
          gap: 10px;
          background: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          min-width: 200px;
          max-height: 400px;
          overflow-y: auto;
        }
        
        .fab-menu.active {
          display: flex;
        }
        
        .fab-item {
          padding: 12px 16px;
          background: #f7f7f7;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
        
        .fab-item:hover {
          background: #667eea;
          color: white;
          transform: translateX(-5px);
        }
        
        .fab-icon {
          font-size: 18px;
        }
        
        .fab-submenu {
          display: none;
          flex-direction: column;
          gap: 5px;
          margin-top: 5px;
          margin-left: 20px;
        }
        
        .fab-submenu.active {
          display: flex;
        }
        
        .fab-submenu-item {
          padding: 8px 12px;
          background: #e8e8e8;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
        }
        
        .fab-submenu-item:hover {
          background: #764ba2;
          color: white;
        }
        
        @media (max-width: 768px) {
          #enhanced-fab {
            bottom: 70px;
            right: 10px;
          }
          
          .fab-menu {
            right: 0;
            left: auto;
            max-width: calc(100vw - 20px);
          }
        }
      </style>
      
      <div class="fab-main" onclick="window.uiEnhancement.toggleMenu()">
        📚
      </div>
      
      <div class="fab-menu" id="fab-menu">
        <!-- Study Tools -->
        <div class="fab-item" onclick="window.uiEnhancement.toggleSubmenu('study')">
          <span class="fab-icon">🎓</span>
          <span>Study Tools</span>
        </div>
        <div class="fab-submenu" id="study-submenu">
          <div class="fab-submenu-item" onclick="window.uiEnhancement.getRandomCard()">Random Study Card</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.getDueCards()">Due for Review</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.searchCards()">Search Cards</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.viewProgress()">View Progress</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.showPersonalKnowledge()">📝 Personal Notes</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.showAdvancedQuiz()">🎓 Advanced Quiz System</div>
        </div>
        
        <!-- Clinical Tools -->
        <div class="fab-item" onclick="window.uiEnhancement.toggleSubmenu('clinical')">
          <span class="fab-icon">🩺</span>
          <span>Clinical Tools</span>
        </div>
        <div class="fab-submenu" id="clinical-submenu">
          <div class="fab-submenu-item" onclick="window.uiEnhancement.getPimpQuestion()">Pimp Question</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.startCase()">Case Simulator</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.drugLookup()">Drug Lookup</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.showCalculators()">🧮 Clinical Calculators</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.checkInteractions()">Check Interactions</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.renalDosing()">Renal Dosing</div>
        </div>
        
        <!-- Research -->
        <div class="fab-item" onclick="window.uiEnhancement.toggleSubmenu('research')">
          <span class="fab-icon">📖</span>
          <span>Research</span>
        </div>
        <div class="fab-submenu" id="research-submenu">
          <div class="fab-submenu-item" onclick="window.uiEnhancement.showMedicalHub()">🏥 Medical Knowledge Hub</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.showOpenAccess()">🔓 Open Access Literature</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.latestPapers()">Latest Papers</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.highImpact()">High Impact</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.guidelines()">Guidelines</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.searchResearch()">Search Research</div>
        </div>
        
        <!-- Fellowship -->
        <div class="fab-item" onclick="window.uiEnhancement.toggleSubmenu('fellowship')">
          <span class="fab-icon">🎯</span>
          <span>Fellowship</span>
        </div>
        <div class="fab-submenu" id="fellowship-submenu">
          <div class="fab-submenu-item" onclick="window.uiEnhancement.viewMilestones()">Milestones</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.weeklyObjectives()">This Week</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.performanceReport()">My Progress</div>
        </div>
        
        <!-- Medical Hub - Direct Access -->
        <div class="fab-item" onclick="window.uiEnhancement.showMedicalHub()" style="border-left: 3px solid #2196f3;">
          <span class="fab-icon">🏥</span>
          <span>Medical Knowledge Hub</span>
        </div>
        
        <!-- Quick Actions -->
        <div class="fab-item" onclick="window.uiEnhancement.toggleSubmenu('quick')">
          <span class="fab-icon">⚡</span>
          <span>Quick Access</span>
        </div>
        <div class="fab-submenu" id="quick-submenu">
          <div class="fab-submenu-item" onclick="window.uiEnhancement.clinicalPearl()">Clinical Pearl</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.opioidCalc()">Opioid Calculator</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.beersCriteria()">Beers Criteria</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.fallsAssessment()">Falls Assessment</div>
        </div>

        <!-- Settings -->
        <div class="fab-item" onclick="window.uiEnhancement.toggleSubmenu('settings')">
          <span class="fab-icon">⚙️</span>
          <span>Settings</span>
        </div>
        <div class="fab-submenu" id="settings-submenu">
          <div class="fab-submenu-item" onclick="window.uiEnhancement.apiStatus()">API Status</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.systemStatus()">System Status</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.exportData()">Export Data</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(fab);
  }

  createQuickAccessBar() {
    // Create a top bar with most-used functions
    const quickBar = document.createElement('div');
    quickBar.id = 'quick-access-bar';
    quickBar.innerHTML = `
      <style>
        #quick-access-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e0e0e0;
          padding: 8px 10px;
          display: flex;
          gap: 10px;
          overflow-x: auto;
          z-index: 9999;
          display: none; /* Hidden by default, shown via toggle */
        }
        
        #quick-access-bar.active {
          display: flex;
        }
        
        .quick-btn {
          padding: 6px 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          white-space: nowrap;
          font-size: 13px;
          transition: transform 0.2s;
        }
        
        .quick-btn:hover {
          transform: scale(1.05);
        }
        
        .quick-toggle {
          position: fixed;
          top: 10px;
          right: 10px;
          z-index: 10001;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 12px;
        }
      </style>
      
      <button class="quick-btn" onclick="window.uiEnhancement.getRandomCard()">📚 Study Card</button>
      <button class="quick-btn" onclick="window.uiEnhancement.getPimpQuestion()">❓ Pimp Q</button>
      <button class="quick-btn" onclick="window.uiEnhancement.drugLookup()">💊 Drug</button>
      <button class="quick-btn" onclick="window.uiEnhancement.startCase()">🏥 Case</button>
      <button class="quick-btn" onclick="window.uiEnhancement.latestPapers()">📰 Research</button>
      <button class="quick-btn" onclick="window.uiEnhancement.viewProgress()">📊 Progress</button>
      <button class="quick-btn" onclick="window.uiEnhancement.clinicalPearl()">💡 Pearl</button>
    `;
    
    // Add toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'quick-toggle';
    toggleBtn.textContent = '⚡ Quick Bar';
    toggleBtn.onclick = () => {
      document.getElementById('quick-access-bar').classList.toggle('active');
    };
    
    document.body.appendChild(quickBar);
    document.body.appendChild(toggleBtn);
  }

  createModal() {
    const modal = document.createElement('div');
    modal.id = 'enhancement-modal';
    modal.innerHTML = `
      <style>
        #enhancement-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10002;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        #enhancement-modal.active {
          display: flex;
        }
        
        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 20px;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          width: 100%;
        }
        
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 18px;
        }
        
        .modal-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }
        
        .modal-body {
          font-size: 14px;
          line-height: 1.6;
          color: #555;
        }
        
        .card-container {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
        }
        
        .card-question {
          font-weight: bold;
          color: #667eea;
          margin-bottom: 10px;
        }
        
        .card-answer {
          color: #333;
          padding: 10px;
          background: white;
          border-radius: 6px;
          margin-top: 10px;
        }
        
        .button-row {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }
        
        .action-btn {
          padding: 8px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .action-btn:hover {
          background: #764ba2;
        }
        
        .search-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .result-item {
          padding: 10px;
          background: #f5f5f5;
          border-radius: 6px;
          margin: 5px 0;
          cursor: pointer;
        }
        
        .result-item:hover {
          background: #e8e8e8;
        }
        
        @media (max-width: 768px) {
          .modal-content {
            padding: 15px;
            max-height: 90vh;
          }
        }
      </style>
      
      <div class="modal-content">
        <button class="modal-close" onclick="window.uiEnhancement.closeModal()">×</button>
        <div class="modal-title" id="modal-title">Title</div>
        <div class="modal-body" id="modal-body">Content</div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  // UI Control Methods
  toggleMenu() {
    const menu = document.getElementById('fab-menu');
    menu.classList.toggle('active');
    
    // Close all submenus when main menu is closed
    if (!menu.classList.contains('active')) {
      document.querySelectorAll('.fab-submenu').forEach(sub => {
        sub.classList.remove('active');
      });
    }
  }

  toggleSubmenu(id) {
    const submenu = document.getElementById(`${id}-submenu`);
    
    // Close other submenus
    document.querySelectorAll('.fab-submenu').forEach(sub => {
      if (sub.id !== `${id}-submenu`) {
        sub.classList.remove('active');
      }
    });
    
    submenu.classList.toggle('active');
  }

  showModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('enhancement-modal').classList.add('active');
  }

  closeModal() {
    document.getElementById('enhancement-modal').classList.remove('active');
  }

  // Study Functions
  getRandomCard() {
    if (!window.GeriatricsKnowledge) {
      this.showModal('Error', 'Knowledge base not loaded yet. Please refresh the page.');
      return;
    }
    
    const card = window.GeriatricsKnowledge.getRandomCard();
    if (card) {
      const content = `
        <div class="card-container">
          <div class="card-question">❓ ${card.question}</div>
          <div class="card-answer" id="answer-div" style="display:none;">
            ✅ ${card.answer}
          </div>
          <div class="button-row">
            <button class="action-btn" onclick="document.getElementById('answer-div').style.display='block'">
              Show Answer
            </button>
            <button class="action-btn" onclick="window.uiEnhancement.getRandomCard()">
              Next Card
            </button>
          </div>
          <div style="margin-top:10px; color:#888; font-size:12px;">
            Topic: ${card.topic} | Difficulty: ${card.difficulty}
          </div>
        </div>
      `;
      this.showModal('Study Card', content);
    }
  }

  getDueCards() {
    if (!window.smartStudy) {
      this.showModal('Error', 'Smart Study system not loaded.');
      return;
    }
    
    const dueCard = window.smartStudy.getNextDueCard();
    if (dueCard) {
      const content = `
        <div class="card-container">
          <div class="card-question">❓ ${dueCard.question}</div>
          <div class="card-answer" id="answer-div" style="display:none;">
            ✅ ${dueCard.answer}
          </div>
          <div class="button-row">
            <button class="action-btn" onclick="document.getElementById('answer-div').style.display='block'">
              Show Answer
            </button>
          </div>
          <div style="margin-top:15px;">
            Rate your recall:
          </div>
          <div class="button-row">
            <button class="action-btn" onclick="window.smartStudy.processReview('${dueCard.id}', 1); window.uiEnhancement.getDueCards();">
              😟 Hard
            </button>
            <button class="action-btn" onclick="window.smartStudy.processReview('${dueCard.id}', 3); window.uiEnhancement.getDueCards();">
              😐 Good
            </button>
            <button class="action-btn" onclick="window.smartStudy.processReview('${dueCard.id}', 5); window.uiEnhancement.getDueCards();">
              😊 Easy
            </button>
          </div>
        </div>
      `;
      this.showModal('Due for Review', content);
    } else {
      this.showModal('Study Status', '✅ All cards reviewed! Great job! Check back tomorrow.');
    }
  }

  searchCards() {
    const content = `
      <input type="text" class="search-input" placeholder="Search study cards..." 
             id="card-search" onkeyup="window.uiEnhancement.performCardSearch()">
      <div id="search-results"></div>
    `;
    this.showModal('Search Study Cards', content);
  }

  performCardSearch() {
    const query = document.getElementById('card-search').value;
    if (!query || !window.GeriatricsKnowledge) return;
    
    const results = window.GeriatricsKnowledge.searchCards(query);
    const resultsDiv = document.getElementById('search-results');
    
    if (results.length > 0) {
      resultsDiv.innerHTML = results.slice(0, 10).map(card => `
        <div class="result-item" onclick="window.uiEnhancement.showCard('${card.id}')">
          <strong>${card.question}</strong><br>
          <small>Topic: ${card.topic}</small>
        </div>
      `).join('');
    } else {
      resultsDiv.innerHTML = '<p>No cards found</p>';
    }
  }

  showCard(cardId) {
    const card = window.GeriatricsKnowledge.studyCards.find(c => c.id === cardId);
    if (card) {
      const content = `
        <div class="card-container">
          <div class="card-question">❓ ${card.question}</div>
          <div class="card-answer">✅ ${card.answer}</div>
          <div style="margin-top:10px; color:#888; font-size:12px;">
            Topic: ${card.topic} | Difficulty: ${card.difficulty}
          </div>
        </div>
      `;
      this.showModal('Study Card', content);
    }
  }

  viewProgress() {
    if (!window.smartStudy) {
      this.showModal('Error', 'Progress tracking not available.');
      return;
    }
    
    const progress = window.smartStudy.getDailyProgress();
    const weakAreas = window.smartStudy.weaknessDetector.analyze();
    
    const content = `
      <div class="card-container">
        <h3>📊 Today's Progress</h3>
        <p>✅ New Cards: ${progress.newCards}</p>
        <p>🔄 Reviews: ${progress.reviews}</p>
        <p>🏥 Cases: ${progress.cases}</p>
        <p>⏱️ Time Spent: ${Math.round(progress.timeSpent / 60)} minutes</p>
      </div>
      
      <div class="card-container">
        <h3>🎯 Focus Areas</h3>
        <p><strong>Critical:</strong> ${weakAreas.critical.join(', ') || 'None'}</p>
        <p><strong>Moderate:</strong> ${weakAreas.moderate.join(', ') || 'None'}</p>
        <p><strong>Minor:</strong> ${weakAreas.minor.join(', ') || 'None'}</p>
      </div>
    `;
    
    this.showModal('Your Progress', content);
  }

  // Clinical Functions
  getPimpQuestion() {
    if (!window.Fellowship) {
      // Fallback pimp questions if Fellowship module not loaded
      const fallbackQuestions = [
        {
          q: "Beers criteria for benzodiazepines in elderly?",
          a: "Avoid all benzodiazepines except for seizure disorders, rapid eye movement sleep disorders, benzodiazepine withdrawal, ethanol withdrawal, severe GAD, or end-of-life care",
          pearls: "Increased sensitivity due to slower metabolism and increased fat distribution"
        },
        {
          q: "Target blood pressure in frail elderly?",
          a: "SBP 140-150 mmHg for frail (CFS ≥5). Avoid SBP <130 due to increased falls and mortality",
          pearls: "J-curve relationship more pronounced in frail populations"
        },
        {
          q: "Most common cause of delirium in hospitalized elderly?",
          a: "Multifactorial, but infections (especially UTI) most common single cause (25-30%), followed by medications and metabolic disturbances",
          pearls: "Always check for constipation and urinary retention"
        },
        {
          q: "First-line treatment for behavioral symptoms of dementia?",
          a: "Non-pharmacological: identify triggers, structured routine, music therapy, validation therapy. Avoid antipsychotics except for severe psychosis or aggression",
          pearls: "Antipsychotics increase mortality by 1.6-1.7x in dementia"
        },
        {
          q: "NNT for exercise to prevent falls?",
          a: "NNT = 7 for preventing one fall over 12 months with multicomponent exercise program",
          pearls: "Most effective single intervention for fall prevention"
        }
      ];
      
      const q = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
      const content = `
        <div class="card-container">
          <div class="card-question">❓ ${q.q}</div>
          <div class="card-answer" id="answer-div" style="display:none;">
            <p><strong>Answer:</strong> ${q.a}</p>
            ${q.pearls ? `<p><strong>💡 Pearl:</strong> ${q.pearls}</p>` : ''}
          </div>
          <div class="button-row">
            <button class="action-btn" onclick="document.getElementById('answer-div').style.display='block'">
              Show Answer
            </button>
            <button class="action-btn" onclick="window.uiEnhancement.getPimpQuestion()">
              Next Question
            </button>
          </div>
        </div>
      `;
      this.showModal('Pimp Question', content);
      return;
    }
    
    const q = window.Fellowship.getPimpQuestion();
    const content = `
      <div class="card-container">
        <div class="card-question">❓ ${q.q}</div>
        <div class="card-answer" id="answer-div" style="display:none;">
          <p><strong>Answer:</strong> ${q.a}</p>
          ${q.pearls ? `<p><strong>💡 Pearl:</strong> ${q.pearls}</p>` : ''}
        </div>
        <div class="button-row">
          <button class="action-btn" onclick="document.getElementById('answer-div').style.display='block'">
            Show Answer
          </button>
          <button class="action-btn" onclick="window.uiEnhancement.getPimpQuestion()">
            Next Question
          </button>
        </div>
      </div>
    `;
    this.showModal('Pimp Question', content);
  }

  startCase() {
    // Try enhanced case simulator first
    if (window.CaseSimulator) {
      const caseData = window.CaseSimulator.startCase();
      this.currentCase = caseData;
      this.currentQuestion = 0;
      this.caseScore = 0;
      this.showCaseQuestion();
      return;
    }
    
    // Fallback to Fellowship cases
    if (window.Fellowship && window.Fellowship.caseSimulator) {
      const caseData = window.Fellowship.caseSimulator.startCase();
      this.currentCase = caseData;
      this.currentQuestion = 0;
      this.showCaseQuestion();
      return;
    }
    
    // Ultimate fallback
    const fallbackCases = [
      {
        id: 'case_1',
        title: 'Post-operative Delirium',
        presentation: '85yo woman with confusion after hip surgery. Vitals stable. No focal neuro findings.',
        questions: [
          {
            prompt: 'Most appropriate initial assessment?',
            options: ['Head CT', 'CAM assessment', 'Lumbar puncture', 'EEG'],
            correct: 1,
            explanation: 'CAM assessment first - delirium is most likely post-op. CT has low yield without focal findings.',
            pearls: '90% of post-op confusion in elderly is delirium, not stroke'
          }
        ]
      },
      {
        id: 'case_2',
        title: 'Polypharmacy Falls',
        presentation: '78yo man on 12 medications presents with falls. No orthostatic changes. Morse score 55.',
        questions: [
          {
            prompt: 'Priority intervention?',
            options: ['PT consult', 'Medication review', 'Hip protectors', 'Bed alarm'],
            correct: 1,
            explanation: 'Polypharmacy is likely contributor. Review for PIMs, especially psychotropics, antihypertensives.',
            pearls: 'Each additional medication increases fall risk by 5-7%'
          }
        ]
      }
    ];
    
    const caseData = fallbackCases[Math.floor(Math.random() * fallbackCases.length)];
    this.currentCase = caseData;
    this.currentQuestion = 0;
    this.caseScore = 0;
    this.showCaseQuestion();
  }

  showCaseQuestion() {
    const caseData = this.currentCase;
    const question = caseData.questions[this.currentQuestion];
    
    const content = `
      <div class="card-container">
        <h3>${caseData.title || 'Clinical Case'}</h3>
        <p><strong>Presentation:</strong> ${caseData.presentation}</p>
        ${caseData.background ? `<p><strong>Background:</strong> ${caseData.background}</p>` : ''}
      </div>
      
      <div class="card-container">
        <p><strong>Question ${this.currentQuestion + 1}/${caseData.questions.length}:</strong></p>
        <p><strong>${question.prompt}</strong></p>
        <div style="margin-top: 15px;">
          ${question.options.map((opt, i) => `
            <div class="result-item" onclick="window.uiEnhancement.submitCaseAnswer(${i})" 
                 style="margin: 8px 0; padding: 12px; border: 1px solid #ddd;">
              <strong>${String.fromCharCode(65 + i)}.</strong> ${opt}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    this.showModal('Case Simulator', content);
  }

  submitCaseAnswer(answerIndex) {
    let result;
    
    // Try enhanced case simulator first
    if (window.CaseSimulator) {
      result = window.CaseSimulator.submitAnswer(this.currentQuestion, answerIndex);
    } else if (window.Fellowship && window.Fellowship.caseSimulator) {
      result = window.Fellowship.caseSimulator.submitAnswer(this.currentQuestion, answerIndex);
    } else {
      // Fallback case evaluation
      const question = this.currentCase.questions[this.currentQuestion];
      const correct = answerIndex === question.correct;
      
      if (!this.caseScore) this.caseScore = 0;
      if (correct) this.caseScore++;
      
      result = {
        correct: correct,
        explanation: question.explanation,
        pearls: question.pearls || question.pearls,
        score: this.caseScore,
        totalQuestions: this.currentCase.questions.length
      };
    }
    
    const content = `
      <div class="card-container">
        <p><strong>${result.correct ? '✅ Correct!' : '❌ Incorrect'}</strong></p>
        <p>${result.explanation}</p>
        <p><strong>💡 Pearl:</strong> ${result.pearl}</p>
        <p><strong>Score:</strong> ${result.score}/${this.currentCase.questions.length}</p>
      </div>
      
      <div class="button-row">
        ${this.currentQuestion < this.currentCase.questions.length - 1 ? 
          `<button class="action-btn" onclick="window.uiEnhancement.nextCaseQuestion()">
            Next Question
          </button>` :
          `<button class="action-btn" onclick="window.uiEnhancement.startCase()">
            New Case
          </button>`
        }
      </div>
    `;
    
    this.showModal('Case Result', content);
  }

  nextCaseQuestion() {
    this.currentQuestion++;
    this.showCaseQuestion();
  }

  drugLookup() {
    const content = `
      <input type="text" class="search-input" placeholder="Enter drug name (e.g., metoprolol, warfarin, sertraline)" 
             id="drug-search" onkeyup="window.uiEnhancement.performDrugSearch()">
      <div id="drug-results">
        <p>💡 Try searching for: metoprolol, warfarin, sertraline, lisinopril, furosemide, omeprazole, acetaminophen</p>
      </div>
    `;
    this.showModal('Drug Lookup', content);
  }

  performDrugSearch() {
    const drugName = document.getElementById('drug-search').value.trim();
    if (!drugName) return;
    
    const resultsDiv = document.getElementById('drug-results');
    let drugInfo = null;
    
    // Try Israeli Drug Database first (most comprehensive)
    if (window.IsraeliDrugDatabase) {
      drugInfo = window.IsraeliDrugDatabase.getDrugInfo(drugName);
    }
    
    // Try comprehensive database second
    if ((!drugInfo || drugInfo.error) && window.DrugDatabase) {
      drugInfo = window.DrugDatabase.getDrugInfo(drugName);
    }
    
    // Fallback to knowledge base
    if ((!drugInfo || drugInfo.error) && window.GeriatricsKnowledge) {
      drugInfo = window.GeriatricsKnowledge.getDrugInfo(drugName);
    }
    
    if (drugInfo && !drugInfo.error) {
      const beersConcerns = window.DrugDatabase?.getBeersConcerns(drugName) || [];
      const alternatives = window.DrugDatabase?.getAlternatives(drugName) || [];
      
      resultsDiv.innerHTML = `
        <div class="card-container">
          <h3>${drugInfo.genericName || drugInfo.name || drugName}</h3>
          ${drugInfo.brandNames ? `<p><strong>🇮🇱 Brand Names:</strong> ${drugInfo.brandNames.join(', ')}</p>` : ''}
          ${drugInfo.hebrewName ? `<p><strong>Hebrew:</strong> ${drugInfo.hebrewName}</p>` : ''}
          <p><strong>Class:</strong> ${drugInfo.class}</p>
          <p><strong>Indication:</strong> ${drugInfo.indication || 'Not specified'}</p>
          
          <h4>Geriatric Dosing</h4>
          ${drugInfo.dosing ? `
            <p><strong>Start Dose:</strong> ${drugInfo.dosing.startDose || drugInfo.startDose}</p>
            <p><strong>Max Dose:</strong> ${drugInfo.dosing.maxDose || drugInfo.maxDose}</p>
            <p><strong>Geriatric Start:</strong> ${drugInfo.dosing.geriatricStart || 'Same as adult'}</p>
          ` : `
            <p><strong>Start Dose:</strong> ${drugInfo.startDose}</p>
            <p><strong>Max Dose:</strong> ${drugInfo.maxDose}</p>
          `}
          
          <h4>Safety Considerations</h4>
          <p><strong>Geriatric Notes:</strong> ${drugInfo.geriatricConsiderations}</p>
          ${drugInfo.contraindications ? `<p><strong>Contraindications:</strong> ${drugInfo.contraindications.join(', ')}</p>` : ''}
          ${drugInfo.monitoring ? `<p><strong>Monitoring:</strong> ${drugInfo.monitoring}</p>` : ''}
          
          ${drugInfo.beersCriteria ? `
            <div style="background: #ffebee; border-left: 4px solid #f44336; padding: 10px; margin: 10px 0;">
              <h4>🚫 Beers Criteria</h4>
              <p><strong>${drugInfo.beersCriteria}</strong></p>
              ${drugInfo.alternatives ? `<p><strong>Consider:</strong> ${drugInfo.alternatives.join(', ')}</p>` : ''}
            </div>
          ` : ''}
          
          ${drugInfo.israeliNotes ? `
            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 10px; margin: 10px 0;">
              <h4>🇮🇱 Israeli Context</h4>
              <p>${drugInfo.israeliNotes}</p>
            </div>
          ` : ''}
          
          <p><strong>Key Interactions:</strong> ${drugInfo.interactions?.join(', ') || 'See interaction checker'}</p>
          
          <div class="button-row" style="margin-top: 15px;">
            <button class="action-btn" onclick="window.uiEnhancement.checkSingleDrugInteractions('${drugInfo.genericName || drugInfo.name || drugName}')">
              🔍 Check Interactions
            </button>
          </div>
        </div>
      `;
    } else {
      resultsDiv.innerHTML = `
        <div class="card-container">
          <p>Drug "${drugName}" not found in database.</p>
          ${drugInfo.suggestion ? `<p><strong>💡 Suggestion:</strong> ${drugInfo.suggestion}</p>` : ''}
          <p><strong>🇮🇱 Try Israeli brand names:</strong></p>
          <p>• <strong>Cardiac:</strong> Betaloc (metoprolol), Norvasc (amlodipine), Tritace (ramipril)</p>
          <p>• <strong>Psychiatric:</strong> Zoloft (sertraline), Remeron (mirtazapine), Rivotril (clonazepam)</p>
          <p>• <strong>Anticoagulants:</strong> Coumadin (warfarin), Xarelto (rivaroxaban)</p>
          <p>• <strong>Pain:</strong> Tramal (tramadol)</p>
          <p>• <strong>Antibiotics:</strong> Augmentin (amoxicillin/clavulanate)</p>
          <p>• <strong>Other:</strong> Glucophage (metformin), Euthyrox (levothyroxine)</p>
          <p>And many more generic names too!</p>
        </div>
      `;
    }
  }

  checkInteractions() {
    const content = `
      <p>Enter medications (one per line):</p>
      <textarea class="search-input" rows="5" id="med-list" 
                placeholder="warfarin&#10;aspirin&#10;amiodarone"></textarea>
      <button class="action-btn" onclick="window.uiEnhancement.performInteractionCheck()">
        Check Interactions
      </button>
      <div id="interaction-results"></div>
    `;
    this.showModal('Drug Interaction Checker', content);
  }

  performInteractionCheck() {
    const meds = document.getElementById('med-list').value.split('\n').filter(m => m.trim());
    if (!meds.length) return;
    
    // Use Israeli Drug Database if available, fallback to regular database
    let interactionSummary;
    if (window.IsraeliDrugDatabase) {
      interactionSummary = window.IsraeliDrugDatabase.getInteractionSummary(meds);
    } else if (window.GeriatricsKnowledge) {
      const interactions = window.GeriatricsKnowledge.checkDrugInteractions(meds);
      interactionSummary = { interactions, totalInteractions: interactions.length };
    } else {
      document.getElementById('interaction-results').innerHTML = `
        <div class="card-container">
          <h4>⚠️ Database Loading</h4>
          <p>Drug database is still loading. Please try again in a moment.</p>
        </div>
      `;
      return;
    }
    
    const resultsDiv = document.getElementById('interaction-results');
    
    if (interactionSummary.totalInteractions > 0) {
      const contraindicated = interactionSummary.interactions.filter(i => i.severity === 'CONTRAINDICATED');
      const major = interactionSummary.interactions.filter(i => i.severity === 'MAJOR');
      const moderate = interactionSummary.interactions.filter(i => i.severity === 'MODERATE');
      
      resultsDiv.innerHTML = `
        <div class="card-container">
          <h4>⚠️ ${interactionSummary.totalInteractions} Interaction(s) Found</h4>
          
          ${contraindicated.length > 0 ? `
            <div style="background: #ffebee; border-left: 4px solid #f44336; padding: 10px; margin: 10px 0;">
              <h5>🚫 CONTRAINDICATED (${contraindicated.length})</h5>
              ${contraindicated.map(int => `
                <div style="margin: 10px 0; padding: 8px; background: white; border-radius: 4px;">
                  <strong>${int.originalNames ? int.originalNames.join(' + ') : int.drugs.join(' + ')}</strong><br>
                  <em>${int.effect}</em><br>
                  <strong>Action:</strong> ${int.management}<br>
                  ${int.timeframe ? `<small>⏱️ ${int.timeframe}</small>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${major.length > 0 ? `
            <div style="background: #fff3e0; border-left: 4px solid #ff9800; padding: 10px; margin: 10px 0;">
              <h5>⚠️ MAJOR (${major.length})</h5>
              ${major.map(int => `
                <div style="margin: 10px 0; padding: 8px; background: white; border-radius: 4px;">
                  <strong>${int.originalNames ? int.originalNames.join(' + ') : int.drugs.join(' + ')}</strong><br>
                  <em>${int.effect}</em><br>
                  <strong>Management:</strong> ${int.management}<br>
                  ${int.frequency ? `<small>📊 ${int.frequency}</small>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${moderate.length > 0 ? `
            <div style="background: #f3e5f5; border-left: 4px solid #9c27b0; padding: 10px; margin: 10px 0;">
              <h5>⚠️ MODERATE (${moderate.length})</h5>
              ${moderate.map(int => `
                <div style="margin: 10px 0; padding: 8px; background: white; border-radius: 4px;">
                  <strong>${int.originalNames ? int.originalNames.join(' + ') : int.drugs.join(' + ')}</strong><br>
                  <em>${int.effect}</em><br>
                  <strong>Management:</strong> ${int.management}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${interactionSummary.recommendations && interactionSummary.recommendations.length > 0 ? `
            <div style="background: #e8f5e8; border-left: 4px solid #4caf50; padding: 10px; margin: 10px 0;">
              <h5>💡 Clinical Recommendations</h5>
              ${interactionSummary.recommendations.map(rec => `
                <p><strong>${rec.priority}:</strong> ${rec.action}<br>
                <small>${rec.reason}</small></p>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      resultsDiv.innerHTML = '<p>✅ No significant interactions detected</p>';
    }
  }

  checkSingleDrugInteractions(drugName) {
    if (!window.IsraeliDrugDatabase) {
      this.showModal('Error', 'Israeli Drug Database not loaded. Please refresh the page.');
      return;
    }
    
    const drugInfo = window.IsraeliDrugDatabase.getDrugInfo(drugName);
    if (!drugInfo || drugInfo.error) {
      this.showModal('Error', `Drug "${drugName}" not found in database.`);
      return;
    }
    
    const content = `
      <div class="card-container">
        <h4>Known Interactions for ${drugInfo.genericName || drugName}</h4>
        <p><strong>Brand Names:</strong> ${drugInfo.brandNames?.join(', ') || 'Generic only'}</p>
        
        ${drugInfo.interactions && drugInfo.interactions.length > 0 ? `
          <h5>⚠️ Key Drug Interactions:</h5>
          <ul>
            ${drugInfo.interactions.map(interaction => `<li>${interaction}</li>`).join('')}
          </ul>
        ` : '<p>No specific interactions listed in database.</p>'}
        
        <div style="margin-top: 15px;">
          <p><strong>To check for interactions with this drug:</strong></p>
          <textarea class="search-input" rows="3" id="single-drug-check" 
                    placeholder="Enter other medications (one per line)&#10;${drugName} will be automatically included"></textarea>
          <button class="action-btn" onclick="window.uiEnhancement.performSingleDrugCheck('${drugName}')">
            🔍 Check Interactions
          </button>
        </div>
        
        <div id="single-drug-results"></div>
      </div>
    `;
    
    this.showModal(`${drugInfo.genericName || drugName} Interactions`, content);
  }

  performSingleDrugCheck(baseDrug) {
    const otherMeds = document.getElementById('single-drug-check').value.split('\n')
      .filter(m => m.trim())
      .map(m => m.trim());
    
    if (otherMeds.length === 0) {
      document.getElementById('single-drug-results').innerHTML = 
        '<p>Please enter at least one other medication to check interactions.</p>';
      return;
    }
    
    // Add the base drug to the list
    const allMeds = [baseDrug, ...otherMeds];
    const interactionSummary = window.IsraeliDrugDatabase.getInteractionSummary(allMeds);
    
    const resultsDiv = document.getElementById('single-drug-results');
    
    if (interactionSummary.totalInteractions > 0) {
      const content = this.formatInteractionResults(interactionSummary);
      resultsDiv.innerHTML = content;
    } else {
      resultsDiv.innerHTML = '<div style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0;"><p>✅ No significant interactions detected with the entered medications.</p></div>';
    }
  }

  formatInteractionResults(interactionSummary) {
    const contraindicated = interactionSummary.interactions.filter(i => i.severity === 'CONTRAINDICATED');
    const major = interactionSummary.interactions.filter(i => i.severity === 'MAJOR');
    const moderate = interactionSummary.interactions.filter(i => i.severity === 'MODERATE');
    
    return `
      <h5>⚠️ ${interactionSummary.totalInteractions} Interaction(s) Found</h5>
      
      ${contraindicated.length > 0 ? `
        <div style="background: #ffebee; border-left: 4px solid #f44336; padding: 10px; margin: 10px 0;">
          <h6>🚫 CONTRAINDICATED (${contraindicated.length})</h6>
          ${contraindicated.map(int => `
            <div style="margin: 8px 0; padding: 6px; background: white; border-radius: 4px; font-size: 14px;">
              <strong>${int.originalNames ? int.originalNames.join(' + ') : int.drugs.join(' + ')}</strong><br>
              <em>${int.effect}</em><br>
              <strong>Action:</strong> ${int.management}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${major.length > 0 ? `
        <div style="background: #fff3e0; border-left: 4px solid #ff9800; padding: 10px; margin: 10px 0;">
          <h6>⚠️ MAJOR (${major.length})</h6>
          ${major.map(int => `
            <div style="margin: 8px 0; padding: 6px; background: white; border-radius: 4px; font-size: 14px;">
              <strong>${int.originalNames ? int.originalNames.join(' + ') : int.drugs.join(' + ')}</strong><br>
              <em>${int.effect}</em><br>
              <strong>Management:</strong> ${int.management}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${moderate.length > 0 ? `
        <div style="background: #f3e5f5; border-left: 4px solid #9c27b0; padding: 10px; margin: 10px 0;">
          <h6>⚠️ MODERATE (${moderate.length})</h6>
          ${moderate.map(int => `
            <div style="margin: 8px 0; padding: 6px; background: white; border-radius: 4px; font-size: 14px;">
              <strong>${int.originalNames ? int.originalNames.join(' + ') : int.drugs.join(' + ')}</strong><br>
              <em>${int.effect}</em><br>
              <strong>Management:</strong> ${int.management}
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  renalDosing() {
    let dosing;
    
    if (window.Fellowship && window.Fellowship.quickRefs) {
      dosing = window.Fellowship.quickRefs.renalDosing;
    } else {
      // Fallback renal dosing data
      dosing = {
        'CrCl 30-50': {
          metformin: 'Max 1000mg daily',
          gabapentin: 'Reduce by 50%',
          rivaroxaban: '15mg daily',
          apixaban: 'No change unless other criteria met',
          enoxaparin: 'No change for prophylaxis',
          trimethoprim: 'Reduce by 50%'
        },
        'CrCl 15-30': {
          metformin: 'Contraindicated',
          gabapentin: 'Reduce by 75%',
          rivaroxaban: '15mg daily',
          apixaban: 'Consider 2.5mg BID',
          enoxaparin: 'Reduce by 50%',
          trimethoprim: 'Reduce by 50%'
        }
      };
    }
    const content = `
      <div class="card-container">
        <h3>CrCl 30-50 mL/min</h3>
        ${Object.entries(dosing['CrCl 30-50']).map(([drug, dose]) => 
          `<p><strong>${drug}:</strong> ${dose}</p>`
        ).join('')}
      </div>
      
      <div class="card-container">
        <h3>CrCl 15-30 mL/min</h3>
        ${Object.entries(dosing['CrCl 15-30']).map(([drug, dose]) => 
          `<p><strong>${drug}:</strong> ${dose}</p>`
        ).join('')}
      </div>
    `;
    this.showModal('Renal Dosing Guide', content);
  }

  // Research Functions
  latestPapers() {
    if (!window.ResearchLibrary) {
      this.showModal('Error', 'Research library not loaded.');
      return;
    }
    
    const papers = window.ResearchLibrary.getPapersByYear(2024).slice(0, 5);
    const content = `
      ${papers.map(p => `
        <div class="card-container">
          <p><strong>${p.title}</strong></p>
          <p><em>${p.authors}</em></p>
          <p>${p.journal}</p>
          <p><strong>Key Finding:</strong> ${p.keyFindings}</p>
          <p><strong>💡 Take Home:</strong> ${p.takeHome}</p>
        </div>
      `).join('')}
    `;
    this.showModal('Latest Research (2024)', content);
  }

  highImpact() {
    if (!window.ResearchLibrary) {
      this.showModal('Error', 'Research library not loaded.');
      return;
    }
    
    const papers = window.ResearchLibrary.getHighImpactPapers().slice(0, 5);
    const content = `
      ${papers.map(p => `
        <div class="card-container">
          <p><strong>${p.title}</strong> (Impact: ${p.impact})</p>
          <p><em>${p.year} - ${p.journal}</em></p>
          <p><strong>Key Finding:</strong> ${p.keyFindings}</p>
          <p><strong>💡 Take Home:</strong> ${p.takeHome}</p>
        </div>
      `).join('')}
    `;
    this.showModal('High Impact Papers', content);
  }

  guidelines() {
    if (!window.ResearchLibrary) {
      this.showModal('Error', 'Guidelines not available.');
      return;
    }
    
    const guidelines = window.ResearchLibrary.guidelines;
    const content = `
      ${Object.entries(guidelines).map(([name, guide]) => `
        <div class="card-container">
          <p><strong>${name}</strong></p>
          <ul>
            ${guide.updates.map(update => `<li>${update}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    `;
    this.showModal('Clinical Guidelines 2023-2024', content);
  }

  searchResearch() {
    const content = `
      <input type="text" class="search-input" placeholder="Search research papers..." 
             id="research-search" onkeyup="window.uiEnhancement.performResearchSearch()">
      <div id="research-results"></div>
    `;
    this.showModal('Search Research', content);
  }

  performResearchSearch() {
    const query = document.getElementById('research-search').value;
    if (!query || !window.ResearchLibrary) return;
    
    const results = window.ResearchLibrary.searchPapers(query);
    const resultsDiv = document.getElementById('research-results');
    
    if (results.length > 0) {
      resultsDiv.innerHTML = results.slice(0, 5).map(paper => `
        <div class="card-container">
          <p><strong>${paper.title}</strong></p>
          <p><em>${paper.year} - ${paper.journal}</em></p>
          <p>${paper.keyFindings || paper.finding}</p>
        </div>
      `).join('');
    } else {
      resultsDiv.innerHTML = '<p>No papers found</p>';
    }
  }

  // Fellowship Functions
  viewMilestones() {
    if (!window.Fellowship) {
      this.showModal('Error', 'Fellowship tracker not available.');
      return;
    }
    
    const milestones = window.Fellowship.milestones;
    const content = `
      <div class="card-container">
        <h3>Pre-Fellowship Checklist</h3>
        ${milestones.preFellowship.items.slice(0, 5).map(item => `
          <p>${item.completed ? '✅' : '⬜'} ${item.skill}</p>
        `).join('')}
      </div>
      
      <div class="card-container">
        <h3>Week 1 Objectives</h3>
        ${milestones.week1.objectives.map(obj => `
          <p>• ${obj}</p>
        `).join('')}
      </div>
    `;
    this.showModal('Fellowship Milestones', content);
  }

  weeklyObjectives() {
    if (!window.Fellowship) {
      this.showModal('Error', 'Objectives not available.');
      return;
    }
    
    const week2 = window.Fellowship.milestones.week2;
    const content = `
      <div class="card-container">
        <h3>${week2.title}</h3>
        <h4>This Week's Objectives:</h4>
        ${week2.objectives.map(obj => `
          <p>• ${obj}</p>
        `).join('')}
        
        <h4>Pimp Topics to Review:</h4>
        ${week2.pimpTopics.map(topic => `
          <p>• ${topic}</p>
        `).join('')}
      </div>
    `;
    this.showModal('This Week\'s Goals', content);
  }

  performanceReport() {
    if (!window.Fellowship || !window.Fellowship.performanceTracker) {
      this.showModal('Error', 'Performance tracking not available.');
      return;
    }
    
    const report = window.Fellowship.performanceTracker.generateProgressReport();
    const content = `
      <div class="card-container">
        <h3>Overall Performance</h3>
        <p><strong>Average Accuracy:</strong> ${Math.round(report.overall.averageAccuracy * 100)}%</p>
        <p><strong>Readiness Level:</strong> ${report.overall.readinessLevel}</p>
        <p><strong>Estimated Ready Date:</strong> ${new Date(report.overall.estimatedReadyDate).toLocaleDateString()}</p>
      </div>
      
      <div class="card-container">
        <h3>Recommendations</h3>
        ${report.recommendations.map(rec => `
          <p>• ${rec}</p>
        `).join('')}
      </div>
    `;
    this.showModal('Your Performance Report', content);
  }

  // Quick Access Functions
  clinicalPearl() {
    if (!window.GeriatricsKnowledge) {
      this.showModal('Error', 'Clinical pearls not available.');
      return;
    }
    
    const pearls = window.GeriatricsKnowledge.clinicalPearls;
    const pearl = pearls[Math.floor(Math.random() * pearls.length)];
    
    const content = `
      <div class="card-container">
        <p><strong>Category:</strong> ${pearl.category}</p>
        <p><strong>💡 Pearl:</strong> ${pearl.pearl}</p>
        <p><strong>Evidence:</strong> ${pearl.evidence}</p>
      </div>
      
      <div class="button-row">
        <button class="action-btn" onclick="window.uiEnhancement.clinicalPearl()">
          Next Pearl
        </button>
      </div>
    `;
    this.showModal('Clinical Pearl', content);
  }

  opioidCalc() {
    let conversions;
    
    if (window.Fellowship && window.Fellowship.quickRefs) {
      conversions = window.Fellowship.quickRefs.opioidConversion.conversions;
    } else {
      // Fallback opioid conversion data
      conversions = {
        'Morphine PO:IV': '3:1',
        'Morphine:Oxycodone': '1.5:1',
        'Morphine:Hydromorphone': '5:1',
        'Morphine:Fentanyl patch': '100mg/day : 1mcg/hr',
        'Morphine:Tramadol': '1:10'
      };
    }
    const content = `
      <div class="card-container">
        <h3>Opioid Conversion Ratios</h3>
        <p><em>Remember: Reduce dose by 25-50% when switching</em></p>
        ${Object.entries(conversions).map(([drugs, ratio]) => `
          <p><strong>${drugs}:</strong> ${ratio}</p>
        `).join('')}
      </div>
    `;
    this.showModal('Opioid Converter', content);
  }

  beersCriteria() {
    const content = `
      <div class="card-container">
        <h3>Key Beers Criteria 2023</h3>
        <p>⚠️ <strong>Avoid in ≥65 years:</strong></p>
        <ul>
          <li>All benzodiazepines (except specific indications)</li>
          <li>Antipsychotics for BPSD</li>
          <li>First-generation antihistamines</li>
          <li>NSAIDs for chronic use</li>
          <li>Muscle relaxants</li>
          <li>Sliding scale insulin alone</li>
        </ul>
        
        <p>⚠️ <strong>Use with caution:</strong></p>
        <ul>
          <li>Aspirin >80 years</li>
          <li>SSRIs (fall risk)</li>
          <li>PPIs >8 weeks</li>
          <li>Diuretics</li>
        </ul>
      </div>
    `;
    this.showModal('Beers Criteria Quick Reference', content);
  }

  fallsAssessment() {
    const content = `
      <div class="card-container">
        <h3>Morse Fall Scale</h3>
        <ul>
          <li>History of falling (25 pts)</li>
          <li>Secondary diagnosis (15 pts)</li>
          <li>Ambulatory aid (0-30 pts)</li>
          <li>IV/Heparin lock (20 pts)</li>
          <li>Gait/Transferring (0-20 pts)</li>
          <li>Mental status (0-15 pts)</li>
        </ul>
        <p><strong>Risk Level:</strong></p>
        <p>0-24: Low | 25-44: Moderate | ≥45: High</p>
      </div>
      
      <div class="card-container">
        <h3>Interventions for High Risk</h3>
        <ul>
          <li>Bed in lowest position</li>
          <li>Call bell within reach</li>
          <li>Non-slip footwear</li>
          <li>Clear path to bathroom</li>
          <li>Hourly rounding</li>
          <li>Consider bed alarm</li>
        </ul>
      </div>
    `;
    this.showModal('Falls Assessment Guide', content);
  }

  // Keyboard Shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Alt + shortcuts for quick access
      if (e.altKey) {
        switch(e.key) {
          case 's': // Alt+S for study card
            e.preventDefault();
            this.getRandomCard();
            break;
          case 'p': // Alt+P for pimp question
            e.preventDefault();
            this.getPimpQuestion();
            break;
          case 'd': // Alt+D for drug lookup
            e.preventDefault();
            this.drugLookup();
            break;
          case 'c': // Alt+C for case
            e.preventDefault();
            this.startCase();
            break;
          case 'r': // Alt+R for research
            e.preventDefault();
            this.latestPapers();
            break;
        }
      }
      
      // Escape to close modal
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  // Settings Functions
  apiStatus() {
    if (window.apiManager) {
      window.apiManager.showAPIStatus();
    } else {
      this.showModal('API Status', 'API Manager not loaded');
    }
  }

  systemStatus() {
    if (window.debug) {
      window.debug.generateHealthReport();
    } else {
      const modules = {
        'Drug Database': !!window.DrugDatabase,
        'Case Simulator': !!window.CaseSimulator,
        'Knowledge Base': !!window.GeriatricsKnowledge,
        'Research Library': !!window.ResearchLibrary,
        'API Manager': !!window.apiManager,
        'Smart Study': !!window.smartStudy,
        'Patient Tracker': !!window.patientTracker
      };
      
      const content = `
        <div class="card-container">
          <h3>System Status</h3>
          ${Object.entries(modules).map(([name, loaded]) => 
            `<p>${loaded ? '✅' : '❌'} ${name}</p>`
          ).join('')}
          
          <h4>Statistics</h4>
          <p><strong>Drugs Available:</strong> ${window.DrugDatabase ? Object.keys(window.DrugDatabase.drugs).length : 'N/A'}</p>
          <p><strong>Cases Available:</strong> ${window.CaseSimulator ? window.CaseSimulator.cases.length : 'N/A'}</p>
          <p><strong>Study Cards:</strong> ${window.GeriatricsKnowledge ? window.GeriatricsKnowledge.studyCards.length : 'N/A'}</p>
          <p><strong>Research Papers:</strong> ${window.ResearchLibrary ? window.ResearchLibrary.papers.length : 'N/A'}</p>
        </div>
      `;
      this.showModal('System Status', content);
    }
  }

  exportData() {
    const data = {
      timestamp: new Date().toISOString(),
      studyProgress: window.smartStudy ? window.smartStudy.getDailyProgress() : null,
      caseProgress: window.CaseSimulator ? window.CaseSimulator.getProgress() : null,
      apiUsage: window.apiManager ? window.apiManager.getUsageStats() : null,
      systemHealth: window.debug ? window.debug.generateHealthReport() : null
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `geriatrics-platform-export-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    this.showModal('Export Complete', `Data exported to ${exportFileDefaultName}`);
  }

  // Medical Knowledge Hub Integration
  showMedicalHub() {
    if (window.medicalHub && typeof window.medicalHub.showMedicalHub === 'function') {
      window.medicalHub.showMedicalHub();
    } else {
      // Provide immediate functionality even if main hub hasn't loaded
      this.showModal('🏥 Medical Knowledge Hub', `
        <div class="card-container">
          <h3>🏥 Multi-Platform Medical Search</h3>
          <p>Quick access to your institutional medical databases</p>
          
          <div style="margin: 20px 0;">
            <input type="text" id="quick-medical-search" 
                   placeholder="Enter condition, drug, or topic (e.g., 'heart failure elderly')"
                   class="search-input" style="width: 100%;">
          </div>
          
          <div class="button-row">
            <button class="action-btn" onclick="window.uiEnhancement.searchAllPlatforms()">
              🚀 Search All Platforms (4 tabs)
            </button>
            <button class="action-btn" onclick="window.uiEnhancement.searchGeriatricFocused()">
              👴 Geriatric Search (3 tabs)
            </button>
            <button class="action-btn" onclick="window.uiEnhancement.testMultipleTabsSimple()">
              🧪 Test Multiple Tabs
            </button>
          </div>
          
          <h4>🎯 Quick Geriatric Topics:</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin: 15px 0;">
            ${['Delirium', 'Falls', 'Frailty', 'Polypharmacy', 'Dementia', 'Heart Failure'].map(topic => 
              `<button class="action-btn" style="padding: 8px; font-size: 12px;" 
                       onclick="window.uiEnhancement.searchTopic('${topic}')">${topic}</button>`
            ).join('')}
          </div>
          
          <h4>🏥 Clalit Medical Databases (Portium Access):</h4>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h5>🔐 How to Login:</h5>
            <p><strong>Username:</strong> Your Teudat Zehut (9 digits) - e.g., 123456789</p>
            <p><strong>Password:</strong> Same as your Clalit Ofek/medical systems password</p>
            <p><strong>Session:</strong> Once logged in, stays active 2-4 hours across all databases</p>
          </div>
          
          <div class="button-row" style="flex-wrap: wrap;">
            <button class="action-btn" onclick="window.open('https://www-uptodate-com.clalit.portium.org', '_blank')" style="background: #0066cc;">
              📚 UpToDate (Clalit)
            </button>
            <button class="action-btn" onclick="window.open('https://pubmed-ncbi-nlm-nih-gov.clalit.portium.org', '_blank')" style="background: #2E7D32;">
              🔬 PubMed (Full Text)
            </button>
            <button class="action-btn" onclick="window.open('https://www-clinicalkey-com.clalit.portium.org', '_blank')" style="background: #4169E1;">
              🔑 ClinicalKey
            </button>
            <button class="action-btn" onclick="window.open('https://www-micromedexsolutions-com.clalit.portium.org', '_blank')" style="background: #8E24AA;">
              💊 Micromedex (Drug Interactions)
            </button>
            <button class="action-btn" onclick="window.open('https://www-tripdatabase-com.clalit.portium.org', '_blank')" style="background: #00796B;">
              🎯 TRIP Database (Evidence)
            </button>
            <button class="action-btn" onclick="window.open('https://www-jwatch-org.clalit.portium.org', '_blank')" style="background: #D32F2F;">
              📰 NEJM Journal Watch
            </button>
            <button class="action-btn" onclick="window.open('https://accessmedicine-mhmedical-com.clalit.portium.org', '_blank')" style="background: #FF6B35;">
              🏥 AccessMedicine
            </button>
            <button class="action-btn" onclick="window.open('https://scholar-google-co-il.clalit.portium.org', '_blank')" style="background: #1976D2;">
              🎓 Google Scholar (IL)
            </button>
          </div>
          
          <h4>🚀 Quick Actions:</h4>
          <div class="button-row">
            <button class="action-btn" onclick="window.uiEnhancement.openClalitDrugSearch()" style="background: #8E24AA;">
              💊 Drug Search (Micromedex + UpToDate)
            </button>
            <button class="action-btn" onclick="window.uiEnhancement.openClalitEvidenceSearch()" style="background: #00796B;">
              📊 Evidence Search (TRIP + PubMed)
            </button>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>🔖 Bookmarklets (Drag to Bookmark Bar):</h4>
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Drag these links to your bookmark bar for one-click access from any page:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <a href="javascript:(function(){const q=prompt('🔍 Medical topic:');if(q){['www-uptodate-com.clalit.portium.org/contents/search?search=','pubmed-ncbi-nlm-nih-gov.clalit.portium.org/?otool=iilclalib&term=','www-clinicalkey-com.clalit.portium.org/#!/search/','www-tripdatabase-com.clalit.portium.org/search?q='].forEach(u=>window.open('https://'+u+encodeURIComponent(q),'_blank'))}})();" 
                 style="background: #007bff; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 12px;">
                📚 Search All (Clalit)
              </a>
              <a href="javascript:(function(){const d=prompt('💊 Drug name:');if(d){window.open('https://www-micromedexsolutions-com.clalit.portium.org/micromedx2/librarian?drug='+encodeURIComponent(d),'_blank');window.open('https://www-uptodate-com.clalit.portium.org/contents/search?search='+encodeURIComponent(d+' elderly geriatric'),'_blank')}})();" 
                 style="background: #8E24AA; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 12px;">
                💊 Drug Check (Clalit)
              </a>
            </div>
          </div>
          
          <div style="background: #f8f9fa; padding: 10px; border-radius: 8px; font-size: 13px;">
            <strong>💡 Pro Tips:</strong><br>
            • Use your hospital's institutional access to login<br>
            • Keyboard shortcuts: Ctrl+Shift+U (UpToDate), Ctrl+Shift+N (NEJM)<br>
            • Mobile: Apps will open if installed, otherwise web browser
          </div>
        </div>
      `);
      
      // Focus on search input after modal appears
      setTimeout(() => {
        const searchInput = document.getElementById('quick-medical-search');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  }

  // Quick search methods for the Medical Hub
  searchAllPlatforms() {
    const query = document.getElementById('quick-medical-search')?.value.trim();
    if (!query) {
      alert('Please enter a search term');
      return;
    }
    
    console.log('🚀 Searching all platforms for:', query);
    
    const platforms = [
      'https://www-uptodate-com.clalit.portium.org/contents/search?search=',
      'https://pubmed-ncbi-nlm-nih-gov.clalit.portium.org/?otool=iilclalib&term=',
      'https://www-clinicalkey-com.clalit.portium.org/#!/search/',
      'https://www-tripdatabase-com.clalit.portium.org/search?q='
    ];
    
    // Add delay between opening tabs to prevent popup blocker
    platforms.forEach((url, index) => {
      setTimeout(() => {
        console.log('Opening:', url + encodeURIComponent(query));
        window.open(url + encodeURIComponent(query), '_blank');
      }, index * 300); // 300ms delay between each tab
    });
    
    this.closeModal();
  }

  searchGeriatricFocused() {
    const query = document.getElementById('quick-medical-search')?.value.trim();
    if (!query) {
      alert('Please enter a search term');
      return;
    }
    
    const geriatricQuery = query + ' elderly geriatric';
    const platforms = [
      'https://www-uptodate-com.clalit.portium.org/contents/search?search=',
      'https://pubmed-ncbi-nlm-nih-gov.clalit.portium.org/?otool=iilclalib&term=',
      'https://www-tripdatabase-com.clalit.portium.org/search?q='
    ];
    
    platforms.forEach(url => {
      window.open(url + encodeURIComponent(geriatricQuery), '_blank');
    });
    
    this.closeModal();
  }

  searchTopic(topic) {
    const topicQueries = {
      'Delirium': 'delirium elderly assessment prevention',
      'Falls': 'falls elderly prevention assessment risk factors',
      'Frailty': 'frailty syndrome elderly assessment',
      'Polypharmacy': 'polypharmacy elderly medication review beers criteria',
      'Dementia': 'dementia elderly alzheimer cognitive assessment',
      'Heart Failure': 'heart failure elderly diastolic dysfunction'
    };
    
    const query = topicQueries[topic] || topic + ' elderly';
    
    window.open('https://www-uptodate-com.clalit.portium.org/contents/search?search=' + encodeURIComponent(query), '_blank');
    window.open('https://pubmed-ncbi-nlm-nih-gov.clalit.portium.org/?otool=iilclalib&term=' + encodeURIComponent(query), '_blank');
    
    this.closeModal();
  }

  // Clalit-specific search methods
  openClalitDrugSearch() {
    const drug = prompt('💊 Enter medication name:');
    if (!drug) return;
    
    // Open Micromedex for interactions
    window.open('https://www-micromedexsolutions-com.clalit.portium.org/micromedx2/librarian?drug=' + encodeURIComponent(drug), '_blank');
    
    // Open UpToDate with elderly focus
    window.open('https://www-uptodate-com.clalit.portium.org/contents/search?search=' + encodeURIComponent(drug + ' elderly geriatric'), '_blank');
  }

  openClalitEvidenceSearch() {
    const topic = prompt('📊 Enter topic for evidence search:');
    if (!topic) return;
    
    // Open TRIP Database for evidence pyramid
    window.open('https://www-tripdatabase-com.clalit.portium.org/search?q=' + encodeURIComponent(topic), '_blank');
    
    // Open PubMed with institutional access
    window.open('https://pubmed-ncbi-nlm-nih-gov.clalit.portium.org/?otool=iilclalib&term=' + encodeURIComponent(topic), '_blank');
  }

  // Test function to check popup blocking
  testMultipleTabsSimple() {
    const testUrls = [
      'https://www-uptodate-com.clalit.portium.org/contents/search?search=test',
      'https://pubmed-ncbi-nlm-nih-gov.clalit.portium.org/?otool=iilclalib&term=test',
      'https://www-clinicalkey-com.clalit.portium.org/'
    ];

    console.log('🧪 Testing multiple tabs...');
    
    // Method 1: Immediate opening
    testUrls.forEach((url, index) => {
      console.log(`Opening tab ${index + 1}:`, url);
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        console.warn(`Tab ${index + 1} was blocked by popup blocker`);
        alert(`Popup blocker detected! Please allow popups for this site.\n\nTo fix:\n1. Click the popup blocker icon in your browser\n2. Select "Always allow popups from this site"\n3. Try again`);
        return;
      }
    });
    
    this.closeModal();
  }

  // Alternative single-click method for popup-blocked browsers
  openPlatformsOneByOne() {
    const query = document.getElementById('quick-medical-search')?.value.trim() || 'delirium elderly';
    
    const platforms = [
      { name: 'UpToDate', url: `https://www-uptodate-com.clalit.portium.org/contents/search?search=${encodeURIComponent(query)}` },
      { name: 'PubMed', url: `https://pubmed-ncbi-nlm-nih-gov.clalit.portium.org/?otool=iilclalib&term=${encodeURIComponent(query)}` },
      { name: 'ClinicalKey', url: `https://www-clinicalkey-com.clalit.portium.org/#!/search/${encodeURIComponent(query)}` },
      { name: 'TRIP Database', url: `https://www-tripdatabase-com.clalit.portium.org/search?q=${encodeURIComponent(query)}` }
    ];

    let currentIndex = 0;
    
    const openNext = () => {
      if (currentIndex < platforms.length) {
        const platform = platforms[currentIndex];
        console.log(`Opening ${platform.name}...`);
        window.open(platform.url, '_blank');
        currentIndex++;
        
        if (currentIndex < platforms.length) {
          setTimeout(openNext, 500); // Wait 500ms between each tab
        }
      }
    };
    
    openNext();
    this.closeModal();
  }

  // Personal Knowledge Manager Integration
  showPersonalKnowledge() {
    if (window.personalKnowledge && typeof window.personalKnowledge.showKnowledgeManager === 'function') {
      window.personalKnowledge.showKnowledgeManager();
    } else {
      this.showModal('📝 Personal Knowledge Manager', `
        <div class="card-container">
          <h3>📝 Personal Medical Notes System</h3>
          <p>The Personal Knowledge Manager is loading...</p>
          <p>This feature provides:</p>
          <ul style="text-align: left; margin: 10px 20px;">
            <li>✅ Personal note-taking with categories</li>
            <li>✅ Quiz generation from your notes</li>
            <li>✅ Spaced repetition learning system</li>
            <li>✅ Import from medical databases</li>
            <li>✅ Export capabilities</li>
          </ul>
          <p>Please wait for all scripts to load, then try again.</p>
        </div>
      `);
    }
  }

  // Open Access Integrator
  showOpenAccess() {
    if (window.openAccess && typeof window.openAccess.showOpenAccessIntegrator === 'function') {
      window.openAccess.showOpenAccessIntegrator();
    } else {
      this.showModal('🔓 Open Access Medical Literature', `
        <div class="card-container">
          <h3>🔓 Free Medical Literature Access</h3>
          <p>The Open Access Integrator is loading...</p>
          <p>This feature provides:</p>
          <ul style="text-align: left; margin: 10px 20px;">
            <li>✅ PubMed Central full-text search</li>
            <li>✅ Directory of Open Access Journals (DOAJ)</li>
            <li>✅ WHO, CDC, and NIH guidelines</li>
            <li>✅ Cochrane Library open access</li>
            <li>✅ Save articles for reference</li>
            <li>✅ Citation generation</li>
          </ul>
          <p>Please wait for all scripts to load, then try again.</p>
        </div>
      `);
    }
  }

  // Advanced Clinical Calculators
  showCalculators() {
    if (window.clinicalCalc && typeof window.clinicalCalc.showCalculators === 'function') {
      window.clinicalCalc.showCalculators();
    } else {
      this.showModal('🧮 Advanced Clinical Calculators', `
        <div class="card-container">
          <h3>🧮 Comprehensive Geriatric Assessment Tools</h3>
          <p>The Advanced Clinical Calculators are loading...</p>
          <p>This feature provides:</p>
          <ul style="text-align: left; margin: 10px 20px;">
            <li>✅ CHA2DS2-VASc stroke risk calculator</li>
            <li>✅ HAS-BLED bleeding risk assessment</li>
            <li>✅ FRAIL scale frailty evaluation</li>
            <li>✅ Charlson Comorbidity Index</li>
            <li>✅ Morse Fall Scale</li>
            <li>✅ STOPP/START medication criteria</li>
            <li>✅ Hebrew-English drug translation</li>
            <li>✅ Israeli healthcare context</li>
          </ul>
          <p>Please wait for all scripts to load, then try again.</p>
        </div>
      `);
    }
  }

  // Advanced Quiz System
  showAdvancedQuiz() {
    if (window.advancedQuiz && typeof window.advancedQuiz.showQuizSystem === 'function') {
      window.advancedQuiz.showQuizSystem();
    } else {
      this.showModal('🎓 Advanced Quiz System', `
        <div class="card-container">
          <h3>🎓 Hebrew-English Medical Education</h3>
          <p>The Advanced Quiz System is loading...</p>
          <p>This feature provides:</p>
          <ul style="text-align: left; margin: 10px 20px;">
            <li>✅ Bilingual Hebrew-English questions</li>
            <li>✅ Israeli healthcare context integration</li>
            <li>✅ Multiple difficulty levels</li>
            <li>✅ Topic-specific question banks</li>
            <li>✅ Hebrew medication recognition</li>
            <li>✅ Clinical calculation questions</li>
            <li>✅ Performance tracking & statistics</li>
            <li>✅ Spaced repetition recommendations</li>
          </ul>
          <p>Please wait for all scripts to load, then try again.</p>
        </div>
      `);
    }
  }
}

// Initialize UI Enhancement
window.uiEnhancement = new UIEnhancement();

console.log(`
✨ UI Enhancement Loaded!

📱 Mobile & Desktop Friendly Interface
🖱️ Click the floating button (📚) in bottom-right corner
⚡ Or use the Quick Bar toggle in top-right

⌨️ Keyboard Shortcuts:
Alt+S - Study Card
Alt+P - Pimp Question  
Alt+D - Drug Lookup
Alt+C - Start Case
Alt+R - Latest Research
Esc - Close modal

No console commands needed anymore! 🎉
`);