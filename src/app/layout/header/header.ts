import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {QuoteService} from '../../shared/service/quote';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {IQuote} from '../../shared/models/quote.model';

@Component({
  selector: 'layout-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnInit {
  private readonly quoteService = inject(QuoteService);
  private readonly destroyRef = inject(DestroyRef);

  quote = signal<IQuote>({
    q: "Opportunities don't happen. You create them.",
    a: "",
    h: ""
  });

  ngOnInit() {
    this.getQuote();
  }

  getQuote(): void {
    this.quoteService.getMotivation().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (res) => {
        this.quote.set(res);
      },
      error: () => {
        this.quote.set({
          q: "Opportunities don't happen. You create them.",
          a: "",
          h: ""
        });
      }
    })
  }
}
