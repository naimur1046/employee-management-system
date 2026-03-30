import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-manage-department',
  standalone: true,
  imports: [CommonModule, FormsModule, DeleteConfirmationModalComponent],
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.css']
})
export class ManageDepartmentComponent implements OnInit {
  departments: Department[] = [];
  filteredDepartments: Department[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;
  showDeleteModal: boolean = false;
  departmentToDelete: { id: string; name: string } | null = null;

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.filteredDepartments = [...this.departments];
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.error = 'Failed to load departments. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      this.filteredDepartments = [...this.departments];
    } else {
      this.filteredDepartments = this.departments.filter(dept =>
        dept.name.toLowerCase().includes(term) ||
        dept.code.toLowerCase().includes(term) ||
        dept.location.toLowerCase().includes(term) ||
        dept.managerName.toLowerCase().includes(term) ||
        dept.managerEmail.toLowerCase().includes(term) ||
        dept.description.toLowerCase().includes(term)
      );
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredDepartments.length / this.pageSize);
    this.pageNumbers = [];

    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }

  get paginatedDepartments(): Department[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredDepartments.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  addNewDepartment(): void {
    this.router.navigate(['/departments', 'add']);
  }

  viewDepartment(id: string): void {
    this.router.navigate(['/departments', id, 'view']);
  }

  editDepartment(id: string): void {
    this.router.navigate(['/departments', id, 'edit']);
  }

  openDeleteModal(id: string, name: string): void {
    this.departmentToDelete = { id, name };
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.departmentToDelete = null;
  }

  confirmDelete(): void {
    if (!this.departmentToDelete) return;

    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    this.departmentService.deleteDepartment(this.departmentToDelete.id).subscribe({
      next: () => {
        this.departments = this.departments.filter(d => d.id !== this.departmentToDelete!.id);
        this.onSearchChange();
        this.isLoading = false;
        this.successMessage = `Department "${this.departmentToDelete!.name}" deleted successfully!`;
        this.closeDeleteModal();
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (error) => {
        console.error('Error deleting department:', error);
        this.error = 'Failed to delete department. Please try again.';
        this.isLoading = false;
        setTimeout(() => {
          this.error = null;
        }, 5000);
      }
    });
  }
}
