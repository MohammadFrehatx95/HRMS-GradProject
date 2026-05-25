import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PayrollAdjustmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/payroll-adjustments`;

  getAll(pageNumber = 1, pageSize = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map(res => res?.data ?? res));
  }

  getByEmployeeId(employeeId: number, pageNumber = 1, pageSize = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employee/${employeeId}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map(res => res?.data ?? res));
  }

  create(adjustment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, adjustment);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
