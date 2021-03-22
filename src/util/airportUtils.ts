import { Airport } from '../types/airportTypes';
import { CloudCoverage, Wind } from '../types/weatherTypes';

export const cardinalDirections = {
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
  N: 360,
};

export const cloudLayers: { [layer in CloudCoverage]: number } = {
  clr: 0,
  few: 1,
  skc: 2,
  ovc: 4,
};

export const formatLatLong = (lat: number, long: number): string => {
  const latHemisphere = lat > 0 ? 'N' : 'S';
  const longHemisphere = long > 0 ? 'E' : 'W';

  const absLat = Math.abs(lat);
  const absLong = Math.abs(long);

  return `${absLat.toFixed(2)}\xB0 ${latHemisphere} / ${absLong.toFixed(2)}\xB0 ${longHemisphere}`;
};

export const getFormattedAddress = (airport: Airport): string =>
  `${airport.city}, ${airport.state}, ${airport.countryCode}`;

export const getFormattedWinds = (wind: Wind): string =>
  `${wind.direction}\xB0 @ ${wind.speedKts} KTS`;

export const nearestCardinalDir = (heading: number): string => {
  const { dir } = Object.entries(cardinalDirections)
    .map(([dir, value]) => ({ dir, val: Math.abs(heading - value) }))
    .reduce((currentMin, nextVal) => nextVal.val < currentMin.val ? nextVal : currentMin);
  return dir;
};
