import { Routes } from '@angular/router';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: ManageUserComponent,
  },
  {
    path: 'add',
    component: AddUserComponent,
  },
  {
    path: ':id/edit',
    component: EditUserComponent,
  },
  {
    path: ':id/view',
    component: ViewUserComponent,
  },
];
