import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class SueldosService {
// tslint:disable
  constructor(private http: HttpClient, private rutasService_: RutasservidorService) { }

 mesReal: any;
 anioReal: any;

  getComisionAfp(afp) {
       return this.http.get(this.rutasService_.rutas['ComisionAfp'] + afp);
  }

    getDiasTrabajados(id, mes, anio) {
        this.getFechas(mes, anio);
        return this.http.get(this.rutasService_.rutas['DiasLaboralesRealizados'] + id + '/' + this.mesReal + '/' + this.anioReal);
  }

  getDiasCalendarizados(id, mes, anio) {
    this.getFechas(mes, anio);
    return this.http.get(this.rutasService_.rutas['DiasLaboralesCalendarizados'] + id + '/' + this.mesReal + '/' + this.anioReal);
  
}

getDiasCalendarizadosFijos(id){
  return this.http.post(this.rutasService_.rutas['GetAsistenciaMesAnterior'], {'id': id});
}

getFechas(mes, anio) {
        switch (mes) {
          case 0:
            this.mesReal = 12;
            this.anioReal   = anio - 1;
            break;
        
          default:
            this.mesReal = mes;
            this.anioReal = anio;
            break;
        }
}

InsertSueldo(data){
  return this.http.post(this.rutasService_.rutas["LiberarSueldo"], JSON.stringify(data));
}



ConfirmacionSueldoLiberado(data){
  return this.http.post(this.rutasService_.rutas["ConfirmarEstadoSueldo"], JSON.stringify(data));
}


getSueldosLiberados(data){
  return this.http.post(this.rutasService_.rutas["SueldosLiberados"], data);
}


getSueldosLiberadosPorFecha(data){
  return this.http.post(this.rutasService_.rutas["SueldosLiberadosPorFecha"], data);
}

}
