import React from 'react';
import TodoApp from './components/TodoApp'
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './app/store';

export default  App = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
};
