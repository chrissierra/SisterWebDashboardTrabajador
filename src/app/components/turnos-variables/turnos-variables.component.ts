import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from './../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LiberarTurnosService } from './../../services/liberar-turnos.service';
import { IngresoUsuarioServidorService } from './../../services/ingreso-usuario-servidor.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../marcaje.actions';
import { AppState } from './../../app.reducers';
import { MensajesSwalService } from './../../services/mensajes-swal.service';
@Component({
  selector: 'app-turnos-variables',
  templateUrl: './turnos-variables.component.html',
  styleUrls: ['./turnos-variables.component.css']
})
export class TurnosVariablesComponent  {
  id: any;
  datos_para_generar_formulario: any;
  llaves_datos_para_generar_formulario: any;
  mesNG: any;
  anioNG: any;
  forma: FormGroup;
  mes:any;
  anio:any;
  constructor(private MensajesSwalService_: MensajesSwalService,
  			  private perfilServicio_: PerfilTrabajadorServiceService,
              private param: ActivatedRoute,
		      private store: Store<AppState>,
              private router: Router,
              public liberarTurnosService: LiberarTurnosService,
              public servicio_: IngresoUsuarioServidorService) {

  this.getState();
                }// Fin Constructor



				getState(){
					this.store.select('marcaje')
				      .subscribe( marcaje  => {       
				       this.id = marcaje.id;
				    	
				      });
				} // Fin getState

            guardar(forma) {}
            Actualizar(forma) {}

			ActualizarFecha(){
				 this.liberarTurnosService.liberar_turnos_servidor(this.mesNG,
                                                    this.anioNG,
                                                    this.id).subscribe( (data:any[]) => {

								console.log(data)
								console.log(data[0].liberado)                                                    	
						if(data.length === 0 || data[0].liberado === null){

							this.MensajesSwalService_.mensajeStandar({
								titulo: 'Este Mes no tiene Turno',
								texto: 'Debes seleccionar un mes que tenga turno o esperar que tu empleador lo genere.',
								tipo: 'error',
								boton:'ok'
							})
						}else{


	                              this.mes = this.mesNG;
	                              this.anio = this.anioNG;
							      this.datos_para_generar_formulario = data[0];

							      const llaves = Object.keys(data[0]);
							      const datos = Object.values(data[0]);

							      this.datos_para_generar_formulario = datos;
							      this.llaves_datos_para_generar_formulario = llaves;
						      }

						});
			}
} // Fin Clase
