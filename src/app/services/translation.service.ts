import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private http: HttpClient,private translate: TranslateService ) {
  }
  getDefaultLanguage(): Observable<string> {
    return new Observable<string>((observer) => {
      let language = this.translate.getBrowserLang() || 'tr';
      this.translate.setDefaultLang(language);
      observer.next(language);
      observer.complete();
    });
  }
   
  setLanguage(setLang : string) {
    this.translate.use(setLang);
  }
  getTranslation(key: string): Observable<string> {
    return this.translate.get(key);
  }
}