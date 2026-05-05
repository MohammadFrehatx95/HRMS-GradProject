import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
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

  ngOnInit() {
    this.loadEmployees();
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
