import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { GuardarSucursalService } from '../../../services/guardar-sucursal.service';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { ComprobanteService } from '../../../services/comprobante.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';

@Component({
  selector: 'Marcaje-app-sister-paso2-turno-extra',
  templateUrl: './paso2-turno-extra.component.html',
  styleUrls: ['./paso2-turno-extra.component.css']
})
export class Paso2TurnoExtraComponent implements OnInit {
	public loading:any = false;
	public coeficiente:any;
	public aviso:any;
	public id:any;
	public datosTrabajador:any;
	public url:any;
	public movimiento:any;
	public sucursal:any;
	public idTrabajador:any;
	public ArrayDatosTrabajadorMarcaje:any;
  constructor(  public ComprobanteService_: ComprobanteService,
  				private MensajesSwalService_: MensajesSwalService,
  				public GeolocalizacionService_: GeolocalizacionService,
  				private GuardarSucursalService_: GuardarSucursalService,
  				private store: Store<AppState>,
  				public MarcajeService_:MarcajeServiceService,
  				public http: HttpClient,
  				private param: ActivatedRoute,
  			    private router : Router) { 

  	this.getFromState();

	this.GeolocalizacionService_.getLocacion()
	this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
	this.SetearAviso();
	this.GetMovimiento();
	this.SetId();  	

  }

  ngOnInit() {
  }



  getFromState(){
  	  	this.store.select('marcaje')
      .subscribe( marcaje  => {       
        this.url = marcaje.url['urlImagen'];
        this.coeficiente=marcaje.Coeficiente;
        this.sucursal = marcaje.Sucursal;
        this.idTrabajador = marcaje.id;
        console.log("nombre_empresa", marcaje.nombre_empresa);
      });
  }



		  swalSucursal(){

				this.MensajesSwalService_.mensajeStandar({
														titulo:'No hay sucursal',
														texto:'Debes seleccionar una sucursal.',
														tipo:'error',
														boton:'Ok'
														});


		} // Fin swalSucursal


		SetId(){
			this.GeolocalizacionService_.getLocacion();
			this.id = {
						'id': this.idTrabajador,
						'movimiento': this.movimiento,
						'url': this.url,
						'Sucursal': this.sucursal,
						'locacion': this.GeolocalizacionService_.locacion,
						'biometrica':this.coeficiente
						
					  };	
		} // Fin SetId



		GetMovimiento(){
			this.MarcajeService_.verificarUltimoMovimientoTurnosExtras(JSON.stringify({'id': this.idTrabajador}))
			.subscribe( data => {
				console.log("Getmovimiento", data);
				if(data === 'Listo'){
					this.aviso = "Todos los turnos del día están correctamente marcados."
				}
				
				this.movimiento = data;
			} );
		} // Fin GetMovimiento



		marcar_movimiento(mov){
				this.loading = true;
				this.SetId();
				this.getFromState();
				if(this.sucursal === undefined) return this.swalSucursal();
			  				  	
			  	this.getFromState();
			  	this.SetId();
			  	// Sin turnos generados... api/VerificarUltimoMovimiento
			  	this.MarcajeService_.realizarMarcajeTurnosExtras(this.id)
			  	 .subscribe( (data: any[]) => {

			  	 	this.ArrayDatosTrabajadorMarcaje = data;


			  	}, (error) => {

			  	}, () => {

			  		this.loading = false,
			  		this.MarcajeRealizado();
			  	} )
			  
		}//Fin Marcar_movimiento



		MarcajeRealizado(){

				
				this.MensajesSwalService_.mensajeStandar({
														titulo:'Marcaje Realizado',
														texto:'El marcaje fue realizado con éxito',
														tipo:'success',
														boton:'Ok'
														});


				let d = new Date()
				
				this.ComprobanteService_.comprobante(this.movimiento, d.getDate() + '/'+(d.getMonth()+1) + '/'+d.getFullYear(), d.getHours() +':'+ d.getMinutes(), this.sucursal, this.datosTrabajador['rut'], this.ArrayDatosTrabajadorMarcaje )
				this.router.navigate(['./ProcesoMarcajeSucursal/']);

			

		} // Fin MarcajeRealizado

 SetearAviso(){
  		if(this.coeficiente < 0.61){
	  		this.aviso="";
	  	}else{
	  		this.aviso="La validación fue incorrecta. Deberás seguir el protocolo de la empresa para marcajes dudosos."
	  	}
  } // Fin SetearAviso






}
