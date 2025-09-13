import React, { useState, useEffect } from 'react';
import Timer from './Timer';

interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
}

interface QuestionProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  onTimeUp: () => void;
  questionNumber: number;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, onTimeUp, questionNumber }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answered, setAnswered] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle options
    const allOptions = [...question.incorrect_answers, question.correct_answer];
    const shuffled = allOptions.sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setSelectedAnswer('');
    setAnswered(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (answered) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || answered) return;
    setAnswered(true);
    setTimeout(() => onAnswer(selectedAnswer), 500);
  };

  const handleTimeUp = () => {
    if (!answered) {
      setAnswered(true);
      onTimeUp();
    }
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="bg-white rounded-b-3xl shadow-2xl p-8">
      <div className="mb-6">
        <Timer onTimeUp={handleTimeUp} duration={20} isActive={!answered} questionNumber={questionNumber} />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {question.category}
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">
          {decodeHtml(question.question)}
        </h3>
      </div>

      <div className="space-y-4 mb-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={answered}
            className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
              selectedAnswer === option
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } ${answered ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === option
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === option && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="font-medium">{decodeHtml(option)}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer || answered}
        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 ${
          selectedAnswer && !answered
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-[1.02]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {answered ? 'Moving to next question...' : 'Submit Answer'}
      </button>
    </div>
  );
};

export default Question;