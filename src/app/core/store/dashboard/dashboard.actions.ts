import { createAction, props } from "@ngrx/store";
import { Cities, GetCitiesPayload } from "../../models/dashboard.model";

export const cities = createAction('[Dashboard] Get Cities', props<{ getCitiesPayload?: GetCitiesPayload }>());
export const citiesSuccess = createAction('[Dashboard] Get Cities Success', props<{ cities: Cities }>());

