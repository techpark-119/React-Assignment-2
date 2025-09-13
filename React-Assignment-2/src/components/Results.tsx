import React from 'react';

interface UserAnswer {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface ResultsProps {
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ userAnswers, onRestart }) => {
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const totalQuestions = userAnswers.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent! 🎉';
    if (percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
            <p className={`text-2xl font-semibold mb-2 ${getScoreColor()}`}>
              {getScoreMessage()}
            </p>
            <div className="text-6xl font-bold text-gray-800 mb-4">
              {correctAnswers}/{totalQuestions}
            </div>
            <div className={`text-3xl font-semibold ${getScoreColor()}`}>
              {percentage}%
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-green-700 font-medium">Correct</div>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
              <div className="text-red-700 font-medium">Incorrect</div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
              <div className="text-blue-700 font-medium">Total</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Answers</h2>
            <div className="space-y-4">
              {userAnswers.map((answer, index) => (
                <div key={index} className={`p-6 rounded-2xl border-2 ${
                  answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      answer.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {answer.isCorrect ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Q{index + 1}: {decodeHtml(answer.question)}
                      </h3>
                      <div className="space-y-2">
                        {answer.selectedAnswer && (
                          <div className={`p-3 rounded-lg ${
                            answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <span className="font-medium">Your answer: </span>
                            {decodeHtml(answer.selectedAnswer)}
                          </div>
                        )}
                        {!answer.selectedAnswer && (
                          <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                            <span className="font-medium">No answer selected (Time expired)</span>
                          </div>
                        )}
                        {!answer.isCorrect && (
                          <div className="p-3 rounded-lg bg-green-100 text-green-800">
                            <span className="font-medium">Correct answer: </span>
                            {decodeHtml(answer.correctAnswer)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onRestart}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;