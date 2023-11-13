import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './../services/translation.service';
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

  constructor(
    private activatedRoute: ActivatedRoute, 
    private dataService: DataService, 
    private translate : TranslateService,
    private translation: TranslationService
    ) {
   
   }


  ngOnInit() {
    this.carUrl = this.activatedRoute.snapshot.paramMap.get('carId') as string;
    console.log(this.carUrl, 'url')
    this.getData();

    

   
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
  
  

}