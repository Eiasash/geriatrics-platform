// Comprehensive Medical Textbook System
// Contains structured medical textbook content for geriatrics education

export const medicalTextbooks = {
  // Geriatrics Core Textbooks
  geriatrics: {
    "essentials-of-geriatric-medicine": {
      id: "essentials-geriatric-med",
      title: "Essentials of Geriatric Medicine",
      authors: ["Robert J. Ham", "Philip D. Sloane", "Gregg A. Warshaw"],
      edition: "8th Edition",
      publisher: "Springer",
      isbn: "978-0-387-22614-3",
      year: 2022,
      category: "geriatrics",
      tags: ["comprehensive", "clinical", "assessment", "management"],
      description: "Comprehensive guide to geriatric medicine covering assessment, common conditions, and management strategies.",
      
      chapters: [
        {
          number: 1,
          title: "Principles of Geriatric Medicine",
          sections: [
            {
              title: "Aging Process and Physiological Changes",
              content: "Normal aging involves predictable physiological changes that affect multiple organ systems. Cardiovascular changes include decreased cardiac output, arterial stiffening, and reduced baroreceptor sensitivity. Renal function declines with age, with GFR decreasing approximately 1ml/min/1.73m² per year after age 30. Cognitive changes may include mild processing speed decline but preserved crystallized intelligence.",
              keyPoints: [
                "Aging is not synonymous with disease",
                "Physiological reserve decreases with age",
                "Homeostatic mechanisms become less efficient",
                "Multiple comorbidities are common in elderly"
              ]
            },
            {
              title: "Comprehensive Geriatric Assessment",
              content: "CGA is a multidisciplinary diagnostic process to determine medical, psychological, and functional capabilities. It includes assessment of cognition, mood, nutrition, medication review, social support, and functional status. Studies show CGA improves outcomes and reduces institutionalization rates.",
              keyPoints: [
                "Multidisciplinary approach essential",
                "Functional assessment key component",
                "Medication reconciliation critical",
                "Social determinants affect health outcomes"
              ]
            }
          ]
        },
        {
          number: 2,
          title: "Common Geriatric Syndromes",
          sections: [
            {
              title: "Delirium in the Elderly",
              content: "Delirium affects 20-40% of hospitalized elderly patients. Risk factors include advanced age, cognitive impairment, severe illness, and polypharmacy. Prevention strategies include maintaining sleep-wake cycles, early mobilization, adequate nutrition and hydration, and medication review.",
              keyPoints: [
                "Hypoactive delirium often missed",
                "Prevention more effective than treatment",
                "Underlying causes must be identified",
                "Antipsychotics only for severe agitation"
              ]
            },
            {
              title: "Falls and Mobility Disorders",
              content: "One-third of adults over 65 fall annually. Multifactorial causes include muscle weakness, balance problems, medications (especially psychoactive drugs), environmental hazards, and chronic conditions. Comprehensive fall risk assessment should evaluate gait, balance, vision, cognition, and medications.",
              keyPoints: [
                "Multifactorial intervention most effective",
                "Home safety assessment important",
                "Strength and balance training beneficial",
                "Vitamin D supplementation may help"
              ]
            }
          ]
        },
        {
          number: 3,
          title: "Cardiovascular Disease in Aging",
          sections: [
            {
              title: "Hypertension Management in Elderly",
              content: "Hypertension affects 60% of adults over 65. Target BP goals may be less aggressive in frail elderly (150/90 vs 130/80). ACE inhibitors or ARBs are first-line, with careful monitoring for hyperkalemia and renal function decline. Orthostatic hypotension is common complication.",
              keyPoints: [
                "Individualize BP targets based on frailty",
                "Monitor for orthostatic hypotension",
                "Start low, go slow with medications",
                "Consider medication burden"
              ]
            }
          ]
        }
      ]
    },

    "hazards-hospitalization": {
      id: "hazards-hospitalization",
      title: "The Hazards of Hospitalization of the Elderly",
      authors: ["Mary Tinetti", "Sarah Inouye"],
      category: "geriatrics",
      description: "Essential guide to preventing iatrogenic complications in hospitalized elderly patients.",
      
      chapters: [
        {
          number: 1,
          title: "Hospital-Associated Functional Decline",
          sections: [
            {
              title: "Immobility and Deconditioning",
              content: "Bed rest leads to rapid muscle loss (1-1.5% per day), bone loss, cardiovascular deconditioning, and increased risk of venous thromboembolism. Early mobilization within 24-48 hours of admission can prevent many complications.",
              keyPoints: [
                "Muscle strength decreases 1-1.5% daily with bed rest",
                "Early mobilization prevents complications",
                "Physical therapy consultation early",
                "Avoid unnecessary bed rest orders"
              ]
            }
          ]
        }
      ]
    }
  },

  // Internal Medicine Textbooks
  internalMedicine: {
    "harrisons-principles": {
      id: "harrisons-21st",
      title: "Harrison's Principles of Internal Medicine",
      authors: ["Dennis L. Kasper", "Anthony S. Fauci", "Stephen L. Hauser"],
      edition: "21st Edition",
      publisher: "McGraw-Hill",
      year: 2022,
      category: "internal-medicine",
      
      chapters: [
        {
          number: 45,
          title: "Dementia and Alzheimer's Disease",
          sections: [
            {
              title: "Alzheimer's Disease Pathophysiology",
              content: "AD is characterized by extracellular amyloid plaques (Aβ peptides) and intracellular neurofibrillary tangles (tau protein). Progressive neuronal loss begins in entorhinal cortex and hippocampus, spreading to association cortices. Clinical symptoms correlate with degree of synaptic loss.",
              keyPoints: [
                "Amyloid hypothesis vs tau hypothesis",
                "Synaptic loss correlates with symptoms",
                "Gradual progression over 8-10 years",
                "Early involvement of memory circuits"
              ]
            },
            {
              title: "Diagnosis and Assessment",
              content: "Clinical diagnosis based on cognitive testing (MoCA, MMSE), functional assessment, and biomarkers. CSF Aβ42/tau ratio and amyloid PET imaging can support diagnosis. Rule out reversible causes including B12 deficiency, thyroid disease, and depression.",
              keyPoints: [
                "Clinical criteria remain gold standard",
                "Biomarkers support but don't replace clinical judgment",
                "Always screen for reversible causes",
                "Neuroimaging to rule out other pathology"
              ]
            }
          ]
        }
      ]
    }
  },

  // Pharmacology and Drug References
  pharmacology: {
    "geriatric-pharmacology": {
      id: "geriatric-pharm-guide",
      title: "Geriatric Pharmacology and Polypharmacy Management",
      authors: ["Todd Semla", "Catherine MacLean", "Donna Fick"],
      category: "pharmacology",
      
      chapters: [
        {
          number: 1,
          title: "Age-Related Pharmacokinetic Changes",
          sections: [
            {
              title: "Absorption, Distribution, Metabolism, Excretion",
              content: "Aging affects all aspects of pharmacokinetics. Decreased gastric acid and delayed gastric emptying may affect absorption. Increased body fat and decreased total body water alter distribution of lipophilic vs hydrophilic drugs. Reduced hepatic mass and blood flow decrease metabolism. Declining renal function reduces drug clearance.",
              keyPoints: [
                "Start low, go slow principle",
                "Adjust for renal function decline",
                "Consider drug-drug interactions",
                "Monitor for adverse effects closely"
              ]
            },
            {
              title: "Beers Criteria and Inappropriate Prescribing",
              content: "Beers Criteria identify potentially inappropriate medications in older adults. High-risk medications include anticholinergics, benzodiazepines, antipsychotics, and proton pump inhibitors. STOPP/START criteria provide European perspective on inappropriate prescribing and omissions.",
              keyPoints: [
                "Regular medication review essential",
                "Anticholinergic burden assessment",
                "Deprescribing when appropriate",
                "Consider non-pharmacologic alternatives"
              ]
            }
          ]
        }
      ]
    }
  },

  // Emergency Medicine
  emergencyMedicine: {
    "geriatric-emergency-medicine": {
      id: "geriatric-em",
      title: "Geriatric Emergency Medicine",
      authors: ["Catherine Marco", "Stephanie Munz", "Michael Stern"],
      category: "emergency-medicine",
      
      chapters: [
        {
          number: 1,
          title: "Approach to the Geriatric Patient in ED",
          sections: [
            {
              title: "Triage and Assessment Considerations",
              content: "Elderly patients may present atypically with serious conditions. Silent MI, afebrile sepsis, and painless abdominal catastrophes are common. Baseline functional status and cognitive assessment are crucial for disposition decisions.",
              keyPoints: [
                "Atypical presentations common",
                "Baseline functional status crucial",
                "Higher risk for adverse outcomes",
                "Consider elder abuse screening"
              ]
            }
          ]
        }
      ]
    }
  },

  // Clinical Guidelines and Evidence
  guidelines: {
    "age-clinical-guidelines": {
      id: "age-guidelines-2024",
      title: "American Geriatrics Society Clinical Practice Guidelines",
      publisher: "American Geriatrics Society",
      year: 2024,
      category: "guidelines",
      
      guidelines: [
        {
          title: "Management of Persistent Pain in Older Adults",
          summary: "Comprehensive approach to pain management emphasizing non-pharmacologic interventions, careful opioid prescribing, and functional goals.",
          keyRecommendations: [
            "Multimodal pain management approach",
            "Non-pharmacologic interventions first-line",
            "Careful risk-benefit analysis for opioids",
            "Regular reassessment of pain and function"
          ]
        },
        {
          title: "Prevention of Falls in Community-Dwelling Older Adults",
          summary: "Evidence-based recommendations for fall prevention including exercise programs, medication review, and environmental modifications.",
          keyRecommendations: [
            "Multifactorial risk assessment",
            "Exercise programs (balance, strength, tai chi)",
            "Medication review and modification",
            "Home safety evaluation"
          ]
        }
      ]
    }
  }
};

// Textbook search and retrieval system
export class TextbookManager {
  constructor() {
    this.textbooks = medicalTextbooks;
    this.searchIndex = this.buildSearchIndex();
  }

  buildSearchIndex() {
    const index = new Map();
    
    Object.values(this.textbooks).forEach(category => {
      Object.values(category).forEach(book => {
        // Index book metadata
        const terms = [
          book.title,
          ...(book.authors || []),
          book.category,
          ...(book.tags || []),
          book.description
        ].filter(Boolean);

        // Index chapter content
        if (book.chapters) {
          book.chapters.forEach(chapter => {
            terms.push(chapter.title);
            if (chapter.sections) {
              chapter.sections.forEach(section => {
                terms.push(section.title, section.content);
                if (section.keyPoints) {
                  terms.push(...section.keyPoints);
                }
              });
            }
          });
        }

        // Index guidelines
        if (book.guidelines) {
          book.guidelines.forEach(guideline => {
            terms.push(guideline.title, guideline.summary);
            if (guideline.keyRecommendations) {
              terms.push(...guideline.keyRecommendations);
            }
          });
        }

        terms.forEach(term => {
          const words = term.toLowerCase().split(/\s+/);
          words.forEach(word => {
            if (!index.has(word)) {
              index.set(word, new Set());
            }
            index.get(word).add(book.id);
          });
        });
      });
    });
    
    return index;
  }

  searchTextbooks(query, options = {}) {
    const {
      category = null,
      maxResults = 10,
      includeContent = true
    } = options;

    const searchTerms = query.toLowerCase().split(/\s+/);
    const bookScores = new Map();

    // Calculate relevance scores
    searchTerms.forEach(term => {
      if (this.searchIndex.has(term)) {
        this.searchIndex.get(term).forEach(bookId => {
          bookScores.set(bookId, (bookScores.get(bookId) || 0) + 1);
        });
      }
    });

    // Get matching books
    let results = [];
    Object.values(this.textbooks).forEach(categoryBooks => {
      Object.values(categoryBooks).forEach(book => {
        if (bookScores.has(book.id)) {
          if (!category || book.category === category) {
            results.push({
              ...book,
              relevanceScore: bookScores.get(book.id),
              matchingContent: includeContent ? this.getMatchingContent(book, searchTerms) : null
            });
          }
        }
      });
    });

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxResults);
  }

  getMatchingContent(book, searchTerms) {
    const matchingContent = [];

    if (book.chapters) {
      book.chapters.forEach(chapter => {
        if (chapter.sections) {
          chapter.sections.forEach(section => {
            const sectionText = `${section.title} ${section.content}`.toLowerCase();
            if (searchTerms.some(term => sectionText.includes(term))) {
              matchingContent.push({
                type: 'chapter',
                chapterTitle: chapter.title,
                sectionTitle: section.title,
                content: section.content.substring(0, 200) + '...',
                keyPoints: section.keyPoints || []
              });
            }
          });
        }
      });
    }

    return matchingContent.slice(0, 3); // Limit to top 3 matches
  }

  getBookById(bookId) {
    for (const category of Object.values(this.textbooks)) {
      for (const book of Object.values(category)) {
        if (book.id === bookId) {
          return book;
        }
      }
    }
    return null;
  }

  getBooksByCategory(category) {
    return Object.values(this.textbooks[category] || {});
  }

  getAllCategories() {
    return Object.keys(this.textbooks);
  }

  getRecentlyAdded(limit = 5) {
    const allBooks = [];
    Object.values(this.textbooks).forEach(category => {
      Object.values(category).forEach(book => allBooks.push(book));
    });
    
    return allBooks
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, limit);
  }

  // Quick reference lookup
  quickLookup(topic) {
    const commonTopics = {
      'delirium': {
        books: ['essentials-geriatric-med'],
        quickFacts: [
          'Affects 20-40% of hospitalized elderly',
          'Hypoactive type often missed',
          'Prevention more effective than treatment',
          'Check medications, infections, metabolic causes'
        ]
      },
      'falls': {
        books: ['essentials-geriatric-med', 'age-guidelines-2024'],
        quickFacts: [
          'One-third of adults >65 fall annually',
          'Multifactorial causes require comprehensive assessment',
          'Exercise programs most effective intervention',
          'Home safety modifications important'
        ]
      },
      'polypharmacy': {
        books: ['geriatric-pharm-guide'],
        quickFacts: [
          'Review medications regularly using Beers Criteria',
          'Start low, go slow with new medications',
          'Consider drug-drug interactions',
          'Assess anticholinergic burden'
        ]
      }
    };

    return commonTopics[topic.toLowerCase()] || null;
  }
}

export default medicalTextbooks;