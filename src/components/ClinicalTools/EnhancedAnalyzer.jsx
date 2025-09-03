import React, { useState } from 'react';

const EnhancedAnalyzer = () => {
  const [noteText, setNoteText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [language, setLanguage] = useState('auto');

  // Comprehensive medication patterns for both languages
  const medicationPatterns = {
    english: /\b(metformin|warfarin|coumadin|haloperidol|haldol|furosemide|lasix|ramipril|tritace|bisoprolol|concor|amlodipine|norvasc|apixaban|eliquis|rivaroxaban|xarelto|donepezil|aricept|memantine|namenda|quetiapine|seroquel|lorazepam|ativan|diazepam|valium|gabapentin|neurontin|pregabalin|lyrica|omeprazole|prilosec|pantoprazole|protonix|levothyroxine|synthroid|atorvastatin|lipitor|rosuvastatin|crestor|lisinopril|zestril|hydrochlorothiazide|hctz|spironolactone|aldactone|digoxin|lanoxin|amiodarone|cordarone|clopidogrel|plavix|aspirin|asa|insulin|glargine|lantus|lispro|humalog|sitagliptin|januvia|empagliflozin|jardiance|dapagliflozin|farxiga|sertraline|zoloft|escitalopram|lexapro|citalopram|celexa|mirtazapine|remeron|trazodone|desyrel|venlafaxine|effexor|duloxetine|cymbalta|bupropion|wellbutrin|risperidone|risperdal|olanzapine|zyprexa|aripiprazole|abilify|clozapine|clozaril|lithium|prednisone|methylprednisolone|medrol|dexamethasone|decadron|albuterol|ventolin|ipratropium|atrovent|tiotropium|spiriva|budesonide|pulmicort|fluticasone|flovent|montelukast|singulair|cetirizine|zyrtec|loratadine|claritin|diphenhydramine|benadryl|hydroxyzine|atarax|ranitidine|zantac|famotidine|pepcid|metoclopramide|reglan|ondansetron|zofran|promethazine|phenergan|docusate|colace|senna|senokot|polyethylene glycol|miralax|lactulose|enulose|morphine|oxycodone|percocet|hydrocodone|vicodin|tramadol|ultram|fentanyl|duragesic|codeine|acetaminophen|tylenol|ibuprofen|advil|motrin|naproxen|aleve|celecoxib|celebrex|meloxicam|mobic|diclofenac|voltaren|ketorolac|toradol|ciprofloxacin|cipro|levofloxacin|levaquin|azithromycin|zithromax|amoxicillin|augmentin|cephalexin|keflex|ceftriaxone|rocephin|vancomycin|vancocin|metronidazole|flagyl|clindamycin|cleocin|doxycycline|vibramycin|trimethoprim|bactrim|nitrofurantoin|macrobid|fluconazole|diflucan|nystatin|mycostatin|acyclovir|zovirax|valacyclovir|valtrex|oseltamivir|tamiflu|rivastigmine|exelon|galantamine|razadyne|zolpidem|ambien|eszopiclone|lunesta|temazepam|restoril|melatonin|buspirone|buspar|propranolol|inderal|metoprolol|lopressor|toprol|carvedilol|coreg|atenolol|tenormin|diltiazem|cardizem|verapamil|calan|nifedipine|procardia|isosorbide|isordil|nitroglycerin|nitrostat|hydralazine|apresoline|clonidine|catapres|doxazosin|cardura|terazosin|hytrin|tamsulosin|flomax|finasteride|proscar|dutasteride|avodart|oxybutynin|ditropan|tolterodine|detrol|solifenacin|vesicare|mirabegron|myrbetriq|sildenafil|viagra|tadalafil|cialis|vardenafil|levitra|alprostadil|caverject|testosterone|androgel|estradiol|estrace|progesterone|prometrium|levonorgestrel|mirena|medroxyprogesterone|provera|depo|raloxifene|evista|alendronate|fosamax|risedronate|actonel|ibandronate|boniva|zoledronic acid|reclast|denosumab|prolia|calcitonin|miacalcin|teriparatide|forteo|calcium|vitamin d|cholecalciferol|ergocalciferol|folic acid|folate|cyanocobalamin|vitamin b12|thiamine|vitamin b1|pyridoxine|vitamin b6|ferrous sulfate|iron|potassium chloride|kdur|magnesium oxide|mag ox|zinc|selenium|multivitamin|ensure|boost|glucerna)\b/gi,
    hebrew: /(הלדול|פוסיד|טריטייס|קומדין|קונקור|נורבסק|אליקוויס|קסרלטו|אריספט|נמנדה|סרוקוול|אטיוון|וליום|ניורונטין|ליריקה|לוסק|קונטרולוק|אלטרוקסין|סורטיס|קרסטור|רמיפריל|ליזינופריל|אלדקטון|לנוקסין|קורדרון|פלביקס|אספירין|לנטוס|הומלוג|ג'נוביה|ג'רדיאנס|פורסיגה|זולופט|לקספרו|ציפרלקס|רמרון|אפקסור|סימבלטה|וולבוטרין|ריספרדל|זיפרקסה|אביליפי|קלוזריל|ליתיום|פרדניזון|מדרול|דקסמטזון|ונטולין|אטרובנט|ספיריבה|פולמיקורט|פליקסוטייד|סינגולר|זירטק|לוריטן|בנדריל|אטרקס|זנטק|פמידין|פרמין|זופרן|פנרגן|דולקולקס|מירלקס|דופלק|מורפין|אוקסיקודון|פרקוסט|טרמדול|פנטניל|קודאין|אקמול|אדוויל|נורופן|אטופן|ברקסין|ארקוקסיה|וולטרן|טורדול|ציפרו|לבופלוקס|זיתרומקס|מוקסיפן|אוגמנטין|קפלקס|רוספין|ונקומיצין|פלג'יל|דלצין|דוקסילין|רספרים|מקרודנטין|דיפלוקן|ניסטטין|זובירקס|ולטרקס|טמיפלו|אקסלון|רמיניל|סטילנוקס|לונסטה|בונדורמין|מלטונין|בוספירון|דרלין|נורמיטן|קרדילול|טנורמין|דילטיאם|ורפמיל|אדלט|איזוקט|ניטרוסטט|אפרזולין|קלונידין|קרדורה|הייטרין|אומניק|פרוסקר|אבודרט|ויזיקר|מירבטריק|ויאגרה|סיאליס|לביטרה|אנדרוג'ל|אסטרופם|פרוג'סטרון|מירנה|פרוברה|דפו|אויסטה|פוסלן|אקטונל|בוניבה|רקלסט|פרוליה|מיאקלצין|פורטאו|קלציום|ויטמין די|חומצה פולית|ויטמין בי12|ויטמין בי1|ויטמין בי6|ברזל|אשלגן|מגנזיום|אבץ|סלניום|מולטיויטמין|אנשור|גלוצרנה)/g
  };

  // Hebrew to English medication mapping
  const hebrewToEnglish = {
    'הלדול': 'haloperidol',
    'פוסיד': 'furosemide',
    'טריטייס': 'ramipril',
    'קומדין': 'warfarin',
    'קונקור': 'bisoprolol',
    'נורבסק': 'amlodipine',
    'אליקוויס': 'apixaban',
    'קסרלטו': 'rivaroxaban',
    'אריספט': 'donepezil',
    'נמנדה': 'memantine',
    'סרוקוול': 'quetiapine',
    'אטיוון': 'lorazepam',
    'וליום': 'diazepam',
    'ניורונטין': 'gabapentin',
    'ליריקה': 'pregabalin',
    'לוסק': 'omeprazole',
    'קונטרולוק': 'pantoprazole',
    'אלטרוקסין': 'levothyroxine',
    'סורטיס': 'atorvastatin',
    'קרסטור': 'rosuvastatin',
    'רמיפריל': 'ramipril',
    'ליזינופריל': 'lisinopril',
    'אלדקטון': 'spironolactone',
    'לנוקסין': 'digoxin',
    'קורדרון': 'amiodarone',
    'פלביקס': 'clopidogrel',
    'אספירין': 'aspirin',
    'לנטוס': 'insulin glargine',
    'הומלוג': 'insulin lispro',
    'ג\'נוביה': 'sitagliptin',
    'ג\'רדיאנס': 'empagliflozin',
    'פורסיגה': 'dapagliflozin',
    'זולופט': 'sertraline',
    'לקספרו': 'escitalopram',
    'ציפרלקס': 'escitalopram',
    'רמרון': 'mirtazapine',
    'אפקסור': 'venlafaxine',
    'סימבלטה': 'duloxetine',
    'וולבוטרין': 'bupropion',
    'ריספרדל': 'risperidone',
    'זיפרקסה': 'olanzapine',
    'אביליפי': 'aripiprazole',
    'קלוזריל': 'clozapine',
    'ליתיום': 'lithium',
    'פרדניזון': 'prednisone',
    'מדרול': 'methylprednisolone',
    'דקסמטזון': 'dexamethasone',
    'ונטולין': 'albuterol',
    'אטרובנט': 'ipratropium',
    'ספיריבה': 'tiotropium',
    'פולמיקורט': 'budesonide',
    'פליקסוטייד': 'fluticasone',
    'סינגולר': 'montelukast',
    'זירטק': 'cetirizine',
    'לוריטן': 'loratadine',
    'בנדריל': 'diphenhydramine',
    'אטרקס': 'hydroxyzine',
    'זנטק': 'ranitidine',
    'פמידין': 'famotidine',
    'פרמין': 'metoclopramide',
    'זופרן': 'ondansetron',
    'פנרגן': 'promethazine',
    'דולקולקס': 'bisacodyl',
    'מירלקס': 'polyethylene glycol',
    'דופלק': 'lactulose',
    'מורפין': 'morphine',
    'אוקסיקודון': 'oxycodone',
    'פרקוסט': 'percocet',
    'טרמדול': 'tramadol',
    'פנטניל': 'fentanyl',
    'קודאין': 'codeine',
    'אקמול': 'acetaminophen',
    'אדוויל': 'ibuprofen',
    'נורופן': 'ibuprofen',
    'אטופן': 'naproxen',
    'ברקסין': 'celecoxib',
    'ארקוקסיה': 'etoricoxib',
    'וולטרן': 'diclofenac',
    'טורדול': 'ketorolac'
  };

  // Drug interaction database
  const drugInteractions = {
    severe: [
      { drugs: ['warfarin', 'amiodarone'], effect: 'INR increase 2-3x', management: 'Reduce warfarin by 30-50%, monitor INR closely' },
      { drugs: ['warfarin', 'aspirin'], effect: 'Major bleeding risk', management: 'Use only if clear indication, monitor closely' },
      { drugs: ['ace inhibitor', 'potassium sparing diuretic'], effect: 'Severe hyperkalemia', management: 'Monitor K+ closely, avoid if possible' },
      { drugs: ['ssri', 'maoi'], effect: 'Serotonin syndrome', management: 'Contraindicated - wait 14 days between' },
      { drugs: ['benzodiazepine', 'opioid'], effect: 'Respiratory depression', management: 'Avoid if possible, use lowest doses' },
      { drugs: ['lithium', 'nsaid'], effect: 'Lithium toxicity', management: 'Avoid NSAIDs, monitor lithium levels' },
      { drugs: ['metformin', 'contrast'], effect: 'Lactic acidosis', management: 'Hold metformin 48h before/after contrast' },
      { drugs: ['statin', 'clarithromycin'], effect: 'Rhabdomyolysis', management: 'Hold statin during antibiotic course' },
      { drugs: ['digoxin', 'amiodarone'], effect: 'Digoxin toxicity', management: 'Reduce digoxin dose by 50%' },
      { drugs: ['warfarin', 'nsaid'], effect: 'GI bleeding, INR increase', management: 'Avoid combination, use acetaminophen' }
    ],
    moderate: [
      { drugs: ['ace inhibitor', 'nsaid'], effect: 'Reduced ACE-I effect, renal impairment', management: 'Monitor BP and renal function' },
      { drugs: ['beta blocker', 'calcium channel blocker'], effect: 'Bradycardia, heart block', management: 'Monitor HR and BP closely' },
      { drugs: ['ssri', 'nsaid'], effect: 'Increased bleeding risk', management: 'Consider PPI, monitor for bleeding' },
      { drugs: ['thiazide', 'lithium'], effect: 'Lithium accumulation', management: 'Monitor lithium levels closely' },
      { drugs: ['ppi', 'clopidogrel'], effect: 'Reduced antiplatelet effect', management: 'Use pantoprazole if PPI needed' }
    ]
  };

  // Beers Criteria medications
  const beersCriteria = {
    avoid: [
      { drug: 'diphenhydramine', reason: 'Highly anticholinergic, confusion, falls' },
      { drug: 'hydroxyzine', reason: 'Anticholinergic, confusion' },
      { drug: 'benzodiazepines', reason: 'Falls, cognitive impairment, dependence' },
      { drug: 'zolpidem', reason: 'Falls, fractures, cognitive effects' },
      { drug: 'muscle relaxants', reason: 'Sedation, falls, anticholinergic' },
      { drug: 'meperidine', reason: 'Neurotoxic metabolite, delirium' },
      { drug: 'sliding scale insulin', reason: 'Hypoglycemia risk without benefit' },
      { drug: 'megestrol', reason: 'Thrombosis, death risk' },
      { drug: 'glibenclamide', reason: 'Prolonged hypoglycemia' },
      { drug: 'nitrofurantoin', reason: 'Pulmonary toxicity, avoid if CrCl <30' }
    ],
    useWithCaution: [
      { drug: 'antipsychotics', reason: 'Stroke, mortality in dementia' },
      { drug: 'aspirin >325mg', reason: 'GI bleeding without added benefit' },
      { drug: 'dabigatran', reason: 'Higher bleeding risk if CrCl <30' },
      { drug: 'prasugrel', reason: 'Bleeding risk in age >75' },
      { drug: 'ssri', reason: 'Hyponatremia, falls' }
    ]
  };

  const analyzeNote = () => {
    const isHebrew = /[\u0590-\u05FF]/.test(noteText);
    
    // Extract medications
    const englishMeds = noteText.match(medicationPatterns.english) || [];
    const hebrewMeds = noteText.match(medicationPatterns.hebrew) || [];
    
    // Convert Hebrew medications to English for analysis
    const convertedHebrewMeds = hebrewMeds.map(med => hebrewToEnglish[med] || med);
    const allMeds = [...new Set([...englishMeds.map(m => m.toLowerCase()), ...convertedHebrewMeds.map(m => m.toLowerCase())])];
    
    // Check for drug interactions
    const foundInteractions = [];
    drugInteractions.severe.forEach(interaction => {
      const found = interaction.drugs.filter(drug => 
        allMeds.some(med => med.includes(drug) || drug.includes(med))
      );
      if (found.length >= 2) {
        foundInteractions.push({
          severity: 'SEVERE',
          drugs: found,
          effect: interaction.effect,
          management: interaction.management
        });
      }
    });
    
    drugInteractions.moderate.forEach(interaction => {
      const found = interaction.drugs.filter(drug => 
        allMeds.some(med => med.includes(drug) || drug.includes(med))
      );
      if (found.length >= 2) {
        foundInteractions.push({
          severity: 'MODERATE',
          drugs: found,
          effect: interaction.effect,
          management: interaction.management
        });
      }
    });
    
    // Check Beers Criteria
    const beersViolations = [];
    beersCriteria.avoid.forEach(item => {
      if (allMeds.some(med => med.includes(item.drug) || item.drug.includes(med))) {
        beersViolations.push({
          drug: item.drug,
          category: 'AVOID',
          reason: item.reason
        });
      }
    });
    
    beersCriteria.useWithCaution.forEach(item => {
      if (allMeds.some(med => med.includes(item.drug) || item.drug.includes(med))) {
        beersViolations.push({
          drug: item.drug,
          category: 'USE WITH CAUTION',
          reason: item.reason
        });
      }
    });
    
    // Calculate anticholinergic burden
    const anticholinergicDrugs = {
      score3: ['amitriptyline', 'clomipramine', 'hydroxyzine', 'diphenhydramine', 'promethazine', 'chlorpheniramine'],
      score2: ['cyproheptadine', 'meperidine', 'loxapine', 'olanzapine', 'tolterodine'],
      score1: ['alprazolam', 'aripiprazole', 'atenolol', 'captopril', 'cimetidine', 'clorazepate', 'codeine', 'colchicine', 'digoxin', 'dipyridamole', 'fentanyl', 'furosemide', 'fluvoxamine', 'haloperidol', 'hydralazine', 'hydrocortisone', 'isosorbide', 'loperamide', 'metoprolol', 'morphine', 'nifedipine', 'prednisone', 'quinidine', 'ranitidine', 'risperidone', 'theophylline', 'trazodone', 'triamterene', 'warfarin']
    };
    
    let acbScore = 0;
    Object.entries(anticholinergicDrugs).forEach(([score, drugs]) => {
      const scoreValue = parseInt(score.replace('score', ''));
      drugs.forEach(drug => {
        if (allMeds.some(med => med.includes(drug))) {
          acbScore += scoreValue;
        }
      });
    });
    
    // Generate recommendations
    const recommendations = [];
    
    if (foundInteractions.length > 0) {
      recommendations.push('Review drug interactions immediately');
    }
    
    if (beersViolations.filter(v => v.category === 'AVOID').length > 0) {
      recommendations.push('Consider deprescribing Beers Criteria medications');
    }
    
    if (acbScore >= 3) {
      recommendations.push('High anticholinergic burden (score: ' + acbScore + ') - review for alternatives');
    }
    
    if (allMeds.includes('warfarin')) {
      recommendations.push('Monitor INR regularly, check for interactions');
    }
    
    if (allMeds.includes('digoxin')) {
      recommendations.push('Check digoxin level, monitor for toxicity');
    }
    
    if (allMeds.some(med => ['metformin', 'sitagliptin', 'empagliflozin', 'dapagliflozin', 'insulin'].some(dm => med.includes(dm)))) {
      recommendations.push('Monitor blood glucose, adjust diabetes medications for elderly targets');
    }
    
    if (allMeds.some(med => ['furosemide', 'hydrochlorothiazide', 'spironolactone'].some(diuretic => med.includes(diuretic)))) {
      recommendations.push('Monitor electrolytes and renal function');
    }
    
    if (allMeds.length > 10) {
      recommendations.push('Polypharmacy detected - consider medication review and deprescribing');
    }
    
    // Extract vital signs and lab values
    const vitals = {
      bp: noteText.match(/\b\d{2,3}\/\d{2,3}\b/g),
      hr: noteText.match(/(?:HR|Pulse|דופק)[:\s]*(\d{2,3})/i)?.[1],
      temp: noteText.match(/(?:Temp|Temperature|חום)[:\s]*([\d.]+)/i)?.[1],
      spo2: noteText.match(/(?:SpO2|O2|Sat|סטורציה)[:\s]*(\d{2,3})/i)?.[1]
    };
    
    const labs = {
      creatinine: noteText.match(/(?:Cr|Creatinine|קריאטינין)[:\s]*([\d.]+)/i)?.[1],
      egfr: noteText.match(/(?:eGFR|GFR)[:\s]*(\d+)/i)?.[1],
      potassium: noteText.match(/(?:K\+?|Potassium|אשלגן)[:\s]*([\d.]+)/i)?.[1],
      sodium: noteText.match(/(?:Na\+?|Sodium|נתרן)[:\s]*([\d.]+)/i)?.[1],
      glucose: noteText.match(/(?:Glucose|BS|Blood Sugar|גלוקוז|סוכר)[:\s]*(\d+)/i)?.[1],
      hba1c: noteText.match(/(?:HbA1c|A1C|המוגלובין)[:\s]*([\d.]+)/i)?.[1],
      inr: noteText.match(/(?:INR)[:\s]*([\d.]+)/i)?.[1]
    };
    
    setAnalysis({
      medications: {
        english: englishMeds,
        hebrew: hebrewMeds,
        total: allMeds.length
      },
      interactions: foundInteractions,
      beersCriteria: beersViolations,
      anticholinergicBurden: {
        score: acbScore,
        risk: acbScore >= 3 ? 'High' : acbScore >= 1 ? 'Moderate' : 'Low'
      },
      vitals,
      labs,
      recommendations,
      timestamp: new Date().toLocaleString()
    });
  };

  const clearAnalysis = () => {
    setNoteText('');
    setAnalysis(null);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Enhanced Clinical Note Analyzer</h1>
        <p style={{ margin: '10px 0 0', opacity: 0.9 }}>
          AI-powered medication analysis with Hebrew support
        </p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '600',
            color: '#333'
          }}>
            Clinical Note (English or Hebrew / עברית או אנגלית)
          </label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={`Paste clinical note here...
            
Example: 
Patient is an 85-year-old male with HTN, DM2, AF on warfarin, CHF. 
Current medications: Warfarin 5mg daily, Furosemide 40mg BID, Ramipril 10mg daily, Bisoprolol 5mg daily, Metformin 1000mg BID.
Labs: Cr 1.5, eGFR 45, K+ 4.8, INR 2.3

או בעברית:
מטופל בן 85 עם יתר לחץ דם, סוכרת, פרפור עליות על קומדין.
תרופות: קומדין 5 מ"ג, פוסיד 40 מ"ג פעמיים ביום, טריטייס 10 מ"ג, קונקור 5 מ"ג`}
            style={{ 
              width: '100%', 
              minHeight: '250px', 
              padding: '12px',
              fontSize: '14px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={analyzeNote}
            style={{ 
              backgroundColor: '#667eea',
              color: 'white',
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            Analyze Note
          </button>
          
          <button 
            onClick={clearAnalysis}
            style={{ 
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            Clear
          </button>
        </div>
      </div>
      
      {analysis && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ 
            color: '#333',
            borderBottom: '2px solid #667eea',
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>
            Comprehensive Analysis Report
          </h2>
          
          {/* Medications Section */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#667eea', marginBottom: '15px' }}>
              📋 Medications Detected ({analysis.medications.total} total)
            </h3>
            {analysis.medications.english.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <strong>English medications:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {analysis.medications.english.map((med, idx) => (
                    <span key={idx} style={{
                      background: '#e0e7ff',
                      color: '#3730a3',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {analysis.medications.hebrew.length > 0 && (
              <div>
                <strong>תרופות בעברית:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {analysis.medications.hebrew.map((med, idx) => (
                    <span key={idx} style={{
                      background: '#fce7f3',
                      color: '#831843',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Drug Interactions Section */}
          {analysis.interactions.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#dc2626', marginBottom: '15px' }}>
                ⚠️ Drug Interactions Detected
              </h3>
              {analysis.interactions.map((interaction, idx) => (
                <div key={idx} style={{
                  background: interaction.severity === 'SEVERE' ? '#fee2e2' : '#fef3c7',
                  border: `2px solid ${interaction.severity === 'SEVERE' ? '#dc2626' : '#f59e0b'}`,
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontWeight: 'bold', color: interaction.severity === 'SEVERE' ? '#dc2626' : '#d97706' }}>
                    {interaction.severity}: {interaction.drugs.join(' + ')}
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <strong>Effect:</strong> {interaction.effect}
                  </div>
                  <div style={{ marginTop: '5px' }}>
                    <strong>Management:</strong> {interaction.management}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Beers Criteria Section */}
          {analysis.beersCriteria.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>
                ⚠️ Beers Criteria Medications
              </h3>
              {analysis.beersCriteria.map((violation, idx) => (
                <div key={idx} style={{
                  background: violation.category === 'AVOID' ? '#fee2e2' : '#fef3c7',
                  borderLeft: `4px solid ${violation.category === 'AVOID' ? '#dc2626' : '#f59e0b'}`,
                  padding: '12px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontWeight: 'bold' }}>
                    {violation.drug} - {violation.category}
                  </div>
                  <div style={{ marginTop: '5px', fontSize: '14px' }}>
                    {violation.reason}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Anticholinergic Burden */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#7c3aed', marginBottom: '15px' }}>
              🧠 Anticholinergic Burden Score
            </h3>
            <div style={{
              background: analysis.anticholinergicBurden.score >= 3 ? '#fee2e2' : 
                         analysis.anticholinergicBurden.score >= 1 ? '#fef3c7' : '#dcfce7',
              padding: '15px',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              <strong>Score:</strong> {analysis.anticholinergicBurden.score} ({analysis.anticholinergicBurden.risk} Risk)
              {analysis.anticholinergicBurden.score >= 3 && (
                <div style={{ marginTop: '8px', color: '#dc2626', fontWeight: 'bold' }}>
                  ⚠️ High risk of cognitive impairment and falls
                </div>
              )}
            </div>
          </div>
          
          {/* Vital Signs */}
          {(analysis.vitals.bp || analysis.vitals.hr || analysis.vitals.temp || analysis.vitals.spo2) && (
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#059669', marginBottom: '15px' }}>
                📊 Vital Signs
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {analysis.vitals.bp && (
                  <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '8px' }}>
                    <strong>BP:</strong> {analysis.vitals.bp}
                  </div>
                )}
                {analysis.vitals.hr && (
                  <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '8px' }}>
                    <strong>HR:</strong> {analysis.vitals.hr} bpm
                  </div>
                )}
                {analysis.vitals.temp && (
                  <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '8px' }}>
                    <strong>Temp:</strong> {analysis.vitals.temp}°C
                  </div>
                )}
                {analysis.vitals.spo2 && (
                  <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '8px' }}>
                    <strong>SpO2:</strong> {analysis.vitals.spo2}%
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Lab Values */}
          {Object.values(analysis.labs).some(v => v) && (
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#0891b2', marginBottom: '15px' }}>
                🔬 Laboratory Values
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {analysis.labs.creatinine && (
                  <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '8px' }}>
                    <strong>Creatinine:</strong> {analysis.labs.creatinine} mg/dL
                  </div>
                )}
                {analysis.labs.egfr && (
                  <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '8px' }}>
                    <strong>eGFR:</strong> {analysis.labs.egfr} mL/min
                  </div>
                )}
                {analysis.labs.potassium && (
                  <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '8px' }}>
                    <strong>K+:</strong> {analysis.labs.potassium} mEq/L
                  </div>
                )}
                {analysis.labs.sodium && (
                  <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '8px' }}>
                    <strong>Na+:</strong> {analysis.labs.sodium} mEq/L
                  </div>
                )}
                {analysis.labs.glucose && (
                  <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '8px' }}>
                    <strong>Glucose:</strong> {analysis.labs.glucose} mg/dL
                  </div>
                )}
                {analysis.labs.hba1c && (
                  <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '8px' }}>
                    <strong>HbA1c:</strong> {analysis.labs.hba1c}%
                  </div>
                )}
                {analysis.labs.inr && (
                  <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '8px' }}>
                    <strong>INR:</strong> {analysis.labs.inr}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Recommendations */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#059669', marginBottom: '15px' }}>
              ✅ Clinical Recommendations
            </h3>
            {analysis.recommendations.length > 0 ? (
              <ul style={{ 
                background: '#f0fdf4',
                padding: '15px 15px 15px 35px',
                borderRadius: '8px',
                margin: 0
              }}>
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} style={{ marginBottom: '8px', color: '#064e3b' }}>
                    {rec}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#059669' }}>No specific recommendations at this time.</p>
            )}
          </div>
          
          <div style={{ 
            marginTop: '20px',
            paddingTop: '15px',
            borderTop: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#6b7280',
            textAlign: 'right'
          }}>
            Analysis generated: {analysis.timestamp}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAnalyzer;