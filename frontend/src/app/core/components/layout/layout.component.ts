import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  activeSection: string = 'dashboard';

  sections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'employees', name: 'Employees' },
    { id: 'departments', name: 'Departments' },
    { id: 'settings', name: 'Settings' }
  ];

  sectionIcons: { [key: string]: string } = {
    dashboard: 'dashboard',
    employees: 'people',
    departments: 'business',
    settings: 'settings'
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveSection();
      });
  }

  getSectionIcon(sectionId: string): string {
    return this.sectionIcons[sectionId] || 'circle';
  }

  updateActiveSection(): void {
    const url = this.router.url;
    if (url.includes('/employees')) {
      this.activeSection = 'employees';
    } else if (url.includes('/departments')) {
      this.activeSection = 'departments';
    } else if (url.includes('/admin')) {
      if (url.includes('section=employees')) {
        this.activeSection = 'employees';
      } else {
        this.activeSection = 'dashboard';
      }
    }
  }

  selectSection(sectionId: string): void {
    this.activeSection = sectionId;

    switch(sectionId) {
      case 'dashboard':
        this.router.navigate(['/admin']);
        break;
      case 'employees':
        this.router.navigate(['/employees']);
        break;
      case 'departments':
        this.router.navigate(['/departments']);
        break;
      case 'settings':
        // Navigate to settings when implemented
        break;
    }
  }

  logout(): void {
    // TODO: Implement logout logic
    this.router.navigate(['/auth/login']);
  }
}
