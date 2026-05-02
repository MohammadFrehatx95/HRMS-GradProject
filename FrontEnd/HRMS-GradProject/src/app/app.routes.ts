import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { LeaveComponent } from './features/leave/leave.component';
import { AttendanceComponent } from './features/attendance/attendance.component';
import { SalaryComponent } from './features/salary/salary.component';

export const routes: Routes = [
  // 1. التوجيه التلقائي للمسار الجذري
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // 2. مسارات النظام الأساسية
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'salary', component: SalaryComponent },

  // 3. شبكة الأمان للمسارات الخاطئة (يجب أن تكون في النهاية)
  { path: '**', redirectTo: 'dashboard' }, // ** يلتقط أي مسار غير معروف ويعيد توجيه المستخدم إلى لوحة التحكم
];
