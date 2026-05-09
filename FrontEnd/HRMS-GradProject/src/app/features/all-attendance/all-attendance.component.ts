import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
  selector: 'app-all-attendance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-attendance.component.html',
})
export class AllAttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);

  records: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res) ? res : res?.items ?? res?.data?.items ?? res?.data ?? [];
        this.records = Array.isArray(items) ? items : [];
        this.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  getStatusClass(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'text-warning';
    return 'text-success';
  }

  getStatusLabel(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'Working';
    return 'Completed';
  }

  calcHours(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return '—';
    const inn = new Date(`2000-01-01T${rec.clockIn}`);
    const out = new Date(`2000-01-01T${rec.clockOut}`);
    const hrs = (out.getTime() - inn.getTime()) / 3600000;
    return `${hrs.toFixed(1)} hrs`;
  }
}
