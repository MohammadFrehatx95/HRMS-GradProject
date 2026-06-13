import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    if (authService.isAdmin() || authService.isHR()) {
      return true;
    }
    
    // For regular users, check if they are linked to an employee profile.
    // We only restrict routes if we know they are unlinked.
    // If 'is_linked' is 'false', they can ONLY access /my-profile.
    const isLinked = localStorage.getItem('is_linked');
    
    // We get the target path from the route
    const targetPath = route.routeConfig?.path;
    
    if (isLinked === 'false' && targetPath !== 'my-profile' && targetPath !== 'login' && targetPath !== 'register') {
       router.navigate(['/my-profile']);
       return false;
    }

    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
