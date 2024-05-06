export interface City {
  cityId: 'string';
  name: 'string';
  country: 'string';
}

export interface Cities {
  count: number;
  cities: City[];
}

export interface GetCitiesPayload {
  limit: number;
  offset: number;
}
