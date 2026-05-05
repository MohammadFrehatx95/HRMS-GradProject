import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);

  attendanceRecords: any[] = [];
  isLoading = true;
  isProcessing = false;

  currentEmployeeId = 1;
  isCheckedInToday = false;
  isCheckedOutToday = false;

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.isLoading = true;
    this.attendanceService.getMyAttendance().subscribe({
      next: (data) => {
        console.log('Real Data from Backend:', data);
        this.attendanceRecords = data;
        this.analyzeTodayStatus(data);
        this.isLoading = false;
      },
    });
  }

  private analyzeTodayStatus(records: any[]) {
    const today = new Date().toDateString();

    const todayRecord = records.find((record) => {
      const recordDate = new Date(record.clockIn || record.date).toDateString();
      return recordDate === today && record.clockIn !== '00:00:00';
    });

    if (todayRecord) {
      this.isCheckedInToday = true;
      this.isCheckedOutToday = !!(
        todayRecord.clockOut && todayRecord.clockOut !== '00:00:00'
      );
    } else {
      this.isCheckedInToday = false;
      this.isCheckedOutToday = false;
    }
  }

  onCheckIn() {
    this.isProcessing = true;
    this.attendanceService.checkIn().subscribe({
      next: () => {
        this.isProcessing = false;
        this.loadRecords();
      },
      error: (err) => {
        this.isProcessing = false;
        console.error('Check-in failed', err);
        alert('Check-in failed. Please check console.');
      },
    });
  }

  onCheckOut() {
    this.isProcessing = true;
    this.attendanceService.checkOut().subscribe({
      next: () => {
        this.isProcessing = false;
        this.loadRecords();
      },
      error: (err) => {
        this.isProcessing = false;
        console.error('Check-out failed', err);
        alert('Check-out failed. Please check console.');
      },
    });
  }
}
