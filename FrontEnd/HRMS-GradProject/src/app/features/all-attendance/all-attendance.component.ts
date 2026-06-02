import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../core/services/attendance.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { ExcelExportService } from '../../core/services/excel-export.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-attendance',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './all-attendance.component.html',
})
export class AllAttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private pdfExportService = inject(PdfExportService);
  private excelExportService = inject(ExcelExportService);

  records: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';
  selectedDate: string = '';

  isLoading = true;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCount: number = 0;

  get paginatedRecords() {
    return this.records;
  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAllAttendance();
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  ngOnInit() {
    this.loadAllAttendance();
  }

  loadAllAttendance() {
    this.isLoading = true;
    const d = this.selectedDate || undefined;
    this.attendanceService.getAllAttendance(d, this.currentPage, this.itemsPerPage, this.searchQuery, this.selectedStatus).subscribe({
      next: (res: any) => {
        this.records = res.items || [];
        this.totalCount = res.totalCount || 0;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterRecords() {
    this.currentPage = 1;
    this.loadAllAttendance();
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

  exportToPDF() {
    if (this.records.length === 0) {
      Swal.fire('No Data', 'There are no attendance records to export.', 'info');
      return;
    }

    const headers = ['Employee', 'Date', 'Clock In', 'Clock Out', 'Status', 'Total Hours'];
    const data = this.records.map(rec => [
      rec.employeeName || `#${rec.employeeId}`,
      rec.date ? rec.date.split('T')[0] : '—',
      rec.clockIn || '—',
      rec.clockOut && rec.clockOut !== '00:00:00' ? rec.clockOut : '—',
      this.getStatusLabel(rec),
      rec.totalHours ?? this.calcHours(rec)
    ]);

    const additionalInfo = [
      { label: 'Total Records', value: String(this.totalCount) },
      { label: 'Completed Sessions', value: String(this.records.filter(r => this.getStatusLabel(r) === 'Completed').length) },
      { label: 'Currently Working', value: String(this.records.filter(r => this.getStatusLabel(r) === 'Working').length) }
    ];

    this.pdfExportService.generateTableReport(
      'Attendance Records',
      headers,
      data,
      'Attendance_Report',
      additionalInfo
    );
  }

  exportToExcel() {
    if (this.records.length === 0) {
      Swal.fire('No Data', 'There are no attendance records to export.', 'info');
      return;
    }

    const headers = ['Employee', 'Date', 'Clock In', 'Clock Out', 'Status', 'Total Hours'];
    const data = this.records.map(rec => [
      rec.employeeName || `#${rec.employeeId}`,
      rec.date ? rec.date.split('T')[0] : '—',
      rec.clockIn || '—',
      rec.clockOut && rec.clockOut !== '00:00:00' ? rec.clockOut : '—',
      this.getStatusLabel(rec),
      rec.totalHours ?? this.calcHours(rec)
    ]);

    this.excelExportService.exportTableToExcel(headers, data, 'All_Attendance');
  }
}
