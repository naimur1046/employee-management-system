import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ROLES, USER_STATUS } from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
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
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(id);
    } else {
      this.errorMessage = 'User ID not found';
      this.isLoading = false;
    }
  }

  loadUser(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.errorMessage = 'Failed to load user details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

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

    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to update user. Please try again.';
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
