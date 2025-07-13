import {ChangeDetectionStrategy, Component, output} from '@angular/core';

@Component({
  selector: 'uc-back',
  imports: [],
  templateUrl: './uc-back.html',
  styleUrl: './uc-back.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UcBack {
  clickBack = output();

  isClickBack() {
    this.clickBack.emit();
  };
}
