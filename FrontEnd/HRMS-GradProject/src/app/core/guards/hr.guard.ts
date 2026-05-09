import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** يسمح فقط لـ Admin أو HR */
export const hrGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdminOrHR()) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};
