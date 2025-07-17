import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {UcTimer} from '../../shared/components/uc-timer/uc-timer';
import {TuiButton} from '@taiga-ui/core';
import {FocusSetting} from './components/focus-setting/focus-setting';
import {FocusPhase, TimerMode} from '../../shared/emun/timer';

@Component({
  selector: 'features-focus',
  imports: [
    UcTimer,
    TuiButton,
    FocusSetting
  ],
  templateUrl: './focus.html',
  styleUrl: './focus.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Focus {
  readonly defaultDurations: Record<FocusPhase, number> = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 10 * 60,
  };

  selectedTimerMode = signal<TimerMode>(TimerMode.Pomodoro);
  mode = signal<FocusPhase>(FocusPhase.Focus);
  duration = signal(this.defaultDurations['focus']);
  remaining = signal(this.duration());
  isRunning = signal(false);
  showSettings = signal(false);
  FocusPhase = FocusPhase;

  private intervalId: ReturnType<typeof setInterval> | null = null;

  get timeFormatted(): string {
    const total = this.remaining();
    const m = Math.floor(total / 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  onTimerModeSelected(mode: TimerMode) {
    this.selectedTimerMode.set(mode);
    this.stop();

    const modeDurations: Record<TimerMode, number> = {
      Pomodoro: 25 * 60,
      Countdown: 10 * 60,
      Stopwatch: 0,
      Animedoro: 40 * 60,
    };

    const duration = modeDurations[mode] ?? 25 * 60;
    this.duration.set(duration);
    this.remaining.set(duration);
    this.isRunning.set(false);
  }


  toggleSettings() {
    this.showSettings.update(v => !v);
  }

  start() {
    if (this.isRunning()) return;
    this.isRunning.set(true);

    this.intervalId = setInterval(() => {
      this.remaining.update(time => {
        if (this.selectedTimerMode() === 'Stopwatch') {
          return time + 1;
        }

        if (time <= 1) {
          this.stop();
          if (this.mode() !== 'focus') {
            this.setMode(FocusPhase.Focus);
          }
          return 0;
        }

        return time - 1;
      });
    }, 1000);
  }

  stop() {
    this.isRunning.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.remaining.set(this.duration());
  }

  setMode(mode: FocusPhase) {
    const time = this.defaultDurations[mode];
    this.mode.set(mode);
    this.duration.set(time);
    this.remaining.set(time);
    this.isRunning.set(false);
    this.stop();
  }
}
