/**
 * PHARMACEUTICAL LIABILITY DISCLAIMER SYSTEM
 * ALL DRUG INTERACTION FUNCTIONALITY PERMANENTLY REMOVED
 * USE VALIDATED CLINICAL DATABASES ONLY
 */

class PharmaceuticalDisclaimer {
  constructor() {
    this.validatedDatabases = {};
    this.israeliResources = {};
    
    this.init();
  }

  init() {
    console.log('📋 Drug Interaction Disclaimer System Initialized');
    this.loadValidatedDatabases();
    this.loadIsraeliResources();
    this.disableInteractionChecking();
  }

  loadValidatedDatabases() {
    this.validatedDatabases = {
      uptodate: {
        name: 'UpToDate',
        url: 'https://www.uptodate.com/drug-interactions',
        description: 'Comprehensive drug interaction database with clinical management',
        access: 'Subscription required',
        israeli_access: 'Available through most Israeli hospitals and health funds',
        hebrew: 'זמין דרך בתי החולים וקופות החולים בישראל'
      },
      
      lexicomp: {
        name: 'Lexicomp',
        url: 'https://online.lexi.com',
        description: 'Evidence-based drug interaction screening',
        access: 'Subscription required',
        israeli_access: 'Available at Shaare Zedek, Hadassah, Tel Aviv Sourasky',
        hebrew: 'זמין בשערי צדק, הדסה, איכילוב'
      },
      
      drugs_com: {
        name: 'Drugs.com Interaction Checker',
        url: 'https://www.drugs.com/drug_interactions.html',
        description: 'Free drug interaction checker',
        access: 'Free access',
        israeli_access: 'Accessible worldwide',
        hebrew: 'נגיש ברחבי העולם'
      },
      
      medscape: {
        name: 'Medscape Drug Interaction Checker',
        url: 'https://reference.medscape.com/drug-interactionchecker',
        description: 'Professional drug interaction database',
        access: 'Free registration required',
        israeli_access: 'Accessible worldwide',
        hebrew: 'נגיש ברחבי העולם'
      }
    };
  }

  loadIsraeliResources() {
    this.israeliResources = {
      moh: {
        name: 'Ministry of Health Drug Database',
        name_hebrew: 'מאגר התרופות של משרד הבריאות',
        url: 'https://www.health.gov.il/Subjects/KnowledgeDB/drugs/Pages/default.aspx',
        description: 'Official Israeli drug information',
        hebrew_description: 'מידע רשמי על תרופות במדינת ישראל'
      },
      
      clalit_pharmacy: {
        name: 'Clalit Pharmacy Services',
        name_hebrew: 'שירותי בית מרקחת כללית',
        phone: '1-700-507-507',
        description: 'Clinical pharmacy consultation',
        hebrew_description: 'ייעוץ רוקחות קליניות'
      },
      
      maccabi_pharmacy: {
        name: 'Maccabi Pharmacy Services',
        name_hebrew: 'שירותי בית מרקחת מכבי',
        phone: '*3555',
        description: 'Medication consultation services',
        hebrew_description: 'שירותי ייעוץ תרופתי'
      },
      
      poison_control: {
        name: 'Israel Poison Information Center',
        name_hebrew: 'מרכז המידע לרעלים',
        phone: '04-854-1900',
        description: '24/7 drug interaction and toxicity information',
        hebrew_description: 'מידע 24/7 על אינטראקציות תרופות ורעילות'
      },
      
      hospital_pharmacy: {
        name: 'Hospital Clinical Pharmacy',
        name_hebrew: 'רוקחות קלינית בבית החולים',
        description: 'Contact your hospital pharmacy for drug interaction consultation',
        hebrew_description: 'פנה לרוקחות הקלינית בבית החולים לייעוץ אינטראקציות'
      }
    };
  }

  disableInteractionChecking() {
    // Override any existing interaction checking functions
    if (typeof window !== 'undefined') {
      
      // Disable interaction checking functions
      window.checkDrugInteractions = () => {
        return this.showInteractionDisclaimer();
      };
      
      window.checkInteractions = () => {
        return this.showInteractionDisclaimer();
      };
      
      // Disable emergency checker
      if (window.emergencyChecker) {
        window.emergencyChecker.emergencyCheck = () => {
          return this.showInteractionDisclaimer();
        };
      }
      
      // Disable pharmaceutical intelligence
      if (window.pharmaIntelligence) {
        window.pharmaIntelligence.checkDrugInteractions = () => {
          return this.showInteractionDisclaimer();
        };
      }
    }
    
    console.log('🚫 All drug interaction checking functionality disabled');
  }

  showInteractionDisclaimer() {
    const disclaimer = {
      message: 'DRUG INTERACTION CHECKING DISABLED',
      hebrew_message: 'בדיקת אינטראקציות תרופות הושבתה',
      
      reason: 'For patient safety, use validated clinical databases for drug interaction checking',
      hebrew_reason: 'לבטיחות החולים, השתמש במאגרי מידע קליניים מאומתים לבדיקת אינטראקציות תרופות',
      
      recommendations: [
        {
          priority: 'PRIMARY',
          resource: 'UpToDate Drug Interactions',
          url: 'https://www.uptodate.com/drug-interactions',
          access: 'Available through Israeli hospitals and health funds',
          hebrew: 'UpToDate - זמין דרך בתי חולים וקופות חולים'
        },
        {
          priority: 'PRIMARY', 
          resource: 'Lexicomp Online',
          url: 'https://online.lexi.com',
          access: 'Professional subscription database',
          hebrew: 'Lexicomp - מאגר מקצועי בתשלום'
        },
        {
          priority: 'FREE',
          resource: 'Drugs.com Interaction Checker',
          url: 'https://www.drugs.com/drug_interactions.html',
          access: 'Free online access',
          hebrew: 'Drugs.com - גישה חינמית באינטרנט'
        },
        {
          priority: 'FREE',
          resource: 'Medscape Drug Interactions',
          url: 'https://reference.medscape.com/drug-interactionchecker',
          access: 'Free with registration',
          hebrew: 'Medscape - חינם עם רישום'
        }
      ],
      
      israeli_contacts: [
        {
          service: 'Clinical Pharmacy Consultation',
          hebrew: 'ייעוץ רוקחות קליניות',
          contacts: [
            'Clalit: 1-700-507-507',
            'Maccabi: *3555',
            'Leumit: 1-700-507-520',
            'Meuhedet: 1-700-700-100'
          ]
        },
        {
          service: 'Poison Information Center',
          hebrew: 'מרכז מידע לרעלים',
          phone: '04-854-1900',
          description: '24/7 drug interaction and toxicity consultation'
        },
        {
          service: 'Hospital Pharmacy',
          hebrew: 'בית מרקחת בית החולים',
          description: 'Contact your hospital clinical pharmacy team'
        }
      ],
      
      emergency_notice: {
        english: 'For drug interaction emergencies, contact your physician immediately or call emergency services (101)',
        hebrew: 'למקרי חירום של אינטראקציות תרופות, פנה לרופא מיידית או התקשר לשירותי חירום (101)'
      },
      
      disclaimer_text: {
        english: 'This system does not provide drug interaction checking. Always consult validated clinical databases and healthcare professionals for medication safety.',
        hebrew: 'מערכת זו אינה מספקת בדיקת אינטראקציות תרופות. תמיד היוועץ במאגרי מידע קליניים מאומתים ובאנשי מקצוע בתחום הבריאות לבטיחות תרופתית.'
      }
    };
    
    // Display disclaimer in UI if available
    this.displayDisclaimer(disclaimer);
    
    return disclaimer;
  }

  displayDisclaimer(disclaimer) {
    // If we're in a browser environment, show the disclaimer
    if (typeof window !== 'undefined' && window.document) {
      
      // Try to find existing interaction results container
      let container = document.getElementById('interaction-results') || 
                     document.getElementById('drug-interactions') ||
                     document.getElementById('results');
      
      if (!container) {
        // Create a new container if none exists
        container = document.createElement('div');
        container.id = 'interaction-disclaimer';
        container.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: 3px solid #f44336;
          border-radius: 8px;
          padding: 20px;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          z-index: 10000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(container);
      }
      
      container.innerHTML = this.generateDisclaimerHTML(disclaimer);
      container.style.display = 'block';
    }
  }

  generateDisclaimerHTML(disclaimer) {
    return `
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #f44336; margin: 0;">🚫 ${disclaimer.message}</h2>
        <h3 style="color: #f44336; margin: 5px 0; direction: rtl;">${disclaimer.hebrew_message}</h3>
      </div>
      
      <div style="background: #ffebee; border: 1px solid #f44336; border-radius: 4px; padding: 15px; margin-bottom: 20px;">
        <p><strong>Notice:</strong> ${disclaimer.reason}</p>
        <p style="direction: rtl;"><strong>הודעה:</strong> ${disclaimer.hebrew_reason}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3>📋 Recommended Resources:</h3>
        ${disclaimer.recommendations.map(rec => `
          <div style="border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin: 5px 0;">
            <strong>${rec.resource}</strong> (${rec.priority})<br>
            <a href="${rec.url}" target="_blank" style="color: #2196f3;">${rec.url}</a><br>
            <small>${rec.access}</small><br>
            <small style="direction: rtl;">${rec.hebrew}</small>
          </div>
        `).join('')}
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3>🇮🇱 Israeli Healthcare Contacts:</h3>
        ${disclaimer.israeli_contacts.map(contact => `
          <div style="border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin: 5px 0;">
            <strong>${contact.service}</strong> / <strong style="direction: rtl;">${contact.hebrew}</strong><br>
            ${contact.phone ? `<strong>Phone:</strong> ${contact.phone}<br>` : ''}
            ${contact.contacts ? contact.contacts.map(c => `<small>${c}</small>`).join('<br>') + '<br>' : ''}
            ${contact.description ? `<small>${contact.description}</small>` : ''}
          </div>
        `).join('')}
      </div>
      
      <div style="background: #fff3e0; border: 1px solid #ff9800; border-radius: 4px; padding: 15px; margin-bottom: 20px;">
        <h4 style="color: #ff9800; margin-top: 0;">⚡ Emergency Notice:</h4>
        <p>${disclaimer.emergency_notice.english}</p>
        <p style="direction: rtl;">${disclaimer.emergency_notice.hebrew}</p>
      </div>
      
      <div style="background: #f5f5f5; border-radius: 4px; padding: 15px;">
        <h4>⚠️ Disclaimer:</h4>
        <p><small>${disclaimer.disclaimer_text.english}</small></p>
        <p style="direction: rtl;"><small>${disclaimer.disclaimer_text.hebrew}</small></p>
      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <button onclick="this.parentElement.parentElement.parentElement.style.display='none'" 
                style="background: #2196f3; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
          Close / סגור
        </button>
      </div>
    `;
  }

  // Redirect functions for external databases
  redirectToUpToDate() {
    window.open('https://www.uptodate.com/drug-interactions', '_blank');
  }

  redirectToLexicomp() {
    window.open('https://online.lexi.com', '_blank');
  }

  redirectToDrugsCom() {
    window.open('https://www.drugs.com/drug_interactions.html', '_blank');
  }

  redirectToMedscape() {
    window.open('https://reference.medscape.com/drug-interactionchecker', '_blank');
  }

  // Israeli resource access
  contactIsraeliPharmacy(healthFund) {
    const phones = {
      clalit: '1-700-507-507',
      maccabi: '*3555',
      leumit: '1-700-507-520',
      meuhedet: '1-700-700-100'
    };
    
    const phone = phones[healthFund?.toLowerCase()] || phones.clalit;
    
    alert(`Contact ${healthFund || 'Clalit'} Pharmacy Services: ${phone}`);
  }

  contactPoisonCenter() {
    alert('Israel Poison Information Center: 04-854-1900 (24/7 service)');
  }

  // Public API - only returns disclaimer
  checkDrugInteractions() {
    return this.showInteractionDisclaimer();
  }

  checkInteractions() {
    return this.showInteractionDisclaimer();
  }

  getValidatedDatabases() {
    return this.validatedDatabases;
  }

  getIsraeliResources() {
    return this.israeliResources;
  }
}

// ===== REMOVE ALL INTERACTION CHECKING FUNCTIONALITY =====

// Disable any existing interaction checkers
if (typeof window !== 'undefined') {
  
  // Create disclaimer system
  window.PharmaceuticalDisclaimer = PharmaceuticalDisclaimer;
  window.pharmaDisclaimer = new PharmaceuticalDisclaimer();
  
  // Override all interaction checking functions
  window.checkDrugInteractions = () => window.pharmaDisclaimer.showInteractionDisclaimer();
  window.checkInteractions = () => window.pharmaDisclaimer.showInteractionDisclaimer();
  
  // Disable emergency checker if it exists
  if (window.emergencyChecker) {
    window.emergencyChecker = null;
  }
  
  // Disable pharmaceutical intelligence if it exists
  if (window.pharmaIntelligence) {
    window.pharmaIntelligence = null;
  }
  
  // Clear any existing interaction data
  if (window.CriticalInteractionFix) {
    window.CriticalInteractionFix = null;
  }
  
  console.log('🚫 ALL DRUG INTERACTION CHECKING REMOVED');
  console.log('📋 Disclaimer system active - redirects to validated databases');
  console.log('✅ Clinical calculators, educational content, and Hebrew interface preserved');
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PharmaceuticalDisclaimer;
}