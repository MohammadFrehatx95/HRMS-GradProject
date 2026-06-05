import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LeaveService } from '../../core/services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './leave-form.component.html',
})
export class LeaveFormComponent {
  private leaveService = inject(LeaveService);
  private router = inject(Router);

  isLoading = false;
  loadingMessage = 'Submitting...';
  private slowWarningTimer: any;

  leaveForm = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    reason: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(500),
    ]),
  });

  onSubmit() {
    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill all required fields. Note: Reason must be at least 5 characters long.',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }

    this.isLoading = true;
    const formValue = this.leaveForm.value;

    const newLeave = {

      leaveType: Number(formValue.leaveType),
      startDate: new Date(formValue.startDate!).toISOString(),
      endDate: new Date(formValue.endDate!).toISOString(),
      reason: formValue.reason,
    };

    this.slowWarningTimer = setTimeout(() => {
      this.loadingMessage = 'Server is starting up, please wait a moment...';
    }, 6000);

    this.leaveService.applyLeave(newLeave).subscribe({
      next: (res) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Done!', text: 'Leave request submitted successfully.', timer: 2000, showConfirmButton: false });
        this.router.navigate(['/leave']);
      },
      error: (err) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire('Error', 'Could not submit leave request. Please try again.', 'error');
      },
    });
  }
}
