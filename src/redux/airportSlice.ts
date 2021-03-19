import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airport } from '../types';

interface AirportState {
  [id: string]: Airport,
}

const initialState: AirportState = {};

export const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    pushAirport: (state, { payload: airport }: PayloadAction<Airport>) => {
      state[airport.siteNumberCode] = airport;
    },
    pushAllAirports: (state, { payload: airports }: PayloadAction<Airport[]>) => {
      airports.forEach(airport => state[airport.siteNumberCode] = airport)
    }
  }
})

export const { pushAirport, pushAllAirports } = airportSlice.actions;
