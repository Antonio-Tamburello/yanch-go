import { createAction, props } from "@ngrx/store";
import { Cities, CityInfoResponse, GetCitiesPayload } from "../../models/dashboard.model";

export const cities = createAction('[Dashboard] Get Cities', props<{ getCitiesPayload?: GetCitiesPayload }>());
export const citiesSuccess = createAction('[Dashboard] Get Cities Success', props<{ cities: Cities }>());

export const getCity = createAction('[City] Get City Info', props<{ cityId: string }>());
export const getCitySuccess = createAction('[City] Get City Info Success', props<{ city: CityInfoResponse }>());

export const resetCity = createAction('[City] Reset City');

