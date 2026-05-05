import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/positions';

  getPositionsByDepartment(departmentId: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/department/${departmentId}`).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }
}
