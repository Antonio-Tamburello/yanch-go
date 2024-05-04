import { Component, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserFacade } from '../../store/user/user.facade';
import { UserState } from '../../store/user/user.reducer';

/**
 * Represents the DashboardComponent class.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
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
  name = computed<string>(() => this.user().name || localStorage.getItem('name') || '');

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
   * Logs out the user through UserFacade Pattern.
   */
  logOut() {
    this.userFacade.logOut();
  }
}
