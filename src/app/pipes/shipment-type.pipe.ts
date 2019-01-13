import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ShipmentType'})
export class ShipmentTypePipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return 'Courier';
    } else if (value === 1) {
      return 'Cash on delivery';
    } else {
      return 'Personal';
    }
  }
}
