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
	carnet_validacion:any;
	device:any;
	coeficiente_biometrico:any;
  constructor(  public RutasservidorService_: RutasservidorService,
				private MarcajeServiceService: MarcajeServiceService,
  				private MensajesSwalService_: MensajesSwalService,
  				private store: Store<AppState>,
  				public http: HttpClient,
  				private param: ActivatedRoute,
  			    private router : Router) {
  		
  		console.log(localStorage.getItem('carnet_validacion'))
  		this.carnet_validacion = { 'carnet_validacion': localStorage.getItem('carnet_validacion') }
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


	    dataURItoBlob(dataURI) {
			   const byteString = window.atob(dataURI);
			   const arrayBuffer = new ArrayBuffer(byteString.length);
			   const int8Array = new Uint8Array(arrayBuffer);
			   for (let i = 0; i < byteString.length; i++) {
			     int8Array[i] = byteString.charCodeAt(i);
			   }
			   const blob = new Blob([int8Array], { type: 'image/jpeg' });    
			   return blob;
		}








  	onFileChanged(e) {
		    
		    this.selectedFile = localStorage.getItem('fotito')
		    console.log(this.selectedFile)



		    const date = new Date().valueOf();
			let text = '';
			const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for (let i = 0; i < 5; i++) {
			   text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
			}
			// Replace extension according to your media type
			const imageName = date + '.' + text + '.jpeg';
			// call method that creates a blob from dataUri
			const imageBlob = this.dataURItoBlob(this.selectedFile );

			const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
			this.selectedFile = imageFile;
			alert(JSON.stringify(this.selectedFile.size));
			console.log(this.selectedFile)








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



	carnet_funcion(result) {

            
            console.log(result);
            this.url ={ 'urlImagen': result}
            const accion = new fromMarcaje.ACTUALIZARURLAction(this.url);
    		this.store.dispatch( accion );
    		

    		const accion1 = new fromMarcaje.ACTUALIZARCTEAction(0.3);
		    this.coeficiente_biometrico = 0.3
    		this.store.dispatch( accion1 );

    		if(result.match(this.rut.slice(0, -1)) == this.rut.slice(0, -1)){
				
				this.router.navigate(['./Paso2s/' + 0.3 ]);

    		}else{
				
				this.MensajesSwalService_.mensajeStandar({
												titulo:'Carnet no corresponde',
												texto:'El carnet escaneado no concuerda con el trabajador que intenta marcar un movimiento.',
												tipo:'error',
												boton:'Ok'
		    											});
			    this.router.navigate(['./ProcesoMarcajeSucursal']);

    		}

    }


	camerasFoundHandler(e){
            console.log(e);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of e) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev;
                for (const dev of videoDevices){
                    if (dev.label.includes('back')){
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.device = choosenDev;
                } else {
                   this.device = videoDevices[0];
                }
            }

    }



} // *** FIN CLASE PASO1TURNOEXTRACOMPONENT



// Interface Marcaje

interface Marcaje {
  content: any; 
}