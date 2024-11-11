// todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTodos: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoSuccess: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodoSuccess: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodoSuccess: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

// Xuất các action
export const {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  editTodoSuccess,
  deleteTodoSuccess,
  resetError,
} = todosSlice.actions;

// Xuất reducer
export default todosSlice.reducer;
