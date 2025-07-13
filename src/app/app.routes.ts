import {Routes} from '@angular/router';
import {guestModeGuard} from './core/guards/guest-mode-guard';

export const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./features/guest-mode/guest-mode.routes').then(m => m.guestModeRoutes)
  },
  {
    canActivate: [guestModeGuard],
    path: '',
    children: []
  }
];
