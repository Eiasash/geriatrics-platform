import { useState, useEffect } from 'react';
import { launchDarkly } from '../services/launchdarkly.js';

export function useFeatureFlag(flagKey, defaultValue = false) {
  const [flagValue, setFlagValue] = useState(
    launchDarkly.getFlag(flagKey, defaultValue)
  );

  useEffect(() => {
    const updateFlag = () => {
      setFlagValue(launchDarkly.getFlag(flagKey, defaultValue));
    };

    const handleFlagChange = (event) => {
      if (event.detail && event.detail[flagKey] !== undefined) {
        setFlagValue(event.detail[flagKey]);
      }
    };

    window.addEventListener('launchdarkly:flagsChanged', handleFlagChange);
    
    updateFlag();

    return () => {
      window.removeEventListener('launchdarkly:flagsChanged', handleFlagChange);
    };
  }, [flagKey, defaultValue]);

  return flagValue;
}

export function useAllFeatureFlags() {
  const [flags, setFlags] = useState(launchDarkly.getAllFlags());

  useEffect(() => {
    const handleFlagChange = (event) => {
      setFlags(event.detail);
    };

    window.addEventListener('launchdarkly:flagsChanged', handleFlagChange);

    return () => {
      window.removeEventListener('launchdarkly:flagsChanged', handleFlagChange);
    };
  }, []);

  return flags;
}