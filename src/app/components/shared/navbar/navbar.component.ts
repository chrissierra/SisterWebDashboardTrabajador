import { Component  } from '@angular/core';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { Router } from '@angular/router';
import { IndexeddbService } from './../../../services/indexeddb.service';
import { ProcesobiometricoService } from './../../../services/procesobiometrico.service';
import { map } from 'rxjs/operators';
import { Observable, of, forkJoin, timer } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AlmacenamientoOfflineService } from './../../../services/almacenamiento-offline.service';
import * as fromMarcaje from '../../../components/marcaje.actions';
import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent   {
  public boleanoMarcajesOffline:boolean = false;
  public turnosPorSincronizar : any;
  public db: any;
  public url: any;
  constructor(	private store: Store<AppState>,
                public AlmacenamientoOfflineService_: AlmacenamientoOfflineService,
                protected almacenamiento: LocalStorage,
                public ProcesobiometricoService_: ProcesobiometricoService,
                private IndexeddbService_ : IndexeddbService,
                public Router_: Router,
  				      private MensajesSwalService_: MensajesSwalService) {}


  SincronizarTurnosOffline(hola, indice){
    console.log("Haciendole de otra forma", hola);
  }


  logout(){
  	this.MensajesSwalService_.mensajePromesa('Cerrar Sesión', '¿ Realmente deseas salir de tu sesión?', 'warning', 'Si. Deseo Cerrar Sesión')
  	.then( data => {
  		if(data.value) this.BorrarRegistro();
  	} )
  } // Fin función logout


  actualizarTurnosOffline(){

      let observableBatch: Observable<any>[] = [];
        
      this.almacenamiento.getItem('idsIngresados').subscribe( (data:any[]) => {         
            data.map( value =>   observableBatch.push( this.almacenamiento.getItem(value)) )
      }, (error) => {

      }, ()=> {
         forkJoin(observableBatch)
          .subscribe( data => { this.turnosPorSincronizar = data; console.log(data) });
      });  
              
      //setTimeout( () =>  { this.forkJoinFunction(observableBatch) } , 500)
    
  }


enviarABbdd(objeto, indice){

  this.ProcesobiometricoService_.EnvioRegistro(objeto.url, objeto.rutMarcajeOffline, objeto)
  this.AlmacenamientoOfflineService_.borrarRegistro(objeto.id_trabajador, indice)
  console.log("VER URL", this.url)
  this.Router_.navigate(['./Home'])
}


  getFromState(){
      this.store.select('marcaje')
          .subscribe( marcaje  => {       
              this.url = marcaje.url;
          });
  } // Fin getFromState





  BorrarRegistro(){
  	localStorage.clear();
  	this.Router_.navigate(['./Login'])
  }




} // **************** Fin CLASE **************** 