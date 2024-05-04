import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { userReducer } from './core/store/user/user.reducer';
import { UserEffects } from './core/store/user/user.effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),

    provideStore(),

    provideStore({ user: userReducer }),
    provideStoreDevtools(),
    provideEffects([UserEffects]),
  ],
  
};
