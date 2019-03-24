import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { GuardarSucursalService } from '../../../services/guardar-sucursal.service';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
var movimiento, letra, hora;
import { ComprobanteService } from '../../../services/comprobante.service';
@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css']
})
export class Paso2Component  {
	public loading:any = false;
	public coeficiente:any;
	public aviso:any=false;
	public id:any;
	public datosTrabajador:any;
	public url:any;
	public movimiento:any;
	public sucursal:any;
	public hora_esperada:any;
	public conjuntoSituacionMarcaje:any;
	public rut:any;
  constructor(	public ComprobanteService_:ComprobanteService,
  				private MensajesSwalService_: MensajesSwalService,
  				public GeolocalizacionService_: GeolocalizacionService,
  				private GuardarSucursalService_: GuardarSucursalService,
  				private store: Store<AppState>,
  				public MarcajeService_:MarcajeServiceService,
  				public http: HttpClient,
  				private param: ActivatedRoute,
  			    private router : Router) { 

  	this.store.select('marcaje')
      .subscribe( marcaje  => {       
        this.url = marcaje.url['urlImagen'];
        this.coeficiente=marcaje.Coeficiente;
        this.sucursal = marcaje.Sucursal;
      });


	this.GeolocalizacionService_.getLocacion()
	this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
  	this.rut = this.datosTrabajador.rut;

	this.GetMovimiento();
	this.SetearAviso();
	this.SetId();  	

  

  } // Fin Constructor
	

	private envio_comprobante(data){
	    let d = new Date();
		this.ComprobanteService_.envio_comprobante(this.movimiento, d.getDate() + '/'+(d.getMonth()+1) + '/'+d.getFullYear(), d.getHours() +':'+ d.getMinutes(), this.sucursal, this.rut,  data, this.url );

	}

marcar_movimiento(mov){
	this.loading = true;
		this.SetId();
		this.getFromState();
		if(this.sucursal === undefined) return this.swalSucursal();

		this.MarcajeService_.situacion_marcaje(JSON.stringify({id:this.datosTrabajador.id})).subscribe( data => {
  			if(data['TipoTurno'] === 'Noches' && data['TurnoYaRealizado'] === 1) return this.marcar_movimiento_noches(data);
	  		if(data['TurnoYaRealizado'] === 1){
	  			//this.conjuntoSituacionMarcaje = data;
	  			this.getFromState();
	  			this.SetId();

	  			// Turnos ya generados...
	  				this.MarcajeService_.realizarMarcaje(this.id)
			  			.subscribe( data => {
			  				console.log(" Turnos ya generados...", data)
			  				if(data['id'] !== undefined){
								this.GeneracionComprobante(data)
							}

							if(data['email'] !== null) this.envio_comprobante(data)


			  			} , (error) => {

			  			}, ()=> {
			  				this.loading = false,
			  				this.MarcajeRealizado();
			  			})
	  		}else{
	  				  		

	  			this.getFromState();
	  			this.SetId();
	  			// Sin turnos generados... api/VerificarUltimoMovimiento
	  			this.MarcajeService_.realizarMarcajeSinTurnosHechos(this.id)
	  			.subscribe( data => {
			  				if(data['id'] !== undefined){
								this.GeneracionComprobante(data)
							}
							if(data['email'] !== null) this.envio_comprobante(data)

	  			}  , (error) => {

			  			}, ()=> {
			  				this.loading = false,
			  				this.MarcajeRealizado();
			  			})
	  		}
	  	});
}//Fin Marcar_movimiento



	private GeneracionComprobante(data){
		let d = new Date();
		this.ComprobanteService_.comprobante(this.movimiento, d.getDate() + '/'+(d.getMonth()+1) + '/'+d.getFullYear(), d.getHours() +':'+ d.getMinutes(), this.sucursal, this.datosTrabajador['rut_empresa'],  data );
	}



private capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

marcar_movimiento_noches(data){
	this.SetId();
	this.getFromState();
	let dia= new Date().getDate(); //alert(this.movimiento)
	movimiento = this.capitalize(this.movimiento)
	let objeto = JSON.parse( data['HorarioNoche'][0].turno );
	var result = Object.keys(objeto).map(function(key) {
					if(key.search(dia.toString()) > 0 && objeto[key] === movimiento){
						letra = (key.search('_a_') > 0) ? 'a' : 'b';
					}
				hora = objeto['hora_'+letra+'_'+dia]
				return [(key), objeto[key]];
				});
	// alert(letra); alert(hora); console.log(result)
	this.hora_esperada = hora;
	this.SetId();
	this.MarcajeService_.realizarMarcajeNoches(this.id)
	.subscribe( data => {
					if(data['id'] !== undefined){
						this.GeneracionComprobante(data)
					}
	},
	(error) => {
		this.MensajesSwalService_.mensajeStandar({
												titulo:'Error en marcaje',
												texto:'Debes estar marcando sin tener un turno asignado. Intenta marcar un turno extra siempre que tu empleador lo apruebe.',
												tipo:'error',
												boton:'Ok'
												});
			this.router.navigate(['./Home/']);
	}, ()=> {
			  				this.loading = false,
			  				this.MarcajeRealizado();
			  			})
} // Fin función marcar_movimiento_noches









MarcajeRealizado(){

	//if(data === 'EntradaRealizada' || data === 'SalidaRealizada'){
		this.MensajesSwalService_.mensajeStandar({
												titulo:'Marcaje Realizado',
												texto:'El marcaje fue realizado con éxito',
												tipo:'success',
												boton:'Ok'
												});
		this.router.navigate(['./Home/']);

	//}else{

	//}

} // Fin MarcajeRealizado



swalSucursal(){

		this.MensajesSwalService_.mensajeStandar({
												titulo:'No hay sucursal',
												texto:'Debes seleccionar una sucursal.',
												tipo:'error',
												boton:'Ok'
												});
		this.loading = false;

} // Fin swalSucursal


SetId(){
	this.GeolocalizacionService_.getLocacion();
	this.id = {
				'id': this.datosTrabajador.id,
				'movimiento': this.movimiento,
				'url': this.url,
				'Sucursal': this.sucursal,
				'locacion': this.GeolocalizacionService_.locacion,
				'biometrica':this.coeficiente,
				'hora_esperada':this.hora_esperada	
			  };	
} // Fin SetId



getFromState(){
	this.store.select('marcaje')
      .subscribe( marcaje  => {       
        this.url = marcaje.url['urlImagen'];
        this.coeficiente=marcaje.Coeficiente;
        this.sucursal = marcaje.Sucursal;
      });
} // Fin getFromState



GetMovimiento(){
	this.MarcajeService_.verificarUltimoMovimiento(JSON.stringify({'id': this.datosTrabajador.id}))
	.subscribe( data => {
		this.movimiento = data;
	}, (error) => alert(JSON.stringify(error)) );
} // Fin GetMovimiento




  SetearAviso(){
  		if(this.coeficiente < 0.61){
	  		this.aviso="";
	  	}else{
	  		this.aviso="Debes saber que no validaste tu identidad. Por lo tanto si fuera un marcaje fraudelento deberás seguir el protocolo de la empresa para marcajes falaces."
	  	}
  } // Fin SetearAviso


}
