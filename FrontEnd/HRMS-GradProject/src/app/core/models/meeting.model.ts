export enum MeetingStatus {
    Pending = 0,
    Confirmed = 1,
    Cancelled = 2,
    Completed = 3
}

export interface Meeting {
    id: number;
    title: string;
    description: string;
    meetingDate: string; // ISO date string
    employeeId: number;
    employeeName: string;
    organizerId: number;
    organizerName: string;
    status: MeetingStatus;
    createdAt: string;
}

export interface CreateMeetingDto {
    title: string;
    description: string;
    meetingDate: string;
    employeeId: number;
}

export interface UpdateMeetingDto {
    title: string;
    description: string;
    meetingDate: string;
    status: MeetingStatus;
}
