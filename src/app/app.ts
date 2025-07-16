import {TuiRoot} from "@taiga-ui/core";
import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgStyle} from '@angular/common';
import {Header} from './layout/header/header';
import {Footer} from './layout/footer/footer';
import {filter} from 'rxjs';
import {BackgroundService} from './shared/service/background';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, NgStyle, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly backgroundService = inject(BackgroundService);

  showHeader = signal<boolean>(true);
  imgBackground = signal<string>('');

  get backgroundImage() {
    return this.backgroundService.backgroundImage;
  }

  ngOnInit() {
    this.loadBackgroundFromStorage();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }

      const data = route.snapshot.data;
      this.showHeader.set(data?.['showHeader'] !== false);
    });
  }

  private loadBackgroundFromStorage() {
    const imagePath = localStorage.getItem('selected_gradient');
    if (imagePath) {
      this.imgBackground.set(imagePath);
    }
  }
}


