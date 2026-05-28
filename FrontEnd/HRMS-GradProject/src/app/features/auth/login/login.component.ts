import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private settingsService = inject(SettingsService);

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

  scrollToOverview(event: Event) {
    event.preventDefault();
    document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit() {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-mode');

    
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-typing, .reveal-zoom').forEach((el) => {
        observer.observe(el);
      });
    }, 100);
  }

  ngOnDestroy() {

    if (this.settingsService.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    }
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
          'Login Failed',
          getFriendlyErrorMessage(
            err,
            'Incorrect email or password. Please try again.',
          ),
          'error',
        );
      },
    });
  }
}
