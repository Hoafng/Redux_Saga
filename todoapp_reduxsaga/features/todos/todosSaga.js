// todosSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  editTodoSuccess,
  deleteTodoSuccess,
} from './todosSlice';

const API_URL = 'https://65530f285449cfda0f2e0c90.mockapi.io/api/v1/Todo';

function* fetchTodosSaga() {
  try {
    const response = yield call(axios.get, API_URL);
    console.log(response.data)
    yield put(fetchTodosSuccess(response.data));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* addTodoSaga(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload );
    yield put(addTodoSuccess(response.data));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* editTodoSaga(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, { text: action.payload.text });
    yield put(editTodoSuccess(response.data));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Theo dõi các action
export function* watchTodosSaga() {
  yield takeEvery(fetchTodos.type, fetchTodosSaga);
  yield takeEvery(addTodoSuccess.type, addTodoSaga);
  yield takeEvery(editTodoSuccess.type, editTodoSaga);
  yield takeEvery(deleteTodoSuccess.type, deleteTodoSaga);
}
