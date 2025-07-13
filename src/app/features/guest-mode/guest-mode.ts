import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'features-guest-mode',
  imports: [
    TuiButton,
    FormsModule
  ],
  templateUrl: './guest-mode.html',
  styleUrl: './guest-mode.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestMode {
  private readonly router = inject(Router)

  firstName = signal<string>("");

  startGuestMode() {
    localStorage.setItem('guest_user', JSON.stringify({
      first_name: this.firstName(),
    }));
    this.router.navigate(['/']);
  }
}
