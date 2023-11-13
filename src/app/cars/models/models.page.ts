import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as mapboxgl from 'mapbox-gl';
import { Map, Marker } from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-models',
  templateUrl: './models.page.html',
  styleUrls: ['./models.page.scss'],
})
export class ModelsPage implements OnInit {
  modelUrl : string = '';
  carUrl: string = '';
  data: any;
  map : any = Map; 
  marker: any = new mapboxgl.Marker();
  constructor(  
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
   
   ) { }

  ngOnInit() {

    this.modelUrl = this.activatedRoute.snapshot.paramMap.get('modelId') as string;
    this.carUrl = this.activatedRoute.snapshot.paramMap.get('carId') as string;

    console.log(this.modelUrl, this.carUrl)
    this.getData();
    this.initMap();
  }

  initMap() {
    (mapboxgl as any).accessToken = environment.mapboxkey;

    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = '';  
    }
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 5,
    });

  }
  
  showMap() {
    this.dataService.getData().subscribe((brandsData: any) => {
      brandsData.brands.forEach((brand: any) => {
        brand.models.forEach((model: any) => {
          if (model.url === this.modelUrl) {
          console.log(model.lat, model.lon)

            this.map.setCenter([model.lon, model.lat]);

            if (this.marker) {
              this.marker.remove();
            }

            this.marker = new mapboxgl.Marker()
              .setLngLat([model.lon, model.lat])
              .addTo(this.map);
          } else {
            new mapboxgl.Marker()
              .setLngLat([model.lon, model.lat])
              .addTo(this.map);
          }
        });
      });
    });
  }


  getData() {
    this.dataService.getData().subscribe((data: any) => {
      let carData = data.brands.find(
        (car: any) => car.url === this.carUrl
      );
      console.log(carData, 'carData')
      this.data = carData.models.find(
        (model: any) => model.url === this.modelUrl
      )
      console.log(this.data); 
      this.showMap();
    })
  }

  
}