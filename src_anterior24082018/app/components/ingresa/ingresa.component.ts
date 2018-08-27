import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresa',
  templateUrl: './ingresa.component.html'
})
export class IngresaComponent implements OnInit {

  constructor(private router: Router) {

    this.router.navigate(['./Ingresa/paso1']);
   }

  ngOnInit() {
  }



}
