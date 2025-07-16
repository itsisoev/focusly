import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {TuiButton, TuiScrollbar} from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GradientsService } from '../../shared/service/gradients';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UcBack } from '../../shared/components/uc-back/uc-back';
import {BackgroundService} from '../../shared/service/background';


@Component({
  selector: 'features-guest-mode',
  imports: [
    TuiButton,
    FormsModule,
    UcBack,
    TuiScrollbar,
  ],
  templateUrl: './guest-mode.html',
  styleUrl: './guest-mode.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestMode implements OnInit {
  private readonly router = inject(Router);
  private readonly gradientService = inject(GradientsService);
  private readonly backgroundService = inject(BackgroundService);
  private readonly destroyRef = inject(DestroyRef);

  firstName = signal<string>("");
  gradientImages = signal<{ url: string; title: string; urlWallpaper: string }[]>([]);
  currentStep = signal<number>(1);
  selectedGradient = signal<string | null>(null);

  get isNameInvalid(): boolean {
    return this.firstName().trim() === '';
  }

  ngOnInit() {
    this.getGradientImages();

    const currentBg = this.backgroundService.backgroundImage();
    if (currentBg) {
      this.selectedGradient.set(currentBg);
    }
  }

  startGuestMode() {
    localStorage.setItem('guest_user', JSON.stringify({
      first_name: this.firstName(),
    }));
    this.router.navigate(['/']);
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

  goToStep(step: number) {
    this.currentStep.set(step);
  }

  goBack() {
    const current = this.currentStep();
    if (current > 1) {
      this.currentStep.set(current - 1);
    }
  }
}
