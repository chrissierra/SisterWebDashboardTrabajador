import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// rutas:
import { peo } from './app.routes';


// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { IngresaComponent } from './components/ingresa/ingresa.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    IngresaComponent
  ],
  imports: [
    BrowserModule,
    peo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
