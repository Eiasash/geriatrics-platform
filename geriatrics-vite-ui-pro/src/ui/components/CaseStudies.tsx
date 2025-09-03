import React, { useState } from 'react';
import { BookOpen, Clock, Award, Users, CheckCircle, X, ChevronRight, PlayCircle } from 'lucide-react';
import caseStudiesData from '../../data/case-studies.json';

interface CaseStudiesProps {
  language: 'en' | 'he';
}

export default function CaseStudies({ language }: CaseStudiesProps) {
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSection, setCurrentSection] = useState<string>('overview');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const categories = [
    { id: 'all', name: language === 'en' ? 'All Categories' : 'כל הקטגוריות' },
    ...caseStudiesData.categories.map(cat => ({
      id: cat.id,
      name: cat.name
    }))
  ];

  const filteredCases = selectedCategory === 'all' 
    ? caseStudiesData.caseStudies
    : caseStudiesData.caseStudies.filter(cs => cs.category.toLowerCase().replace(' ', '-') === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryData = caseStudiesData.categories.find(c => c.name === category);
    return categoryData?.color || 'bg-gray-500';
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    if (!selectedCase?.questions) return 0;
    let correct = 0;
    selectedCase.questions.forEach((q: any) => {
      if (userAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / selectedCase.questions.length) * 100);
  };

  const renderCaseOverview = () => (
    <div className="space-y-6">
      {/* Patient Info */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          {language === 'en' ? 'Patient Information' : 'מידע על המטופל'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>{language === 'en' ? 'Name' : 'שם'}:</strong> {selectedCase.patient.name}</p>
            <p><strong>{language === 'en' ? 'Age' : 'גיל'}:</strong> {selectedCase.patient.age}</p>
            <p><strong>{language === 'en' ? 'Gender' : 'מין'}:</strong> {selectedCase.patient.gender}</p>
          </div>
          <div>
            <p><strong>{language === 'en' ? 'Presentation' : 'הצגה'}:</strong> {selectedCase.patient.presentation}</p>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          {language === 'en' ? 'Learning Objectives' : 'מטרות למידה'}
        </h3>
        <ul className="space-y-2">
          {selectedCase.learningObjectives.map((objective: string, index: number) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-green-800">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'History' : 'היסטוריה'}
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {language === 'en' ? 'Chief Complaint' : 'תלונה עיקרית'}
            </h4>
            <p className="text-gray-700">{selectedCase.history.chiefComplaint}</p>
          </div>
          
          {selectedCase.history.historyOfPresentIllness && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                {language === 'en' ? 'History of Present Illness' : 'היסטוריה של המחלה הנוכחית'}
              </h4>
              <p className="text-gray-700">{selectedCase.history.historyOfPresentIllness}</p>
            </div>
          )}

          {selectedCase.history.pastMedicalHistory && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                {language === 'en' ? 'Past Medical History' : 'היסטוריה רפואית'}
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {selectedCase.history.pastMedicalHistory.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedCase.history.medications && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                {language === 'en' ? 'Current Medications' : 'תרופות נוכחיות'}
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {selectedCase.history.medications.map((med: string, index: number) => (
                  <li key={index}>{med}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">
          {language === 'en' ? 'Case Questions' : 'שאלות על המקרה'}
        </h3>
        <p className="text-yellow-800">
          {language === 'en' 
            ? 'Answer the following questions based on the case presentation.'
            : 'ענה על השאלות הבאות על סמך הצגת המקרה.'}
        </p>
      </div>

      {selectedCase.questions?.map((question: any, qIndex: number) => (
        <div key={question.id} className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            {qIndex + 1}. {question.question}
          </h4>
          
          <div className="space-y-3">
            {question.options.map((option: string, oIndex: number) => (
              <label 
                key={oIndex}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  userAnswers[question.id] === oIndex
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={oIndex}
                  checked={userAnswers[question.id] === oIndex}
                  onChange={() => handleAnswerSelect(question.id, oIndex)}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  userAnswers[question.id] === oIndex
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-400'
                }`}>
                  {userAnswers[question.id] === oIndex && (
                    <span className="block w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></span>
                  )}
                </span>
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>

          {showResults && (
            <div className={`mt-4 p-4 rounded-lg ${
              userAnswers[question.id] === question.correct
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center mb-2">
                {userAnswers[question.id] === question.correct ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <X className="h-5 w-5 text-red-600 mr-2" />
                )}
                <span className={`font-medium ${
                  userAnswers[question.id] === question.correct
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {userAnswers[question.id] === question.correct
                    ? (language === 'en' ? 'Correct!' : 'נכון!')
                    : (language === 'en' ? 'Incorrect' : 'לא נכון')}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>{language === 'en' ? 'Explanation:' : 'הסבר:'}</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={() => setShowResults(true)}
          disabled={Object.keys(userAnswers).length !== selectedCase.questions?.length}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {language === 'en' ? 'Show Results' : 'הצג תוצאות'}
        </button>

        {showResults && (
          <div className="px-6 py-3 bg-gray-100 rounded-lg">
            <span className="font-semibold">
              {language === 'en' ? 'Score:' : 'ציון:'} {calculateScore()}%
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderDiscussion = () => (
    <div className="space-y-6">
      {selectedCase.discussionPoints && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Discussion Points' : 'נקודות דיון'}
          </h3>
          <ul className="space-y-3">
            {selectedCase.discussionPoints.map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCase.outcome && (
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            {language === 'en' ? 'Outcome' : 'תוצאה'}
          </h3>
          <p className="text-green-800">{selectedCase.outcome}</p>
        </div>
      )}

      {selectedCase.keyTakeaways && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            {language === 'en' ? 'Key Takeaways' : 'נקודות מפתח'}
          </h3>
          <ul className="space-y-2">
            {selectedCase.keyTakeaways.map((takeaway: string, index: number) => (
              <li key={index} className="flex items-start">
                <Award className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  if (selectedCase) {
    const sections = [
      { id: 'overview', name: language === 'en' ? 'Overview' : 'סקירה' },
      { id: 'questions', name: language === 'en' ? 'Questions' : 'שאלות' },
      { id: 'discussion', name: language === 'en' ? 'Discussion' : 'דיון' }
    ];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <button
              onClick={() => {
                setSelectedCase(null);
                setCurrentSection('overview');
                setUserAnswers({});
                setShowResults(false);
              }}
              className="text-blue-600 hover:text-blue-800 mb-2"
            >
              ← {language === 'en' ? 'Back to Cases' : 'חזרה למקרים'}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{selectedCase.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedCase.category)} text-white`}>
                {selectedCase.category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedCase.difficulty)}`}>
                {selectedCase.difficulty}
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {selectedCase.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {currentSection === 'overview' && renderCaseOverview()}
          {currentSection === 'questions' && renderQuestions()}
          {currentSection === 'discussion' && renderDiscussion()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Interactive Case Studies' : 'מקרי בוחן אינטראקטיביים'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Real-world geriatric cases for clinical learning' : 'מקרים גריאטריים מהעולם האמיתי ללמידה קלינית'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Total Cases' : 'סך המקרים'}</p>
              <p className="text-2xl font-bold text-gray-900">{caseStudiesData.caseStudies.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Categories' : 'קטגוריות'}</p>
              <p className="text-2xl font-bold text-gray-900">{caseStudiesData.categories.length}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Avg Duration' : 'משך ממוצע'}</p>
              <p className="text-2xl font-bold text-gray-900">40min</p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Interactive' : 'אינטראקטיבי'}</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
            </div>
            <PlayCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.map((caseStudy) => (
          <div
            key={caseStudy.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCase(caseStudy)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {caseStudy.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(caseStudy.category)} text-white`}>
                      {caseStudy.category}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(caseStudy.difficulty)}`}>
                      {caseStudy.difficulty}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {caseStudy.patient.presentation}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {caseStudy.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {caseStudy.patient.age} {language === 'en' ? 'years old' : 'שנים'} {caseStudy.patient.gender}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}