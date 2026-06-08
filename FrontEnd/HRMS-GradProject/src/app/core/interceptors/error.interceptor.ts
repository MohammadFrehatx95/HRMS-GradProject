import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Global error handler.
      // This prevents components from needing to duplicate console.error logic.
      if (error.status === 401) {
        // Unauthorized - handle silently or redirect
        if (!req.url.includes('/login')) {
          router.navigate(['/login']);
        }
      } else if (error.status >= 500) {
        // Server error
        // A generic UI alert could be triggered here if desired
      }
      
      // Let the component handle specific business logic if it needs to,
      // but without the need to console.error everything.
      return throwError(() => error);
    })
  );
};
