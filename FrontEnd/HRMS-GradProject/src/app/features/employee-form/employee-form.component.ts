import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  onCancel() {
    throw new Error('Method not implemented.');
  }
  private employeeService = inject(EmployeeService);
  private router = inject(Router); // حقن محرك التوجيه للتحكم بالمسارات برمجياً

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    status: new FormControl('Active'),
  });

  onSubmit() {
    if (this.employeeForm.valid) {
      // 1. إرسال البيانات للخدمة لحفظها
      this.employeeService.addEmployee(this.employeeForm.value);

      // 2. إعادة توجيه المستخدم برمجياً إلى شاشة الموظفين
      this.router.navigate(['/employees']);
    }
  }
}
