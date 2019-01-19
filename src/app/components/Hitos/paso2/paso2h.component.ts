import { Component, OnInit } from '@angular/core';
import { MandantesService } from '../../../services/mandantes.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RutasservidorService } from '../../../services/rutasservidor.service';
@Component({
  selector: 'Marcaje-app-sister-paso2',
  templateUrl: './paso2h.component.html',
  styleUrls: ['./paso2h.component.css']
})
export class Paso2HitoComponent implements OnInit {
	public Datos:any;
	public nombre_empresa:any;
	public seleccionMandante:any;
	public booleanoRespaldo:any = false;
	public selectedFile:any;
	public cargando:any;
	public url:any;
	public id:any;
	public loading:boolean=false;

  constructor(	public RutasservidorService_: RutasservidorService,
				private MensajesSwalService_: MensajesSwalService,
  				public http: HttpClient,
  				public MandantesService_: MandantesService,
  				private store: Store<AppState>,
  				private router : Router) {  		
  	this.getState(); 
  }

  ngOnInit() {
  }



	getState(){
			this.store.select('marcaje')
		      .subscribe( marcaje  => {       
		       this.id = marcaje.id;
		        this.nombre_empresa=marcaje.nombre_empresa;
		    	console.log(marcaje.tipo_hito)
		      });

		      console.log(this.nombre_empresa)
		} // Fin getState

	onFileChanged(event) {
		    
		    this.selectedFile = event.target.files[0];

		    const formData = new FormData();
			this.loading = true;
   			formData.append('photo', this.selectedFile);
		    
		    this.http.post(this.RutasservidorService_.rutas['registrohitosmandantes']+'?id='+this.id, formData, {
		        reportProgress: true,
		        observe: 'events'
		    }).subscribe(event => {

		    	this.cargando = (event['total'] === undefined) ? 1 : event['loaded'] / event['total'];	
		    	console.log(event)
		        const accion = new fromMarcaje.ACTUALIZARURL1Action(event['body']);
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
			    		// Proceso listo
			    		this.loading = false;
			    		this.router.navigate(['./Paso3Hito']);
			    	} 
		    });
	} // Fin onFileChanged
}
