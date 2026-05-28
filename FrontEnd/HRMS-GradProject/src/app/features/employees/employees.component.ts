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
import { PdfExportService } from '../../core/services/pdf-export.service';
import { ExcelExportService } from '../../core/services/excel-export.service';

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
  private pdfExportService = inject(PdfExportService);
  private excelExportService = inject(ExcelExportService);

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

    const data = this.employeesList.map((emp) => [
      emp.id,
      emp.firstName || '',
      emp.lastName || '',
      emp.email || '',
      emp.phoneNumber || 'N/A',
      emp.address || 'N/A',
      emp.isActive ? 'Active' : 'Inactive',
      emp.roleId || 'N/A',
    ]);

    this.excelExportService.exportTableToExcel(headers, data, 'Employees');
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

    this.currentPage = 1;
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

    if (!emp) return;

    this.isGeneratingReport = true;
    const empName =
      `${emp.firstName || ''} ${emp.lastName || ''}`.trim() ||
      `Employee #${emp.id}`;

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
    doc.text(`Department: ${emp.departmentName || '—'}`, 18, 68);
    doc.text(`Position: ${emp.positionTitle || '—'}`, 18, 74);

    const hireDate = emp.hireDate ? emp.hireDate.split('T')[0] : '—';
    doc.text(`Hire Date: ${hireDate}`, pageW / 2, 62);
    doc.text(`Email: ${emp.email || '—'}`, pageW / 2, 68);
    doc.text(
      `Status: ${emp.isActive !== false ? 'Active' : 'Inactive'}`,
      pageW / 2,
      74,
    );

    let curY = 90;

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
            `$${s.baseAmount ?? '—'}`,
            `+$${s.allowances ?? 0}`,
            `-$${s.deductions ?? 0}`,
            `$${s.netAmount ?? '—'}`,
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
          a.date ? a.date.split('T')[0] : '—',
          a.clockIn || '—',
          a.clockOut && a.clockOut !== '00:00:00' ? a.clockOut : '—',
          a.totalHours || '—',
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
          l.startDate ? l.startDate.split('T')[0] : '—',
          l.endDate ? l.endDate.split('T')[0] : '—',
          l.totalDays ?? '—',
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

    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text(
        'Confidential – Kawadir HRMS – System Generated Report',
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

  exportToPDF() {
    if (this.employeesList.length === 0) {
      Swal.fire('No Data', 'There are no employees to export.', 'info');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Status'];
    const data = this.employeesList.map(emp => [
      `#${emp.id}`,
      `${emp.firstName || ''} ${emp.lastName || ''}`.trim(),
      emp.email || 'N/A',
      emp.phoneNumber || 'N/A',
      emp.departmentName || 'N/A',
      emp.isActive ? 'Active' : 'Inactive'
    ]);

    const additionalInfo = [
      { label: 'Total Employees', value: String(this.employeesList.length) },
      { label: 'Active Employees', value: String(this.employeesList.filter(e => e.isActive).length) },
      { label: 'Filtered Department', value: this.selectedDepartment ? this.selectedDepartment : 'All' }
    ];

    this.pdfExportService.generateTableReport(
      'Employees Directory',
      headers,
      data,
      'Employees_Report',
      additionalInfo
    );
  }
}
