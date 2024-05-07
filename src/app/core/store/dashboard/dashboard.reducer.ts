import { createReducer, on } from '@ngrx/store';
import { Cities, CityInfoResponse } from '../../models/dashboard.model';
import { citiesSuccess, getCitySuccess, resetCity } from './dashboard.actions';

export const dashboardFeatureKey = 'search';

export interface DashboardState {
  cities: Cities;
  city: CityInfoResponse;
}

const initialState: DashboardState = {
  cities: {} as Cities,
  city: {} as CityInfoResponse,
};

export const dashboardReducer = createReducer(
  initialState,
  on(citiesSuccess, (state, { cities }) => ({ ...state, cities })),
  on(getCitySuccess, (state, { city }) => ({ ...state, city })),
  on(resetCity, (state) => ({ ...state, city: {} as CityInfoResponse }))
);
