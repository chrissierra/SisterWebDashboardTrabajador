import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
// tslint:disable:indent
// tslint:disable:no-shadowed-variable
@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html'
})
export class MarcajeComponent implements OnInit {

  id: any;
  trabaja_dia_en_curso: number;
  entrada: number;
  salida: number;
  constructor(  private snackBar: MatSnackBar,
	              private MarcajeServiceService: MarcajeServiceService,
	              private param: ActivatedRoute,
	              private router: Router) {
                  
this.id = {
'id':	this.param.parent.snapshot.paramMap.get('id')
};


this.MarcajeServiceService.situacion_marcaje( JSON.stringify(this.id) ).subscribe( data => {
  console.log(data);
  this.trabaja_dia_en_curso = data['trabajaDiaEnCurso'];
  this.entrada = data['Entrada'];
  this.salida = data['Salida'];
});


  }  // Fin constructor

  ngOnInit() {
  }


  marcar_movimiento(movimiento) {
    this.MarcajeServiceService.realizarMarcaje(JSON.stringify(this.id)).subscribe( data => {
      const snackBarRef = this.snackBar.open('Marcaje realizado', 'OK', {
        duration: 3000
      });
      this.router.navigate(['./PerfilTrabajador/' + this.param.parent.snapshot.paramMap.get('id') + '/Perfil']);
    });
  }

}
