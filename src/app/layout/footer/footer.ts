import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'layout-footer',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  toggleFullscreen() {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Ошибка при попытке включить полноэкранный режим: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
