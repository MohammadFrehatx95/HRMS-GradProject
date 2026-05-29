import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../core/services/leave.service';
import { LeaveSettingService, LeaveSetting } from '../../core/services/leave-setting.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { ExcelExportService } from '../../core/services/excel-export.service';
import { PdfExportService } from '../../core/services/pdf-export.service';

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
  private excelExportService = inject(ExcelExportService);
  private pdfExportService = inject(PdfExportService);
  private leaveSettingService = inject(LeaveSettingService);

  allLeavesList: any[] = [];
  leavesList: any[] = [];

  leaveSearchQuery: string = '';
  selectedLeaveStatus: string = '';
  selectedLeaveType: string = '';

  isLoading: boolean = true;
  isProcessing: boolean = false;

  isAdminOrHR: boolean = false;
  annualLeaveBalance: number = 0;
  sickLeaveBalance: number = 0;
  emergencyLeaveBalance: number = 0;

  leaveModal: any;
  settingsModal: any;

  leaveSettings: LeaveSetting = {
    resetMonth: 1,
    resetDay: 1,
    defaultAnnualLeave: 14,
    defaultSickLeave: 14,
    defaultEmergencyLeave: 3
  };
  isSavingSettings: boolean = false;
  isAdmin: boolean = false;

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

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  leaveTypes = [
    { id: 0, name: 'Annual' },
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Emergency' },
    { id: 3, name: 'Unpaid' },
  ];

  ngOnInit() {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.isAdmin = this.authService.isAdmin();
    this.loadBalances();
    this.loadLeaves();
    if (this.isAdminOrHR) {
      this.loadSettings();
    }
  }

  loadSettings() {
    this.leaveSettingService.getSettings().subscribe({
      next: (res) => {
        if (res) {
          this.leaveSettings = res;
        }
      },
      error: (err) => console.error('Failed to load leave settings', err)
    });
  }

  openSettingsModal() {
    if (!this.settingsModal) {
      this.settingsModal = new bootstrap.Modal(
        document.getElementById('settingsModal')
      );
    }
    this.settingsModal.show();
  }

  saveSettings() {
    if (!this.isAdmin) return;
    this.isSavingSettings = true;
    this.leaveSettingService.updateSettings(this.leaveSettings).subscribe({
      next: () => {
        this.isSavingSettings = false;
        this.settingsModal.hide();
        Swal.fire('Success', 'Leave settings updated successfully', 'success');
      },
      error: (err) => {
        this.isSavingSettings = false;
        Swal.fire('Error', getFriendlyErrorMessage(err), 'error');
      }
    });
  }

  loadBalances() {
    if (!this.isAdmin) {
      this.authService.getMe().subscribe({
        next: (res) => {
          this.annualLeaveBalance = res?.annualLeaveBalance ?? 0;
          this.sickLeaveBalance = res?.sickLeaveBalance ?? 0;
          this.emergencyLeaveBalance = res?.emergencyLeaveBalance ?? 0;
        },
        error: (err) => console.error('Error fetching balances:', err)
      });
    }
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

            return (
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            );
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

  filterLeaves() {

    this.leavesList = this.allLeavesList.filter((l) => {
      let matchesSearch = true;
      if (this.leaveSearchQuery) {
        const query = this.leaveSearchQuery.toLowerCase();
        const empName = (l.employeeName || '').toLowerCase();
        const empId = String(l.employeeId || '');
        const reason = (l.reason || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          reason.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedLeaveStatus) {
        matchesStatus =
          this.getStatusText(l.status).toLowerCase() ===
          this.selectedLeaveStatus.toLowerCase();
      }

      let matchesType = true;
      if (this.selectedLeaveType) {

        const leaveTypeName = this.getLeaveTypeText(l.leaveType).toLowerCase();
        matchesType = leaveTypeName === this.selectedLeaveType.toLowerCase();
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
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
    }
  }

  getStatusText(statusCode: any): string {

    if (typeof statusCode === 'string' && isNaN(Number(statusCode))) {
      return statusCode;
    }

    if (statusCode === 0 || statusCode === '0') return 'Pending';
    if (statusCode === 1 || statusCode === '1') return 'Approved';
    if (statusCode === 2 || statusCode === '2') return 'Rejected';
    return statusCode?.toString() || 'Unknown';
  }

  getLeaveTypeText(typeCode: any): string {

    if (typeof typeCode === 'string' && isNaN(Number(typeCode))) {
      const found = this.leaveTypes.find(
        (t) => t.name.toLowerCase() === typeCode.toLowerCase(),
      );
      return found
        ? found.name
        : typeCode.charAt(0).toUpperCase() + typeCode.slice(1);
    }

    const type = this.leaveTypes.find((t) => t.id === Number(typeCode));
    return type ? type.name : typeCode != null ? String(typeCode) : 'Unknown';
  }

  showRejectionReason(reason: string) {
    Swal.fire({
      icon: 'info',
      title: 'Rejection Reason',
      text: reason || 'No additional reason provided.',
      confirmButtonText: 'Close',
      confirmButtonColor: '#3085d6'
    });
  }

  openModal() {
    this.leaveData = { leaveType: 0, startDate: '', endDate: '', reason: '' };
    this.selectedFile = null;
    const modalEl = document.getElementById('leaveModal');
    if (modalEl) {
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalEl);
      }
      this.leaveModal = modalInstance;
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
      Swal.fire(
        'Invalid Date',
        'End Date cannot be before the Start Date.',
        'warning',
      );
      return;
    }

    const start = new Date(this.leaveData.startDate);
    const end = new Date(this.leaveData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    
    const selectedType = Number(this.leaveData.leaveType);
    let availableBalance = 0;
    let typeName = '';

    if (selectedType === 0) {
      availableBalance = this.annualLeaveBalance;
      typeName = 'annual';
    } else if (selectedType === 1) {
      availableBalance = this.sickLeaveBalance;
      typeName = 'sick';
    } else if (selectedType === 2) {
      availableBalance = this.emergencyLeaveBalance;
      typeName = 'emergency';
    }

    if (selectedType !== 3 && diffDays > availableBalance) {
      Swal.fire(
        'Insufficient Balance', 
        `You are requesting ${diffDays} days, but you only have ${availableBalance} ${typeName} leave days remaining.`, 
        'warning'
      );
      return;
    }

    this.isProcessing = true;
    
    const formData = new FormData();
    formData.append('leaveType', this.leaveData.leaveType.toString());
    formData.append('startDate', new Date(this.leaveData.startDate).toISOString());
    formData.append('endDate', new Date(this.leaveData.endDate).toISOString());
    formData.append('reason', this.leaveData.reason);
    
    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile);
    }

    this.leaveService.applyLeave(formData).subscribe({
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
        Swal.fire(
          'Error',
          getFriendlyErrorMessage(
            err,
            'Failed to submit leave request. Please try again.',
          ),
          'warning',
        );
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
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.executeStatusChange(id, newStatusCode, result.value);
        }
      });
    } else {
      this.executeStatusChange(id, newStatusCode);
    }
  }

  private executeStatusChange(
    id: number,
    newStatusCode: number,
    rejectionReason?: string,
  ) {
    this.leaveService
      .updateLeaveStatus(id, newStatusCode, rejectionReason)
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Status changed.', 'success');
          this.loadLeaves();
        },
        error: (err) => {
          console.error('Status update error:', err);
          Swal.fire(
            'Error!',
            getFriendlyErrorMessage(
              err,
              'Failed to update leave status. Please try again.',
            ),
            'error',
          );
        },
      });
  }

  showReason(reason: string) {
    if (!reason) return;
    Swal.fire({
      title: 'Leave Reason',
      text: reason,
      icon: 'info',
      confirmButtonText: 'Close',
      confirmButtonColor: '#0d6efd'
    });
  }

  exportToExcel() {
    this.excelExportService.exportTableToExcel(
      ['Employee', 'Type', 'Start Date', 'End Date', 'Days', 'Status'],
      this.leavesList.map(l => [
        l.employeeName || `Emp #${l.employeeId}`,
        this.getLeaveTypeText(l.leaveType),
        new Date(l.startDate).toLocaleDateString(),
        new Date(l.endDate).toLocaleDateString(),
        l.totalDays || 0,
        this.getStatusText(l.status)
      ]),
      'Leave_Records'
    );
  }

  exportToPDF() {
    const headers = ['Employee', 'Type', 'Start Date', 'End Date', 'Days', 'Status'];
    
    const rows = this.leavesList.map(l => [
      l.employeeName || `Emp #${l.employeeId}`,
      this.getLeaveTypeText(l.leaveType),
      new Date(l.startDate).toLocaleDateString(),
      new Date(l.endDate).toLocaleDateString(),
      l.totalDays || 0,
      this.getStatusText(l.status)
    ]);
    
    this.pdfExportService.generateTableReport('Leave Records Report', headers, rows, 'Leave_Records');
  }
}
