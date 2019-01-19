import { Component } from '@angular/core';
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
var movimiento, letra, hora;
@Component({
  selector: 'app-paso2',
  templateUrl: './paso2s.component.html',
  styleUrls: ['./paso2s.component.css']
})
export class Paso2sComponent  {
	public loading:any = true;
	public coeficiente:any;
	public aviso:any;
	public id:any;
	public datosTrabajador:any;
	public url:any;
	public movimiento:any;
	public sucursal:any;
	public idTrabajador:any;
	public hora_esperada:any;
	public nombre_trabajador:any;
	public conjuntoSituacionMarcaje:any;
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
        this.idTrabajador = marcaje.id;
      });

      //alert(this.idTrabajador)


	this.GeolocalizacionService_.getLocacion()
	this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
	this.SetearAviso();
	this.GetsituacionMarcaje();
	
	

  } // Fin Constructor


private GetsituacionMarcaje(){
	this.MarcajeService_.situacion_marcaje(JSON.stringify({id:this.idTrabajador}))
	.subscribe(data => {
		//console.log(data['Entrada'])
		this.conjuntoSituacionMarcaje = data
		}, (error) => {
			
		}, () => {
			// Todo esto continuaba luego de llamar la función desde el constructor. Ahora continua en complete de subscribe
			this.GetMovimiento();
			this.SetId();  

			setTimeout( () => {
				this.loading = false;
			}, 2500 )	
		});
}

marcar_movimiento(mov){

	this.loading = true;
		this.SetId();
		this.getFromState();
		console.log("this.sucursal,", this.sucursal)
		if(this.sucursal === undefined) return this.swalSucursal();

		this.MarcajeService_.situacion_marcaje(JSON.stringify({id:this.idTrabajador})).subscribe( data => {
  			
  			if(data['TipoTurno'] === 'Noches'  && data['TurnoYaRealizado'] === 1) return this.marcar_movimiento_noches(data);
	  		if(data['TurnoYaRealizado'] === 1){
	  			
	  			this.getFromState();
	  			this.SetId();
			 
	  			// Turnos ya generados...
	  				this.MarcajeService_.realizarMarcaje(this.id)
			  			.subscribe( (data:any[]) => {
							  console.log(this.id)
							  console.log(data['id'])
							  if(data['id'] !== undefined) this.GeneracionComprobante(data)

			  			}, (error) => {

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

					if(data['id'] !== undefined) this.GeneracionComprobante(data)

	  			}, (error) => {

			  			}, ()=> {
			  				this.loading = false,
			  				this.MarcajeRealizado();
			  			})
	  		}
	  	});
}//Fin Marcar_movimiento

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
					console.log("data['id']", data['id'])
					if(data['id'] !== undefined){
						this.GeneracionComprobante(data)
					}
		//console.log(data)
		//this.MarcajeRealizado(data);
	}, (error) => {
				this.MensajesSwalService_.mensajeStandar({
												titulo:'Error en marcaje',
												texto:'Debes estar marcando sin tener un turno asignado. Intenta marcar un turno extra siempre que tu empleador lo apruebe.',
												tipo:'error',
												boton:'Ok'
												});
				this.router.navigate(['./ProcesoMarcajeSucursal/']);
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
		this.router.navigate(['./ProcesoMarcajeSucursal/']);

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
				'id': this.idTrabajador,
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
        this.nombre_trabajador = marcaje.nombre_trabajador;
      });
} // Fin getFromState



GetMovimiento(){

	this.getFromState();
	console.log(this.conjuntoSituacionMarcaje)
	console.log("this.conjuntoSituacionMarcaje['Entrada']", this.conjuntoSituacionMarcaje['Entrada'])
	console.log("this.conjuntoSituacionMarcaje['Salida']", this.conjuntoSituacionMarcaje['Salida'])
	this.MarcajeService_.verificarUltimoMovimiento(JSON.stringify({'id': this.idTrabajador}))
	.subscribe( data => {
		console.log("Getmovimiento", data);
		if(data === 'Listo' && this.conjuntoSituacionMarcaje['Entrada']!==0 && this.conjuntoSituacionMarcaje['Salida'] !== 0){
			let d = new Date();
			console.log("this.conjuntoSituacionMarcaje", this.conjuntoSituacionMarcaje)
			const fecha = d.getDate() + '/'+(d.getMonth()+1) + '/'+d.getFullYear();
			this.aviso = ` Hoy ${fecha}, todos los turnos de ${this.nombre_trabajador} han sido marcados.
			Entrada a las ${this.conjuntoSituacionMarcaje['Entrada']} y la salida a las ${this.conjuntoSituacionMarcaje['Salida']}
			`
			//"Todos los turnos del día están correctamente marcados."
		}

		
		
		this.movimiento = data;
	} );
} // Fin GetMovimiento


	private GeneracionComprobante(data){
		let d = new Date();
		this.ComprobanteService_.comprobante(this.movimiento, d.getDate() + '/'+(d.getMonth()+1) + '/'+d.getFullYear(), d.getHours() +':'+ d.getMinutes(), this.sucursal, this.datosTrabajador['rut'],  data );
	}

  SetearAviso(){
  		if(this.coeficiente < 0.61){
	  		this.aviso="";
	  	}else{
	  		this.aviso="La validación fue incorrecta. Deberás seguir el protocolo de la empresa para marcajes dudosos."
	  	}
  } // Fin SetearAviso


}
