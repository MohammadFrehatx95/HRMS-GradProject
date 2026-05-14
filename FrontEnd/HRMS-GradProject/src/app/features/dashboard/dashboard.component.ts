import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { LeaveService } from '../../core/services/leave.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { SalaryService } from '../../core/services/salary.service';
import { Chart, registerables } from 'chart.js';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
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

  totalEmployees = 0;
  pendingLeaves = 0;
  departmentsCount = 0;
  totalSalaries = 0;
  recentLeaves: any[] = [];
  recentAttendances: any[] = [];
  myRecentAttendances: any[] = [];
  allAttendances: any[] = [];
  isAdmin: boolean = false;

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

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();

    if (this.isAdmin) {
      this.loadAdminStats();
    } else {
      this.loadEmployeeStats();
    }
  }

  loadAdminStats() {
    // تحميل بيانات الأدمن
    this.empService.getEmployees().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.totalEmployees = extracted.length;
        this.calculateAttendanceRate();
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
          // الـ backend بيرجع string مش رقم
          (l: any) => l.status === 'Pending',
        ).length;

        extracted.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
        this.recentLeaves = extracted.slice(0, 5);

        const totalLeaves = extracted.length;
        let annual = 0,
          sick = 0,
          emergency = 0,
          unpaid = 0;

        if (totalLeaves > 0) {
          // كلها strings من الـ backend
          annual = extracted.filter(
            (l: any) => l.leaveType === 'Annual',
          ).length;
          sick = extracted.filter((l: any) => l.leaveType === 'Sick').length;
          emergency = extracted.filter(
            (l: any) => l.leaveType === 'Emergency',
          ).length;
          unpaid = extracted.filter(
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

    this.salaryService.getAllSalaries().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.totalSalaries = extracted.reduce(
          (sum, current) => sum + (current.netAmount || 0),
          0,
        );
      },
      error: (err) => console.error('Error fetching salaries:', err),
    });

    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        extracted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.recentAttendances = extracted.slice(0, 5);
        this.allAttendances = extracted;
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
      error: () => {},
    });
  }

  loadEmployeeStats() {
    // تحميل بيانات الموظف
    console.log('Loading Employee Dashboard...');

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
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        // backend يرجع strings مش أرقام
        this.employeePendingLeaves = extracted.filter(
          (l: any) => l.status === 'Pending',
        ).length;

        const approvedAnnualLeavesDays = extracted
          .filter(
            (l: any) => l.status === 'Approved' && l.leaveType === 'Annual',
          )
          .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);

        this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
      },
      error: (err) => console.error('Error fetching my leaves:', err),
    });

    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        const currentMonthNum = today.getMonth();
        const currentYear = today.getFullYear();

        let totalHours = 0;
        extracted.forEach((att: any) => {
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

        extracted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.myRecentAttendances = extracted.slice(0, 5);

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
              backgroundColor: ['#e9ecef'],
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
}
