// Israeli Geriatrics Fellowship Curriculum
// Based on Israeli Medical Association and Ministry of Health requirements

export const israeliGeriatricsCurriculum = {
  overview: {
    duration: "24 months",
    institution: "Israeli Medical Association Certified Programs",
    accreditation: "Ministry of Health, State of Israel",
    description: "Comprehensive geriatrics fellowship training program following Israeli medical education standards",
    languages: ["Hebrew", "English", "Arabic"],
    examinations: {
      midterm: "Month 12 - Clinical and theoretical assessment",
      final: "Month 24 - Board certification examination",
      continuous: "Monthly case presentations and journal reviews"
    }
  },

  year1: {
    title: "בסיס ברפואה גריאטרית - Foundation Year in Geriatric Medicine",
    
    months1to3: {
      title: "חודשים 1-3: יסודות הגריאטריה - Core Geriatrics Foundation",
      rotationSite: "Geriatric Medicine Ward",
      supervisor: "Senior Geriatrician",
      
      learningObjectives: [
        "Master comprehensive geriatric assessment (CGA)",
        "Understanding physiological changes of aging",
        "Recognition and management of geriatric syndromes",
        "Polypharmacy and medication optimization",
        "Interdisciplinary team collaboration",
        "Family communication and cultural sensitivity"
      ],
      
      clinicalExperience: {
        inpatientDays: 60,
        outpatientClinics: 24,
        consultations: 150,
        nightCalls: 12,
        weekendCalls: 8
      },
      
      requiredReadings: [
        {
          type: "textbook",
          title: "Hazzard's Geriatric Medicine and Gerontology",
          chapters: ["1-8", "12-15", "23-25"],
          language: "English"
        },
        {
          type: "textbook", 
          title: "ספר הרפואה הגריאטרית הישראלית",
          chapters: ["1-5"],
          language: "Hebrew"
        },
        {
          type: "guidelines",
          title: "משרד הבריאות - הנחיות לטיפול בקשישים",
          sections: "All",
          language: "Hebrew"
        }
      ],
      
      keyPapers: [
        {
          title: "Comprehensive Geriatric Assessment: A Meta-Analysis",
          authors: "Ellis et al.",
          journal: "Lancet",
          year: 2017,
          pmid: "28735855",
          focus: "Evidence base for CGA"
        },
        {
          title: "Polypharmacy in the Elderly: Clinical Challenges",
          authors: "Masnoon et al.", 
          journal: "Clin Interv Aging",
          year: 2017,
          pmid: "28860741",
          focus: "Israeli prescribing patterns"
        },
        {
          title: "Frailty and the Elderly Patient",
          authors: "Morley et al.",
          journal: "J Am Geriatr Soc",
          year: 2018,
          pmid: "29468653",
          focus: "Frailty assessment tools"
        }
      ],
      
      practicalSkills: [
        "Comprehensive geriatric assessment technique",
        "Mental status examination (MMSE, MoCA, Hebrew versions)",
        "Functional status assessment (ADL, IADL)",
        "Medication reconciliation process",
        "Falls risk assessment",
        "Nutrition screening tools",
        "Depression screening (GDS Hebrew version)"
      ],
      
      assessmentMethods: {
        weekly: "Case presentations in Hebrew and English",
        monthly: "Written examination on core topics",
        practical: "Observed patient encounters",
        research: "Literature review on chosen geriatric syndrome"
      },

      hebrewTerminology: {
        comprehensiveAssessment: "הערכה גריאטרית מקיפה",
        polypharmacy: "רב תרופתיות",
        frailty: "שבירות",
        cognition: "קוגניציה",
        functionality: "תפקודיות",
        fallsPrevention: "מניעת נפילות",
        medication: "תרופות",
        elderlyPatient: "חולה קשיש"
      }
    },

    months4to6: {
      title: "חודשים 4-6: רוטציות תת-מקצועיות - Subspecialty Rotations",
      
      cardiology: {
        title: "לב וכלי דם בגיל מבוגר - Cardiovascular Disease in Aging",
        duration: "4 weeks",
        site: "Cardiology Department",
        
        topics: [
          "Hypertension management in elderly (Israeli guidelines)",
          "Heart failure with preserved ejection fraction",
          "Atrial fibrillation and anticoagulation decisions",
          "Coronary artery disease - conservative vs invasive",
          "Valvular disease in elderly",
          "Pacemaker indications and complications"
        ],
        
        readings: [
          {
            title: "2019 ESC Guidelines on Chronic Coronary Syndromes",
            focus: "Elderly-specific recommendations"
          },
          {
            title: "הנחיות הקרדיולוגיה הישראלית לטיפול בקשישים",
            language: "Hebrew"
          }
        ],
        
        skills: [
          "ECG interpretation in elderly",
          "Echocardiogram basics",
          "Exercise testing considerations",
          "Medication dosing adjustments"
        ]
      },
      
      neurology: {
        title: "נוירולוגיה גריאטרית - Geriatric Neurology", 
        duration: "4 weeks",
        site: "Neurology Department / Memory Clinic",
        
        topics: [
          "Dementia diagnosis and management",
          "Mild cognitive impairment",
          "Parkinson's disease in elderly",
          "Stroke prevention and rehabilitation",
          "Seizures in elderly",
          "Peripheral neuropathy"
        ],
        
        readings: [
          {
            title: "2020 Alzheimer's Association Guidelines",
            focus: "Diagnostic criteria and treatment"
          },
          {
            title: "Israeli Dementia Guidelines - Ministry of Health",
            language: "Hebrew"
          }
        ],
        
        skills: [
          "Cognitive assessment battery",
          "Neurological examination in elderly",
          "Interpretation of brain imaging",
          "Family counseling for dementia"
        ]
      },

      psychiatry: {
        title: "פסיכיאטריה גריאטרית - Geriatric Psychiatry",
        duration: "4 weeks", 
        site: "Geriatric Psychiatry Unit",
        
        topics: [
          "Late-life depression diagnosis and treatment",
          "Anxiety disorders in elderly", 
          "Psychosis and behavioral symptoms of dementia",
          "Substance abuse in elderly",
          "Suicide risk assessment",
          "Psychopharmacology in aging"
        ],
        
        readings: [
          {
            title: "Late-Life Depression: Evidence-Based Treatment",
            journal: "Psychiatr Clin North Am"
          },
          {
            title: "הנחיות פסיכיאטריה גריאטרית - האגודה הישראלית",
            language: "Hebrew"
          }
        ],
        
        skills: [
          "Mental status examination",
          "Suicide risk assessment",
          "Antidepressant selection and dosing",
          "Behavioral intervention planning"
        ]
      }
    },

    months7to9: {
      title: "חודשים 7-9: שיקום ורפואה פליאטיבית - Rehabilitation & Palliative Care",
      
      rehabilitation: {
        title: "שיקום גריאטרי - Geriatric Rehabilitation",
        duration: "6 weeks",
        site: "Rehabilitation Medicine Department",
        
        topics: [
          "Post-stroke rehabilitation in elderly",
          "Orthopedic rehabilitation (hip fracture, joint replacement)",
          "Cardiac rehabilitation adaptations",
          "Pulmonary rehabilitation",
          "Cognitive rehabilitation",
          "Return to independence assessment"
        ],
        
        teamMembers: [
          "Physiatrist",
          "Physical Therapist", 
          "Occupational Therapist",
          "Speech-Language Pathologist",
          "Social Worker",
          "Dietitian"
        ],
        
        assessmentTools: [
          "FIM (Functional Independence Measure)",
          "Barthel Index",
          "Berg Balance Scale", 
          "Timed Up and Go",
          "6-minute walk test"
        ]
      },
      
      palliativeCare: {
        title: "טיפול פליאטיבי בגריאטריה - Geriatric Palliative Care",
        duration: "6 weeks",
        site: "Palliative Care Unit / Hospice",
        
        topics: [
          "Goals of care discussions",
          "Advance directives in Israeli context",
          "Pain management in elderly",
          "Symptom control (nausea, dyspnea, delirium)",
          "Family support and bereavement",
          "Ethical issues in end-of-life care"
        ],
        
        culturalConsiderations: [
          "Jewish religious laws (Halacha) and medical decisions",
          "Islamic perspectives on end-of-life care",
          "Christian viewpoints in Israeli context",
          "Secular Israeli cultural values"
        ],
        
        legalFramework: [
          "Israeli Patient Rights Law",
          "Dying Patient Law (2005)",
          "Advanced Medical Directive Law",
          "Natural Death Act"
        ]
      }
    },

    months10to12: {
      title: "חודשים 10-12: מחקר ואיכות - Research Methods & Quality Improvement",
      
      researchMethods: {
        topics: [
          "Clinical research design for geriatric populations",
          "Biostatistics for aging research", 
          "Ethical considerations in elderly research",
          "Grant writing for Israeli funding bodies",
          "Publication in Hebrew and English medical journals"
        ],
        
        practicalProject: {
          requirement: "Original research project",
          timeline: "3 months",
          deliverables: [
            "Research proposal in Hebrew/English",
            "IRB approval from Helsinki Committee",
            "Data collection and analysis",
            "Abstract for Israeli Medical Association conference",
            "Manuscript submission to Israeli medical journal"
          ]
        }
      },
      
      qualityImprovement: {
        topics: [
          "Quality metrics in geriatric care",
          "Israeli healthcare quality indicators",
          "Lean methodology in geriatric medicine",
          "Patient safety in elderly populations",
          "Cost-effectiveness in geriatric interventions"
        ],
        
        project: {
          title: "QI project in fellow's primary site",
          duration: "3 months",
          focus: "Practical improvement in patient care"
        }
      }
    }
  },

  year2: {
    title: "שנה ב': התמחות מתקדמת - Advanced Specialization Year",
    
    months13to15: {
      title: "דמנציה ובעיות קוגניטיביות - Advanced Dementia Care",
      
      clinicalExperience: {
        memoryClinic: "8 weeks full-time",
        behavioralUnit: "4 weeks",
        research: "4 weeks"
      },
      
      advancedTopics: [
        "Biomarkers in dementia diagnosis",
        "Neuroimaging interpretation", 
        "Clinical trials in dementia",
        "Behavioral and psychological symptoms",
        "Caregiver support programs",
        "Legal capacity assessment"
      ],
      
      israeliContext: [
        "Israeli dementia prevalence studies",
        "Multicultural considerations (Jewish, Arab, Russian immigrants)",
        "National dementia strategy",
        "Israeli dementia research contributions"
      ]
    },

    months16to18: {
      title: "רפואת חירום גריאטרית - Geriatric Emergency Medicine",
      
      rotations: [
        {
          site: "Emergency Department", 
          duration: "8 weeks",
          focus: "Elderly-specific presentations and management"
        },
        {
          site: "Acute Geriatric Unit",
          duration: "4 weeks", 
          focus: "Rapid assessment and discharge planning"
        }
      ],
      
      competencies: [
        "Atypical presentations in elderly",
        "Medication reconciliation in ED",
        "Delirium prevention and management",
        "Falls and trauma in elderly",
        "Discharge planning and safety"
      ]
    },

    months19to21: {
      title: "מנהיגות והוראה - Leadership & Teaching",
      
      teachingResponsibilities: [
        "Supervise Year 1 geriatrics fellows",
        "Lecture to medical students",
        "Case-based teaching rounds",
        "Journal club leadership",
        "Continuing medical education presentations"
      ],
      
      administrativeExperience: [
        "Quality committee participation",
        "Policy development",
        "Healthcare economics",
        "Electronic health record optimization"
      ]
    },

    months22to24: {
      title: "הכנה לבחינות וקריירה - Board Preparation & Career Development",
      
      boardExamPreparation: {
        written: {
          date: "Month 23",
          format: "Multiple choice and short answer in Hebrew/English",
          topics: "All geriatric medicine competencies",
          passingScore: "70%"
        },
        oral: {
          date: "Month 24",
          format: "Clinical case presentations and viva voce", 
          panel: "3 board-certified geriatricians",
          duration: "60 minutes"
        }
      },
      
      careerPlanning: [
        "Academic vs clinical career paths",
        "Research opportunities in Israeli institutions",
        "Private practice considerations",
        "International collaboration opportunities",
        "Continuing medical education requirements"
      ]
    }
  },

  assessmentFramework: {
    competencyAreas: [
      {
        area: "Patient Care",
        weight: "25%",
        assessment: "Direct observation, case logs"
      },
      {
        area: "Medical Knowledge", 
        weight: "25%",
        assessment: "Written exams, oral presentations"
      },
      {
        area: "Practice-Based Learning",
        weight: "15%",
        assessment: "Research project, QI initiatives"
      },
      {
        area: "Interpersonal Communication",
        weight: "15%",
        assessment: "Patient/family feedback, team evaluations"
      },
      {
        area: "Professionalism",
        weight: "10%",
        assessment: "360-degree feedback"
      },
      {
        area: "Systems-Based Practice",
        weight: "10%",
        assessment: "Administrative projects, policy work"
      }
    ],
    
    portfolioRequirements: [
      "50 documented comprehensive geriatric assessments",
      "25 family meetings with documentation", 
      "Research project with publication submission",
      "Quality improvement project with outcomes",
      "Teaching portfolio with student evaluations",
      "Continuing education log (100+ hours)"
    ]
  },

  resources: {
    israeliJournals: [
      "Harefuah - הרפואה (Journal of the Israel Medical Association)",
      "Israel Medical Association Journal (IMAJ)",
      "Israeli Journal of Emergency Medicine"
    ],
    
    professionalOrganizations: [
      "Israeli Geriatrics Association", 
      "Israel Medical Association",
      "Israeli Society of Internal Medicine",
      "International Association of Gerontology and Geriatrics"
    ],
    
    conferences: [
      {
        name: "Israeli Geriatrics Society Annual Meeting",
        frequency: "Annual",
        location: "Tel Aviv",
        requirement: "Mandatory attendance both years"
      },
      {
        name: "International Conference on Alzheimer's Disease", 
        frequency: "Annual",
        support: "Travel grant available"
      }
    ],
    
    libraries: [
      "National Library of Medicine (Hebrew interface)",
      "Hadassah Medical Library",
      "Tel Aviv University Medical Library",
      "Hebrew University Medical Library"
    ]
  },

  graduationRequirements: {
    clinical: [
      "Complete all required rotations",
      "Pass monthly assessments",
      "Achieve competency in all 6 areas",
      "Complete portfolio requirements"
    ],
    
    academic: [
      "Pass written board examination",
      "Pass oral board examination", 
      "Complete research project",
      "Present at national conference"
    ],
    
    professional: [
      "No disciplinary actions",
      "Positive evaluations from supervisors",
      "Demonstrate cultural competency",
      "Show commitment to lifelong learning"
    ]
  }
};

// Helper functions for curriculum management
export class CurriculumManager {
  constructor() {
    this.curriculum = israeliGeriatricsCurriculum;
    this.progress = this.loadProgress();
  }

  getCurrentMonth(startDate) {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 30);
  }

  getCurrentRotation(month) {
    if (month <= 3) return this.curriculum.year1.months1to3;
    if (month <= 6) return this.curriculum.year1.months4to6;
    if (month <= 9) return this.curriculum.year1.months7to9;
    if (month <= 12) return this.curriculum.year1.months10to12;
    if (month <= 15) return this.curriculum.year2.months13to15;
    if (month <= 18) return this.curriculum.year2.months16to18;
    if (month <= 21) return this.curriculum.year2.months19to21;
    if (month <= 24) return this.curriculum.year2.months22to24;
    return null;
  }

  getRequiredReadings(month) {
    const rotation = this.getCurrentRotation(month);
    return rotation?.requiredReadings || [];
  }

  getKeyPapers(month) {
    const rotation = this.getCurrentRotation(month);
    return rotation?.keyPapers || [];
  }

  markCompleted(type, item) {
    if (!this.progress[type]) {
      this.progress[type] = new Set();
    }
    this.progress[type].add(item);
    this.saveProgress();
  }

  isCompleted(type, item) {
    return this.progress[type]?.has(item) || false;
  }

  getCompletionRate(type) {
    const total = this.getTotalItems(type);
    const completed = this.progress[type]?.size || 0;
    return total > 0 ? (completed / total) * 100 : 0;
  }

  getTotalItems(type) {
    // Calculate total items based on curriculum structure
    let total = 0;
    
    if (type === 'readings') {
      Object.values(this.curriculum.year1).forEach(period => {
        if (period.requiredReadings) total += period.requiredReadings.length;
      });
      Object.values(this.curriculum.year2).forEach(period => {
        if (period.requiredReadings) total += period.requiredReadings.length;
      });
    }
    
    return total;
  }

  loadProgress() {
    try {
      const progress = localStorage.getItem('fellowshipProgress');
      if (progress) {
        const parsed = JSON.parse(progress);
        // Convert arrays back to Sets
        Object.keys(parsed).forEach(key => {
          parsed[key] = new Set(parsed[key]);
        });
        return parsed;
      }
    } catch (error) {
      console.error('Error loading fellowship progress:', error);
    }
    return {};
  }

  saveProgress() {
    try {
      // Convert Sets to arrays for storage
      const toSave = {};
      Object.keys(this.progress).forEach(key => {
        toSave[key] = Array.from(this.progress[key]);
      });
      localStorage.setItem('fellowshipProgress', JSON.stringify(toSave));
    } catch (error) {
      console.error('Error saving fellowship progress:', error);
    }
  }

  exportProgress() {
    return {
      curriculum: this.curriculum.overview,
      progress: this.progress,
      completionRates: {
        readings: this.getCompletionRate('readings'),
        papers: this.getCompletionRate('papers'),
        skills: this.getCompletionRate('skills')
      }
    };
  }
}

export default israeliGeriatricsCurriculum;