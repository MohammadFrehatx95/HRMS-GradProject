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
  private departmentService = inject(DepartmentService);
  private pdfExportService = inject(PdfExportService);
  private excelExportService = inject(ExcelExportService);

  allSalariesList: any[] = [];
  salariesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;
  isProcessing: boolean = false;
  isViewingAll: boolean = false;

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

  // Wizard state
  wizardStep = 1;
  previewMonth = new Date().getMonth() + 1;
  previewYear = new Date().getFullYear();
  previewDepartmentId: number | null = null;
  previewData: any = null;
  isPreviewLoading = false;
  payrollWizardModal: any;

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
    
    if (this.isAdmin) {
        this.isViewingAll = true;
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
      ? this.salaryService.getAllSalaries(m, y)
      : this.salaryService.getMySalaries(m, y);

    request.subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.allSalariesList = Array.isArray(extractedData)
          ? extractedData
          : [];
        this.salariesList = [...this.allSalariesList];

        if (!m && !y) {
          const years = this.allSalariesList
            .map((s) => s.year)
            .filter((y) => y != null);
          this.uniqueYears = Array.from(new Set(years))
            .sort()
            .reverse() as number[];
        }

        this.filterSalariesLocal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salaries:', err);
        this.isLoading = false;
      },
    });
  }

  filterSalaries() {
    this.loadSalaries();
  }

  filterSalariesLocal() {
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
      return matchesSearch;
    });

    if (this.salariesList.length > 0) {
      this.salariesList.sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year;
        }
        return b.month - a.month;
      });
    }

    this.currentPage = 1;
  }

  toggleViewAll() {
    this.isViewingAll = !this.isViewingAll;
    this.salarySearchQuery = '';
    this.selectedYear = '';
    this.selectedMonth = '';
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
    this.salaryService.generateBatch(this.previewMonth, this.previewYear, this.previewDepartmentId).subscribe({
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
    // We now use openWizard instead. Leaving this empty or removing it.
    this.openWizard();
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
      { label: 'Total Records', value: String(this.salariesList.length) },
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
