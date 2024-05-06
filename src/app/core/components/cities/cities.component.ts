import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { Validators } from '@angular/forms';
import { CardComponent } from '@src/app/shared/components/card/card.component';
import { FormComponent } from '@src/app/shared/components/form/form.component';
import { FormModel, FormOutputModel } from '@src/app/shared/models/form.model';
import { Cities, City } from '../../models/dashboard.model';
import { Subject, Subscription, filter, takeUntil } from 'rxjs';
import { DashboardFacade } from '../../store/dashboard/dashboard.facade';
import { CardConfig } from '@src/app/shared/models/card.model';

const COMPONENTS = [
  FormComponent,
  CardComponent,
]

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit, OnDestroy {

  cities = signal<Cities>({} as Cities);
  citiesList = computed<City[]>(() => this.cities().cities);

  private destroy$ = new Subject<void>();


    /**
   * Inject the DashboardFacade Pattern.
   */
    dashboardFacade = inject(DashboardFacade);

  cities$: Subscription = this.dashboardFacade.cities$.pipe(
    filter(Boolean),
    takeUntil(this.destroy$)
  ).subscribe((cities: Cities) => {
    this.cities.set(cities);
  });


  formModel: FormModel = {
    type: 'search',
    cardCustomClass: 'w-50',
    inputElements: [
      {
        label: 'Choose your next destination',
        inputType: 'text',
        inputValidator: [Validators.required, Validators.minLength(3)],
      },
    ],
    buttonElements: [
      {
        id: 'search',
        classButtonType: 'btn-primary',
        typeButtonType: 'submit',
        label: 'Search',
        customClass: 'w-100 mt-2',
      },
    ],
  };

  cardModel: CardConfig = {
    cardBodyCustomClass: 'px-5',
  };

  ngOnInit() {
    this.dashboardFacade.cities();
  }

  ngOnDestroy() {
    this.destroy$.next();  
  }

  onSubmitForm(form: FormOutputModel) {
    console.log(form);
  }

}
