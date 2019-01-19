import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { RutasservidorService } from '../../../services/rutasservidor.service';

@Component({
  selector: 'Marcaje-app-sister-paso1-turno-extra',
  templateUrl: './paso1-turno-extra.component.html',
  styleUrls: ['./paso1-turno-extra.component.css']
})
export class Paso1TurnoExtraComponent {
	public loading:boolean = true;
	selectedFile:any;
	boleanoBoton:boolean = false;
	cargando:any;
	coeficiente:any;
	datosTrabajador:any;
	url:any;
	rut:any;
	id:any;
	boleanoLoader:boolean = false;
	idParaMarcaje:any;
	BoleanoTomaRespaldo:boolean=true;
	datosMarcaje:Marcaje;
  constructor(  public RutasservidorService_: RutasservidorService,
				private MarcajeServiceService: MarcajeServiceService,
  				private MensajesSwalService_: MensajesSwalService,
  				private store: Store<AppState>,
  				public http: HttpClient,
  				private param: ActivatedRoute,
  			    private router : Router) {
  	
  	  	this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));

		this.id=this.param.snapshot.paramMap.get('id');
		this.rut=this.param.snapshot.paramMap.get('rut');
		
		const accion = new fromMarcaje.ACTUALIZARIDAction(this.id);
    	this.store.dispatch( accion );
    
    	this.idParaMarcaje = {
        				      'id':	this.param.snapshot.paramMap.get('id')
              			     };

		if(this.datosTrabajador['rol'] === 'cliente'){
		    const accion2 = new fromMarcaje.ACTUALIZARNOMBREEMPRESAAction(this.datosTrabajador.nombre_empresa);    	
    		this.store.dispatch( accion2 );
		   
		}else{
		    const accion2 = new fromMarcaje.ACTUALIZARNOMBREEMPRESAAction(this.datosTrabajador.nombre_empresa_usuario_plataforma);    	
    		this.store.dispatch( accion2 );
		}



  		setTimeout( () => { this.loading = false }, 900 );


  			     }  // *** Fin CONTRUCTOR



  	onFileChanged(event) {
		    
		    this.selectedFile = event.target.files[0];

		    const formData = new FormData();

   			formData.append('photo', this.selectedFile);
		    
		    this.http.post(this.RutasservidorService_.rutas['recepcionimagenv10']+'?rut='+this.rut, formData, {
		        reportProgress: true,
		        observe: 'events'
		    }).subscribe(event => {
		    	console.log(event)
		    	console.log(event['total'])
		    	this.boleanoLoader=true;
		    	this.BoleanoTomaRespaldo = false;
		    	this.cargando = (event['total'] === undefined) ? 1 : event['loaded'] / event['total'];	

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
		    	this.router.navigate(['./ProcesoMarcajeSucursal']);
		    }, ()=> {
		    	console.log(this.url['urlImagen'])
		    	if(this.url['urlImagen'].search('https') > -1){
		    		this.boleanoBoton = true;
		    		this.boleanoLoader=false;
		    	} 
		    });
	} // Fin onFileChanged





	analisis(){
				 this.http.get('https://sister.cl/DeteccionFacialServidor/' +this.rut).subscribe(event => {
				       	
				        const accion = new fromMarcaje.ACTUALIZARCTEAction(event['data']);
		    			this.store.dispatch( accion );
				        this.router.navigate(['./Paso2TurnoExtra/' + event['data'] ]);
				    },

				    (Err)=>{
				    	this.MensajesSwalService_.mensajeStandar({
														titulo:'Imagen poco clara',
														texto:'Tu fotografía no apuntó a un rostro de forma clara. Favor reintenta apuntando claramente a tu rostro.',
														tipo:'error',
														boton:'Ok'
				    											});
				    	this.router.navigate(['./ProcesoMarcajeSucursal']);
				    });

	} //¨** Fin función analisis




} // *** FIN CLASE PASO1TURNOEXTRACOMPONENT



// Interface Marcaje

interface Marcaje {
  content: any; 
}