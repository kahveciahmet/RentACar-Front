import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Car } from "../../models/car";
import { CarService } from "../../services/car.service";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { CartService } from "../../services/cart.service";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, ToastrModule, FormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car | undefined;
  dataLoaded = false;
  carImages: string[] = [];
  selectedImage: string = '';
  rentDate: string = '';
  returnDate: string = '';

  private carService = inject(CarService);
  private activatedRoute = inject(ActivatedRoute);
  private toastrService = inject(ToastrService);
  private cartService = inject(CartService);
  private router = inject(Router);

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
      this.setCarImages();
    });
  }

  setCarImages() {
    if (this.car) {
      const imageCount = 3;
      for (let i = 1; i <= imageCount; i++) {
        this.carImages.push(`assets/images/cars/car-${this.car.id}-${i}.jpg`);
      }
    }
  }

  openImage(image: string) {
    this.selectedImage = image;
    const modal = document.getElementById("imageModal")!;
    modal.style.display = "block";
  }

  closeImage() {
    const modal = document.getElementById("imageModal")!;
    modal.style.display = "none";
  }

  openRentalModal() {
    const modal = document.getElementById("rentalModal")!;
    modal.style.display = "block";
  }

  closeRentalModal() {
    const modal = document.getElementById("rentalModal")!;
    modal.style.display = "none";
  }

  rentCar(carId: number, rentDate: string, returnDate: string) {
    this.router.navigate(['/payment'], { state: { carId, rentDate, returnDate } });
  }
}
