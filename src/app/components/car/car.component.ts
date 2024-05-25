import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';
import { ToastrModule} from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterPipePipe,ToastrModule],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  cars: Car[] = [];
  dataLoaded = false;
  filterText:"";

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } 
      else if(params['colorId']){
        this.getCarsByColor(params['colorId']);
      }
      else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
        this.cars = response.data;
        this.dataLoaded = true;
      })
  };
  

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
        this.cars = response.data;
        this.dataLoaded = true;
      })
  };
  
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
        this.cars = response.data;
        this.dataLoaded = true;
      })
  };

  goToCarDetails(carId: number) {
    this.router.navigate(['/cars', carId]);
  }

  

  

    
}
