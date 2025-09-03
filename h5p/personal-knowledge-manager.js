// personal-knowledge-manager.js
// Personal Medical Knowledge Management System
// Create, organize, and study from your own notes

class PersonalKnowledgeManager {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('personal_medical_notes') || '[]');
    this.tags = new Set();
    this.sources = new Set();
    this.studyProgress = JSON.parse(localStorage.getItem('study_progress') || '{}');
    this.init();
  }

  init() {
    this.loadExistingData();
    this.createKnowledgeUI();
    console.log('📚 Personal Knowledge Manager initialized');
  }

  loadExistingData() {
    // Load tags and sources from existing notes
    this.notes.forEach(note => {
      note.tags.forEach(tag => this.tags.add(tag));
      if (note.source) this.sources.add(note.source);
    });
  }

  createKnowledgeUI() {
    const uiHTML = `
      <div class="knowledge-manager-container" style="display:none;">
        <div class="knowledge-header">
          <h2>📚 Personal Medical Knowledge Base</h2>
          <p>Create, organize, and study from your own medical notes</p>
        </div>

        <div class="knowledge-tabs">
          <button class="tab-btn active" onclick="window.personalKnowledge.showTab('create')">
            ➕ Create Note
          </button>
          <button class="tab-btn" onclick="window.personalKnowledge.showTab('browse')">
            📖 Browse Notes
          </button>
          <button class="tab-btn" onclick="window.personalKnowledge.showTab('quiz')">
            🎯 Generate Quiz
          </button>
          <button class="tab-btn" onclick="window.personalKnowledge.showTab('stats')">
            📊 Statistics
          </button>
        </div>

        <!-- Create Note Tab -->
        <div id="create-tab" class="tab-content active">
          <div class="note-creator">
            <div class="form-group">
              <label>📝 Title:</label>
              <input type="text" id="note-title" placeholder="e.g., Falls Prevention in Elderly" class="form-input">
            </div>

            <div class="form-group">
              <label>📂 Category:</label>
              <select id="note-category" class="form-input">
                <option value="assessment">Clinical Assessment</option>
                <option value="medications">Medications & Polypharmacy</option>
                <option value="cognitive">Cognitive & Mental Health</option>
                <option value="functional">Functional Status</option>
                <option value="syndromes">Geriatric Syndromes</option>
                <option value="end-of-life">End-of-Life Care</option>
                <option value="preventive">Preventive Care</option>
                <option value="case-study">Case Study</option>
                <option value="guidelines">Guidelines & Protocols</option>
                <option value="pearls">Clinical Pearls</option>
              </select>
            </div>

            <div class="form-group">
              <label>🏷️ Tags (comma-separated):</label>
              <input type="text" id="note-tags" placeholder="falls, prevention, mobility, safety" class="form-input">
              <div class="popular-tags">
                <span>Popular tags:</span>
                ${Array.from(this.tags).slice(0, 8).map(tag => 
                  `<span class="tag-suggestion" onclick="window.personalKnowledge.addTag('${tag}')">${tag}</span>`
                ).join('')}
              </div>
            </div>

            <div class="form-group">
              <label>📖 Content:</label>
              <textarea id="note-content" rows="10" class="form-input" 
                        placeholder="Enter your medical notes, key points, clinical observations...

Examples:
• Clinical Pearl: Always check orthostatic vitals in elderly patients with dizziness
• Guideline: Beers Criteria recommends avoiding anticholinergics in patients >65
• Case Learning: 85yo F with polypharmacy - reduced medications from 12 to 8, improved cognition
• Assessment Tool: Use Morse Fall Scale score >25 indicates high fall risk"></textarea>
            </div>

            <div class="form-group">
              <label>📚 Source (optional):</label>
              <input type="text" id="note-source" placeholder="e.g., Grand Rounds 8/27/24, Dr. Cohen lecture, Personal observation" class="form-input">
            </div>

            <div class="form-group">
              <label>⭐ Importance Level:</label>
              <select id="note-importance" class="form-input">
                <option value="high">🔴 High - Critical for practice</option>
                <option value="medium">🟡 Medium - Important to know</option>
                <option value="low">🟢 Low - Good to know</option>
              </select>
            </div>

            <div class="form-actions">
              <button class="action-btn primary" onclick="window.personalKnowledge.saveNote()">
                💾 Save Note
              </button>
              <button class="action-btn" onclick="window.personalKnowledge.saveAndCreateQuiz()">
                💾➕ Save & Create Quiz
              </button>
              <button class="action-btn secondary" onclick="window.personalKnowledge.clearForm()">
                🗑️ Clear
              </button>
            </div>
          </div>
        </div>

        <!-- Browse Notes Tab -->
        <div id="browse-tab" class="tab-content">
          <div class="browse-controls">
            <div class="search-filters">
              <input type="text" id="notes-search" placeholder="🔍 Search notes..." class="form-input">
              <select id="category-filter" class="form-input">
                <option value="">All Categories</option>
                <option value="assessment">Clinical Assessment</option>
                <option value="medications">Medications</option>
                <option value="cognitive">Cognitive</option>
                <option value="functional">Functional</option>
                <option value="syndromes">Syndromes</option>
                <option value="end-of-life">End-of-Life</option>
                <option value="preventive">Preventive</option>
                <option value="case-study">Case Studies</option>
                <option value="guidelines">Guidelines</option>
                <option value="pearls">Clinical Pearls</option>
              </select>
              <select id="importance-filter" class="form-input">
                <option value="">All Importance</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
          
          <div id="notes-list" class="notes-container">
            <!-- Notes will be populated here -->
          </div>
        </div>

        <!-- Quiz Tab -->
        <div id="quiz-tab" class="tab-content">
          <div class="quiz-generator">
            <h3>🎯 Generate Quiz from Your Notes</h3>
            
            <div class="quiz-options">
              <div class="form-group">
                <label>📊 Number of Questions:</label>
                <select id="quiz-count" class="form-input">
                  <option value="5">5 questions</option>
                  <option value="10" selected>10 questions</option>
                  <option value="15">15 questions</option>
                  <option value="20">20 questions</option>
                </select>
              </div>

              <div class="form-group">
                <label>📂 Categories to Include:</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" value="assessment" checked> Clinical Assessment</label>
                  <label><input type="checkbox" value="medications" checked> Medications</label>
                  <label><input type="checkbox" value="cognitive" checked> Cognitive</label>
                  <label><input type="checkbox" value="functional" checked> Functional</label>
                  <label><input type="checkbox" value="syndromes" checked> Syndromes</label>
                  <label><input type="checkbox" value="pearls" checked> Clinical Pearls</label>
                </div>
              </div>

              <div class="form-group">
                <label>⭐ Include Notes of Importance:</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" value="high" checked> High Priority</label>
                  <label><input type="checkbox" value="medium" checked> Medium Priority</label>
                  <label><input type="checkbox" value="low"> Low Priority</label>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button class="action-btn primary" onclick="window.personalKnowledge.generateQuiz()">
                🎯 Generate Quiz
              </button>
              <button class="action-btn" onclick="window.personalKnowledge.generateSpacedRepetition()">
                🔄 Spaced Repetition Quiz
              </button>
            </div>

            <div id="generated-quiz" class="quiz-results">
              <!-- Generated quiz will appear here -->
            </div>
          </div>
        </div>

        <!-- Statistics Tab -->
        <div id="stats-tab" class="tab-content">
          <div class="stats-dashboard">
            <h3>📊 Your Learning Statistics</h3>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number" id="total-notes">0</div>
                <div class="stat-label">Total Notes</div>
              </div>
              <div class="stat-card">
                <div class="stat-number" id="categories-count">0</div>
                <div class="stat-label">Categories</div>
              </div>
              <div class="stat-card">
                <div class="stat-number" id="quiz-taken">0</div>
                <div class="stat-label">Quizzes Taken</div>
              </div>
              <div class="stat-card">
                <div class="stat-number" id="avg-score">0%</div>
                <div class="stat-label">Average Score</div>
              </div>
            </div>

            <div class="category-breakdown">
              <h4>📂 Notes by Category</h4>
              <div id="category-chart"></div>
            </div>

            <div class="recent-activity">
              <h4>📅 Recent Activity</h4>
              <div id="activity-log"></div>
            </div>

            <div class="export-options">
              <h4>💾 Export Options</h4>
              <div class="form-actions">
                <button class="action-btn" onclick="window.personalKnowledge.exportNotes('json')">
                  📄 Export as JSON
                </button>
                <button class="action-btn" onclick="window.personalKnowledge.exportNotes('csv')">
                  📊 Export as CSV
                </button>
                <button class="action-btn" onclick="window.personalKnowledge.exportQuizBank()">
                  🎯 Export Quiz Bank
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>
          .knowledge-manager-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .knowledge-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
          }

          .knowledge-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 2px solid #e1e5e9;
            padding-bottom: 10px;
          }

          .tab-btn {
            padding: 10px 20px;
            border: none;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
          }

          .tab-btn.active {
            background: #667eea;
            color: white;
          }

          .tab-content {
            display: none;
          }

          .tab-content.active {
            display: block;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
          }

          .form-input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
          }

          .form-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
          }

          .popular-tags {
            margin-top: 5px;
            font-size: 12px;
          }

          .tag-suggestion {
            display: inline-block;
            background: #e9ecef;
            padding: 2px 6px;
            margin: 2px;
            border-radius: 3px;
            cursor: pointer;
            transition: background 0.2s;
          }

          .tag-suggestion:hover {
            background: #667eea;
            color: white;
          }

          .form-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .action-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
          }

          .action-btn.primary {
            background: #28a745;
            color: white;
          }

          .action-btn.secondary {
            background: #6c757d;
            color: white;
          }

          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }

          .search-filters {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .notes-container {
            max-height: 600px;
            overflow-y: auto;
          }

          .note-item {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .note-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
          }

          .note-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }

          .note-meta {
            font-size: 12px;
            color: #666;
            display: flex;
            gap: 15px;
          }

          .note-content {
            margin: 10px 0;
            line-height: 1.5;
          }

          .note-tags {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            margin-top: 10px;
          }

          .note-tag {
            background: #e9ecef;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            color: #495057;
          }

          .importance-high { border-left: 4px solid #dc3545; }
          .importance-medium { border-left: 4px solid #ffc107; }
          .importance-low { border-left: 4px solid #28a745; }

          .checkbox-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 10px;
          }

          .checkbox-group label {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: normal;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }

          .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
          }

          .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
          }

          .stat-label {
            color: #666;
            margin-top: 5px;
          }

          @media (max-width: 768px) {
            .knowledge-tabs {
              overflow-x: auto;
            }
            
            .search-filters {
              flex-direction: column;
            }
            
            .form-actions {
              flex-direction: column;
            }
          }
        </style>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', uiHTML);
  }

  showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`[onclick*="showTab('${tabName}')"]`).classList.add('active');

    // Load tab-specific content
    if (tabName === 'browse') {
      this.renderNotesList();
    } else if (tabName === 'stats') {
      this.updateStatistics();
    }
  }

  addTag(tag) {
    const tagsInput = document.getElementById('note-tags');
    const currentTags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t);
    if (!currentTags.includes(tag)) {
      currentTags.push(tag);
      tagsInput.value = currentTags.join(', ');
    }
  }

  saveNote() {
    const noteData = {
      id: Date.now(),
      title: document.getElementById('note-title').value,
      category: document.getElementById('note-category').value,
      content: document.getElementById('note-content').value,
      tags: document.getElementById('note-tags').value.split(',').map(t => t.trim()).filter(t => t),
      source: document.getElementById('note-source').value,
      importance: document.getElementById('note-importance').value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      quizGenerated: false
    };

    // Validation
    if (!noteData.title || !noteData.content) {
      alert('Please fill in both title and content');
      return;
    }

    this.notes.push(noteData);
    this.saveToStorage();
    
    // Update tags set
    noteData.tags.forEach(tag => this.tags.add(tag));
    if (noteData.source) this.sources.add(noteData.source);

    // Show success message
    this.showNotification('✅ Note saved successfully!', 'success');
    
    // Clear form
    this.clearForm();

    // Update stats if on stats tab
    if (document.getElementById('stats-tab').classList.contains('active')) {
      this.updateStatistics();
    }
  }

  saveAndCreateQuiz() {
    this.saveNote();
    
    // Get the last saved note
    const latestNote = this.notes[this.notes.length - 1];
    if (latestNote) {
      this.generateQuizFromNote(latestNote);
      this.showTab('quiz');
    }
  }

  clearForm() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-tags').value = '';
    document.getElementById('note-source').value = '';
    document.getElementById('note-category').selectedIndex = 0;
    document.getElementById('note-importance').selectedIndex = 0;
  }

  renderNotesList() {
    const searchTerm = document.getElementById('notes-search')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter')?.value || '';
    const importanceFilter = document.getElementById('importance-filter')?.value || '';

    let filteredNotes = this.notes.filter(note => {
      const matchesSearch = !searchTerm || 
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      const matchesCategory = !categoryFilter || note.category === categoryFilter;
      const matchesImportance = !importanceFilter || note.importance === importanceFilter;

      return matchesSearch && matchesCategory && matchesImportance;
    });

    // Sort by creation date (newest first)
    filteredNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const notesContainer = document.getElementById('notes-list');
    if (!notesContainer) return;

    if (filteredNotes.length === 0) {
      notesContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666;">
          <h3>📝 No notes found</h3>
          <p>Start creating your personal medical knowledge base!</p>
          <button class="action-btn primary" onclick="window.personalKnowledge.showTab('create')">
            ➕ Create Your First Note
          </button>
        </div>
      `;
      return;
    }

    const notesHTML = filteredNotes.map(note => `
      <div class="note-item importance-${note.importance}">
        <div class="note-header">
          <div>
            <div class="note-title">${note.title}</div>
            <div class="note-meta">
              <span>📂 ${this.getCategoryLabel(note.category)}</span>
              <span>📅 ${new Date(note.createdAt).toLocaleDateString()}</span>
              <span>👁️ ${note.viewCount} views</span>
              ${note.source ? `<span>📚 ${note.source}</span>` : ''}
            </div>
          </div>
          <div class="note-actions">
            <button class="action-btn" onclick="window.personalKnowledge.viewNote('${note.id}')" style="padding: 5px 10px; font-size: 12px;">
              👁️ View
            </button>
            <button class="action-btn" onclick="window.personalKnowledge.editNote('${note.id}')" style="padding: 5px 10px; font-size: 12px;">
              ✏️ Edit
            </button>
            <button class="action-btn" onclick="window.personalKnowledge.generateQuizFromNote(${JSON.stringify(note).replace(/"/g, '&quot;')})" style="padding: 5px 10px; font-size: 12px;">
              🎯 Quiz
            </button>
          </div>
        </div>
        
        <div class="note-content">
          ${note.content.length > 200 ? note.content.substring(0, 200) + '...' : note.content}
        </div>
        
        <div class="note-tags">
          ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');

    notesContainer.innerHTML = notesHTML;

    // Add search and filter event listeners if not already added
    const searchInput = document.getElementById('notes-search');
    const categorySelect = document.getElementById('category-filter');
    const importanceSelect = document.getElementById('importance-filter');

    if (searchInput && !searchInput.hasAttribute('data-listener')) {
      searchInput.addEventListener('input', () => this.renderNotesList());
      searchInput.setAttribute('data-listener', 'true');
    }
    if (categorySelect && !categorySelect.hasAttribute('data-listener')) {
      categorySelect.addEventListener('change', () => this.renderNotesList());
      categorySelect.setAttribute('data-listener', 'true');
    }
    if (importanceSelect && !importanceSelect.hasAttribute('data-listener')) {
      importanceSelect.addEventListener('change', () => this.renderNotesList());
      importanceSelect.setAttribute('data-listener', 'true');
    }
  }

  getCategoryLabel(category) {
    const labels = {
      'assessment': 'Clinical Assessment',
      'medications': 'Medications',
      'cognitive': 'Cognitive',
      'functional': 'Functional',
      'syndromes': 'Syndromes',
      'end-of-life': 'End-of-Life',
      'preventive': 'Preventive',
      'case-study': 'Case Studies',
      'guidelines': 'Guidelines',
      'pearls': 'Clinical Pearls'
    };
    return labels[category] || category;
  }

  viewNote(noteId) {
    const note = this.notes.find(n => n.id == noteId);
    if (!note) return;

    // Increment view count
    note.viewCount++;
    this.saveToStorage();

    // Show note in modal
    if (window.uiEnhancement) {
      const content = `
        <div class="note-viewer">
          <div class="note-header">
            <h2>${note.title}</h2>
            <div class="note-meta">
              <span>📂 ${this.getCategoryLabel(note.category)}</span>
              <span>📅 ${new Date(note.createdAt).toLocaleDateString()}</span>
              <span>⭐ ${note.importance.toUpperCase()}</span>
              ${note.source ? `<span>📚 ${note.source}</span>` : ''}
            </div>
          </div>
          
          <div class="note-content" style="margin: 20px 0; line-height: 1.6; white-space: pre-wrap;">
            ${note.content}
          </div>
          
          <div class="note-tags">
            ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
          </div>
          
          <div class="note-actions" style="margin-top: 20px;">
            <button class="action-btn" onclick="window.personalKnowledge.editNote('${note.id}'); window.uiEnhancement.closeModal();">
              ✏️ Edit Note
            </button>
            <button class="action-btn" onclick="window.personalKnowledge.generateQuizFromNote(${JSON.stringify(note).replace(/"/g, '&quot;')}); window.uiEnhancement.closeModal();">
              🎯 Generate Quiz
            </button>
            <button class="action-btn secondary" onclick="window.personalKnowledge.deleteNote('${note.id}'); window.uiEnhancement.closeModal();">
              🗑️ Delete
            </button>
          </div>
        </div>
      `;
      
      window.uiEnhancement.showModal(note.title, content);
    }
  }

  editNote(noteId) {
    const note = this.notes.find(n => n.id == noteId);
    if (!note) return;

    // Switch to create tab and populate form
    this.showTab('create');
    
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-category').value = note.category;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-tags').value = note.tags.join(', ');
    document.getElementById('note-source').value = note.source || '';
    document.getElementById('note-importance').value = note.importance;

    // Store the ID for updating instead of creating new
    document.getElementById('note-title').setAttribute('data-editing-id', noteId);
  }

  deleteNote(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notes = this.notes.filter(n => n.id != noteId);
      this.saveToStorage();
      this.renderNotesList();
      this.showNotification('🗑️ Note deleted', 'info');
    }
  }

  generateQuiz() {
    const count = parseInt(document.getElementById('quiz-count').value);
    const selectedCategories = Array.from(document.querySelectorAll('#quiz-tab .checkbox-group input[type="checkbox"]:checked'))
      .filter(cb => cb.closest('.form-group').textContent.includes('Categories'))
      .map(cb => cb.value);
    const selectedImportance = Array.from(document.querySelectorAll('#quiz-tab .checkbox-group input[type="checkbox"]:checked'))
      .filter(cb => cb.closest('.form-group').textContent.includes('Importance'))
      .map(cb => cb.value);

    // Filter notes based on selections
    let eligibleNotes = this.notes.filter(note => 
      selectedCategories.includes(note.category) && 
      selectedImportance.includes(note.importance)
    );

    if (eligibleNotes.length === 0) {
      this.showNotification('❌ No notes match your quiz criteria', 'error');
      return;
    }

    // Generate quiz questions
    const questions = this.createQuizQuestions(eligibleNotes, count);
    this.displayQuiz(questions);
    
    // Update study progress
    this.updateStudyProgress('quiz_generated', { count, categories: selectedCategories });
  }

  generateSpacedRepetition() {
    // Find notes that need review based on spaced repetition algorithm
    const now = Date.now();
    const spacedNotes = this.notes.filter(note => {
      const lastReview = this.studyProgress[note.id]?.lastReview || 0;
      const interval = this.studyProgress[note.id]?.interval || 1;
      const dueDate = lastReview + (interval * 24 * 60 * 60 * 1000); // interval in days
      return now >= dueDate;
    });

    if (spacedNotes.length === 0) {
      this.showNotification('✅ No notes due for review!', 'success');
      return;
    }

    const questions = this.createQuizQuestions(spacedNotes, Math.min(10, spacedNotes.length));
    this.displayQuiz(questions, true); // true for spaced repetition mode
  }

  createQuizQuestions(notes, count) {
    const questions = [];
    const shuffledNotes = [...notes].sort(() => 0.5 - Math.random()).slice(0, count);

    shuffledNotes.forEach((note, index) => {
      // Create different types of questions based on content
      const questionTypes = this.analyzeNoteForQuestionTypes(note);
      const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

      questions.push({
        id: `q_${note.id}_${index}`,
        noteId: note.id,
        type: selectedType.type,
        question: selectedType.question,
        correctAnswer: selectedType.answer,
        options: selectedType.options || [],
        explanation: selectedType.explanation,
        source: note.title,
        category: note.category,
        difficulty: this.assessDifficulty(note)
      });
    });

    return questions;
  }

  analyzeNoteForQuestionTypes(note) {
    const questions = [];
    const content = note.content;

    // Pattern-based question generation
    const patterns = [
      {
        regex: /(.+) is defined as (.+)\.?/gi,
        type: 'definition',
        generator: (matches) => ({
          type: 'multiple_choice',
          question: `What is ${matches[1]}?`,
          answer: matches[2],
          options: this.generateDistractors(matches[2], 'definition'),
          explanation: `From your note: ${note.title}`
        })
      },
      {
        regex: /first[- ]?line treatment (?:for .+ )?is (.+)\.?/gi,
        type: 'treatment',
        generator: (matches) => ({
          type: 'multiple_choice',
          question: `What is the first-line treatment mentioned in your notes?`,
          answer: matches[1],
          options: this.generateDistractors(matches[1], 'treatment'),
          explanation: `From your note: ${note.title}`
        })
      },
      {
        regex: /(.+) increases risk of (.+)\.?/gi,
        type: 'risk_factor',
        generator: (matches) => ({
          type: 'true_false',
          question: `True or False: ${matches[1]} increases risk of ${matches[2]}`,
          answer: 'True',
          options: ['True', 'False'],
          explanation: `From your note: ${note.title}`
        })
      }
    ];

    // Try each pattern
    patterns.forEach(pattern => {
      const matches = [...content.matchAll(pattern.regex)];
      matches.forEach(match => {
        questions.push(pattern.generator(match));
      });
    });

    // If no patterns match, create a general question
    if (questions.length === 0) {
      questions.push({
        type: 'fill_in_blank',
        question: `Based on your note "${note.title}", what is a key clinical point?`,
        answer: content.split('.')[0] + '.',
        options: [],
        explanation: `From your note: ${note.title}`
      });
    }

    return questions.slice(0, 3); // Max 3 questions per note
  }

  generateDistractors(correctAnswer, type) {
    const distractors = {
      definition: [
        'A chronic inflammatory condition',
        'A reversible cognitive impairment',
        'An acute medical emergency',
        'A normal age-related change'
      ],
      treatment: [
        'Supportive care only',
        'Immediate surgery',
        'Lifestyle modifications',
        'Combination therapy'
      ]
    };

    const baseDistractors = distractors[type] || distractors.definition;
    return [correctAnswer, ...baseDistractors.slice(0, 3)].sort(() => 0.5 - Math.random());
  }

  assessDifficulty(note) {
    let score = 0;
    
    // Factors that increase difficulty
    if (note.content.length > 500) score += 1;
    if (note.tags.includes('advanced')) score += 2;
    if (note.category === 'guidelines') score += 1;
    if (note.importance === 'high') score += 1;
    
    return score <= 1 ? 'easy' : score <= 3 ? 'medium' : 'hard';
  }

  displayQuiz(questions, spacedRepetition = false) {
    const quizContainer = document.getElementById('generated-quiz');
    
    const quizHTML = `
      <div class="quiz-session">
        <div class="quiz-header">
          <h3>🎯 ${spacedRepetition ? 'Spaced Repetition' : 'Generated'} Quiz</h3>
          <p>${questions.length} questions from your personal notes</p>
          ${spacedRepetition ? '<p><em>These notes are due for review based on spaced repetition</em></p>' : ''}
        </div>
        
        <div class="quiz-questions">
          ${questions.map((q, index) => `
            <div class="quiz-question" data-question-id="${q.id}">
              <div class="question-header">
                <span class="question-number">Question ${index + 1}</span>
                <span class="question-category">${this.getCategoryLabel(q.category)}</span>
                <span class="question-difficulty">${q.difficulty}</span>
              </div>
              
              <div class="question-text">
                ${q.question}
              </div>
              
              <div class="question-options">
                ${q.options.map((option, optIndex) => `
                  <label class="option-label">
                    <input type="radio" name="q_${index}" value="${option}">
                    <span>${option}</span>
                  </label>
                `).join('')}
              </div>
              
              <div class="question-explanation" style="display: none;">
                <strong>Explanation:</strong> ${q.explanation}
                <br><em>Source: ${q.source}</em>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="quiz-actions">
          <button class="action-btn primary" onclick="window.personalKnowledge.checkQuizAnswers(${spacedRepetition})">
            📊 Check Answers
          </button>
          <button class="action-btn secondary" onclick="window.personalKnowledge.resetQuiz()">
            🔄 Reset Quiz
          </button>
        </div>
        
        <div id="quiz-results" style="display: none;"></div>
      </div>
    `;
    
    quizContainer.innerHTML = quizHTML;
  }

  checkQuizAnswers(spacedRepetition = false) {
    const questions = document.querySelectorAll('.quiz-question');
    let correct = 0;
    let total = questions.length;
    const results = [];

    questions.forEach((questionEl, index) => {
      const selectedOption = questionEl.querySelector('input[type="radio"]:checked');
      const correctAnswer = questionEl.querySelector('.question-explanation').textContent.includes('True') ? 'True' : 
                          questionEl.querySelectorAll('.option-label')[0].textContent.trim();
      
      const isCorrect = selectedOption && selectedOption.value === correctAnswer;
      if (isCorrect) correct++;

      results.push({
        questionId: questionEl.dataset.questionId,
        correct: isCorrect,
        selectedAnswer: selectedOption ? selectedOption.value : 'No answer',
        correctAnswer: correctAnswer
      });

      // Show explanation
      questionEl.querySelector('.question-explanation').style.display = 'block';
      
      // Color code the question
      questionEl.style.borderLeft = isCorrect ? '4px solid #28a745' : '4px solid #dc3545';
    });

    const percentage = Math.round((correct / total) * 100);
    
    // Display results
    const resultsHTML = `
      <div class="quiz-results-summary">
        <h3>📊 Quiz Results</h3>
        <div class="score-display">
          <div class="score-circle">
            <div class="score-number">${percentage}%</div>
            <div class="score-label">${correct}/${total} correct</div>
          </div>
        </div>
        
        <div class="performance-feedback">
          ${this.getPerformanceFeedback(percentage)}
        </div>
        
        <div class="quiz-actions">
          <button class="action-btn" onclick="window.personalKnowledge.reviewIncorrect()">
            📚 Review Incorrect Answers
          </button>
          <button class="action-btn" onclick="window.personalKnowledge.generateQuiz()">
            🎯 Take Another Quiz
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('quiz-results').innerHTML = resultsHTML;
    document.getElementById('quiz-results').style.display = 'block';

    // Update study progress
    this.updateStudyProgress('quiz_completed', {
      score: percentage,
      correct: correct,
      total: total,
      spacedRepetition: spacedRepetition
    });

    // Update spaced repetition intervals if applicable
    if (spacedRepetition) {
      this.updateSpacedRepetitionProgress(results);
    }
  }

  getPerformanceFeedback(percentage) {
    if (percentage >= 90) {
      return `
        <div class="feedback excellent">
          <h4>🌟 Excellent Work!</h4>
          <p>You have mastered this material. Your personal notes are clearly effective!</p>
        </div>
      `;
    } else if (percentage >= 70) {
      return `
        <div class="feedback good">
          <h4>👍 Good Job!</h4>
          <p>Solid understanding. Review the incorrect answers to strengthen weak areas.</p>
        </div>
      `;
    } else if (percentage >= 50) {
      return `
        <div class="feedback needs-work">
          <h4>📚 Keep Studying!</h4>
          <p>You're on the right track. Focus on reviewing your notes more frequently.</p>
        </div>
      `;
    } else {
      return `
        <div class="feedback needs-improvement">
          <h4>💪 Don't Give Up!</h4>
          <p>Consider breaking down complex topics into smaller, more focused notes.</p>
        </div>
      `;
    }
  }

  updateSpacedRepetitionProgress(results) {
    results.forEach(result => {
      const noteId = result.questionId.split('_')[1];
      if (!this.studyProgress[noteId]) {
        this.studyProgress[noteId] = { interval: 1, easiness: 2.5, repetitions: 0 };
      }

      const progress = this.studyProgress[noteId];
      progress.lastReview = Date.now();

      if (result.correct) {
        progress.repetitions++;
        if (progress.repetitions === 1) {
          progress.interval = 1;
        } else if (progress.repetitions === 2) {
          progress.interval = 6;
        } else {
          progress.interval = Math.round(progress.interval * progress.easiness);
        }
        progress.easiness += 0.1;
      } else {
        progress.repetitions = 0;
        progress.interval = 1;
        progress.easiness = Math.max(1.3, progress.easiness - 0.2);
      }
    });

    this.saveToStorage();
  }

  updateStatistics() {
    const totalNotes = this.notes.length;
    const categories = [...new Set(this.notes.map(n => n.category))].length;
    const quizzesTaken = this.getQuizzesTaken();
    const avgScore = this.getAverageScore();

    document.getElementById('total-notes').textContent = totalNotes;
    document.getElementById('categories-count').textContent = categories;
    document.getElementById('quiz-taken').textContent = quizzesTaken;
    document.getElementById('avg-score').textContent = avgScore + '%';

    // Category breakdown chart
    this.renderCategoryChart();
    
    // Recent activity
    this.renderRecentActivity();
  }

  renderCategoryChart() {
    const categoryCount = {};
    this.notes.forEach(note => {
      categoryCount[note.category] = (categoryCount[note.category] || 0) + 1;
    });

    const chartHTML = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => `
        <div class="category-bar">
          <div class="category-label">${this.getCategoryLabel(category)}</div>
          <div class="category-progress">
            <div class="category-fill" style="width: ${(count / this.notes.length) * 100}%"></div>
            <span class="category-count">${count}</span>
          </div>
        </div>
      `).join('');

    document.getElementById('category-chart').innerHTML = chartHTML;
  }

  renderRecentActivity() {
    const recentNotes = [...this.notes]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const activityHTML = recentNotes.map(note => `
      <div class="activity-item">
        <div class="activity-icon">📝</div>
        <div class="activity-content">
          <div class="activity-title">${note.title}</div>
          <div class="activity-time">${this.getTimeAgo(note.createdAt)}</div>
        </div>
      </div>
    `).join('');

    document.getElementById('activity-log').innerHTML = activityHTML;
  }

  getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  }

  getQuizzesTaken() {
    return parseInt(localStorage.getItem('quizzes_taken') || '0');
  }

  getAverageScore() {
    const scores = JSON.parse(localStorage.getItem('quiz_scores') || '[]');
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  exportNotes(format) {
    if (this.notes.length === 0) {
      this.showNotification('❌ No notes to export', 'error');
      return;
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    
    if (format === 'json') {
      const data = {
        exportDate: new Date().toISOString(),
        totalNotes: this.notes.length,
        notes: this.notes
      };
      
      this.downloadFile(
        JSON.stringify(data, null, 2),
        `geriatrics-notes-${timestamp}.json`,
        'application/json'
      );
    } else if (format === 'csv') {
      const headers = ['Title', 'Category', 'Content', 'Tags', 'Source', 'Importance', 'Created Date'];
      const csvContent = [
        headers.join(','),
        ...this.notes.map(note => [
          `"${note.title}"`,
          `"${note.category}"`,
          `"${note.content.replace(/"/g, '""')}"`,
          `"${note.tags.join('; ')}"`,
          `"${note.source || ''}"`,
          `"${note.importance}"`,
          `"${new Date(note.createdAt).toLocaleDateString()}"`
        ].join(','))
      ].join('\n');
      
      this.downloadFile(csvContent, `geriatrics-notes-${timestamp}.csv`, 'text/csv');
    }
  }

  exportQuizBank() {
    // Generate quiz questions from all notes
    const allQuestions = [];
    this.notes.forEach(note => {
      const questions = this.analyzeNoteForQuestionTypes(note);
      questions.forEach((q, index) => {
        allQuestions.push({
          id: `${note.id}_${index}`,
          question: q.question,
          type: q.type,
          correctAnswer: q.answer,
          options: q.options,
          explanation: q.explanation,
          source: note.title,
          category: note.category,
          difficulty: this.assessDifficulty(note),
          tags: note.tags,
          createdFrom: note.title
        });
      });
    });

    const quizBank = {
      exportDate: new Date().toISOString(),
      totalQuestions: allQuestions.length,
      questions: allQuestions
    };

    const timestamp = new Date().toISOString().slice(0, 10);
    this.downloadFile(
      JSON.stringify(quizBank, null, 2),
      `geriatrics-quiz-bank-${timestamp}.json`,
      'application/json'
    );

    this.showNotification(`✅ Exported ${allQuestions.length} quiz questions!`, 'success');
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  showKnowledgeManager() {
    const container = document.querySelector('.knowledge-manager-container');
    if (container) {
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
    }
  }

  updateStudyProgress(action, data) {
    const progress = JSON.parse(localStorage.getItem('study_progress_log') || '[]');
    progress.push({
      timestamp: new Date().toISOString(),
      action: action,
      data: data
    });
    
    // Keep only last 100 entries
    if (progress.length > 100) {
      progress.splice(0, progress.length - 100);
    }
    
    localStorage.setItem('study_progress_log', JSON.stringify(progress));

    // Update specific counters
    if (action === 'quiz_completed') {
      const quizCount = this.getQuizzesTaken() + 1;
      localStorage.setItem('quizzes_taken', quizCount.toString());
      
      const scores = JSON.parse(localStorage.getItem('quiz_scores') || '[]');
      scores.push(data.score);
      localStorage.setItem('quiz_scores', JSON.stringify(scores));
    }
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        ${message}
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      padding: 15px 20px;
      border-radius: 6px;
      color: white;
      font-family: Arial, sans-serif;
      max-width: 300px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
    `;

    // Set color based on type
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  saveToStorage() {
    localStorage.setItem('personal_medical_notes', JSON.stringify(this.notes));
    localStorage.setItem('study_progress', JSON.stringify(this.studyProgress));
  }
}

// Initialize Personal Knowledge Manager
window.personalKnowledge = new PersonalKnowledgeManager();

// Integration with existing UI
if (window.uiEnhancement) {
  console.log('📚 Personal Knowledge Manager integrated with UI Enhancement');
}

console.log(`
📚 Personal Knowledge Manager Ready!

Features:
- Create and organize your own medical notes
- Generate quiz questions from your content
- Spaced repetition learning system
- Export notes and quiz banks
- Track your learning progress
- Category-based organization
- Search and filter capabilities

Usage:
- personalKnowledge.showKnowledgeManager() - Toggle the interface
- Create notes from your lectures, readings, cases
- Generate quizzes to test your knowledge
- Export your content for backup or sharing
`);