import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class LoginservicesService {

  constructor(private http: HttpClient, private rutasService_: RutasservidorService) { }

  	loginTrabajador(data) {
		return this.http.post(this.rutasService_.rutas['loginTrabajador'], JSON.stringify(data));     
 	} // Fin funcion login


 	sucursalLogueo(data) {
		return this.http.post(this.rutasService_.rutas['loginSucursal'], JSON.stringify(data));     
 	} // Fin funcion login

}
