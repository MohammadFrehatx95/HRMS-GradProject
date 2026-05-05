import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/leaves';

  getLeaves(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7204/api/leaves').pipe(
      map((response) => {
        if (Array.isArray(response)) return response;
        if (response && response.data) return response.data;
        return [];
      }),
    );
  }

  updateLeaveStatus(id: number, newStatus: string): Observable<any> {
    return this.http.put(`https://localhost:7204/api/leaves/${id}/status`, {
      status: newStatus,
    });
  }
}
