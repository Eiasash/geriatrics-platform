// Main Application Module
const app = {
    currentLang: 'he',
    currentSection: 'dashboard',
    userData: {
        progress: {},
        scores: {},
        recentActivity: []
    },

    // Initialize app
    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.updateUI();
        this.loadDashboard();
        
        // Register service worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(console.error);
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });

        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterContent(e.target.dataset.filter);
            });
        });

        // Resource tabs
        document.querySelectorAll('.resource-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.loadResourceTab(e.target.dataset.resource);
            });
        });
    },

    // Switch language
    switchLanguage(lang) {
        this.currentLang = lang;
        document.body.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update all translatable elements
        this.updateTranslations();
        
        // Save preference
        localStorage.setItem('preferred-lang', lang);
    },

    // Update translations
    updateTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                el.textContent = translation;
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                el.placeholder = translation;
            }
        });
    },

    // Get translation
    getTranslation(key) {
        const keys = key.split('.');
        let value = translations[this.currentLang];
        
        for (const k of keys) {
            value = value[k];
            if (!value) break;
        }
        
        return value || key;
    },

    // Switch section
    switchSection(section) {
        this.currentSection = section;
        
        // Update sections visibility
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.toggle('active', sec.id === section);
        });
        
        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.section === section);
        });
        
        // Load section content
        this[`load${section.charAt(0).toUpperCase() + section.slice(1)}`]?.();
        
        // Track activity
        this.trackActivity(`Visited ${section}`);
    },

    // Load Dashboard
    loadDashboard() {
        // Update stats
        document.getElementById('toolsCount').textContent = Object.keys(calculators).length;
        document.getElementById('guidelinesCount').textContent = guidelinesData.length;
        document.getElementById('casesCount').textContent = casesData.length;
        
        // Load recent activity
        this.loadRecentActivity();
    },

    // Load Recent Activity
    loadRecentActivity() {
        const container = document.getElementById('recentActivity');
        const activities = this.userData.recentActivity.slice(0, 5);
        
        if (activities.length === 0) {
            container.innerHTML = `<p style="color: #999;">No recent activity</p>`;
            return;
        }
        
        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <span class="activity-time">${new Date(activity.time).toLocaleString()}</span>
                <span class="activity-text">${activity.action}</span>
            </div>
        `).join('');
    },

    // Load Calculators
    loadCalculators() {
        const container = document.getElementById('calculatorsContainer');
        
        container.innerHTML = Object.keys(calculators).map(key => {
            const calc = calculators[key];
            return `
                <div class="calculator-card">
                    <h3>${calc.name[this.currentLang]}</h3>
                    <div class="calc-form" id="calc-${key}">
                        ${this.renderCalculatorFields(calc.fields)}
                    </div>
                    <button class="btn btn-primary" onclick="app.calculate('${key}')">
                        ${this.getTranslation('calc.calculate')}
                    </button>
                    <button class="btn btn-secondary" onclick="app.resetCalculator('${key}')">
                        ${this.getTranslation('calc.reset')}
                    </button>
                    <div class="calc-result" id="result-${key}"></div>
                </div>
            `;
        }).join('');
    },

    // Render calculator fields
    renderCalculatorFields(fields) {
        return fields.map(field => {
            if (field.type === 'select') {
                return `
                    <div class="form-group">
                        <label>${field.label[this.currentLang]}</label>
                        <select id="${field.id}" class="form-control">
                            <option value="">Select...</option>
                            ${field.options.map(opt => `
                                <option value="${opt.value}">${opt.text[this.currentLang]}</option>
                            `).join('')}
                        </select>
                    </div>
                `;
            } else if (field.type === 'number') {
                return `
                    <div class="form-group">
                        <label>${field.label[this.currentLang]}</label>
                        <input type="number" id="${field.id}" class="form-control" 
                               min="${field.min}" max="${field.max}">
                    </div>
                `;
            }
        }).join('');
    },

    // Calculate
    calculate(calculatorKey) {
        const calc = calculators[calculatorKey];
        const values = {};
        
        // Collect values
        calc.fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                values[field.id] = element.value;
            }
        });
        
        // Calculate result
        const result = calc.calculate(values);
        
        // Display result
        const resultContainer = document.getElementById(`result-${calculatorKey}`);
        resultContainer.innerHTML = `
            <div class="result-box ${result.risk}">
                <h4>${this.getTranslation('calc.result')}</h4>
                <div class="score">${result.score} / ${result.maxScore}</div>
                <div class="interpretation">${result.interpretation[this.currentLang]}</div>
                <div class="recommendations">
                    <strong>Recommendations:</strong>
                    <ul>
                        ${result.recommendations[this.currentLang].map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Save result
        this.saveCalculationResult(calculatorKey, result);
    },

    // Load Guidelines
    loadGuidelines() {
        const container = document.getElementById('guidelinesContainer');
        
        container.innerHTML = guidelinesData.map(guideline => `
            <div class="guideline-card">
                <h3>${guideline.title[this.currentLang]}</h3>
                <div class="guideline-meta">
                    <span class="source">${guideline.source}</span>
                    <span class="year">${guideline.updated}</span>
                </div>
                <div class="guideline-content">
                    ${guideline.content[this.currentLang]}
                </div>
                <div class="guideline-tags">
                    ${guideline.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    },

    // Search Guidelines
    searchGuidelines() {
        const query = document.getElementById('guidelineSearch').value.toLowerCase();
        const filtered = guidelinesData.filter(g => 
            g.title[this.currentLang].toLowerCase().includes(query) ||
            g.content[this.currentLang].toLowerCase().includes(query) ||
            g.tags.some(tag => tag.includes(query))
        );
        
        const container = document.getElementById('guidelinesContainer');
        if (filtered.length === 0) {
            container.innerHTML = '<p>No guidelines found</p>';
        } else {
            container.innerHTML = filtered.map(guideline => `
                <div class="guideline-card">
                    <h3>${guideline.title[this.currentLang]}</h3>
                    <div class="guideline-content">${guideline.content[this.currentLang]}</div>
                </div>
            `).join('');
        }
    },

    // Load Cases
    loadCases() {
        const container = document.getElementById('casesContainer');
        
        container.innerHTML = casesData.map(case_ => `
            <div class="case-card" data-category="${case_.category}">
                <h3>${case_.title[this.currentLang]}</h3>
                <div class="case-meta">
                    <span>Age: ${case_.age}</span>
                    <span>Gender: ${case_.gender}</span>
                </div>
                <div class="case-content">
                    <h4>Presentation:</h4>
                    <p>${case_.presentation[this.currentLang]}</p>
                    <h4>Diagnosis:</h4>
                    <p>${case_.diagnosis[this.currentLang]}</p>
                    <h4>Clinical Pearl:</h4>
                    <p class="pearl">${case_.pearls[this.currentLang]}</p>
                </div>
            </div>
        `).join('');
    },

    // Filter content
    filterContent(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        document.querySelectorAll('.case-card').forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.style.display = show ? 'block' : 'none';
        });
    },

    // Start Quiz
    startQuiz() {
        const category = document.getElementById('quizCategory').value;
        const questions = category === 'all' ? 
            questionsData : 
            questionsData.filter(q => q.category === category);
        
        const container = document.getElementById('quizContainer');
        let currentQuestion = 0;
        let score = 0;
        
        const renderQuestion = () => {
            if (currentQuestion >= questions.length) {
                // Show results
                container.innerHTML = `
                    <div class="quiz-complete">
                        <h3>Quiz Complete!</h3>
                        <p>Your score: ${score} / ${questions.length}</p>
                        <button class="btn btn-primary" onclick="app.startQuiz()">
                            Start New Quiz
                        </button>
                    </div>
                `;
                return;
            }
            
            const q = questions[currentQuestion];
            container.innerHTML = `
                <div class="question-card">
                    <h4>Question ${currentQuestion + 1} / ${questions.length}</h4>
                    <p>${q.question[this.currentLang]}</p>
                    <div class="options">
                        ${q.options.map((opt, i) => `
                            <label class="option">
                                <input type="radio" name="answer" value="${i}">
                                ${opt[this.currentLang]}
                            </label>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" onclick="app.checkAnswer(${q.correct})">
                        Submit
                    </button>
                </div>
            `;
        };
        
        window.app.checkAnswer = (correct) => {
            const selected = document.querySelector('input[name="answer"]:checked');
            if (!selected) {
                alert('Please select an answer');
                return;
            }
            
            if (parseInt(selected.value) === correct) {
                score++;
            }
            
            currentQuestion++;
            renderQuestion();
        };
        
        renderQuestion();
    },

    // Load Resources
    loadResources() {
        this.loadResourceTab('articles');
    },

    // Load Resource Tab
    loadResourceTab(type) {
        document.querySelectorAll('.resource-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.resource === type);
        });
        
        const container = document.getElementById('resourcesContent');
        const resources = resourcesData[type];
        
        if (type === 'articles') {
            container.innerHTML = resources.map(r => `
                <div class="resource-item">
                    <h4>${r.title}</h4>
                    <p>${r.author} - ${r.journal}</p>
                    <a href="${r.link}" target="_blank" class="btn btn-primary">Read Article</a>
                </div>
            `).join('');
        } else if (type === 'videos') {
            container.innerHTML = resources.map(r => `
                <div class="resource-item">
                    <h4>${r.title}</h4>
                    <p>Duration: ${r.duration} - ${r.source}</p>
                    <a href="${r.link}" target="_blank" class="btn btn-primary">Watch Video</a>
                </div>
            `).join('');
        } else if (type === 'books') {
            container.innerHTML = resources.map(r => `
                <div class="resource-item">
                    <h4>${r.title}</h4>
                    <p>${r.edition} (${r.year})</p>
                </div>
            `).join('');
        } else if (type === 'websites') {
            container.innerHTML = resources.map(r => `
                <div class="resource-item">
                    <h4>${r.name}</h4>
                    <p>${r.description}</p>
                    <a href="${r.url}" target="_blank" class="btn btn-primary">Visit Site</a>
                </div>
            `).join('');
        }
    },

    // Quick Access
    quickAccess(tool) {
        this.switchSection('calculators');
        setTimeout(() => {
            document.getElementById(`calc-${tool}`)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    },

    // Open Med Tool
    openMedTool(tool) {
        const container = document.getElementById('medToolContent');
        
        if (tool === 'beers') {
            container.innerHTML = `
                <h3>Beers Criteria 2023</h3>
                <div class="meds-list">
                    ${medicationsDB.beers.map(med => `
                        <div class="med-item">
                            <h4>${med.drug} (${med.class})</h4>
                            <p><strong>Concern:</strong> ${med.concern}</p>
                            <p><strong>Recommendation:</strong> ${med.recommendation}</p>
                            <p><strong>Alternatives:</strong> ${med.alternatives.join(', ')}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    },

    // Toggle Quick Menu
    toggleQuickMenu() {
        document.getElementById('fabMenu').classList.toggle('show');
    },

    // Save Progress
    saveProgress() {
        localStorage.setItem('geriatrics_userData', JSON.stringify(this.userData));
        alert('Progress saved!');
    },

    // Export Data
    exportData() {
        const dataStr = JSON.stringify(this.userData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `geriatrics_data_${new Date().toISOString()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    },

    // Toggle Dark Mode
    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    },

    // Print Section
    printSection() {
        window.print();
    },

    // Track Activity
    trackActivity(action) {
        this.userData.recentActivity.unshift({
            action: action,
            time: new Date().toISOString()
        });
        
        // Keep only last 50 activities
        this.userData.recentActivity = this.userData.recentActivity.slice(0, 50);
        this.saveProgress();
    },

    // Save Calculation Result
    saveCalculationResult(calculator, result) {
        if (!this.userData.scores[calculator]) {
            this.userData.scores[calculator] = [];
        }
        
        this.userData.scores[calculator].push({
            result: result,
            timestamp: new Date().toISOString()
        });
        
        this.trackActivity(`Calculated ${calculator}`);
        this.saveProgress();
    },

    // Load User Data
    loadUserData() {
        const saved = localStorage.getItem('geriatrics_userData');
        if (saved) {
            this.userData = JSON.parse(saved);
        }
    },

    // Update UI
    updateUI() {
        // Set initial language
        const savedLang = localStorage.getItem('preferred-lang') || 'he';
        this.switchLanguage(savedLang);
        
        // Set dark mode
        if (localStorage.getItem('dark-mode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    },

    // Reset Calculator
    resetCalculator(calculatorKey) {
        const calc = calculators[calculatorKey];
        calc.fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                element.value = '';
            }
        });
        document.getElementById(`result-${calculatorKey}`).innerHTML = '';
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});