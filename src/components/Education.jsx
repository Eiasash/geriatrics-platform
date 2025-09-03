import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Play, RefreshCw, ArrowLeft } from 'lucide-react';

export default function Education() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [quizState, setQuizState] = useState({
        questionIndex: 0,
        correctAnswers: 0,
        selectedAnswer: null,
        showFeedback: false,
        quizComplete: false,
        shuffledOrder: []
    });

    useEffect(() => {
        loadTopics();
    }, []);

    const loadTopics = async () => {
        try {
            setLoading(true);
            const response = await fetch('/public/data/topics.json');
            if (!response.ok) throw new Error('Failed to load topics');
            const data = await response.json();
            setTopics(data);
            setError(null);
        } catch (err) {
            setError('Unable to load study content. Please try again later.');
            console.error('Error loading topics:', err);
        } finally {
            setLoading(false);
        }
    };

    const sanitizeFilename = (str) => {
        return String(str).replace(/[\s\/\\:*?"<>|]/g, '_');
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const startQuiz = (topicIndex) => {
        const topic = topics[topicIndex];
        if (!topic || !topic.mcqs || topic.mcqs.length === 0) return;
        
        const shuffledOrder = shuffleArray(topic.mcqs.map((_, i) => i));
        setCurrentQuiz({ topic, topicIndex });
        setQuizState({
            questionIndex: 0,
            correctAnswers: 0,
            selectedAnswer: null,
            showFeedback: false,
            quizComplete: false,
            shuffledOrder
        });
    };

    const handleAnswer = (answerIndex) => {
        if (quizState.showFeedback) return;
        
        const currentQuestion = currentQuiz.topic.mcqs[quizState.shuffledOrder[quizState.questionIndex]];
        const selectedOption = currentQuestion.options[answerIndex];
        const isCorrect = selectedOption === currentQuestion.correct;
        
        setQuizState(prev => ({
            ...prev,
            selectedAnswer: answerIndex,
            showFeedback: true,
            correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0)
        }));

        // Auto-advance after feedback
        setTimeout(() => {
            if (quizState.questionIndex < quizState.shuffledOrder.length - 1) {
                setQuizState(prev => ({
                    ...prev,
                    questionIndex: prev.questionIndex + 1,
                    selectedAnswer: null,
                    showFeedback: false
                }));
            } else {
                setQuizState(prev => ({
                    ...prev,
                    quizComplete: true
                }));
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuiz(null);
        setQuizState({
            questionIndex: 0,
            correctAnswers: 0,
            selectedAnswer: null,
            showFeedback: false,
            quizComplete: false,
            shuffledOrder: []
        });
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{error}</p>
                    <button 
                        onClick={loadTopics}
                        className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Quiz View
    if (currentQuiz) {
        if (quizState.quizComplete) {
            const percentage = Math.round((quizState.correctAnswers / quizState.shuffledOrder.length) * 100);
            return (
                <div className="p-6">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                        <p className="text-lg mb-2">{currentQuiz.topic.topic}</p>
                        <div className="text-3xl font-bold text-blue-600 mb-4">
                            {quizState.correctAnswers} / {quizState.shuffledOrder.length}
                        </div>
                        <div className="text-lg text-gray-600 mb-6">
                            Score: {percentage}%
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => startQuiz(currentQuiz.topicIndex)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                <RefreshCw size={18} />
                                Try Again
                            </button>
                            <button
                                onClick={resetQuiz}
                                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                <ArrowLeft size={18} />
                                Back to Topics
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        const currentQuestion = currentQuiz.topic.mcqs[quizState.shuffledOrder[quizState.questionIndex]];
        
        return (
            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">
                                    {currentQuiz.topic.topic}
                                </span>
                                <span className="text-gray-600">
                                    Question {quizState.questionIndex + 1} of {quizState.shuffledOrder.length}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ 
                                        width: `${((quizState.questionIndex + 1) / quizState.shuffledOrder.length) * 100}%` 
                                    }}
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-4">{currentQuestion.q}</h3>
                        
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = quizState.selectedAnswer === index;
                                const isCorrect = option === currentQuestion.correct;
                                const showCorrect = quizState.showFeedback && isCorrect;
                                const showIncorrect = quizState.showFeedback && isSelected && !isCorrect;
                                
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        disabled={quizState.showFeedback}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                            showCorrect ? 'border-green-500 bg-green-50' :
                                            showIncorrect ? 'border-red-500 bg-red-50' :
                                            isSelected ? 'border-blue-500 bg-blue-50' :
                                            'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                                        } ${quizState.showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        {option}
                                        {showCorrect && <span className="ml-2 text-green-600 font-semibold">✓</span>}
                                        {showIncorrect && <span className="ml-2 text-red-600 font-semibold">✗</span>}
                                    </button>
                                );
                            })}
                        </div>

                        {quizState.showFeedback && (
                            <div className={`mt-4 p-3 rounded-lg ${
                                currentQuestion.options[quizState.selectedAnswer] === currentQuestion.correct
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                <p className="font-semibold mb-1">
                                    {currentQuestion.options[quizState.selectedAnswer] === currentQuestion.correct
                                        ? 'Correct!' : 'Incorrect'}
                                </p>
                                {currentQuestion.explanation && (
                                    <p className="text-sm">{currentQuestion.explanation}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Topics Grid View
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Education & Learning</h1>
            <p className="text-gray-600 mb-6">
                Select a topic to start an interactive quiz. H5P content packages will be available for download.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => {
                    const sanitized = sanitizeFilename(topic.topic);
                    const h5pFilename = `${sanitized}_QuestionSet.h5p`;
                    const h5pUrl = `/public/h5p/${encodeURIComponent(h5pFilename)}`;
                    
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {topic.topic}
                            </h3>
                            <div className="text-sm text-gray-600 mb-4">
                                <p>{topic.mcqs?.length || 0} Questions</p>
                                <p>{topic.flashcards?.length || 0} Flashcards</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => startQuiz(index)}
                                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    <Play size={18} />
                                    Start Quiz
                                </button>
                                <a
                                    href={h5pUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                >
                                    <Download size={18} />
                                    Download H5P
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}