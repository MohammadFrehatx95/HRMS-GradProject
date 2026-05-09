import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../core/services/leave.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);

  leavesList: any[] = [];
  isLoading: boolean = true;
  isProcessing: boolean = false;

  isAdminOrHR: boolean = false;

  leaveModal: any;

  leaveData = {
    leaveType: 0,
    startDate: '',
    endDate: '',
    reason: '',
  };

  leaveTypes = [
    { id: 0, name: 'Annual' },
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Unpaid' },
    { id: 3, name: 'Maternity' },
  ];

  ngOnInit() {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadLeaves();
  }

  loadLeaves() {
    this.isLoading = true;

    const request = this.isAdminOrHR
      ? this.leaveService.getAllLeaves()
      : this.leaveService.getMyLeaves();

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];

        if (Array.isArray(res)) {
          extracted = res;
        } else if (res?.data?.items && Array.isArray(res.data.items)) {
          extracted = res.data.items;
        } else if (res?.data && Array.isArray(res.data)) {
          extracted = res.data;
        }

        this.leavesList = extracted;

        this.leavesList = extracted;

        if (this.isAdminOrHR && this.leavesList.length > 0) {
          this.leavesList.sort((a, b) => {
            const statusA = this.getStatusText(a.status);
            const statusB = this.getStatusText(b.status);
            
            if (statusA === 'Pending' && statusB !== 'Pending') return -1;
            if (statusA !== 'Pending' && statusB === 'Pending') return 1;
            
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          });
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
        this.isLoading = false;
        this.leavesList = [];
      },
    });
  }

  getStatusText(statusCode: any): string {
    if (statusCode === 0 || statusCode === '0') return 'Pending';
    if (statusCode === 1 || statusCode === '1') return 'Approved';
    if (statusCode === 2 || statusCode === '2') return 'Rejected';
    return statusCode?.toString() || 'Unknown';
  }

  getLeaveTypeText(typeCode: any): string {
    if (typeof typeCode === 'string' && isNaN(Number(typeCode))) {
      return typeCode.charAt(0).toUpperCase() + typeCode.slice(1);
    }
    const type = this.leaveTypes.find((t) => t.id == Number(typeCode));
    return type ? type.name : 'Emergency';
  }

  openModal() {
    this.leaveData = { leaveType: 0, startDate: '', endDate: '', reason: '' };
    const modalEl = document.getElementById('leaveModal');
    if (modalEl) {
      this.leaveModal = new bootstrap.Modal(modalEl);
      this.leaveModal.show();
    }
  }

  submitLeaveRequest() {
    this.isProcessing = true;
    const payload = {
      leaveType: Number(this.leaveData.leaveType),
      startDate: new Date(this.leaveData.startDate).toISOString(),
      endDate: new Date(this.leaveData.endDate).toISOString(),
      reason: this.leaveData.reason,
      status: 0,
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.leaveModal.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.loadLeaves();
      },
      error: (err) => {
        this.isProcessing = false;
        const msg =
          err.error?.message || err.error?.title || 'Failed to submit request';
        Swal.fire('Error', msg, 'warning');
      },
    });
  }

  changeStatus(id: number, newStatusCode: number) {
    if (newStatusCode === 2) {
      Swal.fire({
        title: 'Reject Leave Request',
        text: 'Please provide a reason for rejection:',
        input: 'textarea',
        inputPlaceholder: 'Type your reason here...',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545',
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return 'You need to write a rejection reason!';
          }
          return null;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.executeStatusChange(id, newStatusCode, result.value);
        }
      });
    } else {
      this.executeStatusChange(id, newStatusCode);
    }
  }

  private executeStatusChange(id: number, newStatusCode: number, rejectionReason?: string) {
    this.leaveService
      .updateLeaveStatus(id, newStatusCode, rejectionReason)
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Status changed.', 'success');
          this.loadLeaves();
        },
        error: (err) => {
          console.error('Status update error:', err);
          const msg = err.error?.message || err.error?.title || 'Failed to update status.';
          Swal.fire('Error!', msg, 'error');
        },
      });
  }
}
