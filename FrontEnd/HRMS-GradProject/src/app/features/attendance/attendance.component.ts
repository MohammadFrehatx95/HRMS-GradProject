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
  attendanceList: any[] = [];
  isLoading: boolean = true;
  private attendanceService = inject(AttendanceService);

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.attendanceService.getAttendanceRecords().subscribe({
      next: (data) => {
        this.attendanceList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching attendance records:', err);
        this.isLoading = false;
      },
    });
  }
}
