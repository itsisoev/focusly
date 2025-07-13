import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const guestModeGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth_token');
  const guest = localStorage.getItem('guest_user');
  const router = inject(Router);

  return (token || guest) ? true : router.createUrlTree(['/guest']);
};
