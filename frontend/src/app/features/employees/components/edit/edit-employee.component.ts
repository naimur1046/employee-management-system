import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, DEPARTMENTS, DESIGNATIONS, BLOOD_GROUPS, CAMPUSES, BRANCHES, ORGANIZATIONS, DropdownOption } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = {
    id: '',
    department: '',
    fullName: '',
    contactNumber: '',
    organization: '',
    branch: '',
    campus: '',
    bloodGroup: '',
    officeEmail: '',
    pin: '',
    name: '',
    designation: ''
  };

  departments: DropdownOption[] = DEPARTMENTS;
  designations: DropdownOption[] = DESIGNATIONS;
  bloodGroups: DropdownOption[] = BLOOD_GROUPS;
  campuses: DropdownOption[] = CAMPUSES;
  branches: DropdownOption[] = BRANCHES;
  organizations: DropdownOption[] = ORGANIZATIONS;

  isSubmitting = false;
  showSuccess = false;
  errorMessage = '';
  isLoading = true;

  @Output() cancel = new EventEmitter<void>();
  @Output() employeeUpdated = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(id);
    } else {
      this.errorMessage = 'Employee ID not found';
      this.isLoading = false;
    }
  }

  loadEmployee(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.errorMessage = 'Failed to load employee details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onInputChange(): void {
    this.errorMessage = '';
  }

  validateForm(): boolean {
    if (!this.employee.fullName.trim()) {
      this.errorMessage = 'Full Name is required';
      return false;
    }

    if (!this.employee.contactNumber.trim()) {
      this.errorMessage = 'Contact Number is required';
      return false;
    }

    if (!this.employee.officeEmail.trim()) {
      this.errorMessage = 'Office Email is required';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.employee.officeEmail)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    if (!this.employee.department) {
      this.errorMessage = 'Department is required';
      return false;
    }

    if (!this.employee.designation) {
      this.errorMessage = 'Designation is required';
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

    this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe({
      next: (response) => {
        console.log('Employee updated successfully:', response);
        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.employeeUpdated.emit();
          this.router.navigate(['/employees']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to update employee. Please try again.';
      }
    });
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.router.navigate(['/employees']);
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
