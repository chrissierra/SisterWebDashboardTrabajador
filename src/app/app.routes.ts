import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


// Guard
import { AuthGuard } from './services/auth.guard';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';



import { PerfilTrabajadorComponent } from './components/perfil-trabajador/perfil-trabajador.component';

import { TurnosFijosComponent } from './components/perfil-trabajador/turnos-fijos/turnos-fijos.component';
import { PerfilComponent } from './components/perfil-trabajador/perfil/perfil.component';
import { HistorialTurnosComponent } from './components/perfil-trabajador/historial-turnos/historial-turnos.component';
import { LiberarTurnosComponent } from './components/perfil-trabajador/liberar-turnos/liberar-turnos.component';



import { MarcajeComponent } from './components/perfil-trabajador/marcaje/marcaje.component';

import { LiberarSueldosComponent } from './components/perfil-trabajador/liberar-sueldos/liberar-sueldos.component';

import { HaberNoImponibleComponent } from './components/perfil-trabajador/haber-no-imponible/haber-no-imponible.component';
import { SueldosLiberadosComponent } from './components/perfil-trabajador/SueldosLiberados/SueldosLiberadosComponent.component';
import { ResumenComponent } from './components/perfil-trabajador/resumen/resumen.component';
import { ActualizarTurnosFijosComponent } from './components/perfil-trabajador/actualizar-turnos-fijos/actualizar-turnos-fijos.component';

import { Paso1Component } from './components/ProcesoMarcaje/paso1/paso1.component';
import { Paso2Component } from './components/ProcesoMarcaje/paso2/paso2.component';
import { ProcesoMarcajeSucursalComponent } from './components/proceso-marcaje-sucursal/proceso-marcaje-sucursal.component';

import { Paso1sComponent } from './components/proceso-marcaje-sucursal/paso1/paso1s.component';
import { Paso2sComponent } from './components/proceso-marcaje-sucursal/paso2/paso2s.component';


import { Paso1HitoComponent } from './components/Hitos/paso1/paso1h.component';
import { Paso2HitoComponent } from './components/Hitos/paso2/paso2h.component';
import { Paso3HitoComponent } from './components/Hitos/paso3/paso3h.component';
import { Paso1TurnoExtraComponent } from './components/proceso-marcaje-sucursal/paso1-turno-extra/paso1-turno-extra.component';
import { Paso2TurnoExtraComponent } from './components/proceso-marcaje-sucursal/paso2-turno-extra/paso2-turno-extra.component';

import { LibroAsistenciaComponent } from './components/libro-asistencia/libro-asistencia.component';

import { Paso1ViaticosComponent } from './components/viaticos/paso1-viaticos/paso1-viaticos.component';
import { Paso2ViaticosComponent } from './components/viaticos/paso2-viaticos/paso2-viaticos.component';
import { Paso3ViaticosComponent } from './components/viaticos/paso3-viaticos/paso3-viaticos.component';
import { Paso1OfflineComponent } from './components/proceso-marcaje-sucursal/paso1-offline/paso1-offline.component';
const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'PerfilTrabajador/:id', component: PerfilTrabajadorComponent, children:[
  		{ path: 'Perfil' , component: PerfilComponent},
		  { path: 'TurnosFijos' , component: TurnosFijosComponent},
      { path: 'Marcaje' , component: MarcajeComponent},
      { path: 'ActualizarTurnosFijos', component: ActualizarTurnosFijosComponent },
      { path: 'HaberNoImponible' , component: HaberNoImponibleComponent},
		  { path: 'SueldosLiberados' , component: SueldosLiberadosComponent},
      { path: 'Resumen' , component: ResumenComponent},
      { path: 'LiberarSueldos' , component: LiberarSueldosComponent},
      { path: 'HistorialTurnos' , component: HistorialTurnosComponent},
      { path: 'LiberarTurnos/:mes/:anio' , component: LiberarTurnosComponent},
  ] },
 { path: 'Home', component: HomeComponent, canActivate: [ AuthGuard ] },
 { path: 'ProcesoMarcaje', component: Paso1Component, canActivate: [ AuthGuard ] },
 { path: 'Paso1Hito', component: Paso1HitoComponent , canActivate: [ AuthGuard ]},
 { path: 'Paso2Hito', component: Paso2HitoComponent , canActivate: [ AuthGuard ]},
 { path: 'Paso3Hito', component: Paso3HitoComponent , canActivate: [ AuthGuard ]},
 { path: 'ProcesoMarcajeSucursal', component: ProcesoMarcajeSucursalComponent, canActivate: [ AuthGuard ] },
 { path: 'Paso1s/:id/:rut', component: Paso1sComponent, canActivate: [ AuthGuard ] },
 { path: 'Paso2s/:coeficiente', component: Paso2sComponent, canActivate: [ AuthGuard ] },
 { path: 'Paso1TurnoExtra/:id/:rut', component: Paso1TurnoExtraComponent, canActivate: [ AuthGuard ] },
 { path: 'Paso2TurnoExtra/:coeficiente', component: Paso2TurnoExtraComponent, canActivate: [ AuthGuard ] },
 { path: 'ProcesoMarcajePaso2/:coeficiente', component: Paso2Component, canActivate: [ AuthGuard ] }, 
  { path: 'Paso1Offline', component: Paso1OfflineComponent, canActivate: [ AuthGuard ] }, 
 
 { path: 'Paso1Viaticos', component: Paso1ViaticosComponent }, 
 { path: 'Paso2Viaticos', component: Paso2ViaticosComponent }, 
 { path: 'Paso3Viaticos', component: Paso3ViaticosComponent }, 

 { path: 'LibroAsistencia', component: LibroAsistenciaComponent }, 
 { path: '**', component: LoginComponent }
];

export const peo =  RouterModule.forRoot(routes);


