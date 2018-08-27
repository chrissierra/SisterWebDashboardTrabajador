import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';


// rutas:
import { peo } from './app.routes';


// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { IngresaComponent } from './components/ingresa/ingresa.component';
import { PasounoComponent } from './components/ingresa/pasos/pasouno/pasouno.component';
import { PasodosComponent } from './components/ingresa/pasos/pasodos/pasodos.component';
import { PasotresComponent } from './components/ingresa/pasos/pasotres/pasotres.component';
import { PlanillaComponent } from './components/planilla/planilla.component';
import { PerfilTrabajadorComponent } from './components/perfil-trabajador/perfil-trabajador.component';
import { TurnosVariablesComponent } from './components/perfil-trabajador/turnos-variables/turnos-variables.component';
import { TurnosFijosComponent } from './components/perfil-trabajador/turnos-fijos/turnos-fijos.component';
import { PerfilComponent } from './components/perfil-trabajador/perfil/perfil.component';
import { HistorialTurnosComponent } from './components/perfil-trabajador/historial-turnos/historial-turnos.component';
import { LiberarTurnosComponent } from './components/perfil-trabajador/liberar-turnos/liberar-turnos.component';


// servicios
import { EmpleadoService } from './components/ingresa/interfaces/empleado.service';
import { IngresoUsuarioServidorService } from './services/ingreso-usuario-servidor.service';
import { LoginservicesService } from './services/loginservices.service';
import { RutasservidorService } from './services/rutasservidor.service';
import { PlanillaservicesService } from './services/planillaservices.service';
import { PerfilTrabajadorServiceService } from './services/perfil-trabajador-service.service';
import { LiberarTurnosService } from './services/liberar-turnos.service';
import { EntradaosalidaPipe } from './pipes/entradaosalida.pipe';
import { NombreDelDiaDelMesPipe } from './pipes/nombre-del-dia-del-mes.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    IngresaComponent,
    PasounoComponent,
    PasodosComponent,
    PasotresComponent,
    PlanillaComponent,
    PerfilTrabajadorComponent,
    TurnosVariablesComponent,
    TurnosFijosComponent,
    PerfilComponent,
    HistorialTurnosComponent,
    LiberarTurnosComponent,
    EntradaosalidaPipe,
    NombreDelDiaDelMesPipe
  ],
  imports: [
    BrowserModule,
    peo,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [EmpleadoService,
              IngresoUsuarioServidorService,
              LoginservicesService,
              RutasservidorService,
              PlanillaservicesService,
              PerfilTrabajadorServiceService,
              LiberarTurnosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
