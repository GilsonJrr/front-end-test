import { configureStore } from '@reduxjs/toolkit';
import { numberSlice } from '../features/Number/numberSlice';

export const store = configureStore({
  reducer: {
    number: numberSlice.reducer,
  },
});
