import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent {

    empleado_:any;
  	datos_perfil_empleado: any;
  	id_parent: string;
    boleano_boton: any;
    turnos_sin_liberar: any;

constructor(private snackBar: MatSnackBar, 
            private perfilServicio_ : PerfilTrabajadorServiceService, 
            private param: ActivatedRoute, 
            private router : Router) { 

    const snackBarRef = snackBar.open('Message archived', 'OK', {
      duration: 3000
    });
    this.id_parent = this.param.parent.snapshot.paramMap.get('id');

    this.perfilServicio_.getTurnosSinLiberacion(this.id_parent).then(data=>{
      this.turnos_sin_liberar = data;
      console.log(data);
    });

    this.perfilServicio_.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe( data => {
   	
   	this.datos_perfil_empleado = data;

   	this.boleano_boton = this.datos_perfil_empleado[0].horario_con_o_sin_turnos;

   	this.empleado_ = data[0];

   })
  
  } // FIn constructor



} // Fin clase.
