import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: TodoItem[];
  editingId: number | null;
}

const initialState: TodoState = {
  todos: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: false },
    { id: 3, text: "Play with Tailwind CSS", completed: false },
    { id: 4, text: "Learn Vite", completed: false },
  ],
  editingId: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: action.payload,
        completed: false
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    setEditingId: (state, action: PayloadAction<number | null>) => {
      state.editingId = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, updateTodo, setEditingId } = todoSlice.actions;
export default todoSlice.reducer;