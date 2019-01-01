import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class GuardarSucursalService {

  constructor(public http: HttpClient, private rutasService_: RutasservidorService) { }


  guardar_sucursal_servidor(data){
  	return this.http.post(this.rutasService_.rutas['GuardarSucursal'], data);
  }


    get_sucursales_servidor(data){
  	return this.http.post(this.rutasService_.rutas['get_sucursales'], data);
  }

}
