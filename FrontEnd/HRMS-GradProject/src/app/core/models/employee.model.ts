// src/app/core/models/employee.model.ts

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}
