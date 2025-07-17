import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SidebarSetting} from '../sidebar-setting/sidebar-setting';

@Component({
  selector: 'layout-footer',
  imports: [
    RouterLink,
    RouterLinkActive,
    SidebarSetting
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  openSidebar = signal<boolean>(false);

  toggleOpenSidebar() {
    this.openSidebar.set(!this.openSidebar());
  }

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
