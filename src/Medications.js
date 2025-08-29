// src/data/medications.js
export const medications = {
  cardiovascular: {
    betaBlockers: [
      {
        generic: 'Bisoprolol',
        hebrew: 'ביסופרולול',
        brands: ['Concor', 'Bisobeta'],
        doses: ['1.25mg', '2.5mg', '5mg', '10mg'],
        elderlyStart: '1.25mg daily',
        maxElderly: '10mg daily',
        renal: {
          'CrCl >20': 'No adjustment',
          'CrCl <20': 'Use caution'
        },
        israeliGuideline: 'First-line for HF, covered by all Kupot'
      },
      // ... 10 more beta blockers
    ],
    aceInhibitors: [
      // ... 8 ACE inhibitors with Israeli context
    ]
  },
  // ... 15 more drug categories
};
