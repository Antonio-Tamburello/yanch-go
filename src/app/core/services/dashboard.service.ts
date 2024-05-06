import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '@src/app/constants/endpoints';
import { environment } from '@src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { Cities, GetCitiesPayload } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getCities({ limit = 20, offset = 0 }: GetCitiesPayload): Observable<Cities> {
    return of({ cities: [
      { cityId: '1', name: 'New York', country: 'USA' },
      { cityId: '2', name: 'Los Angeles', country: 'USA' },
      { cityId: '3', name: 'San Francisco', country: 'USA' },
      { cityId: '4', name: 'Chicago', country: 'USA' },
      { cityId: '5', name: 'Miami', country: 'USA' },
      { cityId: '6', name: 'Las Vegas', country: 'USA' },
      { cityId: '7', name: 'Orlando', country: 'USA' },
      { cityId: '8', name: 'Seattle', country: 'USA' },
      { cityId: '9', name: 'Boston', country: 'USA' },
    ], count: 0 } as Cities);

    // return this.http.get<Cities>(`${environment.baseUrl}/${ENDPOINTS.CITIES}?limit=${limit}&offset=${offset}`);
  }
}
