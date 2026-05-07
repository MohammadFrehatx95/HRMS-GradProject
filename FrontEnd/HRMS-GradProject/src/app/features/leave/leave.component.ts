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
  isAdmin: boolean = false;

  leaveModal: any;

  leaveData = {
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  };

  leaveTypes = ['Annual', 'Sick', 'Maternity', 'Unpaid', 'Emergency'];

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadLeaves();
  }

  loadLeaves() {
    this.isLoading = true;
    const request = this.isAdmin
      ? this.leaveService.getAllLeaves()
      : this.leaveService.getMyLeaves();

    request.subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];

        this.leavesList = Array.isArray(extracted) ? extracted : [];

        if (this.isAdmin && this.leavesList.length > 0) {
          this.leavesList.sort((a, b) => (a.status === 'Pending' ? -1 : 1));
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

  openModal() {
    this.leaveData = { leaveType: '', startDate: '', endDate: '', reason: '' };
    const modalEl = document.getElementById('leaveModal');
    if (modalEl) {
      this.leaveModal = new bootstrap.Modal(modalEl);
      this.leaveModal.show();
    }
  }

  submitLeaveRequest() {
    this.isProcessing = true;

    const payload = {
      ...this.leaveData,
      startDate: new Date(this.leaveData.startDate).toISOString(),
      endDate: new Date(this.leaveData.endDate).toISOString(),
      status: 'Pending',
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.leaveModal.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Leave request submitted',
          showConfirmButton: false,
          timer: 1500,
        });
        this.loadLeaves();
      },
      error: (err) => {
        this.isProcessing = false;
        console.error('Submit error:', err);
        Swal.fire('Error', 'Failed to submit request.', 'error');
      },
    });
  }

  changeStatus(id: number, newStatus: string) {
    const actionText = newStatus === 'Approved' ? 'approve' : 'reject';
    const confirmColor = newStatus === 'Approved' ? '#198754' : '#dc3545';

    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${actionText} this leave request.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Yes, ${actionText} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.updateLeaveStatus(id, newStatus).subscribe({
          next: () => {
            Swal.fire(
              'Updated!',
              `Request has been ${newStatus.toLowerCase()}.`,
              'success',
            );
            this.loadLeaves();
          },
          error: (err) => {
            console.error('Status update error:', err);
            Swal.fire('Error!', 'Failed to update status.', 'error');
          },
        });
      }
    });
  }
}
