import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcajeServiceService } from './../../services/marcaje-service.service';
import { NgForm } from '@angular/forms';
import { IngresoUsuarioServidorService } from './../../services/ingreso-usuario-servidor.service';
import { MensajesSwalService, TipoMensaje } from './../../services/mensajes-swal.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../marcaje.actions';
import { AppState } from './../../app.reducers';
@Component({
  selector: 'app-turnos-trabajador',
  templateUrl: './turnos-trabajador.component.html',
  styleUrls: ['./turnos-trabajador.component.css']
})
export class TurnosTrabajadorComponent implements OnInit {

	  public dias: any;
	  public trabajador_id:any;
  	public datosTurnosFijoValuesImpar:any;
  	public datosTurnosFijoValuesPar:any;
  	public id:any;
    public BoleanoTurnosHechos:boolean=false;
  constructor(private IngresoUsuarioServidorService_:IngresoUsuarioServidorService,
  			      private store: Store<AppState>,
  			      private snackBar: MatSnackBar, 
              private perfilServicio_ : PerfilTrabajadorServiceService, 
              private MarcajeServiceService: MarcajeServiceService,
              private param: ActivatedRoute, 
              private router : Router,
              private mensajesSwal:MensajesSwalService) { 
    
  	this.dias = this.perfilServicio_.array_dias;

  	this.getState();

    this.IngresoUsuarioServidorService_.getTurnosFijos({'trabajador_id': this.id})
    .subscribe( (datos:any[]) => {

      if(datos.length === 0){
       // alert(datos.length)
      }else{

              this.BoleanoTurnosHechos =true;
              console.log(datos)
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
      }


    } )

  }

public oddOrEven(x) {
  return ( x & 1 ) ? 1 : 2;
}

  ngOnInit() {
  }


	guardar(forma: NgForm){
		
	} // Fin función guardar

		getState(){
			this.store.select('marcaje')
		      .subscribe( marcaje  => {       
		       this.id = marcaje.id;
		    	
		      });
		} // Fin getState



}

