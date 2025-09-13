import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
}

interface UserAnswer {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  quizStarted: boolean;
  quizCompleted: boolean;
  loading: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  quizStarted: false,
  quizCompleted: false,
  loading: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQuestions: (state, action: PayloadAction<QuizQuestion[]>) => {
      state.questions = action.payload;
    },
    startQuiz: (state) => {
      state.quizStarted = true;
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
      state.quizCompleted = false;
    },
    addAnswer: (state, action: PayloadAction<UserAnswer>) => {
      state.userAnswers.push(action.payload);
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.quizCompleted = true;
      }
    },
    resetQuiz: (state) => {
      state.quizStarted = false;
      state.quizCompleted = false;
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
      state.questions = [];
    },
  },
});

export const { setLoading, setQuestions, startQuiz, addAnswer, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;