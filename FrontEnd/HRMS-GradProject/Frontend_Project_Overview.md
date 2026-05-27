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
|   |   +---pending-approvals
|   |   |       pending-approvals.component.html
|   |   |       pending-approvals.component.ts
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

### File: src\app\app.component.html
```html
@if (authService.isLoggedIn()) {
<div class="wrapper">
    @if (isMobileSidebarOpen) {
        <div class="sidebar-overlay" (click)="closeMobileSidebar()"></div>
    }

    <app-sidebar class="app-sidebar" [class.hidden]="isSidebarHidden" [class.mobile-open]="isMobileSidebarOpen"></app-sidebar>

    <div class="main-panel" [class.expanded]="isSidebarHidden">
        <app-header></app-header>

        <main class="content" [class.ai-route]="isAiRoute">
            <router-outlet></router-outlet>
        </main>
    </div>
</div>
} @else {
<router-outlet></router-outlet>
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
  {
    path: 'pending-approvals',
    loadComponent: () =>
      import('./features/pending-approvals/pending-approvals.component').then(
        (m) => m.PendingApprovalsComponent,
      ),
    canActivate: [authGuard, hrGuard],
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

  adminUpdateProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/admin-update-profile-picture/${userId}`, formData);
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

### File: src\app\features\ai-assistant\ai-assistant.component.html
```html
<div class="ai-page">
  <!-- Animated Background -->
  <div class="bg-mesh">
    <div class="mesh-blob blob-1"></div>
    <div class="mesh-blob blob-2"></div>
    <div class="mesh-blob blob-3"></div>
  </div>

  <!-- ── Header ── -->
  <div class="ai-header">
    <div class="header-content">
      <div class="ai-header-left">
        <div class="ai-avatar-wrap">
          <div class="ai-avatar">
            <img src="/kawadir-logo.png" alt="KawadirAi" class="brand-logo">
          </div>
          <div class="ai-status-dot"></div>
        </div>
        <div>
          <h2 class="ai-title">Kawadir Ai</h2>
          <p class="ai-subtitle">Your Ai assistant</p>
        </div>
      </div>
      <div class="ai-header-right">
        <div class="token-monitor" *ngIf="tokenStats">
          <div class="token-stats-text">
            <span class="token-count"><i class="bi bi-cpu"></i> {{
              tokenStats.usedTokens | number }} / {{
              tokenStats.maxTokensPerMinute | number }} TPM</span>
            <span class="token-timer"
              [class.danger]="tokenStats.secondsUntilReset < 10"><i
                class="bi bi-clock-history"></i> Resets in {{
              tokenStats.secondsUntilReset }}s</span>
          </div>
          <div class="token-progress-bg">
            <div class="token-progress-fill"
              [style.width.%]="(tokenStats.usedTokens / tokenStats.maxTokensPerMinute) * 100"
              [class.warning]="(tokenStats.usedTokens / tokenStats.maxTokensPerMinute) > 0.7"
              [class.danger]="(tokenStats.usedTokens / tokenStats.maxTokensPerMinute) > 0.9">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Messages ── -->
  <div class="messages-area" #messagesContainer>
    <div class="messages-content">
      <div
        *ngFor="let msg of messages"
        class="message-row"
        [class.user-row]="msg.role === 'user'"
        [class.ai-row]="msg.role === 'assistant'">
        <!-- AI avatar -->
        <div class="msg-avatar" *ngIf="msg.role === 'assistant'">
          <img src="/kawadir-logo.png" alt="KawadirAi" class="brand-logo">
        </div>
        <!-- User avatar -->
        <div class="msg-avatar user-avatar-icon" *ngIf="msg.role === 'user'">
          <i class="bi bi-person-fill"></i>
        </div>

        <!-- Bubble -->
        <div class="bubble-wrap">
          <!-- Loading -->
          <div class="bubble ai-bubble loading-bubble" *ngIf="msg.loading">
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>

          <!-- Normal bubble -->
          <div
            class="bubble"
            *ngIf="!msg.loading"
            [class.user-bubble]="msg.role === 'user'"
            [class.ai-bubble]="msg.role === 'assistant'"
            [innerHTML]="formatContent(msg.content)"></div>

          <!-- Metadata -->
          <div class="msg-meta" *ngIf="!msg.loading">
            <span>{{ msg.timestamp | date : 'HH:mm' }}</span>
            <span *ngIf="msg.tokens && msg.tokens > 0" class="token-tag">
              <i class="bi bi-lightning-charge"></i> {{ msg.tokens }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Input Bar ── -->
  <div class="input-area">
    <div class="input-container">

      <!-- ── Quick Actions (Docked) ── -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
        <div class="quick-actions-docked m-0 flex-grow-1" *ngIf="messages.length <= 2">
          <button
            *ngFor="let action of quickActions"
            class="quick-btn"
            (click)="triggerQuickAction(action)"
            [disabled]="isLoading || cooldown">
            <i class="{{ action.icon }}"></i> {{ action.label }}
          </button>
        </div>
        <div class="ms-auto" *ngIf="messages.length > 2"></div>

        <div class="ai-mode-selector d-flex align-items-center gap-1">
          <button class="mode-btn danger-btn text-danger border-danger" *ngIf="messages.length > 1"
            (click)="clearChat()" title="Clear Chat History">
            <i class="bi bi-trash"></i>
          </button>
          <button class="mode-btn normal" [class.active]="aiMode === 0"
            (click)="setAiMode(0)" title="Normal Mode (Fast)">
            <i class="bi bi-lightning"></i> <span class="d-none d-sm-inline">Normal</span>
          </button>
          <button class="mode-btn deep-think" [class.active]="aiMode === 1"
            (click)="setAiMode(1)" title="Deep Think (Read-Only Search)">
            <i class="bi bi-cpu"></i> <span class="d-none d-sm-inline">Deep Think</span>
          </button>
          <button class="mode-btn executive" *ngIf="isAdminOrHR"
            [class.active]="aiMode === 2" (click)="setAiMode(2)"
            title="Executive Mode (Actions & Updates)">
            <i class="bi bi-shield-lock"></i> <span class="d-none d-sm-inline">Executive</span>
          </button>
        </div>
      </div>

      <div class="input-content">
        <div class="input-wrap">
          <textarea
            class="chat-input"
            [(ngModel)]="userInput"
            (keydown)="onKeydown($event)"
            [placeholder]="cooldown ? 'Please wait ' + cooldownSeconds + 's...' : 'Ask me anything about HR, leave, attendance or salary...'"
            [maxlength]="MAX_CHARS"
            [disabled]="isLoading || cooldown"
            rows="1"></textarea>
          <div class="input-footer">
            <span class="char-counter"
              [class.danger]="charCount > MAX_CHARS - 20">
              {{ charCount }}/{{ MAX_CHARS }}
            </span>
          </div>
        </div>
        <button
          class="send-btn"
          [disabled]="!canSend"
          (click)="sendMessage()">
          <span *ngIf="!isLoading"><i class="bi bi-send-fill"></i></span>
          <span *ngIf="isLoading"
            class="spinner-border spinner-border-sm"></span>
        </button>
      </div>
    </div>
  </div>

</div>

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
import Swal from 'sweetalert2';

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
    if (this.messages.length <= 1) return; // Only greeting message
    
    Swal.fire({
      title: 'Clear Chat History?',
      text: 'Are you sure you want to delete all messages? This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.messages = [];
        this.totalTokensUsed = 0;
        localStorage.removeItem(this.getChatStorageKey());
        localStorage.removeItem(this.getTokenStorageKey());
        this.ngOnInit();
      }
    });
  }

  setAiMode(mode: number): void {
    if (mode === 2 && !this.isAdminOrHR) return;
    this.aiMode = mode;
  }
}

```

### File: src\app\features\all-attendance\all-attendance.component.html
```html
<div class="page-container p-4">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-clock-history fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">{{ 'All Employees Attendance' | t }}</h2>
                <p class="text-muted small mb-0">{{ 'Overview of all employees clock-in and clock-out records' | t }}</p>
            </div>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="Search by name, ID, or date..." 
                    [(ngModel)]="searchQuery" 
                    (input)="filterRecords()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Attendance">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">Filter Options</h6>
                    
                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">Status</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedStatus" (change)="filterRecords()">
                            <option value="">All Statuses</option>
                            <option value="Working">Working</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <a routerLink="/employees" class="btn btn-outline-secondary btn-sm rounded-3 text-nowrap shadow-sm p-2 px-3">
                <i class="bi bi-arrow-left me-1"></i> Back to Employees
            </a>
        </div>
    </div>

    <!-- Table -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 text-nowrap">

                <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <tr>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Employee</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold">Date</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-success">Clock In</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-danger">Clock Out</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-primary">Total Hours</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Status</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <!-- Loading -->
                    <tr *ngIf="isLoading">
                        <td colspan="6" class="text-center py-5 text-muted no-data-td">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            Loading attendance records...
                        </td>
                    </tr>

                    <!-- Empty -->
                    <tr *ngIf="!isLoading && records.length === 0">
                        <td colspan="6" class="text-center py-5 no-data-td">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-clock-history fs-1 text-secondary"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">No Attendance Records</h5>
                                <p class="text-muted small">There are no clock-in records available yet matching your criteria.</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Rows -->
                    <tr *ngFor="let rec of paginatedRecords">
                        <td data-label="Employee" class="py-3 px-4">
                            <div class="fw-semibold text-dark">
                                {{ rec.employeeName || ('Employee #' + rec.employeeId) }}
                            </div>
                        </td>
                        <td data-label="Date" class="py-3 px-3 text-muted">
                            {{ rec.date | date:'dd MMM yyyy' }}
                        </td>
                        <td data-label="Clock In" class="py-3 px-3 text-success fw-medium">
                            <i class="bi bi-arrow-down-right-circle me-1"></i>
                            {{ rec.clockIn || '—' }}
                        </td>
                        <td data-label="Clock Out" class="py-3 px-3 text-danger fw-medium">
                            <i class="bi bi-arrow-up-right-circle me-1"></i>
                            {{ (!rec.clockOut || rec.clockOut === '00:00:00') ? '—' : rec.clockOut }}
                        </td>
                        <td data-label="Total Hours" class="py-3 px-3 fw-semibold text-primary">
                            {{ calcHours(rec) }}
                        </td>
                        <td data-label="Status" class="py-3 px-4">
                            <span class="badge rounded-pill px-3 py-2"
                                [class.bg-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-opacity-10]="true"
                                [class.text-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                [class.text-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                style="border: 1px solid currentColor; opacity: 0.9;">
                                <i class="bi me-1"
                                   [class.bi-check-circle-fill]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                   [class.bi-clock-fill]="!rec.clockOut || rec.clockOut === '00:00:00'"></i>
                                {{ getStatusLabel(rec) }}
                            </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="records.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, records.length) }} of {{ records.length }} entries
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="page-container p-4">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-clock-history fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">{{ 'All Employees Attendance' | t }}</h2>
                <p class="text-muted small mb-0">{{ 'Overview of all employees clock-in and clock-out records' | t }}</p>
            </div>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="Search by name, ID, or date..." 
                    [(ngModel)]="searchQuery" 
                    (input)="filterRecords()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Attendance">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">Filter Options</h6>
                    
                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">Status</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedStatus" (change)="filterRecords()">
                            <option value="">All Statuses</option>
                            <option value="Working">Working</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <a routerLink="/employees" class="btn btn-outline-secondary btn-sm rounded-3 text-nowrap shadow-sm p-2 px-3">
                <i class="bi bi-arrow-left me-1"></i> Back to Employees
            </a>
        </div>
    </div>

    <!-- Table -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 text-nowrap">

                <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <tr>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Employee</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold">Date</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-success">Clock In</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-danger">Clock Out</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-primary">Total Hours</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Status</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <!-- Loading -->
                    <tr *ngIf="isLoading">
                        <td colspan="6" class="text-center py-5 text-muted no-data-td">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            Loading attendance records...
                        </td>
                    </tr>

                    <!-- Empty -->
                    <tr *ngIf="!isLoading && records.length === 0">
                        <td colspan="6" class="text-center py-5 no-data-td">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-clock-history fs-1 text-secondary"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">No Attendance Records</h5>
                                <p class="text-muted small">There are no clock-in records available yet matching your criteria.</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Rows -->
                    <tr *ngFor="let rec of paginatedRecords">
                        <td data-label="Employee" class="py-3 px-4">
                            <div class="fw-semibold text-dark">
                                {{ rec.employeeName || ('Employee #' + rec.employeeId) }}
                            </div>
                        </td>
                        <td data-label="Date" class="py-3 px-3 text-muted">
                            {{ rec.date | date:'dd MMM yyyy' }}
                        </td>
                        <td data-label="Clock In" class="py-3 px-3 text-success fw-medium">
                            <i class="bi bi-arrow-down-right-circle me-1"></i>
                            {{ rec.clockIn || '—' }}
                        </td>
                        <td data-label="Clock Out" class="py-3 px-3 text-danger fw-medium">
                            <i class="bi bi-arrow-up-right-circle me-1"></i>
                            {{ (!rec.clockOut || rec.clockOut === '00:00:00') ? '—' : rec.clockOut }}
                        </td>
                        <td data-label="Total Hours" class="py-3 px-3 fw-semibold text-primary">
                            {{ calcHours(rec) }}
                        </td>
                        <td data-label="Status" class="py-3 px-4">
                            <span class="badge rounded-pill px-3 py-2"
                                [class.bg-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-opacity-10]="true"
                                [class.text-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                [class.text-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                style="border: 1px solid currentColor; opacity: 0.9;">
                                <i class="bi me-1"
                                   [class.bi-check-circle-fill]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                   [class.bi-clock-fill]="!rec.clockOut || rec.clockOut === '00:00:00'"></i>
                                {{ getStatusLabel(rec) }}
                            </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="records.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, records.length) }} of {{ records.length }} entries
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>

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

### File: src\app\features\attendance\attendance.component.html
```html
<div class="page-container p-4">

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-clock-history fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">
                    {{ isAdmin ? ('Employee Attendance Tracking' | t) : ('My Attendance Tracking' | t) }}
                </h2>
                <p class="text-muted small mb-0">
                    {{ isAdmin ? ('Monitor all employees daily clock-in and clock-out records' | t) : ('Monitor your daily clock-in and clock-out records' | t) }}
                </p>
            </div>
        </div>

        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end flex-wrap">
            <div class="input-group shadow-sm" style="max-width: 300px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="{{ 'Search employees...' | t }}" 
                    [(ngModel)]="searchQuery" 
                    (input)="filterRecords()">
            </div>

            <button class="btn btn-outline-success shadow-sm px-3 px-md-4 py-2 rounded-3 fw-semibold text-nowrap d-flex align-items-center" (click)="exportToExcel()">
                <i class="bi bi-file-earmark-excel-fill fs-5" [class.me-md-2]="true"></i> <span class="d-none d-md-inline">{{ 'Export' | t }}</span>
            </button>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm px-3 py-2 rounded-3 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-filter fs-5" [class.me-md-2]="true"></i> <span class="d-none d-md-inline">{{ 'Filter' | t }}</span>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="min-width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">{{ 'Filter Options' | t }}</h6>
                    <div class="mb-0">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Status' | t }}</label>
                        <select class="form-select form-select-sm border-light-subtle" [(ngModel)]="selectedStatus" (change)="filterRecords()">
                            <option value="">{{ 'All Statuses' | t }}</option>
                            <option value="Completed">{{ 'Completed' | t }}</option>
                            <option value="Working">{{ 'Working' | t }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div *ngIf="!isAdmin" class="d-flex flex-column align-items-end gap-2">
                <div *ngIf="isStaleSession"
                     class="alert alert-warning py-2 px-3 mb-0 rounded-3 small d-flex align-items-center gap-2 w-100">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <span>
                        {{ 'Open session from' | t }} <strong>{{ activeSession?.date | date:'dd MMM yyyy' }}</strong>.
                        {{ 'Click Clock Out to close it.' | t }}
                    </span>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <a *ngIf="isAdminOrHR" routerLink="/all-attendance"
                       class="btn btn-outline-primary px-3 px-md-4 py-2 rounded-3 shadow-sm text-nowrap">
                        <i class="bi bi-people" [class.me-md-1]="true"></i> <span class="d-none d-md-inline">{{ 'View All' | t }}</span>
                    </a>

                    <button *ngIf="!isCheckedInToday"
                        class="btn btn-success px-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                        (click)="onClockIn()"
                        [disabled]="isProcessing || isLoading">
                        <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                        <i *ngIf="!isProcessing" class="bi bi-box-arrow-in-right me-2"></i> {{ 'Clock In' | t }}
                    </button>

                    <button *ngIf="isCheckedInToday && !isCheckedOutToday"
                        class="btn btn-warning px-4 py-2 rounded-3 fw-semibold shadow-sm text-dark text-nowrap"
                        (click)="onClockOut()"
                        [disabled]="isProcessing || isLoading">
                        <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                        <i *ngIf="!isProcessing" class="bi bi-box-arrow-right me-2"></i> {{ 'Clock Out' | t }}
                    </button>

                    <span *ngIf="isCheckedInToday && isCheckedOutToday"
                        class="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-3 fw-semibold border border-success border-opacity-25 text-nowrap">
                        <i class="bi bi-check-circle-fill me-2"></i> {{ 'Shift Completed' | t }} ({{ todayWorkedHours | number:'1.1-2' }} {{ 'hrs' | t }})
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 text-nowrap">

                <thead class="bg-light text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <tr>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Date' | t }}</th>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Clock In' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Clock Out' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-center">{{ 'Status' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-end">{{ 'Total Hours' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td colspan="6" class="text-center py-5 text-muted no-data-td">
                            <span
                                class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading attendance data...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && attendanceRecords.length === 0">
                        <td [colSpan]="isAdmin ? 6 : 5" class="text-center py-5 no-data-td">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-clock-history text-secondary fs-1"></i>
                                </div>
                                <h3 class="fw-bold text-dark mb-1">{{ 'Attendance' | t }}</h3>
                                <p class="text-muted small mb-0">{{ 'No attendance records available yet matching your criteria.' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let record of paginatedRecords">
                        <td data-label="Date" class="py-3 px-4 fw-bold text-dark">
                            {{ record.date | date:'dd MMM yyyy' }}
                        </td>
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-4 fw-bold text-dark">
                            {{ record.employeeName || ('Emp #' + record.employeeId) }}
                        </td>

                        <td data-label="Clock-in Time" class="py-3 px-3 text-success fw-medium">
                            <i class="bi bi-arrow-down-right-circle me-1"></i>
                            {{ record.clockIn || '--:--' }}
                        </td>

                        <td data-label="Clock-out Time" class="py-3 px-3 text-danger fw-medium">
                            <i class="bi bi-arrow-up-right-circle me-1"></i>
                            {{ (record.clockOut && record.clockOut !==
                            '00:00:00') ? record.clockOut : '--:--' }}
                        </td>

                        <td data-label="Status" class="py-3 px-4 text-center">
                            <span class="badge px-3 py-2 rounded-pill"
                                [ngClass]="(record.clockOut && record.clockOut !== '00:00:00') ? 'bg-success bg-opacity-10 text-success' : 'bg-primary bg-opacity-10 text-primary'">
                                {{ (record.clockOut && record.clockOut !== '00:00:00') ? ('Completed' | t) : ('Working' | t) }}
                            </span>
                        </td>

                        <td data-label="Total Hours" class="py-3 px-3 text-end">
                            <span class="fw-bold fs-6">{{ record.totalHours || '-' }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="allAttendanceRecords.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, attendanceRecords.length) }} of {{ attendanceRecords.length }} entries
                <span *ngIf="attendanceRecords.length !== allAttendanceRecords.length" class="text-primary ms-1">
                    (filtered from {{ allAttendanceRecords.length }} total)
                </span>
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<style>
.cursor-pointer {
  cursor: pointer;
}
</style>

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

### File: src\app\features\auth\login\login.component.html
```html
<div class="login-page d-flex align-items-center justify-content-center vh-100" dir="ltr">

    <!-- خلفية متحركة -->
    <div class="bg-blobs" aria-hidden="true">
        <span class="blob blob-1"></span>
        <span class="blob blob-2"></span>
        <span class="blob blob-3"></span>
        <span class="blob blob-4"></span>
        <span class="blob blob-5"></span>
    </div>
    <!-- شبكة نقاط -->
    <div class="dot-grid" aria-hidden="true"></div>

    <div class="login-card shadow-lg d-flex position-relative">

        <!-- Left Side: Form -->
        <div
            class="login-form-section p-5 d-flex flex-column position-relative">
            <div class="logo-text mt-2 mb-4 d-flex align-items-center">
                <div class="me-4 flex-shrink-0 shadow-sm"
                    style="width: 90px; height: 90px; border-radius: 22px; background: #f8f9fa; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; padding: 8px;">
                    <img src="kawadir-logo.png" alt="Kawadir" class="brand-logo" style="width: 100%; height: 100%; object-fit: contain; transform: scale(1.15);">
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <span style="font-size: 2.6rem; font-weight: 800; color: var(--bs-heading-color, #111); letter-spacing: 0.5px; line-height: 1;">Kawadir</span>
                    <span style="font-size: 0.85rem; color: #888; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px;">HR Management</span>
                </div>
            </div>

            <div class="form-content mt-4 px-lg-3">
                <div class="text-center mb-5">
                    <h3 class="fw-normal text-dark mb-2">Login to your account</h3>
                    <p class="text-muted small">Access your HR dashboard</p>
                </div>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

                    <div class="mb-3">
                        <label
                            class="form-label text-secondary small fw-medium ms-3 mb-2">Email Address</label>
                        <input type="email"
                            class="form-control rounded-pill custom-input px-4 py-3 border-0"
                            formControlName="email"
                            placeholder="example@company.com"
                            [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                        <div class="invalid-feedback ms-3 mt-1">
                            <span
                                *ngIf="loginForm.get('email')?.errors?.['required']">
                                <i
                                    class="bi bi-exclamation-circle me-1"></i>Email
                                is required
                            </span>
                            <span
                                *ngIf="loginForm.get('email')?.errors?.['email']">
                                <i
                                    class="bi bi-exclamation-circle me-1"></i>Please
                                enter a valid email address
                            </span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label
                            class="form-label text-secondary small fw-medium ms-3 mb-2">Password</label>
                        <div class="position-relative">
                            <input
                                [type]="isPasswordVisible ? 'text' : 'password'"
                                class="form-control rounded-pill custom-input px-4 py-3 border-0 pe-5"
                                formControlName="password"
                                placeholder="******************"
                                [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">

                            <button
                                class="btn btn-link text-muted position-absolute end-0 top-50 translate-middle-y me-2 text-decoration-none shadow-none"
                                type="button"
                                (click)="togglePasswordVisibility()"
                                tabindex="-1" style="z-index: 5;">
                                <i class="bi fs-5"
                                    [ngClass]="isPasswordVisible ? 'bi-eye-slash' : 'bi-eye'"></i>
                            </button>
                        </div>
                        <div class="invalid-feedback ms-3 mt-1">
                            <span
                                *ngIf="loginForm.get('password')?.errors?.['required']">
                                <i
                                    class="bi bi-exclamation-circle me-1"></i>Password
                                is required
                            </span>
                            <span
                                *ngIf="loginForm.get('password')?.errors?.['minlength']">
                                <i
                                    class="bi bi-exclamation-circle me-1"></i>Password
                                must be at least 6 characters
                            </span>
                        </div>
                    </div>

                    <button type="submit"
                        class="btn btn-warning w-100 rounded-pill py-3 fw-medium shadow-sm submit-btn text-dark mb-4"
                        [disabled]="isLoading">
                        @if (isLoading) {
                        <span class="spinner-border spinner-border-sm me-2"
                            role="status" aria-hidden="true"></span>
                        }
                        Login
                    </button>
                </form>
            </div>
        </div>

        <!-- Right Side: Image -->
        <div class="login-image-section p-3 d-none d-lg-block">
            <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team working"
                class="h-100 w-100 object-fit-cover rounded-4 shadow-sm"
                style="border-radius: 1.5rem !important;">
        </div>

    </div>
</div>
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

### File: src\app\features\auth\register\register.component.html
```html
<div class="page-container p-4 fade-in">
    <!-- Clean Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-person-plus-fill fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">{{ 'Register New User' | t }}</h2>
                <p class="text-muted small mb-0">{{ 'Create secure system credentials and assign appropriate roles for new employees.' | t }}</p>
            </div>
        </div>
    </div>

    <!-- Clean Form Grid Layout -->
    <div class="row">
        <div class="col-12 col-xl-10">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="clean-form">
                <div class="row g-4 mb-5">
                    
                    <!-- Username -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold text-secondary small mb-2">Username <span class="text-danger">*</span></label>
                        <input type="text" class="form-control px-3 py-2 fs-6 rounded-3" formControlName="username" placeholder="e.g. johndoe">
                    </div>

                    <!-- Email -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold text-secondary small mb-2">Email Address <span class="text-danger">*</span></label>
                        <input type="email" class="form-control px-3 py-2 fs-6 rounded-3" formControlName="email" placeholder="john@company.com">
                    </div>

                    <!-- Password -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold text-secondary small mb-2">Password <span class="text-danger">*</span></label>
                        <input type="password" class="form-control px-3 py-2 fs-6 rounded-3" formControlName="password" placeholder="Min. 6 characters">
                    </div>

                    <!-- Role -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold text-secondary small mb-2">System Role <span class="text-danger">*</span></label>
                        <select class="form-select px-3 py-2 fs-6 rounded-3" formControlName="role">
                            <option value="" disabled selected>Select Role...</option>
                            @for (role of roles; track role) {
                                <option [value]="role">{{ role }}</option>
                            }
                        </select>
                    </div>

                </div>

                <!-- Action Button -->
                <div>
                    <button type="submit" class="btn btn-primary px-5 py-2 fw-medium shadow-sm rounded-3 submit-btn" [disabled]="registerForm.invalid || isLoading">
                        @if (isLoading) {
                            <span class="spinner-border spinner-border-sm me-2"></span> Registering...
                        } @else {
                            Register User
                        }
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
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
          title: 'Account Created Successfully',
          text: 'Do you want to complete the employee profile now?',
          showCancelButton: true,
          confirmButtonText: 'Yes, Complete Profile',
          cancelButtonText: 'Later',
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
          'Error',
          getFriendlyErrorMessage(
            err,
            'Failed to create account. Please try again.',
          ),
          'error',
        );
      },
    });
  }
}

```

### File: src\app\features\dashboard\dashboard.component.html
```html
<div class="dashboard-container">

    <!-- Announcements Section -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white p-3 border-0 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold m-0 text-dark">
                        <i class="bi bi-megaphone-fill text-primary me-2"></i> {{ 'Company Announcements' | t }}
                    </h5>
                    <button *ngIf="isAdminOrHR" class="btn btn-sm btn-primary shadow-sm" (click)="openAnnouncementModal()">
                        <i class="bi bi-plus-lg"></i> {{ 'Post Announcement' | t }}
                    </button>
                </div>
                <div class="card-body p-0">
                    <div *ngIf="announcements.length === 0" class="text-center p-4 text-muted">
                        <i class="bi bi-info-circle fs-3 d-block mb-2"></i>
                        {{ 'No announcements at this time.' | t }}
                    </div>
                    <div class="list-group list-group-flush rounded-bottom-4" style="max-height: 400px; overflow-y: auto;">
                        <div class="list-group-item p-3 border-bottom-0 border-top hover-bg-light transition-all" *ngFor="let ann of announcements">
                            <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                                <h6 class="mb-0 fw-bold d-flex align-items-center gap-2">
                                    <span class="badge rounded-pill" 
                                          [ngClass]="{'bg-danger': ann.priority === 'Urgent', 'bg-warning text-dark': ann.priority === 'High', 'bg-info text-dark': ann.priority === 'Normal'}">
                                        {{ ann.priority | t }}
                                    </span>
                                    {{ ann.title }}
                                </h6>
                                <div class="d-flex align-items-center gap-3">
                                    <small class="text-muted"><i class="bi bi-clock"></i> {{ ann.createdAt | date:'short' }}</small>
                                    <button *ngIf="isAdminOrHR" class="btn btn-sm btn-outline-danger border-0 p-1" (click)="deleteAnnouncement(ann.id)" [title]="'Delete' | t">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <p class="mb-1 text-secondary mt-2 ms-1" style="font-size: 0.95rem;">{{ ann.content }}</p>
                            <small class="text-muted fst-italic ms-1">{{ 'Posted by:' | t }} {{ ann.authorName }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @if (isAdminOrHR) {
    <div class="d-flex justify-content-end mb-3" *ngIf="isAdmin">
        <button class="btn btn-primary d-flex align-items-center gap-2 shadow-sm px-4" (click)="downloadSystemReport()">
            <i class="bi bi-file-earmark-arrow-down"></i>
            {{ 'Download Report' | t }}
        </button>
    </div>

    <!-- Stat Cards -->
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="stat-card pink hover-elevate h-100 stat-card-link"
                 [routerLink]="isAdminOrHR ? '/employees' : '/my-profile'">
                <div class="card-body">
                    <h3>{{ totalEmployees }}</h3>
                    <p>{{ 'Total Employees' | t }}</p>
                    <i class="bi bi-people-fill icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card orange hover-elevate h-100 stat-card-link"
                 routerLink="/leave">
                <div class="card-body">
                    <h3>{{ pendingLeaves }}</h3>
                    <p>{{ 'Pending Leaves' | t }}</p>
                    <i class="bi bi-calendar-x icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card blue hover-elevate h-100 stat-card-link"
                 [routerLink]="isAdminOrHR ? '/departments' : '/attendance'">
                <div class="card-body">
                    <h3>{{ departmentsCount }}</h3>
                    <p>{{ 'Departments' | t }}</p>
                    <i class="bi bi-building icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card green hover-elevate h-100 stat-card-link"
                 routerLink="/salary">
                <div class="card-body">
                    <h3>{{ totalSalaries | number }} JD</h3>
                    <p>{{ 'Salaries' | t }}</p>
                    <i class="bi bi-cash-stack icon"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Row 1: Left (Attendance + Attendance Rate) | Right (Leave Distribution + Recent Leaves) -->
    <div class="row g-4">
        <!-- Left Column -->
        <div class="col-lg-8 d-flex flex-column gap-4">
            <!-- Attendance Table -->
            <div class="chart-card card hover-elevate shadow-sm border-0 rounded-4">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Attendance' | t }}</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0 text-nowrap">
                            <thead class="small text-muted text-uppercase bg-light">
                                <tr>
                                    <th class="ps-4">{{ 'Employee' | t }}</th>
                                    <th>{{ 'Date' | t }}</th>
                                    <th>{{ 'Clock In' | t }}</th>
                                    <th>{{ 'Clock Out' | t }}</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                @for (att of recentAttendances; track att.id) {
                                <tr>
                                    <td class="fw-bold ps-4">{{ att.employeeName || 'Emp #' + att.employeeId }}</td>
                                    <td>{{ att.date | date:'shortDate' }}</td>
                                    <td class="text-success"><i class="bi bi-box-arrow-in-right me-1"></i>{{ att.clockIn || '--:--' }}</td>
                                    <td class="text-danger"><i class="bi bi-box-arrow-right me-1"></i>{{ (att.clockOut && att.clockOut !== '00:00:00') ? att.clockOut : '--:--' }}</td>
                                </tr>
                                } @empty {
                                <tr>
                                    <td colspan="4" class="text-center py-4 text-muted">
                                        <i class="bi bi-calendar-x fs-3 d-block mb-2 text-light-gray"></i>
                                        {{ 'No Data' | t }}
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Attendance Rate Chart -->
            <div class="chart-card card hover-elevate shadow-sm border-0 rounded-4 flex-grow-1">
                <div class="card-header bg-white p-3 border-0 pb-0 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Attendance Rate' | t }}</h5>
                    <span class="badge bg-light text-success border border-success border-opacity-25 px-2 py-1"><i class="bi bi-person-check-fill me-1"></i>{{ attendanceRate }}% {{ 'Overall' | t }}</span>
                </div>
                <div class="card-body p-3 pt-4">
                    <div style="height: 300px; position: relative; width: 100%;">
                        <canvas id="attendanceRateChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column -->
        <div class="col-lg-4 d-flex flex-column gap-4">
            <!-- Leave Distribution -->
            <div class="chart-card card hover-elevate shadow-sm border-0 rounded-4">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Leave Distribution' | t }}</h5>
                </div>
                <div class="card-body">
                    <div style="height: 250px; position: relative;" class="d-flex justify-content-center align-items-center">
                        <canvas id="leaveTypeChart"></canvas>
                        <div *ngIf="annualLeavePercent === 0 && sickLeavePercent === 0 && emergencyLeavePercent === 0 && unpaidLeavePercent === 0" class="position-absolute text-center text-muted small">
                            {{ 'No Data' | t }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Leave Requests -->
            <div class="activity-card hover-elevate bg-white rounded-4 shadow-sm p-4 flex-grow-1">
                <h6 class="fw-bold mb-3 text-dark">{{ 'Recent Leave Requests' | t }}</h6>
                <div class="d-flex flex-column gap-2">
                    @for (leave of recentLeaves; track leave.id) {
                    <div class="d-flex align-items-center justify-content-between py-2 px-3 rounded-3 bg-light gap-2">
                        <div class="d-flex align-items-center gap-2" style="min-width: 0;">
                            <div class="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; font-size: 12px;">
                                {{ (leave.employeeName || 'E').charAt(0).toUpperCase() }}
                            </div>
                            <span class="fw-semibold text-dark small text-truncate">{{ leave.employeeName || 'Emp #' + leave.employeeId }}</span>
                        </div>
                        <span class="status-badge px-2 py-1 flex-shrink-0" style="font-size: 11px;"
                            [ngClass]="{
                                'status-approved': leave.status === 'Approved',
                                'status-pending': leave.status === 'Pending',
                                'status-rejected': leave.status === 'Rejected'
                            }">
                            <i class="bi me-1"
                                [ngClass]="{
                                    'bi-check-circle-fill': leave.status === 'Approved',
                                    'bi-hourglass-split': leave.status === 'Pending',
                                    'bi-x-circle-fill': leave.status === 'Rejected'
                                }"></i>{{ leave.status | t }}
                        </span>
                    </div>
                    } @empty {
                    <div class="text-center text-muted py-4">
                        <i class="bi bi-calendar-x fs-3 d-block mb-2"></i>
                        {{ 'No Data' | t }}
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>

    } @else {
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="stat-card blue hover-elevate h-100 stat-card-link" routerLink="/leave">
                <div class="card-body">
                    <h3>{{ employeeAnnualLeaveBalance }}</h3> <p>{{ 'Annual Leave Balance' | t }}</p>
                    <i class="bi bi-airplane-fill icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card orange hover-elevate h-100 stat-card-link" routerLink="/leave">
                <div class="card-body">
                    <h3>{{ employeePendingLeaves }}</h3> <p>{{ 'My Pending Leaves' | t }}</p>
                    <i class="bi bi-hourglass-split icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card pink hover-elevate h-100 stat-card-link" routerLink="/attendance">
                <div class="card-body">
                    <h3>{{ employeeHoursWorked }} <span class="fs-6 fw-normal">hrs</span></h3>
                    <p>{{ 'Total Hours' | t }}</p>
                    <i class="bi bi-clock-history icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card payday hover-elevate h-100 stat-card-link" routerLink="/salary">
                <div class="card-body">
                    <h3>{{ employeeNextPayday }}</h3>
                    <p>{{ 'Next Payday' | t }}</p>
                    <i class="bi bi-calendar-check icon"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-12">
            <div class="chart-card card hover-elevate shadow-sm border-0 rounded-4 h-100">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'My Attendance' | t }}</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0 text-nowrap">
                            <thead class="small text-muted text-uppercase bg-light">
                                <tr>
                                    <th class="ps-4">{{ 'Date' | t }}</th>
                                    <th>{{ 'Clock In' | t }}</th>
                                    <th>{{ 'Clock Out' | t }}</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                @for (att of myRecentAttendances; track att.id) {
                                <tr>
                                    <td class="ps-4 fw-bold">{{ att.date | date:'shortDate' }}</td>
                                    <td class="text-success"><i class="bi bi-box-arrow-in-right me-1"></i>{{ att.clockIn || '--:--' }}</td>
                                    <td class="text-danger"><i class="bi bi-box-arrow-right me-1"></i>{{ (att.clockOut && att.clockOut !== '00:00:00') ? att.clockOut : '--:--' }}</td>
                                </tr>
                                } @empty {
                                <tr>
                                    <td colspan="3" class="text-center py-4 text-muted">
                                        <i class="bi bi-calendar-x fs-3 d-block mb-2 text-light-gray"></i>
                                        {{ 'No Data' | t }}
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
</div>

<!-- Announcement Modal -->
<div class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0,0,0,0.5);" *ngIf="showAnnouncementModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
      <div class="modal-header bg-light border-0 py-3">
        <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2">
          <i class="bi bi-megaphone-fill text-primary"></i> {{ 'Post Announcement' | t }}
        </h5>
        <button type="button" class="btn-close" (click)="closeAnnouncementModal()"></button>
      </div>
      <div class="modal-body p-4">
        <form [formGroup]="announcementForm" (ngSubmit)="submitAnnouncement()">
          <div class="mb-3">
            <label class="form-label fw-semibold text-dark">{{ 'Title' | t }}</label>
            <input type="text" class="form-control" formControlName="title" placeholder="{{ 'e.g., Company Holiday' | t }}" required>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-dark">{{ 'Content' | t }}</label>
            <textarea class="form-control" formControlName="content" rows="4" placeholder="{{ 'Write your announcement here...' | t }}" required></textarea>
          </div>
          
          <div class="row mb-3">
            <div class="col-md-6 d-flex flex-column justify-content-end">
              <label class="form-label fw-semibold text-dark">{{ 'Priority' | t }}</label>
              <select class="form-select" formControlName="priority">
                <option value="Normal">{{ 'Normal' | t }}</option>
                <option value="High">{{ 'High' | t }}</option>
                <option value="Urgent">{{ 'Urgent' | t }}</option>
              </select>
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-end">
              <label class="form-label fw-semibold text-dark">{{ 'Expiry Date' | t }} <small class="text-muted fw-normal">({{ 'Optional' | t }})</small></label>
              <input type="datetime-local" class="form-control" formControlName="expiryDate">
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check form-switch mb-2">
              <input class="form-check-input" type="checkbox" id="isGeneralSwitch" formControlName="isGeneral">
              <label class="form-check-label fw-semibold text-dark" for="isGeneralSwitch">{{ 'General Announcement (All Employees)' | t }}</label>
            </div>
          </div>

          <div class="mb-4" *ngIf="!announcementForm.get('isGeneral')?.value">
            <label class="form-label fw-semibold text-dark">{{ 'Select Target Employees' | t }}</label>
            <select class="form-select" formControlName="targetEmployeeIds" multiple style="height: 120px;">
              <option *ngFor="let emp of allEmployeesList" [value]="emp.id">
                {{ emp.firstName }} {{ emp.lastName }} ({{ emp.departmentName }})
              </option>
            </select>
            <small class="text-muted">{{ 'Hold Ctrl to select multiple employees' | t }}</small>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" class="btn btn-light px-4" (click)="closeAnnouncementModal()">{{ 'Cancel' | t }}</button>
            <button type="submit" class="btn btn-primary px-4" [disabled]="announcementForm.invalid">{{ 'Post' | t }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
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

### File: src\app\features\departments\departments.component.html
```html
<div class="page-container p-4">

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-diagram-3-fill fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">{{ 'Departments' | t }}</h2>
                <p class="text-muted small mb-0">{{ 'Manage organizational departments and view their employee structures' | t }}</p>
            </div>
        </div>
        <button
            class="btn btn-primary shadow-sm text-nowrap px-4 py-2 rounded-3 fw-semibold"
            (click)="openAddModal()">
            <i class="bi bi-plus-lg me-1"></i> {{ 'Add Department' | t }}
        </button>
    </div>

    @if (isLoading) {
    <div class="text-center my-5 py-5">
        <div class="spinner-border text-primary mb-3" role="status"
            style="width: 3rem; height: 3rem;"></div>
        <p class="text-muted fw-medium fs-5">Fetching departments data...</p>
    </div>
    } @else {
    <div class="row g-4">
        @for (dept of departmentsList; track dept.id) {
        <div class="col-md-6 col-xl-4 col-xxl-3">
            <div
                class="card border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative transition-hover"
                style="transition: transform 0.2s, box-shadow 0.2s;">
                <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
                    <div
                        class="d-flex justify-content-between align-items-center mb-3">
                        <div
                            class="bg-primary bg-opacity-10 text-primary p-2 rounded-3 d-flex align-items-center justify-content-center"
                            style="width: 48px; height: 48px;">
                            <i class="bi bi-buildings fs-4"></i>
                        </div>
                        <div class="dropdown">
                            <button
                                class="btn btn-light btn-sm rounded-circle shadow-none text-muted d-flex align-items-center justify-content-center p-0"
                                type="button" data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style="width: 32px; height: 32px;">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul
                                class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3">
                                <li><a
                                        class="dropdown-item py-2 fw-medium text-dark"
                                        href="javascript:void(0)"
                                        (click)="openEditModal(dept)"><i
                                            class="bi bi-pencil-square text-primary me-2"></i>{{
                                        'Edit' | t }}</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a
                                        class="dropdown-item py-2 fw-medium text-danger"
                                        href="javascript:void(0)"
                                        (click)="deleteDepartment(dept.id)"><i
                                            class="bi bi-trash3 me-2"></i>{{
                                        'Delete' | t }}</a></li>
                            </ul>
                        </div>
                    </div>
                    <h5 class="card-title fw-bold text-dark mb-1 text-truncate"
                        [title]="dept.name">{{ dept.name }}</h5>
                    <p class="text-muted small mb-0 fw-medium">{{ 'ID' | t }}:
                        #{{ dept.id }}</p>
                </div>
                <div class="card-body px-4 pb-4 pt-3 mt-1">
                    <div
                        class="d-flex justify-content-between align-items-center bg-light rounded-3 p-3">
                        <div class="text-center flex-fill">
                            <h5 class="fw-bold text-primary mb-0">{{
                                getDeptStat(dept.id, 'employees') }}</h5>
                            <small class="text-muted fw-semibold"
                                style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">{{
                                'Employees' | t }}</small>
                        </div>
                        <div
                            style="width: 1px; height: 35px; background-color: #dee2e6;"></div>
                        <div class="text-center flex-fill">
                            <h5 class="fw-bold text-dark mb-0">{{
                                getDeptStat(dept.id, 'positions') }}</h5>
                            <small class="text-muted fw-semibold"
                                style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">{{
                                'Positions' | t }}</small>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white border-top-0 px-4 pb-4 pt-0">
                    <button
                        class="btn btn-outline-primary w-100 rounded-3 fw-semibold shadow-sm py-2 d-flex align-items-center justify-content-center"
                        (click)="viewDetails(dept)">
                        <i class="bi bi-eye me-2 fs-5"></i> View Details
                    </button>
                </div>
            </div>
        </div>
        } @empty {
        <div class="col-12 text-center my-5 py-5">
            <div
                class="bg-light rounded-circle d-inline-flex justify-content-center align-items-center mb-4"
                style="width: 100px; height: 100px;">
                <i class="bi bi-diagram-2 text-secondary"
                    style="font-size: 40px;"></i>
            </div>
            <h4 class="fw-bold text-dark mb-2">{{ 'No Data' | t }}</h4>
            <p class="text-muted">There are no departments created in the system
                yet.</p>
            <button class="btn btn-primary mt-2 px-4 rounded-3"
                (click)="openAddModal()"><i class="bi bi-plus-lg me-1"></i> Add
                Your First Department</button>
        </div>
        }
    </div>
    }
</div>

<div class="modal fade" id="deptDetailsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="modal-header border-bottom-0 bg-white pt-4 pb-2 px-4">
                <h4
                    class="modal-title fw-bold text-dark d-flex align-items-center">
                    <div
                        class="bg-primary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex align-items-center justify-content-center"
                        style="width: 40px; height: 40px;">
                        <i class="bi bi-building fs-5"></i>
                    </div>
                    {{ selectedDepartment?.name }} Department
                </h4>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0 bg-light">
                @if (selectedDepartment) {
                <div class="row g-0">
                    <!-- Left Column: Overview Stats -->
                    <div class="col-lg-4 border-end bg-white">
                        <div class="p-4 h-100">
                            <h6 class="fw-bold text-dark mb-4 text-uppercase"
                                style="letter-spacing: 0.5px; font-size: 13px;">Department
                                Overview</h6>

                            <div
                                class="d-flex align-items-center mb-4 p-3 bg-light rounded-4 border">
                                <div
                                    class="bg-primary text-white rounded-3 d-flex justify-content-center align-items-center me-3"
                                    style="width: 48px; height: 48px;">
                                    <i class="bi bi-people-fill fs-5"></i>
                                </div>
                                <div>
                                    <p
                                        class="text-muted small mb-0 fw-semibold">Total
                                        Employees</p>
                                    <h3 class="fw-bold text-primary mb-0">{{
                                        selectedDepartment.stats?.totalEmployees
                                        || 0 }}</h3>
                                </div>
                            </div>

                            <div
                                class="d-flex align-items-center mb-4 p-3 bg-light rounded-4 border">
                                <div
                                    class="bg-secondary text-white rounded-3 d-flex justify-content-center align-items-center me-3"
                                    style="width: 48px; height: 48px;">
                                    <i class="bi bi-diagram-3-fill fs-5"></i>
                                </div>
                                <div>
                                    <p
                                        class="text-muted small mb-0 fw-semibold">Total
                                        Positions</p>
                                    <h3 class="fw-bold text-secondary mb-0">{{
                                        selectedDepartment.totalPositions || 0
                                        }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Employees Table -->
                    <div class="col-lg-8 bg-light">
                        <div class="p-4 h-100 d-flex flex-column">
                            <div
                                class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                                <h6
                                    class="fw-bold text-dark mb-0 text-uppercase"
                                    style="letter-spacing: 0.5px; font-size: 13px;">Employees
                                    Directory</h6>

                                <div class="d-flex gap-2">
                                    <div
                                        class="input-group input-group-sm shadow-sm"
                                        style="max-width: 200px;">
                                        <span
                                            class="input-group-text bg-white border-end-0 text-muted"><i
                                                class="bi bi-search"></i></span>
                                        <input type="text"
                                            class="form-control border-start-0 ps-0"
                                            placeholder="Search by name or ID..."
                                            [(ngModel)]="searchEmpQuery"
                                            (input)="filterDeptEmployees()">
                                    </div>
                                    <select
                                        class="form-select form-select-sm shadow-sm w-auto fw-medium text-secondary"
                                        [(ngModel)]="selectedPositionFilter"
                                        (change)="filterDeptEmployees()">
                                        <option value>All Positions</option>
                                        <option
                                            *ngFor="let p of uniquePositions"
                                            [value]="p">{{ p }}</option>
                                    </select>
                                </div>
                            </div>

                            <div
                                class="card border-0 shadow-sm rounded-4 flex-grow-1 overflow-hidden">
                                <div class="table-responsive h-100"
                                    style="max-height: 500px;">
                                    <table
                                        class="table table-hover align-middle mb-0 text-nowrap">
                                        <thead class="bg-light sticky-top"
                                            style="z-index: 1;">
                                            <tr>
                                                <th
                                                    class="py-3 px-4 text-muted small text-uppercase fw-semibold"
                                                    style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">ID</th>
                                                <th
                                                    class="py-3 px-3 text-muted small text-uppercase fw-semibold"
                                                    style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Employee
                                                    Name</th>
                                                <th
                                                    class="py-3 px-3 text-muted small text-uppercase fw-semibold"
                                                    style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Position</th>
                                                <th
                                                    class="py-3 px-4 text-muted small text-uppercase fw-semibold text-center"
                                                    style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="border-top-0">
                                            <tr
                                                *ngFor="let emp of filteredDeptEmployees">
                                                <td data-label="ID"
                                                    class="py-3 px-4 fw-bold text-secondary">#{{
                                                    emp.id }}</td>
                                                <td data-label="Employee Name"
                                                    class="py-3 px-3 fw-bold text-dark">
                                                    <div
                                                        class="d-flex align-items-center">
                                                        <div
                                                            class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-3 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                                            style="width: 35px; height: 35px; font-size: 13px;">
                                                            {{
                                                            emp.firstName?.charAt(0)
                                                            || 'U' }}
                                                        </div>
                                                        {{ emp.firstName }} {{
                                                        emp.lastName }}
                                                    </div>
                                                </td>
                                                <td data-label="Position"
                                                    class="py-3 px-3 text-muted fw-medium">{{
                                                    emp.positionName || 'N/A'
                                                    }}</td>
                                                <td data-label="Status"
                                                    class="py-3 px-4 text-center">
                                                    <span
                                                        class="badge rounded-pill px-3 py-2 fw-semibold"
                                                        [ngClass]="emp.isActive ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-25' : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25'">
                                                        {{ emp.isActive ?
                                                        'Active' : 'Inactive' }}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr
                                                *ngIf="filteredDeptEmployees.length === 0">
                                                <td colspan="4"
                                                    class="text-center py-5 no-data-td">
                                                    <div
                                                        class="text-muted d-flex flex-column align-items-center">
                                                        <i
                                                            class="bi bi-search fs-1 mb-3 text-black-50"></i>
                                                        <span
                                                            class="fw-medium fs-6">No
                                                            employees
                                                            found.</span>
                                                        <small>Try adjusting
                                                            your search or
                                                            filter
                                                            criteria.</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div class="modal-footer bg-white border-top pt-3 pb-3 px-4">
                <button type="button"
                    class="btn btn-secondary px-5 py-2 rounded-3 fw-semibold shadow-sm"
                    data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="addDeptModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">

            <div
                class="modal-header border-bottom border-success border-4 bg-light">
                <h5 class="modal-title text-success fw-bold">
                    <i class="bi" [class.bi-plus-circle]="!isEditMode"
                        [class.bi-pencil-square]="isEditMode"></i>
                    {{ isEditMode ? ('Edit' | t) : ('Add Department' | t) }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form [formGroup]="addForm" (ngSubmit)="saveDepartment()">
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label
                            class="form-label fw-bold text-secondary">{{
                            'Department Name' | t }} <span
                                class="text-danger">*</span></label>
                        <input type="text" class="form-control"
                            formControlName="name"
                            placeholder="e.g., Marketing, Sales..."
                            [class.is-invalid]="addForm.get('name')?.invalid && addForm.get('name')?.touched">
                        @if (addForm.get('name')?.invalid &&
                        addForm.get('name')?.touched) {
                        <div class="invalid-feedback">
                            Department name is required.
                        </div>
                        }
                    </div>
                </div>

                <div class="modal-footer bg-light border-top-0">
                    <button type="button" class="btn btn-light px-4 border"
                        data-bs-dismiss="modal"
                        [disabled]="isSubmitting">{{ 'Cancel' | t }}</button>
                    <button type="submit" class="btn btn-success px-4"
                        [disabled]="addForm.invalid || isSubmitting">
                        @if (isSubmitting) {
                        <span class="spinner-border spinner-border-sm me-2"
                            role="status" aria-hidden="true"></span>Saving...
                        } @else {
                        <i class="bi bi-save me-1"></i> {{ 'Save Changes' | t }}
                        }
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>

<style>
</style>


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

### File: src\app\features\employee-form\employee-form.component.html
```html
<div class="form-page-wrapper">
  <div class="form-container">

    <!-- ═══ HEADER CARD ═══ -->
    <div class="form-header-card">
      <div class="d-flex align-items-center gap-3">
        <div class="header-icon-wrap" [class.edit-mode]="isEditMode">
          <i class="bi" [class.bi-person-plus-fill]="!isEditMode" [class.bi-pencil-square]="isEditMode"></i>
        </div>
        <div>
          <h2 class="form-title mb-0">{{ isEditMode ? 'Edit Employee Profile' : 'Add New Employee' }}</h2>
          <p class="form-subtitle mb-0">
            {{ isEditMode ? 'Update employee information and employment details' : 'Link a registered user to a new
            employee profile' }}
          </p>
        </div>
      </div>
      <a routerLink="/employees" class="btn-back">
        <i class="bi bi-arrow-left me-1"></i> Back
      </a>
    </div>

    <!-- ═══ LOADING SKELETON ═══ -->
    @if (isLoading && isEditMode) {
    <div class="form-body-card">
      <div class="skeleton-wrap">
        <div class="skeleton-line w-40"></div>
        <div class="row g-3 mt-2">
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
        </div>
      </div>
    </div>
    }

    @if (!isLoading || !isEditMode) {
    <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">

      <!-- ═══ ADD MODE: Linked User Banner ═══ -->
      @if (!isEditMode && employeeForm.get('userId')?.value) {
      <div class="linked-user-banner">
        <div class="linked-user-avatar">
          <i class="bi bi-person-fill"></i>
        </div>
        <div class="linked-user-info">
          <span class="linked-label">Linked Account</span>
          <span class="linked-email">{{ displayEmail }}</span>
        </div>
        <div class="linked-check">
          <i class="bi bi-check-circle-fill"></i>
        </div>
      </div>
      }

      <!-- ═══ EDIT MODE: Linked Account Info Card ═══ -->
      @if (isEditMode && linkedUserInfo) {
      <div class="linked-account-card">
        <div class="lac-icon">
          <i class="bi bi-person-badge-fill"></i>
        </div>
        <div class="lac-body">
          <div class="lac-title">Linked User Account</div>
          <div class="lac-detail">
            <i class="bi bi-person me-1 text-muted"></i>{{ linkedUserInfo.username }}
          </div>
          <div class="lac-detail">
            <i class="bi bi-envelope me-1 text-muted"></i>{{ linkedUserInfo.email }}
          </div>
        </div>
        <span class="lac-badge">{{ linkedUserInfo.role }}</span>
      </div>
      }

      <!-- ═══ SECTION: Link User (Add mode only) ═══ -->
      @if (!isEditMode) {
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-link-45deg"></i>
          <span>Link User Account</span>
          <span class="required-badge">Required</span>
        </div>
        <div class="row g-3">
          <div class="col-12">
            <label class="field-label">
              <i class="bi bi-person-lock text-primary"></i>
              Select Registered User <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="userId"
              [class.is-invalid]="employeeForm.get('userId')?.invalid && employeeForm.get('userId')?.touched">
              <option value="" disabled selected>
                {{ unassignedUsers.length === 0 ? 'No unlinked Employee accounts found...' : 'Choose a registered
                user...' }}
              </option>
              @for (user of unassignedUsers; track user.id) {
              <option [value]="user.id">{{ user.username }} — {{ user.email }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a user account to link.</div>
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              Only Employee accounts that are not yet linked to a profile are shown.
              Email will be auto-filled from the selected account.
            </small>
          </div>

          <!-- الايميل مسكر، بيتعبى لحاله -->
          <div class="col-12">
            <label class="field-label">
              <i class="bi bi-envelope text-primary"></i>
              Email Address
            </label>
            <div class="readonly-field-wrap">
              <i class="bi bi-envelope-fill readonly-icon"></i>
              <input type="email" class="form-control field-input readonly-field" formControlName="email"
                placeholder="Auto-filled when you select a user above" readonly>
            </div>
            <small class="field-hint">
              <i class="bi bi-magic me-1"></i>
              This field is auto-filled when you select a user from the dropdown above.
            </small>
          </div>
        </div>
      </div>
      }

      <!-- ═══ SECTION: Personal Information ═══ -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-person-vcard"></i>
          <span>Personal Information</span>
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-person text-primary"></i>
              First Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="firstName" placeholder="e.g. Mohammad"
              [class.is-invalid]="employeeForm.get('firstName')?.invalid && employeeForm.get('firstName')?.touched">
            <div class="invalid-feedback">First name is required.</div>
          </div>
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-person text-primary"></i>
              Last Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="lastName" placeholder="e.g. Al-Ahmad"
              [class.is-invalid]="employeeForm.get('lastName')?.invalid && employeeForm.get('lastName')?.touched">
            <div class="invalid-feedback">Last name is required.</div>
          </div>
        </div>
      </div>

      <!-- ═══ SECTION: Profile Picture ═══ -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-person-bounding-box"></i>
          <span>Profile Picture</span>
          <span class="badge bg-light text-secondary border ms-2">Optional</span>
        </div>
        <div class="row g-3">
          <div class="col-12 d-flex flex-column align-items-center">
            
            <!-- Picture Preview -->
            <div class="position-relative mb-3" style="width: 120px; height: 120px;">
              <img *ngIf="picturePreviewUrl" [src]="picturePreviewUrl" 
                   class="rounded-circle object-fit-cover w-100 h-100 border shadow-sm" alt="Profile Preview">
              <div *ngIf="!picturePreviewUrl" 
                   class="rounded-circle bg-light d-flex align-items-center justify-content-center w-100 h-100 border shadow-sm text-secondary">
                <i class="bi bi-person-fill fs-1"></i>
              </div>
              
              <!-- Upload Icon Overlay -->
              <div class="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow" 
                   style="width: 32px; height: 32px; cursor: pointer;"
                   onclick="document.getElementById('profilePicInput').click()">
                <i class="bi bi-camera-fill"></i>
              </div>
            </div>

            <input type="file" id="profilePicInput" class="d-none" accept="image/*" (change)="onFileSelected($event)">
            
            <small class="text-muted text-center mt-1">
              Click the camera icon to upload or change picture.<br>
              <i class="bi bi-info-circle me-1"></i>Max size: 5MB. Formats: JPG, PNG.
            </small>

          </div>
        </div>
      </div>

      <!-- ═══ SECTION: Contact Details ═══ -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-telephone-fill"></i>
          <span>Contact Details</span>
        </div>
        <div class="row g-3">
          <!-- الايميل بس ينعرض -->
          @if (isEditMode) {
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-envelope text-primary"></i>
              Email Address
            </label>
            <div class="readonly-field-wrap">
              <i class="bi bi-envelope-fill readonly-icon"></i>
              <input type="email" class="form-control field-input readonly-field" formControlName="email" readonly>
            </div>
            <small class="field-hint">
              <i class="bi bi-lock-fill me-1"></i>Email is linked to the user account and cannot be changed here.
            </small>
          </div>
          }
          <div [class]="isEditMode ? 'col-md-6' : 'col-12'">
            <label class="field-label">
              <i class="bi bi-telephone text-primary"></i>
              Phone Number <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="phoneNumber" placeholder="0791234567"
              maxlength="10" inputmode="numeric"
              [class.is-invalid]="employeeForm.get('phoneNumber')?.invalid && employeeForm.get('phoneNumber')?.touched">
            @if (employeeForm.get('phoneNumber')?.touched) {
            @if (employeeForm.get('phoneNumber')?.errors?.['required']) {
            <div class="invalid-feedback d-block">
              <i class="bi bi-exclamation-circle me-1"></i>رقم الهاتف مطلوب.
            </div>
            } @else if (employeeForm.get('phoneNumber')?.errors?.['pattern']) {
            <div class="invalid-feedback d-block">
              <i class="bi bi-exclamation-triangle me-1"></i>
              رقم الهاتف يجب أن يتكون من 10 أرقام فقط بدون مسافات أو رموز.
            </div>
            }
            }
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              أدخل 10 أرقام فقط — مثال: 0791234567
            </small>
          </div>
        </div>
      </div>

      <!-- ═══ SECTION: Employment Information ═══ -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-briefcase-fill"></i>
          <span>Employment Details</span>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-calendar-date text-primary"></i>
              Hire Date <span class="text-danger">*</span>
            </label>
            <input type="date" class="form-control field-input" formControlName="hireDate"
              [class.is-invalid]="employeeForm.get('hireDate')?.invalid && employeeForm.get('hireDate')?.touched">
            <div class="invalid-feedback">Hire date is required.</div>
          </div>
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-building text-primary"></i>
              Department <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="departmentId"
              [class.is-invalid]="employeeForm.get('departmentId')?.invalid && employeeForm.get('departmentId')?.touched">
              <option value="" disabled selected>Select department...</option>
              @for (dept of departments; track dept.id) {
              <option [value]="dept.id">{{ dept.name }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a department.</div>
          </div>
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-person-badge text-primary"></i>
              Job Position <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="positionId"
              [class.is-invalid]="employeeForm.get('positionId')?.invalid && employeeForm.get('positionId')?.touched">
              <option value="" disabled selected>
                {{ departments.length === 0 ? 'Select a department first...' : positions.length === 0 ? 'Select
                department first...' : 'Select position...' }}
              </option>
              @for (pos of positions; track pos.id) {
              <option [value]="pos.id">{{ pos.title }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a job position.</div>
            @if (positions.length > 0) {
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              {{ positions.length }} position(s) available in this department.
            </small>
            }
          </div>
        </div>
      </div>

      <!-- ═══ SUBMIT BUTTON ═══ -->
      <div class="form-actions">
        <a routerLink="/employees" class="btn btn-cancel">
          <i class="bi bi-x-lg me-2"></i>Cancel
        </a>
        <button type="submit" class="btn btn-submit" [disabled]="isLoading || employeeForm.invalid">
          @if (isLoading) {
          <span class="spinner-border spinner-border-sm me-2"></span>
          {{ isEditMode ? 'Saving Changes...' : 'Creating Profile...' }}
          } @else {
          <i class="bi me-2" [class.bi-check2-circle]="!isEditMode" [class.bi-floppy-fill]="isEditMode"></i>
          {{ isEditMode ? 'Save Changes' : 'Create Employee Profile' }}
          }
        </button>
      </div>

    </form>
    }

  </div>
</div>
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
  linkedUserInfo: { username: string; email: string; role: string; profilePictureUrl: string | null } | null =
    null;

  selectedPictureFile: File | null = null;
  picturePreviewUrl: string | null = null;

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
          profilePictureUrl: profile.profilePictureUrl || null
        };
        
        if (profile.profilePictureUrl) {
          this.picturePreviewUrl = profile.profilePictureUrl;
        }
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

    if (!body) return 'An unexpected error occurred. Please try again.';

    // ASP.NET validation errors
    if (body.errors && typeof body.errors === 'object') {
      const fieldLabels: Record<string, string> = {
        PhoneNumber: 'Phone Number',
        FirstName: 'First Name',
        LastName: 'Last Name',
        Email: 'Email',
        HireDate: 'Hire Date',
        DepartmentId: 'Department',
        PositionId: 'Position',
        UserId: 'User Account',
      };

      const messages: string[] = [];
      for (const [field, errors] of Object.entries(body.errors)) {
        const label = fieldLabels[field] || field;
        const msgs = Array.isArray(errors) ? errors : [String(errors)];
        for (const msg of msgs) {
          messages.push(`• ${label}: ${msg}`);
        }
      }
      if (messages.length) return messages.join('\n');
    }

    if (body.message) return body.message;
    if (body.title) return body.title;
    if (typeof body === 'string') return body;

    return 'An error occurred while submitting. Please try again.';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        Swal.fire('Error', 'File size exceeds 5MB limit', 'error');
        return;
      }
      this.selectedPictureFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.picturePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
          title: 'Invalid Phone Number',
          text: 'Phone number must be exactly 10 digits (numbers only, no spaces or symbols).',
          confirmButtonText: 'OK',
        });
        return;
      }

      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please make sure all required fields are filled in correctly.',
        confirmButtonText: 'OK',
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
            this.handlePictureUploadAndNavigate(Number(rawValues.userId));
          },
          error: (err) => {
            this.isLoading = false;
            const msg = this.parseBackendError(err);
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: msg,
              confirmButtonText: 'OK',
            });
            console.error('Update error:', err);
          },
        });
    } else {
      this.employeeService.addEmployee(payload).subscribe({
        next: () => {
          this.handlePictureUploadAndNavigate(Number(rawValues.userId));
        },
        error: (err) => {
          this.isLoading = false;
          const msg = this.parseBackendError(err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Add Employee',
            text: msg,
            confirmButtonText: 'OK',
          });
          console.error('Add error:', err);
        },
      });
    }
  }

  private handlePictureUploadAndNavigate(userId: number) {
    if (this.selectedPictureFile) {
      this.authService.adminUpdateProfilePicture(userId, this.selectedPictureFile).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('Success', 'Employee saved with new profile picture successfully', 'success');
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Warning', 'Employee saved, but failed to upload picture.', 'warning');
          this.router.navigate(['/employees']);
        }
      });
    } else {
      this.isLoading = false;
      Swal.fire('Success', 'Employee saved successfully', 'success');
      this.router.navigate(['/employees']);
    }
  }
}

```

### File: src\app\features\employees\employees.component.html
```html


<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
    <div class="d-flex align-items-center">
        <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
            <i class="bi bi-people-fill fs-4"></i>
        </div>
        <div>
            <h2 class="fw-bold text-dark mb-1">{{ 'Employee Management' | t }}</h2>
            <p class="text-muted mb-0 small">{{ 'Manage and track all company employees' | t }}</p>
        </div>
    </div>
    <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end flex-wrap">
        <div class="input-group shadow-sm" style="max-width: 350px; min-width: 200px; flex: 1;">
            <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control border-start-0 ps-0"
                placeholder="{{ 'Search employees...' | t }}"
                [(ngModel)]="searchQuery"
                (input)="filterEmployees()">
        </div>

        <div class="dropdown">
            <button class="btn btn-outline-secondary shadow-sm" type="button"
                data-bs-toggle="dropdown" aria-expanded="false" title="Filter Employees">
                <i class="bi bi-funnel-fill"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">Filter Options</h6>
                <div class="mb-3">
                    <label class="form-label small fw-semibold text-muted mb-1">{{ 'Department' | t }}</label>
                    <select class="form-select form-select-sm" [(ngModel)]="selectedDepartment" (change)="filterEmployees()">
                        <option value>All Departments</option>
                        @for (dept of uniqueDepartments; track dept) {
                        <option [value]="dept">{{ dept }}</option>
                        }
                    </select>
                </div>
                <div class="mb-2">
                    <label class="form-label small fw-semibold text-muted mb-1">{{ 'Status' | t }}</label>
                    <select class="form-select form-select-sm" [(ngModel)]="selectedStatus" (change)="filterEmployees()">
                        <option value>All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>

        @if (isAdmin) {
        <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-success px-3 px-md-4 fw-semibold" (click)="exportToExcel()" title="Export to Excel">
                <i class="bi bi-file-earmark-excel-fill" [class.me-md-2]="true"></i>
                <span class="d-none d-md-inline">{{ 'Export to Excel' | t }}</span>
            </button>
            <button class="btn btn-primary px-3 px-md-4 fw-semibold" routerLink="/employee-form" title="Add Employee">
                <i class="bi bi-person-plus-fill" [class.me-md-2]="true"></i>
                <span class="d-none d-md-inline">{{ 'Add Employee' | t }}</span>
            </button>
        </div>
        }
    </div>
</div>

@if (isLoading) {
<div class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2 text-muted">Fetching data from server...</p>
</div>
} @else {
<div class="card shadow-sm border-0">
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 text-nowrap">
            <thead class="table-light">
                <tr class="text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <th class="py-3 px-4 fw-semibold text-muted border-bottom-0">ID</th>
                    <th class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{ 'Employee' | t }}</th>
                    <th class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{ 'Email' | t }}</th>
                    <th class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{ 'Department' | t }}</th>
                    <th class="py-3 px-4 fw-semibold text-muted border-bottom-0 text-center">{{ 'Status' | t }}</th>
                    @if (isAdminOrHR) {
                    <th class="py-3 px-4 fw-semibold text-muted border-bottom-0 text-end">{{ 'Actions' | t }}</th>
                    }
                </tr>
            </thead>
            <tbody>
                @for (emp of paginatedEmployees; track emp.id) {
                <tr>
                    <td data-label="ID" class="py-3 px-4 fw-bold text-dark">#{{ emp.id }}</td>
                    <td data-label="Full Name" class="py-3 px-4 fw-bold text-dark">
                        <div class="d-flex align-items-center">
                            <!-- Profile picture or initials -->
                            <div class="me-3 flex-shrink-0" style="width: 36px; height: 36px;">
                                <img *ngIf="emp.profilePictureUrl"
                                    [src]="emp.profilePictureUrl"
                                    class="rounded-circle object-fit-cover w-100 h-100 border shadow-sm"
                                    alt="Profile">
                                <div *ngIf="!emp.profilePictureUrl"
                                    class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center w-100 h-100"
                                    style="font-size: 14px;">
                                    {{ emp.firstName ? emp.firstName.charAt(0).toUpperCase() : 'U' }}
                                </div>
                            </div>
                            {{ emp.firstName }} {{ emp.lastName }}
                        </div>
                    </td>
                    <td data-label="Email" class="py-3 px-4 text-muted">{{ emp.email }}</td>
                    <td data-label="Department" class="py-3 px-4">{{ emp.departmentName || emp.departmentId || '—' }}</td>
                    <td data-label="Status" class="py-3 px-4 text-center">
                        <span class="status-badge" [ngClass]="emp.isActive ? 'status-active' : 'status-inactive'">
                            <i class="bi" [ngClass]="emp.isActive ? 'bi-check-circle-fill' : 'bi-x-circle-fill'"></i>
                            {{ emp.isActive ? ('Active' | t) : ('Inactive' | t) }}
                        </span>
                    </td>
                    @if (isAdminOrHR) {
                    <td data-label="Actions" class="py-3 px-4 text-end text-nowrap actions-cell">
                        <button class="btn btn-outline-info btn-sm me-2" title="Details" (click)="viewFullDetails(emp)">
                            <i class="bi bi-file-earmark-person"></i>
                        </button>
                        @if (isAdmin) {
                        <button class="btn btn-sm btn-outline-secondary me-2" title="Download Report" (click)="downloadEmployeeReport(emp)">
                            <i class="bi bi-file-earmark-pdf"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm" title="Edit" (click)="editEmployee(emp.id)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger ms-2" title="Delete" (click)="onDelete(emp.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                        }
                    </td>
                    }
                </tr>
                } @empty {
                <tr>
                    <td [colSpan]="isAdminOrHR ? 6 : 5" class="text-center py-5">
                        <div class="d-flex flex-column align-items-center">
                            <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                <i class="bi bi-people text-secondary fs-1"></i>
                            </div>
                            <h5 class="fw-bold text-dark mb-1">{{ 'No Employees Found' | t }}</h5>
                            <p class="text-muted small mb-0">Try adjusting your filters or search query.</p>
                        </div>
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>

    <!-- Pagination Footer -->
    @if (employeesList.length > 0) {
    <div class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <small class="text-muted fw-medium">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, employeesList.length) }} of {{ employeesList.length }} entries
        </small>
        <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
            <li class="page-item" [class.disabled]="currentPage === 1">
                <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
            </li>
            <li class="page-item active">
                <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
            </li>
            <li class="page-item" [class.disabled]="currentPage === totalPages">
                <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
            </li>
        </ul>
    </div>
    }
</div>
}

<!-- ══════════ Employee Details Modal ══════════ -->
<div class="modal fade" id="employeeDetailsModal" tabindex="-1" aria-labelledby="employeeDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

            <div class="modal-header border-0 p-0">
                <div class="emp-modal-header w-100 p-4 d-flex align-items-center gap-3">
                    <!-- Avatar: show real picture or initials -->
                    <div class="emp-modal-avatar" [class.p-0]="selectedEmployeeProfile?.profilePictureUrl" style="overflow: hidden;">
                        <img *ngIf="selectedEmployeeProfile?.profilePictureUrl"
                            [src]="selectedEmployeeProfile.profilePictureUrl"
                            class="w-100 h-100 object-fit-cover"
                            alt="Profile Picture">
                        <span *ngIf="!selectedEmployeeProfile?.profilePictureUrl">
                            {{ getEmpInitials(selectedEmployeeProfile) }}
                        </span>
                    </div>
                    <div>
                        <h4 class="fw-bold text-white mb-0">
                            {{ selectedEmployeeProfile?.fullName || (selectedEmployeeProfile?.firstName + ' ' + selectedEmployeeProfile?.lastName) }}
                        </h4>
                        <span class="badge bg-white text-primary mt-1 px-3 py-2 rounded-pill shadow-sm">
                            {{ selectedEmployeeProfile?.positionTitle || 'Employee' }}
                        </span>
                    </div>
                    <button type="button" class="btn-close btn-close-white ms-auto shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>

            <div class="modal-body p-4">
                @if (selectedEmployeeProfile?.isLoadingDetails) {
                <div class="text-center py-4">
                    <div class="spinner-border text-primary" role="status"></div>
                    <p class="mt-2 text-muted">Loading full details...</p>
                </div>
                }
                @if (selectedEmployeeProfile && !selectedEmployeeProfile?.isLoadingDetails) {

                <h6 class="detail-section-title">
                    <i class="bi bi-person-lines-fill text-primary me-2"></i>Personal Information
                </h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i class="bi bi-envelope me-1"></i>Email</span>
                            <span class="detail-value">{{ selectedEmployeeProfile?.email || '—' }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i class="bi bi-telephone me-1"></i>Phone</span>
                            <span class="detail-value">{{ selectedEmployeeProfile?.phone || selectedEmployeeProfile?.phoneNumber || 'N/A' }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i class="bi bi-hash me-1"></i>Employee ID</span>
                            <span class="detail-value fw-bold text-primary">#{{ selectedEmployeeProfile?.id }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i class="bi bi-calendar-check me-1"></i>Hire Date</span>
                            <span class="detail-value">{{ selectedEmployeeProfile?.hireDate | date:'mediumDate' }}</span>
                        </div>
                    </div>
                </div>

                <h6 class="detail-section-title">
                    <i class="bi bi-briefcase-fill text-success me-2"></i>Employment Details
                </h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i class="bi bi-building me-1"></i>Department</span>
                            <span class="detail-value">{{ selectedEmployeeProfile?.departmentName || '—' }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i class="bi bi-person-badge me-1"></i>Position</span>
                            <span class="detail-value">{{ selectedEmployeeProfile?.positionTitle || '—' }}</span>
                        </div>
                    </div>
                </div>

                <h6 class="detail-section-title">
                    <i class="bi bi-activity text-warning me-2"></i>Account Status
                </h6>
                <div class="d-flex gap-3 flex-wrap">
                    <span class="status-badge" [ngClass]="selectedEmployeeProfile?.isActive !== false ? 'status-active' : 'status-inactive'">
                        <i class="bi me-1"
                            [class.bi-check-circle-fill]="selectedEmployeeProfile?.isActive !== false"
                            [class.bi-x-circle-fill]="selectedEmployeeProfile?.isActive === false"></i>
                        {{ selectedEmployeeProfile?.isActive !== false ? 'Active' : 'Inactive' }}
                    </span>
                </div>

                }
            </div>

            <div class="modal-footer border-0 bg-light d-flex justify-content-between align-items-center">
                <span class="text-muted small">
                    <i class="bi bi-shield-lock-fill me-1 text-secondary"></i>Confidential Employee Record
                </span>
                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-outline-secondary rounded-pill px-4" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg me-1"></i> {{ 'Close' | t }}
                    </button>
                    @if (isAdmin) {
                    <button type="button" class="btn btn-outline-danger rounded-pill px-4"
                        [disabled]="isGeneratingReport"
                        (click)="downloadEmployeeReport(selectedEmployeeProfile)">
                        @if (isGeneratingReport) {
                        <span class="spinner-border spinner-border-sm me-2"></span>{{ 'Loading...' | t }}
                        } @else {
                        <i class="bi bi-file-earmark-pdf-fill me-1"></i> {{ 'Download Report' | t }}
                        }
                    </button>
                    <button type="button" class="btn btn-primary rounded-pill px-4"
                        (click)="editEmployee(selectedEmployeeProfile?.id); detailsModal?.hide()">
                        <i class="bi bi-pencil-square me-1"></i> Edit Employee
                    </button>
                    }
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.emp-modal-header {
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
}

.emp-modal-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
  line-height: 1;
}

.detail-section-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #6c757d;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  background: #f8fafc;
  border: 1px solid #e8ecf0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8592a3;
  font-weight: 600;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a202c;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.cursor-pointer {
  cursor: pointer;
}
</style>

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

### File: src\app\features\leave\leave.component.html
```html
<div class="page-container p-4">


    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-calendar2-check-fill fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">{{ isAdminOrHR ? ('All Leave Requests' | t) : ('My Leave Requests' | t) }}</h2>
                <p class="text-muted small mb-0">{{ 'Manage and track time-off requests effectively' | t }}</p>
            </div>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="{{ 'Search by name, ID, or reason...' | t }}"
                    [(ngModel)]="leaveSearchQuery" 
                    (input)="filterLeaves()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Leaves">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">{{ 'Filter Options' | t }}</h6>
                    
                    <div class="mb-3">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Leave Type' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedLeaveType" (change)="filterLeaves()">
                            <option value="">{{ 'All Types' | t }}</option>
                            <option *ngFor="let type of leaveTypes" [value]="type.name">{{ type.name }}</option>
                        </select>
                    </div>
                    
                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Status' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedLeaveStatus" (change)="filterLeaves()">
                            <option value="">{{ 'All Statuses' | t }}</option>
                            <option value="Pending">{{ 'Pending' | t }}</option>
                            <option value="Approved">{{ 'Approved' | t }}</option>
                            <option value="Rejected">{{ 'Rejected' | t }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <button *ngIf="!isAdminOrHR"
                class="btn btn-primary px-3 px-md-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                (click)="openModal()">
                <i class="bi bi-send-plus" [class.me-md-2]="true"></i> <span class="d-none d-md-inline">{{ 'Request Leave' | t }}</span>
            </button>
        </div>
    </div>

    <!-- Annual Leave Balance Banner for Employees -->
    <div class="row mb-4" *ngIf="!isAdminOrHR">
        <div class="col-12">
            <div class="card border-0 shadow-sm rounded-4 bg-primary bg-opacity-10 position-relative overflow-hidden">
                <div class="position-absolute end-0 top-0 h-100 w-50" style="background: linear-gradient(90deg, transparent, rgba(13, 110, 253, 0.05)); z-index: 0;"></div>
                <div class="card-body d-flex align-items-center justify-content-between p-4 position-relative" style="z-index: 1;">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 55px; height: 55px;">
                            <i class="bi bi-airplane-engines-fill fs-4"></i>
                        </div>
                        <div>
                            <p class="text-primary small mb-0 fw-bold text-uppercase" style="letter-spacing: 0.5px;">{{ 'Annual Leave Balance' | t }}</p>
                            <h3 class="mb-0 fw-bold text-dark">{{ employeeAnnualLeaveBalance }} {{ 'Days Remaining' | t }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 text-nowrap">

                <thead class="bg-light text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <tr>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Leave Type' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Duration' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Reason' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-center">{{ 'Status' | t }}</th>
                        <th *ngIf="isAdminOrHR"
                            class="py-3 px-4 border-bottom-0 fw-semibold text-end">{{ 'Actions' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td [colSpan]="isAdminOrHR ? 6 : 5" class="text-center py-5 text-muted no-data-td">
                            <span
                                class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading requests...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && leavesList.length === 0">
                        <td [colSpan]="isAdminOrHR ? 7 : 6" class="text-center py-5 no-data-td">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-airplane-engines text-secondary fs-1"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">{{ 'No Leave Requests' | t }}</h5>
                                <p class="text-muted small mb-0">{{ 'No leave data available matching your search criteria.' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let leave of paginatedLeaves">
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-3">
                            <div class="d-flex align-items-center">
                                <div class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-2 rounded-circle d-flex align-items-center justify-content-center"
                                    style="width: 32px; height: 32px; font-size: 13px;">
                                    {{ leave.employeeName ? leave.employeeName.charAt(0).toUpperCase() : 'U' }}
                                </div>
                                <span class="fw-semibold text-dark">{{ leave.employeeName }}</span>
                            </div>
                        </td>
                        <td data-label="Leave Type" class="py-3 px-4 fw-bold text-dark">
                            <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle p-2 me-3 bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center"
                                    style="width: 35px; height: 35px;">
                                    <i class="bi bi-journal-text"></i>
                                </div>
                                {{ getLeaveTypeText(leave.leaveType) }}
                            </div>
                        </td>

                        <td data-label="Duration" class="py-3 px-4">
                            <div class="fw-medium text-dark">{{ leave.startDate
                                | date:'MMM dd' }} <i
                                    class="bi bi-arrow-right text-muted mx-1"></i>
                                {{ leave.endDate | date:'MMM dd, yyyy' }}</div>
                        </td>

                        <td data-label="Reason" class="py-3 px-4 text-secondary">
                            <span class="d-inline-block text-truncate"
                                style="max-width: 180px;"
                                [title]="leave.reason">
                                {{ leave.reason || ('No reason provided' | t) }}
                            </span>
                        </td>

                        <td data-label="Status" class="py-3 px-4 text-center">
                            <span class="status-badge"
                                [ngClass]="{
                                  'status-approved': getStatusText(leave.status) === 'Approved',
                                  'status-pending': getStatusText(leave.status) === 'Pending',
                                  'status-rejected': getStatusText(leave.status) === 'Rejected'
                                }">
                                <i class="bi me-1"
                                    [ngClass]="{
         'bi-check-circle-fill': getStatusText(leave.status) === 'Approved',
         'bi-hourglass-split': getStatusText(leave.status) === 'Pending',
         'bi-x-circle-fill': getStatusText(leave.status) === 'Rejected'
       }"></i>
                                {{ getStatusText(leave.status) }}
                            </span>
                            <div *ngIf="getStatusText(leave.status) === 'Rejected' && leave.rejectionReason"
                                class="mt-2 text-center">
                                <button class="btn btn-light text-danger rounded-circle shadow-sm p-0"
                                    (click)="showRejectionReason(leave.rejectionReason)"
                                    title="View Rejection Reason"
                                    style="width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;">
                                    <i class="bi bi-chat-left-text-fill" style="font-size: 14px;"></i>
                                </button>
                            </div>
                        </td>

                        <td *ngIf="isAdminOrHR" data-label="Actions" class="py-3 px-4 text-end actions-cell">
                            <div
                                *ngIf="getStatusText(leave.status) === 'Pending'"
                                class="d-flex justify-content-end gap-2">
                                <button
                                    class="btn btn-sm btn-success rounded-3 shadow-sm px-3"
                                    (click)="changeStatus(leave.id, 1)">
                                    {{ 'Approve' | t }}
                                </button>
                                <button
                                    class="btn btn-sm btn-outline-danger rounded-3 px-3"
                                    (click)="changeStatus(leave.id, 2)">
                                    {{ 'Reject' | t }}
                                </button>
                            </div>
                            <span
                                *ngIf="getStatusText(leave.status) !== 'Pending'"
                                class="text-muted small">{{ 'Processed' | t }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="leavesList.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                {{ 'Showing' | t }} {{ (currentPage - 1) * itemsPerPage + 1 }} {{ 'to' | t }} {{ getMathMin(currentPage * itemsPerPage, leavesList.length) }} {{ 'of' | t }} {{ leavesList.length }} {{ 'entries' | t }}
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">{{ 'Previous' | t }}</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">{{ 'Next' | t }}</a>
                </li>
            </ul>
        </div>
    </div>

<div class="modal fade" id="leaveModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
            <div class="modal-header border-bottom-0 pt-4 px-4">
                <h5 class="modal-title fw-bold text-dark"><i
                        class="bi bi-send-plus text-primary me-2"></i>New Leave
                    Request</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <form #leaveForm="ngForm">

                    <div class="mb-4">
                        <label
                            class="form-label fw-semibold text-secondary small">Leave
                            Type *</label>
                        <select class="form-select bg-light border-0"
                            name="leaveType" [(ngModel)]="leaveData.leaveType"
                            required>
                            <option *ngFor="let type of leaveTypes"
                                [value]="type.id">{{ type.name }}</option>
                        </select>
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label
                                class="form-label fw-semibold text-secondary small">Start
                                Date *</label>
                            <input type="date"
                                class="form-control bg-light border-0"
                                name="startDate"
                                [(ngModel)]="leaveData.startDate"
                                [min]="getToday()" required>
                        </div>
                        <div class="col-6">
                            <label
                                class="form-label fw-semibold text-secondary small">End
                                Date *</label>
                            <input type="date"
                                class="form-control bg-light border-0"
                                name="endDate" [(ngModel)]="leaveData.endDate"
                                [min]="leaveData.startDate || getToday()" required>
                        </div>
                    </div>

                    <div class="mb-2">
                        <label
                            class="form-label fw-semibold text-secondary small">Reason
                            *</label>
                        <textarea class="form-control bg-light border-0"
                            name="reason" [(ngModel)]="leaveData.reason"
                            rows="3" required
                            placeholder="Explain why you need this leave..."></textarea>
                    </div>

                </form>
            </div>
            <div class="modal-footer border-top-0 pb-4 px-4">
                <button type="button"
                    class="btn btn-light px-4 rounded-3 fw-semibold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                    class="btn btn-primary px-4 rounded-3 fw-semibold"
                    (click)="submitLeaveRequest()"
                    [disabled]="leaveForm.invalid || isProcessing">
                    <span *ngIf="isProcessing"
                        class="spinner-border spinner-border-sm me-2"></span>
                    Submit Request
                </button>
            </div>
        </div>
    </div>
</div>

<style>
</style>


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

### File: src\app\features\leave-form\leave-form.component.html
```html
<div class="container mt-4" style="max-width: 600px;">
    <div class="card shadow-sm border-0 rounded-3">
        <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
            <h3 class="fw-bold text-secondary mb-0">Apply for Leave</h3>
        </div>

        <div class="card-body p-4">
            <form [formGroup]="leaveForm" (ngSubmit)="onSubmit()">

                <div class="mb-3">
                    <label class="form-label fw-bold text-muted small">Leave
                        Type</label>
                    <select class="form-select bg-light" formControlName="leaveType">
                        <option value="" disabled selected>Select Leave
                            Type</option>
                        <!-- ✅ استخدم أرقام تطابق Backend enum: Annual=0, Sick=1, Emergency=2, Unpaid=3 -->
                        <option value="0">Annual</option>
                        <option value="1">Sick</option>
                        <option value="2">Emergency</option>
                        <option value="3">Unpaid</option>
                    </select>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold text-muted small">Start
                            Date</label>
                        <input type="date" class="form-control bg-light" formControlName="startDate">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold text-muted small">End
                            Date</label>
                        <input type="date" class="form-control bg-light" formControlName="endDate">
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-bold text-muted small">Reason</label>
                    <textarea class="form-control bg-light" formControlName="reason" rows="3"
                        placeholder="Explain your reason..."></textarea>
                </div>

                <div class="d-flex justify-content-end gap-2">
                    <a routerLink="/leave" class="btn btn-light px-4 fw-bold text-muted">Cancel</a>
                    <button type="submit" class="btn btn-primary px-5 fw-bold" [disabled]="isLoading">
                        <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                        {{ isLoading ? loadingMessage : 'Submit Request' }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
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

### File: src\app\features\meetings\meetings.component.html
```html
<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-secondary bg-opacity-10 text-secondary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-calendar-event fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1 h3">{{ 'Meetings & Interviews' | t }}</h2>
                <p class="text-muted small mb-0">{{ 'Manage schedules and appointments' | t }}</p>
            </div>
        </div>
        <button *ngIf="isHrOrAdmin" class="btn btn-dark shadow-sm rounded-pill px-4" (click)="openAddModal()">
            <i class="bi bi-plus-lg me-2"></i> {{ 'Schedule Meeting' | t }}
        </button>
    </div>

    <!-- Meetings Table -->
    <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light text-muted small text-uppercase">
                        <tr>
                            <th class="ps-4">{{ 'Title' | t }}</th>
                            <th>{{ 'Organizer' | t }}</th>
                            <th>{{ 'Employee' | t }}</th>
                            <th>{{ 'Date & Time' | t }}</th>
                            <th>{{ 'Status' | t }}</th>
                            <th class="text-end pe-4">{{ 'Actions' | t }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @if (isLoading) {
                        <tr>
                            <td colspan="6" class="text-center py-5">
                                <div class="spinner-border text-dark" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                        } @else {
                        @for (meeting of meetings; track meeting.id) {
                        <tr>
                            <td class="ps-4">
                                <div class="fw-bold text-dark">{{ meeting.title }}</div>
                                <div class="small text-muted text-truncate" style="max-width: 250px;">{{ meeting.reason || meeting.notes }}</div>
                            </td>
                            <td>
                                <span class="fw-medium text-dark">{{ meeting.organizerName || 'System' }}</span>
                            </td>
                            <td>
                                <span class="fw-medium text-dark">{{ meeting.employeeName }}</span>
                            </td>
                            <td>
                                <div><i class="bi bi-calendar-event text-muted me-2"></i>{{ meeting.scheduledAt | date:'mediumDate' }}</div>
                                <div class="small text-muted"><i class="bi bi-clock me-2"></i>{{ meeting.scheduledAt | date:'shortTime' }} <span *ngIf="meeting.durationMinutes">({{ meeting.durationMinutes }} min)</span></div>
                            </td>
                            <td>
                                <span class="badge rounded-pill px-3 py-2" [ngClass]="getStatusBadgeClass(meeting.status)">
                                    {{ getStatusLabel(meeting.status) | t }}
                                </span>
                            </td>
                            <td class="text-end pe-4">
                                <div class="d-flex align-items-center justify-content-end gap-2">
                                    <!-- Mark Completed & Cancel (HR/Admin only, only when Scheduled) -->
                                    <ng-container *ngIf="isHrOrAdmin && meeting.status === 'Scheduled'">
                                        <button
                                            class="btn btn-success btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3"
                                            (click)="updateStatus(meeting.id, MeetingStatus.Completed)"
                                            title="Mark Completed">
                                            <i class="bi bi-check2-circle"></i>
                                            <span class="small">Done</span>
                                        </button>
                                        <button
                                            class="btn btn-danger btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3"
                                            (click)="updateStatus(meeting.id, MeetingStatus.Cancelled)"
                                            title="Cancel Meeting">
                                            <i class="bi bi-slash-circle"></i>
                                            <span class="small">Cancel</span>
                                        </button>
                                    </ng-container>
                                    <!-- Join Meet (visible to everyone when link exists) -->
                                    <a *ngIf="meeting.meetLink && meeting.status === 'Scheduled'"
                                        [href]="meeting.meetLink" target="_blank"
                                        class="btn btn-outline-primary btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3"
                                        title="Join Meeting">
                                        <i class="bi bi-camera-video"></i>
                                        <span class="small">Join</span>
                                    </a>
                                    <!-- No actions when Completed or Cancelled -->
                                    <span *ngIf="meeting.status !== 'Scheduled'" class="text-muted small fst-italic">—</span>
                                </div>
                            </td>
                        </tr>
                        } @empty {
                        <tr>
                            <td colspan="6" class="text-center py-5 text-muted">
                                <i class="bi bi-calendar2-x fs-1 d-block mb-3 text-light-gray"></i>
                                {{ 'No meetings found.' | t }}
                            </td>
                        </tr>
                        }
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Add Meeting Modal -->
<div class="modal fade" id="addMeetingModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
            <div class="modal-header bg-light border-0 rounded-top-4">
                <h5 class="modal-title fw-bold text-dark">{{ 'Schedule Meeting' | t }}</h5>
                <button type="button" class="btn-close" (click)="closeModal('addMeetingModal')"></button>
            </div>
            <div class="modal-body p-4">
                <form [formGroup]="addForm" (ngSubmit)="onSubmit()">
                    
                    <div class="mb-3">
                        <label class="form-label fw-bold text-secondary">{{ 'Title / Subject' | t }} <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" formControlName="title" placeholder="e.g., Performance Review">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold text-secondary">{{ 'Employee' | t }} <span class="text-danger">*</span></label>
                        <select class="form-select" formControlName="employeeId">
                            <option value="">{{ 'Select Employee' | t }}</option>
                            <option *ngFor="let emp of employees" [value]="emp.id">
                                {{ emp.firstName }} {{ emp.lastName }} ({{ emp.position?.title }})
                            </option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold text-secondary">{{ 'Date' | t }} <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text bg-white border-end-0"><i class="bi bi-calendar-event text-primary"></i></span>
                                <input type="date" class="form-control border-start-0" formControlName="meetingDate" style="color-scheme: light;">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold text-secondary">{{ 'Time' | t }} <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text bg-white border-end-0"><i class="bi bi-clock text-primary"></i></span>
                                <input type="time" class="form-control border-start-0" formControlName="meetingTime" style="color-scheme: light;">
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold text-secondary">{{ 'Duration' | t }} <span class="text-danger">*</span></label>
                        <select class="form-select" formControlName="durationMinutes">
                            <option value="15">15 Minutes</option>
                            <option value="30">30 Minutes</option>
                            <option value="45">45 Minutes</option>
                            <option value="60">1 Hour</option>
                            <option value="90">1.5 Hours</option>
                            <option value="120">2 Hours</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold text-secondary">{{ 'Reason / Notes' | t }} <span class="text-danger">*</span></label>
                        <textarea class="form-control" rows="3" formControlName="reason"
                            placeholder="Describe the reason for the meeting (min. 10 characters)..."
                            [class.is-invalid]="addForm.get('reason')?.invalid && addForm.get('reason')?.touched"></textarea>
                        <div class="invalid-feedback">
                            @if (addForm.get('reason')?.errors?.['required']) {
                                Reason is required.
                            } @else if (addForm.get('reason')?.errors?.['minlength']) {
                                Reason must be at least 10 characters.
                            }
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2">
                        <button type="button" class="btn btn-light rounded-pill px-4" (click)="closeModal('addMeetingModal')">{{ 'Cancel' | t }}</button>
                        <button type="submit" class="btn btn-dark rounded-pill px-4" [disabled]="addForm.invalid || isSubmitting">
                            <span *ngIf="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Schedule' | t }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

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

### File: src\app\features\my-profile\my-profile.component.html
```html
<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  <div class="d-flex align-items-center">
    <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
      <i class="bi bi-person-badge-fill fs-4"></i>
    </div>
    <div>
      <h2 class="fw-bold text-dark mb-1">{{ 'My Profile' | t }}</h2>
      <p class="text-muted mb-0 small">{{ 'View and manage your personal account details' | t }}</p>
    </div>
  </div>
  <button class="btn btn-primary shadow-sm rounded-pill px-4 fw-semibold" (click)="openEditModal()" *ngIf="!isLoading">
    <i class="bi bi-pencil-square me-2"></i>{{ 'Edit Profile' | t }}
  </button>
</div>

<!-- ─── Loading ─── -->
@if (isLoading) {
<div class="text-center my-5">
  <div class="spinner-border text-primary" role="status"></div>
  <p class="mt-2 text-muted">Loading your profile...</p>
</div>
}

<!-- بروفايل الأدمن -->
@else if (isAdmin) {
<div class="row g-4">
  <!-- Left card: Avatar -->
  <div class="col-md-4">
    <div class="card shadow-sm border-0 h-100 text-center p-4">
      <div class="mb-3 text-center">
        <div class="position-relative d-inline-block">
          <div class="profile-avatar mx-auto admin-avatar-bg">
            <img *ngIf="profilePicUrl" [src]="profilePicUrl" alt="Profile" class="w-100 h-100 rounded-circle object-fit-cover">
            <span *ngIf="!profilePicUrl">{{ initials }}</span>
          </div>
          <label class="upload-btn position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm border border-2 border-light d-flex align-items-center justify-content-center text-primary transition-all" style="width: 32px; height: 32px; cursor: pointer; transform: translate(10%, 10%); z-index: 2;" title="{{ 'Change Picture' | t }}">
            <i class="bi bi-camera-fill" *ngIf="!isUploadingPic"></i>
            <span class="spinner-border spinner-border-sm" *ngIf="isUploadingPic"></span>
            <input type="file" class="d-none" accept="image/*" (change)="onFileSelected($event)" [disabled]="isUploadingPic">
          </label>
        </div>
      </div>
      
      <!-- Pending Picture Preview (Admin) -->
      <div *ngIf="pendingProfilePicUrl" class="mx-auto mb-3 text-center">
        <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span class="badge bg-warning text-dark rounded-pill px-3 py-1">
            <i class="bi bi-clock-history me-1"></i>{{ 'Pending Approval' | t }}
          </span>
        </div>
        <img [src]="pendingProfilePicUrl" alt="Pending" class="rounded-circle object-fit-cover shadow-sm border border-2 border-warning" style="width: 50px; height: 50px;">
        <p class="text-muted small mt-1 mb-0">{{ 'Awaiting HR review' | t }}</p>
      </div>

      <h4 class="fw-bold text-dark mb-1">{{ userName }}</h4>
      <p class="text-muted mb-1">{{ userRole }}</p>
      <p class="text-muted small mb-3">{{ userEmail }}</p>
      <span
        class="badge rounded-pill px-3 py-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">
        <i class="bi bi-shield-fill-check me-1"></i> System Admin
      </span>
    </div>
  </div>

  <!-- Right card: Details -->
  <div class="col-md-8">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-secondary">
          <i class="bi bi-person-lines-fill me-2 text-primary"></i>{{ 'Account Details' | t }}
        </h5>
      </div>
      <div class="card-body p-4">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-envelope me-1"></i> {{ 'Email Address' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ userEmail || '—' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-person-badge me-1"></i> {{ 'Role' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ userRole }}</p>
          </div>
        </div>

        <hr class="my-4 text-muted opacity-25">

        <h5 class="fw-bold text-secondary mb-3">
          <i class="bi bi-shield-check me-2 text-primary"></i>{{ 'Permissions' | t }}
        </h5>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-people-fill text-primary fs-5"></i>
              <span class="fw-semibold small">{{ 'Employee Management' | t }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-gear-fill text-success fs-5"></i>
              <span class="fw-semibold small">{{ 'System Control' | t }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-cash-stack text-warning fs-5"></i>
              <span class="fw-semibold small">{{ 'Payroll Access' | t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

<!-- ─── EMPLOYEE PROFILE ─── -->
@else if (profile) {
<div class="row g-4">
  <div class="col-md-4">
    <div class="card shadow-sm border-0 h-100 text-center p-4">
      <div class="mb-3 text-center">
        <div class="position-relative d-inline-block">
          <div class="profile-avatar mx-auto">
            <img *ngIf="profilePicUrl" [src]="profilePicUrl" alt="Profile" class="w-100 h-100 rounded-circle object-fit-cover">
            <span *ngIf="!profilePicUrl">{{ getProfileInitials() }}</span>
          </div>
          <label class="upload-btn position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm border border-2 border-light d-flex align-items-center justify-content-center text-primary transition-all" style="width: 32px; height: 32px; cursor: pointer; transform: translate(10%, 10%); z-index: 2;" title="{{ 'Change Picture' | t }}">
            <i class="bi bi-camera-fill" *ngIf="!isUploadingPic"></i>
            <span class="spinner-border spinner-border-sm" *ngIf="isUploadingPic"></span>
            <input type="file" class="d-none" accept="image/*" (change)="onFileSelected($event)" [disabled]="isUploadingPic">
          </label>
        </div>
      </div>

      <!-- Pending Picture Preview (Employee) -->
      <div *ngIf="pendingProfilePicUrl" class="mx-auto mb-3 text-center">
        <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span class="badge bg-warning text-dark rounded-pill px-3 py-1">
            <i class="bi bi-clock-history me-1"></i>{{ 'Pending Approval' | t }}
          </span>
        </div>
        <img [src]="pendingProfilePicUrl" alt="Pending" class="rounded-circle object-fit-cover shadow-sm border border-2 border-warning" style="width: 50px; height: 50px;">
        <p class="text-muted small mt-1 mb-0">{{ 'Awaiting HR review' | t }}</p>
      </div>

      <h4 class="fw-bold text-dark mb-1">{{ profile.fullName }}</h4>
      <p class="text-muted mb-3">{{ profile.positionTitle || 'Employee' }}</p>
      <span
        class="badge rounded-pill px-3 py-2 bg-success bg-opacity-10 text-success border border-success border-opacity-25">
        <i class="bi bi-check-circle-fill me-1"></i> Active
      </span>
    </div>
  </div>

  <div class="col-md-8">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-secondary">
          <i class="bi bi-person-lines-fill me-2 text-primary"></i>{{ 'Personal Details' | t }}
        </h5>
      </div>
      <div class="card-body p-4">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-envelope me-1"></i> {{ 'Email Address' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.email || '—' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-telephone me-1"></i> {{ 'Phone' | t }}
            </label>
            <!-- رقم التلفون -->
            <p class="fw-semibold text-dark fs-5 mb-0">
              {{ profile.phone || profile.phoneNumber || 'N/A' }}
            </p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-building me-1"></i> {{ 'Department' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.departmentName || 'N/A' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-calendar2-check me-1"></i> {{ 'Hire Date' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.hireDate | date:'longDate' }}</p>
          </div>
        </div>

        <hr class="my-4 text-muted opacity-25">

        <h5 class="fw-bold text-secondary mb-3">
          <i class="bi bi-clock-history me-2 text-info"></i>{{ 'Status' | t }}
        </h5>
        <div class="row">
          <div class="col-md-6">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center">
              <i class="bi bi-person-check-fill fs-2 text-success me-3"></i>
              <div>
                <h6 class="text-muted text-uppercase fw-bold small mb-1">{{ 'Status' | t }}</h6>
                <span class="fs-5 fw-bold text-success">{{ 'Active' | t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

<!-- ─── Not linked ─── -->
@else if (!isLoading && !profile && !isAdmin) {
<div class="alert alert-warning d-flex align-items-center rounded-3" role="alert">
  <i class="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
  <div>
    <h5 class="alert-heading fw-bold mb-1">{{ 'Profile Not Linked' | t }}</h5>
    Your account is not yet linked to an employee profile. Please contact your administrator.
  </div>
</div>
}

<!-- ─── Edit Profile Modal ─── -->
<div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg rounded-4">
      <div class="modal-header border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-dark"><i class="bi bi-person-lines-fill text-primary me-2"></i>{{ 'Edit Profile' | t }}
        </h5>
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4">
        <!-- Contact Info -->
        <h6 class="fw-bold text-secondary mb-3 small text-uppercase">{{ 'Contact Information' | t }}</h6>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">Email Address</label>
          <input type="email" class="form-control bg-light border-0 py-2" [(ngModel)]="editData.email"
            placeholder="name@example.com">
        </div>
        <div class="mb-4" *ngIf="profile">
          <label class="form-label text-muted small fw-semibold">{{ 'Phone' | t }}</label>
          <input type="text" class="form-control bg-light border-0 py-2" [(ngModel)]="editData.phone"
            placeholder="e.g. +123456789">
        </div>

        <hr class="my-4 text-muted opacity-25">

        <!-- Security -->
        <h6 class="fw-bold text-secondary mb-3 small text-uppercase">{{ 'Change Password' | t }}</h6>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'Current Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.oldPassword"
            placeholder="••••••••">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'New Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.newPassword"
            placeholder="Min. 6 characters">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'Confirm New Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.confirmNewPassword"
            placeholder="Repeat new password">
        </div>
      </div>
      <div class="modal-footer border-top-0 pb-4 px-4">
        <button type="button" class="btn btn-light px-4 rounded-pill" data-bs-dismiss="modal">{{ 'Cancel' | t
          }}</button>
        <button type="button" class="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm" (click)="saveProfile()"
          [disabled]="isUpdatingProfile || isChangingPwd">
          <span *ngIf="isUpdatingProfile || isChangingPwd" class="spinner-border spinner-border-sm me-2"></span> {{
          'Save Changes' | t }}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .profile-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    line-height: 90px;
    text-align: center;
  }

  .admin-avatar-bg {
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
  }

  .upload-btn:hover {
    background-color: #f8f9fa !important;
    transform: translate(10%, 10%) scale(1.1) !important;
  }
  
  .object-fit-cover {
    object-fit: cover;
  }
</style>
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
  isUploadingPic = false;
  profilePicUrl: string | null = null;
  pendingProfilePicUrl: string | null = null;

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

    this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    window.addEventListener('profile_pic_updated', () => {
      this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    });

    // Load pending picture status from /me
    this.authService.getMe().subscribe({
      next: (me: any) => {
        if (me?.pendingProfilePictureUrl) {
          this.pendingProfilePicUrl = me.pendingProfilePictureUrl;
        }
      },
      error: () => {}
    });
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire('Invalid File', 'Please upload a JPG, PNG, WebP or GIF image.', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire('File Too Large', 'Image must be smaller than 5MB.', 'error');
        return;
      }

      this.isUploadingPic = true;
      this.authService.uploadProfilePicture(file).subscribe({
        next: (res) => {
          this.isUploadingPic = false;
          this.pendingProfilePicUrl = res?.data ?? null;
          Swal.fire({
            icon: 'info',
            title: 'Picture Submitted!',
            html: `<p>Your profile picture has been submitted for review.</p>
                   <p class="text-muted small mt-2">An HR manager will review and approve it shortly. You will be notified once it\'s approved.</p>`,
            confirmButtonText: 'Got it!',
            confirmButtonColor: '#4361ee',
          });
        },
        error: (err) => {
          this.isUploadingPic = false;
          Swal.fire(
            'Error',
            getFriendlyErrorMessage(err, 'Failed to upload profile picture.'),
            'error'
          );
        }
      });
    }
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

### File: src\app\features\payroll-adjustments\payroll-adjustments.component.html
```html
<div class="page-container p-4">
    <div
        class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div
                class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3"
                style="width: 48px; height: 48px;">
                <i class="bi bi-wallet2 fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">{{ 'Bonus & Penalty' | t
                    }}</h2>
                <p class="text-muted small mb-0">{{
                    'Manage employee deductions and allowances before payroll' |
                    t }}</p>
            </div>
        </div>
        @if (isAdminOrHR) {
        <button
            class="btn btn-primary shadow-sm text-nowrap px-4 py-2 rounded-3 fw-semibold"
            (click)="openAddModal()">
            <i class="bi bi-plus-lg me-1"></i> {{ 'Add Adjustment' | t }}
        </button>
        }
    </div>

    @if (isLoading) {
    <div class="text-center my-5 py-5">
        <div class="spinner-border text-primary mb-3" role="status"
            style="width: 3rem; height: 3rem;"></div>
        <p class="text-muted fw-medium fs-5">Fetching adjustments...</p>
    </div>
    } @else {
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th
                            class="py-3 px-4 text-muted small text-uppercase fw-semibold border-bottom-0">ID</th>
                        <th
                            class="py-3 px-4 text-muted small text-uppercase fw-semibold border-bottom-0">Employee</th>
                        <th
                            class="py-3 px-4 text-muted small text-uppercase fw-semibold border-bottom-0">Type</th>
                        <th
                            class="py-3 px-4 text-muted small text-uppercase fw-semibold border-bottom-0">Amount</th>
                        <th
                            class="py-3 px-4 text-muted small text-uppercase fw-semibold border-bottom-0">Date</th>
                        <th
                            class="py-3 px-4 text-muted small text-uppercase fw-semibold border-bottom-0">Reason</th>
                        @if (isAdminOrHR) {
                        <th
                            class="py-3 px-4 text-muted small text-uppercase fw-semibold border-bottom-0 text-end">Actions</th>
                        }
                    </tr>
                </thead>
                <tbody class="border-top-0">
                    @for (adj of adjustments; track adj.id) {
                    <tr>
                        <td class="py-3 px-4 fw-bold text-secondary">#{{ adj.id
                            }}</td>
                        <td class="py-3 px-4 fw-bold text-dark">
                            <div class="d-flex align-items-center">
                                <div
                                    class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-3 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                    style="width: 35px; height: 35px; font-size: 13px;">
                                    {{ (adj.employeeName ||
                                    getEmployeeName(adj.employeeId)).charAt(0)
                                    }}
                                </div>
                                {{ adj.employeeName ||
                                getEmployeeName(adj.employeeId) }}
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            @if (adj.type === 0) {
                            <span
                                class="badge bg-danger bg-opacity-10 text-danger px-2 py-1 rounded-2 fw-semibold">Penalty</span>
                            } @else {
                            <span
                                class="badge bg-success bg-opacity-10 text-success px-2 py-1 rounded-2 fw-semibold">Bonus</span>
                            }
                        </td>
                        <td class="py-3 px-4 fw-bold"
                            [class.text-danger]="adj.type === 0"
                            [class.text-success]="adj.type === 1">
                            {{ adj.type === 0 ? '-' : '+' }}{{ adj.amount |
                            number:'1.2-2' }} JD
                        </td>
                        <td class="py-3 px-4 text-muted">{{ adj.date |
                            date:'mediumDate' }}</td>
                        <td class="py-3 px-4 text-muted text-wrap">
                            {{ adj.reason }}
                        </td>
                        @if (isAdminOrHR) {
                        <td class="py-3 px-4 text-end">
                            <button
                                class="btn btn-light btn-sm rounded-circle shadow-none text-danger d-inline-flex align-items-center justify-content-center p-0"
                                style="width: 32px; height: 32px;"
                                [disabled]="adj.isApplied"
                                (click)="deleteAdjustment(adj.id)"
                                title="Delete Adjustment">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </td>
                        }
                    </tr>
                    } @empty {
                    <tr>
                        <td colspan="7" class="text-center py-5">
                            <div
                                class="text-muted d-flex flex-column align-items-center">
                                <i
                                    class="bi bi-inbox fs-1 mb-3 text-black-50"></i>
                                <span class="fw-medium fs-5">No adjustments
                                    found.</span>
                                <p class="small mt-1">Add a penalty or bonus to
                                    see it listed here.</p>
                            </div>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
        </div>
    </div>
    }
</div>

<!-- Add Adjustment Modal -->
<div class="modal fade" id="addAdjustmentModal" tabindex="-1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
            <div class="modal-header border-bottom bg-light">
                <h5 class="modal-title text-primary fw-bold">
                    <i class="bi bi-plus-circle me-2"></i> {{ 'Add Adjustment' |
                    t }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form [formGroup]="addForm" (ngSubmit)="saveAdjustment()">
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label class="form-label fw-bold text-secondary">{{
                            'Employee' | t }} <span
                                class="text-danger">*</span></label>
                        <select class="form-select" formControlName="employeeId"
                            [class.is-invalid]="addForm.get('employeeId')?.invalid && addForm.get('employeeId')?.touched">
                            <option value disabled selected>Select
                                Employee</option>
                            <option *ngFor="let emp of employees"
                                [value]="emp.id">{{ emp.firstName }} {{
                                emp.lastName }} (ID: {{emp.id}})</option>
                        </select>
                        <div class="invalid-feedback">Please select an
                            employee.</div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold text-secondary">{{
                                'Type' | t }} <span
                                    class="text-danger">*</span></label>
                            <select class="form-select" formControlName="type">
                                <option *ngFor="let t of adjustmentTypes"
                                    [ngValue]="t.value">{{ t.label }}</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold text-secondary">{{
                                'Amount (JD)' | t }} <span
                                    class="text-danger">*</span></label>
                            <input type="number" class="form-control"
                                formControlName="amount" min="0.01" step="0.01"
                                placeholder="0.00"
                                [class.is-invalid]="addForm.get('amount')?.invalid && addForm.get('amount')?.touched">
                            <div class="invalid-feedback">Valid amount is
                                required.</div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold text-secondary">{{
                            'Reason' | t }} <span
                                class="text-danger">*</span></label>
                        <textarea class="form-control" formControlName="reason"
                            rows="3"
                            placeholder="e.g. Late for work, Outstanding performance..."
                            [class.is-invalid]="addForm.get('reason')?.invalid && addForm.get('reason')?.touched"></textarea>
                        <div class="invalid-feedback">Reason is required.</div>
                    </div>
                </div>
                <div class="modal-footer bg-light border-top-0">
                    <button type="button" class="btn btn-light px-4 border"
                        data-bs-dismiss="modal" [disabled]="isSubmitting">{{
                        'Cancel' | t }}</button>
                    <button type="submit" class="btn btn-primary px-4"
                        [disabled]="addForm.invalid || isSubmitting">
                        @if (isSubmitting) {
                        <span class="spinner-border spinner-border-sm me-2"
                            role="status" aria-hidden="true"></span> Saving...
                        } @else {
                        <i class="bi bi-save me-1"></i> {{ 'Save Adjustment' | t
                        }}
                        }
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

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

### File: src\app\features\pending-approvals\pending-approvals.component.html
```html
<div class="page-wrapper">

  <!-- Page Header -->
  <div class="d-flex align-items-center mb-4 gap-3">
    <div class="icon-box bg-warning bg-opacity-15 text-warning rounded-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
      <i class="bi bi-person-bounding-box fs-4"></i>
    </div>
    <div>
      <h2 class="fw-bold text-dark mb-0">{{ 'Profile Picture Approvals' | t }}</h2>
      <p class="text-muted mb-0 small">{{ 'Review and approve or reject pending profile picture requests' | t }}</p>
    </div>
  </div>

  <!-- Loading -->
  @if (isLoading) {
  <div class="text-center py-5">
    <div class="spinner-border text-warning" role="status"></div>
    <p class="mt-3 text-muted">Loading pending requests...</p>
  </div>
  }

  <!-- Empty State -->
  @else if (pendingPictures.length === 0) {
  <div class="card border-0 shadow-sm rounded-4 text-center py-5">
    <div class="d-flex flex-column align-items-center gap-3">
      <div class="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
        <i class="bi bi-check-circle-fill text-success fs-1"></i>
      </div>
      <h5 class="fw-bold text-dark mb-0">{{ 'All Caught Up!' | t }}</h5>
      <p class="text-muted small mb-0">{{ 'There are no pending profile picture requests at this time.' | t }}</p>
    </div>
  </div>
  }

  <!-- Pending List -->
  @else {
  <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
    <div class="card-header bg-white border-0 p-3 d-flex justify-content-between align-items-center">
      <span class="fw-semibold text-dark">
        <i class="bi bi-clock-history text-warning me-2"></i>
        {{ 'Pending Requests' | t }}
        <span class="badge bg-warning text-dark ms-2 rounded-pill">{{ pendingPictures.length }}</span>
      </span>
    </div>

    <div class="table-responsive">
      <table class="table align-middle mb-0">
        <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
          <tr>
            <th class="py-3 ps-4">{{ 'Employee' | t }}</th>
            <th class="py-3">{{ 'Current Picture' | t }}</th>
            <th class="py-3">{{ 'Requested Picture' | t }}</th>
            <th class="py-3 text-end pe-4">{{ 'Actions' | t }}</th>
          </tr>
        </thead>
        <tbody>
          @for (pic of pendingPictures; track pic.userId) {
          <tr class="border-top">
            <!-- Employee Info -->
            <td class="ps-4 py-3">
              <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                  style="width: 40px; height: 40px; font-size: 14px;">
                  {{ (pic.username || 'E').charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="fw-semibold text-dark">{{ pic.username }}</div>
                  <small class="text-muted">{{ pic.email }}</small>
                </div>
              </div>
            </td>

            <!-- Current Picture -->
            <td class="py-3">
              <div class="d-flex align-items-center gap-2">
                <img *ngIf="pic.currentProfilePictureUrl"
                  [src]="pic.currentProfilePictureUrl"
                  class="rounded-circle object-fit-cover border shadow-sm"
                  style="width: 52px; height: 52px;"
                  alt="Current">
                <div *ngIf="!pic.currentProfilePictureUrl"
                  class="rounded-circle bg-secondary bg-opacity-15 text-secondary d-flex align-items-center justify-content-center"
                  style="width: 52px; height: 52px;">
                  <i class="bi bi-person-fill fs-5"></i>
                </div>
                <span *ngIf="!pic.currentProfilePictureUrl" class="text-muted small fst-italic">No picture</span>
              </div>
            </td>

            <!-- Pending Picture -->
            <td class="py-3">
              <div class="d-flex align-items-center gap-2">
                <img [src]="pic.pendingProfilePictureUrl"
                  class="rounded-circle object-fit-cover border border-2 border-warning shadow"
                  style="width: 60px; height: 60px;"
                  alt="Pending">
                <span class="badge bg-warning text-dark rounded-pill px-2 py-1" style="font-size: 10px;">
                  <i class="bi bi-clock me-1"></i>Pending
                </span>
              </div>
            </td>

            <!-- Actions -->
            <td class="py-3 pe-4 text-end">
              <div class="d-flex gap-2 justify-content-end">
                <button class="btn btn-success btn-sm px-3 shadow-sm" (click)="approve(pic.userId)">
                  <i class="bi bi-check-lg me-1"></i>{{ 'Approve' | t }}
                </button>
                <button class="btn btn-outline-danger btn-sm px-3" (click)="reject(pic.userId)">
                  <i class="bi bi-x-lg me-1"></i>{{ 'Reject' | t }}
                </button>
              </div>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
  }

</div>

<style>
.page-wrapper {
  padding: 1.5rem;
}
</style>

```

### File: src\app\features\pending-approvals\pending-approvals.component.ts
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './pending-approvals.component.html',
})
export class PendingApprovalsComponent implements OnInit {
  private authService = inject(AuthService);

  pendingPictures: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.authService.getPendingProfilePictures().subscribe({
      next: (res) => {
        this.pendingPictures = res || [];
        this.isLoading = false;
      },
      error: () => {
        this.pendingPictures = [];
        this.isLoading = false;
      },
    });
  }

  approve(userId: number) {
    Swal.fire({
      title: 'Approve Picture?',
      text: 'This will replace the employee\'s current profile picture.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Approve',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.approveProfilePicture(userId).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Approved!', text: 'Profile picture has been approved and applied.', timer: 2000, showConfirmButton: false });
            this.load();
          },
          error: () => Swal.fire('Error', 'Failed to approve picture.', 'error'),
        });
      }
    });
  }

  reject(userId: number) {
    Swal.fire({
      title: 'Reject Picture?',
      text: 'The employee will be notified that their picture was rejected.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.rejectProfilePicture(userId).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Rejected', text: 'Profile picture request has been rejected.', timer: 2000, showConfirmButton: false });
            this.load();
          },
          error: () => Swal.fire('Error', 'Failed to reject picture.', 'error'),
        });
      }
    });
  }
}

```

### File: src\app\features\positions\positions.component.html
```html
<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
    <div class="d-flex align-items-center">
        <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
            <i class="bi bi-briefcase-fill fs-4"></i>
        </div>
        <div>
            <h2 class="fw-bold text-dark mb-1">{{ 'Job Positions' | t }}</h2>
            <p class="text-muted mb-0 small">{{ 'Manage company job titles and roles' | t }}</p>
        </div>
    </div>
    <button class="btn btn-primary shadow-sm fw-bold px-3 px-md-4"
        (click)="openModal()">
        <i class="bi bi-plus-lg" [class.me-md-1]="true"></i> <span class="d-none d-md-inline">{{ 'Add Position' | t }}</span>
    </button>
</div>

@if (isLoading) {
<div class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2 text-muted">Synchronizing with server...</p>
</div>
} @else {
<div class="card shadow-sm border-0">
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 text-center text-nowrap">
            <thead class="table-light text-uppercase small fw-bold">
                <tr>
                    <th>ID</th>
                    <th>{{ 'Job Title' | t }}</th>
                    <th>{{ 'Department' | t }}</th>
                    <th>{{ 'Salary Range (Min - Max)' | t }}</th>
                    <th>{{ 'Actions' | t }}</th>
                </tr>
            </thead>
            <tbody>
                @for (pos of positionsList; track pos.id) {
                <tr>
                    <td data-label="ID" class="text-muted fw-bold">#{{ pos.id }}</td>
                    <td data-label="Job Title" class="fw-bold text-dark">{{ pos.title }}</td>
                    <td data-label="Department">
                        <span
                            class="badge bg-light text-secondary border px-3 py-2 fw-semibold shadow-sm" style="font-size: 0.85rem;">
                            {{ getDepartmentName(pos.departmentId) }}
                        </span>
                    </td>
                    <td data-label="Salary Range" class="fw-semibold text-secondary">
                        {{ pos.salaryMin | currency }} -
                        <span class="text-success">{{ pos.salaryMax | currency
                            }}</span>
                    </td>
                    <td data-label="Actions" class="actions-cell">
                        <button
                            class="btn btn-sm btn-outline-primary me-2 border-0 shadow-none"
                            (click)="openModal(pos)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                            class="btn btn-sm btn-outline-danger border-0 shadow-none"
                            (click)="onDelete(pos.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
                } @empty {
                <tr>
                    <td colspan="5" class="text-center py-5 text-muted no-data-td">
                        <i
                            class="bi bi-briefcase fs-1 d-block mb-2 opacity-25"></i>
                        {{ 'No positions defined in the system.' | t }}
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>
</div>
}

<div class="modal fade" id="positionModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
            <div
                class="modal-header border-bottom border-primary border-4 bg-light">
                <h5 class="modal-title text-primary fw-bold">
                    <i class="bi" [class.bi-plus-circle]="!isEditMode"
                        [class.bi-pencil-square]="isEditMode"></i>
                    {{ isEditMode ? ('Modify Position' | t) : ('Create New Position' | t) }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <form #positionForm="ngForm">
                    <div class="row g-3">
                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Job
                                Title</label>
                            <input type="text" class="form-control" name="title"
                                [(ngModel)]="positionData.title" required
                                placeholder="e.g. Software Engineer">
                        </div>

                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Department
                                Assignment</label>
                            <select class="form-select" name="deptId"
                                [(ngModel)]="positionData.departmentId"
                                required>
                                <option [ngValue]="null" disabled
                                    selected>Select target department</option>
                                @for (dept of departmentsList; track dept.id) {
                                <option [ngValue]="dept.id">{{ dept.name
                                    }}</option>
                                }
                            </select>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Minimum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMin" [(ngModel)]="positionData.salaryMin"
                                min="0" required>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Maximum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMax" [(ngModel)]="positionData.salaryMax"
                                min="0" required>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer bg-light border-top-0">
                <button type="button" class="btn btn-secondary px-4 fw-bold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                    class="btn btn-primary px-4 fw-bold shadow-sm"
                    (click)="savePosition()"
                    [disabled]="positionForm.invalid || isProcessing">
                    @if(isProcessing) { <span
                        class="spinner-border spinner-border-sm me-2"></span> }
                    Confirm Action
                </button>
<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
    <div class="d-flex align-items-center">
        <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
            <i class="bi bi-briefcase-fill fs-4"></i>
        </div>
        <div>
            <h2 class="fw-bold text-dark mb-1">{{ 'Job Positions' | t }}</h2>
            <p class="text-muted mb-0 small">{{ 'Manage company job titles and roles' | t }}</p>
        </div>
    </div>
    <button class="btn btn-primary shadow-sm fw-bold px-3 px-md-4"
        (click)="openModal()">
        <i class="bi bi-plus-lg" [class.me-md-1]="true"></i> <span class="d-none d-md-inline">{{ 'Add Position' | t }}</span>
    </button>
</div>

@if (isLoading) {
<div class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2 text-muted">Synchronizing with server...</p>
</div>
} @else {
<div class="card shadow-sm border-0">
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 text-center text-nowrap">
            <thead class="table-light text-uppercase small fw-bold">
                <tr>
                    <th>ID</th>
                    <th>{{ 'Job Title' | t }}</th>
                    <th>{{ 'Department' | t }}</th>
                    <th>{{ 'Salary Range (Min - Max)' | t }}</th>
                    <th>{{ 'Actions' | t }}</th>
                </tr>
            </thead>
            <tbody>
                @for (pos of positionsList; track pos.id) {
                <tr>
                    <td data-label="ID" class="text-muted fw-bold">#{{ pos.id }}</td>
                    <td data-label="Job Title" class="fw-bold text-dark">{{ pos.title }}</td>
                    <td data-label="Department">
                        <span
                            class="badge bg-light text-secondary border px-3 py-2 fw-semibold shadow-sm" style="font-size: 0.85rem;">
                            {{ getDepartmentName(pos.departmentId) }}
                        </span>
                    </td>
                    <td data-label="Salary Range" class="fw-semibold text-secondary">
                        {{ pos.salaryMin | currency }} -
                        <span class="text-success">{{ pos.salaryMax | currency
                            }}</span>
                    </td>
                    <td data-label="Actions" class="actions-cell">
                        <button
                            class="btn btn-sm btn-outline-primary me-2 border-0 shadow-none"
                            (click)="openModal(pos)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                            class="btn btn-sm btn-outline-danger border-0 shadow-none"
                            (click)="onDelete(pos.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
                } @empty {
                <tr>
                    <td colspan="5" class="text-center py-5 text-muted no-data-td">
                        <i
                            class="bi bi-briefcase fs-1 d-block mb-2 opacity-25"></i>
                        {{ 'No positions defined in the system.' | t }}
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>
</div>
}

<div class="modal fade" id="positionModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
            <div
                class="modal-header border-bottom border-primary border-4 bg-light">
                <h5 class="modal-title text-primary fw-bold">
                    <i class="bi" [class.bi-plus-circle]="!isEditMode"
                        [class.bi-pencil-square]="isEditMode"></i>
                    {{ isEditMode ? ('Modify Position' | t) : ('Create New Position' | t) }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <form #positionForm="ngForm">
                    <div class="row g-3">
                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Job
                                Title</label>
                            <input type="text" class="form-control" name="title"
                                [(ngModel)]="positionData.title" required
                                placeholder="e.g. Software Engineer">
                        </div>

                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Department
                                Assignment</label>
                            <select class="form-select" name="deptId"
                                [(ngModel)]="positionData.departmentId"
                                required>
                                <option [ngValue]="null" disabled
                                    selected>Select target department</option>
                                @for (dept of departmentsList; track dept.id) {
                                <option [ngValue]="dept.id">{{ dept.name
                                    }}</option>
                                }
                            </select>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Minimum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMin" [(ngModel)]="positionData.salaryMin"
                                min="0" required>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Maximum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMax" [(ngModel)]="positionData.salaryMax"
                                min="0" required>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer bg-light border-top-0">
                <button type="button" class="btn btn-secondary px-4 fw-bold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                    class="btn btn-primary px-4 fw-bold shadow-sm"
                    (click)="savePosition()"
                    [disabled]="positionForm.invalid || isProcessing">
                    @if(isProcessing) { <span
                        class="spinner-border spinner-border-sm me-2"></span> }
                    Confirm Action
                </button>
            </div>
        </div>
    </div>
</div>

<style>

</style>

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

### File: src\app\features\salary\salary.component.html
```html
<div class="page-container p-4">


    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div class="d-flex align-items-center">
            <div class="icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                <i class="bi bi-cash-stack fs-4"></i>
            </div>
            <div>
                <h2 class="fw-bold text-dark mb-1">{{ 'Salaries' | t }}</h2>
                <p class="text-muted small mb-0">{{ 'View and manage employee payroll records' | t }}</p>
            </div>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end flex-wrap">
            <div class="input-group shadow-sm" style="max-width: 350px; min-width: 200px; flex: 1;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0"
                    placeholder="{{ 'Search by name, ID, or amount...' | t }}" [(ngModel)]="salarySearchQuery"
                    (input)="filterSalaries()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false" title="Filter Salaries">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">{{ 'Filter Options' | t }}</h6>

                    <div class="mb-3">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Year' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedYear"
                            (change)="filterSalaries()">
                            <option value="">{{ 'All Years' | t }}</option>
                            <option *ngFor="let yr of uniqueYears" [value]="yr">{{ yr }}</option>
                        </select>
                    </div>

                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Month' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedMonth"
                            (change)="filterSalaries()">
                            <option value="">{{ 'All Months' | t }}</option>
                            <option value="1">{{ 'January' | t }}</option>
                            <option value="2">{{ 'February' | t }}</option>
                            <option value="3">{{ 'March' | t }}</option>
                            <option value="4">{{ 'April' | t }}</option>
                            <option value="5">{{ 'May' | t }}</option>
                            <option value="6">{{ 'June' | t }}</option>
                            <option value="7">{{ 'July' | t }}</option>
                            <option value="8">{{ 'August' | t }}</option>
                            <option value="9">{{ 'September' | t }}</option>
                            <option value="10">{{ 'October' | t }}</option>
                            <option value="11">{{ 'November' | t }}</option>
                            <option value="12">{{ 'December' | t }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <button *ngIf="isAdminOrHR && !isAdmin" class="btn btn-outline-primary px-3 px-md-4 py-2 rounded-3 shadow-sm text-nowrap"
                (click)="toggleViewAll()" [title]="isViewingAll ? ('My Salaries' | t) : ('View All' | t)">
                <i class="bi" [ngClass]="isViewingAll ? 'bi-person' : 'bi-people'" [class.me-md-1]="true"></i> 
                <span class="d-none d-md-inline">{{ isViewingAll ? ('My Salaries' | t) : ('View All' | t) }}</span>
            </button>

            <button *ngIf="isAdmin" class="btn btn-primary px-3 px-md-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                (click)="openModal()" [title]="'Add Salary' | t">
                <i class="bi bi-plus-lg" [class.me-md-1]="true"></i> 
                <span class="d-none d-md-inline">{{ 'Add Salary' | t }}</span>
            </button>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 text-nowrap">

                <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <tr>
                        <th *ngIf="isAdminOrHR && isViewingAll" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Month' | t }}/{{ 'Year' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold">{{ 'Base Salary' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-success">{{ 'Allowances' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-danger">{{ 'Deductions' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-primary">{{ 'Net Pay' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-end text-nowrap">{{ 'Actions' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td colspan="7" class="text-center py-5 text-muted no-data-td">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && salariesList.length === 0">
                        <td [colSpan]="(isAdminOrHR && isViewingAll) ? 7 : 6" class="text-center py-5 no-data-td">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center"
                                    style="width: 80px; height: 80px;">
                                    <i class="bi bi-wallet2 text-secondary fs-1"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">{{ 'No Data' | t }}</h5>
                                <p class="text-muted small mb-0">{{ 'No Data' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let salary of paginatedSalaries">
                        <!-- اسم الموظف للأدمن والـ hr -->
                        <td *ngIf="isAdminOrHR && isViewingAll" data-label="Employee" class="py-3 px-4 fw-bold text-dark">
                            {{ salary.employeeName || '#' + salary.employeeId }}
                        </td>
                        <td data-label="Period" class="py-3 px-4">
                            <span class="badge bg-light text-dark border">{{
                                salary.month | number:'2.0' }} / {{ salary.year
                                }}</span>
                            <div class="text-muted mt-1" style="font-size: 0.7rem;">Eff: {{
                                salary.effectiveDate | date:'dd MMM yyyy'
                                }}</div>
                        </td>
                        <td data-label="Base Salary" class="py-3 px-3 text-secondary">${{ salary.baseAmount }}</td>
                        <td data-label="Allowances" class="py-3 px-3 text-success fw-medium">+${{ salary.allowances }}
                        </td>
                        <td data-label="Deductions" class="py-3 px-3 text-danger fw-medium">-${{ salary.deductions }}
                        </td>
                        <td data-label="Net Pay" class="py-3 px-3">
                            <span class="fw-bold text-primary fs-6">${{ salary.netAmount }}</span>
                            <div class="text-muted" style="font-size: 0.7rem;">Before Deductions: ${{ salary.grossAmount
                                }}</div>
                        </td>
                        <!-- صلاحيات أدمن بس -->
                        <td data-label="Actions" class="py-3 px-4 text-end text-nowrap actions-cell">
                            <button class="btn btn-sm btn-outline-danger rounded-circle shadow-sm me-2"
                                (click)="downloadPayslip(salary)" title="Download Payslip (PDF)">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </button>
                            <button *ngIf="isAdmin" class="btn btn-sm btn-light text-primary rounded-circle shadow-sm"
                                (click)="openModal(salary)" title="Edit Record">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="salariesList.length > 0"
            class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage,
                salariesList.length) }} of {{ salariesList.length }} entries
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="modal fade" id="salaryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
            <div class="modal-header border-bottom-0 pt-4 pb-0 px-4">
                <h5 class="modal-title fw-bold text-dark">
                    <i class="bi"
                        [ngClass]="isEditMode ? 'bi-pencil-square text-primary' : 'bi-plus-circle text-primary'"></i>
                    {{ isEditMode ? ' Edit Salary Record' : ' Add New Salary' }}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <form #salaryForm="ngForm">

                    <div class="mb-4 position-relative">
                        <label class="form-label fw-semibold text-secondary small">Employee <span
                                class="text-danger">*</span></label>
                        <div class="input-group">
                            <span class="input-group-text bg-light border-end-0"><i class="bi bi-person"></i></span>
                            <input type="text" class="form-control bg-light border-start-0" name="employeeSearchText"
                                [(ngModel)]="employeeSearchText" (ngModelChange)="onEmployeeSearchChange($event)"
                                (focus)="showEmployeeDropdown = true" (blur)="hideDropdownWithDelay()"
                                autocomplete="off" required placeholder="Search by name or ID...">
                        </div>

                        <!-- Custom Dropdown -->
                        <div class="dropdown-menu w-100 shadow-lg border-0 rounded-4 mt-2 py-2"
                            [class.show]="showEmployeeDropdown"
                            style="position: absolute; top: 100%; left: 0; max-height: 250px; overflow-y: auto; z-index: 1050;">

                            <ng-container *ngIf="filteredEmployeesList.length > 0; else noEmployees">
                                <button type="button"
                                    class="dropdown-item d-flex justify-content-between align-items-center py-2 px-3 border-bottom border-light"
                                    *ngFor="let emp of filteredEmployeesList" (mousedown)="selectEmployee(emp)"
                                    style="transition: background-color 0.2s;">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                            style="width: 36px; height: 36px; font-size: 13px;">
                                            {{ emp.firstName[0] }}{{ emp.lastName[0] }}
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="fw-semibold text-dark" style="font-size: 14px;">{{
                                                emp.firstName }} {{ emp.lastName }}</span>
                                        </div>
                                    </div>
                                    <span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-2"
                                        style="font-size: 11px;">ID: {{ emp.id }}</span>
                                </button>
                            </ng-container>

                            <ng-template #noEmployees>
                                <div class="text-center py-4 text-muted">
                                    <i class="bi bi-search mb-2 fs-4 text-black-50"></i>
                                    <p class="mb-0 small fw-semibold">No employees found.</p>
                                </div>
                            </ng-template>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label class="form-label fw-semibold text-secondary small">Month
                                <span class="text-danger">*</span></label>
                            <input type="number" class="form-control bg-light border-0" name="month"
                                [(ngModel)]="salaryData.month" required min="1" max="12">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-semibold text-secondary small">Year
                                <span class="text-danger">*</span></label>
                            <input type="number" class="form-control bg-light border-0" name="year"
                                [(ngModel)]="salaryData.year" required min="2000">
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-semibold text-secondary small">Base
                            Salary ($) <span class="text-danger">*</span></label>
                        <input type="number" class="form-control form-control-lg bg-light border-0" name="baseAmount"
                            [(ngModel)]="salaryData.baseAmount" required min="0">
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label class="form-label fw-semibold text-success small">Allowances
                                (+) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control border-success border-opacity-25 bg-light"
                                name="allowances" [(ngModel)]="salaryData.allowances" required min="0">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-semibold text-danger small">Deductions
                                (-) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control border-danger border-opacity-25 bg-light"
                                name="deductions" [(ngModel)]="salaryData.deductions" required min="0">
                        </div>
                    </div>

                    <div class="mb-2">
                        <label class="form-label fw-semibold text-secondary small">Effective
                            Date <span class="text-danger">*</span></label>
                        <input type="date" class="form-control bg-light border-0" name="effectiveDate"
                            [(ngModel)]="salaryData.effectiveDate" required>
                    </div>

                </form>
            </div>
            <div class="modal-footer border-top-0 pb-4 px-4">
                <button type="button" class="btn btn-light px-4 rounded-3 fw-semibold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary px-4 rounded-3 fw-semibold" (click)="saveSalary()"
                    [disabled]="salaryForm.invalid || isProcessing || !salaryData.employeeId">
                    <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                    {{ isProcessing ? 'Saving...' : 'Save Record' }}
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .cursor-pointer {
        cursor: pointer;
    }

</style>


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

### File: src\app\shared\header\header.component.html
```html
<nav class="navbar navbar-expand bg-white border-bottom shadow-sm px-4 py-2 header-bar">
    <div class="container-fluid px-2">
        <div class="d-flex align-items-center gap-3 ms-2">
            <button
                class="btn btn-light border-0 shadow-none d-flex align-items-center justify-content-center p-2"
                (click)="toggleSidebar()">
                <i class="bi bi-list fs-4 text-primary"></i>
            </button>
        </div>

        <ul class="navbar-nav ms-auto align-items-center flex-row gap-1">

            <!-- ✅ Install App Button (conditionally visible) -->
            @if (pwaService.canInstall) {
            <li class="nav-item me-3">
                <button
                    class="btn btn-primary btn-sm border-0 shadow-sm d-flex align-items-center gap-2 px-3 py-1"
                    (click)="installApp()"
                    title="Install App">
                    <i class="bi bi-download fs-6"></i>
                    <span class="fw-semibold d-none d-md-inline">{{ 'Install App' | t }}</span>
                </button>
            </li>
            }

            <!-- ✅ Settings Dropdown -->
            <li class="nav-item me-3 dropdown">
                <button
                    class="btn btn-light btn-sm border-0 shadow-none settings-btn"
                    id="settingsDropdown" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-gear-fill fs-5" style="color: #8b5cf6;"></i>
                </button>

                <div class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 p-0 settings-panel overflow-hidden"
                    aria-labelledby="settingsDropdown"
                    style="width: 280px;">

                    <!-- Header -->
                    <div class="p-3 border-bottom" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-gear-wide-connected text-white fs-5"></i>
                            <span class="fw-bold text-white">{{ 'Settings' | t }}</span>
                        </div>
                    </div>

                    <!-- Theme Toggle -->
                    <div class="px-3 py-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="settings-icon-circle" [class.active]="settingsService.isDarkMode">
                                    <i class="bi" [ngClass]="settingsService.isDarkMode ? 'bi-moon-stars-fill' : 'bi-sun-fill'"></i>
                                </div>
                                <div>
                                    <p class="mb-0 fw-semibold small text-dark">{{ 'Theme' | t }}</p>
                                    <p class="mb-0 text-muted" style="font-size: 0.7rem;">
                                        {{ settingsService.isDarkMode ? ('Dark Mode' | t) : ('Light Mode' | t) }}
                                    </p>
                                </div>
                            </div>
                            <div class="form-check form-switch mb-0">
                                <input class="form-check-input cursor-pointer" type="checkbox" role="switch"
                                    id="themeToggle"
                                    [checked]="settingsService.isDarkMode"
                                    (change)="settingsService.toggleTheme()"
                                    style="width: 2.5em; height: 1.25em;">
                            </div>
                        </div>
                    </div>

                    <!-- Language Toggle -->
                    <div class="px-3 py-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="settings-icon-circle lang">
                                    <i class="bi bi-translate"></i>
                                </div>
                                <div>
                                    <p class="mb-0 fw-semibold small text-dark">{{ 'Language' | t }}</p>
                                    <p class="mb-0 text-muted" style="font-size: 0.7rem;">
                                        {{ settingsService.language === 'ar' ? 'العربية' : 'English' }}
                                    </p>
                                </div>
                            </div>
                            <button class="btn btn-sm px-3 py-1 rounded-pill fw-semibold lang-toggle-btn"
                                (click)="settingsService.toggleLanguage(); $event.stopPropagation()">
                                {{ settingsService.language === 'ar' ? 'EN' : 'AR' }}
                            </button>
                        </div>
                    </div>
                </div>
            </li>

            <!-- Notifications Dropdown -->
            <li class="nav-item dropdown" style="margin-inline-end: 0.5rem;">
                <button
                    class="btn btn-light btn-sm border-0 position-relative shadow-none"
                    id="notificationDropdown" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-bell-fill fs-5" style="color: #f59e0b;"></i>

                    @if (unreadCount > 0) {
                    <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ unreadCount }}
                    </span>
                    }
                </button>

                <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0 notification-dropdown"
                    aria-labelledby="notificationDropdown"
                    style="max-height: 400px; overflow-y: auto;">

                    <li
                        class="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                        <div>
                            <span class="fw-bold text-dark">{{ 'Notifications' | t }}</span>
                            @if (unreadCount > 0) {
                            <span class="badge bg-primary rounded-pill ms-2">{{ unreadCount }} {{ 'New' | t }}</span>
                            }
                        </div>
                        <div class="d-flex gap-1">
                            <button class="btn btn-link action-icon-btn text-decoration-none p-0 text-primary" 
                                    (click)="markAllAsRead($event)" 
                                    [disabled]="unreadCount === 0"
                                    [class.text-muted]="unreadCount === 0"
                                    title="Mark all as read">
                                <i class="bi bi-check2-all fs-6"></i>
                            </button>
                            <button class="btn btn-link action-icon-btn text-decoration-none p-0 text-danger" 
                                    (click)="deleteAllNotifications($event)" 
                                    [disabled]="notifications.length === 0"
                                    [class.text-muted]="notifications.length === 0"
                                    title="Delete all notifications">
                                <i class="bi bi-trash fs-6"></i>
                            </button>
                        </div>
                    </li>

                    @for (note of notifications; track note.id) {
                    <li>
                        <a class="dropdown-item py-3 border-bottom"
                            href="javascript:void(0)"
                            [class.bg-light]="!note.isRead"
                            (click)="markAsRead(note)">

                            <div
                                class="d-flex w-100 justify-content-between align-items-start mb-1">
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.875rem; white-space: normal; word-break: break-word;">
                                        {{ note.title || ('System Alert' | t) }}
                                    </h6>
                                    <small class="text-muted"
                                        style="font-size: 0.75rem;">{{
                                        note.createdAt | date:'shortTime' }}</small>
                                </div>
                                <button class="btn btn-link action-icon-btn text-danger p-0 ms-2" (click)="deleteNotification($event, note.id)" title="Delete">
                                    <i class="bi bi-x-circle fs-6"></i>
                                </button>
                            </div>

                            <p class="mb-0 text-secondary text-wrap pe-4"
                                style="font-size: 0.85rem;">
                                {{ note.message }}
                            </p>
                        </a>
                    </li>
                    } @empty {
                    <li class="p-4 text-center text-muted">
                        <i
                            class="bi bi-bell-slash fs-3 d-block mb-2 text-light-gray"></i>
                        {{ 'No new notifications' | t }}
                    </li>
                    }
                </ul>
            </li>

            <li class="nav-item">
                <div class="d-flex align-items-center">

                </div>
            </li>

        </ul>
    </div>
</nav>
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
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

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
  authService = inject(AuthService);

  notifications: any[] = [];
  unreadCount: number = 0;
  profilePicUrl: string | null = null;
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

    this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    if (typeof window !== 'undefined') {
      window.addEventListener('profile_pic_updated', () => {
        this.profilePicUrl = this.authService.getCurrentUserProfilePic();
      });
    }
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
    Swal.fire({
      title: 'Delete Notification?',
      text: 'Are you sure you want to delete this notification?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.notificationService.deleteNotification(id).subscribe({
          next: () => {
            this.notifications = this.notifications.filter(n => n.id !== id);
            this.unreadCount = this.notifications.filter((n) => !n.isRead).length;
          },
          error: (err) => console.error('Error deleting notification:', err)
        });
      }
    });
  }

  deleteAllNotifications(event: Event) {
    event.stopPropagation();
    if (this.notifications.length === 0) return;

    Swal.fire({
      title: 'Clear All Notifications?',
      text: 'Are you sure you want to delete all notifications?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete all',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.notificationService.deleteAllNotifications().subscribe({
          next: () => {
            this.notifications = [];
            this.unreadCount = 0;
          },
          error: (err) => console.error('Error deleting all notifications:', err)
        });
      }
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
    } else if (
      type.includes('ProfilePicture') ||
      type.includes('profile_picture') ||
      msg.includes('profile picture') ||
      msg.includes('profile photo') ||
      msg.includes('صورة') ||
      msg.includes('picture')
    ) {
      this.router.navigate(['/pending-approvals']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}


```

### File: src\app\shared\sidebar\sidebar.component.html
```html
<div class="sidebar" #sidebar>

    <!-- ── Brand ── -->
    <div class="sidebar-brand" style="cursor: pointer;" routerLink="/dashboard"
        (click)="closeMobileSidebar()">
        <div class="sidebar-logo-wrap"
            style="width: 58px; height: 58px; border-radius: 14px;
                    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
                    flex-shrink: 0; background: transparent; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 2px;">
            <img src="kawadir-logo.png" alt="Kawadir" class="brand-logo"
                style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <div
            class="sidebar-brand-text d-flex flex-column justify-content-center mt-1">
            <span class="sidebar-brand-name"
                style="line-height: 1; font-size: 1.55rem;">Kawadir</span>
            <span class="sidebar-brand-sub"
                style="margin-top: 3px; font-size: 0.6rem;">HR Management</span>
        </div>
    </div>

    <!-- ── Navigation ── -->
    <nav class="sidebar-nav">
        <ul>
            <li><a routerLink="/dashboard" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-house icon-blue"></i> {{ 'Dashboard' | t
                    }}</a></li>
            <li><a routerLink="/my-profile" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-person icon-blue-dark"></i> {{ 'My Profile'
                    | t
                    }}</a></li>
            @if (isAdminOrHR) {
            <li><a routerLink="/employees" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-people icon-pink"></i> {{ 'Employees' | t
                    }}</a></li>
            <li><a routerLink="/pending-approvals" routerLinkActive="active"
                    (click)="closeMobileSidebar()" class="position-relative">
                    <i class="bi bi-person-bounding-box icon-yellow"></i> {{ 'Pending Approvals' | t }}
                </a></li>
            }
            <li><a routerLink="/payroll-adjustments" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-wallet2 icon-brown"></i> {{
                    'Bonus & Penalty' | t }}</a></li>
            <li><a routerLink="/leave" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-calendar2-check icon-yellow"></i> {{
                    'Leave Requests' |
                    t }}</a></li>
            <li><a routerLink="/attendance" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-clock-history icon-orange"></i> {{
                    'Attendance' | t
                    }}</a></li>
            <li><a routerLink="/salary" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-cash-stack icon-green"></i> {{ 'Salaries' |
                    t
                    }}</a></li>
            <li><a routerLink="/meetings" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-calendar-event icon-gray"></i> {{
                    'Meetings' | t
                    }}</a></li>
            <li><a routerLink="/ai-assistant" routerLinkActive="active"
                    (click)="closeMobileSidebar()" class="ai-nav-link"><i
                        class="bi bi-stars"></i> {{ 'AI Assistant' | t
                    }}</a></li>

            @if (isAdmin) {
            <li class="section-title">{{ 'System Control' | t }}</li>
            <li><a routerLink="/departments" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-diagram-3 icon-indigo"></i> {{
                    'Departments' | t
                    }}</a></li>
            <li><a routerLink="/positions" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-briefcase icon-teal"></i> {{ 'Positions' |
                    t
                    }}</a></li>
            <li><a routerLink="/register" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-person-plus icon-cyan"></i> {{
                    'Register User' | t }}
                </a></li>
            }
        </ul>
    </nav>

    <!-- ── Footer (Profile + Logout) ── -->
    <div class="sidebar-footer">
        <div class="user-profile" routerLink="/my-profile"
            (click)="closeMobileSidebar()">
            <div class="avatar-initials" [class.p-0]="profilePicUrl" style="overflow: hidden;">
                <img *ngIf="profilePicUrl" [src]="profilePicUrl" alt="User" class="w-100 h-100 object-fit-cover">
                <span *ngIf="!profilePicUrl">{{ initials }}</span>
            </div>
            <div class="user-info">
                <p class="name">{{ userName }}</p>
                <p class="status">{{ userRole }}</p>
            </div>
        </div>
        <button class="btn-logout" (click)="onLogout()">
            <i class="bi bi-box-arrow-right"></i> <span>{{ 'Logout' | t
                }}</span>
        </button>
    </div>

    <!-- Resizer Handle -->
    <div class="sidebar-resizer" [class.active]="isResizing"
        (mousedown)="startResize($event)"></div>
</div>
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
  profilePicUrl: string | null = null;

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

    this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    if (typeof window !== 'undefined') {
      window.addEventListener('profile_pic_updated', () => {
        this.profilePicUrl = this.authService.getCurrentUserProfilePic();
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

### File: src\index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Kawadir</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no, maximum-scale=1">
    <link rel="icon" type="image/png" sizes="512x512" href="/kawadir-logo.png?v=3">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="192x192" href="/kawadir-logo.png?v=3">
    <link rel="manifest" href="manifest.webmanifest">
    <meta name="theme-color" content="#0d6efd">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Kawadir">
</head>
  <body class="mat-typography">
    <app-root></app-root>
    <noscript>Please enable JavaScript to continue using this application.</noscript>
</body>
</html>

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
