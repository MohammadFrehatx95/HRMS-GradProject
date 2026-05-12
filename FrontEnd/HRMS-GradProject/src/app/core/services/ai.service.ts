import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://hrms-gradproject.onrender.com/api/AIInsights';

  private insightCache = new Map<string, { data: string, timestamp: number }>();
  private readonly CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes cache

  // page-specific insight — each page gets a different tip
  getPageInsight(page: string, role: 'admin' | 'employee'): Observable<string> {
    const cacheKey = `${page}_${role}`;
    const cached = this.insightCache.get(cacheKey);
    
    // Return cached insight if it's less than 5 minutes old
    if (cached && (Date.now() - cached.timestamp < this.CACHE_DURATION_MS)) {
      return of(cached.data);
    }

    return this.http.get<any>(`${this.apiUrl}/insight/${page}?role=${role}`).pipe(
      map(res => {
        const insightText = res.data || '💡 النظام يعمل بكفاءة.';
        // Save to cache
        this.insightCache.set(cacheKey, { data: insightText, timestamp: Date.now() });
        return insightText;
      }),
      catchError(() => of('💡 عذراً، الذكاء الاصطناعي غير متاح حالياً. يرجى المحاولة لاحقاً.'))
    );
  }

  // Legacy — kept for compatibility (dashboard still works if called directly)
  getAdminInsight(): Observable<string> {
    return this.getPageInsight('dashboard', 'admin');
  }

  getEmployeeInsight(): Observable<string> {
    return this.getPageInsight('dashboard', 'employee');
  }

  sendChatMessage(message: string): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message }).pipe(
      map(res => res.data),
      catchError(() => of('عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي. يرجى المحاولة لاحقاً.'))
    );
  }

  getEmployeeSpecificInsight(employeeId: number): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/employee-insight/${employeeId}`).pipe(
      map(res => res.data || 'لا توجد بيانات كافية للتقييم.'),
      catchError(() => of('حدث خطأ أثناء جلب تقييم الموظف.'))
    );
  }
}

