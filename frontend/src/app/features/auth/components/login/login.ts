import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, LoginRequest } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      this.isLoading = true;

      const loginData: LoginRequest = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = response.message || 'Login successful!';
            this.loginForm.reset();
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 2000);
          } else {
            this.errorMessage = response.message || 'Login failed!';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error in login!';
          console.error('Login error:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/auth/register']);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
