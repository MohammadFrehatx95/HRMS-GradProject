import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee.model';

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
  private router = inject(Router);

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    status: new FormControl('Active'),
  });

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;

      const newEmployee: Employee = {
        id: 0,
        name: formValue.name ?? '',
        position: formValue.position ?? '',
        department: formValue.department ?? '',

        status: (formValue.status ?? 'Active') as
          | 'Active'
          | 'On Leave'
          | 'Terminated',
      };

      this.employeeService.addEmployee(newEmployee);

      this.router.navigate(['/employees']);
    }
  }
}
