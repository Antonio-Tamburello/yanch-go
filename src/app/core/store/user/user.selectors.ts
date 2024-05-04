import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, userFeatureKey } from "./user.reducer";

export const getUserFeature = createFeatureSelector<UserState>(userFeatureKey);

export const token$ = createSelector(getUserFeature, ({ token }) => token);

export const userState$ = createSelector(getUserFeature, state => state);