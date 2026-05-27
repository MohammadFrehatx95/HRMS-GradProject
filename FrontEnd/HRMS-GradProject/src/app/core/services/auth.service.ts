import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // شغل التوثيق
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response?.data?.token) {
          localStorage.setItem('jwt_token', response.data.token);

          if (response.data.role)
            localStorage.setItem('user_role', response.data.role);
          if (response.data.username)
            localStorage.setItem('user_name', response.data.username);
          if (response.data.email)
            localStorage.setItem('user_email', response.data.email);
          if (response.data.profilePictureUrl)
            localStorage.setItem('user_profile_pic', response.data.profilePictureUrl);
        }
      }),
    );
  }

  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  changePassword(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, payload);
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      map((response) => {
        if (response && response.data) {
          if (response.data.profilePictureUrl) {
             localStorage.setItem('user_profile_pic', response.data.profilePictureUrl);
          }
          return response.data;
        }
        return response;
      }),
    );
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    // NOTE: Now uploads as PENDING — awaiting HR/Admin approval
    return this.http.post<any>(`${this.apiUrl}/upload-profile-picture`, formData);
  }

  getPendingProfilePictures(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pending-profile-pictures`).pipe(
      map((res) => res?.data ?? res)
    );
  }

  approveProfilePicture(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/approve-profile-picture/${userId}`, {});
  }

  rejectProfilePicture(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reject-profile-picture/${userId}`, {});
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    if (!token) return false;

    try {
      const parts = token.split('.');
      if (parts.length < 2) return false;

      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp;
      if (!exp) return true;

      // exp بالثواني، Date.now() بالمللي ثانية
      if (Date.now() >= exp * 1000) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      // توكن فاسد
      this.logout();
      return false;
    }
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isHR(): boolean {
    return this.hasRole('hr');
  }

  // admin أو hr عندهم نفس الصلاحيات لبعض الأشياء
  isAdminOrHR(): boolean {
    return this.hasRole('admin') || this.hasRole('hr');
  }

  private hasRole(role: string): boolean {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole =
        payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] ||
        payload['role'] ||
        payload['Role'];

      if (!userRole) return false;

      if (Array.isArray(userRole)) {
        return userRole.some((r) => r.toLowerCase() === role);
      }

      return userRole.toLowerCase() === role;
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_profile_pic');
  }

  getCurrentUserName(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_name') : null;
  }

  getCurrentUserEmail(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_email') : null;
  }

  getCurrentUserProfilePic(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_profile_pic') : null;
  }

  // كل اليوزرات
  getUsers(pageNumber = 1, pageSize = 100): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response?.data ?? response));
  }

  // يوزرات بدون ملف موظف
  getUnassignedEmployeeUsers(pageNumber = 1, pageSize = 100): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/unassigned-employees?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response?.data ?? response));
  }

  // نجيب الـ id من الإيميل
  getUserIdByEmail(email: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/get-user-id-by-email/${encodeURIComponent(email)}`,
      )
      .pipe(map((response) => response?.data ?? response));
  }
}

