import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  @Output() addNew = new EventEmitter<void>();

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
    this.addNew.emit();
  }

  viewEmployee(id: string): void {
    console.log(`View employee ${id}`);
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: string): void {
    console.log(`Edit employee ${id}`);
    // TODO: Navigate to edit employee page or open modal
  }

  deleteEmployee(id: string): void {
    console.log(`Delete employee ${id}`);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.isLoading = true;
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(e => e.id !== id);
          this.onSearchChange();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.error = 'Failed to delete employee. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }
}
