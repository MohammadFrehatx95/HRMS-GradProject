import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PayrollAdjustmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/payroll-adjustments`;

  getAll(pageNumber = 1, pageSize = 10, month?: number, year?: number): Observable<any> {
    let url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    return this.http.get<any>(url).pipe(map(res => res?.data ?? res));
  }

  getByEmployeeId(employeeId: number, pageNumber = 1, pageSize = 10, month?: number, year?: number): Observable<any> {
    let url = `${this.apiUrl}/employee/${employeeId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    return this.http.get<any>(url).pipe(map(res => res?.data ?? res));
  }

  getMyAdjustments(pageNumber = 1, pageSize = 10, month?: number, year?: number): Observable<any> {
    let url = `${this.apiUrl}/my?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    return this.http.get<any>(url).pipe(map(res => res?.data ?? res));
  }

  create(adjustment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, adjustment);
  }

  createBulk(adjustment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bulk`, adjustment);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
