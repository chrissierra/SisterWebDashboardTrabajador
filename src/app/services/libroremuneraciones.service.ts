import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';

@Injectable()
export class LibroremuneracionesService {

  constructor(private http: HttpClient, private rutasService_: RutasservidorService) { }

    GetLibroDiario(data) {
		return this.http.post(this.rutasService_.rutas['libroremuneraciondiario'], JSON.stringify(data));     
 	} // Fin funcion login

 	  GetLibroMensual(data) {
		return this.http.post(this.rutasService_.rutas['libroremuneracionmensual'], JSON.stringify(data));     
 	} // Fin funcion login

}
