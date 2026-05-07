import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../core/services/attendance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);

  attendanceRecords: any[] = [];
  isLoading: boolean = true;
  isProcessing: boolean = false;

  isCheckedInToday: boolean = false;
  isCheckedOutToday: boolean = false;
  todayWorkedHours: number = 0;

  ngOnInit() {
    this.loadMyAttendance();
  }
  loadMyAttendance() {
    this.isLoading = true;
    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];

        this.attendanceRecords = Array.isArray(extractedData)
          ? extractedData
          : [];

        this.analyzeTodayStatus(this.attendanceRecords);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching attendance:', err);
        this.isLoading = false;
      },
    });
  }

  private analyzeTodayStatus(records: any[]) {
    const today = new Date().toDateString();

    const todayRecord = records.find((record) => {
      const recordDate = new Date(record.date).toDateString();
      return recordDate === today;
    });

    if (todayRecord) {
      this.isCheckedInToday = true;
      this.isCheckedOutToday = !!(
        todayRecord.clockOut && todayRecord.clockOut !== '00:00:00'
      );

      if (this.isCheckedOutToday) {
        const inTime = new Date(`2000-01-01T${todayRecord.clockIn}`);
        const outTime = new Date(`2000-01-01T${todayRecord.clockOut}`);

        this.todayWorkedHours =
          (outTime.getTime() - inTime.getTime()) / 3600000;
      }
    } else {
      this.isCheckedInToday = false;
      this.isCheckedOutToday = false;
      this.todayWorkedHours = 0;
    }
  }

  onClockIn() {
    this.isProcessing = true;
    const now = new Date();
    const dateIso = now.toISOString();
    const timeString = now.toTimeString().split(' ')[0];

    const payload = {
      date: dateIso,
      clockIn: timeString,
    };

    this.attendanceService.clockIn(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        Swal.fire({
          icon: 'success',
          title: 'Clocked In',
          text: `Have a great day! Clocked in at ${timeString}`,
          timer: 2000,
          showConfirmButton: false,
        });
        this.loadMyAttendance();
      },
      error: (err) => {
        this.isProcessing = false;
        console.error('Clock In Error:', err);
        Swal.fire('Error', 'Failed to clock in. Please try again.', 'error');
      },
    });
  }

  onClockOut() {
    this.isProcessing = true;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    const payload = {
      clockOut: timeString,
    };

    this.attendanceService.clockOut(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        Swal.fire({
          icon: 'success',
          title: 'Clocked Out',
          text: `Great job today! Clocked out at ${timeString}`,
          timer: 2000,
          showConfirmButton: false,
        });
        this.loadMyAttendance();
      },
      error: (err) => {
        this.isProcessing = false;
        console.error('Clock Out Error:', err);
        Swal.fire('Error', 'Failed to clock out. Please try again.', 'error');
      },
    });
  }
}
