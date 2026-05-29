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

  getMyLeaves(month?: number, year?: number): Observable<any[]> {
    let url = `${this.apiUrl}/my?pageNumber=1&pageSize=1000`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    return this.http
      .get<any>(url)
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  applyLeave(payload: any | FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  getAllLeaves(month?: number, year?: number): Observable<any[]> {
    let url = `${this.apiUrl}?pageNumber=1&pageSize=1000`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
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

