import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employeesList: Employee[] = [];
  private employeeService = inject(EmployeeService);

  ngOnInit() {
    this.employeesList = this.employeeService.getEmployees();
  }
}
