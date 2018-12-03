import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilTrabajadorServiceService } from '../../services/perfil-trabajador-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil-trabajador',
  templateUrl: './perfil-trabajador.component.html'
})
export class PerfilTrabajadorComponent{
   
  datos_perfil_empleado:any;
  constructor(private perfilServicio_ : PerfilTrabajadorServiceService, private param: ActivatedRoute, private router : Router) { 

  this.router.navigate(['./PerfilTrabajador/'+this.param.snapshot.paramMap.get('id')+'/Perfil/']);

  
  }



}
