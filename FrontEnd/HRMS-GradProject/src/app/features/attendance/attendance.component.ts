import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AttendanceService } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { ExcelExportService } from '../../core/services/excel-export.service';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { SettingsService } from '../../core/services/settings.service';
import { TRANSLATIONS } from '../../core/i18n/translations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit, OnDestroy {
  private attendanceService = inject(AttendanceService);
  private authService = inject(AuthService);
  private excelExportService = inject(ExcelExportService);
  private pdfExportService = inject(PdfExportService);
  private settingsService = inject(SettingsService);

  attendanceRecords: any[] = [];
  attendanceSettings: any = null;
  currentTime: Date = new Date();
  timerInterval: any;

  searchQuery: string = '';
  selectedStatus: string = '';
  selectedDate: string = '';

  isLoading = true;
  isProcessing = false;
  isAdmin = false;
  isAdminOrHR = false;
  isHR = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCount: number = 0;

  get paginatedRecords() {
    return this.attendanceRecords;
  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterRecords();
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  isCheckedInToday = false;
  isCheckedOutToday = false;
  todayWorkedHours = 0;
  activeSession: any = null;
  readonly today = new Date().toISOString().split('T')[0];

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
    this.isHR = this.authService.isHR();
    if (this.isAdmin) {
      this.loadAllAttendance();
    } else {
      this.loadMyAttendance();
    }

    this.attendanceService.getAttendanceSettings().subscribe((settings: any) => {
      this.attendanceSettings = settings;
    });

    this.timerInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  get isBeforeStartTime(): boolean {
    if (!this.attendanceSettings?.workStartTime) return false;
    const nowStr = this.currentTime.toTimeString().split(' ')[0];
    return nowStr < this.attendanceSettings.workStartTime;
  }

  get isAfterEndTime(): boolean {
    if (!this.attendanceSettings?.workEndTime) return false;
    const nowStr = this.currentTime.toTimeString().split(' ')[0];
    return nowStr > this.attendanceSettings.workEndTime;
  }

  get lateArrivalText(): string {
    if (!this.attendanceSettings?.workStartTime) return '';
    const nowStr = this.currentTime.toTimeString().split(' ')[0];
    if (nowStr <= this.attendanceSettings.workStartTime) return '';
    return this.calculateTimeDifference(this.attendanceSettings.workStartTime, nowStr);
  }

  get overtimeText(): string {
    if (!this.attendanceSettings?.workEndTime) return '';
    const nowStr = this.currentTime.toTimeString().split(' ')[0];
    if (nowStr <= this.attendanceSettings.workEndTime) return '';
    return this.calculateTimeDifference(this.attendanceSettings.workEndTime, nowStr);
  }

  private calculateTimeDifference(start: string, end: string): string {
    const startParts = start.split(':').map(Number);
    const endParts = end.split(':').map(Number);
    
    let startMins = startParts[0] * 60 + startParts[1];
    let endMins = endParts[0] * 60 + endParts[1];
    
    let diff = endMins - startMins;
    if (diff <= 0) return '';
    
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    
    const lang = this.settingsService.language;
    const hrsStr = TRANSLATIONS['hrs'][lang] || 'hrs';
    const andStr = TRANSLATIONS[' hrs and ']?.[lang] || ' and ';
    const minsStr = TRANSLATIONS[' mins']?.[lang] || ' mins';
    
    if (hours > 0 && mins > 0) return `${hours} ${hrsStr}${andStr}${mins}${minsStr}`;
    if (hours > 0) return `${hours} ${hrsStr}`;
    return `${mins}${minsStr}`;
  }

  loadAllAttendance() {
    this.isLoading = true;
    let d = undefined;
    if (this.selectedDate) {
      try {
        let temp: any = this.selectedDate;
        if (temp && typeof temp.toDate === 'function') {
          temp = temp.toDate();
        }
        if (temp instanceof Date && !isNaN(temp.getTime())) {
          d = new Date(temp.getTime() - (temp.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        } else if (typeof temp === 'string') {
          const parts = temp.split('/');
          if (parts.length === 3) {
            d = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            if (isNaN(new Date(d).getTime())) d = new Date(temp).toISOString().split('T')[0];
          } else d = new Date(temp).toISOString().split('T')[0];
        }
      } catch (e) {
        console.error(e);
      }
    }
    this.attendanceService
      .getAllAttendance(
        d,
        this.currentPage,
        this.itemsPerPage,
        this.searchQuery,
        this.selectedStatus,
      )
      .subscribe({
        next: (res: any) => {
          this.attendanceRecords = res.items || [];
          this.totalCount = res.totalCount || 0;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  loadMyAttendance() {
    this.isLoading = true;
    let d = undefined;
    if (this.selectedDate) {
      try {
        let temp: any = this.selectedDate;
        if (temp && typeof temp.toDate === 'function') {
          temp = temp.toDate();
        }
        if (temp instanceof Date && !isNaN(temp.getTime())) {
          d = new Date(temp.getTime() - (temp.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        } else if (typeof temp === 'string') {
          const parts = temp.split('/');
          if (parts.length === 3) {
            d = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            if (isNaN(new Date(d).getTime())) d = new Date(temp).toISOString().split('T')[0];
          } else d = new Date(temp).toISOString().split('T')[0];
        }
      } catch (e) {
        console.error(e);
      }
    }
    this.attendanceService
      .getMyAttendance(
        d,
        this.currentPage,
        this.itemsPerPage,
        this.searchQuery,
        this.selectedStatus,
      )
      .subscribe({
        next: (res: any) => {
          this.attendanceRecords = res.items || [];
          this.totalCount = res.totalCount || 0;
          if (
            this.currentPage === 1 &&
            !this.selectedDate &&
            !this.searchQuery &&
            !this.selectedStatus
          ) {
            this.analyzeSessionStatus(this.attendanceRecords);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching my attendance:', err);
          this.isLoading = false;
        },
      });
  }

  filterRecords() {
    if (this.isAdmin) {
      this.loadAllAttendance();
    } else {
      this.loadMyAttendance();
    }
  }

  onFilterChange() {
    this.currentPage = 1;
    this.filterRecords();
  }

  private analyzeSessionStatus(records: any[]) {
    const today = new Date().toDateString();

    const openSession = records.find(
      (r) => r.clockIn && (!r.clockOut || r.clockOut === '00:00:00'),
    );

    const todayRecord = records.find(
      (r) => new Date(r.date).toDateString() === today && r.clockIn,
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
    if (this.isBeforeStartTime) {
      Swal.fire('Warning', `You cannot clock in before ${this.attendanceSettings?.workStartTime}`, 'warning');
      return;
    }

    this.isProcessing = true;
    const now = new Date();
    const dateIso = now.toISOString();
    const timeString = now.toTimeString().split(' ')[0];

    this.attendanceService
      .clockIn({ date: dateIso, clockIn: timeString })
      .subscribe({
        next: () => {
          this.isProcessing = false;
          Swal.fire({
            icon: 'success',
            title: 'Clocked In ✅',
            text: `Clocked in at ${timeString}`,
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

  onClockOut() {
    this.isProcessing = true;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    const isOldSession =
      this.activeSession &&
      new Date(this.activeSession.date).toDateString() !==
        new Date().toDateString();

    const clockOutTime = isOldSession ? '23:59:00' : timeString;

    this.attendanceService.clockOut({ clockOut: clockOutTime }).subscribe({
      next: () => {
        this.isProcessing = false;
        let extraMsg = '';
        if (!isOldSession && this.isAfterEndTime) {
          extraMsg = `\nOvertime recorded: ${this.overtimeText}`;
        }
        const msg = isOldSession
          ? `Previous session automatically closed at 23:59.`
          : `Great job today! Clocked out at ${clockOutTime}.${extraMsg}`;
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

  exportToExcel() {
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

    const data = this.attendanceRecords.map((rec) => {
      const status = rec.status || (rec.clockOut && rec.clockOut !== '00:00:00' ? 'Completed' : 'Working');
      const empName = rec.employeeName || 'Emp #' + rec.employeeId;

      return [
        rec.date ? new Date(rec.date).toLocaleDateString() : '',
        empName,
        rec.employeeId || 'N/A',
        rec.clockIn || '--:--',
        rec.clockOut && rec.clockOut !== '00:00:00' ? rec.clockOut : '--:--',
        status,
        rec.totalHours || '0',
      ];
    });

    this.excelExportService.exportTableToExcel(headers, data, 'Attendance');
  }

  exportToPDF() {
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

    const data = this.attendanceRecords.map((rec) => {
      const status = rec.status || (rec.clockOut && rec.clockOut !== '00:00:00' ? 'Completed' : 'Working');
      const empName = rec.employeeName || 'Emp #' + rec.employeeId;

      return [
        rec.date ? new Date(rec.date).toLocaleDateString() : '',
        empName,
        rec.employeeId || 'N/A',
        rec.clockIn || '--:--',
        rec.clockOut && rec.clockOut !== '00:00:00' ? rec.clockOut : '--:--',
        status,
        rec.totalHours || '0',
      ];
    });

    this.pdfExportService.generateTableReport(
      this.isAdmin ? 'Employee Attendance Tracking' : 'My Attendance Tracking',
      headers,
      data,
      'Attendance_Report',
    );
  }
}
