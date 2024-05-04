import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { logOut, login, register } from "./user.actions";
import { Observable } from "rxjs";
import { token$, userState$ } from "./user.selectors";
import { UserState } from "./user.reducer";
import { LoginPayload, RegisterPayload } from "../../models/user.model";

@Injectable({ providedIn: 'root' })
export class UserFacade {
  public userState$: Observable<UserState> = this.store.select(userState$);
  public token$: Observable<string> = this.store.select(token$);

  constructor(private store: Store) {}

  public login(payload: LoginPayload): void {
    this.store.dispatch(login({ payload }));
  }

  public register(payload: RegisterPayload): void {
    this.store.dispatch(register({ payload }));
  }
  
  public logOut(): void {
    this.store.dispatch(logOut());
  }

}
