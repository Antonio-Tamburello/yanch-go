import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ROUTE } from '@src/app/constants/route';
import { CityInfoResponse } from '@src/app/core/models/dashboard.model';
import { DashboardFacade } from '@src/app/core/store/dashboard/dashboard.facade';
import { BarChartComponent } from '@src/app/shared/components/bar-chart/bar-chart.component';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { CardComponent } from '@src/app/shared/components/card/card.component';
import { StarRatingComponent } from '@src/app/shared/components/star-rating/star-rating.component';
import { ButtonConfig } from '@src/app/shared/models/button.model';
import { CardConfig } from '@src/app/shared/models/card.model';
import { Subject, Subscription, filter, map, take, takeUntil } from 'rxjs';

const MODULES = [CommonModule, RouterLink];
const COMPONENTS = [CardComponent, ButtonComponent, BarChartComponent, StarRatingComponent];

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [...MODULES, ...COMPONENTS],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss',
})
export class CityComponent implements OnDestroy {
  router = inject(Router);

  cityId = signal<string>('');

  city = signal<CityInfoResponse>({} as CityInfoResponse);

  public ROUTE = ROUTE;

  buttonElement: ButtonConfig = {
    id: 'back',
    classButtonType: 'btn-outline-primary',
    typeButtonType: 'button',
    label: 'Go back to cities',
  };

  cardConfig: CardConfig = {
    cardCustomClass: 'h-100'
  }


  /**
   * Inject the DashboardFacade Pattern.
   */
  dashboardFacade = inject(DashboardFacade);

  private destroy$ = new Subject<void>();

  routerSubscirption: Subscription = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event as NavigationEnd),
      map((event) => event.urlAfterRedirects),
      takeUntil(this.destroy$)
    )
    .subscribe((event: string) => {
      this.cityId.set(event.split('/city/').filter((element) => element)[0]);
      return this.dashboardFacade.getCity(this.cityId());
    });

  getCity: Subscription = this.dashboardFacade.getCity$
    .pipe(
      filter((city) => {
        return Object.keys(city).length > 0;
      }),
      take(1),
      takeUntil(this.destroy$),
      )
    .subscribe((city: CityInfoResponse) => {
      this.city.set(city);
    });

  ngOnDestroy() {
    this.dashboardFacade.resetCity();
    this.destroy$.next();
  }
}
