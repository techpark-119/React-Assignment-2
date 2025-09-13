import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { setLoading, setQuestions, startQuiz, addAnswer, nextQuestion, resetQuiz } from '../store/quizSlice';
import Question from './Question';
import Results from './Results';

interface UserAnswer {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, userAnswers, quizStarted, quizCompleted, loading } = useSelector((state: RootState) => state.quiz);

  const fetchQuestions = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
      const data = await response.json();
      dispatch(setQuestions(data.results));
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleStartQuiz = () => {
    fetchQuestions();
    dispatch(startQuiz());
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    const answer: UserAnswer = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect
    };

    dispatch(addAnswer(answer));
    dispatch(nextQuestion());
  };

  const handleTimeUp = () => {
    handleAnswer('');
  };

  const restartQuiz = () => {
    dispatch(resetQuiz());
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-300"></div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            🧠 Quiz Challenge
          </h1>
          
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Test your knowledge with <span className="text-cyan-400 font-semibold">10 multiple choice questions</span>. 
            You have <span className="text-purple-400 font-semibold">20 seconds</span> per question!
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-cyan-400 font-bold text-lg">10</div>
              <div className="text-gray-400">Questions</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-purple-400 font-bold text-lg">20s</div>
              <div className="text-gray-400">Per Question</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-pink-400 font-bold text-lg">🏆</div>
              <div className="text-gray-400">Challenge</div>
            </div>
          </div>
          
          <button
            onClick={handleStartQuiz}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Loading Questions...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Start Quiz</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return <Results userAnswers={userAnswers} onRestart={restartQuiz} />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-t-3xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <div className="text-sm text-gray-600">
              Score: {userAnswers.filter(a => a.isCorrect).length}/{userAnswers.length}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          onTimeUp={handleTimeUp}
          questionNumber={currentQuestionIndex + 1}
        />
      </div>
    </div>
  );
};

export default Quiz;