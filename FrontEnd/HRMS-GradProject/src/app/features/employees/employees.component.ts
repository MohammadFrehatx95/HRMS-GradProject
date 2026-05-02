import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  // 1. تعريف مصفوفة فارغة لاستقبال البيانات
  employeesList: any[] = [];

  // 2. حقن الخدمة داخل المكون Dependency Injection
  private employeeService = inject(EmployeeService);

  // 3. جلب البيانات بمجرد تهيئة المكون
  ngOnInit() {
    this.employeesList = this.employeeService.getEmployees();
  }
}
