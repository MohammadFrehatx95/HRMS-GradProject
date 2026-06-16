import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/leaves`;

  getMyLeaves(
    month?: number,
    year?: number,
    pageNumber: number = 1,
    pageSize: number = 10,
    searchQuery: string = '',
    status?: number | string,
    leaveType?: number | string,
  ): Observable<{ items: any[]; totalCount: number }> {
    let url = `${this.apiUrl}/my?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    if (status !== undefined && status !== '') url += `&status=${status}`;
    if (leaveType !== undefined && leaveType !== '')
      url += `&leaveType=${leaveType}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.data) {
          return {
            items: response.data.items || [],
            totalCount: response.data.totalCount || 0,
          };
        }
        return { items: [], totalCount: 0 };
      }),
    );
  }

  applyLeave(payload: any | FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  getAllLeaves(
    month?: number,
    year?: number,
    pageNumber: number = 1,
    pageSize: number = 10,
    searchQuery: string = '',
    status?: number | string,
    leaveType?: number | string,
  ): Observable<{ items: any[]; totalCount: number }> {
    let url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    if (status !== undefined && status !== '') url += `&status=${status}`;
    if (leaveType !== undefined && leaveType !== '')
      url += `&leaveType=${leaveType}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.data) {
          return {
            items: response.data.items || [],
            totalCount: response.data.totalCount || 0,
          };
        }
        return { items: [], totalCount: 0 };
      }),
    );
  }

  getLeaveById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateLeaveStatus(
    id: number,
    status: string | number,
    rejectionReason?: string,
  ): Observable<any> {
    const payload: any = { status: Number(status) };
    if (rejectionReason) {
      payload.rejectionReason = rejectionReason;
    }
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, payload);
  }

  deleteLeave(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
