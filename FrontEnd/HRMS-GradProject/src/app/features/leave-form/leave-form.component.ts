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
      alert(
        'Please fill all required fields. Note: Reason must be at least 5 characters long.',
      );
      console.log('Form Errors:', this.leaveForm.errors);
      return;
    }

    this.isLoading = true;
    const formValue = this.leaveForm.value;

    const newLeave = {
      leaveType: formValue.leaveType,
      startDate: new Date(formValue.startDate!).toISOString(),
      endDate: new Date(formValue.endDate!).toISOString(),
      reason: formValue.reason,
      employeeId: 1,
    };

    console.log('Sending Leave Data:', newLeave);

    this.leaveService.applyLeave(newLeave).subscribe({
      next: (res) => {
        console.log('Success:', res);
        this.isLoading = false;
        this.router.navigate(['/leave']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error applying leave:', err);
        alert(
          'Backend Error: Could not apply leave. Check Console (F12) for details.',
        );
      },
    });
  }
}
