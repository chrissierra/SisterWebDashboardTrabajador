import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDiaPipe'
})
export class getDiaPipe implements PipeTransform {

  transform(value: any, args?: any): any {

  

   let fecha = new String(value.split('/')[0].toString() + ";" +value.split('/')[1].toString()  + ";" +value.split('/')[2].toString() )
   return fecha.toString();

  /* 
value.split('/')[0] -> Dia
value.split('/')[1] -> mes
value.split('/')[2] -> anio

*/
		//	return value.split('/')[0] + "hola" + value;
  }

}
