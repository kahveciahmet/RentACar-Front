import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any[], filterText: string, property: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((item: any) => item[property].toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
