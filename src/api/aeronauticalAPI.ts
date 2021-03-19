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
  getAirports: () => get<Airport[]>('/airports'),
  getAirport: (icaoCode: string) => get<Airport>(`/airports/${icaoCode}.json`),
}

export default api;

// export async function getAirports(): Promise<Airport[]> {
//   const res = await fetch('/airports');
//   if (res.ok) {
//     return (await res.json() as Promise<Airport[]>);
//   } else {
//     throw new Error('Failed to load airports');
//   }
// }
//
// export async function getAirport(iacoCode: string): Promise<Airport> {
//   const res = await fetch(`/airports/${iacoCode}.json`);
//   if (res.ok) {
//     return (await res.json() as Promise<Airport>);
//   } else {
//     throw new Error(`Failed to load airport: ${iacoCode}`);
//   }
// }
