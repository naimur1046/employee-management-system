import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  department: Department = {
    id: '',
    name: '',
    code: '',
    description: '',
    managerName: '',
    managerEmail: '',
    employeeCount: 0,
    location: '',
    status: 'active',
    createdAt: '',
    updatedAt: ''
  };

  isSubmitting = false;
  showSuccess = false;
  errorMessage = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() departmentAdded = new EventEmitter<void>();

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  onInputChange(): void {
    this.errorMessage = '';
  }

  validateForm(): boolean {
    if (!this.department.name.trim()) {
      this.errorMessage = 'Department Name is required';
      return false;
    }

    if (!this.department.code.trim()) {
      this.errorMessage = 'Department Code is required';
      return false;
    }

    if (!this.department.managerName.trim()) {
      this.errorMessage = 'Manager Name is required';
      return false;
    }

    if (!this.department.managerEmail.trim()) {
      this.errorMessage = 'Manager Email is required';
      return false;
    }

    if (!this.department.location.trim()) {
      this.errorMessage = 'Location is required';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.department.managerEmail)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    return true;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    this.departmentService.addDepartment(this.department).subscribe({
      next: (response) => {
        console.log('Department added successfully:', response);
        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/departments']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error adding department:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to add department. Please try again.';
      }
    });
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.router.navigate(['/departments']);
    }
  }

  goBack(): void {
    this.router.navigate(['/departments']);
  }
}
