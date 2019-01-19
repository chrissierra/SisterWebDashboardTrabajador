import { Component } from '@angular/core';
import { PlanillaservicesService } from '../../services/planillaservices.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../marcaje.actions';
import { AppState } from './../../app.reducers';

@Component({
  selector: 'app-proceso-marcaje-sucursal',
  templateUrl: './proceso-marcaje-sucursal.component.html',
  styleUrls: ['./proceso-marcaje-sucursal.component.css']
})
export class ProcesoMarcajeSucursalComponent {
public loading:boolean = true;
public selectedPersonId:any;
public arrayNombres:any[];
empleados: any;
public empleadoSeleccionado:any;
buscador: any;
public booleanBuscado:boolean = false;
Sucursales:any;
name:any;
url:any;
public nombreSeleccion:any='';
public apellidoSeleccion:any='';
  constructor(private store: Store<AppState>,
              private planillaServicio_: PlanillaservicesService,
              private router : Router) {

  		this.Sucursales = JSON.parse(localStorage.getItem('datosTrabajador'));

      const accion = new fromMarcaje.ACTUALIZARNOMBREEMPRESAAction(this.Sucursales.nombre_empresa)
      this.store.dispatch( accion );

        if(this.Sucursales['rol'] !== 'cliente'){
            this.router.navigate(['./Home']);
        } 

			this.planillaServicio_.obtener_planilla(this.Sucursales.nombre_empresa).subscribe(( data: any[]) => {
      
        this.arrayNombres = data;
			console.log('data', data);
			
			this.empleados = data;

      this.url = "https://sister.cl/clientes_rrhh/"+ this.Sucursales.rut + "/registro/" + this.Sucursales.rut + ".jpg"

      setTimeout( () => {
        this.loading = false;
      }, 900 )

			});

   } // Fin constructor


  IrPaso1s(empleado){
			//alert("asdf")
      console.log("Empleado desde función", empleado['nombre'] + ' ' + empleado['apellido']);

        let nombreCompleto = empleado['nombre'] + ' ' + empleado['apellido'];

        const accion = new fromMarcaje.ACTUALIZARNOMBRETRABAJADORAction(nombreCompleto);
        this.store.dispatch( accion );
        
        console.log("Verificando que efectivamente desde sucursal se guarda el ID en estate, el valor de empleado['id'] es: ", empleado['id'])

        const accion1 = new fromMarcaje.ACTUALIZARIDAction(empleado['id']);
        this.store.dispatch( accion1 );
        //[routerLink]="['/Paso1s',  empleados.id,  empleados.rut]"
       this.router.navigate(['./Paso1s/'+empleado.id+'/'+ empleado.rut]);

      


  }



  onChange(e){
  	//alert(e)
    console.log(e)
    
    if(e === undefined) {
      this.booleanBuscado = false;
    }else{
      this.nombreSeleccion = e.nombre;
      this.apellidoSeleccion = e.apellido;
      
      this.booleanBuscado = true;
      this.empleadoSeleccionado  = e; 
    }

  }

}
