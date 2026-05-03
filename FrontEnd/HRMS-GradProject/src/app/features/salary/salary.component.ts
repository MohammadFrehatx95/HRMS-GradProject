import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SalaryService } from '../../core/services/salary.service';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css',
})
export class SalaryComponent implements OnInit {
  payrollData: any[] = [];
  private salaryService = inject(SalaryService);

  ngOnInit() {
    const rawData = this.salaryService.getPayroll();

    this.payrollData = rawData.map((record) => {
      return {
        ...record,
        netSalary: record.basicSalary + record.allowances - record.deductions,
      };
    });
  }
}
