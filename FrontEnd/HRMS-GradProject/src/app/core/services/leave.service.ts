import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/leaves';

  getLeaves(): Observable<any[]> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => (response.success ? response.data : [])));
  }
}
