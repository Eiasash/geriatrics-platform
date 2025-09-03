// Israeli Healthcare System Educational Module
// Comprehensive guide for geriatrics fellowship in Israeli medical system

class IsraeliHealthcareEducation {
  constructor() {
    this.kupotHolim = {
      clalit: {
        name: 'כללית',
        english: 'Clalit',
        marketShare: '52%',
        geriatricServices: {
          communityGeriatrician: 'Available in major cities',
          dayHospitals: ['Tel Aviv', 'Jerusalem', 'Haifa', 'Beer Sheva'],
          homeVisits: 'For homebound patients',
          cognitiveAssessment: 'Memory clinics in major centers'
        },
        coverage: {
          anticoagulation: 'CHA2DS2-VASc ≥2',
          dementiasMeds: 'Aricept, Exelon, Memantine covered',
          physiotherapy: '12 sessions/year standard',
          occupationalTherapy: 'With geriatrician referral'
        }
      },
      maccabi: {
        name: 'מכבי',
        english: 'Maccabi',
        marketShare: '25%',
        geriatricServices: {
          digitalHealth: 'Advanced telemedicine platform',
          preventiveCare: 'Comprehensive geriatric screening',
          familyMedicine: 'GP-centered geriatric care'
        }
      },
      meuhedet: {
        name: 'מאוחדת',
        english: 'Meuhedet',
        marketShare: '8%'
      },
      leumit: {
        name: 'לאומית',
        english: 'Leumit',
        marketShare: '9%'
      }
    };

    this.bituachLeumi = {
      attendanceAllowance: {
        hebrew: 'גמלת סיעוד',
        eligibility: 'ADL dependency or cognitive impairment',
        levels: {
          '3.5hours': '₪1,200/month',
          '6.75hours': '₪2,400/month',
          '15hours': '₪4,800/month',
          '22.5hours': '₪7,200/month'
        },
        assessment: 'Medical committee evaluation',
        applications: 'Submit through treating physician'
      },
      mobilityBenefit: {
        hebrew: 'גמלת ניידות',
        eligibility: 'Significant mobility impairment',
        benefits: ['Wheelchair funding', 'Vehicle modifications', 'Public transport subsidy']
      },
      disabilityBenefit: {
        hebrew: 'קצבת נכות',
        levels: ['20-39%', '40-59%', '60-74%', '75-100%'],
        geriatricConsiderations: 'Functional rather than diagnostic focus'
      }
    };

    this.israeliGuidelines = this.initializeGuidelines();
    this.culturalCompetency = this.initializeCulturalContext();
  }

  initializeGuidelines() {
    return {
      anticoagulation: {
        title: 'Israeli Cardiology Society AF Guidelines 2023',
        keyPoints: [
          'CHA2DS2-VASc ≥2 for anticoagulation',
          'DOACs preferred over warfarin in most cases',
          'Sal coverage for score ≥2',
          'Consider patient preferences and bleeding risk'
        ],
        israeliSpecific: 'Strong preference for DOACs due to INR monitoring challenges'
      },
      fallsPrevention: {
        title: 'MOH Falls Prevention Protocol',
        mandatoryAssessment: 'All hospitalized patients ≥65',
        tools: ['Morse Fall Scale with Israeli additions', 'Vitamin D screening'],
        interventions: [
          'Hip protectors for high-risk patients',
          'Physiotherapy referral within 24h',
          'Medication review focusing on psychotropics'
        ]
      },
      cognitiveTesting: {
        validated: ['Hebrew MMSE', 'Hebrew MoCA', 'Clock drawing test'],
        considerations: [
          'Educational level adjustment',
          'Language of testing (Hebrew/Arabic/Russian)',
          'Cultural appropriateness of test items'
        ]
      },
      endOfLifeCare: {
        rabbinicConsultation: 'Available in all major hospitals',
        familyInvolvement: 'Often extended family decision-making',
        culturalSensitivities: 'Religious observance considerations'
      }
    };
  }

  initializeCulturalContext() {
    return {
      demographics: {
        jewishElderly: {
          subgroups: ['Ashkenazi', 'Sephardic', 'Mizrahi', 'Ethiopian', 'Russian-speaking'],
          healthBeliefs: 'Generally Western medicine accepting',
          familyStructure: 'Strong family involvement in care decisions'
        },
        arabElderly: {
          considerations: 'Language barriers, family-centered decisions',
          healthBeliefs: 'Mix of traditional and modern approaches',
          genderIssues: 'Same-gender providers often preferred'
        },
        russianSpeaking: {
          size: '~1 million elderly immigrants',
          characteristics: 'High education level, skeptical of authority',
          languageNeeds: 'Russian-speaking staff essential'
        }
      },
      religiousConsiderations: {
        shabbatObservance: 'Friday evening to Saturday evening',
        dietaryLaws: 'Kosher food in religious patients',
        endOfLifeDecisions: 'Rabbinic consultation often requested',
        familyInvolvement: 'Strong tradition of family care'
      }
    };
  }

  // Educational modules for fellowship training

  async generateKupahNavigationExercise(kupah = 'clalit') {
    const selectedKupah = this.kupotHolim[kupah];
    
    const scenario = `
**EDUCATIONAL SCENARIO: Navigating ${selectedKupah.english} Healthcare System**

*Case Background:*
You are a geriatrics fellow working in a ${selectedKupah.english} community clinic. 

*Patient Scenario:*
Mrs. Rachel Cohen, 78, presents with:
- Recent falls (2 in past month)
- Memory complaints from family
- Polypharmacy (12 medications)
- Lives alone, daughter concerned about safety

*Learning Objectives:*
1. Navigate ${selectedKupah.english} referral system
2. Understand coverage policies
3. Coordinate multidisciplinary care
4. Apply Israeli geriatric assessment tools

*Discussion Questions:*
1. Which geriatric services are available through ${selectedKupah.english}?
2. What assessments would you prioritize?
3. How would you involve the family appropriately?
4. What cultural considerations apply?

*Coverage Considerations:*
${JSON.stringify(selectedKupah.coverage || {}, null, 2)}

---
*This is an educational exercise for fellowship training purposes only.*
    `;

    return {
      scenario,
      type: 'healthcare-navigation',
      focusArea: 'israeli-system-knowledge',
      difficulty: 'intermediate'
    };
  }

  generateBituachLeumiAssessment() {
    return {
      title: 'Bituach Leumi Benefits Assessment Training',
      description: 'Learn to evaluate patients for Israeli social benefits',
      
      case: `
**EDUCATIONAL CASE: Bituach Leumi Benefits Evaluation**

*Patient:* Mr. Moshe Levy, 82 years old
*Presentation:* Moderate dementia, requiring supervision for ADLs
*Family request:* Help with application for גמלת סיעוד (attendance allowance)

*Assessment Framework:*

1. **Functional Assessment**
   - Katz ADL Scale
   - Lawton IADL Scale  
   - Cognitive testing (Hebrew MMSE)
   
2. **Documentation Requirements**
   - Medical summary
   - Functional status report
   - Supporting family statement
   
3. **Benefit Calculations**
   ${Object.entries(this.bituachLeumi.attendanceAllowance.levels)
     .map(([hours, amount]) => `   - ${hours}: ${amount}`)
     .join('\n')}

*Learning Points:*
- Medical committee evaluation process
- Documentation standards
- Family counseling regarding expectations
- Appeal process if denied

*Cultural Considerations:*
- Family shame regarding dependency
- Expectation of family caregiving
- Financial stress factors

---
*Educational exercise - always involve qualified social worker for actual applications*
      `,
      
      assessment: {
        questions: [
          'What functional deficits qualify for attendance allowance?',
          'How do you document cognitive impairment for Bituach Leumi?',
          'What role does family support play in benefit determination?'
        ]
      }
    };
  }

  generateCulturalCompetencyScenario(population = 'russian-speaking') {
    const scenarios = {
      'russian-speaking': `
**CULTURAL COMPETENCY EXERCISE: Russian-Speaking Elderly Patient**

*Background:* 
Large wave of immigration from former Soviet Union (1990s) created unique population

*Patient Profile:*
- 75-year-old woman from Ukraine (immigrated 1995)
- Highly educated (former engineer)
- Limited Hebrew, fluent Russian
- Skeptical of medical authority
- Strong family involvement in decisions

*Clinical Challenges:*
1. **Communication barriers**
   - Need Russian-speaking interpreter
   - Technical medical terminology
   - Cultural concepts don't translate

2. **Health beliefs**
   - Soviet medical system experience
   - Preference for specialists over GPs
   - Skepticism of mental health services

3. **Family dynamics**
   - Adult children as advocates
   - Intergenerational cultural conflicts
   - Financial concerns prominent

*Learning Objectives:*
- Effective cross-cultural communication
- Working with interpreters
- Addressing health beliefs respectfully
- Involving family appropriately

*Educational Discussion Points:*
- How do you build trust with skeptical patients?
- What resources exist for Russian-speaking elderly?
- How do you navigate family-provider relationships?
      `,
      
      'arab-israeli': `
**CULTURAL COMPETENCY EXERCISE: Arab-Israeli Elderly Patient**

*Community Context:*
- 20% of Israeli population
- Distinct cultural and linguistic needs
- Strong family-centered care traditions

*Patient Profile:*
- 70-year-old Arab woman from northern Israel
- Arabic-speaking (limited Hebrew)
- Lives in extended family compound
- Traditional gender role expectations

*Cultural Considerations:*
1. **Gender sensitivity**
   - Preference for female physicians
   - Modest examination approaches
   - Male family member involvement

2. **Decision-making patterns**
   - Family consultation required
   - Elder son often spokesperson
   - Religious leader input valued

3. **Health beliefs**
   - Traditional medicine alongside modern
   - Fatalistic attitudes common
   - Strong community support systems

*Educational Focus:*
- Respectful cross-cultural care
- Gender-sensitive practice
- Family-centered decision making
- Community resource utilization
      `
    };

    return {
      scenario: scenarios[population] || scenarios['russian-speaking'],
      type: 'cultural-competency',
      population,
      learningObjectives: [
        'Develop cultural sensitivity',
        'Practice inclusive communication',
        'Navigate family dynamics',
        'Utilize community resources'
      ]
    };
  }

  generateSystemNavigationQuiz() {
    return {
      title: 'Israeli Healthcare System Knowledge Assessment',
      questions: [
        {
          question: 'What CHA2DS2-VASc score typically qualifies for Kupah anticoagulation coverage?',
          options: ['≥1', '≥2', '≥3', '≥4'],
          correct: 1,
          explanation: 'Most Israeli Kupot cover anticoagulation for CHA2DS2-VASc ≥2, following international guidelines.'
        },
        {
          question: 'Which Bituach Leumi benefit is most relevant for elderly with mobility impairments?',
          options: ['גמלת סיעוד', 'גמלת ניידות', 'קצבת נכות', 'All of the above'],
          correct: 3,
          explanation: 'Mobility-impaired elderly may qualify for multiple benefits: attendance allowance for care needs, mobility benefit for equipment, and disability benefit for income support.'
        },
        {
          question: 'What is the largest Kupah in Israel by membership?',
          options: ['Maccabi', 'Clalit', 'Meuhedet', 'Leumit'],
          correct: 1,
          explanation: 'Clalit serves approximately 52% of Israeli population.'
        },
        {
          question: 'In Israeli geriatric care, what is the primary role of the family?',
          options: ['Medical decisions only', 'Financial responsibility', 'Active care participation', 'Minimal involvement'],
          correct: 2,
          explanation: 'Israeli culture emphasizes strong family involvement in elderly care, with active participation in both decision-making and caregiving.'
        }
      ]
    };
  }

  // Integration methods for existing platform
  integrateWithExistingPlatform() {
    return {
      calculatorAdditions: {
        'israeli-frailty': 'CFS with Bituach Leumi benefit calculator',
        'kupah-coverage': 'Medication/service coverage checker',
        'cultural-assessment': 'Cultural competency self-assessment'
      },
      
      caseEnhancements: {
        israeliContext: true,
        kupahNavigation: true,
        culturalScenarios: true,
        benefitsAssessment: true
      },
      
      resourceLinks: {
        mohGuidelines: 'https://www.health.gov.il/',
        bituachLeumi: 'https://www.btl.gov.il/',
        geriatricsSociety: 'Israeli Geriatrics Society resources'
      }
    };
  }

  // Assessment and certification
  generateCertificationExam() {
    return {
      title: 'Israeli Geriatric Healthcare Competency Assessment',
      sections: [
        {
          name: 'Healthcare System Navigation',
          questions: 15,
          topics: ['Kupah services', 'Referral processes', 'Coverage policies']
        },
        {
          name: 'Social Benefits Assessment',
          questions: 10,
          topics: ['Bituach Leumi applications', 'Functional assessment', 'Documentation']
        },
        {
          name: 'Cultural Competency',
          questions: 10,
          topics: ['Cross-cultural communication', 'Family dynamics', 'Religious considerations']
        },
        {
          name: 'Israeli Clinical Guidelines',
          questions: 15,
          topics: ['MOH protocols', 'Evidence-based practices', 'Local adaptations']
        }
      ],
      passingScore: '80%',
      certification: 'Israeli Geriatric Healthcare Competency Certificate'
    };
  }
}

// Educational progress tracking
class IsraeliHealthcareProgress {
  constructor() {
    this.competencyAreas = [
      'healthcare-navigation',
      'benefits-assessment', 
      'cultural-competency',
      'clinical-guidelines'
    ];
    
    this.learnerProgress = new Map();
  }

  trackProgress(learnerId, completedActivity) {
    const progress = this.learnerProgress.get(learnerId) || {
      completedActivities: [],
      competencyScores: {},
      certificationStatus: 'in-progress'
    };
    
    progress.completedActivities.push({
      activity: completedActivity,
      timestamp: Date.now(),
      score: completedActivity.score
    });
    
    this.updateCompetencyScores(progress, completedActivity);
    this.learnerProgress.set(learnerId, progress);
    
    return this.generateProgressReport(learnerId);
  }

  updateCompetencyScores(progress, activity) {
    const area = activity.competencyArea;
    if (!progress.competencyScores[area]) {
      progress.competencyScores[area] = [];
    }
    
    progress.competencyScores[area].push(activity.score);
  }

  generateProgressReport(learnerId) {
    const progress = this.learnerProgress.get(learnerId);
    if (!progress) return null;
    
    const competencyAverages = {};
    Object.entries(progress.competencyScores).forEach(([area, scores]) => {
      competencyAverages[area] = scores.reduce((a, b) => a + b, 0) / scores.length;
    });
    
    const overallScore = Object.values(competencyAverages).length > 0 ?
      Object.values(competencyAverages).reduce((a, b) => a + b, 0) / Object.values(competencyAverages).length : 0;
    
    return {
      overallCompetency: `${overallScore.toFixed(1)}%`,
      areaScores: competencyAverages,
      activitiesCompleted: progress.completedActivities.length,
      readyForCertification: overallScore >= 80 && Object.keys(competencyAverages).length >= 3,
      nextRecommendations: this.generateRecommendations(competencyAverages)
    };
  }

  generateRecommendations(competencyAverages) {
    const recommendations = [];
    
    this.competencyAreas.forEach(area => {
      const score = competencyAverages[area];
      if (!score || score < 70) {
        recommendations.push(`Focus on ${area.replace('-', ' ')} - additional practice needed`);
      }
    });
    
    if (recommendations.length === 0) {
      recommendations.push('Ready for certification exam');
    }
    
    return recommendations;
  }
}

// Initialize for browser use
if (typeof window !== 'undefined') {
  window.IsraeliHealthcareEducation = new IsraeliHealthcareEducation();
  window.IsraeliHealthcareProgress = new IsraeliHealthcareProgress();
  
  console.log('🇮🇱 Israeli Healthcare Education System initialized');
  console.log('📊 Progress tracking system ready');
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IsraeliHealthcareEducation, IsraeliHealthcareProgress };
}