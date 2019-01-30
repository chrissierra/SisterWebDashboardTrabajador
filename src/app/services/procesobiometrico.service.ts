import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
import { MensajesSwalService } from './mensajes-swal.service'
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../components/marcaje.actions';
import { AppState } from './../app.reducers';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProcesobiometricoService {
	public procesoRealizado:boolean=false;
  constructor(private router: Router,
              private MensajesSwalService_: MensajesSwalService,
              private store: Store<AppState>,
              public http: HttpClient, 
              private rutasService_: RutasservidorService) { }


   EnvioRegistro(file, rut) {
        
        

        const formData = new FormData();

         formData.append('photo', file);
        
        this.http.post(this.rutasService_.rutas['recepcionimagenv10']+'?rut='+rut, formData, {
            reportProgress: true,
            observe: 'events'
        }).subscribe(event => {
        

            const accion = new fromMarcaje.ACTUALIZARURLAction(event['body']);
            this.store.dispatch( accion );
            console.log(event['body'])
          
        }, (error) => {
          this.MensajesSwalService_.mensajeStandar({
                        titulo:'Error en envío',
                        texto:'La fotografía no pudo ser procesada. Repite la operación. Si persiste avísanos.',
                        tipo:'error',
                        boton:'Ok'
                              });
          this.router.navigate(['./Home']);

        }, ()=> {

        	this.procesoRealizado = true;


        });
  } // Fin onFileChanged



}
