import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/employees';

  private getHeaders() {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map((response) => {
        return response.success ? response.data : [];
      }),
    );
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.apiUrl, employee, {
      headers: this.getHeaders(),
    });
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
