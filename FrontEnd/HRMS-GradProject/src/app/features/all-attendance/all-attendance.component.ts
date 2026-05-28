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

  allRecords: any[] = [];
  records: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';

  isLoading = true;

  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.records.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.records.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  ngOnInit() {

    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        
        const rawRecords = Array.isArray(items) ? items : [];
        const uniqueRecords = new Map<string, any>();
        
        for (const rec of rawRecords) {
          const key = `${rec.employeeId}_${rec.date}_${rec.clockIn}_${rec.clockOut}`;
          if (!uniqueRecords.has(key)) {
            uniqueRecords.set(key, rec);
          }
        }
        
        this.allRecords = Array.from(uniqueRecords.values());
        
        this.allRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.records = [...this.allRecords];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterRecords() {

    this.records = this.allRecords.filter((rec) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const empName = (rec.employeeName || '').toLowerCase();
        const empId = String(rec.employeeId || '');
        const dateStr = String(rec.date || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          dateStr.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        const currentStatus = this.getStatusLabel(rec);
        matchesStatus = currentStatus === this.selectedStatus;
      }

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
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
      { label: 'Total Records', value: String(this.records.length) },
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
