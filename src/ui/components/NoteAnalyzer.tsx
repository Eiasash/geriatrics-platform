import React, { useState, useEffect } from 'react';
import { DataSource } from '../../data';
import { FileText, Plus, Trash2, Search, Edit2, X, Check } from 'lucide-react';

interface NoteAnalyzerProps {
  dataSource: DataSource;
  language: 'en' | 'he';
}

export default function NoteAnalyzer({ dataSource, language }: NoteAnalyzerProps) {
  const [noteText, setNoteText] = useState('');
  const [abbreviations, setAbbreviations] = useState<Record<string, string>>({});
  const [newAbbrev, setNewAbbrev] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAbbreviations();
  }, [language]);

  const loadAbbreviations = async () => {
    const packKey = language === 'en' ? 'abbrev_en' : 'abbrev_he';
    const data = await dataSource.getPack(packKey);
    if (data && data.abbreviations) {
      setAbbreviations(data.abbreviations);
    }
  };

  const saveAbbreviations = async () => {
    const packKey = language === 'en' ? 'abbrev_en' : 'abbrev_he';
    await dataSource.savePack(packKey, { abbreviations });
  };

  const addAbbreviation = async () => {
    if (newAbbrev && newDefinition) {
      const updated = { ...abbreviations, [newAbbrev]: newDefinition };
      setAbbreviations(updated);
      setNewAbbrev('');
      setNewDefinition('');
      
      const packKey = language === 'en' ? 'abbrev_en' : 'abbrev_he';
      await dataSource.savePack(packKey, { abbreviations: updated });
    }
  };

  const deleteAbbreviation = async (key: string) => {
    const updated = { ...abbreviations };
    delete updated[key];
    setAbbreviations(updated);
    
    const packKey = language === 'en' ? 'abbrev_en' : 'abbrev_he';
    await dataSource.savePack(packKey, { abbreviations: updated });
  };

  const updateAbbreviation = async (key: string) => {
    if (editValue) {
      const updated = { ...abbreviations, [key]: editValue };
      setAbbreviations(updated);
      setEditingKey(null);
      setEditValue('');
      
      const packKey = language === 'en' ? 'abbrev_en' : 'abbrev_he';
      await dataSource.savePack(packKey, { abbreviations: updated });
    }
  };

  const highlightAbbreviations = (text: string) => {
    let highlightedText = text;
    const sortedKeys = Object.keys(abbreviations).sort((a, b) => b.length - a.length);
    
    sortedKeys.forEach(abbrev => {
      const regex = new RegExp(`\\b${abbrev}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, (match) => 
        `<mark class="bg-yellow-200 px-1 rounded cursor-help" title="${abbreviations[abbrev]}">${match}</mark>`
      );
    });
    
    return highlightedText;
  };

  const filteredAbbreviations = Object.entries(abbreviations).filter(([key, value]) =>
    key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Clinical Note Analyzer' : 'מנתח הערות קליניות'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Paste clinical notes to highlight and explain medical abbreviations'
            : 'הדבק הערות קליניות כדי להדגיש ולהסביר קיצורים רפואיים'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Note Input */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Clinical Note' : 'הערה קלינית'}
          </h2>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={language === 'en' 
              ? 'Paste or type clinical note here...\n\nExample: Patient with CHF and DM presents with SOB. BP 140/90, HR 88, SpO2 94%. Started on Lasix 40mg PO BID.'
              : 'הדבק או הקלד הערה קלינית כאן...\n\nדוגמה: מטופל עם אי״ס וסכ״ר מגיע עם קוצר נשימה. ל״ד 140/90, דופק 88, רו״ח 94%. התחיל לזיקס 40 מ״ג דר״פ פ״ב.'}
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Analyzed Output */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Analyzed Note' : 'הערה מנותחת'}
          </h2>
          <div 
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg overflow-y-auto bg-gray-50"
            dangerouslySetInnerHTML={{ __html: highlightAbbreviations(noteText) || 
              `<span class="text-gray-400">${language === 'en' ? 'Analyzed text will appear here...' : 'טקסט מנותח יופיע כאן...'}</span>` 
            }}
          />
        </div>
      </div>

      {/* Dictionary Management */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'en' ? 'Abbreviations Dictionary' : 'מילון קיצורים'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'en' ? 'Search...' : 'חיפוש...'}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add New */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newAbbrev}
              onChange={(e) => setNewAbbrev(e.target.value.toUpperCase())}
              placeholder={language === 'en' ? 'Abbreviation' : 'קיצור'}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={newDefinition}
              onChange={(e) => setNewDefinition(e.target.value)}
              placeholder={language === 'en' ? 'Definition' : 'הגדרה'}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addAbbreviation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dictionary List */}
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Abbreviation' : 'קיצור'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Definition' : 'הגדרה'}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Actions' : 'פעולות'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAbbreviations.map(([abbrev, definition]) => (
                <tr key={abbrev} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {abbrev}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {editingKey === abbrev ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        autoFocus
                      />
                    ) : (
                      definition
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingKey === abbrev ? (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => updateAbbreviation(abbrev)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingKey(null);
                            setEditValue('');
                          }}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingKey(abbrev);
                            setEditValue(definition);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteAbbreviation(abbrev)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}