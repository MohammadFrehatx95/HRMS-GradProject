import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/positions';

  getPositions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPositionsByDepartment(deptId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/department/${deptId}`);
  }

  createPosition(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updatePosition(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deletePosition(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
