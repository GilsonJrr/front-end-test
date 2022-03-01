import { configureStore } from '@reduxjs/toolkit';
import { numberSlice } from '../features/Number/numberSlice';
import { modalSlice } from '../features/modalSlice';

export const store = configureStore({
  reducer: {
    number: numberSlice.reducer,
    ModalValues: modalSlice.reducer,
  },
});
