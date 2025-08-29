// src/data/questions.js
export const boardQuestions = {
  dementia: [
    // 50+ Dementia Questions
    {
      id: 'dem001',
      question: 'MMSE score 18/30 in 78yo. Next best step?',
      options: ['CT head', 'B12/folate/TSH', 'Start donepezil', 'PET scan'],
      answer: 1,
      explanation: 'Rule out reversible causes first before dementia meds'
    },
    {
      id: 'dem002',
      question: 'Sundowning management. First-line approach?',
      options: ['Haloperidol', 'Bright light therapy', 'Benzodiazepines', 'Physical restraints'],
      answer: 1,
      explanation: 'Non-pharm interventions first: light therapy, routine, activity'
    },
    // ... 48 more
  ],
  
  delirium: [
    // 40+ Delirium Questions
    {
      id: 'del001',
      question: 'CAM criteria include all EXCEPT?',
      options: ['Acute onset', 'Inattention', 'Fever', 'Disorganized thinking'],
      answer: 2,
      explanation: 'CAM: acute onset + inattention + (disorganized thinking OR altered consciousness)'
    },
    // ... 39 more
  ],
  
  falls: [
    // 45+ Falls Questions
    {
      id: 'fall001',
      question: 'Morse Fall Scale >45 indicates?',
      options: ['Low risk', 'Moderate risk', 'High risk', 'Very high risk'],
      answer: 2,
      explanation: '<25 low, 25-44 moderate, ≥45 high risk'
    },
    // ... 44 more
  ]
  // ... 12 more categories
};
