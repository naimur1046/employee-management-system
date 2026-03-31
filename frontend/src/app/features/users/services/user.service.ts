import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User, UserResponse, SingleUserResponse } from '../models/user.model';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<UserResponse>(API_ENDPOINTS.USERS.BASE).pipe(
      map(response => {
        const users = response?.data?.users ?? [];
        return users;
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<SingleUserResponse>(API_ENDPOINTS.USERS.BY_ID(id)).pipe(
      map(response => response?.data)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<SingleUserResponse>(API_ENDPOINTS.USERS.BASE, user).pipe(
      map(response => response?.data)
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<SingleUserResponse>(API_ENDPOINTS.USERS.BY_ID(id), user).pipe(
      map(response => response?.data)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.USERS.BY_ID(id));
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    const params = new HttpParams().set('term', searchTerm);
    return this.http.get<User[]>(API_ENDPOINTS.USERS.SEARCH, { params });
  }
}
