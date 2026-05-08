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
  isEditMode = false;
  currentEmployeeId: number | null = null;
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
    if (state && state.editMode && state.employeeId) {
      this.isEditMode = true;
      this.currentEmployeeId = state.employeeId;
      this.loadEmployeeDetails(this.currentEmployeeId!);
      this.employeeForm.get('userId')?.disable(); // typically don't change userId
    } else if (state && (state.userId || state.email)) {
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

  loadEmployeeDetails(id: number) {
    this.isLoading = true;
    this.employeeService.getEmployeeFullProfile(id).subscribe({
      next: (profile: any) => {
        this.isLoading = false;
        if (profile.departmentId) {
          this.loadPositions(profile.departmentId);
          this.employeeForm.get('positionId')?.enable();
        }
        this.employeeForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          hireDate: profile.hireDate ? new Date(profile.hireDate).toISOString().split('T')[0] : '',
          departmentId: profile.departmentId,
          positionId: profile.positionId,
          userId: profile.userId
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching employee', err);
        Swal.fire('Error', 'Failed to load employee details', 'error');
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
      userId: this.isEditMode ? this.employeeForm.get('userId')?.value : rawValues.userId,
    };

    if (this.isEditMode && this.currentEmployeeId) {
      this.employeeService.updateEmployee(this.currentEmployeeId, payload).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('نجاح', 'تم تعديل بيانات الموظف بنجاح', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.isLoading = false;
          const errorMsg = err.error?.message || 'فشل التعديل';
          Swal.fire('خطأ', errorMsg, 'error');
        }
      });
    } else {
      this.employeeService.addEmployee(payload).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('نجاح', 'تم ربط ملف الموظف بنجاح', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.isLoading = false;
          const errorMsg = err.error?.message || (err.error && typeof err.error === 'object' ? JSON.stringify(err.error) : 'فشل الربط');
          Swal.fire('خطأ في البيانات', errorMsg, 'error');
          console.error('Full Error:', err);
        },
      });
    }
  }
}
