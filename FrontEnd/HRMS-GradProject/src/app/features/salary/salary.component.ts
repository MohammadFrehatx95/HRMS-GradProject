import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalaryService } from '../../core/services/salary.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import { DepartmentService } from '../../core/services/department.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { ExcelExportService } from '../../core/services/excel-export.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskDirective } from 'ngx-mask';

declare var bootstrap: any;

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, MatDatepickerModule, MatNativeDateModule, NgxMaskDirective],
  templateUrl: './salary.component.html',
})
export class SalaryComponent implements OnInit {
  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private departmentService = inject(DepartmentService);
  private pdfExportService = inject(PdfExportService);
  private excelExportService = inject(ExcelExportService);

  salariesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;
  isProcessing: boolean = false;
  isViewingAll: boolean = false;
  hasDraftSalaries: boolean = false;

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
  departments: any[] = [];

  wizardStep = 1;
  previewMonth = new Date().getMonth() + 1;
  previewYear = new Date().getFullYear();
  previewDepartmentId: number | null = null;
  previewData: any = null;
  isPreviewLoading = false;
  payrollWizardModal: any;
  excludedEmployees: Set<number> = new Set<number>();

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCount: number = 0;

  get paginatedSalaries() {
    return this.salariesList;
  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadSalaries();
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
    
    if (this.isAdmin) {
        this.isViewingAll = true;
    }

    const currentYear = new Date().getFullYear();
    for(let i = 0; i < 5; i++) {
        this.uniqueYears.push(currentYear - i);
    }

    this.loadInitialData();
    if (this.isAdmin) {
      this.loadEmployees();
    }
  }

  loadInitialData() {
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (deps) => {
        this.departments = deps;
        this.loadSalaries();
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError(err);
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees(1, 1000).subscribe({
      next: (res: any) => {
        const extractedData = res.items || [];
        this.employeesList = extractedData;
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
    this.isLoading = true;
    
    const m = this.selectedMonth ? Number(this.selectedMonth) : undefined;
    const y = this.selectedYear ? Number(this.selectedYear) : undefined;

    const request = (this.isAdminOrHR && this.isViewingAll)
      ? this.salaryService.getAllSalaries(m, y, this.currentPage, this.itemsPerPage, this.salarySearchQuery)
      : this.salaryService.getMySalaries(m, y, this.currentPage, this.itemsPerPage, this.salarySearchQuery);

    request.subscribe({
      next: (res: any) => {
        this.salariesList = res.items || [];
        this.totalCount = res.totalCount || 0;
        this.hasDraftSalaries = this.salariesList.some(s => s.status === 'Draft');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salaries:', err);
        this.isLoading = false;
      },
    });
  }

  filterSalaries() {
    this.currentPage = 1;
    this.loadSalaries();
  }

  toggleViewAll() {
    this.isViewingAll = !this.isViewingAll;
    this.salarySearchQuery = '';
    this.selectedYear = '';
    this.selectedMonth = '';
    this.currentPage = 1;
    this.loadSalaries();
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

  openWizard() {
    this.wizardStep = 1;
    this.previewMonth = new Date().getMonth() + 1;
    this.previewYear = new Date().getFullYear();
    this.previewDepartmentId = null;
    this.previewData = null;
    this.excludedEmployees.clear();

    const modalEl = document.getElementById('payrollWizardModal');
    if (modalEl) {
      this.payrollWizardModal = new bootstrap.Modal(modalEl);
      this.payrollWizardModal.show();
    }
  }

  previewPayroll() {
    this.isPreviewLoading = true;
    this.salaryService.previewBatch(this.previewMonth, this.previewYear, this.previewDepartmentId).subscribe({
      next: (res: any) => {
        this.previewData = res?.data ?? res;
        this.isPreviewLoading = false;
        this.wizardStep = 2;
      },
      error: (err) => {
        this.isPreviewLoading = false;
        this.handleError(err);
      }
    });
  }

  confirmGeneratePayroll() {
    this.isPreviewLoading = true;
    const excludedIds = Array.from(this.excludedEmployees);
    this.salaryService.generateBatch(this.previewMonth, this.previewYear, this.previewDepartmentId, excludedIds).subscribe({
      next: (res: any) => {
        const count = res?.data ?? res;
        this.isPreviewLoading = false;
        if (this.payrollWizardModal) {
          this.payrollWizardModal.hide();
        }
        Swal.fire('Success', `Generated ${count} salaries successfully.`, 'success');
        this.loadSalaries();
      },
      error: (err) => {
        this.isPreviewLoading = false;
        this.handleError(err);
      }
    });
  }

  generatePayroll() {
    this.openWizard();
  }

  toggleExcludeEmployee(employeeId: number) {
    if (this.excludedEmployees.has(employeeId)) {
      this.excludedEmployees.delete(employeeId);
    } else {
      this.excludedEmployees.add(employeeId);
    }
  }

  get dynamicEmployeeCount(): number {
    if (!this.previewData || !this.previewData.salaries) return 0;
    return this.previewData.salaries.filter((s: any) => !this.excludedEmployees.has(s.employeeId)).length;
  }

  get dynamicTotalCost(): number {
    if (!this.previewData || !this.previewData.salaries) return 0;
    return this.previewData.salaries
      .filter((s: any) => !this.excludedEmployees.has(s.employeeId))
      .reduce((sum: number, s: any) => sum + s.netAmount, 0);
  }

  markAsPaid() {
    if (!this.selectedMonth || !this.selectedYear) {
      Swal.fire('Filter Required', 'Please filter by a specific Month and Year before approving salaries.', 'warning');
      return;
    }
    
    Swal.fire({
      title: 'Approve Salaries',
      text: `This will lock all draft salaries for ${this.selectedMonth}/${this.selectedYear}. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryService.markAsPaid(Number(this.selectedMonth), Number(this.selectedYear)).subscribe({
          next: (res: any) => {
            const count = res?.data ?? res;
            Swal.fire('Approved!', `Successfully approved ${count} salaries.`, 'success');
            this.loadSalaries();
          },
          error: (err) => this.handleError(err)
        });
      }
    });
  }

  saveSalary() {
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
    Swal.fire('Error', getFriendlyErrorMessage(err, 'Failed to save salary data.'), 'error');
  }

  deleteSalary(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryService.deleteSalary(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The salary record has been deleted.', 'success');
            this.loadSalaries();
          },
          error: (err) => this.handleError(err)
        });
      }
    });
  }

  approveSalary(id: number) {
    Swal.fire({
      title: 'Approve Salary?',
      text: "This will mark the salary as Paid.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Approve'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryService.approveSalary(id).subscribe({
          next: () => {
            Swal.fire('Approved!', 'The salary has been approved.', 'success');
            this.loadSalaries();
          },
          error: (err) => this.handleError(err)
        });
      }
    });
  }

  downloadPayslip(salary: any) {
    const empName = salary.employeeName || `Employee #${salary.employeeId}`;
    const period = `${salary.month} / ${salary.year}`;
    const effObj = new Date(salary.effectiveDate);
    const effDate = `${effObj.getFullYear()}-${String(effObj.getMonth() + 1).padStart(2, '0')}-${String(effObj.getDate()).padStart(2, '0')}`;
    const fileName = `Payslip_${empName.replace(/ /g, '_')}_${salary.month}_${salary.year}`;

    const additionalInfo = [
      { label: 'Employee Name', value: empName },
      { label: 'Payroll Period', value: period },
      { label: 'Effective Date', value: effDate },
      { label: 'Net Pay', value: `${salary.netAmount} JD` }
    ];

    const data = [
      ['Base Salary', `${salary.baseAmount} JD`],
      ['Allowances', `+${salary.allowances} JD`],
      ['Gross Salary', `${salary.grossAmount} JD`],
      ['Deductions', `-${salary.deductions} JD`]
    ];

    this.pdfExportService.generateTableReport(
      'Salary Payslip',
      ['Description', 'Amount (JD)'],
      data,
      fileName,
      additionalInfo
    );
  }

  exportToExcel() {
    if (this.salariesList.length === 0) {
      Swal.fire('No Data', 'There are no salary records to export.', 'info');
      return;
    }

    const headers = ['Employee', 'Period (Month/Year)', 'Base (JD)', 'Allowances', 'Deductions', 'Net Salary', 'Effective Date'];
    const data = this.salariesList.map(s => [
      s.employeeName || `#${s.employeeId}`,
      `${s.month} / ${s.year}`,
      s.baseAmount,
      s.allowances,
      s.deductions,
      s.netAmount,
      s.effectiveDate ? s.effectiveDate.split('T')[0] : '—'
    ]);

    this.excelExportService.exportTableToExcel(headers, data, 'Salaries');
  }

  exportToPDF() {
    if (this.salariesList.length === 0) {
      Swal.fire('No Data', 'There are no salary records to export.', 'info');
      return;
    }

    const headers = ['Employee', 'Period (Month/Year)', 'Base ($)', 'Allowances', 'Deductions', 'Net Salary', 'Effective Date'];
    const data = this.salariesList.map(s => [
      s.employeeName || `#${s.employeeId}`,
      `${s.month} / ${s.year}`,
      s.baseAmount,
      s.allowances,
      s.deductions,
      s.netAmount,
      s.effectiveDate ? s.effectiveDate.split('T')[0] : '—'
    ]);

    const additionalInfo = [
      { label: 'Total Records', value: String(this.totalCount) },
      { label: 'Filtered Year', value: this.selectedYear ? this.selectedYear : 'All' },
      { label: 'Filtered Month', value: this.selectedMonth ? this.selectedMonth : 'All' }
    ];

    this.pdfExportService.generateTableReport(
      'Salaries Report',
      headers,
      data,
      'Salaries_Report',
      additionalInfo
    );
  }
}
