import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airport } from '../types/airportTypes';
import api from '../api/aeronauticalAPI';

export enum Status {
  loading = 'loading',
  successful = 'successful',
  failed = 'failed',
}

interface AirportState {
  status: Status,
  map: {
    [id: string]: Airport,
  }
}

const initialState: AirportState = {
  status: Status.successful,
  map: {},
};

// Async actions
export const fetchAirport = createAsyncThunk('airport/fetchAirport', api.getAirport);
export const fetchAirportList = createAsyncThunk('airport/fetchAirportList', api.getAirportList);

export const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    // This reducer is not currently in use but is provided for future needs
    pushAirport: (state, { payload: airport }: PayloadAction<Airport>) => {
      state.map[airport.code] = airport;
    },
  },
  extraReducers: builder => {
    // fetchAirport actions
    builder.addCase(fetchAirport.pending, state => {
      state.status = Status.loading;
    });
    builder.addCase(fetchAirport.fulfilled, (state, { payload: airport }) => {
      state.map[airport.code] = airport;
      state.status = Status.successful;
    });
    builder.addCase(fetchAirport.rejected, state => {
      state.status = Status.failed;
    });

    // fetchAirportList actions
    builder.addCase(fetchAirportList.pending, state => {
      state.status = Status.loading;
    });
    builder.addCase(fetchAirportList.fulfilled, (state, { payload: airports }) => {
      airports.forEach((a) => state.map[a.code] = a);
      state.status = Status.successful;
    });
    builder.addCase(fetchAirportList.rejected, state => {
      state.status = Status.failed;
    });
  },
});

export const { pushAirport } = airportSlice.actions;
