import { Component, OnChanges, SimpleChanges  } from '@angular/core';
import { SueldosService } from '../../../services/sueldos.service';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
@Component({
  selector: 'app-liberar-sueldos',
  templateUrl: './liberar-sueldos.component.html'
})
export class LiberarSueldosComponent implements OnChanges {


  HaberesImponibles: any[] = [];
  GlosaHaber: any;
  DatosTrabajador:any;
  ComisionAfp:any;
  
  constructor(private SueldoServicio_: SueldosService,
              public PerfilTrabajador: PerfilTrabajadorServiceService,
              private snackBar: MatSnackBar, 
              private MarcajeServiceService: MarcajeServiceService,
              private param: ActivatedRoute, 
              private router : Router) {
    
    
 this.PerfilTrabajador.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe(data => {
             console.log(data);
             this.DatosTrabajador = data[0];

             this.SueldoServicio_.getComisionAfp(this.DatosTrabajador.afp).subscribe(data => {
                 this.ComisionAfp = data[0].monto;
             })
    });
    

   }

ngOnChanges(changes: SimpleChanges){
   
}

  guardar(forma) {
   console.log(forma.value);
  }  // Fin función guardar


  agregar_haberes(a) {

     this.HaberesImponibles.push(a);
     
  }

}




