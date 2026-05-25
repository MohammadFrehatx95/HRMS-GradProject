import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement, CreateAnnouncementDto } from '../models/announcement.model';
import { environment } from '../../../environments/environment';

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = `${environment.apiUrl}/Announcement`;

  constructor(private http: HttpClient) { }

  getAnnouncements(pageNumber: number = 1, pageSize: number = 10): Observable<PaginatedResult<Announcement>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<PaginatedResult<Announcement>>(this.apiUrl, { params });
  }

  createAnnouncement(dto: CreateAnnouncementDto): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, dto);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
