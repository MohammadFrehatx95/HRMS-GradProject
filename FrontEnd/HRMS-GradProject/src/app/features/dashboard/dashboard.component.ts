import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { LeaveService } from '../../core/services/leave.service';
import { SalaryService } from '../../core/services/salary.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  totalDepartments: number = 0;
  pendingLeaves: number = 0;
  totalPayroll: number = 0;

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private leaveService = inject(LeaveService);
  private salaryService = inject(SalaryService);

  ngOnInit() {
    this.totalEmployees = this.employeeService.getEmployees().length;
    this.totalDepartments = this.departmentService.getDepartments().length;

    const leaves = this.leaveService.getLeaveRequests();
    this.pendingLeaves = leaves.filter(
      (req) => req.status === 'Pending',
    ).length;

    const payrolls = this.salaryService.getPayroll();
    this.totalPayroll = payrolls.reduce((sum, record) => {
      const net = record.basicSalary + record.allowances - record.deductions;
      return sum + net;
    }, 0);
  }
}
