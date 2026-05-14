import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  // شغل المسميات
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/positions`;

  getPositions(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getPositionsByDepartment(deptId: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/department/${deptId}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getPositionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
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

