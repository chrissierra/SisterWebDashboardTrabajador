import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { IngresaComponent } from './components/ingresa/ingresa.component';
const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Ingresa', component: IngresaComponent },
  { path: 'Home', component: HomeComponent },
 { path: '**', component: LoginComponent }
];

export const peo=  RouterModule.forRoot(routes)


