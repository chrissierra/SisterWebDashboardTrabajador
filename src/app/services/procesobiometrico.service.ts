import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
import { MensajesSwalService } from './mensajes-swal.service'
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../components/marcaje.actions';
import { AppState } from './../app.reducers';
import { Router } from '@angular/router';
import { AlmacenamientoOfflineService } from './almacenamiento-offline.service';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ProcesobiometricoService {
	public procesoRealizado:boolean=false;
  constructor(private snackBar: MatSnackBar,
              public AlmacenamientoOfflineService_: AlmacenamientoOfflineService,
              private router: Router,
              private MensajesSwalService_: MensajesSwalService,
              private store: Store<AppState>,
              public http: HttpClient, 
              private rutasService_: RutasservidorService) { }


   EnvioRegistro(file, rut, objeto, indice) {
        
          
         let snack = this.snackBar.open('... Espera mientras se sincroniza ...', 'Entendido', {});
         
         const formData = new FormData();

         formData.append('photo', file);
        
        this.http.post(this.rutasService_.rutas['recepcionimagenv10']+'?rut='+rut, formData, {
            reportProgress: true,
            observe: 'events'
        }).subscribe(event => {
        

            const accion = new fromMarcaje.ACTUALIZARURLAction(event['body']);
            this.store.dispatch( accion );
            
            console.log(event['body']);
            objeto.urlEscrita = event['body'];



          
        }, (error) => {
          this.procesoRealizado = false;
          this.MensajesSwalService_.mensajeStandar({
                        titulo:'Error en envío',
                        texto:'La fotografía no pudo ser procesada. Repite la operación. Si persiste avísanos.',
                        tipo:'error',
                        boton:'Ok'
                              });

            snack.dismiss()


          //this.router.navigate(['./Home']);

        }, ()=> {


            this.http.post(this.rutasService_.rutas['MarcarMovimiento_offline'], objeto)
            .subscribe(data => {
              console.log("Enviando a servidor finalmente", data)
            }, (error) => {
              this.snackBar.open('Error...', 'Ok', {duration: 2000});
              this.procesoRealizado = false;
              alert(JSON.stringify(error))
                this.MensajesSwalService_.mensajeStandar({
                titulo: 'Error',
                texto: 'Debes tener una conexión a internet adecuada para realizar la sincronización.',
                tipo: 'error',
                boton: 'OK!'
              });


            }, 
            () => {
              
              
              this.AlmacenamientoOfflineService_.borrarRegistro(objeto.id_trabajador, indice)
              this.MensajesSwalService_.mensajeStandar({
                titulo: 'Turno Sincronizado',
                texto: 'El marcaje fue sincronizado exitosamente en la base de datos.',
                tipo: 'success',
                boton: 'OK!'
              });
            })

             snack.dismiss()
        });

        
  } // Fin onFileChanged



}
