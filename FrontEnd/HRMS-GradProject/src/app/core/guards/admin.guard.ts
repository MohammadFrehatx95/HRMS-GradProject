import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🛡️ Admin Guard is checking your role...');

  if (authService.isAdmin()) {
    console.log('✅ Admin Guard PASSED! Welcome Admin.');
    return true;
  } else {
    console.log('❌ Admin Guard FAILED! Redirecting...');
    router.navigate(['/dashboard']);
    return false;
  }
};
