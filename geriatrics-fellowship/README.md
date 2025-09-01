# Geriatrics Fellowship Platform

Complete unified platform for geriatrics fellowship training at Shaare Zedek Medical Center.

## 🏥 Platform Overview

This platform integrates all the tools you need for geriatrics fellowship training:

### Daily Use Tools (Priority)
- **Patient Dashboard** - Morning rounds prep with risk synthesis
- **On-Call Co-Pilot** - 3AM emergency protocols  
- **Clinical Note Analyzer** - Hebrew/English NLP for abbreviations
- **Anticoag Tool** - CHA₂DS₂-VASc with renal dosing (planned)

### Academic Tools
- **Shlav Alef Prep** - Hebrew + English exam questions
- **Research/M&M** - PICO search + conference builder
- **Evidence Library** - 20 landmark trials + MOH guidelines
- **Original Platform** - Enhanced calculators, articles, guidelines

## 🚀 Quick Start

1. **Open index.html** - Main hub with all module links
2. **Start with Patient Dashboard** - Add your morning round patients
3. **Use On-Call Co-Pilot** - For emergency scenarios
4. **Test Note Analyzer** - Hebrew/English medical abbreviations

## 📁 File Structure

```
geriatrics-fellowship/
├── index.html                    # Main hub page
├── modules/                      # Standalone HTML tools
│   ├── patient-dashboard.html    # Patient management
│   ├── oncall-copilot.html      # Emergency protocols
│   └── clinical-note-analyzer.html # NLP tool
├── platform/                    # React components (enhanced)
│   └── src/
│       ├── components/
│       │   ├── ResearchLibrary.jsx      # Fixed tab navigation
│       │   └── ClinicalToolsSidebar.jsx # Fixed drug lookup
│       └── data/
│           └── mockData.js              # Sample papers/drugs
└── shared/                       # Common resources
```

## 🔧 Features Fixed

✅ **Tab Navigation**: ResearchLibrary.jsx now properly switches content
✅ **Drug Search**: ClinicalToolsSidebar.jsx has working search functionality  
✅ **Mock Data**: Papers, guidelines, and drug database loaded
✅ **Clinical Pearls**: Links now show actual content instead of dead links
✅ **Hebrew Support**: Clinical note analyzer handles Hebrew abbreviations
✅ **Emergency Protocols**: Step-by-step geriatric emergency management

## 📱 Mobile Responsive

All modules are optimized for:
- Desktop: Full feature set
- Tablet: Perfect for rounds
- Mobile: Emergency access

## 🗄️ Data Persistence

- Patient data saved in localStorage
- Cross-module data sharing
- Export capabilities for morning reports
- Offline functionality

## 📊 Deployment Options

### Option 1: Simple File Hosting
1. Upload entire `geriatrics-fellowship/` folder to any web server
2. Access via `yourserver.com/geriatrics-fellowship/index.html`

### Option 2: Netlify (Recommended)
1. Drag & drop the `geriatrics-fellowship/` folder to Netlify
2. Get instant URL: `yoursite.netlify.app`
3. Perfect for fellowship use

### Option 3: GitHub Pages
1. Create repository with these files
2. Enable GitHub Pages in settings
3. Access via `username.github.io/geriatrics-fellowship`

## 🎯 Next Phase Development

**Phase 2 (Sept-Nov 2025):**
- Anticoagulation synthesizer with calculations
- Hebrew exam question database expansion
- Evidence library UI enhancements
- Advanced patient analytics

**Phase 3 (Dec-Feb 2025):**
- Performance tracking dashboard
- Capacity assessment tools  
- Pain management protocols
- Integration with hospital systems

## 🔒 Privacy & Security

- All data stored locally in browser
- No external data transmission
- HIPAA-compliant design (no PHI stored)
- Works offline after first load

## 📞 Support

- Platform issues: Check browser console for errors
- Clinical questions: Consult supervising physicians
- Feature requests: Document in fellowship notes

## 🏆 Credits

Built for Dr. Eias Ashhab's geriatrics fellowship at Shaare Zedek Medical Center.
Combines clinical excellence with cutting-edge technology for optimal patient care.

---

**Ready for Fellowship - September 1, 2025** 🎓