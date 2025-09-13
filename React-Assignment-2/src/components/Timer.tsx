import React, { useState, useEffect } from 'react';

interface TimerProps {
  onTimeUp: () => void;
  duration: number;
  isActive: boolean;
  questionNumber: number; // Add this to reset timer for each question
}

const Timer: React.FC<TimerProps> = ({ onTimeUp, duration, isActive, questionNumber }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, questionNumber]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp, questionNumber]);

  const percentage = (timeLeft / duration) * 100;
  const isLowTime = timeLeft <= 5;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isLowTime ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
        }`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className={`text-2xl font-bold ${isLowTime ? 'text-red-600' : 'text-gray-800'}`}>
            {timeLeft}s
          </div>
          <div className="text-sm text-gray-500">Time remaining</div>
        </div>
      </div>
      
      <div className="flex-1 mx-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ${
              isLowTime ? 'bg-red-500' : 'bg-gradient-to-r from-green-500 to-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Timer;