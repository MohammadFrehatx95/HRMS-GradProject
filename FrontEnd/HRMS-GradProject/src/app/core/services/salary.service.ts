import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private payrollRecords = [
    {
      id: 1,
      employeeName: 'Ahmad Salem',
      basicSalary: 1500,
      allowances: 300,
      deductions: 50,
    },
    {
      id: 2,
      employeeName: 'Sara Ali',
      basicSalary: 2000,
      allowances: 400,
      deductions: 0,
    },
    {
      id: 3,
      employeeName: 'Omar Zaid',
      basicSalary: 1200,
      allowances: 200,
      deductions: 100,
    },
  ];

  getPayroll() {
    return this.payrollRecords;
  }
}
