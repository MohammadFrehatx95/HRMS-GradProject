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
  private apiUrl = `${environment.apiUrl}/meetings`;

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
    return this.http.get<PagedResult<Meeting>>(`${this.apiUrl}/my`, { params });
  }

  create(dto: CreateMeetingDto): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, dto);
  }

  cancel(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancel`, {});
  }

  complete(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/complete`, {});
  }

  update(id: number, dto: UpdateMeetingDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }
}
