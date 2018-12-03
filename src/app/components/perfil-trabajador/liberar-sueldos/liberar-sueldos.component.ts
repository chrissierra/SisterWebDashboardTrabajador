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
export class LiberarSueldosComponent  {
// tslint:disable

  HaberesImponibles: any[] = [];  // Necesario para usar push
  ValorHaberes:number[] = [];  // Se usa en ngFor
  GlosaHaber: any;
  DatosTrabajador: any;
  ComisionAfp: any;
  TotalHaberImponible:number;
  TotalHaberImponible_temp:number;
  SueldoPagar:number;
  gratificacion:number;
  total_afp:number;
  total_isapre:number;

  
  constructor(private SueldoServicio_: SueldosService,
              public PerfilTrabajador: PerfilTrabajadorServiceService,
              private snackBar: MatSnackBar, 
              private MarcajeServiceService_: MarcajeServiceService,
              private param: ActivatedRoute, 
              private router : Router) {
    
    
 this.PerfilTrabajador.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe(data_perfil => {
             console.log(data_perfil);
             this.DatosTrabajador = data_perfil[0];
             this.gratificacion = 20000;
             
             this.SueldoServicio_.getComisionAfp(this.DatosTrabajador.afp).subscribe( data_afp => {
                
                this.ComisionAfp = data_afp[0].monto;
                
                this.TotalHaberImponible_temp =  (((  (this.ComisionAfp*1) + 7 ) / 100)+1)* data_perfil[0].sueldo;
                this.TotalHaberImponible = this.TotalHaberImponible_temp;
                console.log("Viendo porq no muestra la variable",this.TotalHaberImponible)
              });
    });
    

   } // FIn constructor



  guardar(forma) {
   console.log(forma.value);
  }  // Fin función guardar


  agregar_haberes(a) {    
     this.HaberesImponibles.push(a); 
  }

  onSearchChange(e){
    
    let element = 0;
  
   for (let index = 0; index < this.ValorHaberes.length; index++) {
      element =  (this.ValorHaberes[index]*1) + element;
     
   }

    this.TotalHaberImponible = element + this.TotalHaberImponible_temp;
    this.total_afp = this.TotalHaberImponible * (this.ComisionAfp/100);
    this.total_isapre = this.TotalHaberImponible * 0.07;
    this.SueldoPagar =  this.TotalHaberImponible - ( this.total_afp + this.total_isapre);

  } // Fin on searchchange

}




