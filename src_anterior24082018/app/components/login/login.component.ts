import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LoginservicesService } from '../../services/loginservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {
  forma: FormGroup;
  respuesta_servidor_login :any;
  constructor(private router: Router, private login_: LoginservicesService) {


            this.forma = new FormGroup({

              'rut_empresa': new FormControl('', [Validators.required]),
              'clave': new FormControl('', [Validators.required]),
        });

   }

   onSubmit(forma) {
   
   this.respuesta_servidor_login = this.login_.login(forma.value).subscribe(a => {
      
      // nada que ver -> localStorage.setItem('horario_con_o_sin_turnos', a['horario_con_o_sin_turnos'].toString());
      localStorage.setItem('rut_empresa', a["rut_empresa"].toString());
      localStorage.setItem('nombre_empresa', a["nombre_empresa"].toString());
      localStorage.setItem('nombre_rep', a["nombre_rep"].toString());
      this.router.navigate(['./Home']);

    }, (error)=>{
      console.log("ERROR !!! ",error);
      alert("Escribe bien tus datos")
    });
  
    

   }



}
