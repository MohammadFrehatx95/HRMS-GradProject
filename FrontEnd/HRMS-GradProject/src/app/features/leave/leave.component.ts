import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../core/services/leave.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);

  allLeavesList: any[] = [];
  leavesList: any[] = [];
  
  leaveSearchQuery: string = '';
  selectedLeaveStatus: string = '';
  selectedLeaveType: string = '';
  
  isLoading: boolean = true;
  isProcessing: boolean = false;

  isAdminOrHR: boolean = false;
  employeeAnnualLeaveBalance: number | string = 14;

  leaveModal: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedLeaves() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.leavesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.leavesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  leaveData = {
    leaveType: 0,
    startDate: '',
    endDate: '',
    reason: '',
  };

  leaveTypes = [
    { id: 0, name: 'Annual' },
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Emergency' }, // ✅ يطابق Backend enum: Emergency=2
    { id: 3, name: 'Unpaid' },   // ✅ يطابق Backend enum: Unpaid=3
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

        this.allLeavesList = extracted;
        this.leavesList = [...this.allLeavesList];

          if (this.isAdminOrHR && this.leavesList.length > 0) {
            this.leavesList.sort((a, b) => {
              const statusA = this.getStatusText(a.status);
              const statusB = this.getStatusText(b.status);
              
              if (statusA === 'Pending' && statusB !== 'Pending') return -1;
              if (statusA !== 'Pending' && statusB === 'Pending') return 1;
              
              return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
            });
          } else if (!this.isAdminOrHR) {
            // ✅ Backend يُرجع strings: 'Approved', 'Annual'
            const approvedAnnualLeavesDays = this.allLeavesList
              .filter(
                (l: any) =>
                  l.status === 'Approved' &&
                  l.leaveType === 'Annual',
              )
              .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);
            this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
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

  filterLeaves() {
    this.leavesList = this.allLeavesList.filter(l => {
      let matchesSearch = true;
      if (this.leaveSearchQuery) {
        const query = this.leaveSearchQuery.toLowerCase();
        const empName = (l.employeeName || '').toLowerCase();
        const empId = String(l.employeeId || '');
        const reason = (l.reason || '').toLowerCase();
        matchesSearch = empName.includes(query) || empId.includes(query) || reason.includes(query);
      }
      
      let matchesStatus = true;
      if (this.selectedLeaveStatus) {
        matchesStatus = this.getStatusText(l.status) === this.selectedLeaveStatus;
      }
      
      let matchesType = true;
      if (this.selectedLeaveType) {
        matchesType = String(l.leaveType) === this.selectedLeaveType;
      }
      
      return matchesSearch && matchesStatus && matchesType;
    });

    this.currentPage = 1;
    if (this.leavesList.length > 0) {
      this.leavesList.sort((a, b) => {
        if (this.isAdminOrHR) {
          const statusA = this.getStatusText(a.status);
          const statusB = this.getStatusText(b.status);
          if (statusA === 'Pending' && statusB !== 'Pending') return -1;
          if (statusA !== 'Pending' && statusB === 'Pending') return 1;
        }
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
    }
  }

  getStatusText(statusCode: any): string {
    // ✅ Backend يُرجع string مباشرة من MappingProfile (.ToString())
    if (typeof statusCode === 'string' && isNaN(Number(statusCode))) {
      return statusCode; // 'Pending' | 'Approved' | 'Rejected'
    }
    // توافقية مع القيم الرقمية القديمة
    if (statusCode === 0 || statusCode === '0') return 'Pending';
    if (statusCode === 1 || statusCode === '1') return 'Approved';
    if (statusCode === 2 || statusCode === '2') return 'Rejected';
    return statusCode?.toString() || 'Unknown';
  }

  getLeaveTypeText(typeCode: any): string {
    // ✅ Backend يُرجع string مباشرة: 'Annual', 'Sick', 'Emergency', 'Unpaid'
    if (typeof typeCode === 'string' && isNaN(Number(typeCode))) {
      const found = this.leaveTypes.find(
        (t) => t.name.toLowerCase() === typeCode.toLowerCase()
      );
      return found ? found.name : (typeCode.charAt(0).toUpperCase() + typeCode.slice(1));
    }
    // توافقية مع القيم الرقمية
    const type = this.leaveTypes.find((t) => t.id === Number(typeCode));
    return type ? type.name : (typeCode != null ? String(typeCode) : 'Unknown');
  }

  openModal() {
    this.leaveData = { leaveType: 0, startDate: '', endDate: '', reason: '' };
    const modalEl = document.getElementById('leaveModal');
    if (modalEl) {
      this.leaveModal = new bootstrap.Modal(modalEl);
      this.leaveModal.show();
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  submitLeaveRequest() {
    if (this.leaveData.startDate < this.getToday()) {
      Swal.fire('Invalid Date', 'Start Date cannot be in the past.', 'warning');
      return;
    }
    
    if (this.leaveData.endDate < this.leaveData.startDate) {
      Swal.fire('Invalid Date', 'End Date cannot be before the Start Date.', 'warning');
      return;
    }

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
