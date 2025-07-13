import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradientsService {
  private readonly http = inject(HttpClient);

  fetchGradientImages() {
    return this.http.get<{ url: string; title: string; urlWallpaper: string }[]>('assets/gradients.json');
  }
}
