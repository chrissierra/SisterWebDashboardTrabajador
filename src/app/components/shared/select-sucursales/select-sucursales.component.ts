import { Component } from '@angular/core';
import { GuardarSucursalService } from '../../../services/guardar-sucursal.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
@Component({
  selector: 'app-select-sucursales',
  templateUrl: './select-sucursales.component.html',
  styleUrls: ['./select-sucursales.component.css']
})
export class SelectSucursalesComponent {
	
	datosTrabajador:any;
	sucursales:any;
	SucursalElegida:any;
  nombreEmpresa:any;
  constructor(	private GuardarSucursalService_: GuardarSucursalService,
  				      private store: Store<AppState>) 
  { 
  		this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
     
      if(!this.datosTrabajador.nombre_empresa_usuario_plataforma){
        
        this.nombreEmpresa = this.datosTrabajador.nombre_empresa;

      }else{
        
        this.nombreEmpresa = this.datosTrabajador.nombre_empresa_usuario_plataforma;

      } 
  		this.getSucursal();

  }



  getSucursal(){
		this.GuardarSucursalService_.get_sucursales_servidor(JSON.stringify({usuario:  this.nombreEmpresa }))
		.subscribe( data => {
			console.log(data)
			this.sucursales = data;
      localStorage.setItem("sucursalesLocalStorage", JSON.stringify(data))
		}, (error) => {
      console.log(error)
      this.sucursales = JSON.parse(localStorage.getItem("sucursalesLocalStorage"));
    } )
	} // Fin GetSucursal

	onChange(e, select){
		console.log("evento..", e)
    	console.log("select..", select)
    	console.log("SucursalElegida", this.SucursalElegida)
    	const accion = new fromMarcaje.ACTUALIZARSUCURSALAction(this.SucursalElegida);
    	this.store.dispatch( accion );

	}

}
