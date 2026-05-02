import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employeesList = [
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
}
