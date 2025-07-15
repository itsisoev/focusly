import {TuiRoot} from "@taiga-ui/core";
import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  imgBackground = signal<string>('');

  ngOnInit() {
    this.loadBackgroundFromStorage();
  }

  private loadBackgroundFromStorage() {
    const imagePath = localStorage.getItem('selected_gradient');
    if (imagePath) {
      this.imgBackground.set(imagePath);
    }
  }
}
