import React, { useState } from 'react';
import { Play, Clock, Award, BookOpen, User, ChevronRight, Star, Download, CheckCircle } from 'lucide-react';
import trainingData from '../../data/training-videos.json';

interface TrainingVideosProps {
  language: 'en' | 'he';
}

export default function TrainingVideos({ language }: TrainingVideosProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  const [currentView, setCurrentView] = useState<'categories' | 'paths' | 'instructors'>('categories');

  const markAsWatched = (videoId: string) => {
    setWatchedVideos(prev => new Set([...prev, videoId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalCME = (videoIds: string[]) => {
    const allVideos = trainingData.videoCategories.flatMap(cat => cat.videos);
    return videoIds.reduce((total, id) => {
      const video = allVideos.find(v => v.id === id);
      return total + (video?.cmeCredits || 0);
    }, 0);
  };

  const renderVideoPlayer = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => setSelectedVideo(null)}
            className="text-blue-600 hover:text-blue-800 mb-2"
          >
            ← {language === 'en' ? 'Back to Videos' : 'חזרה לסרטונים'}
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h1>
          <p className="text-gray-600 mt-1">{selectedVideo.description}</p>
          
          <div className="flex items-center gap-4 mt-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedVideo.difficulty)}`}>
              {selectedVideo.difficulty}
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              {selectedVideo.duration}
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <Award className="h-4 w-4 mr-1" />
              {selectedVideo.cmeCredits} CME
            </span>
            {watchedVideos.has(selectedVideo.id) && (
              <span className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                {language === 'en' ? 'Completed' : 'הושלם'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Video Player Placeholder */}
      <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
        <div className="text-center text-white">
          <Play className="h-20 w-20 mx-auto mb-4 opacity-75" />
          <p className="text-lg mb-2">{selectedVideo.title}</p>
          <p className="text-sm opacity-75">
            {language === 'en' ? 'Video player would be embedded here' : 'נגן הווידאו יוטמע כאן'}
          </p>
          <button
            onClick={() => markAsWatched(selectedVideo.id)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {language === 'en' ? 'Mark as Watched' : 'סמן כנצפה'}
          </button>
        </div>
      </div>

      {/* Video Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Objectives */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'en' ? 'Learning Objectives' : 'מטרות למידה'}
            </h3>
            <ul className="space-y-2">
              {selectedVideo.learningObjectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics Covered */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'en' ? 'Topics Covered' : 'נושאים'}
            </h3>
            <div className="space-y-2">
              {selectedVideo.topics.map((topic: string, index: number) => (
                <div key={index} className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Instructor Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'en' ? 'Instructor' : 'מדריך'}
            </h3>
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedVideo.instructor}</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'en' ? 'Resources' : 'משאבים'}
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  {language === 'en' ? 'Handouts' : 'חומרי עזר'}
                </h4>
                <ul className="space-y-1">
                  {selectedVideo.handouts.map((handout: string, index: number) => (
                    <li key={index} className="flex items-center text-sm">
                      <Download className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-blue-600 hover:underline cursor-pointer">{handout}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  {language === 'en' ? 'Transcript' : 'תמלול'}
                </h4>
                <p className="text-sm text-gray-600">{selectedVideo.transcript}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      {/* Featured Videos */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Featured Training Videos' : 'סרטוני הדרכה מומלצים'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trainingData.featuredVideos.map((videoId) => {
            const video = trainingData.videoCategories
              .flatMap(cat => cat.videos)
              .find(v => v.id === videoId);
            if (!video) return null;
            
            return (
              <div
                key={video.id}
                className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">Featured</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{video.title}</h3>
                <div className="flex items-center text-sm opacity-90">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainingData.videoCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow">
            <div className={`${category.color} text-white p-6 rounded-t-lg`}>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="opacity-90">{category.description}</p>
              <div className="mt-3 flex items-center text-sm">
                <BookOpen className="h-4 w-4 mr-1" />
                {category.videos.length} {language === 'en' ? 'videos' : 'סרטונים'}
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {category.videos.slice(0, 3).map((video) => (
                  <div
                    key={video.id}
                    className="flex items-start justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{video.title}</h4>
                        {watchedVideos.has(video.id) && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.duration}
                        </span>
                        <span className="flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          {video.cmeCredits} CME
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
                
                {category.videos.length > 3 && (
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full text-center py-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {language === 'en' ? `View all ${category.videos.length} videos` : `צפה בכל ${category.videos.length} הסרטונים`}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLearningPaths = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'en' ? 'Learning Paths' : 'מסלולי למידה'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' ? 'Structured learning sequences for specialized skills' : 'רצפי למידה מובנים לכישורים מתמחים'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {trainingData.learningPaths.map((path) => {
          const pathVideos = trainingData.videoCategories
            .flatMap(cat => cat.videos)
            .filter(v => path.videos.includes(v.id));
          const completedCount = pathVideos.filter(v => watchedVideos.has(v.id)).length;
          const progress = Math.round((completedCount / pathVideos.length) * 100);
          
          return (
            <div key={path.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="opacity-90 text-sm mb-3">{path.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {path.duration}
                  </span>
                  <span className="text-sm">
                    <Award className="inline h-3 w-3 mr-1" />
                    {getTotalCME(path.videos)} CME
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'en' ? 'Progress' : 'התקדמות'}
                    </span>
                    <span className="text-sm text-gray-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Video List */}
                <div className="space-y-2">
                  {pathVideos.map((video, index) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{video.title}</span>
                      </div>
                      {watchedVideos.has(video.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Play className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Badge */}
                {progress === 100 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        {language === 'en' ? 'Badge Earned:' : 'תג הושג:'} {path.badge}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (selectedVideo) {
    return renderVideoPlayer();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Training Videos' : 'סרטוני הדרכה'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Professional development videos for geriatric care' : 'סרטוני פיתוח מקצועי לטיפול גריאטרי'}
        </p>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-2">
          {[
            { id: 'categories', name: language === 'en' ? 'By Category' : 'לפי קטגוריה' },
            { id: 'paths', name: language === 'en' ? 'Learning Paths' : 'מסלולי למידה' },
            { id: 'instructors', name: language === 'en' ? 'Instructors' : 'מדריכים' }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === view.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {view.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {currentView === 'categories' && renderCategories()}
      {currentView === 'paths' && renderLearningPaths()}
      {currentView === 'instructors' && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {language === 'en' ? 'Instructor profiles coming soon' : 'פרופילי מדריכים בקרוב'}
          </p>
        </div>
      )}
    </div>
  );
}