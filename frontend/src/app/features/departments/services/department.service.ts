import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Department, DepartmentResponse, SingleDepartmentResponse } from '../models/department.model';
import { API_ENDPOINTS } from '../../../../app/core/config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<DepartmentResponse>(API_ENDPOINTS.DEPARTMENTS.BASE).pipe(
      map(response => {
        const departments = response?.data?.departments ?? [];
        return departments;
      })
    );
  }

  getDepartmentById(id: string): Observable<Department> {
    return this.http.get<SingleDepartmentResponse>(API_ENDPOINTS.DEPARTMENTS.BY_ID(id)).pipe(
      map(response => response?.data)
    );
  }

  addDepartment(department: Department): Observable<Department> {
    const payload = {
      name: department.name,
      code: department.code,
      description: department.description,
      managerName: department.managerName,
      managerEmail: department.managerEmail,
      location: department.location,
      status: department.status === 'active' ? 'Active' : 'Inactive'
    };
    return this.http.post<SingleDepartmentResponse>(API_ENDPOINTS.DEPARTMENTS.BASE, payload).pipe(
      map(response => response?.data)
    );
  }

  updateDepartment(id: string, department: Department): Observable<Department> {
    const payload = {
      name: department.name,
      code: department.code,
      description: department.description,
      managerName: department.managerName,
      managerEmail: department.managerEmail,
      location: department.location,
      status: department.status === 'active' ? 10 : 20
    };
    return this.http.put<SingleDepartmentResponse>(API_ENDPOINTS.DEPARTMENTS.BY_ID(id), payload).pipe(
      map(response => response?.data)
    );
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.DEPARTMENTS.BY_ID(id));
  }

  searchDepartments(searchTerm: string): Observable<Department[]> {
    const params = new HttpParams().set('term', searchTerm);
    return this.http.get<Department[]>(API_ENDPOINTS.DEPARTMENTS.SEARCH, { params });
  }
}
