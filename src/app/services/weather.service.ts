import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.openWeatherMapApiKey;
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }
  

  getWeatherByCoords(lat: number, lon: number) {
    return this.http.get(
      `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
  }

  getWeatherByCity(city: string) {
    return this.http.get(
      `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }
}
