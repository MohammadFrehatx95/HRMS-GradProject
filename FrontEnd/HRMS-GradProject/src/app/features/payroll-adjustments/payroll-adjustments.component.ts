import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { PayrollAdjustmentService } from '../../core/services/payroll-adjustments.service';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import {
  AdjustmentType,
  PayrollAdjustmentDto,
} from '../../core/models/payroll-adjustment.model';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { ExcelExportService } from '../../core/services/excel-export.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-payroll-adjustments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './payroll-adjustments.component.html',
  styleUrls: ['./payroll-adjustments.component.css'],
})
export class PayrollAdjustmentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adjustmentService = inject(PayrollAdjustmentService);
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private authService = inject(AuthService);
  private pdfExportService = inject(PdfExportService);
  private excelExportService = inject(ExcelExportService);
  private router = inject(Router);

  adjustments: PayrollAdjustmentDto[] = [];
  employees: any[] = [];
  departments: any[] = [];
  isLoading = false;
  isSubmitting = false;
  isAdminOrHR = false;

  addForm: FormGroup;
  adjustmentTypes = [
    { value: AdjustmentType.Penalty, label: 'Penalty (Deduction)' },
    { value: AdjustmentType.Bonus, label: 'Bonus (Allowance)' },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCount: number = 0;

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAdjustments();
    }
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.loadAdjustments();
  }

  filterMonth: number | '' = '';
  filterYear: number | '' = new Date().getFullYear();

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  constructor() {
    const now = new Date();
    this.addForm = this.fb.group({
      targetType: ['individual', Validators.required],
      employeeId: [''],
      departmentId: [''],
      type: [AdjustmentType.Penalty, Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      reason: ['', [Validators.required, Validators.maxLength(500)]],
      targetMonth: [
        now.getMonth() + 1,
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      targetYear: [
        now.getFullYear(),
        [Validators.required, Validators.min(2000), Validators.max(2100)],
      ],
    });
  }

  ngOnInit(): void {
    this.isAdminOrHR = this.authService.isAdminOrHR();

    this.loadAdjustments();
    if (this.isAdminOrHR) {
      this.loadEmployees();
      this.loadDepartments();
    }
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadAdjustments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.departments = extracted;
      },
    });
  }

  loadAdjustments() {
    this.isLoading = true;

    const m = this.filterMonth ? Number(this.filterMonth) : undefined;
    const y = this.filterYear ? Number(this.filterYear) : undefined;

    const request = this.isAdminOrHR
      ? this.adjustmentService.getAll(this.currentPage, this.itemsPerPage, m, y)
      : this.adjustmentService.getMyAdjustments(
          this.currentPage,
          this.itemsPerPage,
          m,
          y,
        );

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.items && Array.isArray(res.items)) extracted = res.items;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.adjustments = extracted;
        this.totalCount = res?.totalCount || res?.data?.totalCount || 0;
        this.isLoading = false;
      },
      error: (err: any) => {
        if (err.status !== 401 && err.status !== 403) {
          Swal.fire('Error', 'Failed to load adjustments', 'error');
        }
        this.isLoading = false;
      },
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees(1, 1000).subscribe({
      next: (res: any) => {
        this.employees = res?.items || [];
      },
      error: (err: any) => {
      },
    });
  }

  openAddModal() {
    const now = new Date();
    this.addForm.reset({
      targetType: 'individual',
      type: AdjustmentType.Penalty,
      targetMonth: now.getMonth() + 1,
      targetYear: now.getFullYear(),
    });
    const modalElement = document.getElementById('addAdjustmentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveAdjustment() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const dto = this.addForm.value;
    const target = dto.targetType;

    let request;
    if (target === 'individual') {
      if (!dto.employeeId) {
        Swal.fire('Error', 'Please select an employee', 'error');
        this.isSubmitting = false;
        return;
      }
      request = this.adjustmentService.create({
        employeeId: Number(dto.employeeId),
        type: dto.type,
        amount: dto.amount,
        reason: dto.reason,
        month: dto.targetMonth,
        year: dto.targetYear,
      });
    } else {
      const bulkDto: any = {
        type: dto.type,
        amount: dto.amount,
        reason: dto.reason,
        month: dto.targetMonth,
        year: dto.targetYear,
      };
      if (target === 'department' && dto.departmentId) {
        bulkDto.departmentId = Number(dto.departmentId);
      }
      request = this.adjustmentService.createBulk(bulkDto);
    }

    request.subscribe({
      next: (res: any) => {
        Swal.fire(
          'Success',
          res?.message || 'Adjustment created successfully',
          'success',
        );
        this.loadAdjustments();
        this.isSubmitting = false;
        const modalElement = document.getElementById('addAdjustmentModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      },
      error: (err: any) => {
        Swal.fire('Error', 'Failed to create adjustment', 'error');
        this.isSubmitting = false;
      },
    });
  }

  deleteAdjustment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adjustmentService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Adjustment has been deleted.', 'success');
            this.loadAdjustments();
          },
          error: (err: any) => {
            Swal.fire(
              'Error!',
              'Failed to delete adjustment. It may have already been applied.',
              'error',
            );
          },
        });
      }
    });
  }

  getEmployeeName(id: number): string {
    const emp = this.employees.find((e) => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : `Unknown (#${id})`;
  }

  exportToPDF() {
    if (this.adjustments.length === 0) {
      Swal.fire('No Data', 'There are no adjustments to export.', 'info');
      return;
    }

    const headers = ['ID', 'Employee', 'Type', 'Amount', 'Reason', 'Applied'];
    const data = this.adjustments.map((adj) => [
      `#${adj.id}`,
      this.isAdminOrHR
        ? this.getEmployeeName(adj.employeeId)
        : `Emp #${adj.employeeId}`,
      adj.type === 0 ? 'Penalty' : 'Bonus',
      `JD ${adj.amount.toFixed(2)}`,
      adj.reason || '—',
      adj.isApplied ? 'Yes' : 'No',
    ]);

    const additionalInfo = [
      { label: 'Total Adjustments', value: String(this.adjustments.length) },
      {
        label: 'Total Penalties',
        value: `JD ${this.adjustments
          .filter((a) => a.type === 0)
          .reduce((sum, a) => sum + a.amount, 0)
          .toFixed(2)}`,
      },
      {
        label: 'Total Bonuses',
        value: `JD ${this.adjustments
          .filter((a) => a.type === 1)
          .reduce((sum, a) => sum + a.amount, 0)
          .toFixed(2)}`,
      },
    ];

    this.pdfExportService.generateTableReport(
      'Payroll Adjustments Report',
      headers,
      data,
      'Adjustments_Report',
      additionalInfo,
    );
  }

  exportToExcel() {
    if (this.adjustments.length === 0) {
      Swal.fire('No Data', 'There are no adjustments to export.', 'info');
      return;
    }

    const headers = ['ID', 'Employee', 'Type', 'Amount', 'Reason', 'Applied'];
    const data = this.adjustments.map((adj) => [
      `#${adj.id}`,
      this.isAdminOrHR
        ? this.getEmployeeName(adj.employeeId)
        : `Emp #${adj.employeeId}`,
      adj.type === 0 ? 'Penalty' : 'Bonus',
      `JD ${adj.amount.toFixed(2)}`,
      adj.reason || '—',
      adj.isApplied ? 'Yes' : 'No',
    ]);

    this.excelExportService.exportTableToExcel(headers, data, 'Adjustments');
  }
}
