export type FlightRules = 'VFR' | 'IFR';
export type CloudCoverage = 'clr' | 'few' | 'skc' | 'ovc';

export interface Wind {
  speedKts: number;
  direction: number;
  from: number;
  variable: boolean;
}

export interface Visibility {
  distanceSm: number;
  prevailingVisSm: number;
}

export interface CloudLayer {
  coverage: CloudCoverage;
  altitudeFt: number;
  ceiling: boolean;
}

export interface Conditions {
  ident: string;
  dateIssued: string;
  lat: number;
  lon: number;
  elevationFt: number;
  tempC: number;
  dewpointC: number;
  pressureHg: number;
  densityAltitudeFt: number;
  relativeHumidity: number;
  flightRules: FlightRules;
  cloudLayers: CloudLayer[];
  wind: Wind;
  visibility: Visibility;
}

export interface WeatherReport {
  conditions?: Conditions;
}
