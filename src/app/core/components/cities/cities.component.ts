import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CardComponent } from '@src/app/shared/components/card/card.component';
import { FormComponent } from '@src/app/shared/components/form/form.component';
import { Cities, City } from '../../models/dashboard.model';
import { Subject, Subscription, filter, takeUntil } from 'rxjs';
import { DashboardFacade } from '../../store/dashboard/dashboard.facade';
import { CardConfig } from '@src/app/shared/models/card.model';
import { FormModel } from '@src/app/shared/models/form.model';

const COMPONENTS = [FormComponent, CardComponent];

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, ...COMPONENTS],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
})
export class CitiesComponent implements OnInit, OnDestroy {
  cities = signal<Cities>({} as Cities);
  citiesList = computed<City[]>(() => this.cities().cities);
  
  cityFilterName = signal<string>('');

  citiesListFiltered = computed<City[]>(() => this.citiesList().filter(city => city.name.toLowerCase().includes(this.cityFilterName().toLowerCase())) );

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

  cardModel: CardConfig = {
    cardBodyCustomClass: 'px-5',
  };

  ngOnInit() {
    this.dashboardFacade.cities();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  filterCities(searchCity: string) {
    this.cityFilterName.set(searchCity)
  }

}
