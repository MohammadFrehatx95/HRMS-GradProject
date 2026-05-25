import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MeetingService } from '../../core/services/meeting.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Meeting, MeetingStatus, CreateMeetingDto } from '../../core/models/meeting.model';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { Observable } from 'rxjs';

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

  meetings: Meeting[] = [];
  employees: any[] = [];
  isLoading = false;
  isSubmitting = false;

  addForm: FormGroup;
  MeetingStatus = MeetingStatus;
  userRole = this.authService.getUserRole();

  pageNumber = 1;
  pageSize = 100;

  constructor() {
    this.addForm = this.fb.group({
      employeeId: ['', Validators.required],
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
    
    // Combine Date and Time
    const combinedDateTime = new Date(`${formValues.meetingDate}T${formValues.meetingTime}`);
    
    const dto: CreateMeetingDto = {
      title: formValues.title,
      reason: formValues.reason,
      employeeId: Number(formValues.employeeId),
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
}
