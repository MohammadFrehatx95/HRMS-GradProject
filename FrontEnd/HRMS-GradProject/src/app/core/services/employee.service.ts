import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // نقلنا البيانات إلى هنا لتصبح مركزية
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

  // (Method) لإرجاع البيانات لأي مكون يطلبها
  getEmployees() {
    return this.employeesList;
  }
}
