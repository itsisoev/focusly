import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {UcClock} from '../../shared/components/uc-clock/uc-clock';

@Component({
  selector: 'features-home',
  imports: [
    UcClock
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  currentTime = signal<string>('');
  motivationalQuote = signal<string>('Making great progress this Tuesday!');


  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60 * 1000);
  }

  updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime.set(`${hours}:${minutes}`);
  }
}
