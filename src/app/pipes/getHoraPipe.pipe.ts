import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getHoraPipe'
})
export class getHoraPipe implements PipeTransform {

  transform(value: any, args?: any): any {


   let hora = new Date(value).getHours();
   let minutos = new Date(value).getMinutes();

   return hora + ":" + minutos;



  }

}
