import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entradaosalida'
})
export class EntradaosalidaPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value.length > 3) {
      return null;
    } else if (value.search('s') > -1 && value !== 'mes') {
      return 'Salida';
    } else if (value.search('e') > -1 && value !== 'mes') {
      return 'Entrada';
    } else {
      return null;
    }


  }

}
