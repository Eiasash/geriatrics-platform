// ClinicalTrials.gov Integration
// Search for active clinical trials with focus on geriatric populations

export class ClinicalTrialsAPI {
  constructor() {
    this.baseUrl = 'https://clinicaltrials.gov/api/query/';
    this.cache = new Map();
    this.cacheExpiry = 60 * 60 * 1000; // 1 hour
  }

  /**
   * Search for active clinical trials
   * @param {string} condition - Medical condition
   * @param {string} location - Geographic location (default: Israel)
   * @returns {Promise<Object>} - Active trials
   */
  async searchActiveTrials(condition, location = 'Israel') {
    const cacheKey = `trials_${condition}_${location}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Build search expression
      const expr = `${condition}+AND+${location}+AND+(elderly+OR+geriatric+OR+aged)`;
      
      const url = `${this.baseUrl}study_fields?expr=${encodeURIComponent(expr)}&fields=NCTId,BriefTitle,Condition,InterventionName,Phase,StudyType,OverallStatus,StartDate,CompletionDate,EnrollmentCount,EligibilityCriteria,BriefSummary,StudyDesignInfo,LocationCity,LocationCountry&min_rnk=1&max_rnk=50&fmt=json`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.StudyFieldsResponse?.StudyFields) {
        return { trials: [], count: 0, location, condition };
      }
      
      // Filter for recruiting trials
      const recruitingTrials = data.StudyFieldsResponse.StudyFields
        .filter(trial => 
          trial.OverallStatus?.[0]?.includes('Recruiting') ||
          trial.OverallStatus?.[0]?.includes('Enrolling')
        )
        .map(trial => this.formatTrial(trial));
      
      const result = {
        trials: recruitingTrials,
        count: recruitingTrials.length,
        totalFound: data.StudyFieldsResponse.NStudiesFound,
        location,
        condition,
        timestamp: new Date().toISOString()
      };
      
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('ClinicalTrials.gov search error:', error);
      return { 
        trials: [], 
        count: 0, 
        error: error.message,
        location,
        condition
      };
    }
  }

  /**
   * Get detailed trial information
   * @param {string} nctId - NCT identifier
   * @returns {Promise<Object>} - Detailed trial info
   */
  async getTrialDetails(nctId) {
    const cacheKey = `trial_${nctId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}full_studies?expr=${nctId}&fmt=json`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.FullStudiesResponse?.FullStudies?.[0]) {
        return null;
      }
      
      const study = data.FullStudiesResponse.FullStudies[0].Study;
      const formatted = this.formatDetailedTrial(study);
      
      this.setCache(cacheKey, formatted);
      return formatted;
    } catch (error) {
      console.error('Trial details fetch error:', error);
      return null;
    }
  }

  /**
   * Search trials by intervention type
   * @param {string} intervention - Drug or intervention name
   * @returns {Promise<Object>} - Matching trials
   */
  async searchByIntervention(intervention) {
    const cacheKey = `intervention_${intervention}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const expr = `${intervention}+AND+(elderly+OR+geriatric+OR+aged)`;
      const url = `${this.baseUrl}study_fields?expr=${encodeURIComponent(expr)}&fields=NCTId,BriefTitle,InterventionName,Phase,OverallStatus,Condition&min_rnk=1&max_rnk=20&fmt=json`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      const trials = data.StudyFieldsResponse?.StudyFields?.map(trial => ({
        nctId: trial.NCTId?.[0],
        title: trial.BriefTitle?.[0],
        intervention: trial.InterventionName?.join(', '),
        phase: trial.Phase?.[0],
        status: trial.OverallStatus?.[0],
        conditions: trial.Condition
      })) || [];
      
      const result = { trials, intervention };
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Intervention search error:', error);
      return { trials: [], intervention, error: error.message };
    }
  }

  /**
   * Get trials for common geriatric conditions
   */
  async getGeriatricTrials() {
    const conditions = [
      'Alzheimer Disease',
      'Dementia',
      'Falls',
      'Frailty',
      'Polypharmacy',
      'Delirium',
      'Osteoporosis',
      'Heart Failure'
    ];
    
    const results = await Promise.all(
      conditions.map(condition => this.searchActiveTrials(condition, 'Israel'))
    );
    
    return conditions.reduce((acc, condition, index) => {
      acc[condition.toLowerCase().replace(/\s+/g, '_')] = results[index];
      return acc;
    }, {});
  }

  /**
   * Format trial data
   * @private
   */
  formatTrial(trial) {
    return {
      nctId: trial.NCTId?.[0],
      title: trial.BriefTitle?.[0],
      conditions: trial.Condition || [],
      interventions: trial.InterventionName || [],
      phase: trial.Phase?.[0] || 'Not Applicable',
      studyType: trial.StudyType?.[0],
      status: trial.OverallStatus?.[0],
      startDate: trial.StartDate?.[0],
      completionDate: trial.CompletionDate?.[0],
      enrollment: trial.EnrollmentCount?.[0],
      eligibility: this.parseEligibility(trial.EligibilityCriteria?.[0]),
      summary: trial.BriefSummary?.[0],
      locations: {
        city: trial.LocationCity || [],
        country: trial.LocationCountry || []
      },
      url: `https://clinicaltrials.gov/ct2/show/${trial.NCTId?.[0]}`
    };
  }

  /**
   * Format detailed trial data
   * @private
   */
  formatDetailedTrial(study) {
    const protocol = study.ProtocolSection;
    
    return {
      nctId: protocol.IdentificationModule?.NCTId,
      title: protocol.IdentificationModule?.BriefTitle,
      officialTitle: protocol.IdentificationModule?.OfficialTitle,
      status: protocol.StatusModule?.OverallStatus,
      phase: protocol.DesignModule?.PhaseList?.Phase || ['Not Applicable'],
      studyType: protocol.DesignModule?.StudyType,
      conditions: protocol.ConditionsModule?.ConditionList?.Condition || [],
      interventions: this.formatInterventions(protocol.ArmsInterventionsModule),
      eligibility: {
        criteria: protocol.EligibilityModule?.EligibilityCriteria,
        ageRange: {
          min: protocol.EligibilityModule?.MinimumAge,
          max: protocol.EligibilityModule?.MaximumAge
        },
        gender: protocol.EligibilityModule?.Gender,
        healthyVolunteers: protocol.EligibilityModule?.HealthyVolunteers
      },
      enrollment: protocol.DesignModule?.EnrollmentInfo?.EnrollmentCount,
      primaryOutcomes: protocol.OutcomesModule?.PrimaryOutcomeList?.PrimaryOutcome || [],
      secondaryOutcomes: protocol.OutcomesModule?.SecondaryOutcomeList?.SecondaryOutcome || [],
      contacts: protocol.ContactsLocationsModule?.CentralContactList?.CentralContact || [],
      locations: protocol.ContactsLocationsModule?.LocationList?.Location || [],
      sponsors: protocol.SponsorCollaboratorsModule,
      lastUpdate: protocol.StatusModule?.LastUpdatePostDateStruct,
      url: `https://clinicaltrials.gov/ct2/show/${protocol.IdentificationModule?.NCTId}`
    };
  }

  /**
   * Format interventions
   * @private
   */
  formatInterventions(armsModule) {
    if (!armsModule?.InterventionList?.Intervention) return [];
    
    return armsModule.InterventionList.Intervention.map(intervention => ({
      type: intervention.InterventionType,
      name: intervention.InterventionName,
      description: intervention.InterventionDescription,
      armGroups: intervention.InterventionArmGroupLabelList?.InterventionArmGroupLabel || []
    }));
  }

  /**
   * Parse eligibility criteria
   * @private
   */
  parseEligibility(criteria) {
    if (!criteria) return { inclusion: [], exclusion: [] };
    
    const lines = criteria.split('\n');
    const result = { inclusion: [], exclusion: [] };
    let currentSection = null;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().includes('inclusion')) {
        currentSection = 'inclusion';
      } else if (trimmed.toLowerCase().includes('exclusion')) {
        currentSection = 'exclusion';
      } else if (trimmed && currentSection) {
        result[currentSection].push(trimmed);
      }
    });
    
    return result;
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

export default ClinicalTrialsAPI;