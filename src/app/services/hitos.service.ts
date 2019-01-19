import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class HitosService {

  constructor(	public http: HttpClient, 
  				private rutasService_: RutasservidorService) { }


  ingresarHito(data){
	return this.http.post(this.rutasService_.rutas['ingresarHitos'], JSON.stringify(data));  
  }


    visualizarHito(data){
  	return this.http.post(this.rutasService_.rutas['VisualizarHitos'], JSON.stringify(data));  
  }




}
