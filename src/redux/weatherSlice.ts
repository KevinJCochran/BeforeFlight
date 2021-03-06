import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherReport } from '../types/weatherTypes';
import api from '../api/aeronauticalAPI';

export enum Status {
  loading = 'loading',
  successful = 'successful',
  failed = 'failed',
}

interface WeatherState {
  status: Status,
  map: {
    [id: string]: WeatherReport,
  }
}

const initialState: WeatherState = {
  status: Status.successful,
  map: {},
};

// Async actions
export const fetchWeather = createAsyncThunk('airport/fetchWeather', async (icao: string) => {
  const weather = await api.getWeather(icao);
  return {
    code: icao,
    report: weather.report,
  };
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    pushWeather: (state, { payload: weather }: PayloadAction<{ code: string, report: WeatherReport }>) => {
      state.map[weather.code] = weather.report;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchWeather.pending, state => {
      state.status = Status.loading;
    });
    builder.addCase(fetchWeather.fulfilled, (state, { payload: weather }) => {
      state.map[weather.code] = weather.report;
      state.status = Status.successful;
    });
    builder.addCase(fetchWeather.rejected, state => {
      state.status = Status.failed;
    });
  },
});

export const { pushWeather } = weatherSlice.actions;
