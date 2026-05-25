import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MeetingService } from '../../core/services/meeting.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Meeting, MeetingStatus, CreateMeetingDto } from '../../core/models/meeting.model';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

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
      description: [''],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required]
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
    this.addForm.reset();
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
      description: formValues.description,
      employeeId: Number(formValues.employeeId),
      meetingDate: combinedDateTime.toISOString()
    };

    this.meetingService.create(dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModal('addMeetingModal');
        Swal.fire('Success', 'Meeting scheduled successfully', 'success');
        this.loadAllMeetings();
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
        this.meetingService.updateStatus(id, status).subscribe({
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

  deleteMeeting(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this meeting!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.meetingService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Meeting has been deleted.', 'success');
            this.loadAllMeetings();
          },
          error: () => {
            Swal.fire('Error', 'Failed to delete meeting', 'error');
          }
        });
      }
    });
  }

  getStatusBadgeClass(status: any): string {
    const s = String(status);
    switch (s) {
      case '0':
      case 'Pending': return 'bg-warning text-dark';
      case '1':
      case 'Confirmed': return 'bg-primary';
      case '3':
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
      case 'Pending': return 'Pending';
      case '1':
      case 'Confirmed': return 'Confirmed';
      case '3':
      case 'Completed': return 'Completed';
      case '2':
      case 'Cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  }
}
