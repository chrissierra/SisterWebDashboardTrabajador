import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
import { MensajesSwalService } from './mensajes-swal.service'
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../components/marcaje.actions';
import { AppState } from './../app.reducers';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoOfflineService {

  constructor(private router: Router,
              private MensajesSwalService_: MensajesSwalService,
              private store: Store<AppState>,
              public http: HttpClient, 
              private rutasService_: RutasservidorService,
              public almacenamiento: LocalStorage) { }

uniq(a) {
   return Array.from(new Set(a));
}


  borrarRegistro(idTrabajador, id){
    this.almacenamiento.getItem(idTrabajador)
    .subscribe((data:any[]) => {
      data.splice(id, 1);
      this.almacenamiento.setItem(idTrabajador, data).subscribe(data => console.log(data))
    })
  }






  ingresarMarcaje(nuevoMarcaje, idTrabajador){

  		this.almacenamiento.getItem('idsIngresados').subscribe((data:any[]) => {
        console.log("Q es ids ingresados.......", data)
      			if(data === null){
      			  
      				this.almacenamiento.setItem('idsIngresados', new Array(idTrabajador))
              .subscribe( data6 => console.log("DATA DE SET ITEM Cuando no es null", data6) )	
      			
      			}else{	
    		  	  data.push(idTrabajador);
              this.almacenamiento.setItem('idsIngresados', this.uniq(data))
              .subscribe( data6 => console.log("DATA DE SET ITEM Cuando no es null", data6) )  

    			}
  		});



  	    this.almacenamiento.getItem(idTrabajador).subscribe((data1:any[]) => {
  	    	console.log("Q es data", data1)

           if(data1 !== null){

                     data1.push(nuevoMarcaje)
                     this.almacenamiento.setItem(idTrabajador, data1)
                      .subscribe((data2)=>{
                        console.log(data2);
                          this.MensajesSwalService_.mensajeStandar({
                                        titulo: 'Marcaje Ingresado',
                                        texto: '¡El movimiento de emergencia se realizó con éxito!',
                                        tipo: 'success',
                                        boton: 'Ok'
                                      });

                         this.router.navigate(['./Home'])
                      });
           }else{

                     this.almacenamiento.setItem(idTrabajador, new Array(nuevoMarcaje))
                          .subscribe((data3)=>{
                            console.log(data3);
                              this.MensajesSwalService_.mensajeStandar({
                                            titulo: 'Marcaje Ingresado',
                                            texto: '¡El movimiento de emergencia se realizó con éxito!',
                                            tipo: 'success',
                                            boton: 'Ok'
                                          });

                             this.router.navigate(['./Home'])
                          });
           }
        })
  }



}
