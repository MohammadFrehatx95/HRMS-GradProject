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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
    phoneNumber: new FormControl('', Validators.required),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    userId: new FormControl(null as any, Validators.required),
  });

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = window.history.state as { userId: number };

    if (state && state.userId) {
      this.employeeForm.patchValue({ userId: state.userId });
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
        this.departments = Array.isArray(res)
          ? res
          : res?.data?.items || res?.data || [];
      },
    });
  }

  loadPositions(deptId: number) {
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res)
          ? res
          : res?.data?.items || res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      Swal.fire(
        'Incomplete Data',
        'Ensure all fields including UserId are filled.',
        'warning',
      );
      return;
    }

    this.isLoading = true;
    const formValue = this.employeeForm.getRawValue();

    const payload = {
      ...formValue,
      hireDate: new Date(formValue.hireDate!).toISOString(),
      departmentId: Number(formValue.departmentId),
      positionId: Number(formValue.positionId),
      userId: Number(formValue.userId),
    };

    this.employeeService.addEmployee(payload).subscribe({
      next: () => {
        Swal.fire(
          'Success',
          'Employee profile linked successfully!',
          'success',
        );
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'Error',
          err.error?.message || 'Failed to link profile',
          'error',
        );
      },
    });
  }
}
