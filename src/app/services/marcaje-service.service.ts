import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class MarcajeServiceService {

  constructor(private http: HttpClient, private rutasService_: RutasservidorService) { }


situacion_marcaje(id) {

  return this.http.post(this.rutasService_.rutas['SituacionMarcaje'], id);

}


realizarMarcaje(id) {

  return this.http.post(this.rutasService_.rutas['MarcarMovimiento'], id);

}

}
