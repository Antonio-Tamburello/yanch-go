import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cities, GetCitiesPayload } from '../../models/dashboard.model';
import { cities } from './dashboard.actions';
import { Observable } from 'rxjs';
import { cities$ } from './dashboard.selectors';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  public cities$: Observable<Cities> = this.store.select(cities$);

  constructor(private store: Store) {}

  public cities(getCitiesPayload?: GetCitiesPayload): void {
    this.store.dispatch(cities({ getCitiesPayload }));
  }
}
