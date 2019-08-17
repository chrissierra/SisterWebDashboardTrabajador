import {Component, ViewChild, ViewEncapsulation, OnInit,OnDestroy, ElementRef} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { RutasservidorService } from '../../../services/rutasservidor.service';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-paso1',
  templateUrl: './paso1s.component.html',
  styleUrls: ['./paso1s.component.css']
})
export class Paso1sComponent implements OnDestroy    {
	public coeficiente_biometrico:any;
	public loading:boolean = true;
	public boleanoTurnoNormalEnCurso:boolean=false;
	public selectedFile:any;
	public boleanoBoton:boolean = false;
	public boleanoTurnoExtra:boolean = false;
	public boleanoTurnoExtraEnCurso:boolean = false;
	public cargando:any;
	public coeficiente:any;
	public datosTrabajador:any;
	public url:any;
	public rut:any;
	public id:any;
	public boleanoLoader:boolean = false;
	public idParaMarcaje:any;
	public BoleanoTomaRespaldo:boolean=true;
	public datosMarcaje:Marcaje;
	public boleanoHitos:boolean=false;
	public avisoTurnoExtra:any;
	public ConFotografiaContraste:boolean=false;
	public snack:any;
	public carnet_validacion:any;
	public device:any;
	public informacionPersonalTrabajador:any;
	public ConexionInternet:Boolean= true;
	public test_:any = 1;
	public FotoCarnetTomaRespaldoBoolean1:boolean=false;
	public FotoCarnetTomaRespaldoBoolean2:boolean=false;

  constructor(	public snackBar: MatSnackBar,
  				private PerfilTrabajadorServiceService_: PerfilTrabajadorServiceService, 
  				public RutasservidorService_: RutasservidorService,
				private MarcajeServiceService: MarcajeServiceService,
  				private MensajesSwalService_: MensajesSwalService,
  				private store: Store<AppState>,
  				public http: HttpClient,
  				private param: ActivatedRoute,
  			    private router : Router) {

  		this.avoidScroll();

  		this.informacionPersonalTrabajador = JSON.parse(localStorage.getItem('informacionPersonalTrabajador'));
  		
  		this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
		
		this.id=this.param.snapshot.paramMap.get('id');
		
		this.rut=this.param.snapshot.paramMap.get('rut');
		
		localStorage.setItem('rutMarcajeOffline', this.rut)
		
		const accion = new fromMarcaje.ACTUALIZARIDAction(this.id);
    	
    	this.store.dispatch( accion );
    
    	this.idParaMarcaje = { 'id':	this.param.snapshot.paramMap.get('id')  };

        const accion2 = new fromMarcaje.ACTUALIZARNOMBREEMPRESAAction(this.datosTrabajador.nombre_empresa);
    	
    	this.store.dispatch( accion2 );
    	
        this.MarcajeServiceService.situacion_marcaje( JSON.stringify(this.idParaMarcaje ) ).subscribe( data => {
                 
		        this.datosMarcaje = { content: data }

		        if(this.datosMarcaje.content['Entrada'] !== 0 && this.datosMarcaje.content['Salida']=== 0){
								this.boleanoHitos =true;
		                      	this.boleanoTurnoNormalEnCurso =true;
		        } 

		        if(this.datosMarcaje.content['Entrada'] === 0 && this.datosMarcaje.content['Salida']=== 0) this.boleanoTurnoExtra =true;
		        if(this.datosMarcaje.content['Entrada'] !== 0 && this.datosMarcaje.content['Salida']!== 0) this.boleanoTurnoExtra =true;
		        if(this.datosMarcaje.content['TurnoExtraEnCurso'] === 1){
								this.avisoTurnoExtra = 'Estás en un turno extra en curso.';
		                      	this.boleanoTurnoExtraEnCurso =true;
		                      	this.boleanoHitos =true;
		        } 

        }, (error) => {

        		  	
        		  	this.snackBar.open('No tienes conexión. Puedes marcar con un turno de emergencia', 'Ok', {
					  duration: 3000
					});
					this.loading = false;
					this.ConexionInternet = false;
        	
        }, ()=> {

		        	this.PerfilTrabajadorServiceService_.getContrasteFotograficoValidacion(this.param.snapshot.paramMap.get('id'))
		              .subscribe( data => {
		              	
		              	this.carnet_validacion = data[0];             
		              	localStorage.setItem('carnet_validacion',  this.carnet_validacion.carnet_validacion)
		              	if(data[0].validado === 'true'){
		              		this.ConFotografiaContraste = true;	
		              	} 

		        	}, (err) => {

	        		  	this.snackBar.open('No tienes conexión. Puedes marcar con un turno de emergencia', 'Ok', {
						  duration: 3000
						});
						this.loading = false;
						this.enableScrolling()
						this.ConexionInternet = false;
        	
		        	}, () => {

						        setTimeout( () => {
						     			
						     			this.loading = false;
     									this.enableScrolling()

						     			if(!this.ConFotografiaContraste){
						              		this.boleanoTurnoExtra =false;
						              	}
						     	
						     	}, 2500 )

		        	} );

        });

  } // Fin constructor

  ngOnDestroy(){
    this.enableScrolling()
  }

  AlPresionarBoton(e){
  	this.boleanoTurnoExtra = false;
  	if(e)  this.avoidScroll()
  }


  irHitos(){
  	this.router.navigate(['./Paso1Hito']);
  }


  avoidScroll(){
  	window.onscroll = function () { window.scrollTo(0, 0); };
  }

  enableScrolling(){
    window.onscroll=function(){};
  }


	onFileChanged(e) {

		    this.loading = true;
		    this.enableScrolling() // Busca volver a dejar libre el scroll para marcar el marcar turno.
		    this.selectedFile = this.MarcajeServiceService.GenerarImagen();
   		
   			let url = "";
		    
   			if(this.ConFotografiaContraste){
   				// ** Esta parte del if realiza el proceso como siempre. Normalmente:
			    const formData_normal = new FormData();
   				url = this.RutasservidorService_.rutas['recepcionimagenv10'];
   				formData_normal.append('photo', this.selectedFile);
   				this.realizar_post_con_imagen(url, formData_normal, false)
   			
   			}else{

   				const formData_caso_updatear = new FormData(); 
   				
   				let url1 = this.RutasservidorService_.rutas['recepcionimagen1v1'];
   				
   				formData_caso_updatear.append('image', this.selectedFile);
   				
   				this.http.post(url1+'?rut='+this.rut, formData_caso_updatear, {
				        reportProgress: true,
				        observe: 'events'
			    }).subscribe( event => console.log(event), (err) => console.log(err), () =>{
			    		// MALO:         Acá si this.url es algo 
			    		setTimeout( () => { 
			    			// ** Esta parte del if realiza el proceso como siempre. Normalmente:
			                const formData_normal = new FormData();
			   				url = this.RutasservidorService_.rutas['recepcionimagenv10'];
			   				formData_normal.append('photo', this.selectedFile);
			   				this.realizar_post_con_imagen(url, formData_normal, true)
			    			  

			    		}, 4000 );

			    	})
   			}

	} // Fin onFileChanged


	onFileChanged_(e) {

		    this.loading = true;
		    this.selectedFile = this.MarcajeServiceService.GenerarImagen();			   		
   			let url = "";
		    
		    const formData_normal = new FormData();
   			url = this.RutasservidorService_.rutas['recepcionimagenv10'];
   			formData_normal.append('photo', this.selectedFile);
   			this.realizar_post_con_imagen(url, formData_normal, false)
   			this.loading = true;
   			setTimeout(()=> 
   			 { 
   			 	//this.loading=false; 
   			 	this.router.navigate(['./Paso2s/' + 0.3 ])} 
   			, 3500)

	} // Fin onFileChanged_


	private realizar_post_con_imagen(url, formData, updateando){
			
			this.http.post(url+'?rut='+this.rut, formData, {
		        reportProgress: true,
		        observe: 'events'
		    }).subscribe(event => {
		    	
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

		    	if(updateando){
		    		this.analisis(false)
		    	}else{
			    	console.log(this.url['urlImagen'])
			    	if(this.url['urlImagen'].search('https') > -1){
			    		this.loading = false;
			    		this.boleanoBoton = true;
			    		this.boleanoLoader=false;
			    	} 		    		
		    	}

		    });
	} // Fin realizar_post_con_imagen


	irTurnosExtras(){

		if(this.datosMarcaje.content['TurnoExtraEnCurso'] === 1) return this.router.navigate(['./Paso1TurnoExtra',this.id, this.rut]);
		this.MensajesSwalService_.mensajePromesa('Atención', 'Los turnos extras deberán ser validados luego por tu Jefatura o supervisor.','warning', 'Quiero marcar Turno Extra')
		.then( result => {
			console.log("resuilt", result);
			if(result.value) this.router.navigate(['./Paso1TurnoExtra',this.id, this.rut]);
		} )
	}


	TurnoOffline(){
		this.MensajesSwalService_.mensajePromesa("Marcaje emergencia",
		 "¿ Estás seguro que deseas marcar un turno de emergencia ? Solo debes marcarlo si intentaste marcar y no tuviste éxito. Debes avisar a tu supervisor.", "question", "Voy a marcar")
		.then( data => {
			if(data.value) this.router.navigate(['./Paso1Offline'])
		} )

	}

	analisis(routing){
		 this.http.get('https://sister.cl/DeteccionFacialServidor/' +this.rut).subscribe(event => {
		       	
		        const accion = new fromMarcaje.ACTUALIZARCTEAction(event['data']);
		        this.coeficiente_biometrico = event['data']
    			this.store.dispatch( accion );
    			if(routing){
			        this.router.navigate(['./Paso2s/' + event['data'] ]);
    			}
		    },

		    (Err)=>{
		    	this.MensajesSwalService_.mensajeStandar({
												titulo:'Imagen poco clara',
												texto:'Tu fotografía no apuntó a un rostro de forma clara. Favor reintenta apuntando claramente a tu rostro.',
												tipo:'error',
												boton:'Ok'
		    											});
		    	//this.router.navigate(['./ProcesoMarcajeSucursal']);
		    	console.log("this.coeficiente_biometrico", this.coeficiente_biometrico)

			    this.router.navigate(['./ProcesoMarcajeSucursal']);
		    	
		    	if(routing){
			    this.error_actualizar_imagen();
    			}

		    }, () => {
		    	if(!routing){
		    		console.log("this.coeficiente_biometrico", this.coeficiente_biometrico);
		    		// Acá debo ingresar a la base de datos de contraste de validacion un true. Ya que la imagen está validada.
		    		let url_update = this.RutasservidorService_.rutas['UpdateContrasteFotograficoValidacion'];
		    		
		    		this.http.post(url_update, JSON.stringify({'validado': 'true', 'trabajador_id': this.param.snapshot.paramMap.get('id')}))
		    		.subscribe(data => {
		    					    	this.MensajesSwalService_.mensajeStandar({
												titulo:'Actualización correcta',
												texto:'¡Ahora podrás marcar turnos satisfactoriamente!',
												tipo:'success',
												boton:'Ok'
		    							});
		    			
		    			this.router.navigate(['./ProcesoMarcajeSucursal']);

		    		}, (error) => alert(JSON.stringify(error)))

		    	}
		    })
	}


	  private error_actualizar_imagen(){
			  	this.snack = this.snackBar.open(`¡Vuelve a intentarlo! Debes mostrar claramente tu rostro, sin exceso de luz o sombras.`, 'Ok', {
				  duration: 2000
				});
	  }


      carnet_funcion(result) {

            this.FotoCarnetTomaRespaldoBoolean1 = true;
            console.log(result);
            alert(result)
            this.url ={ 'urlImagen': result}
            const accion = new fromMarcaje.ACTUALIZARURLAction(this.url);
    		this.store.dispatch( accion );
    		
    		setTimeout(()=> {
    					
    					this.FotoCarnetTomaRespaldoBoolean2 = true;

    			    		if(result.match(this.rut.slice(0, -1)) == this.rut.slice(0, -1)){
								// Informar al hijo que debe tomar foto
								const accion = new fromMarcaje.ACTUALIZARCTEAction(true);
				    			this.store.dispatch( accion );

				    		}else{
								
								this.MensajesSwalService_.mensajeStandar({
																titulo:'Carnet no corresponde',
																texto:'El carnet escaneado no concuerda con el trabajador que intenta marcar un movimiento.',
																tipo:'error',
																boton:'Ok'
						    											});
							    this.router.navigate(['./ProcesoMarcajeSucursal']);

				    		}

    		}, 1000)
    	
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

    } // Fin camerasFoundHandler

}


// Interface Marcaje

interface Marcaje {
  content: any; 
}