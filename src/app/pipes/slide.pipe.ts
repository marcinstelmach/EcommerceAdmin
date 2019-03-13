import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Slide'})
export class SlidePipe implements PipeTransform {
  transform(status: string): string {
    if (status === '') {
      return '=> OFF';
    }
  }
}
