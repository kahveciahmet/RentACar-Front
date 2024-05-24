import { Component } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent {
  colors:Color[] = [];
  dataLoaded = false;

  constructor(private colorService:ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }
}
