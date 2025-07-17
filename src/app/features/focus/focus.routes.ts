import {Routes} from '@angular/router';

export const focusRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./focus').then(m => m.Focus)
  }
]
