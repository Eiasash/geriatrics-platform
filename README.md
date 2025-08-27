# Geriatrics Fellowship Study Platform
### Advanced Clinical Decision Support & Learning System

## 🏥 Project Overview

**Platform**: Geriatrics Study Hub  
**URL**: [https://geriatrics.netlify.app/](https://geriatrics.netlify.app/)  
**Developer**: Dr. Eias Ashhab, MD  
**Fellowship**: Shaare Zedek Hospital Geriatrics (Sept 2025)  
**Status**: Production-ready, actively deployed  

## 🎯 Core Purpose

Comprehensive geriatrics fellowship preparation platform combining:
- Evidence-based theoretical knowledge
- Practical clinical decision tools
- AI-powered differential diagnosis
- Adaptive spaced repetition learning
- Real-time drug interaction checking

## ✨ Key Features

### 1. Knowledge Management
- **50+ Study Cards** covering 8 geriatric domains
- **SM-2 Algorithm** for optimized spaced repetition
- **Weakness Detection** with adaptive difficulty
- **Daily Study Plans** with milestone tracking
- **Performance Prediction** showing mastery timeline

### 2. Clinical Decision Support
- **AI Differential Diagnosis** (GPT-4 optional, offline fallback)
- **Drug Interaction Checker** with Beers/STOPP/START
- **Clinical Calculators**: CFS, Morse, MMSE, CHADS-VASc
- **SOAP Note Generator** for documentation
- **Quick Reference Cards** for rounds

### 3. Research Library
- **2020-2024 Papers**: OPTIMISE, GUIDE-Frailty, PROTECT-ELDERLY
- **Current Guidelines**: AGS, NICE, WHO, CDC
- **Clinical Pearls**: 15+ practical tips
- **Meta-analyses** with NNT calculations
- **Hebrew/English** bilingual support

### 4. Fellowship Tools
- **30-item Day 1 Checklist**
- **Weekly Milestone Tracker**
- **Pimp Questions Database**
- **Case Simulator** with branching scenarios
- **Peer Benchmarking** analytics

## 🔧 Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML5/CSS3/JavaScript (vanilla) |
| Storage | LocalStorage (offline-first) |
| Deployment | GitHub → Netlify (CI/CD) |
| PWA | Service Worker enabled |
| Languages | Hebrew/English with RTL |
| API | OpenAI GPT-4 (optional) |

## 📊 Platform Metrics

- **Study Cards**: 50+ expert-curated
- **Drug Database**: 16+ geriatric medications
- **Guidelines**: 6 major clinical references
- **Research Papers**: 10+ landmark studies
- **Code Base**: 3,052+ lines optimized JS

## 💡 Usage Examples

```javascript
// Morning Study Session
smartStudy.getNextDueCard()
Fellowship.trackMilestone('Complete first CGA')

// During Rounds
GeriatricsKnowledge.getDrugInfo('metformin')
clinicalAI.getDifferential('confusion and falls', {age: 85})
Fellowship.getPimpQuestion()

// Evening Review
Fellowship.performanceTracker.generateProgressReport()
smartStudy.getDailyProgress()