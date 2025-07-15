import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'uc-clock',
  imports: [],
  templateUrl: './uc-clock.html',
  styleUrl: './uc-clock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UcClock {
  time = input();
}
