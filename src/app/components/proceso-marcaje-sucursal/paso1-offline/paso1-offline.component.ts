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
import { AlmacenamientoOfflineService } from './../../../services/almacenamiento-offline.service';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-paso1-offline',
  templateUrl: './paso1-offline.component.html',
  styleUrls: ['./paso1-offline.component.css']
})
export class Paso1OfflineComponent   {

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
	public movimientoDesdeSelect:any;
	public imagen:any;
	public fotoLista:boolean = false;
	public blobImagen:any;
  public nuevoMarcaje:any;
  constructor(	public almacenamiento: LocalStorage,
                public AlmacenamientoOfflineService_: AlmacenamientoOfflineService,
        				public ComprobanteService_:ComprobanteService,
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
        this.sucursal = marcaje.Sucursal;
        this.idTrabajador = marcaje.id;
        this.nombre_trabajador = marcaje.nombre_trabajador;
    });


	this.GeolocalizacionService_.getLocacion()
	this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
	this.loading = false;


  			     }


getDatos(){

	this.getFromState()
	this.SetId();
	this.id.movimiento = this.movimientoDesdeSelect;
			
		    if((this.sucursal === undefined || this.movimientoDesdeSelect === undefined )|| (this.sucursal.length < 1 && this.movimientoDesdeSelect.length > 1)) return this.MensajesSwalService_.mensajeStandar({
	    	titulo: 'Faltan datos',
	    	texto: 'Debes seleccionar ambas variables: sucursal y movimiento.',
	    	tipo: 'warning',
	    	boton: 'Ok'
	    })

    this.enboton();
}



SetId(){
	this.GeolocalizacionService_.getLocacion();

	this.id = {
				'id': this.idTrabajador,
				'movimiento': '',
				'url': "",
				'Sucursal': this.sucursal,
				'locacion': this.GeolocalizacionService_.locacion,
				'biometrica':1,
				'hora_esperada':"",
				'horaMarcaje': new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
				'fecha': new Date().getDate() + "/"+ new Date().getMonth() + "/"+ new Date().getFullYear()
			  };	
} // Fin SetId





onFileChanged(event) {	 
  this.imagen = event.target.files[0];
  this.fotoLista = true;  	// this.enboton(blob)
	} // Fin onFileChanged



	    enboton(){

        this.nuevoMarcaje = {    

        					          id_trabajador: this.idTrabajador, 
                            movimiento: this.movimientoDesdeSelect, 
                            coeficiente: 1,
                            url:this.imagen,
                            Sucursal:this.sucursal,                           
                            biometrica:1,
                            hora_esperada:"NA",
                            locacion: this.GeolocalizacionService_.locacion,
                            horaMarcaje: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
              							fecha: new Date().getDate() + "/"+ (new Date().getMonth() +1 )+ "/"+ new Date().getFullYear(),
              							nombre_trabajador: this.nombre_trabajador,
                            rutMarcajeOffline: localStorage.getItem('rutMarcajeOffline')

                       	};

                         this.AlmacenamientoOfflineService_.ingresarMarcaje(this.nuevoMarcaje, this.idTrabajador);

    }



    getFromState(){
    	this.store.select('marcaje')
          .subscribe( marcaje  => {       
            this.sucursal = marcaje.Sucursal;
            this.nombre_trabajador = marcaje.nombre_trabajador;
            console.log("El marcaje...", marcaje)
          });
    } // Fin getFromState

}
