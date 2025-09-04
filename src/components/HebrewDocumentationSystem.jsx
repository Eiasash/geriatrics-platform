import React, { useState } from 'react';
import { FileText, Save, Copy, Download, CheckCircle } from 'lucide-react';

const HebrewDocumentationSystem = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('admission');
  const [formData, setFormData] = useState({});
  const [generatedNote, setGeneratedNote] = useState('');

  const templates = {
    admission: {
      title: 'תבנית קבלה גריאטרית',
      titleEn: 'Geriatric Admission Template',
      icon: '📋',
      fields: [
        { key: 'age', label: 'גיל', labelEn: 'Age', type: 'number' },
        { key: 'pathway', label: 'מסלול קבלה', labelEn: 'Admission Pathway', type: 'select', options: [
          { value: 'acute', label: 'גריאטריה אקוטית', labelEn: 'Acute Geriatrics' },
          { value: 'monitoring', label: 'ניטור גריאטרי', labelEn: 'Geriatric Monitoring' },
          { value: 'ortho', label: 'אורתו-גריאטריה', labelEn: 'Ortho-Geriatrics' },
          { value: 'rehab', label: 'שיקום גריאטרי', labelEn: 'Geriatric Rehabilitation' }
        ]},
        { key: 'diagnoses', label: 'אבחנות עיקריות', labelEn: 'Main Diagnoses', type: 'textarea' },
        { key: 'comorbidities', label: 'מחלות רקע', labelEn: 'Comorbidities', type: 'textarea' },
        { key: 'medications', label: 'טיפול תרופתי', labelEn: 'Medications', type: 'textarea' },
        { key: 'cognitive', label: 'מצב קוגניטיבי', labelEn: 'Cognitive Status', type: 'select', options: [
          { value: 'normal', label: 'תקין', labelEn: 'Normal' },
          { value: 'mild', label: 'ירידה קלה', labelEn: 'Mild Impairment' },
          { value: 'moderate', label: 'ירידה בינונית', labelEn: 'Moderate Impairment' },
          { value: 'severe', label: 'ירידה קשה', labelEn: 'Severe Impairment' }
        ]},
        { key: 'functional', label: 'מצב תפקודי', labelEn: 'Functional Status', type: 'checkboxes', options: [
          { value: 'independent', label: 'עצמאי', labelEn: 'Independent' },
          { value: 'walker', label: 'הולכן', labelEn: 'Walker' },
          { value: 'wheelchair', label: 'כסא גלגלים', labelEn: 'Wheelchair' },
          { value: 'bedbound', label: 'מרותק למיטה', labelEn: 'Bedbound' }
        ]}
      ]
    },
    progress: {
      title: 'רשימת התקדמות',
      titleEn: 'Progress Note',
      icon: '📝',
      fields: [
        { key: 'day', label: 'יום אשפוז', labelEn: 'Hospital Day', type: 'number' },
        { key: 'status', label: 'מצב קליני', labelEn: 'Clinical Status', type: 'select', options: [
          { value: 'stable', label: 'יציב', labelEn: 'Stable' },
          { value: 'improving', label: 'משתפר', labelEn: 'Improving' },
          { value: 'deteriorating', label: 'מידרדר', labelEn: 'Deteriorating' },
          { value: 'critical', label: 'קריטי', labelEn: 'Critical' }
        ]},
        { key: 'issues', label: 'בעיות פעילות', labelEn: 'Active Issues', type: 'textarea' },
        { key: 'plan', label: 'תכנית טיפול', labelEn: 'Treatment Plan', type: 'textarea' },
        { key: 'vitals', label: 'סימנים חיוניים', labelEn: 'Vital Signs', type: 'text' },
        { key: 'labs', label: 'תוצאות מעבדה', labelEn: 'Lab Results', type: 'textarea' }
      ]
    },
    discharge: {
      title: 'תכנון שחרור',
      titleEn: 'Discharge Planning',
      icon: '🏠',
      fields: [
        { key: 'destination', label: 'יעד שחרור', labelEn: 'Discharge Destination', type: 'select', options: [
          { value: 'home', label: 'בית עם תמיכה', labelEn: 'Home with Support' },
          { value: 'rehab', label: 'שיקום', labelEn: 'Rehabilitation' },
          { value: 'nursing', label: 'סיעודי', labelEn: 'Nursing Home' },
          { value: 'family', label: 'משפחה', labelEn: 'Family Care' }
        ]},
        { key: 'services', label: 'שירותים נדרשים', labelEn: 'Required Services', type: 'checkboxes', options: [
          { value: 'physio', label: 'פיזיותרפיה', labelEn: 'Physiotherapy' },
          { value: 'occupational', label: 'ריפוי בעיסוק', labelEn: 'Occupational Therapy' },
          { value: 'social', label: 'עבודה סוציאלית', labelEn: 'Social Work' },
          { value: 'homecare', label: 'טיפול בית', labelEn: 'Home Care' },
          { value: 'nursing', label: 'סיעוד', labelEn: 'Nursing' }
        ]},
        { key: 'medications', label: 'טיפול תרופתי בשחרור', labelEn: 'Discharge Medications', type: 'textarea' },
        { key: 'followup', label: 'מעקב', labelEn: 'Follow-up', type: 'textarea' },
        { key: 'education', label: 'הדרכה למטופל/משפחה', labelEn: 'Patient/Family Education', type: 'textarea' }
      ]
    },
    consultation: {
      title: 'יעוץ גריאטרי',
      titleEn: 'Geriatric Consultation',
      icon: '👨‍⚕️',
      fields: [
        { key: 'reason', label: 'סיבת היעוץ', labelEn: 'Reason for Consultation', type: 'textarea' },
        { key: 'assessment', label: 'הערכה גריאטרית', labelEn: 'Geriatric Assessment', type: 'textarea' },
        { key: 'cga', label: 'CGA - הערכה גריאטרית מקיפה', labelEn: 'Comprehensive Geriatric Assessment', type: 'checkboxes', options: [
          { value: 'medical', label: 'רפואי', labelEn: 'Medical' },
          { value: 'functional', label: 'תפקודי', labelEn: 'Functional' },
          { value: 'cognitive', label: 'קוגניטיבי', labelEn: 'Cognitive' },
          { value: 'social', label: 'חברתי', labelEn: 'Social' },
          { value: 'nutritional', label: 'תזונתי', labelEn: 'Nutritional' }
        ]},
        { key: 'recommendations', label: 'המלצות', labelEn: 'Recommendations', type: 'textarea' }
      ]
    }
  };

  const generateNote = () => {
    const template = templates[selectedTemplate];
    const timestamp = new Date().toLocaleDateString('he-IL');
    const timeStr = new Date().toLocaleTimeString('he-IL');
    
    let noteHebrew = `${template.title} - ${timestamp} ${timeStr}\n`;
    noteHebrew += '='.repeat(50) + '\n\n';
    
    let noteEnglish = `${template.titleEn} - ${timestamp} ${timeStr}\n`;
    noteEnglish += '='.repeat(50) + '\n\n';
    
    template.fields.forEach(field => {
      const value = formData[field.key];
      if (value) {
        if (Array.isArray(value)) {
          // Handle checkboxes
          const selectedOptions = field.options.filter(opt => value.includes(opt.value));
          noteHebrew += `${field.label}:\n`;
          noteEnglish += `${field.labelEn}:\n`;
          selectedOptions.forEach(opt => {
            noteHebrew += `  • ${opt.label}\n`;
            noteEnglish += `  • ${opt.labelEn}\n`;
          });
        } else if (field.type === 'select') {
          // Handle select
          const option = field.options.find(opt => opt.value === value);
          if (option) {
            noteHebrew += `${field.label}: ${option.label}\n`;
            noteEnglish += `${field.labelEn}: ${option.labelEn}\n`;
          }
        } else {
          // Handle text/textarea
          noteHebrew += `${field.label}: ${value}\n`;
          noteEnglish += `${field.labelEn}: ${value}\n`;
        }
        noteHebrew += '\n';
        noteEnglish += '\n';
      }
    });

    noteHebrew += '\n' + '-'.repeat(50) + '\n';
    noteHebrew += 'נוצר אוטומטית על ידי מערכת תיעוד SZMC\n';
    noteHebrew += 'רופא: ד"ר אייאס אשהב\n';
    noteHebrew += 'מחלקה: גריאטריה\n';

    noteEnglish += '\n' + '-'.repeat(50) + '\n';
    noteEnglish += 'Generated automatically by SZMC Documentation System\n';
    noteEnglish += 'Physician: Dr. Eias Ashhab\n';
    noteEnglish += 'Department: Geriatrics\n';
    
    const combinedNote = `[HEBREW VERSION]\n${noteHebrew}\n\n[ENGLISH VERSION]\n${noteEnglish}`;
    setGeneratedNote(combinedNote);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote);
    alert('Documentation copied to clipboard!');
  };

  const saveToFile = () => {
    const blob = new Blob([generatedNote], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `geriatric_note_${selectedTemplate}_${Date.now()}.txt`;
    a.click();
  };

  const currentTemplate = templates[selectedTemplate];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl mr-4">
          📄
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hebrew Documentation System</h2>
          <p className="text-gray-600">מערכת תיעוד רפואי בעברית - Bilingual Medical Documentation</p>
        </div>
      </div>

      {/* Template Selection */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {Object.entries(templates).map(([key, template]) => (
          <div
            key={key}
            onClick={() => {
              setSelectedTemplate(key);
              setFormData({});
              setGeneratedNote('');
            }}
            className={`p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${
              selectedTemplate === key
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="text-2xl mb-2">{template.icon}</div>
            <div className="font-semibold text-sm">{template.title}</div>
            <div className="text-xs text-gray-600">{template.titleEn}</div>
          </div>
        ))}
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mb-6">
        {currentTemplate.fields.map(field => (
          <div key={field.key}>
            <label className="block font-semibold mb-2">
              <span className="text-gray-800">{field.label}</span>
              <span className="text-gray-500 text-sm ml-2">({field.labelEn})</span>
            </label>
            {field.type === 'select' ? (
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData[field.key] || ''}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
              >
                <option value="">בחר אפשרות / Choose option</option>
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} / {option.labelEn}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData[field.key] || ''}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                placeholder={`${field.label} / ${field.labelEn}`}
              />
            ) : field.type === 'checkboxes' ? (
              <div className="grid grid-cols-2 gap-2">
                {field.options.map(option => (
                  <label key={option.value} className="flex items-center p-2 border rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={(formData[field.key] || []).includes(option.value)}
                      onChange={(e) => {
                        const current = formData[field.key] || [];
                        const updated = e.target.checked
                          ? [...current, option.value]
                          : current.filter(item => item !== option.value);
                        setFormData({...formData, [field.key]: updated});
                      }}
                    />
                    <span className="text-sm">{option.label} / {option.labelEn}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={field.type}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData[field.key] || ''}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                placeholder={`${field.label} / ${field.labelEn}`}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={generateNote}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
      >
        <FileText className="mr-2" size={20} />
        Generate Bilingual Documentation
      </button>

      {generatedNote && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            Generated Documentation:
          </h3>
          <pre className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap border border-gray-200 max-h-96 overflow-y-auto" dir="auto">
            {generatedNote}
          </pre>
          <div className="flex gap-2 mt-4">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <Copy size={16} /> Copy
            </button>
            <button
              onClick={saveToFile}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download size={16} /> Download
            </button>
            <button
              onClick={() => {
                const subject = encodeURIComponent(`${currentTemplate.title} - Patient Documentation`);
                const body = encodeURIComponent(generatedNote);
                window.location.href = `mailto:iyasas@szmc.org.il?subject=${subject}&body=${body}`;
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Save size={16} /> Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HebrewDocumentationSystem;