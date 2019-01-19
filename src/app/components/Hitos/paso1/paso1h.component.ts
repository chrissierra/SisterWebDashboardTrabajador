import { Component } from '@angular/core';
import { MandantesService } from '../../../services/mandantes.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { RutasservidorService } from '../../../services/rutasservidor.service';
@Component({
  selector: 'Marcaje-app-sister-paso1',
  templateUrl: './paso1h.component.html',
  styleUrls: ['./paso1h.component.css']
})
export class Paso1HitoComponent  {
	public Datos:any;
	public nombre_empresa:any;
	public seleccionMandante:any;
	public booleanoRespaldo:any = false;
	public booleanoVer:any = false;
	public selectedFile:any;
	public cargando:any = 0;
	public url:any;
	public id:any;
	public SelectHito:any;
	public loading:boolean=false;

  constructor(	public RutasservidorService_: RutasservidorService,
				private GeolocalizacionService_: GeolocalizacionService,
  				private MensajesSwalService_: MensajesSwalService,
  				public http: HttpClient,
  				public MandantesService_: MandantesService,
  				private store: Store<AppState>,
  				private router : Router) { 
  		this.getState();
  		this.getClientes();
  
  }

 

		  getClientes(){
		  	this.MandantesService_.getMandante({proveedor_servicios: this.nombre_empresa})
		  	.subscribe( data => {
		  		console.log(data);
		  		this.Datos = data;
		  	} )
		   
		  }


		getState(){
			this.store.select('marcaje')
		      .subscribe( marcaje  => {       
		       this.id = marcaje.id;
		        this.nombre_empresa=marcaje.nombre_empresa;
		    	
		      });

		      console.log(this.nombre_empresa)
		} // Fin getState


		ver(sel){
			//alert(this.seleccionMandante)
			console.log("seleccion.. ", this.seleccionMandante)
			
			const accion = new fromMarcaje.ACTUALIZARMANDANTEAction(this.seleccionMandante);
    		this.store.dispatch( accion );

    		//alert(this.SelectHito)

    		const accion1 = new fromMarcaje.ACTUALIZARHITOAction(this.SelectHito);
    		this.store.dispatch( accion1 );

			this.booleanoRespaldo = true;
			
		}// Fin ver



	onFileChanged(event) {
		    
		    this.selectedFile = event.target.files[0];

		    const formData = new FormData();

   			formData.append('photo', this.selectedFile);

   			this.loading = true;
		    
		    this.http.post(this.RutasservidorService_.rutas['registrohitosmandantes'] + '?id='+this.id, formData, {
		        reportProgress: true,
		        observe: 'events'
		    }).subscribe(event => {

		    	this.cargando = (event['total'] === undefined) ? 100 : (event['loaded'] / event['total']) *100;	
		    	console.log(this.cargando)
		    	console.log(event)
		        const accion = new fromMarcaje.ACTUALIZARURLAction(event['body']);
    			this.store.dispatch( accion );

    			this.url = event['body'];
		        
		      
		    }, (error) => {
		    	this.MensajesSwalService_.mensajeStandar({
												titulo:'Error en envío',
												texto:'La fotografía no pudo ser procesada. Repite la operación. Si persiste avísanos.',
												tipo:'error',
												boton:'Ok'
		    											});
		    	this.loading = false;
		    	this.router.navigate(['./ProcesoMarcajeSucursal']);
		    }, ()=> {
			    	console.log(this.url['urlImagen'])
			    	if(this.url['urlImagen'].search('https') > -1){
			    		// Proceso listo
			    		this.router.navigate(['./Paso2Hito']);
			    	} 
		    });
	} // Fin onFileChanged



	SeleccionHito(e){
		this.booleanoVer = true;
	}


public arrayHito:any[] = [
		"Ronda", "Entrega"
	]




}


