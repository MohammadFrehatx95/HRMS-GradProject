import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ImageCropperModalComponent } from '../../shared/image-cropper-modal/image-cropper-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { PositionService } from '../../core/services/position.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ImageCropperModalComponent, TranslatePipe, MatDatepickerModule, MatNativeDateModule, NgxMaskDirective],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  isEditMode = false;
  isAdmin = false;
  currentEmployeeId: number | null = null;
  departments: any[] = [];
  positions: any[] = [];
  unassignedUsers: any[] = [];

  linkedUserInfo: { username: string; email: string; role: string; profilePictureUrl: string | null } | null =
    null;

  selectedPictureFile: File | null = null;
  picturePreviewUrl: string | null = null;

  showCropperModal = false;
  imageChangedEvent: any = '';

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    birthDate: new FormControl('', Validators.required),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    userId: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.minLength(6)]),
    role: new FormControl(''),
    isActive: new FormControl(true),
  });

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();

    const state = window.history.state;

    if (state && state.editMode && state.employeeId) {

      this.isEditMode = true;
      this.currentEmployeeId = state.employeeId;
      this.loadEmployeeDetails(this.currentEmployeeId!);

      this.employeeForm.get('userId')?.disable();
      this.employeeForm.get('email')?.disable();
    } else {

      if (state && (state.userId || state.email)) {
        this.employeeForm.patchValue({
          userId: state.userId,
          email: state.email,
        });
      }

      this.employeeForm.get('email')?.disable();

      this.loadUnassignedUsers();

      this.employeeForm.get('userId')?.valueChanges.subscribe((selectedId) => {
        const user = this.unassignedUsers.find(
          (u) => String(u.id) === String(selectedId),
        );
        if (user) {
          this.employeeForm.get('email')?.setValue(user.email);
        }
      });
    }

    this.loadDepartments();

    this.employeeForm.get('departmentId')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.employeeForm.get('positionId')?.enable();
        this.loadPositions(Number(deptId));
      }
    });
  }

  loadEmployeeDetails(id: number) {
    this.isLoading = true;

    this.employeeService.getEmployeeById(id).subscribe({
      next: (profile: any) => {
        this.isLoading = false;

        if (profile.departmentId) {
          this.loadPositions(profile.departmentId);
          this.employeeForm.get('positionId')?.enable();
        }

        this.employeeForm.patchValue({
          firstName: profile.firstName || profile.fullName?.split(' ')[0] || '',
          lastName:
            profile.lastName ||
            profile.fullName?.split(' ').slice(1).join(' ') ||
            '',
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || profile.phone || '',
          birthDate: profile.birthDate
            ? new Date(profile.birthDate).toISOString().split('T')[0]
            : '',
          hireDate: profile.hireDate
            ? new Date(profile.hireDate).toISOString().split('T')[0]
            : '',
          departmentId: profile.departmentId || '',
          positionId: profile.positionId || '',
          userId: profile.userId || '',
          role: profile.role || '',
          isActive: profile.isActive !== false,
        });

        this.linkedUserInfo = {
          username:
            profile.fullName ||
            `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
            'Employee',
          email: profile.email || '',
          role: profile.positionTitle || profile.departmentName || 'Employee',
          profilePictureUrl: profile.profilePictureUrl || null
        };
        
        if (profile.profilePictureUrl) {
          this.picturePreviewUrl = profile.profilePictureUrl;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching employee', err);
        Swal.fire('Error', 'Failed to load employee details', 'error');
      },
    });
  }

  loadDepartments() {

    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
      },
    });
  }

  loadUnassignedUsers() {

    this.authService.getUnassignedEmployeeUsers().subscribe({
      next: (res: any) => {
        this.unassignedUsers = res?.items ?? (Array.isArray(res) ? res : []);
      },
      error: (err) => {
        console.error('Failed to load unassigned users:', err);
      },
    });
  }

  loadPositions(deptId: number) {

    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res) ? res : res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  get displayEmail(): string {
    return this.employeeForm.getRawValue().email || '';
  }

  getProfileInitials(): string {
    const fName = this.employeeForm.getRawValue().firstName || '';
    const lName = this.employeeForm.getRawValue().lastName || '';
    if (fName || lName) {
      return ((fName[0] || '') + (lName[0] || '')).toUpperCase();
    }
    return this.linkedUserInfo?.username?.charAt(0)?.toUpperCase() || 'U';
  }

  private parseBackendError(err: any): string {
    const body = err?.error;

    if (!body) return 'An unexpected error occurred. Please try again.';

    if (body.errors && typeof body.errors === 'object') {
      const fieldLabels: Record<string, string> = {
        PhoneNumber: 'Phone Number',
        FirstName: 'First Name',
        LastName: 'Last Name',
        Email: 'Email',
        HireDate: 'Hire Date',
        DepartmentId: 'Department',
        PositionId: 'Position',
        UserId: 'User Account',
      };

      const messages: string[] = [];
      for (const [field, errors] of Object.entries(body.errors)) {
        const label = fieldLabels[field] || field;
        const msgs = Array.isArray(errors) ? errors : [String(errors)];
        for (const msg of msgs) {
          messages.push(`• ${label}: ${msg}`);
        }
      }
      if (messages.length) return messages.join('\n');
    }

    if (body.message) return body.message;
    if (body.title) return body.title;
    if (typeof body === 'string') return body;

    return 'An error occurred while submitting. Please try again.';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire('Error', 'File size exceeds 5MB limit', 'error');
        return;
      }
      this.imageChangedEvent = event;
      this.showCropperModal = true;
    }
  }

  handleCroppedImage(file: File) {
    this.showCropperModal = false;
    this.selectedPictureFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.picturePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  deleteProfilePicture() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this employee\'s profile picture?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.isEditMode || !this.employeeForm.getRawValue().userId) {
          this.selectedPictureFile = null;
          this.picturePreviewUrl = null;
          return;
        }
        
        this.isLoading = true;
        this.authService.adminDeleteProfilePicture(Number(this.employeeForm.getRawValue().userId)).subscribe({
          next: () => {
            this.isLoading = false;
            this.picturePreviewUrl = null;
            this.selectedPictureFile = null;
            if (this.linkedUserInfo) this.linkedUserInfo.profilePictureUrl = null;
            Swal.fire('Deleted!', 'Profile picture has been deleted.', 'success');
          },
          error: (err) => {
            this.isLoading = false;
            Swal.fire('Error', 'Failed to delete picture.', 'error');
            console.error(err);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      const phone = this.employeeForm.get('phoneNumber');
      if (phone?.errors?.['pattern']) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Phone Number',
          text: 'Phone number must be exactly 10 digits (numbers only, no spaces or symbols).',
          confirmButtonText: 'OK',
        });
        return;
      }
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please make sure all required fields are filled in correctly.',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.isLoading = true;
    const rawValues = this.employeeForm.getRawValue();

    const payload: any = {
      ...rawValues,
      departmentId: Number(rawValues.departmentId),
      positionId: Number(rawValues.positionId),
      isActive: rawValues.isActive,
      hireDate: rawValues.hireDate
        ? new Date(rawValues.hireDate).toISOString()
        : new Date().toISOString(),
    };

    if (this.isEditMode && rawValues.password) {
      payload.password = rawValues.password;
    }

    if (this.isEditMode && rawValues.role && this.isAdmin) {
      payload.role = rawValues.role;
    }

    if (this.isEditMode && this.currentEmployeeId) {
      this.employeeService.updateEmployee(this.currentEmployeeId, payload).subscribe({
        next: () => {
          this.handlePictureUploadAndNavigate(Number(rawValues.userId));
        },
        error: (err) => {
          this.isLoading = false;
          const msg = this.parseBackendError(err);
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: msg,
            confirmButtonText: 'OK',
          });
          console.error('Update error:', err);
        },
      });
    } else {
      this.employeeService.addEmployee(payload).subscribe({
        next: () => {
          this.handlePictureUploadAndNavigate(Number(rawValues.userId));
        },
        error: (err) => {
          this.isLoading = false;
          const msg = this.parseBackendError(err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Add Employee',
            text: msg,
            confirmButtonText: 'OK',
          });
          console.error('Add error:', err);
        },
      });
    }
  }

  private handlePictureUploadAndNavigate(userId: number) {
    if (this.selectedPictureFile) {
      this.authService.adminUpdateProfilePicture(userId, this.selectedPictureFile).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('Success', 'Employee saved with new profile picture successfully', 'success');
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Warning', 'Employee saved, but failed to upload picture.', 'warning');
          this.router.navigate(['/employees']);
        }
      });
    } else {
      this.isLoading = false;
      Swal.fire('Success', 'Employee saved successfully', 'success');
      this.router.navigate(['/employees']);
    }
  }
}
