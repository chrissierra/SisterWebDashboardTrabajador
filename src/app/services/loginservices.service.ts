import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class LoginservicesService {

  constructor(private http: HttpClient, private rutasService_: RutasservidorService) { }

  	login(data) {
		return this.http.post(this.rutasService_.rutas['login'], JSON.stringify(data));     
 	} // Fin funcion login

}
