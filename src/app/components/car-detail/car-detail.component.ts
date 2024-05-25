import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car | undefined;
  dataLoaded = false;
  carImages : string[] = [];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car = response.data[0];
      this.dataLoaded = true;
    });
  }

  setCarImages() {
    if (this.car) {
      // Resim dosyalarının adlandırma formatına göre resim yollarını ayarla
      const imageCount = 3; // Her araç için kaç resim olduğunu belirtin
      for (let i = 1; i <= imageCount; i++) {
        this.carImages.push(`assets/images/cars/car-${this.car.id}-${i}.jpg`);
      }
    }
  }
}
