import { Airport } from '../types/airportTypes';
import { WeatherReport } from '../types/weatherTypes';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (res.ok) {
    return (await res.json() as Promise<T>);
  } else {
    // TODO better error handling
    throw new Error('Failed to load airports');
  }
}

const api = {
  getAirportList: () => get<Airport[]>('/airports/index.json'),
  getAirport: (icaoCode: string) => get<Airport>(`/airports/${icaoCode.toUpperCase()}.json`),
  getWeather: (icaoCode: string) => get<{ report: WeatherReport }>(`/weather/${icaoCode}.json`)
};

export default api;
