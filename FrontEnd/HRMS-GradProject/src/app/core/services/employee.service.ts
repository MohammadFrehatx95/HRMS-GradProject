import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => (response.success ? response.data : [])));
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
