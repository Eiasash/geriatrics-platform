import React, { useState } from 'react';
import { Phone, Mail, Copy, Save, Clock, AlertCircle } from 'lucide-react';

const SZMCConsultationSystem = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedUrgency, setSelectedUrgency] = useState('routine');
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    referringDept: 'Geriatrics',
    referringDoc: 'Dr. Eias Ashhab',
    clinicalProblem: '',
    specificQuestion: ''
  });
  const [generatedConsultation, setGeneratedConsultation] = useState('');

  // SZMC Department Directory
  const departments = {
    orthopedics: {
      name: "Orthopedics",
      nameHe: "אורתופדיה",
      extension: "66623",
      icon: "🦴",
      specialties: ["Hip fracture", "Joint replacement", "Orthopedic trauma"]
    },
    neurology: {
      name: "Neurology",
      nameHe: "נוירולוגיה", 
      extension: "66523",
      icon: "🧠",
      specialties: ["Stroke", "Dementia", "Parkinson's", "Epilepsy"]
    },
    biochemistry: {
      name: "Biochemistry",
      nameHe: "ביוכימיה",
      extension: "55522",
      icon: "🧪",
      specialties: ["Blood tests", "Metabolic disorders", "Fluid balance"]
    },
    dialysis: {
      name: "Dialysis",
      nameHe: "דיאליזה",
      extension: "55545",
      icon: "💧",
      specialties: ["Renal failure", "Acute dialysis", "CRRT"]
    },
    icu: {
      name: "ICU",
      nameHe: "טיפול נמרץ",
      extension: "68236",
      icon: "🏥",
      specialties: ["Critical care", "Mechanical ventilation", "Septic shock"]
    },
    cardiology: {
      name: "Cardiology",
      nameHe: "קרדיולוגיה",
      extension: "68704",
      icon: "❤️",
      specialties: ["Heart failure", "Arrhythmias", "IHD"]
    },
    psychiatry: {
      name: "Psychiatry",
      nameHe: "פסיכיאטריה",
      extension: "68182",
      icon: "🧘",
      specialties: ["Depression", "Anxiety", "Behavioral disorders"]
    }
  };

  const templates = {
    delirium: {
      problem: "Acute change in mental status with disorientation, attention deficit, and fluctuating consciousness over 2-3 days",
      question: "Differential diagnosis for delirium, treatment recommendations, and evaluation of contributing factors"
    },
    falls: {
      problem: "Three falls in past two weeks, mainly nocturnal en route to bathroom, no obvious trauma",
      question: "Fall risk assessment, prevention strategies, and environmental modifications"
    },
    polypharmacy: {
      problem: "Patient taking 15+ medications with suspected drug interactions and side effects, possible compliance issues",
      question: "Medication review, identify interactions, and recommendations for treatment optimization"
    },
    behavior: {
      problem: "Dementia patient showing behavioral disturbances - aggression, day-night confusion, wandering",
      question: "Medication adjustment for behavioral symptoms and non-pharmacological treatment recommendations"
    },
    frailty: {
      problem: "Elderly patient with general weakness, 5kg weight loss in 3 months, decline in walking ability",
      question: "Frailty assessment and recommendations for physical improvement"
    }
  };

  const generateConsultation = () => {
    if (!selectedDepartment) {
      alert('Please select target department');
      return;
    }

    const dept = departments[selectedDepartment];
    const urgencyText = {
      routine: 'Routine (within 24-48 hours)',
      urgent: 'Urgent (within few hours)', 
      stat: 'STAT (immediate)'
    };

    const timestamp = new Date().toLocaleString('he-IL', {
      timeZone: 'Asia/Jerusalem'
    });

    const consultation = `CONSULTATION REQUEST - ${dept.name.toUpperCase()}

Department Extension: ${dept.extension}
Date/Time: ${timestamp}
Urgency: ${urgencyText[selectedUrgency]}

PATIENT DETAILS:
Name/ID: ${formData.patientName || 'Not specified'}
Age: ${formData.patientAge || 'Not specified'}

REFERRING DETAILS:
Department: ${formData.referringDept}
Attending: ${formData.referringDoc}

CLINICAL PRESENTATION:
${formData.clinicalProblem || 'Not specified'}

SYSTEMS-BASED ASSESSMENT:

CARDIOVASCULAR:
_________________________________

RESPIRATORY:
_________________________________

NEUROLOGICAL:
_________________________________

GASTROINTESTINAL:
_________________________________

GENITOURINARY:
_________________________________

MUSCULOSKELETAL:
_________________________________

ENDOCRINE/METABOLIC:
_________________________________

GERIATRIC SYNDROMES:
☐ Cognitive Impairment    ☐ Falls Risk    ☐ Frailty
☐ Polypharmacy          ☐ Functional Decline    ☐ Incontinence

SPECIFIC CLINICAL QUESTION:
${formData.specificQuestion || 'General consultation'}

CONSULTANT RECOMMENDATIONS:
Assessment: _________________________________
Plan: _________________________________
Follow-up: _________________________________

---
Generated by SZMC Geriatrics System
Contact: iyasas@szmc.org.il`;

    setGeneratedConsultation(consultation);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedConsultation);
    alert('Consultation copied to clipboard!');
  };

  const callDepartment = () => {
    const dept = departments[selectedDepartment];
    window.location.href = `tel:${dept.extension}`;
  };

  const emailConsultation = () => {
    const dept = departments[selectedDepartment];
    const subject = encodeURIComponent(`Consultation Request - ${dept.name}`);
    const body = encodeURIComponent(generatedConsultation);
    window.location.href = `mailto:iyasas@szmc.org.il?subject=${subject}&body=${body}`;
  };

  const useTemplate = (templateKey) => {
    const template = templates[templateKey];
    if (template) {
      setFormData({
        ...formData,
        clinicalProblem: template.problem,
        specificQuestion: template.question
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl mr-4">
          📞
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">SZMC Consultation System</h2>
          <p className="text-gray-600">Automated consultation requests with direct calling</p>
        </div>
      </div>

      {/* Department Selection */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(departments).map(([key, dept]) => (
          <div
            key={key}
            onClick={() => setSelectedDepartment(key)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedDepartment === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-2xl mb-2">{dept.icon}</div>
            <div className="font-semibold text-gray-800">{dept.name}</div>
            <div className="text-sm text-gray-600">{dept.nameHe}</div>
            <div className="text-blue-600 font-bold text-lg">{dept.extension}</div>
            <div className="text-xs text-gray-500 mt-2">
              {dept.specialties.slice(0, 2).join(' • ')}
            </div>
          </div>
        ))}
      </div>

      {selectedDepartment && (
        <div className="space-y-4">
          {/* Quick Templates */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-orange-800 mb-3">Quick Templates</h3>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => useTemplate(key)}
                  className="px-3 py-1 bg-white border border-orange-300 text-orange-800 rounded-full text-sm hover:bg-orange-100 transition-colors"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name/ID
              </label>
              <input
                type="text"
                placeholder="Full name or ID number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.patientName}
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                placeholder="85"
                min="18"
                max="120"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.patientAge}
                onChange={(e) => setFormData({...formData, patientAge: e.target.value})}
              />
            </div>
          </div>

          {/* Referring Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referring Department
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.referringDept}
                onChange={(e) => setFormData({...formData, referringDept: e.target.value})}
              >
                <option value="Geriatrics">Geriatrics</option>
                <option value="Internal Medicine A">Internal Medicine A</option>
                <option value="Internal Medicine B">Internal Medicine B</option>
                <option value="Emergency">Emergency</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Neurology">Neurology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referring Doctor
              </label>
              <input
                type="text"
                placeholder="Dr. Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.referringDoc}
                onChange={(e) => setFormData({...formData, referringDoc: e.target.value})}
              />
            </div>
          </div>

          {/* Clinical Problem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clinical Problem Description
            </label>
            <textarea
              placeholder="Describe the clinical problem, relevant background, important findings..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.clinicalProblem}
              onChange={(e) => setFormData({...formData, clinicalProblem: e.target.value})}
            />
          </div>

          {/* Specific Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specific Question for Consultant
            </label>
            <textarea
              placeholder="What specific question do you want the consultant to address?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.specificQuestion}
              onChange={(e) => setFormData({...formData, specificQuestion: e.target.value})}
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Urgency
            </label>
            <div className="flex gap-2">
              {['routine', 'urgent', 'stat'].map(urgency => (
                <button
                  key={urgency}
                  onClick={() => setSelectedUrgency(urgency)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    selectedUrgency === urgency
                      ? urgency === 'stat' ? 'bg-red-500 text-white' :
                        urgency === 'urgent' ? 'bg-orange-500 text-white' :
                        'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {urgency === 'routine' && <Clock className="inline mr-2" size={16} />}
                  {urgency === 'urgent' && <AlertCircle className="inline mr-2" size={16} />}
                  {urgency === 'stat' && <AlertCircle className="inline mr-2" size={16} />}
                  {urgency.toUpperCase()}
                  {urgency === 'routine' && ' (24-48h)'}
                  {urgency === 'urgent' && ' (2-4h)'}
                  {urgency === 'stat' && ' (NOW)'}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateConsultation}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Generate Consultation Request
          </button>

          {/* Output */}
          {generatedConsultation && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Generated Consultation:</h3>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap border border-gray-200">
                {generatedConsultation}
              </pre>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <Copy size={16} /> Copy
                </button>
                <button
                  onClick={callDepartment}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Phone size={16} /> Call {departments[selectedDepartment].extension}
                </button>
                <button
                  onClick={emailConsultation}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Mail size={16} /> Email
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedConsultation], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `consultation_${departments[selectedDepartment].name}_${Date.now()}.txt`;
                    a.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Save size={16} /> Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SZMCConsultationSystem;