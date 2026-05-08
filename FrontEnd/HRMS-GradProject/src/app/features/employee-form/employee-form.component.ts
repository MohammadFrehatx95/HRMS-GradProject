import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { PositionService } from '../../core/services/position.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private router = inject(Router);

  isLoading = false;
  departments: any[] = [];
  positions: any[] = [];

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),

    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    userId: new FormControl('', Validators.required),
  });

  ngOnInit() {
    const state = window.history.state;
    if (state && (state.userId || state.email)) {
      this.employeeForm.patchValue({
        userId: state.userId,
        email: state.email,
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

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
      },
    });
  }

  loadPositions(deptId: number) {
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res) ? res : res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      Swal.fire(
        'بيانات ناقصة',
        'يرجى التأكد من تعبئة جميع الحقول المطلوبة',
        'warning',
      );
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
      userId: rawValues.userId,
    };

    this.employeeService.addEmployee(payload).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire('نجاح', 'تم ربط ملف الموظف بنجاح', 'success');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg =
          err.error?.message ||
          (err.error && typeof err.error === 'object'
            ? JSON.stringify(err.error)
            : 'فشل الربط');
        Swal.fire('خطأ في البيانات', errorMsg, 'error');
        console.error('Full Error:', err);
      },
    });
  }
}
