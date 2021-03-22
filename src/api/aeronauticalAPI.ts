import { Airport } from '../types/airportTypes';
import { WeatherReport } from '../types/weatherTypes';

// Utilize Typescript generics to write a generic get function
async function get<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (res.ok) {
    return (await res.json() as Promise<T>);
  } else {
    throw new Error('Failed to load airports');
  }
}

/*
* API for this app.
*
* NOTE: '/airports/index.json' was not provided, but can be
*       added to improve the performance of the Home page.
*/
const api = {
  getAirportList: () => get<Airport[]>('/airports/index.json'),
  getAirport: (icaoCode: string) => get<Airport>(`/airports/${icaoCode.toUpperCase()}.json`),
  getWeather: (icaoCode: string) => get<{ report: WeatherReport }>(`/weather/${icaoCode}.json`)
};

export default api;
