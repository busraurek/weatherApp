import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  data: any;

  selectedLanguage: string;
  languageOptions: { code: string, name: string, flag: string }[] = [
    { code: 'tr', name: 'Türkçe', flag: 'assets/flags/tr.png' },
    { code: 'en', name: 'English', flag: 'assets/flags/en.png' },
    { code: 'de', name: 'Deutsch', flag: 'assets/flags/de.png' },
  ];
  constructor(private dataService : DataService,private translation: TranslationService ) {

    this.selectedLanguage = 'tr'; 
    this.translation.setLanguage(this.selectedLanguage);
  }
 
  ngOnInit() {
this.translation.getDefaultLanguage().subscribe((defaultLang : any)=> {
  this.translation.setLanguage(defaultLang);
  
})

    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }


changeLanguage(event: any) {
  if (this.translation && event && event.detail && event.detail.value) {
    const selectedLang = event.detail.value;
    this.translation.setLanguage(selectedLang);
    this.updateFlag(selectedLang);
  }
}
updateFlag(selectedLang: string){
  const selectedLanguage = this.languageOptions.find(lang => lang.code === selectedLang);
  if (selectedLanguage) {
    this.selectedLanguage = selectedLanguage.flag;
  }
}
}