import { createReducer, on } from "@ngrx/store";
import { citiesSuccess } from "./dashboard.actions";
import { Cities } from "../../models/dashboard.model";

export const dashboardFeatureKey = 'search';

export interface DashboardState {
  cities: Cities;
}

const initialState: DashboardState = {
  cities: {} as Cities,
}

export const dashboardReducer = createReducer(
  initialState,
  on(citiesSuccess, (state, { cities }) => ({ ...state, cities })),
);
