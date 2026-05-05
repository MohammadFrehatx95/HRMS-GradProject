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
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  applyLeave(leaveData: any): Observable<any> {
    return this.http.post(this.apiUrl, leaveData);
  }

  updateLeaveStatus(
    id: number,
    status: 'Approved' | 'Rejected',
    reason: string = '',
  ): Observable<any> {
    const url = `${this.apiUrl}/${id}/status`;
    const body = {
      status: status,
      rejectionReason: reason,
    };
    return this.http.put(url, body);
  }
}
