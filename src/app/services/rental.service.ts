import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:7239/api/Rentals/GetAll';

  httpClient = inject(HttpClient)

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl, { withCredentials: false });
  }

  checkAvailability(carId: number, rentDate: Date, returnDate: Date): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "rentals/checkavailability?carId=" + carId + "&rentDate=" + rentDate + "&returnDate=" + returnDate;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  
  addRental(rental: Rental): Observable<ListResponseModel<Rental>> {
    return this.httpClient.post<ListResponseModel<Rental>>(this.apiUrl + "rentals/add", rental);
  }
  
}
