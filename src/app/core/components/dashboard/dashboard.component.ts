import { Component, computed, inject, signal } from '@angular/core';
import { IMAGES } from '@src/app/constants/images';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { ButtonConfig } from '@src/app/shared/models/button.model';
import { Subscription } from 'rxjs';
import { UserFacade } from '../../store/user/user.facade';
import { UserState } from '../../store/user/user.reducer';

/**
 * Array of components used in the dashboard.
 */
const COMPONENTS = [ButtonComponent];

/**
 * Represents the DashboardComponent class.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ...COMPONENTS
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
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
  name = computed<string>(
    () => this.user().name || localStorage.getItem('name') || ''
  );

  /**
   * Inject the UserFacade Pattern.
   **/
  userFacade = inject(UserFacade);

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
      classButtonType: 'btn-link',
      typeButtonType: 'button',
      label: 'Log out',
      customClass: 'text-decoration-none text-white',
    },
    {
      classButtonType: 'btn-link',
      typeButtonType: 'button',
      label: 'Log out',
      customClass: 'text-decoration-none text-white',
    },
  ];

  /**
   * Configuration for the logout button.
   */
  buttonLogOutConfig: ButtonConfig = {
    classButtonType: 'btn-link',
    typeButtonType: 'button',
    label: 'Log out',
    customClass: 'text-decoration-none text-white',
  };

  /**
   * The logo image for the dashboard component.
   */
  imageLogo = IMAGES.YANCHWAREGO_MINI_LOGO;

  /**
   * Logs out the user through UserFacade Pattern.
   */
  logOut() {
    this.userFacade.logOut();
  }
}
