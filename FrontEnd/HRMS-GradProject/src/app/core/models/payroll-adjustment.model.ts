export enum AdjustmentType {
  Bonus = 1,
  Penalty = 2
}

export interface PayrollAdjustmentDto {
  id: number;
  employeeId: number;
  employeeName: string;
  type: AdjustmentType;
  amount: number;
  reason: string;
  date: string;
  isApplied: boolean;
  employeeProfilePictureUrl?: string;
}

export interface CreatePayrollAdjustmentDto {
  employeeId: number;
  type: AdjustmentType;
  amount: number;
  reason: string;
}
