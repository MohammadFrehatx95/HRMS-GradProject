import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  private employeeService = inject(EmployeeService);

  ngOnInit() {
    // حساب عدد الموظفين الفعلي بناءً على طول المصفوفة في الخدمة
    this.totalEmployees = this.employeeService.getEmployees().length;
  }
}
