import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';

import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = false;
  isPasswordVisible = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'فشل تسجيل الدخول',
          err.error?.message || 'تأكد من صحة البريد الإلكتروني وكلمة المرور',
          'error',
        );
      },
    });
  }
}
