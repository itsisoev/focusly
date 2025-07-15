import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {GradientsService} from '../../core/services/gradients';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UcBack} from '../../shared/components/uc-back/uc-back';


@Component({
  selector: 'features-guest-mode',
  imports: [
    TuiButton,
    FormsModule,
    UcBack,
  ],
  templateUrl: './guest-mode.html',
  styleUrl: './guest-mode.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestMode implements OnInit {
  private readonly router = inject(Router)
  private readonly gradientService = inject(GradientsService);
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

    const savedGradient = localStorage.getItem('selected_gradient');
    if (savedGradient) {
      this.selectedGradient.set(savedGradient);
      document.body.style.backgroundImage = `url(${savedGradient})`;
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
    localStorage.setItem('selected_gradient', url);
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
