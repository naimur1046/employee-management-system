import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStats, RecentActivity } from '../../models/dashboard.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats[] = [
    { title: 'Total Employees', value: 0, icon: '👥', color: '#667eea', bgColor: '#e8ecff' },
    { title: 'Departments', value: 0, icon: '🏢', color: '#f39c12', bgColor: '#fef5e7' },
    { title: 'Active Today', value: 0, icon: '✅', color: '#27ae60', bgColor: '#e8f8f0' }
  ];

  recentActivities: RecentActivity[] = [
    { id: 1, action: 'Employee added:', employee: 'Naimur Rahamna', time: '2 hours ago', type: 'add' },
    { id: 2, action: 'Employee updated:', employee: 'Hasan Ahmed', time: '4 hours ago', type: 'edit' },
    { id: 3, action: 'Employee added:', employee: 'Safayet Rafi', time: '1 day ago', type: 'add' },
    { id: 4, action: 'Employee removed:', employee: 'Naim Intisar', time: '2 days ago', type: 'delete' }
  ];

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.stats[0].value = 1;
    this.stats[1].value = 2;
    this.stats[2].value = 3;
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'add': return '➕';
      case 'edit': return '✏';
      case 'delete': return '🗑';
      default: return '📌';
    }
  }

  navigateTo(section: string): void {
    console.log(`Navigate to ${section}`);
    // TODO: Implement navigation
  }

  addNewEmployee(): void {
    console.log('Add new employee');
    // TODO: Implement add employee
  }

  viewReports(): void {
    console.log('View reports');
    // TODO: Implement reports view
  }
}
