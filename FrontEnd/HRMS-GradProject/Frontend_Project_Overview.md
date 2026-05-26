# HRMS Frontend Project

## Project Structure

```text
Folder PATH listing for volume New Volume
Volume serial number is 8A82-F2A5
D:\PROJECTS\HRMS-TEAM\FRONTEND\HRMS-GRADPROJECT\SRC
|   index.html
|   main.ts
|   styles.css
|   _redirects
|   
+---app
|   |   app.component.css
|   |   app.component.html
|   |   app.component.ts
|   |   app.config.ts
|   |   app.routes.ts
|   |   
|   +---core
|   |   +---guards
|   |   |       admin.guard.ts
|   |   |       auth.guard.ts
|   |   |       hr.guard.ts
|   |   |       
|   |   +---i18n
|   |   |       translations.ts
|   |   |       
|   |   +---interceptors
|   |   |       auth.interceptor.ts
|   |   |       
|   |   +---models
|   |   |       announcement.model.ts
|   |   |       meeting.model.ts
|   |   |       paged-result.model.ts
|   |   |       payroll-adjustment.model.ts
|   |   |       
|   |   +---pipes
|   |   |       translate.pipe.ts
|   |   |       
|   |   +---services
|   |   |       ai.service.ts
|   |   |       announcement.service.ts
|   |   |       attendance.service.ts
|   |   |       auth.service.ts
|   |   |       department.service.ts
|   |   |       employee.service.ts
|   |   |       leave.service.ts
|   |   |       meeting.service.ts
|   |   |       notification.service.ts
|   |   |       payroll-adjustments.service.ts
|   |   |       position.service.ts
|   |   |       pwa.service.ts
|   |   |       salary.service.ts
|   |   |       settings.service.ts
|   |   |       sidebar.service.ts
|   |   |       update.service.ts
|   |   |       
|   |   \---utils
|   |           error-handler.util.ts
|   |           
|   +---features
|   |   +---ai-assistant
|   |   |       ai-assistant.component.css
|   |   |       ai-assistant.component.html
|   |   |       ai-assistant.component.spec.ts
|   |   |       ai-assistant.component.ts
|   |   |       
|   |   +---all-attendance
|   |   |       all-attendance.component.html
|   |   |       all-attendance.component.ts
|   |   |       
|   |   +---attendance
|   |   |       attendance.component.css
|   |   |       attendance.component.html
|   |   |       attendance.component.ts
|   |   |       
|   |   +---auth
|   |   |   +---login
|   |   |   |       login.component.css
|   |   |   |       login.component.html
|   |   |   |       login.component.ts
|   |   |   |       
|   |   |   \---register
|   |   |           register.component.css
|   |   |           register.component.html
|   |   |           register.component.ts
|   |   |           
|   |   +---dashboard
|   |   |       dashboard.component.css
|   |   |       dashboard.component.html
|   |   |       dashboard.component.ts
|   |   |       
|   |   +---departments
|   |   |       departments.component.css
|   |   |       departments.component.html
|   |   |       departments.component.ts
|   |   |       
|   |   +---employee-form
|   |   |       employee-form.component.css
|   |   |       employee-form.component.html
|   |   |       employee-form.component.ts
|   |   |       
|   |   +---employees
|   |   |       employees.component.css
|   |   |       employees.component.html
|   |   |       employees.component.ts
|   |   |       
|   |   +---leave
|   |   |       leave.component.css
|   |   |       leave.component.html
|   |   |       leave.component.ts
|   |   |       
|   |   +---leave-form
|   |   |       leave-form.component.css
|   |   |       leave-form.component.html
|   |   |       leave-form.component.ts
|   |   |       
|   |   +---meetings
|   |   |       meetings.component.css
|   |   |       meetings.component.html
|   |   |       meetings.component.ts
|   |   |       
|   |   +---my-profile
|   |   |       my-profile.component.html
|   |   |       my-profile.component.ts
|   |   |       
|   |   +---payroll-adjustments
|   |   |       payroll-adjustments.component.css
|   |   |       payroll-adjustments.component.html
|   |   |       payroll-adjustments.component.spec.ts
|   |   |       payroll-adjustments.component.ts
|   |   |       
|   |   +---positions
|   |   |       positions.component.css
|   |   |       positions.component.html
|   |   |       positions.component.ts
|   |   |       
|   |   \---salary
|   |           salary.component.css
|   |           salary.component.html
|   |           salary.component.ts
|   |           
|   \---shared
|       +---header
|       |       header.component.css
|       |       header.component.html
|       |       header.component.ts
|       |       
|       \---sidebar
|               sidebar.component.css
|               sidebar.component.html
|               sidebar.component.ts
|               
\---environments
        environment.prod.ts
        environment.ts
        

```

## Source Code


### File: package.json
```json
{
  "name": "hrms-grad-project",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/cdk": "^19.2.19",
    "@angular/common": "^19.2.0",
    "@angular/compiler": "^19.2.0",
    "@angular/core": "^19.2.0",
    "@angular/forms": "^19.2.0",
    "@angular/material": "^19.2.19",
    "@angular/platform-browser": "^19.2.0",
    "@angular/platform-browser-dynamic": "^19.2.0",
    "@angular/router": "^19.2.0",
    "@angular/service-worker": "^19.2.0",
    "@microsoft/signalr": "^10.0.0",
    "@ngx-translate/core": "^17.0.0",
    "@ngx-translate/http-loader": "^17.0.0",
    "bootstrap": "^5.3.8",
    "bootstrap-icons": "^1.13.1",
    "chart.js": "^4.5.1",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.7",
    "rxjs": "~7.8.0",
    "sweetalert2": "^11.26.24",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.2.19",
    "@angular/cli": "^19.2.19",
    "@angular/compiler-cli": "^19.2.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.7.2"
  }
}

```

### File: src\app\app.component.ts
```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SidebarService } from './core/services/sidebar.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { UpdateService } from './core/services/update.service';
import { PwaService } from './core/services/pwa.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authService = inject(AuthService);
  sidebarService = inject(SidebarService);
  updateService = inject(UpdateService);
  pwaService = inject(PwaService);
  router = inject(Router);

  get isAiRoute(): boolean {
    return this.router.url.includes('/ai-assistant');
  }

  get isSidebarHidden() {
    // حالة السايدبار
    return this.sidebarService.isSidebarHidden();
  }

  get isMobileSidebarOpen() {
    // فتح السايدبار بالموبايل
    return this.sidebarService.isMobileSidebarOpen();
  }

  closeMobileSidebar() {
    // إغلاق السايدبار بالموبايل
    this.sidebarService.closeMobileSidebar();
  }
}

```

### File: src\app\app.config.ts
```typescript
import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, inject, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { provideServiceWorker } from '@angular/service-worker';

function initializeApp(authService: AuthService) {
  return () => {
    if (authService.isLoggedIn()) {
      return authService.getMe().pipe(
        catchError(() => {
          authService.logout();
          return of(null);
        })
      );
    }
    return of(null);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    // ضبط الـ providers الرئيسية
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
};

```

### File: src\app\app.routes.ts
```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { LeaveComponent } from './features/leave/leave.component';
import { AttendanceComponent } from './features/attendance/attendance.component';
import { SalaryComponent } from './features/salary/salary.component';
import { EmployeeFormComponent } from './features/employee-form/employee-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { hrGuard } from './core/guards/hr.guard';
import { AllAttendanceComponent } from './features/all-attendance/all-attendance.component';
import { PositionsComponent } from './features/positions/positions.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard, adminGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'meetings',
    loadComponent: () => import('./features/meetings/meetings.component').then(c => c.MeetingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'leave-form',
    loadComponent: () =>
      import('./features/leave-form/leave-form.component').then(
        (m) => m.LeaveFormComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [authGuard, hrGuard],
  },
  // الكل يشوف الإجازات، القبول/الرفض للـ admin وhr فقط
  { path: 'leave', component: LeaveComponent, canActivate: [authGuard] },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'all-attendance',
    component: AllAttendanceComponent,
    canActivate: [authGuard, hrGuard],
  },
  // كل موظف يشوف راتبه، الإضافة والتعديل للـ admin
  { path: 'salary', component: SalaryComponent, canActivate: [authGuard] },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'positions',
    component: PositionsComponent,
    canActivate: [authGuard, hrGuard],
  },
  {
    path: 'my-profile',
    loadComponent: () =>
      import('./features/my-profile/my-profile.component').then(
        (m) => m.MyProfileComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'ai-assistant',
    loadComponent: () =>
      import('./features/ai-assistant/ai-assistant.component').then(
        (m) => m.AiAssistantComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'payroll-adjustments',
    loadComponent: () =>
      import('./features/payroll-adjustments/payroll-adjustments.component').then(
        (m) => m.PayrollAdjustmentsComponent,
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];

```

### File: src\app\core\guards\admin.guard.ts
```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    // الأدمن بس
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied (403)',
      text: 'You do not have permission to access this page.',
      confirmButtonColor: '#dc3545',
    });
    router.navigate(['/dashboard']);
    return false;
  }
};

```

### File: src\app\core\guards\auth.guard.ts
```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// ✅ حماية الصفحات الداخلية — يرجع لللوجين إذا لم يكن مسجل
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// ✅ منع المستخدم المسجل من رؤية صفحة اللوجين — يرجع للداشبورد إذا كان مسجلا
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

```

### File: src\app\core\guards\hr.guard.ts
```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** يسمح فقط لـ Admin أو HR */
export const hrGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdminOrHR()) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};

```

### File: src\app\core\interceptors\auth.interceptor.ts
```typescript
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('/login')) {
    return next(req);
  }

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/login')) {
        // Clear all auth data
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_email');

        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          // Full page reload so sidebar/layout resets cleanly
          window.location.href = '/login';
        });
      }
      return throwError(() => error);
    })
  );
};


```

### File: src\app\core\models\announcement.model.ts
```typescript
export interface Announcement {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    priority: string; // "Normal", "High", "Urgent"
    isGeneral: boolean;
    targetEmployeeIds?: number[];
    expiryDate?: string;
    authorName: string;
    authorId: number;
}

export interface CreateAnnouncementDto {
    title: string;
    content: string;
    priority: string;
    isGeneral: boolean;
    targetEmployeeIds?: number[];
    expiryDate?: string;
}

```

### File: src\app\core\models\meeting.model.ts
```typescript
export enum MeetingStatus {
    Scheduled = 'Scheduled',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export interface Meeting {
    id: number;
    title: string;
    reason: string;
    scheduledAt: string; // ISO date string
    durationMinutes: number;
    meetLink: string;
    employeeId: number;
    employeeName: string;
    organizerId: number;
    organizerName: string;
    status: MeetingStatus | string;
    notes?: string;
    createdAt: string;
}

export interface CreateMeetingDto {
    title: string;
    reason: string;
    scheduledAt: string;
    durationMinutes: number;
    employeeId: number;
    notes?: string;
}

export interface UpdateMeetingDto {
    title?: string;
    reason?: string;
    scheduledAt?: string;
    durationMinutes?: number;
    notes?: string;
}

```

### File: src\app\core\models\paged-result.model.ts
```typescript
export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

```

### File: src\app\core\models\payroll-adjustment.model.ts
```typescript
export enum AdjustmentType {
  Penalty = 0,
  Bonus = 1
}

export interface PayrollAdjustmentDto {
  id: number;
  employeeId: number;
  employeeName: string;
  type: AdjustmentType;
  amount: number;
  reason: string;
  date: string;
  isApplied: boolean;
}

export interface CreatePayrollAdjustmentDto {
  employeeId: number;
  type: AdjustmentType;
  amount: number;
  reason: string;
}

```

### File: src\app\core\pipes\translate.pipe.ts
```typescript
import { Pipe, PipeTransform, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { TRANSLATIONS } from '../i18n/translations';

@Pipe({
  name: 't',
  standalone: true,
  pure: false, // لازم يكون impure حتى يتحدث لما تتغير اللغة
})
export class TranslatePipe implements PipeTransform {
  private settings = inject(SettingsService);

  transform(key: string): string {
    const lang = this.settings.language;
    const entry = TRANSLATIONS[key];
    if (entry) {
      return entry[lang] || entry['en'] || key;
    }
    return key;
  }
}

```

### File: src\app\core\services\ai.service.ts
```typescript
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

export interface AiChatDto {
  message: string;
  mode?: number;
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
    // apiUrl is usually like https://localhost:7198/api
    // Hub URL should be https://localhost:7198/hubs/ai
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

  chat(message: string, mode: number = 0): Observable<AiResponseDto> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message, mode }).pipe(
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

```

### File: src\app\core\services\announcement.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement, CreateAnnouncementDto } from '../models/announcement.model';
import { environment } from '../../../environments/environment';

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = `${environment.apiUrl}/Announcement`;

  constructor(private http: HttpClient) { }

  getAnnouncements(pageNumber: number = 1, pageSize: number = 10): Observable<PaginatedResult<Announcement>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<PaginatedResult<Announcement>>(this.apiUrl, { params });
  }

  createAnnouncement(dto: CreateAnnouncementDto): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, dto);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

```

### File: src\app\core\services\attendance.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  // شغل الحضور
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/attendance`;

  getAllAttendance(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  getMyAttendance(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/my?pageNumber=1&pageSize=1000`)
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  clockIn(payload: { date: string; clockIn: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/clockin`, payload);
  }

  clockOut(payload: { clockOut: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/clockout`, payload);
  }

  getAttendanceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }
}


```

### File: src\app\core\services\auth.service.ts
```typescript
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
  }

  getCurrentUserName(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_name') : null;
  }

  getCurrentUserEmail(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_email') : null;
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


```

### File: src\app\core\services\department.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  // شغل الأقسام
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/departments`;

  getDepartments(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiUrl}?pageNumber=1&pageSize=1000`,
      )
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  addDepartment(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getDepartmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateDepartment(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

```

### File: src\app\core\services\employee.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // شغل الموظفين
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/employees`;

  getEmployees(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items) {
          return response.data.items;
        }
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;

        return [];
      }),
    );
  }
  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }
  getEmployeeFullProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/profile`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  // تفاصيل الموظف
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }

  getMyProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


```

### File: src\app\core\services\leave.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  // شغل الإجازات
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/leaves`;

  getMyLeaves(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/my?pageNumber=1&pageSize=1000`)
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  applyLeave(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  getAllLeaves(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  getLeaveById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateLeaveStatus(
    id: number,
    status: string | number,
    rejectionReason?: string,
  ): Observable<any> {
    const payload: any = { status: Number(status) };
    if (rejectionReason) {
      payload.rejectionReason = rejectionReason;
    }
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, payload);
  }

  deleteLeave(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


```

### File: src\app\core\services\meeting.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting, CreateMeetingDto, UpdateMeetingDto, MeetingStatus } from '../models/meeting.model';
import { environment } from '../../../environments/environment';
import { PagedResult } from '../models/paged-result.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = `${environment.apiUrl}/meetings`; // using /meetings as in backend route

  constructor(private http: HttpClient) { }

  getAll(pageNumber: number = 1, pageSize: number = 10): Observable<PagedResult<Meeting>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResult<Meeting>>(this.apiUrl, { params });
  }

  getMyMeetings(pageNumber: number = 1, pageSize: number = 10): Observable<PagedResult<Meeting>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResult<Meeting>>(`${this.apiUrl}/my`, { params });
  }

  create(dto: CreateMeetingDto): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, dto);
  }

  cancel(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancel`, {});
  }

  complete(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/complete`, {});
  }

  update(id: number, dto: UpdateMeetingDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }
}

```

### File: src\app\core\services\notification.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // شغل التنبيهات
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/notifications`;

  getNotifications(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/unread-count`).pipe(
      map((response) => {
        if (response && response.data !== undefined) return response.data;
        return response;
      }),
    );
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/read`, {});
  }

  markAllAsRead(): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/read-all`, {});
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  deleteAllNotifications(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-all`);
  }
}


```

### File: src\app\core\services\payroll-adjustments.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PayrollAdjustmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/payroll-adjustments`;

  getAll(pageNumber = 1, pageSize = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map(res => res?.data ?? res));
  }

  getByEmployeeId(employeeId: number, pageNumber = 1, pageSize = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employee/${employeeId}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map(res => res?.data ?? res));
  }

  getMyAdjustments(pageNumber = 1, pageSize = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/my?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map(res => res?.data ?? res));
  }

  create(adjustment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, adjustment);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

```

### File: src\app\core\services\position.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  // شغل المسميات
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/positions`;

  getPositions(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getPositionsByDepartment(deptId: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/department/${deptId}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getPositionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  createPosition(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updatePosition(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deletePosition(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


```

### File: src\app\core\services\pwa.service.ts
```typescript
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private deferredPrompt: any = null;

  constructor() {
    this.init();
  }

  private init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });

    // إذا تم تثبيت التطبيق بالفعل
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
    });
  }

  public promptInstall(): void {
    if (this.deferredPrompt) {
      // الـ browser يدعم التثبيت المباشر
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        this.deferredPrompt = null;
      });
    } else if (this.isAlreadyInstalled()) {
      Swal.fire({
        icon: 'info',
        title: 'Already Installed',
        text: 'Kawadir app is already installed on your device!',
        confirmButtonColor: '#0d6efd'
      });
    } else {
      // تعليمات يدوية حسب المتصفح
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      const isChrome = /chrome/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);
      const isEdge = /edg/i.test(navigator.userAgent);
      const isFirefox = /firefox/i.test(navigator.userAgent);

      let instructionsHtml = '';

      if (isIOS) {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>To install on iOS (Safari):</p>
            <ol style="padding-left: 1.2rem;">
              <li>Tap the <b>Share</b> button <span style="font-size:1.2rem;">⎋</span> at the bottom</li>
              <li>Scroll down and tap <b>"Add to Home Screen"</b></li>
              <li>Tap <b>Add</b></li>
            </ol>
          </div>`;
      } else if (isChrome || isEdge) {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>To install on ${isEdge ? 'Edge' : 'Chrome'}:</p>
            <ol style="padding-left: 1.2rem;">
              <li>Click the <b>⋮</b> menu (top-right)</li>
              <li>Click <b>"Install Kawadir..."</b> or <b>"Add to Home Screen"</b></li>
              <li>Click <b>Install</b></li>
            </ol>
          </div>`;
      } else if (isFirefox) {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>Firefox does not fully support PWA install.<br>We recommend using <b>Chrome</b> or <b>Edge</b> to install the app.</p>
          </div>`;
      } else {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>To install the app:</p>
            <ol style="padding-left: 1.2rem;">
              <li>Open the browser <b>menu</b> (⋮ or ☰)</li>
              <li>Look for <b>"Install App"</b> or <b>"Add to Home Screen"</b></li>
            </ol>
          </div>`;
      }

      Swal.fire({
        icon: 'info',
        title: '📲 Install Kawadir',
        html: instructionsHtml,
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#0d6efd',
        width: '420px'
      });
    }
  }

  private isAlreadyInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  // الزر دائماً يظهر الآن
  public get canInstall(): boolean {
    return true;
  }
}

```

### File: src\app\core\services\salary.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  // شغل الرواتب
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/salaries`;

  getAllSalaries(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  getMySalaries(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/my?pageNumber=1&pageSize=1000`)
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  getSalaryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  createSalary(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updateSalary(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deleteSalary(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


```

### File: src\app\core\services\settings.service.ts
```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // إعدادات المستخدم
  // الثيم: dark أو light
  private _isDarkMode = signal(false);
  // اللغة: en أو ar
  private _language = signal<'en' | 'ar'>('en');

  get isDarkMode() {
    return this._isDarkMode();
  }

  get language() {
    return this._language();
  }

  constructor() {
    // استرجع الإعدادات المحفوظة من localStorage
    const savedTheme = localStorage.getItem('hrms_theme');
    const savedLang = localStorage.getItem('hrms_language') as 'en' | 'ar';

    if (savedTheme === 'dark') {
      this._isDarkMode.set(true);
      this.applyTheme(true);
    }

    if (savedLang === 'ar' || savedLang === 'en') {
      this._language.set(savedLang);
      this.applyLanguage(savedLang);
    }
  }

  toggleTheme() {
    const newMode = !this._isDarkMode();
    this._isDarkMode.set(newMode);
    localStorage.setItem('hrms_theme', newMode ? 'dark' : 'light');
    this.applyTheme(newMode);
  }

  toggleLanguage() {
    const newLang = this._language() === 'en' ? 'ar' : 'en';
    this._language.set(newLang);
    localStorage.setItem('hrms_language', newLang);
    this.applyLanguage(newLang);
  }

  private applyTheme(isDark: boolean) {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light',
    );
    document.body.classList.toggle('dark-mode', isDark);
  }

  private applyLanguage(lang: 'en' | 'ar') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}

```

### File: src\app\core\services\sidebar.service.ts
```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // حالة السايدبار
  isSidebarHidden = signal<boolean>(false);
  isMobileSidebarOpen = signal<boolean>(false);

  toggleSidebar() {
    if (window.innerWidth <= 768) {
      this.isMobileSidebarOpen.set(!this.isMobileSidebarOpen());
    } else {
      this.isSidebarHidden.set(!this.isSidebarHidden());
    }
  }

  closeMobileSidebar() {
    if (window.innerWidth <= 768) {
      this.isMobileSidebarOpen.set(false);
    }
  }
}

```

### File: src\app\core\services\update.service.ts
```typescript
import { Injectable, inject, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private updates = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  constructor() {
    this.checkForUpdates();
    this.initUpdateChecker();
  }

  private initUpdateChecker() {
    if (!this.updates.isEnabled) {
      console.log('Service Worker is not enabled.');
      return;
    }

    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true),
    );

    // Poll every 6 hours
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.updates.checkForUpdate();
        console.log(
          updateFound
            ? 'A new version is available.'
            : 'Already on the latest version.',
        );
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  private checkForUpdates() {
    if (!this.updates.isEnabled) {
      return;
    }

    this.updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          this.promptUser();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }

  private promptUser() {
    Swal.fire({
      title: 'Update Available!',
      text: 'A new version of Kawadir HRMS is ready. Please update to get the latest features and fixes.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Update Now',
      cancelButtonText: 'Later',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}

```

### File: src\app\core\utils\error-handler.util.ts
```typescript
// بدل ما تعرض رسائل تقنية من الـ backend، نحولها لشيء مفهوم
export function getFriendlyErrorMessage(
  err: any,
  fallback: string = 'Something went wrong. Please try again later.',
): string {
  const status: number = err?.status ?? 0;
  const rawMessage: string =
    err?.error?.message || err?.error?.title || err?.message || '';

  // مشكلة شبكة أو الـ server مش شغال
  if (
    status === 0 ||
    (err?.name === 'HttpErrorResponse' && !navigator.onLine)
  ) {
    return 'No internet connection. Please check your network and try again.';
  }

  // أخطاء تقنية من الـ DB — المستخدم ما يحتاج يشوفها
  if (
    rawMessage.includes('EADDRNOTALLOWED') ||
    rawMessage.includes('allow_list') ||
    rawMessage.includes('tenant') ||
    rawMessage.includes('XX000') ||
    rawMessage.includes('PGRST') ||
    rawMessage.includes('connection refused') ||
    rawMessage.includes('ECONNREFUSED')
  ) {
    return 'Unable to connect to the server. Please contact support or try again later.';
  }

  if (status === 401) {
    return 'Your session has expired. Please log in again.';
  }

  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (status === 404) {
    return 'The requested resource was not found.';
  }

  if (status === 400) {
    // Check if it's an array of Identity errors directly in the body
    if (Array.isArray(err?.error)) {
      const msgs = err.error.map((e: any) => e.description || e.errorMessage || e).filter((e: any) => typeof e === 'string');
      if (msgs.length > 0) return msgs.join('\n');
    }

    // Check ASP.NET Core Validation Problem Details
    if (err?.error?.errors && typeof err.error.errors === 'object') {
      const errorMessages: string[] = [];
      for (const key in err.error.errors) {
        if (Object.prototype.hasOwnProperty.call(err.error.errors, key)) {
          const messages = err.error.errors[key];
          if (Array.isArray(messages)) {
            errorMessages.push(...messages);
          } else if (typeof messages === 'string') {
            errorMessages.push(messages);
          }
        }
      }
      if (errorMessages.length > 0) {
        return errorMessages.join('\n');
      }
    }

    // لو الرسالة قصيرة ومفهومة نعرضها مباشرة
    if (
      rawMessage &&
      rawMessage.length < 150 &&
      !looksLikeTechError(rawMessage) &&
      rawMessage !== 'One or more validation errors occurred.'
    ) {
      return rawMessage;
    }
    return 'Invalid input. Please check the form and try again.';
  }

  if (status >= 500) {
    return 'A server error occurred. Please try again later.';
  }

  if (
    rawMessage &&
    rawMessage.length < 150 &&
    !looksLikeTechError(rawMessage)
  ) {
    return rawMessage;
  }

  return fallback;
}

// نتحقق إذا كانت الرسالة تقنية وما تصلح للمستخدم
function looksLikeTechError(msg: string): boolean {
  const techPatterns = [
    'XX',
    'PGRST',
    'EADDR',
    'ECONN',
    'stack trace',
    'NullReferenceException',
    'SqlException',
    'DbUpdateException',
    'System.',
    'Microsoft.',
    'allow_list',
    'tenant',
    'Object reference',
    'Unhandled exception',
    'at System',
    'at Microsoft',
  ];
  return techPatterns.some((p) => msg.includes(p));
}

```

### File: src\app\features\ai-assistant\ai-assistant.component.ts
```typescript
import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService, AiResponseDto, TokenStatsDto } from '../../core/services/ai.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  loading?: boolean;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css'],
})
export class AiAssistantComponent implements OnInit, OnDestroy {
  private aiService = inject(AiService);
  private authService = inject(AuthService);

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  aiMode: number = 0; // 0 = Normal, 1 = DeepThink, 2 = Executive
  cooldown: boolean = false;
  cooldownSeconds: number = 0;
  totalTokensUsed: number = 0;
  isAdminOrHR: boolean = false;
  
  tokenStats: TokenStatsDto = { usedTokens: 0, maxTokensPerMinute: 14400, secondsUntilReset: 60 };
  private tokenSub: Subscription | undefined;
  private timerInterval: any;

  readonly MAX_CHARS = 250;
  readonly COOLDOWN_DURATION = 4; // seconds

  quickActions = [
    {
      label: '📊 Analyze My Leaves',
      icon: 'bi-bar-chart-line',
      action: 'analyze-leave',
    },
    {
      label: '💰 Salary Insights',
      icon: 'bi-graph-up-arrow',
      action: 'salary-insight',
    },
    {
      label: '📋 Leave Policy',
      icon: 'bi-journal-text',
      action: 'chat',
      prompt: 'What is the company leave policy?',
    },
    {
      label: '🕐 How to Clock In',
      icon: 'bi-clock',
      action: 'chat',
      prompt: 'How do I clock in and out for attendance?',
    },
  ];

  ngOnInit(): void {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadChat();

    this.tokenSub = this.aiService.tokenStats$.subscribe(stats => {
      this.tokenStats = stats;
    });

    this.timerInterval = setInterval(() => {
      if (this.tokenStats.secondsUntilReset > 0) {
        this.tokenStats.secondsUntilReset--;
      }
    }, 1000);

    // Greeting if no chat history
    if (this.messages.length === 0) {
      this.messages.push({
        role: 'assistant',
        content: "👋 **Hello! I'm HRMS-AI**. How can I help you today?",
        timestamp: new Date(),
      });
      this.saveChat();
    }
  }

  private getChatStorageKey(): string {
    const keyId = this.authService.getCurrentUserEmail() || this.authService.getCurrentUserName() || 'guest';
    return `hrms_ai_chat_${keyId}`;
  }

  private getTokenStorageKey(): string {
    const keyId = this.authService.getCurrentUserEmail() || this.authService.getCurrentUserName() || 'guest';
    return `hrms_ai_tokens_${keyId}`;
  }

  private saveChat(): void {
    localStorage.setItem(this.getChatStorageKey(), JSON.stringify(this.messages));
    localStorage.setItem(this.getTokenStorageKey(), this.totalTokensUsed.toString());
  }

  private loadChat(): void {
    const saved = localStorage.getItem(this.getChatStorageKey());
    const tokens = localStorage.getItem(this.getTokenStorageKey());
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
      } catch (e) {
        this.messages = [];
      }
    }
    if (tokens) {
      this.totalTokensUsed = parseInt(tokens, 10) || 0;
    }
  }

  ngOnDestroy(): void {
    if (this.tokenSub) this.tokenSub.unsubscribe();
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  scrollToBottom(): void {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  get charCount(): number {
    return this.userInput.length;
  }

  get canSend(): boolean {
    return (
      this.userInput.trim().length > 0 &&
      this.userInput.length <= this.MAX_CHARS &&
      !this.isLoading &&
      !this.cooldown
    );
  }

  sendMessage(): void {
    if (!this.canSend) return;
    const text = this.userInput.trim();
    this.userInput = '';
    this.addUserMessage(text);
    this.callChat(text);
  }

  triggerQuickAction(action: any): void {
    if (this.isLoading || this.cooldown) return;

    if (action.action === 'analyze-leave') {
      this.addUserMessage('📊 Analyze my leave history');
      this.addLoadingMessage();
      this.aiService.analyzeLeave().subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => this.handleError(err),
      });
    } else if (action.action === 'salary-insight') {
      this.addUserMessage('💰 Give me salary insights');
      this.addLoadingMessage();
      this.aiService.salaryInsight().subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => this.handleError(err),
      });
    } else if (action.action === 'chat' && action.prompt) {
      this.addUserMessage(action.prompt);
      this.callChat(action.prompt);
    }
  }

  private callChat(text: string): void {
    this.addLoadingMessage();
    this.aiService.chat(text, this.aiMode).subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => this.handleError(err),
    });
  }

  private addUserMessage(text: string): void {
    this.messages.push({ role: 'user', content: text, timestamp: new Date() });
    this.isLoading = true;
    this.saveChat();
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private addLoadingMessage(): void {
    this.messages.push({
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      loading: true,
    });
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private handleResponse(res: AiResponseDto): void {
    const idx = this.findLastLoadingIndex();
    if (idx !== -1) {
      this.messages[idx] = {
        role: 'assistant',
        content: res.reply,
        timestamp: new Date(),
        tokens: res.tokens,
        loading: false,
      };
    }
    this.totalTokensUsed += res.tokens || 0;
    this.isLoading = false;
    this.saveChat();
    this.startCooldown();
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private handleError(err: any): void {
    const idx = this.findLastLoadingIndex();
    let errMsg = 'Something went wrong. Please try again.';

    if (err?.error?.message) {
      const rawMessage = err.error.message as string;
      
      if (rawMessage.includes('Invalid API Key') || rawMessage.includes('invalid_api_key')) {
        errMsg = 'The AI service is not properly configured (Invalid API Key). Please contact the system administrator.';
      } else if (rawMessage.includes('rate_limit_exceeded')) {
        errMsg = 'The AI service is currently busy (Rate Limit Exceeded). Please try again later.';
      } else if (rawMessage.includes('insufficient_quota')) {
        errMsg = 'The AI service quota has been exceeded. Please contact the system administrator.';
      } else if (rawMessage.includes('Groq API error')) {
         try {
           const jsonStart = rawMessage.indexOf('{');
           if (jsonStart !== -1) {
             const jsonPart = rawMessage.substring(jsonStart);
             const parsed = JSON.parse(jsonPart);
             if (parsed?.error?.message) {
               errMsg = `AI Error: ${parsed.error.message}`;
             } else {
               errMsg = 'The AI service encountered an error processing your request.';
             }
           } else {
             errMsg = 'The AI service encountered a connection error. Please try again.';
           }
         } catch(e) {
           errMsg = 'The AI service encountered an unexpected error. Please try again later.';
         }
      } else {
        errMsg = rawMessage;
      }
    } else if (err?.error?.title) {
      errMsg = err.error.title;
    }

    if (idx !== -1) {
      this.messages[idx] = {
        role: 'assistant',
        content: `❌ **Error:** ${errMsg}`,
        timestamp: new Date(),
        loading: false,
      };
    }

    this.isLoading = false;
    this.saveChat();
    this.startCooldown();
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private findLastLoadingIndex(): number {
    for (let i = this.messages.length - 1; i >= 0; i--) {
      if (this.messages[i].loading) return i;
    }
    return -1;
  }


  private startCooldown(): void {
    this.cooldown = true;
    this.cooldownSeconds = this.COOLDOWN_DURATION;
    const interval = setInterval(() => {
      this.cooldownSeconds--;
      if (this.cooldownSeconds <= 0) {
        this.cooldown = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  formatContent(content: string): string {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.+)/gm, '<span class="bullet">• $1</span>')
      .replace(/^\d+\. (.+)/gm, '<span class="numbered">$&</span>')
      .replace(/\n/g, '<br>');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.messages = [];
    this.totalTokensUsed = 0;
    localStorage.removeItem(this.getChatStorageKey());
    localStorage.removeItem(this.getTokenStorageKey());
    this.ngOnInit();
  }

  setAiMode(mode: number): void {
    if (mode === 2 && !this.isAdminOrHR) return;
    this.aiMode = mode;
  }
}

```

### File: src\app\features\all-attendance\all-attendance.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../core/services/attendance.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-all-attendance',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './all-attendance.component.html',
})
export class AllAttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);

  allRecords: any[] = [];
  records: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';

  isLoading = true;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.records.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.records.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  ngOnInit() {
    // تحميل السجلات
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allRecords = Array.isArray(items) ? items : [];
        this.allRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.records = [...this.allRecords];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterRecords() {
    // فلترة السجلات
    this.records = this.allRecords.filter((rec) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const empName = (rec.employeeName || '').toLowerCase();
        const empId = String(rec.employeeId || '');
        const dateStr = String(rec.date || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          dateStr.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        const currentStatus = this.getStatusLabel(rec);
        matchesStatus = currentStatus === this.selectedStatus;
      }

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
  }

  getStatusClass(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'text-warning';
    return 'text-success';
  }

  getStatusLabel(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'Working';
    return 'Completed';
  }

  calcHours(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return '—';
    const inn = new Date(`2000-01-01T${rec.clockIn}`);
    const out = new Date(`2000-01-01T${rec.clockOut}`);
    const hrs = (out.getTime() - inn.getTime()) / 3600000;
    return `${hrs.toFixed(1)} hrs`;
  }
}

```

### File: src\app\features\attendance\attendance.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AttendanceService } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private authService = inject(AuthService);

  allAttendanceRecords: any[] = [];
  attendanceRecords: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';

  isLoading = true;
  isProcessing = false;
  isAdmin = false;
  isAdminOrHR = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.attendanceRecords.slice(
      startIndex,
      startIndex + this.itemsPerPage,
    );
  }

  get totalPages() {
    return Math.ceil(this.attendanceRecords.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  // حالة clock in/out اليوم
  isCheckedInToday = false;
  isCheckedOutToday = false;
  todayWorkedHours = 0;
  activeSession: any = null; // session مفتوحة بدون clock out
  readonly today = new Date().toISOString().split('T')[0]; // للمقارنة في الـ template

  // session من يوم سابق ونسي يعمل clock out
  get isStaleSession(): boolean {
    if (!this.activeSession?.date) return false;
    const sessionDate = new Date(this.activeSession.date)
      .toISOString()
      .split('T')[0];
    return sessionDate < this.today;
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    if (this.isAdmin) {
      this.loadAllAttendance();
    } else {
      this.loadMyAttendance();
    }
  }

  loadAllAttendance() {
    // تحميل كل الحضور
    this.isLoading = true;
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allAttendanceRecords = Array.isArray(items) ? items : [];
        this.allAttendanceRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.attendanceRecords = [...this.allAttendanceRecords];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadMyAttendance() {
    // تحميل حضوري
    this.isLoading = true;
    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allAttendanceRecords = Array.isArray(items) ? items : [];
        this.attendanceRecords = [...this.allAttendanceRecords];
        this.analyzeSessionStatus(this.attendanceRecords);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my attendance:', err);
        this.isLoading = false;
      },
    });
  }

  filterRecords() {
    this.attendanceRecords = this.allAttendanceRecords.filter((rec) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const empName = (rec.employeeName || '').toLowerCase();
        const empId = String(rec.employeeId || '');
        const dateStr = String(rec.date || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          dateStr.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        const isCompleted = rec.clockOut && rec.clockOut !== '00:00:00';
        const currentStatus = isCompleted ? 'Completed' : 'Working';
        matchesStatus = currentStatus === this.selectedStatus;
      }

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
    if (this.attendanceRecords.length > 0) {
      this.attendanceRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
  }

  private analyzeSessionStatus(records: any[]) {
    // تحليل حالة الدوام
    const today = new Date().toDateString();

    const openSession = records.find(
      (r) => !r.clockOut || r.clockOut === '00:00:00' || r.clockOut === null,
    );

    const todayRecord = records.find(
      (r) => new Date(r.date).toDateString() === today,
    );

    if (openSession) {
      this.activeSession = openSession;
      this.isCheckedInToday = true;
      this.isCheckedOutToday = false;
      this.todayWorkedHours = 0;
    } else if (todayRecord) {
      this.activeSession = null;
      this.isCheckedInToday = true;
      this.isCheckedOutToday = true;

      const inTime = new Date(`2000-01-01T${todayRecord.clockIn}`);
      const outTime = new Date(`2000-01-01T${todayRecord.clockOut}`);
      this.todayWorkedHours = (outTime.getTime() - inTime.getTime()) / 3600000;
    } else {
      this.activeSession = null;
      this.isCheckedInToday = false;
      this.isCheckedOutToday = false;
      this.todayWorkedHours = 0;
    }
  }

  onClockIn() {
    // تسجيل دخول
    this.isProcessing = true;
    const now = new Date();
    const dateIso = now.toISOString();
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS format

    this.attendanceService
      .clockIn({ date: dateIso, clockIn: timeString })
      .subscribe({
        next: () => {
          this.isProcessing = false;
          Swal.fire({
            icon: 'success',
            title: 'Clocked In ✅',
            text: `Have a great day! Clocked in at ${timeString}`,
            timer: 2000,
            showConfirmButton: false,
          });
          this.loadMyAttendance();
        },
        error: (err) => {
          this.isProcessing = false;
          const msg =
            err?.error?.message ||
            err?.error?.Message ||
            'Failed to clock in. Please try again.';
          Swal.fire('Error', msg, 'error');
        },
      });
  }

  // ─── Clock Out ───
  onClockOut() {
    this.isProcessing = true;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    // session من يوم سابق نغلقها بـ 23:59
    const isOldSession =
      this.activeSession &&
      new Date(this.activeSession.date).toDateString() !==
        new Date().toDateString();

    const clockOutTime = isOldSession ? '23:59:00' : timeString;

    this.attendanceService.clockOut({ clockOut: clockOutTime }).subscribe({
      next: () => {
        this.isProcessing = false;
        const msg = isOldSession
          ? `Previous session automatically closed at 23:59.`
          : `Great job today! Clocked out at ${clockOutTime}`;
        Swal.fire({
          icon: 'success',
          title: 'Clocked Out ✅',
          text: msg,
          timer: 2500,
          showConfirmButton: false,
        });
        this.loadMyAttendance();
      },
      error: (err) => {
        this.isProcessing = false;
        const msg =
          err?.error?.message ||
          err?.error?.Message ||
          'Failed to clock out. Please try again.';
        Swal.fire('Error', msg, 'error');
      },
    });
  }
  // ─── Export to Excel (CSV) ───
  exportToExcel() {
    // تصدير الملف
    if (this.attendanceRecords.length === 0) {
      Swal.fire(
        'No Data',
        'There are no attendance records to export.',
        'info',
      );
      return;
    }

    const headers = [
      'Date',
      'Employee Name',
      'Employee ID',
      'Clock In',
      'Clock Out',
      'Status',
      'Total Hours',
    ];

    const csvData = this.attendanceRecords.map((rec) => {
      const isCompleted = rec.clockOut && rec.clockOut !== '00:00:00';
      const status = isCompleted ? 'Completed' : 'Working';
      const empName = rec.employeeName || 'Emp #' + rec.employeeId;

      return [
        rec.date ? new Date(rec.date).toLocaleDateString() : '',
        empName,
        rec.employeeId || 'N/A',
        rec.clockIn || '--:--',
        rec.clockOut && rec.clockOut !== '00:00:00' ? rec.clockOut : '--:--',
        status,
        rec.totalHours || '0',
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    });

    // BOM + sep hint عشان Excel يفتحه صح
    const csvContent =
      '\uFEFFsep=,\r\n' + [headers.join(','), ...csvData].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Attendance_Kawadir_${new Date().toISOString().split('T')[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported Successfully',
      text: 'Attendance data has been exported to Excel (CSV).',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

```

### File: src\app\features\auth\login\login.component.ts
```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private settingsService = inject(SettingsService);

  isLoading = false;
  isPasswordVisible = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  togglePasswordVisibility() {
    // إظهار/إخفاء كلمة السر
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnInit() {
    // إجبار صفحة الدخول على الوضع الفاتح
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-mode');
  }

  ngOnDestroy() {
    // إعادة تطبيق ثيم المستخدم المحفوظ عند الدخول للمشروع
    if (this.settingsService.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    }
  }

  onSubmit() {
    // تسجيل الدخول
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials = {
      // بيانات الدخول
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'Login Failed',
          getFriendlyErrorMessage(
            err,
            'Incorrect email or password. Please try again.',
          ),
          'error',
        );
      },
    });
  }
}

```

### File: src\app\features\auth\register\register.component.ts
```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('', Validators.required),
  });

  roles = ['Employee', 'Admin', 'HR'];

  onSubmit() {
    // إنشاء حساب جديد
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const payload = this.registerForm.getRawValue();
    // بيانات التسجيل

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        const userIdFromRes = res?.data?.id || res?.id || res?.userId;
        const userEmail = this.registerForm.get('email')?.value;

        Swal.fire({
          icon: 'success',
          title: 'تم إنشاء الحساب بنجاح',
          text: 'هل تريد إكمال ملف الموظف الآن؟',
          showCancelButton: true,
          confirmButtonText: 'نعم، أكمل البيانات',
          cancelButtonText: 'لاحقاً',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/employee-form'], {
              state: {
                userId: userIdFromRes,
                email: userEmail,
              },
            });
          } else {
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'خطأ',
          getFriendlyErrorMessage(
            err,
            'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.',
          ),
          'error',
        );
      },
    });
  }
}

```

### File: src\app\features\dashboard\dashboard.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { LeaveService } from '../../core/services/leave.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { SalaryService } from '../../core/services/salary.service';
import { Chart, registerables } from 'chart.js';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { AnnouncementService } from '../../core/services/announcement.service';
import { Announcement } from '../../core/models/announcement.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private empService = inject(EmployeeService);
  private leaveService = inject(LeaveService);
  private deptService = inject(DepartmentService);
  private authService = inject(AuthService);
  private attendanceService = inject(AttendanceService);
  private salaryService = inject(SalaryService);
  private announcementService = inject(AnnouncementService);
  private fb = inject(FormBuilder);

  announcements: Announcement[] = [];
  announcementForm: FormGroup;
  showAnnouncementModal = false;

  totalEmployees = 0;
  pendingLeaves = 0;
  departmentsCount = 0;
  totalSalaries = 0;
  recentLeaves: any[] = [];
  recentAttendances: any[] = [];
  myRecentAttendances: any[] = [];
  allAttendances: any[] = [];
  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;

  annualLeavePercent: number = 0;
  sickLeavePercent: number = 0;
  emergencyLeavePercent: number = 0;
  unpaidLeavePercent: number = 0;
  attendanceRate: number = 0;

  employeeAnnualLeaveBalance: number | string = 14;
  employeePendingLeaves: number = 0;
  employeeHoursWorked: number = 0;
  employeeNextPayday: string = '';

  // يوم 25 من كل شهر
  readonly PAYDAY = 25;

  leaveChartInstance: any;
  attendanceRateChartInstance: any;

  downloadSystemReport() {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 14;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const timeStr = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // ── CORPORATE HEADER BANNER ─────────────────────────────────────────────
    doc.setFillColor(67, 97, 238);
    doc.rect(0, 0, pageW, 42, 'F');

    // Subtle accent strip
    doc.setFillColor(90, 120, 255);
    doc.rect(0, 38, pageW, 4, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('Kawadir HRMS', margin, 15);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 210, 255);
    doc.text('System Summary & Analytics Report', margin, 23);

    doc.setFontSize(8.5);
    doc.setTextColor(180, 195, 255);
    doc.text(`Generated: ${todayStr}  ·  ${timeStr}`, margin, 30);

    // Right side: badge label
    doc.setFillColor(50, 75, 210);
    doc.roundedRect(pageW - 52, 8, 38, 14, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('ADMIN REPORT', pageW - 33, 16, { align: 'center' });

    // ── KPI STAT CARDS ──────────────────────────────────────────────────────
    const cardY = 50;
    const cardH = 28;
    const cardW = (pageW - margin * 2 - 9) / 4; // 4 cards with 3 gaps of 3mm
    const cards = [
      { label: 'Total Employees', value: String(this.totalEmployees), accentColor: [239, 71, 111] as [number, number, number] },
      { label: 'Pending Leaves', value: String(this.pendingLeaves), accentColor: [255, 165, 2] as [number, number, number] },
      { label: 'Departments', value: String(this.departmentsCount), accentColor: [67, 97, 238] as [number, number, number] },
      { label: 'Total Payroll', value: `${Number(this.totalSalaries).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} JD`, accentColor: [6, 214, 160] as [number, number, number] },
    ];

    cards.forEach((card, i) => {
      const x = margin + i * (cardW + 3);
      // Card background
      doc.setFillColor(248, 249, 252);
      doc.roundedRect(x, cardY, cardW, cardH, 3, 3, 'F');
      doc.setDrawColor(225, 228, 240);
      doc.roundedRect(x, cardY, cardW, cardH, 3, 3, 'S');
      // Top accent line
      doc.setFillColor(...card.accentColor);
      doc.roundedRect(x, cardY, cardW, 3, 1.5, 1.5, 'F');
      // Value
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(30, 30, 50);
      doc.text(card.value, x + cardW / 2, cardY + 15, { align: 'center' });
      // Label
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 125, 145);
      doc.text(card.label, x + cardW / 2, cardY + 22, { align: 'center' });
    });

    // ── ANALYTICS SECTION ───────────────────────────────────────────────────
    let curY = cardY + cardH + 10;

    // Section header line
    this._pdfSectionHeader(doc, 'SYSTEM ANALYTICS', margin, curY, pageW);
    curY += 8;

    // Two-column analytics table (leave distribution + attendance)
    const analyticsData = [
      ['Annual Leave', `${this.annualLeavePercent}%`],
      ['Sick Leave', `${this.sickLeavePercent}%`],
      ['Emergency Leave', `${this.emergencyLeavePercent}%`],
      ['Unpaid Leave', `${this.unpaidLeavePercent}%`],
      ['Overall Attendance Rate', `${this.attendanceRate}%`],
    ];

    autoTable(doc, {
      startY: curY,
      head: [['Metric', 'Value']],
      body: analyticsData,
      margin: { left: margin, right: margin },
      theme: 'grid',
      tableWidth: pageW - margin * 2,
      headStyles: {
        fillColor: [67, 97, 238],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        cellPadding: 3,
      },
      bodyStyles: {
        textColor: [50, 55, 70],
        fontSize: 9,
        cellPadding: 3,
      },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: {
        0: { cellWidth: (pageW - margin * 2) * 0.68 },
        1: { cellWidth: (pageW - margin * 2) * 0.32, halign: 'center', fontStyle: 'bold' },
      },
    });

    curY = (doc as any).lastAutoTable.finalY + 10;

    // ── RECENT LEAVE REQUESTS TABLE ─────────────────────────────────────────
    this._pdfSectionHeader(doc, 'RECENT LEAVE REQUESTS', margin, curY, pageW);
    curY += 8;

    const leaveRows = this.recentLeaves.map((l: any) => [
      l.employeeName || `Emp #${l.employeeId}`,
      l.leaveType || '—',
      l.startDate ? l.startDate.split('T')[0] : '—',
      l.endDate ? l.endDate.split('T')[0] : '—',
      l.status || '—',
    ]);

    if (leaveRows.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(170, 170, 180);
      doc.text('No recent leave requests found.', margin + 4, curY + 5);
      curY += 14;
    } else {
      autoTable(doc, {
        startY: curY,
        head: [['Employee', 'Type', 'Start Date', 'End Date', 'Status']],
        body: leaveRows,
        margin: { left: margin, right: margin },
        theme: 'grid',
        tableWidth: pageW - margin * 2,
        headStyles: {
          fillColor: [50, 62, 140],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8.5,
          cellPadding: 2.5,
        },
        bodyStyles: { textColor: [50, 55, 70], fontSize: 8.5, cellPadding: 2.5 },
        alternateRowStyles: { fillColor: [248, 249, 252] },
        didDrawCell: (data: any) => {
          if (data.section === 'body' && data.column.index === 4) {
            const status = data.cell.raw as string;
            if (status === 'Approved') { doc.setTextColor(6, 150, 80); }
            else if (status === 'Pending') { doc.setTextColor(200, 120, 0); }
            else if (status === 'Rejected') { doc.setTextColor(180, 30, 50); }
            doc.setFont('helvetica', 'bold');
            doc.text(
              status,
              data.cell.x + data.cell.width / 2,
              data.cell.y + data.cell.height / 2 + 0.5,
              { align: 'center', baseline: 'middle' }
            );
          }
        },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // ── RECENT ATTENDANCE TABLE ──────────────────────────────────────────────
    this._pdfSectionHeader(doc, 'RECENT ATTENDANCE RECORDS', margin, curY, pageW);
    curY += 8;

    const attRows = this.recentAttendances.map((a: any) => [
      a.employeeName || `Emp #${a.employeeId}`,
      a.date ? a.date.split('T')[0] : '—',
      a.clockIn || '--:--',
      (a.clockOut && a.clockOut !== '00:00:00') ? a.clockOut : '--:--',
    ]);

    if (attRows.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(170, 170, 180);
      doc.text('No recent attendance records found.', margin + 4, curY + 5);
    } else {
      autoTable(doc, {
        startY: curY,
        head: [['Employee', 'Date', 'Clock In', 'Clock Out']],
        body: attRows,
        margin: { left: margin, right: margin },
        theme: 'grid',
        tableWidth: pageW - margin * 2,
        headStyles: {
          fillColor: [20, 140, 100],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8.5,
          cellPadding: 2.5,
        },
        bodyStyles: { textColor: [50, 55, 70], fontSize: 8.5, cellPadding: 2.5 },
        alternateRowStyles: { fillColor: [248, 252, 249] },
      });
    }

    // ── FOOTERS ON ALL PAGES ─────────────────────────────────────────────────
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let pg = 1; pg <= totalPages; pg++) {
      doc.setPage(pg);
      // Footer separator line
      doc.setDrawColor(210, 215, 230);
      doc.setLineWidth(0.4);
      doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
      // Confidential left text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(160, 165, 180);
      doc.text('Confidential — Kawadir HRMS Internal Report', margin, pageH - 7);
      // Page number right
      doc.text(`Page ${pg} of ${totalPages}`, pageW - margin, pageH - 7, { align: 'right' });
    }

    // ── SAVE ─────────────────────────────────────────────────────────────────
    doc.save(`System_Summary_Report_${todayStr}.pdf`);
  }

  /** Draws a styled section header underline in the PDF */
  private _pdfSectionHeader(doc: jsPDF, title: string, x: number, y: number, pageW: number) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(67, 97, 238);
    doc.text(title, x, y);
    doc.setDrawColor(67, 97, 238);
    doc.setLineWidth(0.4);
    doc.line(x, y + 1.5, pageW - x, y + 1.5);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(x, y + 2.5, pageW - x, y + 2.5);
  }

  allEmployeesList: any[] = []; // for targeted announcements

  constructor() {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['Normal', Validators.required],
      isGeneral: [true],
      targetEmployeeIds: [[]],
      expiryDate: ['']
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();

    if (this.isAdminOrHR) {
      this.loadAdminStats();
      this.loadEmployeesForSelect();
    } else {
      this.loadEmployeeStats();
    }

    this.loadAnnouncements();
  }

  loadEmployeesForSelect() {
    this.empService.getEmployees().subscribe({
      next: (res) => {
        this.allEmployeesList = res;
      },
      error: (err) => console.error('Failed to load employees for announcements', err)
    });
  }

  loadAnnouncements() {
    this.announcementService.getAnnouncements(1, 10).subscribe({
      next: (res) => {
        this.announcements = res.items;
      },
      error: (err) => console.error('Failed to load announcements', err)
    });
  }

  openAnnouncementModal() {
    this.announcementForm.reset({ priority: 'Normal', isGeneral: true, targetEmployeeIds: [] });
    this.showAnnouncementModal = true;
  }

  closeAnnouncementModal() {
    this.showAnnouncementModal = false;
  }

  submitAnnouncement() {
    if (this.announcementForm.invalid) return;

    let formValue = { ...this.announcementForm.value };
    if (formValue.isGeneral) {
      formValue.targetEmployeeIds = null;
    }
    if (!formValue.expiryDate) {
      formValue.expiryDate = null;
    } else {
      // Ensure it's sent as an ISO string so the backend parses it as UTC
      formValue.expiryDate = new Date(formValue.expiryDate).toISOString();
    }

    this.announcementService.createAnnouncement(formValue).subscribe({
      next: () => {
        this.closeAnnouncementModal();
        this.loadAnnouncements();
        Swal.fire('Success', 'Announcement posted successfully', 'success');
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to post announcement', 'error');
      }
    });
  }

  deleteAnnouncement(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.announcementService.deleteAnnouncement(id).subscribe({
          next: () => {
            this.loadAnnouncements();
            Swal.fire('Deleted!', 'Announcement has been deleted.', 'success');
          },
          error: (err) => Swal.fire('Error', 'Failed to delete', 'error')
        });
      }
    });
  }

  trackByAttId(index: number, att: any): number {
    return att.id;
  }

  loadAdminStats() {
    // تحميل بيانات الأدمن
    this.empService.getEmployees().subscribe({
      next: (employees: any[]) => {
        this.totalEmployees = employees.length;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching employees:', err),
    });

    this.leaveService.getAllLeaves().subscribe({
      next: (leaves: any[]) => {
        this.pendingLeaves = leaves.filter(
          // الـ backend بيرجع string مش رقم
          (l: any) => l.status === 'Pending',
        ).length;

        leaves.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
        this.recentLeaves = leaves.slice(0, 5);

        const totalLeaves = leaves.length;
        let annual = 0,
          sick = 0,
          emergency = 0,
          unpaid = 0;

        if (totalLeaves > 0) {
          // كلها strings من الـ backend
          annual = leaves.filter(
            (l: any) => l.leaveType === 'Annual',
          ).length;
          sick = leaves.filter((l: any) => l.leaveType === 'Sick').length;
          emergency = leaves.filter(
            (l: any) => l.leaveType === 'Emergency',
          ).length;
          unpaid = leaves.filter(
            (l: any) => l.leaveType === 'Unpaid',
          ).length;

          this.annualLeavePercent = Math.round((annual / totalLeaves) * 100);
          this.sickLeavePercent = Math.round((sick / totalLeaves) * 100);
          this.emergencyLeavePercent = Math.round(
            (emergency / totalLeaves) * 100,
          );
          this.unpaidLeavePercent = Math.round((unpaid / totalLeaves) * 100);
        } else {
          this.annualLeavePercent = 0;
          this.sickLeavePercent = 0;
          this.emergencyLeavePercent = 0;
          this.unpaidLeavePercent = 0;
        }

        setTimeout(() => {
          this.renderLeaveChart(annual, sick, emergency, unpaid);
        }, 100);
      },
      error: (err) => console.error('Error fetching leaves:', err),
    });

    this.deptService.getDepartments().subscribe({
      next: (departments: any[]) => {
        this.departmentsCount = departments.length;
      },
      error: (err) => console.error('Error fetching departments:', err),
    });

    this.salaryService.getAllSalaries().subscribe({
      next: (salaries: any[]) => {
        this.totalSalaries = salaries.reduce(
          (sum, current) => sum + (current.netAmount || 0),
          0,
        );
      },
      error: (err) => console.error('Error fetching salaries:', err),
    });

    this.attendanceService.getAllAttendance().subscribe({
      next: (attendances: any[]) => {
        attendances.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.recentAttendances = attendances.slice(0, 5);
        this.allAttendances = attendances;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching attendance overview:', err),
    });
  }

  calculateAttendanceRate() {
    // نحسب نسبة الحضور
    if (this.totalEmployees === 0 || this.allAttendances.length === 0) return;
    const validAtt = this.allAttendances.filter((a) => a.date && a.clockIn);
    const uniqueDays = new Set(validAtt.map((a) => a.date.split('T')[0])).size;
    if (uniqueDays > 0) {
      const totalExpected = uniqueDays * this.totalEmployees;
      this.attendanceRate = Math.round((validAtt.length / totalExpected) * 100);
      if (this.attendanceRate > 100) this.attendanceRate = 100;
    }

    setTimeout(() => {
      this.renderAttendanceRateChart();
    }, 100);
  }

  loadNextPayday() {
    // نحسب موعد الراتب القادم
    this.salaryService.getMySalaries().subscribe({
      next: (salaries: any[]) => {
        if (!salaries || salaries.length === 0) return;

        const sorted = [...salaries].sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return b.month - a.month;
        });

        const latest = sorted[0];

        const nextPayMonth = latest.month === 12 ? 1 : latest.month + 1;
        const nextPayYear = latest.month === 12 ? latest.year + 1 : latest.year;

        if (latest.effectiveDate) {
          const effDate = new Date(latest.effectiveDate);
          const nextEff = new Date(
            nextPayYear,
            nextPayMonth - 1,
            effDate.getDate(),
          );
          const dayLabel = nextEff.getDate();
          const monthLabel = nextEff.toLocaleString('en-US', {
            month: 'short',
          });
          this.employeeNextPayday = `${monthLabel} ${dayLabel}`;
        } else {
          const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];
          this.employeeNextPayday = `${monthNames[nextPayMonth - 1]} ${this.PAYDAY}`;
        }
      },
      error: () => { },
    });
  }

  loadEmployeeStats() {
    // تحميل بيانات الموظف

    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'short' });
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    ).toLocaleString('en-US', { month: 'short' });

    // قيمة مؤقتة تظهر فوراً، تتحدث لما يرجع الـ API
    if (today.getDate() > this.PAYDAY) {
      this.employeeNextPayday = `${nextMonth} ${this.PAYDAY}`;
    } else {
      this.employeeNextPayday = `${currentMonth} ${this.PAYDAY}`;
    }

    // نجيب التاريخ الدقيق من آخر راتب
    this.loadNextPayday();

    this.leaveService.getMyLeaves().subscribe({
      next: (leaves: any[]) => {
        // backend يرجع strings مش أرقام
        this.employeePendingLeaves = leaves.filter(
          (l: any) => l.status === 'Pending',
        ).length;

        const approvedAnnualLeavesDays = leaves
          .filter(
            (l: any) => l.status === 'Approved' && l.leaveType === 'Annual',
          )
          .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);

        this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
      },
      error: (err) => console.error('Error fetching my leaves:', err),
    });

    this.attendanceService.getMyAttendance().subscribe({
      next: (attendances: any[]) => {

        const currentMonthNum = today.getMonth();
        const currentYear = today.getFullYear();

        let totalHours = 0;
        attendances.forEach((att: any) => {
          if (
            att.date &&
            att.clockIn &&
            att.clockOut &&
            att.clockOut !== '00:00:00'
          ) {
            const baseDate = att.date.split('T')[0];

            const clockInDate = new Date(`${baseDate}T${att.clockIn}`);
            const clockOutDate = new Date(`${baseDate}T${att.clockOut}`);

            if (
              clockInDate.getMonth() === currentMonthNum &&
              clockInDate.getFullYear() === currentYear
            ) {
              const diffMs = clockOutDate.getTime() - clockInDate.getTime();
              const diffHrs = diffMs / (1000 * 60 * 60);
              if (diffHrs > 0) totalHours += diffHrs;
            }
          }
        });

        attendances.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.myRecentAttendances = attendances.slice(0, 5);

        this.employeeHoursWorked = Math.round(totalHours);
      },
      error: (err) => console.error('Error fetching my attendance:', err),
    });
  }

  renderLeaveChart(
    annual: number,
    sick: number,
    emergency: number,
    unpaid: number,
  ) {
    // رسم تشارت الإجازات
    const ctx = document.getElementById('leaveTypeChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.leaveChartInstance) {
      this.leaveChartInstance.destroy();
    }

    // لو مافي داتا نعرض دائرة فاضية
    if (annual === 0 && sick === 0 && emergency === 0 && unpaid === 0) {
      this.leaveChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['No Data'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['rgba(150, 150, 150, 0.15)'],
              borderWidth: 0,
              hoverOffset: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          cutout: '75%',
        },
      });
      return;
    }

    this.leaveChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Annual', 'Sick', 'Emergency', 'Unpaid'],
        datasets: [
          {
            data: [annual, sick, emergency, unpaid],
            backgroundColor: ['#0d6efd', '#dc3545', '#ffc107', '#6c757d'],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
            },
          },
        },
        cutout: '75%',
      },
    });
  }

  renderAttendanceRateChart() {
    const ctx = document.getElementById('attendanceRateChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.attendanceRateChartInstance) {
      this.attendanceRateChartInstance.destroy();
    }

    if (this.totalEmployees === 0 || this.allAttendances.length === 0) return;

    // Get last 7 days calendar-wise
    const labels = [];
    const data = [];
    let startDateStr = '';

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];

      if (i === 6) {
        startDateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      labels.push(dayName);

      const dayAtts = this.allAttendances.filter(a => a.date && a.date.startsWith(dateString) && a.clockIn);
      let rate = Math.round((dayAtts.length / this.totalEmployees) * 100);
      if (rate > 100) rate = 100;
      data.push(rate);
    }

    this.attendanceRateChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Attendance Rate (%)',
          data: data,
          borderColor: '#198754', // Success color matching the badge
          backgroundColor: 'rgba(25, 135, 84, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#198754',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Attendance rates since ${startDateStr} (Renews every 7 days)`,
            align: 'start',
            color: '#6c757d',
            font: {
              family: "'Inter', sans-serif",
              size: 13,
              weight: 'normal'
            },
            padding: { bottom: 15 }
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              callback: function (value: any) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

```

### File: src\app\features\departments\departments.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { DepartmentService } from '../../core/services/department.service';
import { EmployeeService } from '../../core/services/employee.service';
import { PositionService } from '../../core/services/position.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

declare var bootstrap: any;

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  private positionService = inject(PositionService);

  allPositions: any[] = []; // lookup: positionId -> title

  departmentsList: any[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  currentDepartmentId: number | null = null;

  selectedDepartment: any = null;
  private detailsModal: any;
  private addModalInstance: any;

  allEmployees: any[] = [];
  departmentStats: any = {}; // id -> { totalEmployees: 0, positions: { posName: count } }

  deptEmployees: any[] = [];
  filteredDeptEmployees: any[] = [];
  searchEmpQuery: string = '';
  selectedPositionFilter: string = '';
  uniquePositions: string[] = [];

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  ngOnInit() {
    this.loadPositionsThenEmployees();
    this.loadDepartments();
  }

  loadPositionsThenEmployees() {
    // جلب الـ positions أولاً ثم الموظفين لعمل join صحيح
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        this.allPositions = Array.isArray(res) ? res : res?.data || [];
        this.loadEmployees();
      },
      error: () => this.loadEmployees(), // تحميل الموظفين حتى لو فشل جلب الـ positions
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extracted: any[] = Array.isArray(res)
          ? res
          : res?.data?.items || res?.data || [];
        // ربط اسم الـ position بكل موظف
        this.allEmployees = extracted.map((emp) => {
          if (!emp.positionName && emp.positionId) {
            const pos = this.allPositions.find((p) => p.id === emp.positionId);
            return { ...emp, positionName: pos?.title || null };
          }
          return emp;
        });
        this.calculateStats();
      },
    });
  }

  calculateStats() {
    this.departmentStats = {};
    for (const emp of this.allEmployees) {
      const deptId = emp.departmentId;
      if (!deptId) continue;

      if (!this.departmentStats[deptId]) {
        this.departmentStats[deptId] = { totalEmployees: 0, positions: {} };
      }

      this.departmentStats[deptId].totalEmployees++;
      const posName = emp.positionName; // نتجاهل الموظفين الذين ليس لديهم position
      if (!posName) continue; // لا نُدرجهم في الـ Positions Breakdown
      if (!this.departmentStats[deptId].positions[posName]) {
        this.departmentStats[deptId].positions[posName] = 0;
      }
      this.departmentStats[deptId].positions[posName]++;
    }
  }

  getDeptStat(deptId: number, type: 'employees' | 'positions'): number {
    if (type === 'employees') {
      const stat = this.departmentStats[deptId];
      return stat ? stat.totalEmployees : 0;
    }
    if (type === 'positions') {
      // العدّ الحقيقي من قائمة الـ positions المرتبطة بالقسم
      return this.allPositions.filter((p) => p.departmentId === deptId).length;
    }
    return 0;
  }

  loadDepartments() {
    // تحميل الأقسام
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.$values) extracted = res.$values;

        this.departmentsList = extracted;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.isLoading = false;
      },
    });
  }

  viewDetails(dept: any) {
    // تفاصيل القسم
    this.selectedDepartment = dept;
    const stats = this.departmentStats[dept.id] || { totalEmployees: 0 };
    this.selectedDepartment.stats = stats;
    // الـ positions الحقيقية المرتبطة بهذا القسم من الـ API
    const deptPositions = this.allPositions.filter(
      (p) => p.departmentId === dept.id,
    );
    this.selectedDepartment.totalPositions = deptPositions.length;

    // جدول الموظفين داخل الـ modal — مع ربط الـ position
    this.deptEmployees = this.allEmployees
      .filter((e) => e.departmentId === dept.id)
      .map((emp) => {
        if (!emp.positionName && emp.positionId) {
          const pos = this.allPositions.find((p) => p.id === emp.positionId);
          return { ...emp, positionName: pos?.title || null };
        }
        return emp;
      });
    this.filteredDeptEmployees = [...this.deptEmployees];
    // بناء قائمة الـ positions من الـ API مباشرةً وليس من الموظفين
    this.uniquePositions = deptPositions.map((p) => p.title).filter(Boolean);
    this.searchEmpQuery = '';
    this.selectedPositionFilter = '';

    setTimeout(() => {
      const modalElement = document.getElementById('deptDetailsModal');
      if (modalElement) {
        this.detailsModal = new bootstrap.Modal(modalElement);
        this.detailsModal.show();
      }
    }, 0);
  }

  filterDeptEmployees() {
    // فلترة موظفين القسم
    this.filteredDeptEmployees = this.deptEmployees.filter((emp) => {
      let matchesSearch = true;
      if (this.searchEmpQuery) {
        const query = this.searchEmpQuery.toLowerCase();
        const fullName =
          `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        matchesSearch = fullName.includes(query) || idStr.includes(query);
      }

      let matchesPos = true;
      if (this.selectedPositionFilter) {
        // مقارنة بـ positionName أو عن طريق positionId
        const pos = this.allPositions.find(
          (p) => p.title === this.selectedPositionFilter,
        );
        if (pos) {
          matchesPos = emp.positionId === pos.id;
        } else {
          matchesPos = emp.positionName === this.selectedPositionFilter;
        }
      }

      return matchesSearch && matchesPos;
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentDepartmentId = null;
    this.addForm.reset();
    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  openEditModal(dept: any) {
    this.isEditMode = true;
    this.currentDepartmentId = dept.id;
    this.addForm.patchValue({ name: dept.name });

    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  saveDepartment() {
    // حفظ القسم
    if (this.addForm.invalid) {
      Swal.fire('Warning', 'Please enter a valid department name.', 'warning');
      return;
    }

    this.isSubmitting = true;
    const payload = this.addForm.getRawValue();

    if (this.isEditMode && this.currentDepartmentId) {
      this.departmentService
        .updateDepartment(this.currentDepartmentId, payload)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.addModalInstance.hide();
            Swal.fire('Success', 'Department updated successfully!', 'success');
            this.loadDepartments();
          },
          error: (err) => {
            this.isSubmitting = false;
            Swal.fire(
              'Error',
              getFriendlyErrorMessage(
                err,
                'Failed to update department. Please try again.',
              ),
              'error',
            );
          },
        });
    } else {
      this.departmentService.addDepartment(payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.addModalInstance.hide();
          Swal.fire('Success', 'Department added successfully!', 'success');
          this.loadDepartments();
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire(
            'Error',
            getFriendlyErrorMessage(
              err,
              'Failed to add department. Please try again.',
            ),
            'error',
          );
        },
      });
    }
  }

  deleteDepartment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This department and all associated data might be affected. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.deleteDepartment(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Department has been deleted.', 'success');
            this.loadDepartments();
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire(
              'Error!',
              getFriendlyErrorMessage(
                err,
                'Failed to delete department. It may have employees assigned to it.',
              ),
              'error',
            );
          },
        });
      }
    });
  }
}

```

### File: src\app\features\employee-form\employee-form.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { PositionService } from '../../core/services/position.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  isEditMode = false;
  currentEmployeeId: number | null = null;
  departments: any[] = [];
  positions: any[] = [];
  unassignedUsers: any[] = [];

  // بيانات اليوزر اللي مربوط بالموظف في حالة التعديل
  linkedUserInfo: { username: string; email: string; role: string } | null =
    null;

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    userId: new FormControl('', Validators.required),
  });

  ngOnInit() {
    // تجهيز النموذج
    const state = window.history.state;

    if (state && state.editMode && state.employeeId) {
      // edit mode
      this.isEditMode = true;
      this.currentEmployeeId = state.employeeId;
      this.loadEmployeeDetails(this.currentEmployeeId!);
      // userId والإيميل ما يتعدلوا
      this.employeeForm.get('userId')?.disable();
      this.employeeForm.get('email')?.disable();
    } else {
      // add mode
      // لو جاية داتا من صفحة ثانية نعبيها مباشرة
      if (state && (state.userId || state.email)) {
        this.employeeForm.patchValue({
          userId: state.userId,
          email: state.email,
        });
      }
      // الإيميل يتعبى تلقائياً من اليوزر المختار
      this.employeeForm.get('email')?.disable();

      this.loadUnassignedUsers();

      // نعبي الإيميل لما يختار يوزر من الـ dropdown
      this.employeeForm.get('userId')?.valueChanges.subscribe((selectedId) => {
        const user = this.unassignedUsers.find(
          (u) => String(u.id) === String(selectedId),
        );
        if (user) {
          this.employeeForm.get('email')?.setValue(user.email);
        }
      });
    }

    this.loadDepartments();

    this.employeeForm.get('departmentId')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.employeeForm.get('positionId')?.enable();
        this.loadPositions(Number(deptId));
      }
    });
  }

  // جلب بيانات الموظف
  loadEmployeeDetails(id: number) {
    this.isLoading = true;
    // بنجيب كامل التفاصيل
    this.employeeService.getEmployeeById(id).subscribe({
      next: (profile: any) => {
        this.isLoading = false;

        if (profile.departmentId) {
          this.loadPositions(profile.departmentId);
          this.employeeForm.get('positionId')?.enable();
        }

        // نعبي الفورم بالداتا الموجودة
        this.employeeForm.patchValue({
          firstName: profile.firstName || profile.fullName?.split(' ')[0] || '',
          lastName:
            profile.lastName ||
            profile.fullName?.split(' ').slice(1).join(' ') ||
            '',
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || profile.phone || '',
          hireDate: profile.hireDate
            ? new Date(profile.hireDate).toISOString().split('T')[0]
            : '',
          departmentId: profile.departmentId || '',
          positionId: profile.positionId || '',
          userId: profile.userId || '',
        });

        // معلومات بسيطة للعرض في الـ header
        this.linkedUserInfo = {
          username:
            profile.fullName ||
            `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
            'Employee',
          email: profile.email || '',
          role: profile.positionTitle || profile.departmentName || 'Employee',
        };
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching employee', err);
        Swal.fire('Error', 'Failed to load employee details', 'error');
      },
    });
  }

  loadDepartments() {
    // تحميل الأقسام
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
      },
    });
  }

  // اليوزرات اللي ما ربطوا بموظف بعد
  loadUnassignedUsers() {
    // تحميل يوزرات بدون موظف
    this.authService.getUnassignedEmployeeUsers().subscribe({
      next: (res: any) => {
        this.unassignedUsers = res?.items ?? (Array.isArray(res) ? res : []);
      },
      error: (err) => {
        console.error('Failed to load unassigned users:', err);
      },
    });
  }

  // positions حسب القسم
  loadPositions(deptId: number) {
    // تحميل المناصب
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res) ? res : res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  // الإيميل disabled فنحتاج getRawValue
  get displayEmail(): string {
    return this.employeeForm.getRawValue().email || '';
  }

  // تحويل أخطاء الـ backend لرسائل مفهومة
  private parseBackendError(err: any): string {
    const body = err?.error;

    if (!body) return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.';

    // ASP.NET validation errors — كل field فيه list من الـ errors
    if (body.errors && typeof body.errors === 'object') {
      const fieldLabels: Record<string, string> = {
        PhoneNumber: 'رقم الهاتف',
        FirstName: 'الاسم الأول',
        LastName: 'اسم العائلة',
        Email: 'البريد الإلكتروني',
        HireDate: 'تاريخ التعيين',
        DepartmentId: 'القسم',
        PositionId: 'المسمى الوظيفي',
        UserId: 'حساب المستخدم',
      };

      const messages: string[] = [];
      for (const [field, errors] of Object.entries(body.errors)) {
        const label = fieldLabels[field] || field;
        const msgs = Array.isArray(errors) ? errors : [String(errors)];
        for (const msg of msgs) {
          // نترجم الرسالة للعربي لو عندنا ترجمة
          const translated = this.translateBackendMsg(String(msg));
          messages.push(`• ${label}: ${translated}`);
        }
      }
      if (messages.length) return messages.join('\n');
    }

    // رسالة عادية
    if (body.message) return body.message;
    if (body.title) return body.title;
    if (typeof body === 'string') return body;

    return 'حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.';
  }

  // ترجمة بعض رسائل الـ backend الشائعة للعربي
  private translateBackendMsg(msg: string): string {
    const map: Record<string, string> = {
      'Invalid phone number format.':
        'صيغة رقم الهاتف غير صحيحة (يجب أن يكون 10 أرقام)',
      'Phone number must be 10 digits.':
        'يجب أن يكون رقم الهاتف 10 أرقام بالضبط',
      'The field PhoneNumber must be a string or array type with a maximum length of 10.':
        'رقم الهاتف يجب ألا يتجاوز 10 أرقام',
      'is required.': 'هذا الحقل مطلوب',
      'already exists': 'هذا السجل موجود مسبقاً',
    };
    for (const [en, ar] of Object.entries(map)) {
      if (msg.toLowerCase().includes(en.toLowerCase())) return ar;
    }
    return msg;
  }

  onSubmit() {
    // إرسال النموذج
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      // خطأ رقم الهاتف له رسالة مخصصة
      const phone = this.employeeForm.get('phoneNumber');
      if (phone?.errors?.['pattern']) {
        Swal.fire({
          icon: 'warning',
          title: 'رقم هاتف غير صحيح',
          text: 'رقم الهاتف يجب أن يتكون من 10 أرقام فقط (أرقام فقط بدون مسافات أو رموز)',
          confirmButtonText: 'حسناً',
        });
        return;
      }

      Swal.fire({
        icon: 'warning',
        title: 'بيانات ناقصة',
        text: 'يرجى التأكد من تعبئة جميع الحقول المطلوبة بشكل صحيح',
        confirmButtonText: 'حسناً',
      });
      return;
    }

    this.isLoading = true;
    const rawValues = this.employeeForm.getRawValue();

    const payload = {
      ...rawValues,
      departmentId: Number(rawValues.departmentId),
      positionId: Number(rawValues.positionId),
      hireDate: rawValues.hireDate
        ? new Date(rawValues.hireDate).toISOString()
        : new Date().toISOString(),
    };

    if (this.isEditMode && this.currentEmployeeId) {
      this.employeeService
        .updateEmployee(this.currentEmployeeId, payload)
        .subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire('Success', 'Employee details updated successfully', 'success');
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            this.isLoading = false;
            const msg = this.parseBackendError(err);
            Swal.fire({
              icon: 'error',
              title: 'فشل التعديل',
              text: msg,
              confirmButtonText: 'حسناً',
            });
            console.error('Update error:', err);
          },
        });
    } else {
      this.employeeService.addEmployee(payload).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('Success', 'Employee added successfully', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.isLoading = false;
          const msg = this.parseBackendError(err);
          Swal.fire({
            icon: 'error',
            title: 'فشل الإضافة',
            text: msg,
            confirmButtonText: 'حسناً',
          });
          console.error('Add error:', err);
        },
      });
    }
  }
}

```

### File: src\app\features\employees\employees.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { LeaveService } from '../../core/services/leave.service';
import { SalaryService } from '../../core/services/salary.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private attendanceService = inject(AttendanceService);
  private leaveService = inject(LeaveService);
  private salaryService = inject(SalaryService);

  allEmployeesList: any[] = [];
  employeesList: any[] = [];
  isLoading: boolean = true;
  isGeneratingReport: boolean = false;
  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;
  selectedEmployeeProfile: any = null;

  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  uniqueDepartments: string[] = [];

  detailsModal: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employeesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.employeesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  showToast(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }

  ngOnInit() {
    // أول تحميل
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadEmployees();
  }

  getRoleBadgeClass(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      case 2:
        return 'bg-warning bg-opacity-10 text-dark border border-warning border-opacity-25';
      default:
        return 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25';
    }
  }

  // --- Export to Excel (CSV) ---
  exportToExcel() {
    if (this.employeesList.length === 0) {
      Swal.fire('No Data', 'There are no employees to export.', 'info');
      return;
    }

    const headers = [
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Address',
      'Status',
      'Role ID',
    ];

    const csvData = this.employeesList.map((emp) => {
      return [
        emp.id,
        emp.firstName || '',
        emp.lastName || '',
        emp.email || '',
        emp.phoneNumber || 'N/A',
        emp.address || 'N/A',
        emp.isActive ? 'Active' : 'Inactive',
        emp.roleId || 'N/A',
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    });

    // Add UTF-8 BOM for Excel to read Arabic/Special characters correctly
    // Add sep=, to force Excel to recognize comma as delimiter regardless of region
    const csvContent =
      '\uFEFFsep=,\r\n' + [headers.join(','), ...csvData].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Employees_Kawadir_${new Date().toISOString().split('T')[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported Successfully',
      text: 'Employees list has been exported to Excel (CSV).',
      timer: 2000,
      showConfirmButton: false,
    });
  }

  getEmpInitials(emp: any): string {
    const name =
      emp?.fullName ||
      `${emp?.firstName || ''} ${emp?.lastName || ''}`.trim() ||
      'E';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  loadEmployees() {
    // تحميل الموظفين
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.allEmployeesList = data;
        this.employeesList = [...this.allEmployeesList];

        const depts = data
          .map((e: any) => e.departmentName || e.departmentId)
          .filter(Boolean);
        this.uniqueDepartments = Array.from(new Set(depts)) as string[];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;
      },
    });
  }

  filterEmployees() {
    // فلترة القائمة
    this.employeesList = this.allEmployeesList.filter((emp) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const fullName =
          `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        const deptStr = String(
          emp.departmentName || emp.departmentId || '',
        ).toLowerCase();

        matchesSearch =
          fullName.includes(query) ||
          idStr.includes(query) ||
          deptStr.includes(query);
      }

      let matchesDept = true;
      if (this.selectedDepartment) {
        matchesDept =
          (emp.departmentName || String(emp.departmentId)) ===
          this.selectedDepartment;
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        matchesStatus =
          this.selectedStatus === 'Active' ? emp.isActive : !emp.isActive;
      }

      return matchesSearch && matchesDept && matchesStatus;
    });

    this.currentPage = 1; // Reset to first page on filter
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.employeesList = this.employeesList.filter(
              (emp) => emp.id !== id,
            );

            // Adjust pagination if needed
            if (this.currentPage > this.totalPages) {
              this.currentPage = this.totalPages;
            }

            this.showToast('Employee deleted successfully', 'success');
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            this.showToast('Failed to delete employee', 'error');
          },
        });
      }
    });
  }

  viewFullDetails(emp: any) {
    // تفاصيل الموظف
    this.selectedEmployeeProfile = { ...emp, isLoadingDetails: true };

    const modalElement = document.getElementById('employeeDetailsModal');
    if (modalElement) {
      this.detailsModal = new bootstrap.Modal(modalElement);
      this.detailsModal.show();
    }

    this.employeeService.getEmployeeFullProfile(emp.id).subscribe({
      next: (profile) => {
        this.selectedEmployeeProfile = {
          ...emp,
          ...profile,
          isLoadingDetails: false,
        };
      },
      error: () => {
        this.selectedEmployeeProfile = { ...emp, isLoadingDetails: false };
      },
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee-form'], {
      state: { editMode: true, employeeId: id },
    });
  }

  downloadEmployeeReport(emp: any) {
    // تقرير الموظف
    if (!emp) return;

    this.isGeneratingReport = true;
    const empName =
      `${emp.firstName || ''} ${emp.lastName || ''}`.trim() ||
      `Employee #${emp.id}`;

    // Fetch all data in parallel
    forkJoin({
      attendance: this.attendanceService
        .getAllAttendance()
        .pipe(catchError(() => of([]))),
      leaves: this.leaveService.getAllLeaves().pipe(catchError(() => of([]))),
      salaries: this.salaryService
        .getAllSalaries()
        .pipe(catchError(() => of([]))),
    }).subscribe(({ attendance, leaves, salaries }) => {
      this.isGeneratingReport = false;

      // Filter data for this specific employee
      const empAttendance = attendance
        .filter((a: any) => a.employeeId === emp.id)
        .sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        .slice(0, 15);

      const empLeaves = leaves
        .filter((l: any) => l.employeeId === emp.id)
        .sort(
          (a: any, b: any) =>
            new Date(b.startDate || 0).getTime() -
            new Date(a.startDate || 0).getTime(),
        );

      const empSalaries = salaries
        .filter((s: any) => s.employeeId === emp.id)
        .sort((a: any, b: any) => {
          if (b.year !== a.year) return b.year - a.year;
          return b.month - a.month;
        });

      this.buildEmployeePDF(
        emp,
        empName,
        empAttendance,
        empLeaves,
        empSalaries,
      );
    });
  }

  private buildEmployeePDF(
    emp: any,
    empName: string,
    attendance: any[],
    leaves: any[],
    salaries: any[],
  ) {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    // ✅ W3 Fix: تأكد من صحة كل أنواع الإجازات بما يطابق Backend enum
    const leaveTypeMap: any = {
      0: 'Annual',
      1: 'Sick',
      2: 'Emergency',
      3: 'Unpaid',
      Annual: 'Annual',
      Sick: 'Sick',
      Emergency: 'Emergency',
      Unpaid: 'Unpaid',
    };
    const statusMap: any = {
      0: 'Pending',
      1: 'Approved',
      2: 'Rejected',
      Pending: 'Pending',
      Approved: 'Approved',
      Rejected: 'Rejected',
    };

    // ── HEADER BANNER ──────────────────────────────
    doc.setFillColor(67, 97, 238);
    doc.rect(0, 0, pageW, 38, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('Kawadir HRMS', 14, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Employee Monthly Report', 14, 22);
    doc.text(`Generated: ${todayStr}`, 14, 29);

    // ── EMPLOYEE INFO CARD ─────────────────────────
    doc.setFillColor(248, 249, 252);
    doc.roundedRect(10, 44, pageW - 20, 38, 3, 3, 'F');
    doc.setDrawColor(225, 228, 240);
    doc.roundedRect(10, 44, pageW - 20, 38, 3, 3, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 50);
    doc.text(empName, 18, 55);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 120);
    doc.text(`Employee ID: #${emp.id}`, 18, 62);
    doc.text(`Department: ${emp.departmentName || '—'}`, 18, 68);
    doc.text(`Position: ${emp.positionTitle || '—'}`, 18, 74);

    const hireDate = emp.hireDate ? emp.hireDate.split('T')[0] : '—';
    doc.text(`Hire Date: ${hireDate}`, pageW / 2, 62);
    doc.text(`Email: ${emp.email || '—'}`, pageW / 2, 68);
    doc.text(
      `Status: ${emp.isActive !== false ? 'Active' : 'Inactive'}`,
      pageW / 2,
      74,
    );

    let curY = 90;

    // ── SALARY SECTION ────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(67, 97, 238);
    doc.text('SALARY HISTORY', 14, curY);
    doc.setDrawColor(67, 97, 238);
    doc.setLineWidth(0.5);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (salaries.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No salary records found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [
          [
            'Month',
            'Year',
            'Base ($)',
            'Allowances ($)',
            'Deductions ($)',
            'Net Pay ($)',
          ],
        ],
        body: salaries
          .slice(0, 6)
          .map((s: any) => [
            s.month,
            s.year,
            `$${s.baseAmount ?? '—'}`,
            `+$${s.allowances ?? 0}`,
            `-$${s.deductions ?? 0}`,
            `$${s.netAmount ?? '—'}`,
          ]),
        theme: 'grid',
        headStyles: {
          fillColor: [240, 243, 255],
          textColor: [50, 50, 80],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [252, 253, 255] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // ── ATTENDANCE SECTION ────────────────────────
    if (curY > 230) {
      doc.addPage();
      curY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(25, 135, 84);
    doc.text('RECENT ATTENDANCE (Last 15 Records)', 14, curY);
    doc.setDrawColor(25, 135, 84);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (attendance.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No attendance records found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [['Date', 'Clock In', 'Clock Out', 'Hours', 'Status']],
        body: attendance.map((a: any) => [
          a.date ? a.date.split('T')[0] : '—',
          a.clockIn || '—',
          a.clockOut && a.clockOut !== '00:00:00' ? a.clockOut : '—',
          a.totalHours || '—',
          a.clockOut && a.clockOut !== '00:00:00' ? 'Completed' : 'Working',
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [232, 248, 240],
          textColor: [20, 80, 50],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 253, 250] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // ── LEAVE SECTION ─────────────────────────────
    if (curY > 230) {
      doc.addPage();
      curY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(220, 53, 69);
    doc.text('LEAVE REQUESTS', 14, curY);
    doc.setDrawColor(220, 53, 69);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (leaves.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No leave requests found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [['Type', 'Start Date', 'End Date', 'Days', 'Status']],
        body: leaves.map((l: any) => [
          leaveTypeMap[l.leaveType] || l.leaveType,
          l.startDate ? l.startDate.split('T')[0] : '—',
          l.endDate ? l.endDate.split('T')[0] : '—',
          l.totalDays ?? '—',
          statusMap[l.status] || l.status,
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [255, 240, 242],
          textColor: [100, 20, 30],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [255, 248, 249] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // ── SUMMARY BOX ────────────────────────────────
    if (curY > 235) {
      doc.addPage();
      curY = 20;
    }

    const approvedLeaves = leaves.filter(
      (l: any) => l.status === 1 || l.status === 'Approved',
    );
    const totalLeaveDays = approvedLeaves.reduce(
      (acc: number, l: any) => acc + (l.totalDays || 0),
      0,
    );
    const completedSessions = attendance.filter(
      (a: any) => a.clockOut && a.clockOut !== '00:00:00',
    ).length;
    const latestSalary = salaries[0];

    doc.setFillColor(240, 243, 255);
    doc.roundedRect(10, curY, pageW - 20, 32, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(67, 97, 238);
    doc.text('REPORT SUMMARY', 18, curY + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(50, 50, 80);
    doc.text(
      `Total Attendance Records: ${attendance.length}   |   Completed Sessions: ${completedSessions}`,
      18,
      curY + 16,
    );
    doc.text(
      `Total Approved Leave Days: ${totalLeaveDays}   |   Latest Net Salary: $${latestSalary?.netAmount ?? 'N/A'}`,
      18,
      curY + 23,
    );

    // ── FOOTER ────────────────────────────────────
    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text(
        'Confidential – Kawadir HRMS – System Generated Report',
        14,
        doc.internal.pageSize.getHeight() - 8,
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageW - 30,
        doc.internal.pageSize.getHeight() - 8,
      );
    }

    const fileName = `Report_${empName.replace(/ /g, '_')}_${todayStr}.pdf`;
    doc.save(fileName);
  }
}

```

### File: src\app\features\leave\leave.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../core/services/leave.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);

  allLeavesList: any[] = [];
  leavesList: any[] = [];

  leaveSearchQuery: string = '';
  selectedLeaveStatus: string = '';
  selectedLeaveType: string = '';

  isLoading: boolean = true;
  isProcessing: boolean = false;

  isAdminOrHR: boolean = false;
  employeeAnnualLeaveBalance: number | string = 14;

  leaveModal: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedLeaves() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.leavesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.leavesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  leaveData = {
    leaveType: 0,
    startDate: '',
    endDate: '',
    reason: '',
  };

  leaveTypes = [
    { id: 0, name: 'Annual' },
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Emergency' }, // ✅ يطابق Backend enum: Emergency=2
    { id: 3, name: 'Unpaid' }, // ✅ يطابق Backend enum: Unpaid=3
  ];

  ngOnInit() {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadLeaves();
  }

  loadLeaves() {
    // تحميل الإجازات
    this.isLoading = true;

    const request = this.isAdminOrHR
      ? this.leaveService.getAllLeaves()
      : this.leaveService.getMyLeaves();

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];

        if (Array.isArray(res)) {
          extracted = res;
        } else if (res?.data?.items && Array.isArray(res.data.items)) {
          extracted = res.data.items;
        } else if (res?.data && Array.isArray(res.data)) {
          extracted = res.data;
        }

        this.allLeavesList = extracted;
        this.leavesList = [...this.allLeavesList];

        if (this.isAdminOrHR && this.leavesList.length > 0) {
          this.leavesList.sort((a, b) => {
            const statusA = this.getStatusText(a.status);
            const statusB = this.getStatusText(b.status);

            if (statusA === 'Pending' && statusB !== 'Pending') return -1;
            if (statusA !== 'Pending' && statusB === 'Pending') return 1;

            return (
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            );
          });
        } else if (!this.isAdminOrHR) {
          // ✅ Include both 'Approved' and 'Pending' to correctly decrease available balance
          const usedAnnualLeavesDays = this.allLeavesList
            .filter(
              (l: any) => (this.getStatusText(l.status) === 'Approved' || this.getStatusText(l.status) === 'Pending') && this.getLeaveTypeText(l.leaveType) === 'Annual',
            )
            .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);
          this.employeeAnnualLeaveBalance = 14 - usedAnnualLeavesDays;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
        this.isLoading = false;
        this.leavesList = [];
      },
    });
  }

  filterLeaves() {
    // فلترة الإجازات
    this.leavesList = this.allLeavesList.filter((l) => {
      let matchesSearch = true;
      if (this.leaveSearchQuery) {
        const query = this.leaveSearchQuery.toLowerCase();
        const empName = (l.employeeName || '').toLowerCase();
        const empId = String(l.employeeId || '');
        const reason = (l.reason || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          reason.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedLeaveStatus) {
        matchesStatus =
          this.getStatusText(l.status).toLowerCase() ===
          this.selectedLeaveStatus.toLowerCase();
      }

      let matchesType = true;
      if (this.selectedLeaveType) {
        // الـ backend يرجع string مثل "Annual" أو رقم مثل 0
        // نحوّل كلاهما لاسم ونقارن بـ case-insensitive
        const leaveTypeName = this.getLeaveTypeText(l.leaveType).toLowerCase();
        matchesType = leaveTypeName === this.selectedLeaveType.toLowerCase();
      }

      return matchesSearch && matchesStatus && matchesType;
    });

    this.currentPage = 1;
    if (this.leavesList.length > 0) {
      this.leavesList.sort((a, b) => {
        if (this.isAdminOrHR) {
          const statusA = this.getStatusText(a.status);
          const statusB = this.getStatusText(b.status);
          if (statusA === 'Pending' && statusB !== 'Pending') return -1;
          if (statusA !== 'Pending' && statusB === 'Pending') return 1;
        }
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
    }
  }

  getStatusText(statusCode: any): string {
    // ✅ Backend يُرجع string مباشرة من MappingProfile (.ToString())
    if (typeof statusCode === 'string' && isNaN(Number(statusCode))) {
      return statusCode; // 'Pending' | 'Approved' | 'Rejected'
    }
    // توافقية مع القيم الرقمية القديمة
    if (statusCode === 0 || statusCode === '0') return 'Pending';
    if (statusCode === 1 || statusCode === '1') return 'Approved';
    if (statusCode === 2 || statusCode === '2') return 'Rejected';
    return statusCode?.toString() || 'Unknown';
  }

  getLeaveTypeText(typeCode: any): string {
    // ✅ Backend يُرجع string مباشرة: 'Annual', 'Sick', 'Emergency', 'Unpaid'
    if (typeof typeCode === 'string' && isNaN(Number(typeCode))) {
      const found = this.leaveTypes.find(
        (t) => t.name.toLowerCase() === typeCode.toLowerCase(),
      );
      return found
        ? found.name
        : typeCode.charAt(0).toUpperCase() + typeCode.slice(1);
    }
    // توافقية مع القيم الرقمية
    const type = this.leaveTypes.find((t) => t.id === Number(typeCode));
    return type ? type.name : typeCode != null ? String(typeCode) : 'Unknown';
  }

  showRejectionReason(reason: string) {
    Swal.fire({
      icon: 'info',
      title: 'Rejection Reason',
      text: reason || 'No additional reason provided.',
      confirmButtonText: 'Close',
      confirmButtonColor: '#3085d6'
    });
  }

  openModal() {
    this.leaveData = { leaveType: 0, startDate: '', endDate: '', reason: '' };
    const modalEl = document.getElementById('leaveModal');
    if (modalEl) {
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalEl);
      }
      this.leaveModal = modalInstance;
      this.leaveModal.show();
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  submitLeaveRequest() {
    // إرسال طلب الإجازة
    if (this.leaveData.startDate < this.getToday()) {
      Swal.fire('Invalid Date', 'Start Date cannot be in the past.', 'warning');
      return;
    }

    if (this.leaveData.endDate < this.leaveData.startDate) {
      Swal.fire(
        'Invalid Date',
        'End Date cannot be before the Start Date.',
        'warning',
      );
      return;
    }

    // Calculate requested days
    const start = new Date(this.leaveData.startDate);
    const end = new Date(this.leaveData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive

    if (Number(this.leaveData.leaveType) === 0) { // Annual
      if (diffDays > Number(this.employeeAnnualLeaveBalance)) {
        Swal.fire('Insufficient Balance', `You are requesting ${diffDays} days, but you only have ${this.employeeAnnualLeaveBalance} annual leave days remaining.`, 'warning');
        return;
      }
    }

    this.isProcessing = true;
    const payload = {
      leaveType: Number(this.leaveData.leaveType),
      startDate: new Date(this.leaveData.startDate).toISOString(),
      endDate: new Date(this.leaveData.endDate).toISOString(),
      reason: this.leaveData.reason,
      status: 0,
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.leaveModal.hide();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.loadLeaves();
      },
      error: (err) => {
        this.isProcessing = false;
        Swal.fire(
          'Error',
          getFriendlyErrorMessage(
            err,
            'Failed to submit leave request. Please try again.',
          ),
          'warning',
        );
      },
    });
  }

  changeStatus(id: number, newStatusCode: number) {
    // تغيير الحالة
    if (newStatusCode === 2) {
      Swal.fire({
        title: 'Reject Leave Request',
        text: 'Please provide a reason for rejection:',
        input: 'textarea',
        inputPlaceholder: 'Type your reason here...',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545',
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return 'You need to write a rejection reason!';
          }
          return null;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.executeStatusChange(id, newStatusCode, result.value);
        }
      });
    } else {
      this.executeStatusChange(id, newStatusCode);
    }
  }

  private executeStatusChange(
    id: number,
    newStatusCode: number,
    rejectionReason?: string,
  ) {
    this.leaveService
      .updateLeaveStatus(id, newStatusCode, rejectionReason)
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Status changed.', 'success');
          this.loadLeaves();
        },
        error: (err) => {
          console.error('Status update error:', err);
          Swal.fire(
            'Error!',
            getFriendlyErrorMessage(
              err,
              'Failed to update leave status. Please try again.',
            ),
            'error',
          );
        },
      });
  }
}

```

### File: src\app\features\leave-form\leave-form.component.ts
```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LeaveService } from '../../core/services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './leave-form.component.html',
})
export class LeaveFormComponent {
  private leaveService = inject(LeaveService);
  private router = inject(Router);

  isLoading = false;
  loadingMessage = 'Submitting...';
  private slowWarningTimer: any;

  leaveForm = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    reason: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(500),
    ]),
  });

  onSubmit() {
    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill all required fields. Note: Reason must be at least 5 characters long.',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }

    this.isLoading = true;
    const formValue = this.leaveForm.value;

    const newLeave = {
      // ✅ حوّل لرقم حتى يطابق Backend enum
      leaveType: Number(formValue.leaveType),
      startDate: new Date(formValue.startDate!).toISOString(),
      endDate: new Date(formValue.endDate!).toISOString(),
      reason: formValue.reason,
    };

    // show slow-server warning after 6 seconds
    this.slowWarningTimer = setTimeout(() => {
      this.loadingMessage = 'Server is starting up, please wait a moment...';
    }, 6000);

    this.leaveService.applyLeave(newLeave).subscribe({
      next: (res) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Done!', text: 'Leave request submitted successfully.', timer: 2000, showConfirmButton: false });
        this.router.navigate(['/leave']);
      },
      error: (err) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire('Error', 'Could not submit leave request. Please try again.', 'error');
      },
    });
  }
}

```

### File: src\app\features\meetings\meetings.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MeetingService } from '../../core/services/meeting.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Meeting, MeetingStatus, CreateMeetingDto } from '../../core/models/meeting.model';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { Observable } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private meetingService = inject(MeetingService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  meetings: Meeting[] = [];
  employees: any[] = [];
  isLoading = false;
  isSubmitting = false;

  addForm: FormGroup;
  MeetingStatus = MeetingStatus;
  userRole = this.authService.getUserRole();

  pageNumber = 1;
  pageSize = 100;

  constructor() {
    this.addForm = this.fb.group({
      employeeId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required],
      durationMinutes: [30, [Validators.required, Validators.min(15)]]
    });
  }

  ngOnInit(): void {
    if (this.userRole === 'Admin' || this.userRole === 'HR') {
      this.loadAllMeetings();
      this.loadEmployees();
    } else {
      this.loadMyMeetings();
    }
  }

  get isHrOrAdmin(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'HR';
  }

  loadAllMeetings() {
    this.isLoading = true;
    this.meetingService.getAll(this.pageNumber, this.pageSize).subscribe({
      next: (res: any) => {
        this.meetings = res.data?.items || res.items || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load meetings', 'error');
      }
    });
  }

  loadMyMeetings() {
    this.isLoading = true;
    this.meetingService.getMyMeetings(this.pageNumber, this.pageSize).subscribe({
      next: (res: any) => {
        this.meetings = res.data?.items || res.items || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load your meetings', 'error');
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  openAddModal() {
    this.addForm.reset({ durationMinutes: 30 });
    const modalEl = document.getElementById('addMeetingModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  closeModal(modalId: string) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      }
    }
  }

  onSubmit() {
    if (this.addForm.invalid) return;

    this.isSubmitting = true;
    const formValues = this.addForm.value;
    
    // Combine Date and Time
    const combinedDateTime = new Date(`${formValues.meetingDate}T${formValues.meetingTime}`);
    
    const dto: CreateMeetingDto = {
      title: formValues.title,
      reason: formValues.reason,
      employeeId: Number(formValues.employeeId),
      scheduledAt: combinedDateTime.toISOString(),
      durationMinutes: formValues.durationMinutes,
      notes: formValues.reason
    };

    this.meetingService.create(dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModal('addMeetingModal');
        Swal.fire('Success', 'Meeting scheduled successfully', 'success');
        if (this.isHrOrAdmin) {
          this.loadAllMeetings();
        } else {
          this.loadMyMeetings();
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire('Error', err.error?.message || 'Failed to schedule meeting', 'error');
      }
    });
  }

  updateStatus(id: number, status: MeetingStatus) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update the status of this meeting?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let updateObservable: Observable<void>;
        if (status === MeetingStatus.Cancelled) {
          updateObservable = this.meetingService.cancel(id);
        } else if (status === MeetingStatus.Completed) {
          updateObservable = this.meetingService.complete(id);
        } else {
          return;
        }

        updateObservable.subscribe({
          next: () => {
            Swal.fire('Updated!', 'Meeting status updated.', 'success');
            if (this.isHrOrAdmin) {
              this.loadAllMeetings();
            } else {
              this.loadMyMeetings();
            }
          },
          error: () => {
            Swal.fire('Error', 'Failed to update status', 'error');
          }
        });
      }
    });
  }

  getStatusBadgeClass(status: any): string {
    const s = String(status);
    switch (s) {
      case '0':
      case 'Scheduled': return 'bg-primary';
      case '1':
      case 'Completed': return 'bg-success';
      case '2':
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getStatusLabel(status: any): string {
    const s = String(status);
    switch (s) {
      case '0':
      case 'Scheduled': return 'Scheduled';
      case '1':
      case 'Completed': return 'Completed';
      case '2':
      case 'Cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  }
}

```

### File: src\app\features\my-profile\my-profile.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  profile: any = null;
  isLoading: boolean = true;
  isAdmin: boolean = false;
  userName: string = '';
  userRole: string = '';
  userEmail: string = '';

  editData = { email: '', phone: '' };
  pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
  isUpdatingProfile = false;
  isChangingPwd = false;

  ngOnInit() {
    // تحميل البيانات
    this.isAdmin = this.authService.isAdmin();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    if (this.isAdmin) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userEmail =
            payload['email'] ||
            payload[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ] ||
            '';
        } catch {}
      }
      this.isLoading = false;
    } else {
      this.loadMyProfile();
    }
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getProfileInitials(): string {
    const name = this.profile?.fullName || this.userName || 'U';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  loadMyProfile() {
    // جلب بروفايلي
    this.isLoading = true;
    this.employeeService.getMyProfile().subscribe({
      next: (res: any) => {
        this.profile = res?.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my profile:', err);
        this.isLoading = false;
      },
    });
  }

  openEditModal() {
    this.editData.email = this.profile?.email || this.userEmail || '';
    this.editData.phone =
      this.profile?.phone || this.profile?.phoneNumber || '';
    this.pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  saveProfile() {
    // حفظ التعديلات
    let requestsPending = 0;
    let hasError = false;

    // 1. Password Update
    if (this.pwdData.oldPassword && this.pwdData.newPassword) {
      requestsPending++;
      this.isChangingPwd = true;
      this.authService
        .changePassword({
          oldPassword: this.pwdData.oldPassword,
          newPassword: this.pwdData.newPassword,
        })
        .subscribe({
          next: () => {
            this.isChangingPwd = false;
            requestsPending--;
            this.checkDone(requestsPending, hasError);
          },
          error: (err) => {
            this.isChangingPwd = false;
            hasError = true;
            requestsPending--;
            Swal.fire(
              'Error',
              getFriendlyErrorMessage(
                err,
                'Failed to change password. Please check your current password and try again.',
              ),
              'error',
            );
            this.checkDone(requestsPending, hasError);
          },
        });
    }

    // 2. Profile Info Update
    const emailChanged =
      this.editData.email !== (this.profile?.email || this.userEmail);
    const phoneChanged =
      this.profile &&
      this.editData.phone !==
        (this.profile?.phone || this.profile?.phoneNumber);

    if (emailChanged || phoneChanged) {
      if (this.profile && this.profile.id) {
        requestsPending++;
        this.isUpdatingProfile = true;

        // Prepare updated employee object
        const updatedEmp = {
          ...this.profile,
          email: this.editData.email,
          phone: this.editData.phone,
          phoneNumber: this.editData.phone,
        };

        this.employeeService
          .updateEmployee(this.profile.id, updatedEmp)
          .subscribe({
            next: () => {
              this.isUpdatingProfile = false;
              this.profile.email = this.editData.email;
              this.profile.phone = this.editData.phone;
              this.userEmail = this.editData.email;

              requestsPending--;
              this.checkDone(requestsPending, hasError);
            },
            error: (err) => {
              this.isUpdatingProfile = false;
              hasError = true;
              requestsPending--;
              Swal.fire(
                'Error',
                getFriendlyErrorMessage(
                  err,
                  'Failed to update profile. Please try again.',
                ),
                'error',
              );
              this.checkDone(requestsPending, hasError);
            },
          });
      } else {
        // Admin without employee profile
        this.userEmail = this.editData.email;
        // There might not be an endpoint to update Admin user email alone,
        // but we update it locally for UX.
      }
    }

    if (requestsPending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private checkDone(pending: number, hasError: boolean) {
    if (pending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private closeModalAndShowSuccess() {
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

```

### File: src\app\features\payroll-adjustments\payroll-adjustments.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PayrollAdjustmentService } from '../../core/services/payroll-adjustments.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { AdjustmentType, PayrollAdjustmentDto } from '../../core/models/payroll-adjustment.model';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-payroll-adjustments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './payroll-adjustments.component.html',
  styleUrls: ['./payroll-adjustments.component.css']
})
export class PayrollAdjustmentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adjustmentService = inject(PayrollAdjustmentService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  adjustments: PayrollAdjustmentDto[] = [];
  employees: any[] = [];
  isLoading = false;
  isSubmitting = false;
  isAdminOrHR = false;

  addForm: FormGroup;
  adjustmentTypes = [
    { value: AdjustmentType.Penalty, label: 'Penalty (Deduction)' },
    { value: AdjustmentType.Bonus, label: 'Bonus (Allowance)' }
  ];

  pageNumber = 1;
  pageSize = 100;
  totalItems = 0;

  constructor() {
    this.addForm = this.fb.group({
      employeeId: ['', Validators.required],
      type: [AdjustmentType.Penalty, Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      reason: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    
    this.loadAdjustments();
    if (this.isAdminOrHR) {
      this.loadEmployees();
    }
  }

  loadAdjustments() {
    this.isLoading = true;
    
    const request = this.isAdminOrHR 
      ? this.adjustmentService.getAll(this.pageNumber, this.pageSize)
      : this.adjustmentService.getMyAdjustments(this.pageNumber, this.pageSize);

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.items && Array.isArray(res.items)) extracted = res.items;
        else if (res?.data?.items && Array.isArray(res.data.items)) extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        
        this.adjustments = extracted;
        this.totalItems = res?.totalCount || res?.data?.totalCount || 0;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        if (err.status !== 401 && err.status !== 403) {
          Swal.fire('Error', 'Failed to load adjustments', 'error');
        }
        this.isLoading = false;
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items)) extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.employees = extracted;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  openAddModal() {
    this.addForm.reset({ type: AdjustmentType.Penalty });
    const modalElement = document.getElementById('addAdjustmentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveAdjustment() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const dto = this.addForm.value;

    this.adjustmentService.create(dto).subscribe({
      next: () => {
        Swal.fire('Success', 'Adjustment created successfully', 'success');
        this.loadAdjustments();
        this.isSubmitting = false;
        const modalElement = document.getElementById('addAdjustmentModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire('Error', 'Failed to create adjustment', 'error');
        this.isSubmitting = false;
      }
    });
  }

  deleteAdjustment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adjustmentService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Adjustment has been deleted.', 'success');
            this.loadAdjustments();
          },
          error: (err: any) => {
            console.error(err);
            Swal.fire('Error!', 'Failed to delete adjustment. It may have already been applied.', 'error');
          }
        });
      }
    });
  }

  getEmployeeName(id: number): string {
    const emp = this.employees.find(e => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : `Unknown (#${id})`;
  }
}

```

### File: src\app\features\positions\positions.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionService } from '../../core/services/position.service';
import { DepartmentService } from '../../core/services/department.service';
import Swal from 'sweetalert2';

import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

declare var bootstrap: any;

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './positions.component.html',
})
export class PositionsComponent implements OnInit {
  private positionService = inject(PositionService);
  private departmentService = inject(DepartmentService);

  positionsList: any[] = [];
  departmentsList: any[] = [];
  isLoading: boolean = true;
  isProcessing: boolean = false;

  positionModal: any;
  isEditMode: boolean = false;
  currentPositionId: number | null = null;

  positionData = {
    title: '',
    departmentId: null as number | null,
    salaryMin: 0,
    salaryMax: 0,
  };

  ngOnInit() {
    // أول تحميل
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments() {
    // جلب الأقسام
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.departmentsList = Array.isArray(extracted) ? extracted : [];
      },
      error: (err) => console.error('Error fetching departments:', err),
    });
  }

  loadPositions() {
    // جلب المناصب
    this.isLoading = true;
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.positionsList = Array.isArray(extracted) ? extracted : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching positions:', err);
        this.isLoading = false;
      },
    });
  }

  getDepartmentName(deptId: number): string {
    const dept = this.departmentsList.find((d) => d.id === deptId);
    return dept ? dept.name : `Dept #${deptId}`;
  }

  openModal(position: any = null) {
    // فتح المودال
    if (position) {
      this.isEditMode = true;
      this.currentPositionId = position.id;
      this.positionData = {
        title: position.title,
        departmentId: position.departmentId,
        salaryMin: position.salaryMin,
        salaryMax: position.salaryMax,
      };
    } else {
      this.isEditMode = false;
      this.currentPositionId = null;
      this.positionData = {
        title: '',
        departmentId: null,
        salaryMin: 0,
        salaryMax: 0,
      };
    }

    const modalEl = document.getElementById('positionModal');
    if (modalEl) {
      this.positionModal = new bootstrap.Modal(modalEl);
      this.positionModal.show();
    }
  }

  savePosition() {
    // حفظ المسمى
    this.isProcessing = true;

    if (this.isEditMode && this.currentPositionId) {
      this.positionService
        .updatePosition(this.currentPositionId, this.positionData)
        .subscribe({
          next: () => this.handleSuccess('Position updated successfully'),
          error: (err) => this.handleError(err),
        });
    } else {
      this.positionService.createPosition(this.positionData).subscribe({
        next: () => this.handleSuccess('Position created successfully'),
        error: (err) => this.handleError(err),
      });
    }
  }

  onDelete(id: number) {
    // حذف المسمى
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deletePosition(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Position has been deleted.', 'success');
            this.loadPositions();
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Failed to delete position.', 'error');
          },
        });
      }
    });
  }

  private handleSuccess(message: string) {
    this.isProcessing = false;
    this.positionModal.hide();
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    this.loadPositions();
  }

  private handleError(err: any) {
    this.isProcessing = false;
    console.error('Position save error:', err);
    Swal.fire('Error', getFriendlyErrorMessage(err, 'Failed to save position data.'), 'error');
  }
}

```

### File: src\app\features\salary\salary.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // لازم للـ forms
import { SalaryService } from '../../core/services/salary.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

declare var bootstrap: any;

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './salary.component.html',
})
export class SalaryComponent implements OnInit {
  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  allSalariesList: any[] = [];
  salariesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false; // أدمن (يضيف ويعدل)
  isAdminOrHR: boolean = false; // أدمن أو hr (يشوف بس)
  isProcessing: boolean = false;
  isViewingAll: boolean = false; // Add toggle state

  salaryModal: any;
  isEditMode: boolean = false;
  currentSalaryId: number | null = null;

  employeesList: any[] = [];
  filteredEmployeesList: any[] = [];
  showEmployeeDropdown: boolean = false;
  employeeSearchText: string = '';

  salarySearchQuery: string = '';
  selectedYear: string = '';
  selectedMonth: string = '';
  uniqueYears: number[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedSalaries() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.salariesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.salariesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  salaryData = {
    employeeId: null as number | null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    baseAmount: 0,
    allowances: 0,
    deductions: 0,
    effectiveDate: new Date().toISOString().split('T')[0],
  };

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    
    if (this.isAdmin) {
        this.isViewingAll = true;
    }

    this.loadSalaries();
    if (this.isAdmin) {
      this.loadEmployees();
    }
  }

  loadEmployees() {
    // تحميل الموظفين
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.employeesList = Array.isArray(extractedData) ? extractedData : [];
        this.filteredEmployeesList = [...this.employeesList];
      },
      error: (err: any) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  onEmployeeSearchChange(val: string) {
    this.showEmployeeDropdown = true;
    if (!val) {
      this.filteredEmployeesList = [...this.employeesList];
      this.salaryData.employeeId = null;
      return;
    }

    const query = val.toLowerCase();
    this.filteredEmployeesList = this.employeesList.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const idStr = String(emp.id);
      return fullName.includes(query) || idStr.includes(query);
    });

    // Reset selected ID if typing changes
    this.salaryData.employeeId = null;
  }

  selectEmployee(emp: any) {
    this.salaryData.employeeId = emp.id;
    this.employeeSearchText = `${emp.firstName} ${emp.lastName}`;
    this.showEmployeeDropdown = false;
  }

  hideDropdownWithDelay() {
    setTimeout(() => {
      this.showEmployeeDropdown = false;
    }, 200);
  }

  loadSalaries() {
    // تحميل الرواتب
    this.isLoading = true;
    const request = (this.isAdminOrHR && this.isViewingAll)
      ? this.salaryService.getAllSalaries()
      : this.salaryService.getMySalaries();

    request.subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.allSalariesList = Array.isArray(extractedData)
          ? extractedData
          : [];
        this.salariesList = [...this.allSalariesList];

        const years = this.allSalariesList
          .map((s) => s.year)
          .filter((y) => y != null);
        this.uniqueYears = Array.from(new Set(years))
          .sort()
          .reverse() as number[];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salaries:', err);
        this.isLoading = false;
      },
    });
  }

  filterSalaries() {
    // فلترة الرواتب
    this.salariesList = this.allSalariesList.filter((s) => {
      let matchesSearch = true;
      if (this.salarySearchQuery) {
        const query = this.salarySearchQuery.toLowerCase();
        const empName = (s.employeeName || '').toLowerCase();
        const empId = String(s.employeeId || '');
        const baseAmt = String(s.baseAmount || '');
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          baseAmt.includes(query);
      }

      let matchesYear = true;
      if (this.selectedYear) {
        matchesYear = String(s.year) === this.selectedYear;
      }

      let matchesMonth = true;
      if (this.selectedMonth) {
        matchesMonth = String(s.month) === this.selectedMonth;
      }

      return matchesSearch && matchesYear && matchesMonth;
    });

    if (this.salariesList.length > 0) {
      this.salariesList.sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year;
        }
        return b.month - a.month;
      });
    }

    this.currentPage = 1; // Reset to first page
  }

  toggleViewAll() {
    this.isViewingAll = !this.isViewingAll;
    this.salarySearchQuery = '';
    this.selectedYear = '';
    this.selectedMonth = '';
    this.loadSalaries();
  }

  openModal(salary: any = null) {
    if (salary) {
      this.isEditMode = true;
      this.currentSalaryId = salary.id;
      this.salaryData = {
        employeeId: salary.employeeId,
        month: salary.month,
        year: salary.year,
        baseAmount: salary.baseAmount,
        allowances: salary.allowances,
        deductions: salary.deductions,
        effectiveDate: salary.effectiveDate
          ? salary.effectiveDate.split('T')[0]
          : '',
      };
      const emp = this.employeesList.find((e) => e.id === salary.employeeId);
      this.employeeSearchText = emp
        ? `${emp.firstName} ${emp.lastName}`
        : salary.employeeId
          ? String(salary.employeeId)
          : '';
    } else {
      this.isEditMode = false;
      this.currentSalaryId = null;
      this.employeeSearchText = '';
      this.salaryData = {
        employeeId: null,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        baseAmount: 0,
        allowances: 0,
        deductions: 0,
        effectiveDate: new Date().toISOString().split('T')[0],
      };
    }

    this.filteredEmployeesList = [...this.employeesList];
    this.showEmployeeDropdown = false;

    const modalEl = document.getElementById('salaryModal');
    if (modalEl) {
      this.salaryModal = new bootstrap.Modal(modalEl);
      this.salaryModal.show();
    }
  }

  saveSalary() {
    // حفظ الراتب
    this.isProcessing = true;

    const isoDate = new Date(this.salaryData.effectiveDate).toISOString();

    const base = Number(this.salaryData.baseAmount) || 0;
    const allow = Number(this.salaryData.allowances) || 0;
    const deduct = Number(this.salaryData.deductions) || 0;

    const calculatedGross = base + allow;
    const calculatedNet = calculatedGross - deduct;

    if (this.isEditMode && this.currentSalaryId) {
      const updatePayload = {
        baseAmount: base,
        allowances: allow,
        deductions: deduct,
        grossAmount: calculatedGross,
        netAmount: calculatedNet,
        effectiveDate: isoDate,
      };

      this.salaryService
        .updateSalary(this.currentSalaryId, updatePayload)
        .subscribe({
          next: () => this.handleSuccess('Salary updated successfully'),
          error: (err) => this.handleError(err),
        });
    } else {
      const createPayload = {
        ...this.salaryData,
        grossAmount: calculatedGross,
        netAmount: calculatedNet,
        effectiveDate: isoDate,
      };

      this.salaryService.createSalary(createPayload).subscribe({
        next: () => this.handleSuccess('Salary record added successfully'),
        error: (err) => this.handleError(err),
      });
    }
  }

  private handleSuccess(message: string) {
    this.isProcessing = false;
    this.salaryModal.hide();
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    this.loadSalaries();
  }

  private handleError(err: any) {
    this.isProcessing = false;
    console.error('Salary save error:', err);
    Swal.fire('Error', getFriendlyErrorMessage(err, 'Failed to save salary data.'), 'error');
  }

  downloadPayslip(salary: any) {
    // تنزيل كشف الراتب
    const doc = new jsPDF();

    // Add Header
    doc.setFontSize(22);
    doc.setTextColor(13, 110, 253);
    doc.text('Kawadir HRMS', 14, 20);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Salary Payslip', 14, 30);

    const today = new Date();
    const dateGen = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date Generated: ${dateGen}`, 14, 38);

    const empName = salary.employeeName || `Employee #${salary.employeeId}`;
    const period = `${salary.month} / ${salary.year}`;

    const effObj = new Date(salary.effectiveDate);
    const effDate = `${effObj.getFullYear()}-${String(effObj.getMonth() + 1).padStart(2, '0')}-${String(effObj.getDate()).padStart(2, '0')}`;

    // Employee Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Employee Name: ${empName}`, 14, 50);
    doc.text(`Payroll Period: ${period}`, 14, 58);
    doc.text(`Effective Date: ${effDate}`, 14, 66);

    // Salary Details Table
    autoTable(doc, {
      startY: 75,
      head: [['Description', 'Amount (JD)']],
      body: [
        ['Base Salary', `${salary.baseAmount} JD`],
        ['Allowances', `+${salary.allowances} JD`],
        ['Gross Salary', `${salary.grossAmount} JD`],
        ['Deductions', `-${salary.deductions} JD`],
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [240, 242, 245],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      bodyStyles: { textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [252, 252, 252] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 130;

    // Net Pay Highlight
    doc.setFontSize(14);
    doc.setTextColor(25, 135, 84);
    doc.setFont('helvetica', 'bold');
    doc.text(`Net Pay: ${salary.netAmount} JD`, 14, finalY + 15);

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'This is a system generated payslip and requires no signature.',
      14,
      finalY + 40,
    );

    // Download
    const fileName = `Payslip_${empName.replace(/ /g, '_')}_${salary.month}_${salary.year}.pdf`;
    doc.save(fileName);
  }
}

```

### File: src\app\shared\header\header.component.ts
```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar.service';
import { SettingsService } from '../../core/services/settings.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { PwaService } from '../../core/services/pwa.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  
  // ✅ public حتى نستخدمه في الـ template
  pwaService = inject(PwaService);
  settingsService = inject(SettingsService);

  notifications: any[] = [];
  unreadCount: number = 0;
  private pollingSub?: Subscription;

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  installApp() {
    this.pwaService.promptInstall();
  }

  ngOnInit() {
    this.loadNotifications();
    this.pollingSub = interval(5000).subscribe(() => {
      this.loadNotifications();
    });
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.items) extracted = res.items;

        this.notifications = extracted;
        this.unreadCount = this.notifications.filter((n) => !n.isRead).length;
      },
      error: (err) => console.error('Error fetching notifications:', err),
    });
  }

  markAsRead(notification: any) {
    if (notification.isRead) {
      this.navigateBasedOnNotification(notification);
      return;
    }

    this.notificationService.markAsRead(notification.id).subscribe({
      next: () => {
        notification.isRead = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.navigateBasedOnNotification(notification);
      },
      error: (err) => console.error('Error marking as read:', err),
    });
  }

  markAllAsRead(event: Event) {
    event.stopPropagation(); // لمنع إغلاق القائمة المنسدلة
    if (this.unreadCount === 0) return;

    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach(n => n.isRead = true);
        this.unreadCount = 0;
      },
      error: (err) => console.error('Error marking all as read:', err),
    });
  }

  deleteNotification(event: Event, id: number) {
    event.stopPropagation();
    this.notificationService.deleteNotification(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.unreadCount = this.notifications.filter((n) => !n.isRead).length;
      },
      error: (err) => console.error('Error deleting notification:', err)
    });
  }

  deleteAllNotifications(event: Event) {
    event.stopPropagation();
    if (this.notifications.length === 0) return;

    this.notificationService.deleteAllNotifications().subscribe({
      next: () => {
        this.notifications = [];
        this.unreadCount = 0;
      },
      error: (err) => console.error('Error deleting all notifications:', err)
    });
  }

  private navigateBasedOnNotification(notif: any) {
    const type = notif.type || '';
    const msg = (notif.message || '').toLowerCase();

    if (
      type.includes('Leave') ||
      msg.includes('leave') ||
      msg.includes('مغادرة') ||
      msg.includes('إجازة')
    ) {
      this.router.navigate(['/leave']);
    } else if (
      type.includes('Salary') ||
      msg.includes('salary') ||
      msg.includes('راتب')
    ) {
      this.router.navigate(['/salary']);
    } else if (
      type.includes('Clock') ||
      msg.includes('attendance') ||
      msg.includes('حضور')
    ) {
      this.router.navigate(['/attendance']);
    } else if (
      type.includes('Meeting') ||
      msg.includes('meeting') ||
      msg.includes('اجتماع') ||
      msg.includes('مقابلة') ||
      msg.includes('interview')
    ) {
      this.router.navigate(['/meetings']);
    } else if (
      type.includes('Adjustment') ||
      type.includes('Bonus') ||
      type.includes('Penalty') ||
      msg.includes('bonus') ||
      msg.includes('penalty') ||
      msg.includes('مكافأة') ||
      msg.includes('بونص') ||
      msg.includes('خصم') ||
      msg.includes('عقوبة')
    ) {
      this.router.navigate(['/payroll-adjustments']);
    } else if (
      type.includes('Announcement') ||
      msg.includes('announcement') ||
      msg.includes('إعلان')
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}


```

### File: src\app\shared\sidebar\sidebar.component.ts
```typescript
import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { EmployeeService } from '../../core/services/employee.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private employeeService = inject(EmployeeService);

  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;
  userName: string = 'User';
  userRole: string = 'Employee';

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  isResizing = false;

  startResize(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault(); // ما نحدد نص
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const newWidth = event.clientX;
    // نحصر العرض
    if (newWidth >= 200 && newWidth <= 400) {
      this.sidebarRef.nativeElement.style.width = `${newWidth}px`;

      // نحدّث المتغير العام
      document.documentElement.style.setProperty(
        '--sidebar-width',
        `${newWidth}px`,
      );

      // سكيل على 260
      const scale = newWidth / 260;
      this.sidebarRef.nativeElement.style.setProperty(
        '--sidebar-scale',
        scale.toString(),
      );
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    // الأدمن ليس له Employee profile — نتجنب طلب الـ API الزائد
    if (!this.isAdmin) {
      this.employeeService.getMyProfile().subscribe({
        next: (profile) => {
          if (profile && profile.positionTitle) {
            this.userRole = profile.positionTitle;
          }
        },
        error: () => {}, // طنّش الأخطاء
      });
    }
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  closeMobileSidebar() {
    this.sidebarService.closeMobileSidebar();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

```

### File: src\main.ts
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// تشغيل التطبيق
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

```
