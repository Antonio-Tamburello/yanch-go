import { createReducer, on } from "@ngrx/store";
import { logOutSuccess, loginSuccess, registerSuccess } from "./user.actions";

export const userFeatureKey = 'user';

export interface UserState {
  name: string;
  token: string;
}

const initialState: UserState = {
  name: '',
  token: '',
}

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { response } ) => ({ ...state, token: response.token, name: response.name })),
  on(registerSuccess, (state, { response } ) => ({ ...state, token: response.token, name: response.name })),
  on(logOutSuccess, () => ( initialState ))
);
