export interface Runway {
  ident: string;
  length: string;
  width: string;
  name: string;
  recipName: string;
  trueHeading: number;
  magneticHeading: number;
  recipTrueHeading: number;
  recipMagneticHeading: number;
}

export interface Airport {
  siteNumberCode: string;
  name: string;
  faaCode: string | null;
  icao: string | null;
  iata: string | null;
  country: string;
  countryCode: string;
}
