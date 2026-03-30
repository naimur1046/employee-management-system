import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-view-department',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  department: Department | null = null;
  isLoading: boolean = false;
  error: string | null = null;

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
      this.error = 'Department ID not found';
      this.isLoading = false;
    }
  }

  loadDepartment(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.departmentService.getDepartmentById(id).subscribe({
      next: (data) => {
        this.department = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading department:', error);
        this.error = 'Failed to load department details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/departments']);
  }

  editDepartment(): void {
    if (this.department) {
      this.router.navigate(['/departments', this.department.id, 'edit']);
    }
  }
}
