import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
// step 1: inject the httpclient in the constructor
  constructor(private httpclient:HttpClient) {
    const lang = localStorage.getItem('lang') as 'en' | 'ar' || 'en'; 
    this.loadTranslations(lang)
  }

  // step2:define our properties
  private lang$ = new BehaviorSubject<'en' | 'ar'>('en');
  private translations: { [key: string]: any } = {};

  // step3: define the methods
  loadTranslations(lang: 'en' | 'ar') {
    this.httpclient.get<{ [key: string]: any } >(`assets/i18n/${lang}.json`).subscribe((data) => {
    localStorage.setItem('lang', lang);
      this.translations = data;
      this.lang$.next(lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    });
  }
  get Translation(){
    return this.lang$.asObservable();
  }
set Lang(lang: 'en' | 'ar') {
    this.lang$.next(lang);  
  }
  translation(key: string): string {
    const keys = key.split('.');
    let translation = this.translations;
    for(let i = 0; i < keys.length; i++) {
      if (translation[keys[i]] !== undefined) {
        translation = translation[keys[i]];
      } else {
        return key;
      }
    }
    return typeof translation=== 'string' ? translation : key;

  }
     
}

