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
  { path: '**', redirectTo: 'login' },
];
