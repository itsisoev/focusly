import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'uc-timer',
  imports: [],
  templateUrl: './uc-timer.html',
  styleUrl: './uc-timer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UcTimer {
  time = input();
}
