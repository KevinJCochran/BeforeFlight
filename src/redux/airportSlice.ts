import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airport } from '../types';
import api from '../api/aeronauticalAPI';

export enum Status {
  loading = 'loading',
  successful = 'successful',
  failed = 'failed',
}

interface AirportState {
  status: Status,
  airports: {
    [id: string]: Airport,
  }
}

const initialState: AirportState = {
  status: Status.successful,
  airports: {},
};

export const fetchAirport = createAsyncThunk('airport/fetchAirport', api.getAirport);
export const fetchAirportList = createAsyncThunk('airport/fetchAirportList', api.getAirportList);

export const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    pushAirport: (state, { payload: airport }: PayloadAction<Airport>) => {
      state.airports[airport.siteNumberCode] = airport;
    },
    pushAllAirports: (state, { payload: airports }: PayloadAction<Airport[]>) => {
      airports.forEach(airport => state.airports[airport.siteNumberCode] = airport);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAirport.pending, state => {
      state.status = Status.loading;
    });
    builder.addCase(fetchAirport.fulfilled, (state, action) => {
      state.airports[action.payload.siteNumberCode] = action.payload;
      state.status = Status.successful;
    });
    builder.addCase(fetchAirport.rejected, state => {
      state.status = Status.failed;
    });

    builder.addCase(fetchAirportList.pending, state => {
      state.status = Status.loading;
    });
    builder.addCase(fetchAirportList.fulfilled, (state, { payload: airports }) => {
      airports.forEach((a) => state.airports[a.siteNumberCode] = a);
      state.status = Status.successful;
    });
    builder.addCase(fetchAirportList.rejected, state => {
      state.status = Status.failed;
    });
  },
});

export const { pushAirport, pushAllAirports } = airportSlice.actions;
