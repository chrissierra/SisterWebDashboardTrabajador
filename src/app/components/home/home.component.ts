import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcajeServiceService } from '../../services/marcaje-service.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

datosTrabajador: string = localStorage.getItem('rut_empresa');
id:any;
datosMarcaje:Marcaje;

constructor(private snackBar: MatSnackBar, 
            private perfilServicio_ : PerfilTrabajadorServiceService, 
            private MarcajeServiceService: MarcajeServiceService,
            private param: ActivatedRoute, 
            private router : Router) {

    this.datosTrabajador = JSON.parse(localStorage.getItem('datosTrabajador'));

	this.id = {
              'id':	this.datosTrabajador['id']
              };

    this.MarcajeServiceService.situacion_marcaje( JSON.stringify(this.id) ).subscribe( data => {
                 
                 this.datosMarcaje = {
                 					content: data
                 					}

                });
   

   } // Fin constructor

  

}


// Interface Marcaje

interface Marcaje {
  content: any; 
}