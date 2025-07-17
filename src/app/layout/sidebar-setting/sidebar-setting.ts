import {ChangeDetectionStrategy, Component, input, model} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiButtonClose} from '@taiga-ui/kit';

@Component({
  selector: 'layout-sidebar-setting',
  imports: [
    TuiButton,
    TuiButtonClose
  ],
  templateUrl: './sidebar-setting.html',
  styleUrl: './sidebar-setting.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarSetting {
  openSidebar = model(false);

  close() {
    this.openSidebar.set(false);
  }
}
