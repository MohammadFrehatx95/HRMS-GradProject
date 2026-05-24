import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface AiChatDto {
  message: string;
}

export interface AiResponseDto {
  reply: string;
  model: string;
  tokens: number;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ai`;

  chat(message: string): Observable<AiResponseDto> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message }).pipe(
      map((res) => res?.data ?? res)
    );
  }

  analyzeLeave(): Observable<AiResponseDto> {
    return this.http.get<any>(`${this.apiUrl}/analyze-leave`).pipe(
      map((res) => res?.data ?? res)
    );
  }

  salaryInsight(): Observable<AiResponseDto> {
    return this.http.get<any>(`${this.apiUrl}/salary-insight`).pipe(
      map((res) => res?.data ?? res)
    );
  }
}
