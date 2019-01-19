import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class ViaticosService {

  constructor(	private http: HttpClient, 
  				private rutasService_: RutasservidorService) { }


  	ingresarViaticos(data) {
  		return this.http.post(this.rutasService_.rutas['InsertViaticos'], data);
	} // Fin ingresarViaticos


	GetViaticosPorTrabajador(data){
  		return this.http.post(this.rutasService_.rutas['GetViaticosPorTrabajador'], data);

	}

	GetViaticosPorEmpleador(data){
  		return this.http.post(this.rutasService_.rutas['GetViaticosPorEmpleador'], data);
		
	}

	

}
