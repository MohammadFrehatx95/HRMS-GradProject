export enum AdjustmentType {
  Penalty = 0,
  Bonus = 1
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
}

export interface CreatePayrollAdjustmentDto {
  employeeId: number;
  type: AdjustmentType;
  amount: number;
  reason: string;
}
