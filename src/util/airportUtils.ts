import { Airport } from '../types/airportTypes';

export const formatLatLong = (lat: number, long: number): string => {
  const latHemisphere = lat > 0 ? 'N' : 'S';
  const longHemisphere = long > 0 ? 'E' : 'W';

  const absLat = Math.abs(lat);
  const absLong = Math.abs(long);

  return `${absLat.toFixed(2)}\xB0 ${latHemisphere} / ${absLong.toFixed(2)}\xB0 ${longHemisphere}`;
};

export const getFormattedAddress = (airport: Airport): string =>
  `${airport.city}, ${airport.state}, ${airport.countryCode}`