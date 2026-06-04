import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/salaries`;

  getAllSalaries(month?: number, year?: number, pageNumber: number = 1, pageSize: number = 10, searchQuery: string = ''): Observable<{items: any[], totalCount: number}> {
    let url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
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

  getMySalaries(month?: number, year?: number, pageNumber: number = 1, pageSize: number = 10, searchQuery: string = ''): Observable<{items: any[], totalCount: number}> {
    let url = `${this.apiUrl}/my?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
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

  getSalaryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  createSalary(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updateSalary(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deleteSalary(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  generateBatch(month: number, year: number, departmentId?: number | null, excludedEmployeeIds: number[] = []): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate-batch`, { month, year, departmentId, excludedEmployeeIds });
  }

  previewBatch(month: number, year: number, departmentId?: number | null): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/preview-batch`, { month, year, departmentId });
  }

  markAsPaid(month: number, year: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/mark-paid`, { month, year });
  }

  approveSalary(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/approve`, {});
  }
}

