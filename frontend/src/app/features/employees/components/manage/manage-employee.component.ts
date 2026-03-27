import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';

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

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = [
      {
        id: 1,
        department: 'Computer Science',
        fullName: 'John Doe',
        contactNumber: '+1234567890',
        organization: 'Tech University',
        branch: 'Main Campus',
        campus: 'North',
        bloodGroup: 'A+',
        officeEmail: 'john.doe@university.edu',
        pin: '1234',
        name: 'John',
        designation: 'Senior Professor'
      },
      {
        id: 2,
        department: 'Electrical Engineering',
        fullName: 'Jane Smith',
        contactNumber: '+1234567891',
        organization: 'Tech University',
        branch: 'Main Campus',
        campus: 'South',
        bloodGroup: 'B+',
        officeEmail: 'jane.smith@university.edu',
        pin: '5678',
        name: 'Jane',
        designation: 'Associate Professor'
      },
      {
        id: 3,
        department: 'Mechanical Engineering',
        fullName: 'Bob Wilson',
        contactNumber: '+1234567892',
        organization: 'Tech University',
        branch: 'East Campus',
        campus: 'East',
        bloodGroup: 'O+',
        officeEmail: 'bob.wilson@university.edu',
        pin: '9012',
        name: 'Bob',
        designation: 'Assistant Professor'
      },
      {
        id: 4,
        department: 'Civil Engineering',
        fullName: 'Alice Brown',
        contactNumber: '+1234567893',
        organization: 'Tech University',
        branch: 'West Campus',
        campus: 'West',
        bloodGroup: 'AB+',
        officeEmail: 'alice.brown@university.edu',
        pin: '3456',
        name: 'Alice',
        designation: 'Senior Lecturer'
      },
      {
        id: 5,
        department: 'Mathematics',
        fullName: 'Charlie Davis',
        contactNumber: '+1234567894',
        organization: 'Tech University',
        branch: 'Main Campus',
        campus: 'North',
        bloodGroup: 'A-',
        officeEmail: 'charlie.davis@university.edu',
        pin: '7890',
        name: 'Charlie',
        designation: 'Lecturer'
      }
    ];
    
    this.filteredEmployees = [...this.employees];
    this.updatePagination();
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
    // TODO: Navigate to add employee page or open modal
  }

  viewEmployee(id: number): void {
    console.log(`View employee ${id}`);
    // TODO: Implement view functionality
  }

  editEmployee(id: number): void {
    console.log(`Edit employee ${id}`);
    // TODO: Navigate to edit employee page or open modal
  }

  deleteEmployee(id: number): void {
    console.log(`Delete employee ${id}`);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(e => e.id !== id);
      this.onSearchChange();
    }
  }
}
