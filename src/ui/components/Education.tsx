import React, { useState } from 'react';
import { BookOpen, Award, Clock, ChevronRight, CheckCircle, Download, ExternalLink } from 'lucide-react';
import educationData from '../../data/medical-education.json';

interface EducationProps {
  language: 'en' | 'he';
}

export default function Education({ language }: EducationProps) {
  const [selectedCategory, setSelectedCategory] = useState(educationData.categories[0]);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const markComplete = (topicId: string) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const calculateProgress = (category: any) => {
    const categoryTopics = category.topics.map((t: any) => t.id);
    const completed = categoryTopics.filter((id: string) => completedTopics.has(id)).length;
    return Math.round((completed / categoryTopics.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Medical Education Center' : 'מרכז השכלה רפואית'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Continuing medical education for geriatric care' : 'השכלה רפואית מתמשכת לטיפול גריאטרי'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Total Topics' : 'סך הנושאים'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {educationData.categories.reduce((acc, cat) => acc + cat.topics.length, 0)}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Completed' : 'הושלמו'}</p>
              <p className="text-2xl font-bold text-gray-900">{completedTopics.size}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'CME Credits' : 'נקודות זכות'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.from(completedTopics).reduce((acc, topicId) => {
                  const topic = educationData.categories
                    .flatMap(c => c.topics)
                    .find(t => t.id === topicId);
                  return acc + (topic?.cmeCredits || 0);
                }, 0)}
              </p>
            </div>
            <Award className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'Certifications' : 'הסמכות'}</p>
              <p className="text-2xl font-bold text-gray-900">{educationData.certifications.length}</p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'Categories' : 'קטגוריות'}
              </h2>
            </div>
            <div className="p-2">
              {educationData.categories.map((category) => {
                const progress = calculateProgress(category);
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedTopic(null);
                    }}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      selectedCategory.id === category.id 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{category.title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {category.topics.length} {language === 'en' ? 'topics' : 'נושאים'}
                    </div>
                    {progress > 0 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow mt-4">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'Certifications' : 'הסמכות'}
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {educationData.certifications.map((cert) => (
                <div key={cert.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-gray-900">{cert.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{cert.provider}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {cert.duration}
                        </span>
                        <span className="flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          {cert.credits} CME
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">{selectedCategory.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedCategory.description}</p>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {selectedCategory.topics.map((topic: any) => (
                <div
                  key={topic.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedTopic?.id === topic.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {completedTopics.has(topic.id) && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <h3 className="font-medium text-gray-900">{topic.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{topic.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {topic.cmeCredits} CME
                        </span>
                        <span className="text-xs text-blue-600">
                          {topic.guidelines}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Details */}
        <div className="lg:col-span-2">
          {selectedTopic ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTopic.title}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {selectedTopic.cmeCredits} CME Credits
                      </span>
                      <span className="text-sm text-blue-600">
                        {selectedTopic.guidelines}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => markComplete(selectedTopic.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      completedTopics.has(selectedTopic.id)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {completedTopics.has(selectedTopic.id) ? (
                      <>
                        <CheckCircle className="inline h-4 w-4 mr-1" />
                        {language === 'en' ? 'Completed' : 'הושלם'}
                      </>
                    ) : (
                      language === 'en' ? 'Mark Complete' : 'סמן כהושלם'
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">{selectedTopic.content}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Key Points' : 'נקודות מפתח'}
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {selectedTopic.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {language === 'en' ? 'Clinical Guidelines' : 'הנחיות קליניות'}
                    </h4>
                    <p className="text-blue-800">{selectedTopic.guidelines}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'en' ? 'Select a topic to view details' : 'בחר נושא לצפייה בפרטים'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Resources' : 'משאבים'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {language === 'en' ? 'Guidelines' : 'הנחיות'}
            </h3>
            <div className="space-y-2">
              {educationData.resources.guidelines.map((guideline, index) => (
                <a
                  key={index}
                  href={guideline.url}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {guideline.title}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {language === 'en' ? 'Journals' : 'כתבי עת'}
            </h3>
            <div className="space-y-2">
              {educationData.resources.journals.map((journal, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <ExternalLink className="h-4 w-4 mr-2 text-gray-400" />
                  {journal}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {language === 'en' ? 'Organizations' : 'ארגונים'}
            </h3>
            <div className="space-y-2">
              {educationData.resources.organizations.map((org, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <ExternalLink className="h-4 w-4 mr-2 text-gray-400" />
                  {org}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}