import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/attendance`;

  getAllAttendance(date?: string, pageNumber: number = 1, pageSize: number = 10, searchQuery: string = '', status: string = ''): Observable<{items: any[], totalCount: number}> {
    let url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (date) url += `&date=${date}`;
    if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    if (status) url += `&status=${status}`;
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

  getMyAttendance(date?: string, pageNumber: number = 1, pageSize: number = 10, searchQuery: string = '', status: string = ''): Observable<{items: any[], totalCount: number}> {
    let url = `${this.apiUrl}/my?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (date) url += `&date=${date}`;
    if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    if (status) url += `&status=${status}`;
    return this.http
      .get<any>(url)
      .pipe(
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

  clockIn(payload: { date: string; clockIn: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/clockin`, payload);
  }

  clockOut(payload: { clockOut: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/clockout`, payload);
  }

  getAttendanceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  getAttendanceSettings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/settings`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      })
    );
  }
}
