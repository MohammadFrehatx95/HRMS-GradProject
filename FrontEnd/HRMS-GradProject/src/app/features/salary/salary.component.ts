import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // لازم للـ forms
import { SalaryService } from '../../core/services/salary.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salary.component.html',
})
export class SalaryComponent implements OnInit {
  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  salariesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;       // أدمن (يضيف ويعدل)
  isAdminOrHR: boolean = false;   // أدمن أو hr (يشوف بس)
  isProcessing: boolean = false;

  salaryModal: any;
  isEditMode: boolean = false;
  currentSalaryId: number | null = null;
  
  employeesList: any[] = [];
  employeeSearchText: string = '';

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
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.employeesList = Array.isArray(extractedData) ? extractedData : [];
      },
      error: (err: any) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  onEmployeeSelect(event: any) {
    const val = event.target.value || '';
    const idMatch = val.match(/^(\d+)/);
    if (idMatch) {
      this.salaryData.employeeId = parseInt(idMatch[1], 10);
    } else {
      this.salaryData.employeeId = null;
    }
  }

  loadSalaries() {
    this.isLoading = true;
    const request = this.isAdminOrHR
      ? this.salaryService.getAllSalaries()
      : this.salaryService.getMySalaries();

    request.subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.salariesList = Array.isArray(extractedData) ? extractedData : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salaries:', err);
        this.isLoading = false;
      },
    });
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
      const emp = this.employeesList.find(e => e.id === salary.employeeId);
      this.employeeSearchText = emp ? `${emp.id} - ${emp.firstName} ${emp.lastName}` : (salary.employeeId ? String(salary.employeeId) : '');
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

    const modalEl = document.getElementById('salaryModal');
    if (modalEl) {
      this.salaryModal = new bootstrap.Modal(modalEl);
      this.salaryModal.show();
    }
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
      position: 'top-end',
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
}
