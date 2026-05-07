import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
    if (this.registerForm.invalid) {
      Swal.fire('Warning', 'Please fill all fields correctly.', 'warning');
      return;
    }

    this.isLoading = true;
    const payload = this.registerForm.getRawValue();

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'User Registered!',
          text: 'Account created successfully. You can now add their employee details.',
          showConfirmButton: true,
          confirmButtonText: 'Go to Add Employee',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/employee-form']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Registration Error:', err);
        const errorMsg =
          err.error?.message || err.error?.title || 'Registration failed.';
        Swal.fire('Error', errorMsg, 'error');
      },
    });
  }
}
