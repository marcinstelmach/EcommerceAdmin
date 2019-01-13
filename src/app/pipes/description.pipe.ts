import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Description'})
export class DescriptionPipe implements PipeTransform {
  transform(description: string, count: number): string {
    if (description.length <= count) {
      return description;
    }
    return description.substr(0, count) + '...';
  }
}
