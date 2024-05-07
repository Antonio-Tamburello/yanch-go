import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState, dashboardFeatureKey } from "./dashboard.reducer";

export const getDashboardFeature = createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const cities$ = createSelector(getDashboardFeature, ({ cities }) => cities);
export const getCity$ = createSelector(getDashboardFeature, ({ city }) => city);
