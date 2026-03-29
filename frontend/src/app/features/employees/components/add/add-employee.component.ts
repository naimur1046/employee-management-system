import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import {
  DEPARTMENTS,
  DESIGNATIONS,
  BLOOD_GROUPS,
  CAMPUSES,
  BRANCHES,
  ORGANIZATIONS
} from '../../models/employee.model';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    id: 0,
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

  departments = DEPARTMENTS;
  designations = DESIGNATIONS;
  bloodGroups = BLOOD_GROUPS;
  campuses = CAMPUSES;
  branches = BRANCHES;
  organizations = ORGANIZATIONS;

  isSubmitting = false;
  showSuccess = false;
  errorMessage = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() employeeAdded = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

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

    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Employee added successfully:', response);
        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.employeeAdded.emit();
          this.showSuccess = false;
          this.resetForm();
        }, 2000);
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message;
      }
    });
  }

  resetForm(): void {
    this.employee = {
      id: 0,
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
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.cancel.emit();
    }
  }
}
