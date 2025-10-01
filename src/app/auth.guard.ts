import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const loggedProfile: string | null = localStorage.getItem('access');

  if (loggedProfile) {
    return true;
  }

  router.navigate(['']);

  return false;
};
