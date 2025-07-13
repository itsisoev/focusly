import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TuiButton} from '@taiga-ui/core';

@Component({
  selector: 'features-guest-mode',
  imports: [
    TuiButton
  ],
  templateUrl: './guest-mode.html',
  styleUrl: './guest-mode.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestMode {

}
