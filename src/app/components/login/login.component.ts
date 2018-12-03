import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LoginservicesService } from '../../services/loginservices.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {
  forma: FormGroup;
  respuesta_servidor_login :any;
  constructor(private router: Router, private login_: LoginservicesService) {


            this.forma = new FormGroup({

              'rut': new FormControl('', [Validators.required]),
              'claveTrabajador': new FormControl('', [Validators.required]),
        });

   }

   onSubmit(forma) {
   
   this.respuesta_servidor_login = this.login_.login(forma.value).subscribe(a => {
      console.log(a)
      if(a['error'] === 'Contraseña Errónea'){
        this.mensajeError('Contraseña no corresponde');
      }else{

      localStorage.setItem('datosTrabajador', JSON.stringify(a))
      this.router.navigate(['./Home']);

      }
     
    }, (error)=>{
      this.mensajeError('Rut de cliente no existe');
    });
  
    

   }


   mensajeError(texto){
     return swal({
          title: 'Error',
          text: texto,
          type: 'error',
          confirmButtonText: 'Ok'
        })
  }



}
