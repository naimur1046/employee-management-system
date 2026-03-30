import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
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
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDepartment(id);
    } else {
      this.errorMessage = 'Department ID not found';
      this.isLoading = false;
    }
  }

  loadDepartment(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.departmentService.getDepartmentById(id).subscribe({
      next: (data) => {
        this.department = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading department:', error);
        this.errorMessage = 'Failed to load department details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

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

    this.departmentService.updateDepartment(this.department.id, this.department).subscribe({
      next: (response) => {
        console.log('Department updated successfully:', response);
        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/departments']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error updating department:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to update department. Please try again.';
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
