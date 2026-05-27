import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('', Validators.required),
  });

  roles = ['Employee', 'Admin', 'HR'];

  onSubmit() {
    // إنشاء حساب جديد
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const payload = this.registerForm.getRawValue();
    // بيانات التسجيل

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        const userIdFromRes = res?.data?.id || res?.id || res?.userId;
        const userEmail = this.registerForm.get('email')?.value;

        Swal.fire({
          icon: 'success',
          title: 'Account Created Successfully',
          text: 'Do you want to complete the employee profile now?',
          showCancelButton: true,
          confirmButtonText: 'Yes, Complete Profile',
          cancelButtonText: 'Later',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/employee-form'], {
              state: {
                userId: userIdFromRes,
                email: userEmail,
              },
            });
          } else {
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'Error',
          getFriendlyErrorMessage(
            err,
            'Failed to create account. Please try again.',
          ),
          'error',
        );
      },
    });
  }
}
