import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class LiberarTurnosService {

  constructor(public http: HttpClient, private rutasService_: RutasservidorService) { }



  liberar_turnos_servidor(mes, anio, id) {
    return this.http.get(this.rutasService_.rutas['LiberarTurnos'] + mes + '/' + anio + '/' + id);
  }

}
