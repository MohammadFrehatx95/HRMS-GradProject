import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/leaves';

  getMyLeaves(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/my`);
  }

  applyLeave(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  getAllLeaves(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateLeaveStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });
  }
}
