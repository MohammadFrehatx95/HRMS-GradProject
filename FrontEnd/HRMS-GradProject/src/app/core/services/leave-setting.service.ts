import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LeaveSetting {
  resetMonth: number;
  resetDay: number;
  defaultAnnualLeave: number;
  defaultSickLeave: number;
  defaultEmergencyLeave: number;
  lastResetDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveSettingService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/leavesettings`;

  getSettings(): Observable<LeaveSetting> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }

  updateSettings(settings: LeaveSetting): Observable<any> {
    return this.http.put<any>(this.apiUrl, settings);
  }
}
