import { Routes } from '@angular/router';

import { authGuard, publicGuard } from './core/guards';

export const routes: Routes = [
  {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () => import('../app/pages/users/users.routes').
    then((routes) => routes.UserRoutes),
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'sign-up',
        title: 'Sing Up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
        title: 'Log In',
        loadComponent: () => import('./pages/auth/log-in/log-in.component'),
      },
    ],
  },
];
