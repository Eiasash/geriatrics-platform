import React, { useState } from 'react';
import { Calendar, Clock, User, Star, AlertTriangle, Info, ExternalLink, Filter, Search } from 'lucide-react';
import newsData from '../../data/news-updates.json';

interface NewsUpdatesProps {
  language: 'en' | 'he';
}

export default function NewsUpdates({ language }: NewsUpdatesProps) {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: language === 'en' ? 'All Categories' : 'כל הקטגוריות' },
    ...newsData.categories.map(cat => ({
      id: cat.id,
      name: cat.name
    }))
  ];

  const filteredArticles = newsData.newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || 
                           article.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (categoryName: string) => {
    const category = newsData.categories.find(c => c.name === categoryName);
    return category?.color || 'bg-gray-500';
  };

  if (selectedArticle) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-blue-600 hover:text-blue-800 mb-4"
            >
              ← {language === 'en' ? 'Back to News' : 'חזרה לחדשות'}
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedArticle.category)} text-white`}>
                {selectedArticle.category}
              </span>
              {selectedArticle.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <Star className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'Featured' : 'מומלץ'}
                </span>
              )}
              {selectedArticle.cmeCredits > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {selectedArticle.cmeCredits} CME
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {selectedArticle.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(selectedArticle.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {selectedArticle.readTime}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="font-semibold text-blue-900 mb-2">
            {language === 'en' ? 'Summary' : 'סיכום'}
          </h2>
          <p className="text-blue-800">{selectedArticle.summary}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose max-w-none">
            {selectedArticle.content.split('\n').map((paragraph: string, index: number) => {
              if (paragraph.trim() === '') return null;
              
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              
              if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                return (
                  <h4 key={index} className="text-base font-medium text-gray-800 mt-4 mb-2">
                    {paragraph.replace(/\*/g, '')}
                  </h4>
                );
              }
              
              return (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            {language === 'en' ? 'Tags' : 'תגיות'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedArticle.tags.map((tag: string) => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'News & Updates' : 'חדשות ועדכונים'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Latest developments in geriatric care and medicine' : 'ההתפתחויות האחרונות בטיפול גריאטרי ורפואה'}
        </p>
      </div>

      {/* Alerts Section */}
      {newsData.alerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'en' ? 'Important Alerts' : 'התרעות חשובות'}
          </h2>
          {newsData.alerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 rounded-lg ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 text-current" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <span className="text-xs text-gray-600">{formatDate(alert.date)}</span>
                  </div>
                  <p className="text-sm mb-2">{alert.message}</p>
                  <p className="text-sm font-medium">
                    <strong>{language === 'en' ? 'Action Required:' : 'פעולה נדרשת:'}</strong> {alert.actionRequired}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search news articles...' : 'חיפוש מאמרי חדשות...'}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Articles */}
      {filteredArticles.some(article => article.featured) && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Featured Articles' : 'מאמרים מומלצים'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles
              .filter(article => article.featured)
              .map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20">
                        {article.category}
                      </span>
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <span>{formatDate(article.date)}</span>
                      <span>{article.readTime}</span>
                      {article.cmeCredits > 0 && <span>{article.cmeCredits} CME</span>}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{article.summary}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* All Articles */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'All Articles' : 'כל המאמרים'}
        </h2>
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)} text-white`}>
                        {article.category}
                      </span>
                      {article.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          {language === 'en' ? 'Featured' : 'מומלץ'}
                        </span>
                      )}
                      {article.cmeCredits > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {article.cmeCredits} CME
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(article.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center ml-6">
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      {newsData.upcomingEvents.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Upcoming Events' : 'אירועים קרובים'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {newsData.upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {event.type}
                  </span>
                  {event.cmeCredits > 0 && (
                    <span className="text-xs text-green-600 font-medium">
                      {event.cmeCredits} CME
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(event.date)}
                  </div>
                  <div>{event.location}</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {language === 'en' ? 'No articles found matching your criteria' : 'לא נמצאו מאמרים התואמים לקריטריונים'}
          </p>
        </div>
      )}
    </div>
  );
}