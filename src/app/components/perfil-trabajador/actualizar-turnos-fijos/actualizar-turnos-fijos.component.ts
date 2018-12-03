import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { NgForm } from '@angular/forms';
import { IngresoUsuarioServidorService } from '../../../services/ingreso-usuario-servidor.service';
import { MensajesSwalService, TipoMensaje } from '../../../services/mensajes-swal.service';
@Component({
  selector: 'app-actualizar-turnos-fijos',
  templateUrl: './actualizar-turnos-fijos.component.html'
})
export class ActualizarTurnosFijosComponent implements OnInit {

	public dias: any;
	public trabajador_id:any;
  public datosTurnosFijoValuesImpar:any;
  public datosTurnosFijoValuesPar:any;

  constructor(private IngresoUsuarioServidorService_:IngresoUsuarioServidorService,
  			      private snackBar: MatSnackBar, 
              private perfilServicio_ : PerfilTrabajadorServiceService, 
              private MarcajeServiceService: MarcajeServiceService,
              private param: ActivatedRoute, 
              private router : Router,
              private mensajesSwal:MensajesSwalService) { 
    
  	this.dias = this.perfilServicio_.array_dias;
    this.trabajador_id = this.param.parent.snapshot.paramMap.get('id');
    this.IngresoUsuarioServidorService_.getTurnosFijos({'trabajador_id': this.trabajador_id})
    .subscribe( datos => {
      let contador = 0;
      let arrayImpar = new Array();
      let arrayPar = new Array();
      let keys =  Object.values( datos[0] ).map( i => {
        if(contador == 0 || contador == 15){
         
        }else{
          if(this.oddOrEven(contador) == 1){
              arrayImpar.push(i)
            }else{
              arrayPar.push(i)
            }
        }
       
        contador++;

      });


      this.datosTurnosFijoValuesImpar = arrayImpar;
      this.datosTurnosFijoValuesPar =  arrayPar;
      console.log("arrayImpar", arrayImpar)



    } )

  }

public oddOrEven(x) {
  return ( x & 1 ) ? 1 : 2;
}

  ngOnInit() {
  }


	guardar(forma: NgForm){
		console.log(forma.value)
		this.IngresoUsuarioServidorService_.actualizar_turno_fijo(forma.value)
		.subscribe( data => {
      this.mensajesSwal.mensajeStandar({
        titulo: 'Turno Actualizado',
        texto: 'El turno se actualizó exitosamente. Debes recordar que es con acuerdo mutuo de tu trabajador',
        tipo: 'success',
        boton: 'ok',
      });

      this.router.navigate(['../PerfilTrabajador/'+this.param.parent.snapshot.paramMap.get('id')+'/Perfil']);


		}, error => {
			//console.error(error + "ERROR")
		} )
	} // Fin función guardar





}

