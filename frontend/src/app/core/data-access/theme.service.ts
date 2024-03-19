import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme$ = new BehaviorSubject('light');

  getThemeUpdateListener() {
    return this.theme$.asObservable();
  }

  toggleTheme() {
    localStorage.setItem(
      'dark-theme',
      !localStorage.getItem('dark-theme') ? 'true' : ''
    );
    this.setTheme();
  }

  setTheme() {
    let theme = !!localStorage.getItem('dark-theme') ? 'dark' : 'light';
    this.theme$.next(theme);
    document.body.setAttribute('data-theme', theme);
  }
}
