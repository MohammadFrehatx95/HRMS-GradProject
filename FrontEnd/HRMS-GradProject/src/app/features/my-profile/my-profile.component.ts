import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { ImageCropperModalComponent } from '../../shared/image-cropper-modal/image-cropper-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, ImageCropperModalComponent],
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
  pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
  isUpdatingProfile = false;
  isChangingPwd = false;
  isUploadingPic = false;
  profilePicUrl: string | null = null;
  pendingProfilePicUrl: string | null = null;

  fingerprints: any[] = [];
  isLoadingFingerprints = false;

  showCropperModal = false;
  imageChangedEvent: any = '';

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
        } catch { }
      }
      this.isLoading = false;
    } else {
      this.loadMyProfile();
    }

    this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    window.addEventListener('profile_pic_updated', () => {
      this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    });

    this.authService.getMe().subscribe({
      next: (me: any) => {
        if (me?.pendingProfilePictureUrl) {
          this.pendingProfilePicUrl = me.pendingProfilePictureUrl;
        }
      },
      error: () => { }
    });

    this.loadFingerprints();
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire('Invalid File', 'Please upload a JPG, PNG, WebP or GIF image.', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire('File Too Large', 'Image must be smaller than 5MB.', 'error');
        return;
      }

      this.imageChangedEvent = event;
      this.showCropperModal = true;
    }
  }

  handleCroppedImage(file: File) {
    this.showCropperModal = false;
    this.isUploadingPic = true;
    this.authService.uploadProfilePicture(file).subscribe({
      next: (res) => {
        this.isUploadingPic = false;

        if (res?.message && res.message.includes('approval')) {
          this.pendingProfilePicUrl = res?.data ?? null;
          Swal.fire({
            icon: 'info',
            title: 'Picture Submitted!',
            html: `<p>Your profile picture has been submitted for review.</p>
                   <p class="text-muted small mt-2">An HR manager will review and approve it shortly. You will be notified once it\'s approved.</p>`,
            confirmButtonText: 'Got it!',
            confirmButtonColor: '#4361ee',
          });
        } else {
          this.profilePicUrl = res?.data ?? null;
          this.pendingProfilePicUrl = null;
          if (this.profilePicUrl) {
            localStorage.setItem('user_profile_pic', this.profilePicUrl);
            window.dispatchEvent(new Event('profile_pic_updated'));
          }
          Swal.fire({
            icon: 'success',
            title: 'Picture Updated!',
            text: 'Your profile picture has been updated successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        }
      },
      error: (err) => {
        this.isUploadingPic = false;
        Swal.fire(
          'Error',
          getFriendlyErrorMessage(err, 'Failed to upload profile picture.'),
          'error'
        );
      }
    });
  }

  openEditModal() {
    this.editData.email = this.profile?.email || this.userEmail || '';
    this.editData.phone =
      this.profile?.phone || this.profile?.phoneNumber || '';
    this.pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  saveProfile() {

    let requestsPending = 0;
    let hasError = false;

    if (this.pwdData.oldPassword && this.pwdData.newPassword) {
      requestsPending++;
      this.isChangingPwd = true;
      this.authService
        .changePassword({
          oldPassword: this.pwdData.oldPassword,
          newPassword: this.pwdData.newPassword,
        })
        .subscribe({
          next: () => {
            this.isChangingPwd = false;
            requestsPending--;
            this.checkDone(requestsPending, hasError);
          },
          error: (err) => {
            this.isChangingPwd = false;
            hasError = true;
            requestsPending--;
            Swal.fire(
              'Error',
              getFriendlyErrorMessage(
                err,
                'Failed to change password. Please check your current password and try again.',
              ),
              'error',
            );
            this.checkDone(requestsPending, hasError);
          },
        });
    }

    const emailChanged =
      this.editData.email !== (this.profile?.email || this.userEmail);
    const phoneChanged =
      this.profile &&
      this.editData.phone !==
      (this.profile?.phone || this.profile?.phoneNumber);

    if (emailChanged || phoneChanged) {
      if (this.profile && this.profile.id) {
        requestsPending++;
        this.isUpdatingProfile = true;

        const updatedEmp = {
          ...this.profile,
          email: this.editData.email,
          phone: this.editData.phone,
          phoneNumber: this.editData.phone,
        };

        this.employeeService
          .updateEmployee(this.profile.id, updatedEmp)
          .subscribe({
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
              Swal.fire(
                'Error',
                getFriendlyErrorMessage(
                  err,
                  'Failed to update profile. Please try again.',
                ),
                'error',
              );
              this.checkDone(requestsPending, hasError);
            },
          });
      } else {

        this.userEmail = this.editData.email;

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
      showConfirmButton: false,
    });
  }

  async addFingerprint() {
    try {
      await this.authService.registerFingerprint();
      Swal.fire({
        icon: 'success',
        title: 'Fingerprint Added!',
        text: 'You can now log in using your fingerprint.',
        timer: 2500,
        showConfirmButton: false,
      });
      this.loadFingerprints();
    } catch (err: any) {
      const errName = err?.name?.toLowerCase() || '';
      const errMsg = err?.message?.toLowerCase() || '';
      
      if (errName === 'notallowederror' || errName === 'aborterror' || errMsg.includes('cancel') || errMsg.includes('abort') || errMsg.includes('timed out')) {
         // Do absolutely nothing, just return quietly
         return;
      }

      const msg = this.getFingerprintRegisterError(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Fingerprint',
        html: msg,
        confirmButtonText: 'OK',
        confirmButtonColor: '#4361ee',
      });
    }
  }

  loadFingerprints() {
    this.isLoadingFingerprints = true;
    this.authService.getFingerprints()
      .then(res => {
        this.fingerprints = res?.data || res || [];
        this.isLoadingFingerprints = false;
      })
      .catch(err => {
        console.error('Failed to load fingerprints:', err);
        this.isLoadingFingerprints = false;
      });
  }

  async deleteFingerprint(id: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to remove this fingerprint? You won\'t be able to log in with it anymore.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Remove'
    });

    if (result.isConfirmed) {
      try {
        await this.authService.deleteFingerprint(id);
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'The fingerprint has been removed.',
          timer: 2000,
          showConfirmButton: false
        });
        this.loadFingerprints();
      } catch (err) {
        Swal.fire('Error', 'Failed to remove fingerprint. Please try again.', 'error');
      }
    }
  }

  private getFingerprintRegisterError(err: any): string {
    if (err?.name === 'NotSupportedError' || err?.message?.includes('authenticator')) {
      return 'Your device does not support fingerprint login, or no biometric sensor is configured.';
    }
    if (err?.status === 401) {
      return 'You must be logged in to add a fingerprint.';
    }
    if (err?.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (err?.status === 0 || !navigator.onLine) {
      return 'No internet connection. Please check your network.';
    }
    return `Could not register fingerprint. Please try again.`;
  }
}
