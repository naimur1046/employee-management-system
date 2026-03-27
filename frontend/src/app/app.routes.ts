import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-routing').then(m => m.adminRoutes),
  },
  {
    path: 'employees',
    loadComponent: () => import('./features/employees/components/manage/manage-employee.component')
      .then(m => m.ManageEmployeeComponent),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];