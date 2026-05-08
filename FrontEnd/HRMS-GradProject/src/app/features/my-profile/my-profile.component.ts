import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  profile: any = null;
  isLoading: boolean = true;
  errorMsg: string = '';

  ngOnInit() {
    this.loadMyProfile();
  }

  loadMyProfile() {
    this.isLoading = true;
    this.employeeService.getMyProfile().subscribe({
      next: (res: any) => {
        this.profile = res?.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my profile:', err);
        this.errorMsg = err.error?.message || 'Could not load your profile. Please ensure you are linked to an employee record.';
        this.isLoading = false;
      },
    });
  }
}
