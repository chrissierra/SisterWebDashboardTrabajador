import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liberar-sueldos',
  templateUrl: './liberar-sueldos.component.html'
})
export class LiberarSueldosComponent implements OnInit {


  HaberesImponibles: any[] = [];
  GlosaHaber: any;

  constructor() { }

  ngOnInit() {
  }


  guardar(forma) {
   console.log(forma.value);
  }  // Fin función guardar


  agregar_haberes(a) {

     this.HaberesImponibles.push(a);
     
  }

}




