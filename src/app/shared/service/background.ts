import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  backgroundImage = signal<string | null>(null);

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    const saved = localStorage.getItem('selected_gradient');
    if (saved) {
      this.backgroundImage.set(saved);
      this.applyBackground(saved);
    }
  }

  setBackground(imageUrl: string) {
    localStorage.setItem('selected_gradient', imageUrl);
    this.backgroundImage.set(imageUrl);
    this.applyBackground(imageUrl);
  }

  private applyBackground(imageUrl: string) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
  }
}
