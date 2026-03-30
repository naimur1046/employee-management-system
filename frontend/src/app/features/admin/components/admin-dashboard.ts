import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageEmployeeComponent } from '../../employees/components/manage/manage-employee.component';
import { AddEmployeeComponent } from '../../employees/components/add/add-employee.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, RouterModule, DashboardComponent, ManageEmployeeComponent, AddEmployeeComponent]
})
export class AdminDashboard implements OnInit {
  activeSection: string = 'dashboard';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['section'] === 'add') {
        this.activeSection = 'addEmployee';
      } else if (params['section'] === 'employees') {
        this.activeSection = 'employees';
      } else {
        this.activeSection = 'dashboard';
      }
    });
  }

  showAddEmployee(): void {
    this.router.navigate(['/admin'], { queryParams: { section: 'add' } });
  }

  showManageEmployees(): void {
    this.router.navigate(['/admin'], { queryParams: { section: 'employees' } });
  }
}
