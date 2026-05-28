import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';

import { ExcelExportService } from '../../core/services/excel-export.service';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './pending-approvals.component.html',
})
export class PendingApprovalsComponent implements OnInit {
  private authService = inject(AuthService);
  private excelExportService = inject(ExcelExportService);

  pendingPictures: any[] = [];
  isLoading = true;

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

  approve(userId: number) {
    Swal.fire({
      title: 'Approve Picture?',
      text: 'This will replace the employee\'s current profile picture.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Approve',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.approveProfilePicture(userId).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Approved!', text: 'Profile picture has been approved and applied.', timer: 2000, showConfirmButton: false });
            this.load();
          },
          error: () => Swal.fire('Error', 'Failed to approve picture.', 'error'),
        });
      }
    });
  }

  reject(userId: number) {
    Swal.fire({
      title: 'Reject Picture?',
      text: 'The employee will be notified that their picture was rejected.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.rejectProfilePicture(userId).subscribe({
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
      Swal.fire('No Data', 'There are no pending approvals to export.', 'info');
      return;
    }

    const headers = ['User ID', 'Name', 'Email', 'Upload Date'];
    const data = this.pendingPictures.map(p => [
      `#${p.userId}`,
      `${p.firstName} ${p.lastName}`,
      p.email,
      new Date(p.uploadedAt).toLocaleString()
    ]);

    this.excelExportService.exportTableToExcel(headers, data, 'Pending_Profile_Pictures');
  }
}
