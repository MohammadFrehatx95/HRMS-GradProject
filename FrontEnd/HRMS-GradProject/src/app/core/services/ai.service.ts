import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/AIInsights';

  /** Page-aware insight — calls /api/AIInsights/insight/{page}?role=admin|employee */
  getPageInsight(page: string, role: 'admin' | 'employee'): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/insight/${page}?role=${role}`).pipe(
      map(res => res.data || '💡 النظام يعمل بكفاءة.'),
      catchError(() => of('💡 تأكد من تشغيل السيرفر للحصول على تحليل ذكي.'))
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
