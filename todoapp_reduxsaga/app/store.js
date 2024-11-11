// store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todosReducer from '../features/todos/todosSlice';
import { watchTodosSaga } from '../features/todos/todosSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  todosReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchTodosSaga);

export default store;
