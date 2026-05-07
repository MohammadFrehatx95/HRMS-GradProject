import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/auth';

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.data && response.data.token) {
          localStorage.setItem('jwt_token', response.data.token);
          localStorage.setItem('user_role', response.data.role);
          localStorage.setItem('user_name', response.data.username);
        }
      }),
    );
  }

  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isAdmin(): boolean {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      console.log('🔥 No token found in localStorage!');
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // 1. هذا السطر سيطبع محتوى التوكن بالكامل لكي نراه
      console.log('🔥 Decoded Token Payload:', payload);

      const userRole =
        payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] ||
        payload['role'] ||
        payload['Role'];

      // 2. هذا السطر سيطبع الصلاحية التي استخرجناها
      console.log('🔥 Extracted Role:', userRole);

      if (!userRole) return false;

      if (Array.isArray(userRole)) {
        return userRole.some((r) => r.toLowerCase() === 'admin');
      }

      return userRole.toLowerCase() === 'admin';
    } catch (error) {
      console.error('🔥 Error decoding token:', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
  }
}
