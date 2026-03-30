import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        path: 'employees/:id/view',
        loadComponent: () => import('./features/employees/components/view/view-employee.component')
          .then(m => m.ViewEmployeeComponent),
      },
      {
        path: 'employees/:id/edit',
        loadComponent: () => import('./features/employees/components/edit/edit-employee.component')
          .then(m => m.EditEmployeeComponent),
      },
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full',
      },
    ]
  },
];