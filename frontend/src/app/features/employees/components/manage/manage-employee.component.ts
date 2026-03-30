import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, DeleteConfirmationModalComponent],
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;
  showDeleteModal: boolean = false;
  employeeToDelete: { id: string; name: string } | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;
    console.log('Loading started, isLoading:', this.isLoading);

    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('Data received in component:', data);
        console.log('Is data an array?', Array.isArray(data));
        this.employees = data;
        console.log('Employees loaded:', this.employees);
        this.filteredEmployees = [...this.employees];
        this.updatePagination();
        this.isLoading = false;
        console.log('Loading completed, isLoading:', this.isLoading, 'filteredEmployees:', this.filteredEmployees);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.error = 'Failed to load employees. Please try again later.';
        this.isLoading = false;
        console.log('Error occurred, isLoading:', this.isLoading, 'error:', this.error);
      }
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.fullName.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term) ||
        employee.officeEmail.toLowerCase().includes(term) ||
        employee.designation.toLowerCase().includes(term) ||
        employee.contactNumber.includes(term) ||
        employee.organization.toLowerCase().includes(term) ||
        employee.branch.toLowerCase().includes(term) ||
        employee.campus.toLowerCase().includes(term)
      );

    }

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    this.pageNumbers = [];

    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }

  get paginatedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  addNewEmployee(): void {
    console.log('Add new employee clicked');
    this.router.navigate(['/admin'], { queryParams: { section: 'add' } });
  }

  viewEmployee(id: string): void {
    console.log(`View employee ${id}`);
    this.router.navigate(['/employees', id, 'view']);
  }

  editEmployee(id: string): void {
    console.log(`Edit employee ${id}`);
    this.router.navigate(['/employees', id, 'edit']);
  }

  openDeleteModal(id: string, name: string): void {
    this.employeeToDelete = { id, name };
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  confirmDelete(): void {
    if (!this.employeeToDelete) return;

    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    this.employeeService.deleteEmployee(this.employeeToDelete.id).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.id !== this.employeeToDelete!.id);
        this.onSearchChange();
        this.isLoading = false;
        this.successMessage = `Employee "${this.employeeToDelete!.name}" deleted successfully!`;
        this.closeDeleteModal();
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.error = 'Failed to delete employee. Please try again.';
        this.isLoading = false;
        setTimeout(() => {
          this.error = null;
        }, 5000);
      }
    });
  }
}
