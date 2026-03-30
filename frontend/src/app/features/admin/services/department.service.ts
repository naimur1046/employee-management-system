import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../app/core/config/api-endpoints';

export interface Department {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(API_ENDPOINTS.DEPARTMENTS.BASE);
  }

  getDepartmentById(id: string): Observable<Department> {
    return this.http.get<Department>(API_ENDPOINTS.DEPARTMENTS.BY_ID(id));
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(API_ENDPOINTS.DEPARTMENTS.BASE, department);
  }

  updateDepartment(id: string, department: Department): Observable<Department> {
    return this.http.put<Department>(API_ENDPOINTS.DEPARTMENTS.BY_ID(id), department);
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.DEPARTMENTS.BY_ID(id));
  }

  getDepartmentWithEmployees(id: string): Observable<Department & { employees: any[] }> {
    return this.http.get<Department & { employees: any[] }>(
      API_ENDPOINTS.DEPARTMENTS.WITH_EMPLOYEES(id)
    );
  }
}
