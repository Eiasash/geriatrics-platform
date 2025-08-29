// SOAP Note Generator with EMR Templates and Billing Codes
// Auto-generates documentation from assessments

export const SOAPNoteGenerator = {
  templates: {
    geriatrics: {
      subjective: [
        'Chief Complaint',
        'History of Present Illness (with functional context)',
        'Review of Systems (pertinent positives/negatives)',
        'Past Medical History',
        'Medications (reconciled)',
        'Allergies',
        'Social History (living situation, support, substances)',
        'Functional Status (ADLs/IADLs)',
        'Caregiver Input'
      ],
      objective: [
        'Vital Signs',
        'Physical Examination',
        'Cognitive Screen (MMSE/MoCA/Mini-Cog)',
        'Functional Assessment (Gait, balance, strength)',
        'Laboratory Results',
        'Imaging Results',
        'Consultant Notes'
      ],
      assessment: [
        'Problem List (by priority)',
        'Geriatric Syndromes Identified',
        'Medication Issues (polypharmacy, interactions)',
        'Functional Impairments',
        'Cognitive Status',
        'Goals of Care Status'
      ],
      plan: [
        'Medical Interventions',
        'Medication Changes/Deprescribing',
        'Non-pharmacologic Interventions',
        'Consultations',
        'Diagnostic Studies',
        'Therapy Services (PT/OT/ST)',
        'Discharge Planning',
        'Follow-up',
        'Advanced Care Planning'
      ]
    },

    focused: {
      falls: {
        subjective: ['Fall circumstances', 'Previous falls', 'Symptoms before/after', 'Medications', 'Fear of falling'],
        objective: ['Orthostatic vitals', 'Neuro exam', 'Gait assessment', 'Vision/hearing', 'Medication review'],
        assessment: ['Fall risk factors', 'Injury assessment', 'Contributing medications'],
        plan: ['PT/OT evaluation', 'Home safety', 'Medication adjustment', 'Vitamin D', 'Follow-up']
      },
      
      delirium: {
        subjective: ['Baseline cognition', 'Acute changes', 'Precipitants', 'Medications', 'Symptoms timeline'],
        objective: ['CAM assessment', 'Vital signs', 'Physical exam', 'Labs', 'Medication list'],
        assessment: ['Delirium present/absent', 'Precipitating factors', 'Severity'],
        plan: ['Treat underlying cause', 'Environmental interventions', 'Medication review', 'Family involvement']
      },
      
      dementia: {
        subjective: ['Memory complaints', 'Functional decline', 'Behavioral symptoms', 'Safety concerns', 'Caregiver stress'],
        objective: ['Cognitive testing', 'Functional assessment', 'Neurological exam', 'Labs', 'Imaging'],
        assessment: ['Dementia stage', 'Type if known', 'BPSD', 'Safety issues', 'Caregiver burden'],
        plan: ['Medications', 'Non-pharm interventions', 'Safety measures', 'Support services', 'Advanced planning']
      }
    }
  },

  generateNote(patientData, template = 'geriatrics') {
    const selectedTemplate = this.templates[template] || this.templates.geriatrics;
    let note = '';

    // SUBJECTIVE
    note += '=== SUBJECTIVE ===\n';
    if (patientData.subjective) {
      selectedTemplate.subjective.forEach(item => {
        if (patientData.subjective[item]) {
          note += `${item}: ${patientData.subjective[item]}\n`;
        }
      });
    }

    // OBJECTIVE
    note += '\n=== OBJECTIVE ===\n';
    if (patientData.vitals) {
      note += `Vital Signs: T ${patientData.vitals.temp}°C, BP ${patientData.vitals.bp}, `;
      note += `HR ${patientData.vitals.hr}, RR ${patientData.vitals.rr}, O2 ${patientData.vitals.o2}%\n`;
    }
    
    if (patientData.exam) {
      note += 'Physical Examination:\n';
      Object.entries(patientData.exam).forEach(([system, findings]) => {
        note += `  ${system}: ${findings}\n`;
      });
    }

    if (patientData.cognitive) {
      note += `Cognitive Screen: ${patientData.cognitive.test} score ${patientData.cognitive.score}\n`;
    }

    if (patientData.labs) {
      note += 'Laboratory Results:\n';
      Object.entries(patientData.labs).forEach(([test, result]) => {
        note += `  ${test}: ${result}\n`;
      });
    }

    // ASSESSMENT
    note += '\n=== ASSESSMENT ===\n';
    if (patientData.problems) {
      note += 'Problem List:\n';
      patientData.problems.forEach((problem, idx) => {
        note += `${idx + 1}. ${problem.name}`;
        if (problem.status) note += ` - ${problem.status}`;
        if (problem.details) note += ` (${problem.details})`;
        note += '\n';
      });
    }

    if (patientData.geriatricSyndromes) {
      note += '\nGeriatric Syndromes:\n';
      patientData.geriatricSyndromes.forEach(syndrome => {
        note += `- ${syndrome}\n`;
      });
    }

    // PLAN
    note += '\n=== PLAN ===\n';
    if (patientData.plan) {
      Object.entries(patientData.plan).forEach(([category, items]) => {
        note += `${category}:\n`;
        if (Array.isArray(items)) {
          items.forEach(item => note += `- ${item}\n`);
        } else {
          note += `- ${items}\n`;
        }
      });
    }

    // Add billing codes
    note += '\n=== BILLING ===\n';
    note += this.generateBillingCodes(patientData);

    return note;
  },

  generateBillingCodes(patientData) {
    const codes = [];
    
    // Evaluation and Management
    if (patientData.visitType === 'initial') {
      codes.push('99204/99205 - New patient comprehensive');
    } else if (patientData.visitType === 'follow-up') {
      codes.push('99214/99215 - Established patient comprehensive');
    }

    // Cognitive Assessment
    if (patientData.cognitive) {
      codes.push('99483 - Cognitive assessment and care planning');
    }

    // Advanced Care Planning
    if (patientData.advancedCarePlanning) {
      codes.push('99497 - ACP first 30 min');
      codes.push('99498 - ACP additional 30 min (if applicable)');
    }

    // Annual Wellness Visit
    if (patientData.wellnessVisit) {
      codes.push('G0438 - Initial AWV');
      codes.push('G0439 - Subsequent AWV');
    }

    // Transitional Care
    if (patientData.transitionalCare) {
      codes.push('99495 - TCM moderate complexity');
      codes.push('99496 - TCM high complexity');
    }

    // Chronic Care Management
    if (patientData.chronicCare) {
      codes.push('99490 - CCM 20 min');
      codes.push('99439 - CCM additional 20 min');
    }

    return codes.join('\n');
  },

  // Quick templates for common scenarios
  quickTemplates: {
    admissionOrders: [
      'Admit to Geriatrics Service',
      'Diagnosis: [Primary diagnosis]',
      'Condition: Stable/Guarded/Critical',
      'Code Status: Full/DNR/DNI/Comfort',
      'Allergies: NKDA/List',
      'Diet: Regular/Cardiac/Diabetic/Mechanical soft/Pureed/NPO',
      'Activity: Bedrest/OOB to chair/Ambulate with assist/Fall precautions',
      'Vital Signs: Per routine/Q4H/Q2H',
      'I/O: Strict/Routine',
      'Daily weight',
      'DVT Prophylaxis: Enoxaparin 40mg SC daily/SCDs',
      'GI Prophylaxis: Not indicated in most elderly',
      'Nursing: Fall precautions, aspiration precautions',
      'PT/OT evaluation',
      'Social work consultation',
      'Labs: CBC, BMP, LFTs in AM',
      'Medications: Reconcile home medications'
    ],

    dischargeInstructions: {
      template: `
DISCHARGE INSTRUCTIONS - GERIATRICS

Diagnosis: [List]

Medications:
- NEW: [List with dosing]
- STOPPED: [List]
- CHANGED: [List]
- CONTINUE: [List]

Activity:
- Fall precautions
- Use walker/cane as instructed
- PT exercises as taught

Diet: [Specify]

Follow-up:
- PCP: [Date/Time]
- Specialists: [List]
- Labs: [If needed]

Return to ED if:
- Confusion or change in mental status
- Falls
- Chest pain or trouble breathing
- Fever > 100.4°F
- Unable to take medications or keep down fluids

Home Health: [If arranged]
DME: [If ordered]

Emergency Contact: [Name, relationship, phone]
      `
    },

    progressNote: {
      template: `
Date/Time: [Auto-fill]
Subjective: [Overnight events, symptoms, concerns]
Objective: 
  VS: [Auto-populate]
  Exam: [Focused findings]
  Labs: [New results]
Assessment/Plan:
  #1. [Problem] - [Status] - [Plan]
  #2. [Problem] - [Status] - [Plan]
  [Continue for all active problems]
Disposition: Continue current level of care
Code Status: [Confirm]
      `
    }
  },

  // Auto-populate from calculators
  integrateCalculatorResults(note, calculatorResults) {
    if (calculatorResults.mmse) {
      note = note.replace('[COGNITIVE_SCORE]', `MMSE: ${calculatorResults.mmse}/30`);
    }
    
    if (calculatorResults.moca) {
      note = note.replace('[COGNITIVE_SCORE]', `MoCA: ${calculatorResults.moca}/30`);
    }
    
    if (calculatorResults.cam) {
      note = note.replace('[DELIRIUM_SCREEN]', `CAM: ${calculatorResults.cam ? 'Positive' : 'Negative'}`);
    }
    
    if (calculatorResults.morsefall) {
      note = note.replace('[FALL_RISK]', `Morse Fall Scale: ${calculatorResults.morsefall} (${calculatorResults.morsefallRisk})`);
    }
    
    return note;
  },

  // Export to EMR formats
  exportToEMR(note, format = 'epic') {
    const formatters = {
      epic: this.formatForEpic,
      cerner: this.formatForCerner,
      allscripts: this.formatForAllscripts,
      plain: (n) => n
    };
    
    return formatters[format](note);
  },

  formatForEpic(note) {
    // Epic-specific formatting
    return note.replace(/===/g, '***')
               .replace(/\n-/g, '\n•');
  },

  formatForCerner(note) {
    // Cerner-specific formatting
    return note.replace(/===/g, '---')
               .replace(/\n/g, '\r\n');
  },

  formatForAllscripts(note) {
    // Allscripts-specific formatting
    return note.toUpperCase();
  },

  // Save templates locally
  saveCustomTemplate(name, template) {
    const custom = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    custom[name] = template;
    localStorage.setItem('customTemplates', JSON.stringify(custom));
  },

  loadCustomTemplates() {
    return JSON.parse(localStorage.getItem('customTemplates') || '{}');
  }
};

export default SOAPNoteGenerator;