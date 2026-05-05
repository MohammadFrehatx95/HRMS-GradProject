import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  totalDepartments: number = 0;
  pendingLeaves: number = 0;
  totalPayroll: number = 0;

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.totalEmployees = employees.length;
      },
      error: (err) => console.error('Error fetching employees:', err),
    });

    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.totalDepartments = departments.length;
      },
      error: (err) => console.error('Error fetching departments:', err),
    });

    this.pendingLeaves = 5;
    this.totalPayroll = 15450;
  }
}
