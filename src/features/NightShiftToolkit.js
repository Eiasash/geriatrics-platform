// Night Shift Survival Toolkit
// Essential tools and protocols for overnight coverage

export const NightShiftMode = {
  features: {
    darkMode: {
      enabled: false,
      autoSwitch: true,
      switchTime: { start: '19:00', end: '07:00' },
      
      toggle() {
        this.enabled = !this.enabled;
        this.applyTheme();
      },
      
      applyTheme() {
        if (this.enabled) {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.body.style.backgroundColor = '#1a1a1a';
          document.body.style.color = '#e0e0e0';
        } else {
          document.documentElement.removeAttribute('data-theme');
          document.body.style.backgroundColor = '';
          document.body.style.color = '';
        }
      },
      
      checkAutoSwitch() {
        if (!this.autoSwitch) return;
        
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const startTime = this.switchTime.start;
        const endTime = this.switchTime.end;
        
        if (currentTime >= startTime || currentTime < endTime) {
          if (!this.enabled) {
            this.enabled = true;
            this.applyTheme();
          }
        } else {
          if (this.enabled) {
            this.enabled = false;
            this.applyTheme();
          }
        }
      }
    },

    caffeinateTimer: {
      interval: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
      lastAlert: null,
      active: false,
      timer: null,
      
      start() {
        this.active = true;
        this.lastAlert = Date.now();
        
        this.timer = setInterval(() => {
          this.showAlert();
        }, this.interval);
        
        console.log('☕ Caffeinate timer started - alerts every 2 hours');
      },
      
      stop() {
        this.active = false;
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        console.log('Caffeinate timer stopped');
      },
      
      showAlert() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        // Browser notification if permitted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('☕ Caffeine Break Reminder', {
            body: `Time: ${timeString} - Stay alert! Consider a quick walk or stretch.`,
            icon: '☕',
            requireInteraction: true
          });
        }
        
        // Also show in-app alert
        this.lastAlert = Date.now();
        return `☕ Caffeine break! Current time: ${timeString}`;
      },
      
      getNextAlertTime() {
        if (!this.active || !this.lastAlert) return null;
        
        const nextAlert = new Date(this.lastAlert + this.interval);
        return nextAlert.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      }
    },

    quickProtocols: {
      sundowning: {
        title: 'Sundowning Management',
        heTitle: 'טיפול בתסמונת השקיעה',
        steps: [
          '1. Environmental modifications:',
          '   - Increase lighting in evening',
          '   - Maintain routine',
          '   - Reduce noise and stimulation',
          '   - Familiar objects visible',
          '2. Non-pharmacologic:',
          '   - Reorientation',
          '   - Calm reassurance',
          '   - Distraction with activities',
          '   - Family photos/music',
          '3. Pharmacologic (if severe):',
          '   - Melatonin 3-6mg at 9 PM',
          '   - Quetiapine 12.5-25mg PRN',
          '   - Avoid benzodiazepines',
          '4. Address triggers:',
          '   - Pain',
          '   - Hunger/thirst',
          '   - Need to toilet',
          '   - Medication effects'
        ],
        redFlags: ['Sudden change from baseline', 'Fever', 'Focal neurologic signs']
      },

      nocturnalAgitation: {
        title: 'Nocturnal Agitation Protocol',
        heTitle: 'פרוטוקול אי-שקט לילי',
        steps: [
          '1. Safety assessment:',
          '   - Risk of self-harm',
          '   - Risk to others',
          '   - Fall risk',
          '2. De-escalation:',
          '   - Calm voice',
          '   - Non-threatening posture',
          '   - Validate feelings',
          '   - Offer choices',
          '3. Environmental:',
          '   - Reduce stimulation',
          '   - Ensure comfort',
          '   - Night light',
          '   - Familiar items',
          '4. Medical evaluation:',
          '   - Check vitals',
          '   - Blood glucose',
          '   - O2 saturation',
          '   - Urinary retention',
          '   - Constipation',
          '5. Medications (if needed):',
          '   - Trazodone 25-50mg',
          '   - Quetiapine 12.5-25mg',
          '   - Haloperidol 0.25-0.5mg (last resort)'
        ],
        documentation: 'Document triggers, interventions tried, response'
      },

      sleepWakeReversal: {
        title: 'Sleep-Wake Cycle Restoration',
        heTitle: 'תיקון מחזור שינה-ערות',
        steps: [
          '1. Daytime interventions:',
          '   - Morning bright light (30 min)',
          '   - Keep awake 9 AM - 9 PM',
          '   - Physical activity',
          '   - Social engagement',
          '   - No naps after 2 PM',
          '2. Evening routine:',
          '   - Dim lights after 7 PM',
          '   - Quiet activities',
          '   - Warm milk/chamomile tea',
          '   - Comfortable temperature',
          '3. Medications:',
          '   - Melatonin 3-6mg at 9 PM',
          '   - Ramelteon 8mg if available',
          '   - Avoid sedatives if possible',
          '4. Morning routine:',
          '   - Wake same time daily',
          '   - Open curtains immediately',
          '   - Breakfast within 1 hour'
        ],
        timeline: 'Expect improvement in 5-7 days'
      },

      nightFalls: {
        title: 'Night Falls Prevention Protocol',
        heTitle: 'מניעת נפילות ליליות',
        immediate: [
          '1. Bed in lowest position',
          '2. Bed alarms activated',
          '3. Fall mats beside bed',
          '4. Call bell within reach',
          '5. Bedside commode if appropriate',
          '6. Non-slip socks',
          '7. Glasses and hearing aids accessible'
        ],
        scheduled: [
          '- Hourly rounding',
          '- Toileting schedule q2-3h',
          '- Pain assessment',
          '- Position changes',
          '- Ensure hydration'
        ],
        medications: [
          'Review for:',
          '- Sedatives',
          '- Antihypertensives',
          '- Diuretics (timing)',
          '- Anticholinergics',
          'Consider holding nighttime doses'
        ]
      }
    },

    emergencyDosing: {
      agitation: {
        'Haloperidol': {
          dose: '0.25-0.5mg PO/IM',
          onset: 'PO: 2-6h, IM: 20-30min',
          caution: 'QTc prolongation, EPS',
          contraindications: 'Parkinson\'s, Lewy body'
        },
        'Lorazepam': {
          dose: '0.25-0.5mg PO/IM/IV',
          onset: 'PO: 30-60min, IM: 15-30min, IV: 5-10min',
          caution: 'Respiratory depression, paradoxical agitation',
          contraindications: 'Respiratory failure, untreated sleep apnea'
        },
        'Quetiapine': {
          dose: '12.5-25mg PO',
          onset: '30-60min',
          caution: 'Orthostatic hypotension',
          contraindications: 'Severe cardiovascular disease'
        },
        'Olanzapine': {
          dose: '2.5-5mg PO/IM',
          onset: 'PO: 4-6h, IM: 15-45min',
          caution: 'Metabolic effects, sedation',
          contraindications: 'Avoid IM with benzos'
        }
      },

      pain: {
        'Morphine': {
          dose: '1-2mg IV/SC q2-4h',
          onset: 'IV: 5-10min, SC: 15-30min',
          caution: 'Start low in elderly',
          conversion: '1mg IV = 3mg PO'
        },
        'Fentanyl': {
          dose: '12.5-25mcg IV/SC',
          onset: 'IV: 2-3min, SC: 7-15min',
          caution: 'Accumulation in renal failure',
          conversion: '10mcg = 1mg morphine IV'
        },
        'Hydromorphone': {
          dose: '0.2-0.4mg IV/SC',
          onset: 'IV: 5min, SC: 15min',
          caution: '5x more potent than morphine',
          conversion: '0.2mg = 1mg morphine IV'
        },
        'Tramadol': {
          dose: '25-50mg PO',
          onset: '30-60min',
          caution: 'Seizure risk, serotonin syndrome',
          max: '300mg/day in elderly'
        }
      },

      cardiac: {
        'Rapid AFib': {
          firstLine: 'Diltiazem 0.25mg/kg IV over 2min',
          alternative: 'Metoprolol 2.5-5mg IV q5min x3',
          caution: 'Avoid if hypotensive or decompensated HF'
        },
        'Hypertensive urgency': {
          firstLine: 'Labetalol 10-20mg IV',
          alternative: 'Hydralazine 5-10mg IV',
          target: 'Reduce MAP by 10-20% in first hour'
        },
        'Chest pain': {
          immediate: 'ASA 325mg, Nitro 0.4mg SL q5min x3',
          morphine: '2-4mg IV for ongoing pain',
          caution: 'Avoid nitro if inferior MI with RV involvement'
        }
      },

      respiratory: {
        'Acute dyspnea': {
          positioning: 'Sit upright',
          oxygen: 'Target SpO2 88-92% in COPD, 94-98% otherwise',
          diuresis: 'Furosemide 40mg IV (or double home dose)',
          anxiolysis: 'Morphine 1-2mg IV for air hunger'
        },
        'COPD exacerbation': {
          bronchodilators: 'Albuterol + ipratropium nebs',
          steroids: 'Methylprednisolone 40mg IV or prednisone 40mg PO',
          antibiotics: 'If increased sputum purulence'
        }
      }
    },

    quickReferences: {
      labPanics: {
        'K+': { low: '<2.5', high: '>6.5', action: 'ECG, cardiac monitor' },
        'Na+': { low: '<120', high: '>160', action: 'Neuro checks, careful correction' },
        'Glucose': { low: '<40', high: '>500', action: 'Immediate treatment' },
        'Ca++': { low: '<7', high: '>13', action: 'ECG, symptoms check' },
        'Hgb': { low: '<7', high: '>20', action: 'Type & cross, symptoms' },
        'WBC': { low: '<1', high: '>30', action: 'Infection precautions' },
        'Platelets': { low: '<20', high: '>1000', action: 'Bleeding precautions' },
        'INR': { low: 'N/A', high: '>5', action: 'Hold warfarin, vitamin K if bleeding' }
      },

      ecgChanges: {
        'Hyperkalemia': ['Peaked T waves', 'Wide QRS', 'Loss of P waves'],
        'Hypokalemia': ['U waves', 'ST depression', 'T wave flattening'],
        'Hypercalcemia': ['Short QT', 'Osborn waves if severe'],
        'Hypocalcemia': ['Prolonged QT', 'T wave inversion'],
        'Digoxin toxicity': ['PVCs', 'AV block', 'Regularized AF']
      },

      phoneNumbers: {
        'Pharmacy': 'Ext. 1234',
        'Lab': 'Ext. 2345',
        'Radiology': 'Ext. 3456',
        'Security': 'Ext. 911',
        'Attending on-call': 'Pager #789',
        'Poison control': '1-800-222-1222'
      }
    },

    // Notification system for critical values
    alertSystem: {
      criticalAlerts: [],
      
      addAlert(type, message, severity = 'medium') {
        const alert = {
          id: Date.now(),
          type,
          message,
          severity,
          time: new Date().toLocaleTimeString(),
          acknowledged: false
        };
        
        this.criticalAlerts.unshift(alert);
        
        // Keep only last 20 alerts
        if (this.criticalAlerts.length > 20) {
          this.criticalAlerts = this.criticalAlerts.slice(0, 20);
        }
        
        // Show notification
        if (severity === 'high') {
          this.showHighPriorityAlert(alert);
        }
        
        return alert;
      },
      
      showHighPriorityAlert(alert) {
        // Visual alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'night-shift-alert high-priority';
        alertDiv.innerHTML = `
          <strong>⚠️ ${alert.type}</strong><br>
          ${alert.message}<br>
          <small>${alert.time}</small>
        `;
        alertDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #ff4444;
          color: white;
          padding: 15px;
          border-radius: 8px;
          z-index: 9999;
          animation: pulse 1s infinite;
        `;
        document.body.appendChild(alertDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => alertDiv.remove(), 10000);
        
        // Audio alert if enabled
        if (this.audioEnabled) {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUajn4rVjHwU5kNn1y3kqBSh6yO/bi');
          audio.play();
        }
      },
      
      acknowledgeAlert(alertId) {
        const alert = this.criticalAlerts.find(a => a.id === alertId);
        if (alert) {
          alert.acknowledged = true;
        }
      },
      
      getUnacknowledged() {
        return this.criticalAlerts.filter(a => !a.acknowledged);
      }
    }
  },

  // Initialize night shift mode
  init() {
    // Check for auto dark mode
    this.features.darkMode.checkAutoSwitch();
    setInterval(() => this.features.darkMode.checkAutoSwitch(), 60000); // Check every minute
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    console.log('🌙 Night Shift Toolkit initialized');
  },

  // Quick access methods
  startNightShift() {
    this.features.darkMode.enabled = true;
    this.features.darkMode.applyTheme();
    this.features.caffeinateTimer.start();
    return 'Night shift mode activated';
  },

  endNightShift() {
    this.features.darkMode.enabled = false;
    this.features.darkMode.applyTheme();
    this.features.caffeinateTimer.stop();
    return 'Night shift mode deactivated';
  },

  getProtocol(condition) {
    return this.features.quickProtocols[condition] || null;
  },

  getDosing(category, drug) {
    if (this.features.emergencyDosing[category]) {
      return this.features.emergencyDosing[category][drug] || null;
    }
    return null;
  }
};

export default NightShiftMode;