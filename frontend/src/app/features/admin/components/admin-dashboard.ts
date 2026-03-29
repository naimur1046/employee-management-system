import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  sections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'employees', name: 'Employees' },
    { id: 'settings', name: 'Settings' }
  ];

  activeSection: string = 'dashboard';

  ngOnInit(): void {
    this.activeSection = 'dashboard';
  }

  selectSection(sectionId: string): void {
    this.activeSection = sectionId;
  }

  getActiveSectionName(): string {
    const section = this.sections.find(s => s.id === this.activeSection);
    return section ? section.name : 'Dashboard';
  }

  showAddEmployee(): void {
    this.activeSection = 'addEmployee';
  }

  showManageEmployees(): void {
    this.activeSection = 'employees';
  }

  openAddModal(): void {
    console.log(`Opening add modal for ${this.activeSection}`);
    alert(`Add new ${this.activeSection} feature coming soon!`);
  }
}
