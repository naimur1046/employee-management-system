import { Routes } from '@angular/router';
import { ManageDepartmentComponent } from './components/manage-department/manage-department.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { ViewDepartmentComponent } from './components/view-department/view-department.component';

export const departmentsRoutes: Routes = [
  {
    path: '',
    component: ManageDepartmentComponent,
  },
  {
    path: 'add',
    component: AddDepartmentComponent,
  },
  {
    path: ':id/edit',
    component: EditDepartmentComponent,
  },
  {
    path: ':id/view',
    component: ViewDepartmentComponent,
  },
];
