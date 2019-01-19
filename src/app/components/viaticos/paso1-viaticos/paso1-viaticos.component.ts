import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { ViaticosService } from '../../../services/viaticos.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RutasservidorService } from '../../../services/rutasservidor.service';
@Component({
  selector: 'app-paso1-viaticos',
  templateUrl: './paso1-viaticos.component.html',
  styleUrls: ['./paso1-viaticos.component.css']
})
export class Paso1ViaticosComponent  {
	public url:any;
	public datosTrabajador:any;
	public id:any;
	public nombreDelArchivo:string = 'photo';
	public viatico:viaticos;
	public deviceInfo:any;
  constructor(	public RutasservidorService_: RutasservidorService,
				private MensajesSwalService_: MensajesSwalService,
  				private GeolocalizacionService_: GeolocalizacionService,
  				private deviceService: DeviceDetectorService,
  				private ViaticosService_: ViaticosService,
  				private store: Store<AppState>,
              	private param: ActivatedRoute,
              	private router: Router) { 
  				this.detectDevice();
  				this.GeolocalizacionService_.getLocacionToState();
 				this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
 				this.id = this.datosTrabajador['id'];
  				this.url = this.RutasservidorService_.rutas['registrohitosmandantes'] +'?id='+this.id
  		        const accion = new fromMarcaje.ACTUALIZARURLAction(this.url);
        		this.store.dispatch( accion );
  }


 public detectDevice() {
    this.deviceInfo = this.deviceService.isMobile(); 
    //alert/this.detectDevice)   
    console.log( this.deviceService.getDeviceInfo())
    console.log(this.deviceService.isMobile())
  } // Fin detectDevice

guardar(forma){
	var f=new Date();
	console.log(forma.value)
	//alert/forma.value.motivo)
	this.store.select('marcaje')
	.subscribe( marcaje => {
		console.log(marcaje.url1)
				
				this.viatico = {
					motivo: forma.value.motivo,
					glosa: forma.value.glosa,
					monto:forma.value.monto,
					latitud: marcaje.latitud,
					longitud: marcaje.longitud,
					url:marcaje.url1['urlImagen'],
					cliente_rrhh:this.datosTrabajador['nombre_empresa_usuario_plataforma'],
					trabajador_id:this.id,
					hora:f.getHours()+":"+(f.getMinutes()<10?'0':'') + f.getMinutes()+":"+f.getSeconds(),
					dia:f.getDate(),
					mes: (f.getMonth() + 1 ),
					anio: f.getFullYear(),
					nombre: this.datosTrabajador['nombre'],
					apellido: this.datosTrabajador['apellido'],
					rut: this.datosTrabajador['rut'],
					movil_desktop: this.deviceInfo
				}

	} );

	console.log(this.viatico)
	this.ViaticosService_.ingresarViaticos(this.viatico)
	.subscribe( data => {
		console.log(data)
		this.MensajesSwalService_.mensajeStandar({
			titulo: 'Viatico Ingresado',
			texto: 'El viático se ingresó correctamente',
			tipo: 'success',
			boton:'Ok'
		});
		this.router.navigate(['./Home'])
	} )

	
	
}


}

interface viaticos {
	motivo: string,
	glosa: string,
	monto:string,
	latitud:any,
	longitud:any,
	url:any,
	cliente_rrhh:any,
	trabajador_id:any,
	hora:any,
	dia:any,
	mes:any,
	anio:any,
	nombre:any,
	apellido:any,
	rut:any,
	movil_desktop:any
}