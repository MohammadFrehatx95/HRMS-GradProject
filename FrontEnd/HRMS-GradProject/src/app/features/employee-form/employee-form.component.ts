import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  isLoading = false;

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    status: new FormControl('Active', Validators.required),
  });

  onSubmit() {
    if (this.employeeForm.valid) {
      this.isLoading = true;
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

      this.employeeService.addEmployee(newEmployee).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error adding employee:', err);
        },
      });
    }
  }
}
