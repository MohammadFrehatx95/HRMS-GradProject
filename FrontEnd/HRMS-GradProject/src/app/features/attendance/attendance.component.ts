import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private authService = inject(AuthService);

  attendanceRecords: any[] = [];
  isLoading = true;
  isProcessing = false;
  isAdmin = false;

  // حالة الموظف الحالية
  isCheckedInToday = false;   // تحققنا من Clock In اليوم
  isCheckedOutToday = false;  // الـ session مكتملة
  todayWorkedHours = 0;
  activeSession: any = null;  // أي session مفتوحة (Working) من أي يوم
  readonly today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD للمقارنة في الـ template

  /** true إذا كان هناك session مفتوحة من يوم سابق (مش اليوم) */
  get isStaleSession(): boolean {
    if (!this.activeSession?.date) return false;
    const sessionDate = new Date(this.activeSession.date).toISOString().split('T')[0];
    return sessionDate < this.today;
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.loadAllAttendance();
    } else {
      this.loadMyAttendance();
    }
  }

  // ─── Admin: جلب كل سجلات الحضور ───
  loadAllAttendance() {
    this.isLoading = true;
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = res?.items ?? (Array.isArray(res) ? res : res?.data?.items ?? res?.data ?? []);
        this.attendanceRecords = Array.isArray(items) ? items : [];
        this.attendanceRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching all attendance:', err);
        this.isLoading = false;
      },
    });
  }

  // ─── Employee: جلب سجلاتي ───
  loadMyAttendance() {
    this.isLoading = true;
    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        const items = res?.items ?? (Array.isArray(res) ? res : res?.data?.items ?? res?.data ?? []);
        this.attendanceRecords = Array.isArray(items) ? items : [];
        this.analyzeSessionStatus(this.attendanceRecords);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my attendance:', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * ✅ تحليل حالة الحضور:
   * - نبحث عن أي session مفتوحة (clockOut فارغ) من أي يوم
   * - إذا وُجدت → يجب Clock Out أولاً (حتى من أيام سابقة)
   * - إذا اليوم مكتمل → عرض ساعات العمل
   * - إذا لا يوجد شيء → عرض زر Clock In
   */
  private analyzeSessionStatus(records: any[]) {
    const today = new Date().toDateString();

    // ✅ ابحث عن أي session مفتوحة من أي يوم (الأحدث أولاً بعد الفرز)
    const openSession = records.find(
      (r) => !r.clockOut || r.clockOut === '00:00:00' || r.clockOut === null
    );

    // سجل اليوم تحديداً (مكتمل أو مفتوح)
    const todayRecord = records.find(
      (r) => new Date(r.date).toDateString() === today
    );

    if (openSession) {
      // 🔴 Session مفتوحة → زر Clock Out
      this.activeSession = openSession;
      this.isCheckedInToday = true;
      this.isCheckedOutToday = false;
      this.todayWorkedHours = 0;
    } else if (todayRecord) {
      // ✅ اليوم مكتمل
      this.activeSession = null;
      this.isCheckedInToday = true;
      this.isCheckedOutToday = true;

      const inTime = new Date(`2000-01-01T${todayRecord.clockIn}`);
      const outTime = new Date(`2000-01-01T${todayRecord.clockOut}`);
      this.todayWorkedHours = (outTime.getTime() - inTime.getTime()) / 3600000;
    } else {
      // ⚪ لا يوجد شيء → زر Clock In
      this.activeSession = null;
      this.isCheckedInToday = false;
      this.isCheckedOutToday = false;
      this.todayWorkedHours = 0;
    }
  }

  // ─── Clock In ───
  onClockIn() {
    this.isProcessing = true;
    const now = new Date();
    const dateIso = now.toISOString();
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS

    this.attendanceService.clockIn({ date: dateIso, clockIn: timeString }).subscribe({
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
        const msg = err?.error?.message || err?.error?.Message || 'Failed to clock in. Please try again.';
        Swal.fire('Error', msg, 'error');
      },
    });
  }

  // ─── Clock Out ───
  onClockOut() {
    this.isProcessing = true;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS

    // إذا كانت الـ session من يوم سابق، نرسل وقت 23:59 أو وقت الآن
    const isOldSession = this.activeSession &&
      new Date(this.activeSession.date).toDateString() !== new Date().toDateString();

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
        const msg = err?.error?.message || err?.error?.Message || 'Failed to clock out. Please try again.';
        Swal.fire('Error', msg, 'error');
      },
    });
  }
}
