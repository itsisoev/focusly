import {ChangeDetectionStrategy, Component, output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiChevron, TuiDataListWrapperComponent, TuiSelectDirective} from '@taiga-ui/kit';
import {TuiTextfieldComponent, TuiTextfieldDropdownDirective} from '@taiga-ui/core';
import {TimerMode} from '../../../../shared/emun/timer';

@Component({
  selector: 'features-focus-setting',
  imports: [
    ReactiveFormsModule,
    TuiChevron,
    TuiDataListWrapperComponent,
    TuiSelectDirective,
    TuiTextfieldComponent,
    TuiTextfieldDropdownDirective,
    FormsModule
  ],
  templateUrl: './focus-setting.html',
  styleUrl: './focus-setting.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FocusSetting {
  modeSelected = output<TimerMode>();

  readonly mode = signal<string[]>([
    'Pomodoro',
    'Countdown',
    'Stopwatch',
    'Animedoro',
  ]);
  selected = signal<TimerMode>(TimerMode.Pomodoro);

  onSelect(value: TimerMode) {
    this.selected.set(value);
    this.modeSelected.emit(value);
  }
}
