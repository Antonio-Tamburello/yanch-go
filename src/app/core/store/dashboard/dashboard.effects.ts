import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../../services/dashboard.service';
import { cities, citiesSuccess } from './dashboard.actions';
import { map, of, switchMap } from 'rxjs';
import { Cities, GetCitiesPayload } from '../../models/dashboard.model';

@Injectable()
export class DashboardEffects {
  action$ = inject(Actions);
  dashboardService = inject(DashboardService);

  public login$ = createEffect(() =>
    this.action$.pipe(
      ofType(cities),
      switchMap(({ getCitiesPayload }) =>
        this.dashboardService.getCities(getCitiesPayload || ({} as GetCitiesPayload))
          .pipe(
            map((cities: Cities) => {
              return citiesSuccess({ cities });
            })
          )
      )
    )
  );
}
