import { Component, OnInit } from '@angular/core';
import { EmpleadoService} from '../../interfaces/empleado.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { IngresoUsuarioServidorService } from '../../../../services/ingreso-usuario-servidor.service';


@Component({
  selector: 'app-pasodos',
  templateUrl: './pasodos.component.html'
})
export class PasodosComponent {
  forma: FormGroup;
  Empleado: any[];

  constructor(public servicio_empleado: IngresoUsuarioServidorService, public empleado: EmpleadoService) {


    this.Empleado = this.empleado.array_empleado;
    console.log(this.Empleado[0].name);
    this.forma = new FormGroup({


                'Nombre': new FormControl('', [Validators.required]),
                'Apellido': new FormControl('', [Validators.required]),
                'Fecha Nacimiento': new FormControl('', [Validators.required]),
                'Sexo': new FormControl('', [Validators.required]),
                'Sueldo Líquido': new FormControl('', [Validators.required]),
                'Puesto': new FormControl('', [Validators.required]),
                'Jefatura': new FormControl('', [Validators.required]),
                'Rut': new FormControl('', [Validators.required]),
                'Isapre': new FormControl('', [Validators.required]),
                'AFP': new FormControl('', [Validators.required]),
                'Horario': new FormControl('', [Validators.required]),
                'Nacionalidad': new FormControl('', [Validators.required]),
                'Dirección': new FormControl('', [Validators.required]),
                'Comuna': new FormControl('', [Validators.required]),
                'Sueldo escrito': new FormControl('', [Validators.required]),
                'Descanso en minutos': new FormControl('', [Validators.required]),
                'Comuna sucursal': new FormControl('', [Validators.required]),
                'rut_empresa': new FormControl('179614936')


       });


   }

   onSubmit(forma) {

     this.servicio_empleado.insertar_usuario_datos_generales((forma.value));

     console.log('forma', forma);
     console.log('errores', forma.controls["Nombre"]);
     console.log('forma_VALORES json stringigy', JSON.parse(JSON.stringify(forma.value)));
   }

}
