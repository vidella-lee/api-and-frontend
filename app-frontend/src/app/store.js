import { configureStore } from '@reduxjs/toolkit';
import valueReducer from '../features/value/valueSlice';

export const store = configureStore({
  reducer: {
    value: valueReducer,
  },
});
