import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';

import { ExcelExportService } from '../../core/services/excel-export.service';
import { PdfExportService } from '../../core/services/pdf-export.service';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './pending-approvals.component.html',
})
export class PendingApprovalsComponent implements OnInit {
  private authService = inject(AuthService);
  private excelExportService = inject(ExcelExportService);
  private pdfExportService = inject(PdfExportService);

  pendingPictures: any[] = [];
  isLoading = true;

  get pendingCount(): number {
    return this.pendingPictures.filter(p => p.status === 0 || p.status === 'Pending').length;
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.authService.getPendingProfilePictures().subscribe({
      next: (res) => {
        this.pendingPictures = res || [];
        this.isLoading = false;
      },
      error: () => {
        this.pendingPictures = [];
        this.isLoading = false;
      },
    });
  }

  approve(requestId: number) {
    Swal.fire({
      title: 'Approve Picture?',
      text: 'This will replace the employee\'s current profile picture.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.approveProfilePicture(requestId).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Approved!', text: 'Profile picture has been approved and applied.', timer: 2000, showConfirmButton: false });
            this.load();
          },
          error: () => Swal.fire('Error', 'Failed to approve picture.', 'error'),
        });
      }
    });
  }

  reject(requestId: number) {
    Swal.fire({
      title: 'Reject Picture?',
      text: 'The employee will be notified that their picture was rejected.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.rejectProfilePicture(requestId).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Rejected', text: 'Profile picture request has been rejected.', timer: 2000, showConfirmButton: false });
            this.load();
          },
          error: () => Swal.fire('Error', 'Failed to reject picture.', 'error'),
        });
      }
    });
  }

  exportToExcel() {
    if (this.pendingPictures.length === 0) {
      Swal.fire('No Data', 'There are no profile picture requests to export.', 'info');
      return;
    }

    const headers = ['Request ID', 'User ID', 'Name', 'Email', 'Upload Date', 'Status'];
    const data = this.pendingPictures.map(p => {
      let statusStr = p.status || 'Pending';
      return [
        `#${p.id}`,
        `#${p.userId}`,
        `${p.username}`,
        p.email,
        p.requestedAt ? new Date(p.requestedAt).toLocaleString() : '—',
        statusStr
      ];
    });

    this.excelExportService.exportTableToExcel(headers, data, 'Profile_Picture_Requests');
  }

  exportToPDF() {
    if (this.pendingPictures.length === 0) {
      Swal.fire('No Data', 'There are no profile picture requests to export.', 'info');
      return;
    }

    const headers = ['Request ID', 'User ID', 'Name', 'Email', 'Upload Date', 'Status'];
    const data = this.pendingPictures.map(p => {
      let statusStr = p.status || 'Pending';
      return [
        `#${p.id}`,
        `#${p.userId}`,
        `${p.username || ''}`.trim() || '—',
        p.email || '—',
        p.requestedAt ? new Date(p.requestedAt).toLocaleString() : '—',
        statusStr
      ];
    });

    this.pdfExportService.generateTableReport(
      'Profile Picture Requests',
      headers,
      data,
      'Profile_Picture_Requests_Report'
    );
  }
}
