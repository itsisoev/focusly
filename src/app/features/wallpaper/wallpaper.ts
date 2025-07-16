import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {TuiButton, TuiScrollbar} from '@taiga-ui/core';
import {GradientsService} from '../../shared/service/gradients';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BackgroundService} from '../../shared/service/background';

@Component({
  selector: 'features-wallpaper',
  imports: [
    TuiScrollbar
  ],
  templateUrl: './wallpaper.html',
  styleUrl: './wallpaper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Wallpaper implements OnInit {
  private readonly gradientService = inject(GradientsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly backgroundService = inject(BackgroundService);

  gradientImages = signal<{ url: string; title: string; urlWallpaper: string }[]>([]);
  selectedGradient = signal<string | null>(null);

  ngOnInit() {
    this.getGradientImages();
  }

  getGradientImages() {
    this.gradientService.fetchGradientImages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.gradientImages.set(res);
      });
  }

  selectGradient(url: string) {
    this.selectedGradient.set(url);
    this.backgroundService.setBackground(url);
  }
}
