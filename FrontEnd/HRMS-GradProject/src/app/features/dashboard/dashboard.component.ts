import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { LeaveService } from '../../core/services/leave.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private leaveService = inject(LeaveService);

  isLoading = true;

  totalEmployees = 0;
  totalDepartments = 0;
  pendingLeaves = 0;
  activeEmployees = 0;

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    forkJoin({
      employees: this.employeeService.getEmployees(),
      departments: this.departmentService.getDepartments(),
      leaves: this.leaveService.getLeaves(),
    }).subscribe({
      next: (data) => {
        this.totalEmployees = data.employees.length;
        this.activeEmployees = data.employees.filter(
          (emp) => emp.isActive,
        ).length;
        this.totalDepartments = data.departments.length;
        this.pendingLeaves = data.leaves.filter(
          (leave) => leave.status === 'Pending',
        ).length;

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data', err);
        this.isLoading = false;
      },
    });
  }
}
