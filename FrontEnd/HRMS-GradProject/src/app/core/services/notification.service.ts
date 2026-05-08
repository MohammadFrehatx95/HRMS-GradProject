import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7204/api/notifications';

  getNotifications(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/unread-count`).pipe(
      map((response) => {
        if (response && response.data !== undefined) return response.data;
        return response;
      }),
    );
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/read`, {});
  }

  markAllAsRead(): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/read-all`, {});
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
