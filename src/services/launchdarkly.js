import * as LDClient from 'launchdarkly-js-client-sdk';

class LaunchDarklyService {
  constructor() {
    this.client = null;
    this.user = null;
    this.isInitialized = false;
    this.fallbackFlags = {
      aiEnhancedLearning: true,
      israeliHealthcareNav: true,
      fellowshipTracking: true,
      multiAiConsensus: true,
      hebrewVoice: true,
      clinicalDecisionSupport: true
    };
  }

  async initialize(userId = 'anonymous', userContext = {}) {
    const sdkKey = import.meta.env.VITE_LAUNCHDARKLY_SDK_KEY || 'sdk-f6415221-dcbf-4dec-8bb3-952842505ca3';
    
    if (!sdkKey) {
      console.warn('LaunchDarkly SDK key not found, using fallback flags');
      return;
    }

    this.user = {
      key: userId,
      custom: {
        ...userContext,
        environment: import.meta.env.MODE || 'development'
      }
    };

    try {
      this.client = LDClient.initialize(sdkKey, this.user);
      
      await this.client.waitForInitialization();
      this.isInitialized = true;
      
      console.log('LaunchDarkly initialized successfully');
      
      this.client.on('change', (flags) => {
        console.log('Feature flags updated:', flags);
        this.handleFlagChange(flags);
      });
      
    } catch (error) {
      console.error('Failed to initialize LaunchDarkly:', error);
      this.isInitialized = false;
    }
  }

  getFlag(flagKey, defaultValue = false) {
    if (!this.isInitialized || !this.client) {
      return this.fallbackFlags[flagKey] !== undefined 
        ? this.fallbackFlags[flagKey] 
        : defaultValue;
    }
    
    return this.client.variation(flagKey, defaultValue);
  }

  getAllFlags() {
    if (!this.isInitialized || !this.client) {
      return this.fallbackFlags;
    }
    
    return this.client.allFlags();
  }

  async updateUser(userId, userContext = {}) {
    if (!this.client) return;
    
    this.user = {
      key: userId,
      custom: {
        ...userContext,
        environment: import.meta.env.MODE || 'development'
      }
    };
    
    await this.client.identify(this.user);
  }

  handleFlagChange(flags) {
    window.dispatchEvent(new CustomEvent('launchdarkly:flagsChanged', { 
      detail: flags 
    }));
  }

  async flush() {
    if (this.client) {
      await this.client.flush();
    }
  }

  close() {
    if (this.client) {
      this.client.close();
      this.isInitialized = false;
      this.client = null;
    }
  }
}

export const launchDarkly = new LaunchDarklyService();
export default launchDarkly;