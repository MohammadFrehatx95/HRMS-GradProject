import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7204/api/notifications';

  getNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/read`, {});
  }

  markAllAsRead(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/read-all`, {});
  }
}
