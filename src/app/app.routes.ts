import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';



import { PerfilTrabajadorComponent } from './components/perfil-trabajador/perfil-trabajador.component';

import { TurnosVariablesComponent } from './components/perfil-trabajador/turnos-variables/turnos-variables.component';
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


const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'PerfilTrabajador/:id', component: PerfilTrabajadorComponent, children:[
  		{ path: 'Perfil' , component: PerfilComponent},
		  { path: 'TurnosVariables' , component: TurnosVariablesComponent},
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
 { path: 'Home', component: HomeComponent },
 { path: 'ProcesoMarcaje', component: Paso1Component },
 { path: '**', component: LoginComponent }
];

export const peo =  RouterModule.forRoot(routes);


