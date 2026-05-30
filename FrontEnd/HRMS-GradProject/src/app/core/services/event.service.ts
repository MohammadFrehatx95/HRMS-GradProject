import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/events`;

  getUpcomingEvents(days: number = 30): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/upcoming?days=${days}`).pipe(
      map(res => res?.data ?? res)
    );
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, eventData);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
