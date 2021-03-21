import { configureStore } from '@reduxjs/toolkit';
import { airportSlice } from './airportSlice';
import { weatherSlice } from './weatherSlice';

const store = configureStore({
  reducer: {
    airports: airportSlice.reducer,
    weather: weatherSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
