import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class MandantesService {

  constructor(	 private http: HttpClient,
  				 private rutasService_: RutasservidorService) { }


  

    getMandante(data){
  	return this.http.post(this.rutasService_.rutas['getMandante'], JSON.stringify(data));  
  }


 

}
