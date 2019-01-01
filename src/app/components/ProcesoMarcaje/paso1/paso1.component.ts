import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { RutasservidorService } from '../../../services/rutasservidor.service';
@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component  {

	selectedFile:any;
	boleanoBoton:boolean = false;
	boleanoLoader:boolean = false;
	cargando:any;
	coeficiente:any;
	datosTrabajador:any;
	url:any;
	BoleanoTomaRespaldo:boolean=true;
  constructor(	public RutasservidorService_: RutasservidorService,
				private MensajesSwalService_: MensajesSwalService,
  				private store: Store<AppState>,
  				public http: HttpClient,
  				private param: ActivatedRoute,
  			    private router : Router) { 

  		this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
  }



	onFileChanged(event) {
		    
		    this.selectedFile = event.target.files[0];

		    const formData = new FormData();

   			formData.append('photo', this.selectedFile);
		    
		    this.http.post(this.RutasservidorService_.rutas['recepcionimagenv10']+'?rut='+this.datosTrabajador.rut, formData, {
		        reportProgress: true,
		        observe: 'events'
		    }).subscribe(event => {
		    	console.log(event)
		    	console.log(event['total'])
		    	this.boleanoLoader=true;
		    	this.cargando = (event['total'] === undefined) ? 1 : event['loaded'] / event['total'];	
		    	this.BoleanoTomaRespaldo = false;	    	
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
		    	this.router.navigate(['./Home']);
		    }, ()=> {
		    	console.log(this.url['urlImagen'])
		    	if(this.url['urlImagen'].search('https') > -1){
		    		this.boleanoLoader=false;
		    		this.boleanoBoton = true;
		    	} 
		    });
	} // Fin onFileChanged



	analisis(){
		 this.http.get('https://sister.cl/DeteccionFacialServidor/' +this.datosTrabajador.rut).subscribe(event => {
		       	
		        const accion = new fromMarcaje.ACTUALIZARCTEAction(event['data']);
    			this.store.dispatch( accion );
		        this.router.navigate(['./ProcesoMarcajePaso2/' + event['data'] ]);
		    },

		    (Err)=>{
		    	this.MensajesSwalService_.mensajeStandar({
												titulo:'Imagen poco clara',
												texto:'Tu fotografía no apuntó a un rostro de forma clara. Favor reintenta apuntando claramente a tu rostro.',
												tipo:'error',
												boton:'Ok'
		    											});
		    	this.router.navigate(['./Home']);
		    })
	}

}