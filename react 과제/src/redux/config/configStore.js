import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import counter from '../modules/counter';

const rootReducer = combineReducers({
  // 여기에 리듀서 추가
  counter: counter,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;