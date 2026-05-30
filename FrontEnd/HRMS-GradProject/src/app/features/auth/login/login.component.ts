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
  isFingerprintLoading = false;
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

  async loginWithFingerprint() {
    this.isFingerprintLoading = true;
    try {
      await this.authService.loginWithFingerprint();
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.isFingerprintLoading = false;
      const friendlyMsg = this.getFingerprintErrorMessage(err);
      Swal.fire({
        icon: 'error',
        title: 'Fingerprint Login Failed',
        html: friendlyMsg,
        confirmButtonText: 'OK',
        confirmButtonColor: '#4361ee',
      });
    } finally {
      this.isFingerprintLoading = false;
    }
  }

  private getFingerprintErrorMessage(err: any): string {
    // User cancelled or dismissed the fingerprint prompt
    if (
      err?.name === 'NotAllowedError' ||
      err?.message?.includes('NotAllowedError') ||
      err?.message?.includes('cancelled') ||
      err?.message?.includes('canceled')
    ) {
      return 'Fingerprint scan was cancelled.<br><small class="text-muted">Please try again and follow your device prompt.</small>';
    }

    // No fingerprint registered for this user (400 from backend)
    const status = err?.status;
    // Backend returns ApiResponse: { success: false, message: "..." }
    const backendMsg: string =
      err?.error?.message ||
      (typeof err?.error === 'string' ? err.error : '') ||
      err?.message ||
      '';

    if (status === 400) {
      if (backendMsg.toLowerCase().includes('no fingerprint') || backendMsg.toLowerCase().includes('unknown credential')) {
        return 'No fingerprint is registered for this account.<br><small class="text-muted">Go to <b>My Profile → Add Fingerprint Login</b> first.</small>';
      }
      if (backendMsg.toLowerCase().includes('expired')) {
        return 'Session expired. Please try again.';
      }
      if (backendMsg.length > 0 && backendMsg.length < 300) {
        return `${backendMsg}<br><small class="text-muted">Go to <b>My Profile → Add Fingerprint Login</b> if you haven't registered yet.</small>`;
      }
      return 'No fingerprint is registered for this account.<br><small class="text-muted">Go to <b>My Profile → Add Fingerprint Login</b> first.</small>';
    }

    if (status === 404) {
      return 'User not found. Please check your email address.';
    }

    if (status === 0 || !navigator.onLine) {
      return 'No internet connection. Please check your network.';
    }

    // Hardware not available
    if (
      err?.name === 'NotSupportedError' ||
      err?.message?.includes('authenticator')
    ) {
      return 'Your device does not support fingerprint login, or no biometric is configured.';
    }

    return `Could not log in with fingerprint.<br><br><b>Debug Info:</b> ${err?.message || JSON.stringify(err)}`;
  }
}
