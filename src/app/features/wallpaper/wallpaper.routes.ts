import {Routes} from '@angular/router';

export const wallpaperRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./wallpaper').then(m => m.Wallpaper)
  }
]
