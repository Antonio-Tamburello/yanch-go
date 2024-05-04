export interface UserData {
  token: string;
  name: string;
  router: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name: string;
}

export interface RegisterPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  name: string;
}
