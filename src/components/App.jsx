import React, { useEffect, useState } from 'react';
import { launchDarkly } from '../services/launchdarkly.js';

function App() {
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeLD = async () => {
      try {
        await launchDarkly.initialize('user-' + Date.now(), {
          department: 'geriatrics',
          hospital: 'shaare-zedek',
          role: 'physician'
        });
        
        const allFlags = launchDarkly.getAllFlags();
        setFlags(allFlags);
        setLoading(false);
      } catch (error) {
        console.error('Error initializing LaunchDarkly:', error);
        setLoading(false);
      }
    };

    initializeLD();

    const handleFlagChange = (event) => {
      setFlags(event.detail);
    };

    window.addEventListener('launchdarkly:flagsChanged', handleFlagChange);

    return () => {
      window.removeEventListener('launchdarkly:flagsChanged', handleFlagChange);
      launchDarkly.close();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feature flags...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          LaunchDarkly Integration Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Feature Flags Status
          </h2>
          
          <div className="space-y-4">
            {Object.entries(flags).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">{key}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {value ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
          
          {Object.keys(flags).length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No feature flags available. Check LaunchDarkly dashboard.
            </p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700">
            <strong>SDK Key:</strong> sdk-f6415221-dcbf-4dec-8bb3-952842505ca3
          </p>
          <p className="text-blue-600 mt-2">
            Connection Status: {launchDarkly.isInitialized ? '✅ Connected' : '❌ Disconnected'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;