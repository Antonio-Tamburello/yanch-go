import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { IMAGES } from '@src/app/constants/images';
import { NavBarComponent } from '@src/app/shared/components/navbar/navbar.component';
import { ButtonConfig } from '@src/app/shared/models/button.model';
import { NavbarConfig } from '@src/app/shared/models/navbar.model';
import { Subject, Subscription } from 'rxjs';
import { UserFacade } from '../../../core/store/user/user.facade';
import { UserState } from '../../../core/store/user/user.reducer';
import { CitiesComponent } from '../../../core/components/cities/cities.component';

/**
 * Array of components used in the dashboard.
 */
const COMPONENTS = [
  NavBarComponent,
  CitiesComponent,
];

/**
 * Represents the DashboardComponent class.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  /**
   * Signal that represents the user state.
   */
  user = signal<UserState>({} as UserState);

  /**
   * Computed signal that represents the user's token.
   */
  token = computed<string>(() => this.user().token);

  /**
   * Computed signal that represents the user's name.
   */
  name = computed<string>(() => this.user().name || localStorage.getItem('name') || '');

  /**
   * Inject the UserFacade Pattern.
   **/
  userFacade = inject(UserFacade);

  /**
   * Subject used to signal the destruction of the component.
   * This subject is used to unsubscribe from observables and perform cleanup operations.
   */
  private destroy$ = new Subject<void>();

  
  /**
   * Reactive subscription to the user state.
   */
  token$: Subscription = this.userFacade.userState$.subscribe(
    (user: UserState) => {
      this.user.set(user);
    }
  );

  /**
   * Array of button configurations for the navbar.
   * Each button configuration contains properties like classButtonType, typeButtonType, label, and customClass.
   */
  buttonsNavbar: ButtonConfig[] = [
    {
      id: 'homepage',
      classButtonType: 'btn-link',
      typeButtonType: 'button',
      label: 'Homepage',
      customClass: 'text-decoration-none text-white',
    },
    {
      id: 'about',
      classButtonType: 'btn-link',
      typeButtonType: 'button',
      label: 'About',
      customClass: 'text-decoration-none text-white',
    },
  ];

  /**
   * Configuration for the logout button.
   */
  buttonLogOutConfig: ButtonConfig = {
    id: 'logout',
    classButtonType: 'btn-link',
    typeButtonType: 'button',
    label: 'Log out',
    customClass: 'text-decoration-none text-white',
  };

  /**
   * Configuration object for the navbar in the dashboard component.
   */
  navbarConfig: NavbarConfig = {
    imgLogo: IMAGES.YANCHWAREGO_MINI_LOGO,
    buttonsNavbarStart: this.buttonsNavbar,
    buttonsNavbarEnd: [this.buttonLogOutConfig],
  };

  /**
   * Handles the click event of a button in the dashboard component.
   * @param button - The button configuration object.
   */
  onClickButton(button: ButtonConfig) {
    switch (button.id) {
      /**
       * Logs out the user through UserFacade Pattern.
       */
      case 'logout': {
        this.userFacade.logOut();
        break;
      }

      default: {
        break;
      }
    }
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * It is used to perform any necessary cleanup logic, such as unsubscribing from observables or
   * releasing resources.
   */
  ngOnDestroy() {
    this.token$.unsubscribe();
    this.destroy$.next();  
  }

}
