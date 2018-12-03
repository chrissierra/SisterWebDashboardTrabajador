import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import swal from 'sweetalert2'


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
    trabaja_dia_en_curso: any;
    entrada: any;
    salida: any;
    id: any;
    statusEntrada: any;
    statusSalida: any;
    turnoFijoSinTurno:boolean = true;
    urlImagenTrabajador:any;
    TrabajadorSinTurno:any;
    
constructor(private snackBar: MatSnackBar, 
            private perfilServicio_ : PerfilTrabajadorServiceService, 
            private MarcajeServiceService: MarcajeServiceService,
            private param: ActivatedRoute, 
            private router : Router) { 

              this.id = {
                'id':	this.param.parent.snapshot.paramMap.get('id')
                };

              this.MarcajeServiceService.situacion_marcaje( JSON.stringify(this.id) ).subscribe( data => {
                console.log("LOs datos del marcaje ", data); // => Hora de la entrada, hora de la salida. 
                console.log("tipo turno", data['TipoTurno']) // => Con esto empiezo . ***   1
                this.turnoFijoSinTurno = (data['trabajaDiaEnCurso'] == 0) ? true : false;
                this.TrabajadorSinTurno = (data['TurnoYaRealizado'] ==  "No tiene horario") ? this.funcionNoTieneTurnos() : false;
                this.trabaja_dia_en_curso = data['trabajaDiaEnCurso'];
                this.entrada = data['Entrada'];
                this.salida = data['Salida'];
                this.statusEntrada = data['EstatusEntrada'];
                this.statusSalida = data['EstatusSalida'];
              });
    
    this.id_parent = this.param.parent.snapshot.paramMap.get('id');

    this.perfilServicio_.getTurnosSinLiberacion(this.id_parent).then(data=>{
      this.turnos_sin_liberar = data;
      console.log("turnos_sin_liberar",data);

    });

    this.perfilServicio_.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe( data => {

    this.urlImagenTrabajador =  'https://sister.cl/trabajadores/'+ data[0].rut +'/registro/'+ data[0].rut +'.jpg' ;
   	
   	this.datos_perfil_empleado = data;

   	this.boleano_boton = this.datos_perfil_empleado[0].horario_con_o_sin_turnos;

   	this.empleado_ = data[0];

   })
  
  } // FIn constructor


  funcionNoTieneTurnos(){
    this.mensajeError('Error', 'Trabajador no tiene los turnos realizados. Debes generarlos.', 'error', 'Ok' );
    return true;
  } // Fin función funcionNoTieneTurnos


   public mensajeError(titulo, texto, tipo, boton){
       swal({
          title: titulo,
          text: texto,
          type: tipo,
          confirmButtonText: boton
        })
   } // Fin funcion mensajeError



} // Fin clase.
