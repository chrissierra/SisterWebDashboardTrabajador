import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';

@Injectable()
export class IngresoUsuarioServidorService {

  constructor(public http: HttpClient, private rutasService_: RutasservidorService) { }


 insertar_usuario_datos_generales(data) {

    return this.http.post(this.rutasService_.rutas["ingreso_empleados_datos_basicos"] , JSON.stringify(data)).subscribe(a => {

    console.log("respuestaaaa",  a   );

    });
 } // Fin funcion insertar_usuario_datos_generales

 insertar_turno(data){
 	  return this.http.post(this.rutasService_.rutas["InsertTurnoVariable"] , JSON.stringify(data)).subscribe(a => {

    		console.log("respuestaaaa",  a   );

    });
 }

}
