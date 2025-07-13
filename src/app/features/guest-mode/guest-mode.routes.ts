import {Routes} from '@angular/router';

export const guestModeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./guest-mode').then(m => m.GuestMode)
  }
]
