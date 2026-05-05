import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import { Employee } from '../../core/models/employee.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  employeesList: Employee[] = [];
  isLoading: boolean = true;

  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  isAdmin: boolean = false;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadEmployees();
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employeesList = this.employeesList.filter(
            (emp) => emp.id !== id,
          );
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee. Please try again.');
        },
      });
    }
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employeesList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;
      },
    });
  }
}
