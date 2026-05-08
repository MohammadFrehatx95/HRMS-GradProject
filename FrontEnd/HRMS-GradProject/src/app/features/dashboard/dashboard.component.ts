import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { LeaveService } from '../../core/services/leave.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service'; // تم إضافة الاستيراد هنا
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // 1. حقن الخدمات
  private empService = inject(EmployeeService);
  private leaveService = inject(LeaveService);
  private deptService = inject(DepartmentService);
  private authService = inject(AuthService);
  private attendanceService = inject(AttendanceService);

  // 2. تعريف المتغيرات
  totalEmployees = 0;
  pendingLeaves = 0;
  departmentsCount = 0;
  totalSalaries = 0;
  recentLeaves: any[] = [];
  isAdmin: boolean = false;

  // Employee stats
  employeeAnnualLeaveBalance: number | string = 14;
  employeePendingLeaves: number = 0;
  employeeHoursWorked: number = 0;
  employeeNextPayday: string = '';

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();

    if (this.isAdmin) {
      this.loadAdminStats();
    } else {
      this.loadEmployeeStats();
    }
  }

  loadAdminStats() {
    this.empService.getEmployees().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.totalEmployees = extracted.length;
      },
      error: (err) => console.error('Error fetching employees:', err),
    });

    this.leaveService.getAllLeaves().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.pendingLeaves = extracted.filter(
          (l: any) => l.status === 0 || l.status === '0',
        ).length;
        this.recentLeaves = extracted.slice(0, 5);
      },
      error: (err) => console.error('Error fetching leaves:', err),
    });

    this.deptService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.departmentsCount = extracted.length;
      },
      error: (err) => console.error('Error fetching departments:', err),
    });
  }

  loadEmployeeStats() {
    console.log('Loading Employee Dashboard...');

    // Set Next Payday
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1).toLocaleString('default', { month: 'short' });
    if (today.getDate() > 25) {
      this.employeeNextPayday = `${nextMonth} 25`;
    } else {
      this.employeeNextPayday = `${currentMonth} 25`;
    }

    // Load My Leaves
    this.leaveService.getMyLeaves().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items)) extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.employeePendingLeaves = extracted.filter(
          (l: any) => l.status === 0 || l.status === '0'
        ).length;

        // Calculate approved annual leaves to deduct from balance
        const approvedAnnualLeavesDays = extracted
          .filter((l: any) => (l.status === 1 || l.status === '1') && (l.leaveType === 0 || l.leaveType === '0'))
          .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);
        this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
      },
      error: (err) => console.error('Error fetching my leaves:', err),
    });

    // Load My Attendance
    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items)) extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        // Calculate hours worked this month
        const currentMonthNum = today.getMonth();
        const currentYear = today.getFullYear();

        let totalHours = 0;
        extracted.forEach((att: any) => {
          if (att.clockIn && att.clockOut) {
            const clockInDate = new Date(att.clockIn);
            if (clockInDate.getMonth() === currentMonthNum && clockInDate.getFullYear() === currentYear) {
              const clockOutDate = new Date(att.clockOut);
              const diffMs = clockOutDate.getTime() - clockInDate.getTime();
              const diffHrs = diffMs / (1000 * 60 * 60);
              if (diffHrs > 0) totalHours += diffHrs;
            }
          }
        });

        this.employeeHoursWorked = Math.round(totalHours);
      },
      error: (err) => console.error('Error fetching my attendance:', err),
    });
  }
}
