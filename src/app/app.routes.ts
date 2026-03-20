import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { AuthGuard } from './auth/auth.guard';
import { Auth } from './auth/auth/auth';

export const routes: Routes = [
  {
    path: 'login',
    component: Auth,
  },

  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../app/features/dashboard/pages/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: 'requests',
        loadComponent: () => import('../app/features/requests/pages/list/list').then((c) => c.List),
      },
      {
        path: 'requests/new',
        loadComponent: () => import('../app/features/requests/pages/form/form').then((c) => c.Form),
      },
      {
        path: 'requests/:id',
        loadComponent: () =>
          import('../app/features/requests/pages/detail/detail').then((c) => c.Detail),
      },
      {
        path: 'requests/:id/edit',
        loadComponent: () => import('../app/features/requests/pages/form/form').then((c) => c.Form),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
