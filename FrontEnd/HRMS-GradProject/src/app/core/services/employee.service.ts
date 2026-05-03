import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesList: Employee[] = [];

  private readonly STORAGE_KEY = 'hrms_employees_data';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);

    if (savedData) {
      this.employeesList = JSON.parse(savedData);
    } else {
      this.employeesList = [
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
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employeesList));
  }

  getEmployees(): Employee[] {
    return this.employeesList;
  }

  addEmployee(employee: Employee) {
    const maxId =
      this.employeesList.length > 0
        ? Math.max(...this.employeesList.map((e) => e.id))
        : 0;

    employee.id = maxId + 1;
    this.employeesList.push(employee);

    this.saveToStorage();
  }
}
