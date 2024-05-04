import { Routes } from '@angular/router';
import { ROUTE } from './constants/route';
import { LoginComponent } from './core/components/login/login.component';
import { RegistrationComponent } from './core/components/registration/registration.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: ROUTE.LOGIN, component: LoginComponent },
    { path: ROUTE.REGISTER, component: RegistrationComponent },
    { path: ROUTE.DASHBOARD, component: DashboardComponent, canActivate: [LoginGuard] },
    
    { path: '', redirectTo: ROUTE.DASHBOARD, pathMatch: 'full' },
    { path: '**', redirectTo: ROUTE.DASHBOARD },
];
