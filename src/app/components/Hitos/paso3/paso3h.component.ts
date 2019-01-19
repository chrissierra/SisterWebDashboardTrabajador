import { Component, OnInit } from '@angular/core';
import { MandantesService } from '../../../services/mandantes.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HitosService } from '../../../services/hitos.service';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { RutasservidorService } from '../../../services/rutasservidor.service';
@Component({
  selector: 'Marcaje-app-sister-paso3',
  templateUrl: './paso3h.component.html',
  styleUrls: ['./paso3h.component.css']
})
export class Paso3HitoComponent implements OnInit {
	public Datos:any;
	public nombre_empresa:any;
	public seleccionMandante:any;
	public booleanoRespaldo:any = false;
	public selectedFile:any;
	public cargando:any;
	public url:any;
	public id:any;
	public url1:any;
	public url2:any;
	public nombre_trabajador:any;
	public mandante:any;
	public objetoHito:any;
	public loading:boolean=false;
	public booleanBotonEnviar:boolean=false;
	public comentario:any;
	public tipoHito: any;
	public latitud:any;
	public longitud:any;
  constructor(	public RutasservidorService_: RutasservidorService,
				private GeolocalizacionService_: GeolocalizacionService,
  				private HitosService_: HitosService,
  				private MensajesSwalService_: MensajesSwalService,
  				public http: HttpClient,
  				public MandantesService_: MandantesService,
  				private store: Store<AppState>,
  				private router : Router) {
  		this.GeolocalizacionService_.getLocacionToState();
  		this.getState();
  				 }

  ngOnInit() {
  }
	getState(){
			this.store.select('marcaje')
		      .subscribe( marcaje  => { 

		      	this.objetoHito = {
		      		tipo_hito: marcaje.tipo_hito,
		      		nombre_empresa: marcaje.nombre_empresa,
		      		mandante: marcaje.mandante,
		      		url: marcaje.url,
		      		url1: marcaje.url1,
		      		url2: marcaje.url2,
		      		comentario:this.comentario,
		      		nombre_trabajador:marcaje.nombre_trabajador,
		      		trabajador_id:marcaje.id,
		      		latitud:marcaje.latitud,
		      		longitud:marcaje.longitud
		      	}
		      	this.tipoHito = marcaje.tipo_hito;
		        this.id = marcaje.id;
		        this.nombre_empresa=marcaje.nombre_empresa;
		    	this.url1 = marcaje.url1;
		    	this.url2 = marcaje.url2;
		    	this.nombre_trabajador = marcaje.nombre_trabajador;
		    	this.mandante = marcaje.mandante;
		      });

		      console.log(this.objetoHito)
		} // Fin getState

	onFileChanged(event) {
		    
		    this.selectedFile = event.target.files[0];

		    const formData = new FormData();

   			formData.append('photo', this.selectedFile);
		    this.loading =true;
		    this.http.post(this.RutasservidorService_.rutas['registrohitosmandantes']+'?id='+this.id, formData, {
		        reportProgress: true,
		        observe: 'events'
		    }).subscribe(event => {

		    	this.cargando = (event['total'] === undefined) ? 1 : event['loaded'] / event['total'];	

		        const accion = new fromMarcaje.ACTUALIZARURL2Action(event['body']);
    			this.store.dispatch( accion );

    			this.url = event['body'];
		        
		      
		    }, (error) => {
		    	this.MensajesSwalService_.mensajeStandar({
												titulo:'Error en envío',
												texto:'La fotografía no pudo ser procesada. Repite la operación. Si persiste avísanos.',
												tipo:'error',
												boton:'Ok'
		    											});
		    	this.router.navigate(['./ProcesoMarcajeSucursal']);
		    }, ()=> {
			    	console.log(this.url['urlImagen'])
			    	if(this.url['urlImagen'].search('https') > -1){
			    		this.loading =false;
			    		this.booleanBotonEnviar = true;
			    		// Proceso listo
			    		//this.router.navigate(['./Paso3Hito']);
			    	} 
		    });
	} // Fin onFileChanged


	enviar(){
		
		this.getState();
		this.HitosService_.ingresarHito(this.objetoHito)
		.subscribe( data =>  {
			console.log(data);
			this.MensajesSwalService_.mensajeStandar({
			titulo:  this.tipoHito + " Realizada",
			texto: "El proceso se realizó correctamente",
			tipo: 'success',
			boton: 'OK'
		});
			this.router.navigate(['./ProcesoMarcajeSucursal']);
		})
	}
}
