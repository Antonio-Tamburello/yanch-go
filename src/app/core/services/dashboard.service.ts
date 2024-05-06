import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '@src/app/constants/endpoints';
import { environment } from '@src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Cities, GetCitiesPayload } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getCities({limit = 20, offset = 0}: GetCitiesPayload ): Observable<Cities> {
    return this.http.get<Cities>(`${environment.baseUrl}/${ENDPOINTS.CITIES}?limit=${limit}&offset=${offset}`);
  }


}
