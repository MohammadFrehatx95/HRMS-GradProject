import { Pipe, PipeTransform, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { TRANSLATIONS } from '../i18n/translations';

@Pipe({
  name: 't',
  standalone: true,
  pure: false, // لازم يكون impure حتى يتحدث لما تتغير اللغة
})
export class TranslatePipe implements PipeTransform {
  private settings = inject(SettingsService);

  transform(key: string): string {
    const lang = this.settings.language;
    const entry = TRANSLATIONS[key];
    if (entry) {
      return entry[lang] || entry['en'] || key;
    }
    return key;
  }
}
