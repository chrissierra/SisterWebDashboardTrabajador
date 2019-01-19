import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//import { ImageUploadModule } from "angular2-image-upload";

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

//Loader
import { NgxLoadingModule } from 'ngx-loading';

// ngrx
import { StoreModule } from '@ngrx/store';
import { MarcajeReducer } from './components/marcaje.reducer';
// Angular maps
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

// rutas:
import { peo } from './app.routes';


// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

import { PerfilTrabajadorComponent } from './components/perfil-trabajador/perfil-trabajador.component';
import { TurnosVariablesComponent } from './components/turnos-variables/turnos-variables.component';
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
import { Paso2Component } from './components/ProcesoMarcaje/paso2/paso2.component';
import { Paso1HitoComponent } from './components/Hitos/paso1/paso1h.component';
import { Paso2HitoComponent } from './components/Hitos/paso2/paso2h.component';
import { Paso3HitoComponent } from './components/Hitos/paso3/paso3h.component';
import { Paso1sComponent } from './components/proceso-marcaje-sucursal/paso1/paso1s.component';
import { Paso2sComponent } from './components/proceso-marcaje-sucursal/paso2/paso2s.component';
import { Paso1TurnoExtraComponent } from './components/proceso-marcaje-sucursal/paso1-turno-extra/paso1-turno-extra.component';
import { Paso2TurnoExtraComponent } from './components/proceso-marcaje-sucursal/paso2-turno-extra/paso2-turno-extra.component';




// servicios
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from './services/auth.guard';


import { IngresoUsuarioServidorService } from './services/ingreso-usuario-servidor.service';
import { LoginservicesService } from './services/loginservices.service';
import { RutasservidorService } from './services/rutasservidor.service';
import { PlanillaservicesService } from './services/planillaservices.service';
import { PerfilTrabajadorServiceService } from './services/perfil-trabajador-service.service';
import { LiberarTurnosService } from './services/liberar-turnos.service';
import { HitosService } from './services/hitos.service';
import { GuardarSucursalService } from './services/guardar-sucursal.service';
import { MarcajeServiceService } from './services/marcaje-service.service';
import { AppService } from './app.service';
import { SueldosService } from './services/sueldos.service';
import { MensajesSwalService } from './services/mensajes-swal.service';
import { LibroremuneracionesService } from './services/libroremuneraciones.service';
import { GeolocalizacionService } from './services/geolocalizacion.service';
import { MandantesService } from './services/mandantes.service';
import { ViaticosService } from './services/viaticos.service';
//Pipes
import { EntradaosalidaPipe } from './pipes/entradaosalida.pipe';
import { NombreDelDiaDelMesPipe } from './pipes/nombre-del-dia-del-mes.pipe';
import { getHoraPipe } from './pipes/getHoraPipe.pipe';
import { getDiaPipe } from './pipes/getDia.pipe';
import { SelectSucursalesComponent } from './components/shared/select-sucursales/select-sucursales.component';
import { ProcesoMarcajeSucursalComponent } from './components/proceso-marcaje-sucursal/proceso-marcaje-sucursal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


import { UploadComponent } from './components/shared/upload/upload.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import { LibroAsistenciaComponent } from './components/libro-asistencia/libro-asistencia.component';
import { TurnosTrabajadorComponent } from './components/turnos-trabajador/turnos-trabajador.component';
import { TurnosNocheComponent } from './components/turnos-noche/turnos-noche.component';
import { Paso1ViaticosComponent } from './components/viaticos/paso1-viaticos/paso1-viaticos.component';
import { Paso2ViaticosComponent } from './components/viaticos/paso2-viaticos/paso2-viaticos.component';
import { Paso3ViaticosComponent } from './components/viaticos/paso3-viaticos/paso3-viaticos.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@NgModule({
  declarations: [
    UploadComponent,
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
    Paso1sComponent,
    Paso2sComponent,
    LiberarSueldosComponent,
    HaberNoImponibleComponent,
    SueldosLiberadosComponent,
    ResumenComponent,
    VisualizacionLiquidacionesComponent,
    ActualizarTurnosFijosComponent,
    Paso1Component,
    Paso2Component,
    SelectSucursalesComponent,
    ProcesoMarcajeSucursalComponent,
    Paso1HitoComponent,
    Paso2HitoComponent,
    Paso3HitoComponent,
    Paso1TurnoExtraComponent,
    Paso2TurnoExtraComponent,
    LibroAsistenciaComponent,
    TurnosTrabajadorComponent,
    TurnosNocheComponent,
    Paso1ViaticosComponent,
    Paso2ViaticosComponent,
    Paso3ViaticosComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ marcaje: MarcajeReducer }),
    peo,
    DeviceDetectorModule.forRoot(),
    FormsModule,
   
    NgxLoadingModule.forRoot({}),
    NgSelectModule,
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
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
              IngresoUsuarioServidorService,
              LoginservicesService,
              RutasservidorService,
              PlanillaservicesService,
              PerfilTrabajadorServiceService,
              LiberarTurnosService,
              GoogleMapsAPIWrapper,
              ViaticosService,
              GuardarSucursalService,
              MarcajeServiceService,
              HitosService,
              AppService,
              MandantesService,
              SueldosService,
              MensajesSwalService,
              LibroremuneracionesService,
              GeolocalizacionService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
