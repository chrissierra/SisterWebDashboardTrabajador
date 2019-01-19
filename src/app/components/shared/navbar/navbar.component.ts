import { Component, OnInit } from '@angular/core';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(	public Router_: Router,
  				private MensajesSwalService_: MensajesSwalService) { }

  ngOnInit() {
  }


  logout(){
  	this.MensajesSwalService_.mensajePromesa('Cerrar Sesión', '¿ Realmente deseas salir de tu sesión?', 'warning', 'Si. Deseo Cerrar Sesión')
  	.then( data => {
  		if(data.value) this.BorrarRegistro();
  	} )
  } // Fin función logout


  BorrarRegistro(){
  	localStorage.clear();
  	this.Router_.navigate(['./Login'])
  }

}
