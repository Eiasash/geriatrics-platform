import React, { useState } from 'react';
import { Calculator, Heart, Brain, Activity, Pill, AlertTriangle } from 'lucide-react';
import * as frail from '../../domain/frail';
import * as cha2ds2 from '../../domain/cha2ds2';
import * as morse from '../../domain/morse';
import * as mmse from '../../domain/mmse';
import * as acb from '../../domain/acb';
import * as beers from '../../domain/beers';

interface CalculatorsProps {
  language: 'en' | 'he';
}

export default function Calculators({ language }: CalculatorsProps) {
  const [activeCalc, setActiveCalc] = useState('frail');
  const [results, setResults] = useState<any>(null);

  // FRAIL state
  const [frailAnswers, setFrailAnswers] = useState({
    fatigue: false,
    resistance: false,
    ambulation: false,
    illnesses: false,
    weightLoss: false
  });

  // CHA2DS2-VASc state
  const [cha2ds2Factors, setCha2ds2Factors] = useState({
    age: 65,
    sex: 'male' as 'male' | 'female',
    chf: false,
    hypertension: false,
    stroke: false,
    vascular: false,
    diabetes: false
  });

  // Morse state
  const [morseFactors, setMorseFactors] = useState({
    fallHistory: false,
    secondaryDiagnosis: false,
    ambulatoryAid: 'none' as 'none' | 'crutches' | 'furniture',
    ivTherapy: false,
    gaitTransfer: 'normal' as 'normal' | 'weak' | 'impaired',
    mentalStatus: 'oriented' as 'oriented' | 'overestimates'
  });

  const calculators = [
    { id: 'frail', name: 'FRAIL Scale', icon: Activity },
    { id: 'cha2ds2', name: 'CHA2DS2-VASc', icon: Heart },
    { id: 'morse', name: 'Morse Fall Scale', icon: AlertTriangle },
    { id: 'mmse', name: 'MMSE', icon: Brain },
    { id: 'acb', name: 'ACB Calculator', icon: Pill },
    { id: 'beers', name: 'Beers Criteria', icon: Pill }
  ];

  const calculateFRAIL = () => {
    const values = [
      frailAnswers.fatigue ? 1 : 0,
      frailAnswers.resistance ? 1 : 0,
      frailAnswers.ambulation ? 1 : 0,
      frailAnswers.illnesses ? 1 : 0,
      frailAnswers.weightLoss ? 1 : 0
    ];
    const score = frail.frailScore(values);
    const risk = score >= 3 ? 'Frail' : score >= 1 ? 'Pre-frail' : 'Robust';
    setResults({ score, interpretation: risk });
  };

  const calculateCHA2DS2 = () => {
    // Simple calculation based on the factors
    let score = 0;
    if (cha2ds2Factors.age >= 75) score += 2;
    else if (cha2ds2Factors.age >= 65) score += 1;
    if (cha2ds2Factors.sex === 'female') score += 1;
    if (cha2ds2Factors.chf) score += 1;
    if (cha2ds2Factors.hypertension) score += 1;
    if (cha2ds2Factors.stroke) score += 2;
    if (cha2ds2Factors.vascular) score += 1;
    if (cha2ds2Factors.diabetes) score += 1;
    
    const risk = score >= 2 ? 'High stroke risk' : score === 1 ? 'Moderate risk' : 'Low risk';
    setResults({ score, interpretation: risk });
  };

  const calculateMorse = () => {
    let score = 0;
    if (morseFactors.fallHistory) score += 25;
    if (morseFactors.secondaryDiagnosis) score += 15;
    if (morseFactors.ambulatoryAid === 'crutches') score += 15;
    if (morseFactors.ambulatoryAid === 'furniture') score += 30;
    if (morseFactors.ivTherapy) score += 20;
    if (morseFactors.gaitTransfer === 'weak') score += 10;
    if (morseFactors.gaitTransfer === 'impaired') score += 20;
    if (morseFactors.mentalStatus === 'overestimates') score += 15;
    
    const risk = score >= 45 ? 'High fall risk' : score >= 25 ? 'Moderate fall risk' : 'Low fall risk';
    setResults({ score, interpretation: risk });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Clinical Calculators' : 'מחשבונים קליניים'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Evidence-based geriatric assessment tools'
            : 'כלי הערכה גריאטריים מבוססי ראיות'}
        </p>
      </div>

      {/* Calculator Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {calculators.map(calc => (
          <button
            key={calc.id}
            onClick={() => {
              setActiveCalc(calc.id);
              setResults(null);
            }}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeCalc === calc.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <calc.icon className="h-4 w-4 mr-2" />
            {calc.name}
          </button>
        ))}
      </div>

      {/* Calculator Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* FRAIL Scale */}
        {activeCalc === 'frail' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">FRAIL Scale</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={frailAnswers.fatigue}
                  onChange={(e) => setFrailAnswers({...frailAnswers, fatigue: e.target.checked})}
                  className="mr-3"
                />
                <span>Fatigue: Are you fatigued most/all of the time?</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={frailAnswers.resistance}
                  onChange={(e) => setFrailAnswers({...frailAnswers, resistance: e.target.checked})}
                  className="mr-3"
                />
                <span>Resistance: Unable to walk up one flight of stairs?</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={frailAnswers.ambulation}
                  onChange={(e) => setFrailAnswers({...frailAnswers, ambulation: e.target.checked})}
                  className="mr-3"
                />
                <span>Ambulation: Unable to walk one block?</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={frailAnswers.illnesses}
                  onChange={(e) => setFrailAnswers({...frailAnswers, illnesses: e.target.checked})}
                  className="mr-3"
                />
                <span>Illnesses: More than 5 illnesses?</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={frailAnswers.weightLoss}
                  onChange={(e) => setFrailAnswers({...frailAnswers, weightLoss: e.target.checked})}
                  className="mr-3"
                />
                <span>Loss of weight: &gt;5% in past 6 months?</span>
              </label>
            </div>
            <button
              onClick={calculateFRAIL}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Calculate
            </button>
          </div>
        )}

        {/* CHA2DS2-VASc */}
        {activeCalc === 'cha2ds2' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">CHA2DS2-VASc Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  value={cha2ds2Factors.age}
                  onChange={(e) => setCha2ds2Factors({...cha2ds2Factors, age: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sex</label>
                <select
                  value={cha2ds2Factors.sex}
                  onChange={(e) => setCha2ds2Factors({...cha2ds2Factors, sex: e.target.value as 'male' | 'female'})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cha2ds2Factors.chf}
                  onChange={(e) => setCha2ds2Factors({...cha2ds2Factors, chf: e.target.checked})}
                  className="mr-3"
                />
                <span>Congestive Heart Failure</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cha2ds2Factors.hypertension}
                  onChange={(e) => setCha2ds2Factors({...cha2ds2Factors, hypertension: e.target.checked})}
                  className="mr-3"
                />
                <span>Hypertension</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cha2ds2Factors.stroke}
                  onChange={(e) => setCha2ds2Factors({...cha2ds2Factors, stroke: e.target.checked})}
                  className="mr-3"
                />
                <span>Stroke/TIA/Thromboembolism</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cha2ds2Factors.vascular}
                  onChange={(e) => setCha2ds2Factors({...cha2ds2Factors, vascular: e.target.checked})}
                  className="mr-3"
                />
                <span>Vascular Disease</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cha2ds2Factors.diabetes}
                  onChange={(e) => setCha2ds2Factors({...cha2ds2Factors, diabetes: e.target.checked})}
                  className="mr-3"
                />
                <span>Diabetes</span>
              </label>
            </div>
            <button
              onClick={calculateCHA2DS2}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Calculate
            </button>
          </div>
        )}

        {/* Morse Fall Scale */}
        {activeCalc === 'morse' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Morse Fall Scale</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={morseFactors.fallHistory}
                  onChange={(e) => setMorseFactors({...morseFactors, fallHistory: e.target.checked})}
                  className="mr-3"
                />
                <span>History of falling</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={morseFactors.secondaryDiagnosis}
                  onChange={(e) => setMorseFactors({...morseFactors, secondaryDiagnosis: e.target.checked})}
                  className="mr-3"
                />
                <span>Secondary diagnosis</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={morseFactors.ivTherapy}
                  onChange={(e) => setMorseFactors({...morseFactors, ivTherapy: e.target.checked})}
                  className="mr-3"
                />
                <span>IV therapy/Heparin lock</span>
              </label>
              <div>
                <label className="block text-sm font-medium mb-1">Ambulatory aid</label>
                <select
                  value={morseFactors.ambulatoryAid}
                  onChange={(e) => setMorseFactors({...morseFactors, ambulatoryAid: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="none">None/Bed rest/Wheelchair/Nurse</option>
                  <option value="crutches">Crutches/Cane/Walker</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gait/Transfer</label>
                <select
                  value={morseFactors.gaitTransfer}
                  onChange={(e) => setMorseFactors({...morseFactors, gaitTransfer: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="normal">Normal/Bed rest/Immobile</option>
                  <option value="weak">Weak</option>
                  <option value="impaired">Impaired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mental status</label>
                <select
                  value={morseFactors.mentalStatus}
                  onChange={(e) => setMorseFactors({...morseFactors, mentalStatus: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="oriented">Oriented to own ability</option>
                  <option value="overestimates">Overestimates/Forgets limitations</option>
                </select>
              </div>
            </div>
            <button
              onClick={calculateMorse}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Calculate
            </button>
          </div>
        )}

        {/* Other calculators would go here */}
        {(activeCalc === 'mmse' || activeCalc === 'acb' || activeCalc === 'beers') && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-medium mb-2">{calculators.find(c => c.id === activeCalc)?.name}</p>
            <p>Full implementation available in the domain modules</p>
            <p className="text-sm mt-2">Connect to patient context for automated calculations</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Results</h3>
            <p className="text-2xl font-bold text-blue-600">Score: {results.score}</p>
            <p className="text-sm text-blue-700 mt-1">{results.interpretation}</p>
          </div>
        )}
      </div>
    </div>
  );
}