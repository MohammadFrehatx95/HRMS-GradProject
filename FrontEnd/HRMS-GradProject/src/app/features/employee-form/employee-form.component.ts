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

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private router = inject(Router);

  isLoading = false;
  departments: any[] = [];

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl('', Validators.required),
    userId: new FormControl(1),
  });

  ngOnInit() {
    // جلب الأقسام من الباك إند فور تشغيل الشاشة
    this.departmentService.getDepartments().subscribe({
      next: (data) => (this.departments = data),
      error: (err) => console.error('Error loading departments', err),
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.isLoading = true;
      const formValue = this.employeeForm.value;

      const newEmployee = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phoneNumber: formValue.phoneNumber,
        hireDate: new Date(formValue.hireDate!).toISOString(),
        departmentId: Number(formValue.departmentId),
        positionId: Number(formValue.positionId),
        userId: Number(formValue.userId),
      };

      this.employeeService.addEmployee(newEmployee).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
    }
  }
}
