import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IngresoUsuarioServidorService } from './../../../services/ingreso-usuario-servidor.service';
  // tslint:disable:indent
    // tslint:disable:whitespace
@Component({
  selector: 'app-turnos-variables',
  templateUrl: './turnos-variables.component.html'
})
export class TurnosVariablesComponent implements OnInit {
	  hola:any[];
	  mes:any;
      anio:any;
      meses_pendienes_de_hacer_turnos:any[];
  	  datos_perfil_empleado:any;
	  id_parent:string;
      estatus_mes_actual:any;
      estatus_proximo_mes:any;
	  dias_a_mostrar:string[];
	  mes_a_mostrar:any[];
	  anio_a_mostrar:any[];
	  meses_select:any;

constructor(private perfilServicio_: PerfilTrabajadorServiceService,
	        private param: ActivatedRoute,
	        private router: Router,
	        public servicio_empleado: IngresoUsuarioServidorService) {

     this.perfilServicio_.getStatusHorarios_mes_proximo(this.param.parent.snapshot.paramMap.get('id'));

	 this.perfilServicio_.getStatusHorarios_mes_actual(this.param.parent.snapshot.paramMap.get('id'));

	 this.id_parent = this.param.parent.snapshot.paramMap.get('id');

	 this.perfilServicio_.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe( data => {

	 this.datos_perfil_empleado = data;

	 this.meses_pendiente_de_hacer_turnos();

   });

  }// Fin constructor


  ngOnInit() {

    this.estatus_mes_actual = this.perfilServicio_.mes_en_curso;

	  this.estatus_proximo_mes = this.perfilServicio_.mes_proximo;


  }// FIn funcion ngOnInit


 DiasDelMes () {

    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth();

    return new Date(anio, mes, 0).getDate();
} // Fin función DiasDelMes  ; Usada en horario mensual, para dias a mostrar.



dia_de_la_semana(anio, mes, dia){

	let fecha = new Date(anio+',' + mes +',' + dia);

	let weekday = fecha.getDay();


	  if(weekday==0){
		return this.perfilServicio_.array_dias[( 6 )]
	  }else{
	  	return this.perfilServicio_.array_dias[( weekday -1 )]
	  }

} // Fin funcion dia_de_la_semana


horario_mensual(anio, mes){

		let dias = new Date(anio, mes, 0).getDate();
		let conjunto_dias = new Array();


		for (let i = 1; i < dias + 1; i++) {
			conjunto_dias.push(this.dia_de_la_semana(anio, mes, i));
		}

		this.dias_a_mostrar = conjunto_dias;
} // Fin función horario_mensual

meses_pendiente_de_hacer_turnos(){
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth();
	let array_meses_pendientes = new Array();

	if(this.estatus_mes_actual == 0){
       array_meses_pendientes.push( (mes+1) + "/"+ anio);
	}

	if (this.estatus_proximo_mes == 0) {
	   array_meses_pendientes.push( (mes+2) + "/"+ anio);
	}

    this.meses_pendienes_de_hacer_turnos = array_meses_pendientes;

} //  Fin funcion meses_pendiente_de_hacer_turnos

hacer_turno() {

    let meses_select_array = this.meses_select.split('/');

    this.anio = meses_select_array[1];
    this.mes = meses_select_array[0];


	this.horario_mensual(meses_select_array[1], meses_select_array[0] );

} // Fin funcion hacer_turno

guardar(forma: NgForm){

	console.log(forma.value);
	this.servicio_empleado.insertar_turno((forma.value));
}


}
