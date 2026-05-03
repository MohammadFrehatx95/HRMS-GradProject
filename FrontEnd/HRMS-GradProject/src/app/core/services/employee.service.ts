import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesList: Employee[] = [
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

  getEmployees(): Employee[] {
    return this.employeesList;
  }

  addEmployee(employee: Employee) {
    employee.id = this.employeesList.length + 1;
    this.employeesList.push(employee);
  }
}
