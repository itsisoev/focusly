import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {IQuote} from '../models/quote.model';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly MOTIVATION_API_URL = environment.MOTIVATION_API_URL;

  private readonly http = inject(HttpClient);

  getMotivation() {
    return this.http.get<IQuote[]>(this.MOTIVATION_API_URL).pipe(
      map(res => res[0])
    );
  }
}
