export interface Runway {
  ident: string;
  length: number;
  width: number;
  name: string;
  recipName: string;
  trueHeading: number;
  magneticHeading: number;
  recipTrueHeading: number;
  recipMagneticHeading: number;
}

export interface Airport {
  code: string;
  name: string;
  faaCode: string | null;
  icao: string | null;
  iata: string | null;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  runways: Runway[];
}
