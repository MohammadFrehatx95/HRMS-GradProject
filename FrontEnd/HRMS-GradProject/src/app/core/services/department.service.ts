import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departmentsList = [
    {
      id: 1,
      name: 'Information Technology (IT)',
      manager: 'Ahmad Salem',
      employeeCount: 15,
    },
    {
      id: 2,
      name: 'Human Resources (HR)',
      manager: 'Sara Ali',
      employeeCount: 5,
    },
    { id: 3, name: 'Finance', manager: 'Omar Zaid', employeeCount: 8 },
  ];

  getDepartments() {
    return this.departmentsList;
  }
}
