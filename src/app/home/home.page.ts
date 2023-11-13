import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  weatherData : any ;
  constructor(private weatherService: WeatherService, private dataService:DataService) {
    // this.getWeatherData();
  }

  ngOnInit() {
    this.getData()
  }

 
  // getWeatherData() {
  //   this.weatherService.getAllWeatherData().subscribe(data => {
  //     this.weatherData = data; // API yanıtından gelen verileri weatherData dizisine atadık
  //   });
  // }

  getWeatherByCor(lat: any, lon: any) {
    this.weatherService.getWeatherByCoords(lat, lon).subscribe((data: any) =>  {
      this.weatherData = data;
      console.log(data)
    })
  }

  getData() {
    this.dataService.getData().subscribe((data: any) => {
      console.log(data)
      const lat = data.address.coordinate.lat;
      console.log(lat)
      const lon = data.address.coordinate.lon;

      this.getWeatherByCor(lat,lon);
    })
  }
   



}
