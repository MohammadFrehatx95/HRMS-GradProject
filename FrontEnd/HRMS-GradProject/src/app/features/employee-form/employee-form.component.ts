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
    userId: new FormControl(1),
  });

  ngOnInit() {
    this.loadDepartments();

    this.employeeForm.get('departmentId')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.employeeForm.get('positionId')?.enable();
        this.loadPositions(Number(deptId));
      } else {
        this.employeeForm.get('positionId')?.disable();
        this.positions = [];
      }
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.$values) extracted = res.$values;

        this.departments = extracted;
      },
      error: (err) => console.error('Error loading departments', err),
    });
  }

  loadPositions(deptId: number) {
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.$values) extracted = res.$values;

        this.positions = extracted;
        this.employeeForm.get('positionId')?.setValue('');
      },
      error: (err) => console.error('Error loading positions', err),
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      Swal.fire(
        'Incomplete Data',
        'Please fill all required fields correctly, and ensure a Position is selected.',
        'warning',
      );
      return;
    }

    this.isLoading = true;

    const formValue = this.employeeForm.getRawValue();

    const newEmployee = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      hireDate: new Date(formValue.hireDate!).toISOString(),
      departmentId: Number(formValue.departmentId),
      positionId: Number(formValue.positionId),
      userId: Number(formValue.userId) || 1,
    };

    console.log('🔥 Payload being sent to Backend:', newEmployee);

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Employee has been added successfully.',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/employees']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('API Error:', err);

        const errorMsg =
          err.error?.message ||
          err.error?.title ||
          JSON.stringify(err.error?.errors) ||
          'Failed to submit data.';
        Swal.fire('Submission Failed', errorMsg, 'error');
      },
    });
  }
}
