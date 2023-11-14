import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  carUrl: string = '';
  data : any
  brandName: any;
  brand:  any;

  selectedLanguage: any;
  title : any;
  priceLabel: any;

  private languageChangeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private dataService: DataService, 
    private translate : TranslateService,
    private translation: TranslationService
    ) {
      this.languageChangeSubscription = this.translation.getLanguageChangeObservable().subscribe(() => {
        this.updateTranslations();
      });
   }

  ngOnInit() {
    this.carUrl = this.activatedRoute.snapshot.paramMap.get('carId') as string;
    console.log(this.carUrl, 'url')
    this.getData();
    this.updateTranslations(); 
  } 

  ngOnDestroy() {
    this.languageChangeSubscription.unsubscribe(); 
  }
  getData() {
    this.dataService.getData().subscribe((data: any) => {
      console.log('Received data:', data);
  
      if (data && data.brands) {
        this.data = data.brands.find((car: any) => car.url === this.carUrl);
        console.log('Filtered data:', this.data);
      } else {
        console.error('Invalid data structure:', data);
      }
    });

   
  }
  private updateTranslations() {
    this.translate.get('CARS_PAGE.TITLE').subscribe((title) => {
      this.title = title;
    }); }
  
}