import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { LeaveService } from '../../core/services/leave.service';
import { SalaryService } from '../../core/services/salary.service';

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
  private leaveService = inject(LeaveService);
  private salaryService = inject(SalaryService);

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => (this.totalEmployees = data.length),
      error: (err) => console.error(err),
    });

    this.departmentService.getDepartments().subscribe({
      next: (data) => (this.totalDepartments = data.length),
      error: (err) => console.error(err),
    });

    // حساب الإجازات المعلقة الحقيقية
    this.leaveService.getLeaves().subscribe({
      next: (data) => {
        this.pendingLeaves = data.filter(
          (leave) => leave.status === 'Pending',
        ).length;
      },
      error: (err) => console.error(err),
    });

    // حساب إجمالي الرواتب الفعلي
    this.salaryService.getSalaries().subscribe({
      next: (data) => {
        this.totalPayroll = data.reduce(
          (sum, item) => sum + (item.netSalary || 0),
          0,
        );
      },
      error: (err) => console.error(err),
    });
  }
}
