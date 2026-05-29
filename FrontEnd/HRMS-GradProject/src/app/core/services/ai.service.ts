import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as signalR from '@microsoft/signalr';

export interface TokenStatsDto {
  usedTokens: number;
  maxTokensPerMinute: number;
  secondsUntilReset: number;
}

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

  private hubConnection: signalR.HubConnection | undefined;
  private tokenStatsSubject = new Subject<TokenStatsDto>();
  public tokenStats$ = this.tokenStatsSubject.asObservable();

  constructor() {
    this.startSignalRConnection();
  }

  private startSignalRConnection() {

    const baseUrl = environment.apiUrl.replace(/\/api$/, '');
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/hubs/ai`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Hub Connection Started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveTokenUpdate', (stats: TokenStatsDto) => {
      this.tokenStatsSubject.next(stats);
    });
  }

  chat(message: string, mode: number = 0, history: ChatMessageDto[] = []): Observable<AiResponseDto> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message, mode, history }).pipe(
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
