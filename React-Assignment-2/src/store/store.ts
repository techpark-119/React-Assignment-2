import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import quizReducer from './quizSlice';
import stepperReducer from './stepperSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    quiz: quizReducer,
    stepper: stepperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;