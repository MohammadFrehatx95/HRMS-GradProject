import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/salaries';

  getAllSalaries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMySalaries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/my`);
  }

  createSalary(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
