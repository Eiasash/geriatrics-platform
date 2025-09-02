import React, { useState } from 'react';
import { DataSource } from '../../data';
import { Package, Upload, Check, RefreshCw, Download } from 'lucide-react';

interface PacksImporterProps {
  dataSource: DataSource;
  language: 'en' | 'he';
}

export default function PacksImporter({ dataSource, language }: PacksImporterProps) {
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<Record<string, 'pending' | 'importing' | 'done' | 'error'>>({});

  const packs = [
    {
      id: 'abbrev_en',
      name: language === 'en' ? 'English Abbreviations' : 'קיצורים באנגלית',
      file: '/packs/abbreviations.en.json',
      description: language === 'en' ? 'Medical abbreviations dictionary' : 'מילון קיצורים רפואיים'
    },
    {
      id: 'abbrev_he',
      name: language === 'en' ? 'Hebrew Abbreviations' : 'קיצורים בעברית',
      file: '/packs/abbreviations.he.json',
      description: language === 'en' ? 'Hebrew medical abbreviations' : 'קיצורים רפואיים בעברית'
    },
    {
      id: 'flashcards',
      name: language === 'en' ? 'MMSE Flashcards' : 'כרטיסיות MMSE',
      file: '/packs/flashcards_mmse.json',
      description: language === 'en' ? 'Study cards for MMSE assessment' : 'כרטיסי לימוד להערכת MMSE'
    },
    {
      id: 'checklist_frail',
      name: language === 'en' ? 'FRAIL Checklist' : 'רשימת בדיקה FRAIL',
      file: '/packs/checklist_frail.json',
      description: language === 'en' ? 'Frailty assessment checklist' : 'רשימת בדיקה להערכת שבריריות'
    },
    {
      id: 'roster',
      name: language === 'en' ? 'Sample Roster' : 'רשימת מטופלים לדוגמה',
      file: '/packs/roster.json',
      description: language === 'en' ? 'Example patient roster with MMSE data' : 'רשימת מטופלים לדוגמה עם נתוני MMSE'
    },
    {
      id: 'tasks',
      name: language === 'en' ? 'Sample Tasks' : 'משימות לדוגמה',
      file: '/packs/tasks.json',
      description: language === 'en' ? 'Example clinical tasks' : 'משימות קליניות לדוגמה'
    }
  ];

  const importPack = async (pack: typeof packs[0]) => {
    setStatus(prev => ({ ...prev, [pack.id]: 'importing' }));
    
    try {
      const response = await fetch(pack.file);
      const data = await response.json();
      
      if (pack.id === 'roster') {
        // Import roster data
        const roster = await dataSource.getRoster();
        if (roster.length === 0 && data.patients) {
          for (const patient of data.patients) {
            await dataSource.addPatient(patient);
          }
        }
      } else if (pack.id === 'tasks') {
        // Import tasks data
        const tasks = await dataSource.getTasks();
        if (tasks.length === 0 && data.tasks) {
          for (const task of data.tasks) {
            await dataSource.addTask(task);
          }
        }
      } else {
        // Import as pack data
        await dataSource.savePack(pack.id, data);
      }
      
      setStatus(prev => ({ ...prev, [pack.id]: 'done' }));
    } catch (error) {
      console.error(`Failed to import ${pack.id}:`, error);
      setStatus(prev => ({ ...prev, [pack.id]: 'error' }));
    }
  };

  const importAll = async () => {
    setImporting(true);
    for (const pack of packs) {
      await importPack(pack);
    }
    setImporting(false);
  };

  const exportData = async () => {
    const exportData: any = {
      roster: await dataSource.getRoster(),
      tasks: await dataSource.getTasks(),
      packs: {}
    };

    for (const pack of packs) {
      if (!['roster', 'tasks'].includes(pack.id)) {
        const data = await dataSource.getPack(pack.id);
        if (data) {
          exportData.packs[pack.id] = data;
        }
      }
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `geriatrics-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Data Packs Manager' : 'מנהל חבילות נתונים'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Import seed data and manage content packs'
            : 'ייבוא נתוני זרע וניהול חבילות תוכן'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={importAll}
          disabled={importing}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${importing ? 'animate-spin' : ''}`} />
          {language === 'en' ? 'Import All Packs' : 'ייבא את כל החבילות'}
        </button>
        <button
          onClick={exportData}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Export All Data' : 'ייצא את כל הנתונים'}
        </button>
      </div>

      {/* Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packs.map(pack => (
          <div key={pack.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <Package className="h-8 w-8 text-blue-600" />
              {status[pack.id] === 'done' && (
                <Check className="h-5 w-5 text-green-500" />
              )}
              {status[pack.id] === 'importing' && (
                <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {pack.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {pack.description}
            </p>
            
            <button
              onClick={() => importPack(pack)}
              disabled={status[pack.id] === 'importing'}
              className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              {status[pack.id] === 'importing' 
                ? (language === 'en' ? 'Importing...' : 'מייבא...')
                : status[pack.id] === 'done'
                ? (language === 'en' ? 'Re-import' : 'ייבא מחדש')
                : (language === 'en' ? 'Import' : 'ייבא')}
            </button>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          {language === 'en' ? 'About Data Packs' : 'אודות חבילות נתונים'}
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            {language === 'en' 
              ? '• Packs are automatically imported on first load'
              : '• חבילות מיובאות אוטומטית בטעינה ראשונה'}
          </li>
          <li>
            {language === 'en'
              ? '• Re-import to reset data to original state'
              : '• ייבא מחדש כדי לאפס נתונים למצב המקורי'}
          </li>
          <li>
            {language === 'en'
              ? '• Export to backup your current data'
              : '• ייצא כדי לגבות את הנתונים הנוכחיים'}
          </li>
          <li>
            {language === 'en'
              ? '• Data persists based on your backend configuration'
              : '• נתונים נשמרים בהתאם להגדרות הbackend שלך'}
          </li>
        </ul>
      </div>
    </div>
  );
}