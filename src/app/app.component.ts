import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar } from '@angular/material';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public snack:any;
	
	constructor(public almacenamiento: LocalStorage,
				public snackBar: MatSnackBar,
				private connectionService: ConnectionService){

			this.almacenamiento.setItem("InicioBD", {estado: 'ok'}).subscribe( data => console.log(data) );
		    this.connectionService.monitor().subscribe(isConnected => {
		      
		      if (isConnected) {
		       // "ONLINE";
		       this.avisoConexion()

		      }
		      else {
		        // "OFFLINE";
		        this.avisoSinConexion()

		      }
		    })
	}
  title = 'app';

  private avisoSinConexion(){
  	localStorage.setItem('AvisoSinConexion', 'true')
  	this.snack = this.snackBar.open(`¡Cuidado! Estás sin conexión.`);

  }


  private avisoConexion(){
  	localStorage.setItem('AvisoSinConexion', 'false')
  	this.snack.dismiss()
  	this.snackBar.open('¡Excelente! Volviste a conectarte', 'Ok', {
	  duration: 1000
	});
  }
 

}


