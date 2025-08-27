// medical-knowledge-hub.js
// Compliant medical reference integration for geriatrics platform

class MedicalKnowledgeHub {
  constructor() {
    this.platforms = {
      uptodate: {
        name: 'UpToDate',
        icon: '📚',
        searchUrl: 'https://www.uptodate.com/contents/search?search=',
        mobile: 'uptodate://search?term=',
        color: '#0066cc'
      },
      nejm: {
        name: 'NEJM',
        icon: '📖',
        searchUrl: 'https://www.nejm.org/search?q=',
        mobile: 'https://www.nejm.org/search?q=',
        color: '#8B0000'
      },
      dynamed: {
        name: 'DynaMed',
        icon: '📋',
        searchUrl: 'https://www.dynamed.com/search?q=',
        mobile: 'dynamed://search?q=',
        color: '#2E8B57'
      },
      accessmedicine: {
        name: 'AccessMedicine',
        icon: '🏥',
        searchUrl: 'https://accessmedicine.mhmedical.com/SearchResults.aspx?q=',
        mobile: 'https://accessmedicine.mhmedical.com/SearchResults.aspx?q=',
        color: '#FF6B35'
      },
      clinicalkey: {
        name: 'ClinicalKey',
        icon: '🔑',
        searchUrl: 'https://www.clinicalkey.com/#!/search/',
        mobile: 'https://www.clinicalkey.com/#!/search/',
        color: '#4169E1'
      }
    };
    
    this.geriatricTopics = {
      'Delirium': 'delirium elderly assessment prevention',
      'Falls': 'falls elderly prevention assessment risk factors',
      'Frailty': 'frailty syndrome elderly assessment',
      'Polypharmacy': 'polypharmacy elderly medication review beers criteria',
      'Dementia': 'dementia elderly alzheimer cognitive assessment',
      'Heart Failure': 'heart failure elderly diastolic dysfunction',
      'Atrial Fibrillation': 'atrial fibrillation elderly anticoagulation',
      'Osteoporosis': 'osteoporosis elderly fracture prevention',
      'Depression': 'depression elderly geriatric assessment treatment',
      'Urinary Incontinence': 'urinary incontinence elderly management'
    };
    
    this.bookmarklets = this.generateBookmarklets();
    this.init();
  }

  init() {
    this.createKnowledgeHubUI();
    this.setupKeyboardShortcuts();
    console.log('🏥 Medical Knowledge Hub initialized');
  }

  createKnowledgeHubUI() {
    // Add medical reference section to existing platform
    const hubHTML = `
      <div class="medical-hub-container" style="display:none;">
        <div class="medical-hub-header">
          <h2>🏥 Medical Knowledge Hub</h2>
          <p>Quick access to your institutional medical resources</p>
        </div>
        
        <div class="quick-search-section">
          <h3>🔍 Multi-Platform Search</h3>
          <div class="search-container">
            <input type="text" id="medical-search-input" 
                   placeholder="Enter condition, drug, or topic..."
                   class="search-input">
            <div class="search-buttons">
              <button class="action-btn" onclick="window.medicalHub.searchAllPlatforms()">
                🚀 Search All Platforms
              </button>
              <button class="action-btn" onclick="window.medicalHub.searchGeriatricFocused()">
                👴 Geriatric-Focused Search
              </button>
            </div>
          </div>
        </div>

        <div class="platform-grid">
          <h3>📚 Platform Quick Access</h3>
          <div class="platform-buttons">
            ${Object.entries(this.platforms).map(([key, platform]) => `
              <button class="platform-btn" 
                      style="border-color: ${platform.color}; color: ${platform.color};"
                      onclick="window.medicalHub.openPlatform('${key}')">
                ${platform.icon} ${platform.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="geriatric-topics-section">
          <h3>👴 Geriatric Quick Topics</h3>
          <div class="topic-grid">
            ${Object.keys(this.geriatricTopics).map(topic => `
              <button class="topic-btn action-btn" 
                      onclick="window.medicalHub.searchTopic('${topic}')">
                ${topic}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="bookmarklet-section">
          <h3>🔖 Bookmarklets (Drag to Bookmark Bar)</h3>
          <div class="bookmarklet-container">
            <a href="${this.bookmarklets.searchAll}" class="bookmarklet">
              📚 Search All Platforms
            </a>
            <a href="${this.bookmarklets.geriatricDrug}" class="bookmarklet">
              💊 Geriatric Drug Check
            </a>
            <a href="${this.bookmarklets.evidenceReview}" class="bookmarklet">
              📊 Evidence Review
            </a>
          </div>
          <p class="bookmarklet-help">
            💡 Drag these links to your bookmark bar for one-click access during rounds
          </p>
        </div>

        <div class="mobile-section">
          <h3>📱 Mobile Quick Access</h3>
          <div class="mobile-shortcuts">
            <p>Keyboard shortcuts when platform is active:</p>
            <ul>
              <li><kbd>Ctrl+Shift+U</kbd> - Open UpToDate</li>
              <li><kbd>Ctrl+Shift+N</kbd> - Open NEJM</li>
              <li><kbd>Ctrl+Shift+D</kbd> - Open DynaMed</li>
              <li><kbd>Ctrl+Shift+M</kbd> - Open Medical Hub</li>
            </ul>
          </div>
        </div>

        <div class="saved-searches">
          <h3>💾 Recent Searches</h3>
          <div id="recent-searches-list">
            <p>No recent searches</p>
          </div>
        </div>
      </div>

      <style>
        .medical-hub-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .medical-hub-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
        }
        
        .search-container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        
        .search-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        
        .platform-grid {
          margin: 30px 0;
        }
        
        .platform-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 15px 0;
        }
        
        .platform-btn {
          padding: 15px 20px;
          border: 2px solid;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
          text-align: left;
        }
        
        .platform-btn:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }
        
        .topic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
          margin: 15px 0;
        }
        
        .topic-btn {
          padding: 10px 15px;
          font-size: 14px;
        }
        
        .bookmarklet-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
        }
        
        .bookmarklet {
          display: inline-block;
          padding: 8px 15px;
          background: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          margin: 5px;
          font-size: 14px;
        }
        
        .bookmarklet:hover {
          background: #0056b3;
          color: white;
        }
        
        .bookmarklet-help {
          font-style: italic;
          color: #666;
          margin-top: 10px;
        }
        
        .mobile-section {
          background: #e8f4f8;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
        }
        
        .mobile-shortcuts ul {
          list-style: none;
          padding: 0;
        }
        
        .mobile-shortcuts li {
          padding: 5px 0;
        }
        
        kbd {
          background: #333;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 12px;
        }
        
        .saved-searches {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
          .platform-buttons {
            grid-template-columns: 1fr;
          }
          
          .search-buttons {
            flex-direction: column;
          }
          
          .topic-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }
        }
      </style>
    `;

    // Add to body
    const hubContainer = document.createElement('div');
    hubContainer.innerHTML = hubHTML;
    document.body.appendChild(hubContainer);
  }

  generateBookmarklets() {
    return {
      searchAll: `javascript:(function(){
        const query = prompt('Enter medical topic/condition:');
        if(query) {
          const platforms = [
            'https://www.uptodate.com/contents/search?search=',
            'https://www.nejm.org/search?q=',
            'https://www.dynamed.com/search?q=',
            'https://accessmedicine.mhmedical.com/SearchResults.aspx?q=',
            'https://www.clinicalkey.com/#!/search/'
          ];
          platforms.forEach(url => {
            window.open(url + encodeURIComponent(query), '_blank');
          });
        }
      })();`,
      
      geriatricDrug: `javascript:(function(){
        const drug = prompt('Enter medication name:');
        if(drug) {
          const geriatricQuery = drug + ' elderly geriatric dosing interactions';
          window.open('https://www.uptodate.com/contents/search?search=' + 
            encodeURIComponent(geriatricQuery), '_blank');
        }
      })();`,
      
      evidenceReview: `javascript:(function(){
        const condition = prompt('Enter condition for evidence review:');
        if(condition) {
          const queries = [
            'https://www.nejm.org/search?q=' + encodeURIComponent(condition + ' elderly'),
            'https://www.cochranelibrary.com/search?q=' + encodeURIComponent(condition + ' elderly')
          ];
          queries.forEach(url => window.open(url, '_blank'));
        }
      })();`
    };
  }

  searchAllPlatforms() {
    const query = document.getElementById('medical-search-input').value.trim();
    if (!query) {
      alert('Please enter a search term');
      return;
    }

    this.saveRecentSearch(query);

    Object.values(this.platforms).forEach(platform => {
      const searchUrl = platform.searchUrl + encodeURIComponent(query);
      window.open(searchUrl, '_blank');
    });
  }

  searchGeriatricFocused() {
    const query = document.getElementById('medical-search-input').value.trim();
    if (!query) {
      alert('Please enter a search term');
      return;
    }

    const geriatricQuery = `${query} elderly geriatric`;
    this.saveRecentSearch(geriatricQuery);

    // Focus on most relevant platforms for geriatrics
    const geriatricPlatforms = ['uptodate', 'nejm', 'dynamed'];
    geriatricPlatforms.forEach(platformKey => {
      const platform = this.platforms[platformKey];
      const searchUrl = platform.searchUrl + encodeURIComponent(geriatricQuery);
      window.open(searchUrl, '_blank');
    });
  }

  searchTopic(topic) {
    const query = this.geriatricTopics[topic];
    
    this.saveRecentSearch(topic);
    
    // Search in UpToDate and NEJM for clinical topics
    window.open(this.platforms.uptodate.searchUrl + encodeURIComponent(query), '_blank');
    window.open(this.platforms.nejm.searchUrl + encodeURIComponent(query), '_blank');
  }

  openPlatform(platformKey) {
    const platform = this.platforms[platformKey];
    const query = document.getElementById('medical-search-input').value.trim();
    
    if (query) {
      window.open(platform.searchUrl + encodeURIComponent(query), '_blank');
    } else {
      // Open platform homepage
      const baseUrl = platform.searchUrl.split('/search')[0] || platform.searchUrl.split('/SearchResults')[0];
      window.open(baseUrl, '_blank');
    }
  }

  saveRecentSearch(query) {
    const searches = JSON.parse(localStorage.getItem('recent_medical_searches') || '[]');
    
    // Add new search to beginning, remove duplicates
    const updatedSearches = [query, ...searches.filter(s => s !== query)].slice(0, 10);
    
    localStorage.setItem('recent_medical_searches', JSON.stringify(updatedSearches));
    this.displayRecentSearches();
  }

  displayRecentSearches() {
    const searches = JSON.parse(localStorage.getItem('recent_medical_searches') || '[]');
    const container = document.getElementById('recent-searches-list');
    
    if (searches.length === 0) {
      container.innerHTML = '<p>No recent searches</p>';
      return;
    }

    container.innerHTML = searches.map(search => `
      <button class="action-btn" style="margin: 2px;" 
              onclick="document.getElementById('medical-search-input').value='${search}'; window.medicalHub.searchAllPlatforms();">
        ${search}
      </button>
    `).join('');
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey) {
        switch(e.key) {
          case 'U': // UpToDate
            e.preventDefault();
            window.open('https://www.uptodate.com', '_blank');
            break;
          case 'N': // NEJM
            e.preventDefault();
            window.open('https://www.nejm.org', '_blank');
            break;
          case 'D': // DynaMed
            e.preventDefault();
            window.open('https://www.dynamed.com', '_blank');
            break;
          case 'M': // Medical Hub
            e.preventDefault();
            this.toggleMedicalHub();
            break;
        }
      }
    });
  }

  toggleMedicalHub() {
    const hub = document.querySelector('.medical-hub-container');
    if (hub) {
      hub.style.display = hub.style.display === 'none' ? 'block' : 'none';
      if (hub.style.display === 'block') {
        document.getElementById('medical-search-input')?.focus();
      }
    }
  }

  showMedicalHub() {
    const hub = document.querySelector('.medical-hub-container');
    if (hub) {
      hub.style.display = 'block';
      document.getElementById('medical-search-input')?.focus();
      this.displayRecentSearches();
    }
  }

  // Mobile app integration
  openMobileApp(platform, query = '') {
    const mobileUrls = {
      uptodate: `uptodate://search?term=${encodeURIComponent(query)}`,
      dynamed: `dynamed://search?q=${encodeURIComponent(query)}`,
      pubmed: `pubmed://search/${encodeURIComponent(query)}`
    };

    if (mobileUrls[platform]) {
      // Try mobile app first, fallback to web
      window.location.href = mobileUrls[platform];
      
      // Fallback to web version after 1 second
      setTimeout(() => {
        window.open(this.platforms[platform].searchUrl + encodeURIComponent(query), '_blank');
      }, 1000);
    }
  }

  // Clinical decision support integration
  getEvidenceForCase(patientCase) {
    const conditions = this.extractConditions(patientCase);
    const searches = conditions.map(condition => ({
      platform: 'uptodate',
      query: `${condition} elderly treatment management`,
      url: this.platforms.uptodate.searchUrl + encodeURIComponent(`${condition} elderly treatment management`)
    }));

    return searches;
  }

  extractConditions(caseText) {
    const commonConditions = Object.keys(this.geriatricTopics);
    return commonConditions.filter(condition => 
      caseText.toLowerCase().includes(condition.toLowerCase())
    );
  }
}

// Initialize Medical Knowledge Hub
window.medicalHub = new MedicalKnowledgeHub();

// Integration with existing platform
if (window.uiEnhancement) {
  console.log('🔗 Medical Hub integrated with UI Enhancement');
}

console.log(`
🏥 Medical Knowledge Hub Ready!

Features:
- Multi-platform search across institutional resources
- Geriatric-focused search options  
- Keyboard shortcuts (Ctrl+Shift+U/N/D/M)
- Bookmarklets for quick access
- Recent search history
- Mobile app integration

Usage:
- medicalHub.showMedicalHub() - Show the hub
- medicalHub.searchAllPlatforms() - Search all platforms
- Drag bookmarklets to bookmark bar for quick access
- Use Ctrl+Shift+M to toggle hub visibility
`);