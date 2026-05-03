import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private attendanceRecords = [
    {
      id: 1,
      employeeName: 'Ahmad Salem',
      date: '2026-05-03T00:00:00Z',
      checkIn: '2026-05-03T08:05:00Z',
      checkOut: '2026-05-03T16:00:00Z',
      status: 'Present',
    },
    {
      id: 2,
      employeeName: 'Sara Ali',
      date: '2026-05-03T00:00:00Z',
      checkIn: '2026-05-03T09:15:00Z',
      checkOut: '2026-05-03T16:00:00Z',
      status: 'Late',
    },
    {
      id: 3,
      employeeName: 'Omar Zaid',
      date: '2026-05-03T00:00:00Z',
      checkIn: null,
      checkOut: null,
      status: 'Absent',
    },
  ];

  getAttendance() {
    return this.attendanceRecords;
  }
}
