import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-empleador',
  templateUrl: './perfil-empleador.component.html'
})
export class PerfilEmpleadorComponent implements OnInit {


  nombre:string;
  constructor() {
     this.nombre = localStorage.getItem('nombre_rep');

   }

  ngOnInit() {
  }

}
