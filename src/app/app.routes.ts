import {Routes} from '@angular/router';
import {guestModeGuard} from './core/guards/guest-mode-guard';

export const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./features/guest-mode/guest-mode.routes').then(m => m.guestModeRoutes),
    data: {
      showHeader: false
    }
  },
  {
    canActivate: [guestModeGuard],
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes)
      },
      {
        path: 'wallpaper',
        loadChildren: () => import('./features/wallpaper/wallpaper.routes').then(m => m.wallpaperRoutes)
      }
    ]
  }
];
