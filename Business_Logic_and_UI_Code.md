# ملف الكود الخاص بمسؤول منطق العمل وواجهات المستخدم

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\all-attendance\all-attendance.component.html

``html
<div class="page-container p-4">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                <i class="bi bi-clock-history me-2 text-primary"></i>All Employees Attendance
            </h3>
            <p class="text-muted small mb-0">Overview of all employees clock-in and clock-out records</p>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="Search by name, ID, or date..." 
                    [(ngModel)]="searchQuery" 
                    (input)="filterRecords()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Attendance">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">Filter Options</h6>
                    
                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">Status</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedStatus" (change)="filterRecords()">
                            <option value="">All Statuses</option>
                            <option value="Working">Working</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <a routerLink="/employees" class="btn btn-outline-secondary btn-sm rounded-3 text-nowrap shadow-sm p-2 px-3">
                <i class="bi bi-arrow-left me-1"></i> Back to Employees
            </a>
        </div>
    </div>

    <!-- Table -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <tr>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Employee</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold">Date</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-success">Clock In</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-danger">Clock Out</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-primary">Total Hours</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Status</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <!-- Loading -->
                    <tr *ngIf="isLoading">
                        <td colspan="6" class="text-center py-5 text-muted">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            Loading attendance records...
                        </td>
                    </tr>

                    <!-- Empty -->
                    <tr *ngIf="!isLoading && records.length === 0">
                        <td colspan="6" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-clock-history fs-1 text-secondary"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">No Attendance Records</h5>
                                <p class="text-muted small">There are no clock-in records available yet matching your criteria.</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Rows -->
                    <tr *ngFor="let rec of paginatedRecords">
                        <td data-label="Employee" class="py-3 px-4">
                            <div class="fw-semibold text-dark">
                                {{ rec.employeeName || ('Employee #' + rec.employeeId) }}
                            </div>
                        </td>
                        <td data-label="Date" class="py-3 px-3 text-muted">
                            {{ rec.date | date:'dd MMM yyyy' }}
                        </td>
                        <td data-label="Clock In" class="py-3 px-3 text-success fw-medium">
                            <i class="bi bi-arrow-down-right-circle me-1"></i>
                            {{ rec.clockIn || 'â€”' }}
                        </td>
                        <td data-label="Clock Out" class="py-3 px-3 text-danger fw-medium">
                            <i class="bi bi-arrow-up-right-circle me-1"></i>
                            {{ (!rec.clockOut || rec.clockOut === '00:00:00') ? 'â€”' : rec.clockOut }}
                        </td>
                        <td data-label="Total Hours" class="py-3 px-3 fw-semibold text-primary">
                            {{ calcHours(rec) }}
                        </td>
                        <td data-label="Status" class="py-3 px-4">
                            <span class="badge rounded-pill px-3 py-2"
                                [class.bg-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-opacity-10]="true"
                                [class.text-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                [class.text-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                style="border: 1px solid currentColor; opacity: 0.9;">
                                <i class="bi me-1"
                                   [class.bi-check-circle-fill]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                   [class.bi-clock-fill]="!rec.clockOut || rec.clockOut === '00:00:00'"></i>
                                {{ getStatusLabel(rec) }}
                            </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="records.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, records.length) }} of {{ records.length }} entries
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<style>
.cursor-pointer {
  cursor: pointer;
}

/* Mobile Responsive Cards for Table */
@media screen and (max-width: 768px) {
  .table-responsive table, 
  .table-responsive thead, 
  .table-responsive tbody, 
  .table-responsive th, 
  .table-responsive td, 
  .table-responsive tr {
    display: block;
  }
  
  .table-responsive thead tr {
    display: none; /* Hide header row */
  }
  
  .table-responsive tr {
    border: 1px solid #e8ecf0;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  
  .table-responsive td {
    border: none;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    padding-left: 45% !important;
    text-align: right !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 50px;
  }
  
  .table-responsive td:last-child {
    border-bottom: 0;
  }
  
  .table-responsive td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 40%;
    text-align: left;
    font-weight: 700;
    color: #8592a3;
    font-size: 0.75rem;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .actions-cell {
    justify-content: flex-end !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\all-attendance\all-attendance.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
  selector: 'app-all-attendance',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './all-attendance.component.html',
})
export class AllAttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);

  allRecords: any[] = [];
  records: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';

  isLoading = true;

  // Pagination
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
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø³Ø¬Ù„Ø§Øª
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allRecords = Array.isArray(items) ? items : [];
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
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ø³Ø¬Ù„Ø§Øª
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
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'â€”';
    const inn = new Date(`2000-01-01T${rec.clockIn}`);
    const out = new Date(`2000-01-01T${rec.clockOut}`);
    const hrs = (out.getTime() - inn.getTime()) / 3600000;
    return `${hrs.toFixed(1)} hrs`;
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\attendance\attendance.component.css

``css

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\attendance\attendance.component.html

``html
<div class="page-container p-4">

    <div class="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                {{ isAdmin ? ('Employee Attendance Tracking' | t) : ('My Attendance Tracking' | t) }}
            </h3>
            <p class="text-muted small mb-0">
                {{ isAdmin ? ('Monitor all employees daily clock-in and clock-out records' | t) : ('Monitor your daily clock-in and clock-out records' | t) }}
            </p>
        </div>

        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end flex-wrap">
            <div class="input-group shadow-sm" style="max-width: 300px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="{{ 'Search employees...' | t }}" 
                    [(ngModel)]="searchQuery" 
                    (input)="filterRecords()">
            </div>

            <button class="btn btn-outline-success shadow-sm px-4 py-2 rounded-3 fw-semibold text-nowrap d-flex align-items-center" (click)="exportToExcel()">
                <i class="bi bi-file-earmark-excel-fill me-2 fs-5"></i> {{ 'Export' | t }}
            </button>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm px-3 py-2 rounded-3 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-filter me-2 fs-5"></i> {{ 'Filter' | t }}
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="min-width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">{{ 'Filter Options' | t }}</h6>
                    <div class="mb-0">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Status' | t }}</label>
                        <select class="form-select form-select-sm border-light-subtle" [(ngModel)]="selectedStatus" (change)="filterRecords()">
                            <option value="">{{ 'All Statuses' | t }}</option>
                            <option value="Completed">{{ 'Completed' | t }}</option>
                            <option value="Working">{{ 'Working' | t }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div *ngIf="!isAdmin" class="d-flex flex-column align-items-end gap-2">
                <div *ngIf="isStaleSession"
                     class="alert alert-warning py-2 px-3 mb-0 rounded-3 small d-flex align-items-center gap-2 w-100">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <span>
                        {{ 'Open session from' | t }} <strong>{{ activeSession?.date | date:'dd MMM yyyy' }}</strong>.
                        {{ 'Click Clock Out to close it.' | t }}
                    </span>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <a *ngIf="isAdminOrHR" routerLink="/all-attendance"
                       class="btn btn-outline-primary px-4 py-2 rounded-3 shadow-sm text-nowrap">
                        <i class="bi bi-people me-1"></i> {{ 'View All' | t }}
                    </a>

                    <button *ngIf="!isCheckedInToday"
                        class="btn btn-success px-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                        (click)="onClockIn()"
                        [disabled]="isProcessing || isLoading">
                        <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                        <i *ngIf="!isProcessing" class="bi bi-box-arrow-in-right me-2"></i> {{ 'Clock In' | t }}
                    </button>

                    <button *ngIf="isCheckedInToday && !isCheckedOutToday"
                        class="btn btn-warning px-4 py-2 rounded-3 fw-semibold shadow-sm text-dark text-nowrap"
                        (click)="onClockOut()"
                        [disabled]="isProcessing || isLoading">
                        <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                        <i *ngIf="!isProcessing" class="bi bi-box-arrow-right me-2"></i> {{ 'Clock Out' | t }}
                    </button>

                    <span *ngIf="isCheckedInToday && isCheckedOutToday"
                        class="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-3 fw-semibold border border-success border-opacity-25 text-nowrap">
                        <i class="bi bi-check-circle-fill me-2"></i> {{ 'Shift Completed' | t }} ({{ todayWorkedHours | number:'1.1-2' }} {{ 'hrs' | t }})
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <tr>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Date' | t }}</th>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Clock In' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Clock Out' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-center">{{ 'Status' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-end">{{ 'Total Hours' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td colspan="6" class="text-center py-5 text-muted">
                            <span
                                class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading attendance data...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && attendanceRecords.length === 0">
                        <td [colSpan]="isAdmin ? 6 : 5" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-clock-history text-secondary fs-1"></i>
                                </div>
                                <h3 class="fw-bold text-dark mb-1">{{ 'Attendance' | t }}</h3>
                                <p class="text-muted small mb-0">{{ 'No attendance records available yet matching your criteria.' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let record of paginatedRecords">
                        <td data-label="Date" class="py-3 px-4 fw-bold text-dark">
                            {{ record.date | date:'dd MMM yyyy' }}
                        </td>
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-4 fw-bold text-dark">
                            {{ record.employeeName || ('Emp #' + record.employeeId) }}
                        </td>

                        <td data-label="Clock-in Time" class="py-3 px-3 text-success fw-medium">
                            <i class="bi bi-arrow-down-right-circle me-1"></i>
                            {{ record.clockIn || '--:--' }}
                        </td>

                        <td data-label="Clock-out Time" class="py-3 px-3 text-danger fw-medium">
                            <i class="bi bi-arrow-up-right-circle me-1"></i>
                            {{ (record.clockOut && record.clockOut !==
                            '00:00:00') ? record.clockOut : '--:--' }}
                        </td>

                        <td data-label="Status" class="py-3 px-4 text-center">
                            <span class="badge px-3 py-2 rounded-pill"
                                [ngClass]="(record.clockOut && record.clockOut !== '00:00:00') ? 'bg-success bg-opacity-10 text-success' : 'bg-primary bg-opacity-10 text-primary'">
                                {{ (record.clockOut && record.clockOut !== '00:00:00') ? ('Completed' | t) : ('Working' | t) }}
                            </span>
                        </td>

                        <td data-label="Total Hours" class="py-3 px-3 text-end">
                            <span class="fw-bold fs-6">{{ record.totalHours || '-' }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="allAttendanceRecords.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, attendanceRecords.length) }} of {{ attendanceRecords.length }} entries
                <span *ngIf="attendanceRecords.length !== allAttendanceRecords.length" class="text-primary ms-1">
                    (filtered from {{ allAttendanceRecords.length }} total)
                </span>
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<style>
.cursor-pointer {
  cursor: pointer;
}

/* Mobile Responsive Cards for Table */
@media screen and (max-width: 768px) {
  .table-responsive table, 
  .table-responsive thead, 
  .table-responsive tbody, 
  .table-responsive th, 
  .table-responsive td, 
  .table-responsive tr {
    display: block;
  }
  
  .table-responsive thead tr {
    display: none; /* Hide header row */
  }
  
  .table-responsive tr {
    border: 1px solid #e8ecf0;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  
  .table-responsive td {
    border: none;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    padding-left: 45% !important;
    text-align: right !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 50px;
  }
  
  .table-responsive td:last-child {
    border-bottom: 0;
  }
  
  .table-responsive td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 40%;
    text-align: left;
    font-weight: 700;
    color: #8592a3;
    font-size: 0.75rem;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .actions-cell {
    justify-content: flex-end !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\attendance\attendance.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private authService = inject(AuthService);

  allAttendanceRecords: any[] = [];
  attendanceRecords: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';

  isLoading = true;
  isProcessing = false;
  isAdmin = false;
  isAdminOrHR = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.attendanceRecords.slice(
      startIndex,
      startIndex + this.itemsPerPage,
    );
  }

  get totalPages() {
    return Math.ceil(this.attendanceRecords.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  // Ø­Ø§Ù„Ø© clock in/out Ø§Ù„ÙŠÙˆÙ…
  isCheckedInToday = false;
  isCheckedOutToday = false;
  todayWorkedHours = 0;
  activeSession: any = null; // session Ù…ÙØªÙˆØ­Ø© Ø¨Ø¯ÙˆÙ† clock out
  readonly today = new Date().toISOString().split('T')[0]; // Ù„Ù„Ù…Ù‚Ø§Ø±Ù†Ø© ÙÙŠ Ø§Ù„Ù€ template

  // session Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ ÙˆÙ†Ø³ÙŠ ÙŠØ¹Ù…Ù„ clock out
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
    if (this.isAdmin) {
      this.loadAllAttendance();
    } else {
      this.loadMyAttendance();
    }
  }

  loadAllAttendance() {
    // ØªØ­Ù…ÙŠÙ„ ÙƒÙ„ Ø§Ù„Ø­Ø¶ÙˆØ±
    this.isLoading = true;
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allAttendanceRecords = Array.isArray(items) ? items : [];
        this.allAttendanceRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.attendanceRecords = [...this.allAttendanceRecords];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadMyAttendance() {
    // ØªØ­Ù…ÙŠÙ„ Ø­Ø¶ÙˆØ±ÙŠ
    this.isLoading = true;
    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allAttendanceRecords = Array.isArray(items) ? items : [];
        this.attendanceRecords = [...this.allAttendanceRecords];
        this.analyzeSessionStatus(this.attendanceRecords);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my attendance:', err);
        this.isLoading = false;
      },
    });
  }

  filterRecords() {
    this.attendanceRecords = this.allAttendanceRecords.filter((rec) => {
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
        const isCompleted = rec.clockOut && rec.clockOut !== '00:00:00';
        const currentStatus = isCompleted ? 'Completed' : 'Working';
        matchesStatus = currentStatus === this.selectedStatus;
      }

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
    if (this.attendanceRecords.length > 0) {
      this.attendanceRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
  }

  private analyzeSessionStatus(records: any[]) {
    // ØªØ­Ù„ÙŠÙ„ Ø­Ø§Ù„Ø© Ø§Ù„Ø¯ÙˆØ§Ù…
    const today = new Date().toDateString();

    const openSession = records.find(
      (r) => !r.clockOut || r.clockOut === '00:00:00' || r.clockOut === null,
    );

    const todayRecord = records.find(
      (r) => new Date(r.date).toDateString() === today,
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
    // ØªØ³Ø¬ÙŠÙ„ Ø¯Ø®ÙˆÙ„
    this.isProcessing = true;
    const now = new Date();
    const dateIso = now.toISOString();
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS format

    this.attendanceService
      .clockIn({ date: dateIso, clockIn: timeString })
      .subscribe({
        next: () => {
          this.isProcessing = false;
          Swal.fire({
            icon: 'success',
            title: 'Clocked In âœ…',
            text: `Have a great day! Clocked in at ${timeString}`,
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

  // â”€â”€â”€ Clock Out â”€â”€â”€
  onClockOut() {
    this.isProcessing = true;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    // session Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ Ù†ØºÙ„Ù‚Ù‡Ø§ Ø¨Ù€ 23:59
    const isOldSession =
      this.activeSession &&
      new Date(this.activeSession.date).toDateString() !==
        new Date().toDateString();

    const clockOutTime = isOldSession ? '23:59:00' : timeString;

    this.attendanceService.clockOut({ clockOut: clockOutTime }).subscribe({
      next: () => {
        this.isProcessing = false;
        const msg = isOldSession
          ? `Previous session automatically closed at 23:59.`
          : `Great job today! Clocked out at ${clockOutTime}`;
        Swal.fire({
          icon: 'success',
          title: 'Clocked Out âœ…',
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
  // â”€â”€â”€ Export to Excel (CSV) â”€â”€â”€
  exportToExcel() {
    // ØªØµØ¯ÙŠØ± Ø§Ù„Ù…Ù„Ù
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

    const csvData = this.attendanceRecords.map((rec) => {
      const isCompleted = rec.clockOut && rec.clockOut !== '00:00:00';
      const status = isCompleted ? 'Completed' : 'Working';
      const empName = rec.employeeName || 'Emp #' + rec.employeeId;

      return [
        rec.date ? new Date(rec.date).toLocaleDateString() : '',
        empName,
        rec.employeeId || 'N/A',
        rec.clockIn || '--:--',
        rec.clockOut && rec.clockOut !== '00:00:00' ? rec.clockOut : '--:--',
        status,
        rec.totalHours || '0',
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    });

    // BOM + sep hint Ø¹Ø´Ø§Ù† Excel ÙŠÙØªØ­Ù‡ ØµØ­
    const csvContent =
      '\uFEFFsep=,\r\n' + [headers.join(','), ...csvData].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Attendance_Kawadir_${new Date().toISOString().split('T')[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported Successfully',
      text: 'Attendance data has been exported to Excel (CSV).',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\login\login.component.css

``css
.login-page {
    background: linear-gradient(135deg, #0f1b2d 0%, #1a2e45 40%, #0d2137 100%);
    position: relative;
    overflow: hidden;
}

/* â”€â”€ Ø´Ø¨ÙƒØ© Ù†Ù‚Ø§Ø· â”€â”€ */
.dot-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
    z-index: 0;
}

/* â”€â”€ Ø§Ù„Ø¯ÙˆØ§Ø¦Ø± Ø§Ù„Ø¹Ø§Ø¦Ù…Ø© â”€â”€ */
.bg-blobs {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.35;
    animation: floatBlob 12s ease-in-out infinite;
}

.blob-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #c9a84c, #8B6914);
    top: -150px; left: -150px;
    animation-duration: 14s;
}

.blob-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #1a6ea8, #0d3d6e);
    bottom: -100px; right: -100px;
    animation-duration: 11s;
    animation-delay: -4s;
}

.blob-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #8B6914, #c9a84c55);
    top: 40%; right: 15%;
    animation-duration: 16s;
    animation-delay: -7s;
}

.blob-4 {
    width: 250px; height: 250px;
    background: radial-gradient(circle, #1e5a8a, #0a2d4d);
    top: 20%; left: 30%;
    animation-duration: 13s;
    animation-delay: -2s;
}

.blob-5 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, #c9a84c44, transparent);
    bottom: 20%; left: 20%;
    animation-duration: 18s;
    animation-delay: -9s;
}

@keyframes floatBlob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -40px) scale(1.05); }
    66%       { transform: translate(-20px, 25px) scale(0.97); }
}

/* Ø§Ù„Ø¨Ø·Ø§Ù‚Ø© ØªØ·ÙÙˆ ÙÙˆÙ‚ Ø§Ù„Ø®Ù„ÙÙŠØ© */
.login-card {
    position: relative;
    z-index: 1;
}

.login-card {
    background-color: #ffffff;
    background-image: 
        radial-gradient(rgba(0, 0, 0, 0.09) 2px, transparent 2px),
        radial-gradient(circle at bottom left, rgba(255, 248, 225, 0.4) 0%, #ffffff 60%);
    background-size: 24px 24px, 100% 100%;
    background-position: 0 0, 0 0;
    border-radius: 2rem;
    width: 1200px; /* Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ø¹Ø±Ø¶ */
    max-width: 95vw;
    min-height: 700px; /* Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ø·ÙˆÙ„ Ù„ÙŠØ£Ø®Ø° Ù…Ø³Ø§Ø­Ø© Ø£Ø·ÙˆÙ„ */
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.login-form-section {
    flex: 1;
    max-width: 50%;
    z-index: 1;
}

.login-image-section {
    flex: 1;
    max-width: 50%;
}

.logo-text .badge {
    border-color: #d1d5db !important;
}

.custom-input {
    background-color: #f9fafb;
    transition: all 0.3s;
    font-size: 0.95rem;
}

.custom-input:focus {
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(255, 214, 107, 0.3) !important;
    outline: none;
}

/* Ø§Ù„Ø§ÙŠØ±ÙˆØ±Ø² */
.custom-input.is-invalid {
    border: 1.5px solid #dc3545 !important;
    background-color: #fff5f5;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.12) !important;
}

.invalid-feedback {
    display: none;
    color: #dc3545;
    font-size: 0.8rem;
}

.custom-input.is-invalid ~ .invalid-feedback,
.is-invalid + .invalid-feedback {
    display: block;
}

/* Ù…Ø´Ø§Ù† Ø§Ù„Ù€ invalid-feedback ÙŠØ´ØªØºÙ„ ØµØ­ */
div:has(.custom-input.is-invalid) .invalid-feedback {
    display: block;
}

.submit-btn {
    background-color: #fed35c;
    border: none;
    transition: all 0.3s;
    font-size: 1rem;
}

.submit-btn:hover {
    background-color: #f5c43d;
    transform: translateY(-1px);
}

.submit-btn:disabled {
    opacity: 0.7;
}

@media (max-width: 991px) {
    .login-form-section {
        max-width: 100%;
    }
    .login-card {
        height: auto;
        padding-bottom: 2rem;
        background: #ffffff;
    }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\login\login.component.html

``html
<div class="login-page d-flex align-items-center justify-content-center vh-100" dir="ltr">

    <!-- Ø®Ù„ÙÙŠØ© Ù…ØªØ­Ø±ÙƒØ© -->
    <div class="bg-blobs" aria-hidden="true">
        <span class="blob blob-1"></span>
        <span class="blob blob-2"></span>
        <span class="blob blob-3"></span>
        <span class="blob blob-4"></span>
        <span class="blob blob-5"></span>
    </div>
    <!-- Ø´Ø¨ÙƒØ© Ù†Ù‚Ø§Ø· -->
    <div class="dot-grid" aria-hidden="true"></div>

    <div class="login-card shadow-lg d-flex position-relative">

        <!-- Left Side: Form -->
        <div class="login-form-section p-5 d-flex flex-column position-relative">
            <div class="logo-text mt-2 mb-4 d-flex align-items-center">
                <div class="shadow-sm overflow-hidden d-flex align-items-center justify-content-center bg-white me-3"
                    style="width: 60px; height: 60px; border-radius: 14px; border: 1px solid #e5e7eb;">
                    <img src="kawadir-logo.png" alt="Kawadir" class="w-100 h-100 object-fit-cover">
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <span
                        style="font-size: 2rem; font-weight: 800; color: #111; letter-spacing: 0.5px; line-height: 1;">Kawadir</span>
                    <span
                        style="font-size: 0.85rem; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 6px;">HR
                        Management</span>
                </div>
            </div>

            <div class="form-content mt-4 px-lg-3">
                <div class="text-center mb-5">
                    <h3 class="fw-normal text-dark mb-2">Login to your account</h3>
                    <p class="text-muted small">Access your HR dashboard</p>
                </div>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-medium ms-3 mb-2">Email Address</label>
                        <input type="email" class="form-control rounded-pill custom-input px-4 py-3 border-0"
                            formControlName="email" placeholder="example@company.com"
                            [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                        <div class="invalid-feedback ms-3 mt-1">
                            <span *ngIf="loginForm.get('email')?.errors?.['required']">
                                <i class="bi bi-exclamation-circle me-1"></i>Email is required
                            </span>
                            <span *ngIf="loginForm.get('email')?.errors?.['email']">
                                <i class="bi bi-exclamation-circle me-1"></i>Please enter a valid email address
                            </span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label text-secondary small fw-medium ms-3 mb-2">Password</label>
                        <div class="position-relative">
                            <input [type]="isPasswordVisible ? 'text' : 'password'"
                                class="form-control rounded-pill custom-input px-4 py-3 border-0 pe-5"
                                formControlName="password" placeholder="******************"
                                [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">

                            <button
                                class="btn btn-link text-muted position-absolute end-0 top-50 translate-middle-y me-2 text-decoration-none shadow-none"
                                type="button" (click)="togglePasswordVisibility()" tabindex="-1" style="z-index: 5;">
                                <i class="bi fs-5" [ngClass]="isPasswordVisible ? 'bi-eye-slash' : 'bi-eye'"></i>
                            </button>
                        </div>
                        <div class="invalid-feedback ms-3 mt-1">
                            <span *ngIf="loginForm.get('password')?.errors?.['required']">
                                <i class="bi bi-exclamation-circle me-1"></i>Password is required
                            </span>
                            <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
                                <i class="bi bi-exclamation-circle me-1"></i>Password must be at least 6 characters
                            </span>
                        </div>
                    </div>

                    <button type="submit"
                        class="btn btn-warning w-100 rounded-pill py-3 fw-medium shadow-sm submit-btn text-dark mb-4"
                        [disabled]="isLoading">
                        @if (isLoading) {
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        }
                        Login
                    </button>
                </form>
            </div>
        </div>

        <!-- Right Side: Image -->
        <div class="login-image-section p-3 d-none d-lg-block">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team working" class="h-100 w-100 object-fit-cover rounded-4 shadow-sm"
                style="border-radius: 1.5rem !important;">
        </div>

    </div>
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\login\login.component.ts

``ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = false;
  isPasswordVisible = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  togglePasswordVisibility() {
    // Ø¥Ø¸Ù‡Ø§Ø±/Ø¥Ø®ÙØ§Ø¡ ÙƒÙ„Ù…Ø© Ø§Ù„Ø³Ø±
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    // ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials = {
      // Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¯Ø®ÙˆÙ„
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'Login Failed',
          getFriendlyErrorMessage(
            err,
            'Incorrect email or password. Please try again.',
          ),
          'error',
        );
      },
    });
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\register\register.component.css

``css

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\register\register.component.html

``html
<div class="page-container p-4">
    <!-- Page Header -->
    <div class="mb-5 text-center">
        <h2 class="fw-bold text-dark mb-2">Register New User</h2>
        <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">Create secure system credentials and assign appropriate roles for new employees.</p>
    </div>

    <div class="row justify-content-center">
        <!-- Form Column -->
        <div class="col-12 col-lg-10 col-xl-9 col-xxl-8">
            <div class="card shadow border-0 rounded-4 overflow-hidden">
                <div class="card-body p-4 p-md-5">
                    <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                        <div class="bg-primary bg-opacity-10 rounded-circle p-3 me-3 text-primary">
                            <i class="bi bi-person-plus fs-3"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold text-dark mb-1">Account Details</h5>
                            <p class="text-muted small mb-0">Please fill in the required login information</p>
                        </div>
                    </div>
                    
                    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                        
                        <div class="row g-4">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">Username <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-person"></i></span>
                                    <input type="text" class="form-control bg-light border-start-0 fs-6" formControlName="username" placeholder="e.g. johndoe">
                                </div>
                            </div>
    
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">Email Address <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-envelope"></i></span>
                                    <input type="email" class="form-control bg-light border-start-0 fs-6" formControlName="email" placeholder="john@company.com">
                                </div>
                            </div>
    
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">Password <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-key"></i></span>
                                    <input type="password" class="form-control bg-light border-start-0 fs-6" formControlName="password" placeholder="Min. 6 characters">
                                </div>
                            </div>
    
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">System Role <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-shield-lock"></i></span>
                                    <select class="form-select bg-light border-start-0 fs-6" formControlName="role">
                                        <option value="" disabled selected>Select Role...</option>
                                        @for (role of roles; track role) {
                                            <option [value]="role">{{ role }}</option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="mt-5 pt-4 border-top d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary btn-lg px-5 fw-semibold rounded-pill shadow" [disabled]="registerForm.invalid || isLoading">
                                @if (isLoading) {
                                    <span class="spinner-border spinner-border-sm me-2"></span> Creating Account...
                                } @else {
                                    <i class="bi bi-check2-circle me-2"></i> Register User
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\register\register.component.ts

``ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('', Validators.required),
  });

  roles = ['Employee', 'Admin', 'HR'];

  onSubmit() {
    // Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø¬Ø¯ÙŠØ¯
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const payload = this.registerForm.getRawValue();
    // Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªØ³Ø¬ÙŠÙ„

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        const userIdFromRes = res?.data?.id || res?.id || res?.userId;
        const userEmail = this.registerForm.get('email')?.value;

        Swal.fire({
          icon: 'success',
          title: 'ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ø³Ø§Ø¨ Ø¨Ù†Ø¬Ø§Ø­',
          text: 'Ù‡Ù„ ØªØ±ÙŠØ¯ Ø¥ÙƒÙ…Ø§Ù„ Ù…Ù„Ù Ø§Ù„Ù…ÙˆØ¸Ù Ø§Ù„Ø¢Ù†ØŸ',
          showCancelButton: true,
          confirmButtonText: 'Ù†Ø¹Ù…ØŒ Ø£ÙƒÙ…Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª',
          cancelButtonText: 'Ù„Ø§Ø­Ù‚Ø§Ù‹',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/employee-form'], {
              state: {
                userId: userIdFromRes,
                email: userEmail,
              },
            });
          } else {
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'Ø®Ø·Ø£',
          getFriendlyErrorMessage(
            err,
            'ÙØ´Ù„ Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ø³Ø§Ø¨. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.',
          ),
          'error',
        );
      },
    });
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\dashboard\dashboard.component.css

``css
.stat-card {
  border-radius: 15px;
  color: white;
  padding: 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: none;
}

.stat-card h3 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 5px;
}
.stat-card p {
  margin: 0;
  opacity: 0.8;
  font-size: 14px;
}
.stat-card .icon {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 40px;
  opacity: 0.2;
}

.pink {
  background: linear-gradient(135deg, #ff5e7e 0%, #ff99ac 100%);
}
.orange {
  background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%);
}
.blue {
  background: linear-gradient(135deg, #3498db 0%, #5dade2 100%);
}
.purple {
  background: linear-gradient(135deg, #9b59b6 0%, #af7ac5 100%);
}

.attendance-placeholder-chart {
  height: 300px;
  background-color: #fcfcfc;
  border: 2px dashed #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\dashboard\dashboard.component.html

``html
<div class="dashboard-container">



    @if (isAdmin) {
    <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary d-flex align-items-center gap-2 shadow-sm px-4" (click)="downloadSystemReport()">
            <i class="bi bi-file-earmark-arrow-down"></i>
            {{ 'Download Report' | t }}
        </button>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="stat-card pink h-100">
                <div class="card-body">
                    <h3>{{ totalEmployees }}</h3>
                    <p>{{ 'Total Employees' | t }}</p>
                    <i class="bi bi-people-fill icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card orange h-100">
                <div class="card-body">
                    <h3>{{ pendingLeaves }}</h3>
                    <p>{{ 'Pending Leaves' | t }}</p>
                    <i class="bi bi-calendar-x icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card blue h-100">
                <div class="card-body">
                    <h3>{{ departmentsCount }}</h3>
                    <p>{{ 'Departments' | t }}</p>
                    <i class="bi bi-building icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card purple h-100">
                <div class="card-body">
                    <h3>{{ totalSalaries | number }} JD</h3>
                    <p>{{ 'Salaries' | t }}</p>
                    <i class="bi bi-cash-stack icon"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-lg-8">
            <div class="chart-card card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Attendance' | t }}</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="small text-muted text-uppercase bg-light">
                                <tr>
                                    <th class="ps-4">{{ 'Employee' | t }}</th>
                                    <th>{{ 'Date' | t }}</th>
                                    <th>{{ 'Clock In' | t }}</th>
                                    <th>{{ 'Clock Out' | t }}</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                @for (att of recentAttendances; track att.id) {
                                <tr>
                                    <td class="fw-bold ps-4">{{ att.employeeName || 'Emp #' + att.employeeId }}</td>
                                    <td>{{ att.date | date:'shortDate' }}</td>
                                    <td class="text-success"><i class="bi bi-box-arrow-in-right me-1"></i>{{ att.clockIn || '--:--' }}</td>
                                    <td class="text-danger"><i class="bi bi-box-arrow-right me-1"></i>{{ (att.clockOut && att.clockOut !== '00:00:00') ? att.clockOut : '--:--' }}</td>
                                </tr>
                                } @empty {
                                <tr>
                                    <td colspan="4" class="text-center py-4 text-muted">
                                        <i class="bi bi-calendar-x fs-3 d-block mb-2 text-light-gray"></i>
                                        {{ 'No Data' | t }}
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="chart-card card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Leave Distribution' | t }}</h5>
                </div>
                <div class="card-body">
                    <div style="height: 250px; position: relative;" class="d-flex justify-content-center align-items-center">
                        <canvas id="leaveTypeChart"></canvas>
                        
                        <div *ngIf="annualLeavePercent === 0 && sickLeavePercent === 0 && emergencyLeavePercent === 0 && unpaidLeavePercent === 0" class="position-absolute text-center text-muted small">
                            {{ 'No Data' | t }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4 mt-1">
        <div class="col-md-8">
            <div class="chart-card card shadow-sm border-0 rounded-4 h-100">
                <div class="card-header bg-white p-3 border-0 pb-0 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Attendance Rate' | t }}</h5>
                    <span class="badge bg-light text-success border border-success border-opacity-25 px-2 py-1"><i class="bi bi-person-check-fill me-1"></i>{{ attendanceRate }}% {{ 'Overall' | t }}</span>
                </div>
                <div class="card-body p-3 pt-4">
                    <div style="height: 250px; position: relative; width: 100%;">
                        <canvas id="attendanceRateChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="activity-card bg-white rounded-4 shadow-sm p-4 h-100">
                <h6 class="fw-bold mb-3 text-dark">{{ 'Recent Leave Requests' | t }}</h6>
                <div class="d-flex flex-column gap-2">
                    @for (leave of recentLeaves; track leave.id) {
                    <div class="d-flex align-items-center justify-content-between py-2 px-3 rounded-3" style="background: #f8f9fa;">
                        <div class="d-flex align-items-center gap-2">
                            <div class="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; font-size: 12px;">
                                {{ (leave.employeeName || 'E').charAt(0).toUpperCase() }}
                            </div>
                            <span class="fw-semibold text-dark small text-truncate" style="max-width: 110px;">{{ leave.employeeName || 'Emp #' + leave.employeeId }}</span>
                        </div>
                        <span class="status-badge px-2 py-1" style="font-size: 11px;"
                            [ngClass]="{
                                'status-approved': leave.status === 'Approved',
                                'status-pending': leave.status === 'Pending',
                                'status-rejected': leave.status === 'Rejected'
                            }">
                            <i class="bi me-1"
                                [ngClass]="{
                                    'bi-check-circle-fill': leave.status === 'Approved',
                                    'bi-hourglass-split': leave.status === 'Pending',
                                    'bi-x-circle-fill': leave.status === 'Rejected'
                                }"></i>{{ leave.status | t }}
                        </span>
                    </div>
                    } @empty {
                    <div class="text-center text-muted py-4">
                        <i class="bi bi-calendar-x fs-3 d-block mb-2"></i>
                        {{ 'No Data' | t }}
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>


    } @else {
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="stat-card blue h-100">
                <div class="card-body">
                    <h3>{{ employeeAnnualLeaveBalance }}</h3> <p>{{ 'Annual Leave Balance' | t }}</p>
                    <i class="bi bi-airplane-fill icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card orange h-100">
                <div class="card-body">
                    <h3>{{ employeePendingLeaves }}</h3> <p>{{ 'My Pending Leaves' | t }}</p>
                    <i class="bi bi-hourglass-split icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card pink h-100">
                <div class="card-body">
                    <h3>{{ employeeHoursWorked }} <span class="fs-6 fw-normal">hrs</span></h3>
                    <p>{{ 'Total Hours' | t }}</p>
                    <i class="bi bi-clock-history icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card purple h-100">
                <div class="card-body">
                    <h3>{{ employeeNextPayday }}</h3>
                    <p>{{ 'Next Payday' | t }}</p>
                    <i class="bi bi-calendar-check icon"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-12">
            <div class="chart-card card shadow-sm border-0 rounded-4 h-100">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'My Attendance' | t }}</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="small text-muted text-uppercase bg-light">
                                <tr>
                                    <th class="ps-4">{{ 'Date' | t }}</th>
                                    <th>{{ 'Clock In' | t }}</th>
                                    <th>{{ 'Clock Out' | t }}</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                @for (att of myRecentAttendances; track att.id) {
                                <tr>
                                    <td class="ps-4 fw-bold">{{ att.date | date:'shortDate' }}</td>
                                    <td class="text-success"><i class="bi bi-box-arrow-in-right me-1"></i>{{ att.clockIn || '--:--' }}</td>
                                    <td class="text-danger"><i class="bi bi-box-arrow-right me-1"></i>{{ (att.clockOut && att.clockOut !== '00:00:00') ? att.clockOut : '--:--' }}</td>
                                </tr>
                                } @empty {
                                <tr>
                                    <td colspan="3" class="text-center py-4 text-muted">
                                        <i class="bi bi-calendar-x fs-3 d-block mb-2 text-light-gray"></i>
                                        {{ 'No Data' | t }}
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\dashboard\dashboard.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { LeaveService } from '../../core/services/leave.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { SalaryService } from '../../core/services/salary.service';
import { Chart, registerables } from 'chart.js';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
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

  totalEmployees = 0;
  pendingLeaves = 0;
  departmentsCount = 0;
  totalSalaries = 0;
  recentLeaves: any[] = [];
  recentAttendances: any[] = [];
  myRecentAttendances: any[] = [];
  allAttendances: any[] = [];
  isAdmin: boolean = false;

  annualLeavePercent: number = 0;
  sickLeavePercent: number = 0;
  emergencyLeavePercent: number = 0;
  unpaidLeavePercent: number = 0;
  attendanceRate: number = 0;

  employeeAnnualLeaveBalance: number | string = 14;
  employeePendingLeaves: number = 0;
  employeeHoursWorked: number = 0;
  employeeNextPayday: string = '';

  // ÙŠÙˆÙ… 25 Ù…Ù† ÙƒÙ„ Ø´Ù‡Ø±
  readonly PAYDAY = 25;

  leaveChartInstance: any;

  downloadSystemReport() {
    Swal.fire(
      'Notice',
      'Report generation is not fully implemented yet.',
      'info',
    );
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();

    if (this.isAdmin) {
      this.loadAdminStats();
    } else {
      this.loadEmployeeStats();
    }
  }

  loadAdminStats() {
    // ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø£Ø¯Ù…Ù†
    this.empService.getEmployees().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.totalEmployees = extracted.length;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching employees:', err),
    });

    this.leaveService.getAllLeaves().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.pendingLeaves = extracted.filter(
          // Ø§Ù„Ù€ backend Ø¨ÙŠØ±Ø¬Ø¹ string Ù…Ø´ Ø±Ù‚Ù…
          (l: any) => l.status === 'Pending',
        ).length;

        extracted.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
        this.recentLeaves = extracted.slice(0, 5);

        const totalLeaves = extracted.length;
        let annual = 0,
          sick = 0,
          emergency = 0,
          unpaid = 0;

        if (totalLeaves > 0) {
          // ÙƒÙ„Ù‡Ø§ strings Ù…Ù† Ø§Ù„Ù€ backend
          annual = extracted.filter(
            (l: any) => l.leaveType === 'Annual',
          ).length;
          sick = extracted.filter((l: any) => l.leaveType === 'Sick').length;
          emergency = extracted.filter(
            (l: any) => l.leaveType === 'Emergency',
          ).length;
          unpaid = extracted.filter(
            (l: any) => l.leaveType === 'Unpaid',
          ).length;

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
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.departmentsCount = extracted.length;
      },
      error: (err) => console.error('Error fetching departments:', err),
    });

    this.salaryService.getAllSalaries().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.totalSalaries = extracted.reduce(
          (sum, current) => sum + (current.netAmount || 0),
          0,
        );
      },
      error: (err) => console.error('Error fetching salaries:', err),
    });

    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        extracted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.recentAttendances = extracted.slice(0, 5);
        this.allAttendances = extracted;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching attendance overview:', err),
    });
  }

  calculateAttendanceRate() {
    // Ù†Ø­Ø³Ø¨ Ù†Ø³Ø¨Ø© Ø§Ù„Ø­Ø¶ÙˆØ±
    if (this.totalEmployees === 0 || this.allAttendances.length === 0) return;
    const validAtt = this.allAttendances.filter((a) => a.date && a.clockIn);
    const uniqueDays = new Set(validAtt.map((a) => a.date.split('T')[0])).size;
    if (uniqueDays > 0) {
      const totalExpected = uniqueDays * this.totalEmployees;
      this.attendanceRate = Math.round((validAtt.length / totalExpected) * 100);
      if (this.attendanceRate > 100) this.attendanceRate = 100;
    }
  }

  loadNextPayday() {
    // Ù†Ø­Ø³Ø¨ Ù…ÙˆØ¹Ø¯ Ø§Ù„Ø±Ø§ØªØ¨ Ø§Ù„Ù‚Ø§Ø¯Ù…
    this.salaryService.getMySalaries().subscribe({
      next: (salaries: any[]) => {
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
      error: () => {},
    });
  }

  loadEmployeeStats() {
    // ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ÙˆØ¸Ù
    console.log('Loading Employee Dashboard...');

    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'short' });
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    ).toLocaleString('en-US', { month: 'short' });

    // Ù‚ÙŠÙ…Ø© Ù…Ø¤Ù‚ØªØ© ØªØ¸Ù‡Ø± ÙÙˆØ±Ø§Ù‹ØŒ ØªØªØ­Ø¯Ø« Ù„Ù…Ø§ ÙŠØ±Ø¬Ø¹ Ø§Ù„Ù€ API
    if (today.getDate() > this.PAYDAY) {
      this.employeeNextPayday = `${nextMonth} ${this.PAYDAY}`;
    } else {
      this.employeeNextPayday = `${currentMonth} ${this.PAYDAY}`;
    }

    // Ù†Ø¬ÙŠØ¨ Ø§Ù„ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¯Ù‚ÙŠÙ‚ Ù…Ù† Ø¢Ø®Ø± Ø±Ø§ØªØ¨
    this.loadNextPayday();

    this.leaveService.getMyLeaves().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        // backend ÙŠØ±Ø¬Ø¹ strings Ù…Ø´ Ø£Ø±Ù‚Ø§Ù…
        this.employeePendingLeaves = extracted.filter(
          (l: any) => l.status === 'Pending',
        ).length;

        const approvedAnnualLeavesDays = extracted
          .filter(
            (l: any) => l.status === 'Approved' && l.leaveType === 'Annual',
          )
          .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);

        this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
      },
      error: (err) => console.error('Error fetching my leaves:', err),
    });

    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        const currentMonthNum = today.getMonth();
        const currentYear = today.getFullYear();

        let totalHours = 0;
        extracted.forEach((att: any) => {
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

        extracted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.myRecentAttendances = extracted.slice(0, 5);

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
    // Ø±Ø³Ù… ØªØ´Ø§Ø±Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª
    const ctx = document.getElementById('leaveTypeChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.leaveChartInstance) {
      this.leaveChartInstance.destroy();
    }

    // Ù„Ùˆ Ù…Ø§ÙÙŠ Ø¯Ø§ØªØ§ Ù†Ø¹Ø±Ø¶ Ø¯Ø§Ø¦Ø±Ø© ÙØ§Ø¶ÙŠØ©
    if (annual === 0 && sick === 0 && emergency === 0 && unpaid === 0) {
      this.leaveChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['No Data'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['#e9ecef'],
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
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\departments\departments.component.css

``css

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\departments\departments.component.html

``html
<div class="page-container p-4">

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                <i class="bi bi-diagram-3-fill me-2 text-primary"></i>{{ 'Departments' | t }}
            </h3>
            <p class="text-muted small mb-0">{{ 'Manage organizational departments and view their employee structures' | t }}</p>
        </div>
        <button class="btn btn-primary shadow-sm text-nowrap px-4 py-2 rounded-3 fw-semibold" (click)="openAddModal()">
            <i class="bi bi-plus-lg me-1"></i> {{ 'Add Department' | t }}
        </button>
    </div>

    @if (isLoading) {
    <div class="text-center my-5 py-5">
        <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;"></div>
        <p class="text-muted fw-medium fs-5">Fetching departments data...</p>
    </div>
    } @else {
    <div class="row g-4">
        @for (dept of departmentsList; track dept.id) {
        <div class="col-md-6 col-xl-4 col-xxl-3">
            <div class="card border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative transition-hover" style="transition: transform 0.2s, box-shadow 0.2s;">
                <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                            <i class="bi bi-buildings fs-4"></i>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-light btn-sm rounded-circle shadow-none text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 32px; height: 32px;">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3">
                                <li><a class="dropdown-item py-2 fw-medium text-dark" href="javascript:void(0)" (click)="openEditModal(dept)"><i class="bi bi-pencil-square text-primary me-2"></i>{{ 'Edit' | t }}</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item py-2 fw-medium text-danger" href="javascript:void(0)" (click)="deleteDepartment(dept.id)"><i class="bi bi-trash3 me-2"></i>{{ 'Delete' | t }}</a></li>
                            </ul>
                        </div>
                    </div>
                    <h5 class="card-title fw-bold text-dark mb-1 text-truncate" [title]="dept.name">{{ dept.name }}</h5>
                    <p class="text-muted small mb-0 fw-medium">{{ 'ID' | t }}: #{{ dept.id }}</p>
                </div>
                <div class="card-body px-4 pb-4 pt-3 mt-1">
                    <div class="d-flex justify-content-between align-items-center bg-light rounded-3 p-3">
                        <div class="text-center flex-fill">
                            <h5 class="fw-bold text-primary mb-0">{{ getDeptStat(dept.id, 'employees') }}</h5>
                            <small class="text-muted fw-semibold" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">{{ 'Employees' | t }}</small>
                        </div>
                        <div style="width: 1px; height: 35px; background-color: #dee2e6;"></div>
                        <div class="text-center flex-fill">
                            <h5 class="fw-bold text-dark mb-0">{{ getDeptStat(dept.id, 'positions') }}</h5>
                            <small class="text-muted fw-semibold" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">{{ 'Positions' | t }}</small>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white border-top-0 px-4 pb-4 pt-0">
                    <button class="btn btn-outline-primary w-100 rounded-3 fw-semibold shadow-sm py-2 d-flex align-items-center justify-content-center" (click)="viewDetails(dept)">
                        <i class="bi bi-eye me-2 fs-5"></i> View Details & Staff
                    </button>
                </div>
            </div>
        </div>
        } @empty {
        <div class="col-12 text-center my-5 py-5">
            <div class="bg-light rounded-circle d-inline-flex justify-content-center align-items-center mb-4" style="width: 100px; height: 100px;">
                <i class="bi bi-diagram-2 text-secondary" style="font-size: 40px;"></i>
            </div>
            <h4 class="fw-bold text-dark mb-2">{{ 'No Data' | t }}</h4>
            <p class="text-muted">There are no departments created in the system yet.</p>
            <button class="btn btn-primary mt-2 px-4 rounded-3" (click)="openAddModal()"><i class="bi bi-plus-lg me-1"></i> Add Your First Department</button>
        </div>
        }
    </div>
    }
</div>

<div class="modal fade" id="deptDetailsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="modal-header border-bottom-0 bg-white pt-4 pb-2 px-4">
                <h4 class="modal-title fw-bold text-dark d-flex align-items-center">
                    <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <i class="bi bi-building fs-5"></i>
                    </div>
                    {{ selectedDepartment?.name }} Department
                </h4>
                <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0 bg-light">
                @if (selectedDepartment) {
                <div class="row g-0">
                    <!-- Left Column: Overview Stats -->
                    <div class="col-lg-4 border-end bg-white">
                        <div class="p-4 h-100">
                            <h6 class="fw-bold text-dark mb-4 text-uppercase" style="letter-spacing: 0.5px; font-size: 13px;">Department Overview</h6>
                            
                            <div class="d-flex align-items-center mb-4 p-3 bg-light rounded-4 border">
                                <div class="bg-primary text-white rounded-3 d-flex justify-content-center align-items-center me-3" style="width: 48px; height: 48px;">
                                    <i class="bi bi-people-fill fs-5"></i>
                                </div>
                                <div>
                                    <p class="text-muted small mb-0 fw-semibold">Total Employees</p>
                                    <h3 class="fw-bold text-primary mb-0">{{ selectedDepartment.stats?.totalEmployees || 0 }}</h3>
                                </div>
                            </div>

                            <div class="d-flex align-items-center mb-4 p-3 bg-light rounded-4 border">
                                <div class="bg-secondary text-white rounded-3 d-flex justify-content-center align-items-center me-3" style="width: 48px; height: 48px;">
                                    <i class="bi bi-diagram-3-fill fs-5"></i>
                                </div>
                                <div>
                                    <p class="text-muted small mb-0 fw-semibold">Total Positions</p>
                                    <h3 class="fw-bold text-secondary mb-0">{{ selectedDepartment.totalPositions || 0 }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: Employees Table -->
                    <div class="col-lg-8 bg-light">
                        <div class="p-4 h-100 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                                <h6 class="fw-bold text-dark mb-0 text-uppercase" style="letter-spacing: 0.5px; font-size: 13px;">Employees Directory</h6>
                                
                                <div class="d-flex gap-2">
                                    <div class="input-group input-group-sm shadow-sm" style="max-width: 200px;">
                                        <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                                        <input type="text" class="form-control border-start-0 ps-0" placeholder="Search by name or ID..." [(ngModel)]="searchEmpQuery" (input)="filterDeptEmployees()">
                                    </div>
                                    <select class="form-select form-select-sm shadow-sm w-auto fw-medium text-secondary" [(ngModel)]="selectedPositionFilter" (change)="filterDeptEmployees()">
                                        <option value="">All Positions</option>
                                        <option *ngFor="let p of uniquePositions" [value]="p">{{ p }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="card border-0 shadow-sm rounded-4 flex-grow-1 overflow-hidden">
                                <div class="table-responsive h-100" style="max-height: 500px;">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light sticky-top" style="z-index: 1;">
                                            <tr>
                                                <th class="py-3 px-4 text-muted small text-uppercase fw-semibold" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">ID</th>
                                                <th class="py-3 px-3 text-muted small text-uppercase fw-semibold" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Employee Name</th>
                                                <th class="py-3 px-3 text-muted small text-uppercase fw-semibold" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Position</th>
                                                <th class="py-3 px-4 text-muted small text-uppercase fw-semibold text-center" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="border-top-0">
                                            <tr *ngFor="let emp of filteredDeptEmployees">
                                                <td class="py-3 px-4 fw-bold text-secondary">#{{ emp.id }}</td>
                                                <td class="py-3 px-3 fw-bold text-dark">
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-3 rounded-circle d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; font-size: 13px;">
                                                            {{ emp.firstName?.charAt(0) || 'U' }}
                                                        </div>
                                                        {{ emp.firstName }} {{ emp.lastName }}
                                                    </div>
                                                </td>
                                                <td class="py-3 px-3 text-muted fw-medium">{{ emp.positionName || 'N/A' }}</td>
                                                <td class="py-3 px-4 text-center">
                                                    <span class="badge rounded-pill px-3 py-2 fw-semibold" [ngClass]="emp.isActive ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-25' : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25'">
                                                        {{ emp.isActive ? 'Active' : 'Inactive' }}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr *ngIf="filteredDeptEmployees.length === 0">
                                                <td colspan="4" class="text-center py-5">
                                                    <div class="text-muted d-flex flex-column align-items-center">
                                                        <i class="bi bi-search fs-1 mb-3 text-black-50"></i>
                                                        <span class="fw-medium fs-6">No employees found.</span>
                                                        <small>Try adjusting your search or filter criteria.</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div class="modal-footer bg-white border-top pt-3 pb-3 px-4">
                <button type="button" class="btn btn-secondary px-5 py-2 rounded-3 fw-semibold shadow-sm" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="addDeptModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">

            <div
                class="modal-header border-bottom border-success border-4 bg-light">
                <h5 class="modal-title text-success fw-bold">
                    <i class="bi" [class.bi-plus-circle]="!isEditMode" [class.bi-pencil-square]="isEditMode"></i> 
                    {{ isEditMode ? ('Edit' | t) : ('Add Department' | t) }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form [formGroup]="addForm" (ngSubmit)="saveDepartment()">
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label
                            class="form-label fw-bold text-secondary">{{ 'Department Name' | t }} <span class="text-danger">*</span></label>
                        <input type="text" class="form-control"
                            formControlName="name"
                            placeholder="e.g., Marketing, Sales..."
                            [class.is-invalid]="addForm.get('name')?.invalid && addForm.get('name')?.touched">
                        @if (addForm.get('name')?.invalid &&
                        addForm.get('name')?.touched) {
                        <div class="invalid-feedback">
                            Department name is required.
                        </div>
                        }
                    </div>
                </div>

                <div class="modal-footer bg-light border-top-0">
                    <button type="button" class="btn btn-light px-4 border"
                        data-bs-dismiss="modal"
                        [disabled]="isSubmitting">{{ 'Cancel' | t }}</button>
                    <button type="submit" class="btn btn-success px-4"
                        [disabled]="addForm.invalid || isSubmitting">
                        @if (isSubmitting) {
                        <span class="spinner-border spinner-border-sm me-2"
                            role="status" aria-hidden="true"></span>Saving...
                        } @else {
                        <i class="bi bi-save me-1"></i> {{ 'Save Changes' | t }}
                        }
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\departments\departments.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { DepartmentService } from '../../core/services/department.service';
import { EmployeeService } from '../../core/services/employee.service';
import { PositionService } from '../../core/services/position.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

declare var bootstrap: any;

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  private positionService = inject(PositionService);

  allPositions: any[] = []; // lookup: positionId -> title

  departmentsList: any[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  currentDepartmentId: number | null = null;

  selectedDepartment: any = null;
  private detailsModal: any;
  private addModalInstance: any;

  allEmployees: any[] = [];
  departmentStats: any = {}; // id -> { totalEmployees: 0, positions: { posName: count } }

  deptEmployees: any[] = [];
  filteredDeptEmployees: any[] = [];
  searchEmpQuery: string = '';
  selectedPositionFilter: string = '';
  uniquePositions: string[] = [];

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  ngOnInit() {
    this.loadPositionsThenEmployees();
    this.loadDepartments();
  }

  loadPositionsThenEmployees() {
    // Ø¬Ù„Ø¨ Ø§Ù„Ù€ positions Ø£ÙˆÙ„Ø§Ù‹ Ø«Ù… Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ù„Ø¹Ù…Ù„ join ØµØ­ÙŠØ­
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        this.allPositions = Array.isArray(res) ? res : res?.data || [];
        this.loadEmployees();
      },
      error: () => this.loadEmployees(), // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø­ØªÙ‰ Ù„Ùˆ ÙØ´Ù„ Ø¬Ù„Ø¨ Ø§Ù„Ù€ positions
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extracted: any[] = Array.isArray(res)
          ? res
          : res?.data?.items || res?.data || [];
        // Ø±Ø¨Ø· Ø§Ø³Ù… Ø§Ù„Ù€ position Ø¨ÙƒÙ„ Ù…ÙˆØ¸Ù
        this.allEmployees = extracted.map((emp) => {
          if (!emp.positionName && emp.positionId) {
            const pos = this.allPositions.find((p) => p.id === emp.positionId);
            return { ...emp, positionName: pos?.title || null };
          }
          return emp;
        });
        this.calculateStats();
      },
    });
  }

  calculateStats() {
    this.departmentStats = {};
    for (const emp of this.allEmployees) {
      const deptId = emp.departmentId;
      if (!deptId) continue;

      if (!this.departmentStats[deptId]) {
        this.departmentStats[deptId] = { totalEmployees: 0, positions: {} };
      }

      this.departmentStats[deptId].totalEmployees++;
      const posName = emp.positionName; // Ù†ØªØ¬Ø§Ù‡Ù„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø§Ù„Ø°ÙŠÙ† Ù„ÙŠØ³ Ù„Ø¯ÙŠÙ‡Ù… position
      if (!posName) continue; // Ù„Ø§ Ù†ÙØ¯Ø±Ø¬Ù‡Ù… ÙÙŠ Ø§Ù„Ù€ Positions Breakdown
      if (!this.departmentStats[deptId].positions[posName]) {
        this.departmentStats[deptId].positions[posName] = 0;
      }
      this.departmentStats[deptId].positions[posName]++;
    }
  }

  getDeptStat(deptId: number, type: 'employees' | 'positions'): number {
    if (type === 'employees') {
      const stat = this.departmentStats[deptId];
      return stat ? stat.totalEmployees : 0;
    }
    if (type === 'positions') {
      // Ø§Ù„Ø¹Ø¯Ù‘ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ù…Ù† Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù€ positions Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø§Ù„Ù‚Ø³Ù…
      return this.allPositions.filter((p) => p.departmentId === deptId).length;
    }
    return 0;
  }

  loadDepartments() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.$values) extracted = res.$values;

        this.departmentsList = extracted;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.isLoading = false;
      },
    });
  }

  viewDetails(dept: any) {
    // ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù‚Ø³Ù…
    this.selectedDepartment = dept;
    const stats = this.departmentStats[dept.id] || { totalEmployees: 0 };
    this.selectedDepartment.stats = stats;
    // Ø§Ù„Ù€ positions Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ© Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ù‡Ø°Ø§ Ø§Ù„Ù‚Ø³Ù… Ù…Ù† Ø§Ù„Ù€ API
    const deptPositions = this.allPositions.filter(
      (p) => p.departmentId === dept.id,
    );
    this.selectedDepartment.totalPositions = deptPositions.length;

    // Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø¯Ø§Ø®Ù„ Ø§Ù„Ù€ modal â€” Ù…Ø¹ Ø±Ø¨Ø· Ø§Ù„Ù€ position
    this.deptEmployees = this.allEmployees
      .filter((e) => e.departmentId === dept.id)
      .map((emp) => {
        if (!emp.positionName && emp.positionId) {
          const pos = this.allPositions.find((p) => p.id === emp.positionId);
          return { ...emp, positionName: pos?.title || null };
        }
        return emp;
      });
    this.filteredDeptEmployees = [...this.deptEmployees];
    // Ø¨Ù†Ø§Ø¡ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù€ positions Ù…Ù† Ø§Ù„Ù€ API Ù…Ø¨Ø§Ø´Ø±Ø©Ù‹ ÙˆÙ„ÙŠØ³ Ù…Ù† Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†
    this.uniquePositions = deptPositions.map((p) => p.title).filter(Boolean);
    this.searchEmpQuery = '';
    this.selectedPositionFilter = '';

    setTimeout(() => {
      const modalElement = document.getElementById('deptDetailsModal');
      if (modalElement) {
        this.detailsModal = new bootstrap.Modal(modalElement);
        this.detailsModal.show();
      }
    }, 0);
  }

  filterDeptEmployees() {
    // ÙÙ„ØªØ±Ø© Ù…ÙˆØ¸ÙÙŠÙ† Ø§Ù„Ù‚Ø³Ù…
    this.filteredDeptEmployees = this.deptEmployees.filter((emp) => {
      let matchesSearch = true;
      if (this.searchEmpQuery) {
        const query = this.searchEmpQuery.toLowerCase();
        const fullName =
          `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        matchesSearch = fullName.includes(query) || idStr.includes(query);
      }

      let matchesPos = true;
      if (this.selectedPositionFilter) {
        // Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ positionName Ø£Ùˆ Ø¹Ù† Ø·Ø±ÙŠÙ‚ positionId
        const pos = this.allPositions.find(
          (p) => p.title === this.selectedPositionFilter,
        );
        if (pos) {
          matchesPos = emp.positionId === pos.id;
        } else {
          matchesPos = emp.positionName === this.selectedPositionFilter;
        }
      }

      return matchesSearch && matchesPos;
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentDepartmentId = null;
    this.addForm.reset();
    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  openEditModal(dept: any) {
    this.isEditMode = true;
    this.currentDepartmentId = dept.id;
    this.addForm.patchValue({ name: dept.name });

    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  saveDepartment() {
    // Ø­ÙØ¸ Ø§Ù„Ù‚Ø³Ù…
    if (this.addForm.invalid) {
      Swal.fire('Warning', 'Please enter a valid department name.', 'warning');
      return;
    }

    this.isSubmitting = true;
    const payload = this.addForm.getRawValue();

    if (this.isEditMode && this.currentDepartmentId) {
      this.departmentService
        .updateDepartment(this.currentDepartmentId, payload)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.addModalInstance.hide();
            Swal.fire('Success', 'Department updated successfully!', 'success');
            this.loadDepartments();
          },
          error: (err) => {
            this.isSubmitting = false;
            Swal.fire(
              'Error',
              getFriendlyErrorMessage(
                err,
                'Failed to update department. Please try again.',
              ),
              'error',
            );
          },
        });
    } else {
      this.departmentService.addDepartment(payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.addModalInstance.hide();
          Swal.fire('Success', 'Department added successfully!', 'success');
          this.loadDepartments();
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire(
            'Error',
            getFriendlyErrorMessage(
              err,
              'Failed to add department. Please try again.',
            ),
            'error',
          );
        },
      });
    }
  }

  deleteDepartment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This department and all associated data might be affected. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.deleteDepartment(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Department has been deleted.', 'success');
            this.loadDepartments();
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire(
              'Error!',
              getFriendlyErrorMessage(
                err,
                'Failed to delete department. It may have employees assigned to it.',
              ),
              'error',
            );
          },
        });
      }
    });
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employee-form\employee-form.component.css

``css
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PAGE WRAPPER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-page-wrapper {
  min-height: 100vh;
  padding: 2rem 1rem 3rem;
  background: #f5f7fb;
}

.form-container {
  max-width: 820px;
  margin: 0 auto;
  animation: slideUp 0.5s ease-out;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HEADER CARD
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-header-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #e8ecf0;
}

.header-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon-wrap.edit-mode {
  background: linear-gradient(135deg, #f72585, #b5179e);
}

.header-icon-wrap i {
  color: #fff;
  font-size: 1.4rem;
}

.form-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1d27;
}

.form-subtitle {
  font-size: 0.85rem;
  color: #8592a3;
  margin-top: 2px;
}

.btn-back {
  padding: 0.45rem 1.2rem;
  border-radius: 30px;
  background: #f0f2f5;
  color: #5a6479;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid #e2e6ea;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-back:hover {
  background: #e2e6ea;
  color: #333;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   LINKED USER BANNER (Add mode â€” after selecting user)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.linked-user-banner {
  background: linear-gradient(135deg, #d1fae5, #ecfdf5);
  border: 1px solid #6ee7b7;
  border-radius: 14px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideUp 0.3s ease;
}

.linked-user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #059669;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.linked-user-avatar i {
  color: #fff;
  font-size: 1.2rem;
}

.linked-user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.linked-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #065f46;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.linked-email {
  font-size: 0.95rem;
  font-weight: 600;
  color: #047857;
}

.linked-check i {
  color: #059669;
  font-size: 1.5rem;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   LINKED ACCOUNT CARD (Edit mode)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.linked-account-card {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 1px solid #93c5fd;
  border-radius: 14px;
  padding: 1.1rem 1.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideUp 0.3s ease;
}

.lac-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lac-icon i {
  color: #fff;
  font-size: 1.3rem;
}

.lac-body {
  flex: 1;
}

.lac-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.lac-detail {
  font-size: 0.88rem;
  color: #1e3a8a;
  font-weight: 500;
  line-height: 1.5;
}

.lac-badge {
  background: #1d4ed8;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.9rem;
  border-radius: 30px;
  flex-shrink: 0;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FORM SECTIONS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-section {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid #e8ecf0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 2px solid #f0f2f5;
}

.section-header i {
  font-size: 1rem;
  color: #4361ee;
  background: #eef0fd;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-header span:not(.required-badge) {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1d27;
  flex: 1;
}

.required-badge {
  font-size: 0.7rem;
  font-weight: 700;
  background: #fff0f3;
  color: #e63757;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  border: 1px solid #fecdd3;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FIELD STYLES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.field-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.45rem;
}

.field-input {
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  color: #1a202c;
  transition: all 0.2s ease;
  width: 100%;
}

.field-input:focus {
  border-color: #4361ee;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.12);
  outline: none;
}

.field-input.is-invalid {
  border-color: #e63757;
  background: #fff5f7;
}

.field-input.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(230, 55, 87, 0.12);
}

.field-hint {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: #8592a3;
  line-height: 1.4;
}

/* Readonly field */
.readonly-field-wrap {
  position: relative;
}

.readonly-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8592a3;
  font-size: 0.85rem;
  z-index: 1;
}

.readonly-field {
  padding-left: 2.2rem;
  background: #f0f2f5 !important;
  color: #718096;
  cursor: default;
  border-color: #e2e8f0 !important;
}

.readonly-field:focus {
  box-shadow: none !important;
  border-color: #e2e8f0 !important;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FORM ACTIONS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.85rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  padding: 0.65rem 1.5rem;
  border-radius: 10px;
  background: #f0f2f5;
  color: #5a6479;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid #e2e6ea;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #e2e6ea;
  color: #333;
}

.btn-submit {
  padding: 0.7rem 2rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  border: none;
  transition: all 0.25s;
  box-shadow: 0 4px 14px rgba(67,97,238,0.35);
  min-width: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(67,97,238,0.45);
}

.btn-submit:disabled {
  background: #a0aec0;
  box-shadow: none;
  cursor: not-allowed;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SKELETON LOADING
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-body-card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #e8ecf0;
  margin-bottom: 1.25rem;
}

.skeleton-wrap {
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line {
  height: 20px;
  background: #e2e8f0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.skeleton-line.w-40 { width: 40%; }

.skeleton-input {
  height: 42px;
  background: #e2e8f0;
  border-radius: 10px;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ANIMATIONS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   RESPONSIVE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
@media (max-width: 576px) {
  .form-header-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .form-actions { flex-direction: column-reverse; }
  .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DARK MODE OVERRIDES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
:host-context(body.dark-mode) .form-page-wrapper {
  background: var(--color-bg);
}

:host-context(body.dark-mode) .form-header-card,
:host-context(body.dark-mode) .form-section,
:host-context(body.dark-mode) .form-body-card {
  background: var(--color-surface) !important;
  border-color: var(--color-border) !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .form-title {
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .form-subtitle {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .section-header {
  border-bottom-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .section-header span:not(.required-badge) {
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .section-header i {
  background: rgba(67, 97, 238, 0.15) !important;
  color: #7b8ef7 !important;
}

:host-context(body.dark-mode) .field-label {
  color: var(--color-text-sub) !important;
}

:host-context(body.dark-mode) .field-label i {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .field-input {
  background: var(--color-input-bg) !important;
  border-color: #444 !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .field-input::placeholder {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .field-input:focus {
  background: var(--color-surface-3) !important;
  border-color: #667eea !important;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2) !important;
}

:host-context(body.dark-mode) .readonly-field {
  background: var(--color-surface-2) !important;
  color: var(--color-text-muted) !important;
  border-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .readonly-icon {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .field-hint {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .lac-title {
  color: #93c5fd !important;
}

:host-context(body.dark-mode) .lac-detail {
  color: #bfdbfe !important;
}

:host-context(body.dark-mode) .linked-account-card {
  background: linear-gradient(135deg, #1e2a45, #1a2d55) !important;
  border-color: #2d4a7a !important;
}

:host-context(body.dark-mode) .linked-label {
  color: #6ee7b7 !important;
}

:host-context(body.dark-mode) .linked-email {
  color: #a7f3d0 !important;
}

:host-context(body.dark-mode) .linked-user-banner {
  background: linear-gradient(135deg, #1a3a2a, #1e3d2e) !important;
  border-color: #2d6a4f !important;
}

:host-context(body.dark-mode) .btn-back {
  background: var(--color-surface-2) !important;
  color: var(--color-text-sub) !important;
  border-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .btn-back:hover {
  background: var(--color-surface-3) !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .btn-cancel {
  background: var(--color-surface-2) !important;
  color: var(--color-text-sub) !important;
  border-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .btn-cancel:hover {
  background: var(--color-surface-3) !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .skeleton-line,
:host-context(body.dark-mode) .skeleton-input {
  background: var(--color-surface-3) !important;
}
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employee-form\employee-form.component.html

``html
<div class="form-page-wrapper">
  <div class="form-container">

    <!-- â•â•â• HEADER CARD â•â•â• -->
    <div class="form-header-card">
      <div class="d-flex align-items-center gap-3">
        <div class="header-icon-wrap" [class.edit-mode]="isEditMode">
          <i class="bi" [class.bi-person-plus-fill]="!isEditMode" [class.bi-pencil-square]="isEditMode"></i>
        </div>
        <div>
          <h2 class="form-title mb-0">{{ isEditMode ? 'Edit Employee Profile' : 'Add New Employee' }}</h2>
          <p class="form-subtitle mb-0">
            {{ isEditMode ? 'Update employee information and employment details' : 'Link a registered user to a new
            employee profile' }}
          </p>
        </div>
      </div>
      <a routerLink="/employees" class="btn-back">
        <i class="bi bi-arrow-left me-1"></i> Back
      </a>
    </div>

    <!-- â•â•â• LOADING SKELETON â•â•â• -->
    @if (isLoading && isEditMode) {
    <div class="form-body-card">
      <div class="skeleton-wrap">
        <div class="skeleton-line w-40"></div>
        <div class="row g-3 mt-2">
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
        </div>
      </div>
    </div>
    }

    @if (!isLoading || !isEditMode) {
    <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">

      <!-- â•â•â• ADD MODE: Linked User Banner â•â•â• -->
      @if (!isEditMode && employeeForm.get('userId')?.value) {
      <div class="linked-user-banner">
        <div class="linked-user-avatar">
          <i class="bi bi-person-fill"></i>
        </div>
        <div class="linked-user-info">
          <span class="linked-label">Linked Account</span>
          <span class="linked-email">{{ displayEmail }}</span>
        </div>
        <div class="linked-check">
          <i class="bi bi-check-circle-fill"></i>
        </div>
      </div>
      }

      <!-- â•â•â• EDIT MODE: Linked Account Info Card â•â•â• -->
      @if (isEditMode && linkedUserInfo) {
      <div class="linked-account-card">
        <div class="lac-icon">
          <i class="bi bi-person-badge-fill"></i>
        </div>
        <div class="lac-body">
          <div class="lac-title">Linked User Account</div>
          <div class="lac-detail">
            <i class="bi bi-person me-1 text-muted"></i>{{ linkedUserInfo.username }}
          </div>
          <div class="lac-detail">
            <i class="bi bi-envelope me-1 text-muted"></i>{{ linkedUserInfo.email }}
          </div>
        </div>
        <span class="lac-badge">{{ linkedUserInfo.role }}</span>
      </div>
      }

      <!-- â•â•â• SECTION: Link User (Add mode only) â•â•â• -->
      @if (!isEditMode) {
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-link-45deg"></i>
          <span>Link User Account</span>
          <span class="required-badge">Required</span>
        </div>
        <div class="row g-3">
          <div class="col-12">
            <label class="field-label">
              <i class="bi bi-person-lock text-primary"></i>
              Select Registered User <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="userId"
              [class.is-invalid]="employeeForm.get('userId')?.invalid && employeeForm.get('userId')?.touched">
              <option value="" disabled selected>
                {{ unassignedUsers.length === 0 ? 'No unlinked Employee accounts found...' : 'Choose a registered
                user...' }}
              </option>
              @for (user of unassignedUsers; track user.id) {
              <option [value]="user.id">{{ user.username }} â€” {{ user.email }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a user account to link.</div>
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              Only Employee accounts that are not yet linked to a profile are shown.
              Email will be auto-filled from the selected account.
            </small>
          </div>

          <!-- Ø§Ù„Ø§ÙŠÙ…ÙŠÙ„ Ù…Ø³ÙƒØ±ØŒ Ø¨ÙŠØªØ¹Ø¨Ù‰ Ù„Ø­Ø§Ù„Ù‡ -->
          <div class="col-12">
            <label class="field-label">
              <i class="bi bi-envelope text-primary"></i>
              Email Address
            </label>
            <div class="readonly-field-wrap">
              <i class="bi bi-envelope-fill readonly-icon"></i>
              <input type="email" class="form-control field-input readonly-field" formControlName="email"
                placeholder="Auto-filled when you select a user above" readonly>
            </div>
            <small class="field-hint">
              <i class="bi bi-magic me-1"></i>
              This field is auto-filled when you select a user from the dropdown above.
            </small>
          </div>
        </div>
      </div>
      }

      <!-- â•â•â• SECTION: Personal Information â•â•â• -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-person-vcard"></i>
          <span>Personal Information</span>
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-person text-primary"></i>
              First Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="firstName" placeholder="e.g. Mohammad"
              [class.is-invalid]="employeeForm.get('firstName')?.invalid && employeeForm.get('firstName')?.touched">
            <div class="invalid-feedback">First name is required.</div>
          </div>
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-person text-primary"></i>
              Last Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="lastName" placeholder="e.g. Al-Ahmad"
              [class.is-invalid]="employeeForm.get('lastName')?.invalid && employeeForm.get('lastName')?.touched">
            <div class="invalid-feedback">Last name is required.</div>
          </div>
        </div>
      </div>

      <!-- â•â•â• SECTION: Contact Details â•â•â• -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-telephone-fill"></i>
          <span>Contact Details</span>
        </div>
        <div class="row g-3">
          <!-- Ø§Ù„Ø§ÙŠÙ…ÙŠÙ„ Ø¨Ø³ ÙŠÙ†Ø¹Ø±Ø¶ -->
          @if (isEditMode) {
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-envelope text-primary"></i>
              Email Address
            </label>
            <div class="readonly-field-wrap">
              <i class="bi bi-envelope-fill readonly-icon"></i>
              <input type="email" class="form-control field-input readonly-field" formControlName="email" readonly>
            </div>
            <small class="field-hint">
              <i class="bi bi-lock-fill me-1"></i>Email is linked to the user account and cannot be changed here.
            </small>
          </div>
          }
          <div [class]="isEditMode ? 'col-md-6' : 'col-12'">
            <label class="field-label">
              <i class="bi bi-telephone text-primary"></i>
              Phone Number <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="phoneNumber" placeholder="0791234567"
              maxlength="10" inputmode="numeric"
              [class.is-invalid]="employeeForm.get('phoneNumber')?.invalid && employeeForm.get('phoneNumber')?.touched">
            @if (employeeForm.get('phoneNumber')?.touched) {
            @if (employeeForm.get('phoneNumber')?.errors?.['required']) {
            <div class="invalid-feedback d-block">
              <i class="bi bi-exclamation-circle me-1"></i>Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ Ù…Ø·Ù„ÙˆØ¨.
            </div>
            } @else if (employeeForm.get('phoneNumber')?.errors?.['pattern']) {
            <div class="invalid-feedback d-block">
              <i class="bi bi-exclamation-triangle me-1"></i>
              Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙŠØ¬Ø¨ Ø£Ù† ÙŠØªÙƒÙˆÙ† Ù…Ù† 10 Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· Ø¨Ø¯ÙˆÙ† Ù…Ø³Ø§ÙØ§Øª Ø£Ùˆ Ø±Ù…ÙˆØ².
            </div>
            }
            }
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              Ø£Ø¯Ø®Ù„ 10 Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· â€” Ù…Ø«Ø§Ù„: 0791234567
            </small>
          </div>
        </div>
      </div>

      <!-- â•â•â• SECTION: Employment Information â•â•â• -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-briefcase-fill"></i>
          <span>Employment Details</span>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-calendar-date text-primary"></i>
              Hire Date <span class="text-danger">*</span>
            </label>
            <input type="date" class="form-control field-input" formControlName="hireDate"
              [class.is-invalid]="employeeForm.get('hireDate')?.invalid && employeeForm.get('hireDate')?.touched">
            <div class="invalid-feedback">Hire date is required.</div>
          </div>
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-building text-primary"></i>
              Department <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="departmentId"
              [class.is-invalid]="employeeForm.get('departmentId')?.invalid && employeeForm.get('departmentId')?.touched">
              <option value="" disabled selected>Select department...</option>
              @for (dept of departments; track dept.id) {
              <option [value]="dept.id">{{ dept.name }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a department.</div>
          </div>
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-person-badge text-primary"></i>
              Job Position <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="positionId"
              [class.is-invalid]="employeeForm.get('positionId')?.invalid && employeeForm.get('positionId')?.touched">
              <option value="" disabled selected>
                {{ departments.length === 0 ? 'Select a department first...' : positions.length === 0 ? 'Select
                department first...' : 'Select position...' }}
              </option>
              @for (pos of positions; track pos.id) {
              <option [value]="pos.id">{{ pos.title }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a job position.</div>
            @if (positions.length > 0) {
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              {{ positions.length }} position(s) available in this department.
            </small>
            }
          </div>
        </div>
      </div>

      <!-- â•â•â• SUBMIT BUTTON â•â•â• -->
      <div class="form-actions">
        <a routerLink="/employees" class="btn btn-cancel">
          <i class="bi bi-x-lg me-2"></i>Cancel
        </a>
        <button type="submit" class="btn btn-submit" [disabled]="isLoading || employeeForm.invalid">
          @if (isLoading) {
          <span class="spinner-border spinner-border-sm me-2"></span>
          {{ isEditMode ? 'Saving Changes...' : 'Creating Profile...' }}
          } @else {
          <i class="bi me-2" [class.bi-check2-circle]="!isEditMode" [class.bi-floppy-fill]="isEditMode"></i>
          {{ isEditMode ? 'Save Changes' : 'Create Employee Profile' }}
          }
        </button>
      </div>

    </form>
    }

  </div>
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employee-form\employee-form.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { PositionService } from '../../core/services/position.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  isEditMode = false;
  currentEmployeeId: number | null = null;
  departments: any[] = [];
  positions: any[] = [];
  unassignedUsers: any[] = [];

  // Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ÙŠÙˆØ²Ø± Ø§Ù„Ù„ÙŠ Ù…Ø±Ø¨ÙˆØ· Ø¨Ø§Ù„Ù…ÙˆØ¸Ù ÙÙŠ Ø­Ø§Ù„Ø© Ø§Ù„ØªØ¹Ø¯ÙŠÙ„
  linkedUserInfo: { username: string; email: string; role: string } | null =
    null;

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    userId: new FormControl('', Validators.required),
  });

  ngOnInit() {
    // ØªØ¬Ù‡ÙŠØ² Ø§Ù„Ù†Ù…ÙˆØ°Ø¬
    const state = window.history.state;

    if (state && state.editMode && state.employeeId) {
      // edit mode
      this.isEditMode = true;
      this.currentEmployeeId = state.employeeId;
      this.loadEmployeeDetails(this.currentEmployeeId!);
      // userId ÙˆØ§Ù„Ø¥ÙŠÙ…ÙŠÙ„ Ù…Ø§ ÙŠØªØ¹Ø¯Ù„ÙˆØ§
      this.employeeForm.get('userId')?.disable();
      this.employeeForm.get('email')?.disable();
    } else {
      // add mode
      // Ù„Ùˆ Ø¬Ø§ÙŠØ© Ø¯Ø§ØªØ§ Ù…Ù† ØµÙØ­Ø© Ø«Ø§Ù†ÙŠØ© Ù†Ø¹Ø¨ÙŠÙ‡Ø§ Ù…Ø¨Ø§Ø´Ø±Ø©
      if (state && (state.userId || state.email)) {
        this.employeeForm.patchValue({
          userId: state.userId,
          email: state.email,
        });
      }
      // Ø§Ù„Ø¥ÙŠÙ…ÙŠÙ„ ÙŠØªØ¹Ø¨Ù‰ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ù…Ù† Ø§Ù„ÙŠÙˆØ²Ø± Ø§Ù„Ù…Ø®ØªØ§Ø±
      this.employeeForm.get('email')?.disable();

      this.loadUnassignedUsers();

      // Ù†Ø¹Ø¨ÙŠ Ø§Ù„Ø¥ÙŠÙ…ÙŠÙ„ Ù„Ù…Ø§ ÙŠØ®ØªØ§Ø± ÙŠÙˆØ²Ø± Ù…Ù† Ø§Ù„Ù€ dropdown
      this.employeeForm.get('userId')?.valueChanges.subscribe((selectedId) => {
        const user = this.unassignedUsers.find(
          (u) => String(u.id) === String(selectedId),
        );
        if (user) {
          this.employeeForm.get('email')?.setValue(user.email);
        }
      });
    }

    this.loadDepartments();

    this.employeeForm.get('departmentId')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.employeeForm.get('positionId')?.enable();
        this.loadPositions(Number(deptId));
      }
    });
  }

  // Ø¬Ù„Ø¨ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ÙˆØ¸Ù
  loadEmployeeDetails(id: number) {
    this.isLoading = true;
    // Ø¨Ù†Ø¬ÙŠØ¨ ÙƒØ§Ù…Ù„ Ø§Ù„ØªÙØ§ØµÙŠÙ„
    this.employeeService.getEmployeeById(id).subscribe({
      next: (profile: any) => {
        this.isLoading = false;

        if (profile.departmentId) {
          this.loadPositions(profile.departmentId);
          this.employeeForm.get('positionId')?.enable();
        }

        // Ù†Ø¹Ø¨ÙŠ Ø§Ù„ÙÙˆØ±Ù… Ø¨Ø§Ù„Ø¯Ø§ØªØ§ Ø§Ù„Ù…ÙˆØ¬ÙˆØ¯Ø©
        this.employeeForm.patchValue({
          firstName: profile.firstName || profile.fullName?.split(' ')[0] || '',
          lastName:
            profile.lastName ||
            profile.fullName?.split(' ').slice(1).join(' ') ||
            '',
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || profile.phone || '',
          hireDate: profile.hireDate
            ? new Date(profile.hireDate).toISOString().split('T')[0]
            : '',
          departmentId: profile.departmentId || '',
          positionId: profile.positionId || '',
          userId: profile.userId || '',
        });

        // Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø¨Ø³ÙŠØ·Ø© Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù€ header
        this.linkedUserInfo = {
          username:
            profile.fullName ||
            `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
            'Employee',
          email: profile.email || '',
          role: profile.positionTitle || profile.departmentName || 'Employee',
        };
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching employee', err);
        Swal.fire('Error', 'Failed to load employee details', 'error');
      },
    });
  }

  loadDepartments() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
      },
    });
  }

  // Ø§Ù„ÙŠÙˆØ²Ø±Ø§Øª Ø§Ù„Ù„ÙŠ Ù…Ø§ Ø±Ø¨Ø·ÙˆØ§ Ø¨Ù…ÙˆØ¸Ù Ø¨Ø¹Ø¯
  loadUnassignedUsers() {
    // ØªØ­Ù…ÙŠÙ„ ÙŠÙˆØ²Ø±Ø§Øª Ø¨Ø¯ÙˆÙ† Ù…ÙˆØ¸Ù
    this.authService.getUnassignedEmployeeUsers().subscribe({
      next: (res: any) => {
        this.unassignedUsers = res?.items ?? (Array.isArray(res) ? res : []);
      },
      error: (err) => {
        console.error('Failed to load unassigned users:', err);
      },
    });
  }

  // positions Ø­Ø³Ø¨ Ø§Ù„Ù‚Ø³Ù…
  loadPositions(deptId: number) {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†Ø§ØµØ¨
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res) ? res : res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  // Ø§Ù„Ø¥ÙŠÙ…ÙŠÙ„ disabled ÙÙ†Ø­ØªØ§Ø¬ getRawValue
  get displayEmail(): string {
    return this.employeeForm.getRawValue().email || '';
  }

  // ØªØ­ÙˆÙŠÙ„ Ø£Ø®Ø·Ø§Ø¡ Ø§Ù„Ù€ backend Ù„Ø±Ø³Ø§Ø¦Ù„ Ù…ÙÙ‡ÙˆÙ…Ø©
  private parseBackendError(err: any): string {
    const body = err?.error;

    if (!body) return 'Ø­Ø¯Ø« Ø®Ø·Ø£ ØºÙŠØ± Ù…ØªÙˆÙ‚Ø¹ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.';

    // ASP.NET validation errors â€” ÙƒÙ„ field ÙÙŠÙ‡ list Ù…Ù† Ø§Ù„Ù€ errors
    if (body.errors && typeof body.errors === 'object') {
      const fieldLabels: Record<string, string> = {
        PhoneNumber: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ',
        FirstName: 'Ø§Ù„Ø§Ø³Ù… Ø§Ù„Ø£ÙˆÙ„',
        LastName: 'Ø§Ø³Ù… Ø§Ù„Ø¹Ø§Ø¦Ù„Ø©',
        Email: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
        HireDate: 'ØªØ§Ø±ÙŠØ® Ø§Ù„ØªØ¹ÙŠÙŠÙ†',
        DepartmentId: 'Ø§Ù„Ù‚Ø³Ù…',
        PositionId: 'Ø§Ù„Ù…Ø³Ù…Ù‰ Ø§Ù„ÙˆØ¸ÙŠÙÙŠ',
        UserId: 'Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…',
      };

      const messages: string[] = [];
      for (const [field, errors] of Object.entries(body.errors)) {
        const label = fieldLabels[field] || field;
        const msgs = Array.isArray(errors) ? errors : [String(errors)];
        for (const msg of msgs) {
          // Ù†ØªØ±Ø¬Ù… Ø§Ù„Ø±Ø³Ø§Ù„Ø© Ù„Ù„Ø¹Ø±Ø¨ÙŠ Ù„Ùˆ Ø¹Ù†Ø¯Ù†Ø§ ØªØ±Ø¬Ù…Ø©
          const translated = this.translateBackendMsg(String(msg));
          messages.push(`â€¢ ${label}: ${translated}`);
        }
      }
      if (messages.length) return messages.join('\n');
    }

    // Ø±Ø³Ø§Ù„Ø© Ø¹Ø§Ø¯ÙŠØ©
    if (body.message) return body.message;
    if (body.title) return body.title;
    if (typeof body === 'string') return body;

    return 'Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.';
  }

  // ØªØ±Ø¬Ù…Ø© Ø¨Ø¹Ø¶ Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù€ backend Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© Ù„Ù„Ø¹Ø±Ø¨ÙŠ
  private translateBackendMsg(msg: string): string {
    const map: Record<string, string> = {
      'Invalid phone number format.':
        'ØµÙŠØºØ© Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ØºÙŠØ± ØµØ­ÙŠØ­Ø© (ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† 10 Ø£Ø±Ù‚Ø§Ù…)',
      'Phone number must be 10 digits.':
        'ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ 10 Ø£Ø±Ù‚Ø§Ù… Ø¨Ø§Ù„Ø¶Ø¨Ø·',
      'The field PhoneNumber must be a string or array type with a maximum length of 10.':
        'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙŠØ¬Ø¨ Ø£Ù„Ø§ ÙŠØªØ¬Ø§ÙˆØ² 10 Ø£Ø±Ù‚Ø§Ù…',
      'is required.': 'Ù‡Ø°Ø§ Ø§Ù„Ø­Ù‚Ù„ Ù…Ø·Ù„ÙˆØ¨',
      'already exists': 'Ù‡Ø°Ø§ Ø§Ù„Ø³Ø¬Ù„ Ù…ÙˆØ¬ÙˆØ¯ Ù…Ø³Ø¨Ù‚Ø§Ù‹',
    };
    for (const [en, ar] of Object.entries(map)) {
      if (msg.toLowerCase().includes(en.toLowerCase())) return ar;
    }
    return msg;
  }

  onSubmit() {
    // Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      // Ø®Ø·Ø£ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ Ù„Ù‡ Ø±Ø³Ø§Ù„Ø© Ù…Ø®ØµØµØ©
      const phone = this.employeeForm.get('phoneNumber');
      if (phone?.errors?.['pattern']) {
        Swal.fire({
          icon: 'warning',
          title: 'Ø±Ù‚Ù… Ù‡Ø§ØªÙ ØºÙŠØ± ØµØ­ÙŠØ­',
          text: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙŠØ¬Ø¨ Ø£Ù† ÙŠØªÙƒÙˆÙ† Ù…Ù† 10 Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· (Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· Ø¨Ø¯ÙˆÙ† Ù…Ø³Ø§ÙØ§Øª Ø£Ùˆ Ø±Ù…ÙˆØ²)',
          confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
        });
        return;
      }

      Swal.fire({
        icon: 'warning',
        title: 'Ø¨ÙŠØ§Ù†Ø§Øª Ù†Ø§Ù‚ØµØ©',
        text: 'ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ£ÙƒØ¯ Ù…Ù† ØªØ¹Ø¨Ø¦Ø© Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ„ Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© Ø¨Ø´ÙƒÙ„ ØµØ­ÙŠØ­',
        confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
      });
      return;
    }

    this.isLoading = true;
    const rawValues = this.employeeForm.getRawValue();

    const payload = {
      ...rawValues,
      departmentId: Number(rawValues.departmentId),
      positionId: Number(rawValues.positionId),
      hireDate: rawValues.hireDate
        ? new Date(rawValues.hireDate).toISOString()
        : new Date().toISOString(),
    };

    if (this.isEditMode && this.currentEmployeeId) {
      this.employeeService
        .updateEmployee(this.currentEmployeeId, payload)
        .subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire('Ù†Ø¬Ø§Ø­', 'ØªÙ… ØªØ¹Ø¯ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ÙˆØ¸Ù Ø¨Ù†Ø¬Ø§Ø­', 'success');
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            this.isLoading = false;
            const msg = this.parseBackendError(err);
            Swal.fire({
              icon: 'error',
              title: 'ÙØ´Ù„ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„',
              text: msg,
              confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
            });
            console.error('Update error:', err);
          },
        });
    } else {
      this.employeeService.addEmployee(payload).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('Ù†Ø¬Ø§Ø­', 'ØªÙ… Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…ÙˆØ¸Ù Ø¨Ù†Ø¬Ø§Ø­', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.isLoading = false;
          const msg = this.parseBackendError(err);
          Swal.fire({
            icon: 'error',
            title: 'ÙØ´Ù„ Ø§Ù„Ø¥Ø¶Ø§ÙØ©',
            text: msg,
            confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
          });
          console.error('Add error:', err);
        },
      });
    }
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employees\employees.component.css

``css

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employees\employees.component.html

``html


<div
    class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
    <h2 class="fw-bold text-secondary mb-0">
        <i class="bi bi-people-fill me-2"></i>{{ 'Employee Management' | t }}
    </h2>
    <div
        class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
        <div class="input-group shadow-sm" style="max-width: 350px;">
            <span class="input-group-text bg-white border-end-0 text-muted"><i
                    class="bi bi-search"></i></span>
            <input type="text" class="form-control border-start-0 ps-0"
                placeholder="{{ 'Search employees...' | t }}"
                [(ngModel)]="searchQuery"
                (input)="filterEmployees()">
        </div>

        <div class="dropdown">
            <button class="btn btn-outline-secondary shadow-sm" type="button"
                data-bs-toggle="dropdown" aria-expanded="false"
                title="Filter Employees">
                <i class="bi bi-funnel-fill"></i>
            </button>
            <div
                class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4"
                style="width: 250px;">
                <h6
                    class="dropdown-header px-0 text-primary fw-bold mb-2">Filter
                    Options</h6>

                <div class="mb-3">
                    <label
                        class="form-label small fw-semibold text-muted mb-1">{{
                        'Department' | t }}</label>
                    <select class="form-select form-select-sm"
                        [(ngModel)]="selectedDepartment"
                        (change)="filterEmployees()">
                        <option value>All Departments</option>
                        @for (dept of uniqueDepartments; track dept) {
                        <option [value]="dept">{{ dept }}</option>
                        }
                    </select>
                </div>

                <div class="mb-2">
                    <label
                        class="form-label small fw-semibold text-muted mb-1">{{
                        'Status' | t }}</label>
                    <select class="form-select form-select-sm"
                        [(ngModel)]="selectedStatus"
                        (change)="filterEmployees()">
                        <option value>All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>

        @if (isAdmin) {
        <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-success px-4 fw-semibold me-2"
                (click)="exportToExcel()">
                <i class="bi bi-file-earmark-excel-fill me-2"></i> {{
                'Export to Excel' | t }}
            </button>
            <button class="btn btn-primary px-4 fw-semibold"
                routerLink="/employee-form">
                <i class="bi bi-person-plus-fill me-2"></i> {{ 'Add Employee' |
                t }}
            </button>
        </div>
        }
    </div>
</div>

@if (isLoading) {
<div class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2 text-muted">Fetching data from server...</p>
</div>
} @else {
<div class="card shadow-sm border-0">
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
                <tr class="text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">ID</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{
                        'Employee' | t }}</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{
                        'Email' | t }}</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{
                        'Department' | t }}</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0 text-center">{{
                        'Status' | t }}</th>
                    @if (isAdminOrHR) { <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0 text-end">{{
                        'Actions' | t }}</th> }
                </tr>
            </thead>
            <tbody>
                @for (emp of paginatedEmployees; track emp.id) {
                <tr>
                    <td data-label="ID" class="py-3 px-4 fw-bold text-dark">#{{
                        emp.id }}</td>
                    <td data-label="Full Name"
                        class="py-3 px-4 fw-bold text-dark">
                        <div class="d-flex align-items-center">
                            <div
                                class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-3 rounded-circle d-flex align-items-center justify-content-center"
                                style="width: 35px; height: 35px; font-size: 14px;">
                                {{ emp.firstName ?
                                emp.firstName.charAt(0).toUpperCase() : 'U' }}
                            </div>
                            {{ emp.firstName }} {{ emp.lastName }}
                        </div>
                    </td>
                    <td data-label="Email" class="py-3 px-4 text-muted">{{
                        emp.email }}</td>
                    <td data-label="Department" class="py-3 px-4">{{
                        emp.departmentName || emp.departmentId || 'â€”' }}</td>
                    <td data-label="Status" class="py-3 px-4">
                        <span class="status-badge"
                            [ngClass]="emp.isActive ? 'status-active' : 'status-inactive'">
                            <i class="bi"
                                [ngClass]="emp.isActive ? 'bi-check-circle-fill' : 'bi-x-circle-fill'"></i>
                            {{ emp.isActive ? ('Active' | t) : ('Inactive' | t)
                            }}
                        </span>
                    </td>
                    @if (isAdminOrHR) {
                    <td data-label="Actions"
                        class="py-3 px-4 text-end text-nowrap actions-cell">
                        <button class="btn btn-outline-info btn-sm me-2"
                            title="Details"
                            (click)="viewFullDetails(emp)">
                            <i class="bi bi-file-earmark-person"></i>
                        </button>
                        @if (isAdmin) {
                        <button class="btn btn-sm btn-outline-secondary me-2"
                            title="Download Report"
                            (click)="downloadEmployeeReport(emp)">
                            <i class="bi bi-file-earmark-pdf"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm"
                            title="Edit"
                            (click)="editEmployee(emp.id)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger ms-2"
                            title="Delete"
                            (click)="onDelete(emp.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                        }
                    </td>
                    }
                </tr>
                } @empty {
                <tr>
                    <td [colSpan]="isAdminOrHR ? 6 : 5"
                        class="text-center py-5">
                        <div class="d-flex flex-column align-items-center">
                            <div
                                class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center"
                                style="width: 80px; height: 80px;">
                                <i class="bi bi-people text-secondary fs-1"></i>
                            </div>
                            <h5 class="fw-bold text-dark mb-1">{{
                                'No Employees Found' | t }}</h5>
                            <p class="text-muted small mb-0">Try adjusting your
                                filters or search query.</p>
                        </div>
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>

    <!-- Pagination Footer -->
    @if (employeesList.length > 0) {
    <div
        class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <small class="text-muted fw-medium">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{
            getMathMin(currentPage * itemsPerPage, employeesList.length) }} of
            {{ employeesList.length }} entries
        </small>
        <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
            <li class="page-item" [class.disabled]="currentPage === 1">
                <a class="page-link cursor-pointer px-3"
                    (click)="changePage(currentPage - 1)">Previous</a>
            </li>

            <li class="page-item active">
                <a class="page-link px-3 bg-primary border-primary">{{
                    currentPage }} / {{ totalPages }}</a>
            </li>

            <li class="page-item" [class.disabled]="currentPage === totalPages">
                <a class="page-link cursor-pointer px-3"
                    (click)="changePage(currentPage + 1)">Next</a>
            </li>
        </ul>
    </div>
    }
</div>
}

<div class="modal fade" id="employeeDetailsModal" tabindex="-1"
    aria-labelledby="employeeDetailsModalLabel" aria-hidden="true">
    <div
        class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

            <div class="modal-header border-0 p-0">
                <div
                    class="emp-modal-header w-100 p-4 d-flex align-items-center gap-3">
                    <div class="emp-modal-avatar">
                        {{ getEmpInitials(selectedEmployeeProfile) }}
                    </div>
                    <div>
                        <h4 class="fw-bold text-white mb-0">
                            {{ selectedEmployeeProfile?.fullName ||
                            (selectedEmployeeProfile?.firstName + ' ' +
                            selectedEmployeeProfile?.lastName) }}
                        </h4>
                        <span
                            class="badge bg-white text-primary mt-1 px-3 py-2 rounded-pill shadow-sm">
                            {{ selectedEmployeeProfile?.positionTitle ||
                            'Employee' }}
                        </span>
                    </div>
                    <button type="button"
                        class="btn-close btn-close-white ms-auto shadow-none"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>

            <div class="modal-body p-4">
                @if (selectedEmployeeProfile?.isLoadingDetails) {
                <div class="text-center py-4">
                    <div class="spinner-border text-primary"
                        role="status"></div>
                    <p class="mt-2 text-muted">Loading full details...</p>
                </div>
                }
                @if (selectedEmployeeProfile &&
                !selectedEmployeeProfile?.isLoadingDetails) {

                <h6 class="detail-section-title">
                    <i
                        class="bi bi-person-lines-fill text-primary me-2"></i>Personal
                    Information
                </h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-envelope me-1"></i>Email</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.email || 'â€”' }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-telephone me-1"></i>Phone</span>
                            <span class="detail-value">
                                {{ selectedEmployeeProfile?.phone ||
                                selectedEmployeeProfile?.phoneNumber || 'N/A' }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-hash me-1"></i>Employee
                                ID</span>
                            <span class="detail-value fw-bold text-primary">#{{
                                selectedEmployeeProfile?.id }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-calendar-check me-1"></i>Hire
                                Date</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.hireDate |
                                date:'mediumDate' }}</span>
                        </div>
                    </div>
                </div>

                <h6 class="detail-section-title">
                    <i
                        class="bi bi-briefcase-fill text-success me-2"></i>Employment
                    Details
                </h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-building me-1"></i>Department</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.departmentName || 'â€”'
                                }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-person-badge me-1"></i>Position</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.positionTitle || 'â€”'
                                }}</span>
                        </div>
                    </div>
                </div>

                <h6 class="detail-section-title">
                    <i class="bi bi-activity text-warning me-2"></i>Account
                    Status
                </h6>
                <div class="d-flex gap-3 flex-wrap">
                    <span class="status-badge"
                        [ngClass]="selectedEmployeeProfile?.isActive !== false ? 'status-active' : 'status-inactive'">
                        <i class="bi me-1"
                            [class.bi-check-circle-fill]="selectedEmployeeProfile?.isActive !== false"
                            [class.bi-x-circle-fill]="selectedEmployeeProfile?.isActive === false"></i>
                        {{ selectedEmployeeProfile?.isActive !== false ?
                        'Active' : 'Inactive' }}
                    </span>
                </div>

                }
            </div>

            <div
                class="modal-footer border-0 bg-light d-flex justify-content-between align-items-center">
                <span class="text-muted small">
                    <i
                        class="bi bi-shield-lock-fill me-1 text-secondary"></i>Confidential
                    Employee Record
                </span>
                <div class="d-flex gap-2">
                    <button type="button"
                        class="btn btn-outline-secondary rounded-pill px-4"
                        data-bs-dismiss="modal">
                        <i class="bi bi-x-lg me-1"></i> {{ 'Close' | t }}
                    </button>
                    @if (isAdmin) {
                    <button type="button"
                        class="btn btn-outline-danger rounded-pill px-4"
                        [disabled]="isGeneratingReport"
                        (click)="downloadEmployeeReport(selectedEmployeeProfile)">
                        @if (isGeneratingReport) {
                        <span
                            class="spinner-border spinner-border-sm me-2"></span>
                        {{ 'Loading...' | t }}
                        } @else {
                        <i class="bi bi-file-earmark-pdf-fill me-1"></i> {{
                        'Download Report' | t }}
                        }
                    </button>
                    <button type="button"
                        class="btn btn-primary rounded-pill px-4"
                        (click)="editEmployee(selectedEmployeeProfile?.id); detailsModal?.hide()">
                        <i class="bi bi-pencil-square me-1"></i> Edit Employee
                    </button>
                    }
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.emp-modal-header {
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
}

.emp-modal-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
  line-height: 1;
}

.detail-section-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #6c757d;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  background: #f8fafc;
  border: 1px solid #e8ecf0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8592a3;
  font-weight: 600;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a202c;
}


.status-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}



.cursor-pointer {
  cursor: pointer;
}

/* Mobile Responsive Cards for Table */
@media screen and (max-width: 768px) {
  .table-responsive table, 
  .table-responsive thead, 
  .table-responsive tbody, 
  .table-responsive th, 
  .table-responsive td, 
  .table-responsive tr {
    display: block;
  }
  
  .table-responsive thead tr {
    display: none; /* Hide header row */
  }
  
  .table-responsive tr {
    border: 1px solid #e8ecf0;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  
  .table-responsive td {
    border: none;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    padding-left: 40% !important;
    text-align: right !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 50px;
  }
  
  .table-responsive td:last-child {
    border-bottom: 0;
  }
  
  .table-responsive td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 35%;
    text-align: left;
    font-weight: 700;
    color: #8592a3;
    font-size: 0.75rem;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .actions-cell {
    justify-content: flex-end !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employees\employees.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { LeaveService } from '../../core/services/leave.service';
import { SalaryService } from '../../core/services/salary.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private attendanceService = inject(AttendanceService);
  private leaveService = inject(LeaveService);
  private salaryService = inject(SalaryService);

  allEmployeesList: any[] = [];
  employeesList: any[] = [];
  isLoading: boolean = true;
  isGeneratingReport: boolean = false;
  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;
  selectedEmployeeProfile: any = null;

  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  uniqueDepartments: string[] = [];

  detailsModal: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employeesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.employeesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  showToast(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }

  ngOnInit() {
    // Ø£ÙˆÙ„ ØªØ­Ù…ÙŠÙ„
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadEmployees();
  }

  getRoleBadgeClass(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      case 2:
        return 'bg-warning bg-opacity-10 text-dark border border-warning border-opacity-25';
      default:
        return 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25';
    }
  }

  // --- Export to Excel (CSV) ---
  exportToExcel() {
    if (this.employeesList.length === 0) {
      Swal.fire('No Data', 'There are no employees to export.', 'info');
      return;
    }

    const headers = [
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Address',
      'Status',
      'Role ID',
    ];

    const csvData = this.employeesList.map((emp) => {
      return [
        emp.id,
        emp.firstName || '',
        emp.lastName || '',
        emp.email || '',
        emp.phoneNumber || 'N/A',
        emp.address || 'N/A',
        emp.isActive ? 'Active' : 'Inactive',
        emp.roleId || 'N/A',
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    });

    // Add UTF-8 BOM for Excel to read Arabic/Special characters correctly
    // Add sep=, to force Excel to recognize comma as delimiter regardless of region
    const csvContent =
      '\uFEFFsep=,\r\n' + [headers.join(','), ...csvData].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Employees_Kawadir_${new Date().toISOString().split('T')[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported Successfully',
      text: 'Employees list has been exported to Excel (CSV).',
      timer: 2000,
      showConfirmButton: false,
    });
  }

  getEmpInitials(emp: any): string {
    const name =
      emp?.fullName ||
      `${emp?.firstName || ''} ${emp?.lastName || ''}`.trim() ||
      'E';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  loadEmployees() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.allEmployeesList = data;
        this.employeesList = [...this.allEmployeesList];

        const depts = data
          .map((e: any) => e.departmentName || e.departmentId)
          .filter(Boolean);
        this.uniqueDepartments = Array.from(new Set(depts)) as string[];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;
      },
    });
  }

  filterEmployees() {
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©
    this.employeesList = this.allEmployeesList.filter((emp) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const fullName =
          `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        const deptStr = String(
          emp.departmentName || emp.departmentId || '',
        ).toLowerCase();

        matchesSearch =
          fullName.includes(query) ||
          idStr.includes(query) ||
          deptStr.includes(query);
      }

      let matchesDept = true;
      if (this.selectedDepartment) {
        matchesDept =
          (emp.departmentName || String(emp.departmentId)) ===
          this.selectedDepartment;
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        matchesStatus =
          this.selectedStatus === 'Active' ? emp.isActive : !emp.isActive;
      }

      return matchesSearch && matchesDept && matchesStatus;
    });

    this.currentPage = 1; // Reset to first page on filter
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.employeesList = this.employeesList.filter(
              (emp) => emp.id !== id,
            );

            // Adjust pagination if needed
            if (this.currentPage > this.totalPages) {
              this.currentPage = this.totalPages;
            }

            this.showToast('Employee deleted successfully', 'success');
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            this.showToast('Failed to delete employee', 'error');
          },
        });
      }
    });
  }

  viewFullDetails(emp: any) {
    // ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸Ù
    this.selectedEmployeeProfile = { ...emp, isLoadingDetails: true };

    const modalElement = document.getElementById('employeeDetailsModal');
    if (modalElement) {
      this.detailsModal = new bootstrap.Modal(modalElement);
      this.detailsModal.show();
    }

    this.employeeService.getEmployeeFullProfile(emp.id).subscribe({
      next: (profile) => {
        this.selectedEmployeeProfile = {
          ...emp,
          ...profile,
          isLoadingDetails: false,
        };
      },
      error: () => {
        this.selectedEmployeeProfile = { ...emp, isLoadingDetails: false };
      },
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee-form'], {
      state: { editMode: true, employeeId: id },
    });
  }

  downloadEmployeeReport(emp: any) {
    // ØªÙ‚Ø±ÙŠØ± Ø§Ù„Ù…ÙˆØ¸Ù
    if (!emp) return;

    this.isGeneratingReport = true;
    const empName =
      `${emp.firstName || ''} ${emp.lastName || ''}`.trim() ||
      `Employee #${emp.id}`;

    // Fetch all data in parallel
    forkJoin({
      attendance: this.attendanceService
        .getAllAttendance()
        .pipe(catchError(() => of([]))),
      leaves: this.leaveService.getAllLeaves().pipe(catchError(() => of([]))),
      salaries: this.salaryService
        .getAllSalaries()
        .pipe(catchError(() => of([]))),
    }).subscribe(({ attendance, leaves, salaries }) => {
      this.isGeneratingReport = false;

      // Filter data for this specific employee
      const empAttendance = attendance
        .filter((a: any) => a.employeeId === emp.id)
        .sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        .slice(0, 15);

      const empLeaves = leaves
        .filter((l: any) => l.employeeId === emp.id)
        .sort(
          (a: any, b: any) =>
            new Date(b.startDate || 0).getTime() -
            new Date(a.startDate || 0).getTime(),
        );

      const empSalaries = salaries
        .filter((s: any) => s.employeeId === emp.id)
        .sort((a: any, b: any) => {
          if (b.year !== a.year) return b.year - a.year;
          return b.month - a.month;
        });

      this.buildEmployeePDF(
        emp,
        empName,
        empAttendance,
        empLeaves,
        empSalaries,
      );
    });
  }

  private buildEmployeePDF(
    emp: any,
    empName: string,
    attendance: any[],
    leaves: any[],
    salaries: any[],
  ) {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    // âœ… W3 Fix: ØªØ£ÙƒØ¯ Ù…Ù† ØµØ­Ø© ÙƒÙ„ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø¨Ù…Ø§ ÙŠØ·Ø§Ø¨Ù‚ Backend enum
    const leaveTypeMap: any = {
      0: 'Annual',
      1: 'Sick',
      2: 'Emergency',
      3: 'Unpaid',
      Annual: 'Annual',
      Sick: 'Sick',
      Emergency: 'Emergency',
      Unpaid: 'Unpaid',
    };
    const statusMap: any = {
      0: 'Pending',
      1: 'Approved',
      2: 'Rejected',
      Pending: 'Pending',
      Approved: 'Approved',
      Rejected: 'Rejected',
    };

    // â”€â”€ HEADER BANNER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    doc.setFillColor(67, 97, 238);
    doc.rect(0, 0, pageW, 38, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('Kawadir HRMS', 14, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Employee Monthly Report', 14, 22);
    doc.text(`Generated: ${todayStr}`, 14, 29);

    // â”€â”€ EMPLOYEE INFO CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    doc.setFillColor(248, 249, 252);
    doc.roundedRect(10, 44, pageW - 20, 38, 3, 3, 'F');
    doc.setDrawColor(225, 228, 240);
    doc.roundedRect(10, 44, pageW - 20, 38, 3, 3, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 50);
    doc.text(empName, 18, 55);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 120);
    doc.text(`Employee ID: #${emp.id}`, 18, 62);
    doc.text(`Department: ${emp.departmentName || 'â€”'}`, 18, 68);
    doc.text(`Position: ${emp.positionTitle || 'â€”'}`, 18, 74);

    const hireDate = emp.hireDate ? emp.hireDate.split('T')[0] : 'â€”';
    doc.text(`Hire Date: ${hireDate}`, pageW / 2, 62);
    doc.text(`Email: ${emp.email || 'â€”'}`, pageW / 2, 68);
    doc.text(
      `Status: ${emp.isActive !== false ? 'Active' : 'Inactive'}`,
      pageW / 2,
      74,
    );

    let curY = 90;

    // â”€â”€ SALARY SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(67, 97, 238);
    doc.text('SALARY HISTORY', 14, curY);
    doc.setDrawColor(67, 97, 238);
    doc.setLineWidth(0.5);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (salaries.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No salary records found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [
          [
            'Month',
            'Year',
            'Base ($)',
            'Allowances ($)',
            'Deductions ($)',
            'Net Pay ($)',
          ],
        ],
        body: salaries
          .slice(0, 6)
          .map((s: any) => [
            s.month,
            s.year,
            `$${s.baseAmount ?? 'â€”'}`,
            `+$${s.allowances ?? 0}`,
            `-$${s.deductions ?? 0}`,
            `$${s.netAmount ?? 'â€”'}`,
          ]),
        theme: 'grid',
        headStyles: {
          fillColor: [240, 243, 255],
          textColor: [50, 50, 80],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [252, 253, 255] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // â”€â”€ ATTENDANCE SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (curY > 230) {
      doc.addPage();
      curY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(25, 135, 84);
    doc.text('RECENT ATTENDANCE (Last 15 Records)', 14, curY);
    doc.setDrawColor(25, 135, 84);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (attendance.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No attendance records found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [['Date', 'Clock In', 'Clock Out', 'Hours', 'Status']],
        body: attendance.map((a: any) => [
          a.date ? a.date.split('T')[0] : 'â€”',
          a.clockIn || 'â€”',
          a.clockOut && a.clockOut !== '00:00:00' ? a.clockOut : 'â€”',
          a.totalHours || 'â€”',
          a.clockOut && a.clockOut !== '00:00:00' ? 'Completed' : 'Working',
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [232, 248, 240],
          textColor: [20, 80, 50],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 253, 250] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // â”€â”€ LEAVE SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (curY > 230) {
      doc.addPage();
      curY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(220, 53, 69);
    doc.text('LEAVE REQUESTS', 14, curY);
    doc.setDrawColor(220, 53, 69);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (leaves.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No leave requests found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [['Type', 'Start Date', 'End Date', 'Days', 'Status']],
        body: leaves.map((l: any) => [
          leaveTypeMap[l.leaveType] || l.leaveType,
          l.startDate ? l.startDate.split('T')[0] : 'â€”',
          l.endDate ? l.endDate.split('T')[0] : 'â€”',
          l.totalDays ?? 'â€”',
          statusMap[l.status] || l.status,
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [255, 240, 242],
          textColor: [100, 20, 30],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [255, 248, 249] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // â”€â”€ SUMMARY BOX â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (curY > 235) {
      doc.addPage();
      curY = 20;
    }

    const approvedLeaves = leaves.filter(
      (l: any) => l.status === 1 || l.status === 'Approved',
    );
    const totalLeaveDays = approvedLeaves.reduce(
      (acc: number, l: any) => acc + (l.totalDays || 0),
      0,
    );
    const completedSessions = attendance.filter(
      (a: any) => a.clockOut && a.clockOut !== '00:00:00',
    ).length;
    const latestSalary = salaries[0];

    doc.setFillColor(240, 243, 255);
    doc.roundedRect(10, curY, pageW - 20, 32, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(67, 97, 238);
    doc.text('REPORT SUMMARY', 18, curY + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(50, 50, 80);
    doc.text(
      `Total Attendance Records: ${attendance.length}   |   Completed Sessions: ${completedSessions}`,
      18,
      curY + 16,
    );
    doc.text(
      `Total Approved Leave Days: ${totalLeaveDays}   |   Latest Net Salary: $${latestSalary?.netAmount ?? 'N/A'}`,
      18,
      curY + 23,
    );

    // â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text(
        'Confidential â€“ Kawadir HRMS â€“ System Generated Report',
        14,
        doc.internal.pageSize.getHeight() - 8,
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageW - 30,
        doc.internal.pageSize.getHeight() - 8,
      );
    }

    const fileName = `Report_${empName.replace(/ /g, '_')}_${todayStr}.pdf`;
    doc.save(fileName);
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave\leave.component.css

``css

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave\leave.component.html

``html
<div class="page-container p-4">



    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">{{ isAdminOrHR ? ('All Leave Requests' | t) : ('My Leave Requests' | t) }}</h3>
            <p class="text-muted small mb-0">{{ 'Manage and track time-off requests effectively' | t }}</p>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="{{ 'Search by name, ID, or reason...' | t }}"
                    [(ngModel)]="leaveSearchQuery" 
                    (input)="filterLeaves()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Leaves">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">{{ 'Filter Options' | t }}</h6>
                    
                    <div class="mb-3">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Leave Type' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedLeaveType" (change)="filterLeaves()">
                            <option value="">{{ 'All Types' | t }}</option>
                            <option *ngFor="let type of leaveTypes" [value]="type.name">{{ type.name }}</option>
                        </select>
                    </div>
                    
                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Status' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedLeaveStatus" (change)="filterLeaves()">
                            <option value="">{{ 'All Statuses' | t }}</option>
                            <option value="Pending">{{ 'Pending' | t }}</option>
                            <option value="Approved">{{ 'Approved' | t }}</option>
                            <option value="Rejected">{{ 'Rejected' | t }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <button *ngIf="!isAdminOrHR"
                class="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                (click)="openModal()">
                <i class="bi bi-send-plus me-2"></i> {{ 'Request Leave' | t }}
            </button>
        </div>
    </div>

    <!-- Annual Leave Balance Banner for Employees -->
    <div class="row mb-4" *ngIf="!isAdminOrHR">
        <div class="col-12">
            <div class="card border-0 shadow-sm rounded-4 bg-primary bg-opacity-10 position-relative overflow-hidden">
                <div class="position-absolute end-0 top-0 h-100 w-50" style="background: linear-gradient(90deg, transparent, rgba(13, 110, 253, 0.05)); z-index: 0;"></div>
                <div class="card-body d-flex align-items-center justify-content-between p-4 position-relative" style="z-index: 1;">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 55px; height: 55px;">
                            <i class="bi bi-airplane-engines-fill fs-4"></i>
                        </div>
                        <div>
                            <p class="text-primary small mb-0 fw-bold text-uppercase" style="letter-spacing: 0.5px;">{{ 'Annual Leave Balance' | t }}</p>
                            <h3 class="mb-0 fw-bold text-dark">{{ employeeAnnualLeaveBalance }} {{ 'Days Remaining' | t }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <tr>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Leave Type' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Duration' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Reason' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-center">{{ 'Status' | t }}</th>
                        <th *ngIf="isAdminOrHR"
                            class="py-3 px-4 border-bottom-0 fw-semibold text-end">{{ 'Actions' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td [colSpan]="isAdminOrHR ? 6 : 5" class="text-center py-5 text-muted">
                            <span
                                class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading requests...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && leavesList.length === 0">
                        <td [colSpan]="isAdminOrHR ? 7 : 6" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-airplane-engines text-secondary fs-1"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">{{ 'No Leave Requests' | t }}</h5>
                                <p class="text-muted small mb-0">{{ 'No leave data available matching your search criteria.' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let leave of paginatedLeaves">
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-3">
                            <div class="d-flex align-items-center">
                                <div class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-2 rounded-circle d-flex align-items-center justify-content-center"
                                    style="width: 32px; height: 32px; font-size: 13px;">
                                    {{ leave.employeeName ? leave.employeeName.charAt(0).toUpperCase() : 'U' }}
                                </div>
                                <span class="fw-semibold text-dark">{{ leave.employeeName }}</span>
                            </div>
                        </td>
                        <td data-label="Leave Type" class="py-3 px-4 fw-bold text-dark">
                            <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle p-2 me-3 bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center"
                                    style="width: 35px; height: 35px;">
                                    <i class="bi bi-journal-text"></i>
                                </div>
                                {{ getLeaveTypeText(leave.leaveType) }}
                            </div>
                        </td>

                        <td data-label="Duration" class="py-3 px-4">
                            <div class="fw-medium text-dark">{{ leave.startDate
                                | date:'MMM dd' }} <i
                                    class="bi bi-arrow-right text-muted mx-1"></i>
                                {{ leave.endDate | date:'MMM dd, yyyy' }}</div>
                        </td>

                        <td data-label="Reason" class="py-3 px-4 text-secondary">
                            <span class="d-inline-block text-truncate"
                                style="max-width: 180px;"
                                [title]="leave.reason">
                                {{ leave.reason || ('No reason provided' | t) }}
                            </span>
                        </td>

                        <td data-label="Status" class="py-3 px-4 text-center">
                            <span class="status-badge"
                                [ngClass]="{
                                  'status-approved': getStatusText(leave.status) === 'Approved',
                                  'status-pending': getStatusText(leave.status) === 'Pending',
                                  'status-rejected': getStatusText(leave.status) === 'Rejected'
                                }">
                                <i class="bi me-1"
                                    [ngClass]="{
         'bi-check-circle-fill': getStatusText(leave.status) === 'Approved',
         'bi-hourglass-split': getStatusText(leave.status) === 'Pending',
         'bi-x-circle-fill': getStatusText(leave.status) === 'Rejected'
       }"></i>
                                {{ getStatusText(leave.status) }}
                            </span>
                            <div *ngIf="getStatusText(leave.status) === 'Rejected' && leave.rejectionReason"
                                class="mt-1">
                                <small class="text-danger d-block" [title]="leave.rejectionReason">
                                    <i class="bi bi-chat-left-text-fill me-1"></i>
                                    <span class="d-inline-block text-truncate" style="max-width: 150px;">{{ leave.rejectionReason }}</span>
                                </small>
                            </div>
                        </td>

                        <td *ngIf="isAdminOrHR" data-label="Actions" class="py-3 px-4 text-end actions-cell">
                            <div
                                *ngIf="getStatusText(leave.status) === 'Pending'"
                                class="d-flex justify-content-end gap-2">
                                <button
                                    class="btn btn-sm btn-success rounded-3 shadow-sm px-3"
                                    (click)="changeStatus(leave.id, 1)">
                                    {{ 'Approve' | t }}
                                </button>
                                <button
                                    class="btn btn-sm btn-outline-danger rounded-3 px-3"
                                    (click)="changeStatus(leave.id, 2)">
                                    {{ 'Reject' | t }}
                                </button>
                            </div>
                            <span
                                *ngIf="getStatusText(leave.status) !== 'Pending'"
                                class="text-muted small">{{ 'Processed' | t }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="leavesList.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                {{ 'Showing' | t }} {{ (currentPage - 1) * itemsPerPage + 1 }} {{ 'to' | t }} {{ getMathMin(currentPage * itemsPerPage, leavesList.length) }} {{ 'of' | t }} {{ leavesList.length }} {{ 'entries' | t }}
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">{{ 'Previous' | t }}</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">{{ 'Next' | t }}</a>
                </li>
            </ul>
        </div>
    </div>


<div class="modal fade" id="leaveModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
            <div class="modal-header border-bottom-0 pt-4 px-4">
                <h5 class="modal-title fw-bold text-dark"><i
                        class="bi bi-send-plus text-primary me-2"></i>New Leave
                    Request</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <form #leaveForm="ngForm">

                    <div class="mb-4">
                        <label
                            class="form-label fw-semibold text-secondary small">Leave
                            Type *</label>
                        <select class="form-select bg-light border-0"
                            name="leaveType" [(ngModel)]="leaveData.leaveType"
                            required>
                            <option *ngFor="let type of leaveTypes"
                                [value]="type.id">{{ type.name }}</option>
                        </select>
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label
                                class="form-label fw-semibold text-secondary small">Start
                                Date *</label>
                            <input type="date"
                                class="form-control bg-light border-0"
                                name="startDate"
                                [(ngModel)]="leaveData.startDate"
                                [min]="getToday()" required>
                        </div>
                        <div class="col-6">
                            <label
                                class="form-label fw-semibold text-secondary small">End
                                Date *</label>
                            <input type="date"
                                class="form-control bg-light border-0"
                                name="endDate" [(ngModel)]="leaveData.endDate"
                                [min]="leaveData.startDate || getToday()" required>
                        </div>
                    </div>

                    <div class="mb-2">
                        <label
                            class="form-label fw-semibold text-secondary small">Reason
                            *</label>
                        <textarea class="form-control bg-light border-0"
                            name="reason" [(ngModel)]="leaveData.reason"
                            rows="3" required
                            placeholder="Explain why you need this leave..."></textarea>
                    </div>

                </form>
            </div>
            <div class="modal-footer border-top-0 pb-4 px-4">
                <button type="button"
                    class="btn btn-light px-4 rounded-3 fw-semibold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                    class="btn btn-primary px-4 rounded-3 fw-semibold"
                    (click)="submitLeaveRequest()"
                    [disabled]="leaveForm.invalid || isProcessing">
                    <span *ngIf="isProcessing"
                        class="spinner-border spinner-border-sm me-2"></span>
                    Submit Request
                </button>
            </div>
        </div>
    </div>
</div>

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave\leave.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../core/services/leave.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);

  allLeavesList: any[] = [];
  leavesList: any[] = [];

  leaveSearchQuery: string = '';
  selectedLeaveStatus: string = '';
  selectedLeaveType: string = '';

  isLoading: boolean = true;
  isProcessing: boolean = false;

  isAdminOrHR: boolean = false;
  employeeAnnualLeaveBalance: number | string = 14;

  leaveModal: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedLeaves() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.leavesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.leavesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  leaveData = {
    leaveType: 0,
    startDate: '',
    endDate: '',
    reason: '',
  };

  leaveTypes = [
    { id: 0, name: 'Annual' },
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Emergency' }, // âœ… ÙŠØ·Ø§Ø¨Ù‚ Backend enum: Emergency=2
    { id: 3, name: 'Unpaid' }, // âœ… ÙŠØ·Ø§Ø¨Ù‚ Backend enum: Unpaid=3
  ];

  ngOnInit() {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadLeaves();
  }

  loadLeaves() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª
    this.isLoading = true;

    const request = this.isAdminOrHR
      ? this.leaveService.getAllLeaves()
      : this.leaveService.getMyLeaves();

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];

        if (Array.isArray(res)) {
          extracted = res;
        } else if (res?.data?.items && Array.isArray(res.data.items)) {
          extracted = res.data.items;
        } else if (res?.data && Array.isArray(res.data)) {
          extracted = res.data;
        }

        this.allLeavesList = extracted;
        this.leavesList = [...this.allLeavesList];

        if (this.isAdminOrHR && this.leavesList.length > 0) {
          this.leavesList.sort((a, b) => {
            const statusA = this.getStatusText(a.status);
            const statusB = this.getStatusText(b.status);

            if (statusA === 'Pending' && statusB !== 'Pending') return -1;
            if (statusA !== 'Pending' && statusB === 'Pending') return 1;

            return (
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            );
          });
        } else if (!this.isAdminOrHR) {
          // âœ… Backend ÙŠÙØ±Ø¬Ø¹ strings: 'Approved', 'Annual'
          const approvedAnnualLeavesDays = this.allLeavesList
            .filter(
              (l: any) => l.status === 'Approved' && l.leaveType === 'Annual',
            )
            .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);
          this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
        this.isLoading = false;
        this.leavesList = [];
      },
    });
  }

  filterLeaves() {
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª
    this.leavesList = this.allLeavesList.filter((l) => {
      let matchesSearch = true;
      if (this.leaveSearchQuery) {
        const query = this.leaveSearchQuery.toLowerCase();
        const empName = (l.employeeName || '').toLowerCase();
        const empId = String(l.employeeId || '');
        const reason = (l.reason || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          reason.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedLeaveStatus) {
        matchesStatus =
          this.getStatusText(l.status).toLowerCase() ===
          this.selectedLeaveStatus.toLowerCase();
      }

      let matchesType = true;
      if (this.selectedLeaveType) {
        // Ø§Ù„Ù€ backend ÙŠØ±Ø¬Ø¹ string Ù…Ø«Ù„ "Annual" Ø£Ùˆ Ø±Ù‚Ù… Ù…Ø«Ù„ 0
        // Ù†Ø­ÙˆÙ‘Ù„ ÙƒÙ„Ø§Ù‡Ù…Ø§ Ù„Ø§Ø³Ù… ÙˆÙ†Ù‚Ø§Ø±Ù† Ø¨Ù€ case-insensitive
        const leaveTypeName = this.getLeaveTypeText(l.leaveType).toLowerCase();
        matchesType = leaveTypeName === this.selectedLeaveType.toLowerCase();
      }

      return matchesSearch && matchesStatus && matchesType;
    });

    this.currentPage = 1;
    if (this.leavesList.length > 0) {
      this.leavesList.sort((a, b) => {
        if (this.isAdminOrHR) {
          const statusA = this.getStatusText(a.status);
          const statusB = this.getStatusText(b.status);
          if (statusA === 'Pending' && statusB !== 'Pending') return -1;
          if (statusA !== 'Pending' && statusB === 'Pending') return 1;
        }
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
    }
  }

  getStatusText(statusCode: any): string {
    // âœ… Backend ÙŠÙØ±Ø¬Ø¹ string Ù…Ø¨Ø§Ø´Ø±Ø© Ù…Ù† MappingProfile (.ToString())
    if (typeof statusCode === 'string' && isNaN(Number(statusCode))) {
      return statusCode; // 'Pending' | 'Approved' | 'Rejected'
    }
    // ØªÙˆØ§ÙÙ‚ÙŠØ© Ù…Ø¹ Ø§Ù„Ù‚ÙŠÙ… Ø§Ù„Ø±Ù‚Ù…ÙŠØ© Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø©
    if (statusCode === 0 || statusCode === '0') return 'Pending';
    if (statusCode === 1 || statusCode === '1') return 'Approved';
    if (statusCode === 2 || statusCode === '2') return 'Rejected';
    return statusCode?.toString() || 'Unknown';
  }

  getLeaveTypeText(typeCode: any): string {
    // âœ… Backend ÙŠÙØ±Ø¬Ø¹ string Ù…Ø¨Ø§Ø´Ø±Ø©: 'Annual', 'Sick', 'Emergency', 'Unpaid'
    if (typeof typeCode === 'string' && isNaN(Number(typeCode))) {
      const found = this.leaveTypes.find(
        (t) => t.name.toLowerCase() === typeCode.toLowerCase(),
      );
      return found
        ? found.name
        : typeCode.charAt(0).toUpperCase() + typeCode.slice(1);
    }
    // ØªÙˆØ§ÙÙ‚ÙŠØ© Ù…Ø¹ Ø§Ù„Ù‚ÙŠÙ… Ø§Ù„Ø±Ù‚Ù…ÙŠØ©
    const type = this.leaveTypes.find((t) => t.id === Number(typeCode));
    return type ? type.name : typeCode != null ? String(typeCode) : 'Unknown';
  }

  openModal() {
    this.leaveData = { leaveType: 0, startDate: '', endDate: '', reason: '' };
    const modalEl = document.getElementById('leaveModal');
    if (modalEl) {
      this.leaveModal = new bootstrap.Modal(modalEl);
      this.leaveModal.show();
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  submitLeaveRequest() {
    // Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©
    if (this.leaveData.startDate < this.getToday()) {
      Swal.fire('Invalid Date', 'Start Date cannot be in the past.', 'warning');
      return;
    }

    if (this.leaveData.endDate < this.leaveData.startDate) {
      Swal.fire(
        'Invalid Date',
        'End Date cannot be before the Start Date.',
        'warning',
      );
      return;
    }

    this.isProcessing = true;
    const payload = {
      leaveType: Number(this.leaveData.leaveType),
      startDate: new Date(this.leaveData.startDate).toISOString(),
      endDate: new Date(this.leaveData.endDate).toISOString(),
      reason: this.leaveData.reason,
      status: 0,
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.leaveModal.hide();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.loadLeaves();
      },
      error: (err) => {
        this.isProcessing = false;
        Swal.fire(
          'Error',
          getFriendlyErrorMessage(
            err,
            'Failed to submit leave request. Please try again.',
          ),
          'warning',
        );
      },
    });
  }

  changeStatus(id: number, newStatusCode: number) {
    // ØªØºÙŠÙŠØ± Ø§Ù„Ø­Ø§Ù„Ø©
    if (newStatusCode === 2) {
      Swal.fire({
        title: 'Reject Leave Request',
        text: 'Please provide a reason for rejection:',
        input: 'textarea',
        inputPlaceholder: 'Type your reason here...',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545',
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return 'You need to write a rejection reason!';
          }
          return null;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.executeStatusChange(id, newStatusCode, result.value);
        }
      });
    } else {
      this.executeStatusChange(id, newStatusCode);
    }
  }

  private executeStatusChange(
    id: number,
    newStatusCode: number,
    rejectionReason?: string,
  ) {
    this.leaveService
      .updateLeaveStatus(id, newStatusCode, rejectionReason)
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Status changed.', 'success');
          this.loadLeaves();
        },
        error: (err) => {
          console.error('Status update error:', err);
          Swal.fire(
            'Error!',
            getFriendlyErrorMessage(
              err,
              'Failed to update leave status. Please try again.',
            ),
            'error',
          );
        },
      });
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave-form\leave-form.component.css

``css

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave-form\leave-form.component.html

``html
<div class="container mt-4" style="max-width: 600px;">
    <div class="card shadow-sm border-0 rounded-3">
        <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
            <h3 class="fw-bold text-secondary mb-0">Apply for Leave</h3>
        </div>

        <div class="card-body p-4">
            <form [formGroup]="leaveForm" (ngSubmit)="onSubmit()">

                <div class="mb-3">
                    <label class="form-label fw-bold text-muted small">Leave
                        Type</label>
                    <select class="form-select bg-light" formControlName="leaveType">
                        <option value="" disabled selected>Select Leave
                            Type</option>
                        <!-- âœ… Ø§Ø³ØªØ®Ø¯Ù… Ø£Ø±Ù‚Ø§Ù… ØªØ·Ø§Ø¨Ù‚ Backend enum: Annual=0, Sick=1, Emergency=2, Unpaid=3 -->
                        <option value="0">Annual</option>
                        <option value="1">Sick</option>
                        <option value="2">Emergency</option>
                        <option value="3">Unpaid</option>
                    </select>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold text-muted small">Start
                            Date</label>
                        <input type="date" class="form-control bg-light" formControlName="startDate">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold text-muted small">End
                            Date</label>
                        <input type="date" class="form-control bg-light" formControlName="endDate">
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-bold text-muted small">Reason</label>
                    <textarea class="form-control bg-light" formControlName="reason" rows="3"
                        placeholder="Explain your reason..."></textarea>
                </div>

                <div class="d-flex justify-content-end gap-2">
                    <a routerLink="/leave" class="btn btn-light px-4 fw-bold text-muted">Cancel</a>
                    <button type="submit" class="btn btn-primary px-5 fw-bold" [disabled]="isLoading">
                        <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                        {{ isLoading ? loadingMessage : 'Submit Request' }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave-form\leave-form.component.ts

``ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LeaveService } from '../../core/services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './leave-form.component.html',
})
export class LeaveFormComponent {
  private leaveService = inject(LeaveService);
  private router = inject(Router);

  isLoading = false;
  loadingMessage = 'Submitting...';
  private slowWarningTimer: any;

  leaveForm = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    reason: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(500),
    ]),
  });

  onSubmit() {
    if (this.leaveForm.invalid) {
      alert(
        'Please fill all required fields. Note: Reason must be at least 5 characters long.',
      );
      console.log('Form Errors:', this.leaveForm.errors);
      return;
    }

    this.isLoading = true;
    const formValue = this.leaveForm.value;

    const newLeave = {
      // âœ… Ø­ÙˆÙ‘Ù„ Ù„Ø±Ù‚Ù… Ø­ØªÙ‰ ÙŠØ·Ø§Ø¨Ù‚ Backend enum
      leaveType: Number(formValue.leaveType),
      startDate: new Date(formValue.startDate!).toISOString(),
      endDate: new Date(formValue.endDate!).toISOString(),
      reason: formValue.reason,
    };

    console.log('Sending Leave Data:', newLeave);

    // show slow-server warning after 6 seconds
    this.slowWarningTimer = setTimeout(() => {
      this.loadingMessage = 'Server is starting up, please wait a moment...';
    }, 6000);

    this.leaveService.applyLeave(newLeave).subscribe({
      next: (res) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Done!', text: 'Leave request submitted successfully.', timer: 2000, showConfirmButton: false });
        this.router.navigate(['/leave']);
      },
      error: (err) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire('Error', 'Could not submit leave request. Please try again.', 'error');
      },
    });
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\my-profile\my-profile.component.html

``html
<div class="d-flex justify-content-between align-items-center mb-4">
  <h2 class="fw-bold text-secondary">
    <i class="bi bi-person-badge-fill me-2"></i>{{ 'My Profile' | t }}
  </h2>
  <button class="btn btn-primary shadow-sm rounded-pill px-4 fw-semibold" (click)="openEditModal()" *ngIf="!isLoading">
    <i class="bi bi-pencil-square me-2"></i>{{ 'Edit Profile' | t }}
  </button>
</div>

<!-- â”€â”€â”€ Loading â”€â”€â”€ -->
@if (isLoading) {
<div class="text-center my-5">
  <div class="spinner-border text-primary" role="status"></div>
  <p class="mt-2 text-muted">Loading your profile...</p>
</div>
}

<!-- Ø¨Ø±ÙˆÙØ§ÙŠÙ„ Ø§Ù„Ø£Ø¯Ù…Ù† -->
@else if (isAdmin) {
<div class="row g-4">
  <!-- Left card: Avatar -->
  <div class="col-md-4">
    <div class="card shadow-sm border-0 h-100 text-center p-4">
      <div class="mb-3">
        <div class="profile-avatar mx-auto admin-avatar-bg">{{ initials }}</div>
      </div>
      <h4 class="fw-bold text-dark mb-1">{{ userName }}</h4>
      <p class="text-muted mb-1">{{ userRole }}</p>
      <p class="text-muted small mb-3">{{ userEmail }}</p>
      <span
        class="badge rounded-pill px-3 py-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">
        <i class="bi bi-shield-fill-check me-1"></i> System Admin
      </span>
    </div>
  </div>

  <!-- Right card: Details -->
  <div class="col-md-8">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-secondary">
          <i class="bi bi-person-lines-fill me-2 text-primary"></i>{{ 'Account Details' | t }}
        </h5>
      </div>
      <div class="card-body p-4">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-envelope me-1"></i> {{ 'Email Address' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ userEmail || 'â€”' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-person-badge me-1"></i> {{ 'Role' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ userRole }}</p>
          </div>
        </div>

        <hr class="my-4 text-muted opacity-25">

        <h5 class="fw-bold text-secondary mb-3">
          <i class="bi bi-shield-check me-2 text-primary"></i>{{ 'Permissions' | t }}
        </h5>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-people-fill text-primary fs-5"></i>
              <span class="fw-semibold small">{{ 'Employee Management' | t }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-gear-fill text-success fs-5"></i>
              <span class="fw-semibold small">{{ 'System Control' | t }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-cash-stack text-warning fs-5"></i>
              <span class="fw-semibold small">{{ 'Payroll Access' | t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

<!-- â”€â”€â”€ EMPLOYEE PROFILE â”€â”€â”€ -->
@else if (profile) {
<div class="row g-4">
  <div class="col-md-4">
    <div class="card shadow-sm border-0 h-100 text-center p-4">
      <div class="mb-3">
        <div class="profile-avatar mx-auto">{{ getProfileInitials() }}</div>
      </div>
      <h4 class="fw-bold text-dark mb-1">{{ profile.fullName }}</h4>
      <p class="text-muted mb-3">{{ profile.positionTitle || 'Employee' }}</p>
      <span
        class="badge rounded-pill px-3 py-2 bg-success bg-opacity-10 text-success border border-success border-opacity-25">
        <i class="bi bi-check-circle-fill me-1"></i> Active
      </span>
    </div>
  </div>

  <div class="col-md-8">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-secondary">
          <i class="bi bi-person-lines-fill me-2 text-primary"></i>{{ 'Personal Details' | t }}
        </h5>
      </div>
      <div class="card-body p-4">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-envelope me-1"></i> {{ 'Email Address' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.email || 'â€”' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-telephone me-1"></i> {{ 'Phone' | t }}
            </label>
            <!-- Ø±Ù‚Ù… Ø§Ù„ØªÙ„ÙÙˆÙ† -->
            <p class="fw-semibold text-dark fs-5 mb-0">
              {{ profile.phone || profile.phoneNumber || 'N/A' }}
            </p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-building me-1"></i> {{ 'Department' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.departmentName || 'N/A' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-calendar2-check me-1"></i> {{ 'Hire Date' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.hireDate | date:'longDate' }}</p>
          </div>
        </div>

        <hr class="my-4 text-muted opacity-25">

        <h5 class="fw-bold text-secondary mb-3">
          <i class="bi bi-clock-history me-2 text-info"></i>{{ 'Status' | t }}
        </h5>
        <div class="row">
          <div class="col-md-6">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center">
              <i class="bi bi-person-check-fill fs-2 text-success me-3"></i>
              <div>
                <h6 class="text-muted text-uppercase fw-bold small mb-1">{{ 'Status' | t }}</h6>
                <span class="fs-5 fw-bold text-success">{{ 'Active' | t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

<!-- â”€â”€â”€ Not linked â”€â”€â”€ -->
@else if (!isLoading && !profile && !isAdmin) {
<div class="alert alert-warning d-flex align-items-center rounded-3" role="alert">
  <i class="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
  <div>
    <h5 class="alert-heading fw-bold mb-1">{{ 'Profile Not Linked' | t }}</h5>
    Your account is not yet linked to an employee profile. Please contact your administrator.
  </div>
</div>
}

<!-- â”€â”€â”€ Edit Profile Modal â”€â”€â”€ -->
<div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg rounded-4">
      <div class="modal-header border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-dark"><i class="bi bi-person-lines-fill text-primary me-2"></i>{{ 'Edit Profile' | t }}
        </h5>
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4">
        <!-- Contact Info -->
        <h6 class="fw-bold text-secondary mb-3 small text-uppercase">{{ 'Contact Information' | t }}</h6>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">Email Address</label>
          <input type="email" class="form-control bg-light border-0 py-2" [(ngModel)]="editData.email"
            placeholder="name@example.com">
        </div>
        <div class="mb-4" *ngIf="profile">
          <label class="form-label text-muted small fw-semibold">{{ 'Phone' | t }}</label>
          <input type="text" class="form-control bg-light border-0 py-2" [(ngModel)]="editData.phone"
            placeholder="e.g. +123456789">
        </div>

        <hr class="my-4 text-muted opacity-25">

        <!-- Security -->
        <h6 class="fw-bold text-secondary mb-3 small text-uppercase">{{ 'Change Password' | t }}</h6>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'Current Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.oldPassword"
            placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'New Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.newPassword"
            placeholder="Min. 6 characters">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'Confirm New Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.confirmNewPassword"
            placeholder="Repeat new password">
        </div>
      </div>
      <div class="modal-footer border-top-0 pb-4 px-4">
        <button type="button" class="btn btn-light px-4 rounded-pill" data-bs-dismiss="modal">{{ 'Cancel' | t
          }}</button>
        <button type="button" class="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm" (click)="saveProfile()"
          [disabled]="isUpdatingProfile || isChangingPwd">
          <span *ngIf="isUpdatingProfile || isChangingPwd" class="spinner-border spinner-border-sm me-2"></span> {{
          'Save Changes' | t }}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .profile-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    line-height: 90px;
    text-align: center;
  }

  .admin-avatar-bg {
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
  }
</style>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\my-profile\my-profile.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  profile: any = null;
  isLoading: boolean = true;
  isAdmin: boolean = false;
  userName: string = '';
  userRole: string = '';
  userEmail: string = '';

  editData = { email: '', phone: '' };
  pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
  isUpdatingProfile = false;
  isChangingPwd = false;

  ngOnInit() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
    this.isAdmin = this.authService.isAdmin();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    if (this.isAdmin) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userEmail =
            payload['email'] ||
            payload[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ] ||
            '';
        } catch {}
      }
      this.isLoading = false;
    } else {
      this.loadMyProfile();
    }
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getProfileInitials(): string {
    const name = this.profile?.fullName || this.userName || 'U';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  loadMyProfile() {
    // Ø¬Ù„Ø¨ Ø¨Ø±ÙˆÙØ§ÙŠÙ„ÙŠ
    this.isLoading = true;
    this.employeeService.getMyProfile().subscribe({
      next: (res: any) => {
        this.profile = res?.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my profile:', err);
        this.isLoading = false;
      },
    });
  }

  openEditModal() {
    this.editData.email = this.profile?.email || this.userEmail || '';
    this.editData.phone =
      this.profile?.phone || this.profile?.phoneNumber || '';
    this.pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  saveProfile() {
    // Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª
    let requestsPending = 0;
    let hasError = false;

    // 1. Password Update
    if (this.pwdData.oldPassword && this.pwdData.newPassword) {
      requestsPending++;
      this.isChangingPwd = true;
      this.authService
        .changePassword({
          oldPassword: this.pwdData.oldPassword,
          newPassword: this.pwdData.newPassword,
        })
        .subscribe({
          next: () => {
            this.isChangingPwd = false;
            requestsPending--;
            this.checkDone(requestsPending, hasError);
          },
          error: (err) => {
            this.isChangingPwd = false;
            hasError = true;
            requestsPending--;
            Swal.fire(
              'Error',
              getFriendlyErrorMessage(
                err,
                'Failed to change password. Please check your current password and try again.',
              ),
              'error',
            );
            this.checkDone(requestsPending, hasError);
          },
        });
    }

    // 2. Profile Info Update
    const emailChanged =
      this.editData.email !== (this.profile?.email || this.userEmail);
    const phoneChanged =
      this.profile &&
      this.editData.phone !==
        (this.profile?.phone || this.profile?.phoneNumber);

    if (emailChanged || phoneChanged) {
      if (this.profile && this.profile.id) {
        requestsPending++;
        this.isUpdatingProfile = true;

        // Prepare updated employee object
        const updatedEmp = {
          ...this.profile,
          email: this.editData.email,
          phone: this.editData.phone,
          phoneNumber: this.editData.phone,
        };

        this.employeeService
          .updateEmployee(this.profile.id, updatedEmp)
          .subscribe({
            next: () => {
              this.isUpdatingProfile = false;
              this.profile.email = this.editData.email;
              this.profile.phone = this.editData.phone;
              this.userEmail = this.editData.email;

              requestsPending--;
              this.checkDone(requestsPending, hasError);
            },
            error: (err) => {
              this.isUpdatingProfile = false;
              hasError = true;
              requestsPending--;
              Swal.fire(
                'Error',
                getFriendlyErrorMessage(
                  err,
                  'Failed to update profile. Please try again.',
                ),
                'error',
              );
              this.checkDone(requestsPending, hasError);
            },
          });
      } else {
        // Admin without employee profile
        this.userEmail = this.editData.email;
        // There might not be an endpoint to update Admin user email alone,
        // but we update it locally for UX.
      }
    }

    if (requestsPending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private checkDone(pending: number, hasError: boolean) {
    if (pending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private closeModalAndShowSuccess() {
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\positions\positions.component.css

``css
.input-group:focus-within .input-group-text,
.input-group:focus-within .form-control,
.input-group:focus-within .form-select {
  border-color: #0d6efd;
  box-shadow: none;
}

.input-group:focus-within {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
  border-radius: 0.375rem;
}

.form-control::placeholder {
  color: #adb5bd;
  font-size: 0.9rem;
}

.max-w-4xl {
  max-width: 900px;
  margin: 0 auto;
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\positions\positions.component.html

``html
<div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold text-secondary">
        <i class="bi bi-briefcase-fill me-2"></i>{{ 'Job Positions' | t }}
    </h2>
    <button class="btn btn-primary shadow-sm fw-bold px-4"
        (click)="openModal()">
        <i class="bi bi-plus-lg me-1"></i> {{ 'Add Position' | t }}
    </button>
</div>

@if (isLoading) {
<div class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2 text-muted">Synchronizing with server...</p>
</div>
} @else {
<div class="card shadow-sm border-0">
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 text-center">
            <thead class="table-light text-uppercase small fw-bold">
                <tr>
                    <th>ID</th>
                    <th>{{ 'Job Title' | t }}</th>
                    <th>{{ 'Department' | t }}</th>
                    <th>{{ 'Salary Range (Min - Max)' | t }}</th>
                    <th>{{ 'Actions' | t }}</th>
                </tr>
            </thead>
            <tbody>
                @for (pos of positionsList; track pos.id) {
                <tr>
                    <td class="text-muted fw-bold">#{{ pos.id }}</td>
                    <td class="fw-bold text-dark">{{ pos.title }}</td>
                    <td>
                        <span
                            class="badge bg-light text-secondary border px-3 py-2 fw-semibold shadow-sm" style="font-size: 0.85rem;">
                            {{ getDepartmentName(pos.departmentId) }}
                        </span>
                    </td>
                    <td class="fw-semibold text-secondary">
                        {{ pos.salaryMin | currency }} -
                        <span class="text-success">{{ pos.salaryMax | currency
                            }}</span>
                    </td>
                    <td>
                        <button
                            class="btn btn-sm btn-outline-primary me-2 border-0 shadow-none"
                            (click)="openModal(pos)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                            class="btn btn-sm btn-outline-danger border-0 shadow-none"
                            (click)="onDelete(pos.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
                } @empty {
                <tr>
                    <td colspan="5" class="text-center py-5 text-muted">
                        <i
                            class="bi bi-briefcase fs-1 d-block mb-2 opacity-25"></i>
                        {{ 'No positions defined in the system.' | t }}
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>
</div>
}

<div class="modal fade" id="positionModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
            <div
                class="modal-header border-bottom border-primary border-4 bg-light">
                <h5 class="modal-title text-primary fw-bold">
                    <i class="bi" [class.bi-plus-circle]="!isEditMode"
                        [class.bi-pencil-square]="isEditMode"></i>
                    {{ isEditMode ? ('Modify Position' | t) : ('Create New Position' | t) }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <form #positionForm="ngForm">
                    <div class="row g-3">
                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Job
                                Title</label>
                            <input type="text" class="form-control" name="title"
                                [(ngModel)]="positionData.title" required
                                placeholder="e.g. Software Engineer">
                        </div>

                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Department
                                Assignment</label>
                            <select class="form-select" name="deptId"
                                [(ngModel)]="positionData.departmentId"
                                required>
                                <option [ngValue]="null" disabled
                                    selected>Select target department</option>
                                @for (dept of departmentsList; track dept.id) {
                                <option [ngValue]="dept.id">{{ dept.name
                                    }}</option>
                                }
                            </select>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Minimum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMin" [(ngModel)]="positionData.salaryMin"
                                min="0" required>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Maximum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMax" [(ngModel)]="positionData.salaryMax"
                                min="0" required>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer bg-light border-top-0">
                <button type="button" class="btn btn-secondary px-4 fw-bold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                    class="btn btn-primary px-4 fw-bold shadow-sm"
                    (click)="savePosition()"
                    [disabled]="positionForm.invalid || isProcessing">
                    @if(isProcessing) { <span
                        class="spinner-border spinner-border-sm me-2"></span> }
                    Confirm Action
                </button>
            </div>
        </div>
    </div>
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\positions\positions.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionService } from '../../core/services/position.service';
import { DepartmentService } from '../../core/services/department.service';
import Swal from 'sweetalert2';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './positions.component.html',
})
export class PositionsComponent implements OnInit {
  private positionService = inject(PositionService);
  private departmentService = inject(DepartmentService);

  positionsList: any[] = [];
  departmentsList: any[] = [];
  isLoading: boolean = true;
  isProcessing: boolean = false;

  positionModal: any;
  isEditMode: boolean = false;
  currentPositionId: number | null = null;

  positionData = {
    title: '',
    departmentId: null as number | null,
    salaryMin: 0,
    salaryMax: 0,
  };

  ngOnInit() {
    // Ø£ÙˆÙ„ ØªØ­Ù…ÙŠÙ„
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments() {
    // Ø¬Ù„Ø¨ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.departmentsList = Array.isArray(extracted) ? extracted : [];
      },
      error: (err) => console.error('Error fetching departments:', err),
    });
  }

  loadPositions() {
    // Ø¬Ù„Ø¨ Ø§Ù„Ù…Ù†Ø§ØµØ¨
    this.isLoading = true;
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.positionsList = Array.isArray(extracted) ? extracted : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching positions:', err);
        this.isLoading = false;
      },
    });
  }

  getDepartmentName(deptId: number): string {
    const dept = this.departmentsList.find((d) => d.id === deptId);
    return dept ? dept.name : `Dept #${deptId}`;
  }

  openModal(position: any = null) {
    // ÙØªØ­ Ø§Ù„Ù…ÙˆØ¯Ø§Ù„
    if (position) {
      this.isEditMode = true;
      this.currentPositionId = position.id;
      this.positionData = {
        title: position.title,
        departmentId: position.departmentId,
        salaryMin: position.salaryMin,
        salaryMax: position.salaryMax,
      };
    } else {
      this.isEditMode = false;
      this.currentPositionId = null;
      this.positionData = {
        title: '',
        departmentId: null,
        salaryMin: 0,
        salaryMax: 0,
      };
    }

    const modalEl = document.getElementById('positionModal');
    if (modalEl) {
      this.positionModal = new bootstrap.Modal(modalEl);
      this.positionModal.show();
    }
  }

  savePosition() {
    // Ø­ÙØ¸ Ø§Ù„Ù…Ø³Ù…Ù‰
    this.isProcessing = true;

    if (this.isEditMode && this.currentPositionId) {
      this.positionService
        .updatePosition(this.currentPositionId, this.positionData)
        .subscribe({
          next: () => this.handleSuccess('Position updated successfully'),
          error: (err) => this.handleError(err),
        });
    } else {
      this.positionService.createPosition(this.positionData).subscribe({
        next: () => this.handleSuccess('Position created successfully'),
        error: (err) => this.handleError(err),
      });
    }
  }

  onDelete(id: number) {
    // Ø­Ø°Ù Ø§Ù„Ù…Ø³Ù…Ù‰
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deletePosition(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Position has been deleted.', 'success');
            this.loadPositions();
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Failed to delete position.', 'error');
          },
        });
      }
    });
  }

  private handleSuccess(message: string) {
    this.isProcessing = false;
    this.positionModal.hide();
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    this.loadPositions();
  }

  private handleError(err: any) {
    this.isProcessing = false;
    console.error('Position save error:', err);
    Swal.fire('Error', 'Failed to save position data.', 'error');
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\salary\salary.component.css

``css
.table th {
  border-bottom: 1px solid #f3f4f6 !important;
}

.table td {
  vertical-align: middle;
  border-bottom: 1px solid #f8f9fa;
}

.form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
  background-color: #ffffff !important;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.table-responsive::-webkit-scrollbar {
  height: 6px;
}
.table-responsive::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 4px;
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\salary\salary.component.html

``html
<div class="page-container p-4">



    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">{{ 'Salaries' | t }}</h3>
            <p class="text-muted small mb-0">{{ 'View and manage employee payroll records' | t }}</p>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0"
                    placeholder="Search by name, ID, or amount..." [(ngModel)]="salarySearchQuery"
                    (input)="filterSalaries()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false" title="Filter Salaries">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">Filter Options</h6>

                    <div class="mb-3">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Year' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedYear"
                            (change)="filterSalaries()">
                            <option value="">All Years</option>
                            <option *ngFor="let yr of uniqueYears" [value]="yr">{{ yr }}</option>
                        </select>
                    </div>

                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Month' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedMonth"
                            (change)="filterSalaries()">
                            <option value="">All Months</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
            </div>

            <button *ngIf="isAdmin" class="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                (click)="openModal()">
                <i class="bi bi-plus-lg me-2"></i> {{ 'Add Salary' | t }}
            </button>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <tr>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Month' | t }}/{{ 'Year' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold">{{ 'Base Salary' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-success">{{ 'Allowances' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-danger">{{ 'Deductions' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-primary">{{ 'Net Pay' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-end text-nowrap">{{ 'Actions' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td colspan="7" class="text-center py-5 text-muted">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && salariesList.length === 0">
                        <td [colSpan]="isAdminOrHR ? 7 : 6" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center"
                                    style="width: 80px; height: 80px;">
                                    <i class="bi bi-wallet2 text-secondary fs-1"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">{{ 'No Data' | t }}</h5>
                                <p class="text-muted small mb-0">{{ 'No Data' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let salary of paginatedSalaries">
                        <!-- Ø§Ø³Ù… Ø§Ù„Ù…ÙˆØ¸Ù Ù„Ù„Ø£Ø¯Ù…Ù† ÙˆØ§Ù„Ù€ hr -->
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-4 fw-bold text-dark">
                            {{ salary.employeeName || '#' + salary.employeeId }}
                        </td>
                        <td data-label="Period" class="py-3 px-4">
                            <span class="badge bg-light text-dark border">{{
                                salary.month | number:'2.0' }} / {{ salary.year
                                }}</span>
                            <div class="text-muted mt-1" style="font-size: 0.7rem;">Eff: {{
                                salary.effectiveDate | date:'dd MMM yyyy'
                                }}</div>
                        </td>
                        <td data-label="Base Salary" class="py-3 px-3 text-secondary">${{ salary.baseAmount }}</td>
                        <td data-label="Allowances" class="py-3 px-3 text-success fw-medium">+${{ salary.allowances }}
                        </td>
                        <td data-label="Deductions" class="py-3 px-3 text-danger fw-medium">-${{ salary.deductions }}
                        </td>
                        <td data-label="Net Pay" class="py-3 px-3">
                            <span class="fw-bold text-primary fs-6">${{ salary.netAmount }}</span>
                            <div class="text-muted" style="font-size: 0.7rem;">Before Deductions: ${{ salary.grossAmount
                                }}</div>
                        </td>
                        <!-- ØµÙ„Ø§Ø­ÙŠØ§Øª Ø£Ø¯Ù…Ù† Ø¨Ø³ -->
                        <td data-label="Actions" class="py-3 px-4 text-end text-nowrap actions-cell">
                            <button class="btn btn-sm btn-outline-danger rounded-circle shadow-sm me-2"
                                (click)="downloadPayslip(salary)" title="Download Payslip (PDF)">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </button>
                            <button *ngIf="isAdmin" class="btn btn-sm btn-light text-primary rounded-circle shadow-sm"
                                (click)="openModal(salary)" title="Edit Record">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="salariesList.length > 0"
            class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage,
                salariesList.length) }} of {{ salariesList.length }} entries
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="modal fade" id="salaryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
            <div class="modal-header border-bottom-0 pt-4 pb-0 px-4">
                <h5 class="modal-title fw-bold text-dark">
                    <i class="bi"
                        [ngClass]="isEditMode ? 'bi-pencil-square text-primary' : 'bi-plus-circle text-primary'"></i>
                    {{ isEditMode ? ' Edit Salary Record' : ' Add New Salary' }}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <form #salaryForm="ngForm">

                    <div class="mb-4 position-relative">
                        <label class="form-label fw-semibold text-secondary small">Employee <span
                                class="text-danger">*</span></label>
                        <div class="input-group">
                            <span class="input-group-text bg-light border-end-0"><i class="bi bi-person"></i></span>
                            <input type="text" class="form-control bg-light border-start-0" name="employeeSearchText"
                                [(ngModel)]="employeeSearchText" (ngModelChange)="onEmployeeSearchChange($event)"
                                (focus)="showEmployeeDropdown = true" (blur)="hideDropdownWithDelay()"
                                autocomplete="off" required placeholder="Search by name or ID...">
                        </div>

                        <!-- Custom Dropdown -->
                        <div class="dropdown-menu w-100 shadow-lg border-0 rounded-4 mt-2 py-2"
                            [class.show]="showEmployeeDropdown"
                            style="position: absolute; top: 100%; left: 0; max-height: 250px; overflow-y: auto; z-index: 1050;">

                            <ng-container *ngIf="filteredEmployeesList.length > 0; else noEmployees">
                                <button type="button"
                                    class="dropdown-item d-flex justify-content-between align-items-center py-2 px-3 border-bottom border-light"
                                    *ngFor="let emp of filteredEmployeesList" (mousedown)="selectEmployee(emp)"
                                    style="transition: background-color 0.2s;">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                            style="width: 36px; height: 36px; font-size: 13px;">
                                            {{ emp.firstName[0] }}{{ emp.lastName[0] }}
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="fw-semibold text-dark" style="font-size: 14px;">{{
                                                emp.firstName }} {{ emp.lastName }}</span>
                                        </div>
                                    </div>
                                    <span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-2"
                                        style="font-size: 11px;">ID: {{ emp.id }}</span>
                                </button>
                            </ng-container>

                            <ng-template #noEmployees>
                                <div class="text-center py-4 text-muted">
                                    <i class="bi bi-search mb-2 fs-4 text-black-50"></i>
                                    <p class="mb-0 small fw-semibold">No employees found.</p>
                                </div>
                            </ng-template>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label class="form-label fw-semibold text-secondary small">Month
                                <span class="text-danger">*</span></label>
                            <input type="number" class="form-control bg-light border-0" name="month"
                                [(ngModel)]="salaryData.month" required min="1" max="12">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-semibold text-secondary small">Year
                                <span class="text-danger">*</span></label>
                            <input type="number" class="form-control bg-light border-0" name="year"
                                [(ngModel)]="salaryData.year" required min="2000">
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-semibold text-secondary small">Base
                            Salary ($) <span class="text-danger">*</span></label>
                        <input type="number" class="form-control form-control-lg bg-light border-0" name="baseAmount"
                            [(ngModel)]="salaryData.baseAmount" required min="0">
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label class="form-label fw-semibold text-success small">Allowances
                                (+) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control border-success border-opacity-25 bg-light"
                                name="allowances" [(ngModel)]="salaryData.allowances" required min="0">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-semibold text-danger small">Deductions
                                (-) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control border-danger border-opacity-25 bg-light"
                                name="deductions" [(ngModel)]="salaryData.deductions" required min="0">
                        </div>
                    </div>

                    <div class="mb-2">
                        <label class="form-label fw-semibold text-secondary small">Effective
                            Date <span class="text-danger">*</span></label>
                        <input type="date" class="form-control bg-light border-0" name="effectiveDate"
                            [(ngModel)]="salaryData.effectiveDate" required>
                    </div>

                </form>
            </div>
            <div class="modal-footer border-top-0 pb-4 px-4">
                <button type="button" class="btn btn-light px-4 rounded-3 fw-semibold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary px-4 rounded-3 fw-semibold" (click)="saveSalary()"
                    [disabled]="salaryForm.invalid || isProcessing || !salaryData.employeeId">
                    <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                    {{ isProcessing ? 'Saving...' : 'Save Record' }}
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .cursor-pointer {
        cursor: pointer;
    }

    /* Mobile Responsive Cards for Table */
    @media screen and (max-width: 768px) {

        .table-responsive table,
        .table-responsive thead,
        .table-responsive tbody,
        .table-responsive th,
        .table-responsive td,
        .table-responsive tr {
            display: block;
        }

        .table-responsive thead tr {
            display: none;
            /* Hide header row */
        }

        .table-responsive tr {
            border: 1px solid #e8ecf0;
            border-radius: 0.75rem;
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .table-responsive td {
            border: none;
            border-bottom: 1px solid #f0f2f5;
            position: relative;
            padding-left: 45% !important;
            text-align: right !important;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            min-height: 50px;
        }

        .table-responsive td:last-child {
            border-bottom: 0;
        }

        .table-responsive td::before {
            content: attr(data-label);
            position: absolute;
            left: 1rem;
            width: 40%;
            text-align: left;
            font-weight: 700;
            color: #8592a3;
            font-size: 0.75rem;
            text-transform: uppercase;
            top: 50%;
            transform: translateY(-50%);
        }

        .actions-cell {
            justify-content: flex-end !important;
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
        }
    }
</style>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\salary\salary.component.ts

``ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ù„Ø§Ø²Ù… Ù„Ù„Ù€ forms
import { SalaryService } from '../../core/services/salary.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './salary.component.html',
})
export class SalaryComponent implements OnInit {
  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  allSalariesList: any[] = [];
  salariesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false; // Ø£Ø¯Ù…Ù† (ÙŠØ¶ÙŠÙ ÙˆÙŠØ¹Ø¯Ù„)
  isAdminOrHR: boolean = false; // Ø£Ø¯Ù…Ù† Ø£Ùˆ hr (ÙŠØ´ÙˆÙ Ø¨Ø³)
  isProcessing: boolean = false;

  salaryModal: any;
  isEditMode: boolean = false;
  currentSalaryId: number | null = null;

  employeesList: any[] = [];
  filteredEmployeesList: any[] = [];
  showEmployeeDropdown: boolean = false;
  employeeSearchText: string = '';

  salarySearchQuery: string = '';
  selectedYear: string = '';
  selectedMonth: string = '';
  uniqueYears: number[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedSalaries() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.salariesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.salariesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  salaryData = {
    employeeId: null as number | null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    baseAmount: 0,
    allowances: 0,
    deductions: 0,
    effectiveDate: new Date().toISOString().split('T')[0],
  };

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadSalaries();
    if (this.isAdmin) {
      this.loadEmployees();
    }
  }

  loadEmployees() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.employeesList = Array.isArray(extractedData) ? extractedData : [];
        this.filteredEmployeesList = [...this.employeesList];
      },
      error: (err: any) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  onEmployeeSearchChange(val: string) {
    this.showEmployeeDropdown = true;
    if (!val) {
      this.filteredEmployeesList = [...this.employeesList];
      this.salaryData.employeeId = null;
      return;
    }

    const query = val.toLowerCase();
    this.filteredEmployeesList = this.employeesList.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const idStr = String(emp.id);
      return fullName.includes(query) || idStr.includes(query);
    });

    // Reset selected ID if typing changes
    this.salaryData.employeeId = null;
  }

  selectEmployee(emp: any) {
    this.salaryData.employeeId = emp.id;
    this.employeeSearchText = `${emp.firstName} ${emp.lastName}`;
    this.showEmployeeDropdown = false;
  }

  hideDropdownWithDelay() {
    setTimeout(() => {
      this.showEmployeeDropdown = false;
    }, 200);
  }

  loadSalaries() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø±ÙˆØ§ØªØ¨
    this.isLoading = true;
    const request = this.isAdminOrHR
      ? this.salaryService.getAllSalaries()
      : this.salaryService.getMySalaries();

    request.subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.allSalariesList = Array.isArray(extractedData)
          ? extractedData
          : [];
        this.salariesList = [...this.allSalariesList];

        const years = this.allSalariesList
          .map((s) => s.year)
          .filter((y) => y != null);
        this.uniqueYears = Array.from(new Set(years))
          .sort()
          .reverse() as number[];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salaries:', err);
        this.isLoading = false;
      },
    });
  }

  filterSalaries() {
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ø±ÙˆØ§ØªØ¨
    this.salariesList = this.allSalariesList.filter((s) => {
      let matchesSearch = true;
      if (this.salarySearchQuery) {
        const query = this.salarySearchQuery.toLowerCase();
        const empName = (s.employeeName || '').toLowerCase();
        const empId = String(s.employeeId || '');
        const baseAmt = String(s.baseAmount || '');
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          baseAmt.includes(query);
      }

      let matchesYear = true;
      if (this.selectedYear) {
        matchesYear = String(s.year) === this.selectedYear;
      }

      let matchesMonth = true;
      if (this.selectedMonth) {
        matchesMonth = String(s.month) === this.selectedMonth;
      }

      return matchesSearch && matchesYear && matchesMonth;
    });

    if (this.salariesList.length > 0) {
      this.salariesList.sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year;
        }
        return b.month - a.month;
      });
    }

    this.currentPage = 1; // Reset to first page
  }

  openModal(salary: any = null) {
    if (salary) {
      this.isEditMode = true;
      this.currentSalaryId = salary.id;
      this.salaryData = {
        employeeId: salary.employeeId,
        month: salary.month,
        year: salary.year,
        baseAmount: salary.baseAmount,
        allowances: salary.allowances,
        deductions: salary.deductions,
        effectiveDate: salary.effectiveDate
          ? salary.effectiveDate.split('T')[0]
          : '',
      };
      const emp = this.employeesList.find((e) => e.id === salary.employeeId);
      this.employeeSearchText = emp
        ? `${emp.firstName} ${emp.lastName}`
        : salary.employeeId
          ? String(salary.employeeId)
          : '';
    } else {
      this.isEditMode = false;
      this.currentSalaryId = null;
      this.employeeSearchText = '';
      this.salaryData = {
        employeeId: null,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        baseAmount: 0,
        allowances: 0,
        deductions: 0,
        effectiveDate: new Date().toISOString().split('T')[0],
      };
    }

    this.filteredEmployeesList = [...this.employeesList];
    this.showEmployeeDropdown = false;

    const modalEl = document.getElementById('salaryModal');
    if (modalEl) {
      this.salaryModal = new bootstrap.Modal(modalEl);
      this.salaryModal.show();
    }
  }

  saveSalary() {
    // Ø­ÙØ¸ Ø§Ù„Ø±Ø§ØªØ¨
    this.isProcessing = true;

    const isoDate = new Date(this.salaryData.effectiveDate).toISOString();

    const base = Number(this.salaryData.baseAmount) || 0;
    const allow = Number(this.salaryData.allowances) || 0;
    const deduct = Number(this.salaryData.deductions) || 0;

    const calculatedGross = base + allow;
    const calculatedNet = calculatedGross - deduct;

    if (this.isEditMode && this.currentSalaryId) {
      const updatePayload = {
        baseAmount: base,
        allowances: allow,
        deductions: deduct,
        grossAmount: calculatedGross,
        netAmount: calculatedNet,
        effectiveDate: isoDate,
      };

      this.salaryService
        .updateSalary(this.currentSalaryId, updatePayload)
        .subscribe({
          next: () => this.handleSuccess('Salary updated successfully'),
          error: (err) => this.handleError(err),
        });
    } else {
      const createPayload = {
        ...this.salaryData,
        grossAmount: calculatedGross,
        netAmount: calculatedNet,
        effectiveDate: isoDate,
      };

      this.salaryService.createSalary(createPayload).subscribe({
        next: () => this.handleSuccess('Salary record added successfully'),
        error: (err) => this.handleError(err),
      });
    }
  }

  private handleSuccess(message: string) {
    this.isProcessing = false;
    this.salaryModal.hide();
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    this.loadSalaries();
  }

  private handleError(err: any) {
    this.isProcessing = false;
    console.error('Salary save error:', err);
    Swal.fire(
      'Error',
      'Failed to save salary data. Check console for details.',
      'error',
    );
  }

  downloadPayslip(salary: any) {
    // ØªÙ†Ø²ÙŠÙ„ ÙƒØ´Ù Ø§Ù„Ø±Ø§ØªØ¨
    const doc = new jsPDF();

    // Add Header
    doc.setFontSize(22);
    doc.setTextColor(13, 110, 253);
    doc.text('Kawadir HRMS', 14, 20);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Salary Payslip', 14, 30);

    const today = new Date();
    const dateGen = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date Generated: ${dateGen}`, 14, 38);

    const empName = salary.employeeName || `Employee #${salary.employeeId}`;
    const period = `${salary.month} / ${salary.year}`;

    const effObj = new Date(salary.effectiveDate);
    const effDate = `${effObj.getFullYear()}-${String(effObj.getMonth() + 1).padStart(2, '0')}-${String(effObj.getDate()).padStart(2, '0')}`;

    // Employee Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Employee Name: ${empName}`, 14, 50);
    doc.text(`Payroll Period: ${period}`, 14, 58);
    doc.text(`Effective Date: ${effDate}`, 14, 66);

    // Salary Details Table
    autoTable(doc, {
      startY: 75,
      head: [['Description', 'Amount (JD)']],
      body: [
        ['Base Salary', `${salary.baseAmount} JD`],
        ['Allowances', `+${salary.allowances} JD`],
        ['Gross Salary', `${salary.grossAmount} JD`],
        ['Deductions', `-${salary.deductions} JD`],
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [240, 242, 245],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      bodyStyles: { textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [252, 252, 252] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 130;

    // Net Pay Highlight
    doc.setFontSize(14);
    doc.setTextColor(25, 135, 84);
    doc.setFont('helvetica', 'bold');
    doc.text(`Net Pay: ${salary.netAmount} JD`, 14, finalY + 15);

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'This is a system generated payslip and requires no signature.',
      14,
      finalY + 40,
    );

    // Download
    const fileName = `Payslip_${empName.replace(/ /g, '_')}_${salary.month}_${salary.year}.pdf`;
    doc.save(fileName);
  }
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\header\header.component.css

``css
/* â”€â”€ Settings Button â”€â”€ */
.settings-btn {
  transition: transform 0.3s ease;
}

.settings-btn:hover {
  transform: rotate(90deg);
}

.settings-btn:hover i {
  color: #0d6efd !important;
}

/* â”€â”€ Settings Panel â”€â”€ */
.settings-panel {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* â”€â”€ Settings Icon Circle â”€â”€ */
.settings-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  color: #f39c12;
  transition: all 0.3s ease;
}

.settings-icon-circle.active {
  background: linear-gradient(135deg, #2d3436, #636e72);
  color: #ffeaa7;
}

.settings-icon-circle.lang {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
}

/* â”€â”€ Language Toggle Button â”€â”€ */
.lang-toggle-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border: none;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.lang-toggle-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
  color: #fff;
}

/* â”€â”€ Dark Mode Toggle Switch â”€â”€ */
.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.cursor-pointer {
  cursor: pointer;
}

/* â”€â”€ Sticky Header â”€â”€ */
.header-bar {
  position: sticky;
  top: 0;
  z-index: 1020;
}

``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\header\header.component.html

``html
<nav class="navbar navbar-expand bg-white border-bottom shadow-sm px-4 py-2 header-bar">
    <div class="container-fluid px-2">
        <div class="d-flex align-items-center gap-3 ms-2">
            <button
                class="btn btn-light border-0 shadow-none d-flex align-items-center justify-content-center p-2"
                (click)="toggleSidebar()">
                <i class="bi bi-list fs-4 text-secondary"></i>
            </button>
        </div>

        <ul class="navbar-nav ms-auto align-items-center flex-row">

            <!-- âœ… Settings Dropdown -->
            <li class="nav-item me-3 dropdown">
                <button
                    class="btn btn-light btn-sm border-0 shadow-none settings-btn"
                    id="settingsDropdown" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-gear-fill fs-5 text-secondary"></i>
                </button>

                <div class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 p-0 settings-panel overflow-hidden"
                    aria-labelledby="settingsDropdown"
                    style="width: 280px;">

                    <!-- Header -->
                    <div class="p-3 border-bottom" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-gear-wide-connected text-white fs-5"></i>
                            <span class="fw-bold text-white">{{ 'Settings' | t }}</span>
                        </div>
                    </div>

                    <!-- Theme Toggle -->
                    <div class="px-3 py-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="settings-icon-circle" [class.active]="settingsService.isDarkMode">
                                    <i class="bi" [ngClass]="settingsService.isDarkMode ? 'bi-moon-stars-fill' : 'bi-sun-fill'"></i>
                                </div>
                                <div>
                                    <p class="mb-0 fw-semibold small text-dark">{{ 'Theme' | t }}</p>
                                    <p class="mb-0 text-muted" style="font-size: 0.7rem;">
                                        {{ settingsService.isDarkMode ? ('Dark Mode' | t) : ('Light Mode' | t) }}
                                    </p>
                                </div>
                            </div>
                            <div class="form-check form-switch mb-0">
                                <input class="form-check-input cursor-pointer" type="checkbox" role="switch"
                                    id="themeToggle"
                                    [checked]="settingsService.isDarkMode"
                                    (change)="settingsService.toggleTheme()"
                                    style="width: 2.5em; height: 1.25em;">
                            </div>
                        </div>
                    </div>

                    <!-- Language Toggle -->
                    <div class="px-3 py-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="settings-icon-circle lang">
                                    <i class="bi bi-translate"></i>
                                </div>
                                <div>
                                    <p class="mb-0 fw-semibold small text-dark">{{ 'Language' | t }}</p>
                                    <p class="mb-0 text-muted" style="font-size: 0.7rem;">
                                        {{ settingsService.language === 'ar' ? 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©' : 'English' }}
                                    </p>
                                </div>
                            </div>
                            <button class="btn btn-sm px-3 py-1 rounded-pill fw-semibold lang-toggle-btn"
                                (click)="settingsService.toggleLanguage(); $event.stopPropagation()">
                                {{ settingsService.language === 'ar' ? 'EN' : 'AR' }}
                            </button>
                        </div>
                    </div>
                </div>
            </li>

            <!-- Notifications Dropdown -->
            <li class="nav-item me-4 dropdown">
                <button
                    class="btn btn-light btn-sm border-0 position-relative shadow-none"
                    id="notificationDropdown" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-bell-fill fs-5 text-secondary"></i>

                    @if (unreadCount > 0) {
                    <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ unreadCount }}
                    </span>
                    }
                </button>

                <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0"
                    aria-labelledby="notificationDropdown"
                    style="width: 320px; max-height: 400px; overflow-y: auto;">

                    <li
                        class="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-dark">{{ 'Notifications' | t }}</span>
                        @if (unreadCount > 0) {
                        <span class="badge bg-primary rounded-pill">{{
                            unreadCount }} {{ 'New' | t }}</span>
                        }
                    </li>

                    @for (note of notifications; track note.id) {
                    <li>
                        <a class="dropdown-item py-3 border-bottom"
                            href="javascript:void(0)"
                            [class.bg-light]="!note.isRead"
                            (click)="markAsRead(note)">

                            <div
                                class="d-flex w-100 justify-content-between align-items-center mb-1">
                                <h6 class="mb-0 text-truncate fw-bold text-dark"
                                    style="max-width: 200px;">
                                    {{ note.title || ('System Alert' | t) }}
                                </h6>
                                <small class="text-muted"
                                    style="font-size: 0.75rem;">{{
                                    note.createdAt | date:'shortTime' }}</small>
                            </div>

                            <p class="mb-0 text-secondary text-wrap"
                                style="font-size: 0.85rem;">
                                {{ note.message }}
                            </p>
                        </a>
                    </li>
                    } @empty {
                    <li class="p-4 text-center text-muted">
                        <i
                            class="bi bi-bell-slash fs-3 d-block mb-2 text-light-gray"></i>
                        {{ 'No new notifications' | t }}
                    </li>
                    }
                </ul>
            </li>

            <li class="nav-item">
                <div class="d-flex align-items-center">

                </div>
            </li>

        </ul>
    </div>
</nav>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\header\header.component.ts

``ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar.service';
import { SettingsService } from '../../core/services/settings.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);

  // âœ… public Ø­ØªÙ‰ Ù†Ø³ØªØ®Ø¯Ù…Ù‡ ÙÙŠ Ø§Ù„Ù€ template
  settingsService = inject(SettingsService);

  notifications: any[] = [];
  unreadCount: number = 0;
  private pollingSub?: Subscription;

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit() {
    this.loadNotifications();
    this.pollingSub = interval(5000).subscribe(() => {
      this.loadNotifications();
    });
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.items) extracted = res.items;

        this.notifications = extracted;
        this.unreadCount = this.notifications.filter((n) => !n.isRead).length;
      },
      error: (err) => console.error('Error fetching notifications:', err),
    });
  }

  markAsRead(notification: any) {
    if (notification.isRead) {
      this.navigateBasedOnNotification(notification);
      return;
    }

    this.notificationService.markAsRead(notification.id).subscribe({
      next: () => {
        notification.isRead = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.navigateBasedOnNotification(notification);
      },
      error: (err) => console.error('Error marking as read:', err),
    });
  }

  private navigateBasedOnNotification(notif: any) {
    const type = notif.type || '';
    const msg = (notif.message || '').toLowerCase();

    if (
      type.includes('Leave') ||
      msg.includes('leave') ||
      msg.includes('Ù…ØºØ§Ø¯Ø±Ø©') ||
      msg.includes('Ø¥Ø¬Ø§Ø²Ø©')
    ) {
      this.router.navigate(['/leave']);
    } else if (
      type.includes('Salary') ||
      msg.includes('salary') ||
      msg.includes('Ø±Ø§ØªØ¨')
    ) {
      this.router.navigate(['/salary']);
    } else if (
      type.includes('Clock') ||
      msg.includes('attendance') ||
      msg.includes('Ø­Ø¶ÙˆØ±')
    ) {
      this.router.navigate(['/attendance']);
    }
  }
}


``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\sidebar\sidebar.component.css

``css
.sidebar {
  width: var(--sidebar-width, 260px);
  min-width: 200px;
  max-width: 400px;
  background-color: var(--color-surface-2, #f2f3f5);
  border-right: 1px solid var(--color-border, #e5e7eb);
  color: var(--color-text, #333);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --sidebar-scale: 1;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(30px * var(--sidebar-scale)) calc(20px * var(--sidebar-scale)) calc(20px * var(--sidebar-scale));
}

.sidebar-logo-wrap {
  width: calc(45px * var(--sidebar-scale));
  height: calc(45px * var(--sidebar-scale));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--color-surface, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.sidebar-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-brand-name {
  font-size: calc(1.35rem * var(--sidebar-scale));
  font-weight: 800;
  color: var(--color-text, #111);
  letter-spacing: 0.5px;
  line-height: 1;
  transition: color 0.3s ease;
}

.sidebar-brand-sub {
  font-size: calc(0.65rem * var(--sidebar-scale));
  color: var(--color-text-label, #888);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
  transition: color 0.3s ease;
}

.sidebar-nav {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 calc(14px * var(--sidebar-scale));
}

.sidebar-nav::-webkit-scrollbar { width: 4px; }
.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 20px;
}

.sidebar-nav li { margin-bottom: 4px; }

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--sidebar-scale));
  padding: calc(10px * var(--sidebar-scale)) calc(12px * var(--sidebar-scale));
  font-size: calc(0.95rem * var(--sidebar-scale));
  color: var(--color-link, #5f6368);
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav a i {
  font-size: calc(1.1rem * var(--sidebar-scale));
  color: var(--color-link-icon, #7f838a);
  transition: color 0.2s;
}

.sidebar-nav a:hover {
  background-color: var(--color-link-hover-bg, #e5e7eb);
  color: var(--color-link-hover, #111);
}

.sidebar-nav a:hover i {
  color: var(--color-link-hover, #333);
}

.sidebar-nav a.active {
  background-color: var(--color-link-hover-bg, #e5e7eb);
  color: var(--color-link-hover, #111);
  font-weight: 600;
}

.sidebar-nav a.active i {
  color: var(--color-link-hover, #111);
}

.section-title {
  padding: calc(20px * var(--sidebar-scale)) calc(12px * var(--sidebar-scale)) calc(8px * var(--sidebar-scale));
  font-size: calc(0.75rem * var(--sidebar-scale));
  text-transform: uppercase;
  color: var(--color-text-label, #9ca3af);
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  margin-top: auto;
  padding: calc(16px * var(--sidebar-scale));
  border-top: 1px solid var(--color-border, #e5e7eb);
  transition: border-color 0.3s ease;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(10px * var(--sidebar-scale));
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 10px;
}

.user-profile:hover {
  background-color: var(--color-surface-3, #e5e7eb);
}

.avatar-initials {
  width: calc(38px * var(--sidebar-scale));
  height: calc(38px * var(--sidebar-scale));
  border-radius: 50%;
  background: var(--color-avatar-bg, #d1d5db);
  color: var(--color-avatar-text, #111);
  font-weight: 600;
  font-size: calc(14px * var(--sidebar-scale));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.user-info { white-space: nowrap; overflow: hidden; }

.user-info .name {
  margin: 0;
  font-weight: 600;
  color: var(--color-text, #111);
  font-size: calc(0.9rem * var(--sidebar-scale));
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: color 0.3s ease;
}

.user-info .status {
  margin: 0;
  font-size: calc(0.75rem * var(--sidebar-scale));
  color: var(--color-text-muted, #6b7280);
  transition: color 0.3s ease;
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: calc(10px * var(--sidebar-scale));
  background: transparent;
  border: 1px solid var(--color-logout-border, #d1d5db);
  color: var(--color-logout-text, #4b5563);
  border-radius: 8px;
  font-weight: 500;
  font-size: calc(0.9rem * var(--sidebar-scale));
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background-color: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

.sidebar-resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  cursor: ew-resize;
  z-index: 10;
  background-color: transparent;
  transition: background-color 0.2s;
}

.sidebar-resizer:hover,
.sidebar-resizer.active {
  background-color: var(--color-border, #d1d5db);
}
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\sidebar\sidebar.component.html

``html
<div class="sidebar" #sidebar>

    <!-- â”€â”€ Brand â”€â”€ -->
    <div class="sidebar-brand" style="cursor: pointer;" routerLink="/dashboard"
        (click)="closeMobileSidebar()">
        <div class="sidebar-logo-wrap">
            <img src="kawadir-logo.png" alt="Kawadir" class="sidebar-logo">
        </div>
        <div class="sidebar-brand-text">
            <span class="sidebar-brand-name">Kawadir</span>
            <span class="sidebar-brand-sub">{{ 'HR Management' | t }}</span>
        </div>
    </div>

    <!-- â”€â”€ Navigation â”€â”€ -->
    <nav class="sidebar-nav">
        <ul>
            <li><a routerLink="/dashboard" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-house"></i> {{ 'Dashboard' | t }}</a></li>
            <li><a routerLink="/my-profile" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-person"></i> {{ 'My Profile' | t
                    }}</a></li>
            <li><a routerLink="/employees" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-people"></i> {{ 'Employees' | t }}</a></li>
            <li><a routerLink="/leave" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-calendar2-check"></i> {{ 'Leave Requests' |
                    t }}</a></li>
            <li><a routerLink="/attendance" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-clock-history"></i> {{ 'Attendance' | t
                    }}</a></li>
            <li><a routerLink="/salary" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-cash-stack"></i> {{ 'Salaries' | t
                    }}</a></li>

            @if (isAdmin) {
            <li class="section-title">{{ 'System Control' | t }}</li>
            <li><a routerLink="/departments" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-diagram-3"></i> {{ 'Departments' | t
                    }}</a></li>
            <li><a routerLink="/positions" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-briefcase"></i> {{ 'Positions' | t
                    }}</a></li>
            <li><a routerLink="/register" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-person-plus"></i> {{ 'Register User' | t }}
                </a></li>
            }
        </ul>
    </nav>

    <!-- â”€â”€ Footer (Profile + Logout) â”€â”€ -->
    <div class="sidebar-footer">
        <div class="user-profile" routerLink="/my-profile"
            (click)="closeMobileSidebar()">
            <div class="avatar-initials">{{ initials }}</div>
            <div class="user-info">
                <p class="name">{{ userName }}</p>
                <p class="status">{{ userRole }}</p>
            </div>
        </div>
        <button class="btn-logout" (click)="onLogout()">
            <i class="bi bi-box-arrow-right"></i> <span>{{ 'Logout' | t
                }}</span>
        </button>
    </div>

    <!-- Resizer Handle -->
    <div class="sidebar-resizer" [class.active]="isResizing"
        (mousedown)="startResize($event)"></div>
</div>
``

## D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\sidebar\sidebar.component.ts

``ts
import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { EmployeeService } from '../../core/services/employee.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private employeeService = inject(EmployeeService);

  isAdmin: boolean = false;
  userName: string = 'User';
  userRole: string = 'Employee';

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  isResizing = false;

  startResize(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault(); // Ù…Ø§ Ù†Ø­Ø¯Ø¯ Ù†Øµ
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const newWidth = event.clientX;
    // Ù†Ø­ØµØ± Ø§Ù„Ø¹Ø±Ø¶
    if (newWidth >= 200 && newWidth <= 400) {
      this.sidebarRef.nativeElement.style.width = `${newWidth}px`;

      // Ù†Ø­Ø¯Ù‘Ø« Ø§Ù„Ù…ØªØºÙŠØ± Ø§Ù„Ø¹Ø§Ù…
      document.documentElement.style.setProperty(
        '--sidebar-width',
        `${newWidth}px`,
      );

      // Ø³ÙƒÙŠÙ„ Ø¹Ù„Ù‰ 260
      const scale = newWidth / 260;
      this.sidebarRef.nativeElement.style.setProperty(
        '--sidebar-scale',
        scale.toString(),
      );
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    this.employeeService.getMyProfile().subscribe({
      next: (profile) => {
        if (profile && profile.positionTitle) {
          this.userRole = profile.positionTitle;
        }
      },
      error: () => {}, // Ø·Ù†Ù‘Ø´ Ø§Ù„Ø£Ø®Ø·Ø§Ø¡
    });
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  closeMobileSidebar() {
    this.sidebarService.closeMobileSidebar();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

``

## D:\HRMS-Team\Application\Services\Implementations\AttendanceService.cs

``cs
using Application.Common;
using Application.DTOs.Attendance;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/AttendanceService.cs
    public class AttendanceService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService) : IAttendanceService
    {
        public async Task<PagedResult<AttendanceDto>> GetAllAsync(
            int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .Where(a => a.EmployeeId == employeeId)
                           .OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<AttendanceDto?> GetByIdAsync(int id)
        {
            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee)
                                      .FirstOrDefaultAsync(a => a.Id == id);

            return attendance is null ? null : mapper.Map<AttendanceDto>(attendance);
        }

        public async Task<AttendanceDto> ClockInAsync(int employeeId, ClockInDto dto)
        {
            // âœ… Fix DateTime Kind
            var date = DateTime.SpecifyKind(dto.Date.Date, DateTimeKind.Utc);

            // â”€â”€ 1. ØªØ­Ù‚Ù‚ Ù…Ù† ÙˆØ¬ÙˆØ¯ session Ù…ÙØªÙˆØ­Ø© (Working) Ù…Ù† Ø£ÙŠ ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚
            var openSession = await uow.Repository<Attendance>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(a =>
                                            a.EmployeeId == employeeId &&
                                            a.ClockOut == null);

            if (openSession != null)
            {
                // â”€â”€ Auto Clock-out ØªÙ„Ù‚Ø§Ø¦ÙŠ: Ù†ØºÙ„Ù‚ Ø§Ù„Ù€ session Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø© Ø¨Ù€ 23:59 Ù…Ù† Ù†ÙØ³ ÙŠÙˆÙ…Ù‡Ø§
                var autoClockOut = new TimeOnly(23, 59, 0);

                // Ø¥Ø°Ø§ Ø§Ù„Ù€ session Ù‡ÙŠ Ù…Ù† Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ… Ø§Ù„Ù…Ø·Ù„ÙˆØ¨ØŒ Ø§Ø±ÙØ¶ ÙˆÙ‚Ù„ Ù„Ù‡ ÙŠØ¹Ù…Ù„ Clock Out Ø£ÙˆÙ„Ø§Ù‹
                if (openSession.Date.Date == date.Date)
                    throw new InvalidOperationException(
                        "You have already clocked in today. Please clock out first.");

                // Ø¥Ø°Ø§ Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ â†’ Auto Clock-out
                openSession.ClockOut = autoClockOut;
                uow.Repository<Attendance>().Update(openSession);
                await uow.SaveChangesAsync();
            }

            // â”€â”€ 2. ØªØ­Ù‚Ù‚ Ø£Ù„Ø§ ÙŠÙƒÙˆÙ† Clock-in Ù„Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ… Ù…ÙˆØ¬ÙˆØ¯Ø§Ù‹ (Ù…ÙƒØªÙ…Ù„ Ø£Ùˆ Ù„Ø§)
            var alreadyClockedInToday = await uow.Repository<Attendance>()
                                                  .GetAllQueryable()
                                                  .AnyAsync(a =>
                                                      a.EmployeeId == employeeId &&
                                                      a.Date == date);

            if (alreadyClockedInToday)
                throw new InvalidOperationException(
                    "You have already clocked in today. Please clock out first.");

            // â”€â”€ 3. Ø¥Ù†Ø´Ø§Ø¡ Ø³Ø¬Ù„ Ø¬Ø¯ÙŠØ¯
            var attendance = new Attendance
            {
                EmployeeId = employeeId,
                Date = date,
                ClockIn = dto.ClockIn
            };

            await uow.Repository<Attendance>().AddAsync(attendance);
            await uow.SaveChangesAsync();

            // â”€â”€ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± ÙˆØ§Ù„Ø¥ÙŠÙ…ÙŠÙ„
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock In Recorded",
                    message: $"Your attendance was recorded at {dto.ClockIn:HH:mm}",
                    type: NotificationType.ClockIn);

                try { await emailService.SendClockInAsync(user.Email, employeeName, dto.ClockIn); }
                catch { /* Log if needed */ }
            }

            return (await GetByIdAsync(attendance.Id))!;
        }

        public async Task<AttendanceDto> ClockOutAsync(int employeeId, ClockOutDto dto)
        {
            // â”€â”€ Ø§Ù„Ø¨Ø­Ø« Ø¹Ù† Ø£ÙŠ session Ù…ÙØªÙˆØ­Ø© (ClockOut == null) Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ¸Ù
            // (Ù„ÙŠØ³ ÙÙ‚Ø· Ø§Ù„ÙŠÙˆÙ…ØŒ Ù„Ø£Ù† Ø¨Ø¹Ø¶ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ù†Ø³ÙˆØ§ Ø§Ù„Ù€ Clock Out Ù…Ù† Ø£ÙŠØ§Ù… Ø³Ø§Ø¨Ù‚Ø©)
            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee)
                                      .Where(a => a.EmployeeId == employeeId && a.ClockOut == null)
                                      .OrderByDescending(a => a.Date)  // Ø§Ù„Ø£Ø­Ø¯Ø« Ø£ÙˆÙ„Ø§Ù‹
                                      .FirstOrDefaultAsync()
                            ?? throw new KeyNotFoundException(
                                   "No open clock-in record found. You are not currently clocked in.");

            // ØªØ­Ù‚Ù‚ Ù…Ù† Ø£Ù† ÙˆÙ‚Øª Clock-out Ù…Ù†Ø·Ù‚ÙŠ (Ø¨Ø¹Ø¯ Clock-in)
            // Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø§Ù„Ù€ session Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ØŒ Ù†Ù‚Ø¨Ù„ Ø£ÙŠ ÙˆÙ‚Øª
            if (attendance.Date.Date == DateTime.UtcNow.Date)
            {
                if (dto.ClockOut <= attendance.ClockIn)
                    throw new ArgumentException(
                        "Clock-out time must be after clock-in time.");
            }

            attendance.ClockOut = dto.ClockOut;

            // âœ… Bug #1 Fix: Ø§Ø­Ø³Ø¨ TotalHours ÙˆØ§Ø­ÙØ¸Ù‡Ø§ ÙÙŠ Ø§Ù„Ù€ Entity Ø­ØªÙ‰ ØªÙØ®Ø²ÙŽÙ‘Ù† ÙÙŠ DB
            var duration = dto.ClockOut.ToTimeSpan() - attendance.ClockIn.ToTimeSpan();
            attendance.TotalHours = duration.TotalHours > 0 ? (int)Math.Round(duration.TotalHours) : 0;

            uow.Repository<Attendance>().Update(attendance);
            await uow.SaveChangesAsync();

            // â”€â”€ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± ÙˆØ§Ù„Ø¥ÙŠÙ…ÙŠÙ„
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                var total = dto.ClockOut.ToTimeSpan() - attendance.ClockIn.ToTimeSpan();

                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock Out Recorded",
                    message: $"You clocked out at {dto.ClockOut:HH:mm}. " +
                             $"Total: {(int)total.TotalHours}h {total.Minutes}m",
                    type: NotificationType.ClockOut);

                try
                {
                    await emailService.SendClockOutAsync(
                        user.Email, employeeName,
                        attendance.ClockIn, dto.ClockOut);
                }
                catch { /* Log if needed */ }
            }

            return mapper.Map<AttendanceDto>(attendance);
        }
    }
}

``

## D:\HRMS-Team\Application\Services\Implementations\AuthService.cs

``cs
using Application.DTOs.Auth;
using Application.Interfaces;
using Application.Services.Interfaces;
using BCrypt.Net;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations
{
    public class AuthService(IUnitOfWork uow, IJwtService jwtService, IEmailService emailService) : IAuthService
    {

        public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
        {
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return null;
            }

            return new AuthResponseDto
            {
                Token = jwtService.GenerateToken(user),
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString(),
                ExpiresAt = jwtService.GetExpiration()
            };
        }
        public async Task<bool> RegisterAsync(RegisterDto dto)
        {
            var exists = await uow.Repository<User>()
                                  .GetAllQueryable()
                                  .AnyAsync(u => u.Email == dto.Email);
            if (exists)
            {
                return false;
            }
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role.ToString(),
                EmployeeId = dto.EmployeeId
            };

            await uow.Repository<User>().AddAsync(user);
            await uow.SaveChangesAsync();

            await emailService.SendWelcomeAsync(user.Email, user.Username);

            return true;
        }

        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto dto)
        {
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null || !BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            {
                return false;
            }
            // validate
            if (dto.NewPassword != dto.ConfirmNewPassword)
            {
                return false;
            }
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            uow.Repository<User>().Update(user);
            await uow.SaveChangesAsync();
            return true;
        }









    }
    }

``

## D:\HRMS-Team\Application\Services\Implementations\DepartmentService.cs

``cs
using Application.DTOs.Department;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class DepartmentService(IUnitOfWork uow, IMapper mapper) : IDepartmentService
{
    public async Task<List<DepartmentDto>> GetAllAsync()
    {
        var departments = await uow.Repository<Department>()
                                   .GetAllQueryable()
                                   .Include(d => d.Employees)
                                   .ToListAsync();

        return mapper.Map<List<DepartmentDto>>(departments);
    }

    public async Task<DepartmentDto?> GetByIdAsync(int id)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .Include(d => d.Employees)
                                  .FirstOrDefaultAsync(d => d.Id == id);

        return department is null ? null : mapper.Map<DepartmentDto>(department);
    }

    public async Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto)
    {
        var exists = await uow.Repository<Department>()
                              .GetAllQueryable()
                              .AnyAsync(d => d.Name == dto.Name);

        if (exists)
            throw new InvalidOperationException("Department name already exists");

        var department = mapper.Map<Department>(dto);
        await uow.Repository<Department>().AddAsync(department);
        await uow.SaveChangesAsync();

        return mapper.Map<DepartmentDto>(department);
    }

    public async Task<DepartmentDto?> UpdateAsync(int id, UpdateDepartmentDto dto)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .FirstOrDefaultAsync(d => d.Id == id);

        if (department is null) return null;

        mapper.Map(dto, department);
        uow.Repository<Department>().Update(department);
        await uow.SaveChangesAsync();

        return mapper.Map<DepartmentDto>(department);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .Include(d => d.Employees)
                                  .FirstOrDefaultAsync(d => d.Id == id);

        if (department is null) return false;

        if (department.Employees.Any())
            throw new InvalidOperationException("Cannot delete department with employees");

        uow.Repository<Department>().Delete(department);
        await uow.SaveChangesAsync();
        return true;
    }
}
``

## D:\HRMS-Team\Application\Services\Implementations\EmployeeService.cs

``cs
using Application.Common;
using Application.DTOs.Employee;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;


public class EmployeeService(IUnitOfWork uow, IMapper mapper) : IEmployeeService
{
   
    //   2026010001  
    private async Task<int> GenerateEmployeeIdAsync(int departmentId, DateTime hireDate)
    {
        var year = hireDate.Year;

        // Ø¢Ø®Ø± ID Ù…ÙˆØ¬ÙˆØ¯ Ù„Ù†ÙØ³ Ø§Ù„Ù‚Ø³Ù… ÙˆÙ†ÙØ³ Ø§Ù„Ø³Ù†Ø©
        var prefix = int.Parse($"{year}{departmentId:D2}");
        var prefixMin = prefix * 10000;       // 2026010000
        var prefixMax = prefixMin + 9999;     // 2026019999

        var lastId = await uow.Repository<Employee>()
                              .GetAllQueryable()
                              .Where(e => e.Id >= prefixMin && e.Id <= prefixMax)
                              .OrderByDescending(e => e.Id)
                              .Select(e => e.Id)
                              .FirstOrDefaultAsync();

        // Ù„Ùˆ Ù…Ø§ ÙÙŠ Ù…ÙˆØ¸ÙÙŠÙ† Ù‚Ø¨Ù„ â†’ ÙŠØ¨Ø¯Ø£ Ù…Ù† 0001
        var nextSeq = lastId == 0
            ? 1
            : (lastId % 10000) + 1;

        if (nextSeq > 9999)
            throw new InvalidOperationException(
                $"Employee limit reached for dept {departmentId} in {year}");

        return int.Parse($"{year}{departmentId:D2}{nextSeq:D4}");
        // â† 2026 + 01 + 0001 = 2026010001
    }

    
    public async Task<PagedResult<EmployeeDto>> GetAllAsync(int pageNumber, int pageSize)
    {
        var query = uow.Repository<Employee>()
                       .GetAllQueryable()
                       .Include(e => e.Department)
                       .OrderBy(e => e.DepartmentId)
                       .ThenBy(e => e.Id);

        var total = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return PagedResult<EmployeeDto>.Create(
            mapper.Map<List<EmployeeDto>>(items), total, pageNumber, pageSize);
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.Department)
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
    {
        var emailExists = await uow.Repository<Employee>()
                                   .GetAllQueryable()
                                   .AnyAsync(e => e.Email == dto.Email);
        if (emailExists)
            throw new InvalidOperationException("Email already used");

        var deptExists = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .AnyAsync(d => d.Id == dto.DepartmentId);
        if (!deptExists)
            throw new KeyNotFoundException($"Department {dto.DepartmentId} not found");

        var employee = mapper.Map<Employee>(dto);
        employee.IsActive = true;

        // â† ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù€ ID Ù‚Ø¨Ù„ Ø§Ù„Ø­ÙØ¸
        employee.Id = await GenerateEmployeeIdAsync(dto.DepartmentId, dto.HireDate);

        await uow.Repository<Employee>().AddAsync(employee);
        await uow.SaveChangesAsync();

        return (await GetByIdAsync(employee.Id))!;
    }

    public async Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null) return null;

        mapper.Map(dto, employee);
        uow.Repository<Employee>().Update(employee);
        await uow.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null) return false;

        uow.Repository<Employee>().Delete(employee);
        await uow.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<EmployeeDto>> GetByDepartmentAsync(int departmentId)
    {
        var employees = await uow.Repository<Employee>()
                                 .GetAllQueryable()
                                 .Where(e => e.DepartmentId == departmentId)
                                 .Include(e => e.Department)
                                 .OrderBy(e => e.Id)
                                 .ToListAsync();

        return mapper.Map<IEnumerable<EmployeeDto>>(employees);
    }

    public async Task<EmployeeProfileDto?> GetProfileAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.Department)
                                .Include(e => e.Position)
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeProfileDto>(employee);
    }
}
``

## D:\HRMS-Team\Application\Services\Implementations\LeaveService.cs

``cs
using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/LeaveService.cs
    public class LeaveService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService,
        ILogger<LeaveService> logger) : ILeaveService
    {
        public async Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .OrderByDescending(l => l.StartDate);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<LeaveDto>> GetMyLeavesAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .Where(l => l.EmployeeId == employeeId)
                           .OrderByDescending(l => l.StartDate);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<LeaveDto?> GetByIdAsync(int id)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee)
                                 .FirstOrDefaultAsync(l => l.Id == id);

            return leave is null ? null : mapper.Map<LeaveDto>(leave);
        }

        public async Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto)
        {
            // ✅ معالجة التواريخ بشكل صحيح مع UTC
            var startDate = DateTime.SpecifyKind(dto.StartDate.Date, DateTimeKind.Utc);
            var endDate = DateTime.SpecifyKind(dto.EndDate.Date, DateTimeKind.Utc);
            var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

            // ✅ التحقق من الصحة
            if (startDate < today)
                throw new ArgumentException("Start date cannot be in the past");

            if (endDate < startDate)
                throw new ArgumentException("End date cannot be before start date");

            // ✅ التحقق من التداخل
            var hasOverlap = await uow.Repository<Leave>()
                              .GetAllQueryable()
                              .AnyAsync(l =>
                                  l.EmployeeId == employeeId &&
                                  l.Status != LeaveStatus.Rejected &&
                                  l.StartDate <= endDate &&
                                  l.EndDate >= startDate);

            if (hasOverlap)
                throw new InvalidOperationException(
                    "You already have a leave request overlapping these dates");

            // ✅ إنشاء طلب الإجازة
            var leave = new Leave
            {
                EmployeeId = employeeId,
                LeaveType = dto.LeaveType,
                StartDate = startDate,
                EndDate = endDate,
                TotalDays = (int)(endDate - startDate).TotalDays + 1,
                Reason = dto.Reason,
                Status = LeaveStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };

            await uow.Repository<Leave>().AddAsync(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                            .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ جلب HR و Admin - بدون مشاكل Role
            var hrAdmins = await uow.Repository<User>()
                            .GetAllQueryable()
                            .Where(u => u.Role == UserRole.HR.ToString() || 
                                        u.Role == UserRole.Admin.ToString())
                            .ToListAsync();

            // ✅ إرسال الإشعارات والبريد بشكل آمن
            foreach (var user in hrAdmins)
            {
                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "New Leave Request",
                        message: $"{employeeName} submitted a {dto.LeaveType} leave request " +
                                 $"from {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                        type: NotificationType.LeaveRequested);

                    // Email
                    await emailService.SendLeaveRequestedAsync(
                        user.Email, employeeName,
                        dto.LeaveType.ToString(),
                        startDate, endDate);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave notification to user {UserId}", user.Id);
                }
            }

            return (await GetByIdAsync(leave.Id))!;
        }

        public async Task<LeaveDto> UpdateStatusAsync(
            int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee)
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                    ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException(
                    "Only Pending leave requests can be reviewed");

            if (dto.Status == LeaveStatus.Rejected &&
                string.IsNullOrWhiteSpace(dto.RejectionReason))
                throw new ArgumentException(
                    "Rejection reason is required when rejecting a leave");

            // ✅ تحديث الحالة
            leave.Status = dto.Status;
            leave.ReviewedByUserId = reviewerUserId;
            leave.RejectionReason = dto.Status == LeaveStatus.Rejected
                ? dto.RejectionReason
                : string.Empty;  // بدل null
            leave.ReviewedAt = DateTime.UtcNow;

            uow.Repository<Leave>().Update(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب الموظف مع بياناته
            var employee = await uow.Repository<Employee>()
                            .GetAllQueryable()
                            .Include(e => e.User)
                            .FirstOrDefaultAsync(e => e.Id == leave.EmployeeId);

            if (employee?.User is not null)
            {
                var employeeUser = employee.User;
                var isApproved = dto.Status == LeaveStatus.Approved;
                var employeeName = $"{employee.FirstName} {employee.LastName}";

                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: employeeUser.Id,
                        title: isApproved ? "Leave Approved" : "Leave Rejected",
                        message: isApproved
                            ? $"Your {leave.LeaveType} leave request has been approved"
                            : $"Your {leave.LeaveType} leave request was rejected. " +
                              $"Reason: {dto.RejectionReason}",
                        type: isApproved
                            ? NotificationType.LeaveApproved
                            : NotificationType.LeaveRejected);

                    // Email
                    await emailService.SendLeaveStatusAsync(
                        employeeUser.Email,
                        employeeName,
                        leave.LeaveType.ToString(),
                        isApproved,
                        dto.RejectionReason);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave status notification to employee {EmployeeId}", 
                        leave.EmployeeId);
                }
            }

            return mapper.Map<LeaveDto>(leave);
        }

        public async Task DeleteAsync(int leaveId, int employeeId)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                        ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.EmployeeId != employeeId)
                throw new UnauthorizedAccessException(
                    "You can only delete your own leave requests");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException(
                    "Only Pending leave requests can be deleted");

            uow.Repository<Leave>().Delete(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                                    .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ جلب HR و Admin
            var hrAdmins = await uow.Repository<User>()
                                    .GetAllQueryable()
                                    .Where(u => u.Role == UserRole.HR.ToString() || 
                                                u.Role == UserRole.Admin.ToString())
                                    .ToListAsync();

            // ✅ إرسال الإشعارات والبريد بشكل آمن
            foreach (var user in hrAdmins)
            {
                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "Leave Request Cancelled",
                        message: $"{employeeName} cancelled their {leave.LeaveType} leave request",
                        type: NotificationType.LeaveCancelled);

                    // Email
                    await emailService.SendLeaveCancelledAsync(
                        user.Email, employeeName, leave.LeaveType.ToString());
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave cancellation notification to user {UserId}", 
                        user.Id);
                }
            }
        }
    }
}

``

## D:\HRMS-Team\Application\Services\Implementations\NotificationService.cs

``cs
using Application.DTOs.Notification;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{
    
    public class NotificationService(IUnitOfWork uow, IMapper mapper) : INotificationService
    {
        public async Task<List<NotificationDto>> GetMyNotificationsAsync(int userId)
        {
            var items = await uow.Repository<Notification>()
                                 .GetAllQueryable()
                                 .Where(n => n.UserId == userId)
                                 .OrderByDescending(n => n.CreatedAt)
                                 .ToListAsync();

            return mapper.Map<List<NotificationDto>>(items);
        }

        public async Task<int> GetUnreadCountAsync(int userId)
        {
            return await uow.Repository<Notification>()
                            .GetAllQueryable()
                            .CountAsync(n => n.UserId == userId && !n.IsRead);
        }

        public async Task MarkAsReadAsync(int notificationId, int userId)
        {
            var notification = await uow.Repository<Notification>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(n =>
                                            n.Id == notificationId &&
                                            n.UserId == userId)
                              ?? throw new KeyNotFoundException(
                                     $"Notification {notificationId} not found");

            if (notification.IsRead) return;

            notification.IsRead = true;
            uow.Repository<Notification>().Update(notification);
            await uow.SaveChangesAsync();
        }

        public async Task MarkAllAsReadAsync(int userId)
        {
            var unread = await uow.Repository<Notification>()
                                  .GetAllQueryable()
                                  .Where(n => n.UserId == userId && !n.IsRead)
                                  .ToListAsync();

            if (!unread.Any()) return;

            foreach (var n in unread)
            {
                n.IsRead = true;
                uow.Repository<Notification>().Update(n);
            }

            await uow.SaveChangesAsync();
        }

        public async Task DeleteAsync(int notificationId, int userId)
        {
            var notification = await uow.Repository<Notification>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(n =>
                                            n.Id == notificationId &&
                                            n.UserId == userId)
                              ?? throw new KeyNotFoundException(
                                     $"Notification {notificationId} not found");

            uow.Repository<Notification>().Delete(notification);
            await uow.SaveChangesAsync();
        }

        // ✅ Internal Method — تُحقن بالـ Services الثانية
        public async Task CreateAsync(
            int userId, string title, string message, NotificationType type)
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = type,
                CreatedAt = DateTime.UtcNow
            };

            await uow.Repository<Notification>().AddAsync(notification);
            await uow.SaveChangesAsync();
        }
    }
}

``

## D:\HRMS-Team\Application\Services\Implementations\PositionService.cs

``cs
using Application.DTOs.Position;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class PositionService(IUnitOfWork uow, IMapper mapper) : IPositionService
{
    public async Task<List<PositionDto>> GetAllAsync()
    {
        var positions = await uow.Repository<Position>()
                                 .GetAllQueryable()
                                 .Include(p => p.Department)
                                 .Include(p => p.Employees)
                                 .ToListAsync();

        return mapper.Map<List<PositionDto>>(positions);
    }

    public async Task<List<PositionDto>> GetByDepartmentAsync(int departmentId)
    {
        var positions = await uow.Repository<Position>()
                                 .GetAllQueryable()
                                 .Include(p => p.Department)
                                 .Include(p => p.Employees)
                                 .Where(p => p.DepartmentId == departmentId)
                                 .ToListAsync();

        return mapper.Map<List<PositionDto>>(positions);
    }

    public async Task<PositionDto?> GetByIdAsync(int id)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .Include(p => p.Department)
                                .Include(p => p.Employees)
                                .FirstOrDefaultAsync(p => p.Id == id);

        return position is null ? null : mapper.Map<PositionDto>(position);
    }

    public async Task<PositionDto> CreateAsync(CreatePositionDto dto)
    {
        var departmentExists = await uow.Repository<Department>()
                                        .GetAllQueryable()
                                        .AnyAsync(d => d.Id == dto.DepartmentId);

        if (!departmentExists)
        {
            throw new KeyNotFoundException($"Department {dto.DepartmentId} not found");
        }




        var exists = await uow.Repository<Position>()
                              .GetAllQueryable()
                              .AnyAsync(p => p.Title == dto.Title &&
                                             p.DepartmentId == dto.DepartmentId);

        if (dto.SalaryMin > dto.SalaryMax)
        {
            throw new ArgumentException("SalaryMin cannot be greater than SalaryMax");
        }


        if (exists)
        {
            throw new InvalidOperationException("Position already exists in this department");
        }

        var position = mapper.Map<Position>(dto);

        await uow.Repository<Position>().AddAsync(position);

        await uow.SaveChangesAsync();

        return await GetByIdAsync(position.Id) ?? mapper.Map<PositionDto>(position);
    }

    public async Task<PositionDto?> UpdateAsync(int id, UpdatePositionDto dto)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(p => p.Id == id);

        if (position is null)
        {
            return null;
        }

        if (dto.SalaryMin > dto.SalaryMax) 
        { 

        throw new ArgumentException("SalaryMin cannot be greater than SalaryMax");
    
        
        }
        mapper.Map(dto, position);

        uow.Repository<Position>().Update(position);

        await uow.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .Include(p => p.Employees)
                                .FirstOrDefaultAsync(p => p.Id == id);


        if (position is null)
        {
            return false;
        }

        if (position.Employees.Any())
        {
            throw new InvalidOperationException("Cannot delete position with assigned employees");
        }

        uow.Repository<Position>().Delete(position);

        await uow.SaveChangesAsync();
        return true;
    }
}
``

## D:\HRMS-Team\Application\Services\Implementations\SalaryService.cs

``cs
using Application.Common;
using Application.DTOs.Salary;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/SalaryService.cs
    public class SalaryService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService) : ISalaryService
    {
        public async Task<PagedResult<SalaryDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Salary>()
                           .GetAllQueryable()
                           .Include(s => s.Employee)
                           .OrderByDescending(s => s.Year)
                           .ThenByDescending(s => s.Month);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<SalaryDto>.Create(
                mapper.Map<List<SalaryDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<SalaryDto>> GetMyAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Salary>()
                           .GetAllQueryable()
                           .Include(s => s.Employee)
                           .Where(s => s.EmployeeId == employeeId)
                           .OrderByDescending(s => s.Year)
                           .ThenByDescending(s => s.Month);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<SalaryDto>.Create(
                mapper.Map<List<SalaryDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<SalaryDto?> GetByIdAsync(int id)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .Include(s => s.Employee)
                                  .FirstOrDefaultAsync(s => s.Id == id);

            return salary is null ? null : mapper.Map<SalaryDto>(salary);
        }

        public async Task<SalaryDto> CreateAsync(CreateSalaryDto dto)
        {
            var employeeExists = await uow.Repository<Employee>()
                                          .GetAllQueryable()
                                          .AnyAsync(e => e.Id == dto.EmployeeId);

            if (!employeeExists)
                throw new KeyNotFoundException($"Employee {dto.EmployeeId} not found");

            var duplicate = await uow.Repository<Salary>()
                                     .GetAllQueryable()
                                     .AnyAsync(s =>
                                         s.EmployeeId == dto.EmployeeId &&
                                         s.Month == dto.Month &&
                                         s.Year == dto.Year);

            if (duplicate)
                throw new InvalidOperationException(
                    $"Salary for this employee in {dto.Month}/{dto.Year} already exists");

            var gross = dto.BaseAmount + dto.Allowances;
            var net = gross - dto.Deductions;

            if (net < 0)
                throw new ArgumentException(
                    "Deductions cannot exceed the gross amount");

            var salary = new Salary
            {
                EmployeeId = dto.EmployeeId,
                BaseAmount = dto.BaseAmount,
                Allowances = dto.Allowances,
                Deductions = dto.Deductions,
                GrossAmount = gross,
                NetAmount = net,
                Month = dto.Month,
                Year = dto.Year,
                // ✅ Fix DateTime Kind
                EffectiveDate = DateTime.SpecifyKind(
                                    dto.EffectiveDate, DateTimeKind.Utc)
            };

            await uow.Repository<Salary>().AddAsync(salary);
            await uow.SaveChangesAsync();

            // جيب الـ User المرتبط بالموظف
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u =>
                                    u.EmployeeId == dto.EmployeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Salary Statement Available",
                    message: $"Your salary for {dto.Month}/{dto.Year} has been added. " +
                             $"Net Amount: {net:N2} JD",
                    type: NotificationType.SalaryCreated);

                // ✅ Email
                try
                {
                    await emailService.SendSalaryCreatedAsync(
                        user.Email, employeeName,
                        dto.Month, dto.Year, net);
                }
                catch { /* Log if needed */ }
            }

            return (await GetByIdAsync(salary.Id))!;
        }

        public async Task<SalaryDto> UpdateAsync(int id, UpdateSalaryDto dto)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .Include(s => s.Employee)
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            if (dto.BaseAmount.HasValue) salary.BaseAmount = dto.BaseAmount.Value;
            if (dto.Allowances.HasValue) salary.Allowances = dto.Allowances.Value;
            if (dto.Deductions.HasValue) salary.Deductions = dto.Deductions.Value;
            if (dto.EffectiveDate.HasValue) salary.EffectiveDate =
                // ✅ Fix DateTime Kind
                DateTime.SpecifyKind(dto.EffectiveDate.Value, DateTimeKind.Utc);

            salary.GrossAmount = salary.BaseAmount + salary.Allowances;
            salary.NetAmount = salary.GrossAmount - salary.Deductions;

            if (salary.NetAmount < 0)
                throw new ArgumentException(
                    "Deductions cannot exceed the gross amount");

            uow.Repository<Salary>().Update(salary);
            await uow.SaveChangesAsync();

            // جيب الـ User المرتبط بالموظف
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u =>
                                    u.EmployeeId == salary.EmployeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Salary Updated",
                    message: $"Your salary for {salary.Month}/{salary.Year} " +
                             $"has been updated. Net Amount: {salary.NetAmount:N2} JD",
                    type: NotificationType.SalaryUpdated);

                // ✅ Email
                try
                {
                    await emailService.SendSalaryUpdatedAsync(
                        user.Email, employeeName,
                        salary.Month, salary.Year, salary.NetAmount);
                }
                catch { /* Log if needed */ }
            }

            return mapper.Map<SalaryDto>(salary);
        }

        public async Task DeleteAsync(int id)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            uow.Repository<Salary>().Delete(salary);
            await uow.SaveChangesAsync();
        }
    }
}

``

## D:\HRMS-Team\Application\Services\Implementations\UserService.cs

``cs
using Application.Common;
using Application.DTOs.User;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Implementations
{
    public class UserService(IUnitOfWork uow, IMapper mapper) : IUserService
    {
        public async Task<PagedResult<UserDto>> GetAllEmployeesAsync(int pageNumber, int pageSize)
        {
            // ✅ اجلب فقط Users اللذين لهم Employee مرتبطين
            var query = uow.Repository<User>()
                           .GetAllQueryable()
                           .Where(u => u.Employee != null)  // فقط Users مع Employee
                           .Include(u => u.Employee)
                           .OrderByDescending(u => u.CreatedAt);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            var dtos = items.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                EmployeeName = u.Employee != null
                    ? $"{u.Employee.FirstName} {u.Employee.LastName}"
                    : null
            }).ToList();

            return PagedResult<UserDto>.Create(dtos, total, pageNumber, pageSize);
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt,
                EmployeeName = user.Employee != null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : null
            };
        }

        public async Task<PagedResult<UserDto>> GetUnassignedEmployeeUsersAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<User>()
                           .GetAllQueryable()
                           .Where(u => u.Role == "Employee" && u.Employee == null)  // Employee users بدون ربط
                           .OrderByDescending(u => u.CreatedAt);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            var dtos = items.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt
                
            }).ToList();

            return PagedResult<UserDto>.Create(dtos, total, pageNumber, pageSize);
        }


    }
}


``

## D:\HRMS-Team\Application\Services\Interfaces\IAttendanceService.cs

``cs
using Application.Common;
using Application.DTOs.Attendance;


namespace Application.Services.Interfaces
{
    
    public interface IAttendanceService
    {
        Task<PagedResult<AttendanceDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(int employeeId, int pageNumber, int pageSize);
        Task<AttendanceDto?> GetByIdAsync(int id);
        Task<AttendanceDto> ClockInAsync(int employeeId, ClockInDto dto);
        Task<AttendanceDto> ClockOutAsync(int employeeId, ClockOutDto dto);
    }
}

``

## D:\HRMS-Team\Application\Services\Interfaces\IAuthServices.cs

``cs
using Application.DTOs.Auth;

namespace Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<bool> RegisterAsync(RegisterDto dto);
    Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto dto);
}
``

## D:\HRMS-Team\Application\Services\Interfaces\IDepartmentService.cs

``cs
using Application.DTOs.Department;

namespace Application.Services.Interfaces;

public interface IDepartmentService
{
    Task<List<DepartmentDto>> GetAllAsync();
    Task<DepartmentDto?> GetByIdAsync(int id);
    Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto);
    Task<DepartmentDto?> UpdateAsync(int id, UpdateDepartmentDto dto);
    Task<bool> DeleteAsync(int id);
}
``

## D:\HRMS-Team\Application\Services\Interfaces\IEmailService.cs

``cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendWelcomeAsync(string toEmail, string username);
        Task SendLeaveRequestedAsync(string toEmail, string employeeName,
            string leaveType, DateTime start, DateTime end);
        Task SendLeaveStatusAsync(string toEmail, string employeeName,
            string leaveType, bool isApproved, string? rejectionReason);
        Task SendLeaveCancelledAsync(string toEmail, string employeeName,
            string leaveType);
        Task SendClockInAsync(string toEmail, string employeeName, TimeOnly clockIn);
        Task SendClockOutAsync(string toEmail, string employeeName,
            TimeOnly clockIn, TimeOnly clockOut);
        Task SendSalaryCreatedAsync(string toEmail, string employeeName,
            int month, int year, decimal netAmount);
        Task SendSalaryUpdatedAsync(string toEmail, string employeeName,
            int month, int year, decimal netAmount);
    }
}

``

## D:\HRMS-Team\Application\Services\Interfaces\IEmployeeService.cs

``cs
// Aother : Abedalqader Alfaqeeh
// last Edit : 2026/04/12
  

using Application.Common;
using Application.DTOs.Employee;

namespace Application.Services.Interfaces;

public interface IEmployeeService
{
    Task<PagedResult<EmployeeDto>> GetAllAsync(int pageNumber, int pageSize);
    Task<EmployeeProfileDto?> GetProfileAsync(int id);
    Task<EmployeeDto?> GetByIdAsync(int id);
    Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto);
    Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<EmployeeDto>> GetByDepartmentAsync(int departmentId);
}
``

## D:\HRMS-Team\Application\Services\Interfaces\ILeaveService.cs

``cs
using Application.Common;
using Application.DTOs.Leave;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
    public interface ILeaveService
    {
        Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<LeaveDto>> GetMyLeavesAsync(int employeeId, int pageNumber, int pageSize);
        Task<LeaveDto?> GetByIdAsync(int id);
        Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto);
        Task<LeaveDto> UpdateStatusAsync(int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto);
        Task DeleteAsync(int leaveId, int employeeId);
    }
}

``

## D:\HRMS-Team\Application\Services\Interfaces\INotificationService.cs

``cs
using Application.DTOs.Notification;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
   
    public interface INotificationService
    {
        Task<List<NotificationDto>> GetMyNotificationsAsync(int userId);
        Task<int> GetUnreadCountAsync(int userId);
        Task MarkAsReadAsync(int notificationId, int userId);
        Task MarkAllAsReadAsync(int userId);
        Task DeleteAsync(int notificationId, int userId);

        // Internal — تُستخدم جوا الـ Services
        Task CreateAsync(int userId, string title, string message, NotificationType type);
    }
}

``

## D:\HRMS-Team\Application\Services\Interfaces\IPositionService.cs

``cs
using Application.DTOs.Position;

namespace Application.Services.Interfaces;

public interface IPositionService
{
    Task<List<PositionDto>> GetAllAsync();
    Task<List<PositionDto>> GetByDepartmentAsync(int departmentId);
    Task<PositionDto?> GetByIdAsync(int id);
    Task<PositionDto> CreateAsync(CreatePositionDto dto);
    Task<PositionDto?> UpdateAsync(int id, UpdatePositionDto dto);
    Task<bool> DeleteAsync(int id);
}
``

## D:\HRMS-Team\Application\Services\Interfaces\ISalaryService.cs

``cs
using Application.Common;
using Application.DTOs.Salary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
   
    public interface ISalaryService
    {
        Task<PagedResult<SalaryDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<SalaryDto>> GetMyAsync(int employeeId, int pageNumber, int pageSize);
        Task<SalaryDto?> GetByIdAsync(int id);
        Task<SalaryDto> CreateAsync(CreateSalaryDto dto);
        Task<SalaryDto> UpdateAsync(int id, UpdateSalaryDto dto);
        Task DeleteAsync(int id);
    }
}

``

## D:\HRMS-Team\Application\Services\Interfaces\IUserService.cs

``cs


using Application.Common;
using Application.DTOs.User;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<PagedResult<UserDto>> GetAllEmployeesAsync(int pageNumber, int pageSize);
        Task<UserDto?> GetByIdAsync(int id);
        Task<PagedResult<UserDto>> GetUnassignedEmployeeUsersAsync(int pageNumber, int pageSize);


    }

}

``

## D:\HRMS-Team\Application\DTOs\Attendance\AttendanceDto.cs

``cs


namespace Application.DTOs.Attendance
{
   
    public class AttendanceDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public TimeOnly ClockIn { get; set; }
        public TimeOnly? ClockOut { get; set; }
        public string? TotalHours { get; set; }  
    }
}

``

## D:\HRMS-Team\Application\DTOs\Attendance\ClockInDto.cs

``cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.Attendance
{
    
    public class ClockInDto
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeOnly ClockIn { get; set; }
    }
}

``

## D:\HRMS-Team\Application\DTOs\Attendance\ClockOutDto.cs

``cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.Attendance
{
   
    public class ClockOutDto
    {
        [Required]
        public TimeOnly ClockOut { get; set; }
    }
}

``

## D:\HRMS-Team\Application\DTOs\Auth\AuthResponseDto.cs

``cs
namespace Application.DTOs.Auth;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Auth\ChangePasswordDto.cs

``cs

using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Auth
{
    public  class ChangePasswordDto
    {
        public string? Email { get; set; }

        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]
        public string CurrentPassword { get; set; } = null!;
        [Required]
        [MinLength(6)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]
        public string NewPassword { get; set; } = null!;

        [Required]
        [Compare("NewPassword", ErrorMessage = "Passwords don't match")]
        public string ConfirmNewPassword { get; set; } = null!;


    }
}

``

## D:\HRMS-Team\Application\DTOs\Auth\LoginDto.cs

``cs
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Auth;

public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
}
``

## D:\HRMS-Team\Application\DTOs\Auth\MeDto.cs

``cs
namespace Application.DTOs.Auth;

public class MeDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? EmployeeId { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Auth\RegisterDto.cs

``cs
using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Application.DTOs.Auth;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]    
    public string Password { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Employee;

    public int? EmployeeId { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Department\CreateDepartmentDto.cs

``cs
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Department;

public class CreateDepartmentDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
}
``

## D:\HRMS-Team\Application\DTOs\Department\DepartmentDto.cs

``cs
namespace Application.DTOs.Department;

public class DepartmentDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int EmployeeCount { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Department\UpdateDepartmentDto.cs

``cs
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Department;

public class UpdateDepartmentDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
}
``

## D:\HRMS-Team\Application\DTOs\Employee\CreateEmployeeDto.cs

``cs
using System.ComponentModel.DataAnnotations;

public class CreateEmployeeDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    public string LastName { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    [RegularExpression(@"^\+?\d{10,15}$", ErrorMessage = "Invalid phone number format.")]
    public string PhoneNumber { get; set; } = string.Empty;
    [Required]
    public DateTime HireDate { get; set; }
    [Required]
    public int DepartmentId { get; set; }
    [Required]
    public int UserId { get; set; } 
    [Required]
    public int PositionId { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Employee\EmployeeDto.cs

``cs


namespace Application.DTOs.Employee;

public class EmployeeDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";  
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
    public bool IsActive { get; set; }
    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty; 
    // âœ… W1/I4 Fix: Ø£Ø¶Ù PositionId ÙˆPositionTitle Ù„Ø¯Ø¹Ù… Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„ ÙˆØ¹Ø±Ø¶ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
    public int PositionId { get; set; }
    public string PositionTitle { get; set; } = string.Empty;
    public int UserId { get; set; }
}


``

## D:\HRMS-Team\Application\DTOs\Employee\EmployeeProfileDto.cs

``cs
namespace Application.DTOs.Employee;

public class EmployeeProfileDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string PositionTitle { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Employee\UpdateEmployeeDto.cs

``cs

namespace Application.DTOs.Employee
{
    public class UpdateEmployeeDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? IsActive { get; set; }
        public int? DepartmentId { get; set; }
    }
}

``

## D:\HRMS-Team\Application\DTOs\Leave\CreateLeaveDto.cs

``cs
using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Leave
{
    public class CreateLeaveDto
    {
        [Required]
        public LeaveType LeaveType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 5)]
        public string Reason { get; set; } = string.Empty;
    }
}

``

## D:\HRMS-Team\Application\DTOs\Leave\LeaveDto.cs

``cs


namespace Application.DTOs.Leave
{
    public class LeaveDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public string LeaveType { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalDays { get; set; }
        public string Reason { get; set; } = string.Empty;
        public DateTime RequestedAt { get; set; }
        public string RejectionReason { get; set; } = string.Empty;
    }
}

``

## D:\HRMS-Team\Application\DTOs\Leave\UpdateLeaveStatusDto.cs

``cs


using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Leave
{
  
    public class UpdateLeaveStatusDto
    {
        [Required]
        public LeaveStatus Status { get; set; }

        public string RejectionReason { get; set; } = string.Empty;
    }
}

``

## D:\HRMS-Team\Application\DTOs\Notification\NotificationDto.cs

``cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Notification
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}

``

## D:\HRMS-Team\Application\DTOs\Position\CreatePositionDto.cs

``cs
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Position;

public class CreatePositionDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMin must be positive")]
    public decimal SalaryMin { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMax must be positive")]
    public decimal SalaryMax { get; set; }

    [Required]
    public int DepartmentId { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Position\PositionDto.cs

``cs
namespace Application.DTOs.Position;

public class PositionDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal SalaryMin { get; set; }
    public decimal SalaryMax { get; set; }
    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty;
    public int EmployeeCount { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Position\UpdatePositionDto.cs

``cs
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Position;

public class UpdatePositionDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMin must be positive")]
    public decimal SalaryMin { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMax must be positive")]
    public decimal SalaryMax { get; set; }

    [Required]
    public int DepartmentId { get; set; }
}
``

## D:\HRMS-Team\Application\DTOs\Salary\CreateSalaryDto.cs

``cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
    public class CreateSalaryDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal BaseAmount { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Allowances { get; set; } = 0;

        [Range(0, double.MaxValue)]
        public decimal Deductions { get; set; } = 0;

        [Required]
        [Range(1, 12)]
        public int Month { get; set; }

        [Required]
        [Range(2000, 2100)]
        public int Year { get; set; }

        [Required]
        public DateTime EffectiveDate { get; set; }
    }
}

``

## D:\HRMS-Team\Application\DTOs\Salary\SalaryDto.cs

``cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
    public class SalaryDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public decimal BaseAmount { get; set; }
        public decimal Allowances { get; set; }
        public decimal Deductions { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal NetAmount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTime EffectiveDate { get; set; }
    }
}

``

## D:\HRMS-Team\Application\DTOs\Salary\UpdateSalaryDto.cs

``cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
  
    public class UpdateSalaryDto
    {
        [Range(0, double.MaxValue)]
        public decimal? BaseAmount { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Allowances { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Deductions { get; set; }

        public DateTime? EffectiveDate { get; set; }
    }
}

``

## D:\HRMS-Team\Application\DTOs\User\UserDto.cs

``cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? EmployeeName { get; set; }
    }
}

``

## D:\HRMS-Team\Application\Mapping\MappingProfile.cs

``cs
// Aother : Abedalqader Alfaqeeh
// last Edit : 2026-04-12
// </sammer> the MappingProfile class defines how to map between domain entities and data transfer objects (DTOs) using AutoMapper.
// It includes mappings for the Employee entity, allowing for both retrieval (mapping to EmployeeDto) and creation/update (mapping from CreateEmployeeDto and UpdateEmployeeDto).
// The update mapping is configured to ignore null values, enabling partial updates without overwriting existing data with nulls.

using Application.DTOs.Attendance;
using Application.DTOs.Department;
using Application.DTOs.Employee;
using Application.DTOs.Leave;
using Application.DTOs.Notification;
using Application.DTOs.Position;
using Application.DTOs.Salary;
using Application.DTOs.User;
using AutoMapper;
using Domain.Entities;


namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Employee 
        // For retrieval, we want to map from Employee to EmployeeDto, including the department name
        CreateMap<Employee, EmployeeDto>()
            .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : string.Empty))
            // âœ… W1/I4 Fix: map PositionId ÙˆPositionTitle ÙˆUserId
            .ForMember(dest => dest.PositionId,
                opt => opt.MapFrom(src => src.PositionId))
            .ForMember(dest => dest.PositionTitle,
                opt => opt.MapFrom(src => src.Position != null ? src.Position.Title : string.Empty))
            .ForMember(dest => dest.UserId,
                opt => opt.MapFrom(src => src.UserId));


        // For creation, we want to map from CreateEmployeeDto to Employee
        CreateMap<CreateEmployeeDto, Employee>();

        // For update, we want to ignore null values to allow partial updates
        CreateMap<UpdateEmployeeDto, Employee>()
            .ForAllMembers(opt => opt.Condition(
                (src, dest, srcMember) => srcMember != null));  // Ignore null values during update

        CreateMap<Employee, EmployeeProfileDto>()
            .ForMember(d => d.FullName, o => o.MapFrom(s => $"{s.FirstName} {s.LastName}"))
            .ForMember(d => d.Phone, o => o.MapFrom(s => s.PhoneNumber))  // âœ… PhoneNumber â†’ Phone
            .ForMember(dest => dest.DepartmentName,
                    opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : string.Empty))
          .ForMember(d => d.PositionTitle, o => o.MapFrom(s => s.Position != null ? s.Position.Title : string.Empty));

        CreateMap<Department, DepartmentDto>()
          .ForMember(d => d.EmployeeCount,
            o => o.MapFrom(s => s.Employees != null ? s.Employees.Count : 0));

        CreateMap<CreateDepartmentDto, Department>();
        CreateMap<UpdateDepartmentDto, Department>();

        CreateMap<Position, PositionDto>()
      .ForMember(d => d.DepartmentName,
          o => o.MapFrom(s => s.Department != null ? s.Department.Name : string.Empty))
      .ForMember(d => d.EmployeeCount,
          o => o.MapFrom(s => s.Employees != null ? s.Employees.Count : 0));

        CreateMap<CreatePositionDto, Position>();

        CreateMap<UpdatePositionDto, Position>()
            .ForAllMembers(opt => opt.Condition(
                (src, dest, srcMember) => srcMember != null));



        CreateMap<Leave, LeaveDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty))
            .ForMember(d => d.LeaveType, o => o.MapFrom(s => s.LeaveType.ToString()))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.Reason, o => o.MapFrom(s => s.Reason))
            .ForMember(d => d.RejectionReason, o => o.MapFrom(s => s.RejectionReason));









        CreateMap<Attendance, AttendanceDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty))
            .ForMember(d => d.TotalHours,
                o => o.MapFrom(s => s.ClockOut.HasValue
                    ? FormatHours(s.ClockIn, s.ClockOut.Value)
                    : null));

        
        CreateMap<Salary, SalaryDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty));

       
        CreateMap<Notification, NotificationDto>()
            .ForMember(d => d.Type,
                o => o.MapFrom(s => s.Type.ToString()));

        CreateMap<User, UserDto>()
    .ForMember(d => d.EmployeeName,
        o => o.MapFrom(s => s.Employee != null
            ? $"{s.Employee.FirstName} {s.Employee.LastName}"
            : null));
    }

// Helper method ÙÙŠ Ù†ÙØ³ Ø§Ù„Ù€ MappingProfile
private static string FormatHours(TimeOnly clockIn, TimeOnly clockOut)
    {
        var duration = clockOut.ToTimeSpan() - clockIn.ToTimeSpan();
        return $"{(int)duration.TotalHours}h {duration.Minutes}m";
    }





}

``

## D:\HRMS-Team\HRMS-GradProject\Controllers\AIInsightsController.cs

``cs
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HRMS_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AIInsightsController : ControllerBase
    {
        public class ChatRequest { public string Message { get; set; } = string.Empty; }

        private readonly ILeaveService _leaveService;
        private readonly IEmployeeService _employeeService;
        private readonly IAttendanceService _attendanceService;
        private readonly ISalaryService _salaryService;
        private readonly IDepartmentService _departmentService;
        private readonly IConfiguration _configuration;

        public AIInsightsController(
            ILeaveService leaveService,
            IEmployeeService employeeService,
            IAttendanceService attendanceService,
            ISalaryService salaryService,
            IDepartmentService departmentService,
            IConfiguration configuration)
        {
            _leaveService = leaveService;
            _employeeService = employeeService;
            _attendanceService = attendanceService;
            _salaryService = salaryService;
            _departmentService = departmentService;
            _configuration = configuration;
        }

        // â”€â”€â”€ Core Groq helper (OpenAI Compatible) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        private async Task<string> GetAIResponseAsync(string prompt)
        {
            string apiKey = _configuration["GeminiApiKey"];
            if (string.IsNullOrEmpty(apiKey)) return "ðŸ’¡ ÙŠØ±Ø¬Ù‰ Ø¥Ø¶Ø§ÙØ© Ù…ÙØªØ§Ø­ Gemini ÙÙŠ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª.";

            string url = "https://api.groq.com/openai/v1/chat/completions";
            var requestBody = new
            {
                model = "llama-3.1-8b-instant",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                temperature = 0.5
            };

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            
            try 
            {
                var response = await httpClient.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    using var jsonDoc = JsonDocument.Parse(responseString);
                    var root = jsonDoc.RootElement;
                    string text = root.GetProperty("choices")[0]
                                     .GetProperty("message")
                                     .GetProperty("content").GetString() ?? "";
                    
                    text = text.Replace("**", "").Replace("\n", " ");
                    return "ðŸš€ " + text.Trim();
                }

                return "ðŸ’¡ Ø¹Ø°Ø±Ø§Ù‹ØŒ Ø®Ø¯Ù…Ø© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ (Groq) ØºÙŠØ± Ù…ØªÙˆÙØ±Ø© Ø­Ø§Ù„ÙŠØ§Ù‹.";
            }
            catch 
            {
                return "ðŸ’¡ Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ.";
            }
        }

        // â”€â”€â”€ Build full admin context from ALL tables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        private async Task<string> BuildAdminContextAsync()
        {
            try
            {
                var employees = await _employeeService.GetAllAsync(1, 200);
                var leaves = await _leaveService.GetAllAsync(1, 500);
                var attendance = await _attendanceService.GetAllAsync(1, 500);
                var salaries = await _salaryService.GetAllAsync(1, 500);
                var departments = await _departmentService.GetAllAsync();

                var empNames = string.Join(", ", employees.Items.Select(e => e.FullName));
                var pendingLeaves = leaves.Items.Count(l => l.Status == "Pending");
                var approvedLeaves = leaves.Items.Count(l => l.Status == "Approved");
                var workingNow = attendance.Items.Where(a => a.ClockIn != null).Select(a => a.EmployeeName).Distinct().ToList();
                var missingOut = attendance.Items.Where(a => a.ClockOut == null && a.ClockIn != null).Select(a => a.EmployeeName).Distinct().ToList();
                var totalSalaryNet = salaries.Items.Sum(s => s.NetAmount);
                var totalSalaryGross = salaries.Items.Sum(s => s.GrossAmount);
                var deptNames = string.Join(", ", departments.Select(d => d.Name));

                // Per-department employee count
                var deptBreakdown = employees.Items
                    .GroupBy(e => e.DepartmentName ?? "ØºÙŠØ± Ù…Ø­Ø¯Ø¯")
                    .Select(g => $"{g.Key}: {g.Count()} Ù…ÙˆØ¸Ù")
                    .ToList();

                return $@"
[Ù‚Ø§Ø¹Ø¯Ø© Ø¨ÙŠØ§Ù†Ø§Øª ÙƒØ§Ù…Ù„Ø© Ù…Ù† Ø§Ù„Ù†Ø¸Ø§Ù… - Kawadir HRMS - Ù„Ù„Ù…Ø¯ÙŠØ± ÙÙ‚Ø·]:
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†: {employees.TotalCount}
- Ø£Ø³Ù…Ø§Ø¡ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†: {empNames}
- Ø§Ù„Ø£Ù‚Ø³Ø§Ù… ({departments.Count} Ù‚Ø³Ù…): {deptNames}
- ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…: {string.Join(" | ", deptBreakdown)}
- Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø© Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©: {pendingLeaves}
- Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø© Ø§Ù„Ù…ÙˆØ§ÙÙ‚ Ø¹Ù„ÙŠÙ‡Ø§: {approvedLeaves}
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©: {leaves.Items.Count}
- Ø§Ù„Ù…ÙˆØ¸ÙÙˆÙ† Ø§Ù„Ø¹Ø§Ù…Ù„ÙˆÙ† Ø§Ù„Ø¢Ù† (Ø³Ø¬Ù„ÙˆØ§ Ø¯Ø®ÙˆÙ„Ø§Ù‹): {(workingNow.Any() ? string.Join(", ", workingNow) : "Ù„Ø§ ÙŠÙˆØ¬Ø¯")}
- Ù…ÙˆØ¸ÙÙˆÙ† Ù„Ù… ÙŠØ³Ø¬Ù„ÙˆØ§ Ø®Ø±ÙˆØ¬Ø§Ù‹ Ø¨Ø¹Ø¯: {(missingOut.Any() ? string.Join(", ", missingOut) : "Ù„Ø§ ÙŠÙˆØ¬Ø¯")}
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ© Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø©: {totalSalaryGross:F0} JD
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø§Ù„ØµØ§ÙÙŠØ© Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø©: {totalSalaryNet:F0} JD
";
            }
            catch
            {
                return "[ØªØ¹Ø°Ù‘Ø± Ø¬Ù„Ø¨ Ø¨Ø¹Ø¶ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ù† Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª]";
            }
        }

        // â”€â”€â”€ Unified page-aware insight endpoint â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("insight/{page}")]
        [Authorize]
        public async Task<IActionResult> GetPageInsight(string page, [FromQuery] string role = "employee")
        {
            bool isAdmin = User.IsInRole("Admin") || User.IsInRole("HR");
            string prompt;

            if (isAdmin)
            {
                string ctx = await BuildAdminContextAsync();
                prompt = page.ToLower() switch
                {
                    "employees" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯ ÙÙ‚Ø·) ØªØ®Øµ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† (Ù…Ø«Ù„: ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…ØŒ Ù…Ø¹Ø¯Ù„ Ø§Ù„Ø­Ø¶ÙˆØ±ØŒ Ø£Ùˆ Ø§Ù‚ØªØ±Ø§Ø­ Ø¥Ø¬Ø±Ø§Ø¡). Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "leaves" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªØ®Øµ Ø¥Ø¯Ø§Ø±Ø© Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø© Ø§Ù„Ù…Ø¹Ù„Ù‚Ø© ÙˆØ§Ù„Ù…Ø¹ØªÙ…Ø¯Ø©. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "departments" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªØ®Øµ Ù‡ÙŠÙƒÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù… ÙˆØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "salary" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…Ø§Ù„ÙŠ ÙÙŠ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø£Ùˆ ØªÙˆØ²ÙŠØ¹Ù‡Ø§. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "attendance" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø­Ø¶ÙˆØ± Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ø§Ù„Ø§Ù„ØªØ²Ø§Ù… Ø¨Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø­Ø¶ÙˆØ± ÙˆØ§Ù„ØºÙŠØ§Ø¨. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    // dashboard default
                    _ => $@"{ctx}
Ø£Ù†Øª Ù…Ø³ØªØ´Ø§Ø± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø´Ø§Ù…Ù„Ø© Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© Ø¥Ø¯Ø§Ø±ÙŠØ© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªØµÙ„Ø­ Ù„Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª."
                };
            }
            else
            {
                // Employee - fetch personal data only
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                string personalCtx = "";
                if (int.TryParse(userIdStr, out int userId))
                {
                    try
                    {
                        var myLeaves = await _leaveService.GetMyLeavesAsync(userId, 1, 100);
                        var totalApproved = myLeaves.Items.Where(l => l.Status == "Approved" && l.LeaveType == "Annual").Sum(l => l.TotalDays);
                        var pending = myLeaves.Items.Count(l => l.Status == "Pending");
                        personalCtx = $"- Ø±ØµÙŠØ¯ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø§Ù„Ø³Ù†ÙˆÙŠØ© Ø§Ù„Ù…ØªØ¨Ù‚ÙŠ: {14 - totalApproved} ÙŠÙˆÙ…\n- Ø·Ù„Ø¨Ø§Øª Ø¥Ø¬Ø§Ø²Ø© Ù…Ø¹Ù„Ù‚Ø©: {pending}";
                    }
                    catch { }
                }

                prompt = page.ToLower() switch
                {
                    "leaves" => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø¨ÙŠØ§Ù†Ø§ØªÙŠ: {personalCtx}. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ ÙƒÙŠÙÙŠØ© Ø§Ù„ØªØ®Ø·ÙŠØ· Ù„Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø¨Ø§Ø­ØªØ±Ø§ÙÙŠØ©. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",
                    "salary" => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ø£Ù‡Ù…ÙŠØ© Ù…Ø±Ø§Ø¬Ø¹Ø© ÙƒØ´Ù Ø§Ù„Ø±Ø§ØªØ¨ Ø§Ù„Ø´Ù‡Ø±ÙŠ ÙˆØ§Ù„ØªØ£ÙƒØ¯ Ù…Ù† Ø¯Ù‚ØªÙ‡. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",
                    "attendance" => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ø§Ù„Ø§Ù„ØªØ²Ø§Ù… Ø¨Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø­Ø¶ÙˆØ± ÙˆØªØ£Ø«ÙŠØ±Ù‡ Ø¹Ù„Ù‰ Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„Ø³Ù†ÙˆÙŠ. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",
                    _ => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø¨ÙŠØ§Ù†Ø§ØªÙŠ: {personalCtx}. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© ÙˆØ¸ÙŠÙÙŠØ© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªÙ†Ø§Ø³Ø¨Ù†ÙŠ. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª."
                };
            }

            string advice = await GetAIResponseAsync(prompt);
            return Ok(new { data = advice, success = true });
        }

        // â”€â”€â”€ Legacy admin endpoint (kept for backward compat) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("admin")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAdminInsight()
        {
            return await GetPageInsight("dashboard", "admin");
        }

        // â”€â”€â”€ Legacy employee endpoint â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("employee")]
        [Authorize]
        public async Task<IActionResult> GetEmployeeInsight()
        {
            return await GetPageInsight("dashboard", "employee");
        }

        // â”€â”€â”€ Specific employee insight (for Employees table button) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("employee-insight/{employeeId}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetSpecificEmployeeInsight(int employeeId)
        {
            try
            {
                var employee = await _employeeService.GetByIdAsync(employeeId);
                if (employee == null) return NotFound("Ø§Ù„Ù…ÙˆØ¸Ù ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯");

                var attendance = await _attendanceService.GetMyAttendanceAsync(employeeId, 1, 100);
                var leaves = await _leaveService.GetMyLeavesAsync(employeeId, 1, 100);

                var totalLeaves = leaves.Items.Count;
                var missingPunches = attendance.Items.Count(a => a.ClockOut == null);
                var approvedLeaves = leaves.Items.Count(l => l.Status == "Approved");

                string prompt = $@"Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø£Ø¹Ø·Ù†ÙŠ ØªÙ‚ÙŠÙŠÙ…Ø§Ù‹ Ø³Ø±ÙŠØ§Ù‹ ÙˆÙ…Ø®ØªØµØ±Ø§Ù‹ Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± Ø£Ùˆ Ø³Ø·Ø±ÙŠÙ†) Ø­ÙˆÙ„ ÙƒÙŠÙÙŠØ© Ø§Ù„ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ¸Ù.
Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª: Ø§Ù„Ø§Ø³Ù…: {employee.FullName}ØŒ Ø§Ù„Ù…Ù†ØµØ¨: {employee.PositionTitle}ØŒ Ø§Ù„Ù‚Ø³Ù…: {employee.DepartmentName}.
Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©: {totalLeaves}ØŒ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø§Ù„Ù…ÙˆØ§ÙÙ‚ Ø¹Ù„ÙŠÙ‡Ø§: {approvedLeaves}ØŒ Ø­Ø§Ù„Ø§Øª Ù†Ø³ÙŠØ§Ù† Ø¨ØµÙ…Ø© Ø§Ù„Ø®Ø±ÙˆØ¬: {missingPunches}.
Ø§Ù‚ØªØ±Ø­ Ø¥Ø¬Ø±Ø§Ø¡Ù‹ (ØªØ±Ù‚ÙŠØ© / ØªØ­ÙÙŠØ² / Ù„ÙØª Ù†Ø¸Ø±) Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ù‡Ø°Ù‡ Ø§Ù„Ø£Ø±Ù‚Ø§Ù…. ÙƒÙ† Ù…Ø¨Ø§Ø´Ø±Ø§Ù‹ ÙˆØ§Ø­ØªØ±Ø§ÙÙŠØ§Ù‹ Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©.";

                string advice = await GetAIResponseAsync(prompt);
                advice = advice.Replace("âœ¨ ", "").Replace("ðŸ’¡ ", "").Replace("ðŸš€ ", "");
                return Ok(new { data = advice, success = true });
            }
            catch
            {
                return Ok(new { data = "Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª ÙƒØ§ÙÙŠØ© Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ¸Ù Ù„Ø¥Ø¹Ø·Ø§Ø¡ Ù†ØµÙŠØ­Ø© Ø¯Ù‚ÙŠÙ‚Ø©.", success = true });
            }
        }

        // â”€â”€â”€ Secure Chat endpoint â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpPost("chat")]
        [Authorize]
        public async Task<IActionResult> ChatWithAI([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("Ø§Ù„Ø±Ø³Ø§Ù„Ø© ÙØ§Ø±ØºØ©.");

            bool isAdmin = User.IsInRole("Admin") || User.IsInRole("HR");
            string contextData = "";
            string roleConstraints;

            if (isAdmin)
            {
                roleConstraints = "Ø£Ù†Øª ØªØªØ­Ø¯Ø« Ù…Ø¹ Ù…Ø¯ÙŠØ± Ø§Ù„Ù†Ø¸Ø§Ù… Ø£Ùˆ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ©. ÙŠØ­Ù‚ Ù„Ùƒ Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø±ÙÙ‚Ø© ÙˆØ§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ø¨Ø´ÙƒÙ„ Ø´Ø§Ù…Ù„ ÙˆØ¯Ù‚ÙŠÙ‚.";
                contextData = await BuildAdminContextAsync();
            }
            else
            {
                roleConstraints = "Ø£Ù†Øª ØªØªØ­Ø¯Ø« Ù…Ø¹ Ù…ÙˆØ¸Ù Ø¹Ø§Ø¯ÙŠ. ÙŠÙÙ…Ù†Ø¹ Ø§Ù„Ø¥ÙØµØ§Ø­ Ø¹Ù† Ø¨ÙŠØ§Ù†Ø§Øª Ø£ÙŠ Ù…ÙˆØ¸Ù Ø¢Ø®Ø± Ø£Ùˆ Ø±ÙˆØ§ØªØ¨Ù‡Ù…. Ø£Ø¬Ø¨ ÙÙ‚Ø· Ø¹Ù„Ù‰ Ø£Ø³Ø¦Ù„ØªÙ‡ Ø§Ù„Ø´Ø®ØµÙŠØ© Ø£Ùˆ Ø§Ø´Ø±Ø­ Ù„Ù‡ ÙƒÙŠÙÙŠØ© Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù†Ø¸Ø§Ù…. Ø¥Ø°Ø§ Ø·Ù„Ø¨ Ø¨ÙŠØ§Ù†Ø§Øª Ø®Ø§Ø±Ø¬ ØµÙ„Ø§Ø­ÙŠØ§ØªÙ‡ØŒ Ø§Ø¹ØªØ°Ø± Ø¨Ù„Ø¨Ø§Ù‚Ø©.";
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(userIdStr, out int userId))
                {
                    try
                    {
                        var myLeaves = await _leaveService.GetMyLeavesAsync(userId, 1, 100);
                        var totalApproved = myLeaves.Items.Where(l => l.Status == "Approved" && l.LeaveType == "Annual").Sum(l => l.TotalDays);
                        contextData = $"\n[Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ø§Ù„Ø´Ø®ØµÙŠØ©]:\n- Ø¥Ø¬Ø§Ø²Ø§Øª Ø³Ù†ÙˆÙŠØ© Ù…Ø³ØªÙ‡Ù„ÙƒØ©: {totalApproved} Ø£ÙŠØ§Ù…\n- Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„Ù…ØªØ¨Ù‚ÙŠ: {14 - totalApproved} Ø£ÙŠØ§Ù…\n";
                    }
                    catch { }
                }
            }

            string systemPrompt = $@"Ø£Ù†Øª Ù…Ø³Ø§Ø¹Ø¯ Ø°ÙƒÙŠ ÙˆÙ…Ø­ØªØ±Ù Ù…Ø®ØµØµ Ù„Ù†Ø¸Ø§Ù… Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ© Kawadir HRMS.
{roleConstraints}
Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ØªÙˆÙØ±Ø©:
{contextData}
Ø§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª:
1. Ø£Ø¬Ø¨ Ø¨Ø¥ÙŠØ¬Ø§Ø² Ø´Ø¯ÙŠØ¯ Ø¬Ø¯Ø§Ù‹ ÙˆØ¨Ø´ÙƒÙ„ Ù…Ø¨Ø§Ø´Ø± Ø¹Ù„Ù‰ Ù‚Ø¯Ø± Ø§Ù„Ø³Ø¤Ø§Ù„ (Ø¬Ù…Ù„Ø© Ø£Ùˆ Ø¬Ù…Ù„ØªÙŠÙ† ÙƒØ­Ø¯ Ø£Ù‚ØµÙ‰).
2. Ù„Ø§ ØªÙ‚Ù… Ø¨Ø³Ø±Ø¯ ØªÙØ§ØµÙŠÙ„ Ø£Ùˆ Ø´Ø±ÙˆØ­Ø§Øª Ø¥Ø¶Ø§ÙÙŠØ© Ø¥Ù„Ø§ Ø¥Ø°Ø§ Ø·Ù„Ø¨ Ù…Ù†Ùƒ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø°Ù„Ùƒ ØµØ±Ø§Ø­Ø©Ù‹ (Ù„ØªÙˆÙÙŠØ± Ø§Ù„Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ).
3. Ø£Ø¬Ø¨ ÙƒØ£Ù†Ùƒ Ø¬Ø²Ø¡ Ù…Ù† Ø§Ù„Ù†Ø¸Ø§Ù… Ù†ÙØ³Ù‡ ÙˆÙ„ÙŠØ³ ÙƒØ°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø®Ø§Ø±Ø¬ÙŠ.
Ø±Ø³Ø§Ù„Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…: {request.Message}";

            string response = await GetAIResponseAsync(systemPrompt);
            response = response.Replace("âœ¨ ", "").Replace("ðŸ’¡ ", "").Replace("ðŸš€ ", "");
            return Ok(new { data = response, success = true });
        }
    }
}

``

## D:\HRMS-Team\HRMS-GradProject\Controllers\AttendanceController.cs

``cs
using Application.Common;
using Application.DTOs.Attendance;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    
    [ApiController]
    [Route("api/attendance")]
    [Authorize]
    public class AttendanceController(IAttendanceService attendanceService) : ControllerBase
    {
        // GET /api/attendance → HR · Admin
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await attendanceService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<AttendanceDto>>.Ok(result));
        }

        // GET /api/attendance/my → Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMyAttendance( [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) || !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            }
            var result = await attendanceService.GetMyAttendanceAsync(  employeeId, pageNumber, pageSize);

            return Ok(ApiResponse<PagedResult<AttendanceDto>>.Ok(result));
        }

        // GET /api/attendance/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await attendanceService.GetByIdAsync(id) ?? throw new KeyNotFoundException($"Attendance {id} not found");

            return Ok(ApiResponse<AttendanceDto>.Ok(result));
        }

        // POST /api/attendance/clockin → Employee
        [HttpPost("clockin")]
        [ValidateModel]
        public async Task<IActionResult> ClockIn([FromBody] ClockInDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await attendanceService.ClockInAsync(employeeId, dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<AttendanceDto>.Ok(result, "Clocked in successfully"));
        }

        [HttpPut("clockout")]
        [ValidateModel]
        public async Task<IActionResult> ClockOut([FromBody] ClockOutDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await attendanceService.ClockOutAsync(employeeId, dto);
            return Ok(ApiResponse<AttendanceDto>.Ok(result, "Clocked out successfully"));
        }
    }
}

``

## D:\HRMS-Team\HRMS-GradProject\Controllers\AuthController.cs

``cs
using Application.Common;
using Application.DTOs.Auth;
using Application.DTOs.User;
using Application.Interfaces;
using Application.Services;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService, IUserService userService, IUnitOfWork uow) : ControllerBase
{
    // POST api/auth/login
    [HttpPost("login")]
    [ValidateModel]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await authService.LoginAsync(dto);

        return result is null
            ? Unauthorized(ApiResponse.Fail("Invalid email or password"))
            : Ok(ApiResponse<AuthResponseDto>.Ok(result, "Login successful"));
    }

    // POST api/auth/register — Admin only
    [HttpPost("register")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var success = await authService.RegisterAsync(dto);

        return success
            ? Ok(ApiResponse.Ok("User registered successfully"))
            : BadRequest(ApiResponse.Fail("Email already exists"));
    }

    // POST api/auth/change-password
    [HttpPost("change-password")]
    [Authorize]
    [ValidateModel]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var success = await authService.ChangePasswordAsync(userId, dto);

        return success
            ? Ok(ApiResponse.Ok("Password changed successfully"))
            : BadRequest(ApiResponse.Fail("Current password is incorrect"));
    }

    // GET api/auth/me
    [HttpGet("me")]
    [Authorize]
    public IActionResult Me()
    {
        var result = new MeDto
        {
            Id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!),
            Email = User.FindFirstValue(ClaimTypes.Email)!,
            Role = User.FindFirstValue(ClaimTypes.Role)!,
            EmployeeId = User.FindFirstValue("employeeId")
        };

        return Ok(ApiResponse<MeDto>.Ok(result));
    }

    [HttpGet("users")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetAllUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await userService.GetAllEmployeesAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<UserDto>>.Ok(result, "Users retrieved successfully"));
    }

    [HttpGet("unassigned-employees")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetUnassignedEmployeeUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await userService.GetUnassignedEmployeeUsersAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<UserDto>>.Ok(result, "Unassigned Employee Users retrieved successfully"));
    }

    // GET api/auth/get-user-id-by-email/{email}
    [HttpGet("get-user-id-by-email/{email}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetUserIdByEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return BadRequest(ApiResponse.Fail("Email is required"));

        var user = await uow.Repository<User>()
                            .GetAllQueryable()
                            .FirstOrDefaultAsync(u => u.Email == email);

        if (user is null)
            return NotFound(ApiResponse.Fail("User not found"));

        return Ok(ApiResponse<int>.Ok(user.Id, "User ID retrieved successfully"));
    }
}
``

## D:\HRMS-Team\HRMS-GradProject\Controllers\DepartmentController.cs

``cs
using Application.Common;
using Application.DTOs.Department;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/departments")]
[Authorize]
public class DepartmentController(IDepartmentService departmentService) : ControllerBase
{
    // GET api/departments
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await departmentService.GetAllAsync();
        return Ok(ApiResponse<List<DepartmentDto>>.Ok(departments));
    }

    // GET api/departments/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var department = await departmentService.GetByIdAsync(id);

        return department is null
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse<DepartmentDto>.Ok(department));
    }

    // POST api/departments
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
    {
        var department = await departmentService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = department.Id },
            ApiResponse<DepartmentDto>.Ok(department, "Department created successfully"));
    }

    // PUT api/departments/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto dto)
    {
        var department = await departmentService.UpdateAsync(id, dto);

        return department is null
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse<DepartmentDto>.Ok(department, "Department updated successfully"));
    }

    // DELETE api/departments/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await departmentService.DeleteAsync(id);

        return !result
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse.Ok("Department deleted successfully"));
    }
}
``

## D:\HRMS-Team\HRMS-GradProject\Controllers\EmployeeController.cs

``cs
using Application.Common;
using Application.DTOs.Employee;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/employees")]
public class EmployeeController(IEmployeeService employeeService) : ControllerBase
{
    // GET api/employees?pageNumber=1&pageSize=10
    [HttpGet]
    public async Task<IActionResult> GetAll( [FromQuery] int pageNumber = 1,[FromQuery] int pageSize = 10)
    {
        var employees = await employeeService.GetAllAsync(pageNumber, pageSize);

        return Ok(ApiResponse<PagedResult<EmployeeDto>>.Ok(employees));
    }

    // GET api/employees/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await employeeService.GetByIdAsync(id);


        return employee is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeDto>.Ok(employee));
    }

    // GET api/employees/5/profile
    [HttpGet("{id}/profile")]
    public async Task<IActionResult> GetProfile(int id)
    {
        var profile = await employeeService.GetProfileAsync(id);



        return profile is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeProfileDto>.Ok(profile));
    }

    // GET api/employees/me
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        var employeeId = User.FindFirstValue("employeeId");

        if (string.IsNullOrEmpty(employeeId))
        {
            return NotFound(ApiResponse.Fail("No employee linked to this account"));
        }

        var employee = await employeeService.GetProfileAsync(int.Parse(employeeId));


        return employee is null
            ? NotFound(ApiResponse.Fail("Employee not found"))
            : Ok(ApiResponse<EmployeeProfileDto>.Ok(employee));
    }

    // POST api/employees
    [HttpPost]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
    {
        var employee = await employeeService.CreateAsync(dto);


        return CreatedAtAction(nameof(GetById), new { id = employee.Id },
            ApiResponse<EmployeeDto>.Ok(employee, "Employee created successfully"));
    }

    // PUT api/employees/5
    [HttpPut("{id}")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
    {
        var employee = await employeeService.UpdateAsync(id, dto);


        return employee is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeDto>.Ok(employee, "Employee updated successfully"));
    }

    // DELETE api/employees/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {

        var result = await employeeService.DeleteAsync(id);


        return !result
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse.Ok("Employee deleted successfully"));
    }
}



//repository pattern 
// Generic repository => CRUD operations for all entities  => Clean Artitecture 
// Auto Mapper => DTOs => Data Transfer Objects => Avoid exposing internal data structures => Security and flexibility



``

## D:\HRMS-Team\HRMS-GradProject\Controllers\LeaveController.cs

``cs
using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    [ApiController]
    [Route("api/leaves")]
    [Authorize]
    public class LeaveController(ILeaveService leaveService) : ControllerBase
    {
        // GET /api/leaves?pageNumber=1&pageSize=10 
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await leaveService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/my     Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMyLeaves([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            // âœ… Bug #9 Fix: Ø­Ù…Ø§ÙŠØ© Ù…Ù† NullReferenceException Ù„Ùˆ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù„ÙŠØ³ Ù…ÙˆØ¸ÙØ§Ù‹
            var employeeIdClaim = User.FindFirstValue("employeeId");
            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            }
            var result = await leaveService.GetMyLeavesAsync(employeeId, pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await leaveService.GetByIdAsync(id)
                         ?? throw new KeyNotFoundException($"Leave {id} not found");
            return Ok(ApiResponse<LeaveDto>.Ok(result));
        }

        // POST /api/leaves â†’ Employee
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] CreateLeaveDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));
            }

            var result = await leaveService.CreateAsync(employeeId, dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<LeaveDto>.Ok(result, "Leave request submitted successfully"));
        }

        // PUT /api/leaves/{id}/status â†’ HR Â· Admin
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin,HR")]
        [ValidateModel]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateLeaveStatusDto dto)
        {
            var reviewerUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await leaveService.UpdateStatusAsync(id, reviewerUserId, dto);
            return Ok(ApiResponse<LeaveDto>.Ok(result, "Leave status updated successfully"));
        }

        // DELETE /api/leaves/{id} â†’ Employee (Pending only)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // âœ… Bug #9 Fix: Ø­Ù…Ø§ÙŠØ© Ù…Ù† NullReferenceException
            var employeeIdClaim = User.FindFirstValue("employeeId");
            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            }
            await leaveService.DeleteAsync(id, employeeId);
            return Ok(ApiResponse.Ok("Leave request deleted successfully"));
        }
    }
}

``

## D:\HRMS-Team\HRMS-GradProject\Controllers\NotificationController.cs

``cs
using Application.Common;
using Application.DTOs.Notification;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    // HRMS_API/Controllers/NotificationController.cs
    [ApiController]
    [Route("api/notifications")]
    [Authorize]
    public class NotificationController(
        INotificationService notificationService) : ControllerBase
    {
        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // GET /api/notifications
        [HttpGet]
        public async Task<IActionResult> GetMy()
        {
            var result = await notificationService
                             .GetMyNotificationsAsync(GetUserId());
            return Ok(ApiResponse<List<NotificationDto>>.Ok(result));
        }

        // GET /api/notifications/unread-count
        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var count = await notificationService.GetUnreadCountAsync(GetUserId());
            return Ok(ApiResponse<int>.Ok(count));
        }

        // PUT /api/notifications/{id}/read
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await notificationService.MarkAsReadAsync(id, GetUserId());
            return Ok(ApiResponse.Ok("Notification marked as read"));
        }

        // PUT /api/notifications/read-all
        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            await notificationService.MarkAllAsReadAsync(GetUserId());
            return Ok(ApiResponse.Ok("All notifications marked as read"));
        }

        // DELETE /api/notifications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await notificationService.DeleteAsync(id, GetUserId());
            return Ok(ApiResponse.Ok("Notification deleted"));
        }
    }
}

``

## D:\HRMS-Team\HRMS-GradProject\Controllers\PositionController.cs

``cs
using Application.Common;
using Application.DTOs.Position;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/positions")]
[Authorize]
public class PositionController(IPositionService positionService) : ControllerBase
{
    // GET api/positions
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var positions = await positionService.GetAllAsync();

        return Ok(ApiResponse<List<PositionDto>>.Ok(positions));
    }

    // GET api/positions/department/2
    [HttpGet("department/{departmentId}")]
    public async Task<IActionResult> GetByDepartment(int departmentId)
    {
        var positions = await positionService.GetByDepartmentAsync(departmentId);

        return Ok(ApiResponse<List<PositionDto>>.Ok(positions));
    }

    // GET api/positions/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var position = await positionService.GetByIdAsync(id);

        return position is null
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse<PositionDto>.Ok(position));
    }

    // POST api/positions
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreatePositionDto dto)
    {
        var position = await positionService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById), new { id = position.Id },
            ApiResponse<PositionDto>.Ok(position, "Position created successfully"));
    }

    // PUT api/positions/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdatePositionDto dto)
    {
        var position = await positionService.UpdateAsync(id, dto);

        return position is null
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse<PositionDto>.Ok(position, "Position updated successfully"));
    }

    // DELETE api/positions/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await positionService.DeleteAsync(id);

        return !result
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse.Ok("Position deleted successfully"));
    }
}
``

## D:\HRMS-Team\HRMS-GradProject\Controllers\SalaryController.cs

``cs
using Application.Common;
using Application.DTOs.Salary;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    // HRMS_API/Controllers/SalaryController.cs
    [ApiController]
    [Route("api/salaries")]
    [Authorize]
    public class SalaryController(ISalaryService salaryService) : ControllerBase
    {
        // GET /api/salaries → Admin · HR
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await salaryService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<SalaryDto>>.Ok(result));
        }

        // GET /api/salaries/my → Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMy(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await salaryService.GetMyAsync(employeeId, pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<SalaryDto>>.Ok(result));
        }

        // GET /api/salaries/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await salaryService.GetByIdAsync(id)
                         ?? throw new KeyNotFoundException($"Salary {id} not found");

            return Ok(ApiResponse<SalaryDto>.Ok(result));
        }

        // POST /api/salaries → Admin
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] CreateSalaryDto dto)
        {
            var result = await salaryService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<SalaryDto>.Ok(result, "Salary created successfully"));
        }

        // PUT /api/salaries/{id} → Admin
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ValidateModel]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSalaryDto dto)
        {
            var result = await salaryService.UpdateAsync(id, dto);
            return Ok(ApiResponse<SalaryDto>.Ok(result, "Salary updated successfully"));
        }

        // DELETE /api/salaries/{id} → Admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await salaryService.DeleteAsync(id);
            return Ok(ApiResponse.Ok("Salary deleted successfully"));
        }
    }
}

``


