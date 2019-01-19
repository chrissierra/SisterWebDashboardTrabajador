import { Component, ViewChild, ElementRef  } from '@angular/core';
import * as moment from 'moment';
import { LibroremuneracionesService } from './../../services/libroremuneraciones.service';
import { GeolocalizacionService } from './../../services/geolocalizacion.service';
declare var google: any;
import * as XLSX from 'xlsx';
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../marcaje.actions';
import { AppState } from './../../app.reducers';
@Component({
  selector: 'app-libro-asistencia',
  templateUrl: './libro-asistencia.component.html',
  styleUrls: ['./libro-asistencia.component.css']
})
export class LibroAsistenciaComponent{
	public nombreEmpresa:any;	
	public calendario:any;
	public movimiento:any;
 	public arrayDirecciones:any;
 	public geocoder:any;
 	public movimientos: any[] = [];
 	public mes:any = 'mes';
 	public anio:any;
 	public idTrabajador:any;
 	@ViewChild('TABLE') table: ElementRef;
  constructor(public servicioLibroDiario:LibroremuneracionesService,
              private store: Store<AppState>,
              public geolocalizacion: GeolocalizacionService) { 
  		this.getState();
  }

       ActualizarFecha(){

            const FORMATO_ENTRADA = 'MM-DD-YYYY';
            const FORMATO_SALIDA = 'MM-DD-YYYY';
            const fecha1 = moment(this.calendario, FORMATO_ENTRADA);
          //  alert(fecha1.format(FORMATO_SALIDA));
            this.servicioLibroDiario.GetdiarioPorTrabajador({'id': this.idTrabajador, 'dia': fecha1.format(FORMATO_SALIDA) }).subscribe( (data)=> {
            	console.log(data);
            	this.movimiento = data;
            } );


      }


      	getState(){
			this.store.select('marcaje')
		      .subscribe( marcaje  => {       
		      	this.idTrabajador = marcaje.id;		    	
		      });
		      console.log("Id trabajador", this.idTrabajador)

		} // Fin getState


}