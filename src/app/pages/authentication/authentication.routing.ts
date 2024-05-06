import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { PreventGuard } from 'src/app/guards/auth.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
        canActivate: [PreventGuard],
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        canActivate: [PreventGuard],
      },
    ],
  },
];
