import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { CardComponent } from '@src/app/shared/components/card/card.component';
import { FormComponent } from '@src/app/shared/components/form/form.component';
import { FormModel } from '@src/app/shared/models/form.model';
import { Subject, Subscription, filter, map, takeUntil } from 'rxjs';
import { Cities, City } from '../../models/dashboard.model';
import { DashboardFacade } from '../../store/dashboard/dashboard.facade';
import { ButtonConfig } from '@src/app/shared/models/button.model';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { ROUTE } from '@src/app/constants/route';

const MODULES = [CommonModule, RouterLink];
const COMPONENTS = [FormComponent, CardComponent, ButtonComponent];

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [...MODULES, ...COMPONENTS],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
})
export class CitiesComponent implements OnInit, OnDestroy {
  cities = signal<Cities>({} as Cities);
  citiesList = computed<City[]>(() => this.cities().cities);

  cityFilterName = signal<string>('');

  citiesListFiltered = computed<City[]>(() =>
    this.citiesList().filter((city) =>
      city.name.toLowerCase().includes(this.cityFilterName().toLowerCase())
    )
  );

  formModel: FormModel = {
    type: 'search',
    cardCustomClass: 'w-100',
    inputElements: [
      {
        label: 'Choose your next destination',
        inputType: 'text',
        inputValidator: [Validators.required],
        customClass: 'mb-3',
      },
    ],
  };

  buttonElement: ButtonConfig = {
    id: 'explore',
    classButtonType: 'btn-outline-primary',
    typeButtonType: 'button',
    label: 'Explore',
    customClass: 'w-100',
  };

  public ROUTE = ROUTE;

  private destroy$ = new Subject<void>();

  /**
   * Inject the DashboardFacade Pattern.
   */
  dashboardFacade = inject(DashboardFacade);

  cities$: Subscription = this.dashboardFacade.cities$
    .pipe(filter(Boolean), takeUntil(this.destroy$))
    .subscribe((cities: Cities) => {
      this.cities.set(cities);
    });

  ngOnInit() {
    this.dashboardFacade.cities();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  filterCities(searchCity: string) {
    this.cityFilterName.set(searchCity);
  }
}
