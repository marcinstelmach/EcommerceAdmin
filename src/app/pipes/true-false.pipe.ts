import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'TrueFalse'})
export class TrueFalsePipe implements PipeTransform{
  transform(value: any): any {
    if (value === true) {
      return '<i class="fas fa-check true"></i>';
    }

    return '<i class="fas fa-times false"></i>';
  }

}
