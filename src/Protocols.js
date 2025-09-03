// src/data/protocols.js
export const protocols = {
  admission: {
    'CHF Exacerbation': {
      immediate: ['O2 if SpO2 <90%', 'Sit upright', 'IV access'],
      labs: ['BNP/NT-proBNP', 'Troponin', 'Chemistry', 'CBC', 'TSH'],
      medications: {
        diuresis: 'Furosemide 40-80mg IV BID',
        afterload: 'Continue ACE/ARB if SBP >90',
        betaBlocker: 'Continue if compensated, hold if shock'
      },
      monitoring: ['Daily weight', 'I&O', 'Telemetry', 'Daily BMP'],
      shaareZedek: 'Cardiology consult if BNP >1000 or new arrhythmia'
    },
    // ... 20 more protocols
  }
};
