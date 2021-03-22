import { configureStore } from '@reduxjs/toolkit';
import { airportSlice } from './airportSlice';
import { weatherSlice } from './weatherSlice';

const store = configureStore({
  reducer: {
    airports: airportSlice.reducer,
    weather: weatherSlice.reducer,
  }
});

// Provide types for the Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
