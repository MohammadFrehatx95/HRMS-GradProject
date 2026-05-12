import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
        if (response && response.data) return response.data;
        return response;
      }),
    );
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
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
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
  }

  // كل اليوزرات
  getUsers(pageNumber = 1, pageSize = 100): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(map((response) => response?.data ?? response));
  }

  // يوزرات بدون ملف موظف
  getUnassignedEmployeeUsers(pageNumber = 1, pageSize = 100): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/unassigned-employees?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(map((response) => response?.data ?? response));
  }

  // نجيب الـ id من الإيميل
  getUserIdByEmail(email: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/get-user-id-by-email/${encodeURIComponent(email)}`)
      .pipe(map((response) => response?.data ?? response));
  }
}

