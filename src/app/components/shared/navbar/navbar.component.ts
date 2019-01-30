import { Component, OnInit } from '@angular/core';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { Router } from '@angular/router';
import { IndexeddbService } from './../../../services/indexeddb.service';
import { ProcesobiometricoService } from './../../../services/procesobiometrico.service';
import { map } from 'rxjs/operators';
import { Observable, of, forkJoin, timer } from 'rxjs';
import PouchDB from 'pouchdb-browser';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public boleanoMarcajesOffline:boolean = false;
  public turnosPorSincronizar : any;
  public db: any;
  constructor(	public ProcesobiometricoService_: ProcesobiometricoService,
                private IndexeddbService_ : IndexeddbService,
                public Router_: Router,
  				      private MensajesSwalService_: MensajesSwalService) { 

            let storesSchemaAndSeeds = [
                {
                    name: 'marcajes',
                    indexes: ['id_trabajador', 'movimiento', 'coeficiente']
                },
          ];

          let peo = new PouchDB('chrisssssssssss')
         
        // Create the IndexedDB database and perform few operations.
    let self = this;
        
    this.IndexeddbService_.setName('db');
       
    this.IndexeddbService_.create(storesSchemaAndSeeds).subscribe(done => {});

    this.IndexeddbService_.all('marcajes')
        .subscribe( data => {
           if(data.length > 0) this.boleanoMarcajesOffline = true;
    } );


  }

  ngOnInit() {
  }

  SincronizarTurnosOffline(hola, indice){
    console.log("Haciendole de otra forma", hola);
    this.ProcesobiometricoService_.EnvioRegistro(hola.url, '179614936')


/*
    this.IndexeddbService_.all('marcajes')
    .subscribe( data => {

        let observables: Observable<T>[] = [];

        data.map(value => {

               observables.push(this.ProcesobiometricoService_.EnvioRegistro(value.url, '179614936'))
           
        });

              forkJoin(observables)
              .subscribe(dataArray => {
                const source = timer(1000);
                source.subscribe( value =>  )
                  // All observables in `observables` array have resolved and `dataArray` is an array of result of each observable
                 console.log("En forkjoin", dataArray)
                  
              });
      })


*/

   /* this.IndexeddbService_.clear()
    .subscribe( data => {
      console.log(data)
    }) */
  }


  logout(){
  	this.MensajesSwalService_.mensajePromesa('Cerrar Sesión', '¿ Realmente deseas salir de tu sesión?', 'warning', 'Si. Deseo Cerrar Sesión')
  	.then( data => {
  		if(data.value) this.BorrarRegistro();
  	} )
  } // Fin función logout


  actualizarTurnosOffline(){

        let self = this;
       
        this.IndexeddbService_.all('marcajes')
        .subscribe( data => {
          console.log("Datos... " , data);
          this.turnosPorSincronizar = data;
        } );
  }



   


  BorrarRegistro(){
  	localStorage.clear();
  	this.Router_.navigate(['./Login'])
  }

}
interface T{

}