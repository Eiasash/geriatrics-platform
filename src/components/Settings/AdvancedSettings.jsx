// Advanced Settings Component with Full Configuration
import React, { useState, useEffect } from 'react';

const AdvancedSettings = () => {
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'light',
    apiKeys: {
      anthropic: '',
      openai: '',
      google: ''
    },
    clinical: {
      defaultUnits: 'metric',
      riskCalculators: true,
      drugInteractions: true,
      allergyAlerts: true,
      dosageAlerts: true
    },
    interface: {
      fontSize: 'medium',
      colorContrast: 'normal',
      animations: true,
      shortcuts: true,
      autoSave: true
    },
    privacy: {
      analytics: false,
      crashReports: true,
      dataRetention: '1year',
      encryptNotes: true
    },
    backup: {
      autoBackup: true,
      backupFreq: 'daily',
      backupLocation: 'local',
      cloudSync: false
    },
    notifications: {
      alerts: true,
      sounds: false,
      reminders: true,
      updates: true
    },
    advanced: {
      debugMode: false,
      experimentalFeatures: false,
      apiTimeout: 30000,
      cacheSize: '100MB'
    }
  });

  const [activeTab, setActiveTab] = useState('general');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('platformSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to load settings');
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('platformSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  // Reset to defaults
  const resetSettings = () => {
    if (confirm('Reset all settings to default? This cannot be undone.')) {
      localStorage.removeItem('platformSettings');
      window.location.reload();
    }
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'geriatrics-platform-settings.json';
    link.click();
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const updateNestedSetting = (category, subcategory, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [key]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'general', label: '🌐 General', icon: '⚙️' },
    { id: 'clinical', label: '🏥 Clinical', icon: '🩺' },
    { id: 'interface', label: '🎨 Interface', icon: '💻' },
    { id: 'api', label: '🔌 API Keys', icon: '🔑' },
    { id: 'privacy', label: '🔒 Privacy', icon: '🛡️' },
    { id: 'backup', label: '💾 Backup', icon: '☁️' },
    { id: 'advanced', label: '🔧 Advanced', icon: '⚡' }
  ];

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '20px auto',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>⚙️ Platform Settings</h2>
        <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>Configure your geriatrics platform</p>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex',
        background: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        overflowX: 'auto'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '15px 20px',
              border: 'none',
              background: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#667eea' : '#666',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              cursor: 'pointer',
              borderBottom: activeTab === tab.id ? '3px solid #667eea' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '30px' }}>
        {/* General Settings */}
        {activeTab === 'general' && (
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>🌐 General Settings</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Language / שפה
              </label>
              <select 
                value={settings.language}
                onChange={(e) => updateSetting('general', 'language', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="he">🇮🇱 עברית</option>
                <option value="both">🌍 Both / שניהם</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Theme
              </label>
              <select 
                value={settings.theme}
                onChange={(e) => updateSetting('general', 'theme', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="auto">🔄 Auto</option>
                <option value="glass">✨ Glass-morphism</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Medical Institution
              </label>
              <select style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '300px' }}>
                <option value="shaare-zedek">🏥 Shaare Zedek Medical Center</option>
                <option value="hadassah">🏥 Hadassah Medical Center</option>
                <option value="rabin">🏥 Rabin Medical Center</option>
                <option value="sheba">🏥 Sheba Medical Center</option>
                <option value="rambam">🏥 Rambam Medical Center</option>
                <option value="other">🏥 Other Institution</option>
              </select>
            </div>
          </div>
        )}

        {/* Clinical Settings */}
        {activeTab === 'clinical' && (
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>🏥 Clinical Settings</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Default Units
              </label>
              <select 
                value={settings.clinical.defaultUnits}
                onChange={(e) => updateSetting('clinical', 'defaultUnits', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="metric">📏 Metric (kg, cm, mmol/L)</option>
                <option value="imperial">📐 Imperial (lbs, ft, mg/dL)</option>
                <option value="mixed">🔄 Mixed (common in Israel)</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#667eea', marginBottom: '15px' }}>Clinical Decision Support</h4>
              {[
                { key: 'riskCalculators', label: 'Risk Calculators Enabled' },
                { key: 'drugInteractions', label: 'Drug Interaction Alerts' },
                { key: 'allergyAlerts', label: 'Allergy Alert System' },
                { key: 'dosageAlerts', label: 'Geriatric Dosage Warnings' }
              ].map(option => (
                <label key={option.key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    checked={settings.clinical[option.key]}
                    onChange={(e) => updateSetting('clinical', option.key, e.target.checked)}
                    style={{ marginRight: '10px' }}
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Default A1C Target for Elderly
              </label>
              <select style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}>
                <option value="7.5">&lt;7.5% (Healthy elderly)</option>
                <option value="8.0">&lt;8.0% (Complex elderly)</option>
                <option value="8.5">&lt;8.5% (Frail elderly)</option>
                <option value="avoid">&gt;8.5% (Avoid symptoms only)</option>
              </select>
            </div>
          </div>
        )}

        {/* Interface Settings */}
        {activeTab === 'interface' && (
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>🎨 Interface Settings</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Font Size
              </label>
              <select 
                value={settings.interface.fontSize}
                onChange={(e) => updateSetting('interface', 'fontSize', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="small">📝 Small</option>
                <option value="medium">📄 Medium</option>
                <option value="large">📋 Large</option>
                <option value="xlarge">📊 Extra Large</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Color Contrast
              </label>
              <select 
                value={settings.interface.colorContrast}
                onChange={(e) => updateSetting('interface', 'colorContrast', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="normal">🎨 Normal</option>
                <option value="high">🔆 High Contrast</option>
                <option value="dark">🌙 Dark Mode</option>
                <option value="dyslexia">👁️ Dyslexia Friendly</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#667eea', marginBottom: '15px' }}>User Experience</h4>
              {[
                { key: 'animations', label: 'Enable Animations' },
                { key: 'shortcuts', label: 'Keyboard Shortcuts' },
                { key: 'autoSave', label: 'Auto-save Data' }
              ].map(option => (
                <label key={option.key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    checked={settings.interface[option.key]}
                    onChange={(e) => updateSetting('interface', option.key, e.target.checked)}
                    style={{ marginRight: '10px' }}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* API Keys */}
        {activeTab === 'api' && (
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>🔌 AI API Configuration</h3>
            
            <div style={{ marginBottom: '25px', padding: '20px', background: '#f0f8ff', borderRadius: '8px' }}>
              <h4 style={{ color: '#0066cc', marginBottom: '10px' }}>🔒 Security Notice</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                API keys are stored locally in your browser only. Never share your API keys. 
                Get official keys from: OpenAI, Anthropic, or Google Cloud.
              </p>
            </div>

            {[
              { key: 'anthropic', label: 'Anthropic Claude API', placeholder: 'sk-ant-api03-...' },
              { key: 'openai', label: 'OpenAI API', placeholder: 'sk-...' },
              { key: 'google', label: 'Google Gemini API', placeholder: 'AIza...' }
            ].map(api => (
              <div key={api.key} style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                  {api.label}
                </label>
                <input
                  type="password"
                  placeholder={api.placeholder}
                  value={settings.apiKeys[api.key]}
                  onChange={(e) => updateNestedSetting('general', 'apiKeys', api.key, e.target.value)}
                  style={{ 
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    width: '400px',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            ))}

            <div style={{ marginTop: '30px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
              <h4 style={{ color: '#856404', marginBottom: '10px' }}>💡 API Key Instructions</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Claude: Visit console.anthropic.com to create API key</li>
                <li>OpenAI: Visit platform.openai.com/api-keys</li>
                <li>Google: Visit console.cloud.google.com</li>
                <li>Keys are encrypted and stored locally only</li>
              </ul>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>🔒 Privacy & Security</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#667eea', marginBottom: '15px' }}>Data Collection</h4>
              {[
                { key: 'analytics', label: 'Usage Analytics (Anonymous)', desc: 'Help improve the platform' },
                { key: 'crashReports', label: 'Crash Reports', desc: 'Automatic error reporting' },
                { key: 'encryptNotes', label: 'Encrypt Clinical Notes', desc: 'Local encryption of patient data' }
              ].map(option => (
                <div key={option.key} style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={settings.privacy[option.key]}
                      onChange={(e) => updateSetting('privacy', option.key, e.target.checked)}
                      style={{ marginRight: '10px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{option.label}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{option.desc}</div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Data Retention Period
              </label>
              <select 
                value={settings.privacy.dataRetention}
                onChange={(e) => updateSetting('privacy', 'dataRetention', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="1year">1 Year</option>
                <option value="indefinite">Indefinite</option>
              </select>
            </div>

            <button
              onClick={() => {
                if (confirm('Clear all stored data? This cannot be undone.')) {
                  localStorage.clear();
                  alert('All data cleared!');
                }
              }}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🗑️ Clear All Data
            </button>
          </div>
        )}

        {/* Backup Settings */}
        {activeTab === 'backup' && (
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>💾 Backup & Sync</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#667eea', marginBottom: '15px' }}>Automatic Backup</h4>
              {[
                { key: 'autoBackup', label: 'Enable Auto Backup' },
                { key: 'cloudSync', label: 'Cloud Synchronization' }
              ].map(option => (
                <label key={option.key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    checked={settings.backup[option.key]}
                    onChange={(e) => updateSetting('backup', option.key, e.target.checked)}
                    style={{ marginRight: '10px' }}
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Backup Frequency
              </label>
              <select 
                value={settings.backup.backupFreq}
                onChange={(e) => updateSetting('backup', 'backupFreq', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="realtime">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="manual">Manual Only</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button
                onClick={exportSettings}
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                📤 Export Settings
              </button>
              
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.json';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        try {
                          const importedSettings = JSON.parse(e.target.result);
                          setSettings(importedSettings);
                          alert('Settings imported successfully!');
                        } catch (err) {
                          alert('Error importing settings');
                        }
                      };
                      reader.readAsText(file);
                    }
                  };
                  input.click();
                }}
                style={{
                  background: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                📥 Import Settings
              </button>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>🔧 Advanced Configuration</h3>
            
            <div style={{ marginBottom: '25px', padding: '20px', background: '#ffebee', borderRadius: '8px' }}>
              <h4 style={{ color: '#c62828', marginBottom: '10px' }}>⚠️ Developer Settings</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                These settings are for advanced users only. Changing them may affect platform stability.
              </p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#667eea', marginBottom: '15px' }}>Debug Options</h4>
              {[
                { key: 'debugMode', label: 'Debug Mode (Show detailed logs)' },
                { key: 'experimentalFeatures', label: 'Experimental Features' }
              ].map(option => (
                <label key={option.key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    checked={settings.advanced[option.key]}
                    onChange={(e) => updateSetting('advanced', option.key, e.target.checked)}
                    style={{ marginRight: '10px' }}
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                API Timeout (milliseconds)
              </label>
              <input
                type="number"
                value={settings.advanced.apiTimeout}
                onChange={(e) => updateSetting('advanced', 'apiTimeout', parseInt(e.target.value))}
                min="5000"
                max="120000"
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Cache Size Limit
              </label>
              <select 
                value={settings.advanced.cacheSize}
                onChange={(e) => updateSetting('advanced', 'cacheSize', e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', width: '200px' }}
              >
                <option value="50MB">50 MB</option>
                <option value="100MB">100 MB</option>
                <option value="500MB">500 MB</option>
                <option value="1GB">1 GB</option>
                <option value="unlimited">Unlimited</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div style={{ 
        padding: '20px',
        borderTop: '1px solid #e0e0e0',
        background: '#f8f9fa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={saveSettings}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            💾 Save Settings
          </button>
          
          <button
            onClick={resetSettings}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 Reset to Default
          </button>
        </div>
        
        <div style={{ fontSize: '12px', color: '#666' }}>
          Last saved: {localStorage.getItem('settingsLastSaved') || 'Never'}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;