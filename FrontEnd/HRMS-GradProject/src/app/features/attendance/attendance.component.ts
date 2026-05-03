import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent implements OnInit {
  records: any[] = [];
  private attendanceService = inject(AttendanceService);

  ngOnInit() {
    this.records = this.attendanceService.getAttendance();
  }
}
