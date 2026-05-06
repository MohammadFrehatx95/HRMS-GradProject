import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
  }
}
