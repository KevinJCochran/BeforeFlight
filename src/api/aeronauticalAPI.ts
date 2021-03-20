import { Airport } from "../types";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (res.ok) {
    return (await res.json() as Promise<T>);
  } else {
    throw new Error('Failed to load airports');
  }
}

const api = {
  getAirportList: () => get<Airport[]>('/airports/index.json'),
  getAirport: (icaoCode: string) => get<Airport>(`/airports/${icaoCode}.json`),
}

export default api;
