export interface Announcement {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    priority: string; // "Normal", "High", "Urgent"
    isGeneral: boolean;
    targetEmployeeIds?: number[];
    expiryDate?: string;
    authorName: string;
    authorId: number;
}

export interface CreateAnnouncementDto {
    title: string;
    content: string;
    priority: string;
    isGeneral: boolean;
    targetEmployeeIds?: number[];
    expiryDate?: string;
}
