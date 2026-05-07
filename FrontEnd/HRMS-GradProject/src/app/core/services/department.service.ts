import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/departments';

  getDepartments(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7204/api/departments').pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  addDepartment(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
