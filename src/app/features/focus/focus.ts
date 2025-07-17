import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {UcClock} from '../../shared/components/uc-clock/uc-clock';
import {UcTimer} from '../../shared/components/uc-timer/uc-timer';
import {TuiButton} from '@taiga-ui/core';

@Component({
  selector: 'app-focus',
  imports: [
    UcTimer,
    TuiButton
  ],
  templateUrl: './focus.html',
  styleUrl: './focus.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Focus {
  mode = signal<'focus' | 'short' | 'long'>('focus');
  duration = signal(25 * 60);
  remaining = signal(this.duration());
  isRunning = signal(false);
  intervalId: any;

  get timeFormatted(): string {
    const m = Math.floor(this.remaining() / 60).toString().padStart(2, '0');
    const s = (this.remaining() % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  setMode(mode: 'focus' | 'short' | 'long') {
    this.mode.set(mode);
    const map = { focus: 25 * 60, short: 5 * 60, long: 10 * 60 };
    this.duration.set(map[mode]);
    this.remaining.set(map[mode]);
    this.isRunning.set(false);
    clearInterval(this.intervalId);
  }

  start() {
    if (this.isRunning()) return;
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      const newVal = this.remaining() - 1;
      this.remaining.set(newVal);

      if (newVal <= 0) {
        this.stop();
        if (this.mode() !== 'focus') this.setMode('focus');
      }
    }, 1000);
  }

  stop() {
    this.isRunning.set(false);
    clearInterval(this.intervalId);
  }

  reset() {
    this.stop();
    this.remaining.set(this.duration());
  }
}
