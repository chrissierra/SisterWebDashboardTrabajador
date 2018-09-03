import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
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



import { DashBoardComponent } from './components/dashboard/dash-board/dash-board.component';
import { PerfilEmpleadorComponent } from './components/dashboard/perfil-empleador/perfil-empleador.component';
import { IngresoSucursalComponent } from './components/dashboard/ingreso-sucursal/ingreso-sucursal.component';
import { ReportesComponent } from './components/dashboard/reportes/reportes.component';
import { MarcajeComponent } from './components/perfil-trabajador/marcaje/marcaje.component';
import { SueldosComponent } from './components/dashboard/sueldos/sueldos.component';
import { LiberarSueldosComponent } from './components/perfil-trabajador/liberar-sueldos/liberar-sueldos.component';

import { HaberNoImponibleComponent } from './components/perfil-trabajador/haber-no-imponible/haber-no-imponible.component';
import { DescuentosComponent } from './components/perfil-trabajador/descuentos/descuentos.component';
import { ResumenComponent } from './components/perfil-trabajador/resumen/resumen.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'DashBoard', component: DashBoardComponent, children: [
   
    { path: 'PerfilEmpleador' , component: PerfilEmpleadorComponent},
    { path: 'IngresoSucursal' , component: IngresoSucursalComponent},
    { path: 'SueldosComponent' , component: SueldosComponent},
    { path: 'Reportes' , component: ReportesComponent},
    { path: '**', component: PerfilEmpleadorComponent }

  ] },
  { path: 'Planilla', component: PlanillaComponent },
  { path: 'PerfilTrabajador/:id', component: PerfilTrabajadorComponent, children:[
  		{ path: 'Perfil' , component: PerfilComponent},
		  { path: 'TurnosVariables' , component: TurnosVariablesComponent},
		  { path: 'TurnosFijos' , component: TurnosFijosComponent},
      { path: 'Marcaje' , component: MarcajeComponent},

      { path: 'HaberNoImponible' , component: HaberNoImponibleComponent},
		  { path: 'Descuentos' , component: DescuentosComponent},
      { path: 'Resumen' , component: ResumenComponent},

      { path: 'LiberarSueldos' , component: LiberarSueldosComponent},
      { path: 'HistorialTurnos' , component: HistorialTurnosComponent},
      { path: 'LiberarTurnos/:mes/:anio' , component: LiberarTurnosComponent},
  ] },
  { path: 'Ingresa', component: IngresaComponent, children: [

{ path: 'paso1' , component: PasounoComponent},
{ path: 'paso2' , component: PasodosComponent},
{ path: 'paso3' , component: PasotresComponent},
  ]
   },
 { path: 'Home', component: HomeComponent },
 { path: '**', component: LoginComponent }
];

export const peo =  RouterModule.forRoot(routes);


