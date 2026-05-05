import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../core/services/leave.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {
  leavesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;

  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getLeaves().subscribe({
      next: (data) => {
        this.leavesList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
        this.isLoading = false;
      },
    });
  }

  changeStatus(id: number, status: string) {
    if (confirm(`Are you sure you want to mark this leave as ${status}?`)) {
      this.leaveService.updateLeaveStatus(id, status).subscribe({
        next: () => {
          const targetLeave = this.leavesList.find((l) => l.id === id);
          if (targetLeave) {
            targetLeave.status = status;
          }
        },
        error: (err) => {
          console.error('Error updating leave status:', err);
          alert('Failed to update status. Please try again.');
        },
      });
    }
  }
}
