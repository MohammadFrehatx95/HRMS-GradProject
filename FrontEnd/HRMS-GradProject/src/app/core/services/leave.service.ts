import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private leaveRequests = [
    {
      id: 1,
      employeeName: 'Ahmad Salem',
      type: 'Annual',
      startDate: '2026-06-01',
      endDate: '2026-06-10',
      status: 'Approved',
    },
    {
      id: 2,
      employeeName: 'Sara Ali',
      type: 'Sick',
      startDate: '2026-05-15',
      endDate: '2026-05-16',
      status: 'Pending',
    },
    {
      id: 3,
      employeeName: 'Omar Zaid',
      type: 'Unpaid',
      startDate: '2026-07-01',
      endDate: '2026-07-05',
      status: 'Rejected',
    },
  ];

  getLeaveRequests() {
    return this.leaveRequests;
  }
}
