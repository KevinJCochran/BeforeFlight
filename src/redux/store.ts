import { configureStore } from '@reduxjs/toolkit';
import { airportSlice } from './airportSlice';

const store = configureStore({
  reducer: {
    airports: airportSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
