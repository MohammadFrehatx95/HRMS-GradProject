import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private _isDarkMode = signal(false);

  private _language = signal<'en' | 'ar'>('en');

  get isDarkMode() {
    return this._isDarkMode();
  }

  get language() {
    return this._language();
  }

  constructor() {
    const savedTheme = localStorage.getItem('hrms_theme');
    const savedLang = localStorage.getItem('hrms_language') as 'en' | 'ar';

    if (savedTheme === 'dark') {
      this._isDarkMode.set(true);
      this.applyTheme(true);
    }

    if (savedLang === 'ar' || savedLang === 'en') {
      this._language.set(savedLang);
      this.applyLanguage(savedLang);
    }
  }

  toggleTheme() {
    const newMode = !this._isDarkMode();
    this._isDarkMode.set(newMode);
    localStorage.setItem('hrms_theme', newMode ? 'dark' : 'light');
    this.applyTheme(newMode);
  }

  toggleLanguage() {
    const newLang = this._language() === 'en' ? 'ar' : 'en';
    this._language.set(newLang);
    localStorage.setItem('hrms_language', newLang);
    this.applyLanguage(newLang);
  }

  private applyTheme(isDark: boolean) {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light',
    );
    document.body.classList.toggle('dark-mode', isDark);
  }

  private applyLanguage(lang: 'en' | 'ar') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
