export interface City {
  cityId: string;
  name: string;
  country: string;
}

export interface Cities {
  count: number;
  cities: City[];
}

export interface GetCitiesPayload {
  limit: number;
  offset: number;
}

export interface CityInfoResponse {
  cityId: string;
  name: string;
  country: string;
  costOfLivingIndex: number;
  internetSpeed: InternetSpeed;
  coworkingSpaces: CoworkingSpace[];
  safetyIndex: number;
  climate: Climate;
}

export interface InternetSpeed {
  download: number;
  upload: number;
}

export interface CoworkingSpace {
  name: string;
  address: string;
  rating: number;
}

export interface Climate {
  averageTemperature: number;
  rainfall: number;
}
