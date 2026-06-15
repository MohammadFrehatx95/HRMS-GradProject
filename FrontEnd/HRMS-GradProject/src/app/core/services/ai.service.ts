import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ChatMessageDto {
  role: string;
  content: string;
}

export interface AiChatDto {
  message: string;
  mode?: number;
  history?: ChatMessageDto[];
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

  chat(message: string, mode: number = 0, history: ChatMessageDto[] = []): Observable<AiResponseDto> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message, mode, history }).pipe(
      map((res) => res?.data ?? res)
    );
  }
}
