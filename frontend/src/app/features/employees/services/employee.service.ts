import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee, EmployeeResponse, SingleEmployeeResponse } from '../models/employee.model';
import { API_ENDPOINTS } from '../../../../app/core/config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<EmployeeResponse>(API_ENDPOINTS.EMPLOYEES.BASE).pipe(
      map(response => {
        const employees = response?.data?.employees ?? [];
        return employees;
      })
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<SingleEmployeeResponse>(API_ENDPOINTS.EMPLOYEES.BY_ID(id)).pipe(
      map(response => response?.data)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_ENDPOINTS.EMPLOYEES.BASE, employee);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(API_ENDPOINTS.EMPLOYEES.BY_ID(id), employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
  }


  searchEmployees(searchTerm: string): Observable<Employee[]> {
    const params = new HttpParams().set('term', searchTerm);
    return this.http.get<Employee[]>(API_ENDPOINTS.EMPLOYEES.SEARCH, { params });
  }

  getEmployeesByDepartment(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_ENDPOINTS.EMPLOYEES.BY_DEPARTMENT(departmentId));
  }

  uploadEmployeePhoto(id: string, file: File): Observable<{ message: string; photoUrl: string }> {
    const url = API_ENDPOINTS.EMPLOYEES.UPLOAD_PHOTO(id);
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.post<{ message: string; photoUrl: string }>(url, formData);
  }
}
