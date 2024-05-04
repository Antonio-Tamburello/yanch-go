import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from '../models/user.model';
// import { environment } from '../../../../environments/environment';
// import { ENDPOINTS } from '../../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  constructor(private http: HttpClient) {}

  login(loginPayload: LoginPayload): Observable<LoginResponse> {
    // return this.http.post<LoginResponse>(`${environment.baseUrl}/${ENDPOINTS.LOGIN}`, loginPayload);
    const mockResponse: LoginResponse = {
      token: 'your-token-string',
      name: loginPayload.email.replace(/@.*/, '')
    };
    return of(mockResponse);
  }

  register(registerPayload: RegisterPayload): Observable<RegisterResponse> {
    // return this.http.post<RegisterResponse>(`${environment.baseUrl}/${ENDPOINTS.REGISTER}`, registerPayload );
    const mockResponse: RegisterResponse = {
      token: 'your-token-string',
      name: registerPayload.email.replace(/@.*/, '')
    };
    return of(mockResponse);
  }
}
