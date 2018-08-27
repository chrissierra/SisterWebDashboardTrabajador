import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'nombreDelDiaDelMes',
  pure: false
})
export class NombreDelDiaDelMesPipe implements PipeTransform {
  array_dias: string[] = [
    'Lunes',  'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
    ];


  transform(value: any, mes: any, anio: any): any {

    return this.dia_de_la_semana(anio, mes, value);

  }

  dia_de_la_semana(anio, mes, dia) {

    const fecha = new Date(anio + ',' + mes + ',' + dia);

    const weekday = fecha.getDay();


      if (weekday == 0) {
      return this.array_dias[( 6 )];
      } else {
        return this.array_dias[( weekday - 1 )];
      }

  } // Fin funcion dia_de_la_semana


}
