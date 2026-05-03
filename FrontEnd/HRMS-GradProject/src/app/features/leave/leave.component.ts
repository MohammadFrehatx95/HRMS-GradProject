import { Component, OnInit, inject } from '@angular/core';
import { LeaveService } from '../../core/services/leave.service';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css',
})
export class LeaveComponent implements OnInit {
  leaveRequests: any[] = [];

  private leaveService = inject(LeaveService);

  ngOnInit() {
    this.leaveRequests = this.leaveService.getLeaveRequests();
  }
}
