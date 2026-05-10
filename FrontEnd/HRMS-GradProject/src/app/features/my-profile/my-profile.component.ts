import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  profile: any = null;
  isLoading: boolean = true;
  isAdmin: boolean = false;
  userName: string = '';
  userRole: string = '';
  userEmail: string = '';

  editData = { email: '', phone: '' };
  pwdData = { oldPassword: '', newPassword: '' };
  isUpdatingProfile = false;
  isChangingPwd = false;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    if (this.isAdmin) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userEmail =
            payload['email'] ||
            payload[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ] ||
            '';
        } catch {}
      }
      this.isLoading = false;
    } else {
      this.loadMyProfile();
    }
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getProfileInitials(): string {
    const name = this.profile?.fullName || this.userName || 'U';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        this.isLoading = false;
      },
    });
  }

  openEditModal() {
    this.editData.email = this.profile?.email || this.userEmail || '';
    this.editData.phone = this.profile?.phone || this.profile?.phoneNumber || '';
    this.pwdData = { oldPassword: '', newPassword: '' };
    
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  saveProfile() {
    let requestsPending = 0;
    let hasError = false;

    // 1. Password Update
    if (this.pwdData.oldPassword && this.pwdData.newPassword) {
      requestsPending++;
      this.isChangingPwd = true;
      this.authService.changePassword({ oldPassword: this.pwdData.oldPassword, newPassword: this.pwdData.newPassword }).subscribe({
        next: () => {
          this.isChangingPwd = false;
          requestsPending--;
          this.checkDone(requestsPending, hasError);
        },
        error: (err) => {
          this.isChangingPwd = false;
          hasError = true;
          requestsPending--;
          Swal.fire('Error', err.error?.message || 'Failed to change password.', 'error');
          this.checkDone(requestsPending, hasError);
        }
      });
    }

    // 2. Profile Info Update
    const emailChanged = this.editData.email !== (this.profile?.email || this.userEmail);
    const phoneChanged = this.profile && this.editData.phone !== (this.profile?.phone || this.profile?.phoneNumber);

    if (emailChanged || phoneChanged) {
      if (this.profile && this.profile.id) {
        requestsPending++;
        this.isUpdatingProfile = true;
        
        // Prepare updated employee object
        const updatedEmp = { 
          ...this.profile, 
          email: this.editData.email, 
          phone: this.editData.phone,
          phoneNumber: this.editData.phone 
        };
        
        this.employeeService.updateEmployee(this.profile.id, updatedEmp).subscribe({
          next: () => {
            this.isUpdatingProfile = false;
            this.profile.email = this.editData.email;
            this.profile.phone = this.editData.phone;
            this.userEmail = this.editData.email;
            
            requestsPending--;
            this.checkDone(requestsPending, hasError);
          },
          error: (err) => {
            this.isUpdatingProfile = false;
            hasError = true;
            requestsPending--;
            Swal.fire('Error', err.error?.message || 'Failed to update profile details.', 'error');
            this.checkDone(requestsPending, hasError);
          }
        });
      } else {
        // Admin without employee profile
        this.userEmail = this.editData.email;
        // There might not be an endpoint to update Admin user email alone, 
        // but we update it locally for UX.
      }
    }

    if (requestsPending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private checkDone(pending: number, hasError: boolean) {
    if (pending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private closeModalAndShowSuccess() {
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.',
      timer: 2000,
      showConfirmButton: false
    });
  }
}
