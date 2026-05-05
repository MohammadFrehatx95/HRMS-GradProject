export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  isActive: boolean;
  positionId?: number;
}
