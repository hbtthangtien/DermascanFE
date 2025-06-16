import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];
  const userRole = authService.getRole();
  try {
    if (userRole === expectedRole) {
      return true;
    } else {
      if (userRole === 'ADMIN') {
        router.navigate(['/admin']);
      } else {
        router.navigate(['/home']);
      }

      return false;
    }
  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
};
