import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/attendance';

  getAttendanceRecords(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7204/api/attendance').pipe(
      map((response) => {
        if (Array.isArray(response)) return response;
        if (response && response.data) return response.data;
        return [];
      }),
    );
  }
}
