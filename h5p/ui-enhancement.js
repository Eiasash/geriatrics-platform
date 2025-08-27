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
      setTimeout(() => this.createUI(), 1000); // Give other scripts time to load
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
          <div class="fab-submenu-item" onclick="window.uiEnhancement.checkInteractions()">Check Interactions</div>
          <div class="fab-submenu-item" onclick="window.uiEnhancement.renalDosing()">Renal Dosing</div>
        </div>
        
        <!-- Research -->
        <div class="fab-item" onclick="window.uiEnhancement.toggleSubmenu('research')">
          <span class="fab-icon">📖</span>
          <span>Research</span>
        </div>
        <div class="fab-submenu" id="research-submenu">
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
      this.showModal('Error', 'Fellowship module not loaded.');
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
    if (!window.Fellowship || !window.Fellowship.caseSimulator) {
      this.showModal('Error', 'Case simulator not available.');
      return;
    }
    
    const caseData = window.Fellowship.caseSimulator.startCase();
    this.currentCase = caseData;
    this.currentQuestion = 0;
    this.showCaseQuestion();
  }

  showCaseQuestion() {
    const caseData = this.currentCase;
    const question = caseData.questions[this.currentQuestion];
    
    const content = `
      <div class="card-container">
        <p><strong>Case:</strong> ${caseData.presentation}</p>
      </div>
      
      <div class="card-container">
        <p><strong>${question.prompt}</strong></p>
        ${question.options.map((opt, i) => `
          <div class="result-item" onclick="window.uiEnhancement.submitCaseAnswer(${i})">
            ${opt}
          </div>
        `).join('')}
      </div>
    `;
    
    this.showModal('Case Simulator', content);
  }

  submitCaseAnswer(answerIndex) {
    const result = window.Fellowship.caseSimulator.submitAnswer(this.currentQuestion, answerIndex);
    
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
      <input type="text" class="search-input" placeholder="Enter drug name (e.g., metoprolol)" 
             id="drug-search" onkeyup="window.uiEnhancement.performDrugSearch()">
      <div id="drug-results"></div>
    `;
    this.showModal('Drug Lookup', content);
  }

  performDrugSearch() {
    const drugName = document.getElementById('drug-search').value;
    if (!drugName || !window.GeriatricsKnowledge) return;
    
    const drugInfo = window.GeriatricsKnowledge.getDrugInfo(drugName);
    const resultsDiv = document.getElementById('drug-results');
    
    if (!drugInfo.error) {
      resultsDiv.innerHTML = `
        <div class="card-container">
          <p><strong>Class:</strong> ${drugInfo.class}</p>
          <p><strong>Geriatric Considerations:</strong> ${drugInfo.geriatricConsiderations}</p>
          <p><strong>Start Dose:</strong> ${drugInfo.startDose}</p>
          <p><strong>Max Dose:</strong> ${drugInfo.maxDose}</p>
          ${drugInfo.beersCriteria ? `<p>⚠️ <strong>Beers Criteria:</strong> ${drugInfo.beersCriteria}</p>` : ''}
          ${drugInfo.stoppFlag ? `<p>⚠️ <strong>STOPP Flag:</strong> ${drugInfo.stoppFlag}</p>` : ''}
          <p><strong>Renal Dosing:</strong> ${drugInfo.renalDosing}</p>
          <p><strong>Interactions:</strong> ${drugInfo.interactions.join(', ')}</p>
        </div>
      `;
    } else {
      resultsDiv.innerHTML = '<p>Drug not found. Try: metoprolol, lisinopril, furosemide, warfarin, sertraline</p>';
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
    if (!meds.length || !window.GeriatricsKnowledge) return;
    
    const interactions = window.GeriatricsKnowledge.checkDrugInteractions(meds);
    const resultsDiv = document.getElementById('interaction-results');
    
    if (interactions.length > 0) {
      resultsDiv.innerHTML = `
        <div class="card-container">
          <h4>⚠️ Interactions Found:</h4>
          ${interactions.map(int => `
            <p><strong>${int.drugs.join(' + ')}:</strong> ${int.action}</p>
          `).join('')}
        </div>
      `;
    } else {
      resultsDiv.innerHTML = '<p>✅ No significant interactions detected</p>';
    }
  }

  renalDosing() {
    if (!window.Fellowship) {
      this.showModal('Error', 'Reference not available.');
      return;
    }
    
    const dosing = window.Fellowship.quickRefs.renalDosing;
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
    if (!window.Fellowship) {
      this.showModal('Error', 'Calculator not available.');
      return;
    }
    
    const conversions = window.Fellowship.quickRefs.opioidConversion.conversions;
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