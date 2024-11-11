import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Địa chỉ API
const API_URL = 'https://65530f285449cfda0f2e0c90.mockapi.io/api/v1/Todo';

// Thực hiện việc lấy danh sách todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Thực hiện việc thêm todo
export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await axios.post(API_URL, { text });
  return response.data;
});

// Thực hiện việc chỉnh sửa todo
export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, text }) => {
  const response = await axios.put(`${API_URL}/${id}`, { text });
  return response.data;
});

// Thực hiện việc xóa todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Tạo slice cho todos
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
      });
  },
});

// Xuất các action
export default todosSlice.reducer;
