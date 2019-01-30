import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcajeServiceService } from '../../services/marcaje-service.service';
import swal from 'sweetalert2'
import { DeviceDetectorService } from 'ngx-device-detector';
import { Store } from '@ngrx/store';
import * as fromMarcaje from './../marcaje.actions';
import { AppState } from './../../app.reducers';
import { MensajesSwalService } from './../../services/mensajes-swal.service';
import { IndexeddbService } from './../../services/indexeddb.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public boleanoTurnoFijo:boolean;
  public boleanoHitos:boolean=false;
  public boleanoTurnoExtra:boolean = false;
  public boleanoTurnoExtraEnCurso:boolean = false;
  public boleanoTurnoNormalEnCurso:boolean=false;
  public deviceInfo = null;
  public datosTrabajador: string = localStorage.getItem('rut_empresa');
  public id:any;
  public datosMarcaje:Marcaje;
  public rut_empresa:any;
  public url:any;
  public avisoTurnoExtra:any;
  public rut:any;

  //
      databaseCreated: boolean;
      postPerformed: boolean;
      allUsers: any[];
      allOrdersBeforeUpdate: any[];
      allOrdersAfterUpdate: any[];
constructor(public idbService: IndexeddbService,
            private MensajesSwalService_: MensajesSwalService,
            private store: Store<AppState>,
            private deviceService: DeviceDetectorService,
			      private snackBar: MatSnackBar, 
            private perfilServicio_ : PerfilTrabajadorServiceService, 
            public MarcajeServiceService: MarcajeServiceService,
            private param: ActivatedRoute, 
            private router : Router) {

	  this.detectDevice();
    
    this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));
    this.boleanoTurnoFijo = ( this.datosTrabajador['horario_con_o_sin_turnos'] === 'Turnos' ) ? false : true;
    this.rut = this.datosTrabajador['rut']
    this.rut_empresa = this.datosTrabajador['rut_empresa']
    this.url = "https://sister.cl/clientes_rrhh/"+ this.rut_empresa + "/registro/" + this.rut_empresa + ".jpg"
    if(this.datosTrabajador['rol'] === 'cliente'){
        this.router.navigate(['./ProcesoMarcajeSucursal']);
    }else{
      console.log(this.datosTrabajador['rol'])
    }

	  this.id = {
              'id':	this.datosTrabajador['id']
              };

                


                this.MarcajeServiceService.situacion_marcaje( JSON.stringify(this.id) ).subscribe( data => {
                   
                     if(data['TipoTurno'] === 'Noches') this.MarcajeServiceService.horas_eys_noche(data);
        console.log("this.MarcajeServiceService.hora_esperada_salida", this.MarcajeServiceService.hora_esperada_salida);
        console.log("this.MarcajeServiceService.hora_esperada_entrada", this.MarcajeServiceService.hora_esperada_entrada);
                     this.datosMarcaje = {
                     					content: data
                     					}

                       this.SetBoleanosTemplate(this.datosMarcaje);        

                      console.log("Datos del marcaje.. " ,this.datosMarcaje)

                });
   
        this.setNombreStore();
        this.TestIndex()
       
   } // Fin constructor

public SetBoleanosTemplate(datosMarcaje){

   if(datosMarcaje.content['Entrada'] !== 0 && datosMarcaje.content['Salida']=== 0){
       this.boleanoHitos =true;
       this.boleanoTurnoNormalEnCurso =true;
     } 

   if(datosMarcaje.content['Entrada'] === 0 && datosMarcaje.content['Salida']=== 0) this.boleanoTurnoExtra =true;
   if(datosMarcaje.content['Entrada'] !== 0 && datosMarcaje.content['Salida']!== 0) this.boleanoTurnoExtra =true;
   if(datosMarcaje.content['TurnoExtraEnCurso'] === 1){
            this.avisoTurnoExtra = 'Estás en un turno extra en curso.';
            this.boleanoTurnoExtraEnCurso =true;
            this.boleanoHitos =true;
    } 
}  




 public detectDevice() {
    this.deviceInfo = this.deviceService.isMobile();    
    console.log( this.deviceService.getDeviceInfo())
    console.log(this.deviceService.isMobile())
  } // Fin detectDevice


    irHitos(){
    this.router.navigate(['./Paso1Hito']);
  }

 
  setNombreStore(){
        let nombreCompleto = this.datosTrabajador['nombre'] + ' ' +  this.datosTrabajador['apellido'];
        const accion = new fromMarcaje.ACTUALIZARNOMBRETRABAJADORAction(nombreCompleto);
        this.store.dispatch( accion );

        const accion2 = new fromMarcaje.ACTUALIZARNOMBREEMPRESAAction(this.datosTrabajador['nombre_empresa_usuario_plataforma']);
        this.store.dispatch( accion2 );

        const accion3 = new fromMarcaje.ACTUALIZARIDAction(this.datosTrabajador['id']);
        this.store.dispatch( accion3 );
  }



  irTurnosExtras(){
    if(this.datosMarcaje.content['TurnoExtraEnCurso'] === 1) return this.router.navigate(['./Paso1TurnoExtra',this.datosTrabajador['id'], this.rut]);
  this.MensajesSwalService_.mensajePromesa('Atención', 'Los turnos extras deberán ser validados luego por tu Jefatura o supervisor.','warning', 'Quiero marcar Turno Extra')
  .then( result => {
    console.log("resuilt", result);
    if(result.value) this.router.navigate(['./Paso1TurnoExtra',this.datosTrabajador['id'], this.rut]);
  } )
  } // Fin irturnosextras




TestIndex(){


  
        let storesSchemaAndSeeds = [
            {
                name: 'marcajes',
                indexes: ['id_trabajador', 'movimiento', 'coeficiente'],
                seeds: [{ name: "Phone 7", price: 210.00, user: "John" }, { name: "Phone 8", price: 210.00, user: "Helenam" }]
            },
        ];
         
        // Create the IndexedDB database and perform few operations.
        let self = this;
        
        this.idbService.setName('db');
       
        this.idbService.create(storesSchemaAndSeeds).subscribe(done => {});
       

    }

    enboton(){

              // Create the IndexedDB database and perform few operations.
        let self = this;

        let newOrder = {    id_trabajador: "alksdkajlsdfjkasdfjlkasdfljkasdflkjasfdlkj9", 
                            movimiento: 910.00, 
                            coeficiente: "John",
                            url:"https://sister.cl",
                            Sucursal:"locacion",
                            locacion:"2",
                            biometrica:1,
                            hora_esperada:"NA"

                       };
        
        this.idbService
                    .post('marcajes', newOrder)
                    .subscribe((res: any) => {
                        self.idbService.all('marcajes').subscribe(marcajes => console.log(marcajes) );
        });

    }


        enboton2(){

              // Create the IndexedDB database and perform few operations.
        let self = this;
       
        this.idbService.all('marcajes')
        .subscribe( data => {
          console.log("Datos... " , data)
        } )

    }





}




// Interface Marcaje

interface Marcaje {
  content: any; 
}