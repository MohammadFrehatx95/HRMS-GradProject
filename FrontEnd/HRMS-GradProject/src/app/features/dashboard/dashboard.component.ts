import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { LeaveService } from '../../core/services/leave.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { SalaryService } from '../../core/services/salary.service';
import { Chart, registerables } from 'chart.js';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { AiWidgetComponent } from '../../shared/ai-widget/ai-widget.component';
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, AiWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
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

  // يوم 25 هو موعد الراتب الثابت
  readonly PAYDAY = 25;

  leaveChartInstance: any;
  attendanceChartInstance: any;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin() || this.authService.isAdminOrHR();
    if (this.isAdmin) {
      this.loadAdminStats();
    } else {
      this.loadEmployeeStats();
    }
  }

  ngAfterViewInit() {}

  loadAdminStats() {
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
          // backend يرجع string مش enum
          (l: any) => l.status === 'Pending',
        ).length;

        extracted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        this.recentLeaves = extracted.slice(0, 5);

        const totalLeaves = extracted.length;
        let annual = 0, sick = 0, emergency = 0, unpaid = 0;

        if (totalLeaves > 0) {
          // القيم string مش أرقام — جاية من backend كذا
          annual = extracted.filter((l: any) => l.leaveType === 'Annual').length;
          sick = extracted.filter((l: any) => l.leaveType === 'Sick').length;
          emergency = extracted.filter((l: any) => l.leaveType === 'Emergency').length;
          unpaid = extracted.filter((l: any) => l.leaveType === 'Unpaid').length;

          this.annualLeavePercent = Math.round((annual / totalLeaves) * 100);
          this.sickLeavePercent = Math.round((sick / totalLeaves) * 100);
          this.emergencyLeavePercent = Math.round((emergency / totalLeaves) * 100);
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
        
        this.totalSalaries = extracted.reduce((sum, current) => sum + (current.netAmount || 0), 0);
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
    if (this.totalEmployees === 0 || this.allAttendances.length === 0) return;
    const validAtt = this.allAttendances.filter(a => a.date && a.clockIn);
    const uniqueDays = new Set(validAtt.map(a => a.date.split('T')[0])).size;
    if (uniqueDays > 0) {
      const totalExpected = uniqueDays * this.totalEmployees;
      this.attendanceRate = Math.round((validAtt.length / totalExpected) * 100);
      if (this.attendanceRate > 100) this.attendanceRate = 100;
    }
    
    setTimeout(() => {
      this.renderAttendanceChart();
    }, 100);
  }

  loadNextPayday() {
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
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ];
          this.employeeNextPayday = `${monthNames[nextPayMonth - 1]} ${this.PAYDAY}`;
        }
      },
      error: () => { },
    });
  }

  loadEmployeeStats() {
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

    // نجيب التاريخ الحقيقي من آخر راتب
    this.loadNextPayday();

    this.leaveService.getMyLeaves().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        // status يجي string من الـ API مش رقم
        this.employeePendingLeaves = extracted.filter(
          (l: any) => l.status === 'Pending',
        ).length;

        const approvedAnnualLeavesDays = extracted
          .filter(
            (l: any) =>
              l.status === 'Approved' &&
              l.leaveType === 'Annual',
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

  renderLeaveChart(annual: number, sick: number, emergency: number, unpaid: number) {
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
          datasets: [{
            data: [1],
            backgroundColor: ['#e9ecef'],
            borderWidth: 0,
            hoverOffset: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          cutout: '75%'
        }
      });
      return;
    }

    this.leaveChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Annual', 'Sick', 'Emergency', 'Unpaid'],
        datasets: [{
          data: [annual, sick, emergency, unpaid],
          backgroundColor: ['#0d6efd', '#dc3545', '#ffc107', '#6c757d'],
          borderWidth: 0,
          hoverOffset: 6
        }]
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
                size: 12
              }
            }
          }
        },
        cutout: '75%'
      }
    });
  }

  getRecentAttendanceData() {
    if (this.totalEmployees === 0 || this.allAttendances.length === 0) return { labels: [], data: [] };

    // Group attendances by date
    const dateGroups: { [date: string]: number } = {};
    
    this.allAttendances.forEach(a => {
      if (a.date && a.clockIn) {
        const d = a.date.split('T')[0];
        dateGroups[d] = (dateGroups[d] || 0) + 1;
      }
    });

    // Get the last 7 unique dates
    const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const last7Dates = sortedDates.slice(-7);

    const labels: string[] = [];
    const data: number[] = [];

    last7Dates.forEach(dateStr => {
      const attended = dateGroups[dateStr];
      const rate = Math.round((attended / this.totalEmployees) * 100);
      
      const dateObj = new Date(dateStr);
      labels.push(dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      data.push(rate > 100 ? 100 : rate);
    });

    return { labels, data };
  }

  renderAttendanceChart() {
    const ctx = document.getElementById('attendanceRateChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.attendanceChartInstance) {
      this.attendanceChartInstance.destroy();
    }

    const { labels, data } = this.getRecentAttendanceData();

    if (labels.length === 0) {
      this.attendanceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['No Data'],
          datasets: [{
            data: [0],
            backgroundColor: '#e9ecef',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { y: { display: false }, x: { display: false } }
        }
      });
      return;
    }

    this.attendanceChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Attendance Rate',
          data: data,
          backgroundColor: '#0d6efd',
          borderRadius: 4,
          barThickness: 25
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 25,
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: '#f1f5f9'
            },
            border: { display: false }
          },
          x: {
            grid: {
              display: false
            },
            border: { display: false }
          }
        }
      }
    });
  }

  downloadSystemReport() {
    const doc = new jsPDF();
    const now = new Date();
    const generatedDateStr = now.toLocaleDateString('en-US') + ' ' + now.toLocaleTimeString('en-US');
    
    // Add Header
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text('Kawadir HRMS', 14, 22);
    
    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text('Comprehensive System Report', 14, 32);
    
    doc.setFontSize(11);
    doc.setTextColor(150);
    doc.text(`Generated On: ${generatedDateStr}`, 14, 40);
    
    // 1. System Overview Table
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text('1. System Overview', 14, 55);
    
    autoTable(doc, {
      startY: 60,
      head: [['Statistic', 'Value']],
      body: [
        ['Total Employees', this.totalEmployees.toString()],
        ['Total Departments', this.departmentsCount.toString()],
        ['Total Salaries (Net)', `${this.totalSalaries.toLocaleString()} JD`],
        ['Pending Leaves', this.pendingLeaves.toString()],
        ['Overall Attendance Rate', `${this.attendanceRate}%`],
      ],
      theme: 'striped',
      headStyles: { fillColor: [13, 110, 253] }
    });

    // 2. Leave Distribution
    let currentY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('2. Leave Distribution', 14, currentY);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Leave Type', 'Percentage']],
      body: [
        ['Annual Leave', `${this.annualLeavePercent}%`],
        ['Sick Leave', `${this.sickLeavePercent}%`],
        ['Emergency Leave', `${this.emergencyLeavePercent}%`],
        ['Unpaid Leave', `${this.unpaidLeavePercent}%`]
      ],
      theme: 'striped',
      headStyles: { fillColor: [220, 53, 69] } // Red/Pinkish
    });

    // 3. Recent Leaves Activity
    currentY = (doc as any).lastAutoTable.finalY + 15;
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.text('3. Recent Leave Requests', 14, currentY);
    
    const recentLeavesData = this.recentLeaves.map(l => [
      l.employeeName || `Emp #${l.employeeId}`,
      l.leaveType,
      `${l.totalDays} Days`,
      l.status
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Employee', 'Leave Type', 'Duration', 'Status']],
      body: recentLeavesData.length > 0 ? recentLeavesData : [['No recent leave requests found', '', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [255, 193, 7] }, // Yellow
      styles: { textColor: [40, 40, 40] }
    });

    // 4. Recent Attendance Activity
    currentY = (doc as any).lastAutoTable.finalY + 15;
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.text('4. Recent Attendance Tracking', 14, currentY);
    
    const recentAttendanceData = this.recentAttendances.map(a => [
      a.employeeName || `Emp #${a.employeeId}`,
      a.date ? new Date(a.date).toLocaleDateString('en-US') : 'N/A',
      a.clockIn || '--:--',
      (a.clockOut && a.clockOut !== '00:00:00') ? a.clockOut : '--:--'
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Employee', 'Date', 'Clock In', 'Clock Out']],
      body: recentAttendanceData.length > 0 ? recentAttendanceData : [['No recent attendance records found', '', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [25, 135, 84] } // Green
    });

    // Save PDF
    const fileDateStr = now.toLocaleDateString('en-US').replace(/\//g, '-');
    doc.save(`Kawadir_System_Report_${fileDateStr}.pdf`);
  }
}

