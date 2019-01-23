import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public snack:any;
	constructor(
				public snackBar: MatSnackBar,
				private connectionService: ConnectionService){

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
  	this.snack = this.snackBar.open(`¡Cuidado! Estás sin conexión.
  	 Puede haber errores en el proceso si no tienes internet, asegurate de conectarte adecuadamente.`);

  }


  private avisoConexion(){
  	this.snack.dismiss()
  	this.snackBar.open('¡Excelente! Volviste a conectarte', 'Ok', {
	  duration: 1000
	});
  }
 

}


