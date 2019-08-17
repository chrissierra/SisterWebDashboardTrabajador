import { Component } from '@angular/core';
import { PlanillaservicesService } from '../../services/planillaservices.service';
import { PerfilTrabajadorServiceService } from '../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../marcaje.actions';
import { AppState } from './../../app.reducers';
import { Observable, from, of } from 'rxjs';
import { map, distinct } from 'rxjs/operators';
@Component({
  selector: 'app-proceso-marcaje-sucursal',
  templateUrl: './proceso-marcaje-sucursal.component.html',
  styleUrls: ['./proceso-marcaje-sucursal.component.css']
})
export class ProcesoMarcajeSucursalComponent {

  public loading:boolean = true;
  public selectedPersonId:any;
  public arrayNombres:any[];
  public empleados: any[]=[];
  public empleadoSeleccionado:any;
  public buscador: any;
  public booleanBuscado:boolean = false;
  public Sucursales:any;
  public name:any;
  public url:any;
  public nombreSeleccion:any='';
  public apellidoSeleccion:any='';
  public sucursales:any = [];
  public filtro_por_sucursal:string;
  public datos: any;

  constructor(private PerfilTrabajadorServiceService_: PerfilTrabajadorServiceService, 
              private store: Store<AppState>,
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

            this.sucursales = data.map( valor => { 
                      console.log("valor.sucursal_nombre === undefined", valor.sucursal_nombre === undefined)
                      if(valor.sucursal_nombre === null){
                          console.log("En primera parte if", valor.sucursal_nombre)
                          console.log("En primera parte if",valor.sucursal_nombre === null)
                      }else{
                          console.log("En else", valor.sucursal_nombre)
                          console.log("En else",valor.sucursal_nombre === null)
                          return valor.sucursal_nombre
                      }
               
                })

            this.sucursales = this.getUniqueArray(this.sucursales);

            this.sucursales = this.sucursales.filter( (valor) => valor !== undefined )
            
            this.sucursales.unshift('Selecciona')
             			  
  			    //this.empleados = data;

            this.datos = data;
  
            this.url = "https://sister.cl/clientes_rrhh/"+ this.Sucursales.rut + "/registro/" + this.Sucursales.rut + ".jpg"
  
            setTimeout( () => {
              this.loading = false;
            }, 900 )

			},(error)=>{
              setTimeout( () => {
                  this.loading = false;
                }, 900 )
      });

   } // Fin constructor


   getUniqueArray(array){
      var result = [];
      for(var x = 0; x < array.length; x++){
      if(result.indexOf(array[x]) == -1)
            result.push(array[x]);
      }
      return result;
    }


  IrPaso1s(empleado){
			//alert("asdf")
      console.log("Empleado desde función", empleado['nombre'] + ' ' + empleado['apellido']);

      localStorage.setItem('informacionPersonalTrabajador', JSON.stringify(empleado));

      let nombreCompleto = empleado['nombre'] + ' ' + empleado['apellido'];

      const accion = new fromMarcaje.ACTUALIZARNOMBRETRABAJADORAction(nombreCompleto);
      this.store.dispatch( accion );
      
      console.log("Verificando que efectivamente desde sucursal se guarda el ID en estate, el valor de empleado['id'] es: ", empleado['id'])

      const accion1 = new fromMarcaje.ACTUALIZARIDAction(empleado['id']);
      this.store.dispatch( accion1 );
        //[routerLink]="['/Paso1s',  empleados.id,  empleados.rut]"
      this.router.navigate(['./Paso1s/'+empleado.id+'/'+ empleado.rut]);
   
  }


   onChangeSelect(evento, dom_select){

     this.empleados = [];

     this.filtro_por_sucursal = dom_select.value;

     this.datos.map((valor:any[]) => {

       if(valor['sucursal_nombre'] === this.filtro_por_sucursal){
         
           console.log(valor)

           //this.PerfilTrabajadorServiceService_.getContrasteFotograficoValidacion(valor['id'])
           //.subscribe( data => console.log(data) )
         
           this.empleados.push(valor)
       }
     })


     /*
      TODO:
      1- request http para ver si los trabajadores acá seleccionados tienen validada la imagen. Si no está validada que rediriga a otra ventana. 
      2- En la segunda ventana se debe abrir un canvas para una selfie y enviar como subiendo foto igual que en sister cliente.
      3- Luego, seguido; enviar para contrastar como si estuviera marcando. 

     */

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
