import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  readonly title: string = 'Reddit Co-Pilot';
  pilotActive: boolean = true;
  modelsActive: boolean = false;
  aboutActive: boolean = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe((filter(event => event instanceof NavigationEnd)))
      .subscribe((event) => {
        const url: string = (event as NavigationEnd).url;
        this.changeActiveMenuItem(url);
      })
  }

  changeActiveMenuItem(route: string): void {
    this.pilotActive = this.modelsActive = this.aboutActive = false;
    switch (route) {
      case '/models': {
        this.modelsActive = true;
        break;
      }
      case '/about': {
        this.aboutActive = true;
        break;
      }
      case '/pilot':
      default: {
        this.pilotActive = true;
        break;
      }
    };
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
