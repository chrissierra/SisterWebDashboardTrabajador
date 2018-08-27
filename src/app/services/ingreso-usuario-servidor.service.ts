import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';

@Injectable()
export class IngresoUsuarioServidorService {

  constructor(public http: HttpClient, private rutasService_: RutasservidorService) { }


 insertar_usuario_datos_generales(data) {

    return this.http.post(this.rutasService_.rutas['ingreso_empleados_datos_basicos'] , JSON.stringify(data)).subscribe(a => {



    });
 } // Fin funcion insertar_usuario_datos_generales

 insertar_turno(data) {
  return this.http.post(this.rutasService_.rutas['InsertTurnoVariable'] , JSON.stringify(data)).subscribe(a => {
    });
 } // Fin función insertar_turno


actualizar_turnos(data, id, mes) {
console.log(this.rutasService_.rutas['ActualizarTurnos'] )

data['id'] = id;
data['mes'] = mes;

  return this.http.post( this.rutasService_.rutas['ActualizarTurnos'] , JSON.stringify(data) );
}


liberar_turno(data, id, mes) {
data['id'] = id;
data['mes'] = mes;

  return this.http.post( this.rutasService_.rutas['LiberarDefinitivoTurnos'] , JSON.stringify(data) );	
}

}
