// store.js
import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './tradesSlice';

const store = configureStore({
  reducer: {
    trades: tradesReducer,
  },
});

export default store;
