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
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ExcelExportService } from '../../core/services/excel-export.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
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
  private excelExportService = inject(ExcelExportService);

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

  showPayrollAlert: boolean = false;
  pendingPayrollCount: number = 0;

  readonly PAYDAY = 25;

  leaveChartInstance: any;
  attendanceRateChartInstance: any;

  downloadSystemReport() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 14;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const timeStr = today.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    doc.setFillColor(67, 97, 238);
    doc.rect(0, 0, pageW, 42, 'F');

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

    doc.setFillColor(50, 75, 210);
    doc.roundedRect(pageW - 52, 8, 38, 14, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('ADMIN REPORT', pageW - 33, 16, { align: 'center' });

    const cardY = 50;
    const cardH = 28;
    const cardW = (pageW - margin * 2 - 9) / 4;
    const cards = [
      {
        label: 'Total Employees',
        value: String(this.totalEmployees),
        accentColor: [239, 71, 111] as [number, number, number],
      },
      {
        label: 'Pending Leaves',
        value: String(this.pendingLeaves),
        accentColor: [255, 165, 2] as [number, number, number],
      },
      {
        label: 'Departments',
        value: String(this.departmentsCount),
        accentColor: [67, 97, 238] as [number, number, number],
      },
      {
        label: 'Total Payroll',
        value: `${Number(this.totalSalaries).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} JD`,
        accentColor: [6, 214, 160] as [number, number, number],
      },
    ];

    cards.forEach((card, i) => {
      const x = margin + i * (cardW + 3);

      doc.setFillColor(248, 249, 252);
      doc.roundedRect(x, cardY, cardW, cardH, 3, 3, 'F');
      doc.setDrawColor(225, 228, 240);
      doc.roundedRect(x, cardY, cardW, cardH, 3, 3, 'S');

      doc.setFillColor(...card.accentColor);
      doc.roundedRect(x, cardY, cardW, 3, 1.5, 1.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(30, 30, 50);
      doc.text(card.value, x + cardW / 2, cardY + 15, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 125, 145);
      doc.text(card.label, x + cardW / 2, cardY + 22, { align: 'center' });
    });

    let curY = cardY + cardH + 10;

    this._pdfSectionHeader(doc, 'SYSTEM ANALYTICS', margin, curY, pageW);
    curY += 8;

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
        1: {
          cellWidth: (pageW - margin * 2) * 0.32,
          halign: 'center',
          fontStyle: 'bold',
        },
      },
    });

    curY = (doc as any).lastAutoTable.finalY + 10;

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
        bodyStyles: {
          textColor: [50, 55, 70],
          fontSize: 8.5,
          cellPadding: 2.5,
        },
        alternateRowStyles: { fillColor: [248, 249, 252] },
        didParseCell: (data: any) => {
          if (data.section === 'body' && data.column.index === 4) {
            const status = data.cell.raw as string;
            if (status === 'Approved') {
              data.cell.styles.textColor = [6, 150, 80];
            } else if (status === 'Pending') {
              data.cell.styles.textColor = [200, 120, 0];
            } else if (status === 'Rejected') {
              data.cell.styles.textColor = [180, 30, 50];
            }
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.halign = 'center';
          }
        },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    this._pdfSectionHeader(
      doc,
      'RECENT ATTENDANCE RECORDS',
      margin,
      curY,
      pageW,
    );
    curY += 8;

    const attRows = this.recentAttendances.map((a: any) => [
      a.employeeName || `Emp #${a.employeeId}`,
      a.date ? a.date.split('T')[0] : '—',
      a.clockIn || '--:--',
      a.clockOut && a.clockOut !== '00:00:00' ? a.clockOut : '--:--',
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
        bodyStyles: {
          textColor: [50, 55, 70],
          fontSize: 8.5,
          cellPadding: 2.5,
        },
        alternateRowStyles: { fillColor: [248, 252, 249] },
      });
    }

    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let pg = 1; pg <= totalPages; pg++) {
      doc.setPage(pg);

      doc.setDrawColor(210, 215, 230);
      doc.setLineWidth(0.4);
      doc.line(margin, pageH - 12, pageW - margin, pageH - 12);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(160, 165, 180);
      doc.text(
        'Confidential — Kawadir HRMS Internal Report',
        margin,
        pageH - 7,
      );

      doc.text(`Page ${pg} of ${totalPages}`, pageW - margin, pageH - 7, {
        align: 'right',
      });
    }

    doc.save(`System_Summary_Report_${todayStr}.pdf`);
  }

  private _pdfSectionHeader(
    doc: jsPDF,
    title: string,
    x: number,
    y: number,
    pageW: number,
  ) {
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

  allEmployeesList: any[] = [];

  announcementSearchQuery: string = '';
  announcementDepartmentFilter: string = '';

  get announcementUniqueDepartments(): string[] {
    const depts = this.allEmployeesList
      .map((e) => e.departmentName)
      .filter((d) => !!d);
    return Array.from(new Set(depts));
  }

  get filteredAnnouncementEmployees(): any[] {
    return this.allEmployeesList.filter((emp) => {
      const matchesSearch = this.announcementSearchQuery
        ? `${emp.firstName} ${emp.lastName}`
          .toLowerCase()
          .includes(this.announcementSearchQuery.toLowerCase())
        : true;
      const matchesDept = this.announcementDepartmentFilter
        ? emp.departmentName === this.announcementDepartmentFilter
        : true;
      return matchesSearch && matchesDept;
    });
  }

  get isAllFilteredAnnouncementEmployeesSelected(): boolean {
    const currentSelected =
      this.announcementForm.get('targetEmployeeIds')?.value || [];
    if (this.filteredAnnouncementEmployees.length === 0) return false;
    return this.filteredAnnouncementEmployees.every((emp) =>
      currentSelected.includes(emp.id),
    );
  }

  selectAllFilteredAnnouncementEmployees(event: any) {
    const isChecked = event.target.checked;
    const currentSelected = new Set(
      this.announcementForm.get('targetEmployeeIds')?.value || [],
    );

    this.filteredAnnouncementEmployees.forEach((emp) => {
      if (isChecked) {
        currentSelected.add(emp.id);
      } else {
        currentSelected.delete(emp.id);
      }
    });

    this.announcementForm
      .get('targetEmployeeIds')
      ?.setValue(Array.from(currentSelected));
  }

  constructor() {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['Normal', Validators.required],
      isGeneral: [true],
      targetEmployeeIds: [[]],
      expiryDate: [''],
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
    this.empService.getEmployees(1, 1000).subscribe({
      next: (res) => {
        this.allEmployeesList = res.items || [];
      },
      error: (err) =>
        console.error('Failed to load employees for announcements', err),
    });
  }

  loadAnnouncements() {
    this.announcementService.getAnnouncements(1, 10).subscribe({
      next: (res) => {
        this.announcements = res.items;
      },
      error: (err) => console.error('Failed to load announcements', err),
    });
  }

  openAnnouncementModal() {
    this.announcementForm.reset({
      priority: 'Normal',
      isGeneral: true,
      targetEmployeeIds: [],
    });
    this.showAnnouncementModal = true;
  }

  closeAnnouncementModal() {
    this.showAnnouncementModal = false;
  }

  toggleEmployeeForAnnouncement(empId: number) {
    const currentSelected =
      this.announcementForm.get('targetEmployeeIds')?.value || [];
    const index = currentSelected.indexOf(empId);
    if (index > -1) {
      currentSelected.splice(index, 1);
    } else {
      currentSelected.push(empId);
    }
    this.announcementForm.get('targetEmployeeIds')?.setValue(currentSelected);
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
      },
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
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.announcementService.deleteAnnouncement(id).subscribe({
          next: () => {
            this.loadAnnouncements();
            Swal.fire('Deleted!', 'Announcement has been deleted.', 'success');
          },
          error: (err) => Swal.fire('Error', 'Failed to delete', 'error'),
        });
      }
    });
  }

  trackByAttId(index: number, att: any): number {
    return att.id;
  }

  loadAdminStats() {
    const today = new Date();
    if (today.getDate() >= this.PAYDAY) {
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
      this.salaryService.previewBatch(currentMonth, currentYear).subscribe({
        next: (res: any) => {
          const preview = res?.data ?? res;
          if (preview && preview.employeeCount > 0) {
            this.showPayrollAlert = true;
            this.pendingPayrollCount = preview.employeeCount;
          }
        },
        error: (err) => console.error('Error fetching payroll preview:', err),
      });
    }

    this.empService.getEmployees(1, 1000).subscribe({
      next: (res: any) => {
        const employees = res?.items || [];
        this.totalEmployees = employees.length;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching employees:', err),
    });

    this.leaveService.getAllLeaves(undefined, undefined, 1, 1000).subscribe({
      next: (res: any) => {
        const leaves = res?.items || [];
        this.pendingLeaves = leaves.filter(
          (l: any) => l.status === 'Pending',
        ).length;

        leaves.sort(
          (a: any, b: any) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
        this.recentLeaves = leaves.slice(0, 5);

        const totalLeaves = leaves.length;
        let annual = 0,
          sick = 0,
          emergency = 0,
          unpaid = 0;

        if (totalLeaves > 0) {
          annual = leaves.filter((l: any) => l.leaveType === 'Annual').length;
          sick = leaves.filter((l: any) => l.leaveType === 'Sick').length;
          emergency = leaves.filter(
            (l: any) => l.leaveType === 'Emergency',
          ).length;
          unpaid = leaves.filter((l: any) => l.leaveType === 'Unpaid').length;

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

    this.salaryService.getAllSalaries(undefined, undefined, 1, 1000).subscribe({
      next: (res: any) => {
        const salaries = res?.items || [];
        this.totalSalaries = salaries.reduce(
          (sum: number, current: any) => sum + (current.netAmount || 0),
          0,
        );
      },
      error: (err) => console.error('Error fetching salaries:', err),
    });

    this.attendanceService.getAllAttendance(undefined, 1, 1000).subscribe({
      next: (res: any) => {
        const attendances = res?.items || [];
        attendances.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.recentAttendances = attendances.slice(0, 5);
        this.allAttendances = attendances;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching attendance overview:', err),
    });
  }

  calculateAttendanceRate() {
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
    this.salaryService.getMySalaries(undefined, undefined, 1, 1000).subscribe({
      next: (res: any) => {
        const salaries = res?.items || [];
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
    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'short' });
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    ).toLocaleString('en-US', { month: 'short' });

    if (today.getDate() > this.PAYDAY) {
      this.employeeNextPayday = `${nextMonth} ${this.PAYDAY}`;
    } else {
      this.employeeNextPayday = `${currentMonth} ${this.PAYDAY}`;
    }

    this.loadNextPayday();

    this.leaveService.getMyLeaves(undefined, undefined, 1, 1000).subscribe({
      next: (res: any) => {
        const leaves = res?.items || [];
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

    this.attendanceService.getMyAttendance(undefined, 1, 1000).subscribe({
      next: (res: any) => {
        const attendances = res?.items || [];
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
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
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
    const ctx = document.getElementById('leaveTypeChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.leaveChartInstance) {
      this.leaveChartInstance.destroy();
    }

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
    const ctx = document.getElementById(
      'attendanceRateChart',
    ) as HTMLCanvasElement;
    if (!ctx) return;

    if (this.attendanceRateChartInstance) {
      this.attendanceRateChartInstance.destroy();
    }

    if (this.totalEmployees === 0 || this.allAttendances.length === 0) return;

    const labels = [];
    const data = [];
    let startDateStr = '';

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];

      if (i === 6) {
        startDateStr = d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      labels.push(dayName);

      const dayAtts = this.allAttendances.filter(
        (a) => a.date && a.date.startsWith(dateString) && a.clockIn,
      );
      let rate = Math.round((dayAtts.length / this.totalEmployees) * 100);
      if (rate > 100) rate = 100;
      data.push(rate);
    }

    this.attendanceRateChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Attendance Rate (%)',
            data: data,
            borderColor: '#198754',
            backgroundColor: 'rgba(25, 135, 84, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#198754',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
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
              weight: 'normal',
            },
            padding: { bottom: 15 },
          },
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            padding: 10,
            callbacks: {
              label: function (context) {
                return context.raw + '% Attendance';
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0,0,0,0.05)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  exportRecentAttendancesToExcel() {
    if (this.recentAttendances.length === 0) {
      Swal.fire(
        'No Data',
        'There are no attendance records to export.',
        'info',
      );
      return;
    }

    const headers = ['Employee', 'Date', 'Clock In', 'Clock Out'];
    const data = this.recentAttendances.map((att) => [
      att.employeeName || 'Emp #' + att.employeeId,
      att.date ? new Date(att.date).toLocaleDateString() : '',
      att.clockIn || '--:--',
      att.clockOut && att.clockOut !== '00:00:00' ? att.clockOut : '--:--',
    ]);

    this.excelExportService.exportTableToExcel(
      headers,
      data,
      'Recent_Attendances',
    );
  }

  exportMyRecentAttendancesToExcel() {
    if (this.myRecentAttendances.length === 0) {
      Swal.fire(
        'No Data',
        'There are no attendance records to export.',
        'info',
      );
      return;
    }

    const headers = ['Date', 'Clock In', 'Clock Out'];
    const data = this.myRecentAttendances.map((att) => [
      att.date ? new Date(att.date).toLocaleDateString() : '',
      att.clockIn || '--:--',
      att.clockOut && att.clockOut !== '00:00:00' ? att.clockOut : '--:--',
    ]);

    this.excelExportService.exportTableToExcel(
      headers,
      data,
      'My_Recent_Attendances',
    );
  }
}
