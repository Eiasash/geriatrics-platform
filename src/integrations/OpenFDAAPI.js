// OpenFDA Integration
// Access FDA adverse event reports and drug safety data

export class OpenFDAAPI {
  constructor() {
    this.baseUrl = 'https://api.fda.gov/';
    this.cache = new Map();
    this.cacheExpiry = 60 * 60 * 1000; // 1 hour
  }

  /**
   * Get adverse events for a drug in elderly patients
   * @param {string} drugName - Drug name
   * @param {number} limit - Number of results
   * @returns {Promise<Object>} - Adverse events data
   */
  async getAdverseEvents(drugName, limit = 10) {
    const cacheKey = `adverse_${drugName}_${limit}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Search for adverse events in elderly patients (65+)
      const query = `patient.drug.medicinalproduct:"${drugName}"+AND+patient.patientonsetage:[65+TO+120]`;
      const url = `${this.baseUrl}drug/event.json?search=${encodeURIComponent(query)}&limit=${limit}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        return {
          drug: drugName,
          events: [],
          count: 0,
          message: 'No adverse events found'
        };
      }
      
      // Process and format adverse events
      const processedEvents = data.results.map(event => this.formatAdverseEvent(event));
      
      // Aggregate by reaction type
      const aggregatedEvents = this.aggregateEvents(processedEvents);
      
      const result = {
        drug: drugName,
        events: processedEvents,
        aggregated: aggregatedEvents,
        count: data.meta?.results?.total || processedEvents.length,
        elderlySpecific: true,
        timestamp: new Date().toISOString()
      };
      
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('OpenFDA adverse events error:', error);
      return {
        drug: drugName,
        events: [],
        count: 0,
        error: error.message
      };
    }
  }

  /**
   * Get drug recalls
   * @param {string} drugName - Drug name
   * @returns {Promise<Object>} - Recall information
   */
  async getDrugRecalls(drugName) {
    const cacheKey = `recalls_${drugName}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}drug/enforcement.json?search=product_description:"${drugName}"&limit=5`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        return {
          drug: drugName,
          recalls: [],
          message: 'No recalls found'
        };
      }
      
      const recalls = data.results.map(recall => ({
        recallNumber: recall.recall_number,
        reason: recall.reason_for_recall,
        classification: recall.classification,
        date: recall.recall_initiation_date,
        product: recall.product_description,
        codeInfo: recall.code_info,
        distribution: recall.distribution_pattern,
        quantity: recall.product_quantity,
        status: recall.status
      }));
      
      const result = {
        drug: drugName,
        recalls,
        count: recalls.length
      };
      
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Drug recalls fetch error:', error);
      return {
        drug: drugName,
        recalls: [],
        error: error.message
      };
    }
  }

  /**
   * Get drug label information
   * @param {string} drugName - Drug name
   * @returns {Promise<Object>} - Label data
   */
  async getDrugLabel(drugName) {
    const cacheKey = `label_${drugName}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}drug/label.json?search=openfda.brand_name:"${drugName}"+OR+openfda.generic_name:"${drugName}"&limit=1`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        return {
          drug: drugName,
          label: null,
          message: 'No label information found'
        };
      }
      
      const label = data.results[0];
      
      const result = {
        drug: drugName,
        brandName: label.openfda?.brand_name?.[0],
        genericName: label.openfda?.generic_name?.[0],
        manufacturer: label.openfda?.manufacturer_name?.[0],
        route: label.openfda?.route?.[0],
        substance: label.openfda?.substance_name?.[0],
        purpose: label.purpose?.[0],
        warnings: label.warnings?.[0],
        doNotUse: label.do_not_use?.[0],
        askDoctor: label.ask_doctor?.[0],
        geriatricUse: label.geriatric_use?.[0],
        dosageAdministration: label.dosage_and_administration?.[0],
        adverseReactions: label.adverse_reactions?.[0],
        drugInteractions: label.drug_interactions?.[0],
        contraindications: label.contraindications?.[0],
        overdosage: label.overdosage?.[0],
        clinicalPharmacology: label.clinical_pharmacology?.[0]
      };
      
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Drug label fetch error:', error);
      return {
        drug: drugName,
        label: null,
        error: error.message
      };
    }
  }

  /**
   * Search for drug-drug interactions
   * @param {Array} drugList - List of drugs
   * @returns {Promise<Object>} - Interaction data
   */
  async searchDrugInteractions(drugList) {
    if (!drugList || drugList.length < 2) {
      return { interactions: [], message: 'Need at least 2 drugs to check interactions' };
    }

    const interactions = [];
    
    // Check each pair of drugs
    for (let i = 0; i < drugList.length; i++) {
      for (let j = i + 1; j < drugList.length; j++) {
        const drug1 = drugList[i];
        const drug2 = drugList[j];
        
        // Search for adverse events mentioning both drugs
        const query = `patient.drug.medicinalproduct:"${drug1}"+AND+patient.drug.medicinalproduct:"${drug2}"`;
        
        try {
          const url = `${this.baseUrl}drug/event.json?search=${encodeURIComponent(query)}&limit=5`;
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const commonReactions = this.extractCommonReactions(data.results);
            
            interactions.push({
              drug1,
              drug2,
              reportCount: data.meta?.results?.total || 0,
              commonReactions,
              severity: this.assessInteractionSeverity(commonReactions)
            });
          }
        } catch (error) {
          console.error(`Interaction check error for ${drug1} and ${drug2}:`, error);
        }
      }
    }
    
    return {
      drugs: drugList,
      interactions,
      checkedPairs: (drugList.length * (drugList.length - 1)) / 2
    };
  }

  /**
   * Get geriatric-specific adverse events
   * @param {string} drugName - Drug name
   * @returns {Promise<Object>} - Geriatric-specific events
   */
  async getGeriatricAdverseEvents(drugName) {
    const cacheKey = `geriatric_ae_${drugName}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Compare elderly (65+) vs younger patients
      const elderlyQuery = `patient.drug.medicinalproduct:"${drugName}"+AND+patient.patientonsetage:[65+TO+120]`;
      const youngQuery = `patient.drug.medicinalproduct:"${drugName}"+AND+patient.patientonsetage:[18+TO+64]`;
      
      const [elderlyResponse, youngResponse] = await Promise.all([
        fetch(`${this.baseUrl}drug/event.json?search=${encodeURIComponent(elderlyQuery)}&limit=100`),
        fetch(`${this.baseUrl}drug/event.json?search=${encodeURIComponent(youngQuery)}&limit=100`)
      ]);
      
      const elderlyData = await elderlyResponse.json();
      const youngData = await youngResponse.json();
      
      const elderlyEvents = this.aggregateEvents(
        (elderlyData.results || []).map(e => this.formatAdverseEvent(e))
      );
      
      const youngEvents = this.aggregateEvents(
        (youngData.results || []).map(e => this.formatAdverseEvent(e))
      );
      
      // Calculate relative risk
      const relativeRisk = this.calculateRelativeRisk(elderlyEvents, youngEvents);
      
      const result = {
        drug: drugName,
        elderlyEvents,
        youngEvents,
        relativeRisk,
        elderlySpecificRisks: relativeRisk.filter(r => r.ratio > 2),
        timestamp: new Date().toISOString()
      };
      
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Geriatric adverse events error:', error);
      return {
        drug: drugName,
        error: error.message
      };
    }
  }

  /**
   * Format adverse event data
   * @private
   */
  formatAdverseEvent(event) {
    const patient = event.patient || {};
    const reactions = patient.reaction || [];
    const drugs = patient.drug || [];
    
    return {
      reactions: reactions.map(r => ({
        term: r.reactionmeddrapt,
        outcome: r.reactionoutcome
      })),
      serious: event.serious === '1',
      seriousnessCriteria: {
        death: event.seriousnessdeath === '1',
        hospitalization: event.seriousnesshospitalization === '1',
        disabling: event.seriousnessdisabling === '1',
        lifeThreatening: event.seriousnesslifethreatening === '1',
        other: event.seriousnessother === '1'
      },
      age: patient.patientonsetage,
      ageUnit: patient.patientonsetageunit,
      sex: patient.patientsex,
      weight: patient.patientweight,
      drugs: drugs.map(d => ({
        name: d.medicinalproduct,
        dose: d.drugdosagetext,
        indication: d.drugindication,
        action: d.actiondrug
      })),
      reportDate: event.receiptdate,
      country: event.occurcountry
    };
  }

  /**
   * Aggregate events by reaction
   * @private
   */
  aggregateEvents(events) {
    const aggregated = {};
    
    events.forEach(event => {
      event.reactions.forEach(reaction => {
        const term = reaction.term;
        if (!aggregated[term]) {
          aggregated[term] = {
            count: 0,
            serious: 0,
            outcomes: {}
          };
        }
        
        aggregated[term].count++;
        if (event.serious) aggregated[term].serious++;
        
        const outcome = reaction.outcome || 'Unknown';
        aggregated[term].outcomes[outcome] = (aggregated[term].outcomes[outcome] || 0) + 1;
      });
    });
    
    // Convert to sorted array
    return Object.entries(aggregated)
      .map(([term, data]) => ({
        reaction: term,
        ...data,
        seriousRate: (data.serious / data.count * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Extract common reactions from events
   * @private
   */
  extractCommonReactions(events) {
    const reactions = {};
    
    events.forEach(event => {
      if (event.patient?.reaction) {
        event.patient.reaction.forEach(r => {
          const term = r.reactionmeddrapt;
          reactions[term] = (reactions[term] || 0) + 1;
        });
      }
    });
    
    return Object.entries(reactions)
      .map(([term, count]) => ({ reaction: term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  /**
   * Assess interaction severity
   * @private
   */
  assessInteractionSeverity(reactions) {
    const severeTerms = ['death', 'hospitalization', 'disability', 'congenital', 'life-threatening'];
    const moderateTerms = ['bleeding', 'hypotension', 'hyperkalemia', 'renal', 'hepatic'];
    
    const hasSerious = reactions.some(r => 
      severeTerms.some(term => r.reaction.toLowerCase().includes(term))
    );
    
    const hasModerate = reactions.some(r =>
      moderateTerms.some(term => r.reaction.toLowerCase().includes(term))
    );
    
    if (hasSerious) return 'Major';
    if (hasModerate) return 'Moderate';
    return 'Minor';
  }

  /**
   * Calculate relative risk between age groups
   * @private
   */
  calculateRelativeRisk(elderlyEvents, youngEvents) {
    const relativeRisk = [];
    
    elderlyEvents.forEach(elderlyEvent => {
      const youngEvent = youngEvents.find(y => y.reaction === elderlyEvent.reaction);
      
      if (youngEvent) {
        const ratio = elderlyEvent.count / youngEvent.count;
        relativeRisk.push({
          reaction: elderlyEvent.reaction,
          elderlyCount: elderlyEvent.count,
          youngCount: youngEvent.count,
          ratio: ratio.toFixed(2),
          increased: ratio > 1.5
        });
      } else {
        relativeRisk.push({
          reaction: elderlyEvent.reaction,
          elderlyCount: elderlyEvent.count,
          youngCount: 0,
          ratio: 'Elderly only',
          increased: true
        });
      }
    });
    
    return relativeRisk.sort((a, b) => {
      if (a.ratio === 'Elderly only') return -1;
      if (b.ratio === 'Elderly only') return 1;
      return parseFloat(b.ratio) - parseFloat(a.ratio);
    });
  }

  /**
   * Cache management
   * @private
   */
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

export default OpenFDAAPI;