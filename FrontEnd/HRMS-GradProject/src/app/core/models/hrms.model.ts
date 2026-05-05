export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  departmentId: number;
  positionId: number;
  isActive?: boolean;
}

export interface Department {
  id?: number;
  name: string;
}

export interface LeaveRequest {
  id?: number;
  leaveType: 'Annual' | 'Sick' | 'Emergency' | 'Unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}
