// Voice Notes Integration - Dictation and Text-to-Speech
// Medical terminology recognition for clinical documentation

export const VoiceNotes = {
  recognition: null,
  synthesis: window.speechSynthesis,
  isListening: false,
  language: 'en-US',
  
  // Medical terminology dictionary for better recognition
  medicalTerms: {
    medications: [
      'apixaban', 'warfarin', 'metoprolol', 'lisinopril', 'amlodipine',
      'furosemide', 'atorvastatin', 'metformin', 'levothyroxine', 'omeprazole',
      'donepezil', 'memantine', 'quetiapine', 'sertraline', 'escitalopram'
    ],
    conditions: [
      'atrial fibrillation', 'congestive heart failure', 'diabetes mellitus',
      'hypertension', 'dementia', 'delirium', 'pneumonia', 'urinary tract infection',
      'chronic kidney disease', 'COPD', 'osteoporosis', 'depression'
    ],
    procedures: [
      'echocardiogram', 'electrocardiogram', 'chest x-ray', 'computed tomography',
      'magnetic resonance imaging', 'lumbar puncture', 'paracentesis', 'thoracentesis'
    ],
    abbreviations: {
      'AF': 'atrial fibrillation',
      'CHF': 'congestive heart failure',
      'MI': 'myocardial infarction',
      'CVA': 'cerebrovascular accident',
      'UTI': 'urinary tract infection',
      'COPD': 'chronic obstructive pulmonary disease',
      'CKD': 'chronic kidney disease',
      'BID': 'twice daily',
      'TID': 'three times daily',
      'QID': 'four times daily',
      'PRN': 'as needed',
      'PO': 'by mouth',
      'IV': 'intravenous',
      'IM': 'intramuscular',
      'SC': 'subcutaneous'
    }
  },

  // Initialize voice recognition
  init() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.setupRecognition();
      console.log('🎤 Voice recognition initialized');
    } else if ('SpeechRecognition' in window) {
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
      console.log('🎤 Voice recognition initialized');
    } else {
      console.warn('Speech recognition not supported in this browser');
      return false;
    }
    
    // Check TTS support
    if (!this.synthesis) {
      console.warn('Text-to-speech not supported in this browser');
    }
    
    return true;
  },

  setupRecognition() {
    if (!this.recognition) return;
    
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 3;
    this.recognition.lang = this.language;
    
    // Handle results
    this.recognition.onresult = (event) => {
      const results = event.results;
      const latestResult = results[results.length - 1];
      
      if (latestResult.isFinal) {
        const transcript = this.processMedicalTerms(latestResult[0].transcript);
        this.onTranscript(transcript, true);
      } else {
        const interim = latestResult[0].transcript;
        this.onTranscript(interim, false);
      }
    };
    
    // Handle errors
    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.handleError(event.error);
    };
    
    // Handle end
    this.recognition.onend = () => {
      this.isListening = false;
      console.log('Speech recognition ended');
    };
  },

  // Process and correct medical terminology
  processMedicalTerms(transcript) {
    let processed = transcript.toLowerCase();
    
    // Replace common misrecognitions
    const replacements = {
      'a fib': 'atrial fibrillation',
      'a-fib': 'atrial fibrillation',
      'chf': 'congestive heart failure',
      'copd': 'COPD',
      'uti': 'urinary tract infection',
      'bid': 'twice daily',
      'tid': 'three times daily',
      'qid': 'four times daily',
      'p.o.': 'by mouth',
      'i.v.': 'intravenous',
      'i.m.': 'intramuscular',
      's.c.': 'subcutaneous',
      'mini mental': 'MMSE',
      'moca': 'MoCA',
      'cam': 'CAM'
    };
    
    Object.entries(replacements).forEach(([pattern, replacement]) => {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      processed = processed.replace(regex, replacement);
    });
    
    // Capitalize medical terms appropriately
    this.medicalTerms.medications.forEach(med => {
      const regex = new RegExp(`\\b${med}\\b`, 'gi');
      processed = processed.replace(regex, med.charAt(0).toUpperCase() + med.slice(1));
    });
    
    // Capitalize first letter of sentences
    processed = processed.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    
    return processed;
  },

  // Start dictation
  startDictation(callback) {
    if (!this.recognition) {
      if (!this.init()) {
        callback({ error: 'Speech recognition not available' });
        return;
      }
    }
    
    this.onTranscript = callback;
    this.recognition.lang = this.language;
    this.recognition.start();
    this.isListening = true;
    
    console.log('🎤 Listening...');
    return true;
  },

  // Stop dictation
  stopDictation() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      console.log('🎤 Stopped listening');
    }
  },

  // Toggle language
  toggleLanguage() {
    this.language = this.language === 'en-US' ? 'he-IL' : 'en-US';
    console.log(`Language switched to: ${this.language}`);
    
    if (this.isListening) {
      this.stopDictation();
      setTimeout(() => this.startDictation(this.onTranscript), 100);
    }
  },

  // Dictate clinical note
  dictateClinicalNote(noteType = 'progress') {
    const templates = {
      progress: {
        prompts: [
          'State patient identification',
          'Describe subjective findings',
          'Report vital signs',
          'Describe physical exam findings',
          'State assessment',
          'Outline plan'
        ],
        structure: ['ID', 'S', 'O', 'A', 'P']
      },
      admission: {
        prompts: [
          'State chief complaint',
          'Describe history of present illness',
          'List past medical history',
          'List current medications',
          'Report physical examination',
          'State initial assessment and plan'
        ],
        structure: ['CC', 'HPI', 'PMH', 'Meds', 'PE', 'A/P']
      },
      discharge: {
        prompts: [
          'State discharge diagnosis',
          'Describe hospital course',
          'List discharge medications',
          'State follow-up instructions',
          'Describe discharge condition'
        ],
        structure: ['Diagnosis', 'Course', 'Medications', 'Follow-up', 'Condition']
      }
    };
    
    const template = templates[noteType] || templates.progress;
    let noteData = {};
    let currentSection = 0;
    
    const nextSection = () => {
      if (currentSection < template.prompts.length) {
        this.speak(template.prompts[currentSection]);
        
        setTimeout(() => {
          this.startDictation((transcript, isFinal) => {
            if (isFinal) {
              noteData[template.structure[currentSection]] = transcript;
              currentSection++;
              
              if (currentSection < template.prompts.length) {
                this.stopDictation();
                setTimeout(nextSection, 1000);
              } else {
                this.stopDictation();
                this.onNoteComplete(noteData);
              }
            }
          });
        }, 2000);
      }
    };
    
    nextSection();
  },

  // Text-to-speech for questions and feedback
  speak(text, options = {}) {
    if (!this.synthesis) {
      console.warn('TTS not available');
      return;
    }
    
    // Cancel any ongoing speech
    this.synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    utterance.lang = options.lang || this.language;
    
    // Select voice
    const voices = this.synthesis.getVoices();
    if (voices.length > 0) {
      const preferredVoice = voices.find(v => 
        v.lang.startsWith(this.language.split('-')[0])
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }
    
    // Speak
    this.synthesis.speak(utterance);
    
    return new Promise((resolve) => {
      utterance.onend = resolve;
    });
  },

  // Playback quiz questions during commute
  async playbackQuestions(questions, options = {}) {
    const speed = options.speed || 1.0;
    const pauseBetween = options.pauseBetween || 3000;
    const autoAnswer = options.autoAnswer !== false;
    
    for (const question of questions) {
      // Speak question
      await this.speak(question.question, { rate: speed });
      
      // Pause for thinking
      await new Promise(resolve => setTimeout(resolve, pauseBetween));
      
      // Speak answer if enabled
      if (autoAnswer) {
        await this.speak(`The answer is: ${question.answer}`, { rate: speed });
        
        // Pause before next question
        await new Promise(resolve => setTimeout(resolve, pauseBetween / 2));
      }
    }
    
    await this.speak('Quiz playback complete', { rate: speed });
  },

  // Voice commands
  setupVoiceCommands(commandHandlers) {
    const commands = {
      'next question': () => commandHandlers.nextQuestion?.(),
      'previous question': () => commandHandlers.previousQuestion?.(),
      'repeat question': () => commandHandlers.repeatQuestion?.(),
      'show answer': () => commandHandlers.showAnswer?.(),
      'start quiz': () => commandHandlers.startQuiz?.(),
      'stop quiz': () => commandHandlers.stopQuiz?.(),
      'calculate': (params) => commandHandlers.calculate?.(params),
      'look up': (params) => commandHandlers.lookup?.(params),
      'take note': () => this.dictateClinicalNote(),
      'dark mode': () => commandHandlers.toggleDarkMode?.(),
      'help': () => commandHandlers.showHelp?.()
    };
    
    this.commandHandlers = { ...commands, ...commandHandlers };
  },

  // Process voice commands
  processCommand(transcript) {
    const lowerTranscript = transcript.toLowerCase();
    
    for (const [command, handler] of Object.entries(this.commandHandlers || {})) {
      if (lowerTranscript.includes(command)) {
        const params = lowerTranscript.replace(command, '').trim();
        handler(params);
        return true;
      }
    }
    
    return false;
  },

  // Error handling
  handleError(error) {
    const errorMessages = {
      'no-speech': 'No speech detected. Please try again.',
      'audio-capture': 'No microphone found. Please check your settings.',
      'not-allowed': 'Microphone permission denied. Please allow access.',
      'network': 'Network error. Please check your connection.',
      'aborted': 'Speech recognition aborted.',
      'language-not-supported': 'Language not supported. Switching to English.',
      'service-not-allowed': 'Speech service not allowed. Please check browser settings.'
    };
    
    const message = errorMessages[error] || `Speech recognition error: ${error}`;
    console.error(message);
    
    if (this.onError) {
      this.onError(message);
    }
  },

  // Export dictated note
  exportNote(noteData, format = 'text') {
    const formatters = {
      text: (data) => {
        return Object.entries(data)
          .map(([section, content]) => `${section}: ${content}`)
          .join('\n\n');
      },
      json: (data) => JSON.stringify(data, null, 2),
      soap: (data) => {
        return `SUBJECTIVE:\n${data.S || ''}\n\n` +
               `OBJECTIVE:\n${data.O || ''}\n\n` +
               `ASSESSMENT:\n${data.A || ''}\n\n` +
               `PLAN:\n${data.P || ''}`;
      }
    };
    
    const formatted = formatters[format](noteData);
    
    // Create download
    const blob = new Blob([formatted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinical_note_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    return formatted;
  },

  // Callback handlers (to be set by the app)
  onTranscript: (transcript, isFinal) => {
    console.log(`Transcript: ${transcript} (Final: ${isFinal})`);
  },
  
  onNoteComplete: (noteData) => {
    console.log('Note completed:', noteData);
  },
  
  onError: (error) => {
    console.error('Voice error:', error);
  }
};

export default VoiceNotes;