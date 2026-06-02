import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/employees`;

  getEmployees(pageNumber: number = 1, pageSize: number = 10, searchQuery: string = '', departmentId?: number | string, isActive?: boolean | string): Observable<{items: any[], totalCount: number}> {
    let url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    if (departmentId) url += `&departmentId=${departmentId}`;
    if (isActive !== undefined && isActive !== '') url += `&isActive=${isActive}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.data) {
          return {
            items: response.data.items || [],
            totalCount: response.data.totalCount || 0
          };
        }
        return { items: [], totalCount: 0 };
      }),
    );
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }
  
  getEmployeeFullProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/profile`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }

  getMyProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
