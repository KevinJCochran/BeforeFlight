import { Airport } from '../types/airportTypes';
import { Wind } from '../types/weatherTypes';

// export enum CardinalDirection1 {
//   NNE = 22.5,
//   NE = 45,
//   E = 90,
//   ESE = 112.5,
//   SE = 135,
//   SSE = 157.5,
//   S = 180,
//   SSW = 202.5,
//   SW = 225,
//   WSW = 247.5,
//   W = 270,
//   WNW = 292.5,
//   NW = 315,
//   NNW = 337.5,
//   N = 360,
// }

const cardinalDirections = {
  // {
  //   dir: 'NNE',
  //   value: 22.5,
  // },
  // {
  //   dir: 'NE',
  //   value: 45,
  // },
  // {
  //   dir: 'ENE',
  //   value: 67.5,
  // },
  // {
  //   dir: 'E',
  //   value: 90,
  // },
  // {
  //   dir: 'ESE',
  //   value: 112.5,
  // },
  // {
  //   dir: 'SE',
  //   value: 135,
  // },
  // {
  //   dir: 'SSE',
  //   value: 157.5,
  // },
  // {
  //   dir: 's',
  //   value: 180,
  // },
  // {
  //   dir: 'SSW',
  //   value: 202.5,
  // },
  // {
  //   dir: 'SW',
  //   value: 225,
  // },
  // {
  //   dir: 'SSE',
  //   value: 157.5,
  // },
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
}

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
}
