import {Routes} from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home)
  }
]
