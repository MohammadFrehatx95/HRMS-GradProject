import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MeetingService } from '../../core/services/meeting.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Meeting, MeetingStatus, CreateMeetingDto } from '../../core/models/meeting.model';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { Observable, forkJoin } from 'rxjs';
import { ExcelExportService } from '../../core/services/excel-export.service';
import { PdfExportService } from '../../core/services/pdf-export.service';

export interface GroupedMeeting {
  meetLink: string;
  title: string;
  reason: string;
  scheduledAt: string;
  durationMinutes: number;
  status: string;
  organizerName: string;
  meetings: Meeting[];
  attendees: string[];
}

declare var bootstrap: any;

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private meetingService = inject(MeetingService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private excelExportService = inject(ExcelExportService);
  private pdfExportService = inject(PdfExportService);

  meetings: Meeting[] = [];
  groupedMeetings: GroupedMeeting[] = [];
  employees: any[] = [];
  isLoading = false;
  isSubmitting = false;

  addForm: FormGroup;
  MeetingStatus = MeetingStatus;
  userRole = this.authService.getUserRole();

  pageNumber = 1;
  pageSize = 100;

  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedMeetings(): Meeting[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.meetings.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get paginatedGroupedMeetings(): GroupedMeeting[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.groupedMeetings.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.groupedMeetings.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  employeeSearchQuery: string = '';
  selectedDepartmentFilter: string = '';

  get uniqueDepartments(): string[] {
    const depts = this.employees.map(e => e.departmentName).filter(d => !!d);
    return Array.from(new Set(depts));
  }

  get filteredEmployees(): any[] {
    return this.employees.filter(emp => {
      const matchesSearch = this.employeeSearchQuery ? 
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(this.employeeSearchQuery.toLowerCase()) : true;
      const matchesDept = this.selectedDepartmentFilter ? 
        emp.departmentName === this.selectedDepartmentFilter : true;
      return matchesSearch && matchesDept;
    });
  }

  get isAllFilteredSelected(): boolean {
    const currentSelected = this.addForm.get('employeeIds')?.value || [];
    if (this.filteredEmployees.length === 0) return false;
    return this.filteredEmployees.every(emp => currentSelected.includes(emp.id));
  }

  selectAllFilteredEmployees(event: any) {
    const isChecked = event.target.checked;
    const currentSelected = new Set(this.addForm.get('employeeIds')?.value || []);
    
    this.filteredEmployees.forEach(emp => {
      if (isChecked) {
        currentSelected.add(emp.id);
      } else {
        currentSelected.delete(emp.id);
      }
    });
    
    this.addForm.get('employeeIds')?.setValue(Array.from(currentSelected));
  }

  constructor() {
    this.addForm = this.fb.group({
      employeeIds: [[], Validators.required],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required],
      durationMinutes: [30, [Validators.required, Validators.min(15)]]
    });
  }

  ngOnInit(): void {
    if (this.userRole === 'Admin' || this.userRole === 'HR') {
      this.loadAllMeetings();
      this.loadEmployees();
    } else {
      this.loadMyMeetings();
    }
  }

  get isHrOrAdmin(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'HR';
  }

  loadAllMeetings() {
    this.isLoading = true;
    this.meetingService.getAll(this.pageNumber, this.pageSize).subscribe({
      next: (res: any) => {
        this.meetings = res.data?.items || res.items || [];
        
        // Group meetings by MeetLink
        const groups = new Map<string, GroupedMeeting>();
        this.meetings.forEach(m => {
          const key = m.meetLink || m.title + m.scheduledAt;
          if (!groups.has(key)) {
            groups.set(key, {
              meetLink: m.meetLink,
              title: m.title,
              reason: m.reason,
              scheduledAt: m.scheduledAt,
              durationMinutes: m.durationMinutes,
              status: m.status,
              organizerName: m.organizerName || 'System',
              meetings: [],
              attendees: []
            });
          }
          const group = groups.get(key)!;
          group.meetings.push(m);
          group.attendees.push(m.employeeName || 'Unknown');
        });
        
        this.groupedMeetings = Array.from(groups.values());
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load meetings', 'error');
      }
    });
  }

  loadMyMeetings() {
    this.isLoading = true;
    this.meetingService.getMyMeetings(this.pageNumber, this.pageSize).subscribe({
      next: (res: any) => {
        this.meetings = res.data?.items || res.items || [];
        
        // Group meetings by MeetLink
        const groups = new Map<string, GroupedMeeting>();
        this.meetings.forEach(m => {
          const key = m.meetLink || m.title + m.scheduledAt;
          if (!groups.has(key)) {
            groups.set(key, {
              meetLink: m.meetLink,
              title: m.title,
              reason: m.reason,
              scheduledAt: m.scheduledAt,
              durationMinutes: m.durationMinutes,
              status: m.status,
              organizerName: m.organizerName || 'System',
              meetings: [],
              attendees: []
            });
          }
          const group = groups.get(key)!;
          group.meetings.push(m);
          group.attendees.push(m.employeeName || 'Unknown');
        });
        
        this.groupedMeetings = Array.from(groups.values());
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load your meetings', 'error');
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  openAddModal() {
    this.addForm.reset({ durationMinutes: 30 });
    const modalEl = document.getElementById('addMeetingModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  closeModal(modalId: string) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      }
    }
  }

  onSubmit() {
    if (this.addForm.invalid) return;

    this.isSubmitting = true;
    const formValues = this.addForm.value;
    

    const combinedDateTime = new Date(`${formValues.meetingDate}T${formValues.meetingTime}`);
    
    const dto: CreateMeetingDto = {
      title: formValues.title,
      reason: formValues.reason,
      employeeIds: formValues.employeeIds,
      scheduledAt: combinedDateTime.toISOString(),
      durationMinutes: formValues.durationMinutes,
      notes: formValues.reason
    };

    this.meetingService.create(dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModal('addMeetingModal');
        Swal.fire('Success', 'Meeting scheduled successfully', 'success');
        if (this.isHrOrAdmin) {
          this.loadAllMeetings();
        } else {
          this.loadMyMeetings();
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire('Error', err.error?.message || 'Failed to schedule meeting', 'error');
      }
    });
  }

  updateGroupStatus(group: GroupedMeeting, status: MeetingStatus) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update the status of this group meeting for all attendees?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const observables: Observable<void>[] = [];
        group.meetings.forEach(m => {
          if (status === MeetingStatus.Cancelled) {
            observables.push(this.meetingService.cancel(m.id));
          } else if (status === MeetingStatus.Completed) {
            observables.push(this.meetingService.complete(m.id));
          }
        });

        if (observables.length > 0) {
          this.isLoading = true;
          forkJoin(observables).subscribe({
            next: () => {
              Swal.fire('Success', 'Meetings updated successfully', 'success');
              if (this.isHrOrAdmin) this.loadAllMeetings();
              else this.loadMyMeetings();
            },
            error: () => {
              this.isLoading = false;
              Swal.fire('Error', 'Failed to update meetings', 'error');
            }
          });
        }
      }
    });
  }

  updateStatus(id: number, status: MeetingStatus) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update the status of this meeting?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let updateObservable: Observable<void>;
        if (status === MeetingStatus.Cancelled) {
          updateObservable = this.meetingService.cancel(id);
        } else if (status === MeetingStatus.Completed) {
          updateObservable = this.meetingService.complete(id);
        } else {
          return;
        }

        updateObservable.subscribe({
          next: () => {
            Swal.fire('Updated!', 'Meeting status updated.', 'success');
            if (this.isHrOrAdmin) {
              this.loadAllMeetings();
            } else {
              this.loadMyMeetings();
            }
          },
          error: () => {
            Swal.fire('Error', 'Failed to update status', 'error');
          }
        });
      }
    });
  }

  toggleEmployeeForMeeting(empId: number) {
    const currentSelected = this.addForm.get('employeeIds')?.value || [];
    const index = currentSelected.indexOf(empId);
    if (index > -1) {
      currentSelected.splice(index, 1);
    } else {
      currentSelected.push(empId);
    }
    this.addForm.get('employeeIds')?.setValue(currentSelected);
  }

  getStatusBadgeClass(status: any): string {
    const s = String(status);
    switch (s) {
      case '0':
      case 'Scheduled': return 'bg-primary';
      case '1':
      case 'Completed': return 'bg-success';
      case '2':
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getStatusLabel(status: any): string {
    const s = String(status);
    switch (s) {
      case '0':
      case 'Scheduled': return 'Scheduled';
      case '1':
      case 'Completed': return 'Completed';
      case '2':
      case 'Cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  }

  exportToExcel() {
    if (this.meetings.length === 0) {
      Swal.fire('No Data', 'There are no meetings to export.', 'info');
      return;
    }

    const headers = ['ID', 'Title', 'Date & Time', 'Employee', 'Status', 'Duration (Min)'];
    const data = this.meetings.map(m => [
      `#${m.id}`,
      m.title,
      new Date(m.scheduledAt).toLocaleString(),
      m.employeeName || 'N/A',
      this.getStatusLabel(m.status),
      m.durationMinutes
    ]);

    this.excelExportService.exportTableToExcel(headers, data, 'Meetings');
  }

  exportToPDF() {
    if (this.meetings.length === 0) {
      Swal.fire('No Data', 'There are no meetings to export.', 'info');
      return;
    }

    const headers = ['ID', 'Title', 'Date & Time', 'Employee', 'Status', 'Duration (Min)'];
    const data = this.meetings.map(m => [
      `#${m.id}`,
      m.title,
      new Date(m.scheduledAt).toLocaleString(),
      m.employeeName || 'N/A',
      this.getStatusLabel(m.status),
      m.durationMinutes || '—'
    ]);

    this.pdfExportService.generateTableReport(
      'Meetings & Interviews Report',
      headers,
      data,
      'Meetings_Report'
    );
  }
}
