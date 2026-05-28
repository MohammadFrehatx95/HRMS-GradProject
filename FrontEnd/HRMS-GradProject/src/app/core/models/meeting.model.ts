export enum MeetingStatus {
    Scheduled = 'Scheduled',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export interface Meeting {
    id: number;
    title: string;
    reason: string;
    scheduledAt: string;
    durationMinutes: number;
    meetLink: string;
    employeeId: number;
    employeeName: string;
    organizerId: number;
    organizerName: string;
    status: MeetingStatus | string;
    notes?: string;
    createdAt: string;
    employeeProfilePictureUrl?: string;
}

export interface CreateMeetingDto {
    title: string;
    reason: string;
    scheduledAt: string;
    durationMinutes: number;
    employeeIds: number[];
    notes?: string;
}

export interface UpdateMeetingDto {
    title?: string;
    reason?: string;
    scheduledAt?: string;
    durationMinutes?: number;
    notes?: string;
}
