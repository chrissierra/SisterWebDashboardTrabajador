import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { RutasservidorService } from '../../../services/rutasservidor.service';
@Component({
  selector: 'app-paso1',
  templateUrl: './paso1s.component.html',
  styleUrls: ['./paso1s.component.css']
})
export class Paso1sComponent  {
	public loading:boolean = true;
	public boleanoTurnoNormalEnCurso:boolean=false;
	selectedFile:any;
	boleanoBoton:boolean = false;
	boleanoTurnoExtra:boolean = false;
	boleanoTurnoExtraEnCurso:boolean = false;
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
	boleanoHitos:boolean=false;
	avisoTurnoExtra:any;
  constructor(	public RutasservidorService_: RutasservidorService,
				private MarcajeServiceService: MarcajeServiceService,
  				private MensajesSwalService_: MensajesSwalService,
  				private store: Store<AppState>,
  				public http: HttpClient,
  				private param: ActivatedRoute,
  			    private router : Router) { 

  		this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
		this.id=this.param.snapshot.paramMap.get('id');
		this.rut=this.param.snapshot.paramMap.get('rut');
		localStorage.setItem('rutMarcajeOffline', this.rut)
		const accion = new fromMarcaje.ACTUALIZARIDAction(this.id);
    	this.store.dispatch( accion );
    
    	 this.idParaMarcaje = {
              'id':	this.param.snapshot.paramMap.get('id')
              };


        const accion2 = new fromMarcaje.ACTUALIZARNOMBREEMPRESAAction(this.datosTrabajador.nombre_empresa);
    	this.store.dispatch( accion2 );
    	
                this.MarcajeServiceService.situacion_marcaje( JSON.stringify(this.idParaMarcaje ) ).subscribe( data => {
                 
                     this.datosMarcaje = {
                     					content: data
                     					}

                      console.log("Datos del marcaje.. " ,this.datosMarcaje)
                      console.log("this.datosMarcaje", this.datosMarcaje.content['Entrada'])

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
                });


                setTimeout( () => {
     			   this.loading = false;
     			 }, 2500 )

  }


  irHitos(){
  	this.router.navigate(['./Paso1Hito']);
  }


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

	analisis(){
		 this.http.get('https://sister.cl/DeteccionFacialServidor/' +this.rut).subscribe(event => {
		       	
		        const accion = new fromMarcaje.ACTUALIZARCTEAction(event['data']);
    			this.store.dispatch( accion );
		        this.router.navigate(['./Paso2s/' + event['data'] ]);
		    },

		    (Err)=>{
		    	this.MensajesSwalService_.mensajeStandar({
												titulo:'Imagen poco clara',
												texto:'Tu fotografía no apuntó a un rostro de forma clara. Favor reintenta apuntando claramente a tu rostro.',
												tipo:'error',
												boton:'Ok'
		    											});
		    	this.router.navigate(['./ProcesoMarcajeSucursal']);
		    })
	}

}
// Interface Marcaje

interface Marcaje {
  content: any; 
}