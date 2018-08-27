import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

rut_empresa: string = localStorage.getItem('rut_empresa');
nombre_empresa: string = localStorage.getItem('nombre_empresa');
nombre_rep: string = localStorage.getItem('nombre_rep');

constructor() {

    this.rut_empresa = localStorage.getItem('rut_empresa');

   }

  ngOnInit() {
  }

}
