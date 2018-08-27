import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LiberarTurnosService } from './../../../services/liberar-turnos.service';
import { IngresoUsuarioServidorService } from './../../../services/ingreso-usuario-servidor.service';


@Component({
  selector: 'app-liberar-turnos',
  templateUrl: './liberar-turnos.component.html'
})
export class LiberarTurnosComponent  {
  id: string;
  datos_para_generar_formulario: any;
  llaves_datos_para_generar_formulario: any;
  mes: string;
  anio: string;
  forma: FormGroup;

  constructor(private perfilServicio_: PerfilTrabajadorServiceService,
              private param: ActivatedRoute,
              private router: Router,
              public liberarTurnosService: LiberarTurnosService,
              public servicio_: IngresoUsuarioServidorService) {


  this.mes = this.param.snapshot.paramMap.get('mes');
  this.anio = this.param.snapshot.paramMap.get('anio');
  this.id = this.param.parent.snapshot.paramMap.get('id');
  this.liberarTurnosService.liberar_turnos_servidor(this.param.snapshot.paramMap.get('mes'),
                                                    this.param.snapshot.paramMap.get('anio'),
                                                    this.param.parent.snapshot.paramMap.get('id')).subscribe(data => {

      this.datos_para_generar_formulario = data[0];

      const llaves = Object.keys(data[0]);
      const datos = Object.values(data[0]);

      this.datos_para_generar_formulario = datos;
      this.llaves_datos_para_generar_formulario = llaves;


});





               }// Fin Constructor



               guardar(forma) {
                this.servicio_.liberar_turno(forma.value, this.id, this.mes).subscribe(data => {
                        this.router.navigate(['../PerfilTrabajador/'+this.param.parent.snapshot.paramMap.get('id')+'/Perfil/']);
                });

               }



               Actualizar(forma) {
                 console.log("asdfasdasdfpeo en actrulziar")
                this.servicio_.actualizar_turnos(forma.value, this.id, this.mes).subscribe(data => {
                    this.router.navigate(['../PerfilTrabajador/'+this.param.parent.snapshot.paramMap.get('id')+'/Perfil/']);
                });
               }


} // Fin Clase

