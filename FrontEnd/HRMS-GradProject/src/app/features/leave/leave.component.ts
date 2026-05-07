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

  // إعادة الصلاحية لتكون متغيرة بناءً على المستخدم الفعلي
  isAdmin: boolean = false;

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
    // قراءة الصلاحية الحقيقية من التوكن (Token) أو حالة تسجيل الدخول
    this.isAdmin = this.authService.isAdmin();
    this.loadLeaves();
  }

  loadLeaves() {
    this.isLoading = true;

    // توجيه الطلب ديناميكياً: المدير يرى الكل، الموظف يرى طلباته فقط
    const request = this.isAdmin
      ? this.leaveService.getAllLeaves()
      : this.leaveService.getMyLeaves();

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];

        // آلية استخراج ذكية تبحث عن المصفوفة داخل الاستجابة أياً كان هيكلها
        if (Array.isArray(res)) {
          extracted = res;
        } else if (res && typeof res === 'object') {
          const foundArray = Object.values(res).find((val) =>
            Array.isArray(val),
          );
          if (foundArray) {
            extracted = foundArray as any[];
          }
        }

        this.leavesList = extracted;

        // ترتيب الطلبات المعلقة لتظهر في الأعلى للمدير
        if (this.isAdmin && this.leavesList.length > 0) {
          this.leavesList.sort((a, b) => {
            const statusA = this.getStatusText(a.status);
            return statusA === 'Pending' ? -1 : 1;
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
    const type = this.leaveTypes.find((t) => t.id == typeCode);
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
    this.leaveService
      .updateLeaveStatus(id, newStatusCode.toString())
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Status changed.', 'success');
          this.loadLeaves();
        },
        error: (err) => {
          console.error('Status update error:', err);
          Swal.fire('Error!', 'Failed to update status.', 'error');
        },
      });
  }
}
