import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee | null = null;
  isLoading: boolean = false;
  error: string | null = null;

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
      this.error = 'Employee ID not found';
      this.isLoading = false;
    }
  }

  loadEmployee(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.error = 'Failed to load employee details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
