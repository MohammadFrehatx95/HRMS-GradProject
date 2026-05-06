import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  isAdmin: boolean = false;
  userName: string = '';

  totalEmployees: number = 0;
  departmentsCount: number = 0;
  pendingLeaves: number = 0;

  employeeProfile: any = null;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();

    this.userName = localStorage.getItem('user_name') || 'User';

    if (this.isAdmin) {
      this.loadAdminDashboard();
    } else {
      this.loadEmployeeDashboard();
    }
  }

  loadAdminDashboard() {
    this.totalEmployees = 12;
    this.departmentsCount = 4;
    this.pendingLeaves = 2;
  }

  loadEmployeeDashboard() {
    this.http
      .get<any>('https://localhost:7204/api/employees/my-profile')
      .subscribe({
        next: (profile) => {
          this.employeeProfile = profile;
        },
        error: (err) => {
          console.error('Error fetching my profile:', err);
        },
      });
  }
}
