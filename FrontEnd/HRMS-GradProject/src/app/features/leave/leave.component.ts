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
import { ImageCropperModalComponent } from '../../shared/image-cropper-modal/image-cropper-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, ImageCropperModalComponent],
  templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);
  private excelExportService = inject(ExcelExportService);
  private pdfExportService = inject(PdfExportService);
  private leaveSettingService = inject(LeaveSettingService);

  leavesList: any[] = [];

  leaveSearchQuery: string = '';
  selectedLeaveStatus: string = '';
  selectedLeaveType: string = '';
  selectedMonth: string = '';
  selectedYear: string = '';
  
  uniqueYears: number[] = [];

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
  itemsPerPage: number = 10;
  totalCount: number = 0;

  get paginatedLeaves() {
    return this.leavesList;
  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLeaves();
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
  showCropperModal = false;
  imageChangedEvent: any = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        this.imageChangedEvent = event;
        this.showCropperModal = true;
      } else {
        this.selectedFile = file;
      }
    }
  }

  handleCroppedImage(file: File) {
    this.showCropperModal = false;
    this.selectedFile = file;
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
    
    const currentYear = new Date().getFullYear();
    for(let i = 0; i < 5; i++) {
        this.uniqueYears.push(currentYear - i);
    }

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
      });
    }
  }

  loadLeaves() {
    this.isLoading = true;
    const m = this.selectedMonth ? Number(this.selectedMonth) : undefined;
    const y = this.selectedYear ? Number(this.selectedYear) : undefined;

    let statusParam: number | string = '';
    if (this.selectedLeaveStatus === 'Pending') statusParam = 0;
    else if (this.selectedLeaveStatus === 'Approved') statusParam = 1;
    else if (this.selectedLeaveStatus === 'Rejected') statusParam = 2;

    let typeParam: number | string = '';
    if (this.selectedLeaveType === 'Annual') typeParam = 0;
    else if (this.selectedLeaveType === 'Sick') typeParam = 1;
    else if (this.selectedLeaveType === 'Emergency') typeParam = 2;
    else if (this.selectedLeaveType === 'Unpaid') typeParam = 3;

    const request = this.isAdminOrHR
      ? this.leaveService.getAllLeaves(m, y, this.currentPage, this.itemsPerPage, this.leaveSearchQuery, statusParam, typeParam)
      : this.leaveService.getMyLeaves(m, y, this.currentPage, this.itemsPerPage, this.leaveSearchQuery, statusParam, typeParam);

    request.subscribe({
      next: (res: any) => {
        this.leavesList = res.items || [];
        this.totalCount = res.totalCount || 0;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.leavesList = [];
      },
    });
  }

  filterLeaves() {
    this.currentPage = 1;
    this.loadLeaves();
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
    const reqStart = new Date(this.leaveData.startDate);
    reqStart.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reqStart.getTime() < today.getTime()) {
      Swal.fire('Invalid Date', 'Start Date cannot be in the past.', 'warning');
      return;
    }

    const reqEnd = new Date(this.leaveData.endDate);
    reqEnd.setHours(0, 0, 0, 0);

    if (reqEnd.getTime() < reqStart.getTime()) {
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

  showLeaveBalance(leave: any) {
    const annual = leave.employeeAnnualLeaveBalance !== undefined && leave.employeeAnnualLeaveBalance !== null ? leave.employeeAnnualLeaveBalance : '?';
    const sick = leave.employeeSickLeaveBalance !== undefined && leave.employeeSickLeaveBalance !== null ? leave.employeeSickLeaveBalance : '?';
    const emergency = leave.employeeEmergencyLeaveBalance !== undefined && leave.employeeEmergencyLeaveBalance !== null ? leave.employeeEmergencyLeaveBalance : '?';
    
    Swal.fire({
      title: `${leave.employeeName}'s Balance`,
      html: `
        <div class="d-flex flex-column gap-3 text-start mt-3">
          <div class="d-flex justify-content-between align-items-center p-3 bg-primary bg-opacity-10 rounded-3 border border-primary border-opacity-25">
            <span class="fw-bold text-primary"><i class="bi bi-airplane-engines me-2"></i>Annual Leave</span>
            <span class="badge bg-primary text-white fs-6 rounded-pill px-3 py-2">${annual} Days</span>
          </div>
          <div class="d-flex justify-content-between align-items-center p-3 bg-success bg-opacity-10 rounded-3 border border-success border-opacity-25">
            <span class="fw-bold text-success"><i class="bi bi-heart-pulse me-2"></i>Sick Leave</span>
            <span class="badge bg-success text-white fs-6 rounded-pill px-3 py-2">${sick} Days</span>
          </div>
          <div class="d-flex justify-content-between align-items-center p-3 bg-danger bg-opacity-10 rounded-3 border border-danger border-opacity-25">
            <span class="fw-bold text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Emergency Leave</span>
            <span class="badge bg-danger text-white fs-6 rounded-pill px-3 py-2">${emergency} Days</span>
          </div>
        </div>
      `,
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
