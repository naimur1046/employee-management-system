import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ROLES, USER_STATUS } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'User',
    status: 'active',
    createdAt: '',
    updatedAt: ''
  };

  roles = ROLES;
  statuses = USER_STATUS;

  isSubmitting = false;
  showSuccess = false;
  errorMessage = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onInputChange(): void {
    this.errorMessage = '';
  }

  validateForm(): boolean {
    if (!this.user.name.trim()) {
      this.errorMessage = 'Name is required';
      return false;
    }

    if (!this.user.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    if (!this.user.password.trim()) {
      this.errorMessage = 'Password is required';
      return false;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return false;
    }

    if (!this.user.mobileNumber.trim()) {
      this.errorMessage = 'Mobile Number is required';
      return false;
    }

    if (!this.user.role) {
      this.errorMessage = 'Role is required';
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

    this.userService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('User added successfully:', response);
        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error adding user:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to add user. Please try again.';
      }
    });
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.router.navigate(['/users']);
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
