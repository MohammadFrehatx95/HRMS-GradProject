import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting, CreateMeetingDto, UpdateMeetingDto, MeetingStatus } from '../models/meeting.model';
import { environment } from '../../../environments/environment';
import { PagedResult } from '../models/paged-result.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = `${environment.apiUrl}/Meeting`;

  constructor(private http: HttpClient) { }

  getAll(pageNumber: number = 1, pageSize: number = 10): Observable<PagedResult<Meeting>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResult<Meeting>>(this.apiUrl, { params });
  }

  getMyMeetings(pageNumber: number = 1, pageSize: number = 10): Observable<PagedResult<Meeting>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResult<Meeting>>(`${this.apiUrl}/my-meetings`, { params });
  }

  create(dto: CreateMeetingDto): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, dto);
  }

  updateStatus(id: number, status: MeetingStatus): Observable<void> {
    const dto: UpdateMeetingDto = {
        status: status,
        title: '',
        description: '',
        meetingDate: new Date().toISOString()
    };
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
