import { Routes } from '@angular/router';
import { ROUTE } from './constants/route';
import { LoginComponent } from './modules/components/login/login.component';
import { RegistrationComponent } from './modules/components/registration/registration.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { CityComponent } from './modules/components/city/city.component';

export const routes: Routes = [
    { path: ROUTE.LOGIN, component: LoginComponent },
    { path: ROUTE.REGISTER, component: RegistrationComponent },
    { path: ROUTE.DASHBOARD, component: DashboardComponent, canActivate: [LoginGuard] },
    { path: `${ROUTE.CITY}/:id`, component: CityComponent, canActivate: [LoginGuard] },
    
    { path: '', redirectTo: ROUTE.DASHBOARD, pathMatch: 'full' },
    { path: '**', redirectTo: ROUTE.DASHBOARD },
];
