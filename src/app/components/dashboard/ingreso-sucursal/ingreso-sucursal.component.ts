import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingreso-sucursal',
  templateUrl: './ingreso-sucursal.component.html'
})
export class IngresoSucursalComponent implements OnInit {
title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor() { }

  ngOnInit() {
  }

}
