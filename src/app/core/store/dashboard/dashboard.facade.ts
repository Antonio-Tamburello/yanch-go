import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cities, GetCitiesPayload } from '../../models/dashboard.model';
import { cities, getCity, resetCity } from './dashboard.actions';
import { Observable } from 'rxjs';
import { cities$, getCity$ } from './dashboard.selectors';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  public cities$: Observable<Cities> = this.store.select(cities$);
  public getCity$: Observable<any> = this.store.select(getCity$);

  constructor(private store: Store) {}

  public cities(getCitiesPayload?: GetCitiesPayload): void {
    this.store.dispatch(cities({ getCitiesPayload }));
  }

  public getCity(cityId: string): void {
    this.store.dispatch(getCity({ cityId }));
  }

  public resetCity(): void {
    this.store.dispatch(resetCity());
  }

}
