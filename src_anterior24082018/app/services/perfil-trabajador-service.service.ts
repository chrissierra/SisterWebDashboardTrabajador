import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class PerfilTrabajadorServiceService {

  mes_en_curso:any;
  mes_proximo:any;
  constructor(private rutas_:RutasservidorService ,private http_:HttpClient) {}

  array_dias:string[] = [
  'Lunes',  'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  getPerfil(trabajador_id){
	  return this.http_.get(this.rutas_.rutas['perfil_trabajador'] + trabajador_id);
  }  // Fin funcion getPerfil


  getStatusHorarios_por_consulta(trabajador_id, mes, anio){
	    return this.http_.get(this.rutas_.rutas['estatusTurnos'] + trabajador_id + '/' + mes + '/' +  anio);
  } // Fin funcion getStatusHorarios_por_consulta


  getStatusHorarios_mes_actual(trabajador_id){

    	let date= new Date();
    	this.http_.get(this.rutas_.rutas['estatusTurnos'] + trabajador_id + '/' + (date.getMonth()+1) + '/' +  date.getFullYear()).toPromise().then(data=>{
        this.mes_en_curso = data;
    	});  
  } // Fin funcion getStatusHorarios_mes_actual


  getStatusHorarios_mes_proximo(trabajador_id){
  			
        let date= new Date();

  			this.http_.get(this.rutas_.rutas['estatusTurnos'] + trabajador_id + '/' + (date.getMonth()+2) + '/' +  date.getFullYear()).toPromise().then(data=>{
  		    this.mes_proximo = data;
  			});

  } // Fin funcion getStatusHorarios_mes_proximo


  getTurnosSinLiberacion(trabajador_id){
       return  this.http_.get(this.rutas_.rutas['TurnosSinLiberar'] + trabajador_id).toPromise();
  }


}
