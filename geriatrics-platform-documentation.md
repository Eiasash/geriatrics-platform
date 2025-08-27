# Israeli Geriatrics Complete Platform - Project Documentation

## Overview
A comprehensive web-based learning platform for Israeli geriatrics fellowship training at Shaare Tzedek Medical Center. Deployed at: https://geriatrics-study.netlify.app

## Key Features

### 🎯 Quiz System with Spaced Repetition
- **Topics**: Frailty, Delirium, Dementia, Polypharmacy
- **Performance tracking** with mistake analysis
- **Personalized review** based on user errors
- **Hebrew interface** with English medical terms
- **Progress visualization** with color-coded performance

### 💊 Clinical Tools
- **CHA₂DS₂-VASc Calculator** for stroke risk
- **Cockcroft-Gault CrCl** calculator
- **Clinical Frailty Scale** interpreter
- **Medication dosing tables** adjusted for elderly
- **Drug interaction checker**
- **Clinical protocols** (delirium management)

### 📚 Academic Tools
- **Pomodoro Timer** (25-minute study sessions)
- **Must-read papers** for weak areas
- **Medical formulas** (CrCl, Corrected Calcium, Anion Gap)

### 📖 Quick Reference
- **Beers Criteria 2023** - top 10 medications to avoid
- **Emergency contacts** for Israel
- **Copy-to-clipboard** reference cards
- **Data export** functionality

## Technical Implementation

### Architecture
- **Single-page application** (SPA) with vanilla JavaScript
- **No external dependencies** (works offline)
- **Mobile-responsive** design with RTL support
- **Progressive Web App** features

### Key JavaScript Functions
```javascript
// Module switching
switchModule(module)

// Quiz system
startQuiz(topic)
showQuestion()
selectAnswer(index)

// Clinical calculators
calculateCHADS()
calculateCrCl()
interpretFrailty()

// Utility functions
copyToClipboard(type)
exportAllData()
```

### User Performance Data Structure
```javascript
const userPerformanceData = {
    mistakes: {
        frailty: [
            {questionId: "f1", userAnswer: "4", correctAnswer: "3"}
        ]
    },
    topicProgress: {
        frailty: {attempts: 1, bestScore: 0, averageScore: 0}
    }
};
```

## Question Bank Structure

### Frailty (Fried Criteria)
- **3+ criteria = Frail** (common mistake: thinking it's 4+)
- **Gait speed <0.8 m/s** (common mistake: <1.0 m/s)
- Covers all 5 Fried criteria with mistake tracking

### Delirium (CAM)
- **Features 1 AND 2 mandatory + (3 OR 4)**
- Low-dose antipsychotic dosing (Haloperidol 0.25-0.5mg)
- Non-pharmacological interventions

### Clinical Dosing Tables
- **Renal adjustment** for common antibiotics
- **Geriatric-specific dosing** (START LOW, GO SLOW)
- **Beers Criteria** integration

## Deployment Details

### Netlify Configuration
```toml
[build]
  command = "echo 'Deploying static files'"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Cache Management
- **Service worker auto-unregistration** to prevent caching issues
- **Cache-busting headers** in HTML
- **Version parameter support** for forced refresh

## Educational Approach

### Spaced Repetition Algorithm
1. **Immediate review** of failed questions
2. **Mistake highlighting** with explanations
3. **Performance-based recommendations** for papers/topics
4. **Progress tracking** with visual feedback

### Israeli Medical Context
- **Hebrew interface** with medical English terms
- **Israeli emergency contacts** and protocols
- **Kupot Holim integration** considerations
- **Local clinical pathways**

## Future Enhancements
- Clinical case scenarios (currently placeholder)
- Additional calculator tools
- Integration with medical databases
- Expanded question bank
- Analytics dashboard

## File Structure
```
/
├── index.html (main application)
├── manifest.json (PWA manifest)
├── sw.js (service worker)
└── netlify.toml (deployment config)
```

## Key Medical Content

### Frailty - Fried Criteria
1. Weight loss ≥4.5kg/year
2. Self-reported exhaustion  
3. Low physical activity
4. Slow gait speed <0.8 m/s
5. Weak grip strength
**Diagnosis: 3+ criteria = Frail**

### CAM for Delirium
- Feature 1: Acute onset + Fluctuation
- Feature 2: Inattention  
- Feature 3: Disorganized thinking
- Feature 4: Altered consciousness
**Diagnosis: (1 AND 2) AND (3 OR 4)**

### Beers Criteria 2023 - Top 10
1. Benzodiazepines → Falls, confusion
2. Anticholinergics → Confusion, constipation
3. NSAIDs >90 days → GI bleed, AKI
4. Sliding scale insulin → Hypoglycemia
5. Digoxin >0.125mg/day → Toxicity
6. PPIs >8 weeks → C.diff, fractures
7. Antipsychotics in dementia → ↑Mortality
8. Amiodarone (first-line) → Thyroid, lung toxicity
9. Nitrofurantoin if CrCl<30 → Ineffective
10. Alpha blockers → Orthostatic hypotension

## Success Metrics
- User engagement with spaced repetition
- Performance improvement on weak topics
- Clinical tool utilization
- Mobile usage patterns
- Knowledge retention over time