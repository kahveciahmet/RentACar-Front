import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipePipe, ToastrModule],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  dataLoaded = false;
  filterText = '';
  selectedBrandId: number | null = null;
  selectedColorId: number | null = null;

  private carService = inject(CarService);
  private brandService = inject(BrandService);
  private colorService = inject(ColorService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data.map(car => ({
        ...car,
        carImages: this.getCarImagePaths(car.id)
      }));
      this.dataLoaded = true;
    });
  }

  getCarImagePaths(carId: number): string[] {
    const imageCount = 3; // Resim sayısı
    const imagePaths = [];
    for (let i = 1; i <= imageCount; i++) {
      imagePaths.push(`assets/images/cars/car-${carId}-${i}.jpg`);
    }
    return imagePaths;
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data.map(car => ({
        ...car,
        carImages: this.getCarImagePaths(car.id)
      }));
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data.map(car => ({
        ...car,
        carImages: this.getCarImagePaths(car.id)
      }));
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  filterCars() {
    let filteredCars = this.cars;
    if (this.selectedBrandId) {
      filteredCars = filteredCars.filter(car => car.brandId === this.selectedBrandId);
    }
    if (this.selectedColorId) {
      filteredCars = filteredCars.filter(car => car.colorId === this.selectedColorId);
    }
    this.cars = filteredCars;
    this.toastr.success('Filtreleme başarılı', 'Başarılı');
  }

  goToCarDetails(carId: number) {
    this.router.navigate(['/cars', carId]);
  }
}
