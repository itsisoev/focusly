import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/guest-mode/guest-mode.routes').then(m => m.guestModeRoutes)
  }
];
