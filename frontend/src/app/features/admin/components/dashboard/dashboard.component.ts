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
    { title: 'Active Today', value: 0, icon: '✅', color: '#27ae60', bgColor: '#e8f8f0' },
    { title: 'Pending Actions', value: 0, icon: '⏳', color: '#e74c3c', bgColor: '#fdeaea' }
  ];

  recentActivities: RecentActivity[] = [
    { id: 1, action: 'Employee added:', employee: 'John Doe', time: '2 hours ago', type: 'add' },
    { id: 2, action: 'Employee updated:', employee: 'Jane Smith', time: '4 hours ago', type: 'edit' },
    { id: 3, action: 'Employee added:', employee: 'Bob Wilson', time: '1 day ago', type: 'add' },
    { id: 4, action: 'Employee removed:', employee: 'Alice Brown', time: '2 days ago', type: 'delete' }
  ];

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    // Mock data - Replace with actual API calls
    this.stats[0].value = 150; // Total Employees
    this.stats[1].value = 8;   // Departments
    this.stats[2].value = 142; // Active Today
    this.stats[3].value = 5;   // Pending Actions
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
