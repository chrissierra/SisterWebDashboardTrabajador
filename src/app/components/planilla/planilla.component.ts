import { Component } from '@angular/core';
import { PlanillaservicesService } from '../../services/planillaservices.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html'
})
export class PlanillaComponent {
empleados: any;
buscador: any;

  constructor(private planillaServicio_: PlanillaservicesService) {


			this.planillaServicio_.obtener_planilla(localStorage.getItem('nombre_empresa')).subscribe(data => {
			
			console.log('data', data);
			
			this.empleados = data;

			});

   } // Fin constructor


  ir_perfil_empleado(){
			alert("asdf")
  }

}
