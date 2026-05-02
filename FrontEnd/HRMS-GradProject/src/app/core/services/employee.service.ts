import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesList = [
    {
      id: 1,
      name: 'Ahmad Salem',
      position: 'Frontend Developer',
      department: 'IT',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sara Ali',
      position: 'HR Manager',
      department: 'HR',
      status: 'On Leave',
    },
    {
      id: 3,
      name: 'Omar Zaid',
      position: 'Backend Developer',
      department: 'IT',
      status: 'Active',
    },
  ];

  getEmployees() {
    return this.employeesList;
  }

  // الدالة الجديدة لإضافة موظف
  addEmployee(employee: any) {
    // توليد ID جديد بناءً على طول المصفوفة لضمان عدم التكرار
    employee.id = this.employeesList.length + 1;
    this.employeesList.push(employee);
  }
}
