import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageUploadModule } from "angular2-image-upload";

// Angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
//import {MatMomentDateModule} from '@angular/material-moment-adapter';
 import {MatNativeDateModule} from '@angular/material';



// Angular maps
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

// rutas:
import { peo } from './app.routes';


// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

import { PerfilTrabajadorComponent } from './components/perfil-trabajador/perfil-trabajador.component';
import { TurnosVariablesComponent } from './components/perfil-trabajador/turnos-variables/turnos-variables.component';
import { TurnosFijosComponent } from './components/perfil-trabajador/turnos-fijos/turnos-fijos.component';
import { PerfilComponent } from './components/perfil-trabajador/perfil/perfil.component';
import { HistorialTurnosComponent } from './components/perfil-trabajador/historial-turnos/historial-turnos.component';
import { LiberarTurnosComponent } from './components/perfil-trabajador/liberar-turnos/liberar-turnos.component';
import { HomeComponent } from './components/home/home.component';
import { MarcajeComponent } from './components/perfil-trabajador/marcaje/marcaje.component';

import { LiberarSueldosComponent } from './components/perfil-trabajador/liberar-sueldos/liberar-sueldos.component';
import { HaberNoImponibleComponent } from './components/perfil-trabajador/haber-no-imponible/haber-no-imponible.component';
import { SueldosLiberadosComponent } from './components/perfil-trabajador/SueldosLiberados/SueldosLiberadosComponent.component';
import { ResumenComponent } from './components/perfil-trabajador/resumen/resumen.component';
import { VisualizacionLiquidacionesComponent } from './components/perfil-trabajador/visualizacion-liquidaciones/visualizacion-liquidaciones.component';
import { ActualizarTurnosFijosComponent } from './components/perfil-trabajador/actualizar-turnos-fijos/actualizar-turnos-fijos.component';
import { Paso1Component } from './components/ProcesoMarcaje/paso1/paso1.component';




// servicios

import { IngresoUsuarioServidorService } from './services/ingreso-usuario-servidor.service';
import { LoginservicesService } from './services/loginservices.service';
import { RutasservidorService } from './services/rutasservidor.service';
import { PlanillaservicesService } from './services/planillaservices.service';
import { PerfilTrabajadorServiceService } from './services/perfil-trabajador-service.service';
import { LiberarTurnosService } from './services/liberar-turnos.service';

import { GuardarSucursalService } from './services/guardar-sucursal.service';
import { MarcajeServiceService } from './services/marcaje-service.service';
import { AppService } from './app.service';
import { SueldosService } from './services/sueldos.service';
import { MensajesSwalService } from './services/mensajes-swal.service';
import { LibroremuneracionesService } from './services/libroremuneraciones.service';
import { GeolocalizacionService } from './services/geolocalizacion.service';

//Pipes
import { EntradaosalidaPipe } from './pipes/entradaosalida.pipe';
import { NombreDelDiaDelMesPipe } from './pipes/nombre-del-dia-del-mes.pipe';
import { getHoraPipe } from './pipes/getHoraPipe.pipe';
import { getDiaPipe } from './pipes/getDia.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,

    PerfilTrabajadorComponent,
    TurnosVariablesComponent,
    TurnosFijosComponent,
    PerfilComponent,
    HistorialTurnosComponent,
    LiberarTurnosComponent,
    EntradaosalidaPipe,
    NombreDelDiaDelMesPipe,
    getHoraPipe,
    getDiaPipe,
    HomeComponent,
    MarcajeComponent,
 
    LiberarSueldosComponent,
    HaberNoImponibleComponent,
    SueldosLiberadosComponent,
    ResumenComponent,
    VisualizacionLiquidacionesComponent,
    ActualizarTurnosFijosComponent,
    Paso1Component,

  ],
  imports: [
    BrowserModule,
    peo,
    FormsModule,
    ImageUploadModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
  
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNSFFyJn6a_AIm44b_7atfg_ml4NI6ReY'
    })
  ],
  providers: [
              IngresoUsuarioServidorService,
              LoginservicesService,
              RutasservidorService,
              PlanillaservicesService,
              PerfilTrabajadorServiceService,
              LiberarTurnosService,
              GoogleMapsAPIWrapper,
              GuardarSucursalService,
              MarcajeServiceService,
              AppService,
              
              SueldosService,
              MensajesSwalService,
              LibroremuneracionesService,
              GeolocalizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
