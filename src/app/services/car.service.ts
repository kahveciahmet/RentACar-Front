import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  apiUrl="https://localhost:7239/api/"
  
  httpClient = inject(HttpClient);

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
