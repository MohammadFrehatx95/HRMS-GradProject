import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PayrollAdjustmentService } from '../../core/services/payroll-adjustments.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { AdjustmentType, PayrollAdjustmentDto } from '../../core/models/payroll-adjustment.model';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-payroll-adjustments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './payroll-adjustments.component.html',
  styleUrls: ['./payroll-adjustments.component.css']
})
export class PayrollAdjustmentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adjustmentService = inject(PayrollAdjustmentService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  adjustments: PayrollAdjustmentDto[] = [];
  employees: any[] = [];
  isLoading = false;
  isSubmitting = false;
  isAdminOrHR = false;

  addForm: FormGroup;
  adjustmentTypes = [
    { value: AdjustmentType.Penalty, label: 'Penalty (Deduction)' },
    { value: AdjustmentType.Bonus, label: 'Bonus (Allowance)' }
  ];

  pageNumber = 1;
  pageSize = 100;
  totalItems = 0;

  constructor() {
    this.addForm = this.fb.group({
      employeeId: ['', Validators.required],
      type: [AdjustmentType.Penalty, Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      reason: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    
    this.loadAdjustments();
    if (this.isAdminOrHR) {
      this.loadEmployees();
    }
  }

  loadAdjustments() {
    this.isLoading = true;
    
    const request = this.isAdminOrHR 
      ? this.adjustmentService.getAll(this.pageNumber, this.pageSize)
      : this.adjustmentService.getMyAdjustments(this.pageNumber, this.pageSize);

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.items && Array.isArray(res.items)) extracted = res.items;
        else if (res?.data?.items && Array.isArray(res.data.items)) extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        
        this.adjustments = extracted;
        this.totalItems = res?.totalCount || res?.data?.totalCount || 0;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        if (err.status !== 401 && err.status !== 403) {
          Swal.fire('Error', 'Failed to load adjustments', 'error');
        }
        this.isLoading = false;
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items)) extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.employees = extracted;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  openAddModal() {
    this.addForm.reset({ type: AdjustmentType.Penalty });
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

    this.adjustmentService.create(dto).subscribe({
      next: () => {
        Swal.fire('Success', 'Adjustment created successfully', 'success');
        this.loadAdjustments();
        this.isSubmitting = false;
        const modalElement = document.getElementById('addAdjustmentModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire('Error', 'Failed to create adjustment', 'error');
        this.isSubmitting = false;
      }
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
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adjustmentService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Adjustment has been deleted.', 'success');
            this.loadAdjustments();
          },
          error: (err: any) => {
            console.error(err);
            Swal.fire('Error!', 'Failed to delete adjustment. It may have already been applied.', 'error');
          }
        });
      }
    });
  }

  getEmployeeName(id: number): string {
    const emp = this.employees.find(e => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : `Unknown (#${id})`;
  }
}
