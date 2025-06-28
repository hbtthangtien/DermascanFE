import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const historyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedPlan = route.data['planId'];
  const userPlan = authService.getPlanId();
  try {
    if (userPlan >= expectedPlan) {
      console.log(userPlan);
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
};
