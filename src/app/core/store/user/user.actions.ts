import { createAction, props } from "@ngrx/store";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "../../models/user.model";

export const login = createAction('[User] Login', props<{ payload: LoginPayload }>());
export const loginSuccess = createAction('[User] Login Success', props<{ response: LoginResponse }>());

export const register = createAction('[User] Register', props<{ payload: RegisterPayload }>());
export const registerSuccess = createAction('[User] Registered Success', props<{ response: RegisterResponse }>());

export const logOut = createAction('[User] Logout');
export const logOutSuccess = createAction('[User] Logout Success');

export const setUserData = createAction('[User] Set User Data');
export const setUserDataSuccess = createAction('[User] Set User Data Successfully');
