import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private DARK_THEME_CLASS = 'dark-mode';

  constructor() { }

  toggleTheme(): void {
    const isDark = document.body.classList.toggle(this.DARK_THEME_CLASS);
  }
}
