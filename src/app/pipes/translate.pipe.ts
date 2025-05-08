import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'translate',
  pure: false // Set to false to re-evaluate the pipe when the input changes
})
export class TranslatePipe implements PipeTransform {
constructor(private i18nService: I18nService) { }
  transform(key:string): string {
    return this.i18nService.translation(key);
  }

}
